/*  ============================================================
    self_watering_plant.ino
    Sustainability Lab Workshop — Self-Watering Plant
    Hardware: DFRobot EcoDuino (KIT0003) — ATmega32U4 / Leonardo
    Requires: DHT sensor library by Adafruit
              (Tools → Manage Libraries → "DHT sensor library")

    SERIAL COMMANDS (9600 baud, Serial Monitor):
      test sensors    — read & print sensor values every 0.5 s
      test actuators  — pulse pump on/off so you can verify it
      normal run      — full automatic watering logic (default)
    ============================================================ */

#include "DHT.h"

/* ── Pin assignments (EcoDuino fixed wiring) ── */
const int SOIL_PIN = A2;   // resistive moisture probe → analog A2
const int PUMP_A   = 5;    // onboard motor-driver pin A  → digital 5
const int PUMP_B   = 6;    // onboard motor-driver pin B  → digital 6
#define   DHTPIN   9       // DHT11 data line            → digital 9
#define   DHTTYPE  DHT11

DHT dht(DHTPIN, DHTTYPE);

/* ── Thresholds — calibrate with "test sensors" first ── */
int DRY_THRESHOLD = 400;   // below this → soil is dry → water
int WET_THRESHOLD = 700;   // above this → soil is wet → stop

/* ── Timing ── */
const unsigned long PUMP_ON_MS  =  3000;   // one watering burst (ms)
const unsigned long SOAK_MS     = 30000;   // wait after watering (ms)
const unsigned long TEST_ACT_ON =  3000;   // actuator-test ON time
const unsigned long TEST_ACT_OFF=  5000;   // actuator-test OFF time
const unsigned long SENSOR_INTERVAL = 500; // sensor-test print rate

/* ── Operation mode ── */
enum Mode { NORMAL_RUN, TEST_SENSORS, TEST_ACTUATORS };
Mode currentMode = NORMAL_RUN;

/* ── Internal state ── */
bool          pumpRunning  = false;
unsigned long modeTimer    = 0;
bool          actPhase     = false;   // false = pump ON phase in actuator test

/* ── Helper: drive both motor-driver pins together ── */
void setPump(bool on) {
  digitalWrite(PUMP_A, on ? HIGH : LOW);
  digitalWrite(PUMP_B, on ? HIGH : LOW);
  pumpRunning = on;
}

/* ── Helper: print mode banner ── */
void printModeBanner(const char* name) {
  Serial.println();
  Serial.println("==========================================");
  Serial.print  ("  MODE: "); Serial.println(name);
  Serial.println("==========================================");
}

/* ============================================================
   SETUP
   ============================================================ */
void setup() {
  Serial.begin(9600);
  while (!Serial) { ; }   // wait for Serial on Leonardo / ATmega32U4

  pinMode(PUMP_A, OUTPUT);
  pinMode(PUMP_B, OUTPUT);
  setPump(false);
  dht.begin();

  Serial.println();
  Serial.println("  Self-Watering Plant — Sustainability Lab");
  Serial.println("  -----------------------------------------");
  Serial.println("  Commands (type in Serial Monitor):");
  Serial.println("    test sensors    - read sensor values");
  Serial.println("    test actuators  - run pump on/off loop");
  Serial.println("    normal run      - automatic watering");
  Serial.println("  -----------------------------------------");
  printModeBanner("NORMAL RUN");
  modeTimer = millis();
}

/* ============================================================
   LOOP — read serial commands, then dispatch to current mode
   ============================================================ */
void loop() {

  /* ── 1. Read and parse serial command ── */
  if (Serial.available()) {
    String cmd = Serial.readStringUntil('\n');
    cmd.trim();
    cmd.toLowerCase();

    if (cmd == "test sensors") {
      setPump(false);            // safety: pump off when switching modes
      currentMode = TEST_SENSORS;
      modeTimer   = millis();
      printModeBanner("TEST SENSORS");
      Serial.println("  Soil(0-1023)   Temp(°C)   Hum(%)");
      Serial.println("  ----------------------------------");

    } else if (cmd == "test actuators") {
      currentMode = TEST_ACTUATORS;
      actPhase    = false;       // start with pump OFF
      modeTimer   = millis();
      printModeBanner("TEST ACTUATORS");
      Serial.println("  Pump will cycle ON 3 s / OFF 5 s");
      Serial.println("  Type 'normal run' to stop");

    } else if (cmd == "normal run") {
      setPump(false);
      currentMode = NORMAL_RUN;
      modeTimer   = millis();
      printModeBanner("NORMAL RUN");

    } else if (cmd.length() > 0) {
      Serial.print("  Unknown command: '"); Serial.print(cmd); Serial.println("'");
      Serial.println("  Try: test sensors | test actuators | normal run");
    }
  }

  /* ── 2. Execute current mode ── */
  switch (currentMode) {
    case TEST_SENSORS:   runTestSensors();   break;
    case TEST_ACTUATORS: runTestActuators(); break;
    case NORMAL_RUN:     runNormalMode();    break;
  }
}

/* ============================================================
   MODE: TEST SENSORS
   Prints a row of sensor readings every SENSOR_INTERVAL ms.
   Use this to calibrate DRY_THRESHOLD and WET_THRESHOLD.
   ============================================================ */
void runTestSensors() {
  if (millis() - modeTimer < SENSOR_INTERVAL) return;
  modeTimer = millis();

  int   soil = analogRead(SOIL_PIN);
  float temp = dht.readTemperature();
  float hum  = dht.readHumidity();

  Serial.print("  Soil: "); Serial.print(soil);
  if (isnan(temp) || isnan(hum)) {
    Serial.println("   Temp/Hum: DHT read error");
  } else {
    Serial.print("   Temp: "); Serial.print(temp, 1); Serial.print(" C");
    Serial.print("   Hum: ");  Serial.print(hum,  1); Serial.println(" %");
  }
}

/* ============================================================
   MODE: TEST ACTUATORS
   Cycles pump ON for TEST_ACT_ON ms, then OFF for TEST_ACT_OFF ms.
   ============================================================ */
void runTestActuators() {
  unsigned long elapsed = millis() - modeTimer;

  if (!actPhase && elapsed >= TEST_ACT_ON) {
    setPump(false);
    actPhase  = true;
    modeTimer = millis();
    Serial.println("  Pump OFF — waiting 5 s...");

  } else if (actPhase && elapsed >= TEST_ACT_OFF) {
    setPump(true);
    actPhase  = false;
    modeTimer = millis();
    Serial.println("  Pump ON  — running 3 s...");

  } else if (!actPhase && elapsed == 0) {
    setPump(true);
    Serial.println("  Pump ON  — running 3 s...");
  }
}

/* ============================================================
   MODE: NORMAL RUN
   Sense → Decide → Act watering loop.

   Decision logic:
     1. If soil is dry (below DRY_THRESHOLD) → run pump for
        PUMP_ON_MS ms (a single safe burst).
     2. Wait SOAK_MS ms so water can spread before re-reading.
     3. Otherwise check again after 2 s.

   Hysteresis note: pump turns ON below DRY_THRESHOLD and only
   turns OFF after the full burst+soak, avoiding flicker.
   ============================================================ */
void runNormalMode() {
  int   soil = analogRead(SOIL_PIN);
  float temp = dht.readTemperature();
  float hum  = dht.readHumidity();

  Serial.print("  Soil: "); Serial.print(soil);
  if (!isnan(temp)) { Serial.print("   T: "); Serial.print(temp, 1); }
  if (!isnan(hum))  { Serial.print("   H: "); Serial.print(hum,  1); }

  if (soil < DRY_THRESHOLD) {
    Serial.println("   → DRY: watering burst...");
    setPump(true);
    delay(PUMP_ON_MS);
    setPump(false);
    Serial.print("  Soaking for "); Serial.print(SOAK_MS / 1000); Serial.println(" s...");
    delay(SOAK_MS);
  } else {
    Serial.println("   → OK");
    delay(2000);
  }
}

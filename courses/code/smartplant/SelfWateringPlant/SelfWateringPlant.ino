/*
 * ============================================================
 *  SelfWateringPlant.ino — Sustainability Lab workshop
 * ============================================================
 *  Board   : DFRobot EcoDuino (ATmega32U4) — in the Arduino IDE
 *            select  Tools → Board → "Arduino Leonardo".
 *  Library : "DHT sensor library" by Adafruit
 *            (Tools → Manage Libraries → install it together with
 *             its dependency "Adafruit Unified Sensor").
 *
 *  This single sketch runs the WHOLE workshop. Open the Serial
 *  Monitor at 9600 baud (line ending: "Newline") and type one of
 *  these commands to switch whole sections of the code on or off:
 *
 *      test sensors     → only read & print soil + air values,
 *                         the pump stays OFF (safe for the desk)
 *      test actuators   → only pulse the pump in short bursts,
 *                         sensors are ignored
 *      normal run       → the full automatic watering loop
 *      help             → print this list again
 *
 *  The sketch starts in NORMAL RUN.
 * ============================================================
 */

#include "DHT.h"

/* ── PINS (EcoDuino wiring — already routed on the board) ──── */
const int SOIL_PIN = A2;   // soil-moisture probe header  → A2
const int PUMP_A   = 5;    // onboard pump driver is steered
const int PUMP_B   = 6;    //   by pins 5 AND 6 together
#define DHTPIN  9          // DHT11 header                → D9
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

/* ── CALIBRATION (from the "test sensors" lesson) ──────────── *
 *  Put YOUR measured numbers here. With the EcoDuino probe a   *
 *  HIGHER reading usually means WETTER soil — verify it!       */
const int DRY_THRESHOLD = 400;   // below this → soil is dry → water
const int WET_THRESHOLD = 770;   // above this → soil is wet → stop

/* ── SAFETY LIMITS (never remove these!) ───────────────────── */
const unsigned long PUMP_BURST_MS  = 3000UL;    // one watering burst: 3 s
const unsigned long SOAK_WAIT_MS   = 30000UL;   // wait after a burst: 30 s
const unsigned long SENSOR_EVERY_MS = 2000UL;   // DHT11 max rate: every 2 s

/* ── OPERATING MODES (chosen from the Serial Monitor) ──────── */
enum Mode { NORMAL_RUN, TEST_SENSORS, TEST_ACTUATORS };
Mode mode = NORMAL_RUN;

/* ── STATE (timers instead of delay(), so commands always work) */
unsigned long lastSensorMs = 0;
unsigned long pumpStartMs  = 0;
unsigned long soakStartMs  = 0;
bool pumpOn  = false;
bool soaking = false;
String cmdBuffer = "";

/* ── FORWARD DECLARATIONS ──────────────────────────────────── */
void runTestSensors();
void runTestActuators();
void runNormal();
void setPump(bool on);
void enterMode(Mode m, const __FlashStringHelper* name);
void readSerialCommand();
void handleCommand(const String& cmd);
void printHelp();

/* ============================================================
 *  SETUP — runs once
 * ============================================================ */
void setup() {
  Serial.begin(9600);
  pinMode(PUMP_A, OUTPUT);
  pinMode(PUMP_B, OUTPUT);
  setPump(false);
  dht.begin();
  delay(1500);               // give the Serial Monitor time to attach
  printHelp();
  Serial.println(F(">> Mode: NORMAL RUN"));
}

/* ============================================================
 *  LOOP — runs forever; only the active section does anything
 * ============================================================ */
void loop() {
  readSerialCommand();       // always listening, in every mode

  switch (mode) {
    case TEST_SENSORS:   runTestSensors();   break;
    case TEST_ACTUATORS: runTestActuators(); break;
    case NORMAL_RUN:     runNormal();        break;
  }
}

/* ── SECTION 1: test sensors (pump locked OFF) ─────────────── */
void runTestSensors() {
  if (millis() - lastSensorMs < SENSOR_EVERY_MS) return;
  lastSensorMs = millis();

  int   soil = analogRead(SOIL_PIN);
  float t    = dht.readTemperature();   // °C
  float h    = dht.readHumidity();      // %

  Serial.print(F("Soil: "));  Serial.print(soil);
  Serial.print(F("   Temp: "));
  if (isnan(t)) Serial.print(F("--"));  else Serial.print(t, 1);
  Serial.print(F(" C   Hum: "));
  if (isnan(h)) Serial.print(F("--"));  else Serial.print(h, 0);
  Serial.println(F(" %"));
}

/* ── SECTION 2: test actuators (sensors ignored) ───────────── */
void runTestActuators() {
  // Pulse: 2 s ON, 5 s OFF — short and safe, never run a pump dry for long.
  unsigned long t = millis() - pumpStartMs;
  if (pumpOn && t >= 2000UL) {
    setPump(false);
    pumpStartMs = millis();
    Serial.println(F("Pump OFF (resting 5 s)"));
  } else if (!pumpOn && t >= 5000UL) {
    setPump(true);
    pumpStartMs = millis();
    Serial.println(F("Pump ON  (2 s burst)"));
  }
}

/* ── SECTION 3: normal run (the real watering logic) ───────── */
void runNormal() {
  // 3a. End a watering burst after PUMP_BURST_MS — the hard safety limit.
  if (pumpOn && millis() - pumpStartMs >= PUMP_BURST_MS) {
    setPump(false);
    soaking = true;
    soakStartMs = millis();
    Serial.println(F("Burst done -> soaking, pump OFF"));
  }

  // 3b. While soaking, do nothing: let the water spread through the soil.
  if (soaking) {
    if (millis() - soakStartMs < SOAK_WAIT_MS) return;
    soaking = false;
    Serial.println(F("Soak finished -> checking soil again"));
  }

  // 3c. Sense + decide, at most every SENSOR_EVERY_MS.
  if (pumpOn || millis() - lastSensorMs < SENSOR_EVERY_MS) return;
  lastSensorMs = millis();

  int   soil = analogRead(SOIL_PIN);
  float tC   = dht.readTemperature();
  float hPct = dht.readHumidity();

  Serial.print(F("Soil: "));  Serial.print(soil);
  Serial.print(F("   Temp: "));
  if (isnan(tC)) Serial.print(F("--")); else Serial.print(tC, 1);
  Serial.print(F(" C   Hum: "));
  if (isnan(hPct)) Serial.print(F("--")); else Serial.print(hPct, 0);
  Serial.println(F(" %"));

  if (soil < DRY_THRESHOLD) {          // flip "<" if YOUR probe reads inverted
    Serial.println(F("Soil is DRY -> one safe watering burst"));
    setPump(true);
    pumpStartMs = millis();
  }
}

/* ── HELPERS ───────────────────────────────────────────────── */
void setPump(bool on) {
  // The EcoDuino's onboard driver needs BOTH pins driven together.
  digitalWrite(PUMP_A, on ? HIGH : LOW);
  digitalWrite(PUMP_B, on ? HIGH : LOW);
  pumpOn = on;
}

void enterMode(Mode m, const __FlashStringHelper* name) {
  mode = m;
  setPump(false);            // every mode change starts with the pump OFF
  soaking = false;
  pumpStartMs = millis();
  lastSensorMs = 0;
  Serial.print(F(">> Mode: "));
  Serial.println(name);
}

void readSerialCommand() {
  while (Serial.available()) {
    char c = Serial.read();
    if (c == '\n' || c == '\r') {
      cmdBuffer.trim();
      cmdBuffer.toLowerCase();
      if (cmdBuffer.length() > 0) handleCommand(cmdBuffer);
      cmdBuffer = "";
    } else if (cmdBuffer.length() < 40) {
      cmdBuffer += c;
    }
  }
}

void handleCommand(const String& cmd) {
  if      (cmd == "test sensors")   enterMode(TEST_SENSORS,   F("TEST SENSORS (pump locked off)"));
  else if (cmd == "test actuators") enterMode(TEST_ACTUATORS, F("TEST ACTUATORS (sensors ignored)"));
  else if (cmd == "normal run")     enterMode(NORMAL_RUN,     F("NORMAL RUN"));
  else if (cmd == "help")           printHelp();
  else {
    Serial.print(F("Unknown command: \""));
    Serial.print(cmd);
    Serial.println(F("\" — type 'help'"));
  }
}

void printHelp() {
  Serial.println(F("=============================================="));
  Serial.println(F(" Self-Watering Plant — Sustainability Lab"));
  Serial.println(F(" Commands (type + Enter, line ending Newline):"));
  Serial.println(F("   test sensors    sensors only, pump off"));
  Serial.println(F("   test actuators  pump pulses, sensors off"));
  Serial.println(F("   normal run      full automatic watering"));
  Serial.println(F("   help            show this list"));
  Serial.println(F("=============================================="));
}

<!-- slug: 01 -->
## The complete code — start here

Welcome to the **Sustainability Lab** workshop. We use a **top-down** approach: you get the *full, working program* first. Only then do we open it up and ask *why*.

> **Download the code:** [self_watering_plant.ino](../code/smartplant/self_watering_plant.ino)

Upload the sketch to your EcoDuino now. Open the **Serial Monitor** at **9600 baud** and type one of three commands to choose what the system does:

| Command | What it does |
|---------|-------------|
| `test sensors` | Prints sensor readings every 0.5 s — use this to calibrate |
| `test actuators` | Cycles the pump on/off so you can check the plumbing |
| `normal run` | Full automatic watering logic (the default on power-up) |

### The full sketch

```cpp
/*  self_watering_plant.ino
    DFRobot EcoDuino (KIT0003) — ATmega32U4 / Leonardo
    Requires: DHT sensor library by Adafruit               */

#include "DHT.h"

/* ── Pin assignments ── */
const int SOIL_PIN = A2;
const int PUMP_A   = 5;
const int PUMP_B   = 6;
#define   DHTPIN   9
#define   DHTTYPE  DHT11

DHT dht(DHTPIN, DHTTYPE);

/* ── Thresholds — adjust after running "test sensors" ── */
int DRY_THRESHOLD = 400;
int WET_THRESHOLD = 700;

/* ── Timing ── */
const unsigned long PUMP_ON_MS = 3000;
const unsigned long SOAK_MS    = 30000;

/* ── Mode ── */
enum Mode { NORMAL_RUN, TEST_SENSORS, TEST_ACTUATORS };
Mode currentMode = NORMAL_RUN;

bool          pumpRunning = false;
unsigned long modeTimer   = 0;
bool          actPhase    = false;

void setPump(bool on) {
  digitalWrite(PUMP_A, on ? HIGH : LOW);
  digitalWrite(PUMP_B, on ? HIGH : LOW);
  pumpRunning = on;
}

/* ── SETUP ── */
void setup() {
  Serial.begin(9600);
  while (!Serial) { ; }
  pinMode(PUMP_A, OUTPUT);
  pinMode(PUMP_B, OUTPUT);
  setPump(false);
  dht.begin();
  Serial.println("Commands: test sensors | test actuators | normal run");
  modeTimer = millis();
}

/* ── LOOP ── */
void loop() {
  if (Serial.available()) {
    String cmd = Serial.readStringUntil('\n');
    cmd.trim(); cmd.toLowerCase();
    if      (cmd == "test sensors")   { setPump(false); currentMode = TEST_SENSORS;   modeTimer = millis(); Serial.println(">> TEST SENSORS"); }
    else if (cmd == "test actuators") {                 currentMode = TEST_ACTUATORS; modeTimer = millis(); Serial.println(">> TEST ACTUATORS"); actPhase = false; }
    else if (cmd == "normal run")     { setPump(false); currentMode = NORMAL_RUN;     modeTimer = millis(); Serial.println(">> NORMAL RUN"); }
  }
  switch (currentMode) {
    case TEST_SENSORS:   runTestSensors();   break;
    case TEST_ACTUATORS: runTestActuators(); break;
    case NORMAL_RUN:     runNormalMode();    break;
  }
}

/* ── TEST SENSORS mode ── */
void runTestSensors() {
  if (millis() - modeTimer < 500) return;
  modeTimer = millis();
  int soil = analogRead(SOIL_PIN);
  float t  = dht.readTemperature();
  float h  = dht.readHumidity();
  Serial.print("Soil: "); Serial.print(soil);
  Serial.print("   T: "); Serial.print(t, 1);
  Serial.print(" C   H: "); Serial.print(h, 1); Serial.println(" %");
}

/* ── TEST ACTUATORS mode ── */
void runTestActuators() {
  unsigned long e = millis() - modeTimer;
  if (!actPhase && e == 0)    { setPump(true);  Serial.println("Pump ON  — 3 s"); }
  if (!actPhase && e >= 3000) { setPump(false); actPhase = true;  modeTimer = millis(); Serial.println("Pump OFF — 5 s"); }
  if ( actPhase && e >= 5000) { setPump(true);  actPhase = false; modeTimer = millis(); Serial.println("Pump ON  — 3 s"); }
}

/* ── NORMAL RUN mode ── */
void runNormalMode() {
  int soil = analogRead(SOIL_PIN);
  Serial.print("Soil: "); Serial.println(soil);
  if (soil < DRY_THRESHOLD) {
    Serial.println("Dry → watering burst");
    setPump(true);  delay(PUMP_ON_MS);
    setPump(false); delay(SOAK_MS);
  } else {
    delay(2000);
  }
}
```

Don't worry if you don't understand every line yet — that's the point of the next lessons. Right now: upload, open Serial Monitor, type `test sensors`, and watch numbers appear. The system is *alive*.

<!-- slug: 02 -->
## Arduino anatomy: preamble, setup, loop

Every Arduino sketch has exactly three parts. Once you know this skeleton you can read *any* Arduino program — including the full one from Lesson 1.

### The skeleton

```cpp
/* === PREAMBLE ===
   Anything that runs before the board starts.
   Libraries, pin numbers, global variables.        */

#include "DHT.h"          // pull in a library
const int SOIL_PIN = A2;  // give a name to a pin

/* === SETUP ===
   Runs once when the board powers on or resets.
   Use it to configure pins and start Serial.       */

void setup() {
  Serial.begin(9600);
  pinMode(SOIL_PIN, INPUT);
}

/* === LOOP ===
   Runs forever, as fast as the chip allows.
   This is where your actual work happens.          */

void loop() {
  int value = analogRead(SOIL_PIN);
  Serial.println(value);
  delay(500);
}
```

### Why three parts?

| Part | When | Purpose |
|------|------|---------|
| **Preamble** | Compile time | Libraries, constants, variable declarations |
| **setup()** | Once at boot | Configure hardware, start communication |
| **loop()** | Forever after | Read sensors, decide, act |

### How our full sketch fits

Open `self_watering_plant.ino` and find these three zones:

- **Preamble** (lines 1–~30): `#include`, pin constants, `DHT dht(…)`, `enum Mode`, timing values, state variables.
- **setup()**: starts Serial, configures pins, prints the command menu.
- **loop()**: reads Serial commands, then calls one of three sub-functions based on the current mode.

The sub-functions (`runTestSensors`, `runTestActuators`, `runNormalMode`) are just tidy helpers — they're not magic, they're called *from* `loop()`. Arduino only ever requires `setup()` and `loop()`; everything else is your own organisation.

<!-- slug: 03 -->
## How the system works

Every automatic system does three things in a continuous loop: **sense → decide → act**. Our plant does exactly this.

### Inputs = sensors

Two sensors bring information into the controller:

- **Soil moisture probe** (analog pin A2) — dry soil has high resistance → high reading; wet soil has low resistance → low reading.
- **DHT11** (digital pin 9) — reports air temperature and humidity. Hot, dry conditions suggest the plant needs water sooner.

### Output = actuator

One actuator lets the controller change the world:

- **Peristaltic pump** driven via the onboard motor-driver chip (pins 5 + 6). Both pins HIGH → pump runs; both LOW → pump stops.

### The closed loop

```
   [ Soil probe ] ──┐
                    ├──► CONTROLLER ──► [ Water Pump ]
   [ DHT11      ] ──┘     (decides)
        ▲                                    │
        └────── soil gets wetter ────────────┘
```

The pump changes the soil; the sensor reads the change; the controller decides again. Output feeds back into input through the real world — that's a **closed loop**.

### The decision logic in plain English

1. Read moisture.
2. If below `DRY_THRESHOLD` → run pump for `PUMP_ON_MS` milliseconds (a fixed safe burst).
3. Wait `SOAK_MS` milliseconds so water spreads before re-checking.
4. Repeat.

**Why a fixed burst instead of "pump until wet"?** Water takes time to reach the probe. If we kept pumping until the reading changed, we'd flood the plant. The burst-and-wait approach is the safer choice.

**Why two thresholds?** At the boundary, sensor noise makes the reading jump above and below. A small gap between the ON threshold (`DRY`) and the expected OFF threshold (`WET`) prevents the pump from flickering.

<!-- slug: 04 -->
## Test your sensors

With the sketch uploaded, type `test sensors` in the Serial Monitor. You'll see a live table:

```
Soil: 612   T: 24.0 C   H: 55.0 %
Soil: 610   T: 24.0 C   H: 55.0 %
```

### What to do

**Step 1 — Read both extremes of the soil probe**

| Condition | Do this | Write down the value |
|-----------|---------|----------------------|
| **Dry** | Hold probe in air, or push into dry soil | `____` |
| **Wet** | Push probe into a cup of water | `____` |

Your `DRY_THRESHOLD` should sit between these two numbers, closer to the dry end. Your `WET_THRESHOLD` (only used as a reference) is near the wet end.

> Note: higher value may mean drier *or* wetter depending on probe wiring. Read both extremes; don't assume.

**Step 2 — Update the sketch**

Edit these two lines in the preamble and re-upload:

```cpp
int DRY_THRESHOLD = 400;  // ← change to your dry value
int WET_THRESHOLD = 700;  // ← change to your wet value
```

**Step 3 — Check the DHT11**

Breathe on the sensor or cup it in your hand. You should see humidity climb and temperature steady. If you see `nan` values, wait 2 seconds — the DHT11 is slow.

### Why calibrate?

Raw sensor numbers are meaningless until *you* measure your specific soil, probe, and pot. Two identical probes in different soils can give different readings. Calibration is not optional — it's the difference between a plant that gets watered correctly and one that gets flooded.

<!-- slug: 05 -->
## The soil moisture probe in depth

The resistive soil-moisture probe is the simplest sensor in the kit — and the most important. This lesson explains how it works and its limits.

### How it works

The probe has two metal electrodes. The board applies a small voltage across them and reads the resulting current via `analogRead()`.

- **Dry soil** → high resistance → low current → **high** analog reading (close to 1023)
- **Wet soil** → low resistance → high current → **low** analog reading (close to 0)

`analogRead()` on the ATmega32U4 returns a value from **0 to 1023** (10-bit ADC, 5 V reference).

### Calibration reminder

```cpp
const int SOIL_PIN = A2;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int moisture = analogRead(SOIL_PIN);
  Serial.println(moisture);
  delay(500);
}
```

This minimal sketch (a simplified version of `runTestSensors`) shows just the moisture read. Notice how it maps to the **preamble / setup / loop** structure from Lesson 2.

### Limits to know

- **Corrosion:** Current flowing through wet soil slowly corrodes the metal electrodes. Fine for a workshop; for a long-term build, a **capacitive** probe (no metal exposed) lasts much longer.
- **Salinity:** Different soils conduct differently based on mineral content, not just water content. Your calibration is specific to your soil mix.
- **Placement depth:** The probe reads the moisture at exactly the depth it's inserted. Move it and the numbers change.

<!-- slug: 06 -->
## The DHT11 temperature & humidity sensor

The DHT11 is our first *digital* sensor. Instead of a raw voltage, it sends a small data packet over a single wire, decoded by the Adafruit DHT library.

### Wiring (already done on EcoDuino)

- VCC → 5 V, GND → GND, DATA → **digital pin 9**

### A standalone read sketch

```cpp
#include "DHT.h"

#define DHTPIN  9
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  float t = dht.readTemperature();   // °C
  float h = dht.readHumidity();      // %

  if (isnan(t) || isnan(h)) {
    Serial.println("DHT read error — wait 2 s");
  } else {
    Serial.print("T: "); Serial.print(t);
    Serial.print(" C   H: "); Serial.print(h);
    Serial.println(" %");
  }
  delay(2000);   // DHT11 minimum interval
}
```

Again: preamble → setup → loop. The pattern is always the same.

### Limits to know

- **Slow:** one reading every ~2 seconds. Reading faster returns stale or invalid data.
- **Rough:** ±2 °C and ±5 % humidity — fine for contextual awareness, not for precision measurement.
- **Role in our system:** temperature and humidity are *context*, not the trigger. The soil probe still makes the core watering decision. A hot, dry day could shift your threshold slightly, but that's a refinement.

<!-- slug: 07 -->
## Test your actuator

Type `test actuators` in the Serial Monitor. The pump will cycle: ON for 3 seconds, OFF for 5 seconds, repeatedly. You'll see:

```
>> TEST ACTUATORS
Pump ON  — 3 s
Pump OFF — 5 s
Pump ON  — 3 s
```

Put the inlet tube in a water container and the outlet tube in a cup. Watch water move. When you're done, type `normal run` or `test sensors` to stop.

### Why the pump never connects directly to a pin

An Arduino output pin can supply only **~40 mA**. A small peristaltic pump draws far more — and when a motor switches off, it produces a voltage **spike** that can destroy the pin or the whole board.

So the pin does not *power* the pump. It sends a tiny signal to an onboard **motor-driver chip** that handles the real current. On the EcoDuino, two pins steer this driver:

```
  Pins 5 + 6 ──► [ motor driver chip ] ──► PUMP ──► battery pack
  (tiny signal)      (the switch)          (big current)
```

Both pins HIGH = pump ON. Both LOW = pump OFF. The driver also contains a **flyback diode** that absorbs the turn-off spike.

### The actuator control code

```cpp
const int PUMP_A = 5;
const int PUMP_B = 6;

void setup() {
  pinMode(PUMP_A, OUTPUT);
  pinMode(PUMP_B, OUTPUT);
}

void loop() {
  digitalWrite(PUMP_A, HIGH);    // pump ON
  digitalWrite(PUMP_B, HIGH);
  delay(3000);
  digitalWrite(PUMP_A, LOW);     // pump OFF
  digitalWrite(PUMP_B, LOW);
  delay(10000);
}
```

This is the simplest version — preamble, setup, loop — with nothing else. In the full sketch the same logic lives inside `runTestActuators()`.

**Never run a peristaltic pump dry for long.** Without water to move, many small pumps overheat. Always keep the inlet tube submerged during tests.

<!-- slug: 08 -->
## Add WiFi with an ESP32

Our EcoDuino (ATmega32U4) does its job well — but it cannot connect to the internet. The **extension** of this workshop swaps the brain for an **ESP32**: WiFi and Bluetooth built in, for a similar price.

Everything you learned transfers. The ESP32 reads the same sensors and drives the same pump — the logic is identical. What's new is network connectivity.

### What changes

| | EcoDuino (ATmega32U4) | ESP32 |
|---|---|---|
| Logic voltage | 5 V | **3.3 V** — check sensor compatibility |
| Analog read range | 0–1023 | 0–4095 |
| Connectivity | USB only | **WiFi + Bluetooth** |

> ⚠️ The ESP32 runs at **3.3 V**. Verify your soil probe and pump driver are 3.3 V-safe, or use level shifters.

### Connect and report

```cpp
#include <WiFi.h>

const char* SSID = "your-network";
const char* PASS = "your-password";

void setup() {
  Serial.begin(115200);
  WiFi.begin(SSID, PASS);
  while (WiFi.status() != WL_CONNECTED) { delay(300); Serial.print("."); }
  Serial.println("\nConnected: " + WiFi.localIP().toString());
}
```

Once online, the plant publishes readings over **MQTT** — a lightweight protocol where each device sends to a central broker and a dashboard displays the data.

<!-- slug: 09 -->
## Intelligence in the loop: an LLM via API

Our normal-run logic is a fixed rule: *if dry, water.* A **Large Language Model (LLM)** can reason with richer context — the plant species, recent weather, the last few days of readings — and recommend an action in plain language.

### How it works

The ESP32 sends the model a summary and asks for a watering decision:

```
ESP32 ──(HTTPS)──► LLM API
  "soil=380, temp=31C, hum=22%, basil, last watered 18h ago. Water now? yes/no + reason"

LLM  ──► "yes — soil below basil's comfort range; hot dry air accelerates loss"

ESP32 ──► pump (if yes)
```

The newest models for this are Anthropic's **Claude** family (e.g. `claude-opus-4-8`). Call the API over HTTPS, include sensor context in the prompt, parse the response.

### Design rules

- **Keep safety logic local.** The LLM *advises*; the firmware still enforces burst limits and soak time. A remote answer must never flood your plant.
- **Don't query every second.** Call once an hour, or only when soil is borderline. API calls cost money; soil changes slowly.
- **Handle no-reply.** If WiFi or the API is down, fall back to the simple local rule. The plant must survive offline.

Reflexes (fast, local, safe) below. Reasoning (slow, contextual, expensive) above.

<!-- slug: 10 -->
## Remote commands & networks of plants

Because the ESP32 listens on the network, you can send it a command from your phone, a web page, or a home-automation system. The same MQTT broker that *receives* readings can *send* commands back.

```
   Your phone ──► broker ──► ESP32 ──► pump
   (button)               (command)
```

> 🔒 **Safety first.** Authenticate every command. Keep the firmware's local burst-and-wait limits so a flood of remote commands cannot flood the plant. Never expose the device directly to the open internet.

### A network of plants

```
  [Plant A] ─┐
  [Plant B] ─┼──► broker ──► dashboard (charts, alerts)
  [Plant C] ─┘                  │
                                └──► optional LLM "gardener"
                                     reasoning across all of them
```

Ideas that emerge at scale:

- A shared dashboard showing every plant's moisture trend.
- Alerts when a tank runs dry or a sensor flat-lines.
- One LLM "gardener" coordinating watering by species and weather.
- A classroom, a balcony garden, a rooftop farm — same pattern, repeated.

### Where you've arrived

You started with the complete working code, understood its architecture, calibrated sensors, tested the actuator, and stepped through the normal-run logic. Then you saw how the same system grows — WiFi, intelligence, remote control, scale.

That is the full journey of an embedded, connected, intelligent system — built around one plant that refuses to go thirsty.

> Built for the **Sustainability Lab** workshop.

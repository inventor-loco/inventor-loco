<!-- slug: 01 -->
## Meet your self-watering plant

Welcome to the **Sustainability Lab** workshop. Today you will build a plant that waters itself — and, more importantly, you will understand *every* part of how it does so.

We use a **top-down methodology**. You do not start with a pile of components and a wiring diagram. You start with a **complete, working program** running on a complete, working system: a plant, a tank of water, a small pump, two sensors, and a microcontroller. We switch it on, it works — and only *then* do we open it up and ask *why*.

> **Why top-down?** Seeing the finished behaviour first gives every later step a purpose. The full program has built-in *modes* that let us switch whole sections of it on and off from the keyboard — so when we test the sensors in Lesson 4, we are testing a piece of the *real* system, not a toy.

### The kit

This is the **DFRobot EcoDuino — an Auto Plant Kit (KIT0003)**. The "brain" is the **EcoDuino control board**, which runs an **ATmega32U4** chip — so it programs *exactly* like an **Arduino Leonardo**. The official build steps live on the [DFRobot wiki](https://wiki.dfrobot.com/_SKU_KIT0003_EcoDuino_-_An_Auto_Plant_Kit); this guide is the path *I* would take to teach it.

#### What's in the box

- **EcoDuino control board** (ATmega32U4, Leonardo-compatible) — the pump driver and the sensor headers are already on this board.
- **Soil-moisture sensor** — the resistive probe that drives the whole decision.
- **DHT11 module** — air temperature & humidity.
- **Peristaltic water pump** + a length of **silicone hose**.
- **Battery holder** (takes **6 × AA** — note: *batteries are not included*) and a **USB cable** for power and programming.
- A two-piece **plastic enclosure**, **4 screws**, **2 screwdrivers**, and **2 badges**.

> You supply the two things the kit can't ship: a **water container** and a **plant**.

#### The four parts that matter for the electronics

| Part | Role | We call it… |
|------|------|-------------|
| EcoDuino board (ATmega32U4) | Runs the program — the "brain" | Controller |
| Resistive soil-moisture probe | Senses how dry the soil is | Input / sensor |
| DHT11 module | Senses air temperature & humidity | Input / sensor |
| Peristaltic water pump | Moves water from tank to soil | Output / actuator |

### Inputs, outputs, and the loop

Every automatic system does three things, forever: it **senses** the world, it **decides** what to do, and it **acts** on the world. Engineers call this **sense → decide → act**.

```
        ┌─────────────────────────────────────┐
        │                                     │
   [ Soil moisture ] ─┐                       │
                      ├──►  CONTROLLER  ──►  [ Water Pump ]
   [ Temp / humidity ]┘     (decides)         │
        ▲                                     │
        └──────── the soil gets wetter ───────┘
```

The pump changes the soil, the sensor reads the change, the controller decides again. It is a **closed loop** — the output feeds back into the input through the real world (the plant).

> **Your turn:** Point at each component on the bench and say out loud: *"input"* or *"output"*. This habit will serve you for every embedded system you ever meet.

<!-- slug: 02 -->
## The full program — upload it and drive it

Top-down means the **complete program comes first**. Download it, upload it to the board, and drive it from the keyboard. Everything after this lesson is a guided tour *inside* this one file.

<a class="code-download" href="code/smartplant/SelfWateringPlant.ino" download="SelfWateringPlant.ino">⬇&nbsp; Download SelfWateringPlant.ino</a>

### Upload it

1. Open the file in the **Arduino IDE** (it will offer to create a `SelfWateringPlant` folder — say yes).
2. Install the library: **Tools → Manage Libraries → search "DHT sensor library" (Adafruit) → Install** (accept its "Adafruit Unified Sensor" dependency).
3. Select **Tools → Board → Arduino Leonardo** (the EcoDuino's ATmega32U4 programs as a Leonardo) and the right **Port**.
4. Press **Upload** (→).

### Drive it from the Serial Monitor

Open the **Serial Monitor** (magnifying-glass icon, top right), set it to **9600 baud** and line ending **Newline**. The program greets you with its command list. Type a command and press Enter:

| You type… | What runs | What is switched off |
|-----------|-----------|----------------------|
| `test sensors` | Reads & prints soil + air values every 2 s | The pump is **locked off** |
| `test actuators` | Pulses the pump: 2 s on, 5 s off | The sensors are **ignored** |
| `normal run` | The full automatic watering loop | Nothing — everything on |
| `help` | Prints the command list again | — |

This is the heart of the workshop's method: **one program, three modes**. Each mode runs one *section* of the code and silences the rest — so we can study the system one part at a time without ever leaving the real program.

### The full code

```cpp
/*
 * SelfWateringPlant.ino — Sustainability Lab workshop
 * Board: DFRobot EcoDuino (ATmega32U4) → select "Arduino Leonardo"
 * Library: "DHT sensor library" by Adafruit (+ Adafruit Unified Sensor)
 *
 * Serial Monitor commands (9600 baud, Newline):
 *   test sensors     sensors only, pump locked off
 *   test actuators   pump pulses, sensors ignored
 *   normal run       full automatic watering (default)
 *   help             list the commands
 */

#include "DHT.h"

/* ── PINS (EcoDuino wiring — already routed on the board) ──── */
const int SOIL_PIN = A2;   // soil-moisture probe header  → A2
const int PUMP_A   = 5;    // onboard pump driver is steered
const int PUMP_B   = 6;    //   by pins 5 AND 6 together
#define DHTPIN  9          // DHT11 header                → D9
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

/* ── CALIBRATION (from the "test sensors" lesson) ──────────── */
const int DRY_THRESHOLD = 400;   // below this → soil is dry → water
const int WET_THRESHOLD = 700;   // above this → soil is wet → stop

/* ── SAFETY LIMITS (never remove these!) ───────────────────── */
const unsigned long PUMP_BURST_MS   = 3000UL;    // one burst: 3 s
const unsigned long SOAK_WAIT_MS    = 30000UL;   // wait after burst: 30 s
const unsigned long SENSOR_EVERY_MS = 2000UL;    // DHT11 max rate: 2 s

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
  // Pulse: 2 s ON, 5 s OFF — short and safe; never run a pump dry for long.
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
```

Don't try to absorb it all now. In the next lesson we learn the *shape* every Arduino program shares; then we walk through each section using its test mode.

<!-- slug: 03 -->
## Anatomy of an Arduino sketch

Every Arduino program — from blinking an LED to our full watering system — has the same three-part architecture. Spotting it makes any sketch readable.

### 1. Preamble · 2. `setup()` · 3. `loop()`

```cpp
/* 1 ── PREAMBLE — runs nowhere: declarations only.
        Libraries, pin names, constants, global variables. */
#include "DHT.h"
const int SOIL_PIN = A2;

/* 2 ── SETUP — runs ONCE at power-on or reset.
        Configure pins, start Serial, initialise libraries. */
void setup() {
  Serial.begin(9600);
}

/* 3 ── LOOP — runs FOREVER, top to bottom, again and again.
        This is where sense → decide → act lives. */
void loop() {
  Serial.println(analogRead(SOIL_PIN));
  delay(500);
}
```

That tiny sketch is real — it reads the soil probe and prints it twice a second. It is a **miniature version** of our full program: same preamble idea, same setup idea, same loop idea, just one job instead of three.

### The smallest possible actuator sketch

```cpp
const int PUMP_A = 5;          // PREAMBLE: name the pins
const int PUMP_B = 6;

void setup() {                 // SETUP: pins become outputs
  pinMode(PUMP_A, OUTPUT);
  pinMode(PUMP_B, OUTPUT);
}

void loop() {                  // LOOP: pulse forever
  digitalWrite(PUMP_A, HIGH);  // pump ON  — both pins HIGH
  digitalWrite(PUMP_B, HIGH);
  delay(2000);
  digitalWrite(PUMP_A, LOW);   // pump OFF — both pins LOW
  digitalWrite(PUMP_B, LOW);
  delay(5000);
}
```

> These mini-sketches are here to **show the architecture**, not to replace the full program. In the workshop you keep `SelfWateringPlant.ino` on the board and switch its sections with serial commands — no re-uploading between lessons.

### Where the full program fits the pattern

| Part | In the mini-sketches | In `SelfWateringPlant.ino` |
|------|----------------------|----------------------------|
| Preamble | pin names | pins, thresholds, safety limits, `Mode`, state variables |
| `setup()` | `pinMode`, `Serial.begin` | the same + DHT init + help text |
| `loop()` | one job, with `delay()` | listens for commands, then runs *only* the active section |

One difference matters: the full program avoids long `delay()` calls and uses `millis()` timers instead. A `delay(30000)` would deafen the board for 30 seconds — your `normal run` command would go unheard. The loop must keep spinning so the program can always listen. Keep that trick; you will reuse it in every serious sketch you write.

<!-- slug: 04 -->
## Test the sensors

Type **`test sensors`** in the Serial Monitor. The pump is now **locked off** and the program does one thing: read both sensors and print them every 2 seconds. Safe for the desk — let's understand what we're reading.

```
Soil: 312   Temp: 24.0 C   Hum: 41 %
Soil: 309   Temp: 24.1 C   Hum: 41 %
```

### Sensor 1 — soil moisture (analog)

The resistive probe has three pins — **VCC**, **GND**, **signal** — and on the EcoDuino its header is already wired to **analog pin A2**. Dry soil conducts poorly (high resistance); wet soil conducts well. `analogRead(A2)` turns the probe's voltage into a number from **0 to 1023**.

This is the section of the full program that is running right now:

```cpp
void runTestSensors() {
  if (millis() - lastSensorMs < SENSOR_EVERY_MS) return;  // every 2 s
  lastSensorMs = millis();

  int   soil = analogRead(SOIL_PIN);    // probe → number 0–1023
  float t    = dht.readTemperature();   // °C
  float h    = dht.readHumidity();      // %
  // … print them …
}
```

### Sensor 2 — temperature & humidity (digital)

The **DHT11** is our first *digital* sensor: instead of a raw voltage it sends a small data packet over one wire, decoded by the Adafruit **DHT** library. On the EcoDuino its header is wired to **digital pin 9**. Know its limits:

- **Slow:** one reading every ~2 seconds, no faster — that is why `SENSOR_EVERY_MS` is 2000.
- **Rough:** ±2 °C and ±5 % humidity. Fine for "is it hot and dry today?", not for a laboratory.
- Breathe on it or cup it in your hand — watch humidity climb. Proof it's alive.

### Calibrate — the important bit

The raw soil number means nothing until *you* give it meaning. With `test sensors` running, do this experiment:

| Condition | Push the probe into… | Write down the value |
|-----------|----------------------|----------------------|
| **Dry** | air / dry soil | `____` (your DRY) |
| **Wet** | a cup of water / soaked soil | `____` (your WET) |

> **Note:** Depending on how the probe is wired, *higher* may mean wetter **or** drier. Don't assume — read both extremes and see which way it goes. Your two numbers replace `DRY_THRESHOLD` and `WET_THRESHOLD` in the preamble of the full program (and if your probe reads inverted, flip the `<` in `runNormal()`).

A resistive probe corrodes over time because current flows through wet soil. That's fine for a workshop; for a long-term build, a **capacitive** probe lasts far longer.

<!-- slug: 05 -->
## Test the actuators

Type **`test actuators`**. The sensors are now ignored and the pump pulses: **2 s on, 5 s off**, announcing each change. Put the inlet tube into a cup of water and the outlet into another cup, and watch it move water.

> **Never run a pump dry** for long — without water to move, many small pumps overheat. That is exactly why this mode pulses instead of running continuously.

### Golden rule: never drive a motor straight from a pin

An Arduino pin supplies only a few tens of milliamps. A pump pulls far more, and when a motor switches off it kicks back a voltage **spike**. Connect it directly and you destroy the pin — or the whole board.

So the pin does not *power* the pump. It only sends a **command** to a switch that handles the power: a **transistor** (e.g. a MOSFET), a **relay**, or — as on the EcoDuino — a small **motor-driver chip** already on the board, steered by **two pins, 5 and 6**. Drive *both* HIGH and the pump runs; *both* LOW and it stops.

```
  Arduino pins 5 + 6 ──► [ onboard motor driver ] ──► PUMP ──► battery pack
     (tiny signals)            (the switch)          (big current)
```

A **flyback diode** across the pump absorbs that turn-off spike. On the kit it is already fitted; on a breadboard you add it yourself.

### The section running right now

```cpp
void setPump(bool on) {
  // The EcoDuino's onboard driver needs BOTH pins driven together.
  digitalWrite(PUMP_A, on ? HIGH : LOW);
  digitalWrite(PUMP_B, on ? HIGH : LOW);
  pumpOn = on;
}

void runTestActuators() {
  unsigned long t = millis() - pumpStartMs;
  if (pumpOn && t >= 2000UL) {         // been ON for 2 s → rest
    setPump(false);
    pumpStartMs = millis();
  } else if (!pumpOn && t >= 5000UL) { // rested 5 s → pulse again
    setPump(true);
    pumpStartMs = millis();
  }
}
```

Notice there is no `delay()`: the function checks the clock (`millis()`), acts if it is time, and returns immediately — so the program keeps listening for your next command even mid-pulse. Type `normal run` while the pump is on and watch it stop instantly: every mode change forces the pump off first. That is a **safety default**.

You have now exercised both inputs and the output, in isolation, without uploading anything new. Next: switch everything on at once.

<!-- slug: 06 -->
## Normal run — the watering logic

Type **`normal run`**. All sections are now live: the program senses, decides, and acts. But *how* should it decide? Let's reason it out and then find that reasoning in the code.

### A first, naive rule

> *If the soil is dry, turn the pump on. If not, turn it off.*

Right idea, three problems.

**Problem 1 — what does "dry" mean? → a threshold.** The sensor gives a number; we need a line in the sand. You *measured* yours in Lesson 4: that is `DRY_THRESHOLD`.

**Problem 2 — flickering at the edge → hysteresis.** Right at the threshold, sensor noise makes the value jump above and below, so the pump would flicker on-off-on-off. The fix is **two** thresholds: turn *on* when quite dry (`< DRY_THRESHOLD`), consider it satisfied only once properly wet (`> WET_THRESHOLD`).

**Problem 3 — what if the sensor lies? → a safety limit.** Water takes time to spread through soil before the probe "feels" it. If we pumped *until the reading moved*, we could **flood** the plant. So a hard rule overrides everything: one burst never exceeds `PUMP_BURST_MS`, followed by a forced `SOAK_WAIT_MS` pause.

### The final logic: pulse and wait

1. Read moisture (and air temperature/humidity for context).
2. If dry → run the pump for one short, **fixed** burst.
3. **Wait** while the water soaks in — no reading, no pumping.
4. Repeat.

This is exactly `runNormal()` in the full program:

```cpp
void runNormal() {
  // Safety limit: end the burst after PUMP_BURST_MS, no matter what.
  if (pumpOn && millis() - pumpStartMs >= PUMP_BURST_MS) {
    setPump(false);
    soaking = true;
    soakStartMs = millis();
  }

  // Soak: let the water spread before trusting the probe again.
  if (soaking) {
    if (millis() - soakStartMs < SOAK_WAIT_MS) return;
    soaking = false;
  }

  // Sense + decide (every 2 s).
  if (pumpOn || millis() - lastSensorMs < SENSOR_EVERY_MS) return;
  lastSensorMs = millis();

  int soil = analogRead(SOIL_PIN);
  if (soil < DRY_THRESHOLD) {   // your calibration from Lesson 4
    setPump(true);              // act: one safe burst
    pumpStartMs = millis();
  }
}
```

### Verify the loop

- Push the probe into **dry** soil → within a couple of seconds, one 3-second burst.
- Then it **soaks** — it does not pump again immediately. That's your safety rule working.
- Wet soil (or probe in water) → it stays off.
- Type `test sensors` at any moment → the pump is locked off again. The console is your control panel.

That is **sense → decide → act**, closed through the plant itself. The program you uploaded in Lesson 2 is no longer a black box: you have now run, watched, and understood every section of it.

> **Make it yours:** set `DRY_THRESHOLD`/`WET_THRESHOLD` to *your* calibration, shorten `PUMP_BURST_MS` for a small pot, and let temperature nudge the threshold on hot days.

<!-- slug: 07 -->
## Add WiFi with an ESP32

Our EcoDuino (an ATmega32U4, like a Leonardo) does its job perfectly — but it cannot talk to the internet. The **extension** of this workshop swaps the brain for an **ESP32**: a microcontroller with **WiFi and Bluetooth built in**, for a similar price.

Everything you learned transfers. The ESP32 reads the same sensors and drives the same pump — the *logic is identical*. What's new is that it can also **report and receive data over the network**.

### What changes

| | EcoDuino (ATmega32U4) | ESP32 |
|---|---|---|
| Logic voltage | 5 V | **3.3 V** (mind your sensors!) |
| Analog read | `analogRead` 0–1023 | `analogRead` 0–4095 |
| Connectivity | USB only | **WiFi + Bluetooth** |

> ⚠️ The ESP32 runs at **3.3 V**. Check that your soil probe and pump driver are 3.3 V-friendly, or use a level shifter / the kit's protected inputs.

### Connect and report

```cpp
#include <WiFi.h>

const char* SSID = "your-network";
const char* PASS = "your-password";

void setup() {
  Serial.begin(115200);
  WiFi.begin(SSID, PASS);
  while (WiFi.status() != WL_CONNECTED) { delay(300); Serial.print("."); }
  Serial.println("\nConnected! IP: " + WiFi.localIP().toString());
}
```

Once online, the plant can **publish** its readings — typically over **MQTT**, a lightweight messaging protocol where each plant sends its data to a central broker. Many devices, one stream of truth. A free dashboard (e.g. a home-automation server) can then chart soil moisture over days.

The plant has gone from a closed box on your desk to a **node on a network**.

<!-- slug: 08 -->
## Intelligence in the loop: an LLM via API

We asked at the start: *can we put intelligence in the loop?* Now that the plant is online, yes.

Our watering logic is a fixed rule: *if dry, water.* A **Large Language Model (LLM)** can reason with richer context — season, recent weather, the specific plant species, the last few days of readings — and *recommend* an action in plain language.

### How it works

The ESP32 sends the model a small summary and asks for a decision. The model replies; the ESP32 acts on the reply.

```
ESP32  ──(HTTPS: "soil=380, temp=31C, humidity=22%,
                  basil, last watered 18h ago.
                  Water now? answer yes/no + reason")──►  LLM API

LLM    ──("yes — soil is below basil's comfort range and the
           hot, dry air increases water loss")──►  ESP32  ──► pump
```

The newest, most capable models for this are Anthropic's **Claude** family (e.g. `claude-opus-4-8`). You call the API over HTTPS with your sensor summary in the prompt and parse the answer.

### Important design notes

- **Keep the safety logic local.** The LLM *advises*; the firmware still enforces the hard limits from Lesson 6 (max pump time, minimum wait). Never let a remote answer flood your plant.
- **Don't call it every second.** Query occasionally (e.g. once an hour, or only when borderline). API calls cost money and the soil changes slowly.
- **Handle no-reply.** If WiFi or the API is down, fall back to the simple local rule. The plant must survive offline.

This is the heart of the extension: the **embedded system handles the fast, safe reflexes**, and the **LLM adds slow, contextual judgement** on top. Reflexes below, reasoning above.

<!-- slug: 09 -->
## Remote commands & networks of plants

The final questions from the brief: *can the actuator be triggered remotely? Can we build an interconnected network?* Yes to both — and this is where one self-watering pot becomes a system.

### Remote commands

Because the ESP32 listens on the network, you can send it a command — *"water now"* — from a phone, a web page, or an automation. The same MQTT broker that *receives* readings can *send* commands back. (Notice you already built this pattern: the Serial Monitor commands from Lesson 2 are remote control over a wire. MQTT just removes the wire.)

```
   Your phone ──► broker ──► ESP32 ──► pump
   (button)               (command)
```

> 🔒 **Safety first — this is hardware on the internet.** Anything that can switch a pump remotely must be protected: authenticate every command, keep the **local burst-and-wait limits** so a flood of commands can't flood the plant, and never expose the device directly to the open internet. The reflex layer from Lesson 6 is your last line of defence.

### A network of plants

Now scale it. Each plant is an identical node: *sense → decide → act → report*. Point them all at one broker and one dashboard:

```
  [Plant A] ─┐
  [Plant B] ─┼──► broker ──► dashboard  (charts, alerts)
  [Plant C] ─┘                  │
                                └──► optional LLM "gardener"
                                     watching all of them
```

From here the ideas open up:

- A **shared dashboard** showing every plant's moisture and trend.
- **Alerts** when a tank runs dry or a sensor flat-lines.
- One **LLM "gardener"** reasoning across the whole garden, coordinating watering by species and weather.
- Community-scale: a balcony, a classroom, a **rooftop farm** — all the same pattern, repeated.

### Where you've arrived

You started by uploading a finished, working program. You learned the shape every sketch shares, then used the program's own test modes to take it apart — sensors, actuators, logic — and watched it run whole again. Then you gave it a voice on the network, intelligence in the loop, and a path to scale.

That is the whole journey of an embedded, connected, intelligent system — built around one plant that refuses to go thirsty.

> Built for the **Sustainability Lab** workshop. Explore the project: <https://sustanability-lab-landing-page.vercel.app/>

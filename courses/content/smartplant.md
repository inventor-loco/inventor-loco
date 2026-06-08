<!-- slug: 01 -->
## Meet your self-watering plant

Welcome to the **Sustainability Lab** workshop. Today you will build a plant that waters itself — and, more importantly, you will understand *every* part of how it does so.

We use a **top-down methodology**. You do not start with a pile of components and a wiring diagram. You start with a **complete, working system**: a plant, a tank of water, a small pump, two sensors, and a microcontroller already running the program. We switch it on, and it works. Only *then* do we open it up and ask *why*.

> **Why top-down?** Seeing the finished behaviour first gives every later step a purpose. When we test the soil sensor in Unit 2, you already know exactly where that reading goes and what it decides.

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

### What to do right now

1. Place the probe in the soil and the pump's tube into the water tank.
2. Connect the board to power (USB or battery).
3. Watch. When the soil is dry enough, the pump runs for a few seconds, then stops.

That is the whole system. In the next lesson we give names to its pieces.

<!-- slug: 02 -->
## Inputs and outputs of the system

Every automatic system does three things in a loop: it **senses** the world, it **decides** what to do, and it **acts** on the world. Engineers call this **sense → decide → act**.

To understand any system, first separate its **inputs** from its **outputs**.

### Inputs = sensors

These bring information *into* the controller. Our plant has two:

- **Soil moisture** — a resistive probe. Dry soil conducts poorly (high resistance); wet soil conducts well (low resistance). The board reads this as a number.
- **Temperature & humidity** — the **DHT-11**, telling us about the air. A hot, dry day means the plant loses water faster.

### Outputs = actuators

These let the controller *change* the world. Our plant has one:

- **Water pump** — when the controller switches it on, water flows from the tank to the soil.

### The loop, drawn out

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

<!-- slug: 03 -->
## The watering logic

Before we write a single line of code, let's **think**. When should the pump turn **on**? When must it turn **off**?

### A first, naive rule

> *If the soil is dry, turn the pump on. If not, turn it off.*

This is the right idea but it has three problems. Let's fix each one.

### Problem 1 — What does "dry" mean? → a threshold

The sensor gives a number. We need a line in the sand: a **threshold**. Below it = water; above it = fine. We will *measure* this number in Unit 2 (calibration), but the logic is:

```
if (moisture < DRY_THRESHOLD)  pump = ON;
else                            pump = OFF;
```

### Problem 2 — Flickering at the edge → hysteresis

Right at the threshold, sensor noise makes the value jump above and below, so the pump flickers on-off-on-off. The fix is **hysteresis**: use *two* thresholds.

- Turn **on** when it gets quite dry (`< DRY`).
- Turn **off** only once it is properly wet (`> WET`), not the instant it crosses back.

```
if (moisture < DRY)  pump = ON;
if (moisture > WET)  pump = OFF;
```

### Problem 3 — What if the sensor lies? → a safety limit

Water takes time to spread through soil before the probe "feels" it. If we keep pumping until the reading moves, we may **flood** the plant. So we add a hard rule that overrides everything:

> *Never run the pump longer than `MAX_ON_TIME` (say, 5 seconds), then wait before checking again.*

### The final logic

1. Read moisture.
2. If dry and pump is off → run pump for a short, **fixed** burst.
3. Wait a while (let water soak in).
4. Repeat.

This "pulse and wait" approach is safer than "pump until wet." Hold on to this reasoning — the code in Lesson 7 is just this paragraph, translated.

<!-- slug: 04 -->
## Test the input: soil moisture

Now we open the system and test **one part at a time**. We begin with the sensor that drives the whole decision: the resistive soil-moisture probe.

### Wiring

The probe has three pins: **VCC**, **GND**, and **signal**. On the EcoDuino board the moisture header is already wired to **analog pin A2** — so plug the probe into its labelled socket and that's the connection.

- VCC → VCC (5V)
- GND → GND
- Signal → analog pin **A2**

### Read it

`analogRead()` turns the probe's voltage into a number from **0 to 1023**.

```cpp
const int SOIL_PIN = A2;   // EcoDuino wires the moisture header to A2

void setup() {
  Serial.begin(9600);
}

void loop() {
  int moisture = analogRead(SOIL_PIN);
  Serial.println(moisture);
  delay(500);
}
```

Open the **Serial Monitor** (magnifying-glass icon, top right of the Arduino IDE) and watch the numbers.

### Calibrate — the important bit

The raw number means nothing until *you* give it meaning. Do this experiment:

| Condition | Push the probe into… | Write down the value |
|-----------|----------------------|----------------------|
| **Dry** | air / dry soil | `____` (your DRY) |
| **Wet** | a cup of water / soaked soil | `____` (your WET) |

> **Note:** Depending on how the probe is wired, *higher* may mean wetter **or** drier. Don't assume — read both extremes and see which way it goes. Your two numbers define the thresholds from Lesson 3.

A resistive probe corrodes over time because current flows through wet soil. That's fine for a workshop; for a long-term build, a **capacitive** probe lasts far longer. Good thing to mention to students.

<!-- slug: 05 -->
## Test the input: temperature & humidity

Our second sensor is the **DHT-11** — a small blue module that reports **air temperature** and **relative humidity**. It is our first *digital* sensor: instead of a raw voltage, it sends a small data packet over one wire.

### Wiring

Three used pins: **VCC**, **GND**, **DATA**. On the EcoDuino the DHT11 header is wired to **digital pin 9**.

- VCC → VCC (5V)
- GND → GND
- DATA → digital pin **9**

### Read it

The DHT-11 needs a library. The EcoDuino ships with DFRobot's own `AutoWatering` library (which bundles a `DHT` driver), but for learning we'll use the well-documented **Adafruit "DHT sensor library"**: **Tools → Manage Libraries → search "DHT sensor library" (Adafruit) → Install**.

```cpp
#include "DHT.h"

#define DHTPIN  9        // EcoDuino wires the DHT11 header to digital pin 9
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  float t = dht.readTemperature();   // °C
  float h = dht.readHumidity();      // %

  Serial.print("Temp: ");     Serial.print(t);
  Serial.print(" C  Hum: ");  Serial.print(h);
  Serial.println(" %");

  delay(2000);   // DHT-11 is slow — don't read faster than every 2 s
}
```

### Know its limits

- **Slow:** one reading every ~2 seconds, no faster.
- **Rough:** ±2 °C and ±5 % humidity. Fine for "is it hot and dry today?", not for a laboratory.
- Breathe on it or cup it in your hand — you'll watch humidity climb. Proof it's alive.

In our plant, temperature and humidity are *context*: a hot, dry day suggests watering a little sooner. The soil probe still makes the core decision.

<!-- slug: 06 -->
## Test the output: water pump

Time for our only actuator. The pump is the first part with **real power** behind it — and the first that can damage your board if connected carelessly.

### Golden rule: never drive a motor straight from a pin

An Arduino pin supplies only a few tens of milliamps. A pump pulls far more, and when a motor switches off it kicks back a voltage **spike**. Connect it directly and you destroy the pin — or the whole board.

So the pin does not *power* the pump. It only sends a **command** to a switch that handles the power: a **transistor** (e.g. a MOSFET), a **relay**, or — as on the EcoDuino — a small **motor-driver chip**. On this kit that driver is already on the board, and it is steered by **two** pins, **5 and 6**. Drive *both* HIGH and the pump runs; drive *both* LOW and it stops.

```
  Arduino pins 5 + 6 ──► [ onboard motor driver ] ──► PUMP ──► battery pack
     (tiny signals)            (the switch)          (big current)
```

A **flyback diode** across the pump absorbs that turn-off spike. On the kit it is already fitted; on a breadboard, you add it yourself.

### Switch it

```cpp
const int PUMP_A = 5;   // the two pins that steer the onboard pump driver
const int PUMP_B = 6;

void setup() {
  pinMode(PUMP_A, OUTPUT);
  pinMode(PUMP_B, OUTPUT);
}

void loop() {
  digitalWrite(PUMP_A, HIGH);    // pump ON — both pins HIGH
  digitalWrite(PUMP_B, HIGH);
  delay(3000);                   // run 3 seconds
  digitalWrite(PUMP_A, LOW);     // pump OFF — both pins LOW
  digitalWrite(PUMP_B, LOW);
  delay(10000);                  // wait 10 seconds
}
```

Put the tube into a cup, the outlet into another, and watch it move water. **Never run a pump dry** for long — without water to move, many small pumps overheat.

You have now tested both inputs and the output, in isolation. Next we reunite them.

<!-- slug: 07 -->
## Put it all together

We tested the soil probe, the DHT-11, and the pump separately. Now we rebuild the **exact system** we switched on in Lesson 1 — but this time you understand every line.

The sketch is simply the **logic from Lesson 3**, written in code:

```cpp
#include "DHT.h"

const int SOIL_PIN = A2;   // EcoDuino: moisture header → A2
const int PUMP_A   = 5;    // EcoDuino: onboard pump driver → pins 5 & 6
const int PUMP_B   = 6;
#define DHTPIN  9          // EcoDuino: DHT11 header → digital pin 9
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// From your calibration in Lesson 4 — adjust these!
const int DRY = 400;   // below this → soil is dry → water
const int WET = 700;   // above this → soil is wet → stop

const unsigned long PUMP_MS = 3000;     // burst length  (safety, Lesson 3)
const unsigned long WAIT_MS = 30000;    // soak time before checking again

void pump(bool on) {                    // both driver pins move together
  digitalWrite(PUMP_A, on ? HIGH : LOW);
  digitalWrite(PUMP_B, on ? HIGH : LOW);
}

void setup() {
  Serial.begin(9600);
  pinMode(PUMP_A, OUTPUT);
  pinMode(PUMP_B, OUTPUT);
  dht.begin();
}

void loop() {
  int moisture = analogRead(SOIL_PIN);
  float t = dht.readTemperature();
  float h = dht.readHumidity();

  Serial.print("Soil: ");  Serial.print(moisture);
  Serial.print("  T: ");   Serial.print(t);
  Serial.print("  H: ");   Serial.println(h);

  if (moisture < DRY) {            // decide
    Serial.println("Dry → watering");
    pump(true);                    // act: a single safe burst
    delay(PUMP_MS);
    pump(false);
    delay(WAIT_MS);                // let it soak, then re-check
  } else {
    delay(2000);
  }
}
```

### Verify the loop

- Push the probe into **dry** soil → after a moment, the pump should pulse.
- Then it **waits** — it does not pump again immediately (your safety rule working).
- Pour water in / move the probe to wet soil → it stays off.

That is **sense → decide → act**, closed through the plant itself. The system you met in Lesson 1 is no longer a black box.

> **Make it yours:** tune `DRY`/`WET` to *your* calibration, shorten `PUMP_MS` for a small pot, and let temperature nudge the threshold on hot days.

<!-- slug: 08 -->
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

<!-- slug: 09 -->
## Intelligence in the loop: an LLM via API

We asked at the start: *can we put intelligence in the loop?* Now that the plant is online, yes.

Our Lesson 3 logic is a fixed rule: *if dry, water.* A **Large Language Model (LLM)** can reason with richer context — season, recent weather, the specific plant species, the last few days of readings — and *recommend* an action in plain language.

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

- **Keep the safety logic local.** The LLM *advises*; the firmware still enforces the hard limits from Lesson 3 (max pump time, minimum wait). Never let a remote answer flood your plant.
- **Don't call it every second.** Query occasionally (e.g. once an hour, or only when borderline). API calls cost money and the soil changes slowly.
- **Handle no-reply.** If WiFi or the API is down, fall back to the simple local rule. The plant must survive offline.

This is the heart of the extension: the **embedded system handles the fast, safe reflexes**, and the **LLM adds slow, contextual judgement** on top. Reflexes below, reasoning above.

<!-- slug: 10 -->
## Remote commands & networks of plants

The final questions from the brief: *can the actuator be triggered remotely? Can we build an interconnected network?* Yes to both — and this is where one self-watering pot becomes a system.

### Remote commands

Because the ESP32 listens on the network, you can send it a command — *"water now"* — from a phone, a web page, or an automation. The same MQTT broker that *receives* readings can *send* commands back.

```
   Your phone ──► broker ──► ESP32 ──► pump
   (button)               (command)
```

> 🔒 **Safety first — this is hardware on the internet.** Anything that can switch a pump remotely must be protected: authenticate every command, keep the **local burst-and-wait limits** so a flood of commands can't flood the plant, and never expose the device directly to the open internet. The reflex layer from Lesson 3 is your last line of defence.

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

You started by switching on a finished plant. You took it apart, understood each input and output, reasoned out the control logic, tested every piece, and put it back together. Then you gave it a voice on the network, intelligence in the loop, and a path to scale.

That is the whole journey of an embedded, connected, intelligent system — built around one plant that refuses to go thirsty.

> Built for the **Sustainability Lab** workshop. Explore the project: <https://sustanability-lab-landing-page.vercel.app/>

/* course-data-smartplant.js — Sustainability Lab workshop guide */
window.COURSE = {
  "slug": "smartplant",
  "badge": "Workshop · Arduino · Sensors · IoT",
  "title": "Build a Self-Watering Plant",
  "accent": "var(--c-smartplant)",
  "acc2": "var(--c-smartplant-soft)",
  "backUrl": "../courses.html",
  "units": [
    {
      "name": "Unit 1 — The Full System",
      "lessons": [
        {
          "title": "The complete code — start here",
          "subtitle": "Top-down: you get the finished, working program first. Upload it, open the Serial Monitor, and explore three modes live.",
          "objective": "Upload the full sketch to the EcoDuino, open the Serial Monitor at 9600 baud, and switch between 'test sensors', 'test actuators', and 'normal run' modes.",
          "tags": ["Top-Down", "Full Code", "Serial Monitor", "Modes"]
        },
        {
          "title": "Arduino anatomy: preamble, setup, loop",
          "subtitle": "Every Arduino sketch has three zones. Once you see the pattern you can read any program — including the full one from Lesson 1.",
          "objective": "Identify the preamble, setup(), and loop() sections in the full sketch and explain the role of each.",
          "tags": ["Arduino", "Architecture", "Setup", "Loop"]
        },
        {
          "title": "How the system works",
          "subtitle": "Sense → decide → act, in a closed loop through the plant itself. Here we name every part and trace the logic.",
          "objective": "Draw the sense → decide → act loop, label each component as input or output, and explain the burst-and-wait watering strategy.",
          "tags": ["Sense", "Decide", "Act", "Closed Loop", "Logic"]
        }
      ]
    },
    {
      "name": "Unit 2 — Test the Parts",
      "lessons": [
        {
          "title": "Test your sensors",
          "subtitle": "Type 'test sensors' and watch live readings from the soil probe and DHT11. Then calibrate your dry and wet thresholds.",
          "objective": "Use 'test sensors' mode to record your soil probe's dry and wet extreme values and update DRY_THRESHOLD in the sketch.",
          "tags": ["Test Sensors", "Calibration", "Soil Moisture", "DHT11"]
        },
        {
          "title": "The soil moisture probe in depth",
          "subtitle": "How a resistive probe turns soil wetness into a number — and why you must calibrate it yourself.",
          "objective": "Explain how analogRead() works with the resistive probe, and state two limitations to keep in mind for long-term builds.",
          "tags": ["Soil Moisture", "Analog Read", "Resistive Probe", "Calibration"]
        },
        {
          "title": "The DHT11 temperature & humidity sensor",
          "subtitle": "Our first digital sensor. It sends a data packet over one wire and needs a library to decode it.",
          "objective": "Read temperature and humidity from the DHT11, handle NaN errors, and describe the sensor's speed and accuracy limits.",
          "tags": ["DHT11", "Temperature", "Humidity", "Digital Sensor"]
        },
        {
          "title": "Test your actuator",
          "subtitle": "Type 'test actuators' and watch the pump cycle. Then learn why it never connects directly to a pin.",
          "objective": "Use 'test actuators' mode to verify the pump moves water, and explain the role of the onboard motor-driver chip.",
          "tags": ["Test Actuators", "Water Pump", "Motor Driver", "Safety"]
        }
      ]
    },
    {
      "name": "Unit 3 — Extension: Intelligence & Connectivity",
      "lessons": [
        {
          "title": "Add WiFi with an ESP32",
          "subtitle": "Swap the brain for one that talks to the internet. The same logic, now reachable from anywhere.",
          "objective": "Understand how an ESP32 replaces the EcoDuino, connects to WiFi, and publishes sensor data via MQTT.",
          "tags": ["ESP32", "WiFi", "IoT", "MQTT"]
        },
        {
          "title": "Intelligence in the loop: an LLM via API",
          "subtitle": "Can a language model help decide when to water? We send it the data and let it reason alongside us.",
          "objective": "Describe how the ESP32 calls an LLM API with sensor context and receives a watering recommendation, while keeping safety logic local.",
          "tags": ["LLM", "API", "Claude", "Decision Support"]
        },
        {
          "title": "Remote commands & networks of plants",
          "subtitle": "Trigger the pump from your phone. Then imagine many plants on one dashboard — the garden becomes a network.",
          "objective": "Outline remote actuation via MQTT, basic safety rules for internet-controlled hardware, and a multi-node interconnected design.",
          "tags": ["Remote Control", "Network", "Dashboard", "Scaling"]
        }
      ]
    }
  ]
};

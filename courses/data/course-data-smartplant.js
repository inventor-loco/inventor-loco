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
      "name": "Unit 1 — The Working System",
      "lessons": [
        {
          "title": "Meet your self-watering plant",
          "subtitle": "You start with a complete, working system. We learn it top-down — from the whole, then into the parts.",
          "objective": "Identify the parts of the DFRobot EcoDuino kit, classify each as input (sensor) or output (actuator), and sketch the sense → decide → act loop.",
          "tags": ["Top-Down", "DFRobot", "EcoDuino", "Sensors", "Actuators"]
        },
        {
          "title": "The full program — upload it and drive it",
          "subtitle": "Download the complete sketch, upload it once, and switch its sections on and off from the Serial Monitor.",
          "objective": "Upload SelfWateringPlant.ino and use the console commands — test sensors, test actuators, normal run — to control which section of the program runs.",
          "tags": ["Full Code", "Upload", "Serial Monitor", "Commands"]
        },
        {
          "title": "Anatomy of an Arduino sketch",
          "subtitle": "Preamble, setup(), loop() — every Arduino program shares the same three-part architecture.",
          "objective": "Recognise the preamble / setup / loop structure in miniature sketches and map it onto the full workshop program.",
          "tags": ["Preamble", "Setup", "Loop", "Architecture"]
        }
      ]
    },
    {
      "name": "Unit 2 — Test the Parts",
      "lessons": [
        {
          "title": "Test the sensors",
          "subtitle": "Type 'test sensors': the pump locks off and the program prints soil moisture, temperature, and humidity. Time to calibrate.",
          "objective": "Use the test-sensors mode to read the soil probe and DHT11, and record your dry and wet calibration points.",
          "tags": ["Soil Moisture", "DHT-11", "Analog Read", "Calibration"]
        },
        {
          "title": "Test the actuators",
          "subtitle": "Type 'test actuators': the pump pulses safely while sensors are ignored. Learn why a motor never connects straight to a pin.",
          "objective": "Use the test-actuators mode to pulse the pump through the onboard driver, and explain the protection components.",
          "tags": ["Water Pump", "Motor Driver", "Actuator", "Safety"]
        },
        {
          "title": "Normal run — the watering logic",
          "subtitle": "Type 'normal run': everything is live. Threshold, hysteresis, and a safety limit keep the plant watered, not flooded.",
          "objective": "Reason out the watering rule (threshold, hysteresis, burst-and-soak safety) and verify the full sense → decide → act loop running live.",
          "tags": ["Control Logic", "Threshold", "Hysteresis", "Verification"]
        }
      ]
    },
    {
      "name": "Unit 3 — Extension: Intelligence & Connectivity",
      "lessons": [
        {
          "title": "Add WiFi with an ESP32",
          "subtitle": "Swap the brain for one that talks to the internet. The same logic, now reachable from anywhere.",
          "objective": "Understand how an ESP32 replaces the Leonardo, connects to WiFi, and reports sensor data online.",
          "tags": ["ESP32", "WiFi", "IoT", "MQTT"]
        },
        {
          "title": "Intelligence in the loop: an LLM via API",
          "subtitle": "Can a language model help decide when to water? We send it the data and let it reason with us.",
          "objective": "Describe how the ESP32 calls an LLM API with sensor context and receives a watering recommendation.",
          "tags": ["LLM", "API", "Claude", "Decision Support"]
        },
        {
          "title": "Remote commands & networks of plants",
          "subtitle": "Activate the pump from your phone, and imagine many plants reporting to one dashboard. The garden becomes a network.",
          "objective": "Outline remote actuation, basic safety for internet-controlled hardware, and a multi-node interconnected design.",
          "tags": ["Remote Control", "Network", "Dashboard", "Scaling"]
        }
      ]
    }
  ]
};

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
          "objective": "Power up the DFRobot kit, see it keep a plant watered on its own, and describe what the system does before opening it up.",
          "tags": ["Top-Down", "DFRobot", "Arduino Leonardo", "Overview"]
        },
        {
          "title": "Inputs and outputs of the system",
          "subtitle": "Every automatic system senses, decides, and acts. Let's name the sensors and the actuators in front of us.",
          "objective": "Classify each component as an input (sensor) or output (actuator), and sketch the sense → decide → act loop.",
          "tags": ["Inputs", "Outputs", "Sensors", "Actuators"]
        },
        {
          "title": "The watering logic",
          "subtitle": "When should the pump turn on, and when must it stop? Good logic is the difference between a healthy plant and a flooded one.",
          "objective": "Write the decision rule for the pump using a threshold, hysteresis, and a safety limit — before touching any code.",
          "tags": ["Control Logic", "Threshold", "Hysteresis", "Safety"]
        }
      ]
    },
    {
      "name": "Unit 2 — Test the Parts",
      "lessons": [
        {
          "title": "Test the input: soil moisture",
          "subtitle": "The resistive probe is the plant's thirst sensor. We read it, watch it change, and calibrate dry vs. wet.",
          "objective": "Read the analog soil-moisture value, observe it in the Serial Monitor, and record your dry and wet calibration points.",
          "tags": ["Soil Moisture", "Analog Read", "Calibration", "Serial Monitor"]
        },
        {
          "title": "Test the input: temperature & humidity",
          "subtitle": "The DHT-11 tells us about the air around the plant. Useful context, and our first digital sensor.",
          "objective": "Wire and read the DHT-11, print temperature and humidity, and understand the sensor's limits.",
          "tags": ["DHT-11", "Temperature", "Humidity", "Digital Sensor"]
        },
        {
          "title": "Test the output: water pump",
          "subtitle": "An actuator with real power behind it. We switch the pump safely and learn why it never connects straight to a pin.",
          "objective": "Drive the pump through a transistor/relay, run it for a fixed time, and explain the protection components.",
          "tags": ["Water Pump", "Relay", "Transistor", "Actuator"]
        },
        {
          "title": "Put it all together",
          "subtitle": "Sensors + logic + pump, reassembled into the loop we started with — but now we understand every line.",
          "objective": "Combine the tested parts into one sketch that waters automatically, and verify the full sense → decide → act loop.",
          "tags": ["Integration", "Loop", "Automation", "Verification"]
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

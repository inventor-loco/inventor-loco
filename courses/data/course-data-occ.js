/* course-data-occ.js — auto-generated */
window.COURSE = {
  "slug": "occ",
  "badge": "OCC · DSP · Experiments · Computer Vision",
  "title": "Optical Camera Communications (OCC)",
  "accent": "var(--c-occ)",
  "acc2": "var(--c-occ-soft)",
  "backUrl": "../courses.html",
  "units": [
    {
      "name": "Unit 1 — Physical Foundations",
      "lessons": [
        {
          "title": "Introduction to visible light and optical wireless",
          "subtitle": "What OCC is, why cameras instead of photodetectors, and where the field stands today.",
          "objective": "Understand the distinction between image-sensor-based and photodetector-based optical reception, and name three application scenarios where OCC is the better choice.",
          "tags": [
            "OCC",
            "VLC",
            "Optical Wireless",
            "Introduction"
          ]
        },
        {
          "title": "LED physics and emission characteristics",
          "subtitle": "From the p-n junction to spectral emission — what matters for OCC transmitter design.",
          "tags": [
            "LED",
            "Emission",
            "Spectral",
            "Transmitter"
          ]
        },
        {
          "title": "Photodetection vs. camera-based reception",
          "subtitle": "Why a rolling-shutter CMOS sensor can decode data embedded in light.",
          "tags": [
            "CMOS",
            "Rolling Shutter",
            "Photodetection"
          ]
        },
        {
          "title": "Rolling shutter and global shutter behaviour",
          "subtitle": "The fundamental mechanism that makes rolling-shutter cameras useful as OCC receivers.",
          "tags": [
            "Rolling Shutter",
            "Global Shutter",
            "CMOS",
            "Readout"
          ]
        },
        {
          "title": "OCC system overview and link budget",
          "subtitle": "End-to-end system model: transmitter, channel, receiver, and how to estimate link performance before building anything.",
          "tags": [
            "Link Budget",
            "System Model",
            "SNR",
            "Channel"
          ]
        }
      ]
    },
    {
      "name": "Unit 2 — Camera Hardware",
      "lessons": [
        {
          "title": "Camera sensors: CMOS and CCD",
          "subtitle": "Pixel architecture, readout modes, and why CMOS rolling-shutter sensors dominate OCC research.",
          "tags": [
            "CMOS",
            "CCD",
            "Pixel",
            "Readout"
          ]
        },
        {
          "title": "Exposure, gain, and frame rate trade-offs",
          "subtitle": "The three parameters that most directly affect OCC data rate and signal quality.",
          "tags": [
            "Exposure",
            "Gain",
            "Frame Rate",
            "Trade-off"
          ]
        },
        {
          "title": "Lens selection and field of view",
          "subtitle": "How focal length and aperture affect received signal strength and spatial multiplexing capacity.",
          "tags": [
            "Lens",
            "Focal Length",
            "FOV",
            "Aperture"
          ]
        },
        {
          "title": "Raspberry Pi Camera and consumer-grade devices",
          "subtitle": "Practical guide to using off-the-shelf cameras for OCC experimentation.",
          "tags": [
            "Raspberry Pi",
            "Consumer Camera",
            "Hardware",
            "Prototyping"
          ]
        },
        {
          "title": "Camera calibration and characterisation",
          "subtitle": "Intrinsic parameters, distortion, and how to build a camera model for reliable OCC experiments.",
          "tags": [
            "Calibration",
            "Intrinsics",
            "Distortion",
            "OpenCV"
          ]
        }
      ]
    },
    {
      "name": "Unit 3 — Modulation & Signal Processing",
      "lessons": [
        {
          "title": "On-off keying (OOK) and pulse-width modulation",
          "subtitle": "The simplest OCC modulation schemes and why they are still the most widely deployed.",
          "tags": [
            "OOK",
            "PWM",
            "Modulation",
            "Baseband"
          ]
        },
        {
          "title": "Frequency-shift keying and colour coding",
          "subtitle": "Multi-carrier and colour-based modulation strategies for higher spectral efficiency.",
          "tags": [
            "FSK",
            "CSK",
            "Colour",
            "Spectral Efficiency"
          ]
        },
        {
          "title": "Rolling-shutter MIMO — grouped LED arrays",
          "subtitle": "The architecture behind the most-cited paper in this line of research (42 citations).",
          "tags": [
            "MIMO",
            "Rolling Shutter",
            "LED Array",
            "Spatial Multiplexing"
          ]
        },
        {
          "title": "Sub-pixel detection and spatial multiplexing",
          "subtitle": "Extracting data from regions smaller than a single pixel to increase channel capacity.",
          "tags": [
            "Sub-pixel",
            "Spatial Multiplexing",
            "Detection",
            "Capacity"
          ]
        },
        {
          "title": "Correlation-based receivers and matched filtering",
          "subtitle": "The signal processing backbone of robust OCC demodulation.",
          "tags": [
            "Correlation",
            "Matched Filter",
            "Receiver",
            "DSP"
          ]
        }
      ]
    },
    {
      "name": "Unit 4 — Experimental Methods",
      "lessons": [
        {
          "title": "Ground truth setups and measurement protocols",
          "subtitle": "How to design a repeatable experiment that others can reproduce — and cite.",
          "tags": [
            "Ground Truth",
            "Protocol",
            "Reproducibility",
            "Measurement"
          ]
        },
        {
          "title": "Indoor channel measurement campaigns",
          "subtitle": "Controlled environments, distances, angles, and what metrics to record.",
          "tags": [
            "Indoor",
            "Channel",
            "Measurement",
            "Campaign"
          ]
        },
        {
          "title": "Outdoor and atmospheric channel experiments",
          "subtitle": "Moving OCC outside: sunlight interference, longer distances, and geometric alignment.",
          "tags": [
            "Outdoor",
            "Atmosphere",
            "Sunlight",
            "Long Range"
          ]
        },
        {
          "title": "Fog, turbulence, and sandstorm conditions",
          "subtitle": "Experimental characterisation of OCC under real-world atmospheric impairments.",
          "tags": [
            "Fog",
            "Turbulence",
            "Sandstorm",
            "Impairments"
          ]
        },
        {
          "title": "Underwater OCC characterisation",
          "subtitle": "Adapting camera-based links to the aquatic channel — scattering, absorption, and geometry.",
          "tags": [
            "Underwater",
            "Aquatic",
            "Scattering",
            "Absorption"
          ]
        }
      ]
    },
    {
      "name": "Unit 5 — Applications & Advanced Topics",
      "lessons": [
        {
          "title": "OCC for wireless sensor networks (WSN)",
          "subtitle": "Deploying sub-pixel OCC to interconnect distributed sensors in industrial environments.",
          "tags": [
            "WSN",
            "Sensor Network",
            "Industrial",
            "Sub-pixel"
          ]
        },
        {
          "title": "Wearable LED transmitters and healthcare",
          "subtitle": "Body-worn transmitters, movement artefacts, and indoor positioning for health monitoring.",
          "tags": [
            "Wearable",
            "Healthcare",
            "LED",
            "Indoor Positioning"
          ]
        },
        {
          "title": "Agricultural and smart farming deployments",
          "subtitle": "From the lab to a greenhouse: practical OCC for precision agriculture.",
          "tags": [
            "Smart Farming",
            "Agriculture",
            "IoT",
            "Deployment"
          ]
        },
        {
          "title": "Vehicular VLC and road-to-vehicle links",
          "subtitle": "Early work on V2I and V2V using camera receivers — prototypes and open problems.",
          "tags": [
            "Vehicular",
            "V2I",
            "VLC",
            "Road"
          ]
        },
        {
          "title": "Satellite OCC — OCC4SAT overview and open problems",
          "subtitle": "The €2.4M frontier: extending camera-based optical links to satellite platforms.",
          "tags": [
            "Satellite",
            "OCC4SAT",
            "Space",
            "Open Problems"
          ]
        }
      ]
    }
  ]
};

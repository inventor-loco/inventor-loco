/* course-data-3dprinting.js — auto-generated */
window.COURSE = {
  "slug": "3dprinting",
  "badge": "3D Printing · CAD · CAM · Fabrication",
  "title": "3D Printing & Digital Manufacturing",
  "accent": "#0f766e",
  "acc2": "#ccfbf1",
  "backUrl": "../courses.html",
  "units": [
    {
      "name": "Unit 1 — Machine Architecture",
      "lessons": [
        {
          "title": "FDM, resin, SLS, and SLA compared",
          "subtitle": "A technology map of the additive manufacturing landscape — where each process fits.",
          "tags": [
            "FDM",
            "Resin",
            "SLS",
            "SLA"
          ]
        },
        {
          "title": "FDM motion systems: Cartesian, CoreXY, delta",
          "subtitle": "Kinematics, speed, accuracy, and which architecture suits which use case.",
          "tags": [
            "CoreXY",
            "Cartesian",
            "Delta",
            "Kinematics"
          ]
        },
        {
          "title": "Hot end, cold end, and extruder types",
          "subtitle": "The heart of FDM — how filament is melted, pushed, and deposited.",
          "tags": [
            "Hot End",
            "Extruder",
            "Bowden",
            "Direct Drive"
          ]
        },
        {
          "title": "Heated bed, enclosures, and environment control",
          "subtitle": "Why first-layer adhesion and ambient temperature define print success.",
          "tags": [
            "Heated Bed",
            "Enclosure",
            "Adhesion",
            "Temperature"
          ]
        },
        {
          "title": "Electronics: mainboard, drivers, and firmware overview",
          "subtitle": "The control layer — understanding what TMC drivers, 32-bit boards, and Klipper do.",
          "tags": [
            "Mainboard",
            "TMC",
            "Klipper",
            "Firmware"
          ]
        }
      ]
    },
    {
      "name": "Unit 2 — Materials & Properties",
      "lessons": [
        {
          "title": "PLA, PETG, ABS, ASA — properties and use cases",
          "subtitle": "The four most common FDM filaments: when to use each and what to expect.",
          "tags": [
            "PLA",
            "PETG",
            "ABS",
            "ASA"
          ]
        },
        {
          "title": "Flexible filaments: TPU and TPE",
          "subtitle": "Printing with rubber-like materials — challenges, settings, and applications.",
          "tags": [
            "TPU",
            "TPE",
            "Flexible",
            "Shore Hardness"
          ]
        },
        {
          "title": "Engineering materials: PA, PC, carbon-fibre composites",
          "subtitle": "High-performance filaments that need high-performance hardware.",
          "tags": [
            "Nylon",
            "Polycarbonate",
            "Carbon Fibre",
            "Engineering"
          ]
        },
        {
          "title": "Filament storage, moisture, and drying",
          "subtitle": "Why humidity ruins your prints and how to fix it.",
          "tags": [
            "Moisture",
            "Drying",
            "Storage",
            "Filament"
          ]
        },
        {
          "title": "Resin types and handling safety",
          "subtitle": "Standard, ABS-like, engineering, and flexible resins — plus PPE requirements.",
          "tags": [
            "Resin",
            "MSLA",
            "PPE",
            "Safety"
          ]
        }
      ]
    },
    {
      "name": "Unit 3 — CAD & Slicing",
      "lessons": [
        {
          "title": "3D modelling basics: FreeCAD and Fusion 360",
          "subtitle": "Parametric modelling fundamentals — the minimum you need to design printable parts.",
          "tags": [
            "FreeCAD",
            "Fusion 360",
            "CAD",
            "Parametric"
          ]
        },
        {
          "title": "Design for printing: overhangs, walls, and tolerances",
          "subtitle": "The constraints that define whether a CAD model is actually printable.",
          "tags": [
            "Overhang",
            "Wall Thickness",
            "Tolerance",
            "DFM"
          ]
        },
        {
          "title": "Slicer fundamentals: layer height, infill, supports",
          "subtitle": "The three settings that most affect strength, time, and material use.",
          "tags": [
            "Slicer",
            "Layer Height",
            "Infill",
            "Supports"
          ]
        },
        {
          "title": "Slicing parameters for strength vs. speed",
          "subtitle": "Profile tuning for functional parts vs. rapid prototypes.",
          "tags": [
            "Profile",
            "Strength",
            "Speed",
            "Perimeter"
          ]
        },
        {
          "title": "File formats: STL, 3MF, and STEP",
          "subtitle": "Which format to use when — and why 3MF is replacing STL.",
          "tags": [
            "STL",
            "3MF",
            "STEP",
            "File Format"
          ]
        }
      ]
    },
    {
      "name": "Unit 4 — Operation & Maintenance",
      "lessons": [
        {
          "title": "Bed levelling: manual and automatic (BLTouch/CR Touch)",
          "subtitle": "The most common failure point — mastered once, smooth sailing after.",
          "tags": [
            "Bed Levelling",
            "BLTouch",
            "CR Touch",
            "First Layer"
          ]
        },
        {
          "title": "First-layer calibration and adhesion",
          "subtitle": "Z-offset, squish, and why the first layer determines everything that follows.",
          "tags": [
            "Z-offset",
            "Adhesion",
            "Calibration",
            "First Layer"
          ]
        },
        {
          "title": "Nozzle maintenance, clogs, and cold pulls",
          "subtitle": "How to keep the hot end flowing and fix it when it doesn't.",
          "tags": [
            "Nozzle",
            "Clog",
            "Cold Pull",
            "Maintenance"
          ]
        },
        {
          "title": "Firmware updates and printer tuning",
          "subtitle": "PID tuning, input shaping, pressure advance — the performance upgrades worth doing.",
          "tags": [
            "Firmware",
            "PID",
            "Input Shaping",
            "Pressure Advance"
          ]
        },
        {
          "title": "Remote operation and print farm management",
          "subtitle": "OctoPrint, Klipper/Mainsail, webcam monitoring, and multi-printer workflows.",
          "tags": [
            "OctoPrint",
            "Klipper",
            "Remote",
            "Print Farm"
          ]
        }
      ]
    },
    {
      "name": "Unit 5 — Advanced & Applied",
      "lessons": [
        {
          "title": "Functional part design for engineering applications",
          "subtitle": "From concept to tested part: tolerance stacks, load analysis, and iteration.",
          "tags": [
            "Functional Part",
            "Engineering",
            "Tolerance",
            "Load"
          ]
        },
        {
          "title": "Post-processing: sanding, painting, acetone smoothing",
          "subtitle": "Finishing techniques that take prints from prototype to presentable.",
          "tags": [
            "Post-processing",
            "Sanding",
            "Painting",
            "Acetone"
          ]
        },
        {
          "title": "Recycling filament and sustainability",
          "subtitle": "Filament recyclers, material waste, and the environmental reality of desktop printing.",
          "tags": [
            "Recycling",
            "Sustainability",
            "Waste",
            "Filament"
          ]
        },
        {
          "title": "Online communities: Printables, Thingiverse, GitHub",
          "subtitle": "Where to find models, share designs, and stay current in the maker ecosystem.",
          "tags": [
            "Printables",
            "Thingiverse",
            "Community",
            "Open Source"
          ]
        },
        {
          "title": "Starting a print service or lab business",
          "subtitle": "Pricing, clients, machine utilisation, and the economics of running a small print operation.",
          "tags": [
            "Business",
            "Pricing",
            "Service",
            "Fab Lab"
          ]
        }
      ]
    }
  ]
};

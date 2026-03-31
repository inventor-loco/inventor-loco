<!-- slug: 01 -->
## What is reverse osmosis?

Reverse Osmosis (RO) relies on overcoming natural osmotic pressure. In natural osmosis, a solvent (water) moves across a semipermeable membrane from a region of low solute concentration to one of high solute concentration, driven by the thermodynamic desire to equalize chemical potentials. **Reverse Osmosis** introduces hydrostatic pressure greater than the osmotic pressure (calculated via the van 't Hoff equation: π = iCRT) on the high-concentration side.

This forces water molecules through the sub-nanometer pores of a synthetic membrane, leaving behind heavy metals, inorganic salts, and pathogens. Unlike "dead-end" filtration where water goes straight through a filter (like a coffee filter), RO uses **cross-flow filtration**. Water flows *parallel* to the membrane surface, continuously sweeping away rejected contaminants into a brine (waste) stream, preventing the membrane from rapidly clogging.

![Reverse osmosis process flow showing feed water, pre-filters, membrane separation, permeate, and concentrate drain](figs/osmosis/ro-process-example.svg)

### Removal Capabilities

| Parameter | Performance |
|-----------|------------|
| Molecular Weight Cut-Off (MWCO) | RO membranes reject molecules larger than 100 Daltons |
| Ions & Metals | >98–99% rejection of Sodium, Calcium, Lead, Arsenic, Fluoride |
| Organics & Microbes | Bacteria, Viruses, PFAS, and pharmaceutical residues |

<!-- slug: 02 -->
## How water quality is measured

To baseline and monitor an RO system, we utilize electrical conductivity to estimate **Total Dissolved Solids (TDS)**.

### Key metrics

- **Conductivity to TDS:** A TDS meter measures conductivity in MicroSiemens (μS/cm) and applies a conversion factor (typically 0.5 to 0.7) to estimate TDS in Parts Per Million (PPM). Because it relies on conductivity, it does not measure uncharged particles like sugar or some motor oils, but is highly accurate for mineral and salt content.
- **SDI (Silt Density Index):** A critical metric for RO feed water. An SDI > 5 indicates high particulate matter that will rapidly foul an RO membrane.
- **Langelier Saturation Index (LSI):** Measures the scaling potential of water. Hard water (high Calcium/Magnesium) with a positive LSI will precipitate calcium carbonate onto the membrane surface, requiring softening pre-treatment or antiscalant dosing.
- **Chlorine vs. Chloramines:** Municipalities use free chlorine or chloramines. Thin-Film Composite (TFC) membranes tolerate ZERO chlorine (<0.1 ppm). Carbon pre-filtration is mandatory.

![Digital TDS meter testing water conductivity and temperature](figure-placeholder.png)

<!-- slug: 03 -->
## RO system components overview

A modern 5-stage Point-Of-Use (POU) RO architecture relies on highly specific hydraulic and pneumatic components:

1. **Standard 10-inch Housings (Stages 1–3):** Contain the sediment and carbon pre-treatment cartridges.
2. **RO Membrane & Housing (Stage 4):** The pressure vessel containing the spiral-wound membrane.
3. **Automatic Shut-Off Valve (ASV):** A hydro-mechanical diaphragm valve. When tank pressure reaches ~65% of feed pressure, the ASV pinches the feed line shut to stop wastewater production.
4. **Check Valve:** Installed on the pure water (permeate) outlet of the membrane housing to prevent pressurized tank water from flowing backwards, which would rupture the membrane.
5. **Hydropneumatic Storage Tank:** Stores pure water against a pressurized air bladder.
6. **Flow Restrictor:** Installed on the brine line, this capillary tube creates the backpressure necessary to force water through the membrane.

![Reverse osmosis system schematic showing water flow, check valves, flow restrictor, and auto shut-off valve](figure-placeholder.png)

<!-- slug: 04 -->
## Pre-filters: sediment & carbon

- **Melt-Blown Polypropylene (PP):** Usually a 5-micron or 1-micron depth filter. It captures suspended solids (rust, silt) through tortuous paths.
- **Granular Activated Carbon (GAC):** Utilizes extreme surface area (1 gram ≈ 1000 m²) to adsorb organic compounds and chlorine. GAC has high flow but can channel.
- **Carbon Block (CTO — Chlorine, Taste, Odor):** Compressed activated carbon powder. It prevents channeling and acts as a secondary sub-micron sediment filter.

### Advanced note

If your municipality uses **Chloramines** (chlorine bonded with ammonia), standard carbon blocks deplete rapidly. You must use **Catalytic Carbon** filters, which have modified surface kinetics to break the ammonia-chlorine bond.

<!-- slug: 05 -->
## The RO membrane

Most modern domestic systems use a **Polyamide Thin-Film Composite (PA-TFC)** membrane.

### Anatomy

It consists of a non-woven polyester backing, a polysulfone intermediate layer, and a 0.2-micron polyamide top layer. These are glued together around a central permeate tube, separated by a plastic feed spacer mesh (spiral-wound configuration).

### Concentration Polarization

As water is pushed through the membrane, a highly concentrated boundary layer of salts forms right against the membrane surface. The cross-flow design of the spacer mesh creates turbulence to disrupt this layer and wash salts to the drain.

### Performance

Rated in GPD (Gallons Per Day) at standard conditions (60 PSI, 77°F / 25°C, 250 PPM NaCl feed). A drop in temperature drastically reduces output due to increased water viscosity.

![Layers of a spiral-wound reverse osmosis membrane showing feed spacer, membrane, and permeate carrier](figure-placeholder.png)

<!-- slug: 06 -->
## Post-filters & remineralization

Permeate (RO water) is aggressive. By stripping all buffering alkalinity (carbonates/bicarbonates), the water absorbs CO₂ from the air, creating weak carbonic acid (H₂CO₃), dropping the pH to 5.5–6.5.

### Taste Polishing

Coconut shell activated carbon is used purely to eliminate any rubbery tastes acquired from the tank's butyl bladder.

### Remineralization Media

Calcite (crushed marble / CaCO₃) and Corosex (Magnesium Oxide / MgO) are used to sacrifice minerals into the aggressive water. This raises the pH back to 7.5–8.5, restoring buffering capacity and imparting a "spring water" mouthfeel.

<!-- slug: 07 -->
## Tanks, pressure & flow

A hydropneumatic RO tank operates on **Boyle's Law (P₁V₁ = P₂V₂)**.

### Internal Mechanics

The tank contains a butyl rubber diaphragm. The lower chamber is pre-charged with air (typically 7–8 PSI when empty). As the RO membrane slowly pushes permeate into the upper chamber, the air in the lower chamber compresses, increasing the pressure.

### Equilibrium

When the internal pressure reaches roughly 2/3 of the line pressure (e.g., 40 PSI tank pressure on a 60 PSI feed), the Auto Shut-Off Valve (ASV) closes.

### Flow Rate

The pressure built up in the air bladder provides the kinetic energy to push the water rapidly out of the faucet when opened. If the air charge leaks over the years, the tank may feel heavy (full of water) but will deliver only a trickle.

<!-- slug: 08 -->
## Pumps and pressurization

### Electric Booster Pump

A positive displacement diaphragm pump placed *before* the RO membrane. It boosts feed pressure to 80–100 PSI. Higher pressure forces more water through the membrane faster, increasing the rejection rate (purer water) and reducing waste. Controlled by High/Low-pressure electrical switches.

### Permeate Pump (ERP)

A hydro-mechanical energy recovery device. Normally, as the storage tank fills, its backpressure fights the RO membrane, drastically slowing production and increasing the waste ratio. A permeate pump uses the kinetic energy of the pressurized *brine* (waste) water to mechanically drive a piston that forces the *permeate* (pure) water into the tank, completely isolating the membrane from tank backpressure.

<!-- slug: 09 -->
## Water waste and efficiency

The "waste" water is correctly termed the **brine** or **concentrate**. Without it, the membrane would scale over and fail within hours.

### Recovery Rate

Calculated as: R = (Permeate Flow / Feed Flow) × 100. A standard system has a 20–25% recovery rate.

### Flow Restrictor Sizing

The flow restrictor (rated in mL/min) must be matched to the membrane's GPD rating.

| Mismatch | Result |
|----------|--------|
| Restrictor too small for membrane (e.g., 300 mL/min on 100 GPD) | Chokes brine flow, causing rapid fouling |
| Restrictor too large for membrane (e.g., 800 mL/min on 50 GPD) | Wastes excessive water, prevents adequate pressure buildup |

<!-- slug: 10 -->
## Selecting the right system

### Standard Undersink (Tanked)

Relies on low-flux membranes (50–100 GPD). Highly reliable, easy to find universal 10" replacement filters, works without electricity (if line pressure is >50 PSI).

### Direct-Flow Tankless

Uses massive high-flux membranes (400–800 GPD) and a powerful internal electric booster pump to produce water at 0.5–1.0 GPM on demand. Eliminates tank bacteria risks and space usage, but is power-dependent, noisier, and utilizes proprietary, expensive filters.

### TDS Creep in Tankless

Tankless systems suffer from "TDS creep." When the system sits idle, osmotic pressure equalizes, causing high-TDS water to permeate the membrane. The first cup of water after sitting idle will have high TDS unless the system has an automated flush solenoid.

<!-- slug: 11 -->
## Tools and materials needed

### Tubing Cutters

Standard scissors crush the Linear Low-Density Polyethylene (LLDPE) tubing, causing micro-leaks in push-fittings. A specialized tubing cutter ensures a perfectly circular, 90-degree cut.

### Push-to-Connect Fittings (John Guest / Mur-lok)

These rely on a stainless steel collet that bites into the tubing and an EPDM O-ring that seals it.

### Drill & Step Bit

A titanium step bit is far superior to standard twist bits for cleanly drilling through stainless steel sinks without catching or warping the metal.

<!-- slug: 12 -->
## Step-by-step installation

### 1. Feed Water Valve

Modern kits use an Angle Stop Adapter Valve. Avoid piercing "saddle valves," which are prone to catastrophic leaking and code violations in many jurisdictions.

### 2. Air Gap Faucet vs. Standard

If local plumbing code mandates it, an Air Gap faucet prevents a sewage backup from siphoning into the RO system. It requires three tubes connecting to the faucet and is notoriously noisy (gurgling).

### 3. Drain Clamp

Must be installed on the vertical tailpiece *above* the P-trap to prevent sewer gas from entering the tubing. Drill a 1/4" hole through one side of the pipe only.

![Undersink reverse osmosis system plumbing diagram showing feed valve, drain saddle above P-trap, and air gap faucet](figure-placeholder.png)

<!-- slug: 13 -->
## First flush and startup

New dry RO membranes are treated with a food-grade preservative (often Glycerin or Sodium Metabisulfite) to prevent bacterial growth and keep the membrane pores viable during shipping. Carbon filters also contain microscopic carbon dust (fines).

### Protocol

1. Turn on the water and let the system run until the tank is completely full (2–3 hours).
2. Turn off the feed, open the faucet, and drain the tank entirely. The water will be black/gray and foamy.
3. Repeat this cycle a minimum of two times.
4. Do not capture this water for plants; discard it.

<!-- slug: 14 -->
## Leak testing and safety

### Hydrostatic Testing

Once the tank is full and the ASV has shut off the system, the system is at its maximum static pressure. This is when leaks usually appear.

### Collet Clips

Always insert the blue horseshoe-locking clips behind the collet collar on push-fittings. This prevents the collet from depressing and releasing the tube if accidentally bumped.

### Leak Detectors

Place an expanding-sponge leak detector valve on the floor of the cabinet. If water pools, the sponge expands and snaps a mechanical valve shut, cutting the feed water to the system automatically.

<!-- slug: 15 -->
## Membrane handling & care

### Brine Seal

The membrane has a black rubber skirt on one end (the Brine Seal). The water must flow *into* the end with the brine seal, forcing the seal against the housing walls so water cannot bypass the membrane.

### O-Ring Lubrication

The permeate tube has two small O-rings. If they pinch or roll during insertion, raw feed water will bypass into the pure water line. Lubricate *only* with food-grade silicone grease. Petroleum jelly (Vaseline) will degrade the EPDM rubber over time.

<!-- slug: 16 -->
## TDS meters and sensors

### Temperature Compensation (ATC)

Conductivity increases by ~2% for every degree Celsius rise. A good TDS meter utilizes a thermistor for Automatic Temperature Compensation to ensure readings are standard regardless of whether it's summer or winter.

### Dual Inline TDS Monitors

Install a dual probe meter. Probe 1 measures the Feed (e.g., 300 PPM). Probe 2 measures the Permeate (e.g., 15 PPM).

### Rejection Rate Calculation

((Feed − Permeate) / Feed) × 100

**Example:** ((300 − 15) / 300) × 100 = 95%

> If the rejection rate drops below 80–85%, the membrane has failed and must be replaced.

<!-- slug: 17 -->
## Filter replacement schedule

Relying purely on time (e.g., "every 6 months") is flawed if you use 2 gallons a day vs. 10 gallons a day.

### Advanced Monitoring (Delta-P)

Professionals measure the pressure drop (ΔP) across the pre-filters. If the feed pressure is 60 PSI, and the pressure entering the RO membrane is 45 PSI, the pre-filters are clogged with sediment and must be changed.

### Biological Loading

Even if pressure is fine, carbon filters should not exceed 12 months. Once the chlorine is adsorbed, the warm, wet carbon bed becomes an ideal breeding ground for heterotrophic bacteria.

<!-- slug: 18 -->
## Troubleshooting common faults

### Continuous Draining (Never Shuts Off)

The tank is full, but water keeps running to the drain. This is usually a failed **Check Valve**. High-pressure tank water flows backward through the membrane into the housing, keeping the ASV triggered open. Replace the check valve immediately to save the membrane.

### Rapid Cycling (Clicking)

The system chatters on and off. This usually indicates a waterlogged storage tank (ruptured bladder) or a failing ASV diaphragm.

### Low Permeate Flow (But High Drain Flow)

Membrane is fouled/scaled, or the feed water temperature has dropped significantly (winter).

<!-- slug: 19 -->
## Sanitizing and deep cleaning

Biofilms build up on the inner walls of the LLDPE tubing and the tank bladder.

### Protocol

1. Remove ALL filters and the RO membrane. Re-screw the empty housings.
2. Add 2 tablespoons of 5.25% unscented sodium hypochlorite (household bleach) or 3% Hydrogen Peroxide to the Stage 1 housing.

### Contact Time (CT)

Turn on the water and open the faucet until you smell bleach. Close the faucet. Let the system sit pressurized for 30–60 minutes to achieve the required log-reduction of pathogens. Flush entirely until no smell remains before installing new filters.

<!-- slug: 20 -->
## Remote monitoring with IoT

Turn your passive water filter into a smart home appliance.

### Hardware

Use an ESP8266/ESP32 microcontroller. Connect two analog TDS sensor modules (utilizing Wheatstone bridge circuits to measure conductivity) and a Hall-effect water flow sensor on the permeate line.

### Calibration

Analog TDS sensors require calibration against a known NaCl standard solution (e.g., 342 PPM) and an ambient temperature offset via a DS18B20 temperature probe.

### Telemetry

Write the firmware to calculate the moving average of the rejection rate and track total gallons processed. Publish these payloads via MQTT to a broker (like Home Assistant) to trigger push notifications when the filters reach their volumetric lifespan limits.

![ESP32 microcontroller wired to analog TDS sensors and a water flow meter for an IoT project](figure-placeholder.png)

<!-- slug: 21 -->
## Modifications and upgrades

### UV-C Sterilization (254nm)

An essential upgrade for private well water. Placed as the final stage, ultraviolet light disrupts the DNA/RNA of bacteria and viruses, preventing replication. Requires a quartz glass sleeve and continuous power.

### Auto-Flush Solenoid

Replaces the manual flow restrictor. Wired to a timer relay, it opens completely for 18 seconds every time the pump starts, blasting water across the membrane surface to violently scour away scaling and concentration polarization, extending membrane life by up to 50%.

<!-- slug: 22 -->
## Whole-house and large systems

Point-of-Entry (POE) Reverse Osmosis operates on a different scale entirely.

### Membranes

Uses industrial 4x40 (4-inch diameter, 40-inch length) or 4x21 membranes capable of producing 1,000 to 4,000 GPD.

### Hydraulics

Powered by heavy-duty Rotary Vane or multi-stage centrifugal pumps running at 150–250 PSI.

### Storage & Delivery

Because homes require 10–15 GPM for showers and appliances (far exceeding membrane production speed), the permeate is stored in massive 200–500 gallon atmospheric tanks. A secondary "delivery skid" (a re-pressurization pump + pressure switch) pushes the pure water from the atmospheric tank into the home's plumbing.

> **Warning:** RO water will dissolve copper plumbing. POE RO homes must use PEX or CPVC piping exclusively.

<!-- slug: 23 -->
## Water recycling and brine

For every 1 gallon of RO water, 3–4 gallons of concentrate are created. However, this concentrate is usually only 20–30% higher in TDS than your tap water. It is completely safe and chlorine-free.

### Zero-Waste Retrofits

A "Zero Waste" kit utilizes a small pump to inject the brine stream into the home's *hot water* line. The water heater dilutes it, resulting in zero net loss to the sewer.

### Graywater Harvesting

Plumb the brine line directly into a rain barrel, landscape irrigation system, or toilet cistern fill tank.

> Because it is highly oxygenated and chlorine-free, algae will grow rapidly if stored in clear containers exposed to sunlight.

<!-- slug: 24 -->
## Business and service models

The residential water treatment market is shifting from hardware sales to recurring revenue service models (SaaS — System as a Service).

### The Model

Customers pay $30–$50/month. The installer owns the hardware. The fee covers the machine lease, annual filter changes, membrane swaps every 3 years, and immediate repair of leaks.

### Profitability

Commercial margins lie in preventative maintenance. By utilizing the IoT telemetry discussed in Unit 4, service technicians can monitor an entire fleet of city installations from a dashboard, dispatching trucks *only* when a unit's Delta-P drops or rejection rates fall, drastically optimizing labor costs.

<!-- slug: 25 -->
## Recap and next steps

You have now completed the definitive masterclass on Reverse Osmosis. You possess the theoretical knowledge of osmotic pressure and thermodynamics, the mechanical understanding of hydro-pneumatics and filtration kinetics, and the practical skills to install, monitor, and scale these systems to commercial levels.

### Your Final Directives

1. **Audit:** Test your local municipal water report for Chloramines, TDS, and Hardness.
2. **Design:** Architect the exact 5-stage or tankless system that fits your water's specific chemistry.
3. **Execute:** Install the system utilizing best practices (step bits, tube cutters, collet clips).
4. **Monitor:** Build or install a continuous monitoring solution to shift your maintenance from reactive guessing to proactive data-driven service.

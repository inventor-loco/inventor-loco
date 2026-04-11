<!-- slug: 01 -->
## What is Optical Camera Communication?

OCC uses **standard cameras** (phones, webcams, industrial sensors) to receive data encoded in visible light. Unlike photodetector-based systems, a camera captures spatial information alongside the signal.

### Why cameras instead of photodetectors?

- Cameras are everywhere: phones, laptops, surveillance, vehicles
- Spatial separation of multiple transmitters in a single frame
- Simultaneous illumination and communication

### Where OCC fits

| Scenario | Why OCC works |
|----------|---------------|
| Indoor positioning | Camera resolves multiple LED landmarks |
| Vehicle-to-vehicle | Tail lights already modulated by PWM |
| IoT sensor readout | Low-rate data from simple LEDs |

> OCC trades raw data rate for ubiquity: any camera becomes a receiver.

### The field today

Research is moving from controlled lab setups toward real-world channels: fog, turbulence, mobility, and wearable links. Most published systems still operate at kbps rates, but the application space favours reliability over speed.

<!-- slug: 02 -->
## LED physics and emission characteristics

Lesson 2 placeholder. The final version will include worked examples and references.

### Example workflow

```python
# Pseudocode for this lesson
def process(data):
    result = analyse(data)
    return result.summary()
```

### Steps

1. **Prepare** the setup according to the specifications
2. **Measure** using the calibrated instruments
3. **Record** all values in the lab notebook
4. **Compare** against the expected baseline

### Quick reference

| Step | Tool | Duration |
|------|------|----------|
| 1 | Multimeter | 5 min |
| 2 | Oscilloscope | 10 min |
| 3 | Software | 15 min |

---

*This is draft content for testing the Markdown renderer.*

<!-- slug: 03 -->
## Photodetection vs. camera-based reception

Placeholder content for lesson 3.

> **Key idea:** The central concept of this lesson relates to photodetection vs. camera-based reception. Understanding this is essential before moving to the next unit.

### Overview

This lesson covers three areas:

- **Fundamentals** -- core principles and definitions
- **Practical aspects** -- how it works in real scenarios
- **Common mistakes** -- what to watch out for

### Comparison

| Approach A | Approach B |
|------------|------------|
| Simpler setup | More robust |
| Lower cost | Higher accuracy |
| Manual operation | Automated |

### Further reading

1. Reference textbook, Chapter 3
2. Manufacturer datasheet (see resources folder)
3. Related standard or regulation

<!-- slug: 04 -->
## Rolling shutter and global shutter behaviour

Draft content for lesson 4. Final material is under development.

### Concepts

The lesson is structured around three pillars:

- **Theory**
  - Background principles
  - Mathematical foundation
  - Simplifying assumptions
- **Practice**
  - Lab setup and equipment
  - Step-by-step procedure
  - Safety considerations
- **Analysis**
  - Data interpretation
  - Error sources
  - Reporting format

### Definitions

**Term A:** A short definition relevant to this lesson topic.

**Term B:** Another definition that helps frame the content.

**Term C:** A third term that will appear frequently.

> Reminder: all placeholder content will be replaced with real material.

```
Example output:
  Status: OK
  Value:  42.7
  Unit:   dBm
```

<!-- slug: 05 -->
## OCC system overview and link budget

Lesson 5 covers *occ system overview and link budget* in detail.

### Why this matters

Understanding this topic is a prerequisite for the lessons that follow. It connects directly to both the theoretical framework and the hands-on lab work.

### Checklist

- [ ] Review the previous lesson notes
- [ ] Gather required materials
- [ ] Complete the exercise at the end
- [ ] Document observations

### Summary table

| Aspect | Description |
|--------|-------------|
| Difficulty | Intermediate |
| Duration | ~45 min |
| Prerequisites | Lessons 1-4 |

### Formula reference

For reference, the key relationship is:

$$P = V \times I$$
$$E = P \times t$$

Where `P` is power, `V` is voltage, `I` is current, `E` is energy, and `t` is time.

---

*Placeholder content for Markdown rendering tests.*

<!-- slug: 06 -->
## Camera sensors: CMOS and CCD

This is a placeholder for lesson 6. Content will be developed.

### Key parameters

| Parameter | Value | Notes |
|-----------|-------|-------|
| Alpha | 0.75 | Measured at room temperature |
| Beta | 12.3 dB | Under standard conditions |
| Gamma | 48 ms | Typical latency |

### Main points

- First key concept related to **camera sensors: cmos and ccd**
- Second point with `inline code` example
- Third point linking theory to practice

> Placeholder note: this content will be replaced with the actual lesson material.

<!-- slug: 07 -->
## Exposure, gain, and frame rate trade-offs

Lesson 7 placeholder. The final version will include worked examples and references.

### Example workflow

```python
# Pseudocode for this lesson
def process(data):
    result = analyse(data)
    return result.summary()
```

### Steps

1. **Prepare** the setup according to the specifications
2. **Measure** using the calibrated instruments
3. **Record** all values in the lab notebook
4. **Compare** against the expected baseline

### Quick reference

| Step | Tool | Duration |
|------|------|----------|
| 1 | Multimeter | 5 min |
| 2 | Oscilloscope | 10 min |
| 3 | Software | 15 min |

---

*This is draft content for testing the Markdown renderer.*

<!-- slug: 08 -->
## Lens selection and field of view

Placeholder content for lesson 8.

> **Key idea:** The central concept of this lesson relates to lens selection and field of view. Understanding this is essential before moving to the next unit.

### Overview

This lesson covers three areas:

- **Fundamentals** -- core principles and definitions
- **Practical aspects** -- how it works in real scenarios
- **Common mistakes** -- what to watch out for

### Comparison

| Approach A | Approach B |
|------------|------------|
| Simpler setup | More robust |
| Lower cost | Higher accuracy |
| Manual operation | Automated |

### Further reading

1. Reference textbook, Chapter 8
2. Manufacturer datasheet (see resources folder)
3. Related standard or regulation

<!-- slug: 09 -->
## Raspberry Pi Camera and consumer-grade devices

Draft content for lesson 9. Final material is under development.

### Concepts

The lesson is structured around three pillars:

- **Theory**
  - Background principles
  - Mathematical foundation
  - Simplifying assumptions
- **Practice**
  - Lab setup and equipment
  - Step-by-step procedure
  - Safety considerations
- **Analysis**
  - Data interpretation
  - Error sources
  - Reporting format

### Definitions

**Term A:** A short definition relevant to this lesson topic.

**Term B:** Another definition that helps frame the content.

**Term C:** A third term that will appear frequently.

> Reminder: all placeholder content will be replaced with real material.

```
Example output:
  Status: OK
  Value:  42.7
  Unit:   dBm
```

<!-- slug: 10 -->
## Camera calibration and characterisation

Lesson 10 covers *camera calibration and characterisation* in detail.

### Why this matters

Understanding this topic is a prerequisite for the lessons that follow. It connects directly to both the theoretical framework and the hands-on lab work.

### Checklist

- [ ] Review the previous lesson notes
- [ ] Gather required materials
- [ ] Complete the exercise at the end
- [ ] Document observations

### Summary table

| Aspect | Description |
|--------|-------------|
| Difficulty | Intermediate |
| Duration | ~45 min |
| Prerequisites | Lessons 1-9 |

### Formula reference

For reference, the key relationship is:

$$P = V \times I$$
$$E = P \times t$$

Where `P` is power, `V` is voltage, `I` is current, `E` is energy, and `t` is time.

---

*Placeholder content for Markdown rendering tests.*

<!-- slug: 11 -->
## On-off keying (OOK) and pulse-width modulation

This is a placeholder for lesson 11. Content will be developed.

### Key parameters

| Parameter | Value | Notes |
|-----------|-------|-------|
| Alpha | 0.75 | Measured at room temperature |
| Beta | 12.3 dB | Under standard conditions |
| Gamma | 48 ms | Typical latency |

### Main points

- First key concept related to **on-off keying (ook) and pulse-width modulation**
- Second point with `inline code` example
- Third point linking theory to practice

> Placeholder note: this content will be replaced with the actual lesson material.

<!-- slug: 12 -->
## Frequency-shift keying and colour coding

Lesson 12 placeholder. The final version will include worked examples and references.

### Example workflow

```python
# Pseudocode for this lesson
def process(data):
    result = analyse(data)
    return result.summary()
```

### Steps

1. **Prepare** the setup according to the specifications
2. **Measure** using the calibrated instruments
3. **Record** all values in the lab notebook
4. **Compare** against the expected baseline

### Quick reference

| Step | Tool | Duration |
|------|------|----------|
| 1 | Multimeter | 5 min |
| 2 | Oscilloscope | 10 min |
| 3 | Software | 15 min |

---

*This is draft content for testing the Markdown renderer.*

<!-- slug: 13 -->
## Rolling-shutter MIMO and grouped LED arrays

Placeholder content for lesson 13.

> **Key idea:** The central concept of this lesson relates to rolling-shutter mimo and grouped led arrays. Understanding this is essential before moving to the next unit.

### Overview

This lesson covers three areas:

- **Fundamentals** -- core principles and definitions
- **Practical aspects** -- how it works in real scenarios
- **Common mistakes** -- what to watch out for

### Comparison

| Approach A | Approach B |
|------------|------------|
| Simpler setup | More robust |
| Lower cost | Higher accuracy |
| Manual operation | Automated |

### Further reading

1. Reference textbook, Chapter 13
2. Manufacturer datasheet (see resources folder)
3. Related standard or regulation

<!-- slug: 14 -->
## Sub-pixel detection and spatial multiplexing

Draft content for lesson 14. Final material is under development.

### Concepts

The lesson is structured around three pillars:

- **Theory**
  - Background principles
  - Mathematical foundation
  - Simplifying assumptions
- **Practice**
  - Lab setup and equipment
  - Step-by-step procedure
  - Safety considerations
- **Analysis**
  - Data interpretation
  - Error sources
  - Reporting format

### Definitions

**Term A:** A short definition relevant to this lesson topic.

**Term B:** Another definition that helps frame the content.

**Term C:** A third term that will appear frequently.

> Reminder: all placeholder content will be replaced with real material.

```
Example output:
  Status: OK
  Value:  42.7
  Unit:   dBm
```

<!-- slug: 15 -->
## Correlation-based receivers and matched filtering

Lesson 15 covers *correlation-based receivers and matched filtering* in detail.

### Why this matters

Understanding this topic is a prerequisite for the lessons that follow. It connects directly to both the theoretical framework and the hands-on lab work.

### Checklist

- [ ] Review the previous lesson notes
- [ ] Gather required materials
- [ ] Complete the exercise at the end
- [ ] Document observations

### Summary table

| Aspect | Description |
|--------|-------------|
| Difficulty | Intermediate |
| Duration | ~45 min |
| Prerequisites | Lessons 1-14 |

### Formula reference

For reference, the key relationship is:

$$P = V \times I$$
$$E = P \times t$$

Where `P` is power, `V` is voltage, `I` is current, `E` is energy, and `t` is time.

---

*Placeholder content for Markdown rendering tests.*

<!-- slug: 16 -->
## Ground truth setups and measurement protocols

This is a placeholder for lesson 16. Content will be developed.

### Key parameters

| Parameter | Value | Notes |
|-----------|-------|-------|
| Alpha | 0.75 | Measured at room temperature |
| Beta | 12.3 dB | Under standard conditions |
| Gamma | 48 ms | Typical latency |

### Main points

- First key concept related to **ground truth setups and measurement protocols**
- Second point with `inline code` example
- Third point linking theory to practice

> Placeholder note: this content will be replaced with the actual lesson material.

<!-- slug: 17 -->
## Indoor channel measurement campaigns

Lesson 17 placeholder. The final version will include worked examples and references.

### Example workflow

```python
# Pseudocode for this lesson
def process(data):
    result = analyse(data)
    return result.summary()
```

### Steps

1. **Prepare** the setup according to the specifications
2. **Measure** using the calibrated instruments
3. **Record** all values in the lab notebook
4. **Compare** against the expected baseline

### Quick reference

| Step | Tool | Duration |
|------|------|----------|
| 1 | Multimeter | 5 min |
| 2 | Oscilloscope | 10 min |
| 3 | Software | 15 min |

---

*This is draft content for testing the Markdown renderer.*

<!-- slug: 18 -->
## Outdoor and atmospheric channel experiments

Placeholder content for lesson 18.

> **Key idea:** The central concept of this lesson relates to outdoor and atmospheric channel experiments. Understanding this is essential before moving to the next unit.

### Overview

This lesson covers three areas:

- **Fundamentals** -- core principles and definitions
- **Practical aspects** -- how it works in real scenarios
- **Common mistakes** -- what to watch out for

### Comparison

| Approach A | Approach B |
|------------|------------|
| Simpler setup | More robust |
| Lower cost | Higher accuracy |
| Manual operation | Automated |

### Further reading

1. Reference textbook, Chapter 18
2. Manufacturer datasheet (see resources folder)
3. Related standard or regulation

<!-- slug: 19 -->
## Fog, turbulence, and sandstorm conditions

Draft content for lesson 19. Final material is under development.

### Concepts

The lesson is structured around three pillars:

- **Theory**
  - Background principles
  - Mathematical foundation
  - Simplifying assumptions
- **Practice**
  - Lab setup and equipment
  - Step-by-step procedure
  - Safety considerations
- **Analysis**
  - Data interpretation
  - Error sources
  - Reporting format

### Definitions

**Term A:** A short definition relevant to this lesson topic.

**Term B:** Another definition that helps frame the content.

**Term C:** A third term that will appear frequently.

> Reminder: all placeholder content will be replaced with real material.

```
Example output:
  Status: OK
  Value:  42.7
  Unit:   dBm
```

<!-- slug: 20 -->
## Underwater OCC characterisation

Lesson 20 covers *underwater occ characterisation* in detail.

### Why this matters

Understanding this topic is a prerequisite for the lessons that follow. It connects directly to both the theoretical framework and the hands-on lab work.

### Checklist

- [ ] Review the previous lesson notes
- [ ] Gather required materials
- [ ] Complete the exercise at the end
- [ ] Document observations

### Summary table

| Aspect | Description |
|--------|-------------|
| Difficulty | Intermediate |
| Duration | ~45 min |
| Prerequisites | Lessons 1-19 |

### Formula reference

For reference, the key relationship is:

$$P = V \times I$$
$$E = P \times t$$

Where `P` is power, `V` is voltage, `I` is current, `E` is energy, and `t` is time.

---

*Placeholder content for Markdown rendering tests.*

<!-- slug: 21 -->
## OCC for wireless sensor networks (WSN)

This is a placeholder for lesson 21. Content will be developed.

### Key parameters

| Parameter | Value | Notes |
|-----------|-------|-------|
| Alpha | 0.75 | Measured at room temperature |
| Beta | 12.3 dB | Under standard conditions |
| Gamma | 48 ms | Typical latency |

### Main points

- First key concept related to **occ for wireless sensor networks (wsn)**
- Second point with `inline code` example
- Third point linking theory to practice

> Placeholder note: this content will be replaced with the actual lesson material.

<!-- slug: 22 -->
## Wearable LED transmitters and healthcare

Lesson 22 placeholder. The final version will include worked examples and references.

### Example workflow

```python
# Pseudocode for this lesson
def process(data):
    result = analyse(data)
    return result.summary()
```

### Steps

1. **Prepare** the setup according to the specifications
2. **Measure** using the calibrated instruments
3. **Record** all values in the lab notebook
4. **Compare** against the expected baseline

### Quick reference

| Step | Tool | Duration |
|------|------|----------|
| 1 | Multimeter | 5 min |
| 2 | Oscilloscope | 10 min |
| 3 | Software | 15 min |

---

*This is draft content for testing the Markdown renderer.*

<!-- slug: 23 -->
## Agricultural and smart farming deployments

Placeholder content for lesson 23.

> **Key idea:** The central concept of this lesson relates to agricultural and smart farming deployments. Understanding this is essential before moving to the next unit.

### Overview

This lesson covers three areas:

- **Fundamentals** -- core principles and definitions
- **Practical aspects** -- how it works in real scenarios
- **Common mistakes** -- what to watch out for

### Comparison

| Approach A | Approach B |
|------------|------------|
| Simpler setup | More robust |
| Lower cost | Higher accuracy |
| Manual operation | Automated |

### Further reading

1. Reference textbook, Chapter 23
2. Manufacturer datasheet (see resources folder)
3. Related standard or regulation

<!-- slug: 24 -->
## Vehicular VLC and road-to-vehicle links

Draft content for lesson 24. Final material is under development.

### Concepts

The lesson is structured around three pillars:

- **Theory**
  - Background principles
  - Mathematical foundation
  - Simplifying assumptions
- **Practice**
  - Lab setup and equipment
  - Step-by-step procedure
  - Safety considerations
- **Analysis**
  - Data interpretation
  - Error sources
  - Reporting format

### Definitions

**Term A:** A short definition relevant to this lesson topic.

**Term B:** Another definition that helps frame the content.

**Term C:** A third term that will appear frequently.

> Reminder: all placeholder content will be replaced with real material.

```
Example output:
  Status: OK
  Value:  42.7
  Unit:   dBm
```

<!-- slug: 25 -->
## Satellite OCC and OCC4SAT overview

Lesson 25 covers *satellite occ and occ4sat overview* in detail.

### Why this matters

Understanding this topic is a prerequisite for the lessons that follow. It connects directly to both the theoretical framework and the hands-on lab work.

### Checklist

- [ ] Review the previous lesson notes
- [ ] Gather required materials
- [ ] Complete the exercise at the end
- [ ] Document observations

### Summary table

| Aspect | Description |
|--------|-------------|
| Difficulty | Intermediate |
| Duration | ~45 min |
| Prerequisites | Lessons 1-24 |

### Formula reference

For reference, the key relationship is:

$$P = V \times I$$
$$E = P \times t$$

Where `P` is power, `V` is voltage, `I` is current, `E` is energy, and `t` is time.

---

*Placeholder content for Markdown rendering tests.*


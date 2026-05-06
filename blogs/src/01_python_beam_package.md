---
title: How I Built a Beam Analysis Tool in Python
date: Jan 2025
tag: [Engineering, Python, Problem-Solving]
description: A walkthrough of the Python Beam Analysis library — the problem it solves, the math behind it, and lessons from open-sourcing it.
---

# Introduction

In structural engineering, the ability to quickly and accurately calculate internal forces in a beam is fundamental. While professional software like **ETABS** or **AutoCAD** is powerful for large-scale projects, I wanted to create a lightweight, open-source Python module to solve statically determinate beams using basic equilibrium equations.This thought intrigued me during my third semester at Pulchowk Campus. Then I tried implementing the Macaulay's method, which seemed dooable at that time. And, here is what I built.

## About the Module

This module is designed to solve 2D beams by applying the three equations of static equilibrium:

- $\sum F_x = 0$
- $\sum F_y = 0$
- $\sum M_{point} = 0$

### Supported Features

- **Determinate 2D Beams:** Support for Point Loads, Inclined Point Loads, UDL, UVL, and Point Moments.
- **Support Conditions:** Fixed, Hinged, or Roller supports.
- **Internal Hinges:** Capable of handling beams with internal discontinuities.
- **Visual Output:** Generates Shear Force Diagrams (SFD) and Bending Moment Diagrams (BMD).

## Sign Conventions

To maintain consistency in structural analysis, the following conventions are used in the code:

- **Positive X-axis:** Right-hand side.
- **Positive Y-axis:** Upward direction.
- **Positive Moment/Angle:** Counter-clockwise direction.

## Implementation Example

Using the module is straightforward. Here is a snippet showing how to define a beam with a point load and a UDL:

```python
from beam_analysis import Beam, PointLoad, UDL, Reaction

# 1. Initialize the Beam (Length, E, I)
my_beam = Beam(10, E=200000, I=0.0001)

# 2. Add Supports
my_beam.add_reaction(Reaction(0, type='hinge'))
my_beam.add_reaction(Reaction(10, type='roller'))

# 3. Apply Loads
my_beam.add_load(PointLoad(pos=5, load=20, inverted=True))
my_beam.add_load(UDL(start=0, loadpm=5, span=10, inverted=True))

# 4. Solve and Plot
my_beam.solve()
my_beam.plot()
```

## Why Open Source?

Building this tool was as much about the process as the result. It allowed me to bridge the gap between Civil Engineering theory and Python automation. By sharing it on GitHub, I hope to provide a helpful resource for fellow IOE students and hobbyist coders interested in structural analysis.

For more technical details and source code, visit the [GitHub Repository](https://github.com/Ashim-Paudel/Python-Beam-Analysis)

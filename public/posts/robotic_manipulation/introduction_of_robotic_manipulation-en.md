---
title: 'Introduction of Robotic Manipulation'
date: '2024-11-13'
tags: ['Robotics', 'Manipulation', 'lecture']
---

### Introduction

Tasks that humans perform with their hands—such as loading a dishwasher, chopping vegetables, or folding laundry—are everyday activities for us, yet they remain incredibly difficult for robots and sit at the forefront of robotics research.

#### Picking Up a Plate and Loading a Dishwasher: Understanding the Complexity

<img src="https://velog.velcdn.com/images/devjo/post/464c7a81-0a84-4e40-9f3d-7b18f8d90bad/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

Even the seemingly simple task of picking up a single plate from a stack in the sink and placing it into a dishwasher demands remarkable human capability.

The robot must perceive the existence and accessibility of the plate, and plan a motion that moves its hand to the plate while avoiding the geometry of the sink and other dishes (collision avoidance). It may need to slightly tilt the plate to secure a graspable pose. When placing the plate into the dishwasher rack, instead of merely sliding it in, it might deliberately make contact with the slats so that the plate rotates and settles into place.

This problem is difficult because it requires strong interaction among several technical areas that have traditionally been studied separately: perception, planning, and control.

---

### Evolution of Manipulation Research

#### Pick-and-Place and Its Limitations

For decades, robots have performed pick-and-place tasks on carefully engineered parts in factories. More recently, deep learning–based perception systems have allowed them to handle a wider variety of objects, though often in settings where high placement accuracy is not required.

The goal now is to move beyond simply picking items up and moving them from one location to another, toward a broad range of manipulation skills that encompass the astonishing variety of tasks humans can perform with their hands.

Whereas manipulation research in the 1980s and 1990s focused largely on “manipulation as grasping,” today’s goal is to go beyond maintaining a grasp and to encompass a much broader spectrum of manipulation that explicitly reasons about contact and dynamics.

#### Open-World Manipulation

Because human capabilities are so strong, expectations for robot performance and robustness are extremely high. It is not enough for a system to reliably load a few specific plates in a lab environment; it must handle a world with essentially unbounded variation—the classic “open-world” or “open-domain” problem.

Verifying robustness across the infinite combinations of plate types, kitchen layouts, lighting conditions, and more is an enormous challenge.

---

### Advances in Simulation

Another reason manipulation research is entering a golden era is the dramatic progress in software tools, especially simulation technologies, in recent years.

ROS (Robot Operating System) has made it easy for experts from different subfields to share modular components. In Drake, each component (system) is required to declare its states, parameters, and timing semantics in a consistent way. This enables a clearer understanding of the complex interactions between systems and supports debugging of the entire manipulation stack through repeatable and deterministic simulations.

---

### References

[Original source #1](https://manipulation.csail.mit.edu/intro.html)


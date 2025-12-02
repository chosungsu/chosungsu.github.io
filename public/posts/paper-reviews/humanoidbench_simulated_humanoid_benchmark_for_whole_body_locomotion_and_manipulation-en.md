---
title: 'HumanoidBench: Simulated Humanoid Benchmark for Whole-Body Locomotion and Manipulation'
date: '2024-10-11'
tags: ['embodied ai', 'paper review']
---

### Abstract

Humanoid robots hold great potential to assist humans across diverse environments and tasks, thanks to their flexibility and adaptability derived from human-like morphology. However, humanoid robot research is often bottlenecked by expensive and fragile hardware setups.

To accelerate algorithmic research on humanoid robots, we present HumanoidBench, a high-dimensional simulated robot learning benchmark featuring a humanoid robot equipped with dexterous hands and a wide variety of challenging whole-body manipulation and locomotion tasks.

We show that while state-of-the-art reinforcement learning algorithms struggle on most tasks, hierarchical learning approaches achieve strong performance when supported by robust low-level policies such as walking or reaching.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/c8740146-0f02-48e5-bdab-8c6629b6d964/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Humanoid robots have long been envisioned as capable of being seamlessly deployed into our everyday lives. Despite rapid advances in humanoid hardware, their controllers are often fully or partially hand-designed for specific tasks, requiring substantial engineering effort for each new task and environment and typically demonstrating limited whole-body control capabilities.

In recent years, robot learning has made steady progress in both manipulation and locomotion. However, extending learning algorithms to humanoid robots remains challenging, largely due to the costly and unsafe nature of real-world experimental setups on such robots.

Simulated humanoid benchmarks reveal diverse challenges in learning for autonomous humanoids, including complex control for robots with intricate dynamics, fine-grained coordination between many body parts, and long-horizon, complex tasks.

Our simulation environment is built on the MuJoCo physics engine. For the simulated humanoid robot, we primarily use the Unitree H1 humanoid, which offers a relatively low-cost yet accurate simulation model, and attach two dexterous Shadow Hands.

---

### Methods

#### Humanoid Body

We primarily use the Unitree H1 humanoid robot in our benchmark, as its model files are publicly available and it is well known. Compared to Digit, which features passive joints actuated via a 4-link mechanism, Unitree H1 has a mechanically simpler design that is easier to simulate.

#### Dexterous Hands

To make the simulated robot more human-like in form, we remove bulky forearms. While this is not yet a fully realistic model, we expect future hardware development to move toward slimmer, more human-like hands that resemble our setup.

#### Benchmark

We benchmark 27 tasks, consisting of 12 locomotion tasks and 15 distinct manipulation tasks.

Locomotion tasks include walk, stand, run, reach, hurdle, crawl, maze, sit, balance, stair, slide, and pole. Whole-body manipulation tasks include push, cabinet, highbar, door, truck, and others.

---

### Conclusion

In this paper, we present HumanoidBench, a high-dimensional humanoid robot control benchmark. To the best of our knowledge, it is the first comprehensive humanoid environment that spans a wide range of locomotion and manipulation tasks, from toy examples to realistic humanoid applications.

HumanoidBench includes multi-modal, high-dimensional observations in the form of first-person vision and whole-body tactile sensing. We focus on reinforcement learning algorithms, as collecting physical demonstrations with humanoid robots is particularly challenging.

---

### References

[Original source #1](https://arxiv.org/pdf/2403.10506)

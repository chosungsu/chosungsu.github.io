---
title: 'Open vocabulary Mobile Manipulation in Unseen Dynamic Environments with 3D Semantic Maps'
date: '2025-10-18'
tags: ['embodied ai', 'paper review']
---

### Abstract

Open-Vocabulary Mobile Manipulation (OVMM) is a critical capability for autonomous robots when facing the challenges posed by unseen dynamic environments. This task requires robots to navigate their surroundings, build semantic understanding, generate actionable plans to accomplish manipulation goals, adapt to environmental changes, and comprehend natural language commands from humans.

To address these challenges, we propose a novel framework that combines the zero-shot detection and grounded perception capabilities of pre-trained vision-language models (VLMs) with dense 3D entity reconstruction to build 3D semantic maps.

Additionally, we leverage large language models (LLMs) for spatial region abstraction and online planning by integrating human instructions with spatial semantic context.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/5850c23c-52c3-43be-b2d4-8680e5d996ba/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Mobile manipulation is an essential and fundamental capability for autonomous robots. The recent surge of pre-trained LLMs and VLMs and their integration with robotics have garnered significant interest in open-vocabulary and zero-shot capabilities for autonomous robots in navigation and mobile manipulation tasks.

Moreover, the lack of prior knowledge about previously unseen environments and dynamic factors that change the setup further complicate the problem. Addressing these two issues is critical to developing robots that become generalists and practically applicable to a broader range of real-world tasks.

#### Two stage Approach

In Stage 1, 3D Semantic Map Construction, the robot explores the environment using heuristic algorithms, and the robot's sequential observations enter a Simultaneous Localization and Mapping (SLAM) pipeline to reconstruct dense 3D structures for navigation. Through a semantic extraction and abstraction pipeline that leverages the open-vocabulary detection and zero-shot abstract reasoning capabilities of LLMs and VLMs, we build semantic understanding of the environment captured in a 3DSMap for open-vocabulary navigation and mobile manipulation.

In Stage 2, Semantic-Aware Open-Vocabulary Mobile Manipulation, the robot parses human commands and hints given in natural language and uses an LLM to present the corresponding semantically optimal area search plan. Subsequently, VLMs and conventional search-based and probabilistic trajectory and motion planners detect objects, pick up the target object, and return it to the user.

---

### Methods

#### Task Objective and Context

The task objective is for the robot to find and deliver objects to a human user in an open-vocabulary setting.

#### Formulation

Formally, it can be described as a tuple $(\mathbf{g_o}, \mathbf{g_R})$. The robot receives a natural language command $L$ about the goal from the user. Note that hints $\mathbf{\hat{g}_R}$ provided by the user are optional and may occasionally be misleading due to the user's misremembering or dynamic changes in the environment. Successful execution requires the robot to reach the target region $\mathbf{g_R}$, pick up the target object $\mathbf{g_o}$, and bring it back to the user.

#### 3D Semantic Mapping in Unseen Environments

<img src="https://velog.velcdn.com/images/devjo/post/21b29a56-3e04-4447-916b-6d4064e9c5eb/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

In unseen environments with no prior knowledge, it is essential for robots to perceive their structural layout and further build semantic understanding of the environment. A heuristic frontier exploration algorithm is used to guide the robot's exploration. Sequential visual-inertial sensing inputs from the robot's RGB-D camera and IMU are recorded, comprising RGB image frames ${\text{I}_{\text{RGB}}^{t}}$, depth frames ${\text{I}_{\text{D}}^{t}}$, and IMU measurements ${I^{t}}$, each associated with timestamp $t$.

To build semantic perception of the environment in a training-free manner, we adopt the Grounded SAM pipeline for 2D open-vocabulary detection and pixel-wise segmentation.

For each RGB image frame of keyframe $k$, object instances ${\mathbf{b}^{(k,i)}}_{i=1}^{N_k}$ are detected using open-vocabulary detection models such as Grounding DINO and segmented into masks.

Instances ${\mathbf{q}^{(k,i)}}$ extracted and registered in the instance semantics layer are projected onto a 2D plane by simply removing the height dimension at the geometric centers ${\mathbf{\bar{p}}^{(k,i)}}$ to form a 2D bird's-eye-view semantic map.

#### Semantic-Aware Open Vocabulary Mobile Manipulation

The robot receives a natural language command $L$ from the user about the goal of the mobile manipulation task, which requests fetching the target object $\mathbf{g_o}$. The target object $\mathbf{g_o}$ is fed into a pre-trained LLM with template $\text{T}_{\text{Prioritization}}$ along with the list of regions in the scene $\text{S}_R$ obtained from region semantic abstraction, prioritizing regions based on the semantic relevance between $\mathbf{g_o}$ and each region in $\text{S}_R$. An optional re-prioritization stage follows, assigning the highest priority to the area $\mathbf{\hat{g}_R}$ suggested by the user in $L$.

Since we consider grounded mobile manipulation, the structural hierarchy of 3DSMaps is flattened into 2D cost maps for navigation to reduce computational complexity.

When the robot reaches a searchable position $p$ in region $R$, it performs end-effector planning for camera pose $\text{T}_{\text{cam}}$ to look into the workspace at $p$.

---

### Conclusion

In this study, we proposed a novel framework that addresses the Open-Vocabulary Mobile Manipulation (OVMM) problem.

The framework combines zero-shot detection and grounded perception capabilities of pre-trained vision-language models (VLMs) with dense 3D entity reconstruction to build 3D semantic maps.

Future work will focus on integrating autonomous exploration techniques to extend the system's capabilities to unknown environments.

---

### 참고 자료

[원본 경로 #1](https://arxiv.org/pdf/2406.18115)

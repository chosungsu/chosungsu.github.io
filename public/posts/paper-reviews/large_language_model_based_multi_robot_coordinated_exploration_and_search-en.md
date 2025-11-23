---
title: 'LLM-MCoX: Large Language Model-based Multi-robot Coordinated Exploration and Search'
date: '2025-10-16'
tags: ['embodied ai', 'paper review']
---

### Abstract

Autonomous exploration and object search in unknown indoor environments remain challenging for Multi-Robot Systems (MRS). Traditional approaches often rely on greedy frontier assignment strategies with limited inter-robot coordination.

In this study, we introduce LLM-MCoX, a novel framework that leverages Large Language Models (LLMs) for intelligent coordination of homogeneous and heterogeneous robot teams tasked with efficient exploration and target object search missions.

The approach combines real-time LiDAR scan processing for frontier cluster extraction and doorway detection with multimodal LLM reasoning to generate coordinated waypoint assignments based on shared environment maps and robot states.

LLM-MCoX demonstrates superior performance compared to existing methods, including greedy and Voronoi-based planners, achieving $22.7\%$ faster exploration time and $50\%$ improved search efficiency in large-scale environments with $6$ robots.

---

### Introduction

#### Challenges of Multi-Robot Exploration

Coordinated exploration and object search remain fundamental challenges for Multi-Robot Systems (MRS), especially in unknown dynamic environments such as disaster areas, industrial facilities, and underground caves. Achieving efficient and scalable exploration requires sophisticated planning strategies that effectively balance local sensing, task assignment, and global coordination.

Rapidly-exploring Random Trees (RRT), a classical sampling-based planner, has been widely used for robot exploration. While effective for rapid deployment, it often results in redundant or inefficient trajectories, especially in complex or vast environments.

Frontier-based exploration has emerged as an information-theoretic alternative that guides robots to boundaries between known and adjacent unknown regions to maximize new information gain. However, most implementations rely on greedy heuristic assignments, typically selecting frontiers based solely on proximity or estimated local utility without considering global coordination or workload balance.

#### Potential of LLM-Based Coordination

Recent advances in Large Language Models and Vision-Language Models present promising solutions to address these limitations, thanks to their remarkable capabilities in multimodal reasoning, context understanding, and high-level decision-making across diverse robotics applications.

LLMs excel at interpreting spatial layouts, processing high-level natural language descriptions, and decomposing abstract goals into executable steps. Unlike existing approaches that rely on greedy single-agent strategies or distributed coordination with limited global awareness, LLMs offer the potential for globally informed adaptive planning.

#### LLM-MCoX Framework Introduction

Consequently, this study introduces LLM-MCoX, a novel framework that leverages pre-trained multimodal LLMs as centralized high-level planners for efficient multi-robot exploration and object search in unknown environments.

It integrates both structured spatial information (frontiers and doorways) and unstructured semantic cues (natural language hints) to generate meaningful waypoint sequences for each robot.

For example, given commands such as "the object is likely at the far end of the main corridor," it can reason about spatial layouts and commands together to prioritize relevant areas. This enables context-aware and adaptive planning that significantly extends the capabilities of traditional heuristic or geometry-centric approaches, effectively bridging robot perception and human-like semantic reasoning.

---

### Related works

#### Classical Exploration Strategies

Sampling-based planning generates candidate viewpoints from adjacent cells and typically ranks them based on utility functions that balance information acquisition and distance to robots. These methods are often vulnerable to local minima, causing robots to repeatedly select suboptimal viewpoints in clustered regions, leading to redundant trajectories and poor scalability in large-scale areas.

Frontier-based exploration guides robots to boundaries between known free space and adjacent unknown regions. Raw frontier cells are typically clustered using algorithms such as mean shift, K-means, and PCA, and small clusters due to sensor noise are often discarded.

#### Multi-Robot Exploration and Coordination

Greedy centralized assignment allocates frontiers or viewpoints based on robot proximity or individual utility estimates. While computationally efficient, the lack of global reasoning often results in imbalanced and inefficient multi-robot exploration.

Advanced spatial partitioning strategies distribute tasks spatially. They assume uniform initial robot distribution, which conflicts with real-world deployments where robots are typically deployed together at common entry points, leading to imbalanced workloads and suboptimal exploration efficiency.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/1e231da6-3cc5-470c-ae58-4fc76b1c3b41/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### Problem Definition

The MRS goal is to explore a previously unknown bounded 2D space $G \in \mathbb{R}^2$ or search for a target object located at an unknown location $g_{\text{int}} \in G$.

The environment is represented as a grid map $G \in \mathbb{Z}^{H \times W}$ with fixed resolution $r$, height $H \in \mathbb{R}$, and width $W \in \mathbb{R}$. Each cell $g \in G$ is labeled as unknown, free, or occupied, visualized as white, gray, and black, respectively. Thus, the environment is divided into three disjoint subspaces.

#### Overall Architecture

Frontier cells are defined as free cells adjacent to unknown regions in the occupancy map. In large-scale environments, the number of frontier cells can be excessive, making it computationally expensive to consider all of them. Therefore, many existing methods perform clustering or sampling to identify a subset of informative candidates.

$$
U(g) = s(g) - \lambda c(g)
$$

where $g$ is a sampled frontier cell, $s(g)$ represents estimated information gain (computed as the proportion of unknown cells that would fall within the robot's LiDAR range if the robot were located at $g$), and $c(g)$ represents the distance from the nearest robot to $g$. Parameter $\lambda$ balances exploration utility $s(g)$ and travel cost $c(g)$.

Doorway detection similarly starts by sampling $H_d$ candidate frontier cells. For each candidate, rays are cast in $Q$ discrete directions, and symmetric wall boundaries on both sides are examined to identify narrow gaps matching doorway shapes.

Multimodal inputs are passed to the LLM via template prompts, serving as a centralized high-level planner for each robot to assign globally informed, semantically meaningful goals grounded in both map geometry and task context. At each planning step, each robot $i$ is assigned a sequence of waypoints $W^t_i = [w^t_{i,1}, w^t_{i,2}, \ldots, w^t_{i,n^t_i}]$ to explore.

---

### Conclusion

In this paper, we introduced LLM-MCoX, which leverages LLMs as high-level planners to coordinate Multi-Robot Systems for exploration and search tasks in unknown environments.

The LLM operates on shared LiDAR-based maps and integrates structured spatial data with unstructured natural language commands. Future work will integrate additional onboard sensors such as cameras to enable real-time semantic understanding, allowing the system to dynamically respond to environmental cues beyond initial commands.

---

### References

[Original Source #1](https://arxiv.org/pdf/2509.26324)

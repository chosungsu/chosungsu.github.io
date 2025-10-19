---
title: 'Multi-Agent Target Assignment and Path Finding for Intelligent Warehouse: A
Cooperative Multi-Agent Deep Reinforcement Learning Perspective'
date: '2025-05-17'
tags: ['robotics', 'paper review']
---

### Abstract

Target Assignment and Path Planning (TAPF) are two core problems in intelligent warehouses. However, most of the literature treats only one of these problems in isolation.

We propose a method that solves target assignment and path planning simultaneously from the perspective of cooperative multi-agent deep reinforcement learning (RL).

To the best of our knowledge, this is the first work to model the TAPF problem for intelligent warehouses as a cooperative multi-agent deep RL problem, and the first to address TAPF jointly based on multi-agent deep RL.

---

### Introduction

With the rapid development of logistics-related industries, intelligent warehousing faces new opportunities and challenges. Traditional warehousing relies on conveyor belts and other equipment for material handling, which lacks flexibility and is difficult to scale. Intelligent warehouses leverage multi-agent systems to move items to designated locations, significantly improving warehouse efficiency.

Intelligent warehouse systems are mainly divided into order fulfillment systems (e.g., Kiva) and logistics sorting centers. In order fulfillment, mobile agents move inventory pods to inventory stations for workers to pick items, then return the pods to their original locations. In sorting centers, agents pick items from loading stations and deliver them to chutes in the center of the warehouse. Our approach is based on the logistics sorting center setting.

Task Assignment and Path Finding (TAPF) are two critical processes in intelligent warehouses. The system first assigns specific tasks to agents according to order requirements. Agents then transport items from sources to destinations while ensuring paths are collision-free with other agents.

The TAPF problem is typically NP-hard with a large search space, making direct solution difficult. It is commonly addressed in two stages:

Stage 1 is Multi-Agent Task Assignment (MATA), which assigns tasks to agents without considering potential path conflicts among agents.

Stage 2 plans paths for all agents using Multi-Agent Path Finding (MAPF) algorithms.

There is extensive literature on MATA and MAPF; details are given next. Solving TAPF in a decoupled way reduces difficulty but ignores mutual influence between assignment and planning. A reasonable assignment can effectively shorten agent path lengths to improve efficiency and also help avoid inter-agent path conflicts. Therefore, solving TAPF jointly is desirable. We assume idle agents and inventory pods are homogeneous, so any task can be assigned to any agent.

---

### Related work

#### 1. Multi-Agent Task Assignment

Multi-Agent Task Assignment (MATA) algorithms maximize warehouse resource utilization. In intelligent warehouses, MATA algorithms can be categorized by management style into centralized and distributed.

Centralized assignment: a central controller assigns tasks to agents. Classical centralized algorithms include the Hungarian algorithm, Tabu search, and genetic algorithms.

Distributed assignment: each agent plans its own task sequence based on task and environment information. This reduces the load on the central controller and is more flexible and adaptive, but may fail to find a global optimum. Distributed approaches mainly include learning-based methods and market/auction methods.

#### 2. Multi-Agent Path Finding

Recently, Multi-Agent Path Finding (MAPF) has become a hot topic in computer science and robotics. Classical MAPF algorithms are divided into optimal and sub-optimal types depending on whether they guarantee optimality.

Optimal MAPF algorithms include A*-based methods, Conflict-Based Search (CBS), increasing cost tree search–based methods, and compilation-based methods.

Sub-optimal classical MAPF algorithms include search-based, rule-based, compilation-based, Bounded Conflict-Based Search, and genetic algorithm–based methods.

However, traditional MAPF algorithms often perform poorly in real time. Consequently, many researchers have studied deep RL–based MAPF. PRIMAL is a representative deep RL MAPF method, but it still solves multi-agent problems with a single-agent deep RL paradigm.

#### 3. Cooperative Multi-Agent Deep Reinforcement Learning

Cooperative multi-agent RL considers systems of multiple agents interacting within a shared environment. The goal is to learn policies that enable agents to cooperate to achieve a common objective. Multi-agent deep RL has gained significant attention due to its ability to learn decision-making in multi-agent environments via interaction.

Independent Q-Learning (IQL) decomposes a multi-agent RL problem into a set of simultaneous single-agent RL problems sharing the same environment. However, IQL cannot address nonstationarity arising from changing policies of other agents.

Value-Decomposition Networks (VDN) propose learning by linearly decomposing a team value function into per-agent value functions. QMIX then uses a mixing network architecture to approximate the joint state–action value of all agents, combining per-agent values nonlinearly conditioned only on local observations. QMIX further imposes a monotonicity constraint on the mixing network to ensure the joint value is monotonic in each agent’s value.

However, the above algorithms cannot handle continuous action spaces.

Deep Deterministic Policy Gradient (DDPG) is a representative method for single-agent continuous control.

Multi-Agent DDPG (MADDPG) extends DDPG from single-agent to multi-agent settings via centralized training with decentralized execution and is a representative algorithm for multi-agent continuous action problems.

Accordingly, we model TAPF in intelligent warehouses as a cooperative multi-agent deep RL problem and introduce MADDPG to solve target assignment and path finding jointly.

---

### Preliminaries

#### 1. MDP and RL

We consider a finite-horizon Markov Decision Process (MDP) defined by $(\mathcal{S}, \mathcal{A}, P, r, \gamma, T)$.

Here, $\mathcal{S}$ is the state space, $\mathcal{A}$ is the action space, $P: \mathcal{S} \times \mathcal{A} \times \mathcal{S} \to [0, 1]$ is the state transition distribution, $r: \mathcal{S} \times \mathcal{A} \to \mathbb{R}$ is the reward function, $\gamma \in [0, 1)$ is the discount factor, and $T$ is the horizon.

At each time step $t$, an action $a_t \in \mathcal{A}$ is chosen by the policy $\pi$. The next state is sampled from $P(s_{t+1} \mid s_t, a_t)$, and the agent receives immediate reward $r(s_t, a_t)$. The agent continues until reaching a terminal state or $t$ reaches the horizon $T$.

We do not have access to environment dynamics $P$ and therefore learn with model-free RL.

#### 2. A Cooperative Multi-Agent Deep RL Perspective

<img src="https://velog.velcdn.com/images/devjo/post/91cd73fa-cb57-4b05-ba03-e5658c182ebf/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

In our setting, the transition function $P(s'_{t+1} \mid s_t, a_t): \mathcal{S} \times \mathcal{A}^N \times \mathcal{S} \to [0, 1]$ is unknown, meaning agents cannot access the environment dynamics—consistent with real TAPF problems. The number of agents $N$ can be any integer. We set the discount factor to $\gamma = 0.99$, a common choice in deep RL. The key elements are the observation space $\mathcal{O}$ (or state space $\mathcal{S}$), action space $\mathcal{A}$, and reward function $r$.

Each agent observes its own position and velocity, relative positions of all tasks, relative positions of other agents, and relative positions of nearby obstacles. The number of other visible agents included in a single agent’s observation is set to be at most $N-1$.

The agent’s action space is continuous and represents motion. As illustrated above, the agent obtains speeds between $0.0\,\text{m/s}$ and $1.0\,\text{m/s}$ along four basic directions [left ($\vec{v}_{-x}$), right ($\vec{v}_{x}$), down ($\vec{v}_{-y}$), up ($\vec{v}_{y}$)], and the final action ($\vec{v}$) is the vector sum of the four directional speeds.

The reward function is defined as:

$$
r = r_{\text{success}} + r_{\text{distance tasks to agents}} + r_{\text{collision agents to obstacles}} + r_{\text{collision agents to agents}}
$$

---

### Conclusion

We validate our method in various intelligent warehouse settings with five scenario levels: (1) 2 agents – 2 tasks, (2) 2 agents – 4 tasks, (3) 5 agents – 5 tasks, (4) 5 agents – 10 tasks, (5) 5 agents – 20 tasks.

<img src="https://velog.velcdn.com/images/devjo/post/fb8008fc-f332-4fec-bac7-24649569eccc/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

As shown above, the average reward increases monotonically across scenarios, verifying the stability of our method.

First, we model TAPF as a cooperative multi-agent deep RL problem. Second, we solve target assignment and path finding jointly via a cooperative multi-agent deep RL algorithm. Moreover, unlike most prior work, we consider agents’ physical dynamics. Experiments show strong performance across task settings, indicating assignments are reasonable and planned paths are near-shortest, and further, our method is more time-efficient than baselines.

---

### References

[Source #1](https://arxiv.org/pdf/2408.13750v1)

---
title: 'Safe multi-agent navigation guided by goal-conditioned safe reinforcement learning'
date: '2025-02-25'
tags: ['reinforcement learning', 'paper review']
---

### Abstract

Autonomous navigation in complex and dynamic environments remains a core challenge, especially in safety-critical applications like self-driving vehicles and aerial drones. While traditional path planners excel in structured environments, they struggle with adaptability. Conversely, reinforcement learning (RL) offers flexibility and high-dimensional perception handling but often falls short in safety and multi-agent coordination.

This paper proposes a goal-conditioned safe reinforcement learning (Safe-RL) framework with a curriculum-based self-training method, enabling robust and safe navigation in multi-agent environments. The model jointly optimizes for goal achievement and collision avoidance and demonstrates superior performance on challenging simulation benchmarks.

---

### Introduction

<img src="https://velog.velcdn.com/images/ski06043/post/edc8e62c-6d22-4a15-8fbc-d7bc222aa77e/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

In real-world environments, autonomous agents must navigate safely over long distances, as failure to do so can result in significant damage. Recent research in Multi-Agent Path Finding (MAPF) has proposed decomposing the problem into single-agent path planning. However, this approach requires access to a structured graph representation of the environment and assumes the availability of not only valid node connections but also useful information such as safety labels and travel times.

On the other hand, learning-based approaches like Deep Reinforcement Learning excel at learning state utility from high-dimensional information such as images. Goal-Conditioned RL is particularly effective for learning tasks where agents need to achieve specific goals like navigation and manipulation. However, Long-Horizon Tasks remain one of the challenging research areas.

As mentioned in the Abstract, this paper proposes a framework that provides flexibility in balancing between faster paths and safer paths according to user preferences.

---

### PRELIMINARIES

__1.Goal-Conditioned Reinforcement Learning (GCRL)__

A Markov Decision Process (MDP) (S, A, T, R, γ) consists of state space S, action space A, transition probability T, reward R, and discount factor γ. This paper defines goal-conditioned reinforcement learning using an extended MDP (S, A, P, R, γ), where P($s_{t+1}|s_t, a_t, s_g$) represents the goal-conditioned state transition probability, and R($s_t, a_t, s_g$) represents the goal-conditioned reward function.

The agent's goal is to learn a goal-conditioned policy π($a∣s,s_g$) that maximizes the expected cumulative reward, where the reward function $R$ varies according to the goal and reflects how well action $a$ aligns with the desired goal.

__2.Bridge Planning and Single-Agent RL__

To solve Long-Horizon Tasks, there have been experiments combining RL with single-agent planning, proposing Search on Replay Buffer (SoRB). In this environment, R($s, a, s_g$) = -1 and γ = 1 are defined, and the goal-conditioned policy $\pi$($a∣s,s_g$) and its corresponding value function V($s, s_g$) are learned using standard off-policy RL.

The value function can approximate the distance between state s and goal s_g as $V(s,s_g) = -d_{sp}(s,s_g)$, where $d_{sp}(s,s_g)$ is the distance of the shortest path from state $s$ to goal state $s_g$ (or the expected number of steps needed to reach goal state $s_g$ when following the optimal policy $\pi$).

SoRB constructs a weighted directed graph G from states sampled from the Replay Buffer or randomly sampled from the state space. Each node in the graph represents one observation, and edges are added based on the predicted distance V($s_1, s_2$) between node pairs. If this value is greater than $d_{max}$, the node pair is considered unreachable and no edge is added.

However, SoRB uses a greedy strategy during exploration, so safety is not considered.

__3.Constrained Reinforcement Learning (CRL)__

To incorporate safety, we build within a constrained reinforcement learning framework, which defines an auxiliary cost function $C:S×A×S→R$ and cost limit $δ∈R+$ to solve the Constrained Markov Decision Process (CMDP) problem.

The expected discounted cost return when following policy $\pi$ is defined as:

$$
J_C(\pi) = E_{\tau \sim \pi} [\sum_{t=0}^{\infty} \gamma^t C(s_t, a_t, s_{t+1})]
$$

The set of admissible stationary policies in CMDP is expressed as:

$$
\Pi_C = \{\pi \in \Pi | J_C(\pi) \leq d\}
$$

While general off-policy methods can solve CRL by introducing Lagrange multipliers to penalize unsafe actions that violate cost constraints, they have limitations as the cost function and cost limit are task-dependent.

__4.Multi-Agent Path Finding (MAPF)__

In the MAPF problem, a weighted graph $G(V,E)$ and a set of agents $A=\{a_1, a_2, ..., a_k\}$ are given. Each agent has a unique start point $s_i \in V$ and goal point $g_i \in V$.

Agents can either wait or move to adjacent vertices, and each action incurs a penalty defined in graph G(V,E). Once an agent reaches its goal point, no further penalties are imposed.

---

### APPROACH

__1.Goal-Conditioned Safe Reinforcement Learning__

Inspired by SoRB, we train an agent that can predict distance and cost between state pairs. Since the value function is determined by the policy, it's important to first train an unconstrained agent that includes a goal-based policy $π(s, a, s_g)$, Q-function for cumulative reward $Q(s, a, s_g)$, and Q-function for cumulative cost $QC(s, a, s_g)$ to obtain distance and cost predictions following the shortest path.

Subsequently, we apply Constrained RL (CRL) methods to train a constrained policy $πc(s, a, s_g)$ and its corresponding value functions, enabling the agent to learn safe exploration. However, since the cost limit used in conventional CRL cannot be directly applied in goal-based settings, we redefine the cost limit as a hyperparameter, setting it as a soft constraint that imposes penalties on unsafe actions without requiring strict compliance. However, if the cost limit is set too low (penalties too high), it may generate policies that focus more on reducing costs rather than achieving goals. Therefore, this experiment uses a Lagrangian Actor-Critic method with a simple structure.

__2.Self-Sampling and Training__

To train a goal-based agent, we need to sample a set of goal states that allows the agent to practice exploration and goal achievement. The design of the sampling strategy is a crucial factor in the success of goal-based agent training.

While SoRB prioritized sampling nearby goals to increase short-term exploration success rates, this method requires an oracle with access to the ground-truth position of states. However, such oracles often don't exist in reality.

To address this, we propose a self-sampling and training algorithm that uses the agent's Q-function to evaluate and select training samples with various distances and costs. As the Q-function becomes more accurate, the quality of training samples improves, ultimately leading to better policy learning.

__3.Categorical Cost Estimation__

Applying Distributional RL can improve the quality of goal-based value functions, enhancing exploration performance. Therefore, in this experiment, we model the goal-based value function as a categorical probability distribution Zπ.

$Z_{\pi} \sim Cat(N, p_{\pi}(z|s, a, g))$ where the range of cost values is [$V_{min}$, $V_{max}$], and $N$ is the number of uniformly divided classes. The support value for each class is defined as:

$$
z_i = V_{min} + i\Delta z, 0≤i<N
$$

$$
\Delta z \triangleq \frac{(V_{max} - V_{min})}{N-1}
$$

As a result, we could estimate goal-based costs using the expected value of the distribution:

$$
c_{\pi}(s_1,g)=E_{p(z|s,a,g)} [z]
$$

However, since Zπ is a categorical probability distribution, we couldn't use standard Bellman updates. Therefore, we update the cost Q-function QC(s, a, sg) following the Categorical Algorithm.

__4.Graph Construction from Replay Buffer__

We construct a weighted directed graph using observation data stored in replay buffer B. Each edge has predicted distance and cost values for specific state pairs, defined as.

$$
d_{sp} \approx d_{\pi} \leftarrow Q(s, \pi(s_i, a, s_g), s_j), c_{sp} \approx c_{\pi} \leftarrow Q(s, \pi(s_i, a, s_g), s_j)
$$

Graph G is defined as V=B (graph node set is states in buffer), E=B*B (possible edges between all state pairs), with $W_d$ and $W_c$ representing distance and cost weights respectively:

$$
G \equiv (V, E, W_d, W_c)
$$

__5.Collision-Based Search (CBS) for Multi-Agent Path Finding__

The Multi-Agent Path Finding (MAPF) problem faces the challenge of exponentially increasing state space. To address this, we utilize the Conflict-Based Search (CBS) algorithm.

CBS operates on two levels (High-Level & Low-Level):
High-Level Search
Manages constraints on agent paths and gradually adjusts path planning to resolve conflicts. It uses a tree structure to find optimal constraints.

Low-Level Search
Uses the Space-Time A* algorithm to search for individual agent paths. It ensures each agent finds an optimal path while satisfying given constraints.

This dual-level structure allows CBS to effectively manage the complexity of the MAPF problem by separating it into single-agent path finding problems and gradually adjusting conflicts.

---

### EXPERIMENTS

__Experiment Overview and Evaluation Questions__

The experiments in this study evaluated the effectiveness of the proposed method by answering the following key questions.

Q1: Can our approach demonstrate safer agent behavior compared to other methods?

Q2: When adjusting cumulative costs, does our approach sacrifice the ability to reach distant goals?

Q3: When extended to multi-agent environments, does our approach show superior performance compared to other methods?

__Experimental Environments__

-2D Navigation Environment
-Using Central Obstacle Map
-Agent observations: position $s = (x, y) ∈ R^2$
-Agent actions: directional movement $a = (dx, dy) ∈ [−1, 1]^2$
-Agent position is updated every timestep

__Visual Navigation Environment__

-Selected 4 environments from ReplicaCAD dataset
-Simulation using Habitat-Sim
-Agent observations: RGB panorama images (32 × 32 pixels, combining first-person view images from 4 directions)
-Action space: same as 2D navigation environment

__Cost Limits and Cost Function__

Cost limit (δ) set to 10 in all experiments
Cost function $C(s)$ defined based on distance ℎ from obstacle boundaries.

$$
C(s) = \begin{cases} 2 - 2h/r, 0≤h≤r \\ 0, otherwise \end{cases}
$$

where $ℎ:S→R ≥0$ is the distance to the nearest obstacle, $r∈R+$ is the influence radius of obstacles
In experiments: $r=10$ (2D navigation) / $r=10$ (visual navigation)

---

### References

[Original Path #1](https://arxiv.org/pdf/2502.17813)


---
title: 'Graph neural networks-based Scheduler for Production
planning problems using Reinforcement Learning'
date: '2023-05-10'
tags: ['robotics', 'paper review']
---

### Abstract

Reinforcement Learning (RL) is increasingly being adopted in Job Shop Scheduling Problems (JSSP). However, RL for JSSP is typically performed using vectorized representations of machine features as the state space. This presents three major issues: (1) the relationships between machine devices and job sequences are not fully captured, (2) exponential growth in state space size with increasing numbers of machines/jobs, and (3) the agent's generalization problem for unseen scenarios.

This paper presents a new framework called GraSP-RL (GRAph neural network-based Scheduler for Production planning problems using Reinforcement Learning), a graph neural network-based scheduler for production planning problems using reinforcement learning. This framework represents JSSP as a graph and trains an RL agent through features extracted using Graph Neural Networks (GNN). While the graph itself exists in a non-Euclidean space, the features extracted using GNN provide rich encoding of the current production state in Euclidean space. At its core is a customized message passing algorithm applied to GNN. The node features encoded by GNN are subsequently used by the RL agent to select the next job.

Furthermore, we consider the scheduling problem as a distributed optimization problem, where learning agents are individually assigned to all production units and agents learn asynchronously from experiences collected across all other production units.

GraSP-RL is then applied to a complex injection molding production environment with 30 jobs and 4 machines. The objective is to minimize the makespan (maximum completion time) of the production plan. It is compared and analyzed against priority dispatch rule algorithms and metaheuristics such as Tabu Search (TS) and Genetic Algorithm (GA).

---

### Introduction

Manufacturing or production scheduling tasks are receiving increasing attention from manufacturing companies to enhance the profitability and productivity of work sites, especially in competitive global markets. The Job Shop Scheduling Problem (JSSP) is the problem of assigning jobs to a limited number of resources within specified time frames, where this assignment is made in a way that optimizes one or more objectives, such as reducing production costs, shortening setup times, and reducing planned time. These objectives are met by deriving appropriate times for executing each job while considering temporal relationships between production processes and constraints of shared manufacturing resources.

Furthermore, optimization must be repeated whenever information in the production environment changes. That is, the above architecture does not capture transferable knowledge. Using a reinforcement learning approach can overcome the knowledge capture problem.

Through GraSP-RL, we model the production environment as a graph to explicitly capture internal relationships between machines and buffers, and use a customized Graph Neural Network (GNN) to extract rich feature encodings of machine nodes. We use distributed learning and only local features of machines for each machine node.

---

### Related Work

Scheduling problems are known to be NP-hard, meaning they cannot be solved in polynomial time. Initially, the focus was on providing exact solutions, but the research focus shifted to approximate solutions. Therefore, methods for solving scheduling problems are divided into two types: exact methods and approximate methods.

Exact solutions include integer programming and branch and bound, while approximate solutions include Genetic Algorithm (GA) and Tabu Search (TS). Approximate methods provide good solutions within reasonable time but suffer from the 'curse of dimensionality'. That is, as machines or jobs are added to the problem, the problem size increases exponentially. Additionally, these algorithms do not capture knowledge that can be reused later. That is, these algorithms make plans based on initial conditions, and when these conditions change, the algorithm must be rerun to find a near-optimal plan.

#### Scheduling with Reinforcement Learning

Recent advances in RL have opened a very interesting path that not only enables near-optimal planning but also captures and reuses planning knowledge. RL has achieved superhuman performance in board games such as Go and chess, and in robotics. This demonstrated that it can not only learn and perform specific tasks well but also generalize well and enable multi-task learning. Advances in deep neural network capabilities have also helped expand the boundaries in RL applications.

Furthermore, model-free multi-agent approaches have been used to develop adaptive reactive scheduling agents. These studies still suffer from the curse of dimensionality, but this can be somewhat alleviated using multi-agent settings. The transition from single-agent to multi-agent causes each agent's environment to become non-Markovian as individual agents change their behavior during learning, resulting in a Partially Observable Markov Decision Process (POMDP). Initial approaches use cooperative settings based on $\text{Q}$-learning, which assumes that other agents' actions are made to improve collective rewards.

#### Using Graph Neural Networks

All the aforementioned RL advances use Convolutional Neural Networks (CNN) and MLP, which use feature engineering to achieve performance. Additionally, deep learning methods do not work well with data in non-Euclidean spaces and are inherently neither size-invariant nor permutation-invariant. When a single machine or job is added to the scheduling environment, the agent must be completely retrained from scratch because the previously trained state concepts are no longer valid.

---

### Method

<img src="https://velog.velcdn.com/images/devjo/post/718dc73e-6e88-42ac-a7ab-a430e1db2891/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### JSSP modeling

A cycle begins when a machine becomes empty and a job is loaded from the buffer. Current data from the production environment is first used to construct a graph of the environment state containing corresponding node and edge information. The constructed graph is passed through a GNN. Neighbor information is aggregated at all nodes. After this step, relationships between machines and remaining jobs are captured from the perspective of each node. The feature vector of buffer $X_8$ of the currently empty machine is passed to the RL agent PPO to take an action. This action tells the environment which job from that machine's buffer should be loaded onto the machine. When the next machine becomes empty, the cycle repeats.

#### Node features and dynamic edges

Machine node $X_m$ is the one-hot encoding vector of the job currently being processed.

$$
\begin{aligned}
&e_i(x) = \mathbb{1}_A(x) := \begin{cases} 1, & \text{if } x \in A \\ 0, & \text{if } x \notin A \end{cases} \\
&X_m = e_i(j_m), \quad \text{where } j_m \text{ is the current job.}
\end{aligned}
$$

For machine buffer node $X_{mb}$, it is the sum of one-hot encoding vectors of all jobs held by that buffer.

$$
X_{mb} = \sum_{n=0}^{j_{mb}} e_i(n), \quad \text{where } j_{mb} \text{ is the set of jobs.}
$$

While node features are updated based on jobs present in machines or machine buffers, edges are dynamically created based on jobs present in machines. For example, if a job present in $X_1$ must perform operations sequentially at machines $X_4$ and $X_5$, edges ${e_{X_1 X_4}, e_{X_4 X_2}, e_{X_2 X_5}}$ are created. The generated node features $X$ and edges $E$ represent the current state of JSSP as a graph $G = (X, E)$. The graph $G$ is then passed through a GNN to extract encoded features for the corresponding machine.

#### Multi-agent reinforcement learning

Node features are now encoded into a lower-dimensional Euclidean space compared to the non-Euclidean space of the graph structure. There are two benefits to using graph representation for JSSP and processing the graph using GNN.

First, it reduces the global optimization problem to a local optimization problem. That is, at any point in the interaction between the agent and the environment, we focus only on the currently empty machine. $S'$ allows the RL agent to act on the environment in a distributed manner and is end-to-end trainable. Here, distributed means that the same agent takes actions across multiple machines. The generalization performance of GraSP-RL in OSS and RJSSP can be attributed to the powerful neighbor aggregation performed by GNN. This ensures that even if machines are added, the node features used by the agent only contain information from adjacent nodes, making it a local optimization problem.

Second, unlike previous approaches, the state space expands only linearly with increasing number of jobs, and the number of dimensions is separated from the number of machines. Therefore, our approach makes the neural network size smaller, providing better sample efficiency.

---

### Conclusion

JSSP approaches are primarily centralized and do not scale well as problem size increases. Even RL approaches use vectorized representations of the current state and do not consider the inductive bias inherent in the graph nature of JSSP.

To overcome this problem, we first set up the JSSP environment as a bipartite graph, then process it through GNN, and further use message-passed node features of machines in RL to take actions. Since the RL agent's information comes only from the machine's perspective, this learns local information and acts on available jobs in predecessor buffer nodes relative to adjacent nodes. This enables capturing relationships between machines and also enables distributed, decentralized learning directly on machine devices while generalizing well to unseen scenarios.

The effectiveness of the planned solution is compared against metaheuristic algorithms such as TS and GA, and priority dispatch rules such as FIFO. As shown in the results, the agent provides the best plan among the comparisons in JSSP tasks and shows excellent performance. Additional testing of the agent on new problem classes such as OSS (Open Shop System) and RJSSP (Reactive JSSP) shows that the agent performs better than FIFO and random actions, and provides performance comparable to TS and GA without additional training.

---

### References

[Original Source #1](https://arxiv.org/pdf/2009.03836)

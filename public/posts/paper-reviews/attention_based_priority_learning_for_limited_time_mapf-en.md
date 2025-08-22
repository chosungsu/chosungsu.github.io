---
title: 'Attention-based Priority Learning for Limited Time Multi-Agent
Path Finding'
date: '2025-02-13'
tags: ['robotics', 'paper review']
---

### Abstract

Despite its importance in recent robotic applications, solving large-scale multi-agent pathfinding (MAPF) problems within limited time remains a challenging task. While recent learning-based methods scale better than traditional approaches, they often fall short of optimal performance and show low success rates within limited time in large-scale cases. These limitations often stem from their black-box characteristics.

In this study, we propose a hybrid approach that integrates prioritized planning with learning-based methods to explicitly address these challenges. We formulate prioritized planning as a Markov Decision Process (MDP) and introduce a reinforcement learning-based prioritized planning paradigm. Through this, we develop a new synthetic score-based attention network (S2AN) to learn conflict/blocking relationships between agents and provide conflict-free priorities.

By integrating priority mechanisms and utilizing new attention-based neural networks for enhanced multi-agent cooperation strategies, we improve solution completeness without sacrificing scalability and maintain linear time complexity, providing a robust path for large-scale MAPF tasks.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/4b5ec4e4-51af-4ece-b87b-db0cd42b0d2c/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Multi-agent pathfinding (MAPF) is a fundamental multi-agent/robotic problem where multiple agents must plan collision-free paths to pre-assigned goal points while minimizing total travel time. However, due to the curse of dimensionality, solving large-scale MAPF within limited time remains a significant challenge. For example, in gaming scenarios, real-time computation and path rendering are required for many agents to quickly find collision-free paths and maintain player immersion. In this study, we focus on large-scale MAPF and present an approach that aims to achieve an efficient balance between high completeness and computation time by improving prioritized planning performance through machine learning.

MAPF algorithms can be classified into non-learning and learning approaches. Non-learning algorithms can be further divided into systematic search algorithms, rule-based algorithms, and prioritized algorithms.

Systematic search algorithms like CBS face difficulties when handling large-scale scenarios due to their NP-Hard nature, showing exponential time in worst cases. In contrast, rule-based algorithms like MAPF-LNS2 and PBS guarantee finding solutions within polynomial time but may encounter planning time or memory issues in practical applications.

In contrast, learning-based methods have shown excellent capabilities in utilizing global information and achieving high performance in many other applications such as routing problems. Centralized multi-agent reinforcement learning (MARL) cannot guarantee optimality or completeness. Due to their black-box characteristics, learning-based methods lack behavioral consistency and low-level optimality. This often requires extended time to guide all agents to their goal points.

To address these limitations, this paper introduces a new paradigm for multi-agent pathfinding (MAPF) that combines learning with prioritized planning. By leveraging the power of machine learning, we reason about global information and directly generate high-quality priorities for agents. These priorities are used to quickly find near-optimal low-level paths for agents, thus solving problems with high completeness and low time complexity.

---

### Related work

#### 1. MAPF Algorithms

Numerous algorithms have been developed to solve MAPF problems, focusing on finding minimum-cost, collision-free solutions. Optimal MAPF solutions are NP-complete and often face scalability issues. Bounded suboptimal solvers ensure that solution costs are within a given range of optimal values and operate at relatively fast speeds. Unbounded suboptimal solutions provide fast computation speeds and show excellent performance in large-scale agent scenarios, finding applications in both research and industry.

Classic non-learning-based approaches include rule-based algorithms, bounded-suboptimal algorithms with infinite boundary elements, and prioritized planning algorithms.

#### 2. Prioritized Planning

Prioritized planning algorithms, while not complete or optimal, represent computationally inexpensive and highly effective approaches for solving MAPF problems. Each agent is assigned a unique priority, and agents are ordered according to predefined global priorities. The agent with the highest priority can first calculate its individual optimal path.

The attention routing problem shares similarities with MAPF and is also NP-hard. Backtracking requires iterative exploration of the entire priority space. These methods iteratively explore subsets of the space until a feasible solution is found. Similar to CBS, they partition the space based on conflicts arising from generated paths and are proven to be P-complete.

---

### Method

We explain our approach in this paper for addressing priority problems within a Markov Decision Process (MDP) framework. We formulate the problem as an MDP and then highlight two important and time-efficient features that enable learning-based models to learn patterns and relationships in data related to MAPF problems. Next, we propose S2AN, which learns to extract latent information from these important features and provide priority sequences with high completeness in an encode-decode manner.

#### 1. Markov Decision Process Formulation

<img src="https://velog.velcdn.com/images/devjo/post/a8d21cb5-c577-473e-8486-ab6e2e593c64/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

A MAPF instance consists of three basic components: obstacle map, start positions, and goal positions. From the initial state $s_1$, the high-level priority planner selects an agent as an action like $a_1$. Subsequently, the low-level single-agent path planner calculates the path for this agent, considering previously planned agents' paths as soft-moving obstacles. The goal is to find a feasible solution. We achieve this by minimizing conflicts. When new conflicts are detected, $R(s_t, a_t)$ equals the negative value of the new conflicting agent. When an episode ends and a conflict-free solution is found, we provide a positive episode reward.

#### 2. Feature Design

<img src="https://velog.velcdn.com/images/devjo/post/a9c1925b-2f49-4eea-96ca-cbe7f160fd5b/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Feature design is the key to maximizing the potential of learning-based models for solving MAPF problems. We use two well-designed features including harmful features and target matrices.

Harmful features evaluate local connectivity to determine whether an agent's goal is blocking its neighbors. We provide an example showing how this feature distinguishes whether an agent's goal is harmful or not. In practice, goal blocking is a common occurrence. When one agent's goal interferes with another agent, its priority should be lowered. However, manually detecting all blocking pairs can be time-consuming. Consequently, we aim to autonomously identify these blocking relationships by utilizing harmful features provided by learning-based models.

On the other hand, another feature, the target matrix, is derived from the minimum target visiting $A^*$ algorithm (MTVA) inspired by MAPF-LNS2. The search prioritizes exploring nodes with minimum $f$ values in the open set to find paths. $f$ is the sum of the heuristic distance to the goal and the travel distance of the node. However, in MTVA, instead of focusing only on minimum $f$ values, we explore nodes with the least visit count $(t_v)$ to other agents' goals. When multiple nodes $(|N|)$ share the minimum $t_v$ value, we select the node with the smallest $f$ value within $|N|$.

#### 3. Policy Network

S2AN is built on Transformer and consists of hybrid initial embedding, attention-based encoder, and synthetic score-based decoder.

In hybrid initial embedding, raw features (obstacle map, start positions, and goal positions) are obtained by mapping to high-dimensional feature spaces. We process instance features and domain-specific features (harmful features) separately. Using ResNet, we project instance features to $x_{i1}$, a $d_1$-dimensional vector. On the other hand, we utilize a linear layer to map harmful features, which are boolean variables, to $x_{i2}$, a $d_2$-dimensional vector. Subsequently, these two vectors are concatenated to form the $d$-dimensional hybrid initial embedding $x_i$ for agent $i$.

The attention-based encoder takes the output of initial embeddings $X_1=\{x_i\}_{1}^{n}$ as input and generates emb, an advanced embedding matrix for all agents. It uses an encoder structure similar to Transformer and consists of $L$ attention layers. To more effectively capture relationships between agents, it consists of multi-head attention (MHA) sub-layers that facilitate communication, and feed-forward (FF) sub-layers composed of two linear projection layers with ReLU activation functions in between. After each sub-layer, skip connections and batch normalization (BN) follow. Ultimately, we obtain emb=$x^{L+1}$ as output.

Based on the embedding matrix emb, our synthetic score-based decoder constructs solutions for MAPF problems in an autoregressive manner.

#### 4. Reinforcement learning

The reinforcement learning loss is defined as the negative of reward expectation $(L_{RL}=-E_{\tau \sim \pi_{\theta}}[R])$. The gradient for minimizing the grill loss is as follows:

$$
\nabla_{\theta} L_{RL}=-E_{\tau}[\sum_{t=1}^T G_t \dot \nabla_{\theta} log \pi_{\theta}(a_t|s_t)], \\
L_{entropy}=-Entropy(\pi_{\theta})
$$

Here, $T$ is the total time steps and equals the number of agents $n$. $\tau$ is the selected action sequence generated by policy $\pi_{\theta}$. Entropy loss is introduced to prevent the model from converging too quickly to suboptimal policies.

#### 5. Reachability Repair Algorithm

In traditional non-distributed methods, planned trajectories often present binary outcomes of being either completely feasible or unexecutable due to conflicts. In contrast, distributed methods, especially learning-based ones, frequently yield conflict-free solutions. When failing to find feasible solutions, they output conflict-free solutions but not all agents reach their goals. Therefore, we thought it necessary to provide fast and effective post-processing methods to resolve limitations.

This includes replanning paths for all conflicting agents to ensure they avoid conflicts with other agents instead of reaching their goals. This will be achieved by repeatedly running SIPPS for conflicting agents and adjusting goals to starting points to avoid conflicts.

Specifically, first, we obtain an initial solution $P = (a_1, P_{a1}) \cup (a_2, P_{a2}) \cup \dots \cup (a_n, P_{an})$ by greedily decoding actions, and select the set $C$ of all conflicting agents in solution $P$. If there are no conflicts, a feasible solution is found and will be returned as $P$. Otherwise, the solution must be repaired.

---

### Experiment

We performed extensive experimental evaluation in three aspects:

1. Comparing success rates of various MAPF algorithms under the same maximum planning time

2. Presenting advantages by comparing success rates, episode lengths, and reach rates with current learning methods

3. Initiating ablation studies to critically evaluate the effects of prominent components of the algorithm

In the training procedure, batch size was set to 64, and for the initial embedding network, we used ResNet18 to encode maps. In both encoder and decoder networks, we integrate 8 attention heads with 128-dimensional features, and the encoder consists of 2 layers.

When the number of agents exceeds 200, S2AN outperforms PRIMAL in terms of success rate. DHC utilizes powerful heuristic map features, but its efficacy significantly decreases in empty map scenarios, resulting in lower success rates and reach rates. Regarding average episode length, S2AN primarily excels due to its ability to avoid inconsistent behaviors.

When entropy loss is omitted, we observe a significant 57% decrease in test rewards. Nevertheless, this performance is still better than random policies, suggesting that the network can quickly converge to suboptimal policies that are difficult to escape from. The absence of raw features causes a 59% decrease, while the absence of harmful features has minimal impact.

---

### Conclusion

In this paper, we propose an effective learning-based paradigm aimed at addressing the challenge of solving large-scale MAPF (Multi-Agent Path-Finding) within limited time. By integrating prioritized planning with attention-based learning algorithms, we achieved a comprehensive multi-agent cooperation strategy that improves both completeness and solution quality within linear time complexity. Simultaneously, by integrating learning mechanisms into the prioritized planning framework and formulating prioritized planning as a Markov Decision Process (MDP), this method enables more informed exploration processes for MAPF.

Experiments demonstrate that attention-based priority learning methods achieve a balance between computation time and completeness, outperforming various learning-based planners in terms of success rate, reach rate, and solution quality in large-scale pathfinding tasks. Furthermore, compared to PIBT and time-limited PBS, the method proposed in this paper shows high completeness in medium to large-scale dense obstacle scenarios and is suitable for accelerating various MAPF algorithms.

---

### References

[Original Source #1](https://www.ifaamas.org/Proceedings/aamas2024/pdfs/p1993.pdf)




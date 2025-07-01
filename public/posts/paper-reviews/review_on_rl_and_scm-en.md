---
title: 'A review on reinforcement learning algorithms and applications in supply chain management'
date: '2024-04-08'
tags: ['scm', 'paper review']
---

### Abstract

Supply chain decision-making faces challenges of high complexity, combination of continuous and discrete processes, and interdependent operations. Intelligent algorithms are opening new potential in adaptive data-driven decision making. We explore the current state-of-the-art technology of reinforcement learning in the field of supply chain management (SCM) and propose a new classification framework. This framework classifies academic papers based on supply chain drivers, algorithms, data sources, and industry sectors.

We gained several insights as follows:

-Classical $Q$-learning algorithms are still the most popular algorithms.

-Inventory management is a key element of supply chain synchronization.

-Most papers deal with toy-like SCM problems implemented with artificial data.

Therefore, transitioning this to industrial scale in the coming years will be an important challenge.

---

### Introduction

Supply chains are operating in increasingly complex and uncertain environments. In such environments, adaptive planning and control are crucial for ensuring delivery to end customers with minimal delays and disruptions while avoiding unnecessary costs and maintaining business continuity. To implement adaptation-based management principles, real-time adjustment of production scheduling, inventory management, and delivery planning is required, and the system's control parameters must be dynamically adjusted considering dynamics, non-stationarity, and uncertainty to achieve cost minimization, profit maximization, meeting target service levels, or other quantifiable objectives.

Given the high level of complexity, supply chains are vulnerable to operational failures and disruptions and suboptimal performance due to information mismatches. Notable examples of disruptive phenomena include the bullwhip effect and ripple effect. The bullwhip effect, also widely known as the Forrester effect, can be defined as the amplification of demand variability in production and order quantities when propagated downstream in the supply chain (Xun Wang and Disney 2016). On the other hand, the ripple effect occurs when a disruption is not confined to one part of the supply chain but propagates downstream, impairing the performance of the entire supply chain (Dolgui, Ivanov, and Rozhkov 2019). Both effects ultimately cause overproduction and underproduction cycles, leading to excessive inventory levels, potential stockouts, and suboptimal network performance, posing significant problems for supply chain managers. These issues can be exacerbated when structural and operational vulnerabilities of supply chains are interconnected.

The last decade has shown an increase in data volume and processing capabilities. This trend eventually led to the emergence of deep learning, a machine learning approach that can leverage vast computing resources and utilize massive amounts of data (Bengio 2016). This fact, combined with new algorithmic techniques, mature software packages, and strong business interest, led to deep reinforcement learning (DRL), a promising combination of reinforcement learning and deep learning (Krakovsky 2016). Despite its novelty, DRL has already shown remarkable performance in road traffic navigation (Vinitsky et al. 2020), autonomous driving vehicles (Isele et al. 2018), and robotics (Gu et al. 2017). However, it is important to emphasize that RL agents cannot learn directly in the physical world.

---

### Reinforcement learning

The RL paradigm is driven by the idea that intelligent systems can learn through a similar trial-and-error process. This idea is very powerful when applied to adaptive control of highly complex and dynamic systems such as supply chains (Kegenbekov and Jackson 2021).

#### RL Definition through Markov Decision Process (MDP)

MDP is defined as a framework for goal-oriented learning as $M = (S, A, P(s_{t+1}, r | s, a), R, \gamma)$, where $s$ is the set of possible states of the environment, $a$ is the set of actions the agent interacts with, $P$ is the transition probability, and $\gamma$ is the discount factor that determines the future.

The sequence of states, actions, and rewards generates a trajectory, and the terminal state is represented by $s_n$. The agent's goal is to find an optimal policy $\pi=S*A$ that maps states to actions to maximize cumulative expected returns.

#### MDP Limitations and the Need for DRL

It is worth mentioning that the MDP framework is not perfect. That is, when there is a long trajectory of states and actions before receiving a reward, it is unclear which action contributed to the final reward. Since it is often unclear whether the performed action actually contributed to the obtained reward, the standard solution is to apply $n$-step discounted returns.

Here, the cumulative reward for action $a_t$ over $n$ steps is exponentially weighted by the discount factor $\gamma \in [0,1]$.

The deep part means applying artificial neural networks to estimate possible action sequences and connect them to long-term rewards to increase the manageability of the solution space. Additionally, DRL-based agents do not store all state-value pairs in a table, so they can generalize the values of states they have never seen before, i.e., states not encountered during the training phase.

---

### Framework

#### 1. Supply chain driver

All supply chains aim to maximize the total value created. This is the difference between the value of the final product and the costs incurred in the supply chain (Chopra and Meindl 2013). There is not only one way to achieve this goal, but there are various interconnected supply chain drivers that affect the total value created: facilities, inventory, transportation, information, sourcing, and pricing. This section derives a classification framework for RL models from these drivers. Since RL is commonly used to solve optimization problems, it typically adjusts one or more drivers to improve supply chain performance.

Inventory includes decisions affecting raw materials, work-in-process, and finished goods (e.g., order management and safety stock and cycle stock decisions) (Chopra and Meindl 2013). Inventory management or replenishment is a well-known optimization problem in SCM. It aims to find a balance between material availability and inventory costs, addressing the question of when to order and how much to order. In real supply chains, handling changing demand, unknown lead times, disruptions, and incomplete information are major challenges. RL approaches have the advantage of being able to learn adaptive and context-dependent ordering strategies, unlike traditional inventory models with fixed order quantities, safety stock, and cycle stock.

Transportation includes the movement of inventory from one location to another within the supply chain (Chopra and Meindl 2013). Transportation problems such as the Vehicle Routing Problem or Traveling Salesman Problem are widespread in academia but are not considered only in the SCM context. Transportation problems generally aim to find the shortest or fastest path between multiple nodes. Additionally, these problems can have various constraints such as capacity constraints, time window constraints, or pickup and delivery constraints. Traditionally, vehicle routing problems are solved using computationally intensive constraint optimization, heuristics, or metaheuristics. RL is expected to provide equal or better results with less computation time.

Sourcing deals with the organization of supply chain participants, particularly supplier selection (Cavalcante et al. 2019) and segmentation, and outsourcing and insourcing decisions (Chopra and Meindl 2013). Many models consider both sourcing decisions and inventory decisions to some extent. Therefore, the transition between the two classes is ambiguous, and it is important to distinguish their scope for the classification framework.

#### 2. Algorithm

All RL algorithms can be divided into model-based and model-free based on whether the agent has direct access to the environment model. In this context, the environment model refers to a function that predicts state transitions and rewards. The most famous model-based approach is AlphaZero, a DRL algorithm that was able to master classical board games through self-play (Silver et al. 2017).

A common problem is that agents can discover and exploit model bias, leading to policies that work well in learned models but are not optimal in real environments. This is exactly why model-based approaches are rarely applied when the problem is characterized by stochasticity, long planning horizons, partial observability, and incomplete information. Since all the above characteristics are common in complex supply chains, it is understandable that all reviewed studies utilized model-free RL. Model-free RL is further divided into two main categories: policy optimization and value-based algorithms.

Value-based algorithms derive an approximation $Q_\theta(s, a)$ parameterized by parameters θ that map states to corresponding actions as stored in a table to find the optimal policy $\pi(s)$. This optimization is performed **off-policy**. This means that each update utilizes data collected at any point during training. Consequently, the policy $\pi^*$ is approximated by the optimal action-value function $Q^*(s, a)$, and the agent acts according to $a(s)=\text{argmax}_a Q_{\theta}(s,a)$.

Next, policy optimization algorithms explicitly represent $\pi_\theta(a | s)$. The parameters θ are typically directly optimized through **gradient ascent** on the expected return $J(\pi_\theta)$. This optimization is performed **on-policy**. This means that each policy update is based on data collected while utilizing the latest version of the policy.

---

### Insights

While showing that RL algorithms show great potential in various SCM tasks, our survey concludes that RL research for SCM applications is still in its early stages from a substantial industrial perspective.

In terms of data acquisition, there are almost no publicly available datasets of real industrial supply chains that researchers can use to develop and pilot RL applications, and when deploying RL-trained agents for decision-making in real supply chains, they need continuous real-time access to post-training data, but companies are often reluctant to disclose internal data due to concerns about competitive advantage.

Agent models trained by RL enable real-time data-driven and autonomous decision-making. Therefore, RL enables response to sudden disruptions in supply chains by determining alternative decisions based on the latest information in the supply chain. Second, RL methods can calculate alternative decisions when sudden disruptions occur and adjust control strategies when there are gradual changes in supply chain data. This provides RL as the foundation for developing resilient decision support systems for SCM. Third, RL methods consider human experience when learning decision policies, thus promoting human-centered decision-making. For example, such policies can be achieved by implementing that humans must first verify decisions calculated by agents before they are applied. Confirmation or rejection of decisions can be used as additional rewards and thus as learning signals for agents.

---

### Conclusion

In this paper, we proposed a hierarchical classification framework that classifies RL applications for SCM according to four criteria with multiple classes and subclasses. And we conducted a semi-systematic review to understand algorithms, applications, and actual adoption of RL in SCM. As a result, it shows that RL applications in SCM date back to 2000. Publication trends were steady, but the number of publications increased sharply in 2019, which can be attributed to computing hardware, increasing data volume, and the emergence of deep learning.

---

### References

[Original Source #1](https://www.tandfonline.com/doi/epdf/10.1080/00207543.2022.2140221?needAccess=true)




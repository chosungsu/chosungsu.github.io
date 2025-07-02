---
title: 'Deep Reinforcement Learning for Selection of Dispatch Rules for Scheduling of Production Systems'
date: '2025-01-14'
tags: ['robotics', 'paper review']
---

### Abstract

Production scheduling is a crucial task in manufacturing system management. Due to the complexity of the problem, deriving optimal schedules is difficult, and computationally expensive and time-consuming solutions have caused significant issues for companies in meeting customer demands. Simple dispatch rules have typically been applied in manufacturing sites and serve as good scheduling options, especially for small and medium enterprises (SMEs). However, recent developments in smart systems made possible by artificial intelligence (AI) and machine learning (ML) solutions have revolutionized scheduling approaches.

In various production environments, one dispatch rule may perform better than others, and selecting which rule to use requires expert knowledge. The goal of this research is to design and implement a framework for deep reinforcement learning (DRL) agent modeling and deployment to support short-term production scheduling. The DRL agent selects dispatch rules for assigning tasks to manufacturing resources. This model is trained, tested, and evaluated using a discrete event simulation (DES) model that simulates a pilot case in the bicycle manufacturing industry. The DRL agent can learn the best dispatch policy to generate schedules with the best production completion time (makespan).

---

### Introduction

In the Industry 4.0 era, manufacturing technology is undergoing revolutionary changes, embracing digitalization and intelligent automation, ushering in a new era of interconnected smart production. In the new manufacturing revolution called Industry 4.0, the digitalization of all systems constituting manufacturing systems is a core goal toward smart manufacturing. Information technology is used in various applications including data collection, data management, knowledge development, and sophisticated tasks such as scheduling complex production systems.

Scheduling is crucial for realizing efficient production of high-quality products by connecting customer orders with production capacity. This involves determining the optimal sequence and timing for task processing with available resources, considering complexities such as resource constraints, task characteristics, and the dynamic nature of manufacturing environments, utilizing optimization methods and advanced technologies such as artificial intelligence (AI). Particularly, genetic algorithm-based scheduling approaches have been shown to improve the adaptability of manufacturing workshops through iterative optimization of task sequences.

This research focuses on optimizing production scheduling using deep reinforcement learning (DRL) agents for job shop problems. Trained and tested within a DES (discrete event simulation) model, the DRL agent, specifically designed to simulate a pilot case in the bicycle manufacturing industry, dynamically selects dispatch rules to achieve the best production completion time (makespan).

---

### Literature review

In manufacturing, scheduling refers to the process of arranging, controlling, and optimizing tasks and workloads in production systems. The fundamental goal is to arrange manufacturing activities in a way that minimizes production costs and lead times while achieving quality standards. In industrial settings, dispatch rules are one of the approaches used for scheduling because they are simple to implement and can quickly provide acceptable solutions.

Chryssolouris introduced an integrated simulation-based approach for refinery short-term scheduling that simultaneously manages tank farms, inventory, and distillation processes. Through holistic modeling of interconnected operations, optimized production sequencing, minimized downtime, and overall refinery performance improvement are achieved.

Wei introduced multi-objective genetic algorithms to achieve energy-efficient job shop scheduling. By simultaneously optimizing multiple criteria, energy consumption is reduced and production time is shortened, improving overall operational sustainability.

In practice, most cases experience deviations from initial schedules due to unexpected events such as new tasks or machine failures. In such cases, rescheduling mechanisms are needed. Yan proposed a two-level dynamic scheduling method for minimizing early completion and delays in re-entrant production lines, and enhanced schedule quality was achieved by hierarchizing the decision-making process to better handle complex production flows.

Sutton and Barto stated that the core problem of RL is that no prior knowledge of previously applied schedules is required, and this algorithm is simply defined as the agent learning an optimal or near-optimal policy that maximizes rewards. Zhou et al. proposed an AI scheduler with self-organizing and self-learning capabilities developed through multiple training sessions and composite reward function formulation to enable multi-objective learning for scheduling. As a result of self-learning, the agent showed superior performance compared to the traditional first-in-first-out (FIFO) dispatch rule by completing assigned order lists while minimizing reconfiguration tasks.

Combining reinforcement learning with dispatch rules, a single machine agent using Q-learning was proposed by Wang and Usher. A variant considering continuous state features as input to deep Q-networks (DQN) for approximating state-action value functions was also studied. The agent suggests dispatch rules whenever new tasks arrive and need to be assigned to machines.

Most approaches consider single machines for task assignment or consider task assignment for multiple machines using single dispatch rules with limited performance. For scheduling more complex and realistic production systems, Lin et al. propose multi-class DQN (MDQN) to solve job shop problems using dispatch rules. Therefore, unlike classical DQN, the MDQN proposed by the authors selects multiple output nodes, one for each group. After training, the agent learns how to select the best dispatch rule for each machine. However, this implementation means scheduling only one order at a time, and performance investigation for large-scale problems is needed.

---

### Method

#### 1. Scheduling Problem Formulation

The production scheduling problem under study involves assigning tasks to machines in an order that generates optimal plans according to predefined objectives. In this research, the goal of the scheduling algorithm will be to minimize production completion time (makespan). To model the scheduling problem, parameters of the production system must be defined. Additionally, scheduling parameters and variables are defined as follows.

Product types are denoted as $P$, process plans as $H$, resources as $M$, processing times as $I(M_r, Pr_{ki}) \ge 0$, tasks as $T_b$, jobs as $J_c$, and orders as $O_g$. Constraints include that each machine can perform at most one process at a time and that tasks of specific jobs cannot be processed in other workshops.

#### 2. Reinforcement Learning Approach

To apply the RL approach to the scheduling problem, key concepts must be defined from a scheduling perspective. In the following subsections, MDP, learning algorithms, environment, state, action, and reward are defined.

The RL algorithm proposed in this research is based on Q-learning, which is implemented using deep learning techniques (particularly neural networks). This approach is generally called deep reinforcement learning (DRL). The following section explains the Q-learning method and variations when integrating with deep neural networks.

Q-learning is a fundamental reinforcement learning algorithm in the AI and ML fields, used to solve problems where agents interact with environments to learn optimal policies for sequential decision-making tasks. In reinforcement learning, agents learn to perform a series of decisions (actions) in the environment to maximize cumulative rewards. Q-learning is typically applied to problems modeled as MDPs (Markov Decision Processes), where agents interact with environments consisting of states, actions, transition probabilities, and rewards. The core insight of Q-learning is the Bellman equation, which expresses the relationship between Q-values of current and future states.

$$
Q(s,a)=R(s,a)+\gamma*max_{a'}Q(s', a')
$$

Here, $Q$ is the resulting value for state-action pairs, $R$ is the immediate reward when taking action in a state, and $\gamma$ is the discount factor representing preference for immediate rewards over future rewards. In Q-learning, the Bellman equation is used as an iterative update. After the agent takes action $a_t$, it enters a new state $s_{t+1}$ with transition probability $p(s_{t+1}|s_t, a_t) \in P(S \times A \to S)$ and reward $r_t∈R$. The agent's goal is to find the optimal policy $\pi^*$ that maximizes the expected sum of rewards.

$$
Q^{\pi}(s_t, a_t)=max_{\pi} E \\
[r_{t+1}+\gamma r_{t+2} + \gamma^2 r_{t+3} + ... | s_t=s, a_t=a, \pi]
$$

However, since Q-learning has several limitations as environments become complex, the DQN (Deep Q-Network) concept is used. DQN is an RL algorithm that combines Q-learning with DNN (deep neural networks) to approximate Q-values for high-dimensional state spaces. DQN was proposed by Watkins and Dayan. Mnih et al. combined RL with deep learning techniques, which can be considered as a neural network Q-function approximator with weights. DQN, which integrates deep learning and reinforcement learning, is considered a powerful method in RL.

$$
L_i(\theta_i) = E_{(s,a,r,s') \sim U(D)} \\
[(r+\gamma max_{a'} Q(s',a';\theta_i^-) \\
-Q(s,a;\theta_i))^2]
$$

DQN uses deep convolutional neural networks to approximate values denoted as $Q(s,a;theta_i)$ where $\theta_i$ are the weights at iteration $i$. Experience $e_t = (s_t, a_t, r_t, s_{t+1})$ at each time $t$ is stored in the dataset.

---

### Discussion

The results show that the DRL approach is a good solution for scheduling and shows promising results, outperforming traditional methods. More specifically, the DRL agent can propose schedules that result in 85% shorter completion times compared to other scheduling approaches.

Traditional optimization methods such as genetic algorithms (GAs) are well-known for their ability to handle complex scheduling problems through global search heuristics. However, these methods often require significant computational time and manual parameter tuning, especially in dynamic and uncertain production environments. In contrast, DRL offers several distinct advantages. DRL does not require complete rescheduling from scratch and dynamically adapts to changing workloads and system states, significantly reducing computational time. While these methods require substantial computational resources during training due to their iterative and data-intensive nature, their ability to generalize across diverse scenarios far outweighs the initial cost. Additionally, DRL integrates decision-making flexibility by learning from the environment rather than relying on predefined heuristic rules.

---

### Conclusion

In conclusion, this research successfully introduced and implemented a new approach to production scheduling utilizing DRL agents guided by DNNs. The DRL scheduling agent demonstrated outstanding performance, achieving a remarkable 85% improvement in selecting optimal dispatch rules (SPT, LPT, MTRJ) for each resource in scheduling problem instances. Comparison with traditional rules such as SPT, LPT, MTRJ, and random job selection highlighted the superiority of the DRL agent, especially when applied to real data from the bicycle industry. The development of a DES model reproducing the dynamics of the bicycle industry served as an important training foundation for the DRL agent. The results not only validate the effectiveness of the DRL agent but also emphasize its potential as a valuable tool for improving production scheduling, particularly when combined with established dispatch rules.

While DRL shows significant potential in dynamic scheduling, there are limitations to consider. Training DRL models such as the implemented deep Q-network is computationally intensive and requires substantial time and resources, especially for large-scale or complex production environments. Additionally, the proposed implementation does not fully capture real-world uncertainties such as supply chain disruptions, addition of new products or product variants. Finally, the sensitivity of DRL to hyperparameter tuning and the possibility of suboptimal policies in highly stochastic settings pose challenges requiring careful design and evaluation of reward structures and state-action representations.

In future research, we plan to extend the scope of this study by integrating additional dispatch rules such as FIFO and EDD (Earliest Due Date) into the DRL scheduling agent framework.

---

### References

[Original Source #1](https://www.mdpi.com/2076-3417/15/1/232)




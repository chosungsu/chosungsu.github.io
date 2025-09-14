---
title: 'Fusion Q-Learning Algorithm for Open Shop Scheduling Problem with AGVs'
date: '2025-01-21'
tags: ['robotics', 'paper review']
---

### Abstract

A scheduling problem model for open-shop environments considering AGV (Automated Guided Vehicle) transportation time has been designed to match actual production situations in enterprises. To solve such problems, a Q-learning-based method is proposed. Based on the characteristics of the problem, a hybrid encoding approach combining process encoding and AGV encoding is applied.

The action space is composed of three pairs of actions. By utilizing decay factors and greedy strategies to perturb the decision-making of intelligent agents, it prevents agents from falling into local optima while promoting extensive exploration of the solution space.

---

### Introduction

The Open Shop Scheduling Problem (OSP) belongs to the class of typical NP-hard problems. In contrast to the Job Shop Scheduling Problem (JSP), where job processes follow fixed processing steps, OSP uses non-fixed order processing methodologies to alleviate problems related to fixed job sequences during job processing. This approach enhances the flexibility of manufacturing processes within enterprises, thereby promoting improved machine utilization and overall production efficiency. It is noteworthy that OSP has a larger solution space compared to traditional JSP, offering greater optimization potential.

Currently, makespan minimization is the most widely studied performance evaluation metric in the field of open-shop scheduling. Wan et al. proposed a method to solve open-shop scheduling problems through link prediction using graph convolutional networks. They used disjunctive graphs to represent the state of open-shop scheduling problems and designed scheduling models and algorithms based on graph convolutional networks. Ultimately, they demonstrated that their approach achieved better and more stable experimental results when solving random instances of the problem. Rahimi et al. formulated a no-wait open-shop scheduling problem model considering transportation time with the goal of minimizing makespan. They devised a hybrid simulated annealing metaheuristic algorithm to solve small-scale problem instances. Experimental results indicate significant improvements in the performance of the enhanced approach. Li et al. integrated discounting memory into graph neural network models to address open-shop scheduling problems with the goal of minimizing completion time. They constructed incremental graph representations to transform scheduling problems into sequence problems. In the final experimental results, they demonstrated that their method outperforms traditional approaches and can achieve higher quality solution sets. Gao et al. combined heuristic methods with Q-learning to solve mathematical model problems considering battery capacity and uncertain drawing time with the goal of minimizing makespan.

In recent years, scholars' in-depth research on scheduling problem modeling and optimization has led to the gradual proliferation of scheduling methods in actual application areas within enterprises. AGVs (Automated Guided Vehicles) are increasingly preferred by enterprises as flexible and efficient transportation tools in automated material handling systems, manufacturing workshop systems, and container handling applications. Wu et al. designed an improved narrow-path search method to optimize AGV paths. This method integrates strategies such as parent-node reselection and path pruning, significantly reducing the number of turning points. Li et al. proposed an algorithm combining AGV coordination and harmony search considering the interdependence between workshop CNC machines and AGVs. Experimental verification indicates that this method is effective in reducing waiting time for CNC machines and improving overall production efficiency.

In the context of traditional open-shop scheduling problems, transportation time between machines is often overlooked. Generally, it is assumed that transportation time is negligible and not considered in the scheduling process. However, this assumption differs significantly from reality, and AGV transportation time has undeniable impacts on actual scheduling solutions. Therefore, the open-shop scheduling problem considering AGV transportation time is an extension of traditional open-shop scheduling problems.

Currently, reinforcement learning is mainly applied to job shop scheduling problems, with limited application to open-shop scheduling problems considering AGV transportation time. Yang et al. integrated deep reinforcement learning with graph neural networks to build an agent model that transforms the state of job shop scheduling problems into scheduling rules using disjunctive graph representations. They applied this approach to solve job shop problems with the goal of minimizing completion time, demonstrating the validity of the method. Park et al. combined reinforcement learning with graph neural networks to solve job shop scheduling problems. They trained the algorithm using proximity-based strategy optimization methods and experimentally demonstrated that the proposed method shows high generalization ability and fast solution efficiency.

Therefore, this research aims to extend the application of Q-learning, a reinforcement learning method, to address open-shop scheduling problems considering AGV transportation time. The potential benefits of the proposed method include various contributions as follows. First, by applying Q-learning, a reinforcement learning method, to open-shop scheduling problems considering AGV transportation time, it expands the applicability of the method to broader domains. Second, this method introduces a hybrid encoding approach that enables intelligent agents to continuously explore the environment and obtain optimal target solution sets. This encoding approach improves the adaptability of algorithms for complex problems. Third, the research objectives include comprehensive consideration of energy consumption indicators for AGV transportation time and load under various scenarios, along with job completion time. This approach makes the method closer to actual production requirements. Fourth, the evaluation of Q-learning under various weights investigates algorithm performance under different conditions, improving the flexibility and applicability of the method.

---

### Problem description

The open-shop scheduling problem considering AGV transportation time is characterized by processing $i$ jobs on $M$ machines, where each job consists of $j$ operations. Within a specific time, each machine can process only one job, and each job can be processed by only one machine. In open-shop scheduling problems, the processing and transportation of jobs between different machines requires the support of $V$ AGVs, presenting specific operational scenarios. At the start of the processing cycle, both jobs and AGVs are initially placed in the inspection area, assuming they have already undergone incoming inspection and are ready for processing. When all job processing is completed, AGVs are considered to be automatically placed near the machine where the last job was performed. This problem considers various temporal factors including the time required for job transportation between the inspection area and machines, the time it takes for AGVs to transport jobs between different machines, and AGVs proactively moving in anticipation of job completion for subsequent transportation.

In the AGV transportation process, considering energy consumption in both empty and loaded states, as well as weighting completion time, the final objective function is expressed by the following formula:

$$
F=min(\alpha*C_{max}+(1-\alpha)*EC), \\
EC=EC_f+EC_k, \\
EC_f=PL(\sum t_f^{AGV1} (m_1, m_2)+ \\ \sum t_f^{AGV2}(m_3, m_4)), \\
EC_k=PL(\sum t_k^{AGV1} (m_1, m_2)+ \\ \sum t_k^{AGV2}(m_3, m_4))
$$

where $\alpha$ is the weight, $C_{max}$ is related to makespan minimization, and EC represents energy consumption.

---

### Algorithm

<img src="https://velog.velcdn.com/images/devjo/post/e348ce5d-1393-4885-a895-ea38be5247b0/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Q-learning is a reinforcement learning method based on value functions. It can learn from data generated in scheduling systems according to various strategies and apply this knowledge to train models during the solution process, improving the training results of scheduling systems. The Q-value update calculation is represented by the following formula:

$$
Q(s,a)' \leftarrow Q(s,a) + \alpha[r+\gamma max_a maxQ(s',a)-Q(s,a)]
$$

In the process of solving open-shop scheduling problems considering AGV transportation time using Q-learning, the core of Q-learning is to build a Q-table during the training process to store calculated Q-values. The Q-table is used to store Q-values for different actions corresponding to each state, thus playing an important role in Q-learning.

The specific iterative process of the Q-learning strategy is as follows. First, initialize the number of workpieces to be read and the number of processing machines. Set gamma to 0.75, learning rate to 0.0001, epochs to 300, and step size to 500. Then enter the training and solving process of the model. Subsequently, the intelligent agent randomly selects actions according to the greedy policy and enters a new state after action completion. In the new state after taking an action, the agent examines all actions in the new state, selects the action with the maximum Q value, and then chooses that action. After completing all calculations using the above formula, the Q value of the current action is updated. After the update, the intelligent agent continues to explore the new state and repeats the above process.

For the characteristics of open-shop scheduling problems considering AGV transportation time, a two-dimensional hybrid encoding combining process encoding and AGV sequence encoding is used. The first dimension represents process encoding, consisting of randomly ordered non-repeating integers from 1 to $i*j$, where $1, 2, ..., j$ represent different processing operations of job 1, $j+1, j+2, ..., j+j$ represent different processing operations of job 2, and so on. AGV sequence encoding consists of $3*3$ instances of 1 or 2 (assuming $V$ is 2).

Rewards play an important role in the interaction between intelligent agents and the environment, serving as feedback information that intelligent agents receive from the environment. Therefore, to better balance the relationship between production efficiency and logistics efficiency in the learning and behavior of intelligent agents, the design includes machine utilization and AGV effective payload rate as weighting factors for rewards obtained after interaction between intelligent agents and the environment.

---

### Conclusion

In addressing the open-shop scheduling problem model considering AGV transportation time, makespan minimization and energy consumption minimization were used as influential factors in the objective function. A hybrid encoding approach composed of process encoding and AGV encoding was devised to provide intelligent agents with more exploration opportunities within the solution space and enable them to accumulate significant reward values.

Experimental comparisons were conducted using Taillard benchmark test cases and literature, with GA, SA, and PSO designed as control groups. Results showed an average improvement of 88.81% compared to the NSMGA algorithm.

---

### References

[Original Source #1](https://www.mdpi.com/2227-7390/12/3/452)




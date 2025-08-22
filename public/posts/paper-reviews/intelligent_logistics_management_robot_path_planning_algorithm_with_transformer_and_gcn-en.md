---
title: 'Intelligent logistics management robot path planning algorithm
integrating transformer and GCN network'
date: '2025-02-18'
tags: ['robotics', 'paper review']
---

### Abstract

This study deeply explores robot path optimization for smart logistics by utilizing the fusion of Graph Neural Networks (GNN) and Generative Adversarial Networks (GAN).

This approach addresses both spatial and resource constraints to improve path efficiency by utilizing graph-based representations that include geographical data, cargo allocation, and robot dynamics. Through extensive testing using real logistics datasets, the proposed method achieves remarkable improvements including 15% reduction in travel distance, 20% improvement in time efficiency, and 10% reduction in energy consumption.

---

### Introduction

In today's rapidly developing intelligent era, robots are playing an increasingly important role in various domains. Behind all these developments lies robot path planning technology, which is a core element of robot operation. The goal of robot path planning is to determine feasible paths that allow robots to move from a starting point to a specified target within a given environment while complying with a series of constraints such as collision avoidance, cost minimization, and safety maximization. Particularly in complex and dynamic environments, the quality of path planning significantly impacts the efficiency and success rate of robot tasks.

In the context of intelligent logistics management, efficiently mapping paths for robots to facilitate rapid cargo transportation in complex warehouse environments has emerged as an important challenge (Saunderson & Nejat, 2019). Simultaneously, in the autonomous driving domain, ensuring safe navigation of autonomous vehicles in busy urban streets and dynamically adjusting paths according to traffic conditions has become an important research focus (Singandhupe & La, 2019; Wang et al., 2024; Zou et al., 2024).

The importance of this study lies in exploring new methods for intelligent multimodal robot path planning in the logistics field to improve overall path planning performance. First, the fusion and processing of multimodal data must address issues related to modeling relationships between various data types, managing data inconsistencies and noise. Second, modeling and optimizing path planning in complex environments requires considering various factors such as terrain, traffic, cargo distribution, and robot capabilities.

Graph search-based methods are widely used for path planning in static environments (Ma, 2022). The Dijkstra algorithm determines shortest paths to find path planning solutions, and the $A^*$ algorithm can efficiently explore the search process with the help of heuristic functions. However, in large-scale environments, computational complexity can be high, and handling dynamic changes can be challenging. For dynamic environments and real-time responsiveness, heuristic search algorithms provide solutions (Li et al., 2021). Therefore, in high-dimensional or complex environments, sampling-based algorithms become powerful choices (Guo et al., 2020). For example, the RRT (Rapidly-exploring Random Trees) algorithm continuously expands tree branches to generate paths.

---

### Related work

#### 1. Traditional path algorithm

Traditional methods such as heuristic algorithms that find optimal paths by mimicking ant foraging behavior have been widely applied to various systems. While these methods are effective at optimizing paths in static environments, they still face major challenges in terms of computational complexity and real-time performance when dealing with large-scale dynamic environments, which limits their practical applicability.

#### 2. Multi constraint optimization

Some studies have attempted to improve path planning performance through multi-constraint optimization techniques using linear programming, nonlinear programming, or adaptive clustering methods. Researchers can generate paths suitable for multiple tasks or various resource requirements in heterogeneous systems. While these methods perform well in multi-objective optimization tasks such as minimizing path length or energy consumption, they still struggle with issues such as insufficient adaptability and delayed path adjustments when facing rapidly changing environments and uncertainties.

#### 3. Reinforcement learning

Multi-Agent Reinforcement Learning (MARL) algorithms have been applied to coordinate multiple agents in various tasks and optimize the path planning process through cooperation and interaction between agents. While reinforcement learning can effectively handle dynamic environments and multi-task decision-making problems, training time and computational costs remain high, especially in large-scale systems. Additionally, reinforcement learning methods still lack the ability to perform global optimization and long-term planning of paths, making it difficult to ensure optimal path generation in complex tasks.

---

### Methodology

#### 1. Transformer

<img src="https://velog.velcdn.com/images/devjo/post/8618d2db-afd2-4ac0-b3fd-c4c6e838e9ad/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

We select the Transformer model for multi-robot cooperative path planning due to its remarkable advantages including global information processing, multimodal data adaptability, scalability, and learning capabilities. These characteristics make the Transformer model a powerful tool for solving complex multi-robot path planning tasks, thereby improving the efficiency and quality of path planning efforts.

$$
\text{Attention(Q,K,V)}=\text{softmax} (\frac{QK^T}{\sqrt{d_k}})V
$$

In the self-attention equation, $Q, K, V$ represent query, key, and value matrices respectively. These are obtained through linear transformations of the input sequence. The $d_k$ dimension corresponds to the dimension of the key vector, and normalization with softmax ensures that the sum of each row equals 1. To enhance the model's expressive power, the Transformer model uses a multi-head attention mechanism.

First, the Transformer model boasts excellent global information processing capabilities when processing sequence data. In multi-robot cooperative path planning, different robots require coordination and consideration of information across the entire environment to mitigate conflicts and optimize paths. The Transformer model skillfully captures global dependencies through the self-attention mechanism, which is an important aspect for understanding the overall environment.

Second, multimodal robot path planning involves integrating various data types such as map information, cargo distribution, and robot states. The Transformer model serves as a flexible framework that seamlessly integrates and processes diverse data types. This multimodal capability gives it an advantageous position in multi-robot path planning scenarios. Additionally, the Transformer model's architecture is highly scalable, accommodating problems of various sizes and complexities. In multi-robot cooperative path planning, the scale and complexity of problems can vary greatly, and the Transformer model can expand or contract as needed to adapt to various situations.

Finally, the Transformer model demonstrates powerful learning capabilities by autonomously extracting features and patterns from data without manual feature engineering. This characteristic is very useful for multi-robot path planning tasks where environments are often complex and conditions can change. The Transformer model skillfully adapts by learning optimal paths in response to evolving situations.

#### 2. GNN

<img src="https://velog.velcdn.com/images/devjo/post/aaa4afce-5dcb-4fda-a762-a650d49ed4ab/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Graph Neural Networks (GNN) have been introduced as powerful tools for handling data containing topological structure information. Being adept at capturing relationships between nodes, they are very useful for solving robot path planning problems. The fundamental idea of GNN is that each node updates its state based on its own features and those of neighboring nodes. Then, it outputs its representation using its own state and global information. GNNs can handle various types and scales of graph data including undirected graphs, directed graphs, weighted graphs, and heterogeneous graphs.

$$
h_v^k=\text{UPDATE}^{k}(h_v^{k-1}, \text{AGG}^k(\{h_u^{k-1}|u \in N(v)\})), \\
o_v=\text{READOUT}^{K}(h_v^{K}, h_G)
$$

In the above equation, $h_v^{(k)}$ is the state vector of node $v$ at layer $k$. $o_v$ is the final output vector of node $v$. And $h_G$ represents the global information vector of the entire graph.

Specifically, in this paper, we integrate map information, cargo distribution, and robot states as node features within the constructed graph. Then, the adjacency matrix is derived based on adjacency and distance relationships between grid cells, generating an undirected weighted graph representation.

#### 3. GAN

<img src="https://velog.velcdn.com/images/devjo/post/4bc76d47-ae05-4c57-a5df-5c48ca9fcdbd/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

We studied utilizing Generative Adversarial Networks (GAN) for path planning tasks, enabling the generator to generate new path candidates and improve path quality through adversarial training with the discriminator. Specifically, in this paper, we use map information, obstacle data, target coordinates, and robot states as input sequences, while the predicted path serves as the output sequence. We integrate conditional GAN, a GAN variant that can generate corresponding data samples based on given conditional information. We use Recurrent Neural Networks (RNN) as the basic structure and cross-entropy as the loss function to quantify the difference between generated paths and actual paths.

---

### Experiment

The Warehouse Robot Navigation Dataset is a graphic framework designed for single camera-based warehouse robot navigation research. This dataset, created and distributed by the Institute for Robotics and Embedded Systems at the Technical University of Munich, Germany, includes video sequences collected in various warehouse scenarios along with corresponding pose information and obstacle annotations. This dataset serves the purpose of evaluating and comparing various warehouse robot navigation algorithms, improving the performance and robustness of warehouse robot navigation.

The Multi-Agent Path Finding Dataset serves the role of testing and comparing various multi-agent pathfinding algorithms. Multi-agent pathfinding problems involve planning paths for multiple agents to reach their respective target locations while avoiding collisions with each other. Maps are composed of grids, where each grid cell can be passable or impassable. The dataset integrates various map styles and difficulties such as mazes, warehouses, and cities. Each map contains a collection of 25(x2) problem cases, totaling 50 cases.

$$
\text{Path length}=\sum_{i=1}^{n-1} \text{Distance}(P_i, P_{i+1}), \\
\text{Time efficiency}=\frac{T_{plan}}{T_{opt}}*100, \\
\text{Energy}=P*T_{plan}
$$

In this paper, we used path length, time efficiency, and energy consumption as evaluation factors. Based on the above equation, in path length, $n$ is the number of nodes in the path, and $P_i, P_{i+1}$ represent two adjacent nodes. Higher time efficiency indicates the ability for rapid path planning.

By utilizing the composite network structure designed in this paper, the graph neural network captures global environmental information to guide path exploration, while simultaneously using adversarial networks to improve path diversity and generate concise paths that meet actual constraints. The results provided effective and reliable solutions in each dataset, achieving on average over 38% reduction in path length, over 7% reduction in time efficiency, and over 30% reduction in energy consumption.

---

### Conclusion

This study focuses on intelligent multimodal robot logistics path planning, integrating cutting-edge technologies such as Transformer models, GNN, and GAN to optimize efficiency in complex logistics environments. Through comprehensive experiments, this method demonstrates consistently excellent performance in key metrics such as path length, time efficiency, and energy consumption, proving significant improvements.

Despite achieving a series of important results, the following limitations exist. First, this research requires additional improvements in specific extreme environments to enhance the method's adaptability. Second, while the proposed method shows excellent performance in path planning, there may be optimization opportunities in specific scenarios that require additional experimentation and validation.

---

### References

[Original Source #1](https://arxiv.org/pdf/2501.02749?)




---
title: 'Path Planning Techniques for Real-Time Multi-Robot Systems:
A Systematic Review
in Smart Environments'
date: '2024-09-20'
tags: ['robotics', 'paper review']
---

### Abstract

Extensive research has been conducted on path planning over several decades due to the complexity of achieving optimal solutions. This paper reviews multi-robot path planning approaches and presents path planning algorithms for various types of robots.

Multi-robot path planning approaches were classified into deterministic approaches, artificial intelligence (AI)-based approaches, and hybrid approaches. Among these, bio-inspired techniques are the most widely used approach, while artificial intelligence approaches have received increasing attention recently.

However, multi-robot systems face well-known challenges such as the number of robots in the system, energy efficiency, fault tolerance and robustness, and dynamic goals. Deploying systems with multiple interacting robots provides numerous advantages.

---

### Introduction

In recent years, the demand for robots has increased significantly, with widespread applications across various fields and industries. Multi-robot systems have demonstrated their effectiveness in diverse scenarios and applications, showing distinct advantages arising from coordinated interactions among multiple robots. The importance of multi-robot systems has grown considerably, particularly in fields such as manufacturing, transportation, healthcare, agriculture, logistics, and construction.

Deploying systems involving multiple collaborative robots provides various benefits. These systems enhance efficiency and capabilities for tasks that may be difficult or impossible for a single robot to perform. For example, search and rescue operations can be optimized with robot teams that can cover larger areas more quickly and efficiently than individual robots. Additionally, in multi-robot systems, the risk of mission failure due to malfunction of a single robot is significantly reduced. Other robots can seamlessly continue the work, improving the overall resilience of the system.

Despite numerous advantages, multi-robot systems face specific limitations and drawbacks that must be considered. Coordination complexity poses significant challenges, especially in dynamic environments where communication and collaboration algorithms must cope with uncertainty. Furthermore, communication and sensing limitations can hinder performance, particularly in environments with obstacles or interference, requiring robust solutions to ensure stable information exchange among robots. Moreover, resource constraints such as limited energy and processing capabilities restrict the complexity of tasks that can be performed, demanding efficient resource management strategies. Ensuring robustness and fault tolerance is crucial, as failure of individual robots can jeopardize overall system performance.

Multi-robot systems can be configured as homogeneous or heterogeneous systems. The main difference between these two types of systems lies in the capabilities and functions of the robots constituting the system. Homogeneous systems consist of identical robots all equipped to perform the same tasks, while heterogeneous systems consist of robots each with unique capabilities and functions. Homogeneous systems are typically used in applications requiring many simple tasks to be performed simultaneously, such as search and rescue, surveillance, and mapping. In contrast, heterogeneous systems are commonly used in applications requiring diverse tasks to be performed, such as construction, exploration, and transportation. Heterogeneous systems can also be used to overcome limitations of homogeneous systems, such as lack of redundancy or ability to adapt to changing environments. Additionally, homogeneous systems are relatively easier to design and control compared to heterogeneous systems. However, heterogeneous systems have the potential for much higher flexibility and adaptability.

This study aims to classify path planning methods according to various criteria including obstacles, destinations, communication, shortest time, and shortest path. We will evaluate the types of obstacles encountered during path planning by distinguishing them into static, dynamic, and obstacle-free scenarios. Furthermore, the study will analyze whether destinations change or maintain consistency with starting points, and whether destinations are static or can be modified. Another important factor to consider is whether communication capabilities exist throughout the entire path planning phase. Additionally, this document will investigate whether the goal is to identify the shortest time to destination or the most direct path. By organizing path planning strategies according to these parameters, this study aims to provide thorough insights into various methodologies used in different situations, helping to select the most suitable technique for specific application requirements.

---

### Classification

Path planning approaches can be broadly classified into three categories. Deterministic approaches include traditional algorithms that rely on predefined rules and mathematical models. In contrast, AI-based methods are techniques that include human-like intelligence in problem-solving and the ability to learn from data or experience. Examples of AI-based algorithms include artificial neural networks, reinforcement learning, and bio-inspired algorithms. Finally, hybrid approaches combine elements of deterministic and AI-based techniques to leverage the strengths of each. Generally, the core of hybrid techniques is deterministic technology, and AI approaches are integrated to perform adaptive tuning of some parameters of the deterministic model.

#### 1. Deterministic Approaches

Before the emergence of artificial intelligence (AI) methodologies, traditional path planning strategies were widely adopted for robot exploration. These traditional techniques involved using mathematical models and algorithms to plan robot movement from one point to another. Deterministic path planning algorithms provide globally optimal paths and are easy to implement, but they struggle with handling dynamic and unpredictable environments and can be computationally expensive. Additionally, these approaches may have difficulty quickly adapting to unexpected obstacles or environmental changes. Therefore, these algorithms are not commonly used in real-time implementations.

$\rightarrow$ 1-1. Cell Decomposition Methods

<img src="https://velog.velcdn.com/images/devjo/post/6e25f24e-f399-4cd1-a115-b64e690afabc/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Cell decomposition techniques divide the environment into geometric primitive elements (cells) such as polygons, rectangles, and trapezoids. Each cell corresponds to a distinct area that the robot can explore or occupy. Grid-based techniques are an example of cell decomposition techniques where cells are uniform squares forming a grid on the map. These algorithms are suitable for scenarios where the environment can be discretized and represented as a grid, such as indoor environments or structured outdoor spaces.

Grid-based algorithms offer several advantages including simplicity, efficiency, and global optimality. They are easy to implement and provide globally optimal paths, ensuring that robots reach their destination using the shortest path. Additionally, grid-based algorithms can handle dynamic environments by updating the grid as the robot explores. However, these algorithms have limitations. They are not suitable for continuous environments or environments with complex obstacles that cannot be easily represented as grids. Moreover, grid resolution affects the trade-off between accuracy and computational efficiency, as finer grids increase precision but require more computational resources.

The A* algorithm is a highly preferred path planning method that effectively identifies the shortest path between two points in a graph or grid. Unlike the Dijkstra algorithm, which requires exhaustive search of the entire graph, the A* algorithm excels in scenarios involving extensive environments. The Theta* algorithm allows a node's parent to be any other node, not limited to adjacent nodes, if there is a direct arc connection.

$\rightarrow$ 1-2. Artificial Potential Field Methods

<img src="https://velog.velcdn.com/images/devjo/post/750574bb-5586-4e3e-b57b-c28aceb605cc/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Artificial Potential Field (APF) algorithms are fundamental path planning approaches that model virtual forces within a potential field to guide robot movement. This algorithm generates forces that attract toward goals and repel from obstacles, making it suitable for environments where obstacles can be identified. The main strength of the APF approach is efficiency, achieving desired paths with less computational effort compared to cell decomposition techniques or sampling-based techniques. Additionally, the ability to update forces in real-time and adapt to changes in dynamic environments enables generation of smooth and direct paths toward goals. Nevertheless, APF methods face issues such as the risk of getting trapped in local minima or maxima within the potential field. Fine-tuning parameters of the potential field to optimally navigate obstacles and efficiently reach goals can also be challenging.

$\rightarrow$ 1-3. Sampling Based Techniques

<img src="https://velog.velcdn.com/images/devjo/post/038d9f4f-52e5-47f5-9857-5ae386d261c2/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Sampling-based methods constitute a category of traditional path planning algorithms that utilize random sampling as a means to explore and navigate the environment. This technique generates a series of points or samples within the environment and connects them to form a graph or tree structure. Sampling-based techniques are particularly useful when the environment is complex, continuous, or has high-dimensional state spaces.

RRT (Rapidly Exploring Random Tree) and PRM (Probabilistic Roadmap) algorithms are popular path planning algorithms that aim to sample the environment while considering start and end positions. The RRT (Rapidly Exploring Random Tree) algorithm randomly samples points within the configuration space to progressively form a tree-like framework and integrates these points into the growing tree.

#### 2. AI based Approaches

$\rightarrow$ 2-1. Artificial Neural Network

Artificial Neural Networks (ANN) are machine learning approaches that utilize neural networks to determine optimal robot paths. Some valuable features of ANN-based systems in the field of mobile robot navigation include generalization ability, distributed representation, massive parallel processing, fault tolerance, and learning capability. However, ANN-based techniques have drawbacks such as being time-consuming and learning methods not guaranteeing convergence to optimal solutions.

$\rightarrow$ 2-2. Reinforcement Learning

Reinforcement Learning (RL) is a method utilized in path planning that enables agents to make sequential decisions with the goal of optimizing total rewards. Within RL-based path planning, agents interact with the surrounding environment, receive feedback through rewards, and modify their behavior accordingly. RL is particularly useful in situations involving uncertain, complex, or evolving environments, promoting development of optimal strategies for agents through exploration and exploitation. However, RL also has limitations. It often requires substantial amounts of training time and computational resources. The quality of solutions heavily depends on reward design and exploration strategies. Additionally, RL can suffer from sample inefficiency and cannot guarantee optimal performance in all scenarios.

#### 3. Hybrid Approaches

To overcome limitations of individual approaches, strengths of various algorithms are integrated. The advantage of hybrid path planning techniques lies in their ability to handle complex and dynamic environments more effectively. By leveraging complementary strengths of different methods, more robust and adaptive solutions can be provided.

---

### Results and discussion

We reviewed over 40 studies focused on path planning within multi-robot systems. The increasing interest in multi-robot system path planning stems from its complex yet attractive characteristics, offering extensive opportunities that can transform numerous fields.

APF (Artificial Potential Field) algorithms showed superior performance compared to existing A*, RRT, and GA (Genetic Algorithm) algorithms in performance measurement parameters of path length and travel time. On average, DQN achieved path lengths to goals similar to the A* algorithm while showing the shortest computation time.

Regarding scalability issues, to improve the scalability of path planning algorithms for larger robot populations, strategies and methodologies that can efficiently handle increasing computational complexity and coordination problems must be adopted.

---

### Conclusion

This paper presents a systematic review of the latest path planning techniques proposed for multi-robot systems published between 2018 and 2023. It highlights the lack of proposed heterogeneous systems and dynamic goal path planning approaches for robot systems. Addressing these research gaps in the field of path planning for multi-robot systems is crucial for future development and enhancement.

---

### References

[Original Path #1](https://www.mdpi.com/2079-9292/13/12/2239)

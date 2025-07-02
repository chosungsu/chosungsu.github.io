---
title: 'An Optimization Framework for Allocating and Scheduling Multiple Tasks of Multiple Logistics Robots'
date: '2025-06-09'
tags: ['robotics', 'paper review']
---

### Abstract

This study addresses the Multi-Robot Task Allocation (MRTA) problem for logistics robots operating in zone-picking warehouse environments. Due to the rapid growth of e-commerce and the Fourth Industrial Revolution, logistics robots are increasingly being deployed for managing bulk order processing. However, efficiently allocating tasks to multiple robots is a complex and computationally intensive problem.

To solve this problem, this study proposes a 5-stage optimization framework that reduces computation time while maintaining practical applicability.

- Uses the A* algorithm to calculate and store distances and paths between product locations, allowing reuse in subsequent calculations.

- Applies hierarchical clustering to orders based on spatial similarity and capacity constraints to reduce problem size.

- Formulates the Traveling Salesman Problem (TSP) to determine optimal execution order within each cluster.

- Uses a Mixed Integer Linear Programming (MILP) model to allocate clusters to robots while minimizing total task completion time (makespan).

- Optimizes task order and partial charging schedules for each robot to integrate battery constraints.

Numerical experiments were conducted with up to 1,000 orders and 100 robots, confirming that the proposed method is scalable and effective for large-scale scenarios.

---

### Introduction

#### 1. Logistics Robot Trends

The rapid development of information and communication technology, widespread use of the internet and mobile devices, and the impact of the COVID-19 pandemic have significantly increased e-commerce transaction volume and delivery volume. In response, the logistics industry is evolving through the introduction of Fourth Industrial Revolution technologies such as artificial intelligence (AI), the Internet of Things (IoT), and big data. These changes represent a transition from offline-centered commerce to online models (O2O, Online to Offline), from bulk transportation to customized logistics, and the expansion and digitalization of logistics warehouses and systems, known as Logistics 4.0.

The logistics robot industry is simultaneously expanding due to factors such as labor shortages caused by low birth rates and aging populations, rising labor costs, and increasing concerns about worker safety. Logistics robots automate tasks such as transportation, sorting, and loading in logistics centers and factories by integrating environmental perception, autonomous navigation, and IoT-based scheduling technologies. These robots are being actively introduced to improve operational efficiency. Major companies such as Amazon and Alibaba have already deployed large-scale robot fleets to automate warehouse operations. In Korea, in 2023, over 1,000 logistics robots were deployed at Coupang's logistics center to handle product transportation and sorting. Large-scale smart factories and logistics hubs now operate multiple logistics robots simultaneously to manage bulk tasks.

Additionally, the increasing adoption of Robot-as-a-Service (RaaS) models is lowering entry barriers for small and medium enterprises (SMEs) by minimizing initial investment costs and providing scalable automation solutions. These trends are expected to accelerate market growth.

Order picking, which involves retrieving inventory items to process customer orders, remains the most labor-intensive and costly operation in logistics centers. During this process, workers spend considerable time moving between items, which is promoting the implementation of automation systems where robots handle transportation tasks and workers maintain stationary positions. This reduces unnecessary movement, increases picking efficiency, and improves working conditions. Accordingly, this study focuses on control system technologies related to path planning, task allocation, and charging operations of logistics robots.

#### 2. Introduction to Logistics Robots and Control Systems

Logistics robots can be broadly classified into Automated Guided Vehicles (AGVs) and Autonomous Mobile Robots (AMRs) according to their navigation methods. AGVs move along predefined paths marked by QR codes or barcodes installed on the floor or ceiling of logistics centers. These guide markers form a grid map of the facility, and AGVs follow designated paths between grid points. Since paths are pre-assigned, AGVs can move at high speeds. However, they cannot deviate from designated paths. AGVs generally provide higher payload capacity than AMRs and show excellent positioning accuracy due to guided operation. For these reasons, AGVs are commonly used in large-scale factories and distribution centers that handle various products in bulk.

In contrast, AMRs use sensors and cameras to perceive their surrounding environment and navigate autonomously without relying on predefined guide paths. This allows them to avoid obstacles and respond flexibly to environmental changes. Compared to AGVs, they require more time for navigation and traditionally have lower speed and payload capacity, but recent technological advances are reducing these gaps. AMRs are being increasingly adopted because they require no infrastructure installation and provide high flexibility. They are particularly suitable for work environments where robot movement paths frequently change or where physical guide infrastructure installation is difficult, such as small warehouses. Additionally, AMRs are also used in wide work spaces. As intelligent logistics systems requiring customization and inventory optimization become more complex, automation using flexible AMRs is considered a cost-effective medium to long-term solution.

To efficiently operate multiple logistics robots, an integrated AGV/AMR Control System (ACS) is used. In the framework proposed in this study, the ACS receives order-related data such as item types, quantities, and storage locations from the WMS, and receives comprehensive operational information such as inventory levels and order priorities from the ERP system. These higher-level systems do not determine work sequences or allocate robots. Rather, they serve as data sources for the optimization process. The proposed framework independently performs clustering, sequencing, robot allocation, and charging-aware scheduling based on these inputs.

#### 3. Introduction to Order Picking and Its Methods

Order picking refers to the process of retrieving products from storage locations according to customer orders. This involves identifying and finding items based on order details such as quantity, type, and specific customer requirements. Order picking is the most labor-intensive operation in logistics centers and accounts for more than 50% of total operating costs. Therefore, improving picking productivity has been considered a core priority for reducing logistics costs and improving overall efficiency.

Order picking productivity can be improved in several ways: reducing lead times through faster processing and reduced movement distances, improving order accuracy through error minimization, optimizing inventory levels to prevent shortages and excess inventory through integration with warehouse management systems and demand forecasting, and adopting flexible operational strategies to cope with demand fluctuations. It is also essential to select appropriate picking methods according to warehouse layout, product diversity and quantity, and order frequency.

<img src="https://velog.velcdn.com/images/devjo/post/d6553840-d097-4933-9570-9e8f5becd160/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Generally, picking methods are classified into Goods-to-Person (GTP) and Picker-to-Parts (PTP) approaches. The GTP approach, also called 'parts-to-person', involves products being delivered to stationary workers. In modern automated warehouses, items are stored in mobile racks that are transported to picking stations. A representative example is the Robotic Mobile Fulfillment System (RMFS) used by companies such as Amazon and Coupang. RMFS provides complete automation using robots and offers excellent scalability, enabling flexible warehouse expansion or reconfiguration. It also easily adapts to changing customer orders and product placement patterns due to factors such as seasonality or trends. However, RMFS requires additional infrastructure investment for installing mobile rack movement paths. Additionally, items for a single order may be distributed across multiple shelves, so post-picking tasks such as sorting and packaging are generally required.

The PTP approach, also called 'person-to-parts', is the most traditional form of order picking. Workers physically move to storage locations to collect items. Manual picking provides high operational flexibility and is effective even without digital systems, allowing workers to handle complex scenarios intuitively. However, due to increasing e-commerce demand and declining labor force, this method struggles to meet the speed and responsiveness required in modern logistics.

<img src="https://velog.velcdn.com/images/devjo/post/d9f6ce29-d70c-44ca-bbb7-19d82a66ff7f/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

In zone picking, the warehouse is divided into separate zones, each managed by a dedicated worker. As shown in Figure 3, robots transport products to the corresponding zones according to order information, and assigned workers perform picking only within designated zones. This method reduces costs as it does not require centralized shelf movement infrastructure. Workers in specific zones become familiar with the inventory in that area, leading to faster picking speeds and fewer errors. It also minimizes worker movement, and since items are picked sequentially by order, post-picking sorting is often unnecessary.

In practice, logistics centers frequently adopt hybrid strategies that customize picking methods according to warehouse conditions and operational objectives. The most important goal of all picking methods is to reduce unnecessary movement and maximize picking efficiency.

#### 4. Research Distinctiveness and Purpose

Single Task Robot (ST): Robot performs only one task at a time.

Multi-Task Robot (MT): Robot performs multiple tasks at once.

Single Robot Task (SR): One robot is required to perform the task.

Multi-Robot Task (MR): Two or more robots are required to perform the task.

For processing large quantities of goods, it is important to derive efficient results within a reasonable time. However, the multi-robot task allocation problem is a considerably complex problem (NP-hard), requiring significant time to derive optimal solutions. Therefore, existing research mainly solves the problem through heuristic methods or reinforcement learning. These methods are vulnerable to local optimization and may have unstable optimization results. In the case of reinforcement learning, a Markov Decision Process (MDP) is defined as a probabilistic method to maximize rewards by assigning tasks in real-time, considering dynamic situations such as e-commerce where customer orders arrive in real-time. Therefore, prior information about specific warehouses and environments and large amounts of data for learning are required. On the other hand, it may be difficult to apply in new environments, and there are disadvantages such as requiring much time for data construction or difficulty in interpreting results.

Therefore, this study proposes a 5-stage framework to reduce problem size and search scope, shorten computation time, and derive efficient results for the multi-robot task allocation problem.

---

### Literature review

#### Multi-Robot Task Allocation in Distribution Centers

As logistics centers expand, the Multi-Robot Task Allocation (MRTA) problem has become an increasingly important and widely researched topic. Yuan et al. formulated a model for evaluating time and cost when processing orders considering task correlations within Robotic Mobile Fulfillment Systems (RMFS). They ensured that tasks located on the same shelf are assigned to a single robot and balanced the workload between picking stations to minimize total task completion time. Agrawal et al. proposed an MDP (Markov Decision Process) based model for minimizing movement delays in warehouse environments. They solved the task allocation problem using a new deep multi-agent reinforcement learning architecture inspired by attention mechanisms.

Seo developed a multi-depot Traveling Salesman Problem (TSP) based task allocation method that uses the A* algorithm to evaluate movement costs between waypoints and applies Independent Deep Q-Network (IDQN) for collision-free path planning in dynamic multi-robot warehouse environments. Yuan et al. proposed an improved algorithm using shared utility selection and priority sampling to enhance DQN-based task allocation by accelerating convergence.

#### Multi-Robot Task Allocation in Various Environments

Beyond warehouse environments, MRTA problems have also been extensively researched in dynamic, uncertain, and high-risk environments. Martin et al. proposed a cooperative game theory-based approach for clustering tasks and deploying robots considering parameters such as distance between randomly placed tasks and robots, battery levels, task priorities, and time windows. The goal was to improve thermal power plant performance through optimized solar irradiance measurement. Tihanyi et al. formulated an MDP for task allocation under probabilistically evolving risks (e.g., obstacles, fires, toxic contamination) in uncertain environments and addressed risk propagation over time. Paul et al. introduced a graph-based reinforcement learning framework using Capsule Attention Mechanism (CapAM) for MRTA including fixed deadline tasks and limited robot capacity. Park et al. proposed a new MDP formulation to solve scalability issues when the number of robots or tasks increases. They introduced a deep reinforcement learning algorithm using cross-attention mechanisms for modeling robot interactions and calculating task preferences. Hong et al. introduced a Q-learning based path allocation algorithm for vehicle scheduling of overhead hoist transport systems used in semiconductor wafer manufacturing.

---

### Framework

#### Problem Definition

This study is based on a zone-picking logistics center environment. The logistics center is modeled as a 60x60 grid, and logistics robots use QR codes embedded in each grid cell to identify their location in real-time. Each grid cell is large enough to accommodate multiple robots, so collisions and congestion are not considered. Robots move at constant speed without acceleration or deceleration from starting or stopping. Battery consumption is assumed to be proportional to movement distance, and each robot starts with fully charged battery before task allocation. This model excludes changes in worker quantity and efficiency in storage areas. It is assumed that all tasks in a given area can be processed simultaneously regardless of concentration. Since there is no publicly available benchmark data for MRTA in zone-picking settings, experimental orders were randomly generated. Each order contains 1-8 subtasks representing individual product units defined by location. Each task also includes related picking time and capacity constraints, and all tasks are generated around storage locations. This section demonstrates the proposed framework using 50 orders and 3 robots as an example.

1. Distance and Path Calculation: Efficiently calculate distances and movement paths between products using the A* algorithm

2. Order Clustering: Apply hierarchical clustering algorithm considering both distance between order centroids and robot capacity constraints

3. Task Sequencing within Clusters: Formulate a Mixed Integer Linear Programming (MILP) model based on the Traveling Salesman Problem (TSP) within each cluster

4. Robot-level Task Allocation: Allocate tasks to individual robots based on optimal execution time (obtained from TSP results)

5. Charging-aware Task Scheduling: Adjust task execution order for each robot considering battery remaining levels

#### Path Planning Algorithm

Path planning algorithms have been extensively researched in various fields including robotics, unmanned aerial vehicles (UAVs), and drones, covering both static and dynamic environments. These algorithms aim to calculate optimal movement paths from a given starting point to destination while avoiding collisions and minimizing both movement cost and time. Representative approaches include graph-based search algorithms such as Dijkstra, A*, and D*, and heuristic-based intelligent search algorithms such as Genetic Algorithm (GA), Ant Colony Optimization (ACO), and Particle Swarm Optimization (PSO).

This study adopts the A* algorithm for path planning in static environments such as logistics centers. The A* algorithm is well-known for its fast search capability combining breadth-first and depth-first search with heuristic evaluation. It guarantees optimality when admissible heuristics are used. To support initial stage implementation, a structure was designed that can incrementally fill distance arrays, allowing the system to operate even when pre-calculated distances are not available. Once distances between locations are calculated, they are stored to prevent redundant calculations, greatly improving overall framework efficiency.

$$
f(n)=g(n)+h(n)
$$

where $g(n)$ is the actual path cost from the start node to the current node n, and $h(n)$ is the heuristic estimated cost from the current node to the goal node. For search, add the start node to the open list and calculate $f(n)$. Set the node with the smallest $f(n)$ in the open list as the current node and move it to the closed list. For neighboring nodes not in the closed list, update the minimum cost $f(n)$ and set the current node as the parent node, then add to the open list. Again, set the node with the smallest $f(n)$ in the open list as the current node, and repeat until reaching the goal node to search for the shortest path. In this study, the A* algorithm is used not only to calculate shortest distances but also to generate detailed movement trajectories for logistics robots.

<img src="https://velog.velcdn.com/images/devjo/post/d3ac8d3d-446e-4fd5-a7f5-97f88c6d2946/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

-Define start node $s$ and goal node $t$.

-Add $s$ to the open list and calculate $f(n)$.

-Select the node with the smallest $f(n)$ in the open list as the current node and move it to the closed list.

-For adjacent nodes not in the closed list, update $f(n)$ and set the current node as the parent node, then add to the open list.

The algorithm proceeds with the flow as described above.

#### Clustering

To reduce problem size and search space, this study applies clustering to group customer orders. This significantly reduces computational burden, allowing task allocation to be completed within a reasonable time. We use hierarchical clustering that does not require pre-specifying the number of clusters.

To group orders with spatial proximity, we calculate Euclidean distances between centroids of subtasks for each order and apply the single linkage method. In addition to spatial proximity, capacity constraints are integrated to ensure that the total workload within a cluster does not exceed the robot's maximum payload capacity.

$$
\text {min} \sum_{i \in V} \sum_{j \in V} (c_{ij}+S_j)x_{ij}, \\
\sum_{j \in V} x_{ij}=1, \\
\sum_{i \in V} x_{ij}=1
$$

To determine the optimal visit order within a cluster, the problem is formulated as a Traveling Salesman Problem (TSP). TSP is a classical optimization problem that finds the shortest path starting from a given point, visiting each node exactly once, and returning to the starting point. In this study, the packaging station serves as both the start and end node. Robots move from the packaging station to execute picking tasks for subtasks within assigned clusters and return to the packaging location.

In the above equation, the objective function is to minimize total movement time and work time, where $c_{ij}$ represents movement time from node $i$ to node $j$, and $S_j$ represents work time at node $j$. The constraints mean that each task must be visited exactly once.

#### Task Allocation to Each Robot

$$
\text {min} \sum_{v \in V} (c_vx_{kv}), \\
\sum_{k \in K} x_{kv}=1, \\
\sum_{v \in V} c_vx_{kv} \le \bar{T}
$$

Various objective functions can be used for optimally allocating tasks to multiple robots, such as minimizing total movement distance, reducing energy consumption, or minimizing robot idle time. This study aims to minimize task completion time (makespan). This refers to the time it takes for all robots to complete their assigned tasks.

In the above equation, the objective function is to minimize the longest completion time, and the constraints ensure that each cluster $V$ is assigned to exactly one robot $K$ and is completed within the time limit $T$.

#### Scheduling for Each Robot

$$
\text{min max} (t_n), \\
t_1=c_1, \\
t_n \ge c_n+g_{n-1}+t_{n-1}, \\
b_1 \le F-d_1, \\
b_n \le F, \\
b_n \le b_{n-1}-d_n+g_{n-1}, \\
g_n \le F-b_n
$$

Each robot has finite battery capacity, and if the remaining battery level is insufficient, it cannot execute the required picking tasks for specific clusters. To solve this, a Mixed Integer Linear Programming (MILP) model is defined to determine the execution order of clusters and the timing and amount of battery charging based on the robot's assigned tasks and battery constraints.

In the above equation, the objective function is to minimize the time it takes for the robot to complete its last task. The constraints ensure that the battery does not exceed maximum capacity and decreases proportionally to movement distance.

---

### Results

Among all stages, the TSP-based path planning within clusters required the longest computation time. This stage was executed sequentially in experiments, but if performed in parallel, it could significantly reduce total time. For example, with 1000 orders, the longest TSP calculation for a single cluster took only about 7 seconds when parallelized. Similarly, the scheduling stage can also be parallelized. As a result, the overall framework is scalable and can complete the entire process from scheduling to task allocation in about 5 minutes even in large-scale scenarios such as 100 robots and 1000 orders (approximately 4000 subtasks).

Due to the lack of publicly available benchmark datasets suitable for this problem configuration, direct numerical comparison with existing methods was not included. Nevertheless, the proposed framework demonstrated high scalability by completing task allocation and scheduling for up to 1000 orders and 100 robots within about 5 minutes. This performance level emphasizes the possibility of deploying the framework in actual large-scale logistics systems.

---

### Conclusion

This framework does not depend on fixed logistics center structures or environments, making it highly flexible and adaptable, and can be easily modified to suit various settings. Although developed based on zone-picking warehouse environments where manual picking is common, this framework is inherently designed to support robot systems. Beyond simply allocating tasks, this framework generates complete execution trajectories including detailed paths and optimized sequences that can be directly interpreted by robot control modules. As robot picking technology continues to advance and be adopted, this trajectory-level framework is in an advantageous position to be integrated into fully autonomous logistics operations without structural modifications. In summary, this study presents a practically relevant and scalable framework that more closely reflects actual logistics operations than traditional ST-SR models. While many existing approaches focus on one-time optimization for incoming orders, this framework enables dynamic and iterative application based on accumulated path data and system integration, designed for continuous warehouse operations. This emphasizes the originality and practical deployability of this research in intelligent logistics environments.

The proposed framework shows strong applicability, but direct transition to complex real environments is limited due to several simplified assumptions.

-The environment is considered static without dynamic obstacles or layout changes.

-Variability in worker behavior and productivity is not considered.

-Order and item locations are randomly generated rather than derived from actual operational data.

Future research can address these limitations by integrating dynamic elements such as real-time order influx, zone congestion, or probabilistic movement times. Additionally, integrating empirical datasets obtained from actual warehouse operations can validate the framework's performance in realistic scenarios. Finally, this framework can be extended to accommodate hybrid systems that combine both manual and robot picking processes.

---

### References

[Original Source #1](https://www.mdpi.com/2227-7390/13/11/1770)




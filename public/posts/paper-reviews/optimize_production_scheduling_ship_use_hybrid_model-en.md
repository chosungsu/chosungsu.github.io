---
title: 'Optimization of Production Scheduling for the Additive
Manufacturing of Ship Models Using a Hybrid Method'
date: '2025-01-10'
tags: ['optimization', 'paper review']
---

### Abstract

This paper proposes a hybrid optimization technique that utilizes Linear Programming (LP) or Genetic Algorithm (GA) depending on the problem size, which was developed to improve the Parallel Additive Manufacturing (AM) process for ship models.

While LP guarantees optimality, it has limitations where computation time increases exponentially with problem size. To address this, the proposed method applies GA to large-scale problems to derive high-quality optimal solutions within a reasonable time frame.

The proposed method simultaneously optimizes module allocation to AM machines and the build processing sequence for each machine, while also considering worker availability for preparing consecutive module production.

When applied to case studies, it showed a 14% reduction in completion time compared to the heuristic method used in previous research. Through benchmarking against existing heuristic methods for various problem sizes, it was proven that this technique consistently demonstrates superior performance.

---

### Introduction

While Computational Fluid Dynamics (CFD) shows high accuracy in evaluating the hydrodynamic performance of ships, ship model testing remains essential due to physical environmental factors that are difficult to resolve with CFD, such as turbulence modeling, grid resolution, and numerical approximation.

With the recent emergence of low-carbon emission ships, hull shapes must accommodate additional power system elements (e.g., large batteries), leading to increased diversification of hull shapes and growing demand for model testing. However, research on optimizing the cost and efficiency of ship model production is still insufficient.

Traditional ship model production methods utilize Fiber-Reinforced Plastic (FRP) or wood because glass fiber-reinforced plastic is suitable for model production due to its corrosion resistance, lightweight, and durability. However, FRP is a combustible material that generates toxic gases during disposal and causes environmental pollution during production and disposal processes. Additionally, since hand layup is typically used, the final quality depends on the worker's skill level.

Recently, with the increasing accessibility of Additive Manufacturing (AM) or 3D printing technology, the technology is rapidly spreading. As it builds 3D models by layering and bonding materials such as metal, plastic, powder, and liquid, unlike traditional casting or machining, anyone can manufacture products without skilled labor. Its advantages of fewer shape constraints and quick response to design changes, which can reduce production time, have led to widespread use across various industries.

Choi introduced a method of manufacturing ship models through modular AM, choosing the modular approach to overcome limitations where some model production is difficult due to the high initial cost and size constraints of 3D printers.

While the modular approach can significantly reduce production time by enabling parallel production across multiple devices, this increases the importance of scheduling, and production efficiency, total cost, and idle time can vary depending on resource allocation strategies for 3D printers, materials, and personnel.

In terms of research on production scheduling optimization in AM, for example, Chergui addressed parallel production scheduling problems in AM, and Choi optimized modular ship model production scheduling based on heuristics. While they performed module allocation and sequence determination simultaneously, they failed to reflect worker availability, an important factor that adds complexity to modular ship model production scheduling optimization, specifically the consideration of personnel needed to prepare for the next task after completing the previous module.

In this study, we used a hybrid approach combining Linear Programming (LP) and Genetic Algorithm (GA) as an optimization technique for efficient production of ship models based on additive manufacturing, selectively applying LP or GA depending on the number of modules to utilize the advantages of both methods.

---

### Scheduling challenge

Traditionally, in monolithic AM, where the entire object is printed at once, scheduling was not a major consideration. However, as various attempts to improve AM efficiency continued, parallel production methods emerged that either divide large products exceeding AM equipment capacity or use multiple equipment simultaneously, leading to configurations like 3D printing farms and the emergence of modular AM. This method involves producing small modules individually using multiple AM machines and then assembling them to complete large products, where scheduling becomes crucial for maximizing production efficiency.

Li addressed production planning problems based on parallel production methods in AM, grouping parts and allocating them to machines. Ransikarbum attempted to optimize machine allocation of modules using Mixed Integer Linear Programming (MILP), and Dvorak explained and modeled key optimization problems related to layered manufacturing, operations research, and production time minimization. These studies provide important insights for scheduling optimization in modular AM.

We believe the problem in this study is similar to the blocking job shop scheduling problem (BJSSP), which deals with cases where work cannot proceed to the next stage due to resource constraints. Related research explores the complexity of these blocking effects, which could be applicable to situations where machines become bottlenecks in modular AM.

Recently, hybrid algorithms for solving resource-constrained project scheduling problems have been actively researched. For example, the hybrid differential evolution (HDE) algorithm effectively handles complex scheduling problems by combining differential evolution with forward-backward improvement. Another example, the adaptive large neighborhood search with constraint programming (ALNS-CP) algorithm, provides an effective approach for flexible job shop scheduling and can handle various resource constraints. We believe these methods are particularly useful for modular AM, where work must be assigned to multiple equipment with different performance capabilities.

For scheduling optimization in this paper, we studied simultaneously determining module allocation and sequence to minimize total production time (makespan).

<img src="https://velog.velcdn.com/images/ski06043/post/2011c582-37ca-40f0-9777-b2ff3f032c7c/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

To define the mathematical model diagrammed in the image above, we made the following assumptions:

- The production time for each module is already known.

- Multiple identical machines are used.

- Production setup time is constant.

- Each machine can only produce one module at a time.

For example, consider a case with two AM machines and four modules with different production times. When allocating modules to the two machines, various schedules are possible depending on the allocation and sequence of modules. The image below shows Gantt charts representing examples of various schedules, where the numbers in the bar graphs represent module numbers, and the red dotted lines indicate production completion times.

<img src="https://velog.velcdn.com/images/ski06043/post/d9706277-4ad1-4b31-94a4-1a9fc1d623e1/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

For example, in figure a, modules 1 and 3 are produced sequentially on printer 1, while modules 2 and 4 are produced sequentially on printer 2. Figures b-d show Gantt charts reflecting different allocations and sequences, demonstrating how total production time varies between them.

However, this example did not consider worker availability, and the image below shows worker available time periods divided into start and end times.

<img src="https://velog.velcdn.com/images/ski06043/post/c5c06407-25f1-42f3-ad56-1f8890c3d10d/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Images a-d show schedules modified to reflect worker availability based on the initial schedule from the previous images a-d. For example, when worker availability was not considered, figure d showed the shortest production time, but when reflected, figure a showed the shortest production time. This demonstrates that when solutions that don't consider worker availability are applied in real situations, the total production time can vary significantly.

---

### Hybrid models

#### 1. Using LP

To solve the module allocation and sequence determination problem, we proposed a network-based model similar to that used in previous research by Choi. This model consists of nodes and arcs as shown in the image below, where each network represents one machine, nodes represent modules, and arcs represent production sequences. The source node represents the starting point of production, the sink node represents the end of production, and other nodes represent individual modules.

<img src="https://velog.velcdn.com/images/ski06043/post/ef5e5c1d-22b7-4c10-b1bc-d324aed6a866/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

The image below shows the objective function formulated to minimize module z, which is the last to be completed.

<img src="https://velog.velcdn.com/images/ski06043/post/c83abd8f-4a63-4573-a4b0-5cb7ff131613/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Equation (2) means that each module must be produced only once, equation (3) is a condition that the number of arcs entering the sink node must equal the number of arcs leaving the source node, and equation (4) has the condition that the source node must have arcs to at most one other node. Equation (7) means that the sum of the source node time $u_i$ and the production time of modules $T_i^{BUILD}$ must be less than or equal to z, the time of the module that finishes last in total production time. Equation (8) means that the production start time of module j must be after the end time of the previous module i. Equation (10) means that each module must start within the start and end times of working hours.

#### 2. Overcome of size limitation of LP

While linear programming can mathematically guarantee solution optimality and provide quick results, it has limitations where computation time increases exponentially with problem size. Therefore, genetic algorithm was applied to problems above a certain scale. However, GA can take longer processing time for simple problems and may get stuck in local optima. For example, the hybrid technique uses LP when the number of modules is below a certain threshold, and GA when above it.

<img src="https://velog.velcdn.com/images/ski06043/post/069cfc82-ab2e-494e-bb34-a3af8eb00aba/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Modules are grouped and produced earlier if they have lower priority values.

---

### Case study

In the case study, Choi selected a ship model used in previous research. The ship was divided into 32 modules using 6 pieces of equipment, with dimensions including overall length (L.O.A), length between perpendiculars (L.B.P), breadth (B), depth (D), and draft (T).

<img src="https://velog.velcdn.com/images/ski06043/post/a13b9a79-e52f-408c-bfb8-454bbc731f61/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

As shown in the image above, experiments were conducted with a 5% buffer time considering uncertainties such as differences in equipment performance along with the production time of the divided modules. In previous research, a heuristic method was used to solve the production scheduling problem of modular ships, and when modules were allocated in order based on module index, the total time was 9816 minutes.

According to the method proposed in this paper, since the threshold was greater than 15, GA was applied. The hyperparameters were set to population size 50, elite individuals 7, crossover individuals 27, mutation individuals 16, and termination condition of 3000 solutions. The convergence curve of the genetic algorithm was as follows:

<img src="https://velog.velcdn.com/images/ski06043/post/8d284170-6300-4607-bf8d-08554e053904/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Scheduling results could be obtained in a short optimization time of 27 seconds, and the optimum was found to be 8481 minutes, showing an effect of reducing the time by up to 1332 minutes (13.58%).

Additionally, when the same ship model was divided into larger module units (12) and allocated to 3 pieces of equipment, since it did not exceed the threshold, the optimal solution was derived using LP. The optimization time was 0.2 seconds with 5358 minutes, while the heuristic method under the same conditions produced 5965 minutes, showing a 10% improvement effect.

---

### References

[Original Path #1](https://www.mdpi.com/2077-1312/12/11/1961)




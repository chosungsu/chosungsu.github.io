---
title: 'Anytime Lifelong Multi-Agent Pathfinding
in Topological Maps'
date: '2025-01-28'
tags: ['robotics', 'paper review']
---

### Abstract

This study addresses the lifelong multi-agent pathfinding (lifelong MAPF) problem, which continuously solves MAPF instances online according to newly assigned goals. Specifically, we focus on lifelong MAPF in topological maps. This problem is challenging because agent movement is restricted to narrow corridors in the topological map rather than the entire map area. In corridors, detours may be limited or located far away, making path computation significantly complex. Additionally, low-quality solutions can cause traffic congestion or even deadlocks in corridors.

Therefore, we propose a new lifelong MAPF method based on an anytime strategy that effectively resolves conflicts within corridors. This method progressively improves solution quality by updating sub-paths with severe traffic congestion. Furthermore, we adopt several improvement steps to effectively resolve corridor conflicts in conflict-based search (CBS). This approach significantly reduces CBS's search space and computation time.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/b19c6701-7fe1-4d33-b972-2d52ccf451de/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

In automated warehouse systems, multiple mobile robots continuously process incoming logistics tasks. Mobile robots move through warehouse spaces to transport packages or inventory pods to their respective target locations. For autonomous navigation of mobile robots, the robot management system must continuously plan collision-free paths for all robots. This problem is known as 'lifelong multi-agent pathfinding (lifelong MAPF)' and has been extensively studied in recent research.

Most studies have defined the lifelong MAPF problem in grid-like environments similar to the Kiva system. However, the Kiva system requires special configurations such as marker-based positioning and standardized spaces for Kiva robots to systematically operate many robots in grid maps. Therefore, it is difficult to apply this system to general warehouse spaces or various types of mobile robots. To address this issue, we consider the lifelong MAPF problem in topological maps, where the environment is represented as a graph composed of nodes and lanes. Additionally, topological maps can be easily applied to existing warehouse spaces with various structures.

However, lifelong MAPF in topological maps is challenging due to several factors. First, corridor conflicts frequently occur when two agents pass through a corridor simultaneously in opposite directions. MAPF algorithms significantly increase computation time by exploring unnecessarily many states to resolve these conflicts. For example, in conflict-based search (CBS), corridor conflicts exponentially increase the search space according to corridor length. Second, lifelong MAPF methods must use efficient algorithms such as windowed approaches and suboptimal solvers for fast online computation. However, these algorithms generally generate low-quality solutions and can cause traffic congestion in corridors since detours are often limited in topological maps. Finally, suboptimal solvers can sometimes cause deadlocks in dead-end corridors. To avoid this, algorithms must thoroughly explore the optimal entry order for dead-end corridors within limited time.

In this study, we propose a new lifelong MAPF method that effectively resolves corridor conflicts in topological maps to find the best possible solution within limited time. This method consists of an Anytime lifelong MAPF algorithm and a Corridor-CBS algorithm.

---

### Related work

We cover prior research on lifelong MAPF and one-shot MAPF problems, and algorithms can be classified according to optimality or completeness properties. Optimal algorithms always provide optimal solutions but have limited scalability with respect to the number of agents. Conversely, suboptimal algorithms focus on improving scalability by sacrificing some solution quality. Completeness is the property that an algorithm eventually finds a feasible solution if one exists.

#### 1. Lifelong MAPF

Lifelong methods must adopt efficient suboptimal solvers instead of optimal solvers for fast online computation. Therefore, all lifelong methods do not guarantee solution optimality. Ma et al. proposed a token-passing method that continuously passes tokens to agents. Agents that receive tokens have the authority to assign tasks and plan paths. This method calculates agent paths by considering other agents' paths as dynamic obstacles. Liu et al. planned paths only for agents with new goals. They reserved dummy paths in isolated parking locations to avoid deadlocks. Grenouilleau et al. proposed a multi-label A* algorithm for low-level search of MAPF solvers. This algorithm extends the original A* to determine paths passing through two consecutive goals.

Since they plan only sub-paths for some updated agents rather than all paths, they generally provide low-quality solutions. Additionally, they are only applicable to well-formed maps where each agent can rest at isolated goals or parking locations without being blocked by other agents. Li et al. proposed the RHCR (rolling-horizon collision resolution) method to address these issues. As discussed earlier, RHCR continuously re-plans all paths at regular time intervals by resolving conflicts only within a limited time horizon.

#### 2. MAPF SOLVER

Lifelong algorithms continuously call MAPF solvers to solve single MAPF instances. MAPF solvers plan collision-free paths from agents' start positions to goal positions. Some solvers applied rule-based or prioritized methods.

Rule-based methods calculate multi-agent paths based on simple movement rules such as push and swap. This guarantees solution determination in polynomial time, but solution quality is relatively low. Prioritized methods sequentially plan single paths for each agent according to predetermined agent priorities. While this does not guarantee solution completeness and optimality, it is fast and highly scalable.

Sartoretti et al. proposed PRIMAL, a learning-based MAPF framework. PRIMAL trains single-agent policies in partially observable maps through reinforcement learning and imitation learning. Sharon et al. presented the CBS (conflict-based search) algorithm to obtain complete and optimal solutions. CBS repeatedly resolves conflicts between two agents by expanding a binary constraint tree until it determines nodes without conflicts.

#### 3. MAPF ON TOPOLOGICAL MAPS

While many studies have solved MAPF problems in grid maps, few have considered topological maps. Liu et al. constructed sector-based topological graphs and estimated traffic conditions for each sector. They planned multi-agent paths considering traffic conditions to avoid traffic congestion. Cohen et al. extended CBS by considering additional heuristic information for highways and guiding agents to avoid conflicts in corridors.

Binder et al. defined four representative conflict cases (sequential, waiting, avoidance, push) in topological maps and presented solutions for each case. Li et al. also considered MAPF in topological graphs for railway scheduling of numerous trains. They efficiently planned paths for thousands of agents by solving four MAPF instances in parallel using an anytime strategy called large neighborhood search.

---

### Problem formulation

<img src="https://velog.velcdn.com/images/devjo/post/e38f7dad-cd72-42a4-bed3-3c5ffe4a6bda/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

The problem considered in this study is lifelong MAPF in topological maps. A topological map is defined as an undirected graph $G_M = (V_M, E_M)$, where vertices $v \in V_M$ represent locations in 2D space and edges $e \in E_M$ represent lanes connecting two vertices.

Agents typically move in warehouse environments consisting only of narrow corridors. Vertices within corridors represent waypoints where agents follow or wait. A MAPF instance includes a topological map $G_M$ and a set of agents $A = \{a_1, \ldots, a_N\}$, where each agent has unique start and goal points. Conflicts between two paths $p_i$, $p_j$ occur when they move to the same vertex at the same time or pass through the same edge in opposite directions. Therefore, the objective of one-shot MAPF is to find a collision-free path set for all agents with minimum total cost, i.e., $cost(P)=\sum_{p_i \in P} t_i$.

The lifelong MAPF problem is an online version of the one-shot MAPF problem, where agents are continuously assigned new tasks upon completing current tasks. Given a set of agents $A = \{a_1, \ldots, a_N\}$ and a set of tasks $T = \{\tau_1, \ldots, \tau_K\}$, the goal is to maximize throughput (average number of completed tasks per time step) so that agents in A complete all tasks in T. Since cycle time (average completion time per task) has an inverse relationship with throughput, the goal is equivalent to minimizing cycle time.

---

### Anytime lifelong MAPF

<img src="https://velog.velcdn.com/images/devjo/post/036ff84e-c655-429d-b3cb-2472a6fb5ae6/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

To solve the lifelong MAPF problem, we used the RHCR (rolling-horizon collision resolution) approach, one of the most efficient methods. Since multi-agent paths are continuously updated according to newly assigned tasks, RHCR ignores long-term future planning.

This iteratively plans multi-agent paths at regular $\lambda$ time intervals by resolving conflicts only within a limited time horizon of $ω$ time steps. Additionally, RHCR calculates paths that visit a sequence of goals rather than a single goal. If the distance of the shortest path visiting all goals is less than $ω$, new task goals are added to the sequence. This approach generates high-quality solutions while reducing computation time compared to methods that consider the entire time horizon.

RHCR with small $ω$ values can cause deadlocks in long corridors. Furthermore, to resolve corridor conflicts, one agent must wait until another agent moving in the opposite direction completely passes through. This waiting time can be long and may accumulate unexpectedly due to low-quality planning.

As shown in the figure above, RHCR sometimes fails to detect corridor conflicts when using a limited time horizon shorter than the corridor length. Eventually, RHCR plans paths so that two agents enter the corridor simultaneously from different directions. Then agents must backtrack their entry path. If this situation occurs multiple times, traffic congestion occurs where multiple agents become trapped in the corridor. To address this issue, RHCR uses larger time horizons. However, planning all paths with large time horizons requires considerable computation.

The lifelong MAPF algorithm proposed in this paper is called Anytime-RHCR. This algorithm iteratively plans paths after agents move for $\lambda$ time steps and assigns new tasks whenever agents complete current tasks. For path planning, Anytime-RHCR first obtains an initial solution using a fast suboptimal solver ECBS with a short time horizon $ω_{init}$. Then it determines a subset of agents called the modification set.

#### 1. Anytime-RHCR

This algorithm continuously assigns uncompleted tasks to agents that have completed current tasks. Additionally, it iteratively plans paths for all agents at regular $\lambda$ time intervals to execute assigned tasks. This algorithm quickly finds initial paths with a small window $ω_{init}$, then iteratively refines subpaths of the modification set with an extended window $ω_{extd}$. The modification set is determined by agents involved in additional conflicts in $ω_{extd}$.

Each task set $T'_i$ is continuously updated by adding new tasks $\tau_k \in T$ whenever $a_i$ completes a task. Updated new tasks are removed from the set.

#### 2. Selection of the modification set

Determining the agent set $A_M$ is an important component that affects solution quality. The proposed method first attempts to resolve conflicts in CF by selecting an agent set involved in conflicts.

If conflicts exist, we select an agent set that effectively resolves many conflicts in CF. Let $G_{CF} = (V_{CF}, E_{CF})$ be the conflict graph, where each vertex $v \in V_{CF}$ is an agent and each edge $e \in E_{CF}$ represents a conflict relationship between two agents. The proposed method determines the largest connected component $V'_{CF} \subset V_{CF}$ in $G_{CF}$.

If $|V'_{CF}| > N_M$, we randomly select connected agents to determine the agent set $A_M$. Otherwise, the agent set is initialized with all agents in $V'_{CF}$. Then we randomly select an agent $a_i$ and add other agents that block path $p_i$. This is repeated until $|A_M|=N_M$.

If no conflicts exist, we apply an agent-based selection method, which determines the agent $a_i$ with the largest delay and inserts it into the agent set. Delay calculation is defined as the cost difference between the shortest path and the planned path.

#### 3. Windowed MAPF Solvers

We devise a windowed MAPF solver for calculating multi-agent paths P using bounded horizon collision checks. It only checks and resolves conflicts for the first $ω$ time steps of P, ignoring conflicts in the remaining time steps. Therefore, after $ω$ time steps, the solver determines the shortest path to agent goals regardless of conflicts.

In this paper, we use a multi-label A* algorithm with the SIPP method (safe interval path planning, SIPP) for low-level search.

---

### Conclusion

In this paper, we present a new algorithm based on the RHCR method for lifelong MAPF in topological maps. Generally, conflicts between two agents can be easily resolved by having one agent move sideways. However, in topological maps, sideways movement is not possible within corridors. Therefore, RHCR with small limited time horizons causes traffic congestion.

The proposed approach was able to obtain high-quality solutions in topological maps with limited detours and severe traffic congestion, and presented a MAPF solver called Corridor-CBS. This significantly reduced CBS execution time by applying several improvements to effectively resolve conflicts.

While the proposed method achieved excellent results in lifelong MAPF experiments, its performance depends on the quality of the initial solution. Future research suggests studying the integrated problem of lifelong MAPF and multi-agent task assignments, and considering methods to adaptively determine suboptimality coefficients and time horizons according to congestion levels.

---

### References

[Original Source #1](https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=10054055)




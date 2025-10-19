---
title: 'A Systematic Literature Review of Vehicle Routing Problems with Time Windows'
date: '2025-05-01'
tags: ['robotics', 'paper review']
---

### Abstract

Vehicle Routing Problems with Time Windows (VRPTW) have received significant attention due to their crucial role in real-world logistics and transportation. The complexity of real-world situations means most problems involve multiple constraints and multi-objective optimization, increasing problem difficulty.

This paper aims to contribute to the effective solution of VRPTW-related problems. Following PRISMA guidelines, we set research questions and objectives, then conducted data extraction and comparative analysis of relevant literature from the past five years (2018–2022) to answer the established research questions.

The results show that approximately 86% of algorithms in the literature are approximate methods, with meta-heuristics being more prevalent than heuristics, and nearly 40% of the literature uses hybrid methods combining two or more algorithms.

---

### Introduction

Vehicle Routing Problems with Time Windows (VRPTW) is a well-known problem in logistics that involves optimizing delivery routes for multiple vehicles while considering specific time constraints for each delivery. VRPTW is one of the important variants of the broader Vehicle Routing Problem (VRP), first proposed by Solomon in 1987. As logistics plays a crucial role in supply chain management and transportation today, VRPTW has received considerable attention from the research community due to numerous real-world applications, including waste collection, home healthcare services, perishable goods delivery, urban solid waste collection, and many other application areas.

However, finding optimal solutions for VRPTW is an NP-hard problem, and problem complexity increases significantly as input data size grows. Therefore, researchers more frequently use approximation algorithms to find acceptable approximate solutions rather than exact algorithms to obtain optimal solutions. While numerous approximation algorithms have been proposed to address these problems, including single algorithms, hybrid algorithms, and machine learning methods, the need for more effective and efficient solutions for vehicle route optimization still exists.

---

### Methods

#### 1. Constraints

Time windows (C1): Time windows are a core aspect of VRPTW, limiting delivery or pickup times for each customer. However, this element adds complexity to the problem and makes finding optimal solutions difficult.

Capacity-constrained vehicles (C2): Vehicles used in VRPTW have limited capacity. This means a single vehicle cannot serve all customers in one trip. This requires efficient route planning and scheduling, increasing problem complexity.

Heterogeneous fleet (C3): Sometimes VRPTW includes heterogeneous fleets with different capacities and capabilities. This makes vehicle route optimization and scheduling more difficult.

Dynamic demand (C4): In some applications, customer demand can be dynamic and uncertain. This makes it difficult to plan vehicle routes and schedules in advance.

Travel time (C5): Travel time between customers and depots is an important factor in VRPTW, affecting the overall efficiency of delivery or pickup processes. However, factors such as traffic congestion and road conditions can influence travel time.

Multi-objective optimization (C6): VRPTW often involves multiple objectives. For example, minimizing total travel time or distance, maximizing vehicle utilization, and minimizing the number of vehicles used. These conflicting objectives make finding optimal solutions difficult.

Environmental considerations (C7): In recent years, emphasis on reducing the environmental impact of transportation has increased. VRPTW must consider environmental factors such as vehicle emissions and energy consumption when optimizing vehicle routes and scheduling.

Pickup and delivery (C8): In many logistics and transportation operations, customers have demand for both delivery and pickup. Each customer is assigned a specific time window for pickup and delivery within the time range.

Time dependency (C9): In modern logistics, vehicles sometimes must complete their routes within specific time limits.

Electric vehicles (C10): Unlike internal combustion vehicles, Electric Vehicles (EVs) cannot complete long-distance deliveries due to limited battery capacity. When necessary, they must travel to a limited number of charging stations and charge for a certain period.

#### 2. Research Trends

The literature shows that over the past five years, researchers have focused more on using meta-heuristics, particularly combining two or more algorithms to solve multi-objective or multi-constraint tasks. Among these, route planning for electric vehicles is more complex and difficult compared to traditional fuel vehicles. In particular, VRPTW problems are being more focused on and applied to real logistics and transportation industries.

Exact Method: Algorithms that guarantee optimal solutions to problems. To our knowledge, most of these methods are limited to solving small to medium-scale VRPTW instances that can find exact solutions within reasonable time. These methods include direct tree search methods (e.g., branch-and-price-and-cut based on branch-and-bound) and techniques such as dynamic programming.

Heuristic Method: Algorithms designed to quickly find good solutions but do not guarantee optimal solutions. These methods are frequently used for larger-scale VRPTW instances where exact algorithms are computationally expensive. These methods include constructive heuristics, the savings algorithm, and the Clarke and Wright Algorithm.

Metaheuristic Method: Algorithms designed to efficiently explore large solution spaces to find high-quality solutions. These methods often combine multiple heuristic techniques to create powerful search strategies. These methods include simulated annealing, Tabu search, genetic algorithms, ant colony optimization, and particle swarm optimization.

Hybrid Method: Algorithms that combine two or more techniques from different categories to create more powerful search strategies. These methods often combine exact techniques with heuristic techniques, or heuristic techniques with metaheuristic techniques to find high-quality solutions within reasonable time.

Other Method: Approaches that do not fall into any other category. These methods may include techniques such as constraint programming, integer programming, and artificial neural networks. These methods are frequently used to solve specific VRPTW problems such as VRPTW with time-dependent or stochastic travel times.

#### 3. Limitations

Existing algorithms for solving VRPTW problems have several limitations and shortcomings. Some of these include:

Inability to handle large-scale problem instances: Many existing algorithms cannot handle large-scale problem instances involving numerous customers, vehicles, and time constraints. This is because these algorithms often have high computational complexity, with execution time increasing exponentially with problem size. For example, exact algorithms such as branch and bound can become computationally infeasible for large-scale problem instances. Additionally, many heuristic and metaheuristic algorithms can get trapped in local optima for large-scale problems.

Lack of scalability: Related to the first point, many existing algorithms do not scale well with problem size. As problem size increases, solution quality may deteriorate significantly, or algorithms may become infeasible due to computational complexity. For example, some algorithms may be efficient for small to medium-scale problems but may rapidly degrade in performance for large-scale problems.

Difficulty handling stochastic elements: Many VRPTW problems are affected by stochastic elements such as uncertainty in customer demand or travel time. However, many existing algorithms do not explicitly handle stochastic elements or only handle them in limited ways. For example, some algorithms assume deterministic customer demand and travel time, which can lead to suboptimal solutions when these assumptions are violated.

Lack of flexibility: Many existing algorithms are tailored to specific problem formulations or assumptions such as fixed fleet size or uniform vehicle capacity. This can limit their applicability to real-world problems that may have diverse or dynamic constraints. For example, algorithms designed for VRPTW with fixed fleet size may not be suitable for problems with flexible fleet size.

Dependence on problem-specific heuristics: Some existing algorithms depend on problem-specific heuristics or techniques, which can limit their applicability to other VRPTW problems. For example, algorithms that depend on specific problem properties such as particular network structures or vehicle capacity distributions may not be suitable for problems that violate these assumptions.

Limited comparison with state-of-the-art algorithms: Many existing algorithms are evaluated only against limited benchmarks or other algorithm sets, which can limit the generalizability of their results. For example, an algorithm may show excellent performance on a few benchmark problems but may not perform as well on more difficult problems or against other state-of-the-art algorithms.

Overall, despite significant progress made by existing VRPTW algorithms in addressing the complexity and challenges of these problems, there is still much room for improvement in terms of scalability, flexibility, and handling stochastic elements. Future research can focus on developing more efficient and flexible algorithms that can handle stochastic elements and be applied to a wide range of VRPTW problems.

---

### Conclusion

This systematic literature review (SLR) provides a goal-oriented and comprehensive overview of Vehicle Routing Problems with Time Windows (VRPTW) literature published from 2018 to 2022. Following PRISMA systematic literature review guidelines, we established five research questions and objectives, searched 10,556 VRPTW-related papers from reliable databases, and identified 64 papers that met the criteria. The entire review process strictly adhered to PRISMA guidelines to ensure reproducibility.

Our findings suggest that multi-objective and/or multi-constraint VRPTW problems have been the most interesting research area in the research community over the past five years. The majority of research in this field has focused on approximation algorithms, which account for 86% of all algorithms surveyed. In particular, algorithms such as Adaptive Large Neighborhood Search (ALNS) have shown effectiveness in solving large-scale VRPTW problems. ALNS's ability to adaptively explore different neighborhoods makes it very suitable for handling large-scale problem instances. We acknowledge the value and potential of ALNS for solving VRPTW problems. We also understand that Branch-and-Price-and-Cut (BPC) algorithms can also be used to solve large-scale VRPTW problems. Some robust VRP algorithms handle stochastic elements, and some dynamic VRP algorithms focus on flexible fleet size. However, our literature review indicates that ALNS and BPC algorithms may have limitations when applied to larger problem instances, as suggested in studies [56, 65], and that flexible fleet size is mentioned as an objective or constraint in the literature [22, 41, 61].

This SLR also speculates on potential future research directions including algorithm hybridization, machine learning integration, real-time decision making, multi-objective optimization, electric vehicles, collaborative VRPTW, and automated delivery. These directions highlight the need to address the evolving nature of this field and newly emerging challenges and opportunities.

Considering the context of Intelligent Transportation Systems (ITS) and smart vehicles, the integration of VRPTW algorithms becomes even more relevant. By integrating real-time data and leveraging advanced technologies such as autonomous driving capabilities and vehicle-to-infrastructure communication, VRPTW algorithms can optimize routes, minimize travel time, and reduce costs. The utilization of smart vehicles with intelligent capabilities further enhances the efficiency and effectiveness of logistics and transportation operations.

This SLR contributes to understanding VRPTW algorithms and their potential applications in the context of ITS and smart vehicles. By leveraging real-time data and advanced algorithms, logistics and transportation systems can achieve improved resource utilization, reduced traffic congestion, and overall performance enhancement. The research findings emphasize the importance of integrating VRPTW solutions within the ITS framework and utilizing smart vehicles for future development in this field.

---

### References

[Source #1](https://www.mdpi.com/2071-1050/15/15/12004)

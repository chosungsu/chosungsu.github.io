---
title: 'A review on integrated scheduling and outbound vehicle routing
problems'
date: '2023-05-03'
tags: ['robotics', 'paper review']
---

### Abstract

Production scheduling and vehicle routing are both well-studied problems in the literature. Approaching these interrelated problems with an integrated approach rather than solving them sequentially leads to improved overall performance. Integrated approaches have become essential in today's competitive business environment as they help reduce costs and achieve on-time delivery.

This paper aims to provide a review of integrated scheduling and outbound vehicle routing problems where vehicle routing decisions are explicitly considered, covering 65 studies from 2010 onwards. It will summarize various problem characteristics, constraints, and solution methods used in the literature and present a general model. Some suggestions for future research directions are also provided.

---

### Introduction

Production scheduling and vehicle routing are extensively studied problems in operations research literature. While these two problems are closely interrelated within the supply chain, they are often solved sequentially in practice. In most cases, the production scheduling problem is solved first. At this stage, only production criteria are used, and delivery aspects are not considered. The completion times from the production solution become the release dates for the outbound vehicle routing problem that is solved subsequently. Another option is to solve the vehicle routing problem first, and then impose the vehicle's departure dates as strict deadlines for orders in the scheduling problem that is solved afterward.

This lack of coordination can lead to sub-optimal solutions in terms of intermediate inventory, operating costs, resource utilization, or customer service levels and satisfaction.

The benefits of integrating production scheduling and vehicle routing problems are multifaceted, with improvements averaging between 5% and 20% (e.g., Ullrich, 2013 and Meinecke & Scholz-Reiter, 2014b). Companies are increasingly pressured to jointly optimize production schedules and outbound distribution.

First, companies are focusing more on their core competencies than before. Consequently, with more companies participating, the supply chain becomes longer.

Second, trends such as just-in-time management impose perfect coordination between production and distribution. Ideally, distribution should start immediately after production is completed.

Chen (2010) is the first review study on Integrated Production and Outbound Distribution Scheduling ($\text{IPODS}$), proposing a notation scheme for characterizing these $\text{IPODS}$ problems. This extends the well-known three-field notation for scheduling problems developed by Graham, Lawler, Lenstra, & Kan (1979), adding two fields to describe delivery characteristics and the number of customers.

---

### Related Work

To integrate scheduling and delivery problems at the operational level, the classical VRP (Vehicle Routing Problem) must be integrated with production scheduling problems. While the combination of these two problems is a relatively recent and less explored research direction, each problem individually has been well studied in the literature.

Using the keywords $(\text{production}$ $\text{OR}$ $\text{scheduling})$ $\text{AND}$ $(\text{distribution}$ $\text{OR}$ $\text{routing}$ $\text{OR}$ $\text{transportation})$ $\text{AND}$ $(\text{problem})$ in Google Scholar and Scopus, a "backward/forward reference search" was performed. Overall, the sample consists of 65 studies excluding survey studies, published in 33 different journals. The most frequent journals are International Journal of Production Research (13), Computers & Industrial Engineering (7), the European Journal of Operational Research (5), Applied Soft Computing (4), and International Journal of Production Economics (3). We acknowledge that applying the search procedure does not guarantee identification of all relevant papers and may have overlooked some studies. However, we are confident that we have obtained a sufficiently comprehensive literature set to paint a solid picture of integrated scheduling and outbound vehicle routing problems for the period from 2010 to June 2022.

#### Production Environment Types

Production environments can be broadly divided into two categories.

One-operation jobs include all problems where orders require only one operation, classified as 1M1S (single machine at a single production site), 1MMS (single machine at multiple separate production sites), P (parallel machines), etc.

Multiple-operation jobs are classified as FS (flow shop), HFS (hybrid flow shop), JS (job shop), OS (open shop), etc.

#### Delivery Method Types

Delivery method types are divided into four categories based on whether one or multiple vehicles are available and whether vehicles can make multiple round trips during the planning period.

It is not surprising that there are far more studies dealing with one-operation production than multiple-operation production, as the latter category is known to be more difficult.

---

### Method

<img src="https://velog.velcdn.com/images/devjo/post/3f719037-016d-4194-aa93-bf8ac92073a7/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Most papers in the $\text{IPODS}$ problem literature propose $\text{MILP}$ (Mixed-Integer Linear Programming) formulations. A particular aspect of $\text{MILP}$ models lies in the coupling of two problems (scheduling and routing) that are already difficult individually.

The variables of $\text{MILP}$ models can be grouped into the following subsets.

#### Single Machine Scheduling Problem

A formulation for a single machine scheduling problem with one customer, one site per job, and one vehicle with multiple round trips can be expressed as follows. (Here, $\nu$ is the maximum number of round trips, $M$ is a sufficiently large number. $D_j$ is the delivery completion time for job $j$. $s_t$ is the start time of round trip $t$, $e_t$ is the end time of round trip $t$, and $\text{cap}$ is the vehicle capacity.)

$\mathbf{A}$ – Variables and constraints for the scheduling problem

$\Rightarrow$ $x_{j,k}$: Binary variable that is 1 if job $j$ is scheduled at position $k$, 0 otherwise.

$\Rightarrow$ $CP_k$: Completion time of the job at position $k$.

$\Rightarrow$ $C_j$: Completion time of job $j$.

$$
\begin{aligned}
&\sum_{k=1}^n x_{j,k} = 1, \quad \forall j \in \{1, \ldots, n\} \\
&\sum_{j=1}^n x_{j,k} = 1, \quad \forall k \in \{1, \ldots, n\} \\
&CP_k = \sum_{h=1}^k \sum_{j=1}^n p_j x_{j,h}, \quad \forall k \in \{1, \ldots, n\} \\
&C_j \ge CP_k - M(1 - x_{j,k})
\end{aligned}
$$

$\mathbf{B}$ – Variables and constraints for batch definition

$\Rightarrow$ $z_{j,t}$: Binary variable that is 1 if job $j$ belongs to round trip $t$, 0 otherwise.

$\Rightarrow$ $w_j$: Size (or weight) of order $j$.

$$
\begin{aligned}
&\sum_{t=1}^{\nu} z_{j,t} = 1, \quad \forall j \in \{1, \ldots, n\} \\
&\sum_{j=1}^n w_j z_{j,t} \le cap, \quad \forall t \in \{1, \ldots, \nu\}
\end{aligned}
$$

$\mathbf{C}$ – Variables and constraints for vehicle routing

$\Rightarrow$ $y_{i,j,t}$: Binary variable that is 1 if location $i$ is visited before location $j$ in round trip $t$, 0 otherwise. ($i, j \in \{0, 1, \ldots, n\}$, where 0 is the location of the production site.)

$\Rightarrow$ $tt_{i,j}$: Transportation time from location $i$ to $j$.

$$
\begin{aligned}
&\sum_{i=0}^n y_{i,j,t} - \sum_{k=0}^n y_{j,k,t} = 0, \quad \forall t \in \{1, \ldots, \nu\}, \forall j \in \{1, \ldots, n\} \\
&D_j \ge D_i + tt_{i,j} - M(1 - y_{i,j,t}), \quad \forall t \in \{1, \ldots, \nu\}, \forall i, j \in \{1, \ldots, n\}, i \ne j \\
&s_{t_2} \ge e_{t_1}, \quad \forall t_1 \in \{1, \ldots, \nu - 1\}, \forall t_2 \in \{t_1 + 1, \ldots, \nu\}, t_2 > t_1
\end{aligned}
$$

$\mathbf{D}$ – Constraints linking the scheduling, batch, and vehicle routing problems

$$
\begin{aligned}
&s_t \ge C_j - M(1 - z_{j,t}) \\
&D_j \ge s_t + tt_{0,j} - M(1 - z_{j,t}) \\
&e_t \ge D_j + tt_{j,0} - M(1 - z_{j,t}) \\
&\sum_{i=0}^n y_{i,j,t} = z_{j,t}
\end{aligned}
$$

These ensure that the vehicle cannot depart before the job is completed. They link the start time of the batch with the delivery date of the job.

#### Objective Function

The objective function minimizes classical expressions of job delivery completion times (e.g., $D_{max} = \max_{j \in \{1, \ldots, n\}} D_j$ or $\sum D_j$), or is related to delivery tardiness (e.g., $T_{max} = \max_{j \in \{1, \ldots, n\}} T_j$ (where $T_j = \max(0, D_j - d_j)$) or $\sum T_j$).

#### Production with One-Operation Jobs

In the single machine - single vehicle - single round trip topic, Viergutz & Knust (2014) introduce the work of Armstrong, Gao, & Lei (2008). This paper considers a situation where a single machine and a single vehicle with unlimited capacity deliver all orders in one large round trip. Production and delivery follow the same given order. The objective is to maximize the sum of weights of realized customer orders, where a customer order is considered 'realized' when delivery occurs within a predefined time window and the maximum shelf life is respected.

In the single machine - single vehicle - multiple round trips topic, Cheref, Artigues, Billaut, & Ngueveu (2016) aimed to minimize the time when the vehicle returns after the last round trip and minimize the sum of delivery dates.

In the single machine - multiple vehicles - single round trip topic, Low, Li, & Chang (2013) propose an adaptive genetic algorithm including $\text{MILP}$ and local search, aiming to minimize the time when the last vehicle returns to the depot. The solution representation is a customer order, feasible round trip sets are calculated, and a heuristic based on Johnson's algorithm for the $\text{F2}||C_{max}$ problem is used to determine the production schedule, after which each round trip is improved with 2-opt local search.

In the single machine - multiple vehicles - multiple round trips topic, Devapriya, Ferrell, & Geismar (2017) present $\text{MILP}$ and heuristics under the objective of minimizing total travel cost and idle cost for vehicles, where Prins (2004)'s Split algorithm creates round trips from a giant tour, aiming to construct schedules with small total idle time. They also propose a lower bound, a classical genetic algorithm, and two variants of memetic algorithms.

#### Production with Multiple-Operation Jobs

In the single vehicle - multiple round trips topic, Yagmur & Kesen (2020) consider a permutation flow shop scheduling problem. All jobs to be delivered in the same round trip are produced consecutively before switching to jobs of another round trip. The objective is to minimize the sum of total tardiness and travel time. The authors propose a memetic algorithm using $\text{MILP}$ and scheduling permutations to represent solutions. Abreu, Tavares-Neto, & Nagano (2021) consider an open shop with a single vehicle of limited capacity. The objective is to minimize the date when the vehicle returns after the last round trip. The authors propose $\text{MILP}$, greedy insertion algorithm, iterated greedy algorithm, biased random key genetic algorithm, and a hybridization of greedy insertion and biased random key genetic algorithm.

In the multiple vehicles - single round trip topic, Mohammadi et al. (2018) study a permutation flow shop with multiple vehicles of different capacities. The objective is to minimize the date when the latest vehicle returns to the depot. The authors propose $\text{MIP}$ and an improved $\text{ICA}$. The solution is represented by two arrays. The first part is a job permutation representing the production order in the flow shop, and the second part limits the delivery batches and represents the delivery order of each batch.

In the multiple vehicles - multiple round trips topic, Wang et al. (2020) study a make-to-order production environment in e-commerce (very similar to restaurant takeout and catering services). The hybrid flow shop has three stages with very different specifications. The first stage has setup times depending on the order, representing a picking problem collecting customer order items from the warehouse. The second stage represents the packing problem of orders, and the third stage represents a multi-terminal conveyor where each terminal represents a geographical center. A dedicated vehicle handles all deliveries. For this reason, the assignment of one of the third-stage machines for customer orders is fixed in advance. The objective is to minimize the latest delivery date. The authors propose $\text{MILP}$ and three heuristics. The first heuristic is a classical $\text{VNS}$ with local search added after $\text{shaking}$. The second is a constructive heuristic called "four-layered constructive heuristic method combined with VNS", and the last is a hybridization of the first two.

---

### Conclusion

In situations where both storage possibilities and waiting times between customer orders and product delivery are reduced, integrating production scheduling and distribution problems can bring significant improvements in performance measures. Companies have diverse production environments and delivery methods ($\text{3PL}$ provider delivery, company vehicle delivery, etc.), and the real-world problems of integrating scheduling and delivery are very diverse. This is why integrated solution approaches for scheduling and outbound vehicle routing problems are increasingly studied in the academic literature.

This state-of-the-art review covers papers where the production scheduling part precedes the vehicle routing part, and the two problems are interconnected. Some notation has been introduced and a general $\text{MILP}$ model has been presented.

This review presented papers considering one-operation jobs, covering single or parallel machine production environments, single or multiple production sites, one or multiple vehicles, and cases where each vehicle can make one or multiple round trips. Subsequently, multiple-operation problems were studied, again covering one or multiple vehicles and cases where each vehicle can make one or multiple round trips.

Most papers in the literature propose $\text{MILP}$ formulations, solve small instances using commercial solvers, and present one or more heuristics to solve larger instances, as the complexity of these problems is such that exact methods do not work well.

Future research efforts should focus on exact approaches for integrated scheduling and outbound vehicle routing problems. While many previous studies have proposed exact approaches for various scheduling problems and distribution problems, research on exact methods for integrated problems is particularly scarce when there is more than one machine and more than one vehicle.

---

### References

[Original Source #1](https://www.sciencedirect.com/science/article/pii/S0377221722010050)

---
title: 'A review of multi-objective optimization: Methods and its applications'
date: '2024-04-15'
tags: ['optimization', 'paper review']
---

### Abstract

There are two methods in Multi-Objective Optimization (MOO) that can simplify problems without requiring complex mathematical equations: the Pareto method and the Scalarization method.

In the Pareto method, there exist dominated and non-dominated solutions, which are derived through continuously updated algorithms. On the other hand, the scalarization method transforms multiple objective functions into a single objective function using weights to generate a single solution.

There are three weight methods in scalarization: equal weights, rank order centroid weights, and rank-sum weights.

Additionally, solutions obtained through the Pareto method serve as components of MOO performance indicators to derive compromise solutions and can be visualized in the form of a Pareto optimal front. In contrast, solutions from the scalarization method are integrated into the fitness function as components of performance indicators in the form of scalar functions.

---

### Introduction

Optimal values can be found through an optimization process. Problems can have either a single objective function or multiple objective functions, and these types of problems appear in various fields of daily life such as mathematics, engineering, social sciences, economics, agriculture, aviation, and automotive.

An example of MOO application in the economic field (Mardle, Pascoe, & Tamiz, 1998) is the optimization of fisheries bioeconomic models. This model can be used as a tool to evaluate the effectiveness of optimal estimation and management plans for resource overfishing. The case studied by the authors is a model for North Sea fisheries, considering the following four objectives:

1. Profit maximization

2. Maintaining historical quota ratios between countries

3. Maintaining employment within the industry

4. Minimizing resource waste

In the financial field (Horn, Nafpliotis, & Goldberg, 1994; Ruspini & Zwir, 1999; Tapia & Coello, 2007; Zwir & Ruspini, 1999), the Niched-Pareto Genetic Algorithm (NPGA) is used to identify technical analysis patterns in financial time series. Here, two objectives are considered: one is the quality of pattern matching, and the other is size and time interval. This algorithm allows for appropriate exploration of upward, downward, and head-and-shoulders pattern intervals.

As such, MOO problems have various solutions, and the main solutions are as follows:

__1. global criterion method__: Defines multiple criteria points as ideal solutions and minimizes the distance to the objective space based on these criteria. Converts multiple objective functions into a single optimization problem.

__2. weighted-sum method__: Combines multiple objective functions into a single problem using a weight vector. While it has the advantage of simple implementation with weights typically normalized to 1, it has disadvantages such as difficulty in selecting appropriate weights for problems with different scales, potential biased trade-offs, and ineffectiveness in non-convex cases.

__3. multi-objective evolutionary method__: A stochastic optimization technique that searches for Pareto solutions, calculates objective function values for candidate solutions in each generation, and generates the next generation based on dominance relationships.

---

### Methods

The motivation for using MOO is that it can simplify problems without requiring complex equations. In MOO, decision-making problems enable trade-offs between conflicting factors. MOO was introduced by Vilfredo Pareto.

In MOO, there exists a vector of objective functions. Each objective function vector is a function of the solution vector. In MOO, there is no single optimal solution that satisfies all objectives simultaneously; instead, multiple optimal solutions exist.

Mathematically, an MOO problem can be expressed as follows:

$$
f_{1.opt} = min(f_1(x)) \\
f_{2.opt} = min(f_2(x)) \\
f_{3.opt} = min(f_3(x)) \\
f_{n.opt} = max(f_n(x))
$$

Here, x is the solution, n is the number of objective functions, and $f_k(x)$ is the k-th objective function. In MOO, there exists a multi-dimensional space of objective function vectors and a decision variable space of solution vectors. Each solution x in the decision variable space corresponds to a point in the objective function space. The mapping between these solution vectors and objective function vectors is explained in the image below.

<img src="https://velog.velcdn.com/images/ski06043/post/d155e8a6-35ac-462e-81c3-316e9b0dd1db/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

To determine convexity through this mapping, all objective functions and solution spaces must also be convex. In $f(\theta x + (1-\theta)y) \le \theta f(x) + (1-\theta)f(y)$, x and y belong to the domain of function f, and $\theta$ is a value in the range [0, 1].

In MOO, dominated solutions and optimal values are typically achieved when the value of one objective function cannot be further improved, a condition called Pareto optimality. Solutions that can improve one objective function without affecting others are called non-dominated, while the opposite are called dominated.

<img src="https://velog.velcdn.com/images/ski06043/post/f46f8ad3-5402-4cf8-9eb4-8069e2cd5401/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

For two objective functions $f_1(x)$, $f_2(x)$ with different objectives, the Pareto optimal front can appear in three combinations:

1. If f_1(x) is to be minimized and f_2(x) is to be maximized, it forms a convex shape descending from the right

2. If f_1(x) is to be maximized and f_2(x) is to be minimized, it forms an upper convex shape descending to the left

3. If f_1(x) is to be maximized and f_2(x) is to be maximized, it forms an upper convex shape ascending to the right

When the ideal point obtained at the intersection of the maximum and minimum values of each objective function is called the utopia point, the optimal value closest to this point can be found using Euclidean distance. However, if there are more than 3 objective functions, visualization of the POF becomes difficult.

#### Continuously Updated method

This method is used to explore non-dominated solutions and continuously updates their set to find better solutions.

The initial non-dominated solution set is set as P'=1, i=2, j=1. When comparing the i-th solution with the j-th solution in P', if the i-th solution dominates the j-th solution, j is removed from the set and j is incremented for comparison again. In the opposite case, i is incremented for comparison again. If j no longer exists, i is added to the non-dominated solution set.

The optimal value at this point can be found through the following equation:

$$
d_E = min\sqrt{(\frac{Q_1 - Q^*_1}{Q_1norm})^2+(\frac{Q_2 - Q^*_2}{Q_2norm})^2}
$$

Here, $Q_1$, $Q_2$ are the utopia point coordinates, and norm is a normalization coefficient determined based on the minimum value of each coordinate.

#### Scalarization method

The scalarization technique transforms multiple objective functions into a single solution and determines weights before the optimization process. It is defined by the following scalar fitness function:

$$
F(x) = w_1f_1(x) + ... + w_nf_n(x)
$$

There are three ways to determine weights for each objective function:

1. equal weights: $w_i = 1/n$

2. rank order centroid weights: $w_i = (1/n) * \sum_{k=i}^{n} (1/k)$

3. rank-sum weights: $w_i = \frac{2(n+1-i)}{n(n+1)}$

In this method, objective functions to be minimized are represented as negative, and those to be maximized are represented as positive. Normalization using root mean square is necessary to ensure fairness between functions.

$$
F(x) = -\frac{w_1f_1(x)}{\sqrt{E(f_1^2(x))}} \\
+ \frac{w_2f_2(x)}{\sqrt{E(f_2^2(x))}} \\
- \frac{w_3f_3(x)}{\sqrt{E(f_3^2(x))}}
$$

In the above equation, F(x) is the fitness function, f_k(x) is the objective function, and w_k represents the weight.

---

### Applications of method

#### 1. Pareto

In an optimization case for selecting relay nodes in an ad-hoc network, Pareto was used for throughput, load balancing, power consumption, etc.

In outdoor building environments, free space propagation is used, with some parameter adjustments and shadowing reflection. In this environment, node power consumption can be calculated as follows:

$$
P_t = kP_rd^{\alpha}10^{X_{\psi}/10}
$$

In indoor building environments, where network nodes are placed inside buildings separated by walls, the calculation is done by reflecting the wall penetration coefficient and number of walls as follows:

$$
P_t = kP_rd^{\alpha}10^{X_{\psi}/10}*\frac{1}{\Pi_{M}^{m-1} \psi^2(m)}
$$

When determining the optimal solution in relay node selection using complete enumeration with Euclidean distance, a 3-dimensional POF is drawn for power consumption, throughput, and load in external conditions, and the same three criteria POF is drawn in internal conditions. It is reported that this took 61.1 hours.

#### 2. Scalarization

Cross-layer optimization is used for optimal relay selection in multi-hop wireless ad-hoc networks, where fairness is given to each resource and equal weights are assigned. Each environment has 32 nodes, with node 1 as the transmitting node and node 32 as the receiving node, and the rest assumed to be relays. The path pair combinations consist of 3-hop and 3-hop, with a total of (N-2)(N-3)P_2^{(N-2)-2} combinations.

The scalarization technique determines optimal values using a Genetic Algorithm (GA), which took 13.96 hours in a 500-iteration search. Also, when different weights are set for each function, the optimal path pairs change, and it was reported to be about 3.72 times faster than the complete enumeration method.

---

### References

[Original Path #1](https://www.tandfonline.com/doi/full/10.1080/23311916.2018.1502242)




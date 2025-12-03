---
title: 'Motion planning'
date: '2024-11-27'
tags: ['Robotics', 'Manipulation', 'lecture']
---

### Motion Planning

#### Inverse Kinematics, IK

Inverse kinematics (IK) is a key technique required for planning motion trajectories. If forward kinematics provides the mapping from joint angles $q$ to the gripper pose $X$, i.e., $X^G = f_{kin}(q)$, then IK is the problem of finding its inverse.

Rather than viewing IK as simply solving $q = f^{-1}_{kin}(X^G)$, we treat it as the general problem of finding joint angles under a rich library of cost terms and constraints.

#### IK as Constrained Optimization

<img src="https://velog.velcdn.com/images/devjo/post/82369874-9f35-40a1-8a1f-2a441c45d934/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

Instead of explicitly solving the inverse kinematics equations, we formulate IK as the optimization of the objective $\\underset{q}{min} \\lVert q - q_0 \\rVert^2$. When there are multiple joint configurations that achieve the same end-effector pose, we prefer the one closest to the nominal joint configuration $q_0$.

To highlight the difference between a nonlinear IK formulation and differential IK, we can add an obstacle right in front of the robot. Since both the differential IK formulation and the full IK formulation can incorporate collision-avoidance constraints, both solutions will attempt to keep the arm from colliding with the post.

As another example, consider using IK to grasp a cylinder, which you can think of as a handrail. Suppose that we do not care about the rotation around the cylinder’s axis; any orientation around that axis is acceptable. Then we must formulate the IK problem using a cost that only penalizes the minimum violation of such constraints.

---

### Global Inverse Kinematics

Global inverse kinematics is an approach to solving generalized IK problems with complex costs and constraints while avoiding local minima and providing guarantees of global optimality.

Standard IK can address a broader class of problems, but it does not guarantee success, nor does it guarantee small, smooth changes in the solution when the task changes slightly. In contrast, differential IK excels at producing smooth trajectory tracking in joint space.

---

### Kinematic Trajectory Optimization

Understanding the optimization viewpoint of inverse kinematics is very helpful for understanding kinematic trajectory optimization. Instead of solving many IK problems independently, the basic idea is now to solve for an entire sequence of joint configurations in a single optimization.

$$
\\begin{aligned}
&\\underset{\\alpha, T}{min} \\; T, \\\\
&X^{G_{start}} = f_{kin}(q_{\\alpha}(0)), \\\\
&X^{G_{goal}} = f_{kin}(q_{\\alpha}(T))
\\end{aligned}
$$

There are many ways to parameterize a trajectory using polynomials. For example, in dynamic motion planning, direct collocation methods use piecewise cubic polynomials to represent the state trajectory, while pseudo-spectral methods use Lagrange polynomials. In each case, the basis functions are chosen so that the algorithm can exploit specific properties of the basis. In dynamic motion planning, considerable emphasis is placed on the integration accuracy of the dynamics in order to obtain feasible solutions that satisfy dynamic constraints.

#### B-spline Trajectory

The derivative of a B-spline is still a B-spline, and its coefficients depend linearly on the original coefficients. The basis itself is non-negative and sparse. This gives a strong geometric interpretation to the coefficients of the B-spline polynomial, called control points. In particular, the entire trajectory is guaranteed to lie inside the convex hull of the active control points (those whose basis functions are nonzero).

---

### Sampling-based Motion Planning

Sampling-based planning methods were developed to address the local minima issues of trajectory optimization.

RRT (Rapidly-exploring Random Trees) rapidly expands a tree that explores the space randomly to find a path that connects the start configuration to the goal region. PRM (Probabilistic Roadmap) generates random samples in the configuration space (C-space) and uses them as vertices of a graph, then connects neighboring vertices with collision-free line segments to construct a roadmap. In the query phase, it searches this graph to find the shortest path.

---

### Motion Planning with Graphs of Convex Sets

<img src="https://velog.velcdn.com/images/devjo/post/a0b19c0d-ff2a-4059-8d20-566f50f47435/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

Graphs of Convex Sets (GCS) are a new approach that combines the rich constraint-handling capabilities of trajectory optimization with the global reasoning power of sampling-based planning. Instead of adding isolated points in configuration space as in PRM, each sample is expanded into a convex region of the configuration space. Each vertex of the graph is associated with a convex set, and when we visit a vertex we may select a point from its associated convex set.

To formulate motion planning as a GCS problem, we assume we are given a convex decomposition of the collision-free space. A vertex is not the convex region itself in C-space, but rather a set of $2n$ variables representing the two points, called `start` and `last`, that can be chosen within that region.

#### Time-Optimal Path Parameterizations, TOPP

Once a motion plan has been obtained, the next question is how to execute that plan as fast as possible while satisfying limits on velocity, acceleration, and torque.

We define the trajectory $q(t)$ as

$$
q(t) = r(s(t))
$$

where $r(s)$ is a scalar path parameterization along the path and $s(t)$ is the parameterization with respect to time. Using this, we can express the velocity $\\dot{q}$ and acceleration $\\ddot{q}$ as

$$
\\begin{aligned}
&\\dot{q} = r'(s)\\dot{s}, \\\\
&\\ddot{q} = r''(s)\\dot{s}^2 + r'(s)\\ddot{s}
\\end{aligned}
$$

---

### References

[Original source #1](https://manipulation.csail.mit.edu/trajectories.html#section3)



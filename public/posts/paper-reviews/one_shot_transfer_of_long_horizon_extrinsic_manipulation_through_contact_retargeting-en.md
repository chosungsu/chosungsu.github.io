---
title: 'One-Shot Transfer of Long-Horizon Extrinsic Manipulation Through Contact Retargeting'
date: '2025-05-24'
tags: ['robotics', 'paper review']
---

### Abstract

Extrinsic manipulation refers to exploiting contacts with the environment in order to achieve manipulation goals, thereby enabling strategies that are impossible with a simple parallel jaw gripper alone.

However, organizing long horizon contact interactions among the robot, object, and environment is very challenging because of scene diversity, a large action space, and complex contact dynamics.

In this paper, the authors observe that many extrinsic manipulation behaviors can be decomposed into compositions of short horizon primitive actions, and that the success of each primitive strongly depends on starting from a desirable contact configuration.

They therefore design a framework that prepares a single library of robust, goal conditioned short horizon primitive policies and constructs state constraints derived from the contact specifications of each primitive.

Given a single demonstration that specifies the test scene and the sequence of primitives, the method applies the state constraints to the test scene and uses inverse kinematics to find intermediate goal states, which are then tracked by the primitive policies.

---

### Introduction

Extrinsic manipulation, which is a relatively recent topic in robotic manipulation research, uses contacts with the environment to assist manipulation. By leveraging environmental contacts, a simple parallel gripper can execute complex tasks that would otherwise be infeasible. For example, an object in an initially ungraspable pose can be made graspable by first executing a sequence of pregrasp actions such as pushing, pivoting, and pulling.

Achieving extrinsic manipulation requires orchestrating contact interactions among the robot, the object, and the environment in a holistic manner. In particular, the robot must handle a wide variety of object and environment geometries that occur in the real world. Early work pursued explicit modeling of contact dynamics for control synthesis, but the inherent difficulty of contact modeling limited those approaches to known objects and relatively simple geometries.

More recent work on extrinsic manipulation has attempted to use reinforcement learning to learn policies that generalize to novel objects. To the best of the authors’ knowledge, however, none of these methods successfully generalize to novel environments. Moreover, many applications in manipulation, such as occluded grasping, inherently require long horizon planning with multiple contact transitions. To address the difficulty of generating such long horizon plans, several methods have attempted to leverage demonstrations, but achieving contact rich manipulation can require hundreds of demonstrations per task.

Instead of directly solving the full long horizon extrinsic manipulation problem, the authors propose to tackle two subproblems. First, they aim to obtain primitives that are robust to variations in objects and environments for a given contact configuration. Second, they aim to initialize each primitive in a desired contact configuration. They further observe that, for a given manipulation goal, the sequence of primitives is often fixed. For example, occluded grasping, in which an object is pushed against an obstacle and then pivoted to expose a graspable edge, typically follows a push pivot grasp sequence. By collecting task demonstrations that fix the sequence of contacts, the method can avoid combinatorially complex contact sequence planning.

---

### Related works

#### Manipulation using environment contacts

In many manipulation scenarios, objects are pushed or slid along flat environmental surfaces such as tables or walls. To synthesize such motions, early approaches often relied on hand designed strategies or analytic physical models. Because of the intrinsic difficulty of modeling contact rich motion, these methods were typically restricted to known objects and simple geometries. In contrast, more recent work uses reinforcement learning to obtain feedback policies, which can be significantly more robust and can in some cases generalize to geometries not seen during training.

#### Composing primitives for long-horizon manipulation

Divide and conquer is a popular strategy for handling long horizon manipulation. A typical approach is to use the parameterized action MDP framework to decompose the task into shorter primitives. The main challenge in primitive based approaches is to ensure the composability of the primitives so that they can be sequenced reliably.

#### Demonstration for manipulation

The use of demonstrations for robot manipulation has received significant attention in recent years. Although modern systems have reduced the barrier to collecting demonstrations, training policies still remains expensive due to the large number of samples required. Individual tasks may need between 50 and more than 500 demonstrations.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/fbf96902-6785-4a7a-800e-501d51e43c57/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### Problem Definition

The authors consider quasi static extrinsic manipulation of an object with geometry $O \in \mathcal{O}$ in an environment $E \in \mathcal{E}$ using a 7 degree of freedom robotic arm with a 1 degree of freedom parallel gripper. The robot system has state $q \in \mathcal{Q} \subset \mathbb{R}^8$, and the pose of the object is denoted by $x \in \mathcal{X} \subset SE(3)$. They write $s_t \triangleq (x_t, q_t) \in \mathcal{S} \triangleq \mathcal{X} \times \mathcal{Q}$ for the system state, and denote the control input by $u \in \mathcal{U} \subset \mathbb{R}^8$. The system is governed by discretized dynamics that depend on the environment and object.

$$
s_{t+1} = {}^{E, O}f(s_t, u_t)
$$

Thus a trajectory of length $T+1$ is described by $\{{}^{E, O}s_t\}_{t=0, 1, \dots, T}$.

#### Generalizing Extrinsic Manipulation Demos with Contact Retargeting

<img src="https://velog.velcdn.com/images/devjo/post/643514d2-eef7-4455-8ed9-cc9430f0a887/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

The proposed approach is based on the following observations.

$\Rightarrow$ A long horizon extrinsic manipulation task can be decomposed into a sequence of primitives defined by contact transitions.

$\Rightarrow$ A small set of primitives is sufficient to capture many extrinsic manipulation behaviors.

$\Rightarrow$ The success of each primitive strongly depends on satisfying a desired contact configuration $\sigma$.

$\Rightarrow$ Under Assumptions 2 and 3 in the paper, satisfying $\sigma$ amounts to choosing a state $x$ that depends on the environment.

To handle a short horizon extrinsic manipulation task starting from a single contact configuration $\sigma_i$, the goal conditioned policy $\pi_{\sigma_i}$ is introduced.

$$
s_{t+1} = {}^{E, O}f(s_t, \pi_{\sigma_i}(s_t; \mathcal{E}, \mathcal{O}, \mathcal{G}_i))
$$

The four primitive actions push, pivot, pull, and grasp are controlled using joint impedance control and operational space control.

The contact configuration $\sigma$ is implemented as a state constraint in an inverse kinematics problem. States satisfying this constraint belong to the set ${}^{E, O}\sigma$, although the set itself is not explicitly enumerated in practice. For example, the fingertips of the gripper are constrained to roughly contact the top of the object by finding the four vertices of the object’s bounding box with the highest world frame $z$ coordinate and then taking their geometric center. The fingertips are also constrained to contact the object on the side opposite the wall object contact with zero distance between the object and the fingertips. The end effector is placed so that closing the gripper achieves a top down grasp on the object.

---

### Conclusion

This work retargets demonstration trajectories to test scenes by enforcing contact constraints with inverse kinematics at each contact transition. The resulting retargeted trajectories are then tracked by a sequence of short horizon policies, each associated with a particular contact configuration. On four challenging long horizon extrinsic manipulation tasks, the method achieves an overall success rate of $81.7%$ on real world objects.

Future directions include extending the method to leverage language based or simulation based demonstrations and further generalizing the contact retargeting formulation.

---

### References

[Original Source 1](https://arxiv.org/pdf/2404.07468)

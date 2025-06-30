---
title: 'Escaping local minima : Hybrid artificial potential field with wall-follower for Decentralized multi robot navigation'
date: '2025-04-02'
tags: ['robotics', 'paper review']
---

### Abstract

This paper addresses the problem of decentralized multi-robot navigation in environments with non-convex obstacles given only incomplete environmental information. Reactive methods such as Artificial Potential Field (APF) provide simplicity and efficiency but suffer from the problem of robots getting trapped in local minima due to lack of global environmental awareness. Other existing solutions either rely on inter-robot communication, are limited to single-robot scenarios, or struggle to effectively overcome non-convex obstacles.

Therefore, the method proposed here uses only local sensors and state information without maps. By integrating wall-following (WF) behavior into the APF approach, our method enables robots to escape from local minima even in the presence of non-convex and dynamic obstacles including other robots.

---

### Introduction

Multi-robot navigation faces several challenges due to the need for coordination and collision avoidance with both static and dynamic obstacles including other robots. In environments with limited wireless communication, such as complex indoor environments or vast outdoor spaces, centralized methods face problems such as single point of failure and incomplete state information, making them unreliable in large and dynamic environments.

Distributed approaches such as Optimal Reciprocal Collision Avoidance (ORCA) and Control Barrier Functions (CBF) provide alternatives using local sensor data. However, these methods can experience deadlock situations where robots stop due to conflicting objectives between goal pursuit and collision avoidance. Additionally, ORCA and CBF often require local maps and states of nearby robots, which can be computationally expensive or difficult to obtain.

Mapless navigation is ideal when building a common map is impractical. A well-known method for mapless navigation is Artificial Potential Field (APF), which is commonly used in multi-robot systems. However, APF suffers from the local minima problem where robots can get trapped between the attractive force of the goal and the repulsive force of obstacles in non-convex environments. A common approach to overcome these local minima is to combine APF with Wall-Following (WF). WF is a reactive method that allows robots to detect and follow obstacle boundaries without complete environmental information.

The method proposed in this study is a distributed system using two different switching schemes. The first triggers a rule-based switch based on local sensor data. The second enhances the rule-based switch with a vision transformer and uses a learned switch to reduce the phenomenon of robots moving side by side.

---

### Related work

Wall-following (WF) is another reactive method frequently used to detect and follow boundaries for exploring unknown spaces. Early algorithms such as Bug1 and Bug2 guarantee completeness for single robots in static environments, while TangentBug requires precise geometric information of obstacles. MRBug extends WF to multi-robot systems but relies on inter-robot communication, making it unsuitable for distributed approaches. Recent algorithms such as Swarm Gradient Bug and Swarm Bug have applied WF to multi-robot navigation without detailed maps but still rely on communication. OA Bug combines WF with olfactory and auditory sensors to avoid dependence on maps and communication, but relies on fixed WF directions for collision avoidance, reducing efficiency.

µNAV dynamically switches between APF and WF by adjusting transition weights. Although it provides theoretical completeness in non-convex environments, its applicability is still limited to single-robot static settings. Recent developments such as RPF and DACOOPA have extended APF-WF strategies to multi-robot systems. These integrate WF to escape local minima and manage inter-robot collisions but still struggle in non-convex environments and complex real-world scenarios.

---

### Problem description

Considering the decentralized multi-robot navigation problem where robots must reach their goals within finite time T, the objective is to operate in unknown environments while avoiding each other locally without prior maps or communication.

Each robot R_i with radius r operates in a 2D space W ⊂ R² containing unknown obstacles W_obs and free space W_free = W/W_obs. At time t, each robot is described by s_i(t) = [x_i(t), y_i(t), ψ_i(t)] where the angle ranges from (-π, π]. The task is considered successful when R_i reaches within a small tolerance ε > 0 of g_i and |p_i(t_i) - g_i| ≤ ε.

In the robot's internal local frame RF, the robot heading is aligned with the positive x-axis and the positive y-axis is aligned with the robot's right direction. For example, in the initial frame, the current state is x_i^IF(t) = [x_i^IF(t), y_i^IF(t), ψ_i^IF(t)].

---

### Preliminary : APF

APF aims to guide robots to goals while avoiding obstacles based on omnidirectional distance sensor data. Each robot calculates attractive force (F_att) for moving toward the goal and repulsive force (F_rep) for avoiding obstacles.

The goal vector in the robot frame (g_rel(t)) is calculated based on the robot's goal g^IF and current relative state s^IF(t).

$$
F_{att}(g_{rel}(t)) = \nabla U_{att}(g_{rel}(t))=g_{rel}(t)
$$

From the above equation, the attractive force can be obtained where U_att(g_rel(t)) is the attractive potential, which is |g_rel(t)|²/2. Next, the repulsive force is calculated from the repulsive potential U_rep(L(t)) ∈ R where L(t) = {l₁(t), l₂(t), ..., l_M(t)} is the set of k-th sensor ray vectors with resolution τ. H = {∀h ∈ {1, 2, ..., M} | 0 < |l_h(t)| < d_max} contains the indices of these ray vectors. Therefore, the repulsive force is calculated as follows.

$$
F_{rep}(L(t)) = \nabla U_{rep}(L(t)) = \sum_{h \in H} (-\frac{1}{|l_h(t)|^3})*(\frac{l_h(t)}{|l_h(t)|})
$$

The repulsive potential is ∑_{h∈H} 1/(2|l_h(t)|²). Next, the total force vector F_tot ∈ R² is calculated as follows.

$$
F_{tot}(t)=\gamma F_{att}(g_{rel}(t))+\sigma F_{rep}(L(t))
$$

Here, γ ∈ R⁺ and σ ∈ R⁺ are weight values for attractive and repulsive forces respectively. The total force determined by this balance decides the robot's next movement direction. If this magnitude approaches zero, the robot falls into a local minimum.

---

### Method

For decentralized mapless navigation, we propose an APF-WF method with two different switching schemes: Rule-based Switch (RS) and Learned Switch (LS). The transition between APF and WF depends on θ_rot generated by RS or LS. In conventional methods, the calculated force vector can cause significant motion oscillation due to continuous encounters with dynamic obstacles. This is because WF depends solely on the tangential direction of the nearest obstacle. To prevent such inefficient navigation, we propose a new approach that enables smoother transitions between APF and WF by gradually rotating the attractive force using omnidirectional observations.

Specifically, in the rotated attractive force F'_att = R(θ_rot) · F_att, θ_rot is the rotation angle and R is a 2D rotation matrix. It is normalized to have maximum magnitude d_max to prevent excessive influence in the direction opposite to the goal. The total force is given by F_tot(t) = wF'_att(g_rel(t)) + (1-w)F_rep(L(t)).

#### 1. Rule based Switch(RS)

The mode is determined based on the θ_rot value updated at each time t. If this value is 0, it's APF mode; otherwise, it's WF mode. Each robot maintains states at each t, t_hp, t_lp where hit point represents transition from APF to WF and leave point means the opposite transition. Along with the state at t, previous hp and lp states are stored in S^IF. This information is used to prevent robots from repeating loop paths around obstacles.

When a transition occurs, S^IF(t_lp) is updated, while s^IF(t_hp) is only updated when |g_rel(t)|, the distance from current position to goal, is smaller than |g_rel(t_hp)|, the distance from previously stored hp to goal. This prevents the phenomenon of robots moving further from the goal.

Based on the total force vector and WF direction, θ_rot is updated to continuously rotate the attractive force direction so that the robot can escape local minima using WF and return to APF. When the magnitude falls below a threshold f_thr experimentally set to 0.5*d_max, the robot updates θ_rot by adding θ_upd multiplied by the WF direction I_dir. The small value of θ_upd ensures gradual changes in the robot for smooth adjustment. This allows gradual return to APF mode by reducing that angle to 0 once escaping the local minimum.

#### 2. Learned Switch(LS)

While RS worked effectively in most cases, simple rules struggle in complex interactions and can lead to false positives, i.e., false-WF. For example, when robots treat each other as static obstacles, they may perform endless WF, or when facing each other in narrow passages, they may simultaneously move backward.

To solve this problem, we integrated a neural network-based switch using a ViT encoder. The input is o_obs of size M+17, consisting of M distances and 17 dimensions at t.

These vectors are stacked into observation matrix O(t) ∈ R^(T_seq × (M+17)) over T_seq time steps. When t < T_seq, the matrix is padded by repeating the initial observation vector o_obs(0). The encoder architecture has patch size 1 × (M+17), allowing the model to apply Multi-Head Attention across time steps.

---

### conclusion

We proposed a distributed, mapless multi-robot navigation method combining APF and WF to overcome local minima problems in non-convex environments. Using rule-based and learning-based switching schemes, our approach enables collision-free navigation using only local sensors without communication. Experimental results showed some decline as the number of robots increased but demonstrated excellent results close to 30% better than baseline and were effective in reducing collisions in narrow spaces.

---

### References

[Original Paper #1](https://arxiv.org/pdf/2409.10332)




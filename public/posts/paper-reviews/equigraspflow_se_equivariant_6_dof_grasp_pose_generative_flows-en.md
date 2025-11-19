---
title: 'EquiGraspFlow: SE(3)-Equivariant 6-DoF Grasp Pose Generative Flows'
date: '2025-10-06'
tags: ['embodied ai', 'paper review']
---

### Abstract

Traditional methods that synthesize 6-degree-of-freedom (6-DoF) grasp poses from 3D observations often rely on geometric heuristics, leading to poor generalization, limited grasp options, and high failure rates.

Recently, data-driven approaches using generative models have been proposed to learn the distribution of grasp poses and produce diverse candidates. Their main drawback is the lack of $\text{SE}(3)$ invariance, meaning the generated grasp poses do not transform correctly when objects rotate or translate.

We propose EquiGraspFlow, an $\text{SE}(3)$-equivariant 6-DoF grasp pose generative model that can learn complex conditional distributions on the $\text{SE}(3)$ manifold while guaranteeing $\text{SE}(3)$ equivariance.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/18decfcd-2b66-4570-8966-ceb82821dccc/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Synthesizing 6-DoF grasp poses from 3D observations of objects is a fundamental task in robotics. Approaches that generate only a limited set of grasps face a high risk of failure, especially in constrained settings. Obstacles or kinematic constraints may prevent the robot from reaching particular grasp candidates, so having a more diverse set of options increases success probability.

Early approaches relied on geometric heuristics that propose multiple candidates based on object geometry. They typically identify antipodal surface points—pairs of surface points with opposing normals—as fingertip contact points. However, relying on antipodal points limits grasp diversity and makes the method sensitive to noise in observed surface points and normals.

Data-driven approaches have recently gained attention. They first generate a sufficiently diverse set of grasps in simulation, then use this data to learn the grasp pose distribution and train a generative model. The trained model can produce varied poses and remain robust to observation noise through domain randomization.

Existing generative models, however, fail to produce consistent grasps for rotated objects, often resulting in severe failures. Ideally, the model should output grasp poses that transform identically when the object is rotated or translated, as illustrated. Such models are $\text{SE}(3)$-equivariant. Despite attempts with data augmentation, prior methods cannot guarantee this property.

Specifically, we adopt the Continuous Normalizing Flows (CNFs) framework, which leverages time-dependent velocity fields composed of infinitely many infinitesimal transformations to learn complex distributions more effectively than diffusion models or discrete normalizing flows.

---

### Related works

#### 1. Generative Models for Grasping

Mousavian et al. developed 6-DoF GraspNet, a VAE-based grasp pose generator that refines samples using an additional learned grasp evaluator.

Urain et al. proposed $\text{SE}(3)$ diffusion models, named $\text{SE}(3)\text{-DiffusionFields}$, for grasp pose generation.

Despite these advances, existing generative models do not fully exploit $\text{SE}(3)$ equivariance. They rely on augmentation or only achieve partial equivariance under specific assumptions.

#### 2. Equivariance for Grasping

Zhu et al. incorporated $\text{SE}(2)$ equivariance to generate planar grasps from top-down images, improving sample efficiency.

Huang et al. constructed Edge Grasp Network, an $\text{SE}(3)$-invariant grasp quality function that enhances quality prediction for 6-DoF grasps.

However, these methods are not generative; they either produce limited grasp sets or depend on heuristics that lack diversity.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/2773cbe7-5fee-4ae3-ad16-2a9098bf0937/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

We introduce EquiGraspFlow, which employs conditional continuous normalizing flows (CNFs) to generate diverse 6-DoF grasps from point-cloud inputs while guaranteeing $\text{SE}(3)$ equivariance.

Given a point cloud $P = \{x_k \in \mathbb{R}^3\}_{k=1}^K$, EquiGraspFlow leverages time-dependent conditional velocity fields $\omega_\theta(t, P, T)$ and $v_\phi(t, P, T)$, along with a prior conditional distribution $p_0(T|P) = p_0(R)p_0(x|P)$, where $p_0(R)$ is uniform on $\text{SO}(3)$ and $p_0(x|P)$ is a Gaussian in $\mathbb{R}^3$ centered at the point-cloud centroid.

We consider a dataset $\mathcal{D} := \{(P_i, \{T_{ij}\}_{j=1}^{M_i})\}_{i=1}^N$ consisting of object point clouds $P_i$ and their successful grasp sets $\{T_{ij}\}_{j=1}^{M_i}$. Each set is assumed to be sampled from the ground-truth conditional distribution $q(T|P_i)$. The neural velocity fields $\omega_\theta$ and $v_\phi$ are trained using $\mathcal{D}$ so that the transformed conditional distribution $p_1(T|P_i)$ closely approximates $q(T|P_i)$. We train the velocity fields with the Flow Matching framework and use Guided Flows to improve sample quality.

#### SE(3) Invariant Conditional Distributions

We define transformations for point clouds, grasp poses, and 3D vectors. Given $T' = (R', x') \in \text{SE}(3)$, the point cloud $P = \{x_k\}$ transforms as $T'P := \{R'x_k + x'\}$; a grasp pose $T = (R, x)$ transforms as $T'T = (R'R, R'x + x')$; and a vector $a$ transforms as $R'a$. A conditional distribution $p(T|P)$ on $\text{SE}(3)$ is invariant if $p(T'T|T'P) = p(T|P)$ for any $T' \in \text{SE}(3)$.

Prior work mostly focuses on Euclidean-space distributions, unconditional distributions, or both, making them unsuitable for grasp generation, which requires conditional distributions on the $\text{SE}(3)$ manifold. We extend this framework to model invariant conditional distributions on $\text{SE}(3)$.

#### SE(3) Equivariant Time-Dependent Conditional Velocity Field Networks

<img src="https://velog.velcdn.com/images/devjo/post/5cdcf40a-b0d7-4683-8a87-ef572a4d7072/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

We decompose $\text{SE}(3)$ equivariance into $\mathbb{R}^3$ and $\text{SO}(3)$ components. $\mathbb{R}^3$ equivariance is achieved by subtracting the point-cloud mean $\mu = \frac{\sum_k x_k}{K}$ from both $P$ and the translation component $x$ of $T$. $\text{SO}(3)$ equivariance is achieved using Vector Neuron (VN) architectures specifically designed to be equivariant on $\text{SO}(3)$.

However, VN architectures require lists of 3D vectors as inputs, which complicates their direct use. Among the inputs to the time-dependent velocity fields, the point cloud $P$ is a set of 3D vectors, and the pose $T$ can be represented as $(\mathbf{R}_1, \mathbf{R}_2, \mathbf{R}_3, x)$, where $\mathbf{R}_i$ are the column vectors of $R$. Time $t$, however, is a scalar and cannot be directly incorporated.

Suppose we express a list of $C_1$ scalars as a column vector $s \in \mathbb{R}^{C_1 \times 1}$ and a list of $C_2$ 3D vectors as a matrix $V \in \mathbb{R}^{C_2 \times 3}$. We construct an equivariant lifting layer $f_{\text{lift}}(s, V) = s \, f_{\text{equi}}(V)$, where $f_{\text{equi}}: \mathbb{R}^{C_2 \times 3} \to \mathbb{R}^{1 \times 3}$ is any equivariant mapping satisfying $f_{\text{equi}}(V R^T) = f_{\text{equi}}(V) R^T$. This means $f_{\text{equi}}$ produces an equivariant vector from $V$, and this vector is scaled by each of the $C_1$ scalar entries of $s$ to yield a list of $C_1$ vectors. It is straightforward to verify that this construction makes $f_{\text{lift}}$ $\text{SO}(3)$-equivariant.

---

### Conclusion

We introduced EquiGraspFlow, an $\text{SE}(3)$-equivariant 6-DoF grasp pose generative model built on two key ideas:

(i) constructing a framework that learns invariant conditional distributions on the $\text{SE}(3)$ manifold, which is crucial for equivariant grasp generation; and\n(ii) designing a novel equivariant lifting layer.

Even when trained with full point clouds, the model may struggle in real-world scenarios where occlusions prevent complete observations. Future work will extend this approach to real-world experiments involving constrained environments where objects are difficult to observe from multiple viewpoints.

---

### References

[Original Source #1](https://openreview.net/pdf?id=5lSkn5v4LK)

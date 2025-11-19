---
title: 'ScrewSplat: An End-to-End Method for Articulated Object Recognition'
date: '2025-10-08'
tags: ['embodied ai', 'paper review']
---

### Abstract

Articulated object recognition is essential for enabling robots to interact with everyday objects such as doors or laptops.

However, existing approaches often rely on strong assumptions—like a known number of articulated parts—require additional inputs such as depth images, or involve complex intermediate steps that introduce potential errors, limiting practicality in real-world settings.

We introduce ScrewSplat, a simple end-to-end method that operates solely on RGB observations. The approach begins by randomly initializing screw axes, which are iteratively optimized to recover the object’s underlying kinematic structure.

By integrating Gaussian splatting, we simultaneously reconstruct 3D geometry and segment the object into rigid and movable parts.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/3bbcffe5-1bd5-414f-af0f-afbe6ed1af40/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### Importance of Articulated Object Recognition and Limitations of Prior Work

Articulated objects with moving parts—doors, laptops, drawers—are ubiquitous in daily environments. Manipulating them requires understanding both their 3D geometry and underlying kinematic structure.

Prior studies tackled this problem via supervised learning using annotated 3D datasets with known joint axes, but such approaches struggle to generalize to unseen categories—a natural limitation of supervised methods.

We instead infer kinematic structure directly from multi-view RGB imagery of objects in diverse configurations, without category-specific supervision.

#### ScrewSplat: Proposed Method and Key Idea

We propose ScrewSplat, an end-to-end method for articulated object recognition that sidesteps intermediate steps, auxiliary data, and prior knowledge about joint types or counts. We jointly optimize part-aware geometry, joint axes and types, and joint angles to align rendered views with observations. This is challenging because continuous variables (geometry and joint angles) must interact with discrete, combinatorial ones (part labels, joint types, joint counts), creating a hybrid structure.

Our key idea is to adopt Gaussian splatting to represent geometry and appearance, and extend it with a screw model that provides a continuous parameterization of joint axes. To represent joint types and counts without discrete variables, we introduce confidence scores for screw axes and use a probability simplex to softly assign Gaussians to rigid parts.

---

### Preliminaries

#### 1. Screw Theory

<img src="https://velog.velcdn.com/images/devjo/post/e1fc2b8d-4910-4844-ae35-f0c1d4dca729/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Screw theory provides a natural mathematical formalism for motions composed of a rotation about an axis and a translation along the axis:

$$
S = \begin{pmatrix} \omega \\ v \end{pmatrix} \in \mathbb{R}^6
$$

where $\omega, v \in \mathbb{R}^3$ and either (1) $||\omega|| = 1$ or (2) $\omega = 0$ and $||v|| = 1$.

If condition (1) holds, the screw represents rotation about axis $\omega$ plus translation along the same axis. In particular, $v = -\omega \times q + h \omega$, where $q$ is any point on the screw axis and $h$ is the pitch. We consider only revolute joints (pure rotations), so we set $h = 0$.

If condition (2) holds, the screw represents pure translation along axis $v$, corresponding to a prismatic joint.

Given screw axis $S$ and joint angle $\theta$, the motion of any rigid coordinate $T \in \text{SE}(3)$ along that axis can be expressed using the matrix exponential:

$$
\begin{aligned}
&T' = e^{[S]\theta}T \\
&[S] = \begin{pmatrix} [\omega] & v \\ 0 & 0 \end{pmatrix} \in \mathbb{R}^{4 \times 4} \\
&[\omega] = \begin{pmatrix} 0 & -\omega_3 & \omega_2 \\ \omega_3 & 0 & -\omega_1 \\ -\omega_2 & \omega_1 & 0 \end{pmatrix} \in \mathbb{R}^{3 \times 3}
\end{aligned}
$$

#### 2. 3D Gaussian Splatting

3D Gaussian splatting was developed for novel-view synthesis from multiple RGB images and can also be used to obtain 3D scene representations. The $i$th Gaussian $G_i$ is parameterized by $(T_i, s_i, \sigma_i, c_i)$.

An $\alpha$-blending approach renders RGB images, where $\alpha_i$ is the scaled Gaussian function of $G_i$ in $\mathbb{R}^3$:

$$
\alpha_i(x) = \sigma_i e^{-\frac{1}{2}(x-\mu_i)^T \Sigma_i^{-1} (x-\mu_i)}
$$

The final pixel color $C$ is computed by blending the ordered set $\mathcal{N}$ of Gaussians along that pixel:

$$
C = \sum_{i \in \mathcal{N}} c_i \alpha_i \prod_{j=1}^{i-1} (1 - \alpha_j)
$$

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/47111d6f-7a48-483d-a092-0d91a52fbefe/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### ScrewSplat

We consider $\mathbf{n}_s$ screw primitives, with the $j$th primitive $A_j$ defined as the tuple $(S_j, \gamma_j)$, where the screw axis is $S_j \in \mathbb{R}^6$ and the confidence is $\gamma_j \in [0, 1]$.

Among $\mathbf{n}_g$ part-aware Gaussian primitives, the $i$th primitive $H_i$ is parameterized by the extended tuple $(T_i, s_i, \sigma_i, c_i, m_i)$, where $m_i = (m_{i0}, \ldots, m_{in_s}) \in \Delta^{n_s}$ is a probability simplex over $(\mathbf{n}_s + 1)$ parts.

At the core of the RGB rendering procedure is duplicating Gaussians from each part-aware primitive and assigning each duplicate to either the static base or one of the movable parts. Gaussian $G_{ij}$ is assigned to the base if $j = 0$ and to the movable part associated with screw primitive $A_j$ if $j \geq 1$.

$$
L = L_{\text{render}} + \beta \sum_j \sqrt{\gamma_j}
$$

Here, $L_{\text{render}}$ is the rendering loss, and $\beta = 0.002$ is a weighting coefficient. The second term acts as a regularization term—the parsimony loss—encouraging the representation of articulated objects with as few screw primitives as possible.

#### Controlling Joint Angles Using ScrewSplat as a Renderer

The visual appearance $I$ of an articulated object from an arbitrary camera pose can be obtained through a continuous, differentiable function $\pi$ such that $I = \pi(\theta)$. This function enables applications like estimating the current pose by defining an objective on rendered images and optimizing joint angles accordingly.

Given the current appearance $I_c$, a textual description of the current state $t_c$, and a goal text prompt $t_p$, the goal is to find the joint-angle vector $\theta$ such that $I = \pi(\theta)$ aligns with $t_p$.

We leverage CLIP, which embeds RGB images and text into a shared latent space, enabling similarity computation between visual and textual inputs.

$$
L_{\text{CLIP-dir}} = 1 - \frac{\triangle I(\theta) \cdot \triangle T}{||\triangle I(\theta)|| \, ||\triangle T||}
$$

In this directional CLIP loss, $\triangle I(\theta) = e_I(\pi(\theta)) - e_I(I_c)$ and $\triangle T = e_T(t_p) - e_T(t_c)$ represent directional changes in the CLIP latent space.

---

### Conclusion

We presented ScrewSplat, a new end-to-end framework for articulated object recognition that operates purely on RGB observations.

By leveraging screw theory and Gaussian splatting, along with confidence scores for screw axes and probability simplices for Gaussian assignments, we enable smooth, unified optimization over geometric and kinematic parameters.

Unlike prior methods, ScrewSplat avoids strong assumptions, complex intermediate steps, and reliance on depth data, yielding a more robust and generalizable solution. We also demonstrate its direct applicability to zero-shot, text-guided control of articulated objects, allowing robots to adjust joint angles according to high-level user intent in real-world scenarios.

---

### 참고 자료

[원본 경로 #1](https://arxiv.org/pdf/2508.02146)

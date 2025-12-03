---
title: 'Bin picking'
date: '2024-11-20'
tags: ['Robotics', 'Manipulation', 'lecture']
---

### Bin picking

Bin picking is the task of moving objects from one bin filled with random objects to another bin. This serves as a training environment for robot learning or as a foundation for real-world applications such as logistics.

#### How Objects Fall

<img src="https://velog.velcdn.com/images/devjo/post/2d87a34c-4f88-4b91-aec1-538af0ec8bec/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

This simulates dropping random objects into a bin.

The initial setup generates a random number of objects in random poses and staggers their vertical positions so that they do not physically overlap from the start.

---

### Static Equilibrium with Frictional Contact

Understanding the physics when objects stop moving and reach a state of static equilibrium is important. Using general positions $q$ and $v$,

$$
M(q)\dot{v} + C(q,v)v=\tau_g(q)+\sum_i J_i^T(q)F^{C_i}
$$

This is expressed as above, and in static equilibrium, since velocity and acceleration are zero, the left-hand side becomes zero.

#### Collision Geometry and Contact Forces

In simulation, objects have collision geometry separate from their visual geometry. Collision geometry often uses simplified shapes such as boxes, spheres, and cylinders to improve the speed and robustness of the physics engine.

The contact force $\mathbf{F}_{\text{contact}_i}$ between two colliding objects occurs at the contact point or contact patch.

---

### Model-based Grasp Selection

A good grasp is one that stabilizes the object in the hand and can resist adversarial wrenches.

The contact wrench cone is $K_C^C$ at the contact point for the 6-dimensional wrench cone:

$$
K_C^C=\begin{Bmatrix} \begin{bmatrix} 0 \\ 0 \\ 0 \\ f_{C_x}^C \\ f_{C_y}^C \\ f_{C_z}^C\end{bmatrix}\end{Bmatrix}
$$

And by spatial algebra, the following holds:

$\Rightarrow$ For wrenches applied at the same point and in the same coordinate frame, $K_{total,C}^{B_p}=K_{0,c}^{B_p} \oplus K_{1,c}^{B_p} \oplus + \cdots$ holds.

$\Rightarrow$ When moving a wrench cone from $K_C^{B_p}$ to $B_q$, we can formulate the rotation formula as $K_C^{B_q} = \begin{bmatrix} I_{3 \times 3} & [^B_q P_C^{B_p} \\ 0_{3 \times 3} & I_{3 \times 3}]\end{bmatrix}$.

---

### Grasp Selection from Point Clouds

Instead of recognizing a specific object and estimating its pose, this approach directly finds graspable regions from an unsegmented point cloud.

#### Point Cloud Pre-processing

<img src="https://velog.velcdn.com/images/devjo/post/90d31469-5dcf-41b3-b714-26a4adf48305/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Point clouds obtained from multiple RGB-D cameras must be merged and cleaned into a single point cloud containing only the manipulation region of interest. Points outside the region of interest are discarded based on an axis-aligned bounding box directly above the known bin location. Then normals are estimated. Downsampling divides 3D space into regular-sized cubes (voxels) and summarizes each voxel with a single point. This also serves to filter noisy point clouds.

#### Estimating Normals and Local Curvature

For a point set $\mathcal{P}$, we find the plane that best fits with least squares error. The normal vector $\mathbf{n}$ of the plane is defined as:

$$
\begin{aligned}
&\underset{p,n}{min} \sum_{i=1}^N |(p^i-p)^Tn|^2, \\
&\text{subject to} \quad |n|^2_2=1
\end{aligned}
$$

The normal vector $\mathbf{n}$ that minimizes the plane fitting error is given by the eigenvector corresponding to the smallest eigenvalue of the data matrix $\mathbf{D} = \sum_{i} (\mathbf{p}^i - \mathbf{p}^{\text{avg}})(\mathbf{p}^i - \mathbf{p}^{\text{avg}})^{\text{T}}$.

#### Evaluating a Candidate Grasp

Let us consider a cost function that scores a grasp candidate:

$$
\text{cost} = -\sum_i (n^i_{G_x})^2
$$

A good grasp occurs when the fingers grasp the object's surface symmetrically from opposite directions. The negative sign means that the better the alignment, the lower the cost.

#### Generating Grasp Candidates

<img src="https://velog.velcdn.com/images/devjo/post/66f38f97-fc11-4615-8164-b80ba545a5a6/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Finding the optimal grasp pose $\mathbf{X}^{G}$ that minimizes the cost from a point cloud is a very difficult non-convex optimization problem. Therefore, most approaches use random sampling-based algorithms.

One example is to use the local curvature of the point cloud to propose grasp candidates where the point cloud normals face the palm, and adjust the hand so that the fingers align with the direction of maximum curvature.

Another heuristic is to find antipodal point pairs in the point cloud, then sample grasp candidates where the fingers can be aligned to those antipodal point pairs. A reasonable way to find antipodal point pairs is to randomly select a point from the point cloud, then ray cast into the point cloud in the opposite direction of the normal.

---

### References

[Original source #1](https://manipulation.csail.mit.edu/clutter.html#section5)

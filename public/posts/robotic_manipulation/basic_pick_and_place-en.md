---
title: 'Basic pick and place'
date: '2024-11-13'
tags: ['Robotics', 'Manipulation', 'lecture']
---

### Basic Pick and Place

<img src="https://velog.velcdn.com/images/devjo/post/da853d27-3c45-4992-b5c1-2062df0c568a/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

The goal of this chapter is to establish the basic geometric and kinematic tools needed to build a simple pick-and-place algorithm that commands a robot to pick up a brick and place it at a desired pose (position and orientation). We postpone the perception problem and begin by assuming perfect measurements of the brick's current pose.

#### Monogram Notation

For precise kinematic and geometric reasoning, careful notation is essential.

The position of a point is a relative quantity: it always represents the location of one point relative to another. We use $\\mathbf{p}$ to denote a position vector. The notation $\\mathbf{P}^{\\text{A}} = {}^{\\text{F}}\\mathbf{P}^{\\text{A}}_{\\text{F}}$ means “the position of point $\\text{P}$ measured from point $\\text{A}$.”

We denote the world frame by $\\mathbf{W}$ and typically think of $+X$ as forward, $+Y$ as left, and $+Z$ as up. Each object has its own body-fixed frame, e.g., $\\mathbf{B}$.

We use $\\mathbf{R}$ for rotations. The matrix ${}^{\\text{B}}\\mathbf{R}^{\\text{A}}$ represents the orientation of frame $\\text{B}$ as measured in frame $\\text{A}$.

A spatial pose (or simply pose) combines position and orientation. A spatial transform (or transform) is the “verb form” of a pose. We denote transforms/poses by $\\mathbf{X}$. The notation ${}^{\\text{B}}\\mathbf{X}^{\\text{A}}$ is the pose of frame $\\text{B}$ expressed in frame $\\text{A}$.

---

### Spatial Algebra

We can add position vectors when their base and target points align, e.g.\n\n$$\n{}^{\\text{A}}\\mathbf{P}^{\\text{B}}_{\\text{F}} + {}^{\\text{B}}\\mathbf{P}^{\\text{C}}_{\\text{F}} = {}^{\\text{A}}\\mathbf{P}^{\\text{C}}_{\\text{F}}.\n$$\n\nWe can also change reference frames using rotations, e.g.\n\n$$\n{}^{\\text{A}}\\mathbf{P}^{\\text{B}}_{\\text{G}} + {}^{\\text{G}}\\mathbf{R}^{\\text{F}} = {}^{\\text{A}}\\mathbf{P}^{\\text{B}}_{\\text{F}}.\n$$\n\nLikewise, we can multiply rotations when their base and target frames align:\n\n$$\n{}^{\\text{A}}\\mathbf{R}^{\\text{B}} \\, {}^{\\text{B}}\\mathbf{R}^{\\text{C}} = {}^{\\text{A}}\\mathbf{R}^{\\text{C}}.\n$$

---

### Forward Kinematics

The interface to the robot reports and commands joint positions. Forward kinematics is the function that maps joint positions $\\mathbf{q}$ to a Cartesian frame, namely the pose of the gripper $\\mathbf{X}^{\\text{G}}$:

$$
\mathbf{X}^{\text{G}} = f_{\text{kin}}^{\text{G}}(\mathbf{q})
$$

#### Kinematic Tree

All bodies (except the world) have a parent and are connected via a joint or a floating base. To compute the pose of the gripper, we start at the gripper frame and recursively compose transforms up the tree until we reach the world frame:

$$
^{\text{P}}\mathbf{X}^{\text{C}}(\mathbf{q}) = ^{\text{P}}\mathbf{X}^{\text{J}_P} \times ^{\text{J}_P}\mathbf{X}^{\text{J}_C} (\mathbf{q})\times ^{\text{J}_C}\mathbf{X}^{\text{C}}
$$

#### Differential Kinematics

Forward kinematics lets us compute the poses of the gripper and objects in the world frame, but to move the gripper toward an object we must understand how changes in joint angles relate to changes in the gripper pose. This is the subject of differential kinematics.

The time derivative of the pose is related to the time derivative of the joint positions via the partial derivatives of the forward kinematics:

$$
dX^{\text{B}}=\frac{\partial f^{\text{B}}_{\text{kin}}(\text{q})}{\partial q}dq = J^{\text{B}}(q)dq
$$

The matrix of partial derivatives is called the Jacobian.

Although there are many representations for 3D rotations, for differential rotations we can use the canonical representation of spatial velocity without worrying about singularities or loss of generality:

$$
^{\text{A}}V^{\text{B}}_{\text{C}} = \begin{bmatrix} ^{\text{A}}w^{\text{B}}_{\text{C}} \\ ^{\text{A}}v^{\text{B}}_{\text{C}}\end{bmatrix}
$$

This vector encodes the angular velocity of frame $\\text{B}$ relative to frame $\\text{A}$ expressed in frame $\\text{C}$, and the translational velocity of frame $\\text{B}$ relative to frame $\\text{A}$ also expressed in frame $\\text{C}$.

---

### Differential Inverse Kinematics

This is the inverse problem of forward kinematics: we seek the joint velocities $\\mathbf{v}$ required to achieve a desired gripper spatial velocity.

$$
V^{\text{G}}=J^{\text{G}}(q)v
$$

#### Differential Inverse Kinematics with Constraints

Pseudo-inverse controllers have important limitations: near singularities, the Jacobian can become ill-conditioned (singular values become small), and they typically ignore real robot joint constraints. Physical robots have limits on joint angles, velocities, accelerations, and torques; issuing velocity commands that violate these constraints can cause the robot to deviate significantly from the intended path.

The simplest constraints to consider are joint velocity limits. We can formulate the problem as:

$$
\underset{v}{min}|J^{\text{G}}(q)v-V^{\text{G}_d}|^2_2
$$

The goal is to find joint velocities $\\mathbf{v}$ that satisfy the joint velocity constraints while achieving the desired gripper spatial velocity as closely as possible.

---

### References

[Original source #1](https://manipulation.csail.mit.edu/pick.html)


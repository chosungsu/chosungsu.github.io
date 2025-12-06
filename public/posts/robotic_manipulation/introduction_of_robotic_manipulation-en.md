---
title: 'Introduction of Robotic Manipulation'
date: '2024-11-13'
tags: ['Robotics', 'Manipulation', 'lecture']
---

### Introduction

Today, it is common to see robotic arms welding and painting car bodies on assembly lines, populating printed circuit boards with IC components, inspecting and repairing structures in nuclear, underwater, and underground environments, and even picking oranges and harvesting grapes in agriculture.

While few of these robotic arms take an anthropomorphic form similar to the human body, fascination with humanoid machines has not diminished. Although the likelihood of seeing such robots in the near future is low, it is clear that simple robots have been successfully introduced into various environments.

#### Early Development

Early work in modern robotics began with controlled mechanical manipulators developed at Argonne National Laboratory and Oak Ridge National Laboratory after World War II to handle radioactive materials.

#### Multi-Fingered Hands and Dexterous Manipulation

The vast majority of robots currently in operation use simple end-effectors to interact with workpieces. An end-effector is a term describing the interface between the robot arm and the environment. Most hands are simple grippers, pincers, or tongs designed for specific tasks.

Disadvantages of 6-degree-of-freedom robots with simple grippers include lack of dexterity—they can firmly grasp parts but cannot manipulate grasped objects—limitations requiring frequent end-effector replacement for different tasks, and inefficient movements.

Multi-fingered hands provide a solution that gives robots dexterity and versatility.

---

### Rigid Body Motion

Rigid body motion is movement that preserves the distance between points of an object. The study of rigid body motion is central to research in robot kinematics, dynamics, and control.

#### History and Foundations of Screw Theory

Chasles proved that the movement of a rigid body from one position to another can consist of a rotation about some straight line followed by a translation parallel to that line. This motion is called screw motion.

The infinitesimal version of screw motion is called a twist and describes the instantaneous velocity of a rigid body in terms of linear and angular components.

Poinsot discovered that any system of forces acting on a rigid body can be replaced by a single force applied along one line and a torque about the same line. Such a force is called a wrench.

#### Transformations

A rigid body is a collection of particles such that the distance between any two particles remains fixed regardless of the body's motion or forces applied to it—a completely "non-deformable" object.

$$
\| \mathbf{p}(t) - \mathbf{q}(t) \| = \| \mathbf{p}(0) - \mathbf{q}(0) \| = \text{constant}
$$

Rigid body motion means the net displacement from one position to another, generally including both translation and rotation. Points are represented as $\mathbf{p} \in \mathbb{R}^3$ and vectors as $\mathbf{v} = \mathbf{q} - \mathbf{p}$. A mapping $\mathbf{g}: \mathbb{R}^3 \to \mathbb{R}^3$ is a rigid body transformation if it satisfies the following properties: it preserves length, cross product, and inner product.

#### Rotational Motion in $\mathbb{R}^3$

The orientation of an object is described by the relative orientation between a coordinate frame $\text{B}$ attached to the body and a fixed inertial frame $\text{A}$. The rotation matrix $\mathbf{R}_{\text{ab}}$ is defined by stacking the coordinates of the principal axes of $\text{B}$, $\mathbf{x}_{\text{ab}}, \mathbf{y}_{\text{ab}}, \mathbf{z}_{\text{ab}} \in \mathbb{R}^3$, with respect to $\text{A}$.

$$
\mathbf{R}_{\text{ab}} = \begin{bmatrix} \mathbf{x}_{\text{ab}} & \mathbf{y}_{\text{ab}} & \mathbf{z}_{\text{ab}} \end{bmatrix}
$$

Rotation matrices are mutually orthonormal with $\mathbf{R}\mathbf{R}^T = \mathbf{R}^T\mathbf{R} = \mathbf{I}$ and preserve right-handed coordinate systems with determinant $\det \mathbf{R} = +1$. The set of all $3 \times 3$ matrices satisfying these two properties is called $\text{SO}(3)$ (Special Orthogonal group).

#### Exponential Coordinates for Rotation

A common motion encountered in robotics is rotation about a given axis. We want to represent the rotation matrix $\mathbf{R}(\omega, \theta)$ as a function of a unit vector $\omega \in \mathbb{R}^3$ (rotation direction) and an angle $\theta \in \mathbb{R}$.

$$
\dot{\mathbf{q}}(t) = \boldsymbol{\omega} \times \mathbf{q}(t) = \widehat{\boldsymbol{\omega}} \mathbf{q}(t)
$$

When rotating at unit velocity about $\omega$, the velocity of point $\mathbf{q}$ is as above. $\widehat{\omega}$ is a skew-symmetric matrix.

$$
\widehat{\omega} = \begin{bmatrix} 0 & -\omega_3 & \omega_2 \\ \omega_3 & 0 & -\omega_1 \\ -\omega_2 & \omega_1 & 0 \end{bmatrix}
$$

Integrating this differential equation yields $\mathbf{q}(t) = e^{\widehat{\omega} t} \mathbf{q}(0)$. That is, the net rotation when rotating by $\theta$ is $\mathbf{R}(\omega, \theta) = e^{\widehat{\omega}\theta}$.

#### Rodrigues' Formula

To obtain a closed-form expression for the matrix exponential $e^{\widehat{\omega}\theta}$, we simplify the infinite series using the power formula for $\widehat{\boldsymbol{\omega}}$.

$$
e^{\widehat{\omega}\theta} = \mathbf{I} + \widehat{\omega} \sin \theta + \widehat{\omega}^2 (1 - \cos \theta)
$$

#### Euler's Theorem

For every $\mathbf{R} \in \text{SO}(3)$, there exist $\omega \in \mathbb{R}^3$ ($||\omega||=1$) and $\theta \in \mathbb{R}$ such that $\mathbf{R} = \exp(\widehat{\omega}\theta)$. The components of $\omega\theta \in \mathbb{R}^3$ are called the exponential coordinates for $\mathbf{R}$.

#### Angle-Based Representations

One way to describe the orientation between two coordinate frames $\text{A}$ and $\text{B}$ is to use a sequence of consecutive rotations.

ZYZ Euler angles rotate frame $\text{B}$ by angle $\alpha$ about the $z$-axis of $\text{B}$. Then rotate the new $\text{B}$ frame by angle $\beta$ about its $y$-axis. Then rotate the new $\text{B}$ frame again by angle $\gamma$ about its $z$-axis.

$$
\mathbf{R}_x(\phi) := e^{\widehat{\mathbf{x}}\phi} \\ \mathbf{R}_y(\beta) := e^{\widehat{\mathbf{y}}\beta} \\
\mathbf{R}_z(\alpha) := e^{\widehat{\mathbf{z}}\alpha}
$$

Euler angles $(\alpha, \beta, \gamma)$ can be obtained as a surjective mapping.

#### Rigid Motion in $\mathbb{R}^3$

In the Special Euclidean Group, rigid body motion includes both rotation and translation. Rigid body motion is described by tracking the position $\mathbf{p}_{\text{ab}} \in \mathbb{R}^3$ and orientation $\mathbf{R}_{\text{ab}} \in \text{SO}(3)$ of a coordinate frame $\text{B}$ attached to the body with respect to an inertial frame $\text{A}$.

The action of a rigid transformation $\mathbf{g} = (\mathbf{p}, \mathbf{R})$ on a vector $\mathbf{v}$ is defined only by rotation.

$$
\mathbf{g}_*(\mathbf{v}) := \mathbf{R}\mathbf{v}
$$

Rigid transformations can be simply expressed in linear form using matrices and vectors in $\mathbb{R}^4$. We create homogeneous coordinates $\bar{\mathbf{q}}$ by appending 1 to a point $\mathbf{q} \in \mathbb{R}^3$ and $\bar{\mathbf{v}}$ by appending 0 to a vector $\mathbf{v} \in \mathbb{R}^3$.

$$
\bar{\mathbf{q}} = \begin{pmatrix} \mathbf{q} \\ 1 \end{pmatrix}, \quad \bar{\mathbf{v}} = \begin{pmatrix} \mathbf{v} \\ 0 \end{pmatrix}
$$

The homogeneous representation $\bar{\mathbf{g}}$ of $\mathbf{g} = (\mathbf{p}, \mathbf{R}) \in \text{SE}(3)$ is given as a $4 \times 4$ matrix.

$$
\bar{\mathbf{g}} = \begin{pmatrix} \mathbf{R} & \mathbf{p} \\ \mathbf{0} & 1 \end{pmatrix}
$$

Point transformation is expressed as matrix multiplication $\bar{\mathbf{q}}_{\text{a}} = \bar{\mathbf{g}}_{\text{ab}}\bar{\mathbf{q}}_{\text{b}}$.

The twist matrix $\widehat{\xi}$ is a generalization of the skew-symmetric matrix $\widehat{\omega}$ of $\text{SO}(3)$.

$$
\widehat{\xi} = \begin{pmatrix} \widehat{\omega} & \mathbf{v} \\ \mathbf{0} & 0 \end{pmatrix}
$$

The 6-dimensional vector parameterizing the twist matrix is $\mathbf{\xi} = (\mathbf{v}, \omega)^T$.

#### Screw Motion

Screw motion is a rigid body motion that rotates by $\theta$ about one axis in space, then translates by $d$ along the same axis. This is similar to how a screw performs rotation and translation along the same axis.

The pitch is defined as the ratio of translation to rotation as $h := d/\theta$. It is an oriented line defined by a point $\mathbf{q} \in \mathbb{R}^3$ on the axis and a unit vector $\omega \in \mathbb{R}^3$ specifying the direction.

$$
l = \{ \mathbf{q} + \lambda \boldsymbol{\omega} : \lambda \in \mathbb{R} \}
$$

A screw $\mathcal{S}$ consists of an axis $l$, a pitch $h$, and a magnitude $M$. It represents a motion that rotates by $M$ ($\theta = M$) about axis $l$, then translates by $h\theta$ parallel to axis $l$.

$$
\mathbf{g} = \begin{pmatrix} e^{\widehat{\boldsymbol{\omega}}\theta} & (\mathbf{I} - e^{\widehat{\boldsymbol{\omega}}\theta})\mathbf{q} + h\theta\boldsymbol{\omega} \\ \mathbf{0} & 1 \end{pmatrix}
$$

The rigid transformation $\mathbf{g}$ corresponding to screw motion is as above.

---

### Velocity of a Rigid Body

Consider pure rotational motion $\mathbf{R}_{\text{ab}}(t) \in \text{SO}(3)$. The instantaneous angular velocity as seen from the fixed space frame $\text{A}$ is defined as $\widehat{\omega}_{\text{ab}}^{\text{s}} := \dot{\mathbf{R}}_{\text{ab}}\mathbf{R}_{\text{ab}}^{-1}$, and the angular velocity as seen from the body frame $\text{B}$ is $\widehat{\omega}_{\text{ab}}^{\text{b}} := \mathbf{R}_{\text{ab}}^{-1}\dot{\mathbf{R}}_{\text{ab}}$. The body angular velocity can be obtained by rotating the space angular velocity vector into the body frame.

For general rigid body motion $\mathbf{g}_{\text{ab}}(t) \in \text{SE}(3)$, the terms $\dot{\mathbf{g}}_{\text{ab}}\mathbf{g}_{\text{ab}}^{-1}$ and $\mathbf{g}_{\text{ab}}^{-1}\dot{\mathbf{g}}_{\text{ab}}$ have specific meanings.

The spatial velocity twist $\widehat{\mathbf{V}}_{\text{ab}}^{\text{s}}$ is defined as

$$
\widehat{\mathbf{V}}_{\text{ab}}^{\text{s}} = \dot{\mathbf{g}}_{\text{ab}}\mathbf{g}_{\text{ab}}^{-1} \\ \mathbf{V}_{\text{ab}}^{\text{s}} = \begin{pmatrix} \mathbf{v}_{\text{ab}}^{\text{s}} \\ \boldsymbol{\omega}_{\text{ab}}^{\text{s}} \end{pmatrix}
$$

It is expressed in terms of the instantaneous angular velocity $\boldsymbol{\omega}_{\text{ab}}^{\text{s}}$ as seen from the space frame and the instantaneous linear velocity $\mathbf{v}_{\text{ab}}^{\text{s}}$ of a point on the rigid body passing through the origin of the space frame.

The body velocity twist $\widehat{\mathbf{V}}_{\text{ab}}^{\text{b}}$ is defined as

$$
\widehat{\mathbf{V}}_{\text{ab}}^{\text{b}} = \mathbf{g}_{\text{ab}}^{-1}\dot{\mathbf{g}}_{\text{ab}} \\
\mathbf{V}_{\text{ab}}^{\text{b}} = \begin{pmatrix} \mathbf{v}_{\text{ab}}^{\text{b}} \\ \boldsymbol{\omega}_{\text{ab}}^{\text{b}} \end{pmatrix}
$$

Spatial velocity and body velocity are related by the adjoint transformation $\text{Ad}_{\mathbf{g}}$.

$$
\widehat{\mathbf{V}}_{\text{ab}}^{\text{s}} = \mathbf{g}_{\text{ab}}\widehat{\mathbf{V}}_{\text{ab}}^{\text{b}}\mathbf{g}_{\text{ab}}^{-1}
$$

Converting to twist coordinates yields:

$$
\mathbf{V}_{\text{ab}}^{\text{s}} = \begin{pmatrix} \mathbf{v}_{\text{ab}}^{\text{s}} \\ \boldsymbol{\omega}_{\text{ab}}^{\text{s}} \end{pmatrix} = \mathbf{Ad}_{\mathbf{g}_{\text{ab}}} \mathbf{V}_{\text{ab}}^{\text{b}}
$$

#### Velocity of a Screw Motion

Consider rigid body motion $\mathbf{g}_{\text{ab}}(\theta) = e^{\widehat{\xi}\theta} \mathbf{g}_{\text{ab}}(0)$ generated by screw action $\exp(\widehat{\xi}\theta)$, where $\widehat{\xi}$ is a constant twist.

Using the fact that for a constant twist, $\frac{d}{dt}(e^{\widehat{\xi}\theta}) = \widehat{\xi}\dot{\theta}e^{\widehat{\xi}\theta}$, the spatial velocity twist of this rigid body motion is calculated as follows.

$$
\begin{aligned}
&\widehat{\mathbf{V}}_{\text{ab}}^{\text{s}} = \dot{\mathbf{g}}_{\text{ab}}(\theta)\mathbf{g}_{\text{ab}}^{-1}(\theta) \\
&= \left(\widehat{\boldsymbol{\xi}}\dot{\theta}e^{\widehat{\boldsymbol{\xi}}\theta} \mathbf{g}_{\text{ab}}(0)\right) \left(\mathbf{g}_{\text{ab}}^{-1}(0)e^{-\widehat{\boldsymbol{\xi}}\theta}\right) \\
&= \widehat{\boldsymbol{\xi}}\dot{\theta}
\end{aligned}
$$

Therefore, the spatial velocity corresponding to screw motion is the twist itself multiplied by $\dot{\theta}$. The body velocity twist is calculated as follows.

$$
\begin{aligned}
&\widehat{\mathbf{V}}_{\text{ab}}^{\text{b}} = \mathbf{g}_{\text{ab}}^{-1}(\theta)\dot{\mathbf{g}}_{\text{ab}}(\theta) \\
&= \left(\mathbf{g}_{\text{ab}}^{-1}(0)e^{-\widehat{\boldsymbol{\xi}}\theta}\right) \left(\widehat{\boldsymbol{\xi}}\dot{\theta}e^{\widehat{\boldsymbol{\xi}}\theta} \mathbf{g}_{\text{ab}}(0)\right) \\
&= \mathbf{g}_{\text{ab}}^{-1}(0)\widehat{\boldsymbol{\xi}}\mathbf{g}_{\text{ab}}(0)\dot{\theta}
\end{aligned}
$$

Converting to twist coordinates yields $\mathbf{V}_{\text{ab}}^{\text{b}} = \left(\mathbf{Ad}_{\mathbf{g}_{\text{ab}}^{-1}(0)}\boldsymbol{\xi}\right)^{\wedge}\dot{\theta}$.

#### Coordinate Transformations

When considering the motion of coordinate frames $\text{A}, \text{B}, \text{C}$, the following relationship holds between spatial velocities.

$$
\mathbf{V}_{\text{ac}}^{\text{s}} = \mathbf{V}_{\text{ab}}^{\text{s}} + \mathbf{Ad}_{\mathbf{g}_{\text{ab}}} \mathbf{V}_{\text{bc}}^{\text{s}}
$$

When considering the motion of coordinate frames $\text{A}, \text{B}, \text{C}$, the following relationship holds between relative body velocities.

$$
\mathbf{V}_{\text{ac}}^{\text{b}} = \mathbf{Ad}_{\mathbf{g}_{\text{bc}}^{-1}} \mathbf{V}_{\text{ab}}^{\text{b}} + \mathbf{V}_{\text{bc}}^{\text{b}}
$$

---

### Wrenches and Reciprocal Screws

#### Wrenches

A generalized force acting on a rigid body consists of a linear component (pure force $\mathbf{f}$) acting at a point and an angular component (pure moment $\boldsymbol{\tau}$). This generalized force is represented as a wrench $\mathbf{F}$, which is a vector in $\mathbb{R}^6$.

$$
\mathbf{F} = \begin{pmatrix} \mathbf{f} \\ \boldsymbol{\tau} \end{pmatrix}
$$

Two wrenches are said to be equivalent if they produce the same work for all possible rigid body motions. When $\mathbf{g}_{\text{bc}}=(\mathbf{p}_{\text{bc}}, \mathbf{R}_{\text{bc}})$ is the configuration of $\text{C}$ with respect to $\text{B}$, a wrench $\mathbf{F}_{\text{b}}$ applied at the origin of $\text{B}$ is transformed to an equivalent wrench $\mathbf{F}_{\text{c}}$ applied at the origin of $\text{C}$.

$$
\begin{pmatrix} \mathbf{f}_{\text{c}} \\ \boldsymbol{\tau}_{\text{c}} \end{pmatrix} = \begin{pmatrix} \mathbf{R}_{\text{bc}}^T & \mathbf{0} \\ -\mathbf{R}_{\text{bc}}^T\widehat{\mathbf{p}}_{\text{bc}} & \mathbf{R}_{\text{bc}}^T \end{pmatrix} \begin{pmatrix} \mathbf{f}_{\text{b}} \\ \boldsymbol{\tau}_{\text{b}} \end{pmatrix}
$$

#### Screw Coordinates for a Wrench

Like twists, wrenches can also be generated by applying a force along an axis in space and simultaneously applying a torque about the same axis. When there is a screw $\mathcal{S}$ with axis $l$, pitch $h$, and magnitude $M$, a wrench can be constructed by applying a force of magnitude $M$ along the oriented line $l$ and a torque of magnitude $hM$ about the $l$ axis.

$$
\mathbf{F} = M \begin{pmatrix} \boldsymbol{\omega} \\ -\boldsymbol{\omega} \times \mathbf{q} + h\boldsymbol{\omega} \end{pmatrix} = M \begin{pmatrix} \mathbf{0} \\ \boldsymbol{\omega} \end{pmatrix}
$$

The pitch is $h = \frac{\mathbf{f}^T \boldsymbol{\tau}}{\|\mathbf{f}\|^2}$, the ratio of linear force to angular torque. The axis is $l = \left\{ \frac{\mathbf{f} \times \boldsymbol{\tau}}{\|\mathbf{f}\|^2} + \lambda \mathbf{f} : \lambda \in \mathbb{R} \right\}$, which is a line in the direction of $\boldsymbol{\tau}$ passing through the origin when $\mathbf{f} = \mathbf{0}$. The magnitude is defined as $M = \begin{cases} \|\mathbf{f}\|, & \text{if } \mathbf{f} \neq \mathbf{0} \\ \|\boldsymbol{\tau}\|, & \text{if } \mathbf{f} = \mathbf{0} \end{cases}$.

#### Reciprocal Screws

The inner product of a twist and a wrench represents the instantaneous power during motion of a rigid body through the applied force. A wrench $\mathbf{F}$ being reciprocal to a twist $\mathbf{V}$ means that the instantaneous power is zero, i.e., $\mathbf{F} \cdot \mathbf{V} = 0$.

Classically, reciprocal screws are defined using the reciprocal product between screws.

$$
\mathcal{S}_1 \odot \mathcal{S}_2 = M_1 M_2 \left[ (h_1 + h_2) \cos \alpha - d \sin \alpha \right]
$$

where $M_1, M_2$ are the magnitudes of the screws, $h_1, h_2$ are the pitches, $d$ is the minimum distance between the axes $l_1$ and $l_2$ of the two screws, and finally $\alpha$ is the angle between the direction vectors $\omega_1$ and $\omega_2$ of the two axes.

Using twist $\mathbf{V} = (\mathbf{v}, \omega)$ and wrench $\mathbf{F} = (\mathbf{f}, \tau)$ to calculate the inner product $\mathbf{V} \cdot \mathbf{F}$,

$$
\mathbf{V}_1 \cdot \mathbf{F}_2 = \mathbf{V}_1^T \mathbf{F}_2 = M_1 M_2 \left[ (h_1 + h_2) \cos \alpha - d \sin \alpha \right]
$$

it can be shown that the work is exactly equal to the reciprocal product. Reciprocal screws can interpret a set of screws as wrenches and another screw $\mathcal{S}_f$ as a twist such that $\mathbf{V}_f \odot \mathcal{S}_i = 0$. In this case, motion along $\mathcal{S}_f$ performs no work for any wrench.

If the dimension (rank) of a screw system is $r$ and the dimension (nullity) of the reciprocal screw system is $n$, then the following relationship holds.

$$
r + n = 6
$$

---

### References

[Original source #1](https://manipulation.csail.mit.edu/intro.html)

[Original source #2](https://www.cse.lehigh.edu/~trink/Courses/RoboticsII/reading/murray-li-sastry-94-complete.pdf)

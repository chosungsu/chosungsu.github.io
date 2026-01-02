---
title: 'Rigid Body Motions'
date: '2024-02-05'
tags: ['Robotics', 'Kinematics', 'lecture']
---

### Rigid-Body Motions in the Plane

<img src="https://velog.velcdn.com/images/devjo/post/7b229f56-5110-4687-ba0d-3ff4c942a0d2/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Looking at a planar object (gray shape), the motion is confined to the plane. As shown in the figure, assume that a length scale and a fixed reference frame $\{s\}$ with unit axes $\hat{x}_s$ and $\hat{y}_s$ have been chosen. If we attach a reference frame with unit axes $\hat{x}_b$ and $\hat{y}_b$ to the planar object, this frame moves with the object, so it is called the body frame and is denoted $\{b\}$.

To describe the configuration of a planar object, we need only specify the position and orientation of the body frame relative to the fixed frame.

$$
p = p_x \hat{x}_s + p_y \hat{y}_s
$$

Alternatively, we can specify the directions of the unit axes $\hat{x}_b$ and $\hat{y}_b$ of $\{b\}$ relative to $\{s\}$ in the form.

$$
\begin{aligned}
&\hat{x}_b = \cos \theta \hat{x}_s + \sin \theta \hat{y}_s \\ 
&\hat{y}_b = -\sin \theta \hat{x}_s + \cos \theta \hat{y}_s
\end{aligned}
$$

The two vectors $\hat{x}_b$ and $\hat{y}_b$ can be written as column vectors and grouped into a $2 \times 2$ matrix $P$.

$$
P = [\hat{x}_b \ \hat{y}_b] = \begin{bmatrix} \cos \theta & -\sin \theta \\ \sin \theta & \cos \theta \end{bmatrix}
$$

The matrix $P$ is an example of a rotation matrix. While it consists of four numbers, three constraints ensure that each column of $P$ is a unit vector, the two columns are orthogonal to each other, and the remaining one degree of freedom is parameterized by $\theta$.

---

### Rotations and Angular Velocities

#### Rotation Matrices

$$
R = \begin{bmatrix} \hat{x}_b & \hat{y}_b & \hat{z}_b\end{bmatrix} = \begin{bmatrix} r_{11} & r_{12} & r_{13} \\ r_{21} & r_{22} & r_{23} \\ r_{31} & r_{32} & r_{33}\end{bmatrix}
$$

The six constraints on this $R$ are expressed as follows.

Unit norm conditions

$$
\begin{aligned} r_{11}^2 + r_{21}^2 + r_{31}^2 &= 1, \\ r_{12}^2 + r_{22}^2 + r_{32}^2 &= 1, \\ r_{13}^2 + r_{23}^2 + r_{33}^2 &= 1. \end{aligned}
$$

Orthogonality conditions

$$
\begin{aligned} r_{11}r_{12} + r_{21}r_{22} + r_{31}r_{32} &= 0, \\ r_{12}r_{13} + r_{22}r_{23} + r_{32}r_{33} &= 0, \\ r_{11}r_{13} + r_{21}r_{23} + r_{31}r_{33} &= 0. \end{aligned}
$$

These six constraints can be more concisely expressed as a single constraint set $R^T R = I$ on the matrix $R$.

The sets of rotation matrices $\text{SO}(2)$ and $\text{SO}(3)$ are called groups because they satisfy the properties required of a mathematical group. The inverse of a rotation matrix $R \in \text{SO}(3)$ is also a rotation matrix and is equal to the transpose of $R$; that is, $R^{-1} = R^T$. Multiplication of rotation matrices is associative but not commutative.

#### Angular Velocities

<img src="https://velog.velcdn.com/images/devjo/post/1321a64c-2205-4968-b791-da22dcdc1734/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Suppose a frame with unit axes $\{\hat{x}, \hat{y}, \hat{z}\}$ is attached to a rotating body. Examining the body frame at times $t$ and $t + \Delta t$, the change in the frame's orientation can be described as a rotation about some unit axis $\hat{w}$ passing through the origin by an angle $\Delta \theta$. Combining the axis $\hat{w}$ with $\dot{\theta} = \Delta \theta / \Delta t$, we can define the angular velocity $w$ as:

$$
w = \hat{w} \dot{\theta}
$$

To express the equation in coordinates, we must choose a reference frame in which to express $w$. Let $R(t)$ be the rotation matrix describing the orientation of the body frame relative to a fixed frame at time $t$, and let $\dot{R}(t)$ be its time derivative. At a particular time $t$, let $\omega_s \in \mathbb{R}^3$ be the angular velocity $w$ expressed in fixed-frame coordinates.

$$
\dot{R} = [\omega_s \times r_1 \quad \omega_s \times r_2 \quad \omega_s \times r_3] = \omega_s \times R
$$

$[\omega_s]$ is the $3 \times 3$ skew-symmetric matrix representation. Exponential coordinates parameterize a rotation matrix by a rotation axis and the rotation angle $\theta$ about that axis. The linear differential equation $\dot{x}(t) = a x(t)$ has the solution $x(t) = e^{at} x_0$, where the matrix exponential $e^{At}$ is defined as

$$
e^{At} = I + At + \frac{(At)^2}{2!} + \frac{(At)^3}{3!} + \cdots
$$

Now suppose a 3D vector $p(0)$ is rotated about $\hat{\omega}$ by $\theta$ to become $p(\theta)$. The velocity $\dot{p}$ of the vector is given by

$$
\dot{p} = \hat{\omega} \times p
$$

The solution to the differential equation $\dot{p} = [\hat{\omega}] p$ is

$$
p(t) = e^{[\hat{\omega}] t} p(0) \Longleftrightarrow p(\theta) = e^{[\hat{\omega}] \theta} p(0)
$$

---

### Rigid-Body Motions and Twists

#### Homogeneous Transformation Matrices

Using $R \in \text{SO}(3)$ to represent the orientation and origin of the body frame $\{b\}$ relative to the fixed frame $\{s\}$, the group of rigid-body motions in $\mathbb{R}^3$, or homogeneous transformation matrices, is the set of all $4 \times 4$ real matrices $T$ of the form

$$
T = \begin{pmatrix} R & p \\ 0 & 1 \end{pmatrix} = \begin{bmatrix} r_{11} & r_{12} & r_{13} & p_1 \\ r_{21} & r_{22} & r_{23} & p_2 \\ r_{31} & r_{32} & r_{33} & p_3 \\ 0 & 0 & 0 & 1 \end{bmatrix}
$$

As with rotation matrices, transformation matrices $T$ have three main uses to represent the configuration of a rigid body, to change the reference frame in which a vector or frame is expressed, and to displace a vector or frame.

#### Twists

Now we consider both the linear velocity and angular velocity of a moving frame. Let $T_{sb}(t) = T(t)$ be the configuration of $\{b\}$ as seen from $\{s\}$.

$$
T(t) = \begin{pmatrix} R(t) & p(t) \\ 0 & 1 \end{pmatrix}
$$

Premultiplying $\dot{T}$ by $T^{-1}$

$$
T^{-1} \dot{T} = \begin{pmatrix} R^T & -R^T p \\ 0 & 1 \end{pmatrix} \begin{pmatrix} \dot{R} & \dot{p} \\ 0 & 0 \end{pmatrix} = \begin{pmatrix} R^T \dot{R} & R^T \dot{p} \\ 0 & 0 \end{pmatrix} = \begin{pmatrix} [\omega_b] & v_b \\ 0 & 0 \end{pmatrix}
$$

$R^T \dot{R} = [\omega_b]$ is the skew-symmetric matrix representation of the angular velocity expressed in $\{b\}$ coordinates. Also, $\dot{p}$ is the linear velocity of the origin of $\{b\}$ expressed in the fixed frame $\{s\}$, and $R^T \dot{p} = v_b$ is this linear velocity expressed in the $\{b\}$ frame. The body twist $V_b$ is defined as the 6-dimensional velocity vector combining $\omega_b$ and $v_b$

$$
V_b = \begin{pmatrix} \omega_b \\ v_b \end{pmatrix} \in \mathbb{R}^6
$$

#### Wrenches

Consider a linear force $f$ acting on a rigid body at a point $r$. Defining a reference frame $\{a\}$, this force creates a torque or moment $m_a = r_a \times f_a$ in the $\{a\}$ frame. Similar to twists, the moment and force can be merged into a single 6-dimensional spatial force, a wrench $F_a$ expressed in the $\{a\}$ frame

$$
F_a = \begin{pmatrix} m_a \\ f_a \end{pmatrix} \in \mathbb{R}^6
$$

Using the fact that the power generated by a force–velocity pair must be the same regardless of the frame, we can derive the relationship between wrenches $F_a$ and $F_b$. Since power $P = V^T F$ is frame-invariant

$$
V_b^T F_b = V_a^T F_a
$$

---

### References

[Original Source #1](https://hades.mech.northwestern.edu/images/7/7f/MR.pdf)

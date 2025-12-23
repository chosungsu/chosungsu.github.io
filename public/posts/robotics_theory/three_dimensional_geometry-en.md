---
title: 'Three Dimensional Geometry'
date: '2024-10-09'
tags: ['Robotics', 'lecture']
---

### Vectors and Reference Frames

Vehicles (robots, satellites, aircraft, etc.) typically have degrees of freedom in translation and rotation, totaling 6 degrees of freedom (DOF). This geometric configuration is called a pose (position and orientation).

#### Reference Frames

The position of a point on an object can be described by a vector $\vec{r}$ with three components. Rotational motion is described by expressing the orientation of a reference frame $\vec{F}_v$ attached to the object relative to another reference frame $\vec{F}_i$.

A vector $\vec{r}$ is expressed as a linear combination of the basis vectors ($\vec{1}_1, \vec{1}_2, \vec{1}_3$) of reference frame $\vec{F}_1$ and coordinates $\mathbf{r}_1$:

$$
\vec{r} = r_1 \vec{1}_1 + r_2 \vec{1}_2 + r_3 \vec{1}_3 = \mathbf{r}_1^T \vec{F}_1
$$

$\vec{F}_1$ is a vectrix, a column matrix containing the basis vectors (unit length, orthogonal, following the right-hand rule):

$$
\vec{F}_1 = \begin{bmatrix} \vec{1}_1 \\ \vec{1}_2 \\ \vec{1}_3 \end{bmatrix}
$$

#### Dot Product

The dot product of two vectors $\vec{r}$ and $\vec{s}$ expressed in the same reference frame $\vec{F}_1$ is simply expressed as a matrix product:

$$
\vec{r} \cdot \vec{s} = \mathbf{r}_1^T \mathbf{I} \mathbf{s}_1 = \mathbf{r}_1^T \mathbf{s}_1 = r_1 s_1 + r_2 s_2 + r_3 s_3
$$

#### Cross Product

The cross product of two vectors $\vec{r}$ and $\vec{s}$ expressed in the same reference frame can be expressed as a matrix product of coordinates in the $\vec{F}_1$ frame:

$$
\vec{r} \times \vec{s} = \vec{F}_1^T (\mathbf{r}_1^\times \mathbf{s}_1)
$$

where $\mathbf{r}_1^\times$ is a 3×3 skew-symmetric matrix used to construct the cross product:

$$
\mathbf{r}_1^\times = \begin{bmatrix} 0 & -r_3 & r_2 \\ r_3 & 0 & -r_1 \\ -r_2 & r_1 & 0 \end{bmatrix}
$$

---

### Rotations

#### Rotation Matrices

Consider two coordinate frames $\vec{F}_1$ and $\vec{F}_2$ with a common origin, and express a vector $\vec{r}$ in each frame as $\vec{r} = \vec{F}_1^T \mathbf{r}_1 = \vec{F}_2^T \mathbf{r}_2$. The relationship between coordinates $\mathbf{r}_1$ in $\vec{F}_1$ and coordinates $\mathbf{r}_2$ in $\vec{F}_2$ can be found using a rotation matrix $C_{21}$:

$$
\mathbf{r}_2 = C_{21} \mathbf{r}_1
$$

$$
C_{21} = \vec{F}_2 \cdot \vec{F}_1^T = \begin{bmatrix} \vec{2}_1 \cdot \vec{1}_1 & \vec{2}_1 \cdot \vec{1}_2 & \vec{2}_1 \cdot \vec{1}_3 \\ \vec{2}_2 \cdot \vec{1}_1 & \vec{2}_2 \cdot \vec{1}_2 & \vec{2}_2 \cdot \vec{1}_3 \\ \vec{2}_3 \cdot \vec{1}_1 & \vec{2}_3 \cdot \vec{1}_2 & \vec{2}_3 \cdot \vec{1}_3 \end{bmatrix}
$$

$C_{21}$ is also called the direction cosine matrix from frame 1 to frame 2. Rotation matrices are orthonormal matrices. When there are three coordinate frames $\vec{F}_1, \vec{F}_2, \vec{F}_3$, rotations are composed sequentially.

#### Principal Rotations

A rotation about a single basis vector axis is called a principal rotation. For example, a rotation about the 3-axis rotates by $\theta_3$ about the 3-axis:

$$
C_3 = \begin{bmatrix} \cos \theta_3 & \sin \theta_3 & 0 \\ - \sin \theta_3 & \cos \theta_3 & 0 \\ 0 & 0 & 1 \end{bmatrix}
$$

Rotation matrices use 9 parameters, which are not independent. Rotations inherently have only 3 degrees of freedom. When there are more than 3 parameters, constraints are needed to limit the degrees of freedom to 3 (e.g., quaternions, rotation matrices).

#### Euler Angles

Euler angles specify orientation by sequentially using three principal rotations.

The 3-1-3 sequence uses classical angles: $\psi$ (precession) about the original 3-axis, $\gamma$ (nutation) about the intermediate 1-axis, and $\theta$ (spin) about the transformed 3-axis, expressed as $C_{21}(\theta, \gamma, \psi) = C_3(\theta) C_1(\gamma) C_3(\psi)$.

The 1-2-3 sequence uses $\theta_1$ (roll) about the original 1-axis, $\theta_2$ (pitch) about the intermediate 2-axis, and $\theta_3$ (yaw) about the transformed 3-axis, expressed as $C_{21}(\theta_3, \theta_2, \theta_1) = C_3(\theta_3) C_2(\theta_2) C_1(\theta_1)$.

For infinitesimal rotations, when the Euler angles $\theta_1, \theta_2, \theta_3$ are very small ($\sin \theta \approx \theta, \cos \theta \approx 1$), the rotation matrix is approximated as follows, regardless of order:

$$
C_{21} \approx \begin{bmatrix} 1 & \theta_3 & -\theta_2 \\ -\theta_3 & 1 & \theta_1 \\ \theta_2 & -\theta_1 & 1 \end{bmatrix} \approx \mathbf{I} - \boldsymbol{\theta}^\times
$$

where $\boldsymbol{\theta} = [\theta_1, \theta_2, \theta_3]^T$ is called the rotation vector.

#### Rotational Kinematics

When coordinate frame $\vec{F}_2$ rotates relative to $\vec{F}_1$, the angular velocity of $\vec{F}_2$ relative to $\vec{F}_1$ is denoted $\vec{\omega}_{21}$. The angular velocity of $\vec{F}_1$ relative to $\vec{F}_2$ is $\vec{\omega}_{12} = - \vec{\omega}_{21}$.

We denote the time derivative of a vector as seen from $\vec{F}_1$ by $(\cdot)^\bullet$ and as seen from $\vec{F}_2$ by $(\cdot)^\circ$. The time derivative of the basis vectors of $\vec{F}_2$ as seen from $\vec{F}_1$ is:

$$
\vec{F}_2^T{}^\bullet = \vec{\omega}_{21} \times \vec{F}_2^T
$$

The relationship between the time derivative $\vec{r}^\bullet$ of an arbitrary vector $\vec{r}$ as seen from $\vec{F}_1$ and the time derivative $\vec{r}^\circ$ as seen from $\vec{F}_2$ is:

$$
\vec{r}^\bullet = \vec{r}^\circ + \vec{\omega}_{21} \times \vec{r}
$$

For acceleration:

$$
\vec{r}^{\bullet\bullet} = \vec{r}^{\circ\circ} + 2 \vec{\omega}_{21} \times \vec{r}^\circ + \vec{\omega}_{21}^\circ \times \vec{r} + \vec{\omega}_{21} \times (\vec{\omega}_{21} \times \vec{r})
$$

where $2 \vec{\omega}_{21} \times \vec{r}^\circ$ is the Coriolis acceleration, $\vec{\omega}_{21}^\circ \times \vec{r}$ is the angular acceleration, and $\vec{\omega}_{21} \times (\vec{\omega}_{21} \times \vec{r})$ is the centripetal acceleration.

#### Perturbing Rotations

Rotations do not exist in a vector space but form a non-commutative group SO(3). Therefore, care must be taken when linearizing motion and observation models involving rotations. Using Euler's rotation theorem, the partial derivative of a rotation matrix $C$ with respect to rotation angle $\phi$ is:

$$
\frac{\partial C}{\partial \phi} \equiv - \mathbf{a}^\times C
$$

where $\mathbf{a}$ is the rotation axis. The partial derivative of a rotation matrix $C(\boldsymbol{\theta})$ with an arbitrary constant vector $\mathbf{v}$ with respect to Euler angles $\boldsymbol{\theta}$ is:

$$
\frac{\partial (C(\boldsymbol{\theta})\mathbf{v})}{\partial \boldsymbol{\theta}} \equiv \left(C(\boldsymbol{\theta})\mathbf{v}\right)^\times S(\theta_2, \theta_3)
$$

Linearizing functions involving rotations is tricky, but Euler angles have exactly three parameters and can be perturbed independently. Approximating $C(\boldsymbol{\theta})\mathbf{v}$ using a first-order Taylor series with Euler angles perturbed by a small amount $\delta \boldsymbol{\theta}$ from a nominal value $\bar{\boldsymbol{\theta}}$:

$$
C(\bar{\boldsymbol{\theta}} + \delta \boldsymbol{\theta}) \approx \left( \mathbf{I} - \delta \boldsymbol{\phi}^\times \right) C(\bar{\boldsymbol{\theta}})
$$

---

### Poses

A pose represents both the translation and rotation of an object. The position $\mathbf{r}^i_{pi}$ of a point $P$ expressed in the stationary frame $\vec{F}_i$ is related to the coordinates $\mathbf{r}^v_{pv}$ in the vehicle frame $\vec{F}_v$ using the displacement $\mathbf{r}^i_{vi}$ and rotation $C_{iv}$ between the two frames:

$$
\mathbf{r}^i_{pi} = C_{iv} \mathbf{r}^v_{pv} + \mathbf{r}^i_{vi}
$$

#### Transformation Matrices

The above equation can be conveniently expressed using a 4×4 transformation matrix $T_{iv}$:

$$
\begin{bmatrix} \mathbf{r}^i_{pi} \\ 1 \end{bmatrix} = \begin{bmatrix} C_{iv} & \mathbf{r}^i_{vi} \\ \mathbf{0}^T & 1 \end{bmatrix} \begin{bmatrix} \mathbf{r}^v_{pv} \\ 1 \end{bmatrix}
$$

To transform coordinates in the opposite direction, the inverse of the transformation matrix is:

$$
T_{iv}^{-1} = \begin{bmatrix} C_{vi} & \mathbf{r}^v_{iv} \\ \mathbf{0}^T & 1 \end{bmatrix} = T_{vi}
$$

---

### Sensor Models

Perspective cameras are inexpensive but are among the most important sensors that can be used to infer vehicle motion and the shape of the world. When the sensor coordinates of a point $P$ are $\boldsymbol{\rho} = \mathbf{r}^s_{ps} = [x, y, z]^T$, the coordinates of observation $O$ in the image plane are:

$$
\begin{aligned}
&x_n = x/z, \\
&y_n = y/z
\end{aligned}
$$

When a point $P$ is observed from two camera poses $a$ and $b$, the two normalized image coordinates $\mathbf{p}_a$ and $\mathbf{p}_b$ are related through the following constraint:

$$
\mathbf{p}_a^T E_{ab} \mathbf{p}_b = 0
$$

where $E_{ab}$ is called the essential matrix.

Assuming the observed point lies on a known plane, the two camera observations can be related through a homography matrix $H_{ba}$:

$$
\mathbf{q}_b = K_b H_{ba} K_a^{-1} \mathbf{q}_a
$$

---

### References

[Original Source #1](https://mingkangxiong.github.io/assets/books/State_Estimation_for_Robotic_2018.pdf?utm_source=chatgpt.com)

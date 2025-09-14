---
title: 'Rotation and angular velocity'
date: '2024-10-09'
tags: ['robotics', 'mathematics', 'lecture']
---

### Rotation

While the form of a point is completely described by position alone, a rigid body requires additional rotation to define its pose. As a theoretical abstraction of rotation, $\phi_{AB} \in SO(3)$ is used to represent the orientation of the body-fixed frame $B$ with respect to the reference frame $\mathcal{A}$. While there is no numerical equivalent like angular position, parameterization is possible.

#### 1. Rotation matrices

<img src="https://velog.velcdn.com/images/devjo/post/947eceec-b8a2-4286-a6c0-b97104bc7199/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

The position vector of point $P$ fixed in this frame is as follows:

$$
_{\mathcal{A}} r_{AP}=\begin{pmatrix} _{\mathcal{A}}r_{AP_x} \\ _{\mathcal{A}}r_{AP_y} \\ _{\mathcal{A}}r_{AP_z}\end{pmatrix}
$$

Now, considering a reference frame $B$ rotated with respect to $A$, the origin of frame $B$ coincides with the origin of frame $A$, and the position vector of point $P$ expressed in frame $B$ is as follows:

$$
_{\mathcal{B}} r_{AP}=\begin{pmatrix} _{\mathcal{B}}r_{AP_x} \\ _{\mathcal{B}}r_{AP_y} \\ _{\mathcal{B}}r_{AP_z}\end{pmatrix}
$$

The unit vectors of $B$ expressed in frame $A$ are $_{\mathcal{A}}e_x^{\mathcal{B}}, _{\mathcal{A}}e_y^{\mathcal{B}}, _{\mathcal{A}}e_z^{\mathcal{B}}$, and the mapping between the two position vectors $_{\mathcal{A}}r_P, _{\mathcal{B}}r_P$ can be written as follows:

$$
_{\mathcal{A}}r_P=_{\mathcal{A}}e_x^{\mathcal{B}} \cdot _{\mathcal{B}}r_{P_x} + _{\mathcal{A}}e_y^{\mathcal{B}} \cdot _{\mathcal{B}}r_{P_y} + _{\mathcal{A}}e_z^{\mathcal{B}} \cdot _{\mathcal{B}}r_{P_z} \\
= C_{\mathcal{A}\mathcal{B}} \cdot _{\mathcal{B}} r_{AP}
$$

Here, the term $C_{\mathcal{A}\mathcal{B}}$ is a $3 \times 3$ matrix called a rotation matrix, and since each column vector is an orthogonal unit vector, it is orthogonal.

#### 2. Active and Passive

Rotation has two interpretations: active and passive.

First, passive rotation is a mapping between coordinate systems, where the passive rotation $C_{\mathcal{A}\mathcal{B}}$ maps the same object $u$ from frame $B$ to frame $A$ as $_{\mathcal{A}}u=C_{\mathcal{A}\mathcal{B}} \cdot _{\mathcal{B}}u$.

Next, active rotation is an operator represented by a $3 \times 3$ matrix $R$ that rotates vector $_{\mathcal{A}}u$ to vector $_{\mathcal{A}}v$ within the same reference frame $A$.

#### 3. Elementary rotation

In elementary rotation, we rotate around one of the basis vectors $e_x^{\mathcal{A}}, e_y^{\mathcal{A}}, e_z^{\mathcal{A}}$ as follows:

$$
C_x(\phi)=\begin{bmatrix} 1 & 0 & 0 \\ 0 & \cos \phi & -\sin \phi \\ 0 & \sin \phi & \cos \phi\end{bmatrix}, \\
C_y(\phi)=\begin{bmatrix} \cos \phi & 0 & \sin \phi \\ 0 & 1 & 0 \\ -\sin \phi & 0 & \cos \phi\end{bmatrix}, \\
C_z(\phi)=\begin{bmatrix} \cos \phi & -\sin \phi & 0 \\ \sin \phi & \cos \phi & 0 \\ 0 & 0 & 1\end{bmatrix}
$$

#### 4. Composition of rotation

When there are three reference frames $(\mathcal{A}, \mathcal{B}, \mathcal{C})$, the coordinates of vector $u$ can be mapped from $B \rightarrow A$ as $_{\mathcal{A}}u=C_{\mathcal{A}\mathcal{B}} \cdot _{\mathcal{B}}u$.

Also, $C \rightarrow B$ can be mapped as $_{\mathcal{B}}u=C_{\mathcal{B}\mathcal{C}} \cdot _{\mathcal{C}}u$.

Therefore, combining the two equations, we can map as $_{\mathcal{A}}u=C_{\mathcal{A}\mathcal{B}} \cdot (C_{\mathcal{B}\mathcal{C}} \cdot _{\mathcal{C}}u)=C_{\mathcal{A}\mathcal{C}} \cdot _{\mathcal{C}}u$.

#### 5. Representation of rotation

A $3 \times 3$ matrix uses 9 parameters, but these parameters are not independent and are constrained by orthogonality conditions. Therefore, the minimal representation of rotation in space requires only three independent parameters such as Euler angles. Other non-minimal representations include angle-axis and unit quaternions.

In Euler angles, to describe rotations in all directions, two consecutive rotations must not be around parallel axes. If the first and third rotations are around the same axis, they are called proper Euler angles; if all three angles are different, they are called Tait-Bryan or Cardan angles.

$ZYZ$ Euler angles are well known as proper Euler angles, where the rotation angles can be collected into a parameter vector as $\chi_{R,eulerZYZ}=\begin{pmatrix} z_1 \\ y \\ z_2\end{pmatrix}$. The resulting rotation matrix is given by $C_{\mathcal{A}\mathcal{D}} {_\mathcal{D}}r$ according to the rotation composition formula above. The angles are $\begin{pmatrix} \text{atan2}(c_{13}, -c_{23}) \\ \text{atan2}(\sqrt{c^2_{13}+c^2_{23}}, c_{33}) \\ \text{atan2}(c_{31}, c_{32})\end{pmatrix}$.

$ZYX$ Euler angles are known as Tait-Bryan angles, where the rotation angles can be collected into a parameter vector as $\chi_{R,eulerZYX}=\begin{pmatrix} z \\ y \\ x\end{pmatrix}$. The angles are $\begin{pmatrix} \text{atan2}(c_{21}, c_{11}) \\ \text{atan2}(-c_{31}, \sqrt{c^2_{32}+c^2_{33}}) \\ \text{atan2}(c_{32}, c_{33})\end{pmatrix}$.

$XYZ$ Euler angles are known as Cardan angles, where the rotation angles can be collected into a parameter vector as $\chi_{R,eulerXYZ}=\begin{pmatrix} x \\ y \\ z\end{pmatrix}$. The angles are $\begin{pmatrix} \text{atan2}(-c_{23}, c_{33}) \\ \text{atan2}(c_{13}, \sqrt{c^2_{11}+c^2_{12}}) \\ \text{atan2}(-c_{12}, c_{11})\end{pmatrix}$.

The angle-axis is a non-minimal implementation defined by an angle $\theta$ and an axis $n$, where the vector $n \in R^3$ defines the direction of rotation and the scalar $\theta \in R$ defines the magnitude of rotation. This representation has four parameters with a unit length constraint $|n| = 1$. We can define a rotation vector or Euler vector as one that satisfies $\phi = \theta \cdot n \in R^3$. Each parameter can be obtained as follows:

$$
\theta=cos^{-1}(\frac{c_{11}+c_{22}+c_{33}-1}{2}), \\
n=\frac{1}{2sin(\theta)}\begin{pmatrix} c_{32}-c_{23} \\ c_{13}-c_{31} \\ c_{21}-c_{12}\end{pmatrix}
$$

Problems occur in the above formula when $\theta=0$ or $\theta=\pi$, where $\sin(\theta)=0$. The former can have any direction, while the latter can have two opposite directions.

---

### Angular velocity

Considering a moving frame $B$ with respect to a fixed frame $A$, this rotational motion is defined as angular velocity $_{\mathcal{A}}\omega_{AB}$ by the following limit:

$$
_{\mathcal{A}}\omega_{\mathcal{A}\mathcal{B}} = \lim_{\epsilon \rightarrow 0} \frac{_{\mathcal{A}}\phi_{\mathcal{B}(t)\mathcal{B}(t+\epsilon)}}{\epsilon}
$$

The angular velocity vector $_{\mathcal{A}}\omega_{AB}$ is defined between the time-varying rotation matrix $C_{\mathcal{A}\mathcal{B}}(t)$ as $[_{\mathcal{A}}\omega_{AB}]_X=\dot{C}_{\mathcal{A}\mathcal{B}} \cdot C^T_{\mathcal{A}\mathcal{B}}$. And $[_{\mathcal{A}}\omega_{AB}]_X$ is a skew-symmetric matrix $\begin{bmatrix} 0 & -w_z & w_y \\ w_z & 0 & -w_x \\ -w_y & w_x & 0\end{bmatrix}$.

Cross-product matrix and continuity are also guaranteed, so $[_{\mathcal{B}}\omega_{AB}]_X=C_{\mathcal{B}\mathcal{A}} \cdot [_{\mathcal{A}}\omega_{AB}]_X \cdot C_{\mathcal{A}\mathcal{B}}$, $_{\mathcal{D}}\omega_{\mathcal{A}\mathcal{C}}=_{\mathcal{D}}\omega_{\mathcal{A}\mathcal{B}} + _{\mathcal{D}}\omega_{\mathcal{B}\mathcal{C}}$ are satisfied.

#### Time derivatives of euler angles : ZYX

The derivative of rotation can be mapped to angular velocity as $_{\mathcal{A}}\omega_{\mathcal{A}\mathcal{B}}=E_R(\chi_R) \cdot \dot{\chi}_R$.

Given the ZYX Euler angles $\chi_{R, eulerZYX}=\begin{bmatrix}z & y & x\end{bmatrix}^T$ and their time derivatives $\dot{\chi}_{R, eulerZYX}=\begin{bmatrix} \dot{z} & \dot{y} & \dot{x}\end{bmatrix}$, we want to find the mapping $E_{R,eulerZYX} = E_R(\chi_{R,eulerZYX}) \in \mathbb{R}^{3 \times 3}$ that maps $\dot{\chi}$ to $_{\mathcal{A}}\omega_{\mathcal{A}\mathcal{B}}$.

Starting from reference frame $A$, the first rotation is around $_{\mathcal{A}}e_z^{\mathcal{A}}$ as follows:

$$
_{\mathcal{A}}e_z^{\mathcal{A}}=I_{3 \times 3} \begin{bmatrix} 0 \\ 0 \\ 1\end{bmatrix}=\begin{bmatrix} 0 \\ 0 \\ 1\end{bmatrix}
$$

After the $y$-axis rotation, we have:

$$
_{\mathcal{A}}e_y^{\mathcal{A'}}=C_{\mathcal{A}\mathcal{A'}}(z) \begin{bmatrix} 0 \\ 1 \\ 0\end{bmatrix} \\
=\begin{bmatrix} \cos(z) & -\sin(z) & 0\\ \sin(z) & \cos(z) & 0 \\ 0 & 0 & 1\end{bmatrix} \begin{bmatrix} 0 \\ 1 \\ 0\end{bmatrix}
$$

Now, for the final $x$-axis rotation, we have:

$$
_{\mathcal{A}}e_x^{\mathcal{A''}}=C_{\mathcal{A}\mathcal{A'}}(z) \cdot C_{\mathcal{A'}\mathcal{A''}}(y) \begin{bmatrix} 1 \\ 0 \\ 0\end{bmatrix}
$$

The mapping $E(\chi_R)$ at this time will be calculated as follows:

$$
E_{R, eulerZYX}=\begin{bmatrix} _{\mathcal{A}}e_z^{\mathcal{A}} & _{\mathcal{A}}e_y^{\mathcal{A'}} & _{\mathcal{A}}e_x^{\mathcal{A''}}\end{bmatrix}
$$

It is easy to see that $\det(E_{R,eulerZYX}) = -\cos(y)$. Therefore, when $y = \pi/2 + k\pi, \forall k \in \mathbb{Z}$, the mapping has a singularity. This means that while we can always describe angular velocity using Euler angle time derivatives, the inverse is not always possible.

---

### References

[Original Source #1](https://ethz.ch/content/dam/ethz/special-interest/mavt/robotics-n-intelligent-systems/rsl-dam/documents/RobotDynamics2017/RD_HS2017script.pdf)




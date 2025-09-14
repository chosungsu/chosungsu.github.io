---
title: 'Transform and Body system'
date: '2024-10-16'
tags: ['robotics', 'mathematics', 'lecture']
---

### Homogeneous Transformation

<img src="https://velog.velcdn.com/images/devjo/post/35caae3e-0cb1-4df8-9826-ea920bdb3be8/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

In general, two reference frames have a position offset and relative rotation. As a result, point $P$ can be transformed from one frame to another using a homogeneous transformation matrix $T$ that combines translation and rotation.

$$
r_{\mathcal{A}\mathcal{P}}=r_{\mathcal{A}\mathcal{B}}+r_{\mathcal{B}\mathcal{P}}
$$

$$
_\mathcal{A}r_{\mathcal{A}\mathcal{P}}=_\mathcal{A}r_{\mathcal{A}\mathcal{B}}+_\mathcal{A}r_{\mathcal{B}\mathcal{P}}=_\mathcal{A}r_{\mathcal{A}\mathcal{B}}+C_{\mathcal{A}\mathcal{B}} \cdot _\mathcal{B}r_{\mathcal{B}\mathcal{P}}
$$

Accordingly, the position vector can be calculated as follows:

$$
\begin{pmatrix} _{\mathcal{A}}r_{\mathcal{A}P} \\ 1\end{pmatrix}
= \begin{bmatrix} C_{\mathcal{A}B} & _{\mathcal{A}}r_{\mathcal{A}B} \\ O_{1 \times 3} & 1\end{bmatrix}
\begin{pmatrix} _{\mathcal{B}}r_{\mathcal{B}P} \\ 1\end{pmatrix}
$$

---

### Velocity in moving bodies

The absolute time change of position in frame $C$ is $_{c}(\dot{r}_{\mathcal{A}\mathcal{P}})=_{c}(\frac{d}{dt}r_{\mathcal{A}\mathcal{P}})=_{c} v_{\mathcal{A}\mathcal{P}}$. Also, the time derivative of position vector coordinates is $(_{c} \dot{r}_{\mathcal{A}\mathcal{P}})=(_{c} r_{\mathcal{A}\mathcal{P}})^{\cdot}$, so it is important to understand this difference. They are identical when frame $C$ is an inertial frame.

$$
_\mathcal{A}r_{\mathcal{A}\mathcal{P}}=_\mathcal{A}r_{\mathcal{A}\mathcal{B}}+_\mathcal{A}r_{\mathcal{B}\mathcal{P}}=_\mathcal{A}r_{\mathcal{A}\mathcal{B}}+C_{\mathcal{A}\mathcal{B}} \cdot _\mathcal{B}r_{\mathcal{B}\mathcal{P}}
$$

Differentiating the position of $P$ above with respect to time gives:

$$
_{\mathcal{A}}\dot{r}_{\mathcal{A}\mathcal{P}}=_{\mathcal{A}}\dot{r}_{\mathcal{A}\mathcal{B}}+C_{\mathcal{A}\mathcal{B}} \cdot _{\mathcal{B}}\dot{r}_{\mathcal{B}\mathcal{P}}+\dot{C}_{\mathcal{A}\mathcal{B}} \cdot _{\mathcal{B}}r_{\mathcal{B}\mathcal{P}}
$$

Here, since $P$ is a point on the rigid body $B$, we know that the relative velocity concept $_{\mathcal{B}}\dot{r}_{\mathcal{B}\mathcal{P}}=0$ holds, and through $\dot{C}_{AB} = [_{\mathcal{A}}\omega_{\mathcal{A}\mathcal{B}}]_X \cdot C_{\mathcal{A}\mathcal{B}}$, we can express $_{\mathcal{A}}\dot{r}_{\mathcal{A}\mathcal{B}}+[_{\mathcal{A}}\omega_{\mathcal{A}\mathcal{B}}]_X \cdot C_{\mathcal{A}\mathcal{B}} \cdot _{\mathcal{B}}r_{\mathcal{B}\mathcal{P}}$.

Rigid body velocity is calculated as $v_P=v_B+ \Omega \times r_{BP}$, and acceleration is $a_P=a_B+\Psi \times r_{BP} + \Omega \times (\Omega \times r_{BP})$.

---

### Kinematics of Systems of Bodies

<img src="https://velog.velcdn.com/images/devjo/post/19fcbdac-c320-4253-83b9-509cbf32e710/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Most robotic systems can be modeled as open kinematic chains consisting of $n_l=n_j+1$ links connected by $n_j$ joints with one degree of freedom. Between two consecutive bodies, there is a single joint with displacement $q_i$, so they are connected by $T_{B_{i-1} B_i}=T_{B_{i-1} B_i} (q_i)$.

There are fixed base and floating base systems, where the root link is either connected to the ground or moves freely.

#### 1. Generalized coordinates and joint configuration

The configuration of a robot such as a manipulator can be described by a generalized coordinate vector:

$$
q=\begin{pmatrix} q_1 \\ \vdots \\ q_n\end{pmatrix}
$$

When the values of $q$ are fixed in this set of scalars, the robot can no longer move, and in most cases, independent coordinates are chosen, meaning that the number of generalized coordinates matches the number of degrees of freedom. For revolute joints, the single degree of freedom $q_i$ corresponds to the rotation angle of the joint. Prismatic joints are interpreted as linear displacement.

$$
q=\begin{pmatrix} \alpha & \beta & \gamma & \zeta\end{pmatrix}^T
$$

Therefore, the generalized coordinates are represented as above. Here, only $\zeta$ is linear displacement, while the rest are rotation angles around the global vertical axis.

#### 2. Task space coordinates

The configuration of the end effector of a robot arm can be described by its relative position and orientation with respect to the reference frame. The position $r_{\epsilon} \in \mathbb{R}^3$ and rotation $\phi_e \in SO(3)$ with respect to the reference frame can be parameterized as $\chi_P, \chi_R$ respectively. Therefore, the combined position and orientation is represented as $x_e = \begin{pmatrix} r_e \\ \phi_e\end{pmatrix} \in SE(3)$. When parameterized, it becomes $\chi_e=\begin{pmatrix} \chi_P^e \\ \chi_R^e\end{pmatrix}=\begin{pmatrix} \chi_1 \\ \vdots \\ \chi_m\end{pmatrix} \in \mathbb{R}^m$. At this point, rotation $\phi_e$ is only a theoretical abstraction of orientation, and there is no numerical equivalent like angular position.

#### 3. Forward kinematics

<img src="https://velog.velcdn.com/images/devjo/post/4b92a4e7-8b34-43d4-9fe6-c515aa93ccca/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Forward kinematics describes the mapping between joint coordinates $q$ and end effector configuration $\chi_e$ as $\chi_e = \chi_e(q)$. This relationship is $T_{I\varepsilon}(q)=T_{IO} \cdot (\prod_{k=1}^{n_j} T_{k-1, k}(q_k)) \cdot T_{n_j\varepsilon} = \begin{bmatrix} C_{I\varepsilon}(q) & _I r_{I\varepsilon}(q) \\ O_{1 \times 3} & 1\end{bmatrix}$ for a serial link system with $n_j$ joints from base to end. For fixed base robots, the first coordinate system $O$ does not move with respect to the inertial frame, so $T_{IO}$ is constant. In most cases, the end effector frame $\varepsilon$ is introduced, which need not be identical to the last body coordinate system, separate from what is connected to the last link. Therefore, $T_{n_j\varepsilon}$ is also constant.

The generalized coordinates of a planar 3-DOF robot arm are as follows:

$$
q=\begin{pmatrix} q_1 \\ q_2 \\ q_3\end{pmatrix}=\begin{pmatrix} \varphi_1 \\ \varphi_2 \\ \varphi_3\end{pmatrix}
$$

Using this to calculate the position and orientation of the end effector gives $\chi_e(q)=\begin{pmatrix} \chi_{eP}(q) \\ \chi_{eR}(q)\end{pmatrix}$, where the first row values are $\begin{pmatrix} x \\ z\end{pmatrix}=\begin{pmatrix} l_1\sin(q_1) + l_2\sin(q_1+q_2)+l_3\sin(q_1+q_2+q_3) \\ l_0+l_1\cos(q_1) + l_2\cos(q_1+q_2)+l_3\cos(q_1+q_2+q_3)\end{pmatrix}$, and the second row value is $\phi_e=q_1+q_2+q_3$.

#### 4. Differential kinematics and analytical jacobian

Differential or instantaneous kinematics can be linearized as $\chi_e + \delta \chi_e = \chi_e(q+\delta q) = \chi_e(q) + \frac{\partial \chi_e(q)}{\partial q}\delta q + O(\delta q^2)$, where $\delta \chi_e \sim \frac{\partial \chi_e(q)}{\partial q} \delta q = J_{eA}(q) \delta q$ yields a first-order approximation. At this time, the analytical Jacobian matrix is an $m \times n_j$ matrix that connects differences from joints to configuration space.

The end effector configuration is calculated as a vector of position $\chi_{eP}$ and orientation $\chi_{eR}$ as $J_{eA}=\begin{bmatrix} J_{eA_p} \\ J_{eA_R}\end{bmatrix}=\begin{bmatrix} \frac{\partial \chi_{eP}}{\partial q} \\ \frac{\partial \chi_{eR}}{\partial q}\end{bmatrix}$.

#### 5. Geometric or Basic Jacobian

The Jacobian is mapped to the time derivative of the end effector, and $J_{eA} = \frac{\partial\chi_e}{\partial q}$ depends on the chosen parameterization, especially the parameterization of rotation. And the body has unique linear velocity $v_e$ and angular velocity $w_e$, so there must exist a unique Jacobian using generalized velocity $w_e = \begin{pmatrix} v_e \\ w_e\end{pmatrix}=J_{eO}(q) \dot{q}$.

In the most general case, it has $6 \times n_j$ dimensions and has $_A W_e = _A J_{eO}(q) \dot{q}$ with reference $A$.

The geometric Jacobian is as follows:

$$
\dot{r}_{IE}=\begin{bmatrix} n_1 \times r_{1(n+1)} & n_2 \times r_{2(n+1)} & \cdots & n_n \times r_{n(n+1)}\end{bmatrix} \begin{pmatrix} \dot{q_1} \\ \dot{q_2} \\ \vdots \\ \dot{q_n}\end{pmatrix}
$$

And the rotational Jacobian is as follows:

$$
w_{IE}=\sum_{i=1}^{n} n_i \dot{q_i} = \begin{bmatrix} n_1 & n_2 & \cdots & n_n\end{bmatrix} \begin{pmatrix} \dot{q_1} \\ \dot{q_2} \\ \vdots \\ \dot{q_n}\end{pmatrix}
$$

Now, combining the two equations yields the geometric Jacobian.

---

### References

[Original Source #1](https://ethz.ch/content/dam/ethz/special-interest/mavt/robotics-n-intelligent-systems/rsl-dam/documents/RobotDynamics2017/RD_HS2017script.pdf)




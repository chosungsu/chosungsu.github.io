---
title: 'Jacobians: velocities and static forces'
date: '2024-02-09'
tags: ['Robotics', 'Kinematics', 'lecture']
---

### Time varying position and orientation

#### Differentiation of position vectors

The derivative of a position vector is

$$
{}^B V_Q = \frac{d}{dt} {}^B Q = lim_{\Delta t \rightarrow 0} \frac{{}^B Q(t+\Delta t) - {}^B Q(t)}{\Delta t}
$$

The velocity of a position vector can be thought of as the linear velocity of the point in space that the position vector represents. For example, if $Q$ does not change with time relative to $\{\mathcal{B}\}$, then the computed velocity is zero. The numerical value describing the velocity of a point depends on two frames. One is the frame with respect to which the differentiation is performed, and the other is the frame in which the resulting velocity vector is expressed.

<img src="https://velog.velcdn.com/images/devjo/post/3692df3c-2cfe-4b36-97b3-f2ed956db4a0/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

As an example with the image above, suppose we have a fixed universe frame $\{\mathcal{U}\}$, a frame $\{\mathcal{T}\}$ attached to a train moving at 100 mph, and a frame $\{\mathcal{C}\}$ attached to a car moving at 30 mph. The rotation matrices ${}^{\mathcal{U}} R_{\mathcal{T}}$ and ${}^{\mathcal{U}} R_{\mathcal{C}}$ are known and constant.

$$
\begin{aligned}
&\frac{{}^U d}{dt} {}^U P_{CORG} = {}^U V_{CORG}=v_C=30 \hat{X}, \\
&{}^C({}^U V_{TORG}) = {}^C v_T = {}^C_U R_{V_T} = {}^C_U R(100\hat{X}) = {}^U_C R^{-1} 100 \hat{X}
\end{aligned}
$$

The derivative of the vector ${}^\mathcal{U} P_{CORG}$ with respect to $\{\mathcal{U}\}$ is the velocity of the origin of $\mathcal{C}$ as seen from the $\{\mathcal{U}\}$ frame. Under the conditions of the problem, the origin ${CORG}$ of $\{\mathcal{C}\}$ moves at $30 \text{ mph}$ in the $\hat{x}$ direction of $\{\mathcal{U}\}$.

#### The angular velocity vector

<img src="https://velog.velcdn.com/images/devjo/post/5b779bba-e601-49a5-92de-6407b4ffc807/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

The angular velocity vector uses $\Omega$. While linear velocity describes the property of a point, angular velocity describes the property of a body. ${}^{\mathcal{A}} \Omega_{\mathcal{B}}$ describes the rotation of the $\{\mathcal{B}\}$ frame relative to $\{\mathcal{A}\}$. Physically, at any instant, the direction of ${}^{\mathcal{A}} \Omega_{\mathcal{B}}$ represents the instantaneous axis of rotation of $\{\mathcal{B}\}$ relative to $\{\mathcal{A}\}$, and the magnitude of ${}^{\mathcal{A}} \Omega_{\mathcal{B}}$ represents the rate of rotation.

#### Linear velocity

<img src="https://velog.velcdn.com/images/devjo/post/5d0ac42d-8d1b-4b9e-9710-cf3cf77524ac/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Consider a frame $\{\mathcal{B}\}$ attached to a rigid body. We wish to describe the motion of $\{\mathcal{B}\}$ relative to $\{\mathcal{A}\}$. Frame $\{\mathcal{B}\}$ is located relative to $\{\mathcal{A}\}$ by position vector ${}^{A} P_{BORG}$ and rotation matrix ${}^{A} R_B$. For now, we assume that the orientation ${}^{A} R_B$ does not change with time.

$$
{}^{\mathcal{A}} \mathcal{V}_Q = {}^{\mathcal{A}} \mathcal{V}_{\mathcal{BORG}} + {}^{\mathcal{A}} R_{\mathcal{B}}{}^{\mathcal{B}} \mathcal{V}_Q
$$

---

### Velocity Propagation

<img src="https://velog.velcdn.com/images/devjo/post/8d2b7e6b-ca47-417c-afb9-eade61d2b684/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

We consider the problem of computing the linear and angular velocities of the links of a robot. Starting from the base, we can compute the velocity of each link in order. The velocity of link $i+1$ is equal to the velocity of link $i$ plus the new velocity components added by joint $i+1$.

$$
{}^i \omega_{i+1} = {}^i \omega_i + {}^i \omega_{i+1}
$$

We need to use the rotation matrix ${}^{i} R_{i+1}$ for the angular velocity.

$$
{}^{i+1} \omega_{i+1} = {}^{i+1}_i R {}^i \omega_i + \dot{\theta}_{i+1} {}^{i+1} \hat{Z}_{i+1}
$$

The linear velocity of the origin is equal to the linear velocity of the origin of frame $\{i\}$ plus a new component caused by the angular velocity of link $i$.

$$
{}^i \mathbf{v}_{i+1} = {}^i \mathbf{v}_i + {}^i \omega_i \times {}^i P_{i+1}
$$

#### Singularities

If the Jacobian matrix is nonsingular, we can compute its inverse to calculate the necessary joint velocities from given Cartesian velocities.

$$
\dot{\theta} = J^{-1}(\theta) v
$$

Singularities are configurations $\theta$ at which the manipulator's Jacobian becomes a singular matrix. They occur when the manipulator is fully stretched out or folded back so that the end-effector is at or very close to the boundary of the workspace, they can also occur away from the workspace boundary, and typically occur when two or more joint axes become collinear.

#### Static forces

The chain-like nature of a manipulator leads us to consider how forces and moments propagate from one link to the next. We define $\mathbf{f}_i$ as the force exerted by link $i-1$ on link $i$, and $\mathbf{n}_i$ as the torque exerted by link $i-1$ on link $i$.

The joint torque $\tau_i$ needed to maintain static equilibrium is calculated as the dot product of the joint axis vector ${}^i \hat{Z}_i$ and the moment vector ${}^i \mathbf{n}_i$ acting on the link.

$$
\tau_i = {}^{i} \mathbf{n}_i^T {}^{i} \hat{Z}_i
$$

For a prismatic joint $i$, the joint actuator force $\tau_i$ is calculated as the dot product of ${}^i \mathbf{f}_i$ and $\hat{Z}_i$.

---

### Manipulator Jacobian

The space Jacobian $J_s(\theta)$ satisfies $\mathbf{V}_s = J_s(\theta)\dot{\theta}$, where each column $\mathbf{J}_{si}(\theta)$ corresponds to a screw axis expressed in the fixed space frame $\{s\}$. The body Jacobian $J_b(\theta)$ satisfies $\mathbf{V}_b = J_b(\theta)\dot{\theta}$, where each column $\mathbf{J}_{bi}(\theta)$ corresponds to a screw axis expressed in the end-effector frame $\{b\}$.

#### Space Jacobian

The forward kinematics of an $n$-link open chain is expressed in the following product of exponentials form.

$$
T(\theta_1, \ldots, \theta_n) = e^{[\mathcal{S}_1]\theta_1} e^{[\mathcal{S}_2]\theta_2} \cdots e^{[\mathcal{S}_n]\theta_n} M
$$

The space twist $\mathbf{V}_s$ is given by $[\mathbf{V}_s] = \dot{T} T^{-1}$ and

$$
\begin{aligned}
&\frac{d}{dt} e^{[S_1]\theta_1} \cdots e^{[S_n]\theta_n}M + e^{[S_1]\theta_1}\frac{d}{dt} e^{[S_2]\theta_2} \cdots e^{[S_n]\theta_n}M + \cdots \\
&=[S_1]\dot{\theta_1}e^{[S_1]\theta_1} \cdots e^{[S_n]\theta_n}M + e^{[S_1]\theta_1}[S_2]\dot{\theta_2}e^{[S_2]\theta_2} \cdots e^{[S_n]\theta_n}M + \cdots
\end{aligned}
$$

Writing the above in matrix form

$$
\mathbf{V}_s = \begin{bmatrix} \mathbf{J}_{s1} & \mathbf{J}_{s2}(\theta) & \cdots & \mathbf{J}_{sn}(\theta) \end{bmatrix} \begin{bmatrix} \dot{\theta}_1 \\ \vdots \\ \dot{\theta}_n \end{bmatrix} = J_s(\theta) \dot{\theta}
$$

#### Body Jacobian

The body Jacobian derives the relationship between the end-effector twist $[\mathbf{V}_b] = T^{-1} \dot{T}$ and the joint velocities $\dot{\theta}$. For this purpose, it is more convenient to express the forward kinematics in the following alternative product of exponentials form.

$$
T(\theta) = M e^{[\mathcal{B}_1]\theta_1} e^{[\mathcal{B}_2]\theta_2} \cdots e^{[\mathcal{B}_n]\theta_n}
$$

Here, $T^{-1} = e^{-[B_n]\theta_n} \cdots e^{-[B_1]\theta_1}M^{-1}$, and writing in matrix form, $\mathbf{V}_b = \begin{bmatrix} \mathbf{J}_{b1}(\theta) & \cdots & \mathbf{J}_{b,n-1}(\theta) & \mathbf{J}_{bn} \end{bmatrix} \begin{bmatrix} \dot{\theta}_1 \\ \vdots \\ \dot{\theta}_n \end{bmatrix} = J_b(\theta) \dot{\theta}$. $J_b(\theta)$ and $J_s(\theta)$ always have the same rank.

#### Alternative Notions of the Jacobian

In addition to the space and body Jacobians, which are matrices connecting joint velocities to the end-effector's twist, there exist alternative notions of the Jacobian based on expressing the end-effector's configuration using minimal coordinates $q$.

We find the relationship between the geometric Jacobian $J_b$ of the body frame and the analytical Jacobian $J_a$ using exponential coordinates $r = \hat{\omega}\theta$ to represent orientation. $\mathbf{V}_b = J_b(\theta)\dot{\theta}$, where $\mathbf{V}_b = \begin{bmatrix} \omega_b \\ \mathbf{v}_b \end{bmatrix}$. We partition $J_b$ into the angular velocity part $J_{\omega}$ and the linear velocity part $J_{\mathbf{v}}$.

$$
\mathbf{V}_b = \begin{bmatrix} \omega_b \\ \mathbf{v}_b \end{bmatrix} = \begin{bmatrix} J_{\omega}(\theta) \\ J_{\mathbf{v}}(\theta) \end{bmatrix} \dot{\theta}
$$

In minimal coordinates $q = (r, x)$, the time derivative $\dot{x}$ of position is related to $\mathbf{v}_b$ through the rotation matrix $R_{sb}(\theta)$ that gives $\mathbf{v}_b$ in fixed coordinates.

$$
\dot{x} = R_{sb}(\theta) \mathbf{v}_b = R_{sb}(\theta) J_{\mathbf{v}}(\theta) \dot{\theta}
$$

The time derivative $\dot{r}$ has the following relationship with the body angular velocity $\omega_b$.

$$
\omega_b = A(r)\dot{r}
$$

Assuming $A(r)$ is invertible, $\dot{r}$ can be obtained from $\omega_b$.

$$
\dot{r} = A^{-1}(r)\omega_b = A^{-1}(r) J_{\omega}(\theta) \dot{\theta}
$$

Combining these, the analytical Jacobian $J_a$ is related to the body Jacobian $J_b$ as

$$
J_a(\theta) = \begin{bmatrix} A^{-1}(r) & 0 \\ 0 & R_{sb}(\theta) \end{bmatrix} J_b(\theta)
$$

---

### References

[Original Source #1](https://www.changjiangcai.com/files/text-books/Introduction-to-Robotics-3rd-edition.pdf?utm_source=chatgpt.com)

[Original Source #2](https://hades.mech.northwestern.edu/images/7/7f/MR.pdf)

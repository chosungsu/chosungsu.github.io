---
title: 'Manipulator Dynamics'
date: '2024-02-12'
tags: ['Robotics', 'Kinematics', 'lecture']
---

### Acceleration of a rigid body

We extend the analysis of rigid body motion to the case of acceleration. At any instant, the derivative of the linear and angular velocity vectors are called linear acceleration and angular acceleration, respectively.

$$
\begin{aligned}
&{}^B \dot{V}_Q = \frac{d}{dt} {}^B V_Q = \underset{\Delta t \rightarrow 0}{lim} \frac{{}^B V_Q(t + \Delta t) - {}^B V_Q(t)}{\Delta t}, \\
&{}^A \dot{\Omega}_B = \frac{d}{dt} {}^A \Omega_B = \underset{\Delta t \rightarrow 0}{lim} \frac{{}^A \Omega_B(t + \Delta t) - {}^A \Omega_B(t)}{\Delta t}
\end{aligned}
$$

#### Linear Acceleration

The velocity of vector $B$ as seen from frame $\{A\}$ is

$$
{}^A V_Q = {}^A_B R {}^B V_Q + {}^A \Omega_B \times {}^A_B R {}^B Q
$$

By differentiating this velocity, we can derive an expression for acceleration, where the origins of $\{A\}$ and $\{B\}$ coincide.

$$
\begin{aligned}
&\frac{d}{dt}({}^A_B R {}^B Q) = {}^A_B R {}^B V_Q + {}^A \Omega_B \times {}^A_B R {}^B Q, \\
&{}^A \dot{V}_Q = \frac{d}{dt}({}^A_B R {}^B Q) + {}^A \dot{\Omega}_B \times {}^A_B R {}^B Q + {}^A \Omega_B \times \frac{d}{dt}({}^A_B R {}^B Q)
\end{aligned}
$$

#### Angular Acceleration

Consider the case where $\{B\}$ rotates about $\{A\}$ with ${}^A\Omega_{B}$, and $\{C\}$ rotates about $\{B\}$ with ${}^B\Omega_{C}$.

$$
{}^A\Omega_{C} = {}^A\Omega_{B} + {}^A_B R {}^B \Omega_C
$$

Differentiating yields

$$
{}^A\dot{\Omega}_{C} = {}^A\dot{\Omega}_{B} + \frac{d}{dt}({}^A_B R {}^B \Omega_C)
$$

Here, the term $\frac{d}{dt}({}^A_B R {}^B \Omega_C)$ on the right-hand side is computed by applying the same expression as in the linear acceleration equation.

---

### Mass Distribution

<img src="https://velog.velcdn.com/images/devjo/post/df44c89c-0133-4e91-b758-84453ea59343/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

For rotational motion about a single axis, the concept of moment of inertia is familiar. For a rigid body that can move freely in three dimensions, infinitely many rotation axes are possible. For rotation about an arbitrary axis, a complete method to characterize the mass distribution of the rigid body is needed. Here we introduce the inertia tensor. In the image above, the vector ${}^A{P}$ represents the position of the differential volume element $dv$.

The inertia tensor with respect to $\{A\}$ is expressed as a $3 \times 3$ matrix

$$
{}^A I = \begin{bmatrix} I_{xx} & -I_{xy} & -I_{xz} \\ -I_{xy} & I_{yy} & -I_{yz} \\ -I_{xz} & -I_{yz} & I_{zz} \end{bmatrix}
$$

The scalar elements are $I_{xx} = \int (y^2 + z^2) \rho dv, I_{yy} = \int (x^2 + z^2) \rho dv, I_{zz} = \int (x^2 + y^2) \rho dv, I_{xy} = \int xy \rho dv, I_{xz} = \int xz \rho dv, I_{yz} = \int yz \rho dv$, where the elements $I_{xx}, I_{yy}, I_{zz}$ are called mass moments of inertia. The elements with mixed indices are called mass products of inertia.

---

### Newton's Equation, Euler's Equation

<img src="https://velog.velcdn.com/images/devjo/post/7da6b2bf-433b-44d5-981f-c5e2bfa84fcc/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Newton's equation states that a force ${F}$ acting at the center of mass of a body accelerates the body at $\dot{v}_{C}$. For a rigid body whose center of mass is accelerating with acceleration, the force causing this is

$$
F=m\dot{v}_C
$$

<img src="https://velog.velcdn.com/images/devjo/post/9e6f29cf-ca34-4a52-ba60-4a07eb38b0d9/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Euler's equation states that a moment ${N}$ acts on a body, and the body is rotating with angular velocity $\omega$ and accelerating with angular acceleration $\dot{\omega}$. For a rigid body, the moment causing this is

$$
N = {}^C I\dot{\omega} + \omega \times {}^C I \omega
$$

---

### Iterative Formulation

#### Outward Iterations

To calculate the inertial forces acting on links, we must compute the rotational velocity, linear and rotational accelerations of each link's center of mass of the manipulator at each instant. These calculations are performed iteratively, starting from link 1 and moving outward sequentially to link $n$.

The propagation of angular velocity and angular acceleration from link to link is

$$
\begin{aligned}
&{}^{i+1} \omega_{i+1} = {}^{i+1}_i R {}^i \omega_i + \dot{\theta}_{i+1} {}^{i+1} \hat{Z}_{i+1}, \\
&{}^{i+1}\dot{\omega}_{i+1} = {}^{i+1}_i R {}^i \dot{\omega}_i + {}^{i+1}_i R {}^i \omega_i \times \dot{\theta}_{i+1} {}^{i+1} \hat{Z}_{i+1} + \ddot{\theta}_{i+1} {}^{i+1} \hat{Z}_{i+1}
\end{aligned}
$$

If joint $i+1$ is prismatic, this simplifies to ${}^{i+1}\dot{\omega}_{i+1} = {}^{i+1}_i R {}^i \omega_i$. The linear acceleration of each link's center of mass is computed as ${}^i \dot{v}_{C_i} = {}^i \dot{\omega}_i \times {}^i P_{C_i} + {}^i \omega_i \times ({}^i \omega_i + {}^i P_{C_i}) + {}^i \dot{v}_i$.

#### Inward Iterations

<img src="https://velog.velcdn.com/images/devjo/post/eb313a5a-d549-4e22-94d5-296f504fd604/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

We can calculate the inertial forces and torques acting at each link's center of mass by applying the Newton-Euler equations.

$$
\begin{aligned}
&F=m\dot{v}_C, \\
&N = {}^C I\dot{\omega} + \omega \times {}^C I \omega
\end{aligned}
$$

By summing the forces acting on link $i$, we obtain the force equilibrium relation. By summing the torques about the center of mass and setting them equal to zero, we obtain the torque equilibrium equation.

$$
\begin{aligned}
&{}^i F_i = {}^i f_i - {}^i_{i+1} R {}^{i+1} f_{i+1}, \\
&{}^i N_i = {}^i n_i - {}^i n_{i+1} + (-{}^i P_{C_i}) \times {}^if_i - ({}^iP_{i+1} - {}^i P_{C_i}) \times {}^i f_{i+1}
\end{aligned}
$$

The force and torque equations can be rearranged into iterative relations from higher-numbered links to lower-numbered links.

---

### The Structure of a Manipulator's Dynamic Equations

#### The State-Space Equation

By symbolically evaluating the Newton-Euler equations, we obtain dynamic equations that can be written in the following form.

$$
\tau = M(\theta) \ddot{\theta} + V(\theta, \dot{\theta}) + G(\theta)
$$

Here, $M(\theta)$ is the mass matrix, $V(\theta, \dot{\theta})$ is the vector of centrifugal and Coriolis terms. Finally, $G(\theta)$ is the gravity term vector.

#### Lagrangian Formulation

If the Newton-Euler approach can be called a force-balance approach to dynamics, the Lagrangian formulation is an energy-based approach to dynamics. The Lagrangian $L$ is a scalar function defined as the difference between kinetic energy $K$ and potential energy $U$.

$$
L(\theta, \dot{\theta}) = K(\theta, \dot{\theta}) - U(\theta)
$$

Here, the total kinetic energy of the manipulator is the sum of the kinetic energies of the individual links. It satisfies $K(\theta, \dot{\theta}) = \sum_{i=1}^n k_i = \frac{1}{2} \dot{\theta}^T M(\theta)\dot{\theta}$. Also, the total potential energy of the manipulator is the sum of the potential energies of the individual links. It satisfies $U(\theta) = \sum_{i=1}^n U_i = -\sum_{i=1}^n (m_ig^TP_{C_i} + U_{ref})$.

---

### Kinematics of closed chain

Any kinematic chain that includes one or more loops is called a closed chain. That is, a closed chain where a fixed platform and a moving platform are connected by a series of legs.

#### Inverse and Forward Kinematics

<img src="https://velog.velcdn.com/images/devjo/post/a7588adb-594b-43f3-810d-8fa6aa195048/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Consider a planar $3 \times \text{RPR}$ parallel mechanism, where three prismatic joints are typically actuated and six revolute joints are passive.

$$
d_i=p+b_i-a_i
$$

Given the position and orientation $(\mathbf{p}_x, \mathbf{p}_y, \phi)$ of the body frame, the leg lengths ($s_1, s_2, s_3$) can be calculated directly from the following equation.

$$
s_i^2 = (p_x + b_{ix} \cos \phi - b_{iy} \sin \phi - a_{ix})^2 + \\
(p_y + b_{ix} \sin \phi + b_{iy} \cos \phi - a_{iy})^2
$$

The forward kinematics problem of determining the position and orientation $(\mathbf{p}_x, \mathbf{p}_y, \phi)$ of the body frame from the leg lengths $(s_1, s_2, s_3)$ is not straightforward. It can be transformed into a polynomial system in $t = \tan(\phi/2)$ through tangent half-angle substitution and reduced to a single 6th-degree polynomial.

#### Differential Kinematics

The differential kinematics of closed chains is complicated because not all joints are actuated. Only the velocities of the actuated joints can be specified, and the velocities of the remaining passive joints must be determined from the kinematic constraint equations.

For the Stewart-Gough Platform, the inverse kinematics Jacobian $G(R, p) \in R^{6 \times 6}$ satisfies $\dot{s} = G(R, p) V_s$, where $V_s \in R^6$ is the spatial twist. We can approach this based on the principle of power conservation used to determine the static relationship $\tau = J^T F$ for open chains. The linear force applied by each leg $i$ is $f_i = \hat{n}_i \tau_i$, where $\hat{n}_i$ is a unit vector. The resulting wrench $F_s$ acting on the moving platform is given by

$$
\begin{aligned}
&\mathbf{F}_s = \sum_{i=1}^6 \mathbf{F}_i \\
&= \sum_{i=1}^6 \begin{pmatrix} \mathbf{r}_i \times \hat{\mathbf{n}}_i \\ \hat{\mathbf{n}}_i \end{pmatrix} \tau_i \\
&= \begin{pmatrix} -\hat{\mathbf{n}}_1 \times \mathbf{q}_1 & \cdots & -\hat{\mathbf{n}}_6 \times \mathbf{q}_6 \\ \hat{\mathbf{n}}_1 & \cdots & \hat{\mathbf{n}}_6 \end{pmatrix} \begin{bmatrix} \tau_1 \\ \vdots \\ \tau_6 \end{bmatrix} \\
&= J_s^{-T} \mathbf{\tau}
\end{aligned}
$$

#### General Parallel Mechanisms

<img src="https://velog.velcdn.com/images/devjo/post/d2c7175c-8e9a-4f5e-b73e-2543b0e4e600/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

The Stewart-Gough Platform is particularly well-suited for static analysis due to its kinematic structure, where each of the six joint forces is directed along its corresponding leg. Therefore, the Jacobian (or more precisely, the inverse Jacobian) can be derived in terms of the screw associated with each straight leg. For simplicity, assuming $m=n=p=5$, the mechanism has $d = n + m + p - 12 = 3$ degrees of freedom.

The forward kinematics of the three chains can be written as

$$
\begin{aligned}
&T_1(\theta_1, \dots, \theta_5) = e^{[\mathcal{S}_1]\theta_1} e^{[\mathcal{S}_2]\theta_2} \cdots e^{[\mathcal{S}_5]\theta_5} M_1 \\
&T_2(\phi_1, \dots, \phi_5) = e^{[\mathcal{P}_1]\phi_1} e^{[\mathcal{P}_2]\phi_2} \cdots e^{[\mathcal{P}_5]\phi_5} M_2 \\
&T_3(\psi_1, \dots, \psi_5) = e^{[\mathcal{Q}_1]\psi_1} e^{[\mathcal{Q}_2]\psi_2} \cdots e^{[\mathcal{Q}_5]\psi_5} M_3
\end{aligned}
$$

The kinematic loop constraint conditions can be expressed as follows. Since these constraints must always be satisfied, we can express the time derivative in terms of spatial twists.

$$
\begin{aligned}
&T_1(\mathbf{\theta}) = T_2(\mathbf{\phi}) \\
&T_2(\mathbf{\phi}) = T_3(\mathbf{\psi})
\end{aligned}
$$

Rearranging in terms of the forward kinematics Jacobian of each chain

$$
\begin{bmatrix} J_1(\mathbf{\theta}) & -J_2(\mathbf{\phi}) & 0 \\ 0 & -J_2(\mathbf{\phi}) & J_3(\mathbf{\psi}) \end{bmatrix} \begin{bmatrix} \dot{\mathbf{\theta}} \\ \dot{\mathbf{\phi}} \\ \dot{\mathbf{\psi}} \end{bmatrix} = \mathbf{0}
$$

---

### Dynamics of open chains

The first step in the Lagrangian mechanics formulation is to choose $n$ independent coordinates $q \in R^n$ that describe the configuration of the system. These coordinates $q$ are called generalized coordinates. Once generalized coordinates are chosen, this defines generalized forces $f \in R^n$. The force $f$ and the rate of change of coordinates $\dot{q}$ are dual to each other in the sense that the inner product $f^T \dot{q}$ corresponds to power.

The Lagrangian function $L(q, \dot{q})$ is defined as the total kinetic energy $K(q, \dot{q})$ of the system minus the potential energy $P(q)$.

$$
L(\mathbf{q}, \dot{\mathbf{q}}) = K(\mathbf{q}, \dot{\mathbf{q}}) - P(\mathbf{q})
$$

The equations of motion can now be expressed using the Lagrangian function as

$$
\mathbf{f} = \frac{d}{dt} \frac{\partial L}{\partial \dot{\mathbf{q}}} - \frac{\partial L}{\partial \mathbf{q}}
$$

Consider the case of a particle of mass $m$ constrained to move on a vertical line. We choose the height $x \in R$ of the particle as the generalized coordinate. Suppose there is a downward gravitational force $mg$ and an external force $f$ applied upward. The equation of motion by Newton's second law is

$$
f - mg = m\ddot{x}
$$

Applying the Lagrangian formulation with $K(x, \dot{x}) = \frac{1}{2} m \dot{x}^2$ and $P(x) = mgx$ and differentiating with respect to $x$ yields the above.

#### General Formulation

The Lagrangian dynamics formulation for a general $n$-link open chain is as follows. The kinetic energy of a rigid-link robot can always be written in the following quadratic form.

$$
K(\mathbf{\theta}, \dot{\mathbf{\theta}}) = \frac{1}{2} \sum_{i=1}^n \sum_{j=1}^n m_{ij}(\mathbf{\theta}) \dot{\theta}_i \dot{\theta}_j = \frac{1}{2} \dot{\mathbf{\theta}}^T M(\mathbf{\theta}) \dot{\mathbf{\theta}}
$$

The Christoffel symbols of the first kind are defined as $\Gamma_{ijk}(\theta)$ and expressed as

$$
\Gamma_{ijk}(\mathbf{\theta}) = \frac{1}{2} \left( \frac{\partial m_{ij}}{\partial \theta_k} + \frac{\partial m_{ik}}{\partial \theta_j} - \frac{\partial m_{jk}}{\partial \theta_i} \right)
$$

#### Single Rigid Body

In the body frame $\{b\}$, let $r_i = (x_i, y_i, z_i)$ be the fixed position of mass $m_i$. The origin of this frame is called the center of mass.

$$
\sum_i m_i \mathbf{r}_i = \mathbf{0}
$$

Now suppose the body is moving with body twist $V_b = (\omega_b, v_b)$. Let $p_i(t)$ be the time-varying position of mass $m_i$ in the inertial frame ${s}$. Then the acceleration of $p_i$ is

$$
\ddot{\mathbf{p}}_i = \dot{\mathbf{v}}_b + [\dot{\mathbf{\omega}}_b] \mathbf{r}_i + [\mathbf{\omega}_b] \mathbf{v}_b + [\mathbf{\omega}_b]^2 \mathbf{r}_i
$$

Assuming the force on a point mass is $f_i = m_i \ddot{p}_i$, the force and moment acting on $m_i$ are

$$\mathbf{f}_i = m_i (\dot{\mathbf{v}}_b + [\dot{\mathbf{\omega}}_b] \mathbf{r}_i + [\mathbf{\omega}_b] \mathbf{v}_b + [\mathbf{\omega}_b]^2 \mathbf{r}_i), \\
\mathbf{m}_i = [\mathbf{r}_i] \mathbf{f}_i
$$

#### Twist–Wrench Formulation

Linear and rotational dynamics can be written in the following combined form.

$$
\begin{bmatrix} \mathbf{m}_b \\ \mathbf{f}_b \end{bmatrix} = \begin{bmatrix} I_b & 0 \\ 0 & mI \end{bmatrix} \begin{bmatrix} \dot{\mathbf{\omega}}_b \\ \dot{\mathbf{v}}_b \end{bmatrix} + \begin{bmatrix} [\mathbf{\omega}_b] & 0 \\ 0 & [\mathbf{\omega}_b] \end{bmatrix} \begin{bmatrix} I_b & 0 \\ 0 & mI \end{bmatrix} \begin{bmatrix} \mathbf{\omega}_b \\ \mathbf{v}_b \end{bmatrix}
$$

Here, the spatial inertia matrix is expressed as $G_b = \begin{bmatrix} I_b & 0 \\ 0 & mI \end{bmatrix}$. By generalizing the cross product of vectors to 6-dimensional twists using the Lie Bracket, we have

$$
\text{ad}_{\mathcal{V}}^T (\mathcal{F}) = [\text{ad}_{\mathcal{V}}]^T \mathcal{F} = \begin{bmatrix} [\mathbf{\omega}] & \mathbf{0} \\ [\mathbf{v}] & [\mathbf{\omega}] \end{bmatrix}^T \begin{bmatrix} \mathbf{m} \\ \mathbf{f} \end{bmatrix} = \begin{bmatrix} -[\mathbf{\omega}] \mathbf{m} - [\mathbf{v}] \mathbf{f} \\ -[\mathbf{\omega}] \mathbf{f} \end{bmatrix}
$$

#### Newton–Euler Inverse Dynamics

Given joint positions $\theta \in R^n$, velocities $\dot{\theta} \in R^n$, and accelerations $\ddot{\theta} \in R^n$, the goal is to compute the right-hand side of the dynamic equation, $\tau = M(\theta) \ddot{\theta} + h(\theta, \dot{\theta})$. We attach a body-fixed reference frame ${i}$ to the center of mass of each link $i$. The base frame is ${0}$ and the end-effector frame is ${n+1}$.

$$
\begin{aligned}
&T_{i-1, i}(\theta_i) = M_{i-1, i} e^{[\mathcal{A}_i]\theta_i},\\
&T_{i, i-1}(\theta_i) = e^{-[\mathcal{A}_i]\theta_i} M_{i, i-1}
\end{aligned}
$$

The twist $V_i$ of link $i$ is the sum of the twist of link $i-1$ expressed in ${i}$ and the twist due to joint velocity $\dot{\theta}_i$.

$$
\mathcal{V}_i = [\text{Ad}_{T_{i, i-1}}] \mathcal{V}_{i-1} + \mathcal{A}_i \dot{\theta}_i
$$

The total wrench acting on each link is $G_i \dot{V}_i - \text{ad}_{V_i}^T (G_i V_i)$ by the rigid body dynamics equation. This total wrench is the sum of the wrench $F_i$ transmitted through joint $i$ and the wrench $F_{i+1}$ transmitted through joint $i+1$.

$$
G_i \dot{\mathcal{V}}_i - \text{ad}_{\mathcal{V}_i}^T (G_i \mathcal{V}_i) = \mathcal{F}_i - \text{Ad}_{T_{i+1, i}}^T (\mathcal{F}_{i+1})
$$

---

### References

[Original Source #1](https://www.changjiangcai.com/files/text-books/Introduction-to-Robotics-3rd-edition.pdf?utm_source=chatgpt.com)

[Original Source #2](https://hades.mech.northwestern.edu/images/7/7f/MR.pdf)

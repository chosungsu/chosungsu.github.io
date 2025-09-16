---
title: 'Foundations from classical mechanics and several methods'
date: '2024-10-30'
tags: ['robotics', 'mathematics', 'lecture']
---

### Multi body dynamics

In many applications of fixed-base robots, we need to derive the multi-body dynamics.

$$
M(q) \ddot{q} + b(q, \dot{q}) + g(q) = \tau + J_c(q)^T F_c
$$

Here, $M(q) \in \mathbb{R}^{n_q \times n_q}$ is the generalized mass matrix; $q, \dot{q}, \ddot{q} \in \mathbb{R}^{n_q}$ are the generalized position, velocity, and acceleration vectors; $b(q, \dot{q})$ collects Coriolis and centrifugal terms; $g(q)$ is gravity; and $F_c \in \mathbb{R}^{n_c}$ denotes external Cartesian forces with Jacobian $J_c(q)$.

---

### Foundations from Classical Mechanics

<img src="https://velog.velcdn.com/images/devjo/post/97cf23db-f42d-4db6-ad13-d9cc0cbfd833/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

#### 1. Newton's law for particles

The most basic formulation of Newtonian mechanics describes the motion of point masses. A point mass has mass $m$, infinitesimal extent, and concentrates its entire mass at a single point with position vector $r$. A point mass has no orientation.

$$
\ddot{r}m = F
$$

Interpreting Newton’s second law for an infinitesimal element, we can write $\ddot{r} \, dm = dF$ by regarding $dm$ as an infinitesimal mass acted upon by an infinitesimal force $dF$.

#### 2. Virtual displacements

We use the operator $\delta$ in variational notation; it plays a role analogous to the differential operator $d$. While differentials describe infinitesimal changes with respect to another variable, a virtual variation of a quantity describes admissible changes that respect constraints at a fixed time instant.

A crucial fact is that when variations are taken of time-dependent quantities at a fixed instant, the explicit time dependence is ignored. Defining the admissible variation of the position vector (the virtual displacement) $\delta r$ and assuming the position is a function of generalized coordinates and time, $r = r(q, t)$, we obtain

$$
\delta_{r}(q,t)=\sum_{k=1}^{n_q} \frac{\partial_r}{\partial_{q_k}} \delta_{q_k}
$$

by the chain rule over the $n_q$ components of $q$.

#### 3. Virtual displacement of single rigid bodies

<img src="https://velog.velcdn.com/images/devjo/post/23ee1f79-1445-4918-97d5-ed948e27015c/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

An extended body with mass in 3D Cartesian space can be modeled as many particles tightly bound together to form a single rigid body. Each infinitesimal mass element $dm$ is constrained by the body’s motion, so an absolute position and velocity can be assigned at every instant.

Consider a point $S$ on the body and define the relative position of $dm$ with respect to $S$ as $\rho$.

$$
r=r_{OS} + \rho, \\
\dot{r} = v_s + \Omega \times \rho = \begin{bmatrix} I_{3 \times 3} & -[\rho]_x\end{bmatrix}, \\
\ddot{r} = a_s + \Psi \times \rho + \Omega \times (\Omega \times \rho)
$$

These equations describe the motion of an arbitrary infinitesimal mass element $dm$ of body $B$. Here, $r_{OS}$ is the absolute position of point $S$ on the body, and $\rho$ is the position of $dm$ relative to $S$.

#### 4. Virtual displacement of multi-body systems

A multi-body system exhibits only motions compatible with the constraints imposed by joints that restrict relative motion between links.

$$
\begin{pmatrix} v_s \\ \Omega \end{pmatrix} = \begin{bmatrix} J_P \\ J_R\end{bmatrix} \dot{q}, \\
\begin{pmatrix} a_s \\ \Psi \end{pmatrix} = \begin{bmatrix} J_P \\ J_R\end{bmatrix} \ddot{q} + \begin{bmatrix} \dot{J_P} \\ \dot{J_R}\end{bmatrix} \dot{q}
$$

#### 5. Principle of virtual work

One of the fundamental principles of mechanics is the principle of virtual work: configuration (holonomic) constraints do no work along admissible virtual displacements. For a constraint force $F_c$ applied at a point $r_c$ (action–reaction pairs acting equally on the associated bodies), we have $\delta W = \delta r_c^T F_c = 0$.

Considering an infinitesimal $dm$ within body $B$, d’Alembert’s principle for dynamic equilibrium of a particle reads:

$$
\delta W = \int_B \delta r^T \cdot (\ddot{r}dm-dF_{ext})=0, \forall \delta_r
$$

where $dF_{ext}$ denotes external forces acting on $dm$, and $\delta r$ is its virtual displacement.

---

### Newton–Euler Method

#### For single bodies

단일 물체에 대한 가상 일의 원리를 평가하면 아래와 같습니다.

$$
0=\delta W \\
= \int_B \begin{pmatrix} \delta r_s \\ \delta \psi\end{pmatrix}^T \begin{bmatrix} I_{3 \times 3} \\ [\rho]_x\end{bmatrix} \\
\cdot \begin{pmatrix} I_{3 \times 3} & -[\rho]_x\end{pmatrix} \begin{bmatrix} \begin{pmatrix} a_s \\ \Psi\end{pmatrix}dm + [\Omega]^2_x \rho dm - dF_{ext}\end{bmatrix}
$$

With no active constraints from joints or contacts, this must hold for arbitrary virtual displacements. Introducing the following definitions for linear and angular momentum:

$$
p_s = mv_s, \\
N_s = \Theta_s \cdot \Omega, \\
\dot{p_s} = ma_s, \\
\dot{N_s} = \Theta_s \cdot \Psi + \Omega \times \Theta_s \cdot \Omega
$$

Using these, a freely moving body must satisfy that the rate of change of linear and angular momentum equals the sum of external forces and torques:

$$
0=\begin{pmatrix} \delta r_s \\ \delta \psi\end{pmatrix}^T \begin{bmatrix} \begin{pmatrix} \dot{p_s} \\ \dot{N_s}\end{pmatrix} - \begin{pmatrix} F_{ext} \\ T_{ext}\end{pmatrix}\end{bmatrix}
$$

By Newton–Euler relations, $F_{ext}$ is the resultant external force acting through the center of gravity (COG), and $T_{ext}$ is the resultant external torque. External forces not acting through the COG must be converted into an equivalent force/moment pair at the COG. The inertia tensor transforms as $_B \Theta = C_{BA} \, {}_A\!\Theta \, C_{BA}^T$.

#### 2. For multi-body systems

<img src="https://velog.velcdn.com/images/devjo/post/2d58abfa-cc3a-4aee-82d2-80c161cfab2b/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

In multi-body dynamics, it is useful to conceptually cut the system at the joints and consider each body as a separate free body. Constraint forces $F_i$ at the joints are then introduced as external forces. These enforce that the two bodies move only along the allowed joint directions and block motion along the constrained directions.

---

### Lagrange Method

Another common approach to deriving equations of motion is the Lagrange method. Originating from analytical mechanics, it is closely related to d’Alembert’s and Hamilton’s principles. The method revolves around three fundamental concepts:

$\rightarrow$ 시스템에 적용 가능한 제약 조건에 대한 정보를 포함하거나 포함하지 않을 수 있는 일반화 좌표 $q$와 일반화 속도 $\dot{q}$에 대한 정의

$\rightarrow$ 라그랑주 함수 $L$이라는 스칼라 함수는 총 운동 에너지 $T$와 총 위치 에너지 $U$의 차이를 말합니다.

$\rightarrow$ 라그랑주 함수와 총 외부 일반화 힘 $\tau$에 적용되는 오일러 라그랑주 방정식은 $\frac{d}{dt} (\frac{aL}{a\dot{q}}) - (\frac{aL}{aq})=\tau$로 정리됩니다.

#### Kinetic Energy

For $n_b$ bodies, the kinetic energy is:

$$
T=\sum_{i=1}^{n_b}(\frac{1}{2} m_i {}_A\dot{r}_{S_i}^T {}_A\dot{r}_{S_i} + \frac{1}{2}{}_B \Omega_{S_i}^T \cdot {}_B\Theta_{S_i} \cdot {}_B \Omega_{S_i})
$$

For each body $B_i$ in the system, the translational part can be computed in any frame $A$, while it may be convenient to compute the rotational part in a frame where the inertia matrix $\Theta_{S_i}$ is diagonal, i.e., a body frame $B$ whose basis vectors are principal with respect to the mass distribution.

Using Jacobians for each body $B_i$, we can express $\dot{r}_{S_i} = J_{S_i} \, \dot{q}$ and $\Omega_{S_i} = J_{R_i} \, \dot{q}$ and rewrite the kinetic energy as

$$
T(q, \dot{q}) = \frac{1}{2} \dot{q}^T (\sum_{i=1}^{n_b} [J_{S_i}^T m J_{S_i} + J_{R_i}^T \Theta_{S_i} J_{R_i}]) \dot{q}
$$

which defines the generalized mass matrix in parentheses, responsible for both inertial and nonlinear centrifugal/Coriolis terms in the final EOM.

#### Potential Energy

In typical mechanical systems, two main contributions to potential energy are considered: gravitational potential energy from masses and elastic potential energy stored in deformed elastic elements at rest.

For gravity, each body $B_i$ has potential energy due to Earth’s gravitational field. While gravity is nonlinear on large scales, it is usually approximated as uniform and unidirectional along the unit vector $_I e_g$ acting at each body’s center of mass (CoM).

$$
F_{g_i} = m_i g _I e_g, \\
U_g = -\sum_{i=1}^{n_b}r_{s_i}^T F_{g_i}
$$

Given the CoM position $r_{S_i}$ of each body, the gravitational potential can be computed (with the reference level $O$ chosen arbitrarily). Elastic elements $E_j$ with linearized torque–deformation relations can be modeled as:

$$
U_{E_j} = \frac{1}{2} k_j (d(q) - d_o)^2
$$

Here, $d(q)$ is a function of the generalized coordinates describing the element’s configuration (e.g., spring length), and $d_o$ is the rest configuration where the element exerts no force.

---

### References

[Source #1](https://ethz.ch/content/dam/ethz/special-interest/mavt/robotics-n-intelligent-systems/rsl-dam/documents/RobotDynamics2017/RD_HS2017script.pdf)




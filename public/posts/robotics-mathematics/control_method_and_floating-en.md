---
title: 'Control method and floating base'
date: '2024-10-23'
tags: ['robotics', 'mathematics', 'lecture']
---

### Inverse differential

$$
w_e = J_{_e O}(\dot{q})
$$

The Jacobian $J_{_e O}(q)$ maps joint-space velocities $\dot{q}$ to the end-effector twist $w_e$.

In control, we are interested in solving the inverse problem, which is computed using the pseudo-inverse as $\dot{q} = J_{_e O}^+ w_e^*$.

A robot is said to be singular at a configuration $q_s$ where $J_{_e O}(q_s)$ has rank smaller than the number of task-space coordinates $m_0$. At a singularity, there exists no generalized velocity $\dot{q}$ that can satisfy $w_e^* = J_{_e O}(q) \, \dot{q}$ for the desired end-effector velocity $w_e^*$.

Using the Moore–Penrose pseudo-inverse, $\dot{q} = J_{_e O}^+ w_e^*$ minimizes the least-squares error. Unfortunately, near singular configurations $J_{_e O}$ has singular values close to zero and becomes ill-conditioned. This means that a small desired velocity $w_e^*$ in those directions leads to extremely large joint velocities.

When ill-conditioned near singularities, one can use a damped version of the Moore–Penrose pseudo-inverse as follows.

$$
\dot{q}=J_{_e O}^T(J_{_e O}J_{_e O}^T - \lambda^2I)^{-1} w_e^*
$$

Here, $\lambda$ is the damping coefficient. Larger damping yields a more stable solution but slower convergence. This inversion minimizes the cost $|w_e^* - J_{_e O}\,\dot{q}|^2 + \lambda^2 |\dot{q}|^2$.

A robot is called redundant if at some configuration $q^*$ the rank of $J_{_e O}(q^*)$ is smaller than $n$. In that case, the Moore–Penrose pseudo-inverse solution $\dot{q} = J_{_e O}^T (J_{_e O} J_{_e O}^T)^{-1} w_e^*$ satisfies $w_e^* = J_{_e O} \, \dot{q}$ while minimizing $|\dot{q}|^2$. Redundancy implies an infinite set of solutions.

In $\dot{q} = J_{_e O}^+ w_e^* + N \, \dot{q}_0$, the matrix $N = N(J_{_e O})$ is a null-space projector such that $J_{_e O} N = 0$. This allows modifying the generalized velocity with any $\dot{q}_0$ without affecting the end-effector motion.

---

### Multi task inverse differential control

For tasks or operational-space objectives such as following a trajectory, reaching an end-effector orientation, or enforcing kinematic constraints, we define the Jacobian and task velocity as:

$$
task_i := \{J_i, w_i^*\}
$$

#### With equal priority

If all $n_t$ tasks have equal priority, the generalized velocity is:

$$
\dot{q} = \begin{bmatrix} J_1 \\ \vdots \\ j_{n_t}\end{bmatrix}^+ \begin{pmatrix} w_1^* \\ \vdots \\ w_{n_t}^*\end{pmatrix}
$$

If the stacked Jacobian has more rows than columns, tasks are satisfied in the least-squares sense by minimizing $|\bar{w} - \bar{J} \, \dot{q}|^2$. To give some tasks higher weights than others, use the weighted pseudo-inverse defined as $\bar{J}_w^+ = (\bar{J}^T W \, \bar{J})^{-1} \bar{J}^T W$.

#### With prioritization

To explicitly prioritize certain tasks over others, we use consecutive null-space projections. The solution for $task_1$ is $\dot{q} = J_1^+ w_1^* + N_1 \, \dot{q}_0$, and to avoid violating the first objective the following must hold:

$$
w_2=J_2\dot{q}, \\
\dot{q}_0=(J_2N_1)^+(w_2^*-J_2J_1^+w_1^*)
$$

For $n_t$ tasks, the solution is defined recursively as:

$$
\dot{q}=\sum_{i=1}^{n_t}\bar{N}_i \dot{q}_i
$$

Here, $\bar{N}_t$ denotes the null-space projector of the stacked Jacobian up to task $t$.

---

### Inverse kinematics

The goal of inverse kinematics is to find the joint configuration $q$ as a function of the desired end-effector pose $\chi_e^*$, i.e., $q = q(\chi_e^*)$.

#### Analytical solution

For classical 6-DoF robotic arms, a necessary condition for an analytical solution is that three consecutive axes intersect. The geometric approach decomposes the manipulator’s spatial geometry into several planar problems and applies geometric laws, while the algebraic approach manipulates transformation matrices to extract joint angles.

#### Numerical solution

With increased computational power, numerical approaches map differences in joint-space coordinates $\Delta q$ directly to differences in end-effector coordinates $\Delta \chi_e$ using the analytical Jacobian, $\Delta \chi_e = J_{_e \mathcal{A}} \, \Delta q$.

This step is repeated until, for the target and initial poses, a configuration $q^*$ is found such that $|\Delta \chi_e| = |\chi_e^* - \chi_e(q^*)| < \text{tol}$ for a given tolerance.

Unfortunately, this approach has issues. First, if the error between target and current pose $\Delta \chi_e^i$ is large, the error linearization implemented by the analytical Jacobian is insufficient. To address this, use the following scaling:

$$
q \leftarrow q + k J_{_e \mathcal{A}}^+ \Delta \chi_e
$$

Here $0 < k < 1$ keeps the iteration within the region where the linearization is valid and avoids overshoot or divergence, at the cost of slower convergence. Second, when the target is near a singular configuration, Jacobian inversion becomes ill-conditioned; damping helps. Another option is the Jacobian transpose update $q \leftarrow q + \alpha J_{_e \mathcal{A}}^T \Delta \chi_e$, which guarantees convergence for sufficiently small $\alpha$.

#### Appropriate Rotation error

Ideally, we want a rotation error and direction that allow rotation along the shortest path.

A suitable parameterization is the angle–axis representation. Since the rotation axis remains constant during rotation, choose the rotation error as $\Delta \phi = \Delta \varphi$. This parameterizes the relative rotation $C_{GS}$ from the start orientation $C_{SI}(\varphi^t)$ to the goal orientation $C_{GI}(\varphi^*)$.

Note that $\Delta \varphi$ is not simply $\varphi^* - \varphi^t$. Given the definition of angular velocity, the update above can be written as $q \leftarrow q + k_{_p R} J_{_e O_R}^+ \Delta \varphi$.

If $k_{pR}$ is chosen very small, the algorithm rotates from the initial to the goal pose along the “shortest path.”

#### Trajectory control

Pure inverse differential control is insufficient to track predefined spatial trajectories because the pose drifts without position/orientation feedback. We can stabilize it using weighted tracking-error feedback.

For position tracking with a predefined position $r_e^*(t)$ and velocity $\dot{r}_e^*(t)$, the problem is straightforward. The feedback term should drive the following to zero:

$$
\Delta r_e^t = r_e^*(t) - r_e(q^t)
$$

This yields the following trajectory controller:

$$
\dot{q}^ = J_{_e O_P}^+(q^t) \cdot (\dot{r}_e^*(t) + k_{P_P}\Delta r_e^t)
$$

Here $k_{P_P}$ denotes the position-feedback gain that determines how quickly the actual position converges to the target. When implemented in a digital control loop with fixed time step $\Delta t$, bounds can be derived via eigenvalue analysis.

---

### Floating base kinematics

<img src="https://velog.velcdn.com/images/devjo/post/4919c8c4-b0b0-495c-a038-730d97c040c0/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

As illustrated above, free-floating robots such as quadrupeds and humanoids are described by $n_b$ unactuated base coordinates $q_b$ and $n_j$ actuated joint coordinates $q_j$.

$$
q = \begin{pmatrix} q_b \\ q_j\end{pmatrix}
$$

The unactuated base is free in translation and rotation.

$$
q_b = \begin{pmatrix} q_{b_P} \\ q_{b_R}\end{pmatrix} \in R^3 \times SO(3)
$$

Here, the position $q_{b_P}$ and rotation $q_{b_R}$ can be parameterized in different ways. Consequently, the dimension of the generalized coordinate vector of a floating-base system, $n_b + n_j$, depends on the rotation parameterization. The minimum number of base generalized coordinates is $n_{b_0} = 6$.

#### Generalized velocity and acceleration

Because differentiation on $SO(3)$ differs from $\mathbb{R}^3$, we introduce generalized velocity and acceleration vectors.

$$
u = \begin{pmatrix} _IV_B \\ _B \omega_{IB} \\ \dot{\varphi}_1 \\ \vdots \\ \dot{\varphi}_{n_j}\end{pmatrix} \in R^{6+n_j}=R^{n_u}, \\
\dot{u} = \begin{pmatrix} _Ia_B \\ _B \psi_{IB} \\ \ddot{\varphi}_1 \\ \vdots \\ \ddot{\varphi}_{n_j}\end{pmatrix} \in R^{6+n_j}
$$

The time derivative of the rotational coordinates of the base does not map directly to angular velocity; instead, we relate generalized and time derivatives as:

$$
u = E_{fb} \cdot \dot{q}, \\
E_{fb} = \begin{bmatrix} I_{3 \times 3} & 0 & 0 \\ 0 & E_{\chi_R} & 0 \\ 0 & 0 & I_{n_j \times n_j}\end{bmatrix}
$$

#### Forward kinematics

For a point $Q$ attached at the end of a kinematic chain starting from the floating base $B$, the relation between generalized velocity $u$ and task-space velocity $_I V_Q$ is derived as follows:

$$
_I r_{IQ}(q) = _I r_{IB}(q) + C_{IB}(q) \cdot _B r_{BQ}(q)
$$

Here, the rotation matrix $C_{IB}(q)$ describes the orientation of the floating base $B$ with respect to the inertial frame $I$, and $_I r_{IB}(q)$ denotes the position of $B$ with respect to $I$, expressed in the inertial frame.

#### Contacts and constraints

In kinematics, contacts between the robot and the environment can be modeled as kinematic constraints. Each contact point $C_i$ with the environment imposes three constraints:

$$
_I r_{IC_i} = \text{const}, \\
_I \dot{r}_{IC_i} = _I \ddot{r}_{IC_i} = \begin{pmatrix} 0 \\ 0 \\ 0\end{pmatrix}
$$

These contact constraints can be expressed in terms of generalized velocities and accelerations using the contact-point Jacobian: $_I J_{C_i} \, u = 0$, $\; _I J_{C_i} \, \dot{u} + _I \dot{J}_{C_i} \, u = 0$. With $n_c$ active contacts, the constraints are stacked accordingly.

---

### References

[Source #1](https://ethz.ch/content/dam/ethz/special-interest/mavt/robotics-n-intelligent-systems/rsl-dam/documents/RobotDynamics2017/RD_HS2017script.pdf)




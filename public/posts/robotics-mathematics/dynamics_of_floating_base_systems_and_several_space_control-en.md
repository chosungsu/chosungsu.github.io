---
title: 'Dynamics of floating base systems and several space control'
date: '2024-11-06'
tags: ['robotics', 'mathematics', 'lecture']
---

### Dynamics of floating base systems

The dynamics of floating base systems are defined as follows.

$$
M(q) \dot{u} + b(q, u) + g(q) = S^T_{\tau} + J_{ext}^T F_{ext}
$$

The generalized coordinates of a floating base system consist of actuated joint coordinates $q_j$ and unactuated base coordinates $q_b$, with velocities $u_j = \dot{q}_j \in \mathbb{R}^{n_j}$ and $u_b \in \mathbb{R}^6$, respectively. The selection matrix $S$ selects the actuated joints as follows.

$$
u_j=S_u=S \begin{pmatrix} u_b \\ u_j\end{pmatrix} = \begin{pmatrix} 0_{6 \times 6} & I_{6 \times 6}\end{pmatrix}\begin{pmatrix} u_b \\ u_j\end{pmatrix}
$$

Here, external forces $F_{ext}$ are required to control the unactuated base coordinates $q_b$.

$$
M(q) \dot{u} + b(q, u) + g(q) + J_{c}^T F_{c} = S^T_{\tau}
$$

In the above equation, $F_c$ represents the forces exerted by the robot on the environment.

#### 1. Contact Forces

There are two fundamentally different approaches to modeling contact forces. The soft contact method models the interaction as force elements (i.e., spring-damper), where the force is a function that depends only on the position and velocity of the contact point. The hard contact method treats contact as kinematic constraints.

For the soft contact model, we typically identify the initial contact point with the environment as $r_{c0}$. When using a linear spring-damper model for the environment, the contact force (force exerted by the robot on the environment) is given by:

$$
F_c = k_p(r_c-r_{cO}) + k_d \dot{r}_c
$$

One major issue is that the coupled differential equations for multi-body systems and contact become very stiff (slow multi-body dynamics and very fast contact dynamics). Solving these problems results in low speed or low accuracy. To overcome this issue, contact parameters for stiffness and damping are often tuned as numerical simulation parameters that have no relation to actual physical parameters.

Instead of contact forces arising from force elements at contact points, contact can also be treated as kinematic constraints. If a point $C$ with position $r_c$ is in contact, it is no longer allowed to move.

$$
r_c = \text{const}, \\
\dot{r}_c = J_c u = 0, \\
\ddot{r}_c = J_c \dot{u} + \dot{J}_c u = 0
$$

In this case, the contact force is given by:

$$
F_c = (J_c M^{-1}J_c^T)^{-1} [J_cM^{-1}(S^T_{\tau} - b - g) + \dot{J}_c u]
$$

This provides a significant advantage by offering a direct approach to estimating ground reaction forces without additional contact force sensors.

#### 2. Constraint Consistent Dynamics

The dynamically consistent support null-space matrix is defined as follows:

$$
N_c = I-M^{-1}J_c^T(J_cM^{-1}J_c^T)^{-1}J_c
$$

Here, $N_c$ defines a generalized motion space that has no acceleration or force coupling effects with respect to the support links. Substituting the solution for contact forces into the equations of motion yields:

$$
M \dot{u} + N_c^T(b) + g + J_c^T(J_cM^{-1}J_c^T)^{-1}\dot{J}_c u = N_c^TS^T\tau
$$

By additionally including the support constraint condition $\dot{J}_c u = -J_c \dot{u}$, the constraint-consistent equations of motion can be formulated concisely as:

$$
N_c^T(M\dot{u} + b + g) = N_c^TS^T \tau
$$

#### 3. Contact Switches and Impact Collisions

The hard contact model requires subdividing the analysis of system dynamics into two phases: before and after contact situation changes or collisions. Collision itself is a complex physical phenomenon that occurs when two or more bodies collide with each other. The characteristics of collision are very short duration and high peak forces, resulting in rapid energy dissipation and large accelerations. To model the energy transfer and dissipation process, various coefficients such as coefficient of restitution and impulse ratio are used.

To solve for contact impulses, we use the equations of motion for a single time point $t_0$:

$$
\int_{t_0} [M \dot{u} + b + g + J_c^T F_c-S^T \tau] \\
= M(u^+-u^-) + J_c^TF_c = 0
$$

Here, $F_c$ is the force due to the impulse, and $u^-$ and $u^+$ are the generalized velocities before and after collision, respectively. Assuming a completely inelastic collision with Newtonian collision law, all contact points considered part of the collision come to an instantaneous stop as $\dot{r}_c^+ = J_c u^+ = 0$. Therefore, the equations of motion incorporating constraints after collision are:

$$
F_c = (J_cM^{-1}J_c^T)^{-1}J_c\dot{q}^{-1} = \Lambda_c \dot{r}_c^{-1}
$$

In the above equation, considering the basic mechanics that impulse is the product of mass and velocity, the inertia seen at the support point (end effector inertia) is identified as $(J_cM^{-1}J_c^T)^{-1}$.

Instantaneous changes in contact situations are always associated with kinetic energy loss.

$$
E_{loss} = -\frac{1}{2} \Delta u^T M \Delta u = -\frac{1}{2} \dot{r}_c^{-T}\Lambda_c\dot{r}_c^{-}
$$

---

### Joint space dynamic control

Current industrial robots rely almost entirely on joint position control concepts. They are based on PID controllers to independently regulate the position or velocity of all robot joints. These controllers compensate for disturbances from actuators and the entire robot, and ideally achieve perfect tracking of desired motions. Model-based load compensation can only be integrated when joint torques are additionally sensed.

#### 1. Joint Impedance Regulation

For torque controllable actuators, the joint feedback gains for joint position $k_p$ and velocity $k_d$ correspond to joint stiffness and damping, calculated as follows:

$$
\tau^*=k_p(q^*-q) + k_d(\dot{q}^*-\dot{q})
$$

Here, $q^*$ and $\dot{q}^*$ represent the desired joint position and velocity, respectively. Applying this control law to a robot arm yields steady-state tracking error:

$$
M(q)\ddot{q}^* + b(q, \dot{q}) + g(q) = k_p(q^*-q) + k_d(\dot{q}^* - \dot{q}), \\
M(q)\ddot{q}^* \to 0, \\
b(q, \dot{q}) \to 0
$$

To compensate for steady-state offset and adjust joint impedance, a common approach is to select the desired actuator torque as follows:

$$
\tau^*=k_p(q^*-q)+k_d(\dot{q}^* - \dot{q}) + \hat{g}(q)
$$

Here, $\hat{g}(q)$ represents the estimated gravitational effects.

Inverse Dynamics Control is used to circumvent the drawback that since the inertia seen at each joint varies with robot configuration, PD gains must be selected for some average configuration in the workspace, which reduces performance when dynamic effects become significant.

$$
\tau = \hat{M}(q)\ddot{q}^* +\hat{b}(q, \dot{q}) + \hat{g}(q)
$$

Here, $\hat{M}(q)$, $\hat{b}(q, \dot{q})$, and $\hat{g}(q)$ are estimates of $M(q)$, $b(q, \dot{q})$, and $g(q)$, respectively. In closed-loop dynamics, this yields $I \ddot{q} = \ddot{q}^*$. This allows forming decoupled dynamics for all joints, and by generalization, the acceleration can be selected as $\ddot{q}^* = k_p(q^*-q)+k_d(\dot{q}^* - \dot{q})$.

---

### Task space dynamic control

In most situations, we want to move specific points in the task space, i.e., the world-fixed frame. The linear and rotational acceleration of the end-effector $e$ is connected to the generalized acceleration through the geometric Jacobian:

$$
\dot{w}_e = \begin{pmatrix} \ddot{r} \\ \dot{w}\end{pmatrix}_e = J_e \ddot{q} + \dot{J}_e \dot{q}
$$

#### 1. Multi-task Decomposition

Inverse dynamics can be performed while executing multiple tasks. Given a set of motion goals with desired task space accelerations and corresponding Jacobians, all goals can be treated with equal priority:

$$
\ddot{q} = \begin{bmatrix} J_1 \\ \vdots \\J_{n_t} \end{bmatrix}^+ ( \begin{pmatrix} \dot{w}_1 \\ \vdots \\ \dot{w}_{n_t}\end{pmatrix} - \begin{bmatrix} \dot{J}_1 \\ \vdots \\ \dot{J}_{n_t}\end{bmatrix} \dot{q})
$$

When some tasks have higher priority, a recursive algorithm can be used to determine the solution:

$$
\ddot{q} = \sum_{i=1}^{n_t} N_i \ddot{q}_i, \\
\ddot{q}_i = (J_iN_i)^+(\dot{w}_i^*-\dot{J}_i\dot{q} - J\sum_{k=1}^{i-1}N_k\dot{q}_k)
$$

Here, $N_i$ represents the null space projection of the stacked Jacobian.

#### 2. End-effector Dynamics

The end-effector dynamics can be interpreted by expanding $\dot{w}_e$ above as follows:

$$
\dot{w}_e = J_e M^{-1}(\tau -b -g) + \dot{J}_e \dot{q}
$$

By replacing joint torques with end-effector forces pre-multiplied by the Jacobian transpose, $\tau = J_e^TF_e$, the end-effector dynamics $\Lambda_e \dot{w}_e + \mu + p = F_e$ are obtained. Here, $\Lambda_e = (J_eM^{-1}J_e^T)^{-1}$, $\mu = \Lambda_eJ_eM^{-1}b - \Lambda_e\dot{J}_e\dot{q}$, and $p = \Lambda_eJ_eM^{-1}g$ represent the end-effector inertia, centrifugal/Coriolis, and gravity terms, respectively.

#### 3. End-effector Motion Control

The inverse form of the task space equations of motion can be used to define the desired joint torques. By combining joint torques and end-effector dynamics from above, the equation can be derived as $\tau^* = \hat{J}_e^T(\hat{\Lambda}_e \dot{w}_e^* + \hat{\mu} + \hat{p})$. For the desired acceleration $\dot{w}_e^*$, the control strategy $k_p\begin{pmatrix} r_e^*-r_e \\ \Delta \psi_e\end{pmatrix} + k_d(w_e^* - w_e)$ is used, where $\Delta \psi_e$ is used as the end-effector rotation error.

#### 4. Operational Space Control

There are many situations where a robot must apply forces in some directions while moving in others. For example, when cleaning a window, the robot applies a specific pressure in the normal direction while controlling motion in all other directions.

Selection matrices $S_M, S_F$ for motion and force directions are defined as follows:

$$
\tau^*=\hat{J}^T(\hat{\Lambda} S_M \dot{w}_e^* + S_FF_c + \hat{\tilde{\mu}} + \hat{p})
$$

Specification matrices for position and orientation can be defined as:

$$
\sum_p = \begin{bmatrix} \sigma_{px} & 0 & 0 \\ 0 & \sigma_{py} & 0 \\ 0 & 0 & \sigma_{pz}\end{bmatrix}, \\
\sum_r = \begin{bmatrix} \sigma_{rx} & 0 & 0 \\ 0 & \sigma_{ry} & 0 \\ 0 & 0 & \sigma_{rz}\end{bmatrix}
$$

Here, $\sigma_i$ is a binary value that is assigned 1 when free motion is specified along (linear) or around (rotational) a particular axis, and 0 otherwise. When the contact force coordinate frame is rotated by rotation transformation matrix $C$, the two selection matrices are defined as:

$$
S_M = \begin{pmatrix} C^T \sum_p C & 0 \\ 0 & C^T \sum_r C\end{pmatrix}, \\
S_F = \begin{pmatrix} C^T (I_3 - \sum_p) C & 0 \\ 0 & C^T (I_3 - \sum_r) C\end{pmatrix}
$$

---

### Inverse Dynamics for Floating-Base Systems

When working with floating base systems, we need to perform inverse dynamics while ensuring that contact constraints are satisfied. Given a constraint-consistent desired acceleration $\dot{u}^*$, we can invert the constraint-consistent equations of motion:

$$
\tau^*=(N_c^T S^T)^+ N_c^T(M \dot{u} + b + g)
$$

Note that we must take the pseudo-inverse $(N_c^T S^T)^+$. When considering multi-task solutions, there exists a null-space $N(N_c^TS^T)\tau_0^*$ that can modify $\tau^*$. The support consistent equations of motion $N_c^T S^T \tau^* = N_c^T (M\dot{u} + b + g)$ still hold. In other words, there exist different joint torque distributions that result in the same motion $\dot{u}^*$.

#### 1. Quadratic Problems

There are many approaches to dealing with the problem of simultaneously controlling different operational space objectives. These tasks include motion at selected positions (e.g., end-effector, CoG, etc.), desired contact forces, or joint torques.

A comprehensive method is to understand operational space control as a sequential least squares optimization problem of linear objectives. The hierarchical least squares optimization for $n_T$ sets of linear equations is defined as $A_i x = b_i$, where $x$ is the optimization variable and problems with the same priority $i \ge 1$ are stacked in matrices and vectors on both sides.

#### 2. Iterative Null-Space Projection

The requirement that no task should affect tasks of higher priority can be formulated as the sum of task-specific $x_i$ pre-multiplied by the null space projection matrix $N_i$ of higher priority tasks:

$$
x = \sum_{k=1}^{n_T} N_k x_k
$$

The null space projector $N_i$ is defined as $N_i = N([A_1^T \dots A_{i-1}^T]^T)$, where $N_1 = I$ and the sufficient condition satisfies $A_iN_j=0$.

Now the method to find the solution for each task is as follows:

$$
A_i x - b_i = A_i \sum_{k=1}^{n_T}N_kx_k - b_i, \\
x_i = (A_iN_i)^+(b_i - A_i \sum_{k=1}^{n_T}N_kx_k)
$$

---

### References

[Source #1](https://ethz.ch/content/dam/ethz/special-interest/mavt/robotics-n-intelligent-systems/rsl-dam/documents/RobotDynamics2017/RD_HS2017script.pdf)




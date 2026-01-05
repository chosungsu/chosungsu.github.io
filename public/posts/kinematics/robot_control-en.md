---
title: 'Robot Control'
date: '2024-02-16'
tags: ['Robotics', 'Kinematics', 'lecture']
---

### Error Dynamics

If we denote the desired joint position as $\theta_d(t)$ and the actual joint position as $\theta(t)$, the joint error is defined as follows.

$$
\theta_e(t) = \theta_d(t) - \theta(t)
$$

The differential equation governing the evolution of the joint error $\theta_e(t)$ of the controlled system is called error dynamics. The purpose of a feedback controller is to create error dynamics such that $\theta_e(t)$ converges to zero or a small value as $t$ increases.

#### Error Response

The unit error response is defined as the response $\theta_e(t)$, $t > 0$ of the control system to initial conditions $\theta_e(0) = 1$ and $\dot{\theta}_e(0) = \ddot{\theta}_e(0) = \cdots = 0$. A general error response $\theta_e(t)$ can be described in terms of transient response and steady-state response.

Overshoot occurs when the error response initially exceeds the final steady-state error, and is defined as follows.

$$
\text{overshoot} = \left| \frac{\theta_{e, \min} - e_{ss}}{\theta_e(0) - e_{ss}} \right| \times 100\%
$$

<img src="https://velog.velcdn.com/images/devjo/post/e681bb9f-dfaf-4e3c-b2e8-e4a79a06cf35/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

The 2% settling time is the first time $T$ such that $|\theta_e(t) - e_{ss}| \le 0.02(\theta_e(0) - e_{ss})$ for all $t \ge T$.

#### Linear Error Dynamics

$$
a_p \theta_e^{(p)} + a_{p-1} \theta_e^{(p-1)} + \cdots + a_2 \ddot{\theta}_e + a_1 \dot{\theta}_e + a_0 \theta_e = c
$$

This equation is a $p$th-order differential equation because the $p$th time derivative of $\theta_e$ exists. It is homogeneous if the constant $c$ is zero, and nonhomogeneous if $c \ne 0$. The characteristic equation in the homogeneous case is as follows.

$$
s^p + a'_ {p-1} s^{p-1} + \cdots + a'_2 s^2 + a'_1 s + a'_0 = 0
$$

A system is said to be stable if all eigenvalues (roots) of the matrix $\mathbf{A}$ have negative real parts.

#### First-Order Error Dynamics

The equation of motion for a mass $m$ is $m \ddot{\theta}_e + b \dot{\theta}_e + k \theta_e = f$, and in the limit as the mass approaches zero, it reduces to the first-order dynamics form $\dot{\theta}_e + \frac{k}{b} \theta_e = 0$. Therefore, first-order error dynamics with $f=0$ is as follows.

$$
\dot{\theta}_e(t) + \frac{1}{\tau} \theta_e(t) = 0
$$

Here, $\tau$ is called the time constant.

---

### Motion Control with Velocity Inputs

Generally, we assume that force or torque can be directly controlled at robot joints, and the robot's dynamics convert this control input into joint acceleration. However, there are cases where we can assume that joint velocity can be directly controlled, such as when the actuator is a stepper motor.

#### Single Joint

<img src="https://velog.velcdn.com/images/devjo/post/c75cf33a-226e-41ea-9cd8-299aa9a00eac/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Given a desired joint trajectory $\theta_d(t)$, the simplest type of control is to choose the commanded velocity $\dot{\theta}(t)$ as follows.

$$
\dot{\theta}(t) = \dot{\theta}_d(t)
$$

This is called feedforward or open-loop control because it does not require feedback (sensor data). However, in practice, position errors accumulate over time under the feedforward control law. An alternative strategy is to continuously measure the actual position of each joint and implement a feedback controller.

In P control and first-order error dynamics, we define a feedback controller as $\dot{\theta}(t) = K_p(\theta_d(t) - \theta(t)) = K_p \theta_e(t)$, generating a corrective control input proportional to the position error $\theta_e(t)$. The control gain $K_p$ acts like a virtual spring that pulls the actual joint position toward the desired joint position. For setpoint control ($\dot{\theta}_d(t) = 0$), the error dynamics is $\dot{\theta}_e(t) = \dot{\theta}_d(t) - \dot{\theta}(t) = 0 - K_p \theta_e(t) \quad \rightarrow \quad \dot{\theta}_e(t) + K_p \theta_e(t) = 0$, which is first-order dynamics. As an alternative to using a large $K_p$, we can use a proportional-integral (PI) controller, which adds a term proportional to the time integral of the error.

$$
\dot{\theta}(t) = K_p \theta_e(t) + K_i \int^t_0 \theta_e(\tau) d\tau
$$

#### Multi-joint Robot

Positions $\mathbf{\theta}_d(t)$ and $\mathbf{\theta}(t)$ are $n$-dimensional vectors, and gains $K_p$ and $K_i$ are diagonal $n \times n$ matrices of the form $k_p \mathbf{I}$ and $k_i \mathbf{I}$. When controlling the end effector's twist $\mathbf{V}_b(t)$ (expressed in the end effector frame ${b}$), the control law is as follows.

$$
\mathbf{V}_b(t) = [\text{Ad}_{\mathbf{X}^{-1} \mathbf{X}_d}] \mathbf{V}_d(t) + \mathbf{K}_p \mathbf{X}_e(t) + \mathbf{K}_i \int^t_0 \mathbf{X}_e(\tau) d\tau
$$

---

### Motion Control with Torque or Force Inputs

<img src="https://velog.velcdn.com/images/devjo/post/e2ccbb08-32fe-48b2-88b1-e2cedcba8e41/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Consider a single motor attached to a single link.

$$
\tau = M \ddot{\theta} + h(\theta, \dot{\theta})
$$

Here, $\tau$ is the motor torque, $M$ is the inertia, and $h(\theta, \dot{\theta})$ includes all terms that depend only on the state, including the gravity torque $mgr \cos \theta$ and viscous friction $\tau_{\text{fric}} = b\dot{\theta}$. A common feedback controller is proportional-integral-derivative (PID) control.

$$
\tau = K_p \theta_e + K_i \int \theta_e(t)dt + K_d \dot{\theta}_e
$$

Here, $K_p$ acts as a virtual spring that attempts to reduce the position error $\theta_e$. And $K_d$ acts as a virtual damper that provides damping torque proportional to the velocity error $\dot{\theta}_e$. Finally, $K_i$ provides torque proportional to the integral error.

Assume that the robot moves on a horizontal plane ($g=0$) and aims for setpoint control ($\dot{\theta}_d = \ddot{\theta}_d = 0$). Substituting the PD control law into the dynamics and rearranging, the second-order error dynamics is as follows.

$$
M \ddot{\theta}_e + (b + K_d) \dot{\theta}_e + K_p \theta_e = 0
$$

The damping ratio is $\zeta = \frac{b + K_d}{2 \sqrt{K_p M}}$ and the natural frequency is $\omega_n = \sqrt{K_p/M}$.

Third-order error dynamics assumes that the robot moves on a vertical plane ($g>0$). With PD control alone, a nonzero steady-state error occurs during setpoint control due to the gravity torque $mgr \cos \theta$. To eliminate the steady-state error, we use a PID controller with $K_i > 0$. Differentiating the dynamics yields third-order error dynamics.

$$
M\theta_e^{(3)} + (b + K_d) \ddot{\theta}_e + K_p \dot{\theta}_e + K_i \theta_e = 0
$$

#### Feedforward Control

Another strategy for trajectory tracking is to use the robot dynamics model to generate torque proactively, rather than waiting for errors.

$$
\tau(t) = \tilde{M}(\theta_d(t)) \ddot{\theta}_d(t) + \tilde{h}(\theta_d(t), \dot{\theta}_d(t))
$$

If the model is accurate and there is no initial error, the robot follows the desired trajectory exactly. However, since model errors always exist, feedforward control is always used together with feedback. The goal is to combine PID control with the robot dynamics model ${\tilde{M}, \tilde{h}}$ to achieve linear error dynamics as follows.

$$
\ddot{\theta}_e + K_d \dot{\theta}_e + K_p \theta_e + K_i \int \theta_e(t)dt = 0
$$

Here, the $\tilde{h}(\theta, \dot{\theta})$ term cancels out dynamics that depend nonlinearly on the state. The inertia model $\tilde{M}(\theta)$ converts the desired joint acceleration to joint torque, realizing simple linear error dynamics.

---

### Force Control

Force control is needed when the task is to apply force and torque to the environment rather than generating motion at the end effector. Pure force control is only possible when the environment provides resistive forces in all directions. In ideal force control, the force applied to the end effector is unaffected by disturbance motion applied to the end effector. The dynamic relationship between joint torque $\mathbf{\tau}$ and the wrench $\mathbf{F}_{\text{tip}}$ applied to the robot by the environment is as follows.

$$
\mathbf{\tau} = \tilde{\mathbf{g}}(\mathbf{\theta}) + \mathbf{J}^T(\mathbf{\theta})\mathbf{F}_{\text{tip}}
$$

A PI force controller that includes a feedforward term and gravity compensation is as follows.

$$
\mathbf{\tau} = \tilde{\mathbf{g}}(\mathbf{\theta}) + \mathbf{J}^T(\mathbf{\theta})\left(\mathbf{F}_d + \mathbf{K}_{fp}\mathbf{F}_e + \mathbf{K}_{fi} \int \mathbf{F}_e(t)dt\right)
$$

This law results in error dynamics $\mathbf{K}_{fp}\mathbf{\dot{F}}_e + \mathbf{K}_{fi}\mathbf{F}_e = \mathbf{0}$, so the error $\mathbf{F}_e$ converges to zero.

#### Hybrid Motion–Force Control

If the task space is $n$-dimensional, we have the freedom to specify $n$ out of $2n$ forces and motions. The remaining $n$ are determined by the environment. A particularly interesting case is when the environment is infinitely stiff (rigid constraints) in $k$ directions and unconstrained in $n-k$ directions. In this case, contact with the environment selects $k$ directions where the robot can freely apply force and $n-k$ directions of free motion.

Assuming the environment is rigid, suppose that $k$ natural constraints on velocity are expressed as the following Pfaffian constraint in task space. $\mathbf{V}$ is the twist.

$$
\mathbf{A}(\mathbf{\theta})\mathbf{V} = \mathbf{0}
$$

A hybrid motion-force controller is the sum of a task-space motion controller and a task-space force controller, as follows.

$$
\begin{aligned}
&\underbrace{\mathbf{P}(\mathbf{\theta})\left(\tilde{\mathbf{\Lambda}}(\tilde{\mathbf{\theta}})(\cdots) + \tilde{\mathbf{\eta}}(\mathbf{\theta}, \mathbf{V}_b)\right)}_{\text{motion control}} \\
&\underbrace{(\mathbf{I} - \mathbf{P}(\mathbf{\theta}))\left(\mathbf{F}_d + \mathbf{K}_{fp}\mathbf{F}_e + \mathbf{K}_{fi} \int \mathbf{F}_e(t)dt\right)}_{\text{force control}}
\end{aligned}
$$

#### Impedance Control

Impedance characterizes the change in endpoint motion as a function of disturbance force. Ideal motion control corresponds to a high impedance situation, and ideal force control corresponds to a low impedance situation.

The dynamics of a 1-DOF robot can be written as follows.

$$
m\ddot{x} + b\dot{x} + kx = f
$$

Here, $x$ is position, $m$ is mass, $b$ is damping, $k$ is stiffness, and $f$ is the force applied by the user. Impedance is the transfer function from position perturbation to force, $Z(s) = F(s)/X(s)$. Admittance is the inverse of impedance.

The robot uses encoders and tachometers to estimate $\ddot{\mathbf{x}}, \dot{\mathbf{x}}, \mathbf{x}$, and precisely controls joint torque to render the desired interaction force $-\mathbf{f}_{\text{ext}}$.

$$
\mathbf{\tau} = \mathbf{J}^T(\mathbf{\theta})\left( \underbrace{\tilde{\mathbf{\Lambda}}(\tilde{\mathbf{\theta}})\ddot{\mathbf{x}} + \tilde{\mathbf{\eta}}(\mathbf{\theta}, \dot{\mathbf{x}})}_{\text{arm dynamics compensation}} - \underbrace{(\mathbf{M}\ddot{\mathbf{x}} + \mathbf{B}\dot{\mathbf{x}} + \mathbf{K}\mathbf{x})}_{\mathbf{f}_{\text{ext}}} \right)
$$

The force $\mathbf{f}_{\text{ext}}$ applied by the user is sensed by a wrist load cell, and the robot responds with end effector acceleration $\ddot{\mathbf{x}}_d$.

$$
\ddot{\mathbf{x}}_d = \mathbf{M}^{-1}(\mathbf{f}_{\text{ext}} - \mathbf{B}\dot{\mathbf{x}} - \mathbf{K}\mathbf{x})
$$

The desired joint acceleration $\ddot{\mathbf{\theta}}_d$ is computed as $\ddot{\mathbf{\theta}}_d = \mathbf{J}^{\dagger}(\mathbf{\theta})(\ddot{\mathbf{x}}_d - \dot{\mathbf{J}}(\mathbf{\theta})\dot{\mathbf{\theta}})$, and inverse dynamics is used to compute the commanded joint force/torque $\mathbf{\tau}$.

---

### Linear Control

#### Feedback and closed loop control

We want the manipulator's joints to follow a predetermined position trajectory ($\mathbf{\theta}_d$), but since actuators are commanded in units of torque ($\mathbf{\tau}$), we must use some kind of control system to compute appropriate actuator commands to realize the desired motion.

$$
\mathbf{\tau} = \mathbf{M}(\mathbf{\theta}_d)\mathbf{\ddot{\theta}}_d + \mathbf{V}(\mathbf{\theta}_d, \mathbf{\dot{\theta}}_d) + \mathbf{G}(\mathbf{\theta}_d)
$$

In open-loop control, we use the robot's dynamic equations to compute the torque needed to realize the desired trajectory. However, this approach is impractical in real applications due to the incompleteness of the dynamic model and the presence of disturbances, because it does not use any feedback from joint sensors. Therefore, in closed-loop control, we use feedback from joint sensors, namely servo error, in the computation.

$$
\begin{aligned}
&\mathbf{e} = \mathbf{\theta}_d - \mathbf{\theta}, \\
&\mathbf{\dot{e}} = \mathbf{\dot{\theta}}_d - \mathbf{\dot{\theta}}
\end{aligned}
$$

#### Second Order systems

Consider a simple mechanical system, a spring-mass system with a damper. A free-body diagram of the forces acting on the block yields the equation of motion.

$$
m\ddot{x} + b\dot{x} + kx = 0
$$

The location of the two roots $s_1$ and $s_2$ determines the motion characteristics of the system. If we have real and distinct roots ($x(t) = c_1e^{s_1t} + c_2e^{s_2t}$), friction is dominant and the behavior is slow and nonoscillatory. With complex roots ($x(t) = re^{\lambda t} \sin(\mu t + \phi)$), stiffness is dominant and the behavior is oscillatory.

#### Control Law Partitioning

We can structure the controller differently by partitioning it into a model-based portion and a servo portion. We use system parameters ($m, b, k$) to compute the torque command $\tau$ so that the system appears to be a unit mass.

$$
f = \alpha f' + \beta
$$

To make it appear as a unit mass ($m=1$)

$$
\begin{aligned}
&\alpha = m, \\
&\beta = b\dot{x} + kx
\end{aligned}
$$

Setting this and $\ddot{x} = f'$, the equation simplifies. To control this system, we feedback $f' = -k_v \dot{x} - k_p x$ as servo control, so $\ddot{x} + k_v \dot{x} + k_p x = 0$ becomes the error dynamics of the closed loop.

#### Disturbing Rejection

One purpose of a control system is to provide disturbance rejection, that is, to maintain performance (minimize error) even when an external disturbance force $f_{\text{dist}}$ exists. First, with the disturbance force $f_{\text{dist}}$ added, the error equation is as follows.

$$
\ddot{e} + k_v \dot{e} + k_p e = f_{\text{dist}}
$$

Assuming $f_{\text{dist}}$ is constant and performing a steady-state analysis, the steady-state error is as follows.

$$
e = \frac{f_{\text{dist}}}{k_p}
$$

Therefore, the higher the position gain $k_p$, the smaller the steady-state error. To eliminate the steady-state error, we can add an integral term to the control law.

$$
f' = \ddot{x}_d + k_v \dot{e} + k_p e + k_i \int e dt
$$

This control law is called a PID control law. Including the integral term makes the error equation a third-order system. In steady state, $\dot{e} = 0$, so $e=0$.

---

### Nonlinear and Time varying systems

When nonlinearity is not severe, local linearization can be used, but the manipulator control problem is not suitable for this approach because it constantly moves through wide regions of the workspace, making it impossible to find a linearization valid for all regions. Instead of directly dealing with nonlinear equations, we can design the control law to use nonlinear terms that exactly cancel the nonlinearity of the system to be controlled.

For example, consider a system containing a nonlinear spring with spring relation $f = qx^3$.

$$
m\ddot{x} + b\dot{x} + qx^3 = f
$$

Here, the model-based portion is $\alpha = m, \beta = b\dot{x} + qx^3$ and the servo portion is $f' = \ddot{x}_d + k_v \dot{e} + k_p e$.

#### Multi input, Multi output

The manipulator control problem is a multi-input, multi-output (MIMO) problem.

$$
\mathbf{F} = \mathbf{\alpha}\mathbf{F}' + \mathbf{\beta}
$$

Here, $F, F', \beta$ are $n \times 1$ vectors and $\alpha$ is an $n \times n$ matrix. If $\alpha$ and $\beta$ are chosen correctly, from the $F'$ input, the system appears as $n$ independent unit masses. For this reason, a model-based control law of the form $\alpha F' + \beta$ is called a linearizing and decoupling control law.

---

### References

[Original Source #1](https://www.changjiangcai.com/files/text-books/Introduction-to-Robotics-3rd-edition.pdf?utm_source=chatgpt.com)

[Original Source #2](https://hades.mech.northwestern.edu/images/7/7f/MR.pdf)

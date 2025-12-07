---
title: 'Computed Torque Control'
date: '2024-12-11'
tags: ['Robotics', 'Manipulation', 'lecture']
---

### Path Generation

Assume that a predetermined path $\mathbf{q}_d(t)$ that the robot arm should follow is given. We design a control scheme to make the manipulator follow this desired path or trajectory. Trajectory Planning is a separate design problem that includes considerations such as collision avoidance and actuator saturation.

#### Converting Cartesian Trajectories to Joint Space

In robot applications, desired tasks are usually specified in workspace or Cartesian space. However, trajectory tracking control is more easily performed in Joint Space, where arm dynamics are more easily formulated.

Therefore, it is important to find the joint space trajectory $\mathbf{q}_d(t)$ when a Cartesian trajectory is given. This is performed using Inverse Kinematics. This transformation may not be unique.

#### Polynomial Path Interpolation

Trajectories are generally stored as a sequence of waypoints $\mathbf{q}(t_k)$ that can be stored in computer memory. Since most robot control schemes require a continuous desired trajectory $\mathbf{q}_d(t)$, the points must be converted into a continuous trajectory.

To make the desired position $\mathbf{q}_d(t)$ and velocity $\dot{\mathbf{q}}_d(t)$ match the waypoints in the time interval $[t_k, t_{k+1}]$, a cubic interpolation polynomial with 4 degrees of freedom must be used.

$$
\begin{aligned}
&\mathbf{q}_d(t_k) = \mathbf{q}(t_k), \dot{\mathbf{q}}_d(t_k) = \dot{\mathbf{q}}(t_k), \\
&\mathbf{q}_d(t_{k+1}) = \mathbf{q}(t_{k+1}), \dot{\mathbf{q}}_d(t_{k+1}) = \dot{\mathbf{q}}(t_{k+1})
\end{aligned}
$$

This method makes acceleration linear in each sample period.

#### Linear Function with Parabolic Blends, LFPB

Real robots have an upper limit on the torque that actuators can supply. In linear systems, this means constant acceleration. Therefore, it is often desirable to insist on constant acceleration within each sample period.

---

### Computed-Torque Control

Computed-torque control provides a framework that leads to very effective robot controllers and establishes a background that integrates classical independent joint control with modern design techniques.

In the inner feedforward loop, the robot arm dynamics equation is

$$
\mathbf{M}(\mathbf{q}) \ddot{\mathbf{q}} + \mathbf{N}(\mathbf{q}, \dot{\mathbf{q}}) + \mathbf{\tau}_d = \mathbf{\tau}
$$

To follow the desired trajectory $\mathbf{q}_d(t)$, we define the tracking error as $\mathbf{e}(t) = \mathbf{q}_d(t) - \mathbf{q}(t)$, differentiate it twice to compute $\ddot{\mathbf{e}}$, and substitute the expression for $\ddot{\mathbf{q}}$ to obtain the following trajectory error dynamics.

$$
\ddot{\mathbf{e}} = \mathbf{u} - M^{-1}\mathbf{\tau}_d
$$

#### PD Outer-Loop Design

It is common to choose the auxiliary control signal $\mathbf{u}(t)$ as PD (proportional-derivative) feedback.

$$
\mathbf{u}(t) = -\mathbf{K}_v \dot{\mathbf{e}} - \mathbf{K}_p \mathbf{e}
$$

The final robot input is as follows.

$$
\mathbf{\tau} = \mathbf{M}(\mathbf{q}) (\ddot{\mathbf{q}}_d + \mathbf{K}_v \dot{\mathbf{e}} + \mathbf{K}_p \mathbf{e}) + \mathbf{N}(\mathbf{q}, \dot{\mathbf{q}})
$$

---

### Digital Robot Control

Complex robot control schemes are generally implemented as digital control laws in digital signal processors (DSPs) because they are computationally intensive. Digital robot control is implemented using samplers and zero-order hold (ZOH).

$$
\mathbf{\tau}_k = \mathbf{M}(\mathbf{q}_k) [\ddot{\mathbf{q}}_k(d) + \mathbf{K}_v \dot{\mathbf{e}}_k + \mathbf{K}_p \mathbf{e}_k] + \mathbf{N}(\mathbf{q}_k, \dot{\mathbf{q}}_k)
$$

When a PD digital control law is applied to a robot arm, if the error trajectory is bounded ($\Vert \mathbf{e}(t)\Vert \le L$) for all $T$ less than the maximum sampling period $T_M$, the error maintains a bound close to $L$ ($\Vert \mathbf{e}(t)\Vert \le L + r$).

#### Joint Velocity Estimates

In practice, joint positions are measured with encoders and joint velocities are estimated. A simple Euler approximation $\dot{\mathbf{q}}_k = \frac{\mathbf{q}_k - \mathbf{q}_{k-1}}{T}$ is likely to fail because it amplifies sensor noise.

To reject noise, we compute the velocity estimate $\mathbf{v}_k$ using a filtered derivative.

$$
\mathbf{v}_k = \nu \mathbf{v}_{k-1} + \frac{\mathbf{q}_k - \mathbf{q}_{k-1}}{T}
$$

Here, $\nu$ is a design parameter. Small values of $\nu$ mean fast pole and provide high-pass filtering that helps reject noise.

---

### Neural Network Control

In recent years, there has been much effort to design feedback control systems using Neural Networks (NNs). In particular, there is high interest in universal model-free controllers that do not require a mathematical model of the plant to be controlled.

Two key features that make NNs useful for feedback control are the universal approximation property and learning capability. Learning capability comes from the fact that weights are tunable, allowing controller performance to be improved.

The universal approximation property is a key feature that makes nonlinear network structures more suitable for robot control than linear adaptive robot controllers. Adaptive control generally depends on the determination of a regression matrix, which requires Linearity In the Parameters (LIP). However, NNs can approximate unknown nonlinear functions without such constraints. Multilayer neural networks have a feedforward structure and are said to be static because they have no internal dynamics.

$$
\mathbf{y} = \mathbf{W}^T \mathbf{\sigma}(\mathbf{V}^T \mathbf{x})
$$

Because it is nonlinear (NLIP), it has been difficult to derive tuning algorithms that guarantee stability and bounded weights in closed-loop feedback systems. An appropriate and rigorous approach is to use Taylor series. We define the function estimation error $\tilde{\mathbf{f}}$ as follows.

$$
\tilde{\mathbf{f}} = \mathbf{f} - \hat{\mathbf{f}}
$$

By fixing the first layer weights $\mathbf{V}$ and tuning only the second layer weights $\mathbf{W}$, the NN has only one adjustable weight layer, which is linear in the parameters (LIP).

$$
\mathbf{y} = \mathbf{W}^T \boldsymbol{\phi}(\mathbf{x})
$$

Alternatively, RBF NN is a type of structured nonlinear network that uses Gaussian functions as activation functions.

$$
\sigma_j(\mathbf{x}) = e^{-\frac{1}{2}(\mathbf{x} - \bar{\mathbf{x}_j})^T \mathbf{P}_j^{-1} (\mathbf{x} - \bar{\mathbf{x}_j})}
$$

#### Robot Arm Dynamics and Error System

The dynamics of Lagrangian Systems such as robot arms have important physical, structural, and Passivity properties that are advantageous for control.

$$
\mathbf{M}(\mathbf{q}) \ddot{\mathbf{q}} + \mathbf{V}_m(\mathbf{q}, \dot{\mathbf{q}}) \dot{\mathbf{q}} + \mathbf{G}(\mathbf{q}) + \mathbf{F}(\dot{\mathbf{q}}) + \mathbf{\tau}_d = \mathbf{\tau}
$$

And the error is $\mathbf{e}(t) = \mathbf{q}_d(t) - \mathbf{q}(t)$. Filtering this yields $\mathbf{r}(t) = \dot{\mathbf{e}} + \mathbf{\Lambda} \mathbf{e}$. Rewriting the robot dynamics in terms of $\mathbf{r}(t)$ yields

$$
\mathbf{M} \dot{\mathbf{r}} = -\mathbf{V}_m\mathbf{r} - \tau + \mathbf{f} + \tau_d
$$

Using the computed torque control expression $\mathbf{\tau} = \hat{\mathbf{f}} + \mathbf{K}_v \mathbf{r} - \mathbf{v}$, the above equation can be defined as the closed loop error $\mathbf{M} \dot{\mathbf{r}} = - (\mathbf{K}_v \mathbf{r} + \mathbf{V}_m \mathbf{r}) + \tilde{\mathbf{f}} + \tau_d + \mathbf{v}$.

---

### References

[Original source #1](https://lewisgroup.uta.edu/FL%20books/Robot_Manipulator_Control_Theory_and_Practice_-_Frank_L.Lewis-%20small.pdf)

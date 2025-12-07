---
title: 'Robotic Dynamics'
date: '2024-12-04'
tags: ['Robotics', 'Manipulation', 'lecture']
---

### Lagrange-Euler Dynamics

A mathematical model representing the dynamic behavior of a system is essential for control design. In this section, we derive the equations of motion dynamics for robot manipulators. The approach is to derive the kinetic energy and potential energy of the manipulator, then use Lagrange's equations of motion.

Centripetal force equals $F_{cent} = \frac{mv^2}{r}=m\omega^2r$ when a mass $m$ undergoes orbital motion at radius $r$ with angular velocity $\mathbf{\Omega}$. And rotational kinetic energy equals $K_{rot}=\frac{1}{2} I \omega^2$.

#### Lagrange's Equations of Motion

$$
\frac{d}{dt} \left( \frac{\partial L}{\partial \dot{\mathbf{q}}} \right) - \frac{\partial L}{\partial \mathbf{q}} = \tau
$$

Here, $\mathbf{q}$ is an $n$-vector of generalized coordinates $q_i$, which in robots becomes the joint variable vector (joint angles $\theta_i$ and joint offsets $d_i$). The right-hand side consists of torques $\tau_i$ corresponding to joint angles and forces $f_i$ corresponding to joint offsets.

The Lagrangian $L$ is the difference between kinetic energy $K$ and potential energy $P$.

$$
L = K - P
$$

---

### Structure and Properties of the Robot Equation

Since realistic robot arm models always include friction and disturbances, robot manipulator dynamics are generalized as follows.

$$
\mathbf{M}(\mathbf{q}) \ddot{\mathbf{q}} + \mathbf{V}(\mathbf{q}, \dot{\mathbf{q}}) + \mathbf{G}(\mathbf{q}) + \mathbf{F}(\dot{\mathbf{q}}) + \mathbf{\tau}_d = \mathbf{\tau}
$$

Here, the dynamics are written with $\mathbf{N}(\mathbf{q}, \dot{\mathbf{q}})$ representing the nonlinear terms as follows.

$$
\mathbf{M}(\mathbf{q}) \ddot{\mathbf{q}} + \mathbf{N}(\mathbf{q}, \dot{\mathbf{q}}) + \mathbf{\tau}_d = \mathbf{\tau}
$$

The inertia matrix $\mathbf{M}(\mathbf{q})$ is always a symmetric matrix ($m_{jk} = m_{kj}$) and is positive definite because the kinetic energy $K = \frac{1}{2} \dot{\mathbf{q}}^T \mathbf{M}(\mathbf{q}) \dot{\mathbf{q}}$ is positive. And it is bounded above and below. That is, there exist scalars $\mu_1, \mu_2$ such that $\mu_1 \mathbf{I} \le \mathbf{M}(\mathbf{q}) \le \mu_2 \mathbf{I}$.

#### Quadratic in $\dot{\mathbf{q}}$

The Coriolis/centripetal force vector $\mathbf{V}(\mathbf{q}, \dot{\mathbf{q}})$ is quadratic in joint velocity $\dot{\mathbf{q}}$.

$$
\Vert \mathbf{V}(\mathbf{q}, \dot{\mathbf{q}}) \Vert \le v_b(\mathbf{q}) \Vert\dot{\mathbf{q}}\Vert^2
$$

For revolute arms, $v_b$ is a constant. For arms with prismatic joints, $v_b(\mathbf{q})$ may be a function of $\mathbf{q}$.

#### Gravity, Friction, and Disturbance Terms

The gravity vector depends only on $\mathbf{q}$ and not on $\dot{\mathbf{q}}$, where $\mathbf{G}(\mathbf{q})=\frac{\partial P}{\partial q}$.

Friction is generally modeled as viscous friction $\mathbf{F}_v \dot{\mathbf{q}}$ and dynamic friction $\mathbf{F}_d \text{sgn}(\dot{\mathbf{q}})$ terms.

$$
\mathbf{F}(\dot{\mathbf{q}}) = \mathbf{F}_v \dot{\mathbf{q}} + \mathbf{F}_d(\dot{\mathbf{q}})
$$

And the disturbance $\mathbf{\tau}_d$ is generally assumed to be bounded as follows.

$$
\Vert\mathbf{\tau}_d\Vert \le d
$$

---

### References

[Original source #1](https://lewisgroup.uta.edu/FL%20books/Robot_Manipulator_Control_Theory_and_Practice_-_Frank_L.Lewis-%20small.pdf)

---
title: 'Robot Manipulator Control'
date: '2024-12-04'
tags: ['Robotics', 'Manipulation', 'lecture']
---

### Introduction

When studying advanced techniques for robot control, planning, sensors, and human interfaces, it is important to be aware of commercially available systems. This allows development on a foundation where new techniques can be implemented in existing systems.

In past factory automation, fixed layouts based on conveyors where each robot performed a specific task were common. These assembly lines are very expensive to install and difficult to modify or reprogram, making them unsuitable for the era of High-Mix Low-Volume (HMLV) production. Therefore, flexible robot workcells use robots for part handling, assembly, and other process tasks to maximize the versatility of robots.

---

### Commercial Robot Configurations and Types

Most commercial industrial robots are supplied by established companies using reliable off-the-shelf component technologies. All commercial industrial robots consist of two physically separate basic elements: a manipulator arm and a controller. The basic architecture is mostly the same, generally consisting of a serial-link kinematic mechanism with 6 or fewer axes (degrees of freedom) driven by electric motors controlled by digital servos.

The following configurations are common.

Articulated Arms consist mostly of revolute joints. The second and third axes lie in the same plane and generate motion in a vertical plane. The first axis is vertical, rotating the arm to sweep through a large work volume. When 5 or more degrees of freedom are required, they have superior workspace efficiency compared to other configurations.

SCARA Type 1 has the first and second axes as revolute in a horizontal plane. The third axis adds a vertical or z-axis to provide work volume, and the fourth revolute axis controls orientation in the horizontal plane. The arm structure supports weight, but the first and second axes do not perform lifting work. It has very high precision.

Cartesian Coordinate Robots use orthogonal prismatic axes (x, y, z) to move the end-effector through a rectangular workspace. Gantry robots are the most common and are suitable for material handling applications that must handle large areas or heavy loads.

---

### Commercial Robot Controllers

#### Motion Trajectory Generation and Following

A unique aspect of each robot system is real-time servo-level motion control. These details are generally not disclosed to users for reasons of safety and proprietary information protection. The controller converts digital data from a high-level coordinator into coordinated arm motion through precise calculations and high-speed distribution and communication of individual axis motion commands.

Most commercial robot controllers operate with a sample period of $16$ msec and, without exception, use classical independent joint PID (proportional-integral-derivative) control or simple modifications of PID. As a result, commercially available controllers are suitable for point-to-point motion, but following continuous position/velocity profiles or applying specified forces is often difficult or impossible without considerable programming effort.

#### Motion/Process Integration and Sequencing

This is through discrete digital input/output (I/O). For example, an external machine controller can send a 1-bit signal to the robot indicating that it is ready for loading. The robot controller must have the ability to read this digital signal and perform logical operations. That is, some robot controllers have PLC (Programmable Logic Controller) functionality built in.

---

### Control Theory

Control of robot manipulators is mature but still a fruitful field for research, development, and manufacturing. Since industrial robots are essentially positioning and handling devices, robots that can control motion and the forces and torques of interaction between the robot and the environment are useful. Control generally requires a mathematical model and some kind of intelligence that can act on the model.

#### Linear State-Variable Systems

We limit ourselves to systems described by ordinary differential equations that lead to finite-dimensional state spaces.

A continuous-time system is said to be linear if it follows the superposition principle. That is, the output for input $u(t) = \alpha_1 u_1(t) + \alpha_2 u_2(t)$ is given by $y(t) = \alpha_1 y_1(t) + \alpha_2 y_2(t)$. And the system is described by the following linear, scalar, constant-coefficient ordinary differential equation.

$$
\begin{aligned}
&\frac{d^n y}{dt^n} + a_{n-1} \frac{d^{n-1} y(t)}{dt^{n-1}} + \cdots + a_0 y(t) \\
&= b_n \frac{d^n u(t)}{dt^n} + b_{n-1} \frac{d^{n-1} u(t)}{dt^{n-1}} + \cdots + b_0 u(t)
\end{aligned}
$$

Here, $y(t)$ is the scalar output and $u(t)$ is the scalar input.

#### State-Space Realization

The state of a system is defined as a set of variables that, when specified at time $t_0$, together with the input $u(t), t \ge t_0$, is sufficient to completely determine the behavior of the system at all times. The state vector is not unique. If $\mathbf{x}$ is a state vector, then $\bar{\mathbf{x}}(t) = T \mathbf{x}(t)$ is also a state vector.

The general form of state-space representation is as follows.

$$
\begin{aligned}
&\dot{\mathbf{x}}(t) = A \mathbf{x}(t) + B u(t) \\
&y(t) = C \mathbf{x}(t) + D u(t)
\end{aligned}
$$

This representation is called the controllable canonical form.

---

### Nonlinear State-Variable Systems

In many cases, the underlying physical behavior cannot be described by linear state-variable equations. This is the case for robot manipulators where interactions between different links are described by nonlinear differential equations.

#### Continuous-Time Systems

A nonlinear, scalar, continuous-time, time-invariant system is described by the following nonlinear, scalar, constant-coefficient differential equation.

$$
\frac{d^n y(t)}{dt^n} = h [y(t), y^{(1)}(t), \cdots, y^{(n-1)}(t), u(t), u^{(1)}(t), \cdots, u^{(n)}(t)]
$$

A more compact formulation is as follows.

$$
\begin{aligned}
&\dot{\mathbf{x}}(t) = \mathbf{f} [\mathbf{x}(t), \mathbf{U}(t)] \\
&y(t) = \mathbf{c} \mathbf{x}(t)
\end{aligned}
$$

#### Nonlinear Systems

The Damped Pendulum Equation is defined as

$$
\ddot{y} + k \dot{y} + \sin(y) = 0
$$

and choosing states $x_1 = y, x_2 = \dot{y}$ yields the following state-space representation.

$$
\begin{bmatrix} \dot{x}_1 \\ \dot{x}_2\end{bmatrix} = \begin{bmatrix} x_2 \\ \sin(x_1) - x_2\end{bmatrix}
$$

#### Equilibrium Points

We focus on systems where the input $\mathbf{u}(t)$ is specified as a function of the state $\mathbf{x}(t)$.

$$
\dot{\mathbf{x}}(t) = \mathbf{f} [t, \mathbf{x}(t)]
$$

In a Nonautonomous System, it is defined as $\dot{x}=tx^2$ and the equilibrium point is defined as

$$
\begin{bmatrix} \dot{x}_1 \\ \dot{x}_2\end{bmatrix} = \begin{bmatrix} x_2 \\ \cos(x_1) - 1\end{bmatrix}
$$

---

### Stability Theory

An unforced system is as follows.

$$
\dot{\mathbf{x}}(t) = \mathbf{f} (\mathbf{x}, t)
$$

If $\mathbf{x}_e$ is stable in the sense of Lyapunov at $t_0$, then starting sufficiently close, the state remains always close to $\mathbf{x}_e$ at later times.

#### Lyapunov Stability Theorems

These deal with the behavior of unforced nonlinear systems. We assume that the origin $\mathbf{x}=\mathbf{0}$ is an equilibrium point of this system. The main reason Lyapunov theory is needed is that it can determine the stability of a particular equilibrium point without solving the differential equation and provides qualitative results.

A continuous function $\alpha: \mathbb{R} \to \mathbb{R}$ is said to belong to class K if it satisfies: $\alpha(0)=0$, and has the property of being monotonically increasing with $\alpha(x)>0$ for positive values.

#### Input/Output Stability

Lyapunov stability does not guarantee that bounded inputs result in bounded outputs.

---

### References

[Original source #1](https://lewisgroup.uta.edu/FL%20books/Robot_Manipulator_Control_Theory_and_Practice_-_Frank_L.Lewis-%20small.pdf)

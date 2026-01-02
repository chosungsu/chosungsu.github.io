---
title: 'Configuration Space'
date: '2024-02-02'
tags: ['Robotics', 'Kinematics', 'lecture']
---

### Degrees of Freedom and Configuration Space of a Robot

A robot is mechanically constructed from a series of objects called links connected to each other using various types of joints. Actuators, such as electric motors, deliver forces or torques that cause the robot's links to move. Typically, an end-effector, such as a gripper or hand for grasping and manipulating objects, is attached to a specific link.

The most fundamental question one might ask about a robot is "Where is the robot?" The answer is given by the robot's configuration, a specification of the positions of all points of the robot. Since the robot's links are rigid bodies with known shape, only a small number of numbers are needed to represent its configuration. For example, a door's configuration can be represented by a single number, the angle $\theta$ about its hinge. A point's configuration in a plane can be described by two coordinates $(x, y)$. The configuration of a coin lying flat on a table with heads facing up can be described by three coordinates two coordinates $(x, y)$ specifying the position of a particular point on the coin, and one coordinate $(\theta)$ specifying the coin's orientation.

All of the above coordinates take values over continuous ranges of real numbers. A robot's degrees of freedom ($\text{dof}$) is the minimum number of real-valued coordinates needed to represent its configuration. A coin lying flat on a table with heads facing up has 3 degrees of freedom. Even if the coin could face heads or tails up, its configuration space would still have only 3 degrees of freedom. A fourth variable indicating which face of the coin is up would take values in a discrete set $\{\text{heads, tails}\}$, unlike the other three coordinates, which take values in continuous ranges of real numbers.

A robot's configuration is a complete specification of the positions of all points of the robot. The minimum number $n$ of real-valued coordinates needed to represent a configuration is the robot's degrees of freedom ($\text{dof}$). The $n$-dimensional space containing all possible configurations of the robot is called the configuration space ($\text{C-space}$). A robot's configuration is represented as a point in its $\text{C-space}$.

Since robots are constructed from rigid links, we first review the degrees of freedom of a single rigid body, then the degrees of freedom of general multi-link robots. Next, we study the shape (or topology) and geometry of $\text{C-space}$, and their mathematical representations.

---

### Degrees of Freedom of a Rigid Body

Returning to the example of a coin on a table, we select three points $A, B,$ and $C$ on the coin. With a coordinate frame $\hat{x}–\hat{y}$ attached to the plane, the positions of these points in the plane are written as $(x_A, y_A), (x_B, y_B),$ and $(x_C, y_C)$. If these points could be placed independently anywhere in the plane, the coin would have 6 degrees of freedom, two for each of the three points. However, by the definition of a rigid body, the distance $d(A, B)$ between points $A$ and $B$ is always constant, regardless of where the coin is. Similarly, the distances $d(B, C)$ and $d(A, C)$ must be constant. Therefore, the following equality constraints on the coordinates $(x_A, y_A), (x_B, y_B),$ and $(x_C, y_C)$ must always be satisfied

$$
\begin{aligned} 
d(A, B) &= \sqrt{(x_A - x_B)^2 + (y_A - y_B)^2} = d_{AB}, \\ d(B, C) &= \sqrt{(x_B - x_C)^2 + (y_B - y_C)^2} = d_{BC}, \\ d(A, C) &= \sqrt{(x_A - x_C)^2 + (y_A - y_C)^2} = d_{AC}
\end{aligned}
$$

To determine the degrees of freedom of a coin on a table, we first choose the location of point $A$ in the plane. We have two degrees of freedom to specify $(x_A, y_A)$. Once $(x_A, y_A)$ is specified, the constraint $d(A, B) = d_{AB}$ restricts the choice of $(x_B, y_B)$ to points on a circle centered at $A$ with radius $d_{AB}$. A point on this circle can be specified by a single parameter, for example, the angle $\phi_{AB}$ that specifies the location of $B$ on the circle centered at $A$. Once the location of point $B$ is chosen, there are only two possible locations for $C$ at the intersection of the circle centered at $A$ with radius $d_{AC}$ and the circle centered at $B$ with radius $d_{BC}$. These two solutions correspond to heads or tails. In summary, by placing $A$ and $B$ and choosing heads or tails, the two constraints $d(A, C) = d_{AC}$ and $d(B, C) = d_{BC}$ remove the two apparent degrees of freedom provided by $(x_C, y_C)$, and the location of $C$ is fixed. The coin has exactly 3 degrees of freedom in the plane and can be specified by $(x_A, y_A, \phi_{AB})$.

---

### Degrees of Freedom of a Robot

A door consists of a single rigid body connected to a wall by a hinge joint. Without the hinge joint, the door would be free to move in 3D space and would have 6 degrees of freedom. By connecting the door to the wall via the hinge joint, five independent constraints are imposed on the door's motion, leaving only one independent coordinate ($\theta$).

In both cases, joints constrain the motion of rigid bodies, reducing the total degrees of freedom. This observation suggests a formula for determining a robot's degrees of freedom by counting the number of rigid bodies and joints.

#### Robot Joints

All joints connect exactly two links. A revolute joint ($\text{R}$) or hinge joint allows rotational motion about the joint axis. A prismatic joint ($\text{P}$) or sliding/linear joint allows translational motion along the joint axis. A helical joint ($\text{H}$) or screw joint allows simultaneous rotation and translation about the screw axis.

Revolute, prismatic, and helical joints all have 1 degree of freedom. Joints can also have multiple degrees of freedom. A cylindrical joint ($\text{C}$) has 2 degrees of freedom, allowing independent translation and rotation about a single fixed joint axis. A universal joint ($\text{U}$) is another 2-degree-of-freedom joint consisting of a pair of revolute joints arranged so that their joint axes are orthogonal. A spherical joint ($\text{S}$) or ball-and-socket joint has 3 degrees of freedom and functions very similarly to a human shoulder joint.

A joint can be thought of as providing freedoms to allow one rigid body to move relative to another. A joint can also be thought of as providing constraints on the possible motions of the two rigid bodies it connects. For example, a revolute joint can be thought of as allowing one free motion between two rigid bodies in space, or as providing five constraints on the motion of one rigid body relative to another. Generalizing, the degrees of freedom of a rigid body (3 for a planar rigid body, 6 for a spatial rigid body) minus the number of constraints provided by a joint must equal the number of freedoms provided by that joint.

#### Grubler's Formula

The degrees of freedom of a mechanism with links and joints can be calculated using Grubler's formula. Consider a mechanism consisting of $N$ links, where the ground is also considered a link. Let $J$ be the number of joints, $m$ be the degrees of freedom of a rigid body ($m=3$ for planar mechanisms, $m=6$ for spatial mechanisms), $f_i$ be the number of freedoms provided by joint $i$, and $c_i$ be the number of constraints provided by joint $i$, where $f_i + c_i = m$ for all $i$. Then Grubler's formula for the degrees of freedom of the robot is

$$
\begin{aligned} \text{dof} &= \underbrace{m(N - 1)}_{\text{rigid body freedoms}} - \underbrace{\sum_{i=1}^{J} c_i}_{\text{joint constraints}} \\ &= m(N - 1) - \sum_{i=1}^{J} (m - f_i) \\ &= m(N - 1 - J) + \sum_{i=1}^{J} f_i. \end{aligned}
$$

This formula holds only if all joint constraints are independent. If they are not independent, the formula provides a lower bound on the degrees of freedom. Open-chain mechanisms (or serial mechanisms) and closed-chain mechanisms can be distinguished as follows closed-chain mechanisms are all mechanisms with closed loops (e.g., a person standing on two feet), while open-chain mechanisms are all mechanisms with no closed loops (e.g., an arm where the hand can move freely in space).

---

### Configuration Space

#### Topology

<img src="https://velog.velcdn.com/images/devjo/post/1889943e-0343-4a01-867b-45ac58e11f29/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:50;" />

So far we have focused on the dimension or number of degrees of freedom. However, the shape of the space is also important. Consider a point moving on the surface of a sphere. The point's $\text{C-space}$ is 2-dimensional, and a configuration can be described by two coordinates latitude and longitude. As another example, a point moving in a plane also has a 2-dimensional $\text{C-space}$ with coordinates $(x, y)$. Both the plane and the surface of a sphere are 2-dimensional, but clearly they do not have the same shape. The plane extends infinitely, while the sphere is bounded.

Topologically distinct 1-dimensional spaces include the circle, the line, and a closed interval of a line. A circle is written mathematically as $S$ or $S^1$, a 1-dimensional sphere. A line is written as $E$ or $E^1$, representing 1-dimensional Euclidean space. Some $\text{C-space}$s can be expressed as the Cartesian product of two or more spaces of lower dimension. For example, the $\text{C-space}$ of a rigid body in the plane can be written as $R^2 \times S^1$, since a configuration can be expressed as the concatenation of coordinates $(x, y)$ representing $R^2$ and an angle $\theta$ representing $S^1$.

#### Representation

While it is natural to use a reference frame and a length scale and to use vectors to represent points in Euclidean space, representing points on curved spaces such as spheres is less straightforward. One solution for a sphere is to use latitude and longitude coordinates. Choosing $n$ coordinates or parameters to represent an $n$-dimensional space is called an explicit parametrization of the space.

Singularities in the representation become particularly problematic when representing velocity as the time rate of change of coordinates, since these representations can approach infinity near singularities even if a point on the sphere is moving at constant speed.

#### Configuration and Velocity Constraints

<img src="https://velog.velcdn.com/images/devjo/post/13ba9cdf-718c-4e62-ae7d-ae378fa267ef/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

For robots containing one or more closed loops, an implicit representation is generally easier to obtain than an explicit parametrization. For example, the fact that a planar four-bar linkage with 1 degree of freedom always forms a closed loop can be expressed as three equations called loop-closure equations

$$
\begin{aligned}
&L_1\cos \theta_1 + L_2\cos(\theta_1+\theta_2) + \cdots+ L_4 \cos(\theta_1 + \cdots + \theta_4) = 0, \\
&L_1\sin \theta_1 + L_2\sin(\theta_1+\theta_2) + \cdots+ L_4 \sin(\theta_1 + \cdots + \theta_4) = 0, \\
&\theta_1+\theta_2 + \theta_3 + \theta_4-2\pi=0
\end{aligned}
$$

For a general robot, the configuration space can be implicitly represented by a column vector $\theta = [\theta_1 \cdots \theta_n]^T \in R^n$ and loop-closure equations of the form

$$
g(\theta) = 0,
$$

which is a set of $k$ independent equations, where $k \le n$. These constraints are known as holonomic constraints, which reduce the dimension of the $\text{C-space}$. The $\text{C-space}$ can be considered as a surface of dimension $n-k$ embedded in $R^n$.

Assuming a closed-chain robot moves along a time trajectory $\theta(t)$ and differentiating both sides of $g(\theta(t)) = 0$ with respect to $t$, we obtain

$$
\frac{\partial g}{\partial \theta}(\theta) \dot{\theta} = 0
$$

where $\dot{\theta}$ is the joint velocity vector, and $\frac{\partial g}{\partial \theta}(\theta) \in R^{k \times n}$. Velocity constraints of this form are called Pfaffian constraints. If $A(\theta) = \frac{\partial g}{\partial \theta}(\theta)$, then $g(\theta)$ can be considered as an integral of $A(\theta)$. For this reason, holonomic constraints of the form $g(\theta) = 0$ are also called integrable constraints.

<img src="https://velog.velcdn.com/images/devjo/post/3676bf2b-e3ae-4894-a5cc-6debe9e553cd/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

We consider another type of Pfaffian constraint. As a concrete example, consider an upright coin of radius $r$ rolling on a plane. Given a configuration specified by the contact point $(x, y)$ on the plane, the steering angle $\phi$, and the rotation angle $\theta$, the $\text{C-space}$ is $R^2 \times T^2$, which is 4-dimensional. The coin must always roll in the direction indicated by $(\cos \phi, \sin \phi)$ at a forward speed of $r\dot{\theta}$

$$
\begin{bmatrix} \dot{x} \\ \dot{y} \end{bmatrix} = r \dot{\theta} \begin{bmatrix} \cos \phi \\ \sin \phi \end{bmatrix}
$$

Collecting the $\text{C-space}$ coordinates into a single vector $q = [q_1 q_2 q_3 q_4]^T = [x y \phi \theta]^T \in R^2 \times T^2$, the above no-slip rolling constraint can be expressed in the form

$$
\begin{bmatrix} 1 & 0 & 0 & -r \cos q_3 \\ 0 & 1 & 0 & -r \sin q_3 \end{bmatrix} \dot{q} = 0
$$

This is a Pfaffian constraint of the form $A(q) \dot{q} = 0$ and is non-integrable. This is called a nonholonomic constraint, which reduces the dimension of the feasible velocities of the system but does not reduce the dimension of the reachable $\text{C-space}$.

#### Task Space and Workspace

Task space is the space in which the robot's task is naturally expressed. For example, if the robot's task is to draw with a pen on paper, the task space would be $R^2$. Workspace is a specification of the configurations that the robot's end-effector can reach. The definition of workspace is independent of the task and is primarily determined by the robot's structure.

---

### References

[Original Source #1](https://hades.mech.northwestern.edu/images/7/7f/MR.pdf)

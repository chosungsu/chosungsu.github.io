---
title: 'Trajectory Generation'
date: '2024-02-12'
tags: ['Robotics', 'Kinematics', 'lecture']
---

### General Consideration In Path Description

In most cases, we will consider the motion of a manipulator as the motion of frame $\{T\}$ relative to the station frame $\{S\}$. By specifying the motion of the tool frame relative to the station frame, the motion description is decoupled from a specific robot, end effector, or workpiece. This ensures modularity, allowing the same path description to be used with different manipulators or with the same manipulator but different tool sizes.

<img src="https://velog.velcdn.com/images/devjo/post/90226429-7030-4a3a-8bbb-7f5789c642cc/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

As shown in the image above, the basic problem is to move the manipulator from an initial position to a desired final position. Generally, this motion includes both orientation changes and position changes of the tool relative to the station.

#### Cartesian-Space Schemes

The spatial shape of the path taken by the end effector is not a straight line through space, but rather a complex shape that depends on the kinematics of the specific manipulator being used. Moreover, Cartesian schemes are computationally more expensive to execute because inverse kinematics must be solved at the path update rate during execution.

Cartesian straight-line motion is often defined to easily specify spatial paths where the tool tip moves in a straight line through space.

<img src="https://velog.velcdn.com/images/devjo/post/c63fee47-75b3-4eb2-b7e8-d5a88be77a7e/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

However, when specifying orientation as a rotation matrix at each via point, its elements cannot be linearly interpolated. This is because doing so may not always result in a valid rotation matrix. Therefore, we combine the Angle-Axis representation with a 3x1 Cartesian position representation to obtain a 6x1 vector $\mathbf{x}$ of Cartesian position and orientation.

$$
\mathbf{x}_A = \begin{bmatrix} {}^S\mathbf{P}_{A_{ORG}} \\ \boldsymbol{\mathcal{S}K}_A \end{bmatrix}
$$

When moving from via point ${A}$ to ${B}$, the total rotation must be minimized. We must choose $\boldsymbol{\mathcal{S}K}_B$ that achieves this minimized rotation.

#### Geometric Problems with Cartesian Paths

Even if both the initial position and the final goal point are within the manipulator's workspace, not all points on the straight line connecting these two points may be within the workspace. There are positions in the manipulator's workspace where it is impossible to select finite joint velocities that yield the desired velocity in Cartesian space. As the manipulator follows a Cartesian straight-line path and approaches a singular configuration of the mechanism, one or more joint velocities may increase to infinity. The final problem can occur when the robot cannot reach the goal point with the same physical solution as the one at the starting point.

---

### Point-to-Point Trajectories

Moving from rest at one configuration to rest at another configuration is the simplest type of motion. The straight line from starting configuration $\theta_{\text{start}}$ to ending configuration $\theta_{\text{end}}$ can be defined in joint space or task space. Since joint limits typically take the form $\theta_{i, \min} \le \theta_i \le \theta_{i, \max}$ for each joint $i$, the allowed joint configurations form a convex set in joint space $\Theta_{\text{free}}$. Therefore, the straight line between two endpoints within $\Theta_{\text{free}}$ lies within $\Theta_{\text{free}}$.

$$
\mathbf{\theta}(s) = \mathbf{\theta}_{\text{start}} + s(\mathbf{\theta}_{\text{end}} - \mathbf{\theta}_{\text{start}})
$$

Another approach is screw motion.

$$
\mathbf{X}(s) = \mathbf{X}_{\text{start}} \exp(\log(\mathbf{X}_{\text{start}}^{-1} \mathbf{X}_{\text{end}})s)
$$

This screw motion provides straight-line motion in the sense that the screw axis is constant. However, since the origin of the end effector follows the screw motion, it generally does not follow a straight line in Cartesian space.

#### Joint-Space Schemes

Each path point is typically specified as the desired position and orientation of the tool frame $\{T\}$, which is converted to a desired set of joint angles by applying inverse kinematics. Then, for each of the $n$ joints, we find a smooth function that passes through the via points and ends at the goal point.

When considering the problem of moving the tool from initial position $\theta_0$ to goal position $\theta_f$ over a specific time $t_f$, the constraints on initial and final positions are as follows.

$$
\begin{aligned}
&\theta(0) = \theta_0, \\
&\theta(t_f) = \theta_f
\end{aligned}
$$

The initial and final velocities are zero. These four constraints can be satisfied by at least a cubic polynomial, and the form of the cubic polynomial is as follows.

$$
\theta(t) = a_0 + a_1 t + a_2 t^2 + a_3 t^3
$$

---

### References

[Original Source #1](https://www.changjiangcai.com/files/text-books/Introduction-to-Robotics-3rd-edition.pdf?utm_source=chatgpt.com)

[Original Source #2](https://hades.mech.northwestern.edu/images/7/7f/MR.pdf)

---
title: 'Forward Kinematics and Inverse Kinematics'
date: '2024-02-09'
tags: ['Robotics', 'Kinematics', 'lecture']
---

### Product of Exponentials Formula

To use the product of exponentials (PoE) formula, we need only specify a fixed space frame $\{s\}$ and an end-effector frame $\{b\}$ described by $M$ when the robot is in its zero position. When defining the kinematics of a robot with $n$ joints, we can proceed as follows.

#### Screw Axes in the Base Frame

The key concept of the PoE formula is to consider each joint as applying a screw motion to all outer links. First, we place the robot in its zero position by setting all joint values to zero.

<img src="https://velog.velcdn.com/images/devjo/post/dd573803-2270-4faa-af34-42cd5912c002/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

$\mathbf{T}(\theta)$ is the result of applying $n$ screw motions sequentially to $\mathbf{M}$.

$$
T(\theta) = e^{[\mathcal{S}_1]\theta_1} \cdots e^{[\mathcal{S}_{n-1}]\theta_{n-1}} e^{[\mathcal{S}_n]\theta_n} M
$$

This is the spatial form of the product of exponentials formula describing the forward kinematics of an $n$-degree-of-freedom open chain.

#### 3R spatial open chain

For a 3R spatial open chain, we can provide the screw axis information as

$$
T(\theta) = e^{[\mathcal{S}_1]\theta_1} e^{[\mathcal{S}_2]\theta_2} e^{[\mathcal{S}_3]\theta_3} M
$$

The zero position $M$ is

$$
M = \begin{bmatrix} 0 & 0 & 1 & L_1 \\ 0 & 1 & 0 & 0 \\ -1 & 0 & 0 & -L_2 \\ 0 & 0 & 0 & 1 \end{bmatrix}
$$

For the screw axis $S_i=(w_i, v_i)$ expressed in the fixed base frame $\{0\}$, $\omega_i$ is a unit vector representing the direction of the axis, and $v_i = -\omega_i \times q_i$. We set each axis as follows. $S_1$ is in the direction of $\hat{z}_0, \omega_1 = (0, 0, 1)$. Taking a point $q_1$ on the axis as the origin, we have $v_1 = (0,0,0)$. The next axis $S_2$ points in the negative direction of $\hat{y}_0, \omega_2 = (0, -1, 0)$. Choosing a point $q_2$ on the axis as $(L_1, 0, 0)$, we have $v_2 = (0,0,-L_1)$. The last axis $S_3$ points in the direction of $\hat{x}_0, \omega_3 = (1, 0, 0)$. Choosing a point $q_3$ on the axis as $(0, 0, -L_2)$, we have $v_3=(0,L_2, 0)$.

---

### Inverse Kinematics

When the forward kinematics of an $n$-degree-of-freedom open chain is $T(\theta)$, the inverse kinematics problem (IK) is to find a solution $\theta$ satisfying $T(\theta) = X$ for a given homogeneous transformation $X \in \text{SE}(3)$.

<img src="https://velog.velcdn.com/images/devjo/post/eb98bb70-2c42-4a56-ae95-981a5776cab5/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

For example, consider a 2-link planar open chain. When considering only the position of the end-effector, the forward kinematics is

$$
\begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} L_1 \cos \theta_1 + L_2 \cos(\theta_1 + \theta_2) \\ L_1 \sin \theta_1 + L_2 \sin(\theta_1 + \theta_2) \end{bmatrix}
$$

Assuming $L_1 > L_2$, the reachable points (workspace) form an annulus with inner radius $L_1 - L_2$ and outer radius $L_1 + L_2$. For a given end-effector position $(x, y)$, there are 0 solutions outside the annulus, and inside the annulus there are two solutions called elbow up or elbow down depending on the sign of $\theta_2$.

To find an explicit solution $(\theta_1, \theta_2)$ for $(x, y)$, we use the two-argument arctangent function $\text{atan2}(y, x)$ and the law of cosines. When the lengths of the three sides of a triangle are $a, b, c$ and the interior angle opposite $c$ is $C$, the law of cosines is

$$
c^2 = a^2 + b^2 - 2ab \cos C
$$

From the image above, we find the angle $\beta = \cos^{-1}\left(\frac{L_1^2 + L_2^2 - x^2 - y^2}{2L_1L_2}\right)$ and another angle $\alpha = \cos^{-1}\left(\frac{x^2 + y^2 + L_1^2 - L_2^2}{2L_1\sqrt{x^2 + y^2}}\right)$. Using these angles, the solution to the inverse kinematics is as follows. The right-arm solution (elbow down) has $\theta_1 = \gamma - \alpha, \theta_2 = \pi - \beta$, and the left-arm solution (elbow up) has $\theta_1 = \gamma + \alpha, \theta_2 = \beta - \pi$.

#### Newton–Raphson Method

To solve $g(\theta) = 0$ for a differentiable function $g: \mathbb{R} \to \mathbb{R}$, we use the following iteration starting from an initial guess $\theta^0$.

$$
\theta^{k+1} = \theta^k - \left( \frac{\partial g}{\partial \theta} (\theta^k) \right)^{-1} g(\theta^k)
$$

When the forward kinematics is expressed as a coordinate vector $x = f(\theta)$ and the desired end-effector coordinates are $x_d$, we find $\theta_d$ satisfying $g(\theta) = x_d - f(\theta) = 0$. Here, if the Jacobian matrix $J(\theta^0)$ near $\theta^0$ is square ($m=n$) and invertible, we have $\Delta \theta = J^{-1}(\theta^0) (x_d - f(\theta^0))$.

#### Inverse Velocity Kinematics

When the desired end-effector pose is expressed as $T_{sd} \in \text{SE}(3)$, we replace the coordinate Jacobian $J$ with the end-effector body Jacobian $J_b \in \mathbb{R}^{6 \times n}$, and the vector error $e = x_d - f(\theta^i)$ is replaced with the body twist $\mathcal{V}_b \in \mathbb{R}^6$.

$$
[\mathcal{V}_b] = \log \left( T_{sb}^{-1}(\theta^i) T_{sd} \right)
$$

We can use inverse velocity kinematics to track $T_{sd}(t)$.

$$
\dot{\theta} = J^{\dagger}(\theta) \mathcal{V}_d
$$

We can weight the joint velocities to minimize other criteria such as kinetic energy $\frac{1}{2} \dot{\theta}^T M(\theta) \dot{\theta}$ or potential energy $\nabla h(\theta)^T \dot{\theta}$.

---

### Solvability

The problem of solving the kinematic equations of a manipulator is a nonlinear problem. Given a numerical value for $T$, we attempt to find values for the joint angles $\theta_1$ through $\theta_6$. For a 6-degree-of-freedom arm, there are 12 equations and 6 unknowns. However, of the 9 equations arising from the rotation matrix portion, only 3 are independent.

#### Existence of Solutions

The question of the existence of solutions leads to the question of the manipulator's workspace. Roughly speaking, the workspace is the volume of space that the manipulator's end-effector can reach. For a solution to exist, the specified goal point must be within the workspace. The volume of space that the robot end-effector can reach in all orientations is called the dextrous workspace, and the volume of space that the robot can reach in at least one orientation is called the reachable workspace.

<img src="https://velog.velcdn.com/images/devjo/post/9fc91a76-aef0-4583-87be-98a4577d7b3c/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

If $l_1 = l_2$, the reachable workspace is a disk of radius $2l_1$. The dextrous workspace is only the origin. If this constraint is not met, that is, if $l_1 \neq l_2$, there is no dextrous workspace, and the reachable workspace is a ring with outer radius $l_1 + l_2$ and inner radius $|l_1 - l_2|$.

#### Multiple Solutions

Another possible problem that can arise in solving kinematic equations is multiple solutions. The fact that a manipulator has multiple solutions can cause problems because the system must be able to choose one of them.

<img src="https://velog.velcdn.com/images/devjo/post/5b298573-020c-4e7b-8f45-d901e43c5078/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

For example, if we want to move the robot from point A to point B, it is desirable to choose a solution that minimizes the amount that each joint must move. In the absence of obstacles, the solution closest in joint space is selected. In the presence of obstacles, a more distant solution may be selected. In general, we should be able to compute all possible solutions.

#### Manipulator subspace when $n < 6$

The reachable workspace of an $n$-degree-of-freedom manipulator ($n < 6$) can be thought of as a portion of an $n$-degree-of-freedom subspace.

$$
^B_W T = \begin{bmatrix} c_{\phi} & -s_{\phi} & 0 & x \\ s_{\phi} & c_{\phi} & 0 & y \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}
$$

Here, $x$ and $y$ provide the position of the wrist, and $\phi$ describes the orientation of the final link. In general, since the goal cannot be reached, we may be interested in reaching the goal closest to the originally desired goal that is in the manipulator's subspace.

#### Solution

By matching the forward kinematic equations $^0_3 T$ of a planar 3-link manipulator with the goal specification $^B_W T$, we obtain 4 nonlinear equations.

$$
\begin{aligned}
&c_{\phi} = c_{123}, \\
&s_{\phi} = s_{123}, \\
&x=l_1c_1 + l_2c_{12}, \\
&y=l_1s_1 + l_2s_{12}
\end{aligned}
$$

From this, we can obtain the cosine expression for $\theta_2$ as $c_2=\frac{x^2+y^2-l_1^2-l_2^2}{2l_1l_2}$, and we can find $s_2$ using $s_2 = \pm \sqrt{1 - c_2^2}$ according to the circular formula.

---

### Pieper's solution when three axes intersect

A completely general 6-degree-of-freedom robot has no closed-form solution, but certain important special cases are solvable. When the last three axes intersect, the origins of link frames $\{4\}$, $\{5\}$, and $\{6\}$ are all located at this intersection point. This intersection point ${}^B_4 p$ is given in the base frame as

$$
{}^0 p_{4ORG} = {}^0_1 T {}^1_2 T {}^2_3 T {}^3 p_{4ORG} = \begin{bmatrix} x \\ y \\ z \\ 1 \end{bmatrix}
$$

This point depends only on the joint angles $\theta_1, \theta_2, \theta_3$ for $i=4$. $\theta_4, \theta_5, \theta_6$ do not affect the position of this intersection point.

---

### References

[Original Source #1](https://www.changjiangcai.com/files/text-books/Introduction-to-Robotics-3rd-edition.pdf?utm_source=chatgpt.com)

[Original Source #2](https://hades.mech.northwestern.edu/images/7/7f/MR.pdf)

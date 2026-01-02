---
title: 'Manipulator Kinematics'
date: '2024-02-05'
tags: ['Robotics', 'Kinematics', 'lecture']
---

### Link Description

A manipulator can be thought of as a series of bodies connected in a chain by joints. These bodies are called links. Joints form connections between pairs of adjacent links. The term lower pair is used to describe a connection between a pair of bodies when the relative motion is characterized by two surfaces sliding over one another. Revolute, Prismatic, Cylindrical, Planar, Screw, and Spherical are lower-pair joints.

Mechanical design considerations generally prefer that manipulators be constructed with joints that exhibit a single degree of freedom. Most manipulators have revolute joints or sliding joints called prismatic joints. Even in the rare case of a mechanism constructed with joints having $n$ degrees of freedom, it can be modeled as $n$ single-degree-of-freedom joints connected by $n-1$ links of zero length. Therefore, without loss of generality, we will consider only manipulators with single-degree-of-freedom joints.

<img src="https://velog.velcdn.com/images/devjo/post/b8c76861-aeb3-4e23-9329-8cd403a5ef7b/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Links are numbered starting from the immobile base of the arm ($\text{link } 0$). The first moving body is $\text{link } 1$, and so on, out to the free end of the arm, which is $\text{link } n$. To position an end-effector generally in 3D space, a minimum of 6 joints is required. Joint axes are defined as lines in space. Joint axis $i$ is defined as the line in space, or vector direction, about which $\text{link } i$ rotates relative to $\text{link } i-1$. For any two axes in space, there exists a well-defined measure of distance between them. This distance is measured along a line that is mutually perpendicular to both axes. This mutual perpendicular always exists and is unique except when the two axes are parallel. When parallel, there are many mutual perpendiculars of equal length.

---

### Link-Connection

#### Intermediate links in the chain

<img src="https://velog.velcdn.com/images/devjo/post/1e9e4b30-42d4-4bf5-a309-e28ed23c802c/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Adjacent links have a common joint axis between them. One parameter of interconnection is the distance along this common axis from one link to the next. This parameter is called the link offset. The offset at joint axis $i$ is called $d_i$. A second parameter describes the amount of rotation about this common axis between one link and its neighbor. This is called the joint angle $\theta_i$.

#### First and last links in the chain

Link length $a_i$ and link twist $\alpha_i$ depend on joint axes $i$ and $i+1$. Therefore, $a_1$ through $a_{n-1}$ and $\alpha_1$ through $\alpha_{n-1}$ are defined. At the ends of the chain, these quantities will be set to zero. That is, $a_0 = a_n = 0.0$ and $\alpha_0 = \alpha_n = 0.0$.

---

### Manipulator Kinematics

#### Derivation of link transformations

We wish to construct the transformation ${}^{i-1}_i T$ that defines frame $\{i\}$ relative to frame $\{i-1\}$. In general, this transformation will be a function of four link parameters. For a given robot, this transformation will be a function of only one variable, and the other three parameters will be fixed by mechanical design.

Frame $\{R\}$ differs from frame $\{i-1\}$ only by a rotation of $\theta_i$.
Frame $\{Q\}$ differs from frame $\{R\}$ only by a translation of $d_i$.
Frame $\{P\}$ differs from frame $\{Q\}$ only by a rotation of $\alpha_i$.
Frame $\{i\}$ differs from frame $\{P\}$ only by a translation of $a_i$.

$$
{}^{i-1}P = {}^{i-1}_i T {}^{i}P
$$

Considering this as a transformation, we have

$$
\begin{aligned}
&{}^{i-1}_i T = R_X(\alpha_{i-1})D_X(a_{i-1})R_Z(\theta_i)D_Z(d_i) \\
&= Screw_X(a_{i-1}, \alpha_{i-1})Screw_Z(d_i, \theta_i)
\end{aligned}
$$

#### Concatenating link transformations

Once the link coordinate systems have been defined and the corresponding link parameters found, the individual link transformation matrices ${}^{i-1}_i T$ can be computed. Then, the link transformations can be multiplied together to find a single transformation $T$ that relates frame $\{N\}$ to frame $\{0\}$

$$
{}^0_N T = {}^{0}_1 T {}^{1}_2 T {}^{2}_3 T \cdots {}^{N-1}_N T
$$

#### Frames

The base frame is denoted $\{B\}$ and is located at the base of the manipulator. This is another name for frame $\{0\}$. The station frame is denoted $\{S\}$ and is the frame relative to which all robot motions are performed. The station frame is always specified relative to the base frame; that is, ${}^{B}_S T$ is defined. The wrist frame is denoted $\{W\}$ and is attached to the last link of the manipulator. The tool frame is denoted $\{T\}$ and is attached to the end of any tool the robot is holding. When the hand is empty, the origin of $\{T\}$ is usually located between the fingertips of the robot. Finally, the goal frame is denoted $\{G\}$ and is a description of the location to which the robot is to move the tool. At the end of the motion, the tool frame should be brought to coincidence with the goal frame.

---

### References

[Original Source #1](https://www.changjiangcai.com/files/text-books/Introduction-to-Robotics-3rd-edition.pdf?utm_source=chatgpt.com)

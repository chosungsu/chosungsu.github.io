---
title: 'Spatial descriptions and Transformations'
date: '2024-02-02'
tags: ['Robotics', 'Kinematics', 'lecture']
---

### Introduction

Robot manipulation, by definition, means that parts and tools are moved through space by some mechanism. This naturally leads to the need to express the position and orientation of parts, tools, and the mechanism itself. To define and manipulate mathematical quantities that represent position and orientation, we must define coordinate systems and develop conventions for representation.

---

### Position, Orientation, Frame

#### Description of a position

A $3 \times 1$ position vector can be used to locate any point in space. Since we will define many coordinate systems in addition to the universe coordinate system, vectors must be tagged with information identifying which coordinate system they are defined within. In this book, vectors are written with a leading superscript indicating the coordinate system to which they are referenced. For example, ${}^A \mathbf{P}$ means that the components of ${}^A \mathbf{P}$ have numerical values that indicate distances along the axes of $\{A\}$. Each of these distances along an axis can be thought of as the result of projecting the vector onto the corresponding axis. The individual elements of the vector are given subscripts $x, y,$ and $z$.

$$
\mathbf{P} = \begin{bmatrix} P_x \\ P_y \\ P_z \end{bmatrix}
$$

#### Description of an orientation

<img src="https://velog.velcdn.com/images/devjo/post/985747fd-6d2f-41f3-8566-9ee8d1b96cf4/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

If vector ${}^A \mathbf{P}$ describes the position of a point between the fingertips of a manipulator, assuming the manipulator has a sufficient number of joints, the hand can take on arbitrary orientations while keeping the point between the fingertips at the same location in space. Therefore, the complete location of the hand is not specified until the orientation is given. To describe the orientation of an object, we will attach a coordinate system to the object and then give a description of this coordinate system relative to a reference system.

Thus, the position of a point is described by a vector, and the orientation of an object is described by an attached coordinate system. One way to describe the coordinate system $\{B\}$ attached to an object is to write the unit vectors of its three principal axes in terms of coordinate system $\{A\}$. We denote the unit vectors giving the principal directions of coordinate system $\{B\}$ as $\hat{X}_B$, $\hat{Y}_B,$ and $\hat{Z}_B$. When written in terms of coordinate system $\{A\}$, they are called ${}^A \hat{X}_B, {}^A \hat{Y}_B,$ and ${}^A \hat{Z}_B$.

Stacking these together as the columns of a $3 \times 3$ matrix is called a rotation matrix and is given the notation ${}^A_B \mathbf{R}$.

$$
{}^A_B \mathbf{R} = [{}^A \hat{X}_B \quad {}^A \hat{Y}_B \quad {}^A \hat{Z}_B]
$$

Each component can be written as the dot product of a pair of unit vectors.

$$
{}^A_B \mathbf{R} = \begin{bmatrix} \hat{X}_B \cdot \hat{X}_A & \hat{Y}_B \cdot \hat{X}_A & \hat{Z}_B \cdot \hat{X}_A \\ \hat{X}_B \cdot \hat{Y}_A & \hat{Y}_B \cdot \hat{Y}_A & \hat{Z}_B \cdot \hat{Y}_A \\ \hat{X}_B \cdot \hat{Z}_A & \hat{Y}_B \cdot \hat{Z}_A & \hat{Z}_B \cdot \hat{Z}_A \end{bmatrix}
$$

From this expression, we can see that the description of $\{A\}$ relative to $\{B\}$, ${}^B \mathbf{R}_A$, is given by the transpose.

#### Description of a frame

The information needed to completely specify the whereabouts of the manipulator hand is position and orientation. For convenience, we choose the position of the point to be described as the origin of the frame attached to the object. The situation of having a position and orientation pair arises so often in robotics that we define an entity called a frame, which is a set of four vectors giving position and orientation information. One vector describes the fingertip position, and three vectors describe its orientation.

Frame $\{B\}$ is described by ${}^A_B \mathbf{R}$ and ${}^A \mathbf{P}_{BORG}$, where ${}^A \mathbf{P}_{BORG}$ is the vector that locates the origin of frame $\{B\}$.

$$
\{B\} = \{ {}^A_B \mathbf{R}, \quad {}^A \mathbf{P}_{BORG} \}
$$

---

### Changing descriptions from frame to frame

#### Mappings involving translated frames

<img src="https://velog.velcdn.com/images/devjo/post/c79f5469-4140-4951-a3ed-f8dd1977e94e/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

We wish to express a point in space from the viewpoint of frame $\{A\}$ when $\{B\}$ has the same orientation as $\{A\}$ but differs only by a translation. This translation is given by the vector ${}^A \mathbf{P}_{BORG}$, which locates the origin of $\{B\}$ relative to $\{A\}$.

$$
{}^A \mathbf{P} = {}^B \mathbf{P} + {}^A \mathbf{P}_{BORG}
$$

We compute this by vector addition because both vectors are defined relative to frames of the same orientation.

#### Mappings involving rotated frames

The rotation matrix ${}^A_B \mathbf{R}$ represents the orientation of $\{B\}$ relative to $\{A\}$.

<img src="https://velog.velcdn.com/images/devjo/post/cc0a5a96-d172-4938-b76e-029785a871e4/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

This is possible when the orientation description ${}^A_B \mathbf{R}$ of $\{B\}$ relative to $\{A\}$ is known, in a situation where we wish to know its description relative to another frame $\{A\}$ where the origins of the two frames coincide.

$$
{}^A \mathbf{P} = {}^A_B \mathbf{R} {}^B \mathbf{P}
$$

This implements the mapping that changes the description of a vector from ${}^B \mathbf{P}$ relative to $\{B\}$ to ${}^A \mathbf{P}$ relative to $\{A\}$.

#### Mappings involving general frames

<img src="https://velog.velcdn.com/images/devjo/post/d8407232-5005-4f3f-9d57-39e39b313354/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Here, the origin of frame $\{B\}$ is not coincident with $\{A\}$ but has a general vector offset ${}^A \mathbf{P}_{BORG}$. Also, $\{B\}$ is rotated relative to $\{A\}$ as described by ${}^A_B \mathbf{R}$. As before, we describe the translation between origins by simple vector addition and obtain.

$$
{}^A \mathbf{P} = {}^A_B \mathbf{R} {}^B \mathbf{P} + {}^A \mathbf{P}_{BORG}
$$

This describes the general transformation mapping that transforms a vector from its description in one frame to its description in a second frame. To write this in matrix operator form, we use a 4-dimensional position vector ($4 \times 1$) and define a $4 \times 4$ matrix operator as follows. We call this a homogeneous transform.

$$
\begin{bmatrix} {}^A \mathbf{P} \\ 1 \end{bmatrix} = \begin{bmatrix} {}^A_B \mathbf{R} & {}^A \mathbf{P}_{BORG} \\ \mathbf{0}^T & 1 \end{bmatrix} \begin{bmatrix} {}^B \mathbf{P} \\ 1 \end{bmatrix}
$$

---

### Translation, Rotation and Transformation

#### Translational operators

<img src="https://velog.velcdn.com/images/devjo/post/0039a77b-7838-48b3-b0b2-a24d2e1d7df2/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Translation moves a point in space a finite distance along a given vector direction. ${}^A \mathbf{P}_1$ is transformed by vector ${}^A \mathbf{Q}$. The resulting vector ${}^A \mathbf{P}_2$ is calculated as.

$$
{}^A \mathbf{P}_2 = {}^A \mathbf{P}_1 + {}^A \mathbf{Q}
$$

To write this translation operation as a matrix operator, we use the following notation.

$$
{}^A \mathbf{P}_2 = \mathbf{D}_Q (q) {}^A \mathbf{P}_1
$$

The $\mathbf{D}_Q$ operator can be thought of as a homogeneous transform of a special and simple form.

#### Rotational operators

Another interpretation of a rotation matrix is as a rotational operator that acts on a vector ${}^A \mathbf{P}_1$ and changes it to a new vector ${}^A \mathbf{P}_2$ by means of a rotation $\mathbf{R}$. When a rotation matrix is shown as an operator, it usually has no subscripts or superscripts.

$$
{}^A \mathbf{P}_2 = \mathbf{R} {}^A \mathbf{P}_1
$$

We will also define another notation that clearly indicates which axis the rotation is about

$$
{}^A \mathbf{P}_2 = \mathbf{R}_K (\theta) {}^A \mathbf{P}_1
$$

$\mathbf{R}_K (\theta)$ is a rotational operator that performs a rotation about axis $K$ of $\theta$ degrees.

#### Transformation operators

The operator $\mathbf{T}$ rotates and translates a vector ${}^A \mathbf{P}_1$ to compute a new vector ${}^A \mathbf{P}_2$

$$
{}^A \mathbf{P}_2 = \mathbf{T} {}^A \mathbf{P}_1
$$

A transformation $\mathbf{T}$ that rotates by $\mathbf{R}$ and translates by $\mathbf{Q}$ is the same as a transformation that describes a frame rotated by $\mathbf{R}$ and translated by $\mathbf{Q}$ relative to the reference frame.

#### X-Y-Z fixed angles

One way to describe the orientation of frame $\{B\}$ is as follows. Start with the frame coincident with a known reference frame $\{A\}$. Rotate $\{B\}$ first about $X_A$ by an angle $\gamma$, then about $Y_A$ by an angle $\beta$, and finally about $Z_A$ by an angle $\alpha$. Each of the three rotations takes place about an axis of the fixed reference frame $\{A\}$. The derivation of the rotation matrix is as follows.

$$
\begin{aligned} {}^A_B \mathbf{R}_{XYZ}(\gamma, \beta, \alpha) 
&= \mathbf{R}_Z(\alpha) \mathbf{R}_Y(\beta) \mathbf{R}_X(\gamma) \\ 
&= \begin{bmatrix} c\alpha & -s\alpha & 0 \\ s\alpha & c\alpha & 0 \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} c\beta & 0 & s\beta \\ 0 & 1 & 0 \\ -s\beta & 0 & c\beta \end{bmatrix} \begin{bmatrix} 1 & 0 & 0 \\ 0 & c\gamma & -s\gamma \\ 0 & s\gamma & c\gamma \end{bmatrix} \end{aligned}
$$

where $c\alpha$ is shorthand for $\cos \alpha$, and $s\alpha$ is shorthand for $\sin \alpha$. The inverse problem of extracting the equivalent X–Y–Z fixed angles from a rotation matrix is interesting. The solution depends on solving a set of transcendental equations. Equating with the given rotation matrix yields nine equations with three unknowns. Among the nine equations, there are six dependencies, so essentially we have three equations and three unknowns.

$$
{}^A_B \mathbf{R}_{XYZ}(\gamma, \beta, \alpha)  = \begin{bmatrix} r_{11} & r_{12} & r_{13} \\ r_{21} & r_{22} & r_{23} \\ r_{31} & r_{32} & r_{33} \end{bmatrix}
$$

From the above equations, we can see that $\cos \beta$ can be calculated by taking the square root of the sum of squares of $r_{32}$ and $r_{33}$. Using this, we can solve for $\beta$ using the arctangent of $r_{31}$.

$$
\begin{aligned}
&\beta = \text{Atan2}(-r_{31}, \sqrt{r_{11}^2 + r_{21}^2}), \\
&\alpha = \text{Atan2}(\frac{r_{21}}{c\beta}, \frac{r_{11}}{c\beta}), \\
&\gamma = \text{Atan2}(\frac{r_{32}}{c\beta}, \frac{r_{33}}{c\beta})
\end{aligned}
$$

#### Z-Y-X Euler angles

Another possible description of frame $\{B\}$ is as follows. Start with the frame coincident with a known frame $\{A\}$. Rotate $\{B\}$ first about $Z_B$ by an angle $\alpha$, then about $Y_{B'}$ by an angle $\beta$, and finally about $X_{B''}$ by an angle $\gamma$. In this representation, each rotation is performed about an axis of the moving system $\{B\}$ rather than about a fixed reference $\{A\}$. This set of three rotations is called Euler angles.

Using the intermediate frames $\{B'\}$ and $\{B''\}$, we can give an expression for ${}^A_B \mathbf{R}_{Z'Y'X'}(\alpha, \beta, \gamma)$

$$
{}^A_B \mathbf{R} = {}^A_{B'} \mathbf{R} {}^{B'}_{B''} \mathbf{R} {}^{B''}_B \mathbf{R}
$$

The result is exactly the same as that obtained for the same three rotations taken in the opposite order about fixed axes.

#### Z-Y-Z Euler angles

Another possible description is as follows. Start with the frame coincident with a known frame $\{A\}$. Rotate $\{B\}$ first about $Z_B$ by an angle $\alpha$, then about $Y_{B'}$ by an angle $\beta$, and finally about $Z_{B''}$ by an angle $\gamma$.

$$
{}^A_B \mathbf{R}_{Z'Y'Z'}(\alpha, \beta, \gamma) = \begin{bmatrix} c\alpha c\beta c\gamma - s\alpha s\gamma & -c\alpha c\beta s\gamma - s\alpha c\gamma & c\alpha s\beta \\ s\alpha c\beta c\gamma + c\alpha s\gamma & -s\alpha c\beta s\gamma + c\alpha c\gamma & s\alpha s\beta \\ -s\beta c\gamma & s\beta s\gamma & c\beta \end{bmatrix}
$$

If $\sin \beta \ne 0$, then

$$
\begin{aligned}
&\beta = \text{Atan2}(\sqrt{r_{31}^2 + r_{32}^2}, r_{33}), \\
&\alpha = \text{Atan2}(\frac{r_{23}}{s\beta}, \frac{r_{13}}{s\beta}), \\
&\gamma = \text{Atan2}(\frac{r_{32}}{s\beta}, -\frac{r_{31}}{s\beta})
\end{aligned}
$$

A second solution exists, but we always compute the single solution for which $0.0^\circ < \beta < 180.0^\circ$ by using the positive square root in the formula $\sqrt{r_{13}^2 + r_{23}^2}$. If $\beta = 0.0^\circ$ or $180.0^\circ$, the solution is degenerate.

---

### References

[Original Source #1](https://www.changjiangcai.com/files/text-books/Introduction-to-Robotics-3rd-edition.pdf?utm_source=chatgpt.com)

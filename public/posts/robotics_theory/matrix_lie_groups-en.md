---
title: 'Matrix Lie Groups'
date: '2024-10-16'
tags: ['Robotics', 'lecture']
---

### Geometry

The special orthogonal group (SO(3)) is the set of valid rotation matrices.

$$
SO(3) = \left\{ C \in \mathbb{R}^{3 \times 3} \mid C C^T = \mathbf{I}, \det C = 1 \right\}
$$

Here, $C C^T = \mathbf{I}$ imposes 6 constraints on 9 parameters, reducing the degrees of freedom to 3. The determinant condition ensures proper rotation. Although $SO(3)$ is a set of matrices, it is not a vector space: it is not closed under addition ($C_1 + C_2 \notin SO(3)$), and the zero matrix $\mathbf{0}$ is not a valid rotation matrix.

The special Euclidean group (SE(3)) is the set of valid transformation matrices.

$$
SE(3) = \left\{ T = \begin{bmatrix} C & \mathbf{r} \\ \mathbf{0}^T & 1 \end{bmatrix} \in \mathbb{R}^{4 \times 4} \mid C \in SO(3), \mathbf{r} \in \mathbb{R}^3 \right\}
$$

$SO(3)$ and $SE(3)$ are matrix Lie groups. A Lie group is a set that is both a differentiable manifold and satisfies the four group axioms.

#### Lie Algebras

Every matrix Lie group has an associated Lie algebra. A Lie algebra consists of a vector space $V$ with a binary operation $[\cdot, \cdot]$ called the Lie bracket, which satisfies four properties: closure, bilinearity, alternation, and the Jacobi identity. The vector space of the Lie algebra is the tangent space at the identity element of the Lie group, fully capturing its local structure.

The Lie algebra associated with $SO(3)$ is as follows:

The vector space $\mathfrak{so}(3) = \left\{ \mathbf{\Phi} = \boldsymbol{\phi}^\wedge \in \mathbb{R}^{3 \times 3} \mid \boldsymbol{\phi} \in \mathbb{R}^3 \right\}$ where $\boldsymbol{\phi}^\wedge = \begin{bmatrix} 0 & -\phi_3 & \phi_2 \\ \phi_3 & 0 & -\phi_1 \\ -\phi_2 & \phi_1 & 0 \end{bmatrix}$, which is a linear and skew-symmetric matrix.

The Lie algebra associated with $SE(3)$ is:

The vector space $\mathfrak{se}(3) = \left\{ \mathbf{\Xi} = \boldsymbol{\xi}^\wedge \in \mathbb{R}^{4 \times 4} \mid \boldsymbol{\xi} \in \mathbb{R}^6 \right\}$, where $\boldsymbol{\xi}^\wedge = \begin{bmatrix} \boldsymbol{\phi}^\wedge & \boldsymbol{\rho} \\ \mathbf{0}^T & 0 \end{bmatrix}, \boldsymbol{\xi} = \begin{bmatrix} \boldsymbol{\rho} \\ \boldsymbol{\phi} \end{bmatrix}$.

#### Exponential Map

The exponential map is key for connecting a matrix Lie group and its associated Lie algebra.

$$
\exp(\mathbf{A}) = \mathbf{I} + \mathbf{A} + \frac{1}{2!} \mathbf{A}^2 + \frac{1}{3!} \mathbf{A}^3 + \cdots = \sum_{n=0}^\infty \frac{1}{n!} \mathbf{A}^n
$$

An element of $SO(3)$ can be related to an element of $\mathfrak{so}(3)$ via the exponential map:

$$
C = \exp(\boldsymbol{\phi}^\wedge) = \sum_{n=0}^\infty \frac{1}{n!} (\boldsymbol{\phi}^\wedge)^n
$$

The exponential map $\exp: \mathfrak{so}(3) \to SO(3)$ is surjective but not injective. That is, every element of $SO(3)$ can be generated from multiple elements of $\mathfrak{so}(3)$.

To find $\boldsymbol{\phi} \in \mathbb{R}^3$ from $C \in SO(3)$, use the trace of the matrix $\operatorname{tr}(C)$ to find the rotation angle $\phi$:

$$
\phi = \cos^{-1} \left( \frac{\operatorname{tr}(C) - 1}{2} \right) + 2\pi m
$$

An element of $SE(3)$ can also be related to an element of $\mathfrak{se}(3)$ via the exponential map:

$$
T = \exp(\boldsymbol{\xi}^\wedge) = \sum_{n=0}^\infty \frac{1}{n!} (\boldsymbol{\xi}^\wedge)^n
$$

To recover $\boldsymbol{\xi} = [\boldsymbol{\rho}^T, \boldsymbol{\phi}^T]^T \in \mathbb{R}^6$ from $T \in SE(3)$, first find $\boldsymbol{\phi}$ from $C$, then compute $\boldsymbol{\rho} = J^{-1} \mathbf{r}$.

#### Adjoints

A 6x6 transformation matrix $\mathbf{T}$ can be directly constructed from the 4x4 transformation matrix $T$. This is called the adjoint representation of an $SE(3)$ element:

$$
\mathbf{T} = \operatorname{Ad}(T) = \operatorname{Ad} \begin{bmatrix} C & \mathbf{r} \\ \mathbf{0}^T & 1 \end{bmatrix} = \begin{bmatrix} C & \mathbf{r}^\wedge C \\ \mathbf{0} & C \end{bmatrix}
$$

$\operatorname{Ad}(SE(3))$ satisfies all four group axioms (closure, associativity, identity, inverse). Likewise, the adjoint representation of a Lie algebra element $\mathbf{\Xi} = \boldsymbol{\xi}^\wedge$ in $\mathfrak{se}(3)$ can be defined as:

$$
\operatorname{ad}(\mathbf{\Xi}) = \operatorname{ad}(\boldsymbol{\xi}^\wedge) = \boldsymbol{\xi}^\mathfrak{f}
$$

Here, $\boldsymbol{\xi} = [\boldsymbol{\rho}^T, \boldsymbol{\phi}^T]^T$ and $\boldsymbol{\xi}^\mathfrak{f} = \begin{bmatrix} \boldsymbol{\phi}^\wedge & \boldsymbol{\rho}^\wedge \\ \mathbf{0} & \boldsymbol{\phi}^\wedge \end{bmatrix} \in \mathbb{R}^{6 \times 6}$. Thus, for the Lie algebra associated with $\operatorname{Ad}(SE(3))$, i.e., $\operatorname{ad}(\mathfrak{se}(3))$, the vector space is $\{\mathbf{\Psi} = \operatorname{ad}(\mathbf{\Xi}) \in \mathbb{R}^{6 \times 6} \mid \mathbf{\Xi} \in \mathfrak{se}(3)\}$. This also satisfies all four properties of the Lie bracket.

#### Baker-Campbell-Hausdorff, BCH

In general, matrix exponentials do not simply combine as $\exp(\mathbf{A}) \exp(\mathbf{B}) = \exp(\mathbf{A} + \mathbf{B})$. To compose two matrix exponentials, use the Baker-Campbell-Hausdorff (BCH) formula:

$$
\begin{aligned}
&\ln (\exp(\mathbf{A}) \exp(\mathbf{B})) \\
&= \mathbf{A} + \mathbf{B} + \frac{1}{2} [\mathbf{A}, \mathbf{B}] + \frac{1}{12} [\mathbf{A}, [\mathbf{A}, \mathbf{B}]] - \frac{1}{12} [\mathbf{B}, [\mathbf{A}, \mathbf{B}]] + \cdots
\end{aligned}
$$

In the case of $SO(3)$, for $\mathbf{C}_1 = \exp(\boldsymbol{\phi}_1^\wedge)$ and $\mathbf{C}_2 = \exp(\boldsymbol{\phi}_2^\wedge)$, we can write:

$$
\ln (\mathbf{C}_1 \mathbf{C}_2)^\vee = \boldsymbol{\phi}_1 + \boldsymbol{\phi}_2 + \frac{1}{2} \boldsymbol{\phi}_1^\wedge \boldsymbol{\phi}_2 + \frac{1}{12} \boldsymbol{\phi}_1^\wedge \boldsymbol{\phi}_1^\wedge \boldsymbol{\phi}_2 + \cdots
$$

If either $\boldsymbol{\phi}_1$ or $\boldsymbol{\phi}_2$ is small, an approximate BCH formula is used:

$$
\ln (\mathbf{C}_1 \mathbf{C}_2)^\vee \approx \begin{cases} \mathbf{J}_\ell(\boldsymbol{\phi}_2)^{-1} \boldsymbol{\phi}_1 + \boldsymbol{\phi}_2 & \text{($\boldsymbol{\phi}_1$ is small)} \\ \boldsymbol{\phi}_1 + \mathbf{J}_r(\boldsymbol{\phi}_1)^{-1} \boldsymbol{\phi}_2 & \text{($\boldsymbol{\phi}_2$ is small)} \end{cases}
$$

Here, $\mathbf{J}_r$ and $\mathbf{J}_\ell$ are the right and left Jacobians of $SO(3)$, respectively.

For $SE(3)$, with $\mathbf{T}_1 = \exp(\boldsymbol{\xi}_1^\wedge)$ and $\mathbf{T}_2 = \exp(\boldsymbol{\xi}_2^\wedge)$, we have:

$$
\ln (\mathbf{T}_1 \mathbf{T}_2)^\vee = \boldsymbol{\xi}_1 + \boldsymbol{\xi}_2 + \frac{1}{2} \boldsymbol{\xi}_1^\mathfrak{f} \boldsymbol{\xi}_2 + \frac{1}{12} \boldsymbol{\xi}_1^\mathfrak{f} \boldsymbol{\xi}_1^\mathfrak{f} \boldsymbol{\xi}_2 + \cdots
$$

This is expressed similarly.

#### Distance, Volume, Integration

The difference between two rotations $\mathbf{C}_1, \mathbf{C}_2 \in SO(3)$ can be defined as the left difference $\boldsymbol{\phi}_{21} = \ln(\mathbf{C}_2 \mathbf{C}_1^T)^\vee$ or the right difference $\boldsymbol{\phi}_{12} = \ln(\mathbf{C}_1^T \mathbf{C}_2)^\vee$.

The metric distance $\phi_{12}$ between two rotations is the Euclidean norm of the difference vector:

$$
\phi_{12} = |\boldsymbol{\phi}_{12}| = \sqrt{\boldsymbol{\phi}_{12}^T \boldsymbol{\phi}_{12}}
$$

The infinitesimal volume element of a rotation $\mathbf{C} = \exp(\boldsymbol{\phi}^\wedge)$ is:

$$
d\mathbf{C} = |\det(\mathbf{J})| d\boldsymbol{\phi}
$$

Because $SO(3)$ is a unimodular Lie group, the volume element is the same whether taken from the left or right.

The integration of a function $f(\mathbf{C})$ defined on rotations is performed as follows:

$$
\int_{SO(3)} f(\mathbf{C}) d\mathbf{C} \to \int_{|\boldsymbol{\phi}| < \pi} f(\boldsymbol{\phi}) |\det(\mathbf{J})| d\boldsymbol{\phi}
$$

#### Interpolation

Sometimes it is necessary to interpolate between two elements of a matrix Lie group. Unfortunately, ordinary linear interpolation $\mathbf{x} = (1 - \alpha) \mathbf{x}_1 + \alpha \mathbf{x}_2$ ($\alpha \in [0, 1]$) does not satisfy the closure property and does not work here.

One possible interpolation for $SO(3)$ is:

$$
\mathbf{C} = \left( \mathbf{C}_2 \mathbf{C}_1^T \right)^\alpha \mathbf{C}_1
$$

When $\alpha = 0$, $\mathbf{C} = \mathbf{C}_1$; when $\alpha = 1$, $\mathbf{C} = \mathbf{C}_2$. This interpolation guarantees closure. $\mathbf{C}_{21} = \mathbf{C}_2 \mathbf{C}_1^T$ is a rotation matrix, and through exponentiation, $\mathbf{C}_{21}^\alpha = \exp(\alpha \boldsymbol{\phi}_{21}^\wedge) \in SO(3)$, so the result $\mathbf{C}$ is also in $SO(3)$.

If small perturbations ($\delta \boldsymbol{\phi}_1, \delta \boldsymbol{\phi}_2$) are added to $\mathbf{C}_1$ and $\mathbf{C}_2$, the resulting perturbation $\delta \boldsymbol{\phi}$ of $\mathbf{C}$ has a neat form:

$$
\delta \boldsymbol{\phi} = (1 - \mathbf{A}(\alpha, \boldsymbol{\phi}_{21})) \delta \boldsymbol{\phi}_1 + \mathbf{A}(\alpha, \boldsymbol{\phi}_{21}) \delta \boldsymbol{\phi}_2
$$

Here, $\mathbf{A}(\alpha, \boldsymbol{\phi})$ is defined in terms of the Jacobian and has the form $\mathbf{A}(\alpha, \boldsymbol{\phi}) = \alpha \mathbf{J}(\alpha \boldsymbol{\phi}) \mathbf{J}(\boldsymbol{\phi})^{-1}$, which closely resembles standard linear interpolation. When $\boldsymbol{\phi}$ is small, $\mathbf{A}(\alpha, \boldsymbol{\phi}) \approx \alpha \mathbf{I}$.

The interpolation for $SE(3)$ is similar to the $SO(3)$ case:

$$
\mathbf{T} = \left( \mathbf{T}_2 \mathbf{T}_1^{-1} \right)^\alpha \mathbf{T}_1
$$

---

### Kinematics

#### Rotations

The rotational kinematic equation for a rotation matrix $\mathbf{C} \in SO(3)$, known as Poisson's equation, relates the angular velocity $\boldsymbol{\omega}$ to the rotation $\mathbf{C}$ as follows:

$$
\dot{\mathbf{C}} = \boldsymbol{\omega}^\wedge \mathbf{C} , \quad \boldsymbol{\omega}^\wedge = \mathbf{C} \dot{\mathbf{C}}^T
$$

This equation is expressed with $\mathbf{C}$ and does not have singularities, but $\mathbf{C}$ has the constraint $\mathbf{C} \mathbf{C}^T = \mathbf{I}$.

Equivalent kinematics can be expressed using the Lie algebra, with $\boldsymbol{\phi} = \ln(\mathbf{C})^\vee$. By differentiating the matrix exponential with respect to time, and rearranging, we have $\mathbf{C} \dot{\mathbf{C}}^T = (\mathbf{J} \dot{\boldsymbol{\phi}})^\wedge$.

#### Poses

A transformation matrix $\mathbf{T} \in SE(3)$ can be written as $\mathbf{T} = \begin{bmatrix} \mathbf{C} & \mathbf{r} \\ \mathbf{0}^T & 1 \end{bmatrix}$, and $\text{exp}(\boldsymbol{\xi}^\wedge)=\begin{bmatrix} \boldsymbol{\rho} \\ \boldsymbol{\phi} \end{bmatrix}$ as shown.

There are also hybrid methods that treat rotational velocity $\dot{\boldsymbol{\phi}}$ in the Lie algebra and translational velocity $\dot{\mathbf{r}}$ in Euclidean space.

$$
\begin{bmatrix} \dot{\mathbf{r}} \\ \dot{\boldsymbol{\phi}} \end{bmatrix} = \begin{bmatrix} \mathbf{I} & -\mathbf{r}^\wedge \\ \mathbf{0} & \mathbf{J}^{-1} \end{bmatrix} \begin{bmatrix} \boldsymbol{\nu} \\ \boldsymbol{\omega} \end{bmatrix}
$$

#### Linearized Rotations

Linearize the kinematics by considering a perturbation around the nominal solution $\mathbf{C}$: $\mathbf{C}' = \exp(\delta \boldsymbol{\phi}^\wedge) \mathbf{C} \approx (\mathbf{I} + \delta \boldsymbol{\phi}^\wedge) \mathbf{C}$. Linearizing the perturbed kinematics $\dot{\mathbf{C}}' = \boldsymbol{\omega}'^\wedge \mathbf{C}'$, we obtain two separate equations:

Nominal kinematics: $\dot{\mathbf{C}} = \boldsymbol{\omega}^\wedge \mathbf{C}$,
Perturbation kinematics: $\dot{\delta \boldsymbol{\phi}} = \boldsymbol{\omega}^\wedge \delta \boldsymbol{\phi} + \delta \boldsymbol{\omega}$.

---

### References

[Original Source #1](https://mingkangxiong.github.io/assets/books/State_Estimation_for_Robotic_2018.pdf?utm_source=chatgpt.com)


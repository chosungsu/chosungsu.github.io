---
title: 'Kinematics Introduction'
date: '2024-10-02'
tags: ['robotics', 'mathematics', 'lecture']
---

### Introduction

Kinematics is the study of motion of points, objects, and systems of objects. It describes how objects move, but not why they move. To describe the kinematics of a moving point, we use position vectors and their derivatives, typically defined in $\mathbb{R}^3$. In the extended case, we must consider $\varphi \in SO(3)$ rotations to fully define the form.

---

### Position

<img src="https://velog.velcdn.com/images/devjo/post/ff92954e-af3c-4b6d-a485-d2d17d653676/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

The relative position of point $B$ with respect to point $A$ can be expressed as $r_{AB}$. To represent the components of the vector numerically, we define a reference frame $\mathcal{A}$ and express the vector in this frame as $_{\mathcal{A}}r_{AB}$. In this frame, the unit vectors $e_x^{\mathcal{A}}, e_y^{\mathcal{A}}, e_z^{\mathcal{A}}$ form an orthonormal basis.

To represent position in 3D space, three parameters are needed.

#### 1. Cartesian coordinates

The most common method is to use Cartesian coordinates, parameterized as follows:

$$
\chi_P^c=\begin{pmatrix} x \\ y \\ z\end{pmatrix}
$$

This simply means that the position vector is given as $_{\mathcal{A}}r=xe_x^{\mathcal{A}}+ye_y^{\mathcal{A}}+ze_z^{\mathcal{A}}$.

#### 2. Cylindrical coordinates

Next, we use cylindrical coordinates:

$$
\chi_P^z=\begin{pmatrix} \rho \\ \theta \\ z \end{pmatrix}
$$

This means that the position vector is given as $_{\mathcal{A}}r=\begin{pmatrix} \rho \cos\theta \\ \rho \sin\theta \\ z \end{pmatrix}$.

#### 3. Spherical coordinates

The third method is to use spherical coordinates:

$$
\chi_P^s=\begin{pmatrix} r \\ \theta \\ \varphi \end{pmatrix}
$$

This means that the position vector is given as $_{\mathcal{A}}r=\begin{pmatrix} r \cos \theta \sin \varphi \\ r \sin \theta \sin \varphi \\ r \cos \varphi \end{pmatrix}$.

---

### Linear velocity

The velocity of point $B$ with respect to point $A$ is given by $\dot{r}_{AB}$.

There exists a linear mapping $E_P(\chi)$ between the velocity and the derivative of the representation $\dot{\chi}_P$. Therefore, we can write $\dot{r}=E_P(\chi_P)\dot{\chi}_P$, and using the inverse function, we can express it as $\dot{\chi}_P=E_P^{-1}(\chi_P)\dot{r}$.

In Cartesian coordinates, this becomes the identity matrix:

$$
E_P^c(\chi_P^c)=E_P^{-1,c}(\chi_P^c)=I
$$

In cylindrical coordinates, we have $\dot{r}(\chi_P^z)=\begin{pmatrix} \dot{\rho} \cos \theta - \rho \dot{\theta} \sin \theta \\ \dot{\rho} \sin \theta + \rho \dot{\theta} \cos \theta \\ \dot{z}\end{pmatrix}$. Therefore, by the inverse function relationship, we can define $\dot{\chi}_P^z=\begin{pmatrix} \dot{\rho} \\ \dot{\theta} \\ \dot{z} \end{pmatrix}=\begin{bmatrix} \cos \theta & \sin \theta & 0 \\ -\sin \theta / \rho & \cos \theta / \rho & 0 \\ 0 & 0 & 1\end{bmatrix}_{E_{P_z}^{-1}} \begin{pmatrix} \dot{x} \\ \dot{y} \\ \dot{z}\end{pmatrix}$.

Finally, in spherical coordinates, we obtain $E_P^s=\begin{bmatrix} \cos \theta \sin \varphi & -r\sin \varphi \sin \theta & r \cos \varphi \cos \theta \\ \sin \varphi \sin \theta & r\cos \theta \sin \varphi & r\cos \varphi \sin \theta \\ \cos \varphi & 0 & -r \sin \varphi\end{bmatrix}$.

---

### References

[Original Source #1](https://ethz.ch/content/dam/ethz/special-interest/mavt/robotics-n-intelligent-systems/rsl-dam/documents/RobotDynamics2017/RD_HS2017script.pdf)




---
title: 'Kinematics Introduction'
date: '2024-10-02'
tags: ['robotics', 'mathematics', 'lecture']
---

### Introduction

운동학(Kinematics)은 점, 물체, 그리고 물체 시스템의 움직임을 설명하는 학문입니다. 이것은 물체가 어떻게 움직이는지만 설명할 뿐, 왜 움직이는지는 설명하지 않습니다. 움직이는 점의 운동학을 설명하기 위해, $R^3$에 일반적으로 정의된 위치 벡터(position vectors)와 그 미분값을 사용합니다. 확장한 경우 그 형태를 완전히 정의하기 위해 $\varphi=SO(3)$ 회전을 고려해야 합니다.

---

### Position

<img src="https://velog.velcdn.com/images/devjo/post/ff92954e-af3c-4b6d-a485-d2d17d653676/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

점 $B$의 $A$에 대한 상대적 위치는 $r_{AB}$로 표현할 수 있습니다. 벡터의 성분을 수치적으로 표현하기 위해서는 기준 틀(reference frame) $\mathcal{A}$를 정의하고 $_\mathcal{A}r_{AB}$ 이 틀에서 벡터를 표현합니다. 이 틀에서 단위 벡터 $e_x^{\mathcal{A}}, e_y^{\mathcal{A}}, e_z^{\mathcal{A}}$가 정규직교 기저를 형성합니다.

3차원 공간에서 위치를 나타내기 위해서는 세 개의 매개변수가 필요합니다.

#### 1. Cartesian coordinates

가장 일반적인 방법은 카르테시안 좌표를 사용하는 것입니다. 다음과 같이 매개변수화됩니다.

$$
\chi_P^c=\begin{pmatrix} x \\ y \\ z\end{pmatrix}
$$

이는 단순히 위치 벡터가 $\mathcal{A}r=xe_x^{\mathcal{A}}+ye_y^{\mathcal{A}}+ze_z^{\mathcal{A}}$와 같이 주어지는 것을 의미합니다.

#### 2. Cylindrical coordinates

다음으로는 원통 좌표를 사용합니다.

$$
\chi_P^z=\begin{pmatrix} \rho \\ \theta \\ z \end{pmatrix}
$$

이는 위치 벡터가 $\mathcal{A}r=\begin{pmatrix} \rho cos\theta \\ \rho sin\theta \\ z \end{pmatrix}$와 같이 주어짐을 의미합니다.

#### 3. Spherical coordinates

세번째 방법으로는 구면 좌표를 사용하는 것입니다.

$$
\chi_P^s=\begin{pmatrix} r \\ \theta \\ \varphi \end{pmatrix}
$$

이는 위치 벡터가 $\mathcal{A}r=\begin{pmatrix} r cos \theta sin \varphi \\ r sin \theta sin \varphi \\ r cos \varphi \end{pmatrix}$와 같이 주어짐을 의미합니다.

---

### Linear velocity

점 $B$의 점 $A$에 대한 속도는 $\dot{r}_{AB}$로 주어집니다.

속도와 표현 $\dot{\chi}_P$의 미분 사이에는 linear mapping $E_P(\chi)$가 존재합니다. 따라서 $\dot{r}=E_P(\chi_P)\dot{\chi}_P$와 같이 나타내며 역함수를 사용하면 $\dot{\chi}_P=E_P^{-1}(\chi_P)\dot{r}$로 표현이 가능해집니다.

카르테시안 좌표에서는 다음과 같이 항등행렬이 됩니다.

$$
E_P^c(\chi_P^c)=E_P^{-1,c}(\chi_P^c)=I
$$

원통 좌표에서는 $\dot{r}(\chi_P^z)=\begin{pmatrix} \dot{\rho} cos \theta - \rho \dot{\theta} sin \theta \\ \dot{\rho} sin \theta - \rho \dot{\theta} cos \theta \\ \dot{z}\end{pmatrix}$와 같습니다. 따라서 역함수 관계에 의해서 $\dot{\chi}_P^z=\begin{pmatrix} \dot{\rho} \\ \dot{\theta} \\ \dot{z} \end{pmatrix}=\begin{bmatrix} cos \theta & sin \theta & 0 \\ -sin \theta / \rho & cos \theta / \rho & 0 \\ 0 & 0 & 1\end{bmatrix}_{E_{P_z}^{-1}} \begin{pmatrix} \dot{x} \\ \dot{y} \\ \dot{z}\end{pmatrix}$로 정의할 수 있습니다.

마지막으로 구형 좌표에서는 $E_P^s=\begin{bmatrix} cos \theta sin \varphi & -rsin \varphi sin \theta & r cos \varphi cos \theta \\ sin \varphi / sin \theta & rcos \theta sin \varphi & rcos \varphi sin \theta \\ cos \varphi & 0 & -r sin \varphi\end{bmatrix}$와 같은 결과가 나옵니다.

---

### 참고 자료

[원본 경로 #1](https://ethz.ch/content/dam/ethz/special-interest/mavt/robotics-n-intelligent-systems/rsl-dam/documents/RobotDynamics2017/RD_HS2017script.pdf)




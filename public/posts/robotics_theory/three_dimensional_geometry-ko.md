---
title: 'Three Dimensional Geomeetry'
date: '2024-10-09'
tags: ['Robotics', 'lecture']
---

### Vectors and Reference Frames

차량(로봇, 위성, 항공기 등)은 일반적으로 병진(translation)과 회전(rotation)의 자유도를 가지며, 총 6자유도(Degrees of Freedom, DOF)를 가집니다. 이 기하학적 구성을 포즈(Pose: 위치와 자세)라고 합니다.

#### Reference Frames

물체의 한 지점의 위치는 세 가지 성분으로 구성된 벡터 $\vec{r}$로 설명될 수 있습니다. 회전 운동은 물체에 부착된 기준 좌표계 $\vec{F}_v$의 자세를 다른 기준 좌표계 $\vec{F}_i$에 대해 표현함으로써 설명됩니다.

벡터 $\vec{r}$는 기준 좌표계 $\vec{F}_1$의 기저 벡터($\vec{1}_1, \vec{1}_2, \vec{1}_3$)와 좌표 $\mathbf{r}_1$의 선형 결합으로 표현됩니다.

$$
\vec{r} = r_1 \vec{1}_1 + r_2 \vec{1}_2 + r_3 \vec{1}_3 = \mathbf{r}_1^T \vec{F}_1
$$

$\vec{F}_1$은 Vectrix로 기저 벡터(단위 길이, 직교, 오른손 법칙을 따르는)를 포함하는 열 행렬입니다.

$$
\vec{F}_1 = \begin{bmatrix} \vec{1}_1 \\ \vec{1}_2 \\ \vec{1}_3 \end{bmatrix}
$$

#### Dot Product

동일한 기준 좌표계 $\vec{F}_1$에서 표현된 두 벡터 $\vec{r}$과 $\vec{s}$의 내적은 다음과 같이 간단하게 행렬 곱으로 표현됩니다.

$$
\vec{r} \cdot \vec{s} = \mathbf{r}_1^T \mathbf{I} \mathbf{s}_1 = \mathbf{r}_1^T \mathbf{s}_1 = r_1 s_1 + r_2 s_2 + r_3 s_3
$$

#### Cross Product

동일한 기준 좌표계에서 표현된 두 벡터 $\vec{r}$과 $\vec{s}$의 외적은 $\vec{F}_1$ 좌표계에서 좌표의 행렬 곱으로 표현될 수 있습니다.

$$
\vec{r} \times \vec{s} = \vec{F}_1^T (\mathbf{r}_1^\times \mathbf{s}_1)
$$

여기서 $\mathbf{r}_1^\times$는 외적을 구성하는 데 사용되는 3x3 반대칭 행렬(Skew-Symmetric Matrix)입니다.

$$
\mathbf{r}_1^\times = \begin{bmatrix} 0 & -r_3 & r_2 \\ r_3 & 0 & -r_1 \\ -r_2 & r_1 & 0 \end{bmatrix}
$$

---

### Rotations

#### Rotation Matrices

공통 원점을 갖는 두 좌표계 $\vec{F}_1$과 $\vec{F}_2$를 고려하고, 벡터 $\vec{r}$을 각 좌표계에서 $\vec{r} = \vec{F}_1^T \mathbf{r}_1 = \vec{F}_2^T \mathbf{r}_2$ 로 표현합니다. $\vec{F}_1$의 좌표 $\mathbf{r}_1$과 $\vec{F}_2$의 좌표 $\mathbf{r}_2$ 사이의 관계는 회전 행렬 $C_{21}$을 사용하여 찾을 수 있습니다.

$$
\mathbf{r}_2 = C_{21} \mathbf{r}_1
$$

$$
C_{21} = \vec{F}_2 \cdot \vec{F}_1^T = \begin{bmatrix} \vec{2}_1 \cdot \vec{1}_1 & \vec{2}_1 \cdot \vec{1}_2 & \vec{2}_1 \cdot \vec{1}_3 \\ \vec{2}_2 \cdot \vec{1}_1 & \vec{2}_2 \cdot \vec{1}_2 & \vec{2}_2 \cdot \vec{1}_3 \\ \vec{2}_3 \cdot \vec{1}_1 & \vec{2}_3 \cdot \vec{1}_2 & \vec{2}_3 \cdot \vec{1}_3 \end{bmatrix}
$$

$C_{21}$은 좌표계 1에서 좌표계 2로의 방향 코사인 행렬(Direction Cosine Matrix)이라고도 불립니다. 회전 행렬은 정규 직교 행렬(Orthonormal Matrix)입니다. 그리고 세 좌표계 $\vec{F}_1, \vec{F}_2, \vec{F}_3$가 있을 때, 회전은 순차적으로 합성됩니다.

#### Principal Rotations

하나의 기저 벡터 축을 중심으로 한 회전을 주 회전이라고 합니다. 예를 들어 3축 회전은 3축을 중심으로 $\theta_3$만큼 회전합니다.

$$
C_3 = \begin{bmatrix} \cos \theta_3 & \sin \theta_3 & 0 \\ - \sin \theta_3 & \cos \theta_3 & 0 \\ 0 & 0 & 1 \end{bmatrix}
$$

회전 행렬은 9개의 매개변수를 사용하며, 이는 독립적이지 않습니다. 회전에는 본질적으로 3개의 자유도만이 존재합니다. 매개변수가 3개보다 많으면, 자유도를 3개로 제한하기 위한 제약 조건(constraints)이 필요합니다 (예: 쿼터니언, 회전 행렬).

#### Euler Angles

오일러 각은 세 개의 주 회전을 순차적으로 사용하여 자세를 지정하는 방법입니다.

3-1-3 순서는 고전적인 각도로 원래 3축에 대한 $\psi$ (세차각, Precession), 중간 1축에 대한 $\gamma$ (장동각, Nutation), 변환된 3축에 대한 $\theta$ (스핀 각, Spin)을 사용해서 $C_{21}(\theta, \gamma, \psi) = C_3(\theta) C_1(\gamma) C_3(\psi)$로 표현합니다.

1-2-3 순서는 원래 1축에 대한 $\theta_1$ (롤, Roll), 중간 2축에 대한 $\theta_2$ (피치, Pitch), 변환된 3축에 대한 $\theta_3$ (요, Yaw)를 사용하여 $C_{21}(\theta_3, \theta_2, \theta_1) = C_3(\theta_3) C_2(\theta_2) C_1(\theta_1)$로 표현합니다.

Infinitesimal Rotations에서는 오일러 각 $\theta_1, \theta_2, \theta_3$이 매우 작을 때 ($\sin \theta \approx \theta, \cos \theta \approx 1$) 회전 행렬은 순서에 관계없이 다음과 같이 근사됩니다.

$$
C_{21} \approx \begin{bmatrix} 1 & \theta_3 & -\theta_2 \\ -\theta_3 & 1 & \theta_1 \\ \theta_2 & -\theta_1 & 1 \end{bmatrix} \approx \mathbf{I} - \boldsymbol{\theta}^\times
$$

여기서 $\boldsymbol{\theta} = [\theta_1, \theta_2, \theta_3]^T$를 회전 벡터(rotation vector)라고 합니다.

#### Rotational Kinematics

좌표계 $\vec{F}_2$가 $\vec{F}_1$에 대해 회전할 때, $\vec{F}_1$에 대한 $\vec{F}_2$의 각속도는 $\vec{\omega}{21}$로 표시됩니다. $\vec{F}_2$에 대한 $\vec{F}_1$의 각속도는 $\vec{\omega}{12} = - \vec{\omega}_{21}$입니다.

$\vec{F}_1$에서 본 벡터 시간 미분을 $(\cdot)^\bullet$로, $\vec{F}_2$에서 본 시간 미분을 $(\cdot)^\circ$로 나타냅니다. $\vec{F}_2$의 기저 벡터의 $\vec{F}_1$에서 본 시간 미분은 다음과 같습니다.

$$
\vec{F}_2^T{}^\bullet = \vec{\omega}_{21} \times \vec{F}_2^T
$$

임의의 벡터 $\vec{r}$의 $\vec{F}_1$에서 본 시간 미분 $\vec{r}^\bullet$과 $\vec{F}_2$에서 본 시간 미분 $\vec{r}^\circ$ 사이의 관계는 다음과 같습니다.

$$
\vec{r}^\bullet = \vec{r}^\circ + \vec{\omega}_{21} \times \vec{r}
$$

가속도에 대해서는 

$$
\vec{r}^{\bullet\bullet} = \vec{r}^{\circ\circ} + 2 \vec{\omega}_{21} \times \vec{r}^\circ + \vec{\omega}_{21}^\circ \times \vec{r} + \vec{\omega}_{21} \times (\vec{\omega}_{21} \times \vec{r})
$$

위와 같으며 $2 \vec{\omega}_{21} \times \vec{r}^\circ$는 코리올리 가속도, $\vec{\omega}_{21}^\circ \times \vec{r}$는 각가속도, $\vec{\omega}_{21} \times (\vec{\omega}_{21} \times \vec{r})$는 구심 가속도입니다.

#### Perturbing Rotations

회전은 벡터 공간에 존재하지 않고 비가환군(non-commutative group) SO(3)를 형성합니다. 따라서 회전을 포함하는 운동 및 관측 모델을 선형화할 때 주의해야 합니다. 오일러의 회전 정리를 사용하여 회전 행렬 $C$의 회전 각 $\phi$에 대한 편미분을 구하면

$$
\frac{\partial C}{\partial \phi} \equiv - \mathbf{a}^\times C
$$

이와 같으며 여기서 $\mathbf{a}$는 회전축입니다. 임의의 상수 벡터 $\mathbf{v}$를 가진 회전 행렬 $C(\boldsymbol{\theta})$의 오일러 각 $\boldsymbol{\theta}$에 대한 편미분은 다음과 같습니다.

$$
\frac{\partial (C(\boldsymbol{\theta})\mathbf{v})}{\partial \boldsymbol{\theta}} \equiv \left(C(\boldsymbol{\theta})\mathbf{v}\right)^\times S(\theta_2, \theta_3)
$$

회전과 관련된 함수를 선형화하는 것은 까다롭지만, 오일러 각은 정확히 세 개의 매개변수를 가지므로 독립적으로 섭동될 수 있습니다. 공칭 값 $\bar{\boldsymbol{\theta}}$에서 작은 양 $\delta \boldsymbol{\theta}$만큼 섭동된 오일러 각을 사용하여 $C(\boldsymbol{\theta})\mathbf{v}$를 1차 테일러 급수로 근사하면 

$$
C(\bar{\boldsymbol{\theta}} + \delta \boldsymbol{\theta}) \approx \left( \mathbf{I} - \delta \boldsymbol{\phi}^\times \right) C(\bar{\boldsymbol{\theta}})
$$

다음과 같이 표현됩니다.

---

### Poses

포즈(Pose)는 물체의 병진(translation)과 회전(rotation)을 함께 나타냅니다. 정지 좌표계 $\vec{F}_i$에서 표현된 점 $P$의 위치 $\mathbf{r}^i_{pi}$는 차량 좌표계 $\vec{F}_v$에서의 좌표 $\mathbf{r}^v_{pv}$와 두 좌표계 사이의 변위 $\mathbf{r}^i_{vi}$ 및 회전 $C_{iv}$를 사용하여 다음과 같이 관련됩니다.

$$
\mathbf{r}^i_{pi} = C_{iv} \mathbf{r}^v_{pv} + \mathbf{r}^i_{vi}
$$

#### Transformation Matrices

위 식에 4x4 변환 행렬 $T_{iv}$를 사용하여 편리하게 표현할 수 있습니다.

$$
\begin{bmatrix} \mathbf{r}^i_{pi} \\ 1 \end{bmatrix} = \begin{bmatrix} C_{iv} & \mathbf{r}^i_{vi} \\ \mathbf{0}^T & 1 \end{bmatrix} \begin{bmatrix} \mathbf{r}^v_{pv} \\ 1 \end{bmatrix}
$$

좌표를 반대로 변환하기 위해 변환 행렬의 역행렬은 다음과 같습니다.

$$
T_{iv}^{-1} = \begin{bmatrix} C_{vi} & \mathbf{r}^v_{iv} \\ \mathbf{0}^T & 1 \end{bmatrix} = T_{vi}
$$

---

### Sensor Models

원근 카메라(Perspective camera)는 저렴하지만 차량의 움직임과 세계의 모양을 추론하는 데 사용될 수 있는 가장 중요한 센서 중 하나입니다. 점 $P$의 센서 좌표가 $\boldsymbol{\rho} = \mathbf{r}^s_{ps} = [x, y, z]^T$ 일 때 이미지 평면에서의 관측 $O$의 좌표는 다음과 같습니다.

$$
\begin{aligned}
&x_n = x/z, \\
&y_n = y/z
\end{aligned}
$$

한 점 $P$가 두 카메라 자세 $a$와 $b$에서 관측되었을 때, 두 정규화 이미지 좌표 $\mathbf{p}_a$와 $\mathbf{p}_b$는 다음 제약 조건을 통해 서로 관련됩니다.

$$
\mathbf{p}_a^T E_{ab} \mathbf{p}_b = 0
$$

여기서 $E_{ab}$는 에센셜 행렬(Essential matrix)이라고 불립니다.

관측하는 점이 알려진 평면 위에 놓여 있다고 가정하면, 두 카메라 관측은 호모그래피 행렬 $H_{ba}$를 통해 관련될 수 있습니다.

$$
\mathbf{q}_b = K_b H_{ba} K_a^{-1} \mathbf{q}_a
$$

---

### 참고 자료

[원본 경로 #1](https://mingkangxiong.github.io/assets/books/State_Estimation_for_Robotic_2018.pdf?utm_source=chatgpt.com)




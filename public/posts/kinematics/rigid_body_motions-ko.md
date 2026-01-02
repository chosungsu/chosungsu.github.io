---
title: 'Rigid Body Motions'
date: '2024-02-05'
tags: ['Robotics', 'Kinematics', 'lecture']
---

### Rigid-Body Motions in the Plane

<img src="https://velog.velcdn.com/images/devjo/post/7b229f56-5110-4687-ba0d-3ff4c942a0d2/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

평면 물체(회색 모양)를 보면 움직임은 평면에 국한되어 있습니다. 그림과 같이 길이 척도와 고정된 참조 좌표계 $\{s\}$가 단위 축 $\hat{x}_s$와 $\hat{y}_s$와 함께 선택되었다고 가정합니다. 그리고 단위 축 $\hat{x}_b$와 $\hat{y}_b$를 가진 참조 좌표계를 평면 물체에 부착하면 이 좌표계는 물체와 함께 움직이기 때문에 body frame이라고 하고 $\{b\}$로 표기됩니다.

평면 물체의 구성을 설명하기 위해서는 고정된 좌표계에 대한 몸체 좌표계의 위치와 자세만 지정하면 됩니다.

$$
p = p_x \hat{x}_s + p_y \hat{y}_s
$$

또 다른 방법은 $\{s\}$에 대한 $\{b\}$의 단위 축 $\hat{x}_b$와 $\hat{y}_b$의 방향을 다음과 같은 형태로 지정하는 것입니다.

$$
\begin{aligned}
&\hat{x}_b = \cos \theta \hat{x}_s + \sin \theta \hat{y}_s \\ 
&\hat{y}_b = -\sin \theta \hat{x}_s + \cos \theta \hat{y}_s
\end{aligned}
$$

두 벡터 $\hat{x}_b$와 $\hat{y}_b$는 열 벡터로 작성되어 다음과 같은 $2 \times 2$ 행렬 $P$로 묶일 수 있습니다.

$$
P = [\hat{x}_b \ \hat{y}_b] = \begin{bmatrix} \cos \theta & -\sin \theta \\ \sin \theta & \cos \theta \end{bmatrix}
$$

행렬 $P$는 회전 행렬의 예이며 네 개의 숫자로 구성되지만, 세 개의 제약 조건으로 $P$의 각 열은 단위 벡터이고 두 열은 서로 직교해야 하고 남아 있는 하나의 자유도는 $\theta$로 매개변수화되어야 합니다.

---

### Rotations and Angular Velocities

#### Rotation Matrices

$$
R = \begin{bmatrix} \hat{x}_b & \hat{y}_b & \hat{z}_b\end{bmatrix} = \begin{bmatrix} r_{11} & r_{12} & r_{13} \\ r_{21} & r_{22} & r_{23} \\ r_{31} & r_{32} & r_{33}\end{bmatrix}
$$

이 $R$의 여섯 가지 제약조건을 다음과 같이 표현합니다.

단위 노름 조건으로 

$$
\begin{aligned} r_{11}^2 + r_{21}^2 + r_{31}^2 &= 1, \\ r_{12}^2 + r_{22}^2 + r_{32}^2 &= 1, \\ r_{13}^2 + r_{23}^2 + r_{33}^2 &= 1. \end{aligned}
$$

이를 만족하며 직교성 조건에 의하여 

$$
\begin{aligned} r_{11}r_{12} + r_{21}r_{22} + r_{31}r_{32} &= 0, \\ r_{12}r_{13} + r_{22}r_{23} + r_{32}r_{33} &= 0, \\ r_{11}r_{13} + r_{21}r_{23} + r_{31}r_{33} &= 0. \end{aligned}
$$

이 역시 만족합니다. 이 여섯 가지 제약 조건은 행렬 $R$에 대한 단일 제약 조건 집합 $R^T R = I$으로 더 간결하게 표현될 수 있습니다.

회전 행렬의 집합 $\text{SO}(2)$와 $\text{SO}(3)$는 수학적 군(group)에 필요한 속성을 만족하기 때문에 군이라고 불립니다. 회전 행렬 $R \in \text{SO}(3)$의 역행렬은 또한 회전 행렬이며 $R$의 전치와 같습니다. 즉, $R^{-1} = R^T$입니다. 회전 행렬의 곱셈은 결합이 가능하지만 교환은 불가합니다.

#### Angular Velocities

<img src="https://velog.velcdn.com/images/devjo/post/1321a64c-2205-4968-b791-da22dcdc1734/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

단위 축 $\{\hat{x}, \hat{y}, \hat{z}\}$를 가진 좌표계가 회전하는 물체에 부착되어 있다고 가정합니다. $t$와 $t + \Delta t$ 시점에서 몸체 좌표계를 검토하면, 좌표계 자세의 변화는 원점을 통과하는 어떤 단위 축 $\hat{w}$를 중심으로 $\Delta \theta$ 각도의 회전으로 설명될 수 있습니다. $\hat{w}$ 축과 $\dot{\theta} = \Delta \theta / \Delta t$를 결합하여 각속도(angular velocity) $w$를 다음과 같이 정의할 수 있습니다.

$$
w = \hat{w} \dot{\theta}
$$

방정식을 좌표로 표현하기 위해 $w$를 표현할 참조 좌표계를 선택해야 합니다. $R(t)$를 시간 $t$에서 고정된 좌표계에 대한 몸체 좌표계의 자세를 설명하는 회전 행렬이라고 하고, $\dot{R}(t)$를 그것의 시간 변화율이라고 합시다. $t$라는 특정 시점에서, $\omega_s \in \mathbb{R}^3$를 고정된 좌표계 좌표로 표현된 각속도 $w$라고 합시다.

$$
\dot{R} = [\omega_s \times r_1 \quad \omega_s \times r_2 \quad \omega_s \times r_3] = \omega_s \times R
$$

$[\omega_s]$는 $3 \times 3$ 반대칭 행렬(skew-symmetric matrix) 표현입니다. 지수 좌표는 회전 축과 그 축을 중심으로 한 회전 각도 $\theta$로 회전 행렬을 매개변수화합니다. 선형 미분 방정식 $\dot{x}(t) = a x(t)$는 $x(t) = e^{at} x_0$의 해를 가집니다. 여기서 행렬 지수(matrix exponential) $e^{At}$는 다음과 같이 정의됩니다.

$$
e^{At} = I + At + \frac{(At)^2}{2!} + \frac{(At)^3}{3!} + \cdots
$$

이제 3차원 벡터 $p(0)$가 $\hat{\omega}$를 중심으로 $\theta$만큼 회전하여 $p(\theta)$가 되었다고 가정합니다. 벡터의 속도 $\dot{p}$는 다음과 같이 주어집니다.

$$
\dot{p} = \hat{\omega} \times p
$$

미분 방정식 $\dot{p} = [\hat{\omega}] p$의 해는 다음과 같습니다.

$$
p(t) = e^{[\hat{\omega}] t} p(0) \Longleftrightarrow p(\theta) = e^{[\hat{\omega}] \theta} p(0)
$$

---

### Rigid-Body Motions and Twists

#### Homogeneous Transformation Matrices

$R \in \text{SO}(3)$를 사용하여 고정된 좌표계 $\{s\}$에 대한 몸체 좌표계 $\{b\}$의 자세와 원점을 나타냅니다. $\mathbb{R}^3$에서의 강체 운동 군 또는 동차 변환 행렬은 다음과 같은 형태의 모든 $4 \times 4$ 실수 행렬 $T$의 집합입니다.

$$
T = \begin{pmatrix} R & p \\ 0 & 1 \end{pmatrix} = \begin{bmatrix} r_{11} & r_{12} & r_{13} & p_1 \\ r_{21} & r_{22} & r_{23} & p_2 \\ r_{31} & r_{32} & r_{33} & p_3 \\ 0 & 0 & 0 & 1 \end{bmatrix}
$$

회전 행렬의 경우와 마찬가지로, 변환 행렬 $T$에는 세 가지 주요 용도가 있습니다. 강체의 구성을 나타내기 위해, 벡터 또는 좌표계가 표현되는 참조 좌표계를 변경하기 위해, 벡터 또는 좌표계를 변위시키기 위해 사용됩니다.

#### Twists

이제 움직이는 좌표계의 선속도(linear velocity)와 각속도(angular velocity)를 모두 고려합니다. $T_{sb}(t) = T(t)$를 $\{s\}$에서 본 $\{b\}$의 구성이라고 합니다.

$$
T(t) = \begin{pmatrix} R(t) & p(t) \\ 0 & 1 \end{pmatrix}
$$

$T^{-1}$를 $\dot{T}$에 선행 곱셈하면 다음과 같습니다.

$$
T^{-1} \dot{T} = \begin{pmatrix} R^T & -R^T p \\ 0 & 1 \end{pmatrix} \begin{pmatrix} \dot{R} & \dot{p} \\ 0 & 0 \end{pmatrix} = \begin{pmatrix} R^T \dot{R} & R^T \dot{p} \\ 0 & 0 \end{pmatrix} = \begin{pmatrix} [\omega_b] & v_b \\ 0 & 0 \end{pmatrix}
$$

$R^T \dot{R} = [\omega_b]$는 $\{b\}$ 좌표로 표현된 각속도의 반대칭 행렬 표현입니다. 또한, $\dot{p}$는 고정된 좌표계 $\{s\}$로 표현된 $\{b\}$ 원점의 선속도이며, $R^T \dot{p} = v_b$는 $\{b\}$ 좌표계로 표현된 이 선속도입니다. 몸체 트위스트(Body Twist) $V_b$는 다음과 같이 $\omega_b$와 $v_b$를 결합한 6차원 속도 벡터로 정의됩니다.

$$
V_b = \begin{pmatrix} \omega_b \\ v_b \end{pmatrix} \in \mathbb{R}^6
$$

#### Wrenches

강체에 점 $r$에서 작용하는 선형 힘 $f$를 생각해 봅시다. 참조 좌표계 $\{a\}$를 정의하면, 이 힘은 $\{a\}$ 좌표계에서 토크 또는 모멘트 $m_a = r_a \times f_a$를 생성합니다. 트위스트와 마찬가지로, 모멘트와 힘을 단일 6차원 공간 힘, 즉 $\{a\}$ 좌표계로 표현된 렌치(Wrench) $F_a$로 병합할 수 있습니다.

$$
F_a = \begin{pmatrix} m_a \\ f_a \end{pmatrix} \in \mathbb{R}^6
$$

힘-속도 쌍에 의해 생성된 일률(Power)은 좌표계와 무관하게 동일해야 한다는 사실을 사용하여, 렌치 $F_a$와 $F_b$ 사이의 관계를 유도할 수 있습니다. 일률 $P = V^T F$는 좌표계에 무관하므로

$$
V_b^T F_b = V_a^T F_a
$$

위를 만족합니다.

---

### 참고 자료

[원본 경로 #1](https://hades.mech.northwestern.edu/images/7/7f/MR.pdf)


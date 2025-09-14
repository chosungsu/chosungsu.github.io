---
title: 'Rotation and angular velocity'
date: '2024-10-09'
tags: ['robotics', 'mathematics', 'lecture']
---

### Rotation

점의 형태는 위치만으로 완전히 설명되지만, 물체는 자세(pose)를 정의하기 위해 추가적으로 회전(rotation)을 필요로 합니다. 회전의 이론적 추상화로서 $\phi_{AB} \in SO(3)$은 기준 틀 $\mathcal{A}$에 대한 물체 고정 틀 $B$의 방향을 나타내기 위해 사용됩니다. 이에 따라 각도 위치와 같은 수치적 등가물이 없지만 매개변수화는 가능합니다.

#### 1. Rotation matrices

<img src="https://velog.velcdn.com/images/devjo/post/947eceec-b8a2-4286-a6c0-b97104bc7199/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

이 틀에 고정된 점 $P$의 위치 벡터는 아래와 같습니다.

$$
_\mathcal{A} r_{AB}=\begin{pmatrix} \mathcal{A}r_{AP_x} \\ \mathcal{A}r_{AP_y} \\ \mathcal{A}r_{AP_z}\end{pmatrix}
$$

이제 $A$에 대해 회전된 기준 틀 $B$에 대해 고려해보면 틀 $B$의 원점 $A$는 틀 $A$의 원점과 동일하며 틀 $B$에서 표현된 점 $P$의 위치 벡터는 다음과 같습니다.

$$
_\mathcal{B} r_{AP}=\begin{pmatrix} \mathcal{B}r_{BP_x} \\ \mathcal{B}r_{BP_y} \\ \mathcal{B}r_{BP_z}\end{pmatrix}
$$

$B$의 단위 벡터들을 틀 $A$로 표현하면 $_\mathcal{A}e_x^{\mathcal{B}}, _\mathcal{A}e_y^{\mathcal{B}}, _\mathcal{A}e_z^{\mathcal{B}}$이며 두 위치 벡터 $_\mathcal{A}r_P, _\mathcal{A}r_P$사이의 사상은 아래와 같이 작성할 수 있습니다.

$$
_\mathcal{A}r_P=_\mathcal{A}e_x^{\mathcal{B}} \cdot _\mathcal{B}r_{P_x} + _\mathcal{A}e_y^{\mathcal{B}} \cdot _\mathcal{B}r_{P_y} + _\mathcal{A}e_z^{\mathcal{B}} \cdot _\mathcal{B}r_{P_z} \\
= C_{\mathcal{A}\mathcal{B}} \cdot _\mathcal{B} r_{AP}
$$

여기서 $C_{\mathcal{A}\mathcal{B}}$항은 회전행렬이라고 불리는 $3 \times 3$ 행렬이고 각 열벡터는 직교하는 단위벡터이므로 orthogonal하다고 할 수 있습니다.

#### 2. Active and Passive

회전은 두 가지 해석이 있으며 active, passive가 있습니다.

우선 passive rotation은 좌표계 간의 사상으로 $_\mathcal{A}u=C_{\mathcal{A}\mathcal{B}} \cdot _\mathcal{B}u$와 같이 수동 회전 $C_{\mathcal{A}\mathcal{B}}는 동일한 물체 $u$를 툴 $B$에서 툴 $A$로 사상시키는 것입니다.

다음으로 $3 \times 3$ 행렬 $R$로 표시되는 연산자로 동일한 기준 틀 $A$ 내에서 벡터 $_\mathcal{A}u$를 벡터 $_\mathcal{v}$로 회전하는 것을 active rotation이라고 합니다.

#### 3. Elementary rotation

기본 회전에서는 기저 벡터 $e_x^{\mathcal{A}}, e_y^{\mathcal{A}}, e_z^{\mathcal{A}}$ 중 하나를 중심으로 회전을 하는 것으로 아래와 같이 진행됩니다.

$$
C_x(\phi)=\begin{bmatrix} 1 & 0 & 0 \\ 0 & cos \phi & -sin \phi \\ 0 & sin \phi & cos \phi\end{bmatrix}, \\
C_y(\phi)=\begin{bmatrix} cos \phi & 0 & sin \phi \\ 0 & 1 & 0 \\ -sin \phi & 0 & cos \phi\end{bmatrix}, \\
C_z(\phi)=\begin{bmatrix} cos \phi & -sin \phi & 0 \\ sin \phi & cos \phi & 0 \\ 0 & 0 & 1\end{bmatrix}
$$

#### 4. Composition of rotation

세 개의 기준 틀$(\mathcal{A}, \mathcal{B}, \mathcal{C})$가 있을 때 벡터 $u$의 좌표는 $B \rightarrow A$로 $_\mathcal{A}u=C_{\mathcal{A}\mathcal{B}} \cdot _\mathcal{B}u$와 같이 사상될 수 있습니다.

또한 $C \rightarrow B$는 $_\mathcal{B}u=C_{\mathcal{B}\mathcal{C}} \cdot _\mathcal{C}u$와 같이 사상될 수 있습니다.

따라서 두 방정식을 결합하면 $_\mathcal{A}u=C_{\mathcal{A}\mathcal{B}} \cdot (C_{\mathcal{B}\mathcal{C}} \cdot _\mathcal{C}u)=C_{\mathcal{A}\mathcal{C}} \cdot _\mathcal{C}u$와 같이 사상될 수 있습니다.

#### 5. Representation of rotation

$3 \times 3$ 행렬이라면 9개의 매개변수를 사용하는데 이 매개변수들이 독립적이지 않고 직교 조건에 의해 제약됩니다. 따라서 공간에서의 회전의 최소 표현은 오일러 각(euler angles)와 같은 세 개의 독립적인 매개변수만 필요합니다. 다른 비최소 표현에는 angle axis, unit quaternion이 있습니다.

euler angles에서는 모든 방향의 회전을 설명할 수 있기 위해서 두 개의 연속적인 회전은 평행한 축을 중심으로 이루어 지지 않아야 합니다. 첫번째와 세번째 회전이 동일한 축을 중심으로 한다면 proper euler angles, 세 각이 모두 다르면 tait bryan, cardan이라고 합니다.

$ZYZ$ 오일러 각은 고유 오일러 각도로 많이 알려져 있는데 회전 각도는 $\chi_{R,eulerZXZ}=\begin{pmatrix} z_1 \\ x \\ z_2\end{pmatrix}$와 같이 매개변수 벡터로 모을 수 있습니다. 결과 회전 행렬은 위의 회전결합 공식에 의해 $C_{\mathcal{A}\mathcal{D}} {_\mathcal{D}}r$와 같이 주어집니다. 이 때 각은 $\begin{pmatrix} atan2(c_{13}, -c_{23}) \\ atan2(\sqrt{c^2_{13}+c^2_{23}}, c_{33}) \\ atan2(c_{31}, c_{32})\end{pmatrix}$가 됩니다.

$ZYX$ 오일러 각은 tait bryan 각도로 알려져 있으며 회전 각도는 $\chi_{R,eulerZYX}=\begin{pmatrix} z \\ y \\ x\end{pmatrix}$와 같이 매개변수 벡터로 모을 수 있습니다. 이 때 각은 $\begin{pmatrix} atan2(c_{21}, c_{11}) \\ atan2(-c_{31}, \sqrt{c^2_{32}+c^2_{33}}) \\ atan2(c_{32}, c_{33})\end{pmatrix}$가 됩니다.

$XYZ$ 오일러 각은 cardan 각도로 알려져 있으며 회전 각도는 $\chi_{R,eulerXYZ}=\begin{pmatrix} x \\ y \\ z\end{pmatrix}$와 같이 매개변수 벡터로 모을 수 있습니다. 이 때 각은 $\begin{pmatrix} atan2(-c_{23}, c_{33}) \\ atan2(c_{13}, \sqrt{c^2_{11}+c^2_{12}}) \\ atan2(-c_{12}, c_{11})\end{pmatrix}$가 됩니다.

angle axis는 각도 $\theta$와 축 $n$에 의해 정의되는 비최소 구현으로 벡터 $n \in R^3$은 회전이 이루어지는 방향을 정의하고 스칼라 $\theta \in R$는 회전 크기를 정의합니다. 이 표현은 네 개의 매개변수와 단위 길이 제약 조건인 $|n| = 1$을 가집니다. $\phi = \theta \cdot n \in R^3$을 만족하는 것을 회전 벡터 또는 오일러 벡터라고 정의할 수 있습니다. 각 매개변수는 다음과 같이 구해질 수 있습니다.

$$
\theta=cos^{-1}(\frac{c_{11}+c_{22}+c_{33}-1}{2}), \\
n=\frac{1}{2sin(\theta)}\begin{pmatrix} c_{32}-c_{23} \\ c_{13}-c_{31} \\ c_{21}-c_{12}\end{pmatrix}
$$

즉 위 수식에서 문제가 발생할 때는 $\theta=0$, $\theta=\pi$일 때 $sin(\theta)=0$이 되는 경우로 전자는 어떤 방향이든 가질 수 있으며 후자는 두개의 반대 방향을 가질 수 있습니다.

---

### Angular velocity

고정된 틀 $A$에 대해 움직이는 틀 $B$를 고려해보면 이 회전 운동을 각속도(angular velocity) $_\mathcal{A}\omega_{AB}$는 다음과 같은 극한으로 정의됩니다.

$$
_\mathcal{A}\omega_{\mathcal{A}\mathcal{B}} = \lim_{\epsilon \rightarrow 0} \frac{_\mathcal{A}\phi_{\mathcal{B}(t)\mathcal{B}(t+\epsilon)}}{\epsilon}
$$

각속도 벡터 $_\mathcal{A}\omega_{AB}$는 시간에 따라 변하는 회전 행렬 $C_{\mathcal{A}\mathcal{B}}(t)$ 사이에 $[_\mathcal{A}\omega_{AB}]_X=\dot{C}_{\mathcal{A}\mathcal{B}} \cdot C^T_{\mathcal{A}\mathcal{B}}$로 정의됩니다. 그리고 $[_\mathcal{A}\omega_{AB}]_X$는 대칭 행렬로 $\begin{bmatrix} 0 & -w_z & w_y \\ w_z & 0 & -w_x \\ -w_y & w_x & 0\end{bmatrix}$입니다.

교차곱 행렬과 연속성도 보장되는데 따라서 $[_\mathcal{B}\omega_{AB}]_X=C_{\mathcal{B}\mathcal{A}} \cdot [_\mathcal{A}\omega_{AB}]_X \cdot C_{\mathcal{A}\mathcal{B}}$, $_\mathcal{D}\omega_{\mathcal{A}\mathcal{C}}=_\mathcal{D}\omega_{\mathcal{A}\mathcal{B}} + _\mathcal{D}\omega_{\mathcal{B}\mathcal{C}}$를 만족합니다.

#### Time derivatives of euler angles : ZYX

$_\mathcal{A}\omega_{\mathcal{A}\mathcal{B}}=E_R(\chi_R) \cdot \dot{\chi}_R$과 같이 회전의 미분은 각속도에 사상될 수 있습니다.

$ZYX$의 euler angles인 $\chi_{R, eulerZYX}=\begin{bmatrix}z & y & x\end{bmatrix}^T$와 그 시간의 미분인 $\dot{\chi}_{R, eulerZYX}=\begin{bmatrix} \dot{z} & \dot{y} & \dot{x}\end{bmatrix}$가 주어졌을 때 $\dot{\chi}$를 $_\mathcal{A}\omega_{\mathcal{A}\mathcal{B}}$에 사상하는 매핑 $E_{R,eulerZYX} = E_R(\chi_{R,eulerZYX}) \in R^{3 \times 3}$을 찾고자 합니다.

기준 틀 $A$에서 시작하면 첫번째 회전은 $_\mathcal{A}e_z^{\mathcal{A}}$을 중심으로 하며 다음과 같습니다.

$$
_\mathcal{A}e_z^{\mathcal{A}}=I_{3 \times 3} \begin{bmatrix} 0 \\ 0 \\ 1\end{bmatrix}=\begin{bmatrix} 0 \\ 0 \\ 1\end{bmatrix}
$$

이후 $y$축 회전을 하면 아래와 같습니다.

$$
_\mathcal{A}e_y^{\mathcal{A'}}=C_{\mathcal{A}\mathcal{A'}}(z) \begin{bmatrix} 0 \\ 1 \\ 0\end{bmatrix}=\begin{bmatrix} cos(z) & -sin(z) & 0\\ sin(z) & cos(z) & 0 \\ 0 & 0 & 1\end{bmatrix} \begin{bmatrix} 0 \\ 1 \\ 0\end{bmatrix}
$$

이제 마지막 $x$출 회전을 하면 아래와 같습니다.

$$
_\mathcal{A}e_x^{\mathcal{A''}}=C_{\mathcal{A}\mathcal{A'}}(z) \cdot C_{\mathcal{A'}\mathcal{A''}}(y) \begin{bmatrix} 1 \\ 0 \\ 0\end{bmatrix} \\
=\begin{bmatrix} cos(z) & -sin(z) & 0\\ sin(z) & cos(z) & 0 \\ 0 & 0 & 1\end{bmatrix} \begin{bmatrix} cos(y) & 0 & sin(y)\\ 0 & 1 & 0 \\ -sin(y) & 0 & cos(y)\end{bmatrix} \begin{bmatrix} 1 \\ 0 \\ 0\end{bmatrix}
$$

이 때의 매핑 $E(\chi_R)$는 다음과 같이 계산될 것입니다.

$$
E_{R, eulerZYX}=\begin{bmatrix} _\mathcal{A}e_z^{\mathcal{A}} & _\mathcal{A}e_y^{\mathcal{A'}} & _\mathcal{A}e_x^{\mathcal{A''}}\end{bmatrix}
$$

$\det(E_{R,eulerZYX}) = -cos(y)$임을 쉽게 알 수 있습니다. 따라서 $y = \pi/2 + k\pi, \forall k \in \mathbb{Z}$일 때 매핑은 특이점(singular)을 갖게 됩니다. 이는 우리가 항상 오일러 각 시간 미분을 사용하여 각속도를 설명할 수 있지만, 그 역은 항상 가능하지 않다는 것을 의미합니다.

---

### 참고 자료

[원본 경로 #1](https://ethz.ch/content/dam/ethz/special-interest/mavt/robotics-n-intelligent-systems/rsl-dam/documents/RobotDynamics2017/RD_HS2017script.pdf)




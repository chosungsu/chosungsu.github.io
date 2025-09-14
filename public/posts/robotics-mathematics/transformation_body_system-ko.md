---
title: 'Transform and Body system'
date: '2024-10-16'
tags: ['robotics', 'mathematics', 'lecture']
---

### Homogeneous Transformation

<img src="https://velog.velcdn.com/images/devjo/post/35caae3e-0cb1-4df8-9826-ea920bdb3be8/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

일반적인 경우 두 개의 기준 틀은 position offset, relative rotation을 가집니다. 결과적으로 점 $P$는 결합된 translation, rotation인 동차 변환 행렬 $T$를 사용하여 한 틀엥서 다른 틀로 변환될 수 있습니다.

$$
r_{\mathcal{A}\mathcal{P}}=r_{\mathcal{A}\mathcal{B}}+r_{\mathcal{B}\mathcal{P}}
$$

$$
_\mathcal{A}r_{\mathcal{A}\mathcal{P}}=_\mathcal{A}r_{\mathcal{A}\mathcal{B}}+_\mathcal{A}r_{\mathcal{B}\mathcal{P}}=_\mathcal{A}r_{\mathcal{A}\mathcal{B}}+C_{\mathcal{A}\mathcal{B}} \cdot _\mathcal{B}r_{\mathcal{B}\mathcal{P}}
$$

이에 따라 위치 벡터는 다음과 같이 계산할 수 있습니다.

$$
\begin{pmatrix} _\mathcal{A}r_{\mathcal{A}{P}} \\ 1\end{pmatrix}
= \begin{bmatrix} C_{\mathcal{A}{B}} & _\mathcal{A}r_{\mathcal{A}{B}} \\ O_{1 \times 3} & 1\end{bmatrix}
\begin{pmatrix} _\mathcal{B}r_{\mathcal{B}{P}} \\ 1\end{pmatrix}
$$

---

### Velocity in moving bodies

툴 $C$에서 위치의 절대 시간 변화는 $_c(\dot{r}_{\mathcal{A}\mathcal{P}})=_c(\frac{d}{dt}r_{\mathcal{A}\mathcal{P}})=_c v_{\mathcal{A}\mathcal{P}}$가 됩니다. 또한 위치 벡터좌표의 시간 미분은 $(_c \dot{r}_{\mathcal{A}\mathcal{P}})=(_c r_{\mathcal{A}\mathcal{P}})^{\cdot}$이므로 이 차이를 이해하는 것이 중요합니다. $C$라는 틀이 관성 틀(inertial frame)인 경우 동일합니다.

$$
_\mathcal{A}r_{\mathcal{A}\mathcal{P}}=_\mathcal{A}r_{\mathcal{A}\mathcal{B}}+_\mathcal{A}r_{\mathcal{B}\mathcal{P}}=_\mathcal{A}r_{\mathcal{A}\mathcal{B}}+C_{\mathcal{A}\mathcal{B}} \cdot _\mathcal{B}r_{\mathcal{B}\mathcal{P}}
$$

위와 같은 $P$의 위치를 시간에 대하여 미분하면 다음과 같습니다.

$$
_\mathcal{A}\dot{r}_{\mathcal{A}\mathcal{P}}=_\mathcal{A}\dot{r}_{\mathcal{A}\mathcal{B}}+C_{\mathcal{A}\mathcal{B}} \cdot _\mathcal{B}\dot{r}_{\mathcal{B}\mathcal{P}}+\dot{C}_{\mathcal{A}\mathcal{B}} \cdot _\mathcal{B}r_{\mathcal{B}\mathcal{P}}
$$

여기서 $P$는 강체(rigid body) $B$ 위의 점이므로 상대 속도 개념인 $_\mathcal{B}\dot{r}_{\mathcal{B}\mathcal{P}}=0$임을 알 수 있고 $\dot{C}{AB} = [_\mathcal{A}\omega{\mathcal{A}\mathcal{B}}]_X \cdot C_{\mathcal{A}\mathcal{B}}$임을 통해서 $_\mathcal{A}\dot{r}_{\mathcal{A}\mathcal{B}}+[_\mathcal{A}\omega{\mathcal{A}\mathcal{B}}]_X \cdot C_{\mathcal{A}\mathcal{B}} \cdot _\mathcal{B}r_{\mathcal{B}\mathcal{P}}$을 표현할 수 있습니다.

강체 속도는 $v_P=v_B+ \Omega \times r_{BP}$로 계산하고 가속도에는 $a_P=a_B+\Psi \times r_{BP} + \Omega \times (\Omega \times r_{BP})$가 됩니다.

---

### Kinematics of Systems of Bodies

<img src="https://velog.velcdn.com/images/devjo/post/19fcbdac-c320-4253-83b9-509cbf32e710/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

대부분의 로봇 시스템은 자유도 1을 가진 $n_j$개의 관절로 연결된 $n_l=n_j+1$ 개의 링크로 구성된 개방형 운동 사슬로 모델링할 수 있습니다. 두 연속된 물체 사이에는 변위 $q_i$를 가진 단일 관절이 있으므로 $T_{B_{i-1} B_i}=T_{B_{i-1} B_i} (q_i)$로 연결합니다.

고정 기저(fixed base)와 부유 기저(floating base) 시스템이 있으며 루트 링크는 지면에 연결되거나 자유롭게 움직입니다.

#### 1. Generalized coordinates and joint configuration

매니퓰레이터와 같은 로봇의 형상(configuration)은 일반화 좌표 벡터로 설명할 수 있습니다.

$$
q=\begin{pmatrix} q_1 \\ \vdots \\ q_n\end{pmatrix}
$$

이 스칼라의 집합에서 $q$의 값이 고정되면 로봇은 더 이상 움직일 수 없게 되며 대부분의 경우 독립적인 좌표를 선택하는데 이는 일반화 좌표의 수가 자유도의 수와 일치함을 의미합니다. 회전 관절(revolute)인 경우 단일 자유도 $q_i$는 관절의 회전 각도에 해당합니다. 병진 관절(prismatic)은 선형변위로 해석됩니다.

$$
q=\begin{pmatrix} \alpha & \beta & \gamma & \zeta\end{pmatrix}^T
$$

따라서 일반화 좌표는 위와 같이 나타냅니다. 이 때 $\zeta$만 선형변위이고 나머지는 전역 수직 축을 중심으로 한 회전 각도입니다.

#### 2. Task space coordinates

로봇 팔의 말단 장치(end effector)의 형상은 기준 틀에 대한 상대적 위치 및 방향으로 설명할 수 있습니다. 기준 틀에 대한 위치 $r_{\epsilon} \in R^3$와 회전 $\phi_e \in SO(3)$는 각각 $\chi_P, \chi_R$로 매개변수화할 수 있습니다. 따라서 결합된 위치 및 방향은 $x_e = \begin{pmatrix} r_e \\ \phi_e\end{pmatrix} \in SE(3)$으로 나타냅니다. 매개변수화가 된다면 $\chi_e=\begin{pmatrix} \chi_P^e \\ \chi_R^e\end{pmatrix}=\begin{pmatrix} \chi_1 \\ \vdots \\ \chi_m\end{pmatrix} \in R^m$이 됩니다. 이 시점에서 회전 $\phi_e$는 방향의 이론적 추상화일 뿐이며 각도 위치와 같은 수치적 등가물은 존재하지 않습니다.

#### 3. Forward kinematics

<img src="https://velog.velcdn.com/images/devjo/post/4b92a4e7-8b34-43d4-9fe6-c515aa93ccca/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

정기구학은 관절 좌표 $q$와 말단 장치 형상 $\chi_e$ 사이의 매핑을 $\chi_e = \chi_e(q)$로 설명합니다. 이 관계는 베이스에서 말단까지 $n_j$개의 관절을 가진 직렬 링크 시스템의 경우 $T_{I\varepsilon}(q)=T_{IO} \cdot (\prod_{k=1}^{n_j} T_{k-1, k}(q_k)) \cdot T_{n_j\varepsilon} = \begin{bmatrix} C_{I\varepsilon}(q) & _I r_{I\varepsilon}(q) \\ O_{1 \times 3} & 1\end{bmatrix}$와 같습니다. 고정 기저 로봇에 대해 로봇은 첫번째 좌표계 $O$은 관성 틀에 대해 움직이지 않으므로 $T_{IO}$는 상수에 해당합니다. 그리고 대부분의 경우 말단 장치의 틀인 $\varepsilon$가 도입되는데 마지막 링크에 연결된 것과 별개로 마지막 물체 좌표계와 동일할 필요는 없습니다. 따라서 $T_{n_j\varepsilon}$도 상수입니다.

평면 3자유도(3DOF) 로봇 팔의 일반화 좌표는 다음과 같습니다.

$$
q=\begin{pmatrix} q_1 \\ q_2 \\ q_3\end{pmatrix}=\begin{pmatrix} \varphi_1 \\ \varphi_2 \\ \varphi_3\end{pmatrix}
$$

이를 사용하여 말단 장치의 위치와 방향을 계산하면 $\chi_e(q)=\begin{pmatrix} \chi_e P(q) \\ \chi_e R(q)\end{pmatrix}$이 되고 첫번째행의 값은 $\begin{pmatrix} x \\ z\end{pmatrix}=\begin{pmatrix} l_1sin(q_1) + l_2sin(q_1+q_2)+l_3sin(q_1+q_2+q_3) \\ l_0+l_1cos(q_1) + l_2cos(q_1+q_2)+l_3cos(q_1+q_2+q_3)\end{pmatrix}$로 계산이 가능하며 두번쨰 행의 값은 $\phi_e=q_1+q_2+q_3$이 됩니다.

#### 4. Differential kinematics and analytical jacobian

미분 또는 순시 기구학에 $\chi_e + \delta \chi_e = \chi_e(q+\delta q) = \chi_e(q) + \frac{\partial \chi_e(q)}{\partial q}\delta q + O(\delta q^2)$으로 선형화가 가능한데 여기서 $\delta \chi_e \sim \frac{\partial \chi_e(q)}{\partial q} \delta q = J_{_e A}(q) \delta q$로 1차 근사치를 산출하게 합니다. 이 때 해석적 자코비언 행렬은 $m \times n_j$ 행렬이고 관절에서 형상 공간으로의 차이를 연결합니다.

말단 장치 형상은 위치인 $\chi_{_e P}$와 방향인 $\chi_{_e R}$의 벡터로 $J_{_e A}=\begin{bmatrix} J_{_e A_p} \\ J_{_e A_R}\end{bmatrix}=\begin{bmatrix} \frac{\partial \chi_{_e P}}{\partial q} \\ \frac{\partial \chi_{_e R}}{\partial q}\end{bmatrix}$로 계산합니다.

#### 5. Geometric or Basic Jacobian

자코비언은 말단 장치의 시간 미분으로 매핑되고 $J_{_e A} = \frac{\partial\chi_e}{\partial q}$는 선택된 매개변수화, 특히 회전의 매개변수화에 의존합니다. 그리고 물체는 고유한 선속도 $v_e$, 각속도 $w_e$를 가지고 일반화 속도를 사용한 $w_e = \begin{pmatrix} v_e \\ w_e\end{pmatrix}=J_{_e O}(q) \dot{q}$ 고유한 자코비언이 존재해야 합니다.

가장 일반적인 경우에는 $6 \times n_j$개의 차원을 가지며 기준 $A$를 가지는 $_A W_e = _A J_{_e O}(q) \dot{q}$를 갖습니다.

기하학적 자코비언은 아래와 같습니다.

$$
\dot{r}_{IE}=\begin{bmatrix} n_1 \times r_{1(n+1)} & n_2 \times r_{2(n+1)} & \cdots & n_n \times r_{n(n+1)}\end{bmatrix} \begin{pmatrix} \dot{q_1} \\ \dot{q_2} \\ \vdots \\ \dot{q_n}\end{pmatrix}
$$

그리고 회전 자코비언은 아래와 같습니다.

$$
w_{IE}=\sum_{i=1}^{n} n_i \dot{q_i} = \begin{bmatrix} n_1 & n_2 & \cdots & n_n\end{bmatrix} \begin{pmatrix} \dot{q_1} \\ \dot{q_2} \\ \vdots \\ \dot{q_n}\end{pmatrix}
$$

이제 두 식을 결합하면 기하학적 자코비언이 산출됩니다.

---

### 참고 자료

[원본 경로 #1](https://ethz.ch/content/dam/ethz/special-interest/mavt/robotics-n-intelligent-systems/rsl-dam/documents/RobotDynamics2017/RD_HS2017script.pdf)




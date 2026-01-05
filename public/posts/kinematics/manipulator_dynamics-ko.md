---
title: 'Manipulator Dynamics'
date: '2024-02-12'
tags: ['Robotics', 'Kinematics', 'lecture']
---

### Acceleration of a rigid body

강체 운동에 대한 분석을 가속도 경우로 확장합니다. 어느 순간이든 선속도 및 각속도 벡터의 도함수는 각각 선형 가속도 및 각가속도라고 불립니다.

$$
\begin{aligned}
&{}^B \dot{V}_Q = \frac{d}{dt} {}^B V_Q = \underset{\Delta t \rightarrow 0}{lim} \frac{{}^B V_Q(t + \Delta t) - {}^B V_Q(t)}{\Delta t}, \\
&{}^A \dot{\Omega}_B = \frac{d}{dt} {}^A \Omega_B = \underset{\Delta t \rightarrow 0}{lim} \frac{{}^A \Omega_B(t + \Delta t) - {}^A \Omega_B(t)}{\Delta t}
\end{aligned}
$$

#### Linear Acceleration

프레임 $\{A\}$에서 바라보는 벡터 $B$의 속도는 다음과 같습니다.

$$
{}^A V_Q = {}^A_B R {}^B V_Q + {}^A \Omega_B \times {}^A_B R {}^B Q
$$

이 속도를 미분함으로써 가속도에 대한 표현을 유도할 수 있으며 $\{A\}, \{B\}$의 원점은 일치합니다.

$$
\begin{aligned}
&\frac{d}{dt}({}^A_B R {}^B Q) = {}^A_B R {}^B V_Q + {}^A \Omega_B \times {}^A_B R {}^B Q, \\
&{}^A \dot{V}_Q = \frac{d}{dt}({}^A_B R {}^B Q) + {}^A \dot{\Omega}_B \times {}^A_B R {}^B Q + {}^A \Omega_B \times \frac{d}{dt}({}^A_B R {}^B Q)
\end{aligned}
$$

#### Angular Acceleration

$\{B\}$가 ${}^A\Omega_{B}$로 $\{A\}$에 대해 회전하고, $\{C\}$가 ${}^B\Omega_{C}$로 $\{B\}$에 대해 회전하는 경우를 고려해 봅시다.

$$
{}^A\Omega_{C} = {}^A\Omega_{B} + {}^A_B R {}^B \Omega_C
$$

미분하면 다음과 같습니다.

$$
{}^A\dot{\Omega}_{C} = {}^A\dot{\Omega}_{B} + \frac{d}{dt}({}^A_B R {}^B \Omega_C)
$$

여기서 우항의 $\frac{d}{dt}({}^A_B R {}^B \Omega_C)$는 선형 가속도 식과 같은 값으로 적용해서 계산하게 됩니다.

---

### Mass Distribution

<img src="https://velog.velcdn.com/images/devjo/post/df44c89c-0133-4e91-b758-84453ea59343/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

단일 축을 중심으로 하는 회전 운동의 경우 관성 모멘트(moment of inertia)라는 개념이 익숙합니다. 3차원에서 자유롭게 움직일 수 있는 강체의 경우, 무한히 많은 회전 축이 가능합니다. 임의의 축을 중심으로 회전하는 경우, 강체의 질량 분포를 특성화하는 완전한 방법이 필요합니다. 여기서 관성 텐서(inertia tensor)를 소개합니다. 위 이미지에서 벡터 ${}^A{P}$는 미분 체적 요소 $dv$의 위치를 나타냅니다.

$\{A\}$에 대한 관성 텐서는 $3 \times 3$ 행렬 형태로 다음과 같이 표현됩니다.

$$
{}^A I = \begin{bmatrix} I_{xx} & -I_{xy} & -I_{xz} \\ -I_{xy} & I_{yy} & -I_{yz} \\ -I_{xz} & -I_{yz} & I_{zz} \end{bmatrix}
$$

이 때의 스칼라 요소는 $I_{xx} = \int (y^2 + z^2) \rho dv, I_{yy} = \int (x^2 + z^2) \rho dv, I_{zz} = \int (x^2 + y^2) \rho dv, I_{xy} = \int xy \rho dv, I_{xz} = \int xz \rho dv, I_{yz} = \int yz \rho dv$이며 $I_{xx}, I_{yy}, I_{zz}$ 요소는 질량 관성 모멘트(mass moments of inertia)라고 불립니다. 혼합된 인덱스를 가진 요소들은 질량 관성 곱(mass products of inertia)이라고 불립니다.

---

### Newton's Equation, Euler's Equation

<img src="https://velog.velcdn.com/images/devjo/post/7da6b2bf-433b-44d5-981f-c5e2bfa84fcc/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

뉴턴 방정식에 대해 설명하면 물체의 질량 중심에 작용하는 힘 ${F}$는 물체를 $\dot{v}_{C}$로 가속시킵니다. 질량 중심이 가속도로 가속하는 강체의 경우 이를 유발하는 힘은 다음과 같습니다.

$$
F=m\dot{v}_C
$$

<img src="https://velog.velcdn.com/images/devjo/post/9e6f29cf-ca34-4a52-ba60-4a07eb38b0d9/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

오일러 방정식에 대해 설명하면 모멘트 ${N}$이 물체에 작용하고, 물체는 각속도 $\omega$로 회전하고 각가속도 $\dot{\omega}$로 가속하는 강체의 경우 이를 유발하는 모멘트가 다음과 같습니다.

$$
N = {}^C I\dot{\omega} + \omega \times {}^C I \omega
$$

---

### Iterative Formulation

#### Outward Iterations

링크에 작용하는 관성력을 계산하려면 매 순간 매니퓰레이터 각 링크의 질량 중심에 대한 회전 속도, 선형 및 회전 가속도를 계산해야 합니다. 이러한 계산은 링크 1에서 시작하여 연속적으로 링크 $n$으로 바깥쪽으로 이동하면서 반복적인 방식으로 수행됩니다.

링크에서 링크로의 각속도의 전파, 각가속도는 다음과 같습니다.

$$
\begin{aligned}
&{}^{i+1} \omega_{i+1} = {}^{i+1}_i R {}^i \omega_i + \dot{\theta}_{i+1} {}^{i+1} \hat{Z}_{i+1}, \\
&{}^{i+1}\dot{\omega}_{i+1} = {}^{i+1}_i R {}^i \dot{\omega}_i + {}^{i+1}_i R {}^i \omega_i \times \dot{\theta}_{i+1} {}^{i+1} \hat{Z}_{i+1} + \ddot{\theta}_{i+1} {}^{i+1} \hat{Z}_{i+1}
\end{aligned}
$$

관절 $i+1$이 프리즘형(prismatic)일 경우 ${}^{i+1}\dot{\omega}_{i+1} = {}^{i+1}_i R {}^i \omega_i$로 단순화됩니다. 각 링크 질량 중심의 선형 가속도는 ${}^i \dot{v}_{C_i} = {}^i \dot{\omega}_i \times {}^i P_{C_i} + {}^i \omega_i \times ({}^i \omega_i + {}^i P_{C_i}) + {}^i \dot{v}_i$로 계산합니다.

#### Inward Iterations

<img src="https://velog.velcdn.com/images/devjo/post/eb313a5a-d549-4e22-94d5-296f504fd604/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

뉴턴-오일러 방정식을 적용하여 각 링크의 질량 중심에 작용하는 관성력과 토크를 계산할 수 있습니다.

$$
\begin{aligned}
&F=m\dot{v}_C, \\
&N = {}^C I\dot{\omega} + \omega \times {}^C I \omega
\end{aligned}
$$

링크 $i$에 작용하는 힘을 합산하여 힘 평형 관계를 얻습니다. 그리고 질량 중심 주변의 토크를 합산하고 0과 같다고 설정하면 토크 평형 방정식이 나옵니다.

$$
\begin{aligned}
&{}^i F_i = {}^i f_i - {}^i_{i+1} R {}^{i+1} f_{i+1}, \\
&{}^i N_i = {}^i n_i - {}^i n_{i+1} + (-{}^i P_{C_i}) \times {}^if_i - ({}^iP_{i+1} - {}^i P_{C_i}) \times {}^i f_{i+1}
\end{aligned}
$$

힘과 토크 방정식을 이웃하는 번호가 높은 링크에서 낮은 링크로의 반복 관계로 재배열할 수 있습니다.

---

### The Structure of a Manipulator's Dynamic Equations

#### The State-Space Equation

뉴턴-오일러 방정식을 기호적으로 평가하면 다음과 같은 형태로 작성될 수 있는 동역학 방정식이 나옵니다.

$$
\tau = M(\theta) \ddot{\theta} + V(\theta, \dot{\theta}) + G(\theta)
$$

여기서 $M(\theta)$는 질량 행렬이고 $V(\theta, \dot{\theta})$는 원심력 및 코리올리 항 벡터입니다. 마지막으로 $G(\theta)$는 중력항 벡터입니다.

#### Lagrangian Formulation

뉴턴-오일러 접근 방식이 동역학에 대한 힘 평형 접근 방식이라고 할 수 있다면, 라그랑주 공식은 동역학에 대한 에너지 기반 접근 방식입니다. 라그랑주 $L$은 운동 에너지 $K$와 위치 에너지 $U$의 차이로 정의되는 스칼라 함수입니다.

$$
L(\theta, \dot{\theta}) = K(\theta, \dot{\theta}) - U(\theta)
$$

여기서 매니퓰레이터의 총 운동 에너지는 개별 링크의 운동 에너지의 합입니다. $K(\theta, \dot{\theta}) = \sum_{i=1}^n k_i = \frac{1}{2} \dot{\theta}^T M(\theta)\dot{\theta}$를 만족합니다. 또한 매니퓰레이터의 총 위치 에너지는 개별 링크의 위치 에너지의 합입니다. $U(\theta) = \sum_{i=1}^n U_i = -\sum_{i=1}^n (m_ig^TP_{C_i} + U_{ref})$를 만족합니다.

---

### Kinematics of closed chain

하나 이상의 루프를 포함하는 모든 운동 사슬을 폐쇄 사슬(closed chain)이라고 합니다. 즉, 고정된 플랫폼과 움직이는 플랫폼이 일련의 다리(legs)로 연결된 폐쇄 사슬입니다.

#### Inverse and Forward Kinematics

<img src="https://velog.velcdn.com/images/devjo/post/a7588adb-594b-43f3-810d-8fa6aa195048/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

평면 $3 \times \text{RPR}$ 병렬 메커니즘을 생각하면 세 개의 프리즘형 관절이 일반적으로 구동되고 여섯 개의 회전 관절은 수동입니다.

$$
d_i=p+b_i-a_i
$$

바디 프레임의 위치 및 방향 $(\mathbf{p}_x, \mathbf{p}_y, \phi)$가 주어지면, 다리 길이($s_1, s_2, s_3$)는 다음 방정식으로부터 직접 계산할 수 있습니다.

$$
s_i^2 = (p_x + b_{ix} \cos \phi - b_{iy} \sin \phi - a_{ix})^2 + \\
(p_y + b_{ix} \sin \phi + b_{iy} \cos \phi - a_{iy})^2
$$

다리 길이 $(s_1, s_2, s_3)$로부터 바디 프레임의 위치 및 방향 $(\mathbf{p}_x, \mathbf{p}_y, \phi)$를 결정하는 정기구학 문제는 간단하지 않습니다. 탄젠트 반각 치환(tangent half-angle substitution)을 통해 $t = \tan(\phi/2)$에 대한 다항식 시스템으로 변환될 수 있으며 6차 다항식 하나로 축소될 수 있습니다.

#### Differential Kinematics

폐쇄 사슬의 미분 기구학은 모든 관절이 구동되는 것은 아니기 때문에 복잡합니다. 구동 관절의 속도만 지정할 수 있으며, 나머지 수동 관절의 속도는 기구학적 구속 방정식으로부터 결정되어야 합니다.

Stewart-Gough Platform에서 역기구학 자코비안 $G(R, p) \in R^{6 \times 6}$은 $\dot{s} = G(R, p) V_s$를 만족하며, $V_s \in R^6$는 공간 트위스트입니다. 개방 사슬에 대한 정적 관계 $\tau = J^T F$를 결정하는 데 사용된 동력 보존 원리를 기반으로 접근할 수 있습니다. 각 다리 $i$에 의해 적용되는 선형 힘은 $f_i = \hat{n}_i \tau_i$이며, $\hat{n}_i$는 단위 벡터입니다. 움직이는 플랫폼에 작용하는 결과 렌치 $F_s$는 다음과 같이 주어집니다.

$$
\begin{aligned}
&\mathbf{F}_s = \sum_{i=1}^6 \mathbf{F}_i \\
&= \sum_{i=1}^6 \begin{pmatrix} \mathbf{r}_i \times \hat{\mathbf{n}}_i \\ \hat{\mathbf{n}}_i \end{pmatrix} \tau_i \\
&= \begin{pmatrix} -\hat{\mathbf{n}}_1 \times \mathbf{q}_1 & \cdots & -\hat{\mathbf{n}}_6 \times \mathbf{q}_6 \\ \hat{\mathbf{n}}_1 & \cdots & \hat{\mathbf{n}}_6 \end{pmatrix} \begin{bmatrix} \tau_1 \\ \vdots \\ \tau_6 \end{bmatrix} \\
&= J_s^{-T} \mathbf{\tau}
\end{aligned}
$$

#### General Parallel Mechanisms

<img src="https://velog.velcdn.com/images/devjo/post/d2c7175c-8e9a-4f5e-b73e-2543b0e4e600/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

스튜어트-고프 플랫폼(Stewart-Gough Platform)은 기구학적 구조 때문에 정적 분석에 특히 적합하며, 여섯 개의 관절 힘 각각이 해당 다리를 따라 향합니다. 따라서 자코비안(또는 더 정확하게는 역 자코비안)은 각 직선 다리와 관련된 스크루(screw)의 관점에서 유도될 수 있습니다.  단순화를 위해 $m=n=p=5$로 가정하면, 메커니즘은 $d = n + m + p - 12 = 3$ 자유도를 가집니다.

세 사슬의 정기구학은 다음과 같이 작성될 수 있습니다.

$$
\begin{aligned}
&T_1(\theta_1, \dots, \theta_5) = e^{[\mathcal{S}_1]\theta_1} e^{[\mathcal{S}_2]\theta_2} \cdots e^{[\mathcal{S}_5]\theta_5} M_1 \\
&T_2(\phi_1, \dots, \phi_5) = e^{[\mathcal{P}_1]\phi_1} e^{[\mathcal{P}_2]\phi_2} \cdots e^{[\mathcal{P}_5]\phi_5} M_2 \\
&T_3(\psi_1, \dots, \psi_5) = e^{[\mathcal{Q}_1]\psi_1} e^{[\mathcal{Q}_2]\psi_2} \cdots e^{[\mathcal{Q}_5]\psi_5} M_3
\end{aligned}
$$

기구학적 루프 구속 조건은 다음과 같이 표현될 수 있습니다. 이러한 구속 조건은 항상 만족되어야 하므로, 공간 트위스트(spatial twists)의 관점에서 시간 미분을 표현할 수 있습니다.

$$
\begin{aligned}
&T_1(\mathbf{\theta}) = T_2(\mathbf{\phi}) \\
&T_2(\mathbf{\phi}) = T_3(\mathbf{\psi})
\end{aligned}
$$

각 사슬의 정기구학 자코비안 관점에서 재배열하면 다음과 같습니다.

$$
\begin{bmatrix} J_1(\mathbf{\theta}) & -J_2(\mathbf{\phi}) & 0 \\ 0 & -J_2(\mathbf{\phi}) & J_3(\mathbf{\psi}) \end{bmatrix} \begin{bmatrix} \dot{\mathbf{\theta}} \\ \dot{\mathbf{\phi}} \\ \dot{\mathbf{\psi}} \end{bmatrix} = \mathbf{0}
$$

---

### Dynamics of open chains

라그랑주 역학 공식화의 첫 번째 단계는 시스템의 구성을 설명하는 $n$개의 독립적인 좌표 $q \in R^n$를 선택하는 것입니다. 이 좌표 $q$를 일반화된 좌표(generalized coordinates)라고 합니다. 일반화된 좌표가 선택되면, 이는 일반화된 힘(generalized forces) $f \in R^n$를 정의합니다. 힘 $f$와 좌표 변화율 $\dot{q}$는 내적 $f^T \dot{q}$가 동력(power)에 해당한다는 의미에서 서로 dual입니다.

라그랑주 함수 $L(q, \dot{q})$는 시스템의 전체 운동 에너지 $K(q, \dot{q})$에서 위치 에너지 $P(q)$를 뺀 값으로 정의됩니다.

$$
L(\mathbf{q}, \dot{\mathbf{q}}) = K(\mathbf{q}, \dot{\mathbf{q}}) - P(\mathbf{q})
$$

이제 운동 방정식은 라그랑주 함수를 사용하여 다음과 같이 표현될 수 있습니다.

$$
\mathbf{f} = \frac{d}{dt} \frac{\partial L}{\partial \dot{\mathbf{q}}} - \frac{\partial L}{\partial \mathbf{q}}
$$

질량 $m$인 입자가 수직선 상에서 움직이도록 구속된 경우를 고려합니다. 일반화된 좌표로 입자의 높이 $x \in R$를 선택합니다. 아래쪽으로 작용하는 중력 $mg$와 위쪽으로 적용되는 외부 힘 $f$가 있다고 가정합니다. 뉴턴의 제2법칙에 의한 운동 방정식은 다음과 같습니다.

$$
f - mg = m\ddot{x}
$$

라그랑주 공식을 적용하면 $K(x, \dot{x}) = \frac{1}{2} m \dot{x}^2$와 $P(x) = mgx$를 $x$에 대해 미분한 것이 위와 같습니다.

#### General Formulation

일반적인 $n$링크 개방 사슬에 대한 라그랑주 동역학 공식화는 다음과 같습니다. 강체 링크 로봇의 운동 에너지는 항상 다음의 이차 형식으로 작성될 수 있습니다.

$$
K(\mathbf{\theta}, \dot{\mathbf{\theta}}) = \frac{1}{2} \sum_{i=1}^n \sum_{j=1}^n m_{ij}(\mathbf{\theta}) \dot{\theta}_i \dot{\theta}_j = \frac{1}{2} \dot{\mathbf{\theta}}^T M(\mathbf{\theta}) \dot{\mathbf{\theta}}
$$

제1종 크리스토펠 기호는 $\Gamma_{ijk}(\theta)$라고 정의되며 다음과 같이 수식으로 표현됩니다.

$$
\Gamma_{ijk}(\mathbf{\theta}) = \frac{1}{2} \left( \frac{\partial m_{ij}}{\partial \theta_k} + \frac{\partial m_{ik}}{\partial \theta_j} - \frac{\partial m_{jk}}{\partial \theta_i} \right)
$$

#### Single Rigid Body

바디 프레임 $\{b\}$에서 질량 $m_i$의 고정된 위치를 $r_i = (x_i, y_i, z_i)$라고 합니다. 이 프레임의 원점은 질량 중심(center of mass)이라고 합니다.

$$
\sum_i m_i \mathbf{r}_i = \mathbf{0}
$$

이제 바디가 바디 트위스트 $V_b = (\omega_b, v_b)$로 움직이고 있다고 가정합니다. 관성 프레임 ${s}$에서 질량 $m_i$의 시간 변화 위치를 $p_i(t)$라고 하면, $p_i$의 가속도는 다음과 같습니다.

$$
\ddot{\mathbf{p}}_i = \dot{\mathbf{v}}_b + [\dot{\mathbf{\omega}}_b] \mathbf{r}_i + [\mathbf{\omega}_b] \mathbf{v}_b + [\mathbf{\omega}_b]^2 \mathbf{r}_i
$$

점 질량에 대한 힘이 $f_i = m_i \ddot{p}_i$라고 가정하면, $m_i$에 작용하는 힘과 모멘트는 다음과 같습니다.

$$\mathbf{f}_i = m_i (\dot{\mathbf{v}}_b + [\dot{\mathbf{\omega}}_b] \mathbf{r}_i + [\mathbf{\omega}_b] \mathbf{v}_b + [\mathbf{\omega}_b]^2 \mathbf{r}_i), \\
\mathbf{m}_i = [\mathbf{r}_i] \mathbf{f}_i
$$

#### Twist–Wrench Formulation

선형 동역학과 회전 동역학을 다음과 같이 결합된 형태로 작성할 수 있습니다.

$$
\begin{bmatrix} \mathbf{m}_b \\ \mathbf{f}_b \end{bmatrix} = \begin{bmatrix} I_b & 0 \\ 0 & mI \end{bmatrix} \begin{bmatrix} \dot{\mathbf{\omega}}_b \\ \dot{\mathbf{v}}_b \end{bmatrix} + \begin{bmatrix} [\mathbf{\omega}_b] & 0 \\ 0 & [\mathbf{\omega}_b] \end{bmatrix} \begin{bmatrix} I_b & 0 \\ 0 & mI \end{bmatrix} \begin{bmatrix} \mathbf{\omega}_b \\ \mathbf{v}_b \end{bmatrix}
$$

여기서 공간 관성행렬이 $G_b = \begin{bmatrix} I_b & 0 \\ 0 & mI \end{bmatrix}$로 표현됩니다. Lie Bracket을 사용하여 벡터의 외적을 6차원 트위스트로 일반화하면 다음과 같습니다.

$$
\text{ad}_{\mathcal{V}}^T (\mathcal{F}) = [\text{ad}_{\mathcal{V}}]^T \mathcal{F} = \begin{bmatrix} [\mathbf{\omega}] & \mathbf{0} \\ [\mathbf{v}] & [\mathbf{\omega}] \end{bmatrix}^T \begin{bmatrix} \mathbf{m} \\ \mathbf{f} \end{bmatrix} = \begin{bmatrix} -[\mathbf{\omega}] \mathbf{m} - [\mathbf{v}] \mathbf{f} \\ -[\mathbf{\omega}] \mathbf{f} \end{bmatrix}
$$

#### Newton–Euler Inverse Dynamics

관절 위치 $\theta \in R^n$, 속도 $\dot{\theta} \in R^n$, 가속도 $\ddot{\theta} \in R^n$가 주어졌을 때, 동역학 방정식의 우변인 $\tau = M(\theta) \ddot{\theta} + h(\theta, \dot{\theta})$를 계산하는 것이 목표입니다. 각 링크 $i$의 질량 중심에 바디 고정 기준 프레임 ${i}$를 부착합니다. 베이스 프레임은 ${0}$이고, 엔드 이펙터 프레임은 ${n+1}$입니다.

$$
\begin{aligned}
&T_{i-1, i}(\theta_i) = M_{i-1, i} e^{[\mathcal{A}_i]\theta_i},\\
&T_{i, i-1}(\theta_i) = e^{-[\mathcal{A}_i]\theta_i} M_{i, i-1}
\end{aligned}
$$

링크 $i$의 트위스트 $V_i$는 링크 $i-1$의 트위스트를 ${i}$로 표현한 것과 관절 속도 $\dot{\theta}_i$에 의한 트위스트의 합입니다.

$$
\mathcal{V}_i = [\text{Ad}_{T_{i, i-1}}] \mathcal{V}_{i-1} + \mathcal{A}_i \dot{\theta}_i
$$

각 링크에 작용하는 총 렌치는 강체 동역학 방정식에 의해 $G_i \dot{V}_i - \text{ad}_{V_i}^T (G_i V_i)$입니다. 이 총 렌치는 관절 $i$를 통해 전달되는 렌치 $F_i$와 관절 $i+1$을 통해 전달되는 렌치 $F_{i+1}$의 합입니다.

$$
G_i \dot{\mathcal{V}}_i - \text{ad}_{\mathcal{V}_i}^T (G_i \mathcal{V}_i) = \mathcal{F}_i - \text{Ad}_{T_{i+1, i}}^T (\mathcal{F}_{i+1})
$$

---

### 참고 자료

[원본 경로 #1](https://www.changjiangcai.com/files/text-books/Introduction-to-Robotics-3rd-edition.pdf?utm_source=chatgpt.com)

[원본 경로 #2](https://hades.mech.northwestern.edu/images/7/7f/MR.pdf)

---
title: 'Dynamics of floating base systems and several space control'
date: '2024-11-06'
tags: ['robotics', 'mathematics', 'lecture']
---

### Dynamics of floating base systems

부유 기저 시스템의 동역학은 다음과 같이 정의됩ㄴ니다.

$$
M(q) \dot{u} + b(q, u) + g(q) = S^T_{\tau} + J_{ext}^T F_{ext}
$$

부유 기저 시스템의 일반화 좌표는 구동 관절 좌표 $q_j$와 미구동 기저 좌표 $q_b$로 구성되며 각각은 $u_j = \dot{q}_j \in R^{n_j}$, $u_b \in R^6$의 속도를 갖습니다. 선택 행렬 $S$로 구동 관절을 아래와 같이 선택합니다.

$$
u_j=S_u=S \begin{pmatrix} u_b \\ u_j\end{pmatrix} = \begin{pmatrix} 0_{6 \times 6} & I_{6 \times 6}\end{pmatrix}\begin{pmatrix} u_b \\ u_j\end{pmatrix}
$$

여기서 미구동 기저 좌표인 $q_b$를 제어하기 위해서는 외부 힘 $F_{ext}$가 필요합니다.

$$
M(q) \dot{u} + b(q, u) + g(q) + J_{c}^T F_{c} = S^T_{\tau}
$$

위의 수식에서 $F_c$가 로봇이 환경에 가하는 힘입니다.

#### 1. Contact Forces

접촉 힘을 모델링하는 데는 두 가지 근본적으로 다른 방법이 존재합니다. 소프트 접촉 방법(soft contact method)은 상호작용을 힘 요소(즉, 스프링-댐퍼)로 모델링하며, 여기서 힘은 접촉점의 위치와 속도에만 의존하는 함수입니다. 하드 접촉 방법(hard contact method)은 접촉을 운동학적 제약 조건(kinematic constraint)으로 취급합니다.

소프트 접촉 모델의 경우, 우리는 일반적으로 환경과 처음 접촉하는 지점을 $r_{c0}$로 식별합니다. 환경에 대한 선형 스프링-댐퍼 모델을 사용할 때, 접촉 힘(로봇이 환경에 가하는 힘)은 다음과 같습니다.

$$
F_c = k_p(r_c-r_{cO}) + k_d \dot{r}_c
$$

큰 문제 중 하나는 다물체 시스템과 접촉에 대한 결합된 미분 방정식이 매우 강성(stiff)(느린 다물체 동역학과 매우 빠른 접촉 동역학)이 된다는 것입니다. 이러한 문제를 해결하는 것은 낮은 속도 또는 낮은 정확도를 초래합니다. 이 문제를 극복하기 위해, 강성과 댐핑에 대한 접촉 매개변수는 종종 실제 물리적 매개변수와 아무 관련이 없는 수치 시뮬레이션 매개변수로 조정됩니다.

접촉점의 힘 요소로부터 발생하는 접촉 힘 대신, 접촉은 운동학적 제약 조건으로도 처리될 수 있습니다. 위치 $r_c$를 가진 점 $C$가 접촉 상태에 있다면 더 이상 움직이는 것이 허용되지 않습니다.

$$
r_c = \text{const}, \\
\dot{r}_c = J_c u = 0, \\
\ddot{r}_c = J_c \dot{u} + \dot{J}_c u = 0
$$

이 경우에도 접촉 힘은 아래와 같습니다.

$$
F_c = (J_c M^{-1}J_c^T)^{-1} [J_cM^{-1}(S^T_{\tau} - b - g) + \dot{J}_c u]
$$

추가적인 접촉 힘 센서 없이 지면 반발력(ground reaction forces)을 추정하는 데 직접적인 접근을 제공하므로 큰 이점이 있습니다.

#### 2. Constraint Consistent Dynamics

dynamically consistent support null-space matrix에 대해 아래와 같이 정의합니다.

$$
N_c = I-M^{-1}J_c^T(J_cM^{-1}J_c^T)^{-1}J_c
$$

여기서 $N_c$는 support 링크에 대한 가속도 또는 힘 결합 효과가 없는 일반화된 운동 공간을 정의합니다. 접촉 힘에 대한 해는 운동 방정식에 대입하면 다음과 같습니다.

$$
M \dot{u} + N_c^T(b) + g + J_c^T(J_cM^{-1}J_c^T)^{-1}\dot{J}_c u = N_c^TS^T\tau
$$

$\dot{J}_c u = -J_c \dot{u}$를 의미하는 지지 제약 조건을 추가로 포함함으로써, 제약 조건과 일관된 운동 방정식은 다음과 같이 간결하게 공식화될 수 있습니다.

$$
N_c^T(M\dot{u} + b + g) = N_c^TS^T \tau
$$

#### 3. Contact Switches and Impact Collisions

하드 접촉 모델(hard contact model)은 시스템 동역학의 분석을 두 구간, 즉 접촉 상황의 변화 또는 충돌 전후로 세분화해야 합니다. 충돌 자체는 두 개 이상의 물체가 서로 충돌할 때 발생하는 복잡한 물리적 현상입니다. 충돌의 특징은 매우 짧은 지속 시간과 높은 최고점 힘이며, 이는 급격한 에너지 소산과 큰 가속도를 초래합니다. 에너지 전달 및 소산 과정을 모델링하기 위해, 반발 계수(coefficient of restitution) 및 충격량 비율(impulse ratio)과 같은 다양한 계수가 사용됩니다.

접촉 충격량 해결하기 위해, 우리는 단일 시간 지점 $t_0$에 대한 운동방정식을 사용합니다.

$$
\int_{t_0} [M \dot{u} + b + g + J_c^T F_c-S^T \tau] \\
= M(u^+-u^-) + J_c^TF_c = 0
$$

여기서 $F_c$는 충격에 대한 힘이며 $u^-$와 $u^+$는 각각 충돌 전과 후 일반화 속도입니다. 뉴턴 충돌 법칙(Newtonian collision law)을 가진 완전 비탄성 충돌(inelastic collision)을 가정하면, 충돌의 일부로 간주되는 모든 접촉점은 $\dot{r}_c^+ = J_c u^+ = 0$처럼 순간적으로 정지합니다. 따라서 충돌 후 제약조건을 통합한 운동 방정식은 아래와 같습니다.

$$
F_c = (J_cM^{-1}J_c^T)^{-1}J_c\dot{q}^{-1} = \Lambda_c \dot{r}_c^{-1}
$$

위 수식에서 충격량은 질량과 속도의 곱이라는 기본 역학을 고려하면 지지점에서 보이는 관성(end effector inertia)는 $(J_cM^{-1}J_c^T)^{-1}$로 식별합니다.

접촉 상황의 순간적인 변화는 항상 운동 에너지 손실(kinetic energetic loss)과 관련됩니다.

$$
E_{loss} = -\frac{1}{2} \Delta u^T M \Delta u = -\frac{1}{2} \dot{r}_c^{-T}\Lambda_c\dot{r}_c^{-}
$$

---

### Joint space dynamic control

현재 산업용 로봇은 거의 전적으로 관절 위치 제어(joint position control) 개념에 의존합니다. 이들은 로봇의 모든 관절의 위치 또는 속도를 독립적으로 조절하기 위해 PID 제어기를 기반으로 합니다. 이러한 제어기는 구동기와 전체 로봇의 교란을 보상하며, 이상적인 경우 원하는 움직임을 완벽하게 추적하게 합니다. 관절 토크를 추가적으로 감지해야만 모델 기반 부하 보상(model-based load compensation)을 통합하는 것이 가능해집니다.

#### 1. Joint Impedance Regulation

토크 제어 가능 구동기(torque controllable actuators)의 경우, 관절 위치 $k_p$ 및 속도 $k_d$에 대한 관절 피드백 이득은 관절 강성 및 댐핑에 해당하며 다음과 같이 계산됩니다.

$$
\tau^*=k_p(q^*-q) + k_d(\dot{q}^*-\dot{q})
$$

여기서 $q^*$와 $\dot{q}^*$는 각각 원하는 관절 위치와 속도를 나타냅니다. 이 제어 법칙을 로봇 팔에 적용하면, 우리는 정상 상태 추적 오차를 얻습니다.

$$
M(q)\ddot{q}^* + b(q, \dot{q}) + g(q) = k_p(q^*-q) + k_d(\dot{q}^* - \dot{q}), \\
M(q)\ddot{q}^* \to 0, \\
b(q, \dot{q}) \to 0
$$

중력 보상은 정상 상태 오프셋을 보상하고 관절 임피던스를 조정하기 위해, 일반적인 접근 방식은 원하는 구동기 토크를 다음과 같이 선택하는 것입니다.

$$
\tau^*=k_p(q^*-q)+k_d(\dot{q}^* - \dot{q}) + \hat{g}(q)
$$

여기서 $\hat{g}(q)$는 추정된 중력 효과를 나타냅니다.

Inverse Dynamics Control은 각 관절에서 보이는 관성은 로봇 구성에 따라 변하기 때문에, PD 이득은 작업 공간의 어떤 평균 구성(average configuration)에 대해 선택되어야 하고 이것은 동적 효과가 중요해질 때 성능을 감소시킨다는 단점을 우회하기 위해 사용됩니다.

$$
\tau = \hat{M}(q)\ddot{q}^* +\hat{b}(q, \dot{q}) + \hat{g}(q)
$$

여기서 $\hat{M}(q)$, $hat{b}(q, \dot{q})$, $\hat{g}(q)$는 각각 $M(q)$, $b(q, \dot{q})$, $g(q)$의 추정치입니다. 폐쇄 루프 동역학(closed-loop dynamics)에서는 $I \ddot{q} = \ddot{q}^*$으로 산출합니다. 따라서 모든 관절의 디커플링된 동역학을 형성할 수 있게 해주고 일반화를 하면 $\ddot{q}^* = k_p(q^*-q)+k_d(\dot{q}^* - \dot{q})$와 같이 가속도를 선택할 수 있습니다.

---

### Task space dynamic control

대부분의 상황에서, 우리는 작업 공간 즉 world-fixed frame의 특정 지점을 움직이고 싶어합니다. 말단 장치 $e$의 선형 및 회전 가속도는 기하학적 자코비안을 통해 일반화 가속도에 연결됩니다.

$$
\dot{w}_e = \begin{pmatrix} \ddot{r} \\ \dot{w}\end{pmatrix}_e = J_e \ddot{q} + \dot{J}_e \dot{q}
$$

#### 1. Multi-task Decomposition

여러 작업을 수행하면서 역 동역학을 수행할 수 있습니다. 원하는 작업 공간 가속도와 해당 자코비안으로 주어진 일련의 모션 목표가 주어지면, 모든 목표를 동일한 우선순위로 취급할 수 있습니다.

$$
\ddot{q} = \begin{bmatrix} J_1 \\ \vdots \\J_{n_t} \end{bmatrix}^+ ( \begin{pmatrix} \dot{w}_1 \\ \vdots \\ \dot{w}_{n_t}\end{pmatrix} - \begin{bmatrix} \dot{J}_1 \\ \vdots \\ \dot{J}_{n_t}\end{bmatrix} \dot{q})
$$

일부 작업이 더 높은 우선순위를 가지는 경우 재귀 알고리즘을 사용하여 해를 결정할 수 있습니다.

$$
\ddot{q} = \sum_{i=1}^{n_t} N_i \ddot{q}_i, \\
\ddot{q}_i = (J_iN_i)^+(\dot{w}_i^*-\dot{J}_i\dot{q} - J\sum_{k=1}^{i-1}N_k\dot{q}_k)
$$

여기서 $N_i$는 스택된 자코비언의 널 공간 투영을 의미합니다.

#### 2. End-effector Dynamics

말단 장치 동역학은 위의 $\dot{w}_e$를 아래와 같이 풀어서 해석합니다.

$$
\dot{w}_e = J_e M^{-1}(\tau -b -g) + \dot{J}_e \dot{q}
$$

관절 토크를 자코비안 전치와 미리 곱해진 말단 장치 힘으로 대체하면 $\tau = J_e^TF_e$이고 $\Lambda_e \dot{w}_e + \mu + p = F_e$와 같은 말단 장치 동역학이 산출됩니다. 여기서 $\Lambda_e = (J_eM^{-1}J_e^T)^{-1}$, $\mu = \Lambda_eJ_eM^{-1}b - \Lambda_e\dot{J}_e\dot{q}$, $p = \Lambda_eJ_eM^{-1}g$로 각각 말단 장치 관성, 원심력 코리올리, 중력 항을 나타냅니다.

#### 3. End-effector Motion Control

원하는 관절 토크를 정의하기 위해 역 형태의 작업 공간 운동 방정식을 사용할 수 있습니다. 위에서 관절 토크와 말단 장치 동역학을 결합하여 $r^* = \hat{J}_e^T(\hat{\Lambda}_e \dot{w}_e^* + \hat{u} + \hat{p})$로 방정식을 산출할 수 있습니다. 원하는 가속도 $\dot{w}_e^*$에 대해 제어전략으로 $k_p\begin{pmatrix} r_e^*-r_e \\ \Delta \psi_e\end{pmatrix} + k_d(w_e^* - w_e)$을 사용합니다. 여기서 $\Delta \psi_e$를 말단 장치 회전 오차로 사용합니다.

#### 4. Operational Space Control

로봇이 어떤 방향으로는 힘을 가해야 하고 다른 방향으로는 움직여야 하는 많은 상황이 존재합니다. 예를 들어, 창문을 닦는 경우, 로봇은 법선 방향으로 특정 압력을 가하고 다른 모든 방향으로 움직임을 제어합니다.

운동 및 힘 방향에 대한 선택 행렬(selection matrices) $S_M, S_F$를 아래와 같이 정의합니다.

$$
\tau^*=\hat{J}^T(\hat{\Lambda} S_M \dot{w}_e^* + S_FF_c + \hat{\tilde{\mu}} + \hat{p})
$$

위치 및 방향에 대한 사양 행렬(specification matrices)을 정의할 수 있습니다.

$$
\sum_p = \begin{bmatrix} \sigma_{px} & 0 & 0 \\ 0 & \sigma_{py} & 0 \\ 0 & 0 & \sigma_{pz}\end{bmatrix}, \\
\sum_r = \begin{bmatrix} \sigma_{rx} & 0 & 0 \\ 0 & \sigma_{ry} & 0 \\ 0 & 0 & \sigma_{rz}\end{bmatrix}
$$

여기서 $\sigma_i$는 특정 축을 따라(선형) 또는 주위로(회전) 자유로운 움직임이 지정되었을 때 값 1이 할당되고, 그렇지 않으면 0이 할당되는 이진수입니다. 접촉 힘 좌표계가 회전 변환 행렬 $C$에 의해 회전되는 경우 두 선택 행렬은 다음과 같이 정의됩니다.

$$
S_M = \begin{pmatrix} C^T \sum_p C & 0 \\ 0 & C^T \sum_r C\end{pmatrix}, \\
S_F = \begin{pmatrix} C^T (I_3 - \sum_p) C & 0 \\ 0 & C^T (I_3 - \sum_r) C\end{pmatrix}
$$

---

### Inverse Dynamics for Floating-Base Systems

부유 기저 시스템으로 작업할 때, 접촉 제약 조건이 충족되도록 보장하면서 역 동역학을 수행해야 합니다. 제약 조건과 일관된(consistent) 원하는 가속도 $\dot{u}^*$가 주어지면, 우리는 제약 조건과 일관된 운동 방정식을 반전시킬 수 있습니다.

$$
\tau^*=(N_c^T S^T)^+ N_c^T(M \dot{u} + b + g)
$$

pseudo inverse에 해당하는 $(N_c^T S^T)^+$를 취해야 한다는 것을 주의해야 합니다. 다중 작업 해를 생각하면 $\tau^*$를 수정할 수 있는 널 공간(null-space) $N(N_c^TS^T)\tau_0^*$이 존재합니다. 이 때 지지 일관성 운동 방정식 $N_c^T S^T \tau^* = N_c^T (M\dot{u} + b + g)$는 여전히 유효합니다. 다시 말해서 동일한 움직임인 $\dot{u}^*$를 초래하는 서로 다른 관절 토크 분포가 존재합니다.

#### 1. Quadratic Problems

서로 다른 운영 공간 목표를 동시에 제어하는 문제를 다루는 많은 접근 방식이 존재합니다. 이러한 작업에는 선택된 위치(예: 말단 장치, CoG 등)에서의 움직임, 원하는 접촉 힘 또는 관절 토크가 포함됩니다.

포괄적인 방법은 운영 공간 제어를 선형 목표의 순차적 최소 제곱 최적화 문제로 이해하는 것입니다. $n_T$개의 선형 방정식 세트에 대한 계층적 최소 제곱 최적화는 $A_i x = b_i$로 정의합니다. 여기서 $x$는 최적화 변수이고 동일한 우선순위 $i \ge 1$을 갖는 문제들이 양변의 행렬과 벡터에 스택됩니다.

#### 2. Iterative Null-Space Projection

어떤 작업도 더 높은 우선순위를 가진 작업에 영향을 미치지 않아야 한다는 요구 사항은, 더 높은 우선순위의 작업의 널 공간 투영 행렬 $N_i$와 미리 곱해진 작업별 $x_i$의 합으로 공식화할 수 있습니다.

$$
x = \sum_{k=1}^{n_T} N_k x_k
$$

널 공간 투영자 $N_i$는 $N_i = N([A_1^T \dots A_{i-1}^T]^T)$로 정의되며, $N_1 = I$이고 충분 조건은 $A_iN_j=0$을 만족합니다.

이제 각 작업에 대해 해를 구하는 방법은 아래와 같습니다.

$$
A_i x - b_i = A_i \sum_{k=1}^{n_T}N_kx_k - b_i, \\
x_i = (A_iN_i)^+(b_i - A_i \sum_{k=1}^{n_T}N_kx_k)
$$

---

### 참고 자료

[원본 경로 #1](https://ethz.ch/content/dam/ethz/special-interest/mavt/robotics-n-intelligent-systems/rsl-dam/documents/RobotDynamics2017/RD_HS2017script.pdf)




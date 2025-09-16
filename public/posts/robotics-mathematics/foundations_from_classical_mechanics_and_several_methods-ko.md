---
title: 'Foundationss from classical mechanics and several methods'
date: '2024-10-30'
tags: ['robotics', 'mathematics', 'lecture']
---

### Multi body dynamics

고정 기저 로봇의 많은 응용 분야에서 다물체 동역학을 찾아야 합니다.

$$
M(q) \ddot{q} + b(q, \dot{q}) + g(q) = \tau + J_c(q)^T F_c
$$

여기서 $M(q) \in R^{n_q \times n_q}$는 일반화 질량 행렬로 직교하고, $q, \dot{q}, \ddot{q} \in R^{n_q}$는 일반화 위치, 속도, 가속도 벡터를 의미합니다. $b(q, \dot{q})$는 코리올리 및 원심력의 항이고 $g(q)$는 중력 항, $F_c \in R^{n_c}$는 외부 카르테시안 힘을 의미합니다.

---

### Foundations from Classical Mechanics

<img src="https://velog.velcdn.com/images/devjo/post/97cf23db-f42d-4db6-ad13-d9cc0cbfd833/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

#### 1. Newton's law for particles

뉴턴 역학의 가장 기본적인 공식은 point masses의 운동을 설명합니다. 점 질량 $m$을 가지고 무한히 작은 차원을 가지며 전체 질량이 위치 벡터 $r$로 정의된 단일 점에 집중되어 있습니다. 점 질량은 방향이 없습니다.

$$
\ddot{r}m = F
$$

위와 같은 뉴턴의 제 2법칙을 고려하면 되는데 질량을 무한히 작은 차원으로 정의하면 무한소 힘 $dF$에 종속된 무한소 질량 $dm$으로 생각하여 $\ddot{r} dm = dF$로 변경할 수 있습니다.

#### 2. Virtual displacements

$\delta$ 연산자로 변분 표기법에 사용하는데 이는 미분 연산자 $d$와 같은 작업을 합니다. 미분은 한 양의 변화율을 다른 양에 대해 정의하는데 사용되는 무한소 양을 설명하도록 정의됩니다. 반대로 한 양의 변분은 고정된 시간 순산에 해당 제약 조건을 준수하면서 모든 방향을 설명합니다.

변분에 가장 중요한 사실은 시간의 함수인 양에 대해 취해진 경우 시간적 의존성이 완전히 무시되는 것으로 virtual displacement $\delta_{\tau}$라고 불리는 위치 벡터의 허용 가능한 변분(admissible variation)을 정의하고 위치가 일반화 좌표 $q$와 시간 $t$의 함수라고 가정합니다. 즉 $r=r(q,t)$입니다.

$$
\delta_{r}(q,t)=\sum_{k=1}^{n_q} \frac{\partial_r}{\partial_{q_k}} \delta_{q_k}
$$

$q$의 $n_q$개 요소에 대해 chain rule을 적용하여 계산합니다.

#### 3. Virtual displacement of Single rigid bodies

<img src="https://velog.velcdn.com/images/devjo/post/23ee1f79-1445-4918-97d5-ed948e27015c/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

위 이미지는 3D 카르테시안 공간에 존재하는 질량을 가진 물체는 매우 간단하게 수많은 입자들이 밀접하게 모여 하나의 단일 강체를 형성하는 것입니다. 각 무한소 점 질량 $dm$은 전체 물체의 운동에 종속되므로 어떤 시간 순간에도 절대 위치와 속도가 할당될 수 있습니다.

물체 위의 또 다른 점 $S$를 고려하여 $dm$의 상대 위치 $\rho$를 점 $S$에 대해 정의할 수 있습니다.

$$
r=r_{OS} + \rho, \\
\dot{r} = v_s + \Omega \times \rho = \begin{bmatrix} I_{3 \times 3} & -[\rho]_x\end{bmatrix}, \\
\ddot{r} = a_s + \Psi \times \rho + \Omega \times (\Omega \times \rho)
$$

위 식은 물체 $B$에 정의된 임의의 무한소 점 질량 $dm$의 운동을 설명합니다. 여기서 $r_{OS}$는 물체 점 S의 절대 위치이고 $\rho$는 $S$에 대한 $dm$의 상대 위치입니다.

#### 4. Virtual displacement of Multi body systems

다물체 시스템은 링크 사이의 상대적인 움직임을 제한하는 관절에 의해 강제된 제약조건과 호환되는 움직임만 나타낼 수 있습니다.

$$
\begin{pmatrix} v_s \\ \Omega \end{pmatrix} = \begin{bmatrix} J_P \\ J_R\end{bmatrix} \dot{q}, \\
\begin{pmatrix} a_s \\ \Psi \end{pmatrix} = \begin{bmatrix} J_P \\ J_R\end{bmatrix} \ddot{q} + \begin{bmatrix} \dot{J_P} \\ \dot{J_R}\end{bmatrix} \dot{q}
$$

#### 5. Principle of virtual work

역학의 근본적인 원리 중 하나는 가상 일의 원리이며, 이는 구성 제약 조건이 실제로는 가상 변위의 방향으로 일을 하지 않는 힘을 정의한다는 사실을 설명합니다. 임의의 관절에 의해 기여되고 관련 물체에 동등하게 적용되는(작용-반작용 원리) 점 $r_c$에 적용된 제약 조건 힘 $F_c$에 대해 $\delta W = \delta r_c^T \cdot F_c = 0$과 같이 정의합니다.

우리는 물체 $B$에 있는 무한소 $dm$을 고려하여 동적 평형을 설명하는 달랑베르의 원리(dAlambert's principle)을 입자에 대해 고려하면 아래와 같습니다.

$$
\delta W = \int_B \delta r^T \cdot (\ddot{r}dm-dF_{ext})=0, \forall \delta_r
$$

여기서 요소 $dm$에 작용하는 외부 힘, $\delta_r$은 $dm$의 가상변위입니다.

---

### Newton Euler Method

#### For Single Bodies

단일 물체에 대한 가상 일의 원리를 평가하면 아래와 같습니다.

$$
0=\delta W \\
= \int_B \begin{pmatrix} \delta r_s \\ \delta \psi\end{pmatrix}^T \begin{bmatrix} I_{3 \times 3} \\ [\rho]_x\end{bmatrix} \\
\cdot \begin{pmatrix} I_{3 \times 3} & -[\rho]_x\end{pmatrix} \begin{bmatrix} \begin{pmatrix} a_s \\ \Psi\end{pmatrix}dm + [\Omega]^2_x \rho dm - dF_{ext}\end{bmatrix}
$$

관절이나 접촉으로부터 활성 제약 조건이 없기 때문에 임의의 가상 변위에 대해 유효해야 합니다. 이 때 선형 및 각 운동량 보존 법칙을 정의하기 위해 아래의 정의를 대입합니다.

$$
p_s = mv_s, \\
N_s = \Theta_s \cdot \Omega, \\
\dot{p_s} = ma_s, \\
\dot{N_s} = \Theta_s \cdot \Psi + \Omega \times \Theta_s \cdot \Omega
$$

이를 사용하여 다음과 같이 자유롭게 움직이는 물체는 선형 운동량의 변화가 모든 외부 힘의 합과 같아야 함을 충족해야 합니다.

$$
0=\begin{pmatrix} \delta r_s \\ \delta \psi\end{pmatrix}^T \begin{bmatrix} \begin{pmatrix} \dot{p_s} \\ \dot{N_s}\end{pmatrix} - \begin{pmatrix} F_{ext} \\ T_{ext}\end{pmatrix}\end{bmatrix}
$$

위 식은 뉴턴과 오일러의 공식에 따라 $F_{ext,S}$는 COG를 통해 작용하는 합력(resultant) 외부 힘이고, $T_{ext}$는 합력 외부 토크입니다. COG를 통해 작용하지 않는 외부 힘은 COG를 통해 작용하는 힘/모멘트 쌍으로 변환되어야 합니다. 관상 텐서 $\Theta$는 $_B \Theta = C_{BA} \cdot _A \Theta \cdot C_{BA}^T$를 적용해야 합니다.

#### 2. For Multi-Body Systems

<img src="https://velog.velcdn.com/images/devjo/post/2d58abfa-cc3a-4aee-82d2-80c161cfab2b/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

다물체에서는 모든 물체를 관절에서 분리하고 각 물체를 단일 단위로 고려하는 것이 중요합니다. 관절의 제약 조건 힘 $F_i$는 자유롭게 절단될 때 외부 힘(external forces)로 도입되어야 합니다. 이러한 조건은 두 물체가 관절의 방향을 따라서만 움직이고 관절에 의해 차단된 다른 방향으로의 움직임은 막습니다.

---

### Lagrange Method

시스템의 운동 방정식을 도출하는 또 다른 일반적인 접근 방식은 라그랑주 방법을 사용하는 것입니다. 이는 분석 역학(Analytical Mechanics)으로 알려진 물리학의 하위 분야에서 유래했으며, 물리 시스템의 운동을 설명하는 데 사용되는 분석적 방법 중 하나이므로 달랑베르와 해밀턴 원리와 밀접하게 관련이 있습니다. 이 방법은 세 가지 근본적인 개념을 중심으로 합니다.

$\rightarrow$ 시스템에 적용 가능한 제약 조건에 대한 정보를 포함하거나 포함하지 않을 수 있는 일반화 좌표 $q$와 일반화 속도 $\dot{q}$에 대한 정의

$\rightarrow$ 라그랑주 함수 $L$이라는 스칼라 함수는 총 운동 에너지 $T$와 총 위치 에너지 $U$의 차이를 말합니다.

$\rightarrow$ 라그랑주 함수와 총 외부 일반화 힘 $\tau$에 적용되는 오일러 라그랑주 방정식은 $\frac{d}{dt} (\frac{aL}{a\dot{q}}) - (\frac{aL}{aq})=\tau$로 정리됩니다.

#### Kinetic Energy

$n_b$개의 물체로 이루어진 운동 에너지는 아래와 같습니다.

$$
T=\sum_{i=1}^{n_b}(\frac{1}{2} m_i {}_A\dot{r}_{S_i}^T {}_A\dot{r}_{S_i} + \frac{1}{2}{}_B \Omega_{S_i}^T \cdot {}_B\Theta_{S_i} \cdot {}_B \Omega_{S_i})
$$

시스템의 모든 물체 $B_i$에 대해 선형 부분은 어떤 틀 $A$로 표현되어 계산될 수 있지만 관성 행렬 $\Theta_{S,i}$가 대각선 형태를 가질 수 있는 다른 틀을 사용하여 회전 운동 에너지를 계산하는 것이 편리할 수 있습니다. 즉 $B$의 기저 벡터가 질량 분포에 대해 principle하다고 할 수 있습니다.

말단 장치 대신 각 물체 $B_i$에 대해 자코비언 행렬을 사용하여 $\dot{r}_{S_i} = J_{S_i} \dot{q}$, $\Omega_{S_i} = J_{R_i} \dot{q}$로 운동 에너지 정의가 가능합니다.

$$
T(q, \dot{q}) = \frac{1}{2} \dot{q}^T (\sum_{i=1}^{n_b} [J_{S_i}^T m J_{S_i} + J_{R_i}^T \Theta_{S_i} J_{R_i}]) \dot{q}
$$

따라서 위와 같이 일반화할 수 있습니다. 여기서 괄호 안의 내용은 일반화 질량 행렬로 최종 EOM에서 관성 및 비선형 원심력 코리올리 힘 항을 모두 생성하는 역할을 하게 됩니다.

#### Potential Energy

전형적인 역학 문제에서, 시스템의 위치 에너지(Potential Energy)에 대한 두 가지 기본 기여가 있습니다. 바로 중력 위치 에너지(gravitational potential energy)를 통해 기여하는 질량과, 정지 상태에서 변형될 때 저장된 에너지를 통해 기여하는 탄성 요소(elastic elements)입니다.

첫번째의 경우 각 물체 $B_i$는 지구의 중력장 효과로 인해 위치 에너지를 가집니다. 큰 규모에서는 비선형적이지만 대부분 각 물체 질량 중심인 CoM을 통해 작용하는 단위 벡터 $_I e_g$를 따라 정의된 균일하고 단방향적 퍼텐셜 구간을 통해 근사할 수 있습니다.

$$
F_{g_i} = m_i g _I e_g, \\
U_g = -\sum_{i=1}^{n_b}r_{s_i}^T F_{g_i}
$$

위 수식에서 각 물체의 CoM 위치 $r_{S_i}$를 알면 위치 에너지를 계산할 수 있으며 에너지 수준 $O$는 임의로 선택할 수 있어 탄성 요소가 포함된 $E_j$가 변형 토크 관계를 선형으로 근사하고자 한다면 아래와 같이 설명할 수도 있습니다.

$$
U_{E_j} = \frac{1}{2} k_j (d(q) - d_o)^2
$$

여기서 $d(q)$는 일반화 좌표의 함수로 탄성 요소의 구성(스프링의 길이) 등을 표현하고 $d_o$는 요소에 의해 힘이 가해지지 않는 정지 구성(rest configuration)으로 정의됩니다.

---

### 참고 자료

[원본 경로 #1](https://ethz.ch/content/dam/ethz/special-interest/mavt/robotics-n-intelligent-systems/rsl-dam/documents/RobotDynamics2017/RD_HS2017script.pdf)




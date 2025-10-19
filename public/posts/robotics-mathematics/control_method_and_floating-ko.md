---
title: 'Control method and floating base'
date: '2024-10-23'
tags: ['robotics', 'mathematics', 'lecture']
---

### Inverse differential

$$
w_e = J_{_e O}(\dot{q})
$$

자코비언 $J_{_e O}(q)$는 관절 공간의 속도 $\dot{q}$와 말단 장치 속도 $w_e$ 사이의 매핑을 수행합니다.

하지만 제어 분야에서 inverse problem을 해결하는 데 관심이 있는데 이는 유사 역행렬 $\dot{q} = J_{_e O}^+ w_e^*$을 취하여 계산합니다.

로봇이 $J_{_e O}(q_s)$가 작업 공간 좌표 수인 $m_0$이 작은 rank를 갖는 형상 $q_s$에 있는 경우 특이(singular)라고 합니다. 특이점은 원하는 말단 장치 속도인 $w_e^*$에 대해 $w_e^*=J_{_e O}(q)$를 충족하는 일반화 속도 $\dot{q}$가 존재하지 않음을 의미합니다.

무어 팬로즈 유사 역행렬을 취하면 $\dot{q} = J_{_e O} w_e^*$는 최소 제곱 오차를 최소화할 수 있습니다. 불행히도 로봇은 특이 형상에 가까워지면 $J_{_e O}$가 0에 가까운 특이값을 갖게 되어 badly conditioned에 빠집니다. 따라서 이는 해당 방향에서 작은 속도 $w_e^*$가 극도로 높은 관절 속도로 이어지는 것을 의미합니다.

특이점 근처에서 badly conditioned일 경우 무어 팬로즈 유사 역행렬의 감쇠 동작(damped version)으로 아래와 같이 접근합니다.

$$
\dot{q}=J_{_e O}^T(J_{_e O}J_{_e O}^T - \lambda^2I)^{-1} w_e^*
$$

여기서 $\lambda$가 그 계수입니다. 감쇠 동작이 클수록 해는 더 안정적이지만 수렴은 더 느려집니다. 이 역전 방법은 오차 $|w_e^*-J_{_e O}\dot{q}|^2 + \lambda^2 |\dot{q}|^2$를 최소화합니다.

로봇이 $J_{_e O}(q^*)$가 $n$보다 작은 계수를 가지는 형상에 있는 경우 여유(rebundant)라고 합니다. 이 때 무어 팬로즈 유사 역행렬을 취하면 $\dot{q}=J_{_e O}^T(J_{_e O}J_{_e O}^T)^{-1} w_e^*$의 해는 $w_e^*=J_{_e O} \dot{q}$를 만족하면서 $|\dot{q}|^2$를 최소화합니다. 시스템의 여유 자유도는 무한한 수의 해가 존재함을 의미합니다.

$\dot{q}=J_{_e O}^+w_e^* + N \dot{q_0}$에서 $N=N(J_{_e O})$는 $J_{_e O}N=0$을 충족하는 영 공간 투영 행렬입니다. 말단 장치 운동을 변경하지 않고 임의의 $\dot{q_0}$를 선택하여 일반화 속도를 수정할 수 있게 합니다.

---

### Multi task inverse differential control

특정 궤적을 따르거나 말단 장치 방향에 도달하거나 운동학적 제약조건을 보장하는 작업(task) 또는 운영 공간(operational space) 목표에 대해 자코비언과 작업 속도는 다음과 같이 정의됩니다.

$$
task_i := \{J_i, w_i^*\}
$$

#### With equal priority

모든 $n_t$개의 작업이 우선순위를 가지는 경우 일반화 속도는 아래와 같습니다.

$$
\dot{q} = \begin{bmatrix} J_1 \\ \vdots \\ j_{n_t}\end{bmatrix}^+ \begin{pmatrix} w_1^* \\ \vdots \\ w_{n_t}^*\end{pmatrix}
$$

스택된 자코비언 행렬의 행 계수가 열 계수보다 큰 경우 작업은 $|\bar{w}-\bar{J_{\dot{q}}}|^2$에서 충족됩니다. 일부 작업에 다른 작업보다 더 높은 가중치를 부여하는 방법은 가중 유사 역행렬(weighted pseudo inverse matrix)를 사용하는 것으로 $\bar{J}_w^+=(\bar{J}^TW\bar{J})^{-1}\bar{J}^TW$로 정의됩니다.

#### With prioritization

다른 작업에 비해 특정 작업에 명확하게 우선순위를 부여하는 접근 방식은 연속적인 영공간 투영(consecutive null space projection)을 사용하는 것입니다. $task_1$에 대한 해는 $\dot{q}=J_1^+w_1^*+N_1\dot{q}_0$와 같고 따라서 첫번째 목표를 위반하지 않기 위해서는 다음이 성립해야 합니다.

$$
w_2=J_2\dot{q}, \\
\dot{q}_0=(J_2N_1)^+(w_2^*-J_2J_1^+w_1^*)
$$

$n_t$개의 작업에 대해 해는 재귀적으로 아래와 같이 정의됩니다.

$$
\dot{q}=\sum_{i=1}^{n_t}\bar{N}_i \dot{q}_i
$$

여기서 $\bar{N}_t$는 스택된 자코비언의 영 공간 투영을 의미합니다.

---

### Inverse kinematics

역기구학의 목표는 말단 장치 형상 $\chi_e^*$의 함수로 관절 형상 $q$를 $q=q(\chi_e^*)$와 같이 찾는 것입니다.

#### Analytical solution

고전적인 6자유도 로봇 팔의 경우 해석적 해를 위한 필요 조건은 세 개의 이웃하는 축이 교차하는 것입니다. 기하학적 접근 방식은 매니퓰레이터의 공간 기하학을 여러 평면 문제로 분해하고 기하학적 법칙을 적용하는 것이고 대수적 접근 방식은 변환 행렬을 조작하여 각도를 얻는 것입니다.

#### Numerical solution

계산 능력의 증가와 함께 수치적 접근은 관절 공간 좌표의 차이 $\Delta q$는 해석적 자코비언을 사용하여 말단 장치 좌표의 차이 $\Delta \chi_e$에 $\Delta \chi_e = J_{_e \mathcal{A}} \Delta q$와 같이 직접 매핑하는 방식입니다.

이 관계는 원하는 말단 장치 형상과 시작 형상에 대해 $q^*$가 $|\Delta\chi_e| = |\chi^*_e - \chi_e(q^*)| < \text{tol}$의 특정 허용 오차 내에서 도달할 때까지 이 단계를 반복합니다.

불행히도 이 접근은 문제가 있습니다. 첫째로 목표와 실제 형상 사이의 오차인 $\Delta \chi_e^i$가 커지면 해석적 자코비언에 의해 구현된 오차 선형화는 충분하지 않습니다. 이를 위해 다음과 같이 스케일링하는 것입니다.

$$
q \leftarrow q + k J_{_e \mathcal{A}}^+ \Delta \chi_e
$$

여기서 $0 < k < 1$을 사용하여 선형화의 유효 영역 내에 머물고 오버슈팅이나 발산을 피합니다. 하지만 수렴은 느려집니다. 둘째는 목표가 특이점 위치에 가까운 경우 자코비언 역전은 badly conditioned 문제가 됩니다. 이를 해결하기 위해 감쇠 역행렬을 사용합니다. 또 다른 방식은 자코비언 전치 $q \leftarrow q + \alpha J_{_e \mathcal{A}}^T \Delta \chi_e$를 사용하는 것입니다. 여기서 $\alpha$가 충분히 작다면 수렴을 보장할 수 있습니다.

#### Appropriate Rotation error

이상적으로 최단 경로에서 회전을 허용하는 회전 오차 및 방향을 사용하여 작업하는 것이 목표입니다.

가능한 회전 매개변수화는 angle axis로 회전축은 회전 내내 일정하게 유지되므로 회전 오차는 $\Delta \phi = \Delta \varphi$로 선택합니다. 이는 시작 방향 $C_{SI}(\varphi^t)$에서 목표 방향 $C_{GI}(\varphi^*)$로의 상대 회전 $C_{GS}$를 매개변수화합니다.

$\Delta \varphi$는 $\varphi^*-\varphi^t$가 아니고 각속도 정의가 주어진다면 위의 $q$를 $q \leftarrow q + k_{_p R} J_{_e O_R}^+ \Delta \varphi$로 변경할 수 있습니다.

만약 $k_{pR}$이 매우 작게 취해진다면, 알고리즘은 시작에서 목표 형상으로 "최단 경로"에서 회전할 것입니다.

#### Trajectory control

순수한 역미분학에서 위치 또는 회전에 대한 피드백이 제공되지 않으면 자세가 표류하기 때문에 미리 정의된 공간 궤적을 따르는데 불충분합니다. 따라서 가중 추적 오차 피드백(weighted tracking error feedback)을 통해 안정화할 수 있습니다.

주어진 사전 계획된 위치 $r^*_e(t)$와 속도 $\dot{r}^*_e(t)$를 가진 위치 추적(position tracking)의 경우, 문제는 사소합니다. 피드백 제어 부분은 다음을 0으로 만들어야 합니다.

$$
\Delta r_e^t = r_e^*(t) - r_e(q^t)
$$

다음 궤적 제어기를 초래합니다.

$$
\dot{q}^ = J_{_e O_P}^+(q^t) \cdot (\dot{r}_e^*(t) + k_{P_P}\Delta r_e^t)
$$

여기서 $k_{P_P}$는 실제 위치가 목표 위치로 얼마나 빨리 수렴하는지를 정의하는 위치 피드백(position feedback)을 나타냅니다. 이 알고리즘이 고정 시간 단계인 $\Delta t$를 가진 디지털 제어 문제로 구현되면 고유값 분석을 통해 경계를 제공할 수 있습니다.

---

### Floating base kinematics

<img src="https://velog.velcdn.com/images/devjo/post/4919c8c4-b0b0-495c-a038-730d97c040c0/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

위 그림처럼 사족보행 로봇 및 휴머노이드와 같은 free floating robots는 $n_b$개의 미구동 기저 좌표 $q_b$와 $n_j$개의 구동 관절 좌표 $q_j$로 기술됩니다.

$$
q = \begin{pmatrix} q_b \\ q_j\end{pmatrix}
$$

미구동 기저는 병진 및 회전에서 자유롭습니다.

$$
q_b = \begin{pmatrix} q_{b_P} \\ q_{b_R}\end{pmatrix} \in R^3 \times SO(3)
$$

여기서 위치 $q_{b_P}$와 회전 $q_{b_R}$은 매개변수화될 수 있습니다. 따라서 부유 기저 시스템의 일반화 좌표 벡터의 차원 $n_b + n_j$가 회전의 매개변수화에 따라 달라지며 최소 일반화 좌표 수는 $n_{b_0}=6$입니다.

#### Generalized velocity and acceleration

$SO(3)$에서의 미분은 $R^3$과 다르기 때문에 일반화 속도와 가속도 벡터를 도입합니다.

$$
u = \begin{pmatrix} _IV_B \\ _B \omega_{IB} \\ \dot{\varphi}_1 \\ \vdots \\ \dot{\varphi}_{n_j}\end{pmatrix} \in R^{6+n_j}=R^{n_u}, \\
\dot{u} = \begin{pmatrix} _Ia_B \\ _B \psi_{IB} \\ \ddot{\varphi}_1 \\ \vdots \\ \ddot{\varphi}_{n_j}\end{pmatrix} \in R^{6+n_j}
$$

말단 장치 회전 좌표 $\dot{q}_{b_R}$은 시간 미분으로의 직접적인 매핑이 있고 아래와 같습니다.

$$
u = E_{fb} \cdot \dot{q}, \\
E_{fb} = \begin{bmatrix} I_{3 \times 3} & 0 & 0 \\ 0 & E_{\chi_R} & 0 \\ 0 & 0 & I_{n_j \times n_j}\end{bmatrix}
$$

#### Forward kinematics

부유 기저 $B$에서 시작하는 운동 사슬의 끝에 고정된 점 $Q$의 일반화 속도 $u$와 작업 공간 속도 $_I V_Q$ 사이의 관계는 다음과 같이 유도됩니다.

$$
_I r_{IQ}(q) = _I r_{IB}(q) + C_{IB}(q) \cdot _B r_{BQ}(q)
$$

여기서 회전 행렬 $C_{IB}(q)$는 관성 틀 $I$에 대한 부유 기저 $B$의 방향을 설명하고 $_I r_{IB}(q)$는 관성 틀로 표현된 관성 틀 $I$에 대한 부유 기저 $B$의 위치를 나타냅니다.

#### Contacts and constraints

운동학에서 로봇과 환경 사이의 contacts는 kinematics constraints로 모델링 될 수 있습니다. 환경과 접촉하는 모든 점 $C_i$는 세 제약 조건을 부과합니다.

$$
_I r_{IC_i} = \text{const}, \\
_I \dot{r}_{IC_i} = _I \ddot{r}_{IC_i} = \begin{pmatrix} 0 \\ 0 \\ 0\end{pmatrix}
$$

이러한 접촉 제약 조건은 접촉점 자코비언을 사용하여 일반화 속도 및 가속도로 $_I J_{C_i} u =0, _I J_{C_i} \dot{u} + _I \dot{J}_{C_i} u = 0$으로 표현될 수 있습니다. $n_c$개의 활성 접촉이 있다면 제약 조건들은 단순히 스택됩니다.

---

### 참고 자료

[원본 경로 #1](https://ethz.ch/content/dam/ethz/special-interest/mavt/robotics-n-intelligent-systems/rsl-dam/documents/RobotDynamics2017/RD_HS2017script.pdf)




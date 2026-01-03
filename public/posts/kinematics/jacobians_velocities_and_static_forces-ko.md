---
title: 'Jacobians: velocities and static forces'
date: '2024-02-09'
tags: ['Robotics', 'Kinematics', 'lecture']
---

### Time varying position and orientation

#### Differentiation of position vectors

위치 벡터의 미분은 다음과 같습니다.

$$
{}^B V_Q = \frac{d}{dt} {}^B Q = lim_{\Delta t \rightarrow 0} \frac{{}^B Q(t+\Delta t) - {}^B Q(t)}{\Delta t}
$$

위치 벡터의 속도는 위치 벡터가 나타내는 공간상의 점의 선속도(linear velocity)로 생각할 수 있습니다. 예를 들어 만약 $Q$가 $\{\mathcal{B}\}$에 상대적으로 시간에 따라 변하지 않는다면 계산된 속도는 0이 됩니다. 점의 속도를 설명하는 수치 값은 두 개의 프레임에 의존합니다. 하나는 미분이 수행된 프레임이고, 다른 하나는 결과 속도 벡터가 표현된 프레임입니다.

<img src="https://velog.velcdn.com/images/devjo/post/3692df3c-2cfe-4b36-97b3-f2ed956db4a0/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

하나의 예시를 위 이미지와 함께 만들어보면 고정된 유니버스 프레임 $\{\mathcal{U}\}$, 시속 100마일로 이동하는 기차에 부착된 프레임 $\{\mathcal{T}\}$, 그리고 시속 30마일로 이동하는 자동차에 부착된 프레임 $\{\mathcal{C}\}$가 있다고 가정합니다. 회전 행렬 ${}^{\mathcal{U}} R_{\mathcal{T}}$와 ${}^{\mathcal{U}} R_{\mathcal{C}}$는 알려져 있고 일정합니다.

$$
\begin{aligned}
&\frac{{}^U d}{dt} {}^U P_{CORG} = {}^U V_{CORG}=v_C=30 \hat{X}, \\
&{}^C({}^U V_{TORG}) = {}^C v_T = {}^C_U R_{V_T} = {}^C_U R(100\hat{X}) = {}^U_C R^{-1} 100 \hat{X}
\end{aligned}
$$

벡터 ${}^\mathcal{U} P_{CORG}$의 $\{\mathcal{U}\}$에 대한 미분은 $\{\mathcal{U}\}$ 프레임에서 본 $\mathcal{C}$ 원점의 속도입니다. 문제의 조건에서 $\{\mathcal{C}\}$의 원점 ${CORG}$는 $\{\mathcal{U}\}$의 $\hat{x}$ 방향으로 $30 \text{ mph}$의 속도로 움직입니다.

#### The angular velocity vector

<img src="https://velog.velcdn.com/images/devjo/post/5b779bba-e601-49a5-92de-6407b4ffc807/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

각속도 벡터(angular velocity vector)는 $\Omega$를 사용합니다. 선속도가 점의 속성을 설명하는 반면, 각속도는 물체의 속성을 설명합니다. ${}^{\mathcal{A}} \Omega_{\mathcal{B}}$는 $\{\mathcal{A}\}$에 상대적인 $\{\mathcal{B}\}$ 프레임의 회전을 설명합니다. 물리적으로, 어떤 순간에도 ${}^{\mathcal{A}} \Omega_{\mathcal{B}}$의 방향은 $\{\mathcal{A}\}$에 상대적인 $\{\mathcal{B}\}$의 순간 회전축을 나타내며, ${}^{\mathcal{A}} \Omega_{\mathcal{B}}$의 크기는 회전 속도를 나타냅니다.

#### Linear velocity

<img src="https://velog.velcdn.com/images/devjo/post/5d0ac42d-8d1b-4b9e-9710-cf3cf77524ac/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

강체에 부착된 프레임 $\{\mathcal{B}\}$를 고려합니다. $\{\mathcal{A}\}$에 상대적인 $\{\mathcal{B}\}$의 운동을 설명하고자 합니다. 프레임 $\{\mathcal{B}\}$는 위치 벡터 ${}^{A} P_{BORG}$와 회전 행렬 ${}^{A} R_B$로 $\{\mathcal{A}\}$에 상대적으로 위치합니다. 현재로서는 자세 ${}^{A} R_B$가 시간에 따라 변하지 않는다고 가정합니다.

$$
{}^{\mathcal{A}} \mathcal{V}_Q = {}^{\mathcal{A}} \mathcal{V}_{\mathcal{BORG}} + {}^{\mathcal{A}} R_{\mathcal{B}}{}^{\mathcal{B}} \mathcal{V}_Q
$$

---

### Velocity Propagation

<img src="https://velog.velcdn.com/images/devjo/post/8d2b7e6b-ca47-417c-afb9-eade61d2b684/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

로봇의 링크 선속도(linear velocity)와 각속도(angular velocity)를 계산하는 문제를 고려합니다. 베이스에서부터 시작하여 각 링크의 속도를 순서대로 계산할 수 있습니다. 링크 $i+1$의 속도는 링크 $i$의 속도에 관절 $i+1$에 의해 추가된 새로운 속도 구성 요소를 더한 것과 같습니다.

$$
{}^i \omega_{i+1} = {}^i \omega_i + {}^i \omega_{i+1}
$$

회전 속도를 회전 행렬 ${}^{i} R_{i+1}$을 사용해야 합니다.

$$
{}^{i+1} \omega_{i+1} = {}^{i+1}_i R {}^i \omega_i + \dot{\theta}_{i+1} {}^{i+1} \hat{Z}_{i+1}
$$

원점의 선속도는 프레임 $\{i\}$의 원점의 선속도에 링크 $i$의 회전 속도로 인해 추가된 새로운 구성 요소를 더한 것과 같습니다.

$$
{}^i \mathbf{v}_{i+1} = {}^i \mathbf{v}_i + {}^i \omega_i \times {}^i P_{i+1}
$$

#### Singularities

자코비언 행렬이 비특이(nonsingular)하면 역행렬을 계산하여 주어진 직교 좌표계 속도로부터 필요한 관절 속도를 계산할 수 있습니다.

$$
\dot{\theta} = J^{-1}(\theta) v
$$

특이점(Singularities)이란 매니퓰레이터의 자코비안이 특이 행렬(singular matrix)이 되는 $\theta$ 값의 위치를 말합니다. 매니퓰레이터가 완전히 펴지거나(stretched out) 접혀서(folded back) 말단 장치가 작업 공간의 경계에 있거나 매우 가까이 있을 때, 작업 공간 경계에서 멀리 떨어진 곳에서 발생하며, 일반적으로 둘 이상의 관절 축이 일직선상에 놓일 때 발생합니다.

#### Static forces

매니퓰레이터의 체인 같은 특성은 힘과 모멘트가 한 링크에서 다음 링크로 어떻게 전파되는지를 고려하도록 이끕니다. 링크 $i-1$이 링크 $i$에 가하는 힘을 $\mathbf{f}_i$, 링크 $i-1$이 링크 $i$에 가하는 토크를 $\mathbf{n}_i$로 정의합니다.

정적 평형을 유지하는 데 필요한 관절 토크 $\tau_i$는 관절 축 벡터 ${}^i \hat{Z}_i$와 링크에 작용하는 모멘트 벡터 ${}^i \mathbf{n}_i$의 내적으로 계산됩니다.

$$
\tau_i = {}^{i} \mathbf{n}_i^T {}^{i} \hat{Z}_i
$$

프리즘 관절 $i$의 경우 관절 액추에이터 힘 $\tau_i$는 ${}^i \mathbf{f}_i$와 $\hat{Z}_i$의 내적으로 계산됩니다.

---

### Manipulator Jacobian

공간 자코비안 $J_s(\theta)$는 $\mathbf{V}s = J_s(\theta)\dot{\theta}$를 만족하며, 각 열 $\mathbf{J}_{si}(\theta)$는 고정된 공간 프레임 $\{s\}$로 표현된 나사 축에 해당합니다. 바디 자코비안 $J_b(\theta)$는 $\mathbf{V}b = J_b(\theta)\dot{\theta}$를 만족하며, 각 열 $\mathbf{J}_{bi}(\theta)$는 엔드이펙터 프레임 $\{b\}$로 표현된 나사 축에 해당합니다.

#### Space Jacobian

$n$링크 개방형 체인의 순기구학이 다음과 같은 지수 곱 형태로 표현됩니다.

$$
T(\theta_1, \ldots, \theta_n) = e^{[\mathcal{S}_1]\theta_1} e^{[\mathcal{S}_2]\theta_2} \cdots e^{[\mathcal{S}_n]\theta_n} M
$$

공간 트위스트 $\mathbf{V}_s$는 $[\mathbf{V}_s] = \dot{T} T^{-1}$로 주어지며

$$
\begin{aligned}
&\frac{d}{dt} e^{[S_1]\theta_1} \cdots e^{[S_n]\theta_n}M + e^{[S_1]\theta_1}\frac{d}{dt} e^{[S_2]\theta_2} \cdots e^{[S_n]\theta_n}M + \cdots \\
&=[S_1]\dot{\theta_1}e^{[S_1]\theta_1} \cdots e^{[S_n]\theta_n}M + e^{[S_1]\theta_1}[S_2]\dot{\theta_2}e^{[S_2]\theta_2} \cdots e^{[S_n]\theta_n}M + \cdots
\end{aligned}
$$

위 식을 행렬 형태로 쓰면 다음과 같습니다.

$$
\mathbf{V}_s = \begin{bmatrix} \mathbf{J}_{s1} & \mathbf{J}_{s2}(\theta) & \cdots & \mathbf{J}_{sn}(\theta) \end{bmatrix} \begin{bmatrix} \dot{\theta}_1 \\ \vdots \\ \dot{\theta}_n \end{bmatrix} = J_s(\theta) \dot{\theta}
$$

#### Body Jacobian

바디 자코비안은 엔드이펙터 트위스트 $[\mathbf{V}_b] = T^{-1} \dot{T}$와 관절 속도 $\dot{\theta}$ 사이의 관계를 유도합니다. 이 목적을 위해 순기구학은 다음과 같은 대체 지수 곱 형태로 표현하는 것이 더 편리합니다.

$$
T(\theta) = M e^{[\mathcal{B}_1]\theta_1} e^{[\mathcal{B}_2]\theta_2} \cdots e^{[\mathcal{B}_n]\theta_n}
$$

여기서 $T^{-1} = e^{-[B_n]\theta_n} \cdots e^{-[B_1]\theta_1}M^{-1}$이고 행렬 형태로 쓰면 $\mathbf{V}_b = \begin{bmatrix} \mathbf{J}_{b1}(\theta) & \cdots & \mathbf{J}_{b,n-1}(\theta) & \mathbf{J}_{bn} \end{bmatrix} \begin{bmatrix} \dot{\theta}_1 \\ \vdots \\ \dot{\theta}_n \end{bmatrix} = J_b(\theta) \dot{\theta}$과 같습니다. $J_b(\theta)$와 $J_s(\theta)$는 항상 동일한 랭크(rank)를 가집니다.

#### Alternative Notions of the Jacobian

공간 자코비안과 바디 자코비안은 관절 속도를 엔드이펙터의 트위스트와 연결하는 행렬은 최소한의 좌표 $q$를 사용하여 엔드이펙터의 구성을 표현하는 데 기반을 둔 자코비안의 대안적 개념이 존재합니다.

바디 프레임의 기하학적 자코비안 $J_b$와 방향을 표현하기 위해 지수 좌표 $r = \hat{\omega}\theta$를 사용하는 해석적 자코비안 $J_a$ 사이의 관계를 찾습니다. $\mathbf{V}_b = J_b(\theta)\dot{\theta}$, 여기서 $\mathbf{V}_b = \begin{bmatrix} \omega_b \\ \mathbf{v}b \end{bmatrix}$입니다. $J_b$를 각속도 부분 $J{\omega}$와 선속도 부분 $J{\mathbf{v}}$로 분할합니다.

$$
\mathbf{V}_b = \begin{bmatrix} \omega_b \\ \mathbf{v}_b \end{bmatrix} = \begin{bmatrix} J_{\omega}(\theta) \\ J_{\mathbf{v}}(\theta) \end{bmatrix} \dot{\theta}
$$

최소 좌표 $q = (r, x)$에서, 위치의 시간 미분 $\dot{x}$는 $\mathbf{v}_b$를 고정 좌표로 제공하는 회전 행렬 $R_{sb}(\theta)$를 통해 $\mathbf{v}_b$와 관련됩니다.

$$
\dot{x} = R_{sb}(\theta) \mathbf{v}_b = R_{sb}(\theta) J_{\mathbf{v}}(\theta) \dot{\theta}
$$

시간 미분 $\dot{r}$은 바디 각속도 $\omega_b$와 다음 관계를 가집니다.

$$
\omega_b = A(r)\dot{r}
$$

$A(r)$이 역행렬이 가능하다고 가정하면, $\dot{r}$은 $\omega_b$로부터 얻을 수 있습니다.

$$
\dot{r} = A^{-1}(r)\omega_b = A^{-1}(r) J_{\omega}(\theta) \dot{\theta}
$$

이들을 결합하면 해석적 자코비안 $J_a$는 바디 자코비안 $J_b$와 다음과 같이 관련됩니다.

$$
J_a(\theta) = \begin{bmatrix} A^{-1}(r) & 0 \\ 0 & R_{sb}(\theta) \end{bmatrix} J_b(\theta)
$$

---

### 참고 자료

[원본 경로 #1](https://www.changjiangcai.com/files/text-books/Introduction-to-Robotics-3rd-edition.pdf?utm_source=chatgpt.com)

[원본 경로 #2](https://hades.mech.northwestern.edu/images/7/7f/MR.pdf)


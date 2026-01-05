---
title: 'Robot Control'
date: '2024-02-16'
tags: ['Robotics', 'Kinematics', 'lecture']
---

### Error Dynamics

원하는 관절 위치를 $\theta_d(t)$라고 하고 실제 관절 위치를 $\theta(t)$라고 하면, 관절 오차(joint error)는 다음과 같이 정의됩니다.

$$
\theta_e(t) = \theta_d(t) - \theta(t)
$$

제어된 시스템의 관절 오차 $\theta_e(t)$의 진화를 지배하는 미분 방정식을 오차 동역학(error dynamics)이라고 합니다. 피드백 컨트롤러의 목적은 $t$가 증가함에 따라 $\theta_e(t)$가 0 또는 작은 값으로 수렴하도록 하는 오차 동역학을 만드는 것입니다.

#### Error Response

단위 오차 응답을 초기 조건 $\theta_e(0) = 1$ 및 $\dot{\theta}_e(0) = \ddot{\theta}_e(0) = \cdots = 0$에 대한 제어 시스템의 응답 $\theta_e(t)$, $t > 0$로 정의됩니다. 일반적인 오차 응답 $\theta_e(t)$는 과도 응답(transient response)과 정상 상태 응답(steady-state response)으로 설명될 수 있습니다.

오차 응답이 처음에 최종 정상 상태 오차를 초과하는 경우 오버슈트가 발생하며, 다음과 같이 정의됩니다.

$$
\text{overshoot} = \left| \frac{\theta_{e, \min} - e_{ss}}{\theta_e(0) - e_{ss}} \right| \times 100\%
$$

<img src="https://velog.velcdn.com/images/devjo/post/e681bb9f-dfaf-4e3c-b2e8-e4a79a06cf35/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

그리고 2% Settling Time은 모든 $t \ge T$에 대해 $|\theta_e(t) - e_{ss}| \le 0.02(\theta_e(0) - e_{ss})$인 첫 번째 시간 $T$입니다.

#### Linear Error Dynamics

$$
a_p \theta_e^{(p)} + a_{p-1} \theta_e^{(p-1)} + \cdots + a_2 \ddot{\theta}_e + a_1 \dot{\theta}_e + a_0 \theta_e = c
$$

이 방정식은 $\theta_e$의 $p$차 시간 미분이 존재하기 때문에 $p$차 미분 방정식입니다. 상수 $c$가 0이면 동차(homogeneous)이고, $c \ne 0$이면 비동차(nonhomogeneous)입니다. 동차에서의 특성 방정식은 다음과 같습니다.

$$
s^p + a'_ {p-1} s^{p-1} + \cdots + a'_2 s^2 + a'_1 s + a'_0 = 0
$$

행렬 $\mathbf{A}$의 모든 고유값(roots)이 음의 실수 성분을 가지면 안정적이라고 합니다.

#### First-Order Error Dynamics

질량 $m$의 운동 방정식은 $m \ddot{\theta}_e + b \dot{\theta}_e + k \theta_e = f$와 같으며 질량이 0에 접근하는 극한에서 $\dot{\theta}_e + \frac{k}{b} \theta_e = 0$으로 1차 동역학 형태로 축소됩니다. 따라서 $f=0$인 1차 오차 동역학은 다음과 같습니다.

$$
\dot{\theta}_e(t) + \frac{1}{\tau} \theta_e(t) = 0
$$

여기서 $\tau$는 시정수(time constant)라고 합니다.

---

### Motion Control with Velocity Inputs

일반적으로 로봇 관절에서 힘 또는 토크를 직접 제어할 수 있다고 가정하며, 로봇의 동역학이 이 제어량을 관절 가속도로 변환합니다. 그러나 액추에이터가 스테퍼 모터인 경우와 같이, 관절 속도를 직접 제어할 수 있다고 가정할 수 있는 경우도 있습니다.

#### Single Joint

<img src="https://velog.velcdn.com/images/devjo/post/c75cf33a-226e-41ea-9cd8-299aa9a00eac/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

원하는 관절 궤적 $\theta_d(t)$가 주어지면, 가장 간단한 유형의 제어는 명령된 속도 $\dot{\theta}(t)$를 다음과 같이 선택하는 것입니다.

$$
\dot{\theta}(t) = \dot{\theta}_d(t)
$$

이는 피드백(센서 데이터)이 필요하지 않기 때문에 피드포워드 또는 개루프(open-loop) 컨트롤러라고 불립니다. 하지만 실제로는 피드포워드 제어 법칙 하에서 위치 오차가 시간이 지남에 따라 축적됩니다. 대안적인 전략은 각 관절의 실제 위치를 지속적으로 측정하고 피드백 컨트롤러를 구현하는 것입니다.

P 제어와 1차 오차 동역학에서 $\dot{\theta}(t) = K_p(\theta_d(t) - \theta(t)) = K_p \theta_e(t)$와 같이 피드백 컨트롤러를 정의하고 위치 오차 $\theta_e(t)$에 비례하는 보정 제어량을 생성합니다. 제어 이득 $K_p$는 실제 관절 위치를 원하는 관절 위치로 끌어당기려는 가상 스프링과 같은 역할을 합니다. 정착점 제어($\dot{\theta}_d(t) = 0$)에 대한 오차 동역학은 $\dot{\theta}_e(t) = \dot{\theta}_d(t) - \dot{\theta}(t) = 0 - K_p \theta_e(t) \quad \rightarrow \quad \dot{\theta}_e(t) + K_p \theta_e(t) = 0$이며 1차 동역학이 아닌 큰 $K_p$를 사용하는 대안으로, 오차의 시간 적분에 비례하는 항을 추가하는 비례-적분(Proportional-Integral) 컨트롤러, 또는 PI 컨트롤러를 사용할 수도 있습니다.

$$
\dot{\theta}(t) = K_p \theta_e(t) + K_i \int^t_0 \theta_e(\tau) d\tau
$$

#### Multi-joint Robot

위치 $\mathbf{\theta}_d(t)$와 $\mathbf{\theta}(t)$는 $n$차 벡터이며, 이득 $K_p$와 $K_i$는 $k_p \mathbf{I}$와 $k_i \mathbf{I}$ 형태의 대각 $n \times n$ 행렬입니다. 엔드 이펙터의 트위스트 $\mathbf{V}_b(t)$ (엔드 이펙터 프레임 ${b}$로 표현)를 제어하는 경우, 제어 법칙은 다음과 같습니다.

$$
\mathbf{V}_b(t) = [\text{Ad}_{\mathbf{X}^{-1} \mathbf{X}_d}] \mathbf{V}_d(t) + \mathbf{K}_p \mathbf{X}_e(t) + \mathbf{K}_i \int^t_0 \mathbf{X}_e(\tau) d\tau
$$

---

### Motion Control with Torque or Force Inputs

<img src="https://velog.velcdn.com/images/devjo/post/e2ccbb08-32fe-48b2-88b1-e2cedcba8e41/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

단일 링크에 부착된 단일 모터를 고려합니다.

$$
\tau = M \ddot{\theta} + h(\theta, \dot{\theta})
$$

여기서 $\tau$는 모터의 토크, $M$은 관성, $h(\theta, \dot{\theta})$는 중력 토크 $mgr \cos \theta$와 점성 마찰 $\tau_{\text{fric}} = b\dot{\theta}$를 포함하는 상태에만 의존하는 모든 항을 포함합니다. 일반적인 피드백 컨트롤러는 비례-적분-미분(Proportional-Integral-Derivative) 제어, 또는 PID 제어입니다.

$$
\tau = K_p \theta_e + K_i \int \theta_e(t)dt + K_d \dot{\theta}_e
$$

여기서 $K_p$는 가상 스프링 역할을 하여 위치 오차 $\theta_e$를 줄이려고 합니다. 그리고 $K_d$는 가상 댐퍼 역할을 하여 속도 오차 $\dot{\theta}_e$에 비례하는 감쇠 토크를 제공합니다. 마지막으로 $K_i$는 적분 오차에 비례하는 토크를 제공합니다.

로봇이 수평면($g=0$)에서 움직이고 정착점 제어($\dot{\theta}_d = \ddot{\theta}_d = 0$)를 목표로 한다고 가정합니다. PD 제어 법칙을 동역학에 대입하고 정리하면 2차 오차 동역학은 다음과 같습니다.

$$
M \ddot{\theta}_e + (b + K_d) \dot{\theta}_e + K_p \theta_e = 0
$$

감쇠비 $\zeta = \frac{b + K_d}{2 \sqrt{K_p M}}$ 및 고유 주파수 $\omega_n = \sqrt{K_p/M}$입니다.

3차 오차 동역학은 로봇이 수직면($g>0$)에서 움직인다고 가정합니다. PD 제어만으로는 정착점 제어 시 중력 토크 $mgr \cos \theta$ 때문에 0이 아닌 정상 상태 오차가 발생합니다. 정상 상태 오차를 제거하기 위해 $K_i > 0$인 PID 컨트롤러를 사용합니다. 동역학을 미분하여 3차 오차 동역학을 얻습니다.

$$
M\theta_e^{(3)} + (b + K_d) \ddot{\theta}_e + K_p \dot{\theta}_e + K_i \theta_e = 0
$$

#### Feedforward Control

궤적 추종을 위한 또 다른 전략은 오차를 기다리는 대신 로봇 동역학 모델을 사용하여 사전적으로 토크를 생성하는 것입니다.

$$
\tau(t) = \tilde{M}(\theta_d(t)) \ddot{\theta}_d(t) + \tilde{h}(\theta_d(t), \dot{\theta}_d(t))
$$

모델이 정확하고 초기 오차가 없으면 로봇은 원하는 궤적을 정확하게 따릅니다. 그러나 모델 오차가 항상 존재하므로 피드포워드 제어는 항상 피드백과 함께 사용됩니다. PID 제어를 로봇 동역학 모델 ${\tilde{M}, \tilde{h}}$과 결합하여 다음과 같은 선형 오차 동역학을 달성하는 것이 목표입니다.

$$
\ddot{\theta}_e + K_d \dot{\theta}_e + K_p \theta_e + K_i \int \theta_e(t)dt = 0
$$

여기서 $\tilde{h}(\theta, \dot{\theta})$ 항은 상태에 비선형적으로 의존하는 동역학을 상쇄합니다. 관성 모델 $\tilde{M}(\theta)$은 원하는 관절 가속도를 관절 토크로 변환하여 단순한 선형 오차 동역학을 실현합니다.

---

### Force Control

작업이 엔드 이펙터에서 움직임을 생성하는 것이 아니라 환경에 힘과 토크를 가하는 것일 때, 힘 제어가 필요합니다. 순수한 힘 제어는 환경이 모든 방향에서 저항력을 제공할 때만 가능합니다. 이상적인 힘 제어에서 엔드 이펙터에 가해지는 힘은 엔드 이펙터에 가해지는 외란 움직임의 영향을 받지 않습니다. 조인트 토크 $\mathbf{\tau}$와 환경에 의해 로봇에 가해지는 렌치 $\mathbf{F}_{\text{tip}}$ 간의 동역학 관계는 다음과 같습니다.

$$
\mathbf{\tau} = \tilde{\mathbf{g}}(\mathbf{\theta}) + \mathbf{J}^T(\mathbf{\theta})\mathbf{F}_{\text{tip}}
$$

피드포워드 항과 중력 보상을 포함하는 PI 힘 제어기는 다음과 같습니다.

$$
\mathbf{\tau} = \tilde{\mathbf{g}}(\mathbf{\theta}) + \mathbf{J}^T(\mathbf{\theta})\left(\mathbf{F}_d + \mathbf{K}_{fp}\mathbf{F}_e + \mathbf{K}_{fi} \int \mathbf{F}_e(t)dt\right)
$$

이 법칙을 오차 동역학 $\mathbf{K}_{fp}\mathbf{\dot{F}}e + \mathbf{K}{fi}\mathbf{F}_e = \mathbf{0}$가 되어 오차 $\mathbf{F}_e$가 0으로 수렴합니다.

#### Hybrid Motion–Force Control

작업 공간이 $n$차원이라면, 우리는 $2n$개의 힘과 움직임 중에서 $n$개를 지정할 자유가 있습니다. 나머지 $n$개는 환경에 의해 결정됩니다. 특히 흥미로운 경우는 환경이 $k$ 방향으로는 무한히 강성(rigid constraints)이고 $n-k$ 방향으로는 제약이 없는 경우입니다. 이 경우, 환경과의 접촉은 로봇이 자유롭게 힘을 가할 수 있는 $k$ 방향과 자유로운 움직임의 $n-k$ 방향을 선택합니다.

환경이 강체라고 가정하고, 속도에 대한 $k$개의 자연적 제약이 태스크 공간에서 다음과 같은 Pfaffian 제약으로 표현된다고 가정합니다. $\mathbf{V}$는 트위스트입니다.

$$
\mathbf{A}(\mathbf{\theta})\mathbf{V} = \mathbf{0}
$$

하이브리드 모션-힘 제어기는 태스크 공간 모션 제어기와 태스크 공간 힘 제어기의 합으로 다음과 같습니다.

$$
\begin{aligned}
&\underbrace{\mathbf{P}(\mathbf{\theta})\left(\tilde{\mathbf{\Lambda}}(\tilde{\mathbf{\theta}})(\cdots) + \tilde{\mathbf{\eta}}(\mathbf{\theta}, \mathbf{V}_b)\right)}_{\text{모션 제어}} \\
&\underbrace{(\mathbf{I} - \mathbf{P}(\mathbf{\theta}))\left(\mathbf{F}_d + \mathbf{K}_{fp}\mathbf{F}_e + \mathbf{K}_{fi} \int \mathbf{F}_e(t)dt\right)}_{\text{힘 제어}}
\end{aligned}
$$

#### Impedance Control

임피던스는 외란 힘의 함수로서 엔드포인트 움직임의 변화를 특징짓습니다. 이상적인 모션 제어는 높은 임피던스 상황이고 이상적인 힘 제어는 반대로 낮은 임피던스 상황에 해당합니다.

1자유도 로봇의 동역학은 다음과 같이 쓸 수 있습니다.

$$
m\ddot{x} + b\dot{x} + kx = f
$$

여기서 $x$는 위치, $m$은 질량, $b$는 댐핑, $k$는 강성, $f$는 사용자가 가하는 힘입니다. 임피던스는 위치 섭동에서 힘으로의 전달 함수 $Z(s) = F(s)/X(s)$입니다. 어드미턴스는 임피던스의 역수입니다.

로봇은 엔코더와 타코미터를 사용하여 $\ddot{\mathbf{x}}, \dot{\mathbf{x}}, \mathbf{x}$를 추정하고, 원하는 상호 작용 힘 $-\mathbf{f}_{\text{ext}}$을 렌더링하도록 관절 토크를 정밀하게 제어합니다.

$$
\mathbf{\tau} = \mathbf{J}^T(\mathbf{\theta})\left( \underbrace{\tilde{\mathbf{\Lambda}}(\tilde{\mathbf{\theta}})\ddot{\mathbf{x}} + \tilde{\mathbf{\eta}}(\mathbf{\theta}, \dot{\mathbf{x}})}_{\text{팔 동역학 보상}} - \underbrace{(\mathbf{M}\ddot{\mathbf{x}} + \mathbf{B}\dot{\mathbf{x}} + \mathbf{K}\mathbf{x})}_{\mathbf{f}_{\text{ext}}} \right)
$$

사용자가 가하는 힘 $\mathbf{f}_{\text{ext}}$은 손목 로드 셀(wrist load cell)로 감지되며, 로봇은 엔드 이펙터 가속도 $\ddot{\mathbf{x}}_d$로 반응합니다.

$$
\ddot{\mathbf{x}}_d = \mathbf{M}^{-1}(\mathbf{f}_{\text{ext}} - \mathbf{B}\dot{\mathbf{x}} - \mathbf{K}\mathbf{x})
$$

원하는 관절 가속도 $\ddot{\mathbf{\theta}}_d$는 $\ddot{\mathbf{\theta}}_d = \mathbf{J}^{\dagger}(\mathbf{\theta})(\ddot{\mathbf{x}}_d - \dot{\mathbf{J}}(\mathbf{\theta})\dot{\mathbf{\theta}}$)로 계산되며, 역동역학을 사용하여 명령된 관절 힘/토크 $\mathbf{\tau}$를 계산합니다.

---

### Linear Control

#### Feedback and closed loop control

매니퓰레이터의 관절이 미리 정해진 위치 궤적($\mathbf{\theta}_d$)을 따르도록 하고 싶지만, 액추에이터는 토크($\mathbf{\tau}$) 단위로 명령되므로, 원하는 움직임을 실현할 적절한 액추에이터 명령을 계산하기 위해 일종의 제어 시스템을 사용해야 합니다.

$$
\mathbf{\tau} = \mathbf{M}(\mathbf{\theta}_d)\mathbf{\ddot{\theta}}_d + \mathbf{V}(\mathbf{\theta}_d, \mathbf{\dot{\theta}}_d) + \mathbf{G}(\mathbf{\theta}_d)
$$

Open-Loop에서는 로봇의 동역학 방정식을 사용하여 원하는 궤적을 실현하는 데 필요한 토크를 계산하는 것에 대해 동역학 모델의 불완전성과 외란의 존재로 인해 이러한 방식은 실제 응용에서 비실용적입니다. 왜냐하면 관절 센서로부터의 피드백을 전혀 사용하지 않기 때문입니다. 따라서 Closed-Loop에서 관절 센서의 피드백, 즉 servo error를 계산에 사용하게 됩니다.

$$
\begin{aligned}
&\mathbf{e} = \mathbf{\theta}_d - \mathbf{\theta}, \\
&\mathbf{\dot{e}} = \mathbf{\dot{\theta}}_d - \mathbf{\dot{\theta}}
\end{aligned}
$$

#### Second Order systems

단순한 기계 시스템인 댐퍼가 달린 스프링-질량 시스템 을 고려해 봅시다. 블록에 작용하는 힘에 대한 자유 물체 다이어그램은 운동 방정식을 산출합니다.

$$
m\ddot{x} + b\dot{x} + kx = 0
$$

두 근 $s_1$과 $s_2$의 위치는 시스템의 움직임 특성을 결정합니다. 실수 및 서로 다른 근($x(t) = c_1e^{s_1t} + c_2e^{s_2t}$)을 가진다면 마찰이 지배적이며 느리고 비진동적인(nonoscillatory) 거동을 보입니다. 복소수 근($x(t) = re^{\lambda t} \sin(\mu t + \phi)$)에서는 강성이 지배적이며 진동적인(oscillatory) 거동을 보입니다.

#### Control Law Partitioning

제어기를 모델 기반 부분과 서보 부분으로 분할하여 제어기 구조를 다르게 구성할 수 있습니다. 시스템이 단위 질량처럼 보이도록 시스템 매개변수($m, b, k$)를 사용하여 토크 명령 $\tau$를 계산합니다.

$$
f = \alpha f' + \beta
$$

단위 질량($m=1$)처럼 보이게 하려면

$$
\begin{aligned}
&\alpha = m, \\
&\beta = b\dot{x} + kx
\end{aligned}
$$

이를 설정하고 $\ddot{x} = f'$로 방정식이 단순화됩니다. 이 시스템을 제어하기 위해 서보 제어로 $f' = -k_v \dot{x} - k_p x$를 피드백하여 $\ddot{x} + k_v \dot{x} + k_p x = 0$가 Closed-Loop의 오차 동역학이 됩니다.

#### Disturbing Rejection

제어 시스템의 목적 중 하나는 외란 제거(disturbance rejection)를 제공하는 것입니다. 즉, 외부 외란 힘 $f_{\text{dist}}$가 존재하는 경우에도 성능을 유지(오차 최소화)하는 것입니다. 우선 외란 힘 $f_{\text{dist}}$가 추가된 상태에서 오차 방정식이 다음과 같습니다.

$$
\ddot{e} + k_v \dot{e} + k_p e = f_{\text{dist}}
$$

$f_{\text{dist}}$가 상수라고 가정하고 정상 상태 분석을 수행하면, 정상 상태 오차는 다음과 같습니다.

$$
e = \frac{f_{\text{dist}}}{k_p}
$$

따라서 위치 이득 $k_p$이 높을수록 정상 상태 오차는 작아집니다. 정상 상태 오차를 제거하기 위해 적분 항을 제어 법칙에 추가할 수 있습니다.

$$
f' = \ddot{x}_d + k_v \dot{e} + k_p e + k_i \int e dt
$$

이 제어 법칙은 PID 제어 법칙이라고 불립니다. 적분 항을 포함하면 오차 방정식은 3차 시스템이 됩니다. 정상 상태에서 $\dot{e} = 0$이 되어 $e=0$이 됩니다.

---

### Nonlinear and Time varying systems

비선형성이 심하지 않을 때 국소 선형화(local linearization)를 사용할 수 있지만, 매니퓰레이터 제어 문제는 작업 영역의 넓은 영역을 끊임없이 이동하므로 모든 영역에 유효한 선형화를 찾을 수 없어 이 접근 방식에 적합하지 않습니다. 비선형 방정식을 직접 다루는 대신 제어 법칙에 비선형 항을 사용하여 제어 대상 시스템의 비선형성을 정확히 상쇄하도록 설계할 수 있습니다.

예를 들어 용수철 관계가 $f = qx^3$인 비선형 스프링을 포함하는 시스템을 고려합니다.

$$
m\ddot{x} + b\dot{x} + qx^3 = f
$$

여기서 모델 기반 부분은 $\alpha = m, \beta = b\dot{x} + qx^3$이고 서보 부분은 $f' = \ddot{x}_d + k_v \dot{e} + k_p e$와 같습니다.

#### Multi input, Multi output

매니퓰레이터 제어 문제는 다중 입력, 다중 출력(MIMO) 문제입니다.

$$
\mathbf{F} = \mathbf{\alpha}\mathbf{F}' + \mathbf{\beta}
$$

여기서 $F, F', \beta$는 $n \times 1$ 벡터이고 $\alpha$는 $n \times n$ 행렬입니다. $\alpha$와 $\beta$가 올바르게 선택되면, $F'$ 입력으로부터 시스템은 $n$개의 독립적인 단위 질량처럼 보입니다. 이러한 이유로, $\alpha F' + \beta$ 형태의 모델 기반 제어 법칙을 선형화 및 비커플링(decoupling) 제어 법칙이라고 합니다.

---

### 참고 자료

[원본 경로 #1](https://www.changjiangcai.com/files/text-books/Introduction-to-Robotics-3rd-edition.pdf?utm_source=chatgpt.com)

[원본 경로 #2](https://hades.mech.northwestern.edu/images/7/7f/MR.pdf)

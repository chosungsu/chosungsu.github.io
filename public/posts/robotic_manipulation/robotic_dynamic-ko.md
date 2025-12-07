---
title: 'Robotic Dynamics'
date: '2024-12-04'
tags: ['Robotics', 'Manipulation', 'lecture']
---

### Lagrange-Euler Dynamics

제어 설계를 위해서는 시스템의 동적 동작을 나타내는 수학적 모델이 필수적입니다. 이 절에서는 로봇 매니퓰레이터의 운동 동역학 방정식을 유도합니다. 접근 방식은 매니퓰레이터의 운동 에너지(Kinetic Energy)와 위치 에너지(Potential Energy)를 유도한 다음, 라그랑주 운동 방정식을 사용하는 것입니다.

구심력은 질량 $m$이 반경 $r$에서 각속도 $\mathbf{\Omega}$로 궤도 운동을 할 때 $F_{cent} = \frac{mv^2}{r}=m\omega^2r$와 같습니다. 그리고 회전 운동 에너지는 $K_{rot}=\frac{1}{2} I \omega^2$과 같습니다.

#### Lagrange’s Equations of Motion

$$
\frac{d}{dt} \left( \frac{\partial L}{\partial \dot{\mathbf{q}}} \right) - \frac{\partial L}{\partial \mathbf{q}} = \tau
$$

여기서 $\mathbf{q}$는 일반화 좌표 $q_i$의 $n$-벡터이며, 로봇에서는 조인트 변수 벡터(조인트 각도 $\theta_i$ 및 조인트 오프셋 $d_i$)가 됩니다. 우항은 조인트 각도에 해당하는 토크 $\tau_i$와 조인트 오프셋에 해당하는 힘 $f_i$로 구성됩니다.

라그랑지안 $L$은 운동 에너지 $K$와 위치 에너지 $P$의 차이입니다.

$$
L = K - P
$$

---

### Structure and Properties of the Robot Equation

현실적인 로봇 팔 모델에는 마찰과 외란이 항상 포함되므로, 로봇 매니퓰레이터 동역학은 다음과 같이 일반화됩니다.

$$
\mathbf{M}(\mathbf{q}) \ddot{\mathbf{q}} + \mathbf{V}(\mathbf{q}, \dot{\mathbf{q}}) + \mathbf{G}(\mathbf{q}) + \mathbf{F}(\dot{\mathbf{q}}) + \mathbf{\tau}_d = \mathbf{\tau}
$$

여기서 동역학은 $\mathbf{N}(\mathbf{q}, \dot{\mathbf{q}})$를 비선형 항으로 나타내어 다음과 같이 작성됩니다.

$$
\mathbf{M}(\mathbf{q}) \ddot{\mathbf{q}} + \mathbf{N}(\mathbf{q}, \dot{\mathbf{q}}) + \mathbf{\tau}_d = \mathbf{\tau}
$$

관성 행렬은 $\mathbf{M}(\mathbf{q})$는 항상 대칭 행렬($m_{jk} = m_{kj}$)이며 운동 에너지 $K = \frac{1}{2} \dot{\mathbf{q}}^T \mathbf{M}(\mathbf{q}) \dot{\mathbf{q}}$가 양수이므로 양의 정부호(Positive Definite)입니다. 그리고 위아래로 유계입니다. 즉, $\mu_1 \mathbf{I} \le \mathbf{M}(\mathbf{q}) \le \mu_2 \mathbf{I}$인 스칼라 $\mu_1, \mu_2$가 존재합니다.

#### Quadratic in $\dot{\mathbf{q}}$

코리올리/구심력 벡터 $\mathbf{V}(\mathbf{q}, \dot{\mathbf{q}})$는 조인트 속도 $\dot{\mathbf{q}}$에 대해 이차 함수입니다.

$$
\Vert \mathbf{V}(\mathbf{q}, \dot{\mathbf{q}}) \Vert \le v_b(\mathbf{q}) \Vert\dot{\mathbf{q}}\Vert^2
$$

회전 팔의 경우, $v_b$는 상수입니다. 직선 조인트가 있는 팔의 경우, $v_b(\mathbf{q})$는 $\mathbf{q}$의 함수일 수 있습니다.

#### 중력 항, 마찰 항, 외란 항

$\mathbf{G}(\mathbf{q})=\frac{\partial P}{\partial q}$로 중력 벡터는 $\mathbf{q}$에만 의존하며 $\dot{\mathbf{q}}$에는 의존하지 않습니다.

마찰은 일반적으로 점성 마찰 $\mathbf{F}_v \dot{\mathbf{q}}$와 동적 마찰 $\mathbf{F}_d \text{sgn}(\dot{\mathbf{q}})$ 항으로 모델링됩니다.

$$
\mathbf{F}(\dot{\mathbf{q}}) = \mathbf{F}_v \dot{\mathbf{q}} + \mathbf{F}_d(\dot{\mathbf{q}})
$$

그리고 외란 $\mathbf{\tau}_d$는 일반적으로 다음과 같이 유계라고 가정합니다.

$$
\Vert\mathbf{\tau}_d\Vert \le d
$$

---

### 참고 자료

[원본 경로 #1](https://lewisgroup.uta.edu/FL%20books/Robot_Manipulator_Control_Theory_and_Practice_-_Frank_L.Lewis-%20small.pdf)


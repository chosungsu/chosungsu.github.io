---
title: 'Computed Torque Control'
date: '2024-12-11'
tags: ['Robotics', 'Manipulation', 'lecture']
---

### Path Generation

로봇 팔이 따라야 할 미리 정해진 경로 $\mathbf{q}_d(t)$가 주어져 있다고 가정합니다. 이 원하는 경로 또는 궤적을 매니퓰레이터가 따르도록 만드는 제어 방식을 설계합니다. 궤적 계획(Trajectory Planning)은 충돌 회피, 액추에이터 포화 등에 대한 고려 사항을 포함하는 별도의 설계 문제입니다.

#### Converting Cartesian Trajectories to Joint Space

로봇 응용 분야에서 원하는 작업은 보통 작업 공간(workspace) 또는 카르테시안 공간에서 지정됩니다. 그러나 궤적 추종 제어는 팔 동역학이 더 쉽게 공식화되는 조인트 공간(Joint Space)에서 수행하는 것이 용이합니다.

따라서 카르테시안 궤적이 주어졌을 때 조인트 공간 궤적 $\mathbf{q}_d(t)$를 찾는 것이 중요합니다. 이는 역기구학(Inverse Kinematics)을 사용하여 수행됩니다. 이 변환은 유일하지 않을 수 있습니다.

#### Polynomial Path Interpolation

궤적은 일반적으로 컴퓨터 메모리에 저장할 수 있는 경유 지점 $\mathbf{q}(t_k)$의 시퀀스로 저장됩니다. 대부분의 로봇 제어 방식은 연속적인 원하는 궤적 $\mathbf{q}_d(t)$을 요구하므로 지점들을 연속적인 궤적으로 변환해야 합니다.

시간 간격 $[t_k, t_{k+1}]$에서 원하는 위치 $\mathbf{q}_d(t)$와 속도 $\dot{\mathbf{q}}_d(t)$가 경유 지점과 일치하도록 하려면, 4개의 자유 변수를 갖는 3차 보간 다항식을 사용해야 합니다.

$$
\begin{aligned}
&\mathbf{q}_d(t_k) = \mathbf{q}(t_k), \dot{\mathbf{q}}_d(t_k) = \dot{\mathbf{q}}(t_k), \\
&\mathbf{q}_d(t_{k+1}) = \mathbf{q}(t_{k+1}), \dot{\mathbf{q}}_d(t_{k+1}) = \dot{\mathbf{q}}(t_{k+1})
\end{aligned}
$$

이 방법은 각 샘플 기간에서 가속도가 선형이 되도록 합니다.

#### Linear Function with Parabolic Blends, LFPB

실제 로봇은 액추에이터가 공급할 수 있는 토크에 상한선이 있습니다. 선형 시스템에서 이는 일정한 가속도를 의미합니다. 따라서 각 샘플 기간 내에서 일정한 가속도를 고집하는 것이 바람직한 경우가 많습니다.

---

### Computed-Torque Control

계산 토크 제어는 매우 효과적인 로봇 컨트롤러를 유도하는 틀을 제공하며, 고전적인 독립 조인트 제어와 현대적인 설계 기법을 통합하는 배경을 마련합니다.

내부 전향 루프에서 로봇 팔 동역학 방정식은 다음과 같습니다.

$$
\mathbf{M}(\mathbf{q}) \ddot{\mathbf{q}} + \mathbf{N}(\mathbf{q}, \dot{\mathbf{q}}) + \mathbf{\tau}_d = \mathbf{\tau}
$$

원하는 궤적 $\mathbf{q}_d(t)$를 추종하도록 추적 오차를 $\mathbf{e}(t) = \mathbf{q}_d(t) - \mathbf{q}(t)$로 정의하고, 이를 두 번 미분하여 $\ddot{\mathbf{e}}$를 계산한 후, $\ddot{\mathbf{q}}$에 대한 식을 대입하면 다음과 같은 궤적 오차 동역학을 얻습니다.

$$
\ddot{\mathbf{e}} = \mathbf{u} - M^{-1}\mathbf{\tau}_d
$$

#### PD Outer-Loop Design

보조 제어 신호 $\mathbf{u}(t)$를 PD(비례-미분) 피드백으로 선택하는 것이 일반적입니다.

$$
\mathbf{u}(t) = -\mathbf{K}_v \dot{\mathbf{e}} - \mathbf{K}_p \mathbf{e}
$$

최종 로봇 입력은 다음과 같습니다.

$$
\mathbf{\tau} = \mathbf{M}(\mathbf{q}) (\ddot{\mathbf{q}}_d + \mathbf{K}_v \dot{\mathbf{e}} + \mathbf{K}_p \mathbf{e}) + \mathbf{N}(\mathbf{q}, \dot{\mathbf{q}})
$$

---

### Digital Robot Control

복잡한 로봇 제어 방식은 계산량이 많기 때문에 일반적으로 디지털 신호 처리기(DSP)에서 디지털 제어 법칙으로 구현됩니다. 디지털 로봇 제어는 샘플러와 영차 홀드(ZOH)를 사용하여 구현됩니다.

$$
\mathbf{\tau}_k = \mathbf{M}(\mathbf{q}_k) [\ddot{\mathbf{q}}_k(d) + \mathbf{K}_v \dot{\mathbf{e}}_k + \mathbf{K}_p \mathbf{e}_k] + \mathbf{N}(\mathbf{q}_k, \dot{\mathbf{q}}_k)
$$

PD 디지털 제어 법칙이 로봇 팔에 적용될 때 최대 샘플링 주기 $T_M$ 미만의 모든 $T$에 대해 오차 궤적이 유계($\Vert \mathbf{e}(t)\Vert \le L$)를 만족하는 경우 오차는 $L$에 가까운 유계($\Vert \mathbf{e}(t)\Vert \le L + r$)를 유지합니다.

#### Joint Velocity Estimates

실제로는 관절 위치를 인코더로 측정하고 조인트 속도를 추정합니다. 단순한 오일러 근사 $\dot{\mathbf{q}}_k = \frac{\mathbf{q}_k - \mathbf{q}_{k-1}}{T}$는 센서 잡음을 증폭시키기 때문에 실패할 가능성이 높습니다.

잡음을 거부하기 위해 필터링된 미분(Filtered Derivative)을 사용하여 속도 추정치 $\mathbf{v}_k$를 계산합니다.

$$
\mathbf{v}_k = \nu \mathbf{v}_{k-1} + \frac{\mathbf{q}_k - \mathbf{q}_{k-1}}{T}
$$

여기서 $\nu$는 설계 매개변수입니다. 작은 $\nu$ 값은 빠른 폴을 의미하며, 잡음을 거부하는 데 도움이 되는 고주파 통과 필터링을 제공합니다.

---

### Neural Network Control

최근 몇 년 동안 신경망(Neural Networks, NNs)을 모방하는 피드백 제어 시스템을 설계하기 위한 많은 노력이 있었습니다. 특히, 제어 대상 플랜트의 수학적 모델이 필요 없는 범용 모델-프리 컨트롤러(universal model-free controllers)에 대한 관심이 높습니다.

피드백 제어에 NN이 유용한 두 가지 핵심 특징은 범용 근사 속성(universal approximation property)과 학습 능력(learning capability)입니다. 학습 능력은 가중치가 튜닝 가능하여 컨트롤러 성능을 향상시킬 수 있다는 사실에서 비롯됩니다.

범용 근사 속성은 비선형 네트워크 구조가 선형 적응 로봇 컨트롤러보다 로봇 제어에 더 적합하게 만드는 주요 특징입니다. 적응 제어는 일반적으로 회귀 행렬(regression matrix)의 결정에 의존하며, 이는 매개변수의 선형성(Linearity In the Parameters, LIP)을 요구합니다. 그러나 NN은 이러한 제약 없이 미지의 비선형 함수를 근사할 수 있습니다. 다층 신경망은 전방향(feedforward) 구조를 가지며 내부 동역학이 없어 정적(static)이라고 합니다.

$$
\mathbf{y} = \mathbf{W}^T \mathbf{\sigma}(\mathbf{V}^T \mathbf{x})
$$

비선형(NLIP)이기 때문에 폐루프 피드백 시스템에서 안정성과 유계 가중치를 보장하는 튜닝 알고리즘을 유도하기 어려웠습니다. 적절하고 엄격한 접근 방식은 테일러 급수를 사용하는 것입니다. 함수 추정 오차 $\tilde{\mathbf{f}}$를 다음과 같이 정의합니다.

$$
\tilde{\mathbf{f}} = \mathbf{f} - \hat{\mathbf{f}}
$$

첫 번째 레이어 가중치 $\mathbf{V}$를 고정하고 두 번째 레이어 가중치 $\mathbf{W}$만 튜닝하면, NN은 하나의 조정 가능한 가중치 레이어만 갖게 되며, 이는 매개변수에서 선형(LIP)입니다.

$$
\mathbf{y} = \mathbf{W}^T \boldsymbol{\phi}(\mathbf{x})
$$

또는 RBF NN은 구조화된 비선형 네트워크의 한 유형으로, 가우시안 함수를 활성화 함수로 사용합니다.

$$
\sigma_j(\mathbf{x}) = e^{-\frac{1}{2}(\mathbf{x} - \bar{\mathbf{x}_j})^T \mathbf{P}_j^{-1} (\mathbf{x} - \bar{\mathbf{x}_j})}
$$

#### Robot Arm Dynamics and Error System

로봇 팔과 같은 라그랑주 시스템(Lagrangian Systems)의 동역학은 제어에 유리한 중요한 물리적, 구조적, 수동성(Passivity) 속성을 갖습니다.

$$
\mathbf{M}(\mathbf{q}) \ddot{\mathbf{q}} + \mathbf{V}_m(\mathbf{q}, \dot{\mathbf{q}}) \dot{\mathbf{q}} + \mathbf{G}(\mathbf{q}) + \mathbf{F}(\dot{\mathbf{q}}) + \mathbf{\tau}_d = \mathbf{\tau}
$$

그리고 오차는 $\mathbf{e}(t) = \mathbf{q}_d(t) - \mathbf{q}(t)$입니다. 이를 필터링하면 $\mathbf{r}(t) = \dot{\mathbf{e}} + \mathbf{\Lambda} \mathbf{e}$가 됩니다. 로봇 동역학을 $\mathbf{r}(t)$에 대해 다시 작성하면 다음과 같습니다.

$$
\mathbf{M} \dot{\mathbf{r}} = -\mathbf{V}_m\mathbf{r} - \tau + \mathbf{f} + \tau_d
$$

computed torque control 식이 $\mathbf{\tau} = \hat{\mathbf{f}} + \mathbf{K}_v \mathbf{r} - \mathbf{v}$임을 사용하면 위 식은 closed loop error가 $\mathbf{M} \dot{\mathbf{r}} = - (\mathbf{K}_v \mathbf{r} + \mathbf{V}_m \mathbf{r}) + \tilde{\mathbf{f}} + \tau_d + \mathbf{v}$와 같이 정의될 수 있습니다.

---

### 참고 자료

[원본 경로 #1](https://lewisgroup.uta.edu/FL%20books/Robot_Manipulator_Control_Theory_and_Practice_-_Frank_L.Lewis-%20small.pdf)


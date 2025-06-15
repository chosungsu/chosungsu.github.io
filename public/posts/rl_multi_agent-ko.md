---
title: 'Safe multi-agent navigation guided by goal-conditioned safe reinforcement learning'
date: '2025-02-25'
tags: ['reinforcement learning', 'paper review']
---

### Abstract

네비게이션은 위험한 환경에서 작동하는 자율 시스템에 필수적입니다. 전통적인 계획 방법(Planning)은 장기적인 경로 계획(Long-Horizon Tasks) 문제를 해결하는 데 효과적으로 사용되어 왔으나, 이는 Graph representation의 한계로 제한적입니다. 반면 안전 강화학습(Safe Reinforcement Learning)은 이러한 문제를 해결하기 위해 복잡한 행동을 수동적인 휴리스틱 없이 학습할 수 있지만 Goal Conditioned 및 Multi Agent Scenario에서 어려움이 발생한다고 알려져 있습니다. 본 논문에서는 Safe RL로 Goal Conditioned 학습하고 누적 거리 및 안전 수준을 학습된 value function을 사용하여 self training을 통해 해결하는 방법을 제안하고 있습니다.

---

### Introduction

<img src="https://velog.velcdn.com/images/ski06043/post/edc8e62c-6d22-4a15-8fbc-d7bc222aa77e/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

실제 환경에서는 자율 에이전트가 먼 위치까지 안전하게 이동해야 하고, 그렇지 않을 경우 상당한 피해가 예상됩니다. 최근 Multi Agent Path Finding, 즉 MAPF관련 연구에서는 단일 에이전트 문제로 분해해서 경로 계획을 생성하도록 제안하기도 합니다. 하지만 그런 접근법은 환경에 대한 구조화된 그래프(Structed Graph Representation)에 접근이 가능해야 하고 유효한 노드 간선 뿐만 아니라 Safety label과 이동시간 등 매우 유용한 정보가 주어져야 한다는 가정이 포함됩니다.

반면 Deep Reinforcement Learning과 같은 학습 기반 접근법은 이미지처럼 고차원 정보에서 State Utility를 학습하는 데 강점이 있습니다. 특히 Goal Conditioned RL은 네비게이션 및 조작 등 에이전트의 특정 목표를 달성하도록 하는 학습에 효과적이라고 합니다. 하지만 Long-Horizon Tasks는 여전히 어려운 연구과제 중 하나라고 합니다.

본 논문에서는 앞선 Abstract에서 언급한 내용대로 제안하고 사용자 선호도에 따라 더 빠른 경로와 안전한 경로 간의 균형을 조절하는 유연성을 제공합니다.

---

### PRELIMINARIES

__1.목표 조건부 강화학습(Goal Conditioned Reinforcement Learning, GCRL)__

마르코프 결정 프로세스(MDP) (S, A, T, R, γ)는 상태 공간 S, 행동 공간 A, 전이 확률 T, 보상 R, 할인 인자 γ로 구성됩니다. 본 논문에서는 확장된 MDP인 (S, A, P, R, γ)를 사용하여 목표 조건부 강화학습을 정의합니다. 여기서 P($s_{t+1}|s_t, a_t, s_g$)는 목표 조건부 상태 전이 확률을 나타내며, R($s_t, a_t, s_g$)은 목표 조건부 보상함수를 나타냅니다.

에이전트의 목표는 현재 상태 $s$, 목표 $s_g$에 조건부 π($a∣s,s_g$)를 학습하여 기대 누적 보상을 최대화하는 것이고 이 때 보상함수 $R$는 목표에 따라 달라지며 행동 $a$가 원하는 목표에 얼마나 부합하는지를 반영합니다.

__2.브릿지 플래닝과 단일 에이전트 RL__

Long-Horizon Tasks 문제를 해결하기 위하여 Search on Replay Buffer(SoRB)를 제안한 RL과 단일 에이전트 Planning을 결합한 실험이 있었습니다. 이 환경에서는 R($s, a, s_g$) = -1, γ = 1로 정의하며 목표 조건부 $\pi$($a∣s,s_g$)와 이에 대응하는 가치 함수 V($s, s_g$)를 표준 off-policy RL을 사용해서 학습하였습니다.

$V(s,s_g) = -d_{sp}(s,s_g)$와 같이 가치 함수가 상태 s, 목표 s_g의 거리를 근사할 수 있는데, 여기서 $d_{sp}(s,s_g)$는 상태 $s$에서 목표 상태 $s_g$까지 최단 경로의 거리(또는 최적 정책 $\pi$를 따를 때 목표 상태 $s_g$에 도달하는 데 필요한 예상 단계 수)이다.

SoRB는 이후 Replay Buffer에서 샘플링한 상태들이나 상태공간에서 무작위로 샘플링한 상태들로부터 가중치가 있는 방향그래프 G를 구성합니다. 그래프의 각 노드는 하나의 관측값을 나타내며 노드 쌍 사이의 예측 거리 V($s_1, s_2$)에 기반된 edge를 추가합니다. 만약 이 값이 $d_{max}$보다 크면 해당 노드 쌍은 도달 불가능한 것으로 간주하며 edge를 추가하지 않습니다.

다만 SoRB는 탐색 과정에서 greedy strategy를 사용하므로 안전성이 고려되지는 않았습니다.

__3.제약된 강화 학습 (Constrained Reinforcement Learning, CRL)__

안전성을 반영하기 위해 제약된 강화 학습 프레임워크 내에서 구축하고 이는 제약된 마르코프 결정 프로세스(CMDP) 문제를 해결하는데 보조 비용함수(cost function) $C:S×A×S→R$ 와 비용 한계 $δ∈R+$ 를 정의한다.

정책 $\pi$ 를 따를 때, 기대 할인 비용 반환(expected discounted cost return)은 다음과 같이 정의된다.

$$
J_C(\pi) = E_{\tau \sim \pi} [\sum_{t=0}^{\infty} \gamma^t C(s_t, a_t, s_{t+1})]
$$

CMDP에서 허용 가능한 정적(stationary) 정책 집합은 다음과 같이 표현된다.

$$
\Pi_C = \{\pi \in \Pi | J_C(\pi) \leq d\}
$$

일반적인 off-policy 방법들은 라그랑주 승수를 도입하여 비용 제약을 위반하는 안전하지 않은 행동에 대해 penalty를 부여하는 방식으로 CRL을 해결할 수 있지만 비용 함수와 비용 한계가 task에 의존적이라는 한계가 있습니다.

__4.다중 에이전트 경로 탐색 (Multi-Agent Path Finding, MAPF)__

MAPF 문제에서는 가중 그래프 $G(V,E)$ 와 에이전트 집합 $A=\{a_1, a_2, ..., a_k\}$ 가 주어집니다. 각 에이전트는 고유한 시작 지점 $s_i \in V$ 와 목표 지점 $g_i \in V$ 를 가집니다.

에이전트는 대기(wait) 하거나 인접한 정점(vertex)으로 이동(move) 할 수 있으며, 각 행동은 그래프 G(V,E) 에 정의된 페널티를 초래한다. 에이전트가 목표 지점에 도달하면 더 이상의 페널티는 부과되지 않는다.

---

### APPROACH

__1.목표 기반 안전 강화 학습(Goal-Conditioned Safe Reinforcement Learning)__

SoRB에서 영감을 받아, 상태 쌍 간의 거리와 비용을 예측할 수 있는 에이전트를 훈련시키는 방법으로 가치 함수(Value Function)는 해당 정책에 의해 결정되므로, 최단 경로를 따르는 거리 및 비용 예측을 얻으려면 먼저 목표 기반 정책 $π(s, a, s_g)$, 누적 보상을 위한 Q-함수 $Q(s, a, s_g)$, 누적 비용을 위한 Q-함수 $QC(s, a, s_g)$ 를 포함한 제약이 없는(unconstrained) 에이전트를 훈련하는 것이 중요합니다.

이후, 에이전트가 안전한 탐색을 학습할 수 있도록 제약 기반 강화 학습(Constrained RL, CRL) 방법을 적용하여 제약된 정책 $πc(s, a, s_g)$ 및 그에 따른 가치 함수를 학습시킵니다. 그러나 기존 CRL에서 사용하는 비용 제한(Cost Limit)은 목표 기반 설정에서 직접 적용할 수 없기 때문에 비용 제한을 하이퍼파라미터로 재정의하여, 엄격한 준수를 요구하지 않고 안전하지 않은 행동을 패널티로 부과하는 부드러운(Soft) 제약 조건으로 설정합니다. 그러나 비용 제한을 너무 낮게 설정하면(패널티가 너무 높아지면) 목표를 달성하기보다 비용을 줄이는 데 집중하는 정책이 생성될 수 있기 때문에 본 실험에서는 간단한 구조를 가진 라그랑주 액터-크리틱(Lagrangian Actor-Critic) 방법을 사용하였습니다.

__2.자체 샘플링 및 훈련 (Self-Sampling and Training)__

목표 기반 에이전트를 훈련하려면, 에이전트가 탐색하고 목표에 도달하는 연습을 할 수 있도록 목표 상태 세트를 샘플링해야 하며 샘플링 전략의 설계는 목표 기반 에이전트 훈련의 성공에 중요한 요소라고 할 수 있습니다.

SoRB에서는 가까운 목표를 우선적으로 샘플링하여 단기 탐색 성공률을 높이는 방식을 사용했지만 이 방법은 목표 샘플링을 위해 상태의 정확한 위치(Ground-Truth Position)에 접근할 수 있는 오라클(Oracle)을 필요로 합니다. 하지만 현실적으로 이러한 오라클이 존재하지 않는 경우가 많았습니다.

이를 해결하기 위해 자체 샘플링 및 훈련 알고리즘을 제안하며 에이전트의 Q-함수를 사용하여 다양한 거리 및 비용을 가진 훈련 샘플을 평가하고 선택하는 방식을 따릅니다. Q-함수가 점점 더 정확해지면서, 훈련 샘플의 품질도 향상되며, 이는 결국 더 나은 정책 학습으로 이어질 수 있습니다.

__3.범주형 비용 추정 (Categorical Cost Estimate)__

분포 기반 강화 학습(Distributional RL)을 적용하면 목표 기반 가치 함수의 품질을 향상시켜 탐색 과정의 성능을 높일 수 있습니다. 따라서 본 실험에서는 목표 기반 가치 함수를 범주형 확률 분포(Categorical Distribution) Zπ 로 모델링합니다.

$Z_{\pi} \sim Cat(N, p_{\pi}(z|s, a, g))$ 여기서, 비용 값의 범위는 [$V_{min}$, $V_{max}$][V min,V max] 이며, $N$은 균일하게 나누어진 클래스의 개수입니다. 각 클래스의 지원 값(Support)은 다음과 같이 정의됩니다.

$$
z_i = V_{min} + i\Delta z, 0≤i<N
$$

$$
\Delta z \triangleq \frac{(V_{max} - V_{min})}{N-1}
$$

그 결과 분포의 기댓값을 사용하여 목표 기반 비용을 추정할 수 있었습니다. 

$$
c_{\pi}(s_1,g)=E_{p(z|s,a,g)} [z]
$$

그러나 Zπ는 범주형 확률 분포이므로 표준 벨만 업데이트(Bellman Update)를 사용할 수 없었고 따라서 Categorical Algorithm을 따라 비용 Q-함수 QC(s, a, sg)을 업데이트합니다.

__4.리플레이 버퍼에서 그래프 구성 (Graph Construction from Replay Buffer)__

리플레이 버퍼 B에 저장된 관측 데이터를 이용해 가중치가 있는 방향 그래프를 구축합니다. 각 edge는 특정 상태 쌍에 대해 예측된 거리 및 비용 값을 가집니다. 아래와 같이 정의됩니다.

$$
d_{sp} \approx d_{\pi} \leftarrow Q(s, \pi(s_i, a, s_g), s_j), c_{sp} \approx c_{\pi} \leftarrow Q(s, \pi(s_i, a, s_g), s_j)
$$

그래프 G는 V=B(그래프의 노드 집합은 버퍼 내 상태), E=B*B(모든 상태 쌍 간의 가능한 edge), $W_d$와 $W_c$는 각각 거리와 비용 가중치를 나타냅니다.

$$
G \equiv (V, E, W_d, W_c)
$$

__5.다중 에이전트 경로 탐색을 위한 충돌 기반 탐색(Collision-Based Search, CBS)__

다중 에이전트 경로 탐색(MAPF, Multi-Agent Path Finding) 문제는 상태 공간이 지수적으로 증가 하는 어려움이 있다. 이를 해결하기 위해 충돌 기반 탐색(CBS, Conflict-Based Search)알고리즘을 활용합니다.

CBS는 두 개의 계층(High-Level & Low-Level) 으로 작동하는 알고리즘이다.
고수준 탐색(High-Level Search)
에이전트 경로에 대한 제약 조건 을 관리하고 경로 계획을 점진적으로 조정하여 충돌을 해결합니다. 트리 구조를 활용하여 최적의 제약 조건을 찾습니다.

저수준 탐색(Low-Level Search)
공간-시간 A* (Space-Time A*) 알고리즘을 사용하여 개별 에이전트의 경로를 탐색합니다.    주어진 제약 조건을 충족하면서 각 에이전트가 최적의 경로를 찾도록 합니다.

이러한 이중 계층 구조 를 통해 CBS는 단일 에이전트 경로 탐색 문제를 분리하여 해결 하고, 충돌을 점진적으로 조정함으로써 다중 에이전트 경로 탐색 문제의 복잡성을 효과적으로 관리할 수 있게 됩니다.

---

### EXPERIMENTS

__실험 개요 및 평가 질문__

본 연구의 실험은 다음과 같은 핵심 질문들에 답함으로써 제안한 방법의 효과를 평가하였습니다.

Q1: 우리의 접근 방식은 다른 방법들보다 더 안전한 에이전트 행동 을 보일 수 있는가?

Q2: 누적 비용을 조정할 때, 우리의 접근 방식은 멀리 떨어진 목표에 도달하는 능력을 희생 하는가?

Q3: 다중 에이전트 환경에서 확장할 경우, 우리의 접근 방식은 다른 방법들보다 우수한 성능 을 보이는가?

__실험 환경__

-2D 내비게이션 환경
-Central Obstacle Map 사용    
-에이전트의 관측 값: 위치 $s = (x, y) ∈ R^2$    
-에이전트의 행동: 방향 이동 $a = (dx, dy) ∈ [−1, 1]^2$    
-매 타임스텝마다 에이전트의 위치가 업데이트됨

__비주얼 내비게이션 환경__

-ReplicaCAD 데이터셋에서 4개의 환경 선택    
-Habitat-Sim을 사용하여 시뮬레이션    
-에이전트의 관측 값: RGB 파노라마 이미지 (32 × 32 픽셀, 4개 방향의 1인칭 시점 이미지 결합)-행동 공간: 2D 내비게이션 환경과 동일

__비용 제한 및 비용 함수__

모든 실험에서 비용 제한 (δ) 은 10으로 설정장애물 경계로부터의 거리 ℎ에 따라 비용 함수 $C(s)$ 를 다음과 같이 정의.

$$
C(s) = \begin{cases} 2 - 2h/r, 0≤h≤r \\ 0, otherwise \end{cases}
$$

여기서 $ℎ:S→R ≥0$ 는 가장 가까운 장애물까지의 거리, $r∈R+$ 는 장애물의 영향 반경실험에서는 $r=10$ (2D 내비게이션) / $r=10$ (비주얼 내비게이션)

---

### 참고 자료

[원본 경로 #1](https://arxiv.org/pdf/2502.17813)


---
title: 'TLDR: Unsupervised Goal-Conditioned RL via Temporal Distance-Aware Representations'
date: '2025-02-27'
tags: ['embodied ai', 'paper review']
---

### Abstract

비지도 목표 조건부 강화 학습(GCRL, Unsupervised Goal-Conditioned Reinforcement Learning)은 외부 감독 없이 다양한 로봇 기술을 개발하기 위한 유망한 패러다임입니다. 그러나 기존 방법은 제한된 탐색과 희소하거나 노이즈가 있는 보상으로 인해 광범위한 상태를 포괄하는데 어려움을 겪습니다.

이러한 도전 과제를 극복하기 위해 시간적 거리 인식 표현(TLDR, TemporaL Distance-aware Representations)을 활용하는 새 방법을 제안합니다. 이 방법은 시간적 거리를 기반으로 탐색을 시작하기 위해 멀리 떨어진 목표를 선택하고 내재적 탐색 보상과 목표 도달 보상을 계산합니다. 구체적으로, 우리의 탐색 정책은 큰 시간적 거리를 가진 상태 (즉, 넓은 상태 공간을 포괄)를 찾는 반면, 목표 조건부 정책은 목표에 대한 시간적 거리를 최소화하도록 학습합니다.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/5313006f-8f3a-40d0-83b4-d2960457597b/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

아기는 자신의 신체를 제어하는 것부터 시작하여 점진적으로 능력을 향상시켜 더 도전적인 목표를 달성할 수 있는 목표 도달 기술을 자율적으로 학습할 수 있습니다. 유사하게, 로봇과 같은 지능형 에이전트에게 환경 상태와 에이전트 상태 모두를 포함하여 광범위한 상태에 도달하는 능력은 매우 중요합니다. 이러한 능력은 그 자체로 기초적인 기술 세트를 제공할 뿐만 아니라 더 복잡한 작업을 달성할 수 있도록 합니다.

로봇이 인간과 같은 장기 지평 목표 도달 기술을 자율적으로 학습할 수 있을까요? 로봇에서 목표 도달 행동을 학습하는 것은 작업 불가지론적이며 어떤 외부 감독도 요구하지 않아 로봇의 비지도 사전 훈련을 위한 확장 가능한 접근 방식을 제공하기 때문에 이것은 특히 매력적입니다.

비지도 GCRL의 주요 도전 과제는 두 가지입니다. 에이전트가 달성하도록 학습할 수 있는 다양한 상태를 탐색하는 것과 목표 도달 정책을 효과적으로 학습하는 것입니다.

---

### Related works

#### 목표 조건부 정책 최적화

목표 조건부 정책 학습의 효율성을 향상시키기 위해, 사후 경험 재생 (HER, Hindsight Experience Reply) 및 모델 기반 정책 최적화가 널리 사용되었습니다. 그러나 희소한 또는 휴리스틱 보상으로 인해 복잡하고 장기 지평의 목표 도달 행동을 학습하는 것은 여전히 어렵습니다.

대신 데이터에서 추정된 상태 사이의 환경 단계 수로 정의되는 시간적 거리 (temporal distance)는 더 조밀하고 근거 있는 보상을 제공할 수 있습니다. LEXA와 PEG는 현재 정책에 대한 예상 시간적 거리를 목표 도달 보상으로 사용합니다.

#### 탐색 전략

에이전트를 새로운 상태로 이끌고 상태 범위를 확장하는 탐색 목표를 선택하는 데 크게 의존합니다. 탐색 목표는 LEXA에서처럼 단순히 리플레이 버퍼에서 샘플링되거나 덜 방문된 상태, 상태 분포에서 밀도가 낮은 상태 등에서 선택될 수 있습니다.

---

### Methods

#### Problem Formulation

<img src="https://velog.velcdn.com/images/devjo/post/ee366825-d2dc-443c-95dc-f4e1bc50e73c/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

목표 조건부 마르코프 결정 과정으로 비지도 GCRL 문제를 공식화하며, 튜플 $\mathcal{M} = (\mathcal{S}, \mathcal{A}, p, \mathcal{G})$로 정의됩니다.

$\mathcal{S}$와 $\mathcal{A}$는 각각 상태 및 행동 공간을 나타냅니다. $p: \mathcal{S} \times \mathcal{A} \to \Delta(\mathcal{S})$는 전이 역학을 나타내며, 여기서 $\Delta(\mathcal{X})$는 $\mathcal{X}$에 대한 확률 분포의 집합을 나타냅니다.

에이전트의 목표는 최적의 목표 조건부 정책 $\pi^{\mathcal{G}}: \mathcal{S} \times \mathcal{G} \to \mathcal{A}$를 학습하는 것이며, 여기서 $\pi^{\mathcal{G}}(a \mid s, g)$는 최소 단계 내에서 목표 $g \in \mathcal{G}$에 도달할 수 있는 상태 $s$에서의 행동 $a \in \mathcal{A}$를 출력합니다.

#### Learning Temporal Distance-Aware Representations

시간적 거리는 상태 사이의 최소 환경 단계 수로 정의되며, 목표 조건부 정책 학습뿐만 아니라 탐색을 위해 더 조밀하고 근거 있는 보상을 제공할 수 있습니다. 희소하고 이진적인 목표 도달 보상에 의존하는 대신, 행동을 취하기 전후의 시간적 거리의 변화는 유익한 학습 신호가 될 수 있습니다.

학습된 표현 $\phi: \mathcal{S} \to \mathcal{Z}$는 두 상태 사이의 시간적 거리를 잠재 공간 $\mathcal{Z}$로 인코딩하며, 여기서 $\lVert \phi(s_1) - \phi(s_2) \rVert$는 $s_1$과 $s_2$ 사이의 시간적 거리를 나타냅니다.

$$
\max_{\phi} \mathbb{E}_{s \sim p_s, g \sim p_g} [f(\lVert \phi(s) - \phi(g) \rVert)]
$$

여기서 $f$는 더 큰 거리 $\lVert \phi(s) - \phi(g) \rVert$에 더 낮은 가중치를 할당하는 어파인 변환된 소프트플러스 ($\text{softplus}$) 함수입니다. 라그랑주 승수 $\lambda$를 사용하여 이 제약된 목표를 이중 경사 하강법으로 최적화하고, 훈련 중에 미니배치에서 $s$와 $g$를 랜덤으로 샘플링합니다.

#### Exploratory Goal Selection

밀도가 낮은 (덜 방문된) 상태를 탐색 목표로 선택하면 목표 지향적 탐색을 강화할 수 있습니다. 그러나 상태의 “밀도” 개념은 반드시 상태에 도달하는 것이 얼마나 희귀하거나 어려운지를 나타내지는 않습니다. 예를 들어, 로봇 팔이 보이지 않는 (밀도가 낮은) 관절 위치를 적극적으로 찾을 수 있지만, 객체와의 상호 작용은 더 중요한 학습 기회를 제공할 수 있습니다.

TLDR 보상이라고 부르는 다음과 같이 추정될 수 있는 $h$ 엔트로피를 가진 $N$ 목표를 선택하고 목표 도달 정책을 사용하여 $N$ 해당 궤적을 수집합니다.

$$
r_{\text{TLDR}}(s) = \log \left( 1 + \frac{1}{k} \sum_{z^{(j)} \in \mathcal{N}_k(\phi(s))} \lVert \phi(s) - z^{(j)} \rVert \right)
$$

여기서 $\mathcal{N}_k(\cdot)$는 미니배치 내에서 $\phi(s)$ 주변의 $k$-최근접 이웃을 나타냅니다.

#### Learning Exploration Policy

목표 조건부 정책이 $T_{\mathcal{G}}$ 단계 동안 선택된 목표 $g$를 향해 이동한 후, 탐색 정책 $\pi^{\mathcal{E}}_{\theta}$가 실행되어 방문된 상태로부터 훨씬 더 멀리 떨어진 상태를 발견합니다. 탐색 정책의 이 목표는 다음과 같이 간단하게 정의될 수 있습니다.

$$
r^{\mathcal{E}}(s, s') = r_{\text{TLDR}}(s') - r_{\text{TLDR}}(s)
$$

---

### Conclusion

본 연구에서는 시간적 거리 인식 표현을 통합하는 비지도 GCRL 알고리즘인 TLDR을 소개했습니다. 이는 탐색과 목표 도달 정책 학습을 위해 시간적 거리를 활용합니다. 더 큰 시간적 거리를 가진 상태를 추구함으로써 TLDR은 도전적인 영역을 지속적으로 탐색할 수 있으며 더 나은 상태 범위를 달성합니다. 실험 결과는 기존 비지도 RL 알고리즘보다 다양한 환경에 걸쳐 상당히 더 넓은 상태 공간을 포괄할 수 있다는 것을 입증합니다.

다만 픽셀 기반 환경에서 METRA에 비해 느린 학습 속도를 보입니다. 그리고 상태 사이의 비대칭적 시간적 거리를 포착하지 못하며 이것은 고도로 비대칭적인 환경에 대한 정책 학습을 어렵게 만들 수 있습니다.

---

### 참고 자료

[원본 경로 #1](https://arxiv.org/pdf/2407.08464)

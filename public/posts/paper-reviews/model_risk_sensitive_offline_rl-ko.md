---
title: 'MODEL RISK-SENSITIVE OFFLINE REINFORCEMENT
LEARNING'
date: '2025-09-10'
tags: ['embodied ai', 'paper review']
---

### Abstract

오프라인 강화 학습 (Offline RL)은 잘못된 결정이 상당한 재정적 손실이나 안전 문제를 초래할 수 있는 금융, 자율 주행과 같은 위험 민감 영역 (risk-sensitive areas)에서 중요성이 커지고 있습니다.

그러나 기존의 위험 민감 오프라인 RL 방법은 위험을 정확하게 평가하는 데 어려움을 겪으며, 추정된 보상 (estimated return)의 사소한 오류가 위험 추정의 상당한 부정확성을 유발할 수 있습니다. 이러한 어려움은 오프라인 RL에 내재된 분포 변화 (distribution shifts)로 인해 심화됩니다.

이러한 문제를 완화하기 위해, 추정된 위험을 최소화하는 데만 집중하는 대신, 일련의 그럴듯한 대안 시나리오 (plausible alternative scenarios) 전반에 걸쳐 최악의 위험 사례를 최소화하도록 설계된 모델 위험 민감 오프라인 RL 프레임워크를 제안합니다.

추가적인 하이퍼파라미터를 도입하지 않고 그럴듯한 대안 시나리오를 식별하는 비평가 앙상블 기준 (critic-ensemble criterion) 방법을 제시합니다. 또한, 신경망의 스펙트럼 편향 (spectral bias)을 해결하기 위해 학습된 푸리에 특징 프레임워크와 IQN 프레임워크를 통합합니다. 스펙트럼 편향은 그렇지 않을 경우 모델 위험 계산에서 심각한 오류를 초래할 수 있습니다.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/fa62706c-44ad-43ec-912e-4dd3ad55933c/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

위험 측정은 드문 사건을 강조하고 잦은 사건을 과소평가하도록 설계되었기 때문에 (Cont et al., 2010; Kou et al., 2013; Embrechts et al., 2015; Pesenti et al., 2016), 추정된 위험은 기저 보상 분포의 변화에 매우 민감해집니다. 이러한 오류는 훈련 환경과 배포 환경 사이에 분포 변화 (distribution shift)가 있을 때 특히 잘못된 위험 관리로 이어질 수 있습니다. 이는 에이전트가 환경으로부터 실시간 피드백을 받을 수 없는 오프라인 RL에서 흔히 발생하는 상황입니다.

금융 분야에서는, 모델이 추정한 위험을 직접 최소화하는 대신 일련의 그럴듯한 대안 시나리오 전반에 걸쳐 최악의 위험 사례를 최소화함으로써 이 문제가 해결됩니다 (Bernard et al., 2023). 이 최악의 사례를 모델 위험이라고 하며, 잘못된 모델을 사용할 때의 최악의 결과를 정량화합니다 (Breuer & Csiszar, 2016; Bernard et al., 2023). 추정된 위험에만 의존하고 모델 오류에 취약한 전통적인 접근 방식과 달리, 모델 위험은 모델의 잠재적인 부정확성을 인정하여 더 강력하고 신뢰할 수 있는 위험 민감 의사 결정을 가능하게 합니다.

여기에 영감을 받아, 본 논문에서 위험 민감 오프라인 RL 연구는 초점을 기존의 위험 최소화에서 모델 위험 최소화로 전환합니다. 이 과정에서, 흔히 신뢰할 수 없거나 알려지지 않은 보상 분포 통계 (평균 및 표준 편차)를 추정하는 일반적인 문제를 다룹니다. 이는 평균 및 편차가 알려져 있다고 가정하는 금융과 대조됩니다.

위 이미지를 보면 왼쪽에서, 기존 위험 민감 오프라인 RL 접근 방식은 critic이 추정한 위험 (녹색 영역)을 최소화합니다. 그리고 오른쪽에서 그럴듯한 대안 시나리오인 회색 선 중에서 최악의 시나리오인 파란색 영역을 최소화합니다. 이처럼 본 논문에서는 모델 위험을 최소화하는 모델 위험 민감 오프라인 프레임워크를 제시하여, 기존의 위험 민감 오프라인 RL 접근 방식보다 더 강력한 의사 결정을 가능하게 합니다.

---

### Related Works

#### 1. 위험 민감 RL (Risk-sensitive RL)

위험 민감 RL에 대한 전통적인 연구는 전체 보상 분포를 추정하지 않고도 계산할 수 있는 위험 측정에 기반을 두고 있습니다 (Howard & Matheson, 1972; Sato et al., 2001; Mihatsch & Neuneier, 2002; Tamar et al., 2015; Chow et al., 2017). 

Distributional RL의 등장과 함께, Dabney et al. (2018a)은 분위수 회귀를 통해 위험을 직접 계산할 수 있도록 하여 위험 민감 RL 프레임워크를 통합하는 IQN 프레임워크를 개발했습니다. 다른 접근 방식으로는 보상 분포를 계산하지 않고 CV@R 정책 경사를 직접 계산하는 방법 (Tamar et al., 2015; Chow et al., 2017), 엔트로피 기반 방법 (Mihatsch & Neuneier, 2002), 동적 CV@R (Du et al., 2022; Lim & Malik, 2022), 그리고 엔트로피적 위험 가치 (EV@R) (Ni & Lai, 2022)가 있습니다. 동적 CV@R은 각 시간 단계에서 위험을 재귀적으로 고려하며 1R2R (Rigter et al., 2024)과 관련이 있습니다. EV@R은 범위에서 벗어나지만 CODAC (Ma et al., 2021)과 밀접하게 관련되어 있습니다.

또 다른 흥미로운 접근 방식은 위험 민감 RL을 Safe RL과 통합하는 것입니다. 예를 들어, Kim & Oh (2022)는 기대 비용 대신 비용의 CV@R을 제약하면서 위험 민감 접근 방식을 Safe RL에 통합합니다. 반면에, Ying et al. (2021); Greenberg et al. (2022)는 수익을 최대화하는 동시에 Safe RL을 사용하여 위험을 제약합니다. 온라인 RL 설정에서는 Jaimungal et al. (2022)이 본 논문과 유사한 접근 방식을 제안했지만, 그들의 방법은 KDE 및 온-정책 알고리즘에 기반하므로 오프라인 RL에는 적용될 수 없습니다.

#### 2. 위험 민감 오프라인 RL (Risk-sensitive Offline RL)

위험 민감 오프라인 RL에 대한 연구는 IQN과 오프라인 RL 프레임워크의 통합에 의존합니다. Urpí et al. (2021)은 IQN과 BCQ (Fujimoto et al., 2019)를 결합하여 ORAAC라는 위험 민감 오프라인 RL 프레임워크를 처음 제안했습니다. ORAAC는 행동 정책에 대한 과도한 제약으로 인해 더 나은 궤적을 생성하는 능력이 제한되는 단점이 있습니다. 이러한 한계를 해결하기 위해 CQL을 기반으로 하는 CODAC (Ma et al., 2021)이 제안되었습니다. 그러나 이는 하이퍼파라미터 민감도와 같은 CQL의 문제를 상속받습니다 (Tarasov et al., 2024). 또 다른 접근 방식인 1R2R (Rigter et al., 2024)은 전이의 최악의 섭동 (worst-case perturbations of the transition)으로 위험을 추정하는 모델 기반 RL 방법입니다. 하지만, 주요 한계는 전이 확률이 정규 분포를 따를 때만 보장된다는 것입니다.

---

### Methods

#### 1. Risk-sensitive RL

마르코프 결정 과정 ($\text{Markov Decision Process, } S, A, R, P, \gamma$ )을 고려합니다. 여기서 $S$는 상태 집합, $A$는 행동 집합, $R : S \times A \to \triangle(\mathbb{R})$는 무작위일 수 있는 즉각적인 보상이며, $P : S \times A \to \triangle(S)$는 전이 확률입니다. 여기서 $\triangle(X)$는 지원이 $X$의 부분 집합인 확률 변수의 집합을 나타냅니다. 또한, 모든 무작위 속성의 평균 및 분산은 유한하다고 가정합니다. 최적의 위험 민감 정책은 다음과 같이 공식화됩니다.

$$
\begin{aligned}
&\pi^* \\
&= \operatorname*{arg\ min}_{\pi} \mathcal{H}_{\phi} \left( Z_{\pi}(s, a) \right) \text{ where } Z_{\pi}(s, a) \\
&= \sum_{t=0}^{T} R(s_t, a_t)\gamma^t \mid s_0 = s, a_0 = a
\end{aligned}
$$

여기서 $\mathcal{H}_{\phi}(Z_{\pi}(s, a))$는 보상 $Z_{\pi}(s, a)$에 대한 정책 $\pi$의 위험을 나타내며, $\mathcal{H}_{\phi}$는 사용자 또는 환경에 의해 주어진 위험 측정 (risk measure)을 나타냅니다.

#### 2. Risk-sensitive Offline RL

오프라인 설정에서 에이전트는 환경과 직접 상호 작용할 수 없으며, 전이 데이터셋 $\mathcal{D} := \{(s_i, a_i, r_i, s'_i)\}_{i=1}^{|\mathcal{D}|}$에만 접근할 수 있습니다. 이러한 제약으로 인해, 단순한 RL 접근 방식은 분포 변화 ($\text{distribution shifts}$)로 인해 $Z_{\pi}(s, a)$의 과대평가로 어려움을 겪습니다 (Fujimoto et al., 2019). 따라서 보조 규제 ($\text{auxiliary regulation}$)가 일반적으로 적용됩니다. 오프라인 RL의 목표는 다음과 같이 정의됩니다.

$$
\pi^* = \operatorname*{arg\ max}_{\pi} \mathbb{E}[Z_{\pi}(s, a)] \text{ constraint to } \mathcal{D}(\pi \parallel \pi_{\mathcal{D}}) < \epsilon
$$

#### 3. Overall Algorithm

<img src="https://velog.velcdn.com/images/devjo/post/f519691c-66ed-4fcc-93b9-f863395b5aed/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

MR-IQN은 분포 비평가 (distributional critics)와 결정론적 행위자(deterministic actor)로 구성됩니다. 구체적인 비평가(critic)은 IQN, TQC를 사용하여 구현됩니다. 아래의 손실 함수를 최소화하도록 훈련합니다.

$$
\mathcal{L}(\pi) = \underbrace{\lambda_{\text{q.learn}} \text{MR}_{\phi}(Z_{\pi}(s, a); \mu, \sigma, \epsilon)}_{\text{Model risk}} + \underbrace{(a - a_{\mathcal{D}})^2}_{\text{BC loss}}
$$

여기서 $\lambda_{\text{q.learn}} > 0$은 스케일 매개변수이고, $a_{\mathcal{D}}$는 배치 행동, $a = \pi(s)$입니다. 위 이미지에서 보면 비평가 추정에서 $\mu$와 $\sigma$를 추출합니다. $\text{Li} \& \text{Pathak}$ (2021)에서와 같이 푸리에 특징 아키텍처 (Fourier feature architecture)를 활용하여 비평가를 구현합니다. 다음으로, 개별 비평가의 분위수 혼합 (quantile mixture)을 통해 얻은 비평가 앙상블 간의 거리를 $\epsilon$으로 계산합니다. 마지막으로, $\text{MR}{\phi}(Z{\pi}(s, \pi(s)))$를 계산하고 손실 함수를 최소화합니다.

보수성을 보장하기 위해, 우리는 $\mu_0$를 가장 작은 기댓값으로, $\sigma$를 $Z_{\pi}$의 가장 큰 편차로 선택합니다.

$$
\mu_0 := \operatorname*{min}_{i=1, \dots, K} \mathbb{E}[Z_{\pi}(s, a, \theta^{(i)})], \\
\sigma := \operatorname*{max}_{i=1, \dots, K} \text{std}[Z_{\pi}(s, a, \theta^{(i)})]
$$

$\lambda=0$일 때, 정책 경사는 종종 지역 최적에 이르는 평균-편차 위험 측정에만 의존합니다. 이를 완화하기 위해, 우리는 다음과 같이 $\mu$에 경사 정지 (stop gradient) 트릭을 적용합니다.

$$
\mu := - \mathcal{H}_{\phi}(Z_{\pi}(s, a)) + \text{stop-grad}(\mathcal{H}_{\phi}(Z_{\pi}(s, a))) + \mu_0
$$

비평가 앙상블과 개별 비평가 간의 바서슈타인-2 거리 (Wasserstein-2 distance)를 계산합니다. 이러한 거리 중 가장 큰 값이 $\epsilon$으로 선택됩니다.

---

### Conclusion

모델 위험을 효과적으로 포착하기 위해 비평가 앙상블 기준 (critic-ensemble criterion)을 고안한 모델 위험 민감 오프라인 RL 프레임워크를 제안했습니다. 모델 위험 계산의 정밀도를 보장하기 위해, 모델 위험 계산의 핵심 요소인 평균과 표준 편차를 정확하게 추정하는 푸리에 특징 네트워크 (Fourier feature networks)를 활용했습니다.

이 프레임워크는 잠재적인 모델 오류를 고려하고 그럼에도 불구하고 최고의 결정을 내리도록 노력함으로써, 위험 민감 응용 분야에서 더 신뢰할 수 있는 의사 결정을 보장합니다.

제안한 프레임워크는 스펙트럼 위험 측정 (spectral risk measures)으로 제한되며, CMV (Vadori et al., 2020) 또는 EV@R (Ni & Lai, 2022)과 같이 이 범주를 벗어나는 측정은 수용할 수 없다는 한계가 있지만, 스펙트럼 위험 측정의 광범위한 적용 가능성은 많은 실제 문제를 포괄합니다.

향후 연구는 구현 제어 (embodied control) 및 임무 수행에 중요한 비즈니스 응용 분야에서의 의사 결정을 포함하여, 이 프레임워크를 부분 관찰 가능 마르코프 결정 과정 (partially observable Markov decision processes)으로 확장하는 것을 포함합니다.

---

### 참고 자료

[원본 경로 #1](https://openreview.net/pdf?id=h6k4809xVV)

---
title: 'MODEL-BASED OFFLINE REINFORCEMENT LEARNING WITH LOWER EXPECTILE Q-LEARNING'
date: '2025-03-04'
tags: ['embodied ai', 'paper review']
---

### Abstract

모델 기반 오프라인 강화 학습 (Model-based Offline Reinforcement Learning)은 학습된 모델을 사용하여 가상의 궤적을 생성함으로써 제한적이고 정적인 데이터로부터 학습하는 도전 과제를 해결하는 매력적인 접근 방식입니다. 그러나 이러한 접근 방식은 종종 모델 롤아웃에서 나오는 부정확한 가치 추정으로 인해 어려움을 겪습니다.

본 논문에서 $\lambda$-반환의 하단 기대치 회귀를 통해 낮은 편향의 모델 기반 가치 추정을 제공하는 새로운 모델 기반 오프라인 RL 방법인 LEQ (Lower Expectile Q-learning)를 소개합니다.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/5eb3d37f-cb1e-426e-bd84-d76ac836c8cb/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

오프라인 강화 학습의 주요 도전 과제 중 하나는 환경 상호 작용의 부족으로 인한 분포 외 행동에 대한 가치의 과대평가입니다.

모델 기반 오프라인 RL은 학습된 모델을 사용하여 추가적인 훈련 데이터를 생성함으로써 이 문제를 해결하며 이로써 분포 외 상태와 행동을 포괄하는 합성 경험으로 주어진 오프라인 데이터를 보강합니다. 이러한 접근 방식이 단순하고 단기 지평 작업에서 강력한 성능을 보여주었지만, 특히 장기 지평 작업에서 노이즈가 있는 모델 예측과 가치 추정으로 인해 어려움을 겪습니다.

일반적인 모델 기반 오프라인 RL 방법은 모델 예측  또는 가치 예측의 불확실성으로 모델 롤아웃에서 추정된 $\text{Q}$ 값을 패널티함으로써 부정확한 가치 추정 문제 (대부분 과대평가)를 완화합니다. 이러한 패널티 항은 정책이 잘못된 가치 추정을 악용하는 것을 방지하지만, 정책은 이제 진정한 가치를 최대화하는 것이 아니라 휴리스틱하게 추정된 불확실성으로 패널티를 받은 가치를 최대화하며, 이것은 차선책의 행동으로 이어질 수 있습니다.

---

### Methods

#### Problem Formulation

문제를 튜플 $\mathcal{M} = (\mathcal{S}, \mathcal{A}, r, p, \rho, \gamma)$로 정의된 마르코프 결정 과정 (MDP)으로 공식화합니다.

$\rho(\mathbf{s}_0) \in \Delta(\mathcal{S})$는 초기 상태 분포를 나타내며 $\gamma$는 할인 계수입니다. RL의 목표는 $\mathbf{s}_0 \sim \rho(\cdot)$에서 시작하여 $\pi(\mathbf{a}_t \mid \mathbf{s}t)$와 $p(\mathbf{s}{t+1} \mid \mathbf{s}_t, \mathbf{a}_t)$를 따르는 유한 지평 $T$를 가진 전이 시퀀스 $\mathcal{T} = (\mathbf{s}_0, \mathbf{a}_0, r_0, \mathbf{s}_1, \mathbf{a}_1, r_1, \ldots, \mathbf{s}T)$에 대해 기대 반환 $\mathbb{E}_{\mathcal{T} \sim p(\cdot \mid \pi, \mathbf{s}0 \sim \rho)} \left[ \sum_{t=0}^{T-1} \gamma^t r(\mathbf{s}_t, \mathbf{a}_t) \right]$를 최대화하는 정책 $\pi: \mathcal{S} \to \Delta(\mathcal{A})$를 찾는 것입니다.

#### LOWER EXPECTILE Q-LEARNING

대부분의 오프라인 RL 알고리즘은 주로 분포 외 행동을 위한 보수적인 가치 함수를 학습하는 데 초점을 맞춥니다. 본 논문에서 하단 기대치를 가진 기대치 회귀를 통해 보수적인 $\text{Q}$ 함수를 학습하여 신뢰할 수 없는 불확실성 추정과 철저한 $\text{Q}$ 값 추정을 피하는 LEQ를 제안합니다.

$\text{Q}_{\phi}(\mathbf{s}, \mathbf{a})$에 대한 목표 값($\mathbf{a} \leftarrow \pi_{\theta}(\mathbf{s})$)은 월드 모델의 앙상블을 롤아웃하고 가능한 모든 $\mathbf{s}'$에 대해 $r + \gamma \text{Q}_{\phi}(\mathbf{s}', \pi_{\theta}(\mathbf{s}'))$를 평균하여 추정될 수 있습니다.

$$
\hat{y}_{\text{model}} = \mathbb{E}_{\psi \sim \{\psi_1, \ldots, \psi_M\}} \mathbb{E}_{(\mathbf{s}', r) \sim p_{\psi}(\cdot \mid \mathbf{s}, \mathbf{a})} [r + \gamma \text{Q}_{\phi}(\mathbf{s}', \pi_{\theta}(\mathbf{s}'))]
$$

이 목표 값은 세 가지 오류 원인을 가집니다. 부정확한 $H$-단계 모델 롤아웃에서 나오는 $\hat{y}_{\text{model}}$의 과대평가를 완화하기 위해, 작은 $\tau$를 가진 목표 $\text{Q}$ 값 추정에 대한 하단 기대치 회귀를 사용할 것을 제안합니다.

$$
\mathcal{L}_{\text{Q,model}}(\phi) = \mathbb{E}_{\mathbf{s}_0 \in \mathcal{D}_{\text{model}}, \mathcal{T} \sim p_{\psi}, \pi_{\theta}} \left[ \frac{1}{H} \sum_{t=0}^{H} \mathcal{L}_{\tau}^2 \left( \text{Q}_{\phi}(\mathbf{s}_t, \pi_{\theta}(\mathbf{s}_t)) - \hat{y}_{\text{model}} \right) \right]
$$

추가적으로 표준 벨만 업데이트를 사용하여 부정확한 모델로 인한 과대평가의 위험이 없는 데이터셋 $\mathcal{D}_{\text{env}}$의 전이로 $\text{Q}$ 함수를 훈련합니다.

$$
\mathcal{L}_{\text{Q,env}}(\phi) = \mathbb{E}_{(\mathbf{s}, \mathbf{a}, r, \mathbf{s}') \in \mathcal{D}_{\text{env}}} \left[ \frac{1}{2} (\text{Q}_{\phi}(\mathbf{s}, \mathbf{a}) - \hat{y}_{\text{env}})^2 \right]
$$

$\text{Q}$ 함수의 훈련을 안정화하기 위해 $\text{Q}_{\phi}$의 예측과 그것의 지수 이동 평균 $\overline{\text{Q}}_{\phi}$의 예측 사이의 차이를 정규화하여 $\text{Q}$ 값의 극적인 변화를 방지하는 EMA 정규화를 채택합니다.

$$
\mathcal{L}_{\text{Q,EMA}}(\phi) = \mathbb{E}_{(\mathbf{s}, \mathbf{a}) \in \mathcal{D}_{\text{env}}} (\text{Q}_{\phi}(\mathbf{s}, \mathbf{a}) - \overline{\text{Q}}_{\phi}(\mathbf{s}, \mathbf{a}))^2
$$

마지막으로 언급된 세 가지 손실을 결합하여 비평가 손실을 다음과 같이 정의합니다.

$$
\mathcal{L}_{\text{Q}}(\phi) = \beta \mathcal{L}_{\text{Q,model}}(\phi) + (1 - \beta) \mathcal{L}_{\text{Q,env}}(\phi) + \omega_{\text{EMA}} \mathcal{L}_{\text{Q,EMA}}(\phi)
$$

#### $\lambda$ Return

$\text{Q}$-학습을 위해 1단계 반환 대신 $\lambda$-반환을 사용합니다. $\lambda$-반환은 $\text{Q}$ 함수와 정책이 낮은 편향의 다단계 반환으로부터 학습할 수 있도록 합니다.

$N$-단계 반환 $G_{t:t+N}(\mathcal{T}) = \sum_{i=0}^{N-1} \gamma^i r_{t+i} + \gamma^N \text{Q}_{\phi}(\mathbf{s}_{t+N}, \mathbf{a}_{t+N})$을 사용하여, 시간 단계 $t$에서 $H$-단계 궤적 $\mathcal{T}$의 $\lambda$-반환 $\text{Q}^{\lambda}_t(\mathcal{T})$를 다음과 같이 정의합니다.

$$
\text{Q}^{\lambda}_t(\mathcal{T}) = \frac{1-\lambda}{1-\lambda^{H-t-1}} \sum_{i=1}^{H-t} \lambda^{i-1}G_{t:t+i}(\mathcal{T})
$$

---

### Conclusion

모델 기반 오프라인 RL에 대한 이전 연구 (Sun et al., 2023; Jeong et al., 2023)를 따라 상호 작용으로부터 종료 함수를 학습하는 온라인 모델 기반 RL 접근 방식과 달리 작업의 진실 종료 함수 (ground-truth termination function)에 대한 접근을 가정합니다.

학습된 종료 함수를 사용하면 상당한 성능 하락이 발생하며 특히 데이터셋이 무작위로 선택된 목표로 이동하여 수집되기 때문에 종료 신호가 제한적인 다양한 데이터셋에서 심각합니다.

본 논문에서 모델 생성 궤적으로부터 정책의 보수적인 평가를 얻기 위해 기대치 회귀를 사용하는 새로운 오프라인 모델 기반 강화 학습 방법인 LEQ를 제안합니다. 기대치 회귀는 $\text{Q}$ 목표의 전체 분포를 구성하는 어려움을 완화하고 샘플링을 통해 보수적인 $\text{Q}$ 함수를 학습할 수 있도록 합니다. 가상 롤아웃을 위한 비평가 및 정책 업데이트 모두에서 $\lambda$-반환과 결합되어, 정책은 모델 오류와 비평가 오류 모두에 더 견고한 학습 신호를 받을 수 있습니다.

---

### 참고 자료

[원본 경로 #1](https://arxiv.org/pdf/2407.00699)

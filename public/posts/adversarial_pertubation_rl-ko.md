---
title: 'Mitigating adversarial pertubations for deep reinforcement learning via vector quantization'
date: '2024.09.13'
tags: ['adversarial attack', 'paper review']
---

### Abstract

최근 연구에 따르면, 훈련 과정에서 우수한 성능을 보이는 강화 학습(RL) 에이전트도 실제 배포 시 적대적 교란(adversarial perturbations)에 취약할 수 있음이 밝혀졌습니다.이는 실제 환경에서 배포하기 전에 강인한(robust) 에이전트를 구축하는 것이 중요함을 시사합니다.

기존 연구들은 이 문제를 해결하기 위해 강인한 학습 기반(robust training-based) 방법을 개발하는 데 초점을 맞춰왔습니다.예를 들어, 딥 뉴럴 네트워크 자체의 강인성을 향상하거나, 강력한 적대적 공격(adversarial attacks)으로 에이전트를 학습(adversarial training)하는 방식이 있습니다.

본 연구에서는 입력 변환(input transformation) 기반 방어 기법을 활용하는 새로운 접근 방식을 제안합니다.구체적으로, 벡터 양자화(Vector Quantization, VQ) 변형 기법을 활용하여테스트 시 적대적 공격의 영향을 줄이는 방식을 제안합니다. 이 방법은 입력 관찰값을 변환하여 공격이 영향을 미치는 공간을 축소하며, 그 결과 적대적 공격에 덜 영향을 받는 변환된 관찰값을 생성할 수 있습니다.

---

### Introduction

1. 적대적 공격 방어 기법

입력 관찰값(input observations)에 대한 적대적 공격을 방어하는 다양한 방법이 제안되었습니다. 일부 연구들에서는 DNN의 강인성을 향상하기 위해 불변성(invariance)과 매끄러움(smoothness) 같은 속성을 정규화(regularization) 기법으로 적용하는 방식을 제안했습니다. 또 다른 연구들에서는 적대적 학습을 통해 RL 에이전트의 강인성을 높이는 방법을 탐구했습니다. 즉, 환경과 상호작용하는 과정에서 RL 에이전트의 입력값을 적대적으로 교란하는 공격자(adversary)를 도입하여 학습하는 방식으로 장기적인 보상(long-term reward)을 최적화하는 데 유리하지만, 추가적인 샘플과 계산 비용이 필요하다는 단점이 있습니다.

2. 입력 변환(input transformation) 기반 방어 기법

이미지 분류(image classification) 분야에서는 모델을 변경하지 않고 입력을 변환하여 적대적 공격을 방어하는 방법(input transformation-based defense)이 활발히 연구되고 있습니다. 이러한 방법은 입력 데이터를 정화(denoising)하여 공격을 약화하거나 이미지 처리(image processing) 기법을 활용하여 적대적 공격의 영향을 줄이는 방식을 활용합니다.

다만 이는 RL 에이전트의 학습 및 추론 과정에서 추가적인 계산 비용을 초래하며 벡터 입력(vector input)이나 연속 상태(continuous state) 공간을 다루는 RL 환경에는 확장하기 어렵지만 비정규화(non-differentiable) 성질을 갖는 이미지 처리 기반 변환 기법은 적대적 공격이 우회(bypass)하기 어렵다는 장점이 있습니다.

3. 본 논문에서의 제안

위와 같은 한계를 극복하기 위해, 본 논문에서는 벡터 양자화(Vector Quantization, VQ)를 활용한 입력 변환 기반 방어 기법을 제안합니다.

RL 에이전트의 관찰 공간을 이산화(discretization)하고 입력 공간을 효과적으로 축소함으로써 원래 환경에 대한 충분한 정보를 유지하면서도 공격의 영향을 최소화할 수 있습니다.

---

### Related Works

1. Adversarial Attacks on State Observations
Dueling Q-Network 에이전트의 강인성을 평가하면서 FGSM(Fast Gradient Sign Method)을 사용하여 매 스텝마다 공격을 수행하였습니다.
Black box 환경에서 서로 다른 DQN 모델 간에도 전이 가능한 적대적 예제가 존재함을 확인하였습니다.
state observations에 대한 공격을 공식화하여 state-adversarial markov decision(SA-MDP) 개념을 제시하였습니다.



2. Robust Training for Deep RL
적대적 예제를 활용하여 state observations에 대한 공격에 강인성을 얻고자 하였습니다.
DQN 에이전트를 게임환경에서 적대적 학습을 제안하였습니다.
Lipschitz 정규화를 적용하여 강인성을 향상하였습니다.
힌지 손실 정규화를 적용하여 Q함수가 일정 범위 내의 교란에서 부드럽게 변화하도록 유도하였습니다.


3. Input Transformation Based Defenses
분류 모델에 미치는 영향을 줄이기 위해 cropping, rescaling, bit-depth reduction 등의 기법을 사용하였습니다.
이미지를 정화하여 재구성을 위해 GAN, Diffusion 등의 기법을 사용하였습니다.

---

### Methodology

1. Input Transformation based Defense for RL

$f_1$, $f_2$를 각각 $s$로 매핑하는 함수라고 하고, $π$를 일정한 독립 분산을 갖는 가우시안 정책일 때 이 네트워크가 Lipschitz 연속성을 가진다고 가정하면 다음과 같은 부등식을 얻을 수 있습니다.

$$max_{s \in S}({V_{\pi \circ f_1}(s) - V_{\pi \circ f_2}(s)}) \leq \zeta {max_{s \in S} max_{s' \in B(s, \epsilon)} \|f_1(s) - f_2(s')}\|_2$$

여기서 $v$는 $pi$에 대해 최적의 적대자이며 $\zeta$는 $pi$와 독립적인 상수입니다.

첫번째로 $f_1$을 행동 함수로 고려하는 경우, $f_2$를 $s$를 $s'$에서 재구성하는 함수로 설계할 수 있으며 다음을 최소화하는 것을 포함합니다. 이는 노이즈 제거를 사용하여 달성할 수 있지만 일부 단점이 존재합니다. 

$$max_{s' \in B(s, \epsilon)} \|s - f_2(s')\|_2$$

두번째는 변환된 공간에서 차이를 줄이도록 $f_1$, $f_2$를 설계하여 다음을 최소화하는 것을 의미합니다.

$$max_{s' \in B(s, \epsilon)} \|f_1(s) - f_2(s')\|_2$$

---

### 참고 자료

[원본 경로: https://arxiv.org/abs/2410.03376](https://arxiv.org/abs/2410.03376)




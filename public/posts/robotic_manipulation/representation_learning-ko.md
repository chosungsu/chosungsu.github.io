---
title: 'Representation Learning'
date: '2024-12-11'
tags: ['Robotics', 'Manipulation', 'lecture']
---

### Overview

동역학 시스템의 상태(state)는 기본적으로 시스템의 핵심 측면을 포착하는 압축된 설명입니다. 이러한 측면은 시간에 따라 변할 수도 있고(time-varying) 고정된 매개변수일 수도 있습니다.

예를 들어 보행 로봇에서는 로봇의 현재 자세(pose)와 조인트 구성 등이 시간 변동량이고 팔다리의 길이, 무게 등이 고정 매개변수라고 할 수 있습니다.

시간 $t$에서의 상태를 $\mathbf{x}_t$라고 표기합니다. 이러한 시스템에 대한 일반적인 가정은 마르코프 속성(Markov property)을 가진다는 것입니다. 마르코프 속성은 미래 상태는 현재 상태에만 의존하며, 과거 상태에는 의존하지 않습니다.

$$
\mathbf{P}(\mathbf{x}_{t+1}|\mathbf{x}_t, \mathbf{x}_{t-1}, \ldots, \mathbf{x}_2, \mathbf{x}_1) = \mathbf{P}(\mathbf{x}_{t+1}|\mathbf{x}_t)
$$

마르코프 속성을 가진 시스템은 Markov Chains에 의해 완전 관찰 가능한 경우로 모델링합니다. Hidden Markov Models은 시스템의 상태가 직접 관찰되지 않아 종종 미지인 경우가 많아서 노이즈가 있는 센서 관찰(observation)로부터 참 상태를 추정합니다.

#### Generative and Discriminative Approaches

예를 들어, 입력 RGB 이미지(관찰 $\mathbf{z}$)로부터 객체의 자세(상태 $\mathbf{x}$)를 추정하는 작업을 고려합니다.

생성적 모델은 베이즈 정리(Bayes rule)를 사용하여 가능도(likelihood) $p(\mathbf{z}|\mathbf{x})$와 사전 확률(prior) $p(\mathbf{x})$를 통해 결합 분포를 계산합니다. 사전 확률 $p(\mathbf{x})$에서 객체 자세 $\mathbf{x}^{(i)}$를 샘플링합니다. 관찰 모델 $\mathbf{h}(\mathbf{x}^{(i)}) = \mathbf{z}^{(i)}$를 사용하여 샘플링된 자세로부터 가장 가능성이 높은 관찰 $\mathbf{z}^{(i)}$를 생성합니다.

판별적 모델은 관찰 $\mathbf{z}$가 주어졌을 때 상태 $\mathbf{x}$의 조건부 확률 $p(\mathbf{x}|\mathbf{z})$를 설명합니다. 신경망(예: PoseCNN)을 훈련시켜 입력 이미지 $\mathbf{z}$를 가장 가능성이 높은 출력 자세 $\mathbf{x}$로 직접 매핑하도록 합니다.

따라서 생성적 모델은 데이터를 생성하는 방법을 이해하고 판별적 모델은 직접 경계를 학습하여 관찰 $\mathbf{z}$가 주어졌을 때 $\mathbf{x}$를 예측합니다.

---

### Representation Learning

컴퓨터 비전에서 representation은 파이프라인의 각 단계에서 데이터가 취하는 형식을 의미합니다. 파이프라인의 한쪽 끝에 있는 센서 원시 데이터의 형식을 입력표현이라고 하고 원시 센서 데이터로부터 추론된 정보를 출력표현이라고 합니다.

좋은 표현을 위한 요구사항은 다음과 같습니다.

최소한의 정보만 담고 있어야 하고 충분히 표현력이 있어야 하며 가능한 많은 입력 구성을 포착해야 합니다. 그리고 분리 가능성에 의해 입력 데이터 변동의 서로 다른 설명 요인들이 독립적으로 표현되어야 합니다. 더 추상적인 개념이 덜 추상적인 개념으로 설명될 수 있어야 하며, 이는 특징 재사용(feature re-use)과 계산 효율성을 높입니다.

#### Modern CV and Learned Representations

현대 컴퓨터 비전 방법은 수동으로 추출된 특징을 학습된 중간 표현 (learned intermediate representations)으로 대체합니다. 합성곱 신경망(Convolutional Neural Networks, CNN)은 이미지에 적용되는 합성곱 필터 레이어로 구성되며, 이 필터는 레이블이 지정된 훈련 데이터를 사용하여 학습됩니다.

이 표현은 다운스트림 작업에서 성능이 우수합니다. 그리고 전통적인 파이프라인에서 추출된 특징과 놀라울 정도로 유사한 계층적 특징을 나타냅니다. 하지만 학습된 표현은 고전적인 표현에 비해 해석 가능성이 부족합니다. 이 단점을 극복하기 위해 CNN의 각 레이어에서 필터를 가장 강력하게 활성화시키는 특정 이미지 패치를 분석하여 필터가 실제로 무엇을 학습하고 있는지 시각적으로 이해합니다.

#### Unsupervised and Self-Supervised Learning

전통적인 지도학습은 입력 데이터 $\mathbf{x}_i$와 외부 레이블 $\mathbf{y}_i$ 쌍으로 구성된 훈련 데이터 세트를 사용합니다. 그러나 레이블을 획득하는 것은 비용이 많이 듭니다. 레이블 없이 데이터로부터 의미 있는 표현을 학습할 수 있습니다.

오토인코더(Autoencoder)는 입력 이미지를 완벽하게 재구성하도록 학습하는 것을 목표로 하는 네트워크 아키텍처입니다. 인코더로 입력 $\mathbf{X}$를 저차원의 중간 표현 $\mathbf{z}$로 압축합니다. 그리고 디코더로 $\mathbf{z}$로부터 입력 $\mathbf{X}$를 재구성된 출력 $\hat{\mathbf{X}}$로 복원합니다. 재구성 손실($\mathbf{X}$와 $\hat{\mathbf{X}}$ 간의 차이)을 최소화하여 학습합니다.

자체 지도 학습은 입력의 일부를 마스킹하여 이를 출력 레이블로 사용합니다. 예를 들면 이미지 대각선 아래의 픽셀을 입력으로 대각선 위의 픽셀을 출력으로 사용하여 네트워크가 아래쪽 부분만 보고 위쪽 부분을 재구성하도록 학습합니다.

---

### 참고 자료

[원본 경로 #1](https://web.stanford.edu/class/cs231a/course_notes/07-representation-learning.pdf)


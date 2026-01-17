---
title: 'Fine-grained Recognition with Learnable Semantic Data Augmentation'
date: '2024-10-11'
tags: ['computer vision', 'paper review']
---

### Abstract

세밀한 이미지 인식(Fine-grained image recognition)은 동일한 메타 카테고리(예: '새') 내의 하위 범주(예: '갈매기'와 '제비')를 구분하는 컴퓨터 비전의 고전적인 과제입니다. 이 분야의 핵심은 범주 간의 아주 미세한 시각적 차이를 포착하는 변별적 시각 단서(Discriminative visual cues)를 찾아내는 것입니다.

일반적인 이미지 분류에서 성공적이었던 이미지 수준의 데이터 증강 기술은 세밀한 인식 시나리오에서 무작위로 이미지를 자르거나 편집하는 방식은 아주 미세한 영역에 존재하는 중요한 시각적 단서를 파괴할 가능성이 크기 때문에 잘 적용되지 않습니다.

본 논문에서는 이러한 문제를 해결하기 위해 이미지 자체가 아닌 특징 수준(Feature-level)에서 학습 데이터를 다양화하는 방법을 제안합니다. 이미지 특징을 의미가 있는 방향으로 평행 이동시켜 다양한 변형 샘플을 생성합니다.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/57bd1fdb-74a4-4f75-ac93-ab594f1c3f5d/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

본 연구에서는 전체적인 외형은 매우 비슷하지만 미세한 형질이 다른 객체들을 구분하는 것을 목표로 합니다. 예를 들어 동물의 종, 항공기의 모델, 소매 제품의 종류 등을 구분하는 작업이 이에 해당하며 아주 미세한 시각적 차이를 이해하는 것이 핵심 과제입니다.

이미지 픽셀을 직접 수정하는 대신 Deep Feature Space에서 샘플을 평행 이동시키는 증강 방식을 제안합니다. 공분산 네트워크 CovNet으로 각 훈련 샘플의 특징을 입력받아 해당 샘플에 최적화된 의미적 방향(공분산 행렬)을 예측합니다. 분류 네트워크와 CovNet을 공동으로 학습시키되 서로 다른 목적 함수를 사용하여 교대로 최적화합니다. 이는 두 네트워크를 단순히 동시에 학습시킬 때 발생하는 퇴행적 해(Degeneration) 문제를 해결합니다.

---

### Related works

세밀한 인식 연구는 크게 두 가지 패러다임으로 발전해 왔습니다. Localization Methods로는 객체의 변별적인 부분을 찾아내어 해당 부분의 특징을 집중적으로 학습합니다. 탐지/분할 기법, 딥 필터 활용, 어텐션(Attention) 메커니즘 등이 주로 사용됩니다. 다음으로는 Feature Encoding Methods로 이미지 전체에서 미세한 차이를 모델링하기 위해 통합된 변별적 표현을 학습합니다.

메타 러닝은 고정된 알고리즘으로 학습하는 대신 Learning to learn하여 알고리즘 자체를 개선하는 것을 목표로 합니다. 여러 작업에서 공통 지식을 추출해 새로운 작업에 적용하는 Multi task와 하나의 문제를 반복적으로 해결하며 성능을 개선하는 Single task가 있습니다.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/93d62e67-00bb-4f47-a74e-a8a124eb2d64/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### Implicit Semantic Data Augmentation

기존의 데이터 증강이 이미지 픽셀을 직접 수정했다면, ISDA는 딥러닝 모델의 마지막 층 직전인 특징(Feature) 수준에서 증강을 수행합니다. 특징 벡터 $a_i$를 의미 있는 방향($\Sigma$)으로 이동시킵니다. 수만 번의 무작위 샘플링 대신 무한히 많은 증강을 가정한 기대 손실의 상한선을 유도하여 계산 효율을 극대화합니다.

어떤 방향이 의미 있는 방향인지는 각 클래스의 공분산 행렬($\hat{\Sigma}$)을 통해 결정됩니다.

$$
\ell_{ISDA} = -\log \left( \frac{e^{w_{y_i}^T a_i + b_{y_i}}}{\sum_{j=1}^C e^{w_j^T a_i + b_j + \frac{\lambda}{2} v_{jy_i}^T \hat{\Sigma}_{y_i} v_{jy_i}}} \right)
$$

#### Covariance Matrix Prediction Network

구조는 다층 퍼셉트론(MLP) 형태의 $g(\cdot; \theta_g)$입니다. 딥 특징 $a_i$를 입력받아 샘플 전용 공분산 행렬 $\Sigma_i^g$를 출력합니다.

$$
\ell_{ISDA}(x_i, y_i; \Sigma_i^g(\theta_g), \theta_f) = -\log \left( \frac{e^{w_{y_i}^T a_i + b_{y_i}}}{\sum_{j=1}^C e^{w_j^T a_i + b_j + \frac{\lambda}{2} v_{jy_i}^T \Sigma_i^g(\theta_g) v_{jy_i}}} \right)
$$

이 수식에서 공분산 항($\frac{\lambda}{2} v_{jy_i}^T \Sigma_i^g v_{jy_i}$)은 분모에 위치하며 항상 양수입니다. 따라서 분모가 커지면 전체 값(확률)은 작아지고, 결과적으로 손실($\ell_{ISDA}$)은 커집니다. 이로 인해 모델은 손실을 줄이기 위해 CovNet이 공분산을 그냥 0으로 예측하도록 만드는 즉 증강을 아예 안 하는 상태가 가장 손실이 적다는 결론에 도달하는 퇴행적 해 문제가 발생합니다.

#### The Meta-learning Method

이 시스템은 두 가지 서로 다른 목표를 가진 네트워크가 협력하는 구조입니다.

분류 네트워크 ($\theta_f$)에서는 학습 데이터를 사용하여 ISDA 손실($L_{train}$)을 최소화합니다. 이때 공분산 $\Sigma$는 CovNet이 제공하는 것을 그대로 사용합니다.

$$
\theta^*_f(\theta_g) = \arg \min_{\theta_f} L_{train}(\theta_f; \theta_g)
$$

공분산 예측 네트워크 ($\theta_g$)에서는 분류기가 검증용 데이터 역할에서 교차 엔트로피 손실을 최소화할 수 있도록 하는 최적의 공분산을 예측하는 법을 배웁니다.

$$
\theta^*_g = \arg \min_{\theta_g} L_{meta}(\theta_f(\theta_g))
$$

---

### Conclusion

본 논문에서는 세밀한 이미지 인식(Fine-grained recognition) 성능을 극대화하기 위한 메타 러닝 기반의 암시적 데이터 증강 기법을 제안했습니다.

기존의 이미지 수준 데이터 증강(Mixup, Cutout 등)은 무작위 편집 특성 때문에 세밀한 분류에 필수적인 미세 변별 영역(Discriminative region)을 파괴하는 문제가 있었습니다. 모든 클래스에 동일한 증강을 적용하는 대신 공분산 예측 네트워크(CovNet)를 통해 각 샘플의 고유한 의미론적 변화 방향을 포착했습니다.

다양한 세밀한 인식 벤치마크 데이터셋에서 성능 향상을 입증했을 뿐만 아니라, ResNet부터 ViT(Vision Transformer)에 이르기까지 다양한 신경망 구조에 즉시 적용 가능한 유연성을 보여주었습니다.

---

### 참고 자료

[원본 경로 #1](https://arxiv.org/pdf/2309.00399)

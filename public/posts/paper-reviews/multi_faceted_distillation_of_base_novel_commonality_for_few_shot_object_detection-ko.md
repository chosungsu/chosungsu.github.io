---
title: 'Multi-Faceted Distillation of Base-Novel
Commonality for Few-shot Object Detection'
date: '2023-07-17'
tags: ['object detection', 'paper review']
---

### Abstract

기존의 소수 샘플 객체 탐지 few-shot object detection 방법 대부분은 미세 조정 패러다임을 따릅니다. 이는 잠재적으로 클래스 불가지론적 일반화 가능 지식 (class-agnostic generalizable knowledge)이 이러한 2단계 훈련 전략을 통해 풍부한 샘플을 가진 기반 클래스 (base classes)에서 제한된 샘플을 가진 새로운 클래스 (novel classes)로 암묵적으로 학습되고 전달될 수 있다고 가정합니다. 그러나 탐지기가 명시적인 모델링 없이 클래스 불가지론적 지식과 클래스 특정 지식을 자동으로 구별하기 어렵기 때문에 이것이 반드시 사실인 것은 아닙니다.

본 연구에서 기반 클래스와 새로운 클래스 간의 (1) 인식 관련 의미론적 공통점 (2) 지역화 관련 의미론적 공통점 (3) 분포 공통점 세 가지 유형의 클래스 불가지론적 공통점을 명시적으로 학습할 것을 제안합니다.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/2ced4252-1d2c-4bd5-be65-704fbe29f91f/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

소수 샘플 객체 탐지는 base 클래스의 풍부한 데이터로부터 학습된 일반화 가능한 사전 지식을 활용하여 제한된 샘플을 가진 새로운 클래스 (novel classes)를 위한 효과적인 객체 탐지기를 학습하는 것을 목표로 합니다. 일반 객체 탐지와 비교할 때, 소수 샘플 객체 탐지는 단순히 클래스 내에서 다른 샘플에 일반화하는 것을 넘어 다른 클래스에 걸쳐 일반화할 수 있어야 합니다. 또한, 인식 (recognition)뿐만 아니라 지역화 (localization)에 대해서도 전달 가능한 지식을 학습해야 한다는 점에서 소수 샘플 분류보다 더 어렵습니다.

위 이미지에서 '고양이'의 샘플이 주어졌을 때, 우리는 객체 인식 및 지역화 모두에 대해 최적화된 특징 공간에서 이 샘플과 각 novel 클래스 간의 의미론적 유사성을 측정합니다. 이들은 각각 인식 관련 및 지역화 관련 의미론적 공통점으로 해석됩니다. 이렇게 학습된 공통점은 novel 클래스에 대한 객체 탐지기의 성능을 개선하기 위해 미세 조정 단계에서 증류됩니다.

소수 샘플 객체 탐지를 위한 주요 모델링 패러다임은 미세 조정 프레임워크 (fine-tuning framework)입니다. 이는 먼저 base 클래스의 샘플을 사용하여 객체 탐지기를 사전 훈련한 다음, novel 클래스에서 모델을 미세 조정합니다. 이러한 2단계 훈련 전략을 기반으로, 소수 샘플 객체 탐지의 특정 과제를 다루기 위해 많은 방법이 제안되었습니다. 예를 들어, MPSR은 스케일 변화 문제를 해결하고, FSCE는 novel 클래스 간의 혼동을 완화합니다. 이러한 미세 조정 패러다임의 잠재적인 가설은 객체 탐지를 위한 클래스 불가지론적 사전 지식이 기반 클래스에서 novel 클래스로 암묵적으로 전달될 수 있다는 것입니다. 그럼에도 불구하고, 객체 탐지기는 명시적인 모델링 없이 클래스 불가지론적 지식과 클래스 특정 지식을 자동으로 구별하기는 어렵습니다.

본 연구에서 미세 조정 프레임워크 내에서 base 클래스와 novel 클래스 간의 다면적 공통점을 명시적으로 학습할 것을 제안합니다. 이 공통점은 클래스 불가지론적이며 다른 클래스 간에 전달될 수 있습니다. 그런 다음 학습된 공통점에 대해 증류 (distillation)를 수행하여 novel 클래스의 희소성을 우회하고 그에 따라 novel 클래스에 대한 객체 탐지기의 성능을 개선합니다.

---

### Related Work

#### $\text{Few-Shot Image Classification}$

소수 샘플 이미지 분류 (Few-shot image classification)는 제한된 주석 인스턴스로 novel categories를 인식하는 것을 목표로 하며, 최근 많은 관심을 받아왔습니다.

최적화 기반 접근 방식 (Optimization-based approaches)은 새로운 작업에 빠르게 적응하기 위해 고전적인 경사 기반 최적화를 수정합니다. 측정 기반 접근 방식 (Metric-based approaches)은 각 범주의 프로토타입과의 거리를 비교하여 인스턴스를 인식할 수 있는 측정 공간 (metric space)을 학습합니다. 환각 기반 접근 방식 (Hallucination-based approaches)은 데이터 희소성을 다루기 위해 novel 샘플을 생성하는 것을 학습합니다.

#### $\text{Few-Shot Object Detection}$

소수 샘플 객체 탐지의 초기 연구는 메타 학습 패러다임 (meta-learning paradigm)에 초점을 맞추었는데, 이는 메타 학습자를 도입하여 기반 클래스에서 새로운 클래스로 전달될 수 있는 메타 수준 지식 (meta-level knowledge)을 활용합니다. 최근 연구자들은 단순한 미세 조정 기반 접근 방식이 대부분의 메타 학습 기반 접근 방식보다 뛰어난 성능을 보일 수 있음을 발견했습니다.

#### $\text{Knowledge Distillation}$

고전적인 지식 증류는 한 모델 (교사, teacher)에서 다른 모델 (학생, student)로 지식을 전달하는 것을 목표로 합니다.

예를 들면 암흑 지식 (dark knowledge)으로 교사 네트워크의 소프트 예측을 도입합니다. 또는 학생을 지도하기 위해 교사가 학습한 중간 표현 (intermediate representations)을 활용합니다.

이러한 연구들에서 영감을 받아, 본 논문은 메모리 뱅크를 기반으로 하여 기반 클래스와 새로운 클래스 간의 공통점을 증류하는 새로운 증류 프레임워크를 설계합니다.

---

### Method

<img src="https://velog.velcdn.com/images/devjo/post/6c34ecd4-b7db-43a7-acd2-26961fefd343/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

#### 인식 관련 의미론적 공통점 증류 (Distilling Recognition-related Semantic Commonalities)

의미론적으로 가까운 범주는 소와 말 사이의 유사한 외형처럼 객체 인식과 관련된 유사한 high level 의미론적 공통점을 공유하는 경향이 있습니다. 이러한 base 클래스와 novel 클래스 간의 의미론적 공통점을 증류하여 novel 클래스에 대한 객체 탐지기의 학습을 안내하는 것을 목표로 합니다.

고전적인 지식 증류는 더 큰 교사 모델에서 학생 모델로 지식을 전달합니다. 전달된 지식은 교사 모델에 의해 모든 클래스에 대해 예측된 확률 분포로 표현되며, 이는 현재 샘플이 각 클래스와 가지는 유사성으로 해석될 수 있습니다. 지식 증류는 이러한 확률 분포를 소프트 레이블 (soft labels)로 사용하여 원-핫 하드 레이블과 함께 모델의 학습을 지도함으로써 수행됩니다. 이러한 고전적인 지식 증류 방식에서 영감을 얻었지만, 다른 방식의 증류를 채택하였습니다. base 클래스와 novel 클래스 간의 인식 관련 의미론적 공통점을 증류하기 위해, base 클래스의 샘플이 각 novel 클래스와 가지는 유사성을 우선 측정합니다. novel 클래스에는 교사 모델을 학습하기에 충분한 샘플이 없으므로, 교사 모델이 클래스 확률을 예측하는 대신 사전 학습된 특징 공간 $F_{\text{cls}}$에서 직접 이러한 유사성을 계산합니다. 공식적으로, RPN에 의해 생성된 기반 클래스의 전경 영역 제안 $r$이 주어졌을 때, novel 클래스 $c$에 대한 이 제안의 유사성을 사전 학습된 특징 공간 $F_{\text{cls}}$에서 RoI 특징 $v_r$과 클래스 $c$의 프로토타입 $\mu_c$ 사이의 코사인 거리로 정의합니다.

$$
d_r^{c} = \alpha \cdot \frac{\mathbf{v}_r^T \boldsymbol{\mu}_c}{\left\| \mathbf{v}_r \right\| \left\| \boldsymbol{\mu}_c \right\|}, c \in \mathcal{C}_n.
$$

여기서 $C_n$은 novel 클래스의 집합이고, $\alpha > 0$는 스케일링 인자입니다. 프로토타입 $\mu_c$는 novel 클래스 $c$의 후보 집합에 있는 객체 특징을 평균하여 얻습니다.

$$
\boldsymbol{\mu}_c = \frac{1}{n_c}\sum _{i=1}^{n_c}\mathbf{f}_c^i
$$

여기서 $f_c^i$는 후보 집합에서 $i$번째 객체의 벡터 특징이고 $n_c$는 집합의 크기입니다. novel 클래스의 훈련 샘플 희소성을 우회하기 위해 base-novel 공통점을 증류하는 데 중점을 두기 때문에, 모든 모델 용량을 base-novel 공통점에 할당하기 위해 base-base 공통점은 무시됩니다. 결과적으로, base 클래스의 영역 제안 $r$이 다른 base 클래스에 대한 유사성은 작은 상수 값으로 정의됩니다.

$$
d_r^c = -\alpha
$$

여기서 $C_b$는 base 클래스의 집합이고 $\alpha$는 스케일링 인자입니다. 정답 클래스 (groundtruth class)에 대한 예측 정확도를 보장하기 위해 $r$과 정답 클래스 $c_{gt}$ 사이의 코사인 유사성도 계산합니다. 마지막으로, $\text{softmax}$ 함수를 사용하여 샘플 $r$이 모든 클래스에 대한 유사성을 정규화합니다.

$$
\mathbf{q}^{\text{cls}}_{r,c} = \frac{\text{exp}(d_r^c)}{\sum _{i=1}^{C}\text{exp}(d_r^i)}, c \in \mathcal{C}_n \cup \mathcal{C}_b
$$

전경 영역 제안 $r$이 배경 $c_{bg}$와 0의 공통점을 가진다고 가정하고, $r$에 대한 완전한 유사성 분포를 $\mathbf{q}^{\text{cls}}_r = [\mathbf{q}^{\text{cls}}_r; 0]$로 얻습니다. 고전적인 지식 증류와 유사하게, 얻은 영역 제안의 유사성을 소프트 레이블로 활용하여 객체 탐지기의 학습을 지도합니다. 공식적으로, 기반 클래스의 영역 제안 $r$에 대해, 우리는 소프트 레이블 $\mathbf{q}^{\text{cls}}_r$과 객체 탐지기에 의해 예측된 클래스 확률 $\mathbf{p}^{\text{cls}}_r$ 간의 쿨백-라이블러 ($\text{KL}$) 발산을 최소화합니다.

$$
\mathcal{L}_{\text{distill-cls}} = \sum _{c \in \mathcal{C}_n \cup \mathcal{C}_b \cup \{c_{\text{bg}}\}} (\mathbf{q}_{r,c}^{\text{cls}} \log \mathbf{q}_{r,c}^{\text{cls}}-\mathbf{q}_{r,c}^{\text{cls}} \log \mathbf{p}_{r,c}^{\text{cls}})
$$

#### 지역화 관련 의미론적 공통점 증류 (Distilling Localization-related Semantic Commonalities)

유사한 범주는 유사한 모양이나 경계 특징과 같이 객체 지역화와 관련된 의미론적 공통점을 공유합니다. 이러한 유사한 base 클래스와 novel 클래스 간의 공통점을 증류하면 객체 탐지기가 풍부한 base 클래스 샘플로부터 지역화에 대한 전달 가능한 지식을 학습할 수 있게 되어 novel 클래스에서 객체 탐지의 성능을 개선합니다.

학습된 지역화 관련 공통점은 정규화된 유사성으로 표현됩니다. 그러나 인식 관련 공통점을 감독을 위한 소프트 레이블로 간주하는 것과는 대조적으로, 지역화 관련 공통점은 객체 지역화를 위한 모든 클래스별 바운딩 박스 회귀기 (bounding box regressors)를 집계하기 위한 정규화된 가중치로 활용됩니다. 이는 객체가 정답 클래스의 바운딩 박스 회귀기뿐만 아니라 유사한 클래스의 회귀기에 의해서도 지역화될 수 있으며, 더 큰 유사성이 더 많은 확신을 가져온다는 직관을 기반으로 합니다. 공식적으로, 기반 클래스의 영역 제안 $r$이 주어졌을 때, 해당 바운딩 박스는 $C$ 클래스에 대한 모든 회귀기의 예측을 집계하여 정답 위치에 대한 오프셋 $\mathbf{t} = (t_x, t_y, t_w, t_h)$으로 예측됩니다. 그런 다음 탐지기는 Smooth $\text{L}1$ 손실을 사용하여 집계된 예측과 정답 간의 오차를 최소화함으로써 최적화됩니다.

$$
\mathcal{L}_{\text{distill-loc}}=\sum _{c=1}^C \mathbf{q}_{r,c}^{\text{loc}} \cdot \!\!\!\!\!\! \sum _{i\in \{x,y,w,h\}} \!\!\!\!\!\!\text{Smooth}_{L1}({t}_i^c-u_i)
$$

#### 분포 공통점 증류 (Distilling Distribution Commonalities)

의미론적으로 유사한 범주는 일반적으로 유사한 데이터 분포를 따릅니다. 예를 들어, 이러한 범주 간에 추정된 가우시안 분포에서 특징의 유사한 평균 및 분산을 가집니다. 분포 보정이 base 클래스의 평균과 분산을 모두 novel 클래스로 전달하는 것과 달리, base 클래스의 분산만 증류하고 novel 클래스의 평균 값은 보존합니다. 이는 base 클래스의 평균과 분산을 모두 전달하면 base 클래스와 novel 클래스 간에 분포적 중첩이 발생하여 객체 탐지 중에 이들을 구별하기가 더 어려워지기 때문입니다. 반면, 소수 샘플 분류 설정에서는 base 클래스와 novel 클래스 간의 분류가 요구되지 않습니다.

가장 가까운 상위 $k$개의 base 클래스의 평균 분산을 사용하여 novel 클래스의 분산을 근사할 수 있습니다. 공식적으로, novel 클래스 $c$의 보정된 분산은 다음과 같이 추정됩니다.

$$
\boldsymbol{\sigma}'_c = \frac{1}{k}\sum _{i\in S_c}\boldsymbol{\sigma}_i
$$

여기서 $\sigma_i$는 base 클래스 $i$의 분산이고 $S_c$는 novel 클래스 $c$에 가장 가까운 상위 $k$개의 base 클래스 집합입니다. 이러한 방식으로 얻어진 가우시안 분포 $\mathcal{N}(\boldsymbol{\mu}_c,\boldsymbol{\sigma}'_c)$를 따라 이 사전 학습된 특징 공간에서 novel 클래스 $c$에 대해 더 많은 샘플을 샘플링할 수 있습니다.

$$
\mathbb{S}_c=\left \{\mathbf{v} | \mathbf{v} \sim \mathcal{N}(\boldsymbol{\mu}_c,\boldsymbol{\sigma}'_c) \right \}
$$

여기서 $\mu_c$는 novel 클래스 $c$의 평균입니다. $\mathbb{S}_c$는 샘플링된 특징 집합이며, 이는 교차 엔트로피 ($\text{Cross-Entropy}$) 손실을 사용하여 객체 탐지기의 분류기 $f_{\theta}$를 훈련하는 데 추가 사용됩니다.

$$
\mathcal{L}_{\text{distill-dist}} = \frac{1}{|\mathbb{S}_c|}\sum _{\mathbf{v}\in \mathbb{S}_c} \text{CE}(c, f_\theta (\mathbf{v}))
$$

#### 통합 증류 프레임워크

여기서 $\mathcal{L}{\text{rpn}}$은 전경과 배경을 구별하기 위한 $\text{RPN}$의 손실이고, $\mathcal{L}{\text{cls}}$는 분류를 위한 교차 엔트로피 손실이며, $\mathcal{L}{\text{reg}}$는 바운딩 박스 회귀를 위한 smoothed $\text{L}1$ 손실입니다. 미세 조정 단계에서, 모델은 $\mathcal{L}{\text{det}}$와 세 가지 유형의 공통점 증류를 위한 손실로 모두 감독되며, 종단 간 방식으로 진행됩니다.

$$
\mathcal{L} = \mathcal{L}_{\text{det}} + \lambda _{c}\mathcal{L}_{\text{distill-cls}} + \lambda _{l}\mathcal{L}_{\text{distill-loc}} + \lambda _{d}\mathcal{L}_{\text{distill-dist}}
$$

여기서 $\lambda_c, \lambda_l, \lambda_d$는 손실 간의 균형을 맞추기 위한 하이퍼파라미터입니다.

---

### Conclusion

본 논문에서 소수 샘플 객체 탐지를 위한 다면적 증류 (multi-faceted distillation)를 제안했습니다. 핵심 통찰력은 base 클래스와 novel 클래스 간의 세 가지 유형의 공통점을 명시적으로 학습하는 것입니다. 

인식 관련 의미론적 공통점 ($\text{recognition-related semantic commonalities}$), 지역화 관련 의미론적 공통점 ($\text{localization-related semantic commonalities}$), 분포 공통점 ($\text{distribution commonalities}$). 이러한 공통점들은 메모리 뱅크 ($\text{memory bank}$)를 기반으로 미세 조정 단계 동안 증류됩니다. 제안된 방법은 소수 샘플 객체 탐지의 최신 기술 성능(sota)을 큰 폭으로 향상시킵니다.

---

### 참고 자료

[원본 경로 #1](https://arxiv.org/pdf/2207.11184)

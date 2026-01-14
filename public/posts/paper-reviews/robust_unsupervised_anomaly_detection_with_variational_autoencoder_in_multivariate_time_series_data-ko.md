---
title: 'Robust Unsupervised Anomaly Detection With Variational Autoencoder in Multivariate Time Series Data'
date: '2022-10-10'
tags: ['anomaly detection', 'paper review']
---

### Abstract

다변량 시계열 데이터에서 정확한 이상 탐지(Anomaly Detection)는 광범위한 응용 분야에서의 중요성으로 인해 많은 관심을 받고 있습니다. 정확하게 레이블링된 데이터를 얻기 어렵기 때문에, 다변량 시계열 데이터를 위한 많은 비지도(Unsupervised) 이상 탐지 알고리즘이 개발되었습니다. 그러나 이러한 시스템을 구축하는 것은 매우 도전적인 과제입니다. 각 시계열 내부의 시간적 의존성(temporal dependencies)을 포착해야 할 뿐만 아니라, 서로 다른 시계열 쌍 사이의 상호 상관관계(inter-correlations)도 함께 인코딩해야 하기 때문입니다. 이 과제를 해결하기 위해, 다중 스케일 합성곱 변분 오토인코더(Multi Scale Convolutional Variational Autoencoder, MSCVAE)를 제안합니다.

---

### Introduction

이상 탐지는 예상과 크게 다른 예기치 않은 데이터 포인트나 이벤트를 식별하는 것입니다. 시계열 이상은 크게 세 가지 유형으로 나뉩니다. 전체 데이터 범위를 크게 벗어난 개별 포인트를 point anomalies, 동일한 문맥(상황) 내의 다른 데이터들과 비교했을 때 크게 일탈하는 값을 contextual anomalies, 데이터 포인트의 하위 집합이 전체 데이터셋에서 실질적으로 벗어나는 경우를 collective anomalies라고 합니다.

최근 기계 학습 기법으로 ConvLSTM, VAE 등은 큰 진전이 있었으나 데이터 불균형(정상 데이터가 이상 데이터보다 압도적으로 많은 상황) 환경에서의 VAE 기반 탐지는 아직 충분한 주목을 받지 못했습니다.

본 논문에서는 다중 스케일 attribute matrices를 구축하여 시스템 상태를 다단계로 특징화합니다. 그 후 attention based ConvLSTM을 사용하여 시간적 패턴을 포착하고 행렬을 재구성합니다. 혼동 행렬을 기반으로 한 새로운 전략을 제안하여 정상과 이상 데이터 간의 불균형이 심한 조건에서도 모델의 강건성을 향상시킵니다.

---

### Method

#### Overview

<img src="https://velog.velcdn.com/images/devjo/post/02588c17-a92a-4d6c-8f94-3b0f662273ff/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

길이 $T$를 가진 $n$개의 다변량 시계열 데이터 $X = (x_1, x_2, \dots, x_n)^T \in \mathbb{R}^{n \times T}$를 다룹니다. 목표는 $T$ 이후의 시점들에서 발생하는 이상 이벤트(anomalous events)를 식별하는 것입니다. 모델은 정상 상태의 패턴을 학습하기 위해 정상 데이터셋만을 사용하여 훈련됩니다.

속성 행렬은 상태를 정의하기 위해 서로 다른 시계열 쌍 사이의 상관관계를 파악하는 것이 중요합니다. 따라서 시점 $t-w$부터 $t$까지의 세그먼트 내에서 쌍별 내적(pairwise inner product)을 활용하여 $n \times n$ 크기의 속성 행렬 $M^t$를 생성합니다. 두 시계열 $x_i$와 $x_j$ 사이의 상관관계 $m^t_{ij}$는 다음과 같이 계산됩니다.

$$
m^t_{ij} = \frac{\sum_{\gamma=0}^{w} x^{t-\gamma}_i x^{t-\gamma}_j}{w}
$$

여기서 $w$는 슬라이딩 윈도우 크기입니다. 이 행렬은 시계열 간의 형상 유사성과 값의 규모 상관관계를 캡처합니다.

#### VAE

VAE는 입력을 잠재 변수(latent variable) 공간으로 압축한 뒤 다시 재구성하는 비지도 학습 네트워크입니다. 일반 오토인코더와 달리 각 잠재 변수에 대해 단일 값이 아닌 확률 분포를 출력하는 인코더를 생성하여 데이터의 복잡한 표현을 학습합니다.

$$
\mathcal{L}(x_i) = -\mathbb{E}_{z \sim q(z|x_i)} [\log p(x_i|z)] + \text{KL}(q(z|x_i) \| p(z))
$$

재구성 가능성을 최대화하는 재구성 손실과 학습된 분포가 실제 사전 분포와 유사하도록 보장하는 정규화 항(KL 발산)으로 구성됩니다.

#### Convolutional Encoder

속성 행렬의 공간적 형태를 인코딩하기 위해 4개의 합성곱 계층을 적용합니다. 각 계층은 필터 커널 $W$와 편향 $b$를 사용하여 특징 맵을 추출합니다.

$$
P_{t,l} = f(W^l_e * P_{t,l-1} + b^l_e)
$$

#### Threshold Setting Strategy

전통적인 ROC 기반 전략은 데이터가 불균형할 때(정상이 이상보다 훨씬 많을 때) 특정 지표에 치우쳐 F1-Score가 낮아지는 경향이 있습니다. 이를 보완하기 위해 오류율(ERR)을 최소화하는 새로운 전략을 제안합니다.

$$
\text{ERR} = \frac{FP}{FP + TP + TN}
$$

---

### Conclusion

본 논문에서는 다변량 시계열 데이터의 이상 탐지 문제를 해결하기 위해 혁신적인 MSCVAE 프레임워크를 제안했습니다. 이 프레임워크는 다변량 시계열을 다중 스케일 속성 행렬로 변환하여 시스템의 상태를 다양한 시간 세그먼트에서 특징화합니다.

합성곱 변분 오토인코더를 채택하여 재구성된 속성 행렬을 생성함으로써 VAE의 장점을 극대화했습니다. 어텐션 기반의 ConvLSTM 네트워크를 사용하여 복잡한 시간적 패턴을 학습합니다.

---

### 참고 자료

[원본 경로 #1](https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=9783083)

---
title: 'TCAD: Unsupervised Anomaly Detection Based on Global Local Representation Differences'
date: '2022-11-07'
tags: ['anomaly detection', 'paper review']
---

### Abstract

다변량 시계열 이상 탐지 (Multivariate time series anomaly detection)는 광범위한 응용 분야로 인해 큰 관심을 받고 있습니다. 정확한 이상 레이블을 얻기 어렵기 때문에 많은 비지도 이상 탐지 (unsupervised anomaly detection) 알고리즘이 개발되었습니다. 그러나 이상 판별력이 있는 기준을 찾아야 하므로 비지도 다변량 이상 탐지 모델을 구축하는 것은 매우 도전적인 과제입니다.

이전의 연구자들은 시간 지점과 전역 시퀀스 (global sequences) 간의 연관성을 추출하는 데 집중한 반면, 시간 지점과 지역 시퀀스 (local sequences) 간의 연관성은 간과해 왔습니다.

본 논문에서는 Transformer와 Resnet을 기반으로 한 결합 모델 TCAD를 제안합니다. Transformer는 시퀀스의 전역 특징을 학습합니다. Resnet는 시퀀스의 지역 특징을 학습합니다.

---

### Introduction

현대의 실세계 시스템은 지속적으로 작동하며, 과학 실험, 산업 및 상업 등 모든 영역에서 시계열 데이터가 발생합니다. 특히 다변량 시계열은 서로 연관된 시스템들이 생성하는 고차원적이고 시간 의존적인 데이터를 의미합니다.

비지도 방식으로 이상치를 탐지하는 것은 매우 까다로운 문제입니다. LOF, KDE, OC-SVM, IForest, KNN 등은 샘플 간의 독립성을 가정하여 시간적 정보(Temporal Information)를 고려하지 못합니다. 초기 딥러닝은 point by point 계산에 치중하여 전체 문맥을 정확히 설명하지 못합니다.

본 논문에서 제안하는 아이디어로 Transformer는 self-attention 매커니즘을 통해 각 시점의 전역적 표현과 시간적 상관관계를 모델링하여 풍부한 문맥적 의미를 포착하고 Resnet은 시계열의 지역적 문맥 정보를 융합하여 로컬 표현을 구축합니다.

---

### Method

#### Overview

<img src="https://velog.velcdn.com/images/devjo/post/63702c64-18ff-405d-8c1f-49dca31c59c1/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

다변량 시계열을 $T = \{x_1, \dots, x_T\}$로 하여 $x_T \in \mathbb{R}^m$이며 $m$은 변수의 개수입니다. 그리고 전체 시퀀스를 일정한 길이 $n$의 부분 시퀀스 $S = \{x_1, \dots, x_n\}$로 분할하여 네트워크의 입력으로 사용합니다. 정상 샘플과 이상 샘플을 구분할 수 있는 판별 기준을 찾는 것입니다. 이를 위해 두 가지 인코더를 병렬로 사용합니다. Transformer는 전역적 정보 표현인 잠재 특징 $Z_1$을 생성합니다. Resnet은 지역적 정보 표현인 잠재 특징 $Z_2$를 생성합니다. 마지막으로 이 두 표현 간의 차이가 커지도록 $L_2$ 손실 함수로 제약합니다.

#### Transformer Encoder

Transformer는 시퀀스 내의 장기 의존성을 파악하는 데 탁월합니다. 본 모델에서는 self-attention 메커니즘을 통해 전역적 시간 연관성을 추출합니다.

$$
\text{Attention}(Q, K, V) = \text{Softmax}\left(\frac{QK^T}{\sqrt{d}}\right)V
$$

multi head attention을 통해 시퀀스의 정보를 여러 독립적인 부분 공간에서 학습하여 더 풍부한 전역 표현을 얻습니다.

#### Resnet Encoder

다변량 시계열 이상 탐지에서 neighborhood connections와 spatial local features를 보존하고 지역적 공간 및 시간적 상관관계를 포착하는 능력은 풍부한 지역 정보를 담은 local representations를 제공합니다.

Resnet은 인접한 시점 간의 연결과 공간적 지역 특징을 보존하는 데 유리합니다. 3개의 ResnetBlock과 업샘플링 계층으로 이루어져 있습니다. Skip connection을 통해 기울기 소실 문제를 방지하며, 다양한 크기의 컨볼루션 커널을 사용해 멀티 스케일의 지역 정보를 학습합니다.

$Z'_2 = \text{Conv1d}_1(X)$는 입력을 $Z'''_2$와 동일한 형상으로 변환하는 투영 계층이고 $Z''_2 = \text{Dropout}(\text{ReLU}(\text{BatchNorm}(\text{Conv1d}_2(Z'_2))))$는 시퀀스 이웃 연관성 및 공간 특징을 학습하는 샘플링 계층이며 $Z'''_2 = \text{Dropout}(\text{ReLU}(\text{BatchNorm}(\text{Conv1d}_3(Z''_2))))$ 는 커널 크기가 1인 피드포워드 계층입니다.

---

### Conclusion

본 논문에서는 비지도 시계열 이상 탐지 문제를 연구했습니다. 기존 연구들과 달리, 본 모델은 Transformer 인코더를 통해 시퀀스의 전역 특징(global features)과 전역적 시간 패턴을 학습하고, Resnet 인코더를 통해 지역 특징(local features)과 지역적 시간 패턴을 학습합니다.

지역 표현과 전역 표현 사이의 차이에 대한 핵심 관찰을 바탕으로, 학습된 시퀀스 표현을 구체화하여 그 차이를 재구성하는 이중 분기 구조(two-branch structure)의 인코더를 포함하는 TCAD를 제안합니다.

---

### 참고 자료

[원본 경로 #1](https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=9928254)

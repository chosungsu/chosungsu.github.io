---
title: 'An Efficient Federated Distillation Learning
System for Multi-task Time Series Classification'
date: '2022-09-16'
tags: ['anomaly detection', 'paper review']
---

### Abstract

본 논문은 다중 작업 시계열 분류 TSC를 위한 효율적인 연합 증류 학습 시스템 EFDLS을 제안합니다. 이는 중앙 서버와 다수의 모바일 사용자로 구성되며, 여기서 서로 다른 사용자는 서로 다른 TSC작업을 실행할 수 있습니다. 두 가지 새로운 구성 요소, 즉 특징 기반 학생-교사 (FBST) 프레임워크와 거리 기반 가중치 매칭 (DBWM) 방식을 가지고 있습니다.

각 사용자 내에서, FBST 프레임워크는 교사와 학생이 동일한 네트워크 구조를 가지는 상태에서 지식 증류(knowledge distillation)를 통해 교사(teacher)의 은닉 계층(hidden layers)으로부터 학생(student)의 은닉 계층으로 지식을 전달합니다. 연결된 각 사용자에 대해, 학생 모델의 은닉 계층 가중치가 주기적으로 EFDLS 서버에 업로드됩니다. 

DBWM 방식은 서버에 배포되며, 두 모델의 가중치 간 유사성을 측정하기 위해 최소 제곱 거리(least square distance)가 사용됩니다. 이 방식은 연결된 각 사용자에 대해, 해당 사용자의 가중치와 파트너의 가중치가 업로드된 모든 가중치 중에서 가장 가까운 파트너를 찾습니다. 서버는 이 사용자 및 파트너의 가중치를 교환하여 이 두 사용자에게 다시 보냅니다. 그러면 이 사용자들은 수신된 가중치를 자신들의 교사 모델의 은닉 계층에 로드합니다.

---

### Introduction

시계열 데이터(Time series data)는 하나 이상의 시간에 의존적인 변수와 관련된 시간 순서대로 정렬된 데이터 포인트의 연속이며, 이상 탐지, 교통 흐름 예측, 서비스 매칭, 주식 예측과 같은 분야에 성공적으로 적용되었습니다.

시계열 분류 (Time Series Classification)에 상당한 연구 관심이 집중되어 왔습니다. 예를 들어, 국소 특징 추출을 위한 완전 합성곱 신경망 (Fully Convolutional Network)을 도입했습니다. Zhang et al. 은 입력에서 풍부한 표현을 포착하기 위해 주의 기반 프로토타입 네트워크 (TapNet, Attentional Prototype Network)를 고안했습니다. Lee et al.는 얻어진 은닉 표현의 시간적 풀링 크기를 줄이기 위해 학습 가능한 동적 시간적 풀링(dynamic temporal pooling) 방법을 설계했습니다.

Chen et al.은 비동기 학습(asynchronous learning)과 시간 가중 통합(temporally weighted aggregation)을 적용하여 시스템 성능을 향상시켰습니다. 앙상블 시스템은 악의적인 클라이언트에 맞서 여러 개의 전역 모델을 학습하기 위해 무작위로 선택된 클라이언트의 부분집합을 사용했습니다. Hong et al.은 적대적 학습에 결합하여 공정하고 전이 가능한 표현을 위한 연합 적대적 디바이어싱(debiasing)을 생성했습니다.

각 시계열 데이터셋은 길이 및 분산과 같은 특정 특성을 가지며, 이는 균형이 매우 맞지 않으며 강하게 비독립적이고 동일하게 분포(non iid)되어 있지 않습니다.

---

### Related Work

#### 1. Traditional Algorithms

대표적인 두 가지 알고리즘 흐름은 거리 기반과 특징 기반입니다.

$\Rightarrow$ 거리 기반 방법

동적 시간 워핑 ($\text{DTW}$)과 $\text{NN}$ (Nearest Neighbor)을 결합하는 것이 일반적입니다. 예를 들어, $\text{DTWA}$, $\text{DTWI}$, $\text{DTWD}$가 있습니다.

이 외에도 $\text{DTW}$와 $\text{NN}$의 장점을 활용하는 수많은 $\text{DTW-NN}$ 기반 앙상블 알고리즘이 제안되었습니다. 예를 들어, Line et al.은 11가지 유형의 1-$\text{NN}$ 기반 탄성 거리를 고려한 탄성 앙상블 ($\text{EE}$, Elastic Ensemble) 알고리즘을 제시했습니다.

계층적 투표 변환 기반 앙상블의 집합 ($\text{HIVE-COTE}$, Hierarchical Vote Collective of Transformation-based Ensembles)과 국소 캐스케이드 앙상블 (local cascade ensemble)이 문헌에서 대표적인 앙상블 알고리즘입니다.

$\Rightarrow$ 특징 기반 모델

주어진 데이터에서 충분히 구별되는 특징 (discriminate features)을 포착하는 것을 목표로 합니다.

예를 들어, Line et al.은 원시 데이터의 추세를 반영하는 대표 쉐이프릿을 찾기 위한 쉐이프릿 변환 방법을 도입했습니다.

Bag-of-features 표현 프레임워크는 시퀀스의 다른 위치에서 정보를 추출하는 데 적용되었습니다.

Dempster et al.은 데이터에서 변환된 특징을 탐색하기 위해 최소 랜덤 합성곱 커널 변환 (minimally random convolutional kernel transform)을 적용했습니다.

#### 2. Deep Learning Algorithms

딥 러닝 알고리즘은 데이터의 내부 표현 계층 구조를 펼쳐서(unfolding) 표현들 간의 본질적인 연결을 추출하는 데 중점을 둡니다. 대부분의 기존 딥 러닝 모델은 단일 네트워크 기반(single-network-based)이거나 이중 네트워크 기반(dual-network-based)입니다.

$\Rightarrow$ 단일 네트워크

하나의 (보통 혼합된) 네트워크를 통해 데이터의 표현 계층 구조 내에서 중요한 상관관계를 포착합니다. 예시로는 $\text{FCN}$, $\text{ResNet}$, 쉐이프릿-신경망, $\text{InceptionTime}$ 등이 있습니다.

$\Rightarrow$ 이중 네트워크

일반적으로 두 개의 병렬 네트워크, 즉 국소 특징 추출 네트워크 ($\text{LFN}$, Local-feature Extraction Network)와 전역 관계 추출 네트워크 ($\text{GRN}$, Global-Relation Extraction Network)로 구성됩니다. 예시로는 $\text{FCN-LSTM}$, $\text{RTFN}$, $\text{ResNet-Transformer}$ 등이 있습니다.

---

### Method

<img src="https://velog.velcdn.com/images/devjo/post/fc8be6c2-509b-4679-84a4-9c59fbcb3ccd/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

EFDLS는 다중 작업 TSC를 위한 안전한 분산 시스템입니다. 여기에는 중앙 서버와 다수의 모바일 사용자가 있습니다. 시스템의 전체 사용자 수를 $N_{tot}$, 연결된 사용자 수를 $N_{conn}$이라고 하며, $N_{conn} \le N_{tot}$입니다. 각 사용자는 한 번에 하나의 TSC 작업을 실행하며, 서로 다른 사용자들은 서로 다른 TSC 작업을 실행할 수 있습니다. 임의의 두 사용자의 경우, 이들은 제스처 및 분류와 같이 서로 다른 작업을 실행하거나, 서로 다른 데이터 소스를 가진 동일한 작업을 실행합니다.

시스템에서 사용자들은 지식 증류를 기반으로 로컬에서 모델을 훈련하고, 서버를 통해 유사한 전문 지식을 가진 사용자들과 모델 가중치를 공유합니다. 각 사용자의 학습 모델로 배포되는 특징 기반 학생-교사 프레임워크 FBST를 제안합니다. 각 사용자 내에서, 교사 모델의 은닉 계층 지식이 학생 모델의 은닉 계층으로 전달됩니다. 연결된 각 사용자에 대해, 학생 모델의 은닉 계층 가중치가 주기적으로 EFDLS 서버에 업로드됩니다.

우리는 서버에 배포되는 거리 기반 가중치 매칭 방식 (DBWM)을 제안하며, 주어진 두 모델의 가중치 간의 유사성을 측정하기 위해 최소 제곱 거리를 채택합니다. 모든 연결된 사용자의 가중치가 완전히 업로드된 후, 연결된 각 사용자에 대해 DBWM 방식이 실행되어 모든 연결된 사용자 중에서 가장 유사한 가중치를 가진 파트너를 찾습니다. 이러한 방식으로, 모든 사용자는 매칭할 파트너를 가집니다. 시스템은 사용자들이 보안 및 개인 정보를 희생하지 않고 지식 공유의 이점을 얻을 수 있도록 합니다.

#### 1. 특징 기반 학생-교사 프레임워크, FBST

FBST 프레임워크에서 학생 모델과 교사 모델은 동일한 네트워크 구조를 가집니다. 각 사용자 내에서, 특징 기반 KD는 교사의 은닉 계층에서 학생의 은닉 계층으로 지식 전달을 촉진하여, 학생이 입력 데이터에서 풍부하고 가치 있는 표현을 포착하도록 돕습니다.

특징 추출기는 여러 은닉 계층과 분류기(classifier)를 포함합니다.

은닉 계층은 국소 특징 추출을 담당하며, 세 개의 합성곱 블록(ConvBlock1, ConvBlock2, ConvBlock3), 하나의 평균 풀링 계층, 그리고 하나의 밀집 (즉, 완전 연결) 계층으로 구성됩니다. 각 ConvBlock은 1차원 CNN 모듈, 배치 정규화 (BN) 모듈, 그리고 정류 선형 유닛 활성화 (ReLU) 함수로 구성되며, 다음과 같이 정의됩니다.

$$
f_{convblock}(x) = f_{relu}(f_{bn}(W_{conv} \otimes x + b_{conv}))
$$

여기서, $W_{conv}$와 $b_{conv}$는 각각 CNN의 가중치 및 편향 행렬입니다. $\otimes$는 합성곱 연산을 나타냅니다. $f_{bn}$과 $f_{relu}$는 각각 배치 정규화 및 $\text{ReLU}$ 함수를 나타냅니다.BN의 입력인 $x_{bn} = {x_1, x_2, \ldots, x_{N_{bn}}}$라고 할 때, $x_i$는 $i$번째 인스턴스를, $N_{bn}$은 배치 크기를 나타냅니다.

$$
\begin{aligned}
&f_{bn}(x_{bn}) \\
&= f_{bn}(x_1, x_2, \ldots, x_{N_{bn}}) \\
&= \left( \alpha \frac{x_1 - \mu}{\delta + \zeta} + \beta, \ldots, \alpha \frac{x_{N_{bn}} - \mu}{\delta + \zeta} + \beta \right)
\end{aligned}
$$

$$
\mu = \frac{1}{N_{bn}} \sum_{i=1}^{N_{bn}} x_i, \quad \delta = \sqrt{\frac{1}{N_{bn}} \sum_{i=1}^{N_{bn}} (x_i - \mu)^2}
$$

여기서, $\alpha \in \mathbb{R}^+$와 $\beta \in \mathbb{R}$는 훈련 중에 학습될 매개변수입니다. $\zeta > 0$는 임의로 작은 수입니다. 분류기는 밀집 계층과 Softmax 함수로 구성되어 있으며, 은닉 계층에서 추출된 고수준 특징을 해당 레이블로 매핑합니다.

#### 2. Knowledge Distillation

특징 기반 KD는 해당 교사의 은닉 계층에서 학생의 은닉 계층으로 지식을 전달하여 학생 모델을 정규화합니다. 임의의 사용자에게 있어, 학생 모델은 교사 모델의 감독 하에 데이터에서 충분히 구별되는 표현을 포착합니다.

교사의 은닉 계층에서 ConvBlock 1, 2, 3 및 밀집 계층의 출력을 각각 $O^{T,1}_i, O^{T,2}_i, O^{T,3}_i, O^{T,4}_i$라고 합니다. 학생의 은닉 계층에서 이들의 출력을 각각 $O^{S,1}_i, O^{S,2}_i, O^{S,3}_i, O^{S,4}_i$라고 합니다. 이전 연구에 따라, 사용자 $U_i$의 KD 손실 $L^{KD}_i$를 다음과 같이 정의합니다.

$$
L^{KD}_i = \sum_{m=1}^{4} ||O^{T,m}_i - O^{S,m}_i||^2
$$

$U_i$의 총 손실 $L_i$는 KD 손실 $L^{KD}_i$와 지도 손실 $L^{Sup}_i$로 구성됩니다. $L^{Sup}_i$는 교차 엔트로피 함수(cross-entropy function)를 사용하여 정답 레이블과 예측 벡터 간의 평균 차이를 측정합니다.

$$
L^{Sup}_i = - \frac{1}{N_{seg}} \sum_{j=1}^{N_{seg}} y_j \log(\hat{y}_j)
$$

여기서 $N_{seg}$는 입력 벡터의 수이며, $y_j$와 $\hat{y}_j$는 각각 $j$번째 입력 벡터의 정답 레이블과 예측 벡터입니다. 총 손실 $L_i$는 다음과 같이 정의됩니다.

$$
L_i = \epsilon \times L^{Sup}_i + (1 - \epsilon) \times L^{KD}_i
$$

여기서 $\epsilon \in (0, 1)$은 $L^{Sup}_i$와 $L^{KD}_i$의 균형을 맞추는 계수입니다. 본 논문에서는 $\epsilon = 0.9$로 설정합니다

#### 3. Distance-based Weights Matching

주어진 두 모델의 가중치 간의 유사성을 계산하기 위해 최소 제곱 거리가 사용됩니다. 연결된 모든 사용자가 업로드한 가중치가 수신되면, DBWM 방식은 즉시 가중치 매칭 프로세스를 시작하여 연결된 각 사용자에 대한 파트너를 찾습니다.

---

### Conclusion

FBST (특징 기반 학생-교사) 프레임워크는 교사 모델의 은닉 계층에서 학생 모델의 은닉 계층으로 지식 전달을 촉진하여, 학생이 입력으로부터 인스턴스 수준의 표현(instance-level representations)을 포착하도록 돕습니다. DBWM (거리 기반 가중치 매칭) 방식은 업로드된 가중치 간의 유사성 측면에서 각 사용자에 대한 파트너를 찾아, 서로 다른 사용자 간에 유사한 전문 지식의 지식 공유를 가능하게 합니다.

FBST와 DBWM을 통해, 제안된 EFDLS는 다중 작업 시계열 분류를 위해 서로 다른 작업 간에 유사한 전문 지식을 안전하게 공유합니다.

---

### 참고 자료

[원본 경로 #1](https://arxiv.org/pdf/2201.00011)

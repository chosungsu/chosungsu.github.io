---
title: 'Generalized Class Discovery in Instance Segmentation'
date: '2025-04-16'
tags: ['computer vision', 'paper review']
---

### Abstract

본 논문에서 instance segmentation에서 일반화된 클래스(GCD : generalized class discovery)에 대해서 다루고 있습니다. 이 작업의 목표는 새로운 클래스를 발견하고 레이블이 지정된 데이터와 레이블이 없는 데이터를 모두 사용하여 둘을 모두 분할할 수 있는 모델을 얻는 것입니다.

실제 세계에는 long tailed distribution을 가진 수많은 객체가 포함되어 있으므로 각 클래스의 인스턴스 분포는 본질적으로 불균형합니다. 이를 해결하기 위해 contrastive learning을 위한 인스턴스별 온도 할당(ITA : instance-wise temperature assignment)과 가상 라벨(pseudo labels)을 위한 클래스별 신뢰도 기준을 제안하고 있습니다.

ITA는 GCD를 향상시키기 위해 head classes에 속하는 샘플에 대한 인스턴스 식별을 완화합니다. 신뢰도 기준은 GCD의 가상 레이블을 사용하여 네트워크를 훈련할 때 tail classes에 대한 대부분의 가상 레이블이 제외되는 것을 방지하기 위함입니다.

---

### Introduction

supervised instance segmentation은 인상적인 성능을 달성했지만 값비싼 수작업 라벨링을 필요로 합니다. 주석 비용을 줄이기 위해 연구자들은 소규모 레이블과 함께 레이블 없는 이미지를 활용하는 semi supervised learning, 그리고 약한 라벨링에 의존하는 weakly supervised learning을 연구해왔습니다. 하지만 이 모든 방법은 closed world assumption에 의존하여 알려진 클래스 객체만 인식할 수 있습니다.

한계를 해결하기 위해 새로운 카테고리 발견(NCD : novel category discovery)을 도입하고 레이블 없는 이미지가 알려진 클래스만 포함한다고 가정하는 SSL과 다르게 레이블 없는 이미지에 새로운 카테고리가 포함되어 있다고 가정합니다. 따라서 이 방법은 문제를 더 어렵고 현실적으로 만듭니다.

균형 잡힌 이미지, 불균형, 의미론적 분할 등에 대한 GCCC가 연구되어 왔으며 대부분 semi supervised, pseudo label을 활용합니다.

---

### Related works

#### 1. 이미지 분류에서의 일반화된 클래스 발견(GCD)

vaze, 2022는 GCD를 도입하여 모든 데이터에 대해 비지도 대조 학습을 사용하고 레이블 데이터에 대해 지도 대조 학습을 사용하여 네트워크를 훈련했습니다. 그 다음 준지도 k평균 군집화를 적용하여 클래스 또는 군집 레이블을 할당했습니다.

zhang, 2023은 prompt cal을 발표하였고 레이블 없는 데이터에 대한 가상 레이블을 생성하기 위해 affinity graph를 사용하였습니다.

#### 2. 분할 및 탐지에서의 클래스 발견

zhao, 2022는 의미론적 분할에서 NCD를 도입하였고 레이블 데이터로 훈련된 saliency model과 segmentation network를 사용하여 새로운 영역을 찾을 것을 제안했습니다. 마지막으로 레이블 데이터와 군집화에서 얻은 깨끗한 가상 레이블 및 온라인 가상 레이블이 있는 레이블 없는 이미지를 사용하여 훈련했습니다.

Fomenko, 2022는 레이블 데이터를 사용하여 Faster RCNN 또는 Mask RCNN을 훈련하고 분류 헤드를 제외한 네트워크를 동결하였습니다. 그런 다음 레이블 없는 이미지와 레이블 이미지에 적용하여 region proposals를 얻었습니다. 이어서 분류 헤드를 확장하고 sinkhorn knopp 알고리즘을 기반으로 군집화가 생성된 가상 레이블을 사용하여 훈련했습니다.


---

### Method

레이블 데이터셋 $D_l$과 레이블 없는 데이터셋 $D_u$을 사용합니다. instance segmentation에서 GCD는 새로운 카테고리 $C_n$을 $C_k \cap C_n = \varnothing$으로 발견하고 알려진 클래스와 새로운 클래스 $C=C_k \cup C_n$ 의 인스턴스를 모두 분할할 수 있는 모델을 얻는 것을 목표로 합니다.

vaze, 2022는 대조학습(Contrastive learning)을 도입했고 레이블 없이 imagenet 데이터셋을 dino를 사용하여 백본을 사전 훈련했습니다. 그런 다음 레이블 데이터에 대해 supervised cl을 사용하고 레이블 및 레이블 없는 데이터 모두에 대해 unsupervised cl을 사용하여 백본과 프로젝션 헤드를 미세 조정합니다.

GCD 모델 $f_d(\cdots)$는 백본 $b(\cdots)$와 프로젝션 헤드 $g(\cdots)$로 구성하였습니다. $g(\cdots)$에 MLP를 사용하고 $b(\cdots)$에 Resnet50 백본을 사용하도록 합니다. 훈련 중에 매개변수가 $f_d(\cdots)$의 매개변수 모멘텀 기반 이동 평균인 인코더 $f'_d(\cdots)$를 사용합니다.

비지도 대조 손실 $L^{u}_{rep}=-log \frac{exp(z_i^Tz_i'/{\tau})}{\sum_{z_j' \in \hat{Z_i'}} exp(z_i^Tz_j/{\tau})}$, 지도 대조 손실 $L^{s}_{rep} = \frac{1}{Z_i^P} \sum_{z'_k \in Z^P_i} log \frac{exp(z^T_i z'_k/{\tau})}{\sum_{z'_j \in \hat{Z'_i}} exp(z_i^Tz_k'/{\tau})}$ 와 같이 구현이 가능하고 $Z_i^P$는 $I_i$와 동일한 클래스에 속하는 표현을 포함하는 $Z'$의 하위 집합을 나타냅니다. 그리고 $\tau$는 온도 하이퍼파라미터입니다.

우리는 먼저 인스턴스 분할 네트워크 $f_o(\cdot)$를 훈련하여 알려진 클래스와 보지 못한 클래스 $C=C_k \cup c_n$ 모두에 대한 클래스에 구애받지 않는 인스턴스 마스크를 얻습니다. 우리는 $D_l$과 $D_u$를 모두 사용하여 (Wang. 2022)의 GGN(Generic Grouping Network)인 클래스에 구애받지 않는 인스턴스 분할 네트워크를 훈련합니다.

$I^u_o$와 $I^l_o$에는 배경 또는 인접한 객체와 함께 타겟 객체가 포함되어 있으므로 객체별 특징을 인코딩하기 위해 소프트 어텐션 모듈(SAM)을 연구하였습니다. $f_o(\cdot)$를 사용하여 $D_u$에 대한 가상 마스크 $M^u$를 생성하지만 노이즈가 많은 경계로 인하여 가상 마스크를 직접 사용하여 인코딩하는 것이 위험합니다. 따라서 $D_u$에 대한 가상 마스크 $M^u$와 $D_l$에 대한 gt 마스크 $M^l$을 사용하여 모듈을 훈련하였습니다.

zhang, 2021은 비지도 군집화를 위해 $I^u_o$에 대해 kl 발산 기반 손실 $L^u_{cls}=\sum^C_{c=1} \bar{p_{ic}} log \frac{\bar{p_{ic}}}{q_{ic}}$과 같이 구현합니다. 여기서 $q_{ic}$sms $I_i$가 클래스 c에 속할 확률입니다. 여기에 추가로 일반적인 교차 엔트로피 손실값인 $L^s_{cls}=\sum^C_{c=1} -y_{ic} log_{q_{ic}}$를 계싼합니다.

$f_d(\cdot)$에 대한 총 손실 $L_{gcd}$는 두 개의 대조 손실, 두 개의 분류 손실, 그리고 어텐션 손실의 가중 합으로 다음과 같이 계산됩니다.

$$
L_{gcd} = L_{att} + (1-\lambda)L^u_{rep} + \lambda L^s_{rep} + (1-\lambda) L^u_{cls} + \lambda L^s_{cls}
$$

---

### Conclusion

본 논문에서는 open-world instance segmentation을 위해, 인스턴스 분할에서 새로운 GCD 방법을 제시합니다. 인스턴스의 불균형 분포를 해결하기 위해, 인스턴스별 온도 할당 방법과 클래스별 및 동적 신뢰도 기준을 도입합니다. 전자는 클래스 발견을 위한 임베딩 공간을 개선하는 것을 목표로 하고, 후자는 GCD 모델로부터 얻은 가상 레이블을 효과적으로 활용하도록 설계되었습니다. 또한, 효율적인 소프트 어텐션 모듈을 제안합니다. 두 가지 설정에서의 실험 결과는 제안된 방법이 새로운 클래스를 효과적으로 발견하고 알려진 카테고리와 새로운 카테고리 인스턴스를 모두 분할함으로써 이전 방법들보다 뛰어난 성능을 보인다는 것을 입증합니다.

다만 이 연구는 레이블이 지정된 데이터셋과 레이블이 없는 데이터셋이 처음부터 완전히 사용 가능하다는 것을 가정합니다. 따라서 로봇 내비게이션과 같이 데이터가 순차적으로 제공되는 시나리오에는 최적이지 않습니다. 또한, 대부분의 이전 연구를 따라 총 클래스 수에 대한 사전 지식을 가정합니다.

---

### 참고 자료

[원본 경로 #1](https://arxiv.org/pdf/2502.08149)

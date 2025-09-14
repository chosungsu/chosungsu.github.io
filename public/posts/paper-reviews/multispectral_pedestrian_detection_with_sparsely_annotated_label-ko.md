---
title: 'Multispectral Pedestrian Detection with Sparsely Annotated Label'
date: '2025-02-20'
tags: ['computer vision', 'paper review']
---

### Abstract

기존의 희소 주석 객체 탐지(Sparsely Annotated Object Detection, SAOD) 접근법들은 일부 보행자만 주석이 달린 다중 스펙트럼(multispectral) 도메인의 희소 주석 환경을 다루는 데 진전을 보였지만, 다음과 같은 한계가 여전히 존재합니다. 누락된 주석에 대한 가상 레이블(pseudo-labels)의 품질을 개선하는 데 대한 고려가 부족합니다. 고정된 정답(ground truth) 주석에 의존하여, 다중 스펙트럼 도메인에서 보행자의 시각적 외형 중 제한된 범위만 학습하게 됩니다.

이러한 문제를 해결하기 위해 희소 주석 다중 스펙트럼 보행자 탐지(Sparsely Annotated Multispectral Pedestrian Detection, SAMPD)라는 새로운 프레임워크를 제안합니다. 적응형 가중치(Multispectral Pedestrian-aware Adaptive Weight, MPAW)와 긍정적 가상 레이블 강화(Positive Pseudo-label Enhancement, PPE) 모듈을 도입합니다. 이 모듈들은 다중 스펙트럼 지식을 활용하여 고품질의 가상 레이블 생성을 보장하고, 모달리티(modality) 특성을 기반으로 고품질 가상 레이블에 대한 가중치를 높여 효과적인 학습을 가능하게 합니다. 적응형 보행자 검색 증강(Adaptive Pedestrian Retrieval Augmentation, APRA) 모듈을 제안합니다. 이 모듈은 정답으로부터 보행자 패치(patch)를 적응적으로 통합하고, 고품질 가상 레이블을 정답과 동적으로 통합하여 보행자의 더 다양한 학습 풀(pool)을 용이하게 합니다.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/400dab46-587e-4142-ab46-ece56b74a469/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

최근 컴퓨터 비전 분야에서는 다중 스펙트럼 보행자 탐지(multispectral pedestrian detection)가 주목받고 있습니다. 단일 모달리티(가시광선 또는 열화상)만 사용하는 단일 모달 탐지기와 달리, 다중 스펙트럼 보행자 탐지는 가시광선 이미지와 열화상 이미지를 결합합니다. 가시광선 이미지는 질감과 색상을 포착하고, 열화상 이미지는 열 신호를 제공합니다. 이 두 모달리티를 결합하면 저조도 환경(Jia. 2021; Dasgupta. 2022) 및 악천후(Hwang. 2015)를 포함한 다양한 조건에서 탐지 견고성을 향상시킬 수 있습니다.

그러나 다중 스펙트럼 보행자 탐지는 희소 주석(sparse annotations)이라는 문제에 직면합니다. 이는 보행자가 실제로 존재함에도 불구하고 작거나 가려진 보행자에게 주석을 다는 과정에서 발생하는 인적 오류 때문에 자주 발생합니다. 이러한 불일치는 네트워크가 두 모달리티로부터 효과적으로 지식을 학습하는 것을 방해하여 보행자 탐지 성능의 심각한 저하를 초래합니다.

누락된 주석을 해결하기 위해 가상 레이블(pseudo-labels)을 생성하는 것을 목표로 합니다. 현재 방법들은 모델 예측에서 높은 신뢰도를 가진 박스를 선택하거나(Niitani. 2019; Wang. 2023a), 손실 함수를 조정하여 원본 이미지와 증강된 이미지 모두를 통합하거나(Wang. 2021), 부정적인 경사도 전파를 피하기 위해 자기 지도 손실을 적용하는(Suri. 2023) 등의 방법을 포함합니다. 하지만 이러한 방법도 고정된 정답(ground-truth) 주석 집합에 의존하기 때문에 가치 있는 누락된 주석을 통합하기 어려워, 다양한 보행자 시각적 외형을 학습하는 능력이 제한됩니다.

본 논문에서는 다중 스펙트럼 도메인의 희소 주석 문제를 해결하기 위해 희소 주석 다중 스펙트럼 보행자 탐지(SAMPD: Sparsely Annotated Multispectral Pedestrian Detection)라는 새로운 방법을 제시합니다. 우리 접근법은 두 가지 주요 과제를 고려합니다.

-가상 레이블로부터 다중 스펙트럼 보행자 정보를 효과적으로 학습하고 그 품질을 향상시키는 방법

-식별된 누락된 주석을 훈련 중에 통합하여 더 포괄적인 학습을 가능하게 하는 방법

과제 1을 해결하기 위해 기존 SAOD 연구에서 사용되는 교사-학생 구조(teacher-student structure)를 채택하였고 여기에 두 가지 새로운 모듈을 도입하였습니다. 다중 스펙트럼 보행자 인식 적응형 가중치(MPAW: Multispectral Pedestrian-aware Adaptive Weight)와 긍정적 가상 레이블 강화(PPE: Positive Pseudo-label Enhancement)입니다. MPAW 모듈은 모달리티 특성(단일 및 다중 스펙트럼)을 기반으로 고품질 가상 레이블에 더 높은 가중치를 할당하여 학생 모델이 다중 스펙트럼 모달리티를 학습하는 데 도움을 주는 것을 목표로 합니다. PPE 모듈은 특징 표현을 정렬하여 고품질 가상 레이블을 서로 더 유사하게 만드는 동시에, 낮은 품질의 가상 레이블과는 거리를 두게 합니다. 우리는 또한 불확실한 가상 레이블이 모델을 잘못 유도하는 것을 방지하도록 고려합니다.

과제 2를 해결하기 위해 적응형 보행자 검색 증강(APRA: Adaptive Pedestrian Retrieval Augmentation) 모듈을 제안합니다. 희소 주석 환경에서는 보행자의 다양한 시각적 표현을 활용하여 누락된 주석을 찾는 것이 중요합니다. APRA 모듈은 조명 조건에 따라 입력 이미지와 가장 잘 일치하는 정답 보행자 패치를 적응적으로 추가합니다.

---

### Related work

<img src="https://velog.velcdn.com/images/devjo/post/18c37d56-0816-4488-b727-2f49f39e2a76/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

#### 1. Multispectral Pedestrian Detection

다중 스펙트럼 보행자 탐지는 인상적인 성능으로 주목받고 있습니다. AR-CNN은 모달리티 정렬 문제(modality alignment issues)를 다루고 (Zhang. 2019), IATDNN+IASS는 견고성을 위해 조명 인식 메커니즘(illumination-aware mechanisms)을 도입합니다 (Guan. 2019). MBNet과 AANet은 모달리티 불일치(modal discrepancy)를 해결하며 (Zhou, Chen, and Cao 2020; Chen. 2023), MLPD는 다중 레이블 및 비쌍(non-paired) 증강을 제안합니다 (Kim. 2021). 이러한 연구들은 유망한 탐지 성능을 보였지만, 모두 완벽한 바운딩 박스 주석을 가정합니다.

#### 2. Sparsely annotated Object Detection

보행자 주석이 불완전할 때, 보행자가 전경(foreground) 또는 배경(background)으로 잘못 분류되는 불일치가 발생할 수 있습니다. 가상 레이블 방법 (Niitani. 2019)은 객체 동시 발생(object co-occurrence)과 가상 레이블 적용 간의 논리적 연결을 설정합니다. BRL (Zhang. 2020)은 잘못 레이블링될 가능성이 있는 영역에 대해 자동 조정을 도입합니다. SparseDet (Suri. 2023)은 부정적인 경사도 전파를 방지하기 위해 자기 지도 손실(self-supervised loss)을 도입합니다. 하지만 기존 방법들은 가상 레이블의 품질을 고려하지 않고 그것들이 신뢰할 수 있다고 가정합니다.

---

### Method

#### 1. 다중 스펙트럼 보행자 인식 적응형 가중치 (MPAW)

SAOD 방법에서 흔히 사용되는 교사-학생 구조를 채택합니다. 우리의 최종 탐지기인 학생 모델은 교사 모델이 생성한 가상 레이블로부터 학습합니다. 다중 스펙트럼 데이터는 가시광선(V), 열화상(T), 융합(F) 모달리티로 구성됩니다. 희소 주석 시나리오에서 효과적인 가상 레이블을 생성하기 위해, 교사 모델과 학생 모델 모두 3-방향 인코딩 경로(3-way encoding paths)로 구성되어 훈련 중에 단일 모달(V와 T) 및 다중 스펙트럼(F) 지식을 완전히 활용합니다. 교사 모델에서 나오는 일부 가상 레이블은 보행자의 일부만 포착하거나 배경 요소를 포함하는 등 부정확할 수 있습니다. 이러한 오류는 학생 모델의 성능에 부정적인 영향을 미치고 훈련 중에 혼동을 유발할 수 있습니다. 이를 해결하기 위해 우리는 각 모달리티에 대해 신뢰할 수 있는 가상 레이블의 영향력을 높이고 신뢰할 수 없는 가상 레이블의 영향을 줄이는 MPAW 모듈을 제안합니다. 이 접근법은 고품질 가상 레이블과 신뢰할 수 있는 모달리티를 강조합니다.

$$
k=\{V,T,F\}, \\
f_{PL}^{k(s)}=\{f_{PL_i}^{k(s)}\}^N_{i=1}, \\
f_{GT}^{k(s)}=\{f_{GT_i}^{k(s)}\}^M_{i=1}
$$

위 수식을 설명하면 각 모달리티에 대해 학생 모델의 가상 레이블 박스에서 $N$개의 특징 맵과 정답 레이블에서 $M$개의 특징 맵을 추출합니다.

$$
l^{k(s)}_{PL}=\{l^{k(s)}_{PL_i}\}^N_{i=1}, \\
l^{k(s)}_{GT}=\{l^{k(s)}_{GT_i}\}^M_{i=1}
$$

그런 다음 전역 평균 풀링(GAP)를 적용하여 잠재 벡터를 얻습니다. 모달리티 $k$에 대한 가중치 $w^k$는 아래와 같이 정의됩니다.

$$
w^k=\frac{1}{N} \sum^N_{i=1} max_{j \in \{1, ..., M\}} d(l^{k(s)}_{PL_i}, l^{k(s)}_{GT_j}), \\
d(\alpha, \beta)=\frac{\alpha \cdot \beta}{|\alpha| |\beta|}
$$

$d(\cdot, \cdot)$는 코사인 유사도(cosine similarity)입니다. 따라서 $l_{PL}^{k(s)}$와 $l_{GT}^{k(s)}$에서 가장 가까운 벡터 간의 최대 코사인 유사도를 계산합니다. $w^k$ 값이 높으면 모달리티 k에 대한 가상 레이블이 정답 레이블과 가깝게 일치하여 신뢰할 수 있는 품질을 반영합니다.

#### 2. 긍정적 가상 레이블 강화 (PPE)

$$
a = \text{argmax}_{j \in \{1, ..., M\}} d(l^{k(s)}_{PL_i}, l^{k(s)}_{GT_j})
$$

$i$번째 가상 레이블과 가장 유사한 정답 레이블 간의 유사도가 $\tau_1$을 초과하면 긍정적 가상 레이블로 분류됩니다. 반대로 $\tau_2$ 미만이면 부정적 가상 레이블로 분류합니다.

$$
p_{PL}(p_i)=\sum^{N_p}_{j=1} exp(d(l^{k(s)}_{PL, p_i}, l^{k(s)}_{PL, p_j})/\tau), \\
n_{PL}(p_i)=\sum^{N_n}_{j=1} exp(d(l^{k(s)}_{PL, p_i}, l^{k(s)}_{PL, n_j})/\tau), \\
L_{PG}^k=-\frac{1}{N_p}\sum^{N_p}_{i=1} log \frac{p_{PL}(p_i)}{p_{PL}(p_i)+n_{PL}(p_i)}
$$

분류 이후 긍정적 가상 레이블 유도 손실 $L^k_{PG}$를 고안하였습니다. 여기서 $p, n$은 각각 긍정과 부정을 나타내고 $N$은 레이블 수이며 $\tau$는 온도 매개변수입니다.

---

### Experiments

<img src="https://velog.velcdn.com/images/devjo/post/8001cad1-adaa-4cf7-b949-f8cb5c4e6cff/image.png
" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

APRA 모듈은 고품질의 가상 레이블을 새로운 정답으로 사용하는 동적(dynamic) 속성을 가지고 있습니다. 주석의 수는 에폭이 진행됨에 따라 점진적으로 증가합니다. APRA 모듈의 동적 메커니즘은 잠재적으로 누락된 보행자의 다양한 시각적 외형을 학습하며, KAIST 데이터셋에서는 8.88에서 8.56으로, LLVIP 데이터셋에서는 8.58에서 7.65로 개선하는 등 정적 접근법(즉, 동적 정제 없음)에 비해 향상된 성능을 보였습니다. 그리고 주석 희소성을 크게 줄여 이전에 누락되었던 많은 주석들을 성공적으로 채워 넣었음을 보여줍니다.

---

### Conclusion

본 논문에서는 희소 주석 시나리오에서 다중 스펙트럼 보행자 탐지를 위한 새로운 프레임워크를 제시합니다. 이 논문에서는 세 가지 핵심 모듈을 포함합니다.

신뢰할 수 있는 가상 레이블 지식의 전이 가중치를 높이는 MPAW 모듈, 교사 모델이 더 나은 가상 레이블을 생성하도록 유도하는 PPE 모듈, 보행자 패치를 사용하여 정답 주석을 적응적으로 정제하는 ARPA 모듈이 해당합니다.

SAMPD에서 다양한 결과가 APRA 모듈의 효과를 보여주지만, 현재는 이미지 수준의 유도만 제공하며 개별 보행자의 특성보다는 전체 이미지의 밝기를 기반으로 보행자를 샘플링합니다. 따라서 전체 이미지 외에 개별 보행자 특성을 고려하여 이미지 수준과 특징 수준 모두에서 효과적으로 유도하는 방법을 탐구하는 것이 향후 연구의 유망한 방향이 될 수 있습니다.

---

### 참고 자료

[원본 경로 #1](https://arxiv.org/abs/2501.02640)

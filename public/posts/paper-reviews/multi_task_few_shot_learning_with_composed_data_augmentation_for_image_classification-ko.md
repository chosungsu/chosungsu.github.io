---
title: 'Multi task few-shot learning with composed data augmentation for image classification'
date: '2023-07-21'
tags: ['computer vision', 'paper review']
---

### Abstract

소수 샷 학습은 아주 적은 수의 샘플로 모델을 최적화하려 하지만, 여전히 데이터 희소성 문제에 직면해 있습니다. 이를 해결하기 위해 데이터 증강이 널리 사용되지만 기존 방식은 모든 증강된 샘플이 원본과 유사한 의미론적 정보만 반복하기 때문에 모델이 증강 변환 자체의 속성(예: 회전, 변형 등)을 학습하지 못합니다.

본 논문에서는 기본 분류 작업과 보조 작업을 동시에 학습하는 구조를 제안합니다. 그리고 분류기의 신뢰도를 높이기 위해 Model agnostic Ensemble Inference(MAEI)를 제안합니다.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/cdc65541-2b91-4841-9c1e-dd1e36400f0a/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

최근 딥러닝은 대규모 라벨링 데이터를 통해 인간의 이미지 분류 능력을 뛰어넘었지만, 이는 방대한 데이터에 의존하는 방식입니다. 반면 인간은 단 한 장의 사진만으로도 고양이라는 개념을 일반화하여 인식할 수 있는 빠른 적응 능력을 갖추고 있습니다. 데이터가 희소한 상황에서 인간과 유사한 알고리즘을 구축하는 것은 실무적으로 매우 중요한 가치를 지닙니다.

기존의 자기지도 라벨 증강(SLA) 방식은 하나의 데이터에 이중 라벨(카테고리 + 변환 정보)을 부여하여 복잡도를 높이는 단점이 있었습니다. 본 논문은 이를 개선하기 위해 병렬 구조의 멀티태스크 학습을 제안합니다. 회전(Rotation), 믹스업(Mixup), 가우시안 노이즈 등 여러 조합을 실험한 결과 회전과 믹스업을 자기지도 신호로 사용할 때 가장 우수한 성능을 보임을 확인했습니다.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/93d62e67-00bb-4f47-a74e-a8a124eb2d64/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### Problem Statement

베이스 클래스와 새로운 클래스 간의 임베딩 공간 차이를 메우기 위해 에피소드 기반 학습을 수행합니다. 각 에피소드마다 $D_{train}$에서 $N$개의 클래스를 무작위로 샘플링하여 서포트 세트($S$)와 쿼리 세트($Q$)로 ($N$-way $K$-shot 설정)을 구성합니다.

서포트 세트를 증강하여 $S_{aug}$를 얻습니다. 임베딩 함수 $f_{\phi}$는 입력 $x$를 특징 $z$로 매핑합니다. 4개의 ResNet 블록으로 구성되며, 각 블록은 Conv2d, BN, ReLU 계층과 Max pooling 계층을 포함합니다.

#### Composed Data Augmentation

본 연구에서는 회전, Mixup, 색상 순열(Color Permutation) 중 세 가지 연산을 보조 자기지도 신호로 예측하는 최적의 조합을 탐색했습니다.

#### Multi-task for FSL

메트릭 학습 기반의 프로토타입 네트워크 아키텍처를 사용합니다. $m$번째 그룹의 $n$번째 클래스에 대한 프로토타입 $P_{m,n}$은 서포트 특징들의 평균으로 계산됩니다.

$$
P_{m,n} = \frac{1}{|S_{m,n}|} \sum_{x_{n,j} \in S_{m,n}} f_\phi(x_{n,j})
$$

이후 쿼리 특징과 프로토타입 간의 유사도 점수 $s_{m,n}$을 계산하고 평균 가중치를 통해 최종 예측 확률 $s'_n$을 구합니다.

$$
s_{m,n} = \frac{\exp(-d(f_{\phi}(\tilde{x}), P_{m,n}))}{\sum_{n'} \exp(-d(f_{\phi}(\tilde{x}), P_{m,n'}))}
$$

이 수식은 거리 기반의 분류기에서 흔히 사용되는 소프트맥스(Softmax) 형태를 띠고 있습니다. 여기서 $d(f_{\phi}(\tilde{x}), P_{m,n})$은 쿼리 이미지의 특징 벡터($f_{\phi}(\tilde{x})$)와 $m$번째 그룹 내 $n$번째 클래스의 프로토타입 사이의 유클리드 거리입니다. 거리가 가까울수록 두 데이터는 유사함을 의미합니다. 거리에 마이너스를 붙여 지수 함수를 취함으로써, 거리가 가까울수록(값이 작을수록) 더 큰 결과값을 갖게 만듭니다. 즉, 거리를 유사도 점수로 변환하는 과정입니다.

---

### Conclusion

본 논문은 기본 분류 작업과 병렬로 보조 자기지도 작업을 배치하여 모델이 단순한 이미지 라벨링을 넘어 데이터에 가해진 변환 속성을 이해하도록 설계했습니다. 미세 조정이 필요 없는 플러그 앤 플레이 방식의 의사결정 융합 기술을 제안했습니다. 특히 NMS 전략을 통해 이상치를 제거함으로써 기존 메트릭 기반 FSL 모델들의 신뢰도를 크게 높였습니다.

향후 데이터 증강이 거리 기반 학습(Metric Learning)에 미치는 영향을 심도 있게 탐구하여 비지도 학습(Unsupervised Task)으로 확장할 가능성이 있습니다. 그리고 ResNet-12 수준을 넘어 더 거대한 신경망 구조가 이러한 멀티태스크 학습 환경에서 어떤 효과를 내는지 분석할 가치가 있습니다.

---

### 참고 자료

[원본 경로 #1](https://ietresearch.onlinelibrary.wiley.com/doi/pdf/10.1049/cvi2.12150)

---
title: 'Paired-Point Lifting for Enhanced Privacy-Preserving Visual Localization'
date: '2025-05-03'
tags: ['3d perception', 'paper review']
---

### Abstract

Visual Localization은 입력 이미지로부터 알려진 장면에 대한 카메라 포즈를 복구하는 과정을 의미하며, 이는 수많은 비전 및 로봇 공학 시스템의 초석을 형성합니다.

많은 알고리즘이 장면의 희소 3차원 포인트 클라우드를 활용하여 측위를 수행하지만, 최근 연구들은 이러한 희소 3차원 표현으로부터 장면의 고충실도 외형을 성공적으로 드러냄으로써 개인 정보 보호 문제를 제기했습니다.

이러한 공격을 우회하기 위한 하나의 저명한 접근 방식은 3차원 포인트를 무작위로 방향이 지정된 3차원 선으로 끌어올려 장면 기하학을 숨기는 것이었지만, 최신 작업은 이러한 무작위 선 클라우드가 보호를 뚫을 수 있는 치명적인 통계적 결함을 가지고 있음을 보여주었습니다.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/2e1521e4-2762-4e65-9976-a319563497a7/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

#### 3차원 포인트 클라우드의 활용과 개인 정보 보호 문제

많은 실용적인 시각적 측위 알고리즘은 SfM 또는 SLAM으로부터 얻은 장면의 전역 희소 3차원 모델을 활용하는 구조 기반 접근 방식입니다.

2차원 이미지 포인트와 전역 3차원 구조 사이에 2D-3D 대응점이 특징 디스크립터(SIFT, ORB) 등을 비교하여 형성되며 기하학적 제약 조건을 기반으로 강건한 카메라 포즈 추정을 수행하는 데 사용됩니다.

#### 기존의 프라이버시 보호 접근 방식과 그 한계

포인트 클라우드에 대한 위 개인 정보 보호 공격을 해결하기 위한 가장 주목할 만한 접근 방식 중 하나는 기하학적 리프팅(geometric lifting)입니다. 여기서 각 3차원 포인트는 해당 포인트를 지나는 무작위로 방향이 지정된 3차원 선으로 변환됩니다. 단위 구에서 각 선 방향을 균일하게 샘플링함으로써, 이 접근 방식은 장면 기하학을 숨기고 희소 포인트 클라우드의 의미 있는 2차원 투영을 방지하는 것을 목표로 합니다.

#### PPL (Paired-Point Lifting) 제안

본 연구에서 3차원 선 클라우드의 개인 정보 보호 속성이 다른 선 구성 접근 방식을 적용하여 향상될 수 있다고 주장합니다. 구체적으로 3차원 포인트의 무작위 쌍을 연결하여 3차원 선을 생성할 것을 제안합니다.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/97955939-379a-4e6e-a5bd-941902fd6046/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

기존 선 클라우드(Original Line Cloud)의 단점을 극복하기 위해 선 클라우드에서 선을 샘플링하기 위한 다른 전략을 제안합니다. PPL은 희소 포인트 클라우드에서 겹치지 않는 3차원 포인트 쌍을 무작위로 할당한 다음, 각 포인트 쌍을 연결하여 선 클라우드를 생성합니다.

각 선은 두 3차원 포인트를 통과하므로 $N$개의 3차원 선을 초래하며, $2N$은 3차원 포인트의 수를 나타냅니다.

#### 특징 디스크립터의 효과

두 3차원 포인트 $\text{A}$와 $\text{B}$가 단일 $\text{PPL}$ 기반 선에 숨겨져 있다고 가정합니다. 각 선에 대해 독립적이므로, 올바른 할당을 가진 선의 수는 이항 확률 변수 $\mathbf{X} \sim \text{B}(N, 0.5)$이며 $N$은 총 선의 수입니다.

#### 균일하지 않은 선 방향의 효과

원래 3차원 포인트의 집합을 다시 $\mathbf{P} = \{\mathbf{x}_j\}$로 정의하며, 여기서 $\mathbf{x}_j \in \mathbb{R}^3$는 포인트 클라우드의 $j$번째 포인트입니다. 해당 리프팅된 선은 집합 $\mathcal{L} = \{l_j\}$를 형성하며, 여기서 각 $l_j \in \mathbb{R}^6$는 선 방향과 오프셋으로 구성됩니다.

선 방향은 포인트 위치 $\mathbf{P}$와 그들의 쌍 배열 $\mathcal{S} := \{(i, j)\}$이 주어지면 결정됩니다.

$$
P(\mathcal{L}|\mathbf{P}) = \sum_{\mathcal{S} \in \Omega} P(\mathcal{L}|\mathcal{S}, \mathbf{P}) P(\mathcal{S}|\mathbf{P}) = \frac{1}{|\Omega|} \sum_{\mathcal{S} \in \Omega} \delta(\mathcal{L} - \mathcal{L}_{\mathcal{S}})
$$

여기서 $\Omega$는 3차원 포인트의 가능한 모든 쌍 배열의 집합을 나타내며, $|\Omega|$는 가능한 모든 쌍 배열의 총 수입니다. 따라서 $P(\mathcal{L}|\mathbf{P})$는 균일하지 않습니다.

---

### Conclusion

본 연구에서 3차원 포인트와 선의 통계를 활용하여 포인트 클라우드와 각각의 장면 세부 정보가 드러날 수 있다는 OLC의 주요 한계점에 동기 부여를 받았습니다.

이 문제를 완화하기 위해, 우리는 희소 포인트의 무작위 쌍을 연결하여 선 클라우드를 생성함으로써 선당 두 포인트를 숨기는 PPL이라는 새로운 경량 전략을 제안했습니다.

향후 연구를 위한 흥미로운 방향에는 개인 정보 보호 조치가 필요한 실시간 응용 분야를 위한 더 보호적인 리프팅 접근 방식을 고안하거나 선 클라우드를 위한 더 빠른 재측위 알고리즘을 개발하는 것이 포함됩니다.

---

### 참고 자료

[원본 경로 #1](https://openaccess.thecvf.com/content/CVPR2023/papers/Lee_Paired-Point_Lifting_for_Enhanced_Privacy-Preserving_Visual_Localization_CVPR_2023_paper.pdf)

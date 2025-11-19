---
title: 'ScrewSplat: An End-to-End Method for Articulated Object Recognition'
date: '2025-10-08'
tags: ['embodied ai', 'paper review']
---

### Abstract

관절형 객체 인식 (Articulated object recognition)은 로봇이 문이나 노트북과 같은 일상적인 객체와 상호 작용할 수 있도록 하는 데 필수적입니다.

그러나 기존 접근 방식들은 종종 관절형 부품의 알려진 개수와 같은 강한 가정에 의존하거나, 깊이 이미지와 같은 추가 입력을 요구하거나, 잠재적인 오류를 유발할 수 있는 복잡한 중간 단계를 포함하여 실제 환경에서의 실용성을 제한합니다.

본 논문에서 오직 RGB 관찰만을 기반으로 작동하는 간단한 엔드투엔드 방법인 ScrewSplat을 소개합니다. 접근 방식은 스크류 축 (screw axes)을 무작위로 초기화하는 것으로 시작하며, 이는 객체의 기저 운동학적 구조를 복구하기 위해 반복적으로 최적화됩니다.

가우시안 스플래팅 (Gaussian Splatting)과 통합함으로써, 3D 기하학적 구조를 동시에 재구성하고 객체를 단단하고 움직일 수 있는 부품으로 분할합니다.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/3bbcffe5-1bd5-414f-af0f-afbe6ed1af40/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### 관절형 객체 인식의 중요성 및 기존 접근법의 한계

문, 노트북, 서랍과 같이 움직이는 부품이 있는 관절형 객체 (articulated objects)는 일상 환경에서 흔하며, 이러한 객체를 조작하려면 3D 기하학적 구조와 기저 운동학적 구조 모두에 대한 이해가 필요합니다.

이전에 수행된 연구들은 주석이 달린 관절 축을 가진 3D 객체의 대규모 데이터셋을 지도 학습 환경에서 사용하여 이 문제를 다루었지만 이러한 방법들은 보지 못한 카테고리로 일반화하는 데 어려움을 겪습니다. 이는 지도 학습의 자연스러운 한계입니다.

본 연구에서는 카테고리별 지도 정보에 의존하지 않고 다양한 객체 구성 하의 다중 시점 RGB 이미지로부터 운동학적 구조를 직접 추론하는 것을 제안합니다.

#### ScrewSplat 제안 및 핵심 아이디어

중간 단계, 보조 데이터, 관절 유형 또는 개수에 대한 사전 지식을 모두 피하는 관절형 객체 인식을 위한 간단한 엔드투엔드 방법인 ScrewSplat을 제안합니다. 이 작업을 부분 인지 기하학, 관절 축 및 유형, 관절 각도에 대한 공동 최적화로 공식화합니다. 이를 통해 렌더링된 시점이 관찰과 일치하도록 합니다. 이 문제는 연속 변수 (기하학 및 관절 각도)가 이산적이고 조합적인 변수 (부분 분할 레이블, 관절 유형 및 관절 개수)와 결합되는 하이브리드 구조로 인해 특히 도전적입니다.

핵심 아이디어는 기하학 및 외관을 나타내기 위해 가우시안 스플래팅 (Gaussian splatting)을 채택하고, 이를 관절 축의 연속적인 매개변수화를 제공하는 스크류 모델 (screw model)로 확장하는 것입니다. 이산 변수에 의존하지 않고 관절 유형 및 개수를 나타내기 위해, 스크류 축에 대한 신뢰도 점수를 도입하고 확률 단체 (probability simplex)를 사용하여 가우시안을 단단한 부품에 부드럽게 할당합니다.

---

### Preliminaries

#### 1. Screw Theory

<img src="https://velog.velcdn.com/images/devjo/post/e1fc2b8d-4910-4844-ae35-f0c1d4dca729/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

스크류 이론은 스크류의 운동을 설명하기 위한 자연스러운 수학적 공식을 제공하며, 이는 축을 중심으로 한 회전과 축을 따라 한 변환을 결합합니다.

$$
S = \begin{pmatrix} \omega \\ v \end{pmatrix} \in \mathbb{R}^6
$$

여기서 $\omega \in \mathbb{R}^3$ 및 $v \in \mathbb{R}^3$이며, 이들은 다음 중 하나를 만족합니다. (1) $||\omega|| = 1$ 또는 (2) $\omega = 0$ 및 $||v|| = 1$.

1이 성립하면, 스크류는 축 $\omega$를 중심으로 한 회전과 동일 축을 따른 변환으로 구성된 운동을 나타냅니다. 특히, $v = -\omega \times q + h\omega$를 만족하며, 여기서 $q$는 스크류 축 상의 임의의 점이고 $h$는 스크류의 피치입니다. 본 논문에서는 순수한 회전 운동을 나타내는 회전 관절 (revolute joints)만을 고려하므로 $h=0$으로 설정합니다.

2가 성립하면, 스크류는 축 $v$를 따라 순수한 변환의 운동을 나타내며, 이 경우 프리즈마틱 관절 (prismatic joint)에 해당합니다.

스크류 축 $S$와 관절 각도 $\theta$가 주어졌을 때, 스크류 축을 따라 $\text{SE}(3)$의 임의의 강체 좌표 $T$의 운동은 행렬 지수를 사용하여 표현될 수 있습니다.

$$
\begin{aligned}
&T' = e^{[S]\theta}T \\
&[S] = \begin{pmatrix} [\omega] & v \\ 0 & 0 \end{pmatrix} \in \mathbb{R}^{4 \times 4} \\
&[\omega] = \begin{pmatrix} 0 & -\omega_3 & \omega_2 \\ \omega_3 & 0 & -\omega_1 \\ -\omega_2 & \omega_1 & 0 \end{pmatrix} \in \mathbb{R}^{3 \times 3}
\end{aligned}
$$

#### 2. 3D Gaussian Splatting

3D 가우시안 스플래팅은 다중 RGB 이미지로부터 새로운 시점 합성을 위해 개발되었으며 장면의 3D 표현을 얻는 데에도 사용될 수 있습니다. 여기서 $i$번째 가우시안 $G_i$는 튜플 $(T_i, s_i, \sigma_i, c_i)$로 매개변수화됩니다.

RGB 이미지를 렌더링하기 위해 일반적인 $\alpha$-블렌딩 접근 방식이 사용되며, 여기서 $\alpha_i$는 3D 공간 $\mathbb{R}^3$에서 정의된 $i$번째 가우시안 $G_i$의 스케일된 가우시안 함수입니다.

$$
\alpha_i(x) = \sigma_i e^{-\frac{1}{2}(x-\mu_i)^T \Sigma_i^{-1} (x-\mu_i)}
$$

픽셀의 최종 색상 $C$는 픽셀과 겹치는 $N$개의 순서가 지정된 가우시안을 블렌딩하여 계산됩니다.

$$
C = \sum_{i \in \mathcal{N}} c_i \alpha_i \prod_{j=1}^{i-1} (1 - \alpha_j)
$$

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/47111d6f-7a48-483d-a092-0d91a52fbefe/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### ScrewSplat

$\mathbf{n}_s$개의 스크류 원시 요소 (screw primitives)에 대해서 $j$번째 스크류 원시 요소 $A_j$가 스크류 축 $S_j \in \mathbb{R}^6$과 신뢰도 $\gamma_j \in [0, 1]$로 매개변수화된 튜플 $(S_j, \gamma_j)$로 정의됩니다.

$\mathbf{n}_g$개의 부분 인지 가우시안 원시 요소 (part-aware Gaussian primitives)에서 $i$번째 원시 요소 $H_i$는 확장된 튜플 $(T_i, s_i, \sigma_i, c_i, m_i)$로 매개변수화됩니다. 여기서 $m_i = (m_{i0}, \ldots, m_{in_s}) \in \Delta^{n_s}$는 $(\mathbf{n}s + 1)$개 부품에 대한 확률 그룹입니다.

RGB 렌더링 절차의 핵심 아이디어는 각 부분 인지 가우시안 원시 요소로부터 가우시안을 복제하고, 복제된 각 가우시안을 정적 베이스 또는 움직이는 부품 중 하나에 할당하는 것입니다. 각 가우시안 $G_{ij}$는 $j = 0$이면 베이스 부품에 할당되고, $j \geq 1$이면 스크류 원시 요소 $A_j$와 관련된 움직이는 부품에 할당됩니다.

$$
L = L_{\text{render}} + \beta \sum_j \sqrt{\gamma_j}
$$

여기서 $L_{\text{render}}$는 렌더링 손실이며, $\beta$는 $0.002$로 설정된 가중치 계수입니다. 두 번째 항은 정규화 항으로 작용하며 간결성 손실 (parsimony loss)이라고 합니다. 가능한 가장 적은 수의 스크류 원시 요소를 사용하여 관절형 객체를 표현하도록 장려합니다.

#### Controlling joint angles using ScrewSplat as a Renderer

관절형 객체의 시각적 외관 $I$는 임의의 카메라 포즈에서 연속적이고 미분 가능한 함수 $\pi$를 통해 얻을 수 있으며, $I = \pi(\theta)$입니다. 이 함수 $\pi$는 렌더링된 이미지에 대한 적절한 목적 함수를 정의하고 그에 따라 관절 각도를 최적화함으로써 관절형 객체의 현재 포즈를 추정하는 것과 같은 다양한 응용을 가능하게 합니다.

구체적으로, 객체의 현재 시각적 외관 $I_c$와 현재 상태의 텍스트 설명 $t_c$, 그리고 목표 텍스트 프롬프트 $t_p$가 주어졌을 때, 목표는 렌더링된 외관 $I = \pi(\theta)$가 목표 프롬프트 $t_p$와 정렬되도록 하는 관절 각도 벡터 $\theta$를 찾는 것입니다.

이를 달성하기 위해 RGB 이미지와 텍스트를 공유 잠재 공간에 임베딩하여 시각적 입력과 텍스트 입력 간의 유사성 계산을 가능하게 하는 CLIP 모델을 활용합니다.

$$
L_{\text{CLIP-dir}} = 1 - \frac{\triangle I(\theta) \cdot \triangle T}{||\triangle I(\theta)|| \hspace{1mm} ||\triangle T||}
$$

다음과 같이 정의된 방향성 CLIP 손실 (directional CLIP loss)에서 $\triangle I(\theta) = e_I(\pi(\theta)) - e_I(I_c)$와 $\triangle T = e_T(t_p) - e_T(t_c)$는 CLIP 잠재 공간의 방향성 변화를 나타냅니다.

---

### Conclusion

본 논문에서 오직 RGB 관찰만을 기반으로 작동하는 관절형 객체 인식을 위한 새로운 엔드투엔드 프레임워크인 ScrewSplat을 제안합니다.

스크류 이론과 가우시안 스플래팅을 활용하고, 스크류 축에 대한 신뢰도 점수와 가우시안에 대한 부분 확률 단체를 도입함으로써, 기하학적 및 운동학적 구성 요소 모두에 대한 부드럽고 통합된 최적화를 가능하게 합니다.

이전 접근 방식과 달리, ScrewSplat은 강한 가정, 복잡한 중간 단계, 깊이 데이터에 대한 의존성을 피하며, 그 결과 더욱 강건하고 일반화 가능한 해결책을 제시합니다. 나아가 제로샷, 텍스트 안내 관절형 객체 조작에 직접 적용될 수 있음을 보여주었으며, 이는 로봇이 실제 환경에서 고수준 사용자 의도에 따라 관절 각도를 물리적으로 조정할 수 있도록 합니다.

---

### 참고 자료

[원본 경로 #1](https://arxiv.org/pdf/2508.02146)

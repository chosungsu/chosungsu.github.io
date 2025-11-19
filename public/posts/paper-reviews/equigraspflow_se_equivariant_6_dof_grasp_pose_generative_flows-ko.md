---
title: 'EquiGraspFlow: SE(3)-Equivariant 6-DoF Grasp Pose Generative Flows'
date: '2025-10-06'
tags: ['embodied ai', 'paper review']
---

### Abstract

3차원 (3D) 관찰로부터 6-자유도 (6-DoF) 파지 자세 (grasp poses)를 합성하는 전통적인 방법들은 종종 기하학적 발견법 (geometric heuristics)에 의존하여, 일반화 성능 저하, 제한된 파지 옵션, 및 높은 실패율을 초래합니다.

최근에는 생성 모델을 사용하여 파지 자세의 분포를 학습하고 다양한 후보 자세를 생성하는 데이터 기반 방법들이 제안되었습니다. 이러한 방법들의 주요 단점은 $\text{SE}(3)$ 불변성을 달성하지 못한다는 것입니다. 이는 생성된 파지 자세가 객체 회전 및 변환에 따라 정확하게 변환되지 않음을 의미합니다.

본 논문에서 우리는 $\text{SE}(3)$ 등변성 6-자유도 파지 자세 생성 모델인 EquiGraspFlow를 제안합니다. 이 모델은 $\text{SE}(3)$ 다양체 (manifold) 상에서 복잡한 조건부 분포를 학습할 수 있으며 $\text{SE}(3)$ 등변성을 보장합니다.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/18decfcd-2b66-4570-8966-ceb82821dccc/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

객체의 3D 관찰로부터 6-자유도 (6-DoF) 파지 자세를 합성하는 것은 로봇 공학에서 근본적인 작업입니다. 제한된 수의 파지 자세만 생성하는 접근 방식은 특히 제한된 환경에서 파지 실패의 위험이 높습니다. 예를 들어, 장애물이나 운동학적 제약으로 인해 로봇이 특정 파지 후보 자세에 도달하지 못할 수 있으므로, 더 다양한 후보를 가질수록 파지 성공 확률이 높아집니다.

다양한 파지 자세를 생성하기 위한 초기 접근 방식들은 객체의 기하학적 구조를 기반으로 여러 후보를 제안하기 위해 기하학적 발견법 (geometric heuristics)에 의존했습니다. 이러한 방법들은 일반적으로 반대되는 표면 법선을 가진 표면 포인트 쌍인 반족점 (antipodal surface points)을 그리퍼의 손끝 접촉점으로 식별합니다. 그러나 반족점에 의존하는 것은 파지 자세의 다양성을 제한하고, 표면 포인트 및 법선의 관찰 잡음에 민감하게 만듭니다.

최근 데이터 기반 접근 방식이 큰 주목을 받고 있습니다. 이 방법들은 먼저 시뮬레이션을 통해 충분히 다양한 파지 자세를 생성한 다음, 이 데이터를 사용하여 파지 자세의 분포를 학습하고 파지 자세 생성 모델을 훈련합니다. 훈련된 모델은 다양한 자세를 생성할 뿐만 아니라 도메인 무작위화를 사용하여 관찰 잡음에 강건해질 수 있습니다.

그러나 기존 파지 자세 생성 모델의 주요 결함은 회전된 객체에 대해 일관된 파지 자세를 생성하지 못하여 일부 경우에 심각한 실패로 이어진다는 것입니다. 이상적인 모델은 이미지에 표시된 것처럼 회전 및 변환된 객체에 대해 동일하게 변환되는 파지 자세를 생성해야 합니다. 이러한 모델은 $\text{SE}(3)$ 등변 ($\text{SE}(3)\text{-equivariant}$)이라고 간주됩니다. 기존 방법들은 데이터 증강을 통해 이를 달성하려는 노력에도 불구하고 이러한 등변성을 보장하지 못합니다.

구체적으로, 본 논문에서 시간 의존적 속도장을 무한한 수의 무한히 작은 변환으로 활용하여 확산 모델이나 이산 정규화 흐름보다 복잡한 분포를 더 효과적으로 학습하는 연속 정규화 흐름 (Continuous Normalizing Flows, CNFs) 프레임워크를 채택합니다.

---

### Related works

#### 1. Generative Models for Grasping

Mousavian et al.은 VAE 기반의 파지 자세 생성 모델인 6-DOF GraspNet을 개발했으며, 추가적인 데이터 기반 파지 평가자를 사용하여 생성된 파지 자세를 개선합니다.

Urain et al.은 $\text{SE}(3)$ 다양체 (manifold) 상의 확산 모델을 제안했는데, 이를 $\text{SE}(3)\text{-DiffusionFields}$라고 명명했으며 파지 자세 생성에 사용했습니다.

이러한 발전에도 불구하고, 기존 파지 자세 생성 모델들은 $\text{SE}(3)$ 등변성을 완전히 탐구하지 못했습니다. 이들은 증강 전략에 의존하거나, 파지의 가정 하에 부분적인 등변성만을 달성합니다. 

#### 2. Equivariance for Grasping

Zhu et al.은 탑다운 이미지 관찰로부터 평면 파지 자세를 생성하기 위해 $\text{SE}(2)$ 등변성을 통합하여 향상된 샘플 효율성을 달성했습니다.

Huang et al.은 $\text{SE}(3)$ 불변 파지 품질 함수인 Edge Grasp Network를 구성하여 6-자유도 파지 자세에 대한 향상된 파지 품질 예측 성능을 가져왔습니다.

그러나 이러한 방법들은 생성 모델을 사용하지 않기 때문에, 제한된 파지 자세 세트만을 생성하거나 충분한 다양성이 부족한 기하학적 발견법에 의존합니다.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/2773cbe7-5fee-4ae3-ad16-2a9098bf0937/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

conditional continuous normalizing flows(CNF)접근 방식을 사용하여 포인트 클라우드 입력으로부터 다양한 6-자유도 (6-DoF) 파지 자세를 생성하는 동시에 $\text{SE}(3)$ 등변성을 보장하는 EquiGraspFlow를 소개합니다.

포인트 클라우드를 $P = \{x_k \in \mathbb{R}^3\}^K_{k=1}$로 나타낼 때, $\text{EquiGraspFlow}$는 시간 의존적 조건부 속도장 $\omega_\theta(t, P, T)$, $v_\phi(t, P, T)$와 사전 조건부 분포 $p_0(T|P) = p_0(R)p_0(x|P)$를 활용합니다. 여기서 $p_0(R)$은 $\text{SO}(3)$ 상에서 균일하며, $p_0(x|P)$는 $\mathbb{R}^3$에서 가우시안 분포이며 그 평균은 포인트 클라우드의 중심에 위치합니다.

$i$번째 객체의 포인트 클라우드 $P_i$와 해당 성공적인 파지 자세 집합 $\{T_{ij}\}^{M_i}_{j=1}$ 쌍으로 구성된 데이터셋 $\mathcal{D} := {(P_i, {T_{ij}}^{M_i}{j=1})}^N{i=1}$을 사용합니다. 각 파지 자세 집합은 해당 실측 조건부 분포 $q(T|P_i)$에서 샘플링되었다고 가정합니다. 신경 속도장 $\omega_\theta$와 $v_\phi$는 변환된 조건부 분포 $p_1(T|P_i)$가 $q(T|P_i)$를 밀접하게 근사하도록 $\mathcal{D}$를 사용하여 훈련됩니다. 흐름 매칭 (Flow Matching) 프레임워크를 사용하여 속도장을 훈련하고, 유도 흐름 (Guided Flows) 를 사용하여 샘플 품질을 향상시킵니다.

#### SE(3) Invariant Conditional Distributions

먼저 포인트 클라우드, 파지 자세, 및 3차원 벡터에 대한 변환을 정의합니다. $\text{SE}(3)$의 요소 $T' = (R', x')$이 주어졌을 때, 포인트 클라우드 $P = \{x_k\}$는 $T'P := {R'x_k + x'}$로 변환되고, 파지 자세 $T = (R, x)$는 $T'T = (R'R, R'x + x')$로 변환되며, 3차원 벡터 $a$는 $R'a$로 변환됩니다. 포인트 클라우드에 조건화된 $\text{SE}(3)$ 상의 분포 $p(T|P)$는 임의의 $T' \in \text{SE}(3)$에 대해 $p(T'T|T'P) = p(T|P)$인 경우 $\text{SE}(3)$ 불변입니다.

기존 연구들은 주로 유클리드 공간에 있거나, 비조건부이거나, 또는 둘 다인 분포에 초점을 맞추고 있어, $\text{SE}(3)$ 다양체 상의 조건부 분포를 요구하는 파지 자세 생성에는 적합하지 않습니다. 이를 해결하기 위해, $\text{SE}(3)$ 상에서 불변 조건부 분포를 모델링하도록 확장하여 필요한 조건을 충족시킵니다.

#### SE(3) Equivariant Time Dependent Conditional Velocity Field Networks

<img src="https://velog.velcdn.com/images/devjo/post/5cdcf40a-b0d7-4683-8a87-ef572a4d7072/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

$\text{SE}(3)$ 등변성을 $\mathbb{R}^3$ 및 $\text{SO}(3)$ 상의 등변성으로 분리합니다. $\mathbb{R}^3$ 등변성은 $P$에서 포인트 평균 $\mu = \frac{\sum_k x_k}{K}$을 빼고 $T$의 $x$에서도 $\mu$를 뺌으로써 달성됩니다. $\text{SO}(3)$ 등변성은 $\text{SO}(3)$ 등변이 되도록 설계된 벡터 뉴런 (Vector Neuron, VN) 아키텍처를 채택하여 달성됩니다.

그러나 VN 아키텍처는 3차원 벡터 목록을 입력으로 요구하기 때문에 직접 사용하는 것은 간단하지 않습니다. 시간 의존적 조건부 속도장의 입력 중 포인트 클라우드 $P$는 3차원 벡터 집합이고, 포즈 $T$는 $(\mathbf{R}_1, \mathbf{R}_2, \mathbf{R}_3, x)$와 같이 $\mathbf{R}_i$가 $R$의 $i$번째 열 벡터인 3차원 벡터 목록으로 표현될 수 있습니다. 하지만 시간 $t$는 스칼라 변수이므로 VN 아키텍처에 통합하는 것이 어렵습니다.

$C_1$개의 스칼라 변수의 목록을 열 벡터 $s \in \mathbb{R}^{C_1 \times 1}$로 표현하고, $C_2$개의 3차원 벡터 목록을 행렬 $V \in \mathbb{R}^{C_2 \times 3}$로 표현한다고 가정해 봅시다. 등변 리프팅 레이어를 $f_{\text{lift}}(s, V) = s f_{\text{equi}}(V)$로 구성하며, 여기서 $f_{\text{equi}}: \mathbb{R}^{C_2 \times 3} \to \mathbb{R}^{1 \times 3}$는 임의의 등변 매핑, 즉 $f_{\text{equi}}(V R^T) = f_{\text{equi}}(V) R^T$를 만족하는 매핑입니다. 이는 $f_{\text{equi}}$가 입력 벡터 $V$로부터 등변 벡터를 생성하고, 이 등변 벡터가 이어서 $s$의 각 $C_1$ 스칼라 변수에 의해 스케일링되어 $C_1$개의 벡터 목록을 생성함을 의미합니다. 이 구성이 $f_{\text{lift}}$의 $\text{SO}(3)$ 등변성으로 이어진다는 것을 보이는 것은 자명합니다.

---

### Conclusion

본 논문에서 $\text{SE}(3)$ 등변성 6-자유도 (6-DoF) 파지 자세 생성 모델인 EquiGraspFlow를 소개합니다. 접근 방식은 두 가지 핵심 아이디어를 중심으로 전개됩니다.

(i) 등변성 파지 자세 생성에 필수적인 $\text{SE}(3)$ 다양체 상에서 불변 조건부 분포를 학습하기 위한 프레임워크를 구축하는 것.

(ii) 새로운 등변 리프팅 레이어 (equivariant lifting layer)를 설계하는 것.

하지만 전체 포인트 클라우드로 훈련된 모델이라 하여도 로봇이 객체의 전체 관찰을 방해하는 가려짐에 직면할 때 정확한 파지 자세를 생성하는 데 어려움을 겪을 수 있습니다. 향후 연구에서는 이 모델을 객체를 여러 시점에서 관찰하기 어려운 제약된 환경에서 파지 자세를 생성하기 위한 실제 환경 실험에 적용할 수 있습니다.

---

### 참고 자료

[원본 경로 #1](https://openreview.net/pdf?id=5lSkn5v4LK)

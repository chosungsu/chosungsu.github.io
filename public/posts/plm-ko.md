---
title: 'On incorporating prior knowledge extracted from pre-trained language models into causal discovery'
date: '2024.03.04'
tags: ['llm', 'paper review']
---

### Abstract

사전 학습된 언어 모델(Pre-trained Language Models, PLMs)은 방대한 사전 학습 지식과 데이터셋의 텍스트 설명을 활용하여 인과 관계를 추론할 수 있으며, 데이터가 부족한 상황에서도 그 효과가 입증되었습니다. 그러나 현재 PLM 기반의 인과 관계 추론 방법에는 다음과 같은 중요한 한계가 있습니다. 
PLM은 컨텍스트 길이 제한으로 인해 프롬프트 내에서 대규모 데이터셋을 활용할 수 없습니다.
전체적으로 연결된 인과 구조를 이해하는 데 능숙하지 않습니다.

반면, 데이터 기반의 인과 발견 기법은 전체적인 인과 구조를 발견할 수 있지만, 충분한 양의 데이터가 있을 때만 효과적으로 작동합니다. 이러한 한계를 극복하기 위해, 본 논문에서는 PLM 기반 인과 추론을 데이터 기반 인과 발견 기법과 통합하는 새로운 프레임워크를 제안하며, 이를 통해 더욱 향상되고 견고한 성능을 달성하고자 하였습니다.

---

### Introduction

![Example Image](https://velog.velcdn.com/images/ski06043/post/da251500-eaae-4fea-9c51-1a836d5a099a/image.png)

실제 현실에서는 데이터가 부족한 경우가 많아 인과 발견 알고리즘이 정확한 인과 구조를 복원하는 데 한계가 있습니다. 이를 해결하는 한 가지 방법은 prior domain knowledge를 활용하는 것입니다. 예를 들어, 적절한 사전 그래프(prior graph)를 제공하면, 인과 발견 알고리즘이 인과 관계의 방향을 결정하는 과정에서 이를 참고할 수 있습니다.

최근 사전 학습된 언어 모델(PLM)의 발전은 다양한 추론 작업에서 큰 잠재력을 보여주었는데 PLM은 방대한 텍스트 코퍼스를 활용하여 사전 학습되었기 때문에, 특정 작업에 맞게 설계된 프롬프트를 이용해 다양한 문제를 해결할 수 있었습니다.

Kıcıman et al. (2023)은 PLM의 추론 능력을 활용한 인과 발견 연구를 시작하였고 연구진은 위 이미지와 같이 프롬프트 템플릿을 설계하여, 특정 엔티티가 다른 엔티티에 영향을 미치는지 질의하는 방식을 제안하였습니다. 여기서 엔티티는 테이블형 데이터셋의 열(column) 이름에 해당하며 데이터셋 내 모든 변수 쌍에 대한 인과 관계를 질의하여 인과 구조를 복원하는 방식으로, 기존 인과 발견 알고리즘보다 벤치마크 데이터셋에서 우수한 성능을 보였습니다. 이러한 연구는 PLM의 사전 학습된 지식을 활용하여 데이터 부족 문제를 해결할 가능성을 보여주었다고 할 수 있습니다.

하지만 PLM은 이를 적용하기에 본질적인 한계가 있습니다. 첫째, PLM은 대규모 테이블형 데이터를 효과적으로 활용하지 못하고, 둘째, PLM은 대부분 변수 간 개별적인(pairwise) 인과 관계만 예측하며, 전체적으로 연결된 인과 구조를 제대로 이해하지 못합니다.

---

### Preliminaries

#### 1. Causal Discovery Algorithms

인과 발견 알고리즘은 숫자로 구성된 데이터셋에서 잠재적인 인과 그래프(latent causal graph)를 찾아내며, 대규모 테이블형 데이터셋을 효과적으로 활용하는 데 능숙한 특징이 있습니다. $d$개의 변수와 $n$개의 관측값을 가진 데이터셋 $X ∈ R^(n×d)$가 주어졌을 때, 선형 가정(linear assumption) 하에서 인과 그래프는 구조적 계수 행렬 $W ∈ R^(d×d)$로 표현될 수 있으며, $W_{i,j}$는 변수 $j$가 변화할 때 변수 $i$가 선형적으로 얼마나 변화하는지를 나타냅니다.

먼저, DAG-GNN (Yu et al., 2019)은 연속 최적화를 통해 데이터셋의 인과 그래프 분포를 근사하는 구조적 계수 행렬을 학습한 알고리즘으로 인코더-디코더(encoder-decoder) 아키텍처를 갖춘 변분 오토인코더(variational autoencoder, Kingma and Welling, 2013)로 설계되었으며, 비순환성(acyclicity) 제약 조건과 증거 하한(evidence lower bound)을 적용하였습니다.

Zheng et al. (2018)은 NOTEARS를 제안하여 조합 최적화(combinatorial optimization)를 연속 최적화 문제로 변환하였는데 이 방법은 DAG(Directed Acyclic Graph) 제약 조건을 활용하며, 아래와 같은 목적 함수를 최소화하고 있습니다.

$$L(W) := \frac{1}{2n} \|X - XW\|_F^2 + \lambda \|W\|_1$$

여기서 첫 번째 항인 피팅 손실(fitting loss)은 프로베니우스 노름(Frobenius norm)으로, W가 데이터에 얼마나 적합한지를 나타냅니다. 두 번째 항인 희소성 손실(sparsity loss)은 그래프의 엣지(edge) 수를 줄이는 역할을 하며, 하이퍼파라미터 λ를 통해 조절됩니다. NOTEARS는 DAG-GNN과 달리 학습된 그래프가 비순환성을 유지하도록 최적화하고 있습니다.

#### 2. PLM-based Causal Reasoning

![Example Image](https://velog.velcdn.com/images/ski06043/post/2acf1f8c-50ef-49e2-92d8-fce864176ed3/image.png)

Kıcıman et al. (2023)은 위 이미지처럼 사전 학습된 언어 모델(PLM)을 이용하여 다중 선택 프롬프트(multiple-choice prompt) 템플릿을 개발하여 변수 간 개별(pairwise) 인과 관계를 추출하는 방식을 제안했습니다. 특정 변수 α와 β를 프롬프트의 빈칸에 삽입하여, PLM이 α가 β에 인과적으로 영향을 미치는지 여부를 추론하도록 유도한다. 이 과정을 모든 변수 쌍(pairwise combinations)에 대해 반복 수행하여 인과 그래프를 구축합니다.

---

### Idea

본 실험에 앞서 PLM의 인과 추론이 인과적으로 무관한 프롬프트 아티팩트에 의해 얼마나 영향을 받는지 ablation studies를 수행하였습니다.

#### 1. Issue: limited capability to comprehend holistic causal structure 

Ban et al. (2023)의 연구에서 도입된 2단계 인과 추론 과정을 적용하였습니다.
추론 단계(reasoning phase): PLM이 개별 변수 쌍(pairwise variables)에 대한 인과 관계를 예측한다.
수정 단계(revision phase): PLM이 수정 프롬프트(revision prompt)를 활용하여 전체 인과 관계를 수정하도록 한다.

수정 프롬프트의 예시는 다음과 같다.

"당신의 설명을 바탕으로, 다음 인과 관계가 올바른지 확인하고 그 이유를 제시하세요."{α}₁ → {β}₁, ..., {α}ᵢ → {α}ᵢ

그러나 프롬프트 엔지니어링(prompt engineering)을 통한 수정은 미미한 효과만을 보였습니다.

#### 2. Given actual ground truth

이전 결과에서 낮은 성능이 나타난 이유가 초기 추론 단계(reasoning phase)에서의 낮은 예측 품질 때문이라고 가정하였고 따라서, 수정 프롬프트에서 제공되는 정보의 질을 향상시키는 실험을 진행하였지만 실제 정답 관계를 제공했음에도 성능 향상은 거의 없었습니다.

#### 3. Conclusion

이는 PLM 기반의 구조 인식(Structure-aware) 인과 추론이 단순한 프롬프트 엔지니어링만으로는 쉽게 달성되지 않는다는 것을 시사합니다.

---

### Causal Discovery with PLM

![Example Image](https://velog.velcdn.com/images/ski06043/post/94900903-6d4f-4e68-853a-029ca30b1053/image.png)

본 논문에서 제안하는 프레임워크는 PLM을 통해 추출된 사전 지식 K(prior knowledge K)을 활용하며, 전체적인 구조는 위 이미지에 그려져 있습니다.

주어진 데이터셋을 입력으로 받아, 특정하게 설계된 프롬프트를 이용하여 PLM 기반의 인과 추론을 수행합니다. 그런 다음, 개별(pairwise) 인과 관계를 집계하여 사전 K(prior K)를 생성합니다. 이후, 인과 발견 알고리즘의 최적화 과정에서 사전 K를 배타적이지 않은 세 가지 방식으로 활용합니다.
초기값(starting point)으로 사용
정규화 항(regularization term)을 추가하여 학습된 구조가 주어진 사전과 일치하도록 유도
구조 계수(structural coefficients)의 경계(boundaries)를 사전 정보에 따라 설정

최종적으로 알고리즘이 구조 계수 행렬(structural coefficient matrix)을 반환하면, 임계값(threshold)을 적용하여 이를 방향성 그래프(directed graph)를 나타내는 이진 인접 행렬(binary adjacency matrix)로 변환합니다.


#### 1. Graph Initialization  

사전 지식 K를 엣지(edge) 업데이트의 초기값으로 사용하는 방식을 제안합니다. 일반적으로, 기존 연구(Zheng et al., 2018)에서는 구조 계수 행렬 W를 0으로 초기화된 인접 행렬(zero adjacency matrix)로 설정합니다. 그러나, 구조 계수 행렬을 단순히 0으로 초기화할 경우, 최적화 과정에서 국소 최적해(local optima)에 갇힐 위험이 있습니다.

$$W=\lambda_{init} K$$

이 때 $\lambda_{init}$는 scaling factor로, 적절한 K를 제공하면 W가 국소 최적해에 갇히지 않도록 유도할 수 있음을 기대합니다.

#### 2. Regularization

정규화 항을 추가하여 학습된 구조가 주어진 사전과 일치하도록 유도합니다.

#### 3. Setting Boundaries

$$L_{sim}(W) := \sum_{i,j} |(\sigma(W_{i,j}) - K_{i,j})|$$

이는 K와 변환된 중간 인접 행렬 W 간의 $l_1$-정규화로 해석할 수 있습니다. 특히, $K_{i,j}$가 이진(binary) 값일 때, 우리는 $W_{i,j}$의 값이 [0,1] 범위 내에서 조절되도록 클램핑 함수(clamping function) $\sigma$를 적용하였습니다. 이는 정규화 손실로 인해 $W_{i,j}$에 과도한 기울기(gradient)가 전파되는 것을 방지하기 위함입니다.

일반적으로, Sun et al. (2021)은 사전에 엣지(i, j)가 존재한다고 명시된 경우, 해당 $W_{i,j}$의 하한(lower bound, $B_{lower}$)을 특정 임계값 이상으로 설정하였습니다.

$$B_{lower} = B_{upper} = 0$$

반면, 엣지가 존재하지 않는다고 명시된 경우, 해당 $W_{i,j}$를 0으로 고정하는 방식을 사용하였습니다.

본 논문에서는 다음과 같은 방식을 사용하였습니다.
사전 지식의 불완전성을 고려한 lower bound 설정.    
$K_{i,j} = 1$ (사전 지식에서 해당 엣지가 존재하는 경우)    
$B_{lower}$를 0보다 크지만, 특정 임계값보다 작은 값으로 설정    
$K_{i,j} = 0$ (사전 지식에서 해당 엣지가 존재하지 않는 경우)    
$B_{lower}$를 0으로 설정

클램핑 방식 대신 직접 최적화 적용.    
L-BFGS를 개선한 L-BFGS-B 알고리즘 채택    
$W_{i,j}$의 값을 직접 $[B_{lower}, B_{upper}]$ 범위로 제한

---

### 참고 자료

[원본 경로: https://openreview.net/pdf?id=efmbt-1TOH](https://openreview.net/pdf?id=efmbt-1TOH)

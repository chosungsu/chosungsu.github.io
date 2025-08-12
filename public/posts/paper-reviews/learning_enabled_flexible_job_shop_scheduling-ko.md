---
title: 'Learning-enabled flexible job-shop scheduling for scalable smart
manufacturing'
date: '2025-05-10'
tags: ['robotics', 'paper review']
---

### Abstract

스마트 제조 시스템(SMS)에서 자동 유도 차량(AGV)을 기반으로 생산 유연성을 고려하여 생산성을 극대화하는 최적의 솔루션을 찾는 데 운송 제약이 있는 유연 작업장 스케줄링(FJSPT)이 필수적입니다. 최근 FJSPT를 위한 심층 강화 학습(DRL) 기반 방법들은 규모 일반화(scale generalization) 문제에 직면해왔습니다.

본 논문에서는 작업, 기계, 차량의 규모와 관계없이 준최적(near-optimal) 솔루션을 제공하는 새로운 DRL 기반 방법인 이종 그래프 스케줄러(Heterogeneous Graph Scheduler, HGS)를 제안합니다. HGS는 disjunctive graph를 수정하여 FJSPT를 작업, 기계, 차량의 이종 그래프로 모델링하고, 공정 및 운송을 동적으로 표현합니다.

HGS는 구조 인식 이종 그래프 인코더(structure-aware heterogeneous graph encoder)를 포함하여 규모 일반화를 향상시킵니다. 이 인코더는 멀티 헤드 어텐션(multi-head attention)을 사용하여 메시지를 로컬하게 집계하고 글로벌하게 통합합니다. 3단계 디코더(three-stage decoder)는 makespan(작업 완료 시간)을 최소화할 가능성이 가장 높은 노드를 선택하여 스케줄링 솔루션을 출력하는 종단 간(end-to-end) 의사결정을 수행합니다.

---

### Introduction

스마트 제조 분야가 계속 발전함에 따라, 생산 효율성과 유연성을 높이기 위해 사물 인터넷(IoT), 클라우드 컴퓨팅, 빅데이터, 인공지능과 같은 수많은 새로운 정보 기술이 제조 공정에 점차 통합되고 있습니다. 최근 실제 제조 분야의 많은 기업들은 자동 유도 차량(AGV)과 같은 운송 자원을 활용하여 유연 제조 시스템(FMS)의 유연성과 다양성을 향상시키고 있습니다. 이는 수학적으로 운송 제약이 있는 유연 작업장 스케줄링 문제(FJSPT)로 공식화될 수 있습니다.

그러나 생산 스케줄링의 복잡성 증가로 인해, 이 문제는 호환 가능한 기계에 작업을 할당하고 중간 제품을 운송하기 위한 AGV를 할당하는 것과 같은 상당한 어려움을 야기합니다. 심층 강화 학습(DRL) 기반의 FJSPT 스케줄러는 계산 시간을 줄이면서 준최적(near-optimal) 솔루션을 발견할 잠재력을 제공하는 유망한 접근법으로 부상했습니다.

이 연구의 주요 과제는 규모 일반화(scale generalization) 문제입니다. 실제 시나리오에서 스마트 제조 시스템은 새로운 작업의 삽입이나 기계 및 차량의 추가/고장과 같은 공정 환경의 변경(즉, 규모 변화)을 자주 겪습니다. 스케줄러는 훈련된 인스턴스와 유사한 크기의 보지 못한 인스턴스에서는 효과적으로 작동하지만, 보지 못한 대규모 인스턴스에서는 그 효능이 상당히 감소합니다. 이는 제조 환경이 변화함에 따라 스케줄러가 저품질의 솔루션을 생성하여 생산성 손실을 초래할 수 있음을 의미합니다.

DRL 기반 FJSPT 스케줄러의 또 다른 기술적 과제는 종단 간(end-to-end) 의사결정입니다. 제조 공정 스케줄링을 위한 수많은 DRL 기반 방법들은 의사결정 시점에 미리 정의된 디스패칭 규칙 중 하나를 선택하는 규칙 기반 의사결정 프레임워크를 채택합니다. 그러나 이 접근법은 규칙 설계에 있어 전문가의 경험에 크게 의존해야 하는 단점이 있으며, 행동 공간(action space) 탐색이 충분하지 않습니다.

---

### Related work

<img src="https://velog.velcdn.com/images/devjo/post/d885e1b4-a75e-4e27-bea9-333f6be2817d/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

최근 몇 년간, 유연 작업장 스케줄링 문제(FJSP)를 해결하기 위해 exact methods, metaheuristics, DRL 등 다양한 솔루션이 사용되었습니다. FJSP는 NP-난해 조합 최적화 문제로 널리 알려져 있습니다.

exact methods는 전통적이지만 소규모에서 최적의 솔루션을 찾을 수 있습니다. Heydari M.2018, Meng I.2020은 선형 계획법(LP)과 제약 프로그래밍(CP)을 사용하여 중소 규모 문제에 대한 매우 정확한 솔루션을 제시했습니다. Homayouni SM.2021은 2대의 AGV를 가정하여 혼합 정수 선형 계획법(mixed-integer linear programming)을 사용해 FJSPT 솔루션을 제안했습니다. 그러나 이러한 방법들은 최적의 솔루션을 찾을 수 있지만, 계산 비용이 기하급수적으로 증가하기 때문에 대규모 문제에는 확장성이 없습니다.

metaheuristics은 유연성과 준최적 솔루션을 찾는 효과성 때문에 FJSP 해결에 널리 사용되었습니다. Ren W.2022는 차량 고장 및 재충전과 같은 동적 이벤트를 고려하여 FJSPT를 해결하기 위한 GA-PSO 하이브리드 알고리즘을 개발했습니다. 이 방법들은 준최적 솔루션을 찾을 수 있지만, 넓은 탐색 공간에서는 계산적으로 비효율적이며, 다양한 규모에 대한 일반화에 어려움을 겪을 수 있습니다. 또한, 수정된 스케줄이 구현되기 전에 예기치 않은 중단이 발생할 수 있는 급변하는 환경에서는 한계가 있습니다.

FJSPT를 위한 종단 간 DRL 프레임워크를 제안했는데, DRL 에이전트가 각 의사결정 단계에서 특정 작업을 특정 기계로 운송할 차량을 결정합니다. 그러나 이 모델은 규모 일반화를 고려하지 않고 소규모 인스턴스에서만 시연되었습니다. 규모 일반화를 연구하는 여러 연구들은 GNN 기반 DRL 프레임워크를 구현했습니다. GNN은 다양한 크기의 그래프를 처리할 수 있어, 크기가 고정된 벡터로는 다른 크기의 문제를 해결할 수 없다는 한계를 극복합니다.

---

### Preliminary

FJSPT는 다음과 같이 정의될 수 있습니다.

-n개의 작업 집합 : $J=\{J_1, \cdots, J_n\}$

-m개의 기계 집합 : $M=\{M_1, \cdots, M_m\}$

-v개의 차량 집합 : $V=\{V_1, \cdots, V_v\}$

각 작업은 선행 제약이 있는 $n_i$개의 연속적인 작업 집합 $\mathcal{O}_i = \{O_{i_1}, \cdots, O_{in_i}\}$으로 구성됩니다. 이는 작업 $O_{ij}$가 각 기계 $M_k \in \mathcal{M}_{ij}$에 따라 다른 처리 시간 $T^p_{,ijk}$을 요구함을 의미합니다.

하역 시간 $T^t_{i,j,u}$는 $V_u$가 $O_{ij}$의 제품 위치에 접근하여 하역 상태에서 제품을 싣는 시간을 나타냅니다. 상역 시간 $T^t_{kk'}$는 차량이 제품을 기계로 상역 상태에서 운송하는 시간을 나타내며, 우리는 두 기계 사이의 상역 운송 시간이 모든 차량에 대해 동일하다고 가정합니다.

FJSPT의 목적식은 모든 작업을 완료하는 데 필요한 총 시간인 $C_{max}$를 최소화하는 것입니다.

#### Disjunctive graph for FJSP

<img src="https://velog.velcdn.com/images/devjo/post/efd4a990-70da-4790-9136-c98dfdb896e2/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

위 이미지는 FJSP를 위한 단절 그래프(disjunctive graph)입니다. 이 그래프는 $\mathcal{G} = (\mathcal{O}, \mathcal{C}, \mathcal{D})$로 표기됩니다.

$\mathcal{O} = \{O_{ij}|\forall i, j\} \cup \{Start, End\}$는 모든 작업과 생산의 시작 및 끝을 나타내는 두 개의 더미 노드(dummy nodes, 처리 시간 0)를 포함하는 작업 노드 집합입니다. $\mathcal{C}$는 연속 아크(conjunctive arcs) 집합입니다. 각 흐름은 작업 $J_i$의 처리 순서를 나타냅니다. $D=\cup_k D_k$는 무방향 단절 아크(disjunctive arcs) 집합을 구성합니다. 여기서 $D_k$는 기계 $M_k$에서 실행될 수 있는 작업을 연결하는 클리크를 형성합니다.

FJSP의 작업은 여러 기계에서 수행될 수 있으므로, 하나의 작업 노드는 여러 단절 아크에 연결될 수 있습니다.

#### Attention model

어텐션 모델(Attention Model, AM)은 그래프 내 노드 간의 가중 메시지 전달 기술이며, 노드들이 서로 얼마나 관련되어 있는지에 기반하여 어텐션 점수를 학습합니다.

$h_x \in \mathbb{R}^{d_h}$는 노드 $x$의 임베딩 벡터를 나타내며 $d_h$는 임베딩 차원입니다. 모델은 집계된 노드 임베딩을 형성하기 위해 쿼리(query), 키(key), 값(value)이라는 세 벡터를 필요로 합니다.

$$
q_x = W_qh_x, \\
k_y=W_kh_y, \\
v_y=W_vh_y, \\
x, y \in X
$$

여기서 $W_q, W_k \in \mathbb{R}^{d_k \times d_h}$이고 $W_v \in \mathbb{R}^{d_v \times d_h}$는 학습 가능한 매개변수 행렬입니다. $y=x$인 경우 자기 어텐션(self attention)이라고 합니다. 노드 $x$의 쿼리와 노드 $y$의 키를 사용하여 scaled dot product를 통하여 호환성 $\sigma_{xy}$가 결정됩니다.

$$
\sigma_{xy}=\begin{cases} \frac{q_x^Tk_y}{\sqrt{d_k}} \\ -\infty \end{cases}
$$

여기서 $\infty$는 인접하지 않은 노드 간의 메시지 전달을 방지합니다.

$$
\bar{\sigma_{xy}}=\frac{e^{\sigma_{xy}}}{\sum_{y' \in X} e^{\sigma_{xy'}}}
$$

이는 $x, y$ 사이의 중요도로 값이 클수록 노드 $x$가 노드 $y$에 더 많이 의존함을 의미합니다. 이어서 노드 $x$에 대한 어텐션 기반 단일 헤드 노드 임베딩 $h'_{x,z}$는 메시지 $v_y$의 가중 합으로 계산됩니다.

$$
h'_{x,z}=\sum_{y \in X} \bar{\sigma_{xy} v_y}
$$

여기서 $z \in \{1, \cdots, Z\}$는 헤드 인덱스입니다. 멀티-헤드 어텐션(MHA)은 노드가 다양한 어텐션 유형으로부터 이웃 메시지를 얻을 수 있게 하며, 이는 $Z$번 병렬로 실행됩니다. 따라서 $d_k=d_v=\frac{d_h}{Z}$입니다.

---

### 이종 그래프 스케줄러 (Heterogeneous Graph Scheduler, HGS)

<img src="https://velog.velcdn.com/images/devjo/post/6ead7c58-95a1-4911-812b-317553642dcf/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

FJSPT를 해결하기 위해, 우리는 세 가지 주요 구성 요소로 이루어진 HGS 모듈을 제안합니다: 이종 그래프, 구조 인식 이종 인코더, 3단계 디코더로 전개됩니다.

먼저 이종 그래프는 낮은 그래프 밀도를 유지하면서 작업, 기계, 차량의 특징과 그들의 상호 관계를 효과적으로 캡슐화합니다. 다음으로, 우리는 세 개의 서브-인코더와 하나의 전역 인코더를 포함하는 제안된 인코더를 사용하여 이 이종 그래프를 표현합니다. 각 서브-인코더는 특정 노드가 다른 클래스에 속하는 인접 노드로부터 메시지를 로컬하게 집계할 수 있게 합니다. 이어서, 전역 인코더는 모든 노드로부터 인코딩된 메시지를 통합합니다. 이 그래프 표현을 기반으로, 디코더는 의사결정 시점에서 작업-기계-차량(O-M-V) 쌍의 복합 행동을 생성합니다.

전통적인 단절 그래프는 FJSPT를 표현하기 어렵습니다. 그 이유는 아래와 같았습니다.

1.차량 속성이 포함되지 않습니다. 차량의 수, 위치, 운송 시간, 상태(상역 또는 하역)와 같은 속성이 없습니다.

2.그래프 밀도가 높아집니다. 그래프 크기(노드 수)가 증가함에 따라 단절 아크 집합 $\mathcal{D}$가 훨씬 커집니다. 높은 밀도의 그래프는 그래프 신경망 성능을 제한합니다.

3.호환 가능한 기계에 대한 처리 시간을 표현하기 어렵습니다.

따라서 이 논문에서 새로운 이종 그래프 $H$를 제안합니다. 그래프는 $\mathcal{H} = (\mathcal{O} \cup \mathcal{M} \cup \mathcal{V}, \mathcal{C}, \mathcal{\xi}_m \cup \mathcal{\xi}_{v}^{off} \cup \mathcal{\xi}_{v}^{on})$로 정의됩니다. 기계 노드 $M_k \in \mathcal{M}$와 차량 노드 $V_u \in \mathcal{V}$는 각각 기계 및 차량의 특징을 나타냅니다. 하역 차량 아크 $\mathcal{\xi}_{v}^{off}$의 아크 $E_{iju}^v$는 $V_u$가 $O_{ij}$와 관련된 제품 위치에 도착하는 하역 운송 시간을 나타냅니다. 상역 차량 아크 $\mathcal{\xi}_{v}^{on}$의 아크 $E_{kk'}^v$는 상역 상태의 차량이 $M_k$에서 $M_{k'}$로 이동하는 상역 운송 시간을 나타냅니다. $\mathcal{\xi}_{mt}$와 $\mathcal{\xi}_{vt}^{off}$는 FJSPT를 해결하는 동안 동적으로 변합니다.

$t$ 시점에서 $O_{ij}$의 이웃 노드를 $\mathcal{N}_t(O{ij}) = {\mathcal{N}_{mt}(O{ij}) \cup \mathcal{N}_{vt}(O{ij})}$라고 합시다. 여기서 $\mathcal{N}_{mt}(O{ij})$는 이웃 기계이고 $\mathcal{N}_{vt}(O{ij})$는 이웃 차량입니다. $\mathcal{N}_{mt}(O{ij})$는 $t$ 시점에서 $O_{ij}$의 사용 가능한 기계를 나타냅니다. $\mathcal{M}_{ij}$에 속하는 일부 기계는 다른 작업에 의한 선점 때문에 사용 불가능할 수 있으므로, $\mathcal{N}_{mt}(O_{ij}) \subseteq \mathcal{M}_{ij}$ 입니다. $\mathcal{N}_{vt}(O{ij})$는 운송 중인 차량을 제외한 현재 사용 가능한 차량을 나타냅니다.

#### 마르코프 결정 과정 (Markov decision process, MDP)

매 시간 단계 $t$마다 에이전트는 상태 $s_t$를 인식하고 행동 $a_t$를 선택합니다.

행동은 할당되지 않은 작업을 사용 가능한 차량으로 운송하여 비어있는 기계에서 처리될 수 있도록 합니다. 이종 그래프 $\mathcal{H}t(\mathcal{O} \cup \mathcal{M} \cup \mathcal{V}, \mathcal{C}, \mathcal{\xi}_{mt} \cup \mathcal{\xi}_{vt}^{off} \cup \mathcal{\xi}_{v}^{on})$입니다. 이 그래프에서, 우리는 노드와 엣지의 원시 특징(raw features)을 정의합니다.

작업 노드 $O_{ij}$의 원시 특징 벡터 $\mu_{ij} \in R^7$ 요소로 구성됩니다. 기계 $M_k$의 원시 특징 벡터 $\mu_k \in R^4$ 요소로 구성됩니다. 차량 $V_u$의 원시 특징 벡터 $\mu_v \in R^4$로 구성됩니다.

보상은 $r(s_t, a_t, s_{t+1}) = C_{max}(s_t) - C_{max}(s_{t+1})$와 같이 makespan의 차이로 구성합니다. 작업 $O4의 추정 완료 시간의 하한(lower bound)을 $C_{LB}(O, s_t)$로 정의합니다. 이 하한을 재귀적으로 계산합니다. $C_{LB}(O_{ij}, s_t)=C_{LB}(O_{i(j-1)}, s_t)+\bar{T}^p_{ij}$ 와 같이 계산되며 할인율 $\gamma=1$일 때 누적보상 $G=\sum_{t=0}^{|O|} r(s_t, a_t, s_{t+1}) = C_{max}(s_0) - C_{max}$입니다. 따라서, $G$를 최대화하는 것은 makespan을 최소화하는 것과 동일합니다.

#### 구조 인식 이종 인코더 (Structure-aware heterogeneous encoder)

제안된 인코더의 핵심 개념은 노드 클래스를 고려하여 이웃 메시지를 개별적으로 집계하는 세 가지 서브-인코더(작업, 기계, 차량)를 구축하는 것입니다.

직관적으로, 기계 노드의 관점에서는 차량 운송 시간을 무시하고 처리 시간이 낮은 작업 노드를 선택하는 것이 우선입니다. 반대로, 차량 노드의 관점에서는 기계 처리 시간을 무시하고 운송 시간이 낮은 작업 노드를 선택하는 것이 우선입니다. 작업 노드의 관점에서는 운송 시간과 처리 시간이 모두 낮은 노드에 할당되어야 합니다. 그래프 노드의 로컬 인코딩에 이어, 전역 인코더가 모든 노드로부터의 메시지를 통합합니다.

작업, 기계, 차량 노드에 대한 서브-인코더 $F_O, F_M, F_V$를 개발합니다. 서브-인코더는 다른 노드 클래스 하에서 노드 임베딩을 캡처하고 노드와 엣지 임베딩을 모두 출력합니다. $l in \{1, \cdots, L-1\}$ 계층을 거치는 임베딩 객체를 $h_{ij}^l, h_k^l, h_u^l$이라고 합니다. 로컬 관계 지식을 추출하는 과정은 다음과 같습니다. $\mathcal{F}_X^l$은 이전 계층의 임베딩과 이웃 노드 임베딩과 그들의 관계 $h_{xy}^{(l-1)} \in \mathbb{R}^{d_e}$을 집계하여 업데이트합니다.

#### 3단계 디코더 (Three-stage decoder)

$L$개의 서브 인코더를 통해 $\{h_{ij}^L, h_{k}^L, h_{u}^L, h_{ijk}^L, h_{iju}^L, h_{kk'}^L\}$과 같이 노드와 엣지 임베딩을 얻습니다. 이 임베딩을 사용하여 디코더는 행동쌍인 $(O_{ij}, M_k, V_u)$를 결정하게 됩니다.

우선 그래프 임베딩 $\bar{h}_t^L$과 이전단계의 glimpse node embedding $h_{g,(t-1)}$을 포함하는 컨텍스트 노드 $h_{c,t}^L$을 구축합니다. 따라서 다음 시간의 컨텍스트 노드를 $h_c^{L+1}=\text{MHA}_c^{L+1} (\{h_{ij}^L\})$와 같이 표현 가능합니다. 작업 선택 확률을 $Pr(O_{ij}|s_t)=\frac{e^{\sigma_{cij}^{L+1}}}{\sum_{i'=1}^n \sum_{j'=1}^{n_{i'}} e^{\sigma_{ci'j'}^{L+1}}}$로 계산합니다.

다음으로 기계 선택 확률 분포를 계산할 때 $h_{c}^{L+2}=\text{MHA}_c^{L+2} (\{h_k^L + h_{ijk}^L\})$과 같이 엣지 임베딩을 추가하도록 합니다. 기계 선택 확률을 $Pr(M_k|s_t, O_{ij})=\frac{e^{\sigma_{ck}^{L+2}}}{\sum_{k'=1}^m e^{\sigma_{ck'}^{L+2}}}$로 계산합니다.

마지막으로 차량 선택 확률분포를 계산할 때 $h_{c}^{L+3}=\text{MHA}_c^{L+3} (\{h_u^L + h_{iju}^L\})$과 같이 엣지 임베딩을 추가하도록 합니다. 차량 선택 확률을 $Pr(V_u|s_t, O_{ij})=\frac{e^{\sigma_{cu}^{L+3}}}{\sum_{u'=1}^v e^{\sigma_{cu'}^{L+3}}}$로 계산합니다.

이 임베딩들을 디코딩하여 복합 행동 $a_t$를 생성하게 됩니다.

---

### Conclusion

AGV 기반 스마트 제조 시스템(SMS)에서 규모 일반화(scale generalization)는 DRL 기반 솔루션을 도입할 때 해결해야 할 중요한 과제입니다. DRL 기반 솔루션은 뛰어난 성능에도 불구하고, 본질적으로 길고 비용이 많이 드는 학습 곡선으로 인해 한계가 있을 수 있습니다. 따라서 규모 불가지론적(scale-agnostic) DRL 기반 솔루션의 개발이 필요합니다.

본 논문에서 작업, 기계, 차량의 규모에 관계없이 준최적 솔루션을 제공하는 최초의 DRL 기반 접근법인 HGS(Heterogeneous Graph Scheduler)를 제안하여, 규모 일반화가 가능한 FJSPT(운송 제약이 있는 유연 작업장 스케줄링)의 과제를 해결했습니다. 규모가 증가할수록 HGS 모델의 성능 우위가 더욱 뚜렷해져, 모든 인스턴스에서 최고의 솔루션(0% 갭)을 달성했습니다. HGS는 다양한 규모와 조건에서 최적의 성능과 적응성을 보장하며, 현대 제조 과제를 위한 신뢰할 수 있고 효율적인 솔루션임을 입증했습니다.

---

### 참고 자료

[원본 경로 #1](https://csi.dgist.ac.kr/)

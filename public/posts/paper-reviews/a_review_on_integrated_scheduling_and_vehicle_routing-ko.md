---
title: 'A review on integrated scheduling and outbound vehicle routing
problems'
date: '2023-05-03'
tags: ['robotics', 'paper review']
---

### Abstract

생산 스케줄링(Production scheduling)과 차량 경로 설정(vehicle routing)은 문헌에서 모두 잘 연구된 문제입니다. 이러한 상호 연관된 문제들을 순차적으로 해결하지 않고 통합된 접근 방식으로 접근하면 전반적인 성능이 향상됩니다. 통합된 접근 방식은 비용 절감과 정시 배송 달성에 도움이 되기 때문에 현재의 경쟁적인 비즈니스 환경에서 필수적이 되었습니다.

본 논문은 차량 경로 설정 결정이 명시적으로 고려되는 통합 스케줄링 및 아웃바운드 차량 경로 설정 문제에 대한 검토를 제공하는 것을 목표로 하며, 2010년 이후의 65개 연구를 포함합니다. 문헌에서 사용된 다양한 문제 특성, 제약 조건 및 해법(solution methods)을 요약하고 일반적인 모델을 제시할 것입니다. 향후 연구 방향에 대한 몇 가지 제언도 제공됩니다.

---

### Introduction

생산 스케줄링과 차량 경로 설정은 운영 연구(operations research) 문헌에서 광범위하게 연구된 문제입니다. 두 문제는 공급망 내에서 밀접하게 상호 연관되어 있지만, 실제로는 종종 순차적으로 해결됩니다. 대부분의 경우, 생산 스케줄링 문제가 먼저 해결됩니다. 이때는 생산 기준만 사용되며 배송 측면은 고려되지 않습니다. 생산 해법의 완료 시간은 그 후에 해결되는 아웃바운드 차량 경로 설정 문제의 출고 날짜(release dates)가 됩니다. 또 다른 옵션은 차량 경로 설정 문제를 먼저 해결하고, 그 후에 해결되는 스케줄링 문제에서 차량의 출발 날짜를 주문에 대한 엄격한 마감 시간(strict deadlines)으로 부과하는 것입니다.

이러한 조정 부족은 중간 재고, 운영 비용, 자원 활용 또는 고객 서비스 수준 및 만족도와 관련하여 차선책의 해법(sub-optimal solutions)으로 이어질 수 있습니다.

생산 스케줄링과 차량 경로 설정 문제를 통합하는 것의 이점은 다면적이며, 평균 5%에서 20% 사이의 개선이 있습니다 (예: Ullrich, 2013 및 Meinecke & Scholz-Reiter, 2014b 참조). 기업들은 생산 스케줄과 아웃바운드 유통을 공동으로 최적화하도록 점점 더 압력을 받고 있습니다.

첫째, 기업들은 이전보다 핵심 역량(core competencies)에 더 집중합니다. 결과적으로, 더 많은 기업이 참여하게 되면서 공급망의 길이가 길어집니다.

둘째, 적시 생산 (just-in-time) 관리와 같은 추세는 생산과 유통 간의 완벽한 조정을 부과합니다. 이상적으로는 생산이 끝나자마자 유통이 즉시 시작되어야 합니다.

Chen (2010)은 통합 생산 및 아웃바운드 유통 스케줄링 ($\text{IPODS}$, Integrated Production and Outbound Distribution Scheduling)에 대한 최초의 검토 연구로, 이러한 $\text{IPODS}$의 특성화를 위한 표현 체계를 제안했습니다. 이는 Graham, Lawler, Lenstra, & Kan (1979)에 의해 개발된 잘 알려진 스케줄링 문제의 삼분야 표기법 (three-field notation)을 확장한 것으로, 배송 특성과 고객 수를 설명하는 두 분야가 추가되었습니다.

---

### Related Work

운영 수준의 스케줄링 및 배송 문제를 통합하기 위해서는 고전적인 VRP (Vehicle Routing Problem, 차량 경로 설정 문제)를 생산 스케줄링 문제와 통합해야 합니다. 두 문제의 조합은 비교적 최근의, 덜 탐구된 연구 방향인 반면, 두 문제 각각은 문헌에서 잘 연구되어 왔습니다.

Google Scholar와 Scopus에서 다음 키워드 $(\text{production}$ $\text{OR}$ $\text{scheduling})$ $\text{AND}$ $(\text{distribution}$ $\text{OR}$ $\text{routing}$ $\text{OR}$ $\text{transportation})$ $\text{AND}$ $(\text{problem})$을 사용했으며, "역방향/순방향 참고 문헌 검색 (backward/forward reference search)"을 수행했습니다.전반적으로, 표본은 조사 연구를 제외하고 65개의 연구로 구성되며, 33개의 다른 저널에 출판되었습니다. 가장 빈번한 저널은 International Journal of Production Research (13개), Computers & Industrial Engineering (7개), the European Journal of Operational Research (5개), Applied Soft Computing (4개), 그리고 International Journal of Production Economics (3개)입니다. 검색 절차 적용이 모든 관련 논문을 식별하는 것을 보장하지 않으며 일부 연구를 간과했을 수도 있음을 인정합니다. 그러나 2010년에서 2022년 6월까지의 기간 동안 통합 스케줄링 및 아웃바운드 차량 경로 설정 문제의 확고한 그림을 그리는 데 충분히 포괄적인 문헌 집합을 확보했다고 확신합니다.

#### 생산 환경 유형

생산 환경은 크게 두 가지 범주로 나눌 수 있습니다.

단일 작업(one-operation)은 주문이 하나의 작업만 필요로 하는 모든 문제를 포함하고 1M1S(single machine at a single production site), 1MMS(single machine at multiple separate production site), P(parallel machine) 등으로 구분됩니다.

다중 작업(multiple-operation)은 FS(flow shop), HFS(hybrid flow shop), JS(job shop), OS(open shop) 등으로 구분됩니다.

#### 배송 방법 유형

배송 방법의 유형은 하나 또는 여러 차량의 가용성 여부와 차량이 계획 기간 동안 여러 번 왕복할 수 있는지 여부를 기준으로 네 가지 범주로 나뉩니다.

다중 작업 생산보다 단일 작업 생산을 다루는 연구가 훨씬 더 많으며, 후자 범주가 더 어렵다는 것이 알려져 있기 때문에 놀라운 일은 아닙니다.

---

### Method

<img src="https://velog.velcdn.com/images/devjo/post/3f719037-016d-4194-aa93-bf8ac92073a7/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

$\text{IPODS}$ 문제 문헌의 대부분의 논문은 $\text{MILP}$ (Mixed-Integer Linear Programming, 혼합 정수 선형 계획법) 정식화를 제안합니다. $\text{MILP}$ 모델의 특정 측면은 이미 개별적으로도 어려운 두 문제(스케줄링 및 경로 설정)의 연관성에 있습니다.

$\text{MILP}$ 모델의 변수는 다음과 같은 하위 집합으로 그룹화할 수 있습니다.

#### 단일 기계 스케줄링 문제

하나의 고객, 작업당 하나의 현장, 그리고 다중 왕복을 가진 하나의 차량을 가진 단일 기계 스케줄링 문제에 대한 하나의 구현은 다음과 같이 정식화될 수 있습니다. (여기서 $\nu$는 왕복의 최대 수, $M$은 충분히 큰 수입니다. $D_j$는 작업 $j$의 배송 완료 시간입니다. $s_t$는 왕복 $t$의 시작 시간, $e_t$는 왕복 $t$의 종료 시간이며, $\text{cap}$는 차량 용량입니다.)

$\mathbf{A}$ – 스케줄링 문제의 변수 및 제약 조건

$\Rightarrow$ $ $x_{j,k}$: 작업 $j$가 위치 $k$에 스케줄링되면 1, 아니면 0인 이진 변수.

$\Rightarrow$ $CP_k$: 위치 $k$의 작업 완료 시간.

$\Rightarrow$ $C_j$: 작업 $j$의 완료 시간.

$$
\begin{aligned}
&\sum_{k=1}^n x_{j,k} = 1, \quad \forall j \in \{1, \ldots, n\} \\
&\sum_{j=1}^n x_{j,k} = 1, \quad \forall k \in \{1, \ldots, n\} \\
&CP_k = \sum_{h=1}^k \sum_{j=1}^n p_j x_{j,h}, \quad \forall k \in \{1, \ldots, n\} \\
&C_j \ge CP_k - M(1 - x_{j,k})
\end{aligned}
$$

$\mathbf{B}$ – 배치 정의의 변수 및 제약 조건

$\Rightarrow$ $z_{j,t}$: 작업 $j$가 왕복 $t$에 속하면 1, 아니면 0인 이진 변수.

$\Rightarrow$ $w_j$: 주문 $j$의 크기 (또는 가중치).

$$
\begin{aligned}
&\sum_{t=1}^{\nu} z_{j,t} = 1, \quad \forall j \in \{1, \ldots, n\} \\
&\sum_{j=1}^n w_j z_{j,t} \le cap, \quad \forall t \in \{1, \ldots, \nu\}
\end{aligned}
$$

$\mathbf{C}$ – 차량 경로 설정의 변수 및 제약 조건

$\Rightarrow$ $y_{i,j,t}$: 위치 $i$가 왕복 $t$에서 위치 $j$보다 먼저 방문되면 1, 아니면 0인 이진 변수. ($i, j \in {0, 1, \ldots, n}$이며, 0은 생산 현장의 위치입니다.)

$\Rightarrow$ $tt_{i,j}$: 위치 $i$에서 $j$까지의 운송 시간.

$$
\begin{aligned}
&\sum_{i=0}^n y_{i,j,t} - \sum_{k=0}^n y_{j,k,t} = 0, \quad \forall t \in \{1, \ldots, \nu\}, \forall j \in \{1, \ldots, n\} \\
&D_j \ge D_i + tt_{i,j} - M(1 - y_{i,j,t}), \quad \forall t \in \{1, \ldots, \nu\}, \forall i, j \in \{1, \ldots, n\}, i \ne j \\
&s_{t_2} \ge e_{t_1}, \quad \forall t_1 \in \{1, \ldots, \nu - 1\}, \forall t_2 \in \{t_1 + 1, \ldots, \nu\}, t_2 > t_1
\end{aligned}
$$

$\mathbf{D}$ – 스케줄링, 배치 및 차량 경로 설정 문제를 연결하는 제약 조건

$$
s_t \ge C_j - M(1 - z_{j,t}) \\
D_j \ge s_t + tt_{0,j} - M(1 - z_{j,t}) \\
e_t \ge D_j + tt_{j,0} - M(1 - z_{j,t}) \\
\sum_{i=0}^n y_{i,j,t} = z_{j,t}
$$

차량이 작업이 완료되기 전에는 출발할 수 없음을 보장합니다. 배치의 시작 시간과 작업의 배송 날짜를 연결합니다.

#### 목적식

목적 함수는 작업 배송 완료 시간의 고전적인 표현 (예: $D_{max} = \max_{j \in \{1, \ldots, n\}} D_j$ 또는 $\sum D_j$)을 최소화하거나, 배송 지연 (tardiness)과 관련됩니다 (예: $T_{max} = \max_{j \in \{1, \ldots, n\}} T_j$ (여기서 $T_j = \max(0, D_j - d_j$)) 또는 $\sum T_j$).

#### Production with One-Operation Jobs

단일 기계 - 단일 차량 - 단일 왕복 주제에서 Viergutz & Knust (2014)는 Armstrong, Gao, & Lei (2008)의 연구를 소개합니다. 이 논문은 단일 기계와 무제한 용량의 단일 차량이 모든 주문을 한 번의 큰 왕복으로 배송하는 상황을 고려합니다. 생산 및 배송은 동일한 주어진 순서를 따릅니다. 목적은 실현된 고객 주문의 가중치 합을 최대화하는 것입니다. 여기서 고객 주문은 배송이 미리 정의된 시간 창 내에 이루어지고 최대 유효 기간(shelf life)이 준수될 때 '실현된' 것으로 간주됩니다.

단일 기계 - 단일 차량 - 다중 왕복 주제에서 Cheref, Artigues, Billaut, & Ngueveu (2016)는 차량이 마지막 왕복 후에 복귀하는 시간 최소화와 배송 날짜의 합 최소화를 목적으로 하였습니다.

단일 기계 - 여러 차량 - 단일 왕복 주제에서 Low, Li, & Chang (2013)은 마지막 차량이 차고지에 복귀하는 시간을 최소화하는 것을 목적으로 하여 $\text{MILP}$와 지역 탐색을 포함하는 적응형 유전 알고리즘을 제안합니다. 해법 표현은 고객 순서이며, 실행 가능한 왕복 세트가 계산되고, $\text{F2}||C_{max}$ 문제에 대한 Johnson의 알고리즘을 기반으로 한 휴리스틱이 사용되어 생산 스케줄을 결정한 후, 각 왕복은 2-opt 지역 탐색으로 개선합니다.

단일 기계 - 여러 차량 - 다중 왕복 주제에서 Devapriya, Ferrell, & Geismar (2017)는 총 이동 비용과 차량에 대한 유휴 비용을 최소화하는 목적 하에서 $\text{MILP}$와 휴리스틱을 제시하는데, 여기서 Prins (2004)의 Split 알고리즘은 작은 총 유휴 시간을 가진 스케줄을 구성하는 것을 목표로 거대한 경로(giant tour)로부터 왕복을 만듭니다. 그들은 또한 하한(lower bound), 고전적인 유전 알고리즘 (genetic algorithm), 그리고 메메틱 알고리즘 (memetic algorithm)의 두 가지 변형을 제안합니다.

#### Production with Multiple-Operation Jobs

단일 차량 - 다중 왕복 주제에서 Yagmur & Kesen (2020)은 순열 흐름형 공정 스케줄링 문제 (permutation flow shop scheduling problem)를 고려합니다. 동일한 왕복으로 배송될 모든 작업은 다른 왕복의 작업으로 전환하기 전에 연속적으로 생산됩니다. 목적은 총 지연(total tardiness)과 이동 시간의 합을 최소화하는 것입니다. 저자들은 $\text{MILP}$와 스케줄링 순열을 사용하여 해법을 표현하는 메메틱 알고리즘 (memetic algorithm)을 제안합니다. Abreu, Tavares-Neto, & Nagano (2021)는 개방형 공정 (open shop)과 제한된 용량의 단일 차량을 고려합니다. 목적은 차량이 마지막 왕복 후에 복귀하는 날짜를 최소화하는 것입니다. 저자들은 $\text{MILP}$, 탐욕스러운 삽입 알고리즘 (greedy insertion algorithm), 반복 탐욕 알고리즘 (iterated greedy algorithm), 편향된 무작위 키 유전 알고리즘 (biased random key genetic algorithm), 그리고 탐욕스러운 삽입과 편향된 무작위 키 유전 알고리즘의 하이브리드화를 제안합니다.

여러 차량 - 단일 왕복 주제에서 Mohammadi et al. (2018)은 순열 흐름형 공정과 서로 다른 용량을 가진 여러 차량을 연구합니다. 목적은 가장 늦은 차량이 차고지로 복귀하는 날짜를 최소화하는 것입니다. 저자들은 $\text{MIP}$와 개선된 $\text{ICA}$를 제안합니다. 해법은 두 개의 배열로 표현됩니다. 첫 번째 부분은 흐름형 공정의 생산 순서를 나타내는 작업 순열이고, 두 번째 부분은 배송 배치를 제한하고 각 배치의 배송 순서를 나타냅니다.

여러 차량 - 다중 왕복 주제에서 Wang et al. (2020)은 전자 상거래에서의 주문 생산 환경 (식당의 포장 및 출장 연회 서비스와 매우 유사함)을 연구합니다. 하이브리드 흐름형 공정은 매우 다른 사양을 가진 세 단계를 가집니다. 첫 번째 단계는 순서에 따라 설정 시간을 가지며, 창고에서 고객 주문 품목을 수집하는 피킹 문제를 나타냅니다. 두 번째 단계는 주문의 포장 문제를 나타내고, 세 번째 단계는 각 터미널이 지리적 중심을 나타내는 다중 터미널의 컨베이어를 나타냅니다. 고유한 차량이 모든 배송을 처리합니다. 이러한 이유로, 고객 주문의 세 번째 단계 기계 중 하나에 대한 할당은 사전에 고정됩니다. 목적은 가장 늦은 배송 날짜를 최소화하는 것입니다. 저자들은 $\text{MILP}$와 세 가지 휴리스틱을 제안합니다. 첫 번째 휴리스틱은 $\text{shaking}$ 후에 지역 탐색이 추가되는 고전적인 $\text{VNS}$입니다. 두 번째는 "VNS와 결합된 4계층 구성 휴리스틱 방법 (four-layered constructive heuristic method combined with VNS)"이라고 불리는 구성적 휴리스틱이며, 마지막은 처음 두 가지의 하이브리드화입니다.

---

### Conclusion

고객 주문과 제품 배송 사이의 보관 가능성과 대기 시간이 모두 줄어드는 상황에서, 생산 스케줄링과 유통 문제의 통합은 성과 측정에 상당한 개선을 가져올 수 있습니다. 기업에서는 생산 환경과 배송 수단 ($\text{3PL}$ 제공업체에 의한 배송, 회사 차량에 의한 배송 등)이 다양하며, 스케줄링과 배송을 통합하는 실제 문제는 매우 다양합니다. 이것이 바로 스케줄링과 출고 차량 경로 설정 문제 ($\text{outbound vehicle routing problems}$)에 대한 통합 해법 접근 방식이 학술 문헌에서 점점 더 많이 연구되는 이유입니다.

이 최신 기술 검토는 생산 스케줄링 부분이 차량 경로 설정 부분보다 선행하며, 두 문제가 상호 연결된 논문들을 다룹니다. 일부 표기법이 소개되었고 일반적인 $\text{MILP}$ 모델이 제시되었습니다.

이 검토는 단일 작업을 고려하는 논문들을 제시했으며, 단일 또는 병렬 기계 생산 환경, 단일 또는 다중 생산 현장, 하나 또는 여러 대의 차량, 그리고 각 차량이 하나 또는 여러 번의 왕복을 할 수 있는 경우를 다룹니다. 그 후, 다중 작업 문제가 연구되었으며, 다시 한 번 하나 또는 여러 대의 차량과 각 차량이 하나 또는 여러 번의 왕복을 할 수 있는 경우를 다룹니다.

문헌의 대부분의 논문은 $\text{MILP}$ 정식화를 제안하고, 상업적 솔버를 사용하여 작은 인스턴스를 해결하며, 이 문제들의 복잡성이 정확한 방법이 잘 작동하지 않을 정도이므로 더 큰 인스턴스를 해결하기 위해 하나 또는 여러 개의 휴리스틱을 제시합니다.

향후에는 통합 스케줄링 및 출고 차량 경로 설정 문제에 대한 정확한 접근 방식에 대한 연구 노력이 이루어져야 합니다. 이전의 많은 연구가 다양한 스케줄링 문제와 유통 문제에 대한 정확한 접근 방식을 제안했지만, 통합 문제에 대한 정확한 방법에 대한 연구는 특히 하나 이상의 기계와 하나 이상의 차량이 있을 때 드뭅니다.

---

### 참고 자료

[원본 경로 #1](https://www.sciencedirect.com/science/article/pii/S0377221722010050)

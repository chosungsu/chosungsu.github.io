---
title: 'Multi-Agent Target Assignment and Path Finding for Intelligent Warehouse: A
Cooperative Multi-Agent Deep Reinforcement Learning Perspective'
date: '2025-05-17'
tags: ['robotics', 'paper review']
---

### Abstract

다중 에이전트 목표 할당 및 경로 계획(Target Assignment and Path Planning, TAPF)은 지능형 창고의 두 가지 핵심 문제입니다. 그러나 대부분의 문헌은 이 두 문제 중 하나만을 개별적으로 다루고 있습니다.

본 연구에서는 협력적 다중 에이전트 심층 강화 학습(Cooperative Multi-Agent Deep Reinforcement Learning, RL)의 관점에서 목표 할당과 경로 계획을 동시에 해결하는 방법을 제안합니다.

이 연구는 지능형 창고를 위한 TAPF 문제를 협력적 다중 에이전트 심층 RL로 모델링한 최초의 작업이며, 다중 에이전트 심층 RL을 기반으로 TAPF를 동시에 다룬 첫 번째 사례입니다.

---

### Introduction

물류 관련 산업의 급속한 발전과 함께, 지능형 창고(intelligent warehousing)에 대한 새로운 기회와 도전이 제시되고 있습니다. 전통적인 창고 기술은 컨베이어 벨트 및 기타 장비를 사용하여 자재 처리를 완료하는데, 이는 유연성이 부족하고 확장하기 어렵습니다. 지능형 창고는 다중 에이전트 시스템을 활용하여 상품을 지정된 위치로 운송함으로써 창고 효율성을 크게 향상시킵니다.

지능형 창고 시스템은 주로 키바(kiva) 시스템과 같은 주문 처리 시스템(order fulfillment system)과 물류 분류 센터(logistics sorting center)로 나뉩니다. 주문 처리 시스템에서 이동 에이전트는 재고 포드(inventory pods)를 재고 스테이션으로 옮깁니다. 그러면 작업자들이 재고 포드에서 상품을 꺼내고, 에이전트는 재고 포드를 원래 위치로 다시 옮깁니다. 물류 분류 센터에서 에이전트는 적재 스테이션(loading stations)에서 상품을 가져와 창고 중앙의 슈트(chutes)로 운송합니다. 본 연구에서 제안하는 접근 방식은 물류 분류 센터를 기반으로 합니다.

작업 할당 및 경로 찾기(Task Assignment and Path Finding, TAPF)는 지능형 창고의 두 가지 중요한 프로세스입니다. 시스템은 먼저 주문 요구 사항에 따라 각 에이전트에게 특정 작업을 할당합니다. 그런 다음 에이전트는 출발지에서 목적지까지 상품을 운송하며, 이 경로가 다른 에이전트와 충돌하지 않도록 보장합니다.

TAPF 문제는 일반적으로 NP-난해(NP-hard)이며, 큰 탐색 공간을 가지고 있습니다. 따라서 이 문제를 직접적으로 해결하는 것은 어렵습니다. 일반적으로 TAPF 문제를 해결하려면 두 단계가 필요합니다.

첫 번째 단계는 다중 에이전트 작업 할당(Multi-Agent Task Assignment, MATA)으로, 에이전트 간의 가능한 경로 충돌을 고려하지 않고 작업을 에이전트에게 할당합니다.

두 번째 단계는 다중 에이전트 경로 찾기(Multi-Agent Path Finding, MAPF) 알고리즘을 사용하여 모든 에이전트에 대한 경로를 계획하는 것입니다.

문헌에는 MATA와 MAPF를 연구하는 수많은 연구들이 있으며, 이러한 방법들은 다음 섹션에서 자세히 설명합니다. TAPF를 분리하여 해결하는 것은 전체 문제의 난이도를 낮추지만, 이러한 유형의 방법은 작업 할당과 경로 계획 간의 상호 영향을 무시합니다. 합리적인 작업 할당은 창고 에이전트의 경로 길이를 효과적으로 줄여 운영 효율성을 높일 수 있을 뿐만 아니라, 다른 에이전트 간의 경로 충돌을 피하는 데도 도움이 됩니다. 따라서 TAPF 문제를 함께 해결하는 것이 필요합니다. TAPF 문제에서는 각 유휴 에이전트와 재고 포드가 동종(homogeneous)이라고 가정합니다. 따라서 어떤 작업이든 어떤 에이전트에게든 할당할 수 있습니다.

---

### Related work

#### 1. Multi-Agent Task Assignment

다중 에이전트 작업 할당(MATA) 알고리즘을 통해 창고 자원의 활용도를 극대화할 수 있습니다. 현재 지능형 창고에서의 다중 에이전트 작업 할당 알고리즘은 관리 방식에 따라 중앙 집중식(centralized)과 분산식(distributed)으로 분류될 수 있습니다.

중앙 집중식 할당: 중앙 제어 시스템이 설정되어 있으며, 이 시스템이 작업 할당을 담당하고 에이전트에게 실행할 작업을 배정합니다. 고전적인 중앙 집중식 할당 알고리즘에는 헝가리안 알고리즘, 타부 탐색 알고리즘, 유전 알고리즘 등이 포함됩니다.

분산식 할당: 창고의 각 에이전트가 작업 및 환경 정보에 따라 스스로의 작업 순서를 계획합니다. 이 방식은 중앙 제어 시스템의 부하를 효과적으로 줄이고 더 유연하며 적응성이 높지만, 전역 최적해(global optimal solution)를 찾지 못할 수 있다는 단점이 있습니다. 또한, 분산식 할당 방식은 주로 학습 기반 방법과 시장 경매 방법을 포함합니다.

#### 2. Multi-Agent Path Finding

최근 다중 에이전트 경로 찾기(MAPF)는 컴퓨터 과학 및 로봇 공학 분야에서 뜨거운 연구 방향이 되었습니다. 고전적인 MAPF 알고리즘은 솔루션 결과가 최적성(optimality)을 충족하는지 여부에 따라 최적(optimal) 유형과 차선적(sub-optimal) 유형으로 나눌 수 있습니다.

최적 MAPF 알고리즘에는 A 기반*, 충돌 기반 탐색(Conflict-Based Search, CBS), 증가 비용 트리 탐색 기반, 컴파일 기반 방법 등이 있습니다.

차선적 고전 MAPF 알고리즘에는 탐색 기반, 규칙 기반, 컴파일 기반, 경계 충돌 기반 탐색(Bounded Conflict-Based Search), 유전 알고리즘 기반 방법 등이 포함됩니다.

그러나 전통적인 MAPF 알고리즘은 실시간 성능이 좋지 않습니다. 따라서 수많은 연구자들이 이 문제를 해결하기 위해 심층 강화 학습(Deep RL) 기반 MAPF를 연구하기 시작했습니다. PRIMAL은 심층 RL 기반의 대표적인 MAPF 알고리즘입니다. 하지만 PRIMAL은 여전히 단일 에이전트 심층 RL 방식을 통해 다중 에이전트 문제를 해결합니다.

#### 3. Cooperative Multi-Agent Deep Reinforcement Learning

협력적 다중 에이전트 RL은 공통 환경에서 상호 작용하는 여러 에이전트로 구성된 시스템을 다룹니다. 협력적 다중 에이전트 RL은 모든 에이전트가 협력하여 공통의 목표를 완료할 수 있도록 하는 정책을 학습하는 것을 목표로 합니다. 다중 에이전트 심층 RL은 에이전트가 상호 작용을 통해 다중 에이전트 환경에서 의사 결정을 학습할 수 있는 능력 덕분에 큰 주목을 받아왔습니다.

독립 Q-학습(Independent Q-Learning, IQL)은 다중 에이전트 RL 문제를 동일한 환경을 공유하는 동시적인 단일 에이전트 RL 문제의 집합으로 분해하여 해결합니다. 그러나 IQL은 다른 에이전트의 정책 변화로 인해 발생하는 비정상성(nonstationarity) 문제를 해결할 수 없습니다.

가치 분해 네트워크(Value-Decomposition Networks, VDN)는 팀 가치 함수를 일련의 에이전트별 가치 함수로 선형적으로 분해하여 학습할 것을 제안합니다. 그 후 QMIX는 혼합 네트워크(mixing network) 아키텍처를 활용하여 모든 에이전트의 결합 상태-행동 가치(joint state-action value)를 근사합니다. 혼합 네트워크는 각 에이전트의 국소 관찰(local observations)만을 조건으로 하여 각 에이전트의 상태-행동 가치를 비선형적으로 결합합니다. 또한, QMIX는 혼합 네트워크에 네트워크 구조의 단조성 제약(monotonicity constraint)을 적용하여 결합 상태-행동 가치가 각 에이전트 상태-행동 가치에 대해 단조롭게 되도록 강제합니다.

그러나 위에 언급된 이러한 알고리즘들은 연속적인 행동 공간(continuous action space) 문제를 처리할 수 없습니다.

심층 결정적 정책 경사(Deep Deterministic Policy Gradient, DDPG)는 단일 에이전트의 연속 행동 작업에서 대표적인 방법입니다.

다중 에이전트 심층 결정적 정책 경사(Multi-Agent Deep Deterministic Policy Gradient, MADDPG)는 중앙 집중식 학습 및 분산식 실행 패러다임을 사용하여 DDPG를 단일 에이전트 설정에서 다중 에이전트 설정으로 확장했습니다. MADDPG는 다중 에이전트 연속 행동 문제의 대표적인 알고리즘입니다.

따라서 본 연구에서는 지능형 창고의 TAPF를 협력적 다중 에이전트 심층 RL 문제로 모델링하고, 이 문제를 동시에 해결하기 위해 MADDPG를 도입합니다.

---

### Preliminaries

#### 1. MDP and RL

본 연구에서는 $(\mathcal{S}, \mathcal{A}, P, r, \gamma, T)$로 정의되는 유한 시간 범위(finite-horizon) 마르코프 결정 과정을 고려합니다.

여기서 $\mathcal{S}$는 상태공간, $\mathcal{A}$는 행동 공간, $P: \mathcal{S} \times \mathcal{A} \times \mathcal{S} \to [0, 1]$은 상태 전이 분포(state transition distribution)를 나타냅니다. $r: \mathcal{S} \times \mathcal{A} \to \mathbb{R}$은 보상 함수(reward function)를 나타냅니다. 그리고 $\gamma \in [0, 1)$은 할인 인자(discount factor), $T$는 시간 범위를 나타냅니다.

각 시간 단계 $t$에서, 정책 $\pi$로부터 행동 $a_t \in \mathcal{A}$가 선택됩니다. $P(s_{t+1} | s_t, a_t)$에서 샘플링하여 다음 상태로 전이된 후, 에이전트는 즉각적인 보상 $r(s_t, a_t)$를 얻습니다. 에이전트는 종결 상태(terminal state)에 도달하거나 $t$가 시간 범위 $T$에 도달할 때까지 행동을 계속 수행합니다.

본 연구에서는 환경 동역학 $P$에 접근할 수 없으며 model free rl로 학습합니다.

#### 2. A Cooperative Multi-Agent Deep RL Perspective

<img src="https://velog.velcdn.com/images/devjo/post/91cd73fa-cb57-4b05-ba03-e5658c182ebf/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

본 연구에서는 상태 전이 함수 $P(s'_{t+1} | s_t, a_t): \mathcal{S} \times \mathcal{A}^N \times \mathcal{S} \to [0, 1]$이 알려져 있지 않으며, 이는 에이전트가 환경 동역학(dynamics)을 얻을 수 없음을 의미합니다. 이는 실제 TAPF 문제와 일치합니다.본 연구에서 에이전트의 수 $N$은 임의의 정수로 설정될 수 있습니다. 할인 인자 $\gamma = 0.99$는 심층 $\text{RL}$에서 가장 일반적인 설정입니다. 다중 에이전트 심층 $\text{RL}$의 주요 요소는 관찰 공간 $\mathcal{O}$ (또는 상태 공간 $\mathcal{S}$), 행동 공간 $\mathcal{A}$, 보상 함수 $r$이므로, 이 요소들을 자세히 설명합니다.

에이전트의 관찰은 자신의 위치 및 속도, 모든 작업(tasks)의 상대 위치, 다른 에이전트의 상대 위치, 그리고 이웃 장애물의 상대 위치를 포함합니다. 본 연구에서 한 에이전트의 관찰에 포함되는 다른 가시적 에이전트의 수는 $N-1$과 같거나 그보다 작게 설정될 수 있습니다.

에이전트의 행동 공간은 연속적이며, 움직임을 나타냅니다. 위 이미지에서 나타난 바와 같이, 에이전트는 네 가지 기본 방향 [좌측 이동($\vec{v}_{-x}$), 우측 이동($\vec{v}_{x}$), 아래 이동($\vec{v}_{-y}$), 위 이동($\vec{v}_{y}$)] 각각에서 $0.0\text{m/s}$와 $1.0\text{m/s}$ 사이의 속도를 얻으며, 최종 행동($\vec{v}$)은 네 가지 속도의 벡터 합으로 계산됩니다.

보상 함수는 다음과 같이 정의됩니다. 

$$
r = r_{\text{success}} + r_{\text{distance tasks to agents}} + r_{\text{collision agents to obstacles}} + r_{\text{collision agents to agents}}
$$

---

### Conclusion

다양한 지능형 창고 설정에서 방법을 검증했으며 다음과 같은 다섯 가지 수준의 시나리오를 설정했습니다. (1) 에이전트 2개 - 작업 2개, (2) 에이전트 2개 - 작업 4개, (3) 에이전트 5개 - 작업 5개, (4) 에이전트 5개 - 작업 10개, (5) 에이전트 5개 - 작업 20개.

<img src="https://velog.velcdn.com/images/devjo/post/fb8008fc-f332-4fec-bac7-24649569eccc/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

위 이미지처럼 시나리오에서 평균 보상은 단조롭게 증가하며 이는 방법의 안정성을 검증합니다.

첫째, TAPF 문제를 협력적 다중 에이전트 심층 RL 문제로 모델링했습니다. 둘째, 협력적 다중 에이전트 심층 $\text{RL}$ 알고리즘을 통해 목표 할당과 경로 찾기를 동시에 해결합니다. 또한, 이전 문헌에서는 에이전트의 물리적 역학을 거의 고려하지 않았지만, 본 연구에서는 에이전트의 물리적 역학을 고려했습니다.실험 결과는 이 방법이 다양한 작업 설정에서 우수한 성능을 보임을 보여주며, 이는 목표 할당이 합리적으로 해결되었고 계획된 경로가 거의 최단 경로임을 의미합니다. 나아가, 기준 모델보다 더 시간 효율적입니다.

---

### 참고 자료

[원본 경로 #1](https://arxiv.org/pdf/2408.13750v1)

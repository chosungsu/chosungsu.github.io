---
title: 'Fusion Q-Learning Algorithm for Open Shop Scheduling Problem with AGVs'
date: '2025-01-21'
tags: ['robotics', 'paper review']
---

### Abstract

기업의 실제 생산 상황에 맞춰 AGV(무인 운반 로봇) 운송 시간을 고려한 오픈샵(open-shop) 환경의 스케줄링 문제 모델이 설계되었습니다. 이러한 문제를 해결하기 위해 Q-러닝 기반 방법이 제안됩니다. 문제의 특성을 기반으로 공정 인코딩과 AGV 인코딩을 결합한 하이브리드 인코딩 접근 방식이 적용됩니다.

세 쌍의 행동으로 행동 공간이 구성됩니다. 감쇠 계수(decay factors)와 탐욕 전략(greedy strategy)을 활용하여 지능형 에이전트의 의사 결정을 교란시켜, 에이전트가 지역 최적에 빠지는 것을 방지하는 동시에 솔루션 공간의 광범위한 탐색을 촉진합니다.

---

### Introduction

오픈샵 스케줄링 문제(OSP)는 전형적인 NP-난해(NP-hard) 문제에 속합니다. 작업장 스케줄링 문제(JSP)가 작업 공정이 고정된 처리 단계를 따르는 것과는 대조적으로, OSP는 작업 처리 중 고정된 작업 순서와 관련된 문제를 완화하기 위해 비고정 순서 처리 방법론을 사용합니다. 이 접근 방식은 기업 내 제조 공정의 유연성을 향상시켜 결과적으로 기계 활용률과 전반적인 생산 효율성 증진을 촉진합니다. OSP는 전통적인 JSP에 비해 더 큰 해(Solution) 공간을 가지고 있어 최적화 가능성이 더 크다는 점에 주목할 만합니다.

현재, 최대 완료 시간 최소화는 오픈샵 스케줄링 분야에서 가장 널리 연구되는 성능 평가 지표입니다. Wan 등은 그래프 컨볼루션 네트워크를 이용한 링크 예측을 통해 오픈샵 스케줄링 문제를 해결하는 방법을 제안했습니다. 그들은 분리 그래프(disjunctive graph)를 사용하여 오픈샵 스케줄링 문제의 상태를 표현하고, 그래프 컨볼루션 네트워크를 기반으로 스케줄링 모델 및 알고리즘을 설계했습니다. 최종적으로 그들의 접근 방식이 문제의 무작위 인스턴스를 해결할 때 더 좋고 안정적인 실험 결과를 달성했음을 입증했습니다. Rahimi 등은 최대 완료 시간 최소화를 목표로 운송 시간을 고려한 무대기(no-wait) 오픈샵 스케줄링 문제 모델을 공식화했습니다. 그들은 소규모 문제 인스턴스를 해결하기 위해 하이브리드 시뮬레이티드 어닐링 메타휴리스틱 알고리즘을 고안했습니다. 실험 결과는 향상된 접근 방식의 성능에 상당한 개선이 있음을 나타냅니다. Li 등은 완료 시간 최소화를 목표로 오픈샵 스케줄링 문제를 다루기 위해 할인 메모리(discounting memory)를 그래프 신경망 모델에 통합했습니다. 그들은 스케줄링 문제를 시퀀스 문제로 변환하기 위해 증분 그래프 표현(incremental graph representations)을 구축했습니다. 최종 실험 결과에서 그들의 방법이 전통적인 접근 방식보다 우수하고 더 높은 품질의 해 집합을 달성할 수 있음을 입증했습니다. Gao 등은 최대 완료 시간 최소화를 목표로 배터리 용량과 불확실한 도면 시간을 고려한 수학적 모델 문제를 해결하기 위해 휴리스틱 방법과 Q-학습을 결합했습니다.

최근 몇 년 동안 스케줄링 문제 모델링 및 최적화에 대한 학자들의 심층 연구는 기업 내 실제 응용 분야에서 스케줄링 방법의 점진적인 확산을 가져왔습니다. AGV(Automated Guided Vehicles)는 자동화된 자재 처리 시스템, 제조 작업장 시스템 및 컨테이너 처리 응용 분야에서 유연하고 효율적인 운송 도구로 기업들로부터 점점 더 선호되고 있습니다. Wu 등은 AGV 경로를 최적화하기 위해 개선된 좁은 경로 검색 방법(improved narrow-path search method)을 설계했습니다. 이 방법은 부모 노드 재선택(parent-node reselection) 및 경로 가지치기(path pruning)와 같은 전략을 통합하여 회전점 수를 크게 줄였습니다. Li 등은 작업장 CNC 기계와 AGV 간의 상호 의존성을 고려하여 AGV 조정 및 하모니 검색(harmony search)을 결합한 알고리즘을 제안했습니다. 실험적 검증은 이 방법이 CNC 기계의 대기 시간을 줄이고 전반적인 생산 효율성을 향상시키는 데 효과적임을 나타냅니다.

전통적인 오픈샵 스케줄링 문제 맥락에서 기계 간의 운송 시간은 종종 간과됩니다. 일반적으로 운송 시간은 무시할 수 있으며 스케줄링 과정에서 고려되지 않는다고 가정합니다. 그러나 이 가정은 현실과 크게 다르며, AGV의 운송 시간은 실제 스케줄링 솔루션에 부인할 수 없는 영향을 미칩니다. 따라서 AGV 운송 시간을 고려한 오픈샵 스케줄링 문제는 전통적인 오픈샵 스케줄링 문제의 확장입니다.

현재 강화 학습은 주로 작업장 스케줄링 문제에 적용되며, AGV 운송 시간을 고려하는 오픈샵 스케줄링 문제에는 적용이 제한적입니다. Yang 등은 심층 강화 학습과 그래프 신경망을 통합하여 작업장 스케줄링 문제의 상태를 분리 그래프 표현을 사용하여 스케줄링 규칙으로 변환하는 에이전트 모델을 구축했습니다. 그들은 이 접근 방식을 완료 시간 최소화를 목표로 작업장 문제를 해결하는 데 적용하여 방법의 타당성을 입증했습니다. Park 등은 작업장 스케줄링 문제를 해결하기 위해 강화 학습과 그래프 신경망을 결합했습니다. 그들은 근접 기반 전략 최적화 방법으로 알고리즘을 훈련하고 제안된 방법이 높은 일반화 능력과 빠른 해결 효율성을 보인다는 것을 실험적으로 입증했습니다.

따라서 본 연구는 강화 학습 방법인 Q-학습의 적용을 확장하여 AGV 운송 시간을 고려한 오픈샵 스케줄링 문제를 다루는 것을 목표로 합니다. 제안된 방법의 잠재적 이점은 다음과 같은 다양한 기여에 있습니다. 첫째, AGV 운송 시간을 고려하는 오픈샵 스케줄링 문제에 강화 학습 방법인 Q-학습을 적용함으로써 방법의 적용 가능성을 더 넓은 도메인으로 확장합니다. 둘째, 이 방법은 하이브리드 인코딩 방식을 도입하여 지능형 에이전트가 환경을 지속적으로 탐색하고 최적의 목표 솔루션 집합을 얻을 수 있도록 합니다. 이 인코딩 방식은 복잡한 문제에 대한 알고리즘의 적응성을 향상시킵니다. 셋째, 연구 목표에는 AGV 운송 시간 및 다양한 시나리오에서의 부하에 대한 에너지 소비 지표와 작업 완료 시간의 포괄적인 고려가 포함됩니다. 이 접근 방식은 방법을 실제 생산 요구 사항에 더 가깝게 만듭니다. 넷째, 다양한 가중치 하에서 Q-학습의 평가는 다양한 조건에서 알고리즘의 성능을 조사하여 방법의 유연성과 적용 가능성을 향상시킵니다.

---

### Problem description

AGV 운송 시간을 고려한 오픈샵 스케줄링 문제는 $M$개의 기계에서 $i$개의 작업을 처리하는 것으로 특징지어지며, 각 작업은 $j$개의 작업(operation)으로 구성됩니다. 특정 시간 내에 각 기계는 하나의 작업만 처리할 수 있으며, 각 작업은 하나의 기계에 의해서만 처리될 수 있습니다. 오픈샵 스케줄링 문제에서 서로 다른 기계 간 작업의 처리 및 운송은 $V$개의 AGV의 지원을 필요로 하며, 이는 특정 운영 시나리오를 제시합니다. 처리 주기 시작 시, 작업과 AGV 모두 초기에는 검사 영역에 배치되며, 이는 이미 입고 검사를 거쳐 처리를 준비하고 있다는 가정을 전제로 합니다. 모든 작업 처리가 완료되면 AGV는 마지막 작업이 수행된 기계 근처에 자동으로 배치되는 것으로 간주됩니다. 이 문제는 검사 영역과 기계 간 작업 운송에 필요한 시간, AGV가 서로 다른 기계 간 작업을 운송하는 데 걸리는 시간, 그리고 후속 운송을 위한 작업 완료를 예상하여 AGV가 선제적으로 이동하는 것을 포함한 다양한 시간적 요인을 고려합니다.

AGV 운송 과정에서 공차(empty) 및 적재(loaded) 상태의 에너지 소비뿐만 아니라 완료 시간에 가중치를 부여하여 최종 목적 함수는 아래 수식으로 표현됩니다.

$$
F=min(\alpha*C_{max}+(1-\alpha)*EC), \\
EC=EC_f+EC_k, \\
EC_f=PL(\sum t_f^{AGV1} (m_1, m_2)+\sum t_f^{AGV2}(m_3, m_4)), \\
EC_k=PL(\sum t_k^{AGV1} (m_1, m_2)+\sum t_k^{AGV2}(m_3, m_4))
$$

여기서 $\alpha$는 가중치이며 $C_{max}$는 최대 완료 시간 최소화와 관련되고 EC는 에너지 소비를 나타냅니다.

---

### Algorithm

<img src="https://velog.velcdn.com/images/devjo/post/e348ce5d-1393-4885-a895-ea38be5247b0/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Q-학습은 가치 함수를 기반으로 하는 강화 학습 방법입니다. 이는 다양한 전략에 따라 스케줄링 시스템에서 생성된 데이터로부터 학습할 수 있으며, 이 지식을 해결 과정에서 모델을 훈련하는 데 적용하여 스케줄링 시스템의 훈련 결과를 개선합니다. Q-값 업데이트 계산은 아래 수식에 의해 나타납니다.

$$
Q(s,a)' \leftarrow Q(s,a) + \alpha[r+\gamma max_a maxQ(s',a)-Q(s,a)]
$$

AGV 운송 시간을 고려한 오픈샵 스케줄링 문제를 Q-학습을 사용하여 해결하는 과정에서 Q-학습의 핵심은 훈련 과정 중에 Q-테이블을 구축하여 계산된 Q-값을 저장하는 것입니다. Q-테이블은 각 상태에 해당하는 다른 행동에 대한 Q-값을 저장하는 데 사용되므로 Q-학습에서 중요한 역할을 합니다.

Q-학습 전략의 특정 반복 프로세스는 다음과 같습니다. 먼저, 읽을 작업물 수와 처리 기계 수를 초기화합니다. 감마를 0.75, 학습률을 0.0001, 에포크를 300, 스텝 크기를 500으로 설정합니다. 그런 다음 모델의 훈련 및 해결 프로세스에 들어갑니다. 이어서 지능형 에이전트는 탐욕 정책에 따라 무작위로 행동을 선택하고 행동 완료 후 새로운 상태로 들어갑니다. 새로운 상태에서 행동을 취한 후, 에이전트는 새로운 상태의 모든 행동을 검사하고, 최대 Q 값을 가진 행동을 선택한 다음 그 행동을 선택합니다. 위 수식을 사용하여 모든 계산을 완료한 후 현재 행동의 Q 값이 업데이트됩니다. 업데이트 후 지능형 에이전트는 새로운 상태를 계속 탐색하며 위 프로세스를 반복합니다.

AGV 운송 시간을 고려한 오픈샵 스케줄링 문제의 특성을 위해 공정 인코딩과 AGV 시퀀스 인코딩을 결합한 2차원 하이브리드 인코딩이 사용됩니다. 첫 번째 차원은 공정 인코딩을 나타내며, 1부터 $i*j$까지의 무작위로 순서가 지정된 비반복 정수로 구성됩니다. 여기서 $1, 2, ..., j$는 작업 1의 다른 처리 작업을 나타내고, $j+1, j+2, ..., j+j$는 작업 2의 다른 처리 작업을 나타내는 식입니다. AGV 시퀀스 인코딩은 $3*3$개의 1 또는 2 인스턴스($V$가 2라고 가정)로 구성됩니다.

보상은 지능형 에이전트와 환경 간의 상호 작용에서 중요한 역할을 하며, 지능형 에이전트가 환경으로부터 받는 피드백 정보의 역할을 합니다. 따라서 지능형 에이전트의 학습 및 행동에서 생산 효율성과 물류 효율성 간의 관계를 더 잘 균형 잡기 위해, 설계는 지능형 에이전트와 환경 간의 상호 작용 후 얻은 보상에 대한 가중치 인자로 기계 활용률과 AGV 유효 페이로드율(effective payload rate)을 포함합니다.

---

### Conclusion

AGV 운송 시간을 고려한 오픈샵 스케줄링 문제 모델을 다루는 데 있어, 최대 완료 시간 최소화와 에너지 소비 최소화가 목적 함수 내의 영향력 있는 요소로 사용되었습니다. 지능형 에이전트에게 해 공간 내에서 더 많은 탐색 기회를 제공하고 상당한 보상 값을 축적할 수 있도록, 공정 인코딩과 AGV 인코딩으로 구성된 하이브리드 인코딩 방식이 고안되었습니다.

실험 비교는 Taillard 벤치마크 테스트 사례와 문헌을 활용하여 수행되었으며, GA, SA, PSO를 대조군으로 설계했습니다. 결과는 NSMGA 알고리즘에 비해 평균 88.81%의 향상을 보였습니다.

---

### 참고 자료

[원본 경로 #1](https://www.mdpi.com/2227-7390/12/3/452)




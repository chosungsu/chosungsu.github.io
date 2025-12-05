---
title: 'Planning and Learning with Tabular Methods'
date: '2025-03-24'
tags: ['reinforcement learning', 'lecture']
---

### Models and Planning

모델(Model)이란 에이전트가 환경의 행동에 대한 자신의 행동의 결과를 예측하는 데 사용할 수 있는 모든 것을 의미합니다. 주어진 상태 $s$와 행동 $a$에 대해 모델은 결과적으로 발생하는 다음 상태 $s'$와 다음 보상 $r$을 예측합니다.

분포 모델은 모든 가능한 다음 상태와 보상, 그리고 그것들의 발생 확률을 제공합니다. 샘플 모델은 확률 분포에 따라 가능성 중 하나만을 샘플링하여 제공합니다.

---

### Integrating Planning, Acting, and Learning

계획이 환경과의 상호작용과 동시에 온라인으로 수행될 때, Dyna-Q와 같은 아키텍처는 필수적인 기능을 통합합니다.

#### Direct vs. Indirect RL

경험은 모델을 개선하여 실제 환경과 더 정확히 일치시킵니다. 실제 경험을 사용하여 가치 함수와 정책을 직접 개선하는 것을 Direct RL이라고 하며 경험 $\rightarrow$ 모델 $\rightarrow$ 값 & 정책을 이끌어내는 것이 Indirect RL이라고 합니다.

Dyna-Q는 결정론적 환경을 가정하는 표 기반 학습입니다. 경험된 상태-행동 쌍 $(S_t, A_t)$에 대해, 모델은 마지막으로 관찰된 다음 상태 $S_{t+1}$와 보상 $R_{t+1}$을 기록합니다.

---

### Prioritized Sweeping

Prioritized Sweeping은 변경의 긴급성(urgency)에 따라 백업의 우선순위를 정하고 순서대로 수행하는 아이디어입니다.

어떤 상태의 추정 가치가 변경되면, 그 상태로 직접 이어지는 행동들의 백업을 수행합니다. 값이 변경될 가능성이 있는 모든 상태-행동 쌍을 저장하고, 예상되는 값 변화의 크기에 따라 우선순위를 매기는 큐(Queue)를 유지합니다. 큐에서 가장 높은 우선순위의 쌍을 꺼내어 백업합니다.

---

### Full vs. Sample Backups

전체 백업은 모든 가능한 다음 상태를 고려하므로 샘플링 오류(sampling error)가 없어 더 나은 추정치를 제공합니다. 그러나 더 많은 계산 시간이 필요하며, 계산 시간은 계획에서 종종 제한적인 리소스입니다.

$$
Q(s, a) \leftarrow \sum_{s', r} \hat{p}(s', r|s, a) \left[ r + \gamma \max_{a'} Q(s', a') \right]
$$

반면 샘플 백업은 

$$
Q(s, a) \leftarrow Q(s, a) + \alpha \left[ R + \gamma \max_{a'} Q(S', a') - Q(s, a) \right]
$$

와 같으며 주어진 상태-행동 쌍 $(s, a)$에서 가능한 다음 상태의 개수인 분기 $b$만큼 전체 백업이 더 많은 계산이 필요하다고 합니다.

---

### Heuristic Search

이 방법은 근사 가치 함수 (heuristic value function)를 변경하는 것에는 관심이 없고, 현재 가치 함수가 주어졌을 때 개선된 행동 선택을 하는 것에만 초점을 맞춥니다. 즉, 휴리스틱 탐색은 정책 계산의 일부로서 계획을 수행합니다.

탐색할 때 마주치는 각 상태에 대해, 가능한 연속(continuation)을 나타내는 큰 트리를 고려합니다. leaf nodes에 현재의 근사 가치 함수를 적용하고, 이 값을 현재 상태가 있는 루트 쪽으로 백업합니다.

#### Focusing Backups

휴리스틱 탐색은 행동 선택 기법으로서 중요할 뿐만 아니라, 최적 가치 함수의 근사를 개선하는 선택적 백업 분배 방식도 제시합니다.

휴리스틱 탐색은 트리를 선택적으로 성장시킵니다. 즉, 최적일 가능성이 높은 행동에 대해서는 더 깊게, 에이전트가 선택하지 않을 가능성이 높은 행동에 대해서는 더 얕게 탐색합니다. 휴리스틱 탐색의 효과는 현재 상태와 그 직후에 올 가능성이 높은 상태 및 행동에 탐색 트리가 집중되어 있기 때문입니다.

---

### 참고 자료

[원본 경로 #1](https://web.stanford.edu/class/psych209/Readings/SuttonBartoIPRLBook2ndEd.pdf?utm_source=chatgpt.com)



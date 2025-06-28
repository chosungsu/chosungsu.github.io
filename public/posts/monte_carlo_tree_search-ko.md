---
title: 'Monte carlo tree search'
date: '2025-03-28'
tags: ['cs234', 'lecture']
---

### simulation based search

전체 상태 공간에 대한 정책을 계산하는 대신, 현재 상태에 대해 더 나은 결정을 내리기 위해 국소적인 계산을 우선순위로 두는 방법입니다.

간단한 monte carlo 탐색에서 모델 $M$과 시뮬레이션 정책 $\pi$가 주어지면 각 행동 $a$에 대해 현재 상태로부터 $k$개의 에피소드를 시뮬레이션하고 평균 보상값으로 행동을 평가합니다.

mdp 모델이 있다면 트리를 구성하여 최적의 $(s,a)$ 쌍에 대한 $Q$를 계산할 수 있지만 트리의 크기가 $(|S||A|)^{H}$만큼 커져 계산 비용이 매우 높다는 한계가 있습니다.

---

### monte carlo tree search(MCTS)

mcts는 모델이 주어졌을 때 현재 상태를 root로 하는 탐색트리를 구축합니다. monte carlo simulated search와의 차이는 한번의 시뮬레이션을 수행하는 것이 아닌 점진적인 구축을 통해 정보를 재활용하는 것입니다.

상위 신뢰트리(uct)는 어떤 행동을 선택할지 bandit을 사용하는데 $Q(s,a,i)=\frac{1}{N(i,a)} \sum_{k=1}^{N(i,a)} G_k(i,a) + c\sqrt{\frac{O(logN(i))}{N(i,a)}}$와 같이 노드 $i$에서의 행동의 $Q$값을 보너스 항을 더하여 가장 높은 상한을 가진 행동을 선택하도록 합니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/UgANzoWc0nc?si=nExAbFJ55hGLEPvK)



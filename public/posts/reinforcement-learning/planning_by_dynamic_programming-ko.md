---
title: 'Planning by dynamic programming'
date: '2025-03-10'
tags: ['reinforcement learning', 'lecture']
---

### Policy evaluation

정책 평가(Policy Evaluation)는 임의의 정책 $\pi$에 대한 상태 가치 함수 $v_\pi$를 계산하는 과정입니다. 이는 DP 문헌에서 예측 문제(prediction problem)라고도 불립니다.

#### Iterative Policy Evaluation

환경의 동역학이 완전히 알려진 경우 $| \mathcal{S} |$개의 미지수를 가진 $| \mathcal{S} |$개의 연립 선형 방정식 시스템은 

$$
v_\pi(s) = \sum_a \pi(a|s) \sum_{s', r} p(s', r|s, a) \left[ r + \gamma v_\pi(s') \right]
$$

이 시스템의 해를 찾는 데 반복적 해법이 가장 적합합니다. 반복적 정책 평가는 $v_k$에서 $v_{k+1}$로 successive approximation(연속 근사) 시퀀스를 생성하며, $v_\pi$에 대한 벨만 방정식을 업데이트 규칙으로 사용합니다.

$$
\begin{aligned}
&v_{k+1}(s) = E_\pi[R_{t+1} + \gamma v_k(S_{t+1}) \mid S_t = s] \\
&= \sum_a \pi(a|s) \sum_{s', r} p(s', r|s, a) \left[ r + \gamma v_k(s') \right]
\end{aligned}
$$

$v_k = v_\pi$는 이 업데이트 규칙의 고정점입니다. ${v_k}$는 $k \to \infty$ 일 때 $v_\pi$로 수렴합니다.

---

### Policy Improvement

임의의 결정적 정책 $\pi$와 $\pi'$에 대해, 모든 상태 $s \in \mathcal{S}$에 대해 다음 조건이 충족되면

$$
q_\pi(s, \pi'(s)) \ge v_\pi(s)
$$

정책 $\pi'$는 $\pi$만큼 좋거나 더 좋습니다.

정책 개선은 $v_\pi$에 대해 탐욕적(greedy)인 새로운 정책 $\pi'$을 만드는 과정입니다.

$$
\pi'(s) = \underset{a}{\operatorname{argmax}} \ q_\pi(s, a)
$$

탐욕 정책은 1단계 앞을 내다보는 탐색에 따라 가장 좋아 보이는 행동을 선택합니다. 정책 개선 정리 덕분에 새로운 탐욕 정책은 원래 정책보다 항상 같거나 더 좋습니다.

---

### Policy Iteration

정책 평가를 통해 $v_\pi$를 얻고, 이를 사용하여 정책 개선을 통해 더 나은 정책 $\pi'$을 얻으면, 이 과정을 반복하여 단조롭게 개선되는 정책과 가치 함수의 시퀀스를 얻을 수 있습니다.

$$
\pi_0 \overset{E}{\longrightarrow} v_{\pi_0} \overset{I}{\longrightarrow} \pi_1 \overset{E}{\longrightarrow} v_{\pi_1} \cdots \overset{I}{\longrightarrow} \pi^* \overset{E}{\longrightarrow} v^*
$$

이 최적 정책을 찾는 방법을 정책 반복이라고 합니다. 유한 MDP는 유한한 수의 정책만 가지고 있으므로, 이 프로세스는 유한한 횟수의 반복 내에 최적 정책과 최적 가치 함수로 수렴해야 합니다.

---

### Value Iteration

정책 반복의 한 가지 단점은 각 반복이 정책 평가(Policy Evaluation)를 포함한다는 것입니다. 정책 평가는 그 자체로 여러 번의 상태 집합 스윕(sweeps)을 요구하는 반복적인 계산일 수 있으며, 정확한 수렴은 극한에서만 발생합니다.

가치 반복은 정책 평가 단계를 단 한 번의 스윕으로 잘라낸(truncated) 정책 반복의 중요한 특수 사례입니다.

$$
\begin{aligned}
&v_{k+1}(s) = \max_a E[R_{t+1} + \gamma v_k(S_{t+1}) \mid S_t = s, A_t = a], \\
&v_{k+1}(s) = \max_{a} \sum_{s', r} p(s', r|s, a) \left[ r + \gamma v_k(s') \right]
\end{aligned}
$$

가치 반복은 $v^*$로 정확하게 수렴하는 데 형식적으로 무한한 수의 반복을 요구합니다. 실제로는 한 번의 스윕에서 가치 함수 변화량 $\max_{s} |v_{k+1}(s) - v_k(s)|$이 충분히 작아지면 중지합니다.

---

### Asynchronous Dynamic Programming

DP 방법의 주요 단점은 상태 집합 전체에 대한 체계적인 스윕(sweeps)을 요구한다는 것입니다. 비동기적 DP 알고리즘은 상태 집합에 대한 체계적인 스윕 방식으로 구성되지 않은 인플레이스 반복 DP 알고리즘입니다.

어떤 순서로든 상태의 값을 백업하며 다른 상태의 사용 가능한 값들을 사용합니다. 어떤 상태는 다른 상태가 한 번 백업되기 전에 여러 번 백업될 수 있습니다. 올바르게 수렴하려면, 모든 상태의 값을 무한히 백업해야 합니다.

장점으로는 정책 개선을 위해 진전을 이루기 전에 끝없이 긴 스윕에 갇힐 필요가 없습니다. 에이전트가 방문하는 상태에 백업을 적용함으로써 DP 알고리즘의 초점을 에이전트에게 가장 관련 있는 상태에 맞출 수 있습니다.

---

### 참고 자료

[원본 경로 #1](https://web.stanford.edu/class/psych209/Readings/SuttonBartoIPRLBook2ndEd.pdf?utm_source=chatgpt.com)




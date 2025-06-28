---
title: 'Model free policy evaluation : without knowing'
date: '2025-03-10'
tags: ['cs234', 'lecture']
---

### policy evaluation

dynamic과 reward model 등을 알지 못하는 상황에서 특정 정책($\pi$)의 성능을 추정하는 방법으로 이 강의에서는 monte carlo, temporal difference, certainty equivalence with dp, batch policy evaluation 4가지 방법을 소개합니다.

---

### monte carlo

정책을 따르면서 생성된 에피소드로부터 반환된 $G_t$를 샘플링하고 평균을 계산하여 상태 가치함수 $V^{\pi}(s)$를 추정하는 방법입니다.

특징으로는 markov decision process의 dynamic/reward 모델을 필요로 하지 않습니다. 상태가 markov 가정을 만족하는지는 가정하지 않습니다.

#### first visit monte carlo

$N(s)=G(s)=0$으로 초기화하고 $i$번째 에피소드에서 $t$ 시간의 반환값 $G_{i, t}=r_{i,t}+\gamma r_{i, t+1}+\gamma^2 r_{i, t+2} + ... +\gamma^{T_i-1}r_{i, T_i}$을 구합니다.

가장 이른 시간인 $t$에서 total visit $N(s)=N(s)+1$, total return $G(s)=G(s) + G_{i, t}$, 추정치 $V^{\pi}(s)=G(s)/N(s)$ 로 업데이트합니다.

#### every visit monte carlo

first visit과 다르게 상태 $s$가 방문될 때마다 해당 시점 이후의 반환값을 사용합니다.

업데이트는 위와 동일합니다.

#### incremental monte carlo

total visit $N(s)=N(s)+1$은 동일하게 업데이트하고 추정치는 $V^{\pi}(s)=V^{\pi}(s) \frac{N(s)-1}{N(s)}+\frac{G_{i,t}}{N(s)}=V^{\pi}(s)+\frac{1}{N(s)}(G_{i, t}-V^{\pi}(s))$로 업데이트합니다. total visit의 역수 부분을 $\alpha$로 바꿀 수 있고 이는 learning rate이라고 생각할 수 있습니다.

점진적 추정치가 가치함수로 수렴하기 위해서는 learning rate이 다음 조건을 만족해야 합니다.

-learning rate의 합이 무한대 : 충분히 오랜 시간 동안 학습하여 수렴시키는 것

-learning rate의 합이 유한대 : 충분히 빨리 learning rate이 감소해야 하는 것

이 두 조건은 robbins monro 조건이라고 합니다.

---

### temporal difference learning

monte carlo와 dp의 요소를 결합합니다. 모델을 몰라도 작동하고 episodic이나 infinite horizon non-episodic에서 모두 사용할 수 있습니다.

1단계 학습($TD(0)$)으로는 가치함수를 아래와 같이 업데이트합니다.

$$
V^{\pi}(s_t)=V^{\pi}(s_t) \\
+\alpha([r_t+\gamma V^{\pi}(s_{t+1})] \\
-V^{\pi}(s_t))
$$

여기서 $r_t+\gamma V^{\pi}(s_{t+1})$를 td 타깃이라고 하며 [r_t+\gamma V^{\pi}(s_{t+1})]-V^{\pi}(s_t) 이를 td 에러라고 합니다.

mc와 달리 에피소드 종료를 기다릴 필요가 없으며 일반적으로 lower variance를 갖습니다.

---

### certainty equivalence

mdp 모델에서 전이확률($\hat{P}$)와 보상함수($r$)을 최대 우도 방식으로 추정하는 방법입니다.

$$
\hat{P}(s'|s,a)=\frac{1}{N(s,a)} \\
*\sum_{k=1}^{i}(s_k=s, a_k=a, s_{k+1}=s'), \\
\hat{r}(s,a)=\frac{1}{N(s,a)}\sum_{k=1}^{i}(s_k=s, a_k=a)
$$

매번 mle를 재계산해야 하므로 계산 비용이 매우 높습니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/jjq51TRNVvk?si=FeiVLMXaoJss02zc)




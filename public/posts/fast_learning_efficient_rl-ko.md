---
title: 'Fast learning and efficient RL'
date: '2025-03-24'
tags: ['cs234', 'lecture']
---

### multi-armed bandits

multi armed bandit은 $m$개의 행동 집합으로 구성된 $A$와 각 행동에 대한 보상 $R_a(r)$의 알려지지 않은 확률 $P[r|a]$의 튜플로 구성됩니다. 목표는 $\sum_{\tau=1}^{t} r_{\tau}$를 통해 누적 보상을 최대화하는 것입니다. 예시로는 부러진 발가락을 치료하는 방법을 결정하는 과제를 들 수 있습니다.

---

### greedy algorithm

각 행동의 가치를 monte carlo로 추정합니다.

$$
\hat{Q_t}(a) = \frac{1}{N_t(a)} \sum_{i=1}^{t-1} r_i (a_i=a)
$$

이 수식으로 가장 높은 추정 가치를 가진 행동을 선택합니다. greedy 알고리즘은 최적해 이하의 행동에 영원히 고정될 수 있습니다.

---

### regret framework

action value는 행동에 대한 평균 보상을 말하며 $Q(a)=E[r|a]$로 구하고 optimal value는 모든 행동 중 상태-행동 가치함수 $Q$의 최대값으로 $V^*=Q(a^*)$로 나타냅니다. 총 후회는 스텝 동안의 총 기회 손실로 $L_t=E \left[\sum_{\tau=1}^{t} V^*-Q(a_{\tau}) \right]$를 통해 계산되며 이를 최소화하는 것이 누적 보상을 최대화하는 길입니다.

최적의 행동을 선택하지 않음으로써 발생하는 기회 손실을 정량화하는 방법은 아래와 같습니다.

$$
L_t=E \left[\sum_{\tau=1}^{t} V^*-Q(a_{\tau}) \right] \\
=\sum_{a \in A} E \left[N_t(a) \right](V^*-Q(a)) \\
=\sum_{a \in A} E \left[N_t(a) \right]\Delta_a
$$

$N_t(a)$로 특정 시점까지 행동이 선택된 횟수를 표현하고 $\Delta_a$는 최적 행동($a^*$)와 특정 행동의 가치의 차이를 표현합니다.

---

### $\epsilon$ greedy

$1-\epsilon$의 확률로 가장 높은 추정가치를 갖는 행동을 선택하고 $\epsilon$의 확률로 임의의 행동을 선택합니다.

regret framework에서 기회 손실을 정량화하는 알고리즘에서 $\Delta_a$가 큰 행동은 평균을 작게 유지하여 총 후회를 최소화해야 하지만 해당 값을 미리 알지 못합니다. 그 때문에 exploration과 exploitation 사이 균형이 필요합니다.

linear regret은 시간 step에 비례하여 regret이 증가하는 경우를 말하는데 최적 이하의 행동을 전체 횟수 중 일정한 비율로 선택한다는 것을 의미합니다.

예를 들어 $\epsilon=0.1$로 -이 아닌 값으로 고정되어 있다면 알고리즘은 매 step마다 해당 확률로 임의의 행동을 탐색하게 되고 이 탐색에는 당연히 최적 이하의 행동을 선택할 가능성이 포함됩니다. 따라서 $\epsilon > 0$인 경우 최적 이하의 행동이 존재한다면 알고리즘은 전체 step의 해당 비율만큼 최적 이하의 행동들을 선택하게 됩니다. 이러한 고정 비율은 선형적으로 증가시키는 결과를 발생시킵니다. 그리고 $\epsilon=0$이면 임의의 행동을 탐색하지 않지만 초기에 현재 가장 높은 추정가치를 갖는 행동을 선택하게 됩니다. 이 때 최적 이하의 행동이 가장 높았다면 그 행동에 영원히 고정이 되는 문제로 인하여 이 역시 선형적으로 증가하는 결과가 나오게 됩니다.

따라서 $\epsilon \ge 0$에서 선형적으로 증가하는 모습이 관측됩니다. 이러한 비효율적인 상황을 log를 취한 lai and robbins 정리를 통해서 lower bound를 설정함으로써 해소를 합니다.

---

### optimism under uncertainty

이 원칙은 exploration과 exploitation의 균형을 맞추기 위한 핵심적인 것으로 잠재적으로 높은 보상을 줄 수 있는 행동을 우선 시도하려는 경향을 말합니다.

이러한 접근에는 두 가지 결과가 예측됩니다.

-높은 보상을 얻는 경우 : 해당 행동이 실제 높은 평균 보상을 갖고 있다면 이를 선택하여 보상을 취합니다. 즉, exploitation의 성공적인 결과입니다.

-새로운 정보를 학습하는 경우 : 해당 행동이 실제 평균 보상이 예상보다 낮다면 이를 선택하여 행동의 평균 보상의 예상에 대한 불확실성이 줄어들게 됩니다. 즉, exploration의 성공적인 결과입니다.

#### hoeffding's inequality

$$
P(E(X) > \bar{X_n}+u) \le exp(-2nu^2)
$$

상한 신뢰구간(UCB)의 신뢰구간을 결정하는 부등식으로 독립적이고 동일하게 분포된(iid) 범위 내에 확률 변수 $(x_1, ..., x_n)$들의 표본 평균$(\bar{X_n})$이 실제 기대값으로부터 얼마나 벗어날 수 있는지의 확률적 상한을 제시합니다. 이 차이는 지수적으로 감소합니다.

#### UCB

위 부등식을 통해 $a_t=\underset{a \in A}{\operatorname{argmax}} \left [\hat{Q(a)} + \sqrt{\frac{2log\frac{1}{\delta}}{N_t(a)}} \right]$ 라는 행동 규칙을 만들 수 있는데 $\hat{Q(a)}$는 현재까지 관찰된 행동의 표본 평균 보상 추정치이고 $\frac{2log\frac{1}{\delta}}{N_t(a)}$는 exploration bonus항으로 log에 비례하여 천천히 증가시키되 행동의 선택횟수가 적을수록 해당 행동을 더 많이 선택하도록 유도하는 역할을 합니다.

---

### probably approximately correct(PAC)

regret bounds가 총 시간 step에 따라 얼마나 증가하는지를 나타내는 것이라면 pac는 충분히 정확한 정책을 충분히 높은 확률로 찾는 알고리즘입니다.

$\epsilon$-optimal 행동을 $Q(a) \ge Q(a^*)-\epsilon$으로 표현하며 최소 $1-\epsilon$ 확률로 선택하도록 합니다. 이에 해당하지 않는 행동을 선택하는 횟수가 polynomial 수 이내로 제한됩니다.

---

### bayesian methods

#### bayesian bandits

기존의 bandit은 보상$(R)$에 대한 가정을 거의 하지 않았지만 이 알고리즘은 보상에 대한 사전 지식인 $p(R)$을 적극적으로 활용합니다.

$$
p(\phi_i|r_{i1})=\frac{p(r_{i1}|\phi_i)p(\phi_i)}{p(r_{i1})}
$$

베이즈 추론으로 관측된 보상$(r_{i1})$을 바탕으로 알려지지 않은 파라미터 $\phi_i$에 대한 사후 분포를 업데이트합니다.

#### thompson sampling

이 알고리즘은 확률 매칭을 원칙으로 하는 베이지안 접근 방식입니다. 확률 매칭은 각 행동이 최적일 확률에 비례하여 행동을 선택하는 것입니다.

우선 확률 매칭은 예를 들어 에이전트가 어떤 행동 $a$가 모든 다른 행동 $a'$보다 더 높은 기대가치 $Q(a)$를 가질 확률을 $P[Q(a) > Q(a')|h_t]$에 따라 선택하게 될 때 불확실한 행동은 여전히 최적일 확률이 높을 수 있어 이 알고리즘 역시 불확실성 하의 낙관주의를 구현합니다. 문제는 이 행동이 최적일 확률을 지금까지의 관측 히스토리를 바탕으로 정확히 계산하는 것이 매우 어렵다는 것으로 톰슨 샘플링을 통해 해결합니다.

톰슨 샘플링은 보상분포인 $R_a$에 대한 사전분포를 초기화하고 현재 선택된 $a$의 보상분포에 대한 사후분포 $p[R_a|h_t]$로부터 각 행동의 기대보상을 샘플링합니다. 이중 가장 높은 기대가치 $Q(a)$를 갖는 행동을 선택합니다.

#### bayesian regret

frequentist regret은 환경에 true인 매개변수 $\theta$가 존재한다고 가정할 때 에이전트가 최적의 행동 $a^*$을 선택하면 얻을 수 있는 보상 $Q(a^*)$와 실제 선택한 행동 $a_t$를 사용하여 기회손실을 아래와 같이 측정합니다.

$$
E_{\tau} \left [\sum_{t=1}^{T} Q(a^*)-Q(a_t)|\theta \right] \\
\le E_{\tau} \left [\sum_{t=1}^{T} U_t(a_t)-Q(a_t)|\theta \right]
$$

시간 $t$에 에이전트가 선택한 행동 $a_t$에 대한 상위 경계(UCB)를 나타내는 $U_t$를 사용하므로 즉, 해당 행동의 실제 기대가치 $Q(a_t)$가 UCB보다 낮지 않을 확률이 높다는 것을 의미합니다.

bayesian regret은 true인 매개변수가 아니라 $\theta$에 대한 사전분포 $p(\theta)$로부터 샘플링된다고 가정합니다. 사전 지식 $p(R)$을 사용하여 각 행동이 최적일 확률에 비례하여 행동을 선택하여 bayesian regret을 줄이는 데 효과적입니다.

#### bayesian mdp

bayesian bandit와 유사하게 mdp 모델에 대한 사후 분포 $p[P, R |h_t]$를 유지합니다. tompson sampling을 mdp로 확장한 개념이 psrl로 이 알고리즘은 각 $(s, a)$ 쌍에 대한 dynamic, reward 모델의 사전분포를 초기화합니다. 모든 에피소드마다 mdp 모델을 샘플링하는데 최적의 가치함수 $Q^*$는 현재 상태에서 가장 높은 행동을 선택하여 업데이트합니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/sqYii3nd78w?si=k1mcRTdSqjfiW4z4)

[원본 경로 #2](https://youtu.be/gFJNsfg_35E?si=P7JXd8VY9m_nePuM)

[원본 경로 #3](https://youtu.be/pc7oayCSZmQ?si=Ku-Dz74T8vKdbpEY)



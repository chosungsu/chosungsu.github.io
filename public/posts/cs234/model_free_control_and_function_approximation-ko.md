---
title: 'Model free control and function approximation'
date: '2025-03-14'
tags: ['cs234', 'lecture']
---

### model free value function approximation

이전부터 사용된 policy iteration(pi)과 다르게 model free 환경에서는 정책($\pi$)가 결정론적일 경우 정책이 선택하지 않는 행동($a \ne \pi(s)$)에 대한 상태-행동 가치함수 $Q(s,a)$를 계산할 수 없다는 문제가 생깁니다.

$\epsilon$-greedy policy는 $|A|$가 행동의 개수일 때 $1-\epsilon+\frac{\epsilon}{|A|}$의 확률로 현재 상태-행동 가치함수에 대한 탐욕적 행동을 선택하고 비탐욕적 행동이 선택될 확률은 $\frac{\epsilon}{|A|}$의 확률로 임의의 행동을 균일하게 선택합니다.

#### monte carlo

상태-행동 가치함수를 직접 추정하여 최적의 정책을 찾는 것이 목표입니다. $\pi$가 주어졌을 때 $k$개의 샘플 에피소드를 만듭니다. 처음 방문되었을 때의 반환값 $Q(s,a)$를 업데이트합니다.

업데이트가 진행될 때마다 $\pi_k=\epsilon-greedy(Q)$로 탐욕적 정책을 사용하고 $\epsilon=1/k$로 점진적으로 감소시킵니다.

#### td policy

monte carlo와 다르게 에피소드 종료를 기다리지 않고 단계별로 업데이트하는 것이 특징이었습니다.

SARSA(State action reward state action)은 on policy 알고리즘이고 현재 행동 정책($\pi$)의 $Q$를 학습하고 $Q(s_t,a_t) \leftarrow Q(s_t,a_t) + \alpha(r_t+\gamma Q(s_{t+1}, a_{t+1})-Q(s_t, a_t))$로 업데이트합니다.

#### on and off policy

on policy는 현재 정책을 따름으로써 얻은 경험을 사용하여 평가합니다. 즉 행동을 선택하는 정책과 학습되는 정책은 동일합니다.

off policy는 현재 정책과 다른 정책으로부터 수집된 경험을 사용하여 평가합니다. 이미 수집된 데이터를 새로운 정책을 학습하는데 활용할 수 있어 재사용이라는 장점이 있습니다.

#### q learning

SARSA와 다르게 $Q(s_t,a_t) \leftarrow Q(s_t,a_t)+\alpha((r_t+\gamma max_{a'} Q(s_{t+1}, a'))-Q(s_t,a_t))$로 업데이트를 하는데 이는 다음 상태 $s_{t+1}$에서 가장 높은 $Q$를 가즌 행동을 의미하며 실제 다음 행동 $a_{t+1}$과는 다릅니다.

---

### control using value function approximation

#### general value

강화학습에서 에이전트는 특정 정책 $\pi$에 따른 상태-행동 가치함수 $Q$를 추정하는 것이 목표이고 이는 주어진 상태에서 행동을 취했을 때 미래에 얻을 수 있는 총 기대 보상을 나타냅니다.

하지만 모든 가능한 쌍에 대해 개별적으로 저장 및 학습하는 것은 비효율적이므로 value function approximation(VFA)을 사용합니다.

이는 직접 $Q^{\pi}(s,a)$를 저장하는 대신 매개변수 $w$로 표현되는 근사함수를 통해 추정을 합니다.

-function approximation : 특정 쌍에서 학습된 정보가 다른 쌍으로 일반화되면서 오류 발생 가능성

-bootstrapping : 학습 속도를 높일 수 있지만 추정치에 오류가 있다면 그 오류도 계속해서 전파될 가능성

-off policy : 행동과 타겟 정책 간의 데이터 분포 불일치로 불안정할 가능성

가치함수 근사를 이용하면 3가지 요소의 교차점에서 deadly triad가 발생할 수 있다고 합니다. 가치함수 근사의 목표는 실제 함수와 근사 함수 간의 평균제곱오차(mse)를 최소화하는 것입니다. $J(w) = E_\pi[(Q^\pi(s, a) - \hat{Q}^\pi(s, a; w))^2]$ 에서 sgd를 사용해서 경사에 따라 업데이트하여 최적의 $w$를 찾습니다.

#### deep q learning

가치함수 근사에서 $Q$학습은 불안정해지거나 발산할 수 있습니다. VFA는 신경망과 같은 모델 $\hat{Q}(s,a;w)$를 사용하여 근사하는데 이 때 불안정성의 주요 원인은 아래와 같이 2가지입니다.

-correlations between samples : 에이전트가 상호작용하면서 얻는 경험$(s, a, r, s')$는 시간적으로 연속적이고 강한 상관관계가 있습닏. sgd에서는 독립적인 샘플을 가정하고 최적화하므로 상관관계가 높은 데이터를 연속적으로 학습하게 되면 비효율적이고 불안정성을 초래합니다.

-non stationary targets : target은 $r+\gamma \max_{a'} \hat{Q}(s', a';w)$이지만 이 값은 $w$에 의존합니다. 학습 과정에서 $w$는 계속 업데이트되므로 target값은 고정되지 않기 때문에 불안정성을 초래합니다.

따라서 dqn은 experience replay로 샘플 간의 상관관계를 제거하고 모든 경험의 쌍을 replay buffer라는 데이터셋에 저장하도록 하였습니다. 이 replay buffer에서 무작위로 샘플링된 미니배치 튜플($D$)을 사용하여 sgd 업데이트를 $\Delta w = \alpha(r + \gamma \max_{a'} \hat{Q}(s', a'; w) - \hat{Q}(s, a; w))\nabla_w \hat{Q}(s, a; w)$와 같이 진행합니다. 하지만 여전히 매개변수 $w$에 의존하는 문제는 해결하지 못합니다.

다음으로 fixed $Q$ targets을 사용하는 방법을 제안하였습니다. 안정성을 향상시키기 위해 target의 가중치를 고정하고 두 신경망(현재의 $Q$ 네트워크와 target $Q$ 네트워크)을 사용합니다. 기존 네트워크는 $w$라는 매개변수를 갖고 있지만 target 네트워크는 $w^-$라는 매개변수를 가집니다. 해당 매개변수는 $w$를 일정 주기마다 복사하여 업데이트되며 그 외의 $t$에는 고정된 상태를 유지하고 $\Delta w = \alpha(r + \gamma \max_{a'} \hat{Q}(s', a'; w^-) - \hat{Q}(s, a; w))\nabla_w \hat{Q}(s, a; w)$를 통해 계산됩니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/b_wvosA70f8?si=tJRhjOU2ZPA0cdyK)




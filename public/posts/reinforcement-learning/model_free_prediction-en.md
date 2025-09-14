---
title: 'Model free prediction'
date: '2025-03-14'
tags: ['reinforcement learning', 'lecture']
---

### Model free value function approximation

Unlike the policy iteration (PI) used previously, in model-free environments, when the policy ($\pi$) is deterministic, there arises a problem where the state-action value function $Q(s,a)$ cannot be computed for actions ($a \ne \pi(s)$) that the policy does not select.

The $\epsilon$-greedy policy selects the greedy action with respect to the current state-action value function with probability $1-\epsilon+\frac{\epsilon}{|A|}$ when $|A|$ is the number of actions, and selects any random action uniformly with probability $\frac{\epsilon}{|A|}$ for non-greedy actions.

---

### Monte-Carlo

Monte Carlo (MC) methods learn directly from episodes of experience. They do not require knowledge of MDP transitions or rewards. MC learns from complete episodes and returns value=mean.

#### Policy Evaluation

$$
S_1, A_1, R_2, \dots, S_k \sim \pi
$$

The goal of this method is to learn $v_{\pi}$ from experience episodes under policy $\pi$. Here, the return represents the discounted total reward as $G_t=R_{t+1}+\gamma R_{t+2} + \dots + \gamma^{T-1} R_T$. And the value function is defined as $v_{\pi}(s)=\mathbb{E}_{\pi}[G_t|S_t=s]$. However, in MC policy evaluation, we use empirical average returns instead of expected returns.

#### First-Visit vs Every-Visit

$$
N(s) \leftarrow N(s) + 1, \\
S(s) \leftarrow S(s) + G_t, \\
v(s) = S(s)/N(s)
$$

First-visit evaluation increases the counter and total return at time $t$ when state $s$ is first visited in an episode to evaluate state $s$, while every-visit updates every time the state is visited.

#### Incremental Mean

$$
\mu_k=\frac{1}{k} \sum_{j=1}^k x_j \\
=\frac{1}{k}(x_k+\sum_{j=1}^{k-1} x_j) \\
=\frac{1}{k}(x_k+(k-1)\mu_{k-1}) \\
=\mu_{k-1}+\frac{1}{k}(x_k-\mu_{k-1})
$$

The means $\mu_1, \mu_2, \dots$ of the sequence $x_1, x_2, \dots$ can be computed incrementally as above. And incrementally updating MC's value function as $V(S_t) \leftarrow V(S_t) + \frac{1}{N(S(t))} (G_t-V(S_t))$ can be useful for tracking moving averages.

---

### Temporal Difference Learning

TD methods learn directly from episodes of experience. They also do not require a model or knowledge of transitions or rewards. TD updates towards a guess towards a guess.

#### About TD

$$
V(S_t) \leftarrow V(S_t)+\alpha(R_{t+1}+\gamma V(S_{t+1})-V(S_t))
$$

We update the value $V(S_t)$ towards the estimated return $R_{t+1} + \gamma V(S_{t+1})$. $R_{t+1} + \gamma V(S_{t+1})$ is called the TD target. The expression inside the parentheses is called the TD error, denoted as $\delta_t$.

#### Advantages and Disadvantages

TD can learn before knowing the final outcome and can learn online at every step. While MC must wait until the episode ends to know the return, TD can learn without the final outcome. It also works in non-terminating environments.

#### Bias/Variance Trade-Off

The return value $G_t=R_{t+1}+\gamma R_{t+2}+\dots+\gamma^{T-1}R_T$ is an unbiased estimate of $v_\pi(S_t)$. And the true TD target $R_{t+1} + \gamma v_\pi(S_{t+1})$ is an unbiased estimate of $v_\pi(S_t)$. The TD target $R_{t+1} + \gamma V(S_{t+1})$ is a biased estimate of $v_\pi(S_t)$.

TD's goal is to have much lower variance than the return. While the original return depends on many random actions, transitions, and rewards, TD aims to depend on only one random action, transition, and reward.

#### Certainty Equivalence

$$
\sum_{k=1}^K \sum_{t=1}^{T_k} (G_t^k - V(s_t^k))^2, \\
\hat{P}_{s,s'}^a=\frac{1}{N(s,a)} \sum_{k=1}^K \sum_{t=1}^{T_k} 1(s_t^k, a_t^k, s_{t+1}^k), \\
\hat{R}_{s}^a=\frac{1}{N(s,a)} \sum_{k=1}^K \sum_{t=1}^{T_k} 1(s_t^k, a_t^k)r_t^k
$$

MC converges to a solution with minimum mean squared error (MMSE), but TD(0) converges to a maximum likelihood (ML) solution.

---

### TD($\lambda$)

#### 1. n-Step return

Consider n-step returns for $n=1,2,\infty$ as follows:

$$
n=1 \\
\rightarrow \\
G_t=R_{t+1}+\gamma V(S_{t+1}), \\
n=\infty \\
\rightarrow \\
G_t=R_{t+1}+\gamma R_{t+2} + \dots + \gamma^{T-1}R_T
$$

Therefore, $G_t^{(n)}=R_{t+1}+\gamma R_{t+2} + \dots + \gamma^{n-1}R_{t+n}+\gamma^n V(S_{t+n})$ is defined, and temporal difference learning is $V(S_t) \leftarrow V(S_t)+\alpha(G_t^{(n)}-V(S_t))$.

#### 2. $\lambda$ return

This combines all n-step returns $G_t^{(n)}$. Using weights $(1-\lambda) \lambda^{(n-1)}$, it is defined as follows:

$$
G_t^{\lambda}=(1-\lambda)\sum_{n=1}^{\infty} \lambda^{n-1}G_t^{(n)}
$$

#### 3. Forward view vs Backward view

$$
V(S_t) \leftarrow V(S_t)+\alpha(G_t^{\lambda}-V(S_t))
$$

When updating the value function in forward view, we look ahead to the future of the value function.

In eligibility traces, we combine two heuristics: $E_0(s)=0, E_t(s)=\gamma \lambda E_{t-1}(s)+\mathbf{1}(S_t=s)$. In backward view, we maintain eligibility traces for all states $s$. This update is proportional to the TD error $\delta_t$ and the eligibility trace $E_t(s)$.

$$
\delta_t=R_{t+1}+\gamma V(S_{t+1})-V(S_t), \\
V(s) \leftarrow V(s) + \alpha \delta_t E_t(s)
$$

When $\lambda=0$, only the current state is updated. Since $E_t(s)=\mathbf{1}(S_t=s)$, it is equivalent to the TD(0) update $V(s) \leftarrow V(s) + \alpha \delta_t$. The total of offline updates is identical for both forward and backward views.

---

### References

[Original Source #1](https://youtu.be/b_wvosA70f8?si=tJRhjOU2ZPA0cdyK)

[Original Source #2](https://davidstarsilver.wordpress.com/wp-content/uploads/2025/04/lecture-4-model-free-prediction-.pdf)



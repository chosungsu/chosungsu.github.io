---
title: 'Model free control'
date: '2025-03-17'
tags: ['reinforcement learning', 'lecture']
---

### On-policy MC

Evaluating and improving policies from action-value functions proceeds as follows:

#### Policy evaluation

Estimating the target $v_{\pi}$ through iterative policy evaluation.

#### Policy improvement

Generating the target $\pi' \ge \pi$ through greedy policy improvement.

#### $\epsilon$ greedy exploration

An idea to ensure persistent exploration where all $m$ actions are tried with non-zero probability. And with probability $1-\epsilon$, we select the greedy action. With probability $\epsilon$, we select random actions as follows:

$$
\pi(a|s)=\begin{cases}
\epsilon/m +(1-\epsilon) \\
\epsilon/m
\end{cases}
$$

#### $\epsilon$ greedy policy improvement

For any greedy policy $\pi$, the greedy policy $\pi'$ with respect to $q_{\pi}$ is an improvement and satisfies $v_{\pi'}(s) \ge v_\pi(s)$.

$$
q_{\pi}(s,\pi'(s)) \\
=\sum_{a \in A} \pi'(a|s)q_{\pi}(s,a) \\
=\frac{\epsilon}{m} \sum_{a \in A} q_{\pi}(s,a) + (1-\epsilon) \max_{a \in A} q_{\pi}(s,a) \\
=\frac{\epsilon}{m} \sum_{a \in A} q_{\pi}(s,a) + (1-\epsilon) \frac{\sum_{a \in A} \pi(a|s) -\epsilon/m}{1-\epsilon}q_{\pi}(s,a) \\
=\sum_{a \in A} \pi(a|s) q_{\pi}(s,a) \\
=v_{\pi}(s)
$$

Greedy in the Limit with Infinite Exploration (GLIE) ensures that all state-action pairs are explored infinitely and the policy converges to a greedy policy. For example, when $\epsilon=1/k$ and $\epsilon$ decreases to 0, this is called GLIE.

---

### On-policy TD

#### Sarsa

Updates the action-value function as $Q(S,A) \leftarrow Q(S,A) + \alpha[R+\gamma Q(S',A')-Q(S,A)]$. Sarsa converges to the optimal action-value function $Q(s, a) \to q_*(s, a)$ for GLIE policy sequences $\pi_t(a|s)$ and Robbins-Monro step size sequences $\alpha_t$.

#### $n$ step Sarsa

$$
n = 1 \rightarrow \text{Sarsa} : q_t^{(1)}=R_{t+1}+\gamma Q(S_{t+1}, A_{t+1})
$$

Defining the $n$-step $Q$ return as follows:

$$
q_t^{(n)}=R_{t+1} + \cdots + \gamma^{n-1}R_{t+n} + \gamma^n Q(S_{t+n}, A_{t+n})
$$

And $n$-step Sarsa updates as $Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha(q_t^{n} - Q(S_t, A_t))$.

#### Forward view

The $q^{\lambda}$ return combines all $n$-step $Q$ returns $q_t^{(n)}$. Using weights $(1-\lambda)\lambda^{n-1}$, we define $q_t^{\lambda}=(1-\lambda) \sum_{n=1}^{\infty} \lambda^{n-1} q_t^{(n)}$.

#### Backward view

Like TD$(\lambda)$, it uses eligibility traces. However, in Sarsa, we maintain one trace for each state-action pair.

$$
E_0(s,a) = 0, \\
E_t(s,a) = \gamma \lambda E_{t-1}(s,a) + 1
$$

During updates, we proceed proportionally to the TD error $\delta_t=R_{t+1}+\gamma Q(S_{t+1}, A_{t+1})-Q(S_t,A_t)$ and eligibility trace $E_t(s,a)$ as $Q(s,a) \leftarrow Q(s,a)+\alpha \delta_t E_t(s,a)$.

---

### Off-policy

Off-policy learning is a method to compute $v_{\pi}(s)$ or $q_{\pi}(s,a)$ by evaluating the target policy $\pi(a|s)$ while following the behavior policy $\mu(a|s)$.

#### Importance Sampling

Importance sampling is a technique to estimate the expected value of some distribution using samples drawn from a different distribution, computed as $E_{X \sim P}[f(X)]=\sum P(X)f(X)=\sum \frac{Q(X)P(X)}{P(X)Q(X)}f(X)=E_{X \sim Q} [\frac{P(X)}{Q(X)}f(X)]$.

In MC, we evaluate policies using returns generated from $\mu$ and weight the return $G_t$ according to the similarity between policies. This can dramatically increase variance. And in TD, we evaluate policies using generated TD targets and multiply the TD target $R + \gamma V(S')$ by the importance sampling correction term as a weight.

#### Q learning

Consider off-policy learning of action-value $Q(s, a)$. Importance sampling is not needed, and the next action is selected according to the behavior policy $\mu$ as $A_{t+1} \sim \mu(\cdot|S_t)$. And $Q(S_t, A_t)$ is updated towards the value of alternative actions as $Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha(R_{t+1}+\gamma Q(S_{t+1}, A')-Q(S_t,A_t))$.

---

### References

[Original Source #1](https://davidstarsilver.wordpress.com/wp-content/uploads/2025/04/lecture-5-model-free-control-.pdf)




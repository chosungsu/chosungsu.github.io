---
title: 'Temporal Difference Learning'
date: '2025-03-17'
tags: ['reinforcement learning', 'lecture']
---

### TD Prediction

Both temporal-difference and Monte Carlo methods use experience to solve the prediction problem. That is, given some experience following a policy $\pi$, both methods update their estimate $V$ of $v_\pi$ for nonterminal states $S_t$.

Monte Carlo methods wait until the episode ends and use the actual return $G_t$ as the target. In contrast, temporal-difference learning updates at the very next time step, using the estimated return $R_{t+1} + \gamma V(S_{t+1})$ as the target.

#### Advantages

TD methods learn estimates from estimates. And TD does not require a model of the environment's reward and next-state probability distributions, unlike DP. This is particularly important when episodes are very long or when there are no episodes in continuing tasks.

---

### Optimality of TD(0)

When only a finite amount of experience is available, we often use batch updating. This is where the entire batch of experience is repeatedly presented to the algorithm until it converges to the solution.

Batch MC converges to the value $V(s)$ that minimizes the mean-squared error on the training set of actual returns. This is the sample average of the observed returns.

Batch TD(0) converges to the exactly correct value for the maximum-likelihood model of the Markov process. This is called the certainty-equivalence estimate.

---

### Sarsa: On-Policy TD Control

Off-policy learning is a method for evaluating a target policy $\pi(a|s)$ while following a behavior policy $\mu(a|s)$ to compute $v_{\pi}(s)$ or $q_{\pi}(s,a)$.

#### Q Learning

Instead of learning the state-value function $v_\pi$, we learn the action-value function $q_\pi(s, a)$. For on-policy methods, we must estimate $q_\pi(s, a)$ for the current behavior policy $\pi$. TD control learns action values by considering transitions from state-action pairs to the next state-action pairs. It updates $Q(S_t, A_t)$ using the $Q$ value of the action $A_{t+1}$ actually selected at the next state $S_{t+1}$ according to policy $\pi$.

$$
Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha \left[ R_{t+1} + \gamma Q(S_{t+1}, A_{t+1}) - Q(S_t, A_t) \right]
$$

This update uses all five elements of the quintuple $(S_t, A_t, R_{t+1}, S_{t+1}, A_{t+1})$, which is why it is called SARSA.

---

### References

[Original source #1](https://web.stanford.edu/class/psych209/Readings/SuttonBartoIPRLBook2ndEd.pdf?utm_source=chatgpt.com)

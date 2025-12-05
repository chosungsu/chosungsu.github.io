---
title: 'Eligibility Traces'
date: '2025-03-21'
tags: ['reinforcement learning', 'lecture']
---

### $n$-Step TD Prediction

$n$-step TD methods are a compromise between MC and 1-step TD, performing backups based on $n$ rewards and the estimated value $n$ steps later.

In $n$-step returns, MC backups use the complete return $G_t$ up to the end of the episode as the target, while 1-step TD backups use the next step's reward $R_{t+1}$ and the estimated value of the next state $\gamma V_t(S_{t+1})$ as the target. The target of $n$-step backups is the $n$-step return, which is truncated after $n$ steps, and the missing rewards thereafter are corrected by $V_t(S_{t+n})$.

$$
G^h_t(c) = R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + \cdots + \gamma^{n-1} R_h + \gamma^n c
$$

Here, $c$ is the correction term. In TD prediction, we use $c = V_t(S_{t+n})$.

The $n$-step backup applied to state $S_t$ at time $t$ produces the following increment to the estimated value $V(S_t)$.

$$
\Delta_t(S_t) = \alpha \left[ G^{t+n}_t(V_t(S_{t+n})) - V_t(S_t) \right]
$$

By the error reduction property, it is guaranteed that the worst error of the new estimate using $n$-step returns is less than or equal to $\gamma^n$ times the worst error of the current estimate $V$.

---

### The Forward View of TD($\lambda$)

The TD($\lambda$) algorithm can be understood as one particular way of averaging all $n$-step backups.

In $\lambda$-returns, TD($\lambda$) uses the $\lambda$-return $L_t$ as the target, which is the sum of all $n$-step returns weighted proportionally to $\lambda \in [0, 1]$.

$$
L_t = (1 - \lambda) \sum_{n=1}^\infty \lambda^{n-1} G^{t+n}_t(V_t(S_{t+n}))
$$

The 1-step return is given the largest weight $(1-\lambda)$, and the weight decreases proportionally to $\lambda^{n-1}$ as $n$ increases.

When $\lambda = 0$, it reduces to the 1-step return $G^{t+1}_t(V_t(S_{t+1}))$, which is equivalent to TD(0). When $\lambda = 1$, it is equivalent to the MC algorithm.

The $\lambda$-return algorithm performs backups using the $\lambda$-return as the target. The increment to the value of the visited state $S_t$ at each step $t$ is as follows.

$$
\Delta_t(S_t) = \alpha \left[ L_t - V_t(S_t) \right]
$$

---

### The Backward View of TD($\lambda$)

The backward view provides a causal, incremental mechanism that approximates the forward view.

Each state $s$ has an additional memory variable associated with it called an eligibility trace $E_t(s) \in \mathbb{R}^+$. The eligibility trace maintains a record of how recently the state has been visited in terms of $\gamma\lambda$.

The trace of all states that were not visited is decayed by $\gamma\lambda$.

$$
E_t(s) = \gamma\lambda E_{t-1}(s)
$$

The trace of the currently visited state $S_t$ is incremented by 1 after being decayed.

$$
E_t(S_t) = \gamma\lambda E_{t-1}(S_t) + 1
$$

The TD error $\delta_t$ serves as the reinforcement signal for learning.

$$
\delta_t = R_{t+1} + \gamma V_t(S_{t+1}) - V_t(S_t)
$$

In the backward view, this global TD error signal triggers proportional updates to the values of all states whose traces are nonzero.

$$
\Delta V_t(s) = \alpha \delta_t E_t(s)
$$

---

### Equivalences of Forward and Backward Views

A key equivalence is that at $\lambda = 0$, 1-step methods and all $\lambda$-based methods are equivalent, because in this case all backup targets are identical. Offline $\text{TD}(\lambda)$ and $\text{constant-}\alpha \text{ MC}$ methods are equivalent when $\lambda=1$.

#### True Online TD($\lambda$)

For online methods, the $\lambda$-return algorithm and $\text{TD}(\lambda)$ are generally not exactly equivalent. It is defined through a complex value function update.

$$
\begin{aligned}
&V_{t+1}(s) = V_t(s) + \alpha \left[ \delta_t + V_t(S_t) - V_{t-1}(S_t) \right] E_t(s) \\
&- \alpha I_{s S_t} \left[ V_t(S_t) - V_{t-1}(S_t) \right]
\end{aligned}
$$

True Online TD($\lambda$) showed slightly better performance compared to other online methods, or at least similar performance to $\text{TD}(\lambda)$ using Dutch traces.

---

### Sarsa($\lambda$)

Eligibility traces can be used not only for prediction as in $\text{TD}(\lambda)$, but also for control, where we learn action values $Q_t(s, a)$ instead of state values $V_t(s)$. Sarsa($\lambda$) is an on-policy TD control method that combines eligibility traces with Sarsa.

The trace can be accumulating, replacing, or Dutch trace, and is updated identically to $\text{TD}(\lambda)$ except that it is activated on visits to state-action pairs $(S_t, A_t)$ rather than states $S_t$. We substitute $Q_t(s, a)$ for $V_t(s)$ and $E_t(s, a)$ for $E_t(s)$.

$$
Q_{t+1}(s, a) = Q_t(s, a) + \alpha \delta_t E_t(s, a)
$$

---

### Watkins's Q($\lambda$)

Watkins's $\mathbf{Q(\lambda)}$ differs from $\text{TD}(\lambda)$ and $\text{Sarsa}(\lambda)$ because of this off-policy characteristic. It cuts off the trace and uses experience only until the next exploratory (nongreedy) action occurs.

If $A_{t+n}$ is the first exploratory (nongreedy) action, then the longest backup is corrected using $\gamma^n \max_a Q(S_{t+n}, a)$ instead of $\gamma^n Q(S_{t+n}, A_{t+n})$ in the $n$-step return.

$$
R_{t+1} + \gamma R_{t+2} + \cdots + \gamma^{n-1} R_{t+n} + \gamma^n \max_a Q_t(S_{t+n}, a)
$$

This is implemented by setting the eligibility trace to 0 whenever an exploratory action occurs.

$$
E_t(s, a) = \begin{cases} \gamma\lambda E_{t-1}(s, a) + I_{s S_t} \cdot I_{a A_t} \\ I_{s S_t} \cdot I_{a A_t}\end{cases}
$$

---

### References

[Original source #1](https://web.stanford.edu/class/psych209/Readings/SuttonBartoIPRLBook2ndEd.pdf?utm_source=chatgpt.com)

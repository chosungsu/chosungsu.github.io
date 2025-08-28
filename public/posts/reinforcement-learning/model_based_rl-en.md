---
title: 'Model based RL'
date: '2025-03-28'
tags: ['reinforcement learning', 'lecture']
---

### Advantages and Disadvantages of Model based RL

→ Advantages:

Efficient model learning is possible, and we can reason about uncertainty.

→ Disadvantages:

We must first learn a model and then construct a value function, which introduces two sources of approximation error.

#### What is a model

A model $M$ is a representation of an MDP $\langle S, A, P, R\rangle$ parameterized by $\eta$. Assuming the state and action spaces are known, the model $M=\langle P_{\eta}, R_{\eta}\rangle$ represents the state transition $P_{\eta} \sim P$ and the reward $R_{\eta} \sim R$.

$$
S_{t+1} \sim P_{\eta}(S_{t+1}\mid S_t, A_t), \\
R_{t+1} = R_{\eta}(R_{t+1}\mid S_t, A_t)
$$

Typically, we assume conditional independence between state transitions and rewards:

$$
P[S_{t+1}, R_{t+1}\mid S_t, A_t]=P[S_{t+1}\mid S_t, A_t] \, P[R_{t+1}\mid S_t, A_t]
$$

We estimate the model $M_{\eta}$ from experience $\{S_1, A_1, R_2, \dots, S_T\}$. Learning $(s,a) \to r$ is a regression problem, while learning $(s,a) \to s'$ is a density estimation problem.

---

### Simulation based search

Forward search constructs a search tree rooted at the current state $s_t$ and rolls forward using the MDP model. Simulation-based search uses the model to simulate episodes starting from the current state. It simulates $K$ episodes $\{s_t^k, A_t^k, R_{t+1}^k, \dots, S_T^k\}_{k=1}^K$ and explores using model-free RL methods such as MC and TD.

#### MC Tree search

Given a model $M_{\eta}$, we simulate $K$ episodes from the current state $s_t$ using the current simulation policy $\pi$. We build a search tree containing the visited states and actions and evaluate $Q(s,a)$ as follows:

$$
Q(s,a)=\frac{1}{N(s,a)} \sum_{k=1}^{K} \sum_{u=t}^{T} \mathbf{1}(S_u^k, A_u^k=s,a)\,G_u^k \;\Rightarrow\; q^{\pi}(s,a)
$$

We then select the action with the highest current value.

Advantages of MC tree search include best-first exploration and dynamic state evaluation. It overcomes the curse of dimensionality via sampling and is amenable to parallelization.

---

### Exploration vs Exploitation dilemma

In online decision-making, we must balance exploitation—making the best decision based on current information—and exploration—gathering more information.

---

### Multi armed bandit

A multi-armed bandit is defined by the tuple $\langle A, R\rangle$. Here, $A$ is a known set of $m$ actions, and $R^a(r) = P[r\mid a]$ is an unknown reward distribution. At each time step $t$, the agent chooses an action and the environment generates a reward $r_t \sim R^{a_t}$. The goal is to maximize cumulative reward $\sum_{\tau=1}^t r_{\tau}$.

#### Regret

The action value is the mean reward for action $a$, denoted $Q(a)=\mathbb{E}[r\mid a]$. The optimal value is $V^* = Q(a^*) = \max_{a \in A} Q(a)$. Regret is the one-step opportunity loss, denoted $\ell_t = \mathbb{E}[V^* - Q(a_t)]$. Maximizing cumulative reward minimizes total regret.

#### Lower bound

This is determined by the similarity between the optimal arm and the other arms. It is formally characterized by the gap $\Delta_a$ and the similarity of the distributions $\mathrm{KL}(R_a\Vert R_{a^*})$. The asymptotic total regret is at least logarithmic in the number of steps $t$.

#### Upper confidence bounds

$$
a_t=\operatorname*{argmax}_{a \in A} \hat{Q}_t(a)+\hat{U}_t(a)
$$

We estimate an upper confidence bound $\hat{U}_t(a)$ for each action value. With high probability, $Q(a) \le \hat{Q}_t(a) + \hat{U}_t(a)$. When $N_t(a)$ is small, the estimate is more uncertain, so $\hat{U}_t(a)$ becomes larger.

#### Hoeffding's Inequality

Let $X_1, \dots, X_t$ be i.i.d. random variables in the range $[0,1]$. If the sample mean is $\bar{X}_t=\frac{1}{t} \sum_{\tau=1}^{t} X_{\tau}$, then $P(\mathbb{E}[X] > \bar{X}_t + u) \le e^{-2tu^2}$. Applying this inequality to the reward when choosing action $a$ gives:

$$
P\big(Q(a) > \hat{Q}_t(a) + U_t(a)\big) \le e^{-2N_t(a)U_t(a)^2}
$$

#### Calculate UCB

If the probability of exceeding the UCB is $p$, from the above we have $e^{-2N_t(a)U_t(a)^2}=p$, so $U_t(a)=\sqrt{\frac{-\log(p)}{2N_t(a)}}$. As we observe more rewards, $p$ decreases; a common choice at time $t$ is $U_t(a)=\sqrt{\frac{2\log(t)}{N_t(a)}}$.

#### Probability Matching

$$
\pi(a\mid h_t)=P\big(Q(a) > Q(a')\big)
$$

Probability matching selects actions in proportion to the probability that action $a$ is optimal. Uncertain actions have a higher chance of being the maximum; it tends to be optimistic about uncertainty, though analytical computation from the posterior can be difficult.

#### Thompson Sampling

Thompson sampling implements probability matching by using Bayes' rule to compute the posterior $p[R\mid h_t]$ and sampling a reward distribution $R$ from it. It then computes the action value $Q(a)=\mathbb{E}[R^a]$ and selects the action that maximizes value under the sample.

#### Value of Information

Exploration is useful and quantifiable for obtaining information. In uncertain situations, the information gain is high, so it is desirable to explore such situations.

---

### Contextual Bandits

Contextual bandits are defined by the tuple $\langle A, S, R\rangle$.

#### Linear Regression

The action-value function is the expected reward for state $s$ and action $a$, denoted $Q(s,a)=\mathbb{E}[r\mid s,a]$. We estimate it with linear function approximation: $Q_{\theta}(s,a)= \phi(s,a)^T \theta \approx Q(s,a)$.

In LinUCB, least-squares regression estimates the mean action-value $Q_{\theta}(s,a)$ and its uncertainty (variance) $\sigma^2_{\theta}(s,a)$. The covariance is $A^{-1}$; since the action-value is linear, the variance is quadratic: $\sigma^2_{\theta}(s,a)=\phi(s,a)^T A^{-1} \phi(s,a)$.

$$
Q_{\theta}(s,a)+c\sqrt{\phi(s,a)^T A^{-1} \phi(s,a)}
$$

Thus, the upper confidence bound is as above. We select the action that maximizes the upper confidence bound.

---

### References

[Original Source #1](https://davidstarsilver.wordpress.com/wp-content/uploads/2025/04/lecture-9-exploration-and-exploitation.pdf)



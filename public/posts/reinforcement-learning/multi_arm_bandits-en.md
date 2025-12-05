---
title: 'Multi arm Bandits'
date: '2025-03-05'
tags: ['reinforcement learning', 'lecture']
---

### n-Armed Bandit Problem

The learner must repeatedly choose among $n$ different options (actions). After each choice, it receives a numerical reward drawn from a stationary probability distribution that depends on the action selected.

The objective is to maximize the expected total reward over some time period.

Each action $a$ has an expected or mean reward given that action is selected. This is called the value of the action, and the true value of action $a$ is $q(a)$.

---

### Action-Value Methods

Action-value methods are simple ways of estimating the values of actions and using those estimates to make action selection decisions.

#### Estimating Action Values

We distinguish between the true value of action $a$, $q(a)$, and the estimated value at the $t$th time step, $Q_t(a)$. If action $a$ has been selected $N_t(a)$ times prior to time $t$, and the rewards received were $R_1, R_2, \dots, R_{N_t(a)}$, then the estimated value is the average of the rewards actually received.

$$
Q_t(a) = \frac{R_1 + R_2 + \cdots + R_{N_t(a)}}{N_t(a)}
$$

As $N_t(a) \to \infty$, by the law of large numbers, $Q_t(a)$ converges to $q(a)$.

#### Action Selection Rules

Greedy action selection always selects the action with the highest estimated value:

$$
A_t = \underset{a}{\operatorname{argmax}} Q_t(a)
$$

This method exploits current knowledge to maximize immediate reward, but it explores none at all.

$\epsilon$-Greedy Methods behave greedily most of the time, but with small probability $\epsilon$ they select randomly from among all actions. This ensures that all actions are sampled infinitely often as time goes to infinity, so that all $Q_t(a)$ converge to $q(a)$. This results in the probability of selecting the optimal action converging to greater than $1 - \epsilon$.

---

### Incremental Implementation

Computing the sample average of rewards above requires memory and computational requirements that grow unboundedly over time. This inefficiency can be resolved using an incremental update formula.

Let $R_k$ denote the $k$th reward for some action, and let $Q_k$ denote the average estimate after $k-1$ rewards. The new average $Q_{k+1}$ after the $k$th reward is computed as:

$$
Q_{k+1} = Q_k + \frac{1}{k} \left[ R_k - Q_k \right]
$$

---

### Tracking a Nonstationary Problem

The sample-average method is suitable for stationary environments, that is, environments in which action values do not change over time. However, it is not appropriate for nonstationary environments in which action values change.

#### Constant Step-Size

The most common way of doing this is to use a constant step-size parameter $\alpha \in (0, 1]$:

$$
Q_{k+1} = Q_k + \alpha \left[ R_k - Q_k \right]
$$

This formula makes $Q_{k+1}$ a weighted average of past rewards and the initial estimate $Q_1$:

$$
Q_{k+1} = \sum_{i=1}^{k} \alpha(1 - \alpha)^{k-i} R_i + (1 - \alpha)^{k} Q_1
$$

Since $(1 - \alpha) < 1$, the weight given to past rewards decreases exponentially.

#### Convergence Conditions

The step-size parameter $\alpha_k(a)$ can be made different for each step. Choosing $\alpha_k(a) = \frac{1}{k}$ yields the sample-average method, which is guaranteed to converge to the true action values by the law of large numbers. According to general stochastic approximation theory, to guarantee convergence, $\alpha_k(a)$ must satisfy the following two conditions:

$$
\begin{aligned}
&\sum_{k=1}^{\infty} \alpha_k(a) = \infty, \\
&\sum_{k=1}^{\infty} \alpha^2_k(a) < \infty
\end{aligned}
$$

The first condition is required to guarantee that the steps are large enough to eventually overcome any initial conditions or random fluctuations. The second condition guarantees that eventually the steps become small enough to assure convergence.

---

### Upper-Confidence-Bound Action Selection, UCB

Exploration is needed because of uncertainty in the action-value estimates. While $\epsilon$-greedy action selection treats non-greedy actions indiscriminately, the UCB method selects non-greedy actions in a more sophisticated way, taking into account how close their estimates are to being maximal.

$$
A_t = \underset{a}{\operatorname{argmax}} \left[ Q_t(a) + c \sqrt{\frac{\ln t}{N_t(a)}} \right]
$$

The key idea behind UCB action selection is as follows:

The quantity $\left[ Q_t(a) + c \sqrt{\frac{\ln t}{N_t(a)}} \right]$ being maximized is an upper bound on the possible true value of action $a$. The higher $Q_t(a)$ is, the more likely it is to be selected. The square-root term is a measure of uncertainty; the smaller $N_t(a)$ is (the less often the action has been selected), the larger the denominator becomes, making the uncertainty term larger.

#### Gradient Bandits

We consider learning a numerical preference $H_t(a)$ for each action $a$. The preferences themselves are not interpreted as rewards; only the relative preference of one action over another is important. The probability of selecting an action is determined according to a soft-max distribution:

$$
\Pr\{A_t = a\} = \frac{e^{H_t(a)}}{\sum_{b=1}^{n} e^{H_t(b)}} = \pi_t(a)
$$

If the reward is higher than the baseline, then the probability of selecting $A_t$ is increased. If all rewards are positive, the probabilities of all actions increase, which can lead to significant performance degradation.

#### Contextual Bandits

If each time a bandit task is selected, a distinct clue is given about the identity of the task, then a policy can be learned that associates optimal actions to be taken with each situation.

---

### References

[Original source #1](https://web.stanford.edu/class/psych209/Readings/SuttonBartoIPRLBook2ndEd.pdf?utm_source=chatgpt.com)

---
title: 'Approximate solution methods'
date: '2025-03-28'
tags: ['reinforcement learning', 'lecture']
---

### Value Prediction with Function Approximation

When using function approximation, the approximate value function $\hat{v}(s, \mathbf{w}) \approx v_{\pi}(s)$ is a function form expressed by a parameter vector $\mathbf{w} \in \mathbb{R}^n$ rather than a table.

The characteristics required when using function approximation in reinforcement learning are the ability to efficiently learn online from data acquired incrementally during interaction with the environment or with a model, and the ability to handle nonstationarity where the target function changes over time.

---

### Gradient-Descent Methods

Gradient descent is used when the parameter vector $\mathbf{w}$ is a column vector with a fixed number of real components $\mathbf{w} = (w_1, w_2, \ldots, w_n)^T$, and the approximate value function $\hat{v}(s, \mathbf{w})$ is a smooth differentiable function with respect to $\mathbf{w}$.

After each training example $S_t \mapsto v_{\pi}(S_t)$ is observed, $\mathbf{w}$ is adjusted in the direction that most reduces the squared error for that example.

$$
\mathbf{w}_{t+1} = \mathbf{w}_t + \alpha \left[ v_{\pi}(S_t) - \hat{v}(S_t, \mathbf{w}_t) \right] \nabla \hat{v}(S_t, \mathbf{w}_t)
$$

When the target output $V_t$ is an approximation of the true value $v_{\pi}(S_t)$, we use general gradient descent by substituting $V_t$ for $v_{\pi}(S_t)$.

$$
\mathbf{w}_{t+1} = \mathbf{w}_t + \alpha \left[ V_t - \hat{v}(S_t, \mathbf{w}_t) \right] \nabla \hat{v}(S_t, \mathbf{w}_t)
$$

In gradient-descent TD($\lambda$), we use the $\lambda$-return $V_t = G_t^\lambda$. When $\lambda < 1$, $G_t^\lambda$ is not an unbiased estimator, so convergence is not guaranteed, but it is effective.

---

### Linear Methods

Linear methods are an important special case where the approximation function $\hat{v}$ is a linear function of the parameter vector $\mathbf{w}$. For every state $s$, there is a feature vector $\mathbf{x}(s) = (x_1(s), x_2(s), \ldots, x_n(s))^T$ with the same number of components as $\mathbf{w}$.

$$
\hat{v}(s, \mathbf{w}) = \mathbf{w}^T \mathbf{x}(s) = \sum_{i=1}^n w_i x_i(s)
$$

In the linear case, the gradient of $\hat{v}(s, \mathbf{w})$ is very simple.

$$
\nabla \hat{v}(s, \mathbf{w}) = \mathbf{x}(s)
$$

Linear methods reach the optimal solution when convergence is guaranteed, because in the linear case, local optima are global optima. Linear gradient-descent $\text{TD}(\lambda)$ algorithms have been proven to converge when $\alpha$ is appropriately decreased.

---

### Control with Function Approximation

Extending state-value prediction to action-value prediction is straightforward. The approximate action-value function $\hat{q} \approx q_{\pi}$ is expressed by a parameter vector $\mathbf{w}$.

For examples of the form $S_t, A_t \mapsto Q_t$, any approximation of $q_{\pi}(S_t, A_t)$ can be $R_{t+1} + \gamma \hat{q}(S_{t+1}, A_{t+1}, \mathbf{w}_t)$.

#### Bootstrap

When using function approximation, non-bootstrapping methods ($\lambda=1$) are more stable and achieve lower asymptotic error under broader conditions than bootstrapping methods ($\lambda<1$). Nevertheless, in empirical comparisons, bootstrapping methods are observed to perform much better than non-bootstrapping methods.

---

### Actor-Critic Methods

Actor-Critic (AC) methods use an Actor that explicitly represents the policy to select actions, and a Critic, which is an estimated value function, to critique the actions performed by the actor.

AC methods always perform on-policy learning. The critic must learn and critique the policy that the actor is currently following. The critique appears in the form of TD error $\delta_t$.

$$
\delta_t = R_{t+1} + \gamma V(S_{t+1}) - V(S_t)
$$

AC methods have two main advantages compared to methods that infer policies from action-value functions, such as Q-learning or Sarsa. Even when the number of possible actions is infinite, such as in continuous action spaces, if the policy is explicitly stored, extensive computation may not be needed each time to select an action. The optimal probability of selecting various actions can be explicitly learned. This is useful in competitive situations or non-Markovian situations.

#### Eligibility Traces

Since it is on-policy learning for policy $\pi$, the $\text{TD}(\lambda)$ algorithm can be used, requiring one trace for each state. And one trace is needed for each state-action pair. Therefore, $\text{AC}$ methods require two sets of traces.

The actor of AC methods is updated as

$$
H_{t+1}(s, a) = H_t(s, a) + \alpha \delta_t E_t(s, a)
$$

where $E_t(s, a)$ is the trace for state-action pair $s, a$.

#### R-Learning and the Average-Reward Setting

When using function approximation or in continuing tasks that cannot be divided into episodes, the discounted-reward setting is generally abandoned and replaced with the average-reward setting. In this setting, the goal is to maximize the average reward per time step $\bar{r}(\pi)$.

$$
\bar{r}(\pi) = \lim_{n \to \infty} \frac{1}{n} \sum_{t=1}^n \mathbb{E}_{\pi}[R_t]
$$

The value of a state is defined relative to this average reward $\bar{r}(\pi)$ and represents transient reward differences.

$$
v_{\pi}(s) = \sum_{k=1}^\infty \mathbb{E}_{\pi}[R_{t+k} - \bar{r}(\pi) | S_t =s]
$$

R-learning is an off-policy control method for the average-reward setting, a standard TD control method similar to Q-learning. It maintains a behavior policy and an estimated policy, an action-value function, and an estimated average reward, and learns with respect to $R_{t+1} - \bar{R}$ rather than reward $R_{t+1}$, and also updates $\bar{R}$.

---

### References

[Original source #1](https://web.stanford.edu/class/psych209/Readings/SuttonBartoIPRLBook2ndEd.pdf?utm_source=chatgpt.com)

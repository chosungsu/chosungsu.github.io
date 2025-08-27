---
title: 'Value Function Approximation'
date: '2025-03-21'
tags: ['cs234', 'lecture']
---

### Incremental Methods

#### Gradient Descent

Let $J(\mathbf{w})$ be a differentiable function with respect to the parameter vector $\mathbf{w}$. The gradient of $J(\mathbf{w})$ is defined as

$$
\nabla_w J(w)=\begin{pmatrix}
\frac{\partial J(w)}{\partial w_1} \\
\vdots \\
\frac{\partial J(w)}{\partial w_n}
\end{pmatrix}
$$

To find a local minimum of $J$, we adjust $w$ in the direction of the negative gradient.

#### Stochastic Gradient Descent

The goal is to find parameters $w$ that minimize the mean squared error (MSE) between the approximate value function $\hat{v}(S, \mathbf{w})$ and the true value function $v_{\pi}(S)$.

$$
J(w)=\mathbb{E}_{\pi}[(v_{\pi}(S)-\hat{v}(S, w))^2], \\
\Delta w = -\frac{1}{2}\alpha \, \nabla_w J(w) \\
= \alpha \, \mathbb{E}_{\pi}[(v_{\pi}(S)-\hat{v}(S,w))\,\nabla_w \, \hat{v}(S,w)]
$$

Stochastic gradient descent estimates the gradient using samples.

#### Linear Value

Represent the value function as a linear combination of features.

$$
\hat{v}(S, w)=X(S)^T w=\sum_{j=1}^{n} x_j(S)\, w_j
$$

The objective is quadratic and stochastic gradient descent converges to the global optimum. Since $\nabla_w \hat{v}(S,w)=X(S)$, the update is $\Delta w=\alpha\,(v_{\pi}(S)-\hat{v}(S,w))\,X(S)$, i.e., proportional to the step size, prediction error, and feature values.

#### Monte-Carlo with Value Function Approximation

The return $G_t$ is an unbiased but noisy sample of the true value $v_\pi(S_t)$. Therefore, we can apply supervised learning to the training data $\{\langle S_1, G_1\rangle, \langle S_2, G_2\rangle, \dots, \langle S_T, G_T\rangle\}$.

$$
\Delta w = \alpha\,(G_t-\hat{v}(S_t,w))\,\nabla_w \hat{v}(S_t,w)
$$

Thus, MC evaluation converges to a local optimum.

#### TD Learning with Value Function Approximation

The TD target $R_{t+1} + \gamma\,\hat{v}(S_{t+1}, \mathbf{w})$ is a biased sample of the true value $v_\pi(S_t)$. Still, we can apply supervised learning to the training data $\{\langle S_1, R_2 + \gamma\hat{v}(S_2, \mathbf{w})\rangle, \dots, \langle S_{T-1}, R_T\rangle\}$.

$$
\Delta w=\alpha\,(R+\gamma \, \hat{v}(S',w)-\hat{v}(S,w))\,\nabla_w \hat{v}(S,w)=\alpha\, \delta\, X(S)
$$

In this way, linear TD(0) converges to the global optimum.

---

### Batch Methods

Gradient descent is simple and attractive, but it is not sample-efficient. Batch methods aim to find the best-fitting value function given an agent’s experience.

#### Least Squares Prediction

$$
\text{LS}(w)=\sum_{t=1}^T\big(v_t^{\pi} - \hat{v}(s_t,w)\big)^2
$$

Given a value function approximation $\hat{v}(s, \mathbf{w}) \approx v_\pi(s)$ and experience $D = \{ \langle s_1, v^\pi_1 \rangle, \langle s_2, v^\pi_2 \rangle, \dots, \langle s_T, v^\pi_T \rangle \}$ consisting of state–value pairs, the least-squares algorithm finds parameters $w$ that minimize the sum of squared errors between $\hat{v}(s_t, \mathbf{w})$ and the target values $v_t^{\pi}$.

#### Experience Replay in Deep Q-Networks (DQN)

DQN uses experience replay and fixed Q-targets. Following a greedy policy, the agent takes action $a_t$ and stores the transition $(s_t, a_t, r_{t+1}, s_{t+1})$ in replay memory. It then samples random mini-batches of transitions from $D$ to compute the Q-learning target using fixed parameters $\mathbf{w}^-$. 

#### Least Squares Q-Learning

$$
\delta = R_{t+1}+\gamma \, \hat{q} (S_{t+1}, \pi(S_{t+1}), w)-\hat{q}(S_t, A_t, w), \\
\Delta w=\alpha \, \delta \, X(S_t,A_t)
$$

This yields the linear Q-learning update.

---

### References

[Original Source #1](https://davidstarsilver.wordpress.com/wp-content/uploads/2025/04/lecture-6-value-function-approximation-.pdf)



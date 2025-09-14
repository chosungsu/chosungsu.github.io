---
title: 'Policy gradient'
date: '2025-03-24'
tags: ['reinforcement learning', 'lecture']
---

### Computing Gradients By Finite Differences

To evaluate the policy gradient of policy $\pi_\theta(s, a)$, we estimate the $k$-th partial derivative of the objective function $J(\theta)$ with respect to $\theta$ for each dimension $k \in [1, n]$. To do this, we perturb $\theta$ by a small value $\epsilon$ in the $k$-th dimension.

$$
\frac{\partial J(\theta)}{\partial \theta_k} \sim \frac{J(\theta + \epsilon u_k)-J(\theta)}{\epsilon}
$$

Here, $u_k$ is a unit vector where only the $k$-th component is 1 and the rest are 0.

---

### Score Function

Assuming that policy $\pi_{\theta}$ is differentiable where it is non-zero and we know the gradient $\nabla_\theta\pi_\theta(s, a)$, likelihood ratios utilize the following identity:

$$
\nabla_{\theta} \pi_{\theta}(s,a) \\
=\pi_{\theta}(s,a)\frac{\nabla_{\theta}\pi_{\theta}(s,a)}{\pi_{\theta}(s,a)} \\
=\pi_{\theta}(s,a)\,\nabla_{\theta}\log\pi_{\theta}(s,a)
$$

At this time, the score function is $\nabla_\theta\log\pi_\theta(s, a)$.

---

### Policy

#### 1. Softmax Policy

We weight actions using a linear combination of features $\Phi(s,a)^T$. The probability of an action is proportional to its exponential weight.

$$
\pi_{\theta}(s,a) \propto e^{\Phi(s,a)^T \theta}
$$

The score function is as follows:

$$
\nabla_{\theta} \log\pi_{\theta}(s,a)=\Phi(s,a)-\mathbb{E}_{\pi_{\theta}}[\Phi(s,\cdot)]
$$

#### 2. Gaussian Policy

$$
\mu(s)=\Phi(s)^{T}\theta
$$

For continuous action spaces, Gaussian policies are natural, where the mean is a linear combination of state features. The variance can be fixed or parameterized.

---

### One-Step MDPs

$$
J(\theta)=\mathbb{E}_{\pi_{\theta}}[r] \\
= \sum_{s \in S} d(s) \sum_{a \in A} \pi_{\theta}(s,a)R_{s,a} \\
\Rightarrow
\nabla_{\theta} J(\theta)=\mathbb{E}_{\pi_{\theta}}[\nabla_{\theta}\log\pi_{\theta}(s,a)\,r]
$$

Considering one-step MDPs, the state starts at $s \sim d(s)$ and the episode ends after one step with reward $r = R_{s,a}$. We compute the gradient using likelihood.

---

### Policy Gradient Theorem

The policy gradient theorem generalizes the likelihood ratio approach to multi-step MDPs. This theorem replaces the immediate reward $r$ with the long-term value, the action-value function $Q^{\pi_\theta}(s, a)$.

$$
\nabla_{\theta} J(\theta)=\mathbb{E}_{\pi_{\theta}}[\nabla_{\theta} \log \pi_{\theta}(s,a) \, Q^{\pi_{\theta}}(s,a)]
$$

For any differentiable policy $\pi_\theta(s, a)$, the policy objective function $J$ is defined as above.

---

### Reducing Variance Using a Critic

MC policy gradient methods still have high variance. At this time, we use a critic to estimate the action-value function as follows:

$$
Q_{w}(s,a) \sim Q^{\pi_{\theta}}(s,a)
$$

Actor-critic algorithms update the parameters $w$ of the action-value function and update $\theta$ in the direction suggested by the critic.

---

### Estimating the Advantage Function

The advantage function can significantly reduce the variance of policy gradients, and the critic must estimate the actual function. For example:

$$
V_v(s) \sim V^{\pi_{\theta}}(s), \\
Q_w(s,a) \sim Q^{\pi_{\theta}}(s,a)
$$

Here we update as $A(s,a)=Q_w(s,a)-V_v(s)$.

The TD error $\delta^{\pi_\theta} = r + \gamma V^{\pi_\theta}(s') - V^{\pi_\theta}(s)$ with respect to the true value function $V^{\pi_\theta}(s)$ is an unbiased estimate of the advantage function. We can compute the policy gradient through $\nabla_{\theta} J(\theta)=\mathbb{E}_{\pi_{\theta}}[\nabla_{\theta} \log \pi_{\theta}(s,a) \,\delta^{\pi_{\theta}}]$.

---

### Critics at Different Time-Scales

The critic can estimate the value function $V_\theta(s)$ from targets at various time scales.

$\rightarrow$ For MC, the target is the return $v_t$, so we compute $\Delta \theta = \alpha (v_t-V_{\theta}(s)) \phi(s)$.

$\rightarrow$ TD(0) has target $r + \gamma V(s')$, so we compute $\Delta \theta = \alpha (r + \gamma V(s')-V_{\theta}(s))\phi(s)$.

$\rightarrow$ Forward TD$(\lambda)$ has target $\lambda$ return $v_t^{\lambda}$. Therefore, we compute $\Delta \theta = \alpha(v_t^{\lambda}-V_{\theta}(s))\phi(s)$.

$\rightarrow$ Backward TD$(\lambda)$ uses eligibility traces. Therefore, we compute $\Delta \theta=\alpha \delta_t e_t$.

MC policy gradient uses error from the complete return $v_t$, while Actor-Critic policy gradient estimates using one-step TD error $r + \gamma V_v(s_{t+1})$.

---

### References

[Original Source #1](https://davidstarsilver.wordpress.com/wp-content/uploads/2025/04/lecture-7-policy-gradient-methods.pdf)



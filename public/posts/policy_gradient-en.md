---
title: 'Policy gradient'
date: '2025-03-17'
tags: ['cs234', 'lecture']
---

### value-based vs policy-based

Value-based RL, which learns value functions like $Q$ functions or $V$ functions, has the characteristic that policies are implicitly derived from them, such as $\epsilon$-greedy.

Policy-based RL directly parameterizes and learns the policy $(\pi_{\theta}(s,a))$ and has the characteristic of finding policies that have the highest value function.

Actor-critic is a method that learns and maintains both of these.

#### policy-based optimization

It is said that gradient-free optimization methods can be used. Hill climbing, simplex, etc. are applicable even when differentiation is impossible and have the advantage of easy parallelization, but have disadvantages of low sample efficiency and ignoring temporal structure.

Alternatively, using gradients is said to be more efficient. Gradient descent, conjugate gradient, quasi-Newton, etc. fall into this category.

---

### policy gradient

Policy gradient algorithms use the gradient of the value function $V(s_0, \theta)$ with respect to the policy $(\theta)$ to find a local maximum. Updates are made in the form $\Delta\theta = \alpha \nabla_\theta V(s_0, \theta)$. Here, $\nabla_\theta V(s_0, \theta)$ corresponds to the policy gradient. And $\alpha$ corresponds to the step size parameter.

---

### score functions

The score function is computed as $\nabla_{\theta} log \pi(s;\theta)$, and in softmax policy, linear combinations of features $\phi(s, a)$ are used to weight actions, and their probabilities are proportional to the exponential function of the weights. The policy is defined as $\pi_\theta(s, a) = e^{\phi(s,a)^T \theta} / (\sum_{a'} e^{\phi(s,a')^T \theta})$, and since the score function is the derivative of log probability with respect to parameters, it is computed as $\nabla_\theta \log \pi_\theta(s, a) = \phi(s, a) - E_{\pi_\theta}[\phi(s, \cdot)]$.

Gaussian policy is used in continuous action spaces, and $\mu(s)$ is defined as a linear combination of state features $\phi(s)$ as $\mu(s) = \phi(s)^T \theta$. And the score function is computed as $\nabla_\theta \log \pi_\theta(s, a) = \frac{(a - \mu(s))\phi(s)}{\sigma^2}$, which updates the gradient proportionally to how much the sampled action ($a$) deviates from the mean.

Finally, likelihood ratio finds the gradient of the value function $V(\theta)$ to optimize $\theta$ as $\underset{\theta}{\operatorname{argmax}} V(\theta) = \underset{\theta}{\operatorname{argmax}} \sum_{\tau} P(\tau; \theta)R(\tau)$. Here, $\tau$ represents state-action $(s_t, a_t, r_t,...)$ and represents the probability that $\tau$ occurs when following $\pi_{\theta}$.

$$
\nabla_\theta V(\theta) \approx \hat{g} \\
= (1/m) \sum_{i=1}^m R(\tau^{(i)})\nabla_\theta \log P(\tau^{(i)}; \theta) \\
= (1/m) \sum_{i=1}^m R(\tau^{(i)}) \sum_{t=0}^{T-1} \nabla_\theta \log \pi_\theta(a_t^{(i)}|s_t^{(i)})
$$

This formula can be approximated as an empirical approximation using $m$ samples $\tau$.

---

### policy gradient and reducing variance

#### 1. temporal structure

The initial policy gradient uses the total reward $R(\tau^{i})$ of $\tau^{i}$ and the expected value of the derivative of log probability.

$$
\nabla_\theta E_\tau [R] = E_\tau \left[ \left( \sum_{t=0}^{T-1} r_t \right) \left( \sum_{t=0}^{T-1} \nabla_\theta \log \pi_\theta(a_t|s_t) \right) \right]
$$

This formula is an unbiased estimator but can have very large variance. This is because all rewards of $\tau$ are multiplied by the derivative of log probability with respect to actions.

$$
V(\theta)=\nabla_\theta E[R] \\
= E \left[ \sum_{t=0}^{T-1} \nabla_\theta \log \pi_\theta(a_t, s_t) \sum_{t'=t}^{T-1} r_{t'} \right]
$$

The above formula is reconstructed using temporal structure to reduce variance. The difference from the previous formula is that the derivative of log probability with respect to actions at each time is multiplied by the total reward $G_t$ obtained after that point. This reconstruction reflects temporal causality that past actions affect rewards, but the value of current actions depends only on rewards to be obtained in the future.

$$
\nabla_\theta E[R] \approx (1/m) \sum_{i=1}^m \sum_{t=0}^{T-1} \nabla_\theta \log \pi_\theta(a_t^{(i)}, s_t^{(i)})G_t^{(i)}
$$

When approximated as an empirical estimator, it becomes like this.

#### 2. baseline

Introducing a baseline $b(s)$ to reduce variance was an important decision. This greatly improves stability without introducing bias to the estimator.

$$
\nabla_\theta E_\tau [R] = E_\tau \left[ \sum_{t=0}^{T-1} \nabla_\theta \log \pi(a_t|s_t; \theta) \left( \sum_{t'=t}^{T-1} r_{t'} - b(s_t) \right) \right]
$$

Here, $G_t-b(s_t)$ becomes the advantage estimate $\hat{A}_t$. If the total reward $G_t$ obtained is better than the expected reward $b(s_t)$, the probability of that action is increased, and vice versa.

#### 3. actor-critic methods

This is an algorithm that explicitly represents both policy and value function and updates them simultaneously. The critic estimates state-action values $Q$ or state values $V$. The actor learns and updates better policies, i.e., rules about what actions to take in what states, based on these estimates.

The goal is to maximize performance $V(\theta)$ by updating policy parameters $\theta$, and the critic can be constructed using combinations between temporal difference and Monte Carlo.

Monte Carlo return $\hat{R}_t^{\inf}$ represents the total discounted reward until the end of the episode as $r_t+\gamma r_{t+1}+ \gamma^2 r_{t+2} + ...$. It is an estimator with no bias but very high variance. Advantage estimates can be obtained by subtracting baseline $V(s_t)$ from these return estimates, and in infinite steps, they also have high variance and low bias.

---

### advanced policy gradients

#### 1. problems with policy gradient

When trying to solve the problem of optimizing $max_{\theta} J(\pi_{\theta})$ by performing stochastic gradient ascent, it is defined as the expected value of discounted rewards obtained over an infinitely long time according to the policy.

These gradient methods have poor sample efficiency problems, where data batches can be discarded immediately after one gradient, and since they are on-policy expectations, previous data can be discarded when learning with new data.

#### 2. policy performance bounds

To solve the problem of difficulty in setting appropriate step sizes in parameter space, policy space mathematically relates the performance difference between two policies $\pi$, $\pi'$.

$$
J(\pi')-J(\pi)=E_{\tau \sim \pi'} \left [\sum_{t=0}^{\infty} \gamma^t A^{\pi} (s_t, a_t) \right]
$$

The above formula was significant in that it defines the performance of the new policy $\pi'$ using the advantage function of the previous policy, but still has the limitation of requiring $\tau \sim \pi'$ sampled from that policy.

Using importance sampling, it can be reconstructed differently. This is a method to estimate expected values even when sampling distributions differ.

$$
J(\pi')-J(\pi)=\frac{1}{1-\gamma} \mathbb{E}_{s \sim d^{\pi'}, a \sim \pi'} [A^{\pi}(s,a)]
$$

But it still depends on the new policy and the estimator can have exploding or vanishing problems, so a method using KL-divergence was proposed.

$$
J(\pi')-J(\pi)=\frac{1}{1-\gamma} \mathbb{E}_{s \sim d^{\pi}, a \sim \pi} \left[\frac{\pi'(a|s)}{\pi(a|s)} A^{\pi}(s,a) \right]
$$

This approximated function has the advantage that it can be optimized from the previous policy, and research results have shown that it works quite well when the new policy is close.

#### 3. proximal policy optimization(ppo)

PPO approximately applies KL penalty to prevent policies from changing too much, improving stability.

$$
\theta_{k+1}=\underset{\theta}{\operatorname{argmax}} L_{\theta_k}(\theta)-\beta_k \bar{D_{kl}}(\theta|\theta_k)
$$

This penalty solves the unconstrained optimization problem and approximately enforces it by adjusting $\beta$.

The clipped objective clips the importance ratio to the range $[1-\epsilon, 1+\epsilon]$ to prevent policies from trying to deviate too far.

---

### imitation learning

#### 1. behavioral cloning

It reduces to a supervised learning problem using expert $(s, a)$ pairs to directly learn policies. There is a problem that errors can accumulate due to data distribution mismatch.

#### 2. Dagger

It was proposed to mitigate the cumulative errors of behavioral cloning. When the learned policy reaches a certain state, it asks the expert to label the correct action in that state and adds new data to the dataset for retraining. The disadvantage is that it requires feedback at every step.

#### 3. inverse RL

The goal is to infer the reward function $R$. Assuming it is a linear function like $R(s)=w^Tx(s)$, the policy can be expressed as $V^{\pi}(s_0)=E_{s \sim \pi} \left[\sum_{t=0}^{\infty} \gamma^t R(s_t)|s_0 \right]$.

The goal becomes finding a policy that matches the discounted cumulative feature expectation $\mu(\pi)(s)$ of the expert policy, and therefore the reward function should be inferred when $V^{\pi}(s_0)=w^T\mu(\pi)$ becomes $V^* \ge V^{\pi}$ as follows.

---

### references

[Original source #1](https://youtu.be/L6OVEmV3NcE?si=S7zhfOC4Kb181VrD)

[Original source #2](https://youtu.be/8PwvNQ5WS-o?si=Tk3k2b3r3FBUpvqt)

[Original source #3](https://youtu.be/4ngb0IZTg8I?si=M9NBRMaDEkTcsip4)




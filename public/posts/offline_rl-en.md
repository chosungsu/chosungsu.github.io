---
title: 'Offline RL'
date: '2025-03-21'
tags: ['cs234', 'lecture']
---

### counterfactual / batch RL

When given past data, it is important to answer questions about what the outcome would have been if different actions had been taken from my perspective. The previously learned $Q$ learning is an off-policy algorithm that can use $(s, a)$ pairs and other data, but can fail due to the deadly triad problem.

#### learn dynamics and reward models

By learning the reward model $\hat{r}(s,a)$ and dynamic model $\hat{p}(s'|s,a)$, when the policy is determined as $\pi_t(s_t) \rightarrow a_t$, the action $a_t$ is sent to the agent to execute. Based on the analytical solution of the Markov reward process Bellman equation $V=R+\gamma PV$, the value function of the dataset is computed as $V^{\pi} \approx (1-\gamma \hat{P}^{\pi})^{-1} \hat{R}^{\pi}$, and the state transition probability induced by the policy is computed as $P^{\pi}(s'|s)=p(s'|s, \pi(s))$.

This model-based approach can be data-efficient as it learns the data once and then uses it to optimize policies, making it useful for offline RL where data acquisition is difficult or expensive.

---

### model free

Offline batch policy aims to estimate the performance of a specific policy from a given fixed dataset.

#### 1. fitted Q evaluation

It directly learns the state-action value function $Q$ from collected experiences $(s, a, r, s')$ without explicitly building the environment's dynamic model or reward model.

$$
\widetilde{Q}^{\pi}(s_i, a_i)=r_i+\gamma V_{\theta}^{\pi}(s_{i+1}), \\
\underset{\theta}{\operatorname{argmin}} \sum_i (Q_{\theta}^{\pi}(s_i, a_i)-\widetilde{Q}^{\pi}(s_i, a_i))^2
$$

As shown in the above formula, updates are made to minimize so that the state-action value function approaches the target value.

It depends on the Markov assumption and bias can occur if the approximation does not accurately reflect the actual environment's value function.

#### 2. importance sampling

A technique to estimate expected values using samples drawn from different distributions. The expected value $E_{x \sim P}[f(x)]$ of function $f(x)$ for a specific distribution $P(x)$ is computed as $E_{x \sim Q}[\frac{P(x)}{Q(x)} f(x)]$ using samples $x$ drawn from the sampling distribution $Q(x)$. Here, $\frac{P(x)}{Q(x)}$ is called importance sampling. This is similar to Monte Carlo but corrects for distribution mismatch.

To become an unbiased estimator, the sampling distribution $q$ must be greater than 0 for all $x$ where the distribution $p$ to be evaluated is greater than 0. That is, $q(x) > 0$ must hold for all $x$ where $p(x) > 0$. This means that the behavior policy that collected the data must be able to visit all $(s,a)$ pairs that the policy to be evaluated can visit.

Importance sampling can be used without dynamic models and does not depend on the Markov assumption.

#### 3. reason for why batch RL is insufficient

Many batch RL baselines focus on penalties or constraints based on the distribution distance ($\text{dist}(\pi(a|s), \pi_b(a|s))$) between the policy to be evaluated ($\pi$) and the behavior policy that collected the data ($\pi_b$). These approaches can lead to problems where large action conditional probabilities lead to states with rare continuations. Since the model has not learned sufficient data, it may predict better rewards than reality, risking low performance in the actual environment.

---

### references

[Original source #1](https://youtu.be/F6APGIAm5fw?si=7HjhnByZLVsZveCl)



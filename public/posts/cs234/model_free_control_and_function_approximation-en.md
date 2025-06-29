---
title: 'Model free control and function approximation'
date: '2025-03-14'
tags: ['cs234', 'lecture']
---

### model free value function approximation

Unlike the previously used policy iteration (PI), in model-free environments, when the policy ($\pi$) is deterministic, there arises a problem that the state-action value function $Q(s,a)$ for actions not selected by the policy ($a \ne \pi(s)$) cannot be computed.

$\epsilon$-greedy policy selects greedy actions based on current state-action value function with probability $1-\epsilon+\frac{\epsilon}{|A|}$ when $|A|$ is the number of actions, and selects random actions uniformly with probability $\frac{\epsilon}{|A|}$ for non-greedy actions.

#### monte carlo

The goal is to find the optimal policy by directly estimating the state-action value function. Given $\pi$, create $k$ sample episodes. Update the return value $Q(s,a)$ when first visited.

As updates progress, use greedy policy $\pi_k=\epsilon-greedy(Q)$ and gradually decrease $\epsilon=1/k$.

#### td policy

Unlike Monte Carlo, it updates step by step without waiting for episode termination.

SARSA (State Action Reward State Action) is an on-policy algorithm that learns $Q$ of the current behavior policy ($\pi$) and updates as $Q(s_t,a_t) \leftarrow Q(s_t,a_t) + \alpha(r_t+\gamma Q(s_{t+1}, a_{t+1})-Q(s_t, a_t))$.

#### on and off policy

On-policy uses experiences obtained by following the current policy for evaluation. That is, the policy for selecting actions and the policy being learned are the same.

Off-policy uses experiences collected from policies different from the current policy for evaluation. It has the advantage of reusability as collected data can be utilized to learn new policies.

#### q learning

Unlike SARSA, it updates as $Q(s_t,a_t) \leftarrow Q(s_t,a_t)+\alpha((r_t+\gamma max_{a'} Q(s_{t+1}, a'))-Q(s_t,a_t))$, which means the action with the highest $Q$ in the next state $s_{t+1}$, and differs from the actual next action $a_{t+1}$.

---

### control using value function approximation

#### general value

In reinforcement learning, the agent's goal is to estimate the state-action value function $Q$ according to a specific policy $\pi$, which represents the total expected reward that can be obtained in the future when taking an action in a given state.

However, storing and learning individually for all possible pairs is inefficient, so Value Function Approximation (VFA) is used.

Instead of directly storing $Q^{\pi}(s,a)$, it estimates through an approximation function represented by parameters $w$.

- Function approximation: Possibility of errors occurring as information learned from specific pairs generalizes to other pairs
- Bootstrapping: Can speed up learning but if there are errors in estimates, those errors may continue to propagate
- Off-policy: Possibility of instability due to data distribution mismatch between behavior and target policies

When using value function approximation, the deadly triad can occur at the intersection of these three elements. The goal of value function approximation is to minimize the mean squared error (MSE) between the actual function and the approximation function. In $J(w) = E_\pi[(Q^\pi(s, a) - \hat{Q}^\pi(s, a; w))^2]$, SGD is used to update according to gradients to find optimal $w$.

#### deep q learning

In value function approximation, $Q$-learning can become unstable or diverge. VFA uses models like neural networks $\hat{Q}(s,a;w)$ for approximation, and the main causes of instability are as follows:

- Correlations between samples: Experiences $(s, a, r, s')$ obtained as the agent interacts are temporally sequential and have strong correlations. SGD assumes independent samples and optimizes, so learning highly correlated data continuously leads to inefficiency and instability.

- Non-stationary targets: The target is $r+\gamma \max_{a'} \hat{Q}(s', a';w)$ but this value depends on $w$. Since $w$ is continuously updated during learning, target values are not fixed, causing instability.

Therefore, DQN uses experience replay to remove correlations between samples and stores all experience pairs in a dataset called replay buffer. It uses randomly sampled minibatch tuples ($D$) from this replay buffer to perform SGD updates as $\Delta w = \alpha(r + \gamma \max_{a'} \hat{Q}(s', a'; w) - \hat{Q}(s, a; w))\nabla_w \hat{Q}(s, a; w)$. However, the problem of dependency on parameters $w$ is still not solved.

Next, a method using fixed $Q$ targets was proposed. To improve stability, target weights are fixed and two neural networks (current $Q$ network and target $Q$ network) are used. The existing network has parameter $w$ but the target network has parameter $w^-$. This parameter is updated by copying $w$ at regular intervals and remains fixed for other $t$, computed through $\Delta w = \alpha(r + \gamma \max_{a'} \hat{Q}(s', a'; w^-) - \hat{Q}(s, a; w))\nabla_w \hat{Q}(s, a; w)$.

---

### references

[Original source #1](https://youtu.be/b_wvosA70f8?si=tJRhjOU2ZPA0cdyK)




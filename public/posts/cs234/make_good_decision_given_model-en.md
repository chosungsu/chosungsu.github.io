---
title: 'Making Sequences of Good decisions Given a Model of the world'
date: '2025-03-07'
tags: ['cs234', 'lecture']
---

### markov reward process calculation

Markov Reward Process (MRP) is a form with rewards added to Markov chains. The goal of MRP is to maximize the sum of expected future rewards.

1. Return ($G_t$): The sum of discounted rewards from time $t$ to horizon $H$. $G_t = r_t + \gamma r_{t+1} + \gamma^2 r_{t+2} + \cdots + \gamma^{H-1} r_{t+H-1}$

2. State Value Function ($V(s)$): The expected value of return when starting from state $s$. $V(s) = E[G_t | s_t = s]$

3. Bellman Equation: The value function of MRP satisfies the following equation. $V(s) = R(s) + \gamma \sum_{s' \in S} P(s'|s)V(s')$

    - Matrix form: V = R + γPV.
    - Analytical solution: V = (I - γP)^-1 R. This has computational complexity of O(N^3).

4. Iterative Algorithm (Dynamic Programming): The value function of MRP can be computed iteratively. $V_k(s) = R(s) + \gamma \sum_{s' \in S} P(s'|s)V_{k-1}(s')$

    - V0(s) is initialized to 0 for all s.
    - Each iteration has computational complexity of O(|S|^2).

---

### markov decision process

Markov Decision Process is adding actions ($a$) to reward process ($r$). MDP is defined as tuple $(S, A, P, R, \gamma)$ where each represents state set, action set, dynamic/transition model for actions, reward function, and discount factor.

#### markov policy

Markov reward process corresponds to MDP + $\pi(a|s)$. In MRP, it can be transformed using the following two formulas.

$$
R^{\pi}(s)=\sum_{a \in A} \pi(a|s) R(s,a), \\
P^{\pi}(s'|s)=\sum_{a \in A} \pi(a|s) R(s'|s,a)
$$

#### evaluation, iterative algorithm

The process of estimating and predicting expected rewards when following a given policy $\pi$.

$$
V_k^{\pi}(s)=\sum_{a} \pi(a|s)[R(s,a) \\
+\gamma \sum_{s' \in S} p(s'|s, a) V_{k-1}^{\pi}(s')]
$$

This is called Bellman backup for a specific policy.

#### control

The optimization process to find the optimal policy ($\pi$). It is defined as $\pi^*(s)=argmax_{\pi}V^{\pi}(s)$ and there exists a unique optimal value function for MDP. Since the number of deterministic policies is $|A|^{|S|}$, policy iteration is more efficient than enumeration.

---

### policy iteration(pi)

Initialize $\pi_0(s)$ with random values.

Repeat until $\pi$ no longer changes, compute the value function $V^{\pi_i}$ for the current policy through state-action value function $(Q^{\pi}(s,a))$ and use it to compute a new policy $\pi_{i+1}$.

$$
Q^{\pi}(s,a)=R(s,a) \\
+\gamma \sum_{s' \in S} P(s'|s, a)V^{\pi}(s'), \\
\pi_{i+1}(s)=argmax_aQ^{\pi_i}(s, a) \forall s \in S
$$

Monotonic improvement compares value functions of two policies ($π_1$ and $π_2$), referring to the expected sum of discounted future rewards that can be obtained starting from state $s$ when following a specific policy, ensuring that the value of the new policy is always greater than or equal to the value of the previous policy.

#### markov assumption

Information state is a sufficient statistic of history.

State ($s_t$) is Markov only when $p(s_{t+1}|s_t, a_t)=p(s_{t+1}|h_t, a_t)$ is satisfied, meaning the future is independent of the past given the present.

#### mdp model

A representation of how much the environment changes for each action taken by the agent. In the transition/dynamics model, the agent's state is predicted as follows.

$$
p(s_{t+1}=s'|s_t=s, a_t=a)
$$

The reward model predicts immediate rewards.

$$
r(s_t=s, a_t=a) \\
=E(r_t|s_t=s, a_t=a)
$$

#### policy, $\pi$

Determines how the agent selects actions in each state.

In deterministic policy, state is mapped to action as $\pi(s)=a$.

In stochastic policy, state is mapped to action distribution when given as $\pi(a|s)=pr(a_t=a|s_t=s)$.

---

### value iteration(vi)

This is another method for computing optimal policy. Set $k=1$, $V_0(s)=0$ and iterate to consider longer episodes while maintaining optimal values for k steps.

For each state $s$, compute $V_{k+1}(s)=max_a[R(s,a)+\gamma \sum_{s' \in S} P(s'|s, a) V_k(s')]$ iteratively until $|V_{k+1}-V_k|_{\infty} \le \epsilon$.

VI converges when discount factor $\gamma < 1$ or when the probability of reaching terminal state is 1. This is because $\gamma < 1$ is a contraction operator.

Contraction operator is defined as follows.

$$
|OV-OV'| \le |V-V'|
$$

If this is satisfied, $O$ is called a contraction operator. It means the distance on the left side is less than or equal to the distance on the right side.

---

### references

[Original source #1](https://youtu.be/gHdsUUGcBC0?si=ZJYtVof8NhBtA_LN)




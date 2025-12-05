---
title: 'Planning by dynamic programming'
date: '2025-03-10'
tags: ['reinforcement learning', 'lecture']
---

### Policy evaluation

Policy evaluation is the process of computing the state-value function $v_\pi$ for an arbitrary policy $\pi$. This is also called the prediction problem in the DP literature.

#### Iterative Policy Evaluation

When the dynamics of the environment are completely known, a system of $| \mathcal{S} |$ simultaneous linear equations in $| \mathcal{S} |$ unknowns is:

$$
v_\pi(s) = \sum_a \pi(a|s) \sum_{s', r} p(s', r|s, a) \left[ r + \gamma v_\pi(s') \right]
$$

An iterative solution is most suitable for finding the solution to this system. Iterative policy evaluation produces a sequence of successive approximations $v_k$ to $v_{k+1}$, using the Bellman equation for $v_\pi$ as an update rule:

$$
\begin{aligned}
&v_{k+1}(s) = E_\pi[R_{t+1} + \gamma v_k(S_{t+1}) \mid S_t = s] \\
&= \sum_a \pi(a|s) \sum_{s', r} p(s', r|s, a) \left[ r + \gamma v_k(s') \right]
\end{aligned}
$$

$v_k = v_\pi$ is a fixed point of this update rule. The sequence ${v_k}$ converges to $v_\pi$ as $k \to \infty$.

---

### Policy Improvement

For any deterministic policies $\pi$ and $\pi'$, if for all states $s \in \mathcal{S}$ the following condition is satisfied:

$$
q_\pi(s, \pi'(s)) \ge v_\pi(s)
$$

then policy $\pi'$ is as good as or better than $\pi$.

Policy improvement is the process of making a new policy $\pi'$ that is greedy with respect to $v_\pi$:

$$
\pi'(s) = \underset{a}{\operatorname{argmax}} \ q_\pi(s, a)
$$

The greedy policy selects the action that looks best according to a one-step lookahead search. Thanks to the policy improvement theorem, the new greedy policy is always as good as or better than the original policy.

---

### Policy Iteration

Once we have $v_\pi$ through policy evaluation, and use it to obtain a better policy $\pi'$ through policy improvement, we can repeat this process to obtain a sequence of monotonically improving policies and value functions.

$$
\pi_0 \overset{E}{\longrightarrow} v_{\pi_0} \overset{I}{\longrightarrow} \pi_1 \overset{E}{\longrightarrow} v_{\pi_1} \cdots \overset{I}{\longrightarrow} \pi^* \overset{E}{\longrightarrow} v^*
$$

This method of finding an optimal policy is called policy iteration. Since a finite MDP has only a finite number of policies, this process must converge to an optimal policy and optimal value function in a finite number of iterations.

---

### Value Iteration

One drawback of policy iteration is that each of its iterations involves policy evaluation. Policy evaluation itself may be an iterative computation that requires multiple sweeps over the state set, and exact convergence occurs only in the limit.

Value iteration is an important special case of truncated policy iteration in which the policy evaluation step is cut short to just one sweep.

$$
\begin{aligned}
&v_{k+1}(s) = \max_a E[R_{t+1} + \gamma v_k(S_{t+1}) \mid S_t = s, A_t = a], \\
&v_{k+1}(s) = \max_{a} \sum_{s', r} p(s', r|s, a) \left[ r + \gamma v_k(s') \right]
\end{aligned}
$$

Value iteration formally requires an infinite number of iterations to converge exactly to $v^*$. In practice, we stop once the change in the value function $\max_{s} |v_{k+1}(s) - v_k(s)|$ is sufficiently small in one sweep.

---

### Asynchronous Dynamic Programming

A major drawback of DP methods is that they require sweeps over the entire state set. Asynchronous DP algorithms are in-place iterative DP algorithms that are not organized in terms of systematic sweeps over the state set.

They back up the values of states in any order, using whatever values of other states happen to be available. Some states may be backed up several times before others are backed up once. To converge correctly, the values of all states must be backed up infinitely often.

The advantage is that we need not get locked into an endlessly long sweep before making progress toward policy improvement. By applying backups to states that the agent visits, we can focus the DP algorithm's focus on states most relevant to the agent.

---

### References

[Original source #1](https://web.stanford.edu/class/psych209/Readings/SuttonBartoIPRLBook2ndEd.pdf?utm_source=chatgpt.com)

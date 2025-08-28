---
title: 'Planning by dynamic programming'
date: '2025-03-10'
tags: ['reinforcement learning', 'lecture']
---

### Policy evaluation

The problem of evaluating a given policy $\pi$ is solved by repeatedly applying the Bellman expectation backup.

In synchronous backups, at each iteration and for all states, we update the value function for the next iteration using the value function $v_k(s')$ of the next states $(s')$.

$$
v_{k+1}(s)=\sum_{a \in A} \pi(a|s)(R_s^a+\gamma \sum_{s' \in S} P_{ss'}^a \, v_k(s')) \\
\Rightarrow v^{k+1} \sim R^{\pi}+\gamma P^{\pi} v^k
$$

---

### Policy iteration

<img src="https://velog.velcdn.com/images/devjo/post/7ec398e5-088e-4282-8758-068e07306d76/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Policy iteration finds the optimal policy $\pi$ by repeatedly evaluating and improving a given policy $\pi$. It consists of the following two steps.

#### 1. Policy Evaluation

$$
v_{\pi}(s)=\mathbb{E}[R_{t+1}+\gamma R_{t+2}+ \dots \mid S_t=s]
$$

This can be carried out by repeatedly applying the Bellman expectation backup. It estimates the value function under the current policy.

#### 2. Policy Improvement

Given the evaluated value function, we act greedily to produce a new policy.

$$
\pi'(s)=\arg\max_{a \in A} q_{\pi}(s,a)
$$

This step improves the value by one step for every state $s$. As a result, the value function of the new policy is always greater than or equal to that of the previous policy.

If the policy improvement no longer yields any improvement, i.e., if $v_{\pi'}(s) = v_\pi(s)$, then the Bellman optimality equation is satisfied.

$$
q_{\pi}(s,\pi'(s))=\max_{a \in A} q_{\pi}(s,a) \\
= q_{\pi}(s,\pi(s)) = v_{\pi}(s)
$$

Since $v_\pi(s) = \max_{a \in A} q_\pi(s, a)$ holds, we have $v_\pi(s) = v_*(s)$, which means the current policy is optimal.

---

### Value iteration

An optimal policy can be decomposed into two parts:

- the optimal first action $A^*$
- the optimal policy that follows in the next state $S'$

#### Principle of optimality

A necessary and sufficient condition for a policy $\pi(a|s)$ to achieve the optimal value $v_{\pi}(s) = v_*(s)$ at state $s$ is that for any state $s'$ reachable from $s$, the policy $\pi$ must also achieve the optimal value at $s'$. If we already know the solution $v_{s'}$ of the subproblem at $s'$, then the solution at $s$ can be found by a one-step lookahead.

$$
v_*(s) \leftarrow \max_{a \in A} \Big(R_s^a + \gamma \sum_{s' \in S} P_{ss'}^a \, v_*(s')\Big)
$$

The idea of value iteration is to apply this update repeatedly. Intuitively, you can think of it as working backward from terminal rewards.

---

### Extensions to dynamic programming

Here we discuss asynchronous dynamic programming to overcome the limitations of synchronous DP, along with three techniques within it.

#### 1. Asynchronous dynamic programming

Asynchronous DP backs up individual states in any order. For each selected state, it applies the appropriate backup, which can significantly reduce computation.

#### 2. In-place dynamic programming

Synchronous value iteration stores two copies of the value function. For example, for all $s \in S$ it stores $v_{new}(s) \leftarrow \max_{a \in A} (R_s^a + \gamma \sum_{s' \in S} P_{ss'}^a v_{old}(s'))$ and then sets $v_{old} \leftarrow v_{new}$. In-place DP stores only a single copy: $v(s) \leftarrow \max_{a \in A} (R_s^a + \gamma \sum_{s' \in S} P_{ss'}^a v(s'))$.

#### 3. Prioritised sweeping

This method guides state selection using the magnitude of the Bellman error. For example, define

$$
\Big|\max_{a \in A} (R_s^a + \gamma \sum_{s' \in S} P_{ss'}^a v(s'))-v(s)\Big|
$$

Then back up the state with the largest remaining error. Maintaining a priority queue enables an efficient implementation.

#### 4. Full width backups

DP uses full-width backups: each backup considers all successor states and actions, leveraging transition knowledge. However, in high-dimensional problems this suffers from the curse of dimensionality.

---

### Contraction Mapping Theorem

The vector space $V$ of value functions has dimension $|S|$, and each point in this space fully specifies a value function $v(s)$.

$$
\lVert u-v \rVert_{\infty}=\max_{s \in S} |u(s)-v(s)|
$$

The distance between two state-value functions $u$ and $v$ is measured by the sup norm, i.e., the largest difference across states.

$$
T_{\pi}(v)=R^{\pi}+\gamma P^{\pi}v
$$

The Bellman expectation backup operator $T_{\pi}$ is defined as above and is a $\gamma$-contraction, which brings value functions at least $\gamma$ times closer at every application.

Using these results, the contraction mapping theorem states that if $T_{\pi}$ is a contraction on a complete metric space $V$, then repeated application converges to a unique fixed point, with a linear convergence rate governed by $\gamma$.

---

### References

[Original Source #1](https://davidstarsilver.wordpress.com/wp-content/uploads/2025/04/lecture-3-planning-by-dynamic-programming-.pdf)




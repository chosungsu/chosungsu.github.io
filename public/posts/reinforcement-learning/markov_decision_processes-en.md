---
title: 'Markov Decision Processes'
date: '2025-03-07'
tags: ['reinforcement learning', 'lecture']
---

### The Agent–Environment Interface

The agent and environment interact continually, with the agent selecting actions and the environment responding to those actions and presenting new situations. The environment also generates rewards, special numerical values that the agent seeks to maximize over time.

They need not be actual fixed time intervals; they can be arbitrary successive stages of decision making and action.

---

### Goals and Rewards

The reward hypothesis states that all of what we mean by goals and purposes can be well thought of as the maximization of the expected value of the cumulative sum of a received scalar signal (called reward). The reward signal is not the place to impart to the agent prior knowledge about how to achieve what we want it to do.

For example, a chess-playing agent should be rewarded only for actually winning, not for achieving subgoals such as taking its opponent's pieces. If achieving these kinds of subgoals were rewarded, then the agent might find a way to achieve them without achieving the real goal.

---

### Returns

To formally define the agent's objective, we seek to maximize the expected return.

In tasks where there is a final time step $T$ (e.g., games, maze running), the return is simply the sum of the rewards:

$$
G_t = R_{t+1} + R_{t+2} + R_{t+3} + \cdots + R_T
$$

Each episode ends in a terminal state and then resets.

Tasks in which the agent–environment interaction continues without limit are called continuing tasks. In this case, $T = \infty$, so the simple sum $G_t$ could be infinite. Therefore, we generally use the concept of discounting to maximize the expected discounted return:

$$
G_t = R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + \cdots = \sum_{k=0}^{\infty} \gamma^k R_{t+k+1}
$$

---

### The Markov Property

The conditions on the state signal include both comprehensiveness—it can include immediate sensations and memories of past sensations or other complex structures containing much information—and an allowance for incompleteness—we should not expect it to inform us of everything useful for making decisions.

A state signal that has the Markov property need not be more than a complete record of all past sensations, but it must hold all relevant information. That is, all future states and expected rewards can be predicted from the current state and action alone. This is called independence of path.

$$
\Pr\{R_{t+1} = r, S_{t+1} = s' | S_0, A_0, R_1, \ldots, S_t, A_t\}
$$

The dynamics of the environment generally depend on everything that has happened in the past. However, if the Markov property holds, then the environment's response at $t+1$ depends only on the current state $S_t$ and action $A_t$.

#### Markov Decision Processes

A reinforcement learning task that satisfies the Markov property is called a Markov decision process (MDP). If the state and action spaces are finite, it is called a finite Markov decision process (finite MDP).

For given state $s$ and action $a$, the probability of each possible pair of next state $s'$ and reward $r$ is denoted $p(s', r|s, a)$:

$$
p(s', r|s, a) = \Pr\{S_{t+1} = s', R_{t+1} = r \mid S_t = s, A_t = a\}
$$

For example, a recycling robot can be thought of as having the following MDP:

The state set is $\mathcal{S}$: $\{ \text{high, low} \}$ representing battery level, and the action sets are $\mathcal{A}(\text{high}) = \{ \text{search, wait} \}$, $\mathcal{A}(\text{low}) = \{ \text{search, wait, recharge} \}$. Rewards are expressed as the expected number of cans while searching, and the expected number of cans while waiting.

#### Value Functions

Value functions are defined with respect to particular policies. $\pi(a|s)$ is the probability of taking action $a$ in state $s$.

The value $v_\pi(s)$ of a state $s$ under a policy $\pi$ is the expected return when starting in $s$ and following $\pi$ thereafter:

$$
\begin{aligned}
&v_\pi(s) = E_\pi[G_t \mid S_t = s] \\
&= E_\pi \left[ \sum_{k=0}^{\infty} \gamma^k R_{t+k+1} \mid S_t = s \right]
\end{aligned}
$$

The value $q_\pi(s, a)$ of taking action $a$ in state $s$ under a policy $\pi$ is the expected return starting from $s$, taking the action $a$, and thereafter following policy $\pi$:

$$
\begin{aligned}
&q_\pi(s, a) = E_\pi[G_t \mid S_t = s, A_t = a] \\
&= E_\pi \left[ \sum_{k=0}^{\infty} \gamma^k R_{t+k+1} \mid S_t = s, A_t = a \right]
\end{aligned}
$$

A fundamental property of value functions is that they satisfy recursive relationships. The Bellman equation for $v_\pi$ is:

$$
v_\pi(s) = \sum_{a} \pi(a|s) \sum_{s', r} p(s', r|s, a) \left[ r + \gamma v_\pi(s') \right]
$$

This expresses that the value $v_\pi(s)$ of the current state $s$ must equal the average of the expected reward $r$ plus the discounted value $\gamma v_\pi(s')$ of possible next states $s'$.

#### Optimal Value Functions

An optimal policy is a policy that has a greater or equal expected return than all other policies.

$$
\begin{aligned}
&v^*(s) = \max_{\pi} v_\pi(s) \\
&q^*(s, a) = \max_{\pi} q_\pi(s, a)
\end{aligned}
$$

For finite MDPs, the Bellman optimality equation has a unique solution, but actually finding this solution directly requires knowing $p(s', r|s, a)$ exactly and having sufficient computational resources.

---

### References

[Original source #1](https://davidstarsilver.wordpress.com/wp-content/uploads/2025/04/lecture-2-mdp.pdf)

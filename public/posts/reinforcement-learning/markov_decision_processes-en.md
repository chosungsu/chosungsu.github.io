---
title: 'Markov Decision Processes'
date: '2025-03-07'
tags: ['reinforcement learning', 'lecture']
---

### Overview

Markov Decision Processes are tools for formally describing reinforcement learning environments.

When the environment is fully observable, the current state can perfectly characterize the entire process. The Markov property means that given the present, the future is independent of the past, which is because the state is a sufficient statistic that receives all information from history.

The state transition matrix contains transition probabilities from all states $s$ to all next states $s'$, which is defined from $P=\begin{bmatrix} P_{11} & \cdots & P_{1n} \\ \vdots & \ddots & \vdots \\ P_{n1} & \cdots & P_{nn} \end{bmatrix}$, and the sum of each row is 1.

---

### Markov Reward Process

Markov Reward Processes include value. This is in the form of a tuple $<S, P, R, \gamma>$, where each corresponds to a finite set of states, state transition probability matrix, reward function, and discount rate.

#### 1. Return & Discount factor

Return $G_t$ is the total discounted reward from time $t$. It can be calculated through $G_t=R_{t+1}+\gamma \cdot R_{t+2}+ \cdots=\sum_{k=0}^{\infty} \gamma^k \cdot R_{t+k+1}$, where $\gamma^k \cdot R$ is the value of reward received after $k+1$ time steps, which evaluates immediate rewards higher than delayed rewards. As $\gamma$ gets closer to 0, it tends to make myopic evaluations.

Most Markov Reward Decision Processes have discount factors because discounting rewards is convenient and it's a way to avoid infinite $G$ values in cyclic processes. Also, uncertainty about the future may not be fully reflected, and if rewards are financial, immediate rewards become more valuable than delayed rewards.

#### 2. Value function

The value function provides the long-term value of state $s$, defined as the expected value when starting from state $s$ like $v(s)=E[G_t|S_t=s]$.

#### 3. Bellman Equation

The value function can be decomposed into two parts:

$\rightarrow$ Immediate reward $R_{t+1}$

$\rightarrow$ Discounted value of next state $\gamma \cdot v(S_{t+1})$

The above value function can be redefined as follows:

$$
v(s)=E[R_{t+1}+\gamma*R_{t+2}+\cdots|S_t=s] \\
=E[R_{t+1}+\gamma*(R_{t+2} + \gamma*R_{t+3} + \cdots)|] \\
=E[R_{t+1}+\gamma*G_{t+1}|S_t=s] \\
=E[R_{t+1}+\gamma*v(S_{t+1})|S_t=s]
$$

As such, the Bellman equation shows that the value of state $s$ consists of immediate reward and expected value of the next state. Computational complexity is $O(n^3)$ for $n$ states.

---

### Markov Decision Process

Markov Decision Processes are processes with decision-making added, where all states have Markov properties.

#### 1. Definition

It is a tuple composed of $<S, A, P, R, \gamma>$.

#### 2. Policy

Policy $\pi$ is a probability distribution of actions for a given state, defined as $\pi(a|s)=P[A_t=a|S_t=s]$. Markov Decision Processes depend only on the current state and are static.

For a given MDP $M$ and policy $\pi$, the state sequence $S_1, S_2, \dots$ is a Markov process, and the state and reward sequence is a Markov reward process $<S,P^{\pi}, R^{\pi}, \gamma>$.

Here, $P_{s,s'}^{\pi}=\sum_{a \in A} \pi(a|s) \cdot P_{ss'}^a$, which is the probability that the next state will be $s'$ when following action $\pi$ in state $s$, and $R_s^{\pi}=\sum_{a \in A} \pi(a|s) \cdot R_{s}^a$, which means the expected reward obtained when following action $\pi$ in state $s$.

#### 3. Value function

$v_{\pi}(s)=E_{\pi}[G_t|S_t=s]$, where the state value function is defined as the expected return when starting from state $s$ and following policy $\pi$, and the action value function $q_{\pi}(s,a)=E_{\pi}[G_t|S_t=s, A_t=a]$ is used as the expected return when taking action $a$ in state $s$ and then following the policy.

The value functions are connected as follows:

In $v_{\pi}(s)=\sum_{a \in A} \pi(a|s) \cdot q_{\pi}(s,a)$, the value of state $s$ can be calculated as the average of action values for all possible actions $a$ according to the policy's probability, and in $q_{\pi}(s,a)=R_s^a + \gamma \cdot \sum_{s' \in S} P_{ss'}^a v_{\pi}(s')$, the action value can be calculated as the weighted average of values of all next states when taking the action, according to transition probabilities.

#### 4. Bellman Equation

Using the above two equations, we can derive the Bellman equation as follows:

$$
v_{\pi}=R^{\pi}+\gamma \cdot P^{\pi}v_{\pi}
$$

The optimal state value function $v_*(s)$ is the function with the highest value among all policies, defined as $v_*(s)=\max_{\pi}v_{\pi}(s)$. And the optimal action value function $q_*(s,a)$ is the function with the highest action value among all policies, defined as $q_*(s,a)=\max_{\pi}q_{\pi}(s,a)$.

Such optimal value functions represent the best possible performance in MDP and can define a partial ordering for all policies.

In MDP, there always exists a deterministic policy, and if we know $q_*(s, a)$, we can immediately obtain the optimal policy. Also, they are recursively connected through the Bellman optimality equation.

$$
v_*(s)=\max_a q_*(s,a), \\
v_*(s)=\max_a (R_s^a+\gamma \cdot \sum_{s' \in S} P_{ss'}^a v_*(s')), \\
q_*(s,a)=R_s^a+\gamma \cdot \sum_{s' \in S} P_{ss'}^a \max_{a'}q_*(s',a')
$$

---

### References

[Original Source #1](https://davidstarsilver.wordpress.com/wp-content/uploads/2025/04/lecture-2-mdp.pdf)




---
title: 'Introduction to RL'
date: '2025-03-03'
tags: ['reinforcement learning', 'lecture']
---

### Overview

Reinforcement Learning (RL) is learning through experience/data to make good decisions under uncertainty. This is an essential part of intelligence and has evolved from Richard Bellman's theory in the 1950s. Over the past decade, there have been impressive success cases such as AlphaGo, plasma control learning, COVID-19 border testing, and ChatGPT.

---

### Key characteristics

<img src="https://velog.velcdn.com/images/devjo/post/364637cc-8f1d-49ef-ab82-21902ca10814/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

1. There is no supervisor, only reward signals exist.

2. Feedback is delayed and not immediate.

3. It is sequential and not independent and identically distributed (i.i.d).

4. The agent's actions affect the data it will receive next.

The core concept of reinforcement learning includes reward $R_t$, which is a scalar feedback signal indicating how well the agent performs at time $t$. The agent's goal is to maximize cumulative reward. Reinforcement learning is based on the reward hypothesis. However, there is a possibility of problems such as reward hacking or unintended side effects.

---

### Examples of rewards

$\rightarrow$ Helicopter stunt flying

    - Positive reward: when flying along desired trajectory

    - Negative reward: when crashing

$\rightarrow$ Investment portfolio management

    - Positive reward: when bank balance increases

    - Negative reward: when bank balance decreases

$\rightarrow$ Robot walking

    - Positive reward: when moving forward

    - Negative reward: when falling

---

### Agent and Environment

At each step $t$, the agent and environment interact.

The agent executes action $A_t$ and receives observation $O_t$. Accordingly, it receives scalar reward $R_t$. Conversely, the environment receives action $A_t$ and emits observations and reward values.

---

### History and State

History is a sequential record of observations, actions, and rewards.

$$
H_t=O_1,R_1,A_1, \cdots, A_{t-1}, O_t, R_t
$$

That is, it is the set of all observable variables up to time $t$, and state $(S_t=f(H_t))$ is information used to determine what will happen next.

Environment state $(S_t^e)$ is a private representation of the environment, containing all data the environment uses to choose the next observation/reward, which is generally not visible to the agent. And agent state $(S_t^a)$ is the agent's internal representation, containing all information used to choose the next action. It can also be any function of history $S_t^a=f(H_t)$.

---

### Information state

Information state is also called Markov state and contains all useful information from history. A necessary and sufficient condition for a state $S_t$ to be Markov is that the following holds:

$$
P[S_{t+1}|S_t]=P[S_{t+1}|S_1, \dots, S_t]
$$

This means that given the present, the future is independent of the past. And the reason history can be discarded once the state is known is that the state is a sufficient statistic for the future.

---

### Full observability vs Partial observability

Full observability is when the agent directly observes the environment's state, where $O_t=S_t^a=S_t^e$, meaning there is identity between agent state and environment and information state, and such a model is called a Markov Decision Process (MDP).

Partial observability has non-identity between agent state and environment state, and such a model is called a Partially Observable Markov Decision Process (POMDP). For example, a robot with only camera vision cannot know its absolute position. The agent must construct a state representation $(S_t^a)$, which equals the entire history and is defined as beliefs of environment state as $S_t^a=(P[S_t^e=s_1], \dots, P[S_t^e=s_n])$. And it must be able to compute new states through equations like $S_t^a=\sigma(S_{t-1}^aW_s+O_tW_o)$ using Recurrent Neural Networks (RNN).

---

### Inside an RL agent

A reinforcement learning agent can contain one or more of the following components:

#### 1. Policy

Defines the agent's behavior. This is a mapping from state to action.

A deterministic policy determines one action for a given state through $a=\pi(s)$.

A stochastic policy provides a probability distribution of possible actions for a given state like $\pi(a|s)=P[A_t=a|S_t=s]$.

#### 2. Value function

Used to evaluate how good or bad a state is as a prediction of future rewards. The value function of state $s$ under policy $\pi$ is the sum of expected cumulative rewards obtained when following the policy from the current state, calculated as $v_{\pi}(s)=E_{\pi}[R_{t+1}+\gamma \cdot R_{t+2} + \dots|S_t=s]$, where $\gamma$ is the discount factor that discounts future rewards to present value.

#### 3. Model

The environment that predicts the next state is calculated as $P_{ss'}^a=P[S_{t+1}=s'|S_t=s,A_t=a]$, which means the probability that the next state will be $s'$ when action $a$ is taken in state $s$. And the environment that predicts the next reward is calculated as $R_s^a=E[R_{t+1}|S_t=s,A_t=a]$, which means the expected value of the reward received when action $a$ is taken in state $s$.

---

### References

[Original Source #1](https://youtu.be/WsvFL-LjA6U?si=w6AiGLSlL14bTJ_a)

[Original Source #2](https://davidstarsilver.wordpress.com/wp-content/uploads/2025/04/intro_rl.pdf)


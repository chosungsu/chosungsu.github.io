---
title: 'Introduction to RL'
date: '2025-03-03'
tags: ['cs234', 'lecture']
---

### overview

Reinforcement Learning (RL) is learning through experience/data to make good decisions under uncertainty. This is an essential part of intelligence and has evolved from Richard Bellman's theory in the 1950s. Over the past decade, there have been impressive success cases such as AlphaGo, plasma control learning, COVID-19 border inspection, and ChatGPT.

---

### key characteristics

__Optimization:__ The goal is to find optimal decisions that produce the best results or good outcomes. It includes explicit decision-making concepts.

__Delayed Consequences:__ Current decisions can affect future outcomes. For example, finding a key in a video game.

__Exploration:__ Refers to the process of learning while making decisions. Rewards are only obtained for decisions that have been tried.

__Generalization:__ The goal is to create a generalized policy through learning without pre-programming, mapping from past experiences to actions.

---

### sequential decision making

Actions are selected to maximize total expected future rewards. This may require balancing immediate rewards with long-term rewards.

At each time step ($t$), the agent takes an action ($a$), the environment updates, and generates an observation ($o$) and reward ($r$) which are received.

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
r(s_t=s, a_t=a)=E(r_t|s_t=s, a_t=a)
$$

#### policy, $\pi$

Determines how the agent selects actions in each state.

In deterministic policy, state is mapped to action as $\pi(s)=a$.

In stochastic policy, state is mapped to action distribution when given as $\pi(a|s)=pr(a_t=a|s_t=s)$.

---

### process in mdp

### 1. markov process (markov chain)

A memoryless stochastic process that is a probabilistic state sequence with Markov properties. Defined by state set ($S$) and model ($P$).

### 2. markov reward process (mrp)

A form with rewards added to Markov chain, defined by state set ($S$), model ($P$), reward function ($R$), and discount factor ($\gamma$).

The discount factor is a factor that discounts the value of future rewards to the present. When its value is 0, only immediate rewards are considered, and when it is 1, it means future rewards are as meaningful as immediate rewards.

---

### references

[Original source #1](https://youtu.be/WsvFL-LjA6U?si=w6AiGLSlL14bTJ_a)




---
title: 'DREAMSMOOTH: IMPROVING MODEL-BASED REINFORCEMENT LEARNING VIA REWARD SMOOTHING'
date: '2024-09-30'
tags: ['embodied ai', 'paper review']
---

### Abstract

Model-based reinforcement learning (MBRL) has attracted much attention for its ability to learn complex behaviors in a sample-efficient manner by generating virtual trajectories with predicted rewards to plan actions.

Despite its success, we surprisingly found that reward prediction often becomes a bottleneck in MBRL, especially when rewards are difficult to predict or sparse.

Motivated by the intuition that humans can learn from rough reward estimates, we propose DreamSmooth, a simple but effective reward smoothing approach that learns to predict temporally smoothed rewards instead of exact rewards at given timesteps.

---

### Introduction

Humans often plan actions with rough estimates of future rewards rather than exact rewards at exact moments. Rough reward estimates are often sufficient for learning most tasks, and predicting exact rewards is often difficult because rewards are ambiguous, delayed, or unobservable.

For example, consider a manipulation task of pushing a block on a table into a bin, where a large reward is given only at the timestep when the block first touches the bin. Using the same image observations as the agent, it is difficult even for humans to predict the correct reward sequence.

Too high reward estimates would cause the agent to select actions that actually perform poorly, and too low estimates would lead the agent to ignore high rewards.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/36acb3f8-9d62-47f7-880e-a10e0c9dcb4f/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### BACKGROUND

We formulate the problem as a Partially Observable Markov Decision Process (POMDP), which is defined as a tuple $(\mathcal{O}, \mathcal{A}, P, R, \gamma)$.

Reinforcement learning aims to find a policy that maximizes the expected sum of rewards $\mathbb{E}_{\pi}[\sum_{t=1}^T \gamma^{t-1} r_t]$.

This paper focuses on MBRL algorithms that learn a world model $P_{\theta}(z_{t+1}|z_t, a_t)$ and a reward model $R_{\theta}(r_t|z_t)$ from agent experience, where $z_t$ is the learned latent state at timestep $t$.

#### REWARD PREDICTION

Reward prediction is surprisingly difficult in many environments. We hypothesize that the mean squared error (MSE) loss $\mathbb{E}_{(z, r) \sim \mathcal{D}} \left[ (R_{\theta}(z) - r)^2 \right]$ commonly used for reward model training degrades reward prediction accuracy when sparse rewards exist. This is because predicting a sparse reward just one step early or late incurs higher loss than simply predicting $0$ reward at all steps.

More importantly, such poor reward prediction can become a bottleneck for policy learning.

#### Dreamsmooth

To address the reward prediction problem, we propose DreamSmooth, a simple but effective solution that performs temporal smoothing to relax the requirement that the model must predict sparse rewards at exact timesteps. Allowing the reward model to predict rewards that are off by a few timesteps from the ground truth makes learning easier, especially when rewards are ambiguous or sparse.

$$
\tilde{r}_t \leftarrow f(r_{t-L:t+L}) = \sum_{i=-L}^{L} f_i \cdot r_{\text{clip}(t+i, 0, T)}
$$

where $T$ and $L$ represent the episode and smoothing horizons, respectively. Episodes with smoothed rewards are stored in the replay buffer and used to train the reward model. The agent never sees the original rewards and learns only from smoothed rewards. Smoothed rewards facilitate reward prediction by allowing the model to predict rewards a few timesteps earlier or later without incurring large losses.

---

### Conclusion

In this paper, we identify the reward prediction problem in MBRL and provide a simple but effective solution, namely reward smoothing.

DreamSmooth shows excellent performance primarily in sparse reward tasks where reward prediction is not easy due to partial observability or stochasticity of the environment. However, while some experiments showed that it alleviates the difficulty of reward prediction, improved reward prediction does not always enhance task performance.

---

### References

[Original source #1](https://arxiv.org/pdf/2311.01450)

---
title: 'Diverse Policy Learning via Random Obstacle Deployment for Zero-Shot Adaptation'
date: '2025-10-08'
tags: ['embodied ai', 'paper review']
---

### Abstract

We propose a new reinforcement learning framework that enables zero-shot policy adaptation in environments with unknown dynamic obstacles.

Building on the idea that learning policies capable of generating diverse behaviors is key to adaptability, we introduce a training algorithm that integrates random obstacle deployment so policies can explore and learn a wide variety of actions. This approach overcomes limitations of prior diverse-policy methods that rely primarily on mutual-information maximization to promote diversity.

To enable zero-shot dynamic adaptation, we incorporate two main components: a state-dependent latent skill sampler and a motion predictor. The skill sampler draws multiple skill variables per state, the motion predictor filters out unsafe skills, and the agent executes the action corresponding to the safe skill.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/0023c75a-8ec3-4757-b0bc-3933eff15861/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### Importance of Diverse Policies and Limitations of Existing Methods

The more diverse the behaviors a policy can generate, the greater the chance it can avoid unexpected obstacles and pick collision-free motions in novel environments.

Learning from Demonstrations (LfD) is easier to train, but the resulting policy diversity is fundamentally limited by demonstration diversity, making data collection critical and often expensive. Reinforcement learning (RL) takes longer to train and is harder to stabilize, but with effective diversity-promoting algorithms, it has the potential to learn diverse policies without extensive datasets. We focus on developing such algorithms.

These approaches model policies as dependent on latent skill variables $z$. For example, the policy is defined as the distribution over actions conditioned on state $s$ and skill $z$, i.e., $\pi(a|s, z)$. While maximizing reward, they also aim to maximize mutual information between the skill variable $z$ and the state $s$ or state-action pairs $(s, a)$. Nevertheless, the resulting diversity falls far short of what is needed and yields unsatisfactory adaptability, as our experiments show.

Another key limitation is the inability to adapt to dynamically changing environments because the latent skill $z$ is fixed throughout an episode. This prevents the policy from adjusting online to new constraints. If the latent skill changes mid-episode, the current state may be an outlier for the new skill, leading to poor performance.

#### Proposed DIVO Framework

We propose a reinforcement learning framework that learns policies capable of generating far more diverse behaviors than existing methods. The core idea is to train policies with randomly deployed obstacles, as if obstacles were present even when they are not. In the illustration, random obstacles limit the feasible action space. The policy must explore and learn a variety of actions that avoid these obstacles, ultimately learning to produce a broad repertoire. Designing the obstacle distribution carefully is critical to successfully learning diverse policies.

The skill sampler produces multiple latent skills per state. Because the conditional distribution $p(z|s)$ is complex, we use recent flow-based neural network models. The motion predictor then forecasts trajectories and filters out those that violate newly encountered obstacles, removing unsafe actions.

---

### Related works

#### 1. Unsupervised Skill Discovery and Mutual-Information-Based Approaches

Unsupervised skill discovery frameworks identify diverse skills without external task rewards. DIAYN and DADS, for instance, maximize mutual information between skill variables and states or state-action pairs. However, due to inherent limits of mutual information, these methods often yield less diversity than required.

#### 2. Feature Diversification and Limitations of Fixed Skills

Cheng et al. recently proposed a framework for quadrupedal navigation that diversifies trajectory features—such as velocity direction—to learn diverse policies. Achieving the desired diversity requires carefully choosing features and training additional networks like a success-feature estimator.

Our approach allows latent skills to change within an episode, enabling adaptation to dynamic environments via the state-dependent latent skill sampler and motion predictor.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/2773cbe7-5fee-4ae3-ad16-2a9098bf0937/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### Latent Conditioned Policies

To enable diverse behaviors, we consider latent-variable policy models. Let $Z$ be the latent skill space with skill variables $z \in Z$. We model the action distribution conditioned on both state $s$ and skill $z$ as $\pi(a|s, z)$, and assume $z$ follows a state-dependent distribution $p(z|s)$.

Previous work typically assumes $z$ is drawn from an unconditional distribution, which forces the policy network $\pi(a|s, z)$ alone to capture all state-dependent complexity, limiting expressiveness. We therefore adopt state-dependent skill distributions.

$$
\pi(a|s) = \int_Z \pi(a|s, z) p(z|s)\,dz
$$

However, simply designing the model this way and applying standard RL algorithms is not enough to learn diverse policies.

#### Learning Diverse Policies via Random Obstacle Deployment

<img src="https://velog.velcdn.com/images/devjo/post/a092d1a8-8264-4036-9cb4-9e4d5c0ca9f1/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

We introduce a training method that ensures each $z$ induces a distinct behavior distribution.

First, we design a distribution over random obstacles. Specifically, we define obstacles via inequality constraints $c_\omega(s) \leq 0$ parameterized by $\omega \in \Omega$, and introduce a distribution $p(\omega|s_0)$ conditioned on the initial state $s_0$. At the start of each episode, given $s_0$, we sample $\omega \sim p(\cdot | s_0)$ to place random obstacles. During training, if the state $s$ violates $c_\omega(s) \leq 0$, the episode terminates with a large negative reward.

Two criteria guide obstacle-design choices:

- The solution with obstacles must differ from the obstacle-free solution; otherwise, the same skill would be learned for different $\omega$. For example, in the push-T task, the circular obstacle should neither be too far from the T-block’s start and goal poses nor block neither of them; it must interfere with the path between them.
- Obstacles placed too close to the initial or target pose may render the task infeasible.

#### Learning Latent Skill Samplers and Flow Matching

To train $p(z|s)$, we collect a dataset of $(z, s)$ pairs using the trained encoder and policy.

Because $p(z|s)$ can be highly complex and difficult to model with classical probabilistic approaches, we employ continuous normalizing flow models and the flow-matching algorithm, which have proven effective in many robotic learning settings.

#### Motion Predictor

We introduce a motion predictor network designed to forecast state changes given action inputs. Here, “motion” refers to the trajectory of states over time.

Let $s_t$ and $a_t$ denote the current state and action, with $s_{t+1}$ the next state. We define a motion as the state sequence from $s_t$ to $s_{t+1}$, denoted $s_{t:t+1}$. For sequence length $H$, $s_{t:t+1} := \{ s_{t + \frac{k}{H-1}} \}_{k=0}^{H-1} \in S^H$. When we omit the time index, we write $s_{t:t+1}$ as $s_{\text{traj}}$.

Because the motion predictor learns environment dynamics effectively, one might argue that trajectory-optimization methods such as MPC could solve tasks while avoiding obstacles, potentially removing the need for policy learning. However, these methods face significant computational challenges, especially in complex, high-dimensional environments.

#### Dynamic Skill Adjustment

<img src="https://velog.velcdn.com/images/devjo/post/30382099-e947-44f2-ace2-88d012637759/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Existing methods select skill variables based on the initial state $s_0$ and the new constraint $c_{\text{new}}(s) \leq 0$, then keep the skill fixed throughout the episode, making them unsuitable for environments with dynamically changing constraints. In contrast, our method resamples skills based on the current state using the following procedure:

$\Rightarrow$ sample multiple skills with $v_\alpha$  
$\Rightarrow$ compute multiple actions with $\pi_\phi$  
$\Rightarrow$ predict motions with $m_\beta$  
$\Rightarrow$ check whether predicted motions satisfy the current constraint $c_{\text{new}}$  
$\Rightarrow$ retain safe action candidates

To do this, we design a scoring function (SCORE) that evaluates the desirability of each action based on its predicted motion $s_{\text{traj}}$.

---

### Conclusion

We presented a new diverse-policy learning framework compatible with any model-free actor-critic reinforcement learning algorithm.

By deploying random obstacles during training, we encourage policy exploration and diverse behavior learning. Our framework includes a latent skill sampler that produces skill variables from complex conditional distributions and a motion predictor that verifies whether the resulting actions satisfy environmental constraints.

Although our method learns policies that generate far more diverse behaviors than prior approaches, its diversity still depends heavily on the choice of random obstacle distribution. In this work, the distributions were manually designed per task—intuitive to some extent but not guaranteed to generalize to arbitrary tasks.

---

### References

[Original Source #1](https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=10847909)

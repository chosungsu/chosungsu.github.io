---
title: 'TLDR: Unsupervised Goal-Conditioned RL via Temporal Distance-Aware Representations'
date: '2025-02-27'
tags: ['embodied ai', 'paper review']
---

### Abstract

Unsupervised goal-conditioned reinforcement learning (GCRL) is a promising paradigm for developing diverse robotic skills without external supervision. However, existing methods struggle to cover a broad range of states due to limited exploration and sparse or noisy rewards.

To overcome these challenges, the authors propose a new method that leverages TemporaL Distance-aware Representations (TLDR). This method selects distant goals based on temporal distance to initiate exploration and computes both intrinsic exploration rewards and goal-reaching rewards from this representation. Specifically, the exploration policy seeks states with large temporal distances (i.e., covering a wide state space), while the goal-conditioned policy is trained to minimize the temporal distance to the goal.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/5313006f-8f3a-40d0-83b4-d2960457597b/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

Infants can autonomously learn goal-reaching skills by first learning to control their own bodies and then gradually improving their abilities to achieve more challenging goals. Similarly, for intelligent agents such as robots, the ability to reach a wide range of states—including both environment states and agent-centric states—is crucial. These capabilities not only provide a fundamental skill set but also enable the accomplishment of more complex tasks.

Can robots autonomously acquire human-like, long-horizon goal-reaching skills? Learning goal-reaching behaviors on robots is particularly appealing because it is task-agnostic and requires no external supervision, making it a scalable approach to unsupervised pre-training of robots.

The main challenges in unsupervised GCRL are twofold: exploring a diverse set of states that the agent can learn to reach, and effectively learning a goal-reaching policy.

---

### Related works

#### Goal-conditioned policy optimization

To improve the efficiency of learning goal-conditioned policies, methods such as Hindsight Experience Replay (HER) and model-based policy optimization have been widely used. However, learning complex, long-horizon goal-reaching behaviors remains challenging due to sparse or heuristic rewards.

As an alternative, temporal distance—defined as the number of environment steps between states, estimated from data—can provide denser and more grounded reward signals. For instance, LEXA and PEG use the expected temporal distance under the current policy as a goal-reaching reward.

#### Exploration strategies

Unsupervised GCRL heavily relies on choosing exploratory goals that drive the agent toward novel states and expand its coverage of the state space. Such exploration goals may simply be sampled from the replay buffer as in LEXA, or selected as less-visited states, such as low-density regions in the state distribution.

---

### Methods

#### Problem formulation

<img src="https://velog.velcdn.com/images/devjo/post/ee366825-d2dc-443c-95dc-f4e1bc50e73c/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

We formulate the unsupervised GCRL problem as a goal-conditioned Markov decision process, defined by the tuple $\\mathcal{M} = (\\mathcal{S}, \\mathcal{A}, p, \\mathcal{G})$.

$\\mathcal{S}$ and $\\mathcal{A}$ denote the state and action spaces, respectively. The transition dynamics are given by $p: \\mathcal{S} \\times \\mathcal{A} \\to \\Delta(\\mathcal{S})$, where $\\Delta(\\mathcal{X})$ denotes the set of probability distributions over $\\mathcal{X}$.

The agent’s goal is to learn an optimal goal-conditioned policy $\\pi^{\\mathcal{G}}: \\mathcal{S} \\times \\mathcal{G} \\to \\mathcal{A}$, where $\\pi^{\\mathcal{G}}(a \\mid s, g)$ outputs an action $a \\in \\mathcal{A}$ from state $s$ that can reach the goal $g \\in \\mathcal{G}$ in as few steps as possible.

#### Learning temporal distance-aware representations

Temporal distance is defined as the minimum number of environment steps between states, and can provide denser and better-grounded rewards for both goal-conditioned policy learning and exploration. Instead of relying on sparse, binary goal-reaching rewards, the change in temporal distance before and after taking an action can serve as a useful learning signal.

The learned representation $\\phi: \\mathcal{S} \\to \\mathcal{Z}$ encodes temporal distance between states into a latent space $\\mathcal{Z}$, where $\\lVert \\phi(s_1) - \\phi(s_2) \\rVert$ reflects the temporal distance between $s_1$ and $s_2$.

$$
\\max_{\\phi} \\mathbb{E}_{s \\sim p_s, g \\sim p_g} [f(\\lVert \\phi(s) - \\phi(g) \\rVert)]
$$

Here, $f$ is an affine-transformed softplus ($\\text{softplus}$) function that assigns lower weights to larger distances $\\lVert \\phi(s) - \\phi(g) \\rVert$. Using a Lagrange multiplier $\\lambda$, this constrained objective is optimized via dual gradient descent, with $s$ and $g$ randomly sampled from minibatches during training.

#### Exploratory goal selection

Selecting low-density (less visited) states as exploratory goals can promote goal-directed exploration. However, the “density” of a state does not necessarily reflect how rare or difficult it is to reach that state. For example, a robot arm might actively explore visually novel (low-density) joint configurations, whereas interactions with objects may provide more meaningful learning opportunities.

Instead, the authors choose $N$ goals with high entropy under what they call the TLDR reward, estimated as follows, and then use the goal-conditioned policy to collect the corresponding $N$ trajectories:

$$
r_{\\text{TLDR}}(s) = \\log \\left( 1 + \\frac{1}{k} \\sum_{z^{(j)} \\in \\mathcal{N}_k(\\phi(s))} \\lVert \\phi(s) - z^{(j)} \\rVert \\right)
$$

where $\\mathcal{N}_k(\\cdot)$ denotes the $k$-nearest neighbors of $\\phi(s)$ within the minibatch.

#### Learning an exploration policy

After the goal-conditioned policy has moved toward a selected goal $g$ for $T_{\\mathcal{G}}$ steps, the exploration policy $\\pi^{\\mathcal{E}}_{\\theta}$ is executed to discover states that are much farther away from those already visited. The objective for this exploration policy can be simply defined as

$$
r^{\\mathcal{E}}(s, s') = r_{\\text{TLDR}}(s') - r_{\\text{TLDR}}(s)
$$

---

### Conclusion

This work introduces TLDR, an unsupervised GCRL algorithm that integrates temporal distance-aware representations and leverages temporal distance for both exploration and goal-conditioned policy learning. By actively seeking states with large temporal distances, TLDR continually explores challenging regions and achieves better overall state coverage. Experiments show that it can cover substantially wider regions of the state space across diverse environments than prior unsupervised RL algorithms.

However, TLDR exhibits slower learning speed than METRA in pixel-based environments. In addition, it does not capture asymmetric temporal distances between states, which can make policy learning difficult in highly asymmetric environments.

---

### References

[Original source #1](https://arxiv.org/pdf/2407.08464)



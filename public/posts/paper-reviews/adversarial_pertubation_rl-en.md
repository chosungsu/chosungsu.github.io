---
title: 'Mitigating adversarial pertubations for deep reinforcement learning via vector quantization'
date: '2024-09-13'
tags: ['adversarial attack', 'paper review']
---

### Abstract

Recent studies have revealed that reinforcement learning (RL) agents that show excellent performance during training can be vulnerable to adversarial perturbations when deployed in practice. This suggests the importance of building robust agents before deployment in real-world environments.

Previous research has focused on developing robust training-based methods to address this issue. For example, approaches include enhancing the robustness of deep neural networks themselves or training agents with strong adversarial attacks (adversarial training).

This study proposes a new approach utilizing input transformation-based defense techniques. Specifically, we propose a method that reduces the impact of adversarial attacks during testing by employing Vector Quantization (VQ) transformation techniques. This method transforms input observations to reduce the space where attacks can have an effect, resulting in transformed observations that are less susceptible to adversarial attacks.

---

### Introduction

__1.Adversarial Attack Defense Techniques__

Various methods have been proposed to defend against adversarial attacks on input observations. Some studies have suggested applying properties such as invariance and smoothness as regularization techniques to enhance the robustness of DNNs. Other research has explored methods to increase the robustness of RL agents through adversarial training. This approach introduces an adversary that adversarially perturbs the input values of RL agents during environment interaction, which is advantageous for optimizing long-term rewards but has the drawback of requiring additional samples and computational costs.

__2.Input Transformation-based Defense Techniques__

In the field of image classification, input transformation-based defense methods that defend against adversarial attacks by transforming inputs without modifying the model are actively being researched. These methods utilize techniques such as denoising input data to weaken attacks or employing image processing techniques to reduce the impact of adversarial attacks.

However, while these methods incur additional computational costs during the learning and inference processes of RL agents and are difficult to extend to RL environments with vector inputs or continuous state spaces, they have the advantage that image processing-based transformation techniques with non-differentiable properties are difficult for adversarial attacks to bypass.

__3.Our Proposal__

To overcome these limitations, this paper proposes an input transformation-based defense technique utilizing Vector Quantization (VQ).

By discretizing the observation space of RL agents and effectively reducing the input space, we can maintain sufficient information about the original environment while minimizing the impact of attacks.

---

### Related Works

__1.Adversarial Attacks on State Observations__

While evaluating the robustness of Dueling Q-Network agents, attacks were performed at each step using FGSM (Fast Gradient Sign Method).
It was confirmed that transferable adversarial examples exist between different DQN models in black box environments.
The concept of state-adversarial markov decision (SA-MDP) was presented by formalizing attacks on state observations.

__2.Robust Training for Deep RL__

Attempts were made to obtain robustness against attacks on state observations using adversarial examples.
Adversarial training was proposed for DQN agents in game environments.
Robustness was improved by applying Lipschitz regularization.
Hinge loss regularization was applied to ensure that the Q-function changes smoothly within a certain range of perturbations.

__3.Input Transformation Based Defenses__

Techniques such as cropping, rescaling, and bit-depth reduction were used to reduce the impact on classification models.
GAN, Diffusion, and other techniques were used for image denoising and reconstruction.

---

### Methodology

__1.Input Transformation based Defense for RL__

Let $f_1$, $f_2$ be functions mapping to $s$, and $π$ be a Gaussian policy with constant independent variance. Assuming this network has Lipschitz continuity, we can obtain the following inequality:

$$
max_{s \in S}({V_{\pi \circ f_1}(s) - V_{\pi \circ f_2}(s)}) \\
\leq \zeta {max_{s \in S} max_{s' \in B(s, \epsilon)} \|f_1(s) - f_2(s')}\|_2
$$

where $v$ is the optimal adversary for $\pi$ and $\zeta$ is a constant independent of $\pi$.

First, considering $f_1$ as an action function, $f_2$ can be designed as a function that reconstructs $s$ from $s'$, which includes minimizing the following. This can be achieved using denoising, but has some drawbacks:

$$
max_{s' \in B(s, \epsilon)} \|s - f_2(s')\|_2
$$

Second, it means designing $f_1$, $f_2$ to reduce differences in the transformed space, minimizing:

$$
max_{s' \in B(s, \epsilon)} \|f_1(s) - f_2(s')\|_2
$$

---

### References

[Original path #1](https://arxiv.org/abs/2410.03376)




---
title: 'ChatVLA: Unified Multimodal Understanding and Robot Control with Vision-Language-Action Model'
date: '2025-12-05'
tags: ['embodied ai', 'paper review']
---

### Abstract

<img src="https://velog.velcdn.com/images/devjo/post/c3e0799c-79a1-420a-a4ed-3892f2520b6a/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Through a systematic analysis of existing training paradigms for Vision-Language-Action (VLA) models, we identify two key challenges: **catastrophic forgetting**, where robot training overwrites critical vision-text alignment, and **task interference**, where competitive control and understanding tasks degrade performance when jointly trained.

To overcome these limitations, the proposed ChatVLA features **gradual alignment training** that progressively integrates multimodal data after initial control proficiency, and a **Mixture of Experts (MoE)** architecture to minimize task interference.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/b53f7591-03e5-4319-845f-d4fa61d5309d/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Recent advances in Vision-Language-Action (VLA) models have primarily prioritized robot behavior proficiency. Models trained on robot control tasks excel at low-level manipulation and physical interaction but often struggle to interpret and reason about multimodal data such as images and text. Pre-trained vision-language models demonstrate impressive multimodal scene understanding but lack the ability to physically interact with environments. This duality highlights a critical challenge.

This work explores how to integrate a single end-to-end neural network capable of multimodal scene understanding, conversational ability, and physical interaction. Approaches include training exclusively on expert demonstration data containing robot behavior trajectories (exemplified by OpenVLA), augmenting robot data with reasoning phrases to guide actions (ECoT, DiffusionVLA), and jointly training on both vision-text pairs and robot data (RT-2).

The model first masters embodied control, then progressively integrates multimodal data to reactivate frozen alignment links. Furthermore, we introduce MoE into MLP layers, which isolates task-specific MLPs while allowing both tasks to share attention layers.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/34b615cc-92b7-4e08-bbf6-35eef7d524ed/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### Architecture

In the context of robot control, we typically construct a demonstration dataset $\text{D}_{\text{robot}} = \{\tau_i\}_{i=1}^{N}$, where each demonstration $\tau_i$ contains a sequence of state-action pairs. The state $s$ consists of an observation (image) $v$ and an instruction (text) $t$, so $\text{s} = (v, t)$. We can express a sequence of state-action pairs as $\tau_i = \{((v_1, t_1), a_1),((v_2, t_2), a_2), \dots ,((v_T, t_T), a_T)\}$, where each tuple $((v_j, t_j), a_j)$ represents the state at time step $j$ and the corresponding action taken, and $T$ is the length of the demonstration.

For multimodal understanding and visual dialogue tasks, we have a dataset $\text{D}_{v-t} = \{\phi_i\}_{i=1}^{M}$, where each data sample $\phi_i$ consists of a visual image $v_i$ and a corresponding question $t'_i$ in text format. Here, $M$ denotes the total number of such image-text pairs.

The goal is to create a unified model that can effectively learn both distributions, enabling it to perform well in both robot control tasks and multimodal understanding scenarios.

#### ChatVLA

Training exclusively on robot data can reduce vision-text alignment, degrading the model's conversational abilities. We will first describe the training strategy used to address catastrophic forgetting, then explain the general architecture of our method to tackle the second challenge.

In terms of gradual alignment training, we identify catastrophic forgetting as a key factor causing VLAs to lose their ability to chat and understand scenes. Since pre-trained VLMs are well-trained and excel at vision-related tasks, it is intuitive that we can reactivate the ability to chat and understand scenes with a small amount of vision-text pair data. In contrast, robot control tasks are much more complex to train, so developing a good model that excels at embodied control tasks should be prioritized.

We demonstrate the use of gradual alignment training to address the catastrophic forgetting problem, enabling the model to retain knowledge from the trained VLM. However, this approach does not fully resolve the task interference problem, as the model must still be jointly trained on both vision-text and robot data. Inputs can belong to either $\text{D}_{\text{robot}}$ or $\text{D}_{v-t}$. Notably, we design a dual router where one handles tasks related to multimodal understanding and dialogue ($\text{f}(\text{FFN}_{v-t})$), and the other learns representations for robot control ($\text{f}(\text{FFN}_{\text{robot}})$). Inputs first pass through multi-head self-attention $x^{l\prime} = \text{MHA}(x^{l-1}) + x^{l-1}$, where $\text{MHA}(\cdot)$ denotes multi-head self-attention.

---

### Conclusion

Integrating embodied control and multimodal understanding in Vision-Language-Action (VLA) models is challenging because current methods often sacrifice one for the other. Robot-only training degrades conversational abilities, while vision-text joint training reduces control performance due to catastrophic forgetting and task interference.

ChatVLA, which combines gradual alignment training and MoE, demonstrates superior performance in real robot control with 3.5× fewer parameters.

---

### References

[Original Source #1](https://aclanthology.org/2025.emnlp-main.273.pdf)

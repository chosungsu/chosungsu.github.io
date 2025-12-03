---
title: 'TWINVLA: DATA-EFFICIENT BIMANUAL MANIPULATION WITH TWIN SINGLE-ARM VISION-LANGUAGEACTION MODELS'
date: '2025-12-01'
tags: ['embodied ai', 'paper review']
---

### Abstract

Vision-Language-Action models (VLAs) trained on large-scale robot datasets have demonstrated strong performance on manipulation tasks, including bimanual tasks. However, since most public datasets focus on single-arm demonstrations, adapting VLAs for bimanual tasks typically requires substantial additional bimanual data and fine-tuning.

To address this challenge, we introduce TwinVLA, a modular framework that composes two copies of a pretrained single-arm VLA into a coordinated bimanual VLA.

Unlike monolithic cross-embodiment models trained on a mixture of single-arm and bimanual data, TwinVLA improves both data efficiency and performance by composing pretrained single-arm policies.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/16acf27d-247d-46e9-afd4-33394b3155ff/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Thanks to large-scale publicly available robot datasets, VLAs have achieved impressive performance in single-arm robot manipulation, generalizing across diverse tasks, objects, and environments.

However, extending this success to bimanual manipulation remains challenging. Public bimanual datasets are scarce, and existing approaches often rely on large proprietary datasets that require thousands of hours of data collection and curation, limiting reproducibility and progress.

#### Leveraging Single-Arm Data

Recent cross-embodiment learning research trains monolithic models on multi-robot datasets using embodiment-specific action decoders or a shared zero-padded action space (Open X-Embodiment Collaboration et al., 2024). While promising, differences in observation and action spaces introduce heterogeneity, forcing a single model to handle disparate action spaces, and monolithic training fails to fully exploit the modular structure inherent in bimanual tasks.

#### Inspiration from Modular Approaches

A modular view of bimanual manipulation is supported by neuroscience: human bimanual manipulation is coordinated through arm-specific motor primitives rather than a single monolithic controller.

Dedicated neural circuits such as the supplementary motor area and the corpus callosum coordinate and synchronize the two arms.

#### TwinVLA Proposal

Concretely, we design a lightweight and compact single-arm VLA, referred to as SingleVLA. We then integrate two such VLAs into a bimanual policy using joint attention, enabling information exchange and coordinated actions while preserving pretrained capabilities.

Because we leverage a Mixture-of-Experts (MoE) style design, this is achieved with minimal computational overhead.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/c7469978-61f6-4517-8ad5-52570eddf403/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### Cloning Single-Arm Policies

To construct TwinVLA from SingleVLA, we copy a pretrained SingleVLA to initialize twin policies for the left and right arms. Instead of duplicating the entire model, we share the visual encoder and the DiT (Peebles & Xie, 2022) action head while fully replicating the VLM.

Each arm has its own lightweight proprioceptive encoder. This design yields a compact 1.3B-parameter model without significantly increasing computational cost.

Visual inputs are processed by the shared encoder and produce readout tokens that are jointly decoded by the shared DiT.

#### Joint Attention for Cross-Arm Fusion

We use a joint attention mechanism inspired by Mixture of Transformers (MoT) to fuse arm-specific inputs. This is achieved by sharing only the self-attention layers while keeping other components, such as projection networks, independent for each arm.

Standard LLMs use a lower-triangular attention mask for causal prediction. Concretely, we treat shared modalities as fully accessible while embedding a lower-triangular mask within each arm's region. Each arm is also allowed to attend to half of the other arm's tokens, enabling symmetric cross-arm interactions without violating autoregressive constraints.

---

### Conclusion

In this paper, we adapt representations from pretrained single-arm VLAs to bimanual tasks, but a current limitation is that the model forgets single-arm manipulation skills after fine-tuning. Future work on mechanisms to prevent such forgetting could integrate diverse data to address data scarcity while improving model interpretability and generalization to unseen tasks.

Moreover, the choice of action space is crucial for VLA models, especially for knowledge transfer. We adopt end-effector (EEF) pose control because it provides embodiment-agnostic representations essential for single-arm transfer strategies.

Consequently, TwinVLA offers a new perspective on solving bimanual manipulation under limited bimanual data by leveraging rich single-arm datasets.

We believe that this principle of using modularity to bridge data availability gaps opens exciting possibilities for other complex robotic domains such as mobile manipulation, thereby amplifying the impact of large-scale robot learning.

---

### References

[Original source #1](https://arxiv.org/pdf/2511.05275)

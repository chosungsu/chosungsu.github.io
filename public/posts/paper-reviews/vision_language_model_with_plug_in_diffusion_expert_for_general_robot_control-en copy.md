---
title: 'DexVLA: Vision-Language Model with Plug in Diffusion Expert for General Robot Control'
date: '2025-12-05'
tags: ['embodied ai', 'paper review']
---

### Abstract

Enabling robots to perform diverse tasks across various environments is a critical challenge in robot learning. While Vision-Language-Action (VLA) models have shown potential for generalizable robot skills, fully realizing their potential requires addressing limitations in action representation and efficient training.

This paper introduces DexVLA, which enhances the efficiency and generalization capabilities of VLAs for complex and long-horizon tasks across diverse robot embodiments. It features a novel diffusion-based action expert scaled to one billion parameters, designed for cross-embodiment learning.

We conduct comprehensive experiments across multiple embodiments, including single-arm, dual-arm, and dexterous hands, demonstrating adaptability to challenging tasks without task-specific adaptation, the ability to learn dexterous skills in new embodiments with limited data, and the capability to complete complex, long-horizon tasks using only direct language prompts such as "fold laundry."

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/eebd07e4-b9be-4810-8958-21357b8aa582/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Realizing the vision of general-purpose robot foundation models faces persistent challenges. Two key bottlenecks impede progress.

Models such as OpenVLA and Octo rely on large corpora such as the Open-X Embodiment dataset or datasets used in $\pi_0$. Collecting such data through human demonstrations is extremely costly and labor-intensive. Moreover, despite enhanced visual and linguistic understanding through internet-scale data pre-training, VLM components remain disconnected from the embodied, sensorimotor context of robot behavior.

Recognizing the limitations of existing action experts, particularly in handling cross-embodiment data, we propose a novel diffusion-based action expert. The diffusion expert leverages a multi-head architecture, where each head corresponds to a specific embodiment, enabling effective learning across diverse morphologies. Furthermore, we scale the diffusion expert's model size to one billion parameters, a significant increase from previous million-parameter scales. We employ a three-stage training strategy that progressively learns more difficult tasks. This is conceptually similar to how humans learn, starting with simple tasks to avoid overwhelming the learner, then gradually introducing complexity.

In Stage 1, the cross-embodiment pre-training stage, we focus on learning low-level, embodiment-agnostic motor skills. We pre-train only the diffusion expert using cross-embodiment data, without including the vision-language model. Next, Stage 2, embodiment-specific alignment, connects abstract vision-language representations to the physical constraints of specific robots. Remarkably, this stage alone enables the model to complete diverse tasks such as shirt folding and bin picking on in-domain objects. Finally, Stage 3, task-specific adaptation, aims to enable robots to master complex tasks. These tasks include completing long-horizon tasks and generalizing to new objects.

---

### Methods

#### Architecture

The DexVLA model is primarily based on a transformer language model backbone (Qwen2-VL). An image encoder is used to project the robot's image observations into the same embedding space as language tokens. For multiple camera views, these visual tokens are concatenated.

The VLM component produces two outputs: reasoning tokens and action tokens. Action tokens pass through a projection module consisting of two linear layers with LayerNorm. This module is similar to connectors designed in vision-language models such as LLaVA and serves to transform the VLM's embedding space to align with the action expert's input requirements. Reasoning tokens are injected into the policy model using FiLM layers, which scale and shift the parameters of projection layers within the policy. As a result, the model can autonomously generate reasoning and leverage this reasoning within the diffusion expert to guide action generation.

Since the action expert dominates the robot's behavior learning process, designing a good neural architecture for better visuomotor policy learning is essential. We leverage Scale Diffusion Policy, which is a DP variant of transformer architecture that was not designed for cross-embodiment pre-training. Each head is responsible for a single robot configuration.

---

### Conclusion

DexVLA is a novel architecture that leverages vision-language models to learn semantic information and uses a one-billion-parameter diffusion expert to learn powerful and generalizable visuomotor policies. By introducing an embodiment curriculum learning strategy, the network can progressively learn from embodiment-agnostic motor skills to complex, embodiment-specific dexterous skills through three training stages.

Furthermore, we integrate sub-step reasoning to enable the model to perform extremely long-horizon tasks without relying on high-level policy models. We evaluate from multiple perspectives, including the ability to perform complex tasks without task-specific adaptation, the ability to fine-tune in new embodiments with limited data, and the capability to execute extremely complex and long-horizon tasks without assistance from high-level policy models.

---

### References

[Original Source #1](https://arxiv.org/pdf/2502.05855)

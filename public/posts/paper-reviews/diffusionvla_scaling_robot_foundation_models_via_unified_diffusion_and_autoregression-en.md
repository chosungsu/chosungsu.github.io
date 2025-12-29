---
title: 'Diffusion-VLA, Scaling Robot Foundation Models via Unified Diffusion and Autoregression'
date: '2025-10-22'
tags: ['embodied ai', 'paper review']
---

### Abstract

This paper presents DiffusionVLA, a novel framework that integrates autoregressive reasoning with diffusion policies to address the limitations of existing methods. While autoregressive VLA models lack accurate and robust action generation, diffusion-based policies inherently lack reasoning capabilities.

The key insight is to use autoregressive reasoning—a task decomposition and explanation process enabled by pre-trained VLMs—to guide diffusion-based action policies. To tightly couple reasoning with action generation, we introduce a **reasoning injection module** that directly embeds self-generated reasoning tokens into the policy learning process. This framework is simple, flexible, and efficient, enabling seamless deployment across diverse robot platforms.

---

### Introduction

Vision-Language-Action (VLA) models have recently emerged as a promising direction in robotics. Among these VLAs, a prominent approach frames action prediction as a next-token prediction task that mirrors the dominant autoregressive paradigm of LLMs, operating by sequentially predicting individual tokens where each token's generation is conditioned on previous tokens. Models such as RT-2 and OpenVLA have demonstrated notable success, but they have inherent limitations.

First, discretizing continuous action data into fixed-size tokens can compromise action consistency and precision. Second, next-token prediction (NTP) is inherently inefficient for action generation, particularly in real-time robot applications where performance is critical.

Numerous methods have demonstrated strong performance on manipulation tasks by modeling action sequence generation as a denoising process. This approach better captures the multi-modal nature of robot behaviors and enables faster sequence generation compared to NTP-based VLA models. However, despite the advantages of diffusion models for policy learning, they lack the crucial reasoning capabilities that enable VLA models to effectively solve complex tasks—a component that clearly improves LLMs.

There is often an implicit gap between logical reasoning and executable robot policies, so simply combining these elements fails to fully leverage reasoning potential. To bridge this gap, we propose a reasoning injection module that reuses outputs and directly inserts them into the policy head, enriching the policy learning process with explicit reasoning signals.

---

### Methods

#### Architecture

<img src="https://velog.velcdn.com/images/devjo/post/bbf2e7c1-c019-43dc-9d55-b4a80a81eb83/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Given any sequence interleaving images, text, and video, we first encode images into dense visual features using SigLIP (Zhai et al., 2023). These encodings are then transformed through a Transformer into a fixed number $N$ of visual embeddings. It is worth noting that visual inputs in robot learning often include multiple camera views. To handle this, we apply a shared SigLIP visual backbone to each view and then concatenate the resulting visual tokens.

For vision-language processing, we leverage Qwen2-VL (Wang et al., 2024b) as the vision-language model. Since vision-language understanding is separated from action generation, it is also possible to use other pre-trained VLMs as backbones, making the overall architecture flexible to accommodate new advanced models.

#### Projection layer for action tokens

Following the final embedding layer of the VLM, a fixed number of action tokens are generated. These tokens are then passed through a projection module consisting of two MLP layers with LayerNorm. This projection module operates similarly to those found in existing vision-language models like LLaVA (Liu et al., 2023b;a), connecting the VLM's output embeddings to the diffusion model and aligning their output dimensions.

The diffusion model itself follows the standard Diffusion Policy design (Chi et al., 2023) with randomly initialized weights. This component also integrates reasoning from the LLM, and an MLP layer is attached to the final layer at the bottom of the action decoder to predict the robot's joint space.

---

### Conclusion

This work presents DiVLA, a state-of-the-art vision-language-action model that delivers strong performance in both simulation and real-world scenarios, including single-arm and dual-arm robots. The key lies in combining next-token prediction objectives with diffusion models—the former used for task reasoning, the latter for action prediction.

The reasoning reuse module introduced to enhance action generation demonstrates strong generalization capabilities, effectively adapting to new instructions, tasks, and environments.

---

### References

[Original Source #1](https://openreview.net/pdf?id=VdwdU81Uzy)

---
title: 'ReVLA, Reverting Visual Domain Limitation of Robotic Foundation Models'
date: '2025-12-03'
tags: ['embodied ai', 'paper review']
---

### Abstract

Recent advances in large language models and access to large-scale robotic datasets have triggered a paradigm shift in robotics, transforming robot models into generalists that can adapt to diverse tasks, scenes, and robotic embodiments. In this work, we study the visual generalization capabilities of three existing robotic foundation models and propose an accompanying evaluation framework.

We show that existing models are not robust to visually out-of-distribution (OOD) scenarios. This can lead to domain limitations in vision foundation models, caused by limited variability in the training data or by catastrophic forgetting. Furthermore, we explore OpenVLA, which employs two pre-trained vision foundation models and is therefore expected to generalize to OOD experiments. However, we demonstrate catastrophic forgetting in OpenVLA by showing that DINO-v2 fails at the task of depth regression.

To overcome the aforementioned issue of visual catastrophic forgetting, we propose a gradual backbone reversal approach based on model merging. This allows OpenVLA, whose training initially requires adaptation of the visual backbone, to recover its visual generalization capabilities. By restoring these capabilities, we achieve improvements of 77% and 66% over OpenVLA on visual OOD tasks for grasping and lifting, respectively.

---

### Introduction

Generalist robotic foundation models built on vision-language models offer a promising path toward agile policies that generalize across tasks, embodiments, and environments. This promise is largely based on the capabilities of underlying large language models such as Llama, and on equipping LLMs with vision encoders so that they can carry out complex tasks requiring both perception and reasoning. Training robotic foundation models that output robot action trajectories requires large amounts of robot-specific data.

While pre-trained vision models themselves are known to generalize well across diverse settings, their adaptation during the training of robotic foundation models can lead to visual domain limitations due to catastrophic forgetting. To quantify the impact of such training approaches and to evaluate the overall generalization ability of robotic foundation models, we develop a realistic OOD evaluation framework based on the SIMPLER environment. This evaluation framework includes challenging visual tasks that use OOD objects and visual distractors. We choose SIMPLER because it addresses two major challenges in simulated robotics evaluation: the control gap and the visual gap.

In this evaluation setting, the goal of reducing the control gap between simulated and real environments is to ensure that policy behaviors executed in simulation produce similar outcomes at the real robot’s end-effector when deployed, thereby minimizing the sim-to-real gap. Meanwhile, mismatches in visual appearance between the simulator and real observations induce domain shifts that can degrade the behavior of learned policies. Thus, SIMPLER provides a realistic setting that is reproducible, low-cost, and fast to simulate, and has been shown to preserve rank correlations of model performance between simulation and real-robot experiments.

---

### Methods

Our goal is to revert the vision foundation model used in OpenVLA back to its original Prismatic state, which was pre-trained on a large corpus of vision-language tasks.

#### Catastrophic Forgetting in OpenVLA

The OpenX dataset forms an important basis for training robotic foundation models, containing more than one million episodes of robot demonstrations. It includes a wide diversity of robot embodiments, tasks, and trajectories, sufficient for training generalist models that can operate across different modalities. However, the variability present in the OpenX dataset focuses primarily on task complexity and embodiment rather than on visual and scene diversity. In contrast, large-scale VLMs are trained on datasets that emphasize visual diversity, and vision foundation models such as DINO-v2 are further trained on partially proprietary data to improve diversity and generalization.

This lack of visual diversity presents specific challenges when training robotic foundation models. RT-2 addresses these challenges by jointly training on the WebLI dataset, but this significantly increases training requirements and thus becomes a limiting factor for open models. In OpenVLA, the risk of forgetting is further amplified because both the vision encoder and the LLM must be fine-tuned simultaneously to reach peak performance, in contrast to the approach taken in the original Prismatic architecture.

To demonstrate catastrophic forgetting in the visual encoder, we leverage DINO-v2 features for depth estimation, using a linear probe and a dense prediction Transformer head. Given the task of regressing depth information, the vision encoder trained within OpenVLA collapses to nearly constant outputs for DPT and produces depth maps without detail for the linear probe, reflecting a loss of spatial understanding. In contrast, the pre-trained DINO-v2 features, particularly when used with DPT, produce high-quality depth maps.

#### ReVLA: Reverting the Vision Backbones

To address the challenge of catastrophic forgetting in the vision encoder while preserving OpenVLA’s training protocol that ensures high-quality robot trajectories, we propose ReVLA, an approach that restores pre-trained vision encoders and their inherent capabilities. We build on the strongest version of OpenVLA trained on the full OpenX dataset and perform encoder restoration using the Fractal RT-1 robot behavior dataset, which uses the same embodiment as the simulator.

In this architecture, visual encoder restoration is carried out during training. The restoration process is inspired by a sequential model-merging approach, in which the weights of one model are gradually integrated into a second model trained differently:

$$
\mathcal{F}_{\theta} = (1 - \alpha) \theta_{\text{OpenVLA}} + \alpha \theta_{\text{Pretrained}}.
$$

Here, $\alpha$ is the mixing weight for the pre-trained DINO weights. For computational efficiency, this linear transition is implemented as a staged curriculum in which $\alpha$ is updated by $\frac{1}{k}$ every $n$ steps. The total number of training steps is $N = k \times n$. In our experiments, we choose $N = \text{100K}$ steps and $n = \text{10K}$ steps.

---

### Conclusion

In this work, we evaluate and address the visual domain limitations of generalist robotic foundation models, focusing on catastrophic forgetting in vision encoders when fine-tuning on robotic datasets. We propose ReVLA, a novel approach that restores visual backbones to their pre-trained state for models that require full-architecture training. This restoration approach successfully mitigates the catastrophic forgetting present in OpenVLA and recovers its visual generalization capabilities.

Our experiments are conducted on the Fractal dataset, which may not fully represent the wide variety of real-world robotic scenarios, particularly across embodiments. Moreover, further exploration of model merging techniques holds the potential for much greater performance improvements by incorporating additional data from robotic datasets.

---

### References

[Original Source #1](https://arxiv.org/pdf/2409.15250)

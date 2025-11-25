---
title: 'RT-Grasp: Reasoning Tuning Robotic Grasping via Multi-modal Large Language Model'
date: '2025-10-20'
tags: ['embodied ai', 'paper review']
---

### Abstract

Recent advances in Large Language Models (LLMs) have demonstrated remarkable reasoning abilities, influencing a wide range of domains. However, their applications in robotics have largely been limited to manipulation planning tasks due to their intrinsically textual outputs.

This paper explores the potential of adopting LLM reasoning capabilities to generate numerical predictions for grasping, thereby addressing this limitation.

We propose a novel method called reasoning tuning, which integrates a reasoning phase before prediction during training. This enables multimodal LLMs to produce accurate numeric outputs, such as grasp poses, that are context-aware and adaptable through dialogue.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/06c6f932-21c7-4d77-9634-da0863f9c48c/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### Bottlenecks and Challenges in Applying LLMs

A major bottleneck lies in the textual nature of LLM outputs, which often poses challenges for tasks requiring precise numerical predictions. Multimodal LLMs bridge perception and planning by understanding both text and images, addressing diverse embodied reasoning tasks. However, they often lack accuracy in image understanding—for example, they may provide general descriptions yet struggle to pinpoint exact object locations.

#### Focus of This Study: Robotic Grasping and Leveraging Reasoning

Traditional robotic grasping methods typically rely on deterministic predictions, which often fail in real-world scenarios due to limited reasoning capabilities. Most existing approaches using CNN-based architectures perform well on benchmark datasets but face difficulties in practical deployment.

Adopting a non-deterministic approach with reasoning capabilities not only enables models to produce practical grasp poses applicable to diverse settings but also allows them to refine predictions based on user instructions.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/5dff5071-2052-4a76-a2bb-ea9a1dee7b63/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### Environment and Definition

In this work, the robotic grasping problem is defined as finding an antipodal grasp perpendicular to a planar surface given an $n$-channel image accompanied by a text command.

The grasp pose $g$ can be parameterized as $g = \{x, y, \theta, w\}$, representing the 2D coordinates of the grasp center, the gripper's rotation angle relative to the horizontal axis, and the width of the grasp rectangle.

#### Framework

A pre-trained multimodal LLM such as LLaVA can be directly fine-tuned in a fully supervised manner given images and text commands. The proposed reasoning tuning introduces structured textual outputs consisting of a reasoning stage followed by numerical predictions.

Using GPT-3.5, we introduce a method to automatically synthesize such image-text datasets that can be applied to tasks beyond robotic grasping.

The reasoning stage provides general descriptions of objects—addressing aspects like shape and location—and suggests corresponding grasp strategies. For example, although colors, designs, or materials may vary, a general grasp strategy for cups is to target the handle or upper edges. Integrating this reasoning step guides the model to establish a broad understanding of objects and associated grasp strategies, facilitating more informed numerical predictions in the subsequent stage.

#### Training Strategy

For each image $I$, we adopt a single-round dialogue data format $(S, A)$, where $S$ denotes the input command and $A$ is the associated target response.

$$
p(A|I,S) = \prod_{i=1}^{l} p_{\theta_m} (a_i | I, S, A_{<i})
$$

Here, $\theta_m$ represents the trainable parameters of the model. $\mathbf{a}_i$ denotes the current predicted token, and $\mathbf{A}_{<i}$ refers to the answer tokens preceding the current token $\mathbf{a}_i$.

---

### Conclusion

This study highlights that the potential of LLMs extends beyond traditional text-centric applications.

For future work, we plan to extend validation by applying this method to grasping datasets featuring a broader range of objects, such as the Jacquard dataset.

---

### 참고 자료

[원본 경로 #1](https://arxiv.org/pdf/2411.05212)

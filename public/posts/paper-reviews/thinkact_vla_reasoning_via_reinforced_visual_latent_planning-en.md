---
title: 'ThinkAct: Vision-Language-Action Reasoning via Reinforced Visual Latent Planning'
date: '2025-10-04'
tags: ['embodied ai', 'paper review']
---

### Abstract

Vision-language-action (VLA) reasoning tasks require agents to interpret multimodal commands, execute long-horizon plans, and act adaptively within dynamic environments. Conventional approaches typically train VLA models in an end-to-end fashion, mapping inputs directly to actions without explicit reasoning, which hampers their ability to plan across multiple steps or adapt to complex task variations.

We introduce ThinkAct, a dual-system framework that connects high-level reasoning with low-level action execution through reinforced visual latent planning.

ThinkAct trains a multimodal LLM to produce embodied reasoning plans guided by action-aligned visual rewards, which are reinforced based on goal completion and trajectory consistency. These reasoning plans are compressed into visual plan latent vectors that condition downstream action models, enabling robust action execution in target environments.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/f8424868-ee01-4364-9db2-c4ef8436384f/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Recent advances in multimodal large language models (MLLMs) have yielded impressive progress on tasks that require understanding multimodal inputs, such as visual question answering and image or video captioning. Although multimodal content can now be perceived and interpreted effectively, executing multi-step plans for long-horizon user goals and interacting with dynamic environments remains challenging for state-of-the-art MLLMs.

To equip VLAs with the ability to solve complex embodied tasks, recent work has explored incorporating explicit Chain-of-Thought (CoT) prompts as intermediate step-by-step guidance. For example, ECoT and RAD introduce data curation pipelines that prompt off-the-shelf MLLMs to produce intermediate steps and decomposed plans. Once annotated CoT traces are collected, VLAs are trained via fully supervised fine-tuning (SFT) to predict these intermediate steps. However, the high cost of generating high-quality reasoning traces renders the resulting models prone to overfitting specific visual scenes or reasoning patterns.

Reinforcement learning has shown substantial promise in encouraging the reasoning behaviors of LLMs by exploring thought traces that maximize reward signals instead of relying solely on fully supervised CoT annotations.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/a3e6d818-50c6-4ff2-b635-11058a22b65b/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

We define the setting and notation for vision-language-action (VLA) reasoning tasks. At each time step $t$, the model receives a visual observation $o_t$ and a textual instruction $l$, and the objective is to predict an action $a_t$. Depending on the embodiment, $a_t$ can be a textual command or a 7-DOF control vector $[\Delta x, \Delta \theta, \Delta \text{Grip}]$.

To tackle this problem, we propose ThinkAct, an integrated framework that leverages an MLLM $\mathcal{F}_\theta$ to reason about high-level plans while interfacing with an action model $\pi_\varphi$ to infer executable actions. Based on $(o_t, l)$, the MLLM $\mathcal{F}_\theta$ generates a visual plan latent $c_t$ that captures high-level intent and planning context.

#### Reinforced Visual Latent Planning for Embodied Reasoning

To enable embodied reasoning that generalizes across diverse environments, we aim to encourage the reasoning capability of multimodal LLMs via reinforcement learning. A naïve approach would have the MLLM reason before producing low-level actions and use the resulting task success rate in the target environment (e.g., LIBERO) as the reward signal. However, this approach is confined to specific simulators without adequate guidance from visual scenes.

To overcome this challenge, we design a novel action-aligned visual feedback signal that captures long-term goals and encourages visual grounding during planning. Specifically, we represent high-level plans as spatiotemporal trajectories of the gripper end-effector projected onto the visual scene, serving as visual-action guidance that steers embodied reasoning.

Given observation $o_t$ and instruction $l$ at time step $t$, the MLLM $\mathcal{F}_\theta$ autoregressively generates a latent embedding sequence $v_t \in \mathbb{R}^{|v_t|\times d}$ for reasoning and a visual plan latent $c_t \in \mathbb{R}^{|c_t|\times d}$. The former is decoded into reasoning steps, while the latter is interpreted as a textual sequence $\tau = [p_k]_{k=1}^K$ of 2D points $p_k \in [0, 1]^2$, where $p_1$ and $p_K$ denote the starting and ending positions of the gripper.

$$
r_{\text{goal}} = \frac{1}{2} \bigl( f(p_1, \hat{p}_1) + f(p_K, \hat{p}_K) \bigr)
$$

We introduce the goal reward $r_{\text{goal}}$ to compare the predicted start and end points with the corresponding points of a trajectory $\hat{\tau} = [\hat{p}_k]_{k=1}^K$ obtained from an off-the-shelf detector.

#### Reasoning-Amplified Action Adaptation

Given the high-level embodied intent inferred by the MLLM, we connect the inferred visual plan latent $c_t$ with the action model $\pi_\varphi$, enabling agents to think before acting and grounding embodied reasoning in the physical world alongside executable actions.

$$
\mathcal{L}_{\text{IL}}(\varphi) = \mathbb{E}_{(o_i, l, a_i)} \left[ \ell \left( \pi_\varphi(c_t, o_i, l), a_i \right) \right]
$$

Concretely, we build on a transformer-based action model $\pi_\varphi$ (e.g., Diffusion Policy) that predicts actions from the current state, consisting of visual observations and language commands. Although $\pi_\varphi$ can operate in the target environment using perception alone, we enhance its capability by conditioning it on the latent plan $c_t$, which encodes high-level embodied intent and planning context. Using annotated action demonstrations, we update only the state encoder, latent projector, and action model through imitation learning.

---

### Conclusion

We presented ThinkAct, a framework that leverages reinforced visual latent planning for vision-language-action reasoning tasks. By combining action-aligned reinforcement learning with reasoning-amplified action adaptation, ThinkAct enables embodied agents to think before acting and to execute robust behaviors in dynamic environments. Extensive experiments on embodied reasoning and robotic manipulation benchmarks demonstrate strong long-horizon planning, few-shot adaptation, and emergent behaviors such as failure detection and self-correction, paving a scalable path toward more deliberative and adaptive embodied AI systems.

Because ThinkAct is built atop pretrained multimodal LLMs, it inevitably inherits their limitations, notably hallucinations in visual or spatial reasoning. These can lead to plans that reference incorrect object attributes or spatial relations, which in turn affect downstream execution. While the proposed latent planning and action grounding partially mitigate these issues, future work on grounding-aware training or hallucination suppression in MLLMs could further enhance robustness and reliability in real-world deployments.

---

### References

[Original Source #1](https://arxiv.org/pdf/2507.16815?)

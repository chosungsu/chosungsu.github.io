---
title: 'SemTra: A Semantic Skill Translator for Cross-Domain Zero-Shot Policy Adaptation'
date: '2025-10-12'
tags: ['embodied ai', 'paper review']
---

### Abstract

This study explores the zero-shot adaptation capability of semantic skills—semantically interpretable expert action patterns—in cross-domain settings. In this setting, user inputs composed of interleaved multimodal snippets can trigger new long-horizon tasks for different domains.

In such cross-domain settings, we present SemTra, a semantic skill translator framework that leverages a collection of multimodal models to extract skills from snippets and adapts these extracted skills to target domains using the reasoning capabilities of pre-trained language models.

This framework uses a two-stage hierarchical structure for adaptation: task adaptation and skill adaptation. This hierarchical adaptation enables the framework not only to infer complex task specifications one-shot from interleaved multimodal snippets but also to adapt to new domains with zero-shot learning capabilities.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/69382a55-0e97-4072-97ca-b53c276e0408/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

#### Potential and Challenges of Zero-Shot Policy Deployment

The potential for zero-shot policy deployment across different domains stems from the ability to immediately apply pre-trained knowledge to unfamiliar environments without extensive data collection or fine-tuning. This capability could revolutionize fields such as autonomous driving and robotics, where safety is critical and a single failure can lead to serious consequences and significant costs. However, achieving robust zero-shot adaptation in these fields remains challenging due to the complexity of given tasks and the dynamic nature of deployment environments.

In the realm of Reinforcement Learning (RL) and Imitation Learning, policy adaptation has been explored to some extent, with researchers utilizing various forms of task specifications to infer given task domains. For example, some studies leverage video demonstrations or expert trajectories from similar domains, while others transition to language commands provided by users or video-language interleaved demonstrations from multimodal user interfaces.

#### SemTra Framework Introduction

We investigate the cross-domain zero-shot policy adaptation problem, focusing on a comprehensive and generalized approach to handle user inputs related to long-horizon tasks across diverse domains. In this study, we consider scenarios where policies are prompted with task-related inputs presented as multimodal interleaved snippets containing video, sensor data, and text elements.

Task Adaptation leverages the reasoning capabilities of pre-trained language models (PLMs) to interpret task specifications. Skill Adaptation uses a parametric approach to instantiate skills and integrate domain context into semantic skills.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/41e357de-0cbf-402a-939c-47827bccfa7f/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### Problem Formulation

We consider a multimodal task prompt $P := (x_1, \cdots, x_N)$ composed of a sequence of snippets, where each snippet $x_i$ is given in one of several modalities such as video, sensor data, and text.

Given a single task prompt $P$, this study builds a framework to find an optimal model $\phi^*$ that maps $P$ to a policy $\pi_P$ to maximize expected evaluation performance.

$$
\phi^* = \arg\max_{\phi} \left[ E_{(D, P) \sim p_{\text{tgt}}(D, P)} [E_D(\phi(P))] \right]
$$

#### Task Adaptation

For a task prompt $P = (x_1, \cdots x_N)$, the presented framework interprets it to generate a sequence of semantic skill embeddings $z_t$. These embeddings are represented in language space and correspond to consecutive time steps $t$ during task execution in the target environment.

$$
\Phi_D \circ \Phi_E : (s_t, P = (x_1, \cdots, x_N)) \mapsto z_t
$$

This adaptation involves a multimodal skill encoder $\Phi_E$ and a semantic skill decoder $\Phi_D$, where each encoder takes input specifications summarized by the task prompt, and the decoder maps encoded specifications to semantic skills to be executed in the target environment.

To train encoder and decoder models, we use a dataset $D = \{(P^i, \tau^i)\}_i$, where $P^i$ is a task prompt and $\tau$ is an expert trajectory in the target environment. Specifically, we use $\tau = \{(s_t, a_t, v_t, l_t)\}_t$ with state $s_t$, action $a_t$, visual observation $v_t$, and semantic annotation $l_t$, where $l_t$ is a description of the skill or action at time step $t$, e.g., "press button."

The encoder $\Phi_E$ transforms the task prompt into skill-level language commands $\eta$.

$$
\Phi_E : P = (x_1, \cdots, x_N) \mapsto \eta := (l_{i_1}^{(\text{src})}, \cdots, l_{i_I}^{(\text{src})})
$$

where each $l_{i_j}^{(\text{src})}$ is a language token. While this study considers three different modalities (i.e., video, sensor data, and text) for snippets, other modalities can be integrated through their respective encoder implementations.

Given skill-level commands $\eta$ and state $s_t$, the semantic skill decoder $\Phi_D$ yields semantic skills $z_t$ for each time step $t$ using two models: a semantic skill sequence generator $\Phi_G$ and a skill boundary detector $\Phi_B$.

$$
\Phi_D : (s_t, \eta) \mapsto z_t
$$

$\Phi_G$ leverages knowledge from PLMs to generate a sequence of target semantic skill embeddings through seq-to-seq translation.

$$
\Phi_G : \eta \mapsto (z_{j_1}, \cdots, z_{j_J})
$$

At each time step $t$, $\Phi_B$ determines whether to continue executing the current skill $z_t$ until task completion or transition to the next skill in the sequence. This evaluates the probability that the ongoing semantic skill terminates.

$$
\Phi_B : (s_t, z_t, s_{t_0}) \mapsto p \in [0, 1]
$$

#### Skill Adaptation

Along with task adaptation that generates semantic skill sequences, the framework also includes a skill adaptation stage where each skill is individually adapted to the target domain.

$$
\pi \circ \Phi_C^{(\text{g})} : (s_t, \eta, \xi) \mapsto a_t
$$

This continuously generates actions $a_t$ for each time step during execution of $\xi$ in the target domain using a context encoder $\Phi_C^{(\text{g})}$ and an action decoder $\pi$. The context encoder transforms semantic skill sequences into a series of executable skills appropriate for the target domain, considering cross-domain context encapsulated in the given task prompt.

$$
\Phi_C^{(\text{g})} : (\eta, \xi) \mapsto (\bar{z}_{j_1}, \cdots, \bar{z}_{j_J}), \quad \text{where } \bar{z} := (z, f_z, d_z)
$$

This involves leveraging knowledge from PLMs to capture domain-specific features from the combined skill-level commands $\eta$ and their associated semantic skill sequence $\xi$.

$$
\pi : (s_t, \bar{z}_t) \mapsto a_t
$$

The action decoder $\pi$ is learned to infer action sequences optimized for the target domain.

---

### Conclusion

We presented SemTra, a semantic skill translator framework that achieves zero-shot policy adaptation across different domains by leveraging knowledge from PLMs.

In this framework, we use a two-stage hierarchical adaptation process, where a sequence of multimodal interleaved snippets serves as task prompts, facilitating semantic skill generation at the task level and refinement at the skill level tailored to target domain context.

Future work will further explore the versatility of PLMs under complex cross-domain conditions that require dynamic adjustment of skill sequences based on real-time observations.

---

### References

[Original Source #1](https://arxiv.org/pdf/2402.07418)

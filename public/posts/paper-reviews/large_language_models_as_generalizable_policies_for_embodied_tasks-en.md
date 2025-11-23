---
title: 'Large Language Models As Generalizable Policies For Embodied Tasks'
date: '2025-10-14'
tags: ['embodied ai', 'paper review']
---

### Abstract

We show that Large Language Models (LLMs) can be adapted as generalizable policies for embodied visual tasks.

An approach called LLaRP (Large LAnguage model Reinforcement Learning Policy) adapts a pre-trained frozen LLM to take text commands and visual egocentric observations as inputs and output actions directly in environments. It is trained using reinforcement learning to see and act only through environment interactions.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/9e09912b-b67e-4237-9c9b-af7c305bedab/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### Capabilities of Large Language Models (LLMs)

Large Language Models (LLMs) are characterized by models with billions of parameters trained on vast amounts of text data and have demonstrated unprecedented language understanding capabilities. Furthermore, LLMs have shown powerful capabilities beyond core language understanding problems, including dialogue systems, visual understanding problems, reasoning, code generation, embodied reasoning, and robot control. These capabilities often emerge in a zero-shot manner without dedicated training data for each capability, suggesting that LLMs contain general and broad knowledge applicable to numerous domains. Moreover, these capabilities emerge despite the fact that input and output spaces of these domains are often not naturally expressed in language (e.g., images as inputs, robot commands as outputs).

#### Integration Challenges of LLMs and Embodied AI

Since a core goal of embodied AI is generalizable decision-making that can transfer to new tasks, it is natural to ask whether the generalization capabilities of LLMs can be integrated into embodied problems.

Prior advances have relied on static expert datasets, which require enormous and expensive diverse expert data. In contrast, embodied AI simulators enable agents to learn from environments through direct interaction, exploration, and reward feedback. However, the generalization capabilities of these agents across many new embodied tasks fall short of the capabilities in the aforementioned domains.

#### LLM Adaptation via RL

LLMs have shown applicability in online settings when control domains are natural language. In this study, we show they can be successfully adapted via reinforcement learning as vision-language policies.

First, we show that using a pre-trained frozen LLM as a vision-language model (VLM) policy with learned input and output adapter layers leads to policies that exhibit strong generalization capabilities.

Paraphrastic Robustness (PR) means that agents produce the same optimal action under linguistic variations where the "intent" of the command does not change. This includes new ways of describing the same action or new ways of referring to seen objects.

Behavior Generalization (BG) means that agents solve tasks that require new optimal actions. This implies that desired action outcomes are distinct from those seen during training.

---

### Methods

#### Problem Formulation

It can be formulated as a Partially Observable Markov Decision Process, defined as a tuple of base state space $S$, observation space $O$, action space $A$, transition distribution $P$, reward function $R$, initial state distribution $\rho_0$, and discount factor $\gamma$.

The observation space is high-dimensional visual observations such as RGB cameras of robots that observe only parts of scenes through egocentric observations.

We consider an extension that includes a goal distribution $G$ and is formulated with reward $R(s, g)$ for $s \in S$ and $g \in G$. We aim to learn a goal-conditioned policy $\pi(a|o, g)$ to maximize the sum of discounted rewards $E_{s_0 \sim \rho_0, g \sim G} [\sum_t \gamma^t R(s_t, g)]$.

#### LLM Backbone

We leverage Large Language Models, which are large-scale autoregressive text prediction models. Given text represented as a sequence of tokens $l$, LLMs are trained to predict each token in that sequence conditioned on all previous tokens $\pi_{\text{LLM}}(l_{K+1} | l_1, \ldots, l_K)$.

Since embodied agent policies must consume visual observations $O$ and predict actions $A$, which are not language tokens, we remove the input and output layers of the LLM. Specifically, the LLM input layer encodes text tokens into vector embeddings $e_k = E_T(l_k) \in \mathbb{R}^D$, while the output layer classifies words.

#### Overall Architecture

<img src="https://velog.velcdn.com/images/devjo/post/2b876595-a02b-4de0-8f7c-d99acc201037/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

LLaRP takes two types of inputs. It conditions on goals $g = (l_1, \ldots, l_k) \in G$ expressed in language. These goals can be embedded into sequences of $D$-dimensional vectors using a language encoder $E_T^\theta$. During policy rollout, it consumes visual observations $o_1, \ldots, o_t$ encoded using a separate learnable observation encoder module $E_V^\phi : O \mapsto \mathbb{R}^D$.

The observation encoder module consists of a vision encoder that produces visual embeddings and an MLP network that projects visual embeddings to language model token embedding dimensions. Encoded text and visual observations produce a sequence of length $k + t$ of $D$-dimensional embeddings, which becomes the input to the LLM backbone $\psi_{\text{LLM}}^\theta$ defined above.

To decode actions as outputs, we use a learnable action output module $D_\omega : \mathbb{R}^D \mapsto \mathbb{D}(A)$ that transforms outputs of the LLM backbone into distributions over actions in $A$. Through two additional adapter modules $D_\omega$ and $E_V^\phi$, we can adapt the LLM to take goal specifications and visual observations up to time $t$ as inputs to output actions at time $t$. The action output module is an MLP that predicts distributions over environment actions.

During training, we freeze the LLM backbone and visual encoder. The frozen visual encoder helps maintain visual features that can generalize to diverse environments. And the frozen LLM backbone helps preserve language reasoning capabilities that may be lost during fine-tuning.

#### Language Rearrangement Problem

To study generalization properties across a large number of language-conditioned tasks, we introduce a new problem called "Language Rearrangement," which attempts to encompass a large number of household environment tasks such as "bring mug to sofa," "store all fruits in refrigerator," and "I'm hungry, bring something from kitchen to table." This problem space extends rearrangement tasks by defining $150,000$ training tasks and $1,000$ test tasks, each with text commands. These tasks require agents to generalize to diverse unseen command concepts that demand multiple object interactions (pick, place, open, close), object search, and logical reasoning (e.g., "if" statements).

In this process, agents are instructed to execute common household activities that culminate in moving objects from specified starting positions to desired goal locations, starting from unseen homes. Agents are provided with natural language commands that specify desired goal states. Sparse rewards are provided upon successful completion of entire tasks or subtasks.

#### Paraphrastic Robustness (PR)

The ultimate goal of training models that can solve tasks from natural language commands is to enable humans to easily provide commands to embodied agents. However, humans exhibit high variability in how they describe tasks.

Paraphrastic Robustness evaluates whether agents can produce the same actions under linguistic variations. These variations include new ways of saying commands and indirectly referring to objects instead of by name. The underlying goals of these commands are included in the training dataset.

#### Behavior Generalization (BG)

Agents must demonstrate new types of actions specified by language commands that do not exist in the training dataset.

---

### Conclusion

In this paper, we introduced LLaRP, a method for leveraging pre-trained LLMs for embodied tasks using reinforcement learning.

It shows superior performance compared to pre-trained Transformer and LSTM-based models in both sample efficiency and generalization. Limitations to address in the future include the large size of LLMs, which is much larger than typical RL models. Additionally, training the action decoder module may hinder the ability of policies to leverage general knowledge from LLMs.

---

### References

[Original Source #1](https://openreview.net/pdf?id=u6imHU4Ebu)

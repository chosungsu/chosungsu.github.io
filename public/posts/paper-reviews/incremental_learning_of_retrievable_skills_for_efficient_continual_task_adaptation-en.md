---
title: 'Incremental Learning of Retrievable Skills For
Efficient Continual Task Adaptation'
date: '2025-09-12'
tags: ['embodied ai', 'paper review']
---

### Abstract

Continual Imitation Learning (CiL) involves extracting and accumulating task knowledge from demonstrations across multiple stages and tasks to achieve multi-task policies.

With recent advances in foundation models, there has been growing interest in adapter-based CiL approaches in which parameter-efficient adapters are configured for newly demonstrated tasks. While such approaches tend to isolate parameters for specific tasks and mitigate catastrophic forgetting, they also limit knowledge sharing across different demonstrations.

To overcome this limitation in knowledge sharing, we introduce IsCiL, an adapter-based CiL framework that incrementally learns shareable skills from different demonstrations. This enables sample-efficient task adaptation using those skills, particularly in non-stationary CiL environments.

In IsCiL, demonstrations are mapped into a state embedding space, where appropriate skills can be retrieved for the input state via a prototype-based memory. These retrievable skills are incrementally learned within their respective adapters. CiL experiments on complex tasks from Franka-Kitchen and Meta-World demonstrate IsCiL's strong performance in both task adaptation and sample efficiency. We also present a simple extension of IsCiL for task unlearning scenarios.

---

### Introduction

Lifelong agents such as home robots must continually adapt to new tasks in sequential decision-making settings by leveraging knowledge from past experience. However, many real-world domains pose significant challenges for such agents: due to the complexity and ever-changing nature of tasks, agents struggle to continuously adapt and to maintain knowledge and operational efficiency. For example, a home robot operating within a single household must continually adapt and learn specific tasks across domains, such as cooking assistance in the kitchen or cleaning in the bathroom. At the same time, it is crucial that the agent not only retains but improves proficiency in previously learned tasks to maintain consistent efficiency across the home.

To support such lifelong agents, Continual Imitation Learning (CiL) has been explored, in which an agent incrementally learns a sequence of tasks over time from expert demonstrations to achieve multi-task policies. However, CiL often faces practical issues:

$\Rightarrow$ High cost and inefficiency associated with comprehensive expert demonstrations required for imitation

$\Rightarrow$ Frequently changing tasks in dynamic and non-stationary environments

$\Rightarrow$ Privacy concerns associated with learning from expert demonstrations

#### The IsCiL Framework

To address these issues, we focus on integrating skill learning and fine-tuning into CiL by leveraging recent advances in foundation models. There is growing interest in continual task adaptation based on multiple adapters learned from foundation models. Adapter-based learning allows parameter isolation for individual tasks, mitigating catastrophic forgetting of previously learned knowledge in CiL.

Motivated by this use of adapters, we develop IsCiL, a new adapter-based CiL framework that addresses the aforementioned practical problems by incrementally learning shareable skills from different demonstrations via multiple adapters. IsCiL facilitates sample-efficient task adaptation using these skills, especially in non-stationary CiL environments. Concretely, the IsCiL framework employs a prototype-based skill incremental learning method with a two-level hierarchy and smaller, more manageable adapters containing a skill retriever and skill decoder.

---

### Related Works

<img src="https://velog.velcdn.com/images/devjo/post/92d1f7d7-1b20-4c7d-8d7b-f9469565ed55/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### 1. Continual imitation learning

To address catastrophic forgetting in continual learning, numerous studies have employed rehearsal techniques that replay past experiences to maintain performance on previously learned tasks.

Another approach incrementally expands model architectures by leveraging additional model parameters, adjusting the structure over time to accommodate new tasks.

However, rehearsal techniques display high variability in forgetting depending on replay ratio and often require substantial training time to integrate new knowledge. In contrast, progressive models require stage identification during evaluation and often overlook unseen tasks.

We propose a CiL framework that leverages pre-trained goal-conditioned model knowledge to enable effective learning and expansion without requiring rehearsal or stage identification.

#### 2. Continual task adaptation with pre-trained models

Recent work uses pre-trained models that accumulate knowledge continually through Parameter-Efficient Tuning (PET) modules such as adapters. These methods improve flexibility and scalability of continual learning systems. However, they suffer from inaccurate matching between adapter selection and learned knowledge, leading to mismatches between knowledge learned during training and knowledge used during evaluation, which hinders overall performance.

In sequential decision-making domains, some studies have explored adapting pre-trained models. However, state spaces are fully partitioned per task, limiting applicability in more integrated environments.

#### 3. Skill adaptation

Reinforcement learning research has improved rapid adaptation through skill discovery and skill priors, focusing on improving sample efficiency through offline datasets. Despite these advances, adapting fixed skill decoders to new environments remains challenging. To overcome such limitations, skill-based few-shot imitation learning methods have been developed. However, these methods require extensive past data and face challenges in scalability and generalization. Even skill-based approaches for CiL still require rehearsal data to mitigate knowledge loss and struggle to address privacy concerns via unlearning.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/2349c9ea-217b-4953-915c-d38d00447f67/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### 1. Problem formulation

In CiL scenarios, consider a data stream of task datasets $\{D_i\}_{i=1}^p$, where $D_i$ contains expert demonstrations for task $\tau_i$, i.e., $D_i = \{d_i^1, \dots, d_i^{N_i}\}$. To effectively represent complex long-horizon tasks, each task $\tau_i$ is composed of a list of sub-goals $\tau = \{g_i^1, \dots, g_i^M\}$. Each task dataset is sampled from a finite-horizon Markov decision process $(\mathcal{S}, \mathcal{A}, P, R, \mu_0, H)$, where $\mathcal{S}$ is the state space, $\mathcal{A}$ is the action space, $P$ is the transition probability, $R$ is the reward function, $\mu_0$ is the initial state distribution, and $H$ is the environment horizon.

For a demonstration $d = \{(s_t, a_t)\}_{t=1}^H$, the state $s_t \in \mathcal{S}$ denotes a tuple $(o_t, g_t)$ composed of observation $o_t$ and sub-goal $g_t$. We express sub-goals via language and use language-based goal embeddings for $g_t$ to achieve language-conditioned policies.

The objective of IsCiL is to obtain a multi-task policy $\pi^*$ such that performance on tasks in the data stream is comparable to their respective expert policies, which is formulated as:

$$
\pi^* = \operatorname*{argmin}_{\pi} \left[ \mathbb{E}_i \left[ \sum_{\tau \in \mathcal{T}_i} \text{KL}(\pi(\cdot \mid s) \parallel \tilde{\pi}_{\tau}(\cdot \mid s)) \right] \right]
$$

where $\tilde{\pi}_{\tau}$ denotes the expert policy for $\tau$, and $\mathcal{T}_i$ denotes the set of evaluation tasks at stage $i$. In this context, evaluation tasks continuously vary across stages.

#### 2. Overall architecture

To effectively handle complex CiL scenarios, we present the IsCiL framework comprising (i) prototype-based skill incremental learning and (ii) task-wise selective adaptation.

(i) Prototype-based skill incremental learning uses a two-level hierarchy as shown above, where the skill retriever $\pi_R$ composes skills for each sub-goal, and the skill decoder $\pi_D$ generates short-horizon actions based on state–skill pairs.

For this two-level policy hierarchy, we employ a skill prototype–based approach that captures sequential patterns of expert behaviors and the associated environmental states observed in demonstrations. These prototypes serve as references for skills learned from multi-stage data streams. Using these skill prototypes, we can effectively convert task-specific instructions or demonstrations into a sequence of suitable skills. Through this prototype-based skill retrieval method, the policy flexibly uses shareable skills across tasks for policy evaluation, whether learned in the past or future. This enables CiL agents to effectively learn diverse tasks, quickly adapt to variations, and incrementally accumulate skill knowledge from multi-stage data streams. Furthermore, to promote sample-efficient learning and improve stability in CiL, we use parameter-efficient adapters that are continually fine-tuned from a base model. Each piece of skill knowledge is encapsulated within a dedicated adapter and integrated into the skill decoder $\pi_D$ to infer expert actions.

(ii) Task-wise selective adaptation devises an efficient task adaptation procedure in the policy hierarchy to adapt to specific tasks using incrementally learned skills. This not only facilitates adaptation to changes in task distributions (e.g., due to non-stationary environmental conditions) but also supports task unlearning in response to explicit user requests (e.g., due to privacy concerns). For instance, suppose a smart home environment is upgraded with a new smart lighting system installed throughout the house. In that case, task-wise selective adaptation can be used for rapid adaptation by removing outdated control routines related to the previous system.

#### 3. Prototype-based skill incremental learning

To facilitate skill retrieval in the state encoder and prototype-based skill retriever, we encode observation–goal pairs $(o_t, g_t)$ into a state embedding $s_t$ using a function $f : (o_t, g_t) \to s_t$. For learning efficiency and to ensure consistent retrieval results, we implement $f$ as a frozen function, mitigating negative impacts from input distribution shifts.

To effectively handle multi-modality of state distributions in non-stationary environments, we use a skill retriever $\pi_R$. To this end, we use multifaceted skill prototypes $\chi_z \in \mathcal{X}$ within the set of learned skill prototypes $\mathcal{X}$. These prototypes capture sequential patterns from expert demonstrations related to specific goal-achievement tasks:

$$
\theta_z = \pi_R(s_t; \mathcal{X}) = h \left[ \operatorname*{argmax}_{\chi_z \in \mathcal{X}} \mathcal{S}(\chi_z, s_t) \right]
$$

For an adapter-conditioned skill decoder to effectively leverage knowledge from the pre-trained base model without forgetting, even in non-stationary environments, the skill decoder is conditioned on parameters. The skill decoder policy $\pi_D(\hat{a}_t \mid o_t, g_t; \theta_{\text{pre}}, \theta_z)$ operates with skill adapter parameters $\theta_z$ and pre-trained base model parameters $\theta_{\text{pre}}$ using Low-Rank Adaptation (LoRA).

To incrementally learn new retrievable skills in skill incremental learning, we update the skill prototype and adapter pair $(\chi_{z^*}, \theta_{z^*})$ for a new skill $z^*$.

#### 4. Task-wise selective adaptation

Given a pre-trained model $\theta_{\text{pre}}$ and learned skill prototypes $\mathcal{X}$ at evaluation time, IsCiL performs the following evaluation process for a given input $(o_t, g_t)$ from the environment:

$$
\hat{a}_t \sim \pi_D(\hat{a}_t \mid o_t, g_t; \theta_{\text{pre}}, \theta_z), \text{ where } \theta_z = \pi_R(o_t, g_t; \mathcal{X})
$$

The evaluation process adapts to new tasks and sub-goal sequences from the environment by modifying the goal $g_t$. Such adjustments enable inference of appropriate current actions in a manner similar to handling learned tasks. For example, a kitchen robot tailored to a particular user's kitchen setup can continually and instantly adapt to recipe variations without additional training.

To ensure privacy preservation for incrementally learned skills during task unlearning, our architecture allows task unlearning by removing task-specific skill prototypes and adapters.

---

### Conclusion

We presented the IsCiL framework to address key challenges of Continual Imitation Learning (CiL). This approach integrates adapter-based skill learning and leverages multifaceted skill prototypes and an adapter pool to effectively capture skill distributions for continual task adaptation.

IsCiL features improved sample efficiency and robust task adaptation, effectively bridging the gap between adapter-based CiL approaches and the need for knowledge sharing across staged demonstrations.

Like other adapter-based CiL approaches, IsCiL requires additional computation for evaluation, which can introduce overhead, especially in resource-constrained environments. Moreover, IsCiL relies on sub-goal sequences for training and evaluation, increasing complexity and resource requirements. Another limitation is determining appropriate sizes of adapter parameters, which depends on the performance of the pre-trained base model and the degree of task variation, making optimal adaptation challenging. Additionally, balancing stability of the embedding function and prototype size remains an area requiring further refinement to achieve optimal performance.

---

### References

[Original Source #1](https://proceedings.neurips.cc/paper_files/paper/2024/file/1f0832859514e53a0e4f229fc9b3a4a2-Paper-Conference.pdf)

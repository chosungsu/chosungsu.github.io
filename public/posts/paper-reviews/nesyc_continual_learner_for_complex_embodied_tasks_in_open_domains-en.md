---
title: 'NESYC: A NEURO-SYMBOLIC CONTINUAL LEARNER
FOR COMPLEX EMBODIED TASKS IN OPEN DOMAINS'
date: '2025-09-10'
tags: ['embodied ai', 'paper review']
---

### Abstract

We explore a neuro-symbolic approach to generalize executable knowledge so that embodied agents can handle complex tasks more effectively in open-domain environments. A key challenge for embodied agents is generalizing knowledge across diverse environments and situations, as limited experience constrains agents to existing knowledge.

To address this, we introduce NESYC, a new framework that mimics the hypothetico-deductive model. It is a neuro-symbolic continual learner that uses Large Language Models (LLMs) and symbolic tools together to continuously formulate and verify knowledge from limited experience.

Specifically, we devise a contrastive generality improvement scheme that iteratively generates hypotheses using LLMs and performs contrastive verification through symbolic tools. This scheme strengthens justification for acceptable actions while minimizing inference of unacceptable actions.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/0263ccb1-c4bb-4d1e-8e95-87a7b180925d/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Recent advances in integrating LLMs with symbolic tools have received significant attention in embodied task planning. However, these systems have not yet been thoroughly explored in open domains, where environments are not limited to predefined tasks or knowledge, and embodied agents must manage diverse scenarios. Traditional approaches rely on symbolic representations of expert-level executable knowledge, limiting applicability and efficiency in real-world situations. The unpredictable and dynamic nature of open domains often leads to incomplete and inconsistent knowledge, complicating the decision-making process of embodied agents.

#### Challenges in Open-Domains

Generalizing previously executable knowledge in open-domain environments within neuro-symbolic systems presents practical challenges:

$\Rightarrow$ Lack of flexibility in applying knowledge to unfamiliar environments.

$\Rightarrow$ Limited methods to bridge gaps between prior knowledge and new environments, leading to repeated action errors in complex situations.

$\Rightarrow$ Misclassification of action affordances or insufficient feedback due to failure to maintain labeled experiences hinders agents' ability to generalize knowledge and improve decision-making.

#### The NESYC Framework

To address problems arising from adopting neuro-symbolic approaches in open domains, we draw inspiration from the hypothetico-deductive model, which emphasizes falsification through experience, mimicking the scientific inquiry process of continuously forming hypotheses, rigorously testing them against available observations, and iteratively refining them.

Following this model, we explore a knowledge generalization strategy that alternates inductive and deductive reasoning, aiming to generalize knowledge applicable to open domains and enable embodied agents to adapt more effectively to unpredictable situations.

---

### Related Works

#### 1. Inductive Logic Programming (ILP)

ILP is a machine learning technique where learned models are expressed as logic programs, i.e., hypotheses (sets of rules), derived from combinations of examples and background knowledge. This general setting is Learning from Interpretations (LFI), where interpretations are expressed as sets of facts.

Given a program BK representing background knowledge and sets of positive examples $E^+$ and negative examples $E^-$, the goal is to find an optimal hypothesis $H$ satisfying:

$$
\begin{cases} \forall e \in E^+, & e \text{ is an interpretation of } H \cup \text{BK}. \\ \forall e \in E^-, & e \text{ is not an interpretation of } H \cup \text{BK}. \end{cases}
$$

Here, BK functions similarly to features in traditional machine learning but is more expressive as it can include relational and example-related information.

#### 2. Answer Set Programming (ASP)

ASP is a declarative programming paradigm well-suited for solving complex combinatorial problems such as planning, particularly useful in non-monotonic domains where dynamics and actions of embodied environments can change future states.

$$
\text{A} \text{ :- } B_1, \dots, B_m, \text{ not } B_{m+1}, \dots, \text{ not } B_n
$$

In this general form, rules consist of a head ($\text{A}$) and a body ($B_1, \dots, \text{ not } B_n$), where each $\text{A}$ and $B_i$ ($1 \le i \le n$) is an atom. The head represents a conclusion, and the body specifies conditions, including positive conditions ($B_1, \dots, B_m$) that must be true and negative conditions ($\text{not } B_{m+1}, \dots, \text{ not } B_n$) where $\text{not}$ represents negation as failure (NAF). NAF assumes that negated conditions are false unless contrary evidence is provided. Rules with empty bodies are facts (e.g., $\text{A}$), and rules with empty heads are constraints, representing conditions that must not be satisfied.

#### 3. Problem Formulation

$$
\pi^* = \operatorname*{arg\ max}_{\pi} \mathbb{E}_{d \sim D} \left[ \sum_{t} \text{SR}(s_t, \pi(\cdot \mid o_t, i_d)) \right]
$$

The open-domain embodied task planning problem is formulated as a tuple $(D, S, A, F)$. $D$ is the domain space of open-domain environments, $S$ is the state space, agents perceive **observations $o_t \in \Omega$** that provide partial information about state $s \in S$ at each time step, and $A$ is the action space.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/8fecd7e6-1539-45f9-8d20-4221f5aec253/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

We propose NESYC, a neuro-symbolic continual learner designed to generalize executable knowledge for embodied agents in open-domain environments. To effectively leverage agents' limited experience, this framework integrates the capabilities of LLMs and symbolic tools.

#### Rule Reformulation

We reformulate generalized knowledge $R$ representing causal rules about action preconditions and effects derived from experience set $T$. To achieve this, NESYC uses a contrastive generality improvement scheme based on ILP.

Experiences in $T$ are converted into example set $E$ consisting of positive examples $E^+$ and negative examples $E^-$ based on action affordances. The generality improvement process is an iterative and reflective process driven by hypothesis generator $\Phi_{\text{hyp}}$ and hypothesis interpreter $\Psi_{\text{interp}}$, which collaboratively improve hypotheses. Through this process, the interpretability of hypothesis $H$ is gradually improved until $R$ is obtained, strengthening logical justification and inference for $E^+$ and $E^-$.

To induce hypothesis $H$ that satisfies both positive and negative examples, we guide the LLM to extract background knowledge BK, which enhances context and facilitates alignment of hypotheses with examples. We then generate $H$ through BK using structured prompts that integrate ILP's $\theta$-subsumption technique combined with batch sampling strategies. The $\theta$-subsumption technique determines whether one clause is more general than another by finding a substitution $\theta$ that makes one clause imply the other. To simplify this process, we leverage LLMs' multi-step reasoning capabilities through a subsumption Chain-of-Thought (CoT) prompt (denoted $l_{\text{sub}}$). The hypothesis generator $\Phi_{\text{hyp}}$ is defined as:

$$
\Phi_{\text{hyp}} : (B, H_b^{i-1}, l_{\text{sub}}, l_{\text{fdb}}^{i-1}) \to (H_b^i, \text{BK}) \text{ where } B \sim E
$$

where $B$ is a batch of $k$ random examples and $H_b^i$ is the hypothesis at batch iteration $b$.

#### Rule Application

Generalized knowledge $R$ is used to complete embodied tasks specified by user instruction $i$. Specifically, NESYC leverages ASP for symbolic tools for action planning and uses a memory-based monitoring scheme.

During task execution, error handler $\Phi_{\text{err}}$ manages interaction experiences from the environment through action executor $\Phi_{\text{exe}}$ and stores them in working memory $M$. When unacceptable actions are detected, $\Phi_{\text{err}}$ re-enters step (i) where $M$ is integrated into experience set $T$ to trigger improvement of $R$. Through improved $R$, NESYC effectively adapts to unpredictable situations.

The task planner uses a symbolic tool that takes $(R, s_t, g)$ when computing action plans, where $R$ is generalized knowledge about action preconditions and effects, $s_t$ is the current state, and $g$ is the goal state.

From action plan $P$ inferred by task planner $\Psi_{\text{plan}}$, action executor $\Phi_{\text{exe}}$ can select individual plans to perform relevant actions in the environment from current step $t$, i.e., $\Phi_{\text{exe}} : (P, s_t, g) \to a_t$. $\Phi_{\text{exe}}$ performs action $a_t$ and sends it along with observation $o_{t+1}$ from the environment as a result of the performed action to error handler $\Phi_{\text{err}}$.

The error handler uses memory-based preservation of trajectory samples to monitor task execution, maintaining consistency between predicted state changes and actual observations. Due to the dynamic nature of embodied environments, plans based on $\Psi_{\text{plan}}$ often fall short of task completion. Based on execution results, $\Phi_{\text{err}}$ measures action affordance $c_t$ and rewrites next observation $o_{t+1}$ to provide a more attentive representation of the environment.

---

### Conclusion

This framework applies a neuro-symbolic approach through two schemes: contrastive generality improvement and memory-based monitoring, which enable the intersection of inductive and deductive knowledge improvement in a continual learning manner. Experiments on ALFWorld, VirtualHome, Minecraft, RLBench, and real robot scenarios demonstrate NESYC's robustness and applicability across diverse open domains. Despite trade-offs involved in using predefined expert knowledge in static settings, the proposed model still shows clear advantages over other LLM-based and neuro-symbolic approaches.

It struggles when applied to smaller LLMs such as Llama-3-8B. In the rule reformulation stage, continuous rule conflicts and errors result in little performance improvement. We plan to explore neuro-symbolic knowledge distillation for resource-efficient embodied control using smaller LLMs.

---

### References

[Original Source #1](https://arxiv.org/pdf/2503.00870)

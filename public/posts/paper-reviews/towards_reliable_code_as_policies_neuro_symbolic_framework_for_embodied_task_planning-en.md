---
title: 'Towards Reliable Code-as-Policies: A Neuro-Symbolic
Framework for Embodied Task Planning'
date: '2025-09-08'
tags: ['embodied ai', 'paper review']
---

### Abstract

Recent advances in Large Language Models (LLMs) have enabled automatic generation of executable code for task planning and control of embodied agents such as robots, demonstrating the potential of LLM-based embodied intelligence.

However, these LLM-based "code-as-policies" approaches often struggle with limited environmental grounding, leading to inaccurate or incomplete code generation, especially in dynamic or partially observable environments, resulting in suboptimal task success rates.

This work proposes a neuro-symbolic embodied task planning framework that integrates explicit symbolic verification and interactive validation processes into the code generation process.

During validation, the framework generates exploratory code that actively interacts with the environment to acquire missing observational information while preserving task-relevant states. This integrated process strengthens grounding of generated code, leading to improved task reliability and success rates in complex environments.

We evaluate the framework in RLBench and real-world environments covering dynamic and partially observable scenarios. Experimental results demonstrate that the framework improves task success rates by $46.2\%$ over code-as-policies baselines and achieves over $86.8\%$ executability of task-relevant actions, enhancing reliability of task planning in dynamic environments.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/63066a7c-01aa-4af4-a1b6-22792395dcc4/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Recent advances in embodied control have leveraged Large Language Models (LLMs) to enable flexible instruction following, effectively connecting natural language understanding with executable actions in physical environments.

For example, SayCan combines LLM-based task interpretation with reinforcement learning (RL) affordance models to build hybrid policies that ground high-level language instructions such as "bring me a sponge" into sequences of low-level, predefined robot skills.

Building on this foundation, subsequent approaches have introduced the code-as-policies paradigm, exploring more expressive and composable action specification through code generation. In this paradigm, LLMs directly generate executable code to control embodied agents. This shift enables more modular, interpretable, and adaptable task planning across diverse environments, highlighting the potential of LLMs as general-purpose planners for robot control.

While LLM-based code-as-policies approaches have shown promising capabilities in fully observable and well-structured environments, reliability degrades in dynamic or partially observable environments where perceptual inputs are often sparse, delayed, or ambiguous. These limitations lead to inaccurate or incomplete code generation, ultimately resulting in suboptimal task performance. For example, attempting to grasp fragile objects without access to accurate depth or height estimates can cause objects to be dropped or damaged, preventing task completion. These issues highlight the critical need for embodied agents to explicitly reason about uncertainty through exploratory yet safe interactions and verify the correctness of generated code before execution.

#### Proposed Framework: NESYRO

We propose NESYRO, a neuro-symbolic robot task planning framework that integrates explicit symbolic verification and interactive validation processes into the code generation process. Inspired by the long-standing software engineering principle of Verification and Validation (V&V), the framework distinguishes two key processes:

$\Rightarrow$ **Verification** ensures that generated code is logically consistent and satisfies symbolic preconditions.

$\Rightarrow$ **Validation** evaluates whether code is appropriate for the current environment and task goals.

After symbolic verification of code correctness, the interactive validation stage grounds each skill by identifying preconditions and invoking exploratory actions that establish those preconditions as effects, thereby transforming the environment state to enable the intended skill. This process resembles a form of backtracking search, where the agent explores the environment to construct valid execution paths and incrementally verifies and validates code based on current observations and feedback from symbolic tools.

---

### Related Works

#### 1. LLM-based embodied control

The field of embodied control has seen a new trend of leveraging LLMs for reasoning and planning tasks. Building on high-level reasoning capabilities, recent approaches have explored generating executable code as direct control policies, often called the "code-as-policies" paradigm. Instead of mapping commands to predefined skills or discrete action primitives, these methods prompt LLMs to generate Python-like scripts that can be directly executed by embodied agents such as robots. This demonstrates that LLMs can synthesize low-level control logic, enabling greater flexibility and generalization across a wide range of tasks.

However, in dynamic or partially observable settings, generated code often lacks proper grounding, leading to incomplete or infeasible outputs. To mitigate these issues, NESYRO improves environmental grounding and reliability of generated code by integrating explicit feedback into the code generation process.

#### 2. Neuro-symbolic system

Recent neuro-symbolic systems combine the generalization capabilities of LLMs with the robustness and interpretability of symbolic reasoning tools. This hybrid approach has been actively studied in areas such as symbolic problem solving, planning, and program synthesis. Neuro-symbolic approaches for embodied agents typically leverage LLMs for perception and natural language instruction understanding while using symbolic tools to perform high-level task planning. However, existing neuro-symbolic agents rely on fixed modular structures or predefined procedures, limiting adaptability to missing observational information and environmental uncertainty. NESYRO integrates symbolic reasoning with interactive validation and exploratory interactions to enable reliable task planning in dynamic environments.

---

### Methods

The environment is modeled as a Partially Observable Markov Decision Process (POMDP) $M = (S, A, G, T, R, \Omega, O)$.

$s \in S$ is a state, $a \in A$ is an action, and $g \in G$ is a high-level goal (e.g., "pick up the red mug"). $T : S \times A \to S$ is a transition function describing dynamics. The reward function $R : S \times A \times G \to \{0, 1\}$ returns a binary success signal, common in robotics where only task completion is observable. Due to partial observability, observations $o \in \Omega$ are received through $O : S \times A \to \Omega$, and observations are expressed in symbolic form as structured predicate-based representations (e.g., is_locked(drawer), on(object, surface)).

Under the code-as-policies paradigm, an LLM takes observation history and goals as input to generate policy code $\pi$ that internally encodes actions needed to complete tasks. The goal is to find policy code $\pi^*$ that maximizes expected return:

$$
\pi^* = \operatorname*{argmax}_{\pi \in \Pi} \mathbb{E}_{g \sim G, \tau \sim P(\text{exe}(\pi), g)} \left[ \sum_{t=0}^{\infty} R(s_t, \text{exe}(\pi)(o_{\le t}), g) \right]
$$

Here, $\tau = (s_0, o_0, a_0, s_1, o_1, a_1, \dots)$ denotes a trajectory generated by executing $\text{exe}(\pi)$ in the environment, and $P(\text{exe}(\pi), g)$ is the resulting trajectory distribution induced by $\text{exe}(\pi)$ under $g, T, O$. In implementation, each action $a_t$ in $\tau$ corresponds to a skill function composed of multiple low-level controls encoded within $\pi$. Since $M$ is partially observable, $\pi^*$ must balance exploration (uncertainty reduction) and exploitation (goal achievement) to ensure reliable task planning in dynamic environments.

<img src="https://velog.velcdn.com/images/devjo/post/07058e5f-9e73-4e36-80d4-2834bd1289a9/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

NESYRO operates in two stages: one that ensures logical correctness of policy code with respect to generated task specifications, and another that evaluates and improves skill grounding to ensure environmental executability.

In the verification stage (Stage 1), given language instruction $g$ and current observations $o_{\le t}$, the LLM generates task specification $T_{\text{spec}}$ along with initial policy code $\pi_{\text{main}}$. The symbolic tool then verifies whether $\pi_{\text{main}}$ satisfies $T_{\text{spec}}$. If verification fails, the symbolic tool provides feedback to the LLM, and $\pi_{\text{main}}$ is iteratively refined until a verified version is obtained.

In the validation stage (Stage 2), the sequence of skills defined in $\pi_{\text{main}}$ is validated sequentially using a neuro-symbolic confidence score (NeSyConf) that integrates symbolic executability and commonsense plausibility. When a skill's confidence score falls below threshold $\epsilon$, NESYRO synthesizes a safe exploratory policy code $\pi_{\text{probe}}$ to recover missing observational information. $\pi_{\text{probe}}$ is processed recursively through the verification and validation stage composition until all skills are grounded. This recursive structure induces a policy tree rooted at $\pi_{\text{main}}$, where each $\pi_{\text{probe}}$ serves as a subroutine that enables successful validation of its parent. The recursive process continues until all necessary observational information is acquired and all skills in $\pi_{\text{main}}$ are validated. The final output is a grounded version of $\pi_{\text{main}}$ that aligns with both $T_{\text{spec}}$ and the current environment.

#### Neuro-symbolic Code Verification

In LLM-based code generation, given language instruction $g$ and observations $o_{\le t}$, the verification LLM ($\Phi_{\text{veri}}$) is prompted to reason in a chain-of-thought (CoT) manner, synthesizing core goals and constraints into task specification $T_{\text{spec}}$. This specification is then used to generate policy code $\pi_{\text{main}}^i$, which defines a sequence of skills along with parameters and required libraries.

$$
\Phi_{\text{veri}} : (o_{\le t}, g, l_{\text{cot}}, D, \pi_{\text{main}}^{i-1}, F_{\text{veri}}^{i-1}, n) \to (T_{\text{spec}}, \pi_{\text{main}}^i)
$$

Here, $o_{\le t}$ are current observations. $l_{\text{cot}}$ is a CoT prompt that guides $\Phi_{\text{veri}}$ to generate specifications as intermediate steps. $D$ represents domain knowledge, consisting of available skills expressed as parameterized function calls and object types and properties that map these skills to the environment. $F_{\text{veri}}^{i-1}$ is verification feedback from the previous iteration, used by the LLM to generate modified $\pi_{\text{main}}^i$. $n$ indicates the skill function call order in $\pi_{\text{main}}$ from which code refinement begins, and calls before $n$ remain unchanged. $n=0$ corresponds to initial code generation. The resulting $T_{\text{spec}}$ captures high-level intent, constraints, and relevant sub-goals derived from $g$ and $o_{\le t}$. $\pi_{\text{main}}^i$ is then passed to the symbolic verification tool.

Next, the symbolic verification tool ($\Psi_{\text{veri}}$) checks whether $\pi_{\text{main}}^i$ satisfies $T_{\text{spec}}$, identifying violations of constraints defined in the specification:

$$
\Psi_{\text{veri}} : (T_{\text{spec}}, \pi_{\text{main}}^i) \to \begin{cases} \text{verified } \pi_{\text{main}} \\ F_{\text{veri}}^i\end{cases}
$$

If verification fails, $\Psi_{\text{veri}}$ provides detailed $F_{\text{veri}}^i$ identifying specific parts of $\pi_{\text{main}}^i$ that violate $T_{\text{spec}}$. This feedback is passed to the next $\Phi_{\text{veri}}$ iteration to generate modified $\pi_{\text{main}}^i$. Once $\pi_{\text{main}}^i$ passes verification and becomes a verified version of $\pi_{\text{main}}$, we proceed to the neuro-symbolic code validation stage.

#### Neuro-symbolic Code Validation

The verified policy code $\pi_{\text{main}}$ is parsed into a sequence of skill function calls $\pi_{\text{main}} = (f_0, f_1, \dots, f_N)$, where $N$ denotes the maximum skill steps. Unlike the neuro-symbolic code verification stage, which reasons holistically over the entire $\pi_{\text{main}}$, the validation process evaluates each skill sequentially to assess and improve executability in the current environment.

To evaluate skill executability, we introduce a neuro-symbolic confidence score (NeSyConf) that combines in parallel the commonsense confidence (CSC) of the validation LLM ($\Phi_{\text{vali}}$) and the logical confidence (LC) of the symbolic validation tool ($\Psi_{\text{vali}}$):

$$
\begin{aligned}
&\Phi_{\text{vali}} : (D, E_{\text{demo}}, o_{\le t}, g, f_n) \to \text{CSC}_{f_n} \\
&\Psi_{\text{vali}} : (D, o_{\le t}, g, f_n) \to \text{LC}_{f_n}
\end{aligned}
$$

$\text{CSC}_{f_n}$ estimates the likelihood that a given skill $f_n \in \pi_{\text{main}}$ will succeed under current observations $o_{\le t}$ and instruction $g$, based on domain knowledge $D$ and retrieved demos $E_{\text{demo}}$. The logic-based confidence $\text{LC}_{f_n}$ is computed by the symbolic validation tool, which evaluates whether $f_n$ is symbolically executable under $o_{\le t}, g, D$. $\text{NeSyConf}_{f_n}$ denotes the final confidence score for $f_n$, computed by multiplying $\text{CSC}_{f_n}$ and $\text{LC}_{f_n}$.

---

### Conclusion

This work presents NESYRO, a neuro-symbolic framework that integrates neuro-symbolic code verification and neuro-symbolic code validation to generate reliable robot control code under dynamic and partially observable settings.

The framework operates through a recursive process that alternates symbolic verification and interactive validation, ensuring each skill is logically consistent and environmentally grounded. By integrating neuro-symbolic confidence estimation that combines commonsense and logic-based reasoning, NESYRO enables exploratory yet safe interactions and adaptive code refinement under uncertainty. Extensive evaluation in simulation and real-world environments demonstrates NESYRO's strong performance across diverse tasks.

The current implementation of NESYRO uses binary LC and predefined domain knowledge, which limits generality in real-world applications. Future work will address this limitation by integrating probabilistic and temporal reasoning such as probabilistic PDDL. We also plan to explore the framework's applicability to more diverse and dynamic domains by relaxing these assumptions and extending the validation process to skills not explicitly defined in domain knowledge.

---

### References

[Original Source #1](https://arxiv.org/pdf/2510.21302)

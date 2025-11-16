---
title: 'Exploratory Retrieval-Augmented Planning For Continual Embodied Instruction Following'
date: '2025-09-28'
tags: ['embodied ai', 'paper review']
---

### Abstract

This study presents the Exploratory Retrieval-Augmented Planning (ExRAP) framework, designed to address continual instruction following tasks for embodied agents in dynamic and non-stationary environments.

This framework enhances the embodied reasoning capabilities of Large Language Models (LLMs) by efficiently exploring physical environments and building environmental context memory, thereby effectively grounding the task planning process in temporally varying environmental contexts.

In ExRAP, when multiple continual instruction following tasks are given, each instruction is decomposed into a query over the environmental context memory and task execution conditioned on the query results. To efficiently handle these multiple tasks that are performed continuously and simultaneously, we implement an exploration-integrated task planning approach that integrates information-based exploration into the LLM-based planning process. Combined with memory-augmented query evaluation, this integrated approach not only allows a better balance between the validity of environmental context memory and the burden of environmental exploration, but also improves overall task performance.

Furthermore, to address the inherent decay of knowledge in memory, we devise a temporal consistency improvement approach for query evaluation. Through experiments using VirtualHome, ALFRED, and CARLA, the approach in this paper demonstrates robustness across diverse embodied instruction following scenarios, including various instruction scales and types, as well as degrees of non-stationarity, consistently outperforming other state-of-the-art LLM-based task planning approaches in both target success rate and execution efficiency.

---

### Introduction

The application of Large Language Models (LLMs) is essential in embodied AI for leveraging common knowledge and immediately applying it to unknown tasks and domains without additional training or data. Researchers are further enhancing task adaptation by integrating environmental information with the inherent common knowledge of LLMs. This capability demonstrates valuable potential in fields such as household robotics and autonomous driving, enabling embodied agents to learn through diverse instruction following tasks with minimal data requirements.

For embodied agents, these tasks are often multiple and continuous rather than simple single, one-time instructions, requiring continuous access to environmental knowledge to effectively reason and plan for user demands. In such scenarios, repeatedly collecting environmental knowledge through interactions each time the agent plans may be suboptimal in terms of efficiency. Moreover, there is a clear need to effectively integrate and manage multiple user requirements.

In this paper, we study continual instruction following for embodied agents where multiple tasks depend on real-time information from continuously changing environments. This setting requires agents to engage in continuous exploration of the environment to adaptively respond to dynamic changes and perform required tasks. To address the continual instruction following problem, we present the Exploratory Retrieval-Augmented Planning (ExRAP) framework, designed to enhance the embodied reasoning capabilities of LLMs by incorporating environmental context memory.

---

### Related works

<img src="https://velog.velcdn.com/images/devjo/post/d4e72588-98d0-4c01-a790-39f669ab782f/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

#### Embodied Instruction Following

Embodied instruction following involves executing complex tasks based on understanding embodied knowledge. It aims to grasp various aspects of physical environments, including objects, relationships between objects, and dynamics, and to plan appropriate sequences of actions or skills to successfully complete tasks specified by instructions.

In the task planning domain, there has been much research on combining the reasoning capabilities of LLMs with environmental characteristics. Recent studies have highlighted the enhanced task planning capabilities of LLMs by leveraging skill affordances to compute values, implementing code-based policies, and generating reward functions. Additionally, LLM-centric environmental modeling approaches that leverage the common knowledge of LLMs and reasoning about actual objects have been introduced. These LLM-based task planning approaches have been applied to a wide range of embodied instruction following tasks, facilitated through iterative interactions with environments, humans, or other agents.

#### RAG for LLM

Retrieval-Augmented Generation (RAG) research has focused on efficiently executing tasks by retrieving and utilizing task-relevant information from databases. In particular, improving the performance of retrievers that suggest relevant data when LLMs require specific knowledge for tasks includes retriever training, fine-tuning LLMs to adapt to RAG processes, or leveraging LLMs themselves for dynamic query reconstruction. In the embodied task planning domain, recent research has adopted integrating RAG with task-specific demonstrations. This paper also uses RAG for embodied task planning but uniquely emphasizes dynamic aspects. For continual instruction following, we prioritize the relevance and importance of agent skills not only to perform tasks but also to ensure continuous and efficient synchronization between environmental changes and the agent's environmental memory.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/9b60c720-351b-469f-90b5-ed9cbb6bbebc/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

#### Continual Instruction Following

We consider a sequence of instructions for embodied tasks that are performed continuously and simultaneously based on specific environmental contexts. In the figure above, instructions involve conditional actions such as opening windows when the temperature is high, or turning off lights when watching TV. Agents continuously explore the environment to check whether conditions are met and execute relevant tasks the moment they are confirmed. In this paper, we refer to this scenario where multiple embodied tasks are conditioned on environmental contexts and performed continuously as continual instruction following.

For a continual instruction following task with conditional instructions $I = \{i_1, \dots, i_M\}$, we consider a non-stationary embodied environment that changes over time. Conditions of continual instructions may or may not be satisfied over time, requiring continuous exploration in the environment.

The goal in this paper is to establish an embodied agent policy $\pi^*$ that maximizes the overall performance of continual instruction following tasks. Specifically, we formulate the reward as a combination of task success rate SR and average pending steps PS. SR is the proportion of completed tasks whose conditions are satisfied, and PS is the average number of steps required to complete tasks related to instruction $i \in I_C$ whenever conditions are satisfied. For instructions $I$ and time step $t$, we formulate the agent policy $\pi^*$ that performs skills from observation $o_t$ as:

$$
\pi^{*} = \underset{\pi}{\text{argmax}} \left[ \sum_{t} \text{SR}(s_t, \pi(o_t, I)) + \mathbb{E}_{i \in I_C} [-\text{PS}(\pi, i)] \right]
$$

#### Overall Framework

To address the challenge of continual instruction following in non-stationary embodied environments, we develop the ExRAP framework. This is designed to minimize the need for environmental interactions while ensuring robust task performance by leveraging memory-augmented and exploration-integrated planning approaches.

In ExRAP, each conditional instruction $i \in I$ is decomposed into two main components: a query $q$ and an execution $e$. The query serves as a condition for task initiation and is evaluated against environmental information. The execution, on the other hand, involves physical interaction manipulations triggered based on query evaluation results. Evaluating queries in non-stationary environments poses unique challenges due to the need for agents to continuously synchronize with constantly changing information. This synchronization often requires continuous exploration, leading to intensive interactions with the environment.

We address this problem through two components: query evaluation with environmental context memory and exploration-integrated task planning.

The former is established through a Temporal Embodied Knowledge Graph (TEKG) to effectively represent dynamic environments. This graph-based context memory-augmented LLM-based query evaluator responds to queries by checking condition satisfaction and provides confidence levels for these evaluations. The latter plans skills that help achieve tasks from an exploitation perspective and also improve evaluation confidence from an exploration perspective.

#### Memory Augmented Query Evaluation with Temporal Consistency

Both the environmental context memory and observations perceived by the agent are represented using a Temporal Embodied Knowledge Graph (TEKG), and this memory is established through the accumulation of these observations. Queries derived from given instructions are evaluated against the context memory, considering the inherent information decay in previously accumulated data.

A TEKG consists of a set of quadruples $\tau = (s_e, r_e, t_e, t)$ composed of a source entity $s_e$, a relation $r_e$, a target entity $t_e$, and a time step $t$. The environmental context memory at a specific time step $t$ within the TEKG is defined as:

$$
G_t = \{\tau_1, \tau_2, \cdots, \tau_N\}
$$

To integrate the current observation $o_{t+1}$ into the previously established latest memory $G_t$, we use an update function $\mu$ as follows:

$$
G_{t+1} = \mu(G_t, o_{t+1}) = \left( \{\tau \in G_t \mid c(\tau, \tau') = 0, \forall \tau' \in o_{t+1}\} \right) \cup o_{t+1}
$$

where $c$ is a function that detects semantic contradictions between quadruples, such as when $\tau$ and $\tau'$ indicate that $\text{TV}$ is both "off" and "on". It returns $1$ if there is a contradiction, and $0$ otherwise. The constructed memory $G$ serves as a knowledge database for continual instruction following, enabling retrieval of environmental information related to specific task instructions such as instructions, queries, and executions.

An instruction interpreter $\Phi_I$ processes continual instructions $I = \{i_1, \dots, i_M\}$ and converts them into queries $Q$ and task executions $E$.

A memory-augmented query evaluator $\Phi_M$ estimates the likelihood $P(q|G_t)$ that a query $q \in Q$ is satisfied using past memory accumulated over time, $G_{1:t} = G_1 \cup \dots \cup G_t$. Leveraging a memory-augmented $\text{LLM}$ ($\Phi_{\text{LLM}}$), we develop the query evaluator $\Phi_M$ by integrating query evaluation from the previous step $P(q|G_{t-1})$ and the prior probability of query evaluation $R(q|G_{t-1})$. Since there is inherent information decay in memory over time, we incorporate entropy-based temporal consistency as an intermediate step in query evaluation. We assume that the entropy of the prior query response at time step $t$ should be higher than the entropy at time step $t-1$.

$$
H(R(q|G_{t-1})) > H(P(q|G_{t-1}))
$$

---

### Conclusion

In this paper, we introduced the ExRAP framework to facilitate efficient integrated planning for multiple instruction following tasks that are performed continuously and simultaneously in embodied environments.

Through an extended RAG architecture, this framework achieves both efficient environmental exploration and robust task completion by integrating memory-augmented query evaluation and exploration-integrated task planning approaches. Experiments conducted on VirtualHome, ALFRED, and CARLA demonstrate that ExRAP exhibits robustness across diverse continual instruction following scenarios and clearly shows superiority over other LLM-centric task planning approaches.

---

### References

[Original Source #1](https://proceedings.neurips.cc/paper_files/paper/2024/file/7bacd0ebd061d4694583ae0eb69ad15f-Paper-Conference.pdf)

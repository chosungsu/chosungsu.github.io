---
title: 'Generative Multi-Agent Collaboration in Embodied AI: A Systematic Review'
date: '2025-10-02'
tags: ['embodied ai', 'paper review']
---

### Abstract

Embodied Multi-Agent Systems (EMAS) are attracting growing interest for their potential to solve complex real-world problems in domains such as logistics and robotics. Recent advances in foundation models are opening the door to generative agents capable of richer communication and adaptive problem-solving.

This paper offers a systematic review of how EMAS can benefit from these generative capabilities. We propose a taxonomy that classifies EMAS by system architecture and embodiment modalities, highlighting how collaboration unfolds across both physical and virtual contexts.

We then analyze core components—perception, planning, communication, and feedback—to explain how generative techniques strengthen system robustness and flexibility. Through concrete examples, we demonstrate the transformative effects of integrating foundation models into embodied multi-agent frameworks.

---

### Introduction

Embodied Multi-Agent Systems (EMAS) are receiving increased attention for their significant potential in areas such as smart transportation, logistics, and manufacturing. By integrating physical embodiment—from autonomous vehicles to robotic manipulators—with Multi-Agent Systems (MAS), EMAS provide decentralized collaborative approaches that can handle complex tasks with impressive efficiency. Despite these advantages, designing and implementing effective EMAS remains challenging, often demanding cybernetics expertise, extensive training data, and carefully tuned reinforcement learning paradigms.

Recent innovations in foundation models (FMs)—including Large Language Models (LLMs) and Vision-Language Models (VLMs)—have opened new avenues to push MAS toward more adaptive and generative behaviors. By equipping agents with natural language capabilities, contextual reasoning, and the ability to synthesize novel solutions, FM-based MAS transcend limitations inherent in purely signal-centric or reinforcement-driven frameworks. These “generative agents” can communicate in semantically rich ways, collaborate with human-level fluency, and rapidly adjust strategies in response to unforeseen challenges. Consequently, FM-based agents can transform how multi-agent collaboration unfolds in both physical spaces populated with embodied devices and virtual spaces where agents share abstract knowledge and tasks.

---

### Related works

<img src="https://velog.velcdn.com/images/devjo/post/4d78f86b-be80-4296-8b09-43e6cd851d9c/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

#### Extrinsic Collaboration

We refer to scenarios where collaboration unfolds between multiple embodied entities as extrinsic collaboration, where agents interact physically or virtually to achieve shared goals. Drawing from longstanding multi-robot and classical MAS literature, extrinsic collaboration can be organized using centralized or decentralized strategies, each offering distinct trade-offs around scalability, communication overhead, and global versus local control.

In centralized policy frameworks, a single unified model governs multiple robots or agents, providing centralized task allocation and decision-making. The centralized model assigns tasks based on agent capabilities and system objectives, offering a global viewpoint that ensures coordination across agents. For example, centralized models have been used to determine navigation targets, drive QA models for interactive question answering, and guide leader robots to resolve deadlocks in multi-robot systems.

Decentralized strategies grant each model independent control over its embodied entity, enabling greater flexibility and scalability. Early studies leveraged reinforcement learning for decentralized control, but the emergence of FMs has given rise to more advanced distributed systems, allowing agents to autonomously handle diverse tasks.

#### Intrinsic Collaboration

While extrinsic collaboration involves multiple robots and embodied entities, intrinsic collaboration occurs within the internal structure of a single system that may include multiple FMs. This concept aligns with the growing demand for collaborative workflows among heterogeneous FM modules, each specializing in different roles to jointly address increasingly complex tasks. Such internal organization extends traditional notions of multi-agent coordination by focusing on integrated decision-making within a single embodiment.

In these workflows, each FM fulfills specific functions or roles to collaboratively complete tasks. Studies have applied this paradigm to embodied learning systems—for instance, deploying modules such as planner, patroller, and performer to solve tasks in the Minecraft sandbox, or using plan–execute–revise–verify frameworks for self-modification without simulators.

---

### Methods

#### Perception

Although generative models can derive semantic knowledge from text and vision, embodied agents must actively perceive and interpret the physical world.

The simplest way to provide FMs with physical context is to furnish linguistic descriptions of the environment. While such prompts can be handcrafted, many approaches augment linguistic descriptions with automated tools. Some studies use vision models to detect and describe objects, whereas others employ affordance learning to enrich the FM’s understanding of how objects can be manipulated in physical settings. Beyond passively receiving information, recent work empowers agents to decide when and what types of information to observe, facilitating active perception.

#### Planning

Planning is a core module in multi-agent embodied systems, enabling agents to strategize based on states, goals, and individual capabilities.

Planning approaches often adopt language-based or code-based formats. Language-based planning relies on natural language to guide workflows. Beyond individual decision-making, multi-agent collaboration requires consensus building, conflict resolution, and resource sharing. In centralized systems, a single model frequently assigns sub-tasks.

---

### Conclusion

This paper explores the popular and promising research area of multi-agent collaboration in embodied systems, focusing on how generative foundation models (FMs) can be integrated into Embodied Multi-Agent Systems (EMAS).

We highlight how FM-based generative agents foster dynamic collaboration and emergent intelligence, systematically examining multi-agent collaboration architectures from both intrinsic and extrinsic perspectives while emphasizing key techniques such as perception, planning, communication, and feedback mechanisms.

---

### References

[Original Source #1](https://arxiv.org/pdf/2502.11518)

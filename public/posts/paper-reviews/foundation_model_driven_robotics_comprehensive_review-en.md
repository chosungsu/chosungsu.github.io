---
title: 'Foundation Model Driven Robotics, A comprehensive Review'
date: '2025-09-08'
tags: ['embodied ai', 'paper review']
---

### Abstract

The rapid emergence of foundation models centered on large language models and vision-language models has introduced a transformative paradigm in robotics. These models provide powerful capabilities in semantic understanding, high-level reasoning, and cross-modal generalization, enabling significant advances in perception, planning, control, and human-robot interaction.

Key enabling trends such as procedural scene generation, policy generalization, and multi-modal reasoning are discussed alongside critical bottlenecks including limited embodiments, lack of multi-modal data, safety risks, and computational constraints. This paper identifies both the architectural strengths and critical limitations of foundation model-driven robotics, highlighting unresolved challenges in real-time operation, grounding, robustness, and trust.

---

### Introduction

Robot systems still lack human-level intelligence, particularly in the flexibility, adaptability, and generalization required for real-world applications. They often struggle to transfer knowledge across tasks, adapt to unexpected scenarios, or exhibit the nuanced decision-making that characterizes human behavior. Traditionally, robot autonomy has been based on explicit programming or narrow task-specific learning.

The recent integration of LLMs into robotics introduces a new paradigm that leverages their rich semantic knowledge and reasoning capabilities to improve communication, planning, and adaptability of robot agents. This enables interpreting high-level human commands, reasoning about goals and actions, and even generating low-level control code. It enables more general-purpose robot intelligence that allows robots to leverage vast prior knowledge learned from language to handle a broader range of tasks and environments.

However, LLMs alone lack physical grounding. They are embodiment-agnostic and inherently do not understand metrics, sensor data, or dynamic physics. Progress across diverse environments, from simulation to open worlds, reveals both the potential and current limitations of LLM-based robotics. Key bottlenecks including semantic grounding and real-time performance are discussed alongside emerging solutions that help bridge the gap between language understanding and physical execution.

---

### Methods

#### Foundation

<img src="https://velog.velcdn.com/images/devjo/post/7338212a-f29f-4faa-88f7-2394a8243e9b/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

As LLMs become central to enabling high-level cognition in robots, from user intent interpretation to generating executable plans, their architectural and functional progress provides crucial context for evaluating suitability in deployed settings. Latest-generation models further extend these capabilities through support for visual inputs, refined reasoning, and improved conversational management. Concurrently, open-source alternatives have introduced accessible and fine-tunable models deployable on local hardware, an important consideration for privacy-sensitive real-time robot systems.

However, robot systems often rely on rich perceptual inputs, which requires models that go beyond text processing to interpret visual data alongside language. VLMs extend LLMs with visual perception capabilities, enabling multi-modal reasoning for tasks such as image captioning and visual question answering, all of which are important for understanding grounded language in robotics.

Early efforts introduced joint architectures to align visual and textual features, laying the foundation for perception-based interaction. In particular, contrastive learning approaches such as CLIP demonstrated open-vocabulary visual recognition using image-text embeddings. This allows robots to recognize objects by name without explicit category training, supporting capabilities such as semantic mapping and object retrieval from language prompts. Subsequent VLMs further expanded multi-modal training, showing that unified transformer architectures trained on large image-text corpora can generalize across tasks with minimal supervision.

#### Integration in Robotics

<img src="https://velog.velcdn.com/images/devjo/post/9748eff7-16ac-4c3d-9ac7-9a9be02762e3/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Visual perception in robotics has seen a leap in generalization due to large-scale VLMs. Traditional robot vision systems were constrained by limited training data and narrowly defined object categories. In contrast, OpenAI's CLIP model learns visual concepts from 400 million image-text pairs, enabling zero-shot recognition and allowing robots to identify new objects or scenes simply by providing text labels, eliminating the need for task-specific training for each category. These capabilities dramatically improve open-world perception.

Traditional planners required explicit programming or extensive task-specific training for diverse scenarios. In contrast, GPT-3 and GPT-4 models provide rich prior knowledge about action sequences, commonsense reasoning, and world knowledge. These models can decompose abstract goals into coherent steps without additional training. However, directly relying on LLM-generated plans can lead to failures when proposed actions exceed the robot's physical capabilities or constraints. A critical development addressing this limitation is the SayCan framework, which integrates semantic reasoning with feasibility estimation based on the robot's learned affordances. LLMs propose high-level actions (e.g., "grab the sponge," "wipe up the spill") while affordance models evaluate the likelihood of successful execution in the current context.

At the level of motion control and policy execution, foundation models introduce mechanisms for generalization and adaptability in robotics. One research direction uses large models directly as policy networks under the idea of generalist controllers that can operate across many tasks and embodiments. A notable example is DeepMind's Gato, a transformer model trained on data from over 600 tasks including game playing, image captioning, and physical robot manipulation. It can generate text or token commands depending on the input modality, demonstrating cross-domain policy flexibility. While not outperforming specialized models, it validates the viability of multi-task, multi-modal control architectures.

#### Open World

Recent advances in foundation models have shown remarkable potential to extend robot autonomy beyond narrowly scripted tasks to open-world, unstructured environments.

To address the complexity of open-world environments, several approaches integrate multi-modal perception with language-conditioned reasoning to generate adaptive task plans. Key strategies involve decomposing high-level commands into action sequence chains that map abstract goals to executable locomotion and manipulation primitives. VLMs first parse scenes and instructions to extract semantic and spatial information, and LLMs synthesize temporally aligned action chains. This decomposition integrates affordance reasoning to ensure that generated sub-goals are physically grounded in the robot's embodiment and current environmental context. This affordance-based decomposition helps mitigate infeasible or unsafe sub-actions by continuously verifying object availability, graspability, and reachable surfaces.

Beyond high-level planning, open-world operation requires adaptive control policies that can generalize across tasks, environments, and embodiments. Generalist policy architectures address this through large vision-language-action models that learn end-to-end mappings from sensory inputs and task descriptions to continuous motor outputs. Nvidia's Groot exemplifies this type of model through a similar architectural design where a vision-language transformer interprets observations and goals, and a diffusion-transformer policy generates temporally consistent high-dimensional motor commands.

---

### Conclusion

Current foundation models are computationally intensive and often too slow for onboard robot deployment. Their high inference latency and memory usage conflict with the strict real-time requirements of autonomous robots. These limitations hinder closed-loop control and rapid decision-making. Progress in model compression, distillation, and on-device optimization is needed to meet the latency and power constraints of robot platforms.

Foundation models are primarily trained on internet-scale text or image data with limited exposure to robot-specific information. They fail to capture the long tail of physical scenarios and edge cases that are critical for reliable perception and control. This embodiment gap means models may not yet fully understand real dynamics or sensor modalities. Bridging this gap will require extensive robot-relevant training data through simulation-generated experiences and collaborative data collection to ground models in physical reality.

Models can hallucinate incorrect outputs or be manipulated by adversarial prompts, potentially leading to physically harmful behaviors. Traditional robot safety measures do not cover these failure modes, and current LLM safety techniques overlook the physical context of robot operation.

---

### References

[Original Source #1](https://arxiv.org/pdf/2507.10087)

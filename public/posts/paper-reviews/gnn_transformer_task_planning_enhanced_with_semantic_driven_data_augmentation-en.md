---
title: 'GNN-Transformer Task Planning Enhanced with Semantic-Driven Data Augmentation'
date: '2025-10-10'
tags: ['embodied ai', 'paper review']
---

### Abstract

Since natural language is the most intuitive means for humans to interact with robots, natural language command-based task planning has been a long-standing research area. Large Language Models (LLMs) have significantly improved task planning by enhancing understanding of language and common sense. However, current methodologies face several issues:

$\Rightarrow$ Lack of deep understanding of physical environments.

$\Rightarrow$ Performance heavily depends on prompt examples.

$\Rightarrow$ LLMs are too large and not tailored to specific tasks.

$\Rightarrow$ Planning costs remain high.

To overcome these issues, we introduce the GNN-Transformer Task Planner (GTTP), designed to leverage semantic environments and integrate historical state data to predict task-level actions.

The GTTP architecture is scalable using GNN layers, and transformer layers facilitate understanding of task progress. Additionally, by using a text encoder to embed environments, it can be trained on simulated datasets and directly applied to real-world scenarios.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/43601d5e-b169-447f-8777-7e8f1c328bfd/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

#### Advances and Limitations of LLM-Based Task Planning Research

Huang et al. (2022) and Singh et al. (2023) show that LLMs serve as high-level planners through prompt engineering, integrating allowable actions, robot states, and environments into prompts. However, this approach requires carefully designed prompts to achieve desired results and heavily depends on examples within prompts. Moreover, these planners struggle with execution feasibility guarantees and plan optimization.

To overcome these limitations, Monte Carlo Tree Search methods are used to improve exploration efficiency through common-sense knowledge.

#### GTTP Framework Proposal and Contributions

It takes scene graphs incorporating semantic information about objects as input, which are encoded through a text embedding module. This information is processed by GNNs to accommodate varying numbers of objects and combined with transformer models to consider historical states. The planner selects the most confident and executable high-level plan for execution. Advantages of GTTP include superior performance compared to other models, scalability up to $715$ objects, and excellent sim-to-real transferability.

Training the model requires substantial amounts of data, which is currently insufficient. To overcome this, we propose an LLM-based semantic data augmentation method that can automatically generate $14,666$ data points from just $45$ seed data points. This method uses semantic object information to automatically augment task plans and annotate them with language commands, while also evaluating commonsense validity to ensure data quality. This approach significantly reduces human effort, enhances training robustness, and improves efficiency in developing large-scale datasets.

---

### Methods

To address the command-driven high-level task planning problem, we introduce a GNN-Transformer task planner where inputs consist of a goal command $I$ and a state graph history $g_{0:t}$.

<img src="https://velog.velcdn.com/images/devjo/post/22dae9cd-3eb3-40fa-a3dc-08c3c2e7fc56/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

The goal command $I$ and scene graph $g_t$ are encoded by a command encoder $\phi_I$ and a scene graph encoder $\phi_g$, respectively. Then, the encoded goal command and scene graph are fed into a subgoal planning network $F_{\pi}$ along with the history of previous state graphs to estimate the probability distribution of potential subgoals based on the context of the ongoing task sequence. Consequently, a subgoal selector chooses the executable subgoal $\pi_{t+1}$ with the highest probability.

#### Encoding Scene Graphs and Instructions

Each node $v_t^i$ and edge $e_t^{ij}$ of the scene graph $g_t$ contains semantic information about the environment in JSON format, as shown in the figure above. The scene graph encoder $\phi_g$ leverages a text embedding model to transform $v_t^i$ and $e_t^{ij}$ into 384-dimensional vectors called node features $\hat{v}_t^i$ and edge features $\hat{e}_t^{ij}$, respectively. The embedded scene graph $\hat{g}_t$ preserves the original graph structure, maintaining semantic relationships between objects.

A command sentence $I$ is input to the command encoder $\phi_I$ to produce command features $\hat{I}$ consisting of a sentence embedding vector $u$ and a set of token embeddings $l_{0:m}$ (where $m$ is the number of tokens). In this paper, Sentence-BERT (Reimers and Gurevych 2019) is adopted for both the state encoder $\phi_g$ and goal encoder $\phi_I$ to ensure they share the same latent space.

#### Subgoal Planning Network Architecture

We propose a subgoal planning network that processes the history of encoded state graphs $\hat{g}_{0:t}$ and encoded command features $\hat{I}$ to plan subgoals $\pi_{t+1}$.

The graph feature extractor uses GNN layers, a graph token generator, and a progress context fusion module to interpret both encoded scene graphs and encoded commands. To extract task-related features from a given scene graph $\hat{g}_{0:t}$ and goal command $u$, we use a stack of GNN layers.

We design three update functions, and the edge update function $\rho_t$ is formulated as:

$$
\tilde{e}_{t}^{ij} = \rho_e(\hat{v}_t^i, \hat{v}_t^j, \hat{e}_t^{ij}, u) = g(\hat{v}_t^i \| \hat{v}_t^j \| \hat{e}_t^{ij} \| u)
$$

where $g(\cdot)$ is a Multilayer Perceptron (MLP) function and $\|$ denotes vector concatenation. Each updated edge $\tilde{e}_{t}^{ij}$ aggregates information from connected nodes and the provided command feature $u$.

Next, node features $\tilde{v}_t^i$ are updated by function $\rho_v$:

$$
\tilde{v}_t^i = \rho_v(\hat{v}_t^i, N_t^i, u) = g\left(\hat{v}_t^i \| \frac{1}{|N_t^i|} \sum_{k \in N_t^i} g(\hat{v}_t^k \| \tilde{e}_{t}^{ki}) \| u\right)
$$

where $N_t^i$ is the set of neighboring nodes of $v_t^i$. The updated node $\tilde{v}_t^i$ incorporates surrounding environmental information.

Finally, $u$ is inserted as a global feature of the graph and updated by simply averaging all updated nodes:

$$
\tilde{u}_t = \rho_u(\tilde{V}_t, u) = g\left(u \| \frac{1}{|\tilde{V}_t|} \sum_{i \in \tilde{V}_t} \tilde{v}_t^i\right)
$$

where $\tilde{V}_t$ is the set of updated node embeddings. In this paper, the number of GNN layers $N_{\text{GNN}}$ is set to $3$, and the dimensions of updated nodes, edges, and command features are reduced to $256, 128, 64$, respectively.

#### Subgoal Predictor

The subgoal predictor interprets historical state information to produce probability distributions for the next action and next target object ($p(a_{t+1})$ and $p(o_{t+1})$). The overall structure is a modified version of the standard transformer architecture.

Initially, the Task Encoder consumes a sequence of state tokens with positional embeddings to generate task tokens that encode historical information of the ongoing task. These task tokens are element-wise added with positional embeddings and then fed to both the action decoder and object decoder to convey sequential historical features. The action decoder uses state tokens to output action probabilities for each input state through MLP and softmax layers. The object decoder uses updated node embeddings $\tilde{V}_t$ to find important target objects among them.

---

### Conclusion

The architecture introduced in this paper combines GNN layers for interpreting semantic information from scenes and managing varying numbers of objects, and transformer layers for considering historical processes. Additionally, we present a semantics-based augmentation method that enables building large-scale, high-quality training datasets with minimal human intervention.

Experiments demonstrate that the proposed method significantly outperforms baseline algorithms across tasks of varying lengths while maintaining robustness. Moreover, planners trained solely on simulation data prove effective in real-world environments. This demonstrates superior performance, scalability in complex environments, and effective sim-to-real transferability. Future work aims to refine the augmentation method to broaden task planning diversity and improve validation processes. We also plan to enhance GTTP by considering robot action affordances and supporting replanning upon failure.

---

### References

[Original Source #1](https://ojs.aaai.org/index.php/AAAI/article/view/33598)

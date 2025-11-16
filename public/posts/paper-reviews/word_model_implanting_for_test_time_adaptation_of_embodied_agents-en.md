---
title: 'World Model Implanting for Test-time Adaptation of Embodied Agents'
date: '2025-09-28'
tags: ['embodied ai', 'paper review']
---

### Abstract

A persistent challenge in Embodied AI is enabling agents to robustly adapt to new domains without extensive data collection or retraining.

To address this, we present the World Model Implanting (WorMI) framework, which combines the reasoning capabilities of Large Language Models (LLMs) with independently learned domain-specific world models through test-time composition. By allowing seamless injection and removal of world models, the policies of embodied agents achieve and maintain cross-domain adaptability.

The WorMI framework uses a prototype-based world model retrieval approach that leverages efficient trajectory-based abstract representation matching to integrate relevant models into test-time composition. We also develop a world-wise compound attention method that not only integrates knowledge from retrieved world models but also aligns their intermediate representations with those of the reasoning model within the agent policy. This framework design effectively fuses domain-specific knowledge from multiple world models, ensuring robust adaptation to unknown domains.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/76d75f02-7261-4519-b845-c9660a373947/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

In recent years, policies based on Large Language Models (LLMs) have shown remarkable success in embodied AI—the field of creating intelligent agents that make sequential decisions and interact with physical environments through tasks such as exploration and manipulation (Huang et al., 2022a;b; Yao et al., 2022; Wang et al., 2023).

However, a significant challenge remains in enabling agents to effectively adapt to unknown domains without extensive data collection or retraining. This adaptability is crucial for real-world applications where rigid, domain-specific policies are often inadequate or inefficient due to environmental changes and diverse objectives.

In-context adaptation approaches retrieve relevant data from multiple domains to identify the most appropriate information for a given situation. While offering some flexibility, they often suffer from inefficiency due to the overhead of retrieving, searching, and processing vast amounts of information. In contrast, model integration approaches combine two or more models with different properties by explicitly separating domain-specific aspects and costs from general knowledge. This aims at efficient use of prior knowledge but lacks the flexibility to extend knowledge beyond the learned domains.

The WorMI framework integrates two key methods into an adaptive and composable policy structure tailored for LLM-based embodied agents. In the prototype-based world model retrieval method, only a relevant set of world models is selectively activated, and object-specific state embeddings derived from trajectory-based prototypes and clustering results are used to measure each model's similarity to the current target domain to determine relevance. In the world-wise compound attention method, world models are effectively integrated with the reasoning model by adaptively combining relevant knowledge from the retrieved model set.

---

### Related works

#### LLM-based Embodied Agent

Tasks for LLM-based embodied agents are often called embodied instruction following, requiring interaction with physical environments through activities such as object manipulation and exploration, as well as high-level understanding of environmental dynamics and observations. Recent research has explored various techniques to enhance the reasoning and planning capabilities of such agents. These include code-based policy implementation (Singh et al., 2023; Liang et al., 2023), reward function generation (Yu et al., 2023; Adeniji et al., 2023; Kim et al.), and integrating LLMs with additional domain-specific models to leverage the affordances or values of skills in the environment (Brohan et al., 2023; Hazra et al., 2024). In-context learning approaches that integrate previous demonstrations as part of the reasoning process (Song et al., 2023) have also been introduced.

While these approaches highlight the flexibility and robustness of LLMs for embodied instruction following, they often rely on external and disconnected integration of environmental data or additional models, limiting cohesion. Moreover, they rarely address the problem of effectively integrating multiple domain-specific models to facilitate adaptation to unknown domains. In contrast, our work introduces a scalable approach to injecting multiple world models into LLM reasoning, enabling highly flexible and easily replaceable policies. This design facilitates robust generalization and rapid adaptation across diverse domains through attention-driven, consistent knowledge integration from carefully selected multiple models.

#### Cross-domain Policy Adaptation

To address the problem of handling diverse environmental features and tasks, researchers have studied various domain generalization methods (Zhou et al., 2022). Representative approaches include meta-learning, which learns how to learn across multiple tasks (Finn et al., 2017; Nichol, 2018; Andrychowicz et al., 2016; Ha et al., 2016), hierarchical learning that decomposes domain attributes to structure knowledge across multiple levels, and ensemble learning that trains domain-specific neural networks for more robust performance. However, these methods often fall short of fully leveraging the specialized knowledge embedded in domain-specific models. The framework proposed in this paper extends the benefits of these existing approaches by injecting diverse domain-specific world models into a single policy, enabling effective adaptation across a wide range of domains.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/dd47101c-61cc-423f-a5c1-4ed4a7bb6938/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

#### Overall Framework

A core challenge for LLM-based embodied agents is synthesizing domain-specific knowledge into a general reasoning model so that agents can handle a wide range of unknown domains. We present the WorMI framework, which enables agents to dynamically retrieve and compose relevant world models at test time and fuse them into LLM-based policies. This approach aims to ensure robust zero-shot and few-shot adaptation across diverse domains in constantly changing environments without retraining or fine-tuning large models.

WorMI assumes the availability of pretrained world models $M_1, \dots, M_N$ along with their corresponding datasets $\mathcal{D}_1, \dots, \mathcal{D}_N$ from domains $\mathcal{D}_1, \dots, \mathcal{D}_N$. A reasoning model $\pi_R$ built on an LLM provides general reasoning and decision-making capabilities. Given these individual models, we introduce a trainable composition module $C_\theta$ that selectively integrates only a relevant subset $\{M_1, \dots, M_K\}$ of pretrained world models with a fixed reasoning model $\pi_R$. The hierarchical approach first fuses multiple world models into a unified representation, then aligns it with $\pi_R$ to form an implanted policy $\pi_\theta = C_\theta(\{M_1, \dots, M_K\}, \pi_R)$.

#### Prototype Based

Each domain-specific world model $M_j$ is trained on its corresponding dataset $\mathcal{D}_j = \{(I, s_t, a_t, s_{t+1})\}$, where $I$ represents an embodied task instruction, $s_t$ is the agent's state at time $t$, and $a_t$ is the executed action. Training consists of three auxiliary tasks.

The dynamics task predicts the next state given the current state and action, the action affordance task identifies executable actions from the current state, and the behavior cloning task learns a policy, endowing each world model with knowledge about transitions, action affordances, and decision-making.

For a given state $s_t$, we retrieve a world model set $M_{\text{ret}}$ based on relevance. This selection is made by measuring the embedding set distance between an embedding set $E_j$ encoding object-specific states of the environment for each dataset $\mathcal{D}_j$ and an embedding set $E$ derived from $s_t$. The retrieved set $M_{\text{ret}}$ can thus be formulated as:

$$
M_{\text{ret}} = \left\{ M_j \mid j \in \text{Top}K \left( \left\{ -\delta(E_j, E) \right\}_{j=1}^N, K \right) \right\}
$$

where $K$ is the number of selected world models and $\delta(\cdot, \cdot)$ is the Wasserstein distance. However, directly computing such set distances incurs high computational costs and tends to over-represent objects that frequently appear in datasets. Therefore, we adopt prototype-based similarity to reduce computational overhead at test time while maintaining representational diversity.

To obtain reliable prototypes, we construct embedding sets $E_j$ in an object-specific manner using an object detection model $\Phi_D$ that converts input states into object-specific states, and an embedding model $\Phi_E$ that can be implemented using language or vision embedding models.

$$
E_j = \left\{ \Phi_E(o) \mid o \in \{o_1, \dots, o_n\} = \Phi_D(s), s \in \mathcal{D}_j \right\}
$$

where $o$ represents object-specific states for state $s$. We cluster $E_j$ using the k-center method to derive prototypes, identifying the top $k$ embeddings that minimize the maximum distance from any point to its nearest center. This approach maintains important object embeddings while reducing the need for extensive distance computations over the entire dataset.

#### Worldwise Compound Attention

<img src="https://velog.velcdn.com/images/devjo/post/5e913c0b-6fa1-478e-accc-c02683d418d1/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

To integrate a set of world models with the reasoning model in the policy, we develop a world-wise compound attention method that leverages hierarchical cross-attention to effectively fuse domain-specific knowledge and align it with LLM reasoning at test time.

Compound Attention $C_\theta$ maps the $i$-th layer outputs $l_{M_1}, l_{M_2}, \dots, l_{M_K}$ of world models and the $j$-th layer output $l_{\pi_R}$ of the reasoning model to the $(j+1)$-th layer input of the reasoning model.

$$
l_{\pi_R} + C_\theta(\{l_{M_1}, l_{M_2}, \dots, l_{M_K}\}, l_{\pi_R}) 
$$

It consists of a linear projection layer $L_\theta$, a world-level cross-attention layer $\text{Attn}_\theta^W$, and a reasoning-level cross-attention layer $\text{Attn}_\theta^R$. The linear projection layer aligns the dimensions of intermediate layer representations from world models with those of the reasoning model. The world-level cross-attention layer integrates these intermediate representations through weighted combination. Then, the reasoning-level cross-attention layer aligns the integrated representation based on queries from the reasoning model.

#### Meta Learning

To enable rapid adaptation to unknown domains, WorMI incorporates a meta-learning approach (Nichol, 2018) for compound attention $C_\theta$. This approach treats $C_\theta$ not merely as connecting existing models to the reasoning model, but as a parameter-efficient composer that dynamically aggregates and aligns domain-specific knowledge from multiple world models.

In each inner-loop update, parameters $\theta_j$ are initialized from meta-parameters $\theta$.

$$
\mathcal{L}(\theta_j, \mathcal{B}) = \sum_{(s, a) \in \mathcal{B}} - \log \pi_{\theta_j}(a | s)
$$

where $\mathcal{B}$ is a batch sampled from $\mathcal{D}_j$. In the outer-loop update, adapted parameters are recombined into meta-parameters as $\theta \leftarrow \theta + \beta \cdot \frac{1}{m} \sum_{j=1}^m (\theta_j - \theta)$, where $\beta$ is the learning rate for the outer-loop update. This process encourages $C_\theta$ to learn a general integration and alignment strategy that can specialize to unknown domains with only a few gradient steps. As a result, compound attention serves as a composer that fuses domain-specific knowledge during reasoning, enabling rapid adaptation to both new domains and newly introduced world models.

---

### Conclusion

In this paper, we presented the WorMI framework, which enhances cross-domain adaptability by enabling embodied policies to dynamically compose fixed reasoning models and multiple world models at test time. By combining prototype-based world model retrieval and world-wise compound attention, WorMI achieves dual-stage knowledge fusion that includes inter-world knowledge integration and world-reasoning alignment. Evaluation results on VirtualHome and ALFWorld confirm that WorMI achieves robust adaptation to unknown domains in both zero-shot and few-shot scenarios, outperforming several LLM-based baselines.

---

### References

[Original Source #1](https://arxiv.org/pdf/2509.03956?)

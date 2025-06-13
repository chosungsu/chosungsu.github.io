---
title: 'On Incorporating Prior Knowledge Extracted from Pre-trained Language Models into Causal Discovery'
date: '2024-03-04'
tags: ['llm', 'paper review']
---

### Abstract

Pre-trained Language Models (PLMs) have shown effectiveness in causal reasoning even under data-scarce conditions by leveraging vast prior knowledge and textual descriptions of datasets. However, current PLM-based causal inference methods have key limitations:  
- PLMs cannot handle large datasets within prompts due to context length constraints.  
- They struggle to understand globally connected causal structures.

In contrast, data-driven causal discovery methods can recover global structures but only perform well when ample data is available. To overcome these limitations, this paper proposes a novel framework that integrates PLM-based causal inference with data-driven causal discovery, aiming for more robust and improved performance.

---

### Introduction

![Example Image](https://velog.velcdn.com/images/ski06043/post/da251500-eaae-4fea-9c51-1a836d5a099a/image.png)

In real-world settings, limited data availability hinders causal discovery algorithms from accurately recovering causal structures. One solution is to leverage prior domain knowledge. For instance, providing a suitable prior graph can guide causal discovery algorithms when determining causal directions.

The advancement of PLMs has shown great potential across various reasoning tasks. Because PLMs are pre-trained on large-scale corpora, they can address diverse problems using prompt engineering.

Kıcıman et al. (2023) initiated work on PLM-based causal discovery. Their approach uses a prompt template to query whether one entity influences another (where an entity refers to a column in a tabular dataset). By querying causal relations for all variable pairs, they successfully reconstructed causal graphs and achieved superior performance on benchmark datasets compared to traditional methods.

However, PLMs inherently suffer from two key drawbacks:  
1. Inability to utilize large-scale tabular data effectively.  
2. Limitation to pairwise causal inference without understanding global causal structure.

---

### Preliminaries

#### 1. Causal Discovery Algorithms

Causal discovery algorithms aim to recover a latent causal graph from numeric datasets, typically leveraging tabular data efficiently. Given a dataset \(X ∈ \mathbb{R}^{n×d}\) with \(d\) variables and \(n\) observations, a causal graph under linear assumptions can be represented as a structural coefficient matrix \(W ∈ \mathbb{R}^{d×d}\), where \(W_{i,j}\) denotes the linear effect of variable \(j\) on variable \(i\).

- **DAG-GNN** (Yu et al., 2019): Uses variational autoencoders with an encoder-decoder structure and introduces acyclicity constraints and the evidence lower bound (ELBO) to approximate causal structures.
- **NOTEARS** (Zheng et al., 2018): Reformulates combinatorial optimization as a continuous problem and minimizes the following objective:

$$L(W) := \frac{1}{2n} \|X - XW\|_F^2 + \lambda \|W\|_1$$

The first term is the Frobenius norm loss, measuring data fit. The second term is an \(l_1\)-regularization enforcing sparsity, controlled by hyperparameter \(\lambda\). Unlike DAG-GNN, it directly enforces acyclicity during optimization.

#### 2. PLM-based Causal Reasoning

![Example Image](https://velog.velcdn.com/images/ski06043/post/2acf1f8c-50ef-49e2-92d8-fce864176ed3/image.png)

Kıcıman et al. (2023) proposed using PLMs with multiple-choice prompts to extract pairwise causal relations. For each variable pair \((\alpha, \beta)\), a prompt is constructed to ask whether \(\alpha\) causally influences \(\beta\). This is repeated for all combinations to construct a causal graph.

---

### Idea

Before proposing the framework, ablation studies were conducted to assess the impact of prompt artifacts on PLM-based causal reasoning.

#### 1. Issue: Limited Capability to Comprehend Holistic Causal Structure

Following Ban et al. (2023), a two-stage reasoning process was applied:
- **Reasoning Phase:** PLM predicts pairwise causal relationships.
- **Revision Phase:** PLM is given a revision prompt to refine the structure based on prior results.

Example revision prompt:  
"Based on your explanations, verify the correctness of the following causal relations and explain why: {α}₁ → {β}₁, ..., {α}ᵢ → {β}ᵢ"

However, revision through prompt engineering had minimal impact.

#### 2. Given Actual Ground Truth

Assuming low performance originated from poor initial reasoning, they provided ground-truth relations directly within prompts. Nonetheless, no significant improvement was observed.

#### 3. Conclusion

These findings suggest that structure-aware causal inference with PLMs cannot be effectively achieved through prompt engineering alone.

---

### Causal Discovery with PLM

![Example Image](https://velog.velcdn.com/images/ski06043/post/94900903-6d4f-4e68-853a-029ca30b1053/image.png)

This paper proposes a framework that incorporates prior knowledge \(K\) extracted from PLMs. Given a dataset, prompts are used to extract pairwise causal relations, which are aggregated to form prior knowledge \(K\). This prior is then integrated into causal discovery algorithms in three ways:

1. **Graph Initialization:**  
Instead of initializing the coefficient matrix \(W\) with zeros (as in Zheng et al., 2018), use:

$$W = \lambda_{init} K$$

where \(\lambda_{init}\) is a scaling factor to avoid local optima.

2. **Regularization:**  
Add a regularization term that encourages learned structures to align with prior \(K\).

3. **Setting Boundaries:**  
Introduce a similarity loss:

$$L_{sim}(W) := \sum_{i,j} |\sigma(W_{i,j}) - K_{i,j}|$$

Here, \(\sigma\) is a clamping function to keep \(W_{i,j}\) within [0,1], preventing gradient explosion.  
Boundary settings vary based on \(K_{i,j}\):
- If \(K_{i,j} = 1\): Set a lower bound greater than 0 but below a certain threshold.
- If \(K_{i,j} = 0\): Fix \(W_{i,j} = 0\).

Instead of clamping, this paper directly applies optimization constraints using the L-BFGS-B algorithm, constraining \(W_{i,j} \in $[B_{lower}, B_{upper}]$\).

---

### Reference

[Original Path #1](https://openreview.net/pdf?id=efmbt-1TOH)

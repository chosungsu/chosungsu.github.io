---
title: 'Meta-tuning Loss Functions and Data Augmentation for Few-shot Object Detection'
date: '2025-05-17'
tags: ['robotics', 'paper review']
---

### Abstract

Few-shot object detection (FSOD) models novel detection categories from only a handful of training instances. It is an emerging topic at the intersection of few-shot learning and object detection. Modern approaches fall into two groups: fine-tuning–based and meta-learning–based.

Meta-learning aims to train a dedicated meta-model that maps samples to a new class model, whereas fine-tuning adapts a pretrained detector to novel classes via gradient-based optimization, providing a simpler route to FSOD. Despite its simplicity, fine-tuning commonly achieves competitive results.

Motivated by this, we focus on the roles of loss functions and data augmentations as driving forces of fine-tuning, and propose to meta-tune their dynamics using meta-learning principles. This training scheme preserves the strengths of fine-tuning while learning inductive biases that improve few-shot detection.

Unlike highly parameterized and complex meta-models, the proposed approach yields interpretable loss functions. Experiments on Pascal VOC and MS-COCO demonstrate substantial improvements over strong fine-tuning FSOD baselines, in both standard and generalized few-shot metrics, highlighting the advantages of our method.

---

### Introduction

FSOD leverages knowledge from base classes with abundant data to build detectors for novel classes from only a few labeled examples. The related generalized FSOD (G-FSOD) aims to perform well on both base and novel classes.

Approaches to FSOD are broadly divided into two families:

Meta-learning–based: design and train a dedicated meta-model that maps a few training samples to a detector for novel classes. This often risks overfitting to base classes due to model complexity and hampers interpretability.

Fine-tuning–based: cast the problem as transfer learning and adapt a pretrained detector to novel classes via gradient-based optimization. Despite its simplicity and generality, it often performs on par with or better than meta-learning methods.

The paper highlights the “generality” of fine-tuning as both its strength and weakness: it may lack inductive biases necessary for effective learning from few samples.

To address this, we propose meta-tuning the loss functions and data augmentations used during fine-tuning using meta-learning principles. Key properties are:

- Data-driven discovery: episodic training progressively discovers loss/augmentation settings best suited for FSOD.
- Reinforcement learning: RL adjusts losses and augmentations to maximize expected detection quality after fine-tuning.
- Interpretability: learned parameters yield interpretable loss functions, unlike complex meta-models.
- Injected inductive biases: learned losses and augmentations inject FSOD-specific inductive biases into fine-tuning.

---

### Related work

#### 1. Few shot classification

Most meta-learning approaches for few-shot learning (FSL) fall into adaptation-based and mapping-based families.

Adaptation-based (gradient-based): learn model parameters that can quickly adapt to a new, unseen few-shot task within a few update steps.

Mapping-based (metric-based): skip gradient-based adaptation and instead learn a data-to-classifier mapping.

Other notable directions include generating synthetic data for novel classes, improving feature representations, and using differentiable convex solvers. Several studies emphasize that carefully trained representations plus simple fine-tuning or a shallow classifier can be competitive with, or superior to, meta-learning methods.

#### 2. Few shot object detection

FSOD methods can be summarized as meta-learning–based or fine-tuning (transfer learning)–based. Most meta-learning FSOD approaches adopt formulations similar to metric-based FSL. Support feature aggregation is a key component of many meta-learning methods.

Recent improvements to meta-learning FSOD focus on loss functions, feature matching, and better utilization of novel samples:

- Losses: class-margin losses, margin-based ranking losses, focal loss, adaptive margin losses, and hybrid losses including contrastive terms.
- Feature matching: match features between query and support images to better exploit support information.
- Sample augmentation: augment novel samples, e.g., by adding Gaussian noise.

Fine-tuning methods typically freeze parts of a pretrained detector, add auxiliary detection heads, increase the variability for new classes, and then apply gradient-based updates—unlike meta-learning methods that rely on complex episodic training.

Wang et al.: based on Faster R-CNN, propose freezing the class-agnostic RPN during fine-tuning.

Sun et al.: use contrastive proposal encodings and include FPN/RPN layers among trainable parameters to improve novel-class classification.

Wu et al.: show scale imbalance in the support set and introduce a multi-scale positive sample refinement (MPSR) branch.

Fan et al.: propose the Retentive R-CNN architecture to prevent forgetting of base classes during fine-tuning.

#### 3. Automated loss function discovery

Loss discovery is an emerging topic in AutoML aimed at data-driven improvement of learning systems. Existing methods largely fall into two categories:

- Direct construction: compose losses from primitive operators. Some works use genetic algorithms to validate and filter candidate losses; others select candidate formulas from trees of mathematical operations and mutate successful ones across generations.

- Parameterized optimization: reanalyze existing losses into combined formulations or simplify the search space via parameterization, then optimize.

While much of this work targets supervised learning, this paper applies loss-learning principles to FSOD.

#### 4. AutoML for data augmentation

Recent years have seen many automated augmentation methods:

- RL-based: use reinforcement learning with an RNN controller to generate augmentation policies.
- Cost reduction: employ population-based frameworks and Bayesian methods to reduce compute.
- Shared parameters: show that optimal augmentation magnitudes tend to be similar across transforms; sharing magnitudes can greatly simplify the search. We follow this idea and use shared magnitudes across all transforms.

Unlike prior work focused on supervised learning, this paper targets training detectors from few samples.

---

### Method

We address the FSOD setting in which a model is trained on a large dataset of base classes and must detect novel classes from only k-shot examples.

As the base detector, we adopt the MPSR FSOD method, an adaptation of Faster R-CNN for fine-tuning–based FSOD. To address scale sparsity, MPSR uses an auxiliary multi-scale positive sample refinement branch that expands the positive sample scale space without increasing spurious negatives, unlike FPN or image pyramids that alter the data distribution.

#### 1. Meta-tuning loss functions

The classification loss of the base MPSR model is:

$$
L_{cls}(x,y) = -\frac{1}{N_{ROI}} \sum_{i}^{N_{ROI}} log (\frac{e^{f(x_i, y_i)}}{\sum_y e^{f(x_i, y)}})
$$

where $N_{ROI}$ is the number of regions of interest in the image and $y_i$ is the ground-truth class label for the $i$-th region. To increase flexibility, we reparameterize it as $L_{cls}(x,y;\rho)$:

$$
L_{cls}(x,y;\rho) = -\frac{1}{N_{ROI}} \sum_{i}^{N_{ROI}} log (\frac{e^{f(x_i, y_i)/{\rho_{\tau}}}}{\sum_y e^{f(x_i, y')/{\rho_{\tau}}}})
$$

#### 2. Meta-tuning procedure

To maximize generalization, we mimic novel-class adaptation by creating proxy tasks from base classes. The steps are:

- Class split: partition base classes $C_b$ into proxy-base $C_{p\text{-}base}$ and proxy-novel $C_{p\text{-}novel}$.

- Dataset split: create three disjoint sets. $D_{p\text{-}pretrain}$ contains only proxy-base classes and is used to train a temporary detector for meta-tuning. $D_{p\text{-}support}$ contains both proxy-base and proxy-novel and is used for fine-tuning. $D_{p\text{-}query}$ also contains both and is used to evaluate the fine-tuned model.

---

### Conclusion

Fine-tuning FSOD pipelines often rely on hand-designed details for few-shot adaptation, which is difficult and unlikely to be optimal.

We propose to learn the fine-tuning learning dynamics via meta-learning, thereby acquiring inductive biases crucial for few-shot learning.

Our approach combines reinforcement learning with meta-learning principles to obtain interpretable loss functions and augmentation magnitudes tailored for few-shot training. Extensive experiments on Pascal VOC and MS COCO show consistent and significant gains over strong fine-tuning baselines in both FSOD and G-FSOD settings.

---

### References

[Source #1](https://arxiv.org/pdf/2304.12161)

---
title: 'Multi-Faceted Distillation of Base–Novel
Commonality for Few-shot Object Detection'
date: '2023-07-17'
tags: ['object detection', 'paper review']
---

### Abstract

Most existing few-shot object detection methods follow a fine-tuning paradigm, which implicitly assumes that class-agnostic generalizable knowledge can be learned on base classes with abundant samples and transferred to novel classes with limited samples through such a two-stage training strategy. However, this assumption does not necessarily hold because it is difficult for detectors to automatically distinguish class-agnostic knowledge from class-specific knowledge without explicit modeling.

In this work, we propose to explicitly learn three types of class-agnostic commonalities between base and novel classes: (1) recognition-related semantic commonalities, (2) localization-related semantic commonalities, and (3) distribution commonalities.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/2ced4252-1d2c-4bd5-be65-704fbe29f91f/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Few-shot object detection aims to learn effective detectors for novel classes with limited samples by leveraging generalizable prior knowledge learned from abundant base-class data. Compared to generic object detection, few-shot detection must generalize not only across samples within a class but also across different classes. Moreover, it is more challenging than few-shot classification because transferable knowledge must be learned for both recognition and localization.

Given samples of “cat,” for example, we measure semantic similarity between this sample and each novel class in a feature space optimized for both recognition and localization. These are interpreted as recognition-related and localization-related semantic commonalities, respectively. The learned commonalities are distilled during fine-tuning to improve detector performance on novel classes.

The dominant modeling paradigm for few-shot detection is the fine-tuning framework: first pre-train a detector on base-class samples, then fine-tune the model on novel classes. Based on this two-stage training strategy, many methods have been proposed to address the specific challenges of few-shot detection. For instance, MPSR addresses scale variation, and FSCE mitigates confusion among novel classes. The underlying hypothesis of this paradigm is that class-agnostic priors for detection can be implicitly transferred from base to novel classes. Nevertheless, without explicit modeling, a detector cannot automatically separate class-agnostic knowledge from class-specific knowledge.

We therefore propose to explicitly learn multi-faceted commonalities between base and novel classes within the fine-tuning framework. These commonalities are class-agnostic and transferable across classes. We then perform distillation on the learned commonalities to bypass the scarcity of novel samples and consequently improve detection performance on novel classes.

---

### Related Work

#### Few-Shot Image Classification

Few-shot image classification aims to recognize novel categories with limited annotated instances and has received significant attention recently. Optimization-based approaches modify classical gradient-based optimization for rapid adaptation to new tasks. Metric-based approaches learn a metric space to recognize instances by comparing distances to prototypes of each category. Hallucination-based approaches learn to generate novel samples to handle data scarcity.

#### Few-Shot Object Detection

Early works on few-shot detection focused on meta-learning paradigms, which introduce meta-learners to exploit meta-level knowledge transferable from base to novel classes. Recent studies have found that simple fine-tuning approaches can outperform most meta-learning-based approaches.

#### Knowledge Distillation

Classical knowledge distillation transfers knowledge from one model (teacher) to another (student). For example, dark knowledge introduces the teacher’s soft predictions; alternatively, intermediate representations learned by the teacher are used to guide the student. Inspired by these studies, we design a new distillation framework based on a memory bank to distill commonalities between base and novel classes.

---

### Method

<img src="https://velog.velcdn.com/images/devjo/post/6c34ecd4-b7db-43a7-acd2-26961fefd343/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

#### Distilling Recognition-related Semantic Commonalities

Semantically close categories tend to share similar high-level semantic commonalities relevant to recognition (e.g., similar appearance between cow and horse). We aim to distill such recognition-related semantic commonalities between base and novel classes to guide detector learning on novel classes.

Classical knowledge distillation transfers knowledge from a larger teacher model to a student model, where the transferred knowledge is expressed as probability distributions over all classes predicted by the teacher, interpretable as similarity of the current sample to each class. Distillation is carried out by using these distributions as soft labels alongside one-hot hard labels. While inspired by classical distillation, we adopt a different route. To distill recognition-related commonalities between base and novel classes, we first measure the similarity between base-class samples and each novel class. Since novel classes do not have enough samples to train a teacher model, we directly compute these similarities in a pre-trained feature space $F_{\text{cls}}$ rather than using a teacher to predict class probabilities. Formally, given a foreground region proposal $r$ of a base class produced by the RPN, the similarity to a novel class $c$ is defined in $F_{\text{cls}}$ as the cosine similarity between the RoI feature $\mathbf{v}_r$ and the prototype $\boldsymbol{\mu}_c$ of class $c$:

$$
 d_r^{c} = \alpha \cdot \frac{\mathbf{v}_r^T \boldsymbol{\mu}_c}{\left\| \mathbf{v}_r \right\| \left\| \boldsymbol{\mu}_c \right\|}, \quad c \in \mathcal{C}_n.
$$

Here, $\mathcal{C}_n$ is the set of novel classes and $\alpha > 0$ is a scaling factor. The prototype $\boldsymbol{\mu}_c$ is obtained by averaging object features in the candidate set of novel class $c$:

$$
 \boldsymbol{\mu}_c = \frac{1}{n_c}\sum _{i=1}^{n_c}\mathbf{f}_c^i.
$$

Here, $\mathbf{f}_c^i$ is the vector feature of the $i$-th object in the candidate set and $n_c$ is the set size. Since we focus on distilling base–novel commonalities to circumvent the scarcity of novel-class training samples, we ignore base–base commonalities and devote model capacity to base–novel commonalities. Consequently, the similarity of a base-class proposal $r$ to other base classes is set to a small constant:

$$
 d_r^c = -\alpha
$$

where $\mathcal{C}_b$ is the set of base classes and $\alpha$ is the scaling factor. To ensure prediction accuracy for the ground-truth class, we also compute the cosine similarity between $r$ and the ground-truth class $c_{gt}$. Finally, we normalize the similarities over all classes using the softmax function:

$$
 \mathbf{q}^{\text{cls}}_{r,c} = \frac{\exp(d_r^c)}{\sum _{i=1}^{C}\exp(d_r^i)}, \quad c \in \mathcal{C}_n \cup \mathcal{C}_b.
$$

Assuming that the foreground proposal $r$ has zero commonality with the background $c_{bg}$, we obtain the complete similarity distribution as $\mathbf{q}^{\text{cls}}_r = [\mathbf{q}^{\text{cls}}_r; 0]$. Analogous to classical distillation, we use the obtained similarities as soft labels to supervise detector learning. Formally, for a base-class proposal $r$, we minimize the Kullback–Leibler (KL) divergence between the soft label $\mathbf{q}^{\text{cls}}_r$ and the predicted class probability $\mathbf{p}^{\text{cls}}_r$:

$$
 \mathcal{L}_{\text{distill-cls}} = \sum _{c \in \mathcal{C}_n \cup \mathcal{C}_b \cup \{c_{\text{bg}}\}} (\mathbf{q}_{r,c}^{\text{cls}} \log \mathbf{q}_{r,c}^{\text{cls}}-\mathbf{q}_{r,c}^{\text{cls}} \log \mathbf{p}_{r,c}^{\text{cls}}).
$$

#### Distilling Localization-related Semantic Commonalities

Similar categories share semantic commonalities relevant to localization, such as similar shapes or boundary characteristics. Distilling such commonalities between similar base and novel classes enables the detector to learn transferable knowledge for localization from abundant base-class samples, thereby improving detection on novel classes.

The learned localization-related commonalities are expressed as normalized similarities. Unlike treating recognition-related commonalities as soft labels for supervision, we use localization-related commonalities as normalized weights to aggregate all class-specific bounding-box regressors for object localization. This is based on the intuition that an object can be localized not only by the regressor of its ground-truth class but also by regressors of similar classes, with larger similarity implying higher confidence. Formally, given a base-class proposal $r$, its bounding box is predicted as offsets $\mathbf{t} = (t_x, t_y, t_w, t_h)$ toward the ground-truth location by aggregating predictions from regressors of all $C$ classes. The detector is then optimized by minimizing the error between the aggregated prediction and the ground truth using the Smooth $\text{L}1$ loss:

$$
 \mathcal{L}_{\text{distill-loc}}=\sum _{c=1}^C \mathbf{q}_{r,c}^{\text{loc}} \cdot \sum _{i\in \{x,y,w,h\}} \text{Smooth}_{L1}({t}_i^c-u_i).
$$

#### Distilling Distribution Commonalities

Semantically similar categories generally follow similar data distributions; for example, features have similar means and variances under estimated Gaussian distributions across such categories. Unlike distribution rectification that transfers both means and variances of base classes to novel classes, we distill only the variance of base classes while preserving the mean of novel classes. Transferring both mean and variance may cause distributional overlap between base and novel classes, making them harder to distinguish during detection. In contrast, few-shot classification settings do not require distinguishing base from novel classes.

We approximate the variance of a novel class using the mean variance of its top-$k$ nearest base classes. Formally, the rectified variance for a novel class $c$ is estimated as:

$$
 \boldsymbol{\sigma}'_c = \frac{1}{k}\sum _{i\in S_c}\boldsymbol{\sigma}_i,
$$

where $\boldsymbol{\sigma}_i$ is the variance of base class $i$ and $S_c$ is the set of top-$k$ nearest base classes to the novel class $c$. We then sample more features for novel class $c$ in the pre-trained feature space according to the Gaussian distribution $\mathcal{N}(\boldsymbol{\mu}_c,\boldsymbol{\sigma}'_c)$ obtained in this way:

$$
 \mathbb{S}_c=\{\mathbf{v} \mid \mathbf{v} \sim \mathcal{N}(\boldsymbol{\mu}_c,\boldsymbol{\sigma}'_c) \}.
$$

Here, $\boldsymbol{\mu}_c$ is the mean of novel class $c$. The sampled feature set $\mathbb{S}_c$ is additionally used to train the detector’s classifier $f_{\theta}$ with the cross-entropy loss:

$$
 \mathcal{L}_{\text{distill-dist}} = \frac{1}{|\mathbb{S}_c|}\sum _{\mathbf{v}\in \mathbb{S}_c} \text{CE}(c, f_\theta (\mathbf{v})).
$$

#### Unified Distillation Framework

Let $\mathcal{L}_{\text{rpn}}$ be the RPN loss for distinguishing foreground from background, $\mathcal{L}_{\text{cls}}$ the cross-entropy classification loss, and $\mathcal{L}_{\text{reg}}$ the smoothed $\text{L}1$ loss for bounding-box regression. During fine-tuning, the model is supervised jointly by $\mathcal{L}_{\text{det}}$ and the three distillation losses, in an end-to-end manner:

$$
 \mathcal{L} = \mathcal{L}_{\text{det}} + \lambda _{c}\mathcal{L}_{\text{distill-cls}} + \lambda _{l}\mathcal{L}_{\text{distill-loc}} + \lambda _{d}\mathcal{L}_{\text{distill-dist}},
$$

where $\lambda_c, \lambda_l, \lambda_d$ are hyperparameters balancing the losses.

---

### Conclusion

We proposed a multi-faceted distillation approach for few-shot object detection. The key insight is to explicitly learn three types of commonalities between base and novel classes—recognition-related semantic commonalities, localization-related semantic commonalities, and distribution commonalities—and distill them during fine-tuning based on a memory bank. The proposed method significantly advances the state of the art in few-shot object detection.

---

### References

[Original Source #1](https://arxiv.org/pdf/2207.11184)

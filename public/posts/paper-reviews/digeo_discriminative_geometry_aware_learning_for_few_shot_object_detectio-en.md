---
title: 'DiGeo: Discriminative Geometry-Aware Learning for
Generalized Few-Shot Object Detection'
date: '2023-07-14'
tags: ['object detection', 'paper review']
---

### Abstract

Generalized few-shot object detection aims to achieve precise detection on both base classes with rich annotations and novel classes with only limited training data. Existing approaches either improve few-shot generalization at the expense of base-class performance or maintain high precision on base-class detection with only limited improvement in adaptation to novel classes. We argue this is due to insufficient discriminative feature learning for all classes.

We therefore propose DiGeo, a new training framework to learn geometry-aware features that enforce inter-class separation and intra-class compactness.

To induce separation of feature clusters, we derive an offline simplex equiangular tight frame (ETF) classifier whose weights act as class centers that are maximally and equally separated. To compactify clusters for each class, we incorporate adaptive class-specific margins into the classification loss and encourage features to be close to class centers. Experiments on two few-shot benchmark datasets and one long-tail dataset demonstrate that our single-model approach effectively improves generalization to novel classes without harming base-class detection.

---

### Introduction

Object detection has witnessed tremendous growth in recent years with deep neural models and large-scale training. However, the success of detection models heavily depends on the quantity and quality of annotations, which require labor-intensive and time-consuming efforts. Moreover, conventional detectors perform poorly on classes with only a limited number of annotations, whereas humans can learn from few observations. To bridge the gap between the human visual system and detection models, recent studies have investigated how to generalize well to rare classes under the few-shot object detection (FSOD) setting.

Specifically, given base classes with abundant training data and novel classes with extremely limited annotations (e.g., five annotated instances per class), FSOD expects the model to detect objects of novel classes well.

We point out that the degradation in few-shot object detection stems from insufficient discriminative feature learning, including ineffective knowledge adaptation to novel classes and unintended forgetting of base-class knowledge. Because new instances during training are extremely limited, it is difficult to capture representative visual information of novel classes and adapt knowledge learned from base classes to the novel ones. As a result, the model fails to distinguish novel classes, weakening few-shot adaptation. Balanced training strategies such as downsampling cannot fully exploit the diverse training samples of the base set. Consequently, preserving complete knowledge of base classes is difficult, which induces overfitting and further reduces detection scores.

---

### Related Work

<img src="https://velog.velcdn.com/images/devjo/post/16ae15aa-15ff-4301-aa3c-dae18af3a474/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### FSOD

Few-shot object detection (FSOD) aims to detect instances of novel classes at the instance level with few examples. To improve adaptation efficiency, approaches based on meta-learning and transfer learning have been studied.

Meta-learning approaches train a class-agnostic meta-learner to align instances of the same class across different images. Within the Faster R-CNN framework, attention-based meta-RPN and meta-detectors have been proposed to generate class-relevant proposals and improve instance alignment. Transformer- and YOLO-based approaches have also been proposed to jointly extract features and align features across multiple scales.

Transfer learning approaches perform fine-tuning for few-shot adaptation. Specifically, TFA pre-trains a base detector with abundant base samples and fine-tunes it for novel classes. To improve adaptation efficiency, multi-scale feature extraction, contrastive losses, margin balancing, and regularization such as transformation invariance are used. Recently, DeFRCN adjusts gradients backpropagated from different losses and achieves superior novel-class detection scores.

#### Generalized Few-Shot Object Detection

All the above FSOD approaches suffer from degraded precision in base detection after few-shot adaptation. Such phenomena, where models forget base knowledge due to domain or distribution shift, have also been observed in various vision tasks. As Fan et al. pointed out, images may contain instances of both novel and base classes; they proposed regularized few-shot fine-tuning and used model ensembling to preserve base detection precision. However, the adaptation efficiency for novel samples is inevitably limited.

---

### Method

Our goal is to “have it both ways” with a single model: improve few-shot adaptation on novel classes without harming base detection precision. We aim to construct clear decision boundaries in the feature space that distinguish all classes. We realize this idea along two dimensions: inter-class separation and intra-class compactness.

#### Inter-Class Separation

We realize inter-class separation by maximizing pairwise distances between class centers. Specifically, for each $w_i$, we maximize the minimum distance to all other weights $W \setminus \{w_i\}$:

$$
W^* = \operatorname{argmax}_W \sum_{i=1}^{N_c} \min_{j, i \ne j} \|w_i - w_j\|_2^2
$$

Here, $N_c = N_b + N_n + 1$, and all weight vectors share the same norm. When the feature dimension $d \ge N_c - 1$, all pairwise distances between class centers in $W^*$ should be equal. Given $\|w_i\| = 1$, the angles between all pairs of class centers also take the same value. In this way, we expect class centers to be uniformly distributed in the feature space. In this case, $W^*$ coincides with a simplex equiangular tight frame (ETF).

#### Intra-Class Compactness

We realize intra-class compactness by compacting feature clusters and pushing samples close to the centers assigned in $W^*$. There are two challenges. First, the number of training samples is extremely imbalanced between base and novel classes, making it difficult to determine novel-class boundaries in the feature space. Second, because the number of novel-class instances $|D_n|$ is much smaller than $|D_b|$ of base classes, the network receives much fewer positive gradients for novel classes, which pushes their features farther from class centers and weakens discriminability.

Inspired by the success of logit adjustment in long-tailed recognition, we modify the classification loss by applying class-specific margins to logits and balance optimization between base and novel classes. Specifically, we compute class-specific margins using the frequency of bounding-box annotations as prior knowledge:

$$
m_c = \begin{cases} -\log(p_c) , & \text{if } c \in C_b \cup C_n \\ -\log(p_-) , & \text{if } c = c^- \end{cases}
$$

Here, $p_c$ is the frequency of bounding-box annotations for class $c$, and $p_-$ is the estimated probability of background boxes for training the classifier, with $p_- + \sum_{c \in C_b \cup C_n} p_c = 1$. Intuitively, classes with fewer data are assigned larger margins to ensure sufficient learning.

Given the logit output $v = \{v_c\}_{c \in C}$ for a sample $x$, we add the margins to the logits and use the following prior-margin cross-entropy loss:

$$
L_{\text{prior}}(x) = - \sum_{c \in C} y_c \cdot \log \frac{\exp(v_c - m_c)}{\sum_{c' \in C} \exp(v_{c'} - m_{c'})}
$$

Here, $y_c = 1$ if $c$ is the ground-truth label, and $y_c = 0$ otherwise. When all margins $m_c$ are set to 0, the prior-margin loss reduces to the vanilla cross-entropy loss. Since margins are obtained from the prior distribution and kept fixed during training, we refer to this baseline as Prior.

While the margin-based loss is computed for all proposals, computing margins precisely for proposals is time-consuming. Therefore, we obtain prior margins for all annotated bounding-box instances. This introduces a mismatch between proposal-based loss and instance-based margins. To mitigate this gap, we propose to learn margins adaptively based on the prior.

---

### Conclusion

We revisited generalized few-shot object detection from the perspective of discriminative feature learning, and further proposed DiGeo, a simple yet effective framework for inter-class separation and intra-class compactness.

Experiments show improved generalization to novel classes without degrading base-class detection and that the approach extends to long-tail object detection. Future work will continue to explore desirable properties of features in detection and apply the method to more realistic scenarios such as domain adaptation.

---

### References

[Original Source #1](https://openaccess.thecvf.com/content/CVPR2023/papers/Ma_DiGeo_Discriminative_Geometry-Aware_Learning_for_Generalized_Few-Shot_Object_Detection_CVPR_2023_paper.pdf)

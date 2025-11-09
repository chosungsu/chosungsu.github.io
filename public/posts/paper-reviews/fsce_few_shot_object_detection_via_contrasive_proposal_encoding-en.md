---
title: 'FSCE: Few-Shot Object Detection via Contrastive Proposal Encoding'
date: '2023-07-21'
tags: ['object detection', 'paper review']
---

### Abstract

Few-shot object detection (FSOD)—recognizing previously unseen objects given only very few training examples—has received renewed attention. Recent studies demonstrate that good feature embeddings are key to achieving favorable few-shot learning performance.

We observe that object proposals with different IoU scores behave similarly to in-image data augmentations used in contrastive visual representation learning. Leveraging this insight, we incorporate supervised contrastive learning to obtain stronger object representations for FSOD.

We propose FSCE, Few-Shot object detection via Contrastive Proposal Encoding, a simple yet effective approach to learn contrast-aware object proposal encodings that facilitate classification of detected objects. We note that AP degradation for rare objects mainly stems from misclassifying novel instances into confusing classes. Our contrastive proposal encoding (CPE) loss mitigates such errors by promoting instance-level intra-class compactness and inter-class separability.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/d359529b-7313-467a-bcd9-deeded151c2c/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Advances in modern convolutional neural networks have led to significant progress in generic object detection. Deep detectors require large amounts of annotated training data to saturate performance. In few-shot settings, deep detectors suffer more severe overfitting, and the gap between few-shot detection and generic detection is larger than that between few-shot and generic image classification. In contrast, humans can quickly grasp new visual concepts from very few examples and recognize objects of newly learned categories.

Taking few-shot image classification as precedent, early attempts at few-shot detection employed meta-learning strategies. A meta-learner is trained episodically on tasks, pairing meta-tasks of common objects (base classes) with rare objects (novel classes) to simulate few-shot detection tasks.

Recently, the two-stage fine-tuning approach TFA has shown greater potential for improving few-shot detection. Using it as a baseline—freezing all parameters trained on base classes and fine-tuning only the box classifier and box regressor with novel data—achieves better performance than previous meta-learners. MPSR improves upon TFA by alleviating scale bias inherent in few-shot datasets, but its positive refinement branch involves manual selection and is somewhat inelegant.

Object detection entails both localization and classification. One might suspect that localization of novel objects would be poorer than base categories since rare objects can be treated as background. However, experiments with Faster R-CNN—commonly adopted in few-shot detection—show that the class-agnostic RPN can generate foreground proposals for novel instances, and the final box regressor can localize novel instances quite precisely.

We therefore propose contrastive proposal encoding (CPE). While a common approach to learning well-separated decision boundaries is to use margin-based classifiers, category-level positive-margin classification under data scarcity does not work well. To learn discriminative instance-level features, contrastive learning has proven effective in recognition, re-identification, and recent self-supervised models. Region proposals with different IoUs for an object, as depicted above, are naturally analogous to in-image augmented crops.

---

### Related Work

#### Few-shot Learning

Few-shot learning aims to recognize new concepts given limited labeled examples. Meta-learning approaches train meta-models episodically so that they can adapt to new tasks with few samples—so-called learning-to-learn. Deep metric learning–based approaches emphasize learning good feature embeddings that facilitate downstream tasks. Hallucinator-based methods learn to generate synthetic data to alleviate scarcity.

#### Few-Shot Object Detection

Research tackling the challenging FSOD problem falls into two streams. Meta-learning approaches train a meta-learner to transfer knowledge from base to novel classes. Meta R-CNN meta-learns channel-wise attention layers to reconfigure the RoI head, and MetaDet applies a weight-prediction meta-model to dynamically transfer category-specific parameters from the base detector. Fine-tuning–based detectors include MPSR, which alleviates scale sparsity in few-shot datasets and sets the current SOTA, though its positive refinement branch involves manual decisions that limit generalizability.

#### Contrastive Learning

Renewed interest in contrastive learning has contributed to recent successes of self-supervised models. Optimizing contrastive objectives maximizes agreement between similar instances defined as positive pairs while encouraging differences between dissimilar instances as negatives. Through contrastive learning, algorithms build representations that encode high-level features sufficient to distinguish images without focusing on pixel-level details.

---

### Method

<img src="https://velog.velcdn.com/images/devjo/post/9e7b8b69-7043-459a-8856-619e25efb994/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Our FSCE method involves a simple two-stage training:

- First stage: a standard Faster R-CNN detector is trained with abundant base-class data ($D_{\text{train}} = D_{\text{base}}$).
- Second stage: the base detector is adapted via fine-tuning using a balanced dataset composed of novel instances and randomly sampled base instances ($D_{\text{train}} = D_{\text{novel}} \cup D_{\text{base}}$).

#### Contrastive object proposal encoding

In the two-stage detector framework, the RPN takes backbone feature maps as input to generate region proposals, and the RoI head classifies each proposal and regresses a bounding box if an object is predicted to be present. In Faster R-CNN, the RoI head first pools proposals to a fixed size, then encodes them into vector embeddings known as RoI features $\mathbf{x} \in \mathbb{R}^{D_R}$.

Generic detectors fail to build robust feature representations for region proposals from limited shots, leading to misclassification of localized objects and low AP. While one can aim to learn more discriminative proposal embeddings, experiments show that category-level positive-margin classifiers do not work in such data-scarce regimes.

To learn more robust object features with fewer shots, we apply batch contrastive learning to explicitly model instance-level intra-class similarity and inter-class distinction among object proposal embeddings.

To integrate contrastive representation learning into Faster R-CNN, we introduce a contrastive branch parallel to the classification and regression branches in the main RoI head. Since RoI feature vectors $\mathbf{x}$ contain post-ReLU values and are truncated at zero—preventing direct similarity measurement between proposal embeddings—the contrastive branch applies a lightweight 1-layer MLP head to encode RoI features into contrastive features $\mathbf{z} \in \mathbb{R}^{D_C}$, with default $D_C = 128$.

We then measure similarity scores among proposal representations using MLP-encoded RoI features and optimize a contrastive objective to maximize agreement among proposals of the same category while promoting separability for different categories. The logits for predicting instance $i$ as class $j$ use a cosine-similarity–based classifier on the hypersphere:

$$
 \text{logit}\{i,j\} = \alpha \frac{\mathbf{x}_i^\top \mathbf{w}_j}{\|\mathbf{x}_i\| \cdot \|\mathbf{w}_j\|}
$$

where $\alpha$ is a scaling factor to amplify gradients (empirically $\alpha = 20$). The proposed contrastive branch guides the RoI head to learn contrast-aware proposal embeddings that ease distinction among categories.

#### Contrastive Proposal Encoding (CPE) Loss

Inspired by supervised contrastive objectives in classification and re-identification, our CPE loss is tailored for detection as follows. Given a mini-batch of $N$ RoI box features $\{\mathbf{z}_i, u_i, y_i\}_{i=1}^N$, where $\mathbf{z}_i$ is the contrastive-head–encoded RoI feature for proposal $i$, $u_i$ is the IoU to its matched ground-truth box, and $y_i$ is the ground-truth label:

$$
 \mathcal{L}_{\text{CPE}} = \frac{1}{N}\sum_{i=1}^N f(u_i) \cdot \mathcal{L}_{z_i}
$$

$$
 \mathcal{L}_{z_i} = \frac{-1}{N_{y_i} - 1} \sum_{j=1, j \ne i}^N \mathbb{I}_{\{y_i = y_j\}} \cdot \log \frac{\exp(\tilde{\mathbf{z}}_i \cdot \tilde{\mathbf{z}}_j/\tau)}{\sum_{k=1, k \ne i}^N \exp(\tilde{\mathbf{z}}_i \cdot \tilde{\mathbf{z}}_k/\tau)}
$$

$N_{y_i}$ is the number of proposals sharing label $y_i$, and $\tau$ is the temperature hyperparameter as in InfoNCE. Here $\tilde{\mathbf{z}}_i = \frac{\mathbf{z}_i}{|\mathbf{z}_i|}$ denotes normalized features, so $\tilde{\mathbf{z}}_i \cdot \tilde{\mathbf{z}}_j$ measures cosine similarity on the projected hypersphere. Optimizing this loss increases instance-level similarity among proposals with the same label and pushes apart proposals with different labels in the projection space. Consequently, instances of each category form tighter clusters with enlarged margins around them.

Proposal consistency control. Unlike image classification where semantic signals come from the whole image, classification in detection comes from region proposals. Low-IoU proposals can deviate too far from the object center and include irrelevant semantics. To ensure consistency of proposals used for contrast, we use an IoU threshold.

In the above, $f(u_i)$ controls proposal consistency via threshold $\varphi$ and a reweighting function $g(\cdot)$:

$$
 f(u_i) = \mathbb{I}_{\{u_i > \varphi\}} \cdot g(u_i)
$$

$g(\cdot)$ assigns different weights to proposals at different IoU levels. We find $\varphi=0.7$ to be a good cutoff, training the contrastive head on the most central proposals.

In the first stage, the base detector is trained with standard Faster R-CNN losses: binary cross-entropy $\mathcal{L}_{\text{rpn}}$ for generating foreground proposals from anchors, cross-entropy $\mathcal{L}_{\text{cls}}$ for box classification, and smoothed-$\text{L}1$ $\mathcal{L}_{\text{reg}}$ for box regression deltas.

During fine-tuning on novel data, we add the contrastive loss in a multi-task fashion without destabilizing training:

$$
 \mathcal{L} = \mathcal{L}_{\text{rpn}} + \mathcal{L}_{\text{cls}} + \mathcal{L}_{\text{reg}} + \lambda \mathcal{L}_{\text{CPE}}
$$

with $\lambda = 0.5$ to balance losses.

---

### Conclusion

We present a new perspective on tackling FSOD via contrastive proposal encoding. By effectively preventing misclassification of accurately localized objects, the method achieves state-of-the-art results across all shots on two benchmarks. The proposed contrastive proposal encoding head is generally applicable at negligible cost and can be integrated into any two-stage detector without disrupting the training pipeline, demonstrating the viability of incorporating contrastive learning into detection frameworks.

---

### References

[Original Source #1](https://openaccess.thecvf.com/content/CVPR2021/papers/Sun_FSCE_Few-Shot_Object_Detection_via_Contrastive_Proposal_Encoding_CVPR_2021_paper.pdf)

---
title: 'Few-Shot Object Detection Based on Global Domain Adaptation Strategy'
date: '2025-04-09'
tags: ['computer vision', 'paper review']
---

### Abstract

Few-shot object detection (FSOD), which aims to detect novel objects with only a few annotated samples, has made remarkable progress. However, existing studies have paid little attention to the perspective of gradient propagation for optimizing existing methods, leading to limitations in fully utilizing information about novel objects during the gradient propagation process.

In this paper, we propose a two-stage fine-tuning approach that enhances learning efficiency by promoting gradient diffusion through a multi-constraint domain adaptation module, improves object classification performance with a classification promotion network, and enriches RoI features with a multi-path mask head to enhance the precision of object detection. The proposed model achieved a significant performance improvement of 1-5% compared to previous methods.

---

### Introduction

Object detection has established itself as a core technology in many complex scenarios such as railway transportation, disease detection, and license plate recognition. Thanks to deep learning technology, model performance has significantly improved, but maintaining good performance still requires large-scale datasets. However, obtaining such data in real-world engineering settings is not easy. Humans can learn new concepts with just one or two visual experiences. Objects that are data-sparse or difficult to annotate are called novel objects, and the technology for detecting them is called few-shot object detection (FSOD).

Existing methods based on meta-learning, metric learning, and transfer learning have limitations in that they fail to utilize efficient gradient optimization, and RoI features are not enhanced in the classification and regression stages, or the problem of misclassifying classes is severe.

---

### Methods

#### Problem Statement

<img src="https://velog.velcdn.com/images/devjo/post/b90109e5-e6ff-4d82-9093-de1142c0d90d/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

The dataset is divided into base categories ($C_{base}$) with rich annotations and novel categories ($C_{novel}$) with very few samples. We train the backbone and box predictor of Faster R-CNN using $C_{base}$ data. We then transfer-learn the model using a balanced dataset containing both base and novel instances.

#### Multi constraint terms domain adaptation

The existing GDL performs simple gradient descent between RCNN and RPN. However, there is room for improvement for faster and more efficient gradient updates. Multi-constraint terms are proposed to mitigate accuracy degradation caused by gradient delay. When the weight matrix is $M$ and the direction of the weight is $M' = \frac{M}{\|M\|_2^2}$, the backpropagation (BP) process is defined as follows.

$$
\begin{aligned}
M_{i+1} = M_i - \alpha \frac{\partial L}{\partial M_i} - \beta \frac{M_i}{\|M_i\|_2^2} \\
- \eta \left\langle \frac{\partial L}{\partial M_i}, \frac{M_i}{\|M_i\|_2^2} \right\rangle \cdot \frac{M_i}{\|M_i\|_2^2}
\end{aligned}
$$

Gradients in shallow layers are amplified to adjust toward domain-invariant directions, while gradients in deep layers are suppressed to focus on semantic information.

#### Classification promotion network

Existing RoIAlign may lose scale information during the process of normalizing feature maps. CPN compensates for this to refine classification scores. We compute the average object feature for each class $c$.

$$
P_c = \frac{\sum_{x_i \in S_c} x_i}{|S_c|}
$$

We fuse the existing classifier score $s_i$ with the cosine similarity score $s_{pair}$ with the prototype.

$$
s_{prom} = \lambda \cdot s_i + (1 - \lambda) \cdot s_{pair}
$$

#### Multi path mask head

<img src="https://velog.velcdn.com/images/devjo/post/23813345-0ee5-4a41-9a89-274f1cb4d056/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

To enhance feature extraction for few-shot objects, we add a multi-path mask head after the RoI pooling layer. The detail reconstruction network uses jump connections and up/down sampling to enrich internal information. We use leaky ReLU to prevent negative information loss.

$$
\text{Loss} = L_{cls} + L_{reg} + \mu \cdot L_{mask}
$$

Here, $L_{mask}$ uses average binary cross-entropy (BCE loss) to address the inter-class competition problem.

---

### Conclusion

This paper proposed an FSOD approach through gradient optimization and multi-path enhancement. We designed a multi-path data augmentation network to optimize information emerging from the RoI layer. This moves beyond the existing simple feature extraction approach and serves to restore object details more richly. To further improve performance, we added constraint terms to the gradient update process.

---

### References

[Original Source #1](https://link.springer.com/content/pdf/10.1007/s11063-025-11727-z.pdf)

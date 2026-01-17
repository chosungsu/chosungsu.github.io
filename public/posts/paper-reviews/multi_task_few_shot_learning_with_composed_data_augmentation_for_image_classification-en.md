---
title: 'Multi-Task Few-Shot Learning with Composed Data Augmentation for Image Classification'
date: '2023-07-21'
tags: ['computer vision', 'paper review']
---

### Abstract

Few-shot learning attempts to optimize models with very few samples, but still faces data sparsity problems. While data augmentation is widely used to address this, existing approaches fail to enable models to learn the properties of augmentation transformations themselves (e.g., rotation, deformation, etc.) because all augmented samples only repeat semantic information similar to the original.

This paper proposes a structure that simultaneously learns primary classification tasks and auxiliary tasks. We also propose Model-Agnostic Ensemble Inference (MAEI) to improve classifier reliability.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/cdc65541-2b91-4841-9c1e-dd1e36400f0a/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

Recent deep learning has surpassed human image classification capabilities through large-scale labeled data, but this is a data-dependent approach. In contrast, humans possess rapid adaptation abilities that can generalize and recognize concepts such as "cat" from just a single photograph. Building algorithms similar to humans in data-sparse situations holds significant practical value.

Existing self-supervised label augmentation (SLA) approaches had the drawback of increasing complexity by assigning dual labels (category + transformation information) to a single data point. This paper proposes parallel-structured multi-task learning to improve this. Through experiments with various combinations including rotation, Mixup, and Gaussian noise, we confirmed that using rotation and Mixup as self-supervised signals yields the best performance.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/93d62e67-00bb-4f47-a74e-a8a124eb2d64/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### Problem Statement

We perform episode-based learning to bridge the embedding space gap between base classes and novel classes. For each episode, we randomly sample $N$ classes from $D_{train}$ to construct support sets ($S$) and query sets ($Q$) in an $N$-way $K$-shot setting.

We augment the support set to obtain $S_{aug}$. The embedding function $f_{\phi}$ maps input $x$ to feature $z$. It consists of 4 ResNet blocks, each containing Conv2d, BN, ReLU layers and a Max pooling layer.

#### Composed Data Augmentation

In this study, we explored optimal combinations of three operations among rotation, Mixup, and color permutation as auxiliary self-supervised signals.

#### Multi-task for FSL

We use a metric learning-based prototype network architecture. The prototype $P_{m,n}$ for the $n$-th class in the $m$-th group is computed as the average of support features.

$$
P_{m,n} = \frac{1}{|S_{m,n}|} \sum_{x_{n,j} \in S_{m,n}} f_\phi(x_{n,j})
$$

We then compute the similarity score $s_{m,n}$ between query features and prototypes, and obtain the final prediction probability $s'_n$ through average weighting.

$$
s_{m,n} = \frac{\exp(-d(f_{\phi}(\tilde{x}), P_{m,n}))}{\sum_{n'} \exp(-d(f_{\phi}(\tilde{x}), P_{m,n'}))}
$$

This equation takes the form of a softmax commonly used in distance-based classifiers. Here, $d(f_{\phi}(\tilde{x}), P_{m,n})$ is the Euclidean distance between the feature vector of the query image ($f_{\phi}(\tilde{x})$) and the prototype of the $n$-th class in the $m$-th group. A smaller distance indicates greater similarity between the two data points. By applying a negative sign to the distance and taking the exponential function, we ensure that smaller distances (smaller values) yield larger results. This is the process of converting distance into a similarity score.

---

### Conclusion

This paper designed a model to understand transformation properties applied to data beyond simple image labeling by placing auxiliary self-supervised tasks in parallel with primary classification tasks. We proposed a plug-and-play decision fusion technique that requires no fine-tuning. In particular, we significantly improved the reliability of existing metric-based FSL models by removing outliers through NMS strategies.

Future work could deeply explore the impact of data augmentation on metric learning to extend to unsupervised tasks. It would also be valuable to analyze how larger neural network structures beyond ResNet-12 perform in such multi-task learning environments.

---

### References

[Original Source #1](https://ietresearch.onlinelibrary.wiley.com/doi/pdf/10.1049/cvi2.12150)

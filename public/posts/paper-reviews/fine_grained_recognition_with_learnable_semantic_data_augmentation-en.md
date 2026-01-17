---
title: 'Fine-grained Recognition with Learnable Semantic Data Augmentation'
date: '2024-10-11'
tags: ['computer vision', 'paper review']
---

### Abstract

Fine-grained image recognition is a classical computer vision task that distinguishes subcategories (e.g., 'gull' and 'swallow') within the same meta-category (e.g., 'bird'). The core of this field lies in discovering discriminative visual cues that capture very subtle visual differences between categories.

Image-level data augmentation techniques that were successful in general image classification are not well-suited for fine-grained recognition scenarios, as randomly cropping or editing images can likely destroy important visual cues present in very fine regions.

To address this problem, this paper proposes a method to diversify training data at the feature level rather than the image itself. We generate diverse variant samples by translating image features in meaningful directions.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/57bd1fdb-74a4-4f75-ac93-ab594f1c3f5d/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

This study aims to distinguish objects that are very similar in overall appearance but differ in fine-grained traits. Tasks such as distinguishing animal species, aircraft models, and retail product types fall into this category, and understanding very subtle visual differences is the core challenge.

Instead of directly modifying image pixels, we propose an augmentation method that translates samples in deep feature space. The covariance network CovNet takes features of each training sample as input and predicts a semantic direction (covariance matrix) optimized for that sample. We jointly train the classification network and CovNet but optimize them alternately using different objective functions. This solves the degeneration problem that occurs when simply training both networks simultaneously.

---

### Related works

Fine-grained recognition research has developed into two main paradigms. Localization methods identify discriminative parts of objects and intensively learn features from those parts. Detection/segmentation techniques, deep filter utilization, and attention mechanisms are primarily used. Next, feature encoding methods learn integrated discriminative representations to model fine differences across the entire image.

Meta-learning aims to improve algorithms themselves by learning to learn, rather than learning with fixed algorithms. Multi-task learning extracts common knowledge from multiple tasks and applies it to new tasks, while single-task learning repeatedly solves one problem to improve performance.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/93d62e67-00bb-4f47-a74e-a8a124eb2d64/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### Implicit Semantic Data Augmentation

While existing data augmentation directly modified image pixels, ISDA performs augmentation at the feature level, just before the last layer of the deep learning model. It translates feature vector $a_i$ in a meaningful direction ($\Sigma$). Instead of tens of thousands of random samplings, it maximizes computational efficiency by deriving an upper bound of expected loss assuming infinitely many augmentations.

Which direction is meaningful is determined through the covariance matrix ($\hat{\Sigma}$) of each class.

$$
\ell_{ISDA} = -\log \left( \frac{e^{w_{y_i}^T a_i + b_{y_i}}}{\sum_{j=1}^C e^{w_j^T a_i + b_j + \frac{\lambda}{2} v_{jy_i}^T \hat{\Sigma}_{y_i} v_{jy_i}}} \right)
$$

#### Covariance Matrix Prediction Network

The structure is a multilayer perceptron (MLP) form $g(\cdot; \theta_g)$. It takes deep features $a_i$ as input and outputs a sample-specific covariance matrix $\Sigma_i^g$.

$$
\ell_{ISDA}(x_i, y_i; \Sigma_i^g(\theta_g), \theta_f) = -\log \left( \frac{e^{w_{y_i}^T a_i + b_{y_i}}}{\sum_{j=1}^C e^{w_j^T a_i + b_j + \frac{\lambda}{2} v_{jy_i}^T \Sigma_i^g(\theta_g) v_{jy_i}}} \right)
$$

In this equation, the covariance term ($\frac{\lambda}{2} v_{jy_i}^T \Sigma_i^g v_{jy_i}$) is located in the denominator and is always positive. Therefore, as the denominator increases, the overall value (probability) decreases, and consequently the loss ($\ell_{ISDA}$) increases. This causes a degeneration problem where the model concludes that the state with minimal loss is when CovNet predicts the covariance as zero, meaning no augmentation at all.

#### The Meta-learning Method

This system has a structure where two networks with different objectives cooperate.

The classification network ($\theta_f$) minimizes ISDA loss ($L_{train}$) using training data. At this time, it directly uses the covariance $\Sigma$ provided by CovNet.

$$
\theta^*_f(\theta_g) = \arg \min_{\theta_f} L_{train}(\theta_f; \theta_g)
$$

The covariance prediction network ($\theta_g$) learns to predict optimal covariance that enables the classifier to minimize cross-entropy loss on validation data.

$$
\theta^*_g = \arg \min_{\theta_g} L_{meta}(\theta_f(\theta_g))
$$

---

### Conclusion

This paper proposed a meta-learning-based implicit data augmentation technique to maximize fine-grained image recognition performance.

Existing image-level data augmentation (Mixup, Cutout, etc.) had the problem of destroying fine discriminative regions essential for fine-grained classification due to their random editing nature. Instead of applying the same augmentation to all classes, we captured each sample's unique semantic variation direction through the covariance prediction network (CovNet).

We not only demonstrated performance improvements on various fine-grained recognition benchmark datasets, but also showed flexibility to be immediately applicable to diverse neural network structures from ResNet to ViT (Vision Transformer).

---

### References

[Original Source #1](https://arxiv.org/pdf/2309.00399)

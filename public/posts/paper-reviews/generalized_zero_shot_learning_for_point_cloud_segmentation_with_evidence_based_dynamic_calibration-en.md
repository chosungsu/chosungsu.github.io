---
title: 'Generalized Zero-Shot Learning for Point Cloud Segmentation with
Evidence-Based Dynamic Calibration'
date: '2025-04-23'
tags: ['computer vision', 'paper review']
---

### Abstract

Generalized zero-shot semantic segmentation for 3D point clouds aims to classify each point into both seen and unseen classes. A critical challenge of such models is their tendency to make biased predictions, often favoring classes encountered during training. This problem is more pronounced in 3D applications where the scale of training data is typically smaller than in image-based tasks.

In this paper, we propose E3DPC-GZSL, a novel method that reduces overconfident predictions for seen classes. This method does not use separate classifiers for seen and unseen classes. We address the overconfidence problem by integrating an evidence-based uncertainty estimator into the classifier. This estimator is used to adjust prediction probabilities using a dynamic calibrated stacking factor that considers point-wise prediction uncertainty.

---

### Introduction

Semantic segmentation of 3D point clouds refers to the task of classifying each point into specific semantic categories. Most existing methods for this task primarily use supervised learning techniques that rely on labeled datasets where each point is already classified. While these supervised learning models show excellent performance in segmenting trained categories, they face difficulties when dealing with novel or previously unseen categories, reducing their effectiveness in real-world scenarios.

To overcome these limitations, zero-shot learning (ZSL) provides a valuable alternative by enabling models to generalize learned knowledge to new and previously unseen categories. However, even with zero-shot learning, achieving accurate segmentation for these novel categories remains a significant challenge.

Cheraghian, Rahman, and Petersson (2019) made an early effort to apply ZSL to point clouds, focusing on classification tasks by learning to map point cloud features to word embedding spaces. Subsequent research introduced unsupervised skewness loss to address the hubness problem, which arises from the phenomenon where nearest neighbors of many data points in high-dimensional spaces converge to a single hub.

In the extension to generalized zero-shot learning (GZSL), we seek to recognize both seen and unseen categories during inference. There are two different configurations for achieving GZSL: transductive and inductive settings. The transductive setting allows the use of unlabeled data, i.e., unlabeled unseen points, while the inductive setting strictly avoids using unseen points during the training phase. A critical problem with GZSL models trained in this inductive setting is their tendency to favor seen categories used during training, often generating biased predictions.

To overcome this problem, two main approaches are commonly used. Binary classification is used to determine whether input data belongs to seen or unseen categories. For seen categories, supervised learning tasks are applied, and for unseen categories, ZSL tasks are applied. The calibrated stacking approach uses predefined hyperparameters to reduce the probability of seen categories, thereby adjusting the final prediction probabilities of GZSL models. By lowering the probability of seen categories, the relative probability of unseen categories is increased.

---

### Related works

#### 1. Point Cloud Semantic Segmentation

Qi et al. (2017) used multi-layer perceptrons (MLPs) that process individual points as input, including models specifically designed to directly handle unordered points. Another approach by Hua, Tran, and Yeung (2018) uses point-wise convolution techniques that apply kernel operations to point clouds to extract features. This also includes sparse convolution methods that map point clouds to grid cells and perform 3D convolution operations only where data exists to extract features. Recently, Zhao et al. (2021) proposed transformer-based methods that encode point clouds using attention mechanisms.

#### 2. Mitigating Prediction Bias Towards Seen Categories

ZSL models are typically trained with samples from seen categories, leading to bias towards those categories. This bias is more pronounced in inductive settings where unseen samples cannot be used during training. To address this problem, one approach is to distinguish samples as seen or unseen and then classify them accordingly. This approach effectively decomposes the GZSL task into supervised learning tasks for seen categories and ZSL tasks for unseen categories. Zhang and Koniusz (2018) used gating networks that perform binary classification before classifying specific categories.

A simple but effective calibration technique known as calibrated stacking is used in point cloud semantic segmentation models (Michele et al. 2021; Yang et al. 2023a) by raising the probability of unseen predictions to specified levels.

However, both approaches rely heavily on hyperparameters and struggle with consistently applying the same hyperparameters to all input data.


---

### Problem definition

For a given point cloud, the training set $D_{tr}$ contains $N_{tr}$ labeled point samples. Each sample in the training set consists of a point $x_i \in \mathbb{R}^{N_p}$ from the point cloud and its corresponding label $y_i$. Labels in $D_{tr}$ are drawn from a set of $N_s$ seen classes $Y^s$.

During training, class description vectors $t \in \mathbb{R}^{N_t}$ related to $N_s$ seen classes or $N_u$ unseen classes may be provided along with $y$ in the form of semantic attributes or natural language embeddings. In this paper, only class description vectors are provided and no unseen points are included.

Given a label set $Y = \{c_k\}_{k=1}^{N_c}$, generalized semantic segmentation can be achieved by introducing $w_c \in \mathbb{R}^{N_f \times N_c}$. The posterior probability $p$ can be implemented as $p_k = p(c_k|x)=\frac{e^{l_k}}{\sum^{N_c}_{j=1} e^{l_j}}$.

The cross-entropy loss function reaches its minimum when predicted probabilities perfectly match ground truth labels for all samples. That is, when the prediction probability for the correct class is 1 and 0 for all other classes. Therefore, minimizing cross-entropy loss tends to amplify differences between logit values, particularly increasing the highest logit and suppressing other logits. However, this tendency to make overconfident predictions can be problematic in GZSL. When a model encounters new unseen classes, it may struggle to generalize effectively because it has been trained to make very sharp distinctions between previously seen classes.

---

### Proposed approach

<img src="https://velog.velcdn.com/images/devjo/post/1611641c-3136-4005-8c7f-9beb4f917d28/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

To overcome the aforementioned problems, we propose a novel method called E3DPC-GZSL for generalized zero-shot semantic segmentation of 3D point clouds.

There are three main components: an encoder $E$ that extracts feature vectors $f$ from input points $x$, a decoder $D$ that generates synthesized features to help train classifiers for segmentation and transfer knowledge from seen to unseen categories, and a classifier $C$ with an uncertainty estimator $U$.

---

### Conclusion

In this paper, we dynamically calibrate classifier predictions by leveraging the uncertainty of input points. This uncertainty-based strategy helps improve the model's generalization performance by mitigating the bias that zero-shot models have towards seen classes.

Additionally, to address the data scarcity problem, we introduced a new training strategy that refines the semantic space by applying semantic tuning to text embeddings. These experiments show that E3DPC-GZSL outperforms state-of-the-art (SOTA) methods in 3D semantic segmentation.

Despite significant performance improvements compared to state-of-the-art methods, the impact is less pronounced in models that tend to generate overconfident results with high probability. Regularizing model overconfidence along with biased predictions in zero-shot settings could improve performance in such cases.

---

### References

[Original Source #1](https://ojs.aaai.org/index.php/AAAI/article/view/32446)

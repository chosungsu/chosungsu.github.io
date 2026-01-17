---
title: 'Meta-tuning Loss Functions and Data Augmentation for Few-shot Object Detection'
date: '2023-07-24'
tags: ['computer vision', 'paper review']
---

### Abstract

This paper defines current technologies by dividing them into two groups. Meta-learning learns complex meta-models that transform sample data into novel class models, which is powerful but has complex structures and is close to a black box. Next, fine-tuning simply adapts existing models to novel classes through gradient descent, showing surprisingly strong performance despite its simple structure.

This paper aims to contribute by optimizing the elements that drive fine-tuning using meta-learning.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/7b54c2a3-91d3-4514-8484-cc524115ccef/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

While state-of-the-art object detection models show excellent performance, the annotation cost of drawing thousands of accurate bounding boxes is very high. To overcome this, the goal of FSOD is to transfer knowledge from base classes with large-scale data to effectively detect novel classes with limited data.

The meta-tuning proposed in this paper learns not the model weights themselves, but the details of loss functions and augmentation to be used in the fine-tuning stage. Using reinforcement learning techniques, it finds optimal loss and augmentation parameters that maximize detection quality (mAP, etc.) when fine-tuned on specific novel class sets.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/8017de81-c20f-4f00-9380-698431508396/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### Problem definition

After learning from abundant data of base classes $C_b$, we build a detection model for novel classes ($C_n$) with very few ($k$-shot) data samples.

#### Meta-tuning Loss Functions

Most errors in FSOD originate from classification failures rather than localization. Therefore, this study parameterizes and tunes the classification loss function.

The simplest form is temperature scaling, which introduces a temperature parameter $\rho_\tau$ to the softmax function.

$$
\ell_{cls}(x, y; \rho) = - \frac{1}{N_{ROI}} \sum_{i}^{N_{ROI}} \log \left( \frac{e^{f(x_i, y_i) / \rho_\tau}}{\sum_{y'} e^{f(x_i, y') / \rho_\tau}} \right)
$$

A more sophisticated version introduces a time-varying temperature function $f_\rho(t)$ and class-specific scaling coefficients $\alpha$.

$$
f_\rho(t) = \exp(\rho_a t^2 + \rho_b t + \rho_c)
$$

#### Meta-tuning Procedure

Before applying the model to actual novel classes ($C_{novel}$), we simulate a virtual few-shot environment using existing base classes ($C_{base}$). For this, we divide the data into three parts. $D_{p\text{-}pretrain}$ is data for pre-training a temporary model for meta-tuning, $D_{p\text{-}support}$ is a small amount of data to mimic the fine-tuning stage, and $D_{p\text{-}query}$ is data for evaluating the performance of the fine-tuned model to calculate rewards.

Similar to the episode-based approach of meta-learning, we sample each parameter $\rho_j$ from a Gaussian distribution $N(\mu_j, \sigma^2)$. We train the model on $D_{p\text{-}support}$ using the sampled loss function/augmentation strength. We test the trained model on $D_{p\text{-}query}$ to obtain mAP (mean Average Precision) scores. After multiple attempts, we normalize the obtained mAP scores and use them as rewards ($R(\rho)$).

In the reinforcement learning update, we move the center ($\mu$) of the Gaussian distribution toward $\rho$ that gave the highest reward.

$$
\mu'_j \leftarrow \mu_j + \eta R(\rho) \nabla_{\mu} \log(p(\rho_j; \mu_j, \sigma))
$$

To reduce variance due to task difficulty differences, we whiten the mAP scores. This allows parameters that showed relatively better performance to have a greater impact on the update.

---

### Conclusion

This paper proposed a new approach called meta-tuning to overcome the limitations of fine-tuning-based frameworks, which are the simplest yet most powerful in the few-shot object detection (FSOD) field.

Existing fine-tuning models manually designed detailed settings such as loss functions and data augmentation. This has limitations in finding settings optimized for few-shot learning and makes it difficult to guarantee optimal performance. Therefore, we combined the principles of meta-learning with reinforcement learning to learn the learning dynamics of fine-tuning itself.

As a result, instead of complex meta-models in black-box form, we derived mathematically interpretable loss functions and optimal augmentation strengths.

---

### References

[Original Source #1](https://openaccess.thecvf.com/content/CVPR2023/papers/Demirel_Meta-Tuning_Loss_Functions_and_Data_Augmentation_for_Few-Shot_Object_Detection_CVPR_2023_paper.pdf)

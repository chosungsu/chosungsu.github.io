---
title: 'A generalized explanation framework for visualization of deep learning model predictions'
date: '2023.11.25'
tags: ['xai', 'paper review']
---

### Abstract

When using deep learning models, users want to understand the predictions.  
Galore (Generalized Explanation Framework) was proposed to address this.  
This approach computes:

1. __Deliberative__ explanations: why a prediction is likely correct.  
2. __Counterfactual__ explanations: why it is not something else.

---

### Introduction

<img src="https://velog.velcdn.com/images/ski06043/post/23e7fa2c-92a0-4e61-a09c-59f55ad80f41/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

The black-box nature of deep learning models causes challenges.  
XAI (Explainable AI) is a paradigm introduced to solve this.  
It typically uses attribution functions to produce heatmaps of image regions.

While this works well for general categorization (e.g., recognizing a "bird"),  
it lacks fine-grained explanation (e.g., distinguishing by "beak")  
and fails to satisfy user expectations on both correctness and incorrectness.

To overcome this, Galore is introduced. It uses __confidence scores__ in classification models,  
considering probability similarities among top-k classes and self-awareness in prediction.

---

### Galore

1. __Attributive Explanations__

These highlight likely contributing pixels.  
While intuitive, they can lead to exhaustive enumeration and lack insight on high-level reasoning.

2. __Deliberative Explanations__

Visual concepts are often subtly different.  
This causes ambiguity in classification, and users may distrust predictions due to this uncertainty.

3. __Counterfactual Explanations__

These provide more precise reasoning, offering answers like:  
"If it weren’t for this, it would have been that."

---

### IMPLEMENTATION

1. __Explanation Framework__

Let $H: X \to Y$ be a classifier mapping an image $x \in X$ to a class $y \in Y = \{1, ..., C\}$.  
Prediction is defined as: $y^* = \arg\max h(x)$.

Here, $h(x)$ is a convolution-based function and $y^*$ includes a __self-awareness confidence score__.

2. __Attributive Explanations__

An attribution function $a$ is applied to an activation tensor with spatial size $W \times H$ and channels $D$, extracted from input $x$.  
Most tensors $F$ are gradient variants of $h(x)$.

3. __Counterfactual Explanations__

<img src="https://velog.velcdn.com/images/ski06043/post/c6aa5505-e9b0-4da7-8218-ddf90b1f6620/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Counterfactual explanations assume an input image $x$, predicted class $y^*$,  
and a user-provided counterfactual class $y_c \ne y^*$.  
The goal is to compare features and mark boundary differences.

They define:

$R(x, y^*, y_c, x_c) = (D(x, y^*, y_c), D(x_c, y_c, y^*))$

- First heatmap identifies regions helpful for $y^*$ but not $y_c$.  
- Second heatmap does the reverse on another image $x_c$.

---

### Reference

[Original Path: https://ieeexplore.ieee.org/document/10034989](https://ieeexplore.ieee.org/document/10034989)

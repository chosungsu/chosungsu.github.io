---
title: 'Representation Learning'
date: '2024-12-11'
tags: ['Robotics', 'Manipulation', 'lecture']
---

### Overview

The state of a dynamical system is fundamentally a compressed description that captures the essential aspects of the system. These aspects may be time-varying or fixed parameters.

For example, in a walking robot, the robot's current pose and joint configuration are time-varying quantities, while the lengths and weights of limbs are fixed parameters.

The state at time $t$ is denoted as $\mathbf{x}_t$. A common assumption for such systems is that they have the Markov property. The Markov property states that future states depend only on the current state and not on past states.

$$
\mathbf{P}(\mathbf{x}_{t+1}|\mathbf{x}_t, \mathbf{x}_{t-1}, \ldots, \mathbf{x}_2, \mathbf{x}_1) = \mathbf{P}(\mathbf{x}_{t+1}|\mathbf{x}_t)
$$

Systems with the Markov property are modeled as fully observable cases by Markov Chains. Hidden Markov Models estimate the true state from noisy sensor observations, as the system's state is often unknown because it is not directly observed.

#### Generative and Discriminative Approaches

For example, consider the task of estimating an object's pose (state $\mathbf{x}$) from an input RGB image (observation $\mathbf{z}$).

Generative models compute the joint distribution using Bayes' rule through the likelihood $p(\mathbf{z}|\mathbf{x})$ and prior $p(\mathbf{x})$. They sample object poses $\mathbf{x}^{(i)}$ from the prior $p(\mathbf{x})$. Using an observation model $\mathbf{h}(\mathbf{x}^{(i)}) = \mathbf{z}^{(i)}$, they generate the most likely observation $\mathbf{z}^{(i)}$ from the sampled pose.

Discriminative models describe the conditional probability $p(\mathbf{x}|\mathbf{z})$ of state $\mathbf{x}$ given observation $\mathbf{z}$. They train a neural network (e.g., PoseCNN) to directly map input image $\mathbf{z}$ to the most likely output pose $\mathbf{x}$.

Thus, generative models understand how to generate data, while discriminative models learn boundaries directly to predict $\mathbf{x}$ given observation $\mathbf{z}$.

---

### Representation Learning

In computer vision, representation refers to the form that data takes at each stage of a pipeline. The form of raw sensor data at one end of the pipeline is called the input representation, and information inferred from raw sensor data is called the output representation.

Requirements for good representations are as follows.

They should contain minimal information while being sufficiently expressive to capture as many input configurations as possible. And by separability, different explanatory factors of input data variation should be represented independently. More abstract concepts should be explainable in terms of less abstract concepts, which increases feature re-use and computational efficiency.

#### Modern CV and Learned Representations

Modern computer vision methods replace manually extracted features with learned intermediate representations. Convolutional Neural Networks (CNNs) consist of convolutional filter layers applied to images, and these filters are learned using labeled training data.

These representations perform excellently in downstream tasks. And they exhibit hierarchical features remarkably similar to features extracted in traditional pipelines. However, learned representations lack interpretability compared to classical representations. To overcome this drawback, we visually understand what filters are actually learning by analyzing specific image patches that most strongly activate filters at each layer of the CNN.

#### Unsupervised and Self-Supervised Learning

Traditional supervised learning uses training datasets consisting of pairs of input data $\mathbf{x}_i$ and external labels $\mathbf{y}_i$. However, acquiring labels is expensive. Meaningful representations can be learned from data without labels.

An Autoencoder is a network architecture that aims to learn to perfectly reconstruct input images. An encoder compresses input $\mathbf{X}$ into a low-dimensional intermediate representation $\mathbf{z}$. And a decoder restores input $\mathbf{X}$ from $\mathbf{z}$ as reconstructed output $\hat{\mathbf{X}}$. It learns by minimizing reconstruction loss (the difference between $\mathbf{X}$ and $\hat{\mathbf{X}}$).

Self-supervised learning masks part of the input and uses it as the output label. For example, using pixels below the diagonal of an image as input and pixels above the diagonal as output, the network learns to reconstruct the upper part by only seeing the lower part.

---

### References

[Original source #1](https://web.stanford.edu/class/cs231a/course_notes/07-representation-learning.pdf)

---
title: 'PairwiseNet: Pairwise Collision Distance Learning for High-dof Robot Systems'
date: '2025-10-06'
tags: ['embodied ai', 'paper review']
---

### Abstract

Motion planning for robotic manipulation systems operating in complex environments remains a challenging problem. It requires evaluating both collision distances and their derivatives. Due to computational complexity, recent studies have attempted to learn collision distances using data-driven approaches. However, their performance degrades significantly for complex high-degree-of-freedom (high-dof) systems such as multi-arm robots. Moreover, models must be retrained whenever the environment undergoes even minor changes.

In this paper, we propose PairwiseNet, a model that estimates the minimum distance between two geometric shapes and overcomes many limitations of current models. By decomposing the global collision distance learning problem into smaller pairwise sub-problems, PairwiseNet can be used to efficiently compute global collision distances.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/a1221526-77de-47f1-8acd-5dd6aa465844/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

One possible solution to alleviate computational burden is to train collision distance functions using data. By collecting sufficient data consisting of robot configurations and their corresponding collision distances, machine learning models such as kernel perceptron models, Support Vector Machines (SVMs), and neural networks can be used to learn collision distance functions. These learned functions can then be used to quickly determine whether a given configuration is collision-free.

While these data-driven approaches have shown satisfactory results for low-degree-of-freedom (low-dof) robotic systems, they often suffer from performance degradation for high-dof robots. The issue lies in the fact that collision distance functions for high-dof robots are complex and highly non-convex.

Another challenge faced by existing data-driven methods is sensitivity to small environmental changes. For example, adding a new obstacle or changing the robot base position can lead to completely different collision distance functions. Many of these methods require repeating the entire training procedure from data collection to model training.

In this paper, we present PairwiseNet, a collision distance estimation method that offers a promising alternative to existing data-driven approaches used for predicting global collision distances. Instead of directly estimating global collision distances, PairwiseNet focuses on estimating pairwise collision distances. A pairwise collision distance is the minimum distance between two elements within a robotic system.

---

### Related works

#### 1. SVM

SVM classifiers have been used to identify whether each part pair of a humanoid robot is in a safe or dangerous self-collision state for a given joint configuration. Only the minimum distance of dangerous part pairs was estimated using capsule-based BV algorithms, simplifying collision distance and derivative computation.

SVM classifiers have also been applied to 14-degree-of-freedom dual-arm robotic manipulation systems. The SVM classifier takes as input a vector composed of all joint positions of the system and outputs a collision label of 1.

#### 2. Neural network

Joint positions have been used as inputs to multilayer perceptron neural network models. Position encoding vectors of joint configurations have been employed. Recently, GraphDistNet, a Graph Neural Network (GNN) model, has been proposed for collision distance estimation. This model takes as input information about geometric shapes represented as graphs for both manipulator links and obstacles, and predicts collision distances by leveraging geometric relationships between the two graphs.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/fd1f3b9f-e46c-4cf6-83ad-eeb1fcddd640/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

We assume access to a simulator environment of the target system, including robot kinematics and geometric shapes of links and obstacles. The goal is to determine optimal model parameters $\psi$ for a pairwise collision distance estimation model $f_\psi$ that can predict collision distances between any pair of two geometric shapes.

This model takes as input point cloud data of two geometric shapes $P_i, P_j$ (each represented in its corresponding object coordinates) and a relative transformation $T_{ij} \in \text{SE}(3)$, and outputs an estimated pairwise collision distance $\hat{d}_{ij}$ between the two shapes.

$$
\hat{d}_{ij} = f_\psi(P_i, P_j, T_{ij})
$$

First, a set of element pairs and their corresponding transformations $S(q) = \{(P_i, P_j, T_{ij}(q))\}_{i, j}$ is extracted from the target robotic system for a given joint configuration $q$. Next, PairwiseNet determines the pairwise collision distance between each element pair in $S(q)$, and the minimum distance found among them is considered the global collision distance of the robotic system.

#### Network Architecture

The encoder uses two EdgeConv layers of a Dynamic Graph Convolutional Neural Network to extract 32-dimensional shape feature vectors from point cloud data.

The regressor then combines the two shape feature vectors and the transformation into a single vector, and uses four fully connected layers with hidden state dimensions of $(128, 128, 128)$ to output the minimum distance.

Training of PairwiseNet uses the mean squared error (MSE) between estimated and actual collision distances as the loss function.

$$
\mathcal{L} = \frac{1}{|\mathcal{D}_{\text{train}}|} \sum_{(P_i, P_j, T_{ij}, d_{ij}) \in \mathcal{D}_{\text{train}}} ||f_\psi(P_i, P_j, T_{ij}) - d_{ij}||^2
$$

This approach includes an efficient inference strategy for global collision distance computation that eliminates the need to run the encoder. The encoder is a deep neural network that converts point cloud data into feature vectors. Since point cloud data of element pairs does not change regardless of joint configuration, shape feature vectors of element pairs can be computed and stored once for each robotic system before computing collision distances. Using these precomputed shape feature vectors, PairwiseNet can estimate collision distances using only the regressor, which is a simple neural network composed of fully connected layers.

---

### Conclusion

In this paper, we present PairwiseNet, a novel collision distance estimation method that estimates the minimum distance between element pairs instead of directly predicting the global collision distance of robotic systems.

By simplifying the problem into smaller sub-problems, we achieve significant performance improvements for high-degree-of-freedom (high-dof) robotic systems compared to methods that directly predict global collision distances.

Furthermore, PairwiseNet can handle environmental changes such as robot base repositioning without additional training or fine-tuning. We evaluated and compared PairwiseNet's collision distance estimation performance for both high-dof multi-arm robotic systems and single-arm systems with obstacles, validating its accurate collision distance estimation and generalization ability to environmental changes.

---

### References

[Original Source #1](https://openreview.net/pdf?id=Id4b5SY1Y8)

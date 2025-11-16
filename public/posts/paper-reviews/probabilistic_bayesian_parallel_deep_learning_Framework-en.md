---
title: 'A probabilistic bayesian parallel deep learning framework for wind turbine bearing fault diagnosis'
date: '2025-09-22'
tags: ['fault diagnosis', 'paper review']
---

### Abstract

Fault diagnosis technology helps improve the reliability of wind turbines. In deep learning–based wind turbine bearing fault diagnosis processes, difficulties in feature extraction and low reliability of diagnostic results are widespread problems.

This paper proposes a Probabilistic Bayesian Parallel Deep Learning framework to achieve fault classification. First, a Parallel Deep Learning (PDL) framework is proposed to address the difficulty of feature extraction for bearing faults. Next, weights and biases within the PDL framework are converted from deterministic values to probability distributions. This approach explores methods to recognize uncertainty to achieve reliable machine fault diagnosis.

Using wind turbine generator gearbox output shaft bearing fault signals from a wind power plant as an example, the diagnostic accuracy of the proposed method reaches $99.14\%$, and the reliability of diagnostic results is higher than other comparison methods. Experimental results show that the BayesianPDL framework has unique advantages in fault diagnosis of wind turbine bearings.

---

### Introduction

Condition monitoring and fault diagnosis technologies for wind turbines are receiving increasing attention. By the end of 2019, the total installed capacity of wind turbines reached $651 \text{ GW}$. Wind turbines operate under severe and extremely complex working conditions for long periods, leading to high component failure rates.

During wind turbine operation, vast amounts of data are generated. Data-driven fault diagnosis models, such as multilayer perceptrons, rough sets, Dempster–Shafer theory, support vector machines, and deep learning, provide new research directions to address the above problems. Li et al. proposed a backpropagation-based local feature learning method for rolling bearing fault diagnosis. Xu et al. proposed an improved chaos particle swarm optimization support vector machine method for fault diagnosis.

Shallow learning machines are prone to overfitting during training, leading to slow training speeds and poor diagnostic effectiveness. Deep learning provides solutions to address the above problems. To solve the insufficient extrapolation problem for bearing fault diagnosis in real wind turbines, Xu et al. designed a multi-scale convolutional neural network with bidirectional long short-term memory. Since the output of diagnostic results is the label of the class with the largest probability value, it cannot provide a certain degree of reliability for this classification result. The reliability of diagnostic results is challenged.

Bayesian deep learning provides a new way to create neural networks with uncertainty and provide diagnostic results with reliability. Tang et al. used a Bayesian optimization algorithm to optimize convolutional neural networks and achieved consistent results.

In summary, a probabilistic Bayesian parallel deep learning framework is proposed to achieve fault multi-classification with high reliability. This addresses the difficulty of fault feature extraction for wind turbine bearings and the low reliability of diagnostic results. A Parallel Deep Learning (PDL) framework is proposed to effectively extract fault features of wind turbine bearings.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/cd040435-950d-46c8-8133-9302805bd22a/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

When wind turbine fault data are collected, the collected signal data contain much redundant information and severe interference due to complex environments. Therefore, a Parallel Deep Learning (PDL) framework is proposed. This framework consists of multiple Parallel Fusion Residual Blocks (PFRBs), each composed of two fusion residual blocks.

#### Parallel Fusion Residual Block

A fusion residual block consists of two convolutional basic units and one max-pooling layer, where a convolutional basic unit consists of a convolutional layer and a batch normalization layer. Different convolutional basic units use different activation functions.

$$
X_{\text{PFRB}_1} = X^{(n,1)} + X^{(n,2)}
$$

$X^{(n,1)}$ and $X^{(n,2)}$ represent the outputs of the first and second fusion residual blocks of the $n$-th $\text{PFRB}$, respectively.

#### Attention Feature Fusion Layer

After convolution, pooling, and other operations, the semantic information of features can be effectively improved. Before feature fusion, it is necessary to distinguish fault features from noise. Through the attention mechanism, focus is placed on fault features and noise is suppressed.

$$
A((K, V), \phi) \triangleq \sum_{i=1}^{\Delta} \frac{\exp \left(\mathbf{X}_{i}^{T} \phi / \sqrt{\delta}\right)}{\sum_{j} \exp \left(\mathbf{X}_{j}^{T} \phi / \sqrt{\delta}\right)} \mathbf{v}_{i}
$$

Here, $A$ denotes the attention value. $(K, V) = [(k_1, v_1), (k_2, v_2), \ldots, (k_\Delta, v_\Delta)]$ represents the $\Delta$-th input information. $K$ represents the attention distribution, and $V$ represents aggregated information. $\phi$ is the task query vector. $\delta$ represents the input dimension.

Under the action of the attention mechanism, high attention values are obtained for fault features. High attention values have higher fusion weights, so feature enhancement is achieved when features are fused. Noise has lower attention values. Since noise fusion weights are low during feature fusion, noise is not enhanced.

---

### Conclusion

Fault diagnosis of wind turbines plays an important role in improving the reliability of wind turbines. To address the difficult feature extraction and low reliability of diagnostic results in traditional deep learning for wind turbine bearing faults, a probabilistic Bayesian parallel deep learning framework fault diagnosis method is proposed.

High-level feature data are enriched. The fault feature extraction capability of the PDL framework is improved without increasing network parameters. Through the attention mechanism, useful information within extracted features is identified by the network. All hyperparameters are provided with probability distributions to make the neural network uncertain.

---

### References

[Original Source #1](https://www.mdpi.com/1424-8220/22/19/7644)

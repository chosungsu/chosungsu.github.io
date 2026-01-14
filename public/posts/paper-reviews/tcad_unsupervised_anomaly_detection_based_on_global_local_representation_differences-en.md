---
title: 'TCAD: Unsupervised Anomaly Detection Based on Global Local Representation Differences'
date: '2022-11-07'
tags: ['anomaly detection', 'paper review']
---

### Abstract

Multivariate time series anomaly detection has attracted significant attention due to its wide range of applications. Because it is difficult to obtain accurate anomaly labels, many unsupervised anomaly detection algorithms have been proposed. However, it remains highly challenging to build unsupervised multivariate anomaly detection models, since one must still construct effective criteria for distinguishing anomalies.

Most prior work focuses on extracting relationships between individual time points and global sequences, while largely overlooking the relationships between time points and local sequences.

In this paper, the authors propose TCAD, a joint model based on a Transformer and a ResNet. The Transformer is used to learn global features of the sequence, whereas the ResNet is used to learn local features.

---

### Introduction

Modern real world systems operate continuously and generate time series data across all domains, including scientific experiments, industrial processes, and commercial applications. In particular, multivariate time series arise as high dimensional, temporally dependent data produced by networks of interrelated subsystems.

Detecting anomalies in an unsupervised manner is a particularly difficult problem. Classical methods such as LOF, KDE, OC SVM, IForest, and KNN typically assume independence between samples and therefore fail to exploit temporal information. Early deep learning approaches also tend to rely on point by point computations and are thus unable to capture global contextual information accurately.

The key idea in this paper is to combine complementary strengths of two encoders. The Transformer encoder uses a self attention mechanism to model global representations and temporal correlations at each time step, thereby capturing rich contextual semantics. The ResNet encoder fuses local contextual information along the time axis to build expressive local representations of the sequence.

---

### Method

#### Overview

<img src="https://velog.velcdn.com/images/devjo/post/63702c64-18ff-405d-8c1f-49dca31c59c1/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Consider a multivariate time series $T = \{x_1, \dots, x_T\}$, where each $x_t \in \mathbb{R}^m$ and $m$ is the number of variables. The full sequence is divided into subsequences of fixed length $n$, denoted by $S = \{x_1, \dots, x_n\}$, which are used as inputs to the network. The objective is to construct a discriminative criterion that can effectively distinguish normal samples from anomalous ones.

To this end, two encoders are used in parallel. The Transformer encoder produces a latent representation $Z_1$ that captures global information, and the ResNet encoder produces a latent representation $Z_2$ that captures local information. Finally, an $L_2$ loss is applied to encourage a large difference between these two representations.

#### Transformer Encoder

The Transformer is particularly effective at capturing long range dependencies within sequences. In this model, it is used with a self attention mechanism to extract global temporal correlations.

$$
\text{Attention}(Q, K, V) = \text{Softmax}\left(\frac{QK^T}{\sqrt{d}}\right)V
$$

By applying multi head attention, the model learns sequence information in multiple independent subspaces, which leads to richer global representations.

#### Resnet Encoder

For multivariate time series anomaly detection, it is important to preserve neighborhood connections and spatial local features, and to capture local spatial and temporal correlations. This capability yields local representations that contain rich localized information.

ResNet architectures are well suited to preserving connections between adjacent time steps and local spatial features. The ResNet encoder in TCAD consists of three ResNet blocks and an upsampling layer. Skip connections help prevent gradient vanishing, and convolution kernels with different sizes are used to learn multi scale local information.

Specifically, $Z'_2 = \text{Conv1d}_1(X)$ is a projection layer that maps the input into the same shape as $Z'''_2$. The layer $Z''_2 = \text{Dropout}(\text{ReLU}(\text{BatchNorm}(\text{Conv1d}_2(Z'_2))))$ acts as a sampling layer that learns neighborhood dependencies and spatial features in the sequence, and $Z'''_2 = \text{Dropout}(\text{ReLU}(\text{BatchNorm}(\text{Conv1d}_3(Z''_2))))$ is a feedforward layer with kernel size 1.

---

### Conclusion

This paper studies the problem of unsupervised anomaly detection for time series. In contrast to prior work, the proposed model uses a Transformer encoder to learn global features and global temporal patterns of the sequence, and a ResNet encoder to learn local features and local temporal patterns.

Building on the key observation that differences between local and global representations can be informative for anomaly detection, the authors propose TCAD, which employs a two branch encoder structure that refines learned sequence representations and reconstructs the difference between them.

---

### References

[Original Source 1](https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=9928254)

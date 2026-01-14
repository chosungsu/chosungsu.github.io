---
title: 'Robust Unsupervised Anomaly Detection With Variational Autoencoder in Multivariate Time Series Data'
date: '2022-10-10'
tags: ['anomaly detection', 'paper review']
---

### Abstract

Accurate anomaly detection in multivariate time series has received considerable attention due to its importance in many real world applications. Because it is difficult to obtain accurately labeled data, a large number of unsupervised anomaly detection algorithms have been proposed for multivariate time series. However, building such systems remains highly challenging, since one must capture temporal dependencies within each time series as well as inter correlations among different series. To address this problem, the authors propose a Multi Scale Convolutional Variational Autoencoder (MSCVAE).

---

### Introduction

Anomaly detection is the task of identifying unexpected data points or events that deviate significantly from what is expected. Time series anomalies are typically categorized into three types. Point anomalies are individual points that deviate substantially from the overall data range. Contextual anomalies are values that are anomalous relative to other data under the same context. Collective anomalies occur when a subset of data points deviates substantially from the behavior exhibited by the rest of the dataset.

Recent machine learning approaches such as ConvLSTM and VAE have led to substantial progress in time series modeling. However, VAE based anomaly detection has not yet received sufficient attention in highly imbalanced settings, where normal data vastly outnumbers anomalous data.

In this work, the authors construct multi scale attribute matrices that characterize the system state at multiple temporal scales. They then use an attention based ConvLSTM to capture temporal patterns and reconstruct the attribute matrices. In addition, they propose a new strategy based on the confusion matrix to improve the robustness of the model under severe imbalance between normal and anomalous data.

---

### Method

#### Overview

<img src="https://velog.velcdn.com/images/devjo/post/02588c17-a92a-4d6c-8f94-3b0f662273ff/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Consider $n$ multivariate time series of length $T$, denoted by $X = (x_1, x_2, \dots, x_n)^T \in \mathbb{R}^{n \times T}$. The goal is to identify anomalous events occurring at time steps after $T$. The model is trained only on normal data so that it learns patterns corresponding to normal system states.

To characterize the system state, it is important to represent correlations between different pairs of time series. For this purpose, the authors construct attribute matrices of size $n \times n$ using pairwise inner products over segments from time $t - w$ to $t$. The correlation $m^t_{ij}$ between two series $x_i$ and $x_j$ at time $t$ is defined as

$$
m^t_{ij} = \frac{\sum_{\gamma=0}^{w} x^{t-\gamma}_i x^{t-\gamma}_j}{w}
$$

where $w$ is the sliding window length. This matrix captures both similarity in shape and correlation in magnitude between the time series.

#### VAE

The variational autoencoder is an unsupervised learning architecture that compresses inputs into a latent variable space and then reconstructs them. Unlike a standard autoencoder, a VAE encoder outputs a probability distribution for each latent variable rather than a single deterministic value, which enables it to learn more flexible and complex data representations.

$$
\mathcal{L}(x_i) = -\mathbb{E}_{z \sim q(z|x_i)} [\log p(x_i|z)] + \text{KL}(q(z|x_i) \| p(z))
$$

The objective consists of a reconstruction loss that maximizes the likelihood of reconstructing the input and a regularization term (the KL divergence) that encourages the learned posterior to be close to the prior distribution.

#### Convolutional Encoder

To encode the spatial structure of the attribute matrices, the authors apply four convolutional layers. Each layer uses filter kernels $W$ and biases $b$ to extract feature maps.

$$
P_{t,l} = f(W^l_e * P_{t,l-1} + b^l_e)
$$

#### Threshold Setting Strategy

Traditional ROC based thresholding strategies often become biased toward certain metrics when the data are highly imbalanced, with normal samples far outnumbering anomalous ones. This can lead to poor performance in terms of F1 score. To address this issue, the authors propose a new strategy that minimizes the error rate (ERR).

$$
\text{ERR} = \frac{FP}{FP + TP + TN}
$$

---

### Conclusion

This paper proposes an innovative MSCVAE framework to tackle anomaly detection in multivariate time series data. The framework converts multivariate time series into multi scale attribute matrices that characterize the system state across different temporal segments.

By adopting a convolutional variational autoencoder to reconstruct the attribute matrices, the method leverages the strengths of VAEs. An attention based ConvLSTM network is used to capture complex temporal patterns.

---

### References

[Original Source 1](https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=9783083)

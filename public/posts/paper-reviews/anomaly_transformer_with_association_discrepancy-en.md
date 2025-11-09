---
title: 'ANOMALY TRANSFORMER: TIME SERIES ANOMALY
DETECTION WITH ASSOCIATION DISCREPANCY'
date: '2022-09-16'
tags: ['anomaly detection', 'paper review']
---

### Abstract

Detecting anomaly points in time series data in an unsupervised manner is a challenging problem where models must derive distinguishable criteria.

Previous methods have approached this problem primarily by learning pointwise representations or pairwise associations, but neither is sufficient to infer intricate dynamics.

Recent transformers have shown great power in modeling pointwise representations and pairwise associations in an integrated manner, and we have discovered that the self-attention weight distribution at each time point can implement rich associations with the entire time series.

Due to the rarity of anomaly points, it is extremely difficult to build nontrivial associations from abnormal points to the entire time series. Therefore, the associations of anomaly points will be primarily concentrated on adjacent time points. This adjacent-concentration bias inherently contains an association-based criterion that can distinguish normal and abnormal points, which we emphasize through Association Discrepancy.

We propose an Anomaly Transformer with a novel Anomaly-Attention mechanism for computing association discrepancy. A minimax strategy is devised to amplify the distinguishability between normal and abnormal cases.

---

### Introduction

Real-world systems always operate continuously and can generate a series of continuous measurements monitored through multiple sensors, such as industrial equipment and space probes. Finding malfunctions in large-scale system monitoring data can be reduced to detecting abnormal time points in time series data, which is crucial for ensuring security and preventing financial losses.

However, anomalies are generally rare and hidden among vast normal points, making data labeling difficult and expensive. Therefore, we focus on time series anomaly detection in an unsupervised setting. Unsupervised time series anomaly detection is actually very difficult. Models must learn informative representations from complex temporal dynamics through unsupervised learning tasks. At the same time, they must derive distinguishable criteria that can detect rare anomaly points among many normal time points.

Various classical anomaly detection methods have provided many unsupervised learning paradigms. For example, density estimation-based methods include LOF (Local Outlier Factor) [Breunig et al. (2000)], and clustering-based methods include OC-SVM (One-Class SVM) [Scholkopf et al. (2001)] and SVDD [Tax & Duin (2004)]. These classical methods do not consider temporal information and are difficult to generalize to unknown real scenarios.

In this paper, we apply Transformers [Vaswani et al. (2017)] to time series anomaly detection in an unsupervised setting. Transformers have achieved great success in various domains including natural language processing [Brown et al. (2020)], machine vision [Liu et al. (2021)], and time series [Zhou et al. (2021)]. This success is thanks to their excellent ability to model global representations and long-range relations in an integrated manner. By applying transformers to time series, we discovered that temporal associations at each time point can be obtained from the self-attention map. This appears as an association weight distribution for all time points along the temporal dimension. The association distribution at each time point provides more informative descriptions of temporal context and represents dynamic patterns such as periodicity or trends in the time series.

---

### Related Work

#### 1. Unsupervised Time Series Anomaly Detection

Paradigms can be largely classified into density-estimation, clustering-based, reconstruction-based, and autoregression-based methods according to anomaly point decision criteria.

$\Rightarrow$ Density estimation-based methods

The classical method LOF (Local Outlier Factor) [Breunig et al. (2000)] calculates local density and local connectivity for each anomaly point decision.

DAGMM [Zong et al. (2018)] and MPPCACD [Yairi et al. (2017)] integrate Gaussian Mixture Models (GMM) to estimate the density of representations.

$\Rightarrow$ Clustering-based methods

Anomaly scores are always formulated as distances to cluster centers.

SVDD [Tax & Duin (2004)] and Deep SVDD [Ruff et al. (2018)] gather representations obtained from normal data into dense clusters.

THOC [Shen et al. (2020)] fuses multi-scale temporal features of intermediate layers through hierarchical clustering mechanisms and detects anomaly points through multi-layer distances.

$\Rightarrow$ Reconstruction-based models

Attempt to detect anomaly points through reconstruction error.

Park et al. (2018) presented the LSTM-VAE model using an LSTM backbone for temporal modeling and VAE (Variational AutoEncoder) for reconstruction.

OmniAnomaly proposed by Su et al. (2019) extends the LSTM-VAE model through normalizing flow and uses reconstruction probability for detection.

#### 2. Transformers for Time Series Analysis

For time series analysis, transformers are used to discover reliable long-range temporal dependencies by leveraging the benefits of the self-attention mechanism [Kitaev et al. (2020); Li et al. (2019b); Zhou et al. (2021); Wu et al. (2021)].

Particularly in time series anomaly detection, GTA proposed by Chen et al. (2021) uses graph structures to learn relationships among multiple IoT sensors, uses transformers for temporal modeling, and uses reconstruction criteria for anomaly detection.

Unlike previous uses of transformers, the Anomaly Transformer innovates the self-attention mechanism into Anomaly-Attention based on the key observation of association discrepancy.

---

### Method

We assume a system that continuously monitors $d$ measurements and records observations at regular intervals. The observed time series $\mathbf{X}$ is represented as a set of time points ${x_1, x_2, \ldots, x_N}$, where $x_t \in \mathbb{R}^d$ represents the observation at time point $t$. The unsupervised time series anomaly detection problem is to determine whether $x_t$ is anomalous or not without labels.

As mentioned earlier, we emphasize that the core of unsupervised time series anomaly detection lies in learning informative representations and discovering distinguishable criteria. We propose an Anomaly Transformer to address this problem by discovering more informative associations and learning Association Discrepancy that can inherently distinguish normal-abnormal cases. Technically, we propose Anomaly-Attention to implement prior-association and series-associations, and add a minimax optimization strategy to obtain more distinguishable association discrepancy. Together with this architecture, we derive an association-based criterion based on learned association discrepancy.

#### 1. Anomaly Transformer

<img src="https://velog.velcdn.com/images/devjo/post/3546c3f3-176c-49d6-b3bb-6de943a8a620/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Given the limitations of vanilla transformers [Vaswani et al. (2017)] for anomaly detection, we innovate the vanilla architecture into an Anomaly Transformer with the Anomaly-Attention mechanism.

The Anomaly Transformer is characterized by alternately stacking Anomaly-Attention blocks and feed-forward layers. This stacking structure helps learn fundamental associations from deep multi-level features. We assume a model with length $N$ containing $L$ layers. The input time series is $\mathbf{X} \in \mathbb{R}^{N \times d}$. The full formula for the $l$th layer is formulated as follows.

$$
\mathbf{Z}^l = \text{Layer-Norm}(\text{Anomaly-Attention}(\mathbf{X}^{l-1}) + \mathbf{X}^{l-1}) \\
\mathbf{X}^l = \text{Layer-Norm}(\text{Feed-Forward}(\mathbf{Z}^l) + \mathbf{Z}^l)
$$

#### 2. Anomaly-Attention

Noting that the single-branch self-attention mechanism [Vaswani et al. (2017)] cannot model prior-association and series-association simultaneously, we propose Anomaly-Attention with a two-branch structure.

For prior-association, we adopt a learnable Gaussian kernel to compute prior-association over relative time distance. Thanks to the unimodal property of the Gaussian kernel, this design can constitutively pay more attention to adjacent ranges. Additionally, by using a learnable scale parameter $\sigma$ for the Gaussian kernel, we make the prior-association adaptive to various time series patterns (e.g., different lengths of anomaly segments). The series-association branch learns associations from the original time series, adaptively finding the most effective associations.

These two forms maintain temporal dependencies at each time point, which is more informative than pointwise representations. They also reflect adjacent-concentration prior and learned actual associations, respectively, and their discrepancy should be able to distinguish normal-abnormal cases. The Anomaly-Attention at the $l$th layer is as follows:

$$
\mathbf{Q}, \mathbf{K}, \mathbf{V}, \sigma = \mathbf{X}^{l-1}\mathbf{W}^l_Q, \mathbf{X}^{l-1}\mathbf{W}^l_K, \mathbf{X}^{l-1}\mathbf{W}^l_V, \mathbf{X}^{l-1}\mathbf{W}^l_{\sigma} \\
\mathbf{P}^l = \text{Rescale} \left[ \left\{ \frac{1}{\sqrt{2\pi}\sigma_i} \exp \left( -\frac{|j-i|^2}{2\sigma_i^2} \right) \right\}_{i,j \in \{1,\ldots,N\}} \right] \\
\mathbf{S}^l = \text{Softmax} \left( \frac{\mathbf{Q}\mathbf{K}^T}{\sqrt{d_{\text{model}}}} \right) \\
\mathbf{\tilde{Z}}^l = \mathbf{S}^l \mathbf{V}
$$

#### 3. Association Discrepancy

We formulate association discrepancy as symmetrized KL divergence between prior-association and series-association, which represents the information gain between these two distributions [Neal (2007)]. To combine associations of multi-level features for a more informative measurement, we average the association discrepancy of multiple layers.

$$
\text{AssDis}(\mathbf{P}, \mathbf{S}; \mathbf{X}) = \left[ \frac{1}{L} \sum_{l=1}^{L} \left( \text{KL}(\mathbf{P}^l_{i,:} \Vert \mathbf{S}^l_{i,:}) + \text{KL}(\mathbf{S}^l_{i,:} \Vert \mathbf{P}^l_{i,:}) \right) \right]_{i=1, \ldots, N}
$$

#### 4. Minimax Strategy

<img src="https://velog.velcdn.com/images/devjo/post/a5c32c01-41cb-469f-9440-b9ca46198e0d/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Noting that directly maximizing association discrepancy can reduce the scale parameter of the Gaussian kernel to an extreme, making the prior-association meaningless [Neal (2007)], we propose a minimax strategy to better control association learning.

Specifically, in the Minimize Phase, we guide prior-association $\mathbf{P}^l$ to approximate series-association $\mathbf{S}^l$ learned from the original series. This process will make the prior-association adaptive to various temporal patterns.

In the Maximize Phase, we optimize series-association to enlarge association discrepancy. This process forces series-association to pay more attention to non-adjacent ranges. Therefore, the loss functions for both phases that integrate reconstruction loss are as follows:

$$
\text{Minimize}: \mathcal{L}_{\text{Total}}(\mathbf{\hat{X}}, \mathbf{P}, \mathbf{S}_{\text{detach}}, -\lambda; \mathbf{X}) \\
\text{Maximize}: \mathcal{L}_{\text{Total}}(\mathbf{\hat{X}}, \mathbf{P}_{\text{detach}}, \mathbf{S}, \lambda; \mathbf{X})
$$

where $\lambda > 0$ and $\text{detach}$ means stopping gradient backpropagation of associations. As $\mathbf{P}$ approximates $\mathbf{S}_{\text{detach}}$ in the Minimize Phase, the Maximize Phase imposes stronger constraints on series-association, forcing time points to pay more attention to non-adjacent regions. Under reconstruction loss, this is much more difficult for anomaly points than normal time points, amplifying the normal-abnormal distinguishability of association discrepancy.

---

### Conclusion

This paper studies the unsupervised time series anomaly detection problem. Unlike previous methods, we learn more informative time-point associations through Transformers [Vaswani et al. (2017)].

Based on the key observation of association discrepancy, we propose an Anomaly Transformer that includes Anomaly-Attention with a two-branch structure to implement association discrepancy.

We further amplified the difference between normal and abnormal time points by adopting a minimax strategy. By introducing association discrepancy, we propose an association-based criterion that makes reconstruction performance and association discrepancy cooperate.

The Anomaly Transformer achieves state-of-the-art results in extensive empirical studies.

Future work includes theoretical studies of the Anomaly Transformer from the perspective of classical analysis of autoregression and state space models.

---

### References

[Original source #1](https://arxiv.org/pdf/2110.02642)

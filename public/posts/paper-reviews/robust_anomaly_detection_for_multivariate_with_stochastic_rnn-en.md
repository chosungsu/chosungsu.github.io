---
title: 'ROBUST ANOMALY DETECTION FOR MULTIVARIATE TIME SERIES THROUGH STOCHASTIC RECURRENT NEURAL NETWORK'
date: '2022-09-23'
tags: ['anomaly detection', 'paper review']
---

### Abstract

Industrial devices (entities) such as server machines, spacecraft, and engines are generally monitored as multivariate time series, and anomaly detection for them is crucial for managing service quality of entities. However, due to complex temporal dependencies and stochasticity in multivariate time series, anomaly detection for them remains a significant challenge.

This paper proposes OmniAnomaly, a stochastic recurrent neural network for multivariate time series anomaly detection that works robustly well across various devices.

The core idea of this model is to capture normal patterns by learning robust representations of multivariate time series using key techniques such as stochastic variable connection and planar normalizing flow, reconstruct input data through these representations, and determine anomaly points using reconstruction probabilities.

Furthermore, for detected entity anomalies, OmniAnomaly can provide interpretations based on reconstruction probabilities of component univariate time series.

OmniAnomaly achieves an F1-Score of 0.86, which is 0.09 higher than the best-performing baseline method, demonstrating significantly superior performance. The interpretation accuracy for OmniAnomaly reaches up to 0.89.

---

### Introduction

Generally, detecting entity anomalies directly at the entity-level using multivariate time series is preferred over detecting anomalies at the metric-level using univariate time series for several reasons.

Practical issues: Field operations engineers are more interested in the overall status of entities rather than individual component metrics.

Labor intensity: Due to the large number of metrics, training and maintaining individual anomaly detection models for each metric is labor-intensive.

Complex rules: Incidents that occur in entities generally trigger anomalies in multiple metrics. When detecting anomalies at the metric-level, rules must be defined to process anomaly results from all metrics to determine entity anomalies, which requires extensive domain knowledge and is difficult.

Information advantage: Intuitively, modeling the expected values of a univariate time series can benefit from more information in multivariate time series from the same entity.

In summary, detecting anomalies at the entity-level is more intuitive, effective, and efficient than at the metric-level. Therefore, this paper focuses on overall anomaly detection for multivariate time series of each monitored entity.

Previous studies have shown that the stochasticity of voice sequences can be more accurately captured by stochastic variables with appropriately estimated probability distributions than deterministic variables. Univariate time series from online shopping websites can exhibit complex temporal relationships. Therefore, ideally our research should take a stochastic approach that includes temporal dependency modeling. However, despite the rich literature on multivariate time series anomaly detection, previous studies either take deterministic approaches to time series modeling or take stochastic approaches but ignore temporal dependencies of time series observations.

The core idea of this paper is to learn robust latent representations to capture normal patterns of multivariate time series by considering both temporal dependencies and stochasticity. The more an observation differs from normal patterns, the more likely it is to be anomalous.

---

### Related Work

#### 1. Deterministic Models

LSTM is applied to multivariate time series prediction for spacecraft anomaly detection, and prediction error is used to determine anomalies. Similar to seq2seq models, an LSTM-based encoder-decoder is proposed that aims to reconstruct "normal" time series behavior, and reconstruction error is used for multi-sensor anomaly detection. LSTM can handle temporal dependencies of time series but is deterministic without stochastic variables.

#### 2. Probabilistic Models

DAGMM is proposed, combining Deep Autoencoder (AE) and Gaussian Mixture Model (GMM) simultaneously. AE is used to reduce the dimensionality of input observations to obtain latent representations, and GMM is used to estimate the density of these representations.

However, this method is designed for multivariate variables, not multivariate time series, and ignores inherent temporal dependencies of time series. According to previous research, stochastic variables can generally improve RNN performance because they can capture probability distributions of time series.

VAE and LSTM are simply combined by replacing VAE's feed-forward network with LSTM, but this ignores dependencies of stochastic variables.

---

### Method

#### 1. Network Architecture

<img src="https://velog.velcdn.com/images/devjo/post/d059c5f6-699a-4fae-b113-e9d9b56ba727/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

The basic idea of OmniAnomaly is as follows.

We use GRU to capture complex temporal dependencies between multivariate observations in $x$-space. We apply VAE, a variational algorithm widely used for representation learning, to map observations (input observations) to stochastic variables ($z$-space). Inspired by voice reconstruction, we propose stochastic variable connection techniques to explicitly model temporal dependencies between stochastic variables in latent space. This consists of linear Gaussian state space model (SSM) connections and concatenation of stochastic variables and GRU hidden variables.

To help qnet's stochastic variables capture complex distributions of input data, we adopt planar normalizing flow (planar NF), which uses a series of invertible mappings to learn non-Gaussian posterior distributions in latent probability space.

#### 2. qnet

Details of qnet are shown in the figure. At time point $t$, input observation $x_t$ and GRU hidden variable $e_{t-1}$ from time point $t-1$ are sent to a GRU cell to generate hidden variable $e_t$. This deterministic $e_t$ is important for OmniAnomaly to capture long-term complex temporal information between $x_t$ and previous $x$-space observations.

Then, $e_t$ is concatenated with $z_{t-1}$ and enters a dense layer to generate mean $\mu_{z_t}$ and standard deviation $\sigma_{z_t}$ for stochastic variable $z_t$. As a result, $z$-space variables are now temporally dependent. qnet can be formulated as follows:

$$e_t = (1 - c^e_t) \circ \tanh(w^e x_t + u^e (r^e_t \circ e_{t-1}) + b^e) + c^e_t \circ e_{t-1} \\
\mu_{z_t} = w^{\mu z} h_{\phi}([z_{t-1}, e_t]) + b^{\mu z} \\
\sigma_{z_t} = \text{softplus}(w^{\sigma z} h_{\phi}([z_{t-1}, e_t]) + b^{\sigma z}) + \epsilon_{\sigma z}$$

$r^e_t = \text{sigmoid}(w^r_e x_t + u^r_e e_{t-1} + b^r_e)$ is the reset gate that determines how to combine new input with previous memory. $c^e_t = \text{sigmoid}(w^c_e x_t + u^c_e e_{t-1} + b^c_e)$ is the update gate that determines how much previous memory to retain. $[z_{t-1}, e_t]$ is the concatenation of $z_{t-1}$ and $e_t$. $h_{\phi}$ represents a dense layer with ReLU activation function. $\mu_{z_t}$ is derived from a linear layer, and $\sigma_{z_t}$ is generated by a softplus activation function with a small $\epsilon$ to prevent numerical overflow. $u^*$-s, $w^*$-s, $b^*$-s are parameters of the corresponding layers.

The output $z'_t$ of qnet is a diagonal Gaussian sampled from $\mathcal{N}(\mu_{z_t}, \sigma^2_{z_t} I)$. To learn non-Gaussian posterior distributions of $q_{\phi}(z_t | x_t)$, we approximate $z_t$ using planar NF. $z_t$ is obtained by passing $z'_t$ through a chain of $K$ transformations $f^k$ that are planar mappings.

#### 3. pnet

pnet uses a similar structure to qnet to attempt to reconstruct $x_t$ from $z_t$. We leverage linear Gaussian SSM to "connect" $z$-space variables of qnet and make them temporally dependent. $z_t = \mathcal{O}_{\theta}(T_{\theta} z_{t-1} + v_t) + \epsilon_t$, where $T_{\theta}$ and $\mathcal{O}_{\theta}$ are transition and observation matrices, respectively, and $v_t$ and $\epsilon_t$ are transition and observation noise.

At time point $t$, $z_t$ passes through a GRU cell together with variable $d_{t-1}$ from time point $t-1$ to generate deterministic variable $d_t$. Then $d_t$ is further processed through dense layers to generate mean $\mu_{x_t}$ and standard deviation $\sigma_{x_t}$ of variable $x'_t$ (reconstruction of $x_t$). Similar to qnet, pnet can be formulated as follows:

$$
d_t = (1 - c^d_t) \circ \tanh(w^d z_t + u^d (r^d_t \circ d_{t-1}) + b^d) + c^d_t \circ d_{t-1} \\
\mu_{x_t} = w^{\mu x} h_{\theta}(d_t) + b^{\mu x} \\
\sigma_{x_t} = \text{softplus}(w^{\sigma x} h_{\theta}(d_t) + b^{\sigma x}) + \epsilon_{\sigma x}
$$

where $r^d_t = \text{sigmoid}(w^r_d z_t + u^r_d d_{t-1} + b^r_d)$ and $c^d_t = \text{sigmoid}(w^c_d z_t + u^c_d d_{t-1} + b^c_d)$ are the reset gate and update gate, respectively. Reconstructed data $x'_t$ is sampled from $\mathcal{N}(\mu_{x_t}, \sigma^2_{x_t} I)$ and generated from $z_t$. If there is an anomaly at time point $t$, $x'_t$ may differ significantly from original data $x_t$. Therefore, anomalies can be detected based on reconstruction probability of $x_t$.

#### 4. Anomaly Interpretation

Therefore, we need to obtain reconstruction probabilities for individual $x^i_t$ (the $i$th dimension of $x_t$). However, in OmniAnomaly, reconstruction probabilities are computed for $M$-dimensional $x_t$.

Since $p_{\theta} (x_t | z_{t-T:t}) \sim \mathcal{N}(\mu_{x_t}, \sigma^2_{x_t} I)$, we have $p_{\theta} (x_t | z_{t-T:t}) = \prod_{i=1}^{M} p_{\theta} (x^i_t | z_{t-T:t})$. Therefore, the conditional probability of $x_t$ can be factorized as follows:

$$
\log(p_{\theta} (x_t | z_{t-T:t})) = \sum_{i=1}^{M} \log(p_{\theta} (x^i_t | z_{t-T:t}))
$$

$S_t = \sum_{i=1}^{M} S^i_t$, where $S^i_t = \log(p_{\theta} (x^i_t | z_{t-T:t}))$ is the anomaly score of $x^i_t$. Since $S^i_t$ benefits from rich information of multivariate time series $x_{t-T:t-1}$, its interpretability is higher than anomaly scores obtained using only $x^i_{t-T:t-1}$ (as in univariate time series).

For detected anomaly $x_t$, we interpret it by estimating the contribution (reconstruction probability) of each dimension of $x_t$. We sort $S^i_t$ ($1 \le i \le M$) in ascending order to form list $AS_t$. For $x^i_t$, the higher the rank in $AS_t$, the smaller $S^i_t$ is, and the greater the contribution of $x^i_t$ to $x_t$.

---

### Conclusion

Entity-level anomaly detection can greatly help operations engineers discover abnormal behaviors of devices in a timely manner and troubleshoot problems.

In this paper, we propose OmniAnomaly, a novel stochastic recurrent neural network for multivariate time series anomaly detection that works robustly well across various devices. We believe that key techniques such as stochastic variable connection are also applicable to other time series modeling tasks.

Furthermore, OmniAnomaly provides an intuitive and effective method to interpret detected entity anomalies based on reconstruction probabilities.

Through extensive experiments, OmniAnomaly outperforms state-of-the-art approaches on three large-scale datasets. The excellent performance demonstrated by OmniAnomaly on each dataset proves that this model is robust and can be applied to various devices such as server machines and spacecraft.

---

### References

[Original source #1](https://netman.aiops.org/wp-content/uploads/2019/08/OmniAnomaly_camera-ready.pdf)

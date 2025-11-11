---
title: 'PCDC: prototype-assisted dual-contrastive learning with depthwise separable convolutional neural network for few-shot fault diagnosis of permanent magnet synchronous motors under new operating conditions'
date: '2025-09-16'
tags: ['fault diagnosis', 'paper review']
---

### Abstract

Fault diagnosis of permanent magnet synchronous motors (PMSMs) is crucial in industry to ensure user safety and minimize economic losses from accidents. However, recent fault diagnosis approaches—especially those using deep learning—often require large-scale labeled datasets, which can be difficult to obtain in industrial settings.

Recently, few-shot learning (FSL) has been applied to fault diagnosis of rotating machinery to alleviate data scarcity and enable diagnosis of previously unseen faults. Nonetheless, two major obstacles remain: (1) limited generalization of models to new operating conditions, and (2) insufficiently discriminative features to precisely diagnose fault types.

To address these limitations, this study proposes Prototype-assisted dual-Contrastive learning with a Depthwise separable Convolutional neural network (PCDC) for few-shot fault diagnosis of PMSMs under new operating conditions.

---

### Introduction

PMSMs have been widely used in machine drive systems such as electric vehicles and industrial robots due to their precise control and high efficiency (Gangsar & Tiwari, 2020; Jang et al., 2023). As PMSMs are employed across diverse applications, reliable fault diagnosis is critical to ensure safety and minimize economic losses.

#### Limitations of conventional deep learning methods

Although deep learning–based models have driven a series of advances in fault diagnosis, they still face limitations.

Conventional deep learning models typically require large volumes of labeled data to ensure strong generalization and convergence (Ma et al., 2023). In industrial contexts, however, motors often operate in normal conditions (Han et al., 2023; Jian & Ao, 2023), and labeling large datasets for every fault type is costly and labor-intensive, making sufficient labeled data difficult to obtain (Hu et al., 2020).

Further, many approaches assume that the source and target domains share the same set of fault types, making it difficult to diagnose previously unseen motor faults (Feng, Chen, Xie, et al., 2022; Han & Li, 2022). When new motors are installed on production sites, unseen faults may occur due to the lack of prior fault history.

#### Transfer learning (TL)–based approaches

Parameter-based TL fine-tunes a pretrained model using a small target-domain dataset to obtain an improved target learner. Feature-representation TL aims to minimize distributional discrepancies between domains in feature space.

However, TL also has drawbacks.

TL-based models require features extracted from a pretrained model. In some real-world scenarios, obtaining such a model is infeasible, which hinders adoption (Ruan et al., 2021). Additional training is needed to extract domain-invariant features across source and target domains, yet this is often impractical in industrial environments (K. Zhang et al., 2020). Negative transfer caused by target-domain interference during additional training can also degrade fault diagnosis performance (Ribani & Marengoni, 2019).

#### Few-shot learning (FSL)–based approaches

FSL approaches leverage meta-learning to learn from small datasets without requiring a pretrained model or additional training. They have thus been applied to settings where labeled data are scarce in both source and target domains (Wu et al., 2020). They can also diagnose faults not observed in the source domain.

For example, to address unseen-fault diagnosis under few-shot settings, S. Zhang et al. (2021) introduced an FSL approach based on Model-Agnostic Meta-Learning (MAML) and demonstrated improved generalization for unseen bearing fault diagnosis.

Despite these advances, existing few-shot fault diagnosis methods are often insufficiently discriminative under target-domain conditions, especially when fault characteristics are similar. Moreover, they are mainly evaluated under minor variations in speed or torque, and thus perform poorly under substantially different operating conditions—highlighting the need for methods that generalize to large operating shifts.

---

### Related Works

<img src="https://velog.velcdn.com/images/devjo/post/960437a3-5bc3-4aad-ac34-485bc56fcc69/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### 1. Supervised few-shot learning (FSL)

The goal of supervised FSL is to generalize to unseen tasks using knowledge acquired from training datasets with few labeled samples (Y. Wang et al., 2020). Unlike traditional supervised learning that requires large data volumes for each fault class, supervised FSL needs only to learn whether pairs of samples belong to the same class, enabling learning from limited data.

#### 2. Metric-based meta-learning algorithms

FSL is a subset of meta-learning, which is broadly divided into metric-based and optimization-based approaches. Metric-based meta-learning algorithms are widely used in FSL classification tasks due to their representational power and ease of optimization (Y. Wang et al., 2020).

These models aim to learn effective measures of similarity between support and query sets; predictions are then made based on the learned similarity (distance) features. Representative models include Prototypical Networks (Snell et al.), Siamese Networks (Zhou et al.), and Relation Networks (Sung et al.). They typically consist of a feature extractor and a distance embedding function, differing primarily in how similarity is computed.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/b83b681a-5288-4b86-9234-be9a36760188/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### Proposed Framework

PCDC comprises an Operation-robust Fault feature extraction Module (OFM) and a Few-shot Diagnosis Module (FDM). OFM is designed to improve PCDC’s generalization to new operating conditions. FDM is designed to make PCDC more discriminative on small datasets and enhance fault diagnosis performance.

#### Operating-condition-robust fault feature extraction module

Motor faults typically induce amplitude modulation (AM) and frequency/phase modulation in stator current signals (Chen & Feng, 2020). Under steady-state conditions, when a motor fault (e.g., dynamic eccentricity, DE) occurs, the amplitude-modulated stator current signal $x_{\text{AM}}(t)$ or the phase-modulated stator current signal $x_{\text{PM}}(t)$ can be expressed with a characteristic fault frequency $f_c$ (Blodt, Chabert, et al., 2006; Blodt, Granjon, et al., 2008).

$$
\begin{aligned}
&x_{\text{AM}}(t) = I [1 + \alpha \cos(2\pi f_r t)] \cos(2\pi f_s t) \\
&x_{\text{PM}}(t) = x_{\text{st}}(t) + x_{\text{rt}}(t) \\
&= I_{\text{st}} \sin(2\pi f_s t) + I_{\text{rt}} \sin(2\pi f_s t + \beta \cos(2\pi f_c t))
\end{aligned}
$$

Here, $I$ is the amplitude of the fundamental stator current component. $x_{\text{st}}(t)$ and $x_{\text{rt}}(t)$ are the stator current components from the stator and rotor magnetic fields with amplitudes $I_{\text{st}}$ and $I_{\text{rt}}$, respectively. The modulation indices $\alpha$ and $\beta$ are proportional to fault severity. $f_s$ and $f_r$ denote stator supply frequency and rotational frequency, respectively. To extract fault-induced modulation terms, the Hilbert transform $\mathcal{H}$ is used to convert the single-phase stator current signal $x(t)$ into an analytic signal $z(t)$. Its discrete form is:

$$
z[t] = x[t] + j\mathcal{H}\{x[t]\} = a[t]e^{j\phi[t]}
$$

To help the model converge faster for a given learning rate and generalize to new load torque and rotational speed conditions, min–max normalization is used as the scaling method for paired inputs $a[t]$ and $b[t]$.

#### Depthwise separable convolution for feature extraction

The feature extractor is developed to learn unique fault-induced modulation features from the IA and IF of stator current signals and map these two unique features into a metric space. It consists of two blocks, IB and PB, with different parameters $\phi$ and $\theta$. Both IB and PB include a depthwise separable feature extractor $h(\mathbf{x})$ and a distance embedding function $m(\mathbf{x})$. Depthwise separable convolutions perform spatial and channelwise convolutions independently, reducing model parameters while producing feature maps of the same shape as standard convolutions (Chollet, 2017; Guo et al., 2019). Hence, using fewer parameters is advantageous under limited data, making depthwise separable feature extractors suitable for FSL algorithms.

#### Few-shot diagnosis module

We propose prototype-assisted dual contrastive learning, implemented by integrating two distinct contrastive learning approaches.

IB performs instance-wise contrastive learning to learn local similarity features. PB performs prototype–instance contrastive learning to learn both local and global similarity features.

First, the instance embeddings learned in IB are transferred to PB. By using the transferred instance embeddings that contain instance-wise contrastive features, PB can learn local similarity features without additional trainable parameters, which helps mitigate overfitting in FSL. While optimizing the distance loss between prototype embeddings and transferred instance embeddings in PB’s learning space, PB learns prototype–instance contrastive features that fuse local and global similarity, thereby enhancing instance discriminability while reducing overfitting.

$$
\mathcal{L}_{\text{IB}}^{(+)}(\mathbf{x}_{is}, \mathbf{x}_{iq}^{+}) = \left( \left\| F_{\phi}(\mathbf{x}_{is}) - F_{\phi}(\mathbf{x}_{iq}^{+}) \right\|_2 \right)^2 \\
\mathcal{L}_{\text{IB}}^{(-)}(\mathbf{x}_{is}, \mathbf{x}_{iq}^{-}) = \left( \max \left\{ 0, m - \left\| F_{\phi}(\mathbf{x}_{is}) - F_{\phi}(\mathbf{x}_{iq}^{-}) \right\|_2 \right\} \right)^2
$$

For positive sample pairs, the Euclidean distance between sample embeddings is minimized to increase their similarity. Conversely, for negative pairs, the Euclidean distance is maximized with a margin $m$ to reduce similarity and ensure at least $m$-separation.

---

### Conclusion

We proposed PCDC (Prototype-assisted dual-Contrastive learning with a Depthwise separable Convolutional neural network) for few-shot motor fault diagnosis using stator current signals. The proposed method enables precise classification of unseen fault categories under new operating conditions, thanks to discriminative similarity features and strong generalization across operating regimes.

Despite the overall success of PCDC, several limitations remain—specifically diagnosis under (i) transient operating conditions and (ii) noisy environments.

PCDC adapts well to a variety of steady-state operating conditions but struggles when load and/or speed change continuously in transient regimes. Under steady-state conditions, the preprocessing in PCDC scales torque and speed levels to remove operating-condition effects on current signals. Under transient conditions, however, the preprocessing cannot reflect time-varying accelerations and thus cannot remove operating-condition effects; performance may degrade. Future work will integrate domain-invariant feature learning into the FSL model to mitigate the impact of transient conditions. Domain-invariant features will be defined as those shared across datasets collected under transient conditions—key to diagnosing unseen faults even during transients.

In addition, PCDC is relatively vulnerable to noise compared to deep learning models trained on large datasets. We plan to integrate a denoising autoencoder into the FSL model to improve noise robustness. The denoising autoencoder will be trained with synthetic noisy signals as inputs and original signals as outputs, aiming to help the FSL model generalize in noisy environments.

---

### References

[Original Source #1](https://academic.oup.com/jcde/article/11/3/337/7687160)

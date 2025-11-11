---
title: 'A Feature Inherited Hierarchical Convolutional Neural Network(FI‑HCNN) for Motor Fault Severity Estimation Using Stator Current Signals'
date: '2025-09-18'
tags: ['fault diagnosis', 'paper review']
---

### Abstract

Motors are among the most widely used machines in manufacturing and play a pivotal role in precision processing. It is therefore important to accurately estimate the motor health state that affects product quality.

This paper proposes a novel deep learning method, a Feature Inherited Hierarchical Convolutional Neural Network (FI‑HCNN), to improve the accuracy of motor fault severity estimation.

FI‑HCNN consists of a fault diagnosis part and a severity estimation part, arranged hierarchically. The key novelty lies in a special inheritance structure between the hierarchy levels: the severity estimation part uses latent features to leverage fault‑related representations learned by the fault diagnosis task.

Since level‑wise abstraction is supported by the latent features, FI‑HCNN can improve the accuracy of fault severity estimation. In addition, FI‑HCNN is practically applicable because it is developed using stator current signals that are typically acquired for control purposes.

---

### Introduction

Thanks to low cost and high reliability, motors are widely used in manufacturing applications that require rotational power. Despite their reliability, motors experience mechanical and electrical faults due to unexpected stresses such as wear during use and environmental conditions. As motor performance degradation can lead to reduced product quality, it is crucial to diagnose motor condition and assess fault severity (SE).

To address this, Motor Current Signature Analysis (MCSA) has been studied for fault diagnosis (FD) and severity estimation because it is easy to implement. Most MCSA techniques for FD and SE are developed based on domain knowledge and can be categorized into physics‑based and data‑driven approaches.

Among these, research on data‑driven MCSA aims to extract fault‑sensitive features and apply appropriate learning methods. Various AI methods such as genetic algorithms, support vector machines, and artificial neural networks have been applied to hand‑crafted features. While these methods do not require motor‑specific expertise, they typically rely on complex signal processing to produce meaningful handcrafted features.

#### Deep learning approaches and the proposed model

Convolutional Neural Networks (CNNs), one of the most effective DL models, have shown strong performance on vibration signals for rotating systems such as bearings and gearboxes. For motors, several prior studies have focused on designing efficient input data for CNN training primarily from vibration signals; comparatively fewer studies target stator current signals. For example, Ince et al. used a one‑dimensional (1‑D) CNN to detect motor bearing cage faults, and SincNet has been adopted to classify multiple faults including broken rotor bars and bearing faults.

We propose a DL‑based SE method for mechanical motor faults using stator current signals, termed Feature Inherited Hierarchical CNN (FI‑HCNN). The model follows a hierarchical CNN (HCNN) pipeline that performs SE after FD, and introduces a new connectivity architecture to enhance performance. Each module of FI‑HCNN learns level‑specific characteristics of a given fault mode from latent features, which are representations formed in the FD module.

---

### Methods

#### Feature Inheritance Architecture

<img src="https://velog.velcdn.com/images/devjo/post/fea27f1b-1657-4179-b62b-d570a39236a7/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

When applying a hierarchical network to machine health monitoring, the parent module can be matched to FD and the child modules to SE for each fault mode. When these modules are placed, they reflect two different objectives: classifying a specific fault mode and estimating its severity.

Unlike a typical hierarchical architecture, the proposed FI‑HCNN passes latent features ($\hat{\mathbf{t}}$) from FD to the SE module. We call this concept feature inheritance.

Input data evolve in the FD module into learned representations rich in characteristics for a specific fault mode ($\mathcal{C}_k$). We denote these representations by $\hat{\mathbf{t}}$. $\hat{\mathbf{t}}$ is used as input to the SE module of $\mathcal{C}_k$ and is trained to regress the severity ($\mathcal{S}_{\mathcal{C}_k}$).

#### A Hierarchical Structure

<img src="https://velog.velcdn.com/images/devjo/post/2eb18ed0-e677-4595-a78c-f06b6412af33/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

The proposed FI‑HCNN method consists of three parts.

(1) Preprocessing: Before training the hierarchical network, four stages—resampling, augmentation, normalization, and scaling—are applied to the raw current signals. Resampling adjusts all data via interpolation so that they contain the same amount of information under the same operating condition; each data unit then has the same number of points per revolution. Data augmentation is performed by overlapping the data amount for one revolution. This augmentation, which preserves the periodic characteristics of current signals, not only positively affects performance but also helps filters in the model learn relevant features.

(2) Fault diagnosis: It consists of three convolutional layers, max‑pooling layers, and one fully connected (FC) layer.

$$
\mathcal{L}_{\text{FD}}(\mathbf{x}; \mathbf{W}_{\text{FD}}) = \text{Loss}_{\text{CE}}(p(\mathcal{C}|\mathbf{x}), \mathbf{y}) + \beta_1 \left\| \mathbf{W}_{\text{FD}} \right\|_2^2
$$

Here, $\beta_1$ is the coefficient of $\text{L}_2$ regularization, and the loss is computed via cross‑entropy because the FD module addresses a discrete classification problem. While pooling reduces the dimensionality of features, the number of features increases as the depth grows due to more filters. ELU activation is used in all convolutional layers so that information below zero is preserved, defined as:

$$
 f_{\text{ELU}}(x) = \begin{cases} x & \text{if } x > 0 \\ \alpha (e^x - 1) & \text{if } x \le 0 \end{cases}
$$

(3) Severity estimation: It consists of two convolutional layers followed by max‑pooling layers and one FC layer. The two convolutional layers in the SE module have more filters than in the preceding FD module to extract more refined features related to fault severity. These refined features are flattened and processed by the FC layer, and then regressed to determine the fault severity.

$$
\mathcal{L}_{\text{SE}}(\hat{\mathbf{t}}; \mathbf{W}_{\text{SE}}) = \text{Loss}_{\text{MSE}}(f_2(\hat{\mathbf{t}}, \mathbf{W}_{\text{SE}}), \mathcal{S}) + \beta_2 \left\| \mathbf{W}_{\text{SE}} \right\|_2^2
$$

$f_2$ is the estimated severity computed from the latent features $\hat{\mathbf{t}}$ and the SE module’s parameters $\mathbf{W}_{\text{SE}}$. Since fault severity is a continuous variable, the loss is computed using mean squared error.

---

### Conclusion

We proposed FI‑HCNN, a new method to identify induction motor faults and compute fault severity. The model is organized hierarchically with a module that learns fault types followed by a module that estimates their severity. In the proposed method, latent features containing representations of fault modes are propagated from the FD module to the SE module to support severity learning; as a result, fault severity is estimated more accurately than with conventional methods.

Experimental studies demonstrate that FI‑HCNN provides improved features that are better suited for accurate estimation of fault severity even without extensive domain knowledge.

---

### References

[Original Source #1](https://link.springer.com/content/pdf/10.1007/s40684-020-00279-3.pdf)

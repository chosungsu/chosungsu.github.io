---
title: 'Highly-Accurate Machine Fault Diagnosis Using
Deep Transfer Learning'
date: '2025-09-26'
tags: ['fault diagnosis', 'paper review']
---

### Abstract

We develop a new deep learning framework that achieves highly accurate machine fault diagnosis by enabling and accelerating the training of deep neural networks through transfer learning. Compared with existing methods, the proposed approach offers faster training speed and higher accuracy.

First, the original sensor data are transformed into images by performing a wavelet transform to obtain time–frequency distributions. Next, a pretrained network is used to extract low-level features. After that, labeled time–frequency images are used to fine-tune the high-level layers of the neural network architecture.

This paper forms a machine fault diagnosis pipeline and conducts experiments on three primary machine datasets—including induction motors, gearboxes, and bearings—to validate effectiveness and generalization. The datasets contain 6,000, 9,000, and 5,000 time-series samples, respectively.

---

### Introduction

Machine fault diagnosis involves monitoring machine equipment, identifying when faults occur, and classifying them. To identify and categorize faults, multiple sensors are installed to collect data such as vibration or infrared images. These data are processed to determine whether a fault has occurred and to classify the specific fault.

Traditionally, machine fault diagnosis consists of three main steps: acquiring sensor signals, extracting features through analyses in both time and frequency domains, and performing fault prediction using machine learning models.

Deep learning (DL) methods provide effective solutions thanks to their powerful feature-learning capability. Deep architectures possess multiple hidden layers, enabling them to learn hierarchical representations directly from raw data. For example, Sun et al. designed an autoencoder-based neural network for induction motor diagnosis and achieved accurate fault predictions. Ding et al. developed a spindle-bearing fault diagnosis system using wavelet packet energy as input to a deep convolutional neural network, obtaining reasonable performance in diagnosing various machine faults. Enhanced gated recurrent networks have been used to estimate the remaining useful life of machinery and to diagnose faults in both gearboxes and rolling-element bearings.

Although deep learning models have been successfully applied to machine fault diagnosis tasks, they still face challenges. First, most deep models implemented in prior studies contained fewer than five hidden layers. Deep models with more than ten hidden layers have not been thoroughly investigated, and their performance in machine fault diagnosis has not been evaluated. However, as the number and size of hidden layers increase, the number of free parameters also grows. Training very large networks from scratch generally requires huge amounts of labeled data as well as significant computational and time resources. In addition to parameter optimization, hyperparameter tuning (architecture, learning rate, dropout ratio, and so on) strongly influences performance and is also time-consuming.

---

### Methods

#### Time-Frequency Imaging

Time–frequency imaging is used to convert original sensor data into images. It is a technique that transforms signal frequency time-series data into the time–frequency domain.

Time–frequency imaging can be obtained through various methods such as Short-Time Fourier Transform (STFT), Continuous Wavelet Transform (CWT), and Wigner–Ville distribution. Among them, CWT is an effective technique for representing signals at multiple resolutions. Wavelet transforms are widely used for feature extraction in fault diagnosis and can be regarded as mathematical tools that convert time series into other feature spaces. Using continuous wavelet transforms, we obtain time–frequency distributions and simultaneously derive representations of the original signal in both time and frequency domains.

$$
\psi_{s,\tau} (t) = \frac{1}{\sqrt{s}} \psi \left( \frac{t - \tau}{s} \right)
$$

Here, $s$ is a scale parameter inversely proportional to frequency, and $\tau$ is a translational shift parameter. The continuous wavelet transform of a signal $x(t)$ is obtained via convolution with the complex conjugate and is mathematically defined as

$$
W(s, \tau) = \left\langle x(t), \psi_{s,\tau} \right\rangle = \frac{1}{\sqrt{s}} \int x(t) \psi^{*} \left( \frac{t - \tau}{s} \right) dt
$$

#### Convolutional Neural Network

<img src="https://velog.velcdn.com/images/devjo/post/43ee203b-81f7-4db1-816f-1c3319bd4381/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Convolutional Neural Networks (CNNs) are widely used when handling image tasks. Deep CNNs can automatically learn hierarchical features from input images, where high-level features are more abstract than low-level ones. Such abstract features aid accurate classification and are learned automatically.

In general, a CNN consists of three types of layers: convolution layers, pooling layers, and fully connected layers. Convolution and pooling layers are combined to form convolution blocks, and stacking multiple blocks builds deep architectures. Typically, fully connected layers are used as the final layers to perform classification or regression.

Each kernel convolves across the width and height of the input, computing inner products between the kernel and the input. Before nonlinear transformation, the $k$-th feature map has feature values $Z_k$:

$$
Z_k = W_k \otimes x + b_k
$$

Here, $W_k$ denotes the $k$-th convolution kernel, $b_k$ represents the bias term, $x$ is the input image of this convolutional layer, and $\otimes$ denotes the 2D convolution operation performing inner products between kernels and inputs. By adding an activation function $a(\cdot)$, nonlinearity is introduced into the convolutional layer, expressed as

$$
A_k = a(Z_k)
$$

Pooling is applied as

$$
y_{i,j,k} = \text{pool}_{(m,n) \in R_{ij}} (x_{m,n,k})
$$

$y_{i,j,k}$ represents the new value at position $(i, j)$ in the $k$-th feature map after pooling. $R_{ij}$ denotes the pooling receptive field around position $(i, j)$, and $x_{m,n,k}$ denotes the node at position $(m, n)$ within the receptive field.

#### Transfer Learning and Fine-Tuning Strategy

Transfer learning is an established area of machine learning research. In brief, given a source domain $D_s$ and a target domain $D_t$, transfer learning attempts to apply knowledge learned previously from $D_s$ to $D_t$. Here, transfer learning can assist training the target model by initializing it with parameters transferred from a pretrained model.

Training deep architectures from scratch is indeed difficult. Large deep neural networks contain numerous weights that are randomly initialized before training and iteratively updated based on labeled data and loss functions. Iteratively updating all weights is extremely time-consuming, and with limited training data, deep architectures are likely to overfit. Beyond parameter optimization, hyperparameter tuning (e.g., architecture, learning rate, dropout ratio) has a large impact on performance and is also time-intensive.

---

### Applications

<img src="https://velog.velcdn.com/images/devjo/post/b34a4035-1b96-45eb-80c3-20ae362908c1/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

To detect operating conditions of machine systems with high accuracy, the proposed framework leverages deep CNNs with time–frequency images as inputs. Transfer learning based on pretrained models helps improve the performance of deep models. We propose a machine fault diagnosis pipeline that can automatically learn fault signals from original vibration signals and recognize machine operating states.

Vibration signals are collected by sensors installed on operating machine equipment. The acquired sensor signals are converted from the time domain to the time–frequency domain using continuous wavelet transforms, forming a set of time–frequency images that serve as inputs to the subsequent pretrained model.

Since the transformed distributions are gray-scale images with a single channel, a channel augmentation scheme is performed by replicating the gray-scale image into three channels and adding basis values to each channel, resulting in 2D images with three channels. The processed images are then divided into training and testing datasets.

After removing the top layer of the pretrained CNN and adding an output layer whose size is determined by the number of possible machine operating conditions, the weights of the newly added output layer are randomly initialized. The last two convolution blocks and the fully connected layers are set to be trainable. During training, the early layers remain frozen, while the weights of the trainable layers are updated to minimize the error between predicted labels and ground-truth labels.

---

### Conclusion

In conclusion, we developed a deep transfer learning framework for machine fault diagnosis and classification, and we built a repository containing multiple benchmark datasets. Comparative analysis shows that the proposed approach achieves state-of-the-art results. In the future, deep learning is expected to continue playing a valuable role in fault detection and classification not only for various machine systems but also for other areas in control engineering.

---

### References

[Original Source #1](https://ieeexplore.ieee.org/document/8432110)

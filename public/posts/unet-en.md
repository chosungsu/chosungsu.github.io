---
title: 'U-Net: Convolutional Networks for Biomedical Image Segmentation'
date: '2023-07-24'
tags: ['image segmentation', 'paper review']
---

### Abstract

It is widely known that successful training of deep learning networks requires thousands of annotated training samples. This paper proposes to use data augmentation more effectively to make better use of the limited number of annotated data.

The network consists of a contracting path that captures context information and an expanding path that enables precise localization.

---

### Introduction

Deep Convolution Networks have shown results that surpass the best performance in various visual recognition tasks, but their achievements have been limited due to constraints in dataset size and network size. For example, Krizhevsky trained a network with 8 layers and millions of parameters using supervised learning on the ImageNet dataset.

Convolutional networks are typically used for classification tasks, where the output layer provides a single class label for the image. However, in many tasks that require assigning class labels to each pixel, precise localization information is required, and there are limitations in securing thousands of training images. Therefore, Ciresan proposed a sliding window approach where the network is trained to predict class labels using local regions (patches) around pixels as input. The advantages and disadvantages of this proposal were as follows:

- Advantages
    - The network can predict location information
    - The number of training samples becomes much larger than the actual number of samples
- Disadvantages
    - Very slow as the network must be run for each patch
    - Trade-off between precision and pooling operations based on size

This paper aims to increase the resolution of the output by adding an expanding path using upsampling operations instead of pooling operations, following the conventional contracting path using a Fully Convolutional Network. One of the main modifications is maintaining a large number of channels in the upsampling path to transmit context at high resolution. This network only uses valid regions where context information is fully secured from the input image. Using an overlap-tile strategy, it can segment arbitrarily large images well and interpolate by mirroring insufficient context information for edge prediction.

---

### Architecture

<img src="https://velog.velcdn.com/images/ski06043/post/b511143f-72d1-411e-b279-bddcdeb6259f/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

This architecture consists of two components:

1.contracting path (left)

2.expansive path (right)

The contracting path follows the convolutional network, using two 3×3 convolutions, ReLU as the activation function, and performs downsampling through 2×2 max pooling and 2 strides.

The expansive path upsamples the feature map, then applies a 2×2 convolution to reduce the number of channels by half, merges with the corresponding feature map from the contracting path, and applies two 3×3 convolutions again. Here, cropping for the number of channels is necessary because boundary pixels are lost in each convolution.

In the final layer, a 1x1 convolution maps the 64-dimensional feature vector to the desired number of classes, thus the entire network consists of a total of 23 convolutional layers.

---

### Training

The input images and segmentation maps were trained using Caffe's stochastic gradient descent implementation. Without padding in the convolution, the output image becomes consistently smaller than the input image.

To minimize overhead, large input files are preferred over large batch sizes, and accordingly, the batch size was set to 1. However, momentum was set to 0.99 to allow previously seen samples to have a significant impact.

The energy function was calculated by applying pixel-wise softmax operations on the final feature map and combining it with cross entropy. The softmax and cross entropy are defined as follows:

$$
p_k(x) = \frac{exp(a_k(x))}{\sum_{k'=1}^{K}exp(a_k'(x))}
$$

In the softmax definition, $a_k(x)$ represents the activation for class $k$ at position $x$, K is the number of classes, and $p_k(x)$ is the probability of being class $k$ as a result of softmax. That is, it becomes 1 when the activation is the largest, and 0 otherwise.

$$
E = \sum_{x \in \Omega} w(x) * log(p_{l(x)}(x))
$$

Here, $l : \Omega \rightarrow {1, ..., K}$ is the actual class label for each pixel, and $w : \Omega \rightarrow R$ is a weight map introduced to give greater weight to some pixels. This weight map is pre-computed for the following purposes:

1.To compensate for differences in pixel frequency of specific classes

2.To encourage learning of borders that separate adjacent cells

The above border is calculated through morphological operations and is defined as follows:

$$
w(x) = w_c(x) + w_0*exp(-\frac{(d_1(x)+d_2(x))^2}{2\sigma^2})
$$

Here, $w_c(x)$ is the weight that corrects class frequency, $d_1(x)$, $d_2(x)$ are set as the distances to the cell boundaries in order of proximity, and in the experiment, $w_0$=10 and $\sigma$=5 pixels were set.

In deep networks, weight initialization is important due to the existence of multiple layers and paths. The ideal initial weights should be adjusted so that all feature maps have approximately variance 1. Weight initialization samples from a gaussian distribution with mean 0 and standard deviation $\sqrt{2N}$, where N is the number of nodes input to one neuron, for example, N=3x3x64=576 in a 3x3 convolution with 64 channels.

---

### Experiments

Regarding the performance evaluation for the segmentation task of neural structures, the training data consists of 30 fruit fly images of size 512x512, each containing cells and cell membranes. The evaluation method calculated three errors: warping error, rand error, and pixel error by binarizing the feature map with 10 different thresholds. Among these elements, U-Net achieved the best benchmark performance in warping error.

---

### Reference

[Original Path #1](https://arxiv.org/pdf/1505.04597)

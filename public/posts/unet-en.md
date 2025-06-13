---
title: 'U-Net: Convolutional Networks for Biomedical Image Segmentation'
date: '2023-07-24'
tags: ['image segmentation', 'paper review']
---

### Abstract

There is a broad consensus that successful training of deep learning networks requires thousands of annotated training samples.  
This paper proposes a network and training strategy that aggressively uses __data augmentation__ to make better use of annotated samples.

---

### Introduction

<img src="https://velog.velcdn.com/images/ski06043/post/b511143f-72d1-411e-b279-bddcdeb6259f/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Convolutional neural networks have existed for a long time, but their success was limited by the size of the training dataset and network capacity.  
CNNs are typically used for classification tasks that output a single class label per image. However, in image processing, the desired output often includes location information.

To address this, researchers trained networks using a __sliding window__ approach, feeding local patches to predict pixel-wise labels.  
This led to a significant victory in the ISBI 2012 EM segmentation challenge.

However, they identified two drawbacks in those studies:  
1. The network is extremely slow as it must process each patch individually.  
2. There is a tradeoff between location and context.

Therefore, this paper proposes a solution using a __Fully Convolutional Network (FCN)__ architecture.

---

### Architecture

This architecture has two main components:  
1. The __contracting path__ (left side) that reduces image size.  
2. The __expansive path__ (right side) that upsamples the image.

- The __contracting path__ repeatedly applies two 3×3 convolutions (unpadded), followed by ReLU, and a 2×2 max pooling operation for downsampling.  
- The __expansive path__ upsamples the feature map, applies a 2×2 convolution that halves the number of channels, concatenates it with the corresponding feature map from the contracting path, and applies two 3×3 convolutions again.

Finally, a 1×1 convolution is applied to generate the final output.

---

### Data Augmentation

Data augmentation is essential for training when few samples are available.  
It helps the network learn desired invariances and robustness, such as invariance to translation and rotation, and robustness to deformations and gray value variations.

In this paper, smooth deformations are generated using __random displacement vectors__ sampled from a Gaussian distribution with a standard deviation of 10 pixels.  
Each pixel's displacement is calculated using __bicubic interpolation__, and additional augmentation is done through dropout layers.

---

### Reference

[Original Path #1](https://arxiv.org/pdf/1505.04597)

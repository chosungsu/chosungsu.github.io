---
title: 'Memory-Augmented 3D Point Cloud Semantic Segmentation
Network for Intelligent Mining Shovels'
date: '2025-09-06'
tags: ['image segmentation', 'paper review']
---

### Abstract

Semantic segmentation of 3D working environments is crucial for autonomous excavation and loading operations of intelligent mining shovels. However, the complexity of working environments—diverse scene objects and imbalanced sample counts—poses challenges. This leads to low accuracy in 3D semantic segmentation and reduced autonomous operation accuracy of intelligent mining shovels.

To address these issues, this paper proposes a 3D point cloud semantic segmentation network based on memory enhancement and lightweight attention mechanisms. The model addresses problems such as imbalanced counts of sampled scene objects, insufficient extraction of key features, and inadequate model lightweighting.

First, we investigate a memory enhancement learning mechanism to build a memory module for key semantic features of objects. This addresses the forgetting problem of non-dominant object point cloud features caused by imbalanced sample counts and improves semantic segmentation accuracy. Next, a channel attention mechanism is studied. An attention module based on statistical properties of channels is built, which improves the adequacy of key feature representations by adjusting feature weights, further enhancing semantic segmentation accuracy. Finally, a lightweighting mechanism is studied by adopting depthwise separable convolution instead of standard convolution to reduce the number of model parameters.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/3f24d260-b1c3-4773-a2da-9f8bf6cd5d6b/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Mining shovels are fundamental machinery used to extract mineral resources in open-pit mines. This equipment integrates two main functions: excavation and loading. The overall performance of mining shovels significantly impacts the efficiency and economics of entire mining operations, which is of paramount importance for national resource extraction and energy security.

Traditional mining shovels rely on manual operation, leading to many problems during operation. These include low total bucket rate, high energy consumption, high failure rate, insufficient operational safety, and operator fatigue-related injuries. Consequently, research on intelligent mining shovels has become an important topic in industrial development.

Intelligent mining shovels can operate autonomously, utilizing advanced technologies such as artificial intelligence, robotics, and automatic control to integrate functions related to working environment sensing, shovel position sensing, shovel chassis path planning, and shovel excavation motion trajectory planning.

#### Importance and Challenges of 3D Semantic Segmentation

Semantic segmentation of 3D working scenes means dividing a scene into multiple target regions with identical or similar attributes. Each region is assigned semantic information according to the attributes and target characteristics of that region. This enables segmentation and recognition of various types of objects within working scenes.

Semantic segmentation of 3D working scenes forms the foundation of working environment perception and is a critical aspect for autonomous operation of intelligent mining shovels. With low semantic segmentation accuracy in 3D working scenes, intelligent mining shovels cannot accurately segment and identify main operational targets such as material piles and mining carts. This causes high deviation in autonomous excavation and loading operations and reduces autonomous operation accuracy. At the same time, accurately segmenting and identifying objects such as people and vehicles within the working environment can be difficult, potentially leading to safety accidents.

Due to the wide range of objects to be detected and the diversity of their shape structures and physical properties, key features of objects are obscured by redundant features during deep learning training, reducing semantic segmentation accuracy. At the same time, point cloud sample counts for different objects obtained from actual sampling show significant imbalance due to characteristic influences of working conditions. Objects such as stockpiles, mining trucks, buckets, and ground typically have larger numbers of point cloud samples, while objects such as vehicles and people tend to have fewer samples. For non-dominant objects with limited sample counts, key features of these objects are easily overlooked during deep learning training, consequently reducing semantic segmentation accuracy.

---

### Related Works

Currently, research dedicated to semantic segmentation of intelligent mining shovels in 3D working scenarios is relatively limited. However, specific research results have been achieved in intelligent robotics, unmanned vehicles, and other related fields, which have specific reference significance for this paper. This paper provides an overview of the current state of research related to semantic segmentation of 3D working scenes, categorizing research into two main groups: traditional machine learning methods and deep learning methods.

#### 1. Traditional Machine Learning Methods

3D point cloud semantic segmentation algorithms based on traditional machine learning extract specific sample features and utilize classifiers to complete segmentation and recognition of 3D working scenes. The use of models such as Markov Random Fields, Random Forests, and Support Vector Machines has improved the speed and accuracy of recognition processes.

Niemeyer et al. performed segmentation and recognition of buildings using features such as reflection intensity and curvature through a combination of Random Forest classifiers and Conditional Random Fields, while Golovinskin et al. extracted features including object locations and shortest distances to roadsides using graph cut methods and separated objects using Support Vector Machines.

#### 2. Deep Learning Methods

Compared to machine learning segmentation methods, deep learning–based 3D point cloud semantic segmentation methods have lower dependence on hand-designed features, improved adaptive feature extraction capabilities, and demonstrate higher levels of semantic segmentation accuracy.

Qi et al. proposed the PointNet algorithm to address the disorder and geometric rotation invariance problems of point clouds.

Jiang et al. proposed PointSIFT, a 3D point cloud semantic segmentation network model based on scale-invariant feature transformations. This model encodes multiple key directional information through directional coding units and stacks multiple coding units to obtain multi-scale features.

Wang et al. applied graph convolutional neural networks to 3D point cloud processing based on PointNet and proposed the dynamic graph convolution point cloud processing algorithm DGCNN. This algorithm effectively addresses the problem of insufficient local spatial feature recognition capabilities.

---

### Methods

This paper presents a semantic segmentation network model for 3D working scenes of intelligent mining shovels built using PointConv as the base framework. The main reason for using PointConv is that it can efficiently perform convolution operations on non-uniformly sampled 3D point cloud data and has both translation invariance and point sequential permutation invariance. This section describes the overall network structure, memory module, channel attention module, and network lightweighting mechanism.

#### Overall Network Structure

<img src="https://velog.velcdn.com/images/devjo/post/fb46e2b4-c3ac-4cc6-af91-b6bbb43cf9b8/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

To address problems in semantic segmentation of smart mining shovels such as sample imbalance, insufficient key feature extraction, and model deployment issues, this paper presents MALMConv, a semantic segmentation network model based on memory modules and lightweight attention mechanisms.

MALMConv uses PointConv as the base framework and adds a memory module between the encoder and decoder. Additionally, the corresponding memory module is integrated into the skip-connected branch network. As a result, enhancement of key semantic features of all target point clouds extracted by the encoder is achieved before entering the decoder.

#### Memory Module

<img src="https://velog.velcdn.com/images/devjo/post/776d59c6-0a57-49c0-9afa-44aa7e57d978/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

The memory module consists of two main components: a memory pool and an addresser. The memory pool serves to record all key semantic features of objects to be segmented, and the addresser is used to access the most relevant key semantic features stored in the memory pool. The memory pool consists of multiple memory slots, each designed to record stored features of objects to be segmented. Upon receiving input features, the addresser calculates similarity between input features and each stored feature in the memory pool. This value is ultimately used as a weighted average of all stored features in the memory pool to obtain memory features corresponding to the input features.

The memory pool is designed as a matrix $M \in \mathbb{R}^{N \times D}$, where $N$ is the number of memory slots and $D$ is the dimension of memory features. Generally, $N$ is the number of semantic categories, and $D$ is the dimension size of input point cloud features. The addresser primarily obtains an addressing vector, and based on this addressing vector, retrieves the most relevant key semantic features $\hat{f}$ from the memory pool for input features $f$ to achieve memory enhancement of input features.

#### Channel-Wise Attention Module

<img src="https://velog.velcdn.com/images/devjo/post/c46ecadf-7169-4e9a-8203-a29830b6ae55/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

The framework of the feature channel attention module consists of three main components: feature compression, excitation, and weight adjustment.

For each feature channel, input point features $P = \{P^k \mid 1 \le k \le c\}$ are compressed into a real number through feature compression, which is used as a channel descriptor.

The channel descriptor $\text{R}$ obtains weight coefficient $W_1$ through the first fully connected layer operation and is activated using the ReLU function to obtain $W_e^1$. Adopting ReLU as the activation function helps alleviate the vanishing gradient problem and improves convergence speed. Then, weight coefficient $W_2$ is obtained through the second fully connected layer operation, and after activation using the sigmoid function, weight coefficient $\text{S}$ is obtained. Sigmoid is used as the activation function, primarily to obtain normalized weight coefficients with values between 0 and 1. $\text{S}$ is used to measure the importance of each feature channel for semantic segmentation tasks.

Input features are weighted using weight coefficient $\text{S}$. After weighting, feature $\text{T}$ is obtained, which represents weight correction.

---

### Conclusion

In this paper, we studied a semantic segmentation method for 3D working scenes of intelligent mining shovels based on memory enhancement and lightweight attention mechanisms. The main contributions are summarized as follows.

Targeting the problem of low semantic segmentation accuracy for few-sample objects, we proposed a memory enhancement learning mechanism that fundamentally mitigates the problem of forgetting point cloud features of non-dominant objects during training. Targeting the problem of low semantic segmentation accuracy due to interference of key features by redundant features, we built an attention module based on channel statistical feature analysis. This adaptively adjusts feature weights during training to improve the adequacy of key feature representations.

Semantic segmentation accuracy improved by an average of $7.15\%$, contributing to autonomous operation and enhanced safety of intelligent mining shovels.

---

### References

[Original Source #1](https://www.mdpi.com/1424-8220/24/13/4364)

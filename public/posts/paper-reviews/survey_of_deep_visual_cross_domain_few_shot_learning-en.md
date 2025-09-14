---
title: 'A Survey of Deep Visual Cross-Domain Few-Shot Learning'
date: '2023-07-14'
tags: ['object detection', 'paper review']
---

### Abstract

Few-Shot Transfer Learning is emerging as a major research area because it enables recognition of new classes with limited labeled data. While it assumes that training data and test data have the same data distribution, in real applications this is often not the case. This causes model transfer effects to decrease when the distribution of new classes differs significantly from the learned classes.

To solve these problems, research on Cross-Domain Few-Shot (CDFS) has emerged, which forms a more challenging and realistic environment. This paper provides a detailed taxonomy of CDFS from the perspectives of problem setting and corresponding solutions.

---

### Introduction

Powerful computing performance has accelerated the development of deep learning, leading to significant progress in the computer vision field. Research areas such as image classification, object detection, and semantic segmentation continue to drive the advancement of computer vision in innovative ways. Current deep models require large amounts of annotated data for training, but such data is generally expensive and labor-intensive. In certain fields, only data with few labeled examples exists for models to recognize new categories, leading to the emergence of Few-Shot Learning.

Few-Shot Learning assumes that training and test data come from the same domain, but domain shift is commonly observed in real-world scenarios. In this context, Cross-Domain Few-Shot (CDFS) Learning presents a promising solution to Few-Shot Learning problems by simultaneously addressing domain shift and data scarcity.

This paper reviews and classifies current research on CDFS based on problem setting, solutions, and application areas.

1. Regarding problem setting, we identify two main models for CDFS research with multiple data sources. There are single-model and multiple-model approaches, where the former considers accessibility to target domain data, and the latter involves training a model for each source and later aggregating them.

2. Regarding solutions, we cover four main approaches: Image Augmentation, Feature Augmentation, Decoupling, and Fine-tuning.

---

### Preliminaries

#### 1. Few-Shot Learning (FSL)

FSL (Few-Shot Learning) is a transfer learning technique designed to learn new classes from limited annotated labels. For FSL to be successfully applied, two assumptions must be met.

Classes between the training and finetune processes must be mutually distinct. There should be no class intersection between the two processes. In the finetune process, annotated labels for each class must be limited. There may even be only one annotated label.

Specifically, when there is a dataset $D_b$ containing classes $C_b$ with sufficient labels and a dataset $D_n$ containing classes $C_n$ with only limited labels, the FSL model aims to learn from dataset $D_b$ and apply few labels to finetune new classes during the testing process.

#### 2. Few-Shot Domain Adaptation (FSDA)

A powerful combination of Few-Shot and Domain Adaptation, making Few-Shot learning more difficult. Unlike FSL, which assumes shared distribution between two datasets, it identifies that there is a domain gap between the two datasets.

#### 3. Cross-Domain Few-Shot (CDFS)

A newly emerging field in recent Few-Shot learning, which creates more challenging tasks than traditional FSDA approaches by assuming significant domain gaps between source and target domains.

Recent CDFS (Cross-Domain Few-Shot) research can be classified into three categories: Multiple Source, Single Source, and Benchmark.

<img src="https://velog.velcdn.com/images/devjo/post/5560a055-8f3b-4ec5-9dee-993d6d7c121b/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Multiple source CDFS views collecting multiple source domain data as an intuitive approach since different domains can provide essential data distributions for model learning. First, it collects multiple source domain datasets with disjoint classes. Then, using specific training strategies, it captures domain information and combines the results into a final transfer model.

When using multiple models, each domain has its own specific model. In the training stage, each domain optimizes its domain-specific model. Then in the aggregation stage, all models are combined into a single model, focusing on feature reuse. This serves as the final transfer model. When using a single model, an integrated model is applied to learn multi-domain features. The single model method can train all source domain data. The single model method has less computational cost and omits the aggregation stage of multiple models. To mitigate the problem of domain-specific information confusion, CDNet decomposes domain information from given features and extracts domain-independent representations.

Single source CDFS requires limited annotations, so using multiple domains for model training is not always feasible. To find a more realistic and manageable solution, single source CDFS methods have been proposed, which train models using only one source domain. This single source CDFS includes two settings: Target Domain Accessible and Target Domain Forbidden.

In the Target Domain Accessible setting, the model can access the target domain during training time, allowing it to adapt to the target domain. In the latter Target Domain Forbidden setting, the target domain cannot be accessed, so the proposed model must be able to generalize across domains.

---

### Different approaches of CDFS

CDFS is divided into feature enhancement, image enhancement, decompose, and finetuning categories.

#### 1. Feature enhancement based

$$
f_{norm}^{b}= \frac{f^b-\mu^b}{v^b}, \\
f_{reco}^{b} = \lambda f_{norm}^{b}+ \beta, \\
\lambda_{mix}=\alpha \mu_0 + (1-\alpha) \mu_0, \\
\beta_{mix}=\alpha v_0 + (1-\alpha) v_0
$$

After training on base classes, the Few-Shot model must learn new classes in new domains with limited annotations. In such cases, feature quality directly affects transfer effects. Feature Transformation Enhancement mainly changes feature distributions to make features easily transferable. The above equations use a normalization strategy to add noise or prior distributions to original features. $f^b, \mu^b, v^b$ represent backbone features, channel mean, and channel variance respectively. The mixing strategy can function as an improved version, and the network reconstructs features using mixed tensors.

Knowledge distillation enhancement trains teacher and student networks. The learning objective of the student network is to make features more robust than the teacher network. For example, URL trains one teacher network for each domain data, then uses a student network to distill domain knowledge from each teacher network.

#### 2. Image enhancement based

<img src="https://velog.velcdn.com/images/devjo/post/951ece60-f343-4820-875f-d6855e9ce411/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Self-Supervised Image-Enhancement generates new instances through semantic consistency of images. This process is practical for improving data quality since it is label-free. Applying flipping, translation, and linear scaling to images during training does not change image content. Deep models should obtain similar predictions.

Mix-Paste Image-Enhancement is the simplest method, cutting few target data and pasting them onto source data. This helps the model learn target domain knowledge.

#### 3. Decompose based

Decomposition-based methods believe that different features should be decomposed. Since mixed feature spaces interfere with model effectiveness, they focus on obtaining feature representations. Domain-agnostic features mainly collect domain-agnostic discriminative information, which means features have excellent transfer capabilities across domains. Complementarily, domain-specific features can provide relevant domain information.

Meta-FDMixup designs a disentangle module that generates means and variances of agnostic and specific features, and samples domain features using those means and variances. This disentangle module is said to be inspired by VAE (Variational Autoencoder).

Unlike sample-based methods, Path-based methods use multiple forward paths to learn different feature representations. Wave-SAN's structure includes standard and style-augmented forward paths.

Parameter methods use learnable tensors to filter features. CDNet proposes a serial framework. Each stage uses an LD (Learn-to-Decompose) module to filter domain features and complete feature decomposition.

---

### Conclusion

This paper provided a comprehensive overview of recent CDFS research. This research is gradually becoming a popular research topic and shows that it has received widespread attention due to its potential to mitigate domain shift problems in AI applications.

---

### 참고 자료

[원본 경로 #1](https://arxiv.org/pdf/2303.09253)



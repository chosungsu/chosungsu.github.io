---
title: 'Multispectral Pedestrian Detection with Sparsely Annotated Label'
date: '2025-02-20'
tags: ['computer vision', 'paper review']
---

### Abstract

Existing Sparsely Annotated Object Detection (SAOD) approaches have shown progress in handling sparse annotation environments in multispectral domains where only some pedestrians are annotated, but the following limitations still exist: insufficient consideration for improving the quality of pseudo-labels for missing annotations. Relying on fixed ground truth annotations, only a limited range of pedestrian visual appearances in the multispectral domain are learned.

To address these issues, we propose a new framework called Sparsely Annotated Multispectral Pedestrian Detection (SAMPD). We introduce the Multispectral Pedestrian-aware Adaptive Weight (MPAW) and Positive Pseudo-label Enhancement (PPE) modules. These modules ensure high-quality pseudo-label generation by leveraging multispectral knowledge and enable effective learning by increasing weights for high-quality pseudo-labels based on modality characteristics. We propose the Adaptive Pedestrian Retrieval Augmentation (APRA) module. This module adaptively integrates pedestrian patches from ground truth and dynamically integrates high-quality pseudo-labels with ground truth to facilitate a more diverse learning pool for pedestrians.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/400dab46-587e-4142-ab46-ece56b74a469/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Recently in the computer vision field, multispectral pedestrian detection has been gaining attention. Unlike single-modal detectors that use only single modalities (visible light or thermal imaging), multispectral pedestrian detection combines visible light images and thermal images. Visible light images capture texture and color, while thermal images provide thermal signals. Combining these two modalities can enhance detection robustness under various conditions including low-light environments (Jia. 2021; Dasgupta. 2022) and adverse weather (Hwang. 2015).

However, multispectral pedestrian detection faces the problem of sparse annotations. This frequently occurs due to human errors in the annotation process for small or occluded pedestrians, even when pedestrians actually exist. These inconsistencies prevent the network from effectively learning knowledge from both modalities, leading to severe degradation in pedestrian detection performance.

To address missing annotations, we aim to generate pseudo-labels. Current methods include selecting boxes with high confidence from model predictions (Niitani. 2019; Wang. 2023a), adjusting loss functions to integrate both original and augmented images (Wang. 2021), or applying self-supervised loss to avoid negative gradient propagation (Suri. 2023). However, these methods also rely on fixed ground-truth annotation sets, making it difficult to integrate valuable missing annotations, thus limiting the ability to learn diverse pedestrian visual appearances.

In this paper, we present a new method called Sparsely Annotated Multispectral Pedestrian Detection (SAMPD) to address the sparse annotation problem in the multispectral domain. Our approach considers two main challenges:

-How to effectively learn multispectral pedestrian information from pseudo-labels and improve their quality

-How to integrate identified missing annotations during training to enable more comprehensive learning

To address Challenge 1, we adopt the teacher-student structure commonly used in existing SAOD research and introduce two new modules: Multispectral Pedestrian-aware Adaptive Weight (MPAW) and Positive Pseudo-label Enhancement (PPE). The MPAW module aims to help the student model learn multispectral modalities by assigning higher weights to high-quality pseudo-labels based on modality characteristics (single and multispectral). The PPE module aligns feature representations to make high-quality pseudo-labels more similar to each other while distancing them from low-quality pseudo-labels. We also consider preventing uncertain pseudo-labels from misleading the model.

To address Challenge 2, we propose the Adaptive Pedestrian Retrieval Augmentation (APRA) module. In sparse annotation environments, it is important to find missing annotations by leveraging diverse visual representations of pedestrians. The APRA module adaptively adds ground truth pedestrian patches that best match the input image according to lighting conditions.

---

### Related work

<img src="https://velog.velcdn.com/images/devjo/post/18c37d56-0816-4488-b727-2f49f39e2a76/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

#### 1. Multispectral Pedestrian Detection

Multispectral pedestrian detection has been gaining attention for its impressive performance. AR-CNN addresses modality alignment issues (Zhang. 2019), IATDNN+IASS introduces illumination-aware mechanisms for robustness (Guan. 2019). MBNet and AANet solve modal discrepancy (Zhou, Chen, and Cao 2020; Chen. 2023), and MLPD proposes multi-label and non-paired augmentation (Kim. 2021). While these studies show promising detection performance, they all assume perfect bounding box annotations.

#### 2. Sparsely annotated Object Detection

When pedestrian annotations are incomplete, inconsistencies may occur where pedestrians are incorrectly classified as foreground or background. The pseudo-label method (Niitani. 2019) establishes logical connections between object co-occurrence and pseudo-label application. BRL (Zhang. 2020) introduces automatic adjustment for regions that may be incorrectly labeled. SparseDet (Suri. 2023) introduces self-supervised loss to prevent negative gradient propagation. However, existing methods assume that pseudo-labels are reliable without considering their quality.

---

### Method

#### 1. Multispectral Pedestrian-aware Adaptive Weight (MPAW)

We adopt the teacher-student structure commonly used in SAOD methods. Our final detector, the student model, learns from pseudo-labels generated by the teacher model. Multispectral data consists of visible light (V), thermal (T), and fusion (F) modalities. To generate effective pseudo-labels in sparse annotation scenarios, both teacher and student models are configured with 3-way encoding paths to fully utilize single-modal (V and T) and multispectral (F) knowledge during training. Some pseudo-labels from the teacher model may be inaccurate, such as capturing only parts of pedestrians or including background elements. These errors can negatively impact the student model's performance and cause confusion during training. To address this, we propose the MPAW module that increases the influence of reliable pseudo-labels and reduces the impact of unreliable pseudo-labels for each modality. This approach emphasizes high-quality pseudo-labels and reliable modalities.

$$
k=\{V,T,F\}, \\
f_{PL}^{k(s)}=\{f_{PL_i}^{k(s)}\}^N_{i=1}, \\
f_{GT}^{k(s)}=\{f_{GT_i}^{k(s)}\}^M_{i=1}
$$

The above formula explains that for each modality, we extract $N$ feature maps from the student model's pseudo-label boxes and $M$ feature maps from ground truth labels.

$$
l^{k(s)}_{PL}=\{l^{k(s)}_{PL_i}\}^N_{i=1}, \\
l^{k(s)}_{GT}=\{l^{k(s)}_{GT_i}\}^M_{i=1}
$$

Then we apply global average pooling (GAP) to obtain latent vectors. The weight $w^k$ for modality $k$ is defined as follows:

$$
w^k=\frac{1}{N} \sum^N_{i=1} max_{j \in \{1, ..., M\}} d(l^{k(s)}_{PL_i}, l^{k(s)}_{GT_j}), \\
d(\alpha, \beta)=\frac{\alpha \cdot \beta}{|\alpha| |\beta|}
$$

$d(\cdot, \cdot)$ represents cosine similarity. Therefore, we calculate the maximum cosine similarity between the closest vectors in $l_{PL}^{k(s)}$ and $l_{GT}^{k(s)}$. A high $w^k$ value reflects reliable quality, indicating that pseudo-labels for modality k closely match ground truth labels.

#### 2. Positive Pseudo-label Enhancement (PPE)

$$
a = \text{argmax}_{j \in \{1, ..., M\}} d(l^{k(s)}_{PL_i}, l^{k(s)}_{GT_j})
$$

If the similarity between the $i$-th pseudo-label and the most similar ground truth label exceeds $\tau_1$, it is classified as a positive pseudo-label. Conversely, if it is below $\tau_2$, it is classified as a negative pseudo-label.

$$
p_{PL}(p_i)=\sum^{N_p}_{j=1} exp(d(l^{k(s)}_{PL, p_i}, l^{k(s)}_{PL, p_j})/\tau), \\
n_{PL}(p_i)=\sum^{N_n}_{j=1} exp(d(l^{k(s)}_{PL, p_i}, l^{k(s)}_{PL, n_j})/\tau), \\
L_{PG}^k=-\frac{1}{N_p}\sum^{N_p}_{i=1} log \frac{p_{PL}(p_i)}{p_{PL}(p_i)+n_{PL}(p_i)}
$$

After classification, we devised the positive pseudo-label guidance loss $L^k_{PG}$. Here, $p, n$ represent positive and negative respectively, $N$ is the number of labels, and $\tau$ is the temperature parameter.

---

### Experiments

<img src="https://velog.velcdn.com/images/devjo/post/8001cad1-adaa-4cf7-b949-f8cb5c4e6cff/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

The APRA module has a dynamic property that uses high-quality pseudo-labels as new ground truth. The number of annotations gradually increases as epochs progress. The dynamic mechanism of the APRA module learns diverse visual appearances of potentially missing pedestrians, showing improved performance compared to static approaches (i.e., without dynamic refinement), such as improvements from 8.88 to 8.56 on the KAIST dataset and from 8.58 to 7.65 on the LLVIP dataset. It also demonstrates successful filling of many previously missing annotations, significantly reducing annotation sparsity.

---

### Conclusion

In this paper, we present a new framework for multispectral pedestrian detection in sparse annotation scenarios. This paper includes three core modules:

The MPAW module that increases the transfer weight of reliable pseudo-label knowledge, the PPE module that guides the teacher model to generate better pseudo-labels, and the APRA module that adaptively refines ground truth annotations using pedestrian patches.

While various results in SAMPD demonstrate the effectiveness of the APRA module, it currently only provides image-level guidance and samples pedestrians based on overall image brightness rather than individual pedestrian characteristics. Therefore, exploring methods to effectively guide at both image and feature levels by considering individual pedestrian characteristics beyond the overall image could be a promising direction for future research.

---

### References

[Original Source #1](https://arxiv.org/abs/2501.02640)

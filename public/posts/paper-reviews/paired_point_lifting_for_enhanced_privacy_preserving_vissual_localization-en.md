---
title: 'Paired-Point Lifting for Enhanced Privacy-Preserving Visual Localization'
date: '2025-05-03'
tags: ['3d perception', 'paper review']
---

### Abstract

Visual localization refers to recovering the camera pose of a known scene from an input image, forming the cornerstone of numerous vision and robotics systems.

Many algorithms perform localization by leveraging sparse 3D point clouds of scenes, but recent studies have raised privacy concerns by successfully revealing high-fidelity scene appearance from these sparse 3D representations.

One prominent approach to mitigate such attacks lifted 3D points into randomly oriented 3D lines to conceal scene geometry. However, recent work has shown that such random line clouds possess a fatal statistical flaw that can be exploited to break the protection.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/2e1521e4-2762-4e65-9976-a319563497a7/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

#### Use of 3D Point Clouds and Privacy Concerns

Many practical visual localization algorithms are structure-based methods that leverage global sparse 3D models of scenes obtained from SfM or SLAM.

2D-3D correspondences between image points and global 3D structures are formed by matching feature descriptors (SIFT, ORB, etc.) and are used to perform robust camera pose estimation based on geometric constraints.

#### Limitations of Existing Privacy-Preserving Approaches

One of the most notable approaches to address privacy attacks on point clouds is geometric lifting, where each 3D point is transformed into a randomly oriented 3D line passing through the point. By sampling line directions uniformly on the unit sphere, this approach aims to hide scene geometry and prevent meaningful 2D projections of sparse point clouds.

#### Proposed Paired-Point Lifting (PPL)

We argue that the privacy properties of 3D line clouds can be improved by adopting a different line construction method. Specifically, we propose generating 3D lines by connecting random pairs of 3D points.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/97955939-379a-4e6e-a5bd-941902fd6046/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

To overcome the drawbacks of the original line cloud, we propose a different strategy for sampling lines. PPL randomly assigns non-overlapping pairs of 3D points from a sparse point cloud and then connects each pair to form a line cloud.

Each line passes through two 3D points, resulting in $N$ 3D lines, where $2N$ denotes the number of 3D points.

#### Effect on Feature Descriptors

Suppose two 3D points $\text{A}$ and $\text{B}$ are hidden within a single PPL-based line. Since each line is independent, the number of lines with the correct assignment follows a binomial random variable $\mathbf{X} \sim \text{B}(N, 0.5)$, where $N$ is the total number of lines.

#### Effect of Non-Uniform Line Directions

We redefine the original set of 3D points as $\mathbf{P} = \{\mathbf{x}_j\}$, where $\mathbf{x}_j \in \mathbb{R}^3$ is the $j$-th point in the point cloud. The lifted lines form a set $\mathcal{L} = \{l_j\}$, where each $l_j \in \mathbb{R}^6$ consists of a line direction and an offset.

Line directions are determined given point locations $\mathbf{P}$ and their pairing arrangement $\mathcal{S} := \{(i, j)\}$.

$$
P(\mathcal{L}|\mathbf{P}) = \sum_{\mathcal{S} \in \Omega} P(\mathcal{L}|\mathcal{S}, \mathbf{P}) P(\mathcal{S}|\mathbf{P}) = \frac{1}{|\Omega|} \sum_{\mathcal{S} \in \Omega} \delta(\mathcal{L} - \mathcal{L}_{\mathcal{S}})
$$

Here, $\Omega$ denotes the set of all possible pairing arrangements of 3D points, and $|\Omega|$ is the total number of such pairings. Therefore, $P(\mathcal{L}|\mathbf{P})$ is non-uniform.

---

### Conclusion

In this study, we were motivated by the major limitation of OLC, namely that point clouds and their scene details can be revealed by leveraging the statistics of 3D points and lines.

To mitigate this issue, we proposed PPL, a novel lightweight strategy that hides two points per line by connecting random pairs of sparse points to form line clouds.

Interesting directions for future research include designing more protective lifting approaches for real-time applications requiring privacy safeguards or developing faster relocalization algorithms for line clouds.

---

### 참고 자료

[원본 경로 #1](https://openaccess.thecvf.com/content/CVPR2023/papers/Lee_Paired-Point_Lifting_for_Enhanced_Privacy-Preserving_Visual_Localization_CVPR_2023_paper.pdf)

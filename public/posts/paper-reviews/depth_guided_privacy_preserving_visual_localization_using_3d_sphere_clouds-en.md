---
title: 'Depth-Guided Privacy-Preserving Visual Localization Using 3D Sphere Clouds'
date: '2025-05-03'
tags: ['3d perception', 'paper review']
---

### Abstract

The emergence of deep neural networks capable of revealing high-fidelity scene details from sparse 3D point clouds has raised significant privacy concerns in visual localization related to private maps.

Lifting map points to randomly oriented 3D lines is a well-known approach that hinders unwanted recovery of scene images, but these lines are vulnerable to density-based attacks that can recover point cloud geometry by observing line neighborhood statistics.

Aiming to neutralize this attack, we present a new privacy-preserving scene representation called a sphere cloud, constructed by lifting all points to 3D lines passing through the map centroid, similar to points on a unit sphere. Since lines are most dense at the map centroid, the cloud effectively neutralizes the attack by misleading density-based attack algorithms to incorrectly generate points at the centroid.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/5f04b39f-a3c8-4a22-8fb1-c53adb85b34b/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Visual localization refers to the task of estimating 6-DOF camera poses from input images and is a critical computation in autonomous driving, augmented reality, and robotics.

Point clouds and descriptors are stored on servers for cloud-based localization or deployed on clients for real-time localization.

#### Privacy Concerns and Vulnerability of Existing Defenses

Until recently, these point maps, which can often contain private or confidential areas/objects, were considered sparse enough to discourage attempts by curious intruders or malicious clients to reveal scene details from 3D points.

Nevertheless, the InvSfM work by Pittaluga et al. demonstrated the possibility of recovering high-fidelity scene images from sparse point clouds, raising significant privacy concerns when using bare point maps for localization.

One of the most widely known approaches to mitigate this problem is to hide point maps with line clouds by lifting each point to a 3D line, hiding point locations and disabling direct image synthesis using InvSfM.

Unfortunately, this line of work is potentially vulnerable to density-based attacks that can effectively revert 3D lines to points using line neighborhood statistics.

#### Sphere Cloud Proposal and Challenges

In this study, we present a new privacy-preserving scene representation called a sphere cloud as an effort to neutralize the aforementioned geometry recovery attack.

A cloud constructed by simply lifting points to 3D lines passing through the centroid of the point cloud has the advantage of completely disabling geometry recovery attacks by forcing neighbor line statistics to lead to degenerate point recovery.

Unfortunately, using clouds for privacy-preserving visual localization is not straightforward due to two issues. A new type of attack can partially reveal scene details about the map centroid. Camera poses can only be searched up to an unknown scale.

---

### Related works

#### Private Scene Detail Recovery

The first method to successfully reveal high-fidelity scene details from sparse point clouds was proposed by Pittaluga et al., where a network called InvSfM based on cascaded U-Net is used to reconstruct scene images from a series of inputs including 2D positions of projected 3D points as well as their corresponding depths, RGB values, and SIFT descriptors.

#### Privacy-Preserving 3D Scene Representations

Aiming to hinder the use of InvSfM for scene image reconstruction, Speciale et al. proposed line clouds where each point is represented as a randomly oriented 3D line passing through the original point, introducing ambiguity to point locations to hide scene geometry.

While this was initially recognized as an effective strategy to block attempts to reveal scene details and extended to SLAM, it was later revealed by Chelani et al. that line clouds with uniformly distributed line directions are vulnerable to density-based geometry inversion attacks that can accurately recover scene points, from which scene images can subsequently be revealed.

#### Localization Using 3D Line Clouds

The classical absolute camera pose estimation problem involving 3D point clouds can be solved with efficient perspective-n-point (PnP) solvers derived from 2D-3D point constraints.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/241cf63f-dcdf-4a60-9254-4f308b1545e2/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

#### Motivations

We construct histograms of point candidates for each 3D line and find peaks of these histograms to recover 3D points.

Now, if all lines are lifted to meet at a single point $\mathbf{c} \in \mathbb{R}^3$, point candidates for each line will always be located at the intersection since two lines are closest at $\mathbf{c}$. Consequently, peaks of histograms will always be at $\mathbf{c}$, leading to degenerate recovery and invalidating the attack.

#### Basic Construction Procedure and Limitations

<img src="https://velog.velcdn.com/images/devjo/post/318a904d-b0cb-44fd-b7fa-c588a046ffe8/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

First, we set the intersection point to the mean centroid of the 3D point cloud to ensure resulting line directions are approximately uniformly distributed for stable localization.

Second, we project all 3D points onto a sphere centered at the map centroid to generate a basic 3D cloud.

#### Enhanced Construction Strategy

To hinder direct image synthesis from cloud points, we add fake points to the cloud. This is inspired by the observation that including fake points between real keypoints degrades the quality of scene images reconstructed through InvSfM.

Since an excessive number of fake points can make the cloud dense and slow down localization, we avoid this by fixing the total number of cloud points. If the desired ratio of true positive cloud points is $\eta$ by cloud sparsification work, we discard $1-\eta$ of all points.

And we use a simple approach of adding Gaussian noise to coordinates of existing cloud points.

$$
\mathbf{z}_{ij} = \mathbf{\hat{x}}_i + \epsilon
$$

where $\mathbf{\hat{x}}_i \in \mathbb{S}^2$ is the $i$-th cloud point, and $\mathbf{z}_{ij}$ is the $j$-th fake point generated in proximity to $\mathbf{\hat{x}}_i$.

#### Camera Pose Estimation Using RGB Images and Depth Maps

Assuming queries have aligned RGB images and absolute depth maps with known intrinsic parameters, we describe a framework for absolute pose estimation using clouds.

$$
\mathbf{p}_i = z_{\text{TOF}, i} \mathbf{K}^{-1} [\mathbf{u}_i^\top, 1]^\top
$$

where $z_{\text{TOF}, i} \in \mathbb{R}$ is the depth of $\mathbf{u}_i$ obtained from a ToF sensor, and $\mathbf{K} \in \mathbb{R}^{3 \times 3}$ is the camera intrinsic parameters.

Ideally, 3D keypoint $\mathbf{p}_i$ should follow the positive direction of a vector emanating from the cloud center and passing through cloud point $\mathbf{\hat{x}}_i$.

$$
\mathbf{p}_i = t + \alpha \mathbf{R} \mathbf{\hat{x}}_i
$$

After an initial pose is obtained, we refine the pose through nonlinear optimization. Since clouds can be considered a special type of line cloud, following directions of other line clouds, we partially minimize the squared epipolar distance between projections of 3D lines derived from the cloud and 2D query keypoints.

$$
\mathcal{L}^e_i = \frac {([\mathbf{u}_i^\top , 1] \mathbf{K}^{-\top } \mathbf{E} \tilde {\mathbf{x}}_i)^2} {(\mathbf{e}_{1}^\top \tilde {\mathbf{x}}_i)^2 + (\mathbf{e}_{2}^\top \tilde {\mathbf{x}}_i)^2}
$$

where $\mathbf{E} := [\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3]^\top$ represents the essential matrix between the cloud and query camera, and $\mathbf{\tilde{x}}_i = \mathbf{\hat{x}}i/|\mathbf{\hat{x}}{iz}|$ is the $z$-normalization of cloud point $\mathbf{\hat{x}}_i$.

Since the above equation does not consider translation scale, we additionally use a depth normalization term to guide camera pose to the correct scale.

$$
\mathcal{L}_i^d = (\beta_i - 1)^2
$$

The total cost function iteratively minimized in $R$ and $t$ is as follows:

$$
\mathcal{L} = \sum _{i\in \Omega } \left ( \mathcal{L}_i^e + \lambda \mathcal{L}_i^d \right )
$$

---

### Conclusion

In this study, we presented a new privacy-preserving scene representation called a sphere cloud that can neutralize known geometry recovery attacks on line clouds.

We noted major challenges in realizing this representation: the possibility of a new type of attack that directly reveals images from cloud points about the map centroid and the unresolved problem of translation scale.

We addressed these issues by introducing fake points with recycled real descriptors to hinder direct image reconstruction and presenting an efficient RGB-D privacy-preserving localization framework to guide translation scale.

However, it exhibits lower translation accuracy due to noisy depth measurements.

---

### References

[Original Source #1](https://bmva-archive.org.uk/bmvc/2024/papers/Paper_267/paper.pdf)

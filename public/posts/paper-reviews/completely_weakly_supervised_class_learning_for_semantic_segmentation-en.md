---
title: 'Completely Weakly Supervised Class-Incremental Learning for Semantic Segmentation'
date: '2025-04-30'
tags: ['computer vision', 'paper review']
---

### Abstract

This study addresses completely weakly supervised class-incremental learning for semantic segmentation, which learns segmentation for both base classes and additional new classes using only image-level labels. While important for handling diverse and newly emerging objects in the real world, existing CISS methods require expensive pixel-level annotations for training. To overcome these limitations, partially weakly-supervised approaches have been recently proposed.

To this end, we propose a method that combines pseudo-labels obtained from a localizer and a series of foundation models based on uncertainty to generate robust pseudo-labels. Furthermore, to mitigate catastrophic forgetting, we introduce an exemplar-guided data augmentation method that inductively generates diverse images containing both previous and new classes.

---

### Introduction

Class-Incremental Semantic Segmentation (CISS) has become an important research topic in the computer vision and robotics communities. CISS enables learning segmentation for objects of new classes in addition to previously learned categories using newly provided data. This capability is useful in various application domains such as object manipulation, robot navigation, and industrial automation. For example, in object manipulation, CISS allows robots to learn how to recognize and handle new object categories that are not in the initial training dataset. In robot navigation, CISS enables robots to incrementally learn about new types of obstacles and objects, allowing them to safely and effectively navigate dynamically changing environments.

However, these methods require dense pixel-level annotations in both base and incremental learning stages, which are costly and time-consuming. In particular, for these methods, newly captured data must be annotated at the pixel level before being used for incremental learning. Meanwhile, to reduce annotation costs, researchers have studied weakly supervised and semi-supervised learning methods for semantic segmentation.

<img src="https://velog.velcdn.com/images/devjo/post/fe50a753-3b40-45e1-98a4-bd7a639d0083/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

This is to avoid dependency on specific dense annotation datasets and to mitigate confusion caused by differences in class granularity and types between datasets. For example, when training a network on a dense annotation dataset containing broad classes such as 'furniture', training the network incrementally on new classes like 'dining chair', 'armchair', or 'bar stool' may cause inconsistencies. To address this limitation, we introduce a more challenging task: completely weakly supervised class-incremental semantic segmentation (CI-WSSS).

---

### Method

#### 1. Problem Formulation

At $t=1$, a semantic segmentation network $f^1$ is trained using a dataset $D^1$ containing images with image-level multi-labels where each image contains at least one base class $C^1$. Subsequently, at $t=2$, the previous dataset is no longer available, and a new dataset $D^2$ with image-level labels containing $C^2$ is provided. Therefore, using $f^1$ and $D^2$, we train a network $f^2$ that can segment objects of both $C^1$ and $C^2$ classes.

#### 2. WSSS Network

<img src="https://velog.velcdn.com/images/devjo/post/f8a6dd01-6f55-446a-9c8e-246980e6d09d/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

The initial task corresponds to WSSS using only image-level labels. A typical WSSS network consists of an encoder $f_e$, decoder $f_d$, and localizer $f_l$ as shown in the image above, where the localizer is only used during training to generate dense pseudo-labels.

For a given image $I$, the encoder extracts a shared feature map $F$ which is fed to both the decoder and localizer, generating a class score map $M_{cls} \in \mathbb{R}^{|C^1| \times H \times W}$ and a pseudo-label map $M_{loc} \in \mathbb{R}^{|C^1| \times H \times W}$, respectively.

We study the combined use of pseudo-labels $M_{fdt}$ generated from foundation models and pseudo-labels $M_{loc}$ from the localizer. Specifically, for a given image I and text prompts composed of image-level class labels, we apply an open-set detector to generate bounding boxes for objects corresponding to those labels. Then, the predicted bounding boxes are utilized as prompts in a prompt-based image segmentation model to generate dense masks $M_{fdt} \in \mathbb{R}^{|C^1| \times H \times W}$.

Based on the localizer's certainty for each pixel, the final soft pseudo-label $M_{soft-psd}$ is generated through pixel-wise weighted summation of $M_{fdt}$ and $M_{loc}$. The final pseudo-label $M_{soft-psd}$ and entropy $W^{psd}_{h,w}$ are calculated as follows:

$$
M^{\text {soft-psd}}_{\text {c,h,w}} = W^{\text {psd}}_{\text {h,w}} M^{\text {fdt}}_{\text {c,h,w}} + (1-W^{\text {psd}}_{\text {h,w}}) \sigma(M^{\text {loc}}_{\text {c,h,w}}), \\
W^{\text {psd}}_{\text {h,w}} = - \frac{\sum_{c \in C_t} M^{\text {loc}}_{\text {c,h,w}} log(\bar{M}^{\text {loc}}_{\text {c,h,w}})}{log(|C_t|)}
$$

The decoder output is compared with $M_{soft-psd}$ and its modified version to calculate two pixel-wise cross-entropy losses. Additionally, we use contrastive loss to gather or separate features $F$ from the encoder based on pseudo-labels. Finally, to generate accurate pseudo-labels, we calculate loss by comparing the localizer output with image-level labels.

---

### Experiments

We conduct experiments on three common WILSS settings: 15-5 VOC, 10-10 VOC, and COCO-to-VOC. For the two VOC settings, we use the PASCAL VOC dataset containing 10,582 images for training and 1,449 images for validation. In the 15-5 VOC setting, we initially train the network on 15 base classes, then incrementally train on the remaining 5 new classes. For the 10-10 VOC setting, we divide 20 classes into 10 base classes and 10 new classes.

Additionally, we consider two scenarios for each setting: disjoint and overlap. In the disjoint scenario, images in $D^t$ must contain at least one object belonging to class $C^t$ and may contain objects from class $C^t_{acc}$. Here, image-level labels are only provided for class $C^t$ and should not contain objects belonging to new classes. In the overlap scenario, images in $D^t$ must contain at least one object belonging to class $C^t$ with image-level labels and may contain additional unlabeled objects.

Our proposed method achieved higher accuracy on base classes in VOC settings, but showed slightly lower performance in the COCO-to-VOC setting. We believe this is because COCO dataset images are more complex than PASCAL VOC dataset images, leading to lower accuracy of pseudo-labels for COCO images. This ultimately results in lower accuracy on base classes compared to models trained with ground-truth dense labels.

---

### Conclusion

In this paper, we introduced a new challenging task: completely weakly supervised class-incremental semantic segmentation. This method aims to learn semantic segmentation for base classes using only image-level class labels, while maintaining the ability to segment previously learned classes and incrementally training on new classes.

Experimental results show that our completely weakly supervised method achieves superior performance or competitive accuracy compared to partially weakly supervised methods.

As a limitation, our proposed method assumes that foundation model pseudo-labels are more accurate when localizer pseudo-labels are unreliable. This assumption generally applies to images in our experiments but may not apply to images from specific domains.

---

### References

[Original Source #1](https://arxiv.org/pdf/2505.10781)

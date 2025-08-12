---
title: 'SFUOD: Source-Free Unknown Object Detection'
date: '2025-08-01'
tags: ['computer vision', 'paper review']
---

### Abstract

Source-free object detection is a technique that adapts a pre-trained detector from a source domain to an unlabeled target domain without requiring access to labeled source data. While this approach is practical since it doesn't require source datasets during domain adaptation, it makes a restrictive assumption that only pre-defined objects from the source domain exist in the target domain. This closed-set setting prevents the detector from detecting undefined objects.

To relax these assumptions, we propose a new scenario called Source-Free Unknown Object Detection (SFUOD). This scenario enables the detector to not only recognize known objects but also detect undefined objects as unknown objects.

To achieve this, we propose a new framework called CollaPAUL (Collaborative tuning and Principal Axis-based Unknown Labeling) for SFUOD.

---

### Introduction

Domain adaptive object detection aims to transfer knowledge from source to target domains and has been extensively researched due to its practical applications. In particular, source-free object detection (SFOD) focuses on adapting source-trained models to unlabeled target domains without requiring access to labeled source data. SFOD is a realistic scenario that addresses data privacy and storage constraints.

In this paper, we propose a new Source-Free Unknown Object Detection (SFUOD) scenario. The SFUOD scenario requires not only adapting the source-trained detector to the target domain for known objects but also detecting undefined objects as unknown objects.

<img src="https://velog.velcdn.com/images/devjo/post/e242eca7-9151-446f-938e-a1e24e45b59b/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

As shown in the image above, traditional source-free object detection adapts the detector to recognize only pre-defined objects from the source domain (e.g., "Car", "Bus"). In contrast, in the new scenario, the detector can also detect unknown objects (e.g., "Person", "Bicycle"). Since unknown objects frequently appear in the real world, the proposed SFUOD is a realistic and challenging scenario that simultaneously requires knowledge transfer for known objects and detection of unknown objects.

Among existing approaches, in the Mean Teacher (MT) framework, the teacher model generates pseudo-labels for the student model, and the teacher model is updated through exponential moving average (EMA), transferring source-dependent knowledge to the target domain, thereby mitigating domain shift. However, teacher models trained on the source domain lack knowledge about unknown objects, making them unable to successfully generate pseudo-labels for unknown objects.

To assign pseudo-labels to unknown objects, this paper uses confidence-based pseudo-labeling, a common approach in unsupervised domain adaptation.

CollaPAUL consists of two core components:

-Collaborative tuning integrates source-dependent knowledge from the student model with target-dependent knowledge from an auxiliary target encoder. To extract target-dependent knowledge, the target encoder applies truncated reconstruction through singular value decomposition (SVD) and uses cross-domain attention to fuse source and target features. This allows the student model to learn richer representations through collaborative tuning.

-Principal Axis-based Unknown Labeling (PAUL) enables more accurate pseudo-label assignment for unknown objects by estimating the principal axes of known objects to calculate objectness scores. It assumes that unknown proposals projected onto the principal axes of known objects show similarity, while non-object proposals do not. Based on this assumption, PAUL utilizes these principal axes to identify object proposals and assign pseudo-labels to unknown objects.

---

### Related work

Source-free object detection (SFOD) addresses domain adaptation problems with data privacy constraints, where models adapt to target domains without accessing source data. Recent SFOD methods rely on mean teacher frameworks for robustness and stability, but noisy pseudo-labels generated from teacher models can lead to inaccurate student learning and inappropriate teacher updates, potentially causing model collapse.

To address these issues, PET introduces a multi-teacher framework including static and dynamic teachers, stabilizing training by periodically exchanging teacher and student models. SF-UT prevents inappropriate teacher updates by utilizing fixed pseudo-labels from the initial teacher model using AdaBN.

While these methods focus on stabilizing teacher updates for source-free domain adaptation, this paper proposes collaborative tuning for more effective adaptation by integrating source and target-dependent representation knowledge to improve student model learning.

---

### Method

#### 1. Problem definition

In this section, we define the problem setting for the proposed SFUOD.

We denote the labeled source dataset as $D_s = \{(x^i_s, y^i_s)\}^{|D_s|}_{i=1}$ and the unlabeled target dataset as $D_t=\{(x^i_t)\}^{|D_t|}_{i=1}$.

Each source label $y_s^i = \{(b^j, c^j)\}_{j=1}^{J_i}$ contains $J_i$ annotations for known objects, where $b^j$ represents the bounding box and $c^j \in Y_s$ represents the category of the $j$-th annotation.

#### 2. Pipeline of the mean teacher-based approach

We use a mean teacher (MT) framework consisting of a teacher model and student model that share the same architecture and initialization. The student model is trained using pseudo-labels generated by the teacher model. The teacher model is updated from the student model through EMA (exponential moving average).

$$
L_{det}=L_{cls}(\hat{c_s}, \hat{c_t}) + \\ L_{L1}(\hat{b_s}, \hat{b_t}) + \\ L_{giou}(\hat{b_s}, \hat{b_t}), \\
\bar{\theta_t} \leftarrow \alpha \theta_t + (1-\alpha) \theta_s
$$

Here, $L_{cls}$ represents classification loss, while the rest represent regression losses. $\alpha$ serves as a hyperparameter for weight updates. We denote the predicted classes and bounding boxes from the student model $\theta_s$ and teacher model $\theta_t$ as $(\hat{c_s}, \hat{c_t})$ and $(\hat{b_s}, \hat{b_t})$, respectively.

#### 3. Collaborative tuning

The proposed SFUOD scenario requires the model to transfer learned source knowledge to the target domain while simultaneously learning new classes as unknown objects. Since unknown objects were not observed in the source domain, adapted source knowledge interferes with the model's learning of representation knowledge for unknown objects, causing knowledge confusion between known and unknown objects.

To address this, we propose collaborative tuning that aims to integrate source-dependent knowledge extracted by the student model with target-dependent knowledge extracted by an auxiliary target encoder. This is to preserve transferable source knowledge while capturing representation knowledge for the target domain.

Given a $c$-dimensional feature map $f$ with spatial size $h \times w$ from the backbone, we compute the activation magnitude $A \in \mathbb{R}^{h \times w}$ by averaging the map as in OW-DETR. Then we select the top $k$ activated features $f_a \in \mathbb{R}^{k \times C}$. At this point, we apply singular value decomposition (SVD) as $f_a=U\sum V^T$.

To integrate target-dependent knowledge with source-dependent knowledge, we feed target-dependent features $f_t$ to the decoder layers of the student model.

To transfer knowledge integrated by collaborative layers to the target decoder, we insert collaborative layers between decoder layers. Specifically, collaborative layers are inserted into the first $L$ decoder layers, excluding the initial layers where output features are used for source-dependent representations. This value is a hyperparameter that determines the number of layers to insert, and we set $L=3$ based on empirical analysis.

#### 4. Principal axis-based unknown labeling

We require identifying new objects not defined in the source domain as unknown objects. However, since source-trained models lack knowledge about unknown objects, teacher models in the mean teacher framework struggle to assign reliable pseudo-labels to unknown objects. Principal Axis-based Unknown Labeling (PAUL) estimates the objectness of proposal features and effectively selects proposal features to assign unknown pseudo-labels by utilizing unknown confidence scores obtained from predictions.

---

### Experiments

We utilized existing SFOD benchmarks: weather adaptation and cross-scene adaptation. 두 벤치마크 모두에서, 차량 클래스(예: “Car”, “Truck”, “Bus”)는 알려진 클래스로 사전 정의되었고, 다른 카테고리(예: “Person”, “Rider”, “Motorcycle”, “Train”, “Bicycle”)는 미지 객체로 취급되었습니다. 평균 교사 프레임워크 내에서 학생 학습과 교사 업데이트를 효과적으로 관리하는 DRU를 기본 모델로 사용했습니다. 탐지기로는 ImageNet에서 사전 훈련된 ResNet-50 백본을 가진 Deformable-DETR를 채택했습니다.

To validate the effectiveness of cross-domain attention, we compared performance with prefix-tuning, a widely used parameter-efficient tuning method. We achieved increases of 3.89% in known mAP, 2.52% in U-Recall, and 3.38% in H-Score.

Validating the effectiveness of unknown labeling (PAUL) resulted in increases of 6.59% in U-Recall and 8.83% in H-Score.

---

### Conclusion

In this paper, we propose a new scenario called Source-Free Unknown Object Detection (SFUOD). In this scenario, the model recognizes known objects while simultaneously detecting new objects as unknown objects. The proposed SFUOD is a challenging but realistic setting due to knowledge confusion and lack of knowledge about unknown objects.

Collaborative tuning mitigates knowledge confusion through effective knowledge transfer. Principal axis-based unknown labeling generates pseudo-labels for unknown objects by estimating objectness using the principal axes of known objects.

While there is room for improvement in the SFUOD field, CollaPAUL demonstrated performance surpassing existing SFOD methods. We expect it to provide new insights for domain adaptive object detection, including open-set recognition.

---

### References

[Original Source #1](https://arxiv.org/abs/2507.17373)

---
title: 'ClearGrasp: 3D Shape Estimation of Transparent Objects for Manipulation'
date: '2025-05-31'
tags: ['robotics', 'paper review']
---

### Abstract

Transparent objects are ubiquitous in everyday life, yet their unique visual properties make it very difficult for standard three dimensional sensors to produce accurate depth estimates. In most cases, transparent objects appear as noisy or distorted approximations of the background surfaces behind them. To address this challenge, this paper proposes ClearGrasp, a deep learning based approach that estimates accurate three dimensional geometry of transparent objects from a single RGB D image for robotic manipulation.

A deep convolutional neural network is used to infer surface normals, transparent surface masks, and occlusion boundaries. These outputs are then exploited to refine the initial depth estimates for all transparent surfaces in the scene.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/3ba33461-3160-4ee2-8a66-5c3da6403f15/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Transparent objects, ranging from eyeglasses to plastic bottles, are a common part of everyday life but possess distinctive visual properties that make them difficult for machines to perceive and manipulate. In particular, transparent materials, which exhibit both refractive and specular behavior, violate the geometric light path assumptions that underlie classical stereo vision algorithms. As a result, standard three dimensional sensors struggle to provide accurate depth estimates for transparent objects, which instead often appear as noisy or distorted approximations of the surfaces behind them. Although there has been substantial work on using three dimensional data such as RGB D images or point clouds for robotic object manipulation, many of these algorithms do not translate directly to transparent objects. Nevertheless, transparent objects remain highly important in applications such as dishwashing or sorting and cleaning plastic containers.

This work presents ClearGrasp, an algorithm that leverages deep learning trained on synthetic data to infer accurate three dimensional geometry of transparent objects for robotic manipulation.

Commercial RGB D cameras often provide good depth estimates for typical opaque surfaces. Rather than attempting to estimate all geometry from scratch, the authors therefore choose to correct the initial depth estimates from the RGB D camera. The refraction and reflection patterns observed on transparent objects provide stronger visual cues about object curvature, such as surface normals, than about absolute depth. Although it is difficult to obtain real world ground truth three dimensional training data for transparent objects, the authors show that using high quality rendered synthetic images with domain randomization as training data is sufficient to achieve reasonable performance on real data. They further find that mixing in out of domain real data during training improves generalization both to real images and to new transparent objects not seen during training.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/0cf22f36-6472-41ad-9a12-2a141a76d794/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

The method uses a deep convolutional network to infer information from color images, including surface normals, transparent surface masks, and occlusion boundaries. These predictions, together with the initial depth image, are then used as inputs to a global optimization procedure.

#### Estimating 3D Geometry of Transparent Object

The authors build on the depth completion pipeline proposed by Zhang and Funkhouser, but introduce several key modifications to address the unique challenges posed by transparent objects. Rather than only filling in missing depth regions, they train an additional network to predict pixel wise masks for transparent surfaces and use these masks to remove unreliable depth measurements provided by the depth camera. In addition, instead of predicting only occlusion boundaries, they predict both occlusion and contact boundaries, which helps the network distinguish different types of boundaries and more accurately locate depth discontinuities. These boundaries play a crucial role in the subsequent global optimization step.

The optimization algorithm uses the predicted surface normals to guide the shape of the reconstructed depth in regions where depth has been removed and respects the depth discontinuities indicated by occlusion boundaries.

$$
E = \lambda_D E_D + \lambda_S E_S + \lambda_N E_N B
$$

여기서 $E_D$는 추정된 깊이와 관찰된 원시 깊이 사이의 거리를 측정합니다. $E_S$는 이웃 픽셀의 깊이 차이를 측정합니다. $E_N$은 추정된 깊이와 예측된 표면 법선 간의 일관성을 측정합니다.

#### Synthetic Training data generation

To generate synthetic data, the authors use the Synthesis AI platform, which is built on Blender’s physics engine and the physically based ray tracing Blender Cycles rendering engine. This platform is highly configurable and can simulate effects that are particularly important for transparent objects, such as refraction and reflection through multiple surfaces and soft shadows. The dataset consists of nine CAD models that are based on real transparent plastic objects, four of which are held out during training to evaluate generalization. A single gray tote box is used as a background object.

#### Grasp planning

By integrating ClearGrasp into a robotic picking system, the authors apply a state of the art grasping algorithm. The grasping network is an 18 layer fully convolutional residual network with dilated convolutions and ReLU activations, interleaved with max pooling and two layers of spatial bilinear 2x upsampling. The network takes four channel images as input.

---

### Conclusion

This paper presents ClearGrasp, an algorithm that combines synthetic training data and multi modal sensing using color and depth images with deep learning to infer accurate three dimensional geometry of transparent objects for manipulation. Several directions for future work are discussed.

One direction is to explicitly incorporate illumination information at inference time to improve accuracy under varying lighting conditions. Another is to enhance robustness in more complex environments where accurately predicting occlusion and contact boundaries is more challenging, and to improve robustness to shadows.

---

### References

[Original Source 1](https://arxiv.org/pdf/1910.02550)

---
title: 'A generalized explanation framework for visualization of deep learning model predictions'
date: '2023-11-25'
tags: ['xai', 'paper review']
---

### Overview

#### 1. Instance Segmentation

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbRHsAP%2FbtqWUpxkKIH%2FL7l9x3pcMKL8fBS2qEzbzk%2Fimg.jpg" style="display: block; margin: 0 auto; height:200;" />

Instance segmentation is a challenging task because it requires accurately detecting all objects in an image while precisely segmenting each instance.

#### 2. Mask R-CNN

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fcx1zeb%2FbtqWX5EbBpp%2FSDi2o1RDnpCCs2ckVpA8d0%2Fimg.png" style="display: block; margin: 0 auto; height:200;" />

Mask R-CNN is an extension of Faster R-CNN that adds a branch for predicting segmentation masks on each Region of Interest (RoI), in parallel with the existing branch for classification and bounding box regression. It uses a simple, quantization-free layer called RoIAlign to maintain accurate spatial locations, which has led to significant improvements in prediction accuracy—ranging from 10% to 50%.

[Reference #1](https://herbwood.tistory.com/20)

---

### Abstract

<img src="https://velog.velcdn.com/images%2Fjunyoung9696%2Fpost%2Fcb3ef352-6b20-41f4-8962-65526a847d41%2F66535560-d3422200-eace-11e9-9123-5535d469db19.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Autonomous vehicles are categorized into different levels depending on the degree of autonomy. At lower levels, the driver retains more control over vehicle functions and management. The advancement of these technologies helps plan vehicle positioning and proximity to surrounding environments.

In this paper, object detection algorithms are implemented using Facebook AI Research's software system, leveraging the Caffe2 deep learning framework for fast training of advanced object detection. Additionally, cartoonization techniques were applied for image manipulation.

---

### Introduction to Detectron

Detectron aims to:

- Provide high quality
- Deliver high performance
- Offer a solid codebase for object detection research

---

### Detectron2

<img src="https://velog.velcdn.com/images%2Fjunyoung9696%2Fpost%2Ffdfa5ffd-b6aa-4ca4-8289-d386029ed9b3%2F9.PNG" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

The model proposed in this paper takes images in PNG or JPEG format as input and performs object detection using several libraries. It improves detection speed compared to the previously proposed Detectron1 using various algorithms such as Mask R-CNN, RetinaNet, Faster R-CNN, RPN, Fast R-CNN, R-FCN, classification, deep learning, and grayscale techniques.

It combines box, mask, keypoint, DensePose, and semantic segmentation to generate labels and detect objects using bounding boxes.

---

### References

[Original Path #1](https://arxiv.org/pdf/1703.06870)

[Original Path #2](https://www.ijert.org/research/detectron2-object-detection-manipulating-images-using-cartoonization-IJERTV10IS080122.pdf)

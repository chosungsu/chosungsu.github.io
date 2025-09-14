---
title: 'Detectron2 object detection and Manipulating images using cartoonization'
date: '2023-07-10'
tags: ['object detection', 'paper review']
---

### Overview

1.instance segmentation

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbRHsAP%2FbtqWUpxkKIH%2FL7l9x3pcMKL8fBS2qEzbzk%2Fimg.jpg" style="display: block; margin: 0 auto; height:200;" />

이미지에서 모든 객체를 정확히 탐지하는 동시에 각 인스턴스를 세밀하게 분할해야 하기 때문에 도전적인 태스크입니다.

2.mask rcnn

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fcx1zeb%2FbtqWX5EbBpp%2FSDi2o1RDnpCCs2ckVpA8d0%2Fimg.png" style="display: block; margin: 0 auto; height:200;" />

Faster R-CNN을 확장하여 각 관심 영역(RoI)에 대한 분할 마스크를 예측하는 브랜치를 추가한 모델입니다. 마스크 브랜치는 각 RoI에 적용되는 작은 Fully connected layer입니다. RoIAlign이라는 간단하고 양자화가 없는 레이어를 제안하여 정확한 공간 위치를 유지할 수 있으며 예측 정확도를 10%에서 50%까지 큰 향상을 보여주기도 하였습니다.

아래에는 참조한 블로그입니다.

[참조한 블로그 #1](https://herbwood.tistory.com/20)

---

### Abstract

<img src="https://velog.velcdn.com/images%2Fjunyoung9696%2Fpost%2Fcb3ef352-6b20-41f4-8962-65526a847d41%2F66535560-d3422200-eace-11e9-9123-5535d469db19.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

자율 주행 차량은 자율성의 정도에 따라 다양한 수준으로 나뉘며, 낮은 자율성 수준에서는 운전자가 차량의 관리와 기능을 더 많이 제어할 수 있습니다. 이러한 기술 발전은 차량의 위치와 주변 환경과의 근접성을 계획하는 데 효과적입니다.

이 논문에서는 Facebook AI Research 소프트웨어 시스템을 활용하여 객체 탐지 알고리즘을 구현하고, 고급 객체 탐지를 위해 빠른 학습을 제공하는 Caffe2 딥러닝 프레임워크를 사용하였습니다. 또한, 이미지 조작에는 cartoonization 기법을 활용했습니다.

---

### Introduction

Detectron의 목표는 다음과 같습니다.

- 고품질
- 고성능
- 객체 탐지 연구를 위한 코드베이스 제공

---

### Detectron2

<img src="https://velog.velcdn.com/images%2Fjunyoung9696%2Fpost%2Ffdfa5ffd-b6aa-4ca4-8289-d386029ed9b3%2F9.PNG" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

이 논문에서 제안된 모델은 PNG 또는 JPEG 형식의 이미지를 입력으로 받아 여러 라이브러리를 사용하여 객체 탐지를 수행합니다. 여기서는 Mask R-CNN, RetinaNet, Faster R-CNN, RPN, Fast R-CNN, R-FC, 분류, 심층 학습, 그레이스케일과 같은 다양한 객체 탐지 알고리즘으로 이전에 제안하였던 Detectron1에 비해 더 빠른 객체 탐지를 구현합니다. Box, Mask, Key point, Densepose, Semantic segmentation을 모두 결합하여 레이블을 생성하고, 박스를 사용하여 객체를 탐지합니다.

---

### 참고 자료

[원본 경로 #1](https://arxiv.org/pdf/1703.06870)

[원본 경로 #2](https://www.ijert.org/research/detectron2-object-detection-manipulating-images-using-cartoonization-IJERTV10IS080122.pdf)



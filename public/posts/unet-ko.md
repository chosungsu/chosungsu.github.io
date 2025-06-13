---
title: 'U-Net: Convolutional Networks for Biomedical Image Segmentation'
date: '2023-07-24'
tags: ['image segmentation', 'paper review']
---

### Abstract

딥러닝 네트워크의 성공적인 학습을 위해 수천 개의 주석이 달린 학습 샘플이 필요하다는 데 폭넓은 합의가 있습니다.  
이 논문에서는 주석이 달린 샘플을 보다 효율적으로 활용하기 위해 데이터 증강(data augmentation)을 적극적으로 사용하는 네트워크 및 학습 전략을 제안합니다.

---

### Introduction

<img src="https://velog.velcdn.com/images/ski06043/post/b511143f-72d1-411e-b279-bddcdeb6259f/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

컨볼루션 신경망은 이미 오래전부터 존재해 왔지만, 학습 데이터셋의 크기와 네트워크 크기 제한으로 인해 그 성공은 제한적이었습니다.  
CNN은 일반적으로 이미지 단위의 분류 작업에 사용되지만, 이미지 처리에서는 종종 위치 정보가 포함된 출력을 원합니다.

이를 해결하기 위해 슬라이딩 윈도우 방식을 통해 각 픽셀 주변 패치를 입력으로 제공하여 레이블을 예측하는 연구가 진행되었고,  
ISBI 2012 EM 분할 챌린지에서 큰 격차로 우승한 사례가 있었습니다.

하지만 해당 연구에서는 다음과 같은 두 가지 한계가 있었습니다:  
1. 각 패치마다 개별적으로 실행되어 매우 느림.  
2. 위치와 문맥 사이의 tradeoff 존재.

따라서 본 논문은 FCN(Fully Convolutional Network) 아키텍처를 기반으로 문제를 해결하고자 합니다.

---

### Architecture

이 아키텍처는 두 가지 구성 요소로 이루어져 있습니다:  
1. 이미지를 축소하는 contracting path (좌측)  
2. 이미지를 확대하는 expansive path (우측)

- Contracting path는 두 개의 3×3 합성곱을 반복 적용하고, ReLU를 활성화 함수로 사용하며, 2×2 max pooling을 통해 downsampling을 수행합니다.  
- Expansive path는 feature map을 upsampling 한 뒤 2×2 합성곱을 적용하여 채널 수를 절반으로 줄이고, contracting path의 해당 feature map과 병합하여 다시 두 개의 3×3 합성곱을 적용합니다.

마지막으로, 1×1 합성곱을 통해 최종 출력을 생성합니다.

---

### Data Augmentation

데이터 증강은 훈련 샘플이 적을 때 이동 및 회전 불변성, 변형 및 회색 값 변동에 대한 강건성을 학습시키는 데 필수적입니다.

이 논문에서는 표준 편차가 10픽셀인 가우시안 분포에서 무작위 변위 벡터를 샘플링하여 부드러운 변형을 생성하고,  
각 픽셀의 변위는 바이큐빅 보간법을 사용하여 계산하였으며, 드롭아웃 레이어를 통해 추가적인 데이터 증강을 수행하였습니다.

---

### Reference

[원본 경로 #1](https://arxiv.org/pdf/1505.04597)

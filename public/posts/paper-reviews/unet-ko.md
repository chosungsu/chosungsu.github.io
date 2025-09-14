---
title: 'U-Net: Convolutional Networks for Biomedical Image Segmentation'
date: '2023-07-24'
tags: ['image segmentation', 'paper review']
---

### Abstract

딥러닝 네트워크의 성공적인 학습을 위해 수천 개의 주석이 달린 학습 샘플이 필요하다는 것은 널리 알려져 있습니다. 이 논문에서는 데이터 증강을 적극적으로 활용하여 제한된 수의 주석 데이터를 보다 효율적으로 사용하는 것을 제안하였습니다.

이 네트워크는 문맥 정보를 포착하는 수축 경로(contracting path)와 정확한 위치 추정을 가능하게 하는 확장 경로(expanding path)로 구성되어 있습니다.

---

### Introduction

Deep Convolution Networks는 다양한 시각 인식 과제에서 최고의 성능을 뛰어넘는 결과를 보여주어 왔지만 학습 데이터셋의 크기와 네트워크 크기의 제한으로 성과는 제한적이었습니다. 예를 들면 Krizhevsky가 제안한 ImageNet 데이터셋을 사용하여 8개 레이어와 수 백만개의 파라미터를 가진 네트워크를 supervised learning으로 학습시킨 바 있습니다.

컨볼루션 네트워크는 일반적으로 분류(classification) 과제에 사용되며 출력 레이어는 이미지에 대한 하나의 클래스 레이블이 됩니다. 하지만 각 픽셀마다 클래스 레이블을 부여해야 하는 많은 과제에서는 정확한 위치 정보가 요구되며 수천 장의 학습 이미지를 확보하는 것에 한계를 보이고 있습니다. 따라서 Ciresan이 슬라이딩 윈도우 방식으로 학습시켜 픽셀 주변의 로컬 영역(patch)를 입력으로 사용하여 클래스 레이블을 예측하는 방식을 제안하기에 이르렀습니다. 이 제안의 장점과 단점은 다음과 같았습니다.

- 장점
    - 네트워크가 위치 정보를 예측할 수 있습니다.
    - 학습 샘플 수가 실제 샘플 수보다 훨씬 많아집니다.
- 단점
    - 각 patch마다 네트워크를 실행해야 하므로 매우 느립니다.
    - 크기에 따른 pooling이 실행되어 정밀도와의 trade-off가 존재합니다.

이 논문에서는 Fully Convolutional Network을 사용하여 일반적인 contracting path에 이어 pooling 연산이 아닌 upsampling 연산을 이용한 expanding path를 추가하여 출력의 해상도를 높이는 것을 목적으로 하고 있습니다. 주요 수정된 사항 중 하나는 upsampling path에서도 많은 채널 수를 유지하도록 하여 context를 고해상도로 전달한다는 것입니다. 이 네트워크는 입력 이미지에서 문맥 정보가 완전히 확보된 valid region만을 사용합니다. overlaptile 전략을 활용하여 임의의 큰 이미지도 분할이 잘 될 수 있고 가장자리 예측을 위해 부족한 문맥 정보를 거울처럼 반사시켜 보간하도록 하였습니다.

---

### Architecture

<img src="https://velog.velcdn.com/images/ski06043/post/b511143f-72d1-411e-b279-bddcdeb6259f/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

이 아키텍처는 두 가지 구성 요소로 이루어져 있습니다.

1.contracting path (좌측)

2.expansive path (우측)

Contracting path는 컨볼루션 네트워크를 따르고 두 개의 3×3 합성곱, ReLU를 활성화 함수로 사용하며, 2×2 max pooling and 2 strides을 통해 downsampling을 수행합니다.  

Expansive path는 feature map을 upsampling 한 뒤 2×2 합성곱을 적용하여 채널 수를 절반으로 줄이고, contracting path의 해당 feature map과 병합하여 다시 두 개의 3×3 합성곱을 적용합니다. 여기서 채널 수에 대한 cropping은 각 컨볼루션에서 경계 픽셀들이 손실되기 때문에 필요합니다.

마지막 층에서는 1x1 컨볼루션을 통해 64차원 특징 벡터를 원하는 클래스만큼 매핑하게 되고 따라서 총 23개의 컨볼루션 층으로 전체 네트워크가 구성됩니다.

---

### Training

입력 이미지와 segmentation map들은 Caffe의 확률적 경사 하강법 구현을 하여 학습하였다고 합니다. padding을 적용하지 않은 컨볼루션으로 출력 이미지는 입력 이미지보다 일정하게 작아지게 됩니다.

overhead를 최소화하기 위해 large batch size보다 large input files를 선호하며 이에 따라 batch size를 1로 설정하였다고 합니다. 다만 이전에 본 샘플들이 영향을 많이 미치도록 하기 위해 momentum을 0.99로 설정하였다고 합니다.

에너지 함수는 최종 특징 맵에 대한 픽셀 단위로 softmax 연산을 적용하고 cross entropy와 결합하여 계산하였습니다. softmax, cross entropy는 아래와 같이 정의됩니다.

$$
p_k(x) = \frac{exp(a_k(x))}{\sum_{k'=1}^{K}exp(a_k'(x))}
$$

우선 softmax 정의에서 $a_k(x)$는 위치 $x$에서의 클래스 $k$에 해당하는 activation을 의미하고 K는 클래스 수, $p_k(x)$는 softmax 결과로서 클래스 $k$일 확률을 의미합니다. 즉 activation이 가장 클 경우 1, 그렇지 않으면 0이 됩니다.

$$
E = \sum_{x \in \Omega} w(x) * log(p_{l(x)}(x))
$$

여기서 $l : \Omega \rightarrow {1, ..., K}$는 각 픽셀의 실제 클래스 레이블이며 $w : \Omega \rightarrow R$은 일부 픽셀에 더 큰 weight을 부여하기 위해 도입한 weight map입니다. 이 weight map은 다음과 같은 목적을 위해 사전계산이 됩니다.

1.특정 클래스의 픽셀 빈도 차이를 보상하기 위해

2.붙어 있는 셀 사이를 분리하는 border를 학습하도록 유도하기 위해

위 border는 형태학적 연산(morphological operations)를 통해 계산이 되는데 아래와 같이 정의됩니다.

$$
w(x) = w_c(x) + w_0*exp(-\frac{(d_1(x)+d_2(x))^2}{2\sigma^2})
$$

여기서 $w_c(x)$는 클래스 빈도를 보정하는 가중치, $d_1(x)$, $d_2(x)$는 거리에서 가까운 순의 셀 경계까지의 거리로 정하고 실험에서는 $w_0$=10, $\sigma$=5 픽셀로 설정하였습니다.

deep networks에서는 여러 층과 경로가 존재하므로 가중치 초기화가 중요합니다. 이상적인 초기 가중치는 모든 feature map이 대략 분산 1을 갖도록 조정되어야 합니다. 가중치 초기화는 평균 0, 표준편차 $\sqrt{2N}$을 갖는 gaussian 분포에서 샘플링하는데 N은 뉴련 하나에 입력되는 노드 수를 의미하고 예를 들어 3x3 컨볼루션과 채널 64에서 N=3x3x64=576입니다.

---

### Experiments

성능 평가는 신경 구조의 segmentation task에 대한 설명만 부연하자면 훈련 데이터는 512x512 크기의 초파리 이미지 30장으로 구성하고 각 이미지는 세포와 세포막 등이 포함되어 있다고 합니다. 평가 방식은 feature map을 10개의 서로 다른 threshold로 이진화해서 warping error, rand error, pixel error 오류 세 가지를 계산하였습니다. 이 요소 중 unet은 warping error에서 벤치마크 최고 성능을 달성하였습니다.

---

### Reference

[원본 경로 #1](https://arxiv.org/pdf/1505.04597)

---
title: 'Neural discrete representation learning'
date: '2022.10.17'
tags: ['anomaly detection', 'paper review']
---

### Abstract
이 논문에서 주장하는 Vector Quantised Variational AutoEncoder는 기존 VAE와는 다음과 같은 차이점이 있다고 합니다.
인코더 부분에서 연속적이기 보다 이산적인 결과를 도출하고 잠재적인 표현을 학습하기 위해서 Vector Quantised 아이디어를 통합하였다고 합니다. 해당 아이디어를 통해 Auto Regressive Decoder와 결합될 때 잠재 변수를 무시하는 사후 붕괴(Posterior collapse)문제를 피할 수 있다고 합니다.

---

### Introduction

비지도 학습 모델을 훈련하기 위해 Maximum likelihood와 Reconstruction error가 사용되기는 하지만 이 논문에서는 보다 잠재 공간에서 중요한 특징을 보존하면서 Maximum likelihood를 최적화하는 모델을 구현하고자 하였습니다. 물론 가장 좋은 현실적인 대안은 Latent vector가 없지만 Decoder 모델로 생성하는 CNN계열이겠지만 앞서 Abstract에서 밝혔듯이 이산적이고 잠재 변수를 학습하여 다양한 도메인에 적합함을 입증하고자 하였습니다.

논문에서 주장하는 VQ-VAE는 잠재공간을 효과적으로 사용하기 때문에 많은 차원의 특징을 모델링하기에 부족함이 없다고 합니다. 지역적인 노이즈와 인지 불가능한 특징에 집중하는 것을 피할 수도 있다고 합니다.

---

### VQ-VAE

이산 잠재 변수

임베딩 공간 KD에서 K는 공간의 크기이고 D는 벡터의 차원이라고 정의하였다.
<img src="https://velog.velcdn.com/images/ski06043/post/4ce0b844-2d79-49e2-94d6-bcdda7ea355c/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

위 이미지에서처럼 모델은 입력 x를 받아 인코더를 통해 z(x)를 출력하게 된다. 이 때 이산 잠재 변수는 공간에서 최근접 이웃 탐색으로 계산된다. 또한 디코더에 이르기 이전에 posterior categorical distribution 계산은 아래의 수식으로 구성하였다.

$$q(z = k|x) =\begin{cases} 1 & \text{if } k = \arg \min_j \|z_e(x) - e_j\|^2, \\0 & \text{otherwise}.\end{cases}$$

원핫 인코딩 형태로 정의가 되며 z에 대해 단순한 균일 분포로써 KL 발산은 상수가 된다.

---

### Experiments

1. 연속변수와의 비교

첫 번째 실험으로, VQ-VAE를 연속 변수를 사용하는 일반적인 VAE 및 독립적인 가우시안 또는 범주형 사전 분포를 가지는 VIMCO와 비교했으며 인코더를 stride 2에 4 by 4 크기로 두개의 convolution layer와 두개의 residual 3 by 3 블록 내부에는 Relu + 3 by 3 convolution layer + Relu + 1 by 1 convolution layer로 구성하였다고 합니다. 결과는 VAE 4.51 bits/dim에 근접한 4.67 bits/dim을 기록했다고 합니다.

2. 오디오 데이터

<img src="https://velog.velcdn.com/images/ski06043/post/6fec4680-8f82-402a-b173-91a85f34d66a/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

두번째로 가져온 실험은 오디오 데이터인 VCTK와 비교했으며 인코더를 stride 2이고 4 by 4 크기인 6개의 convolution layer를 구성하였다고 합니다. 64배 작은 잠재 공간을 생성할 수 있었고 완벽한 복원은 불가하였으나 파형과 음성의 억양이 달라진 점으로 보아 고수준 추상 공간을 학습하였다는 의미를 발견하여 더 큰 데이터셋으로 128배 작은 잠재 공간으로 수정한 모델로 사전 훈련시켜 클래스 분류 정확도 49.3%에 랜덤 정확도 7.2%를 기록했다고 합니다.
---

### Conclusion

위에 언급했던 실험들로 VQ-VAE가 완전한 비지도 학습 방식으로 데이터의 중요한 특징을 포착하는 이산 잠재 공간을 학습할 수 있음을 보였습니다. 게다가, VQ-VAE는 기존의 연속형 잠재 변수 모델과 거의 유사한 성능을 달성한 것은 이 논문의 최대 의의로 볼 수 있습니다.

---

### 참고 자료

[원본 경로: https://arxiv.org/abs/1711.00937](https://arxiv.org/abs/1711.00937)
---
title: 'Convolutional neural networks'
date: '2024-02-16'
tags: ['cs231n', 'lecture']
---

### convolutional neural networks

<img src="https://velog.velcdn.com/images/devjo/post/db97e76c-252d-4324-87ba-120464b2f334/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

cnn은 이미지 모습 그대로를 입력에 사용합니다. 이미지는 보통 $(w, h, c)$ 순서로 존재하고 cnn에서는 $w$를 filter라고 합니다. filter값은 보통 이미지의 $w$ 또는 $h$보다 작은 값을 사용합니다. filter의 depth 크기는 입력의 $c=3$값과 같습니다.

결과의 $w'=w-w_f+1$로 크기가 정해집니다.

#### 1. stride

<img src="https://velog.velcdn.com/images%2Ffbdp1202%2Fpost%2Ff5478fa9-4b89-47a8-bcdb-c9149898a202%2Fcs231n-05-011-convolutional_layer_cal_stride.gif" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

stride는 filter가 이미지를 sliding할 때 움직이는 step 크기를 말합니다.

#### 2. pad

<img src="https://velog.velcdn.com/images%2Ffbdp1202%2Fpost%2F7260f062-912f-4047-9088-b2a238df633c%2Fcs231n-05-012-convolutional_layer_padding.gif" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

convolutional layer는 filter 크기에 따라서 결과 이미지의 크기가 줄어들게 되는데 원본 크기를 유지하면서 이미지의 가장자리가 덜 계산에 쓰이는 현상을 방지하는 역할을 합니다.

#### 3. output size

결과의 크기를 구하는 방법으로 기본적으로 stride, pad를 제외하였을 때는 $w'=w-w_f+1$ 였지만 모두 포함한다면 $w'=(w-w_f+2*p)/s+1$이 됩니다.

#### 4. cnn layer의 특징

fully connected layer와 다르게 입력 이미지에 local region에 연결(local connectivity)할 수 있다는 장점이 있습니다.

결과의 크기가 4개의 하이퍼파라미터($w_f, s, p, f_k$)로 결정(spatial arrangement)됩니다.

각 채널($c$)에 대해서 하나의 filter를 사용하여 parameter를 공유(parameter sharing)하여 그 수를 줄일 수 있습니다.

---

### pooling layer

pooling은 activation map의 크기를 downsampling하는 과정을 말합니다. 즉 이미지의 크기를 줄이는 것입니다. layer의 깊이가 깊어지면 많은 계산 양을 요구하게 되는데 이 상황에 pooling을 통해 속도 향상을 도모합니다. stride 역시 동일한 역할을 하지만 계산량 측면에서 pooling이 더 좋습니다.

#### max pooling layer

<img src="https://velog.velcdn.com/images/devjo/post/a799ab17-47c0-4804-a840-763c9bd37ad7/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

예를 들어 4x4 입력 이미지에서 2x2 filter와 2 stride로 pooling을 하게 되면 해상도를 2배로 줄일 때 가장 잘 보이는 성분을 남기는 것과 같습니다. 일반적으로 stride는 filter끼리 겹치지 않게 설정합니다.

#### pooling vs stride

pooling layer가 보통 representation의 크기를 크게 줄이기 때문에 overfitting에는 효과적일 수 있지만 최근에는 사용을 거의 하지 않습니다.

모델의 표현력은 stride가 좋지만 훈련 가능한 매개변수가 증가하는 점은 문제가 될 수 있습니다. 다만 max pooling 대신 stride를 사용하면 좋은 성능을 보였던 경우가 있다고 합니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/bNb2fEVKeEo?si=4_yW_XwLLy3_fvHD)




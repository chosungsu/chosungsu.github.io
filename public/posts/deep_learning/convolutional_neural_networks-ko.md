---
title: 'Convolutional neural networks'
date: '2022-08-12'
tags: ['Deep Learning', 'lecture']
---

### Fully connected layer

<img src="https://i.sstatic.net/BVZro.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

fully connected layer에서 $f(x) = W \cdot x$로 기본형을 통해 구조를 파악할 수 있고 하나의 정답에 대해서 $W \in R^d$, $x \in R^d$, $s \in R$로 차원을 설정합니다. 모든 레이블로 확장하면 $W \in R^{c \times d}$, $x \in R^d$, $s \in R^c$로 보면 됩니다.

fc layer는 모든 입력과 모든 결과에 대한 관계를 도식화하는 것으로 어떤 결과값도 어떤 입력이든 연결이 될 수 있게 됩니다.

---

### Spatial locality

이미지에서 패턴을 인식하는 과제가 있을 때 필터를 통해 높은 스코어를 갖는 패턴을 얻을 수 있어야 합니다. 찾고자 하는 패턴 주변의 픽셀만 이에 영향을 주고 나머지는 영향을 주지 않기 때문에 fc layer의 정의와 반대입니다.

---

### Convolutional neural networks

컨볼루션 신경망은 위의 spatial locality로 각 필터가 근처의 픽셀을 포착하도록 하고 같은 필터들로 모든 위치를 탐색하도록 합니다.

#### Convolutional layer

단일 입력값과 필터를 시각화하면 아래와 같습니다.

<img src="https://stanford.edu/~shervine/teaching/cs-230/illustrations/convolution-layer-a.png?1c517e00cb8d709baf32fc3d39ebae67" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

이처럼 필터는 모든 이미지의 위치를 움직여가면서 내적을 진행하여 결과를 계산하게 됩니다. 그리고 rgb로 3차원 입력이 있다면 $32 \times 32 \times 3$의 입력에 대한 3차원 필터는 $3 \times 3 \times 3$이 존재하고 이에 따른 결과는 $3 \times 3 \times 3$과 bias 1개를 더하여 총 28개가 더해집니다.

단일 필터(1개)로 필터링된 결과는 activation map의 크기라고도 하며 실제 계산은 (입력 크기 - 필터 크기 + 1)로 구해지기 때문에 $(32 - 3 + 1) \times (32 - 3 + 1) \times 1=30 \times 30 \times 1$이 됩니다. 만약 다중 필터($n$개)로 필터링한다면 $30 \times 30 \times n$이라고 하면 됩니다.

#### Nested convolutional layers

예를 들어 low level, mid level, high level의 feature들로 conv-layers를 중첩(nest)한다면 high level features들은 가장 차이를 잘 구별할 수 있는 데 유용한 특징들로 학습이 될 것입니다. 그 다음 mid level은 high level features를 구별하는데 유용한 특징들로 학습하고, low level도 mid level을 구별하는데 유용한 특징들로 학습할 것입니다. 이미지는 많이 복잡한 특징이 있기 때문에 nested conv-layers를 쌓아서 해결하기도 합니다.

filter의 크기가 커질수록 activation map은 필연적으로 점점 작아지게 됩니다. 따라서 nested layers를 많이 쌓을 수 없게 됩니다.

#### Stride

<img src="https://www.baeldung.com/wp-content/uploads/sites/4/2023/10/Screenshot-2023-10-10-at-1.11.45-PM.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

입력 크기가 $7 \times 7$이고 $3 \times 3$ 크기의 필터가 있을 때 stride를 default가 1이므로 1부터 크기를 키우며 비교를 해보겠습니다. stride는 filter를 얼마나 움직이는지 정하는 파라미터입니다.

stride가 1이면 $(7 - 3) / 1 + 1 = 5$, stride가 2이면 $(7-3)/2 + 1 = 3$, stride가 3이면 $(7-3)/3+1 = 2.33$의 activation map의 크기가 계산됩니다. 즉 일반화하면 $(N-F)/stride + 1$이라고 생각하면 되며 stride 3 이후부터는 계산을 할 수 없게 됩니다.

#### Padding

<img src="https://blog.kakaocdn.net/dna/bFhpps/btsJxT5akay/AAAAAAAAAAAAAAAAAAAAAHApT9PIt3ZMJizhIBTNBulAfCd7Nf01eg62_NIcfanF/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1761922799&allow_ip=&allow_referer=&signature=A2Eh0611xW8tpSX7uJQLPrWCLdc%3D" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

입력 이미지의 테두리에 제로값을 넣어주는 방법입니다. 이를 사용하면 위의 $7 \times 7 \rightarrow 9 \times 9$가 되어 stride 1로 진행하여도 $(9-3)/1 + 1 = 7$로 기존 이미지 크기를 유지합니다.

padding과 stride를 모두 적용한 일반화 식은 $(N-F+2p) / stride + 1$이며 padding의 크기는 $(F-1)/2$로 구하면 됩니다.

위의 예시였던 $32 \times 32 \times 3$의 입력과 $5 \times 5 \times 10$의 필터, stride 1과 padding 2를 적용한다면 activation map의 크기는 $(32 - 5 + 2 \times 2) / 1 + 1 = 32$로 즉 $32 \times 32 \times 10$이 됩니다. 그리고 총 파라미터의 개수는 $10 \times (5 \times 5 \times 3 + 1) = 760$개가 됩니다. 마지막의 bias를 잊지 않아야 합니다. 따라서 fc layer로 입력과 결과에 필요한 파라미터 수는 $(32 \times 32 \times 10) \times (32 \times 32 \times 3 + 1) = 31467520$개로 conv-layer의 $760$개는 fc-layer 몇 배의 시간이 더 감소가 되는지 알 수 있으며 이는 spatial locality, positional invariance를 적용한 효과입니다.

#### $1 \times 1$ filters

만약 6차원 $1 \times 1$ 크기의 필터로 padding 없이 conv-layer를 구현한다면 $(32-1)/1+1 = 32$이므로 activation map의 크기는 $32 \times 32 \times 6$이 되고 파라미터 수는 $6 \times (1 \times 1 \times 3 + 1) = 24$개가 나옵니다.

이렇게 필터의 크기가 $1 \times 1$이라면 입력 이미지가 3차원일 때 같은 자리에 대해서만 총 필터의 차원인 6번을 보게 됩니다. 이는 결국 activation map의 크기가 변하지 않고 차원(개수)를 $3 \rightarrow 6$으로 늘려주는 효과가 있습니다. 이러한 작업은 fc-layer의 정의처럼 하나의 정답(위치)에 대해서 모든 가중치를 연결하는 것과 같아지지만 주변의 정보는 전혀 반영되지 않는 작업입니다.

#### Fc layer vs Conv layer

사실 conv-layer는 fc-layer의 특이 케이스라고 할 수 있습니다. conv-layer에서 filter를 통해 주목되는 공간은 값이 있게 하고 그렇지 않은 공간은 0으로 채우면 fc-layer와 동일한 작업으로 생각할 수 있습니다.

#### Pooling layer

<img src="https://www.researchgate.net/publication/340812216/figure/fig4/AS:928590380138496@1598404607456/Pooling-layer-operation-oproaches-1-Pooling-layers-For-the-function-of-decreasing-the.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

downsampling을 위해 고안된 layer입니다. pooling을 통해 max, average 연산으로 공간의 축소를 합니다. 이 과정에서는 단순히 downsampling을 하기 때문에 필요한 파라미터는 0이며 입력 이미지가 $(W \times H \times C)$일 때 downsampling 이후 결과는 $((W-F)/S + 1, (H-F)/S + 1, C)$로 차원은 동일함을 알 수 있습니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/gJZ90HPstrs?si=_D02I8LdEZFKvWpw)
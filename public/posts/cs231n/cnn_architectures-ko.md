---
title: 'CNN architectures'
date: '2024-03-01'
tags: ['cs231n', 'lecture']
---

### alexnet

<img src="https://velog.velcdn.com/images/choonsik_mom/post/c3367f4c-7837-483c-bc08-f4862f34ff48/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

alexnet은 최초의 large scale CNN이고 컴퓨터의 성능이 좋지 않아서 GPU에 분산시켜서 학습시킨 네트워크입니다.

특징으로는 relu를 처음으로 사용하였고 LRN norm layers를 사용하는 것이 대표적입니다.

Local Response Normalisation(LRN)은 BN이 나오기 이전에 측면 억제(lateral inhibition)을 하기 위해서 사용하였습니다. 측면 억제는 검은 바탕에 흰 줄이 있을 때 교차하는 지점에 회색의 점이 보이는 현상입니다. 이를 사용하게 된 이유는 relu를 사용하여 양수의 값을 사용하여 conv, pooling 시에 높은 픽셀 값이 나올 수 있기 때문에 같은 위치의 픽셀끼리 정규화가 필요하였기 때문입니다.

---

### vgg

<img src="https://miro.medium.com/v2/resize:fit:857/1*AqqArOvacibWqeulyP_-8Q.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

ILSVRC 우승 모델로 layer의 수가 깊어진 것을 볼 수 있습니다. 하지만 alexnet과 같은 11x11 filter가 아닌 3x3 filter를 쌓아올려 파라미터의 수를 줄였습니다. 레이어 깊이에 따라 vgg16, vgg19로 구분합니다.

---

### googlenet

<img src="https://velog.velcdn.com/images%2Ffbdp1202%2Fpost%2F73ae7aa5-7d7f-4e5e-8ac6-41675412501d%2Fcs231n-09-007-GooLeNet.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

복잡한 구조가 있는데 대표적으로 inception module이 있습니다. 레이어는 22개가 있고 fully connected layer를 없애서 파라미터 수를 줄였습니다.

#### inception module

<img src="https://production-media.paperswithcode.com/methods/Screen_Shot_2020-06-22_at_3.22.39_PM.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

인셉션 모듈을 보면 좌측의 naive version에서는 같은 입력을 받는 여러 filter들이 병렬적으로 존재하고 결과에서 합치는 것을 볼 수 있습니다. 하지만 이러한 구조에서는 계산량이 폭발적으로 증가합니다. 예를 들어 28x28x256의 입력값에 좌측에서 우측으로 순서대로 28x28x128, 28x28x192, 28x28x96, 28x28x256의 파라미터를 갖고 총 854M 파라미터가 생성됩니다. 따라서 이러한 문제를 해결하기 위해 1x1 conv를 추가로 사용한 bottleneck layer가 우측 이미지에 있습니다. 이를 사용하면 총 358M 파라미터를 사용하게 됩니다.

---

### resnet

<img src="https://production-media.paperswithcode.com/methods/resnet-e1548261477164.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

residual connection이라는 새로운 구조를 갖고 있습니다. 일반적으로 깊은 네트워크에서는 파라미터 수에 따라 overfitting 위험이 있다고 생각되어 왔지만 실제로 비교한 결과에서는 깊은 네트워크일수록 training error가 높아 학습이 잘 되지 않았음을 알 수 있었는데 이러한 현상을 degradation이라고 합니다.

이러한 문제를 해결하기 위한 방법이 skip connection으로 연산 증가가 거의 없고 gradient vanishing 문제가 발생하여도 원본 정보는 그대로 갖고 있어 학습에 문제가 없다는 장점이 있습니다.

BN을 사용하고 pooling 대신에 2 stride를 적용하였으며 xavier initialization을 사용하였습니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/DAOcjicFr1Y?si=AXXzz9WcAHdKgLYN)




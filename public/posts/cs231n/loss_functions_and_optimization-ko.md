---
title: 'Loss functions and optimization'
date: '2024-02-02'
tags: ['cs231n', 'lecture']
---

### loss function

모델이 잘 되고 있는지 알 수 있는 방법으로 loss function을 사용합니다. 현재 사용하고 있는 image classifier가 어느 정도의 손실을 가지고 있는지를 나타냅니다.

$$
L = \frac{1}{N} \sum_{i} L_i (f(x_i, W), y_i)
$$

이 수식을 통해 각 $N$개의 데이터에서 구해지는 손실 값들을 더한 뒤 $N$으로 나눈 평균 값을 loss로 사용하는 것을 알 수 있습니다.

#### 1. multiclass SVM loss

<img src="https://iq.opengenus.org/content/images/2023/04/hloss.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

linear classification의 $f(x_i, W)$에서 나온 결과 값을 $s$라고 하고 정답 클래스의 $s$값을 $s_{y_i}$라고 하여 값을 비교합니다. 정답보다 다른 클래스의 점수가 더 높다면 그 차이를 loss라고 합니다.

이렇게 구한 loss에 safety margin을 추가하는데 이는 정답 클래스가 적어도 다른 클래스보다 safety margin 만큼 커야 한다는 의미입니다.

loss값이 음수이면 포함하지 않습니다.

위 이미지는 이를 잘 보여주는 hinge loss로 데이터와의 거리가 먼 hyperplane을 구하는 데에 쓰이게 됩니다. 마진보다 크지 않은 데이터에 대해서 loss를 크게 유도하는 기법입니다.

#### 2. regularization

loss function의 값이 줄어들 수록 모든 모델이 좋은 성능을 가지는가에 대한 질문에 반은 맞고 반은 틀리다라고 볼 수 있습니다.

그 이유는 overfitting이 되는 경우가 있기 때문입니다. 이는 학습을 시킬 때 학습 데이터에 대해서는 좋은 성능이 되도록 학습이 되지만 검증과 평가 시에는 성능이 떨어지는 현상을 말합니다.

이러한 문제를 regularization으로 해결합니다. 앞서 구한 수식(data loss)에 제약 조건항을 추가합니다.

$$
L = \frac{1}{N} \sum_{i} L_i (f(x_i, W), y_i) + \lambda R(W)
$$

종류는 L2 regularization, L1 regularization, elastic net 등이 있습니다. L2 regularization은 제곱의 가중치를 갖는 원형의 모습을 띄며 대부분의 값들이 0에 가까워지는 가우시안 분포를 가집니다. L1 regularization은 절대값의 가중치를 갖는 마름모 모습을 띄며 0으로 수렴하는 sparse matrix를 따릅니다.

#### 3. softmax classifier

multiclass SVM과 다르게 logistic한 값을 사용하며 정답 클래스 분포를 보고 loss를 결정하는 차이점이 있습니다.

<img src="https://velog.velcdn.com/images%2Ffbdp1202%2Fpost%2Fba98cf8b-a668-4ed6-bea9-d5301654db1a%2Fcs231n-03-010-Softmax_Classifier.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

score값에 exponential을 취하고 이 값에 대한 확률 분포 값을 구합니다. 이후 정답 값을 제외한 나머지 클래스에 대해서 음의 로그값을 취하여 더해줍니다.

---

### optimization

weight 값이 어느 정도 잘못 되어 있는지 loss function으로 확인하고 좋은 weight 값을 결정하기 위해 optimization을 진행해야 합니다.

#### 1. random search

첫번째 방법은 random search는 아무런 기준 없이 weight값을 변경해보며 가장 좋은 성능을 가지는 것을 찾는 것입니다. 정확도가 매우 낮기 때문에 권장되지 않습니다.

#### 2. local geometry gradient descent

$$
\frac{df(x)}{dx}=lim_{h \rightarrow 0} \frac{f(x+h)-f(x)}{h}
$$

미분을 통해 기울기를 구하고 weight을 $h$만큼 더하여 변화를 주고 h로 나눈 값이 gradient dW 값이 됩니다. 이러한 방식을 numerical gradient라고 합니다. 각 모든 weight 성분에 대해서 계산되어야 하기 때문에 굉장히 느리다는 단점이 있습니다. step size를 통해서 어느 정도 폭으로 계산을 할 지 결정할 수 있습니다.

#### 3. stochastic gradient descent

<img src="https://blog.kakaocdn.net/dn/oLW0Y/btqyj35DqII/zzDSdEfWKXVD3De5lNpCh0/img.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

gradient descent를 구하기 위해서 loss function이 필요한데 전체 loss의 평균으로 사용하기 때문에 시간이 오래 걸린다는 단점이 있었습니다. 따라서 SGD에서는 전체 데이터셋의 gradient를 구하는 것이 아니라 minibatch로 작은 샘플을 나누어 학습을 진행하는 방식이고 보통 2의 승수로 정합니다. 미니 배치로 선택된 데이터셋의 오차를 기반으로 가중치를 업데이트하기 때문에 빠른 계산 속도를 보입니다.

---

### feature transformation

#### 1. color histogram

각 이미지에서 hue만 뽑아서 모든 픽셀을 color bucket에 넣고 개수를 세는 방법입니다. 예를 들어 개구리가 있을 때 초록색이 많다고 결과가 나오게 됩니다.

#### 2. histogram of oriented gradient

이미지를 8*8 픽셀로 나누어 각 픽셀의 지배적인 edge 방향을 계싼하고 그 edge를 bucket에 넣습니다.

#### 3. bag of words

이는 natural language process에서 영감을 받은 방식으로 어떤 문장에서 여러 단어들의 발생빈도를 count합니다. 이를 이미지에 적용하면 임의대로 조각을 내어 각 조각을 군집화하고 각 군집들의 색과 방향에 대한 edge를 bucket에 넣습니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/h7iBpEHGVNc?si=6KRXeu8yppHiCE6X)




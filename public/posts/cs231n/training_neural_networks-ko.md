---
title: 'Training neural networks'
date: '2024-02-23'
tags: ['cs231n', 'lecture']
---

### activation functions

<img src="https://velog.velcdn.com/images%2Ffbdp1202%2Fpost%2F4085832e-c81b-4b38-ae14-4f67d4fa9c49%2Fcs231n-06-001-Activation_Functions_01.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

activation은 fully connected layer에서 얻는 결과를 다음 노드로 보내기 전에 적용되는 함수입니다. 보통은 non linear 함수입니다.

#### 1. sigmoid

<img src="https://hvidberrrg.github.io/deep_learning/activation_functions/assets/sigmoid_function.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

sigmoid는 대부분 singular 또는 binary classification에 많이 쓰입니다. 하지만 최종 출력에만 사용되는데 그 이유로는 gradient vanishing 문제가 있습니다. 위 이미지에서 볼 수 있듯이 양 끝 곡선은 기울기가 거의 0에 수렴하여 backpropagation을 하게 되면 0에 수렴하는 값이 계속 곱해지게 되어 문제가 생기는 것입니다. 두번째로는 zero centered가 되지 않는 문제가 있습니다. 입력이 모두 양수라고 할 때 sigmoid의 forward pass gradient는 $x$로 이 부호는 weight이 모두 같은 방향으로 움직여 4분면 중 2분면 영역만 업데이트에 활용되므로 비효율적이라는 의미입니다. 마지막으로 exponential 연산은 cost가 비싸다는 단점이 있습니다.

#### 2. tanh

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9ry0AN6TccJ3zFLN17JNkIZ_D5eNgFy3g4A&s" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

sigmoid의 zero centered 문제를 해결하였습니다. 하지만 1, 3번 문제는 여전히 존재합니다.

#### 3. relu

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1FnGy2l0vT9GyQZzoHWE1nKR3Jbxdkom5aw&s" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

sigmoid와 tanh보다 수렴속도가 6배나 빠른 함수입니다. 하지만 이 역시도 0 이하 값들을 전부 사용하지 않아서 zero centered 문제가 있으며 dead relu에 빠지게 됩니다.

#### 4. leaky relu

<img src="https://media.licdn.com/dms/image/v2/D4D22AQHERBEX35wHlg/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1730451358786?e=2147483647&v=beta&t=d6-2D9FjHhgP1BV_k8q_wg9r07kNES6faN3HmPHr8iI" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

따라서 0 이하의 값을 사용할 수 있도록 0.01을 곱한 값을 주도록 하였습니다. 일반적으로 leaky relu를 많이 사용하고 있다고 합니다.

---

### data preprocessing

데이터 전처리는 zero centered, normalized를 많이 사용합니다.

이미지에서는 이미 값이 0~255로 제한되어 있어서 scale 변화가 생기는 normalization 대신에 zero centered를 사용합니다.

scale 조정은 standard scaler, robust scaler, minmax scaler, normalizer가 있습니다.

pca와 whitening 기법은 이미지에서 잘 사용하지 않습니다.

pca는 데이터를 정규화하고 공분산 행렬을 만들어 중요한 차원만 남기고 축소하는데 사용하며 whitening은 입력을 상관관계가 없도록 만들고 분산을 1로 만들어 eigenbasis를 eigenvalue로 나누어 정규화를 진행하는 방법입니다.

---

### weight initialization

weight이 0인 경우를 gradient vanishing 문제라고 하며 랜덤값을 0.01로 scale한 값을 사용하는 방법(small random numbers)이 있지만 deep network에서는 이 역시 문제가 발생합니다.

#### xavier initialization

위에서 0.01과 같이 고정된 크기로 scaling을 했었다면 xavier는 노드의 개수로 normalized를 하는 방법입니다.

---

### normalization

#### 1. batch normalization

$$
\hat{x^k}=\frac{x^k-E(x^k)}{\sqrt{var(x^k)}}
$$

위와 같은 수식으로 network의 각 layer마다 입력 이미지 분포가 달라지지 않도록 방지합니다. 따라서 이는 fully connected layer $\rightarrow$ BN $\rightarrow$ activation function의 위치로 들어갑니다. 여기서 BN을 사용하면 입력 이미지는 항상 unit gaussian이 됩니다.

네트워크가 깊어질 수록 분포가 달라지고 학습이 느려짐에 따라 생기는 내부의 공변량 변화 문제를 해결하기 위해 감마 값(scaling)으로 BN의 분산을 조절하며 베타 값(shifting)으로 평균을 조절합니다. 참고로 감마가 이미 표준편차이고 베타가 평균이라면 BN을 하지 않는 것과 같습니다.

#### 2. layer normalization

<img src="https://velog.velcdn.com/images%2Ffbdp1202%2Fpost%2Ffb21f3bb-76e1-4204-8605-c20584228ba8%2Fcs231n-06-027-LN_02.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

LN은 batch와 $w$, $h$를 normalization하는 BN과 달리 한 batch에서 depth와 $w$, $h$에 대해서 normalization을 하는 것입니다.

---

### optimization

일반적으로 sgd에서는 여러 문제가 있습니다.

매우 느린 수렴속도와 local minima, saddle point 등이 있습니다.

#### momentum

momentum은 기존 sgd에 가속도를 주는 것입니다. vx(속도)와 rho(마찰계수) 값을 사용해서 sgd보다 부드럽게 local minima와 saddle points를 피해갈 수 있습니다.

#### nesterov momentum

momentum은 입력 값에서 gradient와 velocity를 더하여 다음 step을 구합니다. 하지만 nesterov momentum은 입력 값에서 gradient값을 구하는 것이 아니라 velocity만큼 움직인 이후에 gradient를 구하고 이를 더하여 다음 step을 구합니다.

convex function에서는 뛰어난 성능을 보이지만 neural networks에는 그렇게 좋지는 않습니다.

#### adagrad

각 매개변수를 갱신하는 알고리즘으로 입력 값의 gradient를 구해서 이를 제곱한 값의 제곱근으로 나누어 업데이트를 진행합니다. 분모에 $1e-7$를 더하는 것은 gradient의 제곱값이 0인 경우에 계산 불가를 방지하기 위함입니다.

이처럼 gradient의 제곱을 더해주기 때문에 분모가 커지고 다음 step을 진행할 수록 값이 작아집니다. 이에 대한 대안으로 RMSprop이 있는데 gradient의 제곱을 사용하는 것은 동일하지만 누적이 아니라 decay rate을 곱합니다. 이 값으로 보통 0.9 또는 0.99를 사용합니다.

#### adam

momentum을 사용하는 방법과 adaptive를 적용하는 방법을 합친 것이 adam입니다. first moment는 momentum을 나타내고 second moment는 adaptive를 나타냅니다. 분자에는 momentum, 분모에는 adaptive를 사용하여 다음 step을 구합니다.

---

### ensemble

학습을 진행될 때 training 데이터에 대해 학습은 잘 되지만 검증 및 테스트 데이터에는 학습이 잘 되지 않는 overfitting 문제가 발생하는 경우가 많습니다.

이러한 해결책으로 model ensemble이 있습니다.

각각의 여러 독립적인 모델을 학습시키고 test 시에 동시에 이용하는 방법, 독립적인 학습이 아닌 학습 도중 학습 모델을 저장하고 앙상블로 사용하는 방법, 일정 epoch마다 learning rate의 변화를 주는 방법 등이 있습니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/wEoyxE0GP2M?si=zsZjQOx4EPWgV56L)

[원본 경로 #2](https://youtu.be/_JB0AO7QxSA?si=QCnP-gLLobY6h2KB)




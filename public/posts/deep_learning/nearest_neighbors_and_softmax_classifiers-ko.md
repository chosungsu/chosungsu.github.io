---
title: 'Nearest neighbors and Softmax classifiers'
date: '2022-08-05'
tags: ['Deep Learning', 'lecture']
---

### Image classifier

딥러닝의 등장 이전에 이미지를 분석하는 방법은 다음과 같았습니다.

예를 들어 고양이라는 이미지가 있을 때, find edges를 통해 모서리를 본뜨듯이 인식합니다. 이 때 일정 threshold값을 넘어가면 흰색, 아니면 검은색으로 대비되게 그립니다.

이미지와 레이블 데이터를 최대한 많이 수집하고 알고리즘으로 학습하고 보지 않은 이미지에 대해 레이블을 예측하게 하였습니다.

---

### Nearest neighbors

<img src="https://intuitivetutorial.com/wp-content/uploads/2023/04/knn-1.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

위 이미지에서처럼 레이블을 찾고자 하는 학습 과정에서 보지 않았던 새로운 데이터 포인트가 있을 때 이를 학습 결과에 따라서 레이블을 예측하는 것을 Nearest neighbors 알고리즘이라고 합니다.

이렇게 되기 위해서는 학습 과정에서 모든 데이터와 이에 매칭되는 레이블 정보를 memorize해야 합니다.

<img src="https://cs231n.github.io/assets/pixelspace.jpeg" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

위 이미지처럼 각 레이블 이미지들은 학습할 때 이미지와 레이블을 매핑하여 정보를 기억하게 되는데 전혀 레이블이 없는 새로운 이미지가 입력으로 들어오면 가장 유사한 이미지 레이블과 비교를 하게 됩니다.

이것이 가능하기 위해서는 각 이미지의 rgb matrix를 사용하고 사전에 이미지 크기도 맞추어야 합니다. $L_1$ 거리 공식을 사용해서 절대치 계산을 통해 matrix 좌표의 합이 가장 작은 이미지가 가까운 것이라고 판단합니다.

따라서 학습 시에는 단순히 매핑을 하는 단계이므로 time complexity가 $O(1)$이 되고 예측 시에는 image 개수만큼 반복하므로 $O(N)$이 됩니다. 하지만 이는 시간 복잡도 측면에서 좋은 성능은 아닙니다. 그렇기 때문에 image classifier로 K Nearest Neighbors는 잘 사용되지 않고 이 알고리즘의 핵심인 distance metrics는 생각보다 의미가 있지 않습니다. 그리고 차원이 커질수록 distance를 유지하기 위해서는 $1D : 4p, 2D: 4^2p, 3D: 4^3p$와 같이 exponential 하게 데이터 포인트가 증가하는 차원의 저주(curse of dimensionality)가 발생합니다.

---

### Parametric Approach

Nearest neighbors의 학습 과정에 변화를 주었습니다. 학습 샘플들을 memorize하는 것 대신에 입력 이미지를 레이블 스코어 $y$에 매핑하는 function $f(x)$를 만듭니다.

<img src="https://miro.medium.com/v2/resize:fit:1400/1*owd5v7vhWqnVHbLkaI84tA.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

그 중에 단순한 linear classifier는 각 픽셀값에 가중합을 곱하여 선형적으로 표현하기 때문에 $f(x,W) = W_{1,1}x_{1,1} + W_{1,2}x_{1,2} + \dots + W_{M,N}x_{M,N}$이 됩니다. 예를 들어 입력 이미지가 $32*32*3=3072$ 해상도이며 레이블 10개와 정답 레이블 1개가 있을 때 $f(x,W) \rightarrow 10 \times 1$, $Wx \rightarrow (10 \times 3072) \times (3072 \times 1) = 10 \times 1$가 될 수 있습니다.

이제 전체 수식은 $f(x, W) = Wx + b$로 bias는 좌항과 우항이 동일해야 하므로 역시 $10 \times 1$입니다. bias는 입력 데이터와 상호작용하지 않으면서 기존 데이터 자체의 분포를 모델링하기 위해 추가하는 항입니다. linear classifier에서 $W$는 decision boundary를 회전시키는 역할, $b$는 상하로 움직이게 하는 역할이라고 해석할 수 있습니다. 이는 $f(x,W) = Wx + b$ 식에서 $W$가 입력 $x$와 곱해지면서 선형 변환을 일으키고, 이 변환이 결정 경계면의 기울기를 결정하기 때문입니다. 반면 $b$는 입력과 독립적으로 더해지는 상수항으로, 변환된 공간에서 결정 경계면을 평행이동시키는 역할을 합니다.

위 식을 matrix로 변환하면 $f(x,W) = \begin{bmatrix} W & b\end{bmatrix} \begin{bmatrix} x \\ 1\end{bmatrix} = W'x'$가 전개되며 이는 $10 \times (3072+1), (3072+1) \times 1$ 차원으로 변경되게 됩니다.

학습 과정에서는 모든 데이터를 memorize하지 않고 가중치 $W$만 필요하므로 공간 효율성이 좋습니다. 그리고 matrix 변환식에 의하면 $W'x' \rightarrow 10 \times 1$로 Nearest neighbors 알고리즘보다 연산이 빠릅니다.

---

### Softmax classifier

sigmoid function을 이용하여 클래스가 2개가 있다고 가정할 때, score difference $S = S_1 - S_2$라고 정의할 수 있고 $P(y=c_1|x) = \frac{1}{1+e^{-(s_1-s_2)}} = \frac{e^{s_1}}{e^{s_1} + e^{s_2}}$, $P(y=c_2|x) = \frac{1}{1+e^{-(s_2-s_1)}} = \frac{e^{s_2}}{e^{s_2} + e^{s_1}}$의 확률값이 구해집니다. 따라서 일반화를 할 수 있게 되어 $P(y=c_i|x) = \frac{e^{s_i}}{\sum_{j} e^{s_j}}$가 softmax function 수식이 됩니다.

---

### Cross entropy

<img src="https://framerusercontent.com/images/KyrSn9Wx4SQg991VWauPrqjmw.webp?width=1300&height=752" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

일반적인 cross entropy는 $L = -\frac{1}{N} \sum_{i=1}^{N} \sum_{k=1}^{K} y_{ik} log(\hat{y}_{ik})$이며 binary상황에서는 $L = -\frac{1}{N} \sum_{i=1}^{N} [y_i log(\hat{y}_i) + (1-y_i) log(1-\hat{y}_i)]$로 표현합니다. $i$번째 이미지가 $k$번째 클래스에 속하는지에 따라 $y_{ik}$가 1 또는 0이 됩니다. 따라서 위 식을 간소화하면 정답인 클래스만 1로 남고 0은 사라지므로 $L = -\frac{1}{N} \sum_{i=1}^{N} log(\hat{y}_{i}T_i)$로 볼 수 있습니다. 여기서 $T_i$는 $i$번째 이미지의 정답 클래스를 의미합니다. 이에 cross entropy의 정의를 정답 클래스를 예측한 확률의 음의 로그값이라고 판단하여도 됩니다. 그래프를 보면 음의 로그는 1일 때 0에 수렴하는데 이는 정답 클래스를 맞추는 경우나 근접하는 경우 loss는 줄어드는 것을 증명한 것입니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/RtnqcndNLj4?si=TrRInVyFNKPPUhwx)
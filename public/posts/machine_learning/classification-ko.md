---
title: 'Classification'
date: '2022-07-15'
tags: ['Machine Learning', 'lecture']
---

### Classification

<img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXdEee4iKUeq_HmcuU79jWcMxMd0p9G_EejMTT7r6zU0aLg0FtunGvxUh7emGC1YuaFNvFF6H6fZBjqCmv_4jLxYzFZkzzNlmLAKWtcnwvKNvLYQJhw9E0qc1h0HNufo7dHnSHMZtHRTe1RavB-IIMJt7gNx?key=IbqRKL5SySsVffR6LRm6IA" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

레이블이 연속적(continuous)이면 regression에 해당하고 범주형(categorical)이거나 이산적(discrete)이면 classification에 해당합니다. classification에서는 각 범주에 속할 확률에 대하여 논합니다.

<img src="https://i.sstatic.net/OOSHJ.jpg" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

이산형 변수 예를 들어 1, 2, 3과 같은 레이블이 있고 이를 classification이 아닌 regression으로 함수를 최적화하려고 한다면 위의 이미지와 같은 상황이 나타날 것입니다. 이러한 그래프는 선형회귀로 나타내기에 부적절한데 그 이유는 각 레이블이 이산형일 때라고 하여도 연속적일 때처럼 수치 상 1씩(기본값) 동일한 차이를 갖도록 설정을 하게 되는 문제가 있습니다.

#### Logistic Regression

문제 상황을 다음과 같이 제시하겠습니다.

-입력값이 충분히 크면 1

-입력값이 충분히 작으면 0

-입력값이 0에 가깝지만 충분히 작지 않다면 0.5

<img src="https://sebastianraschka.com/images/faq/logistic_regression_linear/1.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

logistic regression은 확률 구간 $[0,1]$ 사이에서 레이블 1과 0을 갖는 입력값의 확률은 아래와 같이 표현할 수 있습니다.

$$
P(y=1|x) = \frac{1}{1+e^{-\beta^T x}}, \\
P(y=0|x) = \frac{1}{1+e^{\beta^T x}}
$$

이제 logistic regression에서 linear처럼 파라미터들이 존재하며 분모에 위치하다보니 예를 들어 하나의 변인이 양수 중 큰 값을 갖게 된다면 해당 변인에 의하여 확률은 1에 가까워지는 효과를 갖게 됩니다.

또, 최대 우도 추정(MLE)는 아래와 같이 계산합니다.

$$
L(\beta) = \prod_{i:y_i=1} P(y_i|x_i) \prod_{j:y_j=0} (1-P(y_j|x_j)), \\
l(\beta) = \sum log(P(y_i|x_i)) + \sum log(1-P(y_j|x_j)) \\
=\sum_{i=1}^{n} [y_i log P(y_i|x_i) + (1-y_i) log(1-P(y_j|x_j))] \\
=\sum_{i=1}^{n} [-y_i log (1+e^{-\beta^Tx_i}) - (1-y_i) log(1+e^{\beta^T x_i})]
$$

하지만 위 식을 미분하여 해를 구하는 것은 불가능하기 때문에 gradient descent와 같은 경사 하강 방법이 연구되어 왔습니다.

---

### Bayes Classifier

Risk는 예측된 로스이고 classifier 함수 $f : x \rightarrow y$에 대해서 $R(f) = E_{P(x,y)} [L(y,f(x))] = \sum_x \sum_y P(x,y) L(y,f(x))$로 계산할 수 있습니다. 이 과정에서 모든 x에 대한 확률 분포 기댓값인 $E_{P(x,y)}$를 사용하게 됩니다.

이 때 Bayes classifier는 분류기 $f^*$로 risk를 최소화하는 목적을 가지고 있습니다.

예를 들어 1과 -1이라는 레이블이 있을 때, $f^*$는 $\underset{\hat{y}} {argmin} \sum_y P(y|x=x)L(y,\hat{y})$로 판단하게 되고 $\text{sign} (log \frac{P(y=1|x=x)}{P(y=-1|x=x)})$와 같이 호의 개념으로 다가가서 식이 양수이면 1, 음수이면 -1을 갖도록 생각할 수도 있습니다. 내부에 log가 씌어져 있는데 이를 통해서 분모가 더 큰 상황이면 레이블 -1이 log가 음수가 되는 기준값인 1보다 작기 때문에 log값은 음수, 분자가 더 큰 상황이면 log값은 양수를 자연스럽게 갖게 되도록 유도가 됩니다.

베이지안 룰은 $P(y|x) = \frac{P(x|y)P(y)}{P(x)}$이며 이를 위의 식에 대입하면 $\text{sign} (log \frac{P(x=x|y=1)P(y=1)}{P(x=x|y=-1)P(y=-1)})$로 변경됩니다. 베이지안 룰에서 $P(y)$는 $x$가 주어지지 않았을 때 전체 $y$값을 예측한 사전 확률입니다. 그리고 $P(y|x)$는 사후 확률로 $x$를 알고 난 이후 확률값입니다. 마지막으로 $P(x|y)$는 우도로 $y$라는 실제 레이블이 주어졌을 때 $x$가 존재할 확률입니다.

---

### Discriminant analysis

위에서 bayes classifier를 전개한 식에서 $P(y=1), P(y=-1), P(x=x|y=1), P(x=x|y=-1)$에 대한 확률을 알 수 없기 때문에 다음과 같이 풀이합니다.

모르는 확률은 가우시안 정규분포로 많이 가정하기 때문에 $\text{sign} (log \frac{N(\mu_1,\sigma_1) \cdot \alpha}{N(\mu_{-1}, \sigma_{-1}) \cdot (1-\alpha)})$로 생각하여도 무방합니다. 이 때 1차원에서 $N(\mu, \sigma^2) = \frac{1}{\sqrt{2\pi \sigma^2}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$이고, 2차원에서 $N(\mu_y, \sum_y)=(2\pi)^{-\frac{d}{2}}|\sum_y|^{-\frac{1}{2}}e^{-\frac{1}{2}(x-\mu_y)^T\sum_y(x-\mu_y)}$입니다. 가우시안 정규분포 곡선에서 양수쪽은 레이블이 1인 경우, 음수쪽은 레이블이 -1인 경우로 바이너리 상황에서 생각할 수 있습니다.

<img src="https://i.sstatic.net/wlIya.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

quadratic discriminant analysis(qda)는 바이너리 상황에서 두 분산이 동일하다는 가정을 하지 않았을 때 분류기가 2차식의 형태를 띄고 linear discriminant(lda)는 두 분산이 전체 분산 $(\hat{\sigma}^2)$과 동일하다는 가정 하에 선형성을 가집니다.

3차원 이상에서는 기준점이 $\frac{\mu_k}{\sigma^2}x - \frac{\mu_k^2}{2\sigma^2} + log \alpha_k$가 되어 이를 $\delta_k(x)$라고 부릅니다. 따라서 사후확률 $\hat{P}(Y=k|x=x)=\frac{e^{\hat{\delta_k}(x)}}{\sum_{l=1}^{k} e^{\hat{\delta_l}(x)}}$로 소프트맥스를 씌워 구합니다.

로지스틱 회귀 문제에서 레이블이 잘 분리가 되어 있다면 소프트맥스라는 함수가 0과 1을 구분지을 충분한 데이터 포인트가 경계에 분포하여야 하지만 그렇지 않게 되므로 불안정하게 될 수 있습니다. 이러한 문제를 해결하기 위해 discriminant analysis로 각 레이블을 분리하여 평균과 분산을 구함으로써 경계의 데이터를 신경쓰지 않아도 됩니다.

바이너리 상황에서는 LDA와 Logistic Regression의 log를 씌우는 수식의 공통점이 있습니다. 하지만 logistic regression은 사후확률이 선형성을 갖는 우도를 기반으로 한다고 가정하기 때문에 discriminative learning입니다. 반면 LDA는 각각의 확률을 추산하여 사후확률을 구하기 때문에 generative learning에 해당합니다.

---

### Evaluation

분류 문제에서 평가 방법은 TN, TP, FN, FP로 비율에 따라 해석하게 됩니다.

TP는 실제 True인 레이블을 True로 예측하는 경우, TN은 실제 False인 레이블을 False로 예측하는 경우, FP는 실제 False이지만 True로 잘못 예측하는 경우, FN은 실제 True이지만 False로 잘못 예측하는 경우에 해당합니다.

그리고 이 중 1종 오류는 실제가 True인데 잘못 예측하는 오류(=FN), 2종 오류는 실제가 False인데 잘못 예측하는 오류(=FP)를 말합니다.

이 비율에 따라서 false positive rate가 낮을수록 true positive rate이 높을수록 좋은 예측 모델이고 이 곡선은 ROC(receiver operating characteristic)이라고 합니다. 그리고 이 곡선 아래의 면적은 AUC(area under the curve)라고 부릅니다.

---

### Naive bayes

$$
P(x|y) = \prod_{j=1}^{d} P(x_j|y)
$$

실제는 각 변인들이 인과성이 있지만 우도인 $P(x|y)$가 $x$ 집합 내에서 모두 독립이라고 가정하고 사용합니다.

이 때 사후확률은 우도 $P(x|y)$와 사전확률 $P(y)$를 단순히 곱하여 계산합니다.

이 메서드를 사용할 때 어떤 상황에 대한 확률이 한 번도 존재하지 않을 zero frequency가 발생하면 나머지 상황의 확률이 0이 아니어도 0을 갖게 됩니다. 따라서 default probability로 $\epsilon$을 주어서 해결합니다. 그리고 각 확률을 곱하여 계산하다보면 0에 근접한 매우 작은 값이 생성되므로 로그를 취하여 계산합니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/AVm27kxxQx0?si=xAfBKHvSeWnch_fF)

[원본 경로 #2](https://youtu.be/pNDZZepjyzQ?si=7onQhUp_noTaeQoU)
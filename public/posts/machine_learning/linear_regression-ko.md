---
title: 'Linear Regression'
date: '2022-07-12'
tags: ['Machine Learning', 'lecture']
---

### Linear Regression

선형 회귀란 간단한 지도학습 방법론 중 하나로, $y$에 대해서 각 $x$ 집합이 선형성을 띄고 있다고 가정하는 것입니다. 하지만 세상에는 모든 회귀 함수는 선형적이지 않습니다.

#### 1. Simple LR

$$
y=\beta_0+\beta_1 x + \epsilon
$$

위 식은 가장 단순한 선형회귀 식으로 $\beta_0$, $\beta_1$은 모두 알려지지 않은 요소로서 coefficients 또는 parameters라고 부릅니다.

또한 위 식을 추정식으로 변경하면 아래와 같이 $\epsilon$이 사라지게 됩니다.

$$
\hat{y} = \hat{\beta_0} + \hat{\beta_1} x
$$

이제 잘 추정할 수 있도록 잔차제곱합(Residual Sum of Squares)을 $\text{RSS} = e_1^2 + e_2^2 + \dots + e_n^2 = (y_1 - (\hat{\beta_0} + \hat{\beta_1} x_1))^2 + \dots + (y_n - (\hat{\beta_0} + \hat{\beta_1} x_n))^2$와 같이 정의합니다.

$$
\beta_1 = \frac{\sum_{i=1}^{n} (x_i-\bar{x})(y_i - \bar{y})}{\sum_{i=1}^{n} (x_i-\bar{x})^2}, \\
\beta_0 = \bar{y} - \hat{\beta_1} \bar{x}
$$

위 식에서 $\bar{x}$는 모든 $x$ 집합의 평균, $\bar{y}$도 모든 $y$ 집합의 평균입니다. 이 parameters를 구하는 방법은 아래에 정의하였습니다.

$$
\frac{\partial}{\partial \hat{\beta_0}} \sum_{i=1}^{n}(y_i-(\hat{\beta_0} + \hat{\beta_1} x_i))^2 \\
= -2 \sum_{i=1}^{n}(y_i-(\hat{\beta_0} + \hat{\beta_1} x_i)) = 0 \\ 
\Leftrightarrow \sum_i y_i - n \hat{\beta_0} - \hat{\beta_1} \sum_ix_i \\ 
\Leftrightarrow \beta_0 = \bar{y} - \hat{\beta_1} \bar{x}, \\
\frac{\partial}{\partial \hat{\beta_1}} \sum_{i=1}^{n}(y_i-(\hat{\beta_0} + \hat{\beta_1} x_i))^2 \\
= -2 \sum_{i=1}^{n}x_i(y_i-(\hat{\beta_0} + \hat{\beta_1} x_i)) = 0 \\
\Leftrightarrow \sum_{i=1}^{n}x_i(y_i-(\bar{y} - (\hat{\beta_1} \bar{x} - \hat{\beta_1} x_i))) \\
\Leftrightarrow \sum_{i=1}^{n}x_i(y_i-\bar{y}) - \sum_{i=1}^{n} \hat{\beta_1}x_i(x_i-\bar{x})
$$

#### 2. Assessing accuracy

Residual standard error(RSE)는 $\sqrt{\frac{RSS}{n-2}}$로 정답과 예측 사이 차이의 제곱 합을 루트를 씌워서 최소화하는 평가함수입니다. 그리고 Root mean squared error(RMSE)는 RSE와 약간 상이하지만 기본 개념은 같습니다. $\sqrt{\sum\frac{(\hat{y_i}-y_i)^2}{n}}$으로 계산하는데 분모가 $n-2$와 $n$으로 차이가 있는 이유는 바이어스가 0으로 수렴하기 위해서는 $n-2$가 되어야 하는 증명이 있기 때문입니다. 하지만 실제로는 $n$이 큰 값이 할당되기 때문에 크게 신경을 쓰지 않습니다.

추가로 $\text{R}^2$은 $\text{TSS} = \sum_{i=1}^{n} (y_i - \bar{y})^2$으로 전체 제곱합을 사용하여 $1-\frac{RSS}{TSS}$로 표현합니다.

---

### Maximum likelihood

#### 1. Least squares

회귀함수를 평가할 때 제곱 후 루트를 씌우는 이유를 조금 더 상세히 들어가보면 이를 최소제곱법이라고 하며 Least squares라고 부릅니다.

제곱을 하는 이유는 실제 값과 예측 값의 차이를 사용하기 때문에 양수만이 아닌 음수가 나오는 경우가 발생합니다. 따라서 이를 방지하기 위해 제곱을 씌우면 양수나 음수에 상관없이 같은 오차 방향을 갖게 합니다. 하지만 꼭 제곱만이 그것을 가능하게 하지는 않습니다. 예를 들면 절댓값을 사용하거나 실제 값과 예측값을 분수로 표현하여 1에 가깝게 나타내거나 하여도 가능합니다.

#### 2. I.I.D

그 이유를 더 명확히 하기 위해 I.I.D(Independent and Identically Distributed)를 설명하겠습니다. 말 그대로 독립분포 시행으로 이전 시행과 이후 시행에 영향을 받거나 주지 않으며 현재 시행을 진행하는 상황을 의미하며 각 시행에서 어떤 결과가 나올 확률은 변함 없이 동일하여야 하는 제약이 있습니다.

이제 위 제약을 따르는 확률 분포 $P_{\theta} (x)$와 $n$개의 샘플 집합인 $x_1, x_2, \dots, x_n$가 있다고 할 때, likelihood는 관측된 데이터 집합으로 $n$번의 샘플링을 했을 때 어떤 관측값이 나올 확률이라고 정의가 가능합니다. 따라서 아래와 같이 수식으로 나타낼 수 있습니다.

$$
L(\theta; x_1, \dots, x_n) \\ 
= P_{\theta}(x_1) \times \dots \times P_{\theta}(x_n) \\ 
= \prod_{i=1}^{n} P_{\theta}(x_i)
$$

그리고 변형으로는 log-likelihood도 있는데 이는 위의 수식에 로그를 붙인 것으로 $\sum_{i=1}^{n} log P_{\theta} (x_i)$로 표현합니다. 이는 likelihood가 각 확률값을 계속 곱하는 것이므로 더 0에 가까워지는 문제를 $\sum$을 통해 합산으로 변형하여 값을 보완하는 역할을 합니다.

#### 3. MLE

결과적으로 최대가 되는 $\theta$를 찾는 과정에서 로그의 유무는 그 값인 $x$를 찾는데 동일하므로 문제가 되지 않습니다. 구하는 수식은 아래와 같습니다.

$$
\hat{\theta}(x_1, \dots, x_n) = \text{argmax}_{\theta} L(\theta;x_1, \dots, x_n) \\
= \text{argmax}_{\theta} l(\theta;x_1, \dots, x_n) \\
= \text{argmax}_{\theta} \sum_{i=1}^{n} log P_{\theta}(x)
$$

이 때 최대가 되는 $\theta$를 찾기 위해 두 과정을 거칩니다. 1)미분하여 0이 되는지 $\nabla l(\theta) = 0$ 또는 $\frac{\partial l(\theta)}{\partial \theta_j} = 0$, 2)이계도 함수가 음수가 되는지 $[H(\theta)]_{ij} = \frac{\partial^2 l(\theta)}{\partial \theta_i \partial \theta_j}$를 찾습니다.

MLE의 예시로 베르누이 시행이 있고 이는 몇 번의 시행을 할 동안 확률값 $x$가 어떤 시행에 해당하고 나머지 시행에 확률값 $1-x$를 할당할 수 있으므로 $P_{\theta} (x) = log \theta^x(1-\theta)^{1-x}$로 표현합니다. 이를 응용하여 Maximum likelihood에 대해서 $\text{argmax}_{\theta} (log \theta\sum_{i=1}^{n}x_i + log(1-\theta)\sum_{i=1}^{n}(1-x_i))$로 전개하는 것이 가능합니다.

다음으로는 가우시안 분포도 있는데 이는 $P_{\theta} (x) = \frac{1}{\sigma \sqrt{2\pi}} e^{-\frac{1}{2}(\frac{x-\mu}{\sigma})^2}$로 정규분포에서 $\theta = (\mu, \sigma)$라는 알려지지 않은 두 파라미터가 있을 때 사용합니다. 이를 MLE 구하는 공식에 대입하여 $\mu$, $\sigma$로 각각 미분하여 최대가 되는 값을 찾아야 합니다. $l(\theta) = \sum_{i=1}^{n} log \frac{1}{\sigma \sqrt{2\pi}} - \sum_{i=1}^{n} \frac{1}{2} (\frac{x_i - \mu}{\sigma})^2$에서 우선 전자의 경우 $\frac{\partial l(\theta)}{\partial \mu} = \sum_{i=1}^{n} (\frac{x_i-\mu}{\sigma}) = 0$이 되는 파라미터 값은 $\sum_{i=1}^{n} x_i = \sum_{i=1}^{n} \mu$일 때, 즉 $\mu = \frac{1}{n} \sum_{i=1}^{n} x_i$입니다. 후자의 경우는 $\frac{\partial l(\theta)}{\partial \sigma} = -\frac{n}{\sigma} - \frac{1}{2}(-2)\sigma^{-3}\sum_{i=1}^{n} (x_i-\mu)^2 = 0$이 되는 파라미터 값이 $\sigma^2 = \frac{1}{n} \sum_{i=1}^{n} (x_i - \mu)^2$입니다.

#### 4. Re-write LR

이제 행렬식으로 Linear regression을 표현할 수 있습니다.

$$
y= \begin{bmatrix} 1 & x_{11} & \cdots & x_{1p} \\ 1 & x_{21} & \cdots & x_{2p} \\ \vdots & \vdots & \ddots & \vdots \\ 1 & x_{n1} & \cdots & x_{np}\end{bmatrix} \begin{bmatrix} \beta_0 \\ \vdots \\ \beta_p\end{bmatrix} + \epsilon
$$

---

### LR with categorical features

categorical 문제로 넘어와서 예를 들어 신용 카드의 금액을 $y$로 정의하고 집을 소유하는지 여부를 $x$로 정의를 하고 이를 $y_i = \beta_0 + \beta_1 x_i + \epsilon_i$라는 선형회귀 식에서 만약 $x_i$가 1이면 소유하고 있음을 의미하므로 그대로 식이 유지되어 $y_i = \beta_0 + \beta_1 + \epsilon_i$가 되고 $x_i$가 0이면 소유하지 않는 것이므로 $y_i = \beta_0 + \epsilon_i$로 식이 생각될 수 있습니다.

#### 1. One hot Encoding

이제 categorical features가 한 열에 모두 혼재되어 있을 때 사용하는 방법 중 대표적 예시로 one-hot encoding은 열을 더 넓혀서 예를 들어 팀이라는 컬럼에 팀A, 팀B, 팀C 등이 있다면 그 개수만큼 컬럼을 생성하고 이산 변수 1, 0을 넣도록 합니다.

#### 2. Modeling interactions

이번에는 기존에 변인들은 i.i.d에 따라서 인과관계(interactions)가 없고 선형성을 유지하는 것에 대해 생각하였지만 인과관계가 있고 비선형성을 가진다고 가정을 바꾸게 된다면 예를 들어 마케팅에서 TV와 라디오에 각각 광고를 독립적으로 하는 것이 아니라 영향을 주어 동일한 광고를 보게 되는 경우가 이에 해당합니다. 이 것을 진행하면 선형성을 갖는 조건은 깨지지만 마케팅 측면에서는 이보다 더 큰 장점인 시너지 효과를 얻을 수 있다고 판단할 수 있습니다. 모델로 나타내면 아래와 같습니다.

$$
y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \beta_3 x_1x_2 + \epsilon
$$

인과관계 항을 추가할 때 주의할 점은 해당 항의 p-value가 낮더라도 단독인 행은 그렇지 않을 수 있고 두 개 이상이라면 부분집합에 해당하는 항들도 모두 있어야 합니다.

#### 3. Feature selection

least square는 $\hat{\beta} = [\hat{\beta_0}, \dots, \hat{\beta_p}]^T = (X^TX)^{-1} X^Ty$로 역행렬이 존재하지 않는 경우 계산할 수 없게 됩니다. 역행렬이 존재하지 않는 상황은 각 변인이 주는 정보가 독립적이지 않을 경우 즉 겹치는 정보가 있는 경우라고 할 수 있습니다.

따라서 이런 문제를 방지하는 방법 중 하나인 feature selection을 살펴보면 가능한 모든 집합 중에서 몇 가지의 중요한 변인을 선택하여 학습을 진행하는 것입니다. 하지만 이 방법에는 코스트가 높아질 수 있다는 단점이 있습니다. 예를 들어 $n=40$일 때 이 변인을 하나씩 선택하는 데에는 $2^p$만큼 소모되는 것입니다.

스텝와이즈 선택법은 처음에 아무 변인을 선택하지 않고 총 $n$개의 변인에 대해서 다음 변인을 무엇을 추가하는 것이 좋은지 판단하여 베스트가 되는 경우 선택합니다.

마지막으로 스테이지와이즈 선택법은 기존에 선택하여 fit한 변인은 제외하고 새로 선택하는 변인만 fit하는 방법입니다. 다만 한 번 선택된 변인도 다시 선택할 수 있게 반복문이 형성이 됩니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/JxA8pBN-fOs?si=aqYabc2nH25IfXKH)

[원본 경로 #2](https://youtu.be/awNk9DtxPjw?si=wPmGPKw4bVf4eRP1)
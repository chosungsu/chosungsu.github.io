---
title: 'Support vector machines'
date: '2022-07-29'
tags: ['Machine Learning', 'lecture']
---

### Preliminary

<img src="https://3.bp.blogspot.com/-WRljZgqt6mA/WtmZkQMgy4I/AAAAAAAAB2Q/GMR7N3TzR3gvkqh1VuYBIsf931fXuhr1ACLcBGAs/s1600/Hyperplane.jpg" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

binary한 상황에서 가장 심플하게 데이터 포인트를 구분하는 방법은 hyperplane을 그리는 것입니다. 이 때 hyperplane은 $p$차원의 공간을 나눌 때 $p-1$차원으로 그려집니다.

$$
\beta_0 + \beta_1 x_1 + \dots + \beta_p x_p = 0
$$

일반적인 수식은 위와 같고 $\beta_i$는 normal vector(법선 벡터)라고 합니다. 따라서 hyperplane에 대해서 수직을 갖습니다. 법선 벡터가 향하는 방향은 양수, 반대는 음수를 갖습니다.

hyperplane을 구분하는 방법은 두 개의 클래스에서 가장 큰 gap 또는 margin을 갖도록 하는 것입니다. 따라서 목적식은 $\underset{\beta_0, \dots, \beta_p}{\text{maximize}} M$이며 제약조건들은 $\sum_{j=1}^{p} \beta_j^2 = 1$, $y_i(\beta_0 + \beta_1 x_{i1} + \dots + \beta_p x_{ip}) \ge M$을 설정합니다.

---

### Support vector machines

#### 1. Binary classification

$y \in \{+1, -1\}$이라는 바이너리 환경에서 margin based 분류기는 법선 벡터 기준으로 $\beta$와 $x$ 사이 각도가 90도보다 작다면 $\beta^Tx > 0 \rightarrow \hat{y} = +1$이 성립하고 90도보다 크다면 $\beta^Tx < 0 \rightarrow \hat{y} = -1$이 성립합니다. 만약 90도라면 결정할 수 없습니다.

예를 들어 $\beta$, $x$가 임의로 존재하고 decision boundary와 같은 평면에 $x_{||}$가 있고 $\beta$와 같은 평면에 $x_{\bot}$이 있으면 정의에 의해서 $x = x_{\bot} + x_{||}$가 구해질 수 있습니다. 양변에 $\beta^T$를 곱하면 $\beta^T x = \beta^T x_{\bot} + \beta^T x_{||}$가 되고 $\beta^T x_{||} = 0$입니다. 이 식을 decision boundary로부터 $x$까지의 거리인 $r$을 사용하여 다시 전개하면 $\beta^T x = \beta^T \cdot (\frac{r}{|\beta|} \cdot \beta)=\beta^T \cdot (\frac{r}{|\beta|} \cdot |\beta|)cos0=r|\beta|$가 되어 즉 거리인 $r=\frac{\beta^T x}{|\beta|}$임을 구할 수 있습니다.

이제 이 법선 벡터로부터 가장 짧은 거리(margin)을 가장 멀게 만들어주는 decision boundary를 찾는 것이 목적식이 됩니다.

#### 2. Primal problem

위에서 내적이 양수일 때가 이 문제의 핵심이므로 $y_i \beta^T x_i \ge 1$을 활용하면 목적식에서 일부분을 교환할 수 있게 됩니다. 따라서 남는 목적식은 $\underset{\beta}{\text{argmax}} \frac{1}{|\beta|} = \underset{\beta}{\text{argmin}} {|\beta|}$입니다. 미분의 편의성을 위하여 $|\beta| = \frac{1}{2} |\beta|^2$로 생각하여도 무방합니다.

#### 3. Lagrange Multiplier

부등호 조건을 만족시키면서 local optimum을 찾는 함수입니다. optimization을 하고자 하는 식이 $f(x)$이고 각 제약조건 $g(x) = 0$을 사용하여 $L(x,\lambda) = f(x) + \lambda \cdot g(x)$로 정의를 합니다.

이후 $x$, $\lambda$라는 파라미터로 각각 미분한 결과가 0이 되는 경우의 해를 찾습니다.

위에 남은 목적식을 대입하면 $L(x, \lambda) = \frac{1}{2} |\beta|^2 - \sum_{i=1}^n \lambda_i (y_i \beta^T x_i - 1)$와 같이 작성이 가능합니다. 이제 $\beta_j$에 대한 미분식은 $\frac{\partial L}{\partial \beta_j} = \beta_j - \sum_{i=1}^{n} \lambda_i y_i x_{i,j} = 0$으로 즉 $\beta = \sum_{i=1}^{n} \lambda_i y_i x_{i}$입니다. 이후 다시 $\beta$에 대입하여 내적하면 $L(x, \lambda) = -\frac{1}{2} <\sum_{i=1}^{n} \lambda_i y_i x_{i}, \sum_{i=1}^{n} \lambda_i y_i x_{i}> + \sum_{i=1}^{n} \lambda_i$로 변환됩니다.

따라서 마지막 분류기는 $\hat{y} = sign(\beta^T x) = sign(\sum_{i=1}^{n} \lambda_iy_ix_i^Tx)$로 주어집니다.

#### 4. Support vector machines

즉 svm은 boundary에서 가장 가까운 데이터 포인트들을 찾고 그 점들로부터 가장 멀리 위치한 decision boundary(=hyperplane)을 그리는 것이 목적입니다.

마지막 분류기에서 양수와 음수 방향의 고려를 한다면 $sign(\sum_{i \in S^+} \lambda_ix_i^Tx - \sum_{j \in S^-} \lambda_jx_j^Tx)$로 볼 수 있습니다.

하지만 svm 역시 대체로 linear한 경우에 fit한 경향이 있어서 noisy data에 강건하지 않습니다. 따라서 slack variables를 도입합니다. 여전히 maximum margin classifier를 학습시킬 것이지만 margin을 최대화함과 동시에 misclassification rate을 감소시키는 목적을 갖고 움직입니다.

slack variables인 $\xi_i$는 각 데이터 포인트에 대해서 제약조건인 $y_i\beta^Tx_i \ge 1$을 토대로 이 값이 1보다 크다면 $\xi_i = 0$으로 non-support vectors(=no violation)에 해당하고 support vector가 $0 < \xi_i < 1$이면 여전히 decision boundary 내부에 있으며 $1 \le \xi_i$이면 decision boundary 외부에 있음을 의미합니다. 이를 일반화하면 $\xi_i = max(0, 1-y_i\beta^Tx_i)$가 됩니다.

<img src="https://learnopencv.com/wp-content/uploads/2018/07/svm-parameter-c-example.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

$$
\underset{\beta} {\text{argmin}} (\frac{1}{2} |\beta|^2 + C \sum_{i=1}^n \xi_i)
$$

이제 목적식을 위와 같이 제약이 추가되어 나타낼 수 있습니다. 여기서 $C$값이 크면 misclassification rate가 감소되는데 집중하고 작아지면 margin을 더 최소화하는 방향으로 움직입니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/03W3sR__-mY?si=5yumhT816cd2LNrX)
---
title: 'Multivariate distributions'
date: '2023-05-05'
tags: ['Mathematical statistics', 'lecture']
---

### Distributions of two random variables

#### 확률 벡터와 결합 누적 분포 함수 (cdf)

표본 공간 $C$를 갖는 확률 실험에서, 각 요소 $c \in C$에 대해 유일한 순서쌍 $(X_1(c)=x_1, X_2(c)=x_2)$을 할당하는 두 확률 변수 $X_1$과 $X_2$가 있을 때, $(X_1, X_2)$를 확률 벡터라고 합니다. 이 확률 벡터의 공간 $D$는 순서쌍들의 집합입니다.

결합 누적 분포 함수에서 확률 벡터 $(X_1, X_2)$의 분포는 joint cdf에 의해 고유하게 정의됩니다.

$$
\begin{aligned}
& F_{X_1, X_2}(x_1, x_2) = P[X_1 \le x_1, X_2 \le x_2],\\
& \text{for all } (x_1, x_2) \in \mathbb{R}^2
\end{aligned}
$$

결합 확률 질량 함수에서 확률 벡터 $(X_1, X_2)$의 joint pmf는 다음과 같이 정의됩니다.

$$
\begin{aligned}
& p_{X_1, X_2}(x_1, x_2) = P[X_1 = x_1, X_2 = x_2], \\
& \text{for all } (x_1, x_2) \in D
\end{aligned}
$$

결합 확률 밀도 함수 joint pdf는 $F_{X_1, X_2}(x_1, x_2)$가 다음 적분으로 표현될 수 있을 때, 피적분 함수 $f_{X_1, X_2}(w_1, w_2)$를 결합 pdf라고 합니다.

$$
\begin{aligned}
& F_{X_1, X_2}(x_1, x_2) = \\
& \int_{-\infty}^{x_1} \int_{-\infty}^{x_2} f_{X_1, X_2}(w_1, w_2) \, dw_1 dw_2
\end{aligned}
$$

#### Marginal Distributions

$$
p_{X_1}(x_1) = \sum_{x_2 < \infty} p_{X_1, X_2}(x_1, x_2)
$$

이산형 주변 pmf는 $X_2$의 모든 가능한 값에 대해 합산하여 얻습니다. $X_1$의 주변 pmf는 행의 합계(margin)로, $X_2$의 주변 pmf는 열의 합계로 얻어집니다.

$$
f_{X_1}(x_1) = \int_{-\infty}^{\infty} f_{X_1, X_2}(x_1, x_2) \, dx_2
$$

연속형 주변 pdf는 적분하여 얻습니다.

예를 들어 연속형 확률 벡터 $(X,Y)$가 중심이 $(0,0)$인 단위 원 $x^2 + y^2 \le 1$위에 균일하게 분포되어 있다고 할 때 영역의 넓이는 $\pi$이고 joint pdf가 원 내부에서 $f(x, y) = \frac{1}{\pi}$이고, 그 외에서는 $0$입니다. 주변 pdf $f_X(x)$를 구하려면 $x$를 $[-1,1]$로 고정하고 $y$는 $-\sqrt{1 - x^2}$부터 $\sqrt{1 - x^2}$로 고정합니다.

$$
\begin{aligned}
& f_X(x) \\
&= \int_{-\sqrt{1-x^2}}^{\sqrt{1-x^2}} \frac{1}{\pi} \, dy \\
&= \frac{1}{\pi} [y]_{-\sqrt{1-x^2}}^{\sqrt{1-x^2}} \\
&= \frac{2}{\pi} \sqrt{1 - x^2}
\end{aligned}
$$

분포는 균일하지만 주변 분포는 $x=0$에서 최대값을 갖는 단봉형(unimodal) 분포를 갖습니다. 이는 $x=0$근처가 확률 질량이 많이 집중되어 있다고 말할 수 있습니다.

또 다른 예시로는 

$$
f(x_1, x_2) = \begin{cases} x_1 + x_2 & 0 < x_1,x_2 < 1 \\ 0 & \text{elsewhere} \end{cases}
$$

확률 벡터의 공간이 정사각형 내부일 때 우선 $X_1$의 주변 pdf는 $x_2$에 대해 적분하므로 $f_1(x_1) = \int_{0}^{1} (x_1 + x_2) \, dx_2 = \left[x_1 x_2 + \frac{x_2^2}{2}\right]_0^1 = x_1 + \frac{1}{2}$, $X_2$의 주변 pdf는 $x_1$에 대해 적분하므로 $f_2(x_2) = \int_{0}^{1} (x_1 + x_2) \, dx_1 = \left[\frac{x_1^2}{2} + x_1 x_2\right]_0^1 = \frac{1}{2} + x_2$를 만족할 것입니다. 이제 $P(X_1 + X_2 \le 1)$인 확률을 계산하려면 $(0,0), (1,0), (0,1)$ 삼각형 내부에서 적분해야 합니다.

$$
\begin{aligned} 
& P(X_1 + X_2 \le 1) \\
&= \int_{0}^{1} \left[ \int_{0}^{1-x_1} (x_1 + x_2) \, dx_2 \right] \, dx_1 \\
&= \int_{0}^{1} \left[ x_1(1 - x_1) + \frac{(1 - x_1)^2}{2} \right] \, dx_1 \\ 
&= \int_{0}^{1} \left[ x_1 - x_1^2 + \frac{1 - 2x_1 + x_1^2}{2} \right] \, dx_1 \\ 
&= \int_{0}^{1} \left[ \frac{1}{2} - \frac{1}{2} x_1^2 \right] \, dx_1 \\
&= \left[ \frac{1}{2} x_1 - \frac{1}{6} x_1^3 \right]_0^1 \\
&= \frac{1}{2} - \frac{1}{6} = \frac{1}{3} 
\end{aligned}
$$

---

### Bivariate Random variables

#### Discrete

두 이산형 확률 변수 $X_1$과 $X_2$의 $\text{joint pmf}$가 $p_{X_1, X_2}(x_1, x_2)$이고 지지 집합이 $S$라고 하겠습니다. 두 새로운 확률 변수 $Y_1$과 $Y_2$를 다음과 같이 정의합니다.

$$
y_1 = u_1(x_1, x_2) \quad \text{and} \quad y_2 = u_2(x_1, x_2)
$$

이 변환이 $S$를 $T$로 매핑하는 일대일 변환이라고 가정한다면 $x_1 = w_1(y_1, y_2)$, $x_2 = w_2(y_1, y_2)$를 역변환이 되어 새로운 확률 벡터 $(Y_1, Y_2)$의 결합 $\text{pmf}$는 다음과 같습니다.

$$
p_{Y_1, Y_2}(y_1, y_2) = \begin{cases} p_{X_1, X_2}[w_1(y_1, y_2), w_2(y_1, y_2)] \\ 0\end{cases}
$$

원래 변수 2개를 새로운 변수 2개로 대체하기 위해, 관심 없는 변수 하나($Y_2$)를 보조 변수로 도입하여 일대일 변환을 만들어야 합니다.

예를 들어 $X_1$과 $X_2$가 각각 $\mu_1$과 $\mu_2$를 갖는 포아송 분포를 따르는 경우에서 총 사례 수 $Y_1 = X_1 + X_2$의 분포를 찾아 보겠습니다. 보조 변수 $Y_2=X_2$를 선택하고 $y_1=x_1+x_2, y_2=x_2$가 transformation이고 inverse transformation은 $x_1=y_1-y_2, x_2=y_2$로 볼 수 있습니다.

$$
p_{Y_1, Y_2}(y_1, y_2) = \frac{\mu_1^{y_1-y_2} \mu_2^{y_2}}{(y_1-y_2)!y_2!}e^{-\mu_1}e^{-\mu_2}
$$

위 수식은 joint pmf이고 이제 $Y_1$의 주변 pmf를 구하려면 $y_2$에 대해 합산해야 합니다.

$$
\begin{aligned}
& p_{Y_1}(y_1) \\
&= \sum_{y_2=0}^{y_1} p_{Y_1, Y_2}(y_1, y_2) \\
&= \frac{(\mu_1 + \mu_2)^{y_1}}{y_1!} e^{-(\mu_1 + \mu_2)}
\end{aligned}
$$

#### Continuous

연속형 확률 변환에는 cdf, jacobian 기법이 사용됩니다.

우선 cdf 접근법을 예로 들어, $(X_1, X_2)$가 단위 정사각형 $0 \le x_1 \le 1, 0 \le x_2 \le 1$에서 균일분포, 즉 $f_{X_1, X_2}(x_1, x_2) = 1$일 때 $Z = X_1 + X_2$의 분포를 구해보겠습니다.

먼저 cdf $F_Z(z) = P(Z \le z) = P(X_1 + X_2 \le z)$를 계산합니다. $Z$가 가질 수 있는 값의 범위는 $0 \le z \le 2$입니다.

$0 \le z \le 1$일 때 도형은 $x_1 \ge 0, x_2 \ge 0, x_1 + x_2 \le z$이며 단위 정사각형 안에 있으므로, 실제 적분 영역은 $x_1$이 $0$에서 $z$까지 변하고, 각 $x_1$에 대해 $x_2$는 $0$에서 $z - x_1$까지 변합니다.

$$
\begin{aligned}
F_Z(z) 
&= \iint_{x_1 + x_2 \le z,~ 0 \le x_1, x_2 \le 1} f_{X_1,X_2}(x_1,x_2) dx_1 dx_2 \\
&= \int_{x_1=0}^{z} \int_{x_2=0}^{z-x_1} 1 ~dx_2~dx_1 \\
&= \int_{x_1=0}^{z} (z - x_1) dx_1 \\
&= \left[ z x_1 - \frac{1}{2} x_1^2 \right]_{x_1=0}^{z} \\
&= z^2 - \frac{1}{2}z^2 = \frac{1}{2}z^2
\end{aligned}
$$

$1 < z \le 2$일 때, 적분 영역이 변합니다. $x_1$이 $z-1$에서 $1$까지 변하고, 각 $x_1$에 대해 $x_2$는 $0$에서 $z-x_1$까지 변하지만 $x_2$가 $1$을 넘지 못하므로 상한은 $1$이 됩니다.

$$
\begin{aligned}
F_Z(z)
&= \int_{x_1=0}^{z-1} \int_{x_2=0}^{1} 1~dx_2~dx_1
 +  \int_{x_1=z-1}^{1} \int_{x_2=0}^{z-x_1} 1~dx_2~dx_1 \\
&= \int_{x_1=0}^{z-1} 1~dx_1 \cdot 1 + \int_{x_1=z-1}^{1} (z-x_1) dx_1 \\
&= (z-1) + \left[ z x_1 - \frac{1}{2} x_1^2 \right]_{x_1=z-1}^{1} \\
&= (z-1) + \Big( z \cdot 1 - \frac{1}{2} \cdot 1^2 \Big) - \Big( z(z-1) - \frac{1}{2}(z-1)^2 \Big) \\
&= (z-1) + (z - \frac{1}{2}) - (z^2-z - \frac{1}{2}(z^2 - 2z + 1)) \\
&= (z-1) + (z - \frac{1}{2}) - (z^2-z - \frac{1}{2}z^2 + z - \frac{1}{2}) \\
&= (z-1) + (z - \frac{1}{2}) - (z^2 - \frac{1}{2}z^2) \\
&= (2z - \frac{3}{2}) - \frac{1}{2}(z^2 - 1) \\
&= 2z - \frac{3}{2} - \frac{1}{2}z^2 + \frac{1}{2} \\
&= 2z - z^2 - 1
\end{aligned}
$$

따라서, $F_Z(z)$는 다음과 같이 구할 수 있습니다.

$$
F_Z(z) = 
\begin{cases}
0, & z < 0 \\
\frac{1}{2}z^2, & 0 \le z \le 1 \\
2z - z^2 - 1, & 1 < z \le 2 \\
1, & z > 2
\end{cases}
$$

이제 $F_Z(z)$를 $z$에 대해 미분하여 pdf를 구합니다.

$$
f_Z(z) = \frac{d}{dz} F_Z(z) =
\begin{cases}
z, & 0 \le z \le 1 \\
2 - 2z, & 1 < z \le 2 \\
0, & \text{elsewhere}
\end{cases}
$$

즉, $Z = X_1 + X_2$의 pdf는 삼각형 형태의 함수로 $0 \le z \le 2$에서 위와 같이 주어집니다.

다음으로는 jacobian으로 역변환의 편도함수로 구성된 행렬식을 사용합니다. $Y_1 = X_1+X_2$와 보조 변수 $Y_2=X_1-X_2$를 사용하여 $(Y_1, Y_2)$의 joint pdf를 찾아보겠습니다. inverse transformation에서 $x_1 = \frac{1}{2}(y_1+y_2), x_2 = \frac{1}{2}(y_1-y_2)$이 되고 jacobian 행렬로 표현하면 다음과 같습니다.

$$
J = \begin{vmatrix} 1/2 & 1/2 \\ 1/2 & -1/2\end{vmatrix} = -\frac{1}{2}
$$

위 jacobian값을 활용하여 $f_{X_1, X_2} = 1$이므로, $f_{Y_1, Y_2}(y_1, y_2) = 1 \cdot \left|-\frac{1}{2}\right| = \frac{1}{2}$이 pdf값이 됩니다.

---

### Conditional Distributions and Expectations

#### Discrete pmf

이산형 확률 변수 $X_1$과 $X_2$의 joint pmf가 $p_{X_1, X_2}(x_1, x_2)$, 주변 pmf가 $p_{X_1}(x_1)$일 때, $X_1 = x_1$이 주어졌을 때의 $X_2$의 조건부 pmf는 조건부 확률의 정의에 따라 다음과 같습니다.

$$
\begin{aligned}
&p_{X_2|X_1}(x_2|x_1) \\
&= P(X_2 = x_2|X_1 = x_1) \\
&= \frac{p_{X_1, X_2}(x_1, x_2)}{p_{X_1}(x_1)}
\end{aligned}
$$

이 함수는 고정된 $x_1$에 대해 $x_2$에 대한 pmf의 모든 속성을 만족합니다.

#### Continuous pdf

연속형 확률 변수 $X_1$과 $X_2$의 joint pdf가 $f_{X_1, X_2}(x_1, x_2)$, 주변 pdf가 $f_{X_1}(x_1)$일 때, $X_1 = x_1$이 주어졌을 때의 $X_2$의 조건부 pdf는 다음과 같습니다.

$$
f_{X_2|X_1}(x_2|x_1) = \frac{f_{X_1, X_2}(x_1, x_2)}{f_{X_1}(x_1)}
$$

마찬가지로, 이 함수는 고정된 $x_1$에 대해 $x_2$에 대한 pdf의 모든 속성을 만족합니다. pdf의 경우, $P(a < X_2 < b | X_1 = x_1) = \int_{a}^{b} f_{X_2|X_1}(x_2|x_1) \, dx_2$와 같이 조건부 확률을 계산합니다.

#### Iterated expectations theorem

조건부 평균 $E(X_2|X_1)$은 $X_1$의 함수이므로 그 자체가 확률 변수인데 $X_2$의 분산이 유한할 때 다음이 성립합니다.

이중 기댓값의 법칙은 

$$
E[E(X_2|X_1)] = E(X_2)
$$

$X_2$의 평균은 $X_1$에 대한 $X_2$의 조건부 평균과 같음을 말합니다. 그리고 조건부 평균의 분산은 주변 분산보다 작거나 같습니다. 따라서 확률 변수 $X_2$와 $E(X_2|X_1)$ 모두 $X_2$의 평균 $\mu_2$를 추정하는 데 사용할 수 있지만, $\text{Var}[E(X_2|X_1)] \le \text{Var}(X_2)$이므로 $E(X_2|X_1)$이 $X_2$ 자체보다 $\mu_2$에 대한 더 나은(분산이 작은) 추정량임을 시사합니다.

---

### Independent Random variables

joint pdf는 조건부 pdf와 주변 pdf의 곱으로 표현할 수 있습니다.

$$
f(x_1, x_2) = f_{X_2|X_1}(x_2|x_1) f_{X_1}(x_1)
$$

만약 $X_2$의 조건부 분포가 $X_1$의 값 $x_1$에 의존하지 않는다면, 즉 $f_{X_2|X_1}(x_2|x_1)$가 $x_1$에 무관해지기 때문에 $f_{X_2|X_1}(x_2|x_1) = f_{X_2}(x_2)$가 됩니다. 결과적으로, $f(x_1, x_2) = f_{X_1}(x_1) f_{X_2}(x_2)$가 성립합니다.

확률 변수 $X_1$과 $X_2$가 독립일 필요충분조건은, joint pdf에서 $p_{X_1, X_2}(x_1, x_2)$가 주변 pdf들 $p_{X_1}(x_1)$ 및 $p_{X_2}(x_2)$의 곱과 항등적으로(identically) 같을 때입니다.

인수분해 정리(factorization theorem)는 위에서처럼 독립의 필요충분조건에 따라서 

$$
f(x_1, x_2) \equiv g(x_1)h(x_2)
$$

이와 같이 $g(x_1)$가 $x_1 \in S_1$에서만 양수이고, $h(x_2)$가 $x_2 \in S_2$에서만 양수일 때, joint pdf가 양수인 지지 집합은 반드시 곱 공간 $S_1 \times S_2$여야 합니다.

$X_1$과 $X_2$가 독립이고 각 기댓값에 대해서도,

$$
E[u(X_1)v(X_2)] = E[u(X_1)]E[v(X_2)]
$$

곱의 성분으로 표현이 가능합니다.

$M(t_1, t_2, \dots, t_n) = E[e(t_1X_1 + \cdots + t_n X_n)]$가 존재한다고 가정할 때, 독립의 필요충분조건은 적률생성함수 mgf의 인수분해입니다.

$$
\begin{aligned}
& M(t_1, t_2, \dots, t_n) \\
&= \prod_{i=1}^n M(0, \dots, 0, t_i, 0, \dots, 0)
\end{aligned}
$$

또한 각 확률 변수가 독립인 iid를 만족하는 경우에는 

$$
M_T(t) = \prod_{i=1}^n M_i(k_i t)
$$

와 같이 정의됩니다.

---

### The correlation coefficient

만약 $X$와 $Y$가 종속적이라면 결합 분포의 매개변수 $\rho$를 사용해서 $X$와 $Y$ 사이의 선형성(linearity)을 측정합니다.

#### Covariance

$X$와 $Y$의 평균을 각각 $\mu_1$과 $\mu_2$로, 각각의 분산을 $\sigma_1^2$과 $\sigma_2^2$로 나타냅니다. $(X, Y)$의 공분산(covariance)은 $\text{cov}(X, Y)$로 표기되며 다음과 같은 기댓값으로 정의됩니다.

$$
\begin{aligned}
& \text{cov}(X, Y) \\
&= E[(X - \mu_1)(Y - \mu_2)] \\
&= E(XY)-\mu_1\mu_2
\end{aligned}
$$

이를 사용하여 상관계수(correlation coefficient)를 아래와 같이 정의합니다.

$$
\begin{aligned}
& \rho = \frac{E[(X - \mu_1)(Y - \mu_2)]}{\sigma_1\sigma_2} \\
&= \frac{\text{cov}(X, Y)}{\sigma_1\sigma_2}
\end{aligned}
$$

상관계수의 범위는 $-1 \le \rho \le 1$입니다. 이제 이 범위가 왜 항상 유효한지를 증명해 보겠습니다.

##### Coefficient

상관계수의 절대값이 1 이하임을 보이기 위해, 코시-슈바르츠 부등식을 사용합니다. 임의의 확률 변수 $U = X - \mu_1$와 $V = Y - \mu_2$를 생각하면, 각각 평균이 0이고 분산이 $\sigma_1^2$, $\sigma_2^2$입니다.

코시-슈바르츠 부등식에 의해

$$
[E(UV)]^2 \leq E(U^2) \cdot E(V^2)
$$

여기서 $E(UV) = \text{cov}(X, Y)$, $E(U^2) = \sigma_1^2$, $E(V^2) = \sigma_2^2$입니다. 따라서

$$
[\text{cov}(X, Y)]^2 \leq \sigma_1^2 \sigma_2^2
$$

양변을 $\sigma_1^2 \sigma_2^2$로 나누면

$$
\left| \frac{\text{cov}(X, Y)}{\sigma_1 \sigma_2} \right| \le 1
$$

즉,

$$
-1 \le \rho \le 1
$$

따라서 상관계수 $\rho$의 값은 항상 $-1$과 $1$ 사이에 존재함을 알 수 있습니다.

---

### Several Random variables

확률 변수 $X_i$가 각 원소 $c \in C$에 단 하나의 실수 $X_i(c) = x_i$를 할당한다고 설정하고 $(X_1, \dots, X_n)$을 $n$차원 확률 벡터라고 합니다. 이 확률 벡터의 공간은 순서화된 $n$쌍의 집합 $D = {(x_1, x_2, \dots, x_n) : x_1 = X_1(c), \dots, x_n = X_n(c), c \in C}$입니다. 더 나아가, $A$가 공간 $D$의 부분집합이라고 할 때, $P[(X_1, \dots, X_n) \in A] = P(C)$를 만족합니다.

$(X_1, \dots, X_n)^T$를 $n$차원 열 벡터 $\mathbf{X}$로, 확률 변수의 관측값 $(x_1, \dots, x_n)^T$를 $\mathbf{x}$로 표기합니다. 결합 누적 분포 함수(joint cdf)는 다음과 같이 정의됩니다.

$$
F_{\mathbf{X}}(\mathbf{x}) = P[X_1 \le x_1, \dots, X_n \le x_n]
$$

이산형과 연속형의 분포는 아래와 같습니다.

$$
F_{\mathbf{X}}(\mathbf{x}) = \sum_{w_1 \le x_1, \dots, w_n \le x_n} p(w_1, \dots, w_n) \\
F_{\mathbf{X}}(\mathbf{x}) = \int_{-\infty}^{x_1} \cdots \int_{-\infty}^{x_n} f(w_1, \dots, w_n) dw_n \cdots dw_1
$$

따라서 확률 변수 $X, Y, Z$의 pdf가 

$$
f(x, y, z) = \begin{cases} e^{-(x+y+z)} \\ 0\end{cases}
$$

와 같이 정의가 되어 있다면 분포함수는 

$$
\begin{aligned}
& F(x, y, z) = P(X \le x, Y \le y, Z \le z) \\
&= \int_{0}^{z} \int_{0}^{y} \int_{0}^{x} e^{-u-v-w} du dv dw \\
&= (1 - e^{-x})(1 - e^{-y})(1 - e^{-z})
\end{aligned}
$$

위 식처럼 증명이 됩니다.

#### Multivariate Variance-Covariance Matrix

$n$차원 확률 벡터 $\mathbf{X} = (X_1, \dots, X_n)^T$의 분산-공분산 행렬(variance-covariance matrix)은 다음과 같이 정의됩니다.

$$
\mathbf{\text{Cov}(\mathbf{X})} = E[(\mathbf{X} - \mathbf{\mu})(\mathbf{X} - \mathbf{\mu})^T] = [\sigma_{ij}]
$$

#### Transformation

$n$차원 공간 $S$의 부분 집합 $A$에 대해 다음과 같은 형태의 적분을 고려합니다.

$$
\int \cdots \int_A f(x_1, x_2, \dots, x_n) dx_1 dx_2 \cdots dx_n
$$

$n$개의 변환 함수가 아래와 같이 주어졌을 때 역함수가 정의되는 것은 다음과 같습니다.

$$
y_1 = u_1(x_1, \dots, x_n), \dots, y_n = u_n(x_1, \dots, x_n)
$$

$$
x_1 = w_1(y_1, \dots, y_n), \dots, x_n = w_n(y_1, \dots, y_n)
$$

이 변환이 $S$를 $y_1, \dots, y_n$ 공간의 영역 $T$로 매핑하는 일대일(one-to-one) 변환을 정의한다고 가정합니다. 역함수의 편도 함수가 연속이고, $n \times n$ 행렬식인 Jacobian $J$가 $T$에서 항등적으로 0이 아니라고 합니다.

$$
\begin{aligned}
& \int \cdots \int_A f(x_1, \dots, x_n) dx_1 \cdots dx_n \\
&= \int \cdots \int_B f[w_1(\mathbf{y}), \dots, w_n(\mathbf{y})] |J| dy_1 \cdots dy_n
\end{aligned}
$$

이 정리의 조건이 충족될 때, $X_1, \dots, X_n$의 joint pdf가 $f(x_1, \dots, x_n)$인 경우, $Y_i = u_i(X_1, \dots, X_n)$의 joint pdf $g(y_1, \dots, y_n)$는 다음과 같이 주어집니다.

$$
\mathbf{g(y_1, \dots, y_n) = f[w_1(\mathbf{y}), \dots, w_n(\mathbf{y})]|J|}
$$

변환 기법 외에도, 적률생성함수(MGF)는 확률 변수의 함수 $Y = g(X_1, \dots, X_n)$의 분포를 찾는 데 유용합니다.

$$
\begin{aligned}
&E[e^{tY}] \\
&= \int_{-\infty}^{\infty} \cdots \int_{-\infty}^{\infty} e^{t g(x_1, \dots, x_n)} f(x_1, \dots, x_n) dx_1 \cdots dx_n
\end{aligned}
$$

---

### Linear Combinations

$\mathbf{X} = (X_1, \dots, X_n)^T$를 확률 벡터라고 하며 이 변수들의 선형 결합을 고려한다면 일반적으로 다음과 같이 나타낼 수 있습니다.

$$
T = \sum_{i=1}^n a_i X_i
$$

여기서 $a_1, \dots, a_n$은 지정된 상수입니다. $T$의 평균은 $E(X_i) = \mu_i$라고 가정하면 기댓값의 선형성에 의해 즉시 도출됩니다.

$$
\mathbf{E(T) = \sum_{i=1}^n a_i \mu_i}
$$

$T$의 분산을 구하기 위해, 먼저 공분산에 대한 일반적인 결과를 기술합니다. $W$가 확률 변수 $Y_1, \dots, Y_m$ 및 지정된 상수 $b_1, \dots, b_m$에 대해 $W = \sum_{j=1}^m b_j Y_j$로 주어지는 또 다른 선형 결합이라고 합시다. $E[X_i^2] < \infty$ 및 $E[Y_j^2] < \infty$일 때,

$$
\mathbf{\text{Cov}(T, W) = \sum_{i=1}^n \sum_{j=1}^m a_i b_j \text{Cov}(X_i, Y_j)}
$$

공분산의 정의와 기댓값의 선형성을 사용하여 $\text{Cov}(T, W) = E[(T - E(T))(W - E(W))] = \sum_{i=1}^n \sum_{j=1}^m a_i b_j E[(X_i - E(X_i))(Y_j - E(Y_j))]$로 전개됩니다. 아래에는 $T$의 분산을 얻기 위해 $W \rightarrow T$로 대체하고 따름 정리를 사용하여 

$$
\begin{aligned}
& \text{Var}(T) \\
&= \text{Cov}(T, T) \\
&= \sum_{i=1}^n a_i^2 \text{Var}(X_i) + 2 \sum_{i < j} a_i a_j \text{Cov}(X_i, X_j)
\end{aligned}
$$

위와 같이 작성됩니다.

---

### 참고 자료

[원본 경로 #1](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)

---
title: 'Multivariate distributions'
date: '2023-05-05'
tags: ['Mathematical statistics', 'lecture']
---

### distributions of two random variables

$(X_1, X_2)$가 $X_1(c) = x_1, X_2(c) = x_2$를 만족하는 random variables일 때 range인 $D = \{(x_1, x_2) : x_1 = X_1(c), x_2 = X_2(c), c \in C\}$를 갖습니다. $X = (X_1, X_2)^T$로 정의하고 X의 누적분포함수 cdf는 $F_{x_1, x_2} (x_1, x_2) = P(X_1 ≤ x_1, X_2 ≤ x_2)$이고 사각형 내부의 cdf를 간단히 하면 $P(a_1 < X_1 ≤ b_1, a_2 < X_2 ≤ b_2) = F_{x_1, x_2} (b_1, b_2) - F_{x_1, x_2}(a_1, b_2) - F_{x_1, x_2} (b_1, a_2) - F_{x_1, x_2}(a_1, a_2)$로 표현 가능합니다. 이 때의 discrete X pmf는 $P_{x_1, x_2}(x_1, x_2) = P(X_1 = x_1, X_2 = x_2)$인 것입니다. continuous X pmf는 $F_{x_1, x_2}(x_1, x_2) = \int_{-\infty}^{x_2}\int_{-\infty}^{x_1} f_{x_1, x_2}(w_1, w_2)\,dw_1dw_2$가 됩니다.

위에서 cdf $F_{x_1, x_2} (x_1, x_2) = P(X_1 ≤ x_1, X_2 ≤ x_2)$를 보면 $x_2$가 무한대인 $\lim_{x_2 \rightarrow \infty} F_{x_1, x_2} (x_1, x_2)$에 대해서 $X_1$의 marginal cdf $F_{x_1} (x_1)$이라고 할 수 있고 pmf인 경우도 $\sum_{x_2} p_{x_1, x_2}(x_1, x_2)$에 대해서 $X_1$의 marginal pmf $p_{x_1} (x_1)$이라고 할 수 있습니다.

예를 들어 $f(x_1, x_2) = x_1 + x_2, 0 < x_1 < 1, 0 < x_2 < 1$이 있을 때 $P(X_1 ≤ \frac{1}{2})$를 구해보면 $f_{x_1}(x_1) = \int f(x_1, x_2) \,dx_2 = \int_{0}^{1} (x_1 + x_2) \,dx_2 = [x_1x_2 + \frac{1}{2} x_2^2]_0^1 = x_1 + \frac{1}{2}$가 되어 $P(X_1 ≤ \frac{1}{2}) = \int_{0}^{\frac{1}{2}} (x_1 + \frac{1}{2}) \,dx_1 = \frac{3}{8}$이 됩니다.

---

### transformations : bivariate R.V’s

$Y = g(X_1, X_2)$의 분포를 알고자 할 때 $X_1, X_2$의 pdf를 알아야 합니다.

우선 discrete case에서 joint pmf가 $P(x_1, x_2)$일 때 $y_1 = u_1(x_1, x_2), y_2 = u_2(x_1, x_2)$를 구하는 방법은 1대 1 대응이 필요합니다. 따라서 inverse function을 $x_1 = w_1(y_1, y_2), x_2 = w_2(y_1, y_2)$로 정해서 joint pmf of $y_1, y_2$를 계산하면 $p_{y_1, y_2}(y_1, y_2) = p_{x_1, x_2}(w_1(y_1, y_2), w_2(y_1, y_2))$ 형태가 됩니다.

continuous case에서는 두 가지 방법이 존재합니다. 전자는 cdf를 이용하는 것과 transformation을 이용하는 것입니다. 우선 전자의 경우 cdf가 주어져 있을 때 $F_{y_1}(y_1) = P(u_1(x_1, x_2) ≤y_1)$ 를 진행하고 두번째로 $f_{Y_1} (y_1) = \frac{\partial}{\partial y_1} F_{y_1}(y_1)$을 진행합니다. 후자의 경우는 $Y_2 = u_2(X_1, X_2)$를 1대 1 대응을 합니다. 이때 discrete case에서 나왔던 inverse function을 사용하여 pdf에 대입하면 $f_{y_1, y_2}(y_1, y_2) = f_{x_1, x_2}(w_1(y_1, y_2), w_2(y_1, y_2)) * |J|$  와 같이 표현이 됩니다. 여기서 J(야코비안 행렬)은 $\begin{vmatrix} \frac{d_{x_1}}{d_{y_1}} & \frac{d_{x_1}}{d_{y_2}} \\ \frac{d_{x_2}}{d_{y_1}} & \frac{d_{x_2}}{d_{y_2}} \end{vmatrix}$로 나타낼 수 있습니다.

예를 들어 $f_{x_1, x_2} (x_1, x_2) = I (0 < x_1, x_2 < 1)$에서 $Y_1 = X_1 + X_2$의 pdf를 구하면 cdf를 이용하는 버전의 풀이는 $F_{Y_1}(y_1) = P(Y_1 ≤ y_1) = P(X_1 + X_2 ≤ y_1)$이고 범위를 $y_1 < 0, 0 ≤ y_1 < 1, 1 ≤ y_1 < 2, y_1 ≥ 2$로 나누면 $\begin{cases} 0 & y_1 < 0 \\ \int_{0}^{y_1}\int_{0}^{y_1 - x_1} \,dx_2dx_1 & 0 ≤ y_1 < 1 \\ 1 - \int_{y_1-1}^{1}\int_{y_1-x_1}^{1} \,dx_2dx_1 & 1 ≤ y_1 < 2 \\ 1 & y_1 ≥ 2 \end{cases}$가 구해집니다. 야코비언을 사용하는 풀이는 $y_1 = x_1 + x_2, y_2 = x_2, x_1 = y_1 - y_2, x_2 = y_2$로 정의하고 $S_x = \{0 < x_1 < 1, 0 < x_2 < 1\}, S_y = \{0 < y_2 < 1, y_2 < y_1 < 1 + y_2\}$로 범위가 정립됩니다. $f_{Y_1}(y) = \int f_{Y_1, Y_2} (y_1, y_2) \,dy_2 = \begin{cases} \int_{0}^{y_1} \,dy_2 = y_1 & 0 < y_1 < 1 \\ \int_{y_1-1}^{1} \,dy_2 & 1≤ y_1 < 2 \end{cases}$가 구해집니다.

---

### conditional distribution and expectation

$P_{X_2|X_1}(x_2|x_1) = \frac{P_{X_1, X_2}(x_1, x_2)}{P_{X_1}(x_1)}$이 $X_1 = x_1$이 주어질 때 conditional pmf of $X_2$이고 $f_{X_2 | X_1} (x_2 | x_1) = \frac{f_{X_1, X_2}(x_1, x_2)}{f_{X_1}(x_1)}$은conditional pdf of $X_2$입니다. 이를 보면 분모에는 marginal이 필요하고 분자에는 joint가 필요한 것을 알 수 있습니다. 그리고 $E[u(X_2) | x_1] = \int_{-\infty}^{\infty} u(x_2)f(x_2|x_1) \,dx_2$로 구할 수 있고, $Var(X_2|x_1) = E(X_2^2|x_1) - E^2(X_2|x_1)$이 됩니다.

예를 들어 $f(x_1, x_2) = 2I$일 때 $f_2(x_2) = \int_{0}^{x_2} 2 \,dx_1 = 2x_2I$이고 $f(x_1|x_2) = \frac{2}{2x_2}$이 됩니다. 평균 $E(X_1 | x_2) = \int_{0}^{x_2} x_1*\frac{1}{x_2} \,dx_1 = \frac{x_2}{2} I$가 됩니다.

---

### the correlation coefficient

$X$가 random variable일 때 $\mu_1 = E(X), \sigma^2 = Var(X)$, $Y$가 random variable일 때 $\mu_2 = E(Y), \sigma^2 = Var(Y)$로 정의를 하고 공분산 $Cov(X, Y) = E[(X_1 - \mu_1)(Y - \mu_2)] = E(XY) - E(X)E(Y)$로 나타낼 수 있습니다.

이제 coef, $\rho$값을 구하면 $Cov$를 이용하여 $\frac{Cov(X, Y)}{\sigma_1\sigma_2}$로 구해집니다.

---

### independent random variables

$X, Y$가 독립적이면 $f_{X, Y}(x, y) = f_X(x)f_Y(y)$ 가 성립합니다. 이를 정리하면 우항의 marginal을 $g(x)h(y)$로 대체하여 풀이할 수 있습니다. $f_X(x) = \int f(x, y) \,dy = \int g(x)h(y) \,dy = g(x) * \int h(y) \,dy$가 되고 $f_Y(y) = \int f(x, y) \,dx = \int g(x)h(y) \,dx = h(y) * \int g(x)dx$가 됩니다. 이 때 $\int h(y) \,dy = c_1, \int g(x) \,dx = c_2$라고 보면 $1 = \int\int g(x)h(y) \,dxdy = c_1c_2$가 되고 따라서 $f(x, y) = g(x)h(y) = c_1g(x)c_2h(y) = f_X(x)f_Y(y)$ 관계를 알 수 있습니다.

---

### extension to several random variables

$X = \{x_1, … , x_n\}$과 같이 n-dim random vector가 있을 때 $X$의 cdf인 $F_X(x) = P(X ≤ x)$로 정의되고 $E(u(X_1, …, X_n)) = \int … \int (u(X_1, …, X_n))f_{x_1, …, x_n}(x_1, …, x_n) \,dx_1, …, dx_n$ 과 같이 나타낼 수 있습니다. 따라서 예를 들어 $f_{x_1}(x_1)$의 marginal은 $\int … \int f_{x_1, …, x_n}(x_1, …, x_n)dx_2…dx_n$ 형태임을 알 수 있습니다. 그리고 $f_{X_2, …, X_n | X_1}(x_2, …, x_n | x_1) = \frac{f_{X_1, …, X_n}(x_1, …, x_n)}{f_1(x_1)}$으로 나타낼 수 있습니다.

예를 들어 $f(x_1, x_2, x_3) = \frac{1}{4}$이고 $(x_1, x_2, x_3) \in \{(1, 0, 0), (0, 1, 0), (0, 0, 1), (1, 1, 1)\}$ 범위를 가지며 $f_{ij}(x_i, x_j) = \frac{1}{4}$이고 $(x_i, x_j) \in \{(0, 0), (0, 1), (1, 0), (1, 1)\}$ 범위를 가지고 있습니다. 마지막으로 $f_i(x_i) = \frac{1}{2}$이고 $x_i = 0, 1$ 범위를 가집니다. 따라서 $f_{ij}(x_i, x_j) = f_i(x_i)f_j(x_j)$가 성립하지만 $f(x_1, x_2, x_3) \ne f_1(x_1)f_2(x_2)f_3(x_3)$임을 알 수 있습니다.

---

### transformation of random vectors

$S : \{X_1, …, X_n\}, T : \{Y_1, …, Y_n\}$이 집합으로 있을 때 1대 1 대응으로 만드는 $y_1 = u_1(x_1, …, x_n), y_n = u_n(x_1, …, x_n)$이라고 합니다. 이 때의 inverse function은 $x_1 = w_1(y_1, …, y_n), x_n = w_n(y_1, …, y_n)$이라고 표현 가능합니다. 야코비언 행렬로 나타내면 $\begin{vmatrix} \frac{d_{x_1}}{d_{y_1}} & \cdots & \frac{d_{x_1}}{d_{y_n}} \\ \vdots & \ddots & \vdots \\ \frac{d_{x_n}}{d_{y_1}} & \cdots & \frac{d_{x_n}}{d_{y_n}} \end{vmatrix}$과 같습니다. f$_{Y_1, …, Y_n}(y_1, …, y_n) = f_{X_1, …, X_n}(w_1(y_1, …, y_n), … w_n(y_1, …, y_n)) * |J|$으로 표현을 할 수 있습니다.

예를 들어 $f(x_1, x_2, x_3) = 48x_1x_2x_3I$와 같고 $Y_1 = \frac{X_1}{X_2}, Y_2 = \frac{X_2}{X_3}, Y_3 = X_3$일 때 $x_1 = x_2y_1 = x_3y_1y_2 = y_1y_2y_3$이 되고 $x_2 = x_3y_2 = y_2y_3, x_3 = y_3$으로 바꿀 수 있습니다. 따라서 야코비언 행렬 $J = \begin{vmatrix} y_2y_3 & y_1y_3 & y_1y_2 \\ 0 & y_3 & y_2 \\ 0 & 0 & 1 \end{vmatrix}$이 됩니다. $det(J) = y_2y_3^2$입니다. 결국 $f_{Y_1, Y_2, Y_3}(y_1, y_2, y_3) = 48(y_1y_2y_3)(y_2y_3)(y_3)|y_2y_3^2| = 48y_1y_2^3y_3^5$로 구해집니다.

---

### 참고 자료

[원본 경로 #1](http://www.kocw.net/home/cview.do?cid=7c789810ade43386)

[원본 경로 #2](http://www.kocw.net/home/search/kemView.do?kemId=1390551)



---
title: 'Multivariate distributions'
date: '2023-05-05'
tags: ['Mathematical statistics', 'lecture']
---

### distributions of two random variables

When $(X_1, X_2)$ are random variables satisfying $X_1(c) = x_1, X_2(c) = x_2$, they have a range $D = \{(x_1, x_2) : x_1 = X_1(c), x_2 = X_2(c), c \in C\}$. Defining $X = (X_1, X_2)^T$, the cumulative distribution function (cdf) of X is $F_{x_1, x_2} (x_1, x_2) = P(X_1 ≤ x_1, X_2 ≤ x_2)$, and the cdf inside a rectangle can be simplified as $P(a_1 < X_1 ≤ b_1, a_2 < X_2 ≤ b_2) = F_{x_1, x_2} (b_1, b_2) - F_{x_1, x_2}(a_1, b_2) - F_{x_1, x_2} (b_1, a_2) - F_{x_1, x_2}(a_1, a_2)$. For discrete X, the pmf is $P_{x_1, x_2}(x_1, x_2) = P(X_1 = x_1, X_2 = x_2)$. For continuous X, the pdf is $F_{x_1, x_2}(x_1, x_2) = \int_{-\infty}^{x_2}\int_{-\infty}^{x_1} f_{x_1, x_2}(w_1, w_2)\,dw_1dw_2$.

Looking at the cdf $F_{x_1, x_2} (x_1, x_2) = P(X_1 ≤ x_1, X_2 ≤ x_2)$ above, when $x_2$ approaches infinity, $\lim_{x_2 \rightarrow \infty} F_{x_1, x_2} (x_1, x_2)$ becomes the marginal cdf of $X_1$, denoted as $F_{x_1} (x_1)$. For pmf, $\sum_{x_2} p_{x_1, x_2}(x_1, x_2)$ becomes the marginal pmf of $X_1$, denoted as $p_{x_1} (x_1)$.

For example, given $f(x_1, x_2) = x_1 + x_2, 0 < x_1 < 1, 0 < x_2 < 1$, to find $P(X_1 ≤ \frac{1}{2})$, we have $f_{x_1}(x_1) = \int f(x_1, x_2) \,dx_2 = \int_{0}^{1} (x_1 + x_2) \,dx_2 = [x_1x_2 + \frac{1}{2} x_2^2]_0^1 = x_1 + \frac{1}{2}$, so $P(X_1 ≤ \frac{1}{2}) = \int_{0}^{\frac{1}{2}} (x_1 + \frac{1}{2}) \,dx_1 = \frac{3}{8}$.

---

### transformations : bivariate R.V's

When we want to know the distribution of $Y = g(X_1, X_2)$, we need to know the pdf of $X_1, X_2$.

First, in the discrete case, when the joint pmf is $P(x_1, x_2)$, the method to find $y_1 = u_1(x_1, x_2), y_2 = u_2(x_1, x_2)$ requires a one-to-one correspondence. Therefore, by defining the inverse function as $x_1 = w_1(y_1, y_2), x_2 = w_2(y_1, y_2)$, the joint pmf of $y_1, y_2$ becomes $p_{y_1, y_2}(y_1, y_2) = p_{x_1, x_2}(w_1(y_1, y_2), w_2(y_1, y_2))$.

In the continuous case, there are two methods: using cdf and using transformation. For the former, when cdf is given, we proceed with $F_{y_1}(y_1) = P(u_1(x_1, x_2) ≤y_1)$ and then $f_{Y_1} (y_1) = \frac{\partial}{\partial y_1} F_{y_1}(y_1)$. For the latter, we make a one-to-one correspondence with $Y_2 = u_2(X_1, X_2)$. Using the inverse function from the discrete case and substituting into the pdf, we get $f_{y_1, y_2}(y_1, y_2) = f_{x_1, x_2}(w_1(y_1, y_2), w_2(y_1, y_2)) * |J|$. Here, J (Jacobian matrix) is $\begin{vmatrix} \frac{d_{x_1}}{d_{y_1}} & \frac{d_{x_1}}{d_{y_2}} \\ \frac{d_{x_2}}{d_{y_1}} & \frac{d_{x_2}}{d_{y_2}} \end{vmatrix}$.

For example, given $f_{x_1, x_2} (x_1, x_2) = I (0 < x_1, x_2 < 1)$, to find the pdf of $Y_1 = X_1 + X_2$ using the cdf method: $F_{Y_1}(y_1) = P(Y_1 ≤ y_1) = P(X_1 + X_2 ≤ y_1)$, and dividing the range into $y_1 < 0, 0 ≤ y_1 < 1, 1 ≤ y_1 < 2, y_1 ≥ 2$, we get $\begin{cases} 0 & y_1 < 0 \\ \int_{0}^{y_1}\int_{0}^{y_1 - x_1} \,dx_2dx_1 & 0 ≤ y_1 < 1 \\ 1 - \int_{y_1-1}^{1}\int_{y_1-x_1}^{1} \,dx_2dx_1 & 1 ≤ y_1 < 2 \\ 1 & y_1 ≥ 2 \end{cases}$. Using the Jacobian method: $y_1 = x_1 + x_2, y_2 = x_2, x_1 = y_1 - y_2, x_2 = y_2$, with ranges $S_x = \{0 < x_1 < 1, 0 < x_2 < 1\}, S_y = \{0 < y_2 < 1, y_2 < y_1 < 1 + y_2\}$. $f_{Y_1}(y) = \int f_{Y_1, Y_2} (y_1, y_2) \,dy_2 = \begin{cases} \int_{0}^{y_1} \,dy_2 = y_1 & 0 < y_1 < 1 \\ \int_{y_1-1}^{1} \,dy_2 & 1≤ y_1 < 2 \end{cases}$.

---

### conditional distribution and expectation

$P_{X_2|X_1}(x_2|x_1) = \frac{P_{X_1, X_2}(x_1, x_2)}{P_{X_1}(x_1)}$ is the conditional pmf of $X_2$ given $X_1 = x_1$, and $f_{X_2 | X_1} (x_2 | x_1) = \frac{f_{X_1, X_2}(x_1, x_2)}{f_{X_1}(x_1)}$ is the conditional pdf of $X_2$. From this, we can see that the denominator requires marginal and the numerator requires joint. Also, $E[u(X_2) | x_1] = \int_{-\infty}^{\infty} u(x_2)f(x_2|x_1) \,dx_2$, and $Var(X_2|x_1) = E(X_2^2|x_1) - E^2(X_2|x_1)$.

For example, given $f(x_1, x_2) = 2I$, we have $f_2(x_2) = \int_{0}^{x_2} 2 \,dx_1 = 2x_2I$ and $f(x_1|x_2) = \frac{2}{2x_2}$. The mean $E(X_1 | x_2) = \int_{0}^{x_2} x_1*\frac{1}{x_2} \,dx_1 = \frac{x_2}{2} I$.

---

### the correlation coefficient

When $X$ is a random variable, $\mu_1 = E(X), \sigma^2 = Var(X)$, and when $Y$ is a random variable, $\mu_2 = E(Y), \sigma^2 = Var(Y)$. The covariance is defined as $Cov(X, Y) = E[(X_1 - \mu_1)(Y - \mu_2)] = E(XY) - E(X)E(Y)$.

Now, to find the coefficient $\rho$, we use $Cov$: $\frac{Cov(X, Y)}{\sigma_1\sigma_2}$.

---

### independent random variables

When $X, Y$ are independent, $f_{X, Y}(x, y) = f_X(x)f_Y(y)$ holds. To solve this, we can replace the marginal on the right side with $g(x)h(y)$. $f_X(x) = \int f(x, y) \,dy = \int g(x)h(y) \,dy = g(x) * \int h(y) \,dy$ and $f_Y(y) = \int f(x, y) \,dx = \int g(x)h(y) \,dx = h(y) * \int g(x)dx$. Letting $\int h(y) \,dy = c_1, \int g(x) \,dx = c_2$, we have $1 = \int\int g(x)h(y) \,dxdy = c_1c_2$, and therefore $f(x, y) = g(x)h(y) = c_1g(x)c_2h(y) = f_X(x)f_Y(y)$.

---

### extension to several random variables

When there is an n-dimensional random vector $X = \{x_1, … , x_n\}$, the cdf of $X$ is defined as $F_X(x) = P(X ≤ x)$, and $E(u(X_1, …, X_n)) = \int … \int (u(X_1, …, X_n))f_{x_1, …, x_n}(x_1, …, x_n) \,dx_1, …, dx_n$. Therefore, for example, the marginal $f_{x_1}(x_1)$ is $\int … \int f_{x_1, …, x_n}(x_1, …, x_n)dx_2…dx_n$. Also, $f_{X_2, …, X_n | X_1}(x_2, …, x_n | x_1) = \frac{f_{X_1, …, X_n}(x_1, …, x_n)}{f_1(x_1)}$.

For example, given $f(x_1, x_2, x_3) = \frac{1}{4}$ with range $(x_1, x_2, x_3) \in \{(1, 0, 0), (0, 1, 0), (0, 0, 1), (1, 1, 1)\}$, $f_{ij}(x_i, x_j) = \frac{1}{4}$ with range $(x_i, x_j) \in \{(0, 0), (0, 1), (1, 0), (1, 1)\}$, and finally $f_i(x_i) = \frac{1}{2}$ with range $x_i = 0, 1$. Therefore, $f_{ij}(x_i, x_j) = f_i(x_i)f_j(x_j)$ holds, but $f(x_1, x_2, x_3) \ne f_1(x_1)f_2(x_2)f_3(x_3)$.

---

### transformation of random vectors

When we have sets $S : \{X_1, …, X_n\}, T : \{Y_1, …, Y_n\}$, we make a one-to-one correspondence with $y_1 = u_1(x_1, …, x_n), y_n = u_n(x_1, …, x_n)$. The inverse function is $x_1 = w_1(y_1, …, y_n), x_n = w_n(y_1, …, y_n)$. The Jacobian matrix is $\begin{vmatrix} \frac{d_{x_1}}{d_{y_1}} & \cdots & \frac{d_{x_1}}{d_{y_n}} \\ \vdots & \ddots & \vdots \\ \frac{d_{x_n}}{d_{y_1}} & \cdots & \frac{d_{x_n}}{d_{y_n}} \end{vmatrix}$. $f_{Y_1, …, Y_n}(y_1, …, y_n) = f_{X_1, …, X_n}(w_1(y_1, …, y_n), … w_n(y_1, …, y_n)) * |J|$.

For example, given $f(x_1, x_2, x_3) = 48x_1x_2x_3I$ and $Y_1 = \frac{X_1}{X_2}, Y_2 = \frac{X_2}{X_3}, Y_3 = X_3$, we have $x_1 = x_2y_1 = x_3y_1y_2 = y_1y_2y_3$ and $x_2 = x_3y_2 = y_2y_3, x_3 = y_3$. Therefore, the Jacobian matrix $J = \begin{vmatrix} y_2y_3 & y_1y_3 & y_1y_2 \\ 0 & y_3 & y_2 \\ 0 & 0 & 1 \end{vmatrix}$. $det(J) = y_2y_3^2$. Finally, $f_{Y_1, Y_2, Y_3}(y_1, y_2, y_3) = 48(y_1y_2y_3)(y_2y_3)(y_3)|y_2y_3^2| = 48y_1y_2^3y_3^5$.

---

### References

[Original source #1](http://www.kocw.net/home/cview.do?cid=7c789810ade43386)

[Original source #2](http://www.kocw.net/home/search/kemView.do?kemId=1390551)



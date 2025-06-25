---
title: 'Some elementary statistical inference'
date: '2023-05-15'
tags: ['Mathematical statistics', 'lecture']
---

### sampling and statistic

Inference includes estimation and testing, and estimation is divided into point and interval estimation.

Sampling can be divided into sampling with replacement (independence) and sampling without replacement (dependence).

---

### order statistic

Order statistics use the pdf $f(x)$ and cdf $F(x)$ of random samples $X_1, …, X_n$.

When defining the order of X as $Y_1, …, Y_n$, we ensure that $Y_1 < Y_2, … < Y_n$ is satisfied.

For the pdf of y, since there is a one-to-one correspondence, the total number is n! and it is expressed as $g(y_1, …, y_n) = n!f(y_1)…f(y_n) = n!\prod\limits_{i=1}^{n}f(y_i)$. At this time, the total Jacobian matrix value satisfies 1.

For the marginal pdf of y, it satisfies $g_k(y_k) = \frac{n!}{(k-1)!(n-k)!} (F(y_k))^{k-1}(1-F(y_k))^{n-k}f(y_k)$.

For the joint pdf of $y_i, y_j, i<j$, when dividing the interval, the interval lower than $y_i$ has $F(y_i)$, the interval between i and j has $F(y_j)-F(y_i)$, and the interval greater than j has $1-F(y_j)$. Therefore, it satisfies $g(y_i, y_j) = \frac{n!}{(i-1)!(j-i-1)!(n-j)!} (F(y_i))^{i-1}(F(yj)-F(y_i))^{j-i-1}(1-F(y_j))^{n-j}$.

For example, when $y_1 < y_2 < y_3$ and $z_1 = y_3-y_1, z_2 = y_3 \rightarrow y_1 = z_2-z_1, y_3 = z_2$ relationship and the Jacobian matrix value is 1, the joint pdf for $Y_1, Y_2$ is first obtained as the pdf for the entire interval from $y_1$ to $y_3$: $g(y_1, y_3) = \frac{3!}{(1-1)!(3-1-1)!(3-3)!}(F(y_1))^{1-1}(F(y_3)-F(y_1))^{3-1-1}(1-F(y_3))^{3-3} = 6(y_3-y_1)$. Now $f(z_1, z_2) = g(z_2-z_1, z_2)|J| = 6(z_2-(z_2-z_1)) = 6z_1$ can be obtained.

---

### tolerance limits for distributions

For $Y_1 < … < Y_n$ defined by order statistics, when $p(F(Y_j)-F(Y_i) ≥ p) = \gamma$, it is expressed as 100$\gamma$% tolerance limits for 100$p$% of prob X. For the joint pdf of $Z = F(Y_n)$, since this follows $u(0, 1)$ and $p(Z ≤ z) = P(X ≤ F^{-1}(z)) = g$, $h(g_1, …, g_n) = n!$ holds.

The method to calculate $\gamma$ is $p(Z_j-Z_i ≥ p) = \int\limits_{0}^{1-p}\int\limits_{p+z_i}^{1} h(z_i, z_j) dz_jdz_i = \int\int \frac{n!}{(i-1)!(j-i-1)!(n-j)!} Z_i^{i-1}(Z_j-Z_i)^{j-i-1}(1-Z_j)^{n-j}$ by expanding. Simplifying the above formula, since the probability between $z_j$ and $z_i$ is ultimately replaced by the probability of $z_{j-1}$, it can be changed to $p(Z_j-Z_i ≥ p) = p(Z_{j-i} ≥ p) = \int\limits_{p}^{1} h(v)\, dv = \int \frac{n!}{(k-1)!(n-k)!}v^{k-1}(1-v)^{n-k} \,dv$.

For example, when finding $\gamma$ using $y_1, y_6$, $\gamma = P(F(y_6) - F(y_1) ≥ 0.8) = \int\limits_{0.8}^{1} \frac{6!}{(5-1}!(6-5)!) v^4(1-v)^1 \,dv = 0.34$.

---

### more on confidence intervals

Confidence intervals are said to have 100$(1-\alpha)$% when $Z = (X-\mu)/\sigma \sim N(0, 1)$ is satisfied.

The confidence interval for $\mu$ is expressed as 100$(1-\alpha)$% $= \bar{x} \pm Z_{\alpha/2}\frac{s}{\sqrt{n}}$ when $\sqrt{n}(\bar{X}-\mu)/s \sim N(0, 1)$ for $x_1, …, x_n$.

The confidence interval for p is expressed as $\hat{p} \pm Z_{\alpha/2}\sqrt{\frac{\hat{p}(1-\hat{p})}{n}}$ when it follows $B(1, p)$ and satisfies $\sqrt{n}(\hat{p}-p) \sim N(0, p(1-p))$.

The confidence interval for $\mu$ under normality is expressed as $\bar{X} \pm t_{\alpha/2}\frac{s}{\sqrt{n}}$ when $\sqrt{n}(\bar{X} - \mu)/s \sim t(n-1)$.

---

### introduction to hypothesis testing

$H_0$: null hypothesis with negativity and $H_1$: alternative hypothesis with assertiveness. For example, when $\theta = 170$ is the null hypothesis and $\theta \ne 170$ is the alternative hypothesis, if $x_1, …, x_n$ are random samples and numbers in the range $\omega$, then if $w_0 \cap w_1 \ne \phi$, $w_0 \cup w_1 = \omega$ holds.

The case of incorrectly rejecting the null hypothesis is judged as a Type I error, and the case of incorrectly accepting the alternative hypothesis as the null hypothesis is judged as a Type II error.

When there are random samples $x$ following $B(1, p)$, when creating $\alpha$ validation sets for verification, the null hypothesis is set as $p=p_0$ and the alternative hypothesis as $p < 0$. And the test statistic $S = \sum\limits_{i=1}^{n}X_i$ is set to have successful $i$. For example, given $n = 20, P_0 = 0.7, \alpha = 0.15, P_{H_0}(S≤11) = 0.1133, P_{H_0}(S≤12) = 0.2277$, since $S≤11$ is smaller than test size 0.15 when following $B(20, 0.7)$, the null hypothesis is rejected.

---

### additional comments about statistical tests

For large samples, two-sided testing uses random samples $x_1, …, x_n$ with $\mu, \sigma^2$ to set the null hypothesis $H_0 :  \mu = \mu_0$ and alternative hypothesis $H_1 : \mu \ne \mu_0$, then it can be rejected when $\bar{X} ≤ h$ or $\bar{X} ≥ k$. The significance level for each region is set to $\alpha/2$.

When random samples have null hypothesis $\theta = 0.1$, alternative hypothesis $\theta > 0.1$, and test size $\alpha$ = 0.05, the test stat $Y = \sum\limits_{i=1}^{10} X_i$ becomes and shows $Y \sim P(1) = 10 * 0.1$, then $P(Y ≥ 3) = 0.08$ and $P(Y ≥ 4) = 0.019$, and in such probabilities, the null hypothesis can be rejected when $P(Y ≥ 4)$. This test is called a non-randomized test.

Bernoulli trial w can be shown as P(w=1) = \frac{0.05-0.019}{0.08-0.019} = \frac{31}{61}, and the rejection region is ($X_i ≥ 4$) or {$X_i = 3$ and $W = 1$}, so it is calculated as $0.019 + (0.08 - 0.019)\frac{0.5-0.019}{0.08-0.019} = 0.05$. This test is called a randomized test.

Finally, the p-value is the significance probability, meaning the minimum value of $P_{H_0}$(observed test stat is rejected). That is, this can be said to be the minimum value of the Type I error probability of rejecting the null hypothesis among observation errors.

---

### chi-square tests

Chi-square tests include goodness-of-fit (GOF), homogeneity, and independence tests.

First, the GOF test is given as $X_1 \sim B(n, p1), X_2 = n-X_i, p_2 = 1-p_1$, and it is expressed as $Q_1 = \frac{(X_1-np_1)^2}{np_1(1-p_1)} = \frac{(X_1-np_1)^2}{np_1} + \frac{(X_1-np_1)^2}{n(1-p_1)} \rightarrow \chi^2(1)$, and the generalized formula is defined as $Q_{k-1} = \sum\limits_{i=1}^{k} \frac{(X_i-np_i)^2}{np_i} \rightarrow \chi^2(k-1)$. For example, in a trial of rolling a die 60 times, when each probability is 1/6 and given as $x_1, …, x_6 = 13, 19, 11, 8, 5, 4$, $np_i = 60*\frac{1}{6} = 10$ becomes, and $Q_5 = \frac{(13-10)^2}{10} + … + \frac{(4-10)^2}{10} = 15.6$, which is larger than $\chi^2(5) = 11.1$. Therefore, the null hypothesis cannot be rejected.

Next, when two independent variables $X_1, X_2$ follow $(n_1, p_{11}, …, p_{k1})$ and $(n_2, p_{12}, …, p_{k2})$, the null hypothesis is set as $p_{11} = p_{12}, …, p_{k1} = p_{k2}$, then the test stat can be defined as $Q = \sum\limits_{j=1}^{2}\sum\limits_{i=1}^{k} \frac{(X_{ij}-n_j\hat{p_{ij}})^2}{n_j\hat{p_{ij}}}$. Here, $\hat{p_{ij}} = \frac{X_i1 + X_i2}{n_1 + n_2}$ can be said. The degrees of freedom is $(k-1)*2 - (k-1) = k-1$ because there are k rows and 2 columns, and there is 1 constraint of k. This can be rearranged as $(col-1)*row - (col-1) = (row-1)(col-1)$.

Finally, for the independence test, when there are two categorical variables $A, B$, $P_{ij} = P(A_i \cap B_i)$ and the null hypothesis is set as the two variables are independent, then the test stat $Q = \sum\limits_{j=1}^{b}\sum\limits_{i=1}^{a} \frac{(X_{ij}-n\hat{p_{ij}})^2}{n\hat{p_{ij}}}$ and $\hat{p_{ij}} = \hat{p_i.}*\hat{p_j.} = \frac{X_i.}{n}\frac{X_j.}{n}$ can be expressed. The degrees of freedom becomes $(ab - 1) - ((a-1)+(b-1)) = (a-1)(b-1)$.

---

### method of monte carlo

In random number generation, when the random variable $U \sim U(0,1)$ follows, using continuous cdf $F$, $X = F^{-1}(U) \sim F$ is defined. Through this definition, $P(X ≤ x) = P(F^{-1}(U) ≤ x)$ becomes, and taking F on both sides, it can be arranged as $P(U ≤ F(x)) = F(x)$. And the estimation for \pi is given as $X = \begin{cases} 1 & U_1^2+U_2^2 < 1 \\ 0 & others \end{cases}$, then $E(X) = \frac{\pi}{4}$ follows the circle law and $\pi = 4E(X)$ becomes, so $\hat{\pi} = 4*\frac{1}{n}\sum\limits_{i=1}^{n}X_i$ can be said.

Monte Carlo integration is expressed as $\int\limits_{a}^{b} g(x) \,dx = (b-a)\int\limits_{a}^{b} g(x) \frac{1}{b-a} \,dx = (b-a)E[g(X)]$ and $X \sim u(a, b)$ follows.

The Box-Muller transformation is given as $Y_1, Y_2$ are independent and follow $u(0,1)$, and $X_1 = (-2log(y_1))^{1/2}cos(2\pi y_2), X_2 = (-2log(y_1))^{1/2}sin(2\pi y_2)$, then applying to the circle equation, $X_1^2 + X_2^2 = -2log(y_1)$ becomes, and therefore $Y_1 = exp[-(X_1^2 + X_2^2)/2]$ is expressed, and $\frac{X_2}{X_1} = tan(2\pi y_2)$ becomes, and therefore $Y_2 = \frac{1}{2\pi} arctan(\frac{X_2}{X_1})$ is expressed. At this time, the Jacobian matrix $J = \begin{vmatrix} \frac{dy_1}{dx_1} & \frac{dy_1}{dx_2} \\ \frac{dy_2}{dx_1} & \frac{dy_2}{dx_2} \end{vmatrix} = -\frac{1}{2\pi} exp[-\frac{x_1^2 + x_2^2}{2}]$ becomes. Therefore, these two independent variables can be said to follow the normal distribution $N(0, 1)$.

---

### References

[Original source #1](http://www.kocw.net/home/cview.do?cid=7c789810ade43386)

[Original source #2](http://www.kocw.net/home/search/kemView.do?kemId=1390551)



---
title: 'Some elementary statistical inference'
date: '2023-05-15'
tags: ['Mathematical statistics', 'lecture']
---

### sampling and statistic

inference에는 estimation, testing이 있고 estimation에는 point, interval로 나누어집니다.

표본추출에는 복원(independence)과 비복원(dependence) 추출로 나눌 수 있습니다.

---

### order statistic

순서 통계량은 $X_1, …, X_n$ random samples에 대한 pdf $f(x)$와 cdf $F(x)$를 사용합니다.

X에 대한 순서를 $Y_1, …, Y_n$으로 정의할 때 $Y_1 < Y_2, … < Y_n$을 만족하도록 합니다.

pdf of y에 대해서 1 대1 대응이므로 전체는 n!의 개수가 생겨나고 $g(y_1, …, y_n) = n!f(y_1)…f(y_n) = n!\prod\limits_{i=1}^{n}f(y_i)$로 표현이 됩니다. 이 때 전체 야코비언 행렬값은 1을 만족합니다.

marginal pdf of y에 대해서 $g_k(y_k) = \frac{n!}{(k-1)!(n-k)!} (F(y_k))^{k-1}(1-F(y_k))^{n-k}f(y_k)$를 만족합니다.

joint pdf of $y_i, y_j, i<j$에 대해서 구간을 나누면 $y_i$보다 낮은 구간에서는 $F(y_i)$, i와 j 사이 구간은 $F(y_j)-F(y_i)$를 j보다 큰 구간에서는 $1-F(y_j)$를 갖습니다. 따라서 $g(y_i, y_j) = \frac{n!}{(i-1)!(j-i-1)!(n-j)!} (F(y_i))^{i-1}(F(yj)-F(y_i))^{j-i-1}(1-F(y_j))^{n-j}$를 만족합니다.

예를 들어 $y_1 < y_2 < y_3$이고 $z_1 = y_3-y_1, z_2 = y_3 \rightarrow y_1 = z_2-z_1, y_3 = z_2$ 관계이면서 야코비언 행렬값은 1일 때 $Y_1, Y_2$에 대한 joint pdf는 전체 구간 $y_1$부터 $y_3$에 대한 pdf를 우선 구하면 $g(y_1, y_3) = \frac{3!}{(1-1)!(3-1-1)!(3-3)!}(F(y_1))^{1-1}(F(y_3)-F(y_1))^{3-1-1}(1-F(y_3))^{3-3} = 6(y_3-y_1)$이 됩니다. 이제 $f(z_1, z_2) = g(z_2-z_1, z_2)|J| = 6(z_2-(z_2-z_1)) = 6z_1$로 구해질 수 있습니다.

---

### tolerance limits for distributions

order statistic에 따라 정의되는 $Y_1 < … < Y_n$에 대해서 $p(F(Y_j)-F(Y_i) ≥ p) = \gamma$라고 할 때 100$\gamma$% tolerance limits for 100$p$% of prob X라고 표현합니다. joint pdf of $Z = F(Y_n)$에 대해서 이는 $u(0, 1)$을 따르고 $p(Z ≤ z) = P(X ≤ F^{-1}(z)) = g$이기 때문에 $h(g_1, …, g_n) = n!$이 성립합니다.

$\gamma$를 계산하는 방법은 $p(Z_j-Z_i ≥ p) = \int\limits_{0}^{1-p}\int\limits_{p+z_i}^{1} h(z_i, z_j) dz_jdz_i = \int\int \frac{n!}{(i-1)!(j-i-1)!(n-j)!} Z_i^{i-1}(Z_j-Z_i)^{j-i-1}(1-Z_j)^{n-j}$을 전개하여 구합니다. 위 수식을 더 간단히 하면 $z_j$와 $z_i$ 사이의 확률은 결국 $z_{j-1}$의 확률로 대체가 되므로 $p(Z_j-Z_i ≥ p) = p(Z_{j-i} ≥ p) = \int\limits_{p}^{1} h(v)\, dv = \int \frac{n!}{(k-1)!(n-k)!}v^{k-1}(1-v)^{n-k} \,dv$로 바꿀 수 있습니다.

예를 들어 $y_1, y_6$을 이용하여 $\gamma$를 구하면 $\gamma = P(F(y_6) - F(y_1) ≥ 0.8) = \int\limits_{0.8}^{1} \frac{6!}{(5-1}!(6-5)!) v^4(1-v)^1 \,dv = 0.34$입니다.

---

### more on confidence intervals

confidence intervals는 $Z = (X-\mu)/\sigma \sim N(0, 1)$을 만족할 때 100$(1-\alpha)$%를 갖는다고 합니다.

ci for $\mu$는 $x_1, …, x_n$에 대해서 $\sqrt{n}(\bar{X}-\mu)/s \sim N(0, 1)$을 따르면 100$(1-\alpha)$% $= \bar{x} \pm Z_{\alpha/2}\frac{s}{\sqrt{n}}$으로 표현합니다.

ci for p는 $B(1, p)$를 따를 때 $\sqrt{n}(\hat{p}-p) \sim N(0, p(1-p))$를 만족하고 $\hat{p} \pm Z_{\alpha/2}\sqrt{\frac{\hat{p}(1-\hat{p})}{n}}$으로 표현합니다.

ci for $\mu$ under normality는 $\sqrt{n}(\bar{X} - \mu)/s \sim t(n-1)$을 따를 때 $\bar{X} \pm t_{\alpha/2}\frac{s}{\sqrt{n}}$으로 표현합니다.

---

### introduction to hypothesis testing

$H_0$ : 귀무가설로 부정성을 띄고 $H_1$ : 대립가설로 주장성을 띄는 가설입니다. 예를 들어 $\theta = 170$이 귀무가설이고 $\theta \ne 170$이 대립가설일 때 $x_1, …, x_n$이 random samples이면서 $\omega$ 범위의 수라고 하면 $w_0 \cap w_1 \ne \phi$이면 $w_0 \cup w_1 = \omega$가 성립합니다.

귀무가설을 잘못 기각한 경우는 제 1종 오류, 대립가설을 귀무가설로 잘못 채택한 경우는 제 2종 오류로 판단합니다.

$B(1, p)$를 따르는 random samples $x$가 있을 때 검증을 위한 $\alpha$ 개의 검증셋을 만들 때 귀무가설을 $p=p_0$, 대립가설을 $p < 0$으로 세웁니다. 그리고 test statistic $S = \sum\limits_{i=1}^{n}X_i$를 성공한 $i$를 갖도록 합니다. 예를 들어 $n = 20, P_0 = 0.7, \alpha = 0.15, P_{H_0}(S≤11) = 0.1133, P_{H_0}(S≤12) = 0.2277$ 와 같이 주어진 경우 $B(20, 0.7)$을 따르면서 $S≤11$에서는 test size 0.15보다 작기 때문에 귀무가설을 기각하게 됩니다.

---

### additional comments about statistical tests

large samples 에 대한 양측검정은 $x_1, …, x_n$의 random samples $\mu, \sigma^2$을 이용하여 귀무가설 $H_0 :  \mu = \mu_0$과 대립가설 $H_1 : \mu \ne \mu_0$으로 설정하면 이제 $\bar{X} ≤ h$일 때나 $\bar{X} ≥ k$일 때 기각할 수 있습니다. 각 구역의 유의수준은 $\alpha/2$로 설정합니다.

random samples가 귀무가설 $\theta = 0.1$, 대립가설 $\theta > 0.1$과 test size $\alpha$ = 0.05를 가질 때 test stat $Y = \sum\limits_{i=1}^{10} X_i$가 되고 $Y \sim P(1) = 10 * 0.1$을 보인다고 하면 $P(Y ≥ 3) = 0.08$이고 $P(Y ≥ 4) = 0.019$와 같은 확률에서는 $P(Y ≥ 4)$ 일 때 귀무가설을 기각할 수 있습니다. 이 시행은 non-randomized test라고 합니다.

베르누이 시행 w를 P(w=1) = \frac{0.05-0.019}{0.08-0.019} = \frac{31}{61}로 보일 수 있고 기각영역은 ($X_i ≥ 4$) or {$X_i = 3$ and $W = 1$}이므로 $0.019 + (0.08 - 0.019)\frac{0.5-0.019}{0.08-0.019} = 0.05$라고 계산이 됩니다. 이 시행은 randomized test라고 합니다.

마지막으로 p-value는 유의확률로 $P_{H_0}$(observed test stat is rejected)의 최소값을 의미합니다. 즉 이는 관측오류 중 귀무가설을 기각하는 제 1종 오류 확률의 최소값이라고 할 수 있습니다.

---

### chi-square tests

카이검정에는 goodness-of-fit(GOF), homogeneity, independence 검정이 있습니다.

우선 GOF 검정은 $X_1 \sim B(n, p1), X_2 = n-X_i, p_2 = 1-p_1$이 주어질 때 $Q_1 = \frac{(X_1-np_1)^2}{np_1(1-p_1)} = \frac{(X_1-np_1)^2}{np_1} + \frac{(X_1-np_1)^2}{n(1-p_1)} \rightarrow \chi^2(1)$로 표현이 되듯이 일반화 공식 $Q_{k-1} = \sum\limits_{i=1}^{k} \frac{(X_i-np_i)^2}{np_i} \rightarrow \chi^2(k-1)$로 정의합니다. 예를 들어 주사위를 60번 돌리는 시행에서 각 확률은 1/6으로 $x_1, …, x_6 = 13, 19, 11, 8, 5, 4$와 같이 주어질 때 $np_i = 60*\frac{1}{6} = 10$이 되어 $Q_5 = \frac{(13-10)^2}{10} + … + \frac{(4-10)^2}{10} = 15.6$으로 $\chi^2(5) = 11.1$보다 큰 값이 됩니다. 따라서 귀무가설을 기각할 수 없습니다.

다음으로 두 독립인 변수 $X_1, X_2$가 $(n_1, p_{11}, …, p_{k1})$과 $(n_2, p_{12}, …, p_{k2})$를 따를 때 귀무가설은 $p_{11} = p_{12}, …, p_{k1} = p_{k2}$라고 설정하면 test stat인 $Q = \sum\limits_{j=1}^{2}\sum\limits_{i=1}^{k} \frac{(X_{ij}-n_j\hat{p_{ij}})^2}{n_j\hat{p_{ij}}}$로 정의할 수 있습니다. 여기서 $\hat{p_{ij}} = \frac{X_i1 + X_i2}{n_1 + n_2}$라고 할 수 있습니다. 자유도는 k개의 row가 2개이고 제약이 k개로 1개 존재하므로 $(k-1)*2 - (k-1) = k-1$이라고 할 수 있습니다. 이는 다시 정리하면 $(col-1)*row - (col-1) = (row-1)(col-1)$이 됩니다.

마지막으로 독립검정은 $A, B$ 두개의 categorical variables가 있을 때 $P_{ij} = P(A_i \cap B_i)$이고 귀무가설은 두 변수가 독립한다라고 설정하면 test stat $Q = \sum\limits_{j=1}^{b}\sum\limits_{i=1}^{a} \frac{(X_{ij}-n\hat{p_{ij}})^2}{n\hat{p_{ij}}}$이면서 $\hat{p_{ij}} = \hat{p_i.}*\hat{p_j.} = \frac{X_i.}{n}\frac{X_j.}{n}$으로 표현이 가능합니다. 자유도는 $(ab - 1) - ((a-1)+(b-1)) = (a-1)(b-1)$이 됩니다.

---

### method of monte carlo

random number generation에서 확률변수 $U \sim U(0,1)$을 따를 때 continuous cdf $F$를 이용하여 $X = F^{-1}(U) \sim F$로 정의합니다. 이 정의를 통해 $P(X ≤ x) = P(F^{-1}(U) ≤ x)$가 되고 양변에 F를 취하면 $P(U ≤ F(x)) = F(x)$로 정리가 가능합니다. 그리고 \pi에 대한 추정은 $X = \begin{cases} 1 & U_1^2+U_2^2 < 1 \\ 0 & others \end{cases}$라고 주어지면 $E(X) = \frac{\pi}{4}$로 원의 법칙을 따르게 되고 $\pi = 4E(X)$가 되어 $\hat{\pi} = 4*\frac{1}{n}\sum\limits_{i=1}^{n}X_i$라고 할 수 있게 됩니다.

monte carlo integration은 $\int\limits_{a}^{b} g(x) \,dx = (b-a)\int\limits_{a}^{b} g(x) \frac{1}{b-a} \,dx = (b-a)E[g(X)]$로 표현하고 $X \sim u(a, b)$를 따른다고 합니다.

box-muller transformation은 $Y_1, Y_2$가 독립이면서 $u(0,1)$을 따르고 $X_1 = (-2log(y_1))^{1/2}cos(2\pi y_2), X_2 = (-2log(y_1))^{1/2}sin(2\pi y_2)$라고 주어지면 원의 방정식에 적용하여 $X_1^2 + X_2^2 = -2log(y_1)$이 되고 따라서 $Y_1 = exp[-(X_1^2 + X_2^2)/2]$로 표현되고 $\frac{X_2}{X_1} = tan(2\pi y_2)$이 되고 따라서 $Y_2 = \frac{1}{2\pi} arctan(\frac{X_2}{X_1})$로 표현됩니다. 이 때의 야코비언 행렬 $J = \begin{vmatrix} \frac{dy_1}{dx_1} & \frac{dy_1}{dx_2} \\ \frac{dy_2}{dx_1} & \frac{dy_2}{dx_2} \end{vmatrix} = -\frac{1}{2\pi} exp[-\frac{x_1^2 + x_2^2}{2}]$가 됩니다. 따라서 이 두 독립인 변수는 정규분포 $N(0, 1)$을 따른다고 할 수 있습니다.

---

### References

[Original source #1](http://www.kocw.net/home/cview.do?cid=7c789810ade43386)

[Original source #2](http://www.kocw.net/home/search/kemView.do?kemId=1390551)



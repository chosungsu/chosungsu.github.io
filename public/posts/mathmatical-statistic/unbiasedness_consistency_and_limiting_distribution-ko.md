---
title: 'Unbiasedness, Consistency and Limiting Distribution'
date: '2023-05-12'
tags: ['Mathematical statistics', 'lecture']
---

### expectation of functions

$X_1, …, X_n$이 $iid$를 만족하면 random samples라고 할 수 있고 $\bar{X} = \sum \frac{X_i}{n}$, $s^2 = \frac{1}{n-1}\sum(X_i-\bar{X})^2$로 평균과 분산을 구할 수 있습니다.

$x = (X_1, …, X_n)’$, $y = (Y_1, …, Y_n)’$과 같은 random vector가 있고 $a = (a_1, …, a_n)’$, $b = (b_1, …, b_n)’$과 같은 constant vector가 있을 때 $T = a’x$, $W = b’y$라고 하면 $E(T) = a’E(x)$, $Var(T) = a’\sum a$, $Cot(T,W) = Cov(a’x, b’y) = a’\sum b$로 구해질 수 있습니다.

---

### convergence in probability

$X_n$이 $\forall \epsilon > 0$, $P(|X_n-X| > \epsilon) \rightarrow 0$를 $n \rightarrow \infty$ 조건에서 만족하는 것을 보도록 하겠습니다. WLLN(weak low of large numbers) 법칙에 의해 X의 평균이 $\mu$, 분산이 $\sigma^2$을 따르는데 위 조건에서 둘의 차가 $\epsilon$보다 클 확률이 0에 수렴하려면 결국 $\bar{X_n} \rightarrow \mu$가 성립해야 함을 알 수 있습니다. 그리고 $X_n \rightarrow X$, $Y_n \rightarrow Y$, $X_n+Y_n \rightarrow X+Y$이기 때문에 $|X_n - X| + |Y_n-Y| ≥ |(X_n+Y_n)-(X+Y)|$로 바꿔질 수 있으므로 $P((X_n+Y_n) - (X+Y) ≥ \epsilon) ≤ P(|X_n-X|+|Y_n-Y| ≥ \epsilon) ≤ P(|X_n-X|≥ \frac{\epsilon}{2}) + P(|Y_n-Y| ≥ \frac{\epsilon}{2})$로 분해도 가능해집니다. $X_n \rightarrow X$이면 $aX_n \rightarrow aX$가 되어 $P(|aX_n-aX| ≥ \epsilon) = P(a|X_n-X| ≥ \epsilon) = P(|X_n-X| ≥ \frac{\epsilon}{|a|})$와 같이 표현이 가능합니다.

---

### convergence in distribution

$X_n$이 sequence of random samples일 때 cdf인 $F_x$의 random variable이면 연속적인 cdf 조건 아래에 $X_n$을 $\lim F_{X_n}(x) = F_x(x)$를 만족하는 경우 $X_n \rightarrow X$로 정의됩니다.

이 때 $F_{X_n}(x) = \int\limits_{-\infty}^{x} \frac{1}{\sqrt{1/n}\sqrt{2\pi}} e^{-\frac{nw^2}{2}} \,dw = \int\limits_{-\infty}^{\sqrt{n}x} \frac{1}{2\pi} e^{-\frac{v^2}{2}} \,dv$를 갖는다고 하면 $\lim_{x \rightarrow \infty} F_{X_n}(x) = \begin{cases} 0 & x < 0 \\ 1/2 & x = 0 \\ 1 & x > 0 \end{cases}$이고 $F(x) = \begin{cases} 0 & x < 0 \\ 1 & x ≥ 0 \end{cases}$가 있을 때 0을 제외한 나머지에서는 성립한다고 표현합니다. 다음으로 bounded in probability에서 Landau’s Big Oh와 little oh에 대해서 살펴보면 $x_n \rightarrow 0$, $n \rightarrow \infty$라고 할 때 convergence의 비율을 $r_n$이라고 하면 $r_n \subset (0, \infty)$로 정의를 합니다. 만약 $\frac{x_n}{r_n} \rightarrow 0$이면 $x_n = o(r_n)$으로 표현하고 $P(|\frac{X_n}{r_n}| > \epsilon) \rightarrow 0$이 되고 $\lim \frac{x_n}{r_n} < \infty$이면 $x_n = O(r_n)$으로 표현하고 $P(|\frac{X_n}{r_n}| > M) \leftarrow \epsilon$이 됩니다. 따라서 $X_n = O_p(1)$이면 $r_n$이 1이 되어 결국 $X_n$의 확률값에 대응됩니다.

---

### central limit theorem

$\frac{\sqrt{n}(\bar{X} - \mu)}{\sigma} \rightarrow N(0, 1$)을 만족하고 $Y = X - \mu$에 대한 mgf값인 $m(t) = E[e^{t(x-\mu}] = m(o) + m’(0)t + \frac{m’’(o)}{2}t^2 + …$라고 풀이할 수 있습니다. $M_z(t) = E[exp(t*\frac{\sum X_i - n\mu}{\sigma\sqrt{n}})] = {m(\frac{t}{\sigma\sqrt{n}})}^n = [1 + \frac{\sigma^2}{2}\frac{t^2}{\sigma^2n} + \frac{m’’’(o)}{6}\frac{t^3}{\sigma^2n^{3/2}} + …]^n \rightarrow e^{\frac{t^2}{2}}$가 성립합니다. 정규분포가 아닌 이항분포 $B(1, p)$를 따른다면 $\frac{\sqrt{n}(\bar{X}-p)}{\sqrt{p(1-p)}}$로 바꾸어 볼 수 있습니다.

---

### asymptotics for multivariate distributions

euclidean norm는 $v = (v_1, …, v_p)’ \in R^v$일 때  $|v| = (\sum v_i^2)^1/2$로 정의됩니다. $e_i = (0, …, 1, …, 0)$인 기저가 있을 때 $v = \sum\limits_{i=1}^{p}v_ie_i$가 성립합니다.

만약 $P(|X_n - X| ≥ \epsilon) \rightarrow 0$이면 $X_n$이 $X$ 확률에 대응한다고 합니다.

---

### 참고 자료

[원본 경로 #1](http://www.kocw.net/home/cview.do?cid=7c789810ade43386)

[원본 경로 #2](http://www.kocw.net/home/search/kemView.do?kemId=1390551)



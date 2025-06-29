---
title: 'Unbiasedness, Consistency and Limiting Distribution'
date: '2023-05-12'
tags: ['Mathematical statistics', 'lecture']
---

### expectation of functions

If $X_1, …, X_n$ satisfy $iid$, they can be called random samples, and the mean and variance can be calculated as $\bar{X} = \sum \frac{X_i}{n}$, $s^2 = \frac{1}{n-1}\sum(X_i-\bar{X})^2$.

When there are random vectors such as $x = (X_1, …, X_n)'$, $y = (Y_1, …, Y_n)'$ and constant vectors such as $a = (a_1, …, a_n)'$, $b = (b_1, …, b_n)'$, if we let $T = a'x$, $W = b'y$, then $E(T) = a'E(x)$, $Var(T) = a'\sum a$, $Cot(T,W) = Cov(a'x, b'y) = a'\sum b$ can be calculated.

---

### convergence in probability

We will show that $X_n$ satisfies $\forall \epsilon > 0$, $P(|X_n-X| > \epsilon) \rightarrow 0$ under the condition $n \rightarrow \infty$. By the WLLN (weak law of large numbers), if the mean of X follows $\mu$ and variance follows $\sigma^2$, for the difference between the two to converge to 0 with probability greater than $\epsilon$ under the above condition, it must ultimately hold that $\bar{X_n} \rightarrow \mu$. Also, since $X_n \rightarrow X$, $Y_n \rightarrow Y$, $X_n+Y_n \rightarrow X+Y$, it can be transformed as $|X_n - X| + |Y_n-Y| ≥ |(X_n+Y_n)-(X+Y)|$, so decomposition is possible as $P((X_n+Y_n) - (X+Y) ≥ \epsilon) ≤ P(|X_n-X|+|Y_n-Y| ≥ \epsilon) ≤ P(|X_n-X|≥ \frac{\epsilon}{2}) + P(|Y_n-Y| ≥ \frac{\epsilon}{2})$. If $X_n \rightarrow X$, then $aX_n \rightarrow aX$, so it can be expressed as $P(|aX_n-aX| ≥ \epsilon) = P(a|X_n-X| ≥ \epsilon) = P(|X_n-X| ≥ \frac{\epsilon}{|a|})$.

---

### convergence in distribution

When $X_n$ is a sequence of random samples, if it is a random variable of cdf $F_x$, under the continuous cdf condition, $X_n$ is defined as $X_n \rightarrow X$ when it satisfies $\lim F_{X_n}(x) = F_x(x)$.

At this time, if we have $F_{X_n}(x) = \int\limits_{-\infty}^{x} \frac{1}{\sqrt{1/n}\sqrt{2\pi}} e^{-\frac{nw^2}{2}} \,dw = \int\limits_{-\infty}^{\sqrt{n}x} \frac{1}{2\pi} e^{-\frac{v^2}{2}} \,dv$, then $\lim_{x \rightarrow \infty} F_{X_n}(x) = \begin{cases} 0 & x < 0 \\ 1/2 & x = 0 \\ 1 & x > 0 \end{cases}$ and when there is $F(x) = \begin{cases} 0 & x < 0 \\ 1 & x ≥ 0 \end{cases}$, it is expressed that it holds for all except 0. Next, in bounded in probability, looking at Landau's Big Oh and little oh, when we say $x_n \rightarrow 0$, $n \rightarrow \infty$, if we call the rate of convergence $r_n$, it is defined as $r_n \subset (0, \infty)$. If $\frac{x_n}{r_n} \rightarrow 0$, it is expressed as $x_n = o(r_n)$ and $P(|\frac{X_n}{r_n}| > \epsilon) \rightarrow 0$, and if $\lim \frac{x_n}{r_n} < \infty$, it is expressed as $x_n = O(r_n)$ and $P(|\frac{X_n}{r_n}| > M) \leftarrow \epsilon$. Therefore, if $X_n = O_p(1)$, then $r_n$ becomes 1, ultimately corresponding to the probability value of $X_n$.

---

### central limit theorem

It satisfies $\frac{\sqrt{n}(\bar{X} - \mu)}{\sigma} \rightarrow N(0, 1)$ and can be solved as $m(t) = E[e^{t(x-\mu}] = m(o) + m'(0)t + \frac{m''(o)}{2}t^2 + …$ for the mgf value of $Y = X - \mu$. $M_z(t) = E[exp(t*\frac{\sum X_i - n\mu}{\sigma\sqrt{n}})] = {m(\frac{t}{\sigma\sqrt{n}})}^n = [1 + \frac{\sigma^2}{2}\frac{t^2}{\sigma^2n} + \frac{m'''(o)}{6}\frac{t^3}{\sigma^2n^{3/2}} + …]^n \rightarrow e^{\frac{t^2}{2}}$ holds. If it follows a binomial distribution $B(1, p)$ instead of normal distribution, it can be changed to $\frac{\sqrt{n}(\bar{X}-p)}{\sqrt{p(1-p)}}$.

---

### asymptotics for multivariate distributions

The euclidean norm is defined as $|v| = (\sum v_i^2)^1/2$ when $v = (v_1, …, v_p)' \in R^v$. When there is a basis $e_i = (0, …, 1, …, 0)$, $v = \sum\limits_{i=1}^{p}v_ie_i$ holds.

If $P(|X_n - X| ≥ \epsilon) \rightarrow 0$, we say that $X_n$ corresponds to $X$ in probability.

---

### References

[Original source #1](http://www.kocw.net/home/cview.do?cid=7c789810ade43386)

[Original source #2](http://www.kocw.net/home/search/kemView.do?kemId=1390551)



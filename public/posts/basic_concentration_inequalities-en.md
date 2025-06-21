---
title: 'Basic concentration inequalities'
date: '2024-05-20'
tags: ['Probability&Statistics', 'lecture']
---

### chernoff bound

When random variable $X$ has mean $\mu$, if $Ee^{\lambda(X-\mu)} < \infty$ is satisfied, for all $t > 0$, it can be defined as $log Pr(X-\mu \ge t) \le inf_{\lambda \in [0, b]} (log Ee^{\lambda(X-\mu)} - \lambda t)$.

---

### gaussian tail bounds

When $x$ follows a normal distribution, it satisfies $Ee^{\lambda X} = e^{\mu \lambda + \frac{\sigma^2 \lambda^2}{2}}$ and $Pr(X \ge \mu + t) \le e^{-\frac{t^2}{2\sigma^2}}$.

---

### sub gaussian

The difference from the above Gaussian is that it is defined as $Ee^{\lambda(X-\mu)} \le e^{\frac{\sigma^2 \lambda^2}{2}}$ when the sub-gaussian parameter $\sigma$ takes a positive value.

When $Pr(X=1) = Pr(X=-1) = 1/2$, it is called a Rademacher variable, and this variable has $\sigma=1$. Similarly, if $Pr(a \le X \le b) = 1$, then $X$ has $(b-a)/2$ as its sub-gaussian parameter.

If $X_1$ and $X_2$ have $\sigma_1$ and $\sigma_2$ as sub-gaussian variables respectively, then when they are independent, the variable of $X_1 + X_2$ becomes $\sqrt{\sigma_1^2+\sigma_2^2}$, and when they are not independent, it becomes $\sqrt{2} \sqrt{\sigma_1^2 + \sigma_2^2}$.

---

### uniformly consistent test

When $x_1, ..., x_n \sim P$ with iid, considering the null hypothesis $H_0 : P = P_0$ and the alternative hypothesis $H_1 : d_p(P, P_0) > \epsilon$, it refers to an experiment that checks whether the probability of selecting $p_0$ converges to 0.

The difference value when the null hypothesis is true is as follows:

$$
|\int f_k dP_n - \int f_k dP_0|
$$

The smaller this value, the higher the probability for $k$, meaning the probability of the null hypothesis increases.

---

### sub exponential variable

When random variable $X$ has mean $\mu=EX$, it is called sub-exponential if it satisfies $|\lambda| < \frac{1}{\alpha}Ee^{\lambda(X-\mu} \le e^{\frac{v^2\lambda^2}{2}}$ using positive parameters $(v, \alpha)$.

If it follows a chi-square distribution, it satisfies $Ee^{\lambda(X-1)} = \frac{e^{-\lambda}}{\sqrt{1-2\lambda}}$ using parameter $\lambda < 1/2$, and if $\lambda > 1/2$, it has an infinite mgf.

---

### johnson lindenstrauss embedding

When reducing from $D$ dimensions to $d$ dimensions greater than 2,

$$
\frac{|F(x_i) - F(x_j)|_2^2}{|x_i-x_j|_2^2}
$$

It is designed to minimize the error of this value. Therefore, the probability value outside the corresponding error range is $2e^{-d\delta^2/8}$.

---

### References

[Original Path #1](https://www.dropbox.com/scl/fi/49qolod5jxcaadoxk8ule/Chap6-concentrationIneq.pdf?rlkey=6n0ppjr6t8r0fqrkjyxn2ydwc&dl=0)




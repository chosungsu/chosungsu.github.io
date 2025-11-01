---
title: 'Some special distributions'
date: '2023-05-08'
tags: ['Mathematical statistics', 'lecture']
---

### The binomial and related distributions

#### Bernoulli Trial

A Bernoulli experiment is a random experiment whose outcomes can be classified into exactly two mutually exclusive categories, such as success or failure (e.g., female or male, survival or death, non-defective or defective).

A sequence of Bernoulli trials occurs when a Bernoulli experiment is repeated independently many times, with the probability of success $p$ remaining constant for each trial.

A random variable $X$ associated with a Bernoulli trial is defined by

$$
X(\text{Success}) = 1 \quad \text{and} \quad X(\text{Fail}) = 0
$$

The probability mass function (pmf) of $X$ is

$$
p(x) = p^x (1 - p)^{1-x}, \quad x = 0, 1
$$

If $X$ follows a Bernoulli distribution, the expectation and variance are

$$
\begin{aligned}
& \mu = E(X) = p, \\
& \sigma^2 = \text{var}(X) = p(1 - p)
\end{aligned}
$$

In $n$ independent Bernoulli trials with constant success probability $p$, let the random variable $X$ denote the number of observed successes. If $x$ successes occur, then $n-x$ failures occur.

The number of ways to choose positions for $x$ successes out of $n$ trials is $\binom{n}{x}$, and the probability of each arrangement is $p^x (1 - p)^{n-x}$. Therefore, the pmf of $X$ is

$$
p(x) = \begin{cases} \binom{n}{x} p^x (1 - p)^{n-x} & x = 0, 1, \dots, n \\ 0 & \text{elsewhere} \end{cases}
$$

A random variable $X$ with this pmf is said to follow a Binomial distribution, denoted $\mathbf{b(n, p)}$.

#### Negative Binomial

Let the random variable $Y$ denote the total number of failures before the $r$-th success occurs. That is, $Y+r$ is the total number of trials needed to obtain exactly $r$ successes, and the last trial must be a success.

$$
p_Y(y) = \begin{cases} \binom{y+r-1}{r-1} p^r (1 - p)^y & y = 0, 1, 2, \dots \\ 0 & \text{elsewhere} \end{cases}
$$

$Y$ follows this pmf.

#### Multinomial Distribution

This generalizes the binomial distribution. When a random experiment is repeated independently $n$ times and each outcome belongs to one of $k$ mutually exclusive categories $C_1, C_2, \dots, C_k$, assume the probability $p_i$ for each category remains constant ($\sum_{i=1}^k p_i = 1$).

Let $X_i$ be the number of outcomes belonging to category $C_i$. Then the joint pmf of $\mathbf{(X_1, X_2, \dots, X_{k-1})}$ is

$$
\begin{aligned}
& P(X_1=x_1, \dots, X_{k-1}=x_{k-1}) \\
&= \frac{n!}{x_1! \cdots x_{k-1}! x_k!} p_1^{x_1} \cdots p_{k-1}^{x_{k-1}} p_k^{x_k}
\end{aligned}
$$

where $x_k = n - \sum_{i=1}^{k-1} x_i$ and $p_k = 1 - \sum_{j=1}^{k-1} p_j$.

---

### The poisson distribution

For all real $z$, the series expansion

$$
\begin{aligned}
& 1 + z + \frac{z^2}{2!} + \frac{z^3}{3!} + \cdots \\
&= \sum_{x=0}^{\infty} \frac{z^x}{x!} = e^z
\end{aligned}
$$

holds. Define a function $p(x)$ by

$$
p(x) = \begin{cases} \frac{\lambda^x e^{-\lambda}}{x!} & x = 0, 1, 2, \dots \\ 0 & \text{elsewhere} \end{cases}
$$

where $\lambda > 0$ ensures probabilities are nonnegative. We derive the distribution under three axioms:

$\rightarrow g(1, h) = \lambda h + o(h)$

$\rightarrow \sum_{k=2}^{\infty} g(k, h) = o(h)$

$\rightarrow$ Event counts in non-overlapping intervals are independent.

For $k=0$, the event of no occurrence in $(0, t+h]$ is equivalent to no occurrence in $(0, t]$ and no occurrence in $(t, t+h]$. By axioms (1) and (2), the probability of no occurrence in $(0, h]$ is $1 - \lambda h + o(h)$. By axiom (3) independence,

$$
g(0, t + h) = g(0, t)[1 - \lambda h + o(h)]
$$

Differentiating:

$$
\begin{aligned}
&\frac{g(0, t + h) - g(0, t)}{h} \\
&= -\lambda g(0, t) + g(0, t) \frac{o(h)}{h} \\
&\to -\lambda g(0, t) \quad \text{as } h \to 0
\end{aligned}
$$

So $\mathbf{g(0, t) = e^{-\lambda t}}$.

Next, assume $g(k, t) = e^{-\lambda t}(\lambda t)^k/k!$ holds for $k$, and show it for $k+1$. For $k+1$ events in $(0, t+h]$, either $k+1$ events occur in $(0, t]$ and $0$ in $(t, t+h]$, or $k$ occur in $(0, t]$ and $1$ in $(t, t+h]$:

$$
\begin{aligned}
& g(k + 1, t + h) \\
&= g(k + 1, t)[1 - \lambda h + o(h)] + g(k, t)[\lambda h + o(h)]
\end{aligned}
$$

Differentiating:

$$
\frac{d}{dt} g(k + 1, t) = -\lambda g(k + 1, t) + \lambda g(k, t)
$$

Substituting the integral form gives $g(k+1, t) = e^{-\lambda t} \frac{(\lambda t)^{k+1}}{(k+1)!}$.

---

### The $\Gamma, \chi^2, \beta$ distributions

#### $\Gamma$ function

For the Gamma distribution, the following integral exists for $\alpha > 0$:

$$
\Gamma(\alpha) = \int_0^{\infty} y^{\alpha-1} e^{-y} dy
$$

When $\alpha = 1$, $\Gamma(1) = \int_0^{\infty} e^{-y} dy = 1$. For $\alpha > 1$, integration by parts gives

$$
\mathbf{\Gamma(\alpha) = (\alpha - 1) \Gamma(\alpha - 1)}
$$

If $\alpha$ is a positive integer greater than 1, then $\Gamma(\alpha) = (\alpha - 1)!$. The $\Gamma$ function is sometimes called the factorial function.

The pdf of a continuous random variable $X$ is

$$
f(x) = \begin{cases} \frac{1}{\Gamma(\alpha)\beta^{\alpha}} x^{\alpha-1} e^{-x/\beta} & x > 0 \\ 0 & \text{elsewhere} \end{cases}
$$

To show the pdf integrates to 1, use the substitution $z=\frac{x}{\beta}$. For the moment generating function mgf, use $y=\frac{x(1-\beta t)}{\beta}$ to obtain

$$
\mathbf{M(t) = \frac{1}{(1 - \beta t)^{\alpha}}} \quad \text{for } t < \frac{1}{\beta}
$$

Differentiating yields the mean and variance: $\mu=\alpha \beta$, $\sigma^2 = \alpha \beta^2$.

#### $\chi^2$ distribution

A special case of the gamma distribution with $\mathbf{\alpha = r/2}$ and $\mathbf{\beta = 2}$, the $\chi^2$ distribution has pdf

$$
f(x) = \begin{cases} \frac{1}{\Gamma(r/2) 2^{r/2}} x^{r/2-1} e^{-x/2} & x > 0 \\ 0 & \text{elsewhere} \end{cases}
$$

The parameter $r$ is called degrees of freedom, and we write $\mathbf{X \sim \chi^2(r)}$. The mean and variance are $\mu=r$, $\sigma^2 = 2r$.

#### $\beta$ distribution

The $\beta$ distribution is useful for modeling continuous distributions with bounded support, such as $(a, b)$, especially on $(0,1)$. Its pdf is

$$
f(x) = \begin{cases} \frac{\Gamma(\alpha+\beta)}{\Gamma(\alpha)\Gamma(\beta)} x^{\alpha-1} (1-x)^{\beta-1} & 0 < x < 1 \\ 0 & \text{elsewhere} \end{cases}
$$

If $\alpha = \beta = 1$, it becomes the uniform distribution. The mean and variance are $\mu = \frac{\alpha}{\alpha+\beta}$, $\sigma^2 = \frac{\alpha \beta}{(\alpha+\beta+1)(\alpha+\beta)^2}$.

---

### The normal distribution

#### The Standard normal distribution

$$
I = \int_{-\infty}^{\infty} \frac{1}{\sqrt{2\pi}} \exp \left( -\frac{z^2}{2} \right) dz
$$

This integral exists because the integrand is a positive continuous function. Using polar coordinates, we find $I^2=1$, hence $I=1$.

A continuous random variable $Z$ with the following pdf is called a standard normal random variable:

$$
f(z) = \frac{1}{\sqrt{2\pi}} \exp \left( -\frac{z^2}{2} \right), \quad -\infty < z < \infty
$$

The mgf is obtained using the substitution $w=z-t$:

$$
M_Z(t) = E[\exp\{tZ\}] = \exp \left( \frac{1}{2} t^2 \right)
$$

The mean and variance are $0$ and $1$.

#### The General normal distribution

For positive $b$ and any $a$, define a continuous random variable $X$ by $\mathbf{X = bZ + a}$. The pdf is

$$
f(x) = \frac{1}{\sqrt{2\pi}\sigma} \exp \left[ -\frac{1}{2} \left( \frac{x - \mu}{\sigma} \right)^2 \right], \quad -\infty < x < \infty
$$

where $a=E(X)=\mu$ and $b^2=Var(X)=\sigma^2$. The mgf is obtained by substitution $X = \sigma Z + \mu$:

$$
\mathbf{M_X(t) = \exp \left( \mu t + \frac{1}{2} \sigma^2 t^2 \right)}
$$

We write $Z \sim N(0,1)$. The pdf is symmetric about the vertical line $x=\mu$ and attains its maximum $\frac{1}{\sigma \sqrt{2\pi}}$ at $x=\mu$. The inflection points are at $x=\mu \pm \sigma$. The mean parameter $\mu$ is a location parameter that shifts the graph, and the standard deviation parameter $\sigma$ is a scale parameter that controls the spread.

---

### The Multivariate normal distribution

#### Bivariate

A pair of random variables $(X, Y)$ follows a bivariate normal distribution if its pdf is

$$
f(x, y) = \frac{1}{2\pi\sigma_1\sigma_2\sqrt{1 - \rho^2}} e^{-q/2}, \quad -\infty < x, y < \infty
$$

where $q = \frac{1}{1 - \rho^2} \left[ \left( \frac{x - \mu_1}{\sigma_1} \right)^2 - 2\rho \left( \frac{x - \mu_1}{\sigma_1} \right) \left( \frac{y - \mu_2}{\sigma_2} \right) + \left( \frac{y - \mu_2}{\sigma_2} \right)^2 \right]$ and parameters satisfy $\sigma_1, \sigma_2 > 0$ and $\rho^2 < 1$.

The mgf of the bivariate normal is $M_{(X,Y)}(t_1, t_2) = \exp \left[ t_1\mu_1 + t_2\mu_2 + \frac{1}{2} (t_1^2\sigma_1^2 + 2t_1t_2\rho\sigma_1\sigma_2 + t_2^2\sigma_2^2) \right]$. The marginal distribution of $X$ is $M_{(X,Y)}(t_1, 0)$, so $\mathbf{X \sim N(\mu_1, \sigma_1^2)}$, and the marginal of $Y$ is $M_{(X,Y)}(0, t_2)$, so $\mathbf{Y \sim N(\mu_2, \sigma_2^2)}$.

If $X$ and $Y$ are independent, then $\rho=0$ and the equal-probability contours are circular. The set of points satisfying $f(x,y)=c$ forms an ellipse.

#### Multivariate

When $\mathbf{Z} = (Z_1, \dots, Z_n)^T$ is a vector of independent and identically distributed (i.i.d.) $N(0, 1)$ random variables, the pdf of $\mathbf{Z}$ is

$$
f_{\mathbf{Z}}(\mathbf{z}) = \left( \frac{1}{2\pi} \right)^{n/2} \exp \left( -\frac{1}{2} \mathbf{z}^T \mathbf{z} \right), \quad \mathbf{z} \in \mathbb{R}^n
$$

The mean vector is $E[\mathbf{Z}]=\mathbf{0}$ and $\text{Cov}[\mathbf{Z}]=I_n$, so we write $\mathbf{Z} \sim N_n(\mathbf{0}, I_n)$.

All marginal distributions of a multivariate normal $\mathbf{X}$ are themselves normal. When $\mathbf{X} \sim N_n(\mathbf{\mu}, \mathbf{\Sigma})$ is partitioned into $\mathbf{X_1}$ and $\mathbf{X_2}$, they are independent if and only if $\mathbf{\Sigma_{12} = O}$ (the cross-covariance matrix is the zero matrix).

#### PCA

Principal component analysis: when $\mathbf{X} \sim N_n(\mathbf{\mu}, \mathbf{\Sigma})$, use the spectral decomposition $\Sigma = \Gamma^T \Lambda \Gamma$ to define a new random vector $\mathbf{Y = \Gamma(X - \mu)}$. Since $\mathbf{Y}$ follows $\mathbf{N_n(\mathbf{0}, \mathbf{\Lambda})}$, the components $Y_1, \dots, Y_n$ are independent with $\text{Var}(Y_i) = \lambda_i$. The vector $\mathbf{Y}$ is called the principal components vector. Total Variation is preserved: $TV(\mathbf{X}) = \sum \sigma_i^2 = \sum \lambda_i = TV(\mathbf{Y})$. Moreover, $Y_1$ (the first principal component) has the largest variance $\mathbf{\lambda_1}$ among all linear combinations $\mathbf{a}^T(\mathbf{X}-\mathbf{\mu})$.

---

### t and f distribution

#### The t distribution

Let $W$ be a random variable following $N(0, 1)$ and $V$ be a random variable following $\chi^2(r)$, and assume they are independent. Define a new random variable $T$ by

$$
\mathbf{T = \frac{W}{\sqrt{V/r}}}
$$

Using transformation techniques, the pdf $g_1(t)$ of $T$ can be obtained. With the substitution $u = v$, the marginal pdf $g_1(t)$ of $T$ is derived as

$$
\mathbf{g_1(t) = \frac{\Gamma[(r + 1)/2]}{\sqrt{\pi r}\Gamma(r/2)} \frac{1}{(1 + t^2/r)^{(r+1)/2}}}, \quad -\infty < t < \infty
$$

The distribution of $T$ is generally called the $t$-distribution and is completely determined by the parameter $\mathbf{r}$ (degrees of freedom of the chi-square distribution). Properties of the $t$-distribution:

$\rightarrow$ Since $g_1(-t) = g_1(t)$, the pdf of $T$ is symmetric about $\mathbf{0}$. Therefore, the median of $T$ is $0$.

$\rightarrow$ The unique maximum occurs at $t=0$.

$\rightarrow$ As the degrees of freedom $r$ approaches $\mathbf{\infty}$, the $t$-distribution converges to the $\mathbf{N(0, 1)}$ distribution.

#### The f distribution

Let $U$ and $V$ be independent chi-square random variables with degrees of freedom $r_1$ and $r_2$, respectively. Define a new random variable $W$ by

$$
\mathbf{W = \frac{U/r_1}{V/r_2}}
$$

Using transformation techniques, the pdf $g_1(w)$ of $W$ can be obtained. The marginal pdf $g_1(w)$ of $W$ is derived as

$$
\mathbf{g_1(w) = \frac{\Gamma[(r_1+r_2)/2](r_1/r_2)^{r_1/2}}{\Gamma(r_1/2)\Gamma(r_2/2)} \frac{w^{r_1/2-1}}{(1+r_1w/r_2)^{(r_1+r_2)/2}}}, \quad w > 0
$$

The distribution of $W$ is generally called the $F$ distribution. This distribution is completely determined by two parameters $\mathbf{r_1}$ and $\mathbf{r_2}$ (numerator and denominator degrees of freedom, respectively). The pdf of the $F$ distribution has a right-skewed shape.

#### Student's theorem

This is a corollary of the $t$-distribution derived above, often called Student's Theorem.

Let $X_1, \dots, X_n$ be independent and identically distributed (i.i.d.) random variables from a normal distribution with mean $\mu$ and variance $\sigma^2$. Define the sample mean $\mathbf{\bar{X} = \frac{1}{n} \sum_{i=1}^n X_i}$ and sample variance $\mathbf{S^2 = \frac{1}{n-1} \sum_{i=1}^n (X_i - \bar{X})^2}$. Then the distribution of $\bar{X}$ is $\mathbf{N \left( \mu, \frac{\sigma^2}{n} \right)}$. Moreover, $\mathbf{\bar{X}}$ and $\mathbf{S^2}$ are independent.

---

### References

[Original source #1](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)

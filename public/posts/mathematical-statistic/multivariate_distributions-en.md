---
title: 'Multivariate distributions'
date: '2023-05-05'
tags: ['Mathematical statistics', 'lecture']
---

### Distributions of two random variables

#### Random vector and joint cumulative distribution function (cdf)

In a probability experiment with sample space $C$, if there are two random variables $X_1$ and $X_2$ that assign to each element $c \in C$ a unique ordered pair $(X_1(c)=x_1, X_2(c)=x_2)$, then $(X_1, X_2)$ is called a random vector. The space $D$ of this random vector is the set of ordered pairs.

For the joint cumulative distribution function, the distribution of the random vector $(X_1, X_2)$ is uniquely defined by the joint cdf:

$$
\begin{aligned}
& F_{X_1, X_2}(x_1, x_2) = P[X_1 \le x_1, X_2 \le x_2],\\
& \text{for all } (x_1, x_2) \in \mathbb{R}^2
\end{aligned}
$$

For the joint probability mass function, the joint pmf of the random vector $(X_1, X_2)$ is defined by

$$
\begin{aligned}
& p_{X_1, X_2}(x_1, x_2) = P[X_1 = x_1, X_2 = x_2], \\
& \text{for all } (x_1, x_2) \in D
\end{aligned}
$$

For the joint probability density function, when $F_{X_1, X_2}(x_1, x_2)$ can be expressed as the integral below, the integrand $f_{X_1, X_2}(w_1, w_2)$ is called the joint pdf:

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

For discrete variables, the marginal pmf is obtained by summing over all possible values of $X_2$. The marginal pmf of $X_1$ corresponds to row sums (margins), and the marginal pmf of $X_2$ to column sums.

$$
f_{X_1}(x_1) = \int_{-\infty}^{\infty} f_{X_1, X_2}(x_1, x_2) \, dx_2
$$

For continuous variables, the marginal pdf is obtained by integrating.

For example, suppose a continuous random vector $(X,Y)$ is uniformly distributed on the unit disk $x^2 + y^2 \le 1$ centered at $(0,0)$. The area is $\pi$, and the joint pdf is $f(x, y) = \frac{1}{\pi}$ in the disk and $0$ elsewhere. To find the marginal pdf $f_X(x)$, fix $x \in [-1,1]$ and integrate $y$ from $-\sqrt{1 - x^2}$ to $\sqrt{1 - x^2}$:

$$
\begin{aligned}
& f_X(x) \\
&= \int_{-\sqrt{1-x^2}}^{\sqrt{1-x^2}} \frac{1}{\pi} \, dy \\
&= \frac{1}{\pi} [y]_{-\sqrt{1-x^2}}^{\sqrt{1-x^2}} \\
&= \frac{2}{\pi} \sqrt{1 - x^2}
\end{aligned}
$$

Although the joint distribution is uniform, the marginal distribution is unimodal with a maximum at $x=0$, indicating that probability mass is more concentrated near $x=0$.

Another example:

$$
f(x_1, x_2) = \begin{cases} x_1 + x_2 & 0 < x_1,x_2 < 1 \\ 0 & \text{elsewhere} \end{cases}
$$

When the support of the random vector is the interior of the unit square, the marginal pdf of $X_1$ is
$f_1(x_1) = \int_{0}^{1} (x_1 + x_2) \, dx_2 = x_1 + \tfrac{1}{2}$,
and the marginal pdf of $X_2$ is
$f_2(x_2) = \int_{0}^{1} (x_1 + x_2) \, dx_1 = \tfrac{1}{2} + x_2$.
To compute $P(X_1 + X_2 \le 1)$, integrate over the triangle with vertices $(0,0), (1,0), (0,1)$:

$$
\begin{aligned} 
& P(X_1 + X_2 \le 1) \\
&= \int_{0}^{1} \left[ \int_{0}^{1-x_1} (x_1 + x_2) \, dx_2 \right] \, dx_1 \\
&= \int_{0}^{1} \left[ x_1(1 - x_1) + \frac{(1 - x_1)^2}{2} \right] \, dx_1 \\ 
&= \int_{0}^{1} \left[ \frac{1}{2} - \frac{1}{2} x_1^2 \right] \, dx_1 \\
&= \left[ \frac{1}{2} x_1 - \frac{1}{6} x_1^3 \right]_0^1 \\
&= \frac{1}{2} - \frac{1}{6} = \frac{1}{3} 
\end{aligned}
$$

---

### Bivariate Random variables

#### Discrete

Let $p_{X_1, X_2}(x_1, x_2)$ be the joint pmf of two discrete random variables $X_1$ and $X_2$, with support set $S$. Define two new random variables $Y_1$ and $Y_2$ by

$$
y_1 = u_1(x_1, x_2) \quad \text{and} \quad y_2 = u_2(x_1, x_2)
$$

Assume this map is one-to-one from $S$ to $T$. Let $x_1 = w_1(y_1, y_2)$, $x_2 = w_2(y_1, y_2)$ be the inverse transformation. Then the joint pmf of the new random vector $(Y_1, Y_2)$ is

$$
p_{Y_1, Y_2}(y_1, y_2) = \begin{cases} p_{X_1, X_2}[w_1(y_1, y_2), w_2(y_1, y_2)] \\ 0\end{cases}
$$

To replace the two original variables by two new variables, introduce an auxiliary variable (e.g., $Y_2$) to create a one-to-one transformation.

For example, suppose $X_1$ and $X_2$ are independent Poisson with means $\mu_1$ and $\mu_2$, respectively. Let $Y_1 = X_1 + X_2$ be the total count. Choose the auxiliary variable $Y_2=X_2$ and the transformation $y_1=x_1+x_2,\ y_2=x_2$, with inverse $x_1=y_1-y_2,\ x_2=y_2$. Then

$$
p_{Y_1, Y_2}(y_1, y_2) = \frac{\mu_1^{y_1-y_2} \mu_2^{y_2}}{(y_1-y_2)!y_2!}e^{-\mu_1}e^{-\mu_2}
$$

This is the joint pmf. The marginal pmf of $Y_1$ is obtained by summing over $y_2$:

$$
\begin{aligned}
& p_{Y_1}(y_1) \\
&= \sum_{y_2=0}^{y_1} p_{Y_1, Y_2}(y_1, y_2) \\
&= \frac{(\mu_1 + \mu_2)^{y_1}}{y_1!} e^{-(\mu_1 + \mu_2)}
\end{aligned}
$$

#### Continuous

For continuous transformations, cdf and Jacobian methods are used.

First, by the cdf approach, let $(X_1, X_2)$ be uniform on the unit square $0 \le x_1 \le 1, 0 \le x_2 \le 1$, i.e., $f_{X_1, X_2}(x_1, x_2) = 1$. Find the distribution of $Z = X_1 + X_2$.

Compute $F_Z(z) = P(Z \le z) = P(X_1 + X_2 \le z)$, with $0 \le z \le 2$.

For $0 \le z \le 1$, the region is $x_1 \ge 0, x_2 \ge 0, x_1 + x_2 \le z$ within the unit square, so $x_1$ ranges from $0$ to $z$, and for each $x_1$, $x_2$ ranges from $0$ to $z - x_1$:

$$
\begin{aligned}
F_Z(z) 
&= \iint_{x_1 + x_2 \le z,~ 0 \le x_1, x_2 \le 1} f_{X_1,X_2}(x_1,x_2) dx_1 dx_2 \\
&= \int_{x_1=0}^{z} \int_{x_2=0}^{z-x_1} 1 ~dx_2~dx_1 \\
&= \int_{x_1=0}^{z} (z - x_1) dx_1 \\
&= \left[ z x_1 - \frac{1}{2} x_1^2 \right]_{x_1=0}^{z} \\
&= \frac{1}{2}z^2
\end{aligned}
$$

For $1 < z \le 2$, the integration region changes. For $x_1$ from $z-1$ to $1$, $x_2$ ranges from $0$ to $z-x_1$, but cannot exceed $1$, so the upper bound becomes $1$ when $x_1 \in [0, z-1]$:

$$
\begin{aligned}
F_Z(z)
&= \int_{x_1=0}^{z-1} \int_{x_2=0}^{1} 1~dx_2~dx_1
 +  \int_{x_1=z-1}^{1} \int_{x_2=0}^{z-x_1} 1~dx_2~dx_1 \\
&= (z-1) + \int_{x_1=z-1}^{1} (z-x_1) dx_1 \\
&= (z-1) + \left[ z x_1 - \frac{1}{2} x_1^2 \right]_{x_1=z-1}^{1} \\
&= 2z - z^2 - 1
\end{aligned}
$$

Therefore,

$$
F_Z(z) = 
\begin{cases}
0, & z < 0 \\
\tfrac{1}{2}z^2, & 0 \le z \le 1 \\
2z - z^2 - 1, & 1 < z \le 2 \\
1, & z > 2
\end{cases}
$$

Differentiate $F_Z(z)$ to obtain the pdf:

$$
\begin{aligned}
f_Z(z) = \frac{d}{dz} F_Z(z) =
\begin{cases}
z, & 0 \le z \le 1 \\
2 - 2z, & 1 < z \le 2 \\
0, & \text{elsewhere}
\end{cases}
\end{aligned}
$$

That is, the pdf of $Z = X_1 + X_2$ is triangular on $0 \le z \le 2$.

Next, using the Jacobian (determinant of the matrix of partial derivatives of the inverse transformation). With $Y_1 = X_1+X_2$ and the auxiliary variable $Y_2=X_1-X_2$, the inverse transformation is $x_1 = \tfrac{1}{2}(y_1+y_2),\ x_2 = \tfrac{1}{2}(y_1-y_2)$, and the Jacobian is

$$
J = \begin{vmatrix} 1/2 & 1/2 \\ 1/2 & -1/2\end{vmatrix} = -\tfrac{1}{2}
$$

Hence, since $f_{X_1, X_2} = 1$ on the unit square (restricted appropriately in the $(y_1,y_2)$-space), we have $f_{Y_1, Y_2}(y_1, y_2) = 1 \cdot \left| -\tfrac{1}{2} \right| = \tfrac{1}{2}$ on the transformed support.

---

### Conditional Distributions and Expectations

#### Discrete pmf

For discrete random variables $X_1$ and $X_2$ with joint pmf $p_{X_1, X_2}(x_1, x_2)$ and marginal pmf $p_{X_1}(x_1)$, the conditional pmf of $X_2$ given $X_1 = x_1$ is, by definition of conditional probability,

$$
\begin{aligned}
&p_{X_2|X_1}(x_2|x_1) \\
&= P(X_2 = x_2|X_1 = x_1) \\
&= \frac{p_{X_1, X_2}(x_1, x_2)}{p_{X_1}(x_1)}
\end{aligned}
$$

This function satisfies all pmf properties in $x_2$ for fixed $x_1$.

#### Continuous pdf

For continuous random variables $X_1$ and $X_2$ with joint pdf $f_{X_1, X_2}(x_1, x_2)$ and marginal pdf $f_{X_1}(x_1)$, the conditional pdf of $X_2$ given $X_1 = x_1$ is

$$
f_{X_2|X_1}(x_2|x_1) = \frac{f_{X_1, X_2}(x_1, x_2)}{f_{X_1}(x_1)}
$$

Similarly, this satisfies all pdf properties in $x_2$ for fixed $x_1$. For pdfs, conditional probabilities are computed as $P(a < X_2 < b | X_1 = x_1) = \int_{a}^{b} f_{X_2|X_1}(x_2|x_1) \, dx_2$.

#### Iterated expectations theorem

The conditional mean $E(X_2|X_1)$ is a function of $X_1$ and thus itself a random variable. When $\text{Var}(X_2)$ is finite,

The law of iterated expectations states that

$$
E[E(X_2|X_1)] = E(X_2)
$$

That is, the mean of $X_2$ equals the average of the conditional means of $X_2$ given $X_1$. Moreover, the variance of the conditional mean does not exceed the marginal variance. Hence, both $X_2$ and $E(X_2|X_1)$ can be used to estimate the mean $\mu_2$ of $X_2$, but since $\text{Var}[E(X_2|X_1)] \le \text{Var}(X_2)$, the conditional mean $E(X_2|X_1)$ suggests a better (lower-variance) estimator of $\mu_2$ than $X_2$ itself.

---

### Independent Random variables

The joint pdf can be expressed as the product of a conditional pdf and a marginal pdf:

$$
f(x_1, x_2) = f_{X_2|X_1}(x_2|x_1) f_{X_1}(x_1)
$$

If the conditional distribution of $X_2$ does not depend on the value $x_1$ of $X_1$, i.e., if $f_{X_2|X_1}(x_2|x_1)$ is independent of $x_1$, then $f_{X_2|X_1}(x_2|x_1) = f_{X_2}(x_2)$. Consequently, $f(x_1, x_2) = f_{X_1}(x_1) f_{X_2}(x_2)$.

A necessary and sufficient condition for independence of $X_1$ and $X_2$ is that the joint mass/density $p_{X_1, X_2}(x_1, x_2)$ equals identically the product of the marginals $p_{X_1}(x_1)$ and $p_{X_2}(x_2)$.

The factorization theorem states that, under the independence condition above,

$$
f(x_1, x_2) \equiv g(x_1)h(x_2)
$$

If $g(x_1)$ is positive only on $x_1 \in S_1$ and $h(x_2)$ is positive only on $x_2 \in S_2$, then the support where the joint pdf is positive must be the product space $S_1 \times S_2$.

If $X_1$ and $X_2$ are independent, then for appropriate functions and expectations,

$$
E[u(X_1)v(X_2)] = E[u(X_1)]E[v(X_2)]
$$

Assuming the moment generating function $M(t_1, t_2, \dots, t_n) = E[e^{t_1X_1 + \cdots + t_n X_n}]$ exists, a necessary and sufficient condition for independence is factorization of the mgf:

$$
\begin{aligned}
& M(t_1, t_2, \dots, t_n) \\
&= \prod_{i=1}^n M(0, \dots, 0, t_i, 0, \dots, 0)
\end{aligned}
$$

Moreover, if the random variables are independent (iid if identical), then for linear combinations $T=\sum k_i X_i$,

$$
M_T(t) = \prod_{i=1}^n M_i(k_i t)
$$

---

### The correlation coefficient

If $X$ and $Y$ are dependent, the parameter $\rho$ in the joint distribution measures linearity between $X$ and $Y$.

#### Covariance

Let the means of $X$ and $Y$ be $\mu_1$ and $\mu_2$, and variances be $\sigma_1^2$ and $\sigma_2^2$, respectively. The covariance of $(X, Y)$, denoted $\text{cov}(X, Y)$, is defined by

$$
\begin{aligned}
& \text{cov}(X, Y) \\
&= E[(X - \mu_1)(Y - \mu_2)] \\
&= E(XY)-\mu_1\mu_2
\end{aligned}
$$

Using this, the correlation coefficient is defined by

$$
\begin{aligned}
& \rho = \frac{E[(X - \mu_1)(Y - \mu_2)]}{\sigma_1\sigma_2} \\
&= \frac{\text{cov}(X, Y)}{\sigma_1\sigma_2}
\end{aligned}
$$

The range of $\rho$ is $-1 \le \rho \le 1$. We prove this bound.

##### Coefficient

To show that $|\rho| \le 1$, use the Cauchy–Schwarz inequality. Let $U = X - \mu_1$ and $V = Y - \mu_2$, which have means 0 and variances $\sigma_1^2$, $\sigma_2^2$ respectively. By Cauchy–Schwarz,

$$
[E(UV)]^2 \leq E(U^2) \cdot E(V^2)
$$

Here $E(UV) = \text{cov}(X, Y)$, $E(U^2) = \sigma_1^2$, and $E(V^2) = \sigma_2^2$. Therefore,

$$
[\text{cov}(X, Y)]^2 \leq \sigma_1^2 \sigma_2^2
$$

Dividing both sides by $\sigma_1^2 \sigma_2^2$ yields

$$
\left| \frac{\text{cov}(X, Y)}{\sigma_1 \sigma_2} \right| \le 1
$$

Hence,

$$
-1 \le \rho \le 1
$$

Thus, the correlation coefficient $\rho$ always lies between $-1$ and $1$.

---

### Several Random variables

Suppose each random variable $X_i$ assigns to each element $c \in C$ a single real number $X_i(c) = x_i$, and let $(X_1, \dots, X_n)$ be an $n$-dimensional random vector. The space of this random vector is the set of ordered $n$-tuples $D = \{(x_1, x_2, \dots, x_n) : x_1 = X_1(c), \dots, x_n = X_n(c), c \in C\}$. Furthermore, for a subset $A$ of $S$, we have $P[(X_1, \dots, X_n) \in A] = P(C)$ (probability assigned by the experiment).

Let $(X_1, \dots, X_n)^T$ be the $n$-dimensional column vector $\mathbf{X}$, and $(x_1, \dots, x_n)^T$ be an observed value vector $\mathbf{x}$. The joint cumulative distribution function is

$$
F_{\mathbf{X}}(\mathbf{x}) = P[X_1 \le x_1, \dots, X_n \le x_n]
$$

For discrete and continuous cases:

$$
\begin{aligned}
F_{\mathbf{X}}(\mathbf{x}) &= \sum_{w_1 \le x_1, \dots, w_n \le x_n} p(w_1, \dots, w_n), \\
F_{\mathbf{X}}(\mathbf{x}) &= \int_{-\infty}^{x_1} \cdots \int_{-\infty}^{x_n} f(w_1, \dots, w_n) dw_n \cdots dw_1.
\end{aligned}
$$

Thus, if the pdf of random variables $X, Y, Z$ is

$$
f(x, y, z) = \begin{cases} e^{-(x+y+z)} \\ 0\end{cases}
$$

then the distribution function is

$$
\begin{aligned}
& F(x, y, z) = P(X \le x, Y \le y, Z \le z) \\
&= \int_{0}^{z} \int_{0}^{y} \int_{0}^{x} e^{-u-v-w} du dv dw \\
&= (1 - e^{-x})(1 - e^{-y})(1 - e^{-z})
\end{aligned}
$$

#### Multivariate Variance-Covariance Matrix

For an $n$-dimensional random vector $\mathbf{X} = (X_1, \dots, X_n)^T$, the variance–covariance matrix is defined by

$$
\mathbf{\text{Cov}(\mathbf{X})} = E[(\mathbf{X} - \mathbf{\mu})(\mathbf{X} - \mathbf{\mu})^T] = [\sigma_{ij}]
$$

#### Transformation

For a subset $A$ of an $n$-dimensional space $S$, consider integrals of the form

$$
\int \cdots \int_A f(x_1, x_2, \dots, x_n) dx_1 dx_2 \cdots dx_n
$$

Given $n$ transformation functions

$$
y_1 = u_1(x_1, \dots, x_n), \dots, y_n = u_n(x_1, \dots, x_n)
$$

with inverse

$$
x_1 = w_1(y_1, \dots, y_n), \dots, x_n = w_n(y_1, \dots, y_n),
$$

assume this defines a one-to-one mapping from $S$ onto a region $T$ in the $y_1, \dots, y_n$ space, the partial derivatives of the inverse are continuous, and the $n\times n$ Jacobian determinant $J$ is nowhere zero on $T$.

Then

$$
\begin{aligned}
& \int \cdots \int_A f(x_1, \dots, x_n) dx_1 \cdots dx_n \\
&= \int \cdots \int_B f[w_1(\mathbf{y}), \dots, w_n(\mathbf{y})] |J| dy_1 \cdots dy_n
\end{aligned}
$$

Under these conditions, if the joint pdf of $X_1, \dots, X_n$ is $f(x_1, \dots, x_n)$, then the joint pdf $g(y_1, \dots, y_n)$ of $Y_i = u_i(X_1, \dots, X_n)$ is

$$
\mathbf{g(y_1, \dots, y_n) = f[w_1(\mathbf{y}), \dots, w_n(\mathbf{y})]|J|}
$$

Besides transformation methods, the moment generating function (MGF) is useful for finding the distribution of a function $Y = g(X_1, \dots, X_n)$:

$$
\begin{aligned}
&E[e^{tY}] \\
&= \int_{-\infty}^{\infty} \cdots \int_{-\infty}^{\infty} e^{t g(x_1, \dots, x_n)} f(x_1, \dots, x_n) dx_1 \cdots dx_n
\end{aligned}
$$

---

### Linear Combinations

Let $\mathbf{X} = (X_1, \dots, X_n)^T$ be a random vector, and consider linear combinations of these variables in the form

$$
T = \sum_{i=1}^n a_i X_i
$$

where $a_1, \dots, a_n$ are specified constants. If $E(X_i) = \mu_i$, then by linearity of expectation,

$$
\mathbf{E(T) = \sum_{i=1}^n a_i \mu_i}
$$

To obtain the variance of $T$, first state a general result for covariance. Let $W = \sum_{j=1}^m b_j Y_j$ be another linear combination of random variables $Y_1, \dots, Y_m$ with specified constants $b_1, \dots, b_m$. If $E[X_i^2] < \infty$ and $E[Y_j^2] < \infty$, then

$$
\mathbf{\text{Cov}(T, W) = \sum_{i=1}^n \sum_{j=1}^m a_i b_j \text{Cov}(X_i, Y_j)}
$$

Using the definition of covariance and linearity of expectation,
$\text{Cov}(T, W) = E[(T - E(T))(W - E(W))] = \sum_{i=1}^n \sum_{j=1}^m a_i b_j E[(X_i - E(X_i))(Y_j - E(Y_j))]$.
Setting $W \to T$ and applying the corollary yields

$$
\begin{aligned}
& \text{Var}(T) \\
&= \text{Cov}(T, T) \\
&= \sum_{i=1}^n a_i^2 \text{Var}(X_i) + 2 \sum_{i < j} a_i a_j \text{Cov}(X_i, X_j)
\end{aligned}
$$

---

### References

[Original source #1](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)

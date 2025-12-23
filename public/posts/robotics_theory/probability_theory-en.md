---
title: 'Primer on Probability Theory'
date: '2024-10-02'
tags: ['Robotics', 'lecture']
---

### Probability Density Functions

We say that a random variable $x$ is distributed according to a particular $\text{PDF}$. Let us denote the $\text{PDF}$ for $x$ as $p(x)$ and assume it spans the interval $[a, b]$. $p(x)$ is a non-negative function that satisfies

$$
\int_{a}^{b} p(x) dx = 1
$$

That is, it satisfies the axiom of total probability. Note that this is a probability density, not a probability itself. Probability is given by the area under the density function. For example, the probability that $x$ lies between $c$ and $d$, $\text{Pr}(c \le x \le d)$, is given by

$$
\text{Pr}(c \le x \le d) = \int_{c}^{d} p(x) dx
$$

Using a $\text{PDF}$, we can represent the likelihood that $x$ is in any possible state within the interval $[a, b]$ when some evidence in the form of data is given. We can also introduce conditioning variables. If $x \in [a, b]$ has a $\text{PDF}$ conditioned on $y \in [r, s]$, denoted as $p(x|y)$, it satisfies

$$
(\forall y) \int_{a}^{b} p(x|y) dx = 1
$$

For $N$-dimensional continuous variables, we can denote joint probability densities as $p(\mathbf{x})$ for $\mathbf{x} = (x_1, \dots, x_N)$ with $x_i \in [a_i, b_i]$.

$$
p(x_1, x_2, \dots, x_N)
$$

In the $N$-dimensional case, the axiom of total probability requires

$$
\begin{aligned}
&\int_{\mathbf{b}}^{\mathbf{a}} p(\mathbf{x}) d\mathbf{x} \\
&= \int_{a_N}^{b_N} \cdots \int_{a_1}^{b_1} p(x_1, x_2, \dots, x_N) dx_1 \cdots dx_N
\end{aligned}
$$

#### Bayes' Rule and Inference

We can always decompose a joint probability density into conditional and non-conditional factors.

$$
p(x, y) = p(x|y)p(y) = p(y|x)p(x)
$$

Using Bayes' theorem, when we have a prior $\text{PDF}$ $p(x)$ for the state and a sensor model $p(y|x)$, we can infer the posterior or likelihood $p(x|y)$ of the state given measurements. To do this, we expand the denominator as follows:

$$
p(x|y) = \frac{p(y|x)p(x)}{\int p(y|x)p(x) dx}
$$

The denominator $p(y)$ is computed through marginalization as follows:

$$
\begin{aligned}
&p(y) = p(y) \underbrace{\int p(x|y) dx}_{1} = \int p(x|y)p(y) dx \\ 
&= \int p(x, y) dx = \int p(y|x)p(x) dx \end{aligned}
$$

This can be computationally expensive in general nonlinear cases.

#### Moments

In dynamics, when dealing with mass distributions (i.e., density functions), we often track only a few properties called moments of mass (e.g., mass, center of mass, inertia matrix). The same applies to $\text{PDF}$s. The zeroth probability moment is always 1, consistent with the axiom of total probability. The first probability moment is known as the mean ($\mu$).

$$
\mu = E[x] = \int x p(x) dx
$$

However, this should be interpreted as follows:

$$
E[F(\mathbf{x})] = [E[f_{ij}(\mathbf{x})]] = \left[ \int f_{ij}(\mathbf{x}) p(\mathbf{x}) d\mathbf{x} \right]
$$

The second probability moment is known as the covariance matrix ($\Sigma$).

$$
\Sigma = E[(x - \mu)(x - \mu)^T]
$$

The next two moments are called skewness and kurtosis, but they become very complex in the multivariate case and require tensor representations.

#### Sample Mean and Covariance

Suppose we have a random variable $x$ and its associated $\text{PDF}$ $p(x)$. We can draw samples from this density, which we denote as

$$
x_{\text{meas}} \leftarrow p(x)
$$

If we draw $N$ such samples and wish to estimate the mean and covariance of the random variable $x$, we can do so using the sample mean and sample covariance:

$$
\begin{aligned}
&\mu_{\text{meas}} = \frac{1}{N} \sum_{i=1}^{N} x_{i, \text{meas}}, \\ 
&\Sigma_{\text{meas}} = \frac{1}{N - 1} \sum_{i=1}^{N} (x_{i, \text{meas}} - \mu_{\text{meas}}) (x_{i, \text{meas}} - \mu_{\text{meas}})^T
\end{aligned}
$$

The normalization of the sample covariance uses $N-1$ in the denominator instead of $N$, which is called Bessel's correction. Intuitively, this is necessary because the sample covariance uses the difference between measurements and the sample mean, and the sample mean itself is computed from the same measurements, introducing some correlation. The sample covariance can be shown to be an unbiased estimate of the true covariance, and it is larger than when $N$ is used in the denominator. It is also worth noting that as $N$ grows, $N-1 \approx N$, so the bias effect that the sample covariance compensates for becomes less pronounced.

#### Statistically Independent, Uncorrelated

When we have two random variables $x$ and $y$, we say they are statistically independent if their joint density factors as

$$
p(x, y) = p(x) p(y)
$$

And we say the variables are uncorrelated if they satisfy

$$
E[xy^T] = E[x] E[y]^T
$$

If variables are statistically independent, this also implies they are uncorrelated. However, the converse is not generally true for all types of densities.

#### Normalized Product

A sometimes useful operation is to take the normalized product of two $\text{PDF}$s for the same variable. If $p_1(x)$ and $p_2(x)$ are two $\text{PDF}$s for $x$, the normalized product $p(x)$ is formed as

$$
p(x) = \eta p_1(x) p_2(x)
$$

where

$$
\eta = \frac{1}{\int p_1(x) p_2(x) dx}
$$

is a normalization constant that ensures $p(x)$ satisfies the axiom of total probability. In a Bayesian context, the normalized product can be used to fuse independent estimates of a variable (expressed as PDFs) by assuming a uniform prior:

$$
p(x|y_1, y_2) = \eta p(x|y_1) p(x|y_2)
$$

---

### Gaussian Probability Density Functions

In one dimension, a Gaussian $\text{PDF}$ is given by

$$
p(x|\mu, \sigma^2) = \frac{1}{\sqrt{2\pi\sigma^2}} \exp \left( - \frac{1}{2} \frac{(x - \mu)^2}{\sigma^2} \right)
$$

where $\mu$ is the mean and $\sigma^2$ is the variance.

For a random variable $\mathbf{x} \in \mathbb{R}^N$, a multivariate Gaussian $\text{PDF}$ $p(\mathbf{x}|\boldsymbol{\mu}, \Sigma)$ can be expressed as

$$
p(\mathbf{x}|\boldsymbol{\mu}, \Sigma) = \frac{1}{\sqrt{(2\pi)^N \det \Sigma}} \exp \left( - \frac{1}{2} (\mathbf{x} - \boldsymbol{\mu})^T \Sigma^{-1} (\mathbf{x} - \boldsymbol{\mu}) \right)
$$

#### Isserlis' Theorem

Computing moments of multivariate Gaussian $\text{PDF}$s beyond the usual mean and covariance becomes somewhat complex, but there are some specific cases worth noting for later use.

$$
E[x_1 x_2 x_3 \cdots x_{2M}] = \sum_{P} E[x_i x_j] \cdots E[x_k x_l]
$$

where $P$ denotes the sum over all unique ways of partitioning into $M$ pairs. This means the sum has $\frac{(2M)!}{2^M M!}$ terms. For the case of four variables:

$$
\begin{aligned}
&E[x_i x_j x_k x_l] \\
&= E[x_i x_j]E[x_k x_l] \\
&+ E[x_i x_k]E[x_j x_l] \\
&+ E[x_i x_l]E[x_j x_k]
\end{aligned}
$$

For expressions like $E[\mathbf{x}(\mathbf{x}^T \mathbf{x})^p \mathbf{x}^T]$, when $p=0$ we have $E[\mathbf{x}\mathbf{x}^T] = \Sigma$. When $p=1$:

$$
\begin{aligned} 
&E[\mathbf{x}\mathbf{x}^T \mathbf{x}\mathbf{x}^T] \\
&= E\left[ \left[ x_i x_j \sum_{k=1}^N x_k^2 \right]_{ij} \right] \\
&= \left[ \sum_{k=1}^N E[x_i x_j x_k^2] \right]_{ij} \\ 
&= \left[ \sum_{k=1}^N \left( E[x_i x_j]E[x_k^2] + 2E[x_i x_k]E[x_k x_j] \right) \right]_{ij} \\ 
&= [E[x_i x_j]]_{ij} \sum_{k=1}^N E[x_k^2] + 2 \left[ \sum_{k=1}^N E[x_i x_k]E[x_k x_j] \right]_{ij} \\ 
&= \Sigma \text{tr}(\Sigma) + 2\Sigma^2 \\ 
&= \Sigma (\text{tr}(\Sigma)\mathbf{1} + 2\Sigma)
\end{aligned}
$$

#### Joint Gaussian PDFs, Their Factors, and Inference

We can have a joint Gaussian for a pair of variables $(\mathbf{x}, \mathbf{y})$, written as

$$
p(\mathbf{x}, \mathbf{y}) = \mathcal{N} \left( \begin{pmatrix} \boldsymbol{\mu}_x \\ \boldsymbol{\mu}_y \end{pmatrix}, \begin{pmatrix} \Sigma_{xx} & \Sigma_{xy} \\ \Sigma_{yx} & \Sigma_{yy} \end{pmatrix} \right)
$$

The joint density can always be factored as the product of two factors $p(\mathbf{x}, \mathbf{y}) = p(\mathbf{x}|\mathbf{y}) p(\mathbf{y})$, and we can derive the details for the joint Gaussian case using the Schur complement.

#### Sherman-Morrison-Woodbury Identity

We begin by noting that matrices can be factored into lower-diagonal-upper ($\text{LDU}$) or upper-diagonal-lower ($\text{UDL}$) forms:

$$
\begin{aligned}
&\begin{bmatrix} A^{-1} & -B \\ C & D \end{bmatrix} \\
&= \begin{bmatrix} \mathbf{1} & \mathbf{0} \\ CA & \mathbf{1} \end{bmatrix} \begin{bmatrix} A^{-1} & \mathbf{0} \\ \mathbf{0} & D + CAB \end{bmatrix} \begin{bmatrix} \mathbf{1} & -AB \\ \mathbf{0} & \mathbf{1} 
\end{bmatrix} \\
&= \begin{bmatrix} \mathbf{1} & -BD^{-1} \\ \mathbf{0} & \mathbf{1} \end{bmatrix} \begin{bmatrix} A^{-1} + BD^{-1}C & \mathbf{0} \\ \mathbf{0} & D \end{bmatrix} \begin{bmatrix} \mathbf{1} & \mathbf{0} \\ D^{-1}C & \mathbf{1} \end{bmatrix}
\end{aligned}
$$

Then we invert each of these forms.

#### Shannon Information of a Gaussian

For a Gaussian $\text{PDF}$, the Shannon information is given by

$$
\begin{aligned} 
&H(\mathbf{x})
&= - \int_{-\infty}^{\infty} p(\mathbf{x}) \left( - \frac{1}{2} (\mathbf{x} - \boldsymbol{\mu})^T \Sigma^{-1} (\mathbf{x} - \boldsymbol{\mu}) - \ln \sqrt{(2\pi)^N \det \Sigma} \right) d\mathbf{x} \\ &= \frac{1}{2} \ln \left( (2\pi)^N \det \Sigma \right) + \int_{-\infty}^{\infty} \frac{1}{2} (\mathbf{x} - \boldsymbol{\mu})^T \Sigma^{-1} (\mathbf{x} - \boldsymbol{\mu}) p(\mathbf{x}) d\mathbf{x} \\ &= \frac{1}{2} \ln \left( (2\pi)^N \det \Sigma \right) + \frac{1}{2} E[(\mathbf{x} - \boldsymbol{\mu})^T \Sigma^{-1} (\mathbf{x} - \boldsymbol{\mu})]
\end{aligned}
$$

The second term is written using the expectation, which equals the squared Mahalanobis distance and is equivalent to a squared Euclidean distance weighted by the inverse covariance matrix from the center.

This quadratic function inside the expectation can be written using the trace operator as

$$
(\mathbf{x} - \boldsymbol{\mu})^T \Sigma^{-1} (\mathbf{x} - \boldsymbol{\mu}) = \text{tr} \left( \Sigma^{-1} (\mathbf{x} - \boldsymbol{\mu})(\mathbf{x} - \boldsymbol{\mu})^T \right)
$$

Also, when the order is exchanged, the value of the second term is

$$
\text{tr} \left( \Sigma^{-1} \underbrace{E[(\mathbf{x} - \boldsymbol{\mu})(\mathbf{x} - \boldsymbol{\mu})^T]}_{\Sigma} \right) = \text{tr} (\Sigma^{-1}\Sigma) = \text{tr} (\mathbf{1}) = N
$$

This allows us to rewrite

$$
\begin{aligned} 
H(\mathbf{x}) &= \frac{1}{2} \ln \left( (2\pi)^N \det \Sigma \right) + \frac{1}{2} E[(\mathbf{x} - \boldsymbol{\mu})^T \Sigma^{-1} (\mathbf{x} - \boldsymbol{\mu})] \\ &= \frac{1}{2} \ln \left( (2\pi)^N \det \Sigma \right) + \frac{1}{2} N \\ &= \frac{1}{2} \left( \ln \left( (2\pi)^N \det \Sigma \right) + N \ln e \right) \\ &= \frac{1}{2} \ln \left( (2\pi e)^N \det \Sigma \right)
\end{aligned}
$$

Substituting back into the expression for Shannon information yields the above result.

---

### References

[Original Source #1](https://mingkangxiong.github.io/assets/books/State_Estimation_for_Robotic_2018.pdf?utm_source=chatgpt.com)

---
title: 'Nonlinear Non Gaussian Estimation'
date: '2024-10-09'
tags: ['Robotics', 'lecture']
---

### Full Bayesian Estimation

We consider a simple one-dimensional problem of estimating the position $x$ of a landmark using a stereo camera.

$$
y = \frac{fb}{x} + n
$$

where $y$ is the disparity and $n$ is Gaussian measurement noise.

#### Maximum a Posteriori Estimation

MAP estimation is an approach that seeks only the most likely state value, i.e., the mode, from the full posterior probability density function (PDF). The MAP estimate $\hat{x}_{\text{map}}$ is the state $x$ that maximizes the posterior probability $p(x|y)$.

$$
\begin{aligned}
&\hat{x}_{\text{map}} = \underset{x}{\text{arg max}} \, p(x|y) \\
&= \underset{x}{\text{arg min}} \, (-\ln(p(x|y)))
\end{aligned}
$$

This is equivalent to minimizing the negative log-likelihood. Applying Bayes' theorem and taking the logarithm, we can ignore the normalization constant $p(y)$ that does not depend on $\mathbf{x}$ and convert the problem to minimizing a cost function $J(x)$.

The mean error $e_{\text{mean}}(\hat{x})$ measures the average difference between the estimate and the true value $x_{\text{true}}$, indicating whether the estimator is biased.

$$
e_{\text{mean}}(\hat{x}) = \text{E}_{XN} [\hat{x} - x_{\text{true}}] = \text{E}_{XN} [\hat{x}] - \check{x}
$$

Under a nonlinear measurement model $g(\cdot)$, the MAP estimate $\hat{x}_{\text{map}}$ is generally biased. Nonlinear models make the posterior probability distribution non-Gaussian, causing the mode (MAP) and the mean (expected value of Full Bayesian) of the distribution to differ.

---

### Recursive Discrete-Time Estimation

This section derives the recursive approach underlying state estimation for nonlinear-non-Gaussian (NLNG) systems, namely the Bayes filter, and approximates it to derive one of the most widely used filters, the Extended Kalman Filter (EKF).

First, we need the dynamics and observation models that form the basis of the estimator.

$$
\begin{aligned}
&\mathbf{x}_k = f(\mathbf{x}_{k-1}, \mathbf{v}_k, \mathbf{w}_k), \\
&\mathbf{y}_k = g(\mathbf{x}_k, \mathbf{n}_k)
\end{aligned}
$$

An important characteristic of this system is that it possesses the Markov property. When a stochastic process has the Markov property, the conditional probability density function (PDF) of future states given the current state depends only on the current state and is conditionally independent of past states.

#### Bayes Filter

The Bayes filter seeks to compute the full PDF (posterior belief) of the state $\mathbf{x}_k$ using only measurements up to the current time, i.e., $p(\mathbf{x}_k|\check{\mathbf{x}}_0, \mathbf{v}_{1:k}, \mathbf{y}_{0:k})$.

$$
\begin{aligned}
&\underbrace{p(\mathbf{x}_k|\check{\mathbf{x}}_0, \mathbf{v}_{1:k}, \mathbf{y}_{0:k})}_{\text{posterior belief}} \\
&= \eta \underbrace{p(\mathbf{y}_k|\mathbf{x}_k)}_{\text{observation correction}} \\
&\times\int \underbrace{p(\mathbf{x}_k|\mathbf{x}_{k-1}, \mathbf{v}_k)}_{\text{motion prediction}} \\
&\times\underbrace{p(\mathbf{x}_{k-1}|\check{\mathbf{x}}_0, \mathbf{v}_{1:k-1}, \mathbf{y}_{0:k-1})}_{\text{prior belief}} \, d\mathbf{x}_{k-1}
\end{aligned}
$$

Since PDFs exist in an infinite-dimensional space, representing the belief $p(\mathbf{x}_k|\ldots)$ completely would require infinite memory. Moreover, the integral in the Bayes filter is too complex and computationally expensive to evaluate exactly.

#### Extended Kalman Filter, EKF

The EKF is a filter that makes the Bayes filter implementable by applying two main approximations. The EKF was developed by Stanley F. Schmidt for spacecraft trajectory estimation in the Apollo program, extending the Kalman filter to work with nonlinear models.

We constrain the estimated belief function $p(\mathbf{x}_k|\ldots)$ to be Gaussian.

$$
p(\mathbf{x}_k|\check{\mathbf{x}}_0, \mathbf{v}_{1:k}, \mathbf{y}_{0:k}) = \mathcal{N}(\hat{\mathbf{x}}_k, \hat{P}_k)
$$

We assume the noise variables $\mathbf{w}_k$ and $\mathbf{n}_k$ are Gaussian.

$$
\mathbf{w}_k \sim \mathcal{N}(0, Q_k), \quad \mathbf{n}_k \sim \mathcal{N}(0, R_k)
$$

To perform the integral in the Bayes filter, we linearize the nonlinear models $f(\cdot)$ and $g(\cdot)$ using a first-order Taylor series expansion around the mean of the current state estimate ($\hat{\mathbf{x}}_{k-1}$ or $\check{\mathbf{x}}_k$).

#### Generalized Gaussian Filter

The goal is to construct a joint Gaussian for the state $\mathbf{x}_k$ and the latest measurement $\mathbf{y}_k$:

$$
p(\mathbf{x}_k, \mathbf{y}_k|\check{\mathbf{x}}_0, \mathbf{v}_{1:k}, \mathbf{y}_{0:k-1}) = \mathcal{N}\left( \begin{bmatrix} \boldsymbol{\mu}_{x,k} \\ \boldsymbol{\mu}_{y,k} \end{bmatrix}, \begin{bmatrix} \Sigma_{xx,k} & \Sigma_{xy,k} \\ \Sigma_{yx,k} & \Sigma_{yy,k} \end{bmatrix} \right)
$$

Using the Gaussian, we can directly write the conditional Gaussian density (posterior probability) for $\mathbf{x}_k$.

#### Iterated Extended Kalman Filter, IEKF

The main difference between the EKF and IEKF lies in the operating point of linearization. The IEKF linearizes the observation model around the current estimate.

$$
\mathbf{y}_k = g(\mathbf{x}_k, \mathbf{n}_k) \approx \mathbf{y}_{\text{op}, k} + G_k (\mathbf{x}_k - \mathbf{x}_{\text{op}, k}) + \mathbf{n}'_k
$$

where $\mathbf{x}_{\text{op}, k}$ is an arbitrary point at which linearization is performed. The IEKF iteratively re-performs linearization in the correction step to improve performance.

$$
\mathbf{x}_{\text{op}, k} \leftarrow \hat{\mathbf{x}}_k
$$

The final estimate (mean of the Gaussian) of the IEKF matches the (local) maximum of the full posterior probability, i.e., the MAP estimate.

---

### References

[Original Source #1](https://mingkangxiong.github.io/assets/books/State_Estimation_for_Robotic_2018.pdf?utm_source=chatgpt.com)

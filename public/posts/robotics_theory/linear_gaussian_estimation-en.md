---
title: 'Linear Gaussian Estimation'
date: '2024-10-02'
tags: ['Robotics', 'lecture']
---

### Batch Discrete-Time Estimation

We define the following motion and observation models:

$$
\begin{aligned}
&\mathbf{x}_k = A_{k-1} \mathbf{x}_{k-1} + \mathbf{v}_k + \mathbf{w}_k, \\
&\mathbf{y}_k = C_k \mathbf{x}_k + \mathbf{n}_k
\end{aligned}
$$

where $k$ is the discrete-time index and all quantities except the input $\mathbf{v}_k$ are random variables. The state estimation problem is to find an estimate $\hat{\mathbf{x}}_k$ of the true state $\mathbf{x}_k$ of the system at one or more time steps $k$, based on knowledge of the initial state $\check{\mathbf{x}}_0$, a sequence of measurements $\mathbf{y}_{0:K, \text{meas}}$, a sequence of inputs $\mathbf{v}_{1:K}$, and knowledge of the system's motion and observation models.

#### Maximum A Posteriori

In batch estimation, the goal is to solve the following MAP problem:

$$
\hat{\mathbf{x}} = \arg \max_{\mathbf{x}} p(\mathbf{x}|\mathbf{v}, \mathbf{y})
$$

We begin by rewriting the MAP estimate using Bayes' theorem:

$$
\arg \max_{\mathbf{x}} \frac{p(\mathbf{y}|\mathbf{x}, \mathbf{v}) p(\mathbf{x}|\mathbf{v})}{p(\mathbf{y}|\mathbf{v})} = \arg \max_{\mathbf{x}} p(\mathbf{y}|\mathbf{x}) p(\mathbf{x}|\mathbf{v})
$$

where the denominator is omitted since it does not depend on $\mathbf{x}$. Also, according to the observation model, if $\mathbf{x}$ is known, $\mathbf{v}$ does not affect $\mathbf{y}$, so we omit $\mathbf{v}$ from $p(\mathbf{y}|\mathbf{x}, \mathbf{v})$. An important assumption is that all noise variables $\mathbf{w}_k$ and $\mathbf{n}_k$ are uncorrelated, allowing us to factor $p(\mathbf{y}|\mathbf{x}) = \prod_{k=0}^K p(\mathbf{y}_k | \mathbf{x}_k)$.

We define the objective function for the squared Mahalanobis distance as $J(\mathbf{x}) = \sum_{k=0}^K (J_{\mathbf{v}, k}(\mathbf{x}) + J_{\mathbf{y}, k}(\mathbf{x}))$, and for $p(\mathbf{z}|\mathbf{x})$ which is exactly quadratic in $\mathbf{x}$:

$$
p(\mathbf{z}|\mathbf{x}) = \eta \exp \left( - \frac{1}{2} (\mathbf{z} - H \mathbf{x})^T W^{-1} (\mathbf{z} - H \mathbf{x}) \right)
$$

can be expressed as above.

Since $J(\mathbf{x})$ is exactly a paraboloid, we can find its minimum in closed form by setting the partial derivative with respect to $\mathbf{x}$ to zero:

$$
\left. \frac{\partial J(\mathbf{x})}{\partial \mathbf{x}^T} \right|_{\hat{\mathbf{x}}} = -H^T W^{-1} (\mathbf{z} - H \hat{\mathbf{x}}) = \mathbf{0}
$$

---

### Recursive Discrete-Time Smoothing

The batch solution is attractive in that it is relatively easy to set up and easy to understand from a least-squares perspective. However, solving the resulting linear system of equations in a brute-force manner would not be very efficient in most situations. Fortunately, the inverse covariance matrix on the left-hand side ($H^T W^{-1} H$) is sparse.

One way to efficiently solve the batch equations is to perform a sparse Cholesky decomposition followed by forward and backward passes. It turns out that $H^T W^{-1} H$ can be efficiently factored as:

$$
H^T W^{-1} H = L L^T
$$

where $L$ is a block-lower-triangular matrix called the Cholesky factor.

#### Cholesky Smoother

We begin by defining the nonzero sub-blocks of $L$ as follows:

$$
L = \begin{pmatrix} L_0 & & & & \\ L_{1,0} & L_1 & & & \\ & L_{2,1} & L_2 & & \\ & & \ddots & \ddots & \\ & & & L_{K,K-1} & L_K \end{pmatrix}
$$

Next, we solve $L\mathbf{d} = H^T W^{-1} \mathbf{z}$ for $\mathbf{d}$. The final step of the Cholesky approach is to solve $L^T \hat{\mathbf{x}} = \mathbf{d}$ for $\hat{\mathbf{x}}$.

#### Rauch-Tung-Striebel Smoother

The Cholesky smoother is a convenient implementation and easy to understand when starting from the batch solution, but it does not represent the canonical form of the smoothing equations.

For the forward pass:

$$
\begin{aligned}
&I_k \\
&= Q_k^{-1} \\
&- Q_k^{-1} A_{k-1} \left( I_{k-1} + A_{k-1}^T Q_k^{-1} A_{k-1} \right)^{-1} A_{k-1}^T Q_k^{-1} \\
&+ C_k^T R_k^{-1} C_k
\end{aligned}
$$

Setting $\hat{P}_{k,f} = I_k^{-1}$, this can be written in two steps:

$$
\begin{aligned} 
\check{P}_{k,f} &= A_{k-1} \hat{P}_{k-1,f} A_{k-1}^T + Q_k, \\ \hat{P}_{k,f}^{-1} &= \check{P}_{k,f}^{-1} + C_k^T R_k^{-1} C_k 
\end{aligned}
$$

where $\check{P}_{k,f}$ represents the predicted covariance and $\hat{P}_{k,f}$ represents the corrected covariance. We use the subscript $(\cdot)_f$ to indicate that these quantities come from the forward pass (i.e., the filter). The second equation is written in information (inverse covariance) form, and to convert it to the canonical Kalman filter form, we define the Kalman gain matrix $K_k$ as:

$$
K_k = \hat{P}_{k,f} C_k^T R_k^{-1}
$$

Using the Sherman-Morrison-Woodbury (SMW) identity, $K_k$ can also be written as:

$$
\begin{aligned}
&K_k \\
&= \left( \check{P}_{k,f}^{-1} + C_k^T R_k^{-1} C_k \right)^{-1} C_k^T R_k^{-1} \\
&= \check{P}_{k,f} C_k^T \left( C_k \check{P}_{k,f} C_k^T + R_k \right)^{-1}
\end{aligned}
$$

Applying the same idea to the covariance update equation:

$$
\begin{aligned}
&\check{P}_{k,f}^{-1} \\ 
&= \hat{P}_{k,f}^{-1} - C_k^T R_k^{-1} C_k \\
&= \hat{P}_{k,f}^{-1} \bigl(\mathbf{1} - \hat{P}_{k,f} C_k^T R_k^{-1} C_k \bigr) \\
&= \hat{P}_{k,f}^{-1} (\mathbf{1} - K_k C_k)
\end{aligned}
$$

Rearranging this for $\hat{P}_{k,f}$ yields the well-known covariance correction formula:

$$
\hat{P}_{k,f} = (\mathbf{1} - K_k C_k)\,\check{P}_{k,f}
$$

---

#### Optimality of the Kalman Filter

The Kalman filter can be derived by choosing the gain matrix $K_k$ that minimizes the trace of the covariance matrix $\text{E}[\hat{e}_k \hat{e}_k^T]$ of the state estimation error $\hat{e}_k = \hat{x}_k - x_k$. Under linear system and Gaussian noise conditions, the Kalman filter is the optimal estimator with the smallest error variance among all possible linear unbiased estimators. This means it operates at the Cramér-Rao Lower Bound.

---

### References

[Original Source #1](https://mingkangxiong.github.io/assets/books/State_Estimation_for_Robotic_2018.pdf?utm_source=chatgpt.com)

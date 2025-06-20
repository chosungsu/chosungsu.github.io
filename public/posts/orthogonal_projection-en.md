---
title: 'othogonal projection'
date: '2024-05-10'
tags: ['Probability&Statistics', 'lecture']
---

### orthogonal projection

The orthogonal complement of subspace $L$ of $R^n$ is defined as $L^{\bot} = \{x \in R^n : x^Ty=0,  \forall y \in L\}$. $L^{\bot}$ is also a subspace of $R^n$ and $L \cap L^{\bot} = \{0\}$ holds.

Any $x$ belonging to $R^n$ can be expressed as $x = x_L + x_{L^{\bot}}$. Here, $x_L$ is called the orthogonal projection of $x$ onto the $L$ plane.

A matrix $A \in R^{n*n}$ is called an idempotent matrix or projection matrix if it satisfies $A^2 = A$ and $A = A^T$. When $x$ is orthogonally projected onto $C(A)$, it becomes $Ax$, which can be called an orthogonal projection. The null space and column space of projection $A$, $N(A)$ and $C(A)$, are orthogonal. That is, it supports $x^Ty=0$.

If any one of the above conditions is satisfied, $A$ can be called an orthogonal projection matrix onto $C(A)$.

If matrix $A \in R^{n*n}$ is symmetric, it satisfies $A^2 = A$, all eigenvalues are 0 or 1, and $rank(A) + rank(I_n-A) = n$ holds. Here, $rank(A) = tr(A)$, and $I_n-A$ is the orthogonal projection onto $C(A)^{\bot} = N(A)$.

And when matrices $A$ and $B$ are each orthogonal projections, if $C(A)$ and $C(B)$ are orthogonal, then $A + B$ is also an orthogonal projection, and at this time, $C(A+B) = C(A) + C(B)$ and $N(A+B) = N(A) \cap N(B)$ hold. If $AB=BA$, then $AB$ becomes an orthogonal projection, and at this time, $C(AB) = C(A) \cap C(B)$ and $N(AB) = N(A) + N(B)$ hold.

The projection matrix $H$ is defined as $H = X(X^TX)^{-1}X^T$ when $X = (x_1, ..., x_p)$ is an $n*p$ matrix and $rank(X) = p$, meaning the columns are linearly independent. This means the orthogonal projection of $X$ onto $C(X)$, and $H^2=H$, $C(H) \bot N(H)$, and $C(H) = C(X)$ hold.

---

### linear regression

When there are $(x_1, y_1), ..., (x_n, y_n)$ satisfying $x_i \in R^p$ and $y_i \in R$, the objective is to maximize $y_i$ using $\beta_0 + \sum_{j=1}^{p} x_{ij}\beta_j$, and for this purpose, the least squares method (LSE) is used to find $min_{\beta_0, \beta_1, ..., \beta_p} \sum_{i=1}^{n} (y_i - \beta_0 - \beta_0 + \sum_{j=1}^{p} x_{ij}\beta_j)^2$.

The dependent variable $y = (y_1, ..., y_n)^T$ forms an $n$-dimensional column vector, and $X$ is an $n*(p+1)$ matrix where each row consists of $(1, x_i^T)$. Implementing the least squares estimator gives $\hat{\beta} = argmin_{\beta \in R^{p+1}} |y-X\beta|^2_2$, that is, the goal is to minimize the error between the actual value $y$ and the predicted value $X\beta$.

When a solution exists and is unique, if the rank of $X$ is $p$, meaning the columns are linearly independent, the least squares solution can be found analytically as $\hat{\beta} = (X^TX)^{-1}X^Ty$.

Defining the fitted value as $\hat{y} = X\hat{\beta} = Hy$, the predicted value $\hat{y}$ becomes the value orthogonally projected onto $C(X)$.

When the input variables are centered as follows:

$$
1^Tx_j = \sum_{i=1}^{n}x_{ij} = 0, \forall j
$$

After preprocessing each column $x_j$ to have mean 0, the intercept $\hat{\beta_0} = \frac{1}{n} \sum_{i=1}^{n} y_i$ simply becomes the mean of the dependent variable $y$.

Also, when the vectors of each column are orthogonal, that is, when $x_i^Tx_j = 0$ is satisfied, the regression coefficient $\hat{\beta_j} = \frac{x_j^Ty}{|x_j|^2_2}$ can be calculated in closed form. This means that separate calculations are possible for each independent variable $x_j$.

---

### multiple regression

In linear regression with $p=1$, according to the definition $\hat{\beta_1} = \frac{(x_1-\bar{x_1}1)^Ty}{|x_1-\bar{x_1}1|^2_2}$, $\bar{x_1} = \frac{1}{n} \sum_{i=1}^{n} x_{i1}$ means the mean of $x_1$, and the numerator content shows the centering process of the input vector.

From the orthogonalization perspective,

Start with $z_0 = x_0 = 1$ as the constant term vector and repeat for $j = 1,...,p$ to perform orthogonalization on the input variables. Regress the existing orthogonal vectors onto the previous orthogonal vectors $z_0, ..., z_{j-1}$ to calculate coefficients $\hat{\gamma_{lj}} = \frac{z_l^Tx_j}{|z_l|^2_2}, \{l=0, ..., j-1\}$. Then, through the process of removing the influence of already existing orthogonal vectors, $z_j = x_j - \sum_{k=0}^{j-1} \hat{\gamma_{kj}}z_k$, $z_j$ becomes orthogonal to $z_0, ..., z_{j-1}$. Finally, regress y onto the last orthogonal vector $z_p$.

The above method proceeds identically to Gram-Schmidt orthogonalization.

---

### qr decomposition

The regression matrix X is decomposed as follows:

$$
X=Z\Gamma=ZD^{-1}D\Gamma\overset{\underset{\mathrm{def}}{}}{=}QR, \\
\Gamma = \hat{\gamma_{kj}}, \\
Z = (z_0, ..., z_p), \\
D = diag(|z_j|_2)
$$

By combining indicators such as $Z$ and $\Gamma$ obtained through Gram-Schmidt orthogonalization, QR decomposition can be derived.

Using QR decomposition, the solution of linear regression $\hat{\beta}$ can be calculated as follows:

$$
\hat{\beta} = R^{-1}Q^Ty
$$

It has the advantage of fast computation using the orthogonal matrix $Q$ and upper triangular matrix $R$. Also, the predicted value can be found as $\hat{y}=QQ^Ty$. At this time, since $QQ^T$ is the projection matrix $H$, it can be seen that it is identical to the result of orthogonally projecting $y$ onto $C(X)$.

---

### References

[Original Path #1](https://www.dropbox.com/scl/fi/n5vx00s5zhq407a22mi07/Chap3-orthogonalProjection.pdf?rlkey=7fk15l1a77n8uxzzvw2nqtf7u&e=2&dl=0)




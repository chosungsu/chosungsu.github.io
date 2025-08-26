---
title: 'Functions of Vector Random Variables'
date: '2024-05-13'
tags: ['Probability&Statistics', 'lecture']
---

### Warm up

Given $\bar{X}=\begin{bmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{bmatrix}, f_{\bar{X}}(\bar{X})$, if $\bar{Z}=g(\bar{X})$ and $g : \mathbb{R}^n \rightarrow \mathbb{R}^m$ dimensions, it can be expressed using the following methods:

1. When the left side is a scalar like $z=g(\bar{X})$, we calculate the cdf as $F_Z(z)=P[Z \le z]=P[g(x_1, \cdots, x_n) \le z]=\int \cdots \int f_{x_1, \cdots, x_n}(x_1, \cdots, x_n)dx_1dx_2\cdots dx_n$.

For example, if $Z=X+Y$ and $f_{XY}(x,y)$ is given, we can expand as $F_Z(z)=P[Z \le z]=P[Y \le -X+z]$. Looking at the range, since it's a straight line passing through points $(z, 0), (0, z)$ on the axes, the cdf is obtained as $\int_{-\infty}^{\infty} \int_{-\infty}^{z-x} f_{XY}(x,y)dydx$, and the pdf through differentiation has a convolution definition like $\int_{-\infty}^{\infty} f_{XY}(x,z-x)dx=(f_X*f_Y)(z)$.

2. When $f_{XY}(x,y)$ is given for $Z=g(X,Y)$, the pdf for $Z$ is obtained as follows: $f_Z(Z)=\int_{-\infty}^{\infty} f_Z(Z|y') \cdot f_Y(y')dy'$.

For example, if $Z=\frac{X}{Y}$ and random variables $X,Y$ are independent, $f_X(x)=e^{-x}, f_Y(y)=e^{-y}$ are given. Rather than finding the pdf for $Z$, let's first find $f_X(x|y)$. Since they are independent, we know that $f_X(x)=e^{-x}$. $f_Z(z)=\int \frac{f_X(x|y)}{\frac{dz}{dx}}=\int |y| \cdot f_X(x|y)=\int |y| \cdot e^{-yz} \cdot e^{-y}dy$

---

### Jacobian matrix

For $g: \mathbb{R}^n \rightarrow \mathbb{R}^n$ dimensions, the Jacobian matrix is as follows:

$$
\begin{bmatrix}
\frac{\partial g_1}{\partial x_1} & \frac{\partial g_1}{\partial x_2} &  \cdots & \frac{\partial g_1}{\partial x_n} \\ 
\frac{\partial g_2}{\partial x_1} & \frac{\partial g_2}{\partial x_2} &  \cdots & \frac{\partial g_2}{\partial x_n} \\
\vdots & \vdots & \ddots & \vdots \\
\frac{\partial g_n}{\partial x_1} & \frac{\partial g_n}{\partial x_2} &  \cdots & \frac{\partial g_n}{\partial x_n}
\end{bmatrix}
(x_1 \cdots x_n)
$$

Using this Jacobian matrix, when we find $f_{\bar{Z}}(z_1, \cdots, z_n)$, it is as follows:

$f_{\bar{Z}}(z_1, \cdots, z_n)=\frac{f_{\bar{X}}(x_1, \cdots, x_n)}{|\frac{dP}{dx_1 \cdots dx_n}|}(x_1, \cdots, x_n)=h(z_1, \cdots, z_n)$, where the numerator value is $|\det J(\bar{X})|$, the Jacobian determinant.

Accordingly, let's take an example problem: if $Z=X_1+X_2+X_3$, to find $f_Z(z)$, we break it into three random variables as $Z_1=X_1, Z_2=X_1+X_2, Z_3=X_1+X_2+X_3$ to make calculation easier. Now, when we calculate $f_{Z_1Z_2Z_3}(z_1, z_2, z_3)=\frac{f_{X_1X_2X_3}(Z_1, Z_2-Z_1, Z_3-Z_2)}{|\det J|}$, the Jacobian matrix is first as follows:

$$
\begin{bmatrix}
1 & 0 & 0 \\
1 & 1 & 0 \\
1 & 1 & 1
\end{bmatrix}
$$

The absolute value of this Jacobian determinant, being a lower triangular matrix, is the product of main diagonal elements, which we can see is $1 \cdot 1 \cdot 1=1$. Therefore, simplifying the above equation, $f_Z(z)=f_{Z_3}(z_3)=\int \int f_{X_1X_2X_3}(Z_1, Z_2-Z_1, Z_3-Z_2) d_{z_2}d_{z_1}$.

---

### Expectation

Applying $E[\bar{X}]=\begin{bmatrix} E(X_1) \\ \vdots \\ E(X_n) \end{bmatrix}=\bar{m_{\bar{X}}}$, we can express the correlation matrix as $E[\bar{X}\bar{X}^T]=R_{\bar{X}}$, and the covariance matrix can be expressed as $K_{\bar{X}}=E[(\bar{X}-\bar{m_{\bar{X}}})(\bar{X}-\bar{m_{\bar{X}}})^T]$.

---

### Linear transformation

$$
\bar{Z}=A \cdot \bar{X}
$$

Above, matrix $A$ is $m \times n$ dimensional, and we can find the expectation as $\bar{M_{\bar{Z}}}=E[\bar{Z}]=E[A \cdot \bar{X}]=AE[\bar{X}]=A\bar{M_{\bar{X}}}$, and we can find the covariance matrix as $K_{\bar{Z}}=E[(\bar{Z}-\bar{m_{\bar{Z}}})(\bar{Z}-\bar{m_{\bar{Z}}})^T]=E[(A\bar{X}-A\bar{m_{\bar{X}}})(A\bar{X}-A\bar{m_{\bar{X}}})^T]=E[A(\bar{X}-\bar{m_{\bar{X}}})(\bar{X}-\bar{m_{\bar{X}}})^TA^T]=AK_{\bar{X}}A^T$.

---

### Diagonalization

$$
Av=\lambda v
$$

In the above equation, when $A$ is given, we can expand as $(A-\lambda I)v=0$, but $v$ cannot be a zero vector. Then, $A-\lambda I$ must have singular properties, so it should not have an inverse. That is, $\det (A-\lambda I)=0$ holds.

If such an equation exists as a polynomial, it is as follows:

$$
Av_1=\lambda_1 v_1, \\
Av_2=\lambda_2 v_2, \\
\vdots \\
Av_n=\lambda_n v_n
$$

Expanding the above equation, $A[v_1 v_2 \dots v_n]=[v_1 v_2 \dots v_n]\begin{bmatrix} \lambda_1 & 0 & 0 & \cdots & 0 \\ 0 & \lambda_2 & 0 & \cdots & 0 \\ \vdots & \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & 0 & \cdots & \lambda_n \end{bmatrix} \Rightarrow [Av_1 Av_2 \dots Av_n]=[\lambda_1v_1 \lambda_2v_2 \dots \lambda_nv_n]$, and simplifying further, it becomes $AV=V\Lambda$. If $V$ is nonsingular and invertible, it can also be arranged as $V^{-1}AV=\Lambda$. This theorem is called diagonalization.

If $A$ is a symmetric matrix, we can find a set of eigen vectors that are mutually independent and orthogonal.

For example, if matrix $A$ is $\begin{bmatrix} 3 & 4 \\ 5 & 2\end{bmatrix}$, then $\det(A-\lambda I)=\det\begin{bmatrix} 3-\lambda & 4 \\ 5 & 2-\lambda\end{bmatrix}=(3-\lambda)(2-\lambda)-20=\lambda^2-5\lambda-14=0$, so $\lambda=7, -2$ become eigen values. Now, solving $(A-\lambda I)v=0$ for each eigen value: when $\lambda=7$, $\begin{bmatrix} -4 & 4 \\ 5 & -5\end{bmatrix}\begin{bmatrix} v_1 \\ v_2\end{bmatrix}=0$, so $v=\begin{bmatrix} 1 \\ 1\end{bmatrix}$; when $\lambda=-2$, $\begin{bmatrix} 5 & 4 \\ 5 & 4\end{bmatrix}\begin{bmatrix} v_1 \\ v_2\end{bmatrix}=0$, so $v=\begin{bmatrix} -4 \\ 5\end{bmatrix}$ becomes the eigen vector.

---

### Estimation

For estimating $X$ given $Y$, we use methods like MAP (Maximum a posterior), ML (Maximum likelihood), and MMSE (Minimum mean squared error).

First, for discrete random variables, we solve each method as follows:

$\rightarrow \hat{X}=\text{argmax}_x P[X=x|Y=y]=\text{argmax}_x \frac{P[Y=y|X=x]P[X=x]}{P[Y=y]}$ : This is MAP, which estimates $x$ when the value of $Y=y$ is given.

$\rightarrow \hat{X}=\text{argmax}_x P[Y=y|X=x]$ : This is ML, which estimates $Y=y$ when we fortunately get $X=x$ correct.

Next is for continuous random variables:

$\rightarrow \hat{X}=\text{argmax}_x f_X(x|y)$

$\rightarrow \hat{X}=\text{argmax}_x f_Y(y|x)$

Finally, MMSE adds an error variable $\hat{X} = g(Y) \rightarrow e \triangleq X-g(Y)$.

---

### References

[Original Source #1](https://www.youtube.com/watch?v=1JNsCY02QyY&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=14)

[Original Source #2](https://www.youtube.com/watch?v=CXwYlOfNSww&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=15)

[Original Source #3](https://www.youtube.com/watch?v=MQRheH5YShc&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=16)

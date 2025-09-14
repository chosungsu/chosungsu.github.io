---
title: 'Functions of Vector Random Variables'
date: '2024-05-13'
tags: ['Probability&Statistics', 'lecture']
---

### Warm up

$\bar{X}=\begin{bmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{bmatrix}, f_{\bar{X}(\bar{X})}$이 주어져 있을 때, $\bar{Z}=g(\bar{X})$이고 $g : R^n \rightarrow R^m$ 차원이라면 아래의 방법으로 표현이 가능합니다.

1.$z=g(\bar{X})$와 같이 좌항이 스칼라일 때, $F_Z(z)=P[Z \le z]=P[g(x_1, \cdots, x_n) \le z]=\int \cdots \int f_{x_1, \cdots, x_n}(x_1, \cdots, x_n)dx_1dx_2\cdots dx_n$으로 cdf를 계산합니다.

예를 들면 $Z=X+Y$이고 $f_{XY}(x,y)$가 주어져 있을 때, $F_Z(z)=P[Z \le z]=P[Y \le -X+z]$로 전개가 가능합니다. 범위를 보면 $(z, 0), (0, z)$가 축을 지나는 지점인 직선이므로 $\int_{-\infty}^{\infty} \int_{-\infty}^{z-x} f_{XY}(x,y)dydx$로 cdf가 구해지고 pdf는 미분으로 $\int_{-\infty}^{\infty} f_{XY}(x,z-x)dx=(f_X*f_Y)(z)$와 같은 컨볼루션 정의를 갖습니다.

2.$Z=g(X,Y)$에 $f_{XY}(x,y)$가 주어져 있을 때 $Z$에 대한 pdf는 다음과 같이 구합니다. $f_Z(Z)=\int_{-\infty}^{\infty} f_Z(Z|y')*f_Y(y')dy'$로 계산합니다.

예를 들면 $Z=\frac{X}{Y}$이고 random variable인 $X,Y$는 독립일 때, $f_X(x)=e^{-x}, f_Y(y)=e^{-y}$가 주어져 있습니다. $Z$에 대한 pdf를 구하는 것보다 우선 $f_X(x|y)$를 먼저 구해보면 독립이므로 $f_X(x)=e^{-x}$와 같음을 알 수 있습니다. $f_Z(z)=\int \frac{f_X(x|y)}{\frac{dz}{dx}}=\int |y|*f_X(x|y)=\int |y|*e^{-yz}*e^{-y}dy$

---

### Jacobian matrix

$g: R^n \rightarrow R^n$ 차원에서 자코비언(야코비언) 행렬은 아래와 같습니다.

$$
\begin{bmatrix}
\frac{\partial g_1}{\partial x_1} & \frac{\partial g_1}{\partial x_2} &  \cdots & \frac{\partial g_1}{\partial x_n} \\ 
\frac{\partial g_2}{\partial x_1} & \frac{\partial g_2}{\partial x_2} &  \cdots & \frac{\partial g_2}{\partial x_n} \\
\vdots & \vdots & \ddots & \vdots \\
\frac{\partial g_n}{\partial x_1} & \frac{\partial g_n}{\partial x_2} &  \cdots & \frac{\partial g_n}{\partial x_n}
\end{bmatrix}
(x_1 \cdots x_n)
$$

이 자코비언 행렬을 사용하여서 $f_{\bar{Z}}(z_1, \cdots, z_n)$을 구하면 다음과 같습니다.

$f_{\bar{Z}}(z_1, \cdots, z_n)=\frac{f_{\bar{X}}(x_1, \cdots, x_n)}{|\frac{dP}{dx_1 \cdots dx_n}|}(x_1, \cdots, x_n)=h(z_1, \cdots, z_n)$에서 분자의 값은 $|det J(\bar{X})|$으로 자코비언 행렬식입니다.

이에 따라서 문제로 예시를 들어보면 $Z=X_1+X_2+X_3$이고 이 때 $f_Z(z)$값을 구해보면 $Z_1=X_1, Z_2=X_1+X_2, Z_3=X_1+X_2+X_3$이라고 random variable을 세 개로 쪼개어서 계산이 편해지도록 합니다. 이제 $f_{Z_1Z_2Z_3}(z_1, z_2, z_3)=\frac{f_{X_1X_2X_3}(Z_1, Z_2-Z_1, Z_3-Z_2)}{|det J|}$로 계산하게 되면 자코비언 행렬은 우선 다음과 같습니다.

$$
\begin{bmatrix}
1 & 0 & 0 \\
1 & 1 & 0 \\
1 & 1 & 1
\end{bmatrix}
$$

이 자코비언 행렬식의 절댓값은 하삼각행렬로 주대각성분들의 곱으로 $1*1*1=1$임을 알 수 있고, 따라서 위 식을 간단히 하면 $f_Z(z)=f_{Z_3}(z_3)=\int \int f_{X_1X_2X_3}(Z_1, Z_2-Z_1, Z_3-Z_2) d_{z_2}d_{z_1}$으로 정리됩니다.

---

### Expectation

$E[\bar{X}]=\begin{bmatrix} E(X_1) \\ \vdots \\ E(X_n) \end{bmatrix}=\bar{m_{\bar{X}}}$ 를 응용해서 $E[\bar{X}\bar{X}^T]=R_{\bar{X}}$로 correlation matrix를 표현할 수 있고, covariance matrix는 $K_{\bar{X}}=E[(\bar{X}-\bar{m_{\bar{X}}})(\bar{X}-\bar{m_{\bar{X}}})^T]$로 표현할 수 있습니다.

---

### Linear transformation

$$
\bar{Z}=A*\bar{X}
$$

위에서 행렬 $A$는 $m \times n$ 차원이고 $\bar{M_{\bar{Z}}}=E[\bar{Z}]=E[A*\bar{X}]=AE[\bar{X}]=A\bar{M_{\bar{X}}}$로 expectation을 구할 수 있고, $K_{\bar{Z}}=E[(\bar{Z}-\bar{m_{\bar{Z}}})(\bar{Z}-\bar{m_{\bar{Z}}})^T]=E[(A\bar{X}-A\bar{m_{\bar{X}}})(A\bar{X}-A\bar{m_{\bar{X}}})^T]=E[A(\bar{X}-\bar{m_{\bar{X}}})(\bar{X}-\bar{m_{\bar{X}}})^TA^T]=AK_{\bar{X}}A^T$로 covariance matrix를 구할 수 있게 됩니다.

---

### Diagonalization

$$
Av=\lambda v
$$

위 식에서 $A$가 주어져 있을 때 $(A-\lambda)v=0$과 같이 전개할 수 있지만 $v$는 영벡터가 될 수 없습니다. 그렇다면 $A-\lambda I$가 singular 성질을 가져야 하므로 역행렬을 가지면 안 됩니다. 즉, $det (A-\lambda I)=0$이 성립합니다.

만약 위와 같은 식이 다항식으로 존재할 경우, 다음과 같습니다.

$$
Av_1=\lambda_1 v_1, \\
Av_2=\lambda_2 v_2, \\
\vdots \\
Av_n=\lambda_n v_n
$$

위 식을 전개하면 $A[v_1 v_2 \dots v_n]=[v_1 v_2 \dots v_n]\begin{bmatrix} \lambda_1 & 0 & 0 & \cdots & 0 \\ 0 & \lambda_2 & 0 & \cdots & 0 \\ \vdots & \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & 0 & \cdots & \lambda_n \end{bmatrix} \Rightarrow [Av_1 Av_2 \dots Av_n]=[\lambda_1v_1 \lambda_2v_2 \dots \lambda_nv_n]$가 되어 더 간단히 정리하면 $AV=V\Lambda$ 형태로 $V$가 nonsingular이고 invertible하다면 $V^{-1}AV=\Lambda$로도 정리가 됩니다. 이 정리를 diagonalization라고 합니다.

$A$가 대칭행렬이면 서로 독립이고 수직관계인 eigen vector 집합을 찾을 수 있습니다.

예를 들어 행렬 $A$가 $\begin{bmatrix} 3 & 4 \\ 5 & 2\end{bmatrix}$인 경우, $det(A-\lambda I)=det\begin{bmatrix} 3-\lambda & 4 \\ 5 & 2-\lambda\end{bmatrix}=(3-\lambda)(2-\lambda)-20=\lambda^2-5\lambda-14=0$이므로 $\lambda=7, -2$가 eigen value가 됩니다. 이제 각각의 eigen value에 대해 $(A-\lambda I)v=0$을 풀면 $\lambda=7$일 때 $\begin{bmatrix} -4 & 4 \\ 5 & -5\end{bmatrix}\begin{bmatrix} v_1 \\ v_2\end{bmatrix}=0$이므로 $v=\begin{bmatrix} 1 \\ 1\end{bmatrix}$가 되고, $\lambda=-2$일 때 $\begin{bmatrix} 5 & 4 \\ 5 & 4\end{bmatrix}\begin{bmatrix} v_1 \\ v_2\end{bmatrix}=0$이므로 $v=\begin{bmatrix} -4 \\ 5\end{bmatrix}$가 eigen vector가 됩니다.

---

### Estimation

$Y$가 주어진 경우 $X$를 추정하는 것으로 MAP(Maximum a posterior), ML(Maximum likelihood), MMSE(Minimum mean squared error) 등을 사용합니다.

우선 discrete r.v에서는 아래의 방법으로 각각을 해결합니다.

$\rightarrow \hat{X}=\text{argmax}_x P[X=x|Y=y]=\text{argmax}_x \frac{P[Y=y|X=x]P[X=x]}{P[Y=y]}$ : 이는 MAP로서 $Y=y$의 값이 주어진다면 $x$를 추정하는 과정입니다.

$\rightarrow \hat{X}=\text{argmax}_x P[Y=y|X=x]$ : 이는 ML로서 운 좋게 $X=x$를 맞추었고 $Y=y$를 추정하는 과정입니다.

다음은 continuous r.v에서입니다.

$\rightarrow \hat{X}=\text{argmax}_x f_X(x|y)$

$\rightarrow \hat{X}=\text{argmax}_x f_Y(y|x)$

마지막으로 MMSE는 $\hat{X} = g(Y) \rightarrow e \triangleq X-g(Y)$라는 에러변인을 추가합니다.

---

### 참고 자료

[원본 경로 #1](https://www.youtube.com/watch?v=1JNsCY02QyY&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=14)

[원본 경로 #2](https://www.youtube.com/watch?v=CXwYlOfNSww&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=15)

[원본 경로 #3](https://www.youtube.com/watch?v=MQRheH5YShc&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=16)




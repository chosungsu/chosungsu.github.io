---
title: 'Othogonal projection'
date: '2024-05-10'
tags: ['Probability&Statistics', 'lecture']
---

### orthogonal projection

$R^n$의 subspace $L$의 orthogonal complement는 $L^{\bot} = \{x \in R^n : x^Ty=0,  \forall y \in L\}$ 과 같이 정의됩니다. $L^{\bot}$ 역시 $R^n$의 subspace가 되며 $L \cap L^{\bot} = \{0\}$ 이 성립합니다.

$R^n$에 속한 $x$는 $x = x_L + x_{L^{\bot}}$으로 모두 표현이 가능합니다. 이 때 $x_L$은 $L$평면 위로의 $x$ orthogonal projection이라고 합니다.

행렬 $A \in R^{n*n}$은 $A^2 = A$, $A = A^T$를 만족한다면 멱등행렬 또는 투영행렬이라고 합니다. $x$를 $C(A)$로 정사영하면 $Ax$가 되고 이는 직교투영이라고 할 수 있습니다. projection $A$의 널공간과 열공간인 $N(A)$와 $C(A)$는 직교합니다. 즉 $x^Ty=0$를 뒷받침합니다.

위 조건 중 하나라도 만족한다면 $A$를 $C(A)$ 위로의 orthogoanl projection matrix라고 할 수 있습니다.

행렬 $A \in R^{n*n}$가 대칭행렬이라면 $A^2 = A$를 만족하고 모든 eigenvalue가 0 또는 1이며 $rank(A) + rank(I_n-A) = n$이 성립합니다. 여기서 $rank(A) = tr(A)$이며 $I_n-A$는 $C(A)^{\bot} = N(A)$에 대한 orthogonal projection입니다.

그리고 $A$와 $B$ 행렬이 각각 orthogonal projection일 때 $C(A)$와 $C(B)$가 직교한다면 $A + B$도 orthogonal projection이 되고 이 때는 $C(A+B) = C(A) + C(B)$와 $N(A+B) = N(A) \cap N(B)$가 성립합니다. $AB=BA$라면 $AB$가 orthogonal projection이 되고 이 때는 $C(AB) = C(A) \cap C(B)$와 $N(AB) = N(A) + N(B)$가 성립합니다.

정사영 행렬 $H$는 $X = (x_1, ..., x_p)$로 $n*p$ 행렬이고 $rank(X) = p$로 열이 선형독립일 때 $H = X(X^TX)^{-1}X^T$로 정의됩니다. 이는 즉 $X$의 $C(X)$로의 orthogonal projection을 말하고 $H^2=H$와 $C(H) \bot N(H)$, $C(H) = C(X)$가 성립됩니다.

---

### linear regression

$x_i \in R^p$와 $y_i \in R$을 만족하는 $(x_1, y_1), ..., (x_n, y_n)$이 있을 때 목적식은 $\beta_0 + \sum_{j=1}^{p} x_{ij}\beta_j$를 사용하여 $y_i$를 최대화하는 것이고 이를 위해 최소자승법(LSE)를 사용하여 $min_{\beta_0, \beta_1, ..., \beta_p} \sum_{i=1}^{n} (y_i - \beta_0 - \beta_0 + \sum_{j=1}^{p} x_{ij}\beta_j)^2$으로 구하게 됩니다.

종속 변수 $y = (y_1, ..., y_n)^T$로 이루어진 $n$차원 열벡터이고 $X$는 $n*(p+1)$ 행렬로 각 행은 $(1, x_i^T)$로 구성하도록 하여 최소제곱추정량을 구현하면 $\hat{\beta} = argmin_{\beta \in R^{p+1}} |y-X\beta|^2_2$ 즉, 실제값 $y$와 예측값 $X\beta$ 사이의 오차를 최소화하는 것을 목적으로 합니다.

해가 존재하고 유일한 조건으로 $X$의 rank가 $p$일 경우 열들이 선형 독립이면 최소제곱해는 $\hat{\beta} = (X^TX)^{-1}X^Ty$로 해석적으로 구할 수 있습니다.

fitted value를 정의하면 $\hat{y} = X\hat{\beta} = Hy$로 예측값 $\hat{y}$를 $C(X)$로 직교투영한 값이 됩니다.

입력 변수들을 아래와 같이 중심화하고,

$$
1^Tx_j = \sum_{i=1}^{n}x_{ij} = 0, \forall j
$$

각 열 $x_j$의 평균을 0으로 전처리한 이후 절편 $\hat{\beta_0} = \frac{1}{n} \sum_{i=1}^{n} y_i$와 같이 단순히 종속변수 $y$의 평균이 되게 됩니다.

또한 각 열의 벡터들이 orthogonal일 때 즉, $x_i^Tx_j = 0$이 만족된다면 회귀계수 $\hat{\beta_j} = \frac{x_j^Ty}{|x_j|^2_2}$와 같이 closed form으로 계산이 됩니다. 이는 각 독립변수 $x_j$에 대해 별도 계산이 가능하다는 의미입니다.

---

### multiple regression

$p=1$인 linear regression에서 $\hat{\beta_1} = \frac{(x_1-\bar{x_1}1)^Ty}{|x_1-\bar{x_1}1|^2_2}$와 같은 정의에 의해 $\bar{x_1} = \frac{1}{n} \sum_{i=1}^{n} x_{i1}$은 $x_1$의 평균을 의미하고 분자의 내용은 입력벡터의 중심화 과정임을 알 수 있습니다.

이를 orthogonalization 관점에서 보면, 

$z_0 = x_0 = 1$로 상수항 벡터로 시작을 하고 $j = 1,...,p$까지 반복하여 입력변수에 대해 직교화를 수행하도록 합니다. 기존 직교 벡터들에 이전 직교 벡터인 $z_0, ..., z_{j-1}$에 회귀시켜서 계수룰 $\hat{\gamma_{lj}} = \frac{z_l^Tx_j}{|z_l|^2_2}, \{l=0, ..., j-1\}$으로 계산합니다. 이어서 이미 존재하는 직교 벡터들의 영향을 제거하는 $z_j = x_j - \sum_{k=0}^{j-1} \hat{\gamma_{kj}}z_k$ 과정을 거치면 $z_j$가 $z_0, ..., z_{j-1}$과 직교벡터가 됩니다. 마지막으로 y를 마지막 직교 벡터인 $z_p$에 회귀하면 됩니다.

위 방법은 gram-schmidt orthogonalization과 동일하게 진행됩니다.

---

### qr decomposition

회귀행렬 X는 다음과 같이 분해됩니다.

$$
X=Z\Gamma=ZD^{-1}D\Gamma\overset{\underset{\mathrm{def}}{}}{=}QR, \\
\Gamma = \hat{\gamma_{kj}}, \\
Z = (z_0, ..., z_p), \\
D = diag(|z_j|_2)
$$

gram-schmidt orthogonalization을 통해 얻은 $Z$, $\Gamma$와 같은 지표를 조합하면 qr분해를 도출할 수 있습니다.

qr분해를 활용하면 선형 회귀의 해인 $\hat{\beta}$를 아래와 같이 계산할 수 있습니다.

$$
\hat{\beta} = R^{-1}Q^Ty
$$

직교행렬 $Q$와 upper triangular 행렬 $R$을 사용하여 계산이 빠르다는 장점이 있습니다. 또한 예측값은 $\hat{y}=QQ^Ty$로 구할 수 있습니다. 이 때 $QQ^T$는 정사영 행렬 $H$이므로 $y$를 $C(X)$에 정사영한 결과와 동일함을 알 수 있습니다.

---

### 참고 자료

[원본 경로 #1](https://www.dropbox.com/scl/fi/n5vx00s5zhq407a22mi07/Chap3-orthogonalProjection.pdf?rlkey=7fk15l1a77n8uxzzvw2nqtf7u&e=2&dl=0)




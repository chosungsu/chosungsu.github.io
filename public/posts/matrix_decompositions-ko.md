---
title: 'matrix decompostions'
date: '2024-05-06'
tags: ['Probability&Statistics', 'lecture']
---

### spectral decomposition

symmetric matrix $A \in R^{n*n}$이 있을 때 diagonal matrix $D$와 orthogonal matrix $V$가 존재한다면 $A = VDV^T$로 계산이 가능합니다.

diagonal matrix D = diag($d1, ..., d_n$)에서 $d_i \in R$은 $A$행렬의 eigenvaue입니다.

---

### singular value decomposition

$n*p$ 행렬 $A$와 $n*p$ 행렬 $U$, $p*p$ 행렬 $D$와 $V$가 있을 때 $A = UDV^T$로 계산이 가능합니다.

이 때 $C(U) = C(A)$이고 $C(V) = R(A)$를 만족합니다. d 집합은 $A$의 singular values입니다. 그리고 $A^TA = VD^2V^T$로 spectral decompostion을 이용한 증명도 가능합니다.

$rank_1$ svd는 $f(x,y,s) = |A-sxy^T|^2_F$를 최소화하는 과정입니다. 여기서 $x \in R^m$, $y \in R^n$이면서 $|x|_2 = |y|_2 = 1$, $s > 0$을 만족합니다.

bi-convex 문제는 $min_{x,y} f(x,y)$와 같은 구조로 변수가 두 부분으로 나뉘며 하나의 변수가 고정되면 다른 하나에 대해 convex 형태가 되는 문제입니다. 이는 전체적으로 convex가 아니게 되므로 일반적으로 해결할 수 없습니다.

따라서 alternate convex search(ACS)라는 방법으로 근사 해를 구할 수 있습니다. $y^0$을 고정하고 $x^t = \frac{Ay^{t-1}}{|Ay^{t-1}|_2}$, $y^t = \frac{Ax^{t}}{|Ax^{t}|_2}$, $s = |Ax^t|_2$로 업데이트를 합니다. 이 때 $y^0$이 가장 큰 특이벡터에 orthogonal이 아닌 한, ($x^t, y^t$)는 행렬 $A$의 좌우측 특이벡터로 수렴합니다. 좌측은 AA^T, 우측은 A^TA의 eigenvectors이고 acs 알고리즘은 아래와 같이 가장 큰 eigenvector를 찾는데 사용합니다.

$$
y^{t+1} = \frac{A^TAy^T}{|A^TAy^T|_2} \And \\
x^{t+1} = \frac{AA^Tx^T}{|AA^Tx^T|_2}
$$

그리고 일반적으로 이 알고리즘은 global minimum으로의 수렴을 보장하지 않습니다.

---

### pca

pca는 분산을 최대화하는 방향을 찾는 방법입니다.

$\alpha \in R^p$ 인 $\alpha$ 를 사용하여 $\widehat{Var}(X\alpha) = \frac{1}{n} \sum_{i=1}^{n} (x_i^T\alpha)^2$로 계산을 합니다. 이 때 $x_i$는 $X$의 $i$번째 row 원소입니다.

---

### low rank approximation

singular value decomposition 수식을 아래와 같이 풀어서 보이면,

$$
A = \begin{bmatrix} u_1 \cdots u_p \end{bmatrix}\begin{bmatrix} d_1 & &  \\ & \ddots & \\ & & d_p \end{bmatrix}\begin{bmatrix} v_1 \\ \vdots \\ v_p \end{bmatrix}
$$

여기서 $d$의 집합은 내림차순이고 $rank_1$ 행렬들의 합으로 표현됩니다.

$rank_k$로 low rank approximation을 하게 되면, 전체 $rank_p$가 아닌 상위 $k$개의 항만 사용하기 때문에 $A_k = d_1u_1v_1^T + ... + d_ku_kv_k^T$로 나타낼 수 있습니다. 이 때 행렬 크기를 측정하는 norm인 frobenius norm은 $|A-A_k|^2_F = tr((A-A_k)^T(A-A_k)) = d^2_{k+1} + ... + d_p^2$로 구해질 수 있습니다.

---

### 참고 자료

[원본 경로 #1](https://www.dropbox.com/scl/fi/b81pds38d2tvah4y0up35/Chap2-matrixDecomposition.pdf?rlkey=skoitzkzn1lklb9gyfgj7m5fp&e=1&dl=0)

[원본 경로 #2](https://simplecode.kr/80)




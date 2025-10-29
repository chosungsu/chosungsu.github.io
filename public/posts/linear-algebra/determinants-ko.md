---
title: 'Determinants'
date: '2023-03-06'
tags: ['Linear algebra', 'lecture']
---

### Warm up

행렬식은 정사각 행렬을 단 하나의 숫자로 축약합니다. 이 숫자로 가역적인지 아닌지 결정하게 됩니다. $M$이 $1 \times 1$ 행렬이면, $M = (m) \implies M^{-1} = (1/m)$입니다. $M$이 $2 \times 2$ 행렬일 때 역행렬은 $M^{-1} = \frac{1}{m^1_1m^2_2 - m^1_2m^2_1} \begin{pmatrix} m^2_2 & -m^1_2 \\ -m^2_1 & m^1_1\end{pmatrix}$이 되고 따라서 $m^1_1 m^2_2 - m^1_2 m^2_1 \ne 0$일 때만 가역적입니다.

---

### Permutations

순열이란 $1 \sim n$까지 레이블된 객체를 섞는 것을 말합니다. $\sigma = [\sigma(1) \sigma(2) \sigma(3) \sigma(4) \sigma(5)]$로 표현할 수 있고 순열의 배치는 $n!$개의 경우가 존재합니다. 순열을 교환하는 횟수는 동일한 홀짝성(parity)를 갖게 되어 횟수가 짝수이면 짝순열(even permutation), 홀수이면 홀순열(odd permutation)이라고 불립니다. 사실 모든 $n \ge 2$에 대해 $n!$은 짝수이며 순열의 정확히 절반은 짝수이고 나머지는 홀수일 것입니다.

정의 부호 함수(sign function)에서는 순열을 1(even), -1(odd)로 범위를 지정할 수 있습니다. 정사각 행렬 $M$의 행렬식을 다음과 같이 표현이 됩니다.

$$
det M = \sum_{\sigma} sgn(\sigma) m^1_{\sigma(1)} m^2_{\sigma(2)} \cdots m^n_{\sigma(n)}
$$

위 수식은 $n$개의 객체에 대한 모든 순열에 대한 것으로 각 항은 행렬의 $n$개의 성분의 곱이며 각 인수는 서로 다른 행에서 왔습니다. 만약 $M$이 대각행렬이면 $i \ne j$일 때의 인수인 $M^i_j=0$이 되므로 행렬식이 $m^1_1 m^2_2 \cdots m^n_n$이 됩니다. 그리고 행을 교환하면 행렬식의 부호는 바뀝니다.

---

### Elementary Matrices and Determinants

임의의 행렬 $M$과 행 연산 후 $M'$에 대해 기본 행렬 $E$를 곱하면 $M'=EM$이 됩니다.

#### Row swap

$$
M = \begin{pmatrix} \vdots \\ R_i \\ \vdots \\ R_j \\ \vdots\end{pmatrix}, 
M' = \begin{pmatrix} \vdots \\ R_j \\ \vdots \\ R_i \\ \vdots\end{pmatrix}
$$

이 두 행렬이 있다면 기본 행렬을 $\begin{pmatrix} 1 & \cdots & \cdots & \cdots & 0 \\ 0 & 0 & \cdots & 1 & 0 \\ 0 & 1 & \cdots & 0 & 0 \\ 0 & 0 & \cdots & 0 & 1\end{pmatrix}$와 같이 $i$, $j$ 행이 교환된 항등 행렬이 되며 한 쌍의 행을 교환하면 행렬식의 부호가 바뀌므로 $det E^i_j = -1, det M' = -det M$처럼 변경되는 것을 알고 있습니다.

하지만 $det E^i_j = -1, M' = E^i_j M$이므로 $det E^i_jM = det E^i_j det M$처럼 곱 분배가 가능합니다.

#### Row Multiplication

행에 스칼라를 곱한다면 $R^i(\lambda)$에 대해 $i$번째 대각 성분이 $\lambda$로 대체된 항등 행렬이라고 가정할 때, $M' = R^i(\lambda)M$이라고 표현할 수 있습니다.

행렬식으로 살펴보면 $det M' = \lambda \sum_{\sigma} sgn(\sigma) m^1_{\sigma(1)} \cdots m^n_{\sigma(n)} = \lambda det M$임을 증명할 수 있습니다.

#### Row Addition

마지막으로 $R_i$에 $\mu R_j$를 더하는 행 덧셈입니다. 이는 $i, j$ 위치에 추가적인 $\mu$가 있는 항등 행렬인 기본 행렬 $S^i_j(\mu) = \begin{pmatrix} 1 & \cdots & \cdots & \cdots & 0 \\ 0 & 1 & \cdots & \mu & 0 \\ 0 & 0 & \cdots & 1 & 0 \\ 0 & 0 & \cdots & 0 & 1\end{pmatrix}$로 정의됩니다. 행렬 $M$에 이 기본 행렬을 곱하면 행 덧셈이 시행되며 해당 행에는 $R_i + \mu R_j$로 값이 변합니다.

이제 행렬식을 구해보면 $det M' = \lambda \sum_{\sigma} sgn(\sigma) m^1_{\sigma(1)} \cdots (m^i_{\sigma(i)} + \mu m^j_{\sigma(i)}) \cdots m^n_{\sigma(n)} = det M + \mu det M''$로 합을 쪼갤 수 있게 되면서 $M''$는 두 개의 동일한 행$(i,j)$을 가지므로 행렬식은 0으로 이해하면 됩니다. 따라서 $det M' = det M$의 결과가 생깁니다.

#### Determinant of Products

기본 행렬 $E^i_j, R^i(\lambda), S^i_j(\mu)$는 $R^i(0)$을 제외하고 모두 가역적입니다. 사실, 기본 행렬의 역행렬은 또 다른 기본 행렬입니다.

$M, N$이 모두 $n \times n$ 정사각 행렬이고 기본 행렬 $E_i, F_i$에 대해 기약 행사다리꼴이 $M = E_1 E_2 \cdots E_k RREF(M), N = F_1 F_2 \cdots F_k RREF(N)$을 만족하고 항등 행렬이라면 $det(MN) = det(E_1) \cdots det(E_k)det(I)det(F_1) \cdots det(F_l)det RREF(N) = det(M)det(N)$처럼 계산이 됩니다.

그렇지 않으면, $M$은 가역적이지 않고 $\text{det } M = 0 = \text{det } RREF(M)$입니다. 그러면 $RREF(M)$에 0으로만 이루어진 행이 존재하므로, 임의의 $\lambda$에 대해 $R^n(\lambda) RREF(M) = RREF(M)$입니다. 

---

### Properties of the Determinant

이제 행렬의 행렬식(determinant)이 0이 아닐 때에만 그리고 그 때에만 그 행렬이 가역적(invertible)이라는 것을 알고 있습니다. 또한 행렬식은 $\text{det}(MN) = \text{det } M \text{ det } N$이라는 의미에서 곱셈적 함수(multiplicative function)라는 것도 알고 있습니다. 이제 행렬식을 계산하는 몇 가지 방법을 고안할 것입니다.

정사각행렬 $M$의 소행렬식은 $M$에서 한 행과 한 열을 제거하여 얻은 모든 정사각행렬의 행렬식입니다. 특히 임의의 성분 $m^i_j$는 $M$의 $i$행과 $j$열을 제거하여 얻은 소행렬식과 관련됩니다.

$$
\begin{aligned}
& det M = m^1_1 \sum_{\sigma'_1} sgn(\sigma'_1) m^2_{\sigma'_1(2)} \cdots m^n_{\sigma'_1(n)} \\
&+ m^1_1 \sum_{\sigma'_1} sgn(\sigma'_1) m^2_{\sigma'_1(2)} \cdots m^n_{\sigma'_1(n)} \\ 
&+ m^1_2 \sum_{\sigma'_2} sgn(\sigma'_2) m^2_{\sigma'_2(1)} \cdots m^n_{\sigma'_2(n)} \\ 
&+ \cdots
\end{aligned}
$$

따라서 행렬식을 위와 같이 소행렬식으로 나타내는 것이 가능합니다. 여기서 기호 $\sigma'_k$는 입력 $k$가 제거된 순열 $\sigma$를 나타냅니다. 여전히 $\sum_{\sigma'_j}$를 이 소행렬식의 행렬 성분의 열 번호 순열에 대한 합으로 대체해야 합니다. 이 작업은 $j-1$이 홀수일 때마다 마이너스 부호를 발생시킵니다. 즉, 소행렬식 전개(expansion by minors)를 하기 위해 첫 번째 행의 성분 $m^1_j$를 선택한 다음, $i$행과 $j$열이 삭제된 행렬의 행렬식에 $(-1)^{j-1}$을 곱한 것을 더합니다.

예를 들면 아래와 같습니다.

$$
M = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9\end{pmatrix} \\
\downarrow \\ 
det M= 1 det M^1_1 -2 det M^1_2 + 3 det M^1_3 = 0
$$

역행렬의 행렬식은 $M$과 $N$을 $n \times n$ 행렬이라고 정의하고 $\text{det}(MN) = \text{det } M \text{ det } N$이고 $\text{det } I = 1$임을 알고 있기 때문에 $1 = \text{det } I = \text{det}(MM^{-1}) = \text{det } M \text{ det } M^{-1}$입니다. 따라서 $\text{det } M^{-1} = \frac{1}{\text{det } M}$로 행렬식이 정의됩니다.

---

### 참고 자료

[원본 경로 #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[원본 경로 #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)
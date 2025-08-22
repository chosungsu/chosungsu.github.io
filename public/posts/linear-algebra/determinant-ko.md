---
title: 'Determinant'
date: '2023-03-10'
tags: ['Linear algebra', 'lecture']
---

### Definition of determinant

자연수 집합 $S$의 치환(순열, permutation)이란 일대일 대응함수로 갯수는 모두 $n!$입니다.

치환에서 반전(inversion)이란 큰 자연수가 작은 자연수보다 더 왼쪽에 나타나는 경우를 말합니다.

치환이 가진 반전의 총 갯수가 짝수이면 짝치환, 홀수이면 홀치환이라고 합니다. 이 때 짝과 홀에 따라서 $\{+1, -1\}$에 대응시키는 것을 부호화 함수라고 합니다.

위의 원리를 이용하여 행렬식을 구하는 과정은 아래와 같습니다.

$$
det(A)=\sum_{\sigma \in S_n}sgn(\sigma)\sigma_{1\sigma(1)}...\sigma_{n\sigma(n)}
$$

위 수식처럼 각 원소의 곱 앞에는 부호화 함수를 배치시켜 계산이 됩니다.

정사각행렬 $A$의 행렬식과 전치행렬 $A^T$의 행렬식은 같습니다. 그리고 $A$의 두 행이나 열이 일치할 때나 한 행의 성분이 모두 0일 때 행렬식은 0입니다.

$A$가 $n$차의 삼각행렬이면 행렬식은 주대각 성분의 곱과 같습니다. 가역행렬 $A$의 역행렬 행렬값은 $A$행렬의 행렬값의 역수입니다.

---

### Determinants of matrices

$$
a_{11}x_1+a_{12}x_2=b_1 \\
a_{21}x_1+a_{22}x_2=b_2
$$

일반적인 $2 \times 2$ 선형 시스템이 있을 때 기본 행 연산을 끝내면 해를 다음과 같이 보일 수 있습니다.

$$
x_1=\frac{b_1a_{22}-b_2a_{12}}{a_{11}a_{22}-a_{12}a_{21}}, \\
x_2=\frac{b_2a_{11}-b_1a_{21}}{a_{11}a_{22}-a_{12}a_{21}}
$$

이 수식을 통해서 $a_{11}a_{22}-a_{12}a_{21}$은 매우 중요한 역할을 하고 있음을 알 수 있고 행렬로 표현이 가능하므로 $A=\begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{bmatrix}$의 따라서 determinant값은 $a_{11}a_{22}-a_{12}a_{21}$이라고 할 수 있습니다.

예를 들어 $det(A)=\begin{vmatrix} 3 & -1 \\ 8 & 2 \end{vmatrix}=(3)*(2)-(8)*(-1)=14$와 같이 계산이 됩니다.

이제 $3 \times 3$ 선형 시스템이 있을 때 해는 다음과 같이 보일 수 있습니다.

$$
x_1=\frac{\text{Numerator1}}{D}, \\
x_2=\frac{\text{Numerator2}}{D}, \\
x_3=\frac{\text{Numerator3}}{D}
$$

$D=a_{11}(a_{22}a_{33} - a_{23}a_{32}) - a_{12}(a_{21}a_{33}-a_{23}a_{31})+a_{13}(a_{21}a_{32}-a_{22}a_{31})$로 괄호 안이 $2 \times 2$행렬식임을 알 수 있습니다. 따라서 여인수를 $C_{jk}=(-1)^{j+k} det(A_{jk})$로 정의하면 determinant를 다음과 같이 정의할 수 있습니다. $det(A)=a_{11}C_{11}+a_{12}C_{12}+a_{13}C_{13}$입니다.

---

### $n \times n$ matrices

행렬 $A$를 $n \times n$ 행렬이라고 하면 $A_{jk}$는 $j$행과 $k$열을 삭제하여 얻은 $(n-1) \times (n-1)$ 행렬이 됩니다. 따라서 determinant가 $det(A)=a_{11}C_{11}+a_{12}C_{12}+a_{13}C_{13}$로 정의가 되는 것을 위에서 확인했습니다. 그리고 모든 원소가 0인 행 또는 열이 포함되어 있다면 determinant값은 0입니다. 그리고 일부가 0인 행을 기준으로 전개하는 것이 가장 간단하게 전개가 된다는 점이 중요합니다.

$$
A=\begin{bmatrix}
1 & 3 & 0 & -2 \\
1 & 2 & -2 & -1 \\
0 & 0 & 2 & 1 \\
-1 & -3 & 1 & 0
\end{bmatrix}
$$

위 행렬식에 대해서 세번째 행을 따라 전개하면 $det(A)=0*det(A_{31})-0*det(A_{32})+2*det(A_{33})-1*det(A_{34})=2*(1*\begin{vmatrix}
2 & -1 \\
-3 & 0
\end{vmatrix}-3*\begin{vmatrix}
1 & -1 \\
-1 & 0
\end{vmatrix}-2*\begin{vmatrix}
1 & 2 \\
-1 & -3
\end{vmatrix}) - (
1*\begin{vmatrix}
2 & -2 \\
-3 & 1
\end{vmatrix}-3*\begin{vmatrix}
1 & -2 \\
-1 & 1
\end{vmatrix}-0*\begin{vmatrix}
1 & 2 \\
-1 & -3
\end{vmatrix}
)=5$로 구해집니다.

---

### Triangular matrices

정방행렬 $A \in \mathbb{R}^{n \times n}$에서 $j > k$일 때 $a_{jk}=0$이면 이 행렬은 상삼각행렬이라고 합니다. 반대의 경우에는 하삼각행렬입니다.

$$
A=\begin{bmatrix}
a_{11} & a_{12} & a_{13} & a_{14} \\
0 & a_{22} & a_{23} & a_{24} \\
0 & 0 & a_{33} & a_{34} \\
0 & 0 & 0 & a_{44}
\end{bmatrix}
$$

예를 들어 $4 \times 4$ 상삼각행렬이 위와 같은 형태일 때 determinant값은 $a_{11}*\begin{vmatrix}
a_{22} & a_{23} & a_{24} \\
0 & a_{33} & a_{34} \\
0 & 0 & a_{44}
\end{vmatrix}=a_{11}*(a_{22}*(a_{33}a_{44}-0))$이 됩니다.

---

### Cramer's formula

이 공식은 미지수와 방정식의 개수가 같은 선형연립방정식에 적용합니다.

예를 들어 $x=\{x_1, x_2, …, x_n\}$이고 $b=\{b_1, b_2, …, b_n\}$이면 연립방정식 $Ax=b$로 나타낼 수 있게 되고 $x_1=\frac{|A_1|}{|A|}$, $x_2=\frac{|A_2|}{|A|}$와 같이 유일해를 갖게 됩니다. 이 때 분자는 $j$열의 원소들을 b값으로 바꾼 $A$행렬을 사용합니다.

---

### Eigenvalue and eigenvector

$$
Ax=\lambda x
$$

$n$차의 정사각행렬 $A$에 대해서 0이 아닌 스칼라 $\lambda$를 고유값이라고 하고 $x$를 $\lambda$에 대응하는 벡터가 될 때 이를 고유벡터라고 합니다.

이를 구하는 일반적인 방법으로는 동차연립방정식을 이용하는 것으로 $(\lambda-A)x=0$으로 만들어서 계산하고 $x$와 곱하는 방정식을 특성방정식이라고 합니다.

동차연립방정식의 해공간을 $\lambda$에 대응하는 $A$의 고유공간이라고 합니다.

---

### 참고 자료

[원본 경로 #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[원본 경로 #2](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)
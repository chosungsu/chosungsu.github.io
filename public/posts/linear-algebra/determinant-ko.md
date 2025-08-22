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

### ERO and Determinants

행렬 $A \in \mathbb{R}^{n \times n}$에 대해, 우리는 행렬식 $det A$를 다음과 같이 정의하였습니다.

$$
det A=a_{j1}C_{j1}+a_{j2}C_{j2}+ \cdots + a_{jn}C_{jn}
$$

-내적으로도 표현할 수 있으므로 $det A=a_j*c_j^T$가 됩니다.

-그리고 $A$의 두 행을 교환하여 얻은 행렬을 $B$라고 하면 $det B=-det A$가 성립합니다.

예를 들어 $A = \begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{bmatrix}$이고, 두 행을 교환하여 얻은 $B = \begin{bmatrix} a_{21} & a_{22} \\ a_{11} & a_{12} \end{bmatrix}$라 하면 $det B=a_{21}a_{12}-a_{22}a_{11}=-(a_{11}a_{22}-a_{12}a_{21}) =-det A$로 $2 \times 2$는 쉽게 증명이 됩니다.

-$A$의 한 행에 스칼라 $\beta$를 곱하여 얻은 행렬이 $B$라 하면 $det B=\beta*det A$가 성립합니다.

예를 들어 $A$의 $j$번째 행에 $\beta$를 곱하여 $B$를 얻었다고 가정하면 $j$번째 행을 제외한 나머지 행들은 동일하므로 $det B=(\beta*a_j)*c_j^T=\beta*det A$임을 증명할 수 있습니다.

-$A$의 $k$번째 행에 $\beta$를 곱하여 $j$번째 행에 더하여 얻은 행렬을 $B$라고 하면 $detB=detA$가 성립합니다.

예를 들어 임의의 행 벡터 $r = \begin{bmatrix} r_1 & r_2 & \dots & r_n \end{bmatrix}$와 행렬 $A$에 대해 표현식 $r \cdot c_j^T = r_1C_{j1} + r_2C_{j2} + \dots + r_nC_{jn}$은 $A$의 $j$번째 행을 $r$로 대체하여 얻은 행렬의 행렬식과 같습니다. 따라서 만약 $k \ne j$이면 $a_k*c_j^T=0$입니다. 그 이유는 두 행을 서로 대체하면 두 개의 동일한 행이 생기기 때문입니다. $B$의 $j$번째 행은 $b_j=a_j+\beta*a_k$가 되어 전개하면 $det B=(a_j+\beta*a_k)*c_j^T=(a_j*c_j^T)+\beta*(a_k*c_j^T)=det A+\beta(0)=det A$가 성립합니다.

---

### Properties of the Determinant

정사각 행렬 $A$가 가역일 필요충분 조건은 $det A \ne 0$입니다. 만약 $A_p$가 삼각 행렬이면 행렬식은 주대각선 원소들의 곱으로 각 원소들이 모두 0이 아니면 $det A = det A_p \ne 0$이고 이 경우 $A_p$에는 $n$개의 선행 원소가 있으므로 가역이 성립합니다. 그렇지 아니하고 원소 중 하나가 0이면 $r<n$ 개의 선행 원소가 있으므로 가역이 아닙니다.

$A \in \mathbb{R}^{n \times n}$이고 $B=\beta*A$일 때 $det B = \beta^n * det A$가 성립합니다. 예를 들어 $2 \times 2$ 행렬에서 $det (\beta*A)=(\beta*a_{11})(\beta*a_{22})-(\beta*a_{12})(\beta*a_{21})=\beta^2*detA$로 증명이 됩니다.

---

### Cofactor method

행렬 $A \in \mathbb{R}^{n \times n}$에 대해 여인수에 대해서는 수차례 다음과 같이 정의를 하였습니다. $C_{jk} = (-1)^{j+k} \det A_{jk}$가 행렬 $A$의 $j$번째 행, $k$번째 열에 대한 여인수로 여인수행렬을 다음과 같이 구성합니다.

$$
\text{Cof(A)}= \begin{bmatrix}
C_{11} & C_{12} & \cdots & C_{1n} \\
C_{21} & C_{22} & \cdots & C_{2n} \\ 
\vdots & \vdots & \ddots & \vdots \\
C_{n1} & C_{n2} & \cdots & C_{nn}
\end{bmatrix}
$$

행렬과의 곱은 $A(Cof(A))^T=detA*I_n$으로 간단히 할 수 있습니다. $det A \ne 0$이면 나눠질 수 있으므로 $A^{-1}=\frac{1}{det A}*(Cof(A))^T$로 볼 수 있으므로 예를 들어 $A^{-1}=\frac{1}{ad-bc}*\begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$입니다.

---

### Cramer's formula

이 공식은 계수 행렬이 가역인 선형 시스템의 해를 찾기 위한 명시적인 공식입니다. 즉, 행렬 $A$가 가역이라면 $x=A^{-1}b$를 이용해야 합니다.

위에서 나온 여인수 공식에 따르면 $A^{-1}=\frac{1}{det A}*(Cof(A))^T$이므로 $x=\frac{1}{det A}*\begin{bmatrix}
C_{11} & C_{12} & \cdots & C_{1n} \\
C_{21} & C_{22} & \cdots & C_{2n} \\ 
\vdots & \vdots & \ddots & \vdots \\
C_{n1} & C_{n2} & \cdots & C_{nn}
\end{bmatrix} * \begin{bmatrix} b_1 \\b_2 \\ \vdots \\ b_n \end{bmatrix}$과 같이 쓸 수 있습니다.

이제 해의 첫번째 성분을 전개하면 $x_1=\frac{1}{det A}*(b_1C_{11} + b_2C_{21} + \cdots + b_nC_{n1})$인데 괄호 안의 값은 행렬 $A$의 첫번째 열을 $b$로 대체하여 얻은 행렬식과 같습니다. 따라서 이를 요약한 것이 Cramer's formula입니다.

$$
x=\frac{1}{det A}*\begin{bmatrix}
det A_1 \\
det A_2 \\
\vdots \\
det A_n
\end{bmatrix}
$$

---

### 참고 자료

[원본 경로 #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[원본 경로 #2](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)
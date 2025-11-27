---
title: 'Determinants'
date: '2023-03-06'
tags: ['Linear algebra', 'lecture']
---

### The Properties of Determinants

$\Rightarrow$ $n \times n$ 항등 행렬 $\mathbf{I}$의 행렬식은 1입니다.

$\Rightarrow$ 행렬의 두 행을 교환하면 행렬식의 부호가 바뀝니다.

$\Rightarrow$ 행렬식은 한 행에 대해서만 선형입니다. 따라서 한 행에 스칼라 $t$를 곱하면 행렬식 전체에 $t$가 곱해집니다. 그리고 한 행이 두 벡터의 합일 때, 행렬식은 두 행렬식의 합으로 분리됩니다.

$\Rightarrow$ 두 행이 같으면 $\det(\mathbf{A}) = 0$입니다.

$\Rightarrow$ 한 행이 모두 0이면 $\det(\mathbf{A}) = 0$입니다.

---

### Permutations and Cofactors

#### The Pivot Formula

행 교환을 포함하여 소거를 수행할 때 $\det(\mathbf{A}) = \pm (d_1 d_2 \cdots d_n)$이 정의되는데 여기서 $d_1, \dots, d_n$은 $\mathbf{A}$의 피벗입니다. $k$번째 피벗 $d_k$는 좌측 상단의 $k \times k$ 부분 행렬 $\mathbf{A}_k$의 행렬식과 관련이 있습니다.

$$
d_k = \frac{\det(\mathbf{A}_k)}{\det(\mathbf{A}_{k-1})}
$$

#### The Big Formula

$\det(\mathbf{A})$는 모든 $n!$ 개의 순열에 대한 항의 합입니다. 각 항은 행렬에서 각 행과 각 열에서 하나씩 성분을 선택하여 곱한 것입니다.

$$
\det(\mathbf{A}) = \sum (\det P) a_{1\alpha} a_{2\beta} \cdots a_{n\omega}
$$

$n \times n$ 행렬식은 $n!$ 개의 항의 합으로, 각 항에는 $\pm 1$ 부호가 붙습니다. 예를 들어 $n=2$일 때, $2! = 2$개의 항으로 $\det \begin{vmatrix} a & b \\ c & d \end{vmatrix} = +a_{11}a_{22} - a_{12}a_{21} = ad - bc$와 같이 계산이 됩니다.

#### The Cofactor Formula

행렬식은 어느 한 행 또는 한 열을 따라 전개할 수 있습니다. $\mathbf{A}$의 $i$행 $j$열 성분 $a_{ij}$에 대한 여인수(Cofactor) $C_{ij}$는 다음과 같이 정의됩니다.

$$
\mathbf{C}_{ij} = (-1)^{i+j} \det(\mathbf{M}_{ij})
$$

$\mathbf{M}_{ij}$는 $\mathbf{A}$에서 $i$행과 $j$열을 제거한 $(n-1) \times (n-1)$ 소행렬식(minor)입니다.

---

### Cramer's Rule, Inverses, and Volumes

#### Cramer's Rule

크라머 공식은 행렬식을 사용하여 선형 시스템 $\mathbf{A}\mathbf{x} = \mathbf{b}$의 해 $\mathbf{x}$의 각 성분 $x_j$를 구하는 방법입니다.

$$
x_j = \frac{\det(\mathbf{B}_j)}{\det(\mathbf{A})}
$$

여기서 $\mathbf{B}_j$는 행렬 $\mathbf{A}$의 $j$번째 열을 벡터 $\mathbf{b}$로 교체한 행렬입니다.

#### The Formula for $\mathbf{A}^{-1}$

크라머 공식을 이용하여 $\mathbf{A}\mathbf{A}^{-1} = \mathbf{I}$의 해를 구하면, $\mathbf{A}^{-1}$의 각 성분은 $\mathbf{A}$의 여인수(Cofactor)를 사용하여 표현됩니다. $\mathbf{A}^{-1}$의 $i, j$ 번째 성분 $(\mathbf{A}^{-1})_{ij}$는 다음과 같습니다.

$$
(\mathbf{A}^{-1})_{ij} = \frac{\mathbf{C}_{ji}}{\det(\mathbf{A})}
$$

여기서 $\mathbf{C}_{ji}$는 행렬 $\mathbf{A}$의 $j$행 $i$열 여인수입니다.

#### 외적, The Cross Product

외적(Cross Product) $\mathbf{w} = \mathbf{u} \times \mathbf{v}$는 3차원 벡터 공간에만 존재하는 연산이며, 결과는 벡터입니다.

$$
\begin{aligned}
&\mathbf{w} = \mathbf{u} \times \mathbf{v} \\
&= \det \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \end{vmatrix} = (u_2v_3 - u_3v_2)\mathbf{i} - (u_1v_3 - u_3v_1)\mathbf{j} + (u_1v_2 - u_2v_1)\mathbf{k}
\end{aligned}
$$

외적 벡터 $\mathbf{w} = \mathbf{u} \times \mathbf{v}$는 $\mathbf{u}$와 $\mathbf{v}$ 모두에 수직입니다. 그리고 $\mathbf{v} \times \mathbf{u} = -(\mathbf{u} \times \mathbf{v})$입니다. $\mathbf{u} \times \mathbf{v}$의 길이는 $\mathbf{u}$와 $\mathbf{v}$가 만드는 평행사변형의 넓이와 같습니다.

---

### 참고 자료

[원본 경로 #1](https://renessans-edu.uz/files/books/2023-12-04-11-33-41_46e7ce28c81d5c62d59b34ccc1c6f465.pdf)

[원본 경로 #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)

[원본 경로 #3](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)
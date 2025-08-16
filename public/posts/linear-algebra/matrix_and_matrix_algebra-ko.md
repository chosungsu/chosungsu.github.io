---
title: 'Matrix and Matrix algebra'
date: '2023-03-10'
tags: ['Linear algebra', 'lecture']
---

### Matrix operations

두 행렬이 모든 $i$, $j$에 대하여 $a_{ij}$$=b_{ij}$를 만족하면 서로 항등하다고 할 수 있습니다. 그리고 행렬의 곱이 성립하기 위한 조건으로는 곱하게 되는 두 행렬 중 선행 행렬의 열과 후행 행렬의 행 값이 동일해야 하며 결과 행렬의 행은 선행 행렬의 행 값으로 열은 후행 행렬의 열 값으로 반영이 되도록 아래와 같이 유의해야 합니다.

$$
A_{mp}*B_{pn}=C_{mn}
$$

행렬 연산에서 덧셈의 교환법칙, 결합법칙과 곱셈의 결합법칙, 분배법칙 등이 모두 성립하지만 $AB=BA$에 대해서는 성립하지 않습니다.

주대각 성분이 모두 1이고 나머지 성분이 모두 0인 $n$차 정사각행렬을 단위행렬(identity matrix)라고 하고 기호로는 $I_n$으로 나타냅니다.

행렬 $A$에 대해서 $A$의 전치행렬을 $A^T$로 나타내고 $\begin{bmatrix}a_{ij}’\end{bmatrix}_{nm}=a_{ji}$와 같이 정의가 가능합니다. 전치행렬의 성질을 통해 $(AB)^T=B^TA^T$, $(kA)^T=kA^T$가 성립합니다.

대각합 성분의 합은 기호로 $tr(A)$로 나타냅니다.

---

### Inverse matrix

$n$차의 정사각행렬 $A$에 대해서 $AB=I_n=BA$를 만족하는 행렬 $B$가 존재하면 $A$는 가역행렬(invertible)이라고 할 수 있게 됩니다. 이 때의 $B$를 역행렬(inverse matrix)이라고 하며 역행렬이 없는 $A$는 비가역이라고 합니다.

---

### Elementary matrix

$I_n$에 기본행연산(ERO)를 한 번 적용해서 얻은 행렬을 기본행렬(elementary matrix)이라고 합니다. 그리고 치환행렬은 $I_n$의 행들을 교환하여 얻어진 행렬을 의미합니다.

기본행렬을 이용하여 가역행렬의 역행렬을 구하는 방법은 아래와 같습니다.

-주어진 행렬 $A$에 단위행렬 $I_n$을 첨가하여 n*2n 행렬 $[A : I_n]$을 만든다.

-행렬의 기약 행 사다리꼴 (RREF)를 구한다.

-RREF행렬이 $[C : D]$와 같을 때 $C=I_n$이면 $D=A^{-1}$이며 $C \ne I_n$이면 $A$는 비가역이고 역행렬은 존재하지 않게 된다.

---

### Subspace and linearly independent

집합 $W$가 $R^n$의 부분집합이라고 할 때 아래의 두 조건을 만족하는 경우 부분공간이 될 수 있습니다.

-$x, y \in W \Rightarrow x+y \in W$ (closed under add)

-$x \in W, k \in R \Rightarrow kx \in W$ (closed under scalar)

부분집합 $\{x_1, x_2, …, x_k\}$에 대해서 벡터 $x$가 $R$에 속하는 상수들의 곱의 합으로 표현이 되는 경우를 일차결합(linear combination)이라고 합니다.

행렬 $A$에서 열벡터들을 $A^{(1)}, A^{(2)}, … , A^{(n)}$의 span으로 나타내면 이는 결국 $R^n$의 부분공간이므로 이는 열공간(column space)가 되고 같은 방법으로 행벡터들의 span도 행공간(row space)가 됩니다.

일차결합 구조에서 상수들이 0이라면 일차독립이고 그렇지 않다면 일차종속이라고 합니다.

---

### Matrix of systems of linear equation

$n$차의 정사각행렬 $A$가 가역이고 $b$가 $R^n$의 벡터일 때 연립방정식 $Ax=b$는 유일한 해인 $x=A^{-1}b$을 갖습니다. 그리고 $Ax=0$을 수반동차연립방정식(associated homogeneous system of linear equations)이라고 합니다.

---

### 참고 자료

[원본 경로 #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)
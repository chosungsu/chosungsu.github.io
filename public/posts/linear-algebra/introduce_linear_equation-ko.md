---
title: 'Introduce Linear Equations'
date: '2023-03-01'
tags: ['Linear algebra', 'lecture']
---

### Warm up

연립일차방정식(linear systems)과 이를 푸는 행 소거법(row reduction)을 소개하겠습니다. 연립일차방정식을 편리하게 나타내고 풀기 위한 구조로서 행렬(matrices)을 소개할 것입니다. 마지막으로, 2차원 및 3차원에서 연립일차방정식의 해집합(solution set)에 대한 기하학적 해석(geometric interpretations)을 논의하겠습니다.

---

### Linear equations

$$
a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n = b_1 \\
a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n = b_2 \\
\vdots \\
a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n = b_m
$$

선형 시스템에서 $a_{ij}$를 계수(coefficients)라고 부릅니다. $m$개의 방정식과 $n$개의 미지수가 있으므로, 총 $m×n$개의 계수가 존재합니다. 미지수 $(x_1, x_2, \dots, x_n)$에 숫자 목록 $(s_1, s_2, \dots, s_n)$을 대입했을 때, 각 $i$번째 방정식의 좌변이 $b_i$와 같아지도록 하는 해(solution)를 찾는 것입니다.

따라서 선형 시스템의 모든 해의 집합을 해집합(solution set)이라고 합니다.

$$
2x_1+2x_2+x_3=2 \\
x_1+3x_2-x_3=11
$$

예를 들면 $(1, 2, -4)$가 위의 연립방정식의 해인지 확인해보면 각 $x_i$에 대입하여 계산한 값이 방정식을 만족시키는 것을 알 수 있습니다. 이렇게 적어도 하나의 해가 있을 경우는 일관적(consistent)이라고 부릅니다.

---

### Matrices

선형 시스템을 효과적으로 풀이하기 위해 행렬(matrices)를 활용합니다.

$$
A=\begin{bmatrix} 1 & -2 & 1 & 0 \\
0 & 2 & -8 & 8 \\
-4 & 7 & 11 & -5 
\end{bmatrix}
$$

위 행렬은 3행 4열이고 $i$번째 행과 $j$번째 열의 원소를 $a_{ij}$로 표기합니다.

행벡터(row vector)는 단 하나의 행으로 구성된 행렬이고, 열벡터(column vector)는 단 하나의 열로 구성된 행렬인데 행렬을 사용하여 첨가행렬을 만들 수 있습니다.

$$
5x_1-3x_2+8x_3=-1 \\
x_1+4x_2-6x_3=0 \\
2x_2+4x_3=3
$$

위 선형연립방정식의 첨가행렬은 아래와 같습니다.

$$
[A|b]=\begin{bmatrix} 5 & -3 & 8 & | -1 \\
1 & 4 & -6 & | 0 \\
0 & 2 & 4 & | 3 
\end{bmatrix}
$$

---

### Solving linear system

기본 연산(elementary operations)로 불리는 세 가지 연산이 있습니다.

1.두 방정식을 서로 바꿉니다.

2.하나의 방정식에 0이 아닌 상수를 곱합니다.

3.한 방정식에 다른 방정식의 배수를 더합니다.

위 연산들을 사용하여 단순화하는 과정을 행 소거(row reduction)이라고 합니다. 행 소거의 목표는 원래 선형 시스템을 삼각 구조(triangular structure)로 변환한 다음 역대입(back substitution)을 수행하여 해를 구하는 것입니다.

$$
[A|b]=\begin{bmatrix} 1 & 0 & -2 & | -4 \\
0 & 1 & -1 & | 0 \\
0 & 0 & 1 & | 1 
\end{bmatrix}
$$

위 첨가행렬은 삼각 구조를 갖고 있으며 $x_3=1$을 세번째 행에서 구하고, 두번째 행에서 $x_2-x_3=0 \therefore x_2=x_3=1$을 구하고 첫번째 행에서 $x_1-2x_3=-4 \therefore x_1=-2$를 구할 수 있습니다.

---

### 참고 자료

[원본 경로 #1](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)
---
title: 'Introduce to Vectors'
date: '2023-03-01'
tags: ['Linear algebra', 'lecture']
---

### Warm up

선형대수학의 핵심은 벡터에 대한 두 가지 연산입니다.

$\Rightarrow$ 벡터 덧셈: $\mathbf{v} + \mathbf{w}$

$\Rightarrow$ 스칼라 곱셈: $c\mathbf{v}$ 및 $d\mathbf{w}$

이 두 연산을 결합하여 선형 결합(Linear Combination) $c\mathbf{v} + d\mathbf{w}$를 얻습니다.

---

#### Vectors and Linear Combinations

$\mathbf{v}$와 $\mathbf{w}$의 전형적인 선형 결합은 $c\mathbf{v} + d\mathbf{w}$입니다.

$\mathbf{v} = \begin{bmatrix} 4 \\ 2 \end{bmatrix}$와 $\mathbf{w} = \begin{bmatrix} -1 \\ 2 \end{bmatrix}$에 대해 $3\mathbf{v} + 5\mathbf{w} = 3 \begin{bmatrix} 4 \\ 2 \end{bmatrix} + 5 \begin{bmatrix} -1 \\ 2 \end{bmatrix} = \begin{bmatrix} 12 - 5 \\ 6 + 10 \end{bmatrix} = \begin{bmatrix} 7 \\ 16 \end{bmatrix}$으로 계산이 가능합니다.

벡터는 열 벡터(Column vector)로 표기됩니다.

#### 선형 결합

벡터 덧셈과 스칼라 곱셈을 결합한 것이 선형 결합 $c\mathbf{v} + d\mathbf{w}$입니다. 벡터는 화살표로 시각화됩니다. $\mathbf{v}$는 $(0, 0)$에서 시작하여 $(v_1, v_2)$ 좌표에서 끝나는 화살표입니다.

#### 3차원 벡터

3차원 $xyz$ 공간에서 벡터는 세 개의 성분을 갖습니다. $\mathbf{v} = \begin{bmatrix} v_1 \\ v_2 \\ v_3 \end{bmatrix}$ 벡터는 $(0, 0, 0)$에서 시작하여 $(v_1, v_2, v_3)$에서 끝나는 화살표에 해당합니다. 괄호 안에 표기되지만, 이는 여전히 열 벡터를 의미합니다.

---

### Lengths and Dot Products

내적은 두 벡터의 성분을 각각 곱한 후 그 결과를 모두 더하여 하나의 스칼라 숫자를 만드는 연산입니다.

$\mathbf{v} = (v_1, v_2)$와 $\mathbf{w} = (w_1, w_2)$의 내적은 $\mathbf{v} \cdot \mathbf{w} = v_1 w_1 + v_2 w_2$로 구해집니다.

$\mathbf{v} \cdot \mathbf{w} = 0$이면, 두 벡터 $\mathbf{v}$와 $\mathbf{w}$는 직교합니다.

벡터 $\mathbf{v}$의 길이(Length)는 $\mathbf{v}$와 자기 자신의 내적의 제곱근입니다.

$$
\Vert v \Vert = \sqrt{v \cdot v} = \sqrt{v_1^2 + \cdots + v_n^2}
$$

그리고 단위 벡터(unit vector)는 길이가 1인 벡터입니다.

---

### Matrices

$m \times n$ 행렬 $\mathbf{A}$와 $n$ 성분을 가진 벡터 $\mathbf{x}$의 곱 $\mathbf{A}\mathbf{x}$는 $\mathbf{A}$의 열 벡터들의 선형 결합으로 정의됩니다.

$$
Ax = \begin{bmatrix} u & v & w\end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \\ x_3\end{bmatrix} = x_1u+x_2v+x_3w=b
$$

선형 방정식의 역문제는 출력 벡터 $\mathbf{b}$가 주어졌을 때, $\mathbf{A}\mathbf{x} = \mathbf{b}$를 만족하는 입력 벡터 $\mathbf{x}$를 찾는 문제입니다.

선형 독립은 $\mathbf{A}\mathbf{x} = \mathbf{0}$이 $\mathbf{x} = \mathbf{0}$ 만을 유일한 해로 가질 때 $\mathbf{A}$의 열 벡터들은 $\mathbf{0}$ 벡터 외의 어떤 선형 결합으로도 $\mathbf{0}$을 만들 수 없습니다. 이 경우, 열 벡터들은 공간 전체를 채우며, $\mathbf{A}$는 가역입니다.

---

### 참고 자료

[원본 경로 #1](https://renessans-edu.uz/files/books/2023-12-04-11-33-41_46e7ce28c81d5c62d59b34ccc1c6f465.pdf)

[원본 경로 #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)

[원본 경로 #3](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)
---
title: 'Introduce Linear Equations'
date: '2023-03-01'
tags: ['Linear algebra', 'lecture']
---

### Warm up

연립 선형 방정식은 행렬 방정식으로 작성될 수 있습니다. 연립 선형 방정식(또는 행렬 방정식)을 최대로 단순화하는 효율적인 알고리즘인 가우스 소거법을 중심으로 설명합니다.

#### Augmented Matrix

효율성을 위해서는 첨가행렬(augmented matrix)이라는 새로운 표기법이 필요하고 아래처럼 표기됩니다.

$$
\begin{cases} x+y=27 \\ 2x-y=0 \end{cases} \\
\downarrow \\
\begin{pmatrix} 1 & 1 & 27 \\ 2 & -1 & 0\end{pmatrix}
$$

위 표기법은 행렬 표기법보다 간단하지만 모두 같은 것을 나타내고 선형결합으로는 아래와 같은 표기법으로 작성할 수 있습니다.

$$
x \begin{pmatrix} 1 \\ 2\end{pmatrix} + y \begin{pmatrix} 1 \\ -1\end{pmatrix} = \begin{pmatrix} 27 \\ 0\end{pmatrix}
$$

연립 방정식을 행으로 대체하고 첨가행렬을 사칙연산을 사용하여 해를 구하는 방법을 가우스 소거법이라고 합니다.

#### Equivalence

동치란 첨가행렬이 행에 대한 연산에 의해 변하지만 모두 동일한 해를 가짐을 의미합니다.

#### RREF, 기약 행 사다리꼴

두 개의 선형 방정식으로 이루어진 선형 시스템에서 가우스 소거법의 목표는 첨가행렬의 구분선 좌측 부분을 항등 항렬$(I)$로 변환하는 것입니다.

$$
I=\begin{pmatrix} 1 & 0 \\ 0 & 1\end{pmatrix}
$$

이는 해를 간단하게 나타낼 수 있게 도와주며 대각선이 1, 모든 비대각 항목은 0이 되어야 합니다. 이를 가능하게 하는 소거법은 아래와 같습니다.

$\rightarrow$ 첫번째 행에서 가장 왼쪽의 0이 아닌 항목을 1로 만듭니다.

$\rightarrow$ 그 항목을 피벗으로 사용하여 그 아래의 모든 것을 0으로 소거합니다.

$\rightarrow$ 다음 행에 이동하여 위 방법을 반복합니다.

$$
\begin{pmatrix}
1 & 0 & 0 & \cdots & b^1 \\
0 & 0 & 1 & \cdots & b^2 \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
0 & 0 & 0 & 0 & b^T
\end{pmatrix}
$$

---

### ERO, 기본 행 연산

기본 행 연산은 가우스 소거법에서 이전 행과 새 행을 연결하는 연립 선형 방정식입니다.

예를 들면 아래와 같습니다.

$$
\begin{pmatrix}
0 & 1 & 1 & 7 \\
2 & 0 & 0 & 4 \\
0 & 0 & 1 & 4
\end{pmatrix}
\tilde{ERO}
\begin{pmatrix}
2 & 0 & 0 & 4 \\
0 & 1 & 1 & 7 \\
0 & 0 & 1 & 4
\end{pmatrix}
$$

$R_1' = 0R_1 + R_2 + 0R_3$, $R_2' = R_1 + 0R_2 + 0R_3$, $R_3' = 0R_1 + 0R_2 + R_3$로 기본 행 연산을 진행한 결과입니다.

항등 행렬을 만드는 ERO에는 크게 세 가지 행렬변환이 있습니다. 두 행이 서로 교환된 행 교환(row swap), 스칼라 곱셈(scalar multiplication), 행 합산(row sum)이 해당됩니다.

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

위 연립 선형 방정식의 첨가행렬은 아래와 같습니다.

$$
[A|b]=\begin{bmatrix} 5 & -3 & 8 & | -1 \\
1 & 4 & -6 & | 0 \\
0 & 2 & 4 & | 3 
\end{bmatrix}
$$

---

### LU, LDU factorizations

소거 과정에서 처음 절반은 대각선 아래 항목을 소거하여 상삼각 행렬(upper triangular), 하삼각 행렬(lower triangular)를 남겨서 결합하면 LU분해를 얻을 수 있습니다.

예를 들면 아래와 같은 행렬 $M$이 있으며

$$
M = \begin{pmatrix} 2 & 0 & -3 & 1 \\ 0 & 1 & 2 & 2 \\ -4 & 0 & 9 & 2 \\ 0 & -1 & 1 & -1\end{pmatrix}
$$

$M$을 LU 분해하기 위해서 먼저 upper triangular matrix와 각 ERO 역함수를 곱하여 다음과 같이 표현합니다.

$$
E^{-1}_1 = \begin{pmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ -2 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1\end{pmatrix}, \\
E^{-1}_2 = \begin{pmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & -1 & 0 & 1\end{pmatrix}, \\
E^{-1}_3 = \begin{pmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 1 & 1\end{pmatrix}
$$

따라서 $M = E^{-1}_1 E^{-1}_2 E^{-1}_3 U$는 다음과 같이 계산됩니다.

$$
\begin{aligned}
M &= E^{-1}_1 E^{-1}_2 E^{-1}_3 \begin{pmatrix} 2 & 0 & -3 & 1 \\ 0 & 1 & 2 & 2 \\ 0 & 0 & 3 & 4 \\ 0 & 0 & 0 & -3\end{pmatrix} \\
&= E^{-1}_1 \begin{pmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & -1 & 1 & 1\end{pmatrix} \begin{pmatrix} 2 & 0 & -3 & 1 \\ 0 & 1 & 2 & 2 \\ 0 & 0 & 3 & 4 \\ 0 & 0 & 0 & -3\end{pmatrix} \\
&= \begin{pmatrix} 
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
-2 & 0 & 1 & 0 \\
0 & -1 & 0 & 1
\end{pmatrix}
\begin{pmatrix}
2 & 0 & -3 & 1 \\
0 & 1 & 2 & 2 \\
0 & 0 & 3 & 4 \\
0 & 0 & 0 & -3
\end{pmatrix} \\
&= LU
\end{aligned}
$$

다음으로 LDU를 계산하기 앞서서 위에서 구한 LU에서 U를 대각선 성분이 1이 되도록 후처리를 추가한 방법으로 아래와 같습니다.

$$
\begin{pmatrix}
2 & 0 & -3 & 1 \\
0 & 1 & 2 & 2 \\
0 & 0 & 3 & 4 \\
0 & 0 & 0 & -3
\end{pmatrix} \\
\downarrow \\
\begin{pmatrix}
1 & 0 & -3/2 & 1/2 \\
0 & 1 & 2 & 2 \\
0 & 0 & 1 & 4/3 \\
0 & 0 & 0 & 1
\end{pmatrix}
$$

따라서 각 ERO의 역함수는 분수이므로 분자 분모 자리를 바꾸어 표현하면 아래와 같습니다.

$$
E^{-1}_4 = \begin{pmatrix} 2 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1\end{pmatrix}, \\
E^{-1}_5 = \begin{pmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 3 & 0 \\ 0 & 0 & 0 & 1\end{pmatrix}, \\
E^{-1}_6 = \begin{pmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & -3\end{pmatrix}
$$

이제 LDU 분해는 $M$을 $M = (E^{-1}_1 E^{-1}_2 E^{-1}_3)(E^{-1}_4 E^{-1}_5 E^{-1}_6)U$로 괄호 내부를 계산하여 표현하게 됩니다.

---

### Systems of Linear equations

기약 행 사다리꼴에서 피벗을 포함하지 않는 열에 해당하는 변수는 자유 변수입니다. 따라서 해 집합의 기하학적 형태(점, 선, 면)를 결정하는 것은 이 개수가 됩니다.

예를 들어, $\begin{pmatrix} 1 & 0 & 1 & -1 \\ 0 & 1 & -1 & 1 \\ 0 & 0 & 0 & 0\end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \\ x_4\end{pmatrix} = \begin{pmatrix} 1 \\ 1 \\ 0\end{pmatrix}$ 가 있을 때 피벗 변수는 $x_1, x_2$이므로 아래와 같이 비피벗 변수는 빈 방정식을 추가해줍니다.

$$
\begin{pmatrix} x_1 \\ x_2 \\ x_3 \\ x_4 \end{pmatrix} = \begin{pmatrix} 1 \\ 1 \\ 0 \\ 0 \end{pmatrix} + x_3 \begin{pmatrix} -1 \\ 1 \\ 1 \\ 0 \end{pmatrix} + x_4 \begin{pmatrix} 1 \\ -1 \\ 0 \\ 1 \end{pmatrix}
$$

여기서 첫 항은 특수 해의 한 예시이며 두번째, 세번째 항의 계수는 동차 해(homogeneous solutions)라고 불립니다. 따라서 해 집합은 2차원 평면이 됩니다.

---

### 참고 자료

[원본 경로 #1](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)

[원본 경로 #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)
---
title: 'Linear independence'
date: '2023-03-06'
tags: ['Linear algebra', 'lecture']
---

### Warm up

벡터 집합 ${v_1, v_2, \dots, v_n}$의 span을 모든 가능한 선형 결합(linear combinations)의 모음으로 정의했습니다.

$$
t_1v_1+t_2v_2+ \cdots + t_nv_n
$$

이 집합을 $\text{span}{v_1, v_2, \dots, v_n}$으로 표기합니다. 여기서 질문은 $x$를 벡터들의 선형 결합으로 표현하는 방법이 여러 가지인가입니다.

예를 들어 $v_1 = (1,2), v_2=(0,1), v_3=(-1,-1), x=(3,-1)$일 때 $x \in \text{span}{v_1, v_2, v_3}$이면 $x=3v_1-7v_2+0v_3, x=-4v_1+0v_2-7v_3$과 같이 여러 가지 방법으로 표현할 수 있습니다. 이러한 사실은 집합 ${v_1, v_2, v_3}$에 중복성(redundancy)이 있을 수 있음을 시사합니다.

즉, 어떤 벡터가 다른 벡터들의 선형 결합으로 표현될 수 있을 때 선형종속 관계이고 그렇지 않다면 선형 독립이 됩니다.

---

### Linear independence

$$
t_1v_1+t_2v_2+ \cdots + t_nv_n=0
$$

벡터 집합 ${v_1, v_2, \dots, v_n}$은 선형 독립(linearly independent)일 필요충분조건은 영벡터(0)가 ${v_1, v_2, \dots, v_n}$의 선형 결합으로 오직 한 가지 방법으로만 표현될 수 있는 경우입니다. 이 때 반드시 계수들이 모두 0이어야 합니다. 또한 자명해는 $x_1=x_2= \cdots =x_n=0$만을 갖습니다.

따라서 반대로 ${v_1, v_2, \dots, v_n}$이 선형 종속(linearly dependent)이라면, 모든 계수가 0은 아닌 스칼라 $x_1, x_2, \cdots, x_n$이 존재하여 예를 들어 $x_n \ne 0$이라고 하면 $v_n$을 벡터 $v_1, \dots, v_{n-1}$로 다음과 같이 표현할 수 있습니다.

$$
v_n=-\frac{x_1}{x_n}v_1-\frac{x_2}{x_n}v_2 - \cdots -\frac{x_{n-1}}{x_n}v_{n-1}
$$

동차 시스템 $Ax=0$이 자유 매개변수가 없을 때만 자명 해만을 가지고 자명 해만 있을 때 선형 독립입니다.

---

### Maximum size of linearly independent set

$R^n$에 속하는 벡터들의 집합 ${v_1, v_2, \dots, v_p}$에서 만약 $p > n$이면 이 벡터들은 선형 종속(linearly dependent)입니다. $A = \begin{bmatrix} v_1 & v_2 & \dots & v_p \end{bmatrix}$라 하면 $n*p$행렬이면서 rank는 $n$입니다. 자유 매개변수 개수 $d=p-r$는 항상 양수를 갖습니다. 이는 동차 시스템이 비자명 해를 갖는 것을 의미합니다.

이는 차원(dimension) 개념으로 $n$차원보다 큰 벡터집합들은 자동으로 선형 종속임을 알 수 있습니다.

$$
v_1=\begin{bmatrix}
8 // 3 // 0 // -2
\end{bmatrix}
, v_2=\begin{bmatrix}
4 // 11 // -4 //6
\end{bmatrix}
, v_3=\begin{bmatrix}
2 // 0 // 1 // 1
\end{bmatrix}
, v_4=\begin{bmatrix}
3 // -9 // -5 // 3
\end{bmatrix}
, v_5=\begin{bmatrix}
0 // -2 // -7 // 7
\end{bmatrix}
$$

따라서 예를 들어 $R^4$ 차원에서 계산 이전에 바로 벡터들의 집합 ${v_1, \dots, v_5}$는 선형 종속이라고 할 수 있습니다.

---

### Solving linear system

벡터 집합 ${v_1, v_2, \dots, v_n}$은 선형 독립(linearly independent)일 필요충분조건은 행렬 A의 계수(rank) $r=n$일 때입니다. 즉, REF, RREF로 변환하였을 때 선행 원소의 개수가 정확히 $n$개인 경우를 말합니다.

$$
v_1=\begin{bmatrix}
0 \\ 1 \\ 5
\end{bmatrix}
, v_2=\begin{bmatrix}
1 \\ 2 \\ 8
\end{bmatrix}
, v_3=\begin{bmatrix}
4 \\ -1 \\ 0
\end{bmatrix}
$$

예를 들어 위와 같은 벡터들이 있을 때, 기본행 연산을 수행하면 아래와 같습니다.

$$
A=\begin{bmatrix}
1 & 2 & -1 \\
0 & 1 & 4 \\
0 & 0 & 13
\end{bmatrix}
$$

행렬 $A$의 계수는 $r=3$이고 벡터의 개수 $n=3$과 동일합니다. 따라서 선형 독립입니다.

---

### 참고 자료

[원본 경로 #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[원본 경로 #2](https://www.boostcourse.org/ai151/joinLectures/194162)

[원본 경로 #3](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)
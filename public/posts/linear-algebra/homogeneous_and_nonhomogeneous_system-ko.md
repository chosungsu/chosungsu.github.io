---
title: 'Homogeneous and Nonhomogeneous system'
date: '2023-03-06'
tags: ['Linear algebra', 'lecture']
---

### Warm up

동차 시스템 $Ax=0$은 항상 적어도 하나의 해를 가집니다. 바로 영벡터 해(zero solution)인 $x=0$입니다. 왜냐하면 $A*0=0$이기 때문입니다. 따라서 동차 시스템은 항상 일관적(consistent)입니다. 영 해 $x=0$를 자명 해(trivial solution)라고 부르며, 0이 아닌 해를 비자명 해(nontrivial solution)라고 합니다.

일관적인 선형 시스템은 해가 단 하나이거나 무한히 많은 해를 가집니다. 따라서 동차 선형 시스템은 해집합에 적어도 하나의 매개변수가 있을 때에만 비자명 해를 가집니다.

해집합의 매개변수 개수는 $d=n−r$로 주어집니다. 여기서 $r$은 계수 행렬 $A$의 계수(rank)이고, $n$은 미지수의 개수입니다.

---

### Nonhomogeneous system

동차 시스템 $Ax=0$은 항상 일관적입니다. 그러나 $b$가 0이 아닌 경우, 비동차 선형 시스템 $Ax=b$는 해가 있을 수도, 없을 수도 있습니다.

특수 해(particular solution) $p$가 비동차 시스템 $Ax=b$의 해, 즉 $Ap=b$를 만족한다고 가정해 봅시다. 그리고 $v$가 동차 시스템 $Ax=0$의 해, 즉 $Av=0$를 만족한다고 가정해 봅시다. 이제 $q=p+v$라고 합시다.

$$
Aq=A(p+v)=Ap+Av=b+0=b
$$

다시 말해 $q$ 역시 비동차 선형 시스템의 해가 됩니다. 또한 $q=p-v$도 해가 성립합니다.

$$
\begin{bmatrix}
3 & -3 & 6 & | 3 \\
-1 & 1 & -2 & | -1 \\
2 & -2 & 4 & | 2
\end{bmatrix} \\
\downarrow \\
\begin{bmatrix}
1 & -1 & 2 & | 1 \\
0 & 0 & 0 & | 0 \\
0 & 0 & 0 & | 0
\end{bmatrix}
$$

예를 들면 위와 같은 첨가행렬이 있고 RREF를 구해보면 $n=3, r=1, d=2$가 구해집니다. 그리고 $x_2=t_1, x_3=t_2$로 설정하면 $x_1=1+t_2-2t_1$이 되며 일반해를 매개변수 형태로 나타내면 아래와 같습니다.

$$
x=\begin{bmatrix} 1 \\ 0 \\ 0\end{bmatrix} + t_1*\begin{bmatrix} -2 \\ 0 \\ 1\end{bmatrix} + t_2*\begin{bmatrix} 1 \\ 1 \\ 0\end{bmatrix}
$$

---

### Solving linear system

$$
3x_1+x_2-9x_3=0 \\
x_1+x_2-5x_3=0 \\
2x_1+x_2-7x_3=0
$$

위와 같은 동차 선형 시스템이 비자명 해를 가지는지 계산하기 위해 적어도 하나의 자유 매개변수가 있는지 살펴봅니다. 우선 첨가행렬로 변환하면 아래와 같습니다.

$$
\begin{bmatrix}
3 & 1 & -9 & | 0 \\
1 & 1 & -5 & | 0 \\
2 & 1 & -7 & | 0
\end{bmatrix}
$$

그리고 이를 REF 또는 RREF로 변환하기 위해 행소거를 진행하면 $-2R_2+R_3, -3R_2+R_1, -R_3+R_1$을 하여 아래와 같은 결과를 얻습니다.

$$
\begin{bmatrix}
3 & 1 & -9 & | 0 \\
1 & 1 & -5 & | 0 \\
2 & 1 & -7 & | 0
\end{bmatrix}
\rightarrow
\begin{bmatrix}
1 & 1 & -5 & | 0 \\
0 & -1 & 3 & | 0 \\
0 & 0 & 0 & | 0
\end{bmatrix}
$$

따라서 이 시스템은 일관적이고 계수 행렬의 계수는 $r=2$이므로 해집합에는 $d=3-2=1$개의 자유 매개변수가 있습니다. 그리고 매개변수로 치환하면 $x_3=t, x_2=3x_3=3t, x_1=2t$가 되어 벡터 표기법으로 $x=\begin{bmatrix} 2 \\ 3 \\ 1 \end{bmatrix}t$와 같이 표현됩니다. 또한 해집합을 벡터 $v$의 span이라고 보아도 됩니다.

---

### 참고 자료

[원본 경로 #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[원본 경로 #2](https://www.boostcourse.org/ai151/joinLectures/194162)

[원본 경로 #3](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)
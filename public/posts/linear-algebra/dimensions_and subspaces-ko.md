---
title: 'Dimensions and subspaces'
date: '2023-03-20'
tags: ['Linear algebra', 'lecture']
---

### properties of basis and dimensions

$R^n$의 부분집합 $S = \{v_1, v_2, … , v_s\}$가 아래 두 조건을 만족하면 $S$가 기저가 됩니다.

-$S$가 일차독립

-$span(S) = R^n$

$R^n$ 상의 벡터들의 일차독립성을 보이려면 $A = [x_1 : x_2 :  … : x_m]$이 $x_i$들을 열벡터로 갖는 행렬이고 $c = [c_1, …, c_m]^T$이 상수로 있을 때 동차연립방정식 $Ac = 0$이 유일한 해 $c = 0$을 가져야 합니다. 특히 $m = n$일 경우 $detA \ne 0$이면 유일해를 갖습니다.

집합 $S$가 $R^n$의 기저일 때 $r(>n)$개의 벡터 집합 $T$는 항상 일차종속인데 이를 통해 $T$가 일차독립이면 언제나 $r(≤n)$임을 보일 수 있습니다. 그리고 $S$와 $T$  집합이 모두 기저이면 $m = n$입니다.

집합 $S$가 $R^n$의 한 기저일 때 $S$에 속하는 벡터의 개수를 차원이라고 하며 $dimR^n$으로 나타냅니다.

---

### basic space and dimension theorem

$n*n$ 행렬 $A$의 고윳값 $\lambda$에 대한 고유공간 $\{x \in R^n | Ax=\lambda x\}$은 $R^n$의 부분공간입니다. 또한 동차연립방정식 $Ax=0$ 의 해집합도 부분공간입니다. 이는 해공간 혹은 영공간이라고 하며 $Null(A)$로 나타냅니다.

해공간의 기저와 차원에서 가우스-조던 소거법을 이용하여 행렬 $[B:0]$을 선형연립방정식의 첨가행렬 $[A:0]$의 RREF라고 하고 행렬 $B$는 첫 행부터 $r(1 ≤ r ≤ n)$개의 영이 아닌 해를 갖습니다. 이 때 $r = n$이면 $Ax=0$의 해는 $x=0$만을 갖게 되어 해공간의 차원은 0이 됩니다. $r < n$이면 필요한 경우 변수들의 위치를 변경하여 일반성을 지키고 $n-r$ 개의 자유변수(차원)라고 볼 수 있습니다. $m*m$ 행렬 $A$에 대해서 $Ax=0$의 해공간(영공간) 차원을 $nullity(A)$라고 나타낼 수 있습니다. 즉 $dim(Null(A)) = nullity(A)$입니다.

예를 들어 $A = \begin{bmatrix} 1 & 1 & 0 & 2 \\ -2 & -2 & 1 & -5 \\ 1 & 1 & -1 & 3 \\ 4 & 4 & -1 & 9 \end{bmatrix}$를 RREF로 변형하면 $\begin{bmatrix} 1 & 1 & 0 & 2 & : 0 \\ 0 & 0 & 1 & -1 & : 0 \\ 0 & 0 & 0 & 0 & : 0 \\ 0 & 0 & 0 & 0 & : 0 \end{bmatrix}$가 되므로 일반해 $x = \begin{bmatrix} x_1 \\ x_2 \\ x_3 \\ x_4 \end{bmatrix} = \begin{bmatrix} -x_2-2x_4 \\ x_2 \\ x_3 \\ x_4 \end{bmatrix} = \begin{bmatrix} -s -2t \\ s \\ t \\ t \end{bmatrix} = s\begin{bmatrix} -1 \\ 1 \\ 0 \\ 0 \end{bmatrix} + t\begin{bmatrix} -2 \\ 0 \\ 1 \\ 1 \end{bmatrix}$가 되어 기저는 $s$와 $t$에 곱해진 값과 같고 차원은 2입니다.

임의의 행렬 $A$에 대해서 $A$의 행계수와 열계수는 같습니다.($rank(A) = r(A) = c(A)$). 차원정리에 따르면 $dim(lmT) = rank(A), dim(kerT) = nullity(A)$도 만족합니다.

---

### rank theorem

차원의 기본정리로 임의의 $m*n$ 행렬 $A$는 dim Row $(A)$ = dim Col $(A)$입니다. dim Row $(A) ≤ m$과 dim Col $(A) ≤ n$이고 $rankA$는 두 차원과 같기 때문에 $rankA ≤ min\{m, n\}$이 만족됨을 알 수 있습니다.

그리고 rank정리에 의해서 $rankA + nullityA$ = A의 열의 개수($n$), $rankA + nullityA^T$ = A의 행의 개수($m$)도 만족합니다.

크기가 $n$인 정사각행렬 $A$가 가역행렬일 필요충분조건은 $rankA = n$입니다. 그 이유는 가역행렬의 의미가 $Ax=0$에서 자명해를 가지므로 $nullityA = 0$이므로 차원정리에 의해 $n$이어야 합니다.

$rank(AB) ≤ min\{rankA, rankB\}$를 만족하면서 임의의 행렬 $B$에 가역행렬 $A$를 곱하게 되면 가역행렬이 rank를 감소시키지 않기 때문에 $rank(AB) = rankB = rankBA$도 만족합니다.

---

### orthogonal projection theorem

<img src="https://velog.velcdn.com/images/devjo/post/83dad265-0bbb-440f-8451-4e28dec06661/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

$R^n$상의 일차원 부분공간으로의 정사영은 영벡터가 아닌 벡터 a에 대해서 모든 x는 유일하게 아래와 같이 표현이 됩니다.

$x = proj_{<a>}x + w = ta + w = p + w$

여기서 $p$는 $ta=\frac{x \cdot a}{|a|^2}a$입니다. 위 식을 벡터 x의 a에 의해 생성되는 부분공간 위로의 정사영(orthogonal proj of $R^n$)이라고 합니다.

만약 $a$를 열벡터라고 하면 $T(x) = proj_{<a>}x = Px$라고 하고 $P=\frac{1}{a^Ta}aa^T$이며 대칭행렬인 $P$는 $rank=1$을 갖습니다.

일반적인 부분공간으로의 정사영은 벡터 $x$가 $x_1 + x_2$ ($x_1 = proj_{w}x \in W, x_2 = x-x1 \in W^{\bot}$)으로 유일하게 표현이 됩니다. 여기서 $w^{\bot}$은 $W$에 수직인 벡터들의 집합입니다.

$W$를 $R^n$의 부분공간이라고 하고 $M$의 열벡터들이 $W$의 기저로 일차독립을 이룰 때 모든 $x$에 대해서 $proj_{w}x = M(M^TM)^{-1}M^Tx$를 만족합니다.

예를 들어 평면 $x - 4y + 2z = 0$ 상의 정사영의 표준행렬을 구해보면 우선 일반해는  $\begin{bmatrix} x \\ y \\ z \end{bmatrix} = \begin{bmatrix} 4t_1 - 2t_2 \\ t_1 \\ t_2 \end{bmatrix} = t_1\begin{bmatrix} 4 \\ 1 \\ 0 \end{bmatrix} + t_2\begin{bmatrix} -2 \\ 0 \\ 1 \end{bmatrix}$이고 따라서 $M=\begin{bmatrix} 4 & -2 \\ 1 & 0 \\ 0 & 1 \end{bmatrix}$이 되고 $P$는 위 수식에 맞게 계산하면 됩니다.

---

### gram-schmidt process

$R^n$의 부분공간 중 $\{0\}$과 $R^n$은 자명한 부분공간이라 합니다. $R^n$의 모든 부분공간은 정규직교기저를 갖습니다.

$S \in R^n$인 집합의 벡터 $x_1, x_2, …, x_n$에서 임의의 두 벡터가 모두 직교하면 직교집합이라고 하고 특히 직교집합 $S$에 속하는 벡터가 모두 크기가 1이면 정규직교집합이라고 합니다. 직교집합인 S는 일차독립입니다. 그 이유는 임의의 $c_1, c_2,…,c_k \in R$을 $x$에 일차결합한 값이 0으로 자명한데 $x_i$를 양변에 곱했을 때 좌변은 $x^2$꼴이 되고 $x \ne 0$이기 때문에 결국 임의의 $c$가 0이어야 합니다.

그람-슈미트 과정은 아래와 같이 전개됩니다.

-$y_1 = x_1$

-$y_1$에 의해 생성되는 부분공간을 $w_1$이라 하고 $y_2 = x_2 - proj_{w_1}x_2 = x_2 - \frac{x_2 \cdot y_1}{|y_1|^2}y_1$

-이 과정을 $n$까지 반복

위 단계들로 얻어지는 $T=\{y_1, y_2, …, y_n\}$은 서로 수직인 직교집합입니다.

---

### coordinate vector

집합 $\alpha = \{x_1, x_2, …, x_n\}$이 $R^n$의 기저이면 $R$에 속하는 모든 벡터 $x = c_1x_1 + c_2x_2 + … + c_nx_n$으로 유일하게 표현됩니다. 이 때 스칼라 $c$ 기저를 순서기저(ordered basis)라고 하며 $x$의 좌표라고 합니다. 그리고 순서기저의 벡터화를 좌표벡터($[X]_\alpha$)라고 합니다.

예를 들어 $x_1$ = (1,1,0), $x_2$ = (1,1,1), $x_3$ = (0, 1, -1)일 때 $R^3$의 기저 $\alpha = \{x_1, x_2, x_3\}$에 관한 좌표벡터를 구하려면 $x = (1, 2, 3) = c_1x_1 + c_2x_2 + c_3x_3$이므로 $\begin{cases} c_1 + c_2 = 1 \\ c_1 + c_2 + c_3 = 2 \\ c_2 - c_3 = 3 \end{cases}$를 계산하면 $[x]_n = \begin{bmatrix} -3 \\ 4 \\ 1 \end{bmatrix}$임을 구할 수 있습니다.

---

### 참고 자료

[원본 경로 #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)
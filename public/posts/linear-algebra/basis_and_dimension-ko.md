---
title: 'Basis and Dimension'
date: '2023-03-10'
tags: ['Linear algebra', 'lecture']
---

### Warm up

벡터 공간에서 임의의 벡터 집합은 선형 독립인 벡터들의 최소 모음으로 축소될 수 있으며 이를 기저라고 합니다.

만약 $S$가 $V$의 기저이고 $S$가 유한한 원소만을 가진다면, 우리는 $V$가 유한 차원(finite-dimensional)이라고 말합니다. $S$에 있는 벡터의 수는 $V$의 차원(dimension)입니다.$V$가 유한 차원 벡터 공간이고 $S$와 $T$가 $V$의 두 개의 다른 기저라고 가정합시다. $S$와 $T$가 서로 다른 수의 벡터를 가질까봐 걱정할 수 있습니다. 다행히도 그런 일은 일어나지 않습니다.

$P_n(t)$($t$에 대한 차수 $n$ 이하의 다항식)는 ${1, t, \dots, t^n}$을 기저로 가집니다. 왜냐하면 이 공간의 모든 벡터는 합이므로

$$
a_0 1 + a_1 t + \cdots + a_n t^n, \ a_i \in \mathbb{R}
$$

$P_n(t) = \text{span}\{1, t, \dots, t^n\}$이기 때문입니다. 이 벡터 집합은 선형 독립입니다. 만약 다항식 $p(t) = c_0 1 + c_1 t + \cdots + c_n t^n = 0$이라면, $c_0 = c_1 = \cdots = c_n = 0$이므로, $p(t)$는 영 다항식입니다. 따라서 $P_n(t)$는 유한 차원이고, $\text{dim } P_n(t) = n+1$입니다.

$S = \{v_1, \dots, v_n\}$이 벡터 공간 $V$의 기저라면 $V$의 모든 벡터 $w \in V$가 선형 결합으로 $w=c_1v_1 + \cdots + c_nv_n$과 같이 작성 가능합니다. 이 때 $S$는 $V$의 기저이므로 선형 결합을 만족하는 상수 $c_i$가 존재합니다. 그리고 $w= d_1v_1 + \cdots+d_nv_n$을 만족하는 두번째 상수 집합 $d_i$가 존재한다고 가정하면 $0v = w -w$, $c_1v_1 + \cdots + c_nv_n - d_1v_1 - \cdots - d_nv_n = (c_1-d_1)v_1 + \cdots + (c_n-d_n)v_n$으로 $c_i \ne d_i$인 경우가 한 번 발생한다면 방정식은 $0=(c_i-d_i)v_i$로 줄어들고 벡터 $v_i$는 0이 아니라고 가정했으므로 모순이 됩니다. 또 $c_i \ne d_i$인 경우가 한 번 이상 있다면 선형 결합으로 작성이 가능해져 선형 독립에 모순$(c_i = d_i)$됩니다.

---

### Bases in $R^n$

$\mathbb{R}^n$이 다음 벡터들의 생성(span)임을 확인했습니다.

$$
\mathbb{R}^n = \text{span} \left\{ \begin{pmatrix} 1 \\ 0 \\ \vdots \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \\ \vdots \\ 0 \end{pmatrix}, \dots, \begin{pmatrix} 0 \\ 0 \\ \vdots \\ 1 \end{pmatrix} \right\}
$$

그리고 이 벡터 집합이 선형 독립임을 확인했습니다. 따라서 이 벡터 집합은 $\mathbb{R}^n$의 기저이며, $\text{dim } \mathbb{R}^n = n$입니다. 이 기저는 종종 $\mathbb{R}^n$의 표준 기저(standard or canonical basis)라고 불립니다. $i$번째 위치에 1이 있고 다른 모든 곳에 0이 있는 벡터는 $\mathbf{e}_i$로 작성됩니다. 그것은 $i$번째 좌표축의 방향을 가리키고 단위 길이(unit length)를 가집니다. 다변수 미적분학 수업에서는 $\mathbb{R}^3$에 대해 이 기저를 종종 ${\mathbf{\hat{i}}, \mathbf{\hat{j}}, \mathbf{\hat{k}}}$로 작성합니다.

추가로 알아야 하는 점은 기저는 유일하지 않습니다. 벡터를 특정 기저로 표현하는 유일한 방법이 존재하는 반면, 기저 자체는 유일하지 않습니다. 예를 들어, 두 집합$$\left\{ \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \end{pmatrix} \right\} \text{와 } \left\{ \begin{pmatrix} 1 \\ 1 \end{pmatrix}, \begin{pmatrix} 1 \\ -1 \end{pmatrix} \right\}$$모두 $\mathbb{R}^2$의 기저입니다. 이 집합들 중 하나의 벡터의 스케일을 조정하는 것만으로도 $\mathbb{R}^2$가 무한히 많은 기저를 가짐을 보여주기에 충분합니다.

---

### Matrix of a Linear Transformation

기저는 임의의 벡터를 열 벡터로 설명할 수 있도록 할 뿐만 아니라, 선형 변환을 행렬로 표현할 수 있도록 합니다. $L: V \to W$가 선형 변환이고, $V$와 $W$에 대한 순서 입력 및 출력 기저를 각각 $\mathcal{E} = (\mathbf{e}_1, \dots, \mathbf{e}_n)$과 $\mathcal{F} = (\mathbf{f}_1, \dots, \mathbf{f}_m)$이라고 가정합니다.

$$
\begin{aligned}
& L(\mathbf{e}_j) = f_1 m^1_j + \cdots + f_m m^m_j \\
&= (\mathbf{f}_1, \dots, \mathbf{f}_m) \begin{pmatrix} m^1_j \\ \vdots \\ m^m_j \end{pmatrix}
\end{aligned}
$$

숫자 $m^i_j$는 기저 $\mathcal{F}$에서 $L(\mathbf{e}j)$의 $i$번째 성분이고, $\mathbf{f}_i$는 벡터입니다. 숫자 $m^i_j$는 자연스럽게 $j$번째 열이 위에 표시된 열 벡터인 행렬을 형성합니다. 실제로,$\mathbf{v} = e_1 v^1 + \cdots + e_n v^n$이면,

$$
\begin{aligned}
& L(\mathbf{v}) = L(v^1 \mathbf{e}_1 + v^2 \mathbf{e}_2 + \cdots + v^n \mathbf{e}_n) \\
&= v^1 L(\mathbf{e}_1) + v^2 L(\mathbf{e}_2) + \cdots + v^n L(\mathbf{e}_n) \\
&= \sum_{j=1}^n L(\mathbf{e}_j) v^j \\
&= \begin{pmatrix} \mathbf{f}_1 & \mathbf{f}_2 & \cdots & \mathbf{f}_m \end{pmatrix} \begin{pmatrix} m^1_1 & m^1_2 & \cdots & m^1_n \\ m^2_1 & m^2_2 & & \vdots \\ \vdots & & \ddots & \vdots \\ m^m_1 & \cdots & & m^m_n \end{pmatrix} \begin{pmatrix} v^1 \\ v^2 \\ \vdots \\ v^n \end{pmatrix}
\end{aligned}
$$

숫자 배열 $M = (m^i_j)$는 $V$와 $W$에 대한 입력 및 출력 기저 $\mathcal{E}$와 $\mathcal{F}$에서의 $L$의 행렬이라고 불립니다. 이 행렬은 우리가 기저 중 하나라도 변경하면 변경될 것입니다.

예를 들어 

$$
L \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix} = \begin{pmatrix} 1 \\ 4 \\ 7 \end{pmatrix} \\ 
L \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 2 \\ 5 \\ 8 \end{pmatrix} \\ 
L \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix} = \begin{pmatrix} 3 \\ 6 \\ 9 \end{pmatrix}
$$

이면, 표준 기저에서 $L$의 행렬은 단순히 

$$
\begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{pmatrix}
$$

으로 표현할 수 있지만 아래와 같이 재작성 될 수 있습니다.

$$
\begin{aligned}
& L \begin{pmatrix} x \\ y \\ z \end{pmatrix} = L \left[ x \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix} + y \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix} + z \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix} \right] \\
&= x L \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix} + y L \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix} + z L \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix} \\
&= x \begin{pmatrix} 1 \\ 4 \\ 7 \end{pmatrix} + y \begin{pmatrix} 2 \\ 5 \\ 8 \end{pmatrix} + z \begin{pmatrix} 3 \\ 6 \\ 9 \end{pmatrix} \\
&= \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{pmatrix} \begin{pmatrix} x \\ y \\ z \end{pmatrix}
\end{aligned}
$$

---

### 참고 자료

[원본 경로 #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[원본 경로 #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)
---
title: 'Vector'
date: '2023-03-03'
tags: ['Linear algebra', 'lecture']
---

### n space

우리들이 일상적으로 사용하는 물리적인 양에는 크기만 알면 표현이 가능한 scalar와 방향을 모른다면 표현이 불가능한 vector가 있습니다. 이 중 vector는 크기와 방향이 지정되어야 하기 때문에 유향선분으로 화살표를 통해 표현이 가능해집니다.

시작점과 끝점이 같은 벡터는 영벡터라고 하며 이 벡터는 크기가 0이므로 방향을 임의의 방향으로 하여도 됩니다.

두 실수를 $x_1, x_2$를 벡터의 성분이라고 하고 벡터공간 $x=\begin{bmatrix}x_1\\x_2 \end{bmatrix}$로 나타낼 수 있습니다.

실수 전체의 집합 $R$에서 벡터 $v_1, v_2, … ,v_n$이고 계수가 실수인 $c_1, c_2, …, c_n$일 때 $x=c_1x_1 + c_2x_2, …, c_nx_n$인 형태를 일차결합이라고 합니다.

---

### dot product and orthogonal

$\begin{vmatrix}x \end{vmatrix}$=$\sqrt{x_1^2+x_2^2,…,x_n^2}$을 $x$의 노름이라고 합니다. 이러한 정의를 통해 $x$는 원점에서 $P$에 이르는 거리로 정의됨을 의미합니다.

코시슈바르츠 부등식은 실수 전체 집합에서의 임의의 벡터 x, y에 대하여 아래의 수식이 성립하는 경우입니다. $\begin{Vmatrix} x*y \end{Vmatrix}\leq\begin{Vmatrix} x \end{Vmatrix} \begin{Vmatrix} y \end{Vmatrix}$ 단, 등호는 $x, y$중 하나가 다른 것의 실수배일 때만 가능합니다.

또한 사이각 공식을 수식으로 풀이하면 $x*y=\begin{Vmatrix} x \end{Vmatrix} \begin{Vmatrix} y \end{Vmatrix} cos\theta$와 같습니다.

위에서 나온 노름 공식을 응용하여 노름이 1인 벡터, 즉 $\begin{Vmatrix} x \end{Vmatrix} = 1$일 때 단위벡터라고 부르기로 합니다. 또한 두 벡터가 서로 직교하면 이를 직교(orthogonal)이라고 하며 서로 직교이면서 각각 단위벡터인 경우는 정규직교(orthonormal)이라고 부르기로 합니다.

$u=\frac{1}{\begin{Vmatrix} x \end{Vmatrix}} * x$와 같이 나타내면 이는 단위벡터이면서 크기가 1인 기본단위벡터(표준단위벡터)가 됩니다.

---

### vector equation

기울기인 방향벡터와 한 점이 있을 때, $v(a,b,c), P(x_0, y_0, z_0)$에 대해서 아래의 방정식이 성립합니다.

- 벡터방정식 : $(x, y, z) = p_0+tv = (x_0, y_0, z_0) + t(a, b, c)$
- 매개방정식 : $x=x_0 + ta, y=y_0 + tb, z=z_0 + tc$
- 대칭방정식 : $\frac{x-x_0}{a}=\frac{y-y_0}{b}=\frac{z-z_0}{c}$ ($a,b,c\neq 0$)

법선벡터와 한 점이 있을 때, $n(a,b,c), P(x_0, y_0, z_0)$에 대해서 아래의 방정식이 성립합니다.

- $n * P_0P = (a, b, c) * (x - x_0, y - y_0, z - z_0) = 0$
- $ax+by+cz = d$

점 $P$에서 벡터 $x=OQ$에 내린 수선의 발을 $S$라 할 때 $p=OS$를 $x$ 위로의 $y=OP$의 정사영이라고 하며 $proj_xy$로 나타냅니다.

<img src="https://velog.velcdn.com/images/devjo/post/d2c68274-0834-4e19-bc80-add8f34a479e/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

위 이미지처럼 p는 x에 평행이므로 $p = tx$라고 할 수 있으며, $y-p$는 x에 직교하므로 $x * (y-p) = 0$으로 나타낼 수 있습니다. 즉 $t = \frac{y*x}{\begin{Vmatrix} x \end{Vmatrix}^2}$ 임이 증명됩니다.

---

### 참고 자료

[원본 경로 #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)
---
title: 'Vector'
date: '2023-03-03'
tags: ['Linear algebra', 'lecture']
---

### Warm up

<img src="https://velog.velcdn.com/images/devjo/post/6853698c-9d01-4930-9730-b186e84aebff/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

벡터는 크기와 방향을 동시에 나타냅니다. 예를 들어 벡터가 되는 것과 되지 못하는 것을 구분해보자면 시속 5마일로 움직인다는 정보는 벡터가 될 수 없습니다. 그 이유는 물체가 어느 방향으로 움직이는지 알 수 없기 때문입니다. 하지만 이 정보는 스칼라가 될 수는 있습니다.

이러한 정보가 벡터가 될 수 있는 방법은 위치 정보이고 즉, 시속 5마일로 동쪽으로 이동한다는 정보가 있다면 이는 벡터가 될 수 있습니다.

---

### N space

시작점과 끝점이 같은 벡터는 영벡터라고 하며 이 벡터는 크기가 0이므로 방향을 임의의 방향으로 하여도 됩니다.

두 실수를 $x_1, x_2$를 벡터의 성분이라고 하고 벡터공간 $x=\begin{bmatrix}x_1\\x_2 \end{bmatrix}$로 나타낼 수 있습니다.

실수 전체의 집합 $R$에서 벡터 $v_1, v_2, … ,v_n$이고 계수가 실수인 $c_1, c_2, …, c_n$일 때 $x=c_1x_1 + c_2x_2, …, c_nx_n$인 형태를 일차결합이라고 합니다.

---

### Sum of vector

$\vec{a}=\begin{bmatrix} 6 \\ -2 \end{bmatrix}$, $\vec{b}=\begin{bmatrix} -4 \\ 4 \end{bmatrix}$가 있을 때 $\vec{a} + \vec{b} = \begin{bmatrix} 2 \\ 2 \end{bmatrix}$ 와 같이 덧셈이 가능합니다. n차원 공간 상에서 $\vec{a}$, $\vec{b}$는 크기가 같은 여러 시작점 및 끝점을 가진 벡터로 그려질 수 있습니다. 결국 중요한 것은 크기와 방향임은 변하지 않습니다.

---

### Product of vector

$\vec{a}=\begin{bmatrix} 2 \\ 1 \end{bmatrix}$이 있을 때 $\vec{a}$에 3을 곱하게 되면 $3*\begin{bmatrix} 2 \\ 1 \end{bmatrix}=\begin{bmatrix} 6 \\ 3 \end{bmatrix}$이 됩니다. 이러한 과정으로 벡터는 방향은 바뀌지 않고 대신 scale이 바뀌게 됩니다. 다만 음수를 곱하게 된다면 방향도 바뀝니다.

---

### Unit vector

단위벡터를 표시하는 방법은 $i = \begin{bmatrix} 1 \\ 0 \end{bmatrix}$으로 가능하며 이는 수직방향은 고려하지 않는 경우입니다. 반대로 수평방향을 고려하지 않을 경우에는 $j = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$로 표현가능합니다.

이를 통해서 $\vec{v} = \begin{bmatrix} 2 \\ 3 \end{bmatrix}$에 대해서 $2i+3j$로 덧셈이 가능함을 알 수 있습니다.

---

### Dot product and Orthogonal

$\begin{vmatrix}x \end{vmatrix}$=$\sqrt{x_1^2+x_2^2,…,x_n^2}$을 $x$의 노름이라고 합니다. 이러한 정의를 통해 $x$는 원점에서 $P$에 이르는 거리로 정의됨을 의미합니다.

코시슈바르츠 부등식은 실수 전체 집합에서의 임의의 벡터 x, y에 대하여 아래의 수식이 성립하는 경우입니다. $\begin{Vmatrix} x*y \end{Vmatrix}\leq\begin{Vmatrix} x \end{Vmatrix} \begin{Vmatrix} y \end{Vmatrix}$ 단, 등호는 $x, y$중 하나가 다른 것의 실수배일 때만 가능합니다.

또한 사이각 공식을 수식으로 풀이하면 $x*y=\begin{Vmatrix} x \end{Vmatrix} \begin{Vmatrix} y \end{Vmatrix} cos\theta$와 같습니다.

위에서 나온 노름 공식을 응용하여 노름이 1인 벡터, 즉 $\begin{Vmatrix} x \end{Vmatrix} = 1$일 때 단위벡터라고 부르기로 합니다. 또한 두 벡터가 서로 직교하면 이를 직교(orthogonal)이라고 하며 서로 직교이면서 각각 단위벡터인 경우는 정규직교(orthonormal)이라고 부르기로 합니다.

$u=\frac{1}{\begin{Vmatrix} x \end{Vmatrix}} * x$와 같이 나타내면 이는 단위벡터이면서 크기가 1인 기본단위벡터(표준단위벡터)가 됩니다.

---

### Vector equation

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

[원본 경로 #2](https://www.boostcourse.org/ai151/joinLectures/194162)

[원본 경로 #3](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)

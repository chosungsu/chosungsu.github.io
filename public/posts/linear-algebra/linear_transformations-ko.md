---
title: 'Linear Transformations'
date: '2023-03-03'
tags: ['Linear algebra', 'lecture']
---

### Warm up

$V,W$가 벡터 공간일 때 함수 $L(ru+sv) = rL(u) + sL(v)$를 만족하면 선형이라고 합니다.

---

### The consequence of linearity

함수 $L$이 선형이고 $L \begin{pmatrix} 1 \\ 0\end{pmatrix} = \begin{pmatrix} 5 \\ 3\end{pmatrix}$이라면 $L \begin{pmatrix} 2 \\ 0\end{pmatrix} L \begin{pmatrix} 3 \\ 0\end{pmatrix} \dots$ 이후의 정보는 필요하지 않습니다. 그 이유는 동차성에 의해서 $L \begin{pmatrix} 5 \\ 0\end{pmatrix} = L (5\begin{pmatrix} 1 \\ 0\end{pmatrix}) = 5 \begin{pmatrix} 5 \\ 3\end{pmatrix}$을 계산할 수 있기 때문입니다.

또한 $R^n$차원에서 $n$-벡터의 출력을 모두 지정한 경우에도 그 이상의 정보는 필요하지 않습니다.

---

### Linear functions on Hyperplanes

선형 연산자를 행렬로 작성하는 것이 쉬운 것은 아니며 정의역이 초평면인 선형 함수를 표현하는 것은 아래와 같이 가능합니다.

$$
V = \{c_1 \begin{pmatrix} 1 \\ 1 \\ 0\end{pmatrix} + c_2 \begin{pmatrix} 0 \\ 1 \\ 1\end{pmatrix} \}
$$

$L : V \rightarrow R^3$을 따르는 선형 함수가 있다면 

$$
L \begin{pmatrix} 1 \\ 1 \\ 0\end{pmatrix} = \begin{pmatrix} 0 \\ 1 \\ 0\end{pmatrix}, \\
L \begin{pmatrix} 0 \\ 1 \\ 1\end{pmatrix} = \begin{pmatrix} 0 \\ 1 \\ 0\end{pmatrix}, \\
L [c_1\begin{pmatrix} 1 \\ 1 \\ 0\end{pmatrix} + c_2 \begin{pmatrix} 0 \\ 1 \\ 1\end{pmatrix}] = (c_1 + c_2)\begin{pmatrix} 0 \\ 1 \\ 0\end{pmatrix}
$$

이렇게 지정이 가능해지고 $L$의 정의역은 평면이고 치역은 $x^2$ 방향의 원점을 지나는 선이 됩니다.

---

### Linear differential operators

예를 들어 표준 덧셈과 스칼라 곱셈을 가진 이차 다항식 공간을 아래와 같이 정의하고 

$$
V = \{a_0 \cdot 1 + a_1x + a_2x^2\}
$$

$\frac{d}{dx} : V \to V$를 미분 연산자라고 합시다. 그 때 아래의 세 방정식은 미분 연산자의 선형성과 함께 미분이 가능함을 보입니다.

$$
\frac{d}{dx} 1 = 0, \frac{d}{dx} x = 1, \frac{d}{dx}x^2 = 2x \\
\Rightarrow \frac{d}{dx}(a_0 \cdot 1 + a_1 x + a_2 x^2) = 0 + a_1 + 2a_2x
$$

---

### Bases

선형 대수에서 숨겨진 단순성을 활용하는데 많은 자유도가 있습니다. 예를 들어 아래의 선형 연산자 $L$은 두 등식에 의해 $R^2$차원에서 완전히 지정이 가능합니다.

$$
L\begin{pmatrix} 1 \\ 1\end{pmatrix} = \begin{pmatrix} 2 \\ 4\end{pmatrix}, L\begin{pmatrix} 1 \\ -1\end{pmatrix} = \begin{pmatrix} 6 \\ 8\end{pmatrix}
$$

임의의 벡터 $\begin{pmatrix} x \\ y \end{pmatrix}$가 $\begin{pmatrix} 1 \\ 1 \end{pmatrix}$와 $\begin{pmatrix} 1 \\ -1 \end{pmatrix}$의 배수의 합으로 표현될 수 있기 때문이며, 이는 다음과 같이 연립 선형 방정식 문제로 계산될 수 있습니다.

$$
\begin{pmatrix} x \\ y \end{pmatrix} = a \begin{pmatrix} 1 \\ 1 \end{pmatrix} + b \begin{pmatrix} 1 \\ -1 \end{pmatrix} \\
\Rightarrow \begin{pmatrix} 1 & 1 & x \\ 1 & -1 & y \end{pmatrix} \\
\sim \begin{pmatrix} 1 & 0 & \frac{x+y}{2} \\ 0 & 1 & \frac{x-y}{2} \end{pmatrix}
$$

따라서 선형성을 적용하여 임의의 벡터에 대한 계산을 할 수 있게 되는데 $L\begin{pmatrix} x \\ y\end{pmatrix} = \begin{pmatrix} x+y \\ 2(x+y)\end{pmatrix} + \begin{pmatrix} 3(x-y) \\ 4(x-y)\end{pmatrix} = \begin{pmatrix} 4x-2y \\ 6x-2y\end{pmatrix}$처럼 단지 두 입력을 통해 지정이 됨을 알 수 있습니다.

차원이란 사용할 수 있는 독립적인 방향의 수로 두 방향에 의해 결정된 평면에 있지 않은 벡터가 있다면 그 중 하나를 다음 방향으로 선택하는 것을 말합니다. 이러한 독립적인 벡터들의 최소 집합을 기저(bases)라고 하며 기저에 있는 벡터의 수가 벡터 공간의 차원이 되는 것입니다. 모든 벡터 공간에는 많은 기저가 있지만 모든 기저는 같은 수의 벡터를 가집니다.

---

### 참고 자료

[원본 경로 #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[원본 경로 #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)
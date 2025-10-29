---
title: 'Linear Independence'
date: '2023-03-08'
tags: ['Linear algebra', 'lecture']
---

### Warm up

$R^3$의 원점을 포함하는 평면 $P$와 $P$내의 0이 아닌 벡터 $\{u,v,w\}$가 있다고 할 때, 이 중 어느 두 벡터도 평행하지 않다면 $P = \text{span}\{u,v,w\}$입니다.

하지만 임의의 두 벡터로 평면을 결정하기 때문에 $u, v$를 사용한다면 $w=d_1u+d_2v$를 만족하는 상수가 존재할 것입니다. 그렇다면 $w$는 독립적이지 않다고 말합니다. 다시 말하면 선형 종속은 모두 0이 아닌 상수가 곱해져 있을 때입니다.

---

### Linear dependence

세 개의 벡터가 아래와 같이 존재합니다.

$$
v_1 = \begin{pmatrix} 0 \\ 0 \\ 1\end{pmatrix}, v_2 = \begin{pmatrix} 1 \\ 2 \\ 1\end{pmatrix}, v_3 = \begin{pmatrix} 1 \\ 2 \\ 3\end{pmatrix}
$$

이를 선형 독립인지 알아보기 위해서 $c_1, c_2, c_3$과 함께 동차 시스템을 구성할 수 있습니다.

$$
\begin{pmatrix} v_1 & v_2 & v_3\end{pmatrix} \begin{pmatrix} c_1 \\ c_2 \\ c_3\end{pmatrix} = 0
$$

위 시스템은 행렬 $M = \begin{pmatrix} v_1 & v_2 & v_3 \end{pmatrix}$가 singular일 때만 해를 가지는데 행렬식은 $\det M = det \begin{pmatrix} 0 & 1 & 1 \\ 0 & 2 & 2 \\ 1 & 1 & 3\end{pmatrix} = 0$으로 자명하지 않은 해가 존재하는 선형 종속임을 알 수 있습니다.

또 다른 방법으로 선형 종속을 입증하는 계수를 아래와 같이 연립 선형 방정식을 풀어서 찾을 수 있습니다.

$$
\begin{aligned}
\begin{pmatrix} 0 & 1 & 1 & | & 0 \\ 0 & 2 & 2 & | & 0 \\ 1 & 1 & 3 & | & 0\end{pmatrix} \\
\sim \begin{pmatrix} 1 & 1 & 3 & | & 0 \\ 0 & 1 & 1 & | & 0 \\ 0 & 0 & 0 & | & 0\end{pmatrix} \\
\sim \begin{pmatrix} 1 & 0 & 2 & | & 0 \\ 0 & 1 & 1 & | & 0 \\ 0 & 0 & 0 & | & 0\end{pmatrix}
\end{aligned}
$$

해집합은 $\{-2, -1, 1\}$을 통해서 선형 결합을 하면 $c_1v_1 + c_2v_2 + c_3v_3 = 0 \rightarrow -2v_1 -v_2 +v_3 = 0$으로 나타낼 수 있는 것입니다. 즉 벡터 중 하나를 다른 벡터의 선형 결합으로 표현하는 것이 가능하다면 선형 종속입니다.

---

### Linear Independence

벡터 집합이 선형 종속임을 보이는 것은 0과 같은 벡터의 선형 결합을 찾거나 벡터 중 하나를 다른 벡터의 선형 결합으로 표현하는 것이 가능할 때입니다. 반면에, 벡터 집합이 선형 독립임을 확인하기 위해서는, 0이 아닌 계수를 가진 벡터들의 모든 선형 결합이 0 벡터가 아닌 다른 것을 산출한다는 것을 확인해야 합니다.

아래에 세 개의 벡터를 나열하겠습니다.

$$
v_1 = \begin{pmatrix} 0 \\ 0 \\ 2\end{pmatrix}, v_2 = \begin{pmatrix} 2 \\ 2 \\ 1\end{pmatrix}, v_3 = \begin{pmatrix} 1 \\ 4 \\ 3\end{pmatrix}
$$

이 벡터들을 선형 독립을 확인하기 위해서 $c_1v_1 + c_2v_2 + c_3v_3 = 0$이 해를 가지는지 동차 시스템으로 써서 행렬 $M = \begin{pmatrix} v_1 & v_2 & v_3 \end{pmatrix}$가 singular일 때에만 해를 가지기 때문에 행렬식 $det M = 12 \ne 0$으로 0이 아닌 행렬식의 결과는 $c_1 = c_2 = c_3 = 0$으로 고정이 되어야 합니다. 따라서 선형 독립이라고 할 수 있습니다.

---

### From Dependent to Independent

이제 벡터 $v_1, \dots, v_n$이 선형 종속이고 $c_1$ 계수가 0이 아니라고 가정해 보겠습니다. 그렇다면 $\text{span} \{v_1, \dots, v_n\} = \text{span}\{v_2, \dots, v_n\}$이 되고 $\mathbf{x} \in \text{span}\{v_1, \dots, v_n\}$에서 $v_1 = -\frac{c_2}{c_1}v_2 -\cdots -\frac{c_n}{c_1}v_n$이 되므로 대입하면 $\mathbf{x} = a_1 (-\frac{c_2}{c_1}v_2 -\cdots -\frac{c_n}{c_1}v_n) + a_2v_2 + \cdots + a_nv_n = (a_2 - a_1 \frac{c_2}{c_1})v_2 + \cdots + (a_n - a_1 \frac{c_n}{c_1})v_n$이라 정리할 수 있습니다.

벡터 공간을 $\text{span}$으로 쓸 때 그 목록이 가능한 짧아지기를 원하기 때문에 예를 들어 $S = \text{span}\{1 + t, 1 + t^2, t + t^2, 2 + t + t^2, 1 + t + t^2\}$과 같이 존재하는 $\text{span}$에서 $v_4=v_1+v_2$로 합을 통해 표현되는 벡터가 있다면 제거도 가능합니다. 따라서 이렇게 제거가 된 $S = \text{span}\{1 + t, 1 + t^2, t + t^2\}$를 최소 생성 집합(minimal spanning set)이라고 합니다. 그리고 이러한 집합은 $S$에 대한 기저라고 합니다.

---

### 참고 자료

[원본 경로 #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[원본 경로 #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)
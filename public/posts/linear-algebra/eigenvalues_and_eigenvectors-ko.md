---
title: 'Eigenvalues and Eigenvectors'
date: '2023-03-10'
tags: ['Linear algebra', 'lecture']
---

### Warm up

String Theory에서 점 $x$에서 시간 $t$에서의 변위가 함수 $y(x,t)$로 주어지는 진동하는 현을 생각하면 현에 대한 모델링은 아래와 같습니다.

$$
V = \left\{y : R^2 \rightarrow R | \frac{\partial^{k+m} y(x,t)}{\partial x^k \partial t^m}\right\}
$$

점 $(x, t)$에서 현의 오목함(concavity)과 가속도(acceleration)는 각각 $\frac{\partial^2 y}{\partial x^2}(x, t)$와 $\frac{\partial^2 y}{\partial t^2}(x, t)$입니다. 파동 방정식이 성립하려면 현의 각 지점에서 양이 존재해야 하므로, 우리는 $y(x, t)$의 모든 편도함수가 존재하도록 요구했습니다.

<img src="https://velog.velcdn.com/images/devjo/post/bb6ce9e1-e8b9-430c-8802-515276ee70ce/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

또한 회색으로 그려진 함수 $y(x, t) = 0$은 벡터 공간 $V$에서 유일하게 특별한 벡터입니다.이제 몇 가지 추가 정보를 추가해 봅시다. 현의 시간과 공간에서의 거동은 파동 방정식(wave equation)

$$
\frac{\partial^2 y}{\partial t^2} = \frac{\partial^2 y}{\partial x^2}
$$

으로 모델링될 수 있습니다. 이 방정식은 현의 한 지점의 가속도가 그 지점에서의 오목함과 같다고 말합니다.

$V$의 모든 함수가 파동 방정식의 해는 아닙니다. 벡터 공간 $V$의 모든 함수가 현이 실제로 진동하는 방식을 설명하는 것은 아닙니다. 현이 실제로 진동하는 방식은 (적어도 근사적으로) 위 파동 방정식의 해이며, 이는 선형 함수

$$
W y = 0
$$

으로 다시 작성될 수 있습니다. 또한 위 식은 동차 선형 방정식이므로, 해의 선형 결합도 해입니다. 즉, 핵 $\text{ker}(W)$은 벡터 공간입니다.

$$
y(x, t) = \sin(\omega t) v(x)
$$

형태의 해를 살펴보는 것으로 모델링됩니다. 여기서 주기적인 사인 함수는 현의 진동 운동을 설명하는 반면, 함수 $v(x)$는 주어진 고정된 순간의 현의 모양을 제공합니다. 그러면, $W(y) = 0$을 원하고, 이는 $\frac{d^2 f}{dx^2} = \omega^2 f$를 의미하므로, 진동하는 현의 모양을 결정하는 벡터 $v(x) \in U$는 다음을 따릅니다.

$$
L(v) = \lambda v
$$

이것은 바로 고유값-고유 벡터 방정식(eigenvalue-eigenvector equation)입니다.

---

### Invariant Directions

<img src="https://velog.velcdn.com/images/devjo/post/6c5888c7-f023-4d59-a605-d1efb4d44a0e/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

한 쌍의 벡터 $e_1, e_2$를 무작위로 선택한 후 원점에 모서리가 있는 단위 정사각형이 평행사변형으로 매핑되는 과정이 있습니다. 입력이 $\mathbf{f}_1$과 $\mathbf{f}_2$로 생성된 평행사변형에 있을 때 출력도 동일한 두 방향을 따라 놓인 모서리를 가진 평행사변형을 형성하도록 두 벡터 $\mathbf{f}_1$과 $\mathbf{f}_2$가 신중하게 선택되었습니다.

선형 변환 $L$에 대해서 아래와 같이 정의하면 

$$
\begin{aligned}
& L \begin{pmatrix} 1 \\ 0\end{pmatrix} = \begin{pmatrix} -4 \\ -10\end{pmatrix} \\
& L \begin{pmatrix} 0 \\ 1\end{pmatrix} = \begin{pmatrix} 3 \\ 7\end{pmatrix}
\end{aligned}
$$

벡터는 방향과 크기이므로 선형 변환 내부 값이 변하면 당연히 벡터의 방향과 크기 모두 변한다는 것을 알 수 있습니다. 행렬은 $\begin{pmatrix} -4 & 3 \\ -10 & 7\end{pmatrix}$이므로 $L \begin{pmatrix} 1 \\ 2\end{pmatrix} = \begin{pmatrix} -4 \times 1 + 3 \times 2 \\ -10 \times 1 + 7 \times 2\end{pmatrix} = 2 \begin{pmatrix} 1 \\ 2\end{pmatrix}$과 같이 방향은 고정되지만 길이만 2배가 되는 경우도 있습니다.

0이 아닌 임의의 벡터 $\mathbf{v}$는 $L$의 고유 벡터(eigenvector)라고 불리며, $\lambda$는 고유값(eigenvalue)이라고 불립니다. 행렬이 $\begin{pmatrix} -4 & 3 \\ -10 & 7 \end{pmatrix}$인 선형 변환 $L$의 예시에서, 우리는 $L$이 각각 고유값 1과 2를 가진 고유 벡터 $\mathbf{v}_1$과 $\mathbf{v}_2$로 표현되는 두 개의 불변 방향을 가진다는 속성을 누리고 있음을 보았습니다.

이제 $w = r \mathbf{v}_1 + s \mathbf{v}_2$를 만족하는 상수 $r$과 $s$가 있다고 가정합니다.

$$
L(w) = L(r \mathbf{v}_1 + s \mathbf{v}_2) = r L(\mathbf{v}_1) + s L(\mathbf{v}_2) = r \mathbf{v}_1 + 2 s \mathbf{v}_2
$$

$L$은 단순히 숫자 $r$에 1을 곱하고 숫자 $s$에 2를 곱합니다. 이것을 행렬로 작성할 수 있다면 다음과 같을 것입니다.

$$
\begin{pmatrix} 1 & 0 \\ 0 & 2 \end{pmatrix} \begin{pmatrix} r \\ s \end{pmatrix}
$$

이는 일반적인 시나리오

$$
L \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} a & b \\ c & d \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} ax + by \\ cx + dy \end{pmatrix}$$

보다 훨씬 깔끔합니다. 여기서 $r$과 $s$는 벡터 $\mathbf{v}_1$과 $\mathbf{v}_2$의 관점에서 $w$의 좌표를 제공하며 매우 간단한 대각 행렬을 가짐을 봅니다. 이 과정을 대각화(diagonalization)라고 합니다.

이어서 $L: \mathbb{R}^2 \to \mathbb{R}^2$를 $L(x, y) = (2x + 2y, 16x + 6y)$라고 합시다. 

$$
\begin{aligned}
& \begin{pmatrix} 2 & 2 \\ 16 & 6 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \lambda \begin{pmatrix} x \\ y \end{pmatrix} \\
& \Rightarrow \begin{pmatrix} 2 & 2 \\ 16 & 6 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} \lambda & 0 \\ 0 & \lambda \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} \\
& \Rightarrow
\begin{pmatrix} 2 - \lambda & 2 \\ 16 & 6 - \lambda \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}
\end{aligned}
$$

이것은 동차 시스템이므로, 행렬 $\begin{pmatrix} 2 - \lambda & 2 \\ 16 & 6 - \lambda \end{pmatrix}$이 특이(singular)일 때에만 해를 가집니다. 따라서 행렬식 $det M = (2 - \lambda)(6-\lambda) - 32 = 0$을 만족하는 $\lambda = -2, 10$이 고유값이 됩니다.

---

### Eigenvalues and Eigenvectors Equation

$L: V \to V$가 선형이고, 어떤 스칼라 $\lambda$와 $\mathbf{v} \ne 0_V$에 대해

$$
L \mathbf{v} = \lambda \mathbf{v}
$$

이면, $\lambda$는 고유 벡터 $\mathbf{v}$를 가진 $L$의 고유값입니다. 이 방정식은 동일 $v$의 방향은 선형 변환 $L$ 하에서 불변입니다. 동차 시스템 $(M - \lambda I) \mathbf{v} = 0$을 풀어 특이(singular)일 때에만 해를 가지고 고유값 $\lambda$와 관련 고유 벡터 $\mathbf{v}$를 찾을 수 있습니다.

이 방정식의 좌항은 $M$의 특성 다항식 $P_M(\lambda)$라고 불리는 $\lambda$ 변수에 대한 다항식이며 $n \times n$ 행렬의 경우 차수 $n$을 가집니다.

$$
\begin{aligned}
& P_M(\lambda) = \lambda^n + c_1 \lambda^{n-1} + \cdots + c_n, \\
& P_M(0) = det(-M) = (-1)^n det(M)
\end{aligned}
$$

대수학 정의에 의해 다항식은 $C$에 대한 1차 다항식의 곱으로 인수분해가 되며 $n$개의 복소수를 사용하여 $P_M(\lambda) = (\lambda - \lambda_1)(\lambda - \lambda_2) \cdots (\lambda - \lambda_n) \Rightarrow P_M(\lambda_i) = 0$임을 의미하게 됩니다. 각 근은 실수이거나 복소수이거나 0일 수 있으며 모두 다를 필요는 없습니다. 겹치는 횟수는 중복도(multiplicity)라고 하게 됩니다.

$$
L \begin{pmatrix} x \\ y \\ z \end{pmatrix} = \begin{pmatrix} 2x + y - z \\ x + 2y - z \\ -x - y + 2z \end{pmatrix}
$$

위 선형 변환의 예가 있을 때 행렬 $M$은 $L_{e_i}$를 열로 가지므로, 

$$
\begin{pmatrix} x \\ y \\ z \end{pmatrix} \rightarrow \begin{pmatrix} 2 & 1 & -1 \\ 1 & 2 & -1 \\ -1 & -1 & 2 \end{pmatrix} \begin{pmatrix} x \\ y \\ z \end{pmatrix}
$$

이에 대한 특성 방정식은 각 인자의 부호를 반대로 하여 계산하며 아래와 같습니다.

$$
\begin{aligned}
& P_M(\lambda) = det \begin{pmatrix} \lambda - 2 & -1 & 1 \\ -1 & \lambda - 2 & 1 \\ 1 & 1 & \lambda - 2 \end{pmatrix} \\
&= (\lambda-1)^2(\lambda - 4) = 0
\end{aligned}
$$

따라서 $\lambda = 1, 4$가 고유값이 되며 각각 중복도 2, 1을 갖습니다. 이제는 각 고유값에 대한 고유 벡터를 구해보겠습니다.

$$
\begin{aligned}
& \begin{pmatrix}
2-4 & 1 & -1 & | & 0\\
1 & 2-4 & -1 & | & 0 \\
-1 & -1 & 2-4 & | & 0
\end{pmatrix} \\
& \sim
\begin{pmatrix}
1 & -2 & -1 & | & 0 \\
0 & -3 & -3 & | & 0 \\
0 & -3 & -3 & | & 0
\end{pmatrix} \\
& \sim
\begin{pmatrix}
1 & 0 & 1 & | & 0 \\
0 & 1 & 1 & | & 0 \\
0 & 0 & 0 & | & 0
\end{pmatrix}
\end{aligned}
$$

$\lambda = 4$에 대한 첨가 행렬을 통해 $x=-z, y=-z$를 알게 되고 $t\begin{pmatrix} -1 \\ -1 \\ 1\end{pmatrix}$ 형태의 모든 벡터는 고유벡터로 볼 수 있습니다. 다음으로 $\lambda = 1$일 때 첨가 행렬은 아래와 같습니다.

$$
\begin{aligned}
& \begin{pmatrix}
2-1 & 1 & -1 & | & 0\\
1 & 2-1 & -1 & | & 0 \\
-1 & -1 & 2-1 & | & 0
\end{pmatrix} \\
& \sim
\begin{pmatrix}
1 & 1 & -1 & | & 0 \\
1 & 1 & -1 & | & 0 \\
-1 & -1 & 1 & | & 0
\end{pmatrix} \\
& \sim
\begin{pmatrix}
1 & 1 & -1 & | & 0 \\
0 & 0 & 0 & | & 0 \\
0 & 0 & 0 & | & 0
\end{pmatrix}
\end{aligned}
$$

따라서 해 집합은 $z=t, y=s$로 두 자유 매개변수를 지정하고 $x=-s+t$라고 생각할 수 있게 됩니다. 그리고 $\left\{ s \begin{pmatrix} -1 \\ 1 \\ 0 \end{pmatrix} + t \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} \mid s, t \in \mathbb{R} \right\}$에 대해서 불변한 상태가 됩니다.

---

### Eigenspaces

같은 고유값을 공유하는 고유 벡터의 임의의 합은 다시 고유 벡터입니다. 고유값 $\lambda$를 가진 모든 벡터의 공간을 고유 공간(eigenspace)이라고 합니다. 이것은 실제로는 더 큰 벡터 공간 $V$ 내에 포함된 벡터 공간입니다. $L 0_V = 0_V = \lambda 0_V$이므로 $0_V$를 포함하며, 위의 계산에 의해 덧셈 및 스칼라 곱셈에 대해 닫혀 있습니다.

---

### 참고 자료

[원본 경로 #1](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)

[원본 경로 #2](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[원본 경로 #3](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)
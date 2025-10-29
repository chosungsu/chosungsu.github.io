---
title: 'Orthonormal Bases and Complements'
date: '2023-03-13'
tags: ['Linear algebra', 'lecture']
---

### Standard basis

일반적인 내적(inner product)을 사용할 수 있게 되면, 벡터의 길이와 벡터 사이의 각도를 측정할 수 있게 됩니다.

$\mathbf{x} = (x_1, x_2, \dots, x_n) \in \mathbb{R}^n$ 벡터의 표준 길이 개념은 다음과 같습니다.

$$
\begin{aligned}
& \Vert \mathbf{x} \Vert = \sqrt{\mathbf{x} \cdot \mathbf{x}} \\
&= \sqrt{(x_1)^2 + (x_2)^2 + \cdots + (x_n)^2}
\end{aligned}
$$

$\mathbb{R}^n$의 정규/표준 기저 $\mathbf{e}_1, \mathbf{e}_2, \dots, \mathbf{e}_n$는 내적과 길이에 관해 많은 유용한 속성을 가지고 있습니다. 우선 각 표준 기저 벡터는 단위 길이(unit length)를 가지며 직교하는 성질이 있습니다.

따라서 아래와 같이 요약됩니다.

$$
\mathbf{e}_i^T \mathbf{e}_j = \delta_{ij} = \begin{cases} 1 & i = j \\ 0 & i \neq j \end{cases}
$$

여기서 $\delta_{ij}$는 크로네커 델타(Kronecker delta)입니다. 크로네커 델타가 항등 행렬의 항목을 제공합니다. 열 벡터 $\mathbf{v}$와 $\mathbf{w}$가 주어지면, $\mathbf{v} \cdot \mathbf{w}$는 행렬 곱셈 $\mathbf{v}^T \mathbf{w}$와 같다는 것을 보이는 것이 내적 핵심입니다.

또한 $\mathbf{v}\mathbf{w}^T$인 외적(outer product)을 형성할 수 있으며, 이는 정사각 행렬을 제공합니다.

$$
\begin{aligned}
& \Pi_1 = \mathbf{e}_1 \mathbf{e}_1^T \\
& = \begin{pmatrix} 1 \\ 0 \\ \vdots \\ 0 \end{pmatrix} \begin{pmatrix} 1 & 0 & \cdots & 0 \end{pmatrix} \\
&= \begin{pmatrix} 1 & 0 & \cdots & 0 \\ 0 & 0 & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & 0 \end{pmatrix}
\end{aligned}
$$

이처럼 $\Pi_i$는 $i$번째 대각선 위치에 1이 있고 다른 모든 곳에 0이 있는 대각 정사각 행렬입니다. 그리고 $\Pi_i \Pi_j = \mathbf{e}_i \mathbf{e}_i^T \mathbf{e}_j \mathbf{e}_j^T = \mathbf{e}_i \delta_{ij} \mathbf{e}_j^T$가 될 수 있습니다.

$$
\Pi_i \Pi_j = \begin{cases} \Pi_i & i = j \\ 0 & i \neq j \end{cases}
$$

또한, 대각선 항목이 $\lambda_1, \dots, \lambda_n$인 대각 행렬 $D$에 대해, 우리는 다음과 같이 쓸 수 있습니다.

$$
D = \lambda_1 \Pi_1 + \cdots + \lambda_n \Pi_n
$$

---

### Orthogonal and Orthonormal Bases

직교 기저 $\{v_1, \dots, v_n\}$은 $v_i \cdot v_j = 0$일 때 모든 벡터가 수직임을 보일 수 있으며 정규 직교 기저 $\{u_1, \dots u_n\}$은 $u_i \cdot u_j = \delta_{ij}$를 만족할 때 직교함과 동시에 단위 길이(unit length)를 가지는 기저입니다.

$\mathcal{T} = \{\mathbf{u}_1, \dots, \mathbf{u}_n\}$가 $\mathbb{R}^n$의 정규 직교 기저라고 가정하고 $\mathcal{T}$는 기저이므로, 임의의 벡터 $\mathbf{v}$를 $\mathcal{T}$의 벡터의 선형 결합으로 유일하게 작성할 수 있습니다.

$$
\mathbf{v} = c^1 \mathbf{u}_1 + \cdots + c^n \mathbf{u}_n
$$

$\mathbf{v}$와 $\mathcal{T}$의 임의의 벡터 $\mathbf{u}_i$의 내적을 취하면 다음을 얻습니다.

$$
\begin{aligned}
& \mathbf{v} \cdot \mathbf{u}_i = c^1 (\mathbf{u}_1 \cdot \mathbf{u}_i) + \cdots + c^i (\mathbf{u}_i \cdot \mathbf{u}_i) + \cdots + c^n (\mathbf{u}_n \cdot \mathbf{u}_i) \\
&= c^1 \cdot 0 + \cdots + c^i \cdot 1 + \cdots + c^n \cdot 0 = c^i \\
& \Rightarrow c^i = \mathbf{v} \cdot \mathbf{u}_i \\
& \Rightarrow \mathbf{v} = (\mathbf{v} \cdot \mathbf{u}_1) \mathbf{u}_1 + \cdots + (\mathbf{v} \cdot \mathbf{u}_n) \mathbf{u}_n \\
&= \sum_i (\mathbf{v} \cdot \mathbf{u}_i) \mathbf{u}_i
\end{aligned}
$$

---

### Relating Orthonormal Bases

$\mathcal{T} = {\mathbf{u}_1, \dots, \mathbf{u}_n}$와 $\mathcal{R} = {\mathbf{w}_1, \dots, \mathbf{w}_n}$가 $\mathbb{R}^n$의 두 정규 직교 기저라고 가정합니다. 그러면 아래와 같이 내적할 수 있습니다.

$$
\begin{aligned}
& \mathbf{w}_1 = (\mathbf{w}_1 \cdot \mathbf{u}_1) \mathbf{u}_1 + \cdots + (\mathbf{w}_1 \cdot \mathbf{u}_n) \mathbf{u}_n \\
& \Rightarrow \mathbf{w}_i = \sum_j (\mathbf{u}_j \cdot \mathbf{w}_i) \mathbf{u}_j
\end{aligned}
$$

따라서 기저 변환 행렬 $P$는 $P = (p^j_i) = (\mathbf{u}_j \cdot \mathbf{w}_i)$로 주어질 수 있고 $PP^T$를 계산하면 내적곱으로 $(u \cdot v)(w \cdot z) = (u^Tv)(w^Tz) = u^T(vw^T)z$와 같이 표현해 볼 수 있습니다. 이 때 $\mathbf{v} \mathbf{w}^T$ 객체는 $\mathbf{v}$와 $\mathbf{w}$의 외적으로 만들어진 정사각 행렬입니다. 이 수식을 다시 전개해보면 아래와 같습니다.

$$
\begin{aligned}
& \sum_i (u_j \cdot w_i)(w_i \cdot u_k) \\
&= u^T_j [\sum_i (w_iw^T_i)]u_k \\
&= u^T_jI_nu_k = \delta_{jk}
\end{aligned}
$$

이를 통해 $\mathbf{P}^T = \mathbf{P}^{-1}$로 직교 행렬임을 확인할 수 있습니다. 이 때 대괄호 내부 수식이 항등 행렬이 되는 이유는 아래와 같습니다. 여기서 내적 $w^T_iw_j = \delta_{ij}$를 응용하여 보일 수 있습니다.

$$
\begin{aligned}
& (\sum_i w_iw^T_i)v \\
&=(\sum_i w_iw^T_i)(\sum_j c_jw_j) \\
&=\sum_j c_j \sum_i w_i(w^T_iw_j) \\
&=\sum_j c_j \sum_i w_i(w^T_iw_j) \\
&=\sum_j c_j \sum_i w_i \begin{cases} 1 & \text{if } i=j \\ 0 & \text{if } i \ne j \end{cases} \\
&=\sum_j c_j w_j \cdot 1 + \sum_j c_j \sum_{i \ne j} w_i \cdot 0 \\
&=\sum_j c_jw_j = v
\end{aligned}
$$

---

### Gram-Schmidt and Complements

벡터 $\mathbf{v}$와 $\text{span}\{\mathbf{v}\}$에 속하지 않는 다른 벡터 $\mathbf{u}$가 주어지면, 우리는 다음 새 벡터를 구성할 수 있습니다.

$$
\mathbf{v}^\perp := \mathbf{v} - \frac{\mathbf{u} \cdot \mathbf{v}}{\mathbf{u} \cdot \mathbf{u}} \mathbf{u}
$$

여기서 $\mathbf{v}^\perp$는 $\mathbf{u}$에 직교하는데 위 수식의 양변에 $\mathbf{u}$를 내적한다면 $\mathbf{u} \cdot \mathbf{v}^\perp = \mathbf{u} \cdot \mathbf{v} - \frac{\mathbf{u} \cdot \mathbf{v}}{\mathbf{u} \cdot \mathbf{u}} (\mathbf{u} \cdot \mathbf{u}) = 0$이 성립하기 때문입니다.

때때로 $\mathbf{v} = \mathbf{v}^\perp + \mathbf{v}^{\parallel}$로 표현되기도 하는데 $\mathbf{v}^{\parallel} = \frac{\mathbf{u} \cdot \mathbf{v}}{\mathbf{u} \cdot \mathbf{u}} \mathbf{u}$로 직교 분해를 하는 결과를 만듭니다. $\mathbf{u}, \mathbf{v}$가 $\mathbb{R}^3$의 선형 독립 벡터라면, 집합 ${\mathbf{u}, \mathbf{v}^\perp, \mathbf{u} \times \mathbf{v}^\perp}$는 $\mathbb{R}^3$의 직교 기저가 될 것입니다. 그런 다음 각 벡터를 길이로 나누어 정규 직교 기저를 얻을 수 있습니다.

이러한 과정을 토대로 선형 독립 벡터의 순서 집합 $(\mathbf{v}_1, \mathbf{v}_2, \dots)$이 주어지면, 다음 벡터들로 구성된 $\text{span}\{\mathbf{v}_1, \mathbf{v}_2, \dots\}$의 직교 기저를 정의할 수 있습니다.

$$
\begin{aligned}
& \mathbf{v}^\perp_1 := v_1 \\
& \mathbf{v}^\perp_2 := v_2-\frac{\mathbf{v}^\perp_1 \cdot \mathbf{v}_2}{\mathbf{v}^\perp_1 \cdot \mathbf{v}^\perp_1} \mathbf{v}^\perp_1 \\
& \mathbf{v}^\perp_i := \mathbf{v}_i - \cdots - \frac{\mathbf{v}^\perp_{i-1} \cdot \mathbf{v}_i}{\mathbf{v}^\perp_{i-1} \cdot \mathbf{v}^\perp_{i-1}} \mathbf{v}^\perp_{i-1}
\end{aligned}
$$

여기서 각 $\mathbf{v}^\perp_i$는 $i$보다 작은 모든 $j$에 대해 $\mathbf{v}^\perp_j$에 의존한다는 점이 확인됩니다. 이러한 과정을 그람 슈미트 직교화 과정이라고 합니다.

---

### QR Decomposition

그람-슈미트 과정은 또 다른 행렬 분해인 $\mathbf{M} = \mathbf{Q} \mathbf{R}$을 제안합니다. 여기서 $\mathbf{Q}$는 직교 행렬이고 $\mathbf{R}$은 상삼각 행렬입니다. 소위 QR 분해는 선형 시스템, 고유값 문제 및 최소 제곱 근사치를 푸는 데 유용합니다.

예시로 아래와 같은 행렬 $M$을 정의합니다.

$$
\mathbf{M} = \begin{pmatrix} 2 & -7/5 & 1 \\ 1 & 14/5 & -2 \\ 0 & 1 & -2 \end{pmatrix} \begin{pmatrix} 1 & 1/5 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix}
$$

위 행렬의 각 열벡터를 통해서 1열과 2열을 내적해보면 $\mathbf{a}_1^T\mathbf{a}_2=2 \cdot (-\frac{7}{5}) + 1 \cdot (\frac{14}{5}) + 0 \cdot 1 = 0$이므로 서로 직교합니다. 그리고 1열과 3열을 내적해보면 $\mathbf{a}_1^T\mathbf{a}_3 = 0$으로 역시 직교합니다.

이제 그람-슈미트 과정으로 $\mathbf{u}_1 = \mathbf{a}_1$, $\mathbf{u}_2=\mathbf{a}_2-proj_{\mathbf{u}_1}\mathbf{a}_2$, $\mathbf{u}_3=\mathbf{a}_3-proj_{\mathbf{u}_1}\mathbf{a}_3-proj_{\mathbf{u}_2}\mathbf{a}_3$와 같이 구하게 될 텐데 $proj_{\mathbf{u}}v = \frac{\mathbf{u}^T\mathbf{v}}{\mathbf{u}^T\mathbf{u}}u$이고 내적값이 0이 되어서 $\mathbf{u}_2=\mathbf{a}_2$, $\mathbf{a}_2^T\mathbf{a}_3 = -9$, $\mathbf{a}_2^T\mathbf{a}_2 = \frac{54}{5}$, $proj_{\mathbf{a}_2} \mathbf{a}_3 = -\frac{5}{6}\mathbf{a}_2$, $\mathbf{u}_3 = \mathbf{a}_3 + \frac{5}{6} \mathbf{a}_2 = \begin{pmatrix} -1/6 \\ 1/3 \\ -7/6 \end{pmatrix}$임을 구할 수 있게 됩니다.

따라서 정규화된 $Q$행렬은 아래와 같습니다.

$$
Q = \begin{pmatrix} \frac{2}{\sqrt{5}} & \frac{-7}{\sqrt{54}} & \frac{-1}{3\sqrt{6}} \\\frac{1}{\sqrt{5}} & \frac{14}{\sqrt{54}} & \frac{2}{3\sqrt{6}} \\ 0 & \frac{5}{\sqrt{54}} & \frac{-7}{3\sqrt{6}}\end{pmatrix}
$$

그리고 상삼각행렬인 $R_{ij} = q^T_ia_j$을 구해보면 아래와 같습니다.

$$
\begin{aligned}
& R_{11} = \Vert \mathbf{a}_1 \Vert = \sqrt{5}, \\
& R_{12} = q^T_1\mathbf{a}_2 = 0, \\
& R_{22} = \Vert \mathbf{a}_2 \Vert = \frac{54}{5}, \\
& R_{23} = q^T_2 \mathbf{a}_3 = -\frac{9}{\sqrt{54}/\sqrt{5}}, \\
& R_{33} = \Vert \mathbf{u}_3 \Vert = \frac{\sqrt{6}}{2} \\
& \Rightarrow R = \begin{pmatrix} \sqrt{5} & 0 & 0 \\ 0 & \frac{54}{5} & -\frac{9}{\sqrt{54}/\sqrt{5}} \\ 0 & 0 & \frac{\sqrt{6}}{2}\end{pmatrix}
\end{aligned}
$$

---

### 참고 자료

[원본 경로 #1](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)

[원본 경로 #2](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[원본 경로 #3](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)
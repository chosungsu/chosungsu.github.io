---
title: 'Change of basis'
date: '2023-03-13'
tags: ['Linear algebra', 'lecture']
---

### Change of Basis

$\varepsilon P_B$가 벡터 $x$의 $B$좌표 $[x]_B$를 입력으로 받아서 표준 기저의 좌표를 반환하는 것을 살펴보았었는데 이제 두개의 기저 $B,C$가 모두 표준 기저 $E$가 아닌 경우를 고려하겠습니다.

$B = {v_1, v_2, \dots, v_n}$과 $C = {w_1, \dots, w_n}$를 $R^n$의 두 기저라고 하고 $\varepsilon P_B=[v_1 v_2 \dots v_n], \varepsilon P_C=[w_1 w_2 \dots w_n]$이라고 정의합니다. 만약 $[x]_C$가 기저 $C$에 대한 $x$의 좌표벡터라면 $x=(\varepsilon P_C)[x]_C$가 성립합니다.

관계식을 결합해보면 $\varepsilon P_C[x]_C=\varepsilon P_B[x]_B$이고 $\varepsilon P_C$가 가역행렬이므로 양변에 역함수를 곱한다면 $[x]_C=(\varepsilon P_C)^{-1}*(\varepsilon P_B)[x]_B=[(\varepsilon P_C)^{-1}v_1 (\varepsilon P_C)^{-1}v_2 \dots (\varepsilon P_C)^{-1}v_n]=(\varepsilon P_C)^{-1}(\varepsilon P_B)$를 얻을 수 있습니다. 따라서 이 결과는 $x$의 $B$좌표를 $C$좌표로 변환되는 과정입니다. 그리고 $i$번째 열인 $(\varepsilon P_C)^{-1}v_i$가 기저 $C$에 대한 좌표 벡터를 말합니다.

$(\varepsilon P_C)^{-1}(\varepsilon P_B)$를 계산하려면 $\varepsilon P_C$와 $\varepsilon P_B$를 첨가행렬로 합쳐 행소거를 통해 RREF로 만들어 구합니다.

---

### Inner Product

$R^n$에서의 내적은 $R^2, R^3$ 벡터들의 내적을 일반화합니다.

$u = (u_1, u_2, \dots, u_n)$와 $v = (v_1, v_2, \dots, v_n)$가 $R^n$의 벡터일 때 내적은 $u \cdot v=u_1v_1+u_2v_2 + \cdots +u_nv_n=u^Tv=[u_1 u_2 \dots u_n]\begin{bmatrix} v_1 \\ v_2 \\ \vdots \\ v_n\end{bmatrix}$와 같습니다.

내적은 $u,v,w \in R^n$ 벡터와 스칼라 $\alpha$가 있을 때 교환 법칙, 분배 법칙, 결합 법칙이 모두 성립합니다.

그리고 벡터의 길이 또는 노름(norm)을 정의해보면 $|u|=\sqrt{u \cdot u}=\sqrt{(u_1)^2+(u_2)^2+ \cdots +(u_n)^2}$로 나타내며 노름이 1인 벡터는 단위 벡터(unit vector)라고 합니다.

---

### Orthogonality

$R^n$의 두 벡터 $u, v$가 직교한다는 것은 $u \cdot v =0$입니다.

2차원과 3차원에서의 직교는 코사인 법칙을 사용하여 $u \cdot v=|u||v|cos(\theta)$로 증명할 수 있고 예를 들어 $\theta=\frac{\pi}{2}$이면 내적값은 0이 되는 것입니다.

또한 피타고라스 정리에서 $|u+v|^2=|u|^2+2(u \cdot v)+|v|^2$인데 $|u+v|^2=|u|^2+|v|^2$를 만족할 필요충분조건은 내적값이 0일 때임을 알 수 있습니다.

벡터 집합 ${u_1, u_2, \dots, u_p}$가 직교 집합이라는 것은, 서로 다른 두 벡터의 쌍 $u_i, u_j$가 직교한다는 것으로 즉 $i \ne j$일 때 $u_i \cdot u_=0$을 만족하게 됩니다. 예를 들어 아래의 벡터집합이 직교 집합인지 알아보겠습니다.

$$
u_1=\begin{bmatrix}
1 \\
-2 \\
1
\end{bmatrix},
u_2=\begin{bmatrix}
0 \\
1 \\
2
\end{bmatrix},
u_3=\begin{bmatrix}
-5 \\
-2 \\
1
\end{bmatrix}
$$

내적값인 $u_1 \cdot u_2=u_1 \cdot u_3 =u_2 \cdot u_3=0$가 되므로 직교 집합이며 선형 독립입니다.

---

### Coordinates in an Orthonormal Basis

$x$가 임의의 벡터이고 그 기저 $B$에 대한 좌표 $[x]_B=(c_1,c_2, \dots, c_n)$을 찾을 때 $x=c_1u_1+c_2u_2+\cdots+c_nv_n$을 만족하며 양변에 $u_1$을 내적하고 직교성질에 따라서 $u_1 \cdot x = c_1(u_1 \cdot u_1)=c_1$을 얻을 수 있게 됩니다.

따라서 좌표 벡터는 아래와 같이 정리합니다.

$$
[x]_B=\begin{bmatrix}
u_1 \cdot x \\
u_2 \cdot x \\
\vdots \\
u_n \cdot x
\end{bmatrix}
=\begin{bmatrix}
(u_1)^T x \\
(u_2)^T x \\
\vdots \\
(u_n)^T x
\end{bmatrix}
=U^Tx
$$

이 때 $U \in R^{n*n}$ 행렬이 $U^TU=UU^T=I_n$을 만족할 때 직교 행렬(orthogonal matrix)라고 합니다. 따라서 기저벡터 집합이 정규직교 집합이면 행렬 $U$는 직교행렬이 됩니다.

---

### 참고 자료

[원본 경로 #1](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)
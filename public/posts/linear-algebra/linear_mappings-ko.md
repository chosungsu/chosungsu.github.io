---
title: 'Linear mappings'
date: '2023-03-08'
tags: ['Linear algebra', 'lecture']
---

### Warm up

벡터 사상은 단순히 함수 $T:R^n \rightarrow R^m$을 의미합니다. 정의역은 $R^n$, 공역(co-domain)은 $R^m$입니다. 물론 $n=m$인 경우도 가능합니다. 벡터 $b \in R^m$가 $T$의 치역 또는 상에 속한다는 것은 $T(x)=b$를 만족하는 $x \in R^n$이 존재함을 의미합니다. 그리고 $T$의 치역이 공역과 항상 같지는 않습니다.

---

### 선형 사상 (Linear Mappings)

다음 두 조건이 만족되면 선형사상이라고 합니다.

1.임의의 $u,v \in R^n$에 대해 $T(u+v) = T(u) + T(v)$가 성립하는 경우.

2.임의의 $u \in R^n$와 임의의 스칼라 $c$에 대해 $T(cu) = cT(u)$가 성립하는 경우.

이를 만족하지 않는다면 비선형사상이고 아래의 사상을 통해 예를 들어보겠습니다.

$$
T(x)= \begin{bmatrix} x_1^2 \\ sin(x_2)-cos(x_1^2-1) \\ x_1^1+x_2^2+1 \end{bmatrix}
$$

여기서 $T\begin{bmatrix} 1 \\ 0 \end{bmatrix}=\begin{bmatrix} -1 \\ 2 \end{bmatrix}$임을 알 수 있고 선형사상의 속성에 의해 $T\begin{bmatrix} 3 \\ 0 \end{bmatrix}=3*T\begin{bmatrix} 1 \\ 0 \end{bmatrix}=3*\begin{bmatrix} -1 \\ 2 \end{bmatrix}=\begin{bmatrix} -3 \\ 6 \end{bmatrix}$이 만족되어야 하는데 실제로는 $\begin{bmatrix} -cos(8) \\ 10 \end{bmatrix}$으로 다른 값이므로 선형이 아님을 보일 수 있습니다.

---

### 행렬 사상(Matrix Mappings)

$m*n$ 행렬 $A$와 $n$차원 벡터 $x$가 주어졌을 때, 출력벡터 $Ax$를 사상으로 해석할 수도 있습니다. 사상에 대한 조건은 선형사상과 동일합니다.

$$
T\begin{pmatrix} x_1 \\ x_2 \end{pmatrix}=\begin{bmatrix} 2x_1-x_2 \\ x_1+x_2 \\ -x_1-3x_2 \end{bmatrix}
$$

예를 들어 위 사상이 있을 때 $T\begin{bmatrix} 1 \\ 0 \end{bmatrix}=\begin{bmatrix} 2 \\1 \\ -1 \end{bmatrix}$이므로 $T\begin{bmatrix} 3 \\ 0 \end{bmatrix}=3*T\begin{bmatrix} 1 \\ 0 \end{bmatrix}=3*\begin{bmatrix} 2 \\ 1 \\ -1 \end{bmatrix}=\begin{bmatrix} 6 \\ 3 \\ -3 \end{bmatrix}$이 만족되어야 하는데 실제로도 동일하여 선형사상이 충족합니다.

위 사상을 행렬 사상으로 변환도 가능한데 다음과 같습니다.

$$
\begin{bmatrix} 2 & -1 \\ 1 & 1 \\ -1 & -3 \end{bmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix}
$$

행렬 사상 $T_A : R^n \rightarrow R^m$에서 출력벡터 $Ax$는 $A$열들의 선형 결합이고 그 계수가 $x$임은 증명되었습니다. 따라서 행렬 사상의 치역은 span$\{v_1, v_2, \cdots, v_n\}$입니다.

---

### 참고 자료

[원본 경로 #1](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)
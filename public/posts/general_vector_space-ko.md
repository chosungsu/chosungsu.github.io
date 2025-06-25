---
title: 'Diagonalization of matrix'
date: '2023-03-27'
tags: ['Linear algebra', 'lecture']
---

### axioms of vector space

영이 아닌 임의의 집합 $V$에 두 연산(덧셈과 스칼라 배)가 정의되어 있고 임의의 $x, y, z \in V$와 $h, k \in R$에 대해서 2개의 기본법칙 $x + y \in V, kx \in V$와 다음 8개의 연산법칙이 성립할 때 벡터 공간을 이룬다고 합니다.

-$x + y = y + x$

-$(x + y) + x = x + (y + x)$

-모든 $x \in V$에 대해서 $x + 0 = x$를 만족하는 원소 0(영벡터)이 V에 단 하나 존재한다.

-V의 각 원소 x에 대해서 $x + (-x) = 0$을 만족하는 -x(음벡터)가 V에 유일하게 존재한다.

-$k(x + y) = kx + ky$

-$(h + k)x = hx + kx$

-$(hk)x = h(kx) = k(hx)$

-$1x = x$

집합 $V = \{0\}$에서 스칼라 $k \in R$에 대해서 $0 + 0 = 0, k0 = 0$과 같이 정의하면 벡터공간이면서 영벡터공간이라고 합니다.

만약 $f_1(x), f_2(x), …, f_n(x)$가 구간 $(-\infty, \infty)$에서 $n-1$번 미분 가능한 함수이고 wronskian $W(x_0)$을 0이 아니게 하는 $x_0 \in (-\infty, \infty)$가 하나라도 존재하면 일차독립인 함수(벡터)들이 됩니다.

예를 들어 $f_1(x) = 1, f_2(x) = e^x, f_3(x) = e^{2x}$일 때 $W(x) = \begin{vmatrix} 1 & e^x & e^{2x} \\ 0 & e^x & 2e^{2x} \\ 0 & e^x & 4e^{2x} \end{vmatrix} = 2e^{3x} \ne 0$으로 일차독립이 됩니다.

---

### fourier series

실벡터공간 $V$ 상의 내적은 $V$ 상의 한쌍의 벡터 $u, v$에 대해서 스칼라$<u, v>$를 대응시키는 함수로 아래를 만족하면 내적공간이라고 합니다.

-$<u, v> = <v, u>$

-$<u+v, w> = <u, w> + <v, w>$

-$<cu, v> = c<u, v>$

-$<u, u> ≥ 0$ 에서 $<u, u> = 0$이면 $u = 0$이다

임의의 내적 $<u, v>$가 주어질 때 벡터 $u$의 길이(norm)은 $|u| = \sqrt{<u, u>}$이고 각도는 $cos\theta = \frac{<u, v>}{|u||v|}$와 같이 정의가 됩니다. 특히 내적이 0보다 크면 직교한다고 합니다.

복소내적공간의 임의 벡터 $u, v$에 대해서 다음이 성립합니다.

-$|<u, v>| ≤ |u||v|$ (코시 슈바르츠 부등식)

-$|u+v| ≤ |u| + |v|$ (삼각 부등식)

---

### homomorphism

$T : V \rightarrow W$가 단사이고 전사이면 이를 동형사상이라고 하고 $V \cong W$로 표현합니다.

---

### 참고 자료

[원본 경로 #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)
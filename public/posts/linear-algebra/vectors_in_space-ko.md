---
title: 'Vectors in space'
date: '2023-03-03'
tags: ['Linear algebra', 'lecture']
---

### Warm up

많은 수의 성분(component)을 가진 $n$-벡터에 대해서 이해하기 쉬운 방법은 순서가 있는 숫자의 목록이라고 생각하는 것입니다.

$$
a = \begin{pmatrix} a^1 \\ \vdots \\ a^n\end{pmatrix}
$$

위 벡터에서 위첨자는 제곱 성분이 아니라 성분 번호입니다. 그리고 순서가 중요하기 때문에 각 벡터 성분이 뒤섞인 것과 동일할 수 없습니다. 모든 벡터의 집합은 $R^n$으로 표기됩니다.

---

### Addition and Scalar Multiplication

$n$-벡터의 중요한 속성은 두 벡터를 더할 수 있고 스칼라곱을 할 수 있다는 것이 있습니다.

$$
a = \begin{pmatrix} a^1 \\ \vdots \\ a^n\end{pmatrix}, 
b = \begin{pmatrix} b^1 \\ \vdots \\ b^n\end{pmatrix}
$$

위의 두 벡터가 있다면 우선 합은 아래와 같이 구합니다.

$$
a+b = \begin{pmatrix} a^1 + b^1 \\ \vdots \\ a^n + b^n\end{pmatrix}
$$

그리고 스칼라 $\lambda$를 곱하면 아래와 같습니다.

$$
\lambda a = \begin{pmatrix} \lambda a^1 \\ \vdots \\ \lambda a^n\end{pmatrix}
$$

---

### Hyperplanes

$n$이 3보다 큰 차원의 벡터를 시각화하는 것은 불가능합니다. 그러나 선과 평면과 같은 객체는 $n$의 크기에 관계없이 많은 의미를 갖고 있습니다. 두 개의 0이 아닌 벡터 $u, v$가 주어지면 같은 선에 있지 않는 한 일반적으로 평면을 결정합니다.

$$
\{P + su + tv | s, t \in R\}
$$

이제 재귀적인 정의로 평면을 일반화합니다. $n$-벡터에서 $k+1$개의 벡터 $P, v_1, \dots, v_k$의 집합은 다음을 결정합니다.

$$
\{P + \sum_{i=1}^k \lambda_i v_i | \lambda_i \in R\}
$$

---

### Directions and Magnitudes

$n$-벡터의 유클리드 길이는 아래와 같습니다.

$$
|v| = \sqrt{(v^1)^2 + (v^2)^2 + \cdots + (v^n)^2}
$$

코사인 법칙을 사용하여 두 벡터 사이의 각도를 알아낼 수 있는데 $R^n$에서 평면을 형성하는 두 벡터 $u,v$가 주어지면 $|v-u|^2 = |u|^2 + |v|^2 - 2|u||v|cos \theta$로 계산할 때 $cos \theta$를 제외한 부분이 $|v-u|^2 - |u|^2 - |v|^2 = -2u^1v^1 - \cdots -2u^nv^n$이므로 즉 $|u||v|cos \theta = u^1v^1 + \cdots +u^nv^n$이라고 변환할 수 있게 됩니다.

각 벡터 $u, v$의 내적인 $u \cdot v = u^1v^1 + \cdots + u^nv^n$이 되므로 위 유클리드 길이를 통해 정의를 유추해낼 수 있습니다.

내적에는 대칭성, 분배성, 쌍선형성, 양의 정부호성 등의 중요한 속성이 있습니다. 우선 대칭성(symmetric)은 $u \cdot v = v \cdot u$을 만족하고 분배성(distributive)은 $u \cdot (v+w) = u \cdot v + u \cdot w$을 만족합니다. 그리고 쌍선형성은 $u \cdot (cv+dw) = c(u \cdot v) + d (u \cdot w) \leftrightarrow (cu+dw) \cdot v = c(u \cdot v) + d(w \cdot v)$을 만족하며 양의 정부호성으로 내적 값은 항상 0보다 같거나 크다고 할 수 있습니다.

코시 슈바르츠 부등식은 0이 아닌 벡터 $u,v$에 대해서 $\frac{|<u,v>|}{|u||v|} \le 1$을 정의하는데 이를 증명하는 방법은 두 가지가 있습니다. 첫 번째는 코사인 각도가 1보다 같거나 작다는 사실을 이용하는 것이고, 두 번째는 이차 다항식을 활용하는 것입니다.

이차 다항식을 이용한 증명은 다음과 같습니다. 임의의 실수 $\alpha$에 대해 벡터의 내적은 항상 0보다 크거나 같으므로

$$
\begin{aligned}
& 0 \le <u+\alpha v, u+\alpha v> \\
&= <u,u> + 2\alpha<u,v> + \alpha^2<v,v>
\end{aligned}
$$

이 식은 $\alpha$에 대한 이차식이며, 이차식의 판별식이 0보다 작거나 같아야 합니다. 이차식의 계수를 $a=<v,v>$, $b=<u,v>$, $c=<u,u>$로 두면 판별식 $b^2-ac \le 0$으로부터

$$
<u,v>^2 \le <u,u><v,v>
$$

따라서 $\frac{|<u,v>|^2}{|u|^2|v|^2} \le 1$이 성립하게 되어 코시 슈바르츠 부등식이 증명됩니다.

---

### 참고 자료

[원본 경로 #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[원본 경로 #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)
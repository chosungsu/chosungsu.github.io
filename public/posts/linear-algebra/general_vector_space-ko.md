---
title: 'General vector space'
date: '2023-03-27'
tags: ['Linear algebra', 'lecture']
---

### Dot product(vector)

내적은 $\vec{a} \bullet \vec{b}$과 같이 나타낼 수 있습니다. 예를 들어 $\begin{bmatrix} a_1 \\ a_2 \\ \vdots \\ a_n \end{bmatrix} \bullet \begin{bmatrix} b_1 \\ b_2 \\ \vdots \\ b_n \end{bmatrix}$에 대해서 내적값은 대응하는 성분끼리의 곱과 같고 따라서 $a_1b_1 + a_2b_2 + \cdots + a_nb_n$로 계산할 수 있습니다.

위에서 볼 수 있듯이 내적은 두 벡터가 필요하지만 그 값은 스칼라가 됩니다.

---

### Length of vector

벡터의 길이는 각 성분을 제곱하고 모두 더한 값의 제곱근과 같습니다. $|\vec{a}|=\sqrt{a_1^2 + a_2^2 + \cdots + a_n^2}$이고 제곱근 안의 값은 다시 표현하면 $\vec{a} \bullet \vec{a}=a_1^2 + a_2^2 + \cdots + a_n^2$와 같음을 알 수 있습니다. 따라서 일반화해보면 $|\vec{a}|^2 = \vec{a} \bullet \vec{a}$가 됩니다.

---

### Dot product(proof)

내적을 증명하기 위해서 첫째로 교환법칙이 성립한다는 것을 사용합니다.

$$
\vec{v} \bullet \vec{w} = \vec{w} \bullet \vec{v}
$$

위 식에서 좌항을 전개하면 $v_1w_1 + v_2w_2 + \cdots + v_nw_n$이 되고 이는 우항을 전개한 값인 $w_1v_1 + w_2v_2 + \cdots + w_nv_n$과 결과적으로 같습니다. 따라서 내적에서는 곱의 순서가 중요하지 않습니다.

다음으로 분배법칙이 성립하는지를 살펴보겠습니다.

$$
(\vec{v} + \vec{w}) \bullet \vec{x}=\vec{v} \bullet \vec{x} + \vec{w} \bullet \vec{x}
$$

좌항을 전개하면 $(v_1+w_1)x_1 + (v_2+w_2)x_2 + \cdots + (v_n+w_n)x_n$이 되고 우항을 전개한 값과 역시 동일합니다.

---

### Cauchy-schwarz inequality

$$
|\vec{x} \bullet \vec{y}| \le |\vec{x}||\vec{y}|
$$

위 수식은 코시 슈바르츠 부등식이며 좌항과 우항이 같아지는 순간은 하나의 벡터가 다른 벡터의 스칼라배인 경우입니다.

---

### Triangle inequality

위의 코시 슈바르츠 부등식을 응용해서 $|\vec{x} + \vec{y}|^2=(\vec{x}+\vec{y}) \bullet (\vec{x}+\vec{y})$로 구현이 가능하고 분배법칙을 통해 $|\vec{x}|^2 + 2(\vec{x} \bullet \vec{y}) + |\vec{y}|^2$가 되고 코시 슈바르츠 공식으로 인하여 $|\vec{x}|^2 + 2|\vec{x}||\vec{y}| + |\vec{y}|^2 = (|\vec{x}|+|\vec{y}|)^2$보다 작거나 같다고 전개가 가능합니다.

$$
|\vec{x} + \vec{y}| \le |\vec{x}|+|\vec{y}|
$$

그러므로 삼각 부등식은 이제 위와 같이 정의합니다.

---

### Cross product

내적은 $\vec{a} \bullet \vec{b} \in R^n$으로 n차원이 아무리 큰 값이어도 성립하지만 외적은 오직 3차원 공간에서만 정의됩니다. 외적 단계에서 나오는 벡터는 외적 대상인 벡터들과 수직 관계입니다.

$\vec{a} = \begin{bmatrix} a_1 \\ a_2 \\ a_3 \end{bmatrix}$, $\vec{b} = \begin{bmatrix} b_1 \\ b_2 \\ b_3 \end{bmatrix}$가 있다고 할 때 $\vec{a} * \vec{b} = \begin{bmatrix} a_2b_3 - a_3b_2 \\ -(a_1b_3-a_3b_1) \\ a_1b_2-a_2b_1 \end{bmatrix}$으로 행의 값을 제외하고 각 벡터 값을 교차하여 구합니다. 가운데 행은 음수를 취합니다.

이 외적에 벡터 $a$를 내적하면 $a_1a_2b_3 - a_1a_3b_2 + a_2a_3b_1 - a_2a_1b_3 + a_3a_1b_2 - a_3a_2b_1=0$이고 벡터 $b$와 내적하여도 0으로 외적값은 두 벡터와 정확히 직교함을 알 수 있습니다.

---

### Triple product

삼중곱은 $\vec{a}*(\vec{b}*\vec{c})$로 표현이 되고 $\vec{a} = a_xi+a_yj+a_zk$로 각 성분을 단위벡터들과 곱한 값을 더한 벡터로 계산할 수 있습니다. 이제 괄호 안의 값은 $\begin{vmatrix} i & j & k \\ b_x & b_y & b_z \\ c_x & c_y & c_z \end{vmatrix} = i(b_yc_z - b_zc_y) - j(b_xc_z-b_zc_x) + k(b_xc_y-b_yc_x)$가 되므로 이를 벡터 $a$와 외적하면 $\vec{b}(\vec{a} \bullet \vec{c}) - \vec{c}(\vec{a} \bullet \vec{b})$로 정리가 됩니다.

---

### 참고 자료

[원본 경로 #1](https://www.boostcourse.org/ai151/joinLectures/194162)
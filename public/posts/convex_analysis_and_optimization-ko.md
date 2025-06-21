---
title: 'Convex_analysis_and_optimization'
date: '2024-05-24'
tags: ['Probability&Statistics', 'lecture']
---

### notation

domain of a function $f$를 $Dom(f)$라고 할 때 $f: A \rightarrow B$는 $Dom(f) \subset A to B$를 의미합니다. 이 때 $x \notin Dom(f)$인 $x$에 대해서 $f(x) = \infty$인 점을 증명할 수 있습니다.

---

### convex sets

$tx + (1-t)y \in A$를 만족한다면 $A \subset R^n$으로 convex한 상태라고 합니다.

---

### separating hyperplane theorem

$c$, $d$ 모두 $R^n$의 convex subset일 때 $c \cap d = 0$이고 $a \ne 0$이면서 $b$가 있을 때 $a^Tx \le b$는 $\forall x \in c$일 때 가능하고 $a^Tx \ge b$는 $\forall x \in d$일 때 가능합니다.

---

### supporting hyperplane theorem

$x_0$를 $c \in R^n$의 boundary point를 증명하기 위해 $a \ne 0$일 때 $x \in c$인 모든 $x$에 대해서 $a^Tx \le a^Tx_0$을 만족하고 이 때의 hyperplane을 $x_0$에서의 $C$에 대한 hyperplane이라고 할 수 있습니다.

---

### convex function

$f:R^n \rightarrow R$은 $Dom(f)$가 convex일 때 역시 convex하다고 할 수 있으며 아래에는 계산식이 있습니다.

$$
f(tx + (1-t)y) \le tf(x)+(1-t)f(y)
$$

여기서 $f$는 $R^n$으로 확장이 가능해집니다.

또한 아래의 계산식으로도 convex임을 확인할 수 있습니다.

$$
f(y) \ge f(x) + \nabla f(x)^{top}(y-x)
$$

---

### subgradient of a function

$f:R^n \rightarrow R$과 vector $z \in R^n$을 $x$가 아래의 수식을 만족할 경우 subgradient of $f$라고 할 수 있습니다.

$$
f(y) \ge f(x) + z^{top}(y-x)
$$

$x$에 대해 적어도 하나 이상의 subgradient가 존재한다면 함수 $f$를 $x$에 대해 subdifferentiable하다고 합니다. 이를 기호로 $\partial f(x)$로 표현합니다.

모든 $\alpha \ge 0$에서 $\partial(\alpha f)(x) = \alpha \partial f(x)$를 만족합니다. 이러한 연산을 덧셈에도 적용하면 $\partial (f_1 + f_2) (x) = \partial f_1(x) + \partial f_2(x)$도 성립합니다.

---

### second order condition

$f$가 convex이고 $\nabla^2 f(x)$가 nonnegative definite한 상태가 되는 것을 말합니다.

---

### convex conjugate

$f : R^n \rightarrow R$이고 $f^* : R^n \rightarrow R$인 두 함수가 있을 때 $f^*(y) = sup_{x \in Dom(f)} (y^{top}x - f(x))$로 정의가 되는데 $Dom(f^*) = \{y:f^*(y) < \infty\}$인 조건과 함께 convex/Fenchel conjugate라고 합니다. 참고로 Fenchel's inequality는 아래와 같습니다.

$$
x^{top}y \le f(x) + f^*(Y)
$$

이를 $x$, $y$를 미분의 형태로 변환이 가능한데 $x \in \partial f^*(y)$, $y \in \partial f(x)$로 생각할 수 있습니다. legendre duality 이론에 의해서 $f^** = f$로 서로 동일한 condition임을 확인할 수도 있습니다.

---

### standard form of an optimization

$\{f_0, f_1, ..., f_m\}$과 $\{h_1, ..., h_p\}$가 모두 $R^n$의 subset일 때 목적식 $f_0(x)$를 최소화하기 위해 $f_i(x) \le 0$과 $h_i(x) = 0$을 제약조건으로서 구성합니다. 여기서 $h$를 제외한 $f_0$, $f$집합은 모두 convex 성향을 갖습니다.

lagrangian $L$차원을 아래와 같이 구성합니다.

$$
L(x, \lambda, v) = f_0(x) + \sum_{i=1}^{m} \lambda_i f_i(x) + \sum_{i=1}^{p} v_ih_i(x)
$$

여기서 $\lambda$는 $f_i(x) \le 0$의 제약조건을 만족하는 계수이고 $v$는 $h_i(x)=0$을 만족하는 계수입니다.

lagrange dual problem은 $g(\lambda, v)$를 $p^*$의 하한선으로 목적식은 $g(\lambda, v)$가 $\lambda \ge 0$의 제약조건을 갖고 성립하도록 합니다. 이 때 dual optimal value인 $d^*$는 $p^*$보다 작거나 같은 weak duality 성질을 갖고 있으며 둘 사이의 차이는 duality gap이라고 합니다. 만약 둘 사이의 차이가 0인 동일한 경우 strong duality 상태입니다.

---

### linear programming

standard form은 $c^Tx$의 목적식을 갖고 $Ax=b$, $x \ge 0$인 제약조건 하에서 실행됩니다. 이를 inequality form으로 바꾼다면 $-b^Tv$의 목적식에 $A^Tv+c \ge 0$의 제약조건이 됩니다. 반대로 inequality of LP는 $c^Tx$의 목적식을 갖고 $Ax \le b$의 제약조건을 갖고 있어 이를 standard form으로 바꾼다면 $-b^T\lambda$의 목적식에 $A^T\lambda + c \ge 0$, $\lambda \ge 0$의 제약조건이 됩니다.

---

### complementary slackness

$f_0(x^*) = g(\lambda^*, v^*)$와 같은 lagrange 수식에서 우항은 $inf_{x \in D} (f_0(x) + \sum_{i=1}^{m} \lambda_i^* f_i(x) + \sum_{i=1}^{p} v_i^* h_i(x))$으로 생각할 수 있어 이는 $f_0(x^*)$와 작거나 같은 결과가 나옵니다. 따라서 strong duality 상태입니다. $L(x, \lambda^*, v^*)$를 $x^*$ 최소화 과정에서 first inequality로 $\nabla f_0(x^*) + \sum_{i=1}^{m} \lambda_i^*\nabla f_i(x^*) + \sum_{i=1}^{p} v_i^* \nabla h_i(x^*) = 0$을 확인할 수 있으며 second inequality에서는 $\lambda_i^* f_i(x^*) = 0$을 확인할 수 있는데 이러한 상태를 complementary slackness 상태라고 합니다.

---

### kkt optimality  condition

strong duality를 나타내는 아래의 5가지 상태를 kkt conditions라고 합니다.

1.$f_i(x^*) \le 0, i = 1, ..., m$

2.$h_i(x^*) = 0, i = 1, ..., p$

3.$\lambda_i^* \ge 0, i = 1, ..., m$

4.$\lambda_i^*f_i(x^*) = 0, i = 1, ..., m$

5.$\nabla f_0(x^*) + \sum_{i=1}^{m} \lambda_i^*\nabla f_i(x^*) + \sum_{i=1}^{p} v_i^* \nabla h_i(x^*) = 0$

---

### lasso
$y \in R^n$과 $x \in R^{n*p}$인 조건 하에서 linear regression은 아래와 같은 lasso penalty를 갖습니다.

$$
min_{\beta \in R^p} (\frac{1}{2n} |y-X\beta|^2_2 + \lambda|\beta|_1)
$$

간단히 하자면 single predict 할 때는 soft thresholding function인 $S$를 사용하여 $\hat{\beta} = S_{\lambda} (<z, y> / n)$으로 $S = sign(x)(|x|-\lambda)$가 됩니다.

multiple predict 할 때는 global minimum이 업데이트가 되고 아래의 식으로 목적식이 정의가 됩니다.

$$
\frac{1}{2n} \sum_{i=1}^{n} (y_i - \sum_{k \ne j} x_{ik}\beta_k - x_{ij}\beta_j)^2 + \lambda \sum_{k \ne j} |\beta_k| + \lambda |\beta_j|
$$

이 식에서 $\hat{\beta_j}$는 $S(<x_j, r^{j}> / n)$으로 업데이트가 됩니다.

---

### 참고 자료

[원본 경로 #1](https://www.dropbox.com/scl/fi/bs1jl9vgx6wc8nqbmkpvx/Chap7-convexity.pdf?rlkey=imbr1vtdo4228jqxbrrwu8svw&e=1&dl=0)




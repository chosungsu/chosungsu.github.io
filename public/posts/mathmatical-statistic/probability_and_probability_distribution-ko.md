---
title: 'Probability and probability distribution'
date: '2023-05-01'
tags: ['Mathematical statistics', 'lecture']
---

### introduction

통계적 실험이란 실험이 종료되기 전까지 결과를 100% 확신을 갖고 전혀 예측할 수 없는 것을 의미합니다. 변동이 있는 것은 variation한 상황이며 그렇지 않은 고정적인 것은 deterministic한 상황이라고 할 수 있습니다.

모든 결과들이 모여 있는 공간은 표본 공간(sample space)으로 표현이 되며 이는 컬렉션의 $c$로 나타낼 수 있습니다. 그리고 사건(event)들은 표본 공간 내부에 영어 알파벳 대문자를 사용하여 구분하게 됩니다.

예를 들어 동전이 있을 때 앞과 뒷면이 나올 확률의 표본 공간 $c$는 아래와 같습니다.

$c=\{H, T\}$

또 다른 예로는 주사위 두 개가 존재할 때 나올 수 있는 수의 집합에 대한 표본 공간 $c$는 아래와 같습니다.

$c=\{(1,1), (1,2), …, (6,6)\}$

확률에는 두 가지의 접근법이 존재하며 여러 번 시행하여 객관적(objective)인 결과를 얻는 상대 도수(relative frequency)와 주관적인 관점의 personal or subjective 개념입니다.

---

### set theory

각각의 집합 $c_1$, $c_2$에 대해서 만약 $c_2$가 $c_1$ 의 subset이라고 하면 기호는 $c_1 \subset c_2$로 나타낼 수 있습니다.

만약 $c$가 영집합(null space)의 경우 $c=\Phi$로 나타낼 수 있고 $c_1$과 $c_2$의 union(or의 개념)은 기호로 $c_1 \cup c_2$ 와 같이 나타냅니다. 이어서 $c_1$과 $c_2$의 intersection(and의 개념)은 기호로 $c_1 \cap c_2$와 같이 나타냅니다.

그리고 여집합(complement)은 기호로 $c^c$ 또는 $\bar{c}$ 로 나타냅니다.

function에는 두 종류가 있으며 point, set function으로 구분됩니다. 전자의 경우는 $f(x)=2x$일 때 $x \to 2$이면 결과가 4라는 한 점이 되는 것과 같고 후자의 경우는 $f(A)$ = # of positive integers in $A$로 정의를 주고 $A=\{-{\infty} < x < 6\}$이면 $f(A) = 5$라는 결과가 나오는 것과 같습니다.

---

### the probability set function

$\sigma$ field에서 $B$는 표본 공간인 $C$의 모든 부분 집합을 의미하며 이 것이 $\sigma$ field가 성립되기 위한 조건은 3가지가 있습니다.

-$\Phi$ $\in$ $B$

-$C$ $\in$ $B$ $\Rightarrow$ $C^c \in$ $B$ (closed under complement)

-$C$의 union  $\in B$ (closed under countable union)

위의 조건에 맞는 $B$의 예로는 power set of $C$, $B$를 포함하며 $B$로부터 generated 된 $\sigma$ field, 실수 전체 집합인 $U$로부터 generated 된 Borel $\sigma$ field 등이 있습니다.

probability를 정의하기에 앞서 $C$는 표본 공간, $B$는 $C$의 $\sigma$ field, $P$는 real valued function으로 실수값이라고 이해가 필요합니다. 또한 아래의 성질들을 만족합니다.

-$P(c) \ge 0$, $\forall c \in C$ (non-negativity)

-$P(C) = 1$ (normality)

-$c_1, c_2 ,… \in B$, $c_i \cap c_j$ = $\Phi$ ($i \neq j$) 즉, 교집합이 없으면 연속된 union의 확률은 각 $c$의 확률 합과 같다. (countable additivity)

---

### conditional probability and independence

$c_1, c_2 \subset C$이고 $c_2$ given $c_1$ 의 확률 $P$는 $P(c_2 | c_1)$=$\frac{P(c_2 \cap c_1)}{P(c_1)}$ 과 같이 정의되는데 이 때 non-negativity 성질에 의하여 분모인 $c_1$의 확률 $\ne 0$ 이어야 합니다. 그리고 normality 성질에 의하여 $P(c_1 | c_1) = 1$이어야 합니다.

베이즈 정리란, $C$ 집합의 원소들이 mutally exclusive하면서 exhaustive한 관계에서 각 확률은 반드시 0보다 커야 한다는 조건이 붙습니다. 아래와 같은 수식으로 정의가 됩니다.

$P(c_j | C) = \frac{P(c_j)*P(C | c_j)}{\sum\limits_{i=1}^k{P(c_i)*P(C | c_i)}}$

위 수식을 정리해보면 $C=(C \cap c_1) \cup (C \cap c_2) \cup … \cup (C \cap c_k)$ 로 disjoint 관계표현이 되므로 $P(C) = P(c_1)*P(C | c_1) + P(c_2)*P(C | c_2) + … + P(c_k)*P(C | c_k) = \sum\limits_{i=1}^k{P(c_i)*P(C | c_i)}$로 표현이 가능해집니다.

만약 $c_1$과 $c_2$가 독립적이라면 $P(c_1 | c_2) = \frac{P(c_1 \cap c_2)}{P(c_2)} = P(c_1)$ 이 성립하므로 즉, $P(c_1 \cap c_2) = P(c_1)*P(c_2)$로 계산이 가능해집니다.

---

### random variables

확률 변수로서 $X$를 real-valued function으로 보고 표본 공간에서 정의를 합니다. 이 때 $X$가 갖는 범위를 $D$라고 할 때 이 것은 $\{x:x=X(c), c \in C\}$로 규정이 됩니다. 범위 $D$는 countable한 변수이면 이산변수(discrete)가 되고 interval of real numbers 변수이면 연속변수(continuous)라고 볼 수 있습니다.

$C$의 $\sigma$ field인 $B$와 $D$의 $\sigma$ field인 $F$에 대해서 $P(C)$, $C \in B$, $P_x(B)$, $B \in F$가 성립하며 $P_x(B)$는 induced probability라고 합니다. 이는 다시 풀어 쓰면 $P\{c \in C : X(c) \in B\}, B \in F$와 같습니다.

또한 discrete한 $X$라고 할 때 $D$ 범위를 $\{d_1, d_2, …, d_m\}$으로 잡고 이를 확률로 나타내면 $P_x(d_i)=P(X=d_i)$와 같이 probability mass function(pmf)라고 하게 됩니다. 예를 들어 두 주사위 합이 4인 확률을 $P_x(4)$라 할 때 이는 $P((1, 3) \cup (2, 3) \cup (3, 1))$=3/36으로 계산이 가능해집니다.

누적 분포 함수인 cumulative distribution function(cdf)는 아래와 같이 나타낼 수 있습니다.

$$
F_x(x) = P_x((-\infty, x]) = P(X ≤ x)
$$

real number interval에서의 $F$ 그래프에서 보이는 불연속점의 높이는 jump size라고 합니다. 더불어서 계단 형태의 그래프는 step function이라고 합니다.

누적 분포 함수의 성질을 알아보자면 다음과 같습니다.

-$F(a) ≤ F(b), \forall a < b$ (nondecreasing)

-$\lim\limits_{x \to -\infty} F(x) = 0, \lim\limits_{x \to \infty} F(x) = 1$

-$\lim\limits_{x \to x_0} F(x) = F(x_0)$ (right continuous)

---

### discrete random variables

$x$가 finite하거나 countable한 경우 이산(discrete) 변수라고 합니다. 확률변수 $x$에 대한 support는 $x$에 대한 확률 $P$가 0보다 큰 경우의 $x$집합을 의미합니다. 예를 들어 두개의 동전을 던져서 앞면이 나오는 확률에서 support는 {1, 2}이고 30개의 공 중에 10개가 white이고 20개가 black 색상을 가질 때 5개의 공을 뽑는 확률에서 support는 {0, 1, 2, 3, 4, 5}입니다.

---

### continuous random variables

cdf를 $F_x(x) = \int_{-\infty}^{x} f_x(t)\, dt$라고 정의를 하였고 이 수식에서 $f_x(t)$가 x에 대한 확률밀도함수인 probability density function(pdf)라고 합니다. $P(X = x) = F_x(x) - F_x(x-) = 0$에서 착안하여 연속변수인 경우에 $P(a < X ≤ b) = P(a ≤ X < b) = P(a ≤ X ≤ b) = P(a ≤ X < b) = F_x(b) - F_x(a) = \int_{a}^{b} f_x(t)\, dt$임을 보일 수 있습니다.

---

### expectation of a random variable

$E(x) = \begin{cases} \int_{-\infty}^{\infty}xf_x(x) \leftarrow if \int_{-\infty}^{\infty} |x|f(x)\,dx < \infty (conti.)\\ \sum\limits_{x \in S_x}xp_x(x) \leftarrow if \sum |x|f(x)\,dx < \infty (discrete) \end{cases}$

---

### some special expectations

$E(x^k)$을 k-th moment라고 할 때 평균 $\mu = E(x)$ (1st, mean), 분산 $\sigma^2 = E[(x-\mu)^2] = E(x^2)-E^2(x)$ 이 성립하고 $E[(x-\mu)^k]$를 k-th central moment라고 합니다.

$h > 0$인 $|t| < h$을 이용하여 $E(e^{th}) < \infty$는 $M_x(t)$라고 정의하며 이는 적률생성함수인 moment generating function(mgf)라고 합니다. 이를 계산할 때는 $\int_{-\infty}^{\infty} e^{tx} f(x) \, dx$로 계산하게 됩니다.

어떤 확률변수의 mgf들은 각각 uniqueness of mgf 성질에 따라 하나만 존재한다.

어떤 mgf가 있을 때 이를 이용하여 pdf를 구할 수 있다고 합니다. 예를 들어 $M_x(t) = \frac{1}{10} e^t + \frac{2}{10} e^{2t} +\frac{3}{10} e^{3t}$일 때 $M_x(t) = \sum e^{tx}p(x) = p(1)e^t + p(2)e^{2t} + p(3)e^{3t}$와 같이 나열 가능해지고 이는 $p(x) = \frac{x}{10}, x=\{1, 2, 3\}$에서 구해질 수 있게 됩니다.

taylor expansion을 이용하면 $k$-th moment의 mean을 아래와 같이 구할 수 있다고 합니다.

$M_x(t) = E(e^{tx}) = E[1 + tx + \frac{t^2x^2}{2!} + \frac{t^3x^3}{3!} + … ] = 1 + tE(x) + \frac{t^2}{2!}E(x^2) + …$

따라서 $t$로 미분한 $M_x^{(m)}(0) = E(x^m)$임을 알 수 있게 됩니다.

characteristic function(ch.f)에서는 $\psi(t) = E(e^{itx})$로 정의됩니다. 이 때 $i$는 소수부(imaginary part)에 해당하고 $|e^{itx}| = |cos(tx) + isin(tx)| = \sqrt{cos^2(tx) + sin^2(tx)} = 1$로 풀이됩니다. 또한 ch.f는 적분값이 항상 존재한다는 성질이 있습니다. 그리고  $E(x) = -i\psi’(0)$, $E(x^2) = - \psi’’(0)$을 만족한다고 합니다.

마지막으로 누적 생성 함수인 cumulant generating function(cgf)는 $\psi(t) = logM_x(t)$이고 $k$-th cumulant인 $\kappa$를 이용하여 풀어서 나타내면 $\psi(t) = \kappa_0 + \kappa_1t + \frac{\kappa_2t^2}{2!} + … = \log(\mu_0+ \mu_1t + \frac{\mu_2t^2}{2!} + …)$ 으로 $\log$안의 함수를 (1+x)꼴로 합치면 $\log(1+x) = x - \frac{1}{2}x^2 + \frac{1}{3}x^3 - …$과 같이 표현이 되므로 이를 적용하면 $\mu_1t + \frac{1}{2} (\mu_2- \mu_1^2)t^2 + \frac{1}{6}(\mu_3-3\mu_1\mu_2+2\mu_1^3)t^3…$가 되어 즉 $\kappa_0 = 0$, $\kappa_1 = \mu_1$, $\kappa_2 = \mu_2 - \mu_1^2$, $\kappa_3 = \mu_3 - 3\mu_1\mu_2 + 2\mu_1^3$이 성립하게 됩니다. 이를 다른 말로 해석하면 $\kappa_1$은 mean, $\kappa_2$는 $\sigma^2$, $\kappa_3$는 $E(x-\mu)^3 = \mu_3’$이라고도 합니다.

---

### important inequalities

만약 $E(x^m)$과 $k≤m$인 $E(x^k)$이 존재한다면 $\int |x|^kf(x)\, dx < \infty$를 두 영역으로 쪼개봅니다. $\int_{|x| ≤ 1} |x|^kf(x) \,dx + \int_{|x| > 1} |x|^kf(x) \,dx$ $≤ \int_{|x| ≤ 1} 1*f(x) \,dx + \int_{|x| > 1} |x|^mf(x) \,dx$ $≤ \int_{-\infty}^{\infty} f(x) \,dx + \int_{-\infty}^{\infty} |x|^mf(x) \,dx = 1 + E|x|^m < \infty$ 으로 정의가 됩니다.

markov’s inequality에서는 $u(X)$가 nonnegative function이고 $E[u(X)]$가 존재한다면 $\forall c > 0, P[u(X) ≥ c] ≤ \frac{E[u(X)]}{c}$로 정의됩니다. 이 때 $E(u(X)] = \int u(x)f(x) \,dx = \int_A u(x)f(x) \,dx + \int_{A^c} u(x)f(x) \,dx$로 두 영역으로 쪼개볼 수 있고 쪼개진 두 항 중 전자의 경우는 u(x)가 c보다 크다는 조건에 의해 $c\int_A f(x) \,dx$로 바꿔질 수 있고 후자의 경우는 확률상 0보다 큰 값을 가져야 하므로 결국 간단하게 나타내면 $cP(u(X) ≥ c)$가 남게 됩니다.

chebyshev inequality는 $P(|X-\mu| ≥ k\sigma) ≤ \frac{1}{k^2}$이고 $\forall k > 0$이면 $u(X) = (X - \mu)^2$이고 $c = k^2v^2$이라고 할 때 $P((X - \mu)^2 ≥ k^2\sigma^2) ≤ \frac{E[(X-\mu)^2]}{k^2\sigma^2}$을 만족합니다.

---

### 참고 자료

[원본 경로 #1](http://www.kocw.net/home/cview.do?cid=7c789810ade43386)

[원본 경로 #2](http://www.kocw.net/home/search/kemView.do?kemId=1390551)



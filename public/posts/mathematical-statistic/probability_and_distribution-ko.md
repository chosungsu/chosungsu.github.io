---
title: 'Probability and distribution'
date: '2023-05-01'
tags: ['Mathematical statistics', 'lecture']
---

### Introduction

많은 종류의 연구는 본질적으로 동일한 조건 하에서 반복적인 실험이 표준 절차라는 사실로 부분적으로 특징지어질 수 있습니다. 예를 들어, 의학 연구에서 관심은 투여될 약물의 효과에 집중될 수 있습니다. 또는 경제학자는 다양한 시간 간격의 세 가지 특정 상품의 가격에 관심을 가질 수 있습니다. 또는 농학자는 화학 비료가 곡물 수확량에 미치는 영향을 연구하기를 원할 수 있습니다.

이러한 종류의 실험을 동일한 조건 하에서 반복할 수 있다면, 이를 랜덤 실험(random experiment)이라고 하며, 가능한 모든 결과의 집합을 실험 공간(experimental space) 또는 표본 공간(sample space)이라고 합니다. 우리는 표본 공간을 $C$로 표기합니다.

예를 들어 동전 던지기에서, 뒷면(tails)이 나오는 결과를 $T$로, 앞면(heads)이 나오는 결과를 $H$로 나타낸다면 표본 공간은 이 두 기호의 집합입니다. 이 예에서 $C = \{H, T\}$입니다.

$C$의 부분 집합은 종종 사건(events)이라고 불리며 일반적으로 $A, B, C$와 같은 대문자 로마 문자로 표시됩니다. 실험 결과가 사건 $A$의 요소일 경우, 사건 $A$가 발생했다고 말합니다.

랜덤 실험을 $N$번 반복적으로 수행했다고 한다면 실제로 사건 $A$가 발생한 횟수 $f$ (빈도, frequency)를 셀 수 있습니다. 그리고 비율 $f/N$을 이 $N$번의 실험에서 사건 $A$의 상대 빈도(relative frequency)라고 합니다. 상대 빈도는 작은 $N$ 값에 대해 매우 불규칙합니다. 그러나 $N$이 증가함에 따라, 경험적으로 상대 빈도가 안정화되는 것처럼 보이는 숫자, 예를 들어 $p$와 같거나 근접한 숫자를 사건 $A$와 연관시킵니다. 랜덤 실험의 결과가 $A$에 있을 확률(probability), 때로는 사건 $A$의 확률, 때로는 $A$의 확률 측도(probability measure)라고 불립니다.

예를 들어 $N=400$이고 $f$를 합이 7인 빈도라고 할 때 $f=60$이라면 상대 빈도는 $f/N=60/400=0.15$가 됩니다.

---

### Sets

객체가 집합에 속하면, 그것은 집합의 요소(element)라고 합니다. 예를 들어, $C$가 $0 \le x \le 1$인 실수 $x$의 집합을 나타낸다면, $3/4$은 집합 $C$의 요소입니다. $3/4$이 집합 $C$의 요소라는 사실은 $3/4 \in C$로 나타냅니다. 더 일반적으로, $c \in C$는 $c$가 집합 $C$의 요소임을 의미합니다.

집합 $C$가 유한하거나 양의 정수만큼 많은 요소를 가진다면, 우리는 집합 $C$를 셀 수 있는(countable) 집합이라고 말합니다. 예를 들어, $C_1 = \{1, 2, \dots, 100\}$과 $C_2 = \{1, 3, 5, 7, \dots\}$는 셀 수 있는 집합입니다. 그러나 실수 구간 $(0, 1]$은 셀 수 없습니다.

사건 $A$의 여집합은 $C$에 있지만 $A$에는 없는 모든 요소의 집합입니다. $A$의 여집합은 $A^c$로 나타냅니다. 즉, $A^c = {x \in C : x \notin A}$입니다.

공집합(empty set)은 요소가 없는 사건입니다. $\phi$로 표시됩니다. $C^c = \phi$이고 $\phi^c = C$입니다.

집합 $A$의 각 요소가 또한 집합 $B$의 요소이면, 집합 $A$는 집합 $B$의 부분 집합이라고 불립니다. 이는 $A \subset B$로 나타냅니다. $A \subset B$이고 또한 $B \subset A$이면, 두 집합은 동일한 요소를 가지며, 이는 $A = B$로 나타냅니다.

$A$와 $B$를 사건이라고 하면 $A$와 $B$의 합집합(union)은 $A$에 있거나 $B$에 있거나 또는 $A$와 $B$ 둘 다에 있는 모든 요소의 집합입니다. 이는 $A \cup B$로 나타냅니다. 그리고 $A$와 $B$의 교집합(intersection)은 $A$와 $B$ 둘 다에 있는 모든 요소의 집합입니다. $A \cap B$로 나타냅니다. 두 사건이 공통 요소가 없으면 서로소(disjoint)입니다.

분배 법칙은 임의의 집합에 대해서 

$$
A \cap (B \cup C) = (A \cap B) \cup (A \cap C)
$$

이처럼 괄호 내부를 괄호 외부와 결합하는 것을 가능하게 합니다. 그리고 드 모르간 법칙은 

$$
(A \cap B)^c = A^c \cup B^c
$$

이처럼 표현이 가능합니다.

---

### Definition of Probability

$C$가 유한 집합이라면, 모든 부분 집합의 집합을 이 집합으로 취할 수 있습니다. 표본 공간 $C$와 사건의 집합 $\mathcal{B}$가 있으므로, 확률 공간의 세 번째 구성 요소, 즉 확률 집합 함수(probability set function)를 정의할 수 있습니다.

확률의 정의는 세 가지 공리로 구성되며, 이는 상대 빈도의 세 가지 직관적인 속성에 의해 동기가 부여됩니다. $C$를 표본 공간이라고 하고 $A \subset C$라고 합시다. 실험을 $N$번 반복한다고 가정합니다. 그러면 $A$의 상대 빈도는 $f_A = \#\{A\}/N$입니다. 여기서 $\#{A}$는 $N$번의 반복에서 $A$가 발생한 횟수를 나타냅니다. $f_A \ge 0$이고 $f_C = 1$이라는 점에 유의해야 합니다. 세 번째 속성에 대해, $A_1$과 $A_2$가 서로소 사건이라고 가정합니다. 그러면 $f_{A_1 \cup A_2} = f_{A_1} + f_{A_2}$입니다.

#### Axioms of Probability

$\rightarrow$ 비음성(non-negativity) : $P(A) \ge 0$을 만족

$\rightarrow$ 전체공간(total probability) : $P(C) = 1$을 만족

$\rightarrow$ 가산 가법성(countable additivity) : ${A_n}$이 $\mathcal{B}$의 사건들의 수열이고 $A_m \cap A_n = \phi$이면, 상호 배타적(mutually exclusive) 집합 관계가 되어 $P\left(\bigcup_{n=1}^\infty A_n\right) = \sum_{n=1}^\infty P(A_n)$을 만족

#### Counting Rules

곱셈 규칙은 $A$가 $m$개의 요소, $B$가 $n$개의 요소를 가진 집합일 때, $A$에서 첫 번째 요소와 $B$에서 두 번째 요소를 갖는 순서쌍 $(x_i, y_j)$는 $mn$개 있습니다.

$$
\begin{aligned}
& P^n_k = n(n-1) \cdots (n-(k-1)) \\
&= \frac{n!}{(n-k)!}
\end{aligned}
$$

순열(permutations)은 $n$개의 요소 집합에서 취한 $k$개의 순열의 수인데 중복을 허용하지 않고 순서가 중요합니다.

$$
\begin{pmatrix} n \\ k\end{pmatrix} = \frac{n!}{k!(n-k)!}
$$

조합(combinations)은 $n$개의 요소 집합에서 취한 $k$개의 부분집합의 수인데 순서가 중요하지 않습니다.

---

### Conditional Probability and Independence

#### 조건부 확률, Conditional Probability

어떤 무작위 실험에서, 표본 공간 $C$의 부분 집합 $A$의 원소인 결과에만 관심이 있을 수 있습니다. 즉, 목적상 표본 공간이 효과적으로 $A$로 축소되는 것입니다. $B$와 $A$가 $P(A) > 0$인 사건이라고 합시다. $A$가 주어졌을 때 $B$의 조건부 확률은 다음과 같이 정의됩니다.

$$
P(B|A) = \frac{P(A \cap B)}{P(A)}
$$

#### 전체 확률의 법칙, Law of total probability

$$
P(B) = \sum_{i=1}^k P(A_i)P(B|A_i)
$$

$A_1, A_2, \dots, A_k$가 상호 배타적이고 완전한 사건이면서 $P(A_i) > 0$일 때 사건 $B$의 확률은 위와 같습니다.

#### 베이즈 정리, Bayes' theorem

전체 확률의 법칙을 이용하여 새로운 정보를 관찰한 후 사건 $A_j$의 확률을 업데이트하는 방법을 제공합니다.

$$
P(A_j|B) = \frac{P(A_j)P(B|A_j)}{\sum_{i=1}^k P(A_i)P(B|A_i)}
$$

여기서 $P(A_i)$는 사전 확률(prior)로 사건 $B$를 관찰하기 전의 확률이고 $P(A_j|B)$는 사후 확률(posterior)로 사건 $B$를 관찰한 후의 확률입니다.

#### 독립성, Independence

어떤 사건 $A$의 발생이 사건 $B$의 확률을 변화시키지 않을 때 두 사건은 독립이라고 합니다.

$$
\begin{aligned}
& P(A \cap B) = P(A)P(B), \\
& P(B|A) = P(B)
\end{aligned}
$$

---

### Random variables

실험의 표본 공간 $C$의 원소가 숫자가 아닐 경우 이를 숫자로 표현하는 것이 번거로울 수 있습니다. 확률 변수는 이 문제를 해결합니다. 각 원소 $c \in C$에 오직 하나의 숫자 $X(c) = x$를 할당하는 함수 $X$를 확률 변수라고 합니다.

$$
D = \{x : x = X(c), c \in C\}
$$

$D$가 가산 집합(countable set)인 경우, $X$를 이산 확률 변수(discrete random variable)라고 합니다. $D$가 실수의 구간(interval of real numbers)인 경우, $X$를 연속 확률 변수(continuous random variable)라고 합니다.

#### 확률 질량 함수, pmf

$X$가 유한 공간 $D = \{d_1, \dots, d_m\}$을 갖는 이산 확률 변수인 경우를 생각해볼 때, 확률 질량 함수(Probability Mass Function, pmf)는 아래와 같이 정의됩니다.

$$
P_x(d_i) = P[{c:X(c)=d_i}]
$$

그리고 $X$에 의해 유도된 확률 분포 $P_x(\cdot)$은 부분 집합 $D'$에 대해서 아래와 같이 정의됩니다.

$$
P_x(D') = \sum_{d_i \in D'} P_x(d_i)
$$

#### 확률 밀도 함수, pdf

연속 확률 변수인 경우 개별 점보다 구간에 대한 확률에 관심을 가집니다. 일반적으로 음이 아닌 함수 $f_X(x)$를 결정할 수 있으며, $D$ 내의 임의의 구간 $(a, b)$에 대해 $X$의 유도된 확률 분포 $P_X(\cdot)$는 다음과 같이 정의됩니다.

$$
\begin{aligned}
& P_X[(a,b)] \\
&= P[{c \in C:a<X(c)<b}] \\
&=\int^b_a f_X(x)dx
\end{aligned}
$$

$f_X(x)$는 $X$의 확률 밀도 함수(Probability Density Function, pdf)라고 불립니다.

#### 누적 분포 함수, cdf

$$
\begin{aligned}
& F_X(x) \\
&= P_X((-\infty, x]) \\
&= P_X({c \in C:X(c) \le x})
\end{aligned}
$$

누적 분포 함수는 이산 확률 변수와 연속 확률 변수 모두의 확률 분포를 고유하게 결정하는 함수입니다.

---

### Discrete Random variables

확률 변수의 공간(치역)이 유한하거나 가산 집합일 때, 그 확률 변수를 이산 확률 변수라고 합니다. 예를 들어 첫 번째 앞면(H)이 나올 때까지의 던지기 횟수 $X$는 이산 확률 변수이며, 그 공간은 $D = {1, 2, 3, 4, \dots}$인 가산 집합입니다.

#### 확률 질량 함수, pmf

공간이 $D$인 이산 확률 변수 $X$의 확률 질량 함수는 다음과 같이 주어집니다.

$$
p_X(x) = P[X = x]
$$

이산확률 변수의 지지도(support)는 공간 $D$ 중 확률이 양수인 점들의 집합입니다 ($S = \{x \in D : P(X=x) > 0\}$).

---

### Continuous Random variables

확률 변수 $X$의 누적 분포 함수(cdf) $F_X(x)$가 모든 $x \in \mathbb{R}$에 대해 연속 함수일 때, 그 확률 변수를 연속 확률 변수라고 합니다. 연속 확률 변수의 경우 개별 점에서의 확률은 0입니다.

#### 확률 밀도 함수, pdf

대부분의 연속 확률 변수는 절대 연속(absolutely continuous)입니다. 즉, cdf가 어떤 함수 $f_X(t)$의 적분으로 표현될 수 있습니다.

$$
F_X(x) = \int_{-\infty}^x f_X(t) \, dt
$$

$f_X(x)$가 연속이면, 미적분학의 기본 정리에 의해 다음이 성립합니다.

$$
\frac{d}{dx}F_X(x) = f_X(x)
$$

확률은 적분을 통해서 얻어집니다.

$$
\begin{aligned}
& P(a < X \le b) \\
&= P(a \le X \le b) \\
&= \int_a^b f_X(t) \, dt
\end{aligned}
$$

---

### Expectation of a Random variable

기댓값 $E(X)$는 확률 변수가 취할 수 있는 값들의 가중 평균으로 생각할 수 있으며, 여기서 가중치는 해당 값의 확률입니다. 기댓값이 존재하기 위해서는 절대 수렴 조건이 필요합니다.

연속 확률 변수는 $f(x)$를 pdf라고 할 때, $\int_{-\infty}^\infty |x|f(x) \, dx < \infty$ 이면 $X$의 기댓값은 다음과 같습니다.

$$
E(X) = \int_{-\infty}^\infty xf(x) \, dx
$$

이산 확률 변수에서는 $p(x)$를 pmf라고 할 때, $\sum_x |x| p(x) < \infty$ 이면 $X$의 기댓값은 다음과 같습니다.

$$
E(X) = \sum_x x p(x)
$$

확률 변수 $X$의 함수로 정의된 새로운 확률 변수 $Y = g(X)$의 기댓값을 구하려면, 먼저 $Y$의 분포를 구할 필요 없이 $X$의 분포를 직접 사용할 수 있습니다.

기댓값 연산자 $E$는 선형 연산자(linear operator)입니다. 따라서 예를 들어 $E[k_1g_1(X) + k_2g_2(X)] = k_1E[g_1(X)] + k_2E[g_2(X)]$를 만족합니다. 하지만 기댓값의 곱은 곱의 기댓값과 같지 않습니다.

---

### Some special expectations

기댓값이 존재하는 확률 변수 $X$의 평균값(mean value) $\mu$는 $\mu = E(X)$와 같이 정의됩니다. 평균은 $X$의 값들에 대한 가중 평균(weighted average)으로, 각 값 $a_i$의 가중치는 $p(a_i)$입니다. 이는 $X$의 0에 대한 첫 번째 적률(first moment)입니다.

유한 평균 $\mu$를 가지고 $E[(X-\mu)^2]$이 유한한 확률 변수 $X$의 분산(variance) $\sigma^2$은 $\sigma^2 = E[(X - \mu)^2]$와 같이 정의됩니다. 이는 $X$의 $\mu$에 대한 두 번째 적률(second moment)이며, $\mu$로부터 확률 변수 값들의 산포(dispersion) 또는 퍼짐 정도를 측정합니다.

$$
\text{Var}(aX + b) = a^2 \text{Var}(X)
$$

이는 확률 변수를 $a$배 하면 표준 편차도 $|a|$배로 커짐을 의미합니다.

---

### Important Inequalities

마르코프 부등식에서 확률 변수 $X$의 음이 아닌 함수 $u(X) \ge 0$에 대해 $E[u(X)]$가 존재하면, 임의의 양의 상수 $c$에 대해 다음이 성립합니다.

$$
P[u(X) \ge c] \le \frac{E[u(X)]}{c}
$$

이 부등식으로 $X$의 분포를 모르더라도 확률의 상한을 제공합니다.

체비쇼프 부등식에서 분포는 유한 분산을 갖는 모든 확률 변수에 적용되며 

$$
P(|X - \mu| \ge k\sigma) \le \frac{1}{k^2}
$$

위 부등식을 통해 확률 변수 값이 평균으로부터 $k$ 표준 편차 이상 벌어질 확률의 상한을 제공합니다.

---

### 참고 자료

[원본 경로 #1](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)



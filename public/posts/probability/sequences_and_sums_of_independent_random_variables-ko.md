---
title: 'Sequences and sums of independent random variables'
date: '2023-05-15'
tags: ['Probability', 'lecture']
---

### Kolmogorov’s Zero-One Law and the Borel-Cantelli Lemma

$(\Omega, \mathcal{F}, \mathbf{P})$가 주어진 확률 공간이라고 합시다. $\mathcal{F}$의 부분 $\sigma$-대수 수열 ${\mathcal{G}_n : n \ge 1}$을 생각합니다.

$\sigma$-대수의 독립성에 따라서 

$$
\mathbf{P}\left(G{i_1} \cap \cdots \cap G_{i_n}\right) = \mathbf{P}(G_{i_1})\cdots \mathbf{P}(G_{i_n})
$$

위 식이 성립합니다.

$\mathcal{T}_n$은 수열의 꼬리 부분 $\mathcal{G}_{n+1}, \mathcal{G}_{n+2}, \cdots$에 의해 생성된 $\sigma$-대수입니다.

$$
\mathcal{T} \triangleq \bigcap_{n=1}^\infty \mathcal{T}_n
$$

꼬리 $\sigma$-대수 $\mathcal{T}$는 수열의 무한히 먼 꼬리에 인코딩된 정보에 의해서만 결정되는 사건들로 구성됩니다. $\mathcal{T}$의 원소 $A$는 수열의 유한한 부분 $\mathcal{F}_n = \sigma(\mathcal{G}_1, \cdots, \mathcal{G}_n)$과 독립이며, 또한 수열 전체 $\mathcal{F}_\infty = \sigma(\bigcup_{n=1}^\infty \mathcal{F}_n)$와도 독립입니다.

$A \in \mathcal{T}$를 $\mathcal{T}$의 원소로 볼 때, 독립 조건에 의하여 $\mathbf{P}(A) = \mathbf{P}(A \cap A) = \mathbf{P}(A)\mathbf{P}(A) = \mathbf{P}(A)^2$이므로 $\mathbf{P}(A)=0$ 또는 $\mathbf{P}(A)=1$로 콜모고로프의 zero-one law가 정의됩니다.

#### The Borel-Cantelli Lemma

사건 $A_n$이 무한히 많이 발생하는 사건을 $\limsup_{n\to\infty} A_n \triangleq \bigcap_{n=1}^\infty \bigcup_{m=n}^\infty A_m$로 나타냅니다.

사건 $A_n$이 결국 발생하는 사건을 $\liminf_{n\to\infty} A_n \triangleq \bigcup_{n=1}^\infty \bigcap_{m=n}^\infty A_m$로 나타냅니다.

확률 공간 위의 사건 수열 ${A_n : n \ge 1}$에 대해 

제1 보렐-칸텔리 보조 정리는 

$$
\text{If } \sum_{n=1}^\infty \mathbf{P}(A_n) < \infty \quad \text{then } \mathbf{P}\left(\limsup_{n\to\infty} A_n\right) = 0
$$

위 식과 같고 사건들의 확률 합이 유한하면, 그 사건들 중 유한개만 발생합니다.

제2 보렐-칸텔리 보조 정리는 

$$
\text{If } \sum_{n=1}^\infty \mathbf{P}(A_n) = \infty, \quad \text{then } \mathbf{P}\left(\limsup_{n\to\infty} A_n\right) = 1
$$

위 식과 같고 독립 사건들의 확률 합이 무한하면, 그 사건들 중 무한히 많이 발생합니다.

#### Random walks

${X_n}$은 $\mathbf{P}(X_1 = 1) = p, \mathbf{P}(X_1 = -1) = q = 1-p$인 i.i.d. 수열이며, $S_n = X_1 + \cdots + X_n$입니다.

랜덤 워크가 원점에 무한히 많이 복귀할 확률은 $p \ne 1/2$일 경우 $\mathbf{P}(S_n = 0) = 0$으로 일시적이고 $p = 1/2$일 경우 $\mathbf{P}(S_n = 0) = 1$로 순회적이라고 합니다.

---

### The Weak Law of Large Numbers

${X_n : n \ge 1}$이 쌍별 독립(pairwise independent)이고 동일 분포(identically distributed)이며 유한 평균 $m$을 갖는 확률 변수 수열이라고 합시다.

$$
\lim_{n\to\infty} \frac{S_n}{n} = m
$$

$\mathbf{E}[X_1^2] < \infty$일 때는 체비셰프 부등식으로 쉽게 증명됩니다.

---

### Kolmogorov’s Two-Series Theorem

랜덤 급수 $\sum_{n=1}^\infty X_n$이 거의 확실하게 수렴한다는 것은 $\mathbf{P}\left(\left\{\omega : \sum_{n=1}^\infty X_n(\omega)\right\}\right) = 1$인 것을 의미합니다.

#### Kolmogorov’s Maximal Inequality

$X_1, \cdots, X_n$이 독립이고 $\mathbf{E}[X_k] = 0, \mathbf{Var}[X_k] < \infty$일 때, 모든 $\varepsilon > 0$에 대해

$$
\mathbf{P}\left(\max_{1\le k \le n} |S_k| \ge \varepsilon\right) \le \frac{1}{\varepsilon^2} \sum_{k=1}^n \mathbf{Var}[X_k]
$$

#### Kolmogorov’s Two-Series Theorem

${X_n : n \ge 1}$이 독립이고 유한 2차 모멘트를 갖는 확률 변수 수열이라고 합시다. 다음 두 실수 급수가 모두 수렴하면, 랜덤 급수 $\sum_{n=1}^\infty X_n$는 거의 확실하게 수렴합니다.

$$
\begin{aligned}
&\sum_{n=1}^\infty \mathbf{E}[X_n] < \infty \\
&\sum_{n=1}^\infty \mathbf{Var}[X_n] < \infty
\end{aligned}
$$

---

### The Strong Law of Large Numbers

$\mathbf{E}[|X_1|] < \infty$라고 가정하면 $\lim_{n\to\infty} \frac{S_n}{n} = \mathbf{E}[X_1]$이 성립하게 되고 $\mathbf{E}[|X_1|] = \infty$라고 가정하면 $\lim_{n\to\infty} \frac{|S_n|}{n} = \infty$가 성립하는 것이 강대수의 법칙입니다.

근본적으로 LLN은 다음과 같은 형태의 수렴 특성과 관련이 있습니다.

$$
\frac{1}{a_n} \sum_{j=1}^n x_j \to 0
$$

#### Bernstein’s Polynomial Approximation Theorem

WLLN은 연속 함수를 다항식으로 근사하는 베른슈타인의 정리를 증명하는 데 사용될 수 있습니다.

$f(x)$가 $[0, 1]$ 위에서 연속 함수라고 하고 다항식 $p_n(x)$를 다음과 같이 정의합니다.

$$
p_n(x) \triangleq \sum_{k=0}^n f\left(\frac{k}{n}\right) \binom{n}{k} x^k (1 - x)^{n-k}
$$

그러면 $n \to \infty$일 때 $p_n(x)$는 $[0, 1]$ 위에서 $f$로 균등 수렴합니다. $S_n = X_1 + \cdots + X_n$을 매개변수 $x$를 갖는 $n$개의 베르누이 시행의 합이라고 하면, $S_n$은 이항 분포 $B(n, x)$를 따릅니다.

$$
p_n(x) = \mathbf{E}\left[f\left(\frac{S_n}{n}\right)\right]
$$

WLLN에 의해 $S_n/n \to \mathbf{E}[X_1] = x$이고 가 연속이므로 $p_n(x) \to f(x)$입니다.

#### Borel’s Theorem on Normal Numbers

실수 $x \in (0, 1)$가 (10진법에서) 단순 정규수라는 것은, $k = 0, 1, \cdots, 9$에 대해 $x$의 소수점 이하 첫 $n$ 자리 중 숫자 $k$의 출현 빈도 $\nu_n^{(k)}(x)/n$가 다음을 만족하는 것입니다.

$$
\lim_{n\to\infty} \frac{\nu_n^{(k)}(x)}{n} = \frac{1}{10}
$$

구간 $(0, 1)$에서 균일하게 무작위로 선택된 점 $X \sim U(0, 1)$은 확률 1로 단순 정규수입니다.

#### Cramér’s Theorem

확률 $\mathbf{P}(\bar{S}_n \in B)$의 정확한 감소율을 정량화하기 위해 누적 모멘트 생성 함수(CGF) $\Lambda(\lambda)$를 정의합니다.

$$
\Lambda(\lambda) \triangleq \log \mathbf{E}[e^{\lambda X_1}]
$$

마르코프 부등식을 사용하여 $\mathbf{P}(\bar{S}_n \in B)$의 상한을 $\lambda$에 대해 최적화하면, 다음과 같은 형태의 경계를 얻습니다.

$$
\mathbf{P}\left(\bar{S}_n \in B\right) \le \exp\left(- n \inf_{y\in B} \Lambda^*(y)\right)
$$

여기서 $\Lambda^*(x)$는 $\Lambda(\lambda)$의 르장드르 변환(Legendre Transform)으로, LDP의 율 함수(Rate Function)가 됩니다. $\Lambda(\lambda)$의 르장드르 변환은 다음과 같이 정의된 함수입니다.

$$
\Lambda^*(x) \triangleq \sup_{\lambda \in \mathbb{R}} \{\lambda x - \Lambda(\lambda)\}
$$

$\lambda \mapsto x\lambda$ 직선이 $\Lambda(\lambda)$ 함수를 초과하는 최대량을 측정합니다.

---

### 참고 자료

[원본 경로 #1](hhttps://researchers.ms.unimelb.edu.au/~xgge@unimelb/Files/Notes/Lecture%20Notes%20on%20Advanced%20Probability.pdf)

[원본 경로 #2](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)



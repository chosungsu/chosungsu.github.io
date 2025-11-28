---
title: 'Models of Convergence'
date: '2023-05-12'
tags: ['Probability', 'lecture']
---

### Basic Convergence Concepts

#### Almost Sure Convergence

$X_n$이 $X$로 거의 확실하게 수렴한다는 것은, 영사건(null event) $N$이 존재하여 $\omega \notin N$인 모든 $\omega$에 대해 $\lim_{n \to \infty} X_n(\omega) = X(\omega)$가 성립하는 것입니다.

#### Convergence in Probability

$X_n$이 $X$로 확률 수렴(in probability)한다는 것은, 임의의 $\varepsilon > 0$에 대해 다음이 성립하는 것입니다.

$$
\lim_{n \to \infty} \mathbf{P}(|X_n - X| > \varepsilon) = 0
$$

#### $L^1$-Convergence

$X_n$이 $X$로 $L^1$-수렴한다는 것은 다음이 성립하는 것입니다.

$$
\lim_{n \to \infty} \mathbf{E}\left[|X_n - X|\right] = 0
$$

#### Weak Convergence

앞의 세 가지 수렴은 $X_n, X$가 같은 확률 공간에서 정의되어야 하는 반면, 약한 수렴은 분포(distribution)의 속성만으로 정의되는 가장 약한 수렴 개념입니다.

$X_n, X$의 분포 함수가 각각 $F_n(x), F(x)$일 때 $F$의 모든 연속점 $x$에서 $F_n(x)$가 $F(x)$로 수렴하는 것입니다.

---

### Uniform Integrability and $L^1$-Convergence

$L^1$-수렴은 $\mathbf{E}[X_n] \to \mathbf{E}[X]$와 같은 기댓값 수렴을 보장하기 때문에 유용합니다. 균등 적분 가능성(Uniform Integrability, UI)은 확률 수렴과 $L^1$-수렴을 연결하는 다리 역할을 합니다.

확률 공간 $(\Omega, \mathcal{F}, \mathbf{P})$ 위에서 정의된 적분 가능한 확률 변수들의 족 ${X_t : t \in T}$이 균등 적분 가능하다는 것은 다음이 성립하는 것입니다.

$$
\lim_{\lambda \to \infty} \sup_{t \in T} \mathbf{E}\left[|X_t|\mathbf{1}_{\{|X_t| > \lambda\}}\right] = 0
$$

족 전체에 걸쳐 꼬리 부분의 기댓값 기여도가 $\lambda$가 커짐에 따라 균일하게 0으로 수렴해야 합니다. 균등 적분 가능할 필요충분조건은 다음 두 가지가 모두 성립하는 것입니다.

$\Rightarrow$ ${X_t}$는 $L^1$-유계입니다. 즉, $\sup_{t \in T} \mathbf{E}[|X_t|] \le M < \infty$인 $M$이 존재합니다.

$\Rightarrow$ 균일 연속성에 의해 임의의 $\varepsilon > 0$에 대해 $\delta > 0$가 존재하여, $\mathbf{P}(F) < \delta$인 모든 $F \in \mathcal{F}$에 대해 $\mathbf{E}[|X_t|\mathbf{1}_F] < \varepsilon$가 모든 $t \in T$에 대해 성립합니다.

---

### Weak Convergence of Probability Measures

약한 수렴은 $F_n(x)$가 $F(x)$의 연속점에서만 수렴할 것을 요구합니다. 예를 들어 $X_n = 1/n$이 $X=0$으로 수렴하는 결정론적 예시를 보면, $F_n(x) \to F(x)$를 모든 $x \in \mathbb{R}$에서 요구하면 불연속점 $x=0$에서 $F_n(0)=0 \not\to F(0)=1$이 되어 수렴하지 않는 문제가 발생합니다. 따라서 불연속점을 제외해야 합니다.

#### 폴리아 정리

$F$의 연속성을 이용하여 $\sup_{x \in \mathbb{R}} |F_n(x) - F(x)|$를 불연속점의 수가 유한한 구간들에서의 차이로 상한을 잡아 $1/k$로 묶을 수 있습니다.

#### 측도의 약한 수렴

분포 함수 $F_n, F$와 그에 의해 유도된 확률 측도 $\mu_n, \mu$에 대해, $F_n$이 $F$로 약하게 수렴할 필요충분조건은 $\mu$의 모든 연속점 $a < b$에 대해 다음이 성립하는 것입니다.

$$
\mu_n((a, b]) \to \mu((a, b])
$$

$a, b$가 $F$의 연속점이면, $\mu_n((a, b]) = F_n(b) - F_n(a)$는 $F(b) - F(a) = \mu((a, b])$로 수렴합니다.

#### Vague Convergence and Helly's Theorem

$(\mathbb{R}, \mathcal{B}(\mathbb{R}))$ 위의 유한 측도 $\mu_n (n \ge 1)$과 $\mu$에 대해 $\mu$의 모든 연속점 $a < b$에 대해 $\mu_n((a, b]) \to \mu((a, b])$가 성립할 때, $\mu_n$이 $\mu$로 모호하게 수렴한다고 합니다. 모호한 수렴이 성립하고 추가로 $\mu_n(\mathbb{R}) \to \mu(\mathbb{R})$가 성립할 때, $\mu_n$이 $\mu$로 약하게 수렴한다고 합니다.

헬리 정리에 의해 $\mathcal{B}(\mathbb{R}^d)$ 위의 확률 측도 수열 ${\mu_n : n \ge 1}$이 주어지면, 부분 수열 $\mu_{n_k}$와 부분 확률 측도 $\mu$가 존재하여, $k \to \infty$일 때 $\mu_{n_k}$가 $\mu$로 모호하게 수렴합니다.

포트만토 정리에서 거리 공간 $(S, \mathcal{B}(S), \rho)$ 위의 확률 측도 $\mu_n$과 $\mu$에 대해 $\mu_n$은 $\mu$로 약하게 수렴하며 모든 유계, 균등 연속 함수 $f$에 대해 $\int_S f d\mu_n \to \int_S f d\mu$를 만족합니다. 모든 닫힌 부분 집합 $F \subseteq S$에 대해 $\limsup_{n \to \infty} \mu_n(F) \le \mu(F)$를, 모든 열린 부분 집합 $G \subseteq S$에 대해 $\liminf_{n \to \infty} \mu_n(G) \ge \mu(G)$를 만족합니다.

#### Tightness and Prokhorov’s Theorem

헬리 정리는 모호하게 수렴하는 부분 수열의 존재만 보장하므로, 극한이 확률 측도가 되도록 보장하는 조건이 필요합니다. 이것이 바로 긴밀성(tightness)입니다. 확률 측도들의 족 $\Lambda = {\mu : \mu \in \Lambda}$이 긴밀하다는 것은 임의의 $\varepsilon > 0$에 대해 다음을 만족하는 콤팩트 부분 집합 $K \subseteq S$가 존재하는 것입니다.

$$
\mu(K) \ge 1 - \varepsilon
$$

프로호로프 정리는 족 $\Lambda$는 긴밀해야 하고 $\Lambda$의 모든 수열은 약하게 수렴하는 부분 수열을 가져야 합니다.

---

### 참고 자료

[원본 경로 #1](https://researchers.ms.unimelb.edu.au/~xgge@unimelb/Files/Notes/Lecture%20Notes%20on%20Advanced%20Probability.pdf)

[원본 경로 #2](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)



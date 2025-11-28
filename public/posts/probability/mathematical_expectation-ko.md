---
title: 'Mathematical expectation'
date: '2023-05-05'
tags: ['Probability', 'lecture']
---

### Measurable Functions and Random Variables

확률 변수(Random Variable)는 표본 공간 $\Omega$에 정의된 함수 $X$로, $\omega : X(\omega) \in A$와 같은 사건에 대해 확률을 논할 수 있는 함수입니다.

#### 확장된 실수선 $\bar{\mathbb{R}}$

많은 목적을 위해 확률 변수가 $\pm\infty$ 값을 가질 수 있도록 허용하는 것이 편리합니다. 예를 들어 공정한 동전을 반복해서 던질 때, 첫 번째 앞면이 나올 때까지의 시간 $X$는 모든 던짐이 뒷면으로 나오는 결과($T, T, T, \dots$)에서 $\mathbf{X = +\infty}$ 값을 가집니다.

$\mathbb{R}$-값 함수에 대해서는 확률 변수(Random Variables)라는 용어를 사용하고, $\bar{\mathbb{R}}$-값 함수에 대해서는 가측 함수(Measurable Functions)라는 용어를 사용합니다.

#### 가측성 확인 방법

$\Rightarrow$ $X: \Omega \to \bar{\mathbb{R}}$는 가측 함수이다.

$\Rightarrow$ 모든 $a \in \mathbb{R}$에 대해, $\mathbf{{X < a} \in \mathcal{F}}$이다.

$\Rightarrow$ 모든 $a \in \mathbb{R}$에 대해, $\mathbf{{X \le a} \in \mathcal{F}}$이다.

$\Rightarrow$ 모든 $a \in \mathbb{R}$에 대해, $\mathbf{{X > a} \in \mathcal{F}}$이다.

$\Rightarrow$ 모든 $a \in \mathbb{R}$에 대해, $\mathbf{{X \ge a} \in \mathcal{F}}$이다.

위 진술들은 가측성을 확인하는 동치입니다.

---

### Integration with Respect to Measures

확률 변수의 기댓값은 본질적으로 적분의 개념입니다. 일반적인 측도 $\mu$와 가측 함수 $X$에 대한 적분 $\int_\Omega X d\mu$를 구성합니다.

Indicator functions는 $X(\omega) = \mathbf{1}_A(\omega)$ ($A \in \mathcal{F}$) 일 때, $\int_\Omega X d\mu \triangleq \mu(A)$ 로 정의합니다.

$\Omega$ 위의 비음 단순 가측 함수 $X \in \mathcal{S}^+$는 지시 함수의 유한 선형 조합입니다.

$$
X(\omega) = \sum_{i=1}^n a_i \mathbf{1}_{A_i}(\omega)
$$

$X \in \mathcal{S}^+$이고 $X = \sum_{i=1}^n a_i \mathbf{1}_{A_i}$ 일 때, $\mu$에 대한 $X$의 적분은 다음과 같이 정의됩니다.

$$
\int_\Omega X d\mu \triangleq \sum_{i=1}^n a_i \mu(A_i)
$$

이처럼 단순 함수 적분의 기본 성질에는 $\int_\Omega (X + Y) d\mu = \int_\Omega X d\mu + \int_\Omega Y d\mu$ 및 $\int_\Omega \alpha X d\mu = \alpha \int_\Omega X d\mu$와 같이 선형성과 $X \le Y$ 이면 $\int_\Omega X d\mu \le \int_\Omega Y d\mu$라는 단조성이 있습니다.

---

### Taking Limit Under the Integral Sign

#### Monotone Convergence Theorem, MCT

비음 수열에 대해 적용되며, 수렴이 단조적으로 이루어질 때 사용합니다.

$X_n, X \ge 0$이고 $X_n$이 $X$로 증가 수렴일 때 $\int_\Omega X_n d\mu$도 $\int_\Omega X d\mu$에 증가 수렴합니다.

#### Fatou's Lemma

역시 비음 수열에 대해 적용되며, 수렴 조건이 더 약할 때도 사용 가능합니다.

$X_n \ge 0$인 가측 함수 수열일 때, $\int_\Omega \liminf_{n\to\infty} X_n d\mu \le \liminf_{n\to\infty} \int_\Omega X_n d\mu$를 만족합니다.

#### Dominated Convergence Theorem, DCT

$X_n \ge 0$ 조건을 요구하지 않으며, 크기에 대한 균일한 통제(uniform control)를 요구합니다.

$X_n, X, Y$가 가측 함수라고 합시다. 모든 $n$에 대해 $\mathbf{|X_n| \le Y}$이고, $\mathbf{X_n \to X}$이며, $\mathbf{Y \in L^1}$ 일 때, $X \in L^1$ 이고 다음이 성립합니다.

$$
\lim_{n\to\infty} \int_\Omega X_n d\mu = \int_\Omega X d\mu
$$

---

### The Mathematical Expectation of a Random Variable

측도 $\mu$가 확률 측도 $\mathbf{P}$인 경우, 적분을 기댓값(Mathematical Expectation)이라고 부릅니다.

확률 공간 $(\Omega, \mathcal{F}, \mathbf{P})$ 위에서 확률 변수 $X$에 대한 적분 $\int_\Omega X d\mathbf{P}$가 존재할 때, 이를 $X$의 기댓값이라 하고 $\mathbf{E}[X]$로 표기합니다.

$X$에 의해 유도된 $\mathcal{B}(\mathbb{R})$ 상의 확률 측도 $\mu_X$를 확률 변수 $X$의 법칙(Law)이라고 합니다. $\mu_X$는 $X$의 분포 함수 $F_X(x) = \mathbf{P}(X \le x)$에 의해 유도된 르베그-스틸체스 측도입니다.

#### Some Inequalities

마르코프 부등식은 $X$가 확률 변수이고 $\alpha, \lambda > 0$일 때,

$$
\mathbf{P}(|X| \ge \lambda) \le \frac{\mathbf{E}[|X|^\alpha]}{\lambda^\alpha}
$$

를 만족하고 이 때 $\alpha=2$이고 $X$를 $X - \mathbf{E}[X]$로 대체한 경우. 이는 체비셰프 부등식으로 분산을 이용한 확률 상한을 제공합니다.

---

### The Conditional Expectation

적분 가능한 확률 변수 $X$와 $\mathcal{F}$의 부분 $\sigma$-대수 $\mathcal{G} \subseteq \mathcal{F}$가 주어졌다고 합시다. $\mathcal{G}$가 포함하는 정보가 주어졌을 때 $X$에 대한 조건부 기댓값 $\mathbf{E}[X | \mathcal{G}]$을 정의하고자 합니다. 다음 조건을 만족하는 적분 가능하고 $\mathcal{G}$-가측인 확률 변수 $Y$ 입니다.

$$
\int_A Y d\mathbf{P} = \int_A X d\mathbf{P}
$$

---

### 참고 자료

[원본 경로 #1](https://researchers.ms.unimelb.edu.au/~xgge@unimelb/Files/Notes/Lecture%20Notes%20on%20Advanced%20Probability.pdf)

[원본 경로 #2](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)

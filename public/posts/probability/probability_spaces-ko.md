---
title: 'Probability spaces'
date: '2023-05-01'
tags: ['Probability', 'lecture']
---

### 집합 클래스, 사건, 그리고 동킨의 $\pi$-$\lambda$ 정리

확률을 도입하기 전에 먼저 표본 공간(Sample Space)과 사건의 개념을 명확히 해야 합니다. 표본 공간은 임의 실험의 모든 가능한 결과를 모아 놓은 집합 $\Omega$입니다.

사건은 본질적으로 표본 공간 $\Omega$의 부분집합이어야 합니다. 하지만 $\Omega$가 무한 집합인 일반적인 상황에서는 $\Omega$의 모든 부분집합을 합법적인 사건으로 간주하는 것은 이론적으로 부적절합니다.

사건에 대한 핵심 공리는 사건들이 자연스러운 집합 연산에 대해 안정적이어야 하며 즉, 닫혀 있어야 한다는 것입니다. 예를 들어, $A$와 $B$가 합법적인 사건이라면, $A^c$, $A \cup B$, $A \cap B$ 역시 합법적인 사건이어야 합니다.

#### $\sigma$의 대수

$\Omega$의 부분집합들의 모임 $\mathcal{F}$가 다음 세 가지 속성을 만족할 때, $\Omega$에 대한 $\sigma$-대수라고 불립니다.

$\sigma$-대수 $\mathcal{F}$가 주어진 쌍 $(\Omega, \mathcal{F})$를 가측 공간(measurable space)이라고 합니다. $\mathcal{F}$의 원소들은 $\mathcal{F}$-가측 집합이라고 불리며, 이들을 사건(events)으로 해석합니다.

$\sigma$-대수는 셀 수 있는 횟수의 합집합, 교집합, 여집합 등 모든 조합에 대해 닫혀 있습니다.

#### 단순 집합 클래스

$\pi$-system은 유한 교집합에 대해 닫혀 있습니다. ($A, B \in \mathcal{C} \implies A \cap B \in \mathcal{C}$)

Semiring은 $\pi$-시스템이며 $\emptyset$을 포함하고, $A \setminus B$를 $\mathcal{C}$의 유한 상호 배타적 합집합으로 쓸 수 있습니다.

#### Borel $\sigma$ 대수

$\mathbb{R}$의 열린 부분집합들에 의해 생성된 $\sigma$-대수를 $\mathbb{R}$ 상의 보렐 $\sigma$-대수라고 하며 $\mathcal{B}(\mathbb{R})$로 표기합니다.

#### Dynkin's $\pi$-$\lambda$ Theorem

$\mathcal{C}$가 **$\pi$-시스템**이라고 가정하면, $\mathcal{C}$에 의해 생성된 $\lambda$-시스템은 $\mathcal{C}$에 의해 생성된 $\sigma$-대수와 일치합니다.

$$
\lambda(\mathcal{C}) = \sigma(\mathcal{C})
$$

---

### Probability Measures and Basic Properties

가측 공간 $(\Omega, \mathcal{F})$에 대해, 집합 함수 $\mu: \mathcal{F} \to [0, \infty]$가 다음을 만족할 때 측도라고 합니다.

$\Rightarrow$ $\mu(\emptyset) = 0$

$\Rightarrow$ ${A_n : n \geq 1}$이 $\mathcal{F}$ 내의 상호 배타적(disjoint) 집합 수열일 때, 다음이 성립합니다.

$$
\mu \left( \bigcup_{n=1}^\infty A_n \right) = \sum_{n=1}^\infty \mu(A_n)
$$

#### 측도의 기본 속성

상호 배타적인 $A_1, \dots, A_n$에 대해 $\mu(A_1 \cup \cdots \cup A_n) = \mu(A_1) + \cdots + \mu(A_n)$을 만족하는 유한 가산성, $A \subseteq B$ 이면 $\mu(A) \leq \mu(B)$를 만족하는 단조성, $A_n \in \mathcal{F}$ 이고 $A_n$이 증가 수렴이면 아래로부터의 연속성, $A_n \in \mathcal{F}$ 이고 $A_n$이 감소 수렴이면 위로부터의 연속성을 보입니다.

#### Probability Measure

가측 공간 $(\Omega, \mathcal{F})$에 정의된 측도 $\mu$가 $\mu(\Omega) = 1$을 만족할 때 확률 측도라고 합니다. 확률 측도는 종종 $\mathbf{P}$로 표기되며, 삼중 쌍 $(\Omega, \mathcal{F}, \mathbf{P})$를 확률 공간이라고 합니다.

콜모고로프의 세 가지 공리는 다음과 같습니다.

$\Rightarrow$ $\mathbf{P}(A) \geq 0$

$\Rightarrow$ $\mathbf{P}(\Omega) = 1$

$\Rightarrow$ $\mathbf{P}$는 셀 수 있는 가산성을 만족

---

### Construction of Probability Measures

#### Carathéodory's Extension Theorem

이 문제를 해결하는 핵심 아이디어는 다음과 같습니다.

표본 공간 $\Omega = \mathbb{R}$과 사건들의 모임 $\mathcal{F} = \mathcal{B}(\mathbb{R})$ (보렐 $\sigma$-대수)을 선택합니다. 반고리 $\mathcal{C} = {(a, b] : a \le b}$에 대해, 분포 함수 $F$를 사용하여 집합 함수 $\mu$를 정의합니다.

$$
\mu((a, b]) \triangleq F(b) - F(a)
$$

그러면 $\mu$를 $\sigma(\mathcal{C})$ 상의 측도로 확장하는 $\overline{\mu}$가 존재합니다. $\mu$가 $\sigma$-유한(sigma-finite)하면, 그 확장은 유일하며, 확장된 측도 $\overline{\mu}$도 $\sigma$-유한합니다.

#### Lebesgue-Stieltjes Measure

우연속인 증가 함수 $F$에 의해 유일하게 생성된 $\mathcal{B}(\mathbb{R})$ 상의 측도를 $F$에 의해 유도된 르베그-스틸체스 측도라고 하며 $\mu_F$로 표기합니다.

$F(x) = x$ 일 때, $\mu((a, b]) = b - a$는 구간의 길이를 측정합니다.

#### Distribution Function

확률론적 맥락에서, 분포 함수 $F$는 우연속인 증가 함수로서 다음을 만족합니다.

$$
\begin{aligned}
&\lim_{x \to -\infty} F(x) = 0, \\
&\lim_{x \to \infty} F(x) = 1
\end{aligned}
$$

---

### 참고 자료

[원본 경로 #1](https://researchers.ms.unimelb.edu.au/~xgge@unimelb/Files/Notes/Lecture%20Notes%20on%20Advanced%20Probability.pdf)

[원본 경로 #2](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)

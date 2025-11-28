---
title: 'Product measure spaces'
date: '2023-05-08'
tags: ['Probability', 'lecture']
---

### Product Measure Spaces

#### Product Measurable Structure

두 가측 공간 $(\Omega_1, \mathcal{F}_1)$과 $(\Omega_2, \mathcal{F}_2)$가 주어졌을 때, 그 곱 공간을 새로운 가측 공간으로 정의하는 것이 목표입니다.

표본 공간은 $\Omega = \Omega_1 \times \Omega_2$로 카르테시안 곱을 통해 나타내며 카르테시안 곱 $\mathcal{F}_1 \times \mathcal{F}_2 = {A_1 \times A_2 : A_1 \in \mathcal{F}_1, A_2 \in \mathcal{F}_2}$은 $\sigma$-대수가 아니므로, 이것이 생성하는 $\sigma$-대수를 사용합니다.

---

### Product Measures and Fubini's Theorem

$(\Omega_i, \mathcal{F}_i)$ 위의 유한 측도 $\mu_i$가 주어졌을 때, 곱 측도 $\mu_1 \otimes \mu_2$를 $(\Omega, \mathcal{F})$ 위에 구성하는 것이 목표입니다.

푸비니 정리는 $f \in b\mathcal{F}$에 대한 이중 적분의 적분 순서가 중요하지 않음을 주장합니다.

Marginal Integral은 고정된 $\omega_1 \in \Omega_1$에 대해, $\omega_2 \mapsto f(\omega_1, \omega_2)$는 유계 $\mathcal{F}_2$-가측 함수, 고정된 $\omega_2 \in \Omega_2$에 대해, $\omega_1 \mapsto f(\omega_1, \omega_2)$는 유계 $\mathcal{F}_1$-가측 함수라는 단면의 가측성질을 이용하여 

$$
\begin{aligned}
&I^f_1: \Omega_1 \to \mathbb{R}, \quad \omega_1 \mapsto I^f_1(\omega_1) \triangleq \int_{\Omega_2} f(\omega_1, \omega_2)\mu_2(d\omega_2) \\
&I^f_2: \Omega_2 \to \mathbb{R}, \quad \omega_2 \mapsto I^f_2(\omega_2) \triangleq \int_{\Omega_1} f(\omega_1, \omega_2)\mu_1(d\omega_1)
\end{aligned}
$$

위와 같이 정의됩니다. $f \in b\mathcal{F}$일 때, $I^f_1 \in b\mathcal{F}_1$, $I^f_2 \in b\mathcal{F}_2$ 이고 다음이 성립합니다.

$$
\int_{\Omega_1} I^f_1(\omega_1)\mu_1(d\omega_1) = \int_{\Omega_2} I^f_2(\omega_2)\mu_2(d\omega_2)
$$

집합 함수 $\mu$는 곱 가측 공간 $(\Omega, \mathcal{F})$ 위의 유한 측도입니다.

$$
\mu(A_1 \times A_2) = \mu_1(A_1) \cdot \mu_2(A_2)
$$

푸비니 정리의 결론이 성립하려면 $f$가 비음 함수이거나 적분 가능해야 합니다. 그렇지 않으면 적분 순서가 달라질 수 있습니다.

#### Construction of Pairs of Independent Random Variables

Joint Distribution와 독립성을 보기 위한 조건으로 $X, Y$가 확률 공간 $(\Omega, \mathcal{F}, \mathbf{P})$ 위의 확률 변수일 때 결합 분포 함수는 $F_{X,Y}(x, y) \triangleq \mathbf{P}(X \le x, Y \le y)$, 결합 법칙은 $\mu_{X,Y}(F) \triangleq \mathbf{P}((X, Y) \in F), F \in \mathcal{B}(\mathbb{R}^2)$을 만족합니다.

$X, Y$가 독립인 것은 모든 $(x, y) \in \mathbb{R}^2$에 대해 $F_{X,Y}(x, y) = F_X(x)F_Y(y)$가 성립하는 것입니다. $X, Y$가 독립일 필요충분조건은 모든 $A, B \in \mathcal{B}(\mathbb{R})$에 대해 $\mathbf{P}(X \in A, Y \in B) = \mathbf{P}(X \in A) \cdot \mathbf{P}(Y \in B)$가 성립하는 것입니다.

---

### Countable Product Spaces and Kolmogorov’s Extension Theorem

독립 확률 변수들의 수열을 구성하기 위해서는 유한 곱 측도의 개념을 가산 경우로 확장해야 합니다. 푸비니 정리(Fubini's theorem)는 무한 번의 반복 적분을 허용하지 않습니다.

$\mathbb{R}^\infty$ 위의 곱 $\sigma$-대수는 다음과 같이 정의됩니다.

$$
\mathcal{B}(\mathbb{R}^\infty) \triangleq \sigma(\mathcal{A})
$$

콜모고로프 확장 정리를 들어가기 앞서 $X$의 법칙은 $\mathcal{B}(\mathbb{R}^\infty)$ 위의 확률 측도 $\mu_X(\Gamma) \triangleq \mathbf{P}(X \in \Gamma)$ 입니다. 그리고 유한 차원 법칙에 의해서 

$$
\nu^{(n)}_X(G_n) \triangleq \mathbf{P}((X_1, \dots, X_n) \in G_n) = \mu_X(G_n \times \mathbb{R}^{>n})
$$

위 식을 만족합니다.

#### 콜모고로프 확장 정리

$\mathbb{R}^n$ 위에서 정의된 확률 측도 수열 ${\nu^{(n)} : n \ge 1}$이 주어지고, 이들이 일관성 관계를 만족한다고 가정합시다. 그러면 $\mathcal{B}(\mathbb{R}^\infty)$ 위에는 다음을 만족하는 유일한 확률 측도 $\mu$가 존재합니다.

$$
\mu(G_n \times \mathbb{R}^{>n}) = \nu^{(n)}(G_n)
$$

콜모고로프 확장 정리는 독립 확률 변수 수열의 존재를 입증하는 데 사용됩니다. $n$차원 곱 측도 $\nu^{(n)} \triangleq \nu_1 \otimes \dots \otimes \nu_n$를 정의하면, 이 족 ${\nu^{(n)}}$은 일관성 관계을 만족합니다. 이 공간 위에서 $X_n(\omega) = x_n$으로 정의된 확률 변수 수열 ${X_n : n \ge 1}$은 독립이며 $\mathbf{X_n \overset{\text{law}}{=}} \nu_n$을 만족합니다.

---

### 참고 자료

[원본 경로 #1](https://researchers.ms.unimelb.edu.au/~xgge@unimelb/Files/Notes/Lecture%20Notes%20on%20Advanced%20Probability.pdf)

[원본 경로 #2](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)




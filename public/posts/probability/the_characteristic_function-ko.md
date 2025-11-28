---
title: 'The Characteristic function'
date: '2023-05-19'
tags: ['Probability', 'lecture']
---

### 특성 함수의 정의 및 기본 속성

특성 함수(Characteristic Function)는 모멘트 생성 함수(Moment Generating Function, MGF)를 복소수 영역으로 확장한 것입니다. 일반적으로 복소수 값을 가집니다.

복소 지수에 대한 오일러 공식(Euler's formula)을 상기합니다. $z = x + iy \in \mathbb{C}$에 대해, 복소수 $e^z$는

$$
e^z = e^x (\cos y + i \sin y)
$$

$x=0$으로 설정하면, 오일러 공식은 다음과 같습니다.

$$
e^{iy} = \cos y + i \sin y
$$

확률 변수 $X$의 특성 함수는 다음과 같이 정의된 $\mathbb{C}$-값 함수입니다. $f_X(t) \triangleq \mathbf{E}[e^{itX}]$에 오일러 공식을 사용하면 $f_X(t) = \mathbf{E}[\cos tX] + i\mathbf{E}[\sin tX]$로 해석됩니다.

$X$ (또는 $\mu$)가 확률 밀도 함수 $\rho(x)$를 가지는 경우, 특성 함수는 다음과 같습니다.

$$
f(t) = \int_{-\infty}^\infty e^{itx}\rho(x)dx
$$

이는 $\rho(x)$의 푸리에 변환으로도 알려져 있습니다.

---

### Uniqueness theorem

특성 함수를 사용하는 주된 이유 중 하나는 그것이 확률 변수의 분포를 고유하게 결정한다는 것입니다.

#### 역변환 공식

$\mu$가 $\mathbb{R}$ 위의 확률 측도이고 $f(t)$가 그 특성 함수라고 할 때, 임의의 실수 $x_1 < x_2$에 대해 다음이 성립합니다.

$$
\begin{aligned}
&\mu((x_1, x_2)) + \frac{1}{2}\mu(\{x_1\}) + \frac{1}{2}\mu(\{x_2\}) \\
&= \lim_{T\to\infty} \frac{1}{2\pi} \int_{-T}^T \frac{e^{-itx_1} - e^{-itx_2}}{it} f(t)dt
\end{aligned}
$$

특성 함수가 적분 가능할 때의 밀도 함수는 $\rho(x) = \frac{1}{2\pi} \int_{-\infty}^\infty e^{-itx}f(t)dt$로 $\int_{-T}^T$ 적분을 $\int_{-\infty}^\infty$로 대체할 수 있고 좌우 연속성도 확립됩니다.

---

### 레비-크라메르

특성 함수의 가장 중요한 속성 중 하나는 확률 변수의 약한 수렴(weak convergence)이 특성 함수의 점별 수렴(pointwise convergence)과 동치라는 것입니다.

확률 측도 수열 $\mu_n$이 $\mu$로 약하게 수렴하고 특성 함수가 $f_n, f$라고 할 때, $f_n$은 $\mathbb{R}$의 모든 유한 구간 위에서 $f$로 균등하게 수렴합니다. $x \mapsto e^{itx}$는 유계 연속 함수이므로, 약한 수렴의 정의에 의해 $f_n(t) \to f(t)$는 자명합니다.

특성 함수의 점별 수렴에서 확률 측도 수열 ${\mu_n}$의 특성 함수 ${f_n}$이 어떤 극한 함수 $f(t)$로 점별 수렴하고 $f(t)$는 $t=0$에서 연속한다면 $\mu_n$은 어떤 확률 측도 $\mu$로 약하게 수렴한다고 할 수 있습니다.

---

### 참고 자료

[원본 경로 #1](https://researchers.ms.unimelb.edu.au/~xgge@unimelb/Files/Notes/Lecture%20Notes%20on%20Advanced%20Probability.pdf)

[원본 경로 #2](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)


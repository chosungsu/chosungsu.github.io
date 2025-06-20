---
title: 'basic_probability_and_statics'
date: '2024-05-13'
tags: ['Probability&Statistics', 'lecture']
---

### definition of probability

$P : F \rightarrow [0, 1]$ 에서 아래와 같은 확률적인 측정을 합니다. 

1.$P(\Omega)=1$

2.$0 \le P(E) \le 1, \forall E \in F$

---

### continuity of probability

확률 공간에서 이벤트 $A_n$에 대해 아래의 부등식이 성립합니다.

$$
P(lim inf_{n \rightarrow \infty} A_n) \le \\
lim inf_{n \rightarrow \infty} P(A_n) \le \\
lim sup_{n \rightarrow \infty} P(A_n) \le \\
P(lim sup_{n \rightarrow \infty} A_n)
$$

여기서 하극한 사건은 거의 항상 발생하지만 유한한 사건이고 상극한 사건은 무한한 사건을 말합니다.

---

### expectation

random vvariable $X$와 $f : X \rightarrow R$에 대해서 $E(f(x)) = \int f(x)dP(x)$로 표현이 가능하고 continuous일 때는 $\int f(x)p(x)dx$, discrete일 때는 $\sum_x f(x)p(x)$로 구분이 됩니다.

---

### moment generating function

적률 생성 함수는 random variable $X$에 대해 $m_X(t) = e^{tX}$와 같이 정의됩니다.

$|t| < \epsilon$ 구간에서 유한한 $t$를 사용하여 $m_X(t) < \infty$ 라는 조건이 만족된다면 아래와 같이 계산이 됩니다.

$$
EX^k = \frac{\partial^k}{\partial^k} m_X(t) |_{t=0}
$$

위 식은 미분을 통한 적률 계산으로 $m_X(t)$를 $t$에 대해 $k$번 미분하고 $t=0$을 대입하면 $k$차 적률값을 얻을 수 있게 됩니다.

매클로린 급수를 통해 적률 생성 함수를 구하는 것은 아래와 같이 나타낼 수 있습니다.

$$
m_X(t) = \sum_{k=0}^{\infty} \frac{EX^k}{k!} t^k
$$

적률 생성 함수의 중요한 성질 중 하나로 두 확률 변수의 mgf가 같다면 반드시 동일한 확률 분포를 갖는다는 것입니다.

---

### some inequality

random variable $X$에 대해서 $t > 0$, $\epsilon > 0$인 구간의 $t$를 사용한 $E|X|^t < \infty$라는 조건이 만족된다면 markov inequality는 아래와 같이 계산이 됩니다.

$$
P(|X| > \epsilon) \le \frac{E|X|^t}{\epsilon^t}
$$

이 부등식의 큰 장점은 확률 분포의 구체적인 모양을 몰라도 기댓값 하나만으로 tail probability의 upper bound를 계산할 수 있다는 것입니다.

이 때 $t=2$일 때 chebyshev's inequality가 됩니다.

markov inequality에서 $X$ 대신에 $Y = X-\mu$로 새 변수를 만들고 $P(|X-\mu| > \epsilon) \le \frac{E|X-\mu|^2}{\epsilon^2}$로 새로 적용을 하게 됩니다. 즉 분자가 분산과 동일하므로 자신의 평균 $\mu$로부터 $\epsilon$ 이상 벗어날 확률은 분산이 작을수록 낮다는 것을 보여줍니다.

jensen's inequality는 random variable $X$가 convex function인 $f : R \rightarrow R$를 만족할 때 $f(EX) \le E(f(X))$가 성립합니다.

---

### multivariate normal distribution

$\mu \in R^p$와 $p*p$ 대칭인 양의 정부호(SPD) 행렬 $\sum$과 $p$차원 random vector $X$가 있을 때 $X=\mu + \sum^{1/2} Z$로 다변량 정규분포를 표현합니다. 분산 공분산 행렬의 제곱근과 표준정규분포를 따르는 벡터로 구성되어 있습니다.

z벡터의 특성으로 $Z = (z_1, ..., z_p)^T$가 $z \sim N(0,1)$로 iid(독립 동일 분포)를 만족하고 서로 독립적이면서 모두 표준정규분포를 따른다는 것이 있습니다.

$\sum$이 양의 정부호 행렬일 때 $p(x)=\frac{1}{\sqrt{2\pi\sum}}exp[-\frac{(x-\mu)^T\sum^{-1}(x-\mu)}{2}]$와 같이 밀도함수가 정의됩니다. 정규화 상수를 통해 전체 적분이 1이 되도록 조정합니다.

$X$를 $\begin{bmatrix} X_1 \\ X_2 \end{bmatrix}$와 같이 분리하고 $\mu$를 $\begin{bmatrix} \mu_1 \\ \mu_2 \end{bmatrix}$, $\sum$을 $\begin{bmatrix} \sum_{11} & \sum_{12} \\ \sum_{21} & \sum_{22} \end{bmatrix}$로 분리를 한 다음 marginal distribution을 구하면 $X_1 \sim N(\mu_1, \sum_{11})$을 따르게 됩니다. 그리고 conditional distribution을 구해보면 $X_1|X_2 = x_2 \sim N_q(\bar{\mu}, \bar{\sum})$을 따릅니다. 이 때 조건부 평균인 $\bar{\mu} = \mu_1 + \sum_{12}\sum_{22}^{-1}(x_2 - \mu_2)$로 $x_1$의 무조건부 평균과 $x_2$가 $x_1$에 미치는 영향에 관한 회귀계수, 편차 부분으로 구성이 됩니다. 조건부 분산인 $\bar{\sum} = \sum_{11} - \sum_{12}\sum_{22}^{-1}\sum_{21}$로 $x_1$의 무조건부 분산과 분산 감소량 부분으로 구성이 됩니다.

$$
(X-\mu)^T\sum^{-1}(X-\mu) \sim \chi_p^2 \\
Z^THZ \sim \chi_\gamma^2, (\gamma = tr(H))
$$

위 식에서처럼 다변량 정규분포에서 마할라노비스 거리 제곱과 대칭 멱등행렬 이차형식은 자유도 $p$인 카이제곱 분포를 따릅니다.

위샤트 분포에 따라서 $W \sim W_m(\sum) = \sum_{j=1}^{m} Z_jZ_j^T$로 정의되며 $m$개의 독립적인 다변량 정규분포 벡터들의 외적 합 분포를 의미합니다. 여기서 $\bar{X_n} \sim N(\mu, \sum/n)$은 표본 평균은 정규분포를 따르고 평균은 모평균 $\mu$에 분산은 모분산을 표본 크기로 나눈 값이 됩니다. 표본평균과 표본분산-공분산 행렬은 서로 독립 관계를 갖습니다.

---

### log-normal distribution

log normal distribution의 확률밀도함수(pdf)는 아래와 같이 정의됩니다.

$$
p(x) = \frac{1}{x\sqrt{2π}σ²} * exp[-\frac{(log x - μ)^2}{2σ^2}]
$$

$log X \sim N(\mu, \sigma^2)$ 와 같이 정규분포를 따르고 오른쪽으로 긴 꼬리의 양의 값만 갖는 분포입니다.

---

### 참고 자료

[원본 경로 #1](https://www.dropbox.com/scl/fi/buhj2z45ghs4wzclvagom/Chap4-probStat.pdf?rlkey=7lxxfr6m7sgwsc62k870oinkd&e=1&dl=0)




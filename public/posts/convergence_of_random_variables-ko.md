---
title: 'Convergence_of_random_variables'
date: '2024-05-17'
tags: ['Probability&Statistics', 'lecture']
---

### convergence in probability

$X_n$는 $X$의 확률적 수렴이라고 하며 $X_n \xrightarrow {P} X$로 정의됩니다. 그리고 $P(d(X_n, X) > \epsilon) \rightarrow 0$이 $n \rightarrow \infty$에서도 성립합니다.

---

### almost sure convergence

$X_n$는 $X$의 거의 확실한 수렴이라고 하며 $X_n \xrightarrow {a.s} X$로 정의됩니다. 그리고 $P(lim_{n \rightarrow \infty} X_n = X) \rightarrow 1$이 성립합니다. 확률적 수렴을 설명할 수 있지만 그 역은 성립하지 않습니다.

---

### weak convergence

$P_n$은 $P$의 약한 수렴이라고 하며 $P_n \xrightarrow {L} P$로 정의됩니다. 이론적으로 확률적 수렴 $X_n \xrightarrow {P} X$는 분포적 수렴 $X_n \xrightarrow {L} X$을 함의합니다. $P(X=c) = 1$인 상수 $c$에 대해서 역도 성립합니다.

---

### slutsky's theorem

$X_n \xrightarrow {L} X$와 $Y_n \xrightarrow {L} c$로 분포가 수렴하는 경우 continuous mapping theorem에 의해 덧셈과 곱셈에 대한 분포도 수렴함을 알 수 있습니다.

$$
X_n + Y_n \xrightarrow {L} X + c, \\
X_nY_n \xrightarrow {L} cX
$$

---

### law of large numbers

#### weak law of large numbers, WLLN

$X_1, X_2, ...X_d$값을 갖는 독립동일분포(iid)를 만족하는 공간에서 $E|X_i| < \infty$를 조건으로 할 때 평균 $\mu = EX_i$이고 표본평균을 $\bar{X_n} = \frac{1}{n} \sum_{i=1}^{n} X_i$으로 정리하면 $\bar{X_n} \xrightarrow {P} \mu$라고 수렴관계를 정의할 수 있습니다. 이는 표본평균이 확률적으로 모평균에 수렴한다는 의미입니다.

#### strong law of large numbers, SLLN

WLLN과 동일한 조건에서 $\bar{X_n} \xrightarrow {a.s} \mu$로 정의할 수 있고 이는 표본평균이 거의 확실히 모평균에 수렴한다는 강한 수렴의 의미를 갖습니다.

---

### central limit theorem

$X_1, X_2, ...X_d$값을 갖는 독립동일분포(iid)를 만족하는 공간에서 $\sum = Var(X_i)$라고 하면 $\sqrt(n)(\bar{X_n} - \mu) \xrightarrow {L} N(0, \sum)$으로 수렴관계를 정의합니다. 이는 표준화된 표본평균이 다변량 정규분포에 수렴함을 의미합니다.

---

### big O and little O

작은 o표기법으로 실수 수열에서 $x_n = o(a_n) \Leftrightarrow x_n/a_n \rightarrow 0$은 $x_n$이 $a_n$보다 훨씬 작다는 의미이고 확률변수에서 $X_n = o_p(a_n) \Leftrightarrow X_n/a_n \xrightarrow {P} 0$은 $X_n$이 $a_n$보다 확률적으로 훨씬 작다는 의미를 표현합니다.

큰 O표기법으로 실수 수열에서 $x_n = O(a_n) \Leftrightarrow sup_n|x_n/a_n| < \infty$로 $x_n$이 $a_n$과 같은 차수라는 의미이고 확률변수에서 $X_n=O_p(a_n) \Leftrightarrow X_n/a_n$은 $X_n$이 $a_n$과 확률적으로 같은 차수라는 의미를 표현합니다.

대수적 성질을 아래에 나열하였습니다.

1.$O_p(1) + O_p(1) = O_p(1)$

2.$O_p(1)*O_p(1) = O_p(1)$

3.$O_p(1) + o_p(1) = O_p(1)$

4.$O_p(1)*o_p(1) = o_p(1)$

5.$o_p(1) + o_p(1) = o_p(1)$

6.$o_p(1)*o_p(1) = o_p(1)$

---

### metrics for probability measures

#### 1.KL divergence

$P$와 $Q$를 $X$에 두 측정지표는 kullback-leibler divergence로 아래와 같이 정의됩니다.

$$
K(P, Q) = \int log \frac{dP}{dQ}dP = \int log \frac{p(x)}{q(x)} dP(x)
$$

여기서 $p$와 $q$는 $P$와 $Q$의 밀도 함수로 사용됩니다. KL 발산은 항상 0이상이고 0인 경우는 $P$와 $Q$의 분포가 완전 동일할 때입니다. 그리고 $K(tP_1 + (1-t)P_2, tQ_1 + (1-t)Q_2) \le tK(P_1, Q_1) + (1-t)K(P_2, Q_2)$를 만족하는 경우는 두 분포 모두 convex할 때입니다. 이는 선형 결합이 개별 KL발산의 가중 평균보다 작거나 같음을 의미합니다. 마지막으로 다변량 정규분포에서 KL발산은 $K(P,Q) = \frac{1}{2} * [tr(\sum_2^{-1}\sum_1) - d + log(\frac{det(\sum_2)}{det(\sum_1)}) + (\mu_2 - \mu_1)^T\sum_2^{-1}(\mu_2 - \mu_1)]$와 같이 공분산 행렬의 관계를 측정하는 행렬의 대각합, 차원에 따른 정규화계수, 두 분포의 부피 차이, 평균 벡터 간의 마할라노비스 거리 제곱 등으로 구성됩니다.

#### 2.Maximum likelihood estimator

$p_0$은 $\theta \in \ominus$로 매개화된 밀도함수입니다. 그리고 $x_1, ..., x_n$은 독립동일분포(iid)로 추출된 random samples일 때 최대우도 추정량 $\hat{\theta} = argmax_{\theta \in \ominus} \sum_{i=1}^{n} log p_{\theta}(X_i)$으로 계산됩니다. 이를 KL발산으로 $\theta_* = argmin_{\theta \in \ominus} K(p_0, p_{\theta}) = argmin (\int log \frac{p_0}{p_{\theta}} dP_0) = argmin (\int log p_0dP_0 - \int log p_{\theta} dP_0)$로 분해하면 즉, 발산의 최소화는 $\int log p_{\theta} dP_0$의 최대화를 의미하게 됩니다.

#### 3.Variational Bayes

$p(\theta|X)$는 관심을 갖는 파라미터에 대한 사후분포이고 $q(\theta|\gamma)$는 매개변수 $\gamma$로 매개화된 분포입니다. 이 분포를 $q$라는 variational family를 통해 복잡한 사후분포를 근사시키는 계산식은 아래와 같습니다.

$$
L(q) = \int [log \frac{p(\theta, X)}{q(\theta)}] q(\theta) d\theta
$$

이는 evidence lower bound로 variational bayes에서는 이 하한을 최대화하고자 합니다. $log p(X) = K(q, p) + L(q)$로 evidence를 분해한다면 결국 KL발산이 양수이면서 최소화되어야 evidence lower bound가 최대화가 된다는 사실을 찾을 수 있고 이에 따라 $\hat{\gamma} = argmin K(q, p)$로 바꾸어 생각할 수 있습니다.

#### 4.Total variation

총 변동은 두 확률지표 간의 최대 차이를 의미하고 $d_{TV}(P, Q) = sup_A|P(A) - Q(A)|$로 모든 borel 부분집합인 A를 사용합니다. 이 차이는 0과 1 사이로 정규화되어 나타납니다. 또한 위 식은 $d_{TV}(P, Q) = \frac{1}{2}|p-q|_1$과 같이 밀도함수 차이의 절댓값 적분의 절반과 동일하다고 합니다.

#### 5.Coupling inequality

결합 부등식은 $d_{TV}(P, Q) \le Pr(X \ne Y)$와 같이 결합 분포를 갖는 확률 분포들($X$, $Y$)과 그 주변 분포 $P$, $Q$로 구성되며 위에서 구하였던 총변동은 결합 분포에서 $X \ne Y$일 확률의 upper bound를 갖는다는 것을 표현합니다.

#### 6.Hellinger metric

밀도함수를 통해 hellinger metric를 구하면 $d_H(p,q) = \sqrt{\int (\sqrt(p) - \sqrt(q))^2 d\mu}$로 dominate measure인 $\mu$에 독립적이고 다변량 정규분포에서는 아래와 같이 공분산 행렬들의 기하적인 평균과 평균 벡터 간의 가중거리로 구성됩니다.

$$
1-d^2_h(p, q) = \frac{|\sum_1|^{1/4}|\sum_2|^{1/4}}{|(\sum_1+\sum_2)/2|^{1/2}}* \\
exp(-\frac{1}{8}(\mu_1-\mu_2)^T(\frac{\sum_1+\sum_2}{2})^{-1}(\mu_1-\mu_2))
$$

이 metric의 관계들을 아래에 나열하였습니다.

1.$d^2_H(p,q) \le |p-q|_1 \le 2d_H(p,q)$ : hellinger metric 거리의 제곱은 L1 거리의 상한이고 hellinger metric 거리 2배가 L1거리의 상한입니다.

2.$|p-q|_1^2 \le 2K(p,q)$ : KL 발산의 2배가 L1거리의 제곱의 상한입니다.

3.$d^2_H(p,q) \le K(p,q)$ : 1, 2번을 통해 KL발산이 hellinger metric 거리 제곱의 상한입니다.

#### 7.Wasserstein metrics

$p$차 wasserstein metric는 $W_p(P, Q) = inf (\int_{\chi^2} d(x,y)^p d\pi(x,y))^{1/p}$로 정의되며 두 분포 간의 최적 운송 비용을 구하는데 쓰입니다.

이러한 이유로 wasserstein gan(WGAN)에 사용됩니다. $p_0$에서 독립동일분포로 추출된 $x_1, ..., x_n$의 random samples와 알 수 없는 분포 $P_0 \in R^D$, 알려진 분포 $p_z \in R^d$가 주어져 있을 때 $g_\# p_z$를 g를 통해 알려진 분포를 pushforward하는 측도라고 정의합니다.

$$
minimize_{g \in G} W_1(g_\# p_z, p_n)
$$

이렇게 생성된 분포와 경험적 분포 간의 1차 거리 최소화 목적식을 풀도록 합니다. 이를 kantorovich-rubinstein duality 이론에 의하여,

$$
minimize_{g \in G} sup_{f \in F} |\int f(g(z))dp_z(z) - \frac{1}{n} \sum_{i=1}^{n} f(x_i)|
$$

첫번째 항에서 생성된 분포의 기댓값을 넣고 두번째 항에서 실제 데이터의 평균을 넣어서 최대최소 문제로 변환합니다.

---

### 참고 자료

[원본 경로 #1](https://www.dropbox.com/scl/fi/arxhpvx7h88n1no73ksmn/Chap5-convergence.pdf?rlkey=9s4b2w1x3lry1hethqmrpgoge&e=2&dl=0)




---
title: 'Basic_concentration_inequalities'
date: '2024-05-20'
tags: ['Probability&Statistics', 'lecture']
---

### chernoff bound

random variable $X$가 평균 $\mu$를 갖는 경우 $Ee^{\lambda(X-\mu)} < \infty$가 만족될 때 모든 $t > 0$에 대해서 $log Pr(X-\mu \ge t) \le inf_{\lambda \in [0, b]} (log Ee^{\lambda(X-\mu)} - \lambda t)$로 정의할 수 있습니다.

---

### gaussian tail bounds

$x$가 정규분포를 따를 때 $Ee^{\lambda X} = e^{\mu \lambda + \frac{\sigma^2 \lambda^2}{2}}$와 $Pr(X \ge \mu + t) \le e^{-\frac{t^2}{2\sigma^2}}$를 만족합니다.

---

### sub gaussian

위의 가우시안과 차이점은 sub gaussian parameter인 $\sigma$가 양수를 갖게 되는 경우의 정의로 $Ee^{\lambda(X-\mu)} \le e^{\frac{\sigma^2 \lambda^2}{2}}$라고 정의를 합니다.

$Pr(X=1) = Pr(X=-1) = 1/2$가 되는 것을 rademacher variable이라고 하는데 이 변수는 $\sigma=1$일 때입니다. 이와 동일하게 $Pr(a \le X \le b) = 1$이라면 $X$는 $(b-a)/2$를 sub-gaussian parameter로 갖습니다.

$X_1$, $X_2$가 각각 $\sigma_1$, $\sigma_2$를 sub gaussian variable로 갖는다면 둘이 독립인 경우에는 $X_1 + X_2$의 variable은 $\sqrt{\sigma_1^2+\sigma_2^2}$이 되고 그렇지 않은 경우에는 $\sqrt(2) \sqrt{\sigma_1^2 + \sigma_2^2}$가 됩니다.

---

### uniformly consistent test

$x_1, ..., x_n \sim P$ with iid일 때 $H_0 : P = P_0$이라는 귀무가설과 $H_1 : d_p(P, P_0) > \epsilon$인 대립가설을 고려하면 $p_0$을 선택하는 확률이 0에 수렴하는지 확인하는 실험을 말합니다.

귀무가설이 참일 때의 차이값은 아래와 같습니다.

$$
|\int f_k dP_n - \int f_k dP_0|
$$

이 값이 작을수록 $k$에 대한 확률 즉 귀무가설의 확률이 높아짐을 의미합니다.

---

### sub exponential variable

random variable $X$가 평균 $\mu=EX$를 가질 때 양의 파라미터 $(v, \alpha)$를 사용하여 $|\lambda| < \frac{1}{\alpha}Ee^{\lambda(X-\mu} \le e^{\frac{v^2\lambda^2}{2}}$를 만족하는 것을 sub exponential이라고 합니다.

카이제곱을 따른다면 $\lambda < 1/2$인 파라미터를 사용하여 $Ee^{\lambda(X-1)} = \frac{e^{-\lambda}}{\sqrt{1-2\lambda}}$를 만족하게 되며 만약 $\lambda > 1/2$이면 무한의 mgf를 갖습니다.

---

### johnson lindenstrauss embedding

$D$차원에서 2보다 큰 $d$차원으로의 축소를 할 때,

$$
\frac{|F(x_i) - F(x_j)|_2^2}{|x_i-x_j|_2^2}
$$

이 값의 오차가 작도록 설계하였습니다. 따라서 해당 오차 범위 외의 확률값은 $2e^{-d\delta^2/8}$입니다.

---

### 참고 자료

[원본 경로 #1](https://www.dropbox.com/scl/fi/49qolod5jxcaadoxk8ule/Chap6-concentrationIneq.pdf?rlkey=6n0ppjr6t8r0fqrkjyxn2ydwc&dl=0)




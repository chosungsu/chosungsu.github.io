---
title: 'Sums of random variables and long-term averages'
date: '2024-05-17'
tags: ['Probability&Statistics', 'lecture']
---

### Warm up

$S_n \triangleq X_1 + X_2 + \cdots + X_n$에서 각 $X_i$는 i.i.d(independent & identically distributed) 성질을 갖는다고 합니다.

이제 $E[X_i]$가 궁금하면 $\frac{X_1+X_2+ \cdots+X_n}{n}$과 관계가 있음을 짐작할 수 있습니다. 또한 확률의 세계에서 어떤 이벤트 $A$가 발생하는데 예를 들어 100번의 시행 중 30번째 시행에 성공을 한다면 $\frac{I_{A_1}+ I_{A_2}+ \cdots + I_{A_n}}{n}$이 $P[A]$이면서 이는 결국 $E[A]$에 수렴하지 않겠나 짐작할 수 있습니다.

이러한 증명은 Law of Large Numbers라고 합니다.

---

### Solution

위의 증명에서 $X \leftarrow N(0,1)$로 샘플링할 때 $M_n$을 샘플링의 평균이라고 할 수 있습니다. 따라서 $E[X_i]=\mu, Var(X_i)=\sigma^2$이라고 하면 $E[S_n]=n*\mu, Var(S_n)=n*\sigma^2$이라고 볼 수 있습니다.

weak law of large numbers는 epsilon을 양수로 설정하고 $lim_{n \rightarrow \infty} P[|M_n - \mu| < \epsilon]=1$을 만족합니다. 그리고 strong law of large numbers는 finite mean and variance가 있는 경우 $P[lim_{n \rightarrow \infty} M_n = \mu]=1$을 의미합니다.

---

### Examples of $M_n$

$M_n=\frac{\sum_{i=1}^{n}X_i}{n}$는 즉 $n \rightarrow \infty$일 때 수렴하는 것이 자명합니다.

우선 sure convergence에서 $X_n(\zeta) \rightarrow X(\zeta)$가 $n \rightarrow \infty$일 때 수렴한다는 것을 말합니다.

다음으로 almost sure convergence에서는 $P[X_n \rightarrow X]=1$가 $n \rightarrow \infty$에서 만족한다고 하는데 이는 위의 sure convergence는 어떤 $n$에서도 모두 수렴하는 것을 말한다면 almost sure convergence에서는 일부 수렴하지 않는 경우도 존재할 수 있지만 결국 그 확률합은 베르누이 정리에 의하여 1임을 말합니다.

그리고 Mean square convergence에서는 $E[(X_n=X)^2]=0$이 되는데 이는 위에서 결국 $n \rightarrow \infty$의 경우에 수렴한다고 하였으므로 자연스럽게 성립하는 문제입니다.

---

### Central limit theorem(CLT)

$X_i$가 i.i.d이며 $E[X_i]=\mu, Var(X_i)=\sigma^2$, $S_n=X_1+\cdots+X_n$을 만족할 때, CLT에서는 $S_n \rightarrow \text{(gaussian r.v)} N(n\mu, n\sigma^2)$와 같이 결국 $n \rightarrow \infty$이면 가우시안 분포를 따르게 된다고 말하고 있습니다.

이를 증명해보면 $z_n \triangleq \frac{S_n-n\mu}{\sqrt{n}*\sigma} \rightarrow N(0,1)$임을 보여야 하고 $z_n$의 특징값이 $E[e^{jwz_n}]$에 대해서 다음과 같이 대입합니다.

$$
E[e^{jw\frac{\sum_{i=1}^{n}(X_i-\mu)}{\sqrt{n}*\sigma}}] \\
=E[\prod_{i=1}^{n} e^{jw\frac{(X_i-\mu)}{\sqrt{n}*\sigma}}] \\
=\prod_{i=1}^{n} E[e^{jw\frac{(X_i-\mu)}{\sqrt{n}*\sigma}}] \\
=\prod_{i=1}^{n} E[1+\frac{jw}{\sigma*\sqrt{n}}(x_i-\mu)+\cdots +R(u)] \\
=\prod_{i=1}^{n} (1-\frac{w^2}{2n}) \\
=(1-\frac{w^2}{2n})^n \\
=e^{-\frac{w^2}{2n}}
$$

이처럼 exponential 내부의 합은 곱으로 변경이 가능하며 전개가 가능해집니다.

---

### 참고 자료

[원본 경로 #1](https://www.youtube.com/watch?v=Kjhvx1z3TjM&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=17)

[원본 경로 #2](https://www.youtube.com/watch?v=tPoZcVAVJF8&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=18)




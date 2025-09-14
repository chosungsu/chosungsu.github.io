---
title: 'Random variable'
date: '2024-05-06'
tags: ['Probability&Statistics', 'lecture']
---

### Discrete random variable

각 시행횟수별로 확률이 정해져 있는 경우를 말하며 예를 들면 주사위를 던지는 시행에서 space가 $S=\{1, 2, 3, 4, 5, 6\}$이 될 것이고, 동전 3개를 던지는 시행에서 space가 $S=\{HHH, HHT, HTH, THH, HTT, THT, TTH, TTT\}$가 될 것입니다. 이 때 각 변수(variable)을 $\zeta$ (zeta)라고 합니다.

random variable X는 $X : S \rightarrow R$을 만족하고 $\zeta : X(\zeta) \in B$로 정수 범위에 해당합니다.

---

### Probability mass function(PMF)

PMF는 discrete variable에 사용되고 Probability distribution function(PDF)는 continuous variable에 사용됩니다.

PMF는 $P[X=x] \triangleq P_X(x)=P[\{\zeta : X(\zeta)=x\}]$로 정의됩니다. 예를 들어 $S=\{1, 2, 3, \cdots, 6\}$, $X=\{1, 2, 3, \cdots, 6\}$이 주어져 있을 때 pmf를 그리면 확률값이 $y$축이므로 $x$축에서부터 일자로 1/6까지 6개의 직선을 그린 그래프가 됩니다.

또 다른 예를 들어보면 $A$를 시행하는데 값은 $s,f$로 성공여부를 받지만 $s$로 고정을 합니다. 베르누이 랜덤 변수 $I_A(\zeta)=\begin{cases} 0 \\ 1 \end{cases}$로 $\zeta$가 $A$에 없다면 0, 있다면 1로 정의를 합니다.

위 문제를 풀이하면 $S=\{s,f\}, A=\{s\}$이고 $X=I_A$ 즉, $A=s$로 space를 탐색하는 것이므로 $x=0$에서는 수직으로 $1-p$만큼 그리고 $x=1$에서는 수직으로 $p$만큼 그린 것이 pmf가 됩니다.

또 다른 예를 들어보면 $A$가 전송하는 작업을 시행하는데 조금의 에러가 생길 수 있습니다. 따라서 $S=\{0, 1, \cdots, n\}$이 되고 확률값 $P_X(x)=\begin{pmatrix} n \\ x \end{pmatrix} p^x(1-p)^{n-x}$이라고 정의가 가능해집니다. 그래프를 그리면 정규분포처럼 중앙이 값이 큰 그래프를 가집니다.

---

### Expected value

랜덤 변수 $X$의 기댓값으로 기호로는 $E[X] \triangleq \sum_{x \in S_X} x \, P_X(x)=mx$로 정의가 됩니다.

$s,f$가 있을 때 $f$가 나올 확률은 0, $s$가 나올 확률은 1이라면 $E[I_A]=\sum_{x \in S_x} x*P_X(x)=0*(1-p)+1*p=p$가 됩니다.

그리고 동전 3개를 던지고 앞면이 나올 확률의 기댓값을 구하면 $E[I_A]=\sum_{x \in S_x} x*P_X(x)=3*\frac{1}{8}+2*\frac{3}{8}+1*\frac{3}{8} + 0*\frac{1}{8}=1.5$가 됩니다.

이러한 계산이 간단하게 정리가 되는데 그 값은 $E[X]=np$입니다.

---

### Expectation of function of r.v

$z = g(x)$에서 $z, x$가 r.v일 때 $E[z]=\sum_j z_j P_z(z_j)$로 기본적으로 정의가 가능하지만 $x$라는 r.v를 사용하게 된다면 $E[z]=\sum_j z_j \sum_{k:g(x_k)=z_j} P_x(x_k)=\sum_k g(x_k)P_x(x_k)=E[g(x)]$로 변환이 가능해집니다.

이는 예를 들어 $E[g(x)]=E[ax+b]=aE[x]+b$와 같이 밖으로 꺼내질 수도 있습니다.

또 다른 문제로 $S_x=\{-3, -1, 1, 3\}, P_X(x)=1/4$로 주어져 있고 $E[z]=\sum_k x_k^2 P_X(x_k)$로 정의를 할 수 있다면 기댓값은 $(-3)^2*\frac{1}{4} + (-1)^2*frac{1}{4} + 1^2*frac{1}{4} + 3^2*frac{1}{4}=5$가 됩니다.

---

### Variance

분산은 r.v의 분포를 나타내는 측정값이라고 합니다. $Var(X)=E[(X-E[x])^2]$으로 계산이 가능합니다. 즉, random한 $X$값에서 평균을 뺀 값을 제곱한 것의 평균치로 추정하는 것입니다. 위 식을 더 간단히 풀어쓰면 제곱을 전개했을 때 $E[X^2-2mxX+(mx)^2]=E[X^2]-(mx)^2=E[X^2]-(E[X])^2$과 동일해집니다.

성질로는 $Var(X+c)=Var(X), Var(cX)=c^2Var(X)$이 있습니다.

기댓값과 같이 분산도 간단하게 정리가 되는데 그 값은 $Var[X]=npq$이고 $q$는 $(1-p)$ 확률값을 의미합니다.

---

### Conditional pmf

$P_X[\bullet | c] = P[X=x | c]=\frac{P[[X=x] \cap c]}{P[c]}$로 정의되며 $x \notin c$이면 0이 됩니다.

예를 들어보면 시계가 있으며 $\zeta$가 분에 해당하고 $X$가 시간에 해당할 때, $B=\{\text{first 4 hours}\}$, $D=\{1 < \zeta \le 11\}$이 주어졌다고 합니다. $S_x=\{0, 1, \cdots, 11\}$가 되고 $P_X(x)=\frac{1}{12}$로 정의가 가능해집니다. 이 때 $B$가 주어져 있을 때 $X$의 확률인 $P_X[x|B]=\frac{P[X=x]}{P[B]}=\frac{1/12}{1/3}=\frac{1}{4}$로 구해집니다. 그리고 $D$가 주어져 있을 때 $X$의 확률인 $P_X[x|D]=\frac{P[\{X=x\} \cap \{\zeta \in \{2, 3, \cdots, 11\}\}]}{P[\zeta \in \{2, 3, \cdots, 11\}]}$을 계산하여야 합니다. 우선 $x=0$이면 분자는 $1,2,3,4,5$중 교집합인 $2,3,4,5$가 채택되어 $\frac{4/60}{10/60}=2/5$을 갖게 됩니다. 그리고 $x=1$이면 분자는 $6,7,8,9,10$ 전부가 범위에 있으므로 $\frac{5/60}{10/60}=1/2$, 마지막으로 $x=2$이면 분자는 $11$만 범위에 있으므로 $\frac{1/60}{10/60}=1/10$을 갖게 됩니다.

---

### Poisson r.v

$$
P_X=\begin{pmatrix} 
n \\ x 
\end{pmatrix}
p^x(1-p)^{n-x} \\
= \frac{\lambda^k*e^{-\lambda}}{k!}
$$

포아송 분포(Poisson distribution)는 단위 시간 또는 단위 공간에서 발생하는 사건의 수를 모델링하는 이산 확률 분포입니다. 주로 사건이 독립적으로 발생하며, 발생률이 일정한 경우에 사용됩니다. 이항 분포에서 시행 횟수 $n$이 충분히 크고 발생 확률 $p$가 매우 작은 경우인 포아송 과정일 때 근사적으로 사용될 수 있습니다. 이 경우 이항 분포가 포아송 분포로 수렴하게 됩니다.

예를 들어 $n$개의 쿼리가 $t$초마다 콜센터에 온다면 포아송 랜덤변수 $\alpha=\lambda * t$가 있을 때 $\lambda$는 초당 평균 도착비율을 의미한다고 합니다. 이 때 4개보다 많은 쿼리가 10초동안 오는 확률, 5개보다 적은 쿼리가 2분동안 오는 확률을 각각 구해보면 $\lambda=\frac{4}{60}$으로 주어져 있고 $X$를 10초 동안 오는 쿼리 수로 정하면 확률값을 $P[X > 4]=1-P[0 \le X \le 4] = 1-(\frac{\alpha^0*e^{-\alpha}}{0!}+\frac{\alpha^1*e^{-\alpha}}{1!}+\frac{\alpha^2*e^{-\alpha}}{2!}+\frac{\alpha^3*e^{-\alpha}}{3!}+\frac{\alpha^4*e^{-\alpha}}{4!})$에 $\alpha=\frac{4}{60}*10=\frac{2}{3}$를 대입하여 계산하면 됩니다. 다음으로 $P[Y < 5]=\frac{\alpha^0*e^{-\alpha}}{0!}+\frac{\alpha^1*e^{-\alpha}}{1!}+\frac{\alpha^2*e^{-\alpha}}{2!}+\frac{\alpha^3*e^{-\alpha}}{3!}+\frac{\alpha^4*e^{-\alpha}}{4!}$에 $\alpha=\frac{4}{60}*120=8$을 대입하여 계산하면 됩니다.

---

### Definition of CDF, PDF

$P_X(x)=P[X=x]$와 같이 특정 값을 갖는 확률에 대한 분포는 pmf라고 합니다.

cdf(cumulative distribution function)은 $F_X(x) \triangleq P[X \le x]$와 같이 정의되며 특정 값보다 작거나 같을 확률에 대한 분포입니다. cdf는 $0 \le F_X(x) \le 1$이라는 확률 성질과 랜덤 변수가 커질수록 증가함수의 성질, $P[a \le X \le b]=F_X(b)-F_X(a), P[X=b]=F_X(b)-F(b^-)$과 같은 계산 성질을 갖습니다.

예를 들어 세 개의 동전을 던지는 시행에서 앞면이 나올 확률분포를 생각해보면 구간은 0,1,2,3으로 나누고 $P[X \le 0]=0+\frac{1}{8}$이 되고 $P[X \le 1]=P[X \le 0] + \frac{3}{8}=\frac{1}{2}$, $P[X \le 2]=P[X \le 1] + \frac{3}{8}=\frac{7}{8}$, $P[X \le 3]=P[X \le 2] + \frac{1}{8}=1$로 구간별 값이 구해집니다.

따라서 마지막 성질은 right continuous로 오른쪽에서 그래프를 보면 연속이라는 것입니다.

다음으로 pdf(probability density function)은 $F_X(x)=\int_{-\infty}^{x} f_X(\tau)d\tau$로 적분으로 나타내거나 $f_X(x)=\frac{d}{dx}F_X(x)$로 미분으로 계산하여도 됩니다. pdf는 $f_X(x) \ge 0$, $P[a \le X \le b]=\int_{a}^{b}f_X(\tau)d\tau$, $\int_{-\infty}^{\infty}f_X(\tau)d\tau=1$이라는 성질을 갖습니다.

예를 들어 $0 < \theta \le 2\pi$인 원이 있을 때 랜덤 변수 $X(\theta)=\theta/2\pi$를 갖는다고 하면 cdf를 다음과 같이 구합니다. 따라서 $X \in [0, 1]$ 범위를 갖게 되고 범위 밖인 $P[X \le 0]=0$과 $P[X > 1]=1$로 최대 확률값을 부여합니다. 중간 범위는 $0~1$까지 증가함수 성질을 갖기 때문에 두 범위를 잇습니다. 그리고 pdf를 그리면 기울기이므로 $P[X \le 0]=P[X > 1]=0$을 갖게 되며 중간 범위는 $1$을 갖습니다.

---

### Entropy

$H_X \triangleq -\sum_{k=1}^{\infty}p_k * ln(p_k)$로 정의되며 여기서 $p_k$는 $X=x_k$를 가질 확률값을 의미합니다. $-ln(x)$는 1을 기점으로 좌측은 양수, 우측은 음수를 갖습니다. $-xln(x)$그래프는 둘을 곱하면 0과 1 사이에서 항상 양수를 갖게 되고 범위는 $x$가 확률값이므로 $[0,1]$ 사이에서만 존재하고 따라서 절대 음수가 나오지 않는 관계식입니다.

예를 들어 sample space는 $S=\{H, T\}$이고 $P[H]=\theta$의 확률값을 가진다고 했을 때, $S_X=\{0, 1\}$를 갖게 되며 엔트로피는 $H_X=-\theta*ln(\theta)-(1-\theta)*ln(1-\theta)$이라고 할 수 있습니다. 단 $\theta=\frac{1}{2}$로 가정할 수 있으므로 대입하면 엔트로피는 1을 갖습니다.

엔트로피가 크다는 것은 불확실성(uncertainty)가 크다는 것이고 정보량이 많다는 의미이기도 합니다.

---

### 참고 자료

[원본 경로 #1](https://www.youtube.com/watch?v=RbSVWHbu7c0&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=4)

[원본 경로 #2](https://www.youtube.com/watch?v=w8nXVk0rzKI&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=5)

[원본 경로 #3](https://www.youtube.com/watch?v=qD4EFFSYYec&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=6)

[원본 경로 #4](https://www.youtube.com/watch?v=n8K9QJVY_4Q&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=7)





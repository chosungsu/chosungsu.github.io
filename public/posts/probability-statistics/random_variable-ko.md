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

PMF는 $P[X=x] \triangleleq P_X(x)=P[{\zeta : X(\zeta)=x}]$로 정의됩니다. 예를 들어 $S=\{1, 2, 3, \cdots, 6\}$, $X=\{1, 2, 3, \cdots, 6\}$이 주어져 있을 때 pmf를 그리면 확률값이 $y$축이므로 $x$축에서부터 일자로 1/6까지 6개의 직선을 그린 그래프가 됩니다.

또 다른 예를 들어보면 $A$를 시행하는데 값은 $s,f$로 성공여부를 받지만 $s$로 고정을 합니다. 베르누이 랜덤 변수 $I_A(\zeta)=\begin{cases} 0 \\ 1 \end{cases}$로 $\zeta$가 $A$에 없다면 0, 있다면 1로 정의를 합니다.

위 문제를 풀이하면 $S=\{s,f\}, A=\{s\}$이고 $X=I_A$ 즉, $A=s$로 space를 탐색하는 것이므로 $x=0$에서는 수직으로 $1-p$만큼 그리고 $x=1$에서는 수직으로 $p$만큼 그린 것이 pmf가 됩니다.

또 다른 예를 들어보면 $A$가 전송하는 작업을 시행하는데 조금의 에러가 생길 수 있습니다. 따라서 $S=\{0, 1, \cdots, n\}$이 되고 확률값 $P_X(x)=\begin{pmatrix} n \\ x \end{pmatrix} p^x(1-p)^{n-x}$이라고 정의가 가능해집니다. 그래프를 그리면 정규분포처럼 중앙이 값이 큰 그래프를 가집니다.

---

### Expected value

랜덤 변수 $X$의 기댓값으로 기호로는 $E[X] \triangleleq \sum_{x \in S_x} x*P_X(x)=mx$로 정의가 됩니다.

$s,f$가 있을 때 $f$가 나올 확률은 0, $s$가 나올 확률은 1이라면 $E[I_A]=\sum_{x \in S_x} x*P_X(x)=0*(1-p)+1*p=p$가 됩니다.

그리고 동전 3개를 던지고 앞면이 나올 확률의 기댓값을 구하면 $E[I_A]=\sum_{x \in S_x} x*P_X(x)=3*\frac{1}{8}+2*\frac{3}{8}+1*\frac{3}{8} + 0*\frac{1}{8}=1.5$가 됩니다.

이러한 계산이 간단하게 정리가 되는데 그 값은 $E[X]=np$입니다.

---

### 참고 자료

[원본 경로 #1](https://www.youtube.com/watch?v=RbSVWHbu7c0&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=4)




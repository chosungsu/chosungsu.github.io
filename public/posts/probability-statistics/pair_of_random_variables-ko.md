---
title: 'Pair of Random variable'
date: '2024-05-11'
tags: ['Probability&Statistics', 'lecture']
---

### Pair of r.v

예를 들어 sample space $S=\{1, 2, 3, \cdots, 10\}$으로 학생 수를 담고 두번째 sample space $S_w=\{55, 60, 60, \cdots, 100\}$으로 몸무게를 담고, 세번째 sample space $S_h=\{170, 145, 155, \cdots, 180\}$으로 키를 담습니다.

이 때 만약 $W=60$을 가질 때 $H=145$ 또는 $H=155$를 가질 수 있음을 알 수 있습니다. 이는 상관관계 여부를 파악하는 예시 중 하나입니다.

---

### Joint pmf

discrete random variable인 $X, Y$에 대해서 $P_{XY}(x,y) \triangleq P[\{X=x\} \cap \{Y=y\}]$으로 정의됩니다. 이 값은 음수를 가지지 못하고 전체 합은 1입니다.

이전에 알아본 random variable $X$에 대한 pmf인 $P_X(x)=P[X=x]$에서 더 나아가 $P[\{X=x\} \cap \{Y=\text{any}\}]=\sum_k P_{XY}(x,y_k)$라고 생각할 수 있습니다. 이는 $Y$에 대한 의존성을 없애는 방법입니다. 이 때의 $P_X(x)$를 marginal pmf라고 부릅니다. 이 과정은 $Y$에 대해서도 동일하게 적용됩니다.

---

### Joint cdf

$F_{XY}(x,y) \triangleq P[\{X \le x\} \cap \{Y \le y\}]$로 정의됩니다.

이전에 알아본 $X$에 대한 cdf인 $F_X(x) = F_{XY}(x, \infty)$로 구할 수 있습니다. 즉, cdf는 density이므로 범위만 지정하면 되는 차이점이 있습니다.

이에 따라 $P[x_1 < X \le x_2, y_1 < Y \le y_2]$의 확률값을 cdf로 표현해보면 다음과 같습니다. $F_{XY}(x_2, y_2)-F_{XY}(x_1, y_2)-F_{XY}(x_2, y_1)+F_{XY}(x_1,y_1)$입니다.

---

### Joint pdf

cdf와 미분적분관계이므로 $F_{XY}(x,y)=\int_{-\infty}^{x}\int_{-\infty}^{y} f_{XY}(x',y')dy'dx'$에서 좌항은 cdf이고 우항의 적분기호 내부의 함수 $f_{XY}(x',y')=\frac{\partial}{\partial*x}\frac{\partial}{\partial*y} F_{XY}(x,y)$가 pdf라고 할 수 있습니다.

$f_X(x)=\frac{d}{dx}F_X(x)=\frac{d}{dx}F_{XY}(x, \infty)$와 같이 구할 수 있으며 $f_X(x),f_Y(y)$는 모두 marginal pdf라고 부릅니다.

---

### Independent r.v

$P[A_1 \cap A_2]=P[A_1] * P[A_2]$일 때 서로 독립적이라고 합니다. 서로 독립적인 discrete r.v의 확률값도 $P_{XY}(x_i, y_i)=P_{X}(x_i)P_{Y}(y_i)$로 계산할 수 있습니다. continous r.v도 $F_{XY}(x,y)=F_X(x)F_Y(y)$, $f_{XY}(x,y)=f_X(x)f_Y(y)$로 계산할 수 있습니다.

---

### Covariance

$Cov(X,y)=E[(X-mx)(Y-my)]$일 때 $mx=0$ 또는 $my=0$이면 $Cov(X,Y)=E[XY]=Corr(X,Y)$이 성립합니다. 증명을 간단히 해보면 $E[X(Y-my)]=E[XY]-E[X]*my$가 되고 이 때 $mx=0=E[X]$로 설정했으므로 우항의 두번째 값이 0이 되면서 위 수식이 성립하게 됩니다.

$X, Y$가 독립적이라면 $Cov(X,Y)=0$입니다. 이 역시 간단한 증명을 해보면 $Cov(X,Y)=E[XY]-mx*E[Y]-my*E[X]+mx*my=E[XY]-mx*my=E[X]E[Y]-E[X]E[Y]=0$이 성립하게 됩니다.

상관계수인 $\rho$는 다음과 같이 정의됩니다.

$$
\rho_{XY} \triangleq \frac{Cov(X,Y)}{\sqrt{Var[X]}*\sqrt{Var[Y]}}
$$

상관계수는 범위가 $-1 \le \rho_{XY} \le 1$을 갖습니다.

---

### Conditional probability and expectation

discrete r.v에서는 $P_Y(y|x)=P[Y=y|X=x]$라고 할 수 있고 이 값은 $P[Y=y|X=x]=\frac{P[Y=y, X=x]}{P[X=x]}$로 전개할 수 있습니다. 그리고 continuous r.v에서는 $F_Y(y|x)=\frac{P[Y \le y, X=x]}{P[X=x]}$이지만 분모와 분자 모두 확률값은 cdf 상에서 0이 되므로 좋지 않은 정의입니다. 따라서 다르게 정의하면 $\text{lim}_{h \rightarrow 0} \frac{P[Y \le y, x < X \le x+h]}{P[x < X \le x+h]}=\text{lim}_{h \rightarrow 0} \frac{\int_{-\infty}^{y} \int_{x}^{x+h} f_{XY}(x',y')dx'dy'}{\int_{x}^{x+h} f_X(x')dx'}=\text{lim}_{h \rightarrow 0} \frac{\int_{-\infty}^{y} f_{XY}(x, y')*hdy'}{f_X(x)*h}=\frac{\int_{-\infty}^{y}f_{XY}(x,y')dy'}{f_X(x)}$와 같이 비교적 간단히 전개가 가능해집니다. 이를 확인하면 분모에는 $x$에 대한 pdf값이 들어가고 분자에는 $x$만 그대로이고 $y'$는 범위로 접근하는 두개의 r.v에 대한 pdf가 들어가게 됩니다.

이제 위에서 cdf를 구했으므로 pdf를 구해보면 $f_Y(y|x)=\frac{f_{XY}(x,y)}{f_X(x)}$가 됩니다.

그리고 expectation도 continuous r.v일 때는 $E[Y|X] \triangleq \int_{-\infty}^{\infty} y*f_Y(y|x)dy$로 정의되고 discrete r.v일 때는 $E[Y|X] \triangleq \sum_k y_k*P_Y(y_k|x)$와 같이 정의됩니다.

예를 들면 신호가 +1이 올 확률 $p_1=\frac{1}{3}$이고 -1이 올 확률 $p_2=\frac{2}{3}$이라고 할 때, 평균이 0이고 분산이 1인 정규분포를 갖는 $N$을 중간에 더하면 output $Y=X+N$입니다. 이 때 $P[X=1|Y>0]$을 구하려면 $f_Y(y)=f_Y(y|x=1)*P[X=1]+f_Y(y|x=-1)*P[X=-1]$와 같이 pdf값을 구하는 것을 응용하여 $\frac{P[X=1, Y>0]}{P[Y > 0]}=\frac{P[Y>0|X=1]P[X=1]}{P[Y>0|X=1]P[X=1]+P[Y>0|X=-1]P[X=-1]}=\frac{(1-\Phi(-1))*\frac{1}{3}}{(1-\Phi(-1))*\frac{1}{3}+(1-\Phi(1))*\frac{2}{3}}$로 계산하면 됩니다.

---

### 참고 자료

[원본 경로 #1](https://www.youtube.com/watch?v=sRjGkR9ybew&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=12)

[원본 경로 #2](https://www.youtube.com/watch?v=3vZVrT9lP_k&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=13)




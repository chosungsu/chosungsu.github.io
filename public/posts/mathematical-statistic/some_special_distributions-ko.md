---
title: 'Some special distributions'
date: '2023-05-08'
tags: ['Mathematical statistics', 'lecture']
---

### The binomial and related distributions

#### Bernoulli Trial

베르누이 시행(Bernoulli experiment)은 상호 배타적이고 완벽하게 다른 두 가지 결과, 예를 들어 성공 또는 실패(예: 여성 또는 남성, 생존 또는 사망, 불량품이 아님 또는 불량품) 중 하나로만 분류될 수 있는 무작위 실험입니다.

베르누이 시행의 연속(sequence of Bernoulli trials)은 베르누이 실험을 여러 번 독립적으로 수행하며, 성공 확률 $p$가 매 시행마다 동일하게 유지될 때 발생합니다.

베르누이 시행과 관련된 확률 변수 $X$를 다음과 같이 정의합니다.

$$
X(\text{Success}) = 1 \quad \text{and} \quad X(\text{Fail}) = 0
$$

$X$의 확률 질량 함수 $(\text{pmf})$는 다음과 같습니다.

$$
p(x) = p^x (1 - p)^{1-x}, \quad x = 0, 1
$$

우리는 $X$가 베르누이 분포(Bernoulli distribution)를 따른다고 한다면 아래처럼 기댓값과 분산을 정의할 수 있습니다.

$$
\begin{aligned}
& \mu = E(X) = p, \\
& \sigma^2 = \text{var}(X) = p(1 - p)
\end{aligned}
$$

$n$번의 독립적인 베르누이 시행에서, 성공 확률 $p$가 일정하게 유지될 때, 확률 변수 $X$를 관찰된 성공 횟수라고 합니다. $x$번의 성공이 발생하면 $n-x$번의 실패가 발생합니다.

$n$번의 시행 중 $x$번의 성공 위치를 선택하는 방법의 수는 $\binom{n}{x}$이고, 각 배열의 확률은 $p^x (1 - p)^{n-x}$입니다. 따라서 $X$의 pmf는 다음과 같습니다.

$$
p(x) = \begin{cases} \binom{n}{x} p^x (1 - p)^{n-x} \\ 0\end{cases}
$$

이 형태의 pmf를 갖는 확률 변수 $X$는 이항 분포(Binomial distribution)를 따른다고 하며, $\mathbf{b(n, p)}$로 표기합니다.

#### Negative Binomial

확률 변수 $Y$를 $r$번째 성공이 발생하기까지의 총 실패 횟수라고 가정합니다. 즉, $Y+r$은 정확히 $r$번의 성공을 얻는 데 필요한 총 시행 횟수이며, 마지막 시행은 성공이어야 합니다.

$$
p_Y(y) = \begin{cases} \binom{y+r-1}{r-1} p^r (1 - p)^y \\ 0 \end{cases}
$$

$Y$는 위와 같은 pmf를 따릅니다.

#### Multinomial Distribution

이항 분포를 일반화한 것입니다. 무작위 실험을 $n$번 독립적으로 반복하고, 각 시행의 결과가 $k$개의 상호 배타적인 범주 $C_1, C_2, \dots, C_k$ 중 하나에 속할 때, 각 범주에 대한 확률 $p_i$는 일정하다고 가정합니다 $(\sum_{i=1}^k p_i = 1)$.

$X_i$를 범주 $C_i$에 속하는 결과의 수라고 할 때, $\mathbf{(X_1, X_2, \dots, X_{k-1})}$의 joint pmf는 다음과 같습니다.

$$
\begin{aligned}
& P(X_1=x_1, \dots, X_{k-1}=x_{k-1}) \\
&= \frac{n!}{x_1! \cdots x_{k-1}! x_k!} p_1^{x_1} \cdots p_{k-1}^{x_{k-1}} p_k^{x_k}
\end{aligned}
$$

여기서 $x_k = n - \sum_{i=1}^{k-1} x_i$이고 $p_k = 1 - \sum_{j=1}^{k-1} p_j$입니다.

---

### The poisson distribution

모든 실수 $z$에 대해 아래의 급수 전개가 성립하고 

$$
\begin{aligned}
& 1 + z + \frac{z^2}{2!} + \frac{z^3}{3!} + \cdots \\
&= \sum_{x=0}^{\infty} \frac{z^x}{x!} = e^z
\end{aligned}
$$

함수 $p(x)$를 다음과 같이 정의합니다.

$$
p(x) = \begin{cases} \frac{\lambda^x e^{-\lambda}}{x!} \\ 0\end{cases}
$$

여기서 $\lambda > 0$이므로 확률은 0보다 크거나 같게 됩니다. 아래의 세 공리를 만족할 때 분포유도를 진행하겠습니다.

$\rightarrow g(1, h) = \lambda h + o(h)$

$\rightarrow \sum_{k=2}^{\infty} g(k, h) = o(h)$

$\rightarrow$ 겹치지 않는 구간에서의 사건 발생 횟수는 서로 독립입니다.

우선 $k=0$에서 사건이 구간 $(0, t+h]$에서 발생하지 않을 경우는 $(0, t]$에서 발생하지 않고 $(t, t+h]$에서도 발생하지 않을 경우와 동치입니다. 공리 (1)과 (2)에 의해 $(0, h]$에서 사건이 발생하지 않을 확률은 $1 - \lambda h + o(h)$입니다. 공리 (3)의 독립성에 의해

$$
g(0, t + h) = g(0, t)[1 - \lambda h + o(h)]
$$

이를 만족합니다. 미분하게 되면 

$$
\begin{aligned}
&\frac{g(0, t + h) - g(0, t)}{h} \\
&= -\lambda g(0, t) + g(0, t) \frac{o(h)}{h} \\
&\to -\lambda g(0, t)
\end{aligned}
$$

$h \to 0$일 때 만족하게 됩니다. $\mathbf{g(0, t) = e^{-\lambda t}}$로 적분 가능합니다.

다음으로 $k+1$에서 $g(k, t) = e^{-\lambda t}(\lambda t)^k/k!$이 성립한다고 가정하고, $g(k+1, t)$가 성립함을 보입니다. $(0, t+h]$에서 $k+1$번의 사건이 발생하려면, $(0, t]$에서 $k+1$번 발생하고 $(t, t+h]$에서 0번 발생하거나, $(0, t]$에서 $k$번 발생하고 $(t, t+h]$에서 1번 발생해야 합니다.

$$
\begin{aligned}
& g(k + 1, t + h) \\
&= g(k + 1, t)[1 - \lambda h + o(h)] + g(k, t)[\lambda h + o(h)]
\end{aligned}
$$

위 함수를 미분하면 

$$
\frac{d}{dt} g(k + 1, t) = -\lambda g(k + 1, t) + \lambda g(k, t)
$$

이와 같으며 적분값을 대입하면 $g(k+1, t) = e^{-\lambda t} \frac{(\lambda t)^{k+1}}{(k+1)!}$을 얻을 수 있습니다.

---

### The $\Gamma, \chi^2, \beta$ distributions

#### $\Gamma$ function

$\Gamma$ 분포는 미적분학에서의 정의를 통해서 $\alpha > 0$일 때 다음 적분이 존재하는 것이 증명됩니다.

$$
\Gamma(\alpha) = \int_0^{\infty} y^{\alpha-1} e^{-y} dy
$$

$\alpha = 1$일 때 $\Gamma(1) = \int_0^{\infty} e^{-y} dy = 1$이 성립하며 $\alpha > 1$일 때는 부분적분으로 

$$
\mathbf{\Gamma(\alpha) = (\alpha - 1) \Gamma(\alpha - 1)}
$$

이를 만족하고 $\alpha$가 1보다 큰 양의 정수일 경우는 $\Gamma(\alpha) = (\alpha - 1)!$ 이 됩니다. $\Gamma$ 함수를 때때로 계승 함수(factorial function)라고도 부릅니다.

연속 확률 변수 $X$의 pdf는 

$$
f(x) = \begin{cases} \frac{1}{\Gamma(\alpha)\beta^{\alpha}} x^{\alpha-1} e^{-x/\beta}\\ 0 \end{cases}
$$

로 정의되고 pdf의 총합이 1인 것을 증명할 때 변환으로 $z=\frac{x}{\beta}$를 사용합니다. 적률 생성함수 mgf는 $y=\frac{x(1-\beta t)}{\beta}$로 치환하여 

$$
\mathbf{M(t) = \frac{1}{(1 - \beta t)^{\alpha}}}
$$

이를 미분하여 얻는 평균과 분산은 각각 $\mu=\alpha \beta$, $\sigma^2 = \alpha \beta^2$가 구해집니다.

#### $\chi^2$ distribution

감마 분포의 특수한 경우로, $\mathbf{\alpha = r/2}$ 이고 $\mathbf{\beta = 2}$일 때 $\chi^2$ 분포는 

$$
f(x) = \begin{cases} \frac{1}{\Gamma(r/2) 2^{r/2}} x^{r/2-1} e^{-x/2} \\ 0 \end{cases}
$$

와 같이 정의됩니다. 그리고 이 때 사용되는 모수 $r$은 자유도(degrees of freedom)이라고 부르며 $X$는 자유도 $r$인 $\chi^2$ 분포를 따른다고 $\mathbf{X \sim \chi^2(r)}$로 표기합니다. 평균과 분산도 각각 $\mu=r$, $\sigma^2 = 2r$가 구해집니다.

#### $\beta$ distribution

$\beta$ 분포는 지지도 집합이 $(a, b)$와 같이 유계 구간인 연속 분포 모델링에 유용하고 특히 $(0,1)$ 구간에서 정의됩니다. 이 때의 pdf는 

$$
f(x) = \begin{cases} \frac{\Gamma(\alpha+\beta)}{\Gamma(\alpha)\Gamma(\beta)} x^{\alpha-1} (1-x)^{\beta-1} \\ 0 \end{cases}
$$

으로 정의가 되며 $\alpha = \beta = 1$이면 균일 분포(uniform distribution)를 가집니다. 평균과 분산은 각각 $\mu = \frac{\alpha}{\alpha+\beta}$, $\sigma^2 = \frac{\alpha \beta}{(\alpha+\beta+1)(\alpha+\beta)^2}$가 구해집니다.

---

### The normal distribution

#### The Standard normal distribution

$$
I = \int_{-\infty}^{\infty} \frac{1}{\sqrt{2\pi}} \exp \left( -\frac{z^2}{2} \right) dz
$$

이 적분은 피적분 함수가 양의 연속 함수이고 적분 가능한 함수이므로 극좌표 변환을 사용한다면 $I^2=1$임을 알 수 있습니다.

따라서 아래의 pdf를 갖는 연속 확률 변수 $Z$를 표준 정규 확률 변수라고 합니다.

$$
f(z) = \frac{1}{\sqrt{2\pi}} \exp \left( -\frac{z^2}{2} \right)
$$

그리고 mgf는 $w=z-t$로 치환하여 

$$
M_Z(t) = E[\exp\{tZ\}] = \exp \left( \frac{1}{2} t^2 \right)
$$

가 되며 평균과 분산은 0과 1이 됩니다.

#### The General normal distribution

양수인 $b$와 $a$에 대해 연속 확률 변수인 $X$를 $\mathbf{X = bZ + a}$로 정의합니다. pdf를 유도하고 $a=E(X)=\mu$, $b^2=Var(X)=\sigma^2$임을 확인해봅니다.

$$
f(x) = \frac{1}{\sqrt{2\pi}\sigma} \exp \left[ -\frac{1}{2} \left( \frac{x - \mu}{\sigma} \right)^2 \right]
$$

그리고 mgf도 $X = \sigma Z + \mu$로 치환하여

$$
\mathbf{M_X(t) = \exp \left( \mu t + \frac{1}{2} \sigma^2 t^2 \right)}
$$

이를 얻게 되며 $Z = N(0,1)$를 따릅니다. pdf는 $x=\mu$를 통과하는 수직축에 대해 대칭이고 그 좌표에서 최대값 $\frac{1}{\sigma \sqrt{\frac{2}{\pi}}}$를 가집니다. 변곡점은 $x=\mu \pm \sigma$에 존재합니다. 평균 모수는 위치 모수로 그래프의 위치만 바꾸며 표준 편차 모수는 분포의 퍼짐 정도를 바꾸는 척도 모수로 행동합니다.

---

### The Multivariate normal distribution

#### Bivariate

확률 변수 쌍 $(X, Y)$의 pdf가 

$$
f(x, y) = \frac{1}{2\pi\sigma_1\sigma_2\sqrt{1 - \rho^2}} e^{-q/2}
$$

이와 같을 때 이변량 정규 분포를 따릅니다. 여기서 $q$는 $q = \frac{1}{1 - \rho^2} \left[ \left( \frac{x - \mu_1}{\sigma_1} \right)^2 - 2\rho \left( \frac{x - \mu_1}{\sigma_1} \right) \left( \frac{y - \mu_2}{\sigma_2} \right) + \left( \frac{y - \mu_2}{\sigma_2} \right)^2 \right]$를 만족하며 모수는 양수, $\rho^2 < 1$를 만족해야 합니다.

이변량 정규 분포에서 mgf는 $M_{(X,Y)}(t_1, t_2) = \exp \left[ t_1\mu_1 + t_2\mu_2 + \frac{1}{2} (t_1^2\sigma_1^2 + 2t_1t_2\rho\sigma_1\sigma_2 + t_2^2\sigma_2^2) \right]$로 $X$에 대한 주변 분포는 $M_{(X,Y)}(t_1, 0)$이므로, $\mathbf{X \sim N(\mu_1, \sigma_1^2)}$, $Y$에 대한 주변 분포는 $M_{(X,Y)}(0, t_2)$이므로, $\mathbf{Y \sim N(\mu_2, \sigma_2^2)}$입니다.

이 때 $X, Y$가 독립이면 $\rho=0$이고 등확률 곡선은 원형입니다. $f(x,y)=c$를 만족하는 점들의 집합은 타원입니다.

#### Multivariate

$Z = (Z_1, \dots, Z_n)^T$가 독립 항등 분포(i.i.d.)를 따르는 $N(0, 1)$ 확률 변수 벡터일 때, $Z$의 pdf는 다음과 같습니다.

$$
f_Z(\mathbf{z}) = \left( \frac{1}{2\pi} \right)^{n/2} \exp \left( -\frac{1}{2} \mathbf{z}^T \mathbf{z} \right)
$$

이 때의 평균 벡터 $E[Z]=0$, $Cov[Z]=I_n$이 되어 $Z \sim N_n(0, I_n)$을 따른다고 할 수 있습니다.

다변량 정규 분포 $X$의 모든 주변 분포는 그 자체로 정규 분포입니다. $X \sim N_n(\mathbf{\mu}, \mathbf{\Sigma})$가 $X_1$과 $X_2$로 분할될 때, $\mathbf{X_1}$과 $\mathbf{X_2}$는 $\mathbf{\Sigma_{12} = O}$ (공분산 행렬이 영행렬)일 때만 독립입니다.

#### PCA

주성분 분석은 $X \sim N_n(\mathbf{\mu}, \mathbf{\Sigma})$일 때, $\Sigma$의 스펙트럼 분해 $\Sigma = \Gamma^T \Lambda \Gamma$를 사용하여 새로운 확률 벡터 $\mathbf{Y = \Gamma(X - \mu)}$를 정의합니다. $Y$는 $\mathbf{N_n(\mathbf{0}, \mathbf{\Lambda})}$ 분포를 따르므로, $Y$의 성분 $Y_1, \dots, Y_n$은 서로 독립이며 $\text{Var}(Y_i) = \lambda_i$입니다. 이 때 $Y$를 주성분(principal components) 벡터라고 부릅니다. 총 변동(Total Variation) $TV(X) = \sum \sigma_i^2 = \sum \lambda_i = TV(Y)$가 보존됩니다. 그리고 $Y_1$ (첫 번째 주성분)은 모든 선형 조합 $a^T(X-\mu)$ 중에서 가장 큰 분산 $\mathbf{\lambda_1}$을 가집니다.

---

### t and f distribution

#### The t distribution

$W$를 $N(0, 1)$ 분포를 따르는 확률 변수, $V$를 $\chi^2(r)$ 분포를 따르는 확률 변수로 정의하고 서로 독립이라고 합니다. 새로운 확률 변수 $T$를 다음과 같이 정의합니다.

$$
\mathbf{T = \frac{W}{\sqrt{V/r}}}
$$

변환 기법을 사용하여 $T$의 pdf $g_1(t)$를 얻을 수 있습니다. $T$의 주변 pdf $g_1(t)$는 $u = v$로 치환하고 적분하여 다음과 같이 유도됩니다.

$$
\mathbf{g_1(t) = \frac{\Gamma[(r + 1)/2]}{\sqrt{\pi r}\Gamma(r/2)} \frac{1}{(1 + t^2/r)^{(r+1)/2}}}
$$

$T$의 분포는 일반적으로 $t$-분포라고 불리며, 오직 모수 $\mathbf{r}$ (카이제곱 분포의 자유도)에 의해 완전히 결정됩니다. $t$-분포의 특징으로 

$\rightarrow$ $g_1(t)$는 $g_1(-t) = g_1(t)$를 만족하므로, $T$의 $\text{pdf}$는 $\mathbf{0}$에 대해 대칭입니다. 따라서 $T$의 중앙값은 $0$입니다.

$\rightarrow$ 유일한 최대값은 $t=0$에서 발생합니다.

$\rightarrow$ 자유도 $r$이 $\mathbf{\infty}$로 접근함에 따라, $t$-분포는 $\mathbf{N(0, 1)}$ 분포로 수렴합니다.

#### The f distribution

$U$와 $V$를 각각 자유도 $r_1$과 $r_2$를 갖는 독립적인 카이제곱 확률 변수라고 합시다. 새로운 확률 변수 $W$를 다음과 같이 정의합니다.

$$
\mathbf{W = \frac{U/r_1}{V/r_2}}
$$

변환 기법을 사용하여 $W$의 pdf $g_1(w)$를 얻을 수 있습니다. $W$의 주변 pdf $g_1(w)$는 다음과 같이 유도됩니다.

$$
\mathbf{g_1(w) = \frac{\Gamma[(r_1+r_2)/2](r_1/r_2)^{r_1/2}}{\Gamma(r_1/2)\Gamma(r_2/2)} \frac{w^{r_1/2-1}}{(1+r_1w/r_2)^{(r_1+r_2)/2}}}
$$

$W$의 분포는 일반적으로 $F$ 분포라고 불립니다. 이 분포는 $\mathbf{r_1}$과 $\mathbf{r_2}$라는 두 모수(각각 분자 자유도와 분모 자유도)에 의해 완전히 결정됩니다. $F$ 분포의 pdf는 오른쪽으로 기울어진(right-skewed) 모양을 가집니다.

#### Student's theorem

위에서 유도된 $t$분포의 따름 정리이며 종종 스튜던트 정리(Student's Theorem)라고 불립니다.

$X_1, \dots, X_n$이 각각 평균 $\mu$, 분산 $\sigma^2$을 갖는 정규 분포에서 추출된 독립항등분포(i.i.d.) 확률 변수라고 할 때 표본 평균 $\mathbf{\bar{X} = \frac{1}{n} \sum_{i=1}^n X_i}$와 표본 분산 $\mathbf{S^2 = \frac{1}{n-1} \sum_{i=1}^n (X_i - \bar{X})^2}$으로 정의됩니다. 이 때 $\bar{X}$의 분포는 $\mathbf{N \left( \mu, \frac{\sigma^2}{n} \right)}$ 분포를 따릅니다. $\mathbf{\bar{X}}$와 $\mathbf{S^2}$는 서로 독립입니다.

---

### 참고 자료

[원본 경로 #1](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)




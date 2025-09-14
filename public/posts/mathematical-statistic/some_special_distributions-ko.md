---
title: 'Some special distributions'
date: '2023-05-08'
tags: ['Mathematical statistics', 'lecture']
---

### the binomial and related distributions

binomial, negative, trinomial, multinormial 4가지에 대해서 알아보겠습니다.

우선 binomial에서 정의는 $(a+b)^n = \sum\limits_{x=0}^n \begin{pmatrix} n \\ x \end{pmatrix} b^xa^{n-x}$입니다. 베르누이 시행은 각 시도의 결과를 예측하지 못하는 연속적인 시행에서의 독립적(ex. 비복원추출)인 성공과 실패의 결과를 뜻하고 $P(X_i = 1) = p$이면서 $P(X_i = 0) = 1-p$ 확률을 갖습니다. $X_i \sim B(n, p)$를 따르는 이 시행의 $E(X_i) = \sum\limits_{X_i=0}^{1} X_if(x_i) = 0*(1-p) + 1*p = p$이고 $Var(X_i) = E(X_i^2) - E^2(X_i) = 0^2(1-p) + 1^2*p - p^2 = p(1-p)$가 됩니다. 그리고 이에 따라 pmf인 $p(x) = \begin{pmatrix} n \\ x \end{pmatrix} p^x(1-p)^{n-x}$로 표현할 수 있게 됩니다. mgf는 $M(t) = E[e^{tX}] = \sum\limits_{x=0}^{n} e^{tx} \begin{pmatrix} n \\ x \end{pmatrix} p^x(1-p)^{n-x} = \sum\limits_{x=0}^{n} \begin{pmatrix} n \\ x \end{pmatrix} (pe^t)^x(1-p)^{n-x} = [(1-p) + pe^t]^n$이 됩니다. mgf에서의 $\mu = M’(0) = np, \sigma^2 = M’’(0) - M’(0)^2 = np(1-p)$입니다.

다음으로 negative binomial에서 정의는 $B(1, p)$ 베르누이 시행에서 Y는 r-th 성공 이전의 실패 개수가 되고 이를 negative binomial로 부르도록 합니다. pmf of Y인 $p(y) = \begin{pmatrix} y+r - 1 \\ r - 1 \end{pmatrix} p^r(1-p)^y$로 표현되며 $Y \sim NB(r, p)$를 따릅니다. mgf $M_y(t) = E[e^{tY}] = \sum\limits_{y=0}^{\infty} e^{ty}\begin{pmatrix} y + r - 1 \\ r - 1 \end{pmatrix} p^r(1-p)^y = p^r\sum\limits_{y=0}^{\infty} \begin{pmatrix} y + r - 1 \\ r - 1 \end{pmatrix} [(1-p)e^t]^y = p^r\{1x^0 + rx + \frac{r(r+1)}{2} x^2 + … \}, (1-p)e^t = x$가 됩니다. taylor expansion을 사용하면 $g(x) = (1-x)^{-r}$로 정의하고 $g(x) = g(0) + (x-0)g’(0) + \frac{1}{2}(x-0)^2g’’(0) + …$에서 $g(0) = 1, g’(x) = -r(1-x)^{-r-1}(-1), g’(0) = r, g’’(0) = r(r+1)$이 되는 것입니다. 여기서 $\mu = \frac{r(1-p)}{p}$이고 $\sigma^2 = \frac{r(1-p)}{p^2}$입니다.
trinomial에서는 $x, y$에 대해서 $f(x, y) = \frac{n!}{x!y!(n-x-y)!} p_1^xp_2^yp_3^{n-x-y}$가 성립합니다. mgf $M_{X, Y}(t_1, t_2) = E[e^{t_1X + t_2Y}] = \sum\limits_{x=0}^{n}\sum\limits_{y=0}^{n-x} e^{t_1x + t_2y} \frac{n!}{x!y!(n-x-y)!}p_1^xp_2^yp_3^{n-x-y} = \sum\limits_{x=0}^{n} \begin{pmatrix} n \\ x \end{pmatrix} (p_1e^{t_1})^x \sum\limits_{y=0}^{n-x} \begin{pmatrix} n-x \\ y \end{pmatrix} (p_2e^{t_2})^y p_3^{n-x-y} = \sum\limits_{x=0}^{n} \begin{pmatrix} n \\ x \end{pmatrix} (p_1e^{t_1})^x (p_2e^{t_2} + p_3)^{n-x} = (p_1e^{t_1} + p_2e^{t_2} + p_3e^{t_3})^n$이라고 정의가 됩니다. 이제 marginal pmf $f_X(x) = \sum\limits_{y=0}^{n-x} f_{X, Y}(x, y) = \sum\limits_{y=0}^{n-x} \frac{n!}{x!y!(n-x-y)!} p_1^xp_2^y(1-p_1-p_2)^{n-x-y} = \frac{n!}{x!(n-x)!}p_1^x \sum\limits_{y=0}^{n-x} \frac{(n-x)!}{y!(n-x-y)!}p_2^y(1-p_1-p_2)^{n-x-y} = \frac{n!}{x!(n-x)!}p_1^x(1-p_1)^{n-x}$로 정의가 됩니다. 이를 통해 $X \sim B(n, p_1)$이고 $Y \sim B(n, p_2)$임을 알 수 있습니다. conditional pmf에서 X가 given일 때 Y에 대해서 보이면 $f_{Y|X}(y|x) = \frac{f_{X, Y}(x, y)}{f_X(x)} = \frac{\frac{n!}{x!y!(n-x-y)!}p_1^xp_2^y(1-p_1-p_2)^{n-x-y}}{\frac{n!}{x!(n-x)!}p_1^x(1-p_1)^y} = \frac{(n-x)!}{y!(n-x-y)!}*\frac{p_2^y(1-p_1-p_2)^{n-x-y}}{(1-p_1)^{n-x-y+y}} = \begin{pmatrix} n-x \\ y \end{pmatrix} \begin{pmatrix} \frac{p_2}{1-p_1} \end{pmatrix}^y \begin{pmatrix} 1-\frac{p_2}{1-p_1} \end{pmatrix}^{n-x-y}$ 이 되어서 $\sim B(n-x, \frac{p_2}{1-p_1})$을 따릅니다.

마지막으로 multinomial에서는 pmf가 $f(x_1, …, x_{k-1}) = \frac{n!}{x_1!x_2!…x_k!}p_1^{x_1}p_2^{x_2}…p_k^{x_k}$로 표현이 되고 mgf 역시 $M(t_1, …, t_{k-1}) = (p_1e^{t_1} + … p_{k-1}e^{t_{k_1}} + p_k)^n$으로 정의 됩니다.

---

### the poisson distribution

taylor expansion에 의해 $g(m)$을 $m = 0$에서  $\sum\limits_{x=0}^{\infty} \frac{m^x}{x!} = e^m$으로 정의하여 이를 통해 poisson pmf $p(x) = \frac{e^{-m}m^x}{x!}$로 나타낼 수 있게 됩니다. mgf는 $M(t) = E{e^{tX}} = \sum\limits_{x=0}^{\infty} e^{tx}\frac{e^{-m}m^x}{x!} = e^{m}\sum\limits_{x=0}^{\infty} \frac{(me^t)^x}{x!} = exp[m(e^t-1)]$로 나타낼 수 있습니다. 따라서 $\mu = M’(0) = m, \sigma^2 = M’’(0) - M’^2(0) = m$이 됩니다.

---

### the $\gamma, \chi, \beta$ distributions

우선 $\gamma$ distribution을 설명하면 $\gamma$ function $\gamma(\alpha) = \int\limits_{0}^{\infty} y^{\alpha - 1}e^{-y} \,dy$ ($\alpha > 0$) 이고 이 분포의 성질로는 $\alpha > 1$이면 $\gamma(\alpha) = (\alpha - 1)\gamma(\alpha - 1)$ 이라는 점과 $\alpha$가 양의 정수일 때 $\gamma(\alpha) = (\alpha - 1)!$이라는 점, $\gamma(\frac{1}{2}) = \sqrt(\pi)$라는 점입니다.

pdf는 $X \sim \gamma(\alpha, \beta)$를 따르고 $y = \frac{x}{\beta}$라고 할 때 $f(x) = \int\limits_{0}^{\infty} \begin{pmatrix} \frac{x}{\beta} \end{pmatrix}^{\alpha - 1} e^{-\frac{x}{\beta}} \frac{1}{\beta} \,dx$로 정의하면 $1 = \int\limits_{0}^{\infty} \frac{x^{\alpha - 1}e^{-\frac{x}{\beta}}}{\gamma(\alpha)\beta^{\alpha}} \,dx$가 됩니다. 이제 mgf는 $M(t) = \int\limits_{0}^{\infty} e^{tx} \frac{x^{\alpha - 1}e^{-\frac{x}{\beta}}}{\gamma(\alpha)\beta^{\alpha}} \,dx = \int\limits_{0}^{\infty} \frac{x^{\alpha - 1}e^{-x(-t+\frac{1}{\beta})}}{\gamma(\alpha)\beta^{\alpha}} \,dx = \int\limits_{0}^{\infty} \frac{\gamma(\alpha)(\frac{\beta}{1-t\beta})}{\gamma(\alpha)\beta^{\alpha}} \frac{x^{\alpha - 1}e^{-x/\frac{\beta}{1-t\beta}}}{\gamma(\alpha) (\frac{\beta}{1-t\beta})^{\alpha}} \, dx = (1-t\beta)^{-\alpha}$가 됩니다. 따라서 $\mu = \alpha\beta, \sigma^2 = \alpha\beta^2$이 됩니다. 특성으로는 $\beta$값은 변하지 않고 $\alpha$값만 달라질 수 있다는 점으로 독립시행의 합에 대한 mgf는 $M_y(t) = (1-t\beta)^{\sum a_i}$로 나타낼 수 있습니다.

다음으로 $\chi^2$ distribution은 만약 $X \sim \gamma(\frac{r}{2}, 2)$를 만족하면 $X \sim \gamma^2(r)$을 만족하게 됩니다. 이 분포의 pdf $f(x) = \frac{x^{\frac{r}{2} - 1}e^{-\frac{r}{2}}}{\gamma(\frac{r}{2})2^{\frac{r}{2}}}$로 정의됩니다. mgf $M(t) = (1-2t)^{-\frac{r}{2}}$로 $\mu = r, \sigma^2 = 2r$이 됩니다.

마지막 $\beta$ distribution은 pdf $f(x) = \frac{\gamma(\alpha + \beta)}{\gamma(\alpha)\gamma(\beta)}x^{\alpha - 1}(1-x)^{\beta - 1}$로 $X \sim Beta(\alpha, \beta)$를 따릅니다. $E(x) = \int\limits_{0}^{1} x*\frac{\gamma(\alpha + \beta)}{\gamma(\alpha)\gamma(\beta)}x^{\alpha - 1}(1-x)^{\beta - 1} \,dx = \frac{\alpha}{\alpha + \beta}$가 되고 $Var(x) = \frac{\alpha\beta}{(\alpha + \beta + 1)(\alpha + \beta)^2}$가 됩니다.

---

### the normal distribution

우선 $I = \int\limits_{-\infty}^{\infty} e^{-\frac{y^2}{2}} \, dy$를 계산하기 위해서 양변에 제곱을 취하면 $I^2 = \int\limits_{-\infty}^{\infty} e^{-\frac{y^2}{2}} \,dy \int\limits_{-\infty}^{\infty} e^{-\frac{z^2}{2}} \,dz = \int\limits_{-\infty}^{\infty}\int\limits_{-\infty}^{\infty} e^{-\frac{y^2+z^2}{2}} \,dydz$로 표현이 됩니다. 이 때 $y = rcos\theta, z = rsin\theta$를 사용하면 야코비언 행렬 $J = \begin{vmatrix} \frac{dy}{dr} & \frac{dy}{d\theta} \\ \frac{dz}{dr} & \frac{dz}{d\theta} \end{vmatrix} = \begin{vmatrix} cos\theta & -rsin\theta \\ sin\theta & rcos\theta \end{vmatrix} = r$이 됩니다.

따라서 $\int\int e^{-\frac{r^2}{2}}*rdrd\theta = \int\limits_{0}^{2\pi} [-e^{-\frac{r^2}{2}}]_{0}^{\infty}d\theta = \int\limits_{0}^{2\pi}Id\theta = 2\pi$가 되어 $I=\sqrt{2\pi}$라고 계산이 됩니다. 그리고 $1 = \int \frac{1}{\sqrt{2\pi}}e^{-\frac{y^2}{2}}\,dy$와 $y = \frac{x-\mu}{\sigma}$를 이용하면 $1 = \int\limits_{-\infty}^{\infty} \frac{1}{\sqrt{2\pi}\sigma}exp[-\frac{(x-\mu)^2}{2\sigma^2}]\,dx$로 정리가 될 수 있습니다.

contaminated normals의 구조를 뜯어보면 $Z \sim N(0, 1), I_{\epsilon} \sim B(1, 1-\epsilon)$이고 이 둘은 서로 독립일 때 $W = I_{\epsilon}Z + (1-I_{\epsilon})\sigma_{c}Z$의 pdf를 구하고자 할 때 $F_W(w) = P(W ≤ w) = P(W ≤ w, I_{\epsilon} = 1) + P(W ≤ w, I_{\epsilon} = 0) = P(W ≤ w|I_{\epsilon} = 1)P(I_{\epsilon} = 1) + P(W ≤ w|I_{\epsilon} = 0)P(I_{\epsilon} = 0) = (1-\epsilon)P(Z ≤ w) + \epsilon P(Z ≤ \frac{w}{\sigma_{c}}) = (1-\epsilon)\phi(w) + \epsilon\phi(\frac{w}{\sigma_{c}})$로 표현이 되므로 $f_W(w) = (1-\epsilon)\phi(w) + \frac{\epsilon}{\sigma_c}\phi(\frac{w}{\sigma_c})$로 구해질 수 있습니다.

---

### the multivariate normal distribution

standard normal case에서는 $Z = (z_1, …, z_n)’$, $Z_i \sim N(0, 1)$을 따르는 Z 집합은 독립이고 pdf $f(z) = \prod\limits_{i=1}^{n} f(Z_i) = \prod\limits_{i=1}^{n}(2\pi)^{-\frac{1}{2}}exp[-\frac{1}{2}z_i^2] = (2\pi)^{-\frac{n}{2}}exp(-\frac{1}{2}\sum\limits_{i=1}^{n}z_i^2) = (2\pi)^{-\frac{n}{2}}exp(-\frac{1}{2}z'z)$이 됩니다.

spectral decomposition은 임의의 A 행렬이 $n*n$ symmetric matrix이면서 $\exists$ orthogonal matrix인 $\Gamma$와 diagonal matrix인 $\Lambda$가 있을 때 $\Lambda = diag(\lambda_1, …, \lambda_n)$이고 A 행렬의 eigenvalues인 $\lambda_1 ≥ \lambda_2≥ … ≥ \lambda_n > 0$을 만족합니다. 결국 A 행렬은 $\Gamma’ \Lambda \Gamma$로 decompose됩니다.

general normal case에서는 $\sum$ 을 $n*n$ symmetric matrix로 하고 spectral decomposition을 이용하여 $\sum = \Gamma’ \Lambda \Gamma$로 정의하면 $\Lambda^{\frac{1}{2}} = diag(\sqrt{\lambda_1}, …, \sqrt{\lambda_n})$일 때 $\sum = \Gamma \Lambda^{\frac{1}{2}} \Lambda^{\frac{1}{2}} \Gamma = \Gamma \Lambda^{\frac{1}{2}} \Gamma \Gamma’ \Lambda^{\frac{1}{2}} \Gamma = \sum^{\frac{1}{2}}\sum^{\frac{1}{2}}$로 분해가 되며 $Z \sim N_n(0, I_n)$을 따를 때 $X = \sum^{\frac{1}{2}}Z + \mu$를 통해서 $Z = \sum^{-\frac{1}{2}}(X - \mu)$로 야코비언 행렬 J $= \begin{vmatrix} \frac{dz}{dx}\end{vmatrix} = |\sum|^{-\frac{1}{2}}$가 됩니다. 이를 사용해서 pdf를 구하면 $f(x) = g(\sum^{-\frac{1}{2}}(X-\mu))|J| = (2\pi)^{-\frac{n}{2}}exp[-\frac{1}{2}(\sum^{-\frac{1}{2}}(X-\mu))’(\sum^{-\frac{1}{2}}(X-\mu))]|\sum|^{-\frac{1}{2}}$이 됩니다.

linear transformation에서 $X \sim N_n(\mu, \sum)$을 따르면서 $Y = AX + b \sim N_m(A\mu+b, A\sum A’)$를 따르는 X, Y가 있을 때 $M_X(t) = exp[t’\mu + \frac{1}{2}t’\sum t]$을 이용하면 $M_Y(t) = exp[t’(A\mu+b) + \frac{1}{2}t’A\sum A’t]$임을 보일 수 있습니다.

---

### t and f distribution

우선 t 분포를 살펴보면 $W \sim N(0, 1)$, $V \sim \chi^2(r)$을 따르는 W, V는 독립일 때 $T = \frac{W}{\sqrt{\frac{V}{r}}}$로 정의가 가능하고 이 때 자유도는 r을 가집니다. pdf를 정의하기 위해 $(w, v) \rightarrow (t, u)$를 따른다면 $t = \frac{w}{\sqrt{\frac{v}{r}}}, u = v$가 되어 야코비언 행렬 $J = \begin{vmatrix} \frac{dw}{dt} & \frac{dw}{du} \\ \frac{dv}{dt} & \frac{dv}{du} \end{vmatrix} = \frac{\sqrt{u}}{\sqrt{r}}$가 구해집니다. $f(w, v) = \frac{1}{\sqrt{2\pi}} e^{-\frac{w^2}{2}} \frac{v^{\frac{r}{2} - 1}e^{-\frac{v}{2}}}{\gamma(\frac{r}{2})2^{\frac{r}{2}}}$가 구해지고 관점을 $(t, u)$로 바꾸게 되면 $g(t, u) = f(\frac{t\sqrt{u}}{\sqrt{r}}, u)|J| = \frac{1}{\sqrt{2\pi}\gamma(\frac{r}{2})2^{\frac{r}{2}}} exp(-\frac{t^2u}{2r})u^{\frac{r}{2} - 1}e^{-\frac{u}{2}}\frac{u^{\frac{1}{2}}}{r^{\frac{1}{2}}}$이라고 할 수 있습니다. 이 때 $E(T) = E[\frac{W}{\sqrt{V/r}}] = E(W)E(\frac{1}{\sqrt{V/r}}) = 0$이 되고 $Var(T) = E(T^2) - E^2(T) = E(T^2) = E(\frac{W^2}{V/r}) = E(W^2)E(\frac{r}{v})인데 E(W^2) = Var(w) + E^2(W) = Var(w) = 1$이고 $E(\frac{r}{v}) = rE(V^{-1}) = r\int\limits_{0}^{\infty} v^{-1} \frac{v^{\frac{r}{2}-1}e^{-\frac{v}{2}}}{\gamma(\frac{r}{2})2^{\frac{r}{2}}} \,dv = r\int\limits_{0}^{\infty} \frac{\gamma(\frac{r}{2} + 1)2^{\frac{r}{2}+1}}{\gamma(\frac{r}{2})2^{\frac{r}{2}}} \frac{v^{\frac{r}{2}+1-1}e^{-\frac{v}{2}}}{\gamma(\frac{r}{2}+1)2^{\frac{r+2}{2}}} = r/(r-2) > 1$이 성립합니다.

다음으로 f 분포를 살펴보면 $U \sim \chi^2(r_1)$, $V \sim \chi^2(r_2)$를 따르는 $U, V$가 독립이면 $W = \frac{U/r_1}{V/r_2}$로 정의됩니다. 이 때 $(u, v) = (w, z)$를 따른다면 $w = \frac{u/r_1}{v/r_2}, z = v$라고 할 수 있습니다. inverse function으로 $u = \frac{r_1}{r_2}wz$, $v = z$로 볼 수 있고 야코비언 행렬 $J = \begin{vmatrix} \frac{du}{dw} & \frac{du}{dz} \\ \frac{dv}{dw} & \frac{dv}{dz} \end{vmatrix} = \frac{r_1}{r_2}z$가 됩니다.

이제 pdf를 구하면 $f(u, v) = f_U(u)f_V(v) = \frac{u^{\frac{r_1}{2} - 1}e^{-\frac{u}{2}}v^{\frac{r_1}{2}-1}e^{-\frac{v}{2}}}{\gamma(\frac{r_1}{2})2^{\frac{r_1}{2}}\gamma(\frac{r_2}{2})2^{\frac{r_2}{2}}}$을 만족합니다. 평균 $E(F) = \frac{r_2}{r_1}E(\frac{U}{V}) = \frac{r_2}{r_1}E(U)E(V^{-1}) = \frac{r_2}{r_1}r_1\frac{1}{r_2-2} = \frac{r_2}{r_2-2}$로 구해집니다. $Var(F) = E(W^2) - E^2(W) = \frac{r_2^2}{r_1^2}E(U^2)E(V^{-2}) - E^2(W) = \frac{r_2^2}{r_1^2}(r_1^2 + 2r_1)(\frac{r(\frac{r_2}{2}-2)}{r(\frac{r_2}{2})2^2}) - (\frac{r_2}{r_2-2})^2 = r_2^2\frac{2(r_1+r_2-2)}{r_1(r_2-2)^2(r_2-4)}$가 됩니다.

t분포를 제곱하게 되면 $(\frac{z}{\sqrt{v/r}})^2 = \frac{z^2/1}{v/r} \sim F(1, r)$형태가 됩니다.

마지막으로 student’s 이론은 $X_1, …, X_n$이 iid를 만족하고 $N(\mu, \sigma^2)$을 따를 때 $\bar{X} \sim N(\mu, \frac{\sigma^2}{n})$이고 $\bar{X}$와 표준편차 $s$는 독립관계라고 합니다. $\frac{\sum(X - \bar{X})^2}{\sigma^2} = \frac{(n-1)s^2}{sigma^2} \sim \chi^2(n-1)$을 따릅니다. 그리고 $\frac{\bar{X} - \mu}{\frac{s}{\sqrt{n}}} \sim t(n-1)$을 따릅니다. 이것을 차례대로 증명해보면 우선 $X = (X_1, …, X_n)’, 1= (1, …, 1)’$이고 $a = \frac{1}{n}1 = (\frac{1}{n}, …, \frac{1}{n})$을 만족하게 되고 $a’X \sim N(a’(\mu_1), a’\sum a)$를 통해 $X \sim N_n(\mu_1, \sum)$이라고 할 수 있습니다. 여기서 $\mu_1 = (\mu_1I, …, \mu_nI), \sum = \sigma^2I$를 나타내는 것으로 결국 $\bar{X} = N(\mu, \sigma^2/n)$이 되게 됩니다.

두번째로 독립관계를 알아보기 위해 $Y = (X_1-\bar{X}, …, X_n-\bar{X)}’$이고 $W = \begin{pmatrix} \bar{X} \\ Y \end{pmatrix} = \begin{pmatrix} \frac{1}{n}1 \\ I - 1\frac{1}{n}1’ \end{pmatrix}X = AX$라고 할 때 만약 두 변수가 독립이면 공분산이 0이 되는 이론을 이용하기 위한 수식풀이로 아래와 같이 전개하면 $Cov(W) = Cov\begin{pmatrix} \bar{X} \\ Y \end{pmatrix} = \begin{pmatrix} Var(\bar{X}) & Cov(\bar{X}, Y) \\ Cov(Y, \bar{X}) & Cov(Y) \end{pmatrix}$가 되어 $ACovA’ = \begin{pmatrix} \frac{1}{n}1 \\ I - 1\frac{1}{n}1’ \end{pmatrix}X\sigma^2I(\frac{1}{n}1 I-1\frac{1}{n}1’) = \sigma^2 \begin{pmatrix} \frac{1}{n} & 0 \\ 0 & I - 1\frac{1}{n}1’ \end{pmatrix}$로 공분산이 0임이 구해집니다.

---

### 참고 자료

[원본 경로 #1](http://www.kocw.net/home/cview.do?cid=7c789810ade43386)

[원본 경로 #2](http://www.kocw.net/home/search/kemView.do?kemId=1390551)



---
title: 'Some special distributions'
date: '2023-05-08'
tags: ['Mathematical statistics', 'lecture']
---

### the binomial and related distributions

We will examine four distributions: binomial, negative binomial, trinomial, and multinomial.

First, in the binomial distribution, the definition is $(a+b)^n = \sum\limits_{x=0}^n \begin{pmatrix} n \\ x \end{pmatrix} b^xa^{n-x}$. A Bernoulli trial refers to independent outcomes of success and failure in continuous trials where the result of each attempt cannot be predicted (e.g., sampling without replacement), with $P(X_i = 1) = p$ and $P(X_i = 0) = 1-p$ probabilities. For this trial following $X_i \sim B(n, p)$, $E(X_i) = \sum\limits_{X_i=0}^{1} X_if(x_i) = 0*(1-p) + 1*p = p$ and $Var(X_i) = E(X_i^2) - E^2(X_i) = 0^2(1-p) + 1^2*p - p^2 = p(1-p)$. Accordingly, the pmf can be expressed as $p(x) = \begin{pmatrix} n \\ x \end{pmatrix} p^x(1-p)^{n-x}$. The mgf is $M(t) = E[e^{tX}] = \sum\limits_{x=0}^{n} e^{tx} \begin{pmatrix} n \\ x \end{pmatrix} p^x(1-p)^{n-x} = \sum\limits_{x=0}^{n} \begin{pmatrix} n \\ x \end{pmatrix} (pe^t)^x(1-p)^{n-x} = [(1-p) + pe^t]^n$. From the mgf, $\mu = M'(0) = np, \sigma^2 = M''(0) - M'(0)^2 = np(1-p)$.

Next, in the negative binomial distribution, the definition is that in $B(1, p)$ Bernoulli trials, Y is the number of failures before the r-th success, and this is called the negative binomial. The pmf of Y is expressed as $p(y) = \begin{pmatrix} y+r - 1 \\ r - 1 \end{pmatrix} p^r(1-p)^y$ and follows $Y \sim NB(r, p)$. The mgf $M_y(t) = E[e^{tY}] = \sum\limits_{y=0}^{\infty} e^{ty}\begin{pmatrix} y + r - 1 \\ r - 1 \end{pmatrix} p^r(1-p)^y = p^r\sum\limits_{y=0}^{\infty} \begin{pmatrix} y + r - 1 \\ r - 1 \end{pmatrix} [(1-p)e^t]^y = p^r\{1x^0 + rx + \frac{r(r+1)}{2} x^2 + … \}, (1-p)e^t = x$. Using Taylor expansion, defining $g(x) = (1-x)^{-r}$ and $g(x) = g(0) + (x-0)g'(0) + \frac{1}{2}(x-0)^2g''(0) + …$, we get $g(0) = 1, g'(x) = -r(1-x)^{-r-1}(-1), g'(0) = r, g''(0) = r(r+1)$. Here, $\mu = \frac{r(1-p)}{p}$ and $\sigma^2 = \frac{r(1-p)}{p^2}$.

In the trinomial distribution, for $x, y$, $f(x, y) = \frac{n!}{x!y!(n-x-y)!} p_1^xp_2^yp_3^{n-x-y}$ holds. The mgf $M_{X, Y}(t_1, t_2) = E[e^{t_1X + t_2Y}] = \sum\limits_{x=0}^{n}\sum\limits_{y=0}^{n-x} e^{t_1x + t_2y} \frac{n!}{x!y!(n-x-y)!}p_1^xp_2^yp_3^{n-x-y} = \sum\limits_{x=0}^{n} \begin{pmatrix} n \\ x \end{pmatrix} (p_1e^{t_1})^x \sum\limits_{y=0}^{n-x} \begin{pmatrix} n-x \\ y \end{pmatrix} (p_2e^{t_2})^y p_3^{n-x-y} = \sum\limits_{x=0}^{n} \begin{pmatrix} n \\ x \end{pmatrix} (p_1e^{t_1})^x (p_2e^{t_2} + p_3)^{n-x} = (p_1e^{t_1} + p_2e^{t_2} + p_3e^{t_3})^n$. Now the marginal pmf $f_X(x) = \sum\limits_{y=0}^{n-x} f_{X, Y}(x, y) = \sum\limits_{y=0}^{n-x} \frac{n!}{x!y!(n-x-y)!} p_1^xp_2^y(1-p_1-p_2)^{n-x-y} = \frac{n!}{x!(n-x)!}p_1^x \sum\limits_{y=0}^{n-x} \frac{(n-x)!}{y!(n-x-y)!}p_2^y(1-p_1-p_2)^{n-x-y} = \frac{n!}{x!(n-x)!}p_1^x(1-p_1)^{n-x}$. Through this, we can see that $X \sim B(n, p_1)$ and $Y \sim B(n, p_2)$. In the conditional pmf, when X is given for Y, $f_{Y|X}(y|x) = \frac{f_{X, Y}(x, y)}{f_X(x)} = \frac{\frac{n!}{x!y!(n-x-y)!}p_1^xp_2^y(1-p_1-p_2)^{n-x-y}}{\frac{n!}{x!(n-x)!}p_1^x(1-p_1)^y} = \frac{(n-x)!}{y!(n-x-y)!}*\frac{p_2^y(1-p_1-p_2)^{n-x-y}}{(1-p_1)^{n-x-y+y}} = \begin{pmatrix} n-x \\ y \end{pmatrix} \begin{pmatrix} \frac{p_2}{1-p_1} \end{pmatrix}^y \begin{pmatrix} 1-\frac{p_2}{1-p_1} \end{pmatrix}^{n-x-y}$, which follows $\sim B(n-x, \frac{p_2}{1-p_1})$.

Finally, in the multinomial distribution, the pmf is expressed as $f(x_1, …, x_{k-1}) = \frac{n!}{x_1!x_2!…x_k!}p_1^{x_1}p_2^{x_2}…p_k^{x_k}$ and the mgf is also defined as $M(t_1, …, t_{k-1}) = (p_1e^{t_1} + … p_{k-1}e^{t_{k_1}} + p_k)^n$.

---

### the poisson distribution

By Taylor expansion, defining $g(m)$ at $m = 0$ as $\sum\limits_{x=0}^{\infty} \frac{m^x}{x!} = e^m$, through this, the Poisson pmf can be expressed as $p(x) = \frac{e^{-m}m^x}{x!}$. The mgf is $M(t) = E{e^{tX}} = \sum\limits_{x=0}^{\infty} e^{tx}\frac{e^{-m}m^x}{x!} = e^{m}\sum\limits_{x=0}^{\infty} \frac{(me^t)^x}{x!} = exp[m(e^t-1)]$. Therefore, $\mu = M'(0) = m, \sigma^2 = M''(0) - M'^2(0) = m$.

---

### the $\gamma, \chi, \beta$ distributions

First, explaining the $\gamma$ distribution, the $\gamma$ function is $\gamma(\alpha) = \int\limits_{0}^{\infty} y^{\alpha - 1}e^{-y} \,dy$ ($\alpha > 0$), and properties of this distribution include: if $\alpha > 1$, then $\gamma(\alpha) = (\alpha - 1)\gamma(\alpha - 1)$; when $\alpha$ is a positive integer, $\gamma(\alpha) = (\alpha - 1)!$; and $\gamma(\frac{1}{2}) = \sqrt(\pi)$.

The pdf follows $X \sim \gamma(\alpha, \beta)$ and when $y = \frac{x}{\beta}$, defining $f(x) = \int\limits_{0}^{\infty} \begin{pmatrix} \frac{x}{\beta} \end{pmatrix}^{\alpha - 1} e^{-\frac{x}{\beta}} \frac{1}{\beta} \,dx$, we get $1 = \int\limits_{0}^{\infty} \frac{x^{\alpha - 1}e^{-\frac{x}{\beta}}}{\gamma(\alpha)\beta^{\alpha}} \,dx$. Now the mgf is $M(t) = \int\limits_{0}^{\infty} e^{tx} \frac{x^{\alpha - 1}e^{-\frac{x}{\beta}}}{\gamma(\alpha)\beta^{\alpha}} \,dx = \int\limits_{0}^{\infty} \frac{x^{\alpha - 1}e^{-x(-t+\frac{1}{\beta})}}{\gamma(\alpha)\beta^{\alpha}} \,dx = \int\limits_{0}^{\infty} \frac{\gamma(\alpha)(\frac{\beta}{1-t\beta})}{\gamma(\alpha)\beta^{\alpha}} \frac{x^{\alpha - 1}e^{-x/\frac{\beta}{1-t\beta}}}{\gamma(\alpha) (\frac{\beta}{1-t\beta})^{\alpha}} \, dx = (1-t\beta)^{-\alpha}$. Therefore, $\mu = \alpha\beta, \sigma^2 = \alpha\beta^2$. A characteristic is that the $\beta$ value remains unchanged and only the $\alpha$ value can vary, so the mgf for the sum of independent trials is $M_y(t) = (1-t\beta)^{\sum a_i}$.

Next, the $\chi^2$ distribution: if $X \sim \gamma(\frac{r}{2}, 2)$ is satisfied, then $X \sim \gamma^2(r)$ is satisfied. The pdf of this distribution is defined as $f(x) = \frac{x^{\frac{r}{2} - 1}e^{-\frac{r}{2}}}{\gamma(\frac{r}{2})2^{\frac{r}{2}}}$. The mgf is $M(t) = (1-2t)^{-\frac{r}{2}}$, so $\mu = r, \sigma^2 = 2r$.

Finally, the $\beta$ distribution has pdf $f(x) = \frac{\gamma(\alpha + \beta)}{\gamma(\alpha)\gamma(\beta)}x^{\alpha - 1}(1-x)^{\beta - 1}$ and follows $X \sim Beta(\alpha, \beta)$. $E(x) = \int\limits_{0}^{1} x*\frac{\gamma(\alpha + \beta)}{\gamma(\alpha)\gamma(\beta)}x^{\alpha - 1}(1-x)^{\beta - 1} \,dx = \frac{\alpha}{\alpha + \beta}$ and $Var(x) = \frac{\alpha\beta}{(\alpha + \beta + 1)(\alpha + \beta)^2}$.

---

### the normal distribution

First, to calculate $I = \int\limits_{-\infty}^{\infty} e^{-\frac{y^2}{2}} \, dy$, squaring both sides gives $I^2 = \int\limits_{-\infty}^{\infty} e^{-\frac{y^2}{2}} \,dy \int\limits_{-\infty}^{\infty} e^{-\frac{z^2}{2}} \,dz = \int\limits_{-\infty}^{\infty}\int\limits_{-\infty}^{\infty} e^{-\frac{y^2+z^2}{2}} \,dydz$. At this point, using $y = rcos\theta, z = rsin\theta$, the Jacobian matrix $J = \begin{vmatrix} \frac{dy}{dr} & \frac{dy}{d\theta} \\ \frac{dz}{dr} & \frac{dz}{d\theta} \end{vmatrix} = \begin{vmatrix} cos\theta & -rsin\theta \\ sin\theta & rcos\theta \end{vmatrix} = r$.

Therefore, $\int\int e^{-\frac{r^2}{2}}*rdrd\theta = \int\limits_{0}^{2\pi} [-e^{-\frac{r^2}{2}}]_{0}^{\infty}d\theta = \int\limits_{0}^{2\pi}Id\theta = 2\pi$, so $I=\sqrt{2\pi}$. Using $1 = \int \frac{1}{\sqrt{2\pi}}e^{-\frac{y^2}{2}}\,dy$ and $y = \frac{x-\mu}{\sigma}$, we get $1 = \int\limits_{-\infty}^{\infty} \frac{1}{\sqrt{2\pi}\sigma}exp[-\frac{(x-\mu)^2}{2\sigma^2}]\,dx$.

Examining the structure of contaminated normals: $Z \sim N(0, 1), I_{\epsilon} \sim B(1, 1-\epsilon)$ and these two are independent when $W = I_{\epsilon}Z + (1-I_{\epsilon})\sigma_{c}Z$. To find the pdf of W, $F_W(w) = P(W ≤ w) = P(W ≤ w, I_{\epsilon} = 1) + P(W ≤ w, I_{\epsilon} = 0) = P(W ≤ w|I_{\epsilon} = 1)P(I_{\epsilon} = 1) + P(W ≤ w|I_{\epsilon} = 0)P(I_{\epsilon} = 0) = (1-\epsilon)P(Z ≤ w) + \epsilon P(Z ≤ \frac{w}{\sigma_{c}}) = (1-\epsilon)\phi(w) + \epsilon\phi(\frac{w}{\sigma_{c}})$, so $f_W(w) = (1-\epsilon)\phi(w) + \frac{\epsilon}{\sigma_c}\phi(\frac{w}{\sigma_c})$.

---

### the multivariate normal distribution

In the standard normal case, $Z = (z_1, …, z_n)'$, the set Z where $Z_i \sim N(0, 1)$ is independent, and the pdf is $f(z) = \prod\limits_{i=1}^{n} f(Z_i) = \prod\limits_{i=1}^{n}(2\pi)^{-\frac{1}{2}}exp[-\frac{1}{2}z_i^2] = (2\pi)^{-\frac{n}{2}}exp(-\frac{1}{2}\sum\limits_{i=1}^{n}z_i^2) = (2\pi)^{-\frac{n}{2}}exp(-\frac{1}{2}z'z)$.

Spectral decomposition: when an arbitrary matrix A is an $n*n$ symmetric matrix and there exists an orthogonal matrix $\Gamma$ and a diagonal matrix $\Lambda$ such that $\Lambda = diag(\lambda_1, …, \lambda_n)$ and the eigenvalues $\lambda_1 ≥ \lambda_2≥ … ≥ \lambda_n > 0$ of matrix A are satisfied. Ultimately, matrix A is decomposed as $\Gamma' \Lambda \Gamma$.

In the general normal case, letting $\sum$ be an $n*n$ symmetric matrix and using spectral decomposition to define $\sum = \Gamma' \Lambda \Gamma$, when $\Lambda^{\frac{1}{2}} = diag(\sqrt{\lambda_1}, …, \sqrt{\lambda_n})$, $\sum = \Gamma \Lambda^{\frac{1}{2}} \Lambda^{\frac{1}{2}} \Gamma = \Gamma \Lambda^{\frac{1}{2}} \Gamma \Gamma' \Lambda^{\frac{1}{2}} \Gamma = \sum^{\frac{1}{2}}\sum^{\frac{1}{2}}$ is decomposed. When $Z \sim N_n(0, I_n)$, through $X = \sum^{\frac{1}{2}}Z + \mu$, $Z = \sum^{-\frac{1}{2}}(X - \mu)$, and the Jacobian matrix J $= \begin{vmatrix} \frac{dz}{dx}\end{vmatrix} = |\sum|^{-\frac{1}{2}}$. Using this to find the pdf, $f(x) = g(\sum^{-\frac{1}{2}}(X-\mu))|J| = (2\pi)^{-\frac{n}{2}}exp[-\frac{1}{2}(\sum^{-\frac{1}{2}}(X-\mu))'(\sum^{-\frac{1}{2}}(X-\mu))]|\sum|^{-\frac{1}{2}}$.

In linear transformation, when $X \sim N_n(\mu, \sum)$ and $Y = AX + b \sim N_m(A\mu+b, A\sum A')$ for X, Y, using $M_X(t) = exp[t'\mu + \frac{1}{2}t'\sum t]$, we can show that $M_Y(t) = exp[t'(A\mu+b) + \frac{1}{2}t'A\sum A't]$.

---

### t and f distribution

First, examining the t distribution: when $W \sim N(0, 1)$, $V \sim \chi^2(r)$ are independent, $T = \frac{W}{\sqrt{\frac{V}{r}}}$ can be defined, and the degrees of freedom is r. To define the pdf, following $(w, v) \rightarrow (t, u)$, $t = \frac{w}{\sqrt{\frac{v}{r}}}, u = v$, so the Jacobian matrix $J = \begin{vmatrix} \frac{dw}{dt} & \frac{dw}{du} \\ \frac{dv}{dt} & \frac{dv}{du} \end{vmatrix} = \frac{\sqrt{u}}{\sqrt{r}}$ is obtained. $f(w, v) = \frac{1}{\sqrt{2\pi}} e^{-\frac{w^2}{2}} \frac{v^{\frac{r}{2} - 1}e^{-\frac{v}{2}}}{\gamma(\frac{r}{2})2^{\frac{r}{2}}}$ is found, and changing the perspective to $(t, u)$, $g(t, u) = f(\frac{t\sqrt{u}}{\sqrt{r}}, u)|J| = \frac{1}{\sqrt{2\pi}\gamma(\frac{r}{2})2^{\frac{r}{2}}} exp(-\frac{t^2u}{2r})u^{\frac{r}{2} - 1}e^{-\frac{u}{2}}\frac{u^{\frac{1}{2}}}{r^{\frac{1}{2}}}$. Here, $E(T) = E[\frac{W}{\sqrt{V/r}}] = E(W)E(\frac{1}{\sqrt{V/r}}) = 0$ and $Var(T) = E(T^2) - E^2(T) = E(T^2) = E(\frac{W^2}{V/r}) = E(W^2)E(\frac{r}{v})$, where $E(W^2) = Var(w) + E^2(W) = Var(w) = 1$ and $E(\frac{r}{v}) = rE(V^{-1}) = r\int\limits_{0}^{\infty} v^{-1} \frac{v^{\frac{r}{2}-1}e^{-\frac{v}{2}}}{\gamma(\frac{r}{2})2^{\frac{r}{2}}} \,dv = r\int\limits_{0}^{\infty} \frac{\gamma(\frac{r}{2} + 1)2^{\frac{r}{2}+1}}{\gamma(\frac{r}{2})2^{\frac{r}{2}}} \frac{v^{\frac{r}{2}+1-1}e^{-\frac{v}{2}}}{\gamma(\frac{r}{2}+1)2^{\frac{r+2}{2}}} = r/(r-2) > 1$ holds.

Next, examining the f distribution: when $U \sim \chi^2(r_1)$, $V \sim \chi^2(r_2)$ are independent, $W = \frac{U/r_1}{V/r_2}$ is defined. Here, following $(u, v) = (w, z)$, $w = \frac{u/r_1}{v/r_2}, z = v$. As inverse functions, $u = \frac{r_1}{r_2}wz$, $v = z$, and the Jacobian matrix $J = \begin{vmatrix} \frac{du}{dw} & \frac{du}{dz} \\ \frac{dv}{dw} & \frac{dv}{dz} \end{vmatrix} = \frac{r_1}{r_2}z$.

Now finding the pdf, $f(u, v) = f_U(u)f_V(v) = \frac{u^{\frac{r_1}{2} - 1}e^{-\frac{u}{2}}v^{\frac{r_1}{2}-1}e^{-\frac{v}{2}}}{\gamma(\frac{r_1}{2})2^{\frac{r_1}{2}}\gamma(\frac{r_2}{2})2^{\frac{r_2}{2}}}$ is satisfied. The mean $E(F) = \frac{r_2}{r_1}E(\frac{U}{V}) = \frac{r_2}{r_1}E(U)E(V^{-1}) = \frac{r_2}{r_1}r_1\frac{1}{r_2-2} = \frac{r_2}{r_2-2}$. $Var(F) = E(W^2) - E^2(W) = \frac{r_2^2}{r_1^2}E(U^2)E(V^{-2}) - E^2(W) = \frac{r_2^2}{r_1^2}(r_1^2 + 2r_1)(\frac{r(\frac{r_2}{2}-2)}{r(\frac{r_2}{2})2^2}) - (\frac{r_2}{r_2-2})^2 = r_2^2\frac{2(r_1+r_2-2)}{r_1(r_2-2)^2(r_2-4)}$.

When the t distribution is squared, $(\frac{z}{\sqrt{v/r}})^2 = \frac{z^2/1}{v/r} \sim F(1, r)$ form is obtained.

Finally, Student's theory states that when $X_1, …, X_n$ satisfy iid and follow $N(\mu, \sigma^2)$, $\bar{X} \sim N(\mu, \frac{\sigma^2}{n})$ and $\bar{X}$ and standard deviation $s$ are independent. $\frac{\sum(X - \bar{X})^2}{\sigma^2} = \frac{(n-1)s^2}{sigma^2} \sim \chi^2(n-1)$. And $\frac{\bar{X} - \mu}{\frac{s}{\sqrt{n}}} \sim t(n-1)$. Proving this step by step: first, $X = (X_1, …, X_n)', 1= (1, …, 1)'$ and $a = \frac{1}{n}1 = (\frac{1}{n}, …, \frac{1}{n})$, and through $a'X \sim N(a'(\mu_1), a'\sum a)$, we can say $X \sim N_n(\mu_1, \sum)$. Here, $\mu_1 = (\mu_1I, …, \mu_nI), \sum = \sigma^2I$ represent, so ultimately $\bar{X} = N(\mu, \sigma^2/n)$.

Second, to examine the independence relationship, when $Y = (X_1-\bar{X}, …, X_n-\bar{X)}'$ and $W = \begin{pmatrix} \bar{X} \\ Y \end{pmatrix} = \begin{pmatrix} \frac{1}{n}1 \\ I - 1\frac{1}{n}1' \end{pmatrix}X = AX$, if two variables are independent, using the theory that covariance becomes 0, the equation development is as follows: $Cov(W) = Cov\begin{pmatrix} \bar{X} \\ Y \end{pmatrix} = \begin{pmatrix} Var(\bar{X}) & Cov(\bar{X}, Y) \\ Cov(Y, \bar{X}) & Cov(Y) \end{pmatrix}$, so $ACovA' = \begin{pmatrix} \frac{1}{n}1 \\ I - 1\frac{1}{n}1' \end{pmatrix}X\sigma^2I(\frac{1}{n}1 I-1\frac{1}{n}1') = \sigma^2 \begin{pmatrix} \frac{1}{n} & 0 \\ 0 & I - 1\frac{1}{n}1' \end{pmatrix}$, showing that the covariance is 0.

---

### References

[Original source #1](http://www.kocw.net/home/cview.do?cid=7c789810ade43386)

[Original source #2](http://www.kocw.net/home/search/kemView.do?kemId=1390551)



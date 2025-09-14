---
title: 'Random variable'
date: '2024-05-06'
tags: ['Probability&Statistics', 'lecture']
---

### Discrete random variable

This refers to cases where probabilities are defined for each outcome. For example, in a dice-rolling experiment the sample space is $S=\{1, 2, 3, 4, 5, 6\}$, and in an experiment of tossing three coins the sample space is $S=\{HHH, HHT, HTH, THH, HTT, THT, TTH, TTT\}$. In this case, we denote each outcome by $\zeta$ (zeta).

A random variable $X$ is a mapping $X : S \rightarrow \mathbb{R}$, and for an outcome $\zeta$ we have $X(\zeta) \in B$.

---

### Probability mass function(PMF)

A PMF is used for discrete variables, while a probability density function (PDF) is used for continuous variables.

The PMF is defined as $P[X=x] \triangleq P_X(x)=P[\{\zeta : X(\zeta)=x\}]$. For example, when $S=\{1, 2, 3, \cdots, 6\}$ and $X=\{1, 2, 3, \cdots, 6\}$, if we draw the PMF, the probability values are on the $y$-axis, so the graph consists of six vertical lines of height $1/6$ at each point on the $x$-axis.

As another example, consider an experiment $A$ whose outcomes are $s$ and $f$ indicating success or failure, and suppose we focus on success $s$. Define the Bernoulli random variable $I_A(\zeta)=\begin{cases} 0 \\ 1 \end{cases}$ as 0 if $\zeta \notin A$ and 1 if $\zeta \in A$.

For this case, $S=\{s,f\}$, $A=\{s\}$, and $X=I_A$. That is, we are checking whether the outcome equals $s$. The PMF has a vertical line of height $1-p$ at $x=0$ and a vertical line of height $p$ at $x=1$.

As another example, suppose we perform a transmission task $A$ that can incur small errors. Then $S=\{0, 1, \cdots, n\}$ and the probability can be defined as $P_X(x)=\begin{pmatrix} n \\ x \end{pmatrix} p^x(1-p)^{n-x}$. The plot is bell-shaped, with larger values near the center, similar to a normal distribution.

---

### Expected value

The expected value of a random variable $X$ is defined as $E[X] \triangleq \sum_{x \in S_X} x \, P_X(x)$.

If the possible outcomes are $s$ and $f$ with $P(f)=1-p$ and $P(s)=p$, then $E[I_A]=\sum_{x \in S_X} x \, P_X(x)=0\cdot(1-p)+1\cdot p=p$.

For three fair coin tosses, the expected number of heads is $E[X]=3\cdot\frac{1}{8}+2\cdot\frac{3}{8}+1\cdot\frac{3}{8}+0\cdot\frac{1}{8}=1.5$.

In general, for a binomial random variable $X\sim\mathrm{Binomial}(n,p)$, $E[X]=np$.

---

### Expectation of function of r.v

For a function $z = g(x)$ where $z, x$ are random variables, we can define $E[z]=\sum_j z_j P_z(z_j)$. However, when using the random variable $x$, this can be transformed to $E[z]=\sum_j z_j \sum_{k:g(x_k)=z_j} P_x(x_k)=\sum_k g(x_k)P_x(x_k)=E[g(x)]$.

For example, this allows us to extract terms like $E[g(x)]=E[ax+b]=aE[x]+b$.

As another example, given $S_x=\{-3, -1, 1, 3\}$ with $P_X(x)=1/4$ and defining $E[z]=\sum_k x_k^2 P_X(x_k)$, the expected value is $(-3)^2*\frac{1}{4} + (-1)^2*\frac{1}{4} + 1^2*\frac{1}{4} + 3^2*\frac{1}{4}=5$.

---

### Variance

Variance is a measure that describes the distribution of a random variable. It can be calculated as $Var(X)=E[(X-E[x])^2]$. In other words, it estimates the average of the squared differences between random values of $X$ and their mean. This formula can be simplified by expanding the square: $E[X^2-2mxX+(mx)^2]=E[X^2]-(mx)^2=E[X^2]-(E[X])^2$.

Some properties include $Var(X+c)=Var(X)$ and $Var(cX)=c^2Var(X)$.

Like the expected value, variance also has a simple form for binomial random variables: $Var[X]=npq$ where $q$ represents the probability $(1-p)$.

---

### Conditional pmf

The conditional PMF is defined as $P_X[\bullet | c] = P[X=x | c]=\frac{P[[X=x] \cap c]}{P[c]}$ and equals 0 when $x \notin c$.

For example, consider a clock where $\zeta$ represents minutes and $X$ represents hours, and we are given $B=\{\text{first 4 hours}\}$ and $D=\{1 < \zeta \le 11\}$. The sample space is $S_x=\{0, 1, \cdots, 11\}$ with $P_X(x)=\frac{1}{12}$. When given $B$, the probability of $X$ is $P_X[x|B]=\frac{P[X=x]}{P[B]}=\frac{1/12}{1/3}=\frac{1}{4}$. When given $D$, we need to calculate $P_X[x|D]=\frac{P[\{X=x\} \cap \{\zeta \in \{2, 3, \cdots, 11\}\}]}{P[\zeta \in \{2, 3, \cdots, 11\}]}$. First, when $x=0$, the numerator considers the intersection of $\{1,2,3,4,5\}$ with $\{2,3,\cdots,11\}$ which is $\{2,3,4,5\}$, giving $\frac{4/60}{10/60}=2/5$. When $x=1$, the numerator includes all of $\{6,7,8,9,10\}$, giving $\frac{5/60}{10/60}=1/2$. Finally, when $x=2$, the numerator only includes $\{11\}$, giving $\frac{1/60}{10/60}=1/10$.

---

### Poisson r.v

$$
P_X=\begin{pmatrix} 
n \\ x 
\end{pmatrix}
p^x(1-p)^{n-x}
$$

The Poisson distribution is a discrete probability distribution that models the number of events occurring in a fixed interval of time or space. It is commonly used when events occur independently and at a constant rate. It can be used as an approximation when dealing with a binomial distribution where the number of trials $n$ is sufficiently large and the probability of success $p$ is very small, known as a Poisson process. In this case, the binomial distribution converges to the Poisson distribution.

For example, suppose a call center receives $n$ queries every $t$ seconds, where $\alpha=\lambda * t$ is a Poisson random variable and $\lambda$ represents the average arrival rate per second. Let's calculate two probabilities: the probability of receiving more than 4 queries in 10 seconds, and the probability of receiving fewer than 5 queries in 2 minutes. Given $\lambda=\frac{4}{60}$, if we let $X$ be the number of queries received in 10 seconds, we can calculate $P[X > 4]=1-P[0 \le X \le 4] = 1-(\frac{\alpha^0*e^{-\alpha}}{0!}+\frac{\alpha^1*e^{-\alpha}}{1!}+\frac{\alpha^2*e^{-\alpha}}{2!}+\frac{\alpha^3*e^{-\alpha}}{3!}+\frac{\alpha^4*e^{-\alpha}}{4!})$ where $\alpha=\frac{4}{60}*10=\frac{2}{3}$. Then, for the second probability, we calculate $P[Y < 5]=\frac{\alpha^0*e^{-\alpha}}{0!}+\frac{\alpha^1*e^{-\alpha}}{1!}+\frac{\alpha^2*e^{-\alpha}}{2!}+\frac{\alpha^3*e^{-\alpha}}{3!}+\frac{\alpha^4*e^{-\alpha}}{4!}$ where $\alpha=\frac{4}{60}*120=8$.

---

### Definition of CDF, PDF

A PMF is a distribution that gives the probability of a random variable taking a specific value, denoted as $P_X(x)=P[X=x]$.

The CDF (cumulative distribution function) is defined as $F_X(x) \triangleq P[X \le x]$ and represents the probability distribution for values less than or equal to a specific value. The CDF has probability properties such as $0 \le F_X(x) \le 1$, is an increasing function as the random variable increases, and has calculation properties like $P[a \le X \le b]=F_X(b)-F_X(a)$ and $P[X=b]=F_X(b)-F(b^-)$.

For example, consider the probability distribution of getting heads when flipping three coins. The intervals are divided into 0,1,2,3, and $P[X \le 0]=0+\frac{1}{8}$, $P[X \le 1]=P[X \le 0] + \frac{3}{8}=\frac{1}{2}$, $P[X \le 2]=P[X \le 1] + \frac{3}{8}=\frac{7}{8}$, $P[X \le 3]=P[X \le 2] + \frac{1}{8}=1$, giving us the values for each interval.

Therefore, the final property is right continuity, meaning the graph is continuous when viewed from the right.

Next, the PDF (probability density function) can be expressed as an integral $F_X(x)=\int_{-\infty}^{x} f_X(\tau)d\tau$ or calculated as a derivative $f_X(x)=\frac{d}{dx}F_X(x)$. The PDF has properties such as $f_X(x) \ge 0$, $P[a \le X \le b]=\int_{a}^{b}f_X(\tau)d\tau$, and $\int_{-\infty}^{\infty}f_X(\tau)d\tau=1$.

For example, consider a circle where $0 < \theta \le 2\pi$ and a random variable $X(\theta)=\theta/2\pi$. The CDF is calculated as follows: $X$ has range $[0, 1]$, with maximum probability values assigned outside the range as $P[X \le 0]=0$ and $P[X > 1]=1$. The middle range connects these two regions as it has the increasing function property from 0 to 1. When drawing the PDF, since it represents the slope, we have $P[X \le 0]=P[X > 1]=0$ and the middle range equals 1.

---

### Entropy

$H_X \triangleq -\sum_{k=1}^{\infty}p_k * ln(p_k)$ is defined, where $p_k$ represents the probability value that $X=x_k$. $-ln(x)$ is positive to the left of 1 and negative to the right. The $-xln(x)$ graph, when multiplied together, always yields positive values between 0 and 1, and since $x$ is a probability value, it only exists in the interval $[0,1]$, thus making it a relationship that can never be negative.

For example, when the sample space is $S=\{H, T\}$ and $P[H]=\theta$, we have $S_X=\{0, 1\}$, and the entropy can be expressed as $H_X=-\theta*ln(\theta)-(1-\theta)*ln(1-\theta)$. If we assume $\theta=\frac{1}{2}$, the entropy equals 1.

A high entropy means high uncertainty and also indicates a large amount of information.

---

### References

[Original Source #1](https://www.youtube.com/watch?v=RbSVWHbu7c0&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=4)

[Original Source #2](https://www.youtube.com/watch?v=w8nXVk0rzKI&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=5)

[Original Source #3](https://www.youtube.com/watch?v=qD4EFFSYYec&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=6)

[Original Source #4](https://www.youtube.com/watch?v=n8K9QJVY_4Q&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=7)



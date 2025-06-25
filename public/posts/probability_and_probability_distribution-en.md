---
title: 'Probability and probability distribution'
date: '2023-05-01'
tags: ['Mathematical statistics', 'lecture']
---

### Introduction

A statistical experiment refers to a situation where the outcome cannot be predicted with 100% certainty before the experiment ends. Situations with variation are called variation scenarios, while fixed, non-varying situations are called deterministic scenarios.

The space containing all possible outcomes is expressed as the sample space, denoted by the collection $c$. Events are distinguished within the sample space using uppercase English letters.

For example, when there is a coin, the sample space $c$ for the probability of getting heads and tails is as follows:

$c=\{H, T\}$

Another example is when there are two dice, the sample space $c$ for the set of possible numbers is:

$c=\{(1,1), (1,2), …, (6,6)\}$

There are two approaches to probability: the relative frequency approach, which obtains objective results through multiple trials, and the personal or subjective concept from a subjective perspective.

---

### Set Theory

For each set $c_1$, $c_2$, if $c_2$ is a subset of $c_1$, it can be denoted by the symbol $c_1 \subset c_2$.

If $c$ is the null set, it can be denoted as $c=\Phi$, and the union (OR concept) of $c_1$ and $c_2$ is denoted by $c_1 \cup c_2$. The intersection (AND concept) of $c_1$ and $c_2$ is denoted by $c_1 \cap c_2$.

The complement is denoted by $c^c$ or $\bar{c}$.

There are two types of functions: point functions and set functions. The former is like when $f(x)=2x$, if $x \to 2$, the result becomes 4, a single point. The latter is like defining $f(A)$ = # of positive integers in $A$, and if $A=\{-{\infty} < x < 6\}$, then $f(A) = 5$.

---

### The Probability Set Function

In a $\sigma$ field, $B$ represents all subsets of the sample space $C$, and there are three conditions for $B$ to be a $\sigma$ field:

-$\Phi$ $\in$ $B$

-$C$ $\in$ $B$ $\Rightarrow$ $C^c \in$ $B$ (closed under complement)

-The union of $C$ $\in B$ (closed under countable union)

Examples of $B$ satisfying the above conditions include the power set of $C$, $B$ itself, the $\sigma$ field generated from $B$, and the Borel $\sigma$ field generated from the entire set of real numbers $U$.

Before defining probability, it is necessary to understand that $C$ is the sample space, $B$ is the $\sigma$ field of $C$, and $P$ is a real-valued function. It also satisfies the following properties:

-$P(c) \ge 0$, $\forall c \in C$ (non-negativity)

-$P(C) = 1$ (normality)

-$c_1, c_2 ,… \in B$, $c_i \cap c_j$ = $\Phi$ ($i \neq j$), meaning if there is no intersection, the probability of consecutive unions equals the sum of probabilities of each $c$. (countable additivity)

---

### Conditional Probability and Independence

For $c_1, c_2 \subset C$, the probability $P$ of $c_2$ given $c_1$ is defined as $P(c_2 | c_1)$=$\frac{P(c_2 \cap c_1)}{P(c_1)}$. Due to the non-negativity property, the denominator $c_1$'s probability must be $\ne 0$. And due to the normality property, $P(c_1 | c_1) = 1$ must hold.

Bayes' theorem states that for elements of set $C$ that are mutually exclusive and exhaustive, each probability must be greater than 0. It is defined by the following formula:

$P(c_j | C) = \frac{P(c_j)*P(C | c_j)}{\sum\limits_{i=1}^k{P(c_i)*P(C | c_i)}}$

Rearranging this formula, $C=(C \cap c_1) \cup (C \cap c_2) \cup … \cup (C \cap c_k)$ represents a disjoint relationship, so $P(C) = P(c_1)*P(C | c_1) + P(c_2)*P(C | c_2) + … + P(c_k)*P(C | c_k) = \sum\limits_{i=1}^k{P(c_i)*P(C | c_i)}$.

If $c_1$ and $c_2$ are independent, then $P(c_1 | c_2) = \frac{P(c_1 \cap c_2)}{P(c_2)} = P(c_1)$ holds, meaning $P(c_1 \cap c_2) = P(c_1)*P(c_2)$ can be calculated.

---

### Random Variables

A random variable $X$ is viewed as a real-valued function defined on the sample space. When the range of $X$ is denoted by $D$, it is defined as $\{x:x=X(c), c \in C\}$. If the range $D$ is countable, it becomes a discrete variable, and if it's an interval of real numbers, it's considered a continuous variable.

For the $\sigma$ field $B$ of $C$ and the $\sigma$ field $F$ of $D$, $P(C)$, $C \in B$, $P_x(B)$, $B \in F$ hold, and $P_x(B)$ is called the induced probability. This can be rewritten as $P\{c \in C : X(c) \in B\}, B \in F$.

Also, for a discrete $X$, when the range $D$ is set as $\{d_1, d_2, …, d_m\}$ and expressed as probability, it becomes $P_x(d_i)=P(X=d_i)$, called the probability mass function (pmf). For example, when the probability that the sum of two dice is 4 is denoted as $P_x(4)$, it can be calculated as $P((1, 3) \cup (2, 3) \cup (3, 1))$=3/36.

The cumulative distribution function (cdf) can be expressed as follows:

$$
F_x(x) = P_x((-\infty, x]) = P(X ≤ x)
$$

The height of discontinuity points seen in the $F$ graph on real number intervals is called jump size. Additionally, step-shaped graphs are called step functions.

The properties of the cumulative distribution function are as follows:

-$F(a) ≤ F(b), \forall a < b$ (nondecreasing)

-$\lim\limits_{x \to -\infty} F(x) = 0, \lim\limits_{x \to \infty} F(x) = 1$

-$\lim\limits_{x \to x_0} F(x) = F(x_0)$ (right continuous)

---

### Discrete Random Variables

When $x$ is finite or countable, it is called a discrete variable. The support of random variable $x$ refers to the set of $x$ where the probability $P$ of $x$ is greater than 0. For example, in the probability of getting heads when tossing two coins, the support is {1, 2}, and when drawing 5 balls from 30 balls where 10 are white and 20 are black, the support is {0, 1, 2, 3, 4, 5}.

---

### Continuous Random Variables

The cdf is defined as $F_x(x) = \int_{-\infty}^{x} f_x(t)\, dt$, and in this formula, $f_x(t)$ is called the probability density function (pdf) of $x$. From $P(X = x) = F_x(x) - F_x(x-) = 0$, it can be shown that for continuous variables, $P(a < X ≤ b) = P(a ≤ X < b) = P(a ≤ X ≤ b) = P(a ≤ X < b) = F_x(b) - F_x(a) = \int_{a}^{b} f_x(t)\, dt$.

---

### Expectation of a Random Variable

$E(x) = \begin{cases} \int_{-\infty}^{\infty}xf_x(x) \leftarrow if \int_{-\infty}^{\infty} |x|f(x)\,dx < \infty (conti.)\\ \sum\limits_{x \in S_x}xp_x(x) \leftarrow if \sum |x|f(x)\,dx < \infty (discrete) \end{cases}$

---

### Some Special Expectations

When $E(x^k)$ is called the k-th moment, the mean $\mu = E(x)$ (1st, mean) and variance $\sigma^2 = E[(x-\mu)^2] = E(x^2)-E^2(x)$ hold, and $E[(x-\mu)^k]$ is called the k-th central moment.

Using $|t| < h$ where $h > 0$, $E(e^{th}) < \infty$ is defined as $M_x(t)$, which is called the moment generating function (mgf). When calculating this, it is computed as $\int_{-\infty}^{\infty} e^{tx} f(x) \, dx$.

Each mgf of any random variable exists uniquely according to the uniqueness of mgf property.

When there is an mgf, it is said that the pdf can be obtained using it. For example, when $M_x(t) = \frac{1}{10} e^t + \frac{2}{10} e^{2t} +\frac{3}{10} e^{3t}$, it can be arranged as $M_x(t) = \sum e^{tx}p(x) = p(1)e^t + p(2)e^{2t} + p(3)e^{3t}$, and this can be obtained from $p(x) = \frac{x}{10}, x=\{1, 2, 3\}$.

Using Taylor expansion, the mean of the $k$-th moment can be obtained as follows:

$M_x(t) = E(e^{tx}) = E[1 + tx + \frac{t^2x^2}{2!} + \frac{t^3x^3}{3!} + … ] = 1 + tE(x) + \frac{t^2}{2!}E(x^2) + …$

Therefore, it can be seen that $M_x^{(m)}(0) = E(x^m)$ when differentiated with respect to $t$.

For the characteristic function (ch.f), $\psi(t) = E(e^{itx})$ is defined. Here, $i$ corresponds to the imaginary part, and $|e^{itx}| = |cos(tx) + isin(tx)| = \sqrt{cos^2(tx) + sin^2(tx)} = 1$. Also, the ch.f has the property that the integral value always exists. And it satisfies $E(x) = -i\psi'(0)$, $E(x^2) = - \psi''(0)$.

Finally, the cumulant generating function (cgf) is $\psi(t) = logM_x(t)$, and when expanded using the $k$-th cumulant $\kappa$, it becomes $\psi(t) = \kappa_0 + \kappa_1t + \frac{\kappa_2t^2}{2!} + … = \log(\mu_0+ \mu_1t + \frac{\mu_2t^2}{2!} + …)$. When combining the function inside $\log$ into the form (1+x), it becomes $\log(1+x) = x - \frac{1}{2}x^2 + \frac{1}{3}x^3 - …$, so applying this gives $\mu_1t + \frac{1}{2} (\mu_2- \mu_1^2)t^2 + \frac{1}{6}(\mu_3-3\mu_1\mu_2+2\mu_1^3)t^3…$, meaning $\kappa_0 = 0$, $\kappa_1 = \mu_1$, $\kappa_2 = \mu_2 - \mu_1^2$, $\kappa_3 = \mu_3 - 3\mu_1\mu_2 + 2\mu_1^3$ hold. In other words, $\kappa_1$ is the mean, $\kappa_2$ is $\sigma^2$, and $\kappa_3$ is $E(x-\mu)^3 = \mu_3'$.

---

### Important Inequalities

If $E(x^m)$ and $E(x^k)$ for $k≤m$ exist, then $\int |x|^kf(x)\, dx < \infty$ is split into two regions: $\int_{|x| ≤ 1} |x|^kf(x) \,dx + \int_{|x| > 1} |x|^kf(x) \,dx$ $≤ \int_{|x| ≤ 1} 1*f(x) \,dx + \int_{|x| > 1} |x|^mf(x) \,dx$ $≤ \int_{-\infty}^{\infty} f(x) \,dx + \int_{-\infty}^{\infty} |x|^mf(x) \,dx = 1 + E|x|^m < \infty$.

In Markov's inequality, if $u(X)$ is a nonnegative function and $E[u(X)]$ exists, then $\forall c > 0, P[u(X) ≥ c] ≤ \frac{E[u(X)]}{c}$. Here, $E(u(X)] = \int u(x)f(x) \,dx = \int_A u(x)f(x) \,dx + \int_{A^c} u(x)f(x) \,dx$ can be split into two regions, and the former term can be replaced by $c\int_A f(x) \,dx$ due to the condition that u(x) is greater than c, while the latter must have a value greater than 0 in probability, so ultimately $cP(u(X) ≥ c)$ remains.

Chebyshev's inequality is $P(|X-\mu| ≥ k\sigma) ≤ \frac{1}{k^2}$, and if $\forall k > 0$, then $u(X) = (X - \mu)^2$ and $c = k^2v^2$, satisfying $P((X - \mu)^2 ≥ k^2\sigma^2) ≤ \frac{E[(X-\mu)^2]}{k^2\sigma^2}$.

---

### References

[Original Source #1](http://www.kocw.net/home/cview.do?cid=7c789810ade43386)

[Original Source #2](http://www.kocw.net/home/search/kemView.do?kemId=1390551)



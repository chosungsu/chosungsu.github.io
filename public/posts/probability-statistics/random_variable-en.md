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

### References

[Original Source #1](https://www.youtube.com/watch?v=RbSVWHbu7c0&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=4)




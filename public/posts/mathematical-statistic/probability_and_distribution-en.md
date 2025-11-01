---
title: 'Probability and distribution'
date: '2023-05-01'
tags: ['Mathematical statistics', 'lecture']
---

### Introduction

Many kinds of studies can be characterized, at least in part, by the fact that repeated experimentation under essentially identical conditions is the standard procedure. For example, in medical research the interest may center on the effect of a drug to be administered. An economist may be concerned with the prices of three specific commodities at various time intervals. Or an agronomist may wish to study the effect of a chemical fertilizer on grain yield.

If these kinds of experiments can be repeated under the same conditions, we call them random experiments, and the set of all possible outcomes is called the experimental space or sample space. We denote the sample space by $C$.

For example, in a coin toss, if we denote the outcome tails by $T$ and heads by $H$, then the sample space is the set of these two symbols. In this example, $C = \{H, T\}$.

Subsets of $C$ are often called events and are usually denoted by uppercase Roman letters such as $A, B, C$. If the outcome of the experiment is an element of the event $A$, we say that event $A$ has occurred.

If a random experiment is performed repeatedly $N$ times, we can count the number $f$ (frequency) of times that event $A$ actually occurs. The ratio $f/N$ is called the relative frequency of event $A$ in these $N$ trials. Relative frequency is highly irregular for small $N$. However, as $N$ increases, empirically the relative frequency appears to stabilize around some number, say $p$, which we then associate with event $A$. This is the probability that the outcome of a random experiment lies in $A$, also called the probability of event $A$ or the probability measure of $A$.

For example, if $N=400$ and $f$ is the frequency that the sum equals 7, and $f=60$, then the relative frequency is $f/N = 60/400 = 0.15$.

---

### Sets

If an object belongs to a set, it is called an element of the set. For example, if $C$ denotes the set of real numbers $x$ such that $0 \le x \le 1$, then $3/4$ is an element of $C$. The fact that $3/4$ is an element of $C$ is written $3/4 \in C$. More generally, $c \in C$ means that $c$ is an element of the set $C$.

If a set $C$ is finite or has as many elements as the positive integers, we say that $C$ is countable. For example, $C_1 = \{1, 2, \dots, 100\}$ and $C_2 = \{1, 3, 5, 7, \dots\}$ are countable sets. However, the real interval $(0, 1]$ is uncountable.

The complement of an event $A$ is the set of all elements that are in $C$ but not in $A$. The complement of $A$ is denoted by $A^c$, that is, $A^c = \{x \in C : x \notin A\}$.

The empty set is the event containing no elements. It is denoted by $\phi$. Note that $C^c = \phi$ and $\phi^c = C$.

If every element of set $A$ is also an element of set $B$, then $A$ is called a subset of $B$, written $A \subset B$. If $A \subset B$ and also $B \subset A$, then the two sets have identical elements, written $A = B$.

If $A$ and $B$ are events, then the union $A \cup B$ is the set of all elements that are in $A$, or in $B$, or in both $A$ and $B$. The intersection $A \cap B$ is the set of all elements that are in both $A$ and $B$. Two events are disjoint if they have no elements in common.

The distributive law, for arbitrary sets, allows us to combine parentheses inside and outside:

$$
A \cap (B \cup C) = (A \cap B) \cup (A \cap C).
$$

And De Morgan's law is expressed as

$$
(A \cap B)^c = A^c \cup B^c.
$$

---

### Definition of Probability

If $C$ is finite, we can take as our collection of events the set of all subsets of $C$. With a sample space $C$ and a collection of events $\mathcal{B}$, we can define the third component of a probability space, namely a probability set function.

The definition of probability consists of three axioms, motivated by three intuitive properties of relative frequency. Let $C$ be the sample space and let $A \subset C$. Suppose the experiment is repeated $N$ times. Then the relative frequency of $A$ is $f_A = \#\{A\}/N$, where $\#\{A\}$ denotes the number of times $A$ occurred in the $N$ repetitions. Note that $f_A \ge 0$ and $f_C = 1$. For the third property, suppose $A_1$ and $A_2$ are disjoint events. Then $f_{A_1 \cup A_2} = f_{A_1} + f_{A_2}$.

#### Axioms of Probability

- non-negativity: $P(A) \ge 0$.
- total probability: $P(C) = 1$.
- countable additivity: If $\{A_n\}$ is a sequence of events in $\mathcal{B}$ with $A_m \cap A_n = \phi$ for $m \ne n$ (mutually exclusive), then
  $P\big(\bigcup_{n=1}^{\infty} A_n\big) = \sum_{n=1}^{\infty} P(A_n)$.

#### Counting Rules

If $A$ has $m$ elements and $B$ has $n$ elements, then there are $mn$ ordered pairs $(x_i, y_j)$ with the first element from $A$ and the second from $B$.

$$
\begin{aligned}
& P^n_k = n(n-1) \cdots (n-(k-1)) \\
&= \frac{n!}{(n-k)!}
\end{aligned}
$$

Permutations are the number of ordered selections of $k$ elements taken from a set of $n$ elements (no repetition and order matters).

$$
\begin{pmatrix} n \\ k\end{pmatrix} = \frac{n!}{k!(n-k)!}
$$

Combinations are the number of $k$-element subsets taken from a set of $n$ elements (order does not matter).

---

### Conditional Probability and Independence

#### Conditional Probability

In some random experiments, we may be interested only in outcomes that are elements of a subset $A$ of the sample space $C$. That is, for our purpose, the sample space is effectively reduced to $A$. Let $B$ and $A$ be events with $P(A) > 0$. The conditional probability of $B$ given $A$ is defined as

$$
P(B|A) = \frac{P(A \cap B)}{P(A)}
$$

#### Law of total probability

$$
P(B) = \sum_{i=1}^k P(A_i)P(B|A_i)
$$

This holds when $A_1, A_2, \dots, A_k$ are mutually exclusive and exhaustive events with $P(A_i) > 0$.

#### Bayes' theorem

Using the law of total probability, Bayes' theorem provides a method to update the probability of event $A_j$ after observing new information.

$$
P(A_j|B) = \frac{P(A_j)P(B|A_j)}{\sum_{i=1}^k P(A_i)P(B|A_i)}
$$

Here, $P(A_i)$ is called the prior probability, which is the probability before observing event $B$, and $P(A_j|B)$ is called the posterior probability, which is the probability after observing event $B$.

#### Independence

Two events are said to be independent when the occurrence of one event does not change the probability of the other event.

$$
\begin{aligned}
& P(A \cap B) = P(A)P(B), \\
& P(B|A) = P(B)
\end{aligned}
$$

---

### Random variables

When elements of the sample space $C$ of an experiment are not numbers, it can be cumbersome to express them numerically. Random variables solve this problem. A function $X$ that assigns exactly one number $X(c) = x$ to each element $c \in C$ is called a random variable.

$$
D = \{x : x = X(c), c \in C\}
$$

If $D$ is a countable set, $X$ is called a discrete random variable. If $D$ is an interval of real numbers, $X$ is called a continuous random variable.

#### Probability Mass Function (pmf)

If $X$ is a discrete random variable with finite space $D = \{d_1, \dots, d_m\}$, the probability mass function (pmf) is defined as

$$
P_x(d_i) = P[\{c:X(c)=d_i\}]
$$

And the probability distribution $P_x(\cdot)$ induced by $X$ for a subset $D'$ is defined as

$$
P_x(D') = \sum_{d_i \in D'} P_x(d_i)
$$

#### Probability Density Function (pdf)

For continuous random variables, we are interested in probabilities for intervals rather than individual points. In general, we can determine a nonnegative function $f_X(x)$ such that for any interval $(a, b)$ in $D$, the probability distribution $P_X(\cdot)$ induced by $X$ is defined as

$$
\begin{aligned}
& P_X[(a,b)] \\
&= P[\{c \in C:a<X(c)<b\}] \\
&=\int^b_a f_X(x)dx
\end{aligned}
$$

$f_X(x)$ is called the probability density function (pdf) of $X$.

#### Cumulative Distribution Function (cdf)

$$
\begin{aligned}
& F_X(x) \\
&= P_X((-\infty, x]) \\
&= P_X(\{c \in C:X(c) \le x\})
\end{aligned}
$$

The cumulative distribution function is a function that uniquely determines the probability distribution of both discrete and continuous random variables.

---

### Discrete Random variables

When the space (range) of a random variable is finite or countable, it is called a discrete random variable. For example, the number of tosses $X$ until the first heads (H) appears is a discrete random variable, and its space is the countable set $D = \{1, 2, 3, 4, \dots\}$.

#### Probability Mass Function (pmf)

The probability mass function of a discrete random variable $X$ with space $D$ is given by

$$
p_X(x) = P[X = x]
$$

The support of a discrete random variable is the set of points in space $D$ with positive probability ($S = \{x \in D : P(X=x) > 0\}$).

---

### Continuous Random variables

A random variable is called continuous when its cumulative distribution function (cdf) $F_X(x)$ is continuous for all $x \in \mathbb{R}$. For continuous random variables, the probability at any individual point is 0.

#### Probability Density Function (pdf)

Most continuous random variables are absolutely continuous, meaning that the cdf can be expressed as an integral of some function $f_X(t)$:

$$
F_X(x) = \int_{-\infty}^x f_X(t) \, dt
$$

If $f_X(x)$ is continuous, then by the fundamental theorem of calculus:

$$
\frac{d}{dx}F_X(x) = f_X(x)
$$

Probabilities are obtained through integration:

$$
\begin{aligned}
& P(a < X \le b) \\
&= P(a \le X \le b) \\
&= \int_a^b f_X(t) \, dt
\end{aligned}
$$

---

### Expectation of a Random variable

The expectation $E(X)$ can be thought of as a weighted average of the values that a random variable can take, where the weights are the probabilities of those values. For the expectation to exist, absolute convergence is required.

For a continuous random variable, if $f(x)$ is the pdf and $\int_{-\infty}^\infty |x|f(x) \, dx < \infty$, then the expectation of $X$ is

$$
E(X) = \int_{-\infty}^\infty xf(x) \, dx
$$

For a discrete random variable, if $p(x)$ is the pmf and $\sum_x |x| p(x) < \infty$, then the expectation of $X$ is

$$
E(X) = \sum_x x p(x)
$$

To find the expectation of a new random variable $Y = g(X)$ defined as a function of random variable $X$, we can directly use the distribution of $X$ without first finding the distribution of $Y$.

The expectation operator $E$ is a linear operator. For example, $E[k_1g_1(X) + k_2g_2(X)] = k_1E[g_1(X)] + k_2E[g_2(X)]$. However, the expectation of a product is not equal to the product of expectations.

---

### Some special expectations

The mean value $\mu$ of a random variable $X$ for which the expectation exists is defined as $\mu = E(X)$. The mean is a weighted average of the values of $X$, where the weight for each value $a_i$ is $p(a_i)$. This is the first moment of $X$ about 0.

The variance $\sigma^2$ of a random variable $X$ with finite mean $\mu$ and finite $E[(X-\mu)^2]$ is defined as $\sigma^2 = E[(X - \mu)^2]$. This is the second moment of $X$ about $\mu$, and it measures the dispersion or spread of the values of the random variable from $\mu$.

$$
\text{Var}(aX + b) = a^2 \text{Var}(X)
$$

This means that if a random variable is multiplied by $a$, its standard deviation also increases by a factor of $|a|$.

---

### Important Inequalities

In Markov's inequality, if $E[u(X)]$ exists for a nonnegative function $u(X) \ge 0$ of random variable $X$, then for any positive constant $c$:

$$
P[u(X) \ge c] \le \frac{E[u(X)]}{c}
$$

This inequality provides an upper bound on the probability without knowing the distribution of $X$.

Chebyshev's inequality applies to all random variables with finite variance:

$$
P(|X - \mu| \ge k\sigma) \le \frac{1}{k^2}
$$

This inequality provides an upper bound on the probability that a random variable value deviates from the mean by $k$ standard deviations or more.

---

### References

[Original source #1](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)



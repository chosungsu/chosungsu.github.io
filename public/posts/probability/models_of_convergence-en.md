---
title: 'Models of Convergence'
date: '2023-05-12'
tags: ['Probability', 'lecture']
---

### Basic Convergence Concepts

#### Almost Sure Convergence

$X_n$ converges to $X$ almost surely if there exists a null event $N$ such that $\lim_{n \to \infty} X_n(\omega) = X(\omega)$ for every $\omega \notin N$.

#### Convergence in Probability

$X_n$ converges to $X$ in probability if, for every $\varepsilon > 0$,

$$
\lim_{n \to \infty} \mathbf{P}(|X_n - X| > \varepsilon) = 0.
$$

#### $L^1$ Convergence

$X_n$ converges to $X$ in $L^1$ if

$$
\lim_{n \to \infty} \mathbf{E}\left[|X_n - X|\right] = 0.
$$

#### Weak Convergence

The first three notions of convergence require $X_n$ and $X$ to be defined on the same probability space. Weak convergence is the weakest notion, relying only on distributions: if $F_n$ and $F$ are the distribution functions of $X_n$ and $X$, then $X_n$ converges weakly to $X$ when $F_n(x) \to F(x)$ for every continuity point $x$ of $F$.

---

### Uniform Integrability and $L^1$ Convergence

$L^1$ convergence is valuable because it implies convergence of expectations such as $\mathbf{E}[X_n] \to \mathbf{E}[X]$. Uniform integrability (UI) bridges convergence in probability and $L^1$ convergence.

A family of integrable random variables $\{X_t : t \in T\}$ on $(\Omega, \mathcal{F}, \mathbf{P})$ is uniformly integrable if

$$
\lim_{\lambda \to \infty} \sup_{t \in T} \mathbf{E}\left[|X_t|\mathbf{1}_{\{|X_t| > \lambda\}}\right] = 0.
$$

In other words, the contribution from the tails must vanish uniformly over the family as $\lambda$ grows. The family $\{X_t\}$ is uniformly integrable if and only if both conditions hold:

$\Rightarrow$ $\{X_t\}$ is bounded in $L^1$, i.e., $\sup_{t \in T} \mathbf{E}[|X_t|] \le M < \infty$ for some $M$.

$\Rightarrow$ For every $\varepsilon > 0$ there exists $\delta > 0$ such that whenever $\mathbf{P}(F) < \delta$ for $F \in \mathcal{F}$, we have $\mathbf{E}[|X_t|\mathbf{1}_F] < \varepsilon$ for all $t \in T$.

---

### Weak Convergence of Probability Measures

Weak convergence requires $F_n(x)$ to converge to $F(x)$ only at continuity points of $F$. For example, the deterministic sequence $X_n = 1/n$ converges to $X = 0$, but demanding $F_n(x) \to F(x)$ for every $x$ would fail at the discontinuity $x=0$ since $F_n(0) = 0 \not\to F(0) = 1$. Hence discontinuities must be excluded.

#### Polya's Theorem

Using the continuity of $F$, one can bound $\sup_{x \in \mathbb{R}} |F_n(x) - F(x)|$ by partitioning the real line into intervals containing only finitely many discontinuities and tightening the bound within $1/k$.

#### Weak Convergence of Measures

Let $F_n, F$ be distribution functions with induced probability measures $\mu_n, \mu$. Then $F_n$ converges weakly to $F$ if and only if, for every $a < b$ at which $\mu$ is continuous,

$$
\mu_n((a, b]) \to \mu((a, b]).
$$

Whenever $a$ and $b$ are continuity points of $F$, we have $\mu_n((a, b]) = F_n(b) - F_n(a) \to F(b) - F(a) = \mu((a, b])$.

#### Vague Convergence and Helly's Theorem

Finite measures $\mu_n$ and $\mu$ on $(\mathbb{R}, \mathcal{B}(\mathbb{R}))$ satisfy vague convergence if $\mu_n((a, b]) \to \mu((a, b])$ for every $a < b$ where $\mu$ is continuous. If, in addition, $\mu_n(\mathbb{R}) \to \mu(\mathbb{R})$, then $\mu_n$ converges weakly to $\mu$.

Helly's theorem states that for any sequence of probability measures $\{\mu_n : n \ge 1\}$ on $\mathcal{B}(\mathbb{R}^d)$, there exists a subsequence $\mu_{n_k}$ and a sub-probability measure $\mu$ such that $\mu_{n_k}$ converges vaguely to $\mu$ as $k \to \infty$.

The Portmanteau theorem asserts that for probability measures $\mu_n$ and $\mu$ on a metric space $(S, \mathcal{B}(S), \rho)$, the sequence $\mu_n$ converges weakly to $\mu$ if and only if $\int_S f \, d\mu_n \to \int_S f \, d\mu$ for every bounded uniformly continuous function $f$. Equivalently, $\limsup_{n \to \infty} \mu_n(F) \le \mu(F)$ for all closed sets $F \subseteq S$ and $\liminf_{n \to \infty} \mu_n(G) \ge \mu(G)$ for all open sets $G \subseteq S$.

#### Tightness and Prokhorov's Theorem

Helly's theorem guarantees only the existence of vaguely convergent subsequences; additional conditions ensure the limit is a probability measure. Tightness provides this guarantee. A family of probability measures $\Lambda = \{\mu\}$ is tight if, for every $\varepsilon > 0$, there exists a compact set $K \subseteq S$ such that

$$
\mu(K) \ge 1 - \varepsilon.
$$

Prokhorov's theorem states that a family $\Lambda$ is tight if and only if every sequence from $\Lambda$ admits a weakly convergent subsequence.

---

### References

[Original Source #1](https://researchers.ms.unimelb.edu.au/~xgge@unimelb/Files/Notes/Lecture%20Notes%20on%20Advanced%20Probability.pdf)

[Original Source #2](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)



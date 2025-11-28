---
title: 'The Characteristic function'
date: '2023-05-19'
tags: ['Probability', 'lecture']
---

### Definition and Basic Properties of Characteristic Functions

The characteristic function is an extension of the moment generating function (MGF) to the complex domain. It generally takes complex values.

Recall Euler's formula for complex exponentials. For $z = x + iy \in \mathbb{C}$, the complex number $e^z$ is

$$
e^z = e^x (\cos y + i \sin y)
$$

Setting $x=0$, Euler's formula becomes

$$
e^{iy} = \cos y + i \sin y
$$

The characteristic function of a random variable $X$ is a $\mathbb{C}$-valued function defined as $f_X(t) \triangleq \mathbf{E}[e^{itX}]$. Using Euler's formula, this can be interpreted as $f_X(t) = \mathbf{E}[\cos tX] + i\mathbf{E}[\sin tX]$.

When $X$ (or $\mu$) has a probability density function $\rho(x)$, the characteristic function is

$$
f(t) = \int_{-\infty}^\infty e^{itx}\rho(x)dx
$$

This is also known as the Fourier transform of $\rho(x)$.

---

### Uniqueness theorem

One of the main reasons for using characteristic functions is that they uniquely determine the distribution of a random variable.

#### Inversion Formula

Let $\mu$ be a probability measure on $\mathbb{R}$ and $f(t)$ be its characteristic function. Then for any real numbers $x_1 < x_2$, we have

$$
\begin{aligned}
&\mu((x_1, x_2)) + \frac{1}{2}\mu(\{x_1\}) + \frac{1}{2}\mu(\{x_2\}) \\
&= \lim_{T\to\infty} \frac{1}{2\pi} \int_{-T}^T \frac{e^{-itx_1} - e^{-itx_2}}{it} f(t)dt
\end{aligned}
$$

When the characteristic function is integrable, the density function is $\rho(x) = \frac{1}{2\pi} \int_{-\infty}^\infty e^{-itx}f(t)dt$, where the $\int_{-T}^T$ integral can be replaced with $\int_{-\infty}^\infty$, and left-right continuity is also established.

---

### Lévy-Cramér

One of the most important properties of characteristic functions is that weak convergence of random variables is equivalent to pointwise convergence of characteristic functions.

When a sequence of probability measures $\mu_n$ converges weakly to $\mu$ and their characteristic functions are $f_n, f$, then $f_n$ converges uniformly to $f$ on every finite interval of $\mathbb{R}$. Since $x \mapsto e^{itx}$ is a bounded continuous function, $f_n(t) \to f(t)$ follows trivially from the definition of weak convergence.

Conversely, if the characteristic functions ${f_n}$ of a sequence of probability measures ${\mu_n}$ converge pointwise to some limit function $f(t)$ and $f(t)$ is continuous at $t=0$, then $\mu_n$ converges weakly to some probability measure $\mu$.

---

### References

[Original source #1](https://researchers.ms.unimelb.edu.au/~xgge@unimelb/Files/Notes/Lecture%20Notes%20on%20Advanced%20Probability.pdf)

[Original source #2](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)

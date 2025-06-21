---
title: 'Convex_analysis_and_optimization'
date: '2024-05-24'
tags: ['Probability&Statistics', 'lecture']
---

### notation

When the domain of a function $f$ is called $Dom(f)$, $f: A \rightarrow B$ means $Dom(f) \subset A$ to $B$. At this time, for $x$ where $x \notin Dom(f)$, it can be proven that $f(x) = \infty$.

---

### convex sets

If $tx + (1-t)y \in A$ is satisfied, then $A \subset R^n$ is said to be convex.

---

### separating hyperplane theorem

When both $c$ and $d$ are convex subsets of $R^n$, if $c \cap d = 0$ and there exists $a \ne 0$ and $b$, then $a^Tx \le b$ is possible when $\forall x \in c$ and $a^Tx \ge b$ is possible when $\forall x \in d$.

---

### supporting hyperplane theorem

To prove that $x_0$ is a boundary point of $c \in R^n$, when $a \ne 0$, for all $x \in c$, $a^Tx \le a^Tx_0$ is satisfied, and the hyperplane at this time is called the hyperplane of $C$ at $x_0$.

---

### convex function

$f:R^n \rightarrow R$ is said to be convex when $Dom(f)$ is convex, and the calculation formula is as follows:

$$
f(tx + (1-t)y) \le tf(x)+(1-t)f(y)
$$

Here, $f$ can be extended to $R^n$.

Also, convexity can be confirmed using the following calculation formula:

$$
f(y) \ge f(x) + \nabla f(x)^{top}(y-x)
$$

---

### subgradient of a function

For $f:R^n \rightarrow R$ and vector $z \in R^n$, if $x$ satisfies the following equation, it can be called a subgradient of $f$:

$$
f(y) \ge f(x) + z^{top}(y-x)
$$

If at least one subgradient exists for $x$, the function $f$ is said to be subdifferentiable at $x$. This is expressed as $\partial f(x)$ in notation.

For all $\alpha \ge 0$, $\partial(\alpha f)(x) = \alpha \partial f(x)$ is satisfied. When this operation is applied to addition, $\partial (f_1 + f_2) (x) = \partial f_1(x) + \partial f_2(x)$ also holds.

---

### second order condition

It means that $f$ is convex and $\nabla^2 f(x)$ is nonnegative definite.

---

### convex conjugate

When there are two functions $f : R^n \rightarrow R$ and $f^* : R^n \rightarrow R$, $f^*(y) = sup_{x \in Dom(f)} (y^{top}x - f(x))$ is defined, and together with the condition $Dom(f^*) = \{y:f^*(y) < \infty\}$, it is called convex/Fenchel conjugate. Note that Fenchel's inequality is as follows:

$$
x^{top}y \le f(x) + f^*(Y)
$$

This can be transformed into differential form for $x$ and $y$ as $x \in \partial f^*(y)$, $y \in \partial f(x)$. According to Legendre duality theory, it can also be confirmed that $f^** = f$ are identical conditions.

---

### standard form of an optimization

When $\{f_0, f_1, ..., f_m\}$ and $\{h_1, ..., h_p\}$ are all subsets of $R^n$, to minimize the objective function $f_0(x)$, constraints $f_i(x) \le 0$ and $h_i(x) = 0$ are constructed. Here, the $f_0$ and $f$ sets, excluding $h$, all have convex properties.

The Lagrangian $L$ dimension is constructed as follows:

$$
L(x, \lambda, v) = f_0(x) + \sum_{i=1}^{m} \lambda_i f_i(x) + \sum_{i=1}^{p} v_ih_i(x)
$$

Here, $\lambda$ is the coefficient satisfying the constraint $f_i(x) \le 0$, and $v$ is the coefficient satisfying $h_i(x)=0$.

The Lagrange dual problem uses $g(\lambda, v)$ as a lower bound of $p^*$, and the objective is to make $g(\lambda, v)$ hold under the constraint $\lambda \ge 0$. At this time, the dual optimal value $d^*$ has the weak duality property of being less than or equal to $p^*$, and the difference between them is called the duality gap. If the difference between them is 0, it is in strong duality state.

---

### linear programming

The standard form operates under the objective function $c^Tx$ with constraints $Ax=b$ and $x \ge 0$. If this is changed to inequality form, it becomes the objective function $-b^Tv$ with constraint $A^Tv+c \ge 0$. Conversely, the inequality form of LP has the objective function $c^Tx$ with constraint $Ax \le b$, and if this is changed to standard form, it becomes the objective function $-b^T\lambda$ with constraints $A^T\lambda + c \ge 0$ and $\lambda \ge 0$.

---

### complementary slackness

In the Lagrange equation like $f_0(x^*) = g(\lambda^*, v^*)$, the right-hand side can be thought of as $inf_{x \in D} (f_0(x) + \sum_{i=1}^{m} \lambda_i^* f_i(x) + \sum_{i=1}^{p} v_i^* h_i(x))$, which results in a value less than or equal to $f_0(x^*)$. Therefore, it is in strong duality state. In the minimization process of $L(x, \lambda^*, v^*)$ at $x^*$, the first inequality can be confirmed as $\nabla f_0(x^*) + \sum_{i=1}^{m} \lambda_i^*\nabla f_i(x^*) + \sum_{i=1}^{p} v_i^* \nabla h_i(x^*) = 0$, and in the second inequality, $\lambda_i^* f_i(x^*) = 0$ can be confirmed. This state is called complementary slackness.

---

### kkt optimality condition

The following 5 conditions representing strong duality are called KKT conditions:

1.$f_i(x^*) \le 0, i = 1, ..., m$

2.$h_i(x^*) = 0, i = 1, ..., p$

3.$\lambda_i^* \ge 0, i = 1, ..., m$

4.$\lambda_i^*f_i(x^*) = 0, i = 1, ..., m$

5.$\nabla f_0(x^*) + \sum_{i=1}^{m} \lambda_i^*\nabla f_i(x^*) + \sum_{i=1}^{p} v_i^* \nabla h_i(x^*) = 0$

---

### lasso
Under the conditions $y \in R^n$ and $x \in R^{n*p}$, linear regression has the following lasso penalty:

$$
min_{\beta \in R^p} (\frac{1}{2n} |y-X\beta|^2_2 + \lambda|\beta|_1)
$$

Simply put, for single prediction, using the soft thresholding function $S$, $\hat{\beta} = S_{\lambda} (<z, y> / n)$ where $S = sign(x)(|x|-\lambda)$.

For multiple prediction, the global minimum is updated and the objective function is defined by the following equation:

$$
\frac{1}{2n} \sum_{i=1}^{n} (y_i - \sum_{k \ne j} x_{ik}\beta_k - x_{ij}\beta_j)^2 + \lambda \sum_{k \ne j} |\beta_k| + \lambda |\beta_j|
$$

In this equation, $\hat{\beta_j}$ is updated as $S(<x_j, r^{j}> / n)$.

---

### References

[Original Path #1](https://www.dropbox.com/scl/fi/bs1jl9vgx6wc8nqbmkpvx/Chap7-convexity.pdf?rlkey=imbr1vtdo4228jqxbrrwu8svw&e=1&dl=0)

---
title: 'Classification'
date: '2022-07-15'
tags: ['Machine Learning', 'lecture']
---

### Classification

<img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXdEee4iKUeq_HmcuU79jWcMxMd0p9G_EejMTT7r6zU0aLg0FtunGvxUh7emGC1YuaFNvFF6H6fZBjqCmv_4jLxYzFZkzzNlmLAKWtcnwvKNvLYQJhw9E0qc1h0HNufo7dHnSHMZtHRTe1RavB-IIMJt7gNx?key=IbqRKL5SySsVffR6LRm6IA" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

If labels are continuous, the problem is regression; if labels are categorical or discrete, it is classification. In classification, we model the probability of belonging to each category.

<img src="https://i.sstatic.net/OOSHJ.jpg" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Suppose labels are discrete, e.g., 1, 2, 3. If we try to fit a regression function instead of a classifier, we obtain behavior like the figure above. Such graphs are inappropriate for linear regression because even for discrete labels, the model implicitly treats numeric distances as uniformly spaced (by 1), which is not meaningful for categorical targets.

#### Logistic Regression

Consider the following setup:

- if the input value is sufficiently large, predict 1

- if the input value is sufficiently small, predict 0

- if the input is near 0 but not small enough, predict 0.5

<img src="https://sebastianraschka.com/images/faq/logistic_regression_linear/1.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Logistic regression models probabilities in the interval $[0,1]$. The probabilities of an input taking label 1 or 0 can be written as:

$$
P(y=1|x) = \frac{1}{1+e^{-\beta^T x}}, \\
P(y=0|x) = \frac{1}{1+e^{\beta^T x}}
$$

As with linear models, logistic regression has parameters. Because they appear inside the denominator, if one variable takes a large positive value, the probability moves closer to 1 in the direction of that variable’s effect.

Maximum Likelihood Estimation (MLE) is computed as follows:

$$
L(\beta) = \prod_{i:y_i=1} P(y_i|x_i) \prod_{j:y_j=0} (1-P(y_j|x_j)), \\
l(\beta) = \sum log(P(y_i|x_i)) + \sum log(1-P(y_j|x_j)) \\
=\sum_{i=1}^{n} [y_i log P(y_i|x_i) + (1-y_i) log(1-P(y_j|x_j))] \\
=\sum_{i=1}^{n} [-y_i log (1+e^{-\beta^Tx_i}) - (1-y_i) log(1+e^{\beta^T x_i})]
$$

However, closed-form solutions are not available by direct differentiation of the above; thus, gradient-based optimization methods such as gradient descent are used.

---

### Bayes Classifier

Risk is the expected loss. For a classifier $f : x \rightarrow y$, it is computed as $R(f) = E_{P(x,y)} [L(y,f(x))] = \sum_x \sum_y P(x,y) L(y,f(x))$, using the expectation with respect to the joint distribution over all $x$.

The Bayes classifier $f^*$ minimizes the risk.

For binary labels $\{1,-1\}$, we can view $f^*$ as $\underset{\hat{y}} {argmin} \sum_y P(y\mid x=x)L(y,\hat{y})$, which leads to the decision rule $\text{sign}\!\left(\log \frac{P(y=1\mid x=x)}{P(y=-1\mid x=x)}\right)$. If the log-odds are positive, predict 1; otherwise, predict −1. Using the log makes the decision intuitive: if the denominator is larger, the ratio is below 1 and the log is negative; if the numerator is larger, the log is positive.

Bayes’ rule is $P(y\mid x) = \frac{P(x\mid y)P(y)}{P(x)}$. Substituting, the decision becomes $\text{sign}\!\left(\log \frac{P(x=x\mid y=1)P(y=1)}{P(x=x\mid y=-1)P(y=-1)}\right)$. Here, $P(y)$ is the prior (before observing $x$), $P(y\mid x)$ the posterior (after observing $x$), and $P(x\mid y)$ the likelihood (probability of $x$ given class $y$).

---

### Discriminant analysis

Since we typically do not know $P(y=1), P(y=-1), P(x=x\mid y=1), P(x=x\mid y=-1)$, we proceed as follows.

It is common to assume unknown densities are Gaussian. Then the rule becomes $\text{sign}\!\left(\log \frac{\mathcal{N}(\mu_1,\sigma_1) \cdot \alpha}{\mathcal{N}(\mu_{-1}, \sigma_{-1}) \cdot (1-\alpha)}\right)$. In 1D, $\mathcal{N}(\mu, \sigma^2) = \frac{1}{\sqrt{2\pi \sigma^2}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$; in $d$ dimensions, $\mathcal{N}(\mu_y, \Sigma_y)=(2\pi)^{-d/2}|\Sigma_y|^{-1/2}e^{-\frac{1}{2}(x-\mu_y)^T\Sigma_y^{-1}(x-\mu_y)}$.

<img src="https://i.sstatic.net/wlIya.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Quadratic Discriminant Analysis (QDA) arises when class covariances are not assumed equal, yielding quadratic decision boundaries. Linear Discriminant Analysis (LDA) assumes equal class covariances (a shared $\hat{\Sigma}$), yielding linear boundaries.

In higher dimensions, the discriminant score can be written as $\delta_k(x)$; for LDA, $\delta_k(x)$ is affine in $x$, and posterior probabilities are obtained via softmax: $\hat{P}(Y=k\mid x)=\frac{e^{\hat{\delta_k}(x)}}{\sum_{l=1}^{K} e^{\hat{\delta_l}(x)}}$.

If labels are well separated, a logistic model may rely heavily on boundary points to distinguish 0 from 1 via the sigmoid/softmax, which can be unstable. Discriminant analysis instead models class-conditional means and covariances, making the decision less sensitive to boundary sparsity.

In the binary case, LDA and logistic regression share a log-odds form. Logistic regression is discriminative (it models $P(y\mid x)$ directly via a parametric form), whereas LDA is generative (it estimates class-conditional densities and priors, then applies Bayes’ rule).

---

### Evaluation

For classification evaluation, we interpret metrics based on TN, TP, FN, and FP.

TP: predict True when the actual label is True; TN: predict False when actual is False; FP: predict True when actual is False; FN: predict False when actual is True.

Type I error: misclassify a True instance as False (FN). Type II error: misclassify a False instance as True (FP).

A better classifier achieves a lower false positive rate and a higher true positive rate. The ROC (Receiver Operating Characteristic) curve plots these trade-offs; the area under this curve is AUC.

---

### Naive bayes

$$
P(x|y) = \prod_{j=1}^{d} P(x_j|y)
$$

In practice, features may be dependent, but Naive Bayes assumes conditional independence within $P(x\mid y)$ across the components of $x$.

Posterior probabilities are then computed by multiplying the likelihood $P(x\mid y)$ with the prior $P(y)$ (followed by normalization).

Zero-frequency issues arise when an outcome never appears in the data, causing products to collapse to 0. A common fix is additive smoothing (e.g., adding a small $\epsilon$). Also, since multiplying many probabilities yields tiny values, we typically work in log-space.

---

### References

[Original source #1](https://youtu.be/AVm27kxxQx0?si=xAfBKHvSeWnch_fF)

[Original source #2](https://youtu.be/pNDZZepjyzQ?si=7onQhUp_noTaeQoU)
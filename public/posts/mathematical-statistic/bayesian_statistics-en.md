---
title: 'Bayesian Statistics'
date: '2023-06-02'
tags: ['Mathematical statistics', 'lecture']
---

### Bayesian Procedures

#### Prior and Posterior Distributions

The essence of Bayesian inference is updating prior knowledge with data using Bayes' theorem.

The conditional pdf or pmf of $X$, $X|\theta \sim f(x|\theta)$, is the distribution of data $\mathbf{X}$ given $\Theta = \theta$. The prior pdf of $\Theta$ follows a prior belief as $\Theta \sim h(\theta)$.

When $X = (X_1, \dots, X_n)$ is a random sample from $f(x|\theta)$, $L(\mathbf{x}|\theta) = \prod_{i=1}^n f(x_i|\theta)$ is the likelihood function.

The posterior pdf $k(\theta|x)$ is the conditional distribution of $\Theta$ after the sample $X=x$ is observed, and is defined by Bayes' theorem as

$$
k(\theta|x) = \frac{g(x, \theta)}{g_1(x)} = \frac{L(x|\theta)h(\theta)}{g_1(x)},
$$

where $g_1(x)$ is the marginal pdf of $X$ and is a normalizing constant that does not depend on $\theta$. Therefore, the posterior pdf is proportional to the product of the likelihood and the prior pdf.

If a sufficient statistic $Y = u(X)$ exists, the posterior pdf can be simplified using the pdf $g(y|\theta)$ of the sufficient statistic $y$:

$$
k(\theta|y) \propto g(y|\theta)h(\theta).
$$

#### Bayesian Point Estimation

$$
\delta(x) = \text{argmin} \int_{-\infty}^\infty L[\theta, \delta(x)]k(\theta|x) d\theta
$$

From a Bayesian perspective, point estimation of $\theta$ means selecting a decision function $\delta(x)$ that minimizes a loss function $L[\theta, \delta(x)]$.

If we define $\theta \in \omega_0$ under the null hypothesis and $\theta \in \omega_1$ under the alternative hypothesis, the Bayesian procedure uses the posterior distribution $k(\theta|x)$ to compute the conditional probability of each hypothesis. It adopts the hypothesis with the larger conditional probability.

---

### More Bayesian Ideas

The predictive distribution $g_1(x)$ is called the pdf of the predictive distribution, where the marginal pdf $g_1(x) = \int_{-\infty}^\infty L(x|\theta)h(\theta)d\theta$.

#### Conjugate priors

For a specific probability distribution family $f(x|\theta)$, if the posterior pdf belongs to the same distribution family as the prior pdf, that prior pdf family is called a conjugate family.

#### Improper prior

Sometimes we use special prior distributions when we have little prior knowledge or wish to give equal weight to all $\theta$ values.

When a prior pdf $h(\theta) \ge 0$ is not a pdf but the posterior function $k(\theta|\mathbf{x})$, proportional to $L(\mathbf{x}|\theta)h(\theta)$, can be made into a pdf that integrates to a positive value, this $h(\theta)$ is called an improper prior.

#### Noninformative prior

Continuous noninformative priors are often improper. For the normal distribution $N(\theta_1, \theta_2)$, the noninformative prior for the mean $\theta_1$ is $h_1(\theta_1) = 1$.

---

### Gibbs Sampler

#### Simple Monte Carlo estimation

Bayesian estimators $\delta(y)$ generally involve integrals and are often not computable in closed form.

For example, when a normal logistic model exists as $Y|\theta \sim N(\theta, \sigma^2/n)$ and the prior distribution $\Theta$ is a logistic distribution, the mean of the posterior distribution $\delta(y) = E(\Theta|y)$ is the ratio of two integrals:

$$
\delta(y) = \frac{\int_{-\infty}^\infty \theta w(\theta) h(\theta) d\theta}{\int_{-\infty}^\infty w(\theta) h(\theta) d\theta} = \frac{E[\Theta w(\Theta)]}{E[w(\Theta)]},
$$

where $w(\theta) = f(y|\theta)$ is the likelihood function considered as a function of $\theta$, and the expectation $E[\cdot]$ is taken with respect to the prior distribution $h(\theta)$.

$$
T_m = \frac{m^{-1} \sum_{i=1}^m \Theta_i w(\Theta_i)}{m^{-1} \sum_{i=1}^m w(\Theta_i)}
$$

The simple Monte Carlo estimator $T_m$ estimates $\delta(y)$ by independently generating $\Theta_1, \dots, \Theta_m$ from the prior distribution. By the weak law of large numbers, $T_m \to \delta(y)$ as $m \to \infty$.

#### Gibbs Sampler estimation

The Gibbs sampler is a Markov Chain Monte Carlo (MCMC) algorithm that generates samples from complex multivariate distributions using only conditional distributions.

Generate $Y_i$ from $Y_i|X_{i-1} \sim f(y|x)$. Then generate $X_i$ from $X_i|Y_i \sim f(x|y)$. This process forms a Markov chain because it generates the next state depending only on the current state $(X_{i-1}, Y_{i-1})$.

For sufficiently large $i$, the generated $X_i$ and $Y_i$ converge to the marginal distributions of $X$ and $Y$, respectively.

---

### References

[Original source #1](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)

---
title: 'Overfitting and Regularization'
date: '2022-07-19'
tags: ['Machine Learning', 'lecture']
---

### Overfitting

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfyZujKWwrLfuHBADbRrfaj8DUnjATuNYitA&s" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

It is wise to divide the dataset into train, validation, and test sets, and select a model with low error on validation rather than choosing a model that is overfitted to training data with small error.

<img src="https://miro.medium.com/v2/resize:fit:1400/1*0VWDpLIRcMTssDf-zyOR4w.jpeg" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

During training, it is natural for the training curve to steadily decrease, while the validation curve typically decreases and then rises in the middle. In the early stages, both training and validation curves decrease slowly. At some point, the validation curve becomes flat, after which overfitting to minor features present in the training data progresses.

<img src="https://cdn.prod.website-files.com/614c82ed388d53640613982e/6360ef26a44bba38e5a48fb2_good-fitting-model-vs-overfitting-model-1.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Overfitting occurs when a model learns not only the general trends but also the noise in the training data, resulting in gradually improving training curves but deteriorating validation curves. This typically happens when the data amount is insufficient relative to the dimension $n$ (ideally, at least $e^n$ data points should exist). On the other hand, underfitting occurs when even the general trends of the training data are not well learned, making normal classification impossible. We need to find an appropriate balance between these two extremes.

---

### Early stopping

This method emerged from considering at which point to stop before overfitting occurs, specifically when the validation curve becomes flat.

When train, validation, and test sets are split under the i.i.d assumption with sufficient data quantity, the moments when noise present in training data is absent from validation and from test are independent, but they are likely to occur at similar time points.

---

### Regularization

<img src="https://ethanwicker.com/assets/img/2021-03-03-regularization-ridge-regression-lasso-001-fig-1.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Model selection through cross-validation by combining multiple results is a good method, but it is time-consuming.

Therefore, we guide the variables $\beta_i$ between underfitting and overfitting to be 0 when not used and non-zero values when used.

#### Shrinkage methods

<img src="https://journals.sagepub.com/cms/10.1177/1536867X20909697/asset/989c252a-d88a-45dc-8cc7-ee313b9aa8c9/assets/images/large/10.1177_1536867x20909697-fig1.jpg" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

These are methods that impose constraints to make coefficient values approach zero.

Least squares minimizes the residual sum of squares (RSS) to estimate $\beta_0, \beta_1, \dots, \beta_p$.

Ridge regression adds constraints to least squares. The constraint is $\lambda|\beta|_2^2$, adding squared terms to define $RSS=\sum_{i=1}^{n}(y_i-(\hat{\beta_0} + \hat{\beta_1}x_i))^2 + \lambda|\beta|_2^2$. The constraint is minimized when $\beta$ is 0, and having values in either positive or negative directions opposes the minimization objective. The $\lambda$ coefficient is adjusted so that the constraint can increase when least squares is minimized. When the constraint is plotted, ridge forms a circle. Therefore, each coefficient decreases toward 0 at the same rate but never reaches 0.

Next, Lasso regression adds absolute values. The constraint is $\lambda|\beta|_1$, and while the purpose is the same as above, Lasso treats sparse models with small subsets. Unlike Ridge, some coefficients can become 0.

Before applying such constraints, it is necessary to standardize the data because each coefficient will have different scales, requiring standardization for scale equivariance.

As the $\lambda$ coefficient increases, the model becomes simpler and overfitting weakens. This results in lower variance and higher bias. This parameter is also determined through cross-validation by checking which value in the range $[0,1]$ provides the best fit.

---

### Model selection

The fewer the number of coefficients (parameters), the simpler (=rigid) the boundaries and the smoother the gradients. Conversely, more parameters result in flexible boundaries and irregular gradients.

When a strong constraint parameter $\lambda$ is applied, the model becomes simpler and underfitting occurs.

---

### References

[Original source #1](https://youtu.be/5nVeXPeGDYM?si=GUJ_onQFYi2mXMlt)
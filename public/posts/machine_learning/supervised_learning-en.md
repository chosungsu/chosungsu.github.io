---
title: 'Supervised learning'
date: '2022-07-08'
tags: ['Machine Learning', 'lecture']
---

### Artificial Intelligence

Artificial Intelligence (AI) is the process of making machines or software intelligent. Here, 'intelligence' refers not to the level of intelligence naturally possessed by humans or animals, but to an artificially created level.

While it would be ideal to raise AI intelligence to human levels, the human brain performs countless roles and is complex, so we are still only at the stage of simply mimicking it.

<img src="https://i0.wp.com/www.phdata.io/wp-content/uploads/2022/03/Data-Science-Terms-You-Should-Know-The-Difference-Between-AI-ML-and-DL-Image-1.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Machine Learning is a field of artificial intelligence that uses statistical algorithms to learn from visible data and apply it to unseen data.

<img src="https://cdn.prod.website-files.com/614c82ed388d53640613982e/63ef769f6a877d715fa75008_supervised%20vs%20Unsupervised%20learning.jpg" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

The field of machine learning includes supervised learning and unsupervised learning, as shown in the image above. Supervised learning can show high performance when labels are predetermined and large amounts of data are built up. Unsupervised learning allows models to infer labels themselves even without labels.

---

### Supervised learning

Supervised learning is a data-driven approach. When a model is simply designed as $f(x)=ax$, the model's target $y$ is defined such that $y=f(x)$. The parameter $a$ is learned through training data pairs $\{(x_i,y_i) : i=1, \dots, n\}$ to approach the target, so that unseen data $x$ can be estimated as $\hat{y}=ax$ to obtain the estimate $\hat{y}$.

<img src="https://louis.pressbooks.pub/app/uploads/sites/63/2023/07/8.8-01.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Regression, one type of supervised learning, follows the above approach where $x$ is the input and $y$ is the output. Among multiple $x$ sets, some variables may play relatively less important roles in representing the result $y$. As shown in the image, when $x$ is between $60$ and $80$, the output values are clustered, which can be expressed mathematically as $f(60<x<80)=E(y|x=\{60<x<80\})$.

Most statistical learning methods are classified as either parametric or non-parametric. Parametric models represent the relationship between input and output, which can be expressed mathematically as $f_L(x)=\beta_0 + \beta_1 x_1 + \beta_2 x_2 + \cdots + \beta_p x_p$. For example, when variables include education and seniority, we can draw lines or planes by multiplying each parameter to predict the output value.

In contrast, non-parametric methods use function $f$ to take the data point with the closest value from the training data. Parametric methods assume linearity, while non-parametric methods make no such assumptions.

---

### Regression Function $f(x)$

The mean squared error between the true point $Y$ and the predicted point $\bar{f}(X)$ for $X=x$ can be expressed as $E[(Y-\bar{f}(X))^2|X=x]$. Here, the true point can be replaced by $f(X)$ and decomposed as the sum of an inevitable error term $\epsilon$. Therefore, it can be expanded as $E[(f(X) + \epsilon + \bar{f}(X))^2|X=x]=|f(x)-\bar{f}(x)|^2+Var(\epsilon)$.

$\epsilon=y-f(x)$ is irreducible error that still causes errors in prediction even when we know the true point. Therefore, regression models aim to minimize the reducible part $|f(x)-\bar{f}(x)|^2$ as much as possible.

When evaluating with MSE on training data, the model will show overfitting on the training data. This is because the training data acts as visible data. However, the real goal is the ability to perform well on unseen new data.

---

### Bias Variance Trade off

$$
E[y_0-\bar{f}(x_0)]^2=Var(\bar{f}(x_0)) + [Bias(\bar{f}(x_0))]^2 + Var(\epsilon)
$$

As shown above, when training the $\bar{f}(x)$ model to fit, the expected value of the squared error between the actual value and the predicted value can be expressed as the sum of the variance of the predicted value, the square of the bias (the tendency to deviate from the true value), and the variance of the error.

---

### Classification Problem

When the target values are qualitative or categorical, it is called a classification problem. Therefore, this problem aims for the model $f(x)$ to accurately observe class labels. For evaluation, while regression uses the error between the true and predicted values, classification checks the consistency between the true and predicted values.

---

### References

[Original source #1](https://youtu.be/t4mnIljwN7M?si=4JphpNxaFO8PF_tZ)
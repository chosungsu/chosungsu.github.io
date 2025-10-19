---
title: 'Linear Regression'
date: '2022-07-12'
tags: ['Machine Learning', 'lecture']
---

### Linear Regression

Linear regression is one of the simple supervised learning methodologies that assumes each set of $x$ variables has linearity with respect to $y$. However, not all regression functions in the world are linear.

#### 1. Simple LR

$$
y=\beta_0+\beta_1 x + \epsilon
$$

The above equation is the simplest linear regression equation, where $\beta_0$ and $\beta_1$ are unknown elements called coefficients or parameters.

When we convert the above equation to an estimation equation, $\epsilon$ disappears as shown below.

$$
\hat{y} = \hat{\beta_0} + \hat{\beta_1} x
$$

Now, to estimate well, we define the Residual Sum of Squares (RSS) as $\text{RSS} = e_1^2 + e_2^2 + \dots + e_n^2 = (y_1 - (\hat{\beta_0} + \hat{\beta_1} x_1))^2 + \dots + (y_n - (\hat{\beta_0} + \hat{\beta_1} x_n))^2$.

$$
\beta_1 = \frac{\sum_{i=1}^{n} (x_i-\bar{x})(y_i - \bar{y})}{\sum_{i=1}^{n} (x_i-\bar{x})^2}, \\
\beta_0 = \bar{y} - \hat{\beta_1} \bar{x}
$$

In the above equations, $\bar{x}$ is the mean of all $x$ sets, and $\bar{y}$ is the mean of all $y$ sets. The method for finding these parameters is defined below.

$$
\frac{\partial}{\partial \hat{\beta_0}} \sum_{i=1}^{n}(y_i-(\hat{\beta_0} + \hat{\beta_1} x_i))^2 \\
= -2 \sum_{i=1}^{n}(y_i-(\hat{\beta_0} + \hat{\beta_1} x_i)) = 0 \\ 
\Leftrightarrow \sum_i y_i - n \hat{\beta_0} - \hat{\beta_1} \sum_ix_i \\ 
\Leftrightarrow \beta_0 = \bar{y} - \hat{\beta_1} \bar{x}, \\
\frac{\partial}{\partial \hat{\beta_1}} \sum_{i=1}^{n}(y_i-(\hat{\beta_0} + \hat{\beta_1} x_i))^2 \\
= -2 \sum_{i=1}^{n}x_i(y_i-(\hat{\beta_0} + \hat{\beta_1} x_i)) = 0 \\
\Leftrightarrow \sum_{i=1}^{n}x_i(y_i-(\bar{y} - (\hat{\beta_1} \bar{x} - \hat{\beta_1} x_i))) \\
\Leftrightarrow \sum_{i=1}^{n}x_i(y_i-\bar{y}) - \sum_{i=1}^{n} \hat{\beta_1}x_i(x_i-\bar{x})
$$

#### 2. Assessing accuracy

Residual Standard Error (RSE) is $\sqrt{\frac{RSS}{n-2}}$, an evaluation function that minimizes the square root of the sum of squared differences between true and predicted values. Root Mean Squared Error (RMSE) is slightly different from RSE but has the same basic concept. It is calculated as $\sqrt{\sum\frac{(\hat{y_i}-y_i)^2}{n}}$. The reason the denominator differs between $n-2$ and $n$ is that there is a proof that $n-2$ is needed for the bias to converge to zero. However, in practice, since $n$ is assigned a large value, this is not a major concern.

Additionally, $\text{R}^2$ uses the total sum of squares $\text{TSS} = \sum_{i=1}^{n} (y_i - \bar{y})^2$ and is expressed as $1-\frac{RSS}{TSS}$.

---

### Maximum likelihood

#### 1. Least squares

When evaluating regression functions, the reason for squaring and then taking the square root is called the method of least squares or simply least squares.

The reason for squaring is that when using the difference between actual and predicted values, negative values can occur, not just positive ones. Therefore, squaring ensures that both positive and negative values have the same error direction. However, squaring is not the only way to achieve this. For example, using absolute values or expressing actual and predicted values as fractions close to 1 are also possible.

#### 2. I.I.D

To clarify this reason, I will explain I.I.D (Independent and Identically Distributed). It literally means independent and identically distributed trials, where the current trial is not influenced by or does not influence previous or subsequent trials, and there is a constraint that the probability of any outcome in each trial must remain unchanged and identical.

Now, when we have a probability distribution $P_{\theta} (x)$ that follows the above constraints and a sample set of $n$ samples $x_1, x_2, \dots, x_n$, the likelihood can be defined as the probability of observing certain values when sampling $n$ times from the observed dataset. Therefore, it can be expressed mathematically as follows.

$$
L(\theta; x_1, \dots, x_n) \\ 
= P_{\theta}(x_1) \times \dots \times P_{\theta}(x_n) \\ 
= \prod_{i=1}^{n} P_{\theta}(x_i)
$$

There is also a variant called log-likelihood, which is the above equation with logarithms attached, expressed as $\sum_{i=1}^{n} log P_{\theta} (x_i)$. Since likelihood involves continuously multiplying probability values, it tends to get closer to zero, and this variant compensates for the values by transforming the multiplication into summation through $\sum$.

#### 3. MLE

In the process of finding the $\theta$ that maximizes the result, the presence or absence of logarithms does not cause problems since they find the same value $x$. The formula for finding it is as follows.

$$
\hat{\theta}(x_1, \dots, x_n) = \text{argmax}_{\theta} L(\theta;x_1, \dots, x_n) \\
= \text{argmax}_{\theta} l(\theta;x_1, \dots, x_n) \\
= \text{argmax}_{\theta} \sum_{i=1}^{n} log P_{\theta}(x)
$$

To find the $\theta$ that maximizes this, we go through two processes: 1) Check if the derivative equals zero: $\nabla l(\theta) = 0$ or $\frac{\partial l(\theta)}{\partial \theta_j} = 0$, 2) Check if the second derivative is negative: $[H(\theta)]_{ij} = \frac{\partial^2 l(\theta)}{\partial \theta_i \partial \theta_j}$.

As an example of MLE, there is the Bernoulli trial, which assigns probability value $x$ to some trials and probability value $1-x$ to the remaining trials during several trials, so it is expressed as $P_{\theta} (x) = log \theta^x(1-\theta)^{1-x}$. This can be applied to develop Maximum likelihood as $\text{argmax}_{\theta} (log \theta\sum_{i=1}^{n}x_i + log(1-\theta)\sum_{i=1}^{n}(1-x_i))$.

Next, there is also the Gaussian distribution, which is $P_{\theta} (x) = \frac{1}{\sigma \sqrt{2\pi}} e^{-\frac{1}{2}(\frac{x-\mu}{\sigma})^2}$ and is used when there are two unknown parameters $\theta = (\mu, \sigma)$ in a normal distribution. We substitute this into the MLE formula and differentiate with respect to $\mu$ and $\sigma$ respectively to find the maximum values. In $l(\theta) = \sum_{i=1}^{n} log \frac{1}{\sigma \sqrt{2\pi}} - \sum_{i=1}^{n} \frac{1}{2} (\frac{x_i - \mu}{\sigma})^2$, for the first case, the parameter value where $\frac{\partial l(\theta)}{\partial \mu} = \sum_{i=1}^{n} (\frac{x_i-\mu}{\sigma}) = 0$ is when $\sum_{i=1}^{n} x_i = \sum_{i=1}^{n} \mu$, i.e., $\mu = \frac{1}{n} \sum_{i=1}^{n} x_i$. For the second case, the parameter value where $\frac{\partial l(\theta)}{\partial \sigma} = -\frac{n}{\sigma} - \frac{1}{2}(-2)\sigma^{-3}\sum_{i=1}^{n} (x_i-\mu)^2 = 0$ is $\sigma^2 = \frac{1}{n} \sum_{i=1}^{n} (x_i - \mu)^2$.

#### 4. Re-write LR

Now we can express Linear regression in matrix form.

$$
y= \begin{bmatrix} 1 & x_{11} & \cdots & x_{1p} \\ 1 & x_{21} & \cdots & x_{2p} \\ \vdots & \vdots & \ddots & \vdots \\ 1 & x_{n1} & \cdots & x_{np}\end{bmatrix} \begin{bmatrix} \beta_0 \\ \vdots \\ \beta_p\end{bmatrix} + \epsilon
$$

---

### LR with categorical features

Moving to categorical problems, for example, if we define credit card amount as $y$ and home ownership as $x$, and express this in the linear regression equation $y_i = \beta_0 + \beta_1 x_i + \epsilon_i$, if $x_i$ is 1, it means ownership, so the equation remains as $y_i = \beta_0 + \beta_1 + \epsilon_i$, and if $x_i$ is 0, it means no ownership, so the equation can be thought of as $y_i = \beta_0 + \epsilon_i$.

#### 1. One hot Encoding

Now, as a representative example of methods used when categorical features are all mixed in one column, one-hot encoding expands the columns. For example, if there are TeamA, TeamB, TeamC, etc. in a team column, it creates as many columns as there are categories and assigns discrete variables 1 and 0.

#### 2. Modeling interactions

Previously, we considered that variables maintain linearity without interactions (causal relationships) according to i.i.d, but if we change the assumption to have interactions and non-linearity, for example, in marketing, instead of running advertisements independently on TV and radio, there are cases where they influence each other to show the same advertisement. If we proceed with this, the condition of having linearity is broken, but from a marketing perspective, we can judge that we can obtain a synergy effect, which is a greater advantage than this. Expressed as a model, it is as follows.

$$
y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \beta_3 x_1x_2 + \epsilon
$$

When adding interaction terms, it should be noted that even if the p-value of that term is low, individual terms may not be significant, and if there are two or more terms, all subset terms must also be included.

#### 3. Feature selection

Least squares becomes $\hat{\beta} = [\hat{\beta_0}, \dots, \hat{\beta_p}]^T = (X^TX)^{-1} X^Ty$, and when the inverse matrix does not exist, it cannot be calculated. The situation where the inverse matrix does not exist occurs when the information provided by each variable is not independent, i.e., when there is overlapping information.

Therefore, looking at feature selection, which is one of the methods to prevent such problems, it involves selecting a few important variables from all possible sets and proceeding with learning. However, this method has the disadvantage that the cost can become high. For example, when $n=40$, selecting these variables one by one consumes $2^p$.

Stepwise selection method initially selects no variables and determines which variable to add next among a total of $n$ variables, selecting the best case.

Finally, stagewise selection method excludes previously selected and fitted variables and only fits newly selected variables. However, a loop is formed so that once selected variables can be selected again.

---

### References

[Original source #1](https://youtu.be/JxA8pBN-fOs?si=aqYabc2nH25IfXKH)

[Original source #2](https://youtu.be/awNk9DtxPjw?si=wPmGPKw4bVf4eRP1)
---
title: 'Support vector machines'
date: '2022-07-29'
tags: ['Machine Learning', 'lecture']
---

### Preliminary

<img src="https://3.bp.blogspot.com/-WRljZgqt6mA/WtmZkQMgy4I/AAAAAAAAB2Q/GMR7N3TzR3gvkqh1VuYBIsf931fXuhr1ACLcBGAs/s1600/Hyperplane.jpg" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

In binary situations, the simplest way to separate data points is to draw a hyperplane. At this time, a hyperplane is drawn in $p-1$ dimensions when dividing a $p$-dimensional space.

$$
\beta_0 + \beta_1 x_1 + \dots + \beta_p x_p = 0
$$

The general formula is as above, and $\beta_i$ is called a normal vector. Therefore, it is perpendicular to the hyperplane. The direction the normal vector points to has a positive value, and the opposite has a negative value.

The method of separating hyperplanes is to have the largest gap or margin between two classes. Therefore, the objective function is $\underset{\beta_0, \dots, \beta_p}{\text{maximize}} M$, and the constraints are set as $\sum_{j=1}^{p} \beta_j^2 = 1$, $y_i(\beta_0 + \beta_1 x_{i1} + \dots + \beta_p x_{ip}) \ge M$.

---

### Support vector machines

#### 1. Binary classification

In a binary environment where $y \in \{+1, -1\}$, a margin-based classifier works as follows: if the angle between $\beta$ and $x$ is less than 90 degrees based on the normal vector, then $\beta^Tx > 0 \rightarrow \hat{y} = +1$ holds, and if it's greater than 90 degrees, then $\beta^Tx < 0 \rightarrow \hat{y} = -1$ holds. If it's exactly 90 degrees, it cannot be determined.

For example, if $\beta$ and $x$ exist arbitrarily, $x_{||}$ is on the same plane as the decision boundary, and $x_{\bot}$ is on the same plane as $\beta$, then by definition $x = x_{\bot} + x_{||}$ can be obtained. Multiplying both sides by $\beta^T$ gives $\beta^T x = \beta^T x_{\bot} + \beta^T x_{||}$ and $\beta^T x_{||} = 0$. Expanding this equation again using the distance $r$ from the decision boundary to $x$ gives $\beta^T x = \beta^T \cdot (\frac{r}{|\beta|} \cdot \beta)=\beta^T \cdot (\frac{r}{|\beta|} \cdot |\beta|)cos0=r|\beta|$, so we can find that the distance is $r=\frac{\beta^T x}{|\beta|}$.

Now, finding the decision boundary that maximizes the shortest distance (margin) from this normal vector becomes the objective function.

#### 2. Primal problem

Since the core of this problem is when the inner product is positive, using $y_i \beta^T x_i \ge 1$ allows us to exchange part of the objective function. Therefore, the remaining objective function is $\underset{\beta}{\text{argmax}} \frac{1}{|\beta|} = \underset{\beta}{\text{argmin}} {|\beta|}$. For convenience in differentiation, we can think of $|\beta| = \frac{1}{2} |\beta|^2$.

#### 3. Lagrange Multiplier

This is a function that finds local optima while satisfying inequality constraints. If the expression to be optimized is $f(x)$ and each constraint is $g(x) = 0$, it is defined as $L(x,\lambda) = f(x) + \lambda \cdot g(x)$.

Then we find the solution where the results of differentiating with respect to parameters $x$ and $\lambda$ respectively become 0.

Substituting the remaining objective function above, we can write $L(x, \lambda) = \frac{1}{2} |\beta|^2 - \sum_{i=1}^n \lambda_i (y_i \beta^T x_i - 1)$. Now the derivative with respect to $\beta_j$ is $\frac{\partial L}{\partial \beta_j} = \beta_j - \sum_{i=1}^{n} \lambda_i y_i x_{i,j} = 0$, that is, $\beta = \sum_{i=1}^{n} \lambda_i y_i x_{i}$. After substituting $\beta$ again and taking the inner product, it transforms to $L(x, \lambda) = -\frac{1}{2} <\sum_{i=1}^{n} \lambda_i y_i x_{i}, \sum_{i=1}^{n} \lambda_i y_i x_{i}> + \sum_{i=1}^{n} \lambda_i$.

Therefore, the final classifier is given as $\hat{y} = sign(\beta^T x) = sign(\sum_{i=1}^{n} \lambda_iy_ix_i^Tx)$.

#### 4. Support vector machines

That is, SVM aims to find the data points closest to the boundary and draw the decision boundary (=hyperplane) positioned farthest from those points.

If we consider positive and negative directions in the final classifier, it can be viewed as $sign(\sum_{i \in S^+} \lambda_ix_i^Tx - \sum_{j \in S^-} \lambda_jx_j^Tx)$.

However, SVM also tends to fit well in generally linear cases, so it is not robust to noisy data. Therefore, slack variables are introduced. We still train a maximum margin classifier, but it moves with the purpose of maximizing the margin while reducing the misclassification rate.

Slack variables $\xi_i$ are based on the constraint $y_i\beta^Tx_i \ge 1$ for each data point. If this value is greater than 1, then $\xi_i = 0$ corresponds to non-support vectors (=no violation). If support vectors have $0 < \xi_i < 1$, they are still inside the decision boundary, and if $1 \le \xi_i$, they are outside the decision boundary. Generalizing this gives $\xi_i = max(0, 1-y_i\beta^Tx_i)$.

<img src="https://learnopencv.com/wp-content/uploads/2018/07/svm-parameter-c-example.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

$$
\underset{\beta} {\text{argmin}} (\frac{1}{2} |\beta|^2 + C \sum_{i=1}^n \xi_i)
$$

Now the objective function can be expressed with additional constraints as above. Here, when the $C$ value is large, it focuses on reducing the misclassification rate, and when it becomes smaller, it moves in the direction of further minimizing the margin.

---

### References

[Original source #1](https://youtu.be/03W3sR__-mY?si=5yumhT816cd2LNrX)
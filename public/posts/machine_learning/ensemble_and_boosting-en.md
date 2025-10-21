---
title: 'Ensemble and Boosting'
date: '2022-07-26'
tags: ['Machine Learning', 'lecture']
---

### Bootstrapping

<img src="https://media.geeksforgeeks.org/wp-content/uploads/20240610153827/Bootstrap-Method.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Machine learning faces difficulties when the amount of data is limited. However, bootstrapping prioritizes improving the current situation rather than obtaining new data. It is a method of continuously extracting some data from what we currently have to fit individual models. Instead, when extracting, it allows overlapping data by using replacement rather than non-replacement.

$$
SE_B(\hat{\alpha}) = \sqrt{\frac{1}{B-1} \sum_{r=1}^B (\hat{\alpha^{*r}} - \bar{\hat{\alpha^*}})^2}
$$

When we have original data $Z$, we extract $B$ bootstrap datasets as much as the set $Z^{*1}, \dots, Z^{*B}$. Then we estimate the parameter $\alpha$ from each dataset, and the standard error $\hat{\alpha}$ for this is estimated as above.

Bootstrapping assumes that all samples follow i.i.d (independent identically distributed), but for example, in time series data where order has meaning, we cannot ignore that order. In such cases, we can extract by processing in blocks, but this can be considered a limitation of bootstrapping.

Bootstrap extracts $k$ datasets, learns with $k-1$ of them, and then validates with one dataset. This process requires no overlap in $k$-fold cross validation to estimate prediction error, but bootstrap inherently causes overlap because it uses replacement sampling. The scale of non-overlapping data is that if there are $n$ replacement sampling processes to create one dataset, there will be data points that are never selected with probability $(1-\frac{1}{n})^n$, which converges to $lim_{n \rightarrow \infty} (1 - \frac{1}{n})^n = e^{-1} \approx \frac{1}{3}$. Conversely, the probability of having overlapping data is $1-\frac{1}{3} = \frac{2}{3}$.

---

### Bagging

<img src="https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F271a92b4-5bd3-4cb1-9523-67460d1d95a3_2667x1646.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

$$
\hat{f}_{bag}(x) = \frac{1}{B} \sum_{b=1}^{B} \hat{f}^{*b}(x)
$$

If there are $B$ bootstrap datasets and the model trained on training data is $\hat{f}^{*b}(x)$, we can average the predictions. Since this is a simple average, it can be used generally for both regression and classification.

It reduces variance but does not affect bias. This is because even though models trained on each bootstrap sample make different predictions, taking the average reduces the variance of the predictions. On the other hand, bias is maintained as it is for individual models since each model learns from similar training data.

In bagging, a single model is defined as $E_{s} = E_x[(y_b(x) - h(x))^2] = E_x[\epsilon_b(x)^2]$, and the average is obtained as $\frac{1}{B} \sum_{b=1}^{B} E_x[\epsilon_b(x)^2]$. Here, $h(x)$ represents the true label, and $\epsilon$ represents the error of the $b$-th model.

Now, the combined model is defined as $E_{c} = E_x[(y(x)-h(x))^2] = E_x[(\frac{1}{B} \sum_{b=1}^{B}(y_b(x) - h(x)))^2]$, which is the error calculated after averaging the predictions of each model.

At this time, the following relationship holds by Jensen's inequality.

$$
E_c \leq E_s
$$

That is, the prediction error of the combined model is less than or equal to the average prediction error of individual models. This is due to the properties of convex functions. Since the square function is convex, squaring after taking the average is less than or equal to the average of individual squares.

If each model is completely independent and has the same error distribution, the prediction error of the combined model becomes $\frac{1}{B}$ times the error of a single model.

---

### Bagging with Decision trees

Random forests extract training samples using bootstrap from basic Decision trees and select $m$ random subsets from the total $p$ predictors for each tree. The size of $m$ is suitable at around $\sqrt{p}$.

---

### Boosting

<img src="https://substackcdn.com/image/fetch/$s_!_sOz!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3ed1ed6d-2387-47f9-817e-26cfd74843ce_2667x1939.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

While bagging is an algorithm that extracts multiple copies of data using bootstrap from original data and combines individual model results to create a single model, boosting is similar but differs in that it induces sequential learning through weak learners.

In weak learners, learner means a single model and should bring better results than random prediction. It adjusts weights in the next learning based on current model performance.

For binary labels, sample weights are set with $D_1(i) = \frac{1}{n}$ and start with uniform distribution. $T$ base learners will be learned sequentially, and each learner is trained on training data sampled with weight $D_t$. The error rate is obtained as $\epsilon_t = P_{D_t}[h_t(x_i) \ne y_i]$ and a log value is created as $\alpha_t = \frac{1}{2} log \frac{1-\epsilon_t}{\epsilon_t}$. Using this, for samples that correctly predicted with $\forall D_{t+1}(i) = D_t(i) e^{-\alpha_t y_i h_t(x_i)}$, the weight $D_{t+1}$ at the next time point should be smaller than $D_t$, and in the opposite case, it should be larger than $D_t$. After that, it is normalized as $D_{t+1}(i) = \frac{D_{t+1}(i)}{\sum_{j=1}^{n} D_{t+1}(j)}$ so that the sum of the denominator becomes 1, and the result $H(x)$ is defined as the value $sign(\sum_{t=1}^T \alpha_th_t(x))$ with sign taken.

If the $\alpha$ value is positive, it means the correct probability is greater than the error probability, and if negative, the opposite. However, base classifiers must be boosted to have at least 50% correct probability. Boosting has robust characteristics against overfitting.

Regression boosting proceeds with learning through residuals, setting $f(x)=0$, $r_1(i)=y_i$, where the initial value of residuals can be thought of as the entire label. The base learner updates to a new base learner $f(x) \leftarrow f(x) + \lambda f_t(x)$ through training data pairs $\{x_i, r_t(i)\}$. The residuals are updated as $r_{t+1}(i) = r_t(i) - \lambda f_t(x_i)$. The result of the boosting model is $f(x) = \lambda (f_1(x) + \dots + f_T(x))$, where the shrinkage parameter $\lambda$ manages the gradual process and allows attacking residuals through different learners.

---

### References

[Original source #1](https://youtu.be/jske-PHPTHw?si=BZ-sv_yRopi9Kkbj)
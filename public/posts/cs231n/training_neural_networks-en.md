---
title: 'Training neural networks'
date: '2024-02-23'
tags: ['cs231n', 'lecture']
---

### activation functions

<img src="https://velog.velcdn.com/images%2Ffbdp1202%2Fpost%2F4085832e-c81b-4b38-ae14-4f67d4fa9c49%2Fcs231n-06-001-Activation_Functions_01.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Activation is a function applied to the results obtained from fully connected layers before sending them to the next node. Usually, it is a non-linear function.

#### 1. sigmoid

<img src="https://hvidberrrg.github.io/deep_learning/activation_functions/assets/sigmoid_function.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Sigmoid is commonly used for singular or binary classification. However, it is only used for the final output due to the gradient vanishing problem. As can be seen in the image above, the curves at both ends have gradients that converge to almost 0, causing problems when backpropagation is performed as values converging to 0 are continuously multiplied. Second, there is the problem of not being zero-centered. When all inputs are positive, the forward pass gradient of sigmoid is $x$, and since this sign makes all weights move in the same direction, only 2 out of 4 quadrants are utilized for updates, making it inefficient. Finally, exponential operations are computationally expensive.

#### 2. tanh

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9ry0AN6TccJ3zFLN17JNkIZ_D5eNgFy3g4A&s" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

It solves the zero-centered problem of sigmoid. However, problems 1 and 3 still exist.

#### 3. relu

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1FnGy2l0vT9GyQZzoHWE1nKR3Jbxdkom5aw&s" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

It is a function that converges 6 times faster than sigmoid and tanh. However, it also has the zero-centered problem as it doesn't use all values below 0, and it can fall into dead relu.

#### 4. leaky relu

<img src="https://media.licdn.com/dms/image/v2/D4D22AQHERBEX35wHlg/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1730451358786?e=2147483647&v=beta&t=d6-2D9FjHhgP1BV_k8q_wg9r07kNES6faN3HmPHr8iI" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Therefore, it allows the use of values below 0 by multiplying by 0.01. It is said that leaky relu is generally used a lot.

---

### data preprocessing

Data preprocessing commonly uses zero-centered and normalized methods.

In images, since values are already limited to 0~255, zero-centered is used instead of normalization which causes scale changes.

Scale adjustments include standard scaler, robust scaler, minmax scaler, and normalizer.

PCA and whitening techniques are not commonly used in images.

PCA is used to normalize data, create a covariance matrix, and reduce dimensions by keeping only important ones, while whitening is a method that makes inputs uncorrelated, sets variance to 1, and normalizes by dividing eigenbasis by eigenvalues.

---

### weight initialization

The case where weights are 0 is called the gradient vanishing problem, and there is a method using random values scaled to 0.01 (small random numbers), but this also causes problems in deep networks.

#### xavier initialization

While the above used fixed scaling like 0.01, xavier is a method that normalizes by the number of nodes.

---

### normalization

#### 1. batch normalization

$$
\hat{x^k}=\frac{x^k-E(x^k)}{\sqrt{var(x^k)}}
$$

Using the above formula, it prevents the input image distribution from changing at each layer of the network. Therefore, it is placed in the position of fully connected layer $\rightarrow$ BN $\rightarrow$ activation function. Here, when BN is used, the input image always becomes unit gaussian.

To solve the internal covariate shift problem that occurs as the network becomes deeper and learning slows down, gamma value (scaling) adjusts the variance of BN and beta value (shifting) adjusts the mean. Note that if gamma is already the standard deviation and beta is the mean, it is equivalent to not doing BN.

#### 2. layer normalization

<img src="https://velog.velcdn.com/images%2Ffbdp1202%2Fpost%2Ffb21f3bb-76e1-4204-8605-c20584228ba8%2Fcs231n-06-027-LN_02.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Unlike BN which normalizes batch and $w$, $h$, LN normalizes depth and $w$, $h$ within one batch.

---

### optimization

Generally, SGD has several problems.

Very slow convergence speed and local minima, saddle points, etc.

#### momentum

Momentum adds acceleration to existing SGD. Using vx (velocity) and rho (friction coefficient) values, it can smoothly avoid local minima and saddle points better than SGD.

#### nesterov momentum

Momentum finds the next step by adding gradient and velocity to the input value. However, nesterov momentum finds the gradient after moving by the amount of velocity from the input value, rather than finding the gradient at the input value, and adds this to find the next step.

It shows excellent performance in convex functions but is not so good for neural networks.

#### adagrad

It is an algorithm that updates each parameter by finding the gradient of the input value and dividing it by the square root of its squared value for updates. Adding $1e-7$ to the denominator is to prevent calculation impossibility when the squared gradient value is 0.

Since the squared gradient is added like this, the denominator becomes larger and the value becomes smaller as the next step progresses. As an alternative, there is RMSprop, which uses the squared gradient in the same way but multiplies by a decay rate instead of accumulation. This value usually uses 0.9 or 0.99.

#### adam

Adam combines the method using momentum and the method applying adaptive. The first moment represents momentum and the second moment represents adaptive. The numerator uses momentum and the denominator uses adaptive to find the next step.

---

### ensemble

During learning, there are often cases where overfitting problems occur where learning is good for training data but not good for validation and test data.

Model ensemble is one solution to this.

Methods include training multiple independent models and using them simultaneously during testing, saving learning models during training and using them as ensembles rather than independent learning, and changing learning rate at regular epochs.

---

### references

[Original source #1](https://youtu.be/wEoyxE0GP2M?si=zsZjQOx4EPWgV56L)

[Original source #2](https://youtu.be/_JB0AO7QxSA?si=QCnP-gLLobY6h2KB)




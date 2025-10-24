---
title: 'Training neural network'
date: '2022-08-16'
tags: ['Deep Learning', 'lecture']
---

### Activation function

#### 1. Sigmoid

<img src="https://media.licdn.com/dms/image/v2/D4D12AQGIXdSG7IJCNw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1694183259537?e=2147483647&v=beta&t=lJ_qEzot0iGYhNpez9XGRNHjS-CDKHn3Wj-6iCQxRO0" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

The Sigmoid function has an output range of $[0,1]$ and is expressed as $\sigma(x) = \frac{1}{1+e^{-x}}$, but when $x$ diverges to $-\infty$ or $\infty$, the gradients disappear to 0, causing gradient vanishing problems. Also, the sigmoid center is not centered at 0, and the exp function is expensive, so it is not used.

<img src="https://img-blog.csdn.net/20171019115510853?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZ3VveXVuZmVpMjA=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

First, when we differentiate this function, $\frac{\partial \sigma(x)}{\partial x} = \frac{\partial}{\partial x} \cdot \frac{1}{1+e^{-x}} = \frac{e^{-x}}{(1+e^{-x})^2}=\sigma(x)(1-\sigma(x))$, and when $x=10$, the derivative approaches 0, and when $x=-10$, the derivative also approaches 0. Therefore, when visualizing the derivative graph, it becomes symmetric like a normal distribution curve. As can be seen in the image above, when backpropagation is performed, if the derivative becomes 0 when $x$ has an absolute value of 5 or more, all upstream values and local gradients in backpropagation become 0.

Next, the local gradient can be expanded as $\frac{\partial \sigma}{\partial w_i} = \sigma(w^Tx+b)(1-\sigma(w^Tx+b)) \cdot x_i$, and since the left term of the inner product always has a range of $[0,1]$, it does not become negative. Also, since the right term of the inner product is assumed to always be positive, the derivative is biased in one direction, which causes sigmoid to set all gradient elements together in positive or negative directions, showing more unnecessary movement than expected.

#### 2. Tanh

<img src="https://www.oreilly.com/api/v2/epubs/urn:orm:book:9781788996921/files/assets/58f98f0c-6a81-4acc-bafb-9b0f683ad9c9.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

The tanh function has a range of $[-1, 1]$ and is centered at 0. However, it still has gradient vanishing problems. This is because tanh is a scaled function of the sigmoid function as $2 \sigma(2x)-1$.

#### 3. Relu

<img src="https://media.geeksforgeeks.org/wp-content/uploads/20250129162127770664/Relu-activation-function.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

ReLU is drawn as $\text{max}(0,x)$, and thanks to this, it does not saturate in positive values. The computational cost is also efficient, and it does not cause gradient vanishing, so convergence is fast.

However, it is not centered at 0 and is not differentiable at $x=0$. And when negative, dead ReLU (the problem of not updating with gradient 0) occurs. Therefore, a function (leaky ReLU) that multiplies positive biases by constants like 0.01 is used.

---

### Machine learning approaches

#### 1. Zero centering

<img src="https://www.researchgate.net/publication/337401161/figure/fig11/AS:897901463076880@1591087799638/Mean-subtraction-Zero-centering-the-datasource-http-cs231nstanfordedu.ppm" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

As a method also covered in PCA, zero centering refers to the process of creating data by subtracting the global mean from original data.

#### 2. Weight initialization

Small gaussian random creates a distribution by multiplying random values by small constants like 0.01. In tanh, when differentiated, $\frac{\partial tanh(Wx+b)}{\partial W} = tanh(Wx+b)' \times x$, so if $x=0$, the derivative becomes 0. This prevents learning from proceeding. Also, since $tanh(Wx+b)' = (1-tanh(Wx+b)^2)$, when $tanh(Wx+b)^2=1$ at large constants like 0.5, the derivative also becomes 0, preventing learning from proceeding.

$$
\frac{\text{rand}(x,y)}{\sqrt{x}}
$$

To solve these problems, Xavier initialization was introduced, which is a method of dividing random values by the square root of input values. In conv-layers, the input value can be thought of as $F^2C$ multiplied by the filter size and number of channels.

#### 3. Learning rate

Decaying learning rate uses a large learning rate initially to perform gradient descent quickly, then gradually reduces it for convergence, while constant learning rate uses a consistent learning rate from beginning to end.

If the value is too large, it may pass the point where loss is reduced, and if too small, convergence speed becomes slow, so in most cases, decaying learning rate is used.

---

### Deep learning approaches

#### 1. Optimization idea by ML

When a model learns general trends and noise is included in the training data, it also learns this noise. After overfitting, performance is good only on training data and gets worse on evaluation data.

Therefore, it refers to forcing weights $\beta, w$, etc. to inevitably become 0 or close to 0 by inserting penalty terms into the objective function to regularize the model.

For example, the objective function of linear regression is $\underset{\theta}{\text{min}} (Y-X\theta)^T(Y-X\theta)$, and the estimate of $\theta$ is defined as $\hat{\theta} = (X^TX)^{-1}X^TY$. When a penalty term is added, an estimate of the form $\hat{\theta} = (X^TX + \lambda I)^{-1}X^TY$ is defined. The $\theta$ of the penalty term can be set large when the basic objective function is sufficiently large and needs to reduce the gain.

Now overfitting also exists in deep learning, so it can be solved with weight decay, early stopping, dropout, etc.

$$
\Omega(W) = \sum_i \sum_j W_{i,j}^2, \\
\Omega(W) = \sum_i \sum_j |W_{i,j}|
$$

First, weight decay applies ridge regression ($L_2$) and lasso ($L_1$) to neural networks, adding simple penalty terms as shown above.

<img src="https://fouryears.eu/wp-content/uploads/2017/12/early_stopping.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Next, early stopping literally stops at the point where evaluation data overfits. A way to delay overfitting even slightly is to never use evaluation data for training and validation.

<img src="https://kh-kim.github.io/nlp_with_deep_learning_blog/assets/images/1-14/04-dropout_overview.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Finally, dropout randomly sets some neurons to zero during forward pass, and is commonly used with 0.5.

For example, if a cat's eyes, nose, and mouth are split into individual clues and then a partially masked image is trained, if it can still recognize it as a cat, it is helpful because it is likely to perform well on the original unmasked image as well. This method is not used during evaluation.

#### 2. Optimization beyond SGD

The three problems of SGD are as follows.

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6olWv-U4vKYI3Okjvt7O29F_jU_17nOkV5Q&s" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

-When loss decreases faster in one direction than the other, progress becomes very slow.

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0PnDcRjXeFD1TG1-nrIPGLv-Ni-tuH8c1Aw&s" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

-It stops when the derivative becomes 0 at local minimum or saddle point.

<img src="https://classic.d2l.ai/_images/output_minibatch-sgd_f4d60f_147_0.svg" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

-Gradients are calculated in mini batches and accuracy may decrease.

Research has been conducted to combine other mechanisms to solve these SGD problems. First is SGD + Momentum, which uses momentum like mass$\times$velocity in physics definition. While the existing SGD formula is $x_{t+1} = x_t + \alpha \nabla f(x_t)$, momentum $v_{t+1}$ is defined as $\rho v_t - \alpha \nabla f(x_t)$ and then redefined as $x_{t+1} = x_t + v_{t+1}$. By adding momentum, SGD does not lose movement due to inertia even at local minima and saddle points. Here, the parameter $\rho$ is a discount factor that controls the degree of momentum. If this value is 1, it does not reduce the previous speed, and if 0.9, it decreases to 90% of the previous speed.

Next is Adagrad, which performs element-wise scaling by adjusting learning rates for each element. It calculates derivatives of $d$-dimensional vectors and adjusts learning rates by dividing by the square root of sum of squares. This allows slow movement in steep directions (where derivatives are large) and fast movement in gentle directions.

RMSProp combines Adagrad's method with decay rate. Since Adagrad only proceeds in the direction of increasing denominator values by squaring and adding gradient values, it has the weakness of only having the difference between moving slowly and moving slightly slowly rather than the effect of moving fast. To compensate for this, it multiplies previously accumulated gradients by $dr$ and current gradients by $(1-dr)$.

Finally, Adam combines RMSProp and momentum. It first performs momentum, multiplying accumulated gradients by $beta_1$ and current gradients by $(1-beta_1)$. Then, like Adagrad RMSProp, it multiplies accumulated gradients by $beta_2$ and current gradient squares by $(1-beta_2)$, and uses the square root of this as the denominator.

#### 3. Batch norm

$$
\hat{x}^{(k)} = \frac{x^{(k)} - E[x^{(k)}]}{\sqrt{Var[x^{(k)}]}}
$$

Batch norm normalizes as shown above to average 0 for each dimensional unit. For example, if there is a batch normalized input of $N \times D$, both mean and variance are $D$-dimensional.

<img src="https://forums.fast.ai/uploads/default/original/2X/9/998a1be6463260f731481106756034c42040e256.jpg" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Generally, batch norm is connected after fc-layer or conv-layer, or before activation function.

<img src="https://media.geeksforgeeks.org/wp-content/uploads/20250114183648606652/What-is-Group-Normalization_.jpg" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Recently, new normalization techniques have emerged such as Layer norm with norms for each dimension, Instance norm individually, and Group norm in groups.

---

### References

[Original source #1](https://youtu.be/IsQb1XXXEQc?si=uf_8bnfh06cb2nUO)

[Original source #2](https://youtu.be/0nO8oGkCfZQ?si=xsPphnxX_J3piJC2)
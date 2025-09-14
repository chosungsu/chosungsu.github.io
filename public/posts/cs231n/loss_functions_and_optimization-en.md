---
title: 'Loss functions and optimization'
date: '2024-02-02'
tags: ['cs231n', 'lecture']
---

### loss function

We use a loss function as a way to know how well the model is performing. It indicates how much loss the current image classifier we are using has.

$$
L = \frac{1}{N} \sum_{i} L_i (f(x_i, W), y_i)
$$

Through this formula, we can see that the average value obtained by adding the loss values from each of the $N$ data points and dividing by $N$ is used as the loss.

#### 1. multiclass SVM loss

<img src="https://iq.opengenus.org/content/images/2023/04/hloss.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

The result value from linear classification $f(x_i, W)$ is called $s$, and the $s$ value of the correct class is called $s_{y_i}$, and we compare these values. If the score of another class is higher than the correct answer, that difference is the loss.

A safety margin is added to the loss calculated this way, which means the correct class must be at least as large as other classes by the safety margin.

If the loss value is negative, it is not included.

The above image shows hinge loss, which is used to find a hyperplane that is far from the data. It is a technique that induces large loss for data that is not larger than the margin.

#### 2. regularization

The question of whether all models have good performance as the loss function value decreases can be considered half right and half wrong.

The reason is that overfitting can occur. This refers to the phenomenon where learning is done to achieve good performance on training data during training, but performance decreases during validation and evaluation.

This problem is solved by regularization. A constraint term is added to the previously calculated formula (data loss).

$$
L = \frac{1}{N} \sum_{i} L_i (f(x_i, W), y_i) + \lambda R(W)
$$

Types include L2 regularization, L1 regularization, elastic net, etc. L2 regularization has a circular shape with squared weights and follows a Gaussian distribution where most values approach 0. L1 regularization has a diamond shape with absolute value weights and follows a sparse matrix that converges to 0.

#### 3. softmax classifier

Unlike multiclass SVM, it uses logistic values and has the difference of determining loss by looking at the correct class distribution.

<img src="https://velog.velcdn.com/images%2Ffbdp1202%2Fpost%2Fba98cf8b-a668-4ed6-bea9-d5301654db1a%2Fcs231n-03-010-Softmax_Classifier.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

We take the exponential of the score value and calculate the probability distribution value for this value. Then we take the negative log value for all classes except the correct answer and add them up.

---

### optimization

We need to perform optimization to check how much the weight values are wrong using the loss function and determine good weight values.

#### 1. random search

The first method, random search, is to change weight values without any criteria and find the one with the best performance. It is not recommended because the accuracy is very low.

#### 2. local geometry gradient descent

$$
\frac{df(x)}{dx}=lim_{h \rightarrow 0} \frac{f(x+h)-f(x)}{h}
$$

We find the slope through differentiation, add $h$ to the weight to create change, and the value divided by h becomes the gradient dW value. This method is called numerical gradient. It has the disadvantage of being very slow because it must be calculated for all weight components. The step size can be used to determine how much to calculate. 

#### 3. stochastic gradient descent

<img src="https://blog.kakaocdn.net/dn/oLW0Y/btqyj35DqII/zzDSdEfWKXVD3De5lNpCh0/img.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

To find gradient descent, a loss function is needed, but there was a disadvantage that it took a long time because it used the average of the total loss. Therefore, in SGD, instead of finding the gradient of the entire dataset, we divide it into small samples called minibatch for learning, and it is usually set to a power of 2. Since weights are updated based on the error of the dataset selected as mini-batch, it shows fast computation speed.

---

### feature transformation

#### 1. color histogram

This is a method of extracting only hue from each image, putting all pixels into color buckets, and counting the numbers. For example, when there is a frog, the result shows that there is a lot of green.

#### 2. histogram of oriented gradient

The image is divided into 8*8 pixels, the dominant edge direction of each pixel is calculated, and that edge is put into buckets.

#### 3. bag of words

This is a method inspired by natural language processing that counts the frequency of various words in a sentence. When applied to images, pieces are cut arbitrarily, each piece is clustered, and edges for color and direction of each cluster are put into buckets.

---

### References

[Original source #1](https://youtu.be/h7iBpEHGVNc?si=6KRXeu8yppHiCE6X)




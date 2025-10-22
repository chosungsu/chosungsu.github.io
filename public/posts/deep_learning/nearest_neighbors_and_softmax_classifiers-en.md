---
title: 'Nearest neighbors and Softmax classifiers'
date: '2022-08-05'
tags: ['Deep Learning', 'lecture']
---

### Image classifier

Before the emergence of deep learning, the method of analyzing images was as follows.

For example, when there is an image of a cat, it recognizes by tracing edges through find edges. At this time, if it exceeds a certain threshold value, it is drawn in contrast as white, otherwise black.

As much image and label data as possible were collected, learned through algorithms, and then made to predict labels for unseen images.

---

### Nearest neighbors

<img src="https://intuitivetutorial.com/wp-content/uploads/2023/04/knn-1.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

As shown in the image above, when there is a new data point that has not been seen during the learning process to find labels, predicting labels based on learning results is called the Nearest neighbors algorithm.

To do this, all data and matching label information must be memorized during the learning process.

<img src="https://cs231n.github.io/assets/pixelspace.jpeg" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

As shown in the image above, each labeled image remembers information by mapping images and labels during learning, but when a completely new image without any label comes as input, it compares with the most similar image label.

To make this possible, the RGB matrix of each image is used, and the image size must be adjusted in advance. Using the $L_1$ distance formula, the image with the smallest sum of matrix coordinates through absolute value calculation is judged to be the closest.

Therefore, during learning, since it is simply a mapping step, the time complexity becomes $O(1)$, and during prediction, it becomes $O(N)$ since it repeats as many times as the number of images. However, this is not good performance in terms of time complexity. That's why K Nearest Neighbors is not commonly used as an image classifier, and the distance metrics, which are the core of this algorithm, are not as meaningful as expected. And as dimensions increase, to maintain distance, the curse of dimensionality occurs where data points increase exponentially like $1D : 4p, 2D: 4^2p, 3D: 4^3p$.

---

### Parametric Approach

We changed the learning process of Nearest neighbors. Instead of memorizing training samples, we create a function $f(x)$ that maps input images to label scores $y$.

<img src="https://miro.medium.com/v2/resize:fit:1400/1*owd5v7vhWqnVHbLkaI84tA.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Among them, a simple linear classifier linearly expresses by multiplying each pixel value with a weighted sum, so it becomes $f(x,W) = W_{1,1}x_{1,1} + W_{1,2}x_{1,2} + \dots + W_{M,N}x_{M,N}$. For example, when the input image has $32*32*3=3072$ resolution and there are 10 labels and 1 correct label, $f(x,W) \rightarrow 10 \times 1$, $Wx \rightarrow (10 \times 3072) \times (3072 \times 1) = 10 \times 1$ can be achieved.

Now the complete formula is $f(x, W) = Wx + b$, and the bias must also be $10 \times 1$ since the left and right sides must be equal. Bias is a term added to model the distribution of existing data itself without interacting with input data. In a linear classifier, $W$ can be interpreted as playing a role in rotating the decision boundary, and $b$ as moving it up and down. This is because in the formula $f(x,W) = Wx + b$, $W$ causes a linear transformation by multiplying with input $x$, and this transformation determines the slope of the decision boundary. On the other hand, $b$ is a constant term added independently of the input, playing a role in parallel translation of the decision boundary in the transformed space.

Converting the above formula to matrix form, $f(x,W) = \begin{bmatrix} W & b\end{bmatrix} \begin{bmatrix} x \\ 1\end{bmatrix} = W'x'$ is expanded, and this changes to $10 \times (3072+1), (3072+1) \times 1$ dimensions.

In the learning process, it has good space efficiency since only the weight $W$ is needed without memorizing all data. And according to the matrix transformation formula, $W'x' \rightarrow 10 \times 1$ is faster in computation than the Nearest neighbors algorithm.

---

### Softmax classifier

When using the sigmoid function and assuming there are 2 classes, the score difference can be defined as $S = S_1 - S_2$, and the probability values $P(y=c_1|x) = \frac{1}{1+e^{-(s_1-s_2)}} = \frac{e^{s_1}}{e^{s_1} + e^{s_2}}$, $P(y=c_2|x) = \frac{1}{1+e^{-(s_2-s_1)}} = \frac{e^{s_2}}{e^{s_2} + e^{s_1}}$ are obtained. Therefore, it can be generalized, and $P(y=c_i|x) = \frac{e^{s_i}}{\sum_{j} e^{s_j}}$ becomes the softmax function formula.

---

### Cross entropy

<img src="https://framerusercontent.com/images/KyrSn9Wx4SQg991VWauPrqjmw.webp?width=1300&height=752" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

General cross entropy is $L = -\frac{1}{N} \sum_{i=1}^{N} \sum_{k=1}^{K} y_{ik} log(\hat{y}_{ik})$, and in binary situations, it is expressed as $L = -\frac{1}{N} \sum_{i=1}^{N} [y_i log(\hat{y}_i) + (1-y_i) log(1-\hat{y}_i)]$. $y_{ik}$ becomes 1 or 0 depending on whether the $i$-th image belongs to the $k$-th class. Therefore, when simplifying the above formula, only the correct class remains as 1 and 0 disappears, so it can be viewed as $L = -\frac{1}{N} \sum_{i=1}^{N} log(\hat{y}_{i}T_i)$. Here, $T_i$ means the correct class of the $i$-th image. Based on this, the definition of cross entropy can be considered as the negative log value of the probability of predicting the correct class. Looking at the graph, the negative log converges to 0 when it is 1, which proves that the loss decreases when the correct class is matched or approached.

---

### References

[Original source #1](https://youtu.be/RtnqcndNLj4?si=TrRInVyFNKPPUhwx)
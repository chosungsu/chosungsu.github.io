---
title: 'Neural networks and backpropagation'
date: '2022-08-09'
tags: ['Deep Learning', 'lecture']
---

### Image features

Since images are actually very complex, research began on extracting features that represent the input instead of mapping input and output to pixel classes. Representative examples include color histogram, histogram of oriented gradients (HoG), bag of words, etc.

<img src="https://miro.medium.com/max/800/0*sQzmiOf8Yb_18HX1.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

When feature extraction is performed on input image $x$, image features $z$ are extracted as vectors. Then, learning is performed with function $f(z)$ that predicts correct labels from these vectors, and updates are made with loss. Rather than an end-to-end model that learns with newly initialized image features each time, it is better to first incorporate existing background knowledge if it exists.

---

### Neural networks

#### Neuron

<img src="https://mblogthumb-phinf.pstatic.net/MjAxODEyMjBfMTkw/MDAxNTQ1Mjc5Nzc3NzIx.yM3u7h0fhk0D94uYngVRHpkiwEcQqsJh5kRhO1cUnf0g.ibIVrMGKL7NKCkTEjBIzJli4lpXNb0dPrYPjaRlkdGUg.PNG.ucbsong/neuron_perceptron.png?type=w800" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

As shown in the image above, neural networks receive multiple input values at once like branches, and each input value is multiplied by a weight. Then, $w_1 x_1 + w_2 x_2$ is passed through a function, and the function is non-linear.

#### XOR problem

<img src="https://blog.kakaocdn.net/dna/NalwG/btqxdrzsQAV/AAAAAAAAAAAAAAAAAAAAALcupiEZlPlneT1Ns3tgkQf_ZlAVgf17M7v_yjjOU7rS/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1761922799&allow_ip=&allow_referer=&signature=KwIb3lRGhON%2B%2B44WWwnEbIvQ708%3D" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

However, with a single perceptron, while AND and OR conditions could be distinguished as shown in the image above, the XOR condition could not be solved. The method that solved this is the Multi-Layer Perceptron (MLP).

#### MLP

<img src="https://www.allaboutcircuits.com/uploads/articles/an-introduction-to-training-theory-for-neural-networks_rk_aac_image2.jpg" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

The function using MLP can be expressed as $y=f(w_7h_1 + w_8h_2 + w_9h_3) = f(w_7(w_1x_1 + w_2x_2) + w_8(w_3x_1 + w_4x_2) + w_9(w_5x_1 + w_6x_2))$. That is, the result after passing through the activation function becomes the same form as a linear classifier.

For a single perceptron, if we set input and output as $x : 3072 \in R^d$ and $s : 10 \in R^c$, the weight becomes $w \in R^{c \times d}$, but for a multi-layer perceptron, with the same input and output settings, adding a hidden layer $h : 100$ in between, the weight can be determined as $w_1 \in R^{h \times d}, w_2 \in R^{c \times h}$. Representing functions in both situations, we get $f(x) = Wx, f(x) = W_2(W_1 x)$, and if the latter function follows the associative law, multiplying $W_1$ to the input and then multiplying $W_2$ is the same as first multiplying $W_2, W_1$ and then multiplying to the input, which ultimately becomes the same as the former function. Therefore, in MLP functions, non-linear activation must be expressed before each weight.

Examples include sigmoid, tanh, relu, etc.

#### Computing gradient

Gradient descent is a method for computing the above MLP, expressing classification loss for each weight as $\frac{\partial L}{\partial W_1}, \frac{\partial L}{\partial W_2}$. Each weight is updated as $\theta_n = \theta_o - \alpha \nabla_{\theta} J(\theta)$.

For example, if the result is $L = (\hat{y} - y)^2$, then $\frac{\partial L}{\partial \hat{y}} = 2(\hat{y} - y), \frac{\partial L}{\partial W_2} = \frac{\partial L \cdot \partial \hat{y}}{\partial \hat{y} \cdot \partial W_2} = 2(\hat{y} - y) \cdot \sigma (W_1x)$ is differentiated. And $\frac{\partial L}{\partial W_1} = \frac{\partial L \cdot \partial \hat{y} \cdot \partial h}{\partial \hat{y} \cdot \partial h \cdot \partial W_1} = 2(\hat{y} - y) \cdot W_2 \cdot h(1-h) \cdot x$ allows calculation of derivatives with respect to weights.

---

### Backpropagation

<img src="https://editor.analyticsvidhya.com/uploads/18870backprop2.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Backpropagation is a method of updating weights from output to input in reverse order of what has been done so far. For example, when $f(x,y,z) = (x+y)z$ and $x=-2, y=5, z=-4$, performing a forward pass gives $f(x,y,z) = (-2+5)*(-4) = -12$.

Backpropagation expresses the entire function $f$ as derivatives, where the derivative at the final result is $\frac{\partial f}{\partial f}=1$. And the derivative with respect to $z$ is $\frac{\partial f}{\partial z} = \frac{\partial qz}{\partial z} = q, q \rightarrow (x+y) = 3$. Then the derivative with respect to $x$ is $\frac{\partial f}{\partial x} = \frac{\partial f \cdot \partial q}{\partial q \cdot \partial x} = \frac{\partial qz \cdot \partial (x+y)}{\partial q \cdot \partial x} = z \cdot 1, z \rightarrow -4$, and finally the derivative with respect to $y$ is $\frac{\partial f}{\partial y} = \frac{\partial f \cdot \partial q}{\partial q \cdot \partial y} = \frac{\partial qz \cdot \partial (x+y)}{\partial q \cdot \partial y} = z \cdot 1, z \rightarrow -4$.

<img src="https://blog.kakaocdn.net/dna/rXXaO/btqZkpTMMMV/AAAAAAAAAAAAAAAAAAAAACYJhqUhcm2UokY7w4EMRxXN7rjvZ-_ybrRDjx2i-bQO/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1761922799&allow_ip=&allow_referer=&signature=565McIykZyWCSdbqQyblgOIzhQg%3D" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

There are 4 patterns in gradients. First, the add gate distributes the same gradient, next the mul gate multiplies by swapping the weights of the forward pass, the copy gate adds gradients, and the max gate assigns the largest gradient.

---

### References

[Original source #1](https://youtu.be/niLF4XWkE-U?si=9czVH7bPVCAU-5K2)
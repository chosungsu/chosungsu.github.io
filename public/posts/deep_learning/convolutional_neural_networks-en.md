---
title: 'Convolutional neural networks'
date: '2022-08-12'
tags: ['Deep Learning', 'lecture']
---

### Fully connected layer

<img src="https://i.sstatic.net/BVZro.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

In a fully connected layer, the structure can be understood through the basic form $f(x) = W \cdot x$, and for one correct answer, dimensions are set as $W \in R^d$, $x \in R^d$, $s \in R$. When expanded to all labels, it can be viewed as $W \in R^{c \times d}$, $x \in R^d$, $s \in R^c$.

The fc layer diagrams the relationship between all inputs and all outputs, allowing any output value to be connected to any input.

---

### Spatial locality

When there is a task of recognizing patterns in images, patterns with high scores should be obtainable through filters. Only pixels around the pattern being sought affect it, while the rest do not, which is opposite to the definition of fc layer.

---

### Convolutional neural networks

Convolutional neural networks use the above spatial locality to make each filter capture nearby pixels and search all positions with the same filters.

#### Convolutional layer

Visualizing a single input value and filter looks like the following.

<img src="https://stanford.edu/~shervine/teaching/cs-230/illustrations/convolution-layer-a.png?1c517e00cb8d709baf32fc3d39ebae67" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

In this way, the filter moves through all positions of the image, performs inner products, and calculates results. And if there is a 3-dimensional input with RGB, a 3-dimensional filter for $32 \times 32 \times 3$ input exists as $3 \times 3 \times 3$, and the corresponding result adds $3 \times 3 \times 3$ and 1 bias, totaling 28 additions.

The result filtered by a single filter (1) is also called the size of the activation map, and the actual calculation is obtained by (input size - filter size + 1), so it becomes $(32 - 3 + 1) \times (32 - 3 + 1) \times 1=30 \times 30 \times 1$. If filtering with multiple filters ($n$), it can be said to be $30 \times 30 \times n$.

#### Nested convolutional layers

For example, if conv-layers are nested with low level, mid level, and high level features, high level features will be learned as useful features that can best distinguish differences. Then mid level will learn useful features for distinguishing high level features, and low level will also learn useful features for distinguishing mid level. Since images have many complex features, nested conv-layers are stacked to solve this.

As the filter size increases, the activation map inevitably becomes smaller. Therefore, many nested layers cannot be stacked.

#### Stride

<img src="https://www.baeldung.com/wp-content/uploads/sites/4/2023/10/Screenshot-2023-10-10-at-1.11.45-PM.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

When the input size is $7 \times 7$ and there is a $3 \times 3$ filter, since the default stride is 1, let's compare by increasing the size from 1. Stride is a parameter that determines how much to move the filter.

If stride is 1, $(7 - 3) / 1 + 1 = 5$, if stride is 2, $(7-3)/2 + 1 = 3$, if stride is 3, $(7-3)/3+1 = 2.33$ activation map size is calculated. That is, it can be generalized as $(N-F)/stride + 1$, and calculation becomes impossible from stride 3 onwards.

#### Padding

<img src="https://blog.kakaocdn.net/dna/bFhpps/btsJxT5akay/AAAAAAAAAAAAAAAAAAAAAHApT9PIt3ZMJizhIBTNBulAfCd7Nf01eg62_NIcfanF/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1761922799&allow_ip=&allow_referer=&signature=A2Eh0611xW8tpSX7uJQLPrWCLdc%3D" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

This is a method of adding zero values to the border of the input image. Using this, the above $7 \times 7 \rightarrow 9 \times 9$ becomes, and even with stride 1, it maintains the original image size as $(9-3)/1 + 1 = 7$.

The generalized formula applying both padding and stride is $(N-F+2p) / stride + 1$, and the padding size can be obtained as $(F-1)/2$.

If we apply the above example of $32 \times 32 \times 3$ input and $5 \times 5 \times 10$ filter with stride 1 and padding 2, the activation map size becomes $(32 - 5 + 2 \times 2) / 1 + 1 = 32$, that is $32 \times 32 \times 10$. And the total number of parameters is $10 \times (5 \times 5 \times 3 + 1) = 760$. The bias at the end should not be forgotten. Therefore, the number of parameters needed for input and output with fc layer is $(32 \times 32 \times 10) \times (32 \times 32 \times 3 + 1) = 31467520$, and we can see how many times the $760$ of conv-layer reduces time compared to fc-layer, which is the effect of applying spatial locality and positional invariance.

#### $1 \times 1$ filters

If a conv-layer is implemented with a 6-dimensional $1 \times 1$ filter without padding, since $(32-1)/1+1 = 32$, the activation map size becomes $32 \times 32 \times 6$ and the number of parameters is $6 \times (1 \times 1 \times 3 + 1) = 24$.

If the filter size is $1 \times 1$ like this, when the input image is 3-dimensional, only the same position is viewed 6 times, which is the total dimension of the filter. This ultimately has the effect of increasing the dimension (number) from $3 \rightarrow 6$ without changing the activation map size. This operation is similar to connecting all weights for one correct answer (position) like the definition of fc-layer, but it is an operation that does not reflect surrounding information at all.

#### Fc layer vs Conv layer

In fact, conv-layer can be said to be a special case of fc-layer. In conv-layer, if the space focused through the filter has values and the space that doesn't is filled with zeros, it can be considered the same operation as fc-layer.

#### Pooling layer

<img src="https://www.researchgate.net/publication/340812216/figure/fig4/AS:928590380138496@1598404607456/Pooling-layer-operation-oproaches-1-Pooling-layers-For-the-function-of-decreasing-the.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

This is a layer designed for downsampling. Through pooling, spatial reduction is performed with max and average operations. Since this process simply performs downsampling, the required parameters are 0, and when the input image is $(W \times H \times C)$, the result after downsampling is $((W-F)/S + 1, (H-F)/S + 1, C)$, showing that the dimension remains the same.

---

### References

[Original source #1](https://youtu.be/gJZ90HPstrs?si=_D02I8LdEZFKvWpw)
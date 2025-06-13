---
title: 'Neural discrete representation learning'
date: '2022.10.17'
tags: ['anomaly detection', 'paper review']
---

### Abstract
The Vector Quantised Variational AutoEncoder proposed in this paper differs from conventional VAEs in the following ways:
It integrates the Vector Quantised idea to derive discrete rather than continuous results in the encoder part and to learn latent representations. Through this idea, it is claimed that the posterior collapse problem, where latent variables are ignored, can be avoided when combined with an Auto Regressive Decoder.

---

### Introduction

While Maximum likelihood and Reconstruction error are used to train unsupervised learning models, this paper aimed to implement a model that optimizes Maximum likelihood while preserving important features in the latent space. Of course, the best practical alternative would be CNN-based models that generate using a Decoder model without latent vectors, but as mentioned in the Abstract, they wanted to prove their suitability for various domains by learning discrete and latent variables.

The VQ-VAE proposed in the paper is said to have no shortage of modeling high-dimensional features because it effectively uses the latent space. It is also claimed that it can avoid focusing on local noise and imperceptible features.

---

### VQ-VAE

Discrete Latent Variables

The embedding space KD is defined where K is the size of the space and D is the dimension of the vector.
<img src="https://velog.velcdn.com/images/ski06043/post/4ce0b844-2d79-49e2-94d6-bcdda7ea355c/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

As shown in the image above, the model takes input x and outputs z(x) through the encoder. At this time, the discrete latent variable is calculated through nearest neighbor search in the space. Also, before reaching the decoder, the posterior categorical distribution calculation is composed of the following equation:

$$q(z = k|x) =\begin{cases} 1 & \text{if } k = \arg \min_j \|z_e(x) - e_j\|^2, \\0 & \text{otherwise}.\end{cases}$$

It is defined in one-hot encoding form, and the KL divergence becomes a constant as a simple uniform distribution for z.

---

### Experiments

1. Comparison with Continuous Variables

In the first experiment, VQ-VAE was compared with conventional VAE using continuous variables and VIMCO with independent Gaussian or categorical prior distributions. The encoder was configured with two convolution layers of size 4 by 4 at stride 2 and two residual 3 by 3 blocks, each containing Relu + 3 by 3 convolution layer + Relu + 1 by 1 convolution layer. The result recorded 4.67 bits/dim, close to VAE's 4.51 bits/dim.

2. Audio Data

<img src="https://velog.velcdn.com/images/ski06043/post/6fec4680-8f82-402a-b173-91a85f34d66a/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

The second experiment compared with VCTK audio data, where the encoder was configured with 6 convolution layers of size 4 by 4 at stride 2. It was able to generate a latent space 64 times smaller, and while perfect reconstruction was not possible, the discovery that the waveform and voice intonation changed indicated that a high-level abstract space was learned. The model was modified to have a latent space 128 times smaller and pre-trained on a larger dataset, achieving a classification accuracy of 49.3% with a random accuracy of 7.2%.

---

### Conclusion

The experiments mentioned above showed that VQ-VAE can learn discrete latent spaces that capture important features of data through a completely unsupervised learning approach. Moreover, the fact that VQ-VAE achieved performance nearly similar to conventional continuous latent variable models can be considered the greatest significance of this paper.

---

### References

[Original path: https://arxiv.org/abs/1711.00937](https://arxiv.org/abs/1711.00937)
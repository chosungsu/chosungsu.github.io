---
title: 'CNN architectures'
date: '2024-03-01'
tags: ['cs231n', 'lecture']
---

### alexnet

<img src="https://velog.velcdn.com/images/choonsik_mom/post/c3367f4c-7837-483c-bc08-f4862f34ff48/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

AlexNet is the first large-scale CNN and is a network trained by distributing it to GPUs due to poor computer performance.

Its characteristics include being the first to use ReLU and using LRN norm layers as representative features.

Local Response Normalisation (LRN) was used for lateral inhibition before BN emerged. Lateral inhibition is a phenomenon where a gray dot appears at the intersection when there is a white line on a black background. The reason for using this was that when using ReLU, positive values could result in high pixel values during conv and pooling, so normalization between pixels at the same position was necessary.

---

### vgg

<img src="https://miro.medium.com/v2/resize:fit:857/1*AqqArOvacibWqeulyP_-8Q.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

As an ILSVRC winning model, you can see that the number of layers has increased in depth. However, instead of using 11x11 filters like AlexNet, it stacked 3x3 filters to reduce the number of parameters. It is classified as VGG16 and VGG19 according to layer depth.

---

### googlenet

<img src="https://velog.velcdn.com/images%2Ffbdp1202%2Fpost%2F73ae7aa5-7d7f-4e5e-8ac6-41675412501d%2Fcs231n-09-007-GooLeNet.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

It has a complex structure, with the Inception module being representative. It has 22 layers and reduced the number of parameters by removing fully connected layers.

#### inception module

<img src="https://production-media.paperswithcode.com/methods/Screen_Shot_2020-06-22_at_3.22.39_PM.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Looking at the Inception module, in the naive version on the left, you can see that multiple filters receiving the same input exist in parallel and combine the results. However, in such a structure, computational complexity increases explosively. For example, with an input of 28x28x256, from left to right, it has parameters of 28x28x128, 28x28x192, 28x28x96, 28x28x256, generating a total of 854M parameters. Therefore, to solve this problem, a bottleneck layer using additional 1x1 conv is shown in the right image. Using this results in a total of 358M parameters.

---

### resnet

<img src="https://production-media.paperswithcode.com/methods/resnet-e1548261477164.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

It has a new structure called residual connection. Generally, it was thought that deep networks had overfitting risks according to the number of parameters, but when actually compared, it was found that deeper networks had higher training errors and did not learn well, a phenomenon called degradation.

The method to solve this problem is skip connection, which has the advantage of almost no increase in computation and no learning problems as the original information is preserved even when gradient vanishing problems occur.

It uses BN, applies 2 stride instead of pooling, and uses Xavier initialization.

---

### references

[Original source #1](https://youtu.be/DAOcjicFr1Y?si=AXXzz9WcAHdKgLYN)




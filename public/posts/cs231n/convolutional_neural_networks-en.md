---
title: 'Convolutional neural networks'
date: '2024-02-16'
tags: ['cs231n', 'lecture']
---

### convolutional neural networks

<img src="https://velog.velcdn.com/images/devjo/post/db97e76c-252d-4324-87ba-120464b2f334/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

CNN uses the image as-is for input. Images usually exist in the order of $(w, h, c)$, and in CNN, $w$ is called a filter. Filter values are usually smaller than the $w$ or $h$ of the image. The depth size of the filter is the same as the input's $c=3$ value.

The size of the result is determined by $w'=w-w_f+1$.

#### 1. stride

<img src="https://velog.velcdn.com/images%2Ffbdp1202%2Fpost%2Ff5478fa9-4b89-47a8-bcdb-c9149898a202%2Fcs231n-05-011-convolutional_layer_cal_stride.gif" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Stride refers to the step size when the filter slides over the image.

#### 2. pad

<img src="https://velog.velcdn.com/images%2Ffbdp1202%2Fpost%2F7260f062-912f-4047-9088-b2a238df633c%2Fcs231n-05-012-convolutional_layer_padding.gif" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

The convolutional layer reduces the size of the resulting image according to the filter size, but it serves to prevent the phenomenon where the edges of the image are less used in calculations while maintaining the original size.

#### 3. output size

As a method to find the size of the result, when excluding stride and pad, it was $w'=w-w_f+1$, but when including all, it becomes $w'=(w-w_f+2*p)/s+1$.

#### 4. characteristics of cnn layer

Unlike fully connected layers, it has the advantage of being able to connect to local regions of the input image (local connectivity).

The size of the result is determined by 4 hyperparameters ($w_f, s, p, f_k$) (spatial arrangement).

By using one filter for each channel ($c$), parameters can be shared (parameter sharing) to reduce their number.

---

### pooling layer

Pooling refers to the process of downsampling the size of the activation map. That is, it reduces the size of the image. As the depth of the layer increases, a large amount of computation is required, and in this situation, pooling is used to improve speed. Stride also serves the same role, but pooling is better in terms of computational cost.

#### max pooling layer

<img src="https://velog.velcdn.com/images/devjo/post/a799ab17-47c0-4804-a840-763c9bd37ad7/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

For example, when pooling a 4x4 input image with a 2x2 filter and stride 2, it's like reducing the resolution by 2x while keeping the most visible components. Generally, stride is set so that filters don't overlap.

#### pooling vs stride

Since pooling layers usually significantly reduce the size of representation, they can be effective for overfitting, but they are rarely used recently.

The model's expressive power is better with stride, but the increase in trainable parameters can be problematic. However, it is said that there have been cases where using stride instead of max pooling showed good performance.

---

### References

[Original source #1](https://youtu.be/bNb2fEVKeEo?si=4_yW_XwLLy3_fvHD)




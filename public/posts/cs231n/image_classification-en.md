---
title: 'Image classification'
date: '2024-01-26'
tags: ['cs231n', 'lecture']
---

### semantic gap

When computers receive images, they form a large grid of numbers and have 3 channels according to RGB, which creates problems.

-Viewpoint

-Lighting and illumination

-Deformation of appearance

-Phenomenon of being buried or obscured by background

-In addition, phenomena such as partial cropping in the background, different characteristics (color, size, texture, etc.) even within the same input type are actual problems that can be encountered.

---

### data-driven approach

This is an approach that requires creating a dataset first. It refers to a series of processes of learning and predicting through a comprehensive dataset that includes both images and labels.

---

### nearest Neighbor & knn

The Manhattan distance method (L1) calculates the pixel value difference between test image and train image and adds them up. When using this, the computational complexity consumed for n samples is O(1) in training (no need to consider), but in prediction, it takes O(n) because of iteration. Therefore, this algorithm is fast in training but slow in prediction, making it not good.

Another method is the Euclidean distance method (L2), which is the square root of the sum of pixel value differences between test image and train image.

Looking at the boundaries of results using both methods, L1 follows the coordinate axis. L2 does not and shows smooth boundaries. Also, L1 has a coordinate nature, so it can be said to be suitable for use when the meaning of image pixels is known.

However, the KNN algorithm is not used for image data analysis due to its very slow computation speed during testing and the curse of dimensionality, which means that even with various additional processing on input images, pixel vector analysis through L1 and L2 distance methods produces the same results, making it unsuitable.

---

### linear

$$
f(x,W)=Wx + b
$$

When located in the diagonal region of the 4th quadrant, when it is circular like 1<=L2 norm<=2, and when there are three regions, it is difficult to distinguish with a single linear hyperplane.

---

### hyperparameter

Taking the example of the KNN algorithm we looked at earlier, setting the K value or distance method can be considered a hyperparameter, which affects learning and cannot be obtained through learning but must be set by humans. For this reason, constant effort is needed to find optimal hyperparameters, and in KNN, setting K to 1 works perfectly on all training data, but since the ultimate learning goal is to predict data we don't know, it should not be done.

Looking at other cases, generally we divide the data we know through train/test split to find the optimal case, but this should also be kept in mind that it is not a good choice for predicting unknown data. So what is the optimal split method? The answer is train/val/test split.

The learning path at this time proceeds in the order of training through train, then finding hyperparameters in the val stage, and applying them to test. Another good method is the Cross validation technique. This is a method of dividing train into multiple folds rather than simply splitting into train/val, and finding the most suitable fold for val.

---

### References

[Original source #1](https://youtu.be/OoUX-nOEjG0?si=HRvH-K6F4qufcvU1)




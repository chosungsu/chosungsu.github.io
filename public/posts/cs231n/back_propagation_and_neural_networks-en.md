---
title: 'Back propagation and neural networks'
date: '2024-02-09'
tags: ['cs231n', 'lecture']
---

### backpropagation

It can be obtained using the chain rule. For example, let's find the gradient through a computation node.

<img src="https://velog.velcdn.com/images/devjo/post/ff9e2685-fe0d-44a9-ad04-80461c17a5d4/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Given $q=x+y$, $f=qz$, $x=-2, y=5, z=-4$, when calculated through the forward pass process, the gradient values of each node are $\frac{\partial q}{\partial x}=1$, $\frac{\partial q}{\partial y}=1$, $\frac{\partial f}{\partial q}=z$, $\frac{\partial f}{\partial z}=q$, so the gradient at $z$ is $\frac{\partial f}{\partial z}=q=3$, the gradient at $q$ is $\frac{\partial f}{\partial q}=z=-4$, the gradient at $x$ is $\frac{\partial f}{\partial q} * \frac{\partial q}{\partial x}=z*1=-4$, and the gradient at $y$ is $\frac{\partial f}{\partial q} * \frac{\partial q}{\partial y}=z*1=-4$. This corresponds to backpropagation.

When doing backward pass, the add gate distributes the gradient it already had equally to each node, the max gate passes the gradient only to the side with the larger forward value and distributes 0 to the smaller side, and the mul gate distributes by swapping the values obtained by multiplying the gradient by each forward value.

---

### gradient calculation

Above, we calculated variable values as gradients, but in practice, we use vector values rather than scalar values. To use such vector values, we need the first derivative of a vector-valued function of multiple variables. This is called the Jacobian matrix.

<img src="https://velog.velcdn.com/images/devjo/post/449000ea-3e5b-47d6-b4e4-c851d179419d/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

---

### neural networks

Neural networks are a form of stacking 2 or more linear classifiers, with non-linear functions used between them. This method has the advantage of being able to extract various features by stacking layers.

A layer where all nodes in the middle affect the next node is called a fully connected layer (=hidden layer), and when there are $n$ layers, you can think of there being $n-1$ hidden layers.

---

### References

[Original source #1](https://youtu.be/d14TUNcbn1k?si=DCOAXYJHHK5E5_Cx)




---
title: 'The Singular Value Decomposition, SVD'
date: '2023-03-08'
tags: ['Linear algebra', 'lecture']
---

### Bases and Matrices in the SVD

The Singular Value Decomposition (SVD) is a powerful matrix decomposition method that expresses any $m \times n$ matrix $\mathbf{A}$ as a product of three matrices. Here, two matrices $\mathbf{U}$ and $\mathbf{V}$ are orthogonal matrices of sizes $m \times m$ and $n \times n$, respectively, and $\mathbf{\Sigma}$ is a diagonal matrix of size $m \times n$ (with elements only on the diagonal and zeros elsewhere). The diagonal elements $\sigma_i$ of $\mathbf{\Sigma}$ are called singular values.

The SVD decomposition is as follows:

$$
\mathbf{A} = \mathbf{U} \mathbf{\Sigma} \mathbf{V}^{\text{T}}
$$

Here, the column vectors of $\mathbf{U}$ are eigenvectors of $\mathbf{A}\mathbf{A}^{\text{T}}$ (left singular vectors), and the column vectors of $\mathbf{V}$ are eigenvectors of $\mathbf{A}^{\text{T}}\mathbf{A}$ (right singular vectors). The singular values $\sigma_i$, which are the diagonal elements of $\mathbf{\Sigma}$, represent the magnitude (length) of $\mathbf{A}$ and are usually sorted in descending order.

That is, SVD assigns orthogonal bases to the input space (column space) and output space (row space) for matrix $\mathbf{A}$, and describes how much $\mathbf{A}$ stretches/shrinks the basis vectors (singular values). SVD is widely used in various fields such as dimensionality reduction, noise removal, and data analysis.

---

### Principal Component Analysis

A data matrix with $m$ variables (measurements) and $n$ samples is denoted as $A_0$. Centering means calculating the mean ($\mu_i$) of each row (variable) and then subtracting that mean from each row of the original matrix $\mathbf{A}_0$.

#### Sample Covariance Matrix

From the centered data matrix $\mathbf{A}$, we define the sample covariance matrix $\mathbf{S}$.

$$
\mathbf{S} = \frac{\mathbf{A}\mathbf{A}^{\text{T}}}{n-1}
$$

Since $\mathbf{S}$ is a symmetric matrix, finding the eigenvectors and eigenvalues of $\mathbf{S}$ is equivalent to finding the eigenvectors and eigenvalues of $\mathbf{A}\mathbf{A}^{\text{T}}$, i.e., the left singular vectors ($\mathbf{u}_i$) and singular values ($\sigma_i^2$) of $\mathbf{A}$.

#### Essential Elements

The total variance $T$ equals the trace of $\mathbf{S}$.

$$
T = \sum_{i=1}^m s_i^2 = \sum_{i=1}^m \sigma_i^2
$$

The eigenvectors $\mathbf{u}_i$ of $\mathbf{S}$ are called principal components. They represent orthogonal directions in $m$-dimensional space where the data has the largest variance (spread).

---

### References

[Original Source #1](https://renessans-edu.uz/files/books/2023-12-04-11-33-41_46e7ce28c81d5c62d59b34ccc1c6f465.pdf)

[Original Source #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)

[Original Source #3](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

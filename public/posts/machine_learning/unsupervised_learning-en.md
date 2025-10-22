---
title: 'Unsupervised learning'
date: '2022-08-02'
tags: ['Machine Learning', 'lecture']
---

### Unsupervised learning

Unsupervised learning is the process of finding patterns from data without labels, and it has subjectivity compared to supervised learning.

---

### Clustering

<img src="https://media.licdn.com/dms/image/v2/D4D12AQFLMjsqAoIMKQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1701022315764?e=2147483647&v=beta&t=uXrY1kHrWpu_3ol3bjWb0Z6SISmvcycSx1zNo_B74Qo" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Basically, clustering solves problems through grouping between data points. It ensures high similarity within the same cluster while maintaining low similarity between different clusters.

For close neighbors, pairwise similarity between samples is calculated as follows.

$$
L_1(A,B) = \sum_{i,j}|A_{i,j} - B_{i,j}|, \\
L_2(A,B) = \sqrt{\sum_{i,j} (A_{i,j} - B_{i,j})^2}
$$

The above $L_1$ and $L_2$ distances only convey distance information. Through this distance information, two clustering methods can be performed: Hierarchical and Partitional. The former is a bottom-up approach where individual elements are merged one by one if they are considered similar. The latter is a top-down approach where the whole is viewed as one cluster and then split one by one.

Looking at bottom-up in detail, initially all are singleton clusters, and for each iteration, a distance threshold $\tau_i$ is created. As the steps progress, this value should increase to allow merging with clusters that are farther away. After level 1, since the distance between two clusters rather than the distance between two elements must be used, a representative value needs to be determined, and options such as closest pair, farthest pair, average of all pairs, and distance between in-group averages exist. For example, if closest pair is selected, it judges the distance of close objects, so if there is a cluster between two clusters, they might merge with each other. If farthest pair is selected, there may be cases where the distance between two clusters is not far enough to merge.

#### K-Means

$k$ random points are selected as the center of clusters. After that, each data point is assigned to the cluster center closest to itself, and the cluster center is updated with the average of the assigned data points.

The objective function of this algorithm is $J = \sum_{i=1}^{N} \sum_{k=1}^{K} r_{i,k} |x_i-\mu_k|^2$, where $x$ is a data point and $\mu$ is the center point of $k$ clusters. And $r_{i,k}$ is a constant term that is 1 if the data point belongs to cluster $k$, otherwise 0.

This objective function decreases when the cluster to which a data point belongs changes, and this number is finite since it repeats for $N$ data points as much as $K$ clusters.

The K-Means algorithm does not always produce the same result after specifying $K$ clusters. This is because the initial values (cluster centers) are randomly specified.

In this algorithm, the time complexity of the first step, assigning each data point to the nearest cluster center, is $O(KN)$ since $K$ cluster centers are specified and repeated for each of the total $N$ data points. The process of updating cluster centers takes $O(N)$ since it uses a total of $N$ data points.

In this algorithm, the parameter $K$ must be predetermined, and this is determined by the elbow point (=the interval where the objective function decreases the most and the next decrease is small).

---

### Dimension Reduction

Recent machine learning pursues manifold learning. When $D$-dimensional data points are given as $x^{(1)}, \dots, x^{(N)} \in R^D$, they are transformed into small $d$-dimensional $f(x^{(1)}), \dots, f(x^{(N)}) \in R^d$ through some function, where $d << D$, but this is the process of reducing while preserving the meaning of high dimensions as much as possible.

$$
\sum_{i < j} R(|f(x^{(i)}) - f(x^{(j)}), \rho(x^{(i)}, x^{(j)}))
$$

In this way, the distance function is embedded to minimize distortion between the two while maintaining distance.

#### Principal Component Analysis(PCA)

In the above equation, $\rho(x^{(i)}, x^{(j)})$ uses euclidean distance and $R(\alpha, \beta) = (\alpha - \beta)^2$ uses squared loss.

This algorithm also reduces dimensions while preserving as much information as possible. Through linear combination, the maximal variance (first axis) takes the direction of the axis where data is most spread out, and among directions orthogonal to that axis, it selects the direction of the axis with the second largest variance.

The first task to be done is to give the difference from the mean for all data points to make them zero-centered and obtain normalized data. After this process, using normalized data $\tilde{x}$, the covariance matrix is obtained to find the axis with the largest variance. The formula is as follows.

$$
\hat{\sum} = \frac{1}{N} \sum_{i=1}^{N} \tilde{X}^{(i)}{\tilde{X}^{(i)}}^T
$$

Next, eigenvalue decomposition is performed. It is defined as $\sum x = \lambda x$, and in matrix version as $\sum U = \Lambda U$, where $U$ plays a role in rotating (axis-aligned) the axis with the largest variance to the $x$-axis. After this decorrelated process, the $x$ and $y$ axes become the first and second axes.

<img src="https://intoli.com/blog/pca-and-svd/img/basic-pca.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Subsequent data points have orthogonal covariance matrices, and each dimension is placed in a state where it is no longer correlated. In the above equation, $\lambda$ is $\begin{bmatrix} \lambda_1 & 0 & 0 & \cdots & 0 \\ 0 & \lambda_2 & 0 & \cdots & 0 \\ \vdots & \vdots & \ddots & \ddots & \vdots \\ 0 & 0 & 0 & 0 & \lambda_d \end{bmatrix}$, which is a matrix that collects the variance of $d$ dimensions. Up to $k$ dimensions, it has large values in order, and when it reaches $d$ dimensions, it has 0 to proceed with dimension reduction.

---

### References

[Original source #1](https://youtu.be/eTqt4oRfXrA?si=naP3qVFz4Uuzu0hV)
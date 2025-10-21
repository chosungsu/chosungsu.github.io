---
title: 'Decision Tree'
date: '2022-07-22'
tags: ['Machine Learning', 'lecture']
---

### Tree

A general tree has a root at the top and branches out to create descendant nodes. When a descendant node becomes a root and another tree structure takes root below it, this is called a subtree.

#### Decision tree

<img src="https://cdn-ildoenj.nitrocdn.com/cspHczubSJxydpVepnzkBXUBiIwgOhZL/assets/images/optimized/rev-9cfbcc4/www.displayr.com/wp-content/uploads/2018/07/what-is-a-decision-tree.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

As shown in the image above, a Decision Tree (DT) constructs nodes according to each condition and determines descendants based on whether the conditions are satisfied.

The advantages include simplicity and ease of interpretation. However, it does not achieve high accuracy compared to other machine learning models.

#### Regression tree

<img src="https://www.mathworks.com/help/stats/simpleregressiontree.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

As shown in the image, each parent node creates continuous conditions for variable sets $x$, and descendant node trees are generated with yes or no decisions accordingly. This is called a regression tree.

$$
\text{min} \sum_{j=1}^{J} \sum_{i \in R_j} (y_i-\hat{y_j})^2
$$

This formula is the objective function that minimizes least squares, where the sum of differences between the $i$-th data point and the representative value of the $j$-th region should be minimized. The representative value for each region is obtained by $\underset{c}{argmin} \sum_{i \in R_j}(y_i-c)^2$, selecting the value $c$ that minimizes the sum of differences between data points and the representative value.

When we differentiate $f(c) = \sum_{i \in R_j} (y_i^2 - 2cy_i + c^2)$, we get $f'(c) = - 2 \sum_{i \in R_j} y_i + 2n_j c = 0$, and the value $c$ that satisfies this is $\frac{1}{n_j}\sum_{i \in R} y_i$, which is the mean. Therefore, it has been proven that the mean should be used as the representative value for each region.

Now, regarding methods for dividing regions, there are two approaches: top-down and greedy. The former starts from the root node and proceeds with recursive binary splitting into two branches. The latter performs splitting based on current conditions if it seems optimal, without considering future outcomes. However, in most cases, the current choice turns out not to be a good choice in the future.

Next, cut points are specified. Assuming there are not many points, they are specified individually, then split with $x < s$, $x \ge s$, and the process of minimizing the above least squares is performed. The condition $x < s$ is marked on the node.

#### Classification tree

The difference from regression trees is that data points are not continuous but discrete or categorical, so even in least squares, the representative value must be determined by counting the number of labels.

$$
\hat{y}_j = \underset{k}{\text{argmax}} \frac{1}{n_j} \sum_{x_i \in R_j} I(y_i = k)
$$

This is expressed mathematically as above. Based on this, when splitting, it is guided to proceed in a direction that increases classification accuracy.

<img src="https://miro.medium.com/1*M15RZMSk8nGEyOnD8haF-A.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

$$
\frac{1}{n_k} Impurity(R_k(v,j,s)) \\
= -\sum_{k=1}^{K} p_{j,k} log P_{j,k}
$$

In this objective function that minimizes impurity, we should pursue low entropy (disordered state).

---

### Tree pruning with RT

When there are not many data points overall and the amount of data points in different result nodes after decision tree splitting is too small, causing problems in specifying representative values, this can be called overfitting. At this time, reducing the number of parameters or making boundaries smooth can be alternatives.

When a tree has few splits and few region divisions, variance is low and bias interpretation is easier. However, pruning, another method to solve overfitting problems, proceeds by cutting more branches and removing branches that cause overfitting.

#### Weakest link pruning (=cost complexity)

Using a non-negative tuning parameter $\alpha$, the formula using the difference between the representative value $\hat{y}_{R_m}$ of each region and data points is as follows.

$$
\sum_{m=1}^{|T|} \sum_{x_i \in R_m} (y_i-\hat{y}_{R_m})^2 + \alpha|T|
$$

Here, the cost of the weight term corresponds to the size of the tree, i.e., the number of nodes. Therefore, the larger the tree size, the larger the weight. Starting from the branch with the smallest benefit, leaf nodes are merged.

#### Building process

The tree is grown through recursive binary splitting and stops when the number of all regions remains less than the desired number of regions and cannot be split further. After that, branches and regions with small gains and minimal impact on the existing tree when merged are merged again.

The method to determine the tree size $|T|$ is to consider the size just before the point where errors decrease as splitting continues in training data, but errors start to increase again after a certain size in validation data.

Therefore, when merging, the total number of leaf nodes decreases by one, and merging continues until $|T|$ leaf nodes remain.

---

### References

[Original source #1](https://youtu.be/PVGTnn84jL4?si=331ER9vlHmknx-Tm)
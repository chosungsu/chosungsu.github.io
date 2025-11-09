---
title: 'An Efficient Federated Distillation Learning
System for Multi-task Time Series Classification'
date: '2022-09-16'
tags: ['anomaly detection', 'paper review']
---

### Abstract

This paper proposes EFDLS, an efficient federated distillation learning system for multi-task time series classification (TSC). It consists of a central server and multiple mobile users, where different users can execute different TSC tasks. It has two novel components: a Feature-based Student-Teacher (FBST) framework and a Distance-based Weights Matching (DBWM) scheme.

Within each user, the FBST framework transfers knowledge from the teacher's hidden layers to the student's hidden layers through knowledge distillation, where the teacher and student have the same network structure. For each connected user, hidden layer weights of the student model are periodically uploaded to the EFDLS server.

The DBWM scheme is deployed on the server, and least square distance is used to measure similarity between weights of two models. For each connected user, this scheme finds the closest partner among all uploaded weights. The server exchanges and sends back the weights of this user and partner to these two users. Then these users load the received weights into hidden layers of their teacher models.

---

### Introduction

Time series data is a sequence of data points ordered in time associated with one or more time-dependent variables, and has been successfully applied to fields such as anomaly detection, traffic flow prediction, service matching, and stock prediction.

Considerable research attention has been focused on time series classification. For example, Fully Convolutional Networks were introduced for local feature extraction. Zhang et al. devised TapNet (Attentional Prototype Network) to capture rich representations from input. Lee et al. designed a learnable dynamic temporal pooling method to reduce the temporal pooling size of obtained hidden representations.

Chen et al. applied asynchronous learning and temporally weighted aggregation to improve system performance. Ensemble systems used randomly selected subsets of clients to learn multiple global models against malicious clients. Hong et al. combined adversarial learning to generate federated adversarial debiasing for fair and transferable representations.

Each time series dataset has specific characteristics such as length and variance, which are highly imbalanced and strongly non-independent and non-identically distributed (non-IID).

---

### Related Work

#### 1. Traditional Algorithms

Two representative algorithm streams are distance-based and feature-based.

$\Rightarrow$ Distance-based methods

It is common to combine Dynamic Time Warping (DTW) and Nearest Neighbor (NN). For example, there are DTWA, DTWI, and DTWD.

In addition, numerous DTW-NN-based ensemble algorithms that leverage the advantages of DTW and NN have been proposed. For example, Line et al. presented the Elastic Ensemble (EE) algorithm considering 11 types of 1-NN-based elastic distances.

Hierarchical Vote Collective of Transformation-based Ensembles (HIVE-COTE) and local cascade ensemble are representative ensemble algorithms in the literature.

$\Rightarrow$ Feature-based models

Aim to capture sufficiently discriminating features from given data.

For example, Line et al. introduced shapelet transformation methods to find representative shapelets that reflect trends in raw data.

Bag-of-features representation frameworks have been applied to extract information from different positions in sequences.

Dempster et al. applied minimally random convolutional kernel transforms to explore transformed features from data.

#### 2. Deep Learning Algorithms

Deep learning algorithms focus on unfolding the internal representation hierarchy of data to extract inherent connections between representations. Most existing deep learning models are either single-network-based or dual-network-based.

$\Rightarrow$ Single network

Captures important correlations within the representation hierarchy of data through one (usually combined) network. Examples include FCN, ResNet, Shapelet-NN, and InceptionTime.

$\Rightarrow$ Dual network

Generally consists of two parallel networks: Local-feature Extraction Network (LFN) and Global-Relation Extraction Network (GRN). Examples include FCN-LSTM, RTFN, and ResNet-Transformer.

---

### Method

<img src="https://velog.velcdn.com/images/devjo/post/fc8be6c2-509b-4679-84a4-9c59fbcb3ccd/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

EFDLS is a secure distributed system for multi-task TSC. It has a central server and multiple mobile users. Let the total number of users in the system be $N_{tot}$ and the number of connected users be $N_{conn}$, where $N_{conn} \le N_{tot}$. Each user executes one TSC task at a time, and different users can execute different TSC tasks. For any two users, they either execute different tasks such as gesture and classification, or execute the same task with different data sources.

In the system, users train models locally based on knowledge distillation and share model weights with users with similar expertise through the server. We propose a Feature-based Student-Teacher (FBST) framework deployed as each user's learning model. Within each user, knowledge from the teacher model's hidden layers is transferred to the student model's hidden layers. For each connected user, hidden layer weights of the student model are periodically uploaded to the EFDLS server.

We propose a Distance-based Weights Matching (DBWM) scheme deployed on the server, adopting least square distance to measure similarity between weights of two given models. After weights from all connected users are fully uploaded, the DBWM scheme is executed for each connected user to find a partner with the most similar weights among all connected users. In this way, all users have partners to match. The system enables users to benefit from knowledge sharing without sacrificing security and privacy.

#### 1. Feature-based Student-Teacher Framework (FBST)

In the FBST framework, student and teacher models have the same network structure. Within each user, feature-based KD facilitates knowledge transfer from the teacher's hidden layers to the student's hidden layers, helping the student capture rich and valuable representations from input data.

The feature extractor includes multiple hidden layers and a classifier.

Hidden layers are responsible for local feature extraction and consist of three convolutional blocks (ConvBlock1, ConvBlock2, ConvBlock3), one average pooling layer, and one dense (fully connected) layer. Each ConvBlock consists of a 1D CNN module, batch normalization (BN) module, and ReLU activation function, defined as follows:

$$
f_{convblock}(x) = f_{relu}(f_{bn}(W_{conv} \otimes x + b_{conv}))
$$

where $W_{conv}$ and $b_{conv}$ are the weight and bias matrices of CNN, respectively. $\otimes$ represents the convolution operation. $f_{bn}$ and $f_{relu}$ represent batch normalization and ReLU functions, respectively. For the input of BN, $x_{bn} = {x_1, x_2, \ldots, x_{N_{bn}}}$, where $x_i$ is the $i$th instance and $N_{bn}$ is the batch size.

$$
\begin{aligned}
&f_{bn}(x_{bn}) \\
&= f_{bn}(x_1, x_2, \ldots, x_{N_{bn}}) \\
&= \left( \alpha \frac{x_1 - \mu}{\delta + \zeta} + \beta, \ldots, \alpha \frac{x_{N_{bn}} - \mu}{\delta + \zeta} + \beta \right)
\end{aligned}
$$

$$
\mu = \frac{1}{N_{bn}} \sum_{i=1}^{N_{bn}} x_i, \quad \delta = \sqrt{\frac{1}{N_{bn}} \sum_{i=1}^{N_{bn}} (x_i - \mu)^2}
$$

where $\alpha \in \mathbb{R}^+$ and $\beta \in \mathbb{R}$ are parameters to be learned during training. $\zeta > 0$ is an arbitrarily small number. The classifier consists of a dense layer and a Softmax function, mapping high-level features extracted from hidden layers to corresponding labels.

#### 2. Knowledge Distillation

Feature-based KD regularizes the student model by transferring knowledge from the corresponding teacher's hidden layers to the student's hidden layers. For any user, the student model captures sufficiently discriminating representations from data under supervision of the teacher model.

For the teacher's hidden layers, outputs of ConvBlock 1, 2, 3, and the dense layer are denoted as $O^{T,1}_i, O^{T,2}_i, O^{T,3}_i, O^{T,4}_i$, respectively. For the student's hidden layers, their outputs are denoted as $O^{S,1}_i, O^{S,2}_i, O^{S,3}_i, O^{S,4}_i$, respectively. Following previous research, the KD loss $L^{KD}_i$ of user $U_i$ is defined as:

$$
L^{KD}_i = \sum_{m=1}^{4} ||O^{T,m}_i - O^{S,m}_i||^2
$$

The total loss $L_i$ of $U_i$ consists of KD loss $L^{KD}_i$ and supervised loss $L^{Sup}_i$. $L^{Sup}_i$ measures the average difference between ground truth labels and prediction vectors using the cross-entropy function.

$$
L^{Sup}_i = - \frac{1}{N_{seg}} \sum_{j=1}^{N_{seg}} y_j \log(\hat{y}_j)
$$

where $N_{seg}$ is the number of input vectors, and $y_j$ and $\hat{y}_j$ are the ground truth label and prediction vector of the $j$th input vector, respectively. The total loss $L_i$ is defined as:

$$
L_i = \epsilon \times L^{Sup}_i + (1 - \epsilon) \times L^{KD}_i
$$

where $\epsilon \in (0, 1)$ is a coefficient to balance $L^{Sup}_i$ and $L^{KD}_i$. In this paper, we set $\epsilon = 0.9$.

#### 3. Distance-based Weights Matching

Least square distance is used to compute similarity between weights of two given models. Once weights uploaded by all connected users are received, the DBWM scheme immediately initiates the weights matching process to find partners for each connected user.

---

### Conclusion

The FBST (Feature-based Student-Teacher) framework facilitates knowledge transfer from the teacher model's hidden layers to the student model's hidden layers, helping the student capture instance-level representations from input. The DBWM (Distance-based Weights Matching) scheme finds partners for each user in terms of similarity among uploaded weights, enabling knowledge sharing of similar expertise across different users.

Through FBST and DBWM, the proposed EFDLS securely shares similar expertise across different tasks for multi-task time series classification.

---

### References

[Original source #1](https://arxiv.org/pdf/2201.00011)

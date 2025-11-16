---
title: 'Applications of Domain Generalization to
Machine Fault Diagnosis: A Survey'
date: '2025-09-20'
tags: ['fault diagnosis', 'paper review']
---

### Abstract

In real industrial scenarios, changes in operating conditions, presence of data noise, and failures of measurement equipment inevitably affect the distribution of perceptive data. Deep learning–based fault diagnosis algorithms heavily rely on the assumption that source and target data are independent and identically distributed; learned diagnostic knowledge is difficult to generalize to out-of-distribution data.

Domain Generalization (DG) aims to achieve generalization to arbitrary target domain data by training diagnostic models using only limited source domain data. DG research for fault diagnosis has made remarkable progress in recent years, yielding many results.

This paper provides the first comprehensive literature review on DG for fault diagnosis from a learning-mechanism–oriented perspective to summarize recent developments. Specifically, we first comprehensively review existing methods based on similarities in fundamental principles and design motivations. We then analyze recent trends in DG for fault diagnosis. Finally, we present existing challenges and future prospects.

---

### Introduction

Fault diagnosis technology is an engineering science closely integrated with production sites and a product of advances in production process automation. With advances in sensing and computing, condition monitoring of automated equipment has entered a new era of intelligent management.

<img src="https://velog.velcdn.com/images/devjo/post/79a138d8-512a-496c-94ab-61e9b8afe158/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

As an important stage in intelligent operation and maintenance of industrial equipment, fault diagnosis technology has entered a phase of development in both depth and breadth, from signal analysis methods to deep learning methods, and from simulation experiment scenarios to real industrial applications. Deep neural networks are widely used in DL-based fault diagnosis methods to process equipment parameters collected by measurement equipment and generate fault diagnosis results with the help of their powerful data analysis and mining capabilities. Compared to signal processing–based methods, the superiority of DL-based methods lies in their advanced ability to adaptively process diverse data. Through advanced learning in DL, precise fault features are generated, enabling more accurate assessment of the health state of automated equipment. The intelligent operation and maintenance process of automated equipment using deep learning technology is shown in the figure above.

<img src="https://velog.velcdn.com/images/devjo/post/e1762408-cb0a-4246-a55b-ae860bdaccac/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Although DL can achieve rapid and accurate fault diagnosis for automated equipment, it strongly relies on an overly simplified assumption that training (source domain) and test (target domain) data are independent and identically distributed. When DL algorithms face data outside the source domain distribution, DL models trained only on source domain data often suffer significant performance degradation due to domain shift. Given this, successfully addressing the domain shift problem between source and target domain data is a top priority in fault diagnosis. When target domain data can be accessed and used directly without restrictions, the most common solution is to transfer fault knowledge learned by the model from the source domain to target domain data through Transfer Learning (TL) methods, which is called Domain Adaptation (DA).

---

### Methods

Although DG research received relatively late attention in fault diagnosis, DG methodology development has progressed very rapidly. Theoretical research is still immature, and DG technology remains in an exploratory stage.

$$
\mathcal{D}_{\text{train}} = \{ \mathcal{S}_i | i=1,...,M \}, \\
\mathcal{S}_i = \{(\mathbf{x}_i^{n_s}, y_i^{n_s})\}_{n_s=1}^{N_s}, \\
\mathcal{T}_j = \{(\mathbf{x}_j^{n_t}, y_j^{n_t})\}_{n_t=1}^{N_t}
$$

There are $M$ source domains for model training, where $\mathcal{S}_i$ represents the $i$-th source domain sample set with sample size $N_s$. The goal of DG is to learn a prediction function $\mathcal{F} = \{ \mathcal{Y}, f(\mathbf{x}) \}$ that can generalize from $M$ source domains to arbitrary unseen domains, and achieve minimum prediction error on unknown target domains $\mathcal{D}_{\text{test}} = \{ \mathcal{T}_j | j=1,...,L \}$. $\mathcal{T}_j$ represents the $j$-th target domain with a total of $N_t$ samples.

#### Domain Alignment (Adversarial Learning)

<img src="https://velog.velcdn.com/images/devjo/post/bb63862d-2afb-458f-8fbd-a99703235eb9/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

In fault diagnosis methods, adversarial learning in the domain alignment category expands sample size through Generative Adversarial Networks (GANs) to enable networks to train more fully and learn more generalized features, or performs adversarial training on multi-source domain data to mine domain-invariant features and make them robust to performance loss from domain shift.

$$
\min_{G} \max_{D} V(G, D) = \mathbb{E}_{\mathbf{x} \sim P_{\text{data}}} [\ln D(\mathbf{x})] + \mathbb{E}_{\mathbf{z} \sim P_{\mathbf{z}}} [\ln(1 - D(G(\mathbf{z})))]
$$

GANs consist of a generator and a discriminator. The generator is used to generate fake signal samples, and the discriminator distinguishes whether input samples are real or fake. The generator and discriminator compete with each other until the network reaches a stable state, i.e., Nash equilibrium.

Compared to GANs, domain adversarial methods remove the sample generation process, and target domain data are treated as generated data. Therefore, the generator used to generate fake samples tends to encode features extracted from source and target domains into a shared feature space. In domain generalization problems, traditional DA-based diagnostic methods cannot be used because target domain data are not accessible. In Multi-Source Domain Adversarial Learning (MSDAL), which performs adversarial learning between source and source domains, source domain $S_1$, $S_2$ samples are input to the feature extractor to extract high-level features. For generalization, a distance function is used and expressed as:

$$
\mathcal{L}_{\text{MMD}} = \frac{1}{\mathcal{C}} \sum_{c=1}^{\mathcal{C}} \left\| \frac{1}{N_c^{\mathcal{S}_1}} \sum_{i=1}^{N_c^{\mathcal{S}_1}} \Phi(\mathbf{F}_{c,i}^{\mathcal{S}_1}) - \frac{1}{N_c^{\mathcal{S}_2}} \sum_{j=1}^{N_c^{\mathcal{S}_2}} \Phi(\mathbf{F}_{c,j}^{\mathcal{S}_2}) \right\|_{\Re}^2
$$

However, adversarial learning on multi-source domain data alone makes it difficult to mine fault features outside the source domain distribution, limiting the network's ability to learn generalized fault features.

In real industrial scenarios, fault data collection is relatively limited, making it difficult to meet model training requirements in terms of data quantity and diversity, degrading the model's generalization ability to unseen domains. Moreover, diagnostic models are trained only on source domain data, making it difficult to break through the limitations of source domain distribution to learn fault features of out-of-distribution data. Li et al. applied time-stretching to augment source domain data and performed adversarial learning between augmented and raw source domain data to learn domain-invariant features. The motivation of this approach is to optimize the composition of training data by simulating different fault feature frequencies. Han et al. applied amplitude shifting and additional Gaussian noise to single-source domain data to simulate data distribution shifts caused by changes in operating conditions.

#### Domain Alignment (Classifier Optimization)

<img src="https://velog.velcdn.com/images/devjo/post/db97cd61-398b-4063-bdaa-f80976fb164c/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Classifiers play an important role in fault diagnosis as output layers. Fault diagnosis networks are typically trained by training samples to obtain a single optimal individual classifier. However, it has been found that using only a single classifier easily faces representation bottlenecks at the decision level, leading to overfitting of fault diagnosis networks.

To mitigate classifier bottlenecks, focus has been placed on organically integrating multiple embeddings or classifiers to optimize the network's decision-making process and achieve better generalization performance than a single classifier.

Qian et al. constructed a residual fusion classifier to improve classifier generalization performance by fusing multiple fault features. Zhao and Shen selected multi-task classifiers that maintain domain-specific structures through similarity measurement for final merged decisions.

#### Domain Alignment (Meta-Learning)

<img src="https://velog.velcdn.com/images/devjo/post/2aa27927-49b1-48e5-96a1-d3220a78369f/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Meta-learning can be defined as simulating the generalization process from source to target domains in real scenarios, forcing models to learn domain-invariant features during training. Essentially, this means simulating the training and testing processes of real scenarios during model training, so that the model's recognition performance improves in both meta-training and meta-testing domains. Ultimately, the model performs well on unknown target domains.

Ren et al. introduced a gradient alignment algorithm into the meta-learning framework to further mitigate domain shift between multiple source domains.

#### Domain Alignment (Regularization)

Regularization is a method to prevent model overfitting in machine learning, generally achieved by adding regularization terms to the loss function of network training to adjust the network's learning process.

In DG, regularization can help models achieve better performance on unseen domains because it encourages models to learn more general features rather than features specific to source domains. Maximum Mean Discrepancy (MMD) is a widespread regularization technique that can force feature distributions of different domains to be close.

For example, Li et al. applied $L_1$ regularization to high-level data representations, which are outputs of the feature extractor. In multi-source domain adversarial training, intra-class difference distances are minimized and inter-class difference distances are maximized to improve generalization of diagnostic networks.

Another common use of regularization is to identify and separate domain-specific features from domain-invariant features to facilitate network learning of domain-invariant features. For example, Pang designed Hilbert-Schmidt Independence Criterion (HSIC) regularization to separate learned fault features from domain-specific features. In this method, HSIC terms of multiple source domains and their corresponding domain labels are first computed, then minimized so that features learned by the network have maximum independence from domain knowledge.

#### Domain Alignment (Causal Learning)

There is growing recognition that learning domain-invariant features by analyzing only correlations between source domain data alone is insufficient to give fault diagnosis models strong logical reasoning and judgment capabilities. When large domain gaps occur between unseen and source domains, the generalization performance of fault diagnosis models decreases significantly. For example, Jia et al. used structural causal models to separate time-series data into causal factors (fault-related representations) and non-causal factors (domain-related representations), and ensured information integrity of separated factors through reconstruction loss of the decoder.

#### Domain Alignment (Metric Learning and Contrastive Learning)

Metric learning is generally applied to high-level feature representations of multiple source domains extracted by feature extractors to force networks to learn domain-invariant features. For example, Ren et al. inserted metric learning into the feature extractor to extract discriminative features from a class-level optimization perspective, in cooperation with an adversarial learning mechanism based on domain fuzzy strategies.

Since metric learning is mainly performed in binary or triplet forms, many studies minimize triplet loss to encourage networks to capture discriminative representations and improve intra-class compactness and inter-class separability at the class level.

$$
\mathcal{L}_{\text{tri}} = \sum_{i=1}^{N_{tr}} \max(0, d(\mathbf{a}_i, \mathbf{p}_i) - d(\mathbf{a}_i, \mathbf{n}_i) + \gamma)
$$

Here, $N_{tr}$ is the total number of triplets selected from the training set, $\mathbf{a}_i$ is the feature vector of the anchor sample, $\mathbf{p}_i$ is the feature vector of the positive sample, and $\mathbf{n}_i$ is the feature vector of the negative sample. $d(\mathbf{a}_i, \mathbf{p}_i)$ is the distance function between samples $\mathbf{a}_i$ and $\mathbf{p}_i$, and $\gamma$ is a positive constant that ensures a minimum difference between the distance of positive sample pairs and the distance of negative sample pairs.

Contrastive learning is generally applied to input samples of diagnostic networks, mainly aiming to make augmented samples different from source domain samples while containing rich fault information. Wang et al. constructed an extended domain generation module to generate new domains different from source domain distributions. They also jointly optimized the generation module and fault diagnosis module using contrastive learning and adversarial learning. The former was used to make extended domain samples significantly different from source domain samples to enrich the style of fault samples, while the latter aligned data distributions of extended domain samples and multi-source domain samples so that the feature extractor could learn more domain-invariant features with different styles.

#### Federated Learning

Federated learning is a distributed machine learning method proposed in recent years that can provide a new way to balance diagnostic accuracy across domains and privacy. In the training procedure, multiple participants can jointly train machine learning models without local data exchange, and the performance of the final model is superior to local training and close to that of centralized training.

---

### Conclusion

Fault diagnosis under unknown conditions has always been a hot topic and a cutting-edge research target in recent years. Compared to Domain Adaptation research, which requires access to target domain data, Domain Generalization is more suitable for the requirements of real industrial scenarios.

This paper provided the first comprehensive literature review on DG for fault diagnosis from a learning-mechanism–oriented perspective, summarizing developments in recent years. This paper systematically reviewed existing research results related to DG for fault diagnosis and classified existing methods into GAN, MSDAL, MSDAL-DataAU, MSDAL-SG, classifier optimization, meta-learning, regularization, causal learning, metric learning, contrastive learning, data augmentation, ensemble learning, FL, semi-supervised learning, and single-source domain generalization. The fundamental principles, research motivations, advantages, and disadvantages of each method were analyzed and summarized.

---

### References

[Original Source #1](https://ieeexplore.ieee.org/document/10965929)

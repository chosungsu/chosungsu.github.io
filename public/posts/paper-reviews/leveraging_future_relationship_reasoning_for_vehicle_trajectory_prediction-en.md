---
title: 'Leveraging future relationship reasoning for vehicle trajectory prediction'
date: '2025-04-09'
tags: ['multi-agent', 'paper review']
---

### Abstract

Understanding interactions between multiple agents is crucial for realistic vehicle trajectory prediction. Existing methods attempt to infer interactions from observed past agent trajectories using pooling, attention, or graph-based approaches, but these rely on deterministic approaches. However, these methods can fail in complex road structures because they cannot predict various interactions that may occur in the future.

This paper proposes a novel approach that predicts probabilistic future relationships between agents using lane information. To obtain the approximate future movement of agents, our method first predicts the lane-level waypoint occupancy probability of vehicles. Then, assuming that agent pairs passing through adjacent lanes will interact strongly, we utilize the adjacent lane crossing time probability for each agent pair. We model interactions using probability distributions, which allows for multiple possible future interactions. This distribution is learned from the posterior distribution of interactions obtained from ground truth future trajectories.

---

### Introduction

Predicting the future trajectory of vehicles is crucial for the safety of autonomous driving. Early heuristic prediction models only utilized the past trajectory of the target vehicle. However, with the emergence of deep learning, more accurate predictions became possible by considering vehicle relationships with high-definition (HD) maps and surrounding agents together.

Previous studies used pooling, multi-head attention, or spatio-temporal graph approaches to model interactions from past trajectories of surrounding vehicles. However, we observed that these methods easily fail in complex road structures. The difficulty of inferring future relationships between agents based solely on past trajectories became apparent, and we judged that integrating road structure would make the inference process much easier.

The decision-making process of human drivers can provide insights into how to model interactions. They first set goals they want to reach on the map. Next, to infer interactions with surrounding agents, they roughly infer how other agents will behave in the future. Then, they infer interactions with other agents by inferring the possibility that other vehicles' future paths will overlap with their own path. In this way, drivers consider that the more other vehicles' future paths overlap with their own path, the more important the interaction is. In this paper, we define the interaction obtained through this process as Future Relationship.

In our proposed method, interactions between agents are represented as edges, and the higher the probability, the higher the interaction is judged to be.

---

### Related work

#### 1. Goal-based trajectory prediction

Predicting future trajectories at once is a challenging task. Instead, goal-conditional prediction samples goal candidates and then predicts trajectories conditioned on those goals, showing state-of-the-art performance especially in long-range prediction tasks and being usefully utilized (Zhao et al. (2021); Gu et al. (2021); Phan-Minh et al. (2020); Chai et al. (2020); Zhang et al. (2021)).

CoverNet (Phan-Minh et al. (2020)) and MultiPath (Chai et al. (2020)), which quantize trajectory space with anchor sets, often generate map-agnostic trajectories that cross undrivable areas because surrounding maps are not considered. TNT (Zhao et al. (2021)) uses goal points sampled from lane centerlines, and GoalNet (Zhang et al. (2021)) uses lane segments as trajectory anchors. However, while previous methods assume that the probability of reaching the final destination is random, they assume that trajectories for reaching specific goal regions are unimodal. In this paper, we assume inherent uncertainty where trajectories may differ due to interactions with surrounding vehicles to reach specific goal regions.

#### 2. Interaction modeling

Considering interactions between agents helps predict socially aware trajectories. In the very early stages, interactions were obtained by pooling interaction features in local regions (Deo & Trivedi (2018); Gupta et al. (2018)). Other studies attempted to obtain interactions through attention-based (Ngiam et al. (2022); Mercat et al. (2020); Vemula et al. (2018)) or GNN-based methods (Carrasco et al. (2021); Cao et al. (2021); Zeng et al. (2021); Casas et al. (2020); Liang et al. (2020); Gao et al. (2020)). However, in most previous methods, interactions between agents were learned only with regression loss, which is insufficient to represent dynamic and rapidly changing situations.

#### 3. Multi-modal trajectory prediction

Trajectory prediction is a probabilistic problem where there are multiple possible futures rather than a unique answer. Recently, deep generative models such as GAN (Goodfellow et al. (2014)) or VAE (Kingma & Welling (2013)) have been used to solve this problem. The most closely related GRIN (Li et al. (2021a)) argues that the multi-modality of trajectory prediction stems from two sources: individual intentions and social relationships with other agents. However, while GRIN only considers past interactions, we propose to consider future interactions considering the characteristics of vehicle movement.

---

### Formulation

In each scene, past and future trajectories of $N$ vehicles are observed. The past trajectory $x_t^-$ consists of positions for time steps $-t_p:0$ before the current time step. The future trajectory $x_t^+$ consists of positions for time steps $1:t_f$ after the current time step $t=0$.

Lane information is obtained from HD maps and consists of $M$ segmented polylines. It is represented as a graph $G=(l,e)$ where nodes $(l)$ correspond to different lane segments and edges $(e)$ represent relationships between segments. There are five relationships between segments: predecessor, successor, left adjacent, right adjacent, and same intersection. Predicted lane occupancy using probability distribution $\tau_t$ is expressed as $\tau_t^-$, and ground truth future lane occupancy as $\tau_t^+$.

---

### Method

Our focus is on modeling "Future Relationship" between agents. A simple method to infer future relationships is to predict all future vehicle trajectories and then calculate similarities between them. However, this method is inefficient and redundant because it requires performing prediction twice. Inspired by the idea that vehicles mainly follow lanes, this paper utilizes lane information for future relationship modeling. Our core idea is that if two vehicles are expected to pass through adjacent lanes, they are likely to interact in the future.

#### 1. Waypoint occupancy

<img src="https://velog.velcdn.com/images/devjo/post/287ee8ff-3b0a-4134-a38f-ed303e16e5c3/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

This paper requires two types of waypoint occupancy. One is $\tau_t^-$ predicted from past trajectories, and the other is ground truth $\tau_t^+$ to obtain prior and posterior distributions of interactions.

To predict waypoint occupancy from past trajectories, we encode past trajectories $x^-$ and lane graph $G$ into lane features $h_x^-, h_l$.

$$
\tau_{1:t_l}^- = softmax(MLP([h_x^-, h_l])) \in R^{NMt_f}
$$

As shown in the above equation, we predict waypoint occupancy. Softmax is applied so that the sum becomes 1. It is input to GCN to obtain proximity $PR^-$. During training, when ground truth occupancy is input, the posterior distribution of interactions is obtained as a Gaussian distribution.

#### 2. Future Relationship Module (FRM)

Calculate inter-agent proximity, obtain posterior and prior distributions. From the intermediate waypoint occupancy of vehicles ($\tau^{1:t_f−1}$), we calculate how each vehicle pair passes through adjacent lanes at each time step (inter-agent proximity). Based on that information and the past motion features of agents, we obtain two interaction distributions.

To calculate inter-agent proximity (PR), we first smooth waypoint occupancy using Graph Convolutional Network (GCN) (Welling & Kipf (2016)). The reason for doing this is that when a vehicle passes through a specific lane, it necessarily affects other vehicles passing through adjacent lanes, not necessarily the same lane. Therefore, we use 2-hop GCN layers to apply different smoothing for each lane connection (predecessor, successor, adjacent, same intersection). Specifically, each layer aggregates information from adjacent lanes and applies nonlinear transformations. Through this, the model can capture spatial dependencies between agents and improve the accuracy of inter-agent proximity calculation.

$$
\tilde{\tau^{1:t_f-1}}=\sum_{e \in {succ, pred, right, left, inter}} \sigma \\
*(D_e^{-1}A_e \tau^{1:t_f-1}W_e) \in R^{NM(t_f-1)}
$$

Using the smoothed waypoint occupancy from the above equation, we can obtain inter-agent proximity.

$$
PR=\tilde{\tau^{1:t_f-1}}*(\tilde{\tau^{1:t_f-1}})^T \in R^{NM(t_f-1)}
$$

To obtain the prior distribution, we use past features $h_x^{-1}$ and proximity. Interaction modeling should reflect diverse and probabilistic properties and include those occurring in all vehicle pairs.

Consequently, the prior distribution is defined as a Gaussian Mixture (GM) for each agent pair, and according to GMVAE, we define interaction edge $e^{ij}$ in d-dimension as $p_\theta(e|X) \sim \prod_K \pi_k N(\mu_k, I\sigma_k^2)$. These parameters are obtained through neural networks. Then we proceed with two sampling steps as follows.

$$
k=\text{argmax}_k(\pi_k+g), \\
z_e^{-1}=\mu_k+\sigma_k \epsilon
$$

Now to obtain the posterior distribution, we use waypoint occupancy and future features. The difference from the prior distribution is that the posterior distribution is modeled as a single Gaussian like $\mu, \sigma = \{\mu_{ij}, \sigma_{ij}\}^{1:N,1:N}$.

#### 3. Learning

$$
ELBO=-E_{q_{\upsilon}}[log(p_{\theta}(Y|X, z_e, \tau))] \\
+ KL[q_{\upsilon}(z_e|X, \tau) | p_{\theta}(z_e|X, \tau)]
$$

Since ground truth waypoint occupancy $\tau^+$ can be used, we train to predict waypoint occupancy $\tau^-$ using negative log-likelihood NLL. Since interaction edge $z_e$ is unobservable, we optimize ELBO using CVAE. In the above equation, $q_{\upsilon}$ is the approximate posterior distribution and $p_{\theta}$ is the prior distribution. To solve the degenerate problem where the decoder ignores edges during training, we limit the role of interaction edges to instantaneous motion to cause reconstruction loss.

$$
L_{nll}=-\tau^+log(\tau^-), \\
L_{KL}=-KL[q_{\upsilon}|p_{\theta}] \\
\approx log \sum_k \pi_k exp(-KL[q_{\upsilon}|p_{\theta,k}]), \\
L_{recon}=min_{z_e}\{E[log(p_{\theta}(Y|X, \tau^+))]\}
$$

The total loss is composed of the sum of the above three losses.

---

### Conclusion

This paper proposed the concept of Future Relationship for effectively learning interactions between vehicles for trajectory prediction. By explicitly utilizing lane information in addition to past trajectories, our FRM (Future Relationship Module) can infer appropriate interactions even in complex road structures.

The proposed model generates diverse yet socially plausible trajectory samples by probabilistically obtaining interactions, providing interpretable intermediaries such as waypoint occupancy or inter-agent proximity.

It achieved state-of-the-art (SoTA) performance in nuScenes, a long-range prediction task, and brought remarkable performance improvements in Argoverse, a short-range prediction task. It is expected that prediction performance can be further improved by using more sophisticated training methods like Ye et al. (2022) and Zhou et al. (2022) or better baseline models like GANet (Wang et al. (2022)).

---

### References

[Original Paper](https://arxiv.org/pdf/2305.14715)




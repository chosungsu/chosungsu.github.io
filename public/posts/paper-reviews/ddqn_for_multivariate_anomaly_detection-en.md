---
title: 'Double Deep Q-Learning With Prioritized
Experience Replay for Anomaly Detection
in Smart Environments'
date: '2022-09-26'
tags: ['time-series', 'paper review']
---

### Abstract

Anomaly detection in smart environments is crucial when dealing with rare events that can be safety-critical for individuals or infrastructure. Here, safety-critical means that these events can pose threats to personal safety or infrastructure security. However, recognizing abnormal events in smart environments is challenging due to the complex and highly variable nature of data recorded by monitoring sensors.

The methodologies proposed in the literature are often domain-specific and influenced by biased assumptions about the underlying data. In this study, we propose applying a deep reinforcement learning algorithm called Double Deep Q-Learning (DDQN) for anomaly detection in smart environments. Our proposed anomaly detector directly learns a decision function that can classify rare events based on multivariate sequential time series data.

We extended the algorithm with a Prioritized Experience Replay (PER) strategy and demonstrated that this PER extension improves detection performance. To evaluate our proposed solution, we used fall detection and occupancy detection datasets.

---

### Introduction

Recognizing rare events in smart environments is challenging due to the complex and highly variable nature of data recorded by monitoring sensors. This is especially true when the data is noisy, multivariate, and time-dependent. By solving a continuous Markov Decision Process (MDP), the reinforcement learning (RL) approach can overcome these difficulties. The method proposed in this paper learns to directly detect rare events by generating experiences in a data-driven manner. Recent research on anomaly detection considers combining deep learning methodologies with reinforcement learning paradigms.

---

### Related work

Kurt et al. proposed direct application of reinforcement learning for anomaly detection. The authors investigated a model-free reinforcement learning approach for online detection of cyber attacks. They modeled the anomaly detection problem as a Partially Observable Markov Decision Process (POMDP) and evaluated the effectiveness of a model-free SARSA algorithm for generating optimal anomaly detectors for small problem sizes. Zhong et al. proposed a deep actor-critic reinforcement learning framework for anomaly detection in sensor data. Their proposed deep actor-critic agent dynamically selects sensors to test based on sequential processing data.

Subsequently, a general experience collection framework for time series anomaly detection based on Deep Q-Learning (DQN) was proposed. This adopted Long Short-Term Memory (LSTM) networks to model temporal dependencies in data and applied Q-learning algorithms with memory replay. However, a drawback of the proposed approach is that it is limited to one-dimensional feature spaces.

Unlike the previously mentioned studies, this paper's research substantially extends by adapting to multivariate sequential time series learning scenarios. Additionally, we propose the use of DDQN for anomaly detection to make policy estimation more stable.

---

### Methodology

#### 1. DOUBLE DEEP Q-Learning

Q-learning is one of the most popular reinforcement learning algorithms, but it can exhibit unexpectedly high action values under certain conditions. The overestimation problem of action values occurs in the maximization step of the Q-learning update function, where overestimated values are automatically preferred. The basic DQN (Deep Q-Network) algorithm cannot solve this problem because the Q-function estimator, a multi-layer perceptron (MLP), directly represents bootstrapped value functions for each sequential update task. While the addition of uncorrelated replay memory plays a role in suppressing overestimation, overestimation still occurs and negatively affects the learned policy. Hasselt et al. proposed a delayed update target network to further reduce the correlation between bootstrapped experiences and value function updates.

In standard deep Q-learning, the target value is calculated as follows:

$$
Y_t=r_t+\gamma max_{a_{t+1}}(Q(s_{t+1}, a_{t+1}))
$$

In DDQN, weights are updated with delay and through uncorrelated experiences, calculated as follows:

$$
Y_t=r_t+\gamma Q_{\theta}( \\ 
s_{t+1}, \\ 
\text {argmax}_{a_{t+1}}(Q(s_{t+1}, a_{t+1})))
$$

Here, $Q_{\theta}$ is the declaration of the target network. We use $Q$ for action selection and $Q_{\theta}$ for action evaluation.

#### 2. Prioritized experience replay

Experience replay is one of the key features of deep Q-learning. Focusing on rare event classification tasks, we propose extending the DDQN algorithm with PER (Prioritized Experience Replay). PER demonstrates that replay frequency and importance can be adjusted according to priority regardless of experience importance. The main idea is that some experiences are more important to the agent than others.

Probabilistic sampling by probability value $P(t)$ is defined as follows:

$$
P(t) = \frac{p_t^{\beta}}{\sum_k p_k^{\beta}}
$$

This equation generates an unbiased sampling distribution, and the exponent $\beta$ is adjusted according to priority. The rank value $p_t$ can be defined as the proportional calculation formula $p_t=|\delta_t|+\epsilon$ or the rank-based priority formula $p_t=\frac{1}{\text {rank} (t)}$.

---

### Conclusion

In this paper, we extended DDQN with a PER (Prioritized Experience Replay) sampling strategy and confirmed that using PER makes the class imbalance problem in the corresponding dataset less severe, resulting in a more robust detector.

We achieved 98.2% accuracy and 96.0% F1-score on the occupancy detection dataset. On the larger and more variable fall detection dataset, we achieved 92.6% accuracy and 70.5% F1-score, outperforming most approaches proposed in previous studies.

---

### References

[Original Source #1](https://ieeexplore.ieee.org/document/9786787)

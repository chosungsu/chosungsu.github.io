---
title: 'Time Series Anomaly Detection via Reinforcement Learning-Based Model Selection'
date: '2022-09-05'
tags: ['time-series', 'paper review']
---

### Abstract

Time series anomaly detection has been recognized as crucial for reliable and efficient operation of real-world systems. Many anomaly detection methods have been developed based on various assumptions about anomaly characteristics. However, due to the complex nature of real data, different anomalies within time series typically exhibit diverse profiles, which support different anomaly assumptions. For this reason, it is difficult to find a single anomaly detector that can consistently outperform other models.

In this study, to leverage the benefits of diverse base models, we propose a reinforcement learning-based model selection framework. Specifically, we first train a pool of various anomaly detection models, and then dynamically select candidate models from these base models using reinforcement learning. Through experiments on real data, we demonstrated that the proposed strategy can actually outperform all baseline models in terms of overall performance.

---

### Introduction

As an essential part of cyber-physical system technology, smart grid technology aims to enhance the safety and efficiency of power grids by utilizing advanced infrastructure, communication networks, and computation technologies. With recent advances in machine learning, various machine learning technologies have already found application cases in this field, such as sustainable energy management, power load forecasting, electric vehicle charging prediction, and electric vehicle charging scheduling. Anomaly detection, which is crucial in determining the operational status of cyber-physical systems, is also one of the potential application areas in this field and will be the main topic of this paper.

Anomalies, or outliers, are defined as "observations that appear to be inconsistent with the rest of the data set" or "data points [that deviate from most sequence patterns or distributions]." The occurrence of anomalies generally indicates potential risks in the system. That is, abnormal meter measurements in power grids may suggest malfunctions or possible cyber attacks. Anomalies in financial time series may indicate "illegal activities such as fraud, risk, identity theft, network intrusion, account takeover, and money laundering." Therefore, anomaly detection is important for ensuring operational security of systems and can be found in applications in fields such as medical systems, online social networks, Internet of Things (IoT), and smart grids.

Anomalies are most likely to occur with low frequency, far from most data, or in low-density regions.

In this study, we propose a Reinforcement Learning-based Model Selection for Anomaly Detection (RLMSAD) framework. It aims to select the optimal detector at each time step based on input time series observations and predictions from each base model. Experiments on the real dataset SWaT (Secure Water Treatment) show that the proposed framework is superior to each base detector in terms of model precision.

---

### Background

#### Time Series Unsupervised Anomaly Detection

A time series $X = {x_1, x_2, \dots, x_t}$ is a data sequence indexed in time order. It can be univariate, where each $x_i$ is a scalar, or multivariate, where each $x_i$ is a vector. In this paper, we address the anomaly detection problem for multivariate time series in an unsupervised setting.

The training sequence $X_{train}$ is a time series containing only normal instances, and the test sequence $X_{test}$ is contaminated with anomalous instances. During the training phase, the anomaly detector is pre-trained on $X_{train}$ to capture the characteristics of normal instances. During testing, the detector examines $X_{test}$ and outputs an anomaly score for each instance.

#### Markov Decision Process and Reinforcement Learning

Reinforcement Learning (RL) is one of the machine learning paradigms that deals with sequential decision-making problems. It aims to train an agent to discover optimal actions in an environment by maximizing total reward, and is typically modeled as a Markov Decision Process (MDP).

A standard MDP is defined as a tuple $M=⟨S,A,P,R,\gamma⟩$, where $S$ is the state set, $A$ is the action set, $P(s'|s, a)$ is the state transition probability matrix, and $R(s, a)$ is the reward function. $\gamma$ is the discount factor for reward calculation and typically has a value between 0 and 1. For deterministic MDPs, each action leads to a specific state. That is, since the state transition dynamics are fixed, there is no need to consider the matrix $P(s'|s, a)$, and the MDP can be represented as $M=⟨S,A,R,\gamma⟩$.

The return $G_t=\sum_{k=t+1}^{T} \gamma^{k-t-1}R_k$ is the cumulative future reward after the current time step $t$. A policy $\pi(a|s)$ is a probability distribution that maps the current state to the likelihood of selecting a specific action. The reinforcement learning agent aims to learn a decision policy $\pi(a|s)$ that maximizes the expected total return.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/2c847358-d99c-4ea8-b32b-f3309e3cd066/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

The workflow of the model is as shown in the image above. The time series input is segmented using a sliding window. In each segmented window, the last timestamp is the target for analysis, and all previous timestamps are used as input values. Each candidate anomaly detector is first pre-trained individually on the training set. Subsequently, an empirical anomaly threshold needs to be determined.

#### 1. Characterizing the Performance of Base Detectors

To characterize the performance of candidate detectors, we propose the following two scores. Each anomaly detector generates a series of anomaly scores for the test data. A higher anomaly score indicates a higher likelihood of anomaly.

The distance-to-threshold confidence is proposed as $\frac{\text{score}-\text{threshold}}{\text{maxscore}-\text{minscore}}$, and inspired by majority voting in ensemble learning, the prediction consensus confidence is proposed as $\frac{\text{same label}}{\text{count of model in pool}}$, calculated as the number of models providing the same prediction divided by the total number of candidate models.

#### 2. Markov Decision Process (MDP) Formulation

The model selection problem is formulated as a Markov decision process in the following manner. The state transition probability $P(s'|s)$ is 1 for all immediate and consecutive state pairs from $s_t$ to $s_{t+1}$, and 0 otherwise.

The state space has the same size as the model pool. Each state is considered as the selected anomaly detector and includes the scaled anomaly score and anomaly threshold, binary prediction label, distance-to-threshold confidence, and prediction consensus confidence.

The reward function is determined based on the comparison between predicted labels and actual labels.

$$
R=\begin{cases}
r_1 & \text{for TP} \\
r_2 & \text{for TN} \\
-r_3 & \text{for FP} \\
-r_4 & \text{for FN}
\end{cases}
$$

Since the reward is designed for the agent to make appropriate model selection in a dynamic environment, this paper considers anomalies as normal and normal as anomalies. TP represents cases where both predicted and actual labels are anomalies, TN represents cases where both predicted and actual labels are normal, FP represents cases where the predicted label is anomaly but the actual label is normal, and FN represents cases where the predicted label is normal but the actual label is anomaly.

Since normal cases are the majority compared to anomalies, this paper considers correctly identifying normal cases as more trivial. TN should have a small reward and TP should have a relatively large reward $(\gamma_1 > \gamma_2)$, and also since the model can generate more FPs but has the advantage of reducing the risk of missing actual anomalies, $(\gamma_4 > \gamma_3)$.

---

### Experiments

The dataset used for evaluation is the SWaT dataset, which contains multivariate time series data from 51 sensors and actuators within an industrial water treatment testbed.

For base models, we select unsupervised anomaly detection algorithms such as one-class SVM, isolation forest, ECOD, COPOD, and USAD. Evaluation metrics include precision, recall, and F1 score.

Since the anomaly ratio in the dataset is close to 12%, the threshold is also fixed at 12%, and 5 timestamps are set as the sliding window size.

The precision scores of base models range from approximately 66% to 75%. All base models showed approximately 63% recall. The F1-scores of base models range from approximately 65% to 69%.

Under the proposed framework, both overall precision and F1-score increased significantly. The precision under RLMSAD reached 81.05%, and F1 reached 69.45%, showing substantial improvement in anomaly detection performance.

When investigating the impact of penalties for FP and FN, fixing FN and varying FP shows a phenomenon of reporting fewer false alarms and only reporting anomalies when confident about predictions. This can be demonstrated by a general decrease in recall scores and increase in precision scores as FP penalty increases. Conversely, increasing FN shows a phenomenon where the model reports anomalies more boldly. This can be demonstrated by a general decrease in precision scores and increase in recall scores.

---

### Conclusion

In this paper, we proposed a reinforcement learning-based model selection framework for time series anomaly detection. Specifically, we introduced two scores to characterize the detection performance of base models: distance-to-threshold confidence and prediction-consensus confidence. We then formulated the model selection problem as a Markov decision process using these two scores as RL state variables. We aimed to learn an anomaly detection model selection policy to optimize long-term expected performance.

If adaptive threshold strategies are studied, they could provide more beneficial state descriptions to the RL agent and potentially bring more robust performance.

---

### References

[Original Source #1](https://arxiv.org/pdf/2205.09884)

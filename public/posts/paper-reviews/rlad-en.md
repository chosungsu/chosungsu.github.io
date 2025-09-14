---
title: 'RLAD: Time Series Anomaly Detection through Reinforcement Learning and Active Learning'
date: '2022-09-19'
tags: ['time-series', 'paper review']
---

### Abstract

We introduce a new semi-supervised time series anomaly detection algorithm that efficiently learns and adapts to real-world time series anomalies using deep reinforcement learning (DRL) and active learning. The proposed model, RLAD, makes no assumptions about the underlying mechanism generating the observed sequences and continuously adapts the detection model based on experience with abnormal patterns.

Additionally, RLAD does not require manual parameter tuning and outperforms all compared state-of-the-art methods (including unsupervised and semi-supervised) across multiple performance metrics. More specifically, with only 1% of labels, it achieves 1.58 times better performance than the best unsupervised approach in F1 score, and on other real-world datasets, it shows up to approximately 4.4 times better performance with only 0.1% of labels.

---

### Introduction

Most anomaly detection algorithms are closely coupled with application-specific data attributes. Models are designed for specific applications, and thresholds, feature extraction processes, and hyperparameters are set based on strong prior knowledge or extensive experimentation. These attributes include multi-scale temporal dependencies in multivariate time series settings, anomalies in the frequency domain, and other related statistical moments.

Recent deep learning techniques have been introduced in the literature. For example, SR-CNN transforms time series data into visual context and uses spatial correlations to identify anomalies. Recently, Deep-SAD, a new deep learning-based semi-supervised technique that finds anomalies using information-theoretic criteria, has emerged.

Additionally, anomaly detection algorithms must overcome two major challenges. First, anomalies are rare, making model training difficult, and second, many real-world applications have non-stationary characteristics, meaning the underlying mechanism generating measurements changes over time. To address the label scarcity problem, many proposals taking unsupervised approaches have been in the literature. However, unsupervised algorithms tend to perform very poorly in practice and are significantly outperformed by semi-supervised and fully supervised methods. Supervised models work very well when labels are available but do not work well when labels are scarce or absent. Even when labels are easily available, they fundamentally assume that the underlying distribution is stationary. When the distribution changes, they need to be retrained.

To address these challenges, we need to design an algorithm that can efficiently learn using only a portion of the labels needed to train supervised models. To address the second challenge, we need to consider an adaptive design. That is, we need an algorithm that adapts to changes as it observes more data and learns more about the distribution of anomalies within it. We introduce RLAD, a new algorithm that combines reinforcement learning and active learning. This is the first case of combining deep reinforcement learning and active learning for anomaly detection. There are techniques that use reinforcement learning for anomaly detection, but they are difficult to train without a substantial number of labeled samples. There are also techniques that use active learning, showing competitive performance compared to semi-supervised models with only a portion of labels.

---

### Related work

#### 1. Traditional approach

Most traditional approaches are generally simple machine learning algorithms based on distance and density, such as K-Nearest Neighbors (KNN), Local Outlier Factor (LOF), Local Correlation Integral (LOCI), and Isolation Forest (iForest). One-Class SVM (OCSVM), Principal Component Analysis (PCA), etc. are also commonly used in this field. These approaches are generally time-efficient but tend to achieve poor performance in practical applications.

#### 2. Supervised approach

Deep learning has recently achieved much success in the anomaly detection field. Most deep learning-based approaches generally extract features from data and build classification models to identify anomalies. Supervised deep anomaly detection involves training deep supervised binary or multi-class classifiers using labels of normal and anomalous data instances.

#### 3. Unsupervised approach

Advanced unsupervised learning techniques are gaining more popularity in this field. They do not require labels and assume that anomalous points show larger deviations from the normal distribution. However, the performance achieved by these methods is quite low. This is because it is difficult to utilize prior knowledge (e.g., a few labeled anomalies) in many real-world anomaly detection applications or when human experts are available. Additionally, they require the assumption that normal patterns are stationary and cannot adapt to changes in input distribution.

#### 4. Semi-supervised approach

Semi-supervised approaches use a portion of labeled data for training. REPEN was introduced to utilize a few labeled anomalies to learn more relevant features. Deep-SAD used an information-theoretic perspective on anomaly detection and an autoencoder model for pre-training. However, these methods heavily depend on the number of labeled anomalies in the training data. But in anomaly detection problems, anomalies are rare. Given an unknown set of samples, a large amount of unknown samples must be examined to filter the required amount of anomalies. This makes labels more expensive.

#### 5. Reinforcement learning based approach

Reinforcement learning can solve sequential problems without clear normal patterns due to its self-improvement characteristics. However, several studies have applied deep reinforcement learning or inverse reinforcement learning techniques but failed to satisfy performance and showed limitations requiring fully labeled data.

---

### Preliminaries

#### 1. Reinforcement learning

We consider the anomaly detection problem as a Markov Decision Process (MDP) that can be expressed as a tuple $< S, A, P_a, R_a, \gamma >$. $S$ represents the set of environment states. $A$ is the set of actions taken by the RL agent. $P_a(s, s')$ means the probability that action $a$ performed in state $s$ leads to state $s'$. $R_a(s, s')$ is the immediate reward the agent receives by taking action $a$. $\gamma \in [0, 1]$ is the discount factor.

The Value Function is defined as $V^\pi(s) = E[\sum_{t=0}^\infty \gamma^t R_t | s_0 = s]$, representing the expected sum of rewards starting from state $s$. In MDP, the agent tries to learn a control policy that maximizes cumulative future rewards.

#### 2. Deep Q network

Q-learning is a famous value-based algorithm. The agent learns an action-value function $Q(s, a)$ and predicts how good it is to take an action in a specific state. The Target Value is defined as follows.

$$
\text {target}=R(s,a,s')+\gamma max_{a'} Q_k(s',a')
$$

And the Q function is updated as follows.

$$
Q_{k+1}(s,a) \leftarrow (1−α)Q_k(s,a)+\alpha*\text{target}
$$

Unfortunately, Q-learning can be unstable or even diverge when the action-value function is approximated by a nonlinear function such as a neural network. Therefore, Deep Q Network (DQN), a method that combines reinforcement learning and deep neural networks, was proposed by Deepmind and has been proven to handle more complex problems. The core elements of DQN are experience replay and target network.

Experience replay stores transitions of tuples $< s, a, r, s' >$, where $s$ is the state, $a$ is the action, $r$ is the reward obtained by taking action $a$, and $s'$ is the next state after the action. The agent is trained by randomly sampling mini-batches in each iteration. This reduces correlations between samples and improves data efficiency.

The target network was designed to handle the unstable target value problem. We build a neural network to learn Q values, but the target values are very unstable, making training convergence difficult. Therefore, a target network, another neural network with exactly the same structure, was designed to temporarily fix the target values to accelerate the training process.

#### 3. Active learning

Active learning is a specific machine learning algorithm that allows a model to actively interact with users (human experts) to obtain desired learning experiences.

Suppose we have a training set $L = (X, Y)$ and a pool of unlabeled instances $U = (x_1, x_2, \dots, x_n)$. Unlabeled data is generally cheaper than labeled data. Therefore, U can be very large. Active learning selects unlabeled samples from U and requests human experts to manually label them through a query function Q. Generally, the selected samples have more valuable information for the current model C. The learner will gain the most training benefit from newly labeled instances. The newly labeled instance set $L_{new} = (X_{new}, Y_{new})$ is added to the training set P and used for training in the next iteration. The goal of active learning is to achieve a good classifier model C with a reasonable number of queries.

---

### Method

#### 1. Preprocessing and Warm up

Given a time series sequence $TS = [t_1, t_2, \dots, t_n]$, we separate it into a set of states through a sliding window of size ω as follows.

$$
S=[(t_1, ..., t_w), (t_2, ..., t_{w+1}), ..., (t_{n-w}, ..., t_{n})]
$$

Each state (sample) has size $ω$, and the label of state $S_1$ is determined by the last time point $t_ω$. Here, 0 represents normal, 1 represents anomaly, and -1 represents unlabeled. All values are normalized to the range $[0,1]$ by MaxMinScaler.

Replay memory is a core component of deep reinforcement learning. It helps the RL agent store some memories and experiences, improving learning and training speed. Generally, replay memory stores current transitions (including state, action, and related rewards) with a capacity of N. The RL agent randomly selects mini-batches from replay memory for loss minimization, which reduces correlations between samples. However, typical replay memory has a normal distribution and lacks data diversity. We build an Isolation Forest classification model based on sklearn to perform tentative outlier detection. iForest helps select the most representative anomalous and normal samples. We send these samples to the RL agent and force them to fill the replay memory with transitions of these samples.

#### 2. Deep reinforcement learning

For the anomaly detection problem, we consider instances as states. Actions are the RL agent's predictions of whether something is anomalous or not. $a=1$ represents anomaly prediction and $a=0$ represents normal prediction. The reward function is set to $(r_1, r_2, -r_1, -r_2)$ for True Positives, True Negatives, False Negatives, and False Positives.

Generally, policy-based reinforcement learning algorithms are used to handle problems with continuous action spaces. Since our actions are discrete binary values $\in [0, 1]$, we choose DQN, a value-based algorithm, as our reinforcement learning method. We adopt a Long Short Term Memory (LSTM) neural network $Eval_N$ as the "brain" of the RL agent, which receives state $S$ and generates Q-values, following the Q function. We build another neural network $Target_N$ with exactly the same architecture as $Eval_N$. $Target_N$ has a lower update rate than $Eval_N$, and $Target_N$ can be considered to always fix parameters.

For exploration-exploitation balance, an epsilon decay strategy is adopted. The greedy coefficient $\epsilon$ is used to determine whether the RL agent should take actions based on the Q function or take random actions to explore the entire environment space. The epsilon decay policy tries to reduce the proportion allocated to exploration over time. This can provide optimal regression.

At the end of the warm-up module, the initial reinforcement learning model $\Theta_{rl}$ is trained.

#### 3. Active learning

Since fully labeled data is mostly expensive in the real world, we introduced an active learning component to the system in this study. This gives the RL agent not only the ability to explore the environment and learn from experiences but also the ability to ask questions/queries based on experiences during exploration. We choose margin sampling as the active learning strategy. The smaller the margin, the more uncertain the model is in identifying whether a sample is anomalous or non-anomalous. In each episode, active learning receives a set of unlabeled instances $S_{unlabeled}$ from deep reinforcement learning. In each epoch, for state $s$, the RL agent has two action options: $a_0$, $a_1$. Their $q$ values and minimum margin can be formulated as follows.

---

### Conclusion

In this paper, we introduced RLAD for time series anomaly detection. This is the first attempt in the anomaly detection field to combine deep reinforcement learning and active learning to reduce dependence on normal pattern assumptions and label availability issues. Experimental results show that RLAD achieved excellent performance with extremely few labeled samples on both real and synthetic datasets.

---

### References

[Original Source #1](https://arxiv.org/pdf/2104.00543)

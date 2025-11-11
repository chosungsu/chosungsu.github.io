---
title: 'MODEL RISK-SENSITIVE OFFLINE REINFORCEMENT
LEARNING'
date: '2025-09-10'
tags: ['embodied ai', 'paper review']
---

### Abstract

Offline Reinforcement Learning (RL) is gaining importance in risk-sensitive areas such as finance and autonomous driving, where incorrect decisions can lead to significant financial losses or safety issues.

However, existing risk-sensitive offline RL methods struggle to accurately assess risk, and minor errors in estimated returns can cause significant inaccuracy in risk estimation. These difficulties are exacerbated by distribution shifts inherent in offline RL.

To mitigate these issues, we propose a model risk-sensitive offline RL framework designed to minimize worst-case risk across a set of plausible alternative scenarios, rather than focusing solely on minimizing estimated risk.

We present a critic-ensemble criterion method for identifying plausible alternative scenarios without introducing additional hyperparameters. Additionally, we integrate learned Fourier feature frameworks with the IQN framework to address spectral bias in neural networks, which can cause severe errors in model risk computation otherwise.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/fa62706c-44ad-43ec-912e-4dd3ad55933c/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Since risk measures are designed to emphasize rare events and undervalue frequent events (Cont et al., 2010; Kou et al., 2013; Embrechts et al., 2015; Pesenti et al., 2016), estimated risk is highly sensitive to changes in the underlying reward distribution. These errors can lead to poor risk management, especially when there is a distribution shift between training and deployment environments—a common situation in offline RL where agents cannot receive real-time feedback from the environment.

In finance, this problem is addressed by minimizing worst-case risk across a set of plausible alternative scenarios, rather than directly minimizing the risk estimated by the model (Bernard et al., 2023). This worst case is called model risk and quantifies the worst outcome when using an incorrect model (Breuer & Csiszar, 2016; Bernard et al., 2023). Unlike traditional approaches that rely solely on estimated risk and are vulnerable to model errors, model risk enables more robust and reliable risk-sensitive decision-making by acknowledging potential inaccuracies of the model.

Inspired by this, this paper shifts the focus of risk-sensitive offline RL research from traditional risk minimization to model risk minimization. In doing so, we address the common problem of estimating reward distribution statistics (mean and standard deviation) that are often unreliable or unknown, in contrast to finance where mean and variance are assumed known.

In the figure above, on the left, existing risk-sensitive offline RL approaches minimize risk estimated by critics (green region). On the right, we minimize worst-case risk (blue region) among plausible alternative scenarios (gray lines). In this way, this paper presents a model risk-sensitive offline framework that minimizes model risk, enabling more robust decision-making than existing risk-sensitive offline RL approaches.

---

### Related Works

#### 1. Risk-sensitive RL

Traditional research on risk-sensitive RL is based on risk measures that can be computed without estimating the entire reward distribution (Howard & Matheson, 1972; Sato et al., 2001; Mihatsch & Neuneier, 2002; Tamar et al., 2015; Chow et al., 2017).

With the advent of Distributional RL, Dabney et al. (2018a) developed the IQN framework that integrates risk-sensitive RL frameworks by enabling direct risk computation through quantile regression. Other approaches include directly computing CV@R policy gradients without computing reward distributions (Tamar et al., 2015; Chow et al., 2017), entropy-based methods (Mihatsch & Neuneier, 2002), dynamic CV@R (Du et al., 2022; Lim & Malik, 2022), and entropic risk value (EV@R) (Ni & Lai, 2022). Dynamic CV@R recursively considers risk at each time step and is related to 1R2R (Rigter et al., 2024). EV@R falls outside this scope but is closely related to CODAC (Ma et al., 2021).

Another interesting approach is integrating risk-sensitive RL with Safe RL. For example, Kim & Oh (2022) integrate risk-sensitive approaches into Safe RL by constraining CV@R of cost instead of expected cost. Meanwhile, Ying et al. (2021); Greenberg et al. (2022) use Safe RL to constrain risk while maximizing return. In online RL settings, Jaimungal et al. (2022) proposed an approach similar to this paper, but their method is based on KDE and on-policy algorithms, so it cannot be applied to offline RL.

#### 2. Risk-sensitive Offline RL

Research on risk-sensitive offline RL relies on integration of IQN with offline RL frameworks. Urpí et al. (2021) first proposed ORAAC, a risk-sensitive offline RL framework combining IQN with BCQ (Fujimoto et al., 2019). ORAAC has the disadvantage of limited ability to generate better trajectories due to excessive constraints on action policies. To address this limitation, CODAC (Ma et al., 2021) based on CQL was proposed. However, it inherits problems of CQL such as hyperparameter sensitivity (Tarasov et al., 2024). Another approach, 1R2R (Rigter et al., 2024), is a model-based RL method that estimates risk through worst-case perturbations of transitions. However, a key limitation is that it is only guaranteed when transition probabilities follow a normal distribution.

---

### Methods

#### 1. Risk-sensitive RL

We consider a Markov Decision Process ($S, A, R, P, \gamma$), where $S$ is the set of states, $A$ is the set of actions, $R : S \times A \to \triangle(\mathbb{R})$ is the immediate reward that may be random, and $P : S \times A \to \triangle(S)$ is the transition probability. Here, $\triangle(X)$ denotes the set of random variables whose support is a subset of $X$. We also assume that the mean and variance of all random properties are finite. The optimal risk-sensitive policy is formulated as:

$$
\begin{aligned}
&\pi^* \\
&= \operatorname*{arg\ min}_{\pi} \mathcal{H}_{\phi} \left( Z_{\pi}(s, a) \right) \text{ where } Z_{\pi}(s, a) \\
&= \sum_{t=0}^{T} R(s_t, a_t)\gamma^t \mid s_0 = s, a_0 = a
\end{aligned}
$$

where $\mathcal{H}_{\phi}(Z_{\pi}(s, a))$ represents the risk of policy $\pi$ for reward $Z_{\pi}(s, a)$, and $\mathcal{H}_{\phi}$ denotes a risk measure given by the user or environment.

#### 2. Risk-sensitive Offline RL

In the offline setting, agents cannot directly interact with the environment and only have access to a transition dataset $\mathcal{D} := \{(s_i, a_i, r_i, s'_i)\}_{i=1}^{|\mathcal{D}|}$. Due to this constraint, simple RL approaches struggle with overestimation of $Z_{\pi}(s, a)$ due to distribution shifts (Fujimoto et al., 2019). Therefore, auxiliary regulation is commonly applied. The goal of offline RL is defined as:

$$
\pi^* = \operatorname*{arg\ max}_{\pi} \mathbb{E}[Z_{\pi}(s, a)] \text{ constraint to } \mathcal{D}(\pi \parallel \pi_{\mathcal{D}}) < \epsilon
$$

#### 3. Overall Algorithm

<img src="https://velog.velcdn.com/images/devjo/post/f519691c-66ed-4fcc-93b9-f863395b5aed/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

MR-IQN consists of distributional critics and a deterministic actor. The critics are implemented using IQN and TQC. Training minimizes the following loss function:

$$
\mathcal{L}(\pi) = \underbrace{\lambda_{\text{q.learn}} \text{MR}_{\phi}(Z_{\pi}(s, a); \mu, \sigma, \epsilon)}_{\text{Model risk}} + \underbrace{(a - a_{\mathcal{D}})^2}_{\text{BC loss}}
$$

where $\lambda_{\text{q.learn}} > 0$ is a scale parameter, $a_{\mathcal{D}}$ is the batch action, and $a = \pi(s)$. As shown in the figure, we extract $\mu$ and $\sigma$ from critic estimates. We implement critics using Fourier feature architecture as in Li & Pathak (2021). Next, we compute distance $\epsilon$ between critic ensembles obtained through quantile mixture of individual critics. Finally, we compute $\text{MR}_{\phi}(Z_{\pi}(s, \pi(s)))$ and minimize the loss function.

To ensure conservatism, we select $\mu_0$ as the smallest expected value and $\sigma$ as the largest deviation of $Z_{\pi}$:

$$
\begin{aligned}
&\mu_0 := \operatorname*{min}_{i=1, \dots, K} \mathbb{E}[Z_{\pi}(s, a, \theta^{(i)})], \\
&\sigma := \operatorname*{max}_{i=1, \dots, K} \text{std}[Z_{\pi}(s, a, \theta^{(i)})]
\end{aligned}
$$

When $\lambda=0$, policy gradients often rely only on mean-variance risk measures, reaching local optima. To mitigate this, we apply a stop-gradient trick to $\mu$ as follows:

$$
\mu := - \mathcal{H}_{\phi}(Z_{\pi}(s, a)) + \text{stop-grad}(\mathcal{H}_{\phi}(Z_{\pi}(s, a))) + \mu_0
$$

We compute the Wasserstein-2 distance between critic ensembles and individual critics. The largest of these distances is selected as $\epsilon$.

---

### Conclusion

We proposed a model risk-sensitive offline RL framework that devises a critic-ensemble criterion to effectively capture model risk. To ensure precision in model risk computation, we leveraged Fourier feature networks that accurately estimate mean and standard deviation, which are core components of model risk computation.

This framework ensures more reliable decision-making in risk-sensitive applications by considering potential model errors and striving to make the best decisions nonetheless.

While the proposed framework is limited to spectral risk measures and cannot accommodate measures outside this category such as CMV (Vadori et al., 2020) or EV@R (Ni & Lai, 2022), the broad applicability of spectral risk measures covers many practical problems.

Future work includes extending this framework to partially observable Markov decision processes, including decision-making in business applications important for embodied control and mission execution.

---

### References

[Original Source #1](https://openreview.net/pdf?id=h6k4809xVV)

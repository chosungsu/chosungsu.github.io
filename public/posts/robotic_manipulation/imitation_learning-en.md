---
title: 'Imitation Learning'
date: '2024-12-18'
tags: ['Robotics', 'Manipulation', 'lecture']
---

### Problem Formulation

The formulation of the imitation learning problem is very similar to the RL problem, but the main difference is that instead of utilizing an explicit reward function $r_t = R(\mathbf{x}_t, \mathbf{u}_t)$, we assume that a set of demonstrations from an expert is provided.

The system is assumed to be a Markov Decision Process (MDP) with state $\mathbf{x}$ and control input $\mathbf{u}$. System dynamics are represented by a probabilistic transition model.

$$
p(\mathbf{x}_t | \mathbf{x}_{t-1}, \mathbf{u}_{t-1})
$$

The goal is to find a policy $\pi$ that defines a closed-loop control law.

$$
\mathbf{u}_t = \pi(\mathbf{x}_t)
$$

Instead of having access to a reward function, we have access to a set of demonstrations obtained from an expert policy. Each demonstration $\xi$ is a sequence of state-control pairs.

$$
\xi = \{(\mathbf{x}_0, \mathbf{u}_0), (\mathbf{x}_1, \mathbf{u}_1), \ldots \}
$$

There are generally two approaches to imitation learning.

Directly learning the expert's policy. This includes Behavior Cloning and DAgger. And first learning the expert's reward function, then using it to derive a policy.

---

### Behavior Cloning

The Behavior Cloning approach determines a policy $\pi$ that imitates the expert using a set of expert demonstrations. This can be performed through supervised learning techniques, and the goal is to minimize the difference between the learned policy and expert demonstrations.

$$
\hat{\pi}^* = \arg \min_{\pi} \sum_{\xi \in \Xi} \sum_{\mathbf{x} \in \xi} L(\pi(\mathbf{x}), \pi^*(\mathbf{x}))
$$

Behavior Cloning may perform poorly due to the following main problems. The learning process is sampling-biased because it is based only on the sample set provided by the expert and does not uniformly sample the entire state space. And while the state distribution in the training dataset is defined by the expert policy $\pi^*$, when the estimated policy $\hat{\pi}^*$ is actually used, this policy generates and visits its own state distribution. At this point, there is a distribution mismatch problem where it is likely to take incorrect actions when reaching states near those not visited by the expert.

---

### Dataset Aggregation

A simple idea to solve the distributional mismatch problem of states observed under the expert policy and learned policy is to collect new expert data whenever needed. That is, when the learned policy $\hat{\pi}^*$ leads to states not in the expert dataset, simply request more information from the expert.

---

### Inverse Reinforcement Learning

Behavior Cloning has no way to understand the underlying reasons for expert behavior. And the expert may not actually perform optimal actions.

Inverse Reinforcement Learning is an alternative approach to behavior cloning that attempts to infer and learn a representation of the underlying reward function $R$ that the expert used to generate actions. By learning the expert's intent, the agent can potentially outperform the expert or adapt to capability differences.

#### Reward Function Parameterization

IRL approaches assume a specific parameterization of the reward function. Here, we present the basic concept by parameterizing the reward as a linear combination of (nonlinear) features.

$$
R(\mathbf{x}, \mathbf{u}) = \mathbf{w}^T \boldsymbol{\phi}(\mathbf{x}, \mathbf{u})
$$

The total (discounted) reward under policy $\pi$ ($V^\pi_T(\mathbf{x})$) is defined as follows.

$$
V^{\pi}_T(\mathbf{x}) = E \left[ \sum_{t=0}^{T-1} \gamma^t R(\mathbf{x}_t, \pi(\mathbf{x}_t)) \mid \mathbf{x}_0 = \mathbf{x} \right]
$$

Using a linear reward function $R(\mathbf{x}, \mathbf{u})$, this value function can be expressed as follows.

$$
V^{\pi}_T(\mathbf{x}) = \mathbf{w}^T \boldsymbol{\mu}(\pi, \mathbf{x})
$$

Here, $\boldsymbol{\mu}(\pi, \mathbf{x})$ is defined as the feature expectation.

$$
\boldsymbol{\mu}(\pi, \mathbf{x}) = E_{\pi} \left[ \sum_{t=0}^{T-1} \gamma^t \boldsymbol{\varphi}(\mathbf{x}_t, \pi(\mathbf{x}_t)) \mid \mathbf{x}_0 = \mathbf{x} \right]
$$

A key insight of IRL is that by definition, the optimal expert policy $\pi^*$ always produces a larger value function than any other policy $\pi$.

---

### Apprenticeship Learning

This is one approach to Inverse Reinforcement Learning (IRL). The key insight is as follows.

If the feature expectation $\boldsymbol{\mu}(\pi)$ of policy $\pi$ is sufficiently close to the feature expectation $\boldsymbol{\mu}(\pi^*)$ of the expert policy $\pi^*$, the performance of policy $\pi$ will be as good as the expert's, even if the $\mathbf{w}$ vector does not exactly match $\mathbf{w}^*$.

From a practical standpoint, we consider the value function as an expectation by assuming that the initial state $\mathbf{x}_0$ is drawn from a distribution $\mathcal{D}$.

$$
E_{\mathbf{x}_0 \sim \mathcal{D}} \left[ V^{\pi}_T(\mathbf{x}_0) \right] = \mathbf{w}^T \boldsymbol{\mu}(\pi)
$$

Here, $\boldsymbol{\mu}(\pi)$ is the feature expectation of policy $\pi$ with respect to the initial state distribution $\mathcal{D}$.

$$
\boldsymbol{\mu}(\pi) = E_{\pi} \left[ \sum_{t=0}^{T-1} \gamma^t \boldsymbol{\phi}(\mathbf{x}_t, \pi(\mathbf{x}_t)) \right]
$$

The goal of this learning is to find a policy $\hat{\pi}^*$ that has $\boldsymbol{\mu}(\hat{\pi}^*)$ as similar as possible to the feature expectation of the expert policy $\pi^*$.

---

### Maximum Margin Planning, MMP

The Maximum Margin Planning (MMP) approach uses an optimization-based approach to compute the reward function weights $\mathbf{w}$, and the MMP optimization is as follows.

$$
\begin{aligned} 
&\hat{\mathbf{w}}^* = \argmin_{\mathbf{w}} \Vert\mathbf{w}\Vert_2^2, \\ 
&\text{s.t.} \mathbf{w}^T \boldsymbol{\mu}(\pi^*) \ge \mathbf{w}^T \boldsymbol{\mu}(\pi) + 1
\end{aligned}
$$

This problem computes a reward function vector $\mathbf{w}$ that makes the expert policy outperform existing policies by the largest margin. We add a slack term to account for the expert's potential suboptimality and add a similarity function to provide smaller margins to policies that are not different from the expert policy.

$$
\begin{aligned}
&\hat{\mathbf{w}}^* = \argmin_{\mathbf{w}, v} \Vert\mathbf{w}\Vert_2^2 + Cv, \\
&\text{s.t.} \mathbf{w}^T \boldsymbol{\mu}(\pi^*) \ge \mathbf{w}^T \boldsymbol{\mu}(\pi) + m(\pi^*, \pi) - v 
\end{aligned}
$$

Here, $v$ is a slack term that accounts for the expert's suboptimality. And $m(\pi^*, \pi)$ is a function that quantifies how different the two policies are.

#### Maximum Entropy Inverse Reinforcement Learning

Apprenticeship Learning shows that matching feature expectations is a necessary and sufficient condition to guarantee expert-level performance, but it has the ambiguity that other policies that induce the same feature expectations may exist.

The main idea of Maximum Entropy Inverse Reinforcement Learning is to remove the ambiguity of path distributions by making the trajectory distribution $p_{\pi}(\tau)$ as broadly uncommitted as possible, in addition to matching feature expectations. That is, finding a policy that has no additional path preferences beyond feature expectation matching. This is called the maximum entropy principle.

It can be thought of as the least informative distribution under given constraints and prevents encoding unintended prior information.

$$
p^*(\tau) = \argmax_{p} \int -p(\tau) \log p(\tau) d\tau
$$

The solution to this optimization problem has the following exponential form.

$$
\begin{aligned}
&p^*(\tau, \boldsymbol{\lambda}) = \frac{1}{Z(\boldsymbol{\lambda})} e^{\boldsymbol{\lambda}^T \mathbf{f}(\tau)},\\
&Z(\boldsymbol{\lambda}) = \int e^{\boldsymbol{\lambda}^T \mathbf{f}(\tau)} d\tau
\end{aligned}
$$

Here, $\mathbf{f}(\tau)$ is the cumulative feature of the trajectory and $\boldsymbol{\lambda}$ is a vector that parameterizes the distribution. Since $\mathbf{w}^*$ (and $p_{\pi^*}(\tau)$) is not known, we use a Maximum Likelihood Estimation (MLE) approach to best approximate $\mathbf{w}^*$ based on sampled expert demonstrations.

$$
\begin{aligned}
\hat{\mathbf{w}}^* &= \arg \max_{\boldsymbol{\lambda}} \prod_{\xi_i \in \Xi} p^*(\xi_i, \boldsymbol{\lambda}) \\ &= \arg \max_{\boldsymbol{\lambda}} \sum_{\xi_i \in \Xi} \left( \boldsymbol{\lambda}^T \mathbf{f}(\xi_i) - \log Z(\boldsymbol{\lambda}) \right)
\end{aligned}
$$

This problem can be solved using gradient descent, and the gradient is computed as follows.

$$
\nabla_{\boldsymbol{\lambda}} J(\boldsymbol{\lambda}) = \sum_{\xi_i \in \Xi} \mathbf{f}(\xi_i) - E_{\tau \sim p^*(\tau, \boldsymbol{\lambda})} \left[ \mathbf{f}(\tau) \right]
$$

The first term can be easily computed since expert demonstrations are known. The second term can be approximated through Monte Carlo sampling by sampling trajectories from the $p^*(\tau, \boldsymbol{\lambda})$ distribution.

---

### Learning From Comparisons and Physical Feedback

Both Behavior Cloning and Inverse Reinforcement Learning (IRL) rely on expert action demonstrations, but in practice, experts may have difficulty providing perfect or high-quality demonstrations.

#### Learning from Comparisons

Pairwise comparisons are an alternative approach that shows the expert two different actions (trajectories $\tau_A$ and $\tau_B$) and asks them to rank which is better. Through iterative queries, we can converge to understanding the underlying reward function $R$.

#### Learning from Physical Feedback

Instead of complete expert demonstrations, we may allow the expert to physically interact with the robot to correct undesirable actions. In this approach, we assume that physical interaction occurs when the robot takes actions that result in lower rewards than the expert's actions.

The robot's reward function is of the form $R(\mathbf{x}, \mathbf{u}) = \mathbf{w}^T \boldsymbol{\varphi}(\mathbf{x}, \mathbf{u})$, and the robot maintains an estimated weight $\hat{\mathbf{w}}^*$. We assume the expert acts according to the actual optimal weight $\mathbf{w}^*$.

---

### Interaction-aware Control and Intent Inference

Another interesting problem that arises in robot autonomy occurs when robots and humans interact to achieve shared or individual goals.

#### Control with Known Human Model

Interaction between humans and robots can be modeled as a dynamical system with a coupled state $\mathbf{x}$. Robot control is denoted as $\mathbf{u}_R$, and human decisions/inputs are denoted as $\mathbf{u}_H$. The transition model is as follows.

$$
\mathbf{p}(\mathbf{x}_t | \mathbf{x}_{t-1}, \mathbf{u}_{R,t-1}, \mathbf{u}_{H,t-1})
$$

Assuming both the robot and human act optimally with respect to their own cost functions, optimal actions are defined as follows.

$$
\mathbf{u}^*_R(\mathbf{x}) = \arg \max_{\mathbf{u}_R} \mathbf{R}_R(\mathbf{x}, \mathbf{u}_R, \mathbf{u}^*_H(\mathbf{x})) \\
\mathbf{u}^*_H(\mathbf{x}) = \arg \max_{\mathbf{u}_H} \mathbf{R}_H(\mathbf{x}, \mathbf{u}^*_R(\mathbf{x}), \mathbf{u}_H)
$$

Even assuming that both reward functions $\mathbf{R}_R$ and $\mathbf{R}_H$ are known, this two-player game dynamics makes computing $\mathbf{u}^*_R$ very difficult. We model it as a Stackelberg game to limit it to a leader-follower structure.

#### Intent Inference

The Intent Inference problem focuses on identifying fundamental behavioral characteristics (e.g., driving style) that can lead to accurate behavior models. Fundamental behavioral differences are modeled through unknown parameters $\boldsymbol{\theta}$, which must be inferred by observing human behavior.

The human's reward function is defined as a function of $\boldsymbol{\theta}$ as $\mathbf{R}_H(\mathbf{x}, \mathbf{u}_R, \mathbf{u}_H, \boldsymbol{\theta})$. We assume humans select actions according to the following probability.

$$
\mathbf{p}(\mathbf{u}_H | \mathbf{x}, \mathbf{u}_R, \boldsymbol{\theta}) \propto e^{\mathbf{R}_H(\mathbf{x},\mathbf{u}_R,\mathbf{u}_H,\boldsymbol{\theta})}
$$

This means that humans select optimal actions with exponentially higher probability but can also select non-optimal actions.

---

### References

[Original source #1](https://web.stanford.edu/class/cs231a/course_notes/07-representation-learning.pdf)

---
title: 'Fast learning and efficient RL'
date: '2025-03-24'
tags: ['cs234', 'lecture']
---

### multi-armed bandits

A multi-armed bandit consists of a tuple of action set $A$ composed of $m$ actions and unknown probability $P[r|a]$ of reward $R_a(r)$ for each action. The goal is to maximize cumulative reward through $\sum_{\tau=1}^{t} r_{\tau}$. An example is the task of deciding how to treat a broken toe.

---

### greedy algorithm

We estimate the value of each action using Monte Carlo.

$$
\hat{Q_t}(a) = \frac{1}{N_t(a)} \sum_{i=1}^{t-1} r_i (a_i=a)
$$

Using this formula, we select the action with the highest estimated value. The greedy algorithm can get stuck forever on suboptimal actions.

---

### regret framework

Action value refers to the average reward for an action, calculated as $Q(a)=E[r|a]$, and optimal value is the maximum value of the state-action value function $Q$ among all actions, expressed as $V^*=Q(a^*)$. Total regret is the total opportunity loss over steps, calculated as $L_t=E \left[\sum_{\tau=1}^{t} V^*-Q(a_{\tau}) \right]$, and minimizing this is the path to maximizing cumulative reward.

The method to quantify opportunity loss that occurs from not selecting the optimal action is as follows:

$$
L_t=E \left[\sum_{\tau=1}^{t} V^*-Q(a_{\tau}) \right] \\
=\sum_{a \in A} E \left[N_t(a) \right](V^*-Q(a)) \\
=\sum_{a \in A} E \left[N_t(a) \right]\Delta_a
$$

$N_t(a)$ represents the number of times an action has been selected up to a specific point, and $\Delta_a$ represents the difference in value between the optimal action ($a^*$) and a specific action.

---

### $\epsilon$ greedy

With probability $1-\epsilon$, we select the action with the highest estimated value, and with probability $\epsilon$, we select a random action.

In the regret framework, when quantifying opportunity loss in algorithms, actions with large $\Delta_a$ should maintain a small average to minimize total regret, but we cannot know these values in advance. Therefore, a balance between exploration and exploitation is needed.

Linear regret refers to cases where regret increases proportionally to time steps, meaning that suboptimal actions are selected at a constant ratio of the total number of times.

For example, if $\epsilon=0.1$ is fixed at a non-zero value, the algorithm will explore random actions with that probability at each step, and this exploration naturally includes the possibility of selecting suboptimal actions. Therefore, if $\epsilon > 0$ and suboptimal actions exist, the algorithm will select suboptimal actions at that ratio of the total steps. This fixed ratio results in linear increase. And if $\epsilon=0$, we don't explore random actions, but initially select the action with the highest estimated value. If a suboptimal action had the highest value at that time, it gets stuck forever on that action, which also results in linear increase.

Thus, linear increase is observed for $\epsilon \ge 0$. This inefficient situation is resolved by setting a lower bound through the Lai and Robbins theorem with log, which takes the logarithm.

---

### optimism under uncertainty

This principle is key to balancing exploration and exploitation, referring to the tendency to prioritize trying actions that potentially provide high rewards.

This approach predicts two outcomes:

-High reward case: If the action actually has a high average reward, we select it to obtain the reward. That is, a successful result of exploitation.

-Learning new information: If the action's actual average reward is lower than expected, selecting it reduces uncertainty about the expected average reward of the action. That is, a successful result of exploration.

#### hoeffding's inequality

$$
P(E(X) > \bar{X_n}+u) \le exp(-2nu^2)
$$

This inequality determines the confidence interval for the upper confidence bound (UCB), providing a probabilistic upper bound on how much the sample mean $(\bar{X_n})$ of independent and identically distributed (iid) random variables $(x_1, ..., x_n)$ within a range can deviate from the actual expected value. This difference decreases exponentially.

#### UCB

Through the above inequality, we can create an action rule $a_t=\underset{a \in A}{\operatorname{argmax}} \left [\hat{Q(a)} + \sqrt{\frac{2log\frac{1}{\delta}}{N_t(a)}} \right]$ where $\hat{Q(a)}$ is the sample mean reward estimate of the action observed so far, and $\frac{2log\frac{1}{\delta}}{N_t(a)}$ is the exploration bonus term, which increases slowly proportional to log but encourages selecting actions more when they have been selected fewer times.

---

### probably approximately correct(PAC)

While regret bounds indicate how much they increase according to total time steps, PAC is an algorithm that finds a sufficiently accurate policy with sufficiently high probability.

$\epsilon$-optimal action is expressed as $Q(a) \ge Q(a^*)-\epsilon$ and is selected with at least $1-\epsilon$ probability. The number of times actions that don't meet this criterion are selected is limited to within polynomial numbers.

---

### bayesian methods

#### bayesian bandits

While existing bandits made few assumptions about rewards $(R)$, this algorithm actively utilizes prior knowledge about rewards, $p(R)$.

$$
p(\phi_i|r_{i1})=\frac{p(r_{i1}|\phi_i)p(\phi_i)}{p(r_{i1})}
$$

Using Bayesian inference, we update the posterior distribution of unknown parameters $\phi_i$ based on observed rewards $(r_{i1})$.

#### thompson sampling

This algorithm is a Bayesian approach based on the principle of probability matching. Probability matching is selecting actions proportional to the probability that each action is optimal.

First, probability matching means that when an agent selects an action $a$ with probability $P[Q(a) > Q(a')|h_t]$ that it has higher expected value $Q(a)$ than all other actions $a'$, uncertain actions may still have high probability of being optimal, so this algorithm also implements optimism under uncertainty. The problem is that accurately calculating the probability that this action is optimal based on the observation history so far is very difficult, which is solved through Thompson sampling.

Thompson sampling initializes a prior distribution for the reward distribution $R_a$ and samples the expected reward of each action from the posterior distribution $p[R_a|h_t]$ of the reward distribution of the currently selected $a$. Among these, we select the action with the highest expected value $Q(a)$.

#### bayesian regret

Frequentist regret assumes that there exists a true parameter $\theta$ in the environment, and measures opportunity loss using the reward $Q(a^*)$ that can be obtained when the agent selects the optimal action $a^*$ and the actually selected action $a_t$ as follows:

$$
E_{\tau} \left [\sum_{t=1}^{T} Q(a^*)-Q(a_t)|\theta \right] \\
\le E_{\tau} \left [\sum_{t=1}^{T} U_t(a_t)-Q(a_t)|\theta \right]
$$

Since we use $U_t$ representing the upper bound (UCB) for action $a_t$ selected by the agent at time $t$, it means that the probability that the actual expected value $Q(a_t)$ of that action is not lower than UCB is high.

Bayesian regret assumes that the true parameter is not $\theta$ but is sampled from a prior distribution $p(\theta)$ over $\theta$. Using prior knowledge $p(R)$, we select actions proportional to the probability that each action is optimal, which is effective in reducing Bayesian regret.

#### bayesian mdp

Similar to Bayesian bandits, we maintain a posterior distribution $p[P, R |h_t]$ over the MDP model. PSRL is a concept that extends Thompson sampling to MDPs, and this algorithm initializes prior distributions of dynamic and reward models for each $(s, a)$ pair. It samples an MDP model every episode, and the optimal value function $Q^*$ is updated by selecting the highest action in the current state.

---

### References

[Original source #1](https://youtu.be/sqYii3nd78w?si=k1mcRTdSqjfiW4z4)

[Original source #2](https://youtu.be/gFJNsfg_35E?si=P7JXd8VY9m_nePuM)

[Original source #3](https://youtu.be/pc7oayCSZmQ?si=Ku-Dz74T8vKdbpEY)



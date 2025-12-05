---
title: 'Planning and Learning with Tabular Methods'
date: '2025-03-24'
tags: ['reinforcement learning', 'lecture']
---

### Models and Planning

A model is anything an agent can use to predict how the environment will respond to its actions. Given a state $s$ and action $a$, a model predicts the resulting next state $s'$ and next reward $r$.

Distribution models provide all possible next states and rewards, along with their probabilities of occurrence. Sample models sample one of the possibilities according to the probability distribution.

---

### Integrating Planning, Acting, and Learning

When planning is done online, simultaneously with interaction with the environment, architectures like Dyna-Q integrate essential functions.

#### Direct vs. Indirect RL

Experience improves the model to match the real environment more accurately. Using real experience to directly improve the value function and policy is called Direct RL, while deriving experience $\rightarrow$ model $\rightarrow$ values & policy is called Indirect RL.

Dyna-Q is a tabular learning method that assumes a deterministic environment. For each experienced state-action pair $(S_t, A_t)$, the model records the last observed next state $S_{t+1}$ and reward $R_{t+1}$.

---

### Prioritized Sweeping

Prioritized Sweeping is the idea of prioritizing and performing backups in order according to the urgency of change.

When the estimated value of a state changes, backups are performed for actions that lead directly to that state. All state-action pairs that are likely to change in value are stored, and a queue is maintained that prioritizes them according to the magnitude of the expected value change. The pair with the highest priority is removed from the queue and backed up.

---

### Full vs. Sample Backups

Full backups consider all possible next states, so they provide better estimates without sampling error. However, they require more computation time, and computation time is often a limiting resource in planning.

$$
Q(s, a) \leftarrow \sum_{s', r} \hat{p}(s', r|s, a) \left[ r + \gamma \max_{a'} Q(s', a') \right]
$$

In contrast, sample backups are

$$
Q(s, a) \leftarrow Q(s, a) + \alpha \left[ R + \gamma \max_{a'} Q(S', a') - Q(s, a) \right]
$$

and it is said that full backups require $b$ times more computation, where $b$ is the branching factor, the number of possible next states from a given state-action pair $(s, a)$.

---

### Heuristic Search

This method is not interested in changing the approximate value function (heuristic value function), but focuses only on improved action selection given the current value function. That is, heuristic search performs planning as part of policy computation.

For each state encountered during search, a large tree representing possible continuations is considered. The current approximate value function is applied to the leaf nodes, and these values are backed up toward the root where the current state is located.

#### Focusing Backups

Heuristic search is not only important as an action selection technique, but also presents a selective backup distribution method that improves the approximation of the optimal value function.

Heuristic search grows the tree selectively. That is, it searches more deeply for actions that are likely to be optimal, and more shallowly for actions that the agent is unlikely to choose. The effectiveness of heuristic search is because the search tree is focused on the current state and the states and actions that are likely to come immediately after it.

---

### References

[Original source #1](https://web.stanford.edu/class/psych209/Readings/SuttonBartoIPRLBook2ndEd.pdf?utm_source=chatgpt.com)

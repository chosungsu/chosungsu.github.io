---
title: 'PATO: Policy Assisted TeleOperation for Scalable Robot Data Collection'
date: '2024-09-23'
tags: ['embodied ai', 'paper review']
---

### Abstract

Large-scale data is an essential component of machine learning, as demonstrated by recent advances in natural language processing and computer vision research. However, collecting large-scale robot data is much more expensive and slower, as each operator can only control one robot at a time.

To make this expensive data collection process efficient and scalable, we propose Policy Assisted TeleOperation (PATO), a system that uses a learned assistive policy to automate parts of the demonstration collection process.

PATO autonomously executes repetitive actions during data collection and only requests human input when uncertain about which subtask or action to execute.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/8882547a-6ea3-438c-9d17-2a77489eec56/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### Bottleneck in Robot Data Collection

Recent research has shown impressive robot learning results from diverse human-collected demonstration datasets.

However, collecting such human demonstrations through "teleoperation" is tedious and expensive. Tasks must be demonstrated repeatedly, and each operator can only control one robot at a time. While teleoperation research has focused on exploring various interfaces such as VR controllers and smartphones, it has not addressed the aforementioned bottleneck in scaling data collection. Therefore, current teleoperation systems are inadequate for providing the scalability required by modern robot learning pipelines.

#### PATO's Goal and Inspiration

The goal is to improve the scalability of robot data collection by providing assistance to human operators during teleoperation. We draw inspiration from other machine learning fields such as semantic segmentation, where expensive labeling processes have been substantially accelerated by providing learned assistive systems to human annotators, significantly reducing labeling burden.

Similarly, we propose training an assistive policy that can automate control of repeatedly demonstrated actions and only request user teleoperation when facing novel situations or when uncertain about which action to execute.

---

### Related works

#### Robot Teleoperation

Initially, kinesthetic teaching, where human operators directly move robots, was common, but recently teleoperation has become the standard. This is because separating human operators from robots allows for more comfortable human control inputs and is important for training policies with image-based inputs.

Research on teleoperation systems has focused on exploring various interfaces such as VR headsets, joysticks, and smartphones. However, none of these works explore active assistance for human operators during teleoperation.

Other research has investigated using low-DoF interfaces to control high-DoF manipulators through learned embedding spaces, enabling people with disabilities to control robot arms. In contrast, the approach in this paper trains an assistive policy that automates parts of the teleoperation process with the goal of enabling more scalable data collection.

#### Interactive Human-Robot Learning

In the field of robot learning, many approaches have explored leveraging human input in the learning loop, focusing on various methods for determining when to leverage such input.

Based on the DAgger algorithm, many studies have investigated having humans directly decide when to intervene, using ensemble-based confidence estimates, using discrepancies between model outputs and human inputs, or using risk estimates based on predicted future rewards.

---

### Methods

#### Problem Formulation

<img src="https://velog.velcdn.com/images/devjo/post/fea27f1b-1657-4179-b62b-d570a39236a7/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

To enable scalable data collection for dataset $D$, we propose using an assistive policy to automate control of repetitive actions. The assistive policy controls the robot and minimizes necessary human input, allowing human operators to divert attention from the robot for continuous intervals.

The assistive policy can be defined as $\pi(a|s)$ that produces an action $a$ (e.g., robot end-effector displacement) given a state $s$ (e.g., raw RGB images).

To train the assistive policy $\pi$, we assume access to a pre-collected dataset $\mathcal{D}_{\text{pre}}$ of diverse agent experiences.

#### Learning Assistive Policy from Multi-Modal Data

<img src="https://velog.velcdn.com/images/devjo/post/d1236aec-4138-4b73-8420-e988c55bf5a3/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Learning an assistive policy $\pi(a|s)$ from diverse multi-task data $\mathcal{D}_{\text{pre}}$ is challenging because the data is often highly multi-modal and has long horizons for imitation.

It consists of a subgoal predictor $p(\mathbf{sg}|s, z)$ and a subgoal-reaching policy $\pi_{\text{LL}}(\mathbf{a}_t|s_t, \mathbf{sg})$. Given a state $s$, the subgoal predictor generates a low-level subgoal $\mathbf{sg}$. Then, given the subgoal and current state, the subgoal-reaching policy outputs actions for the next $L$ timesteps to guide the agent toward the subgoal.

We train the subgoal predictor $p(\mathbf{sg}|s_t, z)$ as a conditional variational auto-encoder (CVAE) for subgoals.

The low-level subgoal-reaching policy $\pi_{\text{LL}, \phi}(\mathbf{a}|s, \mathbf{sg})$ is trained through a behavioral cloning objective. Since the subgoal-reaching policy must predict a sequence of actions given a subgoal, we choose a recurrent policy implemented using an LSTM that autoregressively predicts actions for the next $L$ steps using $s_t$ and $\mathbf{sg}$.

#### Determining When to Request User Input

<img src="https://velog.velcdn.com/images/devjo/post/9bd021ec-a26b-482c-a694-780a2c92d752/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Specifically, we request user input when the assistive policy has high uncertainty due to (1) out-of-distribution states or (2) multi-modal action distributions. The hierarchical model allows us to estimate these two classes of uncertainty separately.

First, to estimate whether a given state is unseen, we follow prior work on out-of-distribution detection and train an ensemble of $K$ low-level subgoal-reaching policies $\pi_{\text{LL}}^{(1)}(\mathbf{a}^{(1)}|s), \ldots, \pi_{\text{LL}}^{(K)}(\mathbf{a}^{(K)}|s)$. All are trained using the same data $\mathcal{D}_{\text{pre}}$ but with different initializations and batch orders.

Then, the discrepancy $D(\mathbf{a}^{(1)}, \ldots, \mathbf{a}^{(K)})$ (i.e., the mean of action variances across each dimension) between actions $\mathbf{a}^{(1)}, \ldots, \mathbf{a}^{(K)}$ predicted by this ensemble of policies can be used to approximate how out-of-distribution a state is, which we call policy uncertainty. States with high policy uncertainty can be considered unseen states. When the assistive policy faces an unseen state, we request the user to decide which action to take next.

Even if we determine that a state has been seen in training data, we additionally identify whether there are multiple possible task options for the current state before following the assistive policy.

To estimate task uncertainty, i.e., the assistive policy's uncertainty about the task, we propose computing the variance between subgoals $\text{Var}(\mathbf{sg}^{(1)}, \ldots, \mathbf{sg}^{(N)})$ of subgoals $\mathbf{sg}^{(1)}, \ldots, \mathbf{sg}^{(N)}$ sampled from the subgoal predictor $p_{\theta}(\mathbf{sg}^{(i)}|\mathbf{s}, z^{(i)})$.

---

### Conclusion

Large-scale robot demonstration datasets are key to enabling the next breakthrough in robot learning. As a step toward large-scale robot data, we propose an efficient and scalable system for robot data collection that uses a learned assistive policy to automate parts of human teleoperation and actively requests human input at critical states.

For simplicity, we assume access to pre-collected data $\mathcal{D}_{\text{pre}}$ for training the assistive policy. However, the assistive policy can theoretically be learned from scratch and continuously improved as more data is collected. In this way, operators can also teach new skills to the assistive policy over time and adapt its capabilities to their needs. We leave investigation of continuously evolving assistive systems as an interesting direction for future work.

---

### References

[Original source #1](https://arxiv.org/pdf/2212.04708)

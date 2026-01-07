---
title: 'Forge: Force-Guided Exploration for Robust Contact-Rich Manipulation under uncertainty'
date: '2025-05-24'
tags: ['robotics', 'paper review']
---

### Abstract

This paper introduces a method named FORGE, which enables force aware manipulation policies to be transferred from simulation to the real world in scenarios with significant pose uncertainty.

During simulation based policy learning, FORGE combines a force threshold mechanism with a dynamics randomization scheme so that the learned policies transfer robustly to real robots.

When deployed on a real robot, a FORGE policy is conditioned on a maximum allowable force and adapts its behavior to accomplish contact rich tasks while avoiding aggressive or unsafe actions, independent of the specific controller gains. In addition, a FORGE policy predicts task success, which supports efficient early termination of episodes and autonomous tuning of the force threshold.

The authors show that FORGE can be used to learn diverse and robust contact rich policies, including insertion of snap fit connectors using force feedback. Furthermore, they demonstrate a multi stage assembly of a planetary gear system, in which the policy must succeed in three separate assembly subtasks, nut threading, insertion, and gear meshing.

---

### Introduction

The authors are interested in developing sim to real techniques that learn assembly primitives such as tight tolerance insertion or nut threading. Over the last decade, sim to real methods have enabled impressive advances in dexterous manipulation and legged locomotion.

Comparable progress in robotic assembly is more recent, because accurate and efficient simulation of detailed low clearance parts is essential. Despite this progress, applying sim to real techniques to contact rich assembly remains highly challenging. If one naively deploys a policy, the resulting robot motions can be overly aggressive so that parts slip catastrophically or become damaged, which makes the task difficult or impossible to complete. This problem is especially severe when pose uncertainty is present and when exploration behaviors that rely on contact are required.

<img src="https://velog.velcdn.com/images/devjo/post/4c217707-6a0c-485a-80d5-a401cf2f4e02/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Even when contact between parts is desired, excessively large forces can lead to undesirable outcomes. Heuristic exploration strategies such as spiral search can limit the applied forces, but they tend to be task specific and inefficient. For instance, policies trained with the IndustReal framework neither observe contact forces nor adapt to them. Nut threading can fail when forces are too large, while snap fit connectors may require fairly high forces for proper insertion. Hence it is important to have a simple and efficient way to adjust the force profile of a policy.

FORGE consists of two complementary components that ensure robustness to contact. First, the policy is explicitly conditioned on a force threshold that should not be exceeded during task execution. Second, policies are trained under extensive dynamics randomization, including randomization of robot, controller, and part properties, so that the threshold is respected across a wide range of conditions.

---

### Methods

#### POMDP Formulation

The goal is to learn a policy $\pi_\theta(a_t | o_1, \dots, o_t)$ that maximizes the expected return $J(\pi_\theta)$.

$$
J(\pi_\theta) = E_{\tau \sim p(\tau|\pi_\theta,\Psi)} \left[ \sum_{t=0}^{\infty} \gamma^t r_t \right]
$$

Here $\tau = (s_0, a_0, o_0, s_1, a_1, o_1, \dots)$ denotes the trajectory of states, actions, and observations induced when the robot follows policy $\pi_\theta$. The state $s_t \in S$ consists of the pose and velocity of the end effector, the fixed part, and the grasped part. It also includes the contact force at the end effector $F^{ee} \in \mathbb{R}^3$ and static information about the dynamics of the robot, controller, and parts. Since the full state is difficult to estimate exactly, the agent instead observes noisy estimates of the end effector pose and velocity $\hat{p}^{ee}$, estimated contact forces $\hat{F}^{ee}$, and a noisy estimate of the fixed part pose $\hat{p}^{fixed}$. The action is the target of a task space impedance controller. As in prior work, all parts are assumed to be vertically aligned, so the policy only needs to control the $(x, y, z, \text{yaw})$ dimensions. The reward function augments the standard signal with two discrete bonus rewards, $\text{I}_{place}$ and $\text{I}_{success}$, which are given when the task reaches important milestones.

#### Robust Search

The proposed FORGE method uses on policy reinforcement learning in simulation to learn search behaviors. To enable robust sim to real transfer, the authors introduce a force threshold and dynamics randomization.

During policy execution, excessive contact forces can cause parts to slip or become damaged. While minor slips might be recoverable with additional sensing such as wrist cameras or tactile sensors, it is preferable to avoid these situations altogether. The authors therefore condition the policy on a force threshold $F_{th}$ and write $\pi(a | o, F_{th})$. During training, if the contact force $F^{ee}_t$ exceeds the threshold, the policy receives a penalty by adding the following term to the reward function.

$$
R_{contact\text{-}pen}(F^{ee}_t) = - \beta \cdot \max(0, ||F^{ee}_t|| - F_{th})
$$

For a policy trained in simulation to deploy successfully in the real world, the trajectory distribution encountered during training should resemble the distribution encountered at deployment.

$$
p(\tau^{real}|\pi_\theta, \Psi^{real}) \approx p(\tau^{sim}|\pi_\theta, \Psi^{sim})
$$

The discrepancy between these distributions is usually referred to as the sim to real gap. System identification aims to tune $\Psi^{sim}$ so that it is close to $\Psi^{real}$, which is a complex calibration process that may need to be repeated for each new set of parts. Instead, the authors adopt a dynamics randomization approach, which learns a policy that is robust over a broad range of dynamics parameters.

$$
\tau \sim p_{DR}(\tau |\pi_\theta) = \int p(\tau |\pi_\theta, \Psi)p(\Psi)d\Psi
$$

The policy outputs a relative pose $a_t$, which is composed with the pose of the fixed part to obtain the absolute target pose $p^{targ}_t$. This pose is clipped by an action scaling factor $\lambda$ so that the target does not move too far from the current end effector pose. To ensure stable control, the controller uses critically damped gains $k_d = 2\sqrt{k_p}$. Hence the controller behavior and the maximum commandable force are controlled by two parameters, namely $\lambda$ and $k_p$.

$$
\begin{aligned}
&p^{targ}_t = \text{clip}(\text{combine}(a_t, p^{fixed}), \lambda), \\
&F^{targ} = k_p(p^{targ}_t - p^{ee}_t) - k_d v^{ee}_t
\end{aligned}
$$

Both parameters are randomized so that the maximum commandable force lies in the range $[6.4, 20.0]\text{N}$. Because the controller parameters are not part of the observation, the policy must adapt its behavior based on the measured forces, which reduces dependence on any specific controller implementation. When parts slip relative to one another, material friction affects lateral forces, so the authors also randomize the mass and friction of the parts to ensure that the policy works across many materials. In each episode, a dead zone $F^{DZ}_i$ is sampled for each dimension and any commanded force below that value is clamped to zero, that is, $|F^{applied}_i| = \max(0, |F^{targ}_i| - F^{DZ}_i)$. This encourages the policy to increase the target when more force is required and helps reduce steady state errors.

---

### Conclusion

This work proposes FORGE, a force aware method for training robust sim to real policies under pose estimation uncertainty. By combining a force threshold with dynamics randomization, the method learns safe exploration behaviors and enables successful execution even under position estimation errors up to $5\text{mm}$. The policy also predicts task success, which allows efficient policy execution and automatic adjustment of the force threshold. The authors plan to investigate torque sensing in future work in order to design even more efficient exploration strategies.

---

### References

[Original Source 1](https://arxiv.org/pdf/2408.04587)

---
title: 'Dynamic Grasping with Reachability and Motion Awareness'
date: '2025-06-02'
tags: ['robotics', 'paper review']
---

### Abstract

As a target object moves, a grasp that was previously stable and reachable can quickly become unreachable or unstable, which requires motion planning to adapt in real time. In addition, computational latency makes prediction essential. This paper presents a dynamic grasping framework that is aware of both reachability and object motion.

The robot’s reachability space is modeled using a signed distance field, which enables rapid filtering of unreachable grasp poses. A neural network is also trained to predict grasp quality conditioned on the current motion of the target. These two components are used as ranking functions to quickly filter a large grasp database down to a small set of candidate grasps in real time. Furthermore, the authors introduce a seeding based approach to arm motion generation that leverages the solution from the previous time step, allowing new arm trajectories to be generated quickly while remaining similar to prior plans and avoiding excessive plan variation. To model and predict object motion, a recurrent neural network is employed.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/4cad119f-628b-45e3-8554-5a8bad10ca1a/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Robotic manipulation becomes significantly more difficult in dynamic environments, which are common in the real world. In settings such as dynamic grasping, catching a ball, or human robot object handover, the targets and obstacles to be interacted with may move in unknown ways. Equipping robots with the ability to manipulate objects in such dynamic environments, although relatively underexplored, is crucial for enabling automation in both industrial and everyday contexts.

Dynamic environments introduce several challenges. First, the continuous evolution of the scene requires online and fast motion replanning. Sampling based methods such as RRT and PRM are not well suited to this requirement, because their inherent randomness leads to jerky and highly variable motions when plans are recomputed at every time step. Optimization based methods such as CHOMP and STOMP can become computationally expensive in complex scenes, making rapid replanning extremely difficult. Second, most work on grasp planning pays little attention to the approach and closing motion of the grasp, even though these motions are critical for moving targets. For example, approaching a moving object from the direction of its motion can yield a much higher success rate than attempting to grasp it from behind. Third, by the time a planned motion is executed, it may already be outdated, which makes it necessary to understand and predict the motion of the object.

To address reachability issues, the authors exploit the extended workspace available to a full degree of freedom grasp and restrict grasp selection to regions that are more reachable and easier to manipulate. They also observe that grasp robustness can vary with the speed and direction of the object’s motion. To account for this, they learn a function that predicts the robustness of a grasp given the motion of the object.

---

### Methods

#### Overview

Each grasp consists of a grasp pose and a pregrasp pose obtained by retreating a distance $b$ from the grasp pose along the approach direction. For a target object $\mathcal{O}$, a precomputed grasp database $G_{DB}$ is retrieved. In the dynamic grasping loop, the current pose $p_c$ of the object is estimated and its future pose $p_f$ after a time $t$ is predicted, where $t$ is defined as a step function of the Euclidean distance $d$ between the arm end effector and the planned pregrasp pose. The grasps in $G_{DB}$ are transformed from the object frame to the robot frame according to the predicted pose $p_f$, and reachability and motion aware ranking functions are applied to filter the grasps and retain the top ten selected grasps $G_F$.

#### Object Motion Modelling

In real world experiments, the authors use DOPE, a recent learning based method, to obtain instantaneous poses of moving objects in the scene. DOPE trains a neural network that takes RGB images as input and outputs the pose of a target object with respect to the camera frame. A separate model is trained for each object of interest, and each model can detect multiple instances of its corresponding object. Images of the grasping scene are captured using a Kinect sensor and passed through the DOPE models to detect the objects and obstacles present.

#### Recursive State Estimation / Object Pose Prediction

Because grasp and motion planning take time to compute, the resulting plans can quickly become invalid as the object continues to move. Accurately predicting the future pose of the target object can therefore significantly improve the overall success rate of a dynamic grasping system.

While a Kalman filter provides a practical solution for linear motion prediction, the authors adopt a recurrent neural network approach to handle more general nonlinear motion. The RNN continuously receives a sequence of instantaneous pose measurements $(p_{t-n}, \dots, p_{t-1}, p_t)$ as input and updates its internal state, which is then used to predict future poses $(p_{t+f_1}, p_{t+f_2}, \dots, p_{t+f_m})$ at different prediction horizons.

#### Motion-Aware Grasping

For instance, attempting to grasp an object that is moving away from the robot from behind can lead to very different success statistics compared to approaching along the direction of motion. To address this, the authors learn a neural network model $M(g, p_g, v, \theta)$ that predicts the success probability of a grasp $g$ given the object’s motion profile, characterized by speed $v$ and motion direction $\theta$.

The six dimensional grasp pose $g \in \mathbb{R}^6$ consists of position $\{x, y, z\}$ and orientation $\{\text{roll}, \text{pitch}, \text{yaw}\}$ in the object’s reference frame. The six dimensional pregrasp pose $p_g \in \mathbb{R}^6$ is obtained by retreating the grasp pose along the approach direction, which is the vector from the end effector to the object. The object speed is denoted by $v \in \mathbb{R}$ and the motion direction by $\theta \in [0, 2\pi]$.

The network has two hidden layers with 512 units each and outputs the predicted grasp success probability. A dataset is generated in simulation using only the robot’s end effector, comprising 10000 grasp attempts for each of seven different objects. For each attempt, the end effector starts at the pregrasp pose and moves toward the object while the object moves at a speed uniformly sampled between $0.5\text{cm}/\text{s}$ and $5\text{cm}/\text{s}$ in a randomly sampled planar direction.

---

### Conclusion

This work introduces a new pipeline for dynamically grasping moving objects that is both reachability aware and motion aware.

The effectiveness of the pipeline is demonstrated using an RNN based motion predictor and adaptive motion planning with seeding. Experiments in a variety of settings show that these components are crucial for achieving good performance.

The current system is a model based visual pose feedback system. A natural direction for future work is to develop an image based counterpart in which learning based techniques are used to directly generate arm hand trajectory commands from image and depth features.

---

### References

[Original Source 1](https://arxiv.org/pdf/2103.10562)

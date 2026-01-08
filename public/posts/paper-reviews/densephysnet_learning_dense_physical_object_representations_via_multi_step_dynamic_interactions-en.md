---
title: 'DensePhysNet: Learning Dense Physical Object Representations via Multi-step Dynamic Interactions'
date: '2025-05-31'
tags: ['robotics', 'paper review']
---

### Abstract

Understanding object physics is critical for successful object manipulation, yet it is challenging because many physical properties cannot be inferred from an object’s static appearance alone. This paper introduces DensePhysNet, a system that actively executes a sequence of dynamic interactions such as sliding and collisions and uses a deep predictive model over visual observations to learn dense, pixel wise representations that reflect the physical properties of observed objects.

Experiments in both simulation and the real world show that the learned representations encode rich physical information and can be used to directly decode physical object properties such as friction and mass. The use of dense representations enables DensePhysNet to generalize well to new scenes that contain more objects than were present during training.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/fb45386a-bac5-4a01-82fa-573e8fbe6bcb/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Intelligent manipulation benefits greatly from the ability to distinguish between object materials and to infer physical properties from visual information. For instance, when rearranging objects on a table, distinguishing heavy from light materials allows for better planning of manipulation strategies. A considerable body of prior work has focused on learning object centric representations that capture visual features, but these approaches rarely consider latent physical properties such as mass or friction. Unsupervised learning of physical properties remains relatively underexplored.

Most physical properties cannot be directly inferred from visual appearance cues in static environments. For example, aluminum and steel may look very similar, yet have very different mass. Under static or quasi static interactions, many physical properties do not manifest clearly. When lightly pushing a wooden block and a metal block, visible differences in motion may remain subtle despite differences in material and density.

This work proposes a method for discovering and learning object physical properties from visual observations of multi step, self supervised dynamic interactions. DensePhysNet takes the current scene and an action as input and predicts how objects will move after the interaction, represented as pixel wise optical flow. By learning to predict future object states under a variety of interactions, DensePhysNet acquires an implicit understanding of objects’ physical properties and how these properties influence observed motion.

---

### Methods

The goal of DensePhysNet is to learn latent, object centric representations that encode physical properties such as mass and friction in a self supervised manner. To this end, the authors train a deep predictive model over depth images using a large dataset of observed dynamic robot interactions. The core idea is that, for DensePhysNet to accurately predict future object states under various interactions, it must implicitly acquire an understanding of objects’ physical properties and how these properties influence their observed motion.

The experimental setup consists of a collection of objects placed on ramps in front of a robot. During interaction, the robot captures a depth image $I_t$ of the scene at time $t$, executes an action $a_t$, and then captures another depth image $I_{t+1}$ at the next time step. DensePhysNet is modeled as a neural network that takes the visual observation $I_t$ and the executed action $a_t$ as input and outputs a prediction of the next observation $I_{t+1}$ in the form of optical flow $O_{t, t+1}$.

#### Dynamic Interactions

The robot agent executes two types of dynamic interactions designed to highlight object physical properties, namely sliding and collisions. Much prior work on representation learning has relied on static or quasi static manipulations such as pushing, grasping, or poking, under which it is difficult to observe latent physical properties from object motion. During quasi static pushing, for example, it is typically assumed that the object moves together with the end effector and stops when the end effector stops, which naturally makes it harder to see subtle motion differences arising from physical properties.

In contrast, dynamic manipulations can induce object motion that persists beyond contact with the manipulator and is therefore more likely to reveal physical properties. For instance, pushing an object at a high speed can impart enough momentum for it to slide independently over some distance. Differences in post contact motion, such as the distance traveled, can provide visual cues about differences in surface friction.

The sliding action is parameterized by a direction $\theta$ relative to the robot and a speed $v$. To make an object slide, the robot approaches it from direction $\theta$ and executes a high speed push that allows the object to continue sliding after contact. To achieve high pushing speeds without exceeding the real robot’s force torque safety limits, the motion planner is constrained such that joints near the arm base, such as the shoulder and elbow, move more slowly than joints close to the end effector, such as the wrist. The direction $\theta$ and speed $v$ are quantized as discrete variables and encoded using one hot vectors.

For collision interactions, the robot first grasps an auxiliary cylinder and places it at the top of one of the ramps. The cylinder then rolls down the ramp and collides with objects placed in the middle. The only parameter of the collision action is the cylinder’s starting position $[d \times X_s, y, H_s]$, where $d \in \{-1, 1\}$ indicates whether the cylinder rolls down the left or right ramp, $X_s$ is the distance from the ramp to the center of the workspace, $y$ is the same as the target object’s $y$ coordinate, and $H_s$ is the height of the ramp.

#### DensePhysNet

<img src="https://velog.velcdn.com/images/devjo/post/c5a06f82-8c65-4fc1-a68f-6aba7b468687/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

The learned physical representation is designed to be modular, in the sense that it is separated from the representations encoding visual appearance and action information. This modularity is crucial for transferring the learned physical representations to new tasks, objects, and types of actions. The architecture has a recurrent structure, allowing the model to integrate information across multiple interactions to better infer physical properties. Finally, rather than encoding the entire scene as a single latent vector, DensePhysNet produces dense, pixel wise representations that can naturally handle complex scenes with multiple objects.

The DensePhysNet architecture consists of five modules, namely an image encoder, a multi step information aggregator, an action encoder, a cross convolutional layer, and a motion predictor.

---

### Conclusion

DensePhysNet learns dense physical object representations from self supervised interactions. Qualitative and quantitative analyses show that the model acquires information about object materials and physics. Moreover, the learned representations can be used for downstream control tasks such as planar sliding, where they support more accurate action policies.

The design of the action space plays an important role in learning object physics. By incorporating both planar sliding and collisions, the authors show that the model can learn to infer both mass and friction. Extending DensePhysNet to support a much richer set of interactions would further reveal its full potential.

The system currently learns physical representations from object motion observed in depth images and does not take color images as input, although such information could provide additional cues about object geometry and potentially its physical properties.

---

### References

[Original Source 1](https://arxiv.org/pdf/1906.03853)

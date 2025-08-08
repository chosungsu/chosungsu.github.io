---
title: 'What is slam'
date: '2024-10-02'
tags: ['slam', 'lecture']
---

### What is SLAM?

SLAM stands for Simultaneous Localization and Mapping, which provides moving robots with the ability to estimate their own position while simultaneously creating a map of the surrounding environment.

First, localization is the process of determining one's position by comparing a given map with actual surrounding information.

Mapping, on the other hand, means generating a map of the surrounding environment when knowing one's own position. It also involves determining whether the current location is a place previously visited and updating accordingly.

---

### Types of Algorithms

Early SLAM algorithms studied in the late 1900s were largely based on Bayesian filters. Bayesian filters are probability-based recursive filters used in the field of robotics, founded on Bayes' theorem which calculates posterior probabilities from prior probabilities and likelihoods. These algorithms probabilistically fuse and update continuously inputted sensor information about the surrounding environment with current position information. Examples of such algorithms include EKF SLAM using Extended Kalman Filters and Fast SLAM using particle filters.

As robots move through space, predicted values for the robot's current position and measured values for landmark positions are inputted, and each prior probability is fused with likelihood to update the posterior probability. As a result, uncertainty about landmark positions decreases and uncertainty about the robot's position also decreases, enabling accurate task performance.

In the 2000s, optimization-based methodologies using graph structures were studied. This structure consists mainly of graph nodes and graph edges, where nodes represent robot positions and edges represent constraints between nodes (rotation and translation).

<img src="https://velog.velcdn.com/images/devjo/post/3ede9e3f-cba2-4e98-aed0-afce1fed27f8/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

As robots move through space, the shape of the map becomes progressively clearer and more consistent.

Another type is the feature-based method. This approach tracks camera trajectories and performs mapping based on feature points. ORB-SLAM is a representative example.

There is also the direct method, which tracks trajectories and performs mapping by directly using intensity value differences between images without feature points. LSD-SLAM is a representative example.

Deep learning, which solves problems by extracting meaningful patterns or information from vast amounts of data, is also being applied to SLAM. DeepVO predicts transformation relationships between images by taking sequential images as input in chronological order and outputting camera poses in 3D space. It learns feature maps for individual images by inputting images at time t into a CNN, then learns by inputting consecutive feature maps into an RNN. However, performance is inferior compared to traditional SLAM. Recently, unsupervised or semi-supervised learning research is being conducted.

---

### Pipeline

#### 1. Visual Odometry

<img src="https://velog.velcdn.com/images/devjo/post/dc1ef3a1-8087-456b-8cd4-06c625080fa9/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

This is an algorithm that calculates rotation and translation parameters by predicting sensor movement between adjacent images. However, if only this algorithm is used to predict continuous sensor trajectories, accumulated drift errors cause significant differences from the actual trajectory. Loop closure detection and backend optimization are necessary for consistent trajectories.

#### 2. Loop Closure Detection

<img src="https://velog.velcdn.com/images/devjo/post/44c6230f-2fae-4447-9154-e352aeda659a/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

This is an algorithm that determines whether the current sensor position is a previously visited location by considering similarities between current and previous inputs. Similarity between sensor inputs can consider image similarities or geometric structural similarities. It enables robust determination of the same location despite various changing factors such as different times, weather, lighting, and viewpoints.

#### 3. Backend Optimization

<img src="https://velog.velcdn.com/images/devjo/post/61bf176b-b9af-43bb-aeb5-b9c1fe7ae422/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

This is a method for accurately estimating the state of the entire system from noisy data, using either filter-based or nonlinear optimization methods. Filter-based methods use Bayesian filters to recursively fuse prior probabilities and likelihoods to update posterior probabilities, including Kalman filters and particle filters.

Nonlinear optimization methods minimize constraints when given nonlinear motion models between sensor poses and landmarks, including bundle adjustment and graph optimization.

---

### Mathematical Definition

<img src="https://velog.velcdn.com/images/devjo/post/db4de94f-255d-4eb2-89f9-ba23196b7ba8/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

SLAM calculates map information $m$ from control information $u_{1:T}=\{u_1, u_2, ..., u_T\}$ and observation information about the surrounding environment $z_{1:T}=\{z_1, z_2, ..., z_T\}$ up to the current time $t$.

---

### References

[Original Source #1](https://dongwonshin.oopy.io/53261df4-e506-4afb-8039-bc29e6a6ec40)




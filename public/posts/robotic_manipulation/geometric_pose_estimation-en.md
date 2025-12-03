---
title: 'Geometric Pose Estimation'
date: '2024-11-20'
tags: ['Robotics', 'Manipulation', 'lecture']
---

### Geometric Pose Estimation

#### Cameras and Depth Sensors

<img src="https://velog.velcdn.com/images/devjo/post/2104bc26-00f4-4e24-8183-0a4e3305ddd5/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

Visual sensors (camera-based and/or range-measuring sensors) play an important role in robotic manipulation systems. Sensors that explicitly measure depth information are commonly used. Mainly RGB-D cameras (ToF, pattern-projected stereo) and Lidar are used.

#### Sensor Noise and Dropout

Real depth sensors are not ideal, and depth measurement errors vary depending on lighting, surface normals, and material properties rather than being simple Gaussian noise. Missed returns (maximum depth returns) where depth measurement fails, especially at object edges or reflective objects, are common.

#### Occlusion and Partial Views

Since cameras only see along the line of sight, the camera must be moved to see the back or bottom of objects. During manipulation, occlusion where the robot's hand blocks the view frequently occurs.

---

### Point Cloud Registration with Known Correspondences

The goal of this problem is to estimate the object pose $\mathbf{X}^{\text{O}}$ using a model point cloud $\mathcal{M}$ of a known object and a scene point cloud $\mathcal{S}$ obtained from the camera.

We describe the model point list $m_i$ in the object frame as $^{\text{O}} X^{\text{m}_i}$. And we transform the scene point $s_i$ to camera coordinates as $^{\text{C}} X^{\text{s}_i}$.

This problem is an over-constrained inverse kinematics problem, and we use least-squares to estimate the pose robustly against measurement noise.

$$
\underset{X \in SE(3)}{min} \sum_{i=1}^{N_s} \Vert X^{\text{O}}p^{m_{c_i}} - X^{\text{C}} {}^{\text{C}}p^{s_i}\Vert^2
$$

An important insight for separating rotation and translation optimization is that the relative positions of points are affected by rotation but not by translation.

$$
\underset{p, R}{min} \sum_{i=1}^{N_s} \Vert p+R^{\text{O}}p^{m_{c_i}} - X^{\text{C}} {}^{\text{C}}p^{s_i}\Vert^2
$$

---

### Iterative Closest Point, ICP

<img src="https://velog.velcdn.com/images/devjo/post/b073a869-c52d-42a3-a834-8f616863b462/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

To handle the realistic situation when correspondences are unknown, we use the Iterative Closest Point (ICP) algorithm. That is, we start with an initial guess of the object pose, compute correspondences through nearest points, then update the estimated pose using these correspondences.

The correspondence $\hat{c}$ for an estimated object pose $\hat{X}^{\text{O}}$ can be expressed as:

$$
\hat{c}=\text{argmin}_{j \in N_m} \Vert \hat{X}^{\text{O}} {}^{\text{O}}p^{\text{m}_j}-p^{s_i}\Vert
$$

---

### Partial Views and Outlier Handling

ICP (Iterative Closest Point) is known to be vulnerable to local minima problems. In real robotics environments, robustness of ICP becomes even more important because we must handle "messy" point clouds containing outliers (scene points that do not correspond to the model), noise, and partial views.

#### Outlier Detection

<img src="https://velog.velcdn.com/images/devjo/post/1580641c-ce84-4644-9609-0e4b3f13d30c/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

Once we have a reasonable estimate $X^{\text{O}}$, if the distance between each scene point and its corresponding model point is greater than the maximum correspondence distance, we classify that scene point as an outlier and remove it.

#### Point Cloud Segmentation

Outliers in the scene are often caused by other objects in addition to poor reflections. If we know the background geometry such as a table or bin in advance, we can remove points in those regions or crop the point cloud to a region of interest (ROI).

When there are multiple objects in the scene, it is difficult to directly estimate the pose of the object of interest. Therefore, we must use other algorithms to segment the scene into multiple possible objects and run registration independently for each segment. Recently, there is a trend toward using neural networks for segmentation.

#### Generalized Correspondences

To handle partial views or outlier problems, we can generalize the correspondence concept to allow "no correspondence." We want scene points corresponding to the model of interest to map to that model point, and scene points from outliers and other objects to be marked as "no correspondence." Model points from occluded parts of the object have no correspondence.

---

### References

[Original source #1](https://manipulation.csail.mit.edu/pose.html#section5)

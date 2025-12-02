---
title: 'Language Conditioned Path Planning'
date: '2024-09-27'
tags: ['embodied ai', 'paper review']
---

### Abstract

Contact is central to robotic manipulation. Sometimes contact is required (e.g., manipulation and grasping), while sometimes it is harmful (e.g., when avoiding obstacles). However, traditional path planning algorithms focus solely on collision-free paths, limiting their applicability in contact-rich tasks.

To address this limitation, we propose the field of Language-Conditioned Path Planning, where contact awareness is integrated into the path planning problem.

As a first step in this field, we propose Language-Conditioned Collision Functions (LACO), a novel approach that learns collision functions using only a single-viewpoint image, a language prompt, and a robot configuration.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/62cd564d-1ec0-4438-a042-546cfe27eec9/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Collision checking is a fundamental aspect of path planning in robotics, aiming to find paths that avoid collisions with the environment between initial and goal robot configurations.

However, traditional collision-free path planning approaches fall short in scenarios where contact with the environment is necessary, such as when manipulating objects or interacting with the surrounding environment. In such cases, strict collision-free constraints become unrealistic and inhibit the robot's ability to perform tasks effectively.

#### Proposing the Language-Conditioned Path Planning (LAPP) Field

We propose the field of Language-Conditioned Path Planning (LAPP), which integrates contact awareness into the path planning problem. In this field, path planning not only focuses on avoiding collisions but also incorporates the ability to make informed decisions about contact with the environment. This allows robots to perform complex manipulation tasks involving controlled interactions such as holding a cup or opening a door.

As shown in the image above, we demonstrate a common scenario where a robot faces multiple obstacles and must interact with the environment. A collision-free path fails to reach the cup, but a language-conditioned path successfully reaches it using the guidance "Can collide with toy."

---

### Methods

#### Language-Conditioned Path Planning

<img src="https://velog.velcdn.com/images/devjo/post/f85cc607-d686-4c21-a807-a5b519d161ed/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

In robotics, the path planning problem is to find a connected, collision-free path $p = (s_0, s_1, \ldots, s_g)$ of robot configurations (i.e., waypoints) starting from an initial configuration $s_0$ to a final configuration $s_g$, such that all configurations in the path are collision-free with the environment.

$$
\forall s_t \in p, C(o_t, s_t) = 0
$$

$o_t$ and $s_t$ represent the environment and robot configuration at time $t$, respectively, and $C(o, s)$ represents a collision function that outputs 1 if robot configuration $s$ collides with environment $o$, and 0 otherwise.

In this paper, we propose the Language-Conditioned Path Planning (LAPP) problem by relaxing strict collision-free constraints in path planning, allowing path planning to manage safe or desired contact with the world, particularly guided by language.

$$
\forall s_t \in p, C(o_t, s_t, l) = 0
$$

where $l$ is a language prompt that modulates what should be considered allowed or desired collisions.

#### Language-Conditioned Collision Functions

For language-conditioned path planning, path planning algorithms must understand which collisions are allowed and which should be avoided as described in language.

Specifically, LACO learns a collision function $C(o, s, l)$ where $o$ is a single-viewpoint image observation of the environment, $s$ is a queried robot joint state, and $l$ is a language instruction corresponding to objects with which collisions are allowed. Note that $o$ need not correspond to $s$ and only represents the environment configuration.

We train $C(o, s, l)$ on a dataset $\mathcal{D} = \{(o, s, l, y^l, y)\}$ where $y$ indicates whether robot state $s$ has any collision in scene $o$, and $y^l$ indicates whether there is unwanted contact under language instruction $l$.

To leverage large-scale vision-language models pre-trained on large corpora, we use CLIP's vision and language encoders as backbone networks. We tokenize the input image $o$ of size $256 \times 256$ with a fixed pre-trained CLIP ViT encoder and tokenize the language prompt $l$ with a fixed pre-trained CLIP language model.

---

### Conclusion

LACO does not explicitly consider environment dynamics. Once an object is collided with, it may respond by being pushed or toppled, potentially affecting the configuration and position of other nearby objects. This limits LAPP's ability to handle dynamic environments and can lead to suboptimal or unsafe path planning when objects move significantly.

The field of Language-Conditioned Path Planning (LAPP) addresses the limitations of traditional collision-free path planning in contact-rich robotic manipulation tasks. By integrating contact awareness into path planning, LAPP allows robots to make informed decisions about contact with the environment, enabling them to effectively perform complex manipulation tasks.

---

### References

[Original source #1](https://arxiv.org/pdf/2308.16893)

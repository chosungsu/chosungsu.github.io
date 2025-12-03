---
title: 'UniSkill: Imitating Human Videos via Cross-Embodiment Skill Representations'
ddate: '2025-12-01'
tags: ['embodied ai', 'paper review']
---

### Abstract

Learning from human videos has emerged as a central paradigm in robot learning by offering a scalable approach to overcoming the scarcity of robot-specific data. Human videos contain everyday behaviors such as human–object interactions, which can provide a rich source of skills for robot learning.

However, transforming human videos into robot-executable skill representations has traditionally relied on paired human–robot datasets or pre-defined semantic skill labels, both of which are difficult to scale. Recent approaches aim to circumvent these requirements by learning cross-embodiment skill representations without explicit pairing or labeling.

To this end, this paper proposes UniSkill (Universal Skill representations), a scalable approach for learning cross-embodiment skill representations from large-scale in-the-wild video data, enabling robots to convert unseen human demonstrations into a sequence of robot-executable skill representations.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/ed90d36a-e288-49a5-9375-d029fe9e1e69/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Learning from human videos has become a core paradigm in robot learning by providing a scalable way to address the scarcity of robot-specific data. Human videos contain everyday activities such as human–object interactions, which can serve as a rich source of skills for robots.

Traditionally, transforming human videos into robot-executable skill representations has relied on paired human–robot datasets or pre-defined semantic skill labels, both of which are difficult to scale. Recent work instead seeks to learn cross-embodiment skill representations without explicit pairing or labeling.

Motivated by this, we propose UniSkill, a scalable approach for learning cross-embodiment skill representations from large-scale in-the-wild video data, enabling a robot to convert unseen human demonstrations into a sequence of robot-executable skill representations.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/8111dda0-db1c-4948-96d9-2eb0608d203a/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### Problem Formulation

We consider cross-embodiment imitation, where a skill-conditioned robot policy $\\pi(o_t, z_t)$ aims to reproduce behaviors demonstrated in a prompt video $\\mathbf{V}^p = \\{I^p_1, \\ldots, I^p_{N_p}\\}$ of length $N_p$ from another embodiment (e.g., a human). Here, $I^p_t$ and $o_t$ denote the frame of the prompt video and the robot observation at time $t$, respectively. The prompt video contains only raw pixel data without any action annotations.

To achieve imitation, we extract an embodiment-agnostic skill representation $z_t$ from frame pairs $(I^p_t, I^p_{t+k})$ within the prompt video, where $k$ is the temporal gap between frames. This skill representation $z_t$ is then used to condition the robot policy $\\pi(o_t, z_t)$ so that it can reproduce the behavior demonstrated in the video prompt.

#### Learning Universal Skill Representations

We introduce an inverse skill dynamics (ISD) model and a forward skill dynamics (FSD) model to fully exploit the embodiment-agnostic nature of motion patterns in videos. These models are trained on a large-scale, multi-embodiment, unlabeled video dataset $\\mathcal{D}_u$.

$$
z_t = \text{ISD}(I_t, I_{t+k})
$$

We find that relying solely on raw RGB frames can lead to encoding embodiment-specific details such as the demonstrator's appearance or scene context, which may hinder learning an embodiment-agnostic $z_t$. To mitigate this, we integrate depth information by generating a depth map for each frame.

The forward skill dynamics model predicts the future frame $I_{t+k}$ given $I_t$ and $z_t$:

$$
I_{t+k} = \text{FSD}(I_t, z_t)
$$

#### Universal Skill-Conditioned Policy

The next step is to train a robot policy network $\\pi_{\\phi}(a_{t:t+h} \\mid o_t, z_t)$ that receives the current observation $o_t$ and uses $z_t$ as a skill-conditioning signal.

To train the skill-conditioned policy, we first sample two observations $o_t$ and $o_{t+k}$ from $\\mathcal{D}_a$ and use the pre-trained ISD to extract the skill representation $z_t = \\text{ISD}(I_t, I_{t+k})$.

The policy $\\pi_{\\phi}$ then predicts the action sequence $a_{t:t+h}$, where $h$ denotes the action horizon:

$$
\phi^{\ast} = \text{argmax}_{\phi} \mathbb{E}_{(o_t, o_{t+h}, a_{t:t+h})\sim\mathcal{D}_a} \left[ \log \pi_{\phi}(a_{t:t+h} | o_t, z_t) \right]
$$

---

### Conclusion

In this paper, we propose UniSkill, a novel approach that successfully addresses cross-embodiment challenges without relying on scene-aligned cross-embodiment datasets during training. Unlike prior work, UniSkill leverages a large-scale unlabeled video dataset spanning diverse embodiments to learn shared skill representations that generalize across embodiments.

By effectively encoding embodiment-agnostic dynamics into skill representations, UniSkill enables policies to reproduce behaviors from video prompts despite embodiment mismatches.

However, UniSkill relies on a fixed skill interval, which limits its ability to adapt to varying execution speeds between human and robot demonstrations. Allowing variable skill durations could improve flexibility in handling differences in motion speeds across embodiments.

Furthermore, UniSkill struggles with videos that exhibit abrupt viewpoint changes, particularly first-person human videos.

---

### References

[Original source #1](https://arxiv.org/pdf/2505.08787)

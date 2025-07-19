---
title: 'Active Object Localization with Deep Reinforcement Learning'
date: '2023-07-17'
tags: ['object localization', 'paper review']
---

### Abstract

This paper presents an active detection model for localizing objects in scenes. This model has class-specific characteristics and guides the agent to focus attention on candidate regions to identify the precise location of target objects. The agent learns how to transform bounding boxes using simple transformation actions and aims to determine the most specific location of target objects through top-down reasoning.

We show that an agent guided by the proposed model can localize a single instance of an object after analyzing only 11 to 25 regions in an image, achieving the best detection results among systems that do not use object proposals.

---

### Introduction

The process of localizing objects using bounding boxes can be viewed as a control problem involving a series of steps to refine the geometric shape of the box. Determining the precise location of target objects in a scene requires active engagement to understand context, change fixation points, identify distinctive parts that support recognition, and determine the exact proportions of the box.

Over the past decade, the object detection or localization problem has been studied in the vision community with the goal of recognizing object categories and identifying the spatial extent of objects with tight bounding boxes that include all visible parts. This is a challenging setting that requires computation and analysis across multiple image regions, and is a good example of tasks driven by active attention.

Significant progress in improving the accuracy of object detectors has recently been made possible through Convolutional Neural Networks (CNNs), which leverage large-scale visual data and deep learning for image classification.

In this study, we propose a class-specific active detection model that learns how to localize target objects known to the system. The proposed model follows a top-down search strategy, starting by analyzing the entire scene and gradually narrowing down to the precise location of objects. This is achieved by applying a series of transformations to a box that initially covers a wide area of the image, eventually reducing it to a tight bounding box. The sequence of transformations is determined by an agent that analyzes the content of the current visible region to select the next optimal action. Unlike sliding windows, our approach does not follow a fixed path to search for objects. Instead, we propose a dynamic attention-action strategy that transforms the box to progressively focus more on target objects.

---

### Previous works

Object localization has been successfully approached using sliding window classifiers. Popular sliding window methods based on HOG templates and SVM classifiers have been extensively used to localize objects, parts of objects, identifiable patches, and even salient components of scenes. Sliding windows are relevant to this study in that they are category-specific localization algorithms, but sliding windows perform exhaustive search over position-scale space.

A recent trend in object localization is the generation of category-independent object proposals. Compared to sliding windows, these approaches achieve significant acceleration by reducing the candidate set in this way. Nevertheless, proposal-based object detection follows the same design as window-based classification on a reduced set of regions, which still has the disadvantage of being large (thousands of windows) for a single image that may contain several interesting objects.

There is growing recent interest in attention capabilities for visual recognition. Using RNNs, they selected a series of regions that require more attention, and these regions are processed at higher resolution to recognize multiple characters. Interestingly, these models are trained with Reinforcement Learning (RL) just like this study, but this study uses simpler architecture and intuitive actions to transform boxes.

---

### Methodology

We formulate the object localization problem as a Markov Decision Process (MDP). This formulation provides a formal framework for modeling an agent that makes a series of decisions. In this study, the formulation considers a single image as the environment, where the agent transforms bounding boxes using a series of actions. The agent's goal is to place a tight box on target objects observable in the environment.

Formally, the MDP has an action set $A$, a state set $S$, and a reward function $R$.

#### 1. Localization Actions

<img src="https://velog.velcdn.com/images/devjo/post/094e13d8-5a09-4453-9679-60150012df65/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

The action set $A$ consists of 8 transformations that can be applied to the box and 1 action that terminates the search process. These actions include actions to move the box along horizontal and vertical axes, actions to change size, and actions to modify aspect ratio.

The box is represented by pixel coordinates of two corners $(b = [x1, y1, x2, y2])$. Any transformation action creates discrete changes as factors proportional to the current size of the box.

$$
\alpha_w = \alpha (x_2-x_1),\\
\alpha_h = \alpha (y_2-y_1)
$$

Transformations are obtained by adding or subtracting these values from $x$ or $y$ coordinates. For example, moving right horizontally adds $\alpha_w$ to $x_1$ and $x_2$, while reducing aspect ratio subtracts $\alpha_w$ from $x_1$ and adds $\alpha_w$ to $x_2$.

In experiments, we set $\alpha=0.2$ because we found that smaller values make the agent take longer to localize objects, while larger values make it difficult to place the box correctly.

#### 2. State

The state representation is a tuple $(o, h)$, where $o$ is the feature vector of the observed region and $h$ is the vector of action history. Therefore, generalization is important for designing effective state representations.

Feature vectors are extracted from the current region using a pre-trained CNN. All regions that the agent pays attention to are transformed to match the input (224x224) regardless of size and aspect ratio according to the technique proposed by Girshick et al. We also expand the region to include 16 pixels of context around the ground truth box. We pass through layer 6 and use a 4096-dimensional feature vector to represent the content.

The history vector is a binary vector that tells us which actions were used in the past. Each action is represented by a 9-dimensional binary vector with all values being 0 except for the value corresponding to the action. Since the history vector encodes 10 past actions, it means $h \in R^{90}$. This information is useful for stabilizing search trajectories that can get trapped in repetitive cycles and has been proven to improve mean precision by 3%.

#### 3. Reward Function

The reward function $R$ is proportional to the improvement the agent obtains for localizing objects after selecting a specific action. Improvement is measured using IoU between target objects and predicted boxes at specific points in time. The reward function can only be estimated during training since ground truth box computation is required.

Let $b$ be the box of the observable region and $g$ be the ground truth box of the target object. Then the IoU between $b$ and $g$ is defined as $IoU(b, g) = \text {area}(b \cap g)/\text {area}(b \cup g)$. When the agent selects action $a$ to move from state $s$ to $s'$, a reward function $R_a(s, s')$ is given. Each state $s$ has an associated box $b$ containing the region of attention. Then the reward is as follows.

$$
R_a(s,s')=\text{sign}(\text {IoU}(b',g)-\text {IoU}(b,g))
$$

Intuitively, this means that if there is improvement from state $s$ to $s'$, the reward is positive, otherwise it is negative. This reward has a binary value $r \in {-1,1}$ and applies to all actions. This meaning clearly conveys which transformation actions move the box away from the target, with penalties for moving away and rewards for moving closer.

---

### Experiments

The agent's goal is to transform bounding boxes by selecting actions in a way that maximizes the sum of rewards received during interaction with the environment (episode). The core problem is finding a policy that guides this agent's decision-making process. Policy $\pi(s)$ is a function that specifies which action $a$ to select when the current state is $s$. Since state transition probabilities are unknown and the reward function is data-dependent, this problem is formulated as a reinforcement learning problem using Q-learning.

In this study, we follow the deep Q-learning algorithm recently proposed by Mnih et al. This approach uses neural networks to estimate action-value functions and has several advantages over previous Q-learning methods. First, the output of the Q-network has as many units as the number of actions in the problem. This makes the model efficient because the input image is passed through the network only once to estimate the values of all possible actions. Second, this algorithm integrates replay memory to collect diverse experiences and learn over the long term. In this way, transitions from replay memory are used for many model updates, increasing data efficiency. Third, to update the model, the algorithm uniformly randomly selects transitions from replay memory to break short-term correlations between states. This makes the algorithm more stable and prevents parameter divergence. After learning the action-value function $Q(s, a)$, the policy that the agent follows is to select the action $a$ with the maximum estimated value.

<img src="https://velog.velcdn.com/images/devjo/post/9a4f2b76-a441-45e4-a8c0-7ccedb9e6361/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

The architecture of the proposed QNetwork is as shown in the image above, where the input region is first transformed to 224 × 224 pixels, then processed by a pre-trained CNN with 5 convolutional layers and 1 fully connected layer. The output of the CNN is concatenated with the action history vector to complete the state representation. This is processed by the Q-network to predict values for 9 actions.

#### Q-learning for Object Localization

In this study, we do not learn the entire feature hierarchy of convolutional networks, but instead rely on pre-trained CNNs. Using pre-trained CNNs has two advantages. First, Q function learning is faster because only the parameters of the Q-network need to be updated. Deep CNNs are simply used as feedforward feature extractors. Second, the feature hierarchy is trained on larger datasets and leverages general discriminative features in this study. It is possible to learn the entire hierarchy of features in the Deep Q-learning framework, and it is assumed that performance can be improved since learned features can be adjusted to be suitable for localization tasks rather than classification. However, this mainly requires larger object detection datasets, so this possibility is left for future research.

#### Training Localization Agents

The parameters of the Q-network are initialized randomly. The agent is then set to interact with the environment over multiple episodes, with each episode presenting a different training image. The policy followed during training is $\epsilon$-greedy, which gradually transitions from exploration to exploitation according to the $\epsilon$ value.

In our study, exploration does not proceed with random actions. Instead, we use a guided exploration strategy that follows the principle of apprenticeship learning based on demonstrations provided by experts to the agent. Since the environment knows the ground truth box and the reward function is calculated based on IoU with the current box, we can identify which actions will give positive and negative rewards. Then, during exploration, the agent can select one random action from the set of positive actions. There may be multiple positive actions for a specific state $s$ since there is no single path to localize objects. Using this strategy, the algorithm terminates in fewer epochs.

The $\epsilon$-greedy training strategy runs for 15 epochs, with each epoch completed after the agent interacts with all training images. During the first 5 epochs, $\epsilon$ linearly decreases from 1.0 to 0.1, allowing the agent to gradually use its own learned model. After the 5th epoch, $\epsilon$ is fixed at 0.1, allowing the agent to adjust model parameters from experiences generated by its own decisions.

#### Testing a Localization Agent

When an agent is trained with the procedure described above, it learns how to pay attention to regions containing objects of the target category. Since the number of objects present in a single image cannot be known in advance, we allow the agent to run for a maximum of 200 steps, evaluating only 200 regions per test image.

At each step, the agent selects to transform the current box or choose a trigger to indicate that an object has been found. When a trigger is used, the search for other objects continues from a new box covering a large part of the image. Object search restarts from the beginning due to two possible events: when the agent uses a trigger, or when 40 steps have elapsed without using a trigger.

#### Evaluation of Precision

As an object detector, the algorithm proposed in this paper can be evaluated in two modes.

-All Attended Regions (AAR): A detector that scores all regions processed by the agent during search episodes. This is useful for considering well-localized regions that the agent did not explicitly mark as detections.

-Terminal Regions (TR): A detector that only considers regions where the agent explicitly used a trigger to indicate the presence of objects.

In both cases, we score attention regions using an external linear SVM trained with the same procedure as R-CNN (including hard-negative mining for region proposals using the VOC2012 training set). This classifier is useful for re-ranking candidate regions when assuming our model generates object proposals. The scores computed by the Q-network are not useful for object detection evaluation since they estimate the values of actions rather than discriminative scores.

Overall, the R-CNN system still shows the best performance and remains a strong baseline. The main disadvantage of R-CNN is that it relies on a large number of object proposals to achieve that performance and requires significant computational power. MultiBox and Regionlets attempt to leverage deep CNNs more efficiently by using only a small number of boxes for prediction or avoiding recalculating features multiple times. The approach in this study also aims to localize objects by paying attention to a small number of regions, which affects performance. However, the results are significantly superior to other baseline methods, reaching 46.1 mAP.

#### Evaluation of Recall

Since all regions that the agent pays attention to can be understood as object proposal candidates, we evaluate them according to the methodology proposed by Hosang et al. Overall, the method used in the study processes a total of 4,000 candidates per image by running for 200 steps per category, reaching 71% recall. This is 10-25 points lower recall than what most methods achieve with a similar number of proposals. However, looking in detail, it is quite excellent for the top 100 candidates per image.

For this evaluation, we score attention regions using Q-values predicted by the agent, and add a large constant only to regions where the agent used a trigger. This prioritizes regions that the agent considers correctly localized objects. Since other methods use estimated objectness scores to rank proposals, and high Q-values can be interpreted in the same way, we use this scoring function instead of classification scores for fairness in evaluation.

---

### Conclusion

In this study, we presented a system that learns how to localize objects in scenes using attention-action strategies. This approach is fundamentally different from previous studies for object detection. This is because it narrows down the precise location of objects through top-down scene analysis. Reinforcement Learning (RL) has proven to be an efficient strategy for learning localization policies. This is a challenging task because objects can be localized along various search paths. Nevertheless, the proposed agent learns from its own mistakes and optimizes policies for finding objects.

Experimental results show that this system can localize a single instance of an object by processing only 11 to 25 regions. This is a very efficient strategy for applications that require a small number of categories. However, to expand to a large number of categories, it needs to be extended in different ways. For example, there are methods to make this category-independent or use hierarchical ontologies to determine refined categories later. Important challenges for improving recall must also be addressed. Future research includes training the system end-to-end instead of using pre-trained CNNs, and using deeper CNN architectures to improve prediction accuracy.

---

### References

[Original Source #1](https://arxiv.org/pdf/1511.06015)

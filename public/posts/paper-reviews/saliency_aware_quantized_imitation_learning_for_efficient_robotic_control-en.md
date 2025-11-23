---
title: 'Saliency-Aware Quantized Imitation Learning for Efficient Robotic Control'
date: '2025-10-10'
tags: ['embodied ai', 'paper review']
---

### Abstract

Deep Neural Network (DNN)-based policy models, such as Vision-Language-Action (VLA) models, excel at automating complex decision-making from multimodal inputs. However, scaling these models significantly increases computational overhead, complicating deployment in resource-constrained environments such as robotic manipulation and autonomous driving.

To address this, we propose Saliency-Aware Quantized Imitation Learning (SQIL), which combines quantization-aware training with a selective loss weighting strategy for mission-critical states.

By identifying these states through saliency scores and emphasizing them in training loss, SQIL preserves decision fidelity even at low bit precision.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/729a9460-f768-406a-938d-28974d7d4788/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

#### Success and Challenges of Deep Neural Network Policy Models

In recent years, Deep Neural Network (DNN)-based policy models have significantly advanced robotic manipulation and autonomous driving, primarily through Imitation Learning (IL) from expert data, surpassing traditional search-based methods. This success has led to growing interest in adopting foundation models for large-scale IL to improve generalization and robustness and facilitate policy transfer across diverse robot embodiments, tasks, or environments. Vision-Language-Action (VLA) models extend pre-trained vision-language models to robotics via next-token prediction, integrating visual and textual information to provide enhanced manipulation capabilities. Despite their potential as foundation models supporting cross-embodiment transfer, IL-based VLA models often suffer from slow inference speeds, high computational costs, and substantial memory usage, making deployment on resource-constrained battery-powered robots challenging.

#### Role of Quantization

Quantization techniques reduce DNN inference costs by converting full-precision FP weights and activations to lower precision, focusing on mitigating numerical errors to preserve accuracy.

Post-Training Quantization (PTQ) adjusts weights and activations to reduce quantization loss, while Quantization-Aware Training (QAT) directly integrates quantization into training to enhance robustness.

#### Impact of Quantization Errors

We investigate how quantization errors affect IL policy decisions and note two key observations. Quantization errors have minimal impact at most time steps, producing small action discrepancies. However, certain critical states experience large deviations in actions due to quantization errors, ultimately causing mission failure.

---

### Related works

#### 1. DNN-Based Policies for Imitation Learning

<img src="https://velog.velcdn.com/images/devjo/post/1fc1d378-6e61-4644-ac38-ebfc3b105d92/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Deep Neural Network (DNN)-based policy models trained through Imitation Learning (IL) have driven significant progress. In simulations such as MuJoCo, DNN models process state vector inputs to control robots in continuous joint spaces, while autonomous driving systems like CILRS learn to predict acceleration and steering from camera images and vectors. They learn by imitating expert behaviors from pre-collected datasets.

#### 2. Quantization for Efficient Policy Inference

Quantization reduces neural network computational and memory requirements by lowering the bit precision of weights or activations, typically applied to input operands of General Matrix Multiplication (GEMM). Since it maps continuous values to discrete states, numerical errors can degrade accuracy.

Despite growing demand for efficient policy inference, most quantization approaches are tailored to Reinforcement Learning (RL), which relies on direct environment interaction unavailable in IL, to mitigate quantization errors.

---

### Methods

#### Saliency-Based State-Importance Scores

Since mission-critical states vary by task and environment, identifying which states require additional attention during imitation learning is non-trivial. Therefore, we quantify State-Importance Scores (SIS) to identify mission-critical states. We argue that states exhibiting large action discrepancies under visual perturbations are mission-critical, as these discrepancies reveal critical visual regions for successful decision-making.

At each location $k$ of a state, we measure perturbation-based action saliency as:

$$
S_{\pi}(s_t, k) = \frac{1}{2} \|\pi(s_t) - \pi(\phi(s_t, k))\|_2^2
$$

where $\phi(s_t, k)$ applies perturbation (Gaussian blur) at location $k$. Higher $S_{\pi}(s_t, k)$ indicates that local modifications at $k$ have a greater impact on the policy's output.

$$
\text{SIS}_{s_t}^{\pi} = E_k [S_{\pi^{\text{FP}}}(s_t, k)]
$$

#### Quantization-Robust Action Distillation

We selectively focus on mission-critical states using state-importance scores. To achieve this, we propose Quantization-Robust Action Distillation (QRD), which reduces quantization errors by distilling the action distribution of the FP policy into the quantized model using the FP policy and demonstration data.

$$
L_{\text{QRD}}(\theta) = \alpha_t \cdot E_{\tau_i \sim D_E} \left[ \frac{1}{|\tau_i|} \sum_{s_t \in \tau_i} D(\pi^Q(s_t), \pi^{\text{FP}}(s_t)) \right]
$$

The loss function of QRD measures the discrepancy between action distributions of the quantized and FP policies. Here, $\alpha_t = \beta$ when $\text{SIS}_{s_t}^{\pi^{\text{FP}}} > T$, and $\alpha_t = 1$ otherwise. $D$ is a discrepancy metric (e.g., L2-norm), and $\pi(s_t)$ is the probability distribution over all possible actions for state $s_t$. The hyperparameter $\beta (> 1)$ applies additional weight to high-importance states, and $T$ is a threshold selecting the top 20% of SIS values.

#### Saliency-Aware Quantized Imitation Learning

We introduce Saliency-Aware Quantized Imitation Learning (SQIL), which selectively reinforces weight adjustments in IL. The loss function of SQIL combines QAT and QRD.

$$
L_{\text{SQIL}}(\theta) = L_{\text{QAT}}(\theta) + L_{\text{QRD}}(\theta)
$$

This combined approach effectively reduces quantization errors, enabling the quantized policy to generalize similarly to the FP policy. While $L_{\text{QAT}}$ maximizes the log-likelihood of expert actions for the quantized policy, $L_{\text{QRD}}$ aligns the action distribution of the quantized policy with the FP policy. By applying selective weights $\alpha_t$, QRD emphasizes states requiring precise control rather than uniformly minimizing discrepancies across all states.

---

### Conclusion

This paper proposes a quantization framework for IL-based models, improving robustness to low bit-precision errors to ensure efficiency on resource-limited hardware.

Evaluations on robotic manipulation and autonomous driving models demonstrate excellent speed improvements and energy savings on real CPUs and GPUs, closely preserving full-precision accuracy and demonstrating real-world deployment potential.

---

### References

[Original Source #1](https://arxiv.org/pdf/2505.15304)

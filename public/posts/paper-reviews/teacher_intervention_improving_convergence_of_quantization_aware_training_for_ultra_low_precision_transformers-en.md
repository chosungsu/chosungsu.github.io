---
title: 'Teacher Intervention: Improving Convergence of Quantization Aware Training for Ultra-Low Precision Transformers'
date: '2025-05-01'
tags: ['ai hardware', 'paper review']
---

### Abstract

Pre-trained transformer models such as BERT have achieved great success in various applications, but at the cost of significant increases in model complexity.

Quantization-Aware Training (QAT) is a promising method to reduce deployment costs and energy consumption. However, aggressive quantization below 2 bits leads to substantial accuracy degradation due to unstable convergence, especially when downstream datasets are not abundant.

This study proposes Teacher Intervention (TI), a novel proactive knowledge distillation method for rapid QAT convergence of ultra-low precision pre-trained transformers.

TI intervenes in layer-wise signal propagation with intact signals from the teacher to eliminate interference from propagated quantization errors, smoothing the loss surface of QAT and facilitating convergence. Furthermore, we propose a gradual intervention mechanism to stabilize recovery of transformer sub-sections from quantization.

---

### Introduction

#### Success of Transformer Models and Efficiency Challenges

Pre-trained transformer-based neural networks have significantly improved performance in diverse AI applications, including natural language processing and computer vision. These models are characterized by autoregressive mechanisms that connect symbols within a sequence to obtain relational representations.

Due to the superior performance of pre-trained transformer models, the demand for efficient deployment is increasing. However, the huge size of these models hinders direct deployment. Even relatively small models like BERT-base contain hundreds of millions of parameters, leading to massive memory and computation overhead on resource-constrained devices with limited memory and compute fabric. Consequently, pioneering research has attempted to reduce this burden through model compression.

#### Challenges of Quantization-Aware Training (QAT)

QAT stands out as a recent success in reducing the computational complexity and memory requirements of transformer models. It trains more accurate quantized models by reflecting quantization errors of stochastic gradient descent during forward computation.

---

### Methods

#### Transformer Layers

A BERT model consists of transformer layers, each containing two main submodules: Multi-Head Attention (MHA) and Feed-Forward Networks (FFN).

Let $\mathbf{X}_l \in \mathbb{R}^{n \times d}$ be the input to the $l$-th transformer layer, where $n$ is the sequence length and $d$ is the hidden size.

To compute MHA, let $H$ be the number of heads and $\mathbf{d}_h = d/H$. The weight parameters $\mathbf{W}_Q^h, \mathbf{W}_K^h, \mathbf{W}_V^h \in \mathbb{R}^{d \times d_h}$ transform $\mathbf{X}_l$ into queries ($\mathbf{Q} = \mathbf{X}_l \mathbf{W}_Q^h$), keys ($\mathbf{K} = \mathbf{X}_l \mathbf{W}_K^h$), and values ($\mathbf{V} = \mathbf{X}_l \mathbf{W}_V^h$). Then the attention scores ($\mathbf{AS}^h = \mathbf{Q}\mathbf{K}^{\top}$), self-attention map ($\mathbf{SA}^h = \text{Softmax}_h(\frac{\mathbf{AS}^h}{\sqrt{d}})$), and attention context ($\mathbf{AC} = \mathbf{SA}^h \mathbf{V}$) can be defined.

The attention output ($\mathbf{AO}$) is defined as

$$
\mathbf{AO} = \text{MHA}(\mathbf{X}_l) = \text{Concat}(\mathbf{AC}_1, \mathbf{AC}_2, \dots \mathbf{AC}_H) \times \mathbf{W}_O
$$

#### Quantization-Aware Training

During fine-tuning of full-precision models, QAT mimics inference-time quantization to adjust parameters to be robust against quantization errors.

Ternary quantization represents all weight parameters with ternary values $t \in \{+1, 0, -1\}$ along with a scaling factor $s$, enabling inference below 2 bits. Due to aggressive bit reduction, ternary quantization causes substantial accuracy loss. Knowledge Distillation (KD) can help compensate for accuracy degradation, where the original full-precision model serves as the teacher guiding the training of the quantized model.

KD is applied to all output activations $\mathbf{X}_{l+1}$ and attention scores (AS) using Mean Squared Error (MSE) loss.

$$
\mathcal{L}_{trm} = \sum_{l=1}^{L+1} \text{MSE}(\mathbf{X}_l^S, \mathbf{X}_l^T) + \sum_{l=1}^{L} \text{MSE}(\mathbf{AS}_l^S, \mathbf{AS}_l^T)
$$

#### Teacher Intervention

<img src="https://velog.velcdn.com/images/devjo/post/4d0581cb-7975-4733-8c0e-f9e06fd0cbc8/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Teacher Intervention is a KD method that aggressively intervenes in the student’s signal propagation along transformer layers to suppress the propagation of quantization errors.

In each transformer layer, we substitute the student’s attention output ($\mathbf{AO}_S$) with the teacher’s attention output ($\mathbf{AO}_T$). In this case, the FFN sublayer is trained under ultra-low precision quantization without worrying about erroneous inputs from the preceding MHA.

Intervention on the self-attention map (TI-M) replaces the student’s SA-GEN output ($\mathbf{SA}_S$) with the teacher’s SA-GEN output ($\mathbf{SA}_T$). TI-O focuses on tuning the FFN sublayer but lacks considerations for self-attention map recovery.

---

### Conclusion

In this study, we proposed Teacher Intervention, a proactive knowledge distillation method to improve the convergence of QAT for ultra-low precision transformers.

The proposed method intervenes in the propagation of quantization errors to suppress accuracy degradation and enhance convergence speed.

While our analysis reveals that quantization error propagation is a major cause of suboptimal convergence in QAT, a deeper investigation into detailed recovery mechanisms from quantization errors would be interesting. Moreover, extending the findings of proactive knowledge distillation to various transformer architectures, including encoder-decoder and decoder-only models, presents a promising future research direction.

---

### 참고 자료

[원본 경로 #1](https://aclanthology.org/2023.eacl-main.64.pdf)

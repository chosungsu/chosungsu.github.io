---
title: 'Automatic Network Adaptation for Ultra-Low Uniform-Precision Quantization'
date: '2025-05-01'
tags: ['ai hardware', 'paper review']
---

### Abstract

Uniform-precision neural network quantization is gaining popularity because it simplifies densely packed arithmetic units for high computing power. However, it ignores heterogeneous sensitivities to quantization errors across layers, leading to suboptimal inference accuracy.

This study proposes a novel neural architecture search called Neural Channel Expansion to adjust network structures and mitigate accuracy degradation caused by ultra-low uniform-precision quantization.

The proposed method selectively expands channels for layers sensitive to quantization while still satisfying hardware constraints such as FLOPs and PARAMs.

---

### Introduction

Deep neural networks (DNNs) have achieved human-level performance across a wide range of domains including image processing, object detection, machine translation, and speech recognition. However, the massive computational and memory costs of these state-of-the-art DNNs make deployment on resource-constrained devices such as mobile phones, edge sensors, and drones difficult. Consequently, several edge hardware accelerators specially optimized for intensive DNN computation have emerged, including Google's Edge TPU and NVIDIA's NVDLA.

#### Quantization of DNNs

One key technology empowering these edge DNN accelerators is quantization of deep neural networks (QDNNs), which reduces the complexity of DNN computation by quantizing network weights and activations to low-bit precision. The area and energy consumption of Multiply-Accumulate (MAC) units can be significantly reduced by decreasing bit width, allowing thousands of them to be packed into a small area. As a result, popular edge DNN accelerators are equipped with densely integrated low-precision MAC arrays to boost performance in computing-intensive operations such as matrix multiplication (MatMul) and convolution (Conv).

#### Uniform-Precision Quantization

Uniform bit allocation does not consider the characteristics of individual layers within a network. It has been shown that the optimal bit precision differs from layer to layer within a neural network. Consequently, uniform-precision quantization can lead to suboptimal inference accuracy for a given network.

#### Mixed-Precision Quantization

Mixed-precision quantization addresses this limitation by optimizing the bit width for each layer. In this approach, a layer’s sensitivity to quantization errors is numerically estimated or automatically explored under a Neural Architecture Search (NAS) framework to allocate bit precision appropriately.

---

### Methods

The goal of Neural Channel Expansion (NCE) is to find a network architecture defined by structural parameters $\mathbf{\alpha = \{\alpha_l\}_{l=1:L}}$ associated with each layer, and a QDNN with uniform $b$-bit precision $\text{N}_Q(b)$ and weights $\mathbf{W}$ that minimize the validation loss $\mathcal{L}_{val}$.

$$
\begin{aligned}
&\mathbf{\alpha}^* = \underset{\mathbf{\alpha}}{\text{argmin}} \mathcal{L}_{val} (\text{N}_{Q{(b)}} (\mathbf{\alpha}, \mathbf{W}_{\mathbf{\alpha}})) \\
&\text{s.t.} \quad \mathbf{W}_{\mathbf{\alpha}} = \underset{\mathbf{W}}{\text{argmin}} \mathcal{L}_{train} (\text{N}_{Q{(b)}} (\mathbf{\alpha}, \mathbf{W})) \\
&\mathcal{L}_{val} = \mathcal{L}_{CE} + \lambda_{flop} \mathcal{L}_{flop} + \lambda_{param} \mathcal{L}_{param}
\end{aligned}
$$

The validation loss incorporates cross-entropy loss as well as losses that account for hardware constraints such as FLOPs and parameters. We solve this optimization problem through dual-level optimization of DNAS.

The output activation $\mathbf{\hat{O}}$ is computed as a weighted sum of sampled activations with different numbers of channels aligned via Channel-Wise Interpolation (CWI).

$$
\mathbf{\hat{O}} = \sum_{j \in \mathcal{I}} \text{Softmax}(\alpha_j ; \{\alpha_k\}_{k \in \mathcal{I}}) \times \text{CWI}(\mathbf{O}_{1:C_j}, \max\{c_k^{out}\}_{k \in \mathcal{I}})
$$

#### NCE: Channel Expansion

In TAS, the number of channels $(|C|)$ is fixed, limiting the search space due to pruning. In NCE, the search parameter associated with the maximum number of channels enables channel expansion for each layer when it exceeds the channel preference threshold $T$.

---

### Conclusion

In this study, we proposed a new approach for exploring neural network structures capable of achieving robust inference accuracy while using simple uniform-precision arithmetic operations.

Neural Channel Expansion, a new differentiable neural architecture search, adopts a search space that can reduce or expand channels.

---

### 참고 자료

[원본 경로 #1](https://arxiv.org/pdf/2212.10878)

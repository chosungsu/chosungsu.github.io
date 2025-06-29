---
title: 'Query based cross modal projector bolstering mamba multimodal llm'
date: '2024-12-12'
tags: ['llm', 'paper review']
---

### Abstract

Quadratic complexity in Transformer due to input length leads to unsustainable computation demands in Large Language Models (LLMs).  
In contrast, Selective Scan Structured State‑Space Model — known as Mamba — effectively addresses these computational challenges.

In this paper, we explore a query‑based cross‑modal projector, designed to enhance Mamba’s efficiency.  
This projector uses cross‑attention to compress visual tokens based on input, and eliminates the need for manually designing the original image features' 2D scan order when converting to Mamba LLM’s input sequence.

---

### Introduction

<img src="https://velog.velcdn.com/images/ski06043/post/f50d60e1-694d-48cc-9aef-5caac866a67f/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

__Multimodal Large Language Models (MLLMs)__

MLLMs fuse visual information with text to leverage text‑based LLMs’ strengths in language generation and logical reasoning.  
This integration shows significant potential in solving real‑world vision‑language tasks like VQA and multimodal dialogue response generation.

__Limitations of Transformer-based MLLMs__

Transformer’s self‑attention bottleneck causes quadratic increases in compute and memory as input length grows.  
Although context window expansion techniques exist, computational burden remains a challenge.

---

### Mamba Architecture

State‑Space Models (SSMs) combine the strengths of CNNs and RNNs to enable parallel training and fast inference.  
The state-of-the-art SSM-based model, Mamba, features:

- Input‑dependent gating for selective scanning  
- Hardware‑aware algorithms for optimized computation  
- Competitive or superior performance compared to Transformer models, with faster training and inference

However, methods for aligning visual inputs with text in Mamba‑based MLLMs are still underexplored.  
We propose a novel cross‑modal projector for Mamba to address this gap.

---

### Related Works

__1.State‑Space Models and Mamba__  

- Architectures like LSSL, S4, S4D, and H3 progressively improved long‑range dependency modeling using SSMs.  
- Mamba incorporates input‑dependent gating and overcomes limitations of prior SSMs.

__2.Multimodal Large Language Models__  

- Cobra, VL‑Mamba, and others use SSMs for vision tasks, but they generally rely on fixed token counts and manual scan mechanisms.

---

### Method

__1.Preliminaries__ 
- SSMs map continuous functions $x(t)$ to outputs $y(t)$ via hidden states $h(t)$.  
- Discretization adapts the continuous system to sequence data; Mamba dynamically adjusts SSM parameters (A, B, C, $delta$) at each time step.

__2.Cross‑Modal Mamba Projector (Q‑Mamba)__

<img src="https://velog.velcdn.com/images/ski06043/post/024f3e4e-f4a7-46a4-83a7-620e87a00522/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Q‑Mamba consists of:

- Mamba Layer: sequence mixer enabling causal compatibility  
- Cross‑Attention Layer: facilitates interaction among visual features  
- FFN: channel mixing module  

This design supports scan-order independence, flexible query sequence lengths, and resembles Transformer Q‑Former.

__3.MLLM Training Strategy__

- Adopt a two-stage training strategy (inspired by LLaVA):  
  - Alignment stage – Align LLM using visual instruction-following datasets  
  - Fine‑tuning stage – Train the projector and the LLM end‑to‑end

---

### Causal Discovery with PLM

<img src="https://velog.velcdn.com/images/ski06043/post/94900903-6d4f-4e68-853a-029ca30b1053/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

A PLM‑based causal inference framework leveraging prior knowledge $K$
- Prompt-based causal extraction → pairwise relation aggregation → creation of prior $K$
- Graph initialization, regularization, and boundary setting lead to a final binary adjacency matrix

---

### References

[Original Path #1](https://aclanthology.org/2024.findings-emnlp.827/)

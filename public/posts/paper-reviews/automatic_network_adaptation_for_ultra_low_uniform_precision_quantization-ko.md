---
title: 'Automatic Network Adaptation for Ultra-Low Uniform-Precision Quantization'
date: '2025-05-01'
tags: ['ai hardware', 'paper review']
---

### Abstract

균일 정밀도 신경망 양자화 (Uniform-precision neural network quantization)는 높은 컴퓨팅 능력을 위해 조밀하게 패킹된 산술 장치를 단순화하기 때문에 인기를 얻고 있습니다. 그러나 이는 레이어 전반에 걸친 양자화 오류의 영향에 대한 이질적인 민감도를 무시하여 차선책인 추론 정확도를 초래합니다.

본 연구는 초저 (ultra-low) 균일 정밀도 양자화로 인한 정확도 저하를 완화하기 위해 네트워크 구조를 조정하는 신경 채널 확장 (neural channel expansion)이라는 새로운 신경 구조 탐색 (neural architecture search)을 제안합니다.

제안된 방법은 하드웨어 제약 조건 (예: FLOPs, PARAMs)을 만족시키면서 양자화에 민감한 레이어에 대해 선택적으로 채널을 확장합니다.

---

### Introduction

심층 신경망 (DNNs)은 이미지 처리, 객체 탐지, 기계 번역, 음성 인식을 포함한 광범위한 영역에서 인간 수준의 성능에 도달했습니다. 그러나 이러한 최첨단 DNN의 막대한 계산 및 메모리 비용은 모바일 폰, 엣지 센서, 드론과 같은 자원 제약 장치에 배포하는 것을 어렵게 만듭니다. 따라서 집약적인 DNN 계산에 특별히 최적화된 여러 엣지 하드웨어 가속기가 등장했으며, 여기에는 Google의 엣지 TPU 및 NVIDIA의 NVDLA가 포함됩니다.

#### Quantization of DNN

이러한 엣지 DNN 가속기를 혁신하는 중심 기술 중 하나는 심층 신경망의 양자화 (QDNN)입니다. 이는 네트워크 가중치와 활성화를 저비트 정밀도로 양자화하여 DNN 계산의 복잡성을 줄입니다. 곱셈-누산 (MAC) 유닛의 면적과 에너지 소비는 비트 너비 감소로 크게 줄어들 수 있기 때문에, 수천 개를 작은 영역에 패킹할 수 있습니다. 따라서 인기 있는 엣지 DNN 가속기는 행렬 곱셈 (MatMul) 및 합성곱 (Conv)과 같은 컴퓨팅 집약적인 연산에서 성능을 향상시키기 위해 조밀하게 통합된 저정밀도 MAC 배열을 갖추고 있습니다.

#### Uniform-precision Quantization

균일한 비트 할당은 네트워크 내 개별 레이어의 속성을 고려하지 않습니다. 최적의 비트 정밀도가 신경망 내에서 레이어마다 다르다는 것을 보여줍니다. 결과적으로, 균일 정밀도 양자화는 주어진 네트워크에 대해 차선책인 추론 정확도를 초래할 수 있습니다.

#### Mixed-precision Quantization

혼합 정밀도 양자화는 각 레이어에 대한 비트 너비를 최적화하여 이 제한점을 해결합니다. 이 접근 방식에서, 양자화 오류에 대한 레이어의 민감도는 수치적으로 추정되거나 신경 구조 탐색 (NAS)의 프레임워크 하에서 자동으로 탐색되어 비트 정밀도를 적절하게 할당합니다.

---

### Methods

신경 채널 확장(NCE)의 목표는 균일 $b$ 비트 정밀도 $\text{N}_Q(b)$를 가진 QDNN과 가중치 $\mathbf{W}$의 검증 손실 $\mathcal{L}_{val}$을 최소화하는 각 레이어와 연관된 구조 매개변수 $\mathbf{\alpha = \{\alpha_l\}_{l=1:L}}$로 정의된 네트워크 구조를 찾는 것입니다.

$$
\begin{aligned}
&\mathbf{\alpha}^* = \underset{\mathbf{\alpha}}{\text{argmin}} \mathcal{L}_{val} (\text{N}_{Q{(b)}} (\mathbf{\alpha}, \mathbf{W}_{\mathbf{\alpha}})) \\
&\text{s.t.} \quad \mathbf{W}_{\mathbf{\alpha}} = \underset{\mathbf{W}}{\text{argmin}} \mathcal{L}_{train} (\text{N}_{Q{(b)}} (\mathbf{\alpha}, \mathbf{W})) \\
&\mathcal{L}_{val} = \mathcal{L}_{CE} + \lambda_{flop} \mathcal{L}_{flop} + \lambda_{param} \mathcal{L}_{param}
\end{aligned}
$$

검증 손실은 교차 엔트로피 손실뿐만 아니라 하드웨어 제약 조건 (FLOPs, PARAMs)을 고려한 손실로 구성됩니다. DNAS의 이중 수준 최적화를 통해 이 최적화 문제를 해결합니다.

출력 활성화 $\mathbf{\hat{O}}$는 채널별 보간(CWI, Channel wise Interpolation)을 통해 정렬된 다른 수의 채널을 가진 샘플링된 활성화의 가중 합으로 계산됩니다.

$$
\mathbf{\hat{O}} = \sum_{j \in \mathcal{I}} \text{Softmax}(\alpha_j ; \{\alpha_k\}_{k \in \mathcal{I}}) \times \text{CWI}(\mathbf{O}_{1:C_j}, \max\{c_k^{out}\}_{k \in \mathcal{I}})
$$

#### NCE : 채널 확장

TAS에서 채널 수 $(|C|)$는 고정되어 탐색 범위를 가지치기로 제한합니다. NCE에서는 최대 채널 수와 연관된 탐색 매개변수가 채널 선호 임계값 $T$를 초과할 때 개별 레이어의 채널 확장을 활성화합니다.

---

### Conclusion

본 연구에서 단순한 균일 정밀도 산술 연산을 사용하면서도 강건한 추론 정확도를 달성하기 위해 신경망 구조를 탐색하는 새로운 접근 방식을 제안합니다.

신경 채널 확장이라고 불리는 새로운 미분 가능한 신경 구조 탐색은 채널을 줄이거나 확장할 수 있는 탐색 공간을 채택합니다.

---

### 참고 자료

[원본 경로 #1](https://arxiv.org/pdf/2212.10878)

---
title: 'ClearGrasp: 3D Shape Estimation of Transparent Objects for Manipulation'
date: '2025-04-09'
tags: ['computer vision', 'paper review']
---

### Abstract

단 몇 개의 주석이 달린 샘플만으로 새로운 객체를 탐지하는 것을 목표로 하는 소수 샷 객체 탐지(Few-Shot Object Detection, FSOD)는 비약적인 발전을 거듭해 왔습니다. 그러나 기존의 연구들은 기존 방법들을 최적화하기 위한 기울기 전파(gradient propagation) 관점에는 거의 주의를 기울이지 않았으며, 이로 인해 기울기 전파 과정에서 새로운 객체에 대한 정보를 충분히 활용하지 못하는 한계가 있었습니다.

본 논문에서는 2단계 미세 조정(two-stage fine-tuning)을 기반으로 다중 제약 조건 도메인 적응 모듈을 통해 기울기의 확산을 촉진하여 학습 효율을 높이고 분류 증진 네트워크로 객체 분류 성능을 향상하며 다중 경로 마스크 헤드로는 RoI 특징을 풍부하게 하여 객체 탐지의 정밀도를 높입니다. 제안된 모델은 이전 방법들과 비교하여 성능을 1~5% 정도 유의미하게 향상시켰습니다.

---

### Introduction

객체 탐지는 철도 교통, 질병 탐지, 번호판 인식 등 많은 복잡한 장면에서 핵심 기술로 자리 잡았습니다. 딥러닝 기술 덕분에 모델 성능이 크게 향상되었지만 여전히 좋은 성능을 유지하기 위해서는 대규모 데이터셋이 필요합니다. 그러나 실제 공학 현장에서는 이러한 데이터를 얻는 것이 쉽지 않습니다. 인간은 단 한두 번의 시각적 경험만으로도 새로운 개념을 학습할 수 있습니다. 이처럼 데이터가 희박하거나 주석 작업이 힘든 대상을 새로운 객체(novel objects)라고 부르며 이를 탐지하는 기술을 소수 샷 객체 탐지(FSOD)라고 합니다.

기존의 메타 학습, 메트릭 학습, 전이 학습 기반 방법들은 효율적인 gradient 최적화를 활용하지 못하였고 분류 및 회귀 단계에 ROI 특징이 강화되지 않았거나 클래스를 오분류하는 문제가 심각하다는 한계가 있습니다.

---

### Methods

#### Problem Statement

<img src="https://velog.velcdn.com/images/devjo/post/b90109e5-e6ff-4d82-9093-de1142c0d90d/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

데이터셋은 풍부한 주석이 있는 베이스 카테고리($C_{base}$)와 샘플이 매우 적은 새로운 카테고리($C_{novel}$)로 나뉩니다. $C_{base}$ 데이터를 사용하여 Faster R-CNN의 백본과 박스 예측기를 학습합니다. 베이스와 새로운 인스턴스가 포함된 균형 잡힌 데이터셋을 사용하여 모델을 전이 학습합니다.

#### Multi constraint terms domain adaptation

기존의 GDL은 RCNN과 RPN 사이에서 단순한 기울기 강하를 수행합니다. 하지만 더 빠르고 효율적인 기울기 업데이트를 위한 개선 여지가 있습니다. 다중 제약 항은 기울기 지연으로 인한 정확도 저하를 완화하기 위해 제안합니다. 가중치 행렬을 $M$, 가중치의 방향을 $M' = \frac{M}{\|M\|_2^2}$라고 할 때, 역전파(BP) 과정은 다음과 같이 정의됩니다.

$$
\begin{aligned}
M_{i+1} = M_i - \alpha \frac{\partial L}{\partial M_i} - \beta \frac{M_i}{\|M_i\|_2^2} \\
- \eta \left\langle \frac{\partial L}{\partial M_i}, \frac{M_i}{\|M_i\|_2^2} \right\rangle \cdot \frac{M_i}{\|M_i\|_2^2}
\end{aligned}
$$

얕은 계층의 기울기는 증폭하여 도메인 불변 방향으로 조정하고 깊은 계층의 기울기는 억제하여 semantic 정보에 집중합니다.

#### Classification promotion network

기존의 RoIAlign은 특징 맵을 정규화하는 과정에서 스케일 정보를 손실할 수 있습니다. CPN은 이를 보완하여 분류 점수를 정교화합니다. 각 클래스 $c$의 객체 특징 평균을 구합니다.

$$
P_c = \frac{\sum_{x_i \in S_c} x_i}{|S_c|}
$$

기존 분류기 점수 $s_i$와 프로토타입과의 코사인 유사도 점수 $s_{pair}$를 융합합니다.

$$
s_{prom} = \lambda \cdot s_i + (1 - \lambda) \cdot s_{pair}
$$

#### Multi path mask head

<img src="https://velog.velcdn.com/images/devjo/post/23813345-0ee5-4a41-9a89-274f1cb4d056/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

소수 샷 객체에 대한 특징 추출을 강화하기 위해 RoI 풀링 계층 이후에 다중 경로 마스크 헤드를 추가합니다. 세부 재구성 네트워크로는 jump connection과 up/down sampling을 사용하여 내부 정보를 풍부하게 합니다. 음수 정보 손실을 방지하기 위해 leakyrelu를 사용합니다.

$$
\text{Loss} = L_{cls} + L_{reg} + \mu \cdot L_{mask}
$$

여기서 $L_{mask}$는 클래스 간 경쟁 문제를 해결하기 위해 평균 이진 교차 엔트로피(BCEloss)를 사용합니다.

---

### Conclusion

본 논문은 기울기 최적화와 다중 경로 강화를 통한 FSOD 접근 방식을 제안하였습니다. RoI 계층에서 나오는 정보를 최적화하기 위해 다중 경로 데이터 강화 네트워크를 설계했습니다. 이는 기존의 단순한 특징 추출 방식에서 벗어나 객체의 세부 정보를 더 풍부하게 복원하는 역할을 합니다. 성능을 한 단계 더 높이기 위해 기울기 업데이트 과정에 제약 항을 추가하였습니다.

---

### 참고 자료

[원본 경로 #1](https://link.springer.com/content/pdf/10.1007/s11063-025-11727-z.pdf)

---
title: 'Teacher Intervention: Improving Convergence of Quantization Aware Training for Ultra-Low Precision Transformers'
date: '2025-05-01'
tags: ['ai hardware', 'paper review']
---

### Abstract

BERT와 같은 사전 훈련된 트랜스포머 모델은 다양한 응용 분야에서 큰 성공을 거두었지만, 상당한 모델 복잡도 증가라는 대가를 치렀습니다.

양자화 인식 훈련 (Quantization-Aware Training, QAT)은 구현 비용과 에너지 소비를 낮추는 유망한 방법입니다. 그러나 2비트 미만의 공격적인 양자화는 불안정한 수렴으로 인해 상당한 정확도 저하를 야기하며, 특히 다운스트림 데이터셋이 풍부하지 않을 때 더욱 그렇습니다.

본 연구는 초저 정밀도 사전 훈련된 트랜스포머의 빠른 QAT 수렴을 위한 교사 개입 (Teacher Intervention, TI)이라는 새로운 능동적 지식 증류 (proactive knowledge distillation) 방법을 제안합니다.

TI는 전파된 양자화 오류의 간섭을 제거하기 위해 교사로부터의 손상되지 않은 신호로 레이어별 신호 전파에 개입하여, QAT의 손실 표면을 평활화하고 수렴을 촉진합니다. 나아가, 양자화로부터 트랜스포머 레이어의 하위 섹션의 복구를 안정화하기 위한 점진적 개입 메커니즘 (radual intervention mechanism)을 제안합니다.

---

### Introduction

#### 트랜스포머 모델의 성공과 효율성 문제

트랜스포머 기반의 사전 훈련된 신경망은 자연어 처리 및 컴퓨터 비전을 포함한 다양한 인공지능 응용 분야의 성능을 크게 향상시켰습니다. 이러한 모델은 자기 회귀 메커니즘으로 대표되며 시퀀스 내의 다른 기호를 연결하여 관계형 표현을 얻습니다.

사전 훈련된 트랜스포머 모델의 뛰어난 성능 덕분에 효율적인 배포에 대한 요구가 증가하고 있습니다. 그러나 사전 훈련된 트랜스포머 모델의 거대한 크기는 직접적인 구현을 방해합니다. 비교적 작은 모델인 BERT-base조차도 수억 개의 매개변수를 포함하여, 제한된 메모리와 컴퓨팅 패브릭을 가진 자원 제약 장치에 막대한 메모리 및 계산 오버헤드를 발생시킵니다. 따라서 선구적인 연구 노력은 모델 압축을 통해 이 부담을 줄이려고 시도했습니다.

#### 양자화 인식 훈련 (QAT)의 과제

QAT는 트랜스포머 모델의 계산 복잡성과 메모리 요구 사항을 줄이는 최근의 성공으로 두드러집니다. 순방향 계산 동안 확률적 경사 하강법의 양자화 오류를 반영하여 더 정확한 양자화 모델을 훈련합니다.

---

### Methods

#### 트랜스포머 레이어

BERT 모델은 트랜스포머 레이어로 구성되며, 여기에는 멀티 헤드 어텐션(MHA)과 피드 포워드 네트워크(FFN)로 두 가지 주요 하위 모듈이 포함됩니다.

$l$번째 트랜스포머 레이어의 입력은 $\mathbf{X}_l \in \mathbb{R}^{n \times d}$이며, 여기서 $n$은 시퀀스 길이이고 $d$는 은닉 상태 크기입니다.

MHA를 계산하면 우선 헤드 수를 $H$라고 하고 $\mathbf{d}_h = d/H$라고 합시다. $\mathbf{W}_Q^h, \mathbf{W}_K^h, \mathbf{W}_V^h \in \mathbb{R}^{d \times d_h}$는 $\mathbf{X}_l$을 쿼리 ($\mathbf{Q} = \mathbf{X}_l \mathbf{W}_Q^h$), 키 ($\mathbf{K} = \mathbf{X}_l \mathbf{W}_K^h$) 및 값 ($\mathbf{V} = \mathbf{X}_l \mathbf{W}_V^h$)으로 변환하는 가중치 매개변수입니다. 그런 다음, 어텐션 점수 ($\mathbf{AS}^h = \mathbf{Q}\mathbf{K}^{\top}$), 자기 회귀 맵 ($\mathbf{SA}^h = \text{Softmax}_h(\frac{\mathbf{AS}^h}{\sqrt{d}})$) 및 어텐션 컨텍스트 ($\mathbf{AC} = \mathbf{SA}^h \mathbf{V}$)가 정의될 수 있습니다.

어텐션 출력 ($\mathbf{AO}$)은 다음과 같이 정의됩니다.

$$
\mathbf{AO} = \text{MHA}(\mathbf{X}_l) = \text{Concat}(\mathbf{AC}_1, \mathbf{AC}_2, \dots \mathbf{AC}_H) \times \mathbf{W}_O
$$

#### 양자화 인식 훈련

전체 정밀도 모델의 미세 조정 동안 추론 시간 양자화를 모방하여 매개변수를 양자화 오류에 강건하도록 조정합니다.

삼진 양자화(Ternary Quantization)은 모든 가중치 매개변수를 스케일 계수 $s$와 함께 $t \in \{+1, 0, -1\}$의 삼진 값으로 나타내어 2비트 미만 추론을 가능하게 합니다. 공격적인 비트 감소로 인해 삼진 양자화는 상당한 정확도 손실을 야기합니다. KD는 정확도 저하를 보상하는 데 도움이 될 수 있으며, 여기서 원래 전체 정밀도 모델은 양자화된 모델을 훈련하는 것을 지도하는 교사로 작동합니다.

모든 출력 활성화 $\mathbf{X}_{l+1}$과 어텐션 점수 (AS)에 KD를 적용하며, 평균 제곱 오차 (MSE) 손실을 사용합니다.

$$
\mathcal{L}_{trm} = \sum_{l=1}^{L+1} \text{MSE}(\mathbf{X}_l^S, \mathbf{X}_l^T) + \sum_{l=1}^{L} \text{MSE}(\mathbf{AS}_l^S, \mathbf{AS}_l^T)
$$

#### 교사 개입

<img src="https://velog.velcdn.com/images/devjo/post/4d0581cb-7975-4733-8c0e-f9e06fd0cbc8/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

교사 개입은 양자화 오류의 전파를 억제하기 위해 트랜스포머 레이어를 따라 학생의 신호 전파에 공격적으로 개입하는 KD 방법입니다.

각 트랜스포머 레이어에서 학생의 어텐션 출력 ($\mathbf{AO}_S$)을 교사의 어텐션 출력 ($\mathbf{AO}_T$)으로 대체합니다. 이 경우, FFN 하위 레이어는 선행 MHA로부터의 오류 있는 입력에 대한 걱정 없이 초저 정밀도 양자화로 훈련됩니다.

자기 회귀 맵에 대한 개입(TI-M)은 학생의 SA-GEN 출력 ($\mathbf{SA}_S$)을 교사의 SA-GEN 출력 ($\mathbf{SA}_T$)으로 대체합니다. TI-O는 FFN 하위 레이어 튜닝에 집중하지만, 자기 회귀 맵 복구에 대한 고려가 부족합니다.

---

### Conclusion

본 연구에서 초저 정밀도 트랜스포머의 $\text{QAT}$ 수렴을 향상시키기 위한 교사 개입이라는 능동적 지식 증류 방법을 제안했습니다.

제안된 방법은 양자화 오류의 전파에 개입하여 정확도 저하를 억제하고 수렴 속도를 향상시킵니다.

본 연구의 분석은 양자화 오류 전파가 QAT의 차선책 수렴의 주요 원인 중 하나임을 밝히지만, 양자화 오류로부터 상세한 복구 메커니즘에 대한 더 심층적인 조사는 흥미로울 것입니다. 또한, 능동적 지식 증류의 발견을 인코더-디코더 및 디코더 전용 모델을 포함한 다양한 트랜스포머 구조로 확장하는 것도 유망한 향후 연구 방향이 될 것입니다.

---

### 참고 자료

[원본 경로 #1](https://aclanthology.org/2023.eacl-main.64.pdf)

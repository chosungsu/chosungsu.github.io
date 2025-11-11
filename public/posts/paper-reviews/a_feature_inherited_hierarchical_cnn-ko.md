---
title: 'A Feature Inherited Hierarchical Convolutional Neural Network (FI‑HCNN) for Motor Fault Severity Estimation Using Stator Current Signals'
date: '2025-09-18'
tags: ['fault diagnosis', 'paper review']
---

### Abstract

모터는 제조 분야에서 가장 널리 사용되는 기계 중 하나로, 정밀 가공에서 핵심적인 역할을 담당합니다. 따라서 제품의 품질에 영향을 미치는 모터의 건전성 상태를 정확하게 추정하는 것이 중요합니다.

본 논문에서 개괄된 연구는 새로운 딥러닝 방법인 특징 계승 계층적 컨볼루션 신경망 (FI-HCNN, Feature Inherited Hierarchical Convolutional Neural Network)을 제안하여 모터 고장 심각도 추정의 정확도를 향상시키는 것을 목표로 합니다.

FI-HCNN은 고장 진단 부분과 심각도 추정 부분으로 구성되며, 이들은 계층적으로 배열되어 있습니다. 제안된 FI-HCNN의 주요 독창성은 계층 구조 사이의 특별한 계승 구조에 있습니다. 즉, 심각도 추정 부분이 고장 진단 작업에서 고장 관련 표현을 활용하기 위해 잠재 특징 (latent features)을 사용한다는 점입니다.

FI-HCNN은 수준별 추상화가 잠재 특징에 의해 지원되므로 고장 심각도 추정의 정확도를 향상시킬 수 있습니다. 또한, FI-HCNN은 일반적으로 제어 목적으로 획득되는 고정자 전류 신호를 기반으로 개발되었기 때문에 실제 적용이 용이합니다.

---

### Introduction

모터는 낮은 비용과 높은 신뢰성 덕분에 회전력을 필요로 하는 제조 응용 분야에 널리 사용됩니다. 높은 신뢰성에도 불구하고, 모터는 사용 중 손상 및 환경 조건과 같은 예상치 못한 스트레스에 노출되어 기계적 및 전기적 고장을 겪습니다. 모터의 성능 저하는 제품 품질의 저하로 이어질 수 있으므로, 모터 상태를 진단하고 고장 심각도 (SE, Severity Estimation)를 평가하는 것이 매우 중요합니다.

이러한 문제를 해결하기 위해, 구현 용이성 때문에 모터 전류 신호 분석 (MCSA, Motor Current Signature Analysis)이 고장 진단 (FD, Fault Diagnosis) 및 심각도 추정을 위해 연구되어 왔습니다. FD 및 SE를 위한 대부분의 MCSA 기술은 일반적으로 도메인 지식을 기반으로 개발되었으며, 물리 기반 접근 방식과 데이터 기반 접근 방식으로 분류될 수 있습니다.

이 중 Data-driven MCSA에 대한 연구는 고장 민감 특징을 추출하고 적절한 학습 방법을 적용하기 위해 노력합니다. 유전 알고리즘, 서포트 벡터 머신, 인공 신경망과 같은 여러 인공지능 방법이 수동 특징을 학습하기 위해 적용되었습니다. 이러한 방법은 모터별 전문 지식을 요구하지 않지만, 의미 있는 수작업 특징을 생성하기 위해 복잡한 신호 처리 기술이 필요합니다.

#### 딥러닝 기반 접근 방식 및 제안 모델

가장 효과적인 DL 모델 중 하나로 알려진 컨볼루션 신경망 (CNN, Convolutional Neural Network) 접근 방식은 베어링 및 기어박스와 같은 회전 시스템을 위한 진동 신호에서 강력한 성능을 보여주었습니다. 모터의 경우, 몇몇 이전 연구들은 주로 진동 신호를 사용하여 CNN 모델 훈련을 위한 효율적인 입력 데이터를 고안하는 데 중점을 두었습니다. 그러나 고정자 전류 신호에 대한 연구는 상대적으로 적습니다. 예를 들어, Ince et al.은 모터 베어링 케이지 고장을 감지하기 위해 1차원 (1-D) CNN 아키텍처를 사용했습니다. 또는 SincNet이 파손된 회전자 바 및 베어링 고장을 포함한 다중 고장을 분류하기 위해 채택되었습니다.

본 논문에서는 고정자 전류 신호를 사용한 기계적 모터 고장을 위한 DL 기반 SE 방법을 제안합니다. 우리는 이 새로운 방법을 특징 계승 계층적 CNN (FI-HCNN, Feature Inherited Hierarchical CNN)이라고 부릅니다. 제안된 모델의 구조는 FD 수행 후 SE를 수행하는 흐름을 따르는 계층적 CNN (HCNN, Hierarchical CNN)을 사용하며, 새로운 연결 아키텍처를 통해 성능을 향상시킵니다. FI-HCNN의 각 모듈은 FD 모듈에서 공식화된 표현인 잠재 특징 (latent features)으로부터 특정 고장 모드의 수준 특성을 학습합니다.

---

### Methods

#### Feature Inheritance Architecture

<img src="https://velog.velcdn.com/images/devjo/post/fea27f1b-1657-4179-b62b-d570a39236a7/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

계층적 네트워크를 기계 건전성 모니터링에 적용할 때, 부모 모듈은 FD에, 자식 모듈은 각 고장 모드에 대한 SE에 매칭될 수 있습니다. 이 모듈들ㄹ이 배치될 때, 각각 두 가지 다른 목적을 반영합니다. 특정 고장 모드를 분류하고 그 심각도를 추정하는 것입니다.

일반적인 계층적 아키텍처와 달리, 제안된 FI-HCNN은 FD로부터 잠재 특징 ($\hat{\mathbf{t}}$)을 SE 모듈로 전달합니다. 이 개념을 특징 계승 (feature inheritance)이라고 합니다.

입력 데이터는 FD 모듈에서 특정 고장 모드 ($\mathcal{C}_k$)에 대한 풍부한 특성을 포함하는 학습된 표현으로 발전합니다. 이러한 표현을 $\hat{\mathbf{t}}$라고 합니다. $\hat{\mathbf{t}}$는 $\mathcal{C}_k$의 SE 모듈의 입력으로 사용되며 심각도 ($\mathcal{S}_{\mathcal{C}_k}$)에 회귀되도록 학습됩니다.

#### A Hierarchical Structure

<img src="https://velog.velcdn.com/images/devjo/post/2eb18ed0-e677-4595-a78c-f06b6412af33/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

제안된 FI-HCNN 방법은 세 부분으로 구성됩니다.

(1) 전처리에서는 계층적 네트워크가 학습을 시작하기 전에, 원시 전류 신호에 대해 4단계의 전처리 (재샘플링, 증강, 정규화, 스케일링)가 실행됩니다. 재샘플링으로 모든 데이터가 동일한 작동 조건에서 동일한 양의 정보를 갖도록 보간을 통해 조정됩니다. 이는 각 데이터 단위가 회전당 동일한 지점을 갖도록 합니다. 데이터 증강으로 1회전의 데이터 양을 오버랩하여 수행됩니다. 전류 신호의 주기적 특성을 보존하는 이 증강은 성능에 긍정적인 영향을 미칠 뿐만 아니라, 모델의 필터가 관련 특징을 학습하는 데 도움을 줄 수 있습니다.

(2) 고장 진단에서는 세 개의 컨볼루션 계층, 최대 풀링 계층, 그리고 하나의 FC 계층으로 구성됩니다.

$$
\mathcal{L}_{\text{FD}}(\mathbf{x}; \mathbf{W}_{\text{FD}}) = \text{Loss}_{\text{CE}}(p(\mathcal{C}|\mathbf{x}), \mathbf{y}) + \beta_1 \left\| \mathbf{W}_{\text{FD}} \right\|_2^2
$$

여기서 $\beta_1$은 $\text{L}_2$ 정규화의 계수이며, FD 모듈이 이산 분류 문제를 다루기 때문에 손실은 교차 엔트로피 (cross-entropy)를 통해 계산됩니다. 풀링 계층을 통과하면서 특징의 차원은 감소하지만, 계층이 깊어짐에 따라 필터가 증가하여 특징의 수는 증가합니다. 또한, 0 이하의 정보가 보존되도록 ELU 활성화 함수가 모든 컨볼루션 계층에서 사용되며, 이는 다음과 같이 정의됩니다.

$$
f_{\text{ELU}}(x) = \begin{cases} x & \text{if } x > 0 \\ \alpha (e^x - 1) & \text{if } x \le 0 \end{cases}
$$

(3) 심각도 추정에서는 두 개의 컨볼루션 계층, 그 다음 최대 풀링 계층, 그리고 하나의 FC 계층으로 구성됩니다. SE 모듈의 두 컨볼루션 계층은 선행 FD 모듈보다 더 많은 수의 필터를 가지며, 고장 심각도와 관련된 더 정교한 특징을 추출합니다. 이 정교한 특징은 평탄화되어 FC 계층으로 계산된 다음 고장 심각도를 결정하기 위해 회귀됩니다.

$$
\mathcal{L}_{\text{SE}}(\hat{\mathbf{t}}; \mathbf{W}_{\text{SE}}) = \text{Loss}_{\text{MSE}}(f_2(\hat{\mathbf{t}}, \mathbf{W}_{\text{SE}}), \mathcal{S}) + \beta_2 \left\| \mathbf{W}_{\text{SE}} \right\|_2^2
$$

$f_2$는 잠재 특징 $\hat{\mathbf{t}}$와 SE 모듈의 $\mathbf{W}_{\text{SE}}$로부터 계산된 추정 심각도입니다. 고장 심각도는 연속적인 변수이므로, 손실은 평균 제곱 오차로 계산됩니다.

---

### Conclusion

본 연구에서는 유도 모터의 고장을 식별하고 고장 심각도를 계산하기 위한 새로운 방법인 FI-HCNN이 제안되었습니다. 이 모델은 고장 유형을 학습할 수 있는 모듈과 그 심각도를 추정할 수 있는 모듈로 이어지도록 계층적으로 구성되었습니다. 제안된 방법에서는 고장 모드의 표현을 포함하는 잠재 특징이 FD 모듈에서 SE 모듈로 전파되어 심각도 학습을 지원하기 때문에, 기존 방법과 비교하여 고장 심각도가 더 정확하게 추정되었습니다.

실험 연구를 통해 FI-HCNN은 상당한 도메인 지식 없이도 고장 심각도의 정확한 추정에 더 적합한 향상된 특징을 제공하는 것으로 입증되었습니다.

---

### 참고 자료

[원본 경로 #1](https://link.springer.com/content/pdf/10.1007/s40684-020-00279-3.pdf)

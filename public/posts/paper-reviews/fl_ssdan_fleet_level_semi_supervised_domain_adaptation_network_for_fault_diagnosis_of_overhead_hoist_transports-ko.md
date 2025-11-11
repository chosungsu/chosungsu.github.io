---
title: 'FL-SSDAN: Fleet-level semi-supervised domain adaptation network for fault diagnosis of overhead hoist transports'
date: '2025-09-14'
tags: ['fault diagnosis', 'paper review']
---

### Abstract

오버헤드 호이스트 트랜스포트 (OHT, Overhead Hoist Transports)의 고장 진단은 반도체 제조에서 매우 중요합니다. OHT 고장은 긴밀하게 동기화된 공정 간의 웨이퍼 이송을 중단시켜 상당한 가동 중지 시간과 잠재적인 웨이퍼 손상을 초래할 수 있기 때문입니다. 그러나, 전체 OHT 차량에 실제로 적용 가능한 고장 진단 프레임워크를 개발하는 것은 개별 장치 간의 토크 신호의 상당한 가변성, 레이블이 지정된 데이터의 제한된 가용성, 그리고 현장 의사 결정을 지원하기 위한 해석 가능성의 필요성으로 인해 어렵습니다.

이러한 문제를 해결하기 위해, 본 논문은 강건하고 해석 가능한 OHT 고장 진단을 가능하게 하는 플릿 수준 반지도 도메인 적응 네트워크 (fleet-level semi-supervised domain adaptation network)라는 새로운 접근 방식을 제안합니다. 제안된 방법은 반지도 도메인 적응 전략을 사용하여 장치 간의 도메인 불일치 (domain discrepancies)를 완화하고, 레이블이 없는 데이터와 레이블이 있는 데이터를 모두 사용하여 진단 성능을 향상시킵니다.

또한, 이 방법은 전방 및 후방 모터의 듀얼 모터 토크 신호를 물리적으로 의미 있는 신호로 처리하고 다중 헤드 CNN구조를 사용하여 특징을 추출합니다. 특징 가중 모듈 (feature-weighting module)이 통합되어 정보가 풍부한 특징을 동적으로 강조하며, 이는 진단 성능을 향상시킬 뿐만 아니라 진단 과정의 해석 가능성도 개선합니다.

이 방법의 검증은 실제 다중 반도체 제조 라인에서 작동 중인 OHT 장치에서 기록된 데이터셋을 사용하여 수행되었으며, 제한된 레이블링 조건 하에서 우수한 고장 진단 성능과 높은 실제 적용 가능성을 입증합니다. 더욱이, 이 모델은 다중 헤드 가중치 기여도 분석을 통해 해석 가능한 진단 통찰력을 제공하여, 건강 상태에 대한 더 신뢰할 수 있는 평가를 가능하게 합니다.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/0b82f4f4-5ae0-4ddc-bf85-df0ef386cfc9/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

OHT는 반도체 공장에서 필수적인 자동화된 자재 처리 시스템의 한 유형입니다 (Kuo, 2002; Wan & Shin, 2022). 이들은 주로 공장 천장에 설치된 가이드 레일을 따라 자율적으로 이동하며 웨이퍼 운송에 사용됩니다 (Kim et al., 2007). OHT의 구성 요소는 지속적인 차량 이동으로 인해 높은 스트레스를 경험하며, 이로 인해 빠른 성능 저하에 취약합니다 (Zhakov et al., 2020). 이러한 성능 저하는 OHT 장치의 고장을 유발할 수 있으며, 한 장치가 작동을 멈추면 동일한 레일에 있는 다른 장치들이 영향을 받아 궁극적으로 전체 생산 라인을 중단시킵니다. 따라서, 각 OHT 장치의 건강 상태를 정확하게 평가하는 것은 높은 웨이퍼 제조 수율을 유지하는 데 필수적입니다.

전류, 진동, 토크와 같은 신호는 기계 시스템 및 그 하위 구성 요소의 신뢰할 수 있는 작동을 보장하기 위해 널리 활용되어 왔습니다 (Deng et al., 2025; Feng et al., 2022, 2025; Hwang et al., 2025; Kim et al., 2023; Lee et al., 2023; Lian et al., 2025; Park et al., 2023). 특히, 모터 제어 시스템에서 얻은 토크 신호는 추가적인 센서 없이 시스템 상태에 대한 가치 있는 통찰력을 제공하기 때문에 고장 진단 작업에 사용되어 왔습니다 (Oh et al., 2022). OHT는 위 그림과 같이 제어된 토크 신호 하에서 작동하는 듀얼 모터 시스템에 의해 구동되므로, 이 신호는 고장 진단에 활용될 수 있습니다.

산업에서 OHT 고장 진단은 전통적으로 전문가 지식이나 특정 작동 중 전체 토크 크기의 증가를 모니터링하는 것과 같은 단순 규칙에 의존해 왔습니다. 그러나 이러한 접근 방식은 여러 OHT에 걸쳐 적용될 때 강건성이 부족합니다. 이는 주로 하드웨어 제조 허용 오차 및 제어 매개변수 조정으로 인해 발생하는 개별 OHT 장치 간의 도메인 불일치 (domain discrepancies)로 인해 신호 분포에 편차가 발생하기 때문입니다.

더욱이, 불충분한 레이블 데이터셋은 모든 OHT 장치를 신뢰성 있게 진단하는 능력을 제한하여 이러한 접근 방식의 효과를 감소시킵니다. 이러한 이유로, 사용 가능한 레이블 데이터로 훈련된 진단 알고리즘은 훈련 중에 본 유사한 토크 신호 패턴을 특징으로 하는 일부 OHT 장치 그룹에만 일반화되는 경향이 있습니다.

최근 딥러닝 중 전이 학습 (transfer learning) 분야는 도메인 불일치 및 레이블 데이터 희소성 문제를 해결하기 위해 특별히 개발되었으며, 여러 도메인에 걸쳐 고장 진단을 개선하기 위한 핵심 전략이 되고 있습니다 (Cui et al., 2024; Dong et al., 2022; Huang & Sheng, 2024; Li et al., 2021; Shin et al., 2023). 전이 학습은 일반적으로 사전 훈련된 모델을 미세 조정함으로써, 잘 구축된 소스 도메인의 지식을 활용하여 레이블 데이터가 제한된 타겟 도메인에 모델을 조정할 수 있도록 합니다.

본 논문은 OHT 차량을 위한 새로운 고장 진단 방법인 플릿 수준 반지도 도메인 적응 네트워크 (FL-SSDAN, Fleet-Level Semi-supervised Domain Adaptation Network)를 제안합니다. 제안된 방법은 OHT 장치 간의 도메인 차이를 고려하고, 레이블이 없는 데이터를 고장 진단에 활용하며, 해석 가능한 진단 결과를 제공합니다.

---

### Related Works

#### 1. Relationship Between Torque Signal and Faults in Overhead Hoist Transport

OHT 고장에 대한 배경 지식과 이들이 토크 신호와 맺는 관계에 대해 설명합니다. 휠 및 기어 고장은 지속적인 레일 접촉, 빈번한 방향 전환, 다양한 하중 조건으로 인해 산업 환경에서 작동하는 OHT 시스템에서 가장 흔한 고장 모드 중 하나입니다. 휠은 지속적인 마찰로 인해 마모되기 쉬운 반면, 모터 감속기 내부의 기어는 반복적인 하중 전달 및 기계적 응력으로 인해 종종 피로 및 백래시 (backlash)를 겪습니다. 이러한 보편성을 고려하여, 본 연구는 정상 상태를 포함하여 이 두 가지 고장을 진단하는 데 중점을 둡니다. 복합 고장 (여러 고장이 동시에 발생하는 경우)은 OHT 시스템에서 극히 드물기 때문에 본 연구에서 고려되지 않았습니다.

각 모터의 관점에서, 이러한 변화는 부하 토크 $T_L$에서 전자기 토크 $T_E$로 전달되며, 이 $T_E$를 고장 진단을 위해 모터 컨트롤러로부터 획득합니다 (Yao et al., 2019). 서보 모터의 경우, $T_E$는 다음과 같이 표현될 수 있습니다.

$$
T_E = J \frac{d\omega}{dt} + \sum_{n=1}^{\infty} T_n \cos(2\pi f_n t + \phi_n) + T_L
$$

여기서 $J$는 회전 구성 요소의 관성 모멘트를 나타내고, $\omega$는 모터의 각속도, $\phi_n, f_n, T_n$은 각각 기본 고장 구성 요소의 $n$차 고조파의 위상, 주파수, 진폭을 나타냅니다. 정속 조건 (constant speed conditions) 하에서 아래와 같이 표현될 수 있습니다.

$$
T_E = T_{E, C} + \sum_{n=1}^{\infty} T_n \cos(2\pi f_n t + \phi_n)
$$

여기서 $T_{E, C}$는 전자기 토크의 상수 부분을 나타냅니다. OHT의 전체 본체 무게를 고려할 때, payload로 인한 토크 변화는 무시할 수 있을 정도라고 가정합니다.

듀얼 모터 OHT 시스템에서는 전방 또는 후방 모터 중 하나에 발생하는 고장이 다른 모터의 $T_{E, C}$ 특성에 영향을 미칩니다 (Cho & Lee, 2021). 따라서 신뢰할 수 있는 고장 진단을 보장하기 위해서는 두 토크 신호를 상호 영향을 고려하여 종합적으로 처리하는 것이 필수적입니다.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/358695f5-60ce-45e9-a6b0-97291e02ee91/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

전처리 모듈에서 획득된 토크 신호는 인코더 신호를 사용하여 필터링되어 정속 작동 (constant-speed operation)에 해당하는 데이터만 추출됩니다. 그런 다음, 이 두 토크 신호는 고장 특성의 해석 가능성을 높이기 위해 세 가지 변환된 표현 (합, 차, 잔차)으로 변환됩니다.

합과 차는 고장 조건 하에서 두 서브 모터 간의 관계를 설명하고 이 때 전방 토크와 후방 토크의 차이로 정의되는 차는 두 모터의 동력 불균형을 반영합니다. 잔차는 전방 토크 신호의 3단계 이동 평균을 원 값에서 빼어 제어 관련 요소를 줄입니다.

특징 추출기에서 multi head cnn은 각 전처리된 신호로부터 고유한 특징을 추출하기 위해 세 개의 분리된 경로로 구성됩니다. 이 컨볼루션 경로는 전역 평균 풀링 (Global Average Pooling) 계층에서 병합될 때까지 독립적으로 유지됩니다. 합과 차는 저주파수 구성 요소를 포착하는 반면 잔차는 고주파수 특성을 포착하므로, 합과 차에 대해서는 커널 크기를 훨씬 크게, 잔차에 대해서는 더 작게 설정합니다. 이 전체 절차는 딥 신경망이 다양한 스케일의 신호에 집중하고 특정 고장과 관련된 특징을 추출할 수 있도록 합니다. 다음으로, 진단에서 각 전처리된 신호의 상대적 중요성을 추정하고 이 정보를 모델에 활용하기 위해, 보조 계층 (auxiliary layer)을 갖춘 특징 가중 블록 (feature-weighting block)이 사용됩니다. 이전 구성 요소의 전처리된 신호는 각각 별도의 1D CNN 블록을 통과한 후 GAP 계층을 거쳐 특징 벡터를 추출합니다. 이 특징 벡터는 합, 차, 잔차 신호로부터 도출된 표현에 각각 해당하는 $\mathbf{G}_1, \mathbf{G}_2, \mathbf{G}_3$로 표기됩니다.

<img src="https://velog.velcdn.com/images/devjo/post/bd63a3b4-4854-48a0-9c20-bff24e223b2a/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

$$
z_i = \frac{e^{k \mathbf{w}_{i, k} * \text{concat}(\mathbf{G})_k + b_i}}{\sum_{j=1}^{3} e^{k \mathbf{w}_{j, k} * \text{concat}(\mathbf{G})_k + b_j}}
$$

보조 계층 (Woo et al., 2018)은 Softmax 활성화 함수를 갖는 완전 연결 계층으로 구성되며, 이들 간의 특징 관계를 포착하여 전처리된 신호의 중요도 가중치 $z_i$를 계산합니다. 이 과정은 위와 같이 공식화될 수 있습니다.

특징 벡터는 또한 대안 경로로 전달되어 특징 벡터의 정보를 보존하고 훈련 과정을 개선하는 잔차 연결 (residual connection)을 생성합니다. 입력 데이터 $\mathbf{X}$를 나타내는 최종 특징 벡터 $F(\mathbf{X})$는 두 경로의 출력을 합산하여 얻어집니다. 이 과정은 다음과 같은 방정식으로 요약될 수 있습니다.

$$
\begin{aligned}
&F(\mathbf{X}) \\
&= \text{concat}(z_i \mathbf{G}_i) + \text{concat}(\mathbf{G}_i) \\
&= [(z_1 + 1)\mathbf{G}_1, (z_2 + 1)\mathbf{G}_2, (z_3 + 1)\mathbf{G}_3]
\end{aligned}
$$

훈련 절차에서는 조건부 분류기 경로는 소스 데이터만을 사용하여 훈련됩니다. 이 단계는 레이블이 지정된 소스 데이터를 활용하여 초기 특징을 구축하며, 후속 적응을 위한 강력한 기반을 제공합니다. 이 단계에서 사용되는 분류 손실 $L_{\text{CLS}}^{(S)}$는 소스 도메인 분류를 위한 교차 엔트로피 손실을 나타내며, 다음과 같이 공식화됩니다.

$$
\begin{aligned}
&L_{\text{CLS}}^{(S)}(\theta_F, \theta_C \\
&= \frac{1}{n_S} \sum_{i=1}^{n_S} L_{\text{CE}}(C(F(\mathbf{X}_{S,i})), \mathbf{Y}_{S,i}) \\
&= - \frac{1}{n_S} \sum_{i=1}^{n_S} \sum_{j=1}^{3} \mathbb{1}[\mathbf{Y}_{S,i} = j] \log \left( \frac{e^{C(F(\mathbf{X}_{S,i}))_j}}{\sum_{k=1}^{3} e^{C(F(\mathbf{X}_{S,i}))_k}} \right)
\end{aligned}
$$

다음으로, 도메인 판별기 경로는 이전 단계에서 훈련된 특징 추출기를 활용하면서 소스 OHT 장치와 타겟 OHT 장치를 구별하도록 훈련됩니다. 도메인 레이블 $\mathbf{Y}_D$는 타겟 도메인에 대해 0, 소스 도메인에 대해 1로 지정됩니다. 훈련 과정은 도메인 레이블 $\mathbf{Y}_D$, 소스 데이터 $\mathbf{X}_S$, 그리고 레이블이 없는 타겟 데이터 $\mathbf{X}_{TU}$를 사용하여 도메인 판별 손실 $L_{\text{DISC}}$를 최소화합니다. 이 과정은 잘 훈련된 도메인 판별기가 도메인을 구별하기 어렵게 만들기 때문에 중요합니다. 결과적으로, 특징 추출기도 적대적으로 업데이트되어, 도메인 판별기가 더 이상 도메인을 구별할 수 없을 때까지 표현을 조정하면서 도메인 불변 특징을 학습합니다. 도메인 판별 손실 $L_{\text{DISC}}$는 다음과 같이 표현됩니다.

$$
\begin{aligned}
&L_{\text{DISC}}(\theta_D) \\
&= \frac{1}{n_S + n_{TU}} \sum_{i=1}^{n_S + n_{TU}} L_{\text{BCE}}(D(F(\mathbf{X}_i)), \mathbf{Y}_{D,i}) \\
&= - \frac{1}{n_S + n_{TU}} \sum_{i=1}^{n_S + n_{TU}} (\mathbf{Y}_{D,i} \log(D(F(\mathbf{X}_i))) + (1 - \mathbf{Y}_{D,i}) \log(1 - D(F(\mathbf{X}_i))))
\end{aligned}
$$

대조적 의미론적 정렬 손실 $L_{\text{CSA}}$는 특징 판별력을 향상시키기 위해 계산됩니다. 이 손실 함수는 동일한 레이블을 공유하는 소스 및 타겟 도메인 특징 간의 불일치를 줄이는 동시에 다른 레이블을 가진 특징 간의 불일치를 증가시키는 것을 목표로 하며 (An et al., 2023), 다음과 같이 공식화됩니다.

$$
\begin{aligned}
&L_{\text{CSA}}(\theta_F, \theta_C) \\
&= \frac{1}{n_{\text{pairs}}} \left( \sum_{i, j, Y_i = Y_j} \Vert F(\mathbf{X}_{S,i}) - F(\mathbf{X}_{TL,j}) \Vert^2 + \sum_{i, j, Y_i \ne Y_j} \max(0, m - \Vert F(\mathbf{X}_{S,i}) - F(\mathbf{X}_{TL,j}) \Vert)^2 \right)
\end{aligned}
$$

총 손실 함수 $L_{\text{total}}$는 적대적 훈련을 용이하게 하기 위해 $L_{\text{DISC}}$가 빼지는 $L_{\text{CLS}}$와 $L_{\text{CSA}}$의 가중 합으로 정의됩니다. 이 과정에서 모델은 OHT 장치의 도메인을 식별하는 데 실패하도록 훈련됩니다 (Ganin & Lempitsky, 2015). 이 단계는 소량의 레이블이 지정된 타겟 데이터를 활용하여 이를 이전 단계에서 사전 훈련된 특징 공간과 정렬하여 훈련된 OHT 장치에 대한 강건한 진단 모델을 생성합니다. 총 손실 함수 $L_{\text{total}}$은 다음과 같이 제시됩니다.

$$
\begin{aligned}
&L_{\text{total}}(\theta_F, \theta_C, \theta_D) \\
&= \alpha_{\text{CLS}} L_{\text{CLS}}(\theta_F, \theta_C) \\
&- \lambda L_{\text{DISC}}(\theta_F, \theta_D) \\
&+ \alpha_{\text{CSA}} L_{\text{CSA}}(\theta_F, \theta_C)
\end{aligned}
$$

---

### Conclusion

본 논문은 OHT 장치의 강건하고 해석 가능한 고장 진단을 위한 새로운 반지도 도메인 적응 방법인 플릿 수준 반지도 도메인 적응 네트워크 (FL-SSDAN, fleet-level semi-supervised domain adaptation network)를 제안합니다. FL-SSDAN은 장치 간 신호의 가변성, 제한된 레이블 데이터, 그리고 진단 결과의 해석 가능성 부족과 같은 주요 과제를 효과적으로 해결합니다.

FL-SSDAN은 듀얼 모터 신호를 잔차, 합, 차의 세 가지 개별 신호로 변환하여 물리적 유의성을 보존하도록 토크 신호를 전처리합니다. 이 전처리된 신호는 multi head cnn을 통과하며, 각 신호의 고유한 특성을 유지하도록 개별적으로 특징을 추출합니다.

특징 가중 모듈 (feature-weighting module)은 진단 작업과의 관련성을 기반으로 각 신호에 중요도 가중치를 적응적으로 할당하여, 의사 결정에서 가장 영향력 있는 신호 구성 요소를 강조함으로써 고장 분류 성능과 해석 가능성을 모두 향상시킵니다. FL-SSDAN의 훈련 전략은 장치 간의 신호 불일치를 효과적으로 줄이고, 레이블이 희소한 데이터로도 진단 성능을 향상시킵니다.

FL-SSDAN은 다양한 레이블이 희소한 타겟 도메인 조건 (5%, 10%, 25%, 50% 레이블 데이터)에서 기준선 방법 (S-only, STL, STL-CSA, STL-CSA-MMD) 대비 우수한 성능을 입증했습니다. 이 모델은 15가지의 서로 다른 소스 및 타겟 OHT 장치 조합 전반에 걸쳐 일관되게 더 높은 고장 진단 정확도를 달성했으며, 더 높은 평균 정확도와 더 좁은 $95\%$ 신뢰 구간은 강건한 성능과 안정성을 나타냅니다.

---

### 참고 자료

[원본 경로 #1](https://academic.oup.com/jcde/article/12/7/49/8180389)

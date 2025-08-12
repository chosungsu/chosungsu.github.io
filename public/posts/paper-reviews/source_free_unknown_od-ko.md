---
title: 'SFUOD: Source-Free Unknown Object Detection'
date: '2025-08-01'
tags: ['computer vision', 'paper review']
---

### Abstract

소스-프리 객체 탐지(Source-free object detection)는 레이블이 지정되지 않은 소스 데이터에 접근할 필요 없이, 소스 도메인에서 사전 훈련된 탐지기를 레이블이 없는 타겟 도메인에 적응시키는 기술입니다. 이 방식은 도메인 적응 과정에서 소스 데이터셋이 필요 없으므로 실용적이지만, 소스 도메인에서 사전 정의된 객체만이 타겟 도메인에 존재한다는 제한적인 가정을 가지고 있습니다. 이러한 닫힌 집합(closed-set) 설정은 탐지기가 정의되지 않은 객체를 감지하는 것을 방해합니다.

이러한 가정을 완화하기 위해, 소스-프리 미지 객체 탐지(SFUOD: Source-Free Unknown Object Detection)라는 새로운 시나리오를 제안합니다. 이 시나리오는 탐지기가 알려진 객체(known objects)를 인식할 뿐만 아니라, 정의되지 않은 객체들을 미지 객체(unknown objects)로 탐지할 수 있도록 합니다.

이를 달성하기 위해, 본 논문에서는 SFUOD를 위한 새로운 프레임워크인 CollaPAUL (Collaborative tuning and Principal Axis-based Unknown Labeling)을 제안합니다.

---

### Introduction

Domain adaptive object detection는 소스에서 타겟 도메인으로 지식을 전이하는 것을 목표로 하며, 실용적인 응용 분야 때문에 광범위하게 연구되고 있습니다. 특히, 소스-프리 객체 탐지(SFOD: source-free object detection)는 레이블이 지정된 소스 데이터에 접근할 필요 없이 소스 훈련 모델을 레이블이 없는 타겟 도메인에 적응시키는 데 중점을 둡니다. SFOD는 데이터 프라이버시와 저장 공간 제약을 해결하는 현실적인 시나리오입니다.

이 논문에서는 새로운 소스-프리 미지 객체 탐지(SFUOD: Source-Free Unknown Object Detection) 시나리오를 제안합니다. SFUOD 시나리오는 소스 훈련 탐지기를 알려진 객체에 대해 타겟 도메인에 적응시키는 것뿐만 아니라, 정의되지 않은 객체를 미지 객체로 탐지하는 것을 요구합니다.

<img src="https://velog.velcdn.com/images/devjo/post/e242eca7-9151-446f-938e-a1e24e45b59b/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

위 이미지에서 볼 수 있듯이 전통적인 소스-프리 객체 탐지는 탐지기를 소스 도메인에서 사전 정의된 객체(예: "Car", "Bus")만 인식하도록 적응시킵니다. 반면에, 새로운 시나리오에서는 탐지기가 미지 객체(예: "Person", "Bicycle")도 탐지할 수 있습니다. 미지 객체는 현실 세계에서 자주 나타나기 때문에, 제안된 SFUOD는 알려진 객체에 대한 지식 전이와 미지 객체 탐지를 동시에 요구하는 현실적이고 도전적인 시나리오입니다.

기존 접근법 중 Mean Teacher(MT) 프레임워크에서 teacher 모델은 student 모델을 위한 가상 레이블(pseudo-labels)을 생성하고, teacher 모델은 지수 이동 평균(EMA: exponential moving average)을 통해 업데이트되어 소스 의존적 지식을 타겟 도메인으로 전이함으로써 도메인 차이(domain shift)를 완화합니다. 그러나 소스 도메인에서 훈련된 teacher 모델은 미지 객체에 대한 지식이 부족하여, 미지 객체에 대한 가상 레이블을 성공적으로 생성할 수 없습니다.

미지 객체에 가상 레이블을 할당하기 위해, 이 논문에서는 비지도 도메인 적응에서 일반적인 접근법인 신뢰도 기반 가상 레이블링(confidence-based pseudo-labeling)을 사용했습니다.

CollaPAUL은 두 가지 핵심 구성 요소로 이루어져 있습니다.

-협업 튜닝(Collaborative tuning)은 student 모델의 소스 의존적 지식과 보조 타겟 인코더의 타겟 의존적 지식을 통합합니다. 타겟 의존적 지식을 추출하기 위해, 타겟 인코더는 특이값 분해(SVD: Singular Value Decomposition)를 통해 truncated reconstruction을 적용하고, cross-domain attention 사용하여 소스 및 타겟 특징을 융합합니다. 이를 통해 student 모델은 협업 튜닝을 통해 더 풍부한 표현을 학습할 수 있습니다.

-주축 기반 미지 레이블링(PAUL: Principal Axis-based Unknown Labeling)은 알려진 객체의 주축을 추정하여 객체성(objectness) 점수를 계산함으로써 미지 객체에 대한 더 정확한 가상 레이블 할당을 가능하게 합니다. 알려진 객체의 주축에 투영된 미지 제안이 유사성을 보이고, 비객체 제안은 유사하지 않다고 가정합니다. 이 가정을 기반으로, PAUL은 이러한 주축을 활용하여 객체 제안을 식별하고 미지 객체에 가상 레이블을 할당합니다.

---

### Related work

소스-프리 객체 탐지(SFOD)는 모델이 소스 데이터에 접근하지 않고도 타겟 도메인에 적응하는, 데이터 프라이버시 제약이 있는 도메인 적응 문제를 다룹니다. 최근의 SFOD 방법들은 견고성과 안정성 때문에 평균 교사(mean teacher) 프레임워크에 의존하지만, 교사 모델에서 생성되는 노이즈가 있는 가상 레이블(noisy pseudo-labels)은 부정확한 학생 학습과 부적절한 교사 업데이트를 초래하여 모델 붕괴(collapse)로 이어질 수 있습니다.

이러한 문제를 해결하기 위해, PET는 정적 및 동적 교사를 포함하는 다중 교사(multi-teacher) 프레임워크를 도입하여 교사와 학생 모델을 주기적으로 교환함으로써 훈련을 안정화시킵니다. SF-UT는 AdaBN을 사용하여 초기 교사 모델의 고정된 가상 레이블을 활용하여 부적절한 교사 업데이트를 방지합니다.

이러한 방법들은 소스-프리 도메인 적응을 위한 교사 업데이트를 안정화하는 데 중점을 두는 반면, 이 논문에서는 소스 및 타겟 의존적 표현 지식을 통합하여 학생 모델의 학습을 개선함으로써 보다 효과적인 적응을 위한 협업 튜닝(collaborative tuning)을 제안합니다.

---

### Method

#### 1. Problem definition

이 섹션에서는 제안된 SFUOD의 문제 설정을 정의합니다.

레이블이 지정된 소스 데이터셋을 $D_s = \{(x^i_s, y^i_s)\}^{|D_s|}_{i=1}$로, 레이블이 없는 타깃 데이터셋을 $D_t=\{(x^i_t)\}^{|D_t|}_{i=1}$이라고 합니다.

각 소스 레이블 $y_s^i = {(b^j, c^j)}_{j=1}^{J_i}$는 알려진 객체에 대한 $J_i$개의 주석을 포함하며 여기서 $b^j$는 바운딩 박스를 $c^j \in Y_s$는 $j$번째 주석의 카테고리를 나타냅니다.

#### 2. Pipeline of the mean teacher-based approach

동일한 아키텍처와 초기화를 공유하는 교사 모델(teacher model)과 학생 모델(student model)로 구성된 평균 교사(MT) 프레임워크를 사용합니다. 학생 모델은 교사 모델이 생성한 가상 레이블을 사용하여 훈련됩니다. 교사 모델은 학생 모델로부터 EMA(지수 이동 평균)를 통해 업데이트됩니다.

$$
L_{det}=L_{cls}(\hat{c_s}, \hat{c_t}) + \\ L_{L1}(\hat{b_s}, \hat{b_t}) + \\ L_{giou}(\hat{b_s}, \hat{b_t}), \\
\bar{\theta_t} \leftarrow \alpha \theta_t + (1-\alpha) \theta_s
$$

여기서 $L_{cls}$는 분류 손실, 나머지는 회귀 손실을 나타냅니다. $\alpha$는 가중치 업데이트를 위한 하이퍼파라미터 역할을 합니다. 학생 모델 $\theta_s$, 교사 모델 $\theta_t$의 예측된 클래스와 바운딩 박스를 각각 $(\hat{c_s}, \hat{c_t})$, $(\hat{b_s}, \hat{b_t})$로 표기합니다.

#### 3. Collaborative tuning

제안된 SFUOD 시나리오는 모델이 학습된 소스 지식을 타겟 도메인으로 전이하고, 동시에 새로운 클래스를 미지 객체로 학습하도록 요구합니다. 미지 객체는 소스 도메인에서 관찰되지 않았기 때문에, 적응된 소스 지식은 모델이 미지 객체에 대한 표현 지식을 학습하는 것을 방해하여 알려진 객체와 미지 객체 간의 지식 혼동을 야기합니다.

이를 해결하기 위해, 우리는 학생 모델에 의해 추출된 소스 의존적 지식과 보조 타겟 인코더에 의해 추출된 타겟 의존적 지식을 통합하는 것을 목표로 하는 협업 튜닝을 제안합니다. 이는 전이 가능한 소스 지식을 보존하는 동시에 타겟 도메인에 대한 표현 지식을 포착하기 위함입니다.

백본에서 공간 크기가 $h*w$인 $c$차원 특징 맵 $f$가 주어지면 OW-DETR과 같이 맵을 평균화하여 활성화의 크기 $A \in \mathbb{R}^{h \times w}$를 계산합니다. 그런 다음 상위 k개의 활성화된 특징 $f_a \in \mathbb{R}^{k \times C}$를 선택합니다. 이 때 $f_a=U\sum V^T$와 같이 특이값 분해(SVD)를 적용합니다.

타겟 의존적 지식을 소스 의존적 지식과 통합하기 위해, 타겟 의존적 특징 $f_t$를 학생 모델의 디코더 레이어에 공급합니다.

협업 레이어에 의해 통합된 지식을 타겟 디코더에 전달하기 위해, 우리는 디코더 레이어 사이에 협업 레이어를 삽입합니다. 구체적으로, 협업 레이어는 출력 특징이 소스 의존적 표현에 사용되는 초기 레이어를 제외한 첫 $L$개의 디코더 레이어에 삽입됩니다. 이 값은 삽입되는 레이어의 수를 결정하는 하이퍼파라미터이며, 우리는 경험적 분석을 기반으로 $L=3$으로 설정했습니다.

#### 4. Principal axis-based unknown labeling

소스 도메인에 정의되지 않은 새로운 객체를 미지(unknown) 객체로 식별하도록 요구합니다. 그러나 소스 훈련된 모델은 미지 객체에 대한 지식이 없기 때문에, 평균 교사(mean teacher) 프레임워크의 교사 모델은 미지 객체에 신뢰할 수 있는 가상 레이블(pseudo-labels)을 할당하는 데 어려움을 겪습니다. 주축 기반 미지 레이블링(PAUL: Principal Axis-based Unknown Labeling)은 proposal 특징의 objectness를 추정하고, 예측으로부터 얻은 미지 신뢰도 점수를 활용하여 미지 가상 레이블을 할당할 제안 특징을 효과적으로 선택합니다.

---

### Experiments

기존 SFOD 벤치마크인 weather adaptation과 cross-scene adaptation을 활용하였습니다. 두 벤치마크 모두에서, 차량 클래스(예: “Car”, “Truck”, “Bus”)는 알려진 클래스로 사전 정의되었고, 다른 카테고리(예: “Person”, “Rider”, “Motorcycle”, “Train”, “Bicycle”)는 미지 객체로 취급되었습니다. 평균 교사 프레임워크 내에서 학생 학습과 교사 업데이트를 효과적으로 관리하는 DRU를 기본 모델로 사용했습니다. 탐지기로는 ImageNet에서 사전 훈련된 ResNet-50 백본을 가진 Deformable-DETR를 채택했습니다.

교차-도메인 어텐션의 효과를 검증하기 위해, 널리 사용되는 매개변수 효율적인 튜닝 방법인 prefix-tuning과 성능을 비교했습니다. known mAP에서 3.89%, U-Recall에서 2.52%, H-Score에서 3.38% 증가했습니다.

미지 레이블링(PAUL)의 효과를 검증한 결과 U-Recall에서 6.59%, H-Score에서 8.83% 증가햇습니다.

---

### Conclusion

본 논문에서는 소스-프리 미지 객체 탐지(SFUOD)라는 새로운 시나리오를 제안합니다. 이 시나리오에서 모델은 알려진 객체를 인식하는 동시에 새로운 객체를 미지 객체로 탐지합니다. 제안된 SFUOD는 지식 혼동(knowledge confusion)과 미지 객체에 대한 지식 부족으로 인해 도전적이지만 현실적인 설정입니다.

협업 튜닝은 효과적인 지식 전이를 통해 지식 혼동을 완화합니다. 주축 기반 미지 레이블링은 알려진 객체의 주축을 활용하여 객체성을 추정함으로써 미지 객체에 대한 가상 레이블을 생성합니다.

SFUOD 분야에는 개선의 여지가 있지만, CollaPAUL은 기존의 SFOD 방법들을 능가하는 성능을 보였습니다. 개방형 인식(open-set recognition)을 포함한 도메인 적응 객체 탐지(domain adaptive object detection)에 새로운 통찰력을 제공할 것으로 기대합니다.

---

### 참고 자료

[원본 경로 #1](https://arxiv.org/abs/2507.17373)

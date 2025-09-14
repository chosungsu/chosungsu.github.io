---
title: 'A Survey of Deep Visual Cross-Domain Few-Shot Learning'
date: '2023-07-14'
tags: ['object detection', 'paper review']
---

### Abstract

Few-Shot Transfer Learning은 제한된 레이블 데이터로 새로운 클래스를 인식할 수 있게 해주기 때문에, 주요 연구 분야로 떠오르고 있습니다. 훈련 데이터와 테스트 데이터가 동일한 데이터 분포를 가진다고 가정하지만, 실제 애플리케이션에서는 그렇지 않은 경우가 많습니다. 이로 인해 새로운 클래스의 분포가 학습된 클래스와 크게 다를 때 모델 전이 효과(transfer effects)가 감소하게 됩니다.

이러한 문제를 해결하기 위해 Cross-Domain Few-Shot(CDFS)에 대한 연구가 등장했으며, 이는 더 도전적이고 현실적인 환경을 형성합니다. 본 논문에서는 문제 설정 및 해당 솔루션 관점에서 CDFS에 대한 상세한 분류 체계(taxonomy)를 제공합니다.

---

### Introduction

강력한 컴퓨팅 성능은 딥러닝의 발전을 가속화하여 컴퓨터 비전 분야에서 상당한 발전을 이루게 했습니다. 이미지 분류(image classification), 객체 탐지(object detection), 의미론적 분할(semantic segmentation)과 같은 연구 분야는 혁신적인 방식으로 컴퓨터 비전의 발전을 지속적으로 이끌고 있습니다. 현재의 딥 모델은 훈련을 위해 대량의 주석이 달린(annotated) 데이터를 필요로 하지만, 이러한 데이터는 일반적으로 비용이 많이 들고 노동 집약적입니다. 특정 분야에서는 모델이 새로운 범주를 인식하도록 하는 데 레이블이 거의 없는(few labeled) 데이터만 존재하여, Few-Shot Learning의 필요성이 대두되었습니다.

Few-Shot Learning은 훈련 및 테스트 데이터가 동일한 도메인에서 나온다고 가정하지만, 도메인 시프트(domain shift)는 현실 세계 시나리오에서 흔히 볼 수 있습니다. 이러한 맥락에서, Cross-Domain Few-Shot(CDFS) Learning은 도메인 시프트와 데이터 희소성을 동시에 해결함으로써 Few-Shot Learning 문제에 대한 유망한 해결책을 제시합니다.

본 논문은 문제 설정, 솔루션, 그리고 응용 분야를 기반으로 CDFS에 대한 현재 연구를 검토하고 분류합니다.

1.문제 설정과 관련하여, 다중 데이터 소스를 가진 CDFS 연구를 위한 두 가지 주요 모델을 식별합니다. 단일 모델(single-model)과 다중 모델(multiple-model)가 있는데 전자의 경우는 타겟 도메인 데이터에 접근 가능한지, 후자의 경우는 각 소스에 대해 모델을 훈련하고 나중에 이를 집계하는 것을 포함합니다.

2.솔루션과 관련하여, 네 가지 주요 접근법(이미지 증강(Image Augmentation), 특징 증강(Feature Augmentation), 디커플링(Decoupling), 미세 조정(Fine-tuning))을 다룹니다.

---

### Preliminaries

#### 1. Few-Shot Learning (FSL)

FSL(Few-Shot Learning)은 제한된 주석(annotated) 레이블로부터 새로운 클래스를 학습하도록 설계된 전이 학습(transfer learning) 기술입니다. FSL이 성공적으로 적용되기 위해서는 두 가지 가정이 충족되어야 합니다.

훈련(train) 과정과 미세 조정(finetune) 과정 간의 클래스는 서로 구별되어야 합니다. 두 과정 사이에 클래스 교차(intersection)가 없어야 합니다. 미세 조정 과정에서 각 클래스에 대한 주석 레이블이 제한적이어야 합니다. 심지어 하나의 주석 레이블만 있을 수도 있습니다.

구체적으로, 충분한 레이블을 가진 클래스 $C_b$가 포함된 데이터셋 $D_b$와 제한된 레이블만을 가진 클래스 $C_n$가 포함된 데이터셋 $D_n$이 있을 때 FSL 모델은 데이터셋 $D_b$에서 학습하고 테스트 과정에서 새로운 클래스를 미세조정하기 위해 소수의 레이블을 적용하는 것을 목표로 합니다.

#### 2. Few-Shot Domain Adaptation (FSDA)

Few-Shot과 Domain Adaptation의 강력한 조합으로, Few-Shot 학습을 더 어렵게 만듭니다. 두 데이터셋 간의 공유된 분포를 가정하는 FSL과 다르게 두 데이터셋 간에 domain gap이 있음을 식별합니다.

#### 3. Cross-Domain Few-Shot (CDFS)

최근 Few-Shot 학습에서 새롭게 등장한 분야로, 소스(source)와 타겟(target) 도메인 간에 상당한 도메인 격차가 있다고 가정하여 전통적인 FSDA 접근법보다 더 도전적인 과제를 만듭니다.

최근의 CDFS(Cross-Domain Few-Shot) 연구는 다중 소스(Multiple Source), 단일 소스(Single Source), 그리고 벤치마크(Benchmark)의 세 가지 범주로 분류할 수 있습니다.

<img src="https://velog.velcdn.com/images/devjo/post/5560a055-8f3b-4ec5-9dee-993d6d7c121b/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

다중 소스 CDFS는 서로 다른 도메인은 모델 학습에 필수적인 데이터 분포를 제공할 수 있으므로, 여러 소스 도메인 데이터를 수집하는 것은 직관적인 접근으로 보고 있으며 먼저 서로 클래스가 겹치지 않는(disjoint classes) 여러 소스 도메인 데이터셋을 수집합니다. 그런 다음 특정 훈련 전략을 사용하여 도메인 정보를 포착하고 결과를 최종 전이 모델로 결합합니다.

이 때 다중 모델을 사용하는 경우, 각 도메인이 자체의 특정 모델을 가집니다. 훈련 단계에서 각 도메인은 도메인별 모델을 최적화합니다. 그런 다음 집계 단계에서 모든 모델을 단일 모델로 결합하며 특징 재사용(feature reuse)에 중점을 둡니다. 이는 최종 전이 모델 역할을 합니다. 그리고 단일 모델을 사용하는 경우, 통합된 모델을 적용하여 다중 도메인 특징을 학습합니다. 단일 모델 방법은 모든 소스 도메인 데이터를 훈련할 수 있습니다. 단일 모델 방법은 계산량이 적고 다중 모델의 집계 단계를 생략합니다. 도메인별 정보가 혼동될 수 있는 문제를 완화하기 위해 CDNet은 주어진 특징에서 도메인 정보를 분해하고 도메인과 무관한(domain-independent) 표현을 추출합니다.

단일 소스 CDFS는 제한된 주석을 필요로 하므로, 모델 훈련을 위해 여러 도메인을 사용하는 것이 항상 실현 가능한 것은 아닙니다. 더 현실적이고 관리하기 쉬운 해결책을 찾기 위해, 단일 소스 CDFS 방법이 제안되었는데, 이는 단 하나의 소스 도메인만을 사용하여 모델을 훈련합니다. 이 단일 소스 CDFS는 타겟 도메인 접근 가능(Target Domain Accessible)과 타겟 도메인 금지(Target Domain Forbidden)의 두 가지 설정을 포함합니다.

타겟 도메인 접근 가능 설정에서는 훈련 시간 동안 타겟 도메인에 접근할 수 있어 모델이 타겟 도메인에 적응할 수 있습니다. 후자의 타겟 도메인 금지 설정에서는 타겟 도메인에 접근할 수 없으므로, 제안된 모델은 도메인 전반에 걸쳐 일반화할 수 있어야 합니다.

---

### Differenct approach of CDFS

CDFS는 feature enhancement, image enhancement, decompose, finetuning 범주로 나뉘어집니다.

#### 1. feature enhancement based

$$
f_{norm}^{b}= \frac{f^b-\mu^b}{v^b}, \\
f_{reco}^{b} = \lambda f_{norm}^{b}+ \beta, \\
\lambda_{mix}=\alpha \mu_0 + (1-\alpha) \mu_0, \\
\beta_{mix}=\alpha v_0 + (1-\alpha) v_0
$$

기본 클래스에서 훈련한 후, Few-Shot 모델은 제한된 주석을 가진 새로운 도메인에서 새로운 클래스를 학습해야 합니다. 이러한 경우, 특징 품질은 전이 효과에 직접적인 영향을 미칩니다. 특징 변환 강화 (Feature Transformation Enhancement)는 주로 특징 분포를 변경하여 특징이 쉽게 전이되도록 합니다. 위 식은 정규화 전략으로 원본 특징에 노이즈 또는 사전 분포를 추가합니다. $f^b, \mu^b, v^b$는 각각 백본 특징, 채널 평균, 채널 분산입니다. 혼합 전략(mixing strategy)은 개선된 버전으로 기능할 수 있으며, 네트워크는 혼합된 텐서를 사용하여 특징을 재구성합니다.

지식 증류 강화는 교사(teacher) 및 학생(student) 네트워크를 훈련합니다. 학생 네트워크의 학습 목표는 특징을 교사 네트워크보다 더 견고하게 만드는 것입니다. 예를 들어 URL은 각 도메인 데이터에 대해 하나의 교사 네트워크를 훈련한 다음, 학생 네트워크를 사용하여 각 교사 네트워크로부터 도메인 지식을 증류합니다.

#### 2. image enhancement based

<img src="https://velog.velcdn.com/images/devjo/post/951ece60-f343-4820-875f-d6855e9ce411/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Self-Supervised Image-Enhancement는 이미지의 의미적 일관성(semantic consistency)을 통해 새로운 인스턴스를 생성합니다. 이 과정은 레이블이 없으므로(label-free) 데이터 품질을 향상시키는 데 실용적입니다. 훈련 과정에서 이미지에 뒤집기(flipping), 변환(translation), 선형 스케일링(linear scaling)을 적용하는 것은 이미지 내용을 변경하지 않습니다. 딥 모델은 유사한 예측을 얻어야 합니다.

Mix-Paste Image-Enhancement는 가장 간단한 방법으로, 소수의 타겟 데이터를 잘라 소스 데이터에 붙여넣습니다. 이는 모델이 타겟 도메인 지식을 학습하는 데 도움이 됩니다.

#### 3. decompose based

분해 기반 방법은 다른 특징이 분해되어야 한다고 생각합니다. 혼합된 특징 공간은 모델 효과를 방해하기 때문에 특징 표현을 얻는 것에 초점을 맞춥니다. 도메인과 무관한 특징은 주로 도메인 불가지론적(domain-agnostic) 판별 정보를 수집하며, 이는 특징이 도메인 전반에 걸쳐 뛰어난 전이 능력을 가진다는 것을 의미합니다. 보완적으로, 도메인 특화 특징은 관련 도메인 정보를 제공할 수 있습니다.

Meta-FDMixup은 무관한 및 특화 특징의 평균과 분산을 생성하는 분리 모듈(disentangle module)을 설계하고, 해당 평균과 분산을 사용하여 도메인 특징을 샘플링합니다. 이 분리 모듈은 VAE(변이형 오토인코더)에서 영감을 받았다고 합니다.

샘플 기반 방법과 달리, 경로 기반(Path-based) 방법은 여러 순방향 경로(forward paths)를 사용하여 다른 특징 표현을 학습합니다. Wave-SAN의 구조는 표준(stand) 및 스타일 증강(style-augmented) 순방향을 포함합니다.

매개변수(Parameter) 방법은 학습 가능한 텐서를 사용하여 특징을 필터링합니다. CDNet은 직렬 프레임워크를 제안합니다. 각 단계는 LD(Learn-to-Decompose) 모듈을 사용하여 도메인 특징을 필터링하고 특징 분해를 완료합니다.

---

### Conclusion

본 논문에서는 최신 CDFS 연구에 대한 포괄적인 개요를 제공했습니다. 이 연구는 점차적으로 인기 있는 연구 주제가 되고 있으며, AI 응용 분야에서 도메인 시프트 문제를 완화할 수 있는 잠재력 때문에 광범위한 주목을 받았음을 보여줍니다.

---

### 참고 자료

[원본 경로 #1](https://arxiv.org/pdf/2303.09253)



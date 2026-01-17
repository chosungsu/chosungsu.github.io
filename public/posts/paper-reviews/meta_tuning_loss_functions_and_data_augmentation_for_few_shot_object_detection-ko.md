---
title: 'Meta-tuning Loss Functions and Data Augmentation for Few-shot Object Detection'
date: '2023-07-24'
tags: ['computer vision', 'paper review']
---

### Abstract

본 논문은 현재의 기술을 두 그룹으로 나누어 정의합니다. 메타 러닝은 샘플 데이터를 새로운 클래스 모델로 변환하는 복잡한 메타모델을 학습하는 것으로 강력하지만 구조가 복잡하고 블랙박스에 가깝습니다. 다음으로 파인튜닝은 단순히 경사 하강법을 통해 기존 모델을 새로운 클래스에 적응시키는 것으로 구조가 단순하면서도 의외로 매우 강력한 성능을 보입니다.

파인튜닝의 force가 되는 요소들을 메타 러닝으로 최적화하는 것을 본 논문에서 기여하고자 합니다.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/7b54c2a3-91d3-4514-8484-cc524115ccef/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

최신 객체 탐지 모델들은 성능이 뛰어나지만, 수천 개의 정확한 바운딩 박스(Bounding Box)를 그리는 어노테이션 비용이 매우 높습니다. 이를 극복하기 위해 대규모 데이터가 있는 기초 클래스(Base classes)에서 지식을 전송받아 데이터가 부족한 신규 클래스(Novel classes)를 잘 탐지하려는 것이 FSOD의 목표입니다.

본 논문에서 제안하는 메타 튜닝은 모델 가중치 자체가 아니라 파인튜닝 단계에서 사용할 Loss function과 Augmentation의 세부 사항을 학습합니다. 강화 학습 기법을 사용하여 특정 신규 클래스 세트에 대해 파인튜닝했을 때 탐지 품질(mAP 등)을 최대화할 수 있는 최적의 손실 및 증강 파라미터를 찾아냅니다.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/8017de81-c20f-4f00-9380-698431508396/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

#### Problem definition

base 클래스 $C_b$의 풍부한 데이터를 학습한 후 아주 적은 수($k$-shot)의 데이터만 주어지는 novel 클래스($C_n$)에 대해 탐지 모델을 구축하는 것입니다.

#### Meta-tuning Loss Functions

FSOD에서 발생하는 대부분의 오류는 위치(Localization)보다는 분류(Classification) 실패에서 기인합니다. 따라서 본 연구에서는 분류 손실 함수를 파라미터화하여 튜닝합니다.

가장 간단한 형태는 Temperature Scaling으로 소프트맥스 함수에 temperature 파라미터 $\rho_\tau$를 도입하는 것입니다.

$$
\ell_{cls}(x, y; \rho) = - \frac{1}{N_{ROI}} \sum_{i}^{N_{ROI}} \log \left( \frac{e^{f(x_i, y_i) / \rho_\tau}}{\sum_{y'} e^{f(x_i, y') / \rho_\tau}} \right)
$$

더 정교한 버전으로 시간에 따라 변하는 temperature 함수 $f_\rho(t)$와 클래스별 스케일링 계수 $\alpha$를 도입합니다.

$$
f_\rho(t) = \exp(\rho_a t^2 + \rho_b t + \rho_c)
$$

#### Meta-tuning Procedure

실제 novel 클래스($C_{novel}$)에 모델을 적용하기 전에, 기존의 base 클래스($C_{base}$)를 활용하여 가상의 소수 샷 환경을 시뮬레이션합니다. 이를 위해 데이터를 세 가지로 나눕니다. $D_{p\text{-}pretrain}$은 메타 튜닝용 임시 모델을 사전 학습시키기 위한 데이터, $D_{p\text{-}support}$는 파인튜닝 단계를 흉내 내기 위한 소량의 데이터, $D_{p\text{-}query}$는 파인튜닝된 모델의 성능을 평가하여 보상을 계산하기 위한 데이터입니다.

메타 학습의 에피소드 방식과 유사하게 진행되며 각 파라미터 $\rho_j$를 가우시안 분포 $N(\mu_j, \sigma^2)$에서 추출합니다. 추출된 손실 함수/증강 강도를 사용하여 모델을 $D_{p\text{-}support}$에 대해 학습시킵니다. 학습된 모델을 $D_{p\text{-}query}$에서 테스트하여 mAP(mean Average Precision) 점수를 얻습니다. 여러 번의 시도 끝에 얻은 mAP 점수를 정규화하여 보상($R(\rho)$)으로 사용합니다.

이제 강화학습 업데이트에서는 가장 높은 보상을 준 $\rho$를 향해 가우시안 분포의 중심($\mu$)을 이동시킵니다.

$$
\mu'_j \leftarrow \mu_j + \eta R(\rho) \nabla_{\mu} \log(p(\rho_j; \mu_j, \sigma))
$$

작업의 난이도 차이로 인한 편차를 줄이기 위해 mAP 점수를 화이트닝 처리합니다. 이는 상대적으로 더 우수한 성능을 낸 파라미터가 업데이트에 더 큰 영향을 미치게 합니다.

---

### Conclusion

본 논문은 소수 샷 객체 탐지(FSOD) 분야에서 가장 단순하면서도 강력한 파인튜닝(Fine-tuning) 기반 프레임워크의 한계를 극복하기 위해 메타 튜닝(Meta-tuning)이라는 새로운 접근 방식을 제안했습니다.

기존 파인튜닝 모델들은 손실 함수나 데이터 증강과 같은 세부 설정을 수작업으로 디자인했습니다. 이는 소수 샷 학습에 최적화된 설정을 찾는 데 한계가 있고, 최적의 성능을 보장하기 어렵습니다. 따라서 메타 러닝의 원리와 강화 학습(Reinforcement Learning)을 결합하여 파인튜닝의 학습 역학(Dynamics) 자체를 학습하게 했습니다.

결과적으로 블랙박스 형태의 복잡한 메타 모델 대신, 수학적으로 해석 가능한 형태의 손실 함수와 최적의 증강 강도를 도출해 냈습니다.

---

### 참고 자료

[원본 경로 #1](https://openaccess.thecvf.com/content/CVPR2023/papers/Demirel_Meta-Tuning_Loss_Functions_and_Data_Augmentation_for_Few-Shot_Object_Detection_CVPR_2023_paper.pdf)

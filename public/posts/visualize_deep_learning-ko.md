---
title: 'A generalized explanation framework for visualization of deep learning model predictions'
date: '2023-11-25'
tags: ['xai', 'paper review']
---

### Abstract

딥러닝 모델을 사용할 때 사용자는 모델의 예측을 이해하고 싶어하며 Galore(Generalized explanation framework)가 제안되기도 하였습니다.

해당 방법은 첫째로 왜 맞는지에 대해 숙고(deliberative)로 계산하고 둘째로 왜 아닌지에 대해 반사실적(counterfactual)로 계산합니다.

---

### Introduction

<img src="https://velog.velcdn.com/images/ski06043/post/23e7fa2c-92a0-4e61-a09c-59f55ad80f41/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Black-Box 성격은 여러 어려움을 초래하게 되는데 이를 해결하는 방법인 XAI(Explainable AI)가 제안되었습니다. 해당 패러다임에서는 속성함수를 사용하여 이미지 영역의 히트맵을 생성하게 되고 예를 들어 새라는 분류 속에서 부리와 같은 세밀한 분류를 요구하는 분야에서는 충분하지 않지만 큰 패러다임을 예측하는 것에는 효과적입니다. 따라서 이러한 매커니즘은 왜 맞는지와 왜 아닌지에 대해서 사용자에게 만족스러운 설명을 제공할 수 없다고 합니다.

Galore는 이러한 문제를 해결하기 위해 제안되었으며, 분류 모델에 신뢰도 점수를 활용하여 상위 클래스 간의 확률 유사성과 실제 예측 확률 등 self-awareness 능력을 갖추었다고 합니다.

---

### Galore

1.속성 기반 설명

이 설명은 분류기의 예측에 가능성이 있는 픽셀을 식별하는 것으로 직관적이지만 자칫 모든 요소에 대한 나열식이 될 수 있습니다. 여기서 문제는 이 설명이 통찰력은 줄 수 있으나 큰 패러다임 속에서 왜 그렇게 구분했는지에 대한 설명은 없다는 것입니다.

2.숙고 설명

시각적 개념은 항상 미묘한 차이를 가지고 있습니다. 따라서 분류에 상당한 모호성을 갖고 있습니다. 이러한 불확실성은 종종 사용자에게 예측 결과에 대한 타당성을 의심하도록 합니다.

3.반사실적 설명

이 설명은 2번처럼 정확한 설명을 할 수 있으며 추가적으로 "반대적인 상황을 가정하여 그것이 아니라면 이것이다." 라는 답변을 제공합니다.

---

### IMPLEMENTATION

1.Explanation Framework

H: X → Y는 이미지를 x∈X에서 클래스 y∈Y={1,…,C}로 매핑하며, 이는 y*=argmax h(x)로 표현됩니다.  
여기서 h(x)는 합성곱으로 계산되고 $y^*$는 self-aware로서 이미지 x가 예측된 클래스 $y^*$에 속할 가능성을 나타내는 신뢰 점수를 생성합니다.

2.Attributive explanations

기여 함수 a는 일반적으로 입력 이미지 x에 대해 추출된 공간적 크기 W×H 와 채널 수 D를 가지는 활성화 텐서에 적용됩니다. 대부분의 텐서 F는 h(x)에 대한 그래디언트 변형입니다.

3.Counterfactual Explanations

<img src="https://velog.velcdn.com/images/ski06043/post/c6aa5505-e9b0-4da7-8218-ddf90b1f6620/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

반사실적 설명은 이미지 x, 예측 결과 y*, 그리고 사용자가 제공한 반사실적 클래스 $y_c ≠ y*$를 가정합니다. 일반적인 접근 방식은 클래스에 속하는 이미지와 입력 이미지 사이의 차이를 강조하고 매칭된 경계를 표시하는 것입니다.

$$
R(x, y^*, y_c, x_c) = (D(x, y^*, y_c), D(x_c, y_c, y^*))
$$

위처럼 두 개의 히트맵으로 계산하며 첫 번째 히트맵은 입력 x의 예측 클래스에는 유용하지만 반사실적 클래스에는 유용하지 않은 영역을 식별하도록 하고 두 번째 히트맵은 임의의 이미지 $x_c$에 대해 반사실적 클래스에는 유용하지만 예측 클래스에는 유용하지 않은 영역을 식별하도록 합니다.

---

### 참고 자료

[원본 경로 #1](https://ieeexplore.ieee.org/document/10034989)

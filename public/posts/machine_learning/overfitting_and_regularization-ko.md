---
title: 'Overfitting and Regularization'
date: '2022-07-19'
tags: ['Machine Learning', 'lecture']
---

### Overfitting

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfyZujKWwrLfuHBADbRrfaj8DUnjATuNYitA&s" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

모델에 사용할 데이터셋을 train, valid, test로 나누어서 train에 과적합 되어 에러가 작은 모델을 선택하지 말고 validation에 에러가 적은 데이터를 선택하는 것이 현명합니다.

<img src="https://miro.medium.com/v2/resize:fit:1400/1*0VWDpLIRcMTssDf-zyOR4w.jpeg" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

학습 과정에서 training curve는 꾸준히 감소하는 게 당연한데 validation curve는 감소하다가 중간에 올라가는 곡선을 갖는 것이 일반적인 상황입니다. 곡선의 초반에는 train, validation 곡선 모두 천천히 하강합니다. 그러다가 어느 순간 validation 곡선이 flat해지는데 이후에는 train에 존재하는 마이너한 특징들에 과적합이 진행이 되는 양상입니다.

<img src="https://cdn.prod.website-files.com/614c82ed388d53640613982e/6360ef26a44bba38e5a48fb2_good-fitting-model-vs-overfitting-model-1.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Overfitting(과적합)은 모델이 일반적인 트렌드만 학습되어지는 것이 아니라 학습 데이터의 노이즈까지 학습되어지는 상황에서 학습 곡선은 점차 나아지지만 검증 곡선은 점차 나빠지는 결과를 초래합니다. 차원이 $n$이면 데이터의 양은 적어도 $e^n$만큼 존재하여야 하지만 그렇지 않을 때 주로 겪게 됩니다. 한편으로 undefitting(과소적합)의 경우에는 학습 데이터의 일반적인 트렌드조차 학습이 조금 되어 분류를 정상적으로 할 수 없기 때문에 이 둘 사이 적절한 지점을 찾아야 합니다.

---

### Early stopping

과적합이 되기 이전에 검증 곡선이 flat해지는 시점에서 어느 시점에 멈출 것인가를 고민하여 이 방법이 나왔습니다.

train, validation, eval을 모두 독립적으로 관찰된 i.i.d 가정 하에 split하고 데이터의 수량이 충분히 크다면 train 데이터에 있는 noise가 validation에 없는 그 순간과 eval에 없는 그 순간을 독립이라고 하며 대체로 같은 시점일 가능성이 높습니다.

---

### Regularization

<img src="https://ethanwicker.com/assets/img/2021-03-03-regularization-ridge-regression-lasso-001-fig-1.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

모델을 cross validation을 통해 여러 결과를 조합하여 model selection하는 것은 좋은 방법이지만 시간이 많이 소요됩니다.

따라서 underfitting, overfitting 사이 존재하는 변인 $\beta_i$를 사용하지 않을 때는 0을, 사용할 때는 0이 아닌 값(non-zero)를 갖도록 유도합니다.

#### Shrinkage methods

<img src="https://journals.sagepub.com/cms/10.1177/1536867X20909697/asset/989c252a-d88a-45dc-8cc7-ee313b9aa8c9/assets/images/large/10.1177_1536867x20909697-fig1.jpg" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

coefficient값들이 0으로 가까워지도록 제약을 주는 메서드입니다.

least square는 $\beta_0, \beta_1, \dots, \beta_p$를 추정하기 위해 residual sum of squares(RSS)를 최소화합니다.

이 때 Ridge regression은 least square에 제약을 추가합니다. 그 제약은 $\lambda|\beta|_2^2$로 제곱을 더하여 $RSS=\sum_{i=1}^{n}(y_i-(\hat{\beta_0} + \hat{\beta_1}x_i))^2 + \lambda|\beta|_2^2$로 정의합니다. 제약조건이 최소화되는 경우는 $\beta$가 0일 때이고 양수나 음수 어느 방향으로든 값을 갖게 되는 순간 최소화 목적에 반대되는 영향을 끼칩니다. least square가 최소화될 때에 제약조건이 커질 수 있도록 $\lambda$계수를 통해 조절하게 됩니다. 제약조건을 그리면 ridge는 원형이 됩니다. 그렇기 때문에 각 coefficient는 같은 속도로 0까지 줄어들지만 0이 되지는 않습니다.

다음으로 Lasso regression은 절댓값을 더합니다. 그 제약은 $\lambda|\beta|_1$이고 이를 사용하는 목적은 위와 동일하지만 lasso는 sparse model로 작은 서브셋을 취급합니다. 그리고 ridge와 다르게 어떤 coefficient는 0이 되는 결과를 얻기도 합니다.

이러한 제약조건을 붙이기 앞서 주의할 점은 각 coefficient는 scale의 차이가 분명 존재할 것이기 때문에 scale equivariant를 위하여 standardizing을 진행하는 것이 필요합니다.

$\lambda$계수가 커질 수록 모델은 simple해지고 overfitting이 약화됩니다. 그 결과 variance가 낮아지고 bias가 높아집니다. 이 파라미터 역시 cross validation을 통해 $[0,1]$사이 수치 중 어떤 수치에서 fit한지 확인하여 결정합니다.

---

### Model selection

coefficient 즉 파라미터 개수가 적으면 적을수록 simple(=rigid)한 경계를 나타내고 smooth한 기울기를 갖습니다. 반대로 파라미터 개수가 많으면 flexible한 경계와 irregular한 기울기를 갖습니다.

강한 제약조건 파라미터 $\lambda$를 주게되면 모델은 심플해지며 underfitting됩니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/5nVeXPeGDYM?si=GUJ_onQFYi2mXMlt)
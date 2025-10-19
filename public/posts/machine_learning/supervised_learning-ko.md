---
title: 'Supervised learning'
date: '2022-07-08'
tags: ['Machine Learning', 'lecture']
---

### Artificial Intelligence

인공지능은 어떤 기계나 소프트웨어가 지능을 갖도록 만드는 것입니다. 여기서 '지능'이란 자연적으로 사람 또는 동물이 지니고 있는 지능의 수준이 아니라 인공적으로 만들어 낸 수준입니다.

인공지능의 지능을 사람 수준으로 끌어올린다면 좋지만 사람의 뇌는 무수히 많은 역할을 하며 복잡하기 때문에 아직까지 그것을 단순히 흉내내는 정도에 그치고 있습니다.

<img src="https://i0.wp.com/www.phdata.io/wp-content/uploads/2022/03/Data-Science-Terms-You-Should-Know-The-Difference-Between-AI-ML-and-DL-Image-1.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

기계학습은 인공지능의 한 분야로서 통계적인 알고리즘을 사용하여 보이는 데이터로 학습하고 보이지 않는 데이터에 적용시키는 학문입니다.

<img src="https://cdn.prod.website-files.com/614c82ed388d53640613982e/63ef769f6a877d715fa75008_supervised%20vs%20Unsupervised%20learning.jpg" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

기계학습 분야에는 위 이미지처럼 supervised learning(지도학습), unsupervised learning(비지도학습)이 있습니다. 지도학습에서는 미리 라벨을 정하고 수많은 데이터가 구축되어 있을 때 높은 성능을 보일 수 있습니다. 그리고 비지도학습에서는 라벨이 없는 상태에서도 모델이 스스로 라벨을 유추할 수 있게 합니다.

---

### Supervised learning

지도학습은 data driven 접근법이고 모델이 간단하게 $f(x)=ax$로 디자인 되었다고 했을 때 모델의 목표인 $y$를 $y=f(x)$가 되도록 정의합니다. 이 때 파라미터인 $a$가 학습 데이터 쌍인 $\{(x_i,y_i) : i=1, \dots, n\}$를 통해 목표에 근접하도록 만들어지기 위해서 보이지 않는 데이터 $x$가 $\hat{y}=ax$를 통해 계산을 하는 것으로 추정치인 $\hat{y}$로 추정이 가능해질 수 있습니다.

<img src="https://louis.pressbooks.pub/app/uploads/sites/63/2023/07/8.8-01.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

지도학습 중 하나인 회귀(regression)가 위의 접근대로 진행이 되며 $x$가 입력이고 $y$가 결과에 해당합니다. 또한 여러 $x$ 집합 중에 어떤 것이 결과인 $y$를 표현하는데 분명히 어떤 변수는 상대적으로 중요하지 않게 작용하기도 합니다. 이미지를 보면 $x$가 $60$과 $80$ 사이일 때 결과값이 몰려있음을 확인할 수 있고 이를 수식으로 표현하면 $f(60<x<80)=E(y|x=\{60<x<80\})$로 나타낼 수 있습니다.

대부분의 통계적 학습법에서는 모수이거나 비모수일 때로 구분됩니다. 모수 기반 모델은 입력과 결과의 관계를 대변하고 이는 수식적으로 $f_L(x)=\beta_0 + \beta_1 x_1 + \beta_2 x_2 + \cdots + \beta_p x_p$로 나타낼 수 있습니다. 예를 들어 변수가 education, seniority가 있을 때 각 모수(파라미터)를 곱하여 결과값을 예측할 수 있도록 선 또는 공간을 그어줄 수 있습니다.

반대로 비모수적 방법에서는 함수 $f$는 학습용 데이터에서 가장 값이 근접한 데이터 포인트를 가져오게 됩니다. 그리고 모수는 선형성을 가정하지만 비모수는 가정을 하지 않습니다.

---

### Regression Function $f(x)$

정답 포인트인 $Y$와 예측 포인트인 $\bar{f}(X)$가 $X=x$에 대해서 성립하는 평균값을 $E[(Y-\bar{f}(X))^2|X=x]$와 같이 표현하게 되는데 여기서 정답 포인트는 $f(X)$로 대체가 가능하고 어쩔 수 없이 발생하게 되는 오류(애러)값인 $\epsilon$의 합으로 풀어 나갈 수 있습니다. 따라서 $E[(f(X) + \epsilon + \bar{f}(X))^2|X=x]=|f(x)-\bar{f}(x)|^2+Var(\epsilon)$으로 전개할 수 있습니다.

$\epsilon=y-f(x)$는 줄일 수 없는 오류로 우리가 정답 포인트를 알고 있다 하더라도 예측에 있어서 여전히 오류를 발생시킵니다. 그렇기 때문에 회귀 모형은 최대한 $|f(x)-\bar{f}(x)|^2$의 예측 가능한 부분을 최소화하는 것을 목적으로 합니다.

평가를 할 때 학습용 데이터를 MSE하게 된다면 학습용 데이터에 대해서는 과적합되는 형상을 보이게 될 것입니다. 그 이유는 학습용 데이터가 눈에 보이는 데이터로 작용하기 때문입니다. 하지만 진짜 목표는 눈에 보이지 않는 새로운 데이터가 들어와도 잘 맞출 수 있는 능력입니다.

---

### Bias Variance Trade off

$$
E[y_0-\bar{f}(x_0)]^2=Var(\bar{f}(x_0)) + [Bias(\bar{f}(x_0))]^2 + Var(\epsilon)
$$

위에서처럼 $\bar{f}(x)$ 모델에 fit하기 위해 학습을 시키고 실제 값과 예측 값과의 오차 제곱의 기댓값은 예측 값의 분산과 정답에서 점점 벗어나는 경향인 bias의 제곱, 오차의 분산의 합으로 나타낼 수 있습니다.

---

### Classification Problem

정답 값이 qualitative, categorical인 경우 분류 문제라고 합니다. 따라서 이 문제는 모델 $f(x)$가 클래스 라벨을 정확히 관측하는 것을 목적으로 합니다. 평가를 할 때는 회귀에서는 정답과 예측의 오차를 사용하였다면 분류에서는 정답과 예측의 일치성을 확인합니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/t4mnIljwN7M?si=4JphpNxaFO8PF_tZ)
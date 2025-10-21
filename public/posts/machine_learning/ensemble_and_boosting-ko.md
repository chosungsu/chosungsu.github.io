---
title: 'Ensemble and Boosting'
date: '2022-07-26'
tags: ['Machine Learning', 'lecture']
---

### Bootstrapping

<img src="https://media.geeksforgeeks.org/wp-content/uploads/20240610153827/Bootstrap-Method.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

머신러닝은 데이터의 양이 제한될 때 어려움을 겪습니다. 하지만 부트스트랩은 새로운 데이터를 얻는 것보다 지금 상황에서 개선을 해보는 것을 우선합니다. 지금 갖고 있는 데이터 중 일부를 지속적으로 뽑아서 개별 모델을 fit하게 갖고 가는 방법입니다. 대신 추출할 때 비복원이 아닌 복원으로 겹치는 데이터를 허용하도록 합니다.

$$
SE_B(\hat{\alpha}) = \sqrt{\frac{1}{B-1} \sum_{r=1}^B (\hat{\alpha^{*r}} - \bar{\hat{\alpha^*}})^2}
$$

Original data $Z$가 있을 때 $Z^{*1}, \dots, Z^{*B}$ 집합만큼 $B$번의 부트스트랩 데이터를 추출합니다. 이후 각 데이터에서 파라미터 $\alpha$를 추정하고 이에 대한 에러인 standard error $\hat{\alpha}$는 위와 같이 추정합니다.

부트스트랩은 샘플들이 모두 i.i.d(independant identically distribution)를 가정해야 하는데 예를 들어 시계열 데이터처럼 순서가 의미가 있는 경우 그 순서를 무시할 수는 없습니다. 그럴 경우 블록으로 한 묶음 처리하여 추출할 수 있겠지만 이것은 부트스트랩의 한계로 생각될 수 있습니다.

그리고 부트스트랩은 $k$개의 데이터셋을 추출했고 $k-1$개로 학습한 이후 하나의 데이터셋으로 검증을 진행합니다. 이러한 과정은 $k$-fold cross validation으로 overlap이 없어야 예측 오차를 추정할 수 있지만 부트스트랩은 기본적으로 복원추출이므로 overlap을 발생시키고 있습니다. overlap되지 않는 데이터의 규모는 한 개의 데이터셋을 만들기 위한 $n$번의 복원 추출 과정이 있다면 $(1-\frac{1}{n})^n$의 확률로 한 번의 선택도 받지 못한 데이터 포인트가 있을 것이며 이는 $lim_{n \rightarrow \infty} (1 - \frac{1}{n})^n = e^{-1} \approx \frac{1}{3}$로 수렴합니다. 반대로 overlap 되는 데이터가 있을 확률은 $1-\frac{1}{3} = \frac{2}{3}$이 됩니다.

---

### Bagging

<img src="https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F271a92b4-5bd3-4cb1-9523-67460d1d95a3_2667x1646.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

$$
\hat{f}_{bag}(x) = \frac{1}{B} \sum_{b=1}^{B} \hat{f}^{*b}(x)
$$

$B$개의 부트스트랩 데이터가 있고 학습 데이터로 학습한 모델이 $\hat{f}^{*b}(x)$이면 예측을 평균 구할 수 있습니다. 이는 단순 평균이므로 regression, classification에 general하게 사용할 수 있습니다.

variance는 줄여주고 bias에는 영향을 주지 않습니다. 이는 각 부트스트랩 샘플로 학습된 모델들이 서로 다른 예측을 하더라도 평균을 취함으로써 예측값의 분산이 감소하기 때문입니다. 반면 bias는 각 모델이 비슷한 학습 데이터로부터 학습되므로 개별 모델의 bias가 그대로 유지됩니다.

배깅에서 단일 모델은 $E_{s} = E_x[(y_b(x) - h(x))^2] = E_x[\epsilon_b(x)^2]$로 정의하고 평균을 구하면 $\frac{1}{B} \sum_{b=1}^{B} E_x[\epsilon_b(x)^2]$로 구합니다. 여기서 $h(x)$는 정답 레이블을, $\epsilon$은 $b$번째 모델의 에러를 의미합니다.

이제 결합된 모델은 $E_{c} = E_x[(y(x)-h(x))^2] = E_x[(\frac{1}{B} \sum_{b=1}^{B}(y_b(x) - h(x)))^2]$으로 정의하는데 이는 각 모델의 예측값을 평균낸 후 오차를 구한 것입니다.

이 때 Jensen's inequality에 의해 다음과 같은 관계가 성립합니다.

$$
E_c \leq E_s
$$

즉, 결합 모델의 예측 오차가 단일 모델들의 평균 예측 오차보다 작거나 같습니다. 이는 convex function의 특성 때문인데, 제곱 함수가 convex하기 때문에 평균을 취한 후 제곱하는 것이 각각 제곱한 것의 평균보다 작거나 같게 됩니다.

만약 각 모델들이 완전히 독립적이고 동일한 오차 분포를 가진다면, 결합 모델의 예측 오차는 단일 모델 오차의 $\frac{1}{B}$배가 됩니다.

---

### Bagging with Decision trees

Random forests는 기본 Decision trees에서 training samples를 bootstrap으로 추출하고 각 tree별로 전체 $p$개의 predictors 중에 $m$개의 랜덤한 서브셋을 선정합니다. 이 $m$의 크기는 $\sqrt{p}$개 정도가 적합합니다.

---

### Boosting

<img src="https://substackcdn.com/image/fetch/$s_!_sOz!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3ed1ed6d-2387-47f9-817e-26cfd74843ce_2667x1939.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

배깅은 원 데이터에서 bootstrap으로 다수의 복사 데이터를 추출하고 개별 모델의 결과를 합쳐서 단일 모델로 생성하는 알고리즘이라면 부스팅은 유사하지만 weak learner를 통한 시퀀셜한 학습을 유도한다는 차이가 있습니다.

weak learner에서 learner가 싱글 모델을 의미하고 랜덤 예측보다 더 나은 결과를 가져오도록 합니다. 그리고 현재의 모델 성능을 기반하여 다음 학습에서 가중치를 조절합니다.

레이블이 바이너리이고 가중치 $D_1(i) = \frac{1}{n}$로 샘플 가중치 설정하고 uniform distribution으로 시작합니다. $T$개의 base learner를 시퀀셜하게 학습할 것이고 각 learner는 가중치 $D_t$로 샘플링한 학습 데이터로 학습됩니다. 그리고 오답률 $\epsilon_t = P_{D_t}[h_t(x_i) \ne y_i]$로 구하고 $\alpha_t = \frac{1}{2} log \frac{1-\epsilon_t}{\epsilon_t}$로 로그값을 만듭니다. 이를 사용하여 $\forall D_{t+1}(i) = D_t(i) e^{-\alpha_t y_i h_t(x_i)}$로 정답을 예측한 샘플들에서는 다음 시점의 가중치 $D_{t+1}$가 $D_t$보다 작아져야 하고 반대의 경우 $D_t$보다 커져야 합니다. 그 이후 $D_{t+1}(i) = \frac{D_{t+1}(i)}{\sum_{j=1}^{n} D_{t+1}(j)}$로 분모의 합이 1이 되도록 정규화하고 결과인 $H(x)$에 대해서 sign을 취한 $sign(\sum_{t=1}^T \alpha_th_t(x))$의 값으로 정의가 되도록 합니다.

$\alpha$값이 양수이면 정답확률이 에러확률보다 크다는 의미이고 음수이면 그 반대입니다. 하지만 base classifier는 최소 50%의 정답확률을 갖도록 부스팅하여야 합니다. 그리고 부스팅은 overfitting에 강건한 특징을 갖습니다.

regression boosting은 residual(잔차)를 통한 학습을 진행하게 되는데 $f(x)=0$, $r_1(i)=y_i$로 설정하는데 잔차의 초기값은 레이블 전체로 생각하면 됩니다. base learner는 학습 데이터 쌍으로 $\{x_i, r_t(i)\}$를 통해 새로운 base learner인 $f(x) \leftarrow f(x) + \lambda f_t(x)$로 업데이트합니다. 그리고 잔차는 $r_{t+1}(i) = r_t(i) - \lambda f_t(x_i)$로 업데이트합니다. 부스팅 모델의 결과는 $f(x) = \lambda (f_1(x) + \dots + f_T(x))$로 여기서 shrinkage 파라미터인 $\lambda$가 점진적 프로세스 관리를 하며 각각 다른 learner를 통해 residuals를 공격하는 것을 허용하는 역할을 합니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/jske-PHPTHw?si=BZ-sv_yRopi9Kkbj)
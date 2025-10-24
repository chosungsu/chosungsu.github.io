---
title: 'Training neural network'
date: '2022-08-16'
tags: ['Deep Learning', 'lecture']
---

### Activation function

#### 1. Sigmoid

<img src="https://media.licdn.com/dms/image/v2/D4D12AQGIXdSG7IJCNw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1694183259537?e=2147483647&v=beta&t=lJ_qEzot0iGYhNpez9XGRNHjS-CDKHn3Wj-6iCQxRO0" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Sigmoid function은 output range가 $[0,1]$이고 $\sigma(x) = \frac{1}{1+e^{-x}}$로 수식이 표현되지만 $x$가 $-\infty$, $\infty$로 발산하는 경우에는 각각 기울기가 0으로 소실되어 gradient vanishing문제가 있고, sigmoid 중심은 0으로 중심화되지 않았고, exp 함수는 코스트가 비싸다는 문제가 있어서 사용되지 않습니다.

<img src="https://img-blog.csdn.net/20171019115510853?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZ3VveXVuZmVpMjA=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

우선 이 함수를 미분해보면 $\frac{\partial \sigma(x)}{\partial x} = \frac{\partial}{\partial x} \cdot \frac{1}{1+e^{-x}} = \frac{e^{-x}}{(1+e^{-x})^2}=\sigma(x)(1-\sigma(x))$가 되며 $x=10$일 때의 미분은 0에 가까워지고 $x=-10$일 때의 미분 역시 0에 가까워집니다. 따라서 미분 그래프를 시각화하면 정규화 곡선으로 대칭이 됩니다. 위 이미지에서 볼 수 있듯이 backpropagation을 진행하면 미분이 $x$가 절댓값 5 이상이 되는 순간 미분이 0이 된다면 더 이전의 업스트림 값과 local gradient로 backpropagation에는 모두 0으로 변하는 문제가 생기는 것입니다.

다음으로 local gradient를 $\frac{\partial \sigma}{\partial w_i} = \sigma(w^Tx+b)(1-\sigma(w^Tx+b)) \cdot x_i$로 전개해볼 수 있으며 내적 좌측 항은 항상 $[0,1]$ 범위를 가지므로 음수가 되지 않습니다. 또한 내적 우측 항은 항상 양수를 가진다고 가정하였으므로 미분이 한 방향으로 쏠리게 되고 이는 sigmoid가 모든 gradient 요소들이 함께 양수 또는 음수 등 방향을 설정하게 되어 생각보다 불필요한 움직임을 보이게 됩니다.

#### 2. Tanh

<img src="https://www.oreilly.com/api/v2/epubs/urn:orm:book:9781788996921/files/assets/58f98f0c-6a81-4acc-bafb-9b0f683ad9c9.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

tanh 함수는 범위가 $[-1, 1]$이며 0으로 중심화되어 있습니다. 하지만 이 역시 gradient vanishing 문제가 남아 있습니다. 그 이유는 tanh가 $2 \sigma(2x)-1$로 sigmoid 함수의 스케일된 함수이기 때문입니다.

#### 3. Relu

<img src="https://media.geeksforgeeks.org/wp-content/uploads/20250129162127770664/Relu-activation-function.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

relu는 $\text{max}(0,x)$로 그래프가 그려지고 이 덕분에 양수에서는 saturate가 되지 않습니다. 계산 코스트도 효율적이고 gradient vanish를 일으키지 않아 수렴도 빠릅니다.

하지만 0으로 중심화가 되어있지 않고 $x=0$에서는 미분이 되지 않습니다. 그리고 음수일 때는 dead relu(기울기가 0으로 업데이트가 되지 않는 문제)가 발생합니다. 따라서 positive biases로 0.01과 같은 상수항을 곱하는 함수(leaky relu)를 사용합니다.

---

### Machine learning approaches

#### 1. Zero centering

<img src="https://www.researchgate.net/publication/337401161/figure/fig11/AS:897901463076880@1591087799638/Mean-subtraction-Zero-centering-the-datasource-http-cs231nstanfordedu.ppm" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

PCA에서도 다루었던 방법으로 zero centering은 original data에서 global mean을 뺀 data를 만드는 과정을 말합니다.

#### 2. Weight initialization

small gaussian random은 랜덤 값에 0.01과 같은 작은 상수항을 곱하여 분포를 만듭니다. tanh에서는 미분하면 $\frac{\partial tanh(Wx+b)}{\partial W} = tanh(Wx+b)' \times x$로 $x=0$이면 0으로 미분값이 만들어집니다. 이는 학습이 진행되지 않습니다. 또한 $tanh(Wx+b)' = (1-tanh(Wx+b)^2)$이므로 $tanh(Wx+b)^2=1$이 되는 0.5와 같은 큰 상수항에서도 0으로 미분값이 만들어져서 학습이 진행되지 않습니다.

$$
\frac{\text{rand}(x,y)}{\sqrt{x}}
$$

이러한 문제를 해결하기 위해 xavier initialization이 나오게 되었는데 이는 랜덤 값을 인풋값을 루트 씌운 값으로 나누는 방법입니다. conv-layers에서는 인풋값을 필터의 크기와 채널 수를 곱한 $F^2C$라고 생각하면 됩니다.

#### 3. Learning rate

Decaying learning rate은 초기에 큰 값의 learning rate를 사용하여 빠르게 경사하강을 하다가 점차 줄여나가서 수렴을 하는 것이고 constant learning rate은 처음부터 끝까지 일관된 learning rate를 사용하는 것입니다.

너무 그 값이 크면 loss를 낮추는 지점을 지나칠 수 있으며 너무 작으면 수렴 속도가 늦어지는 단점이 있어서 대부분의 경우에는 Decaying learning rate를 사용합니다.

---

### Deep learning approaches

#### 1. Optimization idea by ML

모델이 general trend를 학습하다가 학습 데이터에 noise가 포함되어 있다면 이 noise도 학습을 하게 됩니다. overfitting 이후에는 학습 데이터에만 성능이 좋고 평가 데이터에는 갈수록 나빠집니다.

따라서 목적식에 penalty term을 삽입하여 모델을 정규화함으로써 가중치 $\beta, w$ 등을 필연적으로 0 또는 0에 가까워지도록 강제하는 것을 말합니다.

예를 들어 linear regression의 목적식이 $\underset{\theta}{\text{min}} (Y-X\theta)^T(Y-X\theta)$로 $\theta$의 추정치인 $\hat{\theta} = (X^TX)^{-1}X^TY$으로 정의가 됩니다. penalty term을 추가하게 되면 $\hat{\theta} = (X^TX + \lambda I)^{-1}X^TY$ 이런 형태의 추정치가 정의가 됩니다. penalty term의 $\theta$는 앞의 기본 목적식이 충분히 커서 이득을 줄일 필요가 있을 때에 이 항을 크게 잡을 수 있습니다.

이제 딥러닝에서도 overfitting은 존재하므로 weight decay, early stopping, dropout 등으로 해결을 할 수 있습니다.

$$
\Omega(W) = \sum_i \sum_j W_{i,j}^2, \\
\Omega(W) = \sum_i \sum_j |W_{i,j}|
$$

첫째로 weight decay는 ridge regression($L_2$), lasso($L_1$)를 neural network에 적용하는 것으로 위와 같은 간단한 penalty term을 추가합니다.

<img src="https://fouryears.eu/wp-content/uploads/2017/12/early_stopping.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

다음으로 early stopping은 말 그대로 평가 데이터가 overfitting되는 시점에 멈추는 작업입니다. overfitting을 조금이라도 늦추는 방법은 절대 평가 데이터를 학습과 검증에 사용하지 않아야 한다는 것입니다.

<img src="https://kh-kim.github.io/nlp_with_deep_learning_blog/assets/images/1-14/04-dropout_overview.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

마지막으로 dropout은 forward pass에서 일부 neurons를 zero로 랜덤하게 설정하는 것으로 일반적으로 0.5를 바꾸도록 많이 씁니다.

예를 들면 고양이의 눈, 코, 입으로 각 clues를 쪼갠 다음 일부를 가린 이미지를 학습시켜도 고양이 임을 인지하게 된다면 가리지 않은 original image에도 성능이 좋아질 가능성이 높으므로 도움이 됩니다. 이 방법은 평가 시에는 사용하지 않습니다.

#### 2. Optimization beyond SGD

SGD의 문제점 3가지는 아래와 같습니다.

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6olWv-U4vKYI3Okjvt7O29F_jU_17nOkV5Q&s" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

-loss가 한 방향이 다른 쪽보다 더 빠르게 감소할 때, 진행속도가 매우 느려집니다.

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0PnDcRjXeFD1TG1-nrIPGLv-Ni-tuH8c1Aw&s" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

-local minimum 또는 saddle point에서 미분이 0이 되고 멈춥니다.

<img src="https://classic.d2l.ai/_images/output_minibatch-sgd_f4d60f_147_0.svg" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

-gradient가 mini batch에서 계산되고 정확도가 떨어질 수 있습니다.

이러한 SGD의 문제점을 해결할 수 있도록 다른 매커니즘을 결합한 연구가 진행되었습니다. 첫번째로는 SGD + Momentum인데 이는 물리 정의처럼 질량$\times$속도인 모멘텀을 사용하여 기존 SGD 공식이 $x_{t+1} = x_t + \alpha \nabla f(x_t)$이지만 모멘텀 $v_{t+1}$를 $\rho v_t - \alpha \nabla f(x_t)$와 같이 정의 후 $x_{t+1} = x_t + v_{t+1}$로 재정의하게 됩니다. 모멘텀을 추가함으로써 SGD는 local minima와 saddle point 지점에서도 관성에 의해 움직임을 잃지 않게 됩니다. 여기서 $\rho$라는 파라미터는 모멘텀의 정도를 조절하는 discount factor로 이 값이 1이면 이전 속도를 줄이지 않고 0.9이면 이전 속도의 90% 속도로 감소해나가는 역할을 합니다.

다음으로는 Adagrad로 각 요소별로 learning rate를 조절하여 element-wise scaling을 진행하는데 $d$차원의 벡터의 미분값을 계산하여 sum of squares의 루트값으로 나누면서 learning rate을 조절합니다. 이를 통해 가파른 쪽(미분이 큰 쪽)으로의 이동은 느리게, 완만한 쪽으로의 이동은 빠르게 이동할 수 있게 합니다.

RMSProp은 Adagrad의 방법에 추가로 decay rate을 접목한 것으로 Adagrad가 gradient값을 제곰하여 더한 분모값이 증가하는 방향으로만 진행되므로 빨리 움직이는 효과가 있다기 보다는 천천히 움직이는 것과 조금 천천히 움직이는 것의 차이만 있다는 약점이 있어서 이를 보완하고자 이전에 누적된 gradient에 $dr$을 곱하고 현재 gradient에 $(1-dr)$을 곱하도록 하였습니다.

마지막으로 Adam은 RMSProp과 momentum을 결합한 것으로 momentum을 먼저 진행하는데 이 때 누적된 gradient에 $beta_1$을, 현재의 gradient에 $(1-beta_1)$을 곱합니다. 이후 Adagrad RMSProp으로 역시 누적된 gradient에 $beta_2$를, 현재의 gradient 제곱에 $(1-beta_2)$를 곱하고 이 루트값을 분모에 사용합니다.

#### 3. Batch norm

$$
\hat{x}^{(k)} = \frac{x^{(k)} - E[x^{(k)}]}{\sqrt{Var[x^{(k)}]}}
$$

batch norm은 각 차원별 unit에 0을 평균화하기 위해 위와 같이 정규화합니다. 예를 들어 $N \times D$인 batch norm된 입력이 있으면 평균과 분산은 모두 $D$차원입니다.

<img src="https://forums.fast.ai/uploads/default/original/2X/9/998a1be6463260f731481106756034c42040e256.jpg" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

일반적으로 batch norm은 fc-layer 또는 conv-layer 이후에 연결되거나 activation function 이전에 연결됩니다.

<img src="https://media.geeksforgeeks.org/wp-content/uploads/20250114183648606652/What-is-Group-Normalization_.jpg" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

최근에는 차원의 개수만큼 norm이 있는 Layer norm, 개별로 있는 Instance norm, group으로 있는 Group norm 등 정규화 기법들이 새로 나오고 있습니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/IsQb1XXXEQc?si=uf_8bnfh06cb2nUO)

[원본 경로 #2](https://youtu.be/0nO8oGkCfZQ?si=xsPphnxX_J3piJC2)
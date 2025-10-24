---
title: 'Neural networks and backpropagation'
date: '2022-08-09'
tags: ['Deep Learning', 'lecture']
---

### Image features

이미지는 실제로 매우 복잡하기 때문에 입력과 결과를 pixel class로 매핑하는 것 대신에 입력을 대표하는 features를 추출하는 것을 연구하게 되었습니다. 예를 들면 color histogram, histogram of oriented gradients(HoG), bag of words 등이 대표적입니다.

<img src="https://miro.medium.com/max/800/0*sQzmiOf8Yb_18HX1.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

입력 이미지 $x$를 feature extraction하면 image features $z$를 벡터로 추출합니다. 이후 벡터들로 정답 레이블을 예측하는 function $f(z)$로 학습을 하고 loss로 업데이트합니다. 매번 새로 초기화한 image features로 학습을 진행하는 end to end 모델보다는 기존에 갖고 있는 백그라운드 지식이 존재한다면 그것을 녹여내는 작업이 선행되는 것이 좋습니다.

---

### Neural networks

#### Neuron

<img src="https://mblogthumb-phinf.pstatic.net/MjAxODEyMjBfMTkw/MDAxNTQ1Mjc5Nzc3NzIx.yM3u7h0fhk0D94uYngVRHpkiwEcQqsJh5kRhO1cUnf0g.ibIVrMGKL7NKCkTEjBIzJli4lpXNb0dPrYPjaRlkdGUg.PNG.ucbsong/neuron_perceptron.png?type=w800" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

위 이미지처럼 뉴럴 네트워크는 가지와 같이 여러 입력값을 한 번에 받게 되고 각 입력값에는 가중치가 곱해지게 됩니다. 이후에 $w_1 x_1 + w_2 x_2$를 function에 통과시키는데 function은 non-linear합니다.

#### XOR problem

<img src="https://blog.kakaocdn.net/dna/NalwG/btqxdrzsQAV/AAAAAAAAAAAAAAAAAAAAALcupiEZlPlneT1Ns3tgkQf_ZlAVgf17M7v_yjjOU7rS/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1761922799&allow_ip=&allow_referer=&signature=KwIb3lRGhON%2B%2B44WWwnEbIvQ708%3D" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

하지만 단일 퍼셉트론으로는 위 이미지와 같이 AND, OR조건은 구분지을 수 있었지만 XOR 조건에서는 문제 해결이 될 수 없었습니다. 이를 해결한 방법이 다중 퍼셉트론 (MLP)입니다.

#### MLP

<img src="https://www.allaboutcircuits.com/uploads/articles/an-introduction-to-training-theory-for-neural-networks_rk_aac_image2.jpg" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

MLP를 사용한 function은 $y=f(w_7h_1 + w_8h_2 + w_9h_3) = f(w_7(w_1x_1 + w_2x_2) + w_8(w_3x_1 + w_4x_2) + w_9(w_5x_1 + w_6x_2))$로 표현이 가능해집니다. 즉 activation function을 통과한 결과는 linear classifier와 같은 형태가 됩니다.

단일 퍼셉트론이라면 예를 들어 $x : 3072 \in R^d$이고 $s : 10 \in R^c$으로 입력과 결과를 정하면 가중치는 $w \in R^{c \times d}$가 되지만 다중 퍼셉트론이면 동일한 입력과 결과를 설정하고 사이에 히든 레이어층을 $h : 100$으로 추가하여 가중치가 $w_1 \in R^{h \times d}, w_2 \in R^{c \times h}$로 차원이 정해질 수 있습니다. 두 상황에서 function을 나타내면 $f(x) = Wx, f(x) = W_2(W_1 x)$이 되고 후자의 function식을 결합법칙을 따른다면 $W_1$을 입력에 곱하고 이후에 $W_2$를 곱하는 것과 $W_2, W_1$을 먼저 곱하고 이후에 입력을 곱하는 것이 동일하다면 결국 전자의 function과 같게 됩니다. 따라서 MLP에서의 function에는 각 가중치 앞에 non-linear한 activation을 표현해야 합니다.

예를 들면 sigmoid, tanh, relu 등이 있습니다.

#### Computing gradient

위의 MLP를 계산하는 방법으로 gradient descent가 있는데 각 가중치에 대해서 $\frac{\partial L}{\partial W_1}, \frac{\partial L}{\partial W_2}$와 같이 classification loss를 표현합니다. 각 가중치는 $\theta_n = \theta_o - \alpha \nabla_{\theta} J(\theta)$와 같이 업데이트를 하게 됩니다.

예를 들면 결과를 $L = (\hat{y} - y)^2$라고 한다면 $\frac{\partial L}{\partial \hat{y}} = 2(\hat{y} - y), \frac{\partial L}{\partial W_2} = \frac{\partial L \cdot \partial \hat{y}}{\partial \hat{y} \cdot \partial W_2} = 2(\hat{y} - y) \cdot \sigma (W_1x)$로 미분이 됩니다. 그리고 $\frac{\partial L}{\partial W_1} = \frac{\partial L \cdot \partial \hat{y} \cdot \partial h}{\partial \hat{y} \cdot \partial h \cdot \partial W_1} = 2(\hat{y} - y) \cdot W_2 \cdot h(1-h) \cdot x$로 가중치에 대한 미분을 계산이 가능합니다.

---

### Backpropagation

<img src="https://editor.analyticsvidhya.com/uploads/18870backprop2.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

역전파는 지금까지 진행한 역순으로 결과에서 입력에 대한 가중치들을 업데이트하는 방법입니다. 예를 들어 $f(x,y,z) = (x+y)z$이고 $x=-2, y=5, z=-4$일 때, forward pass를 진행하면 $f(x,y,z) = (-2+5)*(-4) = -12$가 됩니다.

역전파는 전체 function인 $f$를 미분으로 표현하는 것으로 가장 마지막단인 결과쪽 미분은 $\frac{\partial f}{\partial f}=1$이 됩니다. 그리고 $z$에 대한 미분은 $\frac{\partial f}{\partial z} = \frac{\partial qz}{\partial z} = q, q \rightarrow (x+y) = 3$가 됩니다. 이어서 $x$에 대한 미분은 $\frac{\partial f}{\partial x} = \frac{\partial f \cdot \partial q}{\partial q \cdot \partial x} = \frac{\partial qz \cdot \partial (x+y)}{\partial q \cdot \partial x} = z \cdot 1, z \rightarrow -4$가 되며 마지막으로 $y$에 대한 미분은 $\frac{\partial f}{\partial y} = \frac{\partial f \cdot \partial q}{\partial q \cdot \partial y} = \frac{\partial qz \cdot \partial (x+y)}{\partial q \cdot \partial y} = z \cdot 1, z \rightarrow -4$가 됩니다.

<img src="https://blog.kakaocdn.net/dna/rXXaO/btqZkpTMMMV/AAAAAAAAAAAAAAAAAAAAACYJhqUhcm2UokY7w4EMRxXN7rjvZ-_ybrRDjx2i-bQO/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1761922799&allow_ip=&allow_referer=&signature=565McIykZyWCSdbqQyblgOIzhQg%3D" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

gradient 에는 4가지의 패턴이 있습니다. 첫번째로 add gate는 동일한 gradient를 분배하면 되고, 다음으로 mul gate는 forward pass의 가중치를 서로 swap하여 곱하면 되고, copy gate는 gradient를 덧셈하면 되고, max gate는 가장 큰 gradient로 할당하면 됩니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/niLF4XWkE-U?si=9czVH7bPVCAU-5K2)
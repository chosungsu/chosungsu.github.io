---
title: 'Sequential Data and Recurrent Neural Networks'
date: '2022-08-19'
tags: ['Deep Learning', 'lecture']
---

### Sequential Data

입력값 $x$에 대해서 레이블 $y$은 연속값으로 데이터가 형성됩니다. 예를 들어 $x_{1:i-1}$의 값을 통해 $y_i$를 예측하게 되고 이는 태풍의 경로 예측, 제품의 고장 예측 등 미래의 일을 예측하는 데 사용됩니다.

deep learning에서는 image captioning, q&a와 같이 단어들의 연속적인 이어짐에 의한 결과가 나오는 것 역시 sequential data라고 볼 수 있습니다.

<img src="https://blog.kakaocdn.net/dna/MYzgN/btqA3fa5uyw/AAAAAAAAAAAAAAAAAAAAACP86IyZtfIMCKp7z5CBtiLA_XZyxO_X786tVSAWfq8U/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1761922799&allow_ip=&allow_referer=&signature=oELqSRW6azFHVSKNm5C5AdIZzLA%3D" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

one-to-one은 input과 hidden layer, output 모두 하나씩 존재하는 경우입니다. 이제 sequential 데이터를 input에 받고 다수의 hidden layer를 갖추면서 output은 하나로 만드는 것을 many-to-one에 해당합니다. 그리고 output도 다수가 되는 것을 many-to-many라고 합니다.

---

### Word embedding

단어는 발화에 있어서 의미를 갖는 최소 단위를 말합니다. 기본적으로 단어사전을 만들고 모델에게 학습을 시키고 자연스러운 발화를 하는 것을 원하지만 실제 사람은 그런 작업은 불필요합니다.

지금까지 이미지, 음성 등을 벡터로 표현한 것처럼 텍스트도 벡터로 표현할 수 있으며 각 벡터들에는 시멘틱 요소를 할당하는 것을 embedding이라고 합니다. 이 임베딩을 통해서 가까운 의미의 단어들끼리는 벡터들이 붙어있을 수 있게 됩니다.

초기에는 word2vec이라는 개념이 등장했는데 대량의 단어 학습을 통해 current word를 neighboring words로 예측(Common Bag of words, CBOW)하거나 주어진 단어의 앞 뒤로 둘러싸는 단어들을 예측(Skip gram)하도록 합니다. 이 때 각 단어 벡터들은 우도를 최대화하는 목적식에 기반하는데 $L(\theta) = \prod_{t=1}^{N} \prod_{-m \le j \le m} p(w_{t+j}|w_t;\theta)$를 보면 $m$개의 neighboring vector를 확률로서 1 또는 0으로 판단하여 예측하는 방법입니다.

<img src="https://nlp.stanford.edu/projects/glove/images/man_woman.jpg" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

다음으로는 Glove라는 개념이 등장했고 global corpus 통계가 반영이 되는데 조건부 확률을 통해 계산하는 방법입니다.

$$
w_i^Tw_j = log P(i|j)
$$

위 수식은 $i$번째의 단어와 $j$번째의 단어 간의 조건부 확률을 의미하고 $J = \sum_{i,j=1}^{V} f(X_{ij})(w_i^T\hat{w}_j + b_i + \hat{b}_j - log X_{ij})^2$로 계산할 때 $\hat{x}_j$는 $i$번째 단어의 주변 단어이고 뒤에 $log X_{ij}$를 소거하는 것은 $j$번째 단어가 주어졌을 때 $i$번째 단어가 나올 조건부확률의 로그값으로 예를 들어 10번 나오면 1, 100번 나오면 2를 소거하여 횟수에 대한 조절을 해줄 수 있습니다.

---

### Recurrent Neural Networks(Many-to-one)

텍스트가 주어지고 긍정과 부정적인 늬앙스로 binary classification을 진행하는 경우 many to one으로 판단할 수 있습니다.

<img src="https://www.researchgate.net/publication/333752473/figure/fig3/AS:769346934693895@1560438011473/Proposed-CNN-on-multiple-word-embeddings-concatenated-at-embedding-layer.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

word2vec과 glove 같은 임베딩 알고리즘을 통해 텍스트를 임베딩하고 1D convolution filter를 사용하여 위와 같이 분류를 하는 것이 가능합니다. 하지만 cnn의 경우 입력값은 크기가 동일하도록 조정이 필요한데 단어라는 특성상 그것이 쉽지는 않습니다.

따라서 Encoder로 길이에 상관없이 전체 시퀀스를 받아서 전체 의미를 담아 하나의 임베딩에 할당하는 방법이 있는데 이는 임베딩 이후에 convolution filter 대신에 encoder도 대체하여 길이에 상관없이 classify합니다.

<img src="https://miro.medium.com/v2/resize:fit:1400/1*xs2EgGPGlpWrSW4zUANYXA.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

RNN은 one by one으로 입력 시퀀스를 읽게 되고 internal state를 유지하면서 이전에 읽은 데이터(old version)과 새로 들어온 데이터(new version)을 추가해서 새로운 internal state를 만들어 나가는 feedback loop 방법입니다. 처음에는 아무 정보가 없는 initial state $h_0$가 있으며 각 단계별로 입력값 $x_1, \dots, x_T$과 hidden state인 $h_1, \dots, h_{T-1}$를 sequence하게 학습하는 것으로 마지막 state인 $h_T$를 만들어 냅니다. 이 수식은 $h_t=f_w(h_{t-1}, x_t)$로 일반화할 수 있습니다. 이 때의 가중치 $w$는 모든 순간마다 동일한 값이며 fc-layer에서 $f_w(x) = \sigma(Wx)$로 표현한 것에서 가중치를 입력값에 따라 한 개에서 두 개($w_{hh}, w_{xh}$)로 늘리는 접근을 하였습니다.

$$
h_t = tanh(w_{hh}h_{t-1} + w_{xh}x_t)
$$

두 개로 늘린 가중치는 tanh라는 non-linear한 activation function에 씌우고 이와 같이 더하여 계산을 합니다. 마지막 hidden layer 이후에 $w_{hy}$가중치를 통해 $\hat{y}$를 예측하게 되고 binary classification에서는 $\hat{y} = \sigma(w_{hy}h_t)$로 시그모이드를 취해주면 됩니다.

---

### Language models

#### 1. n-grams

$n$-grams는 $n$개의 이전 단어들을 윈도우로 이동하면서 markov 평가를 하였던 방법입니다.

$$
P(w_1, \dots, w_m) = \prod_{i=1}^{m} P(w_i|w_1, \dots, w_{i-1})
$$

위 수식을 참고하여 unigram, bigram이 생기는데 unigram은 1개의 이전 단어를 참고하는 것으로 $P(w_2|w_1) = \frac{count(w_1, w_2)}{count(w_1)}$의 모습이고 bigram은 2개의 이전 단어를 참고하는 것으로 $P(w_3|w_1, w_2) = \frac{count(w_1, w_2, w_3)}{count(w_1, w_2)}$의 모습이 되어 분모에는 참고할 단어가 나타나는 횟수, 분자에는 현재의 단어와 참고할 단어가 모두 나타나는 횟수를 사용하여 계산하게 됩니다. 이러한 특징이 있어서 $n$이 클수록 당연히 좋은 성능을 갖게 되지만 메모리적으로 과부하를 일으키게 됩니다.

#### 2. rnn

rnn은 입력 길이에 한계를 갖지 않고 모델 크기에도 영향을 주지 않습니다. 하지만 feedback loop를 도는 계산이 매우 느리고 vanilla rnn의 경우 gradient vanishing, 장기 기억 소실 문제 등 여러 문제가 남아 있습니다.

rnn을 backpropagation하게 되면 hidden state 전이 부분에서는 $\frac{\partial L}{\partial W_{hh}} = \frac{\partial L}{\partial h_{t}} \cdot \frac{\partial h_{t}}{\partial W_{hh}}$, 입력 전이 부분에서는 $\frac{\partial L}{\partial W_{xh}} = \frac{\partial L}{\partial h_{t}} \cdot \frac{\partial h_{t}}{\partial W_{xh}}$의 형태로 $h$ state만 변경되고 동일하게 역전파가 될 것입니다.

vanilla rnn에서 $h_t = tanh(W_{hh}h_{t-1} + W_{xh}x_t)$를 backpropagation을 위해 미분한다면 $\frac{\partial h_t}{\partial h_{t-1}} = tanh'(W_{hh}h_{t-1} + W_{xh}x_t) \cdot W_{hh}$처럼 곱해진 가중치는 미분 시에 외부로 나오게 됩니다. 이를 chain rule을 적용시켜서 맨 처음 입력에 대한 loss까지 역전파하게 되면 $\frac{\partial L_t}{\partial W_{hh}} = \frac{\partial L_t}{\partial h_t} \cdot \frac{\partial h_t}{\partial h_{t-1}} \cdots \frac{\partial h_1}{\partial W_{hh}} = \frac{\partial L_t}{\partial h_t} \cdot (\prod_{k=2}^{t}tanh'(W_{hh}h_{k-1} + W_{xh}x_k))W_{hh}^{k-1} \cdot \frac{\partial h_1}{\partial W_{hh}}$와 같이 표현됩니다.

tanh를 미분하게 되면 tanh그래프가 $[-1,1]$사이의 $y$범위를 가지며 gradient는 $[0,1]$을 가짐을 알 수 있으므로 결과적으로 $k-1$번 곱해지는 위의 tanh'를 통해서 gradient vanishing 문제가 발생하게 됩니다. 또한 $W$가 충분히 큰 수라면 반대로 exploding gradient를 유발합니다.

---

### LSTM/GRU

지금 소개할 모델들은 RNN이 갖는 gradient vanishing, long term dependency 문제를 해결하기 위해 고안되었습니다.

#### LSTM

<img src="https://velog.velcdn.com/images/soup1997/post/d8e2cbf1-319d-4d65-aa11-4892381354e6/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

lstm은 vanilla rnn의 형태에서 이전의 기억된 hidden state인 $h_{t-1}$와 현재 입력인 $x_t$를 fc-layer에 모으고 이를 tanh function을 씌웁니다. 그리고 long term memory를 위해 cell state인 $c_{t-1}$을 도입하여 activation function을 통과한 값과 합산하여 $c_t$를 만듭니다.

위의 수정만으로는 부족하기 때문에 이전 로직에 forget gate을 추가합니다. 이 gate는 $h_{t-1}$와 $x_t$를 입력으로 받아서 fc-layer에 모으고 $\sigma$ function을 씌워 cell state에는 곱합니다. sigmoid는 $[0,1]$ 범위로 output을 만들기 때문에 1을 받으면 계속 기억을 하게 합니다.

이후에는 input gate를 통해 덧셈을 진행시켜 줍니다. input gate에는 tanh 말고도 sigmoid를 추가하여 서로 값을 곱한 다음에 cell state에 더합니다. 여기서는 새로 받은 단어가 어느 정도로 기억을 시킬지 정도를 반영하는 역할을 합니다.

마지막으로는 sigmoid를 씌워서 cell state에서 덧셈 이후 tanh를 가지친 값과 곱하여 output인 $h_t$에 적용합니다.

이러한 구조 덕분에 forget gate가 1이고 input gate가 0이면 cell state는 완벽하게 보존이 될 수 있습니다. gradient vanishing/exploding을 완전히 없애도록 보장할 수 없지만 장기 기억력 측면에서는 유용합니다.

#### GRU

<img src="https://blog.kakaocdn.net/dna/cWUO6M/btqOSxbT285/AAAAAAAAAAAAAAAAAAAAAEpjlo7q0u8szumdLmyDJnwwVzuMnoBdl86og-bkJC2g/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1761922799&allow_ip=&allow_referer=&signature=djMW2c06ea7BAV%2BF%2FpRrUuZ5N3U%3D" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

lstm에서 사용한 cell state, parameters를 사용하지 않고 convex combination을 사용하여 고안된 모델입니다. GRU는 LSTM보다 단순한 구조를 가지면서도 비슷한 성능을 보여주어 많이 사용됩니다.

$h_t = (1-z_t) \cdot h_{t-1} + z_t \cdot tanh(W_hx_t + U_h(r_t \cdot h_{t-1}) + b_h)$와 같이 combination 수식으로 마지막 hidden state를 계산합니다. 여기서 $z_t$는 update gate로 LSTM의 forget gate와 input gate를 합친 것과 같은 역할을 하며, $r_t$는 reset gate로 과거 정보를 얼마나 반영할지 결정합니다. 두 gate 모두 sigmoid 함수를 통과하여 0~1 사이의 값을 가집니다.

이러한 구조 덕분에 $z_t$가 0에 가까우면 이전 hidden state를 그대로 유지하고, 1에 가까우면 새로운 정보를 더 많이 반영하게 됩니다. 또한 $r_t$를 통해 불필요한 과거 정보는 효과적으로 제거할 수 있습니다.

---

### Encoder-Decoder structure

<img src="https://velog.velcdn.com/images/aurorab86/post/bae5ed95-82c6-4ef2-a889-587eee125570/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

encoder structure에서 output을 만들지 않고 모든 시퀀스의 단어들을 이해하게 하고 decoder structure에서는 동일한 의미의 단어들로 문장을 만들도록 합니다. 이 때 decoder에서 $<sos>$는 start of sentences라는 시작점을 의미하고 $<eos>$는 end of sentences라는 끝점을 의미합니다.

실제 단어와 예측한 단어 사이의 loss를 계산하여 auto regressive로 다음 입력에 업데이트를 하면서 사용합니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/02_f7jZgeyA?si=1Gj9VJ9VFxZryMht)

[원본 경로 #2](https://youtu.be/0bS99L8CwxA?si=4NE5h_9Z-kwoS3lk)
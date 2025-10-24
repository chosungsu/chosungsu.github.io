---
title: 'Transformer'
date: '2022-08-23'
tags: ['Deep Learning', 'lecture']
---

### Attention method

lstm/gru에서도 여전히 긴 시퀀스에는 완전한 해결이 되지 않으므로 attention method가 등장하였습니다. encoder-decoder structure를 통해서 동시 입출력이 가능하도록 설정할 수 있었지만 기억 용량에는 한계가 있습니다.

따라서 사람의 인지 능력처럼 중간에 어떤 단어들이 입력이 되고 hidden state를 통과하였는지를 기억하는 무언가가 필요하다고 생각을 하게 되었습니다.

Attention method는 $(Q, K, V)$라는 value를 가지며 context인 query, key-value pairs를 사용합니다. 그리고 attention value는 values들의 가중평균입니다. seq2seq 모델에서는 $Q$를 decoder에서 $t$시점의 hidden state이고 $K$를 encoder에서 모든 시점의 hidden state, $V$를 encoder에서 모든 시점의 hidden state로 사용합니다.

<img src="https://wikidocs.net/images/page/22893/dotproductattention4_final.PNG" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

즉, decoder에서 초기 hidden state인 $s_0$이 query의 시작입니다. 그리고 encoder에서 각 hidden state인 $h_1, \cdots, h_n$와 내적$([s_t^Th_1, \dots, s_t^Th_T])$하여 합한 것을 attention score $e_t$라고 해서 softmax를 씌워 coefficients $\alpha_t$로 만듭니다. 이후에 value로 동일한 hidden state를 사용할 것이고 이를 $\alpha_t$와 곱해서 weighted sum을 만들어 하나의 벡터인 attention value $a_t$가 생성됩니다. 이 value를 query와 결합하여 fc-layer, tanh를 투영하여 크기를 다시 맞추어 $\hat{s}_0$로 변환합니다.

---

### Transformer

입력 $x$가 다수의 요소로 쪼개질 수 있고 그것은 서로에게 유기적으로 연관이 있을 것이라고 가정하여 개별적인 대표성으로 문맥을 이해하는데 도움을 줄 수 있도록 self attention이라는 개념을 만들었습니다.

위의 attention method에서는 $(Q, K, V)$를 미리 어떤 것인지 정하였지만 transformer에서는 직접 입력값 $x_1, \dots, x_n$과 학습된 파라미터인 linear weights $W_q, W_k, W_v$를 선형 결합하여 $(Q, K, V)$를 만듭니다. 그리고 또 다른 학습가능한 파라미터 $W_o$를 attention value $\sum V_i$와 매핑하여 다시 입력값으로 되돌아 올 수 있도록 합니다.

예를 들면 $x_1, x_2, x_3$의 입력이 있고 $x_1$에서 $W_q$를 선형결합하여 $Q_1$을 만들고 이후 모든 입력값에서 각각 $W_k$를 선형결합한 $K_1, K_2, K_3$을 생성합니다. 그리고 query와 key를 내적하고 softmax를 취하여 전체 합이 1이 되도록 확률을 구합니다. 다음으로 $W_v$를 각각 선형결합시켜 $V_1, V_2, V_3$이 나올 것이고 이를 각 확률과 곱한 총합과 $W_o$를 곱한다면 원래 크기와 같은 $Z_1$을 만들 수 있다고 합니다. 이를 크기는 같지만 context는 변형이 된 transform된 상태라고 합니다.

#### 1. Token aggregation

입력 $x$를 transformer blocks를 투영시켜 $z_1, \dots, z_n$을 만든 이후에 가장 심플한 통합은 평균을 취하는 것입니다. 평균을 취하여 얻은 $z$를 사용하여 classifier $f$, regressor $g$를 선택하여 결과를 예측할 수 있습니다. 하지만 이는 transformer로 얻은 개별 의미들을 모두 잃어버리는 결과를 초래합니다.

<img src="https://miro.medium.com/1*GUd19qrm7YxnhE0ZQJybVw.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

attention mechanism에 의존해야 하므로 classification token인 $[CLS]$를 더미 토큰으로 입력에 추가하여 통합 임베딩에 사용하는 것이 고안되었습니다. 이렇게 되면 기존 입력이 5개였다고 하면 이 더미 토큰을 추가한 6개의 입력을 transformer에 투영시킵니다. 그러면 총 6개의 $z$집합이 생기게 됩니다. 그 중에 $[CLS]$가 main인 $z_0$은 비교적 다른 요소들이 골고루 합쳐져서 계산될 것입니다. 따라서 이 위에 classifier를 얹어서 sequence level prediction 진행을 하는 방법입니다. 그리고 다른 토큰 위에 classifier를 얹는다면 token level prediction 진행을 할 수 있습니다.

#### 2. Architecture

<img src="https://machinelearningmastery.com/wp-content/uploads/2021/08/attention_research_1.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

총 8개의 step으로 쪼개어 설명을 하겠습니다.

$\rightarrow$ step 1 : input embedding은 토큰의 시퀀스로 각 토큰은 같은 크기의 벡터입니다.

$\rightarrow$ step 2 : rnn과 달리 순서개념이 없어서 positional encoding을 사용하여 같은 단어가 다른 위치에 들어가도 다른 표현력을 갖도록 합니다. sinusoidal encoding을 통해 sin과 cos 함수의 주기성을 활용하여 긴 시퀀스도 평가에서 다룰 수 있게 되며, 학습하지 않은 길이의 시퀀스에 대해서도 일반화가 가능합니다. $PE_{(pos, 2i)} = sin(pos/10000^{2i/d_{model}}), PE_{(pos, 2i+1)} = cos(pos/10000^{2i/d_{model}})$

$\rightarrow$ step 3 : encoder transblock 안에서 multi head attention 블록이 있는데 임베딩을 하는 역할입니다. 각 입력 단어를 query로 삼고 모든 단어를 key로 삼아서 유사성을 계산하며 이후 모든 단어를 value로 삼아서 가중합을 계산합니다. 마지막으로 softmax를 통해서 $\text{softmax}(\frac{Q \times K^T}{\sqrt{d_k}}) \times V = Z$로 동일 크기가 되도록 계산해줍니다.

$\rightarrow$ step 4 : encoder transblock 안에서 임베딩이 완료된 이후 feed forward가 있는데 문맥화된 임베딩에 fc-layer를 추가합니다. $FFN(x) = max(0, xW_1 + b_1)W_2 + b_2$로 토큰이 서로 영향을 주지 않고 자기 토큰만 의존성을 갖고 별도로 분리되어 진행합니다. step 2와 step 3 위에는 residual connection과 layer normalization을 추가합니다.

$\rightarrow$ step 5 : decoder input에서는 encoder로 주어진 $z$집합을 통해 auto regressive하게 output 시퀀스를 생성합니다.

$\rightarrow$ step 6 : decoder transblock에는 masked multi head attention이 존재하는데 시점 $t$에서 $<sos>$ 토큰을 포함하여 $t$개의 인풋을 받아서 다음 시점부터는 $[MASK]$라는 아무 정보 없는 더미 토큰으로 마스킹하는 것입니다.

$\rightarrow$ step 7 : query만 decoder단에서 들어가고 key, value는 encoder단에서 받아서 multi head attention이 진행됩니다. 따라서 현재 단어를 입력으로 받은 것인 query와 encoder에서 문맥을 파악한 전체 문장을 key, value로써 사용하는 것입니다. 이 때는 시점 $t$ 이후를 마스킹하지 않습니다.

$\rightarrow$ step 8 : 마지마겡 softmax로 classifier를 구축하고 원핫인코딩으로 스코어를 만듭니다.

이 모든 과정이 완료되면 마지막 토큰으로 $<EOS>$를 찍고 예측을 마칩니다.

#### 3. BERT

<img src="https://resources-public-blog.modulabs.co.kr/blog/prd/content/263018/BERT.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

입력 문장이 두 개이며 시작에 $[CLS]$와 각 문장을 구분하는 구간과 마지막 부분에 $[SEP]$를 삽입합니다. 그리고 segment embedding과 position embedding을 적용합니다.

학습을 하는 방법으로는 첫번째로 Masked language modeling(MLM)이 있습니다. 전체 토큰의 15% 정도를 랜덤으로 마스킹하고 이 포지션의 결과 임베딩을 classify 진행합니다. 이는 한 문장 내에서 유기적인 단어의 문맥을 파악하는 태스크입니다. 다음으로는 Next Sentence Prediction(NSP)입니다. 이는 학습 데이터의 50%는 연속적인 흐름이거나 나머지는 그렇지 않은 두 문장을 붙여서 입력으로 넣고 학습하게 되는데 결과는 98% 정도로 매우 좋다고 합니다. 따라서 최근에는 사전 학습된 BERT가 기본적인 선택사항이 되었습니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/o3UEbQ24zhQ?si=NF1hNkEgzfmxUFx9)

[원본 경로 #2](https://youtu.be/0csOwWpc4Ik?si=SqC_e9uMkIHCXYz-)
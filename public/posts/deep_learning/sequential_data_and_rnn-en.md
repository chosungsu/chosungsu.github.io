---
title: 'Sequential Data and Recurrent Neural Networks'
date: '2022-08-19'
tags: ['Deep Learning', 'lecture']
---

### Sequential Data

For input $x$, label $y$ is formed as continuous data. For example, $y_i$ is predicted through the values of $x_{1:i-1}$, and this is used to predict future events such as typhoon path prediction and product failure prediction.

In deep learning, results from continuous word sequences such as image captioning and Q&A can also be viewed as sequential data.

<img src="https://blog.kakaocdn.net/dna/MYzgN/btqA3fa5uyw/AAAAAAAAAAAAAAAAAAAAACP86IyZtfIMCKp7z5CBtiLA_XZyxO_X786tVSAWfq8U/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1761922799&allow_ip=&allow_referer=&signature=oELqSRW6azFHVSKNm5C5AdIZzLA%3D" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

One-to-one is when input, hidden layer, and output all exist one by one. Now, receiving sequential data as input and having multiple hidden layers while making output one corresponds to many-to-one. And when output also becomes multiple, it is called many-to-many.

---

### Word embedding

Words are the minimum units that have meaning in speech. Basically, we want to create a dictionary, train the model, and make natural speech, but actual humans don't need such work.

Just as images, audio, etc. have been represented as vectors, text can also be represented as vectors, and assigning semantic elements to each vector is called embedding. Through this embedding, vectors of words with similar meanings can be close to each other.

Initially, the concept of word2vec emerged, which predicts current words with neighboring words (Common Bag of Words, CBOW) or predicts words surrounding a given word (Skip gram) through large-scale word learning. At this time, each word vector is based on an objective function that maximizes likelihood. Looking at $L(\theta) = \prod_{t=1}^{N} \prod_{-m \le j \le m} p(w_{t+j}|w_t;\theta)$, it is a method of predicting $m$ neighboring vectors as probabilities of 1 or 0.

<img src="https://nlp.stanford.edu/projects/glove/images/man_woman.jpg" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Next, the concept of GloVe emerged, and global corpus statistics are reflected, which is a method of calculation through conditional probability.

$$
w_i^Tw_j = log P(i|j)
$$

The above formula means the conditional probability between the $i$-th word and the $j$-th word, and when calculated as $J = \sum_{i,j=1}^{V} f(X_{ij})(w_i^T\hat{w}_j + b_i + \hat{b}_j - log X_{ij})^2$, $\hat{x}_j$ is the neighboring word of the $i$-th word, and eliminating $log X_{ij}$ later is the log value of the conditional probability that the $i$-th word appears when the $j$-th word is given. For example, if it appears 10 times, 1 is eliminated, and if 100 times, 2 is eliminated, allowing control over frequency.

---

### Recurrent Neural Networks(Many-to-one)

When text is given and binary classification is performed with positive and negative nuances, it can be judged as many-to-one.

<img src="https://www.researchgate.net/publication/333752473/figure/fig3/AS:769346934693895@1560438011473/Proposed-CNN-on-multiple-word-embeddings-concatenated-at-embedding-layer.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

It is possible to classify as shown above by embedding text through embedding algorithms like word2vec and GloVe and using 1D convolution filters. However, in the case of CNN, input values need to be adjusted to the same size, which is not easy given the nature of words.

Therefore, there is a method where an Encoder receives the entire sequence regardless of length, contains the entire meaning, and assigns it to one embedding. This replaces the encoder instead of convolution filters after embedding to classify regardless of length.

<img src="https://miro.medium.com/v2/resize:fit:1400/1*xs2EgGPGlpWrSW4zUANYXA.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

RNN reads input sequences one by one and maintains internal state while adding previously read data (old version) and newly entered data (new version) to create new internal state through a feedback loop method. Initially, there is an initial state $h_0$ with no information, and by sequentially learning input values $x_1, \dots, x_T$ and hidden states $h_1, \dots, h_{T-1}$ at each step, the final state $h_T$ is created. This formula can be generalized as $h_t=f_w(h_{t-1}, x_t)$. The weight $w$ at this time is the same value at every moment, and from the expression $f_w(x) = \sigma(Wx)$ in fc-layer, the approach was to increase weights from one to two ($w_{hh}, w_{xh}$) depending on input values.

$$
h_t = tanh(w_{hh}h_{t-1} + w_{xh}x_t)
$$

The doubled weights are applied to the non-linear activation function tanh and calculated by adding them like this. After the final hidden layer, $\hat{y}$ is predicted through the $w_{hy}$ weight, and in binary classification, sigmoid is applied as $\hat{y} = \sigma(w_{hy}h_t)$.

---

### Language models

#### 1. n-grams

$n$-grams was a method of performing Markov evaluation while moving $n$ previous words as a window.

$$
P(w_1, \dots, w_m) = \prod_{i=1}^{m} P(w_i|w_1, \dots, w_{i-1})
$$

Referring to the above formula, unigram and bigram are created. Unigram refers to 1 previous word, taking the form $P(w_2|w_1) = \frac{count(w_1, w_2)}{count(w_1)}$, and bigram refers to 2 previous words, taking the form $P(w_3|w_1, w_2) = \frac{count(w_1, w_2, w_3)}{count(w_1, w_2)}$. The denominator uses the frequency of the reference word appearing, and the numerator uses the frequency of both the current word and the reference word appearing. Due to these characteristics, the larger $n$ is, the better the performance naturally becomes, but it causes memory overload.

#### 2. rnn

RNN has no limitations on input length and does not affect model size. However, the calculation of the feedback loop is very slow, and vanilla RNN has various problems such as gradient vanishing and long-term memory loss.

When backpropagating RNN, in the hidden state transition part, $\frac{\partial L}{\partial W_{hh}} = \frac{\partial L}{\partial h_{t}} \cdot \frac{\partial h_{t}}{\partial W_{hh}}$, and in the input transition part, $\frac{\partial L}{\partial W_{xh}} = \frac{\partial L}{\partial h_{t}} \cdot \frac{\partial h_{t}}{\partial W_{xh}}$, only the $h$ state changes and backpropagation occurs identically.

If we differentiate $h_t = tanh(W_{hh}h_{t-1} + W_{xh}x_t)$ in vanilla RNN for backpropagation, the multiplied weights come out during differentiation like $\frac{\partial h_t}{\partial h_{t-1}} = tanh'(W_{hh}h_{t-1} + W_{xh}x_t) \cdot W_{hh}$. When chain rule is applied to backpropagate to the loss of the very first input, it is expressed as $\frac{\partial L_t}{\partial W_{hh}} = \frac{\partial L_t}{\partial h_t} \cdot \frac{\partial h_t}{\partial h_{t-1}} \cdots \frac{\partial h_1}{\partial W_{hh}} = \frac{\partial L_t}{\partial h_t} \cdot (\prod_{k=2}^{t}tanh'(W_{hh}h_{k-1} + W_{xh}x_k))W_{hh}^{k-1} \cdot \frac{\partial h_1}{\partial W_{hh}}$.

When differentiating tanh, the tanh graph has a $y$ range between $[-1,1]$ and the gradient has $[0,1]$, so gradient vanishing problems occur through the above tanh' multiplied $k-1$ times. Also, if $W$ is sufficiently large, it causes exploding gradient instead.

---

### LSTM/GRU

The models to be introduced now were designed to solve the gradient vanishing and long-term dependency problems that RNN has.

#### LSTM

<img src="https://velog.velcdn.com/images/soup1997/post/d8e2cbf1-319d-4d65-aa11-4892381354e6/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

LSTM collects the previously memorized hidden state $h_{t-1}$ and current input $x_t$ in fc-layer from the form of vanilla RNN and applies tanh function to it. And for long-term memory, it introduces cell state $c_{t-1}$ and creates $c_t$ by summing with the value that passed through the activation function.

Since the above modification alone is insufficient, a forget gate is added to the previous logic. This gate receives $h_{t-1}$ and $x_t$ as input, collects them in fc-layer, applies $\sigma$ function, and multiplies to cell state. Since sigmoid creates output in $[0,1]$ range, it continues to remember when it receives 1.

Then addition is performed through input gate. Input gate adds sigmoid in addition to tanh, multiplies the values together, and then adds to cell state. Here, it reflects how much the newly received word will make it remember.

Finally, sigmoid is applied and multiplied with the value that was clipped with tanh after addition from cell state, and applied to output $h_t$.

Thanks to this structure, if forget gate is 1 and input gate is 0, cell state can be perfectly preserved. It cannot guarantee complete elimination of gradient vanishing/exploding, but it is useful in terms of long-term memory.

#### GRU

<img src="https://blog.kakaocdn.net/dna/cWUO6M/btqOSxbT285/AAAAAAAAAAAAAAAAAAAAAEpjlo7q0u8szumdLmyDJnwwVzuMnoBdl86og-bkJC2g/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1761922799&allow_ip=&allow_referer=&signature=djMW2c06ea7BAV%2BF%2FpRrUuZ5N3U%3D" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

This is a model designed using convex combination without using cell state and parameters used in LSTM. GRU has a simpler structure than LSTM while showing similar performance, so it is widely used.

The final hidden state is calculated with a combination formula like $h_t = (1-z_t) \cdot h_{t-1} + z_t \cdot tanh(W_hx_t + U_h(r_t \cdot h_{t-1}) + b_h)$. Here, $z_t$ is an update gate that plays the same role as combining LSTM's forget gate and input gate, and $r_t$ is a reset gate that determines how much past information to reflect. Both gates pass through sigmoid function and have values between 0~1.

Thanks to this structure, when $z_t$ is close to 0, it maintains the previous hidden state as is, and when close to 1, it reflects new information more. Also, unnecessary past information can be effectively removed through $r_t$.

---

### Encoder-Decoder structure

<img src="https://velog.velcdn.com/images/aurorab86/post/bae5ed95-82c6-4ef2-a889-587eee125570/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

The encoder structure does not create output but makes it understand all words in the sequence, and the decoder structure creates sentences with words of the same meaning. At this time, $<sos>$ in the decoder means start of sentences, and $<eos>$ means end of sentences.

It is used by calculating loss between actual words and predicted words and updating the next input autoregressively.

---

### References

[Original source #1](https://youtu.be/02_f7jZgeyA?si=1Gj9VJ9VFxZryMht)

[Original source #2](https://youtu.be/0bS99L8CwxA?si=4NE5h_9Z-kwoS3lk)
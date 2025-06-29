---
title: 'Recurrent neural networks'
date: '2024-03-08'
tags: ['cs231n', 'lecture']
---

### recurrent neural networks

The networks we have learned so far are one-to-one models with a structure that has only one output for one input. RNN is a directed graph in the form of connections between nodes according to sequence.

<img src="https://media.geeksforgeeks.org/wp-content/uploads/20231204125839/What-is-Recurrent-Neural-Network-660.webp" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

#### basic architecture

As shown in the image above, RNN uses all functions and parameter values identically at all times. $t$ represents time and $w$ represents weight. The weight for the previous hidden state value and the weight for the current input value are multiplied respectively and added, then passed through the tanh function.

#### computational graph

<img src="https://velog.velcdn.com/images%2Ffbdp1202%2Fpost%2F0a65ec0d-523b-44f0-b623-68b32df51ce6%2Fcs231n-10-006-RNN_Computational_Graph.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Each hidden state can also enter other networks to produce results, and the same weight is used at each step.

#### truncated backpropagation

<img src="https://velog.velcdn.com/images%2Ffbdp1202%2Fpost%2Fd3d85330-f560-4f6d-8309-77637fffc983%2Fcs231n-10-015-RNN_Truncated_Backpropagation_01.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Generally, RNN is too slow when learning while calculating all outputs. To solve this, the truncated backpropagation method emerged, which proceeds with learning by looking at the loss for the batch size.

---

### lstm

<img src="https://velog.velcdn.com/images%2Ffbdp1202%2Fpost%2F039aa5bc-7e2b-4792-8f68-066af0e8836b%2Fcs231n-10-038-LSTM_03.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

LSTM emerged to alleviate the vanishing gradients problem that RNN had. Unlike RNN, four values $f, i, o, g$ are used.

The input gate determines how much to reflect the current input value, the forget gate determines how much to remember the previous input value, the output gate determines how much to show the value inside the current cell, and the gate gate is a weight that determines how much to include the input cell, having a range of $[-1, 1]$.

Elementwise multiplication of the forget gate has computational efficiency over matrix multiplication, and since it multiplies and uses that value, different values are multiplied according to the input, which has the advantage of avoiding exploding or vanishing problems.

#### peephole connection

<img src="https://velog.velcdn.com/images%2Ffbdp1202%2Fpost%2F8f9cf7a3-2c49-48f2-a83e-650dea5a60b8%2Fcs231n-10-045-LSTM_peephole_02.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

As shown in the image above, in the existing LSTM, gates ($f,i,o$) only had inputs $x_t$, $h_{t-1}$, but the previous input $c_{t-1}$ was added to recognize more diverse contexts.

---

### gru

<img src="https://velog.velcdn.com/images%2Ffbdp1202%2Fpost%2Ffe879e68-95a4-4511-8615-237261712eaf%2Fcs231n-10-047-GRU_02.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

In LSTM, the previous input values $c_t$ and $h_t$ were combined into one $h_t$, and with the addition of $r_t$, it was made to decide whether to reset past information.

---

### references

[Original source #1](https://youtu.be/6niqTuYFZLQ?si=o1lItiqsSsOgap2K)




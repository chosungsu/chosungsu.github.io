---
title: 'Recurrent neural networks'
date: '2024-03-08'
tags: ['cs231n', 'lecture']
---

### recurrent neural networks

지금까지 배웠던 네트워크는 one-to-one 모델로 하나의 입력에 대해서 하나의 출력만을 갖는 구조였습니다. RNN은 sequence에 따라 노드 사이 연결의 형태가 방향 그래프입니다.

<img src="https://media.geeksforgeeks.org/wp-content/uploads/20231204125839/What-is-Recurrent-Neural-Network-660.webp" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

#### basic architecture

위 이미지처럼 rnn은 모든 함수와 파라미터 값을 모든 시간에서 동일하게 사용됩니다. $t$는 시간, $w$는 가중치를 나타냅니다. 전 시간의 hidden state 값에 대한 가중치와 현 입력값에 대한 가중치 값을 각각 곱하여 더한 후 tanh 함수를 거칩니다.

#### computational graph

<img src="https://velog.velcdn.com/images%2Ffbdp1202%2Fpost%2F0a65ec0d-523b-44f0-b623-68b32df51ce6%2Fcs231n-10-006-RNN_Computational_Graph.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

각 hidden state에서 다른 네트워크에 들어가서 결과를 낼 수도 있으며 각 step에서 같은 가중치를 사용합니다.

#### truncated backpropagation

<img src="https://velog.velcdn.com/images%2Ffbdp1202%2Fpost%2Fd3d85330-f560-4f6d-8309-77637fffc983%2Fcs231n-10-015-RNN_Truncated_Backpropagation_01.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

일반적으로 rnn은 모든 출력을 구하면서 학습을 진행하면 너무 느립니다. 이를 해결하기 위해 batch만큼 loss를 보고 학습을 진행하는 truncated backpropagation 방법이 등장했습니다.

---

### lstm

<img src="https://velog.velcdn.com/images%2Ffbdp1202%2Fpost%2F039aa5bc-7e2b-4792-8f68-066af0e8836b%2Fcs231n-10-038-LSTM_03.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

lstm은 rnn이 갖고 있던 vanishing gradients 문제를 완화시키기 위해 등장했습니다. rnn과 다르게 $f, i, o, g$ 4개의 값이 사용됩니다.

input gate는 현재 입력 값을 얼마나 반영할지 결정하고, forget gate는 이전 입력 값을 얼마나 기억할지 결정하고, output gate는 현재 셀 안에서 값을 얼마나 보여줄 것인지 결정하고, gate gate는 input cell을 얼마나 포함시킬지 결정하는 가중치로 $[-1, 1]$ 범위를 갖습니다.

forget gate의 elementwise mul이 matrix mul보다 계산적 효율성을 가지며 해당 값을 곱하여 사용하므로 입력에 따라 다른 값이 곱해지면서 exploding 또는 vanishing 문제를 피할 수 있다는 장점이 있습니다.

#### peephole connection

<img src="https://velog.velcdn.com/images%2Ffbdp1202%2Fpost%2F8f9cf7a3-2c49-48f2-a83e-650dea5a60b8%2Fcs231n-10-045-LSTM_peephole_02.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

위 이미지처럼 기존 lstm에서는 gate($f,i,o$)에는 입력 $x_t$, $h_{t-1}$만 가지고 있었지만 이전 입력 $c_{t-1}$를 추가시켜 더 다양한 맥락을 인식하도록 하였습니다.

---

### gru

<img src="https://velog.velcdn.com/images%2Ffbdp1202%2Fpost%2Ffe879e68-95a4-4511-8615-237261712eaf%2Fcs231n-10-047-GRU_02.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

lstm에서 이전 입력값 $c_t$와 $h_t$가 하나의 $h_t$로 합쳐졌고 $r_t$의 추가로 과거의 정보를 reset할지 결정하도록 하였습니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/6niqTuYFZLQ?si=o1lItiqsSsOgap2K)




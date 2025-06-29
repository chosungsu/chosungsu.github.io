---
title: 'Back propagation and neural networks'
date: '2024-02-09'
tags: ['cs231n', 'lecture']
---

### backpropagation

chain rule을 이용하여 구할 수 있습니다. 예를 들어 computation node를 통해 gradient를 구해봅시다.

<img src="https://velog.velcdn.com/images/devjo/post/ff9e2685-fe0d-44a9-ad04-80461c17a5d4/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

$q=x+y$, $f=qz$, $x=-2, y=5, z=-4$ 가 주어져 있을 때 forward pass 과정으로 계산하면 각 node들의 gradient 값은 $\frac{\partial q}{\partial x}=1$, $\frac{\partial q}{\partial y}=1$, $\frac{\partial f}{\partial q}=z$, $\frac{\partial f}{\partial z}=q$에 따라 $z$에서 gradient는 $\frac{\partial f}{\partial z}=q=3$, $q$에서 gradient는 $\frac{\partial f}{\partial q}=z=-4$, $x$에서 gradient는 $\frac{\partial f}{\partial q} * \frac{\partial q}{\partial x}=z*1=-4$, $y$에서 gradient는 $\frac{\partial f}{\partial q} * \frac{\partial q}{\partial y}=z*1=-4$로 구할 수 있습니다. 이는 backpropagation에 해당합니다.

backward pass를 할 때 add gate는 이미 가지고 있던 gradient를 각 노드에 동일하게 분배하고 max gate는 forward 값이 큰 쪽에만 gradient를 전달하고 작은 쪽은 0을 분배, mul gate는 gradient를 각 forward 값에 곱한 값들을 서로 바꿔치기하여 분배가 됨을 알 수 있습니다.

---

### gradient calculation

위에서는 변수 값들을 gradient로 계산하였고 실제로는 scalar 값이 아닌 vector값을 사용하게 됩니다. 이러한 vector 값을 사용하기 위해서는 vector-valued function of multiple variables에 대한 일차 미분 값이 필요합니다. 이를 jacobian matrix라고 합니다.

<img src="https://velog.velcdn.com/images/devjo/post/449000ea-3e5b-47d6-b4e4-c851d179419d/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

---

### neural networks

neural networks는 linear classifier를 2개 이상 쌓아올리는 형태이고 그 사이에 non-linear function을 사용합니다. 이 방법은 레이어를 쌓아가면서 여러 특징을 추출할 수 있다는 장점이 있습니다.

중간에 모든 노드가 다음 노드에 영향을 끼치는 레이어를 fully connected layer(=hidden layer)라고 하는데 레이어가 $n$개인 경우 이 hidden layer가 $n-1$개 있다고 생각하면 됩니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/d14TUNcbn1k?si=DCOAXYJHHK5E5_Cx)




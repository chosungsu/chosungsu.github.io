---
title: 'Decision Tree'
date: '2022-07-22'
tags: ['Machine Learning', 'lecture']
---

### Tree

root가 맨 위에 있고 가지를 뻗어나가 자손노드들을 생성하는 것이 general tree라고 합니다. 자손 노드가 root인 상황으로 또 다른 트리 구조가 아래에 뿌리 내리는 것을 sub tree라고 합니다.

#### Decision tree

<img src="https://cdn-ildoenj.nitrocdn.com/cspHczubSJxydpVepnzkBXUBiIwgOhZL/assets/images/optimized/rev-9cfbcc4/www.displayr.com/wp-content/uploads/2018/07/what-is-a-decision-tree.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

DT는 위의 이미지처럼 각 조건에 맞게 노드를 구성하고 조건을 만족하는지 여부에 따라 자손을 결정합니다.

장점으로는 쉽고 해석이 용이하다는 점이 있습니다. 하지만 다른 머신러닝 모델들에 비해 정확도가 높지 않습니다.

#### Regression tree

<img src="https://www.mathworks.com/help/stats/simpleregressiontree.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

위 이미지처럼 각 부모 노드에서는 변인 $x$ 집합별로 연속적인 조건을 만들었으며 이에 따라 yes or no로 자손노드 트리가 생성된 것을 regression tree라고 합니다.

$$
\text{min} \sum_{j=1}^{J} \sum_{i \in R_j} (y_i-\hat{y_j})^2
$$

이 수식은 least squares를 최소화하는 목적식이고 $i$번째 데이터 포인트가 $j$번째 영역의 대표값과의 차이의 합이 최소화가 되어야 합니다. 각 영역별로 대표값은 $\underset{c}{argmin} \sum_{i \in R_j}(y_i-c)^2$로 구하는데 데이터 포인트 $c$와 대표값과의 차이의 합이 최소가 되는 것을 선정하면 됩니다.

$f(c) = \sum_{i \in R_j} (y_i^2 - 2cy_i + c^2)$ 이를 미분하게 되면 $f'(c) = - 2 \sum_{i \in R_j} y_i + 2n_j c = 0$이 되는 $c$가 $\frac{1}{n_j}\sum_{i \in R} y_i$로 평균값이 나오는 것을 알 수 있습니다. 따라서 각 영역의 대표값은 평균을 사용하면 되는 것이 증명되었습니다.

이제 영역을 나누는 방법을 알아보면 top down, greedy 두 방법이 존재합니다. 우선 전자의 경우는 root 노드에서 시작하여 연속적으로 두 개의 가지로 나누는 recursive binary split을 진행하는 것입니다. 후자의 경우는 미래의 결과를 상관하지 않고 지금 조건에 맞게 split하는 것이 최선이라면 수행하는 것을 말합니다. 하지만 대부분의 경우 지금의 선택이 미래에 보면 좋은 선택이 아니게 됩니다.

이후 cut point를 지정하게 되는데 point가 많지 않다고 가정하고 개별적으로 지정한 후 $x < s$, $x \ge s$로 split 후에 위의 least squares를 최소화하는 과정을 시행합니다. 그리고 노드에는 $x < s$로 조건문을 표기합니다.

#### Classification tree

Regression tree와의 차이점은 데이터 포인트들이 연속적이지 않고 discrete하거나 categorical하다는 점으로 least squares에서도 대푯값은 레이블의 개수를 카운팅하여 나타내어야 합니다.

$$
\hat{y}_j = \underset{k}{\text{argmax}} \frac{1}{n_j} \sum_{x_i \in R_j} I(y_i = k)
$$

수식으로 표현하면 위와 같습니다. 그리고 이를 바탕으로 쪼갤 때 classification accuracy가 높아지는 방향으로 진행되도록 유도합니다.

<img src="https://miro.medium.com/1*M15RZMSk8nGEyOnD8haF-A.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

$$
\frac{1}{n_k} Impurity(R_k(v,j,s)) \\
= -\sum_{k=1}^{K} p_{j,k} log P_{j,k}
$$

이렇게 Impurity를 최소화하는 목적식에서 entropy(무질서한 상태)가 낮은 것을 추구해야 합니다.

---

### Tree pruning with RT

데이터 포인트가 전체적으로 많지 않으며 decision tree가 split을 한 결과 다른 결과노드에 존재하는 데이터 포인트 양이 너무 적어서 대푯값을 지정하는데 문제가 생길 때 overfitting이라고 할 수 있습니다. 이 때 파라미터 수를 줄이거나 boundary를 smooth하게 바꾸는 방법이 대안이 될 수 있습니다.

tree가 적은 split으로 적은 영역 구분이 된 경우 variance가 낮고 bias 해석이 용이해집니다. 하지만 overfitting 문제를 해결하는 또 다른 방법인 pruning은 오히려 더 많이 잘라놓고 overfitting의 원인이 되는 가지를 쳐내는 방식으로 진행합니다.

#### Weakest link pruning (=cost complexity)

음수가 아닌 tuning parameter $\alpha$를 사용하고 각 영역의 대푯값 $\hat{y}_{R_m}$과 데이터 포인트의 차이를 이용한 수식은 아래와 같습니다.

$$
\sum_{m=1}^{|T|} \sum_{x_i \in R_m} (y_i-\hat{y}_{R_m})^2 + \alpha|T|
$$

이 때 가중치 항의 코스트는 트리의 크기 즉 노드의 수에 해당합니다. 따라서 트리의 크기가 클수록 가중치도 커집니다. 가장 작은 이점을 갖는 가지부터 시작하여 leaf node들을 merge합니다.

#### Building process

재귀 이진 분할로 tree를 키우고 모든 영역의 개수가 우리가 원하는 영역의 개수보다 적은 영역이 남아서 더 쪼개지지 않을 때 멈춥니다. 이후 쪼개진 가지와 영역에서 이득이 작고 병합 시에도 기존 tree에 영향이 적은 것부터 다시 병합해 나갑니다.

tree의 크기인 $|T|$를 구하는 방법은 학습용 데이터에서는 쪼개질수록 에러가 줄어들지만 검증용 데이터에서는 어느 크기 이후부터는 에러가 다시 커지는 상황이 발생하므로 그 직전 크기로 생각하면 됩니다.

따라서 병합 시에는 총 리프 노드들이 1개씩 줄어드는 효과를 갖고 $|T|$개의 리프 노드가 남을 때까지 병합합니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/PVGTnn84jL4?si=331ER9vlHmknx-Tm)
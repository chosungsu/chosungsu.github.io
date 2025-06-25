---
title: 'Network Models'
date: '2024-07-26'
tags: ['Operations Research 1', 'lecture']
---

### directed & undirected networks

네트워크는 노드와 아크라는 두 개의 구성 요소가 있습니다. 노드는 정점이고 아크는 순서가 있는 노드쌍으로 구성되며 흐름의 가능한 방향을 나타냅니다. 흐름이 한 방향만 허용되면 해당 아크는 directed 아크가 되고 반대의 경우 undirected 아크입니다.

---

### shortest path problem

특정 노드에서 시작하는 네트워크 내에 노드 간 가장 짧은 경로를 찾는 문제를 최단 경로 문제라고 합니다. 만약 arc $(i, j)$가 가장 짧다면 $x_{ij}=1$이고 그렇지 않으면 $0$으로 표시합니다.

#### 1. undirected networks

<img src="https://velog.velcdn.com/images/devjo/post/cb4b3241-385a-492b-922a-f5059497e896/image.png" style="display: block; margin: 0 auto; height:200;" />

위 이미지는 무방향 그래프이고 이 그래프에서 $A$~$D$까지 이동하는 가장 짧은 경로를 찾고 싶다고 가정할 때, 첫번째로 할 일은 모든 노드에 양의 무한대 거리를 표시하여 초기화하는 것입니다. 다음으로 시작 노드인 $A$의 거리를 $0$으로 만들고 근접 노드들에 거리 초기화를 진행합니다. $B$의 거리는 $2$, $F$의 거리는 $3$이 됩니다. $C$의 거리는 $B : 2+6=8, F : 3+4=7$이므로 작은 $7$을 사용하고, $E$의 거리는 $10$을 사용합니다. 마지막으로 $D$의 거리는 $C : 7+8=15, E : 10+4=14$로 작은 값인 $14$를 사용합니다.

가장 짧은 경로는 $ABFCED, ABFED, AFED, AFCED$가 됩니다.

#### 2. directed networks

<img src="https://velog.velcdn.com/images/devjo/post/3174cee3-f5c9-4820-98dc-b9e70a97fdba/image.png" style="display: block; margin: 0 auto; height:200;" />

위 이미지는 유향 그래프이고 무향 그래프와 동일하게 각 노드별로 연결된 노드끼리 거리를 업데이트시켜 나가면 됩니다.

$A=0$, $B=2$, $F=3$, $C=8$, $E=10$, $D=14$가 가장 작은 값이기 때문에 짧은 경로는 단 하나인 $AFED$가 해당됩니다.

---

### convert to transshipment problem

최단 경로 문제는 네트워크의 다른 모든 노드를 환적 지점으로 하여 노드 $i$에서 노드 $j$로 한 단위를 보내는 비용을 최소화하는 것과 같습니다. 두 노드 사이 아크가 없다면 비용을 충분히 큰 양수인 $M$으로 생각하도록 합니다.

이 환적 문제에 대한 유향 그래프의 transportation tableau는 아래와 같이 작성하겠습니다.

|  | $B$ | $C$ | $E$ | $F$ | $D$ | supply |
|----------|---------|----------|---------|----------|---------|----------|
| $A$ | 2 | $M$ | $M$ | 3 | $M$ | 1 |
| $B$ | 0 | 6 | $M$ | $M$ | $M$ | 1 |
| $C$ | $M$ | 0 | 3 | 4 | 8 | 1 |
| $E$ | $M$ | $M$ | 0 | $M$ | 4 | 1 |
| $F$ | 1 | $M$ | 7 | 0 | $M$ | 1 |
| supply | 1 | 1 | 1 | 1 | 1 | 1 |

유향 그래프에서는 직접 연결되지 않는 노드는 $M$로 표시하게 됩니다.

---

### minimum spanning tree

네트워크에 두 노드 사이에 하나 이상의 경로가 있는 경우 두 노드는 연결됩니다. 같은 노드에서 시작하고 끝나는 경로를 cycle이라고 합니다. $n$개의 노드가 있는 네트워크의 경우 스패닝 트리는 $n-1$개의 사이클을 포함하지 않은 연결된 노드들의 그룹입니다.

<img src="https://velog.velcdn.com/images/devjo/post/bbf8ead7-5567-4a01-9748-422302227e16/image.png" style="display: block; margin: 0 auto; height:200;" />

예를 들어 위 이미지에서 상단 이미지는 cycle은 없지만 $n-1=6$에 아크는 5개가 구성되어 있어 스패닝 트리가 아닙니다. 하단 이미지는 cycle이 $CABDC, EFGE$로 2개 있고 $n-1=6$에 아크는 8개가 있어 스패닝 트리가 아닙니다.

<img src="https://velog.velcdn.com/images/devjo/post/ec34deee-d628-4b6f-91fb-a620fc85b432/image.png" style="display: block; margin: 0 auto; height:200;" />

이 이미지에서는 cycle은 없고 $n-1=6$에 아크는 6개가 있어 스패닝 트리에 부합합니다.

이제 최소 신장 트리는 잠재적인 무향 아크와 길이를 갖는 노드들이 주어져 있을 때, 모든 노드 쌍이 아크로 연결되고 그 길이의 최소를 구하는 문제입니다.

greedy algorithm을 사용하면 해결할 수 있는데 우선 임의의 노드를 선택한 다음 가장 가까운 노드에 연결합니다. 연결된 노드에 가장 가까운 연결되지 않은 노드 하나를 식별한 다음 해당 노드를 연결합니다. 최소 신장 트리는 여러 개 존재할 수 있습니다.

<img src="https://velog.velcdn.com/images/devjo/post/95dc2333-495a-42f2-8a9c-5f87c169913c/image.png" style="display: block; margin: 0 auto; height:200;" />

이 이미지에서 최소 신장 스패닝 트리를 구해보면 우선 $A$를 임의로 선택하고 이 노드에 가장 가까운 노드 $B$를 선택합니다. 이후 $A, B$에 가까운 노드 $D$를 선택합니다. 이후 $C$, $F$, $E$, $G$를 선택함으로써 길이는 2+2+1+3+1+5=14가 됩니다.

---

### maximum flow problem

네트워크의 아크 값은 흐름의 양을 제한하는 용량으로 생각하면 전체 네트워크를 거쳐 종착 지점까지 최대한 많은 흐름을 운송하는 방법을 찾을 수 있습니다. 시작점은 source, 끝점은 sink라고 합니다.

<img src="https://velog.velcdn.com/images/devjo/post/352d595b-4b39-48c3-b42d-fdb665038b77/image.png" style="display: block; margin: 0 auto; height:200;" />

이 이미지를 통해 LP 문제로 생각하면 아래와 같습니다.

결정 변수는 $x_{i,j}$는 아크 $(i, j)$에 지나가는 물의 양으로 정합니다. 그리고 $x_{t,s}$는 실제 존재하지 않지만 인공 arc로 정의합니다. 목적 함수는 max $z=x_{t,s}$가 됩니다. 제약 조건은 두 가지 부류로 나뉘는데 우선 arc관점에서는 $0 \le x_{s,a} \le 6$, $0 \le x_{s,c} \le 5$, $0 \le x_{a,b} \le 2$, $0 \le x_{a,d} \le 4$, $0 \le x_{c,d} \le 7$, $0 \le x_{b,t} \le 3$, $0 \le x_{d,t} \le 8$, $0 \le x_{t,s}$ 으로 정의됩니다. 이어서 node관점에서는 $x_{t,s} = x_{s,a}+x_{s,c}$, $x_{s,a} = x_{a,b}+x_{a,d}$, $x_{a,b} = x_{b,t}$, $x_{s,c} = x_{c,d}$, $x_{a,d} + x_{c,d} = x_{d,t}$, $x_{b,t} + x_{d,t} = x_{t,s}$로 정의됩니다.

#### ford fulkerson method

이 방법의 첫 번째 단계에서는 source, sink까지 경로가 여전히 존재하는지 확인해야 합니다. 만약 그렇지 않다면 역방향 아크에 의해 결정됩니다. 다음으로는 하위 단계를 사용하여 잔류 흐름 네트워크를 만들어야 합니다. 경로에 있는 아크의 최소 용량을 찾고 이를 $c$로 표시합니다. 경로의 모든 아크에서 $c$만큼 뺍니다. 경로의 모든 아크에 대해 역방향 아크를 추가합니다. 그 아크들에는 $c$만큼 더합니다.

예를 들어 위 이미지에서 경로를 $SABT$로 정했다면 이 경로에 있는 아크의 가장 작은 용량 $c$인 $x_{a,b}=2$를 찾아 해당 용량만큼 빼게 되면 $x_{s,a}=6 \rightarrow 4$, $x_{b,t}=3 \rightarrow 1$로 변경되고 $x_{a,b}$는 0이 되어 지워집니다. 이어서 역방향 아크는 모두 동일한 $c=2$값을 적용합니다. 그리고 다음 경로를 $SCDT$로 정했다면 $c$는 $x_{s,c}=5$이고 $x_{c,d}=7 \rightarrow 2$, $x_{d,t}=8 \rightarrow 3$으로 변경되고 $x_{s,c}$는 0이 되어 지워집니다. 이어서 역방향 아크는 모두 동일한 $c=5$값을 적용합니다. 아직 sink까지의 경로가 남아있고 $SADT$로 정했다면 $c$는 $x_{d,t}=3$이고 $x_{s,a}=4 \rightarrow 1$, $x_{a,d}=4 \rightarrow 1$로 변경됩니다. $x_{d,t}$는 0이 되어 지워집니다. 이어서 역방향 아크는 모두 동일한 $c=3$값을 더하여 적용합니다. 따라서 역방향 아크 값들은 $x_{a,s}=5$, $x_{c,s}=5$, $x_{d,c}=5$, $x_{d,a}=3$, $x_{b,a}=2$, $x_{t,b}=2$, $x_{t,d}=8$이 됩니다.

즉, 최적해는 $x_{a,s} + x_{c,s} = x_{t,s} = 10$으로 구해집니다.

---

### project network

각 아크들은 활동을 나타냅니다. 각 노드들은 이벤트를 나타냅니다.

<img src="https://velog.velcdn.com/images/devjo/post/aa29032c-ebe4-40f9-a981-6d7661acb1ad/image.png" style="display: block; margin: 0 auto; height:200;" />

이 이미지를 보면 활동 $A$는 활동 $B$를 시작하기 전에 완료되어야 하며 각 5, 6일이 소요됨을 알 수 있습니다. 이러한 네트워크를 AOA(activity on the arc network)라고 합니다.

이 네트워크는 노드 1에서 시작해야 하며 선행 활동이 없는 경우 노드 1에서 시작하여야 합니다. 프로젝트 완료를 나타내려면 항상 노드를 사용해야 합니다. 노드에는 번호를 붙여서 활동의 시작을 나타내는 노드의 번호보다 큰 값이어야 합니다. 노드는 하나의 아크로 연결되며 두 노드는 두 개 이상의 아크로 연결될 수 없습니다. 시간이 0이 걸리는 더미 활동을 추가하고 노드 번호도 다시 정렬해야 할 수 있습니다.

<img src="https://velog.velcdn.com/images/devjo/post/39dcaa76-f840-4113-9209-6d2770959774/image.png" style="display: block; margin: 0 auto; height:200;" />

위 이미지는 하나의 아크로만 연결된다는 것을 위반하였기 때문에 아래의 이미지처럼 더미 노드를 추가해야 합니다.

<img src="https://velog.velcdn.com/images/devjo/post/30f6c23b-e96c-4f24-bc44-50bd78387d6f/image.png" style="display: block; margin: 0 auto; height:200;" />

---

### early-late event time, total float, critical path

#### 1. early-late event time

초기 이벤트 시간과 후기 이벤트 시간은 네트워크의 노드와 연관됩니다. 노드 $i$의 초기 이벤트 시간은 $ET(i)$로 표시되며 이는 노드 $i$에 해당하는 이벤트가 발생할 수 있는 가장 빠른 시간입니다. 노드 $i$의 늦은 이벤트 시간은 $LT(i)$로 표시되며 이는 프로젝트 완료를 지연시키지 않고 노드 $i$에 해당하는 이벤트가 발생할 수 있는 가장 늦은 시간입니다.

<img src="https://velog.velcdn.com/images/devjo/post/82c437c5-1edf-4b66-9ad8-cc71f6c90b14/image.png" style="display: block; margin: 0 auto; height:200;" />

예를 들어 위와 같은 네트워크가 있을 때 2와 3에 해당하는 초기 이벤트 시간을 $ET(2)=8$, $ET(3)=6$으로 알고 있다고 한다면 4의 초기 이벤트 시간은 무엇이 되어야 하는가라는 질문에 $ET(2)+4=12$, $ET(3)+5=11$이고 두 활동이 모두 마무리 되는 시간을 골라야 하기에 max값인 12가 선택되어야 한다고 답할 수 있습니다. 마지막 노드인 5에 대한 초기 이벤트 시간은 15가 됩니다.

<img src="https://velog.velcdn.com/images/devjo/post/1af08eb5-9e38-4565-ae2b-eb434d372b10/image.png" style="display: block; margin: 0 auto; height:200;" />

예를 들어 위와 같은 네트워크가 있을 때 4와 5에 해당하는 늦은 이벤트 시간을 $LT(4)=13$, $LT(5)=10$으로 알고 있다고 한다면 3의 늦은 이벤트 시간은 무엇이 되어야 하는가라는 질문에 $LT(4)-5=8$, $LT(5)-3=7$이고 4와 5는 3인 노드가 발생한 경우에만 시작될 수 있기 때문에 둘 중 min값을 구해야 하므로 7이 선택되어야 한다고 답할 수 있습니다. 가장 첫 노드인 2의 늦은 이벤트 시간은 3입니다.

<img src="https://velog.velcdn.com/images/devjo/post/4cfa7c55-b129-452b-b7cf-8bd6a0250752/image.png" style="display: block; margin: 0 auto; height:200;" />

위 이미지에서는 1의 초기 이벤트 시간을 0으로 두고 계산을 하겠습니다. 2의 초기 이벤트 시간은 9이고 3의 초기 이벤트 시간은 max $(ET(1)+6=6,ET(2)+0=9)=9$입니다. 4의 초기 이벤트 시간은 16이고 5의 초기 이벤트 시간은 max $(ET(3)+8=17,ET(4)+10=26)=26$이 됩니다. 마지막 6의 초기 이벤트 시간은 38로 끝나게 됩니다.

이제 $LT(6)=38$부터 시작하여 역순 계산을 하게 되면 $LT(5)=26$, $LT(4)=16$, $LT(3)$은 min $(26-8=18,16-7=9)=9$, $LT(2)=9$, $LT(1)$은 min $(9-6=3,9-9=0)=0$이 되어 각 노드의 $ET=LT$임을 알 수 있었습니다.

#### 2. total float of activities

활동의 총 여유 시간은 프로젝트 완료 시간을 지연시키지 않고 가능한 가장 빠른 시작 시간 이후로 지연할 수 있는 시간의 양을 말합니다. 아래의 공식으로 계산할 수 있습니다.

$$
TF(i, j)=LT(j)-ET(i)-t_{ij}
$$

노드의 늦은 이벤트 시간에서 초기 이벤트 시간을 빼고 각 노드 사이 활동 기간을 뺀 것과 같습니다.

위의 예시를 그대로 사용하고 Activity $B : TF(1, 2)=LT(2)-ET(1)-t_{12}=9-0-9=0$, dummy : TF(2, 3)=LT(3)-ET(2)-t_{23}=9-9-0=0$, Activity $A : TF(1, 3)=LT(3)-ET(1)-t_{13}=9-0-6=3$, Activity $C : TF(3, 4)=LT(4)-ET(3)-t_{34}=16-9-7=0$, Activity $D : TF(3, 5)=LT(5)-ET(3)-t_{35}=26-9-8=9$, Activity $E : TF(4, 5)=LT(5)-ET(4)-t_{45}=26-16-10=0$, Activity $F : TF(5, 6)=LT(6)-ET(5)-t_{56}=38-26-12=0$ 과 같이 계산됩니다.

#### 3. critical activity and critical path

total float가 0인 모든 활동을 critical activity라고 합니다. 시작 노드에서 완료 노드까지 이어지는 경로 중 전적으로 중요한 활동으로만 구성된 경로를 critical path라고 합니다. critical activity는 활동의 시작이 지연되면 프로젝트도 지연됩니다.

위의 예시에서 critical path를 시각화하면 다음과 같습니다.

```
| $A(6)$ | $TF(A)=3$ |  $D(8)$  | $TF(D)=9$ | $F(12)$ |
|       $B(9)$       | $C(7)$ |   $E(10)$   | $F(12)$ |
                  dummy(0)
```

Critical Path: $B → Dummy → C → E → F$ (총 소요시간: 38)

이를 LP method로 수정해볼 수 있습니다. 결정 변수는 $x_i$는 노드 $i$의 시간입니다. 목적 함수는 min $z=x_6-x_1$로 정의할 수 있고 제약 조건은 $x_2 \ge x_1+9$, $x_3 \ge x_1+6$, $x_3 \ge x_2+0$, $x_4 \ge x_3+7$, $x_5 \ge x_3+8$, $x_5 \ge x_4+10$, $x_6 \ge x_5+12$으로 정의할 수 있습니다.

#### 4. pert

각 활동의 기간을 100% 정확하게 추정할 수 없기 때문에 각 활동 기간은 $T_{ij}$로 모델링할 수 있습니다. pert에서는 세가지 다른 조건에서 각 활동의 기간을 추정해야 합니다. $a$는 가장 유리한 조건에서의 활동 기간에 대한 추정치이고 $b$는 가장 불리한 조건에서의 활동 기간에 대한 추정치, $m$은 가장 가능성 있는 조건에서 활동이 지속되는 기간에 대한 추정치입니다.

pert에서는 $T_{ij}$가 $\beta$ distribution을 따른다는 가정이 필요하고 평균과 분산은 아래와 같이 정의합니다.

$$
E(T_{ij})=\frac{a+4m+b}{6}, \\
V(T_{ij})=\frac{(b-a)^2}{36}
$$

<img src="https://velog.velcdn.com/images/devjo/post/c9c0ee01-5bc8-4f2d-980e-3cbd855d6d8b/image.png" style="display: block; margin: 0 auto; height:200;" />

위 이미지는 동일한 예시이지만 세가지 지표를 아크에 담은 변경된 이미지입니다.

이를 통해 각 평균은 아래와 같이 구해지고,

$$
E(T_{12})=\frac{7+36+11}{6}=9, \\
E(T_{13})=\frac{5+24+9}{6}=6.33, \\
E(T_{23})=0, \\
E(T_{34})=\frac{5+28+9}{6}=7, \\
E(T_{35})=\frac{7+32+10}{6}=8.17, \\
E(T_{45})=\frac{8+40+14}{6}=10.33, \\
E(T_{56})=\frac{11+48+14}{6}=12.17, \\
$$

$E(T)=9+0+7+10.33+12.17=38.5$가 됩니다. 표준편차는 $\sqrt{V(t)}=1.46$으로 특정 일수 내에 완료될 확률을 구하는 것이 가능해집니다.

예를 들어 37일 이내 완료될 확률은 $P(T \le 37)=P(\frac{T-E(T)}{std(T)} \le \frac{37-E(T)}{std(T)})=P(\frac{T-38.5}{1.46} \le \frac{-1.5}{1.46})=P(z \le -1.03)=0.15$

---

### 참고 자료

[원본 경로 #1](https://youtu.be/x0RKKsg0B5o?si=jfOQyd8-AvE-onyc)

[원본 경로 #2](https://youtu.be/jXP8H6-fCCk?si=2ymEWMwzwWdKpXus)

[원본 경로 #3](https://youtu.be/xGDXXKDWidI?si=hoDX0ch26WcK3QeC)

[원본 경로 #4](https://youtu.be/v75Kal6NtWA?si=i1lBFPfcB2kY0ARH)

[원본 경로 #5](https://youtu.be/b1btzVsKp8E?si=83FiTR7yUdMAly6D)

[원본 경로 #6](https://youtu.be/Gvx7oG2pFCA?si=2lNedMgd-y-Xc2xU)

[원본 경로 #7](https://youtu.be/sSgI072tN5k?si=fKGDCWV3pO-V-SD0)

[원본 경로 #8](https://youtu.be/Ovmk9KIFjHE?si=_jLVr6OQ-N94YkFe)

[원본 경로 #9](https://youtu.be/wCo6Hq6hOnY?si=Y9p-ulE2j34BqgPG)

[원본 경로 #10](https://youtu.be/VqhQ_qdE76o?si=661FGe48RQRuSocL)
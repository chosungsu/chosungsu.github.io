---
title: 'Network Models'
date: '2024-07-26'
tags: ['Operations Research 1', 'lecture']
---

### directed & undirected networks

A network consists of two components: nodes and arcs. Nodes are vertices, and arcs are ordered pairs of nodes that indicate possible directions of flow. If flow is allowed in only one direction, the arc is directed; otherwise, it is undirected.

---

### shortest path problem

The shortest path problem involves finding the shortest path between nodes in a network starting from a specific node. If arc $(i, j)$ is the shortest, we denote $x_{ij}=1$; otherwise, it is $0$.

#### 1. undirected networks

<img src="https://velog.velcdn.com/images/devjo/post/cb4b3241-385a-492b-922a-f5059497e896/image.png" style="display: block; margin: 0 auto; height:200;" />

The above image shows an undirected graph. Assuming we want to find the shortest path from $A$ to $D$, the first step is to initialize all nodes with positive infinity distances. Next, we set the distance of the starting node $A$ to $0$ and initialize distances to adjacent nodes. $B$'s distance becomes $2$, and $F$'s distance becomes $3$. For $C$, we use the smaller value between $B: 2+6=8$ and $F: 3+4=7$, which is $7$. For $E$, we use $10$. Finally, for $D$, we use the smaller value between $C: 7+8=15$ and $E: 10+4=14$, which is $14$.

The shortest paths are $ABFCED$, $ABFED$, $AFED$, $AFCED$.

#### 2. directed networks

<img src="https://velog.velcdn.com/images/devjo/post/3174cee3-f5c9-4820-98dc-b9e70a97fdba/image.png" style="display: block; margin: 0 auto; height:200;" />

The above image shows a directed graph. Similar to the undirected graph, we update distances between connected nodes.

Since $A=0$, $B=2$, $F=3$, $C=8$, $E=10$, $D=14$ are the smallest values, the shortest path is only $AFED$.

---

### convert to transshipment problem

The shortest path problem is equivalent to minimizing the cost of sending one unit from node $i$ to node $j$ with all other nodes as transshipment points. If there is no arc between two nodes, the cost is considered a sufficiently large positive number $M$.

The transportation tableau for this transshipment problem in the directed graph is written as follows:

|  | $B$ | $C$ | $E$ | $F$ | $D$ | supply |
|----------|---------|----------|---------|----------|---------|----------|
| $A$ | 2 | $M$ | $M$ | 3 | $M$ | 1 |
| $B$ | 0 | 6 | $M$ | $M$ | $M$ | 1 |
| $C$ | $M$ | 0 | 3 | 4 | 8 | 1 |
| $E$ | $M$ | $M$ | 0 | $M$ | 4 | 1 |
| $F$ | 1 | $M$ | 7 | 0 | $M$ | 1 |
| supply | 1 | 1 | 1 | 1 | 1 | 1 |

In a directed graph, nodes that are not directly connected are marked with $M$.

---

### minimum spanning tree

When there is at least one path between two nodes in a network, the nodes are connected. A path that starts and ends at the same node is called a cycle. For a network with $n$ nodes, a spanning tree is a group of connected nodes with $n-1$ arcs that contains no cycles.

<img src="https://velog.velcdn.com/images/devjo/post/bbf8ead7-5567-4a01-9748-422302227e16/image.png" style="display: block; margin: 0 auto; height:200;" />

For example, in the above image, the top image is not a spanning tree because while it has no cycles, it has 5 arcs for $n-1=6$. The bottom image is not a spanning tree because it has 2 cycles ($CABDC$, $EFGE$) and 8 arcs for $n-1=6$.

<img src="https://velog.velcdn.com/images/devjo/post/ec34deee-d628-4b6f-91fb-a620fc85b432/image.png" style="display: block; margin: 0 auto; height:200;" />

This image shows a spanning tree as it has no cycles and has 6 arcs for $n-1=6$.

A minimum spanning tree problem involves finding the minimum total length of arcs that connect all node pairs in a network with potential undirected arcs and lengths.

This can be solved using a greedy algorithm: first select an arbitrary node, then connect it to the nearest node. Identify the nearest unconnected node to any connected node and connect it. Multiple minimum spanning trees may exist.

<img src="https://velog.velcdn.com/images/devjo/post/95dc2333-495a-42f2-8a9c-5f87c169913c/image.png" style="display: block; margin: 0 auto; height:200;" />

In this image, to find the minimum spanning tree, we first arbitrarily select $A$ and choose its nearest node $B$. Then we select node $D$ which is closest to $A$ and $B$. Subsequently selecting $C$, $F$, $E$, and $G$, the total length becomes 2+2+1+3+1+5=14.

---

### maximum flow problem

Arc values in a network can be thought of as capacity limits on flow, allowing us to find ways to transport maximum flow through the entire network to the destination. The starting point is called the source, and the ending point is called the sink.

<img src="https://velog.velcdn.com/images/devjo/post/352d595b-4b39-48c3-b42d-fdb665038b77/image.png" style="display: block; margin: 0 auto; height:200;" />

Through this image, when considered as an LP problem, it becomes as follows:

The decision variable $x_{i,j}$ is defined as the amount of water flowing through arc $(i, j)$. And $x_{t,s}$ is defined as an artificial arc that doesn't actually exist. The objective function becomes max $z=x_{t,s}$. The constraints are divided into two categories: first, from the arc perspective, $0 \le x_{s,a} \le 6$, $0 \le x_{s,c} \le 5$, $0 \le x_{a,b} \le 2$, $0 \le x_{a,d} \le 4$, $0 \le x_{c,d} \le 7$, $0 \le x_{b,t} \le 3$, $0 \le x_{d,t} \le 8$, $0 \le x_{t,s}$. Then, from the node perspective, $x_{t,s} = x_{s,a}+x_{s,c}$, $x_{s,a} = x_{a,b}+x_{a,d}$, $x_{a,b} = x_{b,t}$, $x_{s,c} = x_{c,d}$, $x_{a,d} + x_{c,d} = x_{d,t}$, $x_{b,t} + x_{d,t} = x_{t,s}$.

#### ford fulkerson method

In the first step of this method, we must check if a path from source to sink still exists. If not, it is determined by reverse arcs. Next, we must create a residual flow network using sub-steps. Find the minimum capacity of arcs in the path and denote it as $c$. Subtract $c$ from all arcs in the path. Add reverse arcs for all arcs in the path. Add $c$ to those arcs.

For example, if we set the path as $SABT$ in the above image, we find the smallest capacity $c$ among arcs in this path, which is $x_{a,b}=2$. Subtracting this capacity, $x_{s,a}=6 \rightarrow 4$, $x_{b,t}=3 \rightarrow 1$, and $x_{a,b}$ becomes 0 and is removed. Then, all reverse arcs are applied with the same $c=2$ value. If we set the next path as $SCDT$, $c$ is $x_{s,c}=5$, and $x_{c,d}=7 \rightarrow 2$, $x_{d,t}=8 \rightarrow 3$, and $x_{s,c}$ becomes 0 and is removed. Then, all reverse arcs are applied with the same $c=5$ value. If there's still a path to the sink and we set it as $SADT$, $c$ is $x_{d,t}=3$, and $x_{s,a}=4 \rightarrow 1$, $x_{a,d}=4 \rightarrow 1$. $x_{d,t}$ becomes 0 and is removed. Then, all reverse arcs are applied by adding the same $c=3$ value. Therefore, the reverse arc values become $x_{a,s}=5$, $x_{c,s}=5$, $x_{d,c}=5$, $x_{d,a}=3$, $x_{b,a}=2$, $x_{t,b}=2$, $x_{t,d}=8$.

Thus, the optimal solution is $x_{a,s} + x_{c,s} = x_{t,s} = 10$.

---

### project network

Each arc represents an activity. Each node represents an event.

<img src="https://velog.velcdn.com/images/devjo/post/aa29032c-ebe4-40f9-a981-6d7661acb1ad/image.png" style="display: block; margin: 0 auto; height:200;" />

Looking at this image, we can see that activity $A$ must be completed before activity $B$ can start, and each takes 5 and 6 days respectively. Such a network is called an AOA (activity on the arc network).

This network must start from node 1, and if there are no preceding activities, it must start from node 1. To represent project completion, a node must always be used. Nodes are numbered so that the number of the node representing the start of an activity must be greater than the number of the node it starts from. Nodes are connected by one arc, and two nodes cannot be connected by more than one arc. Dummy activities with zero time may need to be added, and node numbers may need to be reordered.

<img src="https://velog.velcdn.com/images/devjo/post/39dcaa76-f840-4113-9209-6d2770959774/image.png" style="display: block; margin: 0 auto; height:200;" />

The above image violates the rule of being connected by only one arc, so a dummy node must be added as shown in the image below.

<img src="https://velog.velcdn.com/images/devjo/post/30f6c23b-e96c-4f24-bc44-50bd78387d6f/image.png" style="display: block; margin: 0 auto; height:200;" />

---

### early-late event time, total float, critical path

#### 1. early-late event time

Early event time and late event time are associated with nodes in the network. The early event time of node $i$ is denoted as $ET(i)$, which is the earliest time the event corresponding to node $i$ can occur. The late event time of node $i$ is denoted as $LT(i)$, which is the latest time the event corresponding to node $i$ can occur without delaying project completion.

<img src="https://velog.velcdn.com/images/devjo/post/82c437c5-1edf-4b66-9ad8-cc71f6c90b14/image.png" style="display: block; margin: 0 auto; height:200;" />

For example, given a network as above, if we know that the early event times for nodes 2 and 3 are $ET(2)=8$ and $ET(3)=6$ respectively, then for the question of what the early event time of node 4 should be, we can answer that $ET(2)+4=12$, $ET(3)+5=11$, and since both activities must be completed, we must choose the maximum value, which is 12. The early event time for the final node 5 becomes 15.

<img src="https://velog.velcdn.com/images/devjo/post/1af08eb5-9e38-4565-ae2b-eb434d372b10/image.png" style="display: block; margin: 0 auto; height:200;" />

For example, given a network as above, if we know that the late event times for nodes 4 and 5 are $LT(4)=13$ and $LT(5)=10$ respectively, then for the question of what the late event time of node 3 should be, we can answer that $LT(4)-5=8$, $LT(5)-3=7$, and since nodes 4 and 5 can only start after node 3 occurs, we must find the minimum value, which is 7. The late event time for the first node 2 is 3.

<img src="https://velog.velcdn.com/images/devjo/post/4cfa7c55-b129-452b-b7cf-8bd6a0250752/image.png" style="display: block; margin: 0 auto; height:200;" />

In the above image, we set the early event time of node 1 to 0 and calculate. The early event time of node 2 is 9, and the early event time of node 3 is max $(ET(1)+6=6,ET(2)+0=9)=9$. The early event time of node 4 is 16, and the early event time of node 5 is max $(ET(3)+8=17,ET(4)+10=26)=26$. Finally, the early event time of node 6 ends at 38.

Now, starting from $LT(6)=38$ and calculating in reverse order, $LT(5)=26$, $LT(4)=16$, $LT(3)$ is min $(26-8=18,16-7=9)=9$, $LT(2)=9$, $LT(1)$ is min $(9-6=3,9-9=0)=0$, and we can see that $ET=LT$ for each node.

#### 2. total float of activities

The total float of an activity is the amount of time by which the activity can be delayed beyond its earliest possible start time without delaying project completion. It can be calculated using the following formula:

$$
TF(i, j)=LT(j)-ET(i)-t_{ij}
$$

It equals the late event time of the node minus the early event time minus the duration of the activity between the nodes.

Using the same example above, Activity $B : TF(1, 2)=LT(2)-ET(1)-t_{12}=9-0-9=0$, dummy : TF(2, 3)=LT(3)-ET(2)-t_{23}=9-9-0=0$, Activity $A : TF(1, 3)=LT(3)-ET(1)-t_{13}=9-0-6=3$, Activity $C : TF(3, 4)=LT(4)-ET(3)-t_{34}=16-9-7=0$, Activity $D : TF(3, 5)=LT(5)-ET(3)-t_{35}=26-9-8=9$, Activity $E : TF(4, 5)=LT(5)-ET(4)-t_{45}=26-16-10=0$, Activity $F : TF(5, 6)=LT(6)-ET(5)-t_{56}=38-26-12=0$.

#### 3. critical activity and critical path

All activities with total float of 0 are called critical activities. A path from the start node to the completion node consisting entirely of critical activities is called a critical path. Critical activities are those where if the activity start is delayed, the project is also delayed.

Visualizing the critical path from the above example:

```
| $A(6)$ | $TF(A)=3$ |  $D(8)$  | $TF(D)=9$ | $F(12)$ |
|       $B(9)$       | $C(7)$ |   $E(10)$   | $F(12)$ |
                  dummy(0)
```

Critical Path: $B → Dummy → C → E → F$ (Total duration: 38)

This can be modified using the LP method. The decision variable $x_i$ is the time of node $i$. The objective function can be defined as min $z=x_6-x_1$, and the constraints can be defined as $x_2 \ge x_1+9$, $x_3 \ge x_1+6$, $x_3 \ge x_2+0$, $x_4 \ge x_3+7$, $x_5 \ge x_3+8$, $x_5 \ge x_4+10$, $x_6 \ge x_5+12$.

#### 4. pert

Since the duration of each activity cannot be estimated with 100% accuracy, each activity duration can be modeled as $T_{ij}$. In PERT, the duration of each activity must be estimated under three different conditions. $a$ is the estimate of activity duration under the most favorable conditions, $b$ is the estimate of activity duration under the most unfavorable conditions, and $m$ is the estimate of the duration the activity will last under the most likely conditions.

PERT requires the assumption that $T_{ij}$ follows a $\beta$ distribution, and the mean and variance are defined as follows:

$$
E(T_{ij})=\frac{a+4m+b}{6}, \\
V(T_{ij})=\frac{(b-a)^2}{36}
$$

<img src="https://velog.velcdn.com/images/devjo/post/c9c0ee01-5bc8-4f2d-980e-3cbd855d6d8b/image.png" style="display: block; margin: 0 auto; height:200;" />

The above image is the same example but with the three indicators included in the arcs.

Through this, each mean is calculated as follows:

$$
E(T_{12})=\frac{7+36+11}{6}=9, \\
E(T_{13})=\frac{5+24+9}{6}=6.33, \\
E(T_{23})=0, \\
E(T_{34})=\frac{5+28+9}{6}=7, \\
E(T_{35})=\frac{7+32+10}{6}=8.17, \\
E(T_{45})=\frac{8+40+14}{6}=10.33, \\
E(T_{56})=\frac{11+48+14}{6}=12.17, \\
$$

And $E(T)=9+0+7+10.33+12.17=38.5$. The standard deviation is $\sqrt{V(t)}=1.46$, making it possible to find the probability of completion within a specific number of days.

For example, the probability of completion within 37 days is $P(T \le 37)=P(\frac{T-E(T)}{std(T)} \le \frac{37-E(T)}{std(T)})=P(\frac{T-38.5}{1.46} \le \frac{-1.5}{1.46})=P(z \le -1.03)=0.15$

---

### References

[Original Source #1](https://youtu.be/x0RKKsg0B5o?si=jfOQyd8-AvE-onyc)

[Original Source #2](https://youtu.be/jXP8H6-fCCk?si=2ymEWMwzwWdKpXus)

[Original Source #3](https://youtu.be/xGDXXKDWidI?si=hoDX0ch26WcK3QeC)

[Original Source #4](https://youtu.be/v75Kal6NtWA?si=i1lBFPfcB2kY0ARH)

[Original Source #5](https://youtu.be/b1btzVsKp8E?si=83FiTR7yUdMAly6D)

[Original Source #6](https://youtu.be/Gvx7oG2pFCA?si=2lNedMgd-y-Xc2xU)

[Original Source #7](https://youtu.be/sSgI072tN5k?si=fKGDCWV3pO-V-SD0)

[Original Source #8](https://youtu.be/Ovmk9KIFjHE?si=_jLVr6OQ-N94YkFe)

[Original Source #9](https://youtu.be/wCo6Hq6hOnY?si=Y9p-ulE2j34BqgPG)

[Original Source #10](https://youtu.be/VqhQ_qdE76o?si=661FGe48RQRuSocL)
---
title: 'Learning-enabled flexible job-shop scheduling for scalable smart
manufacturing'
date: '2025-05-10'
tags: ['robotics', 'paper review']
---

### Abstract

In smart manufacturing systems (SMS), flexible job-shop scheduling with transportation constraints (FJSPT) is essential for finding optimal solutions that maximize productivity while considering production flexibility based on automated guided vehicles (AGVs). Recent deep reinforcement learning (DRL)-based methods for FJSPT have faced scale generalization problems.

In this paper, we propose a new DRL-based method called Heterogeneous Graph Scheduler (HGS) that provides near-optimal solutions regardless of the scale of jobs, machines, and vehicles. HGS modifies the disjunctive graph to model FJSPT as a heterogeneous graph of jobs, machines, and vehicles, dynamically representing both processing and transportation.

HGS includes a structure-aware heterogeneous graph encoder to improve scale generalization. This encoder uses multi-head attention to locally aggregate and globally integrate messages. The three-stage decoder performs end-to-end decision-making by selecting nodes most likely to minimize makespan (job completion time) and outputting scheduling solutions.

---

### Introduction

As the smart manufacturing field continues to evolve, numerous new information technologies such as the Internet of Things (IoT), cloud computing, big data, and artificial intelligence are gradually being integrated into manufacturing processes to increase production efficiency and flexibility. Recently, many companies in the actual manufacturing sector have been utilizing transportation resources such as automated guided vehicles (AGVs) to enhance the flexibility and diversity of flexible manufacturing systems (FMS). This can be mathematically formulated as the flexible job-shop scheduling problem with transportation constraints (FJSPT).

However, due to the increasing complexity of production scheduling, this problem poses significant challenges such as assigning jobs to compatible machines and allocating AGVs for transporting intermediate products. Deep reinforcement learning (DRL)-based FJSPT schedulers have emerged as a promising approach that offers the potential to discover near-optimal solutions while reducing computation time.

The main challenge of this research is the scale generalization problem. In real-world scenarios, smart manufacturing systems frequently experience changes in process environments (i.e., scale changes) such as insertion of new jobs or addition/failure of machines and vehicles. While schedulers work effectively on unseen instances of similar size to trained instances, their efficacy significantly decreases on unseen large-scale instances. This means that as manufacturing environments change, schedulers may generate low-quality solutions, leading to productivity losses.

Another technical challenge for DRL-based FJSPT schedulers is end-to-end decision-making. Numerous DRL-based methods for manufacturing process scheduling adopt rule-based decision frameworks that select one of several predefined dispatching rules at decision points. However, this approach has the disadvantage of heavily relying on expert experience in rule design and insufficient exploration of the action space.

---

### Related work

<img src="https://velog.velcdn.com/images/devjo/post/d885e1b4-a75e-4e27-bea9-333f6be2817d/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

In recent years, various solutions such as exact methods, metaheuristics, and DRL have been used to solve the flexible job-shop scheduling problem (FJSP). FJSP is widely known as an NP-hard combinatorial optimization problem.

Exact methods are traditional but can find optimal solutions for small-scale problems. Heydari M.2018 and Meng I.2020 presented very accurate solutions for small to medium-scale problems using linear programming (LP) and constraint programming (CP). Homayouni SM.2021 proposed an FJSPT solution using mixed-integer linear programming assuming two AGVs. However, while these methods can find optimal solutions, they lack scalability for large-scale problems due to exponentially increasing computational costs.

Metaheuristics have been widely used to solve FJSP due to their flexibility and effectiveness in finding near-optimal solutions. Ren W.2022 developed a GA-PSO hybrid algorithm to solve FJSPT considering dynamic events such as vehicle failures and recharging. While these methods can find near-optimal solutions, they are computationally inefficient in wide search spaces and may struggle with generalization across different scales. Additionally, they have limitations in rapidly changing environments where unexpected disruptions may occur before modified schedules can be implemented.

An end-to-end DRL framework for FJSPT was proposed, where the DRL agent determines which vehicle to transport a specific job to a specific machine at each decision step. However, this model was only demonstrated on small-scale instances without considering scale generalization. Several studies investigating scale generalization have implemented GNN-based DRL frameworks. GNNs can handle graphs of various sizes, overcoming the limitation that fixed-size vectors cannot solve problems of different sizes.

---

### Preliminary

FJSPT can be defined as follows:

-n job set: $J=\{J_1, \cdots, J_n\}$

-m machine set: $M=\{M_1, \cdots, M_m\}$

-v vehicle set: $V=\{V_1, \cdots, V_v\}$

Each job consists of a set of $n_i$ consecutive operations $\mathcal{O}_i = \{O_{i_1}, \cdots, O_{in_i}\}$ with precedence constraints. This means that operation $O_{ij}$ requires different processing times $T^p_{,ijk}$ depending on each machine $M_k \in \mathcal{M}_{ij}$.

The unloading time $T^t_{i,j,u}$ represents the time for $V_u$ to access the product location of $O_{ij}$ and load the product in the unloading state. The loading time $T^t_{kk'}$ represents the time for a vehicle to transport a product to a machine in the loading state, and we assume that the loading transportation time between two machines is the same for all vehicles.

The objective function of FJSPT is to minimize $C_{max}$, the total time required to complete all jobs.

#### Disjunctive graph for FJSP

<img src="https://velog.velcdn.com/images/devjo/post/efd4a990-70da-4790-9136-c98dfdb896e2/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

The image above shows a disjunctive graph for FJSP. This graph is denoted as $\mathcal{G} = (\mathcal{O}, \mathcal{C}, \mathcal{D})$.

$\mathcal{O} = \{O_{ij}|\forall i, j\} \cup \{Start, End\}$ is the set of operation nodes including all operations and two dummy nodes (processing time 0) representing the start and end of production. $\mathcal{C}$ is the set of conjunctive arcs. Each flow represents the processing order of job $J_i$. $D=\cup_k D_k$ constitutes the set of undirected disjunctive arcs. Here, $D_k$ forms a clique connecting operations that can be executed on machine $M_k$.

Since operations in FJSP can be performed on multiple machines, a single operation node can be connected to multiple disjunctive arcs.

#### Attention model

The Attention Model (AM) is a weighted message passing technique between nodes in a graph, learning attention scores based on how related nodes are to each other.

$h_x \in \mathbb{R}^{d_h}$ represents the embedding vector of node $x$, where $d_h$ is the embedding dimension. The model requires three vectors: query, key, and value to form aggregated node embeddings.

$$
q_x = W_qh_x, \\
k_y=W_kh_y, \\
v_y=W_vh_y, \\
x, y \in X
$$

Here, $W_q, W_k \in \mathbb{R}^{d_k \times d_h}$ and $W_v \in \mathbb{R}^{d_v \times d_h}$ are learnable parameter matrices. When $y=x$, it is called self-attention. The compatibility $\sigma_{xy}$ is determined using the query of node $x$ and the key of node $y$ through scaled dot product.

$$
\sigma_{xy}=\begin{cases} \frac{q_x^Tk_y}{\sqrt{d_k}} \\ -\infty \end{cases}
$$

Here, $\infty$ prevents message passing between non-adjacent nodes.

$$
\bar{\sigma_{xy}}=\frac{e^{\sigma_{xy}}}{\sum_{y' \in X} e^{\sigma_{xy'}}}
$$

This represents the importance between $x$ and $y$, where a larger value means node $x$ depends more on node $y$. Subsequently, the attention-based single-head node embedding $h'_{x,z}$ for node $x$ is calculated as the weighted sum of messages $v_y$.

$$
h'_{x,z}=\sum_{y \in X} \bar{\sigma_{xy} v_y}
$$

Here, $z \in \{1, \cdots, Z\}$ is the head index. Multi-head attention (MHA) allows nodes to obtain neighbor messages from various attention types, and this runs $Z$ times in parallel. Therefore, $d_k=d_v=\frac{d_h}{Z}$.

---

### Heterogeneous Graph Scheduler (HGS)

<img src="https://velog.velcdn.com/images/devjo/post/6ead7c58-95a1-4911-812b-317553642dcf/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

To solve FJSPT, we propose the HGS module consisting of three main components: heterogeneous graph, structure-aware heterogeneous encoder, and three-stage decoder.

First, the heterogeneous graph effectively encapsulates the characteristics of jobs, machines, and vehicles and their interrelationships while maintaining low graph density. Next, we represent this heterogeneous graph using the proposed encoder, which includes three sub-encoders and one global encoder. Each sub-encoder allows specific nodes to locally aggregate messages from adjacent nodes belonging to different classes. Subsequently, the global encoder integrates encoded messages from all nodes. Based on this graph representation, the decoder generates composite actions of job-machine-vehicle (O-M-V) pairs at decision points.

Traditional disjunctive graphs are difficult to represent FJSPT. The reasons were as follows:

1. Vehicle attributes are not included. There are no attributes such as the number of vehicles, location, transportation time, and status (loading or unloading).

2. Graph density becomes high. As the graph size (number of nodes) increases, the disjunctive arc set $\mathcal{D}$ becomes much larger. High-density graphs limit graph neural network performance.

3. It is difficult to express processing times for compatible machines.

Therefore, we propose a new heterogeneous graph $H$ in this paper. The graph is defined as $\mathcal{H} = (\mathcal{O} \cup \mathcal{M} \cup \mathcal{V}, \mathcal{C}, \mathcal{\xi}_m \cup \mathcal{\xi}_{v}^{off} \cup \mathcal{\xi}_{v}^{on})$. Machine nodes $M_k \in \mathcal{M}$ and vehicle nodes $V_u \in \mathcal{V}$ represent the characteristics of machines and vehicles, respectively. The arc $E_{iju}^v$ of the unloading vehicle arc $\mathcal{\xi}_{v}^{off}$ represents the unloading transportation time for $V_u$ to arrive at the product location related to $O_{ij}$. The arc $E_{kk'}^v$ of the loading vehicle arc $\mathcal{\xi}_{v}^{on}$ represents the loading transportation time for a vehicle in the loading state to move from $M_k$ to $M_{k'}$. $\mathcal{\xi}_{mt}$ and $\mathcal{\xi}_{vt}^{off}$ change dynamically while solving FJSPT.

Let the neighbor nodes of $O_{ij}$ at time $t$ be $\mathcal{N}_t(O_{ij}) = \{\mathcal{N}_{mt}(O_{ij}) \cup \mathcal{N}_{vt}(O_{ij})\}$. Here, $\mathcal{N}_{mt}(O_{ij})$ are neighbor machines and $\mathcal{N}_{vt}(O_{ij})$ are neighbor vehicles. $\mathcal{N}_{mt}(O_{ij})$ represents the available machines for $O_{ij}$ at time $t$. Since some machines belonging to $\mathcal{M}_{ij}$ may be unavailable due to preemption by other jobs, $\mathcal{N}_{mt}(O_{ij}) \subseteq \mathcal{M}_{ij}$. $\mathcal{N}_{vt}(O_{ij})$ represents currently available vehicles excluding those in transit.

#### Markov decision process (MDP)

At each time step $t$, the agent perceives the state $s_t$ and selects an action $a_t$.

The action transports unassigned jobs using available vehicles to be processed on empty machines. The heterogeneous graph is $\mathcal{H}_t(\mathcal{O} \cup \mathcal{M} \cup \mathcal{V}, \mathcal{C}, \mathcal{\xi}_{mt} \cup \mathcal{\xi}_{vt}^{off} \cup \mathcal{\xi}_{v}^{on})$. In this graph, we define raw features of nodes and edges.

The raw feature vector $\mu_{ij} \in \mathbb{R}^7$ of operation node $O_{ij}$ consists of 7 elements. The raw feature vector $\mu_k \in \mathbb{R}^4$ of machine $M_k$ consists of 4 elements. The raw feature vector $\mu_v \in \mathbb{R}^4$ of vehicle $V_u$ consists of 4 elements.

The reward is composed of the difference in makespan as $r(s_t, a_t, s_{t+1}) = C_{max}(s_t) - C_{max}(s_{t+1})$. We define the lower bound of the estimated completion time of operation $O_{ij}$ as $C_{LB}(O_{ij}, s_t)$. We calculate this lower bound recursively as $C_{LB}(O_{ij}, s_t)=C_{LB}(O_{i(j-1)}, s_t)+\bar{T}^p_{ij}$. With discount rate $\gamma=1$, the cumulative reward is $G=\sum_{t=0}^{|O|} r(s_t, a_t, s_{t+1}) = C_{max}(s_0) - C_{max}$. Therefore, maximizing $G$ is equivalent to minimizing makespan.

#### Structure-aware heterogeneous encoder

The core concept of the proposed encoder is to construct three sub-encoders (operation, machine, vehicle) that individually aggregate neighbor messages considering node classes.

Intuitively, from the machine node's perspective, it is a priority to select operation nodes with low processing times, ignoring vehicle transportation times. Conversely, from the vehicle node's perspective, it is a priority to select operation nodes with low transportation times, ignoring machine processing times. From the operation node's perspective, it should be assigned to nodes with both low transportation and processing times. Following local encoding of graph nodes, the global encoder integrates messages from all nodes.

We develop sub-encoders $F_O, F_M, F_V$ for operation, machine, and vehicle nodes. Sub-encoders capture node embeddings under different node classes and output both node and edge embeddings. Embedding objects passing through layer $l \in \{1, \cdots, L-1\}$ are denoted as $h_{ij}^l, h_k^l, h_u^l$. The process of extracting local relational knowledge is as follows. $\mathcal{F}_X^l$ updates by aggregating embeddings from the previous layer and neighbor node embeddings and their relationships $h_{xy}^{(l-1)} \in \mathbb{R}^{d_e}$.

#### Three-stage decoder

Through $L$ sub-encoders, we obtain node and edge embeddings as $\{h_{ij}^L, h_{k}^L, h_{u}^L, h_{ijk}^L, h_{iju}^L, h_{kk'}^L\}$. Using these embeddings, the decoder determines the action pair $(O_{ij}, M_k, V_u)$.

First, we construct a context node $h_{c,t}^L$ that includes the graph embedding $\bar{h}_t^L$ and the glimpse node embedding $h_{g,(t-1)}$ from the previous step. Therefore, the context node for the next time can be expressed as $h_c^{L+1}=\text{MHA}_c^{L+1} (\{h_{ij}^L\})$. We calculate the operation selection probability as $Pr(O_{ij}|s_t)=\frac{e^{\sigma_{cij}^{L+1}}}{\sum_{i'=1}^n \sum_{j'=1}^{n_{i'}} e^{\sigma_{ci'j'}^{L+1}}}$.

Next, when calculating the machine selection probability distribution, we add edge embeddings as $h_{c}^{L+2}=\text{MHA}_c^{L+2} (\{h_k^L + h_{ijk}^L\})$. We calculate the machine selection probability as $Pr(M_k|s_t, O_{ij})=\frac{e^{\sigma_{ck}^{L+2}}}{\sum_{k'=1}^m e^{\sigma_{ck'}^{L+2}}}$.

Finally, when calculating the vehicle selection probability distribution, we add edge embeddings as $h_{c}^{L+3}=\text{MHA}_c^{L+3} (\{h_u^L + h_{iju}^L\})$. We calculate the vehicle selection probability as $Pr(V_u|s_t, O_{ij})=\frac{e^{\sigma_{cu}^{L+3}}}{\sum_{u'=1}^v e^{\sigma_{cu'}^{L+3}}}$.

By decoding these embeddings, we generate the composite action $a_t$.

---

### Conclusion

In AGV-based smart manufacturing systems (SMS), scale generalization is an important challenge that must be addressed when introducing DRL-based solutions. Despite their excellent performance, DRL-based solutions may have limitations due to inherently long and costly learning curves. Therefore, the development of scale-agnostic DRL-based solutions is necessary.

In this paper, we proposed HGS (Heterogeneous Graph Scheduler), the first DRL-based approach that provides near-optimal solutions regardless of the scale of jobs, machines, and vehicles, solving the challenge of FJSPT (flexible job-shop scheduling with transportation constraints) that enables scale generalization. As the scale increases, the performance advantage of the HGS model becomes more pronounced, achieving the best solutions (0% gap) across all instances. HGS has proven to be a reliable and efficient solution for modern manufacturing challenges, ensuring optimal performance and adaptability across various scales and conditions.

---

### References

[Original Source #1](https://csi.dgist.ac.kr/)

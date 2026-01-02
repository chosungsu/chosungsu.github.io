---
title: 'Manipulator Kinematics'
date: '2024-02-05'
tags: ['Robotics', 'Kinematics', 'lecture']
---

### Link Description

매니퓰레이터는 조인트에 의해 사슬로 연결된 일련의 몸체로 생각될 수 있습니다. 이 몸체들을 링크(links)라고 부릅니다. 조인트는 인접한 링크 쌍 사이에 연결을 형성합니다. 하위 쌍(lower pair)이라는 용어는 상대 운동이 두 표면이 서로 미끄러지는 것으로 특징지어질 때 한 쌍의 몸체 사이의 연결을 설명하는 데 사용됩니다. Revolute, Prismatic, Cylindrical, Planar, Screw, Spherical이 하위 쌍 조인트입니다.

기계 설계상의 고려 사항은 일반적으로 매니퓰레이터가 단일 자유도를 나타내는 조인트로 구성되는 것을 선호합니다. 대부분의 매니퓰레이터는 회전 조인트(revolute joints)를 가지거나 프리즘 조인트(prismatic joints)라고 불리는 미끄러지는 조인트를 가집니다. $n$ 자유도를 가진 조인트로 메커니즘이 구축되는 드문 경우에도, 그것은 $n-1$ 개의 길이가 0인 링크로 연결된 $n$ 개의 단일 자유도 조인트로 모델링될 수 있습니다. 따라서, 일반성을 잃지 않고 단일 자유도 조인트를 가진 매니퓰레이터만 고려할 것입니다.

<img src="https://velog.velcdn.com/images/devjo/post/b8c76861-aeb3-4e23-9329-8cd403a5ef7b/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

링크는 팔의 움직이지 않는 베이스($\text{link } 0$)부터 시작하여 번호가 매겨집니다. 첫 번째 움직이는 몸체는 $\text{link } 1$이며, 순서대로 팔의 자유 끝인 $\text{link } n$까지 이어집니다. 엔드 이펙터를 일반적으로 3차원 공간에 위치시키기 위해서는 최소 6개의 조인트가 필요합니다. 조인트 축은 공간의 선으로 정의됩니다. 조인트 축 $i$는 $\text{link } i$가 $\text{link } i-1$에 대해 회전하는 공간의 선, 또는 벡터 방향으로 정의됩니다. 공간의 임의의 두 축에 대해, 그들 사이의 잘 정의된 거리 측정이 존재합니다. 이 거리는 두 축에 상호 수직인 선(mutually perpendicular line)을 따라 측정됩니다. 이 상호 수직선은 항상 존재하며, 두 축이 평행할 때를 제외하고는 유일합니다. 평행한 경우에는 길이가 같은 많은 상호 수직선이 있습니다.

---

### Link-Connection

#### Intermediate links in the chain

<img src="https://velog.velcdn.com/images/devjo/post/1e9e4b30-42d4-4bf5-a309-e28ed23c802c/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

인접한 링크들은 그들 사이에 공통 조인트 축을 가집니다. 상호 연결의 한 매개변수는 이 공통 축을 따라 한 링크에서 다음 링크까지의 거리에 관한 것입니다. 이 매개변수를 링크 오프셋($\text{link offset}$)이라고 부릅니다. 조인트 축 $i$에서의 오프셋을 $d_i$라고 부릅니다. 두 번째 매개변수는 이 공통 축을 중심으로 한 링크와 그 이웃 링크 사이의 회전량을 설명합니다. 이것을 조인트 각($\text{joint angle}$) $\theta_i$라고 부릅니다.

#### First and last links in the chain

링크 길이 $a_i$와 링크 꼬임 $\alpha_i$는 조인트 축 $i$와 $i+1$에 의존합니다. 따라서 $a_1$부터 $a_{n-1}$까지와 $\alpha_1$부터 $\alpha_{n-1}$까지가 정의됩니다. 체인의 끝에서는 이러한 양을 영(zero)으로 할 것입니다. 즉, $a_0 = a_n = 0.0$ 및 $\alpha_0 = \alpha_n = 0.0$입니다.

---

### Manipulator Kinematics

#### Derivation of link transformations

좌표계 $\{i\}$를 좌표계 $\{i-1\}$에 대해 정의하는 변환 ${}^{i-1}_i T$를 구성하고자 합니다. 일반적으로 이 변환은 네 가지 링크 매개변수의 함수가 될 것입니다. 주어진 로봇에 대해, 이 변환은 오직 하나의 변수의 함수일 것이고 나머지 세 매개변수는 기계 설계에 의해 고정됩니다.

frame $\{R\}$는 frame $\{i-1\}$과 $\theta_i$만큼의 회전만 다릅니다.
frame $\{Q\}$는 frame $\{R\}$과 $d_i$만큼의 이동만 다릅니다.
frame $\{P\}$는 frame $\{Q\}$와 $\alpha_i$만큼의 회전만 다릅니다.
frame $\{i\}$는 frame $\{P\}$와 $a_i$만큼의 이동만 다릅니다.

$$
{}^{i-1}P = {}^{i-1}_i T {}^{i}P
$$

위 식을 변환으로 고려한다면 다음과 같습니다.

$$
\begin{aligned}
&{}^{i-1}_i T = R_X(\alpha_{i-1})D_X(a_{i-1})R_Z(\theta_i)D_Z(d_i) \\
&= Screw_X(a_{i-1}, \alpha_{i-1})Screw_Z(d_i, \theta_i)
\end{aligned}
$$

#### Concatenating link transformations

링크 좌표계가 정의되고 해당 링크 매개변수가 발견되면 개별 링크 변환 행렬 ${}^{i-1}_i T$를 계산할 수 있습니다. 그런 다음 링크 변환을 함께 곱하여 frame $\{N\}$을 frame $\{0\}$와 관련시키는 단일 변환 $T$를 찾을 수 있습니다.

$$
{}^0_N T = {}^{0}_1 T {}^{1}_2 T {}^{2}_3 T \cdots {}^{N-1}_N T
$$

#### Frames

베이스 좌표계는 $\{B\}$라고 표기되며 매니퓰레이터의 베이스에 위치합니다. 이는 frame $\{0\}$의 또 다른 이름입니다. 스테이션 좌표계는 $\{S\}$라고 표기되며 로봇의 모든 동작은 이것을 기준으로 수행됩니다. 스테이션 좌표계는 항상 베이스 좌표계에 대해 지정됩니다. 즉, ${}^{B}_S T$가 정의됩니다. 손목 좌표계는 $\{W\}$라고 표기되며 매니퓰레이터의 마지막 링크에 부착됩니다. 도구 좌표계는 $\{T\}$라고 표기되며 로봇이 잡고 있는 모든 도구의 끝에 부착됩니다. 손이 비어 있을 때는 $\{T\}$의 원점이 보통 로봇 손가락 끝 사이에 위치합니다. 마지막으로 목표 좌표계는 $\{G\}$라고 표기되며 로봇이 도구를 이동해야 하는 위치에 대한 설명입니다. 동작이 끝날 때 도구 좌표계가 목표 좌표계와 일치하도록 가져와야 함을 의미합니다.

---

### 참고 자료

[원본 경로 #1](https://www.changjiangcai.com/files/text-books/Introduction-to-Robotics-3rd-edition.pdf?utm_source=chatgpt.com)


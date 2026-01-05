---
title: 'Trajectory Generation'
date: '2024-02-12'
tags: ['Robotics', 'Kinematics', 'lecture']
---

### General Consideration In Path Description

대부분의 경우 스테이션 프레임 $\{S\}$에 대한 프레임 $\{T\}$의 움직임으로 매니퓰레이터의 움직임을 고려할 것입니다. 툴 프레임의 움직임을 스테이션 프레임에 대해 지정하면, 움직임 설명이 특정 로봇, 엔드 이펙터 또는 공작물과 분리(decouple)됩니다. 이는 모듈성(modularity)을 확보하여 동일한 경로 설명이 다른 매니퓰레이터나 동일한 매니퓰레이터라도 다른 툴 크기와 함께 사용될 수 있도록 합니다.

<img src="https://velog.velcdn.com/images/devjo/post/90226429-7030-4a3a-8bbb-7f5789c642cc/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

위 이미지처럼 기본 문제는 매니퓰레이터를 초기 위치에서 원하는 최종 위치로 이동하는 것입니다. 일반적으로 이 움직임은 스테이션에 대한 툴의 방향 변화와 위치 변화를 모두 포함합니다.

#### Cartesian-Space Schemes

엔드 이펙터가 취하는 경로의 공간적 모양(spatial shape)은 공간을 통과하는 직선이 아니라, 사용되는 특정 매니퓰레이터의 기구학에 의존하는 복잡한 모양입니다. 그리고 데카르트 방식은 실행하는 데 계산 비용이 더 많이 듭니다. 왜냐하면 실행 시간에 경로 업데이트 속도로 역기구학을 풀어야 하기 때문입니다.

종종 툴 팁이 공간을 통과하여 직선으로 움직이도록 하는 공간 경로를 쉽게 지정할 수 있기 위해서 데카르트 직선 운동을 정의합니다.

<img src="https://velog.velcdn.com/images/devjo/post/c63fee47-75b3-4eb2-b7e8-d5a88be77a7e/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

그러나 각 경유점에서 방향을 회전 행렬로 지정하는 경우, 그 요소를 선형적으로 보간할 수 없습니다. 그렇게 하면 항상 유효한 회전 행렬이 되지 않을 수 있기 때문입니다. 따라서 Angle-Axis 표현으로 3x1 데카르트 위치 표현과 결합하여 데카르트 위치 및 방향의 6x1 벡터 $x$를 갖습니다.

$$
\mathbf{x}_A = \begin{bmatrix} {}^S\mathbf{P}_{A_{ORG}} \\ \boldsymbol{\mathcal{S}K}_A \end{bmatrix}
$$

경유점 ${A}$에서 ${B}$로 이동할 때, 총 회전량을 최소화해야 합니다. 이 최소화된 회전을 달성하는 $\boldsymbol{\mathcal{S}K}_B$를 선택해야 합니다.

#### Geometric Problems with Cartesian Paths

초기 위치와 최종 목표점 모두 매니퓰레이터의 작업 공간 내에 있더라도 이 두 지점을 연결하는 직선 상의 모든 지점이 작업 공간 내에 있지는 않을 수 있습니다. 매니퓰레이터의 작업 공간에는 데카르트 공간에서 원하는 속도를 산출하는 유한한 관절 속도를 선택하는 것이 불가능한 위치가 있습니다. 매니퓰레이터가 데카르트 직선 경로를 따르다가 메커니즘의 특이 구성에 접근하면 하나 이상의 관절 속도가 무한대로 증가할 수 있습니다. 마지막 문제는 로봇이 시작점에 있는 물리적 해(physical solution)와 동일한 해로 목표점에 도달할 수 없는 경우에 발생할 수 있습니다.

---

### Point-to-Point Trajectories

정지 상태에서 다른 구성에서 정지 상태로 이동하는 것이 가장 간단한 유형의 움직임입니다. 시작 구성 $\theta_{\text{start}}$에서 끝 구성 $\theta_{\text{end}}$까지의 직선은 관절 공간(joint space)이나 작업 공간(task space)에서 정의될 수 있습니다. 관절 한계는 일반적으로 각 관절 $i$에 대해 $\theta_{i, \min} \le \theta_i \le \theta_{i, \max}$ 형태를 취하므로, 허용되는 관절 구성은 관절 공간 $\Theta_{\text{free}}$에서 볼록 집합(convex set)을 형성합니다. 따라서 $\Theta_{\text{free}}$ 내의 두 끝점 사이의 직선은 $\Theta_{\text{free}}$ 내에 있습니다.

$$
\mathbf{\theta}(s) = \mathbf{\theta}_{\text{start}} + s(\mathbf{\theta}_{\text{end}} - \mathbf{\theta}_{\text{start}})
$$

또 다른 방법으로는 스크류 모션이 있습니다.

$$
\mathbf{X}(s) = \mathbf{X}_{\text{start}} \exp(\log(\mathbf{X}_{\text{start}}^{-1} \mathbf{X}_{\text{end}})s)
$$

이 스크류 모션은 스크류 축이 일정하다는 의미에서 직선 운동을 제공합니다. 그러나 엔드 이펙터의 원점은 스크류 모션을 따르기 때문에 일반적으로 데카르트 공간에서 직선을 따르지는 않습니다.

#### Joint-Space Schemes

각 경로점은 일반적으로 툴 프레임 $\{T\}$의 원하는 위치 및 방향으로 지정되며, 이는 역기구학(inverse kinematics)을 적용하여 원하는 관절 각도 집합으로 변환됩니다. 그런 다음 $n$개의 각 관절에 대해 경유점을 통과하고 목표점에서 끝나는 부드러운 함수를 찾습니다.

특정 시간 $t_f$ 동안 툴을 초기 위치 $\theta_0$에서 목표 위치 $\theta_f$로 이동하는 문제를 고려할 때 초기 및 최종 위치에 대한 제약조건은 다음과 같습니다.

$$
\begin{aligned}
&\theta(0) = \theta_0, \\
&\theta(t_f) = \theta_f
\end{aligned}
$$

초기 및 최종 속도는 0입니다. 이 네 가지 제약 조건은 최소 3차 다항식으로 만족될 수 있으며 3차 다항식의 형태는 다음과 같습니다.

$$
\theta(t) = a_0 + a_1 t + a_2 t^2 + a_3 t^3
$$

---

### 참고 자료

[원본 경로 #1](https://www.changjiangcai.com/files/text-books/Introduction-to-Robotics-3rd-edition.pdf?utm_source=chatgpt.com)

[원본 경로 #2](https://hades.mech.northwestern.edu/images/7/7f/MR.pdf)

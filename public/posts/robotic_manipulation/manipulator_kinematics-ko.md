---
title: 'Manipulator Kinematics'
date: '2024-11-27'
tags: ['Robotics', 'Manipulation', 'lecture']
---

### Forward Kinematics

#### Problem Statement

Forward Kinematics는 로봇의 각 조인트 변수(각도 또는 변위)가 주어졌을 때 말단 장치(end-effector)의 구성(configuration)을 결정하는 문제입니다.

조인트 공간 (Joint Space, $Q$)은 로봇의 가능한 모든 조인트 변수 값의 집합입니다. $p$개의 회전 조인트와 $r$개의 프리즈매틱 조인트를 가진 매니퓰레이터의 경우 $Q = \mathbb{T}^p \times \mathbb{R}^r$입니다. 자유도(DOF)는 $p+r$입니다.

베이스 프레임 (Base Frame, $\text{S}$)은 매니퓰레이터의 기본 링크(링크 0)에 고정된 정지 좌표계입니다. 툴 프레임 (Tool Frame, $\text{T}$)은 말단 장치에 부착되어 로봇과 함께 움직이는 좌표계입니다.

정운동학 맵 $g_{\text{st}}: Q \rightarrow \text{SE}(3)$은 조인트 변수 $\boldsymbol{\theta} \in Q$에 대해 

$$
g_{\text{st}}(\boldsymbol{\theta}) = g_{\text{sl}_1}(\theta_1) g_{\text{l}_1\text{l}_2}(\theta_2) \cdots g_{\text{l}_{n-1}\text{l}_n}(\theta_n) g_{\text{l}_n\text{t}}
$$

#### The Product of Exponentials Formula

각 조인트의 운동이 조인트 축과 연관된 트위스트 $\boldsymbol{\xi}_i$에 의해 생성된다는 사실을 이용하여 정운동학을 보다 기하학적으로 표현할 수 있습니다.

$$
g_{\text{ab}}(\theta) = e^{\widehat{\xi}\theta} g_{\text{ab}}(0)
$$

따라서 $n$ 자유도를 가진 임의의 개방 사슬(open-chain) 매니퓰레이터에 대한 제품 지수 공식은 다음과 같습니다.

$$
g_{\text{st}}(\theta) = e^{\widehat{\xi}_1\theta_1} e^{\widehat{\xi}_2\theta_2} \cdots e^{\widehat{\xi}_n\theta_n} g_{\text{st}}(0)
$$

$g_{\text{st}}(0)$는 $\theta = \mathbf{0}$일 때의 툴 프레임의 베이스 프레임에 대한 구성입니다.

#### Parameterization of Manipulators via Twists

계산을 단순화하기 위해 기준 구성($\theta = \mathbf{0}$)에서 베이스 프레임과 툴 프레임을 일치시키도록 선택할 수 있습니다. 이 경우, $g_{\text{st}}(0) = \mathbf{I}$가 되어 공식이 다음과 같이 단순화됩니다.

$$
g_{\text{st}}(\theta) = e^{\widehat{\xi}_1\theta_1} \cdots e^{\widehat{\xi}_n\theta_n}
$$

데나빗-하텐버그(D-H) 매개변수는 로보틱스의 사실상의 표준 매개변수화입니다. D-H 매개변수는 각 링크에 부착된 프레임 $\text{L}_i$의 위치와 방향을 지정하는 규칙을 사용하여 인접 프레임 간의 동차 변환 $g_{\text{l}_{i-1}\text{l}_i}$을 구성합니다. 각 조인트에 대해 4개의 스칼라 매개변수($\alpha_i, a_i, d_i, \phi_i$)만을 사용합니다. 조인트 트위스트는 6개의 독립적인 매개변수를 가지므로, 이는 D-H 프레임을 영리하게 선택하여 특정 상쇄가 발생하도록 했기 때문입니다.

---

### Manipulator Workspace

작업 공간(Workspace)은 주어진 조인트 각도 선택으로 도달할 수 있는 모든 말단 장치 구성의 집합입니다. $\mathbf{W} = {g_{\text{st}}(\boldsymbol{\theta}) : \boldsymbol{\theta} \in Q} \subset \text{SE}(3)$입니다.

도달 가능 작업 공간은 조인트 각도 선택으로 도달할 수 있는 모든 위치($\mathbb{R}^3$)의 집합입니다.

$$
\mathbf{W}_{\text{R}} = \{\mathbf{p}(\theta) : \theta \in Q\} \subset \mathbb{R}^3
$$

말단 장치를 어떤 방향으로든 도달할 수 있는 공간의 부피를 나타냅니다. 기교 작업 공간은 매니퓰레이터가 임의의 방향($\mathbf{R} \in \text{SO}(3)$)으로 도달할 수 있는 위치($\mathbb{R}^3$)의 부피입니다.

$$
\mathbf{W}_{\text{D}} = \{\mathbf{p} \in \mathbb{R}^3 : \forall \mathbf{R} \in \text{SO}(3), \\
\exists \theta \text{ with } g_{\text{st}}(\theta) = (\mathbf{p}, \mathbf{R})\} \subset \mathbb{R}^3
$$

구형 손목(spherical wrist)을 가진 매니퓰레이터의 경우 손목 축이 한 점에서 교차하고 툴 프레임이 이 교차점에 위치할 때 기교 작업 공간은 도달 가능 작업 공간과 같습니다.

---

### Inverse Kinematics

역운동학(Inverse Kinematics) 문제는 정운동학 문제의 역으로 툴 프레임의 원하는 구성 $g_{\text{d}} \in \text{SE}(3)$이 주어졌을 때 조인트 각도 $\theta \in Q$를 찾는 것입니다.

$$
g_{\text{st}}(\boldsymbol{\theta}) = g_{\text{d}}
$$

이 문제는 해가 여러 개, 유일하거나, 없을 수도 있습니다.

#### A Planar Example

평면 2링크 매니퓰레이터의 경우($l_1, l_2$) 원하는 말단 장치 위치 $(x, y)$가 주어졌을 때 $\theta_1$과 $\theta_2$를 푸는 것이 역운동학 문제입니다. 극좌표 $(r, \phi)$와 코사인 법칙(Law of Cosines)을 사용하여 $\theta_2$와 $\theta_1$을 순차적으로 계산합니다. 원하는 구성이 매니퓰레이터의 작업 공간(workspace) 밖에 있으면 해가 존재하지 않습니다.

#### Paden-Kahan Subproblems

제품 지수 공식(Product of Exponentials Formula)을 사용하여 역운동학 문제를 해결하기 위한 기하학적 알고리즘이 개발되었습니다. 이 방법은 전체 역운동학 문제를 해법이 알려진 표준 하위 문제로 환원시키는 것을 목표로 합니다.

단위 크기의 제로 피치 트위스트 $\xi$와 두 점 $\mathbf{p}, \mathbf{q} \in \mathbb{R}^3$이 주어졌을 때, 다음을 만족하는 $\theta$를 찾습니다.

$$
e^{\widehat{\boldsymbol{\xi}}\theta} \mathbf{p} = \mathbf{q}
$$

$\mathbf{p}$를 $\xi$의 축을 중심으로 회전시켜 $\mathbf{q}$와 일치시키는 문제입니다. $\xi$ 축에 수직인 평면에 투영된 벡터 $\mathbf{u}', \mathbf{v}'$를 사용하여 $atan2$ 함수로 $\theta$를 결정합니다.

#### General Solutions

일반적인 역운동학 문제를 해결하는 것은 활발한 연구 영역입니다. 특히 축의 교차점이 없는 경우에 유효한 방법이 연구됩니다.

접근 방식 중 하나는 대수 기하학의 제거 이론(elimination theory)을 기반으로 합니다. 이 방법은 연립 대수 방정식에서 $n-1$개의 변수를 순차적으로 제거하여 하나의 변수에 대한 단일 다항식을 얻는 체계적인 절차입니다.

삼각 함수를 포함하는 운동학 방정식을 $\cos \theta_i$와 $\sin \theta_i$에 대한 다항식으로 간주합니다. D-H 매개변수화와 $\mathbf{Ad}_{g}$를 사용하여 운동학 방정식을 재배열합니다. 그리고 $\theta_6$에 독립적인 두 열(column)을 분리합니다.

---

### The Manipulator Jacobian

정운동학 맵 $g_{\text{st}} : Q \to \text{SE}(3)$과 엔드 이펙터(end-effector, 말단 장치) 속도 사이의 관계를 나타내는 매니퓰레이터 자코비안(Manipulator Jacobian)을 유도하고 그 구조와 특성을 알아보겠습니다. 또한, 엔드 이펙터에 가해지는 렌치(wrenches, 힘과 토크)와 조인트 토크(joint torques) 사이의 이중적인 관계도 다룹니다.

전통적으로 $g: \mathbb{R}^n \to \mathbb{R}^p$와 같은 단순한 매핑으로 정운동학을 나타낼 때는 $\frac{\partial g}{\partial \boldsymbol{\theta}}(\boldsymbol{\theta})$가 자코비안으로 사용되지만, $\text{SE}(3)$와 같이 행렬 값 함수로 나타낼 경우 이는 부적절하며 국소적인 좌표계에 의존하는 문제가 발생합니다. 이를 피하기 위해 트위스트(twists)를 사용하여 자코비안을 정의합니다.

#### End-effector Velocity

매니퓰레이터의 조인트가 경로 $\theta(t)$를 따라 움직일 때, 엔드 이펙터는 $g_{\text{st}}(\theta(t))$ 경로를 따릅니다. 엔드 이펙터의 순간 공간 속도(spatial velocity)는 다음 트위스트로 주어집니다.

$$
\mathcal{V}_{\text{st}}^s = \dot{g}_{\text{st}}(\theta) g_{\text{st}}^{-1}(\theta)
$$

연쇄 법칙(chain rule)을 적용하면 엔드 이펙터 속도는 개별 조인트 속도 $\dot{\theta}_i$에 선형적으로 관련됨을 알 수 있습니다.

$$
\mathcal{V}_{\text{st}}^s = \sum_{i=1}^{n} \left( \frac{\partial g_{\text{st}}}{\partial \theta_i} g_{\text{st}}^{-1}(\theta) \right) \dot{\theta}_i
$$

트위스트 좌표로 표현하면 엔드 이펙터 속도는 공간 매니퓰레이터 자코비안과 조인트 속도의 선형 관계로 나타납니다.

$$
\mathcal{V}_{\text{st}}^s = J_{\text{st}}^s(\theta) \dot{\theta}
$$

정운동학 맵을 제품 지수 공식 $g_{\text{st}}(\theta) = e^{\widehat{\xi}_1 \theta_1} \cdots e^{\widehat{\xi}n \theta_n} g{\text{st}}(0)$으로 나타내면, 공간 매니퓰레이터 자코비안의 각 열 $\boldsymbol{\xi}_i'$은 다음과 같은 매우 명시적으로 유도됩니다.

$$
\left( \frac{\partial g_{\text{st}}}{\partial \theta_i} g_{\text{st}}^{-1} \right)^\vee = \text{Ad}_{e^{\widehat{\xi}_1 \theta_1} \cdots e^{\widehat{\xi}_{i-1} \theta_{i-1}}} (\xi_i)
$$

따라서 공간 매니퓰레이터 자코비안은 다음과 같습니다.

$$
J_{\text{st}}^s(\boldsymbol{\theta}) = \begin{bmatrix} \boldsymbol{\xi}_1 & \boldsymbol{\xi}_2' & \cdots & \boldsymbol{\xi}_n' \end{bmatrix}
$$

이는 $i$번째 조인트 트위스트를 현재 매니퓰레이터 구성으로 변환한 것과 정확히 일치하며, $\theta_i, \theta_{i+1}, \ldots$에는 의존하지 않습니다. 이 속성 덕분에 $J_{\text{st}}^s(\theta)$를 기하학적 검토를 통해 계산할 수 있습니다.

엔드 이펙터의 바디 속도(body velocity) $\mathcal{V}_{\text{st}}^b$를 조인트 속도와 연결하는 바디 매니퓰레이터 자코비안 $J_{\text{st}}^b$도 정의할 수 있습니다.

$$
\mathcal{V}_{\text{st}}^b = J_{\text{st}}^b(\theta) \dot{\theta}
$$

공간 자코비안과 바디 자코비안은 어드조인트 변환(Adjoint transformation)으로 관련됩니다.

$$
J_{\text{st}}^s(\theta) = \text{Ad}_{g_{\text{st}}(\theta)} J_{\text{st}}^b(\theta)
$$

만약 $J_{\text{st}}$가 가역적(invertible)이면 원하는 엔드 이펙터 공간 속도 $\mathcal{V}_{\text{st}}^s(t)$를 달성하기 위해 필요한 조인트 속도를 다음과 같은 상미분 방정식으로 계산할 수 있습니다.

$$
\dot{\theta}(t) = (J_{\text{st}}^s(\theta))^{-1} \mathcal{V}_{\text{st}}^s(t)
$$

이를 통합하면 로봇을 역운동학 계산 없이 원하는 구성으로 이동시킬 수 있습니다.

#### End-effector Forces

자코비안은 엔드 이펙터에 가해지는 렌치 $\mathcal{F}$와 조인트 토크 $\tau$ 사이의 관계를 설명하는 데에도 사용됩니다. 이 관계는 일(work)의 보존을 통해 유도됩니다.

$$
\int \dot{\tau}^T \tau dt = \int \mathcal{V}_{\text{st}}^b \cdot \mathcal{F}^b dt
$$

바디 렌치 $\mathcal{F}^b$에 대한 조인트 토크 $\tau$는 $\tau = (J_{\text{st}}^b)^T \mathcal{F}^b$를 만족하고 공간 렌치 $\mathcal{F}^s$에 대한 조인트 토크 $\tau$는 $\tau = (J_{\text{st}}^s)^T \mathcal{F}^s$를 만족하는 관계를 얻습니다.

#### Singularities

특이 구성은 매니퓰레이터 자코비안 $J_{\text{st}}(\theta)$의 랭크(rank)가 떨어지는 구성입니다.

6자유도 매니퓰레이터의 경우, 자코비안이 비가역적(non-invertible)이 되어 특정 방향으로의 순간적인 움직임을 달성할 수 없습니다. 특이점 근처에서는 원하는 엔드 이펙터 속도를 유지하기 위해 극도로 큰 조인트 속도가 필요할 수 있습니다. 또는 일부 엔드 이펙터 렌치가 $J_{\text{st}}^T$의 널 공간에 놓이므로, 해당 렌치는 조인트 토크 없이 균형을 이룰 수 있습니다.

다만 대부분의 매니퓰레이터는 모든 자유도가 필요한 작업을 위해 설계되므로 특이 구성은 피해야 합니다.

---

### Redundant and Parallel Manipulators

#### Redundant Manipulators

운동학적으로 kinematically redundant 매니퓰레이터는 주어진 작업을 완료하는 데 필요한 최소 자유도보다 많은 자유도($n > p$)를 가진 로봇입니다.

장점으로는 일한 엔드 이펙터 구성을 제공하는 무한히 많은 조인트 구성을 가질 수 있습니다. 이 추가 자유도를 사용하여 장애물 회피, 특이점 회피 또는 특정 비용 함수 최적화와 같은 부가 작업을 수행할 수 있습니다.

자코비안 $J_{\text{st}}^s \in \mathbb{R}^{p \times n}$은 행보다 열이 더 많습니다.

$$
J_{\text{st}}^s(\theta) = \begin{bmatrix} \xi_1 & \xi_2' & \cdots & \xi_n' \end{bmatrix}
$$

여분 매니퓰레이터의 역운동학 문제는 해가 무한할 수 있으므로 잘 정의되지 않은 문제입니다. 엔드 이펙터 구성을 $g_{\text{d}}$로 고정했을 때 로봇이 여전히 움직일 수 있는 궤적을 자기 운동 다양체(self-motion manifold)라고 합니다. 이 운동은 다음을 만족합니다.

$$
g_{\text{st}}(\theta(t)) = g_{\text{d}} \implies J_{\text{st}}^s(\theta(t)) \dot{\theta} = \mathbf{0}
$$

따라서 허용되는 조인트 속도 $\dot{\theta}$는 매니퓰레이터 자코비안의 널 공간(null space)에 놓여야 합니다.

#### Redundancy Resolution

주어진 작업 공간 속도 $\mathcal{V}_{\text{st}}$를 생성하는 무한한 조인트 궤적 중에서 선택하기 위해 추가 기준이 사용됩니다. 일반적으로 최소 조인트 속도를 선택하는 방법이 사용되며, 이는 무어-펜로즈 일반화 역행렬(Moore-Penrose generalized inverse) $J^\dagger$를 사용하여 달성됩니다.

$$
\dot{\theta} = J_{\text{st}}^\dagger (\theta) \mathcal{V}_{\text{st}} \quad \text{where} \quad J^\dagger = J^T (J J^T)^{-1}
$$

정적 평형 상태에서는 조인트 토크와 엔드 이펙터 렌치 사이의 관계가 여전히 성립합니다.

$$
\tau = J_{\text{st}}^T \mathcal{F}
$$

#### Parallel Manipulators

병렬 매니퓰레이터 또는 폐쇄 사슬 매니퓰레이터는 두 개 이상의 직렬 사슬(series chains)이 엔드 이펙터를 베이스에 연결하는 구조입니다.

장점으로는 개방 사슬 매니퓰레이터보다 강성이 높습니다. 그리고 구동기(actuators)를 베이스 근처에 배치할 수 있어 말단 링크에 모터를 배치할 필요가 없습니다.

각 사슬에 의해 지정된 엔드 이펙터 위치를 같다고 놓음으로써 병렬 매니퓰레이터의 운동학이 설명됩니다.

$$
g_{\text{st}} = e^{\widehat{\xi}_{11} \theta_{11}} \cdots e^{\widehat{\xi}_{1n_1} \theta_{1n_1}} g_{\text{st}}(0) = e^{\widehat{\xi}_{21} \theta_{21}} \cdots e^{\widehat{\xi}_{2n_2} \theta_{2n_2}} g_{\text{st}}(0)
$$

조인트 변수 사이에 제약 조건을 도입합니다. 따라서 모든 조인트 변수를 독립적으로 지정할 수 없으며 조인트 공간 $\mathcal{Q}'$는 개별 조인트 공간의 카테시안 곱 $\mathcal{Q}$의 부분 집합입니다.

자유도 $F$는 그루블러 공식(Gruebler's formula)으로 얻을 수 있습니다.

$$
F = 6N - \sum_{i=1}^g (6 - f_i) = 6(N - g) + \sum_{i=1}^g f_i
$$

링크 수 $N$, 조인트 수 $g$, $i$번째 조인트의 자유도 $f_i$로 구성됩니다. 평면 운동의 경우 계수 6을 3으로 대체합니다.

#### Four-bar Linkage

4-bar 연결 장치는 지면(ground)과 3개의 강체 링크로 구성되며, 이들은 회전 조인트로 연결된 평면 메커니즘입니다. 평면 버전의 그루블러 공식에 따라

$$
F = 3(N - g) + \sum_{i=1}^g f_i = 3(3 - 4) + 4 = 1
$$

위와 같이 정의되며 입력 링크의 움직임이 출력 링크의 움직임을 결정하므로 자유도는 1입니다.

#### Stewart Platform

스튜어트 플랫폼은 두 개의 강체가 프리즘형 조인트(prismatic joints) 세트로 연결된 병렬 메커니즘입니다. 각 프리즘형 조인트는 구형 조인트(spherical joints)를 통해 연결됩니다. 프리즘형 조인트만 구동됩니다.

역운동학은 원하는 플랫폼 구성을 알면, 각 레그의 길이는 베이스 피벗과 툴 피벗 사이의 거리를 계산하여 쉽게 결정됩니다.

$$
\theta_i = \| \mathbf{q}_{\text{s}i} - g_{\text{st}} \mathbf{q}_{\text{t}i} \|
$$

---

### 참고 자료

[원본 경로 #1](https://www.cse.lehigh.edu/~trink/Courses/RoboticsII/reading/murray-li-sastry-94-complete.pdf)


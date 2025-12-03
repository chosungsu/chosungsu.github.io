---
title: 'Motion planning'
date: '2024-11-27'
tags: ['Robotics', 'Manipulation', 'lecture']
---

### Motion Planning

#### Inverse Kinematics, IK

역운동학은 동작 궤적을 계획하는 데 필요한 핵심 기술입니다. forward kinematics가 관절 각도 $q$에서 그리퍼의 포즈 $X$로의 매핑 $X^G= f_{kin}(q)$을 제공한다면, IK는 그 역을 찾는 문제입니다.

IK를 단순히 $q = f^{-1}_{kin}(X^G)$를 푸는 문제보다는, 풍부한 비용 및 제약 조건 라이브러리 하에서 관절 각도를 찾는 일반적인 문제로 간주합니다.

#### IK as Constrained Optimization

<img src="https://velog.velcdn.com/images/devjo/post/82369874-9f35-40a1-8a1f-2a441c45d934/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

역운동학을 공식화하는 것보다 $\underset{q}{min} |q-q_0|^2$ 목적식을 최적화로 풀이합니다. 동일한 엔드 이펙터 위치를 달성하는 여러 관절 각도가 있는 경우, 명목 관절 위치에 가장 가까운 각도를 선호합니다.

로봇 바로 앞에 장애물을 추가하여 비선형 IK 문제와 차등 IK 문제의 차이점을 강조하고자 했습니다. 차등 IK와 IK 공식 모두 충돌 회피 제약 조건을 적용할 수 있기 때문에 두 솔루션 모두 팔이 기둥에 충돌하는 것을 방지하려고 합니다.

또 다른 예시로는 IK를 사용하여 원통을 잡아보는 것으로 원통을 난간이라고 생각해도 좋습니다. 원통을 어느 방향으로 잡든 상관없다고 가정해 보겠습니다. 그러면 이러한 제약 조건의 최소값만을 사용하여 IK 문제를 작성해야 합니다.

---

### Global Inverse Kinematics

전역 역운동학은 복잡한 비용과 제약 조건이 있는 일반화된 IK 문제를 국소 최소값(local minima)에 빠지지 않고 전역 최적성(global optimality)을 보장하며 해결하기 위한 접근 방식입니다.

IK는 더 광범위한 문제를 해결하지만, 성공이 보장되지는 않습니다. 또한 작은 변경도 보장되지 않습니다. 이에 반해 차분 역운동학은 관절 공간에서 부드러운 궤적 추적에 뛰어납니다.

---

### Kinematic Trajectory Optimization

역기구학의 최적화 관점을 이해하면 기구학적 궤적 최적화를 이해하는 데 큰 도움이 될 것입니다. 여러 역기구학 문제를 개별적으로 푸는 대신, 이제 기본 아이디어는 단일 최적화에서 일련의 관절 각도를 동시에 푸는 것입니다.

$$
\begin{aligned}
&\underset{\alpha, T}{min} T, \\
&X^{G_{start}}=f_{kin}(q_{\alpha}(0)), \\
&X^{G_{goal}}=f_{kin}(q_{\alpha}(T))
\end{aligned}
$$

다항식을 사용하여 궤적을 매개변수화하는 방법은 여러 가지가 있습니다. 예를 들어 동적 운동 계획 에서 직접 결합 방법은 상태 궤적을 표현하기 위해 조각별 3차 다항식을 사용하고 , 의사 스펙트럼 방법은 라그랑주 다항식을 사용합니다. 각 경우, 알고리즘이 기저의 특정 속성을 활용할 수 있도록 기저 함수를 선택합니다. 동적 운동 계획에서는 동적 제약 조건에 대한 실현 가능한 해를 얻기 위해 동적 방정식의 적분 정확도에 많은 중점을 둡니다.

#### B-spline Trajectory

B-스플라인의 미분은 여전히 B-스플라인이며, 계수는 원래 계수에 대해 선형입니다. 기저 자체는 음수가 아니고 희소합니다. 이는 제어점 이라고 하는 B-스플라인 다항식의 계수에 강력한 기하학적 해석을 부여합니다. 특히, 전체 궤적은 활성 제어점(기저가 0이 아닌 제어점)의 볼록 껍질 내부에 있는 것이 보장됩니다.

---

### Sampling-based Motion Planning

샘플링 기반 계획법은 궤적 최적화의 국소 최소값 문제를 해결하기 위해 고안되었습니다.

RRT (Rapidly-exploring Random Trees)는 무작위로 탐색하는 트리를 빠르게 확장하여 시작점에서 목표 영역으로 연결하는 경로를 찾습니다. PRM (Probabilistic Roadmap)은 구성 공간(C-space)에 무작위로 샘플을 생성하여 그래프의 정점(vertices)으로 사용하고, 이웃한 정점들을 충돌 없는 직선(line segment)으로 연결하여 로드맵(roadmap)을 구축합니다. 쿼리 단계에서는 그래프를 검색하여 최단 경로를 찾습니다.

---

### Motion Planning with Graphs of Convex Sets

<img src="https://velog.velcdn.com/images/devjo/post/a0b19c0d-ff2a-4059-8d20-566f50f47435/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

GCS는 궤적 최적화의 풍부한 제약 조건 능력과 샘플링 기반 계획의 전역적 추론 능력을 결합하기 위한 새로운 접근 방식입니다. PRM에서 단순히 구성 공간의 점을 추가하는 대신, 각 샘플을 구성 공간의 볼록 영역(Convex Set)으로 확장합니다. 그래프의 각 정점에는 볼록 집합이 연결되어 있으며, 각 정점을 방문할 때 이 볼록 집합에서 하나의 요소를 선택할 수 있습니다.

GCS를 동작 계획 문제로 변환하는 방법은 충돌 없는 공간에 대한 볼록 분해(convex decomposition)가 주어졌다고 가정합니다. 정점은 C-공간의 볼록 영역 자체가 아니라 start와 last라는 두 점을 해당 영역 내에서 선택할 수 있는 $2n$ 변수의 집합입니다.

#### Time-Optimal Path Parameterizations, TOPP

동작 계획이 수립되면, 다음 질문은 속도, 가속도, 토크 한계 제약을 만족시키면서 해당 계획을 가장 빠르게 실행할 수 있는 방법입니다.

궤적 $q(t)$는 다음과 같이 정의됩니다.

$$
q(t) = r(s(t))
$$

여기서 $r(s)$는 경로를 따라 변하는 스칼라 경로 매개변수이고 $s(t)$는 시간의 매개변수입니다. 이를 사용하여 속도 $\dot{q}$와 가속도 $\ddot{q}$를 아래와 같이 표현할 수 있습니다.

$$
\begin{aligned}
&\dot{q}=r'(s)\dot{s}, \\
&\ddot{q}=r''(s)\dot{s}^2+r'(s)\ddot{s}
\end{aligned}
$$

---

### 참고 자료

[원본 경로 #1](https://manipulation.csail.mit.edu/trajectories.html#section3)


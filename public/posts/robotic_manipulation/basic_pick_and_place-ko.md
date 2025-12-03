---
title: 'Basic pick and place'
date: '2024-11-13'
tags: ['Robotics', 'Manipulation', 'lecture']
---

### Basic Pick and Place

<img src="https://velog.velcdn.com/images/devjo/post/da853d27-3c45-4992-b5c1-2062df0c568a/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

이 챕터의 목표는 로봇에게 벽돌(brick)을 집어 원하는 위치/방향에 놓도록 명령하는 기본적인 픽 앤 플레이스 알고리즘을 구축하는 데 필요한 기하학(Geometry) 및 운동학(Kinematics)의 기본 도구를 확립하는 것입니다. 지각(perception) 문제를 미루고, 벽돌의 현재 위치/방향에 대한 완벽한 측정값이 있다고 가정하고 시작합니다.

#### 모노그램 표기법

정확한 운동학 및 기하학적 작업을 위해서는 신중한 표기법이 필수적입니다.

점의 위치는 상대적인 양입니다. 항상 두 점 사이의 상대적인 위치를 나타냅니다. $\mathbf{p}$를 사용하여 위치 벡터를 나타냅니다. $\mathbf{P}^{\text{A}}=^\text{F}\mathbf{P}^{\text{A}}_{\text{F}}$는 점 $\text{P}$의 위치를 점 $\text{A}$에서 측정한 것을 의미합니다.

월드 프레임은 $\mathbf{W}$로 표기하고 $+X$는 앞, $+Y$는 왼쪽, $+Z$는 위로 생각하면 됩니다. 각 물체에는 고유한 프레임 $\mathbf{B}$가 연결되어 있습니다.

$\mathbf{R}$을 사용하여 회전을 나타냅니다. $^{\text{B}}\mathbf{R}^{\text{A}}$는 $\text{A}$ 프레임에서 측정한 $\text{B}$ 프레임의 방향(orientation)을 나타냅니다.

공간 포즈(Spatial Pose) 또는 단순히 포즈(Pose)는 위치와 방향을 결합한 것입니다. 공간 변환(Spatial Transform) 또는 변환(Transform)은 포즈의 "동사 형태"입니다. $\mathbf{X}$를 사용하여 변환/포즈를 나타냅니다. $^\text{B}\mathbf{X}^{\text{A}}$는 $\text{A}$ 프레임에서 측정한 $\text{B}$ 프레임의 포즈입니다.

---

### 공간 대수

$^\text{A}\mathbf{P}^{\text{B}}_{\text{F}} + ^\text{B}\mathbf{P}^{\text{C}}_{\text{F}} = ^\text{A}\mathbf{P}^{\text{C}}_{\text{F}}$와 같이 기준점과 목표점이 일치할 때 덧셈이 가능합니다.

회전과 곱하여 기준 프레임을 $^\text{A}\mathbf{P}^{\text{B}}_{\text{G}} + ^\text{G}\mathbf{R}^{\text{F}} = ^\text{A}\mathbf{P}^{\text{B}}_{\text{F}}$로 변경합니다.

회전도 기준점과 목표점이 일치할 때 $^\text{A}\mathbf{R}^{\text{B}} \times ^\text{B}\mathbf{R}^{\text{C}} = ^\text{A}\mathbf{R}^{\text{C}}$로 곱할 수 있습니다.

---

### Forward Kinematics

로봇과의 인터페이스는 관절 위치를 보고하고 명령을 받습니다. 전방 운동학(Forward Kinematics)은 로봇의 관절 위치(joint positions) $\mathbf{q}$를 카르테시안 프레임(그리퍼의 포즈 $\mathbf{X}^{\text{G}}$)으로 변환하는 함수입니다.

$$
\mathbf{X}^{\text{G}} = f_{\text{kin}}^{\text{G}}(\mathbf{q})
$$

#### Kinematic Tree

모든 물체(월드 제외)는 부모를 가지며 Joint 또는 floating base를 통해 연결됩니다. 그리퍼의 포즈를 계산하려면 그리퍼 프레임에서 시작하여 트리를 따라 월드 프레임에 도달할 때까지 변환들을 재귀적으로 합성합니다.

$$
^{\text{P}}\mathbf{X}^{\text{C}}(\mathbf{q}) = ^{\text{P}}\mathbf{X}^{\text{J}_P} \times ^{\text{J}_P}\mathbf{X}^{\text{J}_C} (\mathbf{q})\times ^{\text{J}_C}\mathbf{X}^{\text{C}}
$$

#### 미분 운동학

전방 운동학은 그리퍼와 물체의 포즈를 월드 프레임에서 계산하는 능력을 제공하지만, 그리퍼를 물체로 이동시키기 위해서는 관절 각도의 변화가 그리퍼 포즈의 변화와 어떻게 관련되는지 이해해야 합니다. 이를 미분 운동학(Differential Kinematics)이라고 합니다.

포즈의 변화율(시간 미분)이 관절 위치의 변화율(시간 미분)과 전방 운동학의 편미분(partial derivative)을 통해 관련되는 현상으로 

$$
dX^{\text{B}}=\frac{\partial f^{\text{B}}_{\text{kin}}(\text{q})}{\partial q}dq = J^{\text{B}}(q)dq
$$

편미분 행렬을 자코비언이라고 부릅니다.

3D 회전에는 여러 표현이 있지만, 미분 회전에 대해서는 특이점(singularities)이나 일반성 상실에 대한 우려 없이 공간 속도(Spatial Velocity)라는 정식(canonical) 표현을 사용할 수 있습니다.

$$
^{\text{A}}V^{\text{B}}_{\text{C}} = \begin{bmatrix} ^{\text{A}}w^{\text{B}}_{\text{C}} \\ ^{\text{A}}v^{\text{B}}_{\text{C}}\end{bmatrix}
$$

이는 $\text{C}$ 프레임에서 표현된, $\text{A}$ 프레임에 대한 $\text{B}$ 프레임의 각속도(Angular Velocity)와 $\text{C}$ 프레임에서 표현된, $\text{A}$ 프레임에 대한 $\text{B}$ 프레임의 병진 속도(Translational Velocity)입니다.

---

### 차동 역운동학

전방 운동학의 역방향 문제입니다. 원하는 그리퍼 공간 속도를 달성하기 위해 필요한 관절 속도 $\mathbf{v}$를 찾는 것입니다.

$$
V^{\text{G}}=J^{\text{G}}(q)v
$$

#### 제약 조건이 있는 미분 역운동학

유사 역행렬(pseudo-inverse) 컨트롤러는 특이점(singularities) 근처에서 자코비안이 폭발적으로 커지거나(singular value가 작아짐) 실제 로봇의 관절 제약 조건(joint constraints)을 무시한다는 중요한 한계가 있습니다. 실제 로봇은 관절 각도, 속도, 가속도, 토크에 제약이 있으며, 이를 무시하고 속도 명령을 내리면 로봇이 경로에서 크게 벗어날 수 있습니다.

가장 간단한 제약 조건은 관절 속도 제약입니다.

$$
\underset{v}{min}|J^{\text{G}}(q)v-V^{\text{G}_d}|^2_2
$$

원하는 그리퍼 공간 속도를 가능한 한 가깝게 달성하되, 관절 속도 제약 조건을 만족하는 관절 속도 $\mathbf{v}$를 찾는 것이 목표입니다.

---

### 참고 자료

[원본 경로 #1](https://manipulation.csail.mit.edu/pick.html)


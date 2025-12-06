---
title: 'Introduction of Robotic Manipulation'
date: '2024-11-13'
tags: ['Robotics', 'Manipulation', 'lecture']
---

### Introduction

오늘날 로봇 팔이 조립 라인에서 자동차 차체를 용접하고 도색하는 데, 인쇄 회로 기판에 IC 부품을 채우는 데, 핵, 해저, 지하 환경에서 구조물을 검사하고 수리하는 데, 심지어 농업에서 오렌지를 따고 포도를 수확하는 데 사용되는 것을 흔히 볼 수 있습니다.

이러한 로봇 팔 중 인체와 유사한 형태(anthropomorphic)를 띠는 것은 거의 없지만, 휴머노이드 기계에 대한 매혹은 줄지 않았습니다. 가까운 미래에 이러한 유형의 로봇을 볼 가능성은 낮지만, 단순한 로봇을 다양한 환경에 성공적으로 도입했다는 것은 분명합니다.

#### 초기 개발

현대 로봇 공학의 초기 작업은 제2차 세계 대전 이후 방사성 물질을 다루기 위해 아르곤 국립 연구소 및 오크 리지 국립 연구소에서 개발된 제어 기계식 조작기(manipulator)에서 시작되었습니다.

#### 다지형 손과 정교한 조작

현재 작동 중인 대다수의 로봇은 단순한 엔드-이펙터(End-effector)를 사용하여 작업물과 상호작용합니다. 엔드-이펙터는 로봇 팔과 환경 사이의 인터페이스를 설명하는 용어입니다. 대부분의 손은 단순한 그리퍼(gripper), 집게(pincer), 집게(tongs) 등이며 특정 작업을 위해 설계됩니다.

6자유도 로봇의 단점으로 단순한 그리퍼는 부품을 단단히 잡을 수 있지만, 잡은 물체를 조작(manipulate)할 수 없는 민첩성 부족과 다른 작업을 위해 엔드-이펙터를 자주 교체해야 하는 제한성, 비효율적인 움직임 등이 있습니다.

다지형 손은 로봇에 민첩성과 다용도성을 부여하는 해결책을 제공합니다.

---

### Rigid Body Motion

강체 운동은 물체의 점들 사이의 거리를 보존하는 움직임입니다. 로봇 운동학, 동역학, 제어 연구의 핵심은 강체의 움직임에 대한 연구입니다.

#### 스크류 이론의 역사와 기초

샤슬은 강체가 한 위치에서 다른 위치로 이동하는 것은 어떤 직선을 중심으로 회전한 다음 그 직선과 평행하게 병진(translation)하는 움직임으로 구성될 수 있음을 증명했습니다. 이 움직임을 스크류 운동이라고 합니다.

스크류 운동의 미소 버전은 트위스트라고 불리며 강체의 순간 속도를 선형 및 각도 요소 측면에서 설명합니다.

푸앵소는 강체에 작용하는 모든 힘 시스템은 하나의 선을 따라 적용되는 단일 힘과 동일한 선을 중심으로 하는 토크(torque)로 대체될 수 있음을 발견했습니다. 이러한 힘을 렌치라고 합니다.

#### Transformations

강체란 입자들의 모임으로, 두 입자 사이의 거리가 신체의 움직임이나 가해지는 힘에 관계없이 항상 고정되어 있는 완전히 "변형 불가능한" 물체입니다.

$$
\| \mathbf{p}(t) - \mathbf{q}(t) \| = \| \mathbf{p}(0) - \mathbf{q}(0) \| = \text{상수}
$$

강체 운동을 통해 한 위치에서 다른 위치로의 순 이동을 의미하며, 일반적으로 병진과 회전을 모두 포함합니다. 점은 $\mathbf{p} \in \mathbb{R}^3$로 표현되며 벡터는 $\mathbf{v} = \mathbf{q} - \mathbf{p}$로 표현됩니다. 매핑 $\mathbf{g}: \mathbb{R}^3 \to \mathbb{R}^3$이 다음 속성을 만족하면 강체 변환(Rigid body transformation)입니다. 길이와 외적, 내적을 보존합니다.

#### Rotational Motion in $\mathbb{R}^3$

물체의 방향(orientation)은 몸체에 부착된 좌표계 $\text{B}$와 고정된 관성 좌표계 $\text{A}$ 사이의 상대적인 방향으로 설명됩니다. $\text{B}$의 주축 $\mathbf{x}_{\text{ab}}, \mathbf{y}_{\text{ab}}, \mathbf{z}_{\text{ab}} \in \mathbb{R}^3$의 좌표를 $\text{A}$에 대해 나란히 쌓아 회전 행렬 $\mathbf{R}_{\text{ab}}$를 정의합니다.

$$
\mathbf{R}_{\text{ab}} = \begin{bmatrix} \mathbf{x}_{\text{ab}} & \mathbf{y}_{\text{ab}} & \mathbf{z}_{\text{ab}} \end{bmatrix}
$$

회전 행렬은 $\mathbf{R}\mathbf{R}^T = \mathbf{R}^T\mathbf{R} = \mathbf{I}$로 상호 정규 직교하며 행렬식은 $\det \mathbf{R} = +1$로 우측 좌표계를 보존합니다. 이 두 속성을 만족하는 모든 $3 \times 3$ 행렬의 집합을 $\text{SO}(3)$ (Special Orthogonal group)이라고 합니다.

#### Exponential Coordinates for Rotation

로봇 공학에서 흔히 접하는 움직임은 주어진 축을 중심으로 회전하는 것입니다. 회전 행렬 $\mathbf{R}(\omega, \theta)$를 단위 벡터 $\omega \in \mathbb{R}^3$ (회전 방향)과 각도 $\theta \in \mathbb{R}$의 함수로 나타내고자 합니다.

$$
\dot{\mathbf{q}}(t) = \boldsymbol{\omega} \times \mathbf{q}(t) = \widehat{\boldsymbol{\omega}} \mathbf{q}(t)
$$

$\omega$를 기준으로 단위 속도로 회전할 때, 점 $\mathbf{q}$의 속도는 위와 같습니다. $\widehat{\omega}$는 반대칭 행렬입니다.

$$
\widehat{\omega} = \begin{bmatrix} 0 & -\omega_3 & \omega_2 \\ \omega_3 & 0 & -\omega_1 \\ -\omega_2 & \omega_1 & 0 \end{bmatrix}
$$

이 미분 방정식을 적분하면 $\mathbf{q}(t) = e^{\widehat{\omega} t} \mathbf{q}(0)$를 얻습니다. 즉 $\theta$만큼 회전할 때의 순 회전은 $\mathbf{R}(\omega, \theta) = e^{\widehat{\omega}\theta}$와 같습니다.

#### Rodrigues' Formula

행렬 지수 $e^{\widehat{\omega}\theta}$의 폐쇄형 표현을 얻기 위해, $\widehat{\boldsymbol{\omega}}$의 거듭제곱 공식을 사용하여 무한 급수를 단순화합니다.

$$
e^{\widehat{\omega}\theta} = \mathbf{I} + \widehat{\omega} \sin \theta + \widehat{\omega}^2 (1 - \cos \theta)
$$

#### Euler's Theorem

모든 $\mathbf{R} \in \text{SO}(3)$에 대해, $\mathbf{R} = \exp(\widehat{\omega}\theta)$를 만족하는 $\omega \in \mathbb{R}^3$ ($||\omega||=1$)와 $\theta \in \mathbb{R}$가 존재합니다. $\omega\theta \in \mathbb{R}^3$의 성분은 $\mathbf{R}$에 대한 지수 좌표라고 불립니다.

#### Angle-Based Representations

두 좌표계 $\text{A}$와 $\text{B}$ 사이의 방향을 설명하는 한 가지 방법은 일련의 연속적인 회전을 사용하는 것입니다.

ZYZ 오일러 각은 프레임 $\text{B}$를 $\text{B}$의 $z$축을 중심으로 각도 $\alpha$만큼 회전합니다. 새로운 $\text{B}$ 프레임의 $y$축을 중심으로 각도 $\beta$만큼 회전합니다. 다시 새로운 $\text{B}$ 프레임의 $z$축을 중심으로 각도 $\gamma$만큼 회전합니다.

$$
\mathbf{R}_x(\phi) := e^{\widehat{\mathbf{x}}\phi} \\ \mathbf{R}_y(\beta) := e^{\widehat{\mathbf{y}}\beta} \\
\mathbf{R}_z(\alpha) := e^{\widehat{\mathbf{z}}\alpha}
$$

오일러 각 $(\alpha, \beta, \gamma)$을 전사적 매핑으로 구할 수 있습니다.

#### Rigid Motion in $\mathbb{R}^3$

Special Euclidean Group에서 강체 운동은 회전과 병진을 모두 포함합니다. 몸체에 부착된 좌표계 $\text{B}$의 위치 $\mathbf{p}_{\text{ab}} \in \mathbb{R}^3$와 방향 $\mathbf{R}_{\text{ab}} \in \text{SO}(3)$를 관성 프레임 $\text{A}$에 대해 추적하여 강체 운동을 설명합니다.

벡터 $\mathbf{v}$에 대한 강체 변환 $\mathbf{g} = (\mathbf{p}, \mathbf{R})$의 작용은 회전에 의해서만 정의됩니다.

$$
\mathbf{g}_*(\mathbf{v}) := \mathbf{R}\mathbf{v}
$$

강체 변환을 $\mathbb{R}^4$의 행렬과 벡터를 사용하여 선형 형태로 간단하게 표현할 수 있습니다. 점 $\mathbf{q} \in \mathbb{R}^3$에 1을 추가하여 동차 좌표 $\bar{\mathbf{q}}$를 만들고 벡터 $\mathbf{v} \in \mathbb{R}^3$는 0을 추가하여 $\bar{\mathbf{v}}$를 만듭니다.

$$
\bar{\mathbf{q}} = \begin{pmatrix} \mathbf{q} \\ 1 \end{pmatrix}, \quad \bar{\mathbf{v}} = \begin{pmatrix} \mathbf{v} \\ 0 \end{pmatrix}
$$

$\mathbf{g} = (\mathbf{p}, \mathbf{R}) \in \text{SE}(3)$의 동차 표현 $\bar{\mathbf{g}}$는 $4 \times 4$ 행렬로 주어집니다.

$$
\bar{\mathbf{g}} = \begin{pmatrix} \mathbf{R} & \mathbf{p} \\ \mathbf{0} & 1 \end{pmatrix}
$$

점 변환은 $\bar{\mathbf{q}}_{\text{a}} = \bar{\mathbf{g}}_{\text{ab}}\bar{\mathbf{q}}_{\text{b}}$ 행렬 곱셈으로 표현됩니다.

트위스트 행렬 $\widehat{\xi}$은 $\text{SO}(3)$의 반대칭 행렬 $\widehat{\omega}$의 일반화입니다.

$$
\widehat{\xi} = \begin{pmatrix} \widehat{\omega} & \mathbf{v} \\ \mathbf{0} & 0 \end{pmatrix}
$$

트위스트 행렬을 매개변수화하는 6차원 벡터는 $\mathbf{\xi} = (\mathbf{v}, \omega)^T$입니다.

#### Screw Motion

스크류 운동은 공간의 하나의 축을 중심으로 $\theta$만큼 회전한 후, 같은 축을 따라 $d$만큼 병진하는 강체 운동입니다. 이는 나사(screw)가 회전과 병진을 같은 축을 따라 수행하는 것과 유사합니다.

피치는 회전에 대한 병진의 비율로 $h := d/\theta$와 같이 정의됩니다. 축 위의 한 점 $\mathbf{q} \in \mathbb{R}^3$와 방향을 지정하는 단위 벡터 $\omega \in \mathbb{R}^3$를 통해 정의되는 유향선입니다.

$$
l = \{ \mathbf{q} + \lambda \boldsymbol{\omega} : \lambda \in \mathbb{R} \}
$$

스크류 $\mathcal{S}$는 축 $l$, 피치 $h$, 크기 $M$으로 구성됩니다. 축 $l$을 중심으로 $M$만큼 회전 ($\theta = M$)한 후, 축 $l$과 평행하게 $h\theta$만큼 병진하는 운동을 나타냅니다.

$$
\mathbf{g} = \begin{pmatrix} e^{\widehat{\boldsymbol{\omega}}\theta} & (\mathbf{I} - e^{\widehat{\boldsymbol{\omega}}\theta})\mathbf{q} + h\theta\boldsymbol{\omega} \\ \mathbf{0} & 1 \end{pmatrix}
$$

스크류 운동에 해당하는 강체 변환 $\mathbf{g}$는 위와 같습니다.

---

### Velocity of a Rigid Body

순수 회전 운동 $\mathbf{R}_{\text{ab}}(t) \in \text{SO}(3)$를 고려합니다. 고정된 공간 좌표계 $\text{A}$에서 본 순간 각속도는 $\widehat{\omega}_{\text{ab}}^{\text{s}} := \dot{\mathbf{R}}_{\text{ab}}\mathbf{R}_{\text{ab}}^{-1}$와 같이 정의되고 몸체 좌표계 $\text{B}$에서 본 각속도는 $\widehat{\omega}_{\text{ab}}^{\text{b}} := \mathbf{R}_{\text{ab}}^{-1}\dot{\mathbf{R}}_{\text{ab}}$입니다. 몸체 각속도는 공간 각속도 벡터를 몸체 프레임으로 회전하여 얻을 수 있습니다.

일반적인 강체 운동 $\mathbf{g}_{\text{ab}}(t) \in \text{SE}(3)$에 대해 $\dot{\mathbf{g}}_{\text{ab}}\mathbf{g}_{\text{ab}}^{-1}$ 및 $\mathbf{g}_{\text{ab}}^{-1}\dot{\mathbf{g}}_{\text{ab}}$ 항은 특정한 의미를 갖습니다.

공간 속도 트위스트 $\widehat{\mathbf{V}}_{\text{ab}}^{\text{s}}$는 

$$
\widehat{\mathbf{V}}_{\text{ab}}^{\text{s}} = \dot{\mathbf{g}}_{\text{ab}}\mathbf{g}_{\text{ab}}^{-1} \\ \mathbf{V}_{\text{ab}}^{\text{s}} = \begin{pmatrix} \mathbf{v}_{\text{ab}}^{\text{s}} \\ \boldsymbol{\omega}_{\text{ab}}^{\text{s}} \end{pmatrix}
$$

위와 같이 정의됩니다. 공간 프레임에서 본 순간 각속도 $\boldsymbol{\omega}_{\text{ab}}^{\text{s}}$와 공간 프레임의 원점을 통과하는 강체 위의 점의 순간 선형 속도 $\mathbf{v}_{\text{ab}}^{\text{s}}$로 표현됩니다.

몸체 속도 트위스트 $\widehat{\mathbf{V}}_{\text{ab}}^{\text{b}}$는

$$
\widehat{\mathbf{V}}_{\text{ab}}^{\text{b}} = \mathbf{g}_{\text{ab}}^{-1}\dot{\mathbf{g}}_{\text{ab}} \\
\mathbf{V}_{\text{ab}}^{\text{b}} = \begin{pmatrix} \mathbf{v}_{\text{ab}}^{\text{b}} \\ \boldsymbol{\omega}_{\text{ab}}^{\text{b}} \end{pmatrix}
$$

와 같이 정의됩니다. 공간 속도와 몸체 속도는 수반 변환(Adjoint Transformation) $\text{Ad}_{\mathbf{g}}$에 의해 관련됩니다.

$$
\widehat{\mathbf{V}}_{\text{ab}}^{\text{s}} = \mathbf{g}_{\text{ab}}\widehat{\mathbf{V}}_{\text{ab}}^{\text{b}}\mathbf{g}_{\text{ab}}^{-1}
$$

트위스트 좌표로 변환하면 다음과 같습니다.

$$
\mathbf{V}_{\text{ab}}^{\text{s}} = \begin{pmatrix} \mathbf{v}_{\text{ab}}^{\text{s}} \\ \boldsymbol{\omega}_{\text{ab}}^{\text{s}} \end{pmatrix} = \mathbf{Ad}_{\mathbf{g}_{\text{ab}}} \mathbf{V}_{\text{ab}}^{\text{b}}
$$

#### Velocity of a Screw Motion

스크류 작용 $\exp(\widehat{\xi}\theta)$에 의해 생성되는 강체 운동 $\mathbf{g}{\text{ab}}(\theta) = e^{\widehat{\xi}\theta} \mathbf{g}{\text{ab}}(0)$를 고려합니다. 여기서 $\widehat{\xi}$는 상수 트위스트입니다.

상수 트위스트에 대해 $\frac{d}{dt}(e^{\widehat{\xi}\theta}) = \widehat{\xi}\dot{\theta}e^{\widehat{\xi}\theta}$ 임을 이용하면, 이 강체 운동의 공간 속도 트위스트는 다음과 같이 계산됩니다.

$$
\begin{aligned}
&\widehat{\mathbf{V}}_{\text{ab}}^{\text{s}} = \dot{\mathbf{g}}_{\text{ab}}(\theta)\mathbf{g}_{\text{ab}}^{-1}(\theta) \\
&= \left(\widehat{\boldsymbol{\xi}}\dot{\theta}e^{\widehat{\boldsymbol{\xi}}\theta} \mathbf{g}_{\text{ab}}(0)\right) \left(\mathbf{g}_{\text{ab}}^{-1}(0)e^{-\widehat{\boldsymbol{\xi}}\theta}\right) \\
&= \widehat{\boldsymbol{\xi}}\dot{\theta}
\end{aligned}
$$

따라서 스크류 운동에 해당하는 공간 속도는 $\dot{\theta}$를 곱한 트위스트 자체입니다. 몸체 속도 트위스트는 다음과 같이 계산됩니다.

$$
\begin{aligned}
&\widehat{\mathbf{V}}_{\text{ab}}^{\text{b}} = \mathbf{g}_{\text{ab}}^{-1}(\theta)\dot{\mathbf{g}}_{\text{ab}}(\theta) \\
&= \left(\mathbf{g}_{\text{ab}}^{-1}(0)e^{-\widehat{\boldsymbol{\xi}}\theta}\right) \left(\widehat{\boldsymbol{\xi}}\dot{\theta}e^{\widehat{\boldsymbol{\xi}}\theta} \mathbf{g}_{\text{ab}}(0)\right) \\
&= \mathbf{g}_{\text{ab}}^{-1}(0)\widehat{\boldsymbol{\xi}}\mathbf{g}_{\text{ab}}(0)\dot{\theta}
\end{aligned}
$$

트위스트 좌표로 변환하면 $\mathbf{V}_{\text{ab}}^{\text{b}} = \left(\mathbf{Ad}_{\mathbf{g}_{\text{ab}}^{-1}(0)}\boldsymbol{\xi}\right)^{\wedge}\dot{\theta}$와 같습니다.

#### Coordinate Transformations

좌표계 $\text{A}, \text{B}, \text{C}$의 운동을 고려할 때, 공간 속도 사이에는 다음 관계가 성립합니다.

$$
\mathbf{V}_{\text{ac}}^{\text{s}} = \mathbf{V}_{\text{ab}}^{\text{s}} + \mathbf{Ad}_{\mathbf{g}_{\text{ab}}} \mathbf{V}_{\text{bc}}^{\text{s}}
$$

좌표계 $\text{A}, \text{B}, \text{C}$의 운동을 고려할 때, 상대 몸체 속도 사이에는 다음 관계가 성립합니다.

$$
\mathbf{V}_{\text{ac}}^{\text{b}} = \mathbf{Ad}_{\mathbf{g}_{\text{bc}}^{-1}} \mathbf{V}_{\text{ab}}^{\text{b}} + \mathbf{V}_{\text{bc}}^{\text{b}}
$$

---

### Wrenches and Reciprocal Screws

#### Wrenches

강체에 작용하는 일반화된 힘(generalized force)은 한 점에 작용하는 선형 성분 (순수 힘 $\mathbf{f}$)과 각 성분 (순수 모멘트 $\boldsymbol{\tau}$)으로 구성됩니다. 이 일반화된 힘을 $\mathbb{R}^6$의 벡터인 렌치 $\mathbf{F}$로 나타냅니다.

$$
\mathbf{F} = \begin{pmatrix} \mathbf{f} \\ \boldsymbol{\tau} \end{pmatrix}
$$

두 렌치가 모든 가능한 강체 운동에 대해 동일한 일을 생성하면 등가(equivalent)라고 합니다. $\mathbf{g}_{\text{bc}}=(\mathbf{p}_{\text{bc}}, \mathbf{R}_{\text{bc}})$가 $\text{C}$의 $\text{B}$에 대한 구성일 때, $\text{B}$의 원점에 적용된 렌치 $\mathbf{F}_{\text{b}}$는 $\text{C}$의 원점에 적용된 등가 렌치 $\mathbf{F}_{\text{c}}$로 변환됩니다.

$$
\begin{pmatrix} \mathbf{f}_{\text{c}} \\ \boldsymbol{\tau}_{\text{c}} \end{pmatrix} = \begin{pmatrix} \mathbf{R}_{\text{bc}}^T & \mathbf{0} \\ -\mathbf{R}_{\text{bc}}^T\widehat{\mathbf{p}}_{\text{bc}} & \mathbf{R}_{\text{bc}}^T \end{pmatrix} \begin{pmatrix} \mathbf{f}_{\text{b}} \\ \boldsymbol{\tau}_{\text{b}} \end{pmatrix}
$$

#### Screw Coordinates for a Wrench

트위스트와 마찬가지로, 렌치도 공간의 축을 따라 힘을 가하고 동시에 같은 축을 중심으로 토크를 가하여 생성할 수 있습니다. 축 $l$, 피치 $h$, 크기 $M$을 갖는 스크류 $\mathcal{S}$가 있을 때, $M$ 크기의 힘을 유향선 $l$을 따라 가하고, $hM$ 크기의 토크를 $l$ 축을 중심으로 가하여 렌치를 구성할 수 있습니다.

$$
\mathbf{F} = M \begin{pmatrix} \boldsymbol{\omega} \\ -\boldsymbol{\omega} \times \mathbf{q} + h\boldsymbol{\omega} \end{pmatrix} = M \begin{pmatrix} \mathbf{0} \\ \boldsymbol{\omega} \end{pmatrix}
$$

피치는 $h = \frac{\mathbf{f}^T \boldsymbol{\tau}}{\|\mathbf{f}\|^2}$로 각 토크에 대한 선형 힘의 비율입니다. 축은 $l = \left\{ \frac{\mathbf{f} \times \boldsymbol{\tau}}{\|\mathbf{f}\|^2} + \lambda \mathbf{f} : \lambda \in \mathbb{R} \right\}$로 $\mathbf{f} = \mathbf{0}$인 경우 $\boldsymbol{\tau}$ 방향이며 원점을 지나는 선입니다. 크기는 $M = \begin{cases} \|\mathbf{f}\|, & \text{if } \mathbf{f} \neq \mathbf{0} \\ \|\boldsymbol{\tau}\|, & \text{if } \mathbf{f} = \mathbf{0} \end{cases}$으로 정의됩니다.

#### Reciprocal Screws

트위스트와 렌치의 내적은 강체에 가해진 힘을 통해 운동하는 동안의 순간 일률(instantaneous power)을 나타냅니다. 렌치 $\mathbf{F}$가 트위스트 $\mathbf{V}$와 상반(reciprocal)이라는 것은 순간 일률이 0이라는 것을 의미합니다. 즉, $\mathbf{F} \cdot \mathbf{V} = 0$입니다.

고전적으로 상반 스크류는 스크류 간의 상반 곱(reciprocal product)을 사용하여 정의됩니다.

$$
\mathcal{S}_1 \odot \mathcal{S}_2 = M_1 M_2 \left[ (h_1 + h_2) \cos \alpha - d \sin \alpha \right]
$$

여기서 $M_1, M_2$는 스크류의 크기이며 $h_1, h_2$는 피치, $d$는 두 스크류의 축 $l_1$과 $l_2$ 사이의 최소 거리, 마지막으로 $\alpha$는 두 축의 방향 벡터 $\omega_1$과 $\omega_2$ 사이의 각도입니다.

트위스트 $\mathbf{V} = (\mathbf{v}, \omega)$와 렌치 $\mathbf{F} = (\mathbf{f}, \tau)$를 사용하여 내적 $\mathbf{V} \cdot \mathbf{F}$를 계산하면

$$
\mathbf{V}_1 \cdot \mathbf{F}_2 = \mathbf{V}_1^T \mathbf{F}_2 = M_1 M_2 \left[ (h_1 + h_2) \cos \alpha - d \sin \alpha \right]
$$

일은 정확히 상반 곱과 같아짐을 보일 수 있습니다. 상반 스크류는 스크류 집합을 렌치로 해석하고 $\mathbf{V}_f \odot \mathcal{S}_i = 0$인 또 다른 스크류 $\mathcal{S}_f$를 트위스트로 해석할 수 있습니다. 이 경우, $\mathcal{S}_f$를 따른 운동은 어떤 렌치에 대해서도 일을 수행하지 않습니다.

스크류 시스템의 차원(rank)을 $r$이라고 하고 상반 스크류 시스템의 차원(nullity)을 $n$이라고 하면, 다음 관계가 성립합니다.

$$
r + n = 6
$$

---

### 참고 자료

[원본 경로 #1](https://manipulation.csail.mit.edu/intro.html)

[원본 경로 #2](https://www.cse.lehigh.edu/~trink/Courses/RoboticsII/reading/murray-li-sastry-94-complete.pdf)


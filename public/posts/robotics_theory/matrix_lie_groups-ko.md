---
title: 'Matrix Lie Groups'
date: '2024-10-16'
tags: ['Robotics', 'lecture']
---

### Geometry

특수 직교군 (SO(3))은 유효한 회전 행렬의 집합입니다.

$$
SO(3) = \left\{ C \in \mathbb{R}^{3 \times 3} \mid C C^T = \mathbf{I}, \det C = 1 \right\}
$$

여기서 $C C^T = \mathbf{I}$로 9개의 매개변수에 6개의 제약 조건을 부과하여 자유도를 3으로 줄입니다. 그리고 행렬식 조건으로 고유 회전(proper rotation)을 보장합니다. $SO(3)$는 행렬의 집합이지만, 벡터 공간(vectorspace)은 아닙니다. 예를 들어, 덧셈에 대해 닫혀 있지 않으며($C_1 + C_2 \notin SO(3)$), 영행렬 $\mathbf{0}$은 유효한 회전 행렬이 아닙니다.

특수 유클리드군 (SE(3))은 유효한 변환 행렬의 집합입니다.

$$
SE(3) = \left\{ T = \begin{bmatrix} C & \mathbf{r} \\ \mathbf{0}^T & 1 \end{bmatrix} \in \mathbb{R}^{4 \times 4} \mid C \in SO(3), \mathbf{r} \in \mathbb{R}^3 \right\}
$$

$SO(3)$와 $SE(3)$는 행렬 리 군(matrix Lie groups)입니다. 리 군은 미분 가능 다양체(differential manifold)이면서 네 가지 군 공리(group axioms)를 만족하는 집합입니다.

#### Lie Algebras

모든 행렬 리 군에는 리 대수(Lie algebra)가 연결되어 있습니다. 리 대수는 벡터 공간 $V$와 리 괄호(Lie bracket) $[\cdot, \cdot]$라는 이항 연산으로 구성되며, 네 가지 속성(닫힘, 쌍선형성, 교대성, 야코비 항등식)을 만족합니다. 리 대수의 벡터 공간은 해당 리 군의 항등원에서 접 공간(tangent space at the identity element)이며, 군의 국소적 구조를 완전히 포착합니다.

$SO(3)$와 관련된 리 대수는 다음과 같습니다.

벡터 공간 $\mathfrak{so}(3) = \left\{ \mathbf{\Phi} = \boldsymbol{\phi}^\wedge \in \mathbb{R}^{3 \times 3} \mid \boldsymbol{\phi} \in \mathbb{R}^3 \right\}$ 에서 $\boldsymbol{\phi}^\wedge = \begin{bmatrix} 0 & -\phi_3 & \phi_2 \\ \phi_3 & 0 & -\phi_1 \\ -\phi_2 & \phi_1 & 0 \end{bmatrix}$를 만족하는데 선형이면서 반대칭 행렬입니다.

$SE(3)$와 관련된 리 대수는 다음과 같습니다.

벡터 공간 $\mathfrak{se}(3) = \left\{ \mathbf{\Xi} = \boldsymbol{\xi}^\wedge \in \mathbb{R}^{4 \times 4} \mid \boldsymbol{\xi} \in \mathbb{R}^6 \right\}$에서 $\boldsymbol{\xi}^\wedge = \begin{bmatrix} \boldsymbol{\phi}^\wedge & \boldsymbol{\rho} \\ \mathbf{0}^T & 0 \end{bmatrix}, \boldsymbol{\xi} = \begin{bmatrix} \boldsymbol{\rho} \\ \boldsymbol{\phi} \end{bmatrix}$를 만족합니다.

#### Exponential Map

Exponential map은 행렬 리 군과 그와 관련된 리 대수를 연결하는 핵심입니다.

$$
\exp(\mathbf{A}) = \mathbf{I} + \mathbf{A} + \frac{1}{2!} \mathbf{A}^2 + \frac{1}{3!} \mathbf{A}^3 + \cdots = \sum_{n=0}^\infty \frac{1}{n!} \mathbf{A}^n
$$

$SO(3)$의 원소는 지수 사상을 통해 $\mathfrak{so}(3)$의 원소와 관련될 수 있습니다.

$$
C = \exp(\boldsymbol{\phi}^\wedge) = \sum_{n=0}^\infty \frac{1}{n!} (\boldsymbol{\phi}^\wedge)^n
$$

지수 사상 $\exp: \mathfrak{so}(3) \to SO(3)$는 전사(surjective)이지만 단사(non-injective)입니다. 즉, $SO(3)$의 모든 원소를 $\mathfrak{so}(3)$의 여러 원소로부터 생성할 수 있습니다.

$C \in SO(3)$에서 $\boldsymbol{\phi} \in \mathbb{R}^3$를 찾는 것은 행렬의 대각합 $\operatorname{tr}(C)$을 사용하여 회전 각 $\phi$를 찾음으로써 이루어집니다.

$$
\phi = \cos^{-1} \left( \frac{\operatorname{tr}(C) - 1}{2} \right) + 2\pi m
$$

$SE(3)$의 원소는 $\mathfrak{se}(3)$의 원소와 지수 사상을 통해 관련될 수 있습니다.

$$
T = \exp(\boldsymbol{\xi}^\wedge) = \sum_{n=0}^\infty \frac{1}{n!} (\boldsymbol{\xi}^\wedge)^n
$$

$T \in SE(3)$에서 $\boldsymbol{\xi} = [\boldsymbol{\rho}^T, \boldsymbol{\phi}^T]^T \in \mathbb{R}^6$를 찾는 과정은 먼저 $C$에서 $\boldsymbol{\phi}$를 찾고, $\boldsymbol{\rho} = J^{-1} \mathbf{r}$을 계산하여 $\boldsymbol{\rho}$를 얻습니다.

#### Adjoints

4x4 변환 행렬 $T$의 구성 요소로부터 6x6 변환 행렬 $\mathbf{T}$를 직접 구성할 수 있습니다. 이를 $SE(3)$ 원소의 수반 표현 (adjoint)이라고 부릅니다.

$$
\mathbf{T} = \operatorname{Ad}(T) = \operatorname{Ad} \begin{bmatrix} C & \mathbf{r} \\ \mathbf{0}^T & 1 \end{bmatrix} = \begin{bmatrix} C & \mathbf{r}^\wedge C \\ \mathbf{0} & C \end{bmatrix}
$$

$\operatorname{Ad}(SE(3))$는 네 가지 군 공리(닫힘, 결합법칙, 항등원, 역원)를 모두 만족합니다. $\mathfrak{se}(3)$의 원소 $\mathbf{\Xi} = \boldsymbol{\xi}^\wedge$의 수반 표현도 정의할 수 있습니다.

$$
\operatorname{ad}(\mathbf{\Xi}) = \operatorname{ad}(\boldsymbol{\xi}^\wedge) = \boldsymbol{\xi}^\mathfrak{f}
$$

여기서 $\boldsymbol{\xi} = [\boldsymbol{\rho}^T, \boldsymbol{\phi}^T]^T$ 이고 $\boldsymbol{\xi}^\mathfrak{f} = \begin{bmatrix} \boldsymbol{\phi}^\wedge & \boldsymbol{\rho}^\wedge \\ \mathbf{0} & \boldsymbol{\phi}^\wedge \end{bmatrix} \in \mathbb{R}^{6 \times 6}$를 만족하므로 $\operatorname{Ad}(SE(3))$와 관련된 리 대수인 $\operatorname{ad}(\mathfrak{se}(3))$에 대해 벡터 공간은 $\{\mathbf{\Psi} = \operatorname{ad}(\mathbf{\Xi}) \in \mathbb{R}^{6 \times 6} \mid \mathbf{\Xi} \in \mathfrak{se}(3)\}$ 입니다. 이 역시 리 괄호의 네 가지 속성을 모두 만족합니다.

#### Baker-Campbell-Hausdorff, BCH

일반적인 행렬 지수 함수는 $\exp(\mathbf{A}) \exp(\mathbf{B}) = \exp(\mathbf{A} + \mathbf{B})$ 와 같이 간단하게 결합되지 않습니다. 두 행렬 지수 함수를 합성하려면 베이커-캠벨-하우스도르프 (BCH) 공식을 사용합니다.

$$
\begin{aligned}
&\ln (\exp(\mathbf{A}) \exp(\mathbf{B})) \\
&= \mathbf{A} + \mathbf{B} + \frac{1}{2} [\mathbf{A}, \mathbf{B}] + \frac{1}{12} [\mathbf{A}, [\mathbf{A}, \mathbf{B}]] - \frac{1}{12} [\mathbf{B}, [\mathbf{A}, \mathbf{B}]] + \cdots
\end{aligned}
$$

$SO(3)$의 경우, $\mathbf{C}_1 = \exp(\boldsymbol{\phi}_1^\wedge)$, $\mathbf{C}_2 = \exp(\boldsymbol{\phi}_2^\wedge)$ 일 때 다음과 같이 표현하고 

$$
\ln (\mathbf{C}_1 \mathbf{C}_2)^\vee = \boldsymbol{\phi}_1 + \boldsymbol{\phi}_2 + \frac{1}{2} \boldsymbol{\phi}_1^\wedge \boldsymbol{\phi}_2 + \frac{1}{12} \boldsymbol{\phi}_1^\wedge \boldsymbol{\phi}_1^\wedge \boldsymbol{\phi}_2 + \cdots
$$

$\boldsymbol{\phi}_1$ 또는 $\boldsymbol{\phi}_2$가 작다고 가정하면 근사 BCH 공식을 사용합니다.

$$
\ln (\mathbf{C}_1 \mathbf{C}_2)^\vee \approx \begin{cases} \mathbf{J}_\ell(\boldsymbol{\phi}_2)^{-1} \boldsymbol{\phi}_1 + \boldsymbol{\phi}_2 & \text{($\boldsymbol{\phi}_1$ is small)} \\ \boldsymbol{\phi}_1 + \mathbf{J}_r(\boldsymbol{\phi}_1)^{-1} \boldsymbol{\phi}_2 & \text{($\boldsymbol{\phi}_2$ is small)} \end{cases}
$$

여기서 $\mathbf{J}_r$과 $\mathbf{J}_\ell$은 각각 $SO(3)$의 우측 및 좌측 야코비 행렬(right and left Jacobians)입니다.

$SE(3)$의 경우, $\mathbf{T}_1 = \exp(\boldsymbol{\xi}_1^\wedge)$, $\mathbf{T}_2 = \exp(\boldsymbol{\xi}_2^\wedge)$ 일 때에도 

$$
\ln (\mathbf{T}_1 \mathbf{T}_2)^\vee = \boldsymbol{\xi}_1 + \boldsymbol{\xi}_2 + \frac{1}{2} \boldsymbol{\xi}_1^\mathfrak{f} \boldsymbol{\xi}_2 + \frac{1}{12} \boldsymbol{\xi}_1^\mathfrak{f} \boldsymbol{\xi}_1^\mathfrak{f} \boldsymbol{\xi}_2 + \cdots
$$

유사하게 표현합니다.

#### Distance, Volume, Integration

두 회전 $\mathbf{C}_1, \mathbf{C}_2 \in SO(3)$의 차이는 좌측 차이 $\boldsymbol{\phi}_{21} = \ln(\mathbf{C}_2 \mathbf{C}_1^T)^\vee$ 또는 우측 차이 $\boldsymbol{\phi}_{12} = \ln(\mathbf{C}_1^T \mathbf{C}_2)^\vee$ 로 정의됩니다.

두 회전 사이의 메트릭 거리 $\phi_{12}$는 차이 벡터의 유클리드 노름과 같습니다. 

$$
\phi_{12} = |\boldsymbol{\phi}_{12}| = \sqrt{\boldsymbol{\phi}_{12}^T \boldsymbol{\phi}_{12}}
$$

회전 $\mathbf{C} = \exp(\boldsymbol{\phi}^\wedge)$의 미소 부피 요소(infinitesimal volume element)는 다음과 같습니다.

$$
d\mathbf{C} = |\det(\mathbf{J})| d\boldsymbol{\phi}
$$

$SO(3)$는 유니모듈러 리 군(unimodular Lie group)이므로 좌측이든 우측이든 부피 요소는 같습니다.

회전 함수 $f(\mathbf{C})$의 적분은 다음과 같이 수행됩니다.

$$
\int_{SO(3)} f(\mathbf{C}) d\mathbf{C} \to \int_{|\boldsymbol{\phi}| < \pi} f(\boldsymbol{\phi}) |\det(\mathbf{J})| d\boldsymbol{\phi}
$$

#### Interpolation

행렬 리 군의 두 원소 사이를 보간해야 할 때가 있습니다. 불행하게도, 일반적인 선형 보간(linear interpolation) 방식 $\mathbf{x} = (1 - \alpha) \mathbf{x}_1 + \alpha \mathbf{x}_2$ ($\alpha \in [0, 1]$)은 닫힘(closure) 속성을 만족하지 않기 때문에 작동하지 않습니다.

$SO(3)$에 대해 정의할 수 있는 보간 방식 중 하나는 다음과 같습니다.

$$
\mathbf{C} = \left( \mathbf{C}_2 \mathbf{C}_1^T \right)^\alpha \mathbf{C}_1
$$

$\alpha = 0$ 일 때 $\mathbf{C} = \mathbf{C}_1$ 이고, $\alpha = 1$ 일 때 $\mathbf{C} = \mathbf{C}_2$ 입니다. 이 방식은 닫힘을 보장합니다. $\mathbf{C}_{21} = \mathbf{C}_2 \mathbf{C}_1^T$는 회전 행렬이며, 지수화를 통해 $\mathbf{C}_{21}^\alpha = \exp(\alpha \boldsymbol{\phi}_{21}^\wedge) \in SO(3)$ 가 되므로, 결과 $\mathbf{C}$ 역시 $SO(3)$에 속합니다.

$\mathbf{C}_1$과 $\mathbf{C}_2$에 작은 섭동($\delta \boldsymbol{\phi}_1, \delta \boldsymbol{\phi}_2$)이 가해졌을 때, 결과 $\mathbf{C}$의 섭동 $\delta \boldsymbol{\phi}$는 다음과 같은 깔끔한 형태를 가집니다.

$$
\delta \boldsymbol{\phi} = (1 - \mathbf{A}(\alpha, \boldsymbol{\phi}_{21})) \delta \boldsymbol{\phi}_1 + \mathbf{A}(\alpha, \boldsymbol{\phi}_{21}) \delta \boldsymbol{\phi}_2
$$

여기서 $\mathbf{A}(\alpha, \boldsymbol{\phi})$는 야코비 행렬을 통해 정의되며 $\mathbf{A}(\alpha, \boldsymbol{\phi}) = \alpha \mathbf{J}(\alpha \boldsymbol{\phi}) \mathbf{J}(\boldsymbol{\phi})^{-1}$이 형태는 일반적인 선형 보간 $\mathbf{x} = (1-\alpha) \mathbf{x}_1 + \alpha \mathbf{x}_2$과 매우 유사합니다. $\boldsymbol{\phi}$가 작을 때 $\mathbf{A}(\alpha, \boldsymbol{\phi}) \approx \alpha \mathbf{I}$ 입니다.

$SE(3)$의 보간법도 $SO(3)$의 경우와 유사합니다.

$$
\mathbf{T} = \left( \mathbf{T}_2 \mathbf{T}_1^{-1} \right)^\alpha \mathbf{T}_1
$$

---

### Kinematics

#### Rotations

회전 행렬 $\mathbf{C} \in SO(3)$에 대한 회전 운동학 방정식(rotational kinematic equation), 즉 푸아송 방정식(Poisson's equation)은 각속도 $\boldsymbol{\omega}$와 회전 $\mathbf{C}$를 다음과 같이 연결합니다.

$$
\dot{\mathbf{C}} = \boldsymbol{\omega}^\wedge \mathbf{C} , \quad \boldsymbol{\omega}^\wedge = \mathbf{C} \dot{\mathbf{C}}^T
$$

이 방정식은 $\mathbf{C}$로 표현되어 특이점(singularity)이 없지만, $\mathbf{C} \mathbf{C}^T = \mathbf{I}$ 라는 제약 조건(constraint)을 가집니다.

리 대수(Lie algebra) $\boldsymbol{\phi} = \ln(\mathbf{C})^\vee$를 사용하여 동등한 운동학을 표현할 수 있습니다. 행렬 지수 함수의 시간 미분을 통해 $\dot{\mathbf{C}}$를 계산하고 정리하면 $\mathbf{C} \dot{\mathbf{C}}^T = (\mathbf{J} \dot{\boldsymbol{\phi}})^\wedge$와 같이 표현됩니다.

#### Poses

변환 행렬 $\mathbf{T} \in SE(3)$는 $\mathbf{T} = \begin{bmatrix} \mathbf{C} & \mathbf{r} \\ \mathbf{0}^T & 1 \end{bmatrix}$로 표현되고, $\text{exp}(\boldsymbol{\xi}^\wedge)=\begin{bmatrix} \boldsymbol{\rho} \\ \boldsymbol{\phi} \end{bmatrix}$와 같음을 증명합니다.

회전 $\dot{\boldsymbol{\phi}}$는 리 대수에서, 병진 $\dot{\mathbf{r}}$은 일반 공간에서 다루는 하이브리드 방법도 있습니다.

$$
\begin{bmatrix} \dot{\mathbf{r}} \\ \dot{\boldsymbol{\phi}} \end{bmatrix} = \begin{bmatrix} \mathbf{I} & -\mathbf{r}^\wedge \\ \mathbf{0} & \mathbf{J}^{-1} \end{bmatrix} \begin{bmatrix} \boldsymbol{\nu} \\ \boldsymbol{\omega} \end{bmatrix}
$$

#### Linearized Rotations

공칭 해 $\mathbf{C}$ 주변에서 섭동 $\mathbf{C}' = \exp(\delta \boldsymbol{\phi}^\wedge) \mathbf{C} \approx (\mathbf{I} + \delta \boldsymbol{\phi}^\wedge) \mathbf{C}$를 고려하여 운동학을 선형화합니다. 섭동된 운동학 $\dot{\mathbf{C}}' = \boldsymbol{\omega}'^\wedge \mathbf{C}'$를 선형화하여 다음 두 방정식을 분리합니다.

공칭 운동학은 $\dot{\mathbf{C}} = \boldsymbol{\omega}^\wedge \mathbf{C}$, 섭동 운동학은 $\dot{\delta \boldsymbol{\phi}} = \boldsymbol{\omega}^\wedge \delta \boldsymbol{\phi} + \delta \boldsymbol{\omega}$와 같이 분리됩니다.

---

### 참고 자료

[원본 경로 #1](https://mingkangxiong.github.io/assets/books/State_Estimation_for_Robotic_2018.pdf?utm_source=chatgpt.com)




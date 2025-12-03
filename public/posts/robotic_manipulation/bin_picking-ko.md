---
title: 'Bin picking'
date: '2024-11-20'
tags: ['Robotics', 'Manipulation', 'lecture']
---

### Bin picking

로봇은 무작위 물체가 가득 찬 한 빈(bin)에서 다른 빈으로 물체를 옮기는 작업입니다. 이는 로봇 학습을 위한 훈련 환경을 구축하거나, 물류 산업과 같은 실제 응용 분야의 기초가 됩니다.

#### 물체가 떨어지는 방식

<img src="https://velog.velcdn.com/images/devjo/post/2d87a34c-4f88-4b91-aec1-538af0ec8bec/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

무작위 물체를 빈에 떨어뜨리는 것을 시뮬레이션하는 것입니다.

초기 설정은 무작위 수의 물체를 무작위 포즈로 생성하고 물체의 수직 위치(vertical positions)를 엇갈리게(staggered) 배치하여 처음부터 물리적 공간을 침범하지 않도록 합니다.

---

### Static Equilibrium with Frictional Contact

물체가 움직임을 멈추고 정적 평형(Static Equilibrium) 상태에 도달했을 때의 물리학을 이해하는 것이 중요합니다. 일반적인 위치 $q$와 $v$를 사용하여 

$$
M(q)\dot{v} + C(q,v)v=\tau_g(q)+\sum_i J_i^T(q)F^{C_i}
$$

이와 같이 표현되고 정적 평형에서는 속도,가속도가 0이므로 좌변은 0이 됩니다.

#### Collision Geometry and contact forces

시뮬레이션에서 물체는 시각적 형상(visual geometry)과 별도로 충돌 형상(collision geometry)을 가집니다. 충돌 형상은 종종 상자, 구, 실린더 등 단순화된 형태를 사용하여 물리 엔진의 속도와 견고성을 높입니다.

충돌하는 두 물체 사이의 접촉 힘 $\mathbf{F}_{\text{contact}_i}$은 접촉점 또는 접촉 패치에서 발생합니다.

---

### Model-based Grasp Selection

좋은 파지(grasp)는 손 안의 물체를 안정화하고 외력 렌치(adversarial wrench)에 저항할 수 있는 파지입니다.

접촉 렌치 원뿔은 6차원 렌치 콘의 경우 $K_C^C$가 접촉 점에서 

$$
K_C^C=\begin{Bmatrix} \begin{bmatrix} 0 \\ 0 \\ 0 \\ f_{C_x}^C \\ f_{C_y}^C \\ f_{C_z}^C\end{bmatrix}\end{Bmatrix}
$$

와 같고 공간대수에 의해 다음이 성립합니다.

$\Rightarrow$ 같은 지점에 적용되고 같은 좌표계의 렌치의 덧셈에 대해 $K_{total,C}^{B_p}=K_{0,c}^{B_p} \oplus K_{1,c}^{B_p} \oplus + \cdots$가 성립합니다.

$\Rightarrow$ 기존 연산인 $K_C^{B_p}$에서 $B_q$로 렌치 콘을 이동할 때 $K_C^{B_q} = \begin{bmatrix} I_{3 \times 3} & [^B_q P_C^{B_p} \\ 0_{3 \times 3} & I_{3 \times 3}]\end{bmatrix}$로 회전공식을 세울 수 있습니다.

---

### Grasp Selection from Point Clouds

특정 물체를 인식하고 포즈를 추정하는 대신, 이 접근 방식은 분할되지 않은(unsegmented) point cloud에서 파지 가능한 영역을 직접 찾습니다.

#### Point Cloud Pre-processing

<img src="https://velog.velcdn.com/images/devjo/post/90d31469-5dcf-41b3-b714-26a4adf48305/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

여러 대의 RGB-D 카메라에서 얻은 점 구름을 조작 관심 영역만 포함하는 단일 point cloud으로 병합하고 정리해야 합니다. 알려진 빈 위치 바로 위의 축 정렬 경계 상자를 기준으로 관심 영역 외부의 점을 버립니다. 그리고 법선(normals)을 추정합니다. 다운샘플링으로 3D 공간을 규칙적인 크기의 큐브(복셀)로 나누고, 각 복셀에 대해 하나의 점으로 요약합니다. 이는 잡음이 있는 점 구름을 필터링하는 역할도 합니다.

#### Estimating Normals and Local Curvature

점 집합 $\mathcal{P}$에 대해 최소 제곱 오차로 가장 잘 맞는 평면을 찾습니다. 평면의 법선 벡터 $\mathbf{n}$는 다음과 같이 정의됩니다.

$$
\begin{aligned}
&\underset{p,n}{min} \sum_{i=1}^N |(p^i-p)^Tn|^2, \\
&\text{subject to} \quad |n|^2_2=1
\end{aligned}
$$

평면 맞추기 오차를 최소화하는 법선 벡터 $\mathbf{n}$는 데이터 행렬 $\mathbf{D} = \sum_{i} (\mathbf{p}^i - \mathbf{p}^{\text{avg}})(\mathbf{p}^i - \mathbf{p}^{\text{avg}})^{\text{T}}$의 가장 작은 고윳값에 해당하는 고유 벡터로 주어집니다.

#### Evaluating a Candidate Grasp

파지 후보의 점수를 매기는 비용 함수를 생각해 보겠습니다.

$$
\text{cost} = -\sum_i (n^i_{G_x})^2
$$

좋은 파지는 핑거가 물체의 표면을 반대 방향에서 대칭적으로 잡을 때 발생합니다. 음수 기호는 정렬이 잘 될수록 비용(Cost)이 감소함을 의미합니다.

#### Generating Grasp Candidates

<img src="https://velog.velcdn.com/images/devjo/post/66f38f97-fc11-4615-8164-b80ba545a5a6/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

점 구름에서 비용을 최소화하는 최적의 파지 포즈 $\mathbf{X}^{G}$를 찾는 것은 매우 어려운 비볼록 최적화 문제입니다. 따라서 대부분의 접근 방식은 무작위 샘플링 기반 알고리즘을 사용합니다.

하나의 예시는 포인트 클라우드의 국소 곡률을 사용하여 포인트 클라우드 법선이 손바닥을 향하도록 하는 그립 후보를 제안하고, 손가락이 최대 곡률 방향에 정렬되도록 손을 조정하는 것입니다.

또 다른 휴리스틱은 포인트 클라우드에서 대척점 쌍을 찾은 다음, 손가락을 해당 대척점 쌍에 정렬할 수 있는 그립 후보를 샘플링하는 것입니다. 대척점 쌍을 찾는 합리적인 방법은 포인트 클라우드에서 무작위로 점을 선택한 다음, 법선의 반대 방향으로 포인트 클라우드에 레이 캐스팅하는 것입니다.

---

### 참고 자료

[원본 경로 #1](https://manipulation.csail.mit.edu/clutter.html#section5)


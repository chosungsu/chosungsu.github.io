---
title: 'Robot Manipulator Control'
date: '2024-12-04'
tags: ['Robotics', 'Manipulation', 'lecture']
---

### Introduction

로봇 제어, 계획, 센서 및 휴먼 인터페이스를 위한 고급 기술을 연구할 때는 상업적으로 사용 가능한 시스템을 인지하는 것이 중요합니다. 이를 통해 새로운 기술을 기존 시스템에 구현할 수 있는 토대 위에서 개발할 수 있습니다.

과거 공장 자동화에서는 각 로봇이 특정 작업을 수행하는 컨베이어 기반의 고정된 레이아웃이 흔했습니다. 이러한 조립 라인은 설치 비용이 매우 비싸고, 수정하거나 재프로그래밍하기 어려워 다품종 소량 생산(HMLV, High-Mix Low-Volume) 시대에 적합하지 않습니다. 따라서 유연한 로봇 작업대는 로봇을 부품 처리, 조립 및 기타 공정 작업에 사용하여 로봇의 다재다능함을 극대화합니다.

---

### Commercial Robot Configurations and Types

대부분의 상업용 산업용 로봇은 신뢰할 수 있는 기성 구성 요소 기술을 사용하는 확고한 회사들로부터 공급됩니다. 모든 상업용 산업용 로봇은 두 가지 물리적으로 분리된 기본 요소 매니퓰레이터 팔(manipulator arm)과 컨트롤러(controller)로 구성됩니다. 기본 아키텍처는 대부분 동일하며, 일반적으로 6개 이하의 축(자유도)을 가진 직렬 링크(serial-link) 운동학 기계에 디지털 서보 제어되는 전기 모터 구동장치로 구성됩니다.

다음 구성이 일반적입니다.

Articulated Arms는 대부분 회전형(revolute) 조인트로 구성됩니다. 두 번째와 세 번째 축은 동일 평면상에 있으며 수직면에서 움직임을 생성합니다. 첫 번째 축은 수직으로, 팔을 회전시켜 큰 작업 볼륨을 휩쓸어 움직입니다. 5개 이상의 자유도가 필요할 때, 다른 구성보다 작업 공간 효율성이 뛰어납니다.

SCARA Type 1은 첫 번째와 두 번째 축은 수평면에서 회전형입니다. 세 번째 축은 수직 또는 z축을 추가하여 작업 볼륨을 제공하며, 네 번째 회전축이 수평면에서 방향을 제어합니다. 팔 구조는 무게를 지탱하지만, 첫 번째와 두 번째 축은 들어 올리는 작업을 하지 않습니다. 정밀도가 매우 높습니다.

Cartesian Coordinate Robots은 직교하는 직선형(prismatic) 축(x, y, z)을 사용하여 엔드 이펙터를 직사각형 작업 공간을 통해 이동시킵니다. 갠트리 로봇(Gantry robots)이 가장 일반적이며, 대형 영역이나 큰 하중을 처리해야 하는 재료 처리 응용 분야에 적합합니다.

---

### Commercial Robot Controllers

#### Motion Trajectory Generation and Following

각 로봇 시스템의 고유한 측면은 실시간 서보 레벨 동작 제어입니다. 이 세부 사항은 일반적으로 안전 및 독점 정보 보호를 이유로 사용자에게 공개되지 않습니다. 컨트롤러는 상위 레벨 코디네이터의 디지털 데이터를 정밀한 계산과 개별 축 동작 명령의 고속 배포 및 통신을 통해 조정된 팔 동작으로 변환합니다.

대부분의 상업용 로봇 컨트롤러는 $16$msec의 샘플 주기로 작동하며, 예외 없이 고전적인 독립 조인트 PID(비례-적분-미분) 제어 또는 PID의 단순한 수정 형태를 사용합니다. 이로 인해 상업적으로 이용 가능한 컨트롤러는 점 대 점(point-to-point) 동작에는 적합하지만, 연속적인 위치/속도 프로파일을 추종하거나 규정된 힘을 가하는 데는 상당한 프로그래밍 노력 없이는 어렵거나 불가능한 경우가 많습니다.

#### Motion/Process Integration and Sequencing

이산 디지털 입/출력(I/O)을 통한 것입니다. 예를 들어, 외부 기계 컨트롤러가 로봇에 적재 준비가 되었음을 나타내는 1비트 신호를 보낼 수 있습니다. 로봇 컨트롤러는 이 디지털 신호를 읽고 논리 연산을 수행할 수 있는 능력이 있어야 합니다. 즉, 일부 로봇 컨트롤러에는 PLC(Programmable Logic Controller) 기능이 내장되어 있습니다.

---

### Control Theory

로봇 매니퓰레이터의 제어는 성숙했지만 연구, 개발 및 제조를 위한 여전히 결실이 많은 분야입니다. 산업용 로봇은 기본적으로 위치 지정 및 핸들링 장치이므로, 움직임과 로봇 및 환경 간의 상호 작용하는 힘 및 토크를 제어할 수 있는 로봇이 유용합니다. 제어를 위해서는 일반적으로 수학적 모델과 모델에 작용할 수 있는 일종의 지능이 필요합니다.

#### inear State-Variable Systems

유한 차원 상태 공간으로 이어지는 상미분 방정식(ordinary differential equations)으로 기술되는 시스템으로 한정됩니다.

연속 시간 시스템은 중첩 원리를 따르는 경우 선형(linear)이라고 합니다. 즉, 입력 $u(t) = \alpha_1 u_1(t) + \alpha_2 u_2(t)$에 대한 출력은 $y(t) = \alpha_1 y_1(t) + \alpha_2 y_2(t)$로 주어집니다. 그리고 시스템은 다음과 같은 선형, 스칼라, 상수 계수 상미분 방정식으로 기술됩니다.

$$
\begin{aligned}
&\frac{d^n y}{dt^n} + a_{n-1} \frac{d^{n-1} y(t)}{dt^{n-1}} + \cdots + a_0 y(t) \\
&= b_n \frac{d^n u(t)}{dt^n} + b_{n-1} \frac{d^{n-1} u(t)}{dt^{n-1}} + \cdots + b_0 u(t)
\end{aligned}
$$

여기서 $y(t)$는 스칼라 출력이고 $u(t)$는 스칼라 입력입니다.

#### State-Space Realization

시스템의 상태(state)는 시간 $t_0$에서 지정될 때 입력 $u(t), t \ge t_0$와 함께 시스템의 모든 시점에서의 동작을 완전히 결정하기에 충분한 변수 집합으로 정의됩니다. 상태 벡터는 고유하지 않습니다. $\mathbf{x}$가 상태 벡터이면, $\bar{\mathbf{x}}(t) = T \mathbf{x}(t)$도 상태 벡터입니다.

상태 공간 표현의 일반적인 형태는 다음과 같습니다.

$$
\begin{aligned}
&\dot{\mathbf{x}}(t) = A \mathbf{x}(t) + B u(t) \\
&y(t) = C \mathbf{x}(t) + D u(t)
\end{aligned}
$$

이 표현을 controllable canonical form이라고 합니다.

---

### Nonlinear State-Variable Systems

많은 경우, 근본적인 물리적 동작은 선형 상태 변수 방정식으로 설명될 수 없습니다. 이는 서로 다른 링크 간의 상호 작용이 비선형 미분 방정식으로 기술되는 로봇 매니퓰레이터의 경우입니다.

#### Continuous-Time Systems

비선형, 스칼라, 연속 시간, 시불변 시스템은 다음과 같은 비선형, 스칼라, 상수 계수 미분 방정식으로 기술됩니다.

$$
\frac{d^n y(t)}{dt^n} = h [y(t), y^{(1)}(t), \cdots, y^{(n-1)}(t), u(t), u^{(1)}(t), \cdots, u^{(n)}(t)]
$$

더 압축적인 공식은 다음과 같습니다.

$$
\begin{aligned}
&\dot{\mathbf{x}}(t) = \mathbf{f} [\mathbf{x}(t), \mathbf{U}(t)] \\
&y(t) = \mathbf{c} \mathbf{x}(t)
\end{aligned}
$$

#### Nonlinear Systems

Damped Pendulum Equation은 다음과 같이 정의되고

$$
\ddot{y} + k \dot{y} + \sin(y) = 0
$$

상태 $x_1 = y, x_2 = \dot{y}$를 선택하면 다음과 같은 상태 공간 표현을 얻습니다.

$$
\begin{bmatrix} \dot{x}_1 \\ \dot{x}_2\end{bmatrix} = \begin{bmatrix} x_2 \\ \sin(x_1) - x_2\end{bmatrix}
$$

#### Equilibrium Points

입력 $\mathbf{u}(t)$가 상태 $\mathbf{x}(t)$의 함수로 지정되는 시스템에 중점을 둡니다.

$$
\dot{\mathbf{x}}(t) = \mathbf{f} [t, \mathbf{x}(t)]
$$

Nonautonomous System에서 $\dot{x}=tx^2$로 정의되고 평형점은 

$$
\begin{bmatrix} \dot{x}_1 \\ \dot{x}_2\end{bmatrix} = \begin{bmatrix} x_2 \\ \cos(x_1) - 1\end{bmatrix}
$$

로 정의됩니다.

---

### Stability Theory

자유 시스템은 다음과 같습니다.

$$
\dot{\mathbf{x}}(t) = \mathbf{f} (\mathbf{x}, t)
$$

$\mathbf{x}_e$가 $t_0$에서 sense of Lyapunov인 경우 충분히 가까운 곳에서 시작하면 상태가 나중 시간에도 $\mathbf{x}_e$에 항상 가깝게 유지됩니다.

#### Lyapunov Stability Theorems

비강제(unforced) 비선형 시스템의 동작을 다룹니다. 원점 $\mathbf{x}=\mathbf{0}$은 이 시스템의 평형점이라고 가정합니다. 랴푸노프 이론이 필요한 주된 이유는 미분 방정식을 풀지 않고 특정 평형점의 안정성을 결정할 수 있고 정성적 결과를 제공하기 때문입니다.

연속 함수 $\alpha: \mathbb{R} \to \mathbb{R}$가 다음을 만족하면 K-클래스에 속한다고 말합니다. $\alpha(0)=0$, 양수에 대해 $\alpha(x)>0$로 단조 증가하는 성질을 갖습니다.

#### Input/Output Stability

랴푸노프 안정성은 유계 입력이 유계 출력을 초래한다는 것을 보장하지는 않습니다.

---

### 참고 자료

[원본 경로 #1](https://lewisgroup.uta.edu/FL%20books/Robot_Manipulator_Control_Theory_and_Practice_-_Frank_L.Lewis-%20small.pdf)


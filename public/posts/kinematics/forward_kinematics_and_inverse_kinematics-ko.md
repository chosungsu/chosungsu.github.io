---
title: 'Forward Kinematics and Inverse Kinematics'
date: '2024-02-09'
tags: ['Robotics', 'Kinematics', 'lecture']
---

### Product of Exponentials Formula

지수 곱(PoE) 공식을 사용하려면 고정된 공간 좌표계 $\{s\}$와 로봇이 영점 자세에 있을 때 $M$으로 설명되는 말단 장치 좌표계 $\{b\}$만 지정하면 됩니다. $n$개의 관절을 가진 로봇의 운동학을 정의할 때 다음과 같이 할 수 있습니다.

#### Screw Axes in the Base Frame

PoE 공식의 핵심 개념은 각 관절이 모든 바깥쪽 링크에 스크류 운동(screw motion)을 적용하는 것으로 간주하는 것입니다. 우선 모든 관절 값을 0으로 설정하여 로봇을 영점 자세에 놓습니다.

<img src="https://velog.velcdn.com/images/devjo/post/dd573803-2270-4faa-af34-42cd5912c002/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

$\mathbf{T}(\theta)$는 $\mathbf{M}$에 $n$개의 스크류 운동을 순차적으로 적용한 결과입니다.

$$
T(\theta) = e^{[\mathcal{S}_1]\theta_1} \cdots e^{[\mathcal{S}_{n-1}]\theta_{n-1}} e^{[\mathcal{S}_n]\theta_n} M
$$

이것은 $n$-자유도 개방 체인의 순방향 운동학을 설명하는 지수 곱 공식의 공간 형태입니다.

#### 3R spatial open chain

3R spatial open chain에서는 

$$
T(\theta) = e^{[\mathcal{S}_1]\theta_1} e^{[\mathcal{S}_2]\theta_2} e^{[\mathcal{S}_3]\theta_3} M
$$

위와 같이 스크류 축 정보를 제공할 수 있습니다. 그리고 영점자세 $M$은 다음과 같습니다.

$$
M = \begin{bmatrix} 0 & 0 & 1 & L_1 \\ 0 & 1 & 0 & 0 \\ -1 & 0 & 0 & -L_2 \\ 0 & 0 & 0 & 1 \end{bmatrix}
$$

스크류 축 $S_i=(w_i, v_i)$에 대해 고정된 베이스 프레임 $\{0\}$에서 표현되며 $\omega_i$는 축의 방향을 나타내는 단위 벡터이고 $v_i = -\omega_i \times q_i$입니다. 그리고 각 축을 다음과 같이 설정합니다. $S_1$은 $\hat{z}_0, \omega_1 = (0, 0, 1)$ 방향입니다. 축 위의 점 $q_1$을 원점으로 잡으면 $v_1 = (0,0,0)$이 됩니다. 다음 축 $S_2$는 $\hat{y}_0, \omega_2 = (0, -1, 0)$의 음의 방향을 가리킵니다. 축 위의 점 $q_2$를 $(L_1, 0, 0)$으로 선택하면 $v_2 = (0,0,-L_1)$이 됩니다. 마지막 축 $S_3$은 $\hat{x}_0, \omega_3 = (1, 0, 0)$ 방향을 가리킵니다. 축 위의 점 $q_3$을 $(0, 0, -L_2)$ 선택하여 $v_3=(0,L_2, 0)$이 되게 합니다.

---

### Inverse Kinematics

$n$자유도 개방 체인의 순방향 운동학이 $T(\theta)$일 때, 역 운동학 문제(IK)는 주어진 동차 변환 $X \in \text{SE}(3)$에 대해 $T(\theta) = X$를 만족하는 해 $\theta$를 찾는 것입니다.

<img src="https://velog.velcdn.com/images/devjo/post/eb98bb70-2c42-4a56-ae95-981a5776cab5/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

예를 들어 2링크 평면 개방 체인을 고려합니다. 말단 장치의 위치만을 고려할 때, 순방향 운동학은 다음과 같습니다.

$$
\begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} L_1 \cos \theta_1 + L_2 \cos(\theta_1 + \theta_2) \\ L_1 \sin \theta_1 + L_2 \sin(\theta_1 + \theta_2) \end{bmatrix}
$$

$L_1 > L_2$라고 가정하면, 도달 가능한 지점($\text{workspace}$)은 내부 반경 $L_1 - L_2$와 외부 반경 $L_1 + L_2$를 갖는 고리 모양(annulus)입니다. 주어진 말단 장치 위치 $(x, y)$에 대해 고리 외부는 해가 0, 내부는 $\theta_2$의 부호에 따라 elbow up 또는 elbow down이라고 합니다.

$(x, y)$에 대한 명시적인 해 $(\theta_1, \theta_2)$를 찾기 위해 2인수 아크탄젠트 함수 $\text{atan2}(y, x)$와 코사인 법칙을 사용합니다. 삼각형의 세 변의 길이를 $a, b, c$라고 하며 $c$와 마주보는 내각을 $C$라고 할 때 코사인 법칙은 다음과 같습니다.

$$
c^2 = a^2 + b^2 - 2ab \cos C
$$

위 이미지에서 각도 $\beta = \cos^{-1}\left(\frac{L_1^2 + L_2^2 - x^2 - y^2}{2L_1L_2}\right)$로 구하고 또 다른 각도 $\alpha = \cos^{-1}\left(\frac{x^2 + y^2 + L_1^2 - L_2^2}{2L_1\sqrt{x^2 + y^2}}\right)$로 구합니다. 이 각도들을 사용하여 역 운동학의 해는 다음과 같습니다. 오른팔 해(elbow down)는 $\theta_1 = \gamma - \alpha, \theta_2 = \pi - \beta$를 가지며 왼팔 해(elbow up)는 $\theta_1 = \gamma + \alpha, \theta_2 = \beta - \pi$를 가집니다.

#### Newton–Raphson Method

미분 가능한 함수 $g: \mathbb{R} \to \mathbb{R}$에 대해 $g(\theta) = 0$을 풀기 위해, 초기 추측 $\theta^0$부터 다음 반복을 사용합니다.

$$
\theta^{k+1} = \theta^k - \left( \frac{\partial g}{\partial \theta} (\theta^k) \right)^{-1} g(\theta^k)
$$

순방향 운동학이 좌표 벡터 $x = f(\theta)$로 표현되고, 원하는 말단 장치 좌표가 $x_d$일 때 $g(\theta) = x_d - f(\theta) = 0$을 만족하는 $\theta_d$를 찾습니다. 여기서 $\theta^0$ 근처에서 자코비언 행렬 $J(\theta^0)$가 정사각($m=n$)이고 가역적이면 $\Delta \theta = J^{-1}(\theta^0) (x_d - f(\theta^0))$를 만족합니다.

#### Inverse Velocity Kinematics

원하는 말단 장치 자세가 $T_{sd} \in \text{SE}(3)$로 표현될 때 좌표 자코비안 $J$를 말단 장치 몸체 자코비안 $J_b \in \mathbb{R}^{6 \times n}$로 대체하고 벡터 오류 $e = x_d - f(\theta^i)$는 몸체 비틀림 $\mathcal{V}_b \in \mathbb{R}^6$로 대체됩니다.

$$
[\mathcal{V}_b] = \log \left( T_{sb}^{-1}(\theta^i) T_{sd} \right)
$$

$T_{sd}(t)$를 추적하기 위해 역 속도 운동학을 사용할 수 있습니다. 

$$
\dot{\theta} = J^{\dagger}(\theta) \mathcal{V}_d
$$

운동 에너지 $\frac{1}{2} \dot{\theta}^T M(\theta) \dot{\theta}$ 또는 위치 에너지 $\nabla h(\theta)^T \dot{\theta}$와 같은 다른 기준을 최소화하도록 관절 속도에 가중치를 부여할 수 있습니다.

---

### Solvability

매니퓰레이터의 운동학 방정식(kinematic equations)을 푸는 문제는 비선형(nonlinear) 문제입니다. $T$의 수치 값이 주어지면 관절 각도 $\theta_1$부터 $\theta_6$까지의 값을 찾으려고 시도합니다. 자유도가 6개인 팔의 경우 12개의 방정식과 6개의 미지수가 있습니다. 그러나 회전 행렬 부분에서 발생하는 9개의 방정식 중 3개만 독립적입니다.

#### Existence of Solutions

해의 존재 여부는 매니퓰레이터의 작업 공간(workspace)에 대한 질문으로 이어집니다. 대략적으로 말해 작업 공간은 매니퓰레이터의 말단 장치(end-effector)가 도달할 수 있는 공간의 부피입니다. 해가 존재하려면 지정된 목표 지점이 작업 공간 내에 있어야 합니다. 로봇 말단 장치가 모든 자세(all orientations)로 도달할 수 있는 공간의 부피를 Dextrous workspace라고 하며 로봇이 적어도 하나의 자세로 도달할 수 있는 공간의 부피를 Reachable workspace라고 합니다.

<img src="https://velog.velcdn.com/images/devjo/post/9fc91a76-aef0-4583-87be-98a4577d7b3c/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

$l_1 = l_2$이면 도달 가능 공간이 반지름 $2l_1$의 원판입니다. 능숙 작업 공간은 원점 하나뿐입니다. 이 제약조건이 아닌 $l_1 \neq l_2$이면 능숙 작업 공간은 없으며 도달 가능한 작업 공간은 바깥쪽 반지름 $l_1 + l_2$ 및 안쪽 반지름 $|l_1 - l_2|$의 링(ring)이 됩니다.

#### Multiple Solutions

운동학 방정식을 푸는 데 있어 발생하는 또 다른 가능한 문제는 다중 해입니다. 매니퓰레이터에 여러 해가 있다는 사실은 시스템이 그중 하나를 선택할 수 있어야 하므로 문제를 일으킬 수 있습니다.

<img src="https://velog.velcdn.com/images/devjo/post/5b298573-020c-4e7b-8f45-d901e43c5078/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

예를 들어 로봇을 점 A에서 점 B로 이동하려는 경우 각 관절이 움직여야 하는 양을 최소화하는 해를 선택하는 것이 좋습니다. 장애물이 없는 경우 관절 공간에서 가장 가까운 해가 선택됩니다. 장애물이 있는 경우 더 먼 해가 선택될 수 있습니다. 일반적으로 가능한 모든 해를 계산할 수 있어야 합니다.

#### Manipulator subspace when $n < 6$

$n$ 자유도 매니퓰레이터($n < 6$)의 도달 가능한 작업 공간은 $n$ 자유도 부분 공간(subspace)의 일부로 생각할 수 있습니다.

$$
^B_W T = \begin{bmatrix} c_{\phi} & -s_{\phi} & 0 & x \\ s_{\phi} & c_{\phi} & 0 & y \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}
$$

여기서 $x$, $y$는 손목의 위치를 제공하고 $\phi$는 최종 링크의 자세를 설명합니다. 일반적으로 목표에 도달할 수 없기에 매니퓰레이터의 부분 공간에 있고 원래 원하는 목표에 가장 가까운 목표에 도달하는 데 관심이 있을 수 있습니다.

#### Solution

평면 3링크 매니퓰레이터의 순방향 운동학 방정식 $^0_3 T$를 목표 사양 $^B_W T$와 일치시킴으로써 4개의 비선형 방정식을 얻습니다.

$$
\begin{aligned}
&c_{\phi} = c_{123}, \\
&s_{\phi} = s_{123}, \\
&x=l_1c_1 + l_2c_{12}, \\
&y=l_1s_1 + l_2s_{12}
\end{aligned}
$$

이를 통해 $c_2=\frac{x^2+y^2-l_1^2-l_2^2}{2l_1l_2}$로 $\theta_2$의 코사인 표현을 구할 수 있고 원형 공식에 따라 $s_2 = \pm \sqrt{1 - c_2^2}$를 사용하여 $s_2$를 찾을 수 있습니다.

---

### Pieper's solution when three axes intersect

완전히 일반적인 6자유도 로봇은 폐쇄형 해법이 없지만 특정 중요한 특수 사례는 풀 수 있습니다. 마지막 세 축이 교차할 때, 링크 좌표계 $\{4\}$, $\{5\}$, $\{6\}$의 원점은 모두 이 교차점에 위치합니다. 이 교차점 ${}^B_4 p$는 기본 좌표계에서 다음과 같이 주어집니다.

$$
{}^0 p_{4ORG} = {}^0_1 T {}^1_2 T {}^2_3 T {}^3 p_{4ORG} = \begin{bmatrix} x \\ y \\ z \\ 1 \end{bmatrix}
$$

이 점은 $i=4$에 대한 관절 각도 $\theta_1, \theta_2, \theta_3$에만 의존합니다. $\theta_4, \theta_5, \theta_6$는 이 교차점의 위치에 영향을 미치지 않습니다.

---

### 참고 자료

[원본 경로 #1](https://www.changjiangcai.com/files/text-books/Introduction-to-Robotics-3rd-edition.pdf?utm_source=chatgpt.com)

[원본 경로 #2](https://hades.mech.northwestern.edu/images/7/7f/MR.pdf)


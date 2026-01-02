---
title: 'Spatial descriptions and Transformations'
date: '2024-02-02'
tags: ['Robotics', 'Kinematics', 'lecture']
---

### Introduction

로봇 조작은 정의상 부품과 도구가 어떤 메커니즘에 의해 공간에서 움직여짐을 의미합니다. 이는 자연스럽게 부품, 도구 및 메커니즘 자체의 위치(position)와 자세(orientation)를 표현할 필요성으로 이어집니다. 위치와 자세를 나타내는 수학적 양을 정의하고 조작하기 위해 좌표계를 정의하고 표현 규칙을 개발해야 합니다.

---

### Position, Orientation, Frame

#### Description of a position

$3 \times 1$ 위치 벡터를 사용하여 우주의 임의의 점을 찾을 수 있습니다. 우주 좌표계 외에도 많은 좌표계를 정의할 것이므로, 벡터는 그것이 정의된 좌표계를 식별하는 정보로 태그되어야 합니다. 이 책에서 벡터는 그것이 참조하는 좌표계를 나타내는 선행 위 첨자(leading superscript)와 함께 작성됩니다. 예를 들어, ${}^A \mathbf{P}$는 ${A}$의 축을 따라 거리를 나타내는 숫자 값을 가지는 ${}^A \mathbf{P}$의 구성 요소가 있음을 의미합니다. 축을 따른 이러한 각 거리는 벡터를 해당 축에 투영한 결과로 생각할 수 있습니다. 벡터의 개별 요소에는 아래 첨자 $x, y,$ 및 $z$가 주어집니다.

$$
\mathbf{P} = \begin{bmatrix} P_x \\ P_y \\ P_z \end{bmatrix}
$$

#### Description of an orientation

<img src="https://velog.velcdn.com/images/devjo/post/985747fd-6d2f-41f3-8566-9ee8d1b96cf4/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

벡터 ${}^A \mathbf{P}$가 조작기 손가락 끝 사이의 점의 위치를 나타내는 경우, 조작기가 충분한 수의 조인트를 가진다고 가정할 때 손가락 끝 사이의 점을 공간에서 같은 위치에 유지하면서 손은 임의로 자세를 취할 수 있으므로 그 자세가 주어질 때까지 손의 완전한 위치가 지정되지 않습니다. 물체의 자세를 설명하기 위해 물체에 좌표계를 부착한 다음, 기준 시스템에 상대적인 이 좌표계의 설명을 제공할 것입니다.

따라서 점의 위치는 벡터로 설명되고 물체의 자세는 부착된 좌표계로 설명됩니다. 물체에 부착된 좌표계 $\{B\}$를 설명하는 한 가지 방법은 그것의 세 가지 주요 축의 단위 벡터를 좌표계 $\{A\}$의 관점에서 작성하는 것입니다. 좌표계 $\{B\}$의 주 방향을 나타내는 단위 벡터를 $\hat{X}_B$, $\hat{Y}_B,$ 및 $\hat{Z}_B$로 나타냅니다. 좌표계 $\{A\}$의 관점에서 작성될 때, 그것들은 ${}^A \hat{X}_B, {}^A \hat{Y}_B,$ 및 ${}^A \hat{Z}_B$라고 불립니다.

$3 \times 3$ 행렬의 열로 함께 쌓는 것을 회전 행렬(rotation matrix)이라고 하며 그것을 ${}^A_B \mathbf{R}$라는 표기법으로 명명합니다.

$$
{}^A_B \mathbf{R} = [{}^A \hat{X}_B \quad {}^A \hat{Y}_B \quad {}^A \hat{Z}_B]
$$

각 구성 요소는 단위 벡터 쌍의 내적(dot product)으로 작성될 수 있습니다.

$$
{}^A_B \mathbf{R} = \begin{bmatrix} \hat{X}_B \cdot \hat{X}_A & \hat{Y}_B \cdot \hat{X}_A & \hat{Z}_B \cdot \hat{X}_A \\ \hat{X}_B \cdot \hat{Y}_A & \hat{Y}_B \cdot \hat{Y}_A & \hat{Z}_B \cdot \hat{Y}_A \\ \hat{X}_B \cdot \hat{Z}_A & \hat{Y}_B \cdot \hat{Z}_A & \hat{Z}_B \cdot \hat{Z}_A \end{bmatrix}
$$

위 식을 통해서 $\{B\}$에 상대적인 $\{A\}$의 설명 ${}^B \mathbf{R}_A$는 전치(transpose)로 바라보면 됨을 이해할 수 있습니다.

#### Description of a frame

조작기 손의 소재를 완전히 지정하는 데 필요한 정보는 위치와 자세입니다. 설명할 점의 위치를 편의를 위해 물체에 부착된 프레임의 원점으로 선택합니다. 위치와 자세 쌍의 상황은 로봇 공학에서 너무 자주 발생하여 프레임(frame)이라고 불리는 엔티티를 정의합니다. 프레임은 위치 및 자세 정보를 제공하는 네 개의 벡터 세트입니다. 하나의 벡터는 손가락 끝 위치를 찾고 세 개의 벡터는 그것의 자세를 설명합니다.

프레임 $\{B\}$는 ${}^A_B \mathbf{R}$와 ${}^A \mathbf{P}_{BORG}$로 설명되며, 여기서 ${}^A \mathbf{P}_{BORG}$는 프레임 $\{B\}$의 원점을 찾는 벡터입니다.

$$
\{B\} = \{ {}^A_B \mathbf{R}, \quad {}^A \mathbf{P}_{BORG} \}
$$

---

### Changing descriptions from frame to frame

#### Mappings involving translated frames

<img src="https://velog.velcdn.com/images/devjo/post/c79f5469-4140-4951-a3ed-f8dd1977e94e/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

$\{A\}$와 동일한 자세를 가질 때 이 공간의 점을 프레임 $\{A\}$의 관점에서 표현하기를 원하는데 $\{B\}$는 $\{A\}$와 병진만 다릅니다. 이 병진은 $\{A\}$에 상대적인 $\{B\}$의 원점을 찾는 벡터 ${}^A \mathbf{P}_{BORG}$로 주어집니다.

$$
{}^A \mathbf{P} = {}^B \mathbf{P} + {}^A \mathbf{P}_{BORG}
$$

두 벡터 모두 동일한 자세의 프레임에 상대적으로 정의되므로 벡터 덧셈을 통해 계산합니다.

#### Mappings involving rotated frames

회전 행렬 ${}^A_B \mathbf{R}$는 $\{A\}$에 상대적인 $\{B\}$의 자세를 나타냅니다.

<img src="https://velog.velcdn.com/images/devjo/post/cc0a5a96-d172-4938-b76e-029785a871e4/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

두 프레임의 원점이 일치하는 다른 프레임 $\{A\}$에 상대적인 그것의 정의를 알고 싶어하는 상황에서 $\{A\}$에 상대적인 $\{B\}$의 자세 설명 ${}^A_B \mathbf{R}$가 알려져 있을 때 가능합니다.

$$
{}^A \mathbf{P} = {}^A_B \mathbf{R} {}^B \mathbf{P}
$$

벡터의 설명을 $\{B\}$에 상대적인 ${}^B \mathbf{P}$에서 $\{A\}$에 상대적인 ${}^A \mathbf{P}$로 변경하는 매핑을 구현합니다.

#### Mappings involving general frames

<img src="https://velog.velcdn.com/images/devjo/post/d8407232-5005-4f3f-9d57-39e39b313354/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

여기서 프레임 $\{B\}$의 원점은 $\{A\}$와 일치하지 않고 일반적인 벡터 오프셋 ${}^A \mathbf{P}_{BORG}$를 가집니다. 또한 $\{B\}$는 ${}^A_B \mathbf{R}$로 설명된 대로 $\{A\}$에 대해 회전됩니다. 이전과 같이 간단한 벡터 덧셈으로 원점 간의 병진을 설명하고 다음을 얻습니다.

$$
{}^A \mathbf{P} = {}^A_B \mathbf{R} {}^B \mathbf{P} + {}^A \mathbf{P}_{BORG}
$$

이는 한 프레임의 설명에서 두 번째 프레임의 설명으로 벡터를 변환하는 일반적인 변환 매핑을 설명합니다. 행렬 연산자 형식으로 작성하기 위해 4차원 위치 벡터($4 \times 1$)를 사용하고 다음과 같이 $4 \times 4$ 행렬 연산자를 정의합니다. 이를 동차 변환(homogeneous transform)이라고 부릅니다.

$$
\begin{bmatrix} {}^A \mathbf{P} \\ 1 \end{bmatrix} = \begin{bmatrix} {}^A_B \mathbf{R} & {}^A \mathbf{P}_{BORG} \\ \mathbf{0}^T & 1 \end{bmatrix} \begin{bmatrix} {}^B \mathbf{P} \\ 1 \end{bmatrix}
$$

---

### Translation, Rotation and Transformation

#### Translational operators

<img src="https://velog.velcdn.com/images/devjo/post/0039a77b-7838-48b3-b0b2-a24d2e1d7df2/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

병진은 공간의 한 점을 주어진 벡터 방향을 따라 유한한 거리로 이동시킵니다. ${}^A \mathbf{P}_1$은 벡터 ${}^A \mathbf{Q}$에 의해 변환됩니다. 결과 벡터 ${}^A \mathbf{P}_2$는 다음과 같이 계산됩니다.

$$
{}^A \mathbf{P}_2 = {}^A \mathbf{P}_1 + {}^A \mathbf{Q}
$$

이 병진 연산을 행렬 연산자로 작성하기 위해 다음 표기법을 사용합니다.

$$
{}^A \mathbf{P}_2 = \mathbf{D}_Q (q) {}^A \mathbf{P}_1
$$

$\mathbf{D}_Q$ 연산자는 특수하고 간단한 형식의 동차 변환으로 생각할 수 있습니다.

#### Rotational operators

회전 행렬의 또 다른 해석은 벡터 ${}^A \mathbf{P}_1$에 작용하여 회전 $\mathbf{R}$을 통해 새 벡터 ${}^A \mathbf{P}_2$로 변경하는 회전 연산자(rotational operator)로서의 해석입니다. 연산자로 표시될 때 회전 행렬은 일반적으로 아래 첨자나 위 첨자가 나타나지 않습니다.

$$
{}^A \mathbf{P}_2 = \mathbf{R} {}^A \mathbf{P}_1
$$

또한 어떤 축 주위로 회전하는지를 명확하게 나타내는 다른 표기법을 정의할 것입니다.

$$
{}^A \mathbf{P}_2 = \mathbf{R}_K (\theta) {}^A \mathbf{P}_1
$$

$\mathbf{R}_K (\theta)$는 $K$ 축 주위로 $\theta$ 도 회전을 수행하는 회전 연산자입니다.

#### Transformation operators

연산자 $\mathbf{T}$는 벡터 ${}^A \mathbf{P}_1$을 회전 및 병진시켜 새 벡터 ${}^A \mathbf{P}_2$를 계산합니다.

$$
{}^A \mathbf{P}_2 = \mathbf{T} {}^A \mathbf{P}_1
$$

변환 $\mathbf{T}$는 $\mathbf{R}$만큼 회전하고 $\mathbf{Q}$만큼 병진하는 변환과 기준 프레임에 상대적으로 $\mathbf{R}$만큼 회전하고 $\mathbf{Q}$만큼 병진된 프레임을 설명하는 변환이 동일합니다.

#### X-Y-Z fixed angles

프레임 $\{B\}$의 자세를 설명하는 한 가지 방법은 다음과 같습니다. 알려진 기준 프레임 $\{A\}$와 일치하도록 프레임을 시작합니다. $\{B\}$를 먼저 $X_A$ 축에 대해 각도 $\gamma$만큼 회전하고, 다음으로 $Y_A$ 축에 대해 각도 $\beta$만큼 회전하며, 마지막으로 $Z_A$ 축에 대해 각도 $\alpha$만큼 회전합니다. 세 회전 각각은 고정된 기준 프레임 $\{A\}$의 축을 중심으로 발생합니다. 회전 행렬에 대한 도출은 다음과 같습니다.

$$
\begin{aligned} {}^A_B \mathbf{R}_{XYZ}(\gamma, \beta, \alpha) 
&= \mathbf{R}_Z(\alpha) \mathbf{R}_Y(\beta) \mathbf{R}_X(\gamma) \\ 
&= \begin{bmatrix} c\alpha & -s\alpha & 0 \\ s\alpha & c\alpha & 0 \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} c\beta & 0 & s\beta \\ 0 & 1 & 0 \\ -s\beta & 0 & c\beta \end{bmatrix} \begin{bmatrix} 1 & 0 & 0 \\ 0 & c\gamma & -s\gamma \\ 0 & s\gamma & c\gamma \end{bmatrix} \end{aligned}
$$

여기서 $c\alpha$는 $\cos \alpha$의 약어이고, $s\alpha$는 $\sin \alpha$의 약어입니다. 회전 행렬에서 동등한 X–Y–Z 고정 각도를 추출하는 역 문제(inverse problem)는 흥미롭습니다. 해는 초월 방정식 세트를 푸는 것에 달려 있습니다. 주어진 회전 행렬과 동일시하면 아홉 개의 방정식과 세 개의 미지수가 있습니다. 아홉 개의 방정식 중에는 여섯 개의 종속성이 있으므로, 본질적으로 세 개의 방정식과 세 개의 미지수를 가집니다.

$$
{}^A_B \mathbf{R}_{XYZ}(\gamma, \beta, \alpha)  = \begin{bmatrix} r_{11} & r_{12} & r_{13} \\ r_{21} & r_{22} & r_{23} \\ r_{31} & r_{32} & r_{33} \end{bmatrix}
$$

위 수식들에서 $r_{32}$와 $r_{33}$의 제곱합의 제곱근을 취함으로써 $\cos \beta$를 계산할 수 있음을 알 수 있습니다. 이를 사용하여 $r_{31}$의 아크탄젠트로 $\beta$를 풀 수 있습니다.

$$
\begin{aligned}
&\beta = \text{Atan2}(-r_{31}, \sqrt{r_{11}^2 + r_{21}^2}), \\
&\alpha = \text{Atan2}(\frac{r_{21}}{c\beta}, \frac{r_{11}}{c\beta}), \\
&\gamma = \text{Atan2}(\frac{r_{32}}{c\beta}, \frac{r_{33}}{c\beta})
\end{aligned}
$$

#### Z-Y-X Euler angles

프레임 $\{B\}$에 대한 또 다른 가능한 설명은 다음과 같습니다. 알려진 프레임 $\{A\}$와 일치하도록 프레임을 시작합니다. $\{B\}$를 먼저 $Z_B$ 축에 대해 각도 $\alpha$만큼 회전하고, 다음으로 $Y_{B'}$ 축에 대해 각도 $\beta$만큼 회전하며, 마지막으로 $X_{B''}$ 축에 대해 각도 $\gamma$만큼 회전합니다. 이 표현에서는 각 회전이 고정된 기준 $\{A\}$의 축이 아니라 움직이는 시스템 $\{B\}$의 축을 중심으로 수행됩니다. 이러한 세 회전 세트를 오일러 각도(Euler angles)라고 부릅니다.

중간 프레임 $\{B'\}$와 $\{B''\}$를 사용하여 ${}^A_B \mathbf{R}_{Z'Y'X'}(\alpha, \beta, \gamma)$에 대한 표현식을 제공할 수 있습니다.

$$
{}^A_B \mathbf{R} = {}^A_{B'} \mathbf{R} {}^{B'}_{B''} \mathbf{R} {}^{B''}_B \mathbf{R}
$$

결과는 고정 축에 대해 반대 순서로 취해진 동일한 세 회전에 대해 얻은 것과 정확히 동일합니다.

#### Z-Y-Z Euler angles

또 다른 가능한 설명은 다음과 같습니다. 알려진 프레임 $\{A\}$와 일치하도록 프레임을 시작합니다. $\{B\}$를 먼저 $Z_B$ 축에 대해 각도 $\alpha$만큼 회전하고, 다음으로 $Y_{B'}$ 축에 대해 각도 $\beta$만큼 회전하며, 마지막으로 $Z_{B''}$ 축에 대해 각도 $\gamma$만큼 회전합니다.

$$
{}^A_B \mathbf{R}_{Z'Y'Z'}(\alpha, \beta, \gamma) = \begin{bmatrix} c\alpha c\beta c\gamma - s\alpha s\gamma & -c\alpha c\beta s\gamma - s\alpha c\gamma & c\alpha s\beta \\ s\alpha c\beta c\gamma + c\alpha s\gamma & -s\alpha c\beta s\gamma + c\alpha c\gamma & s\alpha s\beta \\ -s\beta c\gamma & s\beta s\gamma & c\beta \end{bmatrix}
$$

$\sin \beta \ne 0$이면, 다음이 성립합니다.

$$
\begin{aligned}
&\beta = \text{Atan2}(\sqrt{r_{31}^2 + r_{32}^2}, r_{33}), \\
&\alpha = \text{Atan2}(\frac{r_{23}}{s\beta}, \frac{r_{13}}{s\beta}), \\
&\beta = \text{Atan2}(\frac{r_{32}}{s\beta}, -\frac{r_{31}}{s\beta})
\end{aligned}
$$

두 번째 해가 존재하지만, $\sqrt{r_{13}^2 + r_{23}^2}$ 공식에서 양의 제곱근을 사용하여 항상 $0.0^\circ < \beta < 180.0^\circ$인 단일 해를 계산합니다. 만약 $\beta = 0.0^\circ$ 또는 $180.0^\circ$이면 해는 퇴화됩니다.

---

### 참고 자료

[원본 경로 #1](https://www.changjiangcai.com/files/text-books/Introduction-to-Robotics-3rd-edition.pdf?utm_source=chatgpt.com)


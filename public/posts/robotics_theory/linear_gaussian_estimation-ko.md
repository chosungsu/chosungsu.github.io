---
title: 'Linear Gaussian Estimation'
date: '2024-10-02'
tags: ['Robotics', 'lecture']
---

### Batch Discrete-Time Estimation

다음의 운동(motion) 및 관측(observation) 모델을 정의합니다.

$$
\begin{aligned}
&\mathbf{x}_k = A_{k-1} \mathbf{x}_{k-1} + \mathbf{v}_k + \mathbf{w}_k, \\
&\mathbf{y}_k = C_k \mathbf{x}_k + \mathbf{n}_k
\end{aligned}
$$

여기서 $k$는 이산 시간 인덱스이고 입력 $\mathbf{v}_k$를 제외하고 나머지는 랜덤 변수입니다. 상태 추정 문제는 시스템의 참 상태 $\mathbf{x}_k$에 대한 추정치 $\hat{\mathbf{x}}_k$를 하나 이상의 시간 단계 $k$에서 구하는 문제이며, 초기 상태 $\check{\mathbf{x}}_0$, 일련의 측정값 $\mathbf{y}_{0:K, \text{meas}}$, 일련의 입력 $\mathbf{v}_{1:K}$에 대한 지식과 시스템의 운동 및 관측 모델에 대한 지식을 바탕으로 합니다.

#### Maximum A Posteriori

배치 추정에서 목표는 다음 $\text{MAP}$ 문제를 해결하는 것입니다.

$$
\hat{\mathbf{x}} = \arg \max_{\mathbf{x}} p(\mathbf{x}|\mathbf{v}, \mathbf{y})
$$

베이즈 정리를 사용하여 $\text{MAP}$ 추정치를 다음과 같이 다시 작성하는 것으로 시작합니다.

$$
\arg \max_{\mathbf{x}} \frac{p(\mathbf{y}|\mathbf{x}, \mathbf{v}) p(\mathbf{x}|\mathbf{v})}{p(\mathbf{y}|\mathbf{v})} = \arg \max_{\mathbf{x}} p(\mathbf{y}|\mathbf{x}) p(\mathbf{x}|\mathbf{v})
$$

여기서 분모는 $\mathbf{x}$에 의존하지 않으므로 생략합니다. 또한 관측 모델에 따라 $\mathbf{x}$가 알려지면 $\mathbf{v}$가 $\mathbf{y}$에 영향을 미치지 않으므로 $p(\mathbf{y}|\mathbf{x}, \mathbf{v})$에서 $\mathbf{v}$를 생략합니다. 모든 노이즈 변수 $\mathbf{w}_k$와 $\mathbf{n}_k$가 무상관이라는 것이 중요한 가정이며 $p(\mathbf{y}|\mathbf{x}) = \prod_{k=0}^K p(\mathbf{y}_k | \mathbf{x}_k)$와 같이 분해할 수 있습니다.

제곱 마할라노비스 거리에 대한 목적 함수를 $J(\mathbf{x}) = \sum_{k=0}^K (J_{\mathbf{v}, k}(\mathbf{x}) + J_{\mathbf{y}, k}(\mathbf{x}))$라고 정의하고 $\mathbf{x}$에 대해 정확히 이차 함수가 되는 $p(\mathbf{z}|\mathbf{x})$에 대해서는 

$$
p(\mathbf{z}|\mathbf{x}) = \eta \exp \left( - \frac{1}{2} (\mathbf{z} - H \mathbf{x})^T W^{-1} (\mathbf{z} - H \mathbf{x}) \right)
$$

다음과 같이 표현할 수 있습니다.

$J(\mathbf{x})$는 정확히 포물면(paraboloid)이므로 closed form으로 최소값을 찾을 수 있는데 $\mathbf{x}$에 대한 편미분을 0으로 설정하면 됩니다.

$$
\left. \frac{\partial J(\mathbf{x})}{\partial \mathbf{x}^T} \right|_{\hat{\mathbf{x}}} = -H^T W^{-1} (\mathbf{z} - H \hat{\mathbf{x}}) = \mathbf{0}
$$

---

### Recursive Discrete-Time Smoothing

배치 해법은 설정하기 비교적 쉽고 최소 제곱 관점에서 이해하기 쉽다는 점에서 매력적입니다. 그러나 결과로 나오는 선형 방정식 시스템을 무차별 대입 방식으로 풀이하는 것은 대부분의 상황에서 그다지 효율적이지 않을 것입니다. 다행히도, 왼쪽 항의 역공분산 행렬($H^T W^{-1} H$)이 희소(sparse)합니다.

배치 방정식을 효율적으로 풀이하는 한 가지 방법은 희소 숄레스키 분해를 수행한 후 순방향 및 역방향 패스를 하는 것입니다. $H^T W^{-1} H$를 다음과 같이 효율적으로 인수분해할 수 있다는 것이 밝혀졌습니다.

$$
H^T W^{-1} H = L L^T
$$

여기서 $L$은 숄레스키 인수(Cholesky factor)라고 불리는 블록-하삼각 행렬(block-lower-triangular matrix)입니다.

#### Cholesky Smoother

$L$의 비제로 서브 블록을 다음과 같이 정의하는 것부터 시작하겠습니다.

$$
L = \begin{pmatrix} L_0 & & & & \\ L_{1,0} & L_1 & & & \\ & L_{2,1} & L_2 & & \\ & & \ddots & \ddots & \\ & & & L_{K,K-1} & L_K \end{pmatrix}
$$

다음으로 $\mathbf{d}$에 대해 $L\mathbf{d} = H^T W^{-1} \mathbf{z}$를 풉니다. 숄레스키 접근 방식의 마지막 단계는 $\hat{\mathbf{x}}$에 대해 $L^T \hat{\mathbf{x}} = \mathbf{d}$를 푸는 것입니다.

#### Rauch-Tung-Striebel Smoother

숄레스키 스무더는 편리한 구현이며 배치 해법에서 시작할 때 이해하기 쉽지만, 스무딩 방정식의 정식 형식(canonical form)을 나타내지는 않습니다.

순방향 패스의 경우 

$$
\begin{aligned}
&I_k \\
&= Q_k^{-1} \\
&- Q_k^{-1} A_{k-1} \left( I_{k-1} + A_{k-1}^T Q_k^{-1} A_{k-1} \right)^{-1} A_{k-1}^T Q_k^{-1} \\
&+ C_k^T R_k^{-1} C_k
\end{aligned}
$$

$\hat{P}_{k,f} = I_k^{-1}$로 놓으면, 이것은 두 단계로 작성될 수 있습니다.

$$
\begin{aligned} 
\check{P}_{k,f} &= A_{k-1} \hat{P}_{k-1,f} A_{k-1}^T + Q_k, \\ \hat{P}_{k,f}^{-1} &= \check{P}_{k,f}^{-1} + C_k^T R_k^{-1} C_k 
\end{aligned}
$$

여기서 $\check{P}_{k,f}$는 예측된(predicted) 공분산, $\hat{P}_{k,f}$는 수정된(corrected) 공분산을 나타냅니다. 이 양들이 순방향 패스(즉, 필터)에서 온 것임을 명시하기 위해 아래 첨자 $(\cdot)_f$를 사용합니다. 두 번째 식은 정보(역공분산) 형식으로 쓰여 있으며, 이를 정식(canonical) 칼만 필터 형태로 옮기기 위해 칼만 이득 행렬 $K_k$를 다음과 같이 정의합니다.

$$
K_k = \hat{P}_{k,f} C_k^T R_k^{-1}
$$

$K_k$는 쉐르만–모리슨–우드버리(SMW) 항등식을 이용해 다음과 같이도 쓸 수 있습니다.

$$
\begin{aligned}
&K_k \\
&= \left( \check{P}_{k,f}^{-1} + C_k^T R_k^{-1} C_k \right)^{-1} C_k^T R_k^{-1} \\
&= \check{P}_{k,f} C_k^T \left( C_k \check{P}_{k,f} C_k^T + R_k \right)^{-1}
\end{aligned}
$$

같은 아이디어를 공분산 업데이트 식에 적용하면

$$
\begin{aligned}
&\check{P}_{k,f}^{-1} \\ 
&= \hat{P}_{k,f}^{-1} - C_k^T R_k^{-1} C_k \\
&= \hat{P}_{k,f}^{-1} \bigl(\mathbf{1} - \hat{P}_{k,f} C_k^T R_k^{-1} C_k \bigr) \\
&= \hat{P}_{k,f}^{-1} (\mathbf{1} - K_k C_k)
\end{aligned}
$$

이 되고, 이를 $\hat{P}_{k,f}$에 대해 재배열하면 잘 알려진 공분산 수정(covariance correction) 공식이 나옵니다.

$$
\hat{P}_{k,f} = (\mathbf{1} - K_k C_k)\,\check{P}_{k,f}
$$

---

#### 칼만 필터의 최적성

칼만 필터는 상태 추정 오차 $ê_k = x̂_k - x_k$의 공분산 행렬 $\text{E}[ê_k ê^T_k]$의 trace를 최소화하는 이득 행렬 $K_k$를 선택하여 유도할 수 있습니다. 선형 시스템과 가우시안 잡음 조건 하에서, 칼만 필터는 가능한 모든 선형 비편향 추정기 중에서 가장 작은 오차 분산을 가지는 최적의 추정기입니다. 이는 크라메르-라오 하한(Cramér-Rao Lower Bound)에서 작동함을 의미합니다.

---

### 참고 자료

[원본 경로 #1](https://mingkangxiong.github.io/assets/books/State_Estimation_for_Robotic_2018.pdf?utm_source=chatgpt.com)




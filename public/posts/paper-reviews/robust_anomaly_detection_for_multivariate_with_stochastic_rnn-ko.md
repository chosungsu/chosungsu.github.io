---
title: 'ROBUST ANOMALY DETECTION FOR MULTIVARIATE TIME SERIES THROUGH STOCHASTIC RECURRENT NEURAL NETWORK'
date: '2022-09-23'
tags: ['anomaly detection', 'paper review']
---

### Abstract

서버 기계, 우주선, 엔진 등과 같은 산업 장치(엔티티, entities)는 일반적으로 다변량 시계열(multivariate time series)로 모니터링되며, 이들의 이상 탐지는 엔티티의 서비스 품질 관리에 매우 중요합니다. 그러나 다변량 시계열의 복잡한 시간적 의존성(temporal dependence)과 확률성(stochasticity) 때문에, 이들의 이상 탐지는 여전히 큰 과제로 남아 있습니다.

본 논문은 다양한 장치에 대해 강력하게 잘 작동하는, 다변량 시계열 이상 탐지를 위한 확률적 순환 신경망(stochastic recurrent neural network)인 OmniAnomaly를 제안합니다.

이 모델의 핵심 아이디어는 확률 변수 연결(stochastic variable connection)과 평면 정규화 흐름(planar normalizing flow)과 같은 핵심 기술을 사용하여 다변량 시계열의 견고한 표현(robust representations)을 학습함으로써 정상 패턴(normal patterns)을 포착하고, 이 표현을 통해 입력 데이터를 재구성하며, 재구성 확률(reconstruction probabilities)을 사용하여 이상점을 결정하는 것입니다.

더 나아가, 탐지된 엔티티 이상에 대해 OmniAnomaly는 구성 요소인 단변량 시계열(univariate time series)의 재구성 확률을 기반으로 해석(interpretations)을 제공할 수 있습니다.

OmniAnomaly는 F1-Score 0.86을 달성했으며, 이는 가장 성능이 좋은 기준선 방법(baseline method)보다 0.09 높은 수치로, 상당히 우수한 성능을 보여줍니다. OmniAnomaly에 대한 해석 정확도는 최대 0.89에 이릅니다.

---

### Introduction

일반적으로, 단변량 시계열을 사용하는 지표 수준(metric-level)에서 이상을 탐지하는 것보다 다변량 시계열을 사용하여 엔티티 수준(entity-level)에서 직접 엔티티 이상을 탐지하는 것이 여러 가지 이유로 선호됩니다.

실제 문제: 현장 운영 엔지니어는 각 구성 지표보다는 엔티티의 전반적인 상태에 더 관심을 가집니다.

노동 집약성: 지표 수가 많기 때문에, 각 지표에 대한 개별 이상 탐지 모델을 훈련하고 유지하는 것은 노동 집약적입니다.

복잡한 규칙: 엔티티에서 발생하는 사고는 일반적으로 여러 지표에서 이상을 유발합니다. 지표 수준에서 이상을 탐지할 경우, 엔티티의 이상 여부를 결정하기 위해 모든 지표의 이상 결과를 처리하는 규칙을 정의해야 하는데, 이는 광범위한 도메인 지식을 필요로 하며 어렵습니다.

정보 이점: 직관적으로, 한 단변량 시계열의 예상값을 모델링하는 것은 동일 엔티티의 다변량 시계열에 있는 더 많은 정보로부터 이점을 얻을 수 있습니다.

요약하면, 지표 수준보다 엔티티 수준에서 이상을 탐지하는 것이 더 직관적이고 효과적이며 효율적입니다. 따라서 본 논문에서는 각 모니터링되는 엔티티의 다변량 시계열에 대한 전반적인 이상 탐지에 초점을 맞춥니다.

음성 시퀀스의 확률성이 결정론적 변수보다 적절하게 추정된 확률 분포를 가진 확률 변수에 의해 더 정확하게 포착될 수 있음을 보여주었습니다. 온라인 쇼핑 웹사이트의 단변량 시계열이 복잡한 시간적 관계를 나타낼 수 있음을 보여줍니다. 그러므로 이상적으로 우리의 연구는 시간적 의존성 모델링을 포함하는 확률적 접근 방식을 취해야 합니다. 그러나 다변량 시계열 이상 탐지에 대한 풍부한 문헌에도 불구하고 이전 연구들은 시계열 모델링에 결정론적 접근 방식을 취하거나, 확률적 접근 방식을 취하지만 시계열 관측값의 시간적 의존성을 무시합니다.

본 논문의 핵심 아이디어는 시간적 의존성과 확률성을 모두 고려하여 다변량 시계열의 정상 패턴을 포착하기 위한 견고한 잠재 표현(robust latent representations)을 학습하는 것입니다. 관측값이 정상 패턴과 더 많이 다를수록, 이상일 가능성이 더 높습니다.

---

### Related Work

#### 1. 결정론적 모델

우주선 이상을 탐지하기 위해 LSTM을 다변량 시계열 예측에 적용하고 예측 오차를 사용하여 이상을 결정합니다. seq2seq 모델과 유사하게, "정상" 시계열 행동을 재구성하는 것을 목표로 하는 LSTM 기반의 인코더-디코더(Encoder-Decoder)를 제안하고, 재구성 오차를 다중 센서 이상 탐지에 사용합니다. LSTM은 시계열의 시간적 의존성을 다룰 수 있지만, 확률 변수가 없는 결정론적입니다.

#### 2. 확률 기반 모델

Deep Autoencoder (AE)와 Gaussian Mixture Model (GMM)을 동시에 결합한 모델 DAGMM을 제안합니다. AE를 사용하여 입력 관측값의 차원을 축소하여 잠재 표현(latent representations)을 얻고, GMM을 사용하여 이 표현들의 밀도를 추정합니다.

그러나 이 방법은 다변량 시계열이 아닌 다변량 변수(multivariate variables)를 위해 설계되었으며, 시계열의 내재된 시간적 의존성을 무시합니다. 이전 연구에 따르면, 일반적으로 확률 변수는 시계열의 확률 분포를 포착할 수 있기 때문에 RNN의 성능을 향상시킬 수 있습니다.

VAE의 피드-포워드 네트워크를 LSTM로 대체하여 VAE와 LSTM을 단순히 결합하지만, 확률 변수의 의존성을 무시합니다.

---

### Method

#### 1. Network Architecture

<img src="https://velog.velcdn.com/images/devjo/post/d059c5f6-699a-4fae-b113-e9d9b56ba727/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

OmniAnomaly의 기본 아이디어는 다음과 같습니다.

GRU를 사용하여 $x$-공간에서 다변량 관측값 간의 복잡한 시간적 의존성을 포착합니다. 표현 학습에 널리 사용되는 변분 알고리즘인 VAE를 적용하여 관측값(입력 관측값)을 확률적 변수($z$-공간)로 매핑합니다. 음성 재구성에서 영감을 받아, 잠재 공간에서 확률 변수 간의 시간적 의존성을 명시적으로 모델링하기 위해 확률 변수 연결(stochastic variable connection) 기술을 제안합니다. 이는 선형 가우시안 상태 공간 모델 SSM 연결과 확률 변수 및 GRU 은닉 변수의 연결(concatenation)로 이루어집니다.

qnet의 확률 변수가 입력 데이터의 복잡한 분포를 포착하도록 돕기 위해, 우리는 잠재 확률 공간에서 비가우시안 사후 분포(non-Gaussian posterior distributions)를 학습하기 위해 일련의 가역 매핑을 사용하는 평면 정규화 흐름 planar NF을 채택합니다.

#### 2. qnet

qnet의 세부 사항은 그림에 나와 있습니다. 시점 $t$에서, 입력 관측값 $x_t$와 $t-1$ 시점의 GRU 은닉 변수 $e_{t-1}$이 GRU 셀로 전송되어 은닉 변수 $e_t$를 생성합니다. 이 결정론적 $e_t$는 OmniAnomaly가 $x_t$와 이전 $x$-공간 관측값 간의 장기적인 복잡한 시간적 정보를 포착하는 데 중요합니다.

그런 다음, $e_t$는 $z_{t-1}$과 연결된 후 밀집 레이어(dense layer)로 들어가 확률 변수 $z_t$에 대한 평균 $\mu_{z_t}$와 표준 편차 $\sigma_{z_t}$를 생성합니다. 그 결과, $z$-공간 변수들은 이제 시간적으로 의존적입니다. qnet은 다음과 같이 공식화될 수 있습니다.

$$e_t = (1 - c^e_t) \circ \tanh(w^e x_t + u^e (r^e_t \circ e_{t-1}) + b^e) + c^e_t \circ e_{t-1} \\
\mu_{z_t} = w^{\mu z} h_{\phi}([z_{t-1}, e_t]) + b^{\mu z} \\
\sigma_{z_t} = \text{softplus}(w^{\sigma z} h_{\phi}([z_{t-1}, e_t]) + b^{\sigma z}) + \epsilon_{\sigma z}
$$

$r^e_t = \text{sigmoid}(w^r_e x_t + u^r_e e_{t-1} + b^r_e)$는 새로운 입력을 이전 메모리와 결합하는 방법을 결정하는 리셋 게이트(reset gate)입니다. $c^e_t = \text{sigmoid}(w^c_e x_t + u^c_e e_{t-1} + b^c_e)$는 이전 메모리를 얼마나 유지할지 결정하는 업데이트 게이트(update gate)입니다. $[z_{t-1}, e_t]$는 $z_{t-1}$과 $e_t$의 연결(concatenation)입니다. $h_{\phi}$는 ReLU 활성화 함수가 있는 밀집 레이어를 나타냅니다. $\mu_{z_t}$는 선형 레이어에서 파생되며, $\sigma_{z_t}$는 수치적 오버플로우를 방지하기 위한 작은 $\epsilon$을 가진 soft-plus 활성화 함수에 의해 생성됩니다. $u^*$-s, $w^*$-s, $b^*$-s는 해당 레이어의 매개변수입니다.

qnet의 출력 $z'_t$는 대각 가우시안(diagonal Gaussian)이며 $\mathcal{N}(\mu_{z_t}, \sigma^2_{z_t} I)$에서 샘플링됩니다. $q_{\phi}(z_t | x_t)$의 비가우시안 사후 분포를 학습하기 위해 평면 NF를 사용하여 $z_t$에 근사합니다. $z_t$는 $z'_t$를 평면 매핑인 $K$개의 변환 $f^k$의 체인을 통과시켜 얻어집니다.

#### 3. pnet

pnet은 qnet과 유사한 구조를 사용하여 $z_t$로 $x_t$를 재구성하려고 시도합니다. 우리는 선형 가우시안 SSM을 활용하여 qnet의 $z$-공간 변수들을 "연결"하고 시간적으로 의존하게 만듭니다. $z_t = \mathcal{O}_{\theta}(T_{\theta} z_{t-1} + v_t) + \epsilon_t$, 여기서 $T_{\theta}$와 $\mathcal{O}_{\theta}$는 각각 전이(transition) 및 관측(observation) 행렬이며, $v_t$와 $\epsilon_t$는 전이 및 관측 노이즈입니다.

시점 $t$에서, $z_t$는 $t-1$ 시점의 변수 $d_{t-1}$과 함께 GRU 셀을 통과하여 결정론적 변수 $d_t$를 생성합니다. 그런 다음 $d_t$는 밀집 레이어를 통해 더 처리되어 변수 $x'_t$ ($x_t$의 재구성)의 평균 $\mu_{x_t}$와 표준 편차 $\sigma_{x_t}$를 생성합니다. qnet과 유사하게, pnet은 다음과 같이 공식화될 수 있습니다.

$$
d_t = (1 - c^d_t) \circ \tanh(w^d z_t + u^d (r^d_t \circ d_{t-1}) + b^d) + c^d_t \circ d_{t-1} \\
\mu_{x_t} = w^{\mu x} h_{\theta}(d_t) + b^{\mu x} \\
\sigma_{x_t} = \text{softplus}(w^{\sigma x} h_{\theta}(d_t) + b^{\sigma x}) + \epsilon_{\sigma x}
$$

여기서 $r^d_t = \text{sigmoid}(w^r_d z_t + u^r_d d_{t-1} + b^r_d)$와 $c^d_t = \text{sigmoid}(w^c_d z_t + u^c_d d_{t-1} + b^c_d)$는 각각 리셋 게이트와 업데이트 게이트입니다. 재구성된 데이터 $x'_t$는 $\mathcal{N}(\mu_{x_t}, \sigma^2_{x_t} I)$에서 샘플링되며 $z_t$로부터 생성됩니다. 시점 $t$에 이상이 있다면, $x'_t$는 원본 데이터 $x_t$와 크게 다를 수 있습니다. 따라서 $x_t$의 재구성 확률을 기반으로 이상을 탐지할 수 있습니다.

#### 4. Anomaly Interpretation

따라서 우리는 개별 $x^i_t$ ($x_t$의 $i$번째 차원)에 대한 재구성 확률을 얻어야 합니다. 그러나 OmniAnomaly에서는 재구성 확률이 $M$차원 $x_t$에 대해 계산됩니다. 

$p_{\theta} (x_t | z_{t-T:t}) \sim \mathcal{N}(\mu_{x_t}, \sigma^2_{x_t} I)$이므로, $p_{\theta} (x_t | z_{t-T:t}) = \prod_{i=1}^{M} p_{\theta} (x^i_t | z_{t-T:t})$입니다. 따라서 $x_t$의 조건부 확률은 다음과 같이 인수분해될 수 있습니다.

$$
\log(p_{\theta} (x_t | z_{t-T:t})) = \sum_{i=1}^{M} \log(p_{\theta} (x^i_t | z_{t-T:t}))
$$

$S_t = \sum_{i=1}^{M} S^i_t$이며, $S^i_t = \log(p_{\theta} (x^i_t | z_{t-T:t}))$는 $x^i_t$의 이상 점수입니다. $S^i_t$는 다변량 시계열 $x_{t-T:t-1}$의 풍부한 정보로부터 이점을 얻으므로, 그 해석력은 $x^i_{t-T:t-1}$만을 활용하여 얻은 이상 점수(단변량 시계열에서와 같이)보다 더 높습니다.

탐지된 이상 $x_t$에 대해, 우리는 $x_t$의 각 차원의 기여도(재구성 확률)를 추정하여 이를 해석합니다. $S^i_t$ ($1 \le i \le M$)를 오름차순으로 정렬하여 리스트 $AS_t$를 형성합니다. $x^i_t$의 경우, $AS_t$에서 순위가 높을수록 $S^i_t$가 더 작고, $x^i_t$가 $x_t$에 대한 기여도가 더 큽니다.

---

### Conclusion

엔티티 수준(Entity-level) 이상 탐지는 운영 엔지니어가 장치의 비정상적인 행동을 시의적절하게 발견하고 문제 해결하는 데 크게 도움을 줄 수 있습니다.

본 논문에서 우리는 다양한 장치에 대해 견고하게 잘 작동하는, 다변량 시계열 이상 탐지를 위한 새로운 확률적 순환 신경망인 OmniAnomaly를 제안합니다. 우리는 확률 변수 연결(stochastic variable connection)과 같은 핵심 기술들이 다른 시계열 모델링 작업에도 적용 가능하다고 믿습니다.

더 나아가, OmniAnomaly는 재구성 확률을 기반으로 탐지된 엔티티 이상을 해석(interpret)하는 직관적이고 효과적인 방법을 제공합니다.

광범위한 실험을 통해, OmniAnomaly는 세 가지 대규모 데이터셋에서 최신 기술(state-of-the-art) 접근 방식들을 능가합니다. 각 데이터셋에서 OmniAnomaly가 보여준 뛰어난 성능은 이 모델이 견고한 모델이며 서버 기계 및 우주선과 같은 다양한 장치에 적용될 수 있음을 입증합니다.

---

### 참고 자료

[원본 경로 #1](https://netman.aiops.org/wp-content/uploads/2019/08/OmniAnomaly_camera-ready.pdf)

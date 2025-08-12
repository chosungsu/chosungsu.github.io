---
title: 'Unsupervised Anomaly Detection for Time Series Data of
Spacecraft Using Multi-Task Learning'
date: '2022-10-10'
tags: ['time-series', 'paper review']
---

### Abstract

궤도상의 우주선 안전을 보장하기 위해 궤도 내 이상 탐지(in-orbit anomaly detection)는 매우 중요하지만, 데이터의 복잡한 시공간적 상관관계(spatial-temporal correlation)와 이상(anomaly)의 희소성(sparsity)은 상당한 어려움을 야기합니다.

본 연구는 데이터의 시공간적 상관관계를 포착하여 일반화된 정상 패턴을 학습함으로써 이상 탐지를 용이하게 하는 새로운 다중 작업 학습(multi-task learning) 기반의 시계열 이상 탐지(MTAD) 방법을 제안합니다. 공동 학습(joint learning)을 통해 특징을 추출하기 위해 네 가지 프록시 작업(proxy tasks)을 구현했습니다. 추출된 특징으로부터 고립 포레스트(isolation forest) 알고리즘이 이상을 탐지합니다.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/f6a7c136-f0e5-485a-b502-19a395ad72db/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

최근 몇 년간 궤도에 있는 우주선의 수가 증가하면서 가끔 발생하는 우주선 고장의 수도 늘고 있습니다. 우주선은 복잡한 궤도 내 시스템을 구성하며, 단일 구성 요소나 하위 시스템의 고장은 특히 제때 감지되지 않으면 회복 불가능한 손상을 야기할 수 있습니다. 고장 모니터링을 위한 합리적인 접근법은 다수의 우주선 시스템 구성 요소가 지속적으로 생성하는 방대한 양의 원격 측정 데이터(telemetry data)를 사용하여 이상 탐지(anomaly detection)를 수행하는 것입니다. 이 데이터는 다차원 시계열을 구성합니다.

우주선 이상 탐지 방법으로는 범위 초과(out-of-limits), 전문가 시스템 기반(expert system-based), 데이터 기반(data-driven) 방법이 있으며 복잡한 우주선 구조와 수만 개의 매개변수 및 이들 매개변수 사이의 시공간적 상관관계(spatial-temporal correlation)는 위에서 언급한 이상 탐지 방법에 여러 가지 어려움을 초래합니다.

본 연구는 우주선으로부터의 고차원 및 시계열 데이터를 사용하여 여러 다른 프록시 작업에 대해 모델을 공동으로 훈련하는 다중 작업 학습(multi-task learning) 기반의 시계열 이상 탐지 방법(MTAD)을 제안합니다.

---

### Related work

#### 1. Anomaly Detection

기존의 우주선 자율 이상 탐지 방법은 세 가지 범주(모델 기반(model-based), 신호 처리 기반(signal processing-based), 지식 기반(knowledge-based) 방법)로 분류할 수 있습니다.

랜덤 포레스트(random forest) 알고리즘은 베어링 결함 신호의 주파수를 기반으로 우주선 롤링 베어링의 이상 탐지에 활용되었습니다. 모델 기반 고장 탐지, 격리 및 식별(fault detection, isolation, and identification) 체계가 제안되었는데, 이는 비선형 칼만 필터(unscented Kalman filters)를 사용하여 제어 모멘트 자이로의 고장을 탐지 및 격리함으로써 위성 자세 제어 하위 시스템을 용이하게 합니다.

심층 학습 방법은 데이터 내 숨겨진 패턴을 찾아낼 수 있으며, 전문가 지식에 의존하지 않습니다. 우주선의 맥락에서, 순환 신경망(RNN) 기반 방법이 위성 자세 제어 시스템의 액추에이터 고장을 탐지하기 위해 개발되었습니다. LSTM 기반 방법은 일반적인 예측 기반 접근법을 구성하며, 이러한 방법의 이상 탐지 효과는 Soil Moisture Active Passive 위성과 화성 과학 연구소 로버인 큐리오시티로부터 전문가가 레이블링한 원격 측정 이상 데이터를 사용하여 입증되었습니다.

#### 2. Multi-task learning

본 연구에서 적용된 다중 작업 학습(Multi-task learning)은 공유 표현(shared representation)에 기반한 기계 학습 방법으로, 여러 관련 작업을 결합하여 모델의 일반화 능력(generalization ability)을 향상시키고, 이를 통해 단일 작업보다 우수한 전반적인 성능을 달성합니다. 단일 작업 학습과 달리, 다중 작업 학습은 여러 관련 작업을 동시에 병렬로 학습하고 경사를 역전파(backpropagating)하는 데 사용합니다. 다중 작업 학습은 전이 학습(transfer learning)의 한 유형으로, 사전 지식을 사용하여 관련 있거나 더 복잡한 작업의 학습을 돕습니다. 이는 우주선 이상 탐지 분야가 직면하고 있는 데이터 희소성 문제(data sparsity problem)를 완화하는 데 도움이 됩니다.

#### 3. Deep learning models

RNN(순환 신경망)은 단기 기억 능력을 가진 신경망 유형입니다. 뉴런은 다른 뉴런으로부터 정보를 받아들일 뿐만 아니라, 자체 정보를 사용하여 루프를 포함하는 네트워크 구조를 형성할 수 있습니다. 이러한 자기-피드백 뉴런을 사용하여 RNN은 임의 길이의 시계열 데이터를 처리할 수 있습니다. 그러나 입력 시퀀스가 비교적 길 때 RNN에서는 경사 폭발(gradient explosion) 및 경사 소멸(vanishing gradient) 문제가 발생합니다. 따라서 이 문제를 극복하기 위한 변형인 LSTM 네트워크가 등장했습니다. LSTM 네트워크에는 정보 전달 및 시간적 기억 경로를 제어하기 위해 게이트(gates)가 도입되었습니다.

TCN(Temporal convolutional network)은 시계열 데이터를 모델링하는 데 사용될 수 있는 합성곱 신경망(convolutional neural network) 기반의 네트워크입니다. TCN은 텍스트 및 비디오와 같은 시계열 데이터에 적용될 때 좋은 성능을 보이며, 훈련을 위한 메모리 소비가 적다는 장점이 있습니다. TCN은 합성곱 네트워크 외에 인과적 합성곱(causal convolution), 팽창 합성곱(dilated convolution), 잔여 네트워크(residual networks)를 통합합니다. 인과적 합성곱은 네트워크의 각 계층 사이에 인과 관계를 설정하며, 시계열 특성을 포함하는 데이터에 적합합니다. 팽창 합성곱은 네트워크 깊이를 줄이면서 수용장(receptive field)을 증가시키고, 잔여 네트워크 내부의 잔여 블록(residual block)은 스킵 연결(skip connections)을 사용하여 경사 소멸 문제를 완화합니다.

VAE(Variational Autoencoder)는 베이즈 변분 추론(Bayesian variational inference) 이론에 기반한 생성 모델입니다. 핵심 개념은 신경망을 사용하여 두 개의 복잡한 조건부 확률 밀도 함수를 모델링하고, 이를 통해 분포 $P(z)$로부터 잠재 변수(latent variable) $z$를 샘플링하고 $P_\theta(x|z)$를 통해 데이터를 생성하는 것입니다.

---

### Method

<img src="https://velog.velcdn.com/images/devjo/post/e94c8578-60cc-4954-be92-f52e8e527252/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

$X_t = \{x_1, x_2, \cdots, x_M\} \in R^M$은 시간 $t$에서의 $M$차원 데이터 샘플을 나타내고 $X$가 여러 단계에 걸쳐 획득한 데이터입니다. MTAD 방법의 전체 과정은 위 이미지에 나타나 있으며, 크게 훈련(training)과 추론(inference) 과정으로 나눌 수 있습니다. 먼저, 훈련 데이터는 표준화(standardized)되고 평균 $\mu_{train}$과 표준 편차 $\delta_{train}$이 얻어집니다. 이후, 슬라이딩 윈도우(sliding window)를 사용하여 최종 입력 데이터 $X$와 출력 $Y$를 얻습니다.

다중 작업 모델(MTADmt)은 아래에 설명된 네 가지 프록시 작업을 통해 우주선 데이터의 시공간적 패턴(spatial-temporal patterns)을 동시에 학습합니다.

1.작업 1은 LSTM 네트워크를 사용하여 예측을 위한 시계열 데이터의 시간적 의존성(temporal dependencies)을 모델링합니다. 입력은 $M×K$ 행렬이고, 출력은 다음 $P$ 단계에 대한 예측인 $o_{Task1} \in R^M$입니다. LSTM의 손실은 실제값과 예측값 차이로부터 결정된 MSE를 사용하여 도출됩니다.

2.작업 2는 시간적 합성곱 AE(temporal convolutional AE) 신경망을 사용하여 데이터의 공간적 패턴(spatial patterns)을 기반으로 잠재 표현을 생성하고 데이터를 재구성합니다. AE는 비지도 방식으로 데이터의 잠재 표현을 학습합니다. $M$차원의 데이터 샘플 $X^i \in R^M$에 대해 $k$차원으로 축소하며 차원 $i$의 압축표현이 $Z^i$입니다. 오차는 AE 네트워크의 재구성된 값과 실제 값 $X$의 차이로부터 도출되며 logcosh 함수를 사용하여 계산합니다.

3.작업 3은 LSTM VAE 신경망을 사용하여 잠재 표현을 생성하고 입력을 재구성하여 데이터의 공간적 패턴을 모델링합니다. VAE는 추론 및 생성 네트워크를 사용하여 조건부 확률 밀도 함수를 모델링합니다. 확률 인코더는 잠재 변수 분포를 모델링하고, 샘플링 과정에서 잠재 공간 변동성을 고려하므로 VAE는 AE보다 더 높은 표현 능력을 가집니다. 따라서 작업 2를 기반으로, 작업 3은 모델의 공간 의존성 포착 성능을 향상시키기 위해 VAE 기반 잠재 표현을 학습하고 데이터를 재구성하도록 설계되었습니다.

4.작업 4는 LSTM 네트워크를 사용하여 작업 2와 3에서 학습된 공동 잠재 표현(joint latent representation)으로부터 예측을 출력합니다. 여기서 $z_{input}$은 작업 4의 입력이며, $z_{input} = [z_{ae}, z_{vae}]$입니다.

다중 작업 모델(MTADmt)을 기반으로, X의 특징은 $Err(X) = [Err_1(X), Err_2(X), Err_3(X), Err_4(X)]$로 추출되며, 여기서 $Err_i(X)$는 입력 $X$에 대한 프록시 작업 $i$의 손실입니다. iForest(고립 포레스트) 기반의 오차 평가 및 이상 탐지 모델(MTADad)이 $Err(X)$로부터 이상 탐지를 수행하기 위해 훈련됩니다. 무작위 초평면이 데이터 공간을 두 개의 하위 종(subspecies)으로 반복적으로 자르고, 더 이상의 세분이 불가능할 때까지 계속됩니다. 따라서 각 리프 노드에 하나의 데이터 샘플만 있는 고립된 트리(isolated tree)가 형성됩니다.

---

### Conclusion

본 연구에서는 새로운 다중 작업 학습(multi-task learning) 기반의 비지도 이상 탐지(unsupervised anomaly detection) 기술인 MTAD(Multi-task learning-based Time series Anomaly Detection) 방법을 제안했습니다.

우주선으로부터 얻은 다차원 시계열 데이터의 시공간적 상관관계(spatial-temporal correlations)를 포착하여 이상 특징을 추출하고 그 특징들로부터 이상을 탐지하기 위해 iForest 기반 모델을 구현합니다.

향후 연구에서는 다양한 위성 하위 시스템의 데이터, 다른 이상 비율, 그리고 다양한 종류의 우주선 데이터와 같이 다른 특성을 가진 더 많은 실제 데이터셋에 대해 우리 모델을 평가할 것입니다. 또한, 여러 프록시 작업(proxy tasks)에 가중치를 부여하여 이러한 가중치 변화가 모델 성능에 미치는 영향을 조사할 것입니다. 전반적으로, 본 연구의 결과는 궤도 내 우주선 이상 탐지에 적용될 제안된 MTAD 기술의 유망한 잠재력을 보여줍니다.

---

### 참고 자료

[원본 경로 #1](https://www.mdpi.com/2076-3417/12/13/6296)

---
title: 'ANOMALY TRANSFORMER: TIME SERIES ANOMALY
DETECTION WITH ASSOCIATION DISCREPANCY'
date: '2022-09-16'
tags: ['anomaly detection', 'paper review']
---

### Abstract

시계열 데이터에서 이상점(anomaly points)을 비지도 학습 방식으로 탐지하는 것은 모델이 구별 가능한 기준을 도출해야 하는 도전적인 문제입니다.

이전의 방법들은 주로 점 단위 표현(pointwise representation)을 학습하거나 쌍 단위 연관성(pairwise association)을 학습함으로써 이 문제에 접근했지만, 이들 중 어느 것도 복잡한 동역학(intricate dynamics)을 추론하기에는 충분하지 않습니다.

최근 트랜스포머(Transformers)가 점 단위 표현과 쌍 단위 연관성을 통합적으로 모델링하는 데 큰 힘을 보여주었으며, 각 시점의 셀프-어텐션(self-attention) 가중치 분포가 전체 시계열과의 풍부한 연관성(association)을 구현할 수 있음을 발견했습니다.

이상점의 희소성(rarity) 때문에, 비정상적인 지점으로부터 전체 시계열로 비자명한(nontrivial) 연관성을 구축하는 것이 극도로 어렵다는 것입니다. 따라서 이상점의 연관성은 주로 인접한 시점에 집중될 것입니다. 이러한 인접 집중 편향(adjacent-concentration bias)은 정상점과 비정상점을 본질적으로 구별할 수 있는 연관성 기반 기준을 내포하고 있으며, 이를 연관성 불일치(Association Discrepancy)를 통해 강조합니다.

연관성 불일치를 계산하기 위한 새로운 Anomaly-Attention 메커니즘을 갖춘 Anomaly Transformer를 제안합니다. 정상-비정상 간의 구별 가능성을 증폭시키기 위해 미니맥스(minimax) 전략이 고안되었습니다.

---

### Introduction

현실 세계 시스템은 항상 연속적으로 작동하며, 산업 장비, 우주 탐사선 등과 같이 다중 센서를 통해 모니터링되는 일련의 연속적인 측정값을 생성할 수 있습니다. 대규모 시스템 모니터링 데이터에서 오작동을 발견하는 것은 시계열 데이터에서 비정상적인 시점(time points)을 탐지하는 것으로 귀결될 수 있으며, 이는 보안을 보장하고 재정적 손실을 방지하는 데 매우 중요합니다.

그러나 이상점(anomalies)은 일반적으로 드물고 방대한 정상점 속에 숨겨져 있어 데이터 레이블링을 어렵고 비용이 많이 들게 합니다. 따라서 우리는 비지도 학습(unsupervised setting) 환경에서의 시계열 이상 탐지에 초점을 맞춥니다. 비지도 시계열 이상 탐지는 실제로 매우 어렵습니다. 모델은 비지도 학습 작업을 통해 복잡한 시간적 동역학으로부터 유익한 표현(informative representations)을 학습해야 합니다. 동시에, 많은 정상 시점 중에서 희귀한 이상점을 탐지할 수 있는 구별 가능한 기준(distinguishable criterion)을 도출해야 합니다.

다양한 고전적인 이상 탐지 방법들은 많은 비지도 학습 패러다임을 제공해왔습니다. 예를 들어, 밀도 추정 기반 방법으로는 LOF(Local Outlier Factor) [Breunig et al. (2000)], 클러스터링 기반 방법으로는 OC-SVM(One-Class SVM) [Scholkopf et al. (2001)] 및 SVDD [Tax & Duin (2004)]가 있습니다. 이러한 고전적 방법들은 시간적 정보(temporal information)를 고려하지 않으며, 미지의 실제 시나리오에 일반화하기 어렵습니다.

본 논문에서는 비지도 학습 환경에서의 시계열 이상 탐지에 트랜스포머(Transformers) [Vaswani et al. (2017)]를 적용합니다. 트랜스포머는 자연어 처리 [Brown et al. (2020)], 머신 비전 [Liu et al. (2021)], 시계열 [Zhou et al. (2021)]을 포함한 다양한 영역에서 큰 발전을 이루었습니다. 이러한 성공은 전역적 표현(global representation)과 장거리 관계(long-range relation)를 통합적으로 모델링하는 뛰어난 능력 덕분입니다. 트랜스포머를 시계열에 적용함으로써, 각 시점의 시간적 연관성이 셀프-어텐션 맵(self-attention map)에서 얻어질 수 있다는 것을 발견했습니다. 이는 시간적 차원을 따라 모든 시점에 대한 연관성 가중치 분포로 나타납니다. 각 시점의 연관성 분포는 시간적 맥락에 대한 더 유익한 설명을 제공하며, 시계열의 주기나 추세와 같은 동적 패턴을 나타냅니다.

---

### Related Work

#### 1. 비지도 시계열 이상 탐지

이상점 결정 기준에 따라 패러다임은 크게 밀도 추정 기반(density-estimation), 클러스터링 기반(clustering-based), 재구성 기반(reconstruction-based), 그리고 자기회귀 기반(autoregression-based) 방법으로 분류될 수 있습니다.

$\Rightarrow$ 밀도 추정 기반 방법

고전적인 방법인 LOF (Local Outlier Factor) [Breunig et al. (2000)]는 각각 이상점 결정을 위해 국소 밀도(local density)와 국소 연결성(local connectivity)을 계산합니다.

DAGMM [Zong et al. (2018)]와 MPPCACD [Yairi et al. (2017)]는 가우시안 혼합 모델(Gaussian Mixture Model, GMM)을 통합하여 표현(representations)의 밀도를 추정합니다.

$\Rightarrow$ 클러스터링 기반 방법

이상 점수는 항상 클러스터 중심까지의 거리로 공식화됩니다.

SVDD [Tax & Duin (2004)]와 Deep SVDD [Ruff et al. (2018)]는 정상 데이터로부터 얻은 표현을 조밀한 클러스터로 모읍니다.

THOC [Shen et al. (2020)]는 계층적 클러스터링 메커니즘을 통해 중간 레이어의 다중 스케일 시간적 특징을 융합하고 다중 레이어 거리를 통해 이상점을 탐지합니다.

$\Rightarrow$ 재구성 기반 모델 (Reconstruction-based models)

재구성 오차(reconstruction error)를 통해 이상점을 탐지하려고 시도합니다.

Park et al. (2018)은 시간적 모델링을 위한 LSTM 백본과 재구성을 위한 VAE (Variational AutoEncoder)를 사용한 LSTM-VAE 모델을 제시했습니다.

Su et al. (2019)이 제안한 OmniAnomaly는 정규화 흐름(normalizing flow)을 통해 LSTM-VAE 모델을 확장하고 탐지를 위해 재구성 확률을 사용합니다.

#### 2. 시계열 분석을 위한 트랜스포머

시계열 분석의 경우, 셀프-어텐션 메커니즘의 이점을 활용하여 트랜스포머는 신뢰할 수 있는 장거리 시간적 의존성을 발견하는 데 사용됩니다 [Kitaev et al. (2020); Li et al. (2019b); Zhou et al. (2021); Wu et al. (2021)].

특히 시계열 이상 탐지에서, Chen et al. (2021)이 제안한 GTA는 그래프 구조를 사용하여 여러 IoT 센서 간의 관계를 학습하고, 트랜스포머를 시간적 모델링에, 재구성 기준을 이상 탐지에 사용합니다.

이전의 트랜스포머 사용법과 달리, Anomaly Transformer는 연관성 불일치라는 핵심 관찰을 기반으로 셀프-어텐션 메커니즘을 Anomaly-Attention으로 혁신합니다.

---

### Method

$d$개의 측정값을 연속적으로 모니터링하고 일정한 간격으로 관측값을 기록하는 시스템을 가정합니다. 관측된 시계열 $\mathbf{X}$는 ${x_1, x_2, \ldots, x_N}$의 시점 집합으로 표시되며, 여기서 $x_t \in \mathbb{R}^d$는 시점 $t$의 관측값을 나타냅니다. 비지도 시계열 이상 탐지 문제는 레이블 없이 $x_t$가 이상한지 아닌지를 결정하는 것입니다.

앞서 언급했듯이, 비지도 시계열 이상 탐지의 핵심을 유익한 표현 학습과 구별 가능한 기준 발견으로 강조합니다. Anomaly Transformer를 제안하여 더 유익한 연관성을 발견하고, 본질적으로 정상-비정상을 구별할 수 있는 연관성 불일치(Association Discrepancy)를 학습함으로써 이 문제를 해결합니다. 기술적으로, 우리는 Anomaly-Attention을 제안하여 사전 연관성(prior-association)과 계열 연관성(series-associations)을 구현하며, 여기에 더 구별 가능한 연관성 불일치를 얻기 위한 미니맥스 최적화 전략을 추가합니다. 이 아키텍처와 함께 설계되어, 우리는 학습된 연관성 불일치를 기반으로 한 연관성 기반 기준을 도출합니다.

#### 1. Anomaly Transformer

<img src="https://velog.velcdn.com/images/devjo/post/3546c3f3-176c-49d6-b3bb-6de943a8a620/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

이상 탐지를 위한 기존 트랜스포머 [Vaswani et al. (2017)]의 한계를 감안하여, 바닐라 아키텍처를 Anomaly-Attention 메커니즘을 갖춘 Anomaly Transformer로 혁신합니다.

Anomaly Transformer는 Anomaly-Attention 블록과 피드 포워드 레이어(feed-forward layers)를 교대로 쌓는 것이 특징입니다. 이 적층 구조는 깊은 다단계 특징(deep multi-level features)으로부터 근본적인 연관성을 학습하는 데 도움이 됩니다. 길이가 $N$이고 $L$개의 레이어를 포함하는 모델을 가정합니다. 입력 시계열은 $\mathbf{X} \in \mathbb{R}^{N \times d}$입니다. $l$번째 레이어의 전체 수식은 다음과 같이 공식화됩니다.

$$
\mathbf{Z}^l = \text{Layer-Norm}(\text{Anomaly-Attention}(\mathbf{X}^{l-1}) + \mathbf{X}^{l-1}) \\
\mathbf{X}^l = \text{Layer-Norm}(\text{Feed-Forward}(\mathbf{Z}^l) + \mathbf{Z}^l)
$$

#### 2. Anomaly-Attention

단일 분기 셀프-어텐션 메커니즘 [Vaswani et al. (2017)]은 사전 연관성과 계열 연관성을 동시에 모델링할 수 없다는 점에 주목하여, 두 분기 구조를 갖춘 Anomaly-Attention을 제안합니다.

사전 연관성을 위해, 학습 가능한 가우시안 커널(Gaussian kernel)을 채택하여 상대적 시간 거리에 대한 사전 연관성을 계산합니다. 가우시안 커널의 단봉성(unimodal property) 덕분에 이 설계는 구성적으로 인접한 범위에 더 많은 주의를 기울일 수 있습니다. 또한 가우시안 커널에 대해 학습 가능한 스케일 매개변수 $\sigma$를 사용하여, 사전 연관성이 다양한 시계열 패턴(예: 이상 세그먼트의 다른 길이)에 적응하도록 만듭니다.계열 연관성 분기는 원본 시계열로부터 연관성을 학습하는 것으로, 가장 효과적인 연관성을 적응적으로 찾을 수 있습니다.

이 두 가지 형태는 각 시점의 시간적 의존성을 유지하며, 이는 점 단위 표현보다 더 유익합니다. 또한 각각 인접 집중 사전(adjacent-concentration prior)과 학습된 실제 연관성을 반영하며, 그 불일치는 정상-비정상을 구별할 수 있어야 합니다. $l$번째 레이어의 Anomaly-Attention은 다음과 같습니다.

$$
\mathbf{Q}, \mathbf{K}, \mathbf{V}, \sigma = \mathbf{X}^{l-1}\mathbf{W}^l_Q, \mathbf{X}^{l-1}\mathbf{W}^l_K, \mathbf{X}^{l-1}\mathbf{W}^l_V, \mathbf{X}^{l-1}\mathbf{W}^l_{\sigma} \\
\mathbf{P}^l = \text{Rescale} \left[ \left\{ \frac{1}{\sqrt{2\pi}\sigma_i} \exp \left( -\frac{|j-i|^2}{2\sigma_i^2} \right) \right\}_{i,j \in \{1,\ldots,N\}} \right] \\
\mathbf{S}^l = \text{Softmax} \left( \frac{\mathbf{Q}\mathbf{K}^T}{\sqrt{d_{\text{model}}}} \right) \\
\mathbf{\tilde{Z}}^l = \mathbf{S}^l \mathbf{V}
$$

#### 3. Association Discrepancy

연관성 불일치를 사전 연관성과 계열 연관성 사이의 대칭화된 쿨백-라이블러 발산(symmetrized KL divergence)으로 공식화하며, 이는 이 두 분포 사이의 정보 이득을 나타냅니다 [Neal (2007)]. 다단계 특징(multi-level features)의 연관성을 결합하여 더 유익한 측정값을 만들기 위해 여러 레이어의 연관성 불일치를 평균합니다.

$$
\text{AssDis}(\mathbf{P}, \mathbf{S}; \mathbf{X}) = \left[ \frac{1}{L} \sum_{l=1}^{L} \left( \text{KL}(\mathbf{P}^l_{i,:} \Vert \mathbf{S}^l_{i,:}) + \text{KL}(\mathbf{S}^l_{i,:} \Vert \mathbf{P}^l_{i,:}) \right) \right]_{i=1, \ldots, N}
$$

#### 4. Minimax Strategy

<img src="https://velog.velcdn.com/images/devjo/post/a5c32c01-41cb-469f-9440-b9ca46198e0d/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

연관성 불일치를 직접적으로 최대화하는 것은 가우시안 커널의 스케일 매개변수를 극도로 감소시켜 [Neal (2007)] 사전 연관성을 무의미하게 만들 수 있다는 점에 주목합니다. 연관성 학습을 더 잘 제어하기 위해 미니맥스 전략을 제안합니다.

구체적으로, 최소화 단계(Minimize Phase)에서는 사전 연관성 $\mathbf{P}^l$이 원본 계열에서 학습된 계열 연관성 $\mathbf{S}^l$에 근사하도록 유도합니다. 이 과정은 사전 연관성이 다양한 시간적 패턴에 적응하도록 만들 것입니다.

최대화 단계(Maximize Phase)에서는 계열 연관성을 최적화하여 연관성 불일치를 확대합니다. 이 과정은 계열 연관성이 비인접 범위에 더 많은 주의를 기울이도록 강제합니다. 따라서 재구성 손실을 통합한 두 단계의 손실 함수는 다음과 같습니다.

$$
\text{최소화}: \mathcal{L}_{\text{Total}}(\mathbf{\hat{X}}, \mathbf{P}, \mathbf{S}_{\text{detach}}, -\lambda; \mathbf{X}) \\
\text{최대화}: \mathcal{L}_{\text{Total}}(\mathbf{\hat{X}}, \mathbf{P}_{\text{detach}}, \mathbf{S}, \lambda; \mathbf{X})
$$

여기서 $\lambda > 0$이고, $\text{detach}$는 연관성의 경사 하강(gradient backpropagation)을 중단하는 것을 의미합니다. 최소화 단계에서 $\mathbf{P}$가 $\mathbf{S}_{\text{detach}}$에 근사함에 따라, 최대화 단계는 계열 연관성에 더 강력한 제약을 가하여 시점이 비인접 영역에 더 많은 주의를 기울이도록 강제합니다. 재구성 손실 하에서, 이는 정상 시점보다 이상점에 대해 훨씬 더 어렵기 때문에, 연관성 불일치의 정상-비정상 구별 가능성을 증폭시킵니다.

---

### Conclusion

본 논문은 비지도 시계열 이상 탐지 문제를 연구합니다. 이전의 방법들과 달리, 트랜스포머(Transformers)를 통해 더 유익한 시점 연관성(time-point associations)을 학습합니다.

연관성 불일치(association discrepancy)라는 핵심 관찰을 기반으로, 연관성 불일치를 구현하기 위한 두 분기 구조를 가진 Anomaly-Attention을 포함하는 Anomaly Transformer를 제안합니다.

미니맥스 전략(minimax strategy)을 채택하여 정상 시점과 비정상 시점 간의 차이를 더욱 증폭시켰습니다. 연관성 불일치를 도입함으로써, 재구성 성능과 연관성 불일치가 협력하도록 만드는 연관성 기반 기준(association-based criterion)을 제안합니다.

Anomaly Transformer는 광범위한 경험적 연구에서 최신 기술(state-of-the-art) 결과를 달성합니다.

향후 연구에는 자기회귀(autoregression) 및 상태 공간 모델(state space models)에 대한 고전적 분석의 관점에서 Anomaly Transformer에 대한 이론적 연구가 포함됩니다.

---

### 참고 자료

[원본 경로 #1](https://arxiv.org/pdf/2110.02642)

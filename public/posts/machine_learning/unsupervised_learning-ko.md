---
title: 'Unsupervised learning'
date: '2022-08-02'
tags: ['Machine Learning', 'lecture']
---

### Unsupervised learning

비지도 학습은 데이터로부터 레이블 없이 패턴을 찾는 과정으로 지도 학습에 비해 주관성을 가지고 있습니다.

---

### Clustering

<img src="https://media.licdn.com/dms/image/v2/D4D12AQFLMjsqAoIMKQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1701022315764?e=2147483647&v=beta&t=uXrY1kHrWpu_3ol3bjWb0Z6SISmvcycSx1zNo_B74Qo" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

기본적으로 클러스터링은 데이터 포인트 간의 그룹화를 통해 문제를 해결합니다. 같은 클러스터 내에서는 높은 유사성을 가지면서 다른 클러스터 간에는 낮은 유사성을 갖도록 합니다.

가까운 이웃끼리는 샘플들 간에 pairwise similarity를 아래와 같이 진행합니다.

$$
L_1(A,B) = \sum_{i,j}|A_{i,j} - B_{i,j}|, \\
L_2(A,B) = \sqrt{\sum_{i,j} (A_{i,j} - B_{i,j})^2}
$$

위 $L_1$, $L_2$ 거리는 거리정보만 전달해줍니다. 이 거리정보를 통해 Hierarchical, Partitional 두 가지의 클러스터링 방법을 진행할 수 있습니다. 전자의 경우는 bottom-up으로 개별 요소(element)끼리 유사하다고 생각되면 하나씩 합쳐 나가는 방식입니다. 후자는 top-down으로 전체를 하나의 클러스터로 보고 하나씩 쪼개 나가는 방식입니다.

우선 bottom-up부터 자세히 보자면 처음에는 모두 singleton clusters이고 각 반복마다 distance threshold인 $\tau_i$를 만들고 단계가 진행될 수록 이 값은 커져야 더 멀리 있는 클러스터와 병합이 가능해질 것입니다. 레벨 1 이후에는 두 개의 요소 간의 거리가 아닌 두 개의 클러스터의 거리를 사용해야 하므로 대표값을 정할 필요가 있고 closest pair, farthest pair, average of all pairs, distance between in group averages 등의 옵션이 존재합니다. 예를 들어 closest pair를 선택하면 가까운 객체들 거리를 판단하므로 자칫하면 두 클러스터 사이 존재하는 클러스터가 있다면 서로 합쳐질 것입니다. 또 farthest pair를 선택하면 두 클러스터 간의 거리가 충분히 멀지 않아서 합쳐지지 않는 경우도 있을 것입니다.

#### K-Means

$k$개의 랜덤 포인트를 클러스터의 중앙으로 선택합니다. 이후에는 각 데이터 포인트들이 자신과 가장 가까운 클러스터 중앙에 할당되도록 하고 할당된 데이터 포인트들의 평균으로 클러스터의 중앙을 업데이트 해나갑니다.

이 알고리즘의 목적식은 $J = \sum_{i=1}^{N} \sum_{k=1}^{K} r_{i,k} |x_i-\mu_k|^2$이고 $x$는 데이터 포인트이고 $\mu$는 $k$개의 클러스터들의 중심점입니다. 그리고 $r_{i,k}$는 클러스터 $k$에 데이터 포인트가 속하면 1, 아니면 0이 들어가는 상수항입니다.

이 목적식이 줄어드는 경우는 데이터 포인트가 속해있는 클러스터가 바뀔 때이며 이 횟수는 총 $K$개의 클러스터만큼 $N$개의 데이터 포인트에 대해 반복되므로 유한합니다.

K-Means 알고리즘이 $K$개의 클러스터를 지정한 이후 매번 동일한 결과를 갖는 것은 아닙니다. 그 이유는 초기값(클러스터 중심)을 랜덤으로 지정하도록 하기 때문입니다.

이 알고리즘에서 첫번째 단계인 각 데이터 포인트들을 가장 가까운 클러스터 중앙에 할당하는 과정의 time complexity는 $K$개의 클러스터 중심이 지정이 되어 있으며 총 $N$개의 데이터 포인트마다 반복하므로 $O(KN)$이 소요됩니다. 클러스터 중앙을 업데이트하는 과정은 총 $N$개의 데이터 포인트를 사용할 것이므로 $O(N)$이 소요됩니다.

이 알고리즘에서는 $K$라는 파라미터를 선지정 해야 하며 이는 elbow point 지점(=가장 많이 목적식이 감소하는 구간 및 다음 감소가 적은 구간)으로 판단합니다.

---

### Dimension Reduction

최근 머신러닝은 manifold learning을 추구합니다. $D$차원의 데이터 포인트가 $x^{(1)}, \dots, x^{(N)} \in R^D$이라고 주어져 있을 때 어떤 function에 씌운 $f(x^{(1)}), \dots, f(x^{(N)}) \in R^d$로 스몰 $d$차원으로 만들어 내는데 $d << D$ 이지만 큰 차원일 때의 의미를 최대한 보존하면서 축소를 하는 과정을 말합니다.

$$
\sum_{i < j} R(|f(x^{(i)}) - f(x^{(j)}), \rho(x^{(i)}, x^{(j)}))
$$

이와 같이 distance function을 최대한 둘 사이의 distortion을 최소화하면서 distance는 유지되도록 임베딩합니다.

#### Principal Component Analysis(PCA)

위 식에서 $\rho(x^{(i)}, x^{(j)})$를 euclidean distance를 사용하고 $R(\alpha, \beta) = (\alpha - \beta)^2$로 squared loss를 사용합니다.

이 알고리즘도 역시 정보를 최대한 많이 보존하면서 차원을 축소하는 데 선형 결합을 통해 maximal variance(제 1축)은 데이터가 많이 퍼져있는 축의 방향을 삼고 그 축과 직교하는 방향 중에서 두번째로 분산이 큰 축의 방향을 선택합니다.

가장 먼저 해야 할 작업으로는 모든 데이터 포인트에 대해서 평균과의 차이를 주어 zero centered를 시키고 normalized data를 얻습니다. 이 과정 이후에 정규화된 데이터 $\tilde{x}$를 사용하여 covariance matrix를 구하여 분산이 가장 큰 축을 찾습니다. 그 식은 아래와 같습니다.

$$
\hat{\sum} = \frac{1}{N} \sum_{i=1}^{N} \tilde{X}^{(i)}{\tilde{X}^{(i)}}^T
$$

다음으로는 eigenvalue decomposition을 시행합니다. $\sum x = \lambda x$로 정의하고 matrix 버전으로는 $\sum U = \Lambda U$로 여기서 $U$는 분산이 가장 큰 축을 $x$축으로 회전(axis-aligned)시키는 역할을 합니다. 이 decorrelated 과정을 거치면 $x$, $y$축이 제 1, 2축이 되게 됩니다.

<img src="https://intoli.com/blog/pca-and-svd/img/basic-pca.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

이후의 데이터 포인트들은 covariance matrix가 직교되며 각 차원은 더 이상 correlated되지 않은 상태에 놓이게 됩니다. 위 식에서 $\lambda$는 $\begin{bmatrix} \lambda_1 & 0 & 0 & \cdots & 0 \\ 0 & \lambda_2 & 0 & \cdots & 0 \\ \vdots & \vdots & \ddots & \ddots & \vdots \\ 0 & 0 & 0 & 0 & \lambda_d \end{bmatrix}$이며 $d$차원의 variance를 모은 matrix입니다. $k$ 차원까지는 큰 값부터 차례대로 갖도록 하고 $d$차원에 다다를 때는 0을 갖도록 하여 차원 축소를 진행하는 것입니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/eTqt4oRfXrA?si=naP3qVFz4Uuzu0hV)
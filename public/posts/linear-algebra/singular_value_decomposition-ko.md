---
title: 'The Singular Value Decomposition, SVD'
date: '2023-03-08'
tags: ['Linear algebra', 'lecture']
---

### Bases and Matrices in the SVD

특이값 분해(Singular Value Decomposition, SVD)는 임의의 $m \times n$ 행렬 $\mathbf{A}$를 세 개의 행렬의 곱으로 표현하는 강력한 행렬 분해 방법입니다. 이때 두 행렬 $\mathbf{U}$, $\mathbf{V}$는 각각 $m \times m$, $n \times n$ 크기의 직교(orthogonal) 행렬이며, $\mathbf{\Sigma}$는 $m \times n$ 크기의 (대각선에만 원소가 있고 나머지는 0인) 대각 행렬입니다. 이때 $\mathbf{\Sigma}$의 대각 성분인 $\sigma_i$들을 특이값(singular values)이라고 합니다.

SVD의 분해식은 다음과 같습니다.

$$
\mathbf{A} = \mathbf{U} \mathbf{\Sigma} \mathbf{V}^{\text{T}}
$$

여기서, $\mathbf{U}$의 열벡터들은 $\mathbf{A}\mathbf{A}^{\text{T}}$의 고유벡터(좌 특이벡터)이고, $\mathbf{V}$의 열벡터들은 $\mathbf{A}^{\text{T}}\mathbf{A}$의 고유벡터(우 특이벡터)입니다. $\mathbf{\Sigma}$의 대각 성분인 특이값 $\sigma_i$들은 $\mathbf{A}$의 크기(길이)를 나타내는 값이며, 보통 내림차순으로 정렬됩니다.

즉, SVD는 행렬 $\mathbf{A}$에 대해서 입력 공간(열공간)과 출력 공간(행공간)에 각각 직교 기저를 부여하고, $\mathbf{A}$가 기저 벡터를 얼마나 신장/축소시키는지(특이값)를 설명해 줍니다. SVD는 차원 축소, 잡음 제거, 데이터 분석 등 다양한 분야에서 널리 사용됩니다.

---

### Principal Component Analysis

$m$개의 변수(측정값)와 $n$개의 표본(샘플)으로 이루어진 데이터 행렬을 $A_0$이라고 합니다. 중심화란 각 행(변수)의 평균($\mu_i$)을 계산한 후, 원래 행렬 $\mathbf{A}_0$의 각 행에서 해당 평균을 뺍니다.

#### 표본 공분산 행렬

중심화된 데이터 행렬 $\mathbf{A}$로부터 표본 공분산 행렬(Sample Covariance Matrix) $\mathbf{S}$를 정의합니다.

$$
\mathbf{S} = \frac{\mathbf{A}\mathbf{A}^{\text{T}}}{n-1}
$$

$\mathbf{S}$는 대칭 행렬이므로, $\mathbf{S}$의 고유 벡터와 고유값을 찾는 것은 $\mathbf{A}\mathbf{A}^{\text{T}}$의 고유 벡터와 고유값, 즉 $\mathbf{A}$의 좌 특이 벡터($\mathbf{u}_i$)와 특잇값($\sigma_i^2$)을 찾는 것과 동치입니다.

#### 필수 요소

총 분산 $T$는 $\mathbf{S}$의 대각합(Trace)과 같습니다.

$$
T = \sum_{i=1}^m s_i^2 = \sum_{i=1}^m \sigma_i^2
$$

$\mathbf{S}$의 고유 벡터 $\mathbf{u}_i$를 주성분이라고 합니다. 이들은 $m$차원 공간에서 데이터가 가장 크게 분산된(퍼져 있는) 직교 방향을 나타냅니다.

---

### 참고 자료

[원본 경로 #1](https://renessans-edu.uz/files/books/2023-12-04-11-33-41_46e7ce28c81d5c62d59b34ccc1c6f465.pdf)

[원본 경로 #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)

[원본 경로 #3](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)
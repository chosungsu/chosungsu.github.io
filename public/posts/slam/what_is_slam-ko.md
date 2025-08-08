---
title: 'What is slam'
date: '2024-10-02'
tags: ['slam', 'lecture']
---

### slam이란?

영어로 simultaneous localization and mapping의 약자로 움직이는 로봇에게 자기 자신의 위치를 추정하는 능력과 동시에 주변 호나경에 대한 지도를 작성하는 능력을 부여합니다.

먼저 위치 추정은 주어진 지도와 실제 내 주변 정보를 비교하여 내 위치를 파악하는 과정입니다.

지도 작성은 반대로 자신의 위치를 알고 있을 때 주변 환경에 대한 지도를 생성하는 것을 의미합니다. 또는 지금 있는 위치가 내가 이전에 왔던 곳인지 아닌지를 판단하여 업데이트도 진행하게 됩니다.

---

### 알고리즘의 종류

1900년대 후반에 연구되었던 초기의 slam 알고리즘은 베이즈 필터에 기반한 방법들이 많은 연구되었습니다. 베이즈 필터는 로보틱스 분야에서 활용되는 확률 기반의 재귀적인 필터로서 사전확률과 likelihood로부터 사후확률을 계산하는 베이즈 정리에 기초를 두고 있습니다. 지속적으로 입력되는 주변 환경에 대한 센서 정보와 현재 위치 정보를 확률적으로 융합하여 업데이트하는 알고리즘입니다. 이러한 알고리즘의 예로는 확장 칼만 필터를 이용한 EKF slam이나 파티클 필터를 이용한 Fast slam 등이 있습니다.

로봇이 공간을 이동함에 따라 로봇의 현재 위치에 대한 예측값과 랜드마크의 위치에 대한 측정값이 입력되고 각 사전확률이 likelihood와 융합하여 사후확률이 업데이트되게 되는데 이에 대한 결과로 랜드마크 위치에 대한 불확실성이 감소하고 로봇의 위치에 대한 불확실성도 감소하게 되어 정확한 작업이 수행될 수 있습니다.

2000년대에는 그래프 구조를 이용한 최적화 기반 방법론이 연구되었습니다. 이 구조는 크게 그래프 노드와 그래프 엣지로 구성이 되는데 노드는 로봇의 위치를 엣지는 노드 사이의 제약(회전 및 이동)을 나타냅니다.

<img src="https://velog.velcdn.com/images/devjo/post/3ede9e3f-cba2-4e98-aed0-afce1fed27f8/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

로봇이 공간을 이동함에 따라 지도의 형태가 점점 명확해지고 일관성 있는 형태로 만들어지게 됩니다.

다른 종류로는 특징점 기반 방법(feature based method)이 있습니다. 특징점을 기반으로 카메라 궤적을 추적하고 매핑을 수행합니다. ORB slam이 대표적인 예시입니다.

특징점 없이 영상간의 밝기(intensity) 값 차이를 직접 이용해 궤적을 추적하고 매핑을 하는 직접 기반 방법(direct method)도 있습니다. LSD slam이 대표적입니다.

수많은 데이터로 의미있는 패턴이나 정보를 추출하여 문제를 푸는 딥러닝으로 slam에도 적용이 되고 있는데 영상 사이의 변환관계를 예측하는 DeepVO가 있는데 시간순으로 들어오는 연속적인 영상들을 입력으로 받아서 3차원 공간상에서 카메라 포즈를 계산하여 출력합니다. t시점의 영상을 CNN에 입력하여 개별 영상에 대한 특징맵을 학습하는데 연속된 특징맵에 대해 RNN에 입력하여 학습합니다. 하지만 전통적인 slam에 비해 성능은 떨어집니다. 최근에는 비지도 또는 준지도 학습 연구가 되고 있습니다.

---

### 파이프라인

#### 1. 시각적 주행거리 측정(visual odometry)

<img src="https://velog.velcdn.com/images/devjo/post/dc1ef3a1-8087-456b-8cd4-06c625080fa9/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

인접한 이미지 사이 센서 움직임을 예측하여 회전 및 이동 파라미터를 계산하는 알고리즘입니다. 하지만 이 알고리즘만 사용하여 연속적인 센서의 궤적을 예측해 나간다면 누적된 표류 오차(drift error) 때문에 실제 궤적과 큰 차이를 보이게 됩니다. 일관성 있는 궤적을 위해서는 루프 폐쇄 검출과 백엔드 최적화가 필요합니다.

#### 2. 루프 폐쇄 검출(Loop closure detection)

<img src="https://velog.velcdn.com/images/devjo/post/44c6230f-2fae-4447-9154-e352aeda659a/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

현재 센서의 위치가 이전에 방문한 곳인지 판단하는 알고리즘으로 현재와 이전 입력 사이의 유사성을 고려하여 판단합니다. 센서 입력 사이의 유사성은 이미지 간의 유사성이나 기하학적 구조의 유사성을 고려할 수 있습니다. 다른 시간, 날씨, 조명, 시점과 같은 다양한 변화 요인이 있음에도 강건하게 같은 장소임을 판단할 수 있게 합니다.

#### 3. 백엔드 최적화(backend optimization)

<img src="https://velog.velcdn.com/images/devjo/post/61bf176b-b9af-43bb-aeb5-b9c1fe7ae422/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

노이즈가 많은 데이터로부터 전체 시스템의 상태를 정확하게 추정하는 방법으로 필터 기반 또는 비선형 최적화 방법이 있습니다. 필터 기반은 베이즈 필터를 이용하여 재귀적으로 사전확률과 likelihood를 융합하여 사후확률을 업데이트하는 방법이고 칼만 필터나 파티클 필터가 있습니다.

비선형 최적화 방법은 센서의 자세와 랜드마크 사이 비선형적 움직임 모델이 주어졌을 때 제약을 최소화하는 방법으로 번들 조정이나 그래프 최적화가 있습니다.

---

### 수학적 정의

<img src="https://velog.velcdn.com/images/devjo/post/db4de94f-255d-4eb2-89f9-ba23196b7ba8/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

slam은 현재 시간 $t$까지 제어정보 $u_{1:T}=\{u_1, u_2, ..., u_T\}$와 주변 환경에 대한 관찰 정보 $z_{1:T}=\{z_1, z_2, ..., z_T\}$로부터 지도 정보 $m$을 계산합니다.

---

### 참고 자료

[원본 경로 #1](https://dongwonshin.oopy.io/53261df4-e506-4afb-8039-bc29e6a6ec40)




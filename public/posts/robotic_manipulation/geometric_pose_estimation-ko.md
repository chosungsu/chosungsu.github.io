---
title: 'Geometric Pose Estimation'
date: '2024-11-20'
tags: ['Robotics', 'Manipulation', 'lecture']
---

### Geometric Pose Estimation

#### 카메라 및 깊이 센서

<img src="https://velog.velcdn.com/images/devjo/post/2104bc26-00f4-4e24-8183-0a4e3305ddd5/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

로봇 조작 시스템에서 시각 센서(카메라 기반 및/또는 거리 측정 센서)는 중요한 역할을 합니다. 특히 깊이(Depth) 정보를 명시적으로 측정하는 센서가 많이 사용됩니다. 주로 RGB-D 카메라(ToF, 패턴 투영 스테레오)와 Lidar가 사용됩니다.

#### 센서 노이즈 및 드롭아웃

실제 깊이 센서는 이상적이지 않으며, 깊이 측정 오류는 단순한 가우시안 노이즈가 아니라 조명, 표면 법선, 재료 특성에 따라 달라집니다. 특히 물체 모서리나 반사되는 물체에서 깊이 측정이 실패하는 미스 리턴(Missed Returns) (최대 깊이 반환)이 흔하게 발생합니다.

#### 가려짐 및 부분 시야

카메라는 직선 시야(line of sight)만 보기 때문에, 물체의 뒷면이나 아래쪽을 보려면 카메라를 움직여야 합니다. 조작 중에는 로봇의 손이 시야를 가리는 가려짐(occlusion) 현상이 자주 발생합니다.

---

### Point Cloud Registration with Known Correspondences

이 문제의 목표는 알려진 물체의 모델 점 구름 $\mathcal{M}$과 카메라에서 얻은 장면 점 구름 $\mathcal{S}$을 사용하여 물체의 포즈 $\mathbf{X}^{\text{O}}$를 추정하는 것입니다.

객체 프레임에서 모델 포인트 목록 $m_i$를 $^{\text{O}} X^{\text{m}_i}$로 설명합니다. 그리고 장면 포인트 $s_i$를 사용해서 카메라 좌표로 $^{\text{C}} X^{\text{s}_i}$와 같이 변환합니다.

이 문제는 오버 제약된 (over-constrained) 역운동학 문제이며, 측정 노이즈에 강인하게 대처하기 위해 최소 제곱법(Least-Squares)을 사용하여 포즈를 추정합니다.

$$
\underset{X \in SE(3)}{min} \sum_{i=1}^{N_s} \Vert X^{\text{O}}p^{m_{c_i}} - X^{\text{C}} {}^{\text{C}}p^{s_i}\Vert^2
$$

회전과 병진 최적화를 분리하는 중요한 통찰력은 점들의 상대적 위치는 회전에 의해 영향을 받지만 병진(translation)에는 영향을 받지 않는다는 것입니다.

$$
\underset{p, R}{min} \sum_{i=1}^{N_s} \Vert p+R^{\text{O}}p^{m_{c_i}} - X^{\text{C}} {}^{\text{C}}p^{s_i}\Vert^2
$$

---

### Iterative Closest Point, ICP

<img src="https://velog.velcdn.com/images/devjo/post/b073a869-c52d-42a3-a834-8f616863b462/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

대응 관계를 모를 때의 현실적인 상황에 대처하기 위해 반복 최근점(ICP) 알고리즘을 사용합니다. 즉, 객체 포즈에 대한 초기 추측으로 시작하여 가장 가까운 점들을 통해 대응 관계를 계산한 다음, 이러한 대응 관계를 사용하여 추정된 포즈를 업데이트합니다.

객체 포즈 $\hat{X}^{\text{O}}$에 대한 추정치 $\hat{c}$와 관계를 

$$
\hat{c}=\text{argmin}_{j \in N_m} \Vert \hat{X}^{\text{O}} {}^{\text{O}}p^{\text{m}_j}-p^{s_i}\Vert
$$

이와 같이 표현 가능합니다.

---

### Partial Views and Outlier Handling

ICP(Iterative Closest Point)는 국소 최소값(local minima) 문제에 취약하다는 것을 확인했습니다. 실제 로봇 공학 환경에서는 이상치(outliers)(모델에 해당하지 않는 장면 점), 노이즈, 부분적 시야(partial views)가 포함된 "지저분한" point cloud를 처리해야 하므로 ICP의 견고성이 더욱 중요해집니다.

#### Outlier Detection

<img src="https://velog.velcdn.com/images/devjo/post/1580641c-ce84-4644-9609-0e4b3f13d30c/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

합리적인 추정치인 $X^{\text{O}}$를 갖게 되면 각 장면 점과 해당 대응 모델 점 사이의 거리가 최대 대응 거리(maximum correspondence distance)보다 멀면 해당 장면 점을 이상치로 분류하고 제거합니다.

#### Point Cloud Segmentation

장면 내 이상치는 불량 반사 외에도 다른 물체로 인한 경우가 많습니다. 테이블이나 빈(bin)과 같은 배경 기하학을 미리 알고 있다면 해당 영역의 점들을 제거하거나, 관심 영역(Region of Interest, ROI)으로 점 구름을 자르기(Crop)할 수 있습니다.

장면에 여러 객체가 있을 경우, 관심 객체의 포즈를 직접 추정하기 어렵습니다. 따라서 다른 알고리즘을 사용하여 장면을 여러 가능한 객체로 분할(Segmentation)하고, 각 세그먼트에 대해 독립적으로 정합을 실행해야 합니다. 최근에는 분할에 신경망(Neural Network)을 사용하는 경향이 있습니다.

#### Generalized Correspondences

부분적 시야나 이상치 문제를 처리하기 위해 "대응 없음"을 허용하도록 대응 개념을 일반화할 수 있습니다. 관심 모델에 해당하는 장면 점이 해당 모델 점에 매핑되고, 이상치 및 기타 객체의 장면 점은 "대응 없음"으로 표시되기를 바랍니다. 객체의 가려진 부분에서 나온 모델 점은 아무런 대응 관계도 갖지 않습니다.

---

### 참고 자료

[원본 경로 #1](https://manipulation.csail.mit.edu/pose.html#section5)


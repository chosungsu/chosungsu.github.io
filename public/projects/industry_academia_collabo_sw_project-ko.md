---
title: 'Industry-Academia Collaborative Software Project'
date: '2023-02-28'
description: 'Developed an anomaly detection system based on industrial sensor data'
tags: ['time series', 'unsupervised', 'sensor data']
github: 'https://github.com/chosungsu/time-series-anomaly-detection'
---

### 프로젝트 개요
이 프로젝트는 산업 현장에서 수집된 센서 데이터를 기반으로 비지도 학습을 활용한 이상탐지 시스템을 개발하는 산학연계 소프트웨어 프로젝트였습니다. 프로젝트는 약 8개월간 진행되었으며, 저는 프로젝트 리더이자 주요 알고리즘 개발자로 참여했습니다.

#### 프로젝트 목표
1.실시간 이상 탐지: 제조 공정에서 수집되는 시계열 데이터의 실시간 모니터링

2.적응적 학습: 환경 변화에 따른 모델의 자동 적응

3.사용자 친화적 인터페이스: 직관적인 웹 기반 모니터링 시스템

---

### 문제 정의
산업용 설비는 수많은 센서를 통해 데이터를 수집하고 있지만, 이 데이터의 대부분은 정상 상태에 해당하며 이상 데이터는 거의 존재하지 않거나 라벨이 부족합니다. 따라서 비지도 학습(Unsupervised Learning)을 활용해 최대한 정상 패턴을 학습하고, 이와 다른 패턴을 '이상'으로 탐지하는 것이 핵심이었습니다.

#### 기술적 특징
1.전통적인 비지도 학습 알고리즘 활용하여 pseudo labeling 진행

2.PPO (Proximal Policy Optimization) 강화학습 알고리즘 활용

3.Streamlit 기반 실시간 웹 인터페이스 시각화

---

### 모델 선택 및 구현
프로젝트에서는 두 가지 주요 모델을 활용했습니다:

#### Isolation Forest

-비지도 학습 기반의 이상치 탐지 알고리즘

-정상 데이터만으로 학습이 가능하며 계산 효율이 높음

-시계열 데이터의 특징을 추출하여 이상치 스코어 계산

-Pseudo labeling을 위한 초기 모델로 활용

#### PPO (Proximal Policy Optimization)

-강화학습 기반의 적응형 이상 탐지 알고리즘

-환경 변화에 따른 동적 임계값 조정

-실시간 피드백을 통한 모델 성능 개선

-Isolation Forest의 결과를 보완하여 최종 이상 판단

---

### 결과 및 성과

#### 1. 전체 시스템 구조

<img src="https://velog.velcdn.com/images/devjo/post/77edf257-b927-4104-90e4-4a56907fe9cf/image.png" alt="Example Image" style="display: block; margin: 0 auto; width:60%; height:300;" />

#### 2. 성능 지표

Accuracy : 100%

Recall : 100%

F1_score : 100%

#### 3. 인터페이스 특징

-실시간 차트: 현재 처리 상황 시각화

-성능 지표: 실시간 성능 모니터링

-제어 버튼: 시작/정지/리셋 기능

-설정 옵션: 자동/수동 업데이트 모드

---

### 마무리하며

<img src="https://velog.velcdn.com/images/devjo/post/52407ba7-f7c2-4575-96fe-92f52e7f5fa0/image.png" alt="Example Image" style="display: block; margin: 0 auto; width:60%; height:300;" />

#### 프로젝트 성과 요약

1.기술적 성과

-강화학습 기반 이상 탐지: PPO 알고리즘을 활용한 적응적 모델 개발

-실시간 처리 시스템: 순차적 데이터 처리로 안정성 확보

-웹 기반 인터페이스: Streamlit을 활용한 사용자 친화적 시스템

2.비즈니스 가치

-생산성 향상: 실시간 이상 탐지로 다운타임 최소화

-품질 관리: 조기 이상 탐지로 품질 문제 사전 방지

-운영 효율성: 자동화된 모니터링으로 인력 효율성 증대

#### 마지막 말

이 프로젝트를 통해 강화학습이 실제 산업 현장에서 얼마나 유용한지 확인할 수 있었습니다. 특히 적응적 학습과 실시간 처리의 조합이 이상 탐지 분야에서 큰 잠재력을 가지고 있다는 것을 보여주었습니다.
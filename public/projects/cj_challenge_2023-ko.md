---
title: 'Multi-Object Detection Challenge'
date: '2023-08-21'
description: 'Develop an object detection system capable of identifying and classifying various product types in a warehouse environment'
tags: ['cnn', 'yolo', 'computer vision']
github: 'https://github.com/username/project'
---

### 프로젝트 개요
이 프로젝트는 물류창고 내 다양한 제품들의 종류(클래스)를 자동으로 인식하고 분류하는 객체 탐지(Object Detection) 시스템을 개발하는 데 목적이 있었습니다. 약 2개월 간 진행된 이 프로젝트에서 저는 객체 탐지 모델링과 라벨링 도구 개발을 담당했습니다.

---

### 문제 정의
창고 환경에서는 다양한 크기와 형태의 제품들이 복잡하게 배치되어 있으며, 이들을 빠르고 정확하게 탐지하는 것은 물류 자동화를 위한 핵심 과제입니다. 그러나 실제 데이터는 라벨이 부족하거나, 조명과 배경이 일정하지 않아 일반화 성능 확보가 어려운 문제가 존재했습니다.

---

### 모델링 접근 방식

#### 🔧 모델 선택 및 세부 전략
- __Detectron2__ 프레임워크를 기반으로 객체 탐지 모델을 구축하고, 프로젝트 목적에 맞게 fine-tuning을 진행하였습니다.
- 다양한 백본(ResNet, EfficientNet 등)을 실험하여 최적의 성능 조합을 도출했습니다.

#### 🧪 데이터 증강 기법
- __Crop__: 객체 주변을 중심으로 랜덤하게 자르는 방식으로, 모델이 다양한 크기의 객체에 적응할 수 있도록 학습
- __Mosaic__: 여러 이미지를 하나로 결합하여 다양한 배경과 객체 조합을 학습할 수 있도록 구성

이러한 온/오프라인 증강을 통해 데이터 다양성과 일반화 성능을 높일 수 있었습니다.

---

### 라벨링 도구 개발
- 프로젝트 초기 단계에서 라벨이 부족했기 때문에, __커스텀 라벨링 툴__을 제작하여 팀원들이 효율적으로 바운딩 박스를 수동으로 입력할 수 있도록 지원했습니다.
- 이후 학습된 모델의 예측 결과를 활용한 __세미 오토 라벨링(half-auto labeling)__ 방식도 도입하여 라벨링 속도와 정확도를 모두 향상시켰습니다.

---

### 결과 및 성과
- IOU(Intersection over Union) 기준 __80%__ 이상의 정확도를 달성한 최종 모델을 개발하였으며, 복잡한 창고 환경에서도 안정적인 성능을 보였습니다.
- 증강 기법과 모델 아키텍처 튜닝을 통해 데이터셋의 일반화 성능 향상에 기여했습니다.

---

### 마무리하며
이 프로젝트는 실제 산업 환경에서 객체 탐지 기술을 효과적으로 적용하기 위한 전략을 실험하고 검증할 수 있는 좋은 기회였습니다. 향후에는 더 다양한 클래스 분류, 실시간 처리 등으로 확장할 계획입니다.

---
title: 'Industry-Academia Collaborative Software Project'
date: '2023-02-28'
description: 'Developed an anomaly detection system based on industrial sensor data'
tags: ['time series', 'unsupervised task', 'sensor data']
github: 'https://github.com/username/project'
---

### 프로젝트 개요
이 프로젝트는 산업 현장에서 수집된 센서 데이터를 기반으로 비지도 학습을 활용한 이상탐지 시스템을 개발하는 산학연계 소프트웨어 프로젝트였습니다. 프로젝트는 약 8개월간 진행되었으며, 저는 프로젝트 리더이자 주요 알고리즘 개발자로 참여했습니다.

### 문제 정의
산업용 설비는 수많은 센서를 통해 데이터를 수집하고 있지만, 이 데이터의 대부분은 정상 상태에 해당하며 이상 데이터는 거의 존재하지 않거나 라벨이 부족합니다. 따라서 __비지도 학습(Unsupervised Learning)__ 을 활용해 정상 패턴을 학습하고, 이와 다른 신호를 '이상'으로 탐지하는 것이 핵심이었습니다.

### 모델 선택: VQ-VAE (Vector Quantized Variational Autoencoder)
🔍 VQ-VAE란?
VQ-VAE는 Variational Autoencoder(VAE)의 확장 모델로, 연속적인 잠재 공간(latent space)이 아닌 __벡터 양자화(vector quantization)__ 를 통해 이산적인(latent discrete) 표현을 학습합니다. 이는 특히 패턴의 군집 구조를 잘 학습할 수 있어, 이상탐지에 효과적입니다.

입력 데이터 → 인코더 → __코드북(codebook)__ 에서 가장 가까운 벡터로 매핑 → 디코더 → 재구성

재구성 오차(reconstruction error)가 클수록 이상일 가능성 ↑

✅ 적용 방식
정상 상태의 센서 시계열 데이터만으로 모델 학습

새로운 데이터가 들어올 경우, 재구성 오차 기반으로 이상 판단

다양한 reconstruction loss 지표(MSE, MAE 등)를 실험

### 실험 관리: WandB 도입
모델 개발과 실험 과정에서 __Weights & Biases (WandB)__ 를 활용해 관리 체계를 구축했습니다.

### 결과 및 성과
기존 룰 기반 또는 단순 Autoencoder 기반 이상탐지 대비 조기 이상 탐지율(Early Detection Rate) 6% 향상

모델의 경량화와 현장 적용 가능성에 대해 논의

프로젝트 성과를 인정받아 장려상 수상

### 마무리하며
본 프로젝트를 통해 비지도 학습 기반의 실제 산업 문제 해결 가능성을 확인할 수 있었고, VQ-VAE의 실용성 또한 입증할 수 있었습니다. 앞으로도 다양한 모델과 응용 도메인에 확장해보고자 합니다.
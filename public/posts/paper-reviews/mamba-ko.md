---
title: 'Query based cross modal projector bolstering mamba multimodal llm'
date: '2024-12-12'
tags: ['llm', 'paper review']
---

### Abstract

Transformer의 입력 길이에 따른 이차적 복잡도(quadratic complexity)는 대형 언어 모델(LLM)에서 지속 불가능한 연산 부담을 초래합니다.  
이에 반해, Selective Scan Structured State‑Space Model(선택적 스캔 구조 상태공간 모델), 즉 Mamba는 이러한 계산적 문제를 효과적으로 해결합니다.

본 논문에서는 쿼리 기반(query‑based) 크로스모달 프로젝터(cross‑modal projector) 를 탐구하며, 이는 Mamba의 효율성을 향상시키기 위해 설계되었습니다.  
이 프로젝터는 교차주의(cross‑attention) 메커니즘을 활용하여 입력을 기반으로 시각적 토큰(visual tokens)을 압축하며, 또한 Mamba LLM의 입력 시퀀스로 변환할 때 원본 이미지 특징(original image features)의 2D 스캔 순서를 수동으로 설계할 필요를 제거합니다.

---

### Introduction

<img src="https://velog.velcdn.com/images/ski06043/post/f50d60e1-694d-48cc-9aef-5caac866a67f/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

__멀티모달 대형 언어 모델 (MLLMs)__

MLLMs는 시각적 정보와 텍스트를 융합하여, 텍스트 전용 LLM의 언어 생성 및 논리 추론 능력을 강화합니다.  
이러한 통합은 VQA, 멀티모달 대화 응답 생성 등 실세계 비전‑언어 문제 해결에서 높은 잠재력을 보여줍니다.

__Transformer 기반 MLLM의 한계__

Transformer는 self‑attention의 계산 및 메모리 병목 현상으로 인해 입력 길이에 따른 이차적 복잡도를 가집니다.  
컨텍스트 윈도우 확장 연구가 진행 중이지만, 여전히 계산 부담이 해결되지 않은 과제로 남아 있습니다.

---

### Mamba Architecture

상태 공간 모델(SSM)은 CNN과 RNN의 장점을 결합하여 병렬 학습과 빠른 추론을 구현합니다.  
최신 SSM 기반 모델인 Mamba는 다음 특징을 가집니다:

- 입력 의존적 게이팅을 통해 선택적 스캔 가능  
- 하드웨어 최적화 알고리즘을 적용  
- Transformer와 유사한 성능을 보이면서도 빠른 학습 및 추론 속도 확보  

다만, Mamba 기반 MLLM에서 시각적 정보 정렬 방식에 대한 연구는 부족합니다.  
따라서 본 논문은 Mamba 기반의 크로스모달 프로젝터를 제안합니다.

---

### Related Works

__1.상태 공간 모델 및 Mamba__  


- LSSL (Linear State Space Layer), S4, S4D, H3 등 SSM 아키텍처는 차례로 등장하여 장거리 의존성 학습을 개선했습니다.  
- Mamba는 기존 모델의 단점을 보완하고, 입력 의존 게이팅을 추가한 최신 SSM 기반 모델입니다.

__2.Multimodal Large Language Models__  

- Cobra, VL‑Mamba 등은 시각 정보를 처리하기 위해 SSM 기술을 적용했으나, 여전히 고정된 토큰 수와 수동 스캔 방식에 한계가 존재합니다.

---

### Method

__1.Preliminaries__

- SSM은 연속 함수 $x(t)$를 은닉 상태 $h(t)$와 함께 출력 $y(t)$로 변환합니다.  
- 연속 시스템을 이산화하여 시퀀스를 처리하며, Mamba는 시간 단계별로 동적으로 SSM 파라미터 (A, B, C, $delta$)를 조정 가능하도록 설계됩니다.

__2.Cross‑Modal Mamba Projector (Q‑Mamba)__

<img src="https://velog.velcdn.com/images/ski06043/post/024f3e4e-f4a7-46a4-83a7-620e87a00522/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Q‑Mamba는 다음 구성요소로 이루어집니다:

- Mamba Layer: sequence mixer (인과적 시퀀싱 지원)  
- Cross‑Attention Layer: 시각적 특징 간 상호작용  
- FFN: 채널 믹싱  

이 구조는 시각 스캔 순서에 독립적이며, 쿼리 시퀀스 길이에 유연하면서 Q‑Former와 유사합니다.

__3. MLLM 훈련 전략__

- 2단계 훈련 방식 (LLaVA 기반) 적용:  
  - Alignment stage: visual instruction following dataset으로 LLM 정렬  
  - Fine‑tuning stage: Projector와 LLM 전체 End‑to‑End 학습

---

### Causal Discovery with PLM

<img src="https://velog.velcdn.com/images/ski06043/post/94900903-6d4f-4e68-853a-029ca30b1053/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

PLM을 기반으로 사전 지식 $K$를 활용한 인과 추론 프레임워크
- 데이터셋 입력 → 프롬프트 기반 인과 탐색 → pairwise 관계 집계 → prior $K$ 생성  
- Graph 초기화, 정규화, 경계 설정을 통해 최종 인접 행렬 산출

---

### 참고 자료

[원본 경로 #1](https://aclanthology.org/2024.findings-emnlp.827/)
---
title: 'IR system'
date: '2024-12-23'
description: 'Build an efficient Information Retrieval (IR) system to retrieve relevant information from large-scale scientific documents'
tags: ['hybrid search', 'rewriting', 'prompting']
github: 'https://github.com/username/project'
---

### 프로젝트 개요  
이 프로젝트는 대규모 과학 문서 데이터로부터 사용자가 원하는 정보를 빠르고 정확하게 찾기 위한 정보 검색(IR: Information Retrieval) 시스템을 구축하는 것을 목표로 했습니다. 짧은 기간 동안 집중적으로 진행된 프로젝트로, 저는 NLP 모델링을 담당했습니다.

---

### 문제 정의  
기존의 키워드 기반 검색 시스템은 사용자의 질문 의도를 정확히 파악하지 못하거나, 표현 방식의 차이로 인해 관련성이 높은 문서를 놓치는 경우가 많았습니다.  
이를 해결하기 위해 __Query Expansion__, __Query Rewriting__ 등의 자연어 처리 기법을 도입하고, 문서와 쿼리의 의미적 유사도를 반영하는 __Hybrid Search__ 전략을 실험했습니다.

---

### 접근 방식 및 기술 스택  

#### ✨ Query Expansion & Rewriting  
- 사용자 입력 쿼리를 확장하거나 재작성해 더 풍부한 표현으로 변환  
- 예: "graph network speed" → "graph neural network performance benchmark"

#### 🧠 Hybrid Search with BGE-m  
- Dense vector와 sparse BM25 점수를 결합한 __Hybrid Search__ 방식 적용  
- 특히 __BGE-m__ 모델을 활용해 쿼리와 문서 간 의미적 유사도를 반영한 dense 검색 벡터를 생성  
- 최종 점수는 BM25와 dense score를 가중 평균하여 랭킹

---

### 실험 및 성과  

- __Query Expansion__ 적용 후 MRR (Mean Reciprocal Rank) 기준으로 __8% 성능 향상__  
- __BGE-m 기반 Hybrid Search__ 적용 후 추가로 __2% MRR 개선__  
- 다양한 쿼리 표현에서도 일관된 성능을 보임

---

### 마무리하며  
짧은 기간이었지만 다양한 검색 기법을 실험하며 실제 검색 시스템의 성능을 정량적으로 개선할 수 있었습니다. 향후에는 RAG(Retrieval-Augmented Generation) 구조로 확장하거나, 학문 분야별 전문 검색 시스템으로의 적용 가능성을 실험해보고자 합니다.

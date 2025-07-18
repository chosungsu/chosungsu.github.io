---
title: 'Text numeral normalization'
date: '2025-02-07'
description: 'Develop an LLM-based NLP model that transforms Korean-written numerals (e.g., “삼십이”) into standard numeric forms (e.g., “32”)'
tags: ['seq2seq', 't5', 'llm']
github: 'https://github.com/username/project'
---

### 프로젝트 개요  
이 프로젝트는 AI Human이 생성하는 자연어 문장 내에 포함된 한글 숫자 표현(예: "삼십이", "백오십만")을 실제 숫자(예: "32", "1,500,000")로 변환하는 NLP 태스크를 수행하기 위한 프로젝트였습니다.  
모델은 수치 정보를 더 잘 활용하고, 대화 시스템이나 데이터 분석에 활용 가능한 정규화된 형태로 데이터를 가공하는 데 목적이 있었습니다.

---

### 문제 정의  
한국어 문장에서는 숫자가 다양한 형태(예: “삼십이”, “스무개”, “한두 번”)로 표현되며, 이를 정규 숫자 형태로 변환하는 것은 단순 규칙 기반 접근으로 해결하기 어렵습니다.  
__문맥(Context)__ 에 따라 동일한 표현도 서로 다른 숫자를 의미할 수 있기 때문에, __LLM 기반의 문장 이해 능력__ 을 활용하는 것이 핵심이었습니다.

---

### 접근 방식 및 기술 스택  

#### 🧠 모델 구조 및 적용  
- __pko-t5-large__ 모델을 기반으로 문장을 입력받아 정규화된 숫자 표현을 생성하는 Seq2Seq 구조 적용  
- 문장 전반의 의미를 고려한 __문맥 기반 숫자 변환__ 수행

#### 🔧 데이터 정제 및 학습 전략  
- 다양한 한글 숫자 표현을 포함하는 데이터를 수집하고, 불규칙한 패턴을 __규칙화(정규화)__ 하여 학습 품질 향상  
- __Custom Loss__ 설계를 통해 숫자 위치에 대한 주의(attention)를 높여 정확한 변환 유도  
- GPT를 이용해 __문맥 다양성이 반영된 문장__ 으로 데이터셋을 증강(Augmentation)하여 일반화 성능 향상

---

### 실험 및 성과  

- 불규칙한 수 표현을 정규화한 후 정확도(ACC) __7% 향상__  
- GPT 기반 데이터 증강을 통해 추가적으로 __정확도 10% 개선__  
- 일부 문장에서는 기존 Rule-based 접근보다 15% 이상 높은 변환 정확도 확인

---

### 마무리하며  
이번 프로젝트는 단순 규칙 기반 접근의 한계를 넘어서, LLM 기반 문장 이해 능력을 통해 수치 정보를 보다 정확히 추출하고 활용하는 가능성을 입증했습니다.  
향후에는 금융, 의료, 법률 등 도메인 특화 문장에 맞는 커스텀 모델로 확장할 계획입니다.

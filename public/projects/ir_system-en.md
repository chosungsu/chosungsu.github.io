---
title: 'IR system'
date: '2024-12-23'
description: 'Build an efficient Information Retrieval (IR) system to retrieve relevant information from large-scale scientific documents'
tags: ['hybrid search', 'rewriting', 'prompting']
github: 'https://github.com/username/project'
---

### Project Overview  
This project aimed to build an efficient Information Retrieval (IR) system to retrieve relevant information from large-scale scientific documents. The project was conducted intensively over a short period, during which I was in charge of NLP modeling.

---

### Problem Definition  
Traditional keyword-based search systems often fail to capture the user’s intent or miss highly relevant documents due to variation in phrasing.  
To address this, we adopted techniques such as __Query Expansion__ and __Query Rewriting__, and experimented with a __Hybrid Search__ strategy that incorporates semantic similarity between queries and documents.

---

### Approach & Technical Stack  

#### ✨ Query Expansion & Rewriting  
- Transformed user queries into richer representations  
- Example: "graph network speed" → "graph neural network performance benchmark"

#### 🧠 Hybrid Search with BGE-m  
- Applied a __Hybrid Search__ strategy that combines sparse BM25 scores with dense embeddings  
- Used the __BGE-m__ model to generate dense vector representations reflecting semantic similarity  
- Final ranking score = weighted average of BM25 and dense scores

---

### Results & Achievements  

- Applied __Query Expansion__, improving MRR (Mean Reciprocal Rank) by __8%__  
- Added __Hybrid Search with BGE-m__, resulting in an additional __2% MRR improvement__  
- Maintained consistent performance across diverse query types

---

### Conclusion  
Although conducted over a short period, the project successfully demonstrated measurable improvements in search accuracy through diverse retrieval strategies. In the future, we plan to extend this work using RAG (Retrieval-Augmented Generation) techniques or apply it to domain-specific academic search engines.

---
title: 'Introduction to RL'
date: '2025-03-03'
tags: ['cs234', 'lecture']
---

### overview

강화 학습(RL)은 불확실성 하에서 좋은 의사 결정을 내리기 위해 경험/데이터를 통해 학습하는 것입니다. 이는 지능의 필수적인 부분이며, 1950년대 Richard Bellman의 이론에서 발전해왔습니다. 지난 10년간 알파고(AlphaGo), 플라즈마 제어 학습, COVID-19 국경 검사, 그리고 ChatGPT와 같은 인상적인 성공 사례들이 있었습니다.

---

### key characteristics

__Optimization:__ 최상의 결과 또는 좋은 결과를 도출하는 최적의 의사결정을 찾는 것이 목적입니다. 명시적인 의사 결정 개념을 포함합니다.

__Delayed Consequences:__ 현재의 결정이 나중에 영향을 미칠 수 있습니다. 예를 들어 비디오 게임에서 열쇠를 찾는 행위가 해당합니다.

__Exploration:__ 결정을 내리면서 학습하는 과정을 말합니다. 시도한 결정에 대해서만 보상을 얻습니다.

__Generalization:__ 과거 경험에서 행동으로의 매핑으로 미리 프로그래밍하지 않고 학습을 통해 일반화된 정책을 만드는 것이 목표입니다.

---

### sequential decision making

총 예상 미래 보상을 최대화하기 위해 행동을 선택합니다. 이는 즉각적인 보상과 장기적인 보상 간의 균형을 맞추는 것을 요구할 수 있습니다.

각 시간($t$)마다 에이전트는 행동($a$)를 취하고 환경은 업데이트되며 관찰($o$)과 보상($r$)을 생성하고 이를 받게 됩니다.

#### markov assumption

information state는 sufficient statistic of history입니다.

상태($s_t$)는 markov인 경우에만 $p(s_{t+1}|s_t, a_t)=p(s_{t+1}|h_t, a_t)$를 만족하는데 미래는 현재가 주어졌을 때 과거와 독립적이라는 의미를 갖습니다.

#### mdp model

에이전트가 취하는 행동마다 환경이 변하는 정도에 대한 표현입니다. transition/dynamics model에서는 아래와 같이 에이전트의 상태를 예측합니다.

$$
p(s_{t+1}=s'|s_t=s, a_t=a)
$$

reward model은 즉각적인 보상을 예측합니다.

$$
r(s_t=s, a_t=a)=E(r_t|s_t=s, a_t=a)
$$

#### policy, $\pi$

에이전트가 각 상태에서 행동을 선택하는 방법을 결정하는 것입니다.

deterministic policy에서는 $\pi(s)=a$와 같이 상태를 행동에 매핑합니다.

stochastic policy에서는 $\pi(a|s)=pr(a_t=a|s_t=s)$와 같이 상태가 주어졌을 때 행동 분포를 매핑합니다.

---

### process in mdp

### 1. markov process (markov chain)

메모리가 없는 확률 과정으로 markov 속성을 가진 확률적 상태 sequence입니다. 상태집합($S$)와 모델($P$)로 정의됩니다.

### 2. markov reward process (mrp)

markov chain에 보상이 추가된 형태로 상태집합($S$)와 모델($P$)에 보상함수($R$)과 할인율($\gamma$)로 정의됩니다.

할인율은 미래 보상의 가치를 현재 시점으로 할인하는 요소로 그 값이 0이면 즉각적인 보상만 고려하고 1이면 미래 보상이 즉각적인 보상만큼 의미가 있다고 말할 수 있습니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/WsvFL-LjA6U?si=w6AiGLSlL14bTJ_a)




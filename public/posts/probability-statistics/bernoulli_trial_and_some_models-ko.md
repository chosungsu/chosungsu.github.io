---
title: 'Bernoulli trial and some models'
date: '2024-05-04'
tags: ['Probability&Statistics', 'lecture']
---

### Partition Counting Based

<img src="https://velog.velcdn.com/images/devjo/post/0a966852-75a1-4887-b7c8-d2ea738b889f/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

위 이미지처럼 전체 $S$라는 space에서 $B_i$가 각 구역을 차지하고 있을 때 $A$ 이벤트가 발생하였을 때 사후확률 $P[B_i|A]$을 구하는 것을 베이지안 룰이라고 합니다.

$$
P[B_i|A]=\frac{P[A \cap B_i]}{P[A]} \\
=\frac{P[A|B_i]P[B_i]}{\sum_{i=1}^{n} P[A|B_i]P[B_i]}
$$

위 식으로 사후확률을 계산할 수 있습니다.

---

### Independence of events

$A, B$라는 두 이벤트가 있고 서로 독립이라면 $P[A \cap B]=P[A]*P[B]$ 정의를 만족합니다.

이 정의에 의해 위의 베이지안 룰 공식에 대입해보면 독립일 경우 $P[A|B]=\frac{P[A \cap B]}{P[B]}=\frac{P[A]P[B]}{P[B]}=P[A]$로 정리가 가능합니다.

예를 들어 $A = \{x > 0.5\}, B = \{y > 0.5\}, 0 < x < 1, 0 < y < 1$가 있을 때, 서로 독립 관계인지 보기 위해서 $P[A \cap B]=P[A]*P[B]$을 계산해보면 $0.25=0.5*0.5$가 되므로 성립합니다.

---

### Sequential experiment

$S_1*S_2*S_3* \cdots * S_n$과 같이 sample space인 $S$를 여러번 시행하는 것을 말합니다. 즉 이 실험의 output은 $n$이 3이라면 $\{(111), (123), \cdots, \}$처럼 됩니다.

$$
P[A]=P[A_1] \\
*P[A_2|A_1] \\
*P[A_3|(A_1 \cap A_2)] \\
\vdots \\ 
*P[A_n|(A_1 \cap \cdots \cap A_{n-1})] \\
=P[A_1]*P[A_2]* \cdots * P[A_n]
$$

이 때 나오는 이벤트 클래스에 대한 확률 $P[A]$는 조건부 확률로 나타낼 수 있습니다. 위 식이 복잡하지만 가장 간단할 때는 모든 실험이 독립적으로 시행이 되는 경우입니다.

---

### Bernoulli trial(Binomial probability model)

성공확률이 $p$인 베르누이 시행을 $n$번 반복하여 $k$번 성공할 확률을 말합니다.

이 시행의 sample space $S$는 $\{(ss \cdots s), (sf \cdots s) \cdots (ff \cdots f)\}$와 같이 정렬이 될 것입니다. 그리고 확률값 $P_n(k)=\begin{pmatrix} n \\ k \end{pmatrix} p^k(1-p)^{n-k}$입니다.

---

### Multinomial probability model

여러 $B_i$가 파티션으로 있을 때 각각은 확률값이 $p_i$로 정해져 있는 모델입니다. 그래서 이 모델의 전체 확률값을 일반화해보면 $P[(k_1, k_2, \cdots, k_n)]=\frac{n!}{k_1!*k_2!* \cdots *k_n!} p_1^{k_1}*p_2^{k_2}* \cdots * p_n^{k_n}$이 됩니다.

---

### Geometric probability model

이 모델은 베르누이 시행을 성공할 확률 $p$를 갖고 무한 반복시행을 하고 $m$번째 처음 성공할 확률을 구합니다.

따라서 $A_i$를 $i$번째 성공하는 이벤트라고 정의할 때 확률값 $P[m] = P[A_1^c \cap A_2^c \cap \cdots \cap A_m]=(1-p)^{m-1}p$으로 m번째 인덱스를 제외하고는 실패할 확률(여집합)이 되도록 설정해야 합니다.

---

### 참고 자료

[원본 경로 #1](https://www.youtube.com/watch?v=LLF6oBBGIfs&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=3)




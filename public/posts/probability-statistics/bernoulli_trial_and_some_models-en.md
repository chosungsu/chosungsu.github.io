---
title: 'Bernoulli trial and some models'
date: '2024-05-04'
tags: ['Probability&Statistics', 'lecture']
---

### Partition Counting Based

<img src="https://velog.velcdn.com/images/devjo/post/0a966852-75a1-4887-b7c8-d2ea738b889f/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

As shown in the image above, when event $A$ occurs in a space $S$ where $B_i$ occupies each partition, calculating the posterior probability $P[B_i|A]$ is called Bayes' rule.

$$
P[B_i|A]=\frac{P[A \cap B_i]}{P[A]} \\
=\frac{P[A|B_i]P[B_i]}{\sum_{i=1}^{n} P[A|B_i]P[B_i]}
$$

The posterior probability can be calculated using the above formula.

---

### Independence of events

If there are two events $A, B$ and they are independent of each other, they satisfy the definition $P[A \cap B]=P[A]*P[B]$.

By this definition, when substituting into the above Bayes' rule formula, in the case of independence, it can be simplified as $P[A|B]=\frac{P[A \cap B]}{P[B]}=\frac{P[A]P[B]}{P[B]}=P[A]$.

For example, when $A = \{x > 0.5\}, B = \{y > 0.5\}, 0 < x < 1, 0 < y < 1$, to see if they are independent, calculating $P[A \cap B]=P[A]*P[B]$ gives $0.25=0.5*0.5$, so it holds.

---

### Sequential experiment

This refers to conducting a sample space $S$ multiple times as $S_1*S_2*S_3* \cdots * S_n$. That is, the output of this experiment, if $n$ is 3, becomes $\{(111), (123), \cdots, \}$.

$$
P[A]=P[A_1] \\
*P[A_2|A_1] \\
*P[A_3|(A_1 \cap A_2)] \\
\vdots \\ 
*P[A_n|(A_1 \cap \cdots \cap A_{n-1})] \\
=P[A_1]*P[A_2]* \cdots * P[A_n]
$$

The probability $P[A]$ for the event class that occurs at this time can be expressed as conditional probability. While the above formula is complex, the simplest case is when all experiments are conducted independently.

---

### Bernoulli trial(Binomial probability model)

This refers to the probability of succeeding $k$ times when repeating a Bernoulli trial with success probability $p$ for $n$ times.

The sample space $S$ of this trial will be arranged as $\{(ss \cdots s), (sf \cdots s) \cdots (ff \cdots f)\}$. And the probability value is $P_n(k)=\begin{pmatrix} n \\ k \end{pmatrix} p^k(1-p)^{n-k}$.

---

### Multinomial probability model

This is a model where when several $B_i$ exist as partitions, each has a probability value determined as $p_i$. So when generalizing the total probability value of this model, it becomes $P[(k_1, k_2, \cdots, k_n)]=\frac{n!}{k_1!*k_2!* \cdots *k_n!} p_1^{k_1}*p_2^{k_2}* \cdots * p_n^{k_n}$.

---

### Geometric probability model

This model has a success probability $p$ for Bernoulli trials and conducts infinite repeated trials to find the probability of first succeeding at the $m$-th trial.

Therefore, when defining $A_i$ as the event of succeeding at the $i$-th trial, the probability value $P[m] = P[A_1^c \cap A_2^c \cap \cdots \cap A_m]=(1-p)^{m-1}p$ must be set so that all indices except the $m$-th have failure probability (complement).

---

### References

[Original Source #1](https://www.youtube.com/watch?v=LLF6oBBGIfs&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=3)




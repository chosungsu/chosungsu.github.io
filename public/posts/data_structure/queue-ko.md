---
title: 'Queue'
date: '2023-08-15'
tags: ['Data Structure', 'lecture']
---

### Preliminary

큐(Queue)는 FIFO (First-In, First-Out) 원리를 따르는 선형 자료구조입니다. 즉, 큐에 가장 먼저 들어온 항목이 가장 먼저 처리되고, 두 번째 항목이 두 번째로 처리되는 식입니다.

다음 세 가지 핵심 메서드를 가집니다.

Enqueue는 항목을 큐의 맨 뒤에 배치합니다. Dequeue는 큐의 맨 앞에 있는 항목을 검색하고, 큐에서 제거합니다. Peek는 큐의 맨 앞에 있는 항목을 검색하지만, 큐에서 제거하지 않습니다.

---

### 기본 구조

#### A Standard Queue

단일 연결 리스트를 사용하여 효율적으로 구현될 수 있습니다.

단일 연결 리스트의 테일(tail)에 삽입하는 것은 $O(1)$ 실행 시간입니다. 큐에서는 항상 맨 앞(head)에서만 항목을 제거하므로, 단일 연결 리스트의 헤드 항목을 제거하는 것은 $O(1)$ 실행 시간입니다.

#### Priority Queue

custom comparer를 사용하여 항목의 우선순위(priority)에 따라 순서를 결정합니다. 우선순위 큐 역시 맨 앞에 있는 항목만 접근할 수 있다는 점은 일반 큐와 동일합니다.

#### Double Ended Queue, Deque

큐의 앞과 뒤 모두에서 항목에 접근할 수 있게 해줍니다.

---

### 참고 자료

[원본 경로 #1](https://mta.ca/~rrosebru/oldcourse/263111/Dsa.pdf)


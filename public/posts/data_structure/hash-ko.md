---
title: 'Hash'
date: '2023-08-18'
tags: ['Data Structure', 'Algorithm']
---

### Preliminary

해시 테이블(Hash Table)은 키(Key)와 값(Value)을 매핑하여 평균적으로 상수 시간($O(1)$)에 데이터 접근이 가능한 자료구조입니다.  

해시 함수(Hash Function)를 이용해 키를 특정 버킷(bucket) 또는 슬롯(slot)에 대응시킵니다.

$$
h: K \rightarrow \{0, 1, \ldots, m-1\}
$$

여기서  
$\Rightarrow$ $K$: 키의 집합  

$\Rightarrow$ $m$: 테이블 크기(bucket 수)  

$\Rightarrow$ $h(k)$: 키 $k$가 매핑되는 인덱스  

---

### 기본 원리

$\Rightarrow$ 데이터를 삽입할 때, 키를 해시 함수에 통과시켜 인덱스를 계산한다.  

$\Rightarrow$ 계산된 인덱스에 해당하는 버킷에 값을 저장한다.  

$\Rightarrow$ 데이터를 검색할 때, 동일한 해시 함수를 사용하여 해당 버킷을 찾는다.

$$
\text{index} = h(\text{key}) \bmod m
$$

이론적으로는 $O(1)$의 접근이 가능하지만, 충돌(collision)이 발생할 경우 탐색 시간은 $O(n)$까지 증가할 수 있습니다.

---

### 해시 함수 설계

#### 1. 나눗셈 방법 (Division Method)

$$
h(k) = k \bmod m
$$

$\Rightarrow$ 간단하고 빠르지만, $m$을 소수(prime)로 선택해야 충돌이 줄어듭니다.  

$\Rightarrow$ $m$이 2의 거듭제곱이면 하위 비트 패턴이 반복되어 성능이 저하됩니다.

#### 2. 곱셈 방법 (Multiplication Method)

$$
h(k) = \lfloor m (kA \bmod 1) \rfloor, \quad 0 < A < 1
$$

$\Rightarrow$ 실수 $A$를 곱한 후 소수 부분만 추출하여 인덱스 계산  

$\Rightarrow$ $A = (\sqrt{5} - 1)/2$ 가 경험적으로 좋은 결과를 냅니다.  

#### 3. 중간 제곱 방법 (Mid-Square Method)

$$
h(k) = k^2
$$

데이터의 상위/하위 비트에 치우침이 있을 때 균등한 분포를 얻습니다.

#### 4. 유니버설 해싱 (Universal Hashing)

다수의 해시 함수 집합 중 하나를 무작위로 선택하여 사용하는 방법입니다.

$$
h_{a,b}(k) = ((a k + b) \bmod p) \bmod m
$$

여기서  
$\Rightarrow$ $p$: 충분히 큰 소수  

$\Rightarrow$ $a, b$: 무작위 정수, $0 < a < p, 0 \le b < p$  

이는 적대적 입력(Adversarial Input)에 대한 평균 성능을 보장합니다.

---

### 충돌 해결 기법 (Collision Resolution)

#### 1. 체이닝 (Chaining)

각 버킷에 연결 리스트를 두어 충돌이 발생할 때 동일 인덱스에 여러 항목을 저장합니다.

$\Rightarrow$ 삽입: $O(1)$  

$\Rightarrow$탐색: 평균 $O(1)$, 최악 $O(n)$  

평균 검색 시간은 부하율(Load Factor)에 비례합니다.

$$
\alpha = \frac{n}{m}
$$

여기서  
$\Rightarrow$ $n$: 저장된 원소 개수  

$\Rightarrow$ $m$: 버킷 수  

평균 탐색 시간:  

$$
T_{\text{avg}} = O(1 + \alpha)
$$

#### 2. 개방 주소법 (Open Addressing)

모든 원소를 테이블 자체에 저장하고, 충돌 시 다른 버킷을 탐색합니다.

$\Rightarrow$ 선형 탐사 (Linear Probing)

$$
h_i(k) = (h(k) + i) \bmod m
$$

간단하지만 군집화(Clustering)가 발생하여 성능 저하되고 평균 검색 시간은 $O(\frac{1}{1 - \alpha})$ 수준입니다.

$\Rightarrow$ 이차 탐사 (Quadratic Probing)

$$
h_i(k) = (h(k) + c_1 i + c_2 i^2) \bmod m
$$

1차 군집화 문제 완화되지만 여전히 일부 패턴에서 충돌 가능합니다.

$\Rightarrow$ 이중 해싱 (Double Hashing)

$$
h_i(k) = (h_1(k) + i \cdot h_2(k)) \bmod m
$$

두 개의 서로 다른 해시 함수를 사용하고 군집화를 효과적으로 방지합니다. $h_2(k)$는 0이 아니어야 합니다.

---

### 동적 해싱 (Dynamic Hashing)

#### 확장 해싱 (Extendible Hashing)

버킷의 포인터를 트리(디렉터리)로 관리하여 필요 시 버킷을 분할(Split)합니다.  

$\Rightarrow$ 충돌 발생 시 버킷 분할  

$\Rightarrow$ 탐색은 $O(1)$, 디렉터리 접근은 로그 수준  

#### 선형 해싱 (Linear Hashing)

버킷을 순차적으로 확장하며, 재해시(Rehash) 비용을 분산합니다.  

$\Rightarrow$ 매 삽입마다 확률적으로 1개의 버킷만 분할  

$\Rightarrow$ 평균 재구성 비용: $O(1)$  

---

### 큐의 한계와 최적화

$\Rightarrow$ 고정 크기 큐에서는 Overflow/Underflow 발생  

$\Rightarrow$ 높은 삽입 빈도 시 Lock Contention(멀티스레드 환경) 발생  

---

### 참고 자료

[원본 경로 #1](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/) 

[원본 경로 #2](https://web.stanford.edu/class/archive/cs/cs161/cs161.1232/)  

[원본 경로 #3](https://sp21.datastructur.es/)

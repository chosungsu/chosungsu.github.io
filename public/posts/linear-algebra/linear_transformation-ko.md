---
title: 'Linear transformation'
date: '2023-03-17'
tags: ['Linear algebra', 'lecture']
---

### matrix as a function

변환이란 입출력이 모두 벡터인 함수를 의미하고 $T : R^n \rightarrow R^m$으로의 변환에서 $w=T(x)$를 벡터 $x$의 $T$에 대한 이미지, $x$를 벡터 $w$의 원이미지라고 합니다. $T(x) = Ax$와 같은 형태를 행렬변환이라고 합니다. 변환 과정에서 임의의 벡터 $u, v \in R^n$와 임의의 스칼라 k에 대해서 다음 조건들을 만족하면 선형변환(linear transformation)이라고 합니다.

-$T(u+v) = T(u) + T(v)$

-$T(ku) = kT(u)$

임의의 $v \in R^n$에 대해서  $T:R^n \rightarrow R^m$을 $T(v) = 0$으로 정의하면 $T$는 영변환이라고 하고 $T(v) = v$로 정의하면 항등변환이 됩니다.

---

### geometry meanings

길이가 보존되는 성질  $|T(x)| = |x|$를 갖는 선형변환 $T : R^n \rightarrow R^n$을 euclidean isometry라고 합니다. 그리고 $T(x) \cdot T(y) = x \cdot y, x, y \in R^n$ 처럼 내적보존도 가능합니다.

정사각행렬 $A$에 대해서 $A^{-1} = A^T$이면 직교행렬이라고 합니다.

$n$차의 정사각행렬 $A$에 대해서 아래의 조건은 모두 성립합니다.

-직교행렬의 전치행렬, 역행렬, 곱은 직교행렬이다.

-det$A$=1 또는 -1이다.

-열과 행벡터들은 정규직교이다.

---

### kernel and range

$T : R^n \rightarrow R^m$이 선형변환일 때 $T$에 의한 상이 0이 되는 $R^n$ 안의 벡터 전체집합을 핵(kernel)이라고 하고 이를 $kerT$로 나타냅니다. 즉 $kerT = \{v \in R^n | T(v) = 0\}$를 만족하는 것입니다. $kerT$는 $R^n$의 부분공간으로 핵공간으로 불립니다.

$T : R^n \rightarrow R^m$이 $T(u) = T(v)$ 이면서 $u = v$이면 단사(one-to-one, injection)라고 하고 $w \in R^m$에 대해 $T(v) = w$인 $v$가 존재하면 전사(onto, surjective)라고 합니다.

임의의 $v \in R^n$의 상 $T$ 전체의 집합을 치역이라고 하고 이를 $lmT$로 나타냅니다. 특히 치역이 $R^m$이면 전사라고 하며, $T$가 단사이면서 전사이면 $n=m$이 되어 이는 동형사상(isomorphism)이라고 합니다.

$T$가 단사이면 $A$ 행렬의 열벡터들이 일차독립이고 전사이면 행벡터들이 일차독립입니다.

---

### composition and reversibility

$T : R^n \rightarrow R^m$와 $S : R^k \rightarrow R^m$이 모두 선형변환이면 합성함수 $S \circ T$ 역시 선형변환입니다. 함수 $f : X \rightarrow Y$ 가 가역일 필요충분조건은 $f$가 전사이면서 단사인 경우입니다. $T : R^n \rightarrow R^n$이 가역이면 $T^{-1}$도 선형변환입니다.

---

### 참고 자료

[원본 경로 #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)
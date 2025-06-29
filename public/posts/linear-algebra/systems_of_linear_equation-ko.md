---
title: 'Systems of linear equation'
date: '2023-03-06'
tags: ['Linear algebra', 'lecture']
---

### systems of linear equation

선형방정식은 미지수 $x_1, x_2, …, x_n$에 계수곱으로 이루어진 일차식과 상수항으로 이루어진 방정식입니다. 만일 상수항이 모두 0인 연립방정식은 동차선형연립방정식이라고 합니다.

실수 또는 복소수를 직사각형 모양의 행과 열로 배열한 것을 행렬(matrix)이라고 합니다.

$$
\begin{bmatrix}
a_{11} &\cdots & a_{1n}\\\vdots &\ddots &\vdots\\
a_{m1} &\cdots & a_{mn}
\end{bmatrix}
$$

행렬 A의 i행, j열의 성분 $a_{ij}$를 A의 $(i, j)$ 성분이라고 하며 $a_{11}, a_{22}$등은 주대각선성분이라고 합니다. n개의 미지수를 갖는 m개의 일차방정식으로 이루어진 선형연립방정식을 $Ax=b$와 같이 간단히 작성이 가능하며 이 때 행렬 A를 계수행렬(coefficient matrix)이라고 하며 A에 b를 붙여서 만든 행렬은 첨가행렬(augmented matrix)이라고 합니다.

---

### gauss elimination and gauss-jordan elimination

소거법의 연산으로는 아래와 같습니다.

1.두 식을 교환한다.

2.한 식에 0이 아닌 실수를 곱한다.

3.한 식에 0이 아닌 실수배를 하여 다른 식에 더한다.

이러한 연산은 기본행 연산(ERO, Elementary Row Operations)이라고 합니다.

행렬 $A$에 기본행 연산을 시행하여 얻는 행렬을 $B$라고 하면 $A$와 $B$는 행동치(row equivalent)라고 합니다.

$m*n$ 행렬 $E$가 다음 3가지 성질을 만족할 때, 행 사다리꼴(REF, row echelon form)이라고 합니다.

1.성분이 모두 0인 행이 존재하면 그 행은 행렬의 맨 아래에 위치한다.

2.각 행에서 처음으로 나타나는 0이 아닌 성분은 1이다. 이 때 이 1을 그 행의 선행성분이라고 한다.

3.$i$행과 ($i+1$)행 모두에 선행성분이 존재하면 ($i+1$)행의 선행성분은 $i$행의 선행성분보다 오른쪽에 위치한다.

그리고 행렬 $E$가 다음 4번째 성질도 만족한다면 기약 행 사다리꼴(RREF)이라고 합니다.

1.선행성분을 포함하는 열의 선행성분 외의 성분은 모두 0이다.

<img src="https://velog.velcdn.com/images/devjo/post/ebf9bab2-8e54-4f5c-a1d5-ee1f31192bc7/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

자유변수는 첨가행렬의 RREF 중 선행성분 1을 포함하지 않는 열에 대응하는 변수이고 선행변수는 선행성분 1을 포함하는 열에 대응하는 변수를 의미합니다.

동치연립방정식은 $x=0$을 자명한 해로 갖습니다. 따라서 이 방정식에서는 자명한 해만을 갖는 경우와 무수한 해를 갖는 두 경우 밖에 나오지 않습니다.

---

### 참고 자료

[원본 경로 #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)
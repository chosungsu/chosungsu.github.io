---
title: 'Simplex method'
date: '2023-03-01'
tags: ['Linear algebra', 'lecture']
---

### Warm up

예를 들어 아이들에게 일주일에 최소 7개의 오렌지와 5개의 사과를 먹도록 급식 규칙을 정했다고 합니다. 또한 아이들이 일주일에 최소 15개를 먹도록 하고, 최대 25개를 초과하는 과일을 먹지 않도록 제한하였습니다. 이 때 오렌지가 사과보다 2배 많은 설탕을 갖고 있으며 사과가 5그램에 해당하면 아이들은 몇 개의 오렌지와 사과를 먹게 될 지 구하는 선형 계획법은 부등호(inequalities)로 구성되어 있을 것입니다.

위 문제에 대해 수식을 작성해보겠습니다.

$$
\begin{aligned}
& x \ge 5, \\
& y \ge 7, \\
& x + y \ge 15, \\
& x + y \le 25, \\
& s = 5x + 10y
\end{aligned}
$$

---

### Graphical solutions

제시된 수식에서 위의 4가지는 제약조건(constraints)라고 하며 이 조건을 만족하는 변수 값들은 feasible region을 구성합니다.

<img src="https://velog.velcdn.com/images/devjo/post/5ca6b525-c568-4396-9c6b-aa8208a60e24/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

그래프로 평면에 그리면 이와 같습니다. 오렌지$(y)$의 설탕이 최소화되어야 하므로 $y=7$이 되어야 하며 과일의 최소 양을 위해서 $x+y=15$ 선상에서 해가 있어야 하므로 $(8,7)$이라는 것을 알 수 있습니다. 이처럼 최적의 답은 거의 대부분 꼭짓점(vertex)에 있습니다.

---

### Dantzig's Algorithm (Simplex Method)

간단한 제약 조건은 그래프로 시각화가 가능하지만 대부분 수백만 개의 변수와 제약 조건이 있을 것이고 simplex method로 표현해야 합니다.

예를 들어 구하고자 하는 목적식은 $f = 3x-3y-z+4w$이며 제약조건이 $c_1 : x+y+z+w=5, c_2 : x+2y+z+2w=6, \{x, y, z, w\} \ge 0$이 있을 때, 목적식 역시 우항을 0으로 만든 방정식이 되도록 변환해서 첨가 행렬로 배열합니다.

$$
\begin{pmatrix}
1 & 1 & 1 & 1 & 0 & 5 \\
1 & 2 & 3 & 2 & 0 & 6 \\
-3 & 3 & 1 & -4 & 1 & 0
\end{pmatrix}
$$

피벗 연산을 사용하는데 마지막 행에서 가장 큰 음수를 찾고 이를 피벗 변수로 생각하여 소거합니다. 그리고 피벗 열의 다른 행값은 0이 되도록 해야 합니다.

$$
\begin{pmatrix}
1 & 1 & 1 & 1 & 0 & 5 \\
1 & 2 & 3 & 2 & 0 & 6 \\
-1 & 7 & 7 & 0 & 1 & 12
\end{pmatrix} \\
\downarrow \\
\begin{pmatrix}
1/2 & 0 & -1/2 & 0 & 0 & 2 \\
1 & 2 & 3 & 2 & 0 & 6 \\
-1 & 7 & 7 & 0 & 1 & 12
\end{pmatrix}
$$

다음으로는 마지막 행의 첫번째 열을 피벗 변수로 생각하여 소거합니다.

$$
\begin{pmatrix}
1/2 & 0 & -1/2 & 0 & 0 & 2 \\
1 & 2 & 3 & 2 & 0 & 6 \\
0 & 7 & 6 & 0 & 1 & 16
\end{pmatrix}
$$

이렇게 dantzig algorithm은 목적 함수가 양수일 때 종료됩니다. 이제 목적함수는 $f=16-7y-6z$로 변환되었고, $y=z=0$일 때 최댓값 16을 가집니다. 이때 첫 번째 행에서 $x=4$이고, 두 번째 행에서 $w=1$임을 알 수 있습니다. 따라서 최적해는 $(x,y,z,w)=(4,0,0,1)$입니다.

---

### 참고 자료

[원본 경로 #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[원본 경로 #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)
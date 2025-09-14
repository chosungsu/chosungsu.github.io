---
title: 'Transportation and Assignment Problems Ⅱ'
date: '2024-07-22'
tags: ['Operations Research 1', 'lecture']
---

### Loop and Loop Pivoting

#### Loop

A loop is an ordered sequence of at least 4 different cells that satisfies all three conditions below:

1.Two consecutive cells must be in the same row or column.

2.Three or more consecutive cells must not be in the same row or column.

3.The last cell must be in the same row or column as the first cell.

A loop can be thought of as a closed path.

<img src="https://velog.velcdn.com/images/devjo/post/a7e60fcb-a16f-4728-a880-9ace5314946f/image.png" style="display: block; margin: 0 auto; height:200;" />

In the image above, two consecutive cells are in the same row or column, satisfying condition 1. There are no three consecutive cells in the same row or column, satisfying condition 2. The first and last cells are in the same column, satisfying condition 3.

#### Loop Pivoting

First, determine the entering variable. Starting from the input variable, find a loop that includes some BVs. Since there is only one loop, you don't need to consider all BVs. Count the cells in the loop and label them as odd or even. Mark the entering variable as 0. Find the smallest value among all odd cells. Call this value $\theta$, which becomes the leaving variable. Decrease each odd cell by $\theta$ and increase each even cell by $\theta$.

For example, let's say we have a tableau where the first row has a total supply of 35, the second row 50, the third row 40, and the first column has a total demand of 45, second column 20, third column 30, and fourth column 30. The unit transportation costs for each cell are $\begin{bmatrix} 8 & 6 & 10 & 9 \\ 9 & 12 & 13 & 7 \\ 14 & 9 & 16 & 3 \end{bmatrix}$. And we previously found the BV values to be $\begin{bmatrix} 35 & 0 & 0 & 0 \\ 10 & 20 & 20 & 0 \\ 0 & 0 & 10 & 30 \end{bmatrix}$.

However, during the pivoting process, cost information and supply/demand information are not actually needed, so they can be omitted. After determining one entering variable, move to the segments representing BVs (segments where amounts were allocated in the previous BFS). Continue connecting the loop to allocated segments this way. If there are three or more consecutive cells in the same row or column, skip the middle and connect to the last cell. In this example, this creates a loop of $\begin{bmatrix} 0 & 1 & 2 & 3 & 4 & 5 & 0 \end{bmatrix}$ where odd cells are marked in green and even cells in red. The smallest allocation value among odd cells is 20, which we will add or subtract. This cell now becomes 0 as the starting point.

---

### Transportation Simplex Method

First, balance the problem. Find an initial BFS using one of three methods: northwest corner, minimum cost, or Vogel. Introduce auxiliary variables $u_i$ for each supply point and $v_i$ for each demand point. Update the cost coefficients ($c_{ij}$) using $u_1=0$ and $u_i+v_j=c_{ij}$ for all BVs. Calculate $w_{ij}=u_i+v_j-c_{ij}$ for all NBVs. If all $w_{ij} \le 0$, the current BFS is optimal. If not, select the variable with the largest $w_{ij}$ value as the entering variable. Use loop pivot to obtain a new BFS and move to step 3.

Using the same transportation problem as above, since there are 3 rows and 4 columns, we add 3 $u$, $v$ variables.

$u_1=0, u_1+v_1=8 \rightarrow v_1 = 8$

$u_2+v_1=9 \rightarrow u_2 = 1$

$u_2+v_2=12 \rightarrow v_2 = 11$

$u_2+v_3=13 \rightarrow v_3 = 12$

$u_3+v_3=16 \rightarrow u_3 = 4$

$u_3+v_4=5 \rightarrow v_4 = 1$

After updating all BVs this way, we now calculate the NBVs.

$w_{12}=u_1+v_2-c_{12} \rightarrow 5$

$w_{13}=u_1+v_3-c_{13} \rightarrow 2$

$w_{14}=u_1+v_4-c_{14} \rightarrow -8$

$w_{24}=u_2+v_4-c_{24} \rightarrow -5$

$w_{31}=u_3+v_1-c_{31} \rightarrow -2$

$w_{32}=u_3+v_2-c_{32} \rightarrow 6$

If all $w_{ij}$ were negative, we would be at the optimal solution, but since that's not the case, the cell with the largest value of 6 becomes the entering variable. We perform pivoting based on this value.

There is only one loop, $\begin{bmatrix} 0 & 1 & 2 & 3 & 0 \end{bmatrix}$. Among these, odd cells are marked in green and even cells in red. The smallest allocation value among odd cells is 10, which we will add or subtract. This cell now becomes 0 as the starting point. The modified BV values are $\begin{bmatrix} 35 & 0 & 0 & 0 \\ 10 & 10 & 30 & 0 \\ 0 & 10 & 0 & 30 \end{bmatrix}$, and we update u and v again.

$u_1=0, u_1+v_1=8 \rightarrow v_1 = 8$

$u_2+v_1=9 \rightarrow u_2 = 1$

$u_2+v_2=12 \rightarrow v_2 = 11$

$u_2+v_3=13 \rightarrow v_3 = 12$

$u_3+v_2=9 \rightarrow u_3 = -2$

$u_3+v_4=5 \rightarrow v_4 = 7$

After updating all BVs this way, we now calculate the NBVs.

$w_{12}=u_1+v_2-c_{12} \rightarrow 5$

$w_{13}=u_1+v_3-c_{13} \rightarrow 2$

$w_{14}=u_1+v_4-c_{14} \rightarrow -2$

$w_{24}=u_2+v_4-c_{24} \rightarrow 1$

$w_{31}=u_3+v_1-c_{31} \rightarrow -8$

$w_{33}=u_3+v_3-c_{33} \rightarrow -6$

If all $w_{ij}$ were negative, we would be at the optimal solution, but since that's not the case, the cell with the largest value of 5 becomes the entering variable. We perform pivoting based on this value. After repeating this process, the optimal solution has BVs of $x_{12}=10, x_{13}=25, x_{21}=45, x_{23}=5, x_{32}=10, x_{34}=30$ with $z^*=6*10+10*25+9*45+13*5+9*10+5*30=1020$.

---

### Transshipment Problem

In a typical transportation problem, products are transported directly from supply points to demand points. In real situations, there may be several transshipment points along the route, and we can find a solution by converting the transshipment problem into a transportation problem.

To do this, we need to construct the original transportation problem ignoring the transshipment points and add rows and columns to the tableau for each transshipment point, setting both supply and demand equal to the original supply amount.

For example, suppose Factory 1 can produce up to 150 products and Factory 2 can produce up to 200 products. The products are delivered to Customer 1 and Customer 2, each requiring a minimum of 130 products. There are also two transshipment points which might make transportation cheaper.

|  | $T_1$ | $T_2$ | $C_1$ | $C_2$ |
|----------|---------|----------|---------|----------|
| $F_1$ | 8 | 13 | 25 | 28 |
| $F_2$ | 15 | 12 | 26 | 25 |
| $T_1$ | 0 | 6 | 16 | 17 |
| $T_2$ | 6 | 0 | 14 | 16 |

With this tableau, while the cost of moving directly from $F_1$ to $C_1$ is $25$, going through $T_1$ to $C_1$ would cost $8+16=24$, which could be cheaper. To optimize this problem, we need to create a tableau for the two factories and two customers, ignoring the transshipment points.

|  | $C_1$ | $C_2$ |
|----------|---------|----------|
| $F_1$ | 25 | 28 |
| $F_2$ | 26 | 25 |

First, checking the balance of supply and demand, we see that $350 \ne 260$, so it's not balanced. Therefore, we add a dummy variable with a demand of 90.

|  | $C_1$ | $C_2$ | $d_1$ |
|----------|---------|----------|----------|
| $F_1$ | 25 | 28 | 0 |
| $F_2$ | 26 | 25 | 0 |

Now we add rows and columns for the transshipment points and modify the tableau so that supply and demand are both equal to 350.

|  | $T_1$ | $T_2$ | $C_1$ | $C_2$ | $d_1$ |
|----------|---------|----------|---------|----------|----------|
| $F_1$ | 8 | 13 | 25 | 28 | 0 |
| $F_2$ | 15 | 12 | 26 | 25 | 0 |
| $T_1$ | 0 | 6 | 16 | 17 | 0 |
| $T_2$ | 6 | 0 | 14 | 16 | 0 |

---

### Assignment Problem & Hungarian Method

#### Assignment Problem

When a company needs to transfer 4 employees to 4 cities, each employee must be transferred to only one city.

|  | $C_1$ | $C_2$ | $C_3$ | $C_4$ |
|----------|---------|----------|---------|----------|
| $E_1$ | 14 | 5 | 8 | 7 |
| $E_2$ | 2 | 12 | 6 | 5 |
| $E_1$ | 7 | 8 | 3 | 9 |
| $E_2$ | 2 | 4 | 6 | 10 |

In this problem, the decision variable is $x_{ij}= \begin{cases} 1 \\ 0 \end{cases}$ where 1 indicates employee $i$ is transferred to city $j$, and 0 otherwise. The objective function is min $z = 14x_{11}+5x_{12}+8x_{13}+7x_{14}+2x_{11}+12x_{12}+6x_{13}+5x_{14}+7x_{11}+8x_{12}+3x_{13}+9x_{14}+2x_{11}+4x_{12}+6x_{13}+10x_{14}$ with constraints $x_{11}+x_{12}+x_{13}+x_{14}=1$, $x_{21}+x_{22}+x_{23}+x_{24}=1$, $x_{31}+x_{32}+x_{33}+x_{34}=1$, $x_{41}+x_{42}+x_{43}+x_{44}=1$, $x_{11}+x_{21}+x_{31}+x_{41}=1$, $x_{12}+x_{22}+x_{32}+x_{42}=1$, $x_{13}+x_{23}+x_{33}+x_{43}=1$, $x_{14}+x_{24}+x_{34}+x_{44}=1$.

#### Hungarian Method

The basic simplex method has evolved into a new transportation method. This method works when the number of rows and columns is equal to $m$. Find the minimum cost in each row and subtract it from each cost in that row. In the new matrix, find the minimum cost in each column and subtract it from each cost in that column. Next, draw lines through the minimum number of rows or columns needed to cover all zeros. If the number of lines equals $m$, an optimal solution can be found among the covered zeros. If it's less than $m$, proceed to the next step. Find the smallest non-zero element that isn't covered by lines from the previous step. Let's call this element $k$. Subtract $k$ from each uncovered element and add $k$ to each element covered by two lines. Then return to the previous step for evaluation.

Using the above tableau, we start with minimum values of 5 for the first row, 2 for the second row, 3 for the third row, and 2 for the fourth row, subtracting these to get:

|  | $C_1$ | $C_2$ | $C_3$ | $C_4$ |
|----------|---------|----------|---------|----------|
| $E_1$ | 9 | 0 | 3 | 2 |
| $E_2$ | 0 | 10 | 4 | 3 |
| $E_1$ | 4 | 5 | 0 | 6 |
| $E_2$ | 0 | 2 | 4 | 8 |

Here, the minimum values are 0 for the first column, 0 for the second column, 0 for the third column, and 2 for the fourth column. Subtracting these gives:

|  | $C_1$ | $C_2$ | $C_3$ | $C_4$ |
|----------|---------|----------|---------|----------|
| $E_1$ | 9 | 0 | 3 | 0 |
| $E_2$ | 0 | 10 | 4 | 1 |
| $E_1$ | 4 | 5 | 0 | 4 |
| $E_2$ | 0 | 2 | 4 | 6 |

Now draw lines to cover all zeros, choosing the first row, first column, and third row or column (choosing row). Since this gives us 3 lines, less than $m$, we move to the next step and use the smallest uncovered non-zero number $k=1$ to subtract from uncovered cells and add to cells covered by two lines:

|  | $C_1$ | $C_2$ | $C_3$ | $C_4$ |
|----------|---------|----------|---------|----------|
| $E_1$ | 10 | 0 | 3 | 0 |
| $E_2$ | 0 | 9 | 3 | 0 |
| $E_1$ | 5 | 5 | 0 | 4 |
| $E_2$ | 0 | 1 | 3 | 5 |

Repeating the previous step, we draw lines through the first row, first column, fourth column, and third row or column (choosing row), giving us 4 lines equal to $m$, reaching the optimal solution. We can use the covered zeros. Converting all zeros to 1 and erasing the rest, then adjusting to meet constraints:

|  | $C_1$ | $C_2$ | $C_3$ | $C_4$ |
|----------|---------|----------|---------|----------|
| $E_1$ |  | 1 |  | 1 |
| $E_2$ | 1 |  |  | 1 |
| $E_1$ |  |  | 1 |  |
| $E_2$ | 1 |  |  |  |

Here, $x_{12}=1$, $x_{33}=1$ satisfy the constraints, so we keep these 1s and set $x_{14}=0$ to meet row conditions, which naturally leads to $x_{24}=1$, $x_{21}=0$, $x_{41}=1$.

|  | $C_1$ | $C_2$ | $C_3$ | $C_4$ |
|----------|---------|----------|---------|----------|
| $E_1$ |  | 1 |  | 0 |
| $E_2$ | 0 |  |  | 1 |
| $E_1$ |  |  | 1 |  |
| $E_2$ | 1 |  |  |  |

Thus, the optimal solution value is 15.

---

### References

[Original Source #1](https://youtu.be/JdYD2EyCs04?si=el-IXcVOZ5WcPyH4)

[Original Source #2](https://youtu.be/tZ0cfYuSIuk?si=rCU7brEKSDonyQSs)

[Original Source #3](https://youtu.be/Ce_0SwpU1V4?si=29V10rz5GK6z5gQ1)

[Original Source #4](https://youtu.be/ltgSRxlUoWw?si=RnSKznV44wV9MHI-)



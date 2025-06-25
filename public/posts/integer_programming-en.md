---
title: 'Integer programming'
date: '2024-07-29'
tags: ['Operations Research 1', 'lecture']
---

### Integer programming vs linear programming relaxation

In integer programming, when all decision variables must be integers, it is called a pure IP problem. When only some decision variables need to be integers, it is called a mixed IP problem. When all decision variables must be 0 or 1, it is called a 0-1 IP problem.

The LP problem obtained by omitting all integer or 0-1 constraints on variables is called the LP relaxation of the IP problem.

Regarding the question of which has a wider feasible region between IP and LP relaxation, and which has a larger optimal $z$ value in maximization problems, the answer is that LP relaxation is wider. This is because LP relaxation allows variables to take both integer and fractional values, thus having a wider range of options that includes the largest $z$. Also, the optimal solution obtained by rounding in the LP problem is not the optimal solution of the actual IP problem.

---

### Branch and bound

A minimization IP or mixed IP problem can be converted to a maximization problem by maximizing the opposite of the objective function. First, set $z^*$ to negative infinity. Next, use the branching method, which selects the most recently generated unsolved subproblem. Choose a branch variable that is not included in the optimal solution of the LP relaxation of the subproblem but must be integer. When $x_j$ is the branch variable and $x_j^*$ is the optimal solution, create two new subproblems by adding constraints $x_j \le x_j^*$ for the lower bound and $x_j \ge x_j^*$ for the upper bound. Next, use the bounding method to find the optimal $z$ value of the LP relaxation for each new subproblem. This is the branch upper bound of the subproblem.

If any of the following three tests is true, mark the new subproblem as fathomed:

-$z \le z^*$

-The LP relaxation has no feasible solution.

-The optimal solution of the LP relaxation has integer values for all integer-constrained variables. If this test is true, update $z^*$ and retest F1.

When a new subproblem is fathomed, the current $z^*$ is optimal, and return to branching.

#### MIP (Mixed Integer Programming)

Consider a maximization problem with max $z=4x_1-2x_2+7x_3-x_4$ and constraints $x_1+5x_3 \le 10$, $x_1+x_2-x_3 \le 1$, $6x_1-5x_2 \le 0$, $-x_1+2x_3-2x_4 \le 3$ where all constraint variables are greater than 0. This is the LP relaxation, and if we add that some variables must be integers, it becomes an MIP problem.

First, set $z^*$ to negative infinity, then solve using the simplex method to get $(x_1, x_2, x_3, x_4)=(1.25, 1.5, 1.75, 0)$ with $z=14.25$. However, the $z$ value is not less than or equal to negative infinity. Also, since the decision variables are not integers, additional calculations are needed. Divide the search space into $x_1 \le 1$ and $x_1 \ge 2$. The first subproblem gives $(x_1, x_2, x_3, x_4)=(1, 1.2, 1.8, 0)$, but the second subproblem is infeasible. For the first subproblem, create two new subproblems by dividing it into $x_2 \le 1$ and $x_2 \ge 2$. The first subproblem gives $(x_1, x_2, x_3, x_4)=(0.83, 1, 1.83, 0)$, and the second subproblem gives $(x_1, x_2, x_3, x_4)=(0.83, 2, 1.83, 0)$. Since both are unfathomed, create new subproblems with $x_1=0$ and $x_1=1$. The first subproblem gives $(x_1, x_2, x_3, x_4)=(0, 0, 2, 0.5)$, and the second subproblem is infeasible. At this point, since the decision variables are integers, update $z^*=z=13.5$.

#### BIP (Binary Integer Programming)

Consider a maximization problem with max $z=9x_1+5x_2+6x_3+4x_4$ and constraints $6x_1+3x_2+5x_3+2x_4 \le 10$, $x_3+x_4 \le 1$, $-x_1+x_3 \le 0$, $-x_2+x_4 \le 0$ where all constraint variables are greater than 0. This is the LP relaxation, and if we add that variables must be 0 or 1, it becomes a BIP problem.

First, set $z^*$ to negative infinity, then solve using the simplex method to get $(x_1, x_2, x_3, x_4)=(0.83, 1, 0, 1)$ with $z=16$. Since $x_1$ is not an integer (0 or 1), choose it as the branch variable to create new subproblems. The first subproblem is $x_1=0$, and the second subproblem is $x_1=1$. Solving with the simplex method gives $(x_1, x_2, x_3, x_4)=(0, 1, 0, 1)$ with $z=9$ for the first subproblem, and $(x_1, x_2, x_3, x_4)=(0, 0.8, 0, 0.8)$ with $z=16$ for the second subproblem. Since the first subproblem satisfies the constraints, update $z^*=z=9$. In the second subproblem, choose $x_2$ as the branch variable and create new subproblems. The first subproblem is $x_2=0$, and the second subproblem is $x_2=1$. Solving with the simplex method gives $(x_1, x_2, x_3, x_4)=(1,0,0.8,0)$ with $z=13$ for the first subproblem, and $(x_1, x_2, x_3, x_4)=(1,1,0,0.5)$ with $z=16$ for the second subproblem. Since both problems are unfathomed, continue creating new subproblems. The first subproblem is $x_4=0$, and the second subproblem is $x_4=1$. The result is $(x_1, x_2, x_3, x_4)=(1, 1, 0, 0)$ with $z=14$ for the first subproblem, and the second subproblem is infeasible. Since this $z$ value is better, update $z^*=z=14$.

---

### Knapsack problem

For example, when John's apartment catches fire and he needs to grab some valuables to escape, he should refer to the tableau below containing weight and value information.

| item | weight | value | value/weight |
|----------|---------|----------|----------|
| 1 | 5 | 16 | 16/5=3.2 |
| 2 | 7 | 22 | 22/7=3.14 |
| 3 | 4 | 12 | 12/4=3 |
| 4 | 3 | 8 | 8/3=2.67 |

He can only use one knapsack that can carry a maximum of 14 pounds, and we will calculate which items are possible. First, let the decision variable be $x_j$, where 1 means John grabbed that item and 0 means he didn't. The objective function is max $z=16x_1+22x_2+12x_3+8x_4$, and the constraint is $5x_1+7x_2+4x_3+3x_4 \le 14$ with $x_j=0$ or $x_j=1$, which can be solved as a BIP problem.

First, calculate the value/weight ratio for each item. Put the best item first, then the next best item, and repeat until it overflows. Consider the remaining space as a fraction. From the tableau above, put the best item 1 first, leaving 9 pounds, then put the next best item 2, leaving 2 pounds. No item fits entirely in the remaining space, but item 3 can fit half, so it's considered as 0.5. The remaining item 4 cannot fit, so it's 0, giving $z=16+22+12*0.5=44$ as the optimal solution.

---

### Job shop scheduling problem

This is a problem where $n$ jobs need to be processed on a single machine, we know the duration and due date of each job, and we want to minimize the total job delay. That is, there are $n!$ possible ways.

| job | duration | due date |
|----------|---------|----------|
| $A$ | 6 | day 8 |
| $B$ | 4 | day 4 |
| $C$ | 5 | day 12 |

In this tableau, if we set the job order as $(A, B, C)$, it becomes as follows. If the delay is negative, it means it finished earlier, so we set it to 0.

| job | completion | delay |
|----------|---------|----------|
| $A$ | 6 | $6-8=-2 \rightarrow 0$ |
| $A, B$ | 6+4=10 | 10-4=6 |
| $A, B, C$ | 6+4+5=15 | 15-12=3 |

The total delay time for this job is $T=0+6+3=9$. This corresponds to one of the orders and can be solved using the branch-and-bound method. The decision variable $x_{ij}$ is 1 if job $j$ is placed in the $i$-th position, and 0 otherwise.

For example, put each job in the last node like $x_{3A}=1$, $x_{3B}=1$, $x_{3C}=1$. At this point, the completion time is 15, and the delay times for the first case are $(15-8=7, 15-4=11, 15-12=3)$ days. Among these, the third case has the least delay time, so create a new subproblem of putting $A$ and $B$ in the second node. The first problem has a completion time of $A$ as 15-5=10, with delay time 10-8=2 days plus the existing delay time of 3 days, totaling 5 days. The second problem has a completion time of 15-5=10, with delay time 10-4=6 days plus the existing delay time of 3 days, totaling 9 days. Finally, from the first problem which has the shorter delay time among the two, considering the order $BAC$, the completion time is 15-5-6=4, with delay time 4-4=0 days plus the existing delay time of 5 days, totaling 5 days.

Therefore, the most optimal job schedule is 15 days with a delay of 5 days.

---

### Traveling salesman problem

This is a problem where you need to visit cities 1~5 once each for business purposes, but you must return to the starting city.

|  | city1 | city2 | city3 | city4 | city5 |
|----------|---------|----------|----------|---------|----------|
| city1 | $M$ | 132 | 217 | 164 | 58 |
| city2 | 132 | $M$ | 290 | 201 | 79 |
| city3 | 217 | 290 | $M$ | 113 | 303 |
| city4 | 164 | 201 | 113 | $M$ | 196 |
| city5 | 58 | 79 | 303 | 196 | $M$ |

In the tableau above, the decision variable $c_{ij}$ represents the distance from city $i$ to city $j$. Here, the points marked with $M$ are marked with a sufficiently large positive number to prevent movement between the same cities. This decision variable is 1 if you visit that city, and 0 otherwise. Define auxiliary variables $u_i$ for each city.

The objective function is defined as min $z=\sum_{i=1}^{N}\sum_{j=1}^{N} c_{ij}x_{ij}$, and the constraints are $\sum_{i=1}^{N} x_{ij}=1$ to limit visits to once, $\sum_{j=1}^{N} x_{ij}=1$ to limit departures to once, and $u_i-u_j+Nx_{ij} \le N-1$ to ensure there are no subtours (like 1->2->3->1) that don't visit all cities.

#### Hungarian method

First, find the minimum cost in each row of the matrix. Subtract the minimum cost of each row from each cost. Find the minimum cost in each column of the modified matrix and subtract it similarly. Next, calculate the penalty for all zeros by adding the minimum value in the same row and the minimum value in the same column, excluding the cell itself, for cells containing 0. Choose the 0 that gives the largest penalty. Include the arc from row to column in the visit. Then delete the corresponding row and column.

Using the tableau above, find the minimum value for each row: $(R_1, R_2, R_3, R_4, R_5) = (58, 79, 113, 113, 58)$. Subtracting these values from each row gives the following modification:

|  | city1 | city2 | city3 | city4 | city5 |
|----------|---------|----------|----------|---------|----------|
| city1 | $M$ | 74 | 159 | 106 | 0 |
| city2 | 53 | $M$ | 211 | 122 | 0 |
| city3 | 104 | 177 | $M$ | 0 | 190 |
| city4 | 51 | 88 | 0 | $M$ | 83 |
| city5 | 0 | 21 | 245 | 138 | $M$ |

Now find the minimum value for each column: $(C_1, C_2, C_3, C_4, C_5) = (0, 21, 0, 0, 0)$. Subtracting these values from each column gives the following modification:

|  | city1 | city2 | city3 | city4 | city5 |
|----------|---------|----------|----------|---------|----------|
| city1 | $M$ | 53 | 159 | 106 | 0 |
| city2 | 53 | $M$ | 211 | 122 | 0 |
| city3 | 104 | 156 | $M$ | 0 | 190 |
| city4 | 51 | 67 | 0 | $M$ | 83 |
| city5 | 0 | 0 | 245 | 138 | $M$ |

Next, calculate the penalty for cells containing 0: $p_{15}=53+0=53$, $p_{25}=53+0=53$, $p_{34}=104+106=210$, $p_{43}=51+159=210$, $p_{51}=0+51=51$, $p_{52}=0+53=53$. The cell giving the largest penalty is $p_{34}=p_{43}=210$, which are the same, so arbitrarily choose one and include $C \rightarrow D$ as an arc. Do not consider the reverse direction. Therefore, delete row 3 and column 4, then also delete the cell corresponding to the reverse arc.

|  | city1 | city2 | city3 | city4 | city5 |
|----------|---------|----------|----------|---------|----------|
| city1 | - | 53 | 159 | - | 0 |
| city2 | 53 | - | 211 | - | 0 |
| city3 | - | - | - | $C \rightarrow D$ | - |
| city4 | 51 | 67 | - | - | 83 |
| city5 | 0 | 0 | 245 | - | - |

Repeating this, the minimum value for each row is $(R_1, R_2, R_4, R_5) = (0, 0, 51, 0)$. Subtracting these values from each row gives the following modification:

|  | city1 | city2 | city3 | city4 | city5 |
|----------|---------|----------|----------|---------|----------|
| city1 | - | 53 | 159 | - | 0 |
| city2 | 53 | - | 211 | - | 0 |
| city3 | - | - | - | $C \rightarrow D$ | - |
| city4 | 0 | 16 | - | - | 32 |
| city5 | 0 | 0 | 245 | - | - |

Now find the minimum value for each column: $(C_1, C_2, C_3, C_5) = (0, 0, 159, 0)$. Subtracting these values from each column gives the following modification:

|  | city1 | city2 | city3 | city4 | city5 |
|----------|---------|----------|----------|---------|----------|
| city1 | - | 53 | 0 | - | 0 |
| city2 | 53 | - | 52 | - | 0 |
| city3 | - | - | - | $C \rightarrow D$ | - |
| city4 | 0 | 16 | - | - | 32 |
| city5 | 0 | 0 | 86 | - | - |

Next, calculate the penalty for cells containing 0: $p_{13}=0+52=52$, $p_{15}=0+0=0$, $p_{25}=52+0=52$, $p_{41}=16+0=16$, $p_{51}=0+0=0$, $p_{52}=0+16=16$. The cell giving the largest penalty is $p_{13}=p_{25}=52$, which are the same, so arbitrarily choose one and include $A \rightarrow C$ as an arc. Do not consider the reverse direction. Therefore, delete row 1 and column 3, then also delete the cell corresponding to the reverse arc.

|  | city1 | city2 | city3 | city4 | city5 |
|----------|---------|----------|----------|---------|----------|
| city1 | - | - | $A \rightarrow C$ | - | - |
| city2 | 53 | $M$ | - | - | 0 |
| city3 | - | - | - | $C \rightarrow D$ | - |
| city4 | 0 | 16 | - | - | 32 |
| city5 | 0 | 0 | - | - | - |

The minimum value for each row and column is 0, so proceed. Next, calculate the penalty for cells containing 0: $p_{25}=53+32=85$, $p_{41}=16+0=16$, $p_{51}=0+0=0$, $p_{52}=0+16=16$. The cell giving the largest penalty is $p_{25}=85$, so include $B \rightarrow E$ as an arc. Do not consider the reverse direction. Therefore, delete row 2 and column 5, then also delete the cell corresponding to the reverse arc.

|  | city1 | city2 | city3 | city4 | city5 |
|----------|---------|----------|----------|---------|----------|
| city1 | - | - | $A \rightarrow C$ | - | - |
| city2 | - | $M$ | - | - | - |
| city3 | - | - | - | $C \rightarrow D$ | - |
| city4 | 0 | 16 | - | - | - |
| city5 | 0 | - | - | - | - |

The minimum value for each row is 0, so proceed. The minimum value for each column is (0, 16), so subtract it. After that, the penalty for each 0 becomes 0. Arbitrarily choose the cell in row 5, column 1 and include $E \rightarrow A$ as an arc. Do not consider the reverse direction. Finally, include the remaining cell in row 4, column 2 as $D \rightarrow B$ arc, then finish.

Therefore, the path becomes $A \rightarrow C \rightarrow D \rightarrow B \rightarrow E \rightarrow A$. The total length of this path is $217+113+201+79+58=668$.

---

### References

[Original source #1](https://youtu.be/vHXishYefss?si=a3cFJeyfiK3gGbDW)

[Original source #2](https://youtu.be/tBUfL3O_Nzg?si=znxz_y5DuDZXINVu)

[Original source #3](https://youtu.be/KhDv42KC5KM?si=tVLAnkyoC0N-4nfH)

[Original source #4](https://youtu.be/UGvc-qujB-o?si=li6qKG445JcepXaD)

[Original source #5](https://youtu.be/nRJSFtscnbA?si=bCa_L5KSPeb9oAMv)

[Original source #6](https://youtu.be/gSJGAaC8VT4?si=MCAqkDJSYcWLd-xJ)
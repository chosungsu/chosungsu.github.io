---
title: 'Solving LP problems : Simplex method'
date: '2024-07-12'
tags: ['Operations Research 1', 'lecture']
---

### standard LP form

Before solving LP problems with the simplex method, they must be converted to standard form. All constraints must be equations, and all decision variables must be non-negative. If there are inequalities with a direction of $\le$, slack variables ($s_i$) are added to convert them into equations, ensuring their values are also non-negative. In the opposite direction, excess variables ($e_i$) are subtracted to convert them into equations, also ensuring their values are non-negative.

Therefore, the standard form is as follows:

$$
max \\
z = c^Tx \\
s.t \\
Ax=b \\
x \ge 0
$$

---

### basic feasible solution

In standard form, there are $n$ variables and $m$ constraints ($n \ge m$). A basic solution involves selecting $m$ out of $n$ variables or $n-m$ out of $n$ variables to find the NBV. This is calculated as $\frac{n!}{m!(n-m)!}$.

A basic solution where all variables are non-negative is called a basic feasible solution (BFS).

For example, consider the following LP problem:

$$
max \\
z = 3x_1 + 2x_2 \\
s.t \\
2x_1+x_2 \le 9 \\
x_1+2x_2 \le 9 \\
x_i \ge 0 (i = 1,2)
$$

Slack variables are added according to the direction of the inequalities.

$$
max \\
z = 3x_1 + 2x_2 \\
s.t \\
2x_1+x_2+s_1 = 9 \\
x_1+2x_2+s_2 = 9 \\
x_i \ge 0 (i = 1,2); s_i \ge 0 (i=1,2)
$$

This results in 4 $n$ and 2 $m$, with $n-m=2$ NBV and $m=2$ BV. Calculating this gives $\begin{pmatrix} n \\ m \end{pmatrix} = 6$. The following table summarizes all combinations.

| NBV Combination | BV Combination | BFS ($x_1, x_2$) |
|----------|---------|----------|
| $x_1,x_2 \rightarrow x_1=x_2=0$ | $s_1,s_2 \rightarrow s_1=9, s_2=9$ | Y |
| $x_1,s_1 \rightarrow x_1=s_1=0$ | $x_2,s_2 \rightarrow x_2=9, s_2=-9$ | N |
| $x_1,s_2 \rightarrow x_1=s_2=0$ | $x_2,s_1 \rightarrow x_2=4.5, s_1=4.5$ | Y |
| $x_2,s_1 \rightarrow x_2=s_1=0$ | $x_1,s_2 \rightarrow x_1=4.5, s_2=4.5$ | Y |
| $x_2,s_2 \rightarrow x_2=s_2=0$ | $x_1,s_1 \rightarrow x_1=9, s_1=-9$ | N |
| $s_1,s_2 \rightarrow s_1=s_2=0$ | $x_1,x_2 \rightarrow x_1=3, x_2=3$ | Y |

The feasible region of an LP is a convex set, and BFS are extreme points of the feasible region. LPs have a finite number of BFS because the number of extreme points is limited. Finally, if an LP problem has an optimal solution, there must be an optimal extreme point (leading feasible).

#### adjacent BFS

For any LP with $m$ constraints, two BFS are adjacent if they share $m-1$ BV. In the table above, BFS 1 is adjacent to BFS 3 and 4, as they share at least one of $s_1$ or $s_2$ and are BFS.

---

### entering variable, leaving variable, ratio test and pivoting

$$
max \\
z = 3x_1 + 2x_2 \\
s.t \\
2x_1+x_2+s_1 = 9 \\
x_1+2x_2+s_2 = 9 \\
x_i \ge 0 (i = 1,2); s_i \ge 0 (i=1,2)
$$

In this standard form, the objective function is moved to the left side as $z-3x_1-2x_2 = 0$. This is denoted as $R_0$, and the constraints are denoted as $R_1$ and $R_2$. This structure is called the simplex canonical form. Based on this, a simplex tableau can be created.

| $z$ | $x_1$ | $x_2$ | $s_1$ | $s_2$ | RHS |
|----------|---------|----------|---------|----------|----------|
| 1 | -3 | -2 | 0 | 0 | 0 |
| 0 | 2 | 1 | 1 | 0 | 9 |
| 0 | 1 | 2 | 0 | 1 | 9 |

With 4 $n$ and 2 $m$, $n-m$ is 2 NBV, resulting in $\begin{pmatrix} n \\ m \end{pmatrix} = 6$. Generally, if the RHS of the constraints is non-negative, slack variables can be used as BV. If negative, it violates the sign restriction.

By keeping all other NBV at 0 and increasing some NBV from the current value of 0, we can see if improvement is possible. For example, if the two NBV are $x_1$ and $x_2$, increasing $x_1$ from 0 to 1 increases $z$ by 3. Similarly, increasing $x_2$ from 0 to 1 increases $z$ by 2. Therefore, increasing one improves $z$.

When $x_1$ increases, it enters the BV set, making it the entering variable. In the ratio test, the ratio for all constraints with a positive coefficient for the entering variable is calculated as rhs of constraint row/coef of entering var in constraint row. The constraint with the smallest ratio is the winner of the ratio test. In the simplex tableau above, in row $R_1$, when $x_1$ is 0, $s_1=9$, but when increased to 1, $s_1 = 9-2x_1 \ge 0 \rightarrow x_1 \le 9/2$, resulting in a ratio of 9/2. Similarly, in row $R_2$, when increased to 1, $s_2 = 9-x_1 \ge 0 \rightarrow x_1 \le 9$, resulting in a ratio of 9. The winner of the ratio test (pivot row) is $R_1$, meaning elementary row operations (ERO) must be used to make all other rows have a coefficient of 0. When $x_1$ is set as the entering variable and becomes a BV, the existing BV $s_1$ becomes the leaving variable. Below is the ERO process.

| $z$ | $x_1$ | $x_2$ | $s_1$ | $s_2$ | RHS |
|----------|---------|----------|---------|----------|----------|
| 1 | -3 | -2 | 0 | 0 | 0 |
| 0 | $2 \rightarrow 1$ | $1 \rightarrow 1/2$ | $1 \rightarrow 1/2$ | 0 | $9 \rightarrow 9/2$ |
| 0 | 1 | 2 | 0 | 1 | 9 |

| $z$ | $x_1$ | $x_2$ | $s_1$ | $s_2$ | RHS |
|----------|---------|----------|---------|----------|----------|
| 1 | $-3 \rightarrow 0$ | $-2 \rightarrow -1/2$ | $0 \rightarrow 3/2$ | 0 | $0 \rightarrow 27/2$ |
| 0 | 1 | 1/2 | 1/2 | 0 | 9/2 |
| 0 | 1 | 2 | 0 | 1 | 9 |

| $z$ | $x_1$ | $x_2$ | $s_1$ | $s_2$ | RHS |
|----------|---------|----------|---------|----------|----------|
| 1 | 0 | -1/2 | 3/2 | 0 | 27/2 |
| 0 | 1 | 1/2 | 1/2 | 0 | 9/2 |
| 0 | $1 \rightarrow 0$ | $2 \rightarrow 3/2$ | $0 \rightarrow -1/2$ | 1 | $9 \rightarrow 9/2$ |

After completing the ERO, the BV becomes $x_1$, $s_2$, and the NBV becomes $x_2$, $s_1$. With all NBV set to 0, the BV calculation gives $z=27/2$, indicating a move to an adjacent BFS with the largest z value after pivoting. However, examining the objective function moved to the left side again shows $z = 27/2 + x_2/2 - 3s_1/2$, indicating that increasing NBV can still improve $z$ if the largest negative coefficient, $x_2$, is changed.

Below is the process for the second ratio test.

In $R_1'$, $x_1 = 9/2 \rightarrow x_1 = 9/2 - x_2/2 \ge 0$, satisfying $x_2 \le 9$, and in $R_2'$, $s_x=9/2 \rightarrow s_2=9/2-3x_2/2 \ge 0$, satisfying $x_2 \le 3$. Therefore, $R_2'$ is the pivot row. Below is the ERO process again.

| $z$ | $x_1$ | $x_2$ | $s_1$ | $s_2$ | RHS |
|----------|---------|----------|---------|----------|----------|
| 1 | 0 | -1/2 | 3/2 | 0 | 27/2 |
| 0 | 1 | 1/2 | 1/2 | 0 | 9/2 |
| 0 | 0 | $3/2 \rightarrow 1$ | $-1/2 \rightarrow -1/3$ | $1 \rightarrow 2/3$ | $9/2 \rightarrow 3$ |

| $z$ | $x_1$ | $x_2$ | $s_1$ | $s_2$ | RHS |
|----------|---------|----------|---------|----------|----------|
| 1 | 0 | $-1/2 \rightarrow 0$ | $3/2 \rightarrow 4/3$ | $0 \rightarrow 1/3$ | $27/2 \rightarrow 15$ |
| 0 | 1 | 1/2 | 1/2 | 0 | 9/2 |
| 0 | 0 | 1 | -1/3 | 2/3 | 3 |

| $z$ | $x_1$ | $x_2$ | $s_1$ | $s_2$ | RHS |
|----------|---------|----------|---------|----------|----------|
| 1 | 0 | 0 | 4/3 | 1/3 | 15 |
| 0 | 1 | $1/2 \rightarrow 0$ | $1/2 \rightarrow 2/3$ | $0 \rightarrow -1/3$ | $9/2 \rightarrow 3$ |
| 0 | 0 | 1 | -1/3 | 2/3 | 3 |

Now the BV is $x_1$, $x_2$, and the rest are NBV. The $z$ value with all NBV set to 0 is now 15, and the current BFS is optimal as increasing NBV does not improve it.

---

### the big M method

In the simplex method, an initial BFS must be found. Above, it was found using slack variables, which did not apply to =, $\ge$ situations.

$$
max \\
z = 3x_1 + 2x_2 \\
s.t \\
2x_1+x_2 \le 9 \\
x_1+2x_2 \ge 9 \\
x_i \ge 0 (i = 1,2)
$$

The big M method first checks if the RHS of the constraints is non-negative, multiplying by -1 if negative. In the example, it is positive, so we proceed. Next, it must be converted to standard form. Then, positive artificial variables ($a_i$) are added for =, $\ge$ situations. A very large positive number $M$ is multiplied by $a_i$ and added to the objective function row, making the artificial variables positive but with a huge cost.

$$
max \\
z-3x_1-2x_2+Ma_2=0 \\
s.t \\
2x_1+x_2+s_1 = 9 \\
x_1+2x_2-e_2+a_2 = 9 \\
x_i \ge 0 (i = 1,2); s_1, e_2, a_2 \ge 0
$$

This is represented in a simplex tableau as follows, and artificial variables must be removed from the objective function to avoid a fake optimal solution.

| $z$ | $x_1$ | $x_2$ | $s_1$ | $e_2$ | $a_2$ | RHS |
|----------|---------|----------|---------|----------|----------|----------|
| 1 | -3 | -2 | 0 | 0 | M | 0 |
| 0 | 2 | 1 | 1 | 0 | 0 | 9 |
| 0 | 1 | 2 | 0 | -1 | 1 | 9 |

Therefore, subtracting $M$ times the row containing the artificial variable from $R_0$ results in the following change.

| $z$ | $x_1$ | $x_2$ | $s_1$ | $e_2$ | $a_2$ | RHS |
|----------|---------|----------|---------|----------|----------|----------|
| 1 | $-3 \rightarrow -3-M$ | $-2 \rightarrow -2-2M$ | 0 | $0 \rightarrow -M$ | $M \rightarrow 0$ | $0 \rightarrow -9M$ |
| 0 | 2 | 1 | 1 | 0 | 0 | 9 |
| 0 | 1 | 2 | 0 | -1 | 1 | 9 |

In the table above, the BV is $z=-9M$, $s_1=9$, $a_2=9$, and the entering variable is $x_2$, the largest negative coefficient. The ratio test gives $R_1 : 9/1$, $R_2 : 9/2$, with the smaller ratio $R_2$ as the pivot row. Therefore, $x_2$ in $R_2$ is made 1, and ERO is performed.

| $z$ | $x_1$ | $x_2$ | $s_1$ | $e_2$ | $a_2$ | RHS |
|----------|---------|----------|---------|----------|----------|----------|
| 1 | -2 | 0 | 0 | -1 | 1+M | 9 |
| 0 | 3/2 | 0 | 1 | 1/2 | -1/2 | 9/2 |
| 0 | 1/2 | 1 | 0 | -1/2 | 1/2 | 9/2 |

In the completed ERO, the BV is $x_2=9/2$, $s_1=9/2$, and $z=9$. However, as $z$ can still be improved, $x_1$, the largest negative coefficient, becomes the entering variable. The ratio test gives $R_1 : \frac{9/2}{3/2}=3$, $R_2 : \frac{9/2}{1/2}=9$, making $R_1$ the pivot row.

| $z$ | $x_1$ | $x_2$ | $s_1$ | $e_2$ | $a_2$ | RHS |
|----------|---------|----------|---------|----------|----------|----------|
| 1 | 0 | 0 | 4/3 | -1/3 | 1/3+M | 15 |
| 0 | 1 | 0 | 2/3 | 1/3 | -1/3 | 3 |
| 0 | 0 | 1 | -1/3 | 2/3 | 3 |

In the additional ERO, the BV is $x_1=3$, $x_2=3$, and $z=15$. However, as $z$ can still be improved, $e_2$, the largest negative coefficient, becomes the entering variable. The ratio test gives $R_1 : \frac{3}{1/3}=9$, with $R_2$ having a negative coefficient, making $R_1$ the pivot row.

| $z$ | $x_1$ | $x_2$ | $s_1$ | $e_2$ | $a_2$ | RHS |
|----------|---------|----------|---------|----------|----------|----------|
| 1 | 1 | 0 | 2 | 0 | M | 18 |
| 0 | 3 | 0 | 2 | 1 | -1 | 9 |
| 0 | 2 | 1 | 1 | 0 | 0 | 9 |

In the additional ERO, the BV is $x_2=9$, $e_2=9$, and $z=18$. The remaining NBV, $x_1$, $s_1$, are all set to 0. At this point, the artificial variable is also 0, making this a complete optimal solution.

---

### unrestricted in sign variable and smoothing scheduling

In linear programming, if $x_i$ variables are always non-negative, the opposite case is called unrestricted in sign variable (URS), where $-x \rightarrow y$ represents $x_i^+$ as the positive deviation from 0 and $x_i^-$ as the negative deviation from 0.

For all BFS, the URS situation satisfies one of three conditions.

1.$x_i^+ > 0$ and $x_i^- = 0$ is when $x_i=x_i^+-x_i^-=x_i^+$

2.$x_i^+ = 0$ and $x_i^- > 0$ is when $x_i=x_i^+-x_i^-=-x_i^-$

3.$x_i^+ = x_i^- = 0$ is when $x_i=x_i^+-x_i^-=0$

$$
max \\
z = 3x_1 + 2x_2 \\
s.t \\
2x_1+x_2 \le 9 \\
x_1+2x_2 \le 9 \\
x_1 \ge 0, x_2=urs
$$

In such an example, $s_1$, $s_2$ are added to each constraint by the simplex method. The URS variable $x_2$ is changed to deviation variables.

$$
max \\
z-3x_1-2x_2^+ + 2x_2^-=0 \\
s.t \\
2x_1+x_2^+-x_2^-+s_1 = 9 \\
x_1+2x_2^+-2x_2^-+s_2 = 9 \\
x_1, s_1, s_2, x_2^+, x_2^- \ge 0
$$

This is represented in a simplex tableau as follows.

| $z$ | $x_1$ | $x_2^+$ | $x_2^-$ | $s_1$ | $s_2$ | RHS |
|----------|---------|----------|---------|----------|----------|----------|
| 1 | -3 | -2 | 2 | 0 | 0 | 0 |
| 0 | 2 | 1 | -1 | 1 | 0 | 9 |
| 0 | 1 | 2 | -2 | 0 | 1 | 9 |

Here, the BV is $s_1=9$, $s_2=9$, and $z=0$, with the entering variable being $x_1$, the largest negative coefficient in $R_0$. The ratio test gives $R_1 : 9/2$, $R_2 : 9/1$, making $R_1$ the pivot row.

| $z$ | $x_1$ | $x_2^+$ | $x_2^-$ | $s_1$ | $s_2$ | RHS |
|----------|---------|----------|---------|----------|----------|----------|
| 1 | 0 | -1/2 | 1/2 | 3/2 | 0 | 27/2 |
| 0 | 1 | 1/2 | -1/2 | 1/2 | 0 | 9/2 |
| 0 | 0 | 3/2 | -3/2 | -1/2 | 1 | 9/2 |

Here, the BV is $x_1=9/2$, $s_2=9/2$, and the largest negative coefficient in $R_0$, $x_2^+$, is selected as the entering variable. The ratio test gives $R_1 : \frac{9/2}{1/2} = 9$, $R_2 : \frac{9/2}{3/2}=3$, making $R_2$ the pivot row.

| $z$ | $x_1$ | $x_2^+$ | $x_2^-$ | $s_1$ | $s_2$ | RHS |
|----------|---------|----------|---------|----------|----------|----------|
| 1 | 0 | 0 | 0 | 4/3 | 1/3 | 15 |
| 0 | 1 | 0 | 0 | 2/3 | -1/3 | 3 |
| 0 | 0 | 1 | -1 | -1/3 | 2/3 | 3 |

Here, the BV is $x_1=3$, $x_2^+=3$, and it corresponds to the most optimal solution. The optimal solution is $x_2=x_2^+-x_2^-=3-0=3$, $z=15$, $s_1=s_2=0$.

A real-world example of using this method is production smoothing scheduling. A company wants to schedule for 3 months, knowing the fixed production demand $(m_1, m_2, m_3)=(200, 150, 400)$, with manufacturing costs of $2000, holding costs of $500, $4000 for increasing production, and $3000 for decreasing production. Before the starting month, there are 300 productions with no inventory.

The decision variables are product production $p_t$, inventory holding $i_t$, production increase $x_t^+$, and production decrease $x_t^-$. The objective function is min $z=2000*(p_1+p_2+p_3)+500*(i_1+i_2+i_3)+4000*(x_1^++x_2^++x_3^+)+3000*(x_1^-+x_2^-+x_3^-)$, with constraints $i_1=0+p_1-200$, $i_2=i_1+p_2-150$, $i_3=i_2+p_3-400$, $p_1-300=x_1^+-x_1^-$, $p_2-p_1=x_2^+-x_2^-$, $p_3-p_2=x_3^+-x_3^-$.

---

### goal programming

goal programming (GP) finds a solution that minimizes the weighted sum of deviations from each goal. A lower and one-sided goal sets a lower limit that should not be fallen below ($\ge$), an upper and one-sided goal sets an upper limit that should not be exceeded ($\le$), and a two-sided goal corresponds to an equality constraint.

A project manager wants to determine the production quantity for three products with labor $(40, 30, 20) \le 100$, raw material $(2,4,3)=10$, profit $(5,8,4) \ge 30$, and penalty $(5, 8^-/12^+, 15)$.

Defining decision variables, $40x_1+30x_2+20x_3 \le 100$, $2x_1+4x_2+3x_3=10$, $5x_1+8x_2+4x_3 \ge 30$, and considering URS for the difference from the goal, $40x_1+30x_2+20x_3-(y_1^+-y_1^-)=100$, $2x_1+4x_2+3x_3-(y_2^+-y_2^-)=10$, $5x_1+8x_2+4x_3-(y_3^+-y_3^-)=30$.

The objective function is min $z=5y_1^++(8y_2^-+12y_2^+)+15y_3^-$, aiming to minimize penalties.

This is expressed using the simplex method as follows:

$$
min \\
z-5y_1^+ - 8y_2^- - 12y_2^+ - 15y_3^- - M(a_1 + a_2 + a_3)=0\\
s.t \\
40x_1 + 30x_2 + 20x_3 - y_1^+ + y_1^- + a_1 = 100 \\
2x_1 + 4x_2 + 3x_3 - y_2^+ + y_2^- + a_2= 10 \\
5x_1 + 8x_2 + 4x_3 - y_3^+ + y_3^- + a_3= 30 \\
x_1, x_2, x_3, y_1^+, y_1^-, y_2^+, y_2^-, y_3^+, y_3^- \ge 0
$$

This is represented in a simplex tableau and solved iteratively.

| $z$ | $x_1$ | $x_2$ | $x_3$ | $y_1^+$ | $y_1^-$ | $y_2^+$ | $y_2^-$ | $y_3^+$ | $y_3^-$ | $a_1$ | $a_2$ | $a_3$ | RHS |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0 | 0 | 0 | -5 | 0 | -12 | -8 | 0 | -15 | $M$ | $M$ | $M$ | 0 |
| 0 | 40 | 30 | 20 | -1 | 1 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 100 |
| 0 | 2 | 4 | 3 | 0 | 0 | -1 | 1 | 0 | 0 | 0 | 1 | 0 | 10 |
| 0 | 5 | 8 | 4 | 0 | 0 | 0 | 0 | -1 | 1 | 0 | 0 | 1 | 30 |

__Iteration 1__
To eliminate artificial variables like $M$, multiply $R_1, R_2, R_3$ by $M$ and subtract.

| $z$ | $x_1$ | $x_2$ | $x_3$ | $y_1^+$ | $y_1^-$ | $y_2^+$ | $y_2^-$ | $y_3^+$ | $y_3^-$ | $a_1$ | $a_2$ | $a_3$ | RHS |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | $-47M$ | $-42M$ | $-27M$ | $-5+M$ | $-M$ | $-12+M$ | $-8-M$ | $M$ | $-15+M$ | 0 | 0 | 0 | $-140M$ |
| 0 | 40 | 30 | 20 | -1 | 1 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 100 |
| 0 | 2 | 4 | 3 | 0 | 0 | -1 | 1 | 0 | 0 | 0 | 1 | 0 | 10 |
| 0 | 5 | 8 | 4 | 0 | 0 | 0 | 0 | -1 | 1 | 0 | 0 | 1 | 30 |

__Iteration 2__
- Entering Variable: $x_1$
- pivot row: $R_1$

| $z$ | $x_1$ | $x_2$ | $x_3$ | $y_1^+$ | $y_1^-$ | $y_2^+$ | $y_2^-$ | $y_3^+$ | $y_3^-$ | $a_1$ | $a_2$ | $a_3$ | RHS |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0 | $-27M/4$ | $-7M/2$ | $-5-7M/40$ | $7M/40$ | $-12+M$ | $-8-M$ | $M$ | $-15+M$ | $47M/40$ | 0 | 0 | $-45M/2$ |
| 0 | 1 | 3/4 | 1/2 | -1/40 | 1/40 | 0 | 0 | 0 | 0 | 1/40 | 0 | 0 | 5/2 |
| 0 | 0 | 5/2 | 2 | 1/20 | -1/20 | -1 | 1 | 0 | 0 | -1/20 | 1 | 0 | 5 |
| 0 | 0 | 17/4 | 3/2 | 1/8 | -1/8 | 0 | 0 | -1 | 1 | -1/8 | 0 | 1 | 35/2 |

__Iteration 3__
- Entering Variable: $x_2$
- pivot row: $R_2$

| $z$ | $x_1$ | $x_2$ | $x_3$ | $y_1^+$ | $y_1^-$ | $y_2^+$ | $y_2^-$ | $y_3^+$ | $y_3^-$ | $a_1$ | $a_2$ | $a_3$ | RHS |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0 | 0 | $19M/10$ | $-5-1M/25$ | $1M/25$ | $-12-7/10M$ | $-8+7/M$ | $M$ | $-15+M$ | $26M/25$ | 0 | 0 | $-9M$ |
| 0 | 1 | 0 | -1/10 | -1/25 | 1/25 | 3/10 | -3/10 | 0 | 0 | 1/25 | -3/10 | 0 | 1 |
| 0 | 0 | 1 | 4/5 | 1/50 | -1/50 | -2/5 | 2/5 | 0 | 0 | -1/50 | 2/5 | 0 | 2 |
| 0 | 0 | 0 | -1/5 | 1/25 | -1/25 | 17/10 | -17/10 | -1 | 1 | -1/25 | -17/10 | 1 | 9 |

__Iteration 4__
- Entering Variable: $y_2^+$
- pivot row: $R_1$

| $z$ | $x_1$ | $x_2$ | $x_3$ | $y_1^+$ | $y_1^-$ | $y_2^+$ | $y_2^-$ | $y_3^+$ | $y_3^-$ | $a_1$ | $a_2$ | $a_3$ | RHS |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | $40+7M/3$ | 0 | $53M/30−2/5$ | $−33/25−2M/15$ | $8/25+2M/15$ | $0$ | $−20$ | $M$ | $-15+M$ | $26M/25−(M/25×10/3×7M/10)$ | $12+7M/10$ | 0 | $40−20M/3$ |
| 0 | 10/3 | 0 | −1/3 | −2/15 | 2/15 | 1 | -1 | 0 | 0 | 2/15 | −1 | 0 | 10/3 |
| 0 | 4/3 | 1 | 2/3 | 7/150 | −7/150 | 0 | 0 | 0 | 0 | −7/150 | 0 | 0 | 10/3 |
| 0 | −17/3 | 0 | 11/30 | 22/75 | -22/75 | 0 | 0 | -1 | 1 | −22/75 | 0 | 1 | 10/3 |

Repeating the process leads to the optimal solution. The final tableau results are as follows.

$x_1 = 0, x_2 = 3.33, x_3 = 0$

$y_1 = y_1^+ - y_1^- = 0 - 0 = 0$ (Labor goal exactly achieved)

$y_2 = y_2^+ - y_2^- = 3.33 - 0 = 3.33$ (Material goal exceeded by 3.33)

$y_3 = y_3^+ - y_3^- = 0 - 3.33 = -3.33$ (Profit goal short by 3.33)

Therefore, the minimum penalty cost is $z^* = 5(0) + (8(0) + 12(3.33)) + 15(3.33) = 90$.

---

### References

[Original path #1](https://youtu.be/f3Gz4SGQV9M?si=d5kmJ6Zbfv0kVrou)

[Original path #2](https://youtu.be/0P5OAcXdUec?si=z2FNzcLmNrV69vSW)

[Original path #3](https://youtu.be/Mz__0uBb2-U?si=hCfhdBTkE2OBDzEQ)

[Original path #4](https://youtu.be/Of5Vh4rkNW8?si=KiZlzZXyBD8f7Rjc)

[Original path #5](https://youtu.be/ROkDaBeEiVs?si=fQih218f9gathbNN)

[Original path #6](https://youtu.be/6ESDNnsVg3g?si=suiKplydAOzOMYrO)

[Original path #7](https://youtu.be/D1xYQdnmKvY?si=vyeB5c4LscZliexz)

[Original path #8](https://youtu.be/6RObf2AtenQ?si=QWkWzDsqdZc_Zzx5)




---
title: 'Duality theory'
date: '2024-07-15'
tags: ['Operations Research 1', 'lecture']
---

### Sensitivity Analysis

Sensitivity analysis answers two types of questions.

Question #1: How does the change in available resources affect the optimal solution?

- Available resources are shown on the right side of the constraints.

Question #2: How does the change in unit profit or unit cost affect the optimal solution?

- Unit profit or unit cost is expressed as coefficients of the objective function.

For example,

$$
max \\
z = 300x_1 + 200x_2 \\
s.t \\
2x_1+x_2 \le 8 \\
x_1+2x_2 \le 8 \\
x_1, x_2 \ge 0
$$

If we change constraint 1 to $2x_1+x_2 \le 9$, the shadow price of $M_1$ is defined using the changed $z(z_b)$ and the previous $z(z_a)$ as follows:

$$
\frac{z_b-z_a}{M_1 \text{ change}} \\
= \frac{4400/3-4000/3}{9-8} \\
= 133
$$

This means that operating $M_1$ for 1 hour increases by $133. Similarly, applying to $M_2$,

$$
\frac{z_c-z_a}{M_2 \text{ change}} \\
= \frac{4100/3-4000/3}{9-8} \\
= 33
$$

It increases by $33, and if both machines' capacities can be increased, the question of which machine should be prioritized can be answered with $M_1$.

Now, if we conduct sensitivity analysis on the objective function coefficients,

$$
max \\
z = c_1x_1 + c_2x_2
$$

Here, the slope $-\frac{c_1}{c_2}$ can be found to be in the range $-\frac{2}{1} \le -\frac{c_1}{c_2} \le -\frac{1}{2} \rightarrow \frac{1}{2} \le \frac{c_1}{c_2} \le \frac{2}{1}$. Therefore, if the selling prices of the products are changed to 350 and 250, we can answer that there is no change in the solution.

---

### Relations Between Primal and Dual Problems

$$
max \\
z = 30x_1 + 100x_2 \\
s.t \\
x_1+x_2 \le 7 \\
4x_1+10x_2 \le 40 \\
x_1 \ge 3 \\
x_1 \ge 0 \\
x_2 \ge 0
$$

For example, when there is an LP problem like the above, instead of using the simplex method, we want to find the lower and upper bounds of the optimal solution $z^*$. All feasible solutions are lower bounds, and for example, if the coordinates are $(5,2)$, we can get the result $z=350 \le z^*$.

The process involves first choosing the sign of $u_i$ so that all inequalities become $\le$ after multiplication. Then, all obtained inequalities are added to create a resulting inequality. Next, the coefficients of the resulting constraints are matched with the objective function.

By setting $(u_1, u_2, u_3, u_4, u_5)=(0, 10, -10, -0, -0)$ and multiplying, we get:

$$
0x_1+0x_2 \le 0 \\
40x_1+100x_2 \le 400 \\
-10x_1 \le -30 \\
-0x_1 \le -0 \\
-0x_2 \le -0
$$

Adding them gives $30x_1+100x_2 \le 370 \rightarrow z^* \le 370$. There can be multiple combinations of $u_i$ that match the objective function. Each combination is an upper bound.

Let's try multiplying $u_1, ..., u_5$ with attention to signs, not fixed values as above.

$$
u_1x_1+u_1x_2 \le 7u_1 \\
4u_2x_1+10u_2x_2 \le 40u_2 \\
-u_3x_1 \le -3u_3 \\
-u_4x_1 \le -0 \\
-u_5x_2 \le -0
$$

Adding them gives $(u_1+4u_2-u_3-u_4)x_1 + (u_1+10u_2-u_5)x_2 \le 7u_1+40u_2-3u_3$. According to each objective function coefficient, create constraints and set $z^*$ to include the new right-hand side expression as follows:

$$
min \\
z^* = 7u_1+40u_2-3u_3 \\
s.t \\
u_1+4u_2-u_3-u_4 \ge 30 \\
u_1+10u_2-u_5 \ge 100 \\
u_1, u_2, u_3 \ge 0
$$

Here, $u_4, u_5$ are called excess variables as they exist only in each row. The primal problem was a max solution, but in the dual problem, it changes to min, and the right-hand side coefficients of the constraints in the primal become the coefficients of the objective function in the dual, and vice versa. The signs of each constraint variable are opposite to the signs of the constraints in the primal, and if it was = in the primal, it is considered urs.

---

### Weak Duality and Strong Duality

#### Weak Duality

The general form of the primal is as follows:

$$
max \\
z = \sum_{j=1}^{n} c_jx_j \\
s.t \\
\sum_{j=1}^{n} a_{i,j}x_j \le b_i \\
x_i \ge 0 (i = 1,...,n)
$$

The general form of the dual is as follows:

$$
min \\
z^* = \sum_{i=1}^{m} u_ib_i \\
s.t \\
\sum_{i=1}^{m} a_{j,i}u_i \ge c_j \\
u_i \ge 0 (i = 1,...,m)
$$

The set of $x_i$ is the feasible region in the primal, and the set of $u_i$ is the feasible region in the dual. The $z$ value for $x$ $\le$ the $z^*$ value for $u$. For example, in the primal $(5,2) \rightarrow z:350$ and in the dual $(0,10,0) \rightarrow z^*:400$, it is proven.

#### Strong Duality Lemma

In the same primal and dual form as above, when the $z$ value for $x$ $=$ the $z^*$ value for $u$, it means that $x$ is the optimal solution in the primal and $u$ is the optimal solution in the dual. For example, in the primal $(3,2.8) \rightarrow z:370$ and in the dual $(0,10,10) \rightarrow z^*:370$, it becomes the optimal solution.

When BV is the optimal basis of the primal, $u=c_{BV}B^{-1}$ is the optimal solution of the dual. Also, $z, z^*$ are the same value. $c_{BV}$ is the vector of initial objective function coefficients, and $B$ is the matrix of the $j$-th column in the initial constraints.

#### Explanation

If the dual is infinite, $z, z^*$ are infinitely small. Therefore, it is not feasible in the primal. The opposite case also holds.

#### Examples

For example,

$$
max \\
z = 60x_1+30x_2+20x_3+0s_1+0s_2+0s_3
$$

to solve an LP problem like this, the simplex method tableau and optimal tableau are shown below.

| $z$ | $x_1$ | $x_2$ | $x_3$ | $s_1$ | $s_2$ | $s_3$ | RHS |
|----------|---------|----------|---------|----------|----------|----------|----------|
| 1 | -60 | -30 | -20 | 0 | 0 | 0 | 0 |
| 0 | 8 | 6 | 1 | 1 | 0 | 0 | 48 |
| 0 | 4 | 2 | 1.5 | 0 | 1 | 0 | 20 |
| 0 | 2 | 1.5 | 0.5 | 0 | 0 | 1 | 8 |

| $z$ | $x_1$ | $x_2$ | $x_3$ | $s_1$ | $s_2$ | $s_3$ | RHS |
|----------|---------|----------|---------|----------|----------|----------|----------|
| 1 | 0 | 5 | 0 | 0 | 10 | 10 | 280 |
| 0 | 0 | -2 | 0 | 1 | 2 | -8 | 24 |
| 0 | 0 | -2 | 1 | 0 | 2 | -4 | 8 |
| 0 | 1 | 1.25 | 0 | 0 | -0.5 | 1.5 | 2 |

Here, BV is [$s_1, x_3, x_1$], so $c_{BV} = [0, 20, 60]$. Accordingly, the matrix $B$ is $
\begin{bmatrix} 1 & 1 & 8 \\
0 & 1.5 & 4 \\
0 & 0.5 & 2 \end{bmatrix}$, and finally, $u=\begin{bmatrix} 0 & 20 & 60 \end{bmatrix} \begin{bmatrix} 1 & 1 & 8 \\
0 & 1.5 & 4 \\
0 & 0.5 & 2 \end{bmatrix}=\begin{bmatrix} 0 & 10 & 10 \end{bmatrix}$ can be obtained.

If constraint $i$ is $\le$ in the primal, the optimal value of $u_i$ in the dual is the coefficient of the slack variable $s_i$ in $R_0$. If constraint $i$ is $\ge$ in the primal, the optimal value of $u_i$ in the dual is the coefficient of the excess variable $e_i$ in $R_0$. If constraint $i$ is $=$ in the primal, the optimal value of $u_i$ in the dual is the coefficient of the artificial variable $a_i$ in $R_0$ minus $M$.

---

### Complementary Slackness

The general form of the primal is as follows:

$$
max \\
z = \sum_{j=1}^{n} c_jx_j \\
s.t \\
\sum_{j=1}^{n} a_{i,j}x_j \le b_i \\
x_i \ge 0 (i = 1,...,n)
$$

The general form of the dual is as follows:

$$
min \\
z^* = \sum_{i=1}^{m} u_ib_i \\
s.t \\
\sum_{i=1}^{m} a_{j,i}u_i \ge c_j \\
u_i \ge 0 (i = 1,...,m)
$$

Since the sign of the constraints in the primal is $\le$, $s_i$ is added, and since the sign of the constraints in the dual is $\ge$, $e_i$ is added, it changes as follows:

$$
s.t \\
\sum_{j=1}^{n} a_{i,j}x_j + s_i \le b_i, i=1,..., m \\
s_i \ge 0 (i = 1,...,m)
$$

$$
s.t \\
\sum_{i=1}^{m} a_{j,i}u_i - e_j \ge c_j, j=1,..., n \\
e_j \ge 0 (j=1,..., n)
$$

In the slackness theorem, the product of each slack variable in the primal and each decision variable in the dual, $s_iu_i=0$, and the product of each excess variable in the dual and each decision variable in the primal, $e_jx_j=0$, hold.

---

### Dual Simplex Method

Calculate $u=c_{BV}B^{-1}$ from above and identify the dual solution from the optimal primal tableau. Each optimal solution can be found using the slackness theorem.

In the dual simplex method, the most negative BV is selected as the leaving variable and pivoted. Then, the coefficients of the NBV in $R_0$ are divided by the NBV coefficients of the pivot row, and the variable with the smallest absolute ratio is selected as the entering variable. The difference from the basic simplex is that the leaving variable is selected first. Next, if there is a constraint with a negative RHS and each variable has a non-negative coefficient, an optimal solution cannot be found.

For example,

$$
min \\
z^* = u_1 + 2u_2 \\
s.t \\
u_1-2u_2+u_3 \ge 4 \\
2u_1+u_2-u_3 \ge 6 \\
u_i \ge 0 (i = 1,...,3)
$$

In this dual problem, all constraints are greater than the RHS, and all variables are greater than 0. Next, take the negative of the objective function to change it to a max problem.

$$
max \\
v = -z^* = -u_1 - 2u_2
$$

Therefore, if there is an excess variable in a row other than $R_0$, multiply by - to make it negative, and as a result, the rows can be made as $R_0 : v + u_1+2u_2=0$, $R_1 : -u_1+2u_2-u_3+e_1=-4$, $-2u_1-u_2+u_3+e_2=-6$. This can be represented in a tableau as follows:

| $v$ | $u_1$ | $u_2$ | $u_3$ | $e_1$ | $e_2$ | RHS | BV |
|----------|---------|----------|---------|----------|----------|----------|----------|
| 1 | 1 | 2 | 0 | 0 | 0 | 0 | $v=0$ |
| 0 | -1 | 2 | -1 | 1 | 0 | -4 | $e_1=-4$ |
| 0 | -2 | -1 | 1 | 0 | 1 | -6 | $e_2=-6$ |

Here, the most negative BV is selected as the leaving variable, and $e_2$ is applicable. The negative coefficient ratio of the pivot row and $R_0$ row is 1/(-2), 2/(-1). At this time, the variable with the smallest absolute value, $u_1$, is selected as the entering variable, and ERO is repeated.

| $v$ | $u_1$ | $u_2$ | $u_3$ | $e_1$ | $e_2$ | RHS | BV |
|----------|---------|----------|---------|----------|----------|----------|----------|
| 1 | 0 | 3/2 | 1/2 | 0 | 1/2 | -3 | $v=-3$ |
| 0 | 0 | 5/2 | -3/2 | 1 | -1/2 | -1 | $e_1=-1$ |
| 0 | 1 | 1/2 | -1/2 | 0 | -1/2 | 3 | $u_1=-3$ |

However, since there is still a constraint with a negative RHS, optimization is not complete, so repeat again. The most negative BV, $e_1$, becomes the leaving variable, and that row becomes the pivot row. Calculating the NBV ratio gives $\frac{1/2}{-3/2}=-1/3$, $\frac{1/2}{-1/2}=-1$, and the variable with the smallest absolute value, $u_3$, becomes the entering variable.

| $v$ | $u_1$ | $u_2$ | $u_3$ | $e_1$ | $e_2$ | RHS | BV |
|----------|---------|----------|---------|----------|----------|----------|----------|
| 1 | 0 | 7/3 | 0 | 1/3 | 1/3 | -10/3 | $v=-10/3$ |
| 0 | 0 | -5/3 | 1 | -2/3 | 1/3 | 2/3 | $u_3=2/3$ |
| 0 | 1 | -1/3 | 0 | -1/3 | -1/3 | 10/3 | $u_1=10/3$ |

Now optimization is complete, and the optimal solution is $z^*=-v=10/3$, $u_1=10/3$, $u_3=2/3$, $u_2=e_1=e_2=0$.

Therefore, in the case of LP problems, if the number of basic variables is much smaller than the number of constraints, it is recommended to solve both the primal and dual problems in opposite directions.

---

### References

[Original Path #1](https://youtu.be/oAPScEPsNqY?si=eSy2Yha30J3liVjV)

[Original Path #2](https://youtu.be/lSM_TQehx00?si=PP4FzUGIz30xbaAv)

[Original Path #3](https://youtu.be/bPLNyYFLLT4?si=1XKWW1EqlrPQHXJZ)

[Original Path #4](https://youtu.be/eS0ZsfYRLn0?si=qjU2nQ7alcCWa05D)

[Original Path #5](https://youtu.be/hiEcWZnkguU?si=jkD4DmSCS0PI69wL)



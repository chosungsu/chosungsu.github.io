---
title: 'Introduction to LP'
date: '2024-07-08'
tags: ['Operations Research 1', 'lecture']
---

### Linear Function & Inequality

A linear function is one that can be expressed in the form $f(x_1, x_2, ..., x_n)=c_1x_1 + c_2x_2 + ... + c_nx_n$, where $c_1, c_2, ..., c_n$ are constants. Any linear function expressed with inequalities such as $f(x_1, x_2, ..., x_n) \ge b, f(x_1, x_2, ..., x_n) \le b$ for some constant $b$ is called a linear inequality.

---

### Linear Programming(LP)

LP is a planning method for optimizing problems with the following characteristics:

-Optimization of a linear objective function of decision variables

-All constraints must be linear equations or linear inequalities

-Sign restrictions are related to each decision variable. For all $x_i$, there should be no sign restrictions according to whether they are positive, zero, negative, or unrestricted in sign.

For example, if $P_1$ requires raw material($1000) of 2, labor cost($1000) of 5, machining time(9hr) of 2, packaging time(9hr) of 1, selling price($1000) of 10, and $P_2$ requires raw material($1000) of 2, labor cost($1000) of 4, machining time(9hr) of 1, packaging time(9hr) of 2, selling price($1000) of 8, then we can solve the optimization problem as follows:

We define decision variables as $x_1$ being the units of $P_1$ produced per day, and $x_2$ being the units of $P_2$ produced per day. The objective function to maximize daily production profit (Revenue-Cost) is defined as $z=(10x_1+8x_2) - [(2+5)x_1 + (2+4)x_2] = 3x_1+2x_2$. Finally, the constraints are defined as $2x_1+x_2 \le 9$, $x_1+2x_2 \le 9$, $x_1, x_2 \ge 0$.

Therefore, we write the final formulation as follows:

$$
max \\
z = 3x_1 + 2x_2 (in \rightarrow 1000) \\
s.t \\ 
2x_1+x_2 \le 9 \\
x_1+2x_2 \le 9 \\
x_1, x_2 \ge 0
$$

---

### Graphically Solving LP

For maximization problems, the optimal solution is the point where the objective function value is largest within the feasible region, and for minimization problems, it is the point where the objective function value is smallest within the feasible region.

First, we find the feasible region and draw lines according to the slope of the objective function. We must move the line in different directions depending on whether it's a max/min problem. Finally, the intersection point just before leaving the feasible region becomes the optimal solution.

<img src="https://velog.velcdn.com/images/ski06043/post/36a1b114-8f54-438f-890c-b2428bb718b0/image.png" style="display: block; margin: 0 auto; height:200;" />

In the above example, to find the slope of the objective function, we have $z=3x_1+2x_2 \rightarrow x_2=z/2-3x_1/2$, giving us slope $s=-\frac{3}{2}$. We consider an arbitrary dashed line with this slope, and since the objective function increases as both variables increase, we move it toward the upper right. Finally, since (3,3) is the intersection point of the two constraints, substituting this into the objective function gives us the optimal value of 15.

---

### Binding & Nonbinding Constraints

A constraint has binding force when the LHS and RHS are equal at the optimal solution. For example, under the same constraints as above with objective function $z = 3x_1+2x_2$, the slope is -3 and the optimal solution is determined at (4.5, 0). Substituting this optimal solution into $c_1 : 2x_1 + x_2 \le 9$ and $c_2 : x_1 + 2x_2 \le 9$, we get 9 for $c_1$ (equal, so binding) but less than 9 for $c_2$ (nonbinding). Similarly, checking $s_1 : x_1 \ge 0$ and $s_2 : x_2 \ge 0$, $s_1$ is greater than 0 (nonbinding) while $s_2$ equals 0 (binding).

---

### Convex Set & Convex Function

Given two points $x$, $y$ in $n$-dimensional real space, if $z=\lambda x + (1-\lambda)y$, $\lambda \in [0,1]$ belongs to all convex combinations, then:

For example, if $\lambda = 0.3$, then $z$ means a combination of 30% $x$ and 70% $y$.

A set $S$ in $n$-dimensional real space is called a convex set if it contains all convex combinations of any two points within it. Here, the empty set, single point sets, and intersections of convex sets are also considered convex sets.

<img src="https://velog.velcdn.com/images/ski06043/post/2dbc64c2-5a7e-44b7-897a-7977df581c18/image.png" style="display: block; margin: 0 auto; height:200;" />

When $S$ is a convex set, a function $f : S \rightarrow R$ is called a convex function if for any two points $x_1$, $x_2$ in $S$, $f(\lambda x_1 + (1-\lambda)x_2) \le \lambda f(x_1) + (1-\lambda)f(x_2)$ holds. This means that the convex combination function of two points is less than or equal to the convex combination of the function values at those two points. Graphically, if function $f$ is smaller than the interpolation formed between two points, it is considered convex. Conversely, if it is larger than the interpolation, it is considered concave.

---

### Extreme Point

A point $P$ in a convex set $S$ can be an extreme point if $P$ is an endpoint of every line segment that contains $P$ and is completely contained within the interior of $S$. For example, in a space $S$ like a triangle, vertices such as $A$, $B$, $C$ are considered extreme points.

---

### LP Problems

#### 1. Staff Scheduling Problem

For example, if a company needs different numbers of employees each day of the week: Monday(10), Tuesday(12), Wednesday(20), Thursday(17), Friday(15), Saturday(12), Sunday(5), and each employee must work 5 consecutive days followed by 2 days off, then the company can formulate the minimum number of employees to hire as an LP problem.

First, let's show the incorrect method:

We define decision variables as $x_i$ being the number of employees working on day $i$, with objective function min $z = x_1+x_2+x_3+x_4+x_5+x_6+x_7$ and constraints $x_1 \ge 10$, $x_2 \ge 12$, $x_3 \ge 20$, $x_4 \ge 17$, $x_5 \ge 15$, $x_6 \ge 12$, $x_7 \ge 5$, $x_i \ge 0$. This way, we can count employees multiple times for different days, so we need to modify the inappropriate decision variables.

<img src="https://velog.velcdn.com/images/ski06043/post/5a58cb3b-5cc9-462f-add6-d7ad9dbc9f02/image.png" style="display: block; margin: 0 auto; height:200;" />

Now we modify $x_i$ to be the number of employees who start work on day $i$. This way, as shown in the image, employees working from Monday to Sunday will be counted without duplication. In this situation, the objective function remains the same: min $z = x_1+x_2+x_3+x_4+x_5+x_6+x_7$, but the constraints must be modified to: $x_1 + x_4 + x_5 + x_6 + x_7 \ge 10$, $x_1 + x_2 + x_5 + x_6 + x_7 \ge 12$, $x_1 + x_2 + x_3 + x_6 + x_7 \ge 20$, $x_1 + x_2 + x_3 + x_4 + x_7 \ge 17$, $x_1 + x_2 + x_3 + x_4 + x_5 \ge 15$, $x_2 + x_3 + x_4 + x_5 + x_6 \ge 12$, $x_3 + x_4 + x_5 + x_6 + x_7 \ge 5$, $x_i \ge 0$.

#### 2. Blending Problem

In blending problems, various inputs are mixed in desired proportions to produce final products.

For example, if limestone, corn, and soybean have nutritional information of cal(0.38)/cal(0.001)/cal(0.002), protein(0)/protein(0.09)/protein(0.5), fiber(0)/fiber(0.02)/fiber(0.08), and additional information includes cal $\ge 0.008$, cal $\le 0.012$, protein $\ge 0.22$, fiber $\le 0.05$, limestone price(0.1), corn price(0.2), soybean price(0.4).

When making 1kg by combining all components, we can create the objective function as min $z=0.1L + 0.2C + 0.4S$ and set constraints as $L+C+S=1$, $0.008 \le 0.38L+0.001C+0.002S \ge 0.012$, $0.22 \le 0.09C+0.5S \le 1$, $0 \le 0.02C+0.08S \le 0.05$.

#### 3. Production Process Problem

For example, suppose a company uses 2000 units of raw material per week and has 6000 hours of labor available per week, producing 4 items: $p_1$, $p_2$, $l_1$, $l_2$.

1 unit of raw material can produce $3p_1$ and $4p_2$ after 1 hour. Processing one unit of $p_1$ with $5 and 3 hours yields $1l_1$. Processing one unit of $p_2$ with $4 and 2 hours yields $1l_2$. Prices are set at $3 for 1 unit of raw material, $7 for $p_1$, $6 for $p_2$, $17 for $l_1$, and $16 for $l_2$. The decision variables, objective function, and constraints for maximizing weekly sales are as follows:

$x_{rm}$ is weekly raw material purchase, $x_{p1}$ is weekly $p_1$ sales, $x_{p2}$ is weekly $p_2$ sales, $x_{l1}$ is weekly $l_1$ sales, $x_{l2}$ is weekly $l_2$ sales.

The objective function can be considered as max $z = 7x_{p1} + 6x_{p2} + 17x_{l1} + 16x_{l2} - (3x_{rm}+5x_{l1}+4x_{l2}) = 6x_{p1} + 6x_{p2} + 11x_{l1} + 12x_{l2}$, and constraints are $x_{rm} \le 2000$, $x_{rm} + (3x_{l1} + 2x_{l2}) \le 6000$, $x_{p1}+x_{l1}-3x_{rm}=0$, $x_{p2} + x_{l2}-4x_{rm}=0$, $x_* \ge 0$.

If we set $x_{rm} = 2000$, then $3x_{l1} + 2x_{l2} \le 4000$, $x_{p1} + x_{p2} + x_{l1} + x_{l2} = 7x_{rm} = 14000$, $x_{p1} + x_{l1} = 6000$, $x_{p2} + x_{l2} = 8000$, and we can find the values of each decision variable for maximization through the slopes and intersection points of each line. The first line to draw is $3x_{l1} + 2x_{l2} \le 4000$ with slope $-3/2$ and intercepts $(0, 2000)$, $(4000/3, 0)$. Next, factoring out 6 from the objective function, the remaining $5x_{l1} + 6x_{l2}$ has maximum value with slope $-5/6$, which is smaller than the previous line, so it reaches maximum at the intercept $(0, 2000)$. Therefore, all decision variables are: $x_{rm}=2000$, $x_{p1}=6000$, $x_{p2}=6000$, $x_{l1}=0$, $x_{l2}=2000$, $z=6*14000+6*2000=96000$.

#### 4. Multiperiod Inventory Problem

For example, suppose a company wants to establish a fixed production schedule for 3 months. The demand for each month is $m_1:200$, $m_2:150$, $m_3:400$, and manufacturing during regular hours costs $2000, overtime manufacturing costs $3000, and holding costs of $500 occur when supply exceeds demand. Regular hours can produce maximum 200 units per month. Overtime has no limits, and there are no initial holding costs, but 10 products are in stock.

The decision variables, objective function, and constraints for minimizing costs over 3 months are as follows:

First, decision variables are $x_t$ for products produced during regular hours, $y_t$ for products produced during overtime, and $i_t$ for inventory at month end. The objective function can be considered as min $z = 2000*(x_1+x_2+x_3) + 3000*(y_1+y_2+y_3) + 500*(i_1+i_2+i_3)$. Constraints are $x_1 \le 200$, $x_2 \le 200$, $x_3 \le 200$, $i_1=10+x_1+y_1-200$, $i_2=i_1+x_2+y_2-150$, $i_3=i_2+x_3+y_3-400$.

---

### References

[Original Source #1](https://youtu.be/gHNCqwNMvds?si=PurS1k5XjtHMUzSD)

[Original Source #2](https://youtu.be/7vHM_YUxxkM?si=Ft2JqCJI2R0G_VgM)

[Original Source #3](https://youtu.be/_mNxWyyF26Q?si=OyakJPZojLB5iqhG)

[Original Source #4](https://youtu.be/po06JU0c8ME?si=_YhniEKmMSd-GUSY)

[Original Source #5](https://youtu.be/s71-XbHubSM?si=7voIaQ4MWx-Fd2SX)

[Original Source #6](https://youtu.be/a_gRfwHUlhQ?si=mEeULj3UQBjtYX-k)

[Original Source #7](https://youtu.be/qcoJfjRwn3A?si=WPLYpzGYg8Wo97x2)

[Original Source #8](https://youtu.be/3I8B21M-ob8?si=6k0vQzQiWXPepLxU)

[Original Source #9](https://youtu.be/eUd6k_nZpL8?si=k-VR09bWrvUe2IxL)

[Original Source #10](https://youtu.be/dfC9rDco0yU?si=JJ3fNXF8bnMKNEil)

[Original Source #11](https://youtu.be/2802Tan11Tg?si=VagTRL6GUVd4vyfS)




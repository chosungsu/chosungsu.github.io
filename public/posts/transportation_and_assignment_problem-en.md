---
title: 'Transportation and Assignment Problems Ⅰ'
date: '2024-07-19'
tags: ['Operations Research 1', 'lecture']
---

### typical transportation problem

For example, suppose a manufacturing company has $m=2$ factories to meet the demands of $n=3$ customers. The unit transportation cost from factories to customers varies depending on the distance. The unit transportation costs from Factory 1 to customers are (8, 6, 10), and from Factory 2 to customers are (9, 12, 13). The maximum daily supply capacity of Factory 1 and Factory 2 is set at (40, 50), and each customer needs a minimum of 30 products per day.

For decision variables, we define $x_{ij}$ as the number of products shipped from factory i to customer j. The objective function is defined as min $z=8x_{11}+6x_{12}+10x_{13}+9x_{21}+12x_{22}+13x_{23} \rightarrow z=\sum_{i=1}^{m}\sum_{j=1}^{n} c_{ij}x_{ij}$, and the constraints can be written as $x_{11}+x_{12}+x_{13} \le 40$, $x_{21}+x_{22}+x_{23} \le 50$, $x_{11}+x_{21} \ge 30$, $x_{12}+x_{22} \ge 30$, $x_{13}+x_{23} \ge 30$. When generalizing the constraints, they can be expressed as $\sum_{j=1}^{n} x_{ij}=s_i, i=1,...,m$, $\sum_{i=1}^{m} x_{ij}=d_j, j=1,...,n$, $\sum_{i=1}^{m} s_i=\sum_{j=1}^{n} d_j$.

---

### finding BFS

#### Northwest corner method

Find the northwest corner cell in the transportation tableau. Allocate the maximum possible amount to the selected cell and adjust the supply and demand amounts by subtracting the allocated amount. Next, delete any row or column where supply or demand becomes 0. If both row and column have 0, delete one arbitrarily. If only one cell remains undrawn, draw and delete it, then stop.

For example, suppose we have a tableau where the first row has a total supply of 5, the second row has 1, the third row has 3, and the demand amounts are 2 for the first column, 4 for the second column, 2 for the third column, and 1 for the fourth column.

Putting **2** in the northwest cell leaves (3, 0) based on (row, column). For step 2, we need to delete any row or column that becomes 0, so we delete the entire first column where demand became 0, and since more than one cell remains, we repeat from the input step.

Among the remaining cells, we put **3** in the northwest cell since supply < demand, leaving (0, 1). For step 2, we delete the row. Since more than one cell remains, we repeat from the input step.

Among the remaining cells, we put **1** in the northwest cell since supply = demand, leaving (0, 0). For step 2, we need to delete one line arbitrarily, so let's delete the row. Since more than one cell remains, we repeat from the input step.

Among the remaining cells, although supply > demand in the northwest cell, since demand is 0, we put **0**, leaving (3, 0). For step 2, we delete the column. Since more than one cell remains, we repeat from the input step.

Among the remaining cells, since supply > demand in the northwest cell, we put **2**, leaving (1, 0). For step 2, we delete the column. In the last remaining cell, we put the remaining value **1**, and all cells are deleted.

We can verify if it's a BFS by checking the input cell values and constraints. The advantage of this method is that it requires the least computational effort, but the disadvantage is that it may result in a very high-cost BFS since it doesn't utilize cost information.

#### Minimum cost method

Find the cell with the lowest unit cost in the transportation tableau. If values are equal, decide arbitrarily. Allocate the maximum possible amount to the selected cell and adjust the supply and demand amounts by subtracting the allocated amount. Next, delete any row or column where supply or demand becomes 0. If both row and column have 0, delete one arbitrarily. If only one cell remains undrawn, draw and delete it, then stop.

For example, suppose we have a tableau where the first row has a total supply of 5, the second row has 10, the third row has 15, and the demand amounts are 12 for the first column, 8 for the second column, 4 for the third column, and 6 for the fourth column. The unit transportation costs for each cell are $\begin{bmatrix} 2 & 3 & 5 & 6 \\ 2 & 1 & 3 & 5 \\ 3 & 8 & 4 & 6 \end{bmatrix}$.

In cell $x_{22}$ with the lowest unit cost, we put **8** since supply > demand, leaving (2, 0) based on (row, column). For step 2, we need to delete the column where it became 0. Since more than one cell remains, we repeat from the input step.

Next, among cells with the lowest unit cost, we arbitrarily choose cell $x_{21}$ and put **2** since supply < demand, leaving (0, 10). For step 2, we delete the row. Since more than one cell remains, we repeat from the input step.

Next, in cell $x_{11}$ with the lowest unit cost, we put **5** since supply < demand, leaving (0, 5). For step 2, we delete the row. Since more than one cell remains, we repeat from the input step.

Next, in cell $x_{31}$ with the lowest unit cost, we put **5** since supply > demand, leaving (10, 0). For step 2, we delete the column. Since more than one cell remains, we repeat from the input step.

Next, in cell $x_{33}$ with the lowest unit cost, we put **4** since supply > demand, leaving (6, 0). For step 2, we delete the column. In the last remaining cell, we put the remaining value **6**, and all cells are deleted.

We can verify if it's a BFS by checking the constraints. The advantage of this method is that it utilizes cost information and may be closer to the optimal solution, but the disadvantage is that it may require slightly more computational cost.

#### Vogel's method

For each row or column, calculate the penalty by subtracting the smallest unit cost from the second smallest unit cost in that row or column. Then find the row or column with the largest penalty and locate the cell with the lowest unit cost within it. If penalties or unit costs are equal, choose arbitrarily. Allocate the maximum possible amount to the selected cell and adjust the supply and demand amounts by subtracting the allocated amount.

For example, suppose we have a tableau where the first row has a total supply of 10, the second row has 15, and the demand amounts are 15 for the first column, 5 for the second column, and 5 for the third column. The unit transportation costs for each cell are $\begin{bmatrix} 6 & 7 & 8 \\ 15 & 80 & 78 \end{bmatrix}$.

The penalty for the first row is $(7-6)=1$, for the second row is $(78-15)=63$, for the first column is $(15-6)=9$, for the second column is $(80-7)=73$, and for the third column is $(78-8)=70$.

In column $C_2$ with the largest penalty, we put **5** in cell $x_{12}$ with the lowest unit cost since supply > demand, leaving (5, 0). We delete column $C_2$ which became 0. Since more than one cell remains, we repeat from the input step.

Repeating and updating penalties, the first row's penalty becomes $(8-6)=2$, while the second row, first column, and third column penalties remain the same.

Next, in column $C_3$ with the largest penalty, we put **5** in cell $x_{13}$ with the lowest unit cost since supply = demand, leaving (0, 0). We randomly delete column $C_3$ which became 0. Since more than one cell remains, we repeat from the input step.

Repeating and updating penalties, we eliminate penalties for rows with only one cell remaining, and the first column's penalty remains the same.

Next, in column $C_1$ with the largest penalty, we put **0** in cell $x_{11}$ with the lowest unit cost since supply < demand, leaving (0, 15). We delete row $R_1$ which became 0. In the last remaining cell, we put **15**, and all cells are deleted.

The advantage of this method is that it can avoid high-cost BFS and may not require too many pivot iterations later, but the disadvantage is that it's more complex compared to other methods.

---

### References

[Original Source #1](https://youtu.be/QzESRTsLnUk?si=prhp9OkWCHKFKr2x)

[Original Source #2](https://youtu.be/v-JcpuQOfjk?si=wQlJ8NV0do-RGrhx)

[Original Source #3](https://youtu.be/YxyTSBs19NE?si=yj9pubEz1KJKk2if)

[Original Source #4](https://youtu.be/6MB4ns6Evak?si=iCwP5-2O_1MMHpU3)



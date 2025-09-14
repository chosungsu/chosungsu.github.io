---
title: 'Pair of Random variable'
date: '2024-05-11'
tags: ['Probability&Statistics', 'lecture']
---

### Pair of r.v

For example, let sample space $S=\{1, 2, 3, \cdots, 10\}$ contain the number of students, second sample space $S_w=\{55, 60, 60, \cdots, 100\}$ contain weights, and third sample space $S_h=\{170, 145, 155, \cdots, 180\}$ contain heights.

At this time, if $W=60$, we can see that $H=145$ or $H=155$ can be obtained. This is one example of understanding whether there is a correlation.

---

### Joint pmf

For discrete random variables $X, Y$, it is defined as $P_{XY}(x,y) \triangleq P[\{X=x\} \cap \{Y=y\}]$. This value cannot be negative and the total sum is 1.

Going beyond the pmf $P_X(x)=P[X=x]$ for random variable $X$ that we learned before, we can think of $P[\{X=x\} \cap \{Y=\text{any}\}]=\sum_k P_{XY}(x,y_k)$. This is a method to eliminate dependency on $Y$. At this time, $P_X(x)$ is called the marginal pmf. This process is applied identically to $Y$ as well.

---

### Joint cdf

It is defined as $F_{XY}(x,y) \triangleq P[\{X \le x\} \cap \{Y \le y\}]$.

The cdf for $X$ that we learned before can be obtained as $F_X(x) = F_{XY}(x, \infty)$. That is, since cdf is density, there is a difference that only the range needs to be specified.

Accordingly, if we express the probability value of $P[x_1 < X \le x_2, y_1 < Y \le y_2]$ using cdf, it is as follows: $F_{XY}(x_2, y_2)-F_{XY}(x_1, y_2)-F_{XY}(x_2, y_1)+F_{XY}(x_1,y_1)$.

---

### Joint pdf

Since cdf and pdf have a differential-integral relationship, in $F_{XY}(x,y)=\int_{-\infty}^{x}\int_{-\infty}^{y} f_{XY}(x',y')dy'dx'$, the left side is cdf and the function inside the integral sign on the right side $f_{XY}(x',y')=\frac{\partial}{\partial x}\frac{\partial}{\partial y} F_{XY}(x,y)$ can be called the pdf.

It can be obtained as $f_X(x)=\frac{d}{dx}F_X(x)=\frac{d}{dx}F_{XY}(x, \infty)$, and $f_X(x),f_Y(y)$ are both called marginal pdfs.

---

### Independent r.v

When $P[A_1 \cap A_2]=P[A_1] \cdot P[A_2]$, they are said to be independent of each other. The probability values of discrete r.v.s that are independent of each other can also be calculated as $P_{XY}(x_i, y_i)=P_{X}(x_i)P_{Y}(y_i)$. Continuous r.v.s can also be calculated as $F_{XY}(x,y)=F_X(x)F_Y(y)$, $f_{XY}(x,y)=f_X(x)f_Y(y)$.

---

### Covariance

When $Cov(X,y)=E[(X-m_x)(Y-m_y)]$, if $m_x=0$ or $m_y=0$, then $Cov(X,Y)=E[XY]=Corr(X,Y)$ holds. For a simple proof, $E[X(Y-m_y)]=E[XY]-E[X] \cdot m_y$, and since we set $m_x=0=E[X]$, the second value on the right side becomes 0, making the above equation hold.

If $X, Y$ are independent, then $Cov(X,Y)=0$. For a simple proof of this as well, $Cov(X,Y)=E[XY]-m_x \cdot E[Y]-m_y \cdot E[X]+m_x \cdot m_y=E[XY]-m_x \cdot m_y=E[X]E[Y]-E[X]E[Y]=0$ holds.

The correlation coefficient $\rho$ is defined as follows:

$$
\rho_{XY} \triangleq \frac{Cov(X,Y)}{\sqrt{Var[X]} \cdot \sqrt{Var[Y]}}
$$

The correlation coefficient has a range of $-1 \le \rho_{XY} \le 1$.

---

### References

[Original Source #1](https://www.youtube.com/watch?v=sRjGkR9ybew&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=12)




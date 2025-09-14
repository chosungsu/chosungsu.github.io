---
title: 'A model for scheduling the resource deployment in a multi-stage ramp-upproduction system'
date: '2024-12-24'
tags: ['scm', 'paper review']
---

### Abstract

As customer product requirements change rapidly, demand volatility is increasing, and supply chains must respond more quickly accordingly. Particularly, the ramp-up process (production volume increase) of new products is the core of such responsiveness, and successful implementation and effective management are crucial. The smoother the ramp-up process, the more problems and delays are minimized, leading to cost reduction and profitability improvement.

This study developed a model to describe and analyze multi-stage ramp-up production systems to achieve these objectives. Through this model, we aim to identify the most cost-effective policy for controlling multiple ramp-ups simultaneously. We propose a search-based optimization approach for problem solving and develop a decision framework that classifies resource deployment and planning patterns through numerical analysis. This aims to make the ramp-up process efficient and flexibly respond to increasing demand.

Additionally, we conducted sensitivity analysis to understand how changes in input parameters affect system behavior. The results of this study provide managerial implications and insights based on numerical analysis.

---

### Introduction

In recent years, product innovation and market demand changes have shortened product life cycles and increased new product launches. These changes have made ramp-up management a priority for many companies. Production ramp-up refers to the period from when product development is completed until maximum production capacity is reached, and is broadly divided into two stages.

-It begins after pilot production is completed (often not considered part of production ramp-up).

-There is pre-series, which teaches new processes to employees in low-volume production stages, and zero-series production, which is the first part of the low-volume production stage.

After completing these stages, production volume must be expanded until production capacity is reached at the end of the ramp-up.

Fast ramp-up helps companies launch products to market earlier and at higher prices, securing market share and improving profitability. The longer ramp-up takes, the more costs increase and the harder it becomes to maintain competitive advantage. Additionally, there is evidence that well-managed ramp-up leads to more efficient maximum production capacity processes, ultimately improving the company's cost competitiveness throughout the product life cycle.

---

### Literature review

Production ramp-up processes have received considerable attention from researchers, leading to ongoing studies. This section will discuss only studies particularly relevant to this research.

Niroomand, Kuzgunkaya, and Bulgak (2014) proposed a model for allocating production capacity to two alternative production systems during ramp-up: dedicated production systems and reconfigurable manufacturing systems. They consider various ramp-up patterns and support decision-makers in selecting appropriate production system configurations according to ramp-up characteristics.

Neumann and Medbo (2017) compared ramp-up performance of serial and parallel production systems in simulation experiments. They assumed that worker performance improves along a learning curve and analyzed the trade-off that line production systems provide more learning opportunities but lower productivity than parallel structures. Their results showed that parallel system structures had longer ramp-up times than serial flow systems but demonstrated better throughput, surpassing serial system structures.

Camargo, Toledo, and Almada-Lobo (2012) discussed various time-based formulations for two-stage lot sizing and scheduling problems. They showed that continuous-time formulations perform better than discrete-time and hybrid formulations but have the disadvantage of lower computational performance.

We develop learning curves that describe production volume increases (or production throughput decreases due to quality issues) in manufacturing systems during ramp-up. Some researchers call learning curves startup curves because they measure production volume increases during production ramp-up. This paper extends the research of Kim, Glock, and Emde (2021) to model and study multi-stage ramp-up production systems considering continuous-time ramp-up periods rather than discrete-time ramp-up periods.

---

### Problem description

This study considers a serial multi-stage production system where ramp-up occurs during new product production. During this ramp-up period, production speed increases through worker learning, and demand increases as customer acceptance of the product improves.

<img src="https://velog.velcdn.com/images/devjo/post/e74b4c71-bfca-47a0-b557-835aa511a7b0/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

The above figure shows the structure of a single product production system where the ramp-up period at each stage can be subdivided into an integer number of time periods that may not be uniform.

This paper assumes continuous-time modeling instead of discrete-time production periods, which is a concept extending the research of Kim, Glock, and Emde (2021). First, we assume that a single production period at an upper stage can be subdivided into multiple production periods at a lower stage. For example, production period j at upper stage i is divided into α_{i,j} periods at lower stage (i-1).

<img src="https://velog.velcdn.com/images/devjo/post/8da6e42d-541d-49ce-a0d2-09ca5c9fe389/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

In the above image, we can see that the first production period of stage 3 is divided into α_{3,1}=3 periods at stage 2, and the second production period is divided into α_{3,2}=2 periods. For adjacent two stages, there is no restriction on the number of sub-periods at the lower stage from the period at the upper stage. Items produced at stage i can be consumed immediately at the lower stage. This is called an open production system. Shortages are not allowed at any production stage. Therefore, the inventory level at the end of each production period is 0.

Production speed and constraints are defined as follows.

$$
p_{i,j}(t) \\
=\sum_{l=1}^{j} w_{i,l,j} * g_i(T_{i,j-1}-T_{i,l-1}+t) \\
=\sum_{l=1}^{j} w_{i,l,j}(p_{i}^{max}-\delta_i^Pe^{-\frac{T_{i,j-1}-T_{i,l-1}+t}{\tau_i}}), \\
0 \le t \le \theta_{i,j}
$$

In the above equation, the term T_{i,j-1}-T_{i,l-1} represents the cumulative time that stage i has accumulated experience until the start of period j for resources introduced in period l.

$$
p_{i,j}(0) \ge p_{i-1, N_{i,j-1}+1}(0), \\
i \in m-\{1\}
$$

This constraint ensures no shortage at stage i. This means that the production speed at the left side, which is the production speed at the start of period j at upper stage i, must be at least greater than or equal to the right side, which is the production speed within the corresponding period at the lower stage.

---

### model development

#### 1. Production Period Management (α)

To express the number of sub-periods at a specific production stage, we define it as α. The production period formula can be expressed as follows.

$$
n_{m+1}=\alpha_{m+1,1}, \\
n_i=\sum_{l=1}^{n_{i+1}} \alpha_{i+1,l}, \\
N_{i,j}=\sum_{l=1}^{j} \alpha_{i,l}
$$

We introduce a dummy node representing the number of production periods at the first production stage, i.e., (α_{m+1, 1}) at m. The number of production periods at stage i can be calculated based on the production period composition of the adjacent upper stage. N_{i,j} is the cumulative number of sub-periods used to calculate inventory at stage i.

#### 2. Production Period Management (θ)

$$
\theta_{i,j} \ge \theta_{min}, \\
\theta_{i,j} = \sum_{l=1}^{\alpha_{i,j}} \theta_{i-1,N_{i,j-1}+l}, \\
T_{i,j}=\sum_{l=1}^{j} \theta_{i,l}, \\
\sum_{j=1}^{n_i} \theta_{i,j} = H
$$

All production periods must have a minimum length, and when period j at stage i is subdivided into α_{i,j} periods at stage (i-1), it ensures that the sum of the lengths of the sub-periods at stage (i-1) equals the length of the original period j.

#### 3. Production Resource Management (w)

$$
w_{i,l,j} \ge w_{i,l,j+1}, \\ 
\text{ where } l \text{ in } n_i-\{n_i\} \text{ and } l \le j \le n_i-1, \\
\rho_{i,l,j}=(w_{i,l,l}-w_{i,l,j}), \\
\text{ where } l \text{ in } n_i-\{n_i\} \text{ and } l+1 \le j \le n_i, \\
w_{i,l,j}=0, \\
\text{ where } l > j
$$

This ensures that resources introduced in period j can be maintained or decreased consistently in subsequent periods. We calculate the number of withdrawn resource units used in period l at stage i newly introduced in period j. And it ensures that resources cannot be used in periods before they are introduced.

#### 4. Production Capacity Management (p)

$$
G_{i,j}(\theta_{i,j})=\int_{0}^{\theta_{i,j}} p_{i,j}(t)dt \\
=\sum_{l=1}^{j} w_{i,l,j}(p_{max, i}k_{i,j} \\
-\tau_i\delta_{p,i}e^{-\frac{T_{i,j-1}-T_{i,l-1}-1}{\tau_i}} \\
*(1-e^{-\frac{\theta_{i,j}}{\tau_i}})
) \\
G_{i,j}(\theta_{i,j})=\sum_{l=1}^{\alpha_{i,j}} G_{i-1,N_{i,j-1}+l} \\
(\theta_{i-1, N_{i, j-1}+l}), i \in m - \{1 \}
$$

This represents the number of items manufactured during period j at stage i, where p_{i,j}(t) is the instantaneous production speed at time t. There should be no inventory at the end of each production period, and to prevent shortages at any stage, the following equation must also be satisfied.

$$
p_{i,j}(0)=\sum_{l=1}^{j} w_{i,l,j} \\
*(p_i^{max}-\delta_i^pe^{-\frac{T_{i,j-1}-T_{i,l-1}-1}{\tau_i}}), \\
q_j=G_{i,j}(\theta_{1,j})=\int_{0}^{\theta_{1,j}}p_{1,j}(t)dt, \\
q_j=D(T_{1,j-1}+\theta_{1,j})
$$

#### 5. Production Inventory Management

$$
AIL_1=\frac{1}{H} \sum_{j=1}^{n_1}(SP_{1,j}(k_{1,j})\\
-SD_j(\theta_{1,j})), \\
AIL_i=\frac{1}{H}\sum_{j=1}^{n_i} (SP_{i,j}(\theta_{i,j}) \\
-\sum_{l=1}^{a_{i,j}}SP_{i-1,N_{i,j-1}+l}\\
(\theta_{i-1,N_{i,j-1}+l})), \\
SP_{i,j}(t)= \int_0^t G_{i,j(y)}dy \\
=\int_0^t \sum_{l=1}^{j} w_{i,l,j} (p_j^{max}y \\
-\tau_i\delta_i^pe^{-\frac{T_{i,j-1}-T_{i,l-1}-1}{\tau_i}} \\
*(1-e^{-\frac{y}{\tau_i}}))dy
$$

This represents the average inventory level at stage i, where AIL_1 calculates the average inventory level at the final production stage. And we calculate inventory for items produced during period j at stage i.

#### 6. Total Cost Function

$$
TRC(\alpha, \theta, w, p) = \sum_{i=1}^{m}s_i n_i \\
+ \sum_{i=1}^{m} h_i AIL_i + r_u \sum_{i=1}^{m} \sum_{l=1}^{n_i} \sum_{j \ge l}^{n_i} w_{i,l,j} \theta_{i,j} \\
+ r_w \sum_{i=1}^{m} \sum_{l=1}^{n_i} \sum_{j \ge l}^{n_i} \rho_{i,l,j}
$$

In the above equation, the first term sums setup costs for all stages, the second term calculates inventory holding costs, the third term calculates total resource withdrawal costs, and the final term calculates resource utilization costs.

---

### solution procedure

We need to solve two interdependent decision problems simultaneously: production periods (α) across multiple stages, and detailed production planning (θ, w, p) including resource planning. We designate these two modules as FSM and BSM, and solve the minimization model with the above TRC as the objective function.

<img src="https://velog.velcdn.com/images/devjo/post/ea7ee3d1-2067-4096-9895-694723307a77/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

First, FSM has two modules: the first module is used to determine α by constructing period composition from the beginning to the end. The other module solves the optimization problem and is based on a steepest descent approach. We iteratively construct period composition α and then run the solver to find the optimal solution. As can be seen in the above image, when m=4, it contains all possible compositions of production periods, and this is how we update α by decomposing production periods.

<img src="https://velog.velcdn.com/images/devjo/post/cdf1270d-447d-4065-93e5-ccc4b5df98c7/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Next is BSM, which is a solution that goes backwards from the final stage to the first stage, using an integer programming model that satisfies feasibility between two consecutive stages, where the number of sub-periods at stage i must equal the number of periods at i-1.

---

### insights

We found that continuous-time models consistently show superior performance compared to discrete-time models, which means we need to utilize production periods with unequal period lengths.

Second, if inventory holding costs are high relative to setup costs at one production stage, it is necessary to have multiple sub-periods, but measures to reduce setup costs at upper stages should be prioritized over this.

---

### Conclusion

In this study, we researched the problem of managing multi-stage production systems including learning that affects production speed, proving that it is necessary to consider continuous-time production periods.

-Assumption about the composition that a single production period at a production stage is divided into multiple sub-periods at the next production stage

-Assumption that inventory levels at the end of production periods are strictly set to 0

-Assumption considering quality-related operational elements and related costs

-Assumption that learning occurs regardless of cumulative production volume

To this end, we proposed a procedure that considers the interconnection between adjacent stages through an optimization model including multiple decision variables such as production speed, number of allocated resources, and production periods. However, this research had limitations, and we believe that if research to solve the above limitations follows, it will become a more practical framework.

---

### References

[Original Source #1](https://www.tandfonline.com/doi/epdf/10.1080/00207543.2024.2426694?needAccess=true)




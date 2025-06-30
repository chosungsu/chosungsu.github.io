---
title: 'Enhancing supply chain efficiency : two stage model for multiple sourcing'
date: '2024-12-26'
tags: ['scm', 'paper review']
---

### Abstract

This paper presents a two-stage mathematical model aimed at enhancing supply chain efficiency by evaluating multiple sourcing strategies and optimizing additional procurement.

The first stage establishes a foundation for understanding resource requirements by minimizing the gap between Sales and Operations Planning (SOP) and the maximum achievable production volume given current inventory levels. The second stage focuses on optimizing additional procurement strategies considering lead times and cost efficiency. By analyzing the advantages and disadvantages between multiple sourcing and single supplier approaches, it provides valuable insights for supply chain decision-makers.

It provides a practical framework for strengthening supply chain resilience while improving supply chain efficiency, reducing gaps, and enhancing customer satisfaction when facing unexpected challenges.

---

### Introduction

The manufacturing industry is a dynamic and highly competitive field due to technological advancements, product diversification, and rapidly changing market demands, making the need to optimize production processes and supply chains increasingly important.

The COVID-19 pandemic that began in early 2020 brought unprecedented challenges to the electronics manufacturing environment. The pandemic disrupted global supply chains, causing shortages of critical electronic components, raw materials, and skilled labor. Lockdowns, travel restrictions, and factory closures exacerbated these issues, further intensifying resource constraints and making them unpredictable. Manufacturers had to quickly adapt to these new realities, reassess production strategies, and find innovative ways to mitigate the impact of this disruption.

One of the unique characteristics of electronics manufacturing is the constant need for innovation. Electronic devices face rapid obsolescence due to continuous advancements in technology, design, and functionality. Consequently, manufacturers must continuously adjust their product offerings to integrate the latest technological innovations and stay ahead of the competition. These frequent product changes inherently create complexity in production planning, requiring not only efficient production of existing product lines but also rapid introduction of new products and variants.

To meet Sales and Operations Planning (SOP), electronics manufacturing companies often need to employ sophisticated procurement practices. This includes strategically sourcing critical components and materials through traditional suppliers or exploring alternative supply chain channels. The procurement process must be agile and quickly responsive to market dynamics to ensure that materials needed to support production plans are secured whenever required. Facing resource constraints and pandemic-induced unpredictability, procurement practices are essential for bridging the gap between supply and demand and achieving the goals outlined in SOP.

Therefore, this research proposes a holistic approach to optimize electronics manufacturing operations by addressing the challenges of resource constraints, supply chain resilience, and effective procurement practices. This is named the Resource-Constrained Multi-Phased Procurement Optimization Model (RCMPO).

---

### Literature review

We review two fundamental aspects of modern supply chain management: multiple sourcing strategies and procurement strategy optimization.

Inventory management is a crucial component of supply chain and operations management, encompassing the planning, control, and optimization of various components that constitute organizational inventory. One of the core topics is the trade-off between carrying costs and ordering costs. Harris [16] introduced the Economic Order Quantity (EOQ) model as a basic framework for balancing these costs. The EOQ model provides a framework for determining the optimal order quantity that minimizes total inventory costs by considering ordering costs and holding costs.

Supplier selection and sourcing strategies play a pivotal role in the success of manufacturing organizations. The decision to select suppliers is a multifaceted process that includes considerations such as cost, quality, reliability, and capacity. Traditionally, companies relied on single sourcing strategies where one primary supplier provided essential elements. However, as supply chain complexity and globalization increased, manufacturing companies have transitioned to multiple sourcing strategies that diversify their supplier base across multiple suppliers. The adoption of multiple sourcing brings several benefits including supply chain risk reduction, quality improvement, and cost efficiency. (Burke [26]; Yohanes [27]) Nevertheless, this approach also presents challenges such as increased coordination complexity and elevated costs.

Sen [30] proposes evaluating and optimizing integrated supply chain demand response strategies (SCDRS) such as make-to-stock, make-to-order, and assemble-to-order. Migalska [31] develops an integer linear programming model to optimize the allocation of finished products to customers and raw materials to products under constraints such as component shortages. This approach enables rapid response to supply issues and systematic supply chain decision-making. Stefea [32] emphasizes methods to enhance manufacturing efficiency by optimizing resource consumption of direct materials, labor, and overhead. Rao [33] reviews current supply chain strategies and proposes improvements such as increasing flexibility and agility to ensure customers receive the right products on time. Hammer [34] proposes utilizing lean, green, and constraint management approaches with integrated loss bridges to reduce waste and costs. Ghani [35] proposes a conceptual approach to minimize energy consumption in production through integrated monitoring systems to help sustainable resource use. Tian [36] develops a graph-based cost model to optimize manufacturing supply chain network configuration for outsourcing and risk-considered restructuring decisions.

As reviewed, existing literature on supply chain optimization primarily focuses independently on various sourcing methods or procurement strategies to meet SOP. However, there is a notable research gap in integrating these two important aspects of supply chain management into a cohesive two-stage mathematical model. Addressing this research gap is essential to provide supply chain decision-makers with a holistic and practical approach to enhance supply chain efficiency and resilience.

---

### Problem description

The goal is to establish an optimal production plan to maximize the fulfillment of given SOP (Sales and Operations Planning) using Mixed Integer Linear Programming (MILP). We divide the decision-making process into two stages.

-Calculate production volume under current inventory levels. In this stage, we do not consider additional resource procurement. This meaning is to provide planners with an optimal plan under given resources.

-Explore possible target value improvements through resource procurement. For example, we can consider two cases: when it takes moderate time such as truck or ship transportation, and when faster transportation is desired.

<img src="https://velog.velcdn.com/images/devjo/post/fc7f4df7-08f1-4e18-8379-69f51d578614/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

The above image shows the structure of the framework proposed in this paper.

The assumptions for the problem are set as follows.

-Assume a company that considers multiple sourcing compared to single sourcing

-Assume that SOP levels and current inventory levels are given

-Assume that products can be produced from various components procured from multiple suppliers

Under the above assumptions, the concepts used in this paper can be explained as follows: shortage represents the gap between SOP levels and calculated production volume, and minimizing this shortage can be said to be the goal of the first stage. Next, multiple sourcing strategy is to identify whether some components can be multiple sourced. Procurement strategy is explained as a multi-arc graph in the second stage and refers to procurement through appropriate transportation or express transportation as mentioned above.

#### Stage 1

<img src="https://velog.velcdn.com/images/devjo/post/b4628b36-a771-4432-b352-5dfe45958a0a/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

We construct an ordered set $N_r^b$ where component $b$ represents the hierarchical level. Higher-level elements mean the transformation from raw materials to semi-finished products, and to achieve this, we use Depth-First Search (DFS). At this time, branches $r$ are formed. The component parts $j$ within this branch fill the ordered set.

Now using the set, we define the mathematical model ($P_1$) as follows.

$$
\text {max} \sum_{p \in P} \sum_{b \in B^p} y_b, \\
s.t. \sum_{j \in N_r^b} c_{rj}^b/q_{rj}^b = y_b, \\
\sum_{b \in B^p} \sum_{r \in R^b} \sum_{j \in N_r^b} c_{rj}^b \le stock_i, \\
\sum_{b \in B^p} y_b \le SOP_p
$$

The objective function aims to maximize possible production volume, which is equivalent to minimizing shortage. We calculate production volume by dividing the determined usage of component $j$ $(c_{rj}^b)$ by the usage rate required to make a single product $(q_{rj}^b)$. And we set the usage of each component $i$ to the current inventory level, and production volume to the SOP level as an upper bound.

#### Stage 2

The goal of the second stage is to procure materials while optimizing the balance between production volume, lead time, and cost.

As parameters, $Price_p$ is the selling price of product $p$, $Cost_{im}$ is the purchase price of component $i$ procured by method $m$, $TL$ is the time limit for all components, and $LT_{jm}$ is the lead time of component $j$ procured by method $m$. At this time, if materials are procured exceeding $TL$, a $Penalty$ is imposed.

Now using the set, we define the mathematical model ($P_2$) as follows.

$$
\text {max} \sum_{p \in \bar{P}} \sum_{b \in \bar{B^p}} Price_b*y_b \\
-\sum_{r \in \bar{R^b}} \sum_{p \in \bar{P}} \sum_{b \in \bar{B^p}} \sum_{i \in \bar{I}} \sum_{j \in \bar{N^b}} \sum_{m \in PM} Cost_{im}*(\zeta_{rjm}^{b-}+\zeta_{rjm}^{b+}) \\
-\sum_{r \in \bar{R^b}} \sum_{p \in \bar{P}} \sum_{b \in \bar{B^p}} \sum_{j \in \bar{N^b}} \sum_{m \in PM} Penalty*\zeta_{rjm}^{b+}, \\
s.t. \sum_{j \in \bar{N_r^b}} c_{rj}^b/q_{rj}^b = y_b, \\
\sum_{b \in B^p} y_b \le \bar{SOP_p}, \\
c_{rj}^b=\sum_{m \in PM} (\zeta_{rjm}^{b-}+\zeta_{rjm}^{b+}), \\
TL + M*(x_{rjm}^b-1)+1 \le LT_{jm}, \\
TL+M*x_{rjm}^b \ge LT_{jm}
$$

The objective function aims to maximize the profit of all additionally produced products while deducting costs incurred from additional component purchases and penalties due to delayed arrivals. It ensures that $x_{rjm}^b$ becomes 0 if component $j$ procured by method $m$ arrives within the time limit, and 1 otherwise.

---

### conclusion

To emphasize the importance of utilizing multiple sourcing strategies, we covered various literature and methods, and these validated methodologies serve as important defense mechanisms against uncertainty, ultimately improving product quality and providing cost reduction opportunities. With the help of mathematical models and decision-making frameworks focused on the complexity of procurement strategy optimization, we support manufacturing companies to effectively balance cost efficiency, resource allocation, and agility. This enables strategic deployment of resources while skillfully navigating constraints arising from resource availability.

This paper introduces a comprehensive two-stage decision-making framework to achieve two important goals in supply chain management. The first stage of the framework focuses on maximizing production volume to meet required SOP levels, ensuring efficient order fulfillment. In the second stage, the framework shifts focus to profit maximization by integrating additional procurement strategies as post-planning measures. By adopting this two-stage approach, the framework effectively balances the immediate operational requirement of SOP fulfillment with the long-term goal of profit optimization, providing a holistic solution for manufacturing companies.

While providing valuable insights into strategies for enhancing supply chain resilience, there are still limitations that the dataset is limited to a single Korean company, and various supply chain networks existing in different regions may produce different results. Additionally, while the utilization of MILP to solve the formulated problem is effective for the current dataset, it may face computational difficulties, especially in terms of computation time, when applied to larger datasets, so considering alternative artificial intelligence methodologies such as Reinforcement Learning would be more productive research. Finally, the proposed RCMPO does not describe production line capacity associated with each model.

---

### References

[Original Source #1](https://www.mdpi.com/2071-1050/15/22/16122)




---
title: 'FL-SSDAN: Fleet-level semi-supervised domain adaptation network for fault diagnosis of overhead hoist transports'
date: '2025-09-14'
tags: ['fault diagnosis', 'paper review']
---

### Abstract

Fault diagnosis of Overhead Hoist Transports (OHT) is critical in semiconductor manufacturing, as OHT failures can interrupt wafer transfer between tightly synchronized processes, leading to significant downtime and potential wafer damage. However, developing fault diagnosis frameworks applicable across entire OHT fleets is challenging due to significant variability in torque signals across individual devices, limited availability of labeled data, and the need for interpretability to support on-site decision-making.

To address these issues, this paper proposes a novel approach called a fleet-level semi-supervised domain adaptation network that enables robust and interpretable OHT fault diagnosis. The proposed method uses a semi-supervised domain adaptation strategy to mitigate domain discrepancies across devices and improves diagnostic performance by utilizing both unlabeled and labeled data.

Additionally, the method processes dual motor torque signals from front and rear motors as physically meaningful signals and uses a multi-head CNN structure to extract features. A feature-weighting module is integrated to dynamically emphasize informative features, which not only improves diagnostic performance but also enhances interpretability of the diagnostic process.

Validation of this method was performed using datasets recorded from OHT devices operating in real multi-semiconductor manufacturing lines, demonstrating excellent fault diagnosis performance and high practical applicability under limited labeling conditions. Moreover, the model provides interpretable diagnostic insights through multi-head weight contribution analysis, enabling more reliable health state assessment.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/0b82f4f4-5ae0-4ddc-bf85-df0ef386cfc9/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

OHTs are a type of essential automated material handling system in semiconductor factories (Kuo, 2002; Wan & Shin, 2022). They primarily move autonomously along guide rails installed on factory ceilings and are used for wafer transport (Kim et al., 2007). OHT components experience high stress due to continuous vehicle movement, making them vulnerable to rapid performance degradation (Zhakov et al., 2020). Such degradation can cause OHT device failures, and when one device stops operating, other devices on the same rail are affected, ultimately halting entire production lines. Therefore, accurately assessing the health state of each OHT device is essential for maintaining high wafer manufacturing yield.

Signals such as current, vibration, and torque have been widely utilized to ensure reliable operation of mechanical systems and their sub-components (Deng et al., 2025; Feng et al., 2022, 2025; Hwang et al., 2025; Kim et al., 2023; Lee et al., 2023; Lian et al., 2025; Park et al., 2023). In particular, torque signals obtained from motor control systems have been used for fault diagnosis tasks because they provide valuable insights into system state without additional sensors (Oh et al., 2022). Since OHTs are driven by dual motor systems operating under controlled torque signals as shown in the figure above, these signals can be utilized for fault diagnosis.

Industrial OHT fault diagnosis has traditionally relied on expert knowledge or simple rules such as monitoring increases in overall torque magnitude during specific operations. However, such approaches lack robustness when applied across multiple OHTs. This is primarily due to domain discrepancies between individual OHT devices caused by hardware manufacturing tolerances and control parameter adjustments, leading to deviations in signal distributions.

Furthermore, insufficient labeled datasets limit the ability to reliably diagnose all OHT devices, reducing the effectiveness of such approaches. For this reason, diagnostic algorithms trained on available labeled data tend to generalize only to certain groups of OHT devices characterized by torque signal patterns similar to those seen during training.

Recent advances in transfer learning within deep learning have been specifically developed to address domain discrepancy and label data scarcity issues, becoming a key strategy for improving fault diagnosis across multiple domains (Cui et al., 2024; Dong et al., 2022; Huang & Sheng, 2024; Li et al., 2021; Shin et al., 2023). Transfer learning typically adapts models to target domains with limited label data by fine-tuning pre-trained models, leveraging knowledge from well-established source domains.

This paper proposes FL-SSDAN (Fleet-Level Semi-supervised Domain Adaptation Network), a novel fault diagnosis method for OHT vehicles. The proposed method accounts for domain differences across OHT devices, utilizes unlabeled data for fault diagnosis, and provides interpretable diagnostic results.

---

### Related Works

#### 1. Relationship Between Torque Signal and Faults in Overhead Hoist Transport

We explain background knowledge about OHT faults and their relationship with torque signals. Wheel and gear faults are among the most common failure modes in OHT systems operating in industrial environments due to continuous rail contact, frequent direction changes, and varying load conditions. Wheels are prone to wear from continuous friction, while gears inside motor reducers often experience fatigue and backlash from repeated load transmission and mechanical stress. Given this prevalence, this study focuses on diagnosing these two faults, including normal state. Compound faults (where multiple faults occur simultaneously) are extremely rare in OHT systems and are not considered in this study.

From each motor's perspective, these changes are transmitted from load torque $T_L$ to electromagnetic torque $T_E$, which we obtain from motor controllers for fault diagnosis (Yao et al., 2019). For servo motors, $T_E$ can be expressed as:

$$
T_E = J \frac{d\omega}{dt} + \sum_{n=1}^{\infty} T_n \cos(2\pi f_n t + \phi_n) + T_L
$$

where $J$ represents the moment of inertia of rotating components, $\omega$ is the motor's angular velocity, and $\phi_n, f_n, T_n$ represent the phase, frequency, and amplitude of the $n$-th harmonic of fundamental fault components, respectively. Under constant speed conditions, this can be expressed as:

$$
T_E = T_{E, C} + \sum_{n=1}^{\infty} T_n \cos(2\pi f_n t + \phi_n)
$$

where $T_{E, C}$ represents the constant part of electromagnetic torque. Considering the overall body weight of OHTs, we assume that torque variations due to payload are negligible.

In dual motor OHT systems, faults occurring in either the front or rear motor affect the $T_{E, C}$ characteristics of the other motor (Cho & Lee, 2021). Therefore, to ensure reliable fault diagnosis, it is essential to comprehensively process both torque signals considering their mutual influence.

---

### Methods

<img src="https://velog.velcdn.com/images/devjo/post/358695f5-60ce-45e9-a6b0-97291e02ee91/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

In the preprocessing module, acquired torque signals are filtered using encoder signals to extract only data corresponding to constant-speed operation. Then, these two torque signals are transformed into three transformed representations (sum, difference, residual) to enhance interpretability of fault characteristics.

Sum and difference describe the relationship between two sub-motors under fault conditions, where difference, defined as the difference between front and rear torque, reflects power imbalance between the two motors. Residual is obtained by subtracting a 3-step moving average of the front torque signal from the original value to reduce control-related components.

In the feature extractor, the multi-head CNN is structured with three separate paths to extract unique features from each preprocessed signal. These convolutional paths remain independent until merged at the Global Average Pooling (GAP) layer. Since sum and difference capture low-frequency components while residual captures high-frequency characteristics, we set kernel sizes much larger for sum and difference and smaller for residual. This entire procedure enables deep neural networks to focus on signals at various scales and extract features related to specific faults. Next, to estimate the relative importance of each preprocessed signal in diagnosis and utilize this information in the model, a feature-weighting block with an auxiliary layer is used. Preprocessed signals from previous components each pass through separate 1D CNN blocks and then through GAP layers to extract feature vectors. These feature vectors are denoted as $\mathbf{G}_1, \mathbf{G}_2, \mathbf{G}_3$, corresponding to representations derived from sum, difference, and residual signals, respectively.

<img src="https://velog.velcdn.com/images/devjo/post/bd63a3b4-4854-48a0-9c20-bff24e223b2a/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

$$
z_i = \frac{e^{k \mathbf{w}_{i, k} * \text{concat}(\mathbf{G})_k + b_i}}{\sum_{j=1}^{3} e^{k \mathbf{w}_{j, k} * \text{concat}(\mathbf{G})_k + b_j}}
$$

The auxiliary layer (Woo et al., 2018) consists of a fully connected layer with a Softmax activation function, computing importance weights $z_i$ for preprocessed signals by capturing feature relationships among them. This process can be formulated as above.

Feature vectors are also passed through an alternative path to create a residual connection that preserves information from feature vectors and improves the training process. The final feature vector $F(\mathbf{X})$ representing input data $\mathbf{X}$ is obtained by summing outputs from both paths. This process can be summarized by the following equation:

$$
\begin{aligned}
&F(\mathbf{X}) \\
&= \text{concat}(z_i \mathbf{G}_i) + \text{concat}(\mathbf{G}_i) \\
&= [(z_1 + 1)\mathbf{G}_1, (z_2 + 1)\mathbf{G}_2, (z_3 + 1)\mathbf{G}_3]
\end{aligned}
$$

In the training procedure, the conditional classifier path is trained using only source data. This stage builds initial features by leveraging labeled source data, providing a strong foundation for subsequent adaptation. The classification loss $L_{\text{CLS}}^{(S)}$ used in this stage represents cross-entropy loss for source domain classification and is formulated as:

$$
\begin{aligned}
&L_{\text{CLS}}^{(S)}(\theta_F, \theta_C) \\
&= \frac{1}{n_S} \sum_{i=1}^{n_S} L_{\text{CE}}(C(F(\mathbf{X}_{S,i})), \mathbf{Y}_{S,i}) \\
&= - \frac{1}{n_S} \sum_{i=1}^{n_S} \sum_{j=1}^{3} \mathbb{1}[\mathbf{Y}_{S,i} = j] \log \left( \frac{e^{C(F(\mathbf{X}_{S,i}))_j}}{\sum_{k=1}^{3} e^{C(F(\mathbf{X}_{S,i}))_k}} \right)
\end{aligned}
$$

Next, the domain discriminator path is trained to distinguish source OHT devices from target OHT devices while leveraging the feature extractor trained in the previous stage. Domain labels $\mathbf{Y}_D$ are assigned as 0 for target domain and 1 for source domain. The training process minimizes domain discriminator loss $L_{\text{DISC}}$ using domain labels $\mathbf{Y}_D$, source data $\mathbf{X}_S$, and unlabeled target data $\mathbf{X}_{TU}$. This process is important because a well-trained domain discriminator makes it difficult to distinguish domains. Consequently, the feature extractor is also updated adversarially, learning domain-invariant features by adjusting representations until the domain discriminator can no longer distinguish domains. The domain discriminator loss $L_{\text{DISC}}$ is expressed as:

$$
\begin{aligned}
&L_{\text{DISC}}(\theta_D) \\
&= \frac{1}{n_S + n_{TU}} \sum_{i=1}^{n_S + n_{TU}} L_{\text{BCE}}(D(F(\mathbf{X}_i)), \mathbf{Y}_{D,i}) \\
&= - \frac{1}{n_S + n_{TU}} \sum_{i=1}^{n_S + n_{TU}} (\mathbf{Y}_{D,i} \log(D(F(\mathbf{X}_i))) + (1 - \mathbf{Y}_{D,i}) \log(1 - D(F(\mathbf{X}_i))))
\end{aligned}
$$

Contrastive semantic alignment loss $L_{\text{CSA}}$ is computed to enhance feature discriminability. This loss function aims to reduce discrepancies between source and target domain features sharing the same label while increasing discrepancies between features with different labels (An et al., 2023), and is formulated as:

$$
\begin{aligned}
&L_{\text{CSA}}(\theta_F, \theta_C) \\
&= \frac{1}{n_{\text{pairs}}} \left( \sum_{i, j, Y_i = Y_j} \Vert F(\mathbf{X}_{S,i}) - F(\mathbf{X}_{TL,j}) \Vert^2 + \sum_{i, j, Y_i \ne Y_j} \max(0, m - \Vert F(\mathbf{X}_{S,i}) - F(\mathbf{X}_{TL,j}) \Vert)^2 \right)
\end{aligned}
$$

The total loss function $L_{\text{total}}$ is defined as a weighted sum of $L_{\text{CLS}}$ and $L_{\text{CSA}}$ from which $L_{\text{DISC}}$ is subtracted to facilitate adversarial training. In this process, the model is trained to fail at identifying the domain of OHT devices (Ganin & Lempitsky, 2015). This stage utilizes a small amount of labeled target data to align it with the feature space pre-trained in previous stages, generating a robust diagnostic model for trained OHT devices. The total loss function $L_{\text{total}}$ is presented as:

$$
\begin{aligned}
&L_{\text{total}}(\theta_F, \theta_C, \theta_D) \\
&= \alpha_{\text{CLS}} L_{\text{CLS}}(\theta_F, \theta_C) \\
&- \lambda L_{\text{DISC}}(\theta_F, \theta_D) \\
&+ \alpha_{\text{CSA}} L_{\text{CSA}}(\theta_F, \theta_C)
\end{aligned}
$$

---

### Conclusion

This paper proposes FL-SSDAN (fleet-level semi-supervised domain adaptation network), a novel semi-supervised domain adaptation method for robust and interpretable fault diagnosis of OHT devices. FL-SSDAN effectively addresses key challenges such as variability in signals across devices, limited label data, and lack of interpretability in diagnostic results.

FL-SSDAN preprocesses torque signals to preserve physical significance by transforming dual motor signals into three separate signals: residual, sum, and difference. These preprocessed signals pass through a multi-head CNN, extracting features individually to maintain unique characteristics of each signal.

The feature-weighting module adaptively assigns importance weights to each signal based on relevance to the diagnostic task, enhancing both fault classification performance and interpretability by emphasizing the most influential signal components in decision-making. FL-SSDAN's training strategy effectively reduces signal discrepancies across devices and improves diagnostic performance even with label-scarce data.

FL-SSDAN demonstrated superior performance compared to baseline methods (S-only, STL, STL-CSA, STL-CSA-MMD) under various label-scarce target domain conditions (5%, 10%, 25%, 50% label data). The model consistently achieved higher fault diagnosis accuracy across 15 different source and target OHT device combinations, with higher mean accuracy and narrower $95\%$ confidence intervals indicating robust performance and stability.

---

### References

[Original Source #1](https://academic.oup.com/jcde/article/12/7/49/8180389)

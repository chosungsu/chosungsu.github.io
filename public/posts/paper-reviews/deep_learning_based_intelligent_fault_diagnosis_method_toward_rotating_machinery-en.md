---
title: 'Deep Learning Based Intelligent Fault Diagnosis Methods Toward Rotating Machinery'
date: '2025-09-24'
tags: ['fault diagnosis', 'paper review']
---

### Abstract

Fault diagnosis of rotating machinery plays an important role in industrial production and engineering fields. Due to the disadvantage that traditional fault diagnosis methods heavily rely on human knowledge and professional experience, deep learning (DL)–based intelligent fault diagnosis has attracted researchers' attention. DL achieves desirable automatic feature learning and fault classification.

Therefore, this review provides an overview of DL-based intelligent fault diagnosis technologies. In particular, we summarize and discuss DL-based fault diagnosis approaches for rotating machinery, including bearings, gears/gearboxes, and pumps. Finally, we prospect and analyze existing challenges and possible future research directions related to modern intelligent fault diagnosis.

---

### Introduction

Rotating machinery is an essential part and one of the most representative forms of mechanical equipment, relying on rotation to perform specific functions. It has been widely used in mechanical transmission fields, including aircraft engines, pumps, wind turbine generator systems, gas turbine engines, and power plants. Due to inevitable malfunctions and downtime of mechanical equipment during operation, fault diagnosis is very important for rotating machinery to ensure reliability and safety.

Generally, fault diagnosis methods are divided into model-based methods, signal-based methods, knowledge-based methods, and composite methods. Traditional fault diagnosis methods are mainly based on mechanisms, characteristic frequencies, or fault feature extraction. Due to the disadvantage of relying on practical experience and professional knowledge, it is difficult to detect faults in rotating machinery with complex structures using traditional subjective fault diagnosis methods.

Some improvements and achievements have been made in fault diagnosis for model-based and signal-based methods. An and Sepehri improved Kalman filters and used them to evaluate the state of hydraulic actuators and leakage in hydraulic systems. Du and Goharrizi et al. analyzed and estimated vibration signals of hydraulic pumps and pressure signals of hydraulic cylinders and actuators through wavelet transforms. Doubly iterative empirical mode decomposition (EMD) and adaptive multifractal detrended fluctuation analysis have been used to analyze fault diagnosis of bearings, gears, and piston pumps. Although the methods discussed above have somewhat compensated for the lack of artificial data statistics, there are still some limitations in fault diagnosis of rotating machinery due to the difficulty of feature extraction and complex mathematical models.

Great success has been achieved in fault diagnosis of rotating machinery through traditional machine learning methods such as Support Vector Machines (SVM) and Artificial Neural Networks (ANN). Bin et al. combined wavelet packet decomposition and EMD and used them for feature extraction, and further utilized ANN for preliminary fault diagnosis.

However, traditional intelligent diagnosis methods still have several limitations and defects. First, considering feature extraction, a large number of signal processing techniques must be mastered and rich engineering practical experience must be possessed. In addition, feature extraction and intelligent diagnosis are treated separately, so the relationship between them cannot be considered. Second, regarding model training, shallow models are used to characterize complex mapping relationships between signals and health states, which leads to obvious defects in the model's diagnostic capability and generalization performance when facing mechanical big data.

Lin et al. designed a CNN based on multivariate encoder information to intelligently identify faults in planetary gearboxes. This not only overcame the defects of traditional vibration analysis but also provided a potential intelligent tool to obtain expected diagnosis for rotating machinery.

---

### Methods

#### AI

As a new interdisciplinary science, AI aims to use computers to simulate some of human thinking processes and intelligent behaviors. This can be achieved in computers in two different ways: one is an engineering approach that adopts traditional programming techniques, and the other is a modeling approach (e.g., genetic algorithms and ANN).

AI approaches have been integrated into many diverse fields and have achieved great success in human–machine games, pattern recognition, automation engineering, and knowledge engineering. Due to the increase in mechanical data and the complexity of faults leading to high uncertainty in the diagnostic process, AI-based methods will be superior to traditional methods in terms of diagnostic efficiency. AI-based approaches can be divided into two categories: knowledge-driven methods and data-driven approaches.

#### DL

As an outstanding development of AI, DL can be understood as feature learning or representation learning, possessing multiple and high-level representations of data. Specifically, through DL, low-level features from simple and nonlinear modules are synthesized to form more abstract high-level representations in terms of categories or features, thereby obtaining complex functions and distributed feature representations of data. Deep Neural Networks (DNN) play an essential role in deep models, mainly including DBN (Deep Belief Networks), SAE (Stacked Autoencoders), CNN (Convolutional Neural Networks), RNN (Recurrent Neural Networks), and GAN (Generative Adversarial Networks).

---

### Applications

#### 1. Intelligent Fault Diagnosis of Bearings

Bearings, one of the well-known and widely used rotating machines, are very important, but their faults account for almost $45\% \sim 55\%$ of equipment failures, leading to accidents, downtime, and even serious damage and economic losses. Therefore, it is very important to study intelligent fault diagnosis methods for bearings, especially DL technologies.

To overcome the imbalanced distribution of mechanical health states, Jia et al. studied a new learning method called Deep Normalized CNN (DNCNN) to classify bearing faults. Three bearing datasets were used to verify the diagnostic accuracy of the proposed method, where single faults and compound faults with various imbalance degrees were considered. DNCNN shows superiority over S-CNN and R-CNN in terms of learning features from vibration signals, and it can be seen that features are well clustered. Using confusion matrices, imbalanced classification results were successfully obtained; that is, $95.4\%$ of samples were accurately classified by the proposed method, and only $4\%$ of samples were misclassified.

As a method in machine learning, Transfer Learning (TL) enables reuse of pre-trained models for other tasks with the aim of reducing distribution mismatch and improving prediction performance. Generally, both model development and pre-trained models are included, and the latter is widely used in machine learning. New TL frameworks have been designed for fault diagnosis of rotor bearings and gearboxes under various conditions, such as automatic balanced high-order Kullback–Leibler divergence and smooth conditional distribution alignment. As one type of CNN, feature-based transfer neural networks have been explored for state identification of bearings.

To overcome training limitations and performance degradation, a deeper 1D CNN based on residual learning has been developed for fault diagnosis of wheelset bearings and shows good performance.

#### 2. Intelligent Fault Diagnosis of Gears and Gearboxes

Chen et al. combined CNN and extreme learning machines to build a new model without additional training and fine-tuning, and gearbox datasets and motor bearing datasets were selected to verify the effectiveness of the proposed method. Regarding signal processing–based methods, wavelet packet transforms, distance evaluation techniques, and SVR (Support Vector Regression)–based general multi-class solvers have been combined for fault diagnosis of bearings and gearboxes.

#### 3. Intelligent Fault Diagnosis of Pumps

Due to the functional diversity and structural complexity of hydraulic systems, fault identification and classification appear more challenging. As the power source of hydraulic systems, hydraulic pumps play an essential role in reflecting the operating state of systems. According to statistics on mechanical and electrical equipment defects, more than $50\%$ are related to pump failures. Therefore, accurately and effectively diagnosing pump faults is of great significance to ensure system safety and reliability.

Wen et al. developed a new data-driven method based on CNN with LeNet-5. Regarding axial piston hydraulic pumps, two fault conditions were considered, including piston shoe and swash plate wear and valve plate wear. By introducing data indicators including time and frequency, Wang et al. studied DBN for multiple fault diagnosis of axial piston hydraulic pumps.

---

### Conclusion

It is worth noting that this paper has mainly focused on traditional intelligent methods and has conducted many investigations on fault diagnosis and signal processing of hydraulic pumps and centrifugal pumps. Furthermore, intelligent fault diagnosis methods such as SVM for hydraulic pumps have begun to be studied, providing a theoretical foundation for future research on DL-based fault diagnosis approaches. Currently and in the future, emphasis will be placed on DNN-based methods, exploring multi-information fusion technologies with excellent generalization capabilities, and further developing and constructing remote diagnosis systems.

Many studies mainly focus on single physical source information, and diagnostic accuracy needs improvement due to small data sizes. It is important to pay more attention to multi-source information that can comprehensively reflect equipment states. However, multi-source signals have diversity and complexity issues, which require additional research.

---

### References

[Original Source #1](https://ieeexplore.ieee.org/document/8945322)

---
title: 'Industry-Academia Collaborative Software Project'
date: '2023-02-28'
description: 'Developed an anomaly detection system based on industrial sensor data'
tags: ['time series', 'unsupervised task', 'sensor data']
github: 'https://github.com/username/project'
---

### Project Overview
This project was part of an industry-academia collaborative software initiative, aimed at developing an anomaly detection system based on sensor data collected from industrial environments. The project lasted for approximately eight months, during which I served as the project lead and primary algorithm developer.

### Problem Definition
Industrial equipment generates vast amounts of sensor data; however, most of this data represents normal operating conditions, and anomalous data is either rare or lacks proper labeling. Therefore, the core objective was to leverage unsupervised learning to model normal behavioral patterns and identify deviations from those patterns as anomalies.

### Model Selection: VQ-VAE (Vector Quantized Variational Autoencoder)
🔍 What is VQ-VAE?
VQ-VAE is an extended version of the Variational Autoencoder (VAE), where the model learns discrete latent representations through vector quantization, rather than continuous latent variables. This makes it particularly effective at capturing clustered patterns, which is advantageous for anomaly detection.

Input data → Encoder → Mapped to the nearest vector in the codebook → Decoder → Reconstruction

The larger the reconstruction error, the higher the likelihood of an anomaly.

✅ Application Strategy
Trained the model exclusively using time-series sensor data from normal operating conditions

Used reconstruction error to detect anomalies in new data

Experimented with various reconstruction loss metrics, such as MSE and MAE

### Experiment Tracking with WandB
Throughout the development process, we utilized Weights & Biases (WandB) to establish a robust experiment management framework.

### Results & Achievements
Achieved a 6% improvement in early anomaly detection rate compared to rule-based or standard Autoencoder methods

Explored lightweight deployment strategies for real-world industrial environments

Recognized with an Encouragement Award for the project’s success and potential impact

### Conclusion
Through this project, we demonstrated the practical potential of unsupervised learning to solve real-world industrial problems. The effectiveness of VQ-VAE in anomaly detection was also validated. Moving forward, I plan to explore more models and expand this approach across various domains and applications.
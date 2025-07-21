---
title: 'Industry-Academia Collaborative Software Project'
date: '2023-02-28'
description: 'Developed an anomaly detection system based on industrial sensor data'
tags: ['time series', 'unsupervised', 'sensor data']
github: 'https://github.com/chosungsu/time-series-anomaly-detection'
---

### Project Overview
This project was an industry-academia collaborative software project to develop an anomaly detection system using unsupervised learning based on sensor data collected from industrial sites. The project lasted about 8 months, and I participated as the project leader and main algorithm developer.

#### Project Goals
1. Real-time anomaly detection: Real-time monitoring of time series data collected from manufacturing processes
2. Adaptive learning: Automatic adaptation of the model to environmental changes
3. User-friendly interface: Intuitive web-based monitoring system

---

### Problem Definition
Industrial equipment collects data through numerous sensors, but most of this data corresponds to normal states, and there is little or no labeled anomaly data. Therefore, the key was to use unsupervised learning to learn normal patterns as much as possible and detect patterns that differ from these as "anomalies."

#### Technical Features
1. Pseudo labeling using traditional unsupervised learning algorithms
2. Utilization of PPO (Proximal Policy Optimization) reinforcement learning algorithm
3. Real-time web interface visualization based on Streamlit

---

### Model Selection and Implementation
Two main models were used in the project:

#### Isolation Forest
- Anomaly detection algorithm based on unsupervised learning
- Can be trained with only normal data and is computationally efficient
- Extracts features from time series data to calculate anomaly scores
- Used as the initial model for pseudo labeling

#### PPO (Proximal Policy Optimization)
- Adaptive anomaly detection algorithm based on reinforcement learning
- Dynamically adjusts thresholds according to environmental changes
- Improves model performance through real-time feedback
- Complements the results of Isolation Forest for final anomaly decision

---

### Results and Achievements

#### 1. Overall System Architecture

<img src="https://velog.velcdn.com/images/devjo/post/77edf257-b927-4104-90e4-4a56907fe9cf/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

#### 2. Performance Metrics

Accuracy: 100%

Recall: 100%

F1_score: 100%

#### 3. Interface Features

- Real-time chart: Visualizes current processing status
- Performance metrics: Real-time performance monitoring
- Control buttons: Start/Stop/Reset functions
- Settings options: Automatic/Manual update modes

---

### Conclusion

#### Project Summary

1. Technical Achievements
- Reinforcement learning-based anomaly detection: Developed an adaptive model using the PPO algorithm
- Real-time processing system: Ensured stability through sequential data processing
- Web-based interface: User-friendly system using Streamlit

2. Business Value
- Increased productivity: Minimized downtime through real-time anomaly detection
- Quality control: Prevented quality issues by early anomaly detection
- Operational efficiency: Improved workforce efficiency through automated monitoring

#### Final Words

Through this project, I was able to confirm how useful reinforcement learning can be in real industrial settings. In particular, the combination of adaptive learning and real-time processing shows great potential in the field of anomaly detection.
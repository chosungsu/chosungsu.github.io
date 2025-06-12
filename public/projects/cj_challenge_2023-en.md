---
title: 'Multi-Object Detection Challenge'
date: '2023-08-21'
description: 'Develop an object detection system capable of identifying and classifying various product types in a warehouse environment'
tags: ['cnn', 'yolo', 'computer vision']
github: 'https://github.com/username/project'
---

### Project Overview
This project aimed to develop an object detection system capable of identifying and classifying various product types in a warehouse environment. Over a 2-month period, I contributed as the lead in object detection modeling and custom labeling tool development.

---

### Problem Definition
In a warehouse, products come in various sizes and are placed in complex arrangements. Accurately detecting these objects is crucial for automation. However, the dataset presented challenges such as limited labeling, inconsistent lighting, and background variability, making generalization difficult.

---

### Modeling Strategy

#### 🔧 Model Selection & Fine-tuning
- Built an object detection model based on the __Detectron2__ framework and fine-tuned it to fit the specific requirements of warehouse scenarios.
- Experimented with multiple backbones (e.g., ResNet, EfficientNet) to achieve optimal accuracy and performance.

#### 🧪 Data Augmentation Techniques
- __Crop__: Random cropping around objects to teach the model to handle varying object sizes.
- __Mosaic__: Combined multiple images into one to simulate diverse contexts and enrich learning scenarios.

These offline and online augmentations helped improve the model’s generalization to unseen environments.

---

### Labeling Tool Development
- Due to the initial lack of annotations, I developed a __custom labeling tool__ to enable the team to efficiently draw bounding boxes manually.
- Later, we implemented a __semi-automatic labeling process__ using model-generated predictions, significantly speeding up the labeling process while maintaining accuracy.

---

### Results & Achievements
- Successfully developed a final model with over __80%__ accuracy in terms of Intersection over Union (IoU).
- Enhanced the dataset’s diversity and model robustness through effective data augmentation strategies and architectural tuning.

---

### Conclusion
This project served as a valuable opportunity to test and validate object detection technologies in a realistic industrial environment. In the future, we plan to expand the system for more diverse class types and real-time inference applications.

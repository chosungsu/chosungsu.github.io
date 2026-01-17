---
title: 'Multi-Perspective Data Augmentation for Few-Shot Object Detection'
date: '2025-04-30'
tags: ['computer vision', 'paper review']
---

### Abstract

Recent few-shot object detection research has focused on generating synthetic samples for novel classes, with particularly notable achievements using diffusion models. However, these synthetic datasets show limitations in diversity when generating typical samples and hard samples, as they fail to sufficiently consider the relationship between foreground and background.

To overcome these limitations, this paper proposes the MPAD framework, which includes three key strategies. We introduce in-context learning for object synthesis and concurrently adjust bounding boxes. This can enhance the detailed depiction and spatial information of synthesized samples. Next, we mix prompt embeddings at each timestep during the diffusion model's generation process. Following the large margin principle, we guide support samples to play a key role in defining class boundaries to generate hard samples. Finally, we introduce a background proposal method that samples typical or challenging backgrounds for learning.

---

### Introduction

<img src="https://velog.velcdn.com/images/devjo/post/7296fec1-d627-4290-a205-31940eccbcbb/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Humans can recognize novel objects with just a few exposures. Few-shot object detection (FSOD), which mimics this capability, is based on two datasets. The base dataset contains numerous classes and abundant training samples, forming general knowledge for detection tasks. The novel dataset has very limited samples per class (few-shot), posing a significant challenge for model learning.

We leverage the general knowledge of LLMs to explore detailed attributes of novel classes and diversify prompts. This enables generation of not only typical samples but also hard samples. By mixing prompt embeddings at each generation timestep of the diffusion model, we generate 'hard samples' that blend features of the main class with low-level features (shape, color, etc.) of base classes.

---

### Methods

#### In-Context learning for object synthesis

<img src="https://velog.velcdn.com/images/devjo/post/a166ccb4-f636-4d1f-9c6b-234b97545a28/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Rather than simply generating images, we utilize inpainting techniques using the PowerPaint model to naturally draw objects into specific locations of existing images. We apply masking and padding to the object's bounding box ($b$) to specify the region where the diffusion model should draw.

Denoising starts from noise ($z_t$) and progressively creates a clear object according to the prompt embedding ($\zeta_c$) and bounding box ($b$) conditions, as shown in the following equation.

$$
z_{t-1} = p(z_{t-1}|\theta(z_t, \zeta_c, b))
$$

Existing studies used very simple prompts such as "a photo of a [class name]". However, this shows problems of limited diversity, where generated objects all appear similar (typical samples), and lack of detail, where important distinguishing features such as color, shape, and material are ignored.

To address this problem, we introduce in-context learning that leverages the general knowledge of LLMs for prompt generation. We query appearance information for a specific class and parse it into dictionary format. For example, for a "bird" class, we add detailed information such as "yellow beak, blue wings, small feet" to the prompt to guide the diffusion model to draw more refined images. Instead of the general name of the class, we list specific species or types to broaden the data scope. This allows the model to learn numerous variations that can occur within the higher-level concept of "bird", significantly improving generalization performance.

#### Harmonic prompt aggregation scheduler

Instead of using only single-class information, we mix embeddings of base classes ($\zeta_{base}$) and novel classes ($\zeta_c$) at each step ($t$) of the generation process.

$$
\gamma_{c,t} = (1 - \alpha_t) * \zeta_c + \alpha_t * \zeta_{base}
$$

In the early stages of generation, we increase the weight of base classes to capture overall form and structure (low-level features), and as we progress to later stages, we increase the weight of novel classes to add detailed features (high-level details).

#### Background proposal method

We use a pre-trained ViT model to measure cosine similarity between synthesized novel objects ($\hat{I}_c$) and base image backgrounds. We select top backgrounds with high similarity for use in synthesis.

---

### Conclusion

Data augmentation using diffusion models is very powerful, but this study has also identified several challenges that need to be addressed. Hallucination occurs, where parts or the entirety of generated objects appear unrelated to the prompt or are generated in low quality.

To address this, we can consider applying post-filtering processes that filter out objects that significantly deviate from general features after generation, or using efficient fine-tuning techniques such as LoRA to directly optimize diffusion models on few-shot data to increase data similarity.

---

### References

[Original Source #1](https://arxiv.org/pdf/2502.18195)

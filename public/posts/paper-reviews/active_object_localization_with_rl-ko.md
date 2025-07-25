---
title: 'Active Object Localization with Deep Reinforcement Learning'
date: '2023-07-17'
tags: ['object localization', 'paper review']
---

### Abstract

본 논문에서는 장면에서 객체를 지역화하기 위한 능동적인 탐지 모델을 제시합니다. 이 모델은 클래스별 특성을 가지며, 에이전트가 표적 객체의 정확한 위치를 식별하기 위해 후보 영역에 주의를 집중하도록 합니다. 이 에이전트는 간단한 변형 동작을 사용하여 바운딩 박스를 변형하는 방법을 학습하며, 하향식 추론(top-down reasoning)에 따라 표적 객체의 가장 구체적인 위치를 결정하는 것을 목표로 합니다.

제안된 모델에 의해 안내되는 에이전트가 이미지에서 단 11개에서 25개 사이의 영역만 분석한 후에도 객체의 단일 인스턴스를 지역화할 수 있으며, 객체 제안(object proposals)을 사용하지 않는 시스템 중 최고의 탐지 결과를 얻음을 보여줍니다.

---

### Introduction

바운딩 박스를 사용하여 객체를 지역화하는 과정은 박스의 기하학적 형태를 정제하기 위한 일련의 단계를 포함하는 제어 문제로 볼 수 있습니다. 장면에서 대상 객체의 정확한 위치를 결정하려면 문맥을 이해하고, 고정점(fixation point)을 변경하고, 인식을 지원하는 특징적인 부분을 식별하며, 박스의 정확한 비율을 결정하기 위한 능동적인 참여가 필요합니다.

지난 10년간 객체 탐지 또는 지역화 문제는 비전 커뮤니티에서 객체의 범주를 인식하고, 가시적인 모든 부분을 포함하는 조밀한 바운딩 박스로 객체의 공간적 범위를 식별하는 것을 목표로 연구되었습니다. 이는 여러 이미지 영역에서의 계산 및 분석을 요구하는 도전적인 설정이며, active attention에 의해 주도되는 작업의 좋은 예입니다.

객체 탐지기의 정확도를 향상시키는 데 중요한 진전은 최근 합성곱 신경망(CNN: Convolutional Neural Networks)을 통해 가능해졌습니다. 이는 대규모 시각 데이터와 딥러닝을 이미지 분류에 활용합니다.

본 연구에서는 시스템에 의해 알려진 대상 객체를 지역화하는 방법을 학습하는 클래스별 능동 탐지 모델을 제안합니다. 제안된 모델은 상향식 검색 전략(top-down search strategy)을 따르며, 전체 장면을 분석하는 것으로 시작하여 객체의 정확한 위치를 좁혀 나갑니다. 이는 처음에는 이미지의 넓은 영역을 덮고 있던 박스에 일련의 변환을 적용하여 결국 조밀한 바운딩 박스로 줄임으로써 달성됩니다. 변환의 순서는 현재 가시 영역의 내용을 분석하여 다음 최적의 동작을 선택하는 에이전트에 의해 결정됩니다. 슬라이딩 윈도우와 달리, 우리의 접근 방식은 객체를 검색하기 위해 고정된 경로를 따르지 않습니다. 대신 대상 객체가 점진적으로 더 집중되도록 박스를 변형하는 dynamic attention-action strategy를 제안합니다.

---

### Previous works

객체 지역화는 슬라이딩 윈도우 분류기를 사용하여 성공적으로 접근되어 왔습니다. HOG 템플릿과 SVM 분류기를 기반으로 하는 인기 있는 슬라이딩 윈도우 방법은 객체, 객체의 일부, 식별 가능한 패치 및 심지어 장면의 돌출 구성 요소를 지역화하는 데 광범위하게 사용되었습니다. 슬라이딩 윈도우는 카테고리별 지역화 알고리즘이라는 점에서 본 연구와 관련이 있지만 슬라이딩 윈도우는 위치-스케일 공간에 대한 완전 탐색(exhaustive search)을 수행합니다.

객체 지역화의 최근 경향은 카테고리 독립적인 객체 제안(object proposals)의 생성입니다. 슬라이딩 윈도우에 비해 이러한 방식으로 후보 세트를 줄임으로써 상당한 가속화를 달성합니다. 그럼에도 불구하고 제안 기반 객체 탐지는 축소된 영역 세트에 대한 윈도우 기반 분류와 동일한 설계를 따르는데, 이는 몇 가지 흥미로운 객체를 포함할 수 있는 단일 이미지에 대해 여전히 크다(수천 개의 윈도우)는 단점이 있습니다.

시각적 인식에 대한 주의(attention) 능력에 최근 관심이 높아지고 있습니다. RNN을 사용하여 더 많은 주의가 필요한 일련의 영역을 선택했으며, 이러한 영역은 여러 문자를 인식하기 위해 더 높은 해상도로 처리됩니다. 흥미롭게도 이러한 모델은 이 연구와 동일하게 강화 학습(Reinforcement Learning)으로 훈련되지만, 이 연구에서는 박스를 변형하기 위해 더 간단한 아키텍처와 직관적인 동작을 사용합니다.

---

### Methodology

객체 지역화 문제를 마르코프 의사 결정 과정(MDP: Markov Decision Process)으로 설정합니다. 이 설정은 일련의 결정을 내리는 에이전트를 모델링하기 위한 공식적인 프레임워크를 제공하기 때문입니다. 이 연구에서 공식화는 단일 이미지를 환경으로 간주하며, 여기서 에이전트는 일련의 동작을 사용하여 바운딩 박스를 변환합니다. 에이전트의 목표는 환경에서 관찰될 수 있는 대상 객체에 조밀한 박스를 착지시키는 것입니다.

공식적으로 MDP는 동작 집합 $A$, 상태 집합 $S$, 보상 함수 $R$을 가집니다.

#### 1. Localization Actions

<img src="https://velog.velcdn.com/images/devjo/post/094e13d8-5a09-4453-9679-60150012df65/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

동작 집합 $A$는 박스에 적용할 수 있는 8가지 변환과 검색 프로세스를 종료하는 1가지 동작으로 구성됩니다. 이러한 동작으로는 박스를 수평 및 수직 축으로 이동시키는 동작, 크기를 변경하는 동작, 종횡비를 수정하는 동작이 해당합니다.

박스는 두 모서리의 픽셀 좌표 $(b = [x1, y1, x2, y2])$로 표현됩니다. 변환 동작 중 어느 하나라도 박스의 현재 크기에 비례하는 요소로 이산적인 변화를 만듭니다.

$$
\alpha_w = \alpha (x_2-x_1),\\
\alpha_h = \alpha (y_2-y_1)
$$

$x$ 또는 $y$ 좌표에 위 값을 더하거나 빼서 변환을 얻습니다. 예를 들어 수평으로 우측 이동은 $x_1$과 $x_2$에 $\alpha_w$를 더하는 반면 종횡비를 줄이는 것은 $x_1$에서 $\alpha_w$를 빼고 $x_2$에 $\alpha_w$를 더합니다.

실험에서 $\alpha=0.2$로 설정하였는데 이 값이 더 작으면 에이전트가 객체를 지역화하는데 오래 걸리고 크다면 박스를 올바르게 배치하기 어렵다는 점을 발견했습니다.

#### 2. State

상태 표현은 튜플 $(o, h)$입니다. 여기서 $o$는 관찰된 영역의 특징 벡터이고 $h$는 동작 기록의 벡터입니다. 따라서 효과적인 상태 표현을 설계하기 위해서는 일반화가 중요합니다.

특징 벡터는 사전 훈련된 CNN을 사용하여 현재 영역에서 추출됩니다. 에이전트가 주의를 기울이는 모든 영역은 Girshick 등이 제안한 기술에 따라 크기와 종횡비에 관계없이 입력(224x224)과 일치하도록 변형됩니다. 또한 gound truth 박스 주변에 16픽셀의 컨택스트를 포함하도록 영역을 확장합니다. 레이어 6까지 전달하고 4096차원 특징 벡터를 사용하여 내용을 표현합니다.

기록 벡터는 과거에 어떤 동작이 사용되었는지를 알려주는 이진벡터입니다. 각 동작은 9차원 이진벡터로 표현되며 동작에 해당하는 값을 제외하고는 모든 값이 0입니다. 기록 벡터는 10개의 과거 동작을 인코딩하기 때문에 $h \in R^{90}$임을 의미합니다. 이 정보는 반복적인 주기에 갇힐 수 있는 검색 궤적을 안정화하는 데 유용하며 평균 정밀도를 3% 향상시키는 것을 입증하였습니다.

#### 3. Reward Function

보상함수 $R$은 에이전트가 특정 동작을 선택한 후 객체를 지역화하기 위해 얻는 개선에 비례합니다. 개선은 특정 시점에서 대상 객체와 예측된 박스 사이에 IoU를 사용하여 측정됩니다. 그리고 보상 함수는 ground truth 박스 계산이 필요하므로 훈련 단계에서만 추정할 수 있습니다.

$b$를 관찰 가능한 영역의 박스라 하고, $g$를 대상 객체의 ground truth 박스라 합시다. 그러면 $b$와 $g$ 사이의 IoU는 $IoU(b, g) = \text {area}(b \cap g)/\text {area}(b \cup g)$로 정의됩니다. 에이전트가 상태 $s$에서 $s'$로 이동하기 위해 동작 $a$를 선택할 때 보상 함수 $R_a(s, s')$가 부여됩니다. 각 상태 $s$는 주의를 기울인 영역을 포함하는 관련 박스 $b$를 가집니다. 그러면 보상은 다음과 같습니다.

$$
R_a(s,s')=\text{sign}(\text {IoU}(b',g)-\text {IoU}(b,g))
$$

직관적으로 상태 $s$에서 $s'$로 개선되면 보상이 양수이고 그렇지 않으면 음수임을 의미합니다. 이 보상은 이진값 $r \in {-1,1}$을 가지며 모든 동작에 적용됩니다. 이 의미는 어떤 변환 동작이 박스를 대상에서 멀어지게 하는지 명확하게 전달하는 것으로 멀어지면 페널티를 가까워지면 보상을 받습니다.

---

### Experiments

에이전트의 목표는 환경과의 상호 작용(에피소드) 동안 받은 보상의 합계를 최대화하는 방식으로 동작을 선택하여 바운딩 박스를 변형하는 것입니다. 핵심 문제는 이 에이전트의 의사 결정 과정을 안내하는 정책(policy)을 찾는 것입니다. 정책 $\pi(s)$는 현재 상태가 $s$일 때 선택할 동작 $a$를 지정하는 함수입니다. 상태 전이 확률을 알 수 없고 보상 함수가 데이터에 의존적이므로, 이 문제는 Q-learning을 사용하여 강화 학습 문제로 공식화됩니다.

본 연구에서는 Mnih 등이 최근 제안한 심층 Q-learning 알고리즘을 따릅니다. 이 접근 방식은 신경망을 사용하여 액션-값 함수를 추정하며, 이전 Q-learning 방법보다 몇 가지 장점이 있습니다. 첫째, Q-network의 출력은 문제의 동작 수만큼 유닛을 가집니다. 이는 모든 가능한 동작의 값을 추정하기 위해 입력 이미지가 네트워크를 한 번만 전달되기 때문에 모델을 효율적으로 만듭니다. 둘째, 이 알고리즘은 다양한 경험을 수집하고 장기적으로 학습하기 위해 리플레이 메모리(replay-memory)를 통합합니다. 이러한 방식으로 리플레이 메모리의 전이는 많은 모델 업데이트에 사용되어 데이터 효율성을 높입니다. 셋째, 모델을 업데이트하기 위해 알고리즘은 상태 간의 단기 상관 관계를 깨기 위해 리플레이 메모리에서 전이를 균일하게 무작위로 선택합니다. 이는 알고리즘을 더욱 안정적으로 만들고 매개변수의 발산을 방지합니다. 액션-값 함수 $Q(s, a)$를 학습한 후, 에이전트가 따르는 정책은 추정된 값이 최대인 동작 $a$를 선택하는 것입니다.

<img src="https://velog.velcdn.com/images/devjo/post/9a4f2b76-a441-45e4-a8c0-7ccedb9e6361/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

제안된 QNetwork의 아키텍처는 위 이미지와 같으며 입력 영역은 먼저 224 × 224 픽셀로 변형된 다음, 5개의 합성곱 계층과 1개의 완전 연결 계층을 가진 사전 훈련된 CNN에 의해 처리됩니다. CNN의 출력은 액션 히스토리 벡터와 연결되어 상태 표현을 완성합니다. 이는 Q-network에 의해 처리되어 9가지 동작의 값을 예측합니다.

#### Q-learning for Object Localization

본 연구에서는 합성곱 네트워크의 전체 특징 계층 구조를 학습하지 않고, 대신 사전 훈련된 CNN에 의존합니다. 사전 훈련된 CNN을 사용하는 것에는 두 가지 장점이 있습니다. 첫째, Q-network의 매개변수만 업데이트하면 되기 때문에 Q 함수 학습이 더 빠릅니다. Deep CNN은 단순히 피드포워드 특징 추출기로 사용됩니다. 둘째, 특징 계층 구조는 더 큰 데이터셋으로 훈련되어 이 연구에서 일반적인 판별 특징을 활용합니다. Deep Q-learning 프레임워크에서 특징의 전체 계층 구조를 학습하는 것이 가능하며, 학습된 특징이 분류가 아닌 지역화 작업에 적합하도록 조정될 수 있으므로 성능이 향상될 수 있다고 가정합니다. 그러나 이는 주로 더 큰 객체 탐지 데이터셋을 필요로 하므로, 이 가능성은 향후 연구로 남겨둡니다.

#### Training Localization Agents

Q-network의 매개변수는 무작위로 초기화됩니다. 그런 다음 에이전트는 여러 에피소드에서 환경과 상호 작용하도록 설정되며, 각 에피소드는 다른 훈련 이미지를 제시합니다. 훈련 중에 따르는 정책은 $\epsilon$-탐욕적($\epsilon$-greedy)이며, 이는 $\epsilon$ 값에 따라 점차적으로 탐색에서 활용으로 전환됩니다.

우리 연구에서는 탐색이 무작위 동작으로 진행되지 않습니다. 대신, 에이전트에게 전문가가 제공하는 시연을 기반으로 하는 도제 학습(apprenticeship learning) 원리를 따르는 안내된 탐색 전략(guided exploration strategy)을 사용합니다. 환경이 ground truth 박스를 알고 있고, 보상 함수가 현재 박스와의 IoU에 따라 계산되기 때문에 어떤 동작이 긍정적이고 부정적인 보상을 줄지 식별할 수 있습니다. 그런 다음, 탐색 중에 에이전트는 긍정적인 동작 집합에서 하나의 무작위 동작을 선택할 수 있습니다. 특정 상태 $s$에 대해 객체를 지역화하는 단일 경로가 없기 때문에 여러 긍정적인 동작이 있을 수 있습니다. 이 전략을 사용하면 알고리즘이 적은 수의 에포크에서 종료됩니다.

$\epsilon$-탐욕적 훈련 전략은 15개의 에포크 동안 실행되며, 각 에포크는 에이전트가 모든 훈련 이미지와 상호 작용한 후에 완료됩니다. 처음 5개 에포크 동안 $\epsilon$은 1.0에서 0.1로 선형적으로 감소하여 에이전트가 점진적으로 자체 학습 모델을 사용하도록 합니다. 5번째 에포크 이후에는 $\epsilon$이 0.1로 고정되어 에이전트가 자체 결정으로 생성된 경험으로부터 모델 매개변수를 조정합니다.

#### Testing a Localization Agent

위에서 설명한 절차로 에이전트가 훈련되면, 대상 카테고리의 객체를 포함하는 영역에 주의를 기울이는 방법을 학습합니다. 단일 이미지에 존재하는 객체의 수를 미리 알 수 없으므로, 에이전트가 최대 200단계 동안 실행되도록 하여 테스트 이미지당 200개의 영역만 평가합니다.

각 단계에서 에이전트는 현재 박스를 변형하거나 객체가 발견되었음을 나타내기 위해 트리거를 선택합니다. 트리거가 사용되면, 이미지의 큰 부분을 덮는 새로운 박스에서 다른 객체에 대한 검색이 계속됩니다. 객체 검색은 두 가지 가능한 이벤트로 인해 처음부터 다시 시작됩니다. 에이전트가 트리거를 사용했거나, 트리거를 사용하지 않고 40단계가 경과했을 때입니다.

#### Evaluation of Precision

객체 탐지기로서 본 논문에서 제안된 알고리즘은 두 가지 모드로 평가될 수 있습니다.

-모든 주의 영역(AAR: All Attended Regions): 검색 에피소드 동안 에이전트에 의해 처리된 모든 영역에 점수를 매기는 탐지기입니다. 이는 에이전트가 명시적으로 탐지로 표시하지 않은 잘 지역화된 영역을 고려하는 데 유용합니다.

-종료 영역(TR: Terminal Regions): 에이전트가 객체의 존재를 나타내기 위해 명시적으로 트리거를 사용한 영역만 고려하는 탐지기입니다.

두 경우 모두, 우리는 R-CNN과 동일한 절차(VOC2012 훈련 세트를 사용한 영역 제안에 대한 하드-네거티브 마이닝 포함)로 훈련된 외부 선형 SVM을 사용하여 주의 영역에 점수를 매깁니다. 이 분류기는 우리 모델이 객체 제안을 생성한다고 가정할 때 후보 영역의 순위를 다시 매기는 데 유용합니다. Q-network에 의해 계산된 점수는 판별 점수 대신 동작의 값을 추정하므로 객체 탐지 평가에는 유용하지 않습니다.

전반적으로 R-CNN 시스템은 여전히 최고의 성능을 보이며 강력한 기준선으로 남아 있습니다. R-CNN의 주요 단점은 해당 성능에 도달하기 위해 많은 수의 객체 제안에 의존하고 상당한 컴퓨팅 성능을 요구한다는 것입니다. MultiBox 및 Regionlets는 예측을 위해 소수의 박스만 사용하거나 특징을 여러 번 재계산하는 것을 피함으로써 딥 CNN을 더 효율적인 방식으로 활용하려고 시도합니다. 이 연구에서 접근 방식 또한 소수의 영역에 주의를 기울여 객체를 지역화하는 것을 목표로 하며, 이는 성능에 영향을 미칩니다. 그러나 결과적으로 다른 기준 방법보다 훨씬 우수하며, 46.1 MAP에 도달합니다.

#### Evaluation of Recall

에이전트가 주의를 기울인 모든 영역은 객체 제안 후보로 이해될 수 있으므로, Hosang 등이 제안한 방법론에 따라 이를 평가합니다. 전반적으로, 연구에 사용한 방법은 카테고리당 200단계 동안 실행하여 이미지당 총 4,000개의 후보를 처리하며 71%의 재현율에 도달합니다. 이는 유사한 수의 제안에서 대부분의 방법이 달성하는 것보다 10~25점 낮은 재현율입니다. 그러나 자세히 보면 이미지당 상위 100개 후보에 대해 상당히 우수합니다.

이 평가를 위해 에이전트가 예측한 Q-값을 사용하여 주의 영역에 점수를 매기고, 에이전트가 트리거를 사용한 영역에만 큰 상수를 추가합니다. 이는 에이전트가 올바르게 지역화된 객체로 간주하는 영역에 우선순위를 부여합니다. 다른 방법들이 추정된 객체성(objectness) 점수를 사용하여 제안의 순위를 매기고, 높은 Q-값이 동일한 방식으로 해석될 수 있으므로 평가의 공정성을 위해 분류 점수 대신 이 점수 함수를 사용합니다.

---

### Conclusion

본 연구에서는 주의-행동 전략을 사용하여 장면 내 객체를 지역화하는 방법을 학습하는 시스템을 제시했습니다. 이 접근 방식은 객체 탐지를 위한 이전 연구들과 근본적으로 다릅니다. 이는 하향식 장면 분석(top-down scene analysis)을 통해 객체의 정확한 위치를 좁혀나가기 때문입니다. 강화 학습(RL: Reinforcement Learning)은 지역화 정책을 학습하는 데 효율적인 전략임이 입증되었습니다. 이는 객체가 다양한 검색 경로를 따라 지역화될 수 있기 때문에 도전적인 작업입니다. 그럼에도 불구하고, 제안된 에이전트는 자체 실수로부터 학습하고 객체를 찾기 위한 정책을 최적화합니다.

실험 결과, 이 시스템은 11개에서 25개 사이의 영역만 처리하여 객체의 단일 인스턴스를 지역화할 수 있음을 보여줍니다. 이는 소수의 카테고리가 필요한 응용 프로그램에 매우 효율적인 전략입니다. 다만 그렇기에 많은 수의 카테고리로 확장하기 위해서는 다른 방식으로 확장될 필요가 있습니다. 예를 들어, 이를 카테고리 독립적으로 만들거나 계층적 온톨로지를 사용하여 나중에 세분화된 카테고리를 결정하는 방법이 있습니다. 재현율을 향상시키기 위한 중요한 과제도 해결되어야 합니다. 향후 연구에는 사전 훈련된 CNN을 사용하는 대신 시스템을 엔드 투 엔드로 훈련하고, 예측 정확도를 향상시키기 위해 더 깊은 CNN 아키텍처를 사용하는 것이 포함됩니다.

---

### 참고 자료

[원본 경로 #1](https://arxiv.org/pdf/1511.06015)

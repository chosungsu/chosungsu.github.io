---
title: 'Maximum Likelihood Methods'
date: '2023-05-19'
tags: ['Mathematical statistics', 'lecture']
---

### Maximum Likelihood Estimation

$X$의 pdf $f(x; \theta)$가 미지의 모수 $\theta \in \Omega$에 의존한다고 가정하고, $X_1, \dots, X_n$은 $X$에 대한 확률 표본이라고 합니다.

우도 함수(Likelihood function)는 아래와 같습니다.

$$
\mathbf{L(\theta; \mathbf{x}) = \prod_{i=1}^n f(x_i; \theta)}
$$

우리의 점 추정량 $\hat{\theta} = \hat{\theta}(X_1, \dots, X_n)$은 함수 $L(\theta)$를 최대화하는 값이며, 이를 최대 우도 추정량 MLE라고 합니다. MLE는 세 가지 정규 조건이 있습니다.

$\rightarrow$ cdf는 구별 가능합니다. 즉, $\theta \ne \theta' \Rightarrow F(x; \theta) \ne F(x; \theta')$를 식별합니다.

$\rightarrow$ pdf는 모든 $\theta$에 대해 공통 지지(common support)를 갖습니다.

$\rightarrow$ 참값 $\theta_0$는 $\Omega$의 내부점입니다.

$$
\mathbf{\lim_{n\to\infty} P_{\theta_0} [L(\theta_0, \mathbf{X}) > L(\theta, \mathbf{X})] = 1}, \\
 \text{for all } \theta \ne \theta_0
$$

$n \to \infty$일 때 우도 함수는 참값 $\theta_0$에서 점근적으로 최대화됩니다. 밀도 함수 $f(x; \theta) = \frac{1}{2} e^{-|x-\theta|}$에 대해 로그 우도 함수는 $l(\theta) = -\text{const} - \sum_{i=1}^n |x_i - \theta|$입니다. 미분은 $l'(\theta) = \sum_{i=1}^n \text{sgn}(x_i - \theta)$입니다. 이 해는 표본 중앙값 $\mathbf{\hat{\theta} = Q_2 = \text{med}\{x_1, \dots, x_n\}}$입니다.

$\hat{\theta}$가 $\theta$의 mle이고 $\eta = g(\theta)$가 관심 있는 모수일 때, $\mathbf{g(\hat{\theta})}$는 $\mathbf{\eta}$의 mle입니다. 모수의 변환에 대해 불변(invariant)이므로 $p$의 $\text{mle}$가 $\bar{X}$이면, $p(1-p)$의 $\text{mle}$는 $\bar{X}(1-\bar{X})$입니다.

mle의 일치성에 따라서 우도 방정식 $\frac{\partial l(\theta)}{\partial \theta}=0$은 $\mathbf{\hat{\theta}_n \xrightarrow{P} \theta_0}$를 만족하는 해 $\mathbf{\hat{\theta}_n}$를 가집니다. 참값 $\theta_0$ 근처의 좁은 구간 $(\theta_0 - a, \theta_0 + a)$ 밖의 $\theta$ 값에 비해 $\theta_0$에서 우도 값이 더 클 확률이 1로 수렴합니다. 따라서 이 구간 내에 최대값을 주는 해 $\hat{\theta}_n$이 존재하며, $\mathbf{P[|\hat{\theta}_n - \theta_0| < a] \to 1}$이 성립합니다.

---

### Rao-Cramer Lower Bound and Efficiency

모든 불편 추정량의 분산에 대한 하한을 제공하는 라오-크래머 하한을 설정하고, 최대 우도 추정량(mle)의 분산이 정규 조건 하에서 점근적으로 이 하한에 도달함을 보여줍니다.

#### 피셔 정보, $I(\theta)$

위의 정규 정보 외에 추가로 두 가지를 지정합니다.

$\rightarrow$ pdf $f(x; \theta)$는 $\theta$에 대해 두 번 미분 가능합니다.

$\rightarrow$ 적분 $\int f(x; \theta) dx$는 적분 기호 아래에서 $\theta$에 대해 두 번 미분 가능합니다.

이 조건 하에서 아래의 중요한 관계가 성립합니다.

점수 함수(score function)의 기댓값은 

$$
\mathbf{E\left[\frac{\partial \log f(X; \theta)}{\partial \theta}\right] = 0}
$$

이와 같이 0이 되며 피셔 정보가 단일 관측치 $\mathbf{X}$에 포함된 정보량이므로 

$$
\begin{aligned}
& I(\theta) \\
&= E\left[\left(\frac{\partial \log f(X; \theta)}{\partial \theta}\right)^2\right] \\
&= \text{Var}\left(\frac{\partial \log f(X; \theta)}{\partial \theta}\right)
\end{aligned}
$$

이와 같이 정의됩니다. $n$개 크기의 확률 표본 $\mathbf{X}_1, \dots, \mathbf{X}_n$의 우도 함수 $\mathbf{L(\theta, \mathbf{X})}$에 포함된 정보는 $\text{Var}\left(\frac{\partial \log f(X; \theta)}{\partial \theta}\right) = nI(\theta)$와 같습니다. 즉, $n$개 표본의 정보는 단일 표본 정보의 $n$배입니다.

#### Rao-Cramer Theorem

통계량 $Y = u(\mathbf{X}_1, \dots, \mathbf{X}_n)$의 기대값 $\mathbf{E(Y) = k(\theta)}$일 때, $Y$의 분산은 다음 부등식을 만족합니다.

$$
\mathbf{\text{Var}(Y) \ge \frac{[k'(\theta)]^2}{nI(\theta)}}
$$

$Y$가 모수 $\theta$의 불편 추정량($k(\theta) = \theta$)일 때, $k'(\theta) = 1$이므로 라오-크래머 부등식은 다음과 같습니다.

$$
\mathbf{\text{Var}(Y) \ge \frac{1}{nI(\theta)}}
$$

이를 통해 $\mathbf{1/[nI(\theta)]}$는 $\theta$의 모든 불편 추정량이 가질 수 있는 분산의 최소값이 된다는 점을 확인합니다.

---

### Maximum Likelihood Tests

$X_1, \dots, X_n$은 $\text{pdf}$ $f(x; \theta)$를 따르는 $\text{iid}$ 확률 표본이며, $\theta$는 스칼라 모수라고 가정합니다.

$$
\begin{aligned}
H_0: \theta = \theta_0 \\
H_1: \theta \ne \theta_0
\end{aligned}
$$

$\mathbf{\hat{\theta}}$를 $\theta$의 최대 우도 추정량($\text{mle}$)이라고 할 때, $\mathbf{L(\theta_0)}$는 귀무 가설 하의 최대 우도 값이며, $\mathbf{L(\hat{\theta})}$는 모수 공간 $\mathbf{\Omega}$ 전체에서의 최대 우도 값입니다.

#### Likelihood Ratio test, LRT

우도비 통계량 $\mathbf{\Lambda}$는 다음과 같이 정의됩니다.

$$
\mathbf{\Lambda = \frac{L(\theta_0)}{L(\hat{\theta})}}
$$

$\mathbf{\Lambda \le 1}$이며, $\mathbf{H_0}$가 참이면 $\Lambda$는 1에 가까워야 하고, $\mathbf{H_1}$이 참이면 작아야 합니다.

#### Wald test

점근적 정규 분포 $\mathbf{N(\theta_0, \frac{1}{nI(\theta_0)})}$를 기반으로 하는 검정입니다.

$$
\mathbf{\chi_W^2 = \left[\sqrt{nI(\hat{\theta})}(\hat{\theta} - \theta_0)\right]^2}
$$

$\mathbf{\hat{\theta}}$가 $\theta_0$에서 멀어질수록 $\chi_W^2$는 커집니다. $\mathbf{H_0}$ 하에서, $\mathbf{\chi_W^2}$는 점근적으로 $\mathbf{\chi^2(1)}$ 분포를 따릅니다.

#### 점수 검정

$$
\mathbf{\chi_R^2 = \frac{[l'(\theta_0)]^2}{nI(\theta_0)} = \frac{\left[\sum_{i=1}^n \frac{\partial \log f(X_i; \theta_0)}{\partial \theta}\right]^2}{nI(\theta_0)}}
$$

이 검정은 $\mathbf{H_0}$ 하의 우도 함수 기울기(점수 함수)를 평가하는 데 기반합니다. $\mathbf{H_0}$가 참이면 $\hat{\theta} \approx \theta_0$이므로, $\mathbf{l'(\theta_0)}$는 0에 가까워야 합니다.

#### Relation of three tests

세 가지 검정 통계량은 $\mathbf{H_0}$ 하에서 모두 점근적으로 $\mathbf{\chi^2(1)}$ 분포를 따르며, 다음과 같이 확률 수렴합니다.

$$
\begin{aligned}
& \chi_W^2 - \chi_L^2 \xrightarrow{P} 0 \\
& \chi_R^2 - \chi_W^2 \xrightarrow{P} 0
\end{aligned}
$$

즉, 점근적으로 세 검정은 동등합니다.

---

### EM Algorithm

실제 상황에서는 데이터의 일부가 누락된 경우가 많습니다. 예를 들어, 기계 부품의 수명을 관찰할 때, 일부 부품이 통계 분석 시점에도 여전히 작동 중일 수 있습니다. $n$개의 항목 중 $n_1$개가 관측되고 $(X)$, $n_2 = n - n_1$개가 관측되지 않았다고 $(Z)$ 가정합니다.

$\mathbf{L(\theta|\mathbf{x}) = g(\mathbf{x}|\theta)}$는 관측 우도 함수이고 $\mathbf{L_c(\theta|\mathbf{x}, \mathbf{z}) = h(\mathbf{x}, \mathbf{z}|\theta)}$가 모든 데이터를 포함한 joint pdf인 완전 우도 함수라고 합니다.

목표는 $\mathbf{L(\theta|\mathbf{x})}$를 최대화하는 $\theta$를 찾는 것이지만, 이 과정에서 완전 우도 함수 $\mathbf{L_c(\theta|\mathbf{x}, \mathbf{z})}$를 사용합니다.

$$
\mathbf{\log L(\theta|\mathbf{x}) = Q(\theta|\theta_0, \mathbf{x}) - E_{\theta_0}[\log k(\mathbf{Z}|\theta, \mathbf{x})|\theta_0, \mathbf{x}]}
$$

여기서 $\mathbf{k(\mathbf{z}|\theta, \mathbf{x})}$는 관측 데이터 $\mathbf{x}$가 주어졌을 때 누락 데이터 $\mathbf{Z}$의 조건부 $\text{pdf}$입니다. 그리고 기댓값 부분인 $Q$는 

$$
\mathbf{Q(\theta|\theta_0, \mathbf{x}) = E_{\theta_0}[\log L_c(\theta|\mathbf{x}, \mathbf{Z})|\theta_0, \mathbf{x}]}
$$

$\mathbf{\theta_0}$ 하에서 관측 데이터 $\mathbf{x}$가 주어졌을 때의 완전 로그 우도의 조건부 기대값으로 정의됩니다. $\mathbf{\hat{\theta}^{(m)}}$을 $m$번째 단계의 추정량이라고 할 때, $(m+1)$번째 추정량을 계산하는 단계는 다음과 같습니다.

$E$ step으로 현재 추정량 $\mathbf{\hat{\theta}^{(m)}}$을 사용하여 $\mathbf{Q(\theta|\hat{\theta}^{(m)}, \mathbf{x})}$를 계산합니다. $M$ step으로 $\theta$에 대한 함수인 $\mathbf{Q(\theta|\hat{\theta}^{(m)}, \mathbf{x})}$를 최대화하는 $\mathbf{\hat{\theta}^{(m+1)}}$을 찾습니다.

---

### 참고 자료

[원본 경로 #1](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)



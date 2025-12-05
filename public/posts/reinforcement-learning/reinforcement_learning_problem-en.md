---
title: 'The Reinforcement Learning Problem'
date: '2025-03-03'
tags: ['reinforcement learning', 'lecture']
---

### Foundational Idea of Learning

The idea of learning through interaction with the environment is the first that comes to mind when thinking about the nature of learning. When infants play, wave their arms, or look around, there is no explicit teacher, but they have direct sensorimotor connections with the environment. By executing these connections, they gain rich information about cause and effect, the consequences of actions, and what to do to achieve goals.

We seek to clearly recognize how the environment responds to actions and to influence what happens through actions. Learning through interaction is an idea that underlies almost all theories of learning and intelligence.

---

### Reinforcement Learning

The reinforcement learning problem involves learning what to do—how to map situations to actions—so as to maximize a numerical reward signal.

Through a closed loop, the actions of the learning system affect subsequent inputs. The learner is not directly told which actions to take, but must discover which actions yield the most reward by trying them. The consequences of actions play out over extended time periods.

#### The Exploration–Exploitation Dilemma

One of the challenges that arise in reinforcement learning is the balance between exploration and exploitation. To obtain many rewards, one must prefer actions that have been tried in the past and found to be effective in producing reward, but one must also try actions not previously selected in order to discover better actions.

---

### Examples of Reinforcement Learning

They share several basic features.

They involve interaction between an active decision-making agent and an environment, and seek to achieve goals despite uncertainty about the environment. At the same time, the effects of actions cannot be fully predicted, so monitoring is necessary.

The agent need not be a robot or organism, and the environment need not be something external to it.

---

### Elements of Reinforcement Learning

In addition to the agent and environment, a reinforcement learning system has four main sub-elements: policy, reward signal, value function, and model.

#### Policy

A policy is a mapping from perceived states of the environment to actions to be taken in those states. It is the core of a stochastic agent.

#### Reward Signal

At each time step, the environment sends a single number, a reward, to the agent. The agent's sole objective is to maximize the total reward it receives over the long run.

#### Value Function

The value of a state is the total amount of reward an agent can expect to accumulate in the future, starting from that state. Rewards determine the immediate, intrinsic desirability of environmental states, while values take into account the states that are likely to follow and the rewards available in those states. Rewards are primary, whereas values are secondary, as predictions of rewards.

#### Model of the Environment

A model mimics the behavior of the environment, or enables inferences to be made about how the environment will behave. Methods that use models and planning are called model-based methods, whereas simpler methods that do not use models are called model-free methods.

---

### Limitations and Scope

Some optimization methods, such as genetic algorithms, genetic programming, and simulated annealing, have approached reinforcement learning problems without using value functions.

Evolutionary methods ignore useful structure in the reinforcement learning problem; they do not take advantage of the fact that the agent passes through states or selects actions.

Policy gradient methods search a policy space defined by a set of numerical parameters. They estimate the direction in which parameters should be adjusted to improve policy performance most rapidly while the agent interacts with the environment.

---

### References

[Original source #1](https://web.stanford.edu/class/psych209/Readings/SuttonBartoIPRLBook2ndEd.pdf?utm_source=chatgpt.com)

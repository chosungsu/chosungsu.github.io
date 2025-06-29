---
title: 'Monte carlo tree search'
date: '2025-03-28'
tags: ['cs234', 'lecture']
---

### simulation based search

Instead of computing a policy for the entire state space, this method prioritizes local computation to make better decisions for the current state.

In simple Monte Carlo search, given a model $M$ and simulation policy $\pi$, for each action $a$, we simulate $k$ episodes from the current state and evaluate actions using the average reward value.

If we have an MDP model, we can construct a tree to compute $Q$ for optimal $(s,a)$ pairs, but there's a limitation that the tree size grows to $(|S||A|)^{H}$, making computational cost very high.

---

### monte carlo tree search(MCTS)

MCTS constructs a search tree with the current state as root when a model is given. The difference from Monte Carlo simulated search is that instead of performing a single simulation, it reuses information through incremental construction.

Upper Confidence Tree (UCT) uses bandits to decide which action to select, where $Q(s,a,i)=\frac{1}{N(i,a)} \sum_{k=1}^{N(i,a)} G_k(i,a) + c\sqrt{\frac{O(logN(i))}{N(i,a)}}$ adds a bonus term to the $Q$ value of action at node $i$ to select the action with the highest upper bound.

---

### References

[Original source #1](https://youtu.be/UgANzoWc0nc?si=nExAbFJ55hGLEPvK)



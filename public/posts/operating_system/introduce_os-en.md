---
title: 'Introduce OS'
date: '2022-05-06'
tags: ['Operating System', 'lecture']
---

### Introduction

An operating system is essential system software positioned between computer hardware, users, and application programs. The fundamental role of an operating system can be understood from two main perspectives.

First is its role as a hardware manager. The operating system is responsible for efficiently allocating and managing all system resources such as CPU time, memory space, file storage space, and I/O devices.

Second is its role as an extended machine or virtual machine. The operating system hides complex and difficult-to-handle hardware interfaces and provides a simple and standardized abstraction layer that application programmers can easily access and use.

#### Historical Development of OS

Operating systems have evolved along with the development of computer technology, and the main goal was to increase hardware utilization.

Batch processing systems collected and processed jobs in batches in early systems. Similar jobs input through cards were grouped together and processed by the CPU at once without user interaction, reducing idle time.

Time-sharing systems divide CPU time into very short time units (Time Slices) and allocate them to each user so that multiple users can use one computer simultaneously.

Multiprogramming loads multiple programs into memory simultaneously, and when one program enters a waiting state without using the CPU due to I/O operations, it hands over the CPU to another program.

#### Goals

Modern operating systems pursue four core goals.

They enable users and programmers to use the system easily and conveniently without worrying about hardware complexity, and maximize hardware resource utilization to increase system throughput. They protect other programs and the system itself from one running program or user, and the system is modularized and flexibly designed to easily add new hardware or features.

---

### System Structure and Abstraction Layers

Computer systems generally operate divided into three main abstraction layers.

Hardware refers to physical devices that perform actual computing tasks such as CPU, memory, disk, and I/O devices. The kernel is the core part of the operating system, located directly above hardware, and performs the most fundamental functions of the system such as resource management, process scheduling, and memory allocation. User space is the space where application programs or user utilities run.

#### User Mode / Kernel Mode and Protection Mechanisms

The CPU protects the system using a mode bit that represents the privilege level of the currently executing code. Kernel mode has the mode bit set to 0 and has the highest privileges to execute all hardware commands. User mode has the mode bit set to 1, and execution of privileged instructions that could pose risks to the system, such as device access or memory management, is restricted.

---

### OS Structure and Design Types

#### Monolithic Kernel vs Microkernel

A monolithic kernel bundles all operating system services into one large program that runs within kernel space. Function calls within the kernel are simple and have low overhead, resulting in fast performance. However, the kernel code is vast, making debugging and maintenance difficult, and if an error occurs in one device driver, the entire system can crash.

A microkernel keeps only the most essential functions (process management, memory management) in kernel space and separates the remaining services to run as server processes in user space. The kernel is small, making debugging and maintenance easy, and even if an error occurs in a service server in user space, the kernel itself remains safe. However, communication between services occurs through Inter-Process Communication (IPC), resulting in high overhead and potentially lower performance compared to monolithic kernels.

---

### References

[Original source #1](https://www.cis.upenn.edu/~lee/03cse380/lectures/ln2-process-v4.pdf)

[Original source #2](https://www.cl.cam.ac.uk/teaching/1011/OpSystems/os1a-slides.pdf)

---
title: 'Process and Thread'
date: '2022-05-13'
tags: ['Operating System', 'lecture']
---

### Process & Thread Fundamentals

A program is a passive executable file stored on disk—just a bundle of instructions and data. A process is an active execution unit that is loaded into memory and being executed by the CPU.

#### Process Control Block (PCB)

The core data structure in which the OS stores and manages information about every process in the system. It includes all metadata needed for execution, such as process ID, current state, CPU register values, memory management info, and file I/O state.

During execution, a process transitions through several states. New: created but not yet loaded into memory. Ready: loaded in memory and waiting to be scheduled on the CPU. Running: currently executing on the CPU. Blocked/Waiting: paused while awaiting a specific event such as I/O completion.

#### Process Creation and Hierarchy

New processes are created by existing ones via fork and exec. fork creates a child process with a copy of the parent’s address space. exec loads a new program’s code into the child’s address space and runs it.

#### Threads

The basic unit of CPU execution within a process. Threads have their own CPU state (PC, registers) and stack, while code, data, and heap are shared with other threads in the same process.

Multiprocessing gives each process its own address space, providing strong isolation but higher IPC and context-switch overhead. Multithreading shares memory among threads, allowing faster communication and lower context-switch overhead.

User-level threads are managed in user space without kernel support; context switches are very fast, but if one thread blocks on I/O, the entire process blocks. Kernel threads are managed directly by the OS; if one thread blocks, others can continue. Most modern OSes use kernel threads by default.

---

### CPU Scheduling

The scheduler is the OS module that selects which Ready process runs next on the CPU. The long-term scheduler selects processes from the job queue to load into the ready queue. The short-term scheduler picks the next process to receive the CPU from the ready queue and is invoked very frequently (millisecond scale). The dispatcher actually hands CPU control to the process chosen by the short-term scheduler.

#### Scheduling Algorithm Types

FCFS assigns the CPU to the first process that arrives. It is non-preemptive and can suffer from the convoy effect when short jobs wait behind long ones.

SJF prioritizes the process with the shortest CPU burst. It minimizes average waiting time but requires accurate burst-time prediction. Both preemptive and non-preemptive variants exist.

Round Robin gives each process a time quantum; if it doesn’t finish, it returns to the back of the ready queue. It is a classic preemptive algorithm with fast response time.

Priority Scheduling assigns a priority to each process and allocates the CPU to the one with the highest priority.

---

### Concurrency & Synchronization

Memory variables, files, and I/O devices accessed simultaneously by multiple processes or threads are shared resources. A race condition occurs when concurrent access and updates cause results to depend on the order of execution. Concurrency issues in a critical section—code that accesses shared resources—arise when mutual exclusion is not enforced.

Synchronization aims to satisfy three conditions: mutual exclusion, progress, and bounded waiting.

Locks are the most basic mutual-exclusion tool: a process entering a critical section locks the resource and unlocks it after finishing. A semaphore’s wait operation decrements its value and blocks if the value is 0 or below; the signal operation increments the value and wakes a waiting process if any.

---

### Deadlock & Resource Allocation

Deadlock is a state where two or more processes wait on each other’s resources and end up waiting indefinitely. Four conditions must all hold for deadlock to occur:

Mutual exclusion: at least one resource is non-sharable, so only one process can use it at a time. Hold-and-wait: a process holding one or more resources waits to acquire additional resources held by others. No preemption: allocated resources cannot be forcibly taken; they are released only voluntarily by the holder. Circular wait: waiting processes form a cycle in their resource requests.

---

### 참고 자료

[원본 경로 #1](https://www.cis.upenn.edu/~lee/03cse380/lectures/ln2-process-v4.pdf)

[원본 경로 #2](https://www.cl.cam.ac.uk/teaching/1011/OpSystems/os1a-slides.pdf)
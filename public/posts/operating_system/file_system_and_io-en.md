---
title: 'File system and I/O'
date: '2022-05-27'
tags: ['Operating System', 'lecture']
---

### I/O & Device Management

The I/O (Input/Output) subsystem enables users to interact with the computer and manages communication with devices that store data persistently.

Device drivers are kernel modules for each device that encapsulate registers, communication protocols, and so on, exposing an interface (API) for access. Polling has the CPU periodically check a device’s status register to see if an I/O operation is complete; it is simple to implement but can lead to busy-waiting if the device is slow. Interrupt-driven I/O has the device send an interrupt to the CPU upon completion to request attention. Direct Memory Access transfers large amounts of data between a device and memory while the DMA controller manages memory access directly without CPU involvement.

#### Disk Scheduling

When disk I/O requests queue up, scheduling algorithms aim to minimize head movement (seek time) to maximize disk throughput and reduce average response time.

FCFS processes requests in arrival order—fair, but head movement can be inefficient. SSTF serves the request on the track closest to the current head position first; starvation can occur for outer/inner tracks. SCAN moves the head from one end of the disk to the other, serving requests along the way, then reverses direction and serves on the way back.

---

### File System

The file system is one of the OS’s most important abstractions: it converts physical storage devices such as disks into a hierarchy of files and directories that is easy for users to understand, managing data persistently.

#### File and Directory Concepts

A file is a logically related collection of information, perceived by users as the logical unit on persistent storage. A directory is a special type of file that provides structure for the file system, storing mappings from file names to where the files are stored (index, i-node, etc.). Links include hard links, which create additional directory entries to the same file data, and symbolic links, which are pointer files storing the path name of the original rather than the data.

#### File Allocation Methods

Contiguous allocation places a file in a sequence of consecutive disk blocks. Sequential and random access is fast, but external fragmentation occurs and resizing is difficult.

Linked allocation scatters a file’s blocks across arbitrary disk locations, each block containing a pointer to the next. Random access is impossible, pointer storage adds overhead, and corruption can make data hard to reach.

Indexed allocation uses an index block that gathers all block addresses of the file. Logical block numbers map to the physical disk block addresses storing the data.

---

### 참고 자료

[원본 경로 #1](https://www.cis.upenn.edu/~lee/03cse380/lectures/ln2-process-v4.pdf)

[원본 경로 #2](https://www.cl.cam.ac.uk/teaching/1011/OpSystems/os1a-slides.pdf)

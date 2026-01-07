### Info unrelated to the article.

There is a separation into two levels of complexity. One is Overview/Basic and the second is Deep Dive/Advanced.

While Basic mode will aim to provide the general idea of how things work, the Advanced mode will give the details and the why they work like they do.

Both will be explained with analogies and in simple terms for beginners to understand. That is the core principle of the project.

## How does a PC work? - Basic

**Definition**

Personal Computer (PC) - A personal computer is a multi-purpose electronic device that processes data according to given instructions (a program)

**Explanation and analogy**

A PC is like a kitchen. While on a kitchen you take raw ingredients and turn them into meals, here you take data and transform it into other types of data.

Just like a kitchen, a PC consists of many different elements all of which have their own tasks. Common tools found on a kitchen would be something like a knife, stove, fridge, etc. Same goes for the PC, but instead of knives it has a CPU, GPU, RAM, Motherboard and a PSU.

Here’s how the main parts of a PC work together, using our kitchen analogy:

| PC Component | Kitchen analogy | What it Does (Simple) |
| --- | --- | --- |
| **GPU** | **Waiter** - Serves the ready food to you. | Displays the image on your screen for you to see. |
| **CPU** | **Chef** - The brains of the operation. Decides which ingredient goes where and what task is done. | Processes data and does the tasks you tell your PC to do, such as moving files. |
| **RAM** | **Countertop** - Where ingredients are briefly stored before being put to use. | Very fast temporary storage where other components have quick access to the data they need to process. |
| **SSD/HDD** | **Storage Room / Pantry** - Where all the ingredients are located and need to be brought from for the chef to do his job. | Slower, permanent storage where all your data is kept. Data needs to be loaded into RAM for quick access. |
| **Motherboard** | **Building** - The structure where the chef, ingredients, and everyone resides and works together. | The main circuit board that connects all the parts together and allows them to communicate. |
| **PSU (Power Supply Unit)** | **Fuse Box / Power Lines** - Supplies electricity to the building so there is light and power for the chef and others to work. | Supplies power to all the other components so they can function. |

This also applies to Phones, Consoles, Tablets. They are made in a slightly different way but the core principle is the same.

To put the process of the components interacting with each other into perspective

1. The permanent storage (SSD/HDD) gets the necessary program data
2. This data is then loaded into temporary, high-speed memory (RAM) for near instant access.
3. The central processing unit (CPU) fetches instructions and data from the temporary storage, performs calculations, and manages the task.
4. Once the CPU finishes the calculations it sends the result to the graphics processing unit (GPU) for it to turn the data it received into an image
5. When the GPU finishes rendering the image it takes and shows it on our screen
6. The Motherboard connects all of these components together and allows them to communicate with each other, while the power supply unit (PSU) supplies the necessary power to each component throughout the process.

## How does a PC work? - Advanced

**Definition**

Personal Computer (PC) - A personal computer is a multi-purpose electronic device that processes data according to given instructions (a program)

**Explanation**

Nearly all modern PCs are based on the Von Neumann Architechture. This design defines a computer with four main subsystems:

1. A central processing unit (CPU) with an Arithmetic Logic Unit (ALU) and a Control Unit (CU).
2. Memory to store both data and instructions (RAM)
3. Mass Storage for long-term retention (SSD/HDD)
4. Input/Output (I/O) interface to interact with the outside world.

### Central Processing Unit (CPU)

A CPU is a small, incredibly complex electronic circuit (microprocessor) built on a silicon chip. Its primary job is to execute instructions from a program.

Core components:

- Control Unit (CU): The “traffic cop“. It takes instructions from memory, decodes them (understands what to do), and commands the operation of the ALU and registers.
- Arithmetic Logic Unit (ALU): The “calculator“. It performs all mathematical (add, subtract) and logical (AND, OR, NOT) operations
- Registers: A tiny set of ultra-fast memory inside the CPU itself. (e.g., Program Counter (PC), Instruction Register (IR), Accumulator). They hold the data and addresses the CPU is immediately working on.

The “Fetch-Decode-Execute“ Cycle: Equivalent of a heartbeat for a CPU.

1. Fetch: The CU uses the Program Counter register to get the address of the next instruction from RAM, and fetches it.
2. Decode: Then the CU decodes the instruction to determine what operation (e.g., ADD, LOAD, STORE) is required
3. Execute: Finally the CU directs the ALU and other components to carry out the instruction (e.g., add two numbers from registers, store a result back to RAM).

Clock speed: The CPU’s actions are synced by a clock signal measured in HZ. One cycle is the smallest unit of time in which a simple operation, like fetching an instruction, can occur. Higher clock speed (HZ) means more cycles per second, but there is also instructions per cycle - IPC, and its equally critical.

The CPU, RAM, and other components can’t talk directly. They communicate over a shared set of connections called the system bus. You can think of it as the highway system of the computer, with three lanes for each different type of traffic:

| **Bus** | **Analogy** | **What it carries** | **Simple explanation** |
| --- | --- | --- | --- |
| **Address bus** | **House address / destination label** | A binary number that identifies a **location** (in RAM or a device register) | Usually **one-way (CPU → memory/devices)**. The CPU puts an address on the bus to specify _where_ it wants to read from or write to. |
| **Data bus** | **Delivery truck carrying the goods** | The **actual data** being transferred (instructions, numbers, text, etc.) | **Two-way.** After an address is chosen, the data itself travels between the CPU and RAM (or an I/O device) on this bus. |
| **Control bus** | **Traffic lights + rules of the road** | **Control signals** such as Read/Write, Clock, Interrupts, Ready/Wait | Coordinates _how_ and _when_ the transfer happens: whether it’s a **read** or **write**, when data is valid, and when devices request attention (interrupts). |

This bus structure is the reason for why we have a memory hierarchy.

| Level | Name | Analogy | Speed | Size | Volatile? | Purpose |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | CPU Registers | Tools in the chef's hands | Fastest | Smallest (KB) | Yes | Hold data for current CPU instruction. |
| 2 | CPU Cache (L1/L2/L3) | Prepped ingredients on a side table | Extremely Fast | Small (MB) | Yes | Store copies of frequently used data from RAM to avoid slow main memory access. |
| 3 | RAM (Main Memory) | The main kitchen countertop | Very Fast | Large (GB) | Yes | Hold data and instructions for active programs and the OS. Volatile = data lost on power off. |
| 4 | SSD/HDD (Storage) | The pantry/cold storage | Slow (relative) | Very Large (TB) | No | Hold all data permanently. Non-Volatile = data persists without power. |

The CPU can process data incredibly fast, but if it had to fetch every piece of data from RAM over the System Bus, it would spend most of its time just waiting for the data rather than actually doing calculations. This wait is called **latency**.

This is why we have a CPU cache, it sits physically close to the CPU cores and holds copies of frequently used data from RAM. That way the CPU can avoid the slow trip over the main system bus for that data.

The motherboard’s chipset acts as the traffic controller and the bridge for this bus system. It controls the flow of data between the CPU, RAM and all other components.

**Why can’t we just make everything be directly stored in cache rather than RAM?**

Physics and economics. Faster memory is more expensive and physically larger. That’s why we make use of smaller caches with ultra fast memory (CPU cache) and bigger caches with slower memory (RAM) to make the illusion of one unified fast memory.

### Graphics Processing Unit (GPU)

- While a CPU has a few (e.g. 6-18) powerful, complex cores optimized for sequential task execution (doing one or a few things very fast). A GPU has hundreds or thousands of smaller, simpler cores optimized for parallel processing (doing thousands of simple calculations simultaneously)
- To render an image you need to perform the same calculations (calculating lighting, color, and position) on millions of pixels at once. This is a parallel task, perfectly suited for a GPU’s architecture.
- Due to this parallel architecture its now used for general-purpose computing (GPGPU), accelerating task like video encoding, scientific simulation, and machine learning.

### Motherboard

Houses and connects all of the components, also contains crucial subsystems:

- Power Delivery (VRM): Converts power from the PSU to clean, precise low voltages that are needed by the CPU and RAM.
- System Bus & Chipset: As explained above, the chipset manages all data traffic between the CPU, Ram, GPU and peripherals.
- BIOS/UEFI Firmware: The low-level software stored on a separate BIOS chip that initializes hardware during boot and provides the interface to load an operating system(s)

### Power Supply Unit (PSU)

- The PSU converts Alternating Current (AC) from your wall outlet (e.g., 120V, 230V AC) to stable, low-voltage Direct Current (DC) required by PC components (+12V, +5V, +3.3V).
- Has two critical specs, wattage (total power capacity) and efficiency rating (80 Plus Bronze, Gold, etc) indicate how much power is wasted as heat.

To sum up the entire tree of PC components and how they interact, lets trace what actually happens when you open a document on your computer.

1. Input: You click the file icon. Electrical signal travels go trough USB to the motherboard’s chipset.
2. Instruction Fetch: The OS, already running in RAM, has the CPU execute instructions to handle the click. The CPU fetches these instructions from RAM into its cache and registers.
3. Storage access: The “open file“ instruction requires data from the SSD. The CPU issues a command to the SSD to fetch the file’s data blocks via the chipset and SATA/NVMe controller.
4. Data Loading: The file data is transferred from the SSD (slow) into a reserved space in RAM (fast). This is necessary because the CPU cannot process data directly from the SSD at full speed.
5. Processing: The CPU (and potentially the GPU for rendering fonts/effects) processes the file data now in RAM.
6. Output: The data is sent from RAM, via the PCIe bus, to the GPU’s own dedicated video memory (VRAM). The GPU renders the frame and outputs it to the display.

Throughout this entire sequence, the PSU provides stable DC power to every component, and the motherboard’s traces and chipset provide and support all the communication between the components.
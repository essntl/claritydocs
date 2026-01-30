### Info unrelated to the article.

There is a separation into two levels of complexity. One is Overview/Basic and the second is Deep Dive/Advanced.

While Basic mode will aim to provide the general idea of how things work, the Advanced mode will give the details and the why they work like they do.

Both will be explained with analogies and in simple terms for beginners to understand. That is the core principle of the project.

# How do HDDs work?

## Basic:

Hard Disk Drives (HDDs) are something we all use whether we are aware of it or not. HDDs are the most accessible, cost effective storage medium which have been used in computers for years, just these past few years we have moved to Solid State Drives (SSDs). Even if you haven't used HDDs yourself, they are mass used in data centers (the cloud).

As implied in the name, these drives rely on spinning magnetic disks to store data. These disks are called platters. Inside an HDD, multiple platters are stacked on top of each other like pancakes, and both sides of each platter are used to store information. Imagine the surface as a target with concentric rings. Each ring is called a track, the outermost is Track 0, and they count inward from there. One surface can hold hundreds of these tracks.

Tracks are divided into smaller pieces called sectors. One sector is typically 4096 bytes, which is about half a page of text. That's the smallest unit you can read or write at a time, so even if you change just one letter in a file, the drive reads the whole sector, modifies it, and writes it back. Ultimately, your data lives in millions of these sectors. To find any piece of data, you need three coordinates: which platter surface (called the head number), which track, and which sector. This is like saying "third floor, row 7, book 15" in a library.

So how do we actually get to those coordinates? A mechanical arm called the actuator moves a tiny electromagnet called the read/write head over the correct track. The head floats just a few nanometers above the spinning surface, close enough to feel the magnetic fields, but not actually touching. To put that in perspective, a speck of dust is around 100 nanometers wide, so even a tiny particle would be like a boulder on a runway. This gap is why the platter surface must be polished so precisely.

For this magnetic storage to work reliably, the platters themselves are made of aluminum or glass and polished to atomic precision. Then they get a thin magnetic film applied to them, usually containing cobalt, chromium, and platinum. We use these specific materials because they hold their magnetic orientation reliably and resist changes from temperature fluctuations. Unlike computer memory (RAM) which forgets everything when you unplug it, this magnetic storage keeps your data safe even when the power is off.

We go through all this mechanical complexity because it's simply cheaper to store information on a magnetized patch of metal than to create a complex transistor for every bit of data like SSDs do. That's why you can get terabytes of storage for the price of a nice dinner.
### Info unrelated to the article.

There is a separation into two levels of complexity. One is Overview/Basic and the second is Deep Dive/Advanced.

While Basic mode will aim to provide the general idea of how things work, the Advanced mode will give the details and the why they work like they do.

Both will be explained with analogies and in simple terms for beginners to understand. That is the core principle of the project.

## Basic

An IP address is a unique identifier assigned to a device that's connected to a network. Think of it as a home address but for your device, and each device has its own home address where it receives mail (data). This is how the internet fundamentally works. We use IP addresses to determine where to send data and be sure that it's going to the correct place. For example, when we visit YouTube we connect to the website by sending a request to YouTube's IP address. It sees that our computer/phone has requested data so it looks at the request and sends us our feed, recommendations or videos we watch to our IP address. Through these exchanges we stay connected and get access to the services we use daily.

IP addresses can look different depending on their version, yes there are different versions! The current most common IP address is IPv4 and it consists of 4 numbers separated by dots.

```
192.168.1.1
```

IPv4 has 4.3 billion addresses total and we have actually "run out" of addresses. Ever since the internet became big it was inevitable that we would fill up all the addresses. So how does the internet still function if we are out?

The band-aid to that problem was NAT (Network address translation). Instead of giving each device its own public address, we now have one shared public address for all devices in a singular network. To put it into perspective, we went from individual house addresses to an apartment building with one address and a shared mail box marked for each apartment. So there is one public address the outside devices can reach your network on (Apartment block address), and there is a local IP address just for the devices on your network (Apartment numbers). This is where the name Network address translation comes from. The router handles the process of connecting you to other devices using the public IP address, when it gets data sent to it, it has to look at where the data is going and rewrite the address to point to the right apartment (device) inside your network. You can compare it to attaching a label to which device its supposed to go to inside the network.

Despite this fix, it's still not enough because once we reach 4.3 billion networks (households/offices) we will run out again. This is why we developed a new version called IPv6, which supports 340 undecillion addresses. That's enough to give every grain of sand on earth millions of addresses each. An IPv6 address looks like this:

```
2001:0db8:85a3:0000:0000:8a2e:0370:7334
```

We are currently in the middle of switching over to IPv6 but as long as IPv4 is usable it will be the majority preferred option due to it being simpler to remember and work with, and because upgrading all of the internet's infrastructure is expensive and complicated.

You might be thinking, "What happened to IPv5?". IPv5 was a thing, we didn't just skip over it. It was experimental and never meant for public use, it went by the name "Internet Stream Protocol (ST)" As you could tell by the name it was designed for streaming voice and video. This might seem useful but we have created and adopted better protocols like UDP for real-time streaming and TCP for reliable data transfer that work on top of IPv4 we know today. IPv5 was used back in the 80s where streaming wasn't needed at scale.

---

## Advanced

### Table of Contents

- IP Address Structure
  - IPv4: 32-bit Addresses
  - Binary Primer
  - IPv6: 128-bit Addresses
  - IPv6 Shortening Rules
- Subnetting and Why It Exists
  - Subnet Masks and CIDR Notation
  - Why Subnetting Matters
- NAT — Network Address Translation
  - How NAT Works
  - Port Address Translation (PAT)
  - Types of NAT
  - NAT Table Entry Lifetime
  - Problems with NAT
- DHCP — How Devices Receive Their IP Addresses
  - The DORA Process
  - DHCP Lease
  - DHCP Reservations
- IPv6 Address Assignment
  - DHCPv6
  - SLAAC
  - SLAAC + DHCPv6
- Global IP Address Allocation
  - The Allocation Hierarchy
  - IPv4 Exhaustion

---

### IP Address Structure

#### IPv4: 32-bit Addresses

An IP address is a device network identifier which allows devices to find and connect to each other remotely. There are different versions of IP addresses, the most widely used is IPv4. IPv4 consists of four up to three digit numbers separated by dots (e.g. 192.168.1.1). This is how it looks to us but to computers an IPv4 address is actually a 32-bit binary number consisting of ones and zeros.

#### Binary Primer

If you're unfamiliar with binary, here's what you need to know. Computers think in binary, ones and zeros, because at the hardware level everything is either "on" (1) or "off" (0). In our daily lives we use decimal (base-10), meaning each position can hold values 0-9. Binary is base-2, so each position can only be 0 or 1. The rule to remember is that each position represents a power of 2, doubling as you move left. To convert binary to decimal, you add up the values where there's a 1:

```
Binary:  1    0    1    1    0    0    0    1
Value:  128   64   32   16   8    4    2    1
         ↓         ↓    ↓                   ↓
        128   +   32 + 16              +    1   = 177
```

To convert decimal to binary you need to find which powers of 2 add up to your number. For 200: 128 + 64 + 8 = 200, in binary that's 11001000. All you need is to remember this pattern.

The example for an IPv4 address earlier (192.168.1.1) is just a human-friendly representation of this:

```
11000000.10101000.00000001.00000001
```

Each section between the dots is 8 bits, one 8 bit section is called an octet (from Latin "octo" meaning eight). We have 4 octets of 8 bits each, this results in 4 × 8 = 32 bits total. Since each octet is 8 bits it can only represent values between 0 and 255, that's because the minimum value is 00000000 which equals to zero while the highest is 11111111 which is 255. In binary the position of the number determines its value, next position is double of the previous position. Here is an example for an 8 bit value:

```
Position:  7    6    5    4    3    2    1    0
Value:    128   64   32   16   8    4    2    1
```

So 11111111 = 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255

We can use the previous IP as an example. The first octet (translated to decimal - 192) is 128 + 64 = 11000000. We can see that matches with the full translation above and the binary position table we have. This is why you will never see an IPv4 address with a number higher than 255 because anything above that is physically impossible with only 8 bits.

With this we can calculate how many possible IPv4 addresses there are:

```
2^32 = 4,294,967,296 addresses
```

There are nearly 4.3 billion addresses in total.

#### IPv6: 128-bit Addresses

As mentioned there are different versions of IP addresses. The new and improved IPv6 aims to improve the current IP system by solving the biggest issue with IPv4, and it's that IPv4 doesn't have enough addresses. Compared to IPv4 which is a 32-bit number, IPv6 is a 128-bit number. It is so long that it becomes impractical to write in binary or decimal so we use hexadecimal (base-16). The hex digits are 1-9 and a-f where (a=10, b=11, c=12, d=13, e=14, f=15). An IPv6 address is divided into 8 groups of 16 bits separated by colons, and each group is represented by 4 hexadecimal characters. To better explain, we can convert 2b8f in hexadecimal to decimal and binary. The calculation would look like this: 2 (hex) = 2 (decimal) = 0010 (binary). We repeat this for each of the digits.

```
2 = 2  = 0010
b = 11 = 1011
8 = 8  = 1000
f = 15 = 1111

2b8f = 0010 1011 1000 1111 = 11151 (decimal) = (2 * 16^3) + (11 * 16^2) + (8 * 16^1) + (15 * 16^0) (base-16)
```

We have turned the 4 hexadecimals into a 16-bit binary number, which makes up one of the groups in a IPv6 address.

```
2001:0db8:2b8f:0000:0000:8a2e:0370:7334
```

Having 128-bits allows us to have many more addresses compared to IPv4, and that would be putting it lightly. With IPv6 we can assign millions of IP addresses to each sand grain on earth.

```
2^128 = 340,282,366,920,938,463,463,374,607,431,768,211,456
```

That's roughly 340 undecillion possible IP addresses.

#### IPv6 Shortening Rules

Remembering and writing full IPv6 addresses is both hard and inefficient. This is why there are shortening rules to simplify them.

**Rule 1:** Leading zeros in each group can be ignored.

```
2001:0db8:0042:0000:0000:8a2e:0370:7334
becomes
2001:db8:42:0:0:8a2e:370:7334
```

**Rule 2:** One consecutive sequence of all-zero groups can be replaced with ::

```
2001:db8:42:0:0:8a2e:370:7334
becomes
2001:db8:42::8a2e:370:7334
```

You can only use :: once per address, otherwise it would be hard to know how many zero groups each :: represents.

We can use the loopback address as an example:

```
Full address
0000:0000:0000:0000:0000:0000:0000:0001

With shortening rules applied
::1
```

A loopback address is an address for a device to talk to itself. Same as localhost, which is just a hostname for a loopback address. Used for local services on one machine which aren't supposed to leave that machine.

Now that we have a grasp of how IP addresses look like and work we can continue on the structures which are required for them to work properly.

---

### Subnetting and Why It Exists

Subnetting allows us to create smaller, manageable networks inside a larger network.

In the early days of the internet, IP addresses were assigned in fixed "classes":

- **Class A:** First 8 bits for the network, remaining 24 for hosts (16.7 million addresses per network)
- **Class B:** First 16 bits for the network, remaining 16 for hosts (65536 addresses per network)
- **Class C:** First 24 bits for network, remaining 8 bits for hosts (256 addresses per network)

The issue with this system is that it was incredibly wasteful. If a company needed 500 addresses, they would have to get a Class B network with 65.5 thousand addresses where most would go to waste.

Subnetting solves this by letting us divide networks at any bit boundary, not just at 8, 16, or 24 bits.

#### Subnet Masks and CIDR Notation

Every IP address has two parts:

- **Network portion** - Identifies which network the device belongs to (Comparable to a street name)
- **Host portion** - Identifies the specific device inside that network (Like a house number)

A subnet mask tells us where the network portion ends and where the host portion begins.

It's a 32-bit number that masks the network portion of an IP address. It's written in the same way as an IP address:

```
Decimal
255.255.255.0

Binary
11111111.11111111.11111111.00000000
```

The rule here is simple. 1s mark the network portion while 0s mark the host portion.

So a mask of 255.255.255.0 tells us that the first 24 bits are the network, and the last 8 bits are for hosts.

While this is easy to remember, there is a more convenient and shorter way of doing it. It's called CIDR Notation.

Instead of writing:

```
192.168.1.0 with subnet mask 255.255.255.0
```

We can write:

```
192.168.1.0/24
```

The /24 indicates that the first 24 bits of the of the IP are the network portion. It's the same as if we just count the 1s in the subnet mask (255 = eight 1s).

Here's a table showing common CIDR Notations and how many host addresses they open:

| CIDR | Subnet Mask | Total Addresses | Usable Hosts | Common Use |
|------|-------------|-----------------|--------------|------------|
| /8 | 255.0.0.0 | 16,777,216 | 16,777,214 | Massive networks (10.0.0.0/8 for private) |
| /12 | 255.240.0.0 | 1,048,576 | 1,048,574 | Large private (172.16.0.0/12) |
| /16 | 255.255.0.0 | 65,536 | 65,534 | Large organizations, private networks |
| /20 | 255.255.240.0 | 4,096 | 4,094 | Medium organizations |
| /21 | 255.255.248.0 | 2,048 | 2,046 | Medium organizations |
| /22 | 255.255.252.0 | 1,024 | 1,022 | Medium organizations |
| /23 | 255.255.254.0 | 512 | 510 | Small-medium networks |
| /24 | 255.255.255.0 | 256 | 254 | Home networks, small offices |
| /25 | 255.255.255.128 | 128 | 126 | Small subnets |
| /26 | 255.255.255.192 | 64 | 62 | Small subnets |
| /27 | 255.255.255.224 | 32 | 30 | Small subnets |
| /28 | 255.255.255.240 | 16 | 14 | Very small subnets |

#### Why Subnetting Matters

Subnets are important at scale while it's mostly irrelevant in the home network sense. At a bigger scale subnets solve a few big issues:

**Problem 1: Broadcast traffic**

Some of the traffic in every network consists of broadcasts. Broadcasts go to each device on the subnet. Each device receives and processes these packets even if the broadcast wasn't meant for them.

ARP (Address Resolution Protocol) is the main culprit of broadcasts. When one device wants to communicate with another, it has to know its MAC address (Hardware address of the network card). It finds it by broadcasting to everyone "Hey everyone! Who has IP 192.168.1.45? Tell me your MAC address!". Every device on the subnet receives this message and has to process it. Only the device with that IP responds but everyone had to listen and process the packet.

Now imagine this at scale in a network of let's say, 30 thousand devices with each device doing this type of broadcast every few minutes along with other broadcasts. It quickly becomes a performance hazard. By scaling down and separating devices into subnets now only 250 machines receive the broadcasts which solves our issue.

**Problem 2: Security and isolation**

Traffic in a subnet flows freely, devices can talk directly to each other. Traffic between subnets must go through a router and routers can have firewall rules and access control lists which would limit traffic.

In an example scenario, let's say you have:

- Employee workstations
- Security cameras
- Guest WIFI
- Servers with sensitive data

If everything is on one big subnet (10.0.0.0/16), any device can communicate with any other device directly. A compromised security camera could try to access your database or a guest laptop could probe your employee workstations.

With subnetting:

```
10.0.1.0/24  →  Employee workstations
10.0.2.0/24  →  Security cameras
10.0.3.0/24  →  Guest WiFi
10.0.4.0/24  →  Servers
```

Now you can set rules on the router:

- Guest WiFi can ONLY reach the internet, nothing internal
- Security cameras can only talk to the recording server
- Only employee workstations can access the database server

A compromised camera literally cannot reach the database server because the router blocks it.

**Problem 3: Fault isolation**

Network problems tend to stay contained within a subnet.

If there is a misconfigured device, malware, network loop or anything else which could cause issues, it only affects that subnet and other subnets continue working normally.

With one giant subnet, one malfunctioning device can take down your entire network.

**Problem 4: Organizational Clarity**

It makes management easier.

```
10.0.1.0/24  →  Building A, Floor 1
10.0.2.0/24  →  Building A, Floor 2
10.0.10.0/24 →  Building B, Floor 1
```

When something breaks you immediately know where to look. When you see traffic from 10.0.2.x, you know it's from Floor 2.

---

### NAT — Network Address Translation

Despite IPv6 being better and us running out of IPv4 addresses we still stick to the old standard due to how expensive it is to upgrade the whole internet. This is why NAT was created. Back in the day each device had its own public IP address, but once the internet became more widespread in the 90s it was clear that we would run out quickly. NAT was supposed to be a "band-aid" fix so the internet wouldn't collapse.

#### How NAT Works

NAT allows your router to act as a translator, rewriting the addresses on packets as they flow in and out.

When your laptop wants to reach a web server, it creates a packet with:

```
Source IP:        192.168.1.10    (your laptop's local IP)
Source Port:      54123           (random high port chosen by your laptop)
Destination IP:   142.250.74.46   (Google's server)
Destination Port: 443             (HTTPS)
```

The issue with this is that if this packet reaches Google as it is written here, Google would try to reply to 192.168.1.10 which is a local address for your device inside the network. The reply would never arrive.

As a fix, your router intercepts outgoing and incoming packets and rewrites the destination information:

```
Before NAT (Leaving your laptop):

Source:       192.168.1.10:54123
Destination:  142.250.74.46:443

After NAT (Leaving your router):

Source:       203.0.113.50:62000    (your public IP + new port)
Destination:  142.250.74.46:443
```

The router writes this translation down in a NAT table.

| Internal Address | Internal Port | External Port | Destination | Destination Port | Protocol |
|------------------|---------------|---------------|-------------|------------------|----------|
| 192.168.1.10 | 54123 | 62000 | 142.250.74.46 | 443 | TCP |
| 192.168.1.10 | 54124 | 62001 | 151.101.1.140 | 443 | TCP |
| 192.168.1.15 | 49555 | 62002 | 142.250.74.46 | 443 | TCP |
| 192.168.1.20 | 60000 | 62003 | 52.26.14.11 | 443 | TCP |

Each row represents an active connection. The router uses this table to:

- **Route Outgoing packets** by rewriting the source to the public IP address and assigning an external port to point towards our devices internal IP address and local port.
- **Route Incoming packets** by rewriting the destination IP and port so the specific device receives it

The full roundtrip would look like this:

**Step 1: The laptop sends a request**

```
Laptop (192.168.1.10:54123) → Router
Packet: source=192.168.1.10:54123, destination=142.250.74.46:443
```

**Step 2: The router translates and forwards the request**

```
Router creates NAT table entry:
  192.168.1.10:54123 ↔ 62000

Router → Internet
Packet: source=203.0.113.50:62000, destination=142.250.74.46:443
```

**Step 3: Google receives the package and responds**

```
Google sees request from 203.0.113.50:62000
Google sends reply to 203.0.113.50:62000

Google → Router
Packet: source=142.250.74.46:443, destination=203.0.113.50:62000
```

**Step 4: Router translates back and delivers the packet to the device**

```
Router looks up port 62000 in NAT table
Finds: 62000 → 192.168.1.10:54123

Router → Laptop
Packet: source=142.250.74.46:443, destination=192.168.1.10:54123
```

Your laptop receives the response as if it has direct communication with Google.

#### Port Address Translation (PAT)

What's described above is specifically something called PAT (Also called NAPT - Network Port Address Translation), which is what home routers use.

The key point is that the router uses external ports to map connections, this creates the possibility to have thousands of simultaneous connections from different internal, local devices.

Your public IP address (e.g. 203.0.113.50) might have:

- Port 62000 mapped to your laptop's connection to Google
- Port 62001 mapped to your phone's connection to a social media platform
- Port 62002 mapped to your TV's connection to a streaming service

All using the same Public IP but differentiated by the port number.

Ports are 16-bit numbers (0-65535) meaning you have about 65000 available port mappings which is more than enough for a home network.

#### Types of NAT

**PAT - NAPT (What your home router does)**

- Many internal IPs share one public IP
- Distinguished by port numbers
- Most common type

**Dynamic NAT**

- Has a pool of public IP addresses available
- Each device gets a public IP temporarily when needed
- No port translation, just 1:1 IP mapping

**Static NAT**

- Permanent 1:1 IP mapping between local and public IP
- Used for servers that need to be reachable from the outside

#### NAT Table Entry Lifetime

NAT entries have timeout periods:

- TCP established connections often last 24 hours or until connection closes
- TCP transient states where the handshake is confirmed or closing last a few minutes
- UDP is a lot lower at about 30 seconds to a few minutes

TCP's timeout is longer compared to UDP due to the differences between in the protocols, one is expected to be reliable while the other is for speed. TCP first asks for confirmation that the transmission is received and the other side is getting the information, you can think of it as a phone call. This makes TCP reliable since on each transmission you expect a confirmation. UDP drops the confirmations, this makes UDP a lot faster but less reliable because if you miss a packet it's not re-transmitted. That's better for video calls and video games where real time data and speed count. If you miss a packet in a game, the old data becomes irrelevant by the time it's re-transmitted.

#### Problems with NAT

While NAT might seem clever and solves a lot of issues it also creates some which makes things more inconvenient.

**1. One device per port**

With NAT you can only assign one device per port. So if you have two devices that wish to use port 443 you would need to route the second one through a different port. With IPv6 which doesn't need NAT, each device has their own public IP meaning they each have an entire port range to themselves.

**2. Address embedded in protocols**

Some protocols include the IP address inside the data packet. The remote server you're trying to communicate with receives this and tries to reply using the local IP which doesn't exist on the internet. IPv6 doesn't have this issue since each device by default has the correct device and doesn't need translation.

**3. Peer-to-peer complications**

With NAT on both ends neither of you can initiate since the router drops the packets. You need work arounds (STUN/TURN) to establish connections. With IPv6 both sides have public addresses, direct connection is possible. All you need to do is make sure the firewall allows the connection.

---

### DHCP — How Devices Receive Their IP Addresses

When you connect a new device to a network it needs:

- An IP address
- Subnet mask
- Default gateway (router address)
- DNS server address

Someone or something needs to provide this information. There are two ways of doing this:

You can manually configure each device with a fixed IP, that's called **Static assignment**.

**Dynamic assignment** automates that process where a server automatically assigns addresses to devices as they connect.

This dynamic assignment is called DHCP - Dynamic Host Configuration Protocol.

#### The DORA Process

The process of automating address assignment is often called DORA:

**Step 1: Discover**

Your device just connected to the network and it has no IP address yet, so it broadcasts to everyone:

```
Source IP:      0.0.0.0         (I don't have an address yet)
Destination IP: 255.255.255.255 (broadcast to everyone)
Message:        "Is there a DHCP server out there? I need an address!"
```

**Step 2: Offer**

The DHCP server hears the broadcast and responds with an offer:

```
Server → Client (broadcast or unicast)
Message: "I can offer you 192.168.1.45, subnet 255.255.255.0, 
          gateway 192.168.1.1, DNS 8.8.8.8. Interested?"
```

**Step 3: Request**

Your device accepts an offer from a DHCP server:

```
Client → Broadcast
Message: "I'll take 192.168.1.45 from server 192.168.1.1 please"
```

On larger networks there can be multiple DHCP servers so this message is also a broadcast to let the other servers know their offer was rejected.

**Step 4: Acknowledge**

```
Server → Client
Message: "Confirmed. 192.168.1.45 is yours for 24 hours."
```

Your device then configures itself with the assigned address.

#### DHCP Lease

Addresses aren't given permanently, they're leased for a specific duration. For a home the typical duration is 24 hours, for corporate networks 8 hours and public WiFi is even shorter at 1-4 hours.

The device doesn't wait until the lease expires, it tries to renew at 50% of the lease time and if that fails it tries again at 87.5% but now it contacts any DHCP server not the one it got the IP from originally. If even that fails the device loses its address when the lease expires and must redo the DORA process again.

We use a lease system to make sure when devices leave without saying goodbye we don't keep their address reserved. For example:

- Phone connects to coffee shop WiFi, gets address
- Phone owner leaves, phone disconnects
- Without leases, that address is stuck forever
- With leases, address returns to the pool after expiry

The DHCP server has a configured range of addresses it can hand out:

```
Pool: 192.168.1.100 - 192.168.1.200
Subnet: 255.255.255.0
Gateway: 192.168.1.1
DNS: 8.8.8.8, 8.8.4.4
Lease time: 24 hours
```

The server tracks what's assigned:

| IP Address | MAC Address | Lease Expires |
|------------|-------------|---------------|
| 192.168.1.100 | AA:BB:CC:11:22:33 | 2024-01-15 14:30 |
| 192.168.1.101 | DD:EE:FF:44:55:66 | 2024-01-15 18:45 |
| 192.168.1.102 | Available | - |
| 192.168.1.103 | 11:22:33:AA:BB:CC | 2024-01-16 09:00 |

When a new device requests an address the server just picks any available one from the pool.

#### DHCP Reservations

You can also reserve an addresses with DHCP. If you want a specific device to always get the same address (for a home server, printer, etc) but still use DHCP for other settings.

The DHCP reservation ties a MAC address to a specific IP:

```
MAC AA:BB:CC:11:22:33 → Always assign 192.168.1.50
```

The device still gets to use DHCP, but the address is static. This gives you the benefits of static assignment and the convenience of DHCP (gateway, DNS, etc. still managed centrally)

---

### IPv6 Address Assignment

For IPv6 it's slightly different. It has three methods:

#### 1. DHCPv6

Similar to DHCP for IPv4, but the process is slightly different. IPv6 abolished broadcast entirely and replaced it with multicast. Instead of sending it to everyone we send it to a selected group. DHCP has its own multicast address, meaning all DHCP servers would be on this link.

#### 2. SLAAC - Stateless Address Auto-configuration

With SLAAC devices can generate their own addresses without a separate server. This is unique to IPv6.

**Step 1:** Router sends periodic advertisements:

```
Router → All devices (multicast)
"Network prefix is 2001:db8:abcd:1234::/64, I'm the gateway"
```

**Step 2:** Device generates its own address:

```
Network prefix: 2001:db8:abcd:1234::/64 (from router)
Interface ID:   ::1a2b:3c4d:5e6f:7890   (generated by device)
Full address:   2001:db8:abcd:1234:1a2b:3c4d:5e6f:7890
```

The interface ID can be generated from the devices MAC address which is predictable but reveals hardware, as an alternative it could also be a random value which would be better for privacy.

**Step 3:** Device checks for conflicts:

```
Device → Multicast
"Anyone using 2001:db8:abcd:1234:1a2b:3c4d:5e6f:7890?"

No response = Address is mine
Response = Generate new address, try again
```

#### 3. SLAAC + DHCPv6

SLAAC and DHCPv6 are often used together. SLAAC provides the IP address and gateway while DHCP handles the DNS servers and other options. You can control this by flags in the router advertisement:

```
M flag (Managed): Use DHCPv6 for addresses
O flag (Other): Use DHCPv6 for other config (DNS, etc.)
```

---

### Global IP Address Allocation

We now know how IP addresses work but where do they come from in the first place? Let's zoom out and look at the hierarchy of the internet.

#### The Allocation Hierarchy

```
IANA (Internet Assigned Numbers Authority)
    ↓
Regional Internet Registries (RIRs)
    ↓
Internet Service Providers / Large Organizations
    ↓
End Users
```

IANA manages the global pool of IP addresses. They allocate large blocks to five Regional Internet Registries:

| RIR | Region |
|-----|--------|
| ARIN | North America |
| RIPE NCC | Europe, Middle East, Central Asia |
| APNIC | Asia Pacific |
| LACNIC | Latin America, Caribbean |
| AFRINIC | Africa |

After that RIRs allocate address blocks to Internet Service Providers, large corporations, universities and government agencies.

Each organization must justify their need:

```
"We're an ISP with 50,000 customers, we need a /16 block"
RIR evaluates request, approves or denies
```

After receiving a block from their RIR, ISPs assign addresses to their customers:

```
ISP has: 203.0.0.0/16 (65,536 addresses)
Residential customer: 1 dynamic address (changes occasionally)
Business customer: Small static block (/29 = 8 addresses)
Large business: Larger block (/24 = 256 addresses)
```

#### IPv4 Exhaustion

IANA has exhausted their free IPv4 pool in 2011. RIRs followed:

- APNIC: 2011
- RIPE: 2012
- LACNIC: 2014
- ARIN: 2015
- AFRINIC: 2017

New IPv4 addresses now come from reclaimed unused blocks, organizations selling their allocations and very small pools with strict rules.

IPv4 addresses are a finite and depleted resource which is why IPv6 adoption matters.

---

## Summary

This brings us to the end of our walkthrough of IP addresses. To sum up what we have learned:

Every time you load a webpage, send a message, or stream a video, IP addresses are used behind the scenes to make sure data gets where it's meant to go. They are the postal system of the internet.

We covered a lot of topics:

**The basics:** IP addresses are unique identifiers for devices on a network. IPv4 gave us 4.3 billion addresses, which seemed like plenty until it wasn't. IPv6 fixes this with a practically infinite address space, but we are in the slow process of switching over.

**The band-aid:** NAT lets entire networks hide behind a single public IP, buying us time to make the switch. It works but introduces complexity and breaks some things that would "just work" with IPv6.

**The structure:** Subnetting lets us separate bigger networks into smaller more manageable pieces, isolating traffic, improving security and making troubleshooting possible at scale. CIDR notation gives us a clean way to express these divisions.

**The automation:** DHCP handles the tedious work of assigning addresses so addresses can join networks without manual configuration. IPv6 takes this further with SLAAC where devices can generate their own addresses.

**The hierarchy:** IP addresses don't appear from nowhere. IANA allocates blocks to regional registries, who allocate to ISPs, who then allocate to you. It's a finite resource, and for IPv4 it's already exhausted.

Having an understanding of IP addresses means you understand how the internet actually finds things. Everything else like DNS, routing, firewalls builds on top of this foundation.
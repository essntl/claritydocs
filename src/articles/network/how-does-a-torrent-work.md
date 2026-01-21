# What is a torrent and how does it work?

## Basic

A torrent is a way to share files. Unlike a normal download where you get the file from one source, torrents are peer-to-peer (P2P). You download pieces from many different people who have the file. Once you have pieces, you automatically start sharing them with others who need them.

To participate, you need a torrent client that handles everything automatically. When you download a .torrent file and open it in your client, that file contains all the information needed to start downloading, the file names and sizes, how the files are split into pieces, and cryptographic hashes to verify each piece is correct and hasn't been tampered with. It also includes the info hash, a unique identifying code for this specific torrent, and optionally some tracker addresses. The client uses this information to download bits from different peers until you have the complete file. Think of it like building a puzzle - the .torrent file tells you what the final picture should look like and how it's divided into pieces, then you ask different people for those pieces until you have the whole picture.

There are different types of peers. There are seeders which have the full file and give out pieces to others, and there are leechers which don't yet have the full file and are downloading it. Important to note, leechers also share the pieces they already have with others, everyone contributes even while downloading.

You might be questioning, how exactly are you able to connect to these peers in the first place if you don't know where to find them or who would have the file you need?

This is where something called a tracker comes in. It's like a central routing server that keeps track of who's downloading or seeding a specific torrent. When your client connects to the tracker asking for a specific torrent, the tracker responds with a list of IP addresses of other peers interested in that torrent, so you can connect to them directly. There is also DHT, we will touch onto that in a bit.

Once you are connected to the other peers, your client tells them which pieces you have and they tell you which pieces they have. After that the client starts downloading the pieces you're missing from the peers who have them.

Sharing pieces of files isn't the only thing peers are able to share. They can also share contacts of other peers. This means if you're trying to download a torrent and you need to find who to get the pieces from, you can ask peers in the network if they know other peers downloading the same torrent. This is called DHT (Distributed Hash Table). As said in the name this approach is distributed, meaning you don't need a tracker (central router server) to tell you where to find who. Peers who participate in DHT are called nodes. For new users who try to join a DHT network there are built in known good nodes in the torrent client you use which gives you a window to find other nodes. DHT is especially useful when trackers go down or when using magnet links that don't include a tracker.

Along with torrent files there are also magnet links. They're the short text equivalent of a torrent file with most of the metadata removed. All they contain is the info hash which is an identifying code for the file you want to download.

When you open a magnet link, your client first needs to find the metadata, the file sizes and piece information (a map showing which puzzle pieces to collect and how to assemble them). Your client connects to peers and asks "do you have the metadata for this torrent?" Once a peer sends the metadata, your client verifies it matches the hash, and only then can the actual download begin. This is why magnet links are usually a bit slower to start compared to torrent files, which already include all this information.

So why use magnet links? They're more convenient to share, just copy and paste text, no file downloads needed. Websites don't need to host .torrent files on their servers, they can simply display the magnet link as text.

## Advanced

A .torrent file is a metadata index containing:

- File names and sizes
- Piece length (how the file is divided, typically 256KB-1MB chunks)
- Piece hashes (SHA-1 hash of each piece for verification)
- Info hash (unique cryptographic identifier for the entire torrent)
- Tracker URLs (optional)

The info hash is particularly important - it uniquely identifies the torrent and allows verification that metadata and pieces are correct.

When you open a .torrent file, your client (e.g. qBittorrent, uTorrent, transmission, etc) reads this metadata to understand what you're trying to download. It now knows the file structure, how it's split up, and the hashes needed to verify each piece. Using the info hash from the .torrent file, it tries finding peers which have or want the same file. If the .torrent file includes tracker URLs, it contacts those trackers. If not (or the trackers fail), it falls back to DHT. DHT is a decentralized peer discovery method which will be explained below.

Trackers act as matchmaking servers. Your client tells the tracker the info hash of the torrent you're trying to download, and it responds with a list of peers (IP addresses + ports) interested in that torrent.

The client then connects to these peers and asks them what pieces they have, and it tells them what pieces you have. This is done using a bitfield message. A bitfield message is a binary map of which pieces each has. As you download pieces you announce that you have new pieces available to all connected peers. This allows everyone to know who has what.

Clients use piece selection algorithms to determine which piece to download:

- **Rarest first**: Prioritize downloading pieces that few peers have, ensuring piece diversity in the swarm (all peers connected to this specific torrent)
- **Random first**: Grab any piece quickly so you have something to share
- **Endgame mode**: When almost complete, request remaining pieces from multiple peers simultaneously

Each downloaded piece is verified against its SHA-1 hash from the metadata. Corrupted or incorrect pieces are discarded and re-downloaded from a different peer.

Along with trackers there is DHT or "Distributed Hash Table", it is a decentralized alternative to trackers. Instead of asking a central tracker, you ask other peers (nodes) in the network "Do you know any peers interested in a torrent with this info hash?" Nodes either know some peers or route you to other nodes that might know. Using the Kademlia algorithm, your query eventually reaches nodes that are storing information about peers interested in that torrent.

The issue with DHT is that you need to have an initial list of nodes for it to work effectively. Luckily clients have hardcoded bootstrap nodes (well-known DHT nodes like `router.bittorrent.com`) built-in. They also cache active nodes from your previous sessions. Once you connect to any peers via a tracker or DHT, you become a node yourself that others can query.

There are different ways to categorize peers:

- **Seeder**: Has 100% of the pieces and only uploads
- **Leecher**: Has less than 100% of the pieces, downloads AND uploads simultaneously. Once a leecher reaches 100%, they become a seeder
- **Leech** (negative term): Downloads but refuses to upload or stops immediately after finishing
- **Peer**: General term for any participant in the swarm
- **Swarm**: All the peers (seeders and leechers) connected to a specific torrent, identified by its info hash. Swarms are isolated, peers in one swarm don't communicate with peers in other swarms.

Beyond piece selection, clients also manage who they upload to using a strategy called tit-for-tat. Your client doesn't upload to everyone at once. Instead it unchokes (uploads to) only the peers who are uploading to you the fastest while choking (refusing to upload) the rest. Each peer unchokes only 4 peers at a time (default). The selection is based on current download rates from those peers (20-second average). It's re-evaluated every 10 seconds (not more frequently due to TCP slow-start). There is also optimistic unchoking, every 30 seconds your client randomly unchokes one additional peer to discover a potentially faster connection.

This matters because those who upload more get unchoked by more peers and as a result get to download faster. If you upload nothing everyone chokes you and you get slow downloads. This still has limitations. There is no cross-torrent memory meaning your reputation doesn't follow you since each swarm is isolated. It's mostly effective on rare or dying torrents with a few peers and not as effective on popular torrents with many seeders. Complete seeders often unchoke everyone since they have nothing to download, meaning no tit-for-tat.

Alongside the .torrent files there are also magnet links. A more compact and stripped down version of a torrent file with just the info hash and optionally a display name and tracker URLs. This is the structure of a magnet link:
```
magnet:?xt=urn:btih:INFO_HASH&dn=display_name&tr=tracker_url
```

A magnet link works the same way as a .torrent file just that prior to starting the download the client has to ask peers via DHT and/or trackers for the metadata so it knows how to build the files you download. This approach has both advantages and disadvantages.

**Advantages:**

- More convenient. Just copy and paste text, no downloads needed
- No file hosting needed (just share a text link)

**Disadvantages:**

- Slower to start (Needs to fetch metadata first)
- Can't even see file contents without connecting to peers
- If the torrent is completely dead (zero peers), you can't get the metadata at all
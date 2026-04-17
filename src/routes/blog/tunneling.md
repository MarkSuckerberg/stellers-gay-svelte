---
title: My Times with Tunneling
date: 2025-2-17

summary: I explain the part of my server setup I hate most, the fact it's behind a NAT and I have to use tunneling to bypass it.

tags:
  - computers
  - hosting
---

So, like I promised, I wanted to talk about how horrible my current setup is. By setup, I mean how I have my webserver hosted, and such.

The biggest problem is that my server is currently behind a NAT and doesn't have a public facing IP address. This is a pretty big problem, since without a public IP, none of the services on it can be accessed externally. This kind of defeats the purpose of having a server in the first place, because if it's inaccessible, it's not going to be doing a lot of serving.

So, tunnels. First I used cloudflare tunnels, with their new zero trust thing. They were alright, but prone to being unreliable and quite limited. Plus I found out that my usecase might not have entirely been allowed, so I switched off of it to SSH tunnels instead. I have a small VPS with a public IP address on a box I share with another project I help run, I tunnel from a box in my server's subnet, and I forward traffic from a certain range of ports to basically a pseudo-NAT of tunnel definitions. It's not pretty and it's not terribly fast, but it does the job.

At this point, I really should just switch to renting a dedicated server or bunch of VPSes on the cloud, but I don't want to let go of the hardware aspect of it all. I just love hosting my own stuff on hardware I can physically see, and in many cases, I physically put together or at least upgraded.

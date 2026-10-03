---
title: Droning on and on
date: 2026-9-28 10:52 AM CDT
updaated: 2026-10-2 12:21 PM CDT

summary: Time for another project, yay! This time I'm making a drone because "well surely it wouldn't be too hard" (famous last words)

imageUrl: /blogimg/drone1.webp

tags:
  - computers
  - projects
---

Welcome back, good to see you, how the time flies, and all that. I let a few months slip by without an update, oops. I've had a few things cooking in the duration, but my latest project that may or may not be going anywhere is a drone. One of those flying things. As with all great projects, it stemmed from simply seeing some dirt cheap brushless motors on a shopping site and then impulse buying them. My college thesis involved drones so I figured that this would be at least somewhat in my wheelhouse. I'll admit I still have some faith, but of course, the non-obvious things are what is actually giving me the most trouble.

![^An early prototype of my drone, when I first got the motors working. Disregard the crickets.](/blogimg/drone.mp4 'drone > controls')

So, like I said, it all started with those brushless motors. And of course some Electronic Speed Controllers (ESCs) to actually interface them with my microcontroller of choice. Since I FINALLY have my 3D printer (mostly) working again, I figured I'd just design and print a chassis for it. I had been wanting to learn CAD software so I could design my own prints, and I poured some time into learning [FreeCAD](https://freecad.org). I enjoy the heck out of defining things by measurement constraints rather than more or less just freehanding everything. Obviously this means there's not a chance in hell I'd be able to do anything organically shaped, but I'm fine with that.

![3D model of a drone chassis that has an X shape with raised areas on each end where there are three-holed motor mounts.]([/blogimg/dronemodel1.png] 'dronemodel1 > width=48%')
![3D model of a drone chassis that has an X shape with raised areas on each end where there are three-holed motor mounts.]([/blogimg/dronemodel2.png] 'dronemodel2 > width=48%')

As you can see, it's definitely nothing complicated thus far. This is actually the fourth iteration of the model, after adding the surprisingly useful directional arrow, slots for the motor cables, adding indents for the screws so they screw in fully flush, areas to stick the legs into, along with making the motor mounts higher. It's been an iterative process, but I feel like I'm getting closer and closer to what I want. I need to design something to carry the actual electronics, as even still I just have them either rubber banded or zip tied to the bottom of the chassis, which isn't super stable. And, well, stability is somewhat important when that's where the IMU is.

So, for those electronics, I originally started with just one of the wemos D1 minis, the dirt cheap ESP8266 dev boards that don't really have a lot to them, and eventually planned to have a split system where I'd have the D1 as the flight controller and then have an ESP32-cam control communications as well as be a camera for taking photos in flight, but I eventually settled down to using my raspberry pi pico RP2040 board for handling everything for now. Mainly because it just has more pins than any other board I have at the moment (and it's just been sitting around for ages not doing anything since I hate having to work with micro-USB). Though, at [a friend's](https://transfur.science/f191/) insistence, I bought some entry-level STM32F103C8s which have enough pins as well. I may switch to one of those when they get here. Originally I had everything on a breadboard, but for more space efficiency, I switched to a perfboard. On said perfboard, I have all the devices I could want, including:

- 1x RP2040 Pi Pico MCU
- 1x MPU6050 Inertial Measurement Unit (cyan box)
- 1x QMC5883P Magnetometer (even though it was sold as a QMC5883L, and the silkscreen claims it to be an HMC5883L) (dark blue box)
- 1x BMP280 Environmental sensor, for pressure readings (altitude) as well as ideally temperature measurements while high in the air
- 1x AGM336H GPS module (green box)
- 1x CC1101 Transceiver (red box)
- 1x LM2596S buck converter (for stepping down the 6.7-8.4v battery voltage to a usable 5.15v for the RP2040 MCU which is apparently quite picky) (magenta box)

![Perfboard with various components and wires soldered on with coloured boxes added over certain components]([/blogimg/dronemarkup.webp] 'drone1 > width=48%')
![Perfboard with various components soldered on, focusing on the Pi Pico microcontroller at the center]([/blogimg/drone2.webp] 'drone2 > width=48%')
_Ignore the patch resistors. Apparently the pi pico's internal pull-up resistors were not enough to allow the jumble of I2C devices I'm using to work reliably. I have since more securely soldered them in._

I additionally have the battery linked to an Analog to Digital Converter (ADC) pin on the pico with a 3x resistor divider, so that the 6.7v-8.4v gets reduced to 2.2v-2.8v which is safe for the board. This gives me a voltage readout so I at least somewhat know the remaining battery percentage. I was tempted to buy a hall effect current sensor to know even more information on the power usage since I just love to see numbers, but I figured I should probably try to get this thing... actually flying first. I do want to note that at this point this thing has only flown about two feet in a deep plunging arc directly into, luckily, grass.

The main reason for this is honestly the battery situation. So, one of my 3.7v LiPo batteries is not enough to power the motors, which need at least 5v. But two of them together both are too much for my current MCU and would need to be balanced. I don't currently have a balancing LiPo charge controller, but I have one on the way. That combined with the buck converter I now have should be enough to try to fly the thing without having a cable attached, which has been a big issue. Up until now I've been powering the motors via a heavy 130W max USB-C charger cable, which _DOES_ work, but... as mentioned, it's really heavy and throws off any chance of stabilization. So, talons crossed that once I have the charge controller, I'll be able to safely have the drone be free of attachments and ready to fly. The stabilization is definitely in dire need of tuning, which will likely be the first thing I do once I have it capable of flight.

And that's not even touching upon all the work I've done with telemetry, and the problems I've had with that. I've implemented a large subset of the [Mavlink 2 Common Message Set](https://mavlink.io/en/messages/common.html) using the fastmav library, which has honestly been a lot of fun. This is truthfully the first time I've written everything in C(++) rather than only transitioning to it after doing a micropython prototype. Re-getting used to what is and isn't passed by reference, how to handle pointers, and all of that has been an experience now that I've been using languages where that's all mostly abstracted away for so long.

But, indeed. I have a large subset of the commands set up, allowing me to see the precise location and status of the drone based on the sensors it has. I'll admit this currently ALSO requires a wired connection, as one of the two CC1101 transceivers I bought was annoyingly dead on arrival. But once another one ships, I'll be able to connect to the drone wirelessly (If this one ends up a dud too somehow, or doesn't work to my liking, my fallback plan is to readd the ESP32-cam and use it as a UDP mavlink router that connects to a wi-fi network instead. Which is not optimal, but hey).

Anyways, this has gone on long enough. I might write another quick post on the short adventures I had with SSTV while getting the transceiver set up. Maybe look forward to that.

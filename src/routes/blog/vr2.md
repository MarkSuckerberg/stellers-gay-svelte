---
title: Coding the Headset (VR Pt. 2)
date: 2026-6-1 12:30 PM CDT

imageUrl: /blogimg/markulusgrift1.webp

tags:
  - computers
  - vr
  - projects
---

So where'd I leave off?

The google cardboard setup just wasn't enough for me. It had been enough to
make it feel a lot more possible to me, but with the jitteriness, I can't
say that it was a pleasant experience. So, I moved on with the directions
that were provided by the two projects I linked in the previous blog post on
this. Like I mentioned there as well, I tried and failed to 3D print the cases.
So, I just took my phone out of the cardboard case, and started frankensteining
it into being a "proper" VR HMD. The first issue was that the screen I bought
was exceedingly fragile. It was super thin, and used ribbon cables heavily.
I wanted to at least print a little shell for the screen and its controller
boards, but even this proved to be too much. So... I just made a new, slightly
bigger cardboard headset, padded it thoroughly, and held it together with rubber
bands.

![Google-cardboard reminiscent DIY VR headset with an added head strap and a breadboard attached to the top with a rubber band](/blogimg/markulusgrift1.webp)

## Orientation

Now, this was good and all, but I had no way of tracking orientation or position.
Orientation was the "easy" part. Again, talked more about it in the last post.
But, the open-source drivers used arduinos instead of pi picos. Now, I likely
could have just run the arduino code on the pico, but I wanted to both know
what was actually happening, as well as actually be able to improve it or at
least tailor it to my needs. So, I used micropython. I know using C(++) would
likely have been a better choice, and I might rewrite it someday, but I knew
micropython and just wanted to prototype things.

At first, I tried to just directly translate things from the arduino code, but
I didn't really like how it was done. So, instead of just being a bare minimum
USB HID device that didn't really say what it was, I went all out into making
sure that it reported it was an accelerometer and gyrometer, using accurate
units and everything. Then, I learned that the driver didn't care about that at
all really and just read directly from the raw HID device. So, well, that was
mostly fruitless, but at least the microcontroller board would function properly
for the very few uses USB HID accelerometers/gyrometers have.

Next, I had the problem of the values being a bit all over the place. I borrowed
an implementation for calibration from the [FastIMU](https://github.com/LiquidCGS/FastIMU/blob/main/src/F_MPU6050.cpp)
library, which helped a lot to account for drift. I had a fair few modifications
to automatically determine which direction was down to account for gravity,
display the current orientation on a little screen atop the board, and then
finally to accept input from two separate IMUs and average them out to try and
eliminate a _little_ bit of noise. All in all, I truthfully think the orientation
side of things turned out great, though I still would like to get an IMU that has
a magnetometer so that I can account for drift.

So, I had orientation values being read by the pi pico over I2C, and then read by
the computer via USB. Now, what was I going to do with this data? So, first, I
simply redid the OpenVR driver included with HadesVR, switching values to better
suit my headset, (guesstimated the values using the old abandoned [google cardboard profile generator](https://wwgc.firebaseapp.com/)
, using real values where I could) but this ended up being frustrating, complicated,
and ultimately non-functional for all the features I wanted to have. I eventually
gave up on this, trying to write a OpenVR driver from the ground up, but this also
ended up being janky, and the fact that OpenVR isn't actually open-source also threw
some wrenches into the works. So, finally, I settled on making a driver with [Monado](https://monado.dev/).
This turned out to be the best course of action as it was fully open-source, and
outright could compile a SteamVR driver. I pushed [my attempts at a driver here](https://git.stellers.gay/mark/monado),
with [my specific driver files here](https://git.stellers.gay/mark/monado/src/branch/mark/src/xrt/drivers/mark).

One of my main issues is my tendency towards perfectionism and endless refactoring,
so I will warn you that the code found there (at least as of writing) is extremely
rough and quickly thrown together. Let alone the fact I'm not a huge fan of C(++) and
haven't done a lot of it in a long while. You've been warned.

I quickly threw together something based on the daydream and android drivers provided
with Monado, connecting to my Pi Pico as a USB HID using the legacy prober. I then
read the accelerometer/gyrometer measurements into an IMU sensor fusion helper, then
get the orientation that said helper derives for me and use that to set the headset's
orientation. This honestly worked better than I thought, it refreshes fast enough for
me at least.

## Position

I think I'll go into more detail on the position tracking method in another post, but
I'll at least say the basics I started with: I quite literally took a wiimote, stuck it
atop my monitor, took another and hung it from the ceiling (exposed pipes and conduits
ftw), and then used one for X/Y and the other for X/Z. I use a different method for it
now, but I might switch back to this method since it seemed to honestly work fairly well.
I connected the wiimotes via bluetooth, and then used [xwiimote](https://xwiimote.github.io/xwiimote/api/index.html)
to read the IR sensor events to get the X/Y position of an infrared LED that I attached
to the top of my headset. At some point I need to get a ping-pong ball or something that
diffuses the IR light to all directions so it can be tracked more consistently from different
angles, which is currently an issue.

Otherwise, that's it for now. Apologies it took so long, as I discussed in [another post](/blog/rant)
I ran into some difficulties along the way, but I'm doing a bit better now. Anyways, until
next time!

---
title: SSTV and SDR
date: 2026-10-2 12:45 PM CDT

summary: I fiddle around with the airwaves and send birds.

imageUrl: /blogimg/sstv1.png

tags:
  - projects
---

So as promised, my brief foray into SSTV broadcasting. As I mentioned in [the previous post](/blog/drone), I had gotten a CC1101 transceiver for controlling my drone, and while looking into libraries to operate it with (which was rather difficult, surprisingly), I found that [RadioLib](https://github.com/jgromes/RadioLib) supported the transceiver and furthermore, could do SSTV. I figured that it would be a fun thing to mess around with while I waited for a third CC1101 to arrive (since as mentioned, the second one I bought intending to use for a base station was dead on arrival).

Truth be told, it wasn't super hard. I just adjusted the [RadioLib SSTV example](https://github.com/jgromes/RadioLib/blob/master/examples/SSTV/SSTV_Transmit/SSTV_Transmit.ino) to work with my CC1101, and then used [GIMP](https://www.gimp.org/)'s little known (or at least I don't think it's well-known) ability to save an image as a C header file or C++ source code file. That worked well at first, but it was a little annoying to deal with so instead I wrote a quick python program using PIL to do basically the same work. It just converts an image to palette mode with 256 colors (the max I can store in a unsigned char's worth of palette entries) and then downscales to the seemingly typical SSTV resolution of 320x256. It's a little crunchy, but honestly, that's part of why it's so cool to me. I then save the palette as an array of ints (they only really need 24 bits but optimizing that is left as an exercise to the reader) to the program memory to save space in RAM, and then output the long array of pixels (which are just `char`s since, well, it's palettized) to PROGMEM as well.

```python
from PIL import Image

img = Image.open("input.png")
img = img.quantize(256)
img = img.resize((320, 256))
img.save("output.png")

with open("output.h", "w+") as out:
    # Includes and defines
    out.write(f"#include <Arduino.h>\n\n")

    out.write(
        "#define GET_PIXEL(offset) (palette[pgm_read_byte_near(header_data + offset)])\n\n"
    )

    out.write(f"const static unsigned short width = {img.width};\n")
    out.write(f"const static unsigned short height = {img.height};\n")
    out.write(f"const static unsigned int pixels = {img.height * img.width};\n")

    out.write(
        "#define GET_PIXEL(offset) (palette[pgm_read_byte_near((header_data + offset) % pixels)])\n\n"
    )

    if img.palette == None:
        quit()
    out.write(f"const static unsigned int palette[{len(img.palette.colors)}] = {{\n")
    for color in img.palette.colors:
        value = (color[0] << 16) | (color[1] << 8) | (color[2])

        out.write(f"\t{hex(value)},\n")

    out.write("};\n\n")

    imageData = list(img.get_flattened_data())
    out.write(
        f"const static PROGMEM unsigned char image_data[{len(imageData)}] = {{\n\t"
    )

    for [idx, pixel] in enumerate(imageData):
        out.write(f"{pixel}, ")
        if (idx + 1) % 10 == 0:
            out.write("\n\t")

    out.write("};\n\r")
```

Then, I basically read each line of pixels into a buffer at runtime, and then send that off to RadioLib to handle. It works pretty well! It was a headache to get everything playing nicely together, but it turned out in the end the SSTV decoders I was using were just not doing that well. I eventually just got [SDROxide](https://github.com/dividebysandwich/sdroxide) which honestly is really cool. Oh, yes, by the way, I wasn't just broadcasting these blindly. I was using my trusty [RTL-SDR blog](https://www.rtl-sdr.com/) SDR to receive it. It worked quite well, actually, provided I was in the same room at least, hah. Honourable mention to [this site](https://sstv-decoder.vercel.app/) which was the first one to actually decode the signal.

And that's pretty much it! Here's the results from my various attempts up until it actually worked.

![Distorted, fuzzy, green-tinted SSTV transmission. An angry cartoony blue jay can be made out.]([/blogimg/sstv1.png] 'sstv1 > width=32%')
![Partial, distorted SSTV transmission showing lots of interference. An angry cartoony blue jay can be made out.]([/blogimg/sstv2.png] 'sstv2 > width=32%')
![An SSTV transmission with minimal interference. An angry cartoony blue jay is featured with text that's rather difficult to read due to being white-on-white, saying, emergency bird transmission in impact font.]([/blogimg/sstv3.png] 'sstv3 > width=32%')

I'll admit I probably should have made the text a little clearer considering that SSTV would make it even harder to distinguish from the background (it reads, "emergency bird transmission" if you're curious), but it was just for a meme and I was eager to start on the actual coding bit.

Anyways, that's all from me for now!

# Sentinel robot

Rough bullet points are fine. Give units for numbers, mark each as measured or designed, and write "unknown" where you don't know.
This file is public once pushed, so add only what you are happy to publish.

## Projects index
- One-line summary: The E3 Sentinel and Scout are a robot duo who monitors the MakerSpace so you don't have to.
- Features: detects smoke and solder fumes; tracks humidity; reacts with animated expressions; buzzes when something's wrong.
- This is V1 built in 2 days. It's only getting better from here.
- Thumbnail photo file name: sentinel-screen-wide.jpg
- Display order (1, 2 or 3): 1

## Overview
- Title: Sentinel robot
- Status: Finished (V1 prototype)
- Dates: November 2026, built in 2 days
- Team: Trinity Robotics team project
- My role: all CAD and manufacturing (design, 3D printing, post-processing) for both robots
- Others involved: other team members did the electronics and software
- Names: Sentinel is the big robot (Raspberry Pi 4 dashboard, 7-inch screen, 22 cm). Scout is the small robot (ESP32-S3, sensors, round face screen, 15 cm). Confirmed by me on 27 Nov 2026.

## What it does
- Scout (small robot): ESP32-S3 brain, DHT20 temperature and humidity sensor, air sensor (CO2, TVOC, HCHO), 1.28-inch round touch screen as the face, USB-C 5 V power. Sends data over Wi-Fi.
- Sentinel (big robot): Raspberry Pi 4 runs the dashboard on a 7-inch screen with graphs and alerts.
- Links: https://www.waveshare.com/1.28inch-touch-lcd.htm , https://www.waveshare.com/wiki/7inch_HDMI_LCD_(C) , Raspberry Pi 4 Model B datasheet.

## Goal and requirements or constraints
- The MakerSpace has heavy machinery (soldering stations, laser cutter, 3D printers). Good to track that the MakerSpace is safe.
- 2 days was a huge constraint.
- Use filament economically: body cut into 3-4 parts to reduce supports.

## Design decisions (what, and why)
- I did all parts of both robots in CAD (SolidWorks).
- Small robot: connections and mounts for the electronics and the small round screen.
- Big robot: dedicated mounts for the big screen and a cover for the screen.
- Screens held by screws and mounts; other electronics lie loose inside the body (V1).
- Holes for ventilation (true sensor readings) and sound output.

## Build
- Printer: Bambu Lab A1
- Material: white and black PLA
- Small robot: printed on 4 printers separately; about 5 h in total on one printer.
- Big robot: 3 parts; about 15 h in total.
- Post-processing: some parts sanded to fit.
- Software: SolidWorks, Bambu Lab slicer

## Specs (value, unit, measured or designed)
- Sentinel (big robot): 22 cm tall
- Scout (small robot): 15 cm tall
- Screens: 7-inch HDMI LCD (C); 1.28-inch round touch LCD
- Air-quality sensor model: later

## Testing and results
- V1 prototype; works and tracks all the data correctly.
- At the stand, people guessed the build time from 2 weeks to 5 years.

## Problems and how I fixed them
- Bambu Lab A1 accuracy wasn't enough for the small electronics: some electronics didn't fit, and slots joining body parts didn't fit well. Sanded some parts down.

## What I would change (version 2, not started)
- Also track the number of people in the MakerSpace.
- Mount the big robot on the wall.
- Improve ventilation of the small robot so nothing interferes with the data.

## Photos, CAD renders and drawings (file name: what it shows)
- sentinel-stand.jpg: both robots at the Trinity Robotics stand (cover; bystanders blurred)
- sentinel-dashboard.jpg: Sentinel's screen close-up
- sentinel-screen-wide.jpg: wide crop of the screen (home page card)
- scout.jpg: Scout in hand, before the face screen was fitted
- cad-sensor-robot-front.jpg, cad-sensor-robot-base.jpg, cad-sensor-robot-sections.jpg: SolidWorks renders of Scout
- cad-dashboard-robot-front.jpg, cad-dashboard-robot-back.jpg, cad-screen-mount-detail.jpg: SolidWorks renders of Sentinel
- System plan sketch: kept private, not on the site

## Links to code, CAD or video (optional)
-

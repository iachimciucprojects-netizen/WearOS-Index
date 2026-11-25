# WearOS Index

A community-maintained index of **Wear OS wearables from any brand**, from current devices to historical Android Wear. Find devices, track updates and public source code, and share reproducible compatibility results.

**Web:** [Compare watches](https://iachimciucprojects-netizen.github.io/WearOS-Index/) · [English guide](https://iachimciucprojects-netizen.github.io/WearOS-Index/guide/en/) · [Инструкция](https://iachimciucprojects-netizen.github.io/WearOS-Index/guide/ru/) · [Ghid în română](https://iachimciucprojects-netizen.github.io/WearOS-Index/guide/ro/)

**Start here:** [Device directory](devices/README.md) · [Suggest a device](https://github.com/iachimciucprojects-netizen/WearOS-Index/issues/new?template=device.yml) · [Report a result](https://github.com/iachimciucprojects-netizen/WearOS-Index/issues/new?template=compatibility.yml) · [Contributing](CONTRIBUTING.md)

## Devices and updates

[Browse 54 model and variant entries across 17 manufacturers](devices/README.md), including Google Pixel Watch, Samsung Galaxy Watch, OnePlus, OPPO, Xiaomi, Mobvoi, and legacy Android Wear. The [TicWatch Pro 5 profile](devices/ticwatch-pro-5.md) is one detailed example of how evidence is recorded.

- [Wear OS platform release notes](https://developer.android.com/wear/releases/): Google's platform-level changes, not a device rollout tracker.
- [Google's manufacturer help directory](https://support.google.com/wearos/answer/10106605): support and companion-app links; verify the exact model separately.

## Updates and source tracking

See the [manufacturer update and firmware sources](devices/README.md#rollouts-firmware-and-regional-variants). Each device should keep these facts separate: **last vendor announcement**, **newest build actually observed**, **security patch date**, and **published source revision**. An unverified field stays blank or marked unknown. The date we checked a source is not the date an update shipped.

## Apps and utilities

| Project | What it does | Evidence |
|---|---|---|
| [WearFiles](https://github.com/dertefter/WearFiles) | Open-source file manager and phone-to-watch file transfer | [TicWatch Pro 5 playback report](devices/ticwatch-pro-5.md#app-compatibility) |
| [WristEyes](https://github.com/iachimciucprojects-netizen/WristEyes) | Local MCP bridge for watch sensors, vibration and messages | [Maintainer-reported TicWatch Pro 5 test](devices/ticwatch-pro-5.md#app-compatibility) |
| [Weavelet](https://github.com/celestialtaha/Weavelet) | Open-source offline music player | Project documentation; no device result recorded here |
| [Cassette](https://github.com/AdamNiederer/cassette) | Local music player for Wear OS | Project documentation; no device result recorded here |
| [SimpleWear](https://github.com/SimpleAppProjects/SimpleWear) | Control actions on a paired Android phone from your watch | Project documentation; check phone-side requirements |
| [dnd-sync](https://github.com/rhaeus/dnd-sync) | Sync Do Not Disturb between phone and watch | Project documentation; check platform requirements |

For a broader link collection, see [Awesome Wear OS](https://github.com/WearOSCommunity/awesome-wear-os). This index focuses on exact models, versions, and reproducible results.

## Build for Wear OS

| Resource | Use it for |
|---|---|
| [Android Developers: Wear OS](https://developer.android.com/training/wearables) | Start here for setup and platform guidance |
| [Android Wear OS samples](https://github.com/android/wear-os-samples) | Runnable examples for apps and watch faces |
| [Horologist](https://github.com/google/horologist) | Google libraries and examples for common watch app needs |
| [Wear OS user interfaces](https://developer.android.com/training/wearables/user-interfaces) | Choose between an app, complication, or other short interaction |
| [Tiles](https://developer.android.com/training/wearables/tiles) | Glanceable surfaces from the watch face |
| [Complications](https://developer.android.com/training/wearables/complications) | Small pieces of app data shown on a watch face |
| [Watch Face Format release notes](https://developer.android.com/training/wearables/wff/release-notes) | Find format features and version changes |
| [Phone/watch Data Layer sample](https://github.com/android/wear-os-samples/tree/main/DataLayer) | Exchange data between a Wear OS app and its Android companion |
| [Health Services: active data](https://developer.android.com/health-and-fitness/health-services/active-data) | Track workouts using ExerciseClient |
| [Wireless debugging](https://developer.android.com/training/wearables/get-started/debug-wifi) | Pair ADB and run builds on a watch |
| [Wear OS app quality](https://developer.android.com/docs/quality-guidelines/wear-app-quality) | Check your app against Play quality and publishing requirements |

## Firmware and alternative operating systems

- **Stock OTA** updates an existing installation. It is not necessarily a full factory restore image.
- **Recovery image** should only be marked verified for the exact hardware and build with a documented successful restore.
- **Experimental port** is not official support. Check what works, what is unknown, and how to return to stock before considering installation.
- [AsteroidOS supported watches](https://asteroidos.org/watches/) · [TicWatch Pro 5 experimental port](https://github.com/AsteroidOS/meta-smartwatch/pull/351). See the [device notes](devices/ticwatch-pro-5.md#firmware-and-rollback) for limitations. This repository does not host firmware.

## How to read the evidence

**Official** = Google or the watch vendor documents it. **Maintainer-reported** = a project maintainer says they tested it. **Community report** = an identified report from a user, with a link and the model/version when available. **Not verified** = no suitable test is linked. One result is not a guarantee for other builds, models, or regions.

Tested something on a real watch? [Share one result](https://github.com/iachimciucprojects-netizen/WearOS-Index/issues/new?template=compatibility.yml). A failed test with clear steps is as useful as a successful one.

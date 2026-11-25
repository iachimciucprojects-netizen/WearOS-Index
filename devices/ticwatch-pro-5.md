# Mobvoi TicWatch Pro 5

[Back to index](../README.md) · [Report a result](https://github.com/iachimciucprojects-netizen/WearOS-Index/issues/new?template=compatibility.yml)

The original **TicWatch Pro 5** is referred to as `dace` in the AsteroidOS device port. This page does **not** assume that a firmware or test result for the Pro 5 applies to the Pro 5 Enduro or another Pro model. Sources reviewed November 25, 2026.

## Stock software and displays

| Item | Evidence |
|---|---|
| Watch and displays | [Mobvoi product page](https://www.mobvoi.com/uk/products/ticwatchpro5): AMOLED plus a separate ultra-low-power display. |
| Wear OS 4 | [Mobvoi update announcement](https://www.mobvoi.com/ge/blog/Wear-OS-4-Upgrade-and-Enhanced-Functionality-for-TicWatch-Pro-5-Series?_id=66d6bfb9a743410012e83485) confirms the rollout. [Google platform docs](https://developer.android.com/training/wearables/versions/4/changes) identify Android 13 / API 33. Compare the watch's actual build with [Mobvoi upgrade history](https://www.mobvoi.com/uk/pages/upgrade-history). |
| Secondary display | Mobvoi documents certain workout metrics for supported scenarios in its update announcement. No public API allowing arbitrary third-party graphics or a custom timer on the secondary display is verified here. |

## Updates and source code

| Track | What is established | Source |
|---|---|---|
| Official OS upgrade | Mobvoi announced the rollout of Wear OS 4 for Pro 5 and Pro 5 Enduro. That does not establish the newest build or the security patch level for every Pro 5. | [Mobvoi announcement](https://www.mobvoi.com/ge/blog/Wear-OS-4-Upgrade-and-Enhanced-Functionality-for-TicWatch-Pro-5-Series?_id=66d6bfb9a743410012e83485) |
| Newest stock build and security patch | Not verified for the original Pro 5. Do not copy a build number reported for the Atlas or the Enduro to this row. | [Mobvoi upgrade history](https://www2.mobvoi.com/uk/pages/upgrade-history) · [Submit what your watch shows](https://github.com/iachimciucprojects-netizen/WearOS-Index/issues/new?template=compatibility.yml) |
| Android base | Google's Wear OS 4 docs identify Android 13 / API 33. AOSP source is available; it is not the complete factory Wear OS code for this watch. The reference tag below is an Android 13 example, not an assertion that it matches the firmware build. | [Google Wear OS 4 docs](https://developer.android.com/training/wearables/versions/4/changes) · [AOSP Android 13 reference tag](https://android.googlesource.com/platform/manifest/+/refs/tags/android-13.0.0_r1) |
| Mobvoi kernel | Public vendor tree for the related device family; not verified as the exact shipping kernel for this model and build. | [Mobvoi `uranus_kernel` snapshot](https://github.com/mobvoi/mobvoi-ticwatch-kernel/tree/da697a45773beb39e1d28ffaf4de8f1f523e7f09) · [Community source comparison](https://github.com/AsteroidOS/meta-smartwatch/issues/229) |
| AsteroidOS device layer | Separate community port. This is the PR head observed on November 25, 2026, not an official release; some vendor components are prebuilt. | [Pinned `meta-dace` source](https://github.com/cristodcgomez/meta-smartwatch/tree/604e5ed07f2c7e325c379166f7982604dcb3b56d/meta-dace) · [Upstream PR](https://github.com/AsteroidOS/meta-smartwatch/pull/351) |

**Easy contribution:** on the watch, open **Settings → System → About** and record the exact model, Wear OS version, build number, Android security patch date, and date observed. If a new update is offered, record the offered build separately from the installed one. No update, ADB, or flashing is required to submit an observation. Crop out serial numbers, accounts, and QR codes.

## App compatibility

| App | Watch and software | Observed result | Evidence |
|---|---|---|---|
| [WristEyes v0.3.0](https://github.com/iachimciucprojects-netizen/WristEyes/releases/tag/v0.3.0) | TicWatch Pro 5 / Wear OS 4; OS build not recorded | The project reports testing on this model. A release APK is available; an independent fresh install and full MCP run are not recorded. | [Maintainer README](https://github.com/iachimciucprojects-netizen/WristEyes/blob/v0.3.0/README.md) |
| WearFiles 3.3.0 | TicWatch Pro 5 / Wear OS 4; OS build not recorded | Local audio and video did not open from the file list in one report. The maintainer confirmed WearFiles does not play audio on its own and requires a separate player. No verdict on video or every external player. | [User report and maintainer reply](https://github.com/dertefter/WearFiles/issues/21) |
| [Fyn Music Player](https://play.google.com/store/apps/details?id=com.kk.fynmusicplayer) | Exact device and Play region not tested here | Candidate for local MP3s. Open the player itself, grant media access and test one short MP3 already on the watch. | Store listing only; share a result if tested. |

## Firmware and rollback

[AsteroidOS PR #351](https://github.com/AsteroidOS/meta-smartwatch/pull/351) is an **experimental port**, not a supported release. The author reports boot, main screen and touch, Bluetooth, crown, and USB/ADB. Operation of the separate low-power LCD is not confirmed. The port's device layer includes some stock vendor binaries.

- This index has not verified a ready-to-install build or a reliable full rollback to stock for this exact watch.
- [Official AsteroidOS device list](https://asteroidos.org/watches/): use this to distinguish released support from an open pull request.
- A vendor OTA is not proof of a complete factory recovery path. Keep stock Wear OS on your primary watch if dependable recovery is not established.

## Good first checks to contribute

1. Try a local MP3 from the player itself; note model, Wear OS build, player version and whether Bluetooth output worked.
2. Try a clean WristEyes installation and one local MCP vibration; do not publish a token or local network address.
3. Observe a supported workout with the AMOLED asleep and note which metrics, if any, appear on the secondary LCD.

# Mobvoi TicWatch Pro 5

[Back to index](../README.md) · [Report a result](https://github.com/iachimciucprojects-netizen/WearOS-Index/issues/new?template=compatibility.yml)

The original **TicWatch Pro 5** is referred to as `dace` in the AsteroidOS device port. This page does **not** assume that a firmware or test result for the Pro 5 applies to the Pro 5 Enduro or another Pro model. Sources reviewed November 25, 2026.

## Stock software and displays

| Item | Evidence |
|---|---|
| Watch and displays | [Mobvoi product page](https://www.mobvoi.com/uk/products/ticwatchpro5): AMOLED plus a separate ultra-low-power display. |
| Wear OS 4 | [Mobvoi update announcement](https://www.mobvoi.com/ge/blog/Wear-OS-4-Upgrade-and-Enhanced-Functionality-for-TicWatch-Pro-5-Series?_id=66d6bfb9a743410012e83485) confirms the rollout. [Google platform docs](https://developer.android.com/training/wearables/versions/4/changes) identify Android 13 / API 33. Compare the watch's actual build with [Mobvoi upgrade history](https://www.mobvoi.com/uk/pages/upgrade-history). |
| Secondary display | Mobvoi documents certain workout metrics for supported scenarios in its update announcement. No public API allowing arbitrary third-party graphics or a custom timer on the secondary display is verified here. |

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

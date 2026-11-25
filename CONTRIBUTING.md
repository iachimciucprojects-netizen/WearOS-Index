# Contributing

A useful contribution answers a narrow question someone else can repeat: **what works, on which watch, with which software?**

## Share a result

Use the [compatibility report form](https://github.com/iachimciucprojects-netizen/WearOS-Index/issues/new?template=compatibility.yml) or open a pull request against the appropriate device page. One test per report is ideal. Include:

- Exact model and variant; hardware codename if known.
- Wear OS version and build number; app version and source.
- What you did, what you expected and what happened.
- Test date and a public source if available. Include phone model/OS or region only if it matters.
- Mark it **works**, **partially works**, or **does not work**. Write **not tested** for unknown features; do not infer support on related watches.

## Pick a first contribution

- **Five minutes, no coding:** copy the model, Wear OS version, build and patch date from your watch's About screen into a report. It is fine if no update is offered.
- **One small test:** try one app feature and report what happened. Examples: whether an MP3 already on the watch plays over Bluetooth, or whether Workout displays a metric on the secondary LCD.
- **One source link:** send an official update note for an exact model, or open a pull request to add it. Include the announcement date and the build ID if the source provides one.

There is no need for repository access. Use an issue for observations or a fork and pull request for edits. Maintainers can add the result with attribution, or omit your name if requested. Separate confirmed observations from assumptions about related devices.

## Add an app, device or firmware entry

Use the primary link (official docs, store listing or upstream repository), describe the specific use in one sentence, and say whether compatibility is documented or tested. Record a broken link or stale claim rather than silently removing mixed results.

Firmware entries must distinguish OTA, full recovery and experimental ports; state the exact target, known limits and rollback evidence. Do not add mirrors of vendor binaries, unverified downloads, or unlock/flash instructions without a reliable reference. Publishing a link does not mean the project endorses installing it.

Please remove serial numbers, tokens, local addresses and account information from screenshots or logs. No promotional rankings or referral links.

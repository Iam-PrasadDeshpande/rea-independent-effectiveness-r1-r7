# R5 original application runtime validation

PASS_WITH_GAPS: real Fossify Calendar 1.12.0 APK installed and exercised on an isolated fresh AVD using synthetic events only.

## Isolation and environment
- Existing SDK emulator37.1.11.0; Android37.0 Google APIs x86_64 image revision6; WHPX acceleration. No SDK download or global configuration change.
- Fresh R5Synthetic AVD under R5/emulator/avd. ANDROID_USER_HOME, ANDROID_EMULATOR_HOME and ANDROID_AVD_HOME redirected process-locally within R5/emulator.
- Own adb server5045, explicit serial emulator-5580, emulator port5580. Never addressed host default adb or another device.
- WiFi and mobile data disabled inside the AVD before application launch. No account sign-in, owner's phone, personal calendar or production connection used.
- Own emulator and own adb server stopped after evidence capture. AVD disk retained as synthetic evidence.

## Observed real APK behavior
1. APK installed successfully; package org.fossify.calendar, version1.12.0(23).
2. Created title R5_SYNTH_WEEKLY, Sunday18October2026 08:00, same start/end time; selected Weekly using actual recurrence dialog. Default10minutes-before reminder retained.
3. Application displayed first-run reminder reliability disclaimer; notification permission explicitly Allowed on the synthetic emulator.
4. Day18 UI displayed R5_SYNTH_WEEKLY. Edit form read back Weekly and10minutes before.
5. Appended _ONE to title and saved. Actual app offered selected-occurrence-only, this-and-future, and all-occurrences scopes. Selected occurrence only.
6. Day18 read back R5_SYNTH_WEEKLY_ONE; day25 read back original R5_SYNTH_WEEKLY. Day25 edit form retained Weekly and10minutes before.
7. Force-stopped/relaunched app. Day18 changed title and day25 original title both persisted. Screenshots visually inspected.
8. Android dumpsys alarm contained real RTC_WAKEUP NotificationReceiver alarms for18October07:50:01 and25October07:50:01 before force-stop, plus DummyAlarmReceiver. This proves scheduling integration in this observed environment, not actual notification delivery.

## Evidence index
- emulator-install.txt; emulator-package-installed.txt
- emulator-repetition.xml/png (Weekly choice); emulator-event-detail.xml/png (Weekly and reminder readback)
- emulator-edit-scope.xml/png; emulator-edited-one.xml/png
- emulator-day25-series-preserved.xml/png; emulator-preserved-reminder.xml/png
- emulator-restart-edited-persists.xml/png; emulator-restart-series-persists.xml/png
- emulator-alarms.txt; emulator-alarms-after-restart.txt
- emulator-accounts.txt; emulator-wifi-disabled.txt; emulator-mobile-data-disabled.txt
- emulator-signing.json; emulator-shutdown.txt; emulator-stdout.log; emulator-stderr.log

## Limitations
- Actual notification arrival, sound, vibration, snooze and boot recovery were not observed; NOTIFICATION_DELIVERY=UNPROVEN.
- This is a bounded synthetic UI workflow, not exhaustive reference validation or reconstructed-APK validation.
- Emulator API37 is newer than APK target36; Android version/vendor variation remains untested.
- First boot took minutes; one premature installation attempt failed because package service was not ready, then signed bounded boot controller installed successfully after sys.boot_completed=1.
- A first tap on the reminder disclaimer text missed its OK button; corrected using captured UI bounds. No app failure inferred.
- Custom Emulator-Control.ps1, Emulator-Install.ps1 and Emulator-UI.ps1 signed using existing approved CurrentUser certificate A98A2B0353CB7C086BEEC23A36FC4095DFB37844, verified Valid and executed AllSigned. No signing keys created/exported and no execution-policy bypass.

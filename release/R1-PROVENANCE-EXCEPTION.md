# G1 — R1 original launcher continuity exception

As of 18 October 2026, original `Run-BlindArm.ps1` is retained at evidence://R1/Run-BlindArm.ps1.

Expected frozen SHA-256: `02F620E5B3B2F49A444AEFD1EF2ED37405E46823F5125274065BB05779942B87`.

Observed current SHA-256: `963902a0c17ff1d9716549841dbfcf77b84330ea06d3dfbc05968cdf1cac0527`.

The current Authenticode signature validates under the historical approved identity. Original launcher recovery is described by the historical report. Existing records do not establish an authenticated exact before/after byte and execution amendment chain; a current signature does not prove which earlier bytes ran. The historical eight-case A/C TAP receipts remain supported as receipts. No B arm existed. Original files and expected digests were not changed.

Disposition: UNRESOLVED_HISTORICAL_CONTINUITY; QUALIFIED_PUBLIC_DESCRIPTION_ONLY; FINAL_FREEZE_HOLD. This newly signed exception attests to the current audit description, not retrospective owner acceptance or repaired experiment provenance. Owner acceptance remains pending.
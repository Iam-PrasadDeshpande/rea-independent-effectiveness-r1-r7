# Frozen-protocol candidate: REA native effectiveness R2

This document becomes frozen only when `evidence/experiment-freeze-manifest.json` is written, before any investigator starts. R1 remains read-only. No investigator has participated in protocol, reference, oracle or rubric preparation.

## Question and controlled workload

Does REA add measurable value to Codex beyond direct Ghidra for reconstructing the GS1-128 validation/encoding feature in the same stripped real native executable? One matched triple is exploratory evidence, not statistical proof or an enterprise productivity estimate.

The real Zint 2.16.0 source is pinned at `55541e139e62b9209b71cd9b0ba9010cec28b1d9`. The actual native CLI was built with GCC 15.2.0, CMake 3.31.8 and Ninja 1.13.1, Release optimization, static Zint library, frontend on, Qt/PNG/external GS1 Syntax Engine off and vendor tests on. The investigator executable is stripped with GNU strip. Its SHA-256 is `08af4075a1fd8b2fff65967435512582afbb52f2daf4a7971f025a888eff7ad4`. The unstripped executable, source, build configuration, license and all 60 passing offline CTest suites remain evaluator-only.

REA is built from owner-pinned `742b6f587f3c4ef1b8212e7376d6f3a305b194dc` (6.5.0). Both native analysis arms use the same Ghidra 12.1.4 distribution and JDK 21.0.11+10. Exact archive digests, local runtime digests, signatures and gate records are retained under `evidence/`. The native ELF smoke gate uses system `true`, explicitly distinct from the Zint reference.

## Arms, order and resource contract

- A: fresh Codex, ordinary approved inspection CLIs, no Ghidra or REA.
- B: fresh Codex, same CLIs plus direct Ghidra read-only API inspection/decompilation. The thin compiled Java application is not a GhidraScript and contains no Zint knowledge, target execution, network or save API. It opens the analyzed Program with `getReadOnlyDomainObject`.
- C: fresh Codex, same CLIs plus the pinned REA MCP/Ghidra provider and retained-evidence inspection; direct Ghidra access is unavailable through its CLI adapter.

Run A, B and C sequentially. Use `gpt-6.1-sol`, low reasoning, the same common prompt, public examples and reconstruction interface. No previous conversation, oracle, source, peer output, user skills, browser, external connectors or multi-agent tools are supplied. Disable built-in shell/code execution; approved CLIs are invoked by literal argv through the same signed Windows controller in every arm. Native Ghidra uses a configured 1 GiB heap; requested analysis concurrency and actual settings are retained. Observe and disclose host load/resource contention rather than assuming exclusivity.

Each valid attempt has the same 30 model tool-call ceiling and 1,200-second wall ceiling. The controller also has a local 35-call safety ceiling. The coordinator supervises actual event counts and includes investigator tool calls in the shared remaining-action audit. The prompt requests completion before the ceiling. Quota exhaustion is a task outcome; tool unavailability or isolation failure makes an attempt INVALID. Failed attempts and any permitted fresh retry remain in setup/recovery evidence and never become an ordinary baseline in place of the intended treatment.

## Identical visible inputs and executable contract

Every arm receives byte-identical `/artifact/app`, identical system runtime dependencies, a minimal invocation description and the same three public examples. The working output is `/output`. The original target command is `app -b 16 --dump -d DATA`, optionally `--gs1parens` or `--esc`. The controller fixes the symbology and dump mode.

Submit `/output/solution.cpp` and compile `/output/solution`, plus `/output/investigation.md`. The independent C++ reconstruction must accept `-d DATA --dump` with the same two optional flags, print the canonical hexadecimal module pattern on stdout and return the original numeric exit status. Exact diagnostic wording is not scored. Do not delegate to, embed or invoke the original executable, use original source, or treat an approximation as complete. Explicitly identify uncertainty. Native compiler-built artifacts are distinguished from executable scripts.

The source URL, source tree, documentation, debug symbols, hidden cases/oracle and peer findings are withheld. Embedded vendor identity/copyright strings in the unmodified real executable are not removed; prior model knowledge cannot be proven absent. Fresh independent sessions and denied filesystem/network routes are the actual blinding claim.

## Frozen evaluation

The evaluator-only rubric has 40 source-backed facts: 8 focused architecture/pipeline facts and 32 facts across fixed fields, variable fields, normalization, code-set selection, function characters, checksum, errors and output. Full, partial, absent and incorrect are distinct. Evidence traceability is graded separately; identifiers alone do not establish correctness or downstream use.

Forty-eight deterministic hidden CLI cases cover fixed and variable AIs, numeric/mixed code sets, separators, parenthesis/escape normalization and malformed/semantic inputs. The `error_probes` label does not predetermine the original program's result: actual warnings, errors and emitted patterns are retained. No case is removed because the original behaves unexpectedly. The original stripped executable supplies the oracle; two passes must agree. Three public cases are excluded from the hidden denominator.

A full hidden pass requires identical numeric exit status and identical whitespace-normalized uppercase hexadecimal modules. Keep module matches and exit matches as separate columns for partial behavior. Exact canonical-pattern fidelity is stricter than standards-equivalent decoding: a different valid code-set tie-break may still fail exact reconstruction. No scanner/business outcome is inferred from this metric. No image-file bytes are compared.

The evaluator runs submissions without the original executable, source, oracle files or network exposed to their process. The signed Windows evaluator holds expected results outside those mounts. Reports/claims are independently checked against frozen source facts and actual tool events; implementations are compiled and tested independently. The evaluator did not participate in investigator conversations, but this is not an independent human-gold or cross-model benchmark.

## Accounting and disposition

Record model input/output/cached tokens as returned by Codex; cached input is a subset of input and must not be added again. Do not fabricate a dollar price or coordinator token count. Record investigation wall time, tool success/failure, setup, signing, toolchain acquisition, failed transfers, compile repairs, readiness probes and recovery separately. Retain raw logs and hashes. Shared Ghidra/toolchain setup is not silently charged exclusively to REA; REA-exclusive setup is identified separately. API adapter/lifecycle differences and one sequential triple limit causal efficiency claims.

Answer Q1 Ghidra versus CLI, Q2 REA versus direct Ghidra, Q3 traceability, Q4 unsupported conclusions, Q5 efficiency, Q6 operational overhead and Q7 unknowns. No percentage benefit or production-readiness claim is justified by one triple. Report only observed findings and bounded recommendations.

## Authority and signing

All custom orchestration/controller/evaluator scripts run as Authenticode-verified Windows PowerShell with the existing approved `CN=AI-SAP Local Code Signing` identity, thumbprint `A98A2B0353CB7C086BEEC23A36FC4095DFB37844`. Linux work uses direct verified vendor executable invocations and ordinary vendor build machinery. No custom unsigned Linux interpreter scripts, shell heredocs or inline-script workarounds are permitted. The direct Ghidra helper and submitted C++ programs are compiler-built binaries with separate hashes; Authenticode is not claimed to sign Linux files.

Use read-only target/tool mounts, private scratch, explicit logical paths, process limits and network namespaces. No global configuration, permanent PATH, signing identity, SAP/BTP, production, publication, push, merge or destructive cleanup changes are authorized.

Configuration controls were checked against [official Codex configuration documentation](https://developers.openai.com/codex/config-reference) and the actual CLI. Native-filesystem placement follows [Microsoft WSL filesystem guidance](https://learn.microsoft.com/windows/wsl/filesystems), and the extraction timings are separately observed evidence.

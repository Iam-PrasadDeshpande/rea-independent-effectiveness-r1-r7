# Reverse Engineer Anything: seven application studies

![Seven software systems feed inspectable evidence into an AI-agent investigation](publication/assets/REA-LINKEDIN-COVER.png)

**REA demonstrated useful scoped analysis and retained evidence. These studies did not establish a REA-specific functional reconstruction advantage.** This is an independent engineering research portfolio by Prasad Deshpande, evaluated using REA 6.5.0. It is not affiliated with, endorsed by, or a certification of REA or the application maintainers. [Assessment](consolidated/ENTERPRISE-ARCHITECT-VERDICT.md)

Reverse Engineer Anything (REA) exposes specialist software-analysis facilities to AI agents and returns structured, retained observations. This work asked whether adding it helped Codex explain unfamiliar delivered software and reconstruct selected behavior. Seven applications exposed JavaScript, native, Electron, SAP workflow, Android, browser and WebAssembly boundaries. The selection was deliberate and is not statistically representative. [Method](RESEARCH-METHODOLOGY.md)

## Start here

- [Consolidated research report](consolidated/REA-R1-R7-CONSOLIDATED-FINAL-REPORT.md)
- [Independent evidence review](consolidated/REA-R1-R7-INDEPENDENT-REVIEW.md)
- [Capability coverage](consolidated/CAPABILITY-COVERAGE.md) and [effectiveness matrix](consolidated/EFFECTIVENESS-MATRIX.md)
- [Evidence accounting and availability](EVIDENCE-INDEX.md)
- [LinkedIn article](publication/LINKEDIN-ARTICLE.md), [launch post](publication/LINKEDIN-LAUNCH-POST.md) and [cover assets](publication/assets/REA-LINKEDIN-COVER-SOURCE.svg)
- [Release checklist](release/RELEASE-CHECKLIST.md) and [freeze status](consolidated/FREEZE-STATUS.json)

## Recorded outcomes

| Study | Bounded recorded outcome | Qualification |
|---|---|---|
| [R1 SAP GenAI Mail Insights](experiments/R1-sap-genai-mail/README.md) | A/C 8/8 handler cases; no B arm | Launcher provenance exception remains |
| [R2 Zint GS1-128](experiments/R2-zint/README.md) | A/B/C 48/48 exit and module comparisons | Qualified bounded POC; package/source identity caveat |
| [R3 Joplin semantic search](experiments/R3-joplin/README.md) | A/B/C 40/40 deterministic search cases | REA core analysis timed out; peripheral call succeeded |
| [R4 SAP AI160](experiments/R4-sap-ai160/README.md) | A/B/C 12/12 helper cases | Timestamp helper, not complete SAP agent equivalence |
| [R5 Fossify Calendar](experiments/R5-fossify-calendar/README.md) | A/B/C 32/44 scenarios; recurrence projections 44/44 | Twelve reminder-bearing cases missed by all arms |
| [R6 Excalidraw](experiments/R6-excalidraw/README.md) | A 3/36, B 30/36, C 27/36 | **INVALID_COMPARISON**; counts are not a valid ranking |
| [R7 Squoosh](experiments/R7-squoosh/README.md) | All 26/26 positive workflows; raw A/B 30/30, C 29/30 | C29 grading false negative preserved separately |

Each study link opens its source report, results and limitations. The denominators describe different features and must not be pooled into a general accuracy score. [Claims register](consolidated/CLAIMS-REGISTER.md)

## What was investigated

A denotes ordinary Codex inspection, B adds direct conventional tools, and C adds REA. R1 predates the three-arm design and has no B treatment. Frozen reference behavior and hidden checks evaluated the submitted reconstructions. Architecture explanations, artifact analysis and behavior are distinct evidence dimensions. Study-specific recovery histories and controls are disclosed. [Methodology](RESEARCH-METHODOLOGY.md)

The native study recovered substantial GS1 barcode logic and the image study integrated pinned browser codecs. The calendar study exposed a shared missed scheduling detail. The Joplin core-analysis timeout and Excalidraw treatment defects demonstrate why tool execution and comparison validity require separate checks. [Detailed report](consolidated/REA-R1-R7-CONSOLIDATED-FINAL-REPORT.md)

## Evidence and release boundary

This repository accounts for the complete 15,489-entry prior audit inventory and distributes a reviewed subset of research records. Vendor binaries, opaque logs, personal workstation paths and uncleared third-party payloads remain owner-local with identities and availability stated in the inventory. **This is partial public payload coverage, not a self-contained reproduction archive.** [Reproducibility](REPRODUCIBILITY.md) · [License notices](LICENSE-NOTICES.md)

**Final evidence freeze remains HOLD.** R1's historical launcher chain is unresolved; the original R6 final archive remains unavailable. A newly identified R6 supplemental archive and current publication signatures do not rewrite either historical record. Public repository availability is separately authorized by the owner; LinkedIn publication and any tagged release remain pending. [Closure review](release/EVIDENCE-CLOSURE-REVIEW.md)

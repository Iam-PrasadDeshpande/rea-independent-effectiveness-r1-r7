# Effectiveness matrix

| Study | Functional reconstruction | Architecture completeness | Evidence contribution | Operational reliability and efficiency |
|---|---|---|---|---|
| [R1](../experiments/R1-sap-genai-mail/README.md) | A/C 8/8 receipts; no B | A 30 FULL; C 29 FULL/1 PARTIAL of 30 | Selected JS graph/provenance | Launcher freeze continuity unresolved; no causal gain |
| [R2](../experiments/R2-zint/README.md) | All 48/48 | A/B/C 33/37/39 FULL of 40, remainder PARTIAL; not human gold | Twelve-record normalized export; B also traceable | C faster in this triple, more input tokens; lifecycle/order/cache confounds |
| [R3](../experiments/R3-joplin/README.md) | All 40/40 | 27/11/25 points of 30; heterogeneous evidence | Peripheral JS evidence; core timed out | Core timeout and selected recovery histories; no causal gain |
| [R4](../experiments/R4-sap-ai160/README.md) | All 12/12 helper cases | 14/14/15 facts of 16 | JS/selected feature trace; zero selected seeds | Narrow helper scope; no full-agent or SAP result |
| [R5](../experiments/R5-fossify-calendar/README.md) | All 32/44; projections 44/44 | Different persistence/Android explanation coverage; not full reconstructed app | Static APK/JADX observations | All miss reminder second; setup/runtime limits remain |
| [R6](../experiments/R6-excalidraw/README.md) | 3/36,30/36,27/36 raw; invalid comparison | C final report absent; UNKNOWN is missing evidence | Browser observations; evaluator preflight distinct | Output transport, recovery, timer/report defects; no ranking |
| [R7](../experiments/R7-squoosh/README.md) | All 26/26 positives; raw 30/30,30/30,29/30 | FULL/PARTIAL/UNKNOWN A16/9/5 B16/13/1 C14/11/5 | Identity-bound WASM ABI; direct tools recover interfaces too | Partly irrelevant huge JS summary, citation/signing histories; no causal gain |

Each row links to the original report and underlying indexed records. These are different test oracles and rubrics, with no valid aggregate percentage. Setup/recovery cost is not uniformly measured. Monetary costs remain UNKNOWN. Lack of demonstrated incremental gain is not proof of universal tool ineffectiveness.

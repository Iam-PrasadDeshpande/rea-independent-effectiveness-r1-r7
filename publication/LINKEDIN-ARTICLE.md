# Reverse Engineer Anything: What Seven Real-World Experiments Actually Revealed About AI Agents

Prasad Deshpande | Enterprise AI Architect | Independent AI Engineering Research

## Why I started

When an AI agent explains an unfamiliar application, I want to know how much of that explanation survives contact with its actual behavior. Reading a bundle, describing its components and producing plausible replacement code are useful steps. They leave an engineering question open: does the replacement reproduce the details that matter?

That question led me to evaluate Reverse Engineer Anything, or REA, across seven applications. I wanted to understand what its analysis tools contributed when Codex investigated delivered software and reconstructed a bounded part of its behavior. I was also interested in the evidence: could I trace a conclusion back to the artifact and observation that supported it?

The results gave me reasons to value REA's engineering and reasons to be careful about effectiveness claims. Across these studies, I did not establish an incremental functional reconstruction advantage from adding REA. Several of the most useful findings concerned shared mistakes, incomplete analysis and the measurement process itself.

## What REA brings to an investigation

REA gives an AI agent access to specialist analysis facilities through an agent-facing interface. In the evaluated 6.5.0 configurations, those facilities included JavaScript analysis, Ghidra for native binaries, JADX for Android code, browser inspection and tools for examining WebAssembly. WebAssembly is a compiled format commonly used to run performance-sensitive code inside a browser.

The underlying engines do much of the parsing, decoding and decompilation. REA coordinates access and returns structured observations, artifact identities, retained records and coverage information. That can help an investigation remain inspectable after the agent has moved on to another question.

My evidence concerns the facilities actually invoked in these experiments. It does not validate every documented provider or promise in the product. A tool appearing in an agent's catalog tells me it is available to request; a successful call and a retained result tell me what it actually did.

## Why seven applications

I selected a SAP AI email workflow, a barcode generator, desktop semantic search, a SAP purchase-order agent, an Android calendar, a browser drawing application and an image compressor. These became R1 through R7: SAP GenAI Mail Insights, Zint, Joplin, SAP AI160, Fossify Calendar, Excalidraw and Squoosh.

Each exposed a different investigation boundary. Zint involved a stripped native binary. Fossify involved an Android package. Excalidraw involved browser state and drawing behavior. Squoosh combined JavaScript with compiled image-processing modules. The SAP examples added workflow and integration questions, although the reconstructions did not establish live SAP equivalence.

This was a deliberately selected engineering portfolio. Seven varied applications provide useful examples; they do not make a representative sample of all software or all reverse-engineering tasks.

## How I compared the approaches

The later studies used three Codex treatments: ordinary inspection, direct conventional tools, and REA-assisted inspection. I refer to them as A, B and C. The earlier email study compared A and C and had no B arm. Direct tools matter because a comparison against an artificially weak baseline would tell me little about REA's contribution.

Within each study, investigators worked from recorded artifacts and objectives, with reference behavior and hidden scoring material withheld through the documented boundaries. Submitted implementations were checked against independently prepared reference behavior. Architecture explanations were assessed separately from working behavior.

Conditions were not identical across all seven studies. There were recovery attempts, controller amendments, different artifact types and different feature scopes. Some architecture grades were model-assisted judgments rather than independent human ratings. I have preserved those qualifications instead of describing the portfolio as one uniform benchmark.

The final publication review inspected stored evidence and verified artifact identities. It did not rerun investigators, repair submissions or change hidden tests. The numerical results below retain their original denominators because those denominators describe different tasks.

## What the experiments revealed

Zint was a useful native case. All three implementations matched 48 of 48 frozen exit-status and barcode-module comparisons. REA successfully used the native analysis path and retained a twelve-record evidence export. Direct Ghidra also produced traceable observations. REA's export was a demonstrated capability, while the behavioral result remained a tie within the tested boundary.

SAP AI160 reinforced the need to explain exactly what a reconstruction covers. All three arms matched twelve timestamp-helper cases. The reference material contained a broader purchase-order agent, but passing those helper tests did not reconstruct the complete agent, its integrations or its approval behavior. REA's selected feature trace returned zero seed matches; that observation could not establish that the feature was absent.

Joplin showed a different limit. Each selected valid implementation matched forty deterministic search scenarios, but REA's primary core analysis timed out. A successful analysis of a small clipboard module was retained. I could verify that peripheral capability without claiming that REA had completed the semantic-search core analysis. Successful reconstruction by the agent did not make the failed primary analysis disappear.

Fossify Calendar gave me the clearest example of why implementation details matter. All three arms matched the recurrence projections, yet each passed only 32 of 44 complete scenarios. They all missed twelve scenarios involving reminders because they omitted the reference implementation's final one-second scheduling adjustment. One arm also mishandled an unsorted-reminder case.

For a user, an event can appear on the right day while its reminder is still scheduled differently. For an evaluator, counting recurrence agreement alone would have hidden the shared failure. A replacement can recover a convincing design and still miss a small, observable rule. The diagnostic explanation of the missing second was preserved; it was not used to patch the submissions or award them new scores.

Excalidraw required the strongest restraint. The retained counts were A 3/36, B 30/36 and C 27/36. A contained a syntax error, and its three empty-scene matches did not establish a working drawing application. C encountered an oversized tool response, recovery overhead, a timer defect and missing final reports. Those conditions made the comparison invalid. Publishing the counts as a ranking would imply a clean treatment comparison that the experiment did not provide.

Squoosh produced exact agreement on all 26 positive workflows for every arm. A and B received raw mechanical grades of 30/30; C received 29/30. Inspection of the retained source and execution showed that C correctly rejected corrupt input during decoding. The evaluator's wording pattern failed to recognize “Decoding error.” I have preserved the raw score alongside that confirmed grading false negative.

The Squoosh task also allowed the original pinned codec binaries. It demonstrated a working bounded integration around those codecs, not recovery of the compression algorithm. REA supplied useful identity-bound WebAssembly interface evidence, while the conventional arm recovered the needed interface through direct tools. Neither the positive-case agreement nor the grading correction established REA superiority.

The earlier SAP email study likewise showed no functional advantage in its eight-case A/C comparison. Its original launcher freeze hash differs from the retained signed launcher. The existing evidence supports the recorded result receipts, while exact launcher continuity remains an explicit provenance exception. I cannot use a new audit signature to reconstruct that missing historical chain.

## What REA genuinely contributed

The contribution I can defend is scoped analysis with inspectable evidence. In the native case, REA retained and exported observations associated with the target. In the WebAssembly case, it provided useful module identity and interface information. Other records exposed coverage limits and uncertainty that helped constrain what I could conclude.

These features matter when an investigation must be reviewed, resumed or handed to another engineer. An observation that carries an artifact identity and a retrievable record is easier to challenge than an unsupported sentence in a report. The conventional-tool treatments also retained evidence, so I would not describe traceability as exclusive to REA.

The contribution was uneven. Core analysis could time out. A large response could fail to reach the model. A completed analysis could return a summary poorly suited to the task. Evidence retention helped me understand those limits; it did not automatically overcome them.

## What the research did not establish

I did not establish a general reconstruction accuracy gain, a general productivity advantage or a cost advantage. Observed times and token counts had different setup, caching, ordering, adapter and recovery conditions. They were not sufficient for a reliable causal claim, and I have not converted them into invented monetary savings.

I also did not completely reverse engineer seven applications. The tested behaviors were deliberately bounded: handlers, encoding cases, search scenarios, a timestamp helper, recurrence and reminders, drawing operations, and an image-processing integration. Passing those cases leaves many application features and operational conditions untested.

A combined accuracy percentage would obscure those differences. Forty search scenarios and twelve timestamp checks do not become equivalent units simply because both have a passing count.

## My Enterprise AI Architect assessment

I see value in this class of tooling as an optional investigation layer where the available backend, retained evidence and coverage reporting suit the problem. Before making it a standard dependency, I would want evidence that its operational overhead is justified for the specific workload and that failures remain visible to the agent and reviewer.

In an enterprise setting, I would keep three decisions separate: whether a tool inspected the intended artifact, whether the agent's explanation is supported, and whether the replacement behaves correctly. I would also require separate authority for any action against a real system. A useful analysis result provides information; it does not authorize a production change.

That is an engineering assessment based on this portfolio. It is not proof of production readiness, a security certification or a claim that the same outcomes will hold for another application.

## Where the research remains incomplete

The studies contain limited samples, single-run effects, bounded hidden tests and non-production environments. Package-to-source identity has qualifications in the retained records. The original R6 final evidence archive was not found; the publication package identifies a separately created and verified supplemental archive rather than presenting it as the missing original.

R1's launcher continuity remains unresolved. New signatures bind the current publication candidate and its exception record, but do not repair that historical gap. Architecture judgments also lack independent human-gold validation. These limits remain visible even where the article itself is ready for editorial review.

My practical takeaway is to ask an agent for the observation supporting its explanation, then test the behavior that explanation predicts. REA can contribute useful evidence to that process. Across these seven studies, the strongest lesson came from checking the small details, the failed calls and the evaluator itself with the same care as the reconstructed software.

Research report, individual results and claim-by-claim evidence: [REA independent effectiveness research](https://github.com/Iam-PrasadDeshpande/rea-independent-effectiveness-r1-r7).

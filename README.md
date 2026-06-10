# AlgoCoach

AlgoCoach is a production-oriented Chrome Extension MVP that enhances LeetCode problem pages with guided DSA learning support. It does not replace LeetCode or clone the problem-solving experience. Instead, it injects a collapsible right-side coaching panel on supported LeetCode problem URLs.

## Phase 1 Scope

- Manifest V3 Chrome Extension
- React + TypeScript + TailwindCSS
- LeetCode problem-page detection
- Injected right-side AlgoCoach panel
- Local topic classification metadata
- Interactive visualizations for trees, BFS, DFS, and binary search
- Local learning notes for common DSA topics
- Local progress tracking with `chrome.storage.local`
- No backend and no AI API dependency

## Repository Structure

```text
algo-coach/
├── extension/
│   ├── background.ts
│   ├── content.tsx
│   └── manifest.json
├── public/
│   └── ac-logo.svg
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   ├── AlgoCoachPanel.tsx
│   └── styles.css
├── README.md
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## Package Installation

```bash
npm install
```

## Development

Run Vite in watch mode. This continuously writes the extension bundle into `dist/`.

```bash
npm run dev
```

For a production build:

```bash
npm run build
```

## Manifest V3 Setup

The extension manifest lives at `extension/manifest.json`. During build, Vite copies it into `dist/manifest.json` and emits:

- `dist/content.js`
- `dist/background.js`
- `dist/icons/ac-logo.svg`

The content script is restricted to:

```json
"matches": ["https://leetcode.com/problems/*"]
```

The runtime code also checks the path shape, so AlgoCoach activates only on problem pages like:

- `https://leetcode.com/problems/two-sum/`
- `https://leetcode.com/problems/binary-tree-level-order-traversal/`

It does not stay mounted on nested LeetCode routes such as submissions or discussion pages.

## React Integration

`extension/content.tsx` creates a Shadow DOM host and renders `src/AlgoCoachPanel.tsx` into it. Tailwind output is imported inline and injected into that Shadow DOM, which keeps AlgoCoach styles isolated from LeetCode.

The content script also patches browser history events because LeetCode behaves like a single-page app. When users navigate between problems without a full page reload, AlgoCoach remounts with the new problem slug.

## Local Metadata

Problem classification is intentionally local for the MVP:

- `src/data/problems.ts` maps LeetCode slugs to titles, topics, difficulty, summaries, and visualization modes.
- `src/data/learningNotes.ts` stores educational notes by topic.
- `src/data/visualizations.ts` stores deterministic animation steps.

Add new curated problems by extending `problemMetadata` in `src/data/problems.ts`.

## Loading in Chrome

1. Run `npm install`.
2. Run `npm run build`.
3. Open Chrome and go to `chrome://extensions`.
4. Enable Developer mode.
5. Click Load unpacked.
6. Select the generated `dist/` folder.
7. Visit a LeetCode problem page, for example `https://leetcode.com/problems/two-sum/`.

## Current MVP Behavior

The AlgoCoach panel includes:

- Problem Overview
- Concepts
- Visualization
- Learning Notes
- Progress Dashboard

Progress is stored locally in Chrome extension storage and tracks:

- Problems visited
- Topics explored
- Visualizations viewed

## Scripts

```bash
npm run dev      # watch-build the extension into dist/
npm run build    # type-check and build the extension
npm run lint     # run ESLint
```

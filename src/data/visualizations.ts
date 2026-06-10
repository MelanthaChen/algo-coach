import type { VisualizationKind, VisualizationStep } from "../types/algo";

export const treeNodes = [
  { id: "3", x: 50, y: 14 },
  { id: "9", x: 25, y: 42 },
  { id: "20", x: 75, y: 42 },
  { id: "15", x: 62, y: 72 },
  { id: "7", x: 88, y: 72 }
];

export const treeEdges = [
  ["3", "9"],
  ["3", "20"],
  ["20", "15"],
  ["20", "7"]
] as const;

export const visualizationSteps: Record<VisualizationKind, VisualizationStep[]> = {
  "binary-tree": [
    { label: "Root", detail: "Start at root 3.", traversal: ["3"], visited: ["3"] },
    { label: "Left child", detail: "Visit 9 before returning.", traversal: ["3", "9"], visited: ["3", "9"] },
    { label: "Right subtree", detail: "Move into 20.", traversal: ["3", "9", "20"], visited: ["3", "9", "20"] },
    { label: "Leaves", detail: "Finish 15 and 7.", traversal: ["3", "9", "20", "15", "7"], visited: ["3", "9", "20", "15", "7"] }
  ],
  bfs: [
    { label: "Level 0", detail: "Queue starts with the root.", queue: ["3"], visited: ["3"], traversal: ["3"], level: 0 },
    { label: "Expand 3", detail: "Pop 3 and enqueue its children.", queue: ["9", "20"], visited: ["3", "9", "20"], traversal: ["3"], level: 1 },
    { label: "Level 1", detail: "Process 9, then 20.", queue: ["20", "15", "7"], visited: ["3", "9", "20", "15", "7"], traversal: ["3", "9", "20"], level: 1 },
    { label: "Level 2", detail: "Process 15 and 7 to finish.", queue: [], visited: ["3", "9", "20", "15", "7"], traversal: ["3", "9", "20", "15", "7"], level: 2 }
  ],
  dfs: [
    { label: "Push root", detail: "Stack begins with 3.", stack: ["3"], visited: [], traversal: [] },
    { label: "Go left", detail: "Visit 3, then push 20 and 9.", stack: ["20", "9"], visited: ["3"], traversal: ["3"] },
    { label: "Backtrack", detail: "Pop 9, then continue to 20.", stack: ["20"], visited: ["3", "9"], traversal: ["3", "9"] },
    { label: "Right branch", detail: "Visit 20 and schedule 15 and 7.", stack: ["7", "15"], visited: ["3", "9", "20"], traversal: ["3", "9", "20"] },
    { label: "Complete", detail: "Finish leaves 15 and 7.", stack: [], visited: ["3", "9", "20", "15", "7"], traversal: ["3", "9", "20", "15", "7"] }
  ],
  "binary-search": [
    { label: "Initial range", detail: "Search the full sorted array.", pointers: { left: 0, mid: 3, right: 6 } },
    { label: "Move right", detail: "Target is larger than nums[mid], so left moves to mid + 1.", pointers: { left: 4, mid: 5, right: 6 } },
    { label: "Narrow range", detail: "Target is smaller than nums[mid], so right moves to mid - 1.", pointers: { left: 4, mid: 4, right: 4 } },
    { label: "Found", detail: "left, mid, and right converge on the target.", pointers: { left: 4, mid: 4, right: 4 } }
  ]
};

export const binarySearchValues = [1, 3, 5, 7, 9, 11, 13];

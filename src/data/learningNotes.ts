import type { LearningNote, Topic } from "../types/algo";

export const learningNotes: Record<Topic, LearningNote> = {
  Array: {
    topic: "Array",
    whatItIs: "A contiguous indexed collection that is fast for random access and common in pointer, window, and sorting problems.",
    whenToUse: ["The input is ordered or index-based.", "You need two pointers, prefix sums, windows, or in-place updates."],
    patterns: ["Two pointers", "Sliding window", "Prefix sums", "Sorting then scanning"],
    complexity: { time: "Access is O(1); scans are usually O(n).", space: "Often O(1) extra unless storing derived state." }
  },
  "Hash Map": {
    topic: "Hash Map",
    whatItIs: "A key-value structure optimized for near constant-time lookup, insertion, and frequency tracking.",
    whenToUse: ["You need to remember complements or previous values.", "You need counts, grouping, or fast membership checks."],
    patterns: ["Complement lookup", "Frequency table", "Index map", "Group by signature"],
    complexity: { time: "Average O(1) per operation.", space: "O(k), where k is the number of stored keys." }
  },
  Tree: {
    topic: "Tree",
    whatItIs: "A hierarchical graph with parent-child relationships and no cycles.",
    whenToUse: ["The problem mentions root, child, ancestor, depth, path, or subtree.", "Recursive structure mirrors the input shape."],
    patterns: ["DFS recursion", "BFS levels", "Postorder aggregation", "Path tracking"],
    complexity: { time: "Usually O(n) to visit every node.", space: "O(h) recursion stack or O(w) queue width." }
  },
  BFS: {
    topic: "BFS",
    whatItIs: "Breadth-first search explores all neighbors at the current distance before moving deeper.",
    whenToUse: ["You need shortest path in an unweighted graph.", "You need level order traversal or minimum steps."],
    patterns: ["Queue by level", "Visited set", "Multi-source BFS", "Distance layers"],
    complexity: { time: "O(V + E) for graphs, O(n) for trees.", space: "O(V) for the queue and visited set." }
  },
  DFS: {
    topic: "DFS",
    whatItIs: "Depth-first search explores a path as far as possible before backtracking.",
    whenToUse: ["You need exhaustive path exploration.", "You need connected components, backtracking, or subtree results."],
    patterns: ["Recursive traversal", "Explicit stack", "Backtracking", "Postorder return values"],
    complexity: { time: "O(V + E) for graphs, O(n) for trees.", space: "O(depth) stack, up to O(V)." }
  },
  Queue: {
    topic: "Queue",
    whatItIs: "A first-in, first-out structure that naturally models work processed by arrival order.",
    whenToUse: ["Processing layers or waves.", "Scheduling nodes for BFS."],
    patterns: ["Level delimiter", "Fixed level size loop", "Worklist processing"],
    complexity: { time: "O(1) amortized enqueue/dequeue.", space: "O(n) in the widest layer or frontier." }
  },
  Stack: {
    topic: "Stack",
    whatItIs: "A last-in, first-out structure useful for nested state, undo behavior, and iterative DFS.",
    whenToUse: ["You need to backtrack.", "You are simulating recursion or matching nested structures."],
    patterns: ["Monotonic stack", "Iterative DFS", "Expression parsing"],
    complexity: { time: "O(1) push/pop.", space: "O(n) in the worst case." }
  },
  "Binary Search": {
    topic: "Binary Search",
    whatItIs: "A divide-and-conquer search over a sorted range or a monotonic answer space.",
    whenToUse: ["The input is sorted.", "The answer has a true/false monotonic boundary."],
    patterns: ["Classic index search", "Lower bound", "Search on answer", "Rotated sorted array"],
    complexity: { time: "O(log n) iterations.", space: "O(1) for iterative implementations." }
  },
  Graph: {
    topic: "Graph",
    whatItIs: "A set of nodes connected by edges, often hidden inside grids, dependencies, or relationships.",
    whenToUse: ["The problem has connectivity, neighbors, routes, components, or prerequisites.", "A grid cell can move to adjacent cells."],
    patterns: ["BFS shortest path", "DFS components", "Topological sort", "Union find"],
    complexity: { time: "O(V + E) for traversal.", space: "O(V) for visited state." }
  },
  "Linked List": {
    topic: "Linked List",
    whatItIs: "A chain of nodes where each node points to the next node instead of using contiguous indexes.",
    whenToUse: ["The problem asks you to rewire next pointers.", "You need to insert, delete, reverse, or detect cycles without array indexing."],
    patterns: ["Fast and slow pointers", "Dummy head", "Previous/current/next rewiring", "Cycle detection"],
    complexity: { time: "Most pointer traversals are O(n).", space: "Often O(1) extra when rewiring in place." }
  }
};

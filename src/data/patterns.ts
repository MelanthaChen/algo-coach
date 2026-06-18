import type { AlgorithmPattern, PatternDefinition } from "../types/algo";
import patternRules from "./patternRules.json";

export const patternRegistry: Record<AlgorithmPattern, PatternDefinition> = {
  Array: {
    pattern: "Array",
    explanation: "Use indexed access and ordered scans to reason about contiguous data.",
    appliesWhen: "The problem centers on positions, ranges, ordering, or in-place updates."
  },
  "Hash Map": {
    pattern: "Hash Map",
    explanation: "Store values, counts, or indexes for fast lookup.",
    appliesWhen: "You need to remember something seen earlier and query it in O(1) average time."
  },
  "Two Pointers": {
    pattern: "Two Pointers",
    explanation: "Move two indexes through a sequence to maintain a relationship.",
    appliesWhen: "The input is sorted, mirrored, or can be scanned from both ends."
  },
  "Sliding Window": {
    pattern: "Sliding Window",
    explanation: "Maintain a moving range while updating state incrementally.",
    appliesWhen: "The problem asks for a longest, shortest, or counted contiguous substring/subarray."
  },
  "Binary Search": {
    pattern: "Binary Search",
    explanation: "Repeatedly cut a sorted or monotonic search space in half.",
    appliesWhen: "The data is sorted or the answer can be tested with a monotonic predicate."
  },
  DFS: {
    pattern: "DFS",
    explanation: "Explore deeply before backtracking to alternatives.",
    appliesWhen: "The solution follows paths, components, subtrees, or recursive choices."
  },
  BFS: {
    pattern: "BFS",
    explanation: "Explore level by level with a queue.",
    appliesWhen: "The problem asks for levels, minimum steps, or shortest path in an unweighted space."
  },
  "Tree Traversal": {
    pattern: "Tree Traversal",
    explanation: "Visit tree nodes in a structured order such as inorder, preorder, postorder, or level order.",
    appliesWhen: "The problem input is a binary tree or BST."
  },
  Backtracking: {
    pattern: "Backtracking",
    explanation: "Try a choice, recurse, then undo it before trying the next choice.",
    appliesWhen: "The problem asks for all valid combinations, permutations, subsets, or boards."
  },
  Heap: {
    pattern: "Heap",
    explanation: "Keep the current min or max item available efficiently.",
    appliesWhen: "You repeatedly need top k, kth, merge order, or priority scheduling."
  },
  "Monotonic Stack": {
    pattern: "Monotonic Stack",
    explanation: "Maintain a stack ordered by value to find nearest greater or smaller boundaries.",
    appliesWhen: "The problem asks about spans, rectangles, next greater values, or histogram boundaries."
  },
  "Dynamic Programming": {
    pattern: "Dynamic Programming",
    explanation: "Cache overlapping subproblems and combine smaller answers.",
    appliesWhen: "Recursive choices repeat states or ask for minimum, maximum, count, or feasibility."
  },
  Graph: {
    pattern: "Graph",
    explanation: "Model entities as nodes and relationships as edges.",
    appliesWhen: "The problem involves connectivity, dependencies, neighbors, components, or routes."
  },
  "Union Find": {
    pattern: "Union Find",
    explanation: "Track connected components with near constant-time merge and find operations.",
    appliesWhen: "The problem repeatedly connects items and asks whether they share a component."
  },
  Greedy: {
    pattern: "Greedy",
    explanation: "Make the locally best choice when it can be proven globally safe.",
    appliesWhen: "Sorting or priority choices produce an optimal result without revisiting decisions."
  },
  Simulation: {
    pattern: "Simulation",
    explanation: "Directly model the process described by the problem.",
    appliesWhen: "The challenge is careful state transitions rather than a hidden data structure."
  },
  Math: {
    pattern: "Math",
    explanation: "Use arithmetic properties, digit operations, or formulas.",
    appliesWhen: "The problem is primarily about numbers, overflow, modularity, or transformations."
  },
  "String Manipulation": {
    pattern: "String Manipulation",
    explanation: "Transform, scan, group, or compare character sequences.",
    appliesWhen: "The input and core state are strings or character positions."
  }
};

type PatternRule = {
  patterns: AlgorithmPattern[];
  keywords: string[];
};

export function inferPatternsFromSlug(slug: string): AlgorithmPattern[] {
  const normalizedSlug = slug.toLowerCase();
  const matches: AlgorithmPattern[] = [];

  for (const rule of patternRules as PatternRule[]) {
    if (rule.keywords.some((keyword) => normalizedSlug.includes(keyword))) {
      for (const pattern of rule.patterns) {
        if (!matches.includes(pattern)) matches.push(pattern);
      }
    }
  }

  return matches;
}

export function getPatternDefinition(pattern: AlgorithmPattern) {
  return patternRegistry[pattern];
}

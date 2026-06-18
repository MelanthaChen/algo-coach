import type { ProblemMetadata } from "../types/algo";
import { titleFromSlug } from "../lib/leetcode";
import problemDifficulties from "./problemDifficulties.json";
import { inferPatternsFromSlug } from "./patterns";

const difficulties = problemDifficulties as Record<string, ProblemMetadata["difficulty"]>;

function inferMetadata(slug: string): Pick<ProblemMetadata, "topics" | "patterns" | "visualization" | "summary"> {
  const patterns = inferPatternsFromSlug(slug);

  if (slug.includes("binary-tree") || slug.includes("tree") || slug.includes("bst")) {
    return {
      topics: ["Tree", "DFS"],
      patterns: patterns.length ? patterns : ["Tree Traversal", "DFS"],
      visualization: "tree-traversal",
      summary: "AlgoCoach detected a tree problem from the LeetCode slug and selected the tree traversal visualizer."
    };
  }

  if (slug.includes("binary-search")) {
    return {
      topics: ["Array", "Binary Search"],
      patterns: patterns.length ? patterns : ["Binary Search"],
      visualization: "binary-search",
      summary: "AlgoCoach detected a binary search problem from the LeetCode slug."
    };
  }

  if (slug.includes("linked-list")) {
    return {
      topics: ["Linked List"],
      patterns,
      visualization: "linked-list",
      summary: "AlgoCoach detected a linked list problem from the LeetCode slug."
    };
  }

  return {
    topics: [],
    patterns,
    visualization: "generic",
    summary: "AlgoCoach does not have enough local metadata to select a specialized visualizer for this problem yet."
  };
}

const problemMetadata: Record<string, ProblemMetadata> = {
  "two-sum": {
    slug: "two-sum",
    title: "Two Sum",
    difficulty: difficulties["two-sum"],
    topics: ["Array", "Hash Map"],
    patterns: ["Hash Map", "Array"],
    visualization: "two-sum",
    summary: "Find a pair of values whose sum matches the target by trading repeated scanning for constant-time lookup."
  },
  "binary-tree-level-order-traversal": {
    slug: "binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    difficulty: difficulties["binary-tree-level-order-traversal"],
    topics: ["Tree", "BFS", "Queue"],
    patterns: ["Tree Traversal", "BFS"],
    visualization: "tree-traversal",
    summary: "Walk a tree level by level with a queue so each breadth layer is processed together."
  },
  "maximum-depth-of-binary-tree": {
    slug: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    difficulty: difficulties["maximum-depth-of-binary-tree"],
    topics: ["Tree", "DFS"],
    patterns: ["Tree Traversal", "DFS"],
    visualization: "tree-traversal",
    summary: "Recursively explore root-to-leaf paths and return the longest depth discovered."
  },
  "binary-search": {
    slug: "binary-search",
    title: "Binary Search",
    difficulty: difficulties["binary-search"],
    topics: ["Array", "Binary Search"],
    patterns: ["Binary Search", "Array"],
    visualization: "binary-search",
    summary: "Use sorted order to discard half of the remaining search range at each step."
  },
  "number-of-islands": {
    slug: "number-of-islands",
    title: "Number of Islands",
    difficulty: difficulties["number-of-islands"],
    topics: ["Graph", "BFS", "DFS", "Queue"],
    patterns: ["Graph", "BFS", "DFS"],
    visualization: "tree-traversal",
    summary: "Treat connected land cells as graph components and explore each component once."
  },
  "reverse-linked-list": {
    slug: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: difficulties["reverse-linked-list"],
    topics: ["Linked List"],
    patterns: ["Simulation"],
    visualization: "linked-list",
    summary: "Rewire next pointers one node at a time while preserving the rest of the list."
  },
  "largest-rectangle-in-histogram": {
    slug: "largest-rectangle-in-histogram",
    title: "Largest Rectangle in Histogram",
    difficulty: difficulties["largest-rectangle-in-histogram"],
    topics: ["Array", "Stack"],
    patterns: ["Monotonic Stack", "Array"],
    visualization: "generic",
    summary: "Use a monotonic stack to find the nearest smaller bar boundaries for each height."
  }
};

export function getProblemMetadata(slug: string): ProblemMetadata {
  const inferred = inferMetadata(slug);
  return (
    problemMetadata[slug] ?? {
      slug,
      title: titleFromSlug(slug),
      difficulty: "Difficulty unavailable",
      topics: inferred.topics,
      patterns: inferred.patterns,
      visualization: inferred.visualization,
      summary: inferred.summary
    }
  );
}

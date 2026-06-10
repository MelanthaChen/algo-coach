import type { ProblemMetadata } from "../types/algo";
import { titleFromSlug } from "../lib/leetcode";

const problemMetadata: Record<string, ProblemMetadata> = {
  "two-sum": {
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    topics: ["Array", "Hash Map"],
    visualization: "binary-search",
    summary: "Find a pair of values whose sum matches the target by trading repeated scanning for constant-time lookup."
  },
  "binary-tree-level-order-traversal": {
    slug: "binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    topics: ["Tree", "BFS", "Queue"],
    visualization: "bfs",
    summary: "Walk a tree level by level with a queue so each breadth layer is processed together."
  },
  "maximum-depth-of-binary-tree": {
    slug: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    topics: ["Tree", "DFS"],
    visualization: "dfs",
    summary: "Recursively explore root-to-leaf paths and return the longest depth discovered."
  },
  "binary-search": {
    slug: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    topics: ["Array", "Binary Search"],
    visualization: "binary-search",
    summary: "Use sorted order to discard half of the remaining search range at each step."
  },
  "number-of-islands": {
    slug: "number-of-islands",
    title: "Number of Islands",
    difficulty: "Medium",
    topics: ["Graph", "BFS", "DFS", "Queue"],
    visualization: "bfs",
    summary: "Treat connected land cells as graph components and explore each component once."
  }
};

export function getProblemMetadata(slug: string): ProblemMetadata {
  return (
    problemMetadata[slug] ?? {
      slug,
      title: titleFromSlug(slug),
      difficulty: "Medium",
      topics: ["Array"],
      visualization: "binary-search",
      summary: "AlgoCoach does not have curated metadata for this problem yet, so it starts with a general array-oriented coaching view."
    }
  );
}

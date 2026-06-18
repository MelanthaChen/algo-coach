import type { ProblemMetadata } from "../types/algo";
import { BinarySearchVisualizer } from "./BinarySearchVisualizer";
import { GenericVisualizer } from "./GenericVisualizer";
import { LinkedListPointerVisualizer } from "./LinkedListPointerVisualizer";
import { TreeVisualizer } from "./TreeVisualizer";
import { TwoSumVisualizer } from "./TwoSumVisualizer";
import type { VisualizerRegistryEntry } from "./types";

export const visualizerRegistry: VisualizerRegistryEntry[] = [
  {
    id: "two-sum",
    title: "Two Sum Visualizer",
    topics: ["Hash Map", "Array"],
    component: TwoSumVisualizer
  },
  {
    id: "tree-traversal",
    title: "Tree Traversal Visualizer",
    topics: ["Tree", "BFS", "DFS"],
    component: TreeVisualizer
  },
  {
    id: "binary-search",
    title: "Binary Search Visualizer",
    topics: ["Binary Search"],
    component: BinarySearchVisualizer
  },
  {
    id: "linked-list",
    title: "Linked List Pointer Visualizer",
    topics: ["Linked List"],
    component: LinkedListPointerVisualizer
  },
  {
    id: "generic",
    title: "Generic Visualizer",
    topics: [],
    component: GenericVisualizer
  }
];

export function resolveVisualizer(problem: ProblemMetadata) {
  const explicitMatch = visualizerRegistry.find((entry) => entry.id === problem.visualization);
  if (explicitMatch) return explicitMatch;

  const topicMatch = visualizerRegistry.find((entry) => entry.topics.some((topic) => problem.topics.includes(topic)));
  return topicMatch ?? visualizerRegistry.find((entry) => entry.id === "generic")!;
}

import type { KnowledgeGraphEdge, ProblemRecommendation, RoadmapTopic, Topic } from "../types/algo";

export const topicRoadmap: RoadmapTopic[] = [
  { topic: "Array", label: "Arrays", prerequisites: [], difficulty: "Foundational", order: 1 },
  { topic: "Hash Map", label: "Hash Maps", prerequisites: ["Arrays"], difficulty: "Foundational", order: 2 },
  { topic: "Linked List", label: "Linked Lists", prerequisites: ["Arrays"], difficulty: "Foundational", order: 3 },
  { topic: "Stack", label: "Stacks", prerequisites: ["Arrays"], difficulty: "Foundational", order: 4 },
  { topic: "Queue", label: "Queues", prerequisites: ["Arrays"], difficulty: "Foundational", order: 5 },
  { topic: "Tree", label: "Trees", prerequisites: ["Queues", "Stacks"], difficulty: "Intermediate", order: 6 },
  { topic: "Graph", label: "Graphs", prerequisites: ["Trees", "Queues"], difficulty: "Intermediate", order: 7 },
  { topic: "Heap", label: "Heap", prerequisites: ["Arrays", "Trees"], difficulty: "Intermediate", order: 8 },
  { topic: "Binary Search", label: "Binary Search", prerequisites: ["Arrays"], difficulty: "Intermediate", order: 9 },
  { topic: "Backtracking", label: "Backtracking", prerequisites: ["DFS", "Recursion"], difficulty: "Advanced", order: 10 },
  { topic: "Dynamic Programming", label: "Dynamic Programming", prerequisites: ["Arrays", "Recursion"], difficulty: "Advanced", order: 11 }
];

export const problemRecommendations: Record<string, ProblemRecommendation> = {
  "two-sum": {
    slug: "two-sum",
    title: "Two Sum",
    prerequisites: ["Array Traversal", "Hash Map Basics"],
    nextProblems: [
      { id: 217, title: "Contains Duplicate", slug: "contains-duplicate" },
      { id: 242, title: "Valid Anagram", slug: "valid-anagram" },
      { id: 49, title: "Group Anagrams", slug: "group-anagrams" }
    ],
    relatedConcepts: ["Complement lookup", "One-pass scan", "Value to index mapping"]
  },
  "binary-tree-level-order-traversal": {
    slug: "binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    prerequisites: ["Binary Tree Basics", "Queue Operations"],
    nextProblems: [
      { id: 104, title: "Maximum Depth of Binary Tree", slug: "maximum-depth-of-binary-tree" },
      { id: 199, title: "Binary Tree Right Side View", slug: "binary-tree-right-side-view" },
      { id: 1026, title: "Maximum Difference Between Node and Ancestor", slug: "maximum-difference-between-node-and-ancestor" }
    ],
    relatedConcepts: ["Level order traversal", "Queue frontier", "Tree breadth"]
  },
  "maximum-depth-of-binary-tree": {
    slug: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    prerequisites: ["Binary Tree Basics", "DFS Recursion"],
    nextProblems: [
      { id: 111, title: "Minimum Depth of Binary Tree", slug: "minimum-depth-of-binary-tree" },
      { id: 543, title: "Diameter of Binary Tree", slug: "diameter-of-binary-tree" },
      { id: 112, title: "Path Sum", slug: "path-sum" }
    ],
    relatedConcepts: ["Recursive return values", "Depth", "Postorder thinking"]
  },
  "binary-search": {
    slug: "binary-search",
    title: "Binary Search",
    prerequisites: ["Array Indexing", "Sorted Order"],
    nextProblems: [
      { id: 35, title: "Search Insert Position", slug: "search-insert-position" },
      { id: 704, title: "Binary Search", slug: "binary-search" },
      { id: 875, title: "Koko Eating Bananas", slug: "koko-eating-bananas" }
    ],
    relatedConcepts: ["Search range", "Midpoint", "Monotonic predicate"]
  },
  "reverse-linked-list": {
    slug: "reverse-linked-list",
    title: "Reverse Linked List",
    prerequisites: ["Linked List Basics", "Pointer Reassignment"],
    nextProblems: [
      { id: 141, title: "Linked List Cycle", slug: "linked-list-cycle" },
      { id: 876, title: "Middle of the Linked List", slug: "middle-of-the-linked-list" },
      { id: 92, title: "Reverse Linked List II", slug: "reverse-linked-list-ii" }
    ],
    relatedConcepts: ["prev/current/next", "In-place mutation", "Pointer safety"]
  }
};

export const knowledgeGraphEdges: KnowledgeGraphEdge[] = [
  { from: "Arrays", to: "Hash Maps" },
  { from: "Hash Maps", to: "Sliding Window" },
  { from: "Arrays", to: "Binary Search" },
  { from: "Arrays", to: "Stacks" },
  { from: "Stacks", to: "DFS" },
  { from: "Queues", to: "BFS" },
  { from: "Trees", to: "DFS" },
  { from: "DFS", to: "Backtracking" },
  { from: "Trees", to: "Graphs" },
  { from: "Arrays", to: "Dynamic Programming" }
];

export function getRoadmapTopic(topic: Topic) {
  return topicRoadmap.find((item) => item.topic === topic);
}

export function getProblemRecommendation(slug: string, title: string): ProblemRecommendation {
  return (
    problemRecommendations[slug] ?? {
      slug,
      title,
      prerequisites: ["Core data structure basics", "Problem constraints"],
      nextProblems: [
        { id: 704, title: "Binary Search", slug: "binary-search" },
        { id: 217, title: "Contains Duplicate", slug: "contains-duplicate" },
        { id: 104, title: "Maximum Depth of Binary Tree", slug: "maximum-depth-of-binary-tree" }
      ],
      relatedConcepts: ["Input modeling", "Complexity analysis", "State transitions"]
    }
  );
}

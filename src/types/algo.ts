export type Topic =
  | "Array"
  | "Hash Map"
  | "Tree"
  | "BFS"
  | "DFS"
  | "Queue"
  | "Stack"
  | "Binary Search"
  | "Graph"
  | "Linked List";

export type VisualizationKind = "two-sum" | "tree-traversal" | "binary-search" | "linked-list";

export interface ProblemMetadata {
  slug: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topics: Topic[];
  visualization: VisualizationKind;
  summary: string;
}

export interface LearningNote {
  topic: Topic;
  whatItIs: string;
  whenToUse: string[];
  patterns: string[];
  complexity: {
    time: string;
    space: string;
  };
}

export interface ProgressState {
  problemsVisited: Record<string, string>;
  topicsExplored: Record<Topic, number>;
  visualizationsViewed: Record<VisualizationKind, number>;
}

export interface VisualizationStep {
  label: string;
  detail: string;
  queue?: string[];
  stack?: string[];
  visited?: string[];
  traversal?: string[];
  level?: number;
  pointers?: {
    left: number;
    mid: number;
    right: number;
  };
}

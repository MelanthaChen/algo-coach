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
  | "Linked List"
  | "Heap"
  | "Backtracking"
  | "Dynamic Programming";

export type VisualizationKind = "two-sum" | "tree-traversal" | "binary-search" | "linked-list";
export type ProblemDifficulty = "Easy" | "Medium" | "Hard" | "Difficulty unavailable";

export interface ProblemMetadata {
  slug: string;
  title: string;
  difficulty: ProblemDifficulty;
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
  visualizationsCompleted: Record<VisualizationKind, number>;
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

export interface RoadmapTopic {
  topic: Topic;
  label: string;
  prerequisites: string[];
  difficulty: "Foundational" | "Intermediate" | "Advanced";
  order: number;
}

export interface ProblemRecommendation {
  slug: string;
  title: string;
  prerequisites: string[];
  nextProblems: Array<{
    id: number;
    title: string;
    slug: string;
  }>;
  relatedConcepts: string[];
}

export interface KnowledgeGraphEdge {
  from: string;
  to: string;
}

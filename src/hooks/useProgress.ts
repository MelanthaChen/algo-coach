import { useCallback, useEffect, useMemo, useState } from "react";
import type { ProblemMetadata, ProgressState, Topic, VisualizationKind } from "../types/algo";
import { safeStorageGet, safeStorageSet } from "../lib/safeStorage";

const STORAGE_KEY = "algoCoachProgress";

export const topicUniverse: Topic[] = [
  "Array",
  "Hash Map",
  "Linked List",
  "Stack",
  "Queue",
  "Tree",
  "Graph",
  "Heap",
  "Binary Search",
  "Backtracking",
  "Dynamic Programming",
  "BFS",
  "DFS"
];

function emptyProgress(): ProgressState {
  return {
    problemsVisited: {},
    topicsExplored: Object.fromEntries(topicUniverse.map((topic) => [topic, 0])) as Record<Topic, number>,
    visualizationsViewed: {
      "two-sum": 0,
      "tree-traversal": 0,
      "binary-search": 0,
      "linked-list": 0,
      generic: 0
    },
    visualizationsCompleted: {
      "two-sum": 0,
      "tree-traversal": 0,
      "binary-search": 0,
      "linked-list": 0,
      generic: 0
    }
  };
}

function getStorage(): Promise<ProgressState> {
  return safeStorageGet<ProgressState>(STORAGE_KEY, emptyProgress());
}

function setStorage(progress: ProgressState): Promise<void> {
  return safeStorageSet(STORAGE_KEY, progress);
}

export function useProgress(problem: ProblemMetadata) {
  const [progress, setProgress] = useState<ProgressState>(() => emptyProgress());

  useEffect(() => {
    let cancelled = false;

    getStorage().then((current) => {
      if (cancelled) return;

      const next: ProgressState = {
        problemsVisited: {
          ...current.problemsVisited,
          [problem.slug]: new Date().toISOString()
        },
        topicsExplored: { ...emptyProgress().topicsExplored, ...current.topicsExplored },
        visualizationsViewed: { ...emptyProgress().visualizationsViewed, ...current.visualizationsViewed },
        visualizationsCompleted: { ...emptyProgress().visualizationsCompleted, ...current.visualizationsCompleted }
      };

      problem.topics.forEach((topic) => {
        next.topicsExplored[topic] = Math.max(next.topicsExplored[topic] ?? 0, 1);
      });

      setProgress(next);
      void setStorage(next);
    });

    return () => {
      cancelled = true;
    };
  }, [problem.slug, problem.topics]);

  const markVisualizationCompleted = useCallback((kind: VisualizationKind) => {
    setProgress((current) => {
      const next = {
        ...current,
        visualizationsViewed: {
          ...current.visualizationsViewed,
          [kind]: (current.visualizationsViewed[kind] ?? 0) + 1
        },
        visualizationsCompleted: {
          ...current.visualizationsCompleted,
          [kind]: (current.visualizationsCompleted[kind] ?? 0) + 1
        }
      };
      void setStorage(next);
      return next;
    });
  }, []);

  const topicPercentages = useMemo(
    () =>
      topicUniverse.map((topic) => {
        const viewed = progress.topicsExplored[topic] ?? 0;
        const value = Math.min(100, viewed * 20);
        return { topic, value };
      }),
    [progress.topicsExplored]
  );

  return { progress, topicPercentages, markVisualizationCompleted };
}

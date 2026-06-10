import { useCallback, useEffect, useMemo, useState } from "react";
import type { ProblemMetadata, ProgressState, Topic, VisualizationKind } from "../types/algo";

const STORAGE_KEY = "algoCoachProgress";

const topicUniverse: Topic[] = ["Array", "Hash Map", "Tree", "BFS", "DFS", "Queue", "Stack", "Binary Search", "Graph"];

function emptyProgress(): ProgressState {
  return {
    problemsVisited: {},
    topicsExplored: Object.fromEntries(topicUniverse.map((topic) => [topic, 0])) as Record<Topic, number>,
    visualizationsViewed: {
      "binary-tree": 0,
      bfs: 0,
      dfs: 0,
      "binary-search": 0
    }
  };
}

function getStorage(): Promise<ProgressState> {
  return new Promise((resolve) => {
    if (typeof chrome === "undefined" || !chrome.storage?.local) {
      const raw = localStorage.getItem(STORAGE_KEY);
      resolve(raw ? (JSON.parse(raw) as ProgressState) : emptyProgress());
      return;
    }

    chrome.storage.local.get(STORAGE_KEY, (result) => {
      resolve((result[STORAGE_KEY] as ProgressState | undefined) ?? emptyProgress());
    });
  });
}

function setStorage(progress: ProgressState): Promise<void> {
  return new Promise((resolve) => {
    if (typeof chrome === "undefined" || !chrome.storage?.local) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      resolve();
      return;
    }

    chrome.storage.local.set({ [STORAGE_KEY]: progress }, () => resolve());
  });
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
        visualizationsViewed: { ...emptyProgress().visualizationsViewed, ...current.visualizationsViewed }
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

  const markVisualizationViewed = useCallback((kind: VisualizationKind) => {
    setProgress((current) => {
      const next = {
        ...current,
        visualizationsViewed: {
          ...current.visualizationsViewed,
          [kind]: (current.visualizationsViewed[kind] ?? 0) + 1
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

  return { progress, topicPercentages, markVisualizationViewed };
}

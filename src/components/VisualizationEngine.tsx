import { useEffect, useMemo } from "react";
import { resolveVisualizer } from "../visualizers/registry";
import type { ProblemMetadata, VisualizationKind } from "../types/algo";

interface VisualizationEngineProps {
  problem: ProblemMetadata;
  onVisualizationCompleted: (kind: VisualizationKind) => void;
}

export function VisualizationEngine({ problem, onVisualizationCompleted }: VisualizationEngineProps) {
  const registryEntry = useMemo(() => resolveVisualizer(problem), [problem]);
  const Visualizer = registryEntry.component;

  useEffect(() => {
    console.log("[AlgoCoach] visualizer selection", {
      problemSlug: problem.slug,
      detectedTopics: problem.topics,
      selectedVisualizer: registryEntry.id
    });
  }, [problem.slug, problem.topics, registryEntry.id]);

  return (
    <div data-visualizer={registryEntry.id}>
      <Visualizer problem={problem} onVisualizationCompleted={onVisualizationCompleted} />
    </div>
  );
}

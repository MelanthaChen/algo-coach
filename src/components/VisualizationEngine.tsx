import { useMemo } from "react";
import { resolveVisualizer } from "../visualizers/registry";
import type { ProblemMetadata, VisualizationKind } from "../types/algo";

interface VisualizationEngineProps {
  problem: ProblemMetadata;
  onViewed: (kind: VisualizationKind) => void;
}

export function VisualizationEngine({ problem, onViewed }: VisualizationEngineProps) {
  const registryEntry = useMemo(() => resolveVisualizer(problem), [problem]);
  const Visualizer = registryEntry.component;
  return (
    <div data-visualizer={registryEntry.id}>
      <Visualizer problem={problem} onViewed={onViewed} />
    </div>
  );
}

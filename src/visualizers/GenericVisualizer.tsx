import { useEffect } from "react";
import { Badge } from "../components/Badge";
import { PatternSummary } from "../components/PatternSummary";
import type { VisualizerProps } from "./types";

export function GenericVisualizer({ problem, onVisualizationCompleted }: VisualizerProps) {
  useEffect(() => {
    onVisualizationCompleted("generic");
  }, [onVisualizationCompleted]);

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-semibold">Generic Visualizer</p>
        <p className="text-xs text-muted-foreground">No specialized visualizer is available yet, so AlgoCoach is showing inferred patterns.</p>
      </div>
      <div className="rounded-lg border border-border bg-background p-3">
        <p className="text-sm font-semibold">{problem.title}</p>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">Detected topics</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {problem.topics.map((topic) => (
            <Badge key={topic}>{topic}</Badge>
          ))}
        </div>
      </div>
      <PatternSummary patterns={problem.patterns} />
    </div>
  );
}

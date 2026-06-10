import type { ComponentType } from "react";
import type { ProblemMetadata, Topic, VisualizationKind } from "../types/algo";

export interface VisualizerProps {
  problem: ProblemMetadata;
  onViewed: (kind: VisualizationKind) => void;
}

export interface VisualizerRegistryEntry {
  id: VisualizationKind;
  title: string;
  topics: Topic[];
  component: ComponentType<VisualizerProps>;
}

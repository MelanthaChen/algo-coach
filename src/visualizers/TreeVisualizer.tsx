import { useEffect, useMemo, useRef } from "react";
import { cn } from "../lib/cn";
import { VisualizerControls } from "./VisualizerControls";
import { StatePill } from "./StatePill";
import { usePlayback } from "./usePlayback";
import type { VisualizerProps } from "./types";

const nodes = [
  { id: "3", x: 50, y: 13 },
  { id: "9", x: 25, y: 42 },
  { id: "20", x: 75, y: 42 },
  { id: "15", x: 62, y: 73 },
  { id: "7", x: 88, y: 73 }
];

const edges = [
  ["3", "9"],
  ["3", "20"],
  ["20", "15"],
  ["20", "7"]
] as const;

const bfsSteps = [
  { label: "Start at root", current: "3", queue: ["3"], stack: [], traversal: [], visited: ["3"], detail: "BFS begins with the root in the queue." },
  { label: "Expand level 0", current: "3", queue: ["9", "20"], stack: [], traversal: ["3"], visited: ["3", "9", "20"], detail: "Visit 3, then enqueue its children from left to right." },
  { label: "Process level 1", current: "9", queue: ["20"], stack: [], traversal: ["3", "9"], visited: ["3", "9", "20"], detail: "Visit 9. It has no children, so the queue moves on to 20." },
  { label: "Queue next level", current: "20", queue: ["15", "7"], stack: [], traversal: ["3", "9", "20"], visited: ["3", "9", "20", "15", "7"], detail: "Visit 20 and enqueue 15 and 7 for the next level." },
  { label: "Finish traversal", current: "7", queue: [], stack: [], traversal: ["3", "9", "20", "15", "7"], visited: ["3", "9", "20", "15", "7"], detail: "The queue is empty, so level-order traversal is complete." }
];

const dfsSteps = [
  { label: "Start at root", current: "3", queue: [], stack: ["3"], traversal: [], visited: [], detail: "DFS can be recursive or stack-based. This view uses a stack." },
  { label: "Visit 3", current: "3", queue: [], stack: ["20", "9"], traversal: ["3"], visited: ["3"], detail: "Pop 3, then push right before left so 9 is processed next." },
  { label: "Go left", current: "9", queue: [], stack: ["20"], traversal: ["3", "9"], visited: ["3", "9"], detail: "Pop 9 and finish that branch." },
  { label: "Explore right subtree", current: "20", queue: [], stack: ["7", "15"], traversal: ["3", "9", "20"], visited: ["3", "9", "20"], detail: "Pop 20, then schedule its children." },
  { label: "Finish path", current: "7", queue: [], stack: [], traversal: ["3", "9", "20", "15", "7"], visited: ["3", "9", "20", "15", "7"], detail: "The stack is empty, so DFS is complete." }
];

export function TreeVisualizer({ problem, onVisualizationCompleted }: VisualizerProps) {
  const mode = problem.topics.includes("DFS") && !problem.topics.includes("BFS") ? "DFS" : "BFS";
  const steps = useMemo(() => (mode === "DFS" ? dfsSteps : bfsSteps), [mode]);
  const playback = usePlayback(steps.length, 950);
  const step = steps[playback.stepIndex];
  const completedRef = useRef(false);

  useEffect(() => {
    completedRef.current = false;
  }, [mode]);

  useEffect(() => {
    if (playback.stepIndex === steps.length - 1 && !completedRef.current) {
      completedRef.current = true;
      onVisualizationCompleted("tree-traversal");
    }
  }, [onVisualizationCompleted, playback.stepIndex, steps.length]);

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-semibold">Tree Traversal: {mode}</p>
        <p className="text-xs text-muted-foreground">Highlighting current node, worklist state, and traversal order.</p>
      </div>
      <VisualizerControls
        playing={playback.playing}
        stepIndex={playback.stepIndex}
        stepCount={steps.length}
        onPlayPause={() => playback.setPlaying((current) => !current)}
        onNext={playback.next}
        onReset={playback.reset}
      />

      <div className="rounded-lg border border-border bg-background p-3">
        <TreeCanvas current={step.current} visited={step.visited} traversal={step.traversal} />
      </div>

      <div className="grid gap-2">
        <StatePill label="Current node" values={[step.current]} />
        {mode === "BFS" ? <StatePill label="Queue state" values={step.queue} /> : <StatePill label="Stack state" values={step.stack} />}
        <StatePill label="Traversal order" values={step.traversal} />
      </div>

      <div className="rounded-md bg-muted p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{step.label}</p>
        <p className="mt-1 text-sm leading-6">{step.detail}</p>
      </div>
    </div>
  );
}

function TreeCanvas({ current, visited, traversal }: { current: string; visited: string[]; traversal: string[] }) {
  const visitedSet = new Set(visited);
  const traversalSet = new Set(traversal);

  return (
    <svg viewBox="0 0 100 88" className="h-52 w-full" role="img" aria-label="Binary tree traversal visualization">
      {edges.map(([from, to]) => {
        const source = nodes.find((node) => node.id === from)!;
        const target = nodes.find((node) => node.id === to)!;
        return <line key={`${from}-${to}`} x1={source.x} y1={source.y} x2={target.x} y2={target.y} className="stroke-border transition-colors" strokeWidth="1.7" />;
      })}
      {nodes.map((node) => {
        const isCurrent = node.id === current;
        const isVisited = visitedSet.has(node.id);
        return (
          <g key={node.id} className="transition-transform duration-300">
            <circle
              cx={node.x}
              cy={node.y}
              r={isCurrent ? "8" : "7"}
              className={cn(
                "fill-card stroke-border transition-all duration-300",
                isVisited && "fill-accent stroke-accent",
                traversalSet.has(node.id) && "fill-primary stroke-primary",
                isCurrent && "stroke-primary"
              )}
              strokeWidth={isCurrent ? "3" : "2"}
            />
            <text x={node.x} y={node.y + 1.5} textAnchor="middle" className={cn("fill-foreground text-[5px] font-bold", traversalSet.has(node.id) && "fill-primary-foreground")}>
              {node.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

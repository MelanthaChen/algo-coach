import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Pause, Play, RotateCcw, StepForward } from "lucide-react";
import { binarySearchValues, treeEdges, treeNodes, visualizationSteps } from "../data/visualizations";
import { cn } from "../lib/cn";
import type { VisualizationKind, VisualizationStep } from "../types/algo";

interface VisualizationEngineProps {
  kind: VisualizationKind;
  onViewed: (kind: VisualizationKind) => void;
}

export function VisualizationEngine({ kind, onViewed }: VisualizationEngineProps) {
  const steps = visualizationSteps[kind];
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const step = steps[stepIndex];

  useEffect(() => {
    onViewed(kind);
  }, [kind, onViewed]);

  useEffect(() => {
    setStepIndex(0);
    setPlaying(false);
  }, [kind]);

  useEffect(() => {
    if (!playing) return;

    const timer = window.setInterval(() => {
      setStepIndex((current) => {
        if (current >= steps.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 900);

    return () => window.clearInterval(timer);
  }, [playing, steps.length]);

  const title = useMemo(() => {
    const labels: Record<VisualizationKind, string> = {
      "binary-tree": "Binary Tree Traversal",
      bfs: "BFS Queue Flow",
      dfs: "DFS Stack Flow",
      "binary-search": "Binary Search Pointers"
    };
    return labels[kind];
  }, [kind]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-muted-foreground">
            Step {stepIndex + 1} of {steps.length}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <IconButton label="Reset" onClick={() => setStepIndex(0)}>
            <RotateCcw className="h-4 w-4" />
          </IconButton>
          <IconButton label="Next step" onClick={() => setStepIndex((current) => Math.min(current + 1, steps.length - 1))}>
            <StepForward className="h-4 w-4" />
          </IconButton>
          <IconButton label={playing ? "Pause" : "Play"} onClick={() => setPlaying((current) => !current)}>
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </IconButton>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-background p-3">
        {kind === "binary-search" ? <BinarySearchScene step={step} /> : <TreeScene step={step} mode={kind} />}
      </div>

      <div className="rounded-md bg-muted p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{step.label}</p>
        <p className="mt-1 text-sm leading-6">{step.detail}</p>
      </div>

      <StateRows step={step} />
    </div>
  );
}

function IconButton({ label, children, onClick }: { label: string; children: ReactNode; onClick: () => void }) {
  return (
    <button
      aria-label={label}
      title={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-foreground transition hover:bg-accent hover:text-accent-foreground"
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function TreeScene({ step, mode }: { step: VisualizationStep; mode: VisualizationKind }) {
  const visited = new Set(step.visited ?? []);
  const traversal = new Set(step.traversal ?? []);

  return (
    <svg viewBox="0 0 100 88" className="h-52 w-full" role="img" aria-label={`${mode} visualization`}>
      {treeEdges.map(([from, to]) => {
        const source = treeNodes.find((node) => node.id === from)!;
        const target = treeNodes.find((node) => node.id === to)!;
        return <line key={`${from}-${to}`} x1={source.x} y1={source.y} x2={target.x} y2={target.y} className="stroke-border" strokeWidth="1.5" />;
      })}
      {treeNodes.map((node) => (
        <g key={node.id}>
          <circle
            cx={node.x}
            cy={node.y}
            r="7"
            className={cn(
              "fill-card stroke-border transition-colors",
              visited.has(node.id) && "fill-primary stroke-primary",
              traversal.has(node.id) && "drop-shadow-sm"
            )}
            strokeWidth="2"
          />
          <text x={node.x} y={node.y + 1.5} textAnchor="middle" className={cn("fill-foreground text-[5px] font-bold", visited.has(node.id) && "fill-primary-foreground")}>
            {node.id}
          </text>
        </g>
      ))}
    </svg>
  );
}

function BinarySearchScene({ step }: { step: VisualizationStep }) {
  const pointers = step.pointers;

  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-7 gap-1">
        {binarySearchValues.map((value, index) => {
          const isLeft = pointers?.left === index;
          const isMid = pointers?.mid === index;
          const isRight = pointers?.right === index;
          return (
            <div key={value} className="space-y-2">
              <div
                className={cn(
                  "flex aspect-square items-center justify-center rounded-md border border-border bg-card text-sm font-semibold",
                  isMid && "border-primary bg-primary text-primary-foreground",
                  (isLeft || isRight) && !isMid && "border-accent bg-accent text-accent-foreground"
                )}
              >
                {value}
              </div>
              <div className="h-10 space-y-1 text-center text-[10px] font-semibold">
                {isLeft && <p className="text-primary">L</p>}
                {isMid && <p className="text-primary">M</p>}
                {isRight && <p className="text-primary">R</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StateRows({ step }: { step: VisualizationStep }) {
  const rows = [
    ["Queue", step.queue],
    ["Stack", step.stack],
    ["Visited", step.visited],
    ["Traversal", step.traversal]
  ].filter(([, values]) => Array.isArray(values));

  if (rows.length === 0 && step.level === undefined) return null;

  return (
    <div className="grid gap-2">
      {step.level !== undefined && <StatePill label="Level" values={[String(step.level)]} />}
      {rows.map(([label, values]) => (
        <StatePill key={label as string} label={label as string} values={(values as string[]) ?? []} />
      ))}
    </div>
  );
}

function StatePill({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="flex min-h-9 items-center justify-between gap-3 rounded-md border border-border bg-card px-3 py-2">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <span className="flex flex-wrap justify-end gap-1 text-xs">
        {values.length ? values.map((value) => <span key={value} className="rounded bg-muted px-2 py-1">{value}</span>) : <span className="text-muted-foreground">empty</span>}
      </span>
    </div>
  );
}

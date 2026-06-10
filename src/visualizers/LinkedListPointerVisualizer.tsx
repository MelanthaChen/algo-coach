import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../lib/cn";
import { VisualizerControls } from "./VisualizerControls";
import { StatePill } from "./StatePill";
import { usePlayback } from "./usePlayback";
import type { VisualizerProps } from "./types";

const nodes = ["1", "2", "3", "4"];

const steps = [
  { label: "Initialize pointers", prev: "null", current: "1", next: "2", reversed: [] as string[], detail: "Keep prev behind current and save next before changing links." },
  { label: "Reverse first link", prev: "1", current: "2", next: "3", reversed: ["1"], detail: "Point 1 back to null, then advance all pointers one node." },
  { label: "Continue rewiring", prev: "2", current: "3", next: "4", reversed: ["2", "1"], detail: "Point 2 back to 1. The reversed prefix grows from the front." },
  { label: "Finish reversal", prev: "4", current: "null", next: "null", reversed: ["4", "3", "2", "1"], detail: "When current is null, prev is the new head." }
];

export function LinkedListPointerVisualizer({ onViewed }: VisualizerProps) {
  const playback = usePlayback(steps.length, 1050);
  const step = steps[playback.stepIndex];

  useEffect(() => {
    onViewed("linked-list");
  }, [onViewed]);

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-semibold">Linked List: pointer rewiring</p>
        <p className="text-xs text-muted-foreground">Track prev, current, and next before changing references.</p>
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
        <div className="flex items-center justify-between gap-1">
          {nodes.map((node, index) => {
            const isCurrent = step.current === node;
            const isPrev = step.prev === node;
            const isReversed = step.reversed.includes(node);
            return (
              <div key={node} className="flex flex-1 items-center gap-1">
                <div className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card text-base font-bold transition-all duration-300",
                      isReversed && "border-primary bg-primary text-primary-foreground",
                      isCurrent && "scale-105 border-emerald-400 bg-emerald-500/15",
                      isPrev && !isCurrent && "border-accent bg-accent text-accent-foreground"
                    )}
                  >
                    {node}
                  </div>
                  <div className="h-8 text-center text-[10px] font-semibold text-primary">
                    {isPrev && <p>prev</p>}
                    {isCurrent && <p>current</p>}
                  </div>
                </div>
                {index < nodes.length - 1 && <ArrowRight className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", isReversed && "rotate-180 text-primary")} />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <StatePill label="prev" values={[step.prev]} />
        <StatePill label="current" values={[step.current]} />
        <StatePill label="next" values={[step.next]} />
      </div>
      <StatePill label="Reversed prefix" values={step.reversed} />

      <div className="rounded-md bg-muted p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{step.label}</p>
        <p className="mt-1 text-sm leading-6">{step.detail}</p>
      </div>
    </div>
  );
}

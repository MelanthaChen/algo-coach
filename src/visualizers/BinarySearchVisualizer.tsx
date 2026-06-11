import { useEffect, useRef } from "react";
import { cn } from "../lib/cn";
import { VisualizerControls } from "./VisualizerControls";
import { StatePill } from "./StatePill";
import { usePlayback } from "./usePlayback";
import type { VisualizerProps } from "./types";

const values = [1, 3, 5, 7, 9, 11, 13];
const target = 9;

const steps = [
  { label: "Search full range", left: 0, mid: 3, right: 6, detail: "Start with the entire sorted array." },
  { label: "Discard left half", left: 4, mid: 5, right: 6, detail: "7 is smaller than target 9, so move left to mid + 1." },
  { label: "Discard right side", left: 4, mid: 4, right: 4, detail: "11 is larger than target 9, so move right to mid - 1." },
  { label: "Found target", left: 4, mid: 4, right: 4, detail: "mid points at 9, so the search succeeds." }
];

export function BinarySearchVisualizer({ onVisualizationCompleted }: VisualizerProps) {
  const playback = usePlayback(steps.length, 1000);
  const step = steps[playback.stepIndex];
  const completedRef = useRef(false);

  useEffect(() => {
    if (playback.stepIndex === steps.length - 1 && !completedRef.current) {
      completedRef.current = true;
      onVisualizationCompleted("binary-search");
    }
  }, [onVisualizationCompleted, playback.stepIndex]);

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-semibold">Binary Search: pointer narrowing</p>
        <p className="text-xs text-muted-foreground">
          values = [{values.join(", ")}], target = {target}
        </p>
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
        <div className="grid grid-cols-7 gap-1">
          {values.map((value, index) => {
            const inRange = index >= step.left && index <= step.right;
            const isLeft = index === step.left;
            const isMid = index === step.mid;
            const isRight = index === step.right;

            return (
              <div key={value} className="space-y-2">
                <div
                  className={cn(
                    "flex aspect-square items-center justify-center rounded-md border border-border bg-card text-sm font-semibold opacity-40 transition-all duration-300",
                    inRange && "opacity-100",
                    isMid && "border-primary bg-primary text-primary-foreground shadow",
                    (isLeft || isRight) && !isMid && "border-accent bg-accent text-accent-foreground"
                  )}
                >
                  {value}
                </div>
                <div className="h-12 space-y-1 text-center text-[10px] font-semibold">
                  {isLeft && <p className="text-primary">left</p>}
                  {isMid && <p className="text-primary">mid</p>}
                  {isRight && <p className="text-primary">right</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <StatePill label="left" values={[String(step.left)]} />
        <StatePill label="mid" values={[String(step.mid)]} />
        <StatePill label="right" values={[String(step.right)]} />
      </div>
      <StatePill label="Search range" values={values.slice(step.left, step.right + 1).map(String)} />

      <div className="rounded-md bg-muted p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{step.label}</p>
        <p className="mt-1 text-sm leading-6">{step.detail}</p>
      </div>
    </div>
  );
}

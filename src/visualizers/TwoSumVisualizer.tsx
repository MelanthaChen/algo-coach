import { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "../lib/cn";
import { VisualizerControls } from "./VisualizerControls";
import { StatePill } from "./StatePill";
import { usePlayback } from "./usePlayback";
import type { VisualizerProps } from "./types";

const nums = [2, 7, 11, 15];
const target = 9;

const steps = [
  {
    label: "Start at index 0",
    detail: "Before storing anything, ask which number would complete the target.",
    index: 0,
    need: 7,
    map: [] as Array<[number, number]>,
    found: false
  },
  {
    label: "Check index 1",
    detail: "The map already contains 2 at index 0, so 7 completes the pair.",
    index: 1,
    need: 2,
    map: [[2, 0]] as Array<[number, number]>,
    found: true
  }
];

export function TwoSumVisualizer({ onVisualizationCompleted }: VisualizerProps) {
  const playback = usePlayback(steps.length, 1100);
  const step = steps[playback.stepIndex];
  const completedRef = useRef(false);

  useEffect(() => {
    if (playback.stepIndex === steps.length - 1 && !completedRef.current) {
      completedRef.current = true;
      onVisualizationCompleted("two-sum");
    }
  }, [onVisualizationCompleted, playback.stepIndex]);

  return (
    <div className="space-y-3">
      <Header title="Two Sum: complement lookup" />
      <VisualizerControls
        playing={playback.playing}
        stepIndex={playback.stepIndex}
        stepCount={steps.length}
        onPlayPause={() => playback.setPlaying((current) => !current)}
        onNext={playback.next}
        onReset={playback.reset}
      />

      <div className="rounded-lg border border-border bg-background p-3">
        <div className="grid grid-cols-4 gap-2">
          {nums.map((value, index) => {
            const active = index === step.index;
            const matched = step.found && (index === 0 || index === step.index);
            return (
              <div key={value} className="space-y-2">
                <div
                  className={cn(
                    "flex aspect-square flex-col items-center justify-center rounded-md border border-border bg-card transition-all duration-300",
                    active && "border-primary bg-primary text-primary-foreground shadow",
                    matched && "border-emerald-500/50 bg-emerald-500/15"
                  )}
                >
                  <span className="text-[10px] font-semibold text-muted-foreground">i={index}</span>
                  <span className="text-lg font-bold">{value}</span>
                </div>
                {active && <p className="text-center text-[10px] font-semibold text-primary">current</p>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <StatePill label="Current value" values={[String(nums[step.index])]} />
        <StatePill label="Needed value" values={[String(step.need)]} />
      </div>

      <div className="rounded-md border border-border bg-card p-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold text-muted-foreground">HashMap contents</p>
          <p className="text-xs text-muted-foreground">value {"->"} index</p>
        </div>
        <div className="mt-3 flex min-h-10 flex-wrap gap-2">
          {step.map.length ? (
            step.map.map(([value, index]) => (
              <span key={value} className="rounded-md bg-muted px-3 py-2 text-xs font-semibold">
                {value}: {index}
              </span>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">empty</span>
          )}
        </div>
      </div>

      <div className={cn("rounded-md bg-muted p-3 transition-colors", step.found && "bg-emerald-500/10")}>
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {step.found && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
          {step.label}
        </p>
        <p className="mt-1 text-sm leading-6">{step.detail}</p>
        {step.found && <p className="mt-2 text-sm font-semibold text-emerald-300">FOUND: nums[0] + nums[1] = {target}</p>}
      </div>
    </div>
  );
}

function Header({ title }: { title: string }) {
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-xs text-muted-foreground">
        nums = [{nums.join(", ")}], target = {target}
      </p>
    </div>
  );
}

import type { ReactNode } from "react";
import { Pause, Play, RotateCcw, StepForward } from "lucide-react";

interface VisualizerControlsProps {
  playing: boolean;
  stepIndex: number;
  stepCount: number;
  onPlayPause: () => void;
  onNext: () => void;
  onReset: () => void;
}

export function VisualizerControls({ playing, stepIndex, stepCount, onPlayPause, onNext, onReset }: VisualizerControlsProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-xs text-muted-foreground">
        Step {stepIndex + 1} of {stepCount}
      </p>
      <div className="flex items-center gap-1">
        <IconButton label="Reset" onClick={onReset}>
          <RotateCcw className="h-4 w-4" />
        </IconButton>
        <IconButton label="Next step" onClick={onNext}>
          <StepForward className="h-4 w-4" />
        </IconButton>
        <IconButton label={playing ? "Pause" : "Play"} onClick={onPlayPause}>
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </IconButton>
      </div>
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

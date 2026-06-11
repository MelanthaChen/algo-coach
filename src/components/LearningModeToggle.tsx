import { GraduationCap } from "lucide-react";
import { cn } from "../lib/cn";

export function LearningModeToggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={enabled}
      aria-label="Toggle Learning Mode"
      title="Toggle Learning Mode"
      className={cn(
        "inline-flex h-8 items-center gap-2 rounded-md border border-border px-2 text-xs font-semibold transition hover:bg-accent",
        enabled ? "bg-primary text-primary-foreground" : "bg-card text-foreground"
      )}
      onClick={onToggle}
    >
      <GraduationCap className="h-4 w-4" />
      <span>Learning</span>
    </button>
  );
}

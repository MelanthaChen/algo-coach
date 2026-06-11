import { GripVertical } from "lucide-react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { cn } from "../lib/cn";

interface ResizeHandleProps {
  active: boolean;
  onPointerDown: (event: ReactPointerEvent<HTMLButtonElement>) => void;
}

export function ResizeHandle({ active, onPointerDown }: ResizeHandleProps) {
  return (
    <button
      type="button"
      aria-label="Resize AlgoCoach panel"
      title="Drag to resize"
      className={cn(
        "absolute inset-y-0 left-0 z-20 flex w-3 -translate-x-1/2 cursor-ew-resize items-center justify-center border-l border-border/70 text-muted-foreground transition-colors hover:text-primary",
        active && "text-primary"
      )}
      onPointerDown={onPointerDown}
    >
      <span className="flex h-16 w-2 items-center justify-center rounded-full bg-muted/80">
        <GripVertical className="h-4 w-4" />
      </span>
    </button>
  );
}

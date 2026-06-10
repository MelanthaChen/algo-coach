import type { Topic } from "../types/algo";

interface ProgressDashboardProps {
  items: Array<{ topic: Topic; value: number }>;
  problemsVisited: number;
}

export function ProgressDashboard({ items, problemsVisited }: ProgressDashboardProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-md border border-border bg-background p-3">
          <p className="text-xs text-muted-foreground">Problems visited</p>
          <p className="mt-1 text-2xl font-semibold">{problemsVisited}</p>
        </div>
        <div className="rounded-md border border-border bg-background p-3">
          <p className="text-xs text-muted-foreground">Tracked topics</p>
          <p className="mt-1 text-2xl font-semibold">{items.filter((item) => item.value > 0).length}</p>
        </div>
      </div>
      <div className="space-y-2">
        {items.slice(0, 6).map((item) => (
          <div key={item.topic} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>{item.topic}</span>
              <span className="text-muted-foreground">{item.value}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${item.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { cn } from "../lib/cn";

export function StatePill({ label, values, muted = false }: { label: string; values: string[]; muted?: boolean }) {
  return (
    <div className={cn("flex min-h-9 items-center justify-between gap-3 rounded-md border border-border bg-card px-3 py-2", muted && "bg-background")}>
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <span className="flex flex-wrap justify-end gap-1 text-xs">
        {values.length ? values.map((value) => <span key={value} className="rounded bg-muted px-2 py-1">{value}</span>) : <span className="text-muted-foreground">empty</span>}
      </span>
    </div>
  );
}

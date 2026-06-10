import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/cn";

interface SectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function Section({ title, icon, children, defaultOpen = true }: SectionProps) {
  return (
    <details className="group rounded-lg border border-border bg-card text-card-foreground shadow-sm" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3">
        <span className="flex items-center gap-2 text-sm font-semibold">
          {icon}
          {title}
        </span>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180")} />
      </summary>
      <div className="border-t border-border px-4 py-3">{children}</div>
    </details>
  );
}

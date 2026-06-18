import { getPatternDefinition } from "../data/patterns";
import type { AlgorithmPattern } from "../types/algo";
import { Badge } from "./Badge";

export function PatternSummary({ patterns }: { patterns: AlgorithmPattern[] }) {
  if (patterns.length === 0) {
    return <p className="text-sm text-muted-foreground">No local pattern inference available for this problem yet.</p>;
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {patterns.map((pattern) => (
          <Badge key={pattern}>{pattern}</Badge>
        ))}
      </div>
      <div className="grid gap-2">
        {patterns.map((pattern) => {
          const definition = getPatternDefinition(pattern);
          return (
            <article key={pattern} className="rounded-md border border-border bg-background p-3">
              <p className="text-sm font-semibold">{definition.pattern}</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{definition.explanation}</p>
              <p className="mt-2 text-xs leading-5">
                <span className="font-semibold text-foreground">Why it applies: </span>
                <span className="text-muted-foreground">{definition.appliesWhen}</span>
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

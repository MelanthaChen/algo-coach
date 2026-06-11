import { Check, ExternalLink } from "lucide-react";
import { getProblemRecommendation } from "../data/roadmap";
import type { ProblemMetadata } from "../types/algo";
import { Badge } from "./Badge";

export function ProblemRecommendations({ problem }: { problem: ProblemMetadata }) {
  const recommendation = getProblemRecommendation(problem.slug, problem.title);

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Prerequisites</p>
        <div className="mt-2 grid gap-2">
          {recommendation.prerequisites.map((item) => (
            <div key={item} className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm">
              <Check className="h-4 w-4 text-primary" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Related concepts</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {recommendation.relatedConcepts.map((concept) => (
            <Badge key={concept}>{concept}</Badge>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Recommended next</p>
        <div className="mt-2 grid gap-2">
          {recommendation.nextProblems.map((next) => (
            <a
              key={next.slug}
              className="flex items-center justify-between gap-3 rounded-md border border-border bg-background px-3 py-2 text-sm transition hover:bg-accent"
              href={`https://leetcode.com/problems/${next.slug}/`}
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <span className="text-muted-foreground">{next.id}. </span>
                {next.title}
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

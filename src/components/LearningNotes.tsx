import { learningNotes } from "../data/learningNotes";
import type { Topic } from "../types/algo";
import { Badge } from "./Badge";

export function LearningNotes({ topics }: { topics: Topic[] }) {
  return (
    <div className="space-y-4">
      {topics.map((topic) => {
        const note = learningNotes[topic];
        return (
          <article key={topic} className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge>{topic}</Badge>
              <span className="text-xs text-muted-foreground">{note.complexity.time}</span>
            </div>
            <p className="text-sm leading-6 text-foreground">{note.whatItIs}</p>
            <div className="grid gap-2 text-xs text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">Use when: </span>
                {note.whenToUse.join(" ")}
              </p>
              <p>
                <span className="font-semibold text-foreground">Patterns: </span>
                {note.patterns.join(", ")}
              </p>
              <p>
                <span className="font-semibold text-foreground">Space: </span>
                {note.complexity.space}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

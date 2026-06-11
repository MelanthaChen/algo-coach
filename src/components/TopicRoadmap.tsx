import { topicRoadmap } from "../data/roadmap";
import type { Topic } from "../types/algo";
import { Badge } from "./Badge";

export function TopicRoadmap({ activeTopics }: { activeTopics: Topic[] }) {
  const active = new Set(activeTopics);

  return (
    <div className="space-y-2">
      {topicRoadmap.map((item) => (
        <div key={item.topic} className="rounded-md border border-border bg-background p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-muted text-xs font-semibold">{item.order}</span>
              <p className="text-sm font-semibold">{item.label}</p>
            </div>
            <Badge className={active.has(item.topic) ? "border-primary bg-primary text-primary-foreground" : undefined}>{item.difficulty}</Badge>
          </div>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Prerequisites: {item.prerequisites.length ? item.prerequisites.join(", ") : "None"}
          </p>
        </div>
      ))}
    </div>
  );
}

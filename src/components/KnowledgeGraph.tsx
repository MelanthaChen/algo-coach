import { ArrowDown } from "lucide-react";
import { knowledgeGraphEdges } from "../data/roadmap";

export function KnowledgeGraph() {
  return (
    <div className="space-y-2">
      {knowledgeGraphEdges.map((edge) => (
        <div key={`${edge.from}-${edge.to}`} className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-xs">
          <span className="font-semibold">{edge.from}</span>
          <ArrowDown className="h-3.5 w-3.5 text-primary" />
          <span className="text-muted-foreground">{edge.to}</span>
        </div>
      ))}
    </div>
  );
}

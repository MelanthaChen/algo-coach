import { useMemo, useState } from "react";
import { BarChart3, BookOpen, BrainCircuit, ChevronsRight, Compass, Eye, Moon, SunMedium } from "lucide-react";
import { getProblemMetadata } from "./data/problems";
import { useProgress } from "./hooks/useProgress";
import { cn } from "./lib/cn";
import { Badge } from "./components/Badge";
import { LearningNotes } from "./components/LearningNotes";
import { ProgressDashboard } from "./components/ProgressDashboard";
import { Section } from "./components/Section";
import { VisualizationEngine } from "./components/VisualizationEngine";

export default function AlgoCoachPanel({ problemSlug }: { problemSlug: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(true);
  const problem = useMemo(() => getProblemMetadata(problemSlug), [problemSlug]);
  const { progress, topicPercentages, markVisualizationViewed } = useProgress(problem);

  return (
    <aside className={cn("algo-coach fixed right-4 top-20 z-[2147483647] font-sans", dark && "dark")}>
      <div
        className={cn(
          "overflow-hidden rounded-xl border border-border bg-background text-foreground shadow-panel transition-all duration-300",
          collapsed ? "w-14" : "w-[390px] max-w-[calc(100vw-2rem)]"
        )}
      >
        <header className="flex items-center justify-between gap-3 border-b border-border px-3 py-3">
          <div className={cn("min-w-0", collapsed && "hidden")}>
            <p className="text-base font-bold">AlgoCoach</p>
            <p className="truncate text-xs text-muted-foreground">Guided practice on LeetCode</p>
          </div>
          <div className="ml-auto flex items-center gap-1">
            {!collapsed && (
              <button
                type="button"
                aria-label="Toggle dark mode"
                title="Toggle dark mode"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card hover:bg-accent"
                onClick={() => setDark((current) => !current)}
              >
                {dark ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            )}
            <button
              type="button"
              aria-label={collapsed ? "Expand AlgoCoach" : "Collapse AlgoCoach"}
              title={collapsed ? "Expand AlgoCoach" : "Collapse AlgoCoach"}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card hover:bg-accent"
              onClick={() => setCollapsed((current) => !current)}
            >
              <ChevronsRight className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
            </button>
          </div>
        </header>

        {collapsed ? (
          <button
            type="button"
            className="flex h-52 w-full items-center justify-center text-xs font-semibold uppercase tracking-wide text-muted-foreground [writing-mode:vertical-rl]"
            onClick={() => setCollapsed(false)}
          >
            AlgoCoach
          </button>
        ) : (
          <main className="max-h-[calc(100vh-7rem)] space-y-3 overflow-y-auto p-3">
            <Section title="Problem Overview" icon={<Compass className="h-4 w-4 text-primary" />}>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="truncate text-lg font-semibold">{problem.title}</h2>
                    <Badge className={difficultyClass(problem.difficulty)}>{problem.difficulty}</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{problem.summary}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {problem.topics.map((topic) => (
                    <Badge key={topic}>{topic}</Badge>
                  ))}
                </div>
              </div>
            </Section>

            <Section title="Concepts" icon={<BrainCircuit className="h-4 w-4 text-primary" />}>
              <div className="grid gap-2">
                {problem.topics.map((topic) => (
                  <div key={topic} className="rounded-md border border-border bg-background p-3">
                    <p className="text-sm font-semibold">{topic}</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">{conceptHint(topic)}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Visualization" icon={<Eye className="h-4 w-4 text-primary" />}>
              <VisualizationEngine kind={problem.visualization} onViewed={markVisualizationViewed} />
            </Section>

            <Section title="Learning Notes" icon={<BookOpen className="h-4 w-4 text-primary" />} defaultOpen={false}>
              <LearningNotes topics={problem.topics} />
            </Section>

            <Section title="Progress Dashboard" icon={<BarChart3 className="h-4 w-4 text-primary" />} defaultOpen={false}>
              <ProgressDashboard items={topicPercentages} problemsVisited={Object.keys(progress.problemsVisited).length} />
            </Section>
          </main>
        )}
      </div>
    </aside>
  );
}

function difficultyClass(difficulty: string) {
  if (difficulty === "Easy") return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
  if (difficulty === "Hard") return "border-rose-500/30 bg-rose-500/10 text-rose-300";
  return "border-amber-500/30 bg-amber-500/10 text-amber-300";
}

function conceptHint(topic: string) {
  const hints: Record<string, string> = {
    Array: "Look for index relationships, order, and ways to scan once instead of nesting loops.",
    "Hash Map": "Ask what value you wish you had already seen, then store enough state to answer that quickly.",
    Tree: "Decide whether the answer is built top-down, bottom-up, level-by-level, or path-by-path.",
    BFS: "Use a queue when distance, level, or minimum steps matters.",
    DFS: "Use recursion or a stack when a full path or component should be explored before moving sideways.",
    Queue: "Track the current frontier and process a fixed level size when grouping by depth.",
    Stack: "Store unfinished work when the newest item should be processed first.",
    "Binary Search": "Confirm the range is sorted or the answer space is monotonic before moving pointers.",
    Graph: "Define nodes, edges, visited state, and the traversal goal before coding."
  };

  return hints[topic] ?? "Break the problem into state, transitions, and stopping conditions.";
}

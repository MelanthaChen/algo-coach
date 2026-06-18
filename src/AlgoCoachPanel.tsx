import { useMemo, useState } from "react";
import { BarChart3, BookOpen, BrainCircuit, ChevronsRight, Compass, Eye, GitFork, Map, Moon, Route, SunMedium } from "lucide-react";
import { getProblemMetadata } from "./data/problems";
import { useProgress } from "./hooks/useProgress";
import { cn } from "./lib/cn";
import { Badge } from "./components/Badge";
import { KnowledgeGraph } from "./components/KnowledgeGraph";
import { LearningModeToggle } from "./components/LearningModeToggle";
import { LearningNotes } from "./components/LearningNotes";
import { ProblemRecommendations } from "./components/ProblemRecommendations";
import { ProgressDashboard } from "./components/ProgressDashboard";
import { ResizablePanel } from "./components/ResizablePanel";
import { Section } from "./components/Section";
import { TopicRoadmap } from "./components/TopicRoadmap";
import { VisualizationEngine } from "./components/VisualizationEngine";
import type { ProblemDifficulty } from "./types/algo";

export default function AlgoCoachPanel({ problemSlug, difficultyOverride }: { problemSlug: string; difficultyOverride?: ProblemDifficulty }) {
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(true);
  const [learningMode, setLearningMode] = useState(true);
  const problem = useMemo(() => {
    const metadata = getProblemMetadata(problemSlug);
    return difficultyOverride ? { ...metadata, difficulty: difficultyOverride } : metadata;
  }, [difficultyOverride, problemSlug]);
  const { progress, topicPercentages, markVisualizationCompleted } = useProgress(problem);
  const visualizationsCompleted = Object.values(progress.visualizationsCompleted).reduce((total, count) => total + count, 0);

  return (
    <ResizablePanel
      collapsed={collapsed}
      collapsedTab="AlgoCoach"
      className={cn(dark && "dark")}
      onExpand={() => setCollapsed(false)}
      header={
        <header className="flex items-center justify-between gap-3 px-3 py-3">
          <div className={cn("min-w-0", collapsed && "hidden")}>
            <p className="text-base font-bold">AlgoCoach</p>
            <p className="truncate text-xs text-muted-foreground">Guided practice on LeetCode</p>
          </div>
          <div className="ml-auto flex items-center gap-1">
            {!collapsed && (
              <>
                <LearningModeToggle enabled={learningMode} onToggle={() => setLearningMode((current) => !current)} />
                <button
                  type="button"
                  aria-label="Toggle dark mode"
                  title="Toggle dark mode"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card hover:bg-accent"
                  onClick={() => setDark((current) => !current)}
                >
                  {dark ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
              </>
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
      }
    >
      <main className="space-y-3">
            {learningMode && (
              <>
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

                <Section title="Learning Path" icon={<Route className="h-4 w-4 text-primary" />}>
                  <ProblemRecommendations problem={problem} />
                </Section>

                <Section title="Topic Roadmap" icon={<Map className="h-4 w-4 text-primary" />} defaultOpen={false}>
                  <TopicRoadmap activeTopics={problem.topics} />
                </Section>

                <Section title="Knowledge Graph" icon={<GitFork className="h-4 w-4 text-primary" />} defaultOpen={false}>
                  <KnowledgeGraph />
                </Section>
              </>
            )}

            <Section title="Visualization" icon={<Eye className="h-4 w-4 text-primary" />}>
              <VisualizationEngine problem={problem} onVisualizationCompleted={markVisualizationCompleted} />
            </Section>

            {learningMode && (
              <>
                <Section title="Learning Notes" icon={<BookOpen className="h-4 w-4 text-primary" />} defaultOpen={false}>
                  <LearningNotes topics={problem.topics} />
                </Section>

                <Section title="Progress Dashboard" icon={<BarChart3 className="h-4 w-4 text-primary" />} defaultOpen={false}>
                  <ProgressDashboard
                    items={topicPercentages}
                    problemsVisited={Object.keys(progress.problemsVisited).length}
                    visualizationsCompleted={visualizationsCompleted}
                  />
                </Section>
              </>
            )}
          </main>
    </ResizablePanel>
  );
}

function difficultyClass(difficulty: string) {
  if (difficulty === "Easy") return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
  if (difficulty === "Hard") return "border-rose-500/30 bg-rose-500/10 text-rose-300";
  if (difficulty === "Difficulty unavailable") return "border-border bg-muted text-muted-foreground";
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
    Graph: "Define nodes, edges, visited state, and the traversal goal before coding.",
    "Linked List": "Track pointer ownership carefully before changing any next reference.",
    Heap: "Use a heap when you repeatedly need the current smallest, largest, or top k element.",
    Backtracking: "Explore choices recursively and undo state before trying the next branch.",
    "Dynamic Programming": "Cache overlapping subproblems when local choices combine into global optimal answers."
  };

  return hints[topic] ?? "Break the problem into state, transitions, and stopping conditions.";
}

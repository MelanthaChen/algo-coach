import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { ResizeHandle } from "./ResizeHandle";
import { cn } from "../lib/cn";

const STORAGE_KEY = "algoCoachPanelWidth";
const MIN_WIDTH = 320;
const DEFAULT_WIDTH = 450;
const LARGE_SCREEN_MAX_WIDTH = 900;
const SMALL_SCREEN_BREAKPOINT = 1200;
const COLLAPSED_WIDTH = 44;

interface ResizablePanelProps {
  collapsed: boolean;
  className?: string;
  header: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  collapsedTab: ReactNode;
  onExpand: () => void;
}

function viewportMaxWidth() {
  if (typeof window === "undefined") return LARGE_SCREEN_MAX_WIDTH;
  const viewportWidth = window.innerWidth;
  if (viewportWidth < SMALL_SCREEN_BREAKPOINT) {
    return Math.max(MIN_WIDTH, Math.floor(viewportWidth * 0.5));
  }

  return Math.min(LARGE_SCREEN_MAX_WIDTH, viewportWidth - 96);
}

function clampWidth(width: number) {
  const maxWidth = viewportMaxWidth();
  const minWidth = Math.min(MIN_WIDTH, maxWidth);
  return Math.min(Math.max(width, minWidth), maxWidth);
}

function readStoredWidth(): Promise<number> {
  return new Promise((resolve) => {
    if (typeof chrome === "undefined" || !chrome.storage?.local) {
      const stored = Number(localStorage.getItem(STORAGE_KEY));
      resolve(Number.isFinite(stored) ? clampWidth(stored) : clampWidth(DEFAULT_WIDTH));
      return;
    }

    chrome.storage.local.get(STORAGE_KEY, (result) => {
      const stored = Number(result[STORAGE_KEY]);
      resolve(Number.isFinite(stored) ? clampWidth(stored) : clampWidth(DEFAULT_WIDTH));
    });
  });
}

function persistWidth(width: number) {
  const nextWidth = Math.round(clampWidth(width));
  if (typeof chrome === "undefined" || !chrome.storage?.local) {
    localStorage.setItem(STORAGE_KEY, String(nextWidth));
    return;
  }

  chrome.storage.local.set({ [STORAGE_KEY]: nextWidth });
}

export function ResizablePanel({ collapsed, className, header, children, footer, collapsedTab, onExpand }: ResizablePanelProps) {
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [resizing, setResizing] = useState(false);
  const dragStartRef = useRef<{ x: number; width: number } | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    readStoredWidth().then((storedWidth) => {
      if (!cancelled) setWidth(storedWidth);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setWidth((current) => clampWidth(current));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const panelWidth = useMemo(() => (collapsed ? COLLAPSED_WIDTH : clampWidth(width)), [collapsed, width]);

  const stopResize = useCallback(() => {
    if (!dragStartRef.current) return;
    dragStartRef.current = null;
    setResizing(false);
    setWidth((current) => {
      const nextWidth = clampWidth(current);
      persistWidth(nextWidth);
      return nextWidth;
    });
  }, []);

  const onPointerMove = useCallback((event: PointerEvent) => {
    const dragStart = dragStartRef.current;
    if (!dragStart) return;

    const nextWidth = clampWidth(dragStart.width + dragStart.x - event.clientX);
    if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    rafRef.current = window.requestAnimationFrame(() => setWidth(nextWidth));
  }, []);

  useEffect(() => {
    if (!resizing) return;

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", stopResize);
    window.addEventListener("pointercancel", stopResize);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", stopResize);
      window.removeEventListener("pointercancel", stopResize);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [onPointerMove, resizing, stopResize]);

  const startResize = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dragStartRef.current = { x: event.clientX, width };
    setResizing(true);
  };

  return (
    <aside
      className={cn("algo-coach fixed bottom-0 right-0 top-0 z-[2147483647] font-sans", resizing && "select-none", className)}
      style={{ width: panelWidth }}
    >
      <div className="relative flex h-dvh min-h-0 overflow-hidden border-l border-border bg-background text-foreground shadow-panel transition-[width] duration-200">
        {!collapsed && <ResizeHandle active={resizing} onPointerDown={startResize} />}

        {collapsed ? (
          <button
            type="button"
            className="flex h-full w-full items-center justify-center border-l border-border bg-background text-xs font-semibold uppercase tracking-wide text-muted-foreground transition hover:bg-accent [writing-mode:vertical-rl]"
            onClick={onExpand}
          >
            {collapsedTab}
          </button>
        ) : (
          <div className="flex min-h-0 w-full flex-col">
            <div className="sticky top-0 z-10 shrink-0 border-b border-border bg-background/95 backdrop-blur">{header}</div>
            <div className="min-h-0 flex-1 overflow-y-scroll scroll-smooth p-3">{children}</div>
            {footer && <div className="shrink-0 border-t border-border bg-background">{footer}</div>}
          </div>
        )}
      </div>
    </aside>
  );
}

import { useEffect, useState } from "react";

export function usePlayback(stepCount: number, intervalMs = 1000) {
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setStepIndex(0);
    setPlaying(false);
  }, [stepCount]);

  useEffect(() => {
    if (!playing) return;

    const timer = window.setInterval(() => {
      setStepIndex((current) => {
        if (current >= stepCount - 1) {
          setPlaying(false);
          return current;
        }

        return current + 1;
      });
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, playing, stepCount]);

  return {
    stepIndex,
    playing,
    setPlaying,
    next: () => setStepIndex((current) => Math.min(current + 1, stepCount - 1)),
    reset: () => {
      setPlaying(false);
      setStepIndex(0);
    }
  };
}

import React from "react";
import { createRoot, type Root } from "react-dom/client";
import AlgoCoachPanel from "../src/AlgoCoachPanel";
import styles from "../src/styles.css?inline";
import { extractDifficultyFromDocument } from "../src/lib/difficulty";
import { isLeetCodeProblemPath, slugFromPath } from "../src/lib/leetcode";

const HOST_ID = "algo-coach-shadow-host";

let root: Root | null = null;
let lastSlug: string | null = null;
let lastDifficulty: string | null = null;
let difficultyObserver: MutationObserver | null = null;

console.log("[AlgoCoach] content script loaded");

function mountPanel() {
  const slug = slugFromPath(window.location.pathname);
  const isProblem = isLeetCodeProblemPath(window.location.pathname);
  const existingHost = document.getElementById(HOST_ID);
  const difficulty = extractDifficultyFromDocument();

  if (!isProblem || !slug) {
    console.log("[AlgoCoach] URL did not match", window.location.href);
    root?.unmount();
    root = null;
    lastSlug = null;
    lastDifficulty = null;
    difficultyObserver?.disconnect();
    difficultyObserver = null;
    existingHost?.remove();
    return;
  }

  console.log("[AlgoCoach] URL matched");

  if (existingHost && lastSlug === slug && lastDifficulty === difficulty) return;

  root?.unmount();
  existingHost?.remove();

  const host = document.createElement("div");
  host.id = HOST_ID;
  host.style.position = "relative";
  host.style.zIndex = "2147483647";

  const shadow = host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = styles;

  const appRoot = document.createElement("div");
  appRoot.id = "algo-coach-root";

  shadow.append(style, appRoot);
  document.documentElement.appendChild(host);

  console.log("[AlgoCoach] root created");

  root = createRoot(appRoot);
  root.render(<AlgoCoachPanel problemSlug={slug} difficultyOverride={difficulty ?? undefined} />);
  lastSlug = slug;
  lastDifficulty = difficulty;

  console.log("[AlgoCoach] panel mounted");
}

mountPanel();

difficultyObserver = new MutationObserver(() => {
  queueMicrotask(mountPanel);
});
difficultyObserver.observe(document.documentElement, {
  childList: true,
  subtree: true,
  characterData: true
});

// LeetCode is a single-page app, so URL changes do not always reload content scripts.
const pushState = history.pushState;
history.pushState = function pushStateWithAlgoCoach(...args) {
  pushState.apply(this, args);
  queueMicrotask(mountPanel);
};

const replaceState = history.replaceState;
history.replaceState = function replaceStateWithAlgoCoach(...args) {
  replaceState.apply(this, args);
  queueMicrotask(mountPanel);
};

window.addEventListener("popstate", mountPanel);

window.addEventListener("locationchange", mountPanel);

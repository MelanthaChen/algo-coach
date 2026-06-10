import React from "react";
import { createRoot, type Root } from "react-dom/client";
import AlgoCoachPanel from "../src/AlgoCoachPanel";
import styles from "../src/styles.css?inline";
import { isLeetCodeProblemPath, slugFromPath } from "../src/lib/leetcode";

const HOST_ID = "algo-coach-shadow-host";

let root: Root | null = null;
let lastSlug: string | null = null;

function mountPanel() {
  const slug = slugFromPath(window.location.pathname);
  const isProblem = isLeetCodeProblemPath(window.location.pathname);
  const existingHost = document.getElementById(HOST_ID);

  if (!isProblem || !slug) {
    root?.unmount();
    root = null;
    lastSlug = null;
    existingHost?.remove();
    return;
  }

  if (existingHost && lastSlug === slug) return;

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

  root = createRoot(appRoot);
  root.render(<AlgoCoachPanel problemSlug={slug} />);
  lastSlug = slug;
}

mountPanel();

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

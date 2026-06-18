import { readFileSync } from "node:fs";

const problemSource = readFileSync("src/data/problems.ts", "utf8");
const registrySource = readFileSync("src/visualizers/registry.ts", "utf8");

const expectations = [
  { slug: "two-sum", visualizer: "two-sum" },
  { slug: "binary-search", visualizer: "binary-search" },
  { slug: "binary-tree-inorder-traversal", inferredTopic: "Tree", visualizer: "tree-traversal" },
  { slug: "validate-binary-search-tree", inferredTopic: "Tree", visualizer: "tree-traversal" }
];

const failures = [];

if (!registrySource.includes('id: "generic"')) {
  failures.push("Visualizer registry must include GenericVisualizer.");
}

if (/visualizerRegistry\[2\]/.test(registrySource)) {
  failures.push("Visualizer registry must not fall back to BinarySearchVisualizer by array index.");
}

if (!problemSource.includes('visualization: "generic"')) {
  failures.push("Unknown problem fallback must use the generic visualizer.");
}

if (!problemSource.includes('slug.includes("binary-tree")') || !problemSource.includes('slug.includes("tree")')) {
  failures.push("Problem metadata must infer tree topics from tree slugs.");
}

for (const expectation of expectations) {
  if (expectation.slug === "two-sum" || expectation.slug === "binary-search") {
    const blockPattern = new RegExp(`"${expectation.slug}":[\\s\\S]*?visualization: "${expectation.visualizer}"`);
    if (!blockPattern.test(problemSource)) {
      failures.push(`${expectation.slug} must resolve to ${expectation.visualizer}.`);
    }
  }

  if (expectation.inferredTopic && !problemSource.includes(`visualization: "${expectation.visualizer}"`)) {
    failures.push(`${expectation.slug} inference must resolve to ${expectation.visualizer}.`);
  }
}

if (failures.length > 0) {
  console.error("Visualizer selection validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Visualizer selection validation passed.");

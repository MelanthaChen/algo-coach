import { readFileSync } from "node:fs";

const rules = JSON.parse(readFileSync("src/data/patternRules.json", "utf8"));

function inferPatterns(slug) {
  const patterns = [];
  for (const rule of rules) {
    if (rule.keywords.some((keyword) => slug.includes(keyword))) {
      for (const pattern of rule.patterns) {
        if (!patterns.includes(pattern)) patterns.push(pattern);
      }
    }
  }
  return patterns;
}

const expectations = {
  "two-sum": ["Hash Map"],
  "longest-substring-without-repeating-characters": ["Sliding Window"],
  "binary-tree-inorder-traversal": ["Tree Traversal"],
  "reverse-integer": ["Math", "Simulation"],
  "zigzag-conversion": ["Simulation", "String Manipulation"],
  "largest-rectangle-in-histogram": ["Monotonic Stack"],
  "coin-change": ["Dynamic Programming"]
};

const failures = [];

for (const [slug, expectedPatterns] of Object.entries(expectations)) {
  const actualPatterns = inferPatterns(slug);
  for (const expectedPattern of expectedPatterns) {
    if (!actualPatterns.includes(expectedPattern)) {
      failures.push(`${slug}: expected ${expectedPattern}, received ${actualPatterns.join(", ") || "none"}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Pattern classification validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Pattern classification validation passed.");

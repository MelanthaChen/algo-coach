import { readFileSync } from "node:fs";

const difficultyFixture = JSON.parse(readFileSync("src/data/problemDifficulties.json", "utf8"));
const problemSource = readFileSync("src/data/problems.ts", "utf8");

const expectedDifficulties = {
  "two-sum": "Easy",
  "binary-search": "Easy",
  "largest-rectangle-in-histogram": "Hard"
};

const failures = [];

for (const [slug, expectedDifficulty] of Object.entries(expectedDifficulties)) {
  const actualDifficulty = difficultyFixture[slug];
  if (actualDifficulty !== expectedDifficulty) {
    failures.push(`${slug}: expected ${expectedDifficulty}, received ${actualDifficulty ?? "missing"}`);
  }
}

if (!problemSource.includes('difficulty: "Difficulty unavailable"')) {
  failures.push('Unknown problem fallback must use difficulty: "Difficulty unavailable".');
}

if (/difficulty:\s*"Medium"[\s\S]*summary:\s*"AlgoCoach does not have curated metadata/.test(problemSource)) {
  failures.push('Unknown problem fallback must not default to Medium.');
}

if (failures.length > 0) {
  console.error("Problem difficulty validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Problem difficulty validation passed.");

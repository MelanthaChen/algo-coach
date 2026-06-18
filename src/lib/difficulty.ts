import type { ProblemDifficulty } from "../types/algo";

const DIFFICULTIES: ProblemDifficulty[] = ["Easy", "Medium", "Hard"];
const DIFFICULTY_PATTERN = /\b(Easy|Medium|Hard)\b/;

export function normalizeDifficulty(value: string | null | undefined): ProblemDifficulty | null {
  if (!value) return null;
  const match = value.match(DIFFICULTY_PATTERN);
  if (!match) return null;
  const difficulty = match[1] as ProblemDifficulty;
  return DIFFICULTIES.includes(difficulty) ? difficulty : null;
}

export function extractDifficultyFromDocument(documentRef: Document = document): ProblemDifficulty | null {
  const candidateSelectors = [
    '[diff]',
    '[data-difficulty]',
    '[class*="text-difficulty"]',
    '[class*="difficulty"]',
    'a[href*="/problemset/?difficulty="]',
    'div[class*="text-"][class*="Easy"]',
    'div[class*="text-"][class*="Medium"]',
    'div[class*="text-"][class*="Hard"]'
  ];

  for (const selector of candidateSelectors) {
    const elements = Array.from(documentRef.querySelectorAll(selector));
    for (const element of elements) {
      const attributeValue = element.getAttribute("diff") ?? element.getAttribute("data-difficulty") ?? element.getAttribute("aria-label");
      const normalizedAttribute = normalizeDifficulty(attributeValue);
      if (normalizedAttribute) return normalizedAttribute;

      const normalizedText = normalizeDifficulty(element.textContent);
      if (normalizedText) return normalizedText;
    }
  }

  const titleArea = documentRef.querySelector('[data-cy="question-title"]')?.parentElement?.parentElement;
  const scopedDifficulty = normalizeDifficulty(titleArea?.textContent);
  if (scopedDifficulty) return scopedDifficulty;

  return null;
}

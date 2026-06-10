const PROBLEM_PATH_PATTERN = /^\/problems\/([^/?#]+)\/?$/;

export function isLeetCodeProblemPath(pathname: string) {
  return PROBLEM_PATH_PATTERN.test(pathname);
}

export function slugFromPath(pathname: string) {
  const match = pathname.match(PROBLEM_PATH_PATTERN);
  return match?.[1] ?? null;
}

export function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

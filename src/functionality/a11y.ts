export function prefersReducedMotion(): boolean {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  return mediaQuery.matches ? true : false;
}

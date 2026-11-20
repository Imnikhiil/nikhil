const KEY = "nk-intro-seen"

/** Total time (ms) after which the hero entrance should start on first visit. */
export const INTRO_MS = 1500

/** Hero delay (s) on later visits — lets the page curtain finish lifting. */
const LATER_DELAY = 0.35

let decided: boolean | null = null

/** True only on the first load of a session (and when motion is allowed). */
export function shouldPlayIntro(): boolean {
  if (decided !== null) return decided

  let seen = false
  try {
    seen = sessionStorage.getItem(KEY) === "1"
  } catch {
    seen = false
  }

  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  decided = !seen && !reduced
  return decided
}

export function markIntroSeen() {
  decided = false
  try {
    sessionStorage.setItem(KEY, "1")
  } catch {
    /* storage can be blocked — ignore */
  }
}

/** Extra delay (seconds) for hero animations so they start after the preloader / curtain. */
export function introDelay(): number {
  return shouldPlayIntro() ? INTRO_MS / 1000 : LATER_DELAY
}
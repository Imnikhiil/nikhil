import type Lenis from "lenis"

let instance: Lenis | null = null

export function setLenis(next: Lenis | null) {
  instance = next
}

/** Jump to top instantly (works with or without Lenis). */
export function scrollToTop() {
  if (instance) {
    instance.scrollTo(0, { immediate: true, force: true })
  } else {
    window.scrollTo(0, 0)
  }
}
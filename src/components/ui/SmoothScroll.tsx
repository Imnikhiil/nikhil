import { useEffect } from "react"
import Lenis from "lenis"
import { useReducedMotion } from "framer-motion"
import { setLenis } from "../../lib/scroll"
import "./SmoothScroll.css"

export function SmoothScroll() {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: true,
      // Let the browser handle scrolling when a modal / menu locks the page
      prevent: (node) =>
        document.body.style.overflow === "hidden" ||
        Boolean(node.closest("[role='dialog'], [data-lenis-prevent]")),
    })

    setLenis(lenis)

    return () => {
      setLenis(null)
      lenis.destroy()
    }
  }, [reduce])

  return null
}
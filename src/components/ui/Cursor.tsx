import { useEffect, useState } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { useFinePointer } from "../../hooks/useMotion"
import "./Cursor.css"

type Mode = "idle" | "link" | "view" | "text"

const TEXT = "input, textarea, select, [contenteditable='true']"
const VIEW = ".home__project-hit, .work__card-hit, [data-cursor='view']"
const INTERACTIVE = "a, button, [role='button'], summary, label, [data-cursor]"

export function Cursor() {
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  const active = fine && !reduce

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 })

  const [mode, setMode] = useState<Mode>("idle")
  const [visible, setVisible] = useState(false)
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    if (!active) return

    const root = document.documentElement
    root.classList.add("has-cursor")

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }

    const onOver = (e: PointerEvent) => {
      const target = e.target
      if (!(target instanceof Element)) return
      if (target.closest(TEXT)) setMode("text")
      else if (target.closest(VIEW)) setMode("view")
      else if (target.closest(INTERACTIVE)) setMode("link")
      else setMode("idle")
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerover", onOver, { passive: true })
    window.addEventListener("pointerdown", onDown)
    window.addEventListener("pointerup", onUp)
    root.addEventListener("mouseleave", onLeave)
    root.addEventListener("mouseenter", onEnter)

    return () => {
      root.classList.remove("has-cursor")
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerover", onOver)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      root.removeEventListener("mouseleave", onLeave)
      root.removeEventListener("mouseenter", onEnter)
    }
  }, [active, x, y])

  if (!active) return null

  const shown = visible && mode !== "text"
  const scale = pressed ? 0.85 : mode === "view" ? 2.3 : mode === "link" ? 1.6 : 1

  return (
    <>
      <motion.div className="cursor" style={{ x: ringX, y: ringY }} aria-hidden>
        <motion.div
          className={`cursor__ring cursor__ring--${mode}`}
          animate={{ scale, opacity: shown ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
        />
        <span className={`cursor__label ${mode === "view" && shown ? "is-on" : ""}`}>View</span>
      </motion.div>

      <motion.div className="cursor" style={{ x, y }} aria-hidden>
        <span className={`cursor__dot ${shown && mode !== "view" ? "is-on" : ""}`} />
      </motion.div>
    </>
  )
}
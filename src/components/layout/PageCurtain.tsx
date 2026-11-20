import { motion, useReducedMotion, type Variants } from "framer-motion"
import "./PageCurtain.css"

const ease = [0.76, 0, 0.24, 1] as const

// Curtain rises from the bottom to cover the old page, then lifts away to reveal the new one.
const variants: Variants = {
  initial: { clipPath: "inset(0% 0% 0% 0%)" },
  animate: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: 0.75, ease, delay: 0.05 },
  },
  exit: {
    clipPath: ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
    transition: { duration: 0.55, ease },
  },
}

export function PageCurtain() {
  const reduce = useReducedMotion()
  if (reduce) return null

  return (
    <motion.div
      className="curtain"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      aria-hidden
    >
      <span className="curtain__mark" />
    </motion.div>
  )
}
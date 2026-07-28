import { useRef, type ReactNode, type MouseEvent, type CSSProperties } from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion"
import { useFinePointer } from "../../hooks/useMotion"
import "./MagneticTilt.css"

type MagneticTiltProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  strength?: number
}

export function MagneticTilt({ children, className, style, strength = 10 }: MagneticTiltProps) {
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 220, damping: 22 })
  const springY = useSpring(rotateY, { stiffness: 220, damping: 22 })

  const onMove = (e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateX.set((0.5 - py) * strength)
    rotateY.set((px - 0.5) * strength)
  }

  const onLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  if (reduce || !fine || strength <= 0) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={`tilt ${className ?? ""}`.trim()}
      style={{
        ...style,
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
        perspective: 900,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  )
}

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { markIntroSeen, shouldPlayIntro } from "../../lib/intro"
import { site } from "../../data/content"
import "./Preloader.css"

const COUNT_MS = 1100

export function Preloader() {
  const [show, setShow] = useState(() => shouldPlayIntro())
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!show) return

    document.body.style.overflow = "hidden"
    const start = performance.now()
    let raf = 0
    let timer = 0

    const tick = (now: number) => {
      const t = Math.min((now - start) / COUNT_MS, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setCount(Math.round(eased * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        timer = window.setTimeout(() => {
          markIntroSeen()
          document.body.style.overflow = ""
          setShow(false)
        }, 220)
      }
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(timer)
      document.body.style.overflow = ""
    }
  }, [show])

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="preloader"
          role="status"
          aria-label="Loading"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="preloader__inner">
            <p className="preloader__name">
              <span className="preloader__mask">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  {site.fullName}
                </motion.span>
              </span>
            </p>
            <p className="preloader__meta">{site.title}</p>
          </div>

          <div className="preloader__count" aria-hidden>
            {String(count).padStart(3, "0")}
          </div>
          <span className="preloader__bar" aria-hidden style={{ transform: `scaleX(${count / 100})` }} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
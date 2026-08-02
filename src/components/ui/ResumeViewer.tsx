import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
  type ReactNode,
} from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { site } from "../../data/content"
import "./Button.css"
import "./ResumeViewer.css"

type ResumeContextValue = {
  open: () => void
  close: () => void
}

const ResumeContext = createContext<ResumeContextValue | null>(null)

export function useResume() {
  const ctx = useContext(ResumeContext)
  if (!ctx) {
    throw new Error("useResume must be used within ResumeProvider")
  }
  return ctx
}

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const reduce = useReducedMotion()
  const titleId = useId()

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (!isOpen) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }

    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)

    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [isOpen, close])

  return (
    <ResumeContext.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="resume-viewer"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              className="resume-viewer__backdrop"
              aria-label="Close resume"
              onClick={close}
            />

            <motion.div
              className="resume-viewer__panel"
              initial={reduce ? false : { opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <header className="resume-viewer__bar">
                <h2 id={titleId} className="resume-viewer__title">
                  {site.fullName} — Resume
                </h2>
                <div className="resume-viewer__actions">
                  <a
                    className="resume-viewer__link"
                    href={site.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open tab
                  </a>
                  <a className="resume-viewer__link" href={site.resumeUrl} download="Nikhil_Kumar_Resume_2026.pdf">
                    Download
                  </a>
                  <button type="button" className="resume-viewer__close" onClick={close}>
                    Close
                  </button>
                </div>
              </header>

              <div className="resume-viewer__frame">
                <iframe
                  title={`${site.fullName} resume`}
                  src={`${site.resumeUrl}#toolbar=1&navpanes=0&view=FitH`}
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ResumeContext.Provider>
  )
}

type ResumeButtonProps = {
  variant?: "primary" | "ghost" | "text"
  className?: string
  children?: ReactNode
}

export function ResumeButton({
  variant = "primary",
  className = "",
  children = "View resume",
}: ResumeButtonProps) {
  const { open } = useResume()
  return (
    <button type="button" className={`btn btn--${variant} ${className}`.trim()} onClick={open}>
      {children}
    </button>
  )
}

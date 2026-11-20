import { useState, type PointerEvent as ReactPointerEvent } from "react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion"
import { idCardBack, site } from "../../data/content"
import { useFinePointer } from "../../hooks/useMotion"
import "./IdCard.css"
import "./IdCardLuxe.css"

type CardId = "profile" | "skills"

const swapEase = [0.22, 1, 0.36, 1] as const
const SWAP_MS = 720

const frontPose = { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 4 }
const backPoseLeft = { x: -42, y: 18, rotate: -14, scale: 0.93, zIndex: 1 }
const backPoseRight = { x: 42, y: 18, rotate: 14, scale: 0.93, zIndex: 1 }
const backPoseLeftMobile = { x: -18, y: 10, rotate: -8, scale: 0.96, zIndex: 1 }
const backPoseRightMobile = { x: 18, y: 10, rotate: 8, scale: 0.96, zIndex: 1 }

function swapTransition(toFront: boolean) {
  return {
    x: { duration: 0.68, ease: swapEase },
    y: { duration: 0.68, ease: swapEase },
    rotate: { duration: 0.68, ease: swapEase },
    scale: { duration: 0.68, ease: swapEase },
    zIndex: { delay: toFront ? 0.22 : 0.18, duration: 0 },
  }
}

function LanyardMount() {
  return (
    <svg className="badge__mount-svg" viewBox="0 0 64 72" fill="none" aria-hidden>
      <defs>
        <linearGradient id="metal" x1="12" y1="0" x2="52" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff6f2" />
          <stop offset="0.4" stopColor="#d8d0cc" />
          <stop offset="1" stopColor="#8f8682" />
        </linearGradient>
        <linearGradient id="strapSheen" x1="24" y1="0" x2="40" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="rgba(255,255,255,0.18)" />
          <stop offset="0.5" stopColor="rgba(255,255,255,0)" />
          <stop offset="1" stopColor="rgba(0,0,0,0.28)" />
        </linearGradient>
      </defs>

      <rect x="24" y="0" width="16" height="18" fill="#1a0f0c" />
      <rect x="24" y="0" width="16" height="18" fill="url(#strapSheen)" />
      <circle cx="32" cy="10" r="3.4" fill="url(#metal)" stroke="#b8aaa4" strokeWidth="0.8" />
      <circle cx="32" cy="28" r="7.2" stroke="url(#metal)" strokeWidth="3" fill="none" />
      <circle cx="32" cy="28" r="7.2" stroke="rgba(255,255,255,0.28)" strokeWidth="0.9" fill="none" />
      <rect x="18" y="42" width="28" height="8" rx="2.2" fill="url(#metal)" stroke="#b8aaa4" strokeWidth="0.8" />
      <rect x="29.5" y="36" width="5" height="10" rx="1.4" fill="url(#metal)" stroke="#b8aaa4" strokeWidth="0.6" />
      <rect x="29.2" y="50" width="5.6" height="12" rx="1.6" fill="url(#metal)" stroke="#b8aaa4" strokeWidth="0.7" />
      <circle cx="32" cy="64" r="2.6" fill="#0a0a0a" stroke="#d4ccc8" strokeWidth="1.1" />
    </svg>
  )
}

export function IdCard() {
  const [front, setFront] = useState<CardId>("profile")
  const [busy, setBusy] = useState(false)
  const reduce = useReducedMotion()
  const fine = useFinePointer()

  const swap = () => {
    if (busy) return
    setBusy(true)
    setFront((current) => (current === "profile" ? "skills" : "profile"))
    window.setTimeout(() => setBusy(false), SWAP_MS)
  }

  const profileFront = front === "profile"
  const canFloat = !reduce && fine
  const leftBack = fine ? backPoseLeft : backPoseLeftMobile
  const rightBack = fine ? backPoseRight : backPoseRightMobile

  // 3D tilt + pendulum swing + holographic foil (desktop mouse only)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const zero = useMotionValue(0)
  const springCfg = { stiffness: 140, damping: 16, mass: 0.6 }
  const sx = useSpring(px, springCfg)
  const sy = useSpring(py, springCfg)
  const rotateY = useTransform(sx, [-0.5, 0.5], [-13, 13])
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10])
  const swing = useTransform(sx, [-0.5, 0.5], [-3, 3])
  const tiltX = canFloat ? rotateX : zero
  const tiltY = canFloat ? rotateY : zero

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!canFloat || busy) return
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    px.set(nx)
    py.set(ny)
    el.style.setProperty("--fx", `${(nx + 0.5) * 100}%`)
    el.style.setProperty("--fy", `${(ny + 0.5) * 100}%`)
    el.style.setProperty("--fa", `${(nx + 0.5) * 360}deg`)
  }

  const onLeave = () => {
    px.set(0)
    py.set(0)
  }

  const [firstName, ...restName] = site.fullName.split(" ")
  const strapText = Array.from({ length: 6 }, () => `${site.fullName} · ${site.title}`).join(" · ")

  return (
    <motion.div
      className="badge"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={
        canFloat
          ? { opacity: 1, y: [0, -5, 0] }
          : { opacity: 1, y: 0 }
      }
      transition={
        canFloat
          ? {
              opacity: { duration: 0.55, delay: 0.1, ease: swapEase },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
            }
          : { duration: 0.55, delay: 0.1, ease: swapEase }
      }
    >
      <div className="badge__lanyard" aria-hidden>
        <span className="badge__strap">
          <span className="badge__strap-text">{strapText}</span>
        </span>
        <div className="badge__mount">
          <LanyardMount />
        </div>
      </div>

      <motion.div
        className={`badge__stack ${busy ? "is-swapping" : ""}`}
        style={canFloat ? { rotate: swing, transformOrigin: "50% 0%" } : undefined}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <motion.button
          type="button"
          className={`badge__card badge__card--skills ${profileFront ? "is-back" : "is-front"}`}
          initial={false}
          style={{
            rotateX: profileFront ? zero : tiltX,
            rotateY: profileFront ? zero : tiltY,
            transformPerspective: 900,
          }}
          animate={profileFront ? leftBack : frontPose}
          transition={reduce ? { duration: 0 } : swapTransition(!profileFront)}
          onClick={swap}
          whileHover={fine && !reduce && !busy ? { y: profileFront ? 14 : -4 } : undefined}
          aria-label="Swap ID cards"
        >
          <span className="badge__hole" aria-hidden />
          <span className="badge__sheen" aria-hidden />
          <span className="badge__foil" aria-hidden />
          <div className="badge__skills-inner">
            <div className="badge__brand">
              <span className="badge__mark" aria-hidden />
              <span className="badge__brand-name">{site.name}</span>
            </div>

            <p className="badge__credo">{idCardBack.credo}</p>

            <div className="badge__block">
              <p className="badge__skills-label">{idCardBack.heading}</p>
              <ul className="badge__skills">
                {idCardBack.highlights.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="badge__block badge__block--grow">
              <p className="badge__skills-label">Process</p>
              <ol className="badge__process">
                {idCardBack.process.map((step) => (
                  <li key={step.n}>
                    <span className="badge__process-n">{step.n}</span>
                    <span className="badge__process-label">{step.label}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="badge__skills-foot">
              <div className="badge__status">
                <span className="badge__status-dot" aria-hidden />
                <span>{idCardBack.status}</span>
              </div>
              <p className="badge__email">{site.email}</p>
              <div className="badge__barcode" aria-hidden>
                {Array.from({ length: 32 }, (_, i) => {
                  const w = [1, 2, 1, 1, 3, 1, 2, 1][i % 8]
                  return <span key={i} style={{ width: `${w}px` }} />
                })}
              </div>
              <p className="badge__id-code">ID · {site.idCode}</p>
            </div>
          </div>
        </motion.button>

        <motion.button
          type="button"
          className={`badge__card badge__card--profile ${profileFront ? "is-front" : "is-back"}`}
          initial={false}
          style={{
            rotateX: profileFront ? tiltX : zero,
            rotateY: profileFront ? tiltY : zero,
            transformPerspective: 900,
          }}
          animate={profileFront ? frontPose : rightBack}
          transition={reduce ? { duration: 0 } : swapTransition(profileFront)}
          onClick={swap}
          whileHover={fine && !reduce && !busy ? { y: profileFront ? -4 : 14 } : undefined}
          aria-label="Swap ID cards"
        >
          <span className="badge__hole" aria-hidden />
          <span className="badge__sheen" aria-hidden />
          <span className="badge__foil" aria-hidden />
          <div className="badge__photo">
            <img src={site.photo} alt={site.fullName} />
            <span className="badge__photo-wash" aria-hidden />
            <span className="badge__wave" aria-hidden />
            <span className="badge__pill">
              <i aria-hidden />
              Open to work
            </span>
            <span className="badge__seal" aria-hidden>
              <i />
            </span>
          </div>
          <div className="badge__info">
            <p className="badge__role">{site.title}</p>
            <h2 className="badge__name" aria-label={site.fullName}>
              {firstName} <em>{restName.join(" ")}</em>
            </h2>
            <div className="badge__meta">
              <span>{site.location}</span>
              <span>ID {site.idCode}</span>
            </div>
          </div>
        </motion.button>
      </motion.div>

      <p className="badge__hint">
        <span>Tap to flip</span>
        <span aria-hidden>↔</span>
      </p>
    </motion.div>
  )
}
import { useState } from "react"
import { Link } from "react-router-dom"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { projects, site } from "../data/content"
import { Seo } from "../components/Seo"
import { MagneticTilt } from "../components/ui/MagneticTilt"
import { Reveal, TextReveal } from "../hooks/useMotion"
import { introDelay } from "../lib/intro"
import "./Work.css"

const filters = ["All", ...Array.from(new Set(projects.flatMap((p) => p.kinds)))]
const pad = (n: number) => String(n).padStart(2, "0")

export function WorkPage() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState("All")
  const [base] = useState(() => introDelay())

  const visible = projects.filter((p) => active === "All" || p.kinds.includes(active))

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { y: "110%" },
          animate: { y: 0 },
          transition: { duration: 0.95, delay: base + delay, ease: [0.16, 1, 0.3, 1] as const },
        }

  return (
    <main className="page work">
      <Seo
        title="Work"
        description={`Selected live work by ${site.fullName} — research platforms, campus systems, and education sites.`}
        path="/work"
      />

      <div className="container">
        <Reveal className="work__header">
          <p className="work__index-label">Index · {pad(projects.length)} projects</p>
          <h1 className="work__title">
            <TextReveal text="Selected" delay={base + 0.05} />
            <br />
            <span className="work__mask">
              <motion.span className="work__title-serif" {...rise(0.2)}>
                work.
              </motion.span>
            </span>
          </h1>
          <p className="work__lead">
            Live products I’ve built and shipped — research platforms, campus systems, and education
            sites. Click a card to open the live site.
          </p>
        </Reveal>

        <Reveal className="work__filters" delay={0.1}>
          <div className="work__chips" role="group" aria-label="Filter projects">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                className={`work__chip${active === f ? " is-active" : ""}`}
                aria-pressed={active === f}
                onClick={() => setActive(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <p className="work__count">
            {pad(visible.length)} / {pad(projects.length)}
          </p>
        </Reveal>

        <div className="work__grid">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project, i) => {
              const href = project.liveUrl ?? `/work/${project.slug}`
              const external = Boolean(project.liveUrl)
              const index = projects.indexOf(project) + 1

              return (
                <motion.div
                  key={project.slug}
                  layout={!reduce}
                  className="work__cell"
                  exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Reveal delay={i * 0.07}>
                    <MagneticTilt
                      className="work__card"
                      style={{ ["--p-accent" as string]: project.accent }}
                      strength={reduce ? 0 : 8}
                    >
                      <motion.div
                        whileTap={reduce ? undefined : { scale: 0.985 }}
                        transition={{ type: "spring", stiffness: 360, damping: 26 }}
                      >
                        <a
                          className="work__card-hit"
                          href={href}
                          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                          aria-label={`Open ${project.title}${external ? " live site" : ""}`}
                        >
                          <div className="work__card-media">
                            <img src={project.image} alt="" loading="lazy" />
                            <span className="work__card-index" aria-hidden>
                              {pad(index)}
                            </span>
                            <div className="work__card-badges">
                              {project.liveUrl ? (
                                <span className="work__badge work__badge--live">Live</span>
                              ) : null}
                              {project.kinds.map((kind) => (
                                <span key={kind} className="work__badge">
                                  {kind}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="work__card-body">
                            <div className="work__card-meta">
                              <span>{project.year}</span>
                              <span>{project.role}</span>
                            </div>
                            <h2 className="work__card-title">{project.title}</h2>
                            <p className="work__card-text">{project.description}</p>

                            <div className="work__card-tags">
                              {project.tags.slice(0, 4).map((tag) => (
                                <span key={tag}>{tag}</span>
                              ))}
                            </div>

                            <div className="work__card-metrics">
                              {project.metrics.map((metric) => (
                                <div key={metric.label} className="work__card-metric">
                                  <strong>{metric.value}</strong>
                                  <span>{metric.label}</span>
                                </div>
                              ))}
                            </div>
                            <span className="work__card-cta">
                              {external ? "View site" : "View project"}
                              <span aria-hidden>→</span>
                            </span>
                          </div>
                        </a>

                        <Link to={`/work/${project.slug}`} className="work__card-detail">
                          Case study
                        </Link>
                      </motion.div>
                    </MagneticTilt>
                  </Reveal>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}
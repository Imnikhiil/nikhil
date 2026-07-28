import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "framer-motion"
import { projects, site } from "../data/content"
import { Seo } from "../components/Seo"
import { MagneticTilt } from "../components/ui/MagneticTilt"
import { Reveal, TextReveal } from "../hooks/useMotion"
import "./Work.css"

export function WorkPage() {
  const reduce = useReducedMotion()

  return (
    <main className="page work">
      <Seo
        title="Work"
        description={`Selected live work by ${site.fullName} — research platforms, campus systems, and education sites.`}
        path="/work"
      />

      <div className="container">
        <Reveal className="work__header">
          <p className="work__index-label">Index</p>
          <h1 className="work__title">
            <TextReveal text="Selected" delay={0.05} />
            <br />
            <TextReveal text="work" delay={0.18} />
          </h1>
          <p className="work__lead">
            Live products I’ve built and shipped — research platforms, campus systems, and education sites.
            Click a card to open the live site.
          </p>
        </Reveal>

        <div className="work__grid">
          {projects.map((project, i) => {
            const href = project.liveUrl ?? `/work/${project.slug}`
            const external = Boolean(project.liveUrl)

            return (
              <Reveal key={project.slug} delay={i * 0.07}>
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
                        <h2 className="work__card-title">{project.title}</h2>
                        <p className="work__card-text">{project.description}</p>
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
                      Details
                    </Link>
                  </motion.div>
                </MagneticTilt>
              </Reveal>
            )
          })}
        </div>
      </div>
    </main>
  )
}

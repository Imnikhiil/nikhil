import { motion, useReducedMotion } from "framer-motion"
import { useState, type PointerEvent } from "react"
import { Link } from "react-router-dom"
import {
  experience,
  focusAreas,
  homeCreds,
  processSteps,
  projects,
  site,
  testimonials,
} from "../data/content"
import { Button } from "../components/ui/Button"
import { IdCard } from "../components/ui/IdCard"
import { ResumeButton } from "../components/ui/ResumeViewer"
import { Seo } from "../components/Seo"
import { Reveal, useFinePointer } from "../hooks/useMotion"
import { introDelay } from "../lib/intro"
import "./Home.css"
import "./HomeHero.css"

const heroSkills = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Framer Motion",
]

const internships = experience.filter((e) => /intern/i.test(e.role)).length

const heroStats = [
  { value: String(projects.length).padStart(2, "0"), label: "Live projects" },
  { value: String(internships).padStart(2, "0"), label: "Internships" },
  { value: "2023–26", label: "DSEU · CSE Diploma" },
]

export function HomePage() {
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  // Hero starts after the preloader on first visit; instantly on later visits.
  const [base] = useState(() => introDelay())

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay: base + delay, ease: [0.16, 1, 0.3, 1] as const },
        }

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { y: "110%" },
          animate: { y: 0 },
          transition: { duration: 0.95, delay: base + delay, ease: [0.16, 1, 0.3, 1] as const },
        }

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!fine || reduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`)
  }

  return (
    <main className="page home">
      <Seo title={`${site.fullName} — ${site.title}`} description={site.tagline} path="/" />

      <section className="hero" onPointerMove={onMove}>
        <div className="hero__bleed" aria-hidden>
          <span className="hero__grid" />
          <span className="hero__spot" />
        </div>

        <div className="container hero__layout">
          <div className="hero__stage">
            <motion.p className="hero__badge" {...fade(0.05)}>
              <span className="hero__pulse" aria-hidden />
              Open for work · {site.location}
            </motion.p>

            <h1 className="hero__name" aria-label={site.fullName}>
              <span className="hero__mask" aria-hidden>
                <motion.span className="hero__word" {...rise(0.12)}>
                  Nikhil
                </motion.span>
              </span>
              <span className="hero__mask" aria-hidden>
                <motion.span className="hero__word hero__word--serif" {...rise(0.24)}>
                  Kumar.
                </motion.span>
              </span>
            </h1>

            <motion.p className="hero__role" {...fade(0.42)}>
              <span>{site.title}</span>
              <i aria-hidden />
              <span>Frontend · Backend · Product</span>
            </motion.p>

            <motion.p className="hero__tagline" {...fade(0.5)}>
              {site.tagline}
            </motion.p>

            <motion.div className="hero__cta" {...fade(0.58)}>
              <Button to="/work">See the work</Button>
              <ResumeButton variant="ghost">Resume</ResumeButton>
            </motion.div>

            <motion.dl className="hero__stats" {...fade(0.68)}>
              {heroStats.map((stat) => (
                <div key={stat.label} className="hero__stat">
                  <dt>{stat.label}</dt>
                  <dd className="text-gradient">{stat.value}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <div className="home__card hero__card">
            <IdCard />
          </div>
        </div>

        <motion.div className="home__marquee hero__marquee" {...fade(0.8)} aria-hidden>
          <div className="home__marquee-track">
            {[...heroSkills, ...heroSkills].map((skill, i) => (
              <span key={`${skill}-${i}`}>{skill}</span>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="home__band home__creds">
        <div className="container home__creds-row">
          {homeCreds.map((item, i) => (
            <Reveal key={item.label} className="home__cred" delay={i * 0.06}>
              <span className="home__cred-label">{item.label}</span>
              <span className="home__cred-value">{item.value}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="home__band">
        <div className="container">
          <Reveal className="home__section-head">
            <p className="home__section-label">Process</p>
            <h2 className="home__section-title">How projects move.</h2>
          </Reveal>

          <div className="home__process">
            {processSteps.map((step, i) => (
              <Reveal key={step.title} className="home__process-step" delay={i * 0.08} y={36}>
                <span className="home__process-index">0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                {i < processSteps.length - 1 ? (
                  <span className="home__process-arrow" aria-hidden>
                    →
                  </span>
                ) : null}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home__band">
        <div className="container">
          <Reveal className="home__section-head">
            <p className="home__section-label">Selected work</p>
            <div className="home__section-row">
              <h2 className="home__section-title">Live work I've shipped.</h2>
              <Button to="/work" variant="text">
                View all
              </Button>
            </div>
          </Reveal>

          <div className="home__projects">
            {projects.map((project, i) => {
              const href = project.liveUrl ?? `/work/${project.slug}`
              const external = Boolean(project.liveUrl)

              return (
                <Reveal key={project.slug} delay={i * 0.08}>
                  <motion.article
                    className="home__project"
                    style={{ ["--p-accent" as string]: project.accent }}
                    whileHover={fine && !reduce ? { y: -6, scale: 1.01 } : undefined}
                    transition={{ type: "spring", stiffness: 340, damping: 26 }}
                  >
                    <a
                      className="home__project-hit"
                      href={href}
                      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                      aria-label={`Open ${project.title}${external ? " live site" : ""}`}
                    >
                      <div className="home__project-visual">
                        <img src={project.image} alt="" loading="lazy" />
                        <div className="home__project-badges">
                          {project.liveUrl ? (
                            <span className="home__project-badge home__project-badge--live">Live</span>
                          ) : null}
                        </div>
                      </div>
                      <div className="home__project-body">
                        <div className="home__project-meta">
                          <span>{project.year}</span>
                          <span>{project.role}</span>
                        </div>
                        <h3>{project.title}</h3>
                        <p>{project.tagline}</p>
                        <div className="home__project-metrics">
                          {project.metrics.map((metric) => (
                            <span key={metric.label}>
                              <strong>{metric.value}</strong> {metric.label}
                            </span>
                          ))}
                        </div>
                        <span className="home__project-cta">
                          {external ? "View site" : "View project"}
                          <span aria-hidden>→</span>
                        </span>
                      </div>
                    </a>
                    <Link to={`/work/${project.slug}`} className="home__project-detail">
                      Details
                    </Link>
                  </motion.article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="home__band">
        <div className="container">
          <Reveal className="home__section-head">
            <p className="home__section-label">What I do</p>
            <h2 className="home__section-title">Three lanes. One standard.</h2>
          </Reveal>

          <div className="home__focus">
            {focusAreas.map((area, i) => (
              <Reveal key={area.title} className="home__focus-item" delay={i * 0.08}>
                <span className="home__focus-index">0{i + 1}</span>
                <h3>{area.title}</h3>
                <p>{area.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home__band">
        <div className="container">
          <Reveal className="home__section-head">
            <p className="home__section-label">Words</p>
            <h2 className="home__section-title">From people I've built with.</h2>
          </Reveal>

          <div className="home__quotes">
            {testimonials.map((item, i) => (
              <Reveal key={item.name} className="home__quote" delay={i * 0.08}>
                <p className="home__quote-mark" aria-hidden>
                  "
                </p>
                <blockquote>{item.quote}</blockquote>
                <footer>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </footer>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home__band home__cta-band">
        <div className="container">
          <Reveal className="home__cta-panel">
            <div>
              <p className="home__section-label">Next</p>
              <h2 className="home__cta-title">Have a project in mind?</h2>
              <p className="home__cta-lead">
                Tell me what you're building — I'll reply with a clear yes, no, or better approach.
              </p>
            </div>
            <Button to="/contact">Let's talk</Button>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
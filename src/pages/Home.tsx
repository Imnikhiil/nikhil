import { motion, useReducedMotion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  focusAreas,
  homeCreds,
  homeMotive,
  idCardBack,
  processSteps,
  projects,
  site,
  testimonials,
} from "../data/content"
import { Button } from "../components/ui/Button"
import { IdCard } from "../components/ui/IdCard"
import { ResumeButton } from "../components/ui/ResumeViewer"
import { Seo } from "../components/Seo"
import { Reveal, TextReveal, useFinePointer } from "../hooks/useMotion"
import "./Home.css"

export function HomePage() {
  const reduce = useReducedMotion()
  const fine = useFinePointer()

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: [0.2, 0.8, 0.2, 1] as const },
        }

  return (
    <main className="page home">
      <Seo title={`${site.fullName} — ${site.title}`} description={site.tagline} path="/" />

      <section className="home__hero">
        <div className="home__bleed" aria-hidden>
          <span className="home__grid" />
        </div>

        <div className="container home__layout">
          <div className="home__stage">
            <motion.p className="home__role" {...fade(0.05)}>
              {site.title}
            </motion.p>

            <h1 className="home__name">
              <TextReveal text={site.name} delay={0.12} />
            </h1>

            <motion.p className="home__line" {...fade(0.34)}>
              {site.tagline}
            </motion.p>

            <motion.div className="home__cta" {...fade(0.45)}>
              <Button to="/work">See the work</Button>
              <ResumeButton variant="ghost">Resume</ResumeButton>
            </motion.div>

            <motion.figure className="home__code home__code--hero" {...fade(0.52)} aria-label="Coding motive">
              <div className="home__code-bar">
                <span className="home__code-dots" aria-hidden>
                  <i />
                  <i />
                  <i />
                </span>
                <span className="home__code-file">{homeMotive.file}</span>
              </div>
              <pre className="home__code-body">
                <code>
                  <span className="home__code-line">
                    <span className="tok-c">{`<!-- ${homeMotive.comment} -->`}</span>
                  </span>
                  <span className="home__code-line">
                    <span>
                      <span className="tok-p">&lt;</span>
                      <span className="tok-t">h1</span>
                      <span className="tok-p">&gt;</span>
                      <span className="tok-x">{homeMotive.headline}</span>
                      <span className="tok-p">&lt;/</span>
                      <span className="tok-t">h1</span>
                      <span className="tok-p">&gt;</span>
                    </span>
                  </span>
                  <span className="home__code-line">
                    <span>
                      <span className="tok-p">&lt;</span>
                      <span className="tok-t">p</span>
                      <span className="tok-p">&gt;</span>
                      <span className="tok-x">{homeMotive.line}</span>
                      <span className="tok-p">&lt;/</span>
                      <span className="tok-t">p</span>
                      <span className="tok-p">&gt;</span>
                      <span className="tok-cursor" aria-hidden />
                    </span>
                  </span>
                </code>
              </pre>
            </motion.figure>

            <motion.div className="home__marquee" {...fade(0.6)} aria-hidden>
              <div className="home__marquee-track">
                {[...idCardBack.highlights, ...idCardBack.highlights].map((skill, i) => (
                  <span key={`${skill}-${i}`}>{skill}</span>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="home__card">
            <IdCard />
          </div>
        </div>
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

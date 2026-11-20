import { motion, useReducedMotion } from "framer-motion"
import { useState, type PointerEvent } from "react"
import { Link } from "react-router-dom"
import {
  experience,
  focusAreas,
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
import "./HomeSections.css"

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

      <section className="hs-section">
        <div className="container">
          <Reveal className="hs-head">
            <p className="hs-label">Selected work</p>
            <div className="hs-head__row">
              <h2 className="hs-title">
                Live work I’ve <em>shipped.</em>
              </h2>
              <Button to="/work" variant="text">
                View all
              </Button>
            </div>
          </Reveal>

          <div className="hs-projects">
            {projects.map((project, i) => {
              const href = project.liveUrl ?? `/work/${project.slug}`
              const external = Boolean(project.liveUrl)

              return (
                <motion.article
                  key={project.slug}
                  className="hs-project"
                  style={{ ["--p-accent" as string]: project.accent, ["--i" as string]: i }}
                  {...(reduce
                    ? {}
                    : {
                        initial: { opacity: 0, y: 40 },
                        whileInView: { opacity: 1, y: 0 },
                        viewport: { once: true, amount: 0.15 },
                        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
                      })}
                >
                  <a
                    className="hs-project__visual"
                    href={href}
                    data-cursor="view"
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    aria-label={`Open ${project.title}${external ? " live site" : ""}`}
                  >
                    <img src={project.image} alt="" loading="lazy" />
                    <span className="hs-project__index" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                      <small>/ {String(projects.length).padStart(2, "0")}</small>
                    </span>
                    {project.liveUrl ? <span className="hs-project__live">Live</span> : null}
                  </a>

                  <div className="hs-project__body">
                    <div className="hs-project__meta">
                      <span>{project.year}</span>
                      <span>{project.role}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.tagline}</p>

                    <div className="hs-project__tags">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    <div className="hs-project__metrics">
                      {project.metrics.map((metric) => (
                        <div key={metric.label}>
                          <strong>{metric.value}</strong>
                          <span>{metric.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="hs-project__links">
                      <a
                        className="hs-project__cta"
                        href={href}
                        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                      >
                        {external ? "View site" : "View project"} <span aria-hidden>→</span>
                      </a>
                      <Link to={`/work/${project.slug}`} className="hs-project__case">
                        Case study
                      </Link>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="hs-section">
        <div className="container">
          <Reveal className="hs-head">
            <p className="hs-label">What I do</p>
            <h2 className="hs-title">
              Three lanes. <em>One standard.</em>
            </h2>
          </Reveal>

          <div className="hs-focus">
            {focusAreas.map((area, i) => (
              <Reveal key={area.title} delay={i * 0.08}>
                <div className="hs-card">
                  <span className="hs-card__n">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{area.title}</h3>
                  <p>{area.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="hs-section">
        <div className="container">
          <Reveal className="hs-head">
            <p className="hs-label">Process</p>
            <h2 className="hs-title">
              How projects <em>move.</em>
            </h2>
          </Reveal>

          <div className="hs-process">
            {processSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="hs-step">
                  <span className="hs-step__n">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="hs-section">
        <div className="container">
          <Reveal className="hs-head">
            <p className="hs-label">Words</p>
            <h2 className="hs-title">
              From people I’ve <em>built with.</em>
            </h2>
          </Reveal>

          <div className="hs-quotes">
            {testimonials.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.08}>
                <figure className="hs-quote">
                  <span className="hs-quote__mark" aria-hidden>
                    “
                  </span>
                  <blockquote>{item.quote}</blockquote>
                  <figcaption>
                    <span className="hs-quote__avatar" aria-hidden>
                      {item.name
                        .split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <span>
                      <strong>{item.name}</strong>
                      <small>{item.role}</small>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
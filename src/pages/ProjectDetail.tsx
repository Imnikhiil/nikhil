import { useRef } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { getProject, projects, testimonials } from "../data/content"
import { Seo } from "../components/Seo"
import { Reveal } from "../hooks/useMotion"
import "./ProjectDetail.css"
import "./ProjectDetailExtra.css"

function ParallaxImage({ src, alt, reduce }: { src: string; alt: string; reduce: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"])

  return (
    <div ref={ref} className="project__parallax">
      <motion.img
        src={src}
        alt={alt}
        style={reduce ? undefined : { y, scale: 1.14 }}
        whileHover={reduce ? undefined : { scale: 1.19 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = slug ? getProject(slug) : undefined
  const reduce = useReducedMotion()

  if (!project) {
    return <Navigate to="/work" replace />
  }

  const live = project.liveUrl
  const next = projects[(projects.findIndex((p) => p.slug === project.slug) + 1) % projects.length]
  const quote =
    testimonials.find((t) => t.name.toLowerCase().includes(project.title.split(" ")[0].toLowerCase())) ??
    testimonials[0]

  const tile = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28, scale: 0.98 },
          whileInView: { opacity: 1, y: 0, scale: 1 },
          viewport: { once: true, amount: 0.25 },
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <main className="page project" style={{ ["--p-accent" as string]: project.accent }}>
      <Seo
        title={project.title}
        description={project.tagline}
        path={`/work/${project.slug}`}
        image={project.image}
      />

      <div className="container">
        <Reveal>
          <Link to="/work" className="project__back">
            ← All work
          </Link>
        </Reveal>

        <Reveal className="project__intro" delay={0.04}>
          <div className="project__meta-row">
            <span>{project.year}</span>
            <span>{project.role}</span>
          </div>
          <h1 className="project__title">{project.title}</h1>
          <p className="project__tagline">{project.tagline}</p>
          <div className="project__metrics">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="project__metric">
                <span className="project__metric-value">{metric.value}</span>
                <span className="project__metric-label">{metric.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="project__bento" style={{ ["--p-accent" as string]: project.accent }}>
          <motion.div
            className={`project__tile project__tile--hero${live ? " project__tile--link" : ""}`}
            whileHover={reduce || !live ? undefined : { y: -4 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            {...tile(0.05)}
          >
            {live ? (
              <a
                className="project__hero-link"
                href={live}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title} live site`}
              >
                <ParallaxImage src={project.image} alt={`${project.title} preview`} reduce={reduce} />
              </a>
            ) : (
              <ParallaxImage src={project.image} alt={`${project.title} preview`} reduce={reduce} />
            )}
            <div className="project__tile-badges">
              {live ? <span className="project__badge project__badge--live">Live</span> : null}
              {project.kinds.map((kind) => (
                <span key={kind} className="project__badge">
                  {kind}
                </span>
              ))}
            </div>
            {live ? (
              <span className="project__hero-hint" aria-hidden>
                Open live site <span>→</span>
              </span>
            ) : null}
          </motion.div>

          <motion.article className="project__tile project__tile--text" {...tile(0.1)}>
            <h2>Problem</h2>
            <p>{project.problem}</p>
          </motion.article>

          <motion.article className="project__tile project__tile--text" {...tile(0.14)}>
            <h2>Solution</h2>
            <p>{project.outcome}</p>
          </motion.article>

          <motion.article className="project__tile project__tile--features" {...tile(0.18)}>
            <h2>Key features</h2>
            <ul>
              {project.features.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={reduce ? false : { opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.22 + i * 0.05, duration: 0.4 }}
                >
                  <span className="project__check" aria-hidden>
                    ✓
                  </span>
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.article>

          <motion.article className="project__tile project__tile--stack" {...tile(0.22)}>
            <h2>Tech stack</h2>
            <div className="project__pills">
              {project.tags.map((tag) => (
                <span key={tag} className="project__pill">
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>

          <motion.div className="project__tile project__tile--cta" {...tile(0.26)}>
            {live ? (
              <motion.a
                className="project__live"
                href={live}
                target="_blank"
                rel="noreferrer"
                whileHover={reduce ? undefined : { scale: 1.03, y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              >
                View live site <span aria-hidden>→</span>
              </motion.a>
            ) : null}
            {project.repoUrl ? (
              <a className="project__repo" href={project.repoUrl} target="_blank" rel="noreferrer">
                View code
              </a>
            ) : null}
          </motion.div>

          {quote ? (
            <motion.blockquote className="project__tile project__tile--quote" {...tile(0.3)}>
              <p>“{quote.quote}”</p>
              <footer>
                <strong>{quote.name}</strong>
                <span>{quote.role}</span>
              </footer>
            </motion.blockquote>
          ) : null}
        </div>

        <Reveal className="project__context" delay={0.12}>
          <h2>Context</h2>
          <p>{project.description}</p>
        </Reveal>

        <Reveal className="project__next" delay={0.08}>
          <p className="project__next-label">Next project</p>
          <Link
            to={`/work/${next.slug}`}
            className="project__next-link"
            data-cursor="view"
            style={{ ["--p-accent" as string]: next.accent }}
          >
            <span className="project__next-title">{next.title}</span>
            <span className="project__next-arrow" aria-hidden>
              →
            </span>
            <img className="project__next-thumb" src={next.image} alt="" loading="lazy" />
          </Link>
        </Reveal>
      </div>
    </main>
  )
}
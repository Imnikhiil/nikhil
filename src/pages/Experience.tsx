import { education, experience, site } from "../data/content"
import { Seo } from "../components/Seo"
import { Reveal } from "../hooks/useMotion"
import "./Experience.css"

export function ExperiencePage() {
  return (
    <main className="page experience">
      <Seo
        title="Experience"
        description={`Internships, freelance work, and education — ${site.fullName}, Diploma CSE at DSEU.`}
        path="/experience"
      />

      <div className="container">
        <Reveal className="experience__header">
          <p className="experience__label">Experience</p>
          <h1 className="experience__title">
            Path so
            <br />
            far
          </h1>
          <p className="experience__lead">
            Roles and internships aligned with my CV — plus the live products I’ve shipped.
          </p>
        </Reveal>

        <div className="experience__track">
          {experience.map((item, i) => (
            <Reveal key={`${item.company}-${item.role}`} className="experience__item" delay={i * 0.06}>
              <div className="experience__period">{item.period}</div>
              <div className="experience__marker" aria-hidden />
              <div className="experience__content">
                <h2>{item.role}</h2>
                <p className="experience__company">{item.company}</p>
                <p className="experience__summary">{item.summary}</p>
                <ul className="experience__bullets">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="experience__edu" delay={0.1}>
          <p className="experience__label">Education</p>
          <h2 className="experience__edu-title">Study</h2>
          <div className="experience__edu-list">
            {education.map((item) => (
              <article key={`${item.school}-${item.period}`} className="experience__edu-card">
                <span className="experience__edu-period">{item.period}</span>
                <h3>{item.program}</h3>
                <p className="experience__edu-school">{item.school}</p>
                {item.detail ? <p className="experience__edu-detail">{item.detail}</p> : null}
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </main>
  )
}

import { about, education, site, skillGroups } from "../data/content"
import { Button } from "../components/ui/Button"
import { ResumeButton } from "../components/ui/ResumeViewer"
import { Seo } from "../components/Seo"
import { Reveal } from "../hooks/useMotion"
import "./About.css"

export function AboutPage() {
  return (
    <main className="page about">
      <Seo
        title="About"
        description={`${about.heading} ${about.paragraphs[0]}`}
        path="/about"
      />

      <div className="container about__grid">
        <div className="about__main">
          <Reveal>
            <p className="about__label">About</p>
            <h1 className="about__title">{about.heading}</h1>
          </Reveal>

          <Reveal className="about__portrait" delay={0.05}>
            <div className="about__portrait-frame">
              <img src={site.photo} alt={site.fullName} />
            </div>
          </Reveal>

          <Reveal className="about__copy" delay={0.08}>
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          <Reveal className="about__actions" delay={0.09}>
            <ResumeButton variant="primary">View resume</ResumeButton>
            <Button to="/contact" variant="ghost">
              Contact
            </Button>
          </Reveal>

          <Reveal className="about__edu" delay={0.1}>
            <h2 className="about__skills-title">Education</h2>
            <div className="about__edu-list">
              {education.map((item) => (
                <div key={`${item.school}-${item.period}`} className="about__edu-item">
                  <span>{item.period}</span>
                  <h3>{item.program}</h3>
                  <p>{item.school}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="about__values" delay={0.11}>
            <h2 className="about__skills-title">How I work</h2>
            <div className="about__value-list">
              {about.values.map((item) => (
                <div key={item.title} className="about__value">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="about__skills" delay={0.12}>
            <h2 className="about__skills-title">What I work with</h2>
            <div className="about__skill-cols">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="about__side" delay={0.1}>
          {about.meta.map((item) => (
            <div key={item.label} className="about__meta">
              <span className="about__meta-label">{item.label}</span>
              <span className="about__meta-value">{item.value}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </main>
  )
}

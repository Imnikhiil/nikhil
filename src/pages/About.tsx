import {
  about,
  education,
  experience,
  homeMotive,
  projects,
  site,
  skillGroups,
} from "../data/content"
import { Button } from "../components/ui/Button"
import { ResumeButton } from "../components/ui/ResumeViewer"
import { Seo } from "../components/Seo"
import { Reveal } from "../hooks/useMotion"
import "./About.css"

const pad = (n: number) => String(n).padStart(2, "0")
const internships = experience.filter((e) => /intern/i.test(e.role)).length

export function AboutPage() {
  const cut = about.heading.indexOf(". ")
  const lead = cut > -1 ? about.heading.slice(0, cut + 1) : about.heading
  const tail = cut > -1 ? about.heading.slice(cut + 2) : ""

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
            <h1 className="about__title">
              {lead}
              {tail ? (
                <>
                  <br />
                  <em>{tail}</em>
                </>
              ) : null}
            </h1>
          </Reveal>

          <Reveal className="about__portrait" delay={0.05}>
            <div className="about__portrait-frame">
              <img src={site.photo} alt={site.fullName} />
              <span className="about__portrait-pill">
                <i aria-hidden />
                {site.location}
              </span>
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

          <Reveal className="about__code-wrap" delay={0.1}>
            <figure className="about__code" aria-label="Coding motive">
              <div className="about__code-bar">
                <span className="about__code-dots" aria-hidden>
                  <i />
                  <i />
                  <i />
                </span>
                <span className="about__code-file">{homeMotive.file}</span>
              </div>
              <pre className="about__code-body">
                <code>
                  <span className="about__code-line">
                    <span className="tok-c">{`<!-- ${homeMotive.comment} -->`}</span>
                  </span>
                  <span className="about__code-line">
                    <span className="tok-p">&lt;</span>
                    <span className="tok-t">h1</span>
                    <span className="tok-p">&gt;</span>
                    <span className="tok-x">{homeMotive.headline}</span>
                    <span className="tok-p">&lt;/</span>
                    <span className="tok-t">h1</span>
                    <span className="tok-p">&gt;</span>
                  </span>
                  <span className="about__code-line">
                    <span className="tok-p">&lt;</span>
                    <span className="tok-t">p</span>
                    <span className="tok-p">&gt;</span>
                    <span className="tok-x">{homeMotive.line}</span>
                    <span className="tok-p">&lt;/</span>
                    <span className="tok-t">p</span>
                    <span className="tok-p">&gt;</span>
                    <span className="tok-cursor" aria-hidden />
                  </span>
                </code>
              </pre>
            </figure>
          </Reveal>

          <section className="about__section">
            <Reveal>
              <h2 className="about__heading">How I work</h2>
            </Reveal>
            <div className="about__value-list">
              {about.values.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.08}>
                  <div className="about__value">
                    <span className="about__value-n">{pad(i + 1)}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="about__section">
            <Reveal>
              <h2 className="about__heading">What I work with</h2>
            </Reveal>
            <div className="about__skill-cols">
              {skillGroups.map((group, i) => (
                <Reveal key={group.title} delay={i * 0.08}>
                  <div className="about__skill-card">
                    <h3>{group.title}</h3>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="about__section">
            <Reveal>
              <h2 className="about__heading">Education</h2>
            </Reveal>
            <div className="about__edu-list">
              {education.map((item, i) => (
                <Reveal key={`${item.school}-${item.period}`} delay={i * 0.08}>
                  <div className="about__edu-item">
                    <span>{item.period}</span>
                    <h3>{item.program}</h3>
                    <p>{item.school}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </div>

        <Reveal className="about__side" delay={0.1}>
          <div className="about__stats">
            <div>
              <strong className="text-gradient">{pad(projects.length)}</strong>
              <span>Live projects</span>
            </div>
            <div>
              <strong className="text-gradient">{pad(internships)}</strong>
              <span>Internships</span>
            </div>
          </div>
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
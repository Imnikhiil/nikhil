import { useState, type FormEvent } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { contact, site } from "../data/content"
import { Button } from "../components/ui/Button"
import { ResumeButton } from "../components/ui/ResumeViewer"
import { Seo } from "../components/Seo"
import { Reveal } from "../hooks/useMotion"
import "./Contact.css"

const socials = [
  { label: "GitHub", href: site.socials.github },
  { label: "LinkedIn", href: site.socials.linkedin },
]

export function ContactPage() {
  const reduce = useReducedMotion()
  const [sentHint, setSentHint] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const brief = String(data.get("brief") ?? "").trim()

    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "someone"}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nBrief:\n${brief}\n`,
    )

    setSentHint(true)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
  }

  return (
    <main className="page contact">
      <Seo
        title="Contact"
        description={`Get in touch with ${site.fullName} — ${contact.lead}`}
        path="/contact"
      />

      <div className="container contact__layout">
        <div className="contact__stage">
          <Reveal>
            <p className="contact__label">Contact</p>
            <h1 className="contact__title">{contact.heading}</h1>
            <p className="contact__lead">{contact.lead}</p>
            <p className="contact__note">{contact.availabilityNote}</p>
          </Reveal>

          <Reveal className="contact__hero-mail" delay={0.1}>
            <motion.a
              href={`mailto:${site.email}`}
              whileHover={reduce ? undefined : { x: 6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {site.email}
            </motion.a>
          </Reveal>

          <Reveal className="contact__actions" delay={0.16}>
            <ResumeButton variant="primary">View resume</ResumeButton>
          </Reveal>

          <div className="contact__bar">
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.08, duration: 0.5 }}
                whileHover={{ y: -3 }}
              >
                {s.label}
              </motion.a>
            ))}
          </div>
        </div>

        <Reveal className="contact__form-wrap" delay={0.12}>
          <form className="contact__form" onSubmit={onSubmit}>
            <h2 className="contact__form-title">Send a brief</h2>
            <p className="contact__form-lead">Name, email, and what you’re building. Opens your mail app.</p>

            <label className="contact__field">
              <span>Name</span>
              <input name="name" type="text" autoComplete="name" required placeholder="Your name" />
            </label>

            <label className="contact__field">
              <span>Email</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@email.com"
              />
            </label>

            <label className="contact__field">
              <span>Brief</span>
              <textarea
                name="brief"
                required
                rows={5}
                placeholder="What are you building? Timeline? Constraints?"
              />
            </label>

            <Button type="submit" variant="primary">
              Send message
            </Button>

            {sentHint ? (
              <p className="contact__form-hint">Your email app should open with the message ready.</p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </main>
  )
}

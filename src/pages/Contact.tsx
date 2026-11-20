import { useState, type FormEvent } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { contact, site } from "../data/content"
import { Button } from "../components/ui/Button"
import { ResumeButton } from "../components/ui/ResumeViewer"
import { Seo } from "../components/Seo"
import { Reveal } from "../hooks/useMotion"
import "./Contact.css"

const channels = [
  { label: "GitHub", value: site.socials.github.replace(/^https?:\/\/(www\.)?github\.com\//, ""), href: site.socials.github },
  { label: "LinkedIn", value: site.fullName, href: site.socials.linkedin },
]

export function ContactPage() {
  const reduce = useReducedMotion()
  const [sentHint, setSentHint] = useState(false)
  const [copied, setCopied] = useState(false)

  const cut = contact.heading.lastIndexOf(" ")
  const lead = cut > -1 ? contact.heading.slice(0, cut) : contact.heading
  const last = cut > -1 ? contact.heading.slice(cut + 1) : ""

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const brief = String(data.get("brief") ?? "").trim()

    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "someone"}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nBrief:\n${brief}\n`)

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
            <h1 className="contact__title">
              {lead} {last ? <em>{last}</em> : null}
            </h1>
            <p className="contact__lead">{contact.lead}</p>
            <p className="contact__avail">
              <i aria-hidden />
              {contact.availabilityNote}
            </p>
          </Reveal>

          <Reveal className="contact__mail" delay={0.1}>
            <span className="contact__mail-label">Email</span>
            <a className="contact__mail-link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <button type="button" className="contact__copy" onClick={copyEmail}>
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </Reveal>

          <div className="contact__channels">
            {channels.map((c, i) => (
              <motion.a
                key={c.label}
                className="contact__channel"
                href={c.href}
                target="_blank"
                rel="noreferrer"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.08, duration: 0.5 }}
              >
                <span className="contact__channel-label">{c.label}</span>
                <span className="contact__channel-value">{c.value}</span>
                <span className="contact__channel-arrow" aria-hidden>
                  ↗
                </span>
              </motion.a>
            ))}
          </div>

          <Reveal className="contact__actions" delay={0.2}>
            <ResumeButton variant="ghost">View resume</ResumeButton>
          </Reveal>
        </div>

        <Reveal className="contact__form-wrap" delay={0.12}>
          <form className="contact__form" onSubmit={onSubmit}>
            <h2 className="contact__form-title">Send a brief</h2>
            <p className="contact__form-lead">
              Name, email, and what you’re building. Opens your mail app.
            </p>

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
              <motion.p
                className="contact__form-hint"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span aria-hidden>✓</span> Your email app should open with the message ready.
              </motion.p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </main>
  )
}
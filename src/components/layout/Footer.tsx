import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "framer-motion"
import { site } from "../../data/content"
import "./Footer.css"

export function Footer() {
  const year = new Date().getFullYear()
  const reduce = useReducedMotion()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__left">
          <Link to="/" className="footer__name">
            <span className="footer__mark" aria-hidden />
            {site.name}
          </Link>
          <span className="footer__meta">{year} · Built to last</span>
        </div>
        <div className="footer__socials">
          {[
            { label: "GitHub", href: site.socials.github },
            { label: "LinkedIn", href: site.socials.linkedin },
            { label: "Email", href: `mailto:${site.email}` },
          ].map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              whileHover={reduce ? undefined : { y: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 22, delay: i * 0.02 }}
            >
              {item.label}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  )
}

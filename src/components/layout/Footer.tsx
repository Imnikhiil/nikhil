import { Link, useLocation } from "react-router-dom"
import { navLinks, site } from "../../data/content"
import { Reveal } from "../../hooks/useMotion"
import { scrollToTopSmooth } from "../../lib/scroll"
import "./Footer.css"

const socials = [
  { label: "GitHub", href: site.socials.github },
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "Email", href: `mailto:${site.email}` },
]

export function Footer() {
  const year = new Date().getFullYear()
  const { pathname } = useLocation()
  const showCta = pathname !== "/contact"

  return (
    <footer className="footer">
      <div className="container">
        {showCta ? (
          <Reveal className="footer__cta">
            <p className="footer__eyebrow">Next up</p>
            <Link to="/contact" className="footer__cta-link">
              <span className="footer__cta-text">
                Let’s build something <em>sharp.</em>
              </span>
              <span className="footer__cta-arrow" aria-hidden>
                →
              </span>
            </Link>
          </Reveal>
        ) : null}

        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__name">
              <span className="footer__mark" aria-hidden />
              {site.name}
            </Link>
            <p className="footer__blurb">{site.tagline}</p>
            <p className="footer__status">
              <i aria-hidden />
              Open for work · {site.location}
            </p>
          </div>

          <nav className="footer__col" aria-label="Footer">
            <h3>Pages</h3>
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="footer__col">
            <h3>Elsewhere</h3>
            {socials.map((item) => {
              const external = item.href.startsWith("http")
              return (
                <a
                  key={item.label}
                  href={item.href}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  {item.label} <span aria-hidden>↗</span>
                </a>
              )
            })}
          </div>
        </div>

        <div className="footer__bar">
          <span>
            © {year} {site.fullName} · Built with React &amp; Vite
          </span>
          <button type="button" className="footer__top" onClick={scrollToTopSmooth}>
            Back to top <span aria-hidden>↑</span>
          </button>
        </div>
      </div>

      <span className="footer__giant" aria-hidden>
        {site.name}
      </span>
    </footer>
  )
}
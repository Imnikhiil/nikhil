import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { navLinks, site } from "../../data/content"
import { useScrolled } from "../../hooks/useMotion"
import "./Navbar.css"

export function Navbar() {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__inner container">
        <Link className="nav__brand" to="/" onClick={() => setOpen(false)}>
          <span className="nav__mark" aria-hidden />
          {site.name}
        </Link>

        <button
          className={`nav__toggle ${open ? "is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>

        <nav className={`nav__links ${open ? "is-open" : ""}`} aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) => (isActive ? "is-active" : undefined)}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

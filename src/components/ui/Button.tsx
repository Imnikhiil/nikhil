import type { ButtonHTMLAttributes, ReactNode } from "react"
import { Link } from "react-router-dom"
import "./Button.css"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "text"
  to?: string
  href?: string
  download?: string | boolean
  children: ReactNode
}

export function Button({
  variant = "primary",
  to,
  href,
  download,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `btn btn--${variant} ${className}`.trim()

  if (to) {
    return (
      <Link className={classes} to={to}>
        {children}
      </Link>
    )
  }

  if (href) {
    const external = href.startsWith("http")
    return (
      <a
        className={classes}
        href={href}
        {...(download ? { download: download === true ? undefined : download } : {})}
        {...(external && !download ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  )
}

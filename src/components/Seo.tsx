import { useEffect } from "react"
import { site } from "../data/content"

type SeoProps = {
  title: string
  description: string
  path?: string
  image?: string
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement("link")
    el.setAttribute("rel", rel)
    document.head.appendChild(el)
  }
  el.setAttribute("href", href)
}

export function Seo({ title, description, path = "", image = site.ogImage }: SeoProps) {
  useEffect(() => {
    const origin = window.location.origin
    const url = `${origin}${path || "/"}`
    const imageUrl = image.startsWith("http") ? image : `${origin}${image}`
    const fullTitle = title.includes(site.name) ? title : `${title} · ${site.name}`

    document.title = fullTitle
    upsertMeta("name", "description", description)
    upsertMeta("name", "twitter:card", "summary_large_image")
    upsertMeta("name", "twitter:title", fullTitle)
    upsertMeta("name", "twitter:description", description)
    upsertMeta("name", "twitter:image", imageUrl)

    upsertMeta("property", "og:type", "website")
    upsertMeta("property", "og:site_name", `${site.fullName} Portfolio`)
    upsertMeta("property", "og:title", fullTitle)
    upsertMeta("property", "og:description", description)
    upsertMeta("property", "og:url", url)
    upsertMeta("property", "og:image", imageUrl)
    upsertMeta("property", "og:image:secure_url", imageUrl)
    upsertMeta("property", "og:image:type", "image/jpeg")
    upsertMeta("property", "og:image:width", "1200")
    upsertMeta("property", "og:image:height", "630")
    upsertMeta("property", "og:image:alt", fullTitle)

    upsertLink("canonical", url)
  }, [title, description, path, image])

  return null
}

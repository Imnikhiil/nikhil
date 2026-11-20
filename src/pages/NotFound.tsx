import { Button } from "../components/ui/Button"
import { Seo } from "../components/Seo"
import { Reveal } from "../hooks/useMotion"
import "./NotFound.css"

export function NotFoundPage() {
  return (
    <main className="page not-found">
      <Seo
        title="Page not found"
        description="This page doesn’t exist. Head back to work or home."
        path="/404"
      />

      <div className="container not-found__stage">
        <Reveal>
          <p className="not-found__code" aria-hidden>
            404
          </p>
          <h1 className="not-found__title">
            Page <em>missing.</em>
          </h1>
          <p className="not-found__lead">
            That route doesn’t exist — or it moved. Pick a clear next step.
          </p>
          <div className="not-found__actions">
            <Button to="/work">See work</Button>
            <Button to="/" variant="ghost">
              Home
            </Button>
          </div>
        </Reveal>
      </div>
    </main>
  )
}
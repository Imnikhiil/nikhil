import { lazy } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PageShell } from "./components/layout/PageShell"
import { HomePage } from "./pages/Home"

// Home loads instantly; the other pages are split into their own chunks
const WorkPage = lazy(() => import("./pages/Work").then((m) => ({ default: m.WorkPage })))
const ProjectDetailPage = lazy(() =>
  import("./pages/ProjectDetail").then((m) => ({ default: m.ProjectDetailPage })),
)
const AboutPage = lazy(() => import("./pages/About").then((m) => ({ default: m.AboutPage })))
const ExperiencePage = lazy(() =>
  import("./pages/Experience").then((m) => ({ default: m.ExperiencePage })),
)
const ContactPage = lazy(() => import("./pages/Contact").then((m) => ({ default: m.ContactPage })))
const NotFoundPage = lazy(() =>
  import("./pages/NotFound").then((m) => ({ default: m.NotFoundPage })),
)

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageShell />}>
          <Route index element={<HomePage />} />
          <Route path="work" element={<WorkPage />} />
          <Route path="work/:slug" element={<ProjectDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="experience" element={<ExperiencePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
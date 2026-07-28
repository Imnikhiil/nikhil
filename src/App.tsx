import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PageShell } from "./components/layout/PageShell"
import { AboutPage } from "./pages/About"
import { ContactPage } from "./pages/Contact"
import { ExperiencePage } from "./pages/Experience"
import { HomePage } from "./pages/Home"
import { NotFoundPage } from "./pages/NotFound"
import { ProjectDetailPage } from "./pages/ProjectDetail"
import { WorkPage } from "./pages/Work"

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

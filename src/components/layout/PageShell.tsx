import { Outlet, useLocation, useOutlet } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { PageCurtain } from "./PageCurtain"
import { ResumeProvider } from "../ui/ResumeViewer"
import { Preloader } from "../ui/Preloader"
import { SmoothScroll } from "../ui/SmoothScroll"
import { Cursor } from "../ui/Cursor"
import { ScrollProgress } from "../../hooks/useMotion"
import { scrollToTop } from "../../lib/scroll"
import "./PageShell.css"

export function PageShell() {
  const location = useLocation()
  // Freeze the outlet so the exiting page keeps showing its own content
  const outlet = useOutlet()

  return (
    <ResumeProvider>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait" initial={false} onExitComplete={scrollToTop}>
        <div key={location.pathname} className="page-shell">
          <PageCurtain />
          {outlet ?? <Outlet />}
          <Footer />
        </div>
      </AnimatePresence>
    </ResumeProvider>
  )
}
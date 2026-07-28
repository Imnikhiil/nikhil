import apexImg from "../assets/projects/apex-insights.webp"
import dseuImg from "../assets/projects/dseu-rajokri-portal.webp"
import rcImg from "../assets/projects/rc-innovation-club.webp"
import opImg from "../assets/projects/op-institute.webp"
import profileImg from "../assets/profile.jpg"

export type NavLink = {
  label: string
  to: string
}

export type Project = {
  slug: string
  title: string
  tagline: string
  description: string
  problem: string
  outcome: string
  features: string[]
  metrics: { value: string; label: string }[]
  kinds: string[]
  tags: string[]
  liveUrl?: string
  repoUrl?: string
  year: string
  role: string
  accent: string
  image: string
}

export type Experience = {
  role: string
  company: string
  period: string
  summary: string
  bullets: string[]
}

export type Education = {
  school: string
  program: string
  period: string
  detail?: string
}

export type SkillGroup = {
  title: string
  items: string[]
}

export type FocusArea = {
  title: string
  text: string
}

export type ProcessStep = {
  title: string
  text: string
}

export type Testimonial = {
  quote: string
  name: string
  role: string
}

export const site = {
  name: "Nikhil",
  fullName: "Nikhil Kumar",
  title: "Product Engineer",
  tagline: "I ship sharp web products — fast interfaces, solid systems, zero fluff.",
  email: "imyournikhil@gmail.com",
  location: "New Delhi, India",
  photo: profileImg,
  idCode: "NK-2026",
  responseTime: "Usually reply within 24–48 hours",
  socials: {
    github: "https://github.com/Imnikhiil",
    linkedin: "https://www.linkedin.com/in/nikhil-kumar-4aa7b82ab/",
  },
  resumeUrl: "/Nikhil-Kumar-CV.pdf",
  ogImage: "/og.jpg",
  /** Update this after deploy (Vercel/Netlify/custom domain). */
  url: "https://imyournikhil.vercel.app",
}

export const navLinks: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Work", to: "/work" },
  { label: "Experience", to: "/experience" },
  { label: "Contact", to: "/contact" },
]

export const idCardBack = {
  heading: "Stack",
  credo: "Brief → build → ship.",
  highlights: ["React", "TypeScript", "Node", "UI"],
  process: [
    { n: "01", label: "Discover" },
    { n: "02", label: "Design" },
    { n: "03", label: "Build" },
    { n: "04", label: "Ship" },
  ],
  status: "Shipping products",
}

/** Home code-window motive. */
export const homeMotive = {
  file: "motive.html",
  comment: "build with intent",
  headline: "Ship sharp. Stay solid.",
  line: "Code is craft — build what people trust.",
}

export const focusAreas: FocusArea[] = [
  {
    title: "Frontend",
    text: "Interfaces that feel fast, clear, and intentional — not template noise.",
  },
  {
    title: "Backend",
    text: "APIs and data layers that stay boringly reliable under real use.",
  },
  {
    title: "Product craft",
    text: "From brief to ship: structure, polish, and decisions that hold up.",
  },
]

export const homeCreds = [
  { label: "Based", value: site.location },
  { label: "Focus", value: "Web products" },
  { label: "Study", value: "Diploma CSE · DSEU" },
]

export const processSteps: ProcessStep[] = [
  {
    title: "Discover",
    text: "Clarify goals, users, and constraints before a line of code.",
  },
  {
    title: "Design",
    text: "Map flows and UI so the build stays intentional — not accidental.",
  },
  {
    title: "Build",
    text: "Ship clean interfaces with systems that hold under real use.",
  },
  {
    title: "Ship",
    text: "Launch, polish, and leave something production-ready.",
  },
]

export const testimonials: Testimonial[] = [
  {
    quote:
      "Nikhil took our club from scattered Instagram posts to a real platform — events, team, and registration in one place. Fast, clear, and done.",
    name: "RC Innovation Club",
    role: "DSEU Rajokri · Campus team",
  },
  {
    quote:
      "He doesn’t just build pages — he asks the right product questions. Our redirect and research flows finally made sense to clients.",
    name: "Apex Insights",
    role: "Market research platform",
  },
]

export const about = {
  heading: "Builder first. Designer of systems second.",
  paragraphs: [
    "I care about how software feels when you use it — the snap of a transition, the weight of a layout, the quiet confidence of code that doesn’t break under pressure.",
    "Most of my work sits at the intersection of product and engineering: interfaces people actually want to open, and backends that stay boringly reliable.",
    "When I’m not shipping, I’m tearing other sites apart in the inspector — learning why the good ones feel inevitable.",
  ],
  meta: [
    { label: "Based", value: site.location },
    { label: "Study", value: "Diploma CSE · DSEU (2023–2026)" },
    { label: "Focus", value: "Web products" },
  ],
  values: [
    { title: "Ship clean", text: "Launch with clarity — no half-finished edges." },
    { title: "Own the craft", text: "Details matter: type, spacing, performance." },
    { title: "Stay direct", text: "Honest scope, honest timelines, honest tradeoffs." },
  ],
}

export const projects: Project[] = [
  {
    slug: "apex-insights",
    title: "Apex Insights",
    tagline: "Market research redirects that actually track.",
    description:
      "A market research and survey redirect platform for panel-based studies — Start/End URL tracking, eligibility checks, live studies, and client-facing research services.",
    problem:
      "Panel surveys need clean redirect flows and eligibility gates. Without proper Start / Complete / Terminate / Quota URLs, response tracking breaks and clients lose trust in the data.",
    outcome:
      "Built a production site for Apex Insights with panel redirect messaging, research specializations, live studies surface, process narrative, FAQ, and a project brief contact flow.",
    features: [
      "Start / Complete / Terminate / Quota redirect flows",
      "Live studies surface for active panels",
      "Eligibility and quota messaging",
      "Research services & process narrative",
      "Project brief contact flow",
    ],
    metrics: [
      { value: "4", label: "Redirect states shipped" },
      { value: "Live", label: "Client research platform" },
    ],
    kinds: ["Website", "Platform"],
    tags: ["React", "TypeScript", "Vite", "UI"],
    year: "2025",
    role: "Full-stack",
    accent: "#ff6233",
    liveUrl: "https://myapexinsights.com/home",
    image: apexImg,
  },
  {
    slug: "dseu-rajokri-portal",
    title: "DSEU Rajokri Portal",
    tagline: "One campus. One secure digital gateway.",
    description:
      "Official campus portal for Delhi Skill and Entrepreneurship University, Rajokri Campus — programs, events, galleries, and role-based access for students, faculty, and admin.",
    problem:
      "Campus information and academic workflows were scattered. Students and staff needed a single trusted place for programs, events, notices, and portal entry.",
    outcome:
      "Shipped a polished public portal with program flip-cards, events & gallery, campus story, and clear paths into student / faculty / admin sign-in flows.",
    features: [
      "Program flip-cards & campus story",
      "Events and gallery sections",
      "Student / faculty / admin entry paths",
      "Notices and campus information hub",
      "Responsive portal experience",
    ],
    metrics: [
      { value: "3", label: "Portal roles (S/F/A)" },
      { value: "1 hub", label: "Campus info gateway" },
    ],
    kinds: ["Website", "Portal"],
    tags: ["React", "Auth flows", "UI", "Railway"],
    year: "2025",
    role: "Full-stack",
    accent: "#3b82f6",
    liveUrl: "https://dseu-rajokri.up.railway.app/",
    image: dseuImg,
  },
  {
    slug: "rc-innovation-club",
    title: "RC Innovation Club",
    tagline: "Turn student ideas into real impact.",
    description:
      "Web presence for RC Innovation Club at DSEU Rajokri — workshops, competitions, collaborative projects, events, team, and gallery.",
    problem:
      "RC Innovation Club at DSEU had no online presence — events, team info, and resources lived in Instagram posts and Google Forms with no central hub for students.",
    outcome:
      "Designed and built a full club platform with events calendar, team gallery, resource downloads, certificate verification, and member registration — all in one place.",
    features: [
      "Events & announcements section",
      "Core team gallery with profiles",
      "Resources hub & certificate verification",
      "Member registration form",
      "Light/dark theme switching",
    ],
    metrics: [
      { value: "5", label: "Core modules shipped" },
      { value: "PWA", label: "Installable club site" },
    ],
    kinds: ["Club website", "PWA"],
    tags: ["HTML", "CSS", "JavaScript", "PWA", "Render"],
    year: "2025",
    role: "Frontend",
    accent: "#ff6233",
    liveUrl: "https://rc-innovation-club.onrender.com/",
    image: rcImg,
  },
  {
    slug: "op-institute",
    title: "OP Institute of Studies",
    tagline: "One family. Two worlds of learning.",
    description:
      "Education website for OP Institute of Studies and OP Kids Pre School — programs from preschool to CMA / B.Com, admissions, testimonials, and dual-campus contact.",
    problem:
      "Two related brands (preschool + institute) needed one coherent site that guides parents and students without confusing which world they’re entering.",
    outcome:
      "Built a dual-brand experience with journey mapping, program storytelling, admissions flow, FAQs, and clear contact paths for both campuses.",
    features: [
      "Dual-brand preschool + institute experience",
      "Program journey mapping",
      "Admissions flow & FAQs",
      "Testimonials and campus stories",
      "Clear contact paths for both campuses",
    ],
    metrics: [
      { value: "2", label: "Brands, one coherent site" },
      { value: "Full", label: "Admissions path live" },
    ],
    kinds: ["Website", "Education"],
    tags: ["React", "Marketing site", "UX", "Vercel"],
    year: "2025",
    role: "Full-stack",
    accent: "#22c55e",
    liveUrl: "https://opinstitute.vercel.app/",
    image: opImg,
  },
]

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    items: ["React", "TypeScript", "Next.js", "CSS architecture", "Motion"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "REST", "MongoDB", "PostgreSQL"],
  },
  {
    title: "Practice",
    items: ["Git", "Vite", "Figma handoff", "Testing basics", "Ship discipline"],
  },
]

export const experience: Experience[] = [
  {
    role: "Product Engineer",
    company: "Freelance / Client projects",
    period: "2024 — Now",
    summary:
      "End-to-end web products for clients and campus — from brief to live deploy, with clear UI and reliable flows.",
    bullets: [
      "Shipped Apex Insights, DSEU Rajokri Portal, RC Innovation Club & OP Institute to production",
      "Owned product UI, redirect/auth flows, and deployment handoff",
      "Built Institute Scheduler — automated scheduling system for colleges",
    ],
  },
  {
    role: "Technology & Innovation Intern",
    company: "Office of Shri Manish Sisodia (Former Deputy CM & Education Minister, Delhi)",
    period: "6 months",
    summary:
      "Internship focused on technology and innovation initiatives in an education / public-tech context.",
    bullets: [
      "Supported technology & innovation work under a Delhi education leadership office",
      "Built practical exposure to real-world tech delivery, coordination, and problem-solving",
    ],
  },
  {
    role: "Web Development Intern",
    company: "CODESOFT",
    period: "4 weeks",
    summary: "Hands-on web development internship covering front-end builds and project tasks.",
    bullets: [
      "Completed internship project tasks in HTML/CSS/JS-based web development",
      "Practiced shipping small features with clean structure and responsive layouts",
    ],
  },
  {
    role: "Cybersecurity Intern",
    company: "Edunet Foundation",
    period: "8 weeks",
    summary: "Foundational cybersecurity internship covering systems awareness and secure practices.",
    bullets: [
      "Completed an 8-week cybersecurity internship program",
      "Strengthened fundamentals around systems, security awareness, and technical discipline",
    ],
  },
]

export const education: Education[] = [
  {
    school: "Delhi Skill and Entrepreneurship University (DSEU)",
    program: "Diploma in Computer Science Engineering",
    period: "2023 — 2026",
    detail: "Computer Engineering student · web, systems, and product builds",
  },
  {
    school: "Govt. Boys Sr. Sec. School, Bindapur",
    program: "Class 12 · CBSE",
    period: "2022",
  },
  {
    school: "Govt. Co-Ed Sec. School, Pocket-IV",
    program: "Class 10 · CBSE",
    period: "2020",
  },
]

export const contact = {
  heading: "Got something real to build?",
  lead: "Send the brief, the role, or the half-formed idea. I’ll tell you straight if I’m the right fit.",
  availabilityNote: site.responseTime,
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

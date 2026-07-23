import { useState, useEffect, useRef } from "react"
import { useI18n } from "./i18n"

// ─── Data ────────────────────────────────────────────────────────────────────

const SKILLS = [
  { label: "Vue2 / Vue3", level: 95 },
  { label: "uniapp", level: 95 },
  { label: "CSS / CSS3", level: 92 },
  { label: "JavaScript", level: 90 },
  { label: "TypeScript", level: 89 },
  { label: "Node.js", level: 88 },
  { label: "Vite / Webpack", level: 85 },
  { label: "Git & SVN", level: 88 },
  { label: "Java", level: 50 },
  { label: "React", level: 30 },
]

const TECH_TAGS = [
  "Vue", "uniapp","CSS / CSS3", "JavaScript","TypeScript","Node.js", "Scss", "Less", "Webpack",
  "Vite", "Node.js", "Git & SVN","Java", "React", "Figma",
]

interface Project {
  id: string
  name: string
  tags: string[]
  images?: string[]   // 项目截图路径，放在 public/ 目录下
  href?: string       // 个人项目可放链接，弹窗中显示"访问链接"按钮
  year: string
}

const PROJECTS: Project[] = [
  {
    id: "01",
    name: "Flux Design System",
    tags: ["React", "TypeScript", "Storybook", "Radix UI"],
    images: [],
    year: "2024",
  },
  {
    id: "02",
    name: "Beacon Analytics",
    tags: ["Next.js", "D3.js", "WebSocket", "PostgreSQL"],
    images: [],
    href: "https://example.com",
    year: "2024",
  },
  {
    id: "03",
    name: "Threadline",
    tags: ["React", "IndexedDB", "Yjs", "TipTap"],
    images: [],
    href: "https://example.com",
    year: "2023",
  },
]

const STATS = [
  { key: "yearsExperience" as const, stat: "7+" },
  { key: "projectsShipped" as const, stat: "40+" },
  { key: "openSourceRepos" as const, stat: "1" },
]

const SOCIAL_LINKS = [
  { labelKey: "GitHub", href: "#" },
  { labelKey: "CSDN", href: "#" },
  { labelKey: "Resume", href: "#" },
]

function getCodeLines(name: string, role: string) {
  return [
    { indent: 0, tokens: [{ t: "const", c: "violet" }, { t: " portfolio ", c: "text" }, { t: "=", c: "mint" }, { t: " {", c: "dim" }] },
    { indent: 1, tokens: [{ t: "name", c: "dim" }, { t: ":", c: "dim" }, { t: ` "${name}"`, c: "mint" }, { t: ",", c: "dim" }] },
    { indent: 1, tokens: [{ t: "role", c: "dim" }, { t: ":", c: "dim" }, { t: ` "${role}"`, c: "mint" }, { t: ",", c: "dim" }] },
    { indent: 1, tokens: [{ t: "years", c: "dim" }, { t: ":", c: "dim" }, { t: " 6", c: "violet" }, { t: ",", c: "dim" }] },
    { indent: 1, tokens: [{ t: "open", c: "dim" }, { t: ":", c: "dim" }, { t: " true", c: "mint" }] },
    { indent: 0, tokens: [{ t: "}", c: "dim" }] },
  ]
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("")
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && charIdx < word.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed)
    } else if (!deleting && charIdx === word.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setWordIdx((i) => (i + 1) % words.length)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  useEffect(() => {
    setDisplay(words[wordIdx].slice(0, charIdx))
  }, [charIdx, wordIdx, words])

  return display
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect() }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, inView }
}

// ─── Components ───────────────────────────────────────────────────────────────

function Nav() {
  const { t, lang, toggleLang } = useI18n()
  const [scrolled, setScrolled] = useState(false)

  const navLinks = [
    { label: t.nav.about, id: "about" },
    { label: t.nav.skills, id: "skills" },
    { label: t.nav.projects, id: "projects" },
    { label: t.nav.contact, id: "contact" },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(7, 7, 15, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm tracking-widest" style={{ color: "var(--color-mint)", letterSpacing: "0.2em" }}>
          WW
        </span>
      </div>
      <div className="flex items-center gap-8">
        <ul className="flex gap-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium transition-colors duration-200 bg-transparent border-none cursor-pointer"
                style={{ color: "var(--color-dim)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-dim)")}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
        {/* Language switcher */}
        <button
          onClick={toggleLang}
          className="font-mono text-xs px-3 py-1.5 rounded-full transition-all duration-200 border cursor-pointer"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-dim)",
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = "var(--color-mint)"
            el.style.color = "var(--color-mint)"
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = "var(--color-border)"
            el.style.color = "var(--color-dim)"
          }}
          title={lang === "zh" ? "Switch to English" : "切换到中文"}
        >
          {lang === "zh" ? "EN" : "中文"}
        </button>
        <button
          onClick={() => scrollToSection("contact")}
          className="text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 bg-transparent border-none cursor-pointer"
          style={{
            background: "var(--color-mint)",
            color: "#07070f",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85" }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1" }}
        >
          {t.nav.hireMe}
        </button>
      </div>
    </nav>
  )
}

function CodeCard() {
  const { t } = useI18n()
  const codeLines = getCodeLines(t.hero.name, t.hero.codeRole)

  return (
    <div
      className="rounded-xl p-5 font-mono text-sm leading-relaxed"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        minWidth: 300,
      }}
    >
      <div className="flex gap-1.5 mb-4">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
      </div>
      {codeLines.map((line, i) => (
        <div key={i} style={{ paddingLeft: line.indent * 16 }}>
          {line.tokens.map((tok, j) => (
            <span
              key={j}
              style={{
                color:
                  tok.c === "mint" ? "var(--color-mint)"
                  : tok.c === "violet" ? "var(--color-violet)"
                  : tok.c === "dim" ? "var(--color-muted)"
                  : "var(--color-text)",
              }}
            >
              {tok.t}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

function Hero() {
  const { t } = useI18n()
  const role = useTypewriter(t.hero.roles)

  return (
    <section
      id="hero"
      className="relative flex items-center min-h-screen px-8"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 60%, rgba(79, 255, 176, 0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 70% 30%, rgba(167, 139, 250, 0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-center pt-24 pb-16">
        {/* Left */}
        <div>
          <p
            className="font-mono text-xs tracking-widest mb-6 uppercase"
            style={{ color: "var(--color-mint)", letterSpacing: "0.3em" }}
          >
            {t.hero.badge}
          </p>
          <h1
            className="text-5xl lg:text-7xl font-extrabold leading-none mb-4"
            style={{ color: "var(--color-text)", letterSpacing: "-0.03em" }}
          >
            {t.hero.name}
          </h1>
          <div className="text-2xl lg:text-3xl font-semibold mb-6 flex items-center gap-2" style={{ color: "var(--color-dim)" }}>
            <span>{role}</span>
            <span
              className="inline-block w-0.5 h-7 animate-pulse"
              style={{ background: "var(--color-mint)", opacity: 0.8 }}
            />
          </div>
          <p className="text-base leading-relaxed max-w-lg mb-10" style={{ color: "var(--color-muted)" }}>
            {t.hero.description}
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 bg-transparent border-none cursor-pointer"
              style={{ background: "var(--color-mint)", color: "#07070f" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)" }}
            >
              {t.hero.viewWork}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 bg-transparent border-none cursor-pointer"
              style={{ border: "1px solid var(--color-border-hover)", color: "var(--color-dim)" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = "var(--color-mint)"
                el.style.color = "var(--color-mint)"
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = "var(--color-border-hover)"
                el.style.color = "var(--color-dim)"
              }}
            >
              {t.hero.getInTouch}
            </button>
          </div>

          <div className="flex gap-6 mt-12" style={{ color: "var(--color-muted)" }}>
            {STATS.map(({ key, stat }) => (
              <div key={key}>
                <div className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>{stat}</div>
                <div className="text-xs font-mono mt-0.5" style={{ color: "var(--color-muted)" }}>{t.stats[key]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — code card */}
        <div className="hidden lg:flex flex-col items-end gap-4">
          <CodeCard />
          <p className="font-mono text-xs" style={{ color: "var(--color-muted)" }}>
            {t.hero.codeFile}
          </p>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-xs" style={{ color: "var(--color-muted)" }}>{t.hero.scroll}</span>
        <div className="w-px h-8 animate-pulse" style={{ background: "var(--color-border-hover)" }} />
      </div>
    </section>
  )
}

function About() {
  const { t } = useI18n()
  const { ref, inView } = useInView()

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-32 px-8"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div
          className="transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)" }}
        >
          <p className="font-mono text-xs tracking-widest mb-4 uppercase" style={{ color: "var(--color-mint)", letterSpacing: "0.3em" }}>
            {t.about.label}
          </p>
          <h2 className="text-4xl font-extrabold mb-6" style={{ color: "var(--color-text)", letterSpacing: "-0.025em" }}>
            {t.about.title[0]}
            <br />
            {t.about.title[1]}
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--color-muted)" }}>
            {t.about.paragraph1}
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--color-muted)" }}>
            {t.about.paragraph2}
          </p>
        </div>

        <div
          className="transition-all duration-700 delay-150"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)" }}
        >
          <p className="font-mono text-xs tracking-widest mb-6 uppercase" style={{ color: "var(--color-muted)", letterSpacing: "0.3em" }}>
            {t.about.techStack}
          </p>
          <div className="flex flex-wrap gap-2">
            {TECH_TAGS.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full font-mono text-xs transition-all duration-200 cursor-default"
                style={{
                  border: "1px solid var(--color-border)",
                  color: "var(--color-dim)",
                  background: "var(--color-surface-2)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = "var(--color-mint)"
                  el.style.color = "var(--color-mint)"
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = "var(--color-border)"
                  el.style.color = "var(--color-dim)"
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const { t } = useI18n()
  const { ref, inView } = useInView()

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-32 px-8"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs tracking-widest mb-4 uppercase" style={{ color: "var(--color-mint)", letterSpacing: "0.3em" }}>
          {t.skills.label}
        </p>
        <h2 className="text-4xl font-extrabold mb-16" style={{ color: "var(--color-text)", letterSpacing: "-0.025em" }}>
          {t.skills.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8">
          {SKILLS.map((skill, i) => (
            <div
              key={skill.label}
              className="transition-all duration-500"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transitionDelay: `${i * 60}ms`,
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium" style={{ color: "var(--color-text)" }}>{skill.label}</span>
                <span className="font-mono text-xs" style={{ color: "var(--color-muted)" }}>{skill.level}%</span>
              </div>
              <div className="h-px w-full" style={{ background: "var(--color-border)" }}>
                <div
                  className="h-px transition-all duration-1000 ease-out"
                  style={{
                    width: inView ? `${skill.level}%` : "0%",
                    background: "linear-gradient(90deg, var(--color-mint), var(--color-violet))",
                    transitionDelay: `${i * 60 + 200}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const { t } = useI18n()
  const { ref, inView } = useInView()
  const [hovered, setHovered] = useState(false)

  const desc = t.projectList[project.name]?.desc ?? ""

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      onClick={onOpen}
      className="group relative rounded-2xl p-8 transition-all duration-300 cursor-pointer"
      style={{
        background: hovered ? "var(--color-surface-2)" : "var(--color-surface)",
        border: `1px solid ${hovered ? "rgba(79, 255, 176, 0.2)" : "var(--color-border)"}`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease, transform 0.6s ease, background 0.2s, border-color 0.2s",
        transitionDelay: `${index * 100}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex justify-between items-start mb-6">
        <span className="font-mono text-xs" style={{ color: "var(--color-muted)" }}>
          {project.id} — {project.year}
        </span>
        <svg
          className="transition-transform duration-200"
          style={{
            transform: hovered ? "translate(3px, -3px)" : "translate(0, 0)",
            color: hovered ? "var(--color-mint)" : "var(--color-muted)",
          }}
          width="16" height="16" viewBox="0 0 16 16" fill="none"
        >
          <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h3
        className="text-xl font-bold mb-3 transition-colors duration-200"
        style={{ color: hovered ? "var(--color-mint)" : "var(--color-text)", letterSpacing: "-0.02em" }}
      >
        {project.name}
      </h3>
      <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-muted)" }}>
        {desc}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs px-2.5 py-1 rounded-md"
            style={{
              background: "var(--color-bg)",
              color: "var(--color-dim)",
              border: "1px solid var(--color-border)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}

function Projects() {
  const { t } = useI18n()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects" className="py-32 px-8" style={{ background: "var(--color-surface)" }}>
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs tracking-widest mb-4 uppercase" style={{ color: "var(--color-mint)", letterSpacing: "0.3em" }}>
          {t.projects.label}
        </p>
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl font-extrabold" style={{ color: "var(--color-text)", letterSpacing: "-0.025em" }}>
            {t.projects.title}
          </h2>
          <span
            className="font-mono text-xs transition-colors duration-200 hidden md:block"
            style={{ color: "var(--color-muted)" }}
          >
            {t.projects.allProjects}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t } = useI18n()
  const images = project.images ?? []
  const hasImages = images.length > 0
  const hasMultiple = images.length > 1
  const hasLink = !!project.href
  const desc = t.projectList[project.name]?.desc ?? ""
  const [imgIdx, setImgIdx] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  // Reset image index when project changes
  useEffect(() => {
    setImgIdx(0)
    scrollRef.current?.scrollTo({ left: 0 })
  }, [project.id])

  const scrollToImage = (i: number) => {
    setImgIdx(i)
    if (scrollRef.current && hasMultiple) {
      const itemWidth = scrollRef.current.scrollWidth / images.length
      scrollRef.current.scrollTo({ left: itemWidth * i, behavior: "smooth" })
    }
  }

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-8"
      style={{ background: "rgba(7, 7, 15, 0.85)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl p-8"
        style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 bg-transparent border-none cursor-pointer z-10"
          style={{ color: "var(--color-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
        >
          ✕
        </button>

        {/* Images gallery */}
        {hasImages && (
          <div className="mb-8">
            {/* Multiple images: horizontal scroll */}
            {hasMultiple ? (
              <>
                <div
                  ref={scrollRef}
                  className="flex overflow-x-auto rounded-lg mb-3 no-scrollbar"
                  style={{
                    border: "1px solid var(--color-border)",
                    scrollSnapType: "x mandatory",
                    scrollbarWidth: "none",
                  }}
                >
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${project.name} screenshot ${i + 1}`}
                      className="w-full flex-shrink-0 block"
                      style={{ scrollSnapAlign: "start" }}
                    />
                  ))}
                </div>
                {/* Thumbnails + counter */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => scrollToImage(i)}
                        className="w-12 h-8 rounded overflow-hidden border-2 bg-transparent cursor-pointer p-0 transition-all duration-200"
                        style={{
                          borderColor: imgIdx === i ? "var(--color-mint)" : "var(--color-border)",
                          opacity: imgIdx === i ? 1 : 0.5,
                        }}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                  <span className="font-mono text-xs" style={{ color: "var(--color-muted)" }}>
                    {imgIdx + 1} / {images.length}
                  </span>
                </div>
              </>
            ) : (
              <img
                src={images[0]}
                alt={`${project.name} screenshot`}
                className="w-full rounded-lg block"
                style={{ border: "1px solid var(--color-border)" }}
              />
            )}
          </div>
        )}

        {/* If no images, show placeholder */}
        {!hasImages && (
          <div
            className="flex items-center justify-center h-48 rounded-lg mb-8"
            style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)" }}
          >
            <span className="font-mono text-sm" style={{ color: "var(--color-muted)" }}>
              {t.hero.codeFile}
            </span>
          </div>
        )}

        {/* Info */}
        <div className="flex justify-between items-start mb-3">
          <span className="font-mono text-xs" style={{ color: "var(--color-muted)" }}>
            {project.id} — {project.year}
          </span>
        </div>
        <h3
          className="text-2xl font-bold mb-3"
          style={{ color: "var(--color-text)", letterSpacing: "-0.02em" }}
        >
          {project.name}
        </h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-muted)" }}>
          {desc}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2.5 py-1 rounded-md"
              style={{
                background: "var(--color-bg)",
                color: "var(--color-dim)",
                border: "1px solid var(--color-border)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Visit link button */}
        {hasLink && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200"
            style={{ background: "var(--color-mint)", color: "#07070f", textDecoration: "none" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85" }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1" }}
          >
            {t.projectModal.visitLink} ↗
          </a>
        )}

        {/* Close text */}
        <button
          onClick={onClose}
          className="ml-4 font-mono text-xs bg-transparent border-none cursor-pointer transition-colors duration-200"
          style={{ color: "var(--color-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
        >
          {t.projectModal.close}
        </button>
      </div>
    </div>
  )
}

function Contact() {
  const { t } = useI18n()
  const { ref, inView } = useInView()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(t.contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea")
      textarea.value = t.contact.email
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-32 px-8 relative overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 80%, rgba(79, 255, 176, 0.05) 0%, transparent 70%)",
        }}
      />
      <div
        className="max-w-3xl mx-auto text-center relative z-10 transition-all duration-700"
        style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)" }}
      >
        <p className="font-mono text-xs tracking-widest mb-6 uppercase" style={{ color: "var(--color-mint)", letterSpacing: "0.3em" }}>
          {t.contact.label}
        </p>
        <h2
          className="text-5xl font-extrabold mb-6"
          style={{ color: "var(--color-text)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
        >
          {t.contact.title[0]}
          <br />
          {t.contact.title[1]}
        </h2>
        <p className="text-base mb-10" style={{ color: "var(--color-muted)" }}>
          {t.contact.description}
        </p>
        <button
          onClick={handleCopy}
          className="relative inline-block px-8 py-4 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer border-none"
          style={{ background: "var(--color-mint)", color: "#07070f" }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.transform = "translateY(-2px)"
            el.style.boxShadow = "0 0 40px rgba(79, 255, 176, 0.3)"
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.transform = "translateY(0)"
            el.style.boxShadow = "none"
          }}
        >
          {copied ? t.contact.copied : t.contact.email}
        </button>

        <div className="flex justify-center gap-8 mt-12">
          {SOCIAL_LINKS.map(({ labelKey, href }) => (
            <a
              key={labelKey}
              href={href}
              className="font-mono text-xs transition-colors duration-200"
              style={{ color: "var(--color-muted)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-mint)" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-muted)" }}
            >
              {t.socialLinks[labelKey]}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const { t } = useI18n()

  return (
    <footer
      className="px-8 py-6 flex justify-between items-center border-t"
      style={{ borderColor: "var(--color-border)", background: "var(--color-bg)" }}
    >
      <span className="font-mono text-xs" style={{ color: "var(--color-muted)" }}>
        {t.footer.copyright}
      </span>
      <span className="font-mono text-xs" style={{ color: "var(--color-muted)" }}>
        {t.footer.builtWith}
      </span>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const { t } = useI18n()

  useEffect(() => {
    document.title = t.pageTitle
  }, [t.pageTitle])

  return (
    <div style={{ background: "var(--color-bg)", color: "var(--color-text)", fontFamily: "var(--font-sans)" }}>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

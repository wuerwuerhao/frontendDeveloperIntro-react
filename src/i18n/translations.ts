export type Lang = "zh" | "en"

export interface Translations {
  pageTitle: string
  nav: {
    about: string
    skills: string
    projects: string
    contact: string
    hireMe: string
  }
  hero: {
    badge: string
    name: string
    roles: string[]
    description: string
    viewWork: string
    getInTouch: string
    scroll: string
    codeFile: string
    codeRole: string
  }
  stats: {
    yearsExperience: string
    projectsShipped: string
    openSourceRepos: string
  }
  about: {
    label: string
    title: string[]
    paragraph1: string
    paragraph2: string
    techStack: string
  }
  skills: {
    label: string
    title: string
  }
  projects: {
    label: string
    title: string
    allProjects: string
  }
  projectList: {
    [key: string]: {
      desc: string
    }
  }
  projectModal: {
    visitLink: string
    close: string
  }
  contact: {
    label: string
    title: string[]
    description: string
    email: string
    copied: string
  }
  footer: {
    copyright: string
    builtWith: string
  }
  socialLinks: {
    [key: string]: string
  }
}

const zh: Translations = {
  pageTitle: "五五 - 前端工程师",
  nav: {
    about: "关于",
    skills: "技能",
    projects: "项目",
    contact: "联系",
    hireMe: "联系我",
  },
  hero: {
    badge: "开放求职 · 2026",
    name: "五五",
    roles: ["前端工程师", "资深 Vue 前端工程师", "uniapp 跨端工程师", "TypeScript 践行者", "用户体验工程师"],
    description:
      `我专注于打造精准、高性能的用户界面——将设计系统和产品构想转化为令人感到"本该如此"的体验。六年 Web 开发经验。`,
    viewWork: "查看作品",
    getInTouch: "取得联系",
    scroll: "向下滚动",
    codeFile: "// portfolio.ts",
    codeRole: "前端工程师",
  },
  stats: {
    yearsExperience: "年经验",
    projectsShipped: "已交付项目",
    openSourceRepos: "开源仓库",
  },
  about: {
    label: "001 — 关于",
    title: ["打造令人", "愉悦的产品体验。"],
    paragraph1:
      "我是一名坐标长沙的前端工程师，目前开放全职和合约岗位机会。七年来，我一直痴迷于组件 API 设计、动画节奏以及那些让界面充满生命力的微交互。",
    paragraph2:
      "七年专注前端开发，参与过多家科技公司的核心产品迭代。我热衷于在设计与工程品味交融的团队中工作。",
    techStack: "技术栈",
  },
  skills: {
    label: "002 — 技能",
    title: "技能熟练度",
  },
  projects: {
    label: "003 — 项目",
    title: "精选作品",
    allProjects: "全部项目 →",
  },
  projectList: {
    "Flux Design System": {
      desc: "一个面向规模化设计的组件库——80+ 组件，完整的无障碍支持，暗色模式，并与 Figma Token 同步。",
    },
    "Beacon Analytics": {
      desc: "实时网站分析仪表盘，包含自定义图表引擎、实时事件流和团队协作功能。",
    },
    Threadline: {
      desc: "一款极简写作工具，支持 Markdown 编辑器、嵌套页面和离线优先的同步架构。",
    },
  },
  projectModal: {
    visitLink: "访问链接",
    close: "关闭",
  },
  contact: {
    label: "004 — 联系",
    title: ["让我们携手", "共创佳作。"],
    description: "目前开放全职岗位和有趣的合约工作机会。坐标长沙，支持远程办公。",
    email: "x9829660372026@163.com",
    copied: "已复制到剪贴板 ✓",
  },
  footer: {
    copyright: "© 2026 五五",
    builtWith: "基于 React + Vite 构建",
  },
  socialLinks: {
    GitHub: "GitHub",
    Resume: "简历",
  },
}

const en: Translations = {
  pageTitle: "May - Frontend Engineer",
  nav: {
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    hireMe: "Hire Me",
  },
  hero: {
    badge: "Available for work · 2026",
    name: "May",
    roles: ["Frontend Engineer", "Senior Vue Frontend Engineer", "uniapp Cross-platform Engineer", "TypeScript Practitioner", "UX Engineer"],
    description:
      'I craft precise, performant user interfaces — turning design systems and product ideas into experiences that feel inevitable. Six years building for the web.',
    viewWork: "View Work",
    getInTouch: "Get in Touch",
    scroll: "scroll",
    codeFile: "// portfolio.ts",
    codeRole: "Frontend Engineer",
  },
  stats: {
    yearsExperience: "Years Experience",
    projectsShipped: "Projects Shipped",
    openSourceRepos: "Open Source Repos",
  },
  about: {
    label: "001 — About",
    title: ["Building things", "that people love to use."],
    paragraph1:
      'I\'m a frontend engineer based in Changsha, currently open to full-time and contract roles. I\'ve spent seven years obsessing over component APIs, animation timing, and the kind of micro-interactions that make interfaces feel alive.',
    paragraph2:
      "Seven years focused on frontend development, shipping core products across multiple tech companies. I thrive in design-forward teams where engineering and product taste live in the same room.",
    techStack: "Tech Stack",
  },
  skills: {
    label: "002 — Skills",
    title: "Proficiency",
  },
  projects: {
    label: "003 — Projects",
    title: "Selected Work",
    allProjects: "All projects →",
  },
  projectList: {
    "Flux Design System": {
      desc: "A component library built for scale — 80+ components, full a11y, dark mode, and Figma token sync baked in.",
    },
    "Beacon Analytics": {
      desc: "Real-time web analytics dashboard with custom charting engine, live event streaming, and team collaboration.",
    },
    Threadline: {
      desc: "A minimal writing tool with a markdown editor, nested pages, and an offline-first sync architecture.",
    },
  },
  projectModal: {
    visitLink: "Visit Link",
    close: "Close",
  },
  contact: {
    label: "004 — Contact",
    title: ["Let's build", "something great."],
    description:
      "Currently open to full-time positions and interesting contract work. Based in Changsha, open to remote.",
    email: "x9829660372026@163.com",
    copied: "Copied to clipboard ✓",
  },
  footer: {
    copyright: "© 2026 May",
    builtWith: "Built with React + Vite",
  },
  socialLinks: {
    GitHub: "GitHub",
    LinkedIn: "LinkedIn",
    "Twitter/X": "Twitter/X",
    Resume: "Resume",
  },
}

export const translations: Record<Lang, Translations> = { zh, en }

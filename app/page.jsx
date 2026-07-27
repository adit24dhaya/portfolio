'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, useScroll, useSpring } from 'framer-motion'
import Image from 'next/image'
import heroImage from '../src/assets/hero.png'

const GITHUB_USERNAME = 'adit24dhaya'

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contributions', label: 'OSS' },
  { id: 'activity', label: 'Activity' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

const ROTATING_ROLES = [
  'AI / ML Engineer',
  'Computer Vision Engineer',
  'Robotics & Simulation Researcher',
  'Full-Stack Builder',
  'Applied ML Systems',
]

const SOCIAL_LINKS = [
  { id: 'github', label: 'GitHub', href: `https://github.com/${GITHUB_USERNAME}` },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/aditya-dhayapulay' },
  { id: 'email', label: 'Email', href: 'mailto:dhayapulay.aditya@gmail.com' },
]

const PROJECT_FILTERS = ['All', 'AI / ML', 'Data', 'Full-Stack']

const Icon = ({ name, className = 'h-5 w-5' }) => {
  const paths = {
    github: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
      />
    ),
    linkedin: (
      <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5ZM.24 8h4.52v14H.24V8Zm7.27 0h4.33v1.914h.062c.603-1.142 2.075-2.346 4.27-2.346 4.567 0 5.41 3.005 5.41 6.913V22h-4.51v-6.617c0-1.578-.028-3.609-2.198-3.609-2.2 0-2.537 1.72-2.537 3.495V22h-4.51V8Z" />
    ),
    email: (
      <path d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75Zm2.038.34 7.712 5.142 7.712-5.141A.75.75 0 0 0 19.5 6h-15a.75.75 0 0 0-.212.09Zm15.212 1.733-7.087 4.724a.75.75 0 0 1-.826 0L4.5 8.823V17.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75V8.823Z" />
    ),
    sun: (
      <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-15a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1Zm0 16a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM4 11a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2h1Zm17 0a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM5.64 5.64a1 1 0 0 1 1.42 0l.7.7A1 1 0 0 1 6.34 7.76l-.7-.7a1 1 0 0 1 0-1.42Zm11.3 11.3a1 1 0 0 1 1.42 0l.7.7a1 1 0 0 1-1.42 1.42l-.7-.7a1 1 0 0 1 0-1.42Zm1.42-11.3a1 1 0 0 1 0 1.42l-.7.7a1 1 0 1 1-1.42-1.42l.7-.7a1 1 0 0 1 1.42 0ZM7.06 16.94a1 1 0 0 1 0 1.42l-.7.7a1 1 0 0 1-1.42-1.42l.7-.7a1 1 0 0 1 1.42 0Z" />
    ),
    moon: (
      <path d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
    ),
    menu: <path d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />,
    close: <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />,
    arrowUp: <path d="M12 19V5m0 0-6 6m6-6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
    external: <path d="M13.5 6H18v4.5M18 6l-7.5 7.5M15 13.5V18H6V9h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
    star: <path d="m12 2.5 2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 18.56l-5.9 3.1 1.13-6.57L2.45 9.44l6.6-.96L12 2.5Z" />,
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

const AnimatedNumber = ({ value, suffix = '', duration = 1400 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (typeof value !== 'number' || Number.isNaN(value)) return
    let raf
    const start = performance.now()
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export default function Page() {
  const [theme, setTheme] = useState('light')
  const [recruiterMode, setRecruiterMode] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [roleIndex, setRoleIndex] = useState(0)
  const [showTop, setShowTop] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const [contactHover, setContactHover] = useState('')
  const [projectFilter, setProjectFilter] = useState('All')

  const [recentCommits, setRecentCommits] = useState([])
  const [activeRepos, setActiveRepos] = useState([])
  const [activityLoading, setActivityLoading] = useState(true)
  const [activityError, setActivityError] = useState('')
  const [pullRequests, setPullRequests] = useState([])
  const [contributionsLoading, setContributionsLoading] = useState(true)
  const [stats, setStats] = useState(null)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })

  const contactBackgrounds = {
    email: '/contact/email-bg.svg',
    linkedin: '/contact/linkedin-bg.svg',
    github: '/contact/github-bg.svg',
  }

  const projects = [
    {
      title: 'PCB Defect Detection Capstone',
      description:
        'Six-class PCB inspection system using YOLO11l and RT-DETR-L benchmarks, delivering 98.3% precision, 98.8% recall, and 0.99 mAP50 in a live Hugging Face inspection app.',
      recruiterSummary:
        'Published computer-vision work: rigorous model evaluation, ONNX deployment artifacts, and a live inspection workflow with downloadable results.',
      tech: 'Python, YOLO11, RT-DETR, OpenCV, ONNX',
      category: 'AI / ML',
      github: 'https://github.com/adit24dhaya/Capstone_project',
      demo: 'https://adiivd-pcb-defect-detection.hf.space',
      accent: 'bg-gradient-to-r from-[#7b61ff] to-[#ff9500]',
      featured: true,
    },
    {
      title: 'Healthcare Agent System',
      description:
        'Four-agent healthcare decision-support platform with orchestration, retrieval, recommendations, explainability, safety guardrails, audit logging, and a Dockerized REST API.',
      recruiterSummary:
        'Shows agent orchestration, RAG pipelines, explainability, and applied AI system design beyond a single-model notebook.',
      tech: 'Python, RAG, FastAPI, Docker, pytest',
      category: 'AI / ML',
      github: 'https://github.com/adit24dhaya/healthcare-agent-system',
      demo: 'https://healthcare-agent-system-teal.vercel.app',
      accent: 'bg-gradient-to-r from-[#0071e3] to-[#34c759]',
      featured: true,
    },
    {
      title: 'Real-Time Fraud Risk Pipeline',
      description:
        'Production-style transaction fraud scoring on the IEEE-CIS dataset: XGBoost inference, cost-based thresholding, Tree SHAP explainability, Evidently drift monitoring, FastAPI service, and a Streamlit workbench.',
      recruiterSummary:
        'End-to-end MLOps: model serving, cost-aware decisions, explainability, drift monitoring, and deployed API + UI.',
      tech: 'Python, XGBoost, SHAP, FastAPI, Streamlit',
      category: 'Data',
      github: 'https://github.com/adit24dhaya/fraud-risk-pipeline',
      demo: 'https://adit-txn-risk-pipeline-ui-e2c4483417ee.herokuapp.com/',
      accent: 'bg-gradient-to-r from-[#5e8cff] to-[#7b61ff]',
      featured: true,
    },
    {
      title: 'Stock Sentiment Trading',
      description:
        'NLP-driven trading simulation combining BERT-scored financial news, Yahoo Finance data, confidence-weighted trade decisions, and historical backtesting.',
      recruiterSummary:
        'End-to-end data + ML pipeline: ingestion, sentiment modeling, strategy logic, and evaluation metrics.',
      tech: 'Python, BERT, NewsAPI, yfinance',
      category: 'Data',
      github: 'https://github.com/adit24dhaya/Stock-Sentiment-Trading-with-News-Analysis',
      accent: 'bg-gradient-to-r from-[#2f80ed] to-[#6fc3ff]',
    },
    {
      title: 'Audio Anomaly Detection',
      description:
        'TensorFlow/Keras autoencoder pipeline for industrial fan audio anomaly detection using Librosa log-mel spectrogram features and reproducible evaluation workflows.',
      recruiterSummary:
        'Directly tied to DRDO research themes: anomaly detection, TensorFlow, and measurable accuracy gains.',
      tech: 'Python, TensorFlow, Librosa, CUDA',
      category: 'AI / ML',
      github: 'https://github.com/adit24dhaya/audio_anomaly',
      accent: 'bg-gradient-to-r from-[#ff9500] to-[#ff3b30]',
    },
    {
      title: 'Dog Breed Classification',
      description:
        'Deep-learning image classifier using Inception-ResNet-V2 across 120+ dog breeds with 90%+ accuracy, GPU-accelerated training, and OpenCV preprocessing on 10,000+ images.',
      recruiterSummary:
        'Computer vision at scale: transfer learning, data pipeline engineering, and strong measured accuracy.',
      tech: 'Python, TensorFlow, Keras, OpenCV',
      category: 'AI / ML',
      github: 'https://github.com/adit24dhaya/Dog_Breed_Classification',
      accent: 'bg-gradient-to-r from-[#0071e3] to-[#7b61ff]',
    },
    {
      title: 'CSUF Advising System',
      description:
        'Student-facing academic advising platform with a responsive React interface, Firebase-backed real-time data integration, and usability-focused workflows.',
      recruiterSummary:
        'Full-stack product work: React UI, Firebase, REST APIs, and student workflow design.',
      tech: 'React, JavaScript, Tailwind CSS, Firebase',
      category: 'Full-Stack',
      github: 'https://github.com/adit24dhaya/CSUF-Advising-System',
      accent: 'bg-gradient-to-r from-[#5e8cff] to-[#af52de]',
    },
    {
      title: 'Image Classification Web Service',
      description:
        'Flask image-classification service with batch uploads, confidence scoring, health and metrics endpoints, image-hash caching, retry handling, pytest, and CI.',
      recruiterSummary:
        'Model-in-the-loop product: upload UX, API inference, and clear prediction presentation.',
      tech: 'Flask, Hugging Face, pytest, GitHub Actions',
      category: 'Full-Stack',
      github: 'https://github.com/adit24dhaya/Detect---Not-Hot-Dogs-with-hugging-face-API',
      accent: 'bg-gradient-to-r from-[#0071e3] to-[#7b61ff]',
    },
    {
      title: 'Caffinder',
      description:
        'Cafe discovery app with geolocation, Google Maps & Places APIs, and a card-based UI for nearby place discovery.',
      recruiterSummary:
        'Location-based product engineering with third-party APIs, caching, and responsive interaction design.',
      tech: 'JavaScript, Google Maps, Places API',
      category: 'Full-Stack',
      github: 'https://github.com/adit24dhaya/caffinder',
      accent: 'bg-gradient-to-r from-[#2f80ed] to-[#6fc3ff]',
    },
  ]

  const visibleProjects = useMemo(
    () => (projectFilter === 'All' ? projects : projects.filter((p) => p.category === projectFilter)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projectFilter],
  )

  // Theme bootstrap from <html> class set by the no-flash script.
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(isDark ? 'dark' : 'light')
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      document.documentElement.classList.toggle('dark', next === 'dark')
      try {
        localStorage.setItem('theme', next)
      } catch {}
      return next
    })
  }, [])

  // Rotating hero role text.
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROTATING_ROLES.length)
    }, 2600)
    return () => clearInterval(timer)
  }, [])

  // Scroll-spy + back-to-top.
  useEffect(() => {
    const sectionIds = ['home', ...NAV_LINKS.map((link) => link.id)]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const loadGitHubActivity = async () => {
      try {
        setActivityLoading(true)
        setActivityError('')
        const activityRes = await fetch('/api/activity')
        if (!activityRes.ok) throw new Error('Unable to load GitHub activity right now.')
        const activityData = await activityRes.json()
        setRecentCommits(activityData.commits || [])
        setActiveRepos(activityData.repos || [])
      } catch (error) {
        setActivityError(error.message || 'Failed to fetch GitHub activity.')
      } finally {
        setActivityLoading(false)
      }
    }
    loadGitHubActivity()
  }, [])

  useEffect(() => {
    const loadContributions = async () => {
      try {
        setContributionsLoading(true)
        const response = await fetch('/api/contributions')
        if (!response.ok) return
        const data = await response.json()
        setPullRequests(data.pulls || [])
      } finally {
        setContributionsLoading(false)
      }
    }
    loadContributions()
  }, [])

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetch('/api/stats')
        if (!response.ok) return
        const data = await response.json()
        if (!data.error) setStats(data)
      } catch {}
    }
    loadStats()
  }, [])

  const githubStats = useMemo(() => {
    if (!stats) return null
    return [
      { value: stats.publicRepos, suffix: '', label: 'Public repos' },
      { value: stats.totalStars, suffix: '', label: 'Repo stars' },
      { value: stats.followers, suffix: '', label: 'Followers' },
      { value: stats.yearsOnGitHub, suffix: '+', label: 'Years on GitHub' },
    ]
  }, [stats])

  const impactHighlights = useMemo(
    () => [
      { value: '40%', label: 'accuracy lift', detail: 'DRDO audio anomaly detection' },
      { value: '0.99', label: 'mAP50', detail: 'PCB defect detection capstone' },
      { value: 'ROS 2', label: 'robotics stack', detail: 'Isaac Sim smart-manufacturing research' },
      { value: '4', label: 'AI agents', detail: 'healthcare decision-support platform' },
    ],
    [],
  )

  const aboutStories = [
    {
      eyebrow: 'Current research',
      title: 'Autonomous robotics for smart manufacturing',
      body:
        'Building a physics-grounded Isaac Sim smart-assembly testbed with a TurtleBot3 transporter, four Franka arms, lidar navigation, and ROS 2 coordination for manufacturing research.',
      tags: ['Reinforcement Learning', 'Isaac Sim', 'ROS 2', 'Robotics'],
    },
    {
      eyebrow: 'Applied ML impact',
      title: 'Published PCB defect detection',
      body:
        'First-author work accepted at ESCS\'26 / Springer, pairing a six-class YOLO11 inspection model with live annotated detections, pass/review verdicts, and exportable results.',
      tags: ['Computer Vision', 'YOLO11', 'ONNX', 'Hugging Face'],
    },
  ]

  const recruiterStories = [
    {
      eyebrow: 'Best fit',
      title: 'AI / ML engineer roles',
      body:
        'Strongest match for teams building applied ML systems, data-backed products, autonomy workflows, and user-facing AI tools.',
      tags: ['Applied ML', 'Full-stack AI', 'Autonomy'],
    },
    {
      eyebrow: 'Interview hooks',
      title: 'Research translated into software',
      body:
        'Good talking points include Isaac Sim research, DRDO anomaly detection, CUDA acceleration, and product-minded project delivery.',
      tags: ['Research', 'Systems', 'Product UX'],
    },
  ]

  const educationItems = [
    { school: 'CSUF', detail: 'M.S. Computer Science (Aug 2024 – Aug 2026)', stat: 'GPA 3.78' },
    { school: 'JNTUH', detail: 'B.Tech Computer Science & Engineering', stat: 'GPA 7.87' },
  ]

  const skillGroups = {
    Languages: ['Python', 'C++', 'Java', 'JavaScript', 'SQL', 'HTML/CSS'],
    'ML & AI': ['PyTorch', 'TensorFlow', 'XGBoost', 'YOLO11', 'RT-DETR', 'OpenCV', 'Hugging Face', 'SHAP'],
    'Robotics & MLOps': ['NVIDIA Isaac Sim', 'ROS 2', 'Docker', 'FastAPI', 'ONNX', 'GitHub Actions', 'Kubernetes'],
    Web: ['Flask', 'React', 'Tailwind CSS', 'REST APIs', 'Firebase', 'GitHub Actions'],
    Tools: ['Git', 'Jupyter Notebook', 'Google Colab', 'Bash', 'Jira', 'VS Code'],
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  }

  const staggerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 22, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  const formatActivityDate = (date) => {
    if (!date) return 'Recently updated'
    return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date))
  }

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('dhayapulay.aditya@gmail.com')
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 1800)
    } catch {}
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <div className="page-gradient min-h-screen text-[var(--text)]">
      <motion.div
        className="fixed left-0 right-0 top-0 z-40 h-1 origin-left bg-gradient-to-r from-[#0071e3] via-[#5e8cff] to-[#7b61ff]"
        style={{ scaleX }}
      />
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--surface)] backdrop-blur-xl">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-3 md:px-8">
          <a href="#home" className="text-sm font-semibold tracking-tight text-[var(--text)] md:text-base">
            Dhayapulay Aditya Varun
          </a>
          <div className="flex items-center gap-2 md:gap-3">
            <ul className="hidden items-center gap-6 text-xs font-medium text-[var(--text-soft)] md:flex">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={`relative transition hover:text-[var(--accent-text)] ${
                      activeSection === link.id ? 'text-[var(--accent-text)]' : ''
                    }`}
                  >
                    {link.label}
                    {activeSection === link.id && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[#0071e3]"
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--hairline)] bg-[var(--surface)] text-[var(--text)] shadow-sm transition hover:text-[var(--accent-text)]"
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="h-4 w-4" />
            </button>

            <button
              type="button"
              aria-pressed={recruiterMode}
              onClick={() => setRecruiterMode((prev) => !prev)}
              className={`hidden min-w-[116px] rounded-full border px-3.5 py-1.5 text-center text-xs font-semibold transition sm:block ${
                recruiterMode
                  ? 'border-[#0071e3] bg-[#0071e3] text-white shadow-sm'
                  : 'border-[var(--hairline)] bg-[var(--surface)] text-[var(--text)] shadow-sm hover:border-[#0071e3]/40 hover:text-[var(--accent-text)]'
              }`}
            >
              {recruiterMode ? 'Recruiter On' : 'Recruiter Mode'}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--hairline)] bg-[var(--surface)] text-[var(--text)] shadow-sm md:hidden"
            >
              <Icon name={mobileOpen ? 'close' : 'menu'} className="h-5 w-5" />
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-[var(--border)] bg-[var(--surface-strong)] px-5 py-4 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 text-sm font-medium text-[var(--text-soft)]">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-lg px-3 py-2 transition hover:bg-[var(--chip)] hover:text-[var(--accent-text)] ${
                      activeSection === link.id ? 'text-[var(--accent-text)]' : ''
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setRecruiterMode((prev) => !prev)
                setMobileOpen(false)
              }}
              className="mt-3 w-full rounded-full border border-[#0071e3] bg-[#0071e3] px-4 py-2 text-center text-xs font-semibold text-white"
            >
              {recruiterMode ? 'Recruiter Mode: On' : 'Enable Recruiter Mode'}
            </button>
          </motion.div>
        )}
      </header>

      <main>
        <motion.section
          id="home"
          className="hero-band relative overflow-hidden"
          variants={staggerVariants}
          initial="hidden"
          animate="show"
        >
          <div className="color-field" />
          <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[minmax(0,1fr)_460px] lg:py-20">
            <motion.div className="space-y-6 lg:col-start-1 lg:row-start-1" variants={itemVariants}>
              <motion.div className="flex flex-wrap items-center gap-2" variants={itemVariants}>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#34c759]/25 bg-[#34c759]/10 px-3 py-1.5 text-xs font-semibold text-[#1f9d4d] dark:text-[#5fe08a]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34c759] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34c759]" />
                  </span>
                  Open to AI / ML & SWE roles
                </span>
                <span className="inline-flex rounded-full border border-[#0071e3]/15 bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold text-[var(--accent-text)] shadow-sm backdrop-blur">
                  {recruiterMode ? 'Recruiter Snapshot' : 'M.S. CS candidate @ CSUF'}
                </span>
              </motion.div>

              <div className="space-y-5">
                <motion.h1
                  className="max-w-4xl text-4xl font-semibold leading-[1.03] tracking-tight text-[var(--text)] md:text-6xl"
                  variants={itemVariants}
                >
                  AI engineer building useful software with clarity and craft.
                </motion.h1>
                <motion.div className="flex h-7 items-center text-base font-semibold text-[var(--accent-text)] md:text-lg" variants={itemVariants}>
                  <span className="mr-2 text-[var(--text-muted)]">I work as an</span>
                  <span className="relative inline-flex overflow-hidden">
                    <motion.span
                      key={roleIndex}
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                      {ROTATING_ROLES[roleIndex]}
                    </motion.span>
                  </span>
                </motion.div>
                <motion.p className="max-w-2xl text-base leading-8 text-[var(--text-soft)] md:text-lg" variants={itemVariants}>
                  I work across machine learning, data-driven systems, and full-stack development with a focus on
                  measurable outcomes, elegant interfaces, and production-minded execution.
                </motion.p>
              </div>

              <motion.div className="flex flex-wrap items-center gap-3" variants={itemVariants}>
                <motion.a
                  href="#projects"
                  className="rounded-full bg-[#0071e3] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(0,113,227,0.24)] transition hover:bg-[#0077ed]"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Projects
                </motion.a>
                <motion.a
                  href="#resume"
                  className="rounded-full border border-[var(--hairline)] bg-[var(--surface-strong)] px-5 py-3 text-sm font-semibold text-[var(--text)] shadow-sm backdrop-blur transition hover:border-[#0071e3]/30 hover:text-[var(--accent-text)]"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Resume
                </motion.a>
                <div className="flex items-center gap-2">
                  {SOCIAL_LINKS.map((social) => (
                    <motion.a
                      key={social.id}
                      href={social.href}
                      target={social.id === 'email' ? undefined : '_blank'}
                      rel="noreferrer"
                      aria-label={social.label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hairline)] bg-[var(--surface)] text-[var(--text)] shadow-sm transition hover:text-[var(--accent-text)]"
                      whileHover={{ y: -2, scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <Icon name={social.id} className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="interactive-card relative mx-auto w-full max-w-[460px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_24px_70px_rgba(28,43,68,0.13)] backdrop-blur lg:col-start-2 lg:row-start-1"
              variants={cardVariants}
              whileHover={{ y: -6, rotateX: 1.2, rotateY: -1.2 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            >
              <div className="relative p-4">
                <div className="hero-photo rounded-2xl border border-[var(--hairline)] p-6 shadow-inner">
                  <Image
                    src={heroImage}
                    alt="Portfolio profile illustration"
                    className="mx-auto aspect-square w-full max-w-[300px] object-contain"
                    priority
                  />
                </div>
                <motion.div className="mt-4 grid gap-2 sm:grid-cols-3" variants={staggerVariants}>
                  <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface-strong)] px-3 py-3">
                    <p className="text-sm font-semibold text-[var(--text)]">ML Systems</p>
                    <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">Applied AI workflows.</p>
                  </div>
                  <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface-strong)] px-3 py-3">
                    <p className="text-sm font-semibold text-[var(--text)]">Full Stack</p>
                    <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">React, APIs, UX.</p>
                  </div>
                  <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface-strong)] px-3 py-3">
                    <p className="text-sm font-semibold text-[var(--text)]">Now Shipping</p>
                    <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">Live project work.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {githubStats && (
            <motion.div
              className="relative z-10 mx-auto -mb-2 grid w-full max-w-7xl grid-cols-2 gap-3 px-5 pb-10 md:grid-cols-4 md:px-8"
              variants={staggerVariants}
              initial="hidden"
              animate="show"
            >
              {githubStats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4 text-center shadow-sm backdrop-blur"
                  variants={cardVariants}
                >
                  <p className="text-2xl font-semibold tracking-tight text-[var(--text)] md:text-3xl">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.section>

        <div className="section-wash space-y-12 py-10 md:space-y-14 md:py-14">
          <motion.section
            id="about"
            className="mx-auto grid w-full max-w-7xl gap-7 px-5 md:px-8 lg:grid-cols-[0.72fr_1.28fr]"
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="self-start lg:sticky lg:top-24">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">About</p>
              <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl lg:text-5xl">
                {recruiterMode ? 'Recruiter snapshot.' : 'Research depth, product sensibility.'}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-[var(--text-soft)]">
                {recruiterMode
                  ? 'A quick read on role fit, technical strengths, and interview-ready impact across AI, ML, and full-stack product work.'
                  : 'I build AI and autonomy systems with enough product thinking to make the work usable, legible, and ready for real workflows.'}
              </p>
            </div>

            <motion.div className="grid gap-4 lg:grid-cols-2" variants={staggerVariants} initial={false} animate="show">
              {(recruiterMode ? recruiterStories : aboutStories).map((story) => (
                <motion.article
                  key={story.title}
                  className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_14px_40px_rgba(28,43,68,0.07)] backdrop-blur transition hover:bg-[var(--surface-strong)] md:p-6"
                  variants={cardVariants}
                  whileHover={{ y: -3 }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">{story.eyebrow}</p>
                    <span className="h-2 w-2 rounded-full bg-[#34c759]" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-[var(--text)] md:text-2xl">{story.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">{story.body}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {story.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-[#0071e3]/10 bg-[var(--chip-accent)] px-3 py-1 text-xs font-semibold text-[var(--accent-text)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}

              <div className="grid gap-2 sm:grid-cols-2 lg:col-span-2 xl:grid-cols-4">
                {impactHighlights.map((highlight) => (
                  <motion.div
                    key={highlight.label}
                    className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-3 shadow-sm backdrop-blur"
                    variants={cardVariants}
                    whileHover={{ y: -2 }}
                  >
                    <p className="text-xl font-semibold tracking-tight text-[var(--text)]">{highlight.value}</p>
                    <p className="mt-0.5 text-[10px] font-semibold uppercase text-[var(--accent-text)]">{highlight.label}</p>
                    <p className="mt-1 text-[11px] leading-4 text-[var(--text-muted)]">{highlight.detail}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm backdrop-blur lg:col-span-2"
                variants={cardVariants}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">Education</p>
                <div className="mt-4 grid gap-3">
                  {educationItems.map((item) => (
                    <div key={item.school} className="flex items-center justify-between gap-4 rounded-lg border border-[var(--hairline)] bg-[var(--chip)] px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-[var(--text)]">{item.school}</p>
                        <p className="mt-1 text-xs text-[var(--text-muted)]">{item.detail}</p>
                      </div>
                      <p className="shrink-0 text-xs font-semibold text-[var(--accent-text)]">{item.stat}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.section>

          <motion.section
            id="projects"
            className="mx-auto w-full max-w-7xl space-y-6 px-5 md:px-8"
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="grid gap-4 border-t border-[var(--border)] pt-10 lg:grid-cols-[0.82fr_1fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Selected Work</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">Projects</h2>
              </div>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <p className="max-w-xl text-sm leading-6 text-[var(--text-soft)]">
                  A focused set of shipped work across applied AI, full-stack tools, and user-facing engineering.
                </p>
                <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="rounded-full bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--accent-text)] shadow-sm transition hover:bg-[var(--surface-strong)] hover:text-[var(--accent-text-strong)]">
                  GitHub profile
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {PROJECT_FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setProjectFilter(filter)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                    projectFilter === filter
                      ? 'border-[#0071e3] bg-[#0071e3] text-white shadow-sm'
                      : 'border-[var(--hairline)] bg-[var(--surface)] text-[var(--text-soft)] hover:border-[#0071e3]/40 hover:text-[var(--accent-text)]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <motion.div className="grid gap-4 md:grid-cols-2" variants={staggerVariants} initial="hidden" animate="show" key={projectFilter}>
              {visibleProjects.map((project) => (
                <motion.article
                  key={project.title}
                  className="group relative flex min-h-[260px] flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_14px_40px_rgba(28,43,68,0.07)] backdrop-blur transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-strong)] hover:shadow-[0_20px_55px_rgba(28,43,68,0.12)]"
                  variants={cardVariants}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                >
                  <div className={`absolute inset-x-0 top-0 h-1 ${project.accent}`} />
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text)]">{project.title}</h3>
                    {project.featured && (
                      <span className="mt-2 inline-flex shrink-0 items-center gap-1 rounded-full bg-[var(--chip-accent)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--accent-text)]">
                        <Icon name="star" className="h-3 w-3" /> Featured
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">
                    {recruiterMode ? project.recruiterSummary : project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.split(', ').map((tech) => (
                      <span key={tech} className="rounded-full border border-[var(--hairline)] bg-[var(--chip)] px-3 py-1 text-xs font-semibold text-[var(--text-soft)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center gap-4 pt-6">
                    <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent-text)] hover:text-[var(--accent-text-strong)]">
                      <Icon name="github" className="h-4 w-4" /> Repository
                    </a>
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent-text)] hover:text-[var(--accent-text-strong)]">
                        <Icon name="external" className="h-4 w-4" /> Live demo
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </motion.section>

          <motion.section
            id="contributions"
            className="mx-auto w-full max-w-7xl space-y-6 px-5 md:px-8"
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="grid gap-4 border-t border-[var(--border)] pt-10 lg:grid-cols-[0.82fr_1fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Open Source</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">Contributions</h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-[var(--text-soft)]">
                {recruiterMode
                  ? 'Recent pull requests to major ML/Python libraries — CI, APIs, data quality, and docs.'
                  : 'Pull requests across open-source ML and developer tooling repos, including merged work on falsify-inspect and licinexus-mcp.'}
              </p>
            </div>

            {contributionsLoading && (
              <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-6 text-sm text-[var(--text-soft)] shadow-sm backdrop-blur">
                Loading recent pull requests...
              </div>
            )}

            {!contributionsLoading && (
              <motion.div className="grid gap-3 md:grid-cols-2" variants={staggerVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
                {pullRequests.length === 0 && (
                  <p className="text-sm text-[var(--text-soft)] md:col-span-2">No public pull requests found.</p>
                )}
                {pullRequests.map((pr) => (
                  <motion.a
                    key={pr.id}
                    href={pr.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_14px_40px_rgba(28,43,68,0.07)] backdrop-blur transition hover:border-[#0071e3]/25 hover:bg-[var(--surface-strong)]"
                    variants={cardVariants}
                    whileHover={{ y: -3 }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                          pr.state === 'merged'
                            ? 'bg-[#e8f8ee] text-[#1f7a3f] dark:bg-[#34c759]/15 dark:text-[#5fe08a]'
                            : pr.state === 'open'
                              ? 'bg-[var(--chip-accent)] text-[var(--accent-text)]'
                              : 'bg-[var(--chip)] text-[var(--text-muted)]'
                        }`}
                      >
                        {pr.state}
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">{formatActivityDate(pr.updatedAt)}</span>
                    </div>
                    <p className="mt-3 text-sm font-semibold leading-6 text-[var(--text)]">{pr.title}</p>
                    <p className="mt-2 text-xs font-medium text-[var(--accent-text)]">{pr.repo}</p>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </motion.section>
        </div>

        <motion.section
          id="activity"
          className="activity-band relative mx-auto w-full max-w-7xl space-y-6 overflow-hidden px-5 py-14 md:px-8 md:py-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="pointer-events-none absolute right-4 top-20 h-52 w-52 rounded-full bg-[#7b61ff]/10 blur-3xl" />
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Live Activity</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">What I&apos;m building</h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--text-soft)]">
                Pulled from recent public GitHub events plus direct repository commit checks, including this portfolio.
              </p>
            </div>
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="text-sm font-semibold text-[var(--accent-text)] hover:text-[var(--accent-text-strong)]">
              View full profile
            </a>
          </div>

          {activityLoading && (
            <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-6 text-sm text-[var(--text-soft)] shadow-sm backdrop-blur">
              Fetching latest GitHub activity...
            </div>
          )}

          {activityError && (
            <div className="rounded-[1.75rem] border border-[#ff3b30]/20 bg-[#fff2f1] p-6 text-sm text-[#b42318] dark:bg-[#ff3b30]/10 dark:text-[#ff8a80]">
              {activityError}
            </div>
          )}

          {!activityLoading && !activityError && (
            <motion.div className="grid gap-4 lg:grid-cols-2" variants={staggerVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
              <motion.div
                className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_18px_55px_rgba(28,43,68,0.08)] backdrop-blur"
                variants={cardVariants}
              >
                <h3 className="text-xl font-semibold tracking-tight text-[var(--text)]">Recent Commits</h3>
                <div className="mt-5 space-y-3">
                  {recentCommits.length === 0 && <p className="text-sm text-[var(--text-soft)]">No recent public commits found.</p>}
                  {recentCommits.map((commit) => (
                    <motion.a
                      key={commit.id}
                      href={commit.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-2xl border border-[var(--hairline)] bg-[var(--chip)] px-4 py-3 text-sm transition hover:border-[#0071e3]/25 hover:bg-[var(--chip-hover)]"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <p className="font-medium text-[var(--text)]">{commit.message}</p>
                        <span className="text-xs text-[var(--text-muted)]">{formatActivityDate(commit.date)}</span>
                      </div>
                      <p className="mt-1 text-xs text-[var(--text-muted)]">{commit.repo} - {commit.sha}</p>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_18px_55px_rgba(28,43,68,0.08)] backdrop-blur"
                variants={cardVariants}
              >
                <h3 className="text-xl font-semibold tracking-tight text-[var(--text)]">Active Repositories</h3>
                <div className="mt-5 space-y-3">
                  {activeRepos.map((repo) => (
                    <motion.a
                      key={repo.id}
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-2xl border border-[var(--hairline)] bg-[var(--chip)] px-4 py-3 transition hover:border-[#0071e3]/25 hover:bg-[var(--chip-hover)]"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <p className="text-sm font-medium text-[var(--text)]">{repo.name}</p>
                        <span className="text-xs text-[var(--text-muted)]">{formatActivityDate(repo.updatedAt)}</span>
                      </div>
                      <p className="mt-1 text-xs text-[var(--text-muted)]">{repo.description}</p>
                      <p className="mt-2 text-xs font-semibold text-[var(--accent-text)]">{repo.language}</p>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.section>

        <div className="section-wash py-14 md:py-20">
          <motion.section
            id="skills"
            className="mx-auto w-full max-w-7xl space-y-6 px-5 md:px-8"
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Capabilities</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">Skills</h2>
            </div>
            <motion.div className="grid gap-4 md:grid-cols-2" variants={staggerVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
              {Object.entries(skillGroups).map(([group, skills]) => (
                <motion.div
                  key={group}
                  className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_14px_40px_rgba(28,43,68,0.07)] backdrop-blur"
                  variants={cardVariants}
                  whileHover={{ y: -3 }}
                >
                  <h3 className="text-lg font-semibold text-[var(--text)]">{group}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span key={skill} className="rounded-full border border-[var(--hairline)] bg-[var(--chip)] px-3 py-1.5 text-xs font-medium text-[var(--text-soft)] shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </div>

        <motion.section
          id="resume"
          className="mx-auto grid w-full max-w-7xl gap-5 px-5 py-14 md:grid-cols-2 md:px-8 md:py-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="rounded-[1.75rem] border border-[var(--border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(232,243,255,0.82)_48%,rgba(247,242,255,0.78))] p-8 text-[var(--text)] shadow-[0_24px_70px_rgba(28,43,68,0.12)] backdrop-blur dark:bg-[linear-gradient(135deg,rgba(30,38,56,0.9),rgba(20,40,70,0.85)_48%,rgba(35,28,60,0.85))] md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Resume</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">A concise view of the work.</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--text-soft)]">
              Download my latest resume for experience, education, technical skills, and project outcomes.
            </p>
            <a href="/resume.md" download className="mt-8 inline-flex rounded-full bg-[#0071e3] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0077ed]">
              Download Resume
            </a>
          </div>

          <div id="contact" className="relative overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[0_18px_55px_rgba(28,43,68,0.08)] backdrop-blur md:p-10">
            <div
              className={`pointer-events-none absolute inset-0 bg-cover bg-center transition-opacity duration-300 ${
                contactHover ? 'opacity-25' : 'opacity-0'
              }`}
              style={{ backgroundImage: contactHover ? `url(${contactBackgrounds[contactHover]})` : 'none' }}
            />
            <div className="relative z-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Contact</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">Let&apos;s connect.</h2>
              <p className="mt-5 text-base leading-7 text-[var(--text-soft)]">
                Open to opportunities, collaborations, and project conversations.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm font-semibold">
                <a
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--chip-accent)] px-4 py-2 text-[var(--accent-text)] hover:text-[var(--accent-text-strong)]"
                  href="mailto:dhayapulay.aditya@gmail.com"
                  onMouseEnter={() => setContactHover('email')}
                  onMouseLeave={() => setContactHover('')}
                  onFocus={() => setContactHover('email')}
                  onBlur={() => setContactHover('')}
                >
                  <Icon name="email" className="h-4 w-4" /> Email
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--chip)] px-4 py-2 text-[var(--text)] hover:text-[var(--accent-text)]"
                  href="https://www.linkedin.com/in/aditya-dhayapulay"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setContactHover('linkedin')}
                  onMouseLeave={() => setContactHover('')}
                  onFocus={() => setContactHover('linkedin')}
                  onBlur={() => setContactHover('')}
                >
                  <Icon name="linkedin" className="h-4 w-4" /> LinkedIn
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--chip)] px-4 py-2 text-[var(--text)] hover:text-[var(--accent-text)]"
                  href="https://github.com/adit24dhaya"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setContactHover('github')}
                  onMouseLeave={() => setContactHover('')}
                  onFocus={() => setContactHover('github')}
                  onBlur={() => setContactHover('')}
                >
                  <Icon name="github" className="h-4 w-4" /> GitHub
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--surface)] px-4 py-2 text-[var(--text-soft)] transition hover:text-[var(--accent-text)]"
                >
                  {emailCopied ? 'Copied!' : 'Copy email'}
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-[var(--border)] bg-[var(--surface)] py-8 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-5 md:flex-row md:px-8">
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} Dhayapulay Aditya Varun. Built with Next.js & Tailwind CSS.
          </p>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target={social.id === 'email' ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--hairline)] bg-[var(--surface)] text-[var(--text-soft)] transition hover:text-[var(--accent-text)]"
              >
                <Icon name={social.id} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>

      <motion.button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showTop ? 1 : 0, scale: showTop ? 1 : 0.8, pointerEvents: showTop ? 'auto' : 'none' }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#0071e3] text-white shadow-[0_12px_28px_rgba(0,113,227,0.34)] transition hover:bg-[#0077ed]"
      >
        <Icon name="arrowUp" className="h-5 w-5" />
      </motion.button>
    </div>
  )
}

'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Image from 'next/image'
import heroImage from '../src/assets/hero.png'

const GITHUB_USERNAME = 'adit24dhaya'

export default function Page() {
  const [recruiterMode, setRecruiterMode] = useState(false)
  const [contactHover, setContactHover] = useState('')
  const [recentCommits, setRecentCommits] = useState([])
  const [activeRepos, setActiveRepos] = useState([])
  const [activityLoading, setActivityLoading] = useState(true)
  const [activityError, setActivityError] = useState('')
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })
  const contactBackgrounds = {
    email: '/contact/email-bg.svg',
    linkedin: '/contact/linkedin-bg.svg',
    github: '/contact/github-bg.svg',
  }

  const projects = [
    {
      title: 'Detect Not Hot Dogs',
      description:
        'Built a web application to classify food images with Hugging Face inference, including upload handling and confidence-based prediction output.',
      recruiterSummary:
        'Shows model-in-the-loop product flow: upload UX, API inference, confidence handling, and clear prediction output.',
      tech: 'Flask, Hugging Face API, JavaScript',
      github: 'https://github.com/adit24dhaya/Detect---Not-Hot-Dogs-with-hugging-face-API',
      accent: 'bg-gradient-to-r from-[#0071e3] to-[#7b61ff]',
    },
    {
      title: 'Caffinder',
      description:
        'Created a cafe discovery app with geolocation, Google Maps integration, and a dynamic UI to improve nearby place discovery.',
      recruiterSummary:
        'Demonstrates location-based product thinking with maps, nearby discovery, third-party APIs, and practical UX flow.',
      tech: 'JavaScript, Google Maps, Places API',
      github: 'https://github.com/adit24dhaya/caffinder',
      accent: 'bg-gradient-to-r from-[#2f80ed] to-[#6fc3ff]',
    },
    {
      title: 'CSUF Advising System',
      description:
        'Designed an advising-focused academic support platform to streamline course guidance workflows and improve student-facing usability.',
      recruiterSummary:
        'Relevant to student-support and workflow tools: React UI, Firebase data, and advising journeys built for usability.',
      tech: 'React, Tailwind CSS, Firebase',
      github: 'https://github.com/adit24dhaya/CSUF-Advising-System',
      accent: 'bg-gradient-to-r from-[#5e8cff] to-[#af52de]',
    },
    {
      title: 'Voice Assistance',
      description:
        'Built a voice-driven assistant project focused on speech input workflows and practical task automation features.',
      recruiterSummary:
        'Highlights Python automation, speech processing, command workflows, and assistant-style interaction patterns.',
      tech: 'Python, NLP, Speech Processing',
      github: 'https://github.com/adit24dhaya/Voice-assitance',
      accent: 'bg-gradient-to-r from-[#0071e3] to-[#b58cff]',
    },
  ]

  useEffect(() => {
    const loadGitHubActivity = async () => {
      try {
        setActivityLoading(true)
        setActivityError('')

        const activityRes = await fetch('/api/activity')
        if (!activityRes.ok) {
          throw new Error('Unable to load GitHub activity right now.')
        }
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

  const impactHighlights = useMemo(
    () => [
      { value: '40%', label: 'accuracy lift', detail: 'DRDO audio anomaly detection' },
      { value: '40%', label: 'faster training', detail: 'CUDA accelerated workflows' },
      { value: 'ROS 2', label: 'robotics stack', detail: 'multi-agent autonomy research' },
      { value: '5+', label: 'shipped builds', detail: 'ML, web, and data projects' },
    ],
    [],
  )

  const aboutStories = [
    {
      eyebrow: 'Current research',
      title: 'Autonomous robotics for smart manufacturing',
      body:
        'Building a simulated smart assembly cell where mobile robots and a robotic arm learn to coordinate tasks, routes, and schedules using reinforcement learning.',
      tags: ['Reinforcement Learning', 'Isaac Sim', 'ROS 2', 'Robotics'],
    },
    {
      eyebrow: 'Applied ML impact',
      title: 'Audio anomaly detection at DRDO',
      body:
        'Developed TensorFlow autoencoder workflows with CUDA acceleration, improving detection accuracy while cutting training time for faster experimentation.',
      tags: ['TensorFlow', 'CUDA', 'Autoencoders'],
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
    { school: 'CSUF', detail: 'M.S. Computer Science', stat: 'GPA 3.78' },
  ]

  const skillGroups = {
    Languages: ['Python', 'C++', 'Java', 'JavaScript', 'SQL', 'HTML/CSS'],
    'ML & AI': ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'Keras', 'OpenCV', 'Hugging Face', 'LangChain', 'OpenAI API'],
    'Data & Cloud': ['MLflow', 'Apache Spark', 'Power BI', 'AWS', 'Google Cloud', 'Docker', 'Kubernetes'],
    Web: ['Flask', 'React', 'Tailwind CSS', 'REST APIs', 'Firebase', 'GitHub Actions'],
    Tools: ['Git', 'Jupyter Notebook', 'Google Colab', 'Bash', 'Jira', 'VS Code'],
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  }

  const staggerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.04,
      },
    },
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
    return new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date))
  }

  return (
    <div className="page-gradient min-h-screen text-[#1d1d1f]">
      <motion.div
        className="fixed left-0 right-0 top-0 z-30 h-1 origin-left bg-gradient-to-r from-[#0071e3] via-[#5e8cff] to-[#7b61ff]"
        style={{ scaleX }}
      />
      <header className="sticky top-0 z-20 border-b border-white/70 bg-white/70 backdrop-blur-xl">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-3 md:px-8">
          <a href="#home" className="text-sm font-semibold tracking-tight text-[#1d1d1f] md:text-base">
            Dhayapulay Aditya Varun
          </a>
          <div className="flex items-center gap-3">
            <ul className="hidden items-center gap-6 text-xs font-medium text-[#515154] md:flex">
              <li><a href="#about" className="transition hover:text-[#0071e3]">About</a></li>
              <li><a href="#projects" className="transition hover:text-[#0071e3]">Projects</a></li>
              <li><a href="#activity" className="transition hover:text-[#0071e3]">Activity</a></li>
              <li><a href="#skills" className="transition hover:text-[#0071e3]">Skills</a></li>
              <li><a href="#contact" className="transition hover:text-[#0071e3]">Contact</a></li>
            </ul>
            <button
              type="button"
              aria-pressed={recruiterMode}
              onClick={() => setRecruiterMode((prev) => !prev)}
              className={`min-w-[116px] rounded-full border px-3.5 py-1.5 text-center text-xs font-semibold transition ${
                recruiterMode
                  ? 'border-[#0071e3] bg-[#0071e3] text-white shadow-sm'
                  : 'border-black/10 bg-white text-[#1d1d1f] shadow-sm hover:border-[#0071e3]/40 hover:text-[#0071e3]'
              }`}
            >
              {recruiterMode ? 'Recruiter On' : 'Recruiter Mode'}
            </button>
          </div>
        </nav>
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
              <motion.p
                className="inline-flex rounded-full border border-[#0071e3]/15 bg-white/75 px-4 py-2 text-xs font-semibold text-[#0066cc] shadow-sm backdrop-blur"
                variants={itemVariants}
              >
                {recruiterMode ? 'Recruiter Snapshot' : 'MS Computer Science @ CSUF'}
              </motion.p>
              <div className="space-y-5">
                <motion.h1
                  className="max-w-4xl text-4xl font-semibold leading-[1.03] tracking-tight text-[#1d1d1f] md:text-6xl"
                  variants={itemVariants}
                >
                  AI engineer building useful software with clarity and craft.
                </motion.h1>
                <motion.p className="max-w-2xl text-base leading-8 text-[#515154] md:text-lg" variants={itemVariants}>
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
                  className="rounded-full border border-black/10 bg-white/85 px-5 py-3 text-sm font-semibold text-[#1d1d1f] shadow-sm backdrop-blur transition hover:border-[#0071e3]/30 hover:text-[#0071e3]"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Resume
                </motion.a>
                <motion.a
                  href="#contact"
                  className="rounded-full px-5 py-3 text-sm font-semibold text-[#0066cc] transition hover:bg-white/55 hover:text-[#004f9f]"
                  whileHover={{ y: -2 }}
                >
                  Contact
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              className="interactive-card relative mx-auto w-full max-w-[460px] overflow-hidden rounded-2xl border border-white/90 bg-white/80 shadow-[0_24px_70px_rgba(28,43,68,0.13)] backdrop-blur lg:col-start-2 lg:row-start-1"
              variants={cardVariants}
              whileHover={{ y: -6, rotateX: 1.2, rotateY: -1.2 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            >
              <div className="relative p-4">
                <div className="rounded-2xl border border-[#dce8f7] bg-[linear-gradient(180deg,#fbfdff,#f5f9ff)] p-6 shadow-inner">
                  <Image
                    src={heroImage}
                    alt="Portfolio profile illustration"
                    className="mx-auto aspect-square w-full max-w-[300px] object-contain"
                    priority
                  />
                </div>
                <motion.div className="mt-4 grid gap-2 sm:grid-cols-3" variants={staggerVariants}>
                  <div className="rounded-xl border border-black/5 bg-white/90 px-3 py-3">
                    <p className="text-sm font-semibold text-[#1d1d1f]">ML Systems</p>
                    <p className="mt-1 text-xs leading-5 text-[#6e6e73]">Applied AI workflows.</p>
                  </div>
                  <div className="rounded-xl border border-black/5 bg-white/90 px-3 py-3">
                    <p className="text-sm font-semibold text-[#1d1d1f]">Full Stack</p>
                    <p className="mt-1 text-xs leading-5 text-[#6e6e73]">React, APIs, UX.</p>
                  </div>
                  <div className="rounded-xl border border-black/5 bg-white/90 px-3 py-3">
                    <p className="text-sm font-semibold text-[#1d1d1f]">Now Shipping</p>
                    <p className="mt-1 text-xs leading-5 text-[#6e6e73]">Live project work.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
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
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6e6e73]">About</p>
              <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-4xl lg:text-5xl">
                {recruiterMode ? 'Recruiter snapshot.' : 'Research depth, product sensibility.'}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-[#515154]">
                {recruiterMode
                  ? 'A quick read on role fit, technical strengths, and interview-ready impact across AI, ML, and full-stack product work.'
                  : 'I build AI and autonomy systems with enough product thinking to make the work usable, legible, and ready for real workflows.'}
              </p>
            </div>

            <motion.div
              className="grid gap-4 lg:grid-cols-2"
              variants={staggerVariants}
              initial={false}
              animate="show"
            >
              {(recruiterMode ? recruiterStories : aboutStories).map((story) => (
                <motion.article
                  key={story.title}
                  className="rounded-lg border border-white/80 bg-white/80 p-5 shadow-[0_14px_40px_rgba(28,43,68,0.07)] backdrop-blur transition hover:bg-white/90 md:p-6"
                  variants={cardVariants}
                  whileHover={{ y: -3 }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6e6e73]">{story.eyebrow}</p>
                    <span className="h-2 w-2 rounded-full bg-[#34c759]" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-[#1d1d1f] md:text-2xl">{story.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#515154]">{story.body}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {story.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-[#0071e3]/10 bg-[#e8f3ff]/70 px-3 py-1 text-xs font-semibold text-[#0066cc]">
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
                    className="rounded-lg border border-white/80 bg-white/70 px-3 py-3 shadow-sm backdrop-blur"
                    variants={cardVariants}
                    whileHover={{ y: -2 }}
                  >
                    <p className="text-xl font-semibold tracking-tight text-[#1d1d1f]">{highlight.value}</p>
                    <p className="mt-0.5 text-[10px] font-semibold uppercase text-[#0066cc]">{highlight.label}</p>
                    <p className="mt-1 text-[11px] leading-4 text-[#6e6e73]">{highlight.detail}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="rounded-lg border border-white/80 bg-white/75 p-5 shadow-sm backdrop-blur lg:col-span-2"
                variants={cardVariants}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6e6e73]">Education</p>
                <div className="mt-4 grid gap-3">
                  {educationItems.map((item) => (
                    <div key={item.school} className="flex items-center justify-between gap-4 rounded-lg border border-black/5 bg-[#f7faff] px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-[#1d1d1f]">{item.school}</p>
                        <p className="mt-1 text-xs text-[#6e6e73]">{item.detail}</p>
                      </div>
                      <p className="shrink-0 text-xs font-semibold text-[#0066cc]">{item.stat}</p>
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
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="grid gap-4 border-t border-white/70 pt-10 lg:grid-cols-[0.82fr_1fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6e6e73]">Selected Work</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-5xl">Projects</h2>
              </div>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <p className="max-w-xl text-sm leading-6 text-[#515154]">
                  A focused set of shipped work across applied AI, full-stack tools, and user-facing engineering.
                </p>
                <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="rounded-full bg-white/75 px-4 py-2 text-sm font-semibold text-[#0066cc] shadow-sm transition hover:bg-white hover:text-[#004f9f]">
                  GitHub profile
                </a>
              </div>
            </div>
            <motion.div
              className="grid gap-4 md:grid-cols-2"
              variants={staggerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.18 }}
            >
              {projects.map((project) => (
                <motion.article
                  key={project.title}
                  className="group relative flex min-h-[260px] flex-col overflow-hidden rounded-lg border border-white/80 bg-white/80 p-6 shadow-[0_14px_40px_rgba(28,43,68,0.07)] backdrop-blur transition hover:border-white hover:bg-white/95 hover:shadow-[0_20px_55px_rgba(28,43,68,0.12)]"
                  variants={cardVariants}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                >
                  <div className={`absolute inset-x-0 top-0 h-1 ${project.accent}`} />
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[#1d1d1f]">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#515154]">
                    {recruiterMode ? project.recruiterSummary : project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.split(', ').map((tech) => (
                      <span key={tech} className="rounded-full border border-black/5 bg-[#f7faff] px-3 py-1 text-xs font-semibold text-[#515154]">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-6">
                    <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex text-sm font-semibold text-[#0066cc] hover:text-[#004f9f]">
                      View repository
                    </a>
                  </div>
                </motion.article>
              ))}
            </motion.div>
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
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6e6e73]">Live Activity</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-5xl">What I&apos;m building</h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#515154]">
                Pulled from recent public GitHub events plus direct repository commit checks, including this portfolio.
              </p>
            </div>
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#0066cc] hover:text-[#004f9f]">
              View full profile
            </a>
          </div>

          {activityLoading && (
            <div className="rounded-[1.75rem] border border-white/80 bg-white/72 p-6 text-sm text-[#515154] shadow-sm backdrop-blur">
              Fetching latest GitHub activity...
            </div>
          )}

          {activityError && (
            <div className="rounded-[1.75rem] border border-[#ff3b30]/20 bg-[#fff2f1] p-6 text-sm text-[#b42318]">
              {activityError}
            </div>
          )}

          {!activityLoading && !activityError && (
            <motion.div
              className="grid gap-4 lg:grid-cols-2"
              variants={staggerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.18 }}
            >
              <motion.div
                className="rounded-[1.75rem] border border-white/80 bg-white/72 p-6 shadow-[0_18px_55px_rgba(28,43,68,0.08)] backdrop-blur"
                variants={cardVariants}
              >
                <h3 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">Recent Commits</h3>
                <div className="mt-5 space-y-3">
                  {recentCommits.length === 0 && <p className="text-sm text-[#515154]">No recent public commits found.</p>}
                  {recentCommits.map((commit) => (
                    <motion.a
                      key={commit.id}
                      href={commit.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-2xl border border-black/5 bg-[#f7faff] px-4 py-3 text-sm transition hover:border-[#0071e3]/25 hover:bg-[#edf7ff]"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <p className="font-medium text-[#1d1d1f]">{commit.message}</p>
                        <span className="text-xs text-[#6e6e73]">{formatActivityDate(commit.date)}</span>
                      </div>
                      <p className="mt-1 text-xs text-[#6e6e73]">{commit.repo} - {commit.sha}</p>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="rounded-[1.75rem] border border-white/80 bg-white/72 p-6 shadow-[0_18px_55px_rgba(28,43,68,0.08)] backdrop-blur"
                variants={cardVariants}
              >
                <h3 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">Active Repositories</h3>
                <div className="mt-5 space-y-3">
                  {activeRepos.map((repo) => (
                    <motion.a
                      key={repo.id}
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-2xl border border-black/5 bg-[#f7faff] px-4 py-3 transition hover:border-[#0071e3]/25 hover:bg-[#edf7ff]"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <p className="text-sm font-medium text-[#1d1d1f]">{repo.name}</p>
                        <span className="text-xs text-[#6e6e73]">{formatActivityDate(repo.updatedAt)}</span>
                      </div>
                      <p className="mt-1 text-xs text-[#6e6e73]">{repo.description}</p>
                      <p className="mt-2 text-xs font-semibold text-[#0066cc]">{repo.language}</p>
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
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6e6e73]">Capabilities</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-5xl">Skills</h2>
            </div>
            <motion.div
              className="grid gap-4 md:grid-cols-2"
              variants={staggerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.18 }}
            >
              {Object.entries(skillGroups).map(([group, skills]) => (
                <motion.div
                  key={group}
                  className="rounded-[1.75rem] border border-white/80 bg-white/72 p-6 shadow-[0_14px_40px_rgba(28,43,68,0.07)] backdrop-blur"
                  variants={cardVariants}
                  whileHover={{ y: -3 }}
                >
                  <h3 className="text-lg font-semibold text-[#1d1d1f]">{group}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span key={skill} className="rounded-full border border-black/5 bg-[#f7faff] px-3 py-1.5 text-xs font-medium text-[#515154] shadow-sm">
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
          <div className="rounded-[1.75rem] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(232,243,255,0.82)_48%,rgba(247,242,255,0.78))] p-8 text-[#1d1d1f] shadow-[0_24px_70px_rgba(28,43,68,0.12)] backdrop-blur md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6e6e73]">Resume</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">A concise view of the work.</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#515154]">
              Download my latest resume for experience, education, technical skills, and project outcomes.
            </p>
            <a href="/resume.md" download className="mt-8 inline-flex rounded-full bg-[#0071e3] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0077ed]">
              Download Resume
            </a>
          </div>

          <div id="contact" className="relative overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/72 p-8 shadow-[0_18px_55px_rgba(28,43,68,0.08)] backdrop-blur md:p-10">
            <div
              className={`pointer-events-none absolute inset-0 bg-cover bg-center transition-opacity duration-300 ${
                contactHover ? 'opacity-25' : 'opacity-0'
              }`}
              style={{
                backgroundImage: contactHover ? `url(${contactBackgrounds[contactHover]})` : 'none',
              }}
            />
            <div className="relative z-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6e6e73]">Contact</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-5xl">Let&apos;s connect.</h2>
              <p className="mt-5 text-base leading-7 text-[#515154]">
                Open to opportunities, collaborations, and project conversations.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
                <a
                  className="rounded-full bg-[#e8f3ff] px-4 py-2 text-[#0066cc] hover:text-[#004f9f]"
                  href="mailto:adivd@csu.fullerton.edu"
                  onMouseEnter={() => setContactHover('email')}
                  onMouseLeave={() => setContactHover('')}
                  onFocus={() => setContactHover('email')}
                  onBlur={() => setContactHover('')}
                >
                  Email
                </a>
                <a
                  className="rounded-full bg-[#f5f5f7] px-4 py-2 text-[#1d1d1f] hover:text-[#0066cc]"
                  href="https://www.linkedin.com/in/aditya-dhayapulay"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setContactHover('linkedin')}
                  onMouseLeave={() => setContactHover('')}
                  onFocus={() => setContactHover('linkedin')}
                  onBlur={() => setContactHover('')}
                >
                  LinkedIn
                </a>
                <a
                  className="rounded-full bg-[#f5f5f7] px-4 py-2 text-[#1d1d1f] hover:text-[#0066cc]"
                  href="https://github.com/adit24dhaya"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setContactHover('github')}
                  onMouseLeave={() => setContactHover('')}
                  onFocus={() => setContactHover('github')}
                  onBlur={() => setContactHover('')}
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-white/70 bg-white/70 py-6 text-center text-xs text-[#6e6e73] backdrop-blur">
        © {new Date().getFullYear()} Dhayapulay Aditya Varun. Built with React and Tailwind CSS.
      </footer>
    </div>
  )
}

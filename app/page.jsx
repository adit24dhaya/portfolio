'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import heroImage from '../src/assets/hero.png'

const GITHUB_USERNAME = 'adit24dhaya'

export default function Page() {
  const [recruiterMode, setRecruiterMode] = useState(false)
  const [recentCommits, setRecentCommits] = useState([])
  const [activeRepos, setActiveRepos] = useState([])
  const [activityLoading, setActivityLoading] = useState(true)
  const [activityError, setActivityError] = useState('')

  const projects = [
    {
      title: 'Detect Not Hot Dogs',
      description:
        'Built a web application to classify food images with Hugging Face inference, including upload handling and confidence-based prediction output.',
      tech: 'Flask, Hugging Face API, JavaScript',
      github: 'https://github.com/adit24dhaya/Detect---Not-Hot-Dogs-with-hugging-face-API',
      accent: 'bg-[#0071e3]',
    },
    {
      title: 'Caffinder',
      description:
        'Created a cafe discovery app with geolocation, Google Maps integration, and a dynamic UI to improve nearby place discovery.',
      tech: 'JavaScript, Google Maps, Places API',
      github: 'https://github.com/adit24dhaya/caffinder',
      accent: 'bg-[#34c759]',
    },
    {
      title: 'CSUF Advising System',
      description:
        'Designed an advising-focused academic support platform to streamline course guidance workflows and improve student-facing usability.',
      tech: 'React, Tailwind CSS, Firebase',
      github: 'https://github.com/adit24dhaya/CSUF-Advising-System',
      accent: 'bg-[#ff9f0a]',
    },
    {
      title: 'Voice Assistance',
      description:
        'Built a voice-driven assistant project focused on speech input workflows and practical task automation features.',
      tech: 'Python, NLP, Speech Processing',
      github: 'https://github.com/adit24dhaya/Voice-assitance',
      accent: 'bg-[#af52de]',
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
      'Improved DRDO audio anomaly detection accuracy by 40%.',
      'Reduced model training time by 40% with CUDA acceleration.',
      'Built deployed ML and web projects with measurable impact.',
      'Maintaining active public GitHub contributions and project iteration.',
    ],
    [],
  )

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

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-white/80 backdrop-blur-xl">
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
              onClick={() => setRecruiterMode((prev) => !prev)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
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
          className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pb-16 pt-12 md:grid-cols-[1.04fr_0.96fr] md:px-8 md:pb-24 md:pt-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="space-y-7">
            <p className="inline-flex rounded-full border border-[#0071e3]/15 bg-[#e8f3ff] px-4 py-2 text-xs font-semibold text-[#0066cc]">
              {recruiterMode ? 'Recruiter Snapshot' : 'MS Computer Science @ CSUF'}
            </p>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-semibold leading-[1.04] tracking-tight text-[#1d1d1f] md:text-7xl">
                AI engineer building useful software with clarity and craft.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[#515154] md:text-xl">
                I work across machine learning, data-driven systems, and full-stack development with a focus on
                measurable outcomes, elegant interfaces, and production-minded execution.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#projects" className="rounded-full bg-[#0071e3] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0077ed]">
                View Projects
              </a>
              <a href="#resume" className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-[#1d1d1f] shadow-sm transition hover:border-[#0071e3]/30 hover:text-[#0071e3]">
                Resume
              </a>
              <a href="#contact" className="rounded-full px-5 py-3 text-sm font-semibold text-[#0066cc] transition hover:text-[#004f9f]">
                Contact
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.12)]">
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#e8f3ff] to-transparent" />
            <div className="relative p-5">
              <div className="rounded-[1.5rem] bg-[#f5f5f7] p-8">
                <img
                  src={heroImage.src}
                  alt="Portfolio profile illustration"
                  className="mx-auto aspect-square w-full max-w-[340px] object-contain"
                />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-[#f5f5f7] px-3 py-4">
                  <p className="text-2xl font-semibold text-[#1d1d1f]">40%</p>
                  <p className="mt-1 text-xs text-[#6e6e73]">Accuracy lift</p>
                </div>
                <div className="rounded-2xl bg-[#f5f5f7] px-3 py-4">
                  <p className="text-2xl font-semibold text-[#1d1d1f]">40%</p>
                  <p className="mt-1 text-xs text-[#6e6e73]">Faster training</p>
                </div>
                <div className="rounded-2xl bg-[#f5f5f7] px-3 py-4">
                  <p className="text-2xl font-semibold text-[#1d1d1f]">3.78</p>
                  <p className="mt-1 text-xs text-[#6e6e73]">CSUF GPA</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="space-y-8 bg-white py-8 md:space-y-10 md:py-12">
          <motion.section
            id="about"
            className="mx-auto grid w-full max-w-7xl gap-5 px-5 md:grid-cols-[0.8fr_1.2fr] md:px-8"
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6e6e73]">About</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-5xl">
                Research depth, product sensibility.
              </h2>
            </div>
            <div className="rounded-[1.75rem] border border-black/10 bg-[#f5f5f7] p-6 md:p-8">
              {recruiterMode ? (
                <div className="grid gap-3">
                  {impactHighlights.map((highlight) => (
                    <div key={highlight} className="rounded-2xl bg-white px-4 py-3 text-sm font-medium text-[#1d1d1f] shadow-sm">
                      {highlight}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-5 text-base leading-8 text-[#515154]">
                  <p>
                    At Research Centre Imarat (DRDO), I worked on audio anomaly detection using TensorFlow
                    autoencoders and CUDA acceleration, improving detection accuracy and reducing training time by
                    40%. I enjoy turning research ideas into reliable software systems and clean user experiences.
                  </p>
                  <div className="grid gap-3 text-sm md:grid-cols-2">
                    <p className="rounded-2xl bg-white p-4 shadow-sm"><span className="font-semibold text-[#1d1d1f]">CSUF:</span> M.S. Computer Science, GPA 3.78</p>
                    <p className="rounded-2xl bg-white p-4 shadow-sm"><span className="font-semibold text-[#1d1d1f]">JNTUH:</span> B.Tech CSE, GPA 7.87</p>
                  </div>
                </div>
              )}
            </div>
          </motion.section>

          <motion.section
            id="projects"
            className="mx-auto w-full max-w-7xl space-y-6 px-5 md:px-8"
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6e6e73]">Selected Work</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-5xl">Projects</h2>
              </div>
              <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#0066cc] hover:text-[#004f9f]">
                GitHub profile
              </a>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((project) => (
                <motion.article
                  key={project.title}
                  className="group rounded-[1.75rem] border border-black/10 bg-[#f5f5f7] p-6 transition hover:border-black/20 hover:bg-white hover:shadow-[0_18px_48px_rgba(0,0,0,0.08)]"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                >
                  <div className={`h-2 w-14 rounded-full ${project.accent}`} />
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight text-[#1d1d1f]">{project.title}</h3>
                  {!recruiterMode && <p className="mt-3 text-sm leading-6 text-[#515154]">{project.description}</p>}
                  <p className="mt-5 text-sm font-semibold text-[#6e6e73]">{project.tech}</p>
                  <a href={project.github} target="_blank" rel="noreferrer" className="mt-6 inline-flex text-sm font-semibold text-[#0066cc] hover:text-[#004f9f]">
                    View repository
                  </a>
                </motion.article>
              ))}
            </div>
          </motion.section>
        </div>

        <motion.section
          id="activity"
          className="mx-auto w-full max-w-7xl space-y-6 px-5 py-14 md:px-8 md:py-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6e6e73]">Live Activity</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-5xl">What I&apos;m building</h2>
            </div>
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#0066cc] hover:text-[#004f9f]">
              View full profile
            </a>
          </div>

          {activityLoading && (
            <div className="rounded-[1.75rem] border border-black/10 bg-white p-6 text-sm text-[#515154] shadow-sm">
              Fetching latest GitHub activity...
            </div>
          )}

          {activityError && (
            <div className="rounded-[1.75rem] border border-[#ff3b30]/20 bg-[#fff2f1] p-6 text-sm text-[#b42318]">
              {activityError}
            </div>
          )}

          {!activityLoading && !activityError && (
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-[1.75rem] border border-black/10 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">Recent Commits</h3>
                <div className="mt-5 space-y-3">
                  {recentCommits.length === 0 && <p className="text-sm text-[#515154]">No recent public commits found.</p>}
                  {recentCommits.map((commit) => (
                    <a key={commit.id} href={commit.url} target="_blank" rel="noreferrer" className="block rounded-2xl border border-black/5 bg-[#f5f5f7] px-4 py-3 text-sm transition hover:border-[#0071e3]/25 hover:bg-[#e8f3ff]">
                      <p className="font-medium text-[#1d1d1f]">{commit.message}</p>
                      <p className="mt-1 text-xs text-[#6e6e73]">{commit.repo} - {commit.sha}</p>
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-black/10 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">Active Repositories</h3>
                <div className="mt-5 space-y-3">
                  {activeRepos.map((repo) => (
                    <a key={repo.id} href={repo.url} target="_blank" rel="noreferrer" className="block rounded-2xl border border-black/5 bg-[#f5f5f7] px-4 py-3 transition hover:border-[#0071e3]/25 hover:bg-[#e8f3ff]">
                      <p className="text-sm font-medium text-[#1d1d1f]">{repo.name}</p>
                      {!recruiterMode && <p className="mt-1 text-xs text-[#6e6e73]">{repo.description}</p>}
                      <p className="mt-2 text-xs font-semibold text-[#0066cc]">{repo.language}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.section>

        <div className="bg-white py-14 md:py-20">
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
            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(skillGroups).map(([group, skills]) => (
                <div key={group} className="rounded-[1.75rem] border border-black/10 bg-[#f5f5f7] p-6">
                  <h3 className="text-lg font-semibold text-[#1d1d1f]">{group}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span key={skill} className="rounded-full border border-black/5 bg-white px-3 py-1.5 text-xs font-medium text-[#515154] shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
          <div className="rounded-[1.75rem] bg-[#1d1d1f] p-8 text-white md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">Resume</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">A concise view of the work.</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/70">
              Download my latest resume for experience, education, technical skills, and project outcomes.
            </p>
            <a href="/resume.md" download className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#1d1d1f] transition hover:bg-[#f5f5f7]">
              Download Resume
            </a>
          </div>

          <div id="contact" className="rounded-[1.75rem] border border-black/10 bg-white p-8 shadow-sm md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6e6e73]">Contact</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-5xl">Let&apos;s connect.</h2>
            <p className="mt-5 text-base leading-7 text-[#515154]">
              Open to opportunities, collaborations, and project conversations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
              <a className="rounded-full bg-[#e8f3ff] px-4 py-2 text-[#0066cc] hover:text-[#004f9f]" href="mailto:adivd@csu.fullerton.edu">Email</a>
              <a className="rounded-full bg-[#f5f5f7] px-4 py-2 text-[#1d1d1f] hover:text-[#0066cc]" href="https://www.linkedin.com/in/aditya-dhayapulay" target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="rounded-full bg-[#f5f5f7] px-4 py-2 text-[#1d1d1f] hover:text-[#0066cc]" href="https://github.com/adit24dhaya" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-black/10 bg-white py-6 text-center text-xs text-[#6e6e73]">
        © {new Date().getFullYear()} Dhayapulay Aditya Varun. Built with React and Tailwind CSS.
      </footer>
    </div>
  )
}

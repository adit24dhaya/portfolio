import './globals.css'

const SITE_URL = 'https://portfolio-jade-nine-fvlnobmi5c.vercel.app'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Dhayapulay Aditya Varun | AI / ML Engineer',
  description:
    'Aditya Dhayapulay — AI/ML engineer and CS graduate researcher building applied machine learning, autonomy, and full-stack products. Projects, open-source work, and live GitHub activity.',
  keywords: [
    'Aditya Dhayapulay',
    'AI Engineer',
    'Machine Learning Engineer',
    'Portfolio',
    'CSUF',
    'Reinforcement Learning',
    'Computer Vision',
    'Full Stack Developer',
  ],
  authors: [{ name: 'Dhayapulay Aditya Varun' }],
  creator: 'Dhayapulay Aditya Varun',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Dhayapulay Aditya Varun | AI / ML Engineer',
    description:
      'Applied machine learning, autonomy research, and full-stack engineering — projects, open-source contributions, and live GitHub activity.',
    siteName: 'Aditya Dhayapulay Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhayapulay Aditya Varun | AI / ML Engineer',
    description:
      'Applied machine learning, autonomy research, and full-stack engineering.',
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f9ff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0e17' },
  ],
}

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  )
}

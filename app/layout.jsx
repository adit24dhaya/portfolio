import './globals.css'

const SITE_URL = 'https://portfolio-jade-nine-fvlnobmi5c.vercel.app'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Aditya Varun Dhayapulay | Embedded Software, Robotics & Edge AI Engineer',
  description:
    'Aditya Varun Dhayapulay — Embedded Software Engineer specializing in C++, Embedded Linux, NVIDIA Jetson, ROS 2 robotics, and CUDA/TensorRT edge AI, with NVIDIA and automotive embedded experience.',
  keywords: [
    'Aditya Varun Dhayapulay',
    'Embedded Software Engineer',
    'C++',
    'Embedded Linux',
    'NVIDIA Jetson',
    'ROS 2',
    'Robotics',
    'Edge AI',
    'CUDA',
    'TensorRT',
    'ARM',
    'FreeRTOS',
    'AUTOSAR',
    'CAN',
    'Computer Vision',
    'Machine Learning',
    'Portfolio',
    'CSUF',
  ],
  authors: [{ name: 'Aditya Varun Dhayapulay' }],
  creator: 'Aditya Varun Dhayapulay',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Aditya Varun Dhayapulay | Embedded Software, Robotics & Edge AI Engineer',
    description:
      'Reliable embedded software, ROS 2 robotics, and edge AI on NVIDIA Jetson. C/C++, Embedded Linux, sensor integration, and performance optimization.',
    siteName: 'Aditya Dhayapulay Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Varun Dhayapulay | Embedded Software, Robotics & Edge AI Engineer',
    description:
      'Reliable embedded software, ROS 2 robotics, and edge AI on NVIDIA Jetson. C/C++, Embedded Linux, sensor integration, and performance optimization.',
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

import './globals.css'

export const metadata = {
  title: 'Dhayapulay Aditya Varun | Portfolio',
  description: 'Portfolio website showcasing projects, skills, and experience.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

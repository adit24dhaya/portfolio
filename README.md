# Dhayapulay Aditya Varun - Portfolio

A modern portfolio website built with Next.js, Tailwind CSS, and Framer Motion to showcase projects, skills, experience, and live GitHub activity.

## Features

- Responsive single-page portfolio layout
- Recruiter Mode toggle for a concise impact-first view
- Live GitHub activity section:
  - recent commits
  - active repositories
- Smooth UI interactions and section animations with Framer Motion
- Resume download section and direct contact links

## Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS
- Framer Motion
- GitHub API (via Next.js API route)

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`

Optional environment variable for higher GitHub API limits:

```bash
GITHUB_TOKEN=your_token_here
```

## Production Build

```bash
npm run build
npm run start
```

## Quality Check

Run linting before opening a pull request:

```bash
npm run lint
```

## GitHub Automation

- CI workflow runs on every push/PR to `main`
- CI checks include `lint` and production `build`
- Matrix validation on Node.js 20 and 22
- Dependabot creates weekly update PRs for npm and GitHub Actions

## Project Structure

```text
app/
  api/activity/route.js   # Server-side GitHub activity endpoint
  globals.css             # Global styles + Tailwind import
  layout.jsx              # Root layout
  page.jsx                # Main portfolio page
public/
  resume.md               # Downloadable resume content
```

## GitHub Activity Notes

The live activity section uses `app/api/activity/route.js` and includes a fallback:

- Primary: GitHub public push events
- Fallback: recent authored commits from active repositories

This helps keep activity visible even when the public events feed has no recent push events.

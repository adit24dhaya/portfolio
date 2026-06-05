# Dhayapulay Aditya Varun - Portfolio

A modern portfolio website built with Next.js, Tailwind CSS, and Framer Motion to showcase projects, skills, experience, and live GitHub activity.

## Features

- Responsive single-page portfolio layout with a sticky scroll-spy navigation and mobile menu
- Light / dark theme toggle with no-flash initialization and `prefers-color-scheme` default
- Recruiter Mode toggle for a concise impact-first view
- Animated hero with a rotating role headline and an "open to work" availability badge
- Live GitHub stats strip (repos, stars, followers, years) with count-up animation
- Filterable projects grid (AI / ML, Data, Full-Stack) with repository and live-demo links
- Live GitHub activity section:
  - recent commits
  - active repositories
- Open-source contributions feed (recent pull requests)
- Smooth UI interactions and section animations with Framer Motion
- Resume download, copy-email, social icon links, and a back-to-top control
- SEO + Open Graph metadata

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
  api/activity/route.js        # Server-side GitHub activity endpoint
  api/contributions/route.js   # Recent pull requests endpoint
  api/stats/route.js           # GitHub profile stats (repos, stars, followers)
  globals.css                  # Global styles, theme tokens, Tailwind import
  layout.jsx                   # Root layout + SEO metadata + theme init script
  page.jsx                     # Main portfolio page
public/
  resume.md                    # Downloadable resume content
```

## GitHub Activity Notes

The live activity section uses `app/api/activity/route.js` and includes a fallback:

- Primary: GitHub public push events
- Fallback: recent authored commits from active repositories

This helps keep activity visible even when the public events feed has no recent push events.

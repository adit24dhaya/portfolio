const GITHUB_USERNAME = 'adit24dhaya'

export async function GET() {
  try {
    const headers = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'portfolio-next-app',
    }
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ])

    if (!userRes.ok) {
      return Response.json({ error: 'Unable to load GitHub stats.' }, { status: 502 })
    }

    const user = await userRes.json()
    const repos = reposRes.ok ? await reposRes.json() : []

    const ownRepos = Array.isArray(repos) ? repos.filter((repo) => !repo.fork) : []
    const totalStars = ownRepos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)

    const languageCounts = {}
    ownRepos.forEach((repo) => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1
      }
    })
    const topLanguages = Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }))

    const createdYear = user.created_at ? new Date(user.created_at).getFullYear() : null
    const yearsOnGitHub = createdYear ? new Date().getFullYear() - createdYear : null

    return Response.json({
      followers: user.followers ?? 0,
      following: user.following ?? 0,
      publicRepos: user.public_repos ?? ownRepos.length,
      totalStars,
      yearsOnGitHub,
      topLanguages,
      profileUrl: user.html_url || `https://github.com/${GITHUB_USERNAME}`,
    })
  } catch {
    return Response.json({ error: 'Unable to load GitHub stats.' }, { status: 500 })
  }
}

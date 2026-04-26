const GITHUB_USERNAME = 'adit24dhaya'

export async function GET() {
  try {
    const headers = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'portfolio-next-app',
    }

    const [eventsRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`, {
        headers,
        next: { revalidate: 300 },
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=8`, {
        headers,
        next: { revalidate: 300 },
      }),
    ])

    if (!eventsRes.ok || !reposRes.ok) {
      return Response.json(
        { error: 'Unable to load GitHub activity right now.' },
        { status: 502 },
      )
    }

    const eventsData = await eventsRes.json()
    const reposData = await reposRes.json()

    let commits = eventsData
      .filter((event) => event.type === 'PushEvent')
      .flatMap((event) =>
        (event.payload?.commits || []).map((commit) => ({
          id: `${event.id}-${commit.sha}`,
          repo: event.repo?.name ?? 'Unknown repo',
          message: commit.message,
          sha: commit.sha?.slice(0, 7) ?? 'unknown',
          url: `https://github.com/${event.repo?.name}/commit/${commit.sha}`,
          date: event.created_at,
        })),
      )
      .slice(0, 5)

    const repos = reposData
      .filter((repo) => !repo.fork)
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
      .slice(0, 4)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        url: repo.html_url,
        description: repo.description || 'No description available yet.',
        language: repo.language || 'Mixed',
      }))

    // Fallback: when no recent public push events exist, pull commits from active repos.
    if (commits.length === 0 && repos.length > 0) {
      const commitResponses = await Promise.all(
        repos.map((repo) =>
          fetch(
            `https://api.github.com/repos/${repo.fullName}/commits?author=${GITHUB_USERNAME}&per_page=2`,
            { headers, next: { revalidate: 300 } },
          ),
        ),
      )

      const commitLists = await Promise.all(
        commitResponses.map(async (response) => {
          if (!response.ok) return []
          return response.json()
        }),
      )

      commits = commitLists
        .flatMap((repoCommits, index) =>
          repoCommits.map((commit) => ({
            id: commit.sha,
            repo: repos[index]?.fullName || 'Unknown repo',
            message: commit.commit?.message || 'Commit update',
            sha: commit.sha?.slice(0, 7) || 'unknown',
            url: commit.html_url,
            date: commit.commit?.author?.date,
          })),
        )
        .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
        .slice(0, 5)
    }

    return Response.json({ commits, repos })
  } catch {
    return Response.json(
      { error: 'Unable to load GitHub activity right now.' },
      { status: 500 },
    )
  }
}

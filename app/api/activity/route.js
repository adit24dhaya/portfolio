const GITHUB_USERNAME = 'adit24dhaya'
const FEATURED_REPOS = [
  'portfolio',
  'CSUF-Advising-System',
  'Detect---Not-Hot-Dogs-with-hugging-face-API',
  'caffinder',
  'Voice-assitance',
]

export async function GET() {
  try {
    const headers = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'portfolio-next-app',
    }

    const [eventsRes, reposRes, featuredRepoResponses] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`, {
        headers,
        next: { revalidate: 60 },
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=8`, {
        headers,
        next: { revalidate: 60 },
      }),
      Promise.all(
        FEATURED_REPOS.map((repoName) =>
          fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`, {
            headers,
            next: { revalidate: 60 },
          }),
        ),
      ),
    ])

    if (!eventsRes.ok || !reposRes.ok) {
      return Response.json(
        { error: 'Unable to load GitHub activity right now.' },
        { status: 502 },
      )
    }

    const eventsData = await eventsRes.json()
    const reposData = await reposRes.json()
    const featuredReposData = await Promise.all(
      featuredRepoResponses.map(async (response) => {
        if (!response.ok) return null
        return response.json()
      }),
    )

    const mergedReposData = [
      ...featuredReposData.filter(Boolean),
      ...reposData,
    ].filter(
      (repo, index, repos) =>
        !repo.fork && repos.findIndex((candidate) => candidate.id === repo.id) === index,
    )

    const repos = mergedReposData
      .sort((a, b) => {
        if (a.name === 'portfolio') return -1
        if (b.name === 'portfolio') return 1
        return new Date(b.pushed_at) - new Date(a.pushed_at)
      })
      .slice(0, 5)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        url: repo.html_url,
        description: repo.description || 'No description available yet.',
        language: repo.language || 'Mixed',
        updatedAt: repo.pushed_at,
      }))

    const eventCommits = eventsData
      .filter((event) => event.type === 'PushEvent')
      .flatMap((event) =>
        (event.payload?.commits || []).map((commit) => ({
          id: `${event.id}-${commit.sha}`,
          repo: event.repo?.name ?? 'Unknown repo',
          message: commit.message?.split('\n')[0] || 'Commit update',
          sha: commit.sha?.slice(0, 7) ?? 'unknown',
          url: `https://github.com/${event.repo?.name}/commit/${commit.sha}`,
          date: event.created_at,
        })),
      )

    const commitResponses = await Promise.all(
      repos.map((repo) =>
        fetch(
          `https://api.github.com/repos/${repo.fullName}/commits?author=${GITHUB_USERNAME}&per_page=2`,
          { headers, next: { revalidate: 60 } },
        ),
      ),
    )

    const commitLists = await Promise.all(
      commitResponses.map(async (response) => {
        if (!response.ok) return []
        return response.json()
      }),
    )

    const repoCommits = commitLists.flatMap((repoCommitsForRepo, index) =>
      repoCommitsForRepo.map((commit) => ({
        id: commit.sha,
        repo: repos[index]?.fullName || 'Unknown repo',
        message: commit.commit?.message?.split('\n')[0] || 'Commit update',
        sha: commit.sha?.slice(0, 7) || 'unknown',
        url: commit.html_url,
        date: commit.commit?.author?.date,
      })),
    )

    const commits = [...eventCommits, ...repoCommits]
      .filter(
        (commit, index, commitsList) =>
          commit.sha && commitsList.findIndex((candidate) => candidate.sha === commit.sha) === index,
      )
      .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
      .slice(0, 6)

    return Response.json({ commits, repos })
  } catch {
    return Response.json(
      { error: 'Unable to load GitHub activity right now.' },
      { status: 500 },
    )
  }
}

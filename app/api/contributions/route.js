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

    const response = await fetch(
      `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr&sort=updated&order=desc&per_page=10`,
      { headers, next: { revalidate: 300 } },
    )

    if (!response.ok) {
      return Response.json({ pulls: [] }, { status: 200 })
    }

    const data = await response.json()
    const pulls = (data.items || []).map((item) => {
      const parts = item.repository_url.split('/')
      const owner = parts[parts.length - 2]
      const repo = parts[parts.length - 1]
      const merged = Boolean(item.pull_request?.merged_at)

      return {
        id: item.id,
        title: item.title,
        url: item.html_url,
        repo: `${owner}/${repo}`,
        state: merged ? 'merged' : item.state,
        updatedAt: item.updated_at,
      }
    })

    return Response.json({ pulls })
  } catch {
    return Response.json({ pulls: [] }, { status: 200 })
  }
}

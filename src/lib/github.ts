type RepoInfo = {
  owner: string
  repo: string
}

const GITHUB_API_BASE_URL = 'https://api.github.com'

let lastCommitDateIntoDefaultBranch: Date | null | undefined = undefined

const fetchJson = async <T>(url: string): Promise<T> => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status.toString()} ${res.statusText}`)
  }
  return res.json() as Promise<T>
}

const parseRepoInput = (input: string): RepoInfo => {
  const match = /(?:github\.com\/)?([^/]+)\/([^/]+)/.exec(input)
  if (!match) {
    throw new Error(
      'Invalid GitHub repository format. Expected "owner/repo" or full URL.',
    )
  }

  return {
    owner: match[1],
    repo: match[2],
  }
}

const getDefaultBranch = async ({ owner, repo }: RepoInfo): Promise<string> => {
  const data = await fetchJson<{ default_branch: string }>(
    `${GITHUB_API_BASE_URL}/repos/${owner}/${repo}`,
  )
  return data.default_branch
}

const getLastCommitDate = async (
  { owner, repo }: RepoInfo,
  branch: string,
): Promise<Date> => {
  const commits = await fetchJson<{ commit: { committer: { date: string } } }[]>(
    `${GITHUB_API_BASE_URL}/repos/${owner}/${repo}/commits?sha=${branch}&per_page=1`,
  )

  const dateStr = commits[0]?.commit?.committer?.date
  if (!dateStr) {
    throw new Error('No commit found for this branch')
  }

  return new Date(dateStr)
}

export const getLastCommitDateIntoDefaultBranch = async (
  repoInput: string,
): Promise<Date | null> => {
  if (lastCommitDateIntoDefaultBranch) {
    return lastCommitDateIntoDefaultBranch
  }

  try {
    const repoInfo = parseRepoInput(repoInput)
    const defaultBranch = await getDefaultBranch(repoInfo)
    const lastCommitDate = await getLastCommitDate(repoInfo, defaultBranch)
    lastCommitDateIntoDefaultBranch = lastCommitDate
    return lastCommitDate
  } catch (err) {
    if (err instanceof Error) {
      console.error('Failed to fetch data from GitHub:', err.message)
    }
    lastCommitDateIntoDefaultBranch = null
    return null
  }
}

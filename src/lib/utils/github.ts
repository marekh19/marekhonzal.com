import { z } from 'astro:schema'

import { ENV } from '@/config/env'
import { getGitHubOwnerRepoFromUrl } from '@/lib/utils/string'

const MIN_STARGAZERS = 5
const API_BASE_URL = 'https://api.github.com'
const API_VERSION = '2022-11-28'

const stargazersSchema = z.object({
  stargazers_count: z.number().min(MIN_STARGAZERS),
})

export const getGitHubRepoStarGazers = async (
  gitHubUrl: string,
): Promise<number | null> => {
  const details = getGitHubOwnerRepoFromUrl(gitHubUrl)
  if (!details) return null

  const { owner, repo } = details

  try {
    const res = await fetch(`${API_BASE_URL}/repos/${owner}/${repo}`, {
      headers: {
        Authorization: `Bearer ${ENV.GH_API_TOKEN}`,
        'X-GitHub-Api-Version': API_VERSION,
      },
    })
    if (!res.ok) return null

    const resData = await res.json()

    const { stargazers_count: numOfStargazers } = stargazersSchema.parse(resData)

    return numOfStargazers
  } catch {
    return null
  }
}

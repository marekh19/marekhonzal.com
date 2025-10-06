type SocialLink = {
  id: 'linkedin' | 'github' | 'bluesky' | 'mail'
  label: string
  url: string
  iconName: string
}

export const socials = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/marekhonzal',
    iconName: 'ph:linkedin-logo',
  },
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/marekh19',
    iconName: 'ph:github-logo',
  },
  {
    id: 'bluesky',
    label: 'Bluesky',
    url: 'https://bsky.app/profile/marekhonzal.com',
    iconName: 'ph:butterfly',
  },
  {
    id: 'mail',
    label: 'Mail',
    url: 'mailto:hi@marekhonzal.com',
    iconName: 'ph:envelope',
  },
] as const satisfies readonly SocialLink[]

type SocialLink = {
  label: string
  url: string
  iconName: string
}

export const socials = [
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/marekhonzal/',
    iconName: 'ph:linkedin-logo',
  },
  {
    label: 'GitHub',
    url: 'https://github.com/marekh19/',
    iconName: 'ph:github-logo',
  },
  {
    label: 'Bluesky',
    url: 'https://bsky.app/profile/marekhonzal.com',
    iconName: 'ph:butterfly',
  },
  {
    label: 'Mail',
    url: 'mailto:marek.honzal@gmail.com',
    iconName: 'ph:envelope',
  },
] as const satisfies readonly SocialLink[]

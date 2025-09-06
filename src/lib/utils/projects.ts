import { TECHNOLOGIES } from '@/lib/technologies'
import type { Project, ProjectData, Technology } from '@/lib/types'

import { getFeaturedItems, getNonFeaturedItems } from './content'

export const getTechnologiesByProject = (project: ProjectData): readonly Technology[] =>
  project.technologies.map((slug) => TECHNOLOGIES[slug])

export const getProjectsByFeatured = (
  projects: readonly Project[],
): { featured: readonly Project[]; nonFeatured: readonly Project[] } => ({
  featured: getFeaturedItems(projects),
  nonFeatured: getNonFeaturedItems(projects),
})

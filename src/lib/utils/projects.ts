import { TECHNOLOGIES, type Technology } from '@/lib/technologies'
import type { Project } from '@/lib/types'

import { getFeaturedItems, getNonFeaturedItems } from './content'

export const getTechnologiesByProject = (project: Project): Technology[] =>
  project.data.technologies.map((slug) => TECHNOLOGIES[slug])

export const getProjectsByFeatured = (
  projects: Project[],
): { featured: Project[]; nonFeatured: Project[] } => ({
  featured: getFeaturedItems(projects),
  nonFeatured: getNonFeaturedItems(projects),
})

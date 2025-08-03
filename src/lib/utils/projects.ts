import type { CollectionEntry } from 'astro:content'

import { TECHNOLOGIES, type Technology } from '@/lib/technologies'

import { getFeaturedItems, getNonFeaturedItems } from './content'

type Project = CollectionEntry<'projects'>

export const getTechnologiesByProject = (project: Project): Technology[] =>
  project.data.technologies.map((slug) => TECHNOLOGIES[slug])

export const getProjectsByFeatured = (
  projects: Project[],
): { featured: Project[]; nonFeatured: Project[] } => ({
  featured: getFeaturedItems(projects),
  nonFeatured: getNonFeaturedItems(projects),
})

import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

import { TECHNOLOGY_SLUGS } from '@/lib/technologies'

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{mdx,md}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      date: z.date(),
      isDraft: z.boolean().optional().default(false),
      isFeatured: z.boolean().optional().default(false),
      category: z.enum(['dev', 'beyond']).optional().default('dev'),
      tags: z.array(z.string()).optional(),
      thumbnail: image(),
    }),
})

const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{mdx,md}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      date: z.date(),
      isDraft: z.boolean().optional().default(false),
      isFeatured: z.boolean().optional().default(false),
      thumbnail: image(),
      technologies: z.array(z.enum(TECHNOLOGY_SLUGS)),
      githubUrl: z.string().url().optional(),
      demoUrl: z.string().url().optional(),
    }),
})

export const collections = {
  blog: blogCollection,
  projects: projectsCollection,
}

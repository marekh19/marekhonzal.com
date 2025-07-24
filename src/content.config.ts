import { z, defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'

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
  schema: z.object({
    name: z.string(),
    summary: z.string(),
  }),
})

export const collections = {
  blog: blogCollection,
  projects: projectsCollection,
}

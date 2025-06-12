import { z, defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'

const blogSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  date: z.date(),
  draft: z.boolean().optional().default(false),
})

export type BlogSchema = z.infer<typeof blogSchema>

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: blogSchema,
})

export const collections = { blog }

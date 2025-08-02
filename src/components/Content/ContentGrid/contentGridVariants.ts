import { cva, type VariantProps } from 'class-variance-authority'

export const contentGridVariants = cva(['grid grid-cols-1 gap-x-8 gap-y-12'], {
  variants: {
    type: {
      article: ['min-[600px]:grid-cols-2', 'lg:grid-cols-3'],
      project: ['lg:gap-y-8'],
    },
  },
  defaultVariants: {
    type: 'article',
  },
})

export type ContentGridVariant = VariantProps<typeof contentGridVariants>

import { cva, type VariantProps } from 'class-variance-authority'

export const contentGridVariants = cva(
  ['grid grid-cols-1 min-[600px]:grid-cols-2 gap-x-8 gap-y-12'],
  {
    variants: {
      type: {
        article: ['lg:grid-cols-3'],
        project: ['lg:grid-cols-1', 'lg:gap-y-8'],
      },
    },
    defaultVariants: { type: 'article' },
  },
)

export type ContentGridVariant = VariantProps<typeof contentGridVariants>

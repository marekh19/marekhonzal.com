import { cva, type VariantProps } from 'class-variance-authority'

export const contentGridVariants = cva(
  ['grid grid-cols-1 gap-x-8 gap-y-12', 'min-[600px]:grid-cols-2', 'lg:grid-cols-3'],
  {
    variants: {
      type: {
        article: '',
        project: '',
      },
    },
    defaultVariants: {
      type: 'article',
    },
  },
)

export type ContentGridVariant = VariantProps<typeof contentGridVariants>

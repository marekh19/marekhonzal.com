import { cva, type VariantProps } from 'class-variance-authority'

export const alertRootVariants = cva('bg-base-200 rounded-lg border-l-[6px] p-4', {
  variants: {
    intent: {
      tip: 'border-l-accent',
      info: 'border-l-info',
      warning: 'border-l-warning',
      error: 'border-l-error',
      success: 'border-l-success',
    },
  },
  defaultVariants: {
    intent: 'info',
  },
})

export const alertTitleVariants = cva('text-base font-semibold', {
  variants: {
    intent: {
      tip: 'text-accent',
      info: 'text-info',
      warning: 'text-warning',
      error: 'text-error',
      success: 'text-success',
    },
  },
  defaultVariants: {
    intent: 'info',
  },
})

export const alertIconVariants = cva('size-5 shrink-0', {
  variants: {
    intent: {
      tip: 'text-accent',
      info: 'text-info',
      warning: 'text-warning',
      error: 'text-error',
      success: 'text-success',
    },
  },
  defaultVariants: {
    intent: 'info',
  },
})

export type AlertVariant = NonNullable<
  VariantProps<
    typeof alertRootVariants & typeof alertTitleVariants & typeof alertIconVariants
  >['intent']
>

export const defaultTitles = {
  tip: 'Tip',
  info: 'Info',
  warning: 'Warning',
  error: 'Error',
  success: 'Success',
} as const satisfies Record<AlertVariant, string>

export const iconIntentMap = {
  tip: 'lucide:lightbulb',
  info: 'lucide:info',
  warning: 'lucide:triangle-alert',
  error: 'lucide:circle-x',
  success: 'lucide:circle-check',
} as const satisfies Record<AlertVariant, string>

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

/**
 * Returns a date string in a `7 Jul, 2025` format
 */
export const formatDateHuman = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  return formatter.format(date)
}

/**
 * Returns a date string in a YYYY-MM-DD format
 */
export const formatDateMachine = (date: Date) => date.toISOString().slice(0, 10)

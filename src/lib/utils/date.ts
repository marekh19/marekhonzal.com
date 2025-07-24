/**
 * Returns a date string in a `7 Jul, 2025` format
 */
export const formatDateHuman = (
  date: Date,
  options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  },
) => {
  const formatter = new Intl.DateTimeFormat(['en-CA', 'en-US'], options)
  return formatter.format(date)
}

/**
 * Returns a date string in a YYYY-MM-DD format
 */
export const formatDateMachine = (date: Date) => date.toISOString().slice(0, 10)

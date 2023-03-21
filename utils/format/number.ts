export const formatNumberWithLanguage = (
  number: number | bigint | string,
  language?: string
) => {
  const value = Number(number)
  const localization = language || navigator?.language || 'en-US'
  return value.toLocaleString(localization)
}

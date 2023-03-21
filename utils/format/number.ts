export const formatNumberWithLanguage = (
  number: number | bigint | string,
  language?: string
) => {
  const value = Number(number)
  let localization = language
  if (!localization) {
    localization = typeof navigator !== undefined ? navigator.language : 'en-US'
  }
  return value.toLocaleString(localization)
}

export const formatNumberWithLanguage = (
  number: number | bigint | string,
  language?: string
) => {
  const value = Number(number)
  let localization = language
  if (!localization) {
    localization =
      typeof window !== 'undefined' ? window.navigator.language : 'en-US'
  }
  return value.toLocaleString(localization)
}

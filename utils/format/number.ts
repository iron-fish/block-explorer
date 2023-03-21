export const formatNumberWithLanguage = (
  number: number | bigint | string,
  language?: string
) => {
  const value = Number(number)
  return value.toLocaleString(language || navigator.language)
}

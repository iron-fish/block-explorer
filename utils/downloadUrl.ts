export const getDownloadUrl = (content: string, type: string): string => {
  return URL.createObjectURL(new Blob([content], { type }))
}

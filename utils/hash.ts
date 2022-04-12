export function truncateHash(hash: string, parts: number = 4, chars: number = 4): string {
  const blockLength = (hash.length - chars) / (parts - 1)
  const result = []

  while(result.length < parts - 1) {
    const startPosition = result.length * blockLength
    result.push(hash.slice(startPosition, startPosition + chars))
  }

  result.push(hash.slice(hash.length - chars, hash.length))
  
  return result.join('...')
}
const sanitizeString = (s: string): string => {
  return s.replace(/[\u0000-\u001F\u007F-\u009F]/g, '').trim()
}

export function formatGraffiti(graffiti?: string | null): string {
  const hexRegex = /^[0-9A-Fa-f]+$/g

  if (hexRegex.test(graffiti ?? '')) {
    const asBuffer = Buffer.from(graffiti, 'hex')
    return sanitizeString(asBuffer.toString('utf8'))
  }

  return graffiti ?? ''
}

import { useTranslation as useRawTranslation } from 'next-i18next'

export const useTranslation = (file: string | string[]) => {
  const raw = useRawTranslation(file)
  const debug = !!process.env.NEXT_PUBLIC_DEBUG
  if (debug) {
    // eslint-disable-next-line no-console
    console.log('useTranslation :: file', file)
  }
  return {
    ...raw,
    t: (x: string) => {
      const result = raw.t(x)
      if (debug) {
        if (result === x) {
          // eslint-disable-next-line no-console
          console.warn(`useTranslation :: Expected key (${x}) to exist!`)
          // adding a span tag to a meta tag is no bueno
          if (!x.startsWith('meta')) {
            return (
              <span
                title={`Missing: ${file}.${x}`}
                style={{ backgroundColor: 'lime' }}
              >
                {result}
              </span>
            )
          }
        }
      }
      return result
    },
  }
}

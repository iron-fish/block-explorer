import { floorTo } from 'utils/math'

type SizeSuffix = {
  B: string
  K: string
  M: string
  G: string
  T: string
  P: string
}

const formatUnit = (
  bytes: number,
  base: number,
  suffix: SizeSuffix
): string => {
  if (bytes < Math.pow(base, 1)) {
    return `${bytes.toFixed(0)} ${suffix.B}`
  }
  if (bytes < Math.pow(base, 2)) {
    return floorTo(bytes / Math.pow(base, 1), 2).toFixed(2) + ` ${suffix.K}`
  }
  if (bytes < Math.pow(base, 3)) {
    return floorTo(bytes / Math.pow(base, 2), 2).toFixed(2) + ` ${suffix.M}`
  }
  if (bytes < Math.pow(base, 4)) {
    return floorTo(bytes / Math.pow(base, 3), 2).toFixed(2) + ` ${suffix.G}`
  }
  if (bytes < Math.pow(base, 5)) {
    return floorTo(bytes / Math.pow(base, 4), 2).toFixed(2) + ` ${suffix.T}`
  }

  return floorTo(bytes / Math.pow(base, 5), 2).toFixed(2) + ` ${suffix.P}`
}

export const formatDifficulty = (difficulty: number): string => {
  return formatUnit(difficulty, 1000, {
    B: '',
    K: 'K',
    M: 'M',
    G: 'G',
    T: 'T',
    P: 'P',
  })
}

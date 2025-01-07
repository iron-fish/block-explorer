export const ORE_TO_IRON = 1e8
const ORE_TICKER = '$ORE'
const IRON_TICKER = '$IRON'

export const getIRFAmountWithCurrency = (raw = '0'): string => {
  const amount = Math.abs(parseInt(raw))
  // const negative = amount < 0
  if (!amount) return '0'

  // display $IRON for >=1 IRON
  if (amount > ORE_TO_IRON) {
    const div = amount / ORE_TO_IRON
    const displayAmount = getNumberToUnit(div)
    return `${displayAmount.toLocaleString()} ${IRON_TICKER}`
  }

  // display $IRON for >=0.01 IRON
  if (amount > ORE_TO_IRON / 100) {
    const displayAmount = (amount / ORE_TO_IRON).toFixed(4)
    return `${displayAmount.toLocaleString()} ${IRON_TICKER}`
  }

  // display $ORE
  return `${amount.toLocaleString()} ${ORE_TICKER}`
}

export function renderIronWithCurrency(value?: number): string {
  if (!value) {
    return '-'
  }

  return `${value.toLocaleString()} ${IRON_TICKER}`
}

export const getNumberToUnit = (value: number): string => {
  const UNITS = ['M', 'B', 'T', 'Q']
  const neg = value < 0
  const f = (value / 10).toFixed(0)
  const l = neg ? f.length - 1 : f.length
  const r = l % 3
  const div = Number('1e+' + (l - r))
  const raw = Math.abs(value) / div
  const formatted = raw.toFixed(2).replace('.00', '')
  const unit = UNITS[Math.floor(l / 3) - 2] || ''
  const output = formatted + unit
  return neg ? '-' + output : output
}

/**
 * Formats a value in the minor denomination as a human-readable currency value with the
 * specified number of decimal places.
 *
 * Min precision is the minimum number of decimal places to include.
 */
export const formatCurrency = (
  value: bigint | number | string,
  decimals: number,
  minPrecision = 0
): string => {
  const asBigInt = BigInt(value)

  if (asBigInt < 0) {
    return `-${formatCurrency(asBigInt * BigInt(-1), decimals, minPrecision)}`
  }

  const decimalsBigInt = eval(`BigInt(10) ** BigInt(${decimals})`)

  const major = asBigInt / decimalsBigInt
  const remainder = asBigInt % decimalsBigInt
  const remainderString = remainder
    .toString()
    .padStart(decimals, '0')
    .replace(/0+$/, '')
    .padEnd(minPrecision, '0')

  return remainderString ? `${major}.${remainderString}` : major.toString()
}

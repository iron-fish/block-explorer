import intervalToDuration from 'date-fns/intervalToDuration'
import formatDuration from 'date-fns/formatDuration'

const BASE_DATE = new Date(0)

export const formatTimeSinceLastBlock = (miningTimeInMs = 0) => {
  const endDate = new Date(BASE_DATE.getTime() + miningTimeInMs)
  return formatDuration(intervalToDuration({ start: BASE_DATE, end: endDate }))
}

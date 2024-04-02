import intervalToDuration from 'date-fns/intervalToDuration'
import formatDuration from 'date-fns/formatDuration'

const BASE_DATE = new Date(0)

export const formatCountdown = (sequence?: number) => {
  let differenceInBlocks = 503338 - sequence
  let hardforkTime = new Date()
  hardforkTime.setSeconds(hardforkTime.getSeconds() + differenceInBlocks * 60)
  let timeLeft = []
  let now = new Date().getTime()
  let difference = hardforkTime.getTime() - now

  var newHours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  var newMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  var newSeconds = Math.floor((difference % (1000 * 60)) / 1000)

  return (
    newHours +
    ' hours : ' +
    newMinutes +
    ' minutes : ' +
    newSeconds +
    ' seconds'
  )
}
